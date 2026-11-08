#!/usr/bin/env node
// Sinh candidate/feature-profiles/storefront-buyer-facing.json = base v16 + delta CBS-098, giữ nguyên base.
//
//   node runs/context/2026-11-07/CTX-20261107-11/candidate/feature-profiles/_delta/apply-delta.mjs
//
// Chỉ đọc knowledge/, chỉ ghi một file trong thư mục run. Chạy lại cho cùng kết quả.
// Exit 0 = đã ghi, 1 = kiểm tra thất bại, không ghi gì.
// Dựa trên runs/context/2026-11-06/CTX-20261106-08/candidate/feature-profiles/_delta/apply-delta.mjs,
// thêm kiểm số unknown_areas của base và in index các mục mới.

import { readFile, writeFile } from "node:fs/promises";
import { isDeepStrictEqual } from "node:util";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const runDir = path.resolve(here, "../../..");
const repo = path.resolve(runDir, "../../../..");
const key = "storefront-buyer-facing";
const basePath = path.join(repo, "knowledge/products/teeinblue/sdk/features", key, "profile.json");
const shardPath = path.join(runDir, "candidate/product-kb", `${key}.json`);
const outPath = path.join(runDir, "candidate/feature-profiles", `${key}.json`);
const readJson = async (f) => JSON.parse(await readFile(f, "utf8"));

const base = await readJson(basePath);
const shard = await readJson(shardPath);
const delta = await readJson(path.join(here, `${key}.delta.json`));

const problems = [];

if ((base.unknown_areas ?? []).length !== delta.base_unknown_areas_count) {
  problems.push(`base.unknown_areas có ${(base.unknown_areas ?? []).length} mục, delta giả định ${delta.base_unknown_areas_count} — sửa index trong delta`);
}

// publish-strip đọc ba field này từ payload, base đặt chúng ở root profile.
const PAYLOAD_FIELDS = ["coverage_matrix", "profile_conflicts", "profile_relationships"];
const profile = structuredClone(base);
const payload = {};
for (const f of PAYLOAD_FIELDS) {
  payload[f] = [...(profile[f] ?? []), ...(delta.payload_append[f] ?? [])];
  delete profile[f];
}
for (const [f, items] of Object.entries(delta.profile_append)) profile[f] = [...(profile[f] ?? []), ...items];
for (const [s, items] of Object.entries(delta.surface_mapping_append)) {
  profile.surface_mapping[s] = [...(profile.surface_mapping[s] ?? []), ...items];
}
Object.assign(profile, delta.profile_set);

// Mọi phần tử của base phải còn nguyên, đúng vị trí, và field vô hướng không đổi.
const REPLACED = new Set(Object.keys(delta.profile_set));
for (const [f, value] of Object.entries(base)) {
  const merged = PAYLOAD_FIELDS.includes(f) ? payload[f] : profile[f];
  if (REPLACED.has(f)) continue;
  if (f === "surface_mapping") {
    for (const [s, items] of Object.entries(value)) {
      if (!isDeepStrictEqual(merged[s].slice(0, items.length), items)) problems.push(`base bị đổi: surface_mapping.${s}`);
    }
  } else if (Array.isArray(value)) {
    if (!isDeepStrictEqual(merged.slice(0, value.length), value)) problems.push(`base bị đổi: ${f}`);
  } else if (!isDeepStrictEqual(merged, value)) {
    problems.push(`base bị đổi: ${f}`);
  }
}

// Mọi kb_refs của delta phải có trong shard.
const shardIds = new Set(shard.payload.kb_candidates.map((i) => i.kb_id));
const refsOf = (node, out = []) => {
  if (Array.isArray(node)) node.forEach((n) => refsOf(n, out));
  else if (node && typeof node === "object") {
    for (const [k, v] of Object.entries(node)) k === "kb_refs" ? out.push(...v) : refsOf(v, out);
  }
  return out;
};
const deltaRefs = refsOf([delta.profile_append, delta.surface_mapping_append, delta.profile_set, delta.payload_append]);
for (const id of new Set(deltaRefs)) if (!shardIds.has(id)) problems.push(`kb_refs không có trong shard: ${id}`);

// Mỗi dòng khác biệt môi trường trace về đúng một KB item, type khớp tag của item đó.
for (const row of profile.environment_differences ?? []) {
  const item = shard.payload.kb_candidates.find((i) => i.kb_id === row.kb_refs[0]);
  if (row.kb_refs.length !== 1) problems.push(`environment_differences phải trace về đúng 1 kb_id: ${row.kb_refs}`);
  if (!item?.tags?.includes(row.type)) problems.push(`type ${row.type} không khớp tag của ${row.kb_refs[0]}`);
  if (!row.how_to_test) problems.push(`thiếu how_to_test: ${row.kb_refs[0]}`);
}

// Mọi item mới của shard phải được profile dùng.
const newIds = shard.payload.kb_candidates.filter((i) => i.relation === "ADD").map((i) => i.kb_id);
for (const id of newIds) if (!deltaRefs.includes(id)) problems.push(`item mới chưa gán vào profile: ${id}`);

// Capability mới phải có act_ids rỗng (CCR_INGEST).
for (const c of delta.profile_append.capabilities ?? []) {
  if ((c.act_ids ?? []).length) problems.push(`capability mới có act_ids: ${c.name}`);
}

if (problems.length) {
  console.error(JSON.stringify({ ok: false, problems }, null, 2));
  process.exit(1);
}

const start = base.unknown_areas.length;
const newIdx = (delta.profile_append.unknown_areas ?? []).map((_, i) => start + i);

const artifact = {
  ...delta.envelope,
  payload: { feature_profiles: [profile], ...payload, ...delta.payload_set },
  gate: delta.envelope.gate
};
await writeFile(outPath, `${JSON.stringify(artifact, null, 2)}\n`);
console.log(JSON.stringify({
  ok: true,
  out: outPath,
  unknown_areas: profile.unknown_areas.length,
  new_unknown_area_indexes: newIdx,
  environment_differences: (profile.environment_differences ?? []).length,
  capabilities: profile.capabilities.length
}, null, 2));
