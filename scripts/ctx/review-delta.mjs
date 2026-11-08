#!/usr/bin/env node
// Liệt kê file của run đã đổi kể từ lần review trước, để review vòng 2+ chỉ kiểm phần đổi + C6
// (skill ctx-review). Tất định, chỉ so hash; không phán đoán gì về nội dung.
//
//   node scripts/ctx/review-delta.mjs --run CTX-... --snapshot   # ghi review/reviewed-hashes.json (gọi ngay sau mỗi verdict)
//   node scripts/ctx/review-delta.mjs --run CTX-...              # in {full, changed, added, removed}
//
// Phạm vi: input/, raw/ccr-evidence/, intermediate/, candidate/ (gồm publish-preview), review/knowledge-diff.json.
// Không tính: review/verdict*.json, step-log, chính file snapshot.
// Chưa có snapshot → {"full": true}: review lần đầu phải kiểm toàn bộ.

import { createHash } from "node:crypto";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { parseArgs, walk, readJson, writeJson, exists } from "../lib/fs-utils.mjs";
import { resolveRunDir } from "../lib/run-layout.mjs";

const SNAPSHOT = path.join("review", "reviewed-hashes.json");
const SCOPE = ["input", path.join("raw", "ccr-evidence"), "intermediate", "candidate", path.join("review", "knowledge-diff.json")];

export async function hashRun(runDir) {
  const out = {};
  for (const rel of SCOPE) {
    const abs = path.join(runDir, rel);
    const st = await stat(abs).catch(() => null);
    const files = !st ? [] : st.isDirectory() ? await walk(abs) : [abs];
    for (const f of files) {
      const key = path.relative(runDir, f);
      out[key] = createHash("sha256").update(await readFile(f)).digest("hex");
    }
  }
  return out;
}

export function compare(before, now) {
  const changed = [], added = [], removed = [];
  for (const [k, h] of Object.entries(now)) {
    if (!(k in before)) added.push(k);
    else if (before[k] !== h) changed.push(k);
  }
  for (const k of Object.keys(before)) if (!(k in now)) removed.push(k);
  return { full: false, changed: changed.sort(), added: added.sort(), removed: removed.sort() };
}

async function main() {
  const args = parseArgs();
  if (!args.run) {
    console.error("Cần --run <CTX-RUN-ID>");
    process.exit(2);
  }
  const runDir = resolveRunDir(args.run);
  if (!(await exists(runDir))) {
    console.error(`Không thấy run: ${runDir}`);
    process.exit(2);
  }
  const now = await hashRun(runDir);
  const snap = path.join(runDir, SNAPSHOT);
  if (args.snapshot === true) {
    await writeJson(snap, now);
    console.log(JSON.stringify({ ok: true, files: Object.keys(now).length }));
    return;
  }
  if (!(await exists(snap))) {
    console.log(JSON.stringify({ full: true }));
    return;
  }
  console.log(JSON.stringify(compare(await readJson(snap), now), null, 2));
}

if (import.meta.url === `file://${process.argv[1]}`) main();
