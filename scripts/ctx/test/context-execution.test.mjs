import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { buildPack, selectSections } from '../context-pack.mjs';
import { materialize, mergeKb, patchBase, sha256 } from '../materialize-delta.mjs';

test('context pack: role rules verbatim; builder excludes credential and CCR intake', async () => {
  const pack = await buildPack({ agent:'feature-context-builder', mode:'CCR_INGEST' });
  assert.match(pack,/## 3\. Knowledge kind/);
  assert.match(pack,/## C4 Feature Profile/);
  assert.match(pack,/## C5 Checklist/);
  assert.doesNotMatch(pack,/## 14\. Credentials|Source: contracts\/ccr-protocol/);
  assert.throws(() => selectSections('## 0. Test\nx',['missing']));
  await assert.rejects(buildPack({agent:'../bad',mode:'CCR_INGEST'}));
});
test('context pack: reviewer gets mode gates and supersede', async () => {
  const pack = await buildPack({ agent:'context-quality-reviewer', mode:'CCR_INGEST' });
  assert.match(pack,/## C1-DOC/);
  assert.doesNotMatch(pack,/## C1 Exploration/);
  assert.match(pack,/Source: contracts\/supersede/);
});
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

test('all configured roles generate packs in every supported mode', async () => {
  const policy = JSON.parse(await readFile(new URL('../../../config/context-policy.json',import.meta.url),'utf8'));
  for (const agent of Object.keys(policy.roles)) {
    for (const mode of ['ZERO_DOC_BOOTSTRAP','BROAD_BOOTSTRAP','DOC_BOOTSTRAP','CCR_INGEST','INCREMENTAL_UPDATE','REFRESH','RECONCILE']) {
      const pack = await buildPack({agent,mode});
      assert.match(pack,/## 6\. Redaction/);
      assert.match(pack,/## 2\. Global rules/);
    }
  }
});

test('merged builder roster and context policy contain one builder with C4 and C5', async () => {
  const policy = JSON.parse(await readFile(new URL('../../../config/context-policy.json',import.meta.url),'utf8'));
  const roster = JSON.parse(await readFile(new URL('../../../ops-board/data/roster.json',import.meta.url),'utf8'));
  assert.deepEqual(roster.agents.filter(a => a.type === 'builder').map(a => a.id),['feature-context-builder']);
  assert.ok(policy.roles['feature-context-builder']);
  assert.equal(policy.roles['feature-profile-builder'],undefined);
  assert.equal(policy.roles['qa-checklist-builder'],undefined);
  const pack = await buildPack({agent:'feature-context-builder',mode:'DOC_BOOTSTRAP'});
  assert.match(pack,/## C4 Feature Profile/);
  assert.match(pack,/## C5 Checklist/);
});

test('board keeps merged builder active until both outputs exist for every feature', async () => {
  const { featureBuilderProgress } = await import('../../lib/feature-builder-progress.mjs');
  assert.equal(featureBuilderProgress({}).phase,'idle');
  assert.equal(featureBuilderProgress({hasKb:true,expected:['a.json','b.json'],profiles:['a.json'],checklists:['a.json']}).phase,'profile');
  assert.equal(featureBuilderProgress({hasKb:true,expected:['a.json','b.json'],profiles:['a.json','b.json'],checklists:['a.json']}).phase,'checklist');
  assert.equal(featureBuilderProgress({hasKb:true,expected:['a.json'],profiles:['a.json'],checklists:['a.json']}).phase,'done');
  assert.equal(featureBuilderProgress({hasKb:true,profiles:[],checklists:['a.json']}).phase,'profile');
});

test('rule agenda shares chunks across roles and preserves fenced blocks', async () => {
  const { splitRuleText, writeRuleRoute, runAgenda } = await import('../../lib/context-routing.mjs');
  const fenced = '````markdown\n```json\n\n{"a":1}\n```\n````';
  const chunks = splitRuleText('Intro\n\n'+fenced+'\n\nTail',10);
  assert.ok(chunks.includes(fenced));
  const dir = await mkdtemp(path.join(tmpdir(),'ctx-route-'));
  const one = await writeRuleRoute(dir,{agent:'a',mode:'CCR_INGEST',fullText:'## 0. Common\n\nDo not invent evidence.\n\n## 3. Kind\n\nOnly authority confirms.'});
  const two = await writeRuleRoute(dir,{agent:'b',mode:'CCR_INGEST',fullText:'## 0. Common\n\nDo not invent evidence.'});
  assert.equal(one.entries[0].path,two.entries[0].path);
  const agenda = await readFile(one.file,'utf8');
  assert.match(agenda,/input\/context-rules\//);
  assert.doesNotMatch(agenda,/Only authority confirms/);
  assert.match(await readFile(path.join(dir,one.entries[1].path),'utf8'),/Only authority confirms/);
  assert.match(runAgenda({mode:'CCR_INGEST',product:'p',run_id:'r'}),/run-checkpoint.json/);
});

test('artifact index locates IDs without copying statements and resolves escaped pointers', async () => {
  const { indexJson,readPointer,indexArtifact } = await import('../context-index.mjs');
  const data = {payload:{kb_candidates:[{kb_id:'KB-1',statement:'Sensitive long evidence',scope:{environment:'documented'}}]},'a/b':{'x~y':3}};
  const entries = indexJson(data);
  assert.equal(entries.find(x=>x.id==='KB-1').pointer,'/payload/kb_candidates/0');
  assert.ok(!JSON.stringify(entries).includes('Sensitive long evidence'));
  assert.equal(readPointer(data,'/a~1b/x~0y'),3);
  assert.throws(()=>readPointer(data,'/payload/missing'));
  assert.throws(()=>readPointer(data,'/__proto__'));
  const dir = await mkdtemp(path.join(tmpdir(),'ctx-index-'));
  const source = path.join(dir,'source.json'); await writeFile(source,JSON.stringify(data));
  const report = await indexArtifact(dir,source);
  const manifest = JSON.parse(await readFile(report.index,'utf8'));
  assert.ok(manifest.pages.length);
  assert.equal(manifest.sha256,sha256(JSON.stringify(data)));
  const changed = {payload:{kb_candidates:[{kb_id:'KB-2',statement:'different'}]}};
  await writeFile(source,JSON.stringify(changed));
  const next = await indexArtifact(dir,source);
  assert.notEqual(next.index,report.index);
});

test('runtime defaults and per-role effort avoid inheriting high effort for every worker', async () => {
  const config = JSON.parse(await readFile(new URL('../../../.claude/settings.json',import.meta.url),'utf8'));
  assert.equal(config.autoCompactWindow,650000);
  assert.equal(config.effortLevel,'medium');
  for (const [role,model,effort] of [['otto','sonnet','medium'],['feature-context-builder','sonnet','medium'],['qa-knowledge-normalizer','opus','medium'],['knowledge-diff-analyzer','opus','high'],['context-quality-reviewer','opus','high']]) {
    const text = await readFile(new URL(`../../../.claude/agents/${role}.md`,import.meta.url),'utf8');
    assert.ok(text.includes(`model: ${model}[1m]`));
    assert.ok(text.includes(`effort: ${effort}`));
  }
});
