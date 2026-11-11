import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { materialize, mergeKb, patchBase, sha256 } from '../materialize-delta.mjs';

test('KB merge preserves base and rejects overwriting ID or conflicting duplicate', () => {
  const old = { kb_id:'KB-001',statement:'old',last_updated:{date:'2026-01-01'} };
  const added = {kb_id:'KB-002',statement:'new',target_kb_ids:['KB-001']};
  assert.deepEqual(mergeKb([old],[added]),[old,added]);
  assert.throws(() => mergeKb([old],[{...old,statement:'changed'}]));
  assert.throws(() => mergeKb([old],[added,{...added,statement:'other'}]));
  assert.deepEqual(mergeKb([old],[old]),[old]);
});
test('patches preserve untouched fields; enforce before and reject unsafe paths', () => {
  const base = {checks:[{id:'1'},{id:'2'}],name:'original'};
  assert.deepEqual(patchBase(base,[{op:'add',path:'/checks/-',value:{id:'3'}}]),{...base,checks:[...base.checks,{id:'3'}]});
  assert.deepEqual(patchBase(base,[{op:'replace',path:'/name',before:'original',value:'changed'}]).checks,base.checks);
  assert.throws(() => patchBase(base,[{op:'replace',path:'/name',before:'stale',value:'changed'}]));
  assert.throws(() => patchBase(base,[{op:'add',path:'/__proto__/x',value:true}]));
  assert.throws(() => patchBase(base,[{op:'add',path:'/name',value:'overwrite'}]));
  assert.throws(() => patchBase(base,[{op:'add',path:'/checks/9',value:{}}]));
  assert.equal(base.name,'original');
});
test('materialize uses actual base hash, preserves source, stable rerun and refuses scope escape', async () => {
  const dir = await mkdtemp(path.join(tmpdir(),'ctx-delta-'));
  const run = path.join(dir,'run'); const knowledge = path.join(dir,'knowledge');
  await mkdir(run); await writeFile(path.join(run,'run-manifest.json'),JSON.stringify({product:'p'}));
  const baseDir = path.join(knowledge,'p','o','features','f'); await mkdir(baseDir,{recursive:true});
  const bytes = JSON.stringify([{kb_id:'KB-1',statement:'base',last_updated:{date:'old'}}]);
  await writeFile(path.join(baseDir,'kb.json'),bytes);
  const delta = { stage:'kb',object_key:'o',feature_key:'f',base_sha256:sha256(bytes),artifact:{producer:'qa-knowledge-normalizer',payload:{kb_context:{object_id:'o',feature_key:'f'},kb_candidates:[{kb_id:'KB-2',statement:'new'}]}} };
  const first = await materialize(run,delta,{knowledgeDir:knowledge});
  const output = await readFile(first.output,'utf8');
  assert.equal(JSON.parse(output).payload.kb_candidates.length,2);
  await materialize(run,delta,{knowledgeDir:knowledge});
  assert.equal(await readFile(first.output,'utf8'),output);
  assert.equal(await readFile(path.join(baseDir,'kb.json'),'utf8'),bytes);
  await assert.rejects(materialize(run,{...delta,base_sha256:'wrong'},{knowledgeDir:knowledge}),/base_changed/);
  await assert.rejects(materialize(run,{...delta,object_key:'../escape'},{knowledgeDir:knowledge}),/Invalid/);
});

test('profile and checklist materialize keep untouched data and stage metadata', async () => {
  const dir = await mkdtemp(path.join(tmpdir(),'ctx-patch-'));
  const run = path.join(dir,'run'), knowledge = path.join(dir,'knowledge');
  await mkdir(run); await writeFile(path.join(run,'run-manifest.json'),JSON.stringify({product:'p'}));
  for (const stage of ['profile','checklist']) {
    const rel = stage === 'profile' ? 'features/f/profile.json' : 'checklists/f.json';
    const file = path.join(knowledge,'p','o',rel);
    const base = {feature_key:'f',object_id:'o',name:'before',checks:[{check_id:'CHK-1',oracle:{kb_ids:['KB-1']}}],extra:{keep:true}};
    const bytes = JSON.stringify(base); await mkdir(path.dirname(file),{recursive:true}); await writeFile(file,bytes);
    const delta = {stage,object_key:'o',feature_key:'f',base_sha256:sha256(bytes),artifact:{producer:'builder',payload:{coverage_findings:[]}},patches:[{op:'replace',path:'/name',before:'before',value:'after'}]};
    const {output} = await materialize(run,delta,{knowledgeDir:knowledge});
    const actual = JSON.parse(await readFile(output,'utf8')).payload;
    assert.deepEqual(actual[stage === 'profile' ? 'feature_profiles' : 'checklists'],[{...base,name:'after'}]);
    assert.deepEqual(actual.coverage_findings,[]);
    assert.equal(await readFile(file,'utf8'),bytes);
    await assert.rejects(materialize(run,{...delta,patches:[{op:'replace',path:'/feature_key',before:'f',value:'other'}]},{knowledgeDir:knowledge}),/scope mismatch/);
  }
});
