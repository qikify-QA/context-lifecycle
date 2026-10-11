#!/usr/bin/env node
// Kiểm trùng tất định cho claim của một run CCR (chạy ở cuối Gate C0.5,
// contracts/ccr-protocol.md §12.3a). Read-only.
//
//   node scripts/ctx/dedup.mjs --run CTX-...
//
// Một claim bị coi là trùng khi, cùng product + object, nó có chung ≥1 dấu hiệu với
// một claim của run CCR khác đang IN_PROGRESS hoặc đã PUBLISHED:
//   - target_kb_ids giao nhau
//   - cùng confirmation_source (citation/locator chuẩn hoá)
// Ngoài ra báo claim nhắm vào kb_id đang có open question mở trong knowledge/
// (`covered_by_open_question`) — thông tin, không tự loại claim.
// Script chỉ báo; orchestrator quyết (bỏ claim trùng, hoặc REJECTED + duplicate_of).

import { readFile } from "node:fs/promises";
import path from "node:path";
import { parseArgs, readJsonOr, walk, exists } from "../lib/fs-utils.mjs";
import { resolveRunDir, runPaths, runsContextDir, knowledgeProductsDir } from "../lib/run-layout.mjs";
import { extractOpenQuestions } from "../lib/open-questions.mjs";

const ACTIVE = new Set(["IN_PROGRESS", "PUBLISHED"]);
const norm = (s) => String(s ?? "").toLowerCase().replace(/\s+/g, " ").trim();

function sourceKey(cs) {
  if (!cs) return null;
  const ref = typeof cs.ref === "string" ? cs.ref : cs.ref?.citation ?? cs.ref?.locator ?? cs.ref?.url;
  return ref ? `${cs.type}:${norm(ref)}` : null;
}

/** So claim của `plan` với các plan khác. Trả { duplicates, covered_by_open_question }. */
export function findDuplicates(plan, others, openKbIds = new Set()) {
  const duplicates = [];
  const covered = [];
  for (const claim of plan.claims ?? []) {
    const targets = new Set(claim.target_kb_ids ?? []);
    const src = sourceKey(claim.confirmation_source);
    for (const other of others) {
      if (other.product !== plan.product_key || other.object !== plan.object_key) continue;
      for (const oc of other.plan.claims ?? []) {
        const basis = [];
        if ((oc.target_kb_ids ?? []).some((id) => targets.has(id))) basis.push("same_target_kb_ids");
        if (src && src === sourceKey(oc.confirmation_source)) basis.push("same_confirmation_source");
        if (basis.length) {
          duplicates.push({ claim_key: claim.claim_key, duplicate_of: { proposal_id: other.plan.proposal_id ?? null, run_id: other.runId, claim_key: oc.claim_key, status: other.status }, basis });
        }
      }
    }
    const hit = [...targets].filter((id) => openKbIds.has(id));
    if (hit.length) covered.push({ claim_key: claim.claim_key, kb_ids: hit });
  }
  return { duplicates, covered_by_open_question: covered };
}

async function loadOtherPlans(selfDir) {
  const out = [];
  for (const file of await walk(runsContextDir)) {
    if (path.basename(file) !== "ccr-fastpath-plan.json") continue;
    const runDir = path.dirname(path.dirname(file));
    if (path.resolve(runDir) === path.resolve(selfDir)) continue;
    const manifest = await readJsonOr(path.join(runDir, "run-manifest.json"), {});
    if (!ACTIVE.has(manifest.status)) continue;
    const plan = await readJsonOr(file, null);
    if (!plan) continue;
    out.push({
      runId: manifest.run_id ?? manifest.ctx_run_id ?? path.basename(runDir),
      status: manifest.status,
      product: plan.product_key ?? manifest.product,
      object: plan.object_key ?? manifest.object_target?.object_key,
      plan
    });
  }
  return out;
}

async function openKbIdsFor(product, object) {
  const file = path.join(knowledgeProductsDir, product ?? "", object ?? "", "open-questions.md");
  if (!product || !object || !(await exists(file))) return new Set();
  const ids = new Set();
  for (const e of extractOpenQuestions(await readFile(file, "utf8"))) for (const id of [].concat(e.kb_id ?? [], e.kb_ids ?? [])) ids.add(id);
  return ids;
}

async function main() {
  const args = parseArgs();
  if (typeof args.run !== "string") {
    console.error("Cần --run CTX-...");
    process.exit(1);
  }
  const runDir = resolveRunDir(args.run);
  const plan = await readJsonOr(runPaths(runDir).ccrPlan, null);
  if (!plan) {
    console.error("Run chưa có input/ccr-fastpath-plan.json");
    process.exit(1);
  }
  const result = findDuplicates(plan, await loadOtherPlans(runDir), await openKbIdsFor(plan.product_key, plan.object_key));
  console.log(JSON.stringify(result, null, 2));
}

if (import.meta.url === `file://${process.argv[1]}`) main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
