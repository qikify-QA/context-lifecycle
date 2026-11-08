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
// File prose (feature-summary.md, open-questions.md, CHANGELOG.md, _registry.json, _product-guide.md, _env.example)
// được copy từ knowledge/ nếu preview chưa có — orchestrator sửa chúng sau bước này.
// `oq_id` của check / unknown_area lấy từ candidate/oq-assignments.json (orchestrator
// ghi khi mint OQ): { "<feature_key>": { "checks": {"CHK-001": "OQ-.."},
// "unknown_areas": {"0": "OQ-.."} } } — key của unknown_areas là index.
// Tóm tắt ghi ở candidate/strip-summary.json. Exit 1 khi có candidate không xác
// định được object, hoặc supersede không áp được.

import { canonicalKbRef, kbIndex, resolveKbRef, referenceFields } from "../lib/kb-references.mjs";
import { isDeepStrictEqual } from "node:util";
import { SHARED_ROOT_FILES, copySharedToPreview } from "../lib/shared-files.mjs";
import { readdir, rm, copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { parseArgs, readJson, readJsonOr, writeJson, exists, today } from "../lib/fs-utils.mjs";
import { resolveRunDir, runPaths, knowledgeProductsDir } from "../lib/run-layout.mjs";
import {
  stripForbidden,
  PUBLISHED_KB_ITEM_KEYS,
  PUBLISHED_SCOPE_KEYS,
  PUBLISHED_CONFIRMATION_SOURCE_KEYS,
  PUBLISHED_QA_RULE_REF_KEYS
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
    else if (key === "qa_rule_ref") out.qa_rule_ref = Object.fromEntries(PUBLISHED_QA_RULE_REF_KEYS.filter((k) => k in v).map((k) => [k, v[k]]));
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
  const applied=[],problems=[],changelog={},deferred=[],remaps=new Map();
  const originalIndex=kbIndex(Object.values(kbFiles).map(v=>({object:v.object,feature:v.featureKey,items:v.items})));
  for(const c of diff?.change_details??[]){
    const resolution=c.resolution;
    if(!['SUPERSEDE','REFRESHED_ONLY','CONFLICTED','PROPOSED'].includes(resolution))continue;
    const object=c.object_key??c.object_id;
    const matches=Object.entries(kbFiles).filter(([,v])=>(!object||v.object===object)&&v.featureKey===(c.feature_key??null)&&v.items.some(i=>i.kb_id===(c.candidate_kb_id??c.kb_id)||i.kb_id===c.kb_id));
    if(matches.length!==1){problems.push(`${resolution} ${c.kb_id}: missing or ambiguous object/shard`);continue;}
    const entry=matches[0][1],candidateId=c.candidate_kb_id??c.kb_id;
    const candIdx=entry.items.findIndex(i=>i.kb_id===candidateId),baseIdx=entry.items.findIndex(i=>i.kb_id===c.kb_id);
    const cand=entry.items[candIdx],base=entry.items[baseIdx];
    if(!cand){problems.push(`${resolution}: missing candidate ${candidateId}`);continue;}
    const approval=approvals.get(canonicalKbRef(entry.object,entry.featureKey,c.kb_id))??approvals.get(c.kb_id);
    if(c.requires_human_decision&&approval?.decision==='KEEP_BOTH'&&resolution!=='CONFLICTED'){
      problems.push(`${resolution} ${c.kb_id}: KEEP_BOTH requires CONFLICTED; rerun diff`);continue;
    }
    if(c.requires_human_decision && approval?.decision!=='ACCEPT_CANDIDATE' && approval?.decision!=='KEEP_BOTH'){
      if(candIdx!==baseIdx)entry.items.splice(candIdx,1);
      deferred.push({object:entry.object,feature_key:entry.featureKey,kb_id:c.kb_id,candidate_kb_id:candidateId});continue;
    }
    if(resolution==='PROPOSED'){
      cand.knowledge_kind='PROPOSED';delete cand.confirmation_source;
      continue;
    }
    if(resolution==='CONFLICTED'){
      const group=c.conflict_group??`CONF-${ccrRef}-${c.change_id??c.kb_id}`;
      for(const item of new Set([base,cand]))if(item){item.status='UNRESOLVED';item.conflict_group=group;}
      continue;
    }
    if(resolution==='REFRESHED_ONLY'&&base&&candIdx===baseIdx){cand.last_updated={date,ccr_ref:ccrRef};applied.push({kb_id:base.kb_id,candidate_kb_id:candidateId,object:entry.object,feature_key:entry.featureKey,resolution});continue;}
    if(!base||candIdx===baseIdx){problems.push(`${resolution}: missing separate base/candidate ${c.kb_id}`);continue;}
    entry.items[baseIdx]={...cand,kb_id:base.kb_id,related_kb_ids:cand.related_kb_ids??base.related_kb_ids,last_updated:{date,ccr_ref:ccrRef}};
    entry.items.splice(candIdx,1);
    remaps.set(canonicalKbRef(entry.object,entry.featureKey,candidateId),canonicalKbRef(entry.object,entry.featureKey,base.kb_id));
    if(resolution==='SUPERSEDE'){
      const src=cand.confirmation_source??{};
      const approvedBy=approval?` Duyệt: ${approval.approver_role} (${approval.ref}, ${approval.decided_at}).`:'';
      (changelog[entry.object]??=[]).push(`- ${date} (\`${ccrRef}\`, ${mode}) — ${base.kb_id} superseded bởi ${src.type??'?'} (authored ${src.authored_on??'?'}). Cũ: "${base.statement}". Mới: "${cand.statement}".${approvedBy}`);
    }
    applied.push({kb_id:base.kb_id,candidate_kb_id:candidateId,object:entry.object,feature_key:entry.featureKey,resolution});
  }
  return {applied,problems,changelog,deferred,remaps,originalIndex};
}
export function remapKbReferences(value,object,feature,resolution){
  const output=structuredClone(value);
  referenceFields(output,(array,i,ref)=>{
    let target;try{target=resolveKbRef(ref,{object,feature,index:resolution.originalIndex}).key;}catch{return;}
    const mapped=resolution.remaps.get(target);if(!mapped)return;
    array[i]=typeof ref==='string'&&!/[#:/]/.test(ref)?mapped.split('#')[1]:mapped;
  });
  return output;
}
export function updatedArtifact(value,base,lastUpdated){
  if(!base)return {...value,last_updated:lastUpdated};
  const withoutDate=o=>{const {last_updated,...rest}=o;return rest;};
  return {...value,last_updated:isDeepStrictEqual(withoutDate(value),withoutDate(base))?base.last_updated:lastUpdated};
}

export async function copyProductFiles(baseDir, out) {
  for (const name of SHARED_ROOT_FILES) {
    if (!(await exists(path.join(out, name))) && (await exists(path.join(baseDir, name)))) await copySharedToPreview(baseDir, out, name);
  }
}

/**
 * Profile published. Các phần coverage_matrix/profile_conflicts/profile_relationships ưu tiên giá trị nằm
 * trong chính profile (profile dựng từ delta giữ chúng ở đó); chỉ khi profile không có field thì mới lấy ở
 * cấp payload (artifact dựng đầy đủ kiểu cũ). Lấy sai nguồn làm rỗng các phần này khi publish-apply ghi đè file.
 */
export function publishProfile(profile, payload, { oqAssign = {}, lastUpdated } = {}) {
  const byFeature = (list) => (list ?? []).filter((x) => !x.feature_id || x.feature_id === profile.feature_id);
  const own = (key, fallback) => (Array.isArray(profile[key]) ? profile[key] : fallback);
  const uaOq = oqAssign[profile.feature_key]?.unknown_areas ?? {};
  return stripForbidden({
    ...profile,
    unknown_areas: (profile.unknown_areas ?? []).map((u, i) => {
      if (!uaOq[i]) return u;
      const fix = (t) => (typeof t === "string" ? t.replace(/OQ-DRAFT-[\w-]+/g, uaOq[i]) : t);
      return { ...u, question: fix(u.question), why_it_matters: fix(u.why_it_matters), oq_id: uaOq[i] };
    }),
    last_updated: profile.last_updated ?? lastUpdated,
    coverage_matrix: own("coverage_matrix", byFeature(payload.coverage_matrix)),
    profile_conflicts: own("profile_conflicts", byFeature(payload.profile_conflicts)),
    profile_relationships: own("profile_relationships", payload.profile_relationships ?? [])
  });
}

/** Checklist published; cùng nguyên tắc ưu tiên field nằm trong chính checklist. */
export function publishChecklist(cl, payload, { objectKey, oqAssign = {}, lastUpdated } = {}) {
  const byFeature = (list) => (list ?? []).filter((x) => !x.feature_id || x.feature_id === cl.feature_id);
  const own = (key, fallback) => (Array.isArray(cl[key]) ? cl[key] : fallback);
  const chkOq = oqAssign[cl.feature_key]?.checks ?? {};
  return stripForbidden({
    feature_id: cl.feature_id,
    feature_key: cl.feature_key,
    object_id: objectKey,
    checklist_version: cl.checklist_version,
    // Đã có oq_id thì bỏ open_question_draft: draft_id (OQ-DRAFT-…) là ID cục bộ của run, không được lọt vào knowledge.
    checks: (cl.checks ?? []).map((c) => {
      if (!chkOq[c.check_id]) return c;
      const { open_question_draft: _draft, ...rest } = c;
      return { ...rest, oq_id: chkOq[c.check_id] };
    }),
    coverage_by_feature_and_risk: own("coverage_by_feature_and_risk", byFeature(payload.coverage_by_feature_and_risk)),
    excluded_dimensions: own("excluded_dimensions", payload.excluded_dimensions ?? []),
    last_updated: cl.last_updated ?? lastUpdated
  });
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
  const safeKey=value=>typeof value==="string"&&/^[a-z0-9][a-z0-9-]*$/.test(value);
  if(!safeKey(product))throw new Error("invalid product scope");
  const mode = manifest.mode;
  const date = typeof args.date === "string" ? args.date : today();
  const ccrRef = typeof args["ccr-ref"] === "string" ? args["ccr-ref"] : manifest.source?.proposal_id ?? "bootstrap";
  const lastUpdated = { date, ccr_ref: ccrRef };
  const baseDir = path.join(knowledgeProductsDir, product);
  const out = paths.previewDir;
  if (args.clean === true) await rm(out, { recursive: true, force: true });
  await mkdir(out, { recursive: true });

  const previousOutput=await readJsonOr(path.join(path.dirname(out),"strip-summary.json"),null);
  if(previousOutput&&!Array.isArray(previousOutput.generated_files)&&args.clean!==true)throw new Error("legacy_preview_requires_reset: use --clean, then reapply prose and review");
  for(const rel of previousOutput?.generated_files??[]) {
    const file=path.resolve(out,rel);
    if(!file.startsWith(path.resolve(out)+path.sep))throw new Error("invalid prior generated path");
    await rm(file,{force:true});
  }
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
    if (!safeKey(object)) {
      problems.push(`${file}: không xác định được object (kb_context.object_id / object_target.object_key)`);
      continue;
    }
    if (file.startsWith("_object-level")) kbFiles[path.join(object, "kb.json")] = { object, featureKey: null, items };
    else {
      const featureKey = artifact.payload?.kb_context?.feature_key ?? file.replace(/\.json$/, "");
      if(!safeKey(featureKey)){problems.push("invalid feature key");continue;}
      if(featureObject[featureKey] && featureObject[featureKey]!==object) {problems.push(`feature key collision: ${featureKey}; split this run by object`);continue;}
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
  if(sup.deferred.length && sup.deferred.length===(diff?.payload??diff)?.change_details?.length)problems.push("awaiting_decision: all changes deferred; do not publish a version-only update");

  for (const [rel, entry] of Object.entries(kbFiles)) {
    const items=remapKbReferences(entry.items,entry.object,entry.featureKey,sup);
    await writeJson(path.join(out, rel), items);
    written.push(rel);
  }
  if (productItems) {
    await copySharedToPreview(baseDir,out,"_product-kb.json");
    await writeJson(path.join(out, "_product-kb.json"), productItems);
    written.push("_product-kb.json");
  }

  // 3. Feature profiles
  for (const file of (await readdir(paths.profilesDir).catch(() => [])).filter((f) => f.endsWith(".json")).sort()) {
    const payload = (await readJson(path.join(paths.profilesDir, file))).payload ?? {};
    for (const profile of payload.feature_profiles ?? []) {
      const object = featureObject[profile.feature_key];
      if (!safeKey(object)) {
        problems.push(`profile ${profile.feature_key}: không có KB shard tương ứng nên không biết object`);
        continue;
      }
      const rel = path.join(object, "features", profile.feature_key, "profile.json");
      const baseProfile=await readJsonOr(path.join(baseDir,rel),null);
      const rendered=publishProfile(profile,payload,{oqAssign,lastUpdated});
      await writeJson(path.join(out,rel),updatedArtifact(remapKbReferences(rendered,object,profile.feature_key,sup),baseProfile,lastUpdated));
      written.push(rel);
    }
  }

  // 4. Checklists
  for (const file of (await readdir(paths.checklistsDir).catch(() => [])).filter((f) => f.endsWith(".json")).sort()) {
    const payload = (await readJson(path.join(paths.checklistsDir, file))).payload ?? {};
    for (const cl of payload.checklists ?? []) {
      const object = featureObject[cl.feature_key];
      if (!safeKey(object)) {
        problems.push(`checklist ${cl.feature_key}: không có KB shard tương ứng nên không biết object`);
        continue;
      }
      const rel = path.join(object, "checklists", `${cl.feature_key}.json`);
      const baseChecklist=await readJsonOr(path.join(baseDir,rel),null);
      const rendered=publishChecklist(cl,payload,{objectKey:object,oqAssign,lastUpdated});
      await writeJson(path.join(out,rel),updatedArtifact(remapKbReferences(rendered,object,cl.feature_key,sup),baseChecklist,lastUpdated));
      written.push(rel);
    }
  }

  // 5. publish-meta + prose files cho mọi object bị chạm
  const objects = [...new Set(Object.values(kbFiles).map((v) => v.object))].sort();
  for(const old of previousOutput?.objects??[]){if(!safeKey(old))throw new Error("invalid prior object scope");if(!objects.includes(old))await rm(path.join(out,old),{recursive:true,force:true});}
  const versions = {};
  for (const object of objects) {
    const baseMeta = await readJsonOr(path.join(baseDir, object, "publish-meta.json"), null);
    const version = String((Number(baseMeta?.published_context_version) || 0) + 1);
    versions[object] = version;
    await writeJson(path.join(out, object, "publish-meta.json"), { published_context_version: version, published_at: date, mode });
    written.push(path.join(object, "publish-meta.json"));
    // Mọi object published đều có kb.json (§5); không có shard object-level và base cũng chưa có → mảng rỗng.
    const objectKb = path.join(out, object, "kb.json");
    if (!(await exists(objectKb)) && !(await exists(path.join(baseDir, object, "kb.json")))) {await writeJson(objectKb, []);written.push(path.join(object,"kb.json"));}
    for (const name of PROSE_FILES) {
      const target = path.join(out, object, name);
      const source = path.join(baseDir, object, name);
      if (!(await exists(target)) && (await exists(source))) await copySharedToPreview(baseDir,out,path.join(object,name));
    }
    if (sup.changelog[object]?.length) {
      const file = path.join(out, object, "CHANGELOG.md");
      const prev = (await exists(file)) ? await readFile(file, "utf8") : `# CHANGELOG — ${object}\n\n`;
      const additions=sup.changelog[object].filter(line=>!prev.split("\n").includes(line));
      if(additions.length)await writeFile(file, prev.trimEnd() + "\n" + additions.join("\n") + "\n");
    }
  }
  const registry = path.join(out, "_registry.json");
  if (!(await exists(registry)) && (await exists(path.join(baseDir, "_registry.json")))) await copyFile(path.join(baseDir, "_registry.json"), registry);
  await copyProductFiles(baseDir, out);

  const summary = { product, mode, date, ccr_ref: ccrRef, objects, versions, files_written: written.length, generated_files:written, supersedes_applied: sup.applied, deferred: sup.deferred, problems };
  await writeJson(path.join(path.dirname(out), "strip-summary.json"), summary);
  console.log(JSON.stringify({ ...summary, files_written: written.length }, null, 2));
  if (problems.length) process.exit(1);
}

if (import.meta.url === `file://${process.argv[1]}`) main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
