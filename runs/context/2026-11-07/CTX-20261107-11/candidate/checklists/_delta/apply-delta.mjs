#!/usr/bin/env node
// Sinh candidate/checklists/storefront-buyer-facing.json = checklist base v16 + delta CBS-098, giữ nguyên base.
//
//   node runs/context/2026-11-07/CTX-20261107-11/candidate/checklists/_delta/apply-delta.mjs
//
// Chỉ đọc knowledge/, chỉ ghi một file trong thư mục run. Chạy lại cho cùng kết quả.
// Exit 0 = đã ghi, 1 = kiểm tra thất bại, không ghi gì.

import { readFile, writeFile } from "node:fs/promises";
import { isDeepStrictEqual } from "node:util";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const runDir = path.resolve(here, "../../..");
const repo = path.resolve(runDir, "../../../..");
const key = "storefront-buyer-facing";
const basePath = path.join(repo, "knowledge/products/teeinblue/sdk/checklists", `${key}.json`);
const shardPath = path.join(runDir, "candidate/product-kb", `${key}.json`);
const outPath = path.join(runDir, "candidate/checklists", `${key}.json`);
const readJson = async (f) => JSON.parse(await readFile(f, "utf8"));

const base = await readJson(basePath);
const shard = await readJson(shardPath);
const delta = await readJson(path.join(here, `${key}.delta.json`));

const problems = [];
const idNum = (id) => Number(String(id).replace(/^CHK-/, ""));
const fmt = (n) => `CHK-${String(n).padStart(3, "0")}`;

// Base: đúng số check, id liên tục tới CHK-<count>.
if (base.checks.length !== delta.base_checks_count) problems.push(`base có ${base.checks.length} check, delta giả định ${delta.base_checks_count}`);
base.checks.forEach((c, i) => { if (c.check_id !== fmt(i + 1)) problems.push(`base check thứ ${i + 1} là ${c.check_id}`); });

// Check mới: id liên tục từ CHK-<count+1>, không trùng base.
const baseIds = new Set(base.checks.map((c) => c.check_id));
delta.checks_append.forEach((c, i) => {
  const want = fmt(delta.base_checks_count + 1 + i);
  if (c.check_id !== want) problems.push(`check mới thứ ${i + 1} là ${c.check_id}, cần ${want}`);
  if (baseIds.has(c.check_id)) problems.push(`check mới trùng id base: ${c.check_id}`);
});

// Luật oracle (C5) trên check mới, đối chiếu shard.
const items = new Map(shard.payload.kb_candidates.map((i) => [i.kb_id, i]));
const conflictIds = new Set((shard.payload.conflicts ?? []).flatMap((c) => [c.side_a?.kb_id, c.side_b?.kb_id, ...(c.kb_ids ?? [])]).filter(Boolean));
const strongOk = (id) => {
  const it = items.get(id);
  if (!it || it.knowledge_kind !== "CONFIRMED_EXPECTED") return false;
  if (it.status === "UNRESOLVED" || it.status === "KNOWN_DEFECT" || it.conflict_group || conflictIds.has(id)) return false;
  const cs = it.confirmation_source;
  if (!cs) return false;
  if (cs.type === "dev_doc" && cs.derivation !== "prose") return false;
  return true;
};
const NEVER_ORACLE = new Set(["KB-507", "KB-512"]);
const PROSE_BAD = /\bOQ-DRAFT-|\bCLAIM-\d|\bCLM-\d|\bDSEC-\d|\bACT-\d|\bCTX-\d{8}-\d|runs\/|\boq_id\b/;
for (const c of delta.checks_append) {
  const at = c.check_id;
  const o = c.oracle ?? {};
  const ids = o.kb_ids ?? [];
  for (const id of [...ids, ...(c.related_kb_ids ?? []), ...(c.regression_watch_kb_ids ?? [])]) {
    if (!items.has(id)) problems.push(`${at}: ${id} không có trong shard`);
  }
  for (const id of ids) {
    if (NEVER_ORACLE.has(id)) problems.push(`${at}: ${id} không được làm oracle`);
    if (items.get(id)?.status === "KNOWN_DEFECT") problems.push(`${at}: KNOWN_DEFECT ${id} trong oracle.kb_ids`);
  }
  if (o.oracle_strength === "STRONG") {
    if (!ids.length || !ids.every(strongOk)) problems.push(`${at}: STRONG nhưng có kb_id không đủ điều kiện`);
  } else if (o.oracle_strength === "BASELINE") {
    if (!ids.some((id) => items.get(id)?.knowledge_kind === "OBSERVED_CURRENT")) problems.push(`${at}: BASELINE không có item OBSERVED_CURRENT`);
    if (c.status !== "NEEDS_CONFIRMATION") problems.push(`${at}: BASELINE từ item LOW phải NEEDS_CONFIRMATION`);
  } else if (o.oracle_strength === "NONE") {
    if (ids.length) problems.push(`${at}: NONE phải có kb_ids rỗng`);
    if (c.status !== "NEEDS_CONFIRMATION") problems.push(`${at}: NONE phải NEEDS_CONFIRMATION`);
    if (c.expected_result) problems.push(`${at}: NONE không được có expected_result`);
  } else problems.push(`${at}: oracle_strength sai`);
  if (c.status === "NEEDS_CONFIRMATION" && !c.open_question_draft) problems.push(`${at}: thiếu open_question_draft`);
  if ((c.act_ids ?? []).length) problems.push(`${at}: CCR_INGEST không có act_ids`);
  const { evidence_refs, ...prose } = c;
  if (PROSE_BAD.test(JSON.stringify(prose))) problems.push(`${at}: prose chứa id run-local / OQ nháp / đường dẫn runs`);
}
const appendIds = new Set(delta.checks_append.map((c) => c.check_id));
for (const n of delta.checks_needing_confirmation_append) {
  if (!appendIds.has(n.check_id)) problems.push(`checks_needing_confirmation trỏ check không có: ${n.check_id}`);
  if (PROSE_BAD.test(JSON.stringify(n))) problems.push(`checks_needing_confirmation ${n.check_id}: chứa id run-local / OQ nháp`);
}
for (const c of delta.checks_append.filter((c) => c.status === "NEEDS_CONFIRMATION")) {
  if (!delta.checks_needing_confirmation_append.some((n) => n.check_id === c.check_id)) problems.push(`${c.check_id} NEEDS_CONFIRMATION chưa có trong checks_needing_confirmation`);
}
// Mọi item mới của shard phải được check mới dùng.
const used = new Set(delta.checks_append.flatMap((c) => [...(c.oracle?.kb_ids ?? []), ...(c.related_kb_ids ?? [])]));
for (const it of shard.payload.kb_candidates.filter((i) => i.relation === "ADD")) {
  if (!used.has(it.kb_id)) problems.push(`item mới chưa có check: ${it.kb_id}`);
}

const checklist = {
  feature_id: base.feature_id,
  feature_key: base.feature_key,
  object_id: base.object_id,
  checklist_version: delta.checklist_version,
  checks: [...base.checks, ...delta.checks_append]
};
const payload = {
  checklists: [checklist],
  coverage_by_feature_and_risk: [...(base.coverage_by_feature_and_risk ?? []), ...delta.coverage_append],
  checks_needing_confirmation: delta.checks_needing_confirmation_append,
  duplicates_removed: [],
  excluded_dimensions: [...(base.excluded_dimensions ?? []), ...delta.excluded_dimensions_append]
};

// Base không bị đổi.
if (!isDeepStrictEqual(checklist.checks.slice(0, base.checks.length), base.checks)) problems.push("base checks bị đổi");
if (!isDeepStrictEqual(payload.coverage_by_feature_and_risk.slice(0, (base.coverage_by_feature_and_risk ?? []).length), base.coverage_by_feature_and_risk ?? [])) problems.push("base coverage bị đổi");
if (!isDeepStrictEqual(payload.excluded_dimensions.slice(0, (base.excluded_dimensions ?? []).length), base.excluded_dimensions ?? [])) problems.push("base excluded_dimensions bị đổi");

if (problems.length) {
  console.error(JSON.stringify({ ok: false, problems }, null, 2));
  process.exit(1);
}

const artifact = { ...delta.envelope, payload, gate: delta.envelope.gate };
await writeFile(outPath, `${JSON.stringify(artifact, null, 2)}\n`);
console.log(JSON.stringify({
  ok: true,
  out: outPath,
  checks: checklist.checks.length,
  new_checks: delta.checks_append.map((c) => `${c.check_id}:${c.oracle.oracle_strength}`),
  checks_needing_confirmation: payload.checks_needing_confirmation.map((n) => n.check_id)
}, null, 2));
