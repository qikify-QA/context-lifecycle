#!/usr/bin/env node
// Cấp CTX-RUN-ID (contract §4) bằng exclusive mkdir, dựng cây thư mục run (§5)
// và ghi run-manifest.json khởi tạo.
//
//   node scripts/ctx/new-run.mjs --product <key> --mode <MODE> [--object <object_key>]
//        [--proposal CBS-<n>] [--label "<vài từ>"] [--date YYYY-MM-DD]
//
// In JSON { ctx_run_id, run_dir } ra stdout. Exit 1 khi input sai.

import { randomUUID } from "node:crypto";
import { acquireAll, releaseAll } from "../lib/locks.mjs";
import { readdir } from "node:fs/promises";
import { readJsonOr } from "../lib/fs-utils.mjs";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { getProduct } from "../lib/product-config.mjs";
import { parseArgs, writeJson, today } from "../lib/fs-utils.mjs";
import { runsContextDir, RUN_SUBDIRS, runPaths } from "../lib/run-layout.mjs";

/** Tạo thư mục run mới dưới `base`. Tách ra để test được. */
async function createRunUnlocked({ product, mode, objectKey = null, proposalId = null, label = null, date = today(), base = runsContextDir }) {
  const dateDir = path.join(base, date);
  await mkdir(dateDir, { recursive: true });
  const compact = date.replaceAll("-", "");
  for (let n = 1; n < 1000; n++) {
    const id = `CTX-${compact}-${String(n).padStart(2, "0")}`;
    const runDir = path.join(dateDir, id);
    try {
      await mkdir(runDir); // không recursive: EEXIST nghĩa là id đã có chủ
    } catch (e) {
      if (e.code === "EEXIST") continue;
      throw e;
    }
    for (const sub of RUN_SUBDIRS) await mkdir(path.join(runDir, sub), { recursive: true });
    await writeJson(runPaths(runDir).manifest, {
      schema_version: "1.0",
      run_id: id,
      product,
      mode,
      mode_settled_at: null,
      status: "IN_PROGRESS",
      source: { type: proposalId ? "ContextChangeRequest" : "DirectOperatorRequest", proposal_id: proposalId },
      label,
      object_target: { object_key: objectKey },
      started_at: date,
      gate_results: [],
      produced_open_questions: []
    });
    return { ctx_run_id: id, run_dir: runDir };
  }
  throw new Error(`hết số run cho ngày ${date}`);
}

export async function createRun(options){
 const base=options.base??runsContextDir;
 if(!options.proposalId)return createRunUnlocked(options);
 const guard={dir:path.join(base,'.intake-locks'),ctxRunId:`intake-${randomUUID()}`,ttlSeconds:60};
 const locked=await acquireAll(['intake'],guard);if(!locked.ok)throw new Error('proposal_intake_busy');
 try{
  for(const date of await readdir(base,{withFileTypes:true})){
   if(!date.isDirectory()||!/^\d{4}-\d{2}-\d{2}$/.test(date.name))continue;
   for(const run of await readdir(path.join(base,date.name),{withFileTypes:true})){
    if(!run.isDirectory())continue;
    const m=await readJsonOr(path.join(base,date.name,run.name,'run-manifest.json'),null);
    if(m?.product===options.product&&m?.source?.proposal_id===options.proposalId&&['IN_PROGRESS','REWORK_REQUIRED','PUBLISHED'].includes(m.status)){
     const e=new Error(`proposal_already_claimed: ${run.name} (${m.status}); resume or report existing outcome, do not finish DEFERRED`);e.code='PROPOSAL_CLAIMED';throw e;
    }
   }
  }
  return await createRunUnlocked(options);
 }finally{await releaseAll(['intake'],guard);}
}

async function main() {
  const args = parseArgs();
  if (!args.product || !args.mode) {
    console.error("Cần --product và --mode");
    process.exit(1);
  }
  const cfg = await getProduct(args.product);
  if (!cfg) {
    console.error(`Không có config/products/${args.product}.json — dừng, không đoán mặc định.`);
    process.exit(1);
  }
  if (cfg.status !== "ACTIVE") {
    console.error(`Product ${args.product} có status ${cfg.status}, không phải ACTIVE.`);
    process.exit(1);
  }
  const allowed = cfg.modes?.allowed_modes ?? [];
  if (!allowed.includes(args.mode)) {
    console.error(`Mode ${args.mode} không nằm trong modes.allowed_modes của ${args.product}: ${allowed.join(", ")}`);
    process.exit(1);
  }
  const out = await createRun({
    product: args.product,
    mode: args.mode,
    objectKey: typeof args.object === "string" ? args.object : null,
    proposalId: typeof args.proposal === "string" ? args.proposal : null,
    label: typeof args.label === "string" ? args.label : null,
    date: typeof args.date === "string" ? args.date : today()
  });
  console.log(JSON.stringify(out));
}

if (import.meta.url === `file://${process.argv[1]}`) main().catch((e) => {
  console.error(e.message || e);
  process.exit(e.code==='PROPOSAL_CLAIMED'?3:1);
});
