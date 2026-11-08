#!/usr/bin/env node
// Build candidate/checklists/<feature-key>.json = published base checklist (knowledge/, read-only)
// + the delta for this run (intermediate/checklist-delta/<feature-key>.delta.json).
//
// Why this exists: qa-checklist-builder for CTX-20261031-02 has no shell, and the base
// storefront-buyer-facing checklist (100 checks, ~4000 lines) is too large to copy by hand
// verbatim. This is a deterministic merge:
//   - every base check is deep-copied unchanged (same check_id, no key added/removed/changed),
//   - new checks are appended after the base checks,
//   - base coverage_by_feature_and_risk / excluded_dimensions keep their content; new entries are
//     appended. feature_id follows the materialized feature profile of this run; base coverage
//     feature_id is remapped ONLY if it differs from the profile's (publish-strip.mjs drops
//     coverage entries whose feature_id ≠ checklist feature_id),
//   - base checklist-level last_updated is NOT copied (publish strip stamps this run).
//
//   node runs/context/2026-10-31/CTX-20261031-02/intermediate/checklist-delta/merge-checklists.mjs
//   ... --dry-run     # validate + print summary, do not write
//
// Read-only on knowledge/. Writes only candidate/checklists/<feature-key>.json of this run.
// Only reads the base files named in each *.delta.json (never "* 2.json" iCloud duplicates).
// All-or-nothing: any problem in any delta → nothing is written. Exit 0 = ok, 1 = problems.

import { readFile, writeFile, readdir, access, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { isDeepStrictEqual } from "node:util";

const here = path.dirname(fileURLToPath(import.meta.url));
const runDir = path.resolve(here, "..", "..");
const outDir = path.join(runDir, "candidate", "checklists");

async function findRoot(dir) {
  let d = dir;
  for (;;) {
    try {
      await access(path.join(d, "contracts", "qa-context-contract.md"));
      return d;
    } catch {}
    const p = path.dirname(d);
    if (p === d) throw new Error("repo root not found (contracts/qa-context-contract.md)");
    d = p;
  }
}

const root = await findRoot(here);
const dryRun = process.argv.slice(2).includes("--dry-run");
const readJson = async (p) => JSON.parse(await readFile(p, "utf8"));
const clone = (x) => (x === undefined ? undefined : JSON.parse(JSON.stringify(x)));

const DIMENSIONS = new Set(["CORE", "NEGATIVE", "BOUNDARY", "PERMISSION", "STATE_DATA", "INTEGRATION", "REGRESSION"]);
const LAYERS = new Set(["portal", "storefront", "api", "db", "code"]);
const PRIORITIES = new Set(["P1", "P2", "P3"]);
const AUTOMATION = new Set(["SUITABLE", "HYBRID", "NOT_SUITABLE", "UNKNOWN"]);
const NOT_ORACLE_TAGS = new Set(["harness-non-buyer-path", "not-oracle-grade", "host_not_in_expected_api_base"]);
// Keys stripped at publish (contracts/forbidden-fields.json json_keys) — prose check skips them.
const SKIP_PROSE_KEYS = new Set(["act_ids", "evidence_refs"]);
const forbidden = await readJson(path.join(root, "contracts", "forbidden-fields.json"));
const FORBIDDEN_PROSE = [
  ...Object.values(forbidden.id_in_prose_patterns).map((s) => new RegExp(s)),
  ...forbidden.path_patterns.map((s) => new RegExp(s)),
  new RegExp(forbidden.outside_bundle_pattern)
];

function proseHits(node, at, out = []) {
  if (typeof node === "string") {
    for (const re of FORBIDDEN_PROSE) if (re.test(node)) out.push(`${at} matches ${re}`);
  } else if (Array.isArray(node)) node.forEach((n, i) => proseHits(n, `${at}[${i}]`, out));
  else if (node && typeof node === "object") {
    for (const [k, v] of Object.entries(node)) if (!SKIP_PROSE_KEYS.has(k)) proseHits(v, `${at}.${k}`, out);
  }
  return out;
}

const chkNum = (id) => Number(/^CHK-(\d+)$/.exec(id)?.[1] ?? NaN);

const deltaFiles = (await readdir(here)).filter((f) => f.endsWith(".delta.json") && !/ \d+\.delta\.json$/.test(f)).sort();
const results = [];
const pendingWrites = [];

for (const file of deltaFiles) {
  const delta = await readJson(path.join(here, file));
  const key = delta.feature_key;
  const problems = [];
  const warnings = [];

  const base = await readJson(path.join(root, delta.base_checklist));
  const shard = await readJson(path.join(runDir, delta.kb_shard));
  const profile = await readJson(path.join(runDir, delta.profile));
  const items = new Map((shard.payload?.kb_candidates ?? []).map((k) => [k.kb_id, k]));

  if (base.feature_key !== key) problems.push(`base feature_key ${base.feature_key} ≠ ${key}`);
  if (shard.payload?.kb_context?.feature_key !== key) problems.push(`shard feature_key ≠ ${key}`);

  // FEATURE-ID follows the materialized feature profile of this run (published next to the checklist).
  const prof = profile.payload?.feature_profiles?.[0];
  const featureId = prof?.feature_id;
  if (!featureId) problems.push(`profile ${delta.profile} has no feature_profiles[0].feature_id`);
  if (prof?.feature_key !== key) problems.push(`profile feature_key ${prof?.feature_key} ≠ ${key}`);
  const shardFeatureId = shard.payload?.kb_context?.feature_id;
  if (shardFeatureId && shardFeatureId !== featureId) {
    warnings.push(`shard kb_context.feature_id ${shardFeatureId} ≠ profile feature_id ${featureId}; checklist follows the profile`);
  }

  // kb_ids that must never be an oracle: in an UNRESOLVED conflict (item-level or shard conflicts[]).
  const unresolved = new Set();
  for (const [id, it] of items) if (it.status === "UNRESOLVED" || it.conflict_group) unresolved.add(id);
  for (const c of shard.payload?.conflicts ?? []) {
    if (c.status !== "UNRESOLVED") continue;
    for (const s of c.sides ?? []) if (s.kb_id) unresolved.add(s.kb_id);
    for (const id of c.additional_evidence_kb_ids ?? []) unresolved.add(id);
  }

  // --- carry forward base (unchanged) ---
  const baseChecks = clone(base.checks ?? []);
  const baseIds = baseChecks.map((c) => c.check_id);
  if (!baseIds.length) problems.push("base has no checks");
  if (new Set(baseIds).size !== baseIds.length) problems.push("base has duplicate check_id");
  const maxBase = Math.max(...baseIds.map(chkNum));

  // --- validate new checks ---
  const newChecks = clone(delta.new_checks ?? []);
  newChecks.forEach((c, i) => {
    const at = `${key}.new_checks[${i}](${c.check_id})`;
    if (baseIds.includes(c.check_id)) problems.push(`${at}: check_id collides with base`);
    if (chkNum(c.check_id) !== maxBase + 1 + i) problems.push(`${at}: expected CHK-${String(maxBase + 1 + i).padStart(3, "0")}`);
    if (!DIMENSIONS.has(c.dimension)) problems.push(`${at}: dimension`);
    if (!LAYERS.has(c.layer)) problems.push(`${at}: layer`);
    if (!PRIORITIES.has(c.priority)) problems.push(`${at}: priority`);
    if (!AUTOMATION.has(c.automation_suitability)) problems.push(`${at}: automation_suitability`);
    for (const k of ["role", "state", "environment", "surface_or_device"]) if (!c.applicability?.[k]) problems.push(`${at}: applicability.${k} missing`);
    if (!c.title || !c.observation_point || !(c.steps ?? []).length) problems.push(`${at}: title/steps/observation_point missing`);
    if (c.status !== "NEEDS_CONFIRMATION") problems.push(`${at}: new checks must be NEEDS_CONFIRMATION (operator: at most BASELINE + NEEDS_CONFIRMATION)`);
    if (!c.open_question_draft) problems.push(`${at}: open_question_draft missing`);
    if ("oq_id" in c || "oq_ref" in c) problems.push(`${at}: checklist-builder must not set oq_id/oq_ref`);

    const strength = c.oracle?.oracle_strength;
    const oracleIds = c.oracle?.kb_ids ?? [];
    if (!["BASELINE", "NONE"].includes(strength)) problems.push(`${at}: oracle_strength ${strength} not allowed (no new CONFIRMED_EXPECTED)`);
    if (strength === "NONE") {
      if (oracleIds.length) problems.push(`${at}: NONE must have empty oracle.kb_ids`);
      if (c.expected_result) problems.push(`${at}: NONE must not have expected_result`);
    }
    if (strength === "BASELINE") {
      if (!oracleIds.length) problems.push(`${at}: BASELINE needs ≥1 oracle kb_id`);
      if (!c.expected_result) problems.push(`${at}: BASELINE without expected_result`);
    }
    for (const id of oracleIds) {
      const it = items.get(id);
      if (!it) { problems.push(`${at}: oracle ${id} not in shard`); continue; }
      if (it.status === "KNOWN_DEFECT") problems.push(`${at}: oracle ${id} is KNOWN_DEFECT`);
      if (unresolved.has(id)) problems.push(`${at}: oracle ${id} is in an UNRESOLVED conflict`);
      if ((it.tags ?? []).some((t) => NOT_ORACLE_TAGS.has(t))) problems.push(`${at}: oracle ${id} tagged not-oracle (harness / host outside expected_api_base)`);
      if (it.knowledge_kind !== "OBSERVED_CURRENT") problems.push(`${at}: oracle ${id} is ${it.knowledge_kind} (BASELINE needs OBSERVED_CURRENT)`);
    }
    for (const id of c.regression_watch_kb_ids ?? []) {
      if (items.get(id)?.status !== "KNOWN_DEFECT") problems.push(`${at}: regression_watch ${id} is not KNOWN_DEFECT`);
    }
    const allIds = [...oracleIds, ...(c.related_kb_ids ?? []), ...(c.regression_watch_kb_ids ?? [])];
    if (!allIds.length) problems.push(`${at}: no kb trace`);
    for (const id of allIds) if (!items.has(id)) problems.push(`${at}: kb ${id} not in shard ${delta.kb_shard}`);
    for (const h of proseHits(c, at)) problems.push(`forbidden prose: ${h}`);
  });

  const checks = [...baseChecks, ...newChecks];
  baseChecks.forEach((c, i) => {
    if (!isDeepStrictEqual(c, base.checks[i])) problems.push(`base ${c.check_id} not carried unchanged`);
  });

  // --- coverage / excluded ---
  const idMap = base.feature_id && featureId && base.feature_id !== featureId ? { [base.feature_id]: featureId } : {};
  const remapped = [];
  const coverage = clone(base.coverage_by_feature_and_risk ?? []).map((e, i) => {
    if (e.feature_id && idMap[e.feature_id]) {
      remapped.push(i);
      return { ...e, feature_id: idMap[e.feature_id] };
    }
    if (e.feature_id && e.feature_id !== featureId) problems.push(`base coverage[${i}] feature_id ${e.feature_id} ≠ ${featureId}`);
    return e;
  });
  const allCheckIds = new Set(checks.map((c) => c.check_id));
  for (const [i, e] of (delta.coverage_append ?? []).entries()) {
    for (const id of e.checks ?? []) if (!allCheckIds.has(id)) problems.push(`coverage_append[${i}]: ${id} not in checklist`);
    for (const h of proseHits(e, `coverage_append[${i}]`)) problems.push(`forbidden prose: ${h}`);
    coverage.push({ feature_id: featureId, ...clone(e) });
  }
  for (const [i, e] of (delta.excluded_dimensions_append ?? []).entries()) {
    for (const h of proseHits(e, `excluded_dimensions_append[${i}]`)) problems.push(`forbidden prose: ${h}`);
  }
  const excluded = [...clone(base.excluded_dimensions ?? []), ...clone(delta.excluded_dimensions_append ?? [])];

  const covered = new Set(coverage.flatMap((e) => e.checks ?? []));
  const newUncovered = newChecks.map((c) => c.check_id).filter((id) => !covered.has(id));
  if (newUncovered.length) problems.push(`new checks without coverage entry: ${newUncovered.join(", ")}`);

  const needing = newChecks
    .filter((c) => c.status === "NEEDS_CONFIRMATION")
    .map((c) => ({
      check_id: c.check_id,
      open_question_draft: c.open_question_draft,
      reason: c.oracle.oracle_strength === "NONE"
        ? `oracle NONE: ${(c.related_kb_ids ?? []).filter((id) => unresolved.has(id)).join(", ") || "không có kb dùng được"} nằm trong conflict UNRESOLVED nên không làm oracle; expected_result để trống`
        : `oracle BASELINE (${c.oracle.kb_ids.join(", ")} OBSERVED_CURRENT, chưa có nguồn thẩm quyền) — lệch = cần điều tra, không phải bug`
    }));

  const env = clone(delta.envelope);
  env.observations = [
    ...(env.observations ?? []),
    `Sinh bởi intermediate/checklist-delta/merge-checklists.mjs: base ${delta.base_checklist} (${baseChecks.length} check, checklist_version '${base.checklist_version}') chép nguyên + ${newChecks.length} check mới từ ${file}; feature_id ${featureId} theo profile của run; coverage remap: ${Object.keys(idMap).length ? JSON.stringify(idMap) : "không cần (cùng FEATURE-ID với base)"}.`,
    ...warnings
  ];
  env.payload = {
    carry_forward: {
      base_path: delta.base_checklist,
      base_checklist_version: base.checklist_version,
      carried_unchanged: baseIds,
      modified: [],
      added: newChecks.map((c) => c.check_id),
      removed: [],
      coverage_feature_id_remap: { map: idMap, base_entry_indices: remapped },
      base_last_updated_not_copied: base.last_updated ?? null
    },
    checklists: [
      {
        feature_id: featureId,
        feature_key: key,
        checklist_version: delta.checklist_version,
        checks
      }
    ],
    coverage_by_feature_and_risk: coverage,
    checks_needing_confirmation: needing,
    duplicates_removed: clone(delta.duplicates_removed ?? []),
    excluded_dimensions: excluded
  };

  const counts = { base: baseChecks.length, added: newChecks.length, total: checks.length, coverage: coverage.length, excluded: excluded.length };
  results.push({ feature_key: key, feature_id: featureId, out: path.join("candidate", "checklists", `${key}.json`), counts, problems, warnings });
  pendingWrites.push([path.join(outDir, `${key}.json`), env]);
}

const ok = deltaFiles.length > 0 && results.every((r) => r.problems.length === 0);
if (ok && !dryRun) {
  await mkdir(outDir, { recursive: true });
  for (const [p, env] of pendingWrites) await writeFile(p, JSON.stringify(env, null, 2) + "\n");
}
console.log(JSON.stringify({ ok, dry_run: dryRun, written: ok && !dryRun, results }, null, 2));
process.exit(ok ? 0 : 1);
