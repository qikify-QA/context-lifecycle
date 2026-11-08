import { createHash } from 'node:crypto';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { walk, readJson, writeJson, exists } from './fs-utils.mjs';
import { rootDir, knowledgeProductsDir } from './run-layout.mjs';
export const digest = value => createHash('sha256').update(value).digest('hex');
export const reviewBody = value => value?.payload ?? value;
export function requiredGates(mode, ccr = false) {
  const doc = ['DOC_BOOTSTRAP','CCR_INGEST'].includes(mode);
  return ['C0',...(ccr || mode === 'CCR_INGEST' ? ['C0.5'] : []),doc?'C1-DOC':'C1',doc?'C2-DOC':'C2','C3','C4','C5','C6'];
}
export function verdictProblems(value, {mode, ccr = false} = {}) {
  const body=reviewBody(value), errors=[];
  if (!body || typeof body !== 'object') return ['missing verdict'];
  const gates=body.gate_results ?? [], names=gates.map(g=>g.gate);
  if (!['APPROVED','APPROVED_WITH_CONDITIONS','REJECTED'].includes(body.decision)) errors.push('invalid decision');
  if (new Set(names).size!==names.length) errors.push('duplicate gate_results');
  if (mode) for (const gate of requiredGates(mode,ccr)) if (!names.includes(gate)) errors.push(`missing gate ${gate}`);
  for (const g of gates) if (!['PASS','CONDITIONAL_PASS','FAIL','NOT_APPLICABLE'].includes(g.status)) errors.push(`invalid gate status ${g.gate}`);
  if (body.publish_allowed===true) {
    if (body.decision==='REJECTED') errors.push('REJECTED cannot publish');
    if (!gates.length) errors.push('empty gate_results cannot publish');
    if (gates.some(g=>g.status==='FAIL')) errors.push('true trong khi gate FAIL');
    if ((body.findings??[]).some(f=>f.severity==='BLOCKING' && f.resolved!==true)) errors.push('unresolved BLOCKING finding');
    if (gates.some(g=>g.status==='NOT_APPLICABLE' && ['C0','C0.5','C3','C4','C5','C6'].includes(g.gate))) errors.push('required gate NOT_APPLICABLE');
  }
  return errors;
}
// Terminal bookkeeping does not invalidate a review. Mode/scope/source/identity do.
export async function reviewInputs(runDir, {projectRoot=rootDir, knowledgeDir=knowledgeProductsDir}={}) {
  const out={};
  const hashFile=async(file,key)=>{try{out[key]=digest(await readFile(file));}catch(e){if(e.code!=='ENOENT')throw e;}};
  for (const rel of ['input','raw','intermediate','candidate','review/knowledge-diff.json']) {
    const abs=path.join(runDir,rel), st=await stat(abs).catch(e=>{if(e.code==='ENOENT')return null;throw e;});
    for (const f of !st?[]:st.isDirectory()?await walk(abs):[abs]) {
      const key=path.relative(runDir,f);
      if (['input/run-checkpoint.json','input/review-start.json'].includes(key)) continue;
      await hashFile(f,key);
    }
  }
  const manifest=await readJson(path.join(runDir,'run-manifest.json'));
  out['run-manifest.json']=digest(JSON.stringify(Object.fromEntries(['run_id','product','mode','mode_settled_at','source','object_target'].map(k=>[k,manifest[k]??null]))));
  for (const folder of ['contracts','scripts/ctx','scripts/lib','.claude/skills']) for (const f of await walk(path.join(projectRoot,folder))) if (!f.includes(`${path.sep}test${path.sep}`) && /\.(md|json|mjs)$/.test(f)) await hashFile(f,`@rules/${path.relative(projectRoot,f)}`);
  await hashFile(path.join(projectRoot,'config/products',`${manifest.product}.json`),`@config/${manifest.product}`);
  await hashFile(path.join(projectRoot,'config/legacy-authority-debt.json'),'@config/legacy-authority-debt');
  await hashFile(path.join(projectRoot,'scripts/generate-manifest.mjs'),'@rules/scripts/generate-manifest.mjs');
  // Base files actually covered by this preview; do not hash unrelated products.
  const preview=path.join(runDir,'candidate/publish-preview');
  for (const f of await walk(preview)) {
    const rel=path.relative(preview,f);
    await hashFile(path.join(knowledgeDir,manifest.product,rel),`@base/${rel}`);
  }
  // Oracle refs may depend on a shard not copied into preview. Hash product KBs
  // without loading their contents into model context.
  for(const f of await walk(path.join(knowledgeDir,manifest.product)))if(path.basename(f)==='kb.json'||path.basename(f)==='_product-kb.json')await hashFile(f,`@base/${path.relative(path.join(knowledgeDir,manifest.product),f)}`);
  return out;
}
export function compareHashes(before,now) {
  return {full:false,changed:Object.keys(now).filter(k=>k in before&&before[k]!==now[k]).sort(),added:Object.keys(now).filter(k=>!(k in before)).sort(),removed:Object.keys(before).filter(k=>!(k in now)).sort()};
}
export function unchanged(before,now) {const d=compareHashes(before,now);return !d.changed.length&&!d.added.length&&!d.removed.length;}
export async function startReview(runDir,opts) {
  const files=await reviewInputs(runDir,opts);
  await writeJson(path.join(runDir,'review/review-start.json'),{files,started_at:new Date().toISOString()});
  return {ok:true,files:Object.keys(files).length};
}
export async function sealReview(runDir,opts) {
  const files=await reviewInputs(runDir,opts), start=await readJson(path.join(runDir,'review/review-start.json'));
  if (!unchanged(start.files,files)) throw new Error('review_inputs_changed: restart independent review');
  const manifest=await readJson(path.join(runDir,'run-manifest.json'));
  const verdictFile=path.join(runDir,'review/verdict.json'), bytes=await readFile(verdictFile);
  const errors=verdictProblems(JSON.parse(bytes),{mode:manifest.mode,ccr:Boolean(manifest.source?.proposal_id||manifest.mode_settled_at==='C0.5')});
  if(errors.length)throw new Error(errors.join('; '));
  let round=1;while(await exists(path.join(runDir,`review/verdict-round-${round}.json`)))round++;
  await writeJson(path.join(runDir,`review/verdict-round-${round}.json`),JSON.parse(bytes));
  const snapshot={schema_version:2,round,verdict:`review/verdict-round-${round}.json`,verdict_sha256:digest(bytes),files,sealed_at:new Date().toISOString()};
  await writeJson(path.join(runDir,'review/reviewed-hashes.json'),snapshot);
  return {ok:true,round,verdict:snapshot.verdict};
}
export async function verifyReview(runDir,opts) {
  const snap=await readJson(path.join(runDir,'review/reviewed-hashes.json'));
  if(snap.schema_version!==2||!snap.files)throw new Error('review_snapshot_missing_or_legacy');
  const current=await readFile(path.join(runDir,'review/verdict.json'));
  if(digest(current)!==snap.verdict_sha256)throw new Error('verdict_changed_after_review');
  const archived=await readFile(path.join(runDir,snap.verdict));
  if(digest(JSON.stringify(JSON.parse(archived)))!==digest(JSON.stringify(JSON.parse(current))))throw new Error('review_archive_mismatch');
  if(!unchanged(snap.files,await reviewInputs(runDir,opts)))throw new Error('review_inputs_changed');
  return snap;
}
