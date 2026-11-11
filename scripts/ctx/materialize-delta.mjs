#!/usr/bin/env node
// Delta files stay separate from full downstream artifacts. No knowledge writes.
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { isDeepStrictEqual } from 'node:util';
import { parseArgs, readJson, readJsonOr, writeJson } from '../lib/fs-utils.mjs';
import { resolveRunDir, knowledgeProductsDir } from '../lib/run-layout.mjs';
export const sha256 = text => createHash('sha256').update(text).digest('hex');
const safeKey = value => typeof value === 'string' && /^[a-zA-Z0-9][a-zA-Z0-9_-]*$/.test(value);

export function mergeKb(base, delta) {
  if (!Array.isArray(base) || !Array.isArray(delta)) throw new Error('KB must be arrays');
  const result = structuredClone(base);
  const seen = new Map();
  for (const item of result) {
    if (!item.kb_id || seen.has(item.kb_id)) throw new Error('Invalid/duplicate base kb_id');
    seen.set(item.kb_id, item);
  }
  for (const item of delta) {
    if (!item.kb_id) throw new Error('Missing kb_id');
    if (seen.has(item.kb_id)) {
      if (!isDeepStrictEqual(seen.get(item.kb_id), item)) throw new Error(`Cannot overwrite base KB: ${item.kb_id}; use a new candidate ID + target_kb_ids`);
      continue;
    }
    result.push(structuredClone(item));
    seen.set(item.kb_id, item);
  }
  return result;
}
// Explicit preconditions make array-index patches safe and prevent silent overwrites.
export function patchBase(base, patches) {
  const result = structuredClone(base);
  for (const patch of patches) {
    if (!['add','replace','remove'].includes(patch.op) || typeof patch.path !== 'string' || !patch.path.startsWith('/')) throw new Error('Invalid patch');
    const keys = patch.path.slice(1).split('/').map(k => k.replace(/~1/g,'/').replace(/~0/g,'~'));
    if (keys.some(k => ['__proto__','prototype','constructor'].includes(k))) throw new Error('Unsafe patch path');
    let parent = result;
    for (const key of keys.slice(0,-1)) {
      if (parent === null || typeof parent !== 'object' || !Object.hasOwn(parent,key)) throw new Error(`Missing parent: ${patch.path}`);
      parent = parent[key];
    }
    if (parent === null || typeof parent !== 'object') throw new Error('Invalid parent');
    const key = keys.at(-1);
    if (patch.op !== 'add' && (!Object.hasOwn(parent,key) || !Object.hasOwn(patch,'before') || !isDeepStrictEqual(parent[key],patch.before))) throw new Error(`Patch precondition failed: ${patch.path}`);
    if (patch.op !== 'remove' && !Object.hasOwn(patch,'value')) throw new Error('Missing patch value');
    if (Array.isArray(parent)) {
      const index = key === '-' && patch.op === 'add' ? parent.length : /^(0|[1-9]\d*)$/.test(key) ? Number(key) : NaN;
      if (!Number.isSafeInteger(index) || index < 0 || index > parent.length || (patch.op !== 'add' && index === parent.length)) throw new Error('Invalid array index');
      if (patch.op === 'add') parent.splice(index,0,structuredClone(patch.value));
      else if (patch.op === 'remove') parent.splice(index,1);
      else parent[index] = structuredClone(patch.value);
    } else {
      if (patch.op === 'add' && Object.hasOwn(parent,key)) throw new Error('add cannot overwrite existing field');
      if (patch.op === 'remove') delete parent[key];
      else parent[key] = structuredClone(patch.value);
    }
  }
  return result;
}
export async function materialize(runDir, delta, { knowledgeDir = knowledgeProductsDir } = {}) {
  const manifest = await readJson(path.join(runDir,'run-manifest.json'));
  const { stage, object_key: object, feature_key: feature, artifact, base_sha256: hash } = delta;
  if (!safeKey(manifest.product) || !safeKey(object) || (feature !== null && !safeKey(feature))) throw new Error('Invalid product/object/feature');
  if (!['kb','profile','checklist'].includes(stage) || (!feature && stage !== 'kb')) throw new Error('Invalid stage/scope');
  const baseRel = stage === 'kb' ? feature ? `features/${feature}/kb.json` : 'kb.json' : stage === 'profile' ? `features/${feature}/profile.json` : `checklists/${feature}.json`;
  const bytes = await readFile(path.join(knowledgeDir,manifest.product,object,baseRel));
  if (!hash || sha256(bytes) !== hash) throw new Error('base_changed: re-read base and regenerate delta');
  if (!artifact?.payload || !artifact.producer) throw new Error('Need full artifact envelope with payload');
  const output = structuredClone(artifact);
  const base = JSON.parse(bytes);
  if (stage === 'kb') {
    if (output.payload.kb_context?.object_id !== object || (output.payload.kb_context?.feature_key ?? null) !== feature) throw new Error('KB context scope mismatch');
    output.payload.kb_candidates = mergeKb(base,output.payload.kb_candidates);
  } else {
    const key = stage === 'profile' ? 'feature_profiles' : 'checklists';
    if (Object.hasOwn(output.payload,key)) throw new Error(`Do not duplicate ${key} in delta envelope`);
    const patched = patchBase(base,delta.patches ?? []);
    if (patched.feature_key !== feature || (patched.object_id && patched.object_id !== object)) throw new Error('Patched scope mismatch');
    output.payload[key] = [patched];
  }
  const folder = { kb:'product-kb', profile:'feature-profiles', checklist:'checklists' }[stage];
  const file = path.join(runDir,'candidate',folder,`${feature ?? `_object-level.${object}`}.json`);
  const prior=await readJsonOr(file,null);
  if(prior){const priorObject=prior.scope_identity?.object??prior.payload?.kb_context?.object_id??prior.payload?.kb_context?.object_key??prior.payload?.feature_profiles?.[0]?.object_id??prior.payload?.checklists?.[0]?.object_id??manifest.object_target?.object_key;
    if(priorObject && priorObject!==object)throw new Error("candidate_scope_collision: split multi-object runs or use distinct feature keys");}
  output.scope_identity={product:manifest.product,object,feature};
  await writeJson(file,output);
  return { ok:true, stage, output:file, base_sha256:hash };
}
async function main() {
  const args = parseArgs();
  if (typeof args.run !== 'string' || typeof args.file !== 'string') throw new Error('Need --run --file');
  const dir = resolveRunDir(args.run);
  const file = path.resolve(dir,args.file);
  const deltaDir = path.join(dir,'candidate','deltas') + path.sep;
  if (!file.startsWith(deltaDir)) throw new Error('Delta must be under candidate/deltas/');
  console.log(JSON.stringify(await materialize(dir,await readJson(file))));
}
if (import.meta.url === `file://${process.argv[1]}`) main().catch(e => { console.error(e.message); process.exitCode=1; });
