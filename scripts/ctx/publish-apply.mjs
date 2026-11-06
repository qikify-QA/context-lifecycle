#!/usr/bin/env node
// Bước publish cuối của một run (contract §5, §16): re-verify lock → audit preview
// → copy candidate/publish-preview/ vào knowledge/products/<product>/ → sinh lại
// manifest dưới lock `_manifest`.
//
//   node scripts/ctx/publish-apply.mjs --run CTX-... --objects a,b [--dry-run]
//
// Chỉ orchestrator gọi script này, và chỉ sau khi reviewer trả publish_allowed: true.
// Copy là merge: file trong preview ghi đè, file không có trong preview giữ nguyên.
// Riêng `_registry.json` dùng chung cho mọi object của product: chỉ entry của các
// object trong --objects được lấy từ preview, entry khác giữ theo knowledge/ hiện tại
// (preview dựng từ base cũ, chép đè sẽ xoá entry mà run khác vừa publish).
// File dùng chung (guide, _env.example, _flows/) theo `planSharedFiles`: run không sửa thì giữ bản
// trong knowledge/; run có sửa mà knowledge/ đã đổi thì dừng với `shared_file_changed`, không ghi gì.
// Exit 2 = lock không còn thuộc run (outcome DEFERRED, reason lock_lost). Exit 1 = lỗi khác.

import { cp } from "node:fs/promises";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import path from "node:path";
import { parseArgs, readJson, readJsonOr, writeJson } from "../lib/fs-utils.mjs";
import { resolveRunDir, runPaths, knowledgeProductsDir, rootDir } from "../lib/run-layout.mjs";
import { verifyAll, acquireAll, releaseAll } from "../lib/locks.mjs";
import { planSharedFiles } from "../lib/shared-files.mjs";
import { auditDir } from "./audit-preview.mjs";

const execFileAsync = promisify(execFile);

export function mergeRegistry(current, preview, objectKeys) {
  if (!current) return preview;
  const fromPreview = new Map((preview?.objects ?? []).filter((o) => objectKeys.includes(o.object_key)).map((o) => [o.object_key, o]));
  const objects = (current.objects ?? []).map((o) => fromPreview.get(o.object_key) ?? o);
  for (const [key, o] of fromPreview) if (!objects.some((x) => x.object_key === key)) objects.push(o);
  return { ...current, objects };
}

async function main() {
  const args = parseArgs();
  if (typeof args.run !== "string" || typeof args.objects !== "string") {
    console.error("Cần --run CTX-... --objects a,b");
    process.exit(1);
  }
  const runDir = resolveRunDir(args.run);
  const paths = runPaths(runDir);
  const manifest = await readJson(paths.manifest);
  const ctxRunId = manifest.run_id ?? manifest.ctx_run_id ?? path.basename(runDir);
  const product = manifest.product;

  const verdict = await readJsonOr(paths.verdict, null);
  const publishAllowed = verdict?.publish_allowed ?? verdict?.payload?.publish_allowed;
  if (publishAllowed !== true) {
    console.error("Dừng: review/verdict.json chưa có publish_allowed: true.");
    process.exit(1);
  }

  const keys = args.objects.split(",").map((o) => o.trim()).filter(Boolean).map((object) => ({ product, object }));
  const lock = await verifyAll(keys, { ctxRunId });
  if (!lock.ok) {
    console.log(JSON.stringify({ ok: false, outcome: "DEFERRED", reason: "lock_lost", lock_problems: lock.problems }, null, 2));
    process.exit(2);
  }

  const audit = await auditDir(paths.previewDir);
  if (!audit.ok) {
    console.log(JSON.stringify({ ok: false, reason: "audit preview còn finding BLOCKING", blocking: audit.blocking }, null, 2));
    process.exit(1);
  }

  const target = path.join(knowledgeProductsDir, product);
  if (args["dry-run"] === true) {
    console.log(JSON.stringify({ ok: true, dry_run: true, from: path.relative(rootDir, paths.previewDir), to: path.relative(rootDir, target), shared: await planSharedFiles(paths.previewDir, target) }, null, 2));
    return;
  }

  // knowledge/manifest.json và consolidated-open-questions.md bị ghi đè toàn bộ —
  // hai run publish gần nhau phải xếp hàng ở đây. `_shared` cũng do CCR §2b giữ khi sửa guide/flow.
  const manifestLock = await acquireAll(["_manifest", "_shared"], { ctxRunId, ttlSeconds: 600 });
  if (!manifestLock.ok) {
    console.log(JSON.stringify({ ok: false, reason: "run khác đang sinh manifest, chạy lại sau", held_by: manifestLock.conflict }, null, 2));
    process.exit(1);
  }
  try {
    const shared = await planSharedFiles(paths.previewDir, target);
    if (shared.conflicts.length) {
      console.log(JSON.stringify({ ok: false, reason: "shared_file_changed", conflicts: shared.conflicts }, null, 2));
      process.exitCode = 1;
      return;
    }
    const keepCurrent = new Set(shared.skip.map((rel) => path.join(paths.previewDir, rel)));
    const previewRegistry = path.join(paths.previewDir, "_registry.json");
    const registry = path.join(target, "_registry.json");
    await cp(paths.previewDir, target, { recursive: true, force: true, filter: (src) => src !== previewRegistry && !keepCurrent.has(src) });
    const preview = await readJsonOr(previewRegistry, null);
    if (preview) await writeJson(registry, mergeRegistry(await readJsonOr(registry, null), preview, keys.map((k) => k.object)));
    const { stdout } = await execFileAsync("node", [path.join(rootDir, "scripts", "generate-manifest.mjs")], { cwd: rootDir });
    console.log(JSON.stringify({ ok: true, copied_to: path.relative(rootDir, target), shared_written: shared.write, manifest: stdout.trim().split("\n").slice(-3) }, null, 2));
  } finally {
    await releaseAll(["_manifest", "_shared"], { ctxRunId });
  }
}

if (import.meta.url === `file://${process.argv[1]}`) main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
