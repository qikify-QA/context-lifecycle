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

import {validateMaintenanceChanges} from "../lib/data-maintenance.mjs";
import { withFileRollback } from "../lib/file-transaction.mjs";
import { exists } from "../lib/fs-utils.mjs";
import { verifyReview, verdictProblems, digest } from "../lib/review-state.mjs";
import { isSharedFile } from "../lib/shared-files.mjs";
import { walk } from "../lib/fs-utils.mjs";
import { readFile, readdir, writeFile, mkdir } from "node:fs/promises";
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

// Deterministic data maintenance explicitly requested by the operator. Uses the
// same canonical writer, locks and rollback as normal apply; no new authority.
export async function applyDataMaintenance(plan,{targetDir=path.join(rootDir,'knowledge'),lockDir,regenerate}={}){
  validateMaintenanceChanges(plan.changes);
  if(!plan.summary?.audit?.ok)throw new Error('maintenance_preview_not_clean');
  const ctxRunId=`maintenance-${Date.now()}-${process.pid}`;
  const opts={ctxRunId,...(lockDir?{dir:lockDir}:{})};
  const keys=[...plan.objects,'_manifest','_shared'];
  const lock=await acquireAll(keys,opts);if(!lock.ok)throw new Error('maintenance_locked_by_run');
  try{
    const current={};for(const f of await walk(path.join(targetDir,'products')))current[path.relative(targetDir,f)]=digest(await readFile(f));
    if(JSON.stringify(Object.entries(current).sort())!==JSON.stringify(Object.entries(plan.baseline).sort()))throw new Error('maintenance_base_changed');
    const audit=await auditDir(plan.preview);if(!audit.ok)throw new Error('maintenance_preview_changed_or_invalid');
    for(const change of plan.changes){
      if(!/^products\/[a-z0-9-]+\//.test(change.rel)||change.rel.split(/[\\/]/).includes('..'))throw new Error('unsafe_maintenance_path');
      if(!Buffer.from(await readFile(path.join(plan.temp,'products',path.relative('products',change.rel)))).equals(change.after))throw new Error('maintenance_content_changed');
      const target=path.join(targetDir,change.rel);
      const before=await readFile(target).catch(e=>{if(e.code==='ENOENT')return null;throw e;});
      if((before===null)!==(change.before===null)||before&&!before.equals(change.before))throw new Error('maintenance_base_changed');
      if(before){const backup=path.join(plan.temp,'backup',change.rel);await mkdir(path.dirname(backup),{recursive:true});await writeFile(backup,before);}
    }
    const generated=['manifest.json','_open-issues/consolidated-open-questions.md'];
    for(const rel of generated){const before=await readFile(path.join(targetDir,rel)).catch(()=>null);if(before){const backup=path.join(plan.temp,'backup',rel);await mkdir(path.dirname(backup),{recursive:true});await writeFile(backup,before);}}
    await withFileRollback([...plan.changes.map(c=>path.join(targetDir,c.rel)),...generated.map(rel=>path.join(targetDir,rel))],async()=>{
      for(const change of plan.changes){const file=path.join(targetDir,change.rel);await mkdir(path.dirname(file),{recursive:true});await writeFile(file,change.after);}
      if(regenerate)await regenerate();else await execFileAsync(process.execPath,[path.join(rootDir,'scripts/generate-manifest.mjs')],{cwd:rootDir});
      const result=await auditDir(path.join(targetDir,'products'));if(!result.ok)throw new Error('maintenance_post_apply_audit_failed');
    });
  }finally{await releaseAll(keys,opts);}
}

export function mergeRegistry(current, preview, objectKeys) {
  if (!current) return {...preview,objects:(preview?.objects??[]).filter(o=>objectKeys.includes(o.object_key))};
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
  if(typeof product!=="string"||! /^[a-z0-9][a-z0-9-]*$/.test(product))throw new Error("invalid_product_scope");

  const verdict = await readJsonOr(paths.verdict, null);
  const publishAllowed = verdict?.publish_allowed ?? verdict?.payload?.publish_allowed;
  const verdictErrors=verdictProblems(verdict,{mode:manifest.mode,ccr:Boolean(manifest.source?.proposal_id||manifest.mode_settled_at==="C0.5")});
  if (publishAllowed !== true || verdictErrors.length) {
    console.error("Dừng: review/verdict.json chưa có publish_allowed: true.");
    process.exit(1);
  }

  const requested=args.objects.split(",").map(o=>o.trim()).filter(Boolean);
  if(!requested.length||requested.some(o=>! /^[a-z0-9][a-z0-9-]*$/.test(o)))throw new Error("invalid_or_empty_object_scope");
  const entries=await readdir(paths.previewDir,{withFileTypes:true});
  const allowedRoot=new Set(["_registry.json","_product-kb.json","_product-guide.md","_env.example","_flows"]);
  if(entries.some(e=>(e.name.startsWith("_")&&!allowedRoot.has(e.name))||(!e.isDirectory()&&!allowedRoot.has(e.name))))throw new Error("unapproved_preview_root_path");
  const previewObjects=entries.filter(e=>e.isDirectory()&&!e.name.startsWith('_')).map(e=>e.name);
  if(previewObjects.some(o=>!requested.includes(o))||requested.some(o=>!previewObjects.includes(o)))throw new Error("preview_object_scope_mismatch");
  const keys=[...new Set(requested)].map(object=>({product,object}));
  const receiptFile=path.join(runDir,"review/publish-receipt.json");
  const previous=await readJsonOr(receiptFile,null);
  if(previous&&previous.verdict_sha256===digest(await readFile(paths.verdict))){
    let same=true;for(const [rel,hash] of Object.entries(previous.written??{}))if(digest(await readFile(path.join(knowledgeProductsDir,product,rel)))!==hash)same=false;
    if(same){console.log(JSON.stringify({ok:true,already_applied:true}));return;}
  }
  const stripSummary=await readJsonOr(path.join(runDir,"candidate/strip-summary.json"),null);
  if(!stripSummary||stripSummary.problems?.length)throw new Error("strip_summary_missing_or_blocked");
  await verifyReview(runDir);
  const lock = await verifyAll(keys, { ctxRunId });
  if (!lock.ok) {
    console.log(JSON.stringify({ ok: false, outcome: "DEFERRED", reason: "lock_lost", lock_problems: lock.problems }, null, 2));
    process.exit(2);
  }

  const audit = await auditDir(paths.previewDir,{product,baseDir:path.join(knowledgeProductsDir,product),strictIds:true});
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
    const objectLocks=await verifyAll(keys,{ctxRunId});
    if(!objectLocks.ok)throw new Error("lock_lost");
    await verifyReview(runDir);
    const shared = await planSharedFiles(paths.previewDir, target);
    if (shared.conflicts.length) {
      console.log(JSON.stringify({ ok: false, reason: "shared_file_changed", conflicts: shared.conflicts }, null, 2));
      process.exitCode = 1;
      return;
    }
    const keepCurrent = new Set(shared.skip.map((rel) => path.join(paths.previewDir, rel)));
    const previewRegistry = path.join(paths.previewDir, "_registry.json");
    const registry = path.join(target, "_registry.json");
    const targetFiles=(await walk(paths.previewDir)).map(f=>path.join(target,path.relative(paths.previewDir,f)));
    const newDirectories=[];for(const object of requested)if(!await exists(path.join(target,object)))newDirectories.push(path.join(target,object));
    await withFileRollback([...targetFiles,registry,path.join(rootDir,"knowledge/manifest.json"),path.join(rootDir,"knowledge/_open-issues/consolidated-open-questions.md"),receiptFile],async()=>{
    await cp(paths.previewDir, target, { recursive: true, force: true, filter: (src) => { const rel=path.relative(paths.previewDir,src); return src!==previewRegistry&&!keepCurrent.has(src)&&(!rel||rel.startsWith("_")||requested.includes(rel.split(path.sep)[0])); } });
    const preview = await readJsonOr(previewRegistry, null);
    if (preview) await writeJson(registry, mergeRegistry(await readJsonOr(registry, null), preview, keys.map((k) => k.object)));
    const { stdout } = await execFileAsync("node", [path.join(rootDir, "scripts", "generate-manifest.mjs")], { cwd: rootDir });
    const written={};for(const file of await walk(paths.previewDir)){const rel=path.relative(paths.previewDir,file);if(keepCurrent.has(file)||rel==="_registry.json")continue;written[rel]=digest(await readFile(path.join(target,rel)));}
    await writeJson(receiptFile,{verdict_sha256:digest(await readFile(paths.verdict)),objects:requested,written});
    console.log(JSON.stringify({ ok: true, copied_to: path.relative(rootDir, target), shared_written: shared.write, manifest: stdout.trim().split("\n").slice(-3) }, null, 2));
    },{newDirectories});
  } finally {
    await releaseAll(["_manifest", "_shared"], { ctxRunId });
  }
}

if (import.meta.url === `file://${process.argv[1]}`) main().catch((e) => {
  if(e.message==="lock_lost"){console.log(JSON.stringify({ok:false,outcome:"DEFERRED",reason:"lock_lost"}));process.exit(2);}
  console.error(e.message || e);
  process.exit(1);
});
