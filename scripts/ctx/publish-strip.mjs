#!/usr/bin/env node
// Publish strip (contract §5, §5a): candidate gốc → candidate/publish-preview/,
// đúng layout knowledge/products/<product>/ và đúng schema published. Áp luôn
// `resolution: SUPERSEDE` của review/knowledge-diff.json (§12.5). Candidate gốc
// không bị sửa.
//
//   node scripts/ctx/publish-strip.mjs --run CTX-... [--date YYYY-MM-DD] [--ccr-ref CBS-n] [--clean]
//
// Sinh: <object>/kb.json, <object>/features/<f>/{kb.json,profile.json},
//       <object>/checklists/<f>.json, <object>/publish-meta.json, _product-kb.json.
// File prose (feature-summary.md, open-questions.md, CHANGELOG.md, _registry.json)
// được copy từ knowledge/ nếu preview chưa có — orchestrator sửa chúng sau bước này.
// `oq_id` của check / unknown_area lấy từ candidate/oq-assignments.json (orchestrator
// ghi khi mint OQ): { "<feature_key>": { "checks": {"CHK-001": "OQ-.."},
// "unknown_areas": {"0": "OQ-.."} } } — key của unknown_areas là index.
// Tóm tắt ghi ở candidate/strip-summary.json. Exit 1 khi có candidate không xác
// định được object, hoặc supersede không áp được.

import { readdir, rm, copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { parseArgs, readJson, readJsonOr, writeJson, exists, today } from "../lib/fs-utils.mjs";
import { resolveRunDir, runPaths, knowledgeProductsDir } from "../lib/run-layout.mjs";
import {
  stripForbidden,
  PUBLISHED_KB_ITEM_KEYS,
  PUBLISHED_SCOPE_KEYS,
  PUBLISHED_CONFIRMATION_SOURCE_KEYS
} from "../lib/forbidden-fields.mjs";

const PROSE_FILES = ["feature-summary.md", "open-questions.md", "CHANGELOG.md"];

/** `confirmation_source` dạng runs/ → dạng published đúng 4 key (§3). */
export function publishConfirmationSource(cs) {
  if (!cs) return undefined;
  const ref = typeof cs.ref === "string" ? cs.ref : cs.ref?.citation ?? cs.ref?.locator ?? null;
  const authoredOn = cs.authored_on ?? (typeof cs.ref === "object" ? cs.ref?.authored_on : undefined) ?? null;
  const out = { type: cs.type, ref, authored_on: authoredOn };
  if (cs.derivation) out.derivation = cs.derivation;
  return Object.fromEntries(Object.entries(out).filter(([k]) => PUBLISHED_CONFIRMATION_SOURCE_KEYS.includes(k)));
}

/** Một KB candidate → KB item published (allowlist §5a). */
export function publishKbItem(item, lastUpdated) {
  const out = {};
  for (const key of PUBLISHED_KB_ITEM_KEYS) {
    const v = item[key];
    if (v === undefined || v === null) continue;
    if (key === "scope") out.scope = Object.fromEntries(PUBLISHED_SCOPE_KEYS.filter((k) => k in v).map((k) => [k, v[k]]));
    else if (key === "confirmation_source") out.confirmation_source = publishConfirmationSource(v);
    else out[key] = v;
  }
  // Item carry-forward từ base đã có last_updated của nó; item mới nhận ngày của lần publish này.
  out.last_updated = item.last_updated ?? lastUpdated;
  return out;
}

function kbItemsOf(artifact) {
  const p = artifact.payload ?? artifact;
  return Array.isArray(p) ? p : p.kb_candidates ?? [];
}

function objectOf(artifact, file, fallback) {
  const ctx = artifact.payload?.kb_context ?? {};
  const fromName = /^_object-level\.(.+)\.json$/.exec(file)?.[1];
  return ctx.object_key ?? ctx.object_id ?? fromName ?? fallback ?? null;
}

/** Áp các entry SUPERSEDE của diff vào map file→items. Trả { applied, problems, changelog }. */
export function applySupersedes(diff, kbFiles, { date, ccrRef, mode, approvals = new Map() }) {
  const applied = [];
  const problems = [];
  const changelog = {}; // object → [line]
  for (const c of diff?.change_details ?? []) {
    if (c.resolution !== "SUPERSEDE") continue;
    const target = Object.entries(kbFiles).find(([, v]) => v.featureKey === (c.feature_key ?? null) && v.items.some((i) => i.kb_id === c.kb_id));
    if (!target) {
      problems.push(`SUPERSEDE ${c.change_id ?? c.kb_id}: không thấy base ${c.kb_id} trong shard ${c.feature_key ?? "object-level"}`);
      continue;
    }
    const entry = target[1];
    const baseIdx = entry.items.findIndex((i) => i.kb_id === c.kb_id);
    const candId = c.candidate_kb_id ?? c.kb_id;
    const candIdx = entry.items.findIndex((i, idx) => i.kb_id === candId && idx !== baseIdx);
    const base = entry.items[baseIdx];
    const cand = candIdx >= 0 ? entry.items[candIdx] : null;
    if (!cand) {
      problems.push(`SUPERSEDE ${c.change_id ?? c.kb_id}: không thấy candidate ${candId}`);
      continue;
    }
    entry.items[baseIdx] = { ...cand, kb_id: base.kb_id, related_kb_ids: cand.related_kb_ids ?? base.related_kb_ids };
    entry.items.splice(candIdx, 1);
    const src = cand.confirmation_source ?? {};
    const approval = approvals.get(base.kb_id);
    const approvedBy = approval ? ` Duyệt: ${approval.approver_role} (${approval.ref}, ${approval.decided_at}).` : "";
    (changelog[entry.object] ??= []).push(
      `- ${date} (\`${ccrRef}\`, ${mode}) — ${base.kb_id} superseded bởi ${src.type ?? "?"} (authored ${src.authored_on ?? "?"}). Cũ: "${base.statement}". Mới: "${cand.statement}".${approvedBy}`
    );
    applied.push({ kb_id: base.kb_id, candidate_kb_id: candId, object: entry.object, feature_key: entry.featureKey });
  }
  return { applied, problems, changelog };
}

async function main() {
  const args = parseArgs();
  if (typeof args.run !== "string") {
    console.error("Cần --run CTX-...");
    process.exit(1);
  }
  const paths = runPaths(resolveRunDir(args.run));
  const manifest = await readJson(paths.manifest);
  const product = manifest.product;
  const mode = manifest.mode;
  const date = typeof args.date === "string" ? args.date : today();
  const ccrRef = typeof args["ccr-ref"] === "string" ? args["ccr-ref"] : manifest.source?.proposal_id ?? "bootstrap";
  const lastUpdated = { date, ccr_ref: ccrRef };
  const baseDir = path.join(knowledgeProductsDir, product);
  const out = paths.previewDir;
  if (args.clean === true) await rm(out, { recursive: true, force: true });
  await mkdir(out, { recursive: true });

  const problems = [];
  const written = [];
  const featureObject = {};
  const kbFiles = {}; // rel path → { object, featureKey, items }
  let productItems = null;
  const oqAssign = (await readJsonOr(path.join(path.dirname(paths.previewDir), "oq-assignments.json"), {})) ?? {};

  // 1. KB shards
  for (const file of (await readdir(paths.productKbDir).catch(() => [])).filter((f) => f.endsWith(".json")).sort()) {
    const artifact = await readJson(path.join(paths.productKbDir, file));
    const items = kbItemsOf(artifact).map((i) => publishKbItem(i, lastUpdated));
    if (file === "_product-level.json") {
      productItems = items;
      continue;
    }
    const object = objectOf(artifact, file, manifest.object_target?.object_key);
    if (!object) {
      problems.push(`${file}: không xác định được object (kb_context.object_id / object_target.object_key)`);
      continue;
    }
    if (file.startsWith("_object-level")) kbFiles[path.join(object, "kb.json")] = { object, featureKey: null, items };
    else {
      const featureKey = artifact.payload?.kb_context?.feature_key ?? file.replace(/\.json$/, "");
      featureObject[featureKey] = object;
      kbFiles[path.join(object, "features", featureKey, "kb.json")] = { object, featureKey, items };
    }
  }

  // 2. Supersede (§12.5) — áp trên items đã chuyển sang dạng published.
  const diff = await readJsonOr(paths.diff, null);
  const approvalsFile = await readJsonOr(path.join(paths.runDir, "input", "approvals.json"), null);
  const approvals = new Map((approvalsFile?.approvals ?? []).map((a) => [a.kb_id, a]));
  const sup = applySupersedes(diff?.payload ?? diff, kbFiles, { date, ccrRef, mode, approvals });
  problems.push(...sup.problems);

  for (const [rel, { items }] of Object.entries(kbFiles)) {
    await writeJson(path.join(out, rel), items);
    written.push(rel);
  }
  if (productItems) {
    await writeJson(path.join(out, "_product-kb.json"), productItems);
    written.push("_product-kb.json");
  }

  // 3. Feature profiles
  for (const file of (await readdir(paths.profilesDir).catch(() => [])).filter((f) => f.endsWith(".json")).sort()) {
    const payload = (await readJson(path.join(paths.profilesDir, file))).payload ?? {};
    for (const profile of payload.feature_profiles ?? []) {
      const object = featureObject[profile.feature_key];
      if (!object) {
        problems.push(`profile ${profile.feature_key}: không có KB shard tương ứng nên không biết object`);
        continue;
      }
      const byFeature = (list) => (list ?? []).filter((x) => !x.feature_id || x.feature_id === profile.feature_id);
      const rel = path.join(object, "features", profile.feature_key, "profile.json");
      const uaOq = oqAssign[profile.feature_key]?.unknown_areas ?? {};
      await writeJson(path.join(out, rel), stripForbidden({
        ...profile,
        unknown_areas: (profile.unknown_areas ?? []).map((u, i) => (uaOq[i] ? { ...u, oq_id: uaOq[i] } : u)),
        last_updated: profile.last_updated ?? lastUpdated,
        coverage_matrix: byFeature(payload.coverage_matrix),
        profile_conflicts: byFeature(payload.profile_conflicts),
        profile_relationships: payload.profile_relationships ?? []
      }));
      written.push(rel);
    }
  }

  // 4. Checklists
  for (const file of (await readdir(paths.checklistsDir).catch(() => [])).filter((f) => f.endsWith(".json")).sort()) {
    const payload = (await readJson(path.join(paths.checklistsDir, file))).payload ?? {};
    for (const cl of payload.checklists ?? []) {
      const object = featureObject[cl.feature_key];
      if (!object) {
        problems.push(`checklist ${cl.feature_key}: không có KB shard tương ứng nên không biết object`);
        continue;
      }
      const byFeature = (list) => (list ?? []).filter((x) => !x.feature_id || x.feature_id === cl.feature_id);
      const rel = path.join(object, "checklists", `${cl.feature_key}.json`);
      const chkOq = oqAssign[cl.feature_key]?.checks ?? {};
      await writeJson(path.join(out, rel), stripForbidden({
        feature_id: cl.feature_id,
        feature_key: cl.feature_key,
        object_id: object,
        checklist_version: cl.checklist_version,
        checks: (cl.checks ?? []).map((c) => (chkOq[c.check_id] ? { ...c, oq_id: chkOq[c.check_id] } : c)),
        coverage_by_feature_and_risk: byFeature(payload.coverage_by_feature_and_risk),
        excluded_dimensions: payload.excluded_dimensions ?? [],
        last_updated: cl.last_updated ?? lastUpdated
      }));
      written.push(rel);
    }
  }

  // 5. publish-meta + prose files cho mọi object bị chạm
  const objects = [...new Set(Object.values(kbFiles).map((v) => v.object))].sort();
  const versions = {};
  for (const object of objects) {
    const baseMeta = await readJsonOr(path.join(baseDir, object, "publish-meta.json"), null);
    const version = String((Number(baseMeta?.published_context_version) || 0) + 1);
    versions[object] = version;
    await writeJson(path.join(out, object, "publish-meta.json"), { published_context_version: version, published_at: date, mode });
    written.push(path.join(object, "publish-meta.json"));
    // Mọi object published đều có kb.json (§5); không có shard object-level và base cũng chưa có → mảng rỗng.
    const objectKb = path.join(out, object, "kb.json");
    if (!(await exists(objectKb)) && !(await exists(path.join(baseDir, object, "kb.json")))) await writeJson(objectKb, []);
    for (const name of PROSE_FILES) {
      const target = path.join(out, object, name);
      const source = path.join(baseDir, object, name);
      if (!(await exists(target)) && (await exists(source))) await copyFile(source, target);
    }
    if (sup.changelog[object]?.length) {
      const file = path.join(out, object, "CHANGELOG.md");
      const prev = (await exists(file)) ? await readFile(file, "utf8") : `# CHANGELOG — ${object}\n\n`;
      await writeFile(file, prev.trimEnd() + "\n" + sup.changelog[object].join("\n") + "\n");
    }
  }
  const registry = path.join(out, "_registry.json");
  if (!(await exists(registry)) && (await exists(path.join(baseDir, "_registry.json")))) await copyFile(path.join(baseDir, "_registry.json"), registry);

  const summary = { product, mode, date, ccr_ref: ccrRef, objects, versions, files_written: written.length, supersedes_applied: sup.applied, problems };
  await writeJson(path.join(path.dirname(out), "strip-summary.json"), summary);
  console.log(JSON.stringify({ ...summary, files_written: written.length }, null, 2));
  if (problems.length) process.exit(1);
}

if (import.meta.url === `file://${process.argv[1]}`) main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
