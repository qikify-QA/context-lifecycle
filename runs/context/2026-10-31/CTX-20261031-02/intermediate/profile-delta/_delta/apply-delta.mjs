#!/usr/bin/env node
// Materialize candidate/feature-profiles/<feature-key>.json = profile base (knowledge/, read-only)
// + delta của run này (candidate/feature-profiles/_delta/<feature-key>.delta.json).
//
// Lý do tồn tại: feature-profile-builder của CTX-20261031-02 không có shell và profile base
// storefront-buyer-facing (~3600 dòng) quá lớn để chép tay nguyên văn. Merge tất định ở đây
// bảo đảm carry-forward nguyên văn: mọi phần tử base giữ nguyên, phần mới chỉ append
// cuối mảng (index cũ không đổi).
//
//   node runs/context/2026-10-31/CTX-20261031-02/candidate/feature-profiles/_delta/apply-delta.mjs
//   ... --dry-run                 # chỉ in summary, không ghi
//   ... --keep-base-feature-id    # giữ FEAT-07/FEAT-08 của base thay vì FEATURE-ID của shard run này
//
// Read-only với knowledge/. Chỉ ghi candidate/feature-profiles/<feature-key>.json của run này.
// All-or-nothing: có lỗi ở bất kỳ delta nào thì không ghi file nào.
// Exit 0 = đã ghi (hoặc dry-run sạch), 1 = có lỗi trace/prose.

import { readFile, writeFile, readdir, access } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const profilesDir = path.resolve(here, "..");
const runDir = path.resolve(here, "..", "..", "..");

async function findRoot(dir) {
  let d = dir;
  for (;;) {
    try {
      await access(path.join(d, "contracts", "qa-context-contract.md"));
      return d;
    } catch {}
    const p = path.dirname(d);
    if (p === d) throw new Error("không tìm thấy repo root (contracts/qa-context-contract.md)");
    d = p;
  }
}

const root = await findRoot(here);
const argv = new Set(process.argv.slice(2));
const keepBaseId = argv.has("--keep-base-feature-id");
const dryRun = argv.has("--dry-run");

const readJson = async (p) => JSON.parse(await readFile(p, "utf8"));
const clone = (x) => (x === undefined ? undefined : JSON.parse(JSON.stringify(x)));

const PROFILE_ARRAYS = [
  "actors", "entry_points", "capabilities", "state_transitions", "confirmed_rules",
  "observed_behavior", "observed_validations", "permissions", "dependencies", "risks", "unknown_areas"
];
const SURFACES = ["portal", "storefront", "api", "data", "code"];
const PAYLOAD_ARRAYS = ["coverage_matrix", "profile_conflicts", "profile_relationships"];
// Key bị publish strip xoá (contracts/forbidden-fields.json) + key nội bộ của delta: không kiểm prose.
const SKIP_PROSE_KEYS = new Set(["act_ids", "run_id", "_oq_draft", "_relates_to_existing_oq"]);
// contracts/forbidden-fields.json id_in_prose_patterns + path_patterns
const FORBIDDEN_PROSE = [/\bACT-\d/, /\bAPIOP-\d/, /\bCTX-\d{8}-\d/, /\bOQ-DRAFT-/, /\bDOC-\d/, /\bDSEC-\d/, /\bCLM-\d/, /runs\/context/, /input\/docs/];

function collectRefs(node, out = new Set()) {
  if (Array.isArray(node)) node.forEach((n) => collectRefs(n, out));
  else if (node && typeof node === "object") {
    for (const [k, v] of Object.entries(node)) {
      if ((k === "kb_refs" || k === "user_goal_kb_refs") && Array.isArray(v)) v.forEach((id) => out.add(id));
      else collectRefs(v, out);
    }
  }
  return out;
}

function proseHits(node, at, out = []) {
  if (typeof node === "string") {
    for (const re of FORBIDDEN_PROSE) if (re.test(node)) out.push({ path: at, pattern: String(re) });
  } else if (Array.isArray(node)) node.forEach((n, i) => proseHits(n, `${at}[${i}]`, out));
  else if (node && typeof node === "object") {
    for (const [k, v] of Object.entries(node)) if (!SKIP_PROSE_KEYS.has(k)) proseHits(v, `${at}.${k}`, out);
  }
  return out;
}

// Mọi phần tử object trong mảng delta phải có kb_refs không rỗng (trace về KB, C4).
function missingKbRefs(list, at) {
  return (list ?? []).flatMap((n, i) =>
    n && typeof n === "object" && !Array.isArray(n) && !(Array.isArray(n.kb_refs) && n.kb_refs.length) ? [`${at}[${i}]`] : []
  );
}

const deltaFiles = (await readdir(here)).filter((f) => f.endsWith(".delta.json")).sort();
const results = [];
const pendingWrites = [];

for (const file of deltaFiles) {
  const delta = await readJson(path.join(here, file));
  const key = delta.feature_key;
  const problems = [];
  const warnings = [];
  const base = await readJson(path.join(root, delta.base_profile));
  const shard = await readJson(path.join(runDir, delta.kb_shard));
  const shardIds = new Set((shard.payload?.kb_candidates ?? []).map((k) => k.kb_id));
  const allowedExternal = new Set(delta.allowed_external_kb_refs ?? []);

  if (base.feature_key !== key) problems.push(`base feature_key ${base.feature_key} ≠ delta ${key}`);
  if (shard.payload?.kb_context?.feature_key !== key) problems.push(`shard feature_key ${shard.payload?.kb_context?.feature_key} ≠ ${key}`);

  // --- carry-forward base ---
  const profile = clone(base);
  const payloadLevel = {};
  for (const k of PAYLOAD_ARRAYS) {
    payloadLevel[k] = profile[k] ?? [];
    delete profile[k];
  }
  delete profile.last_updated; // publish strip đóng dấu last_updated của run này

  const baseFeatureId = base.feature_id;
  const newFeatureId = keepBaseId ? baseFeatureId : delta.feature_id ?? baseFeatureId;
  const idMap = keepBaseId ? {} : { ...(delta.feature_id_map ?? {}), [baseFeatureId]: newFeatureId };
  const mapId = (id) => idMap[id] ?? id;
  profile.feature_id = newFeatureId;
  for (const k of PAYLOAD_ARRAYS) {
    for (const r of payloadLevel[k]) {
      if (r.feature_id) r.feature_id = mapId(r.feature_id);
      if (r.related_feature_id) r.related_feature_id = mapId(r.related_feature_id);
    }
  }

  // --- delta checks (base đã qua audit C6 khi publish; chỉ kiểm phần mới) ---
  const append = delta.append ?? {};
  const set = delta.set ?? {};
  const deltaBody = { append, set };
  for (const id of collectRefs(deltaBody)) {
    if (!shardIds.has(id) && !allowedExternal.has(id)) problems.push(`kb_ref ${id} không có trong shard ${delta.kb_shard}`);
  }
  for (const h of proseHits(deltaBody, "delta")) problems.push(`prose cấm ${h.pattern} tại ${h.path}`);
  for (const k of [...PROFILE_ARRAYS, ...PAYLOAD_ARRAYS]) for (const p of missingKbRefs(append[k], `append.${k}`)) problems.push(`${p} thiếu kb_refs`);
  for (const s of SURFACES) for (const p of missingKbRefs(append.surface_mapping?.[s], `append.surface_mapping.${s}`)) problems.push(`${p} thiếu kb_refs`);

  // --- append ---
  const change = [];
  const oqMap = [];
  for (const k of PROFILE_ARRAYS) {
    const add = clone(append[k] ?? []);
    profile[k] = profile[k] ?? [];
    const before = profile[k].length;
    for (const item of add) {
      if (k === "unknown_areas" && item._oq_draft) {
        oqMap.push({
          feature_key: key,
          unknown_area_index: profile[k].length,
          oq_draft: item._oq_draft,
          relates_to_existing_oq: item._relates_to_existing_oq ?? []
        });
      }
      delete item._oq_draft;
      delete item._relates_to_existing_oq;
      profile[k].push(item);
    }
    if (add.length) change.push({ field: k, change: "APPEND", base_count: before, appended_indices: add.map((_, i) => before + i), kb_refs: [...collectRefs(add)] });
  }
  profile.surface_mapping = profile.surface_mapping ?? {};
  for (const s of SURFACES) {
    const add = clone(append.surface_mapping?.[s] ?? []);
    const before = (profile.surface_mapping[s] ?? []).length;
    profile.surface_mapping[s] = [...(profile.surface_mapping[s] ?? []), ...add];
    if (add.length) change.push({ field: `surface_mapping.${s}`, change: "APPEND", base_count: before, appended_indices: add.map((_, i) => before + i), kb_refs: [...collectRefs(add)] });
  }
  for (const k of PAYLOAD_ARRAYS) {
    const add = clone(append[k] ?? []).map((r) => ({ feature_id: newFeatureId, ...r }));
    const before = payloadLevel[k].length;
    payloadLevel[k].push(...add);
    if (add.length) change.push({ field: k, change: "APPEND", base_count: before, appended_indices: add.map((_, i) => before + i), kb_refs: [...collectRefs(add)] });
  }
  for (const [k, v] of Object.entries(set)) {
    change.push({ field: k, change: "REPLACE", from: clone(base[k]) ?? null, to: clone(v) });
    profile[k] = clone(v);
  }
  if (newFeatureId !== baseFeatureId) {
    change.push({
      field: "feature_id",
      change: "REPLACE",
      from: baseFeatureId,
      to: newFeatureId,
      note: "FEATURE-ID theo shard của run (contract §4, method bước 2); feature_key không đổi. Áp cho feature_id/related_feature_id của coverage_matrix, profile_conflicts, profile_relationships theo feature_id_map. Prose base nhắc FEAT-07/FEAT-08 giữ nguyên văn."
    });
  }

  // --- trace ---
  const mergedRefs = collectRefs({ profile, payloadLevel });
  const unassigned = [...shardIds].filter((id) => !mergedRefs.has(id)).sort();
  const externalInMerged = [...mergedRefs].filter((id) => !shardIds.has(id)).sort();
  const unexpectedExternal = externalInMerged.filter((id) => !allowedExternal.has(id));
  if (unexpectedExternal.length) warnings.push(`profile base (carry-forward) tham chiếu kb_id ngoài shard: ${unexpectedExternal.join(", ")}`);
  const kbTraceComplete = problems.length === 0;

  const env = clone(delta.envelope);
  const counts = Object.fromEntries(PROFILE_ARRAYS.map((k) => [k, profile[k].length]));
  env.observations = [
    ...(env.observations ?? []),
    `Sinh bởi _delta/apply-delta.mjs: base ${delta.base_profile} chép nguyên (feature_key ${key}), append delta _delta/${file}. Số phần tử sau merge: ${JSON.stringify(counts)}; coverage_matrix ${payloadLevel.coverage_matrix.length}, profile_conflicts ${payloadLevel.profile_conflicts.length}, profile_relationships ${payloadLevel.profile_relationships.length}.`,
    unassigned.length
      ? `Shard có ${unassigned.length} kb_id không được field nào của profile tham chiếu (payload.unassigned_kb_items).`
      : "Mọi kb_id của shard đều được profile tham chiếu.",
    ...warnings
  ];
  env.unknown_area_oq_draft_map = oqMap;
  env.payload = {
    feature_profiles: [profile],
    profile_relationships: payloadLevel.profile_relationships,
    coverage_matrix: payloadLevel.coverage_matrix,
    unassigned_kb_items: unassigned.map((id) => ({ kb_id: id, reason: "Không field nào của profile (base hay delta) tham chiếu; item vẫn nằm trong shard." })),
    profile_conflicts: payloadLevel.profile_conflicts,
    profile_change_summary: [...(delta.change_notes ?? []), ...change],
    external_kb_refs_in_profile: externalInMerged,
    kb_trace_complete: kbTraceComplete
  };

  results.push({ feature_key: key, feature_id: newFeatureId, out: path.join("candidate", "feature-profiles", `${key}.json`), problems, warnings, unassigned_kb_items: unassigned, oq_map: oqMap, counts });
  pendingWrites.push([path.join(profilesDir, `${key}.json`), env]);
}

const ok = results.every((r) => r.problems.length === 0);
if (ok && !dryRun) for (const [p, env] of pendingWrites) await writeFile(p, JSON.stringify(env, null, 2) + "\n");
console.log(JSON.stringify({ ok, dry_run: dryRun, keep_base_feature_id: keepBaseId, written: ok && !dryRun, results }, null, 2));
process.exit(ok ? 0 : 1);
