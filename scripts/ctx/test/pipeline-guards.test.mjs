import {test} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,mkdir,writeFile,readFile,readdir} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
import {applySupersedes,remapKbReferences,updatedArtifact} from '../publish-strip.mjs';
import {verdictProblems,startReview,sealReview,verifyReview} from '../../lib/review-state.mjs';
import {extractOpenQuestions,findUnfencedEntries} from '../../lib/open-questions.mjs';
import {findDuplicates} from '../dedup.mjs';
import {acquireAll,releaseAll,verifyAll} from '../../lib/locks.mjs';
import {createRun} from '../new-run.mjs';
import {recoverRelease} from '../../lib/release-recovery.mjs';
import {oracleSummary} from '../../lib/authority.mjs';
import {secretFindings} from '../../lib/secret-scan.mjs';
import {kbIndex,resolveKbRef} from '../../lib/kb-references.mjs';
import {bundleIntegrity} from '../../lib/bundle-integrity.mjs';
const temp=()=>mkdtemp(path.join(tmpdir(),'ctx-guards-'));
const write=async(dir,rel,data)=>{const f=path.join(dir,rel);await mkdir(path.dirname(f),{recursive:true});await writeFile(f,typeof data==='string'?data:JSON.stringify(data));return f;};
const item=(kb_id,statement='x')=>({kb_id,statement,knowledge_kind:'CONFIRMED_EXPECTED',confidence:'HIGH',confirmation_source:{type:'spec_doc',ref:'Spec v1 section 1',authored_on:'2026-01-01'}});
const opts={date:'2026-11-08',ccrRef:'CBS-9',mode:'CCR_INGEST'};

test('resolutions remap removed candidate IDs and enforce proposed/conflict state',()=>{
 for(const resolution of ['SUPERSEDE','REFRESHED_ONLY','CONFLICTED','PROPOSED']){
  const files={'o/f':{object:'o',featureKey:'f',items:[item('KB-1','old'),item('KB-2','new')]}};
  const r=applySupersedes({change_details:[{resolution,object_id:'o',feature_key:'f',kb_id:'KB-1',candidate_kb_id:'KB-2'}]},files,opts);
  assert.deepEqual(r.problems,[]);
  if(['SUPERSEDE','REFRESHED_ONLY'].includes(resolution)){
   assert.deepEqual(files['o/f'].items.map(i=>i.kb_id),['KB-1']);
   const cl=remapKbReferences({checks:[{oracle:{kb_ids:['KB-2','f#KB-2','o/f#KB-2']}}]},'o','f',r);
   assert.deepEqual(cl.checks[0].oracle.kb_ids,['KB-1','o/f#KB-1','o/f#KB-1']);
  }else if(resolution==='CONFLICTED')assert.ok(files['o/f'].items.every(i=>i.status==='UNRESOLVED'&&i.conflict_group));
  else {assert.equal(files['o/f'].items[1].knowledge_kind,'PROPOSED');assert.equal(files['o/f'].items[1].confirmation_source,undefined);}
 }
});
test('supersede disambiguates objects and rejects ambiguous target',()=>{
 const files=()=>Object.fromEntries(['a','b'].map(object=>[object,{object,featureKey:null,items:[item('KB-1'),item('KB-2')]}]));
 const change={resolution:'SUPERSEDE',feature_key:null,kb_id:'KB-1',candidate_kb_id:'KB-2'};
 assert.ok(applySupersedes({change_details:[change]},files(),opts).problems.length);
 assert.equal(applySupersedes({change_details:[{...change,object_id:'b'}]},files(),opts).applied[0].object,'b');
});
test('required verdict gates and decision cannot be bypassed by a boolean',()=>{
 assert.ok(verdictProblems({decision:'REJECTED',publish_allowed:true,gate_results:[]},{mode:'CCR_INGEST'}).length);
 const gates=['C0','C0.5','C1-DOC','C2-DOC','C3','C4','C5','C6'].map(gate=>({gate,status:'PASS'}));
 assert.deepEqual(verdictProblems({decision:'APPROVED',publish_allowed:true,gate_results:gates},{mode:'CCR_INGEST'}),[]);
 assert.ok(verdictProblems({decision:'APPROVED',publish_allowed:true,gate_results:[...gates,gates[0]]},{mode:'CCR_INGEST'}).includes('duplicate gate_results'));
});
test('sealed review fails after candidate/raw/rules changes and archives each verdict',async()=>{
 const dir=await temp(),project=await temp(),knowledge=await temp();
 await write(dir,'run-manifest.json',{run_id:'R',product:'p',mode:'DOC_BOOTSTRAP'});
 await write(dir,'raw/network/action.json',{safe:true});
 await write(dir,'candidate/publish-preview/o/kb.json',[]);
 await write(project,'contracts/gates.md','gate v1');
 const options={projectRoot:project,knowledgeDir:knowledge};
 await startReview(dir,options);
 await write(dir,'review/verdict.json',{decision:'APPROVED',publish_allowed:true,gate_results:['C0','C1-DOC','C2-DOC','C3','C4','C5','C6'].map(gate=>({gate,status:'PASS'}))});
 await sealReview(dir,options);await verifyReview(dir,options);
 await write(dir,'run-manifest.json',{run_id:'R',product:'p',mode:'DOC_BOOTSTRAP',status:'PUBLISHED'});await verifyReview(dir,options);
 await write(dir,'raw/network/action.json',{safe:false});await assert.rejects(verifyReview(dir,options),/review_inputs_changed/);
 await assert.rejects(sealReview(dir,options),/review_inputs_changed/);
 await startReview(dir,options);await sealReview(dir,options);await verifyReview(dir,options);
 assert.ok((await readdir(path.join(dir,'review'))).includes('verdict-round-2.json'));
 await write(project,'contracts/gates.md','gate v2');await assert.rejects(verifyReview(dir,options),/review_inputs_changed/);
});
test('dedup permits new authority on same target but catches same revision',()=>{
 const c=(description,ref,date)=>({description,target_kb_ids:['KB-1'],kb_address:{feature_key:'f'},confirmation_source:{type:'po_dev_confirm',ref,authored_on:date}});
 const old=c('old rule','Comment old','2026-01-01'),next=c('new rule','Comment new','2026-02-01');
 const other={product:'p',object:'o',runId:'OLD',status:'PUBLISHED',plan:{proposal_id:'OLD',claims:[old]}};
 assert.equal(findDuplicates({product_key:'p',object_key:'o',claims:[next]},[other]).duplicates.length,0);
 assert.equal(findDuplicates({product_key:'p',object_key:'o',claims:[old]},[other]).duplicates.length,1);
 assert.equal(findDuplicates({proposal_id:'OLD',product_key:'p',object_key:'o',claims:[old]},[other]).duplicates.length,0);
});
test('lock concurrent stale takeover has one owner; failed extension preserves old locks',async()=>{
 const dir=await temp(),now=Date.parse('2026-01-01');
 await acquireAll(['a'],{dir,ctxRunId:'old',now,ttlSeconds:1});
 const results=await Promise.all(Array.from({length:12},(_,i)=>acquireAll(['a'],{dir,ctxRunId:`r${i}`,now:now+2000})));
 assert.equal(results.filter(r=>r.ok).length,1);
 await acquireAll(['held'],{dir,ctxRunId:'owner'});await acquireAll(['other'],{dir,ctxRunId:'other'});
 assert.equal((await acquireAll(['held','other'],{dir,ctxRunId:'owner'})).ok,false);
 assert.equal((await verifyAll(['held'],{dir,ctxRunId:'owner'})).ok,true);
});
test('one proposal cannot create two live runs, including parallel intake',async()=>{
 const base=await temp();const options={product:'p',mode:'CCR_INGEST',proposalId:'CBS-9',base,date:'2026-11-08'};
 const results=await Promise.allSettled([createRun(options),createRun(options)]);
 assert.equal(results.filter(r=>r.status==='fulfilled').length,1);
 assert.match(results.find(r=>r.status==='rejected').reason.message,/proposal_already_claimed/);
});
test('OQ braces/escapes in valid strings are not lost',()=>{
 for(const summary of ['literal }','literal {','quote " and brace }','backslash \\ and {']){
  const text='```json\n'+JSON.stringify({oq_id:'OQ-o-1',summary})+'\n```';
  assert.equal(extractOpenQuestions(text).length,1);assert.deepEqual(findUnfencedEntries(text),[]);
 }
});
test('oracle metadata excludes invalid legacy authority and reports DOC_ONLY',()=>{
 assert.equal(oracleSummary([{...item('KB-1'),confirmation_source:null}]).usable_as_oracle,false);
 assert.equal(oracleSummary([{...item('KB-1'),confirmation_source:{type:'dev_doc',ref:'Doc v1 section 1',authored_on:'2026-01-01',derivation:'prose'}}]).usable_as_oracle,'DOC_ONLY');
 assert.equal(oracleSummary([{...item('KB-1'),status:'UNRESOLVED'}]).usable_as_oracle,false);
});
test('new content updates metadata while unchanged base keeps original',()=>{
 const base={name:'old',last_updated:{date:'2026-01-01',ccr_ref:'old'}};
 assert.deepEqual(updatedArtifact(base,base,opts).last_updated,base.last_updated);
 assert.deepEqual(updatedArtifact({...base,name:'new'},base,{date:'2026-11-08',ccr_ref:'new'}).last_updated,{date:'2026-11-08',ccr_ref:'new'});
});
test('secret scanner detects signed credentials and env values without exposing them',()=>{
 const token='SAMPLE'+'x'.repeat(30);
 for(const text of ['Bearer '+token,['TIB_STAGING_PASSWORD',token].join('='),'https://example.test/?X-Amz-Signature='+token]){
  const findings=secretFindings(text);assert.ok(findings.length);assert.ok(!JSON.stringify(findings).includes(token));
 }
 assert.ok(secretFindings('FOO=example',{envFile:true}).length);assert.deepEqual(secretFindings('FOO=\n# setup',{envFile:true}),[]);
});
test('qualified KB identities resolve colliding legacy IDs in their own feature',()=>{
 const index=kbIndex([{object:'o',feature:'a',items:[item('KB-1','a')]},{object:'o',feature:'b',items:[item('KB-1','b')]}]);
 assert.equal(resolveKbRef('KB-1',{object:'o',feature:'a',index}).item.statement,'a');
 assert.equal(resolveKbRef('o/b#KB-1',{object:'o',feature:'a',index}).item.statement,'b');
 assert.throws(()=>resolveKbRef('KB-1',{object:'o',feature:'other',index}),/ambiguous/);
});
test('bundle integrity rejects dangling and invalid strong oracle',async()=>{
 const dir=await temp();await write(dir,'o/features/f/kb.json',[{...item('KB-1'),knowledge_kind:'PROPOSED',confirmation_source:null}]);
 await write(dir,'o/checklists/f.json',{checks:[{check_id:'CHK-1',status:'READY',oracle:{oracle_strength:'STRONG',kb_ids:['KB-1']}},{check_id:'CHK-2',oracle:{oracle_strength:'STRONG',kb_ids:['KB-404']}}]});
 const errors=await bundleIntegrity(dir);assert.ok(errors.some(e=>e.problem.includes('invalid STRONG')));assert.ok(errors.some(e=>e.problem.includes('missing KB')));
});
test('release recovery retries after PR creation failure without duplicate commit',async()=>{
 let committed=false,created=false,persisted=false,commits=0,fail=true;
 const record={branch:'publish/test',tree:'TREE',message:'release'};
 const io={run:async(...args)=>{if(args[0]==='diff')return '';if(args[0]==='branch')return record.branch;if(args[0]==='rev-parse')return args[1]==='HEAD^{tree}'?(committed?'TREE':'OLD'):'EXISTS';if(args[0]==='write-tree')return 'TREE';if(args[0]==='commit'){committed=true;commits++;}return '';},findPr:async()=>created?[{url:'https://example.test/pr/1',state:'OPEN'}]:[],createPr:async()=>{if(fail){fail=false;throw new Error('401');}created=true;return 'https://example.test/pr/1';},persist:async()=>{persisted=true;}};
 await assert.rejects(recoverRelease(record,io),/401/);assert.equal(commits,1);
 assert.equal(await recoverRelease(record,io),'https://example.test/pr/1');assert.equal(commits,1);assert.equal(persisted,true);
});

test('claim-less proposal marker is exclusive and cannot replay completed work',async()=>{
 const {claimProposal}=await import('../proposal-claim.mjs');
 const dir=await temp();const r=await Promise.all([claimProposal(dir,'p','CBS-9'),claimProposal(dir,'p','CBS-9')]);
 assert.equal(r.filter(v=>v.ok).length,1);
 await write(dir,'p-CBS-9.json',{status:'done',files:['guide.md']});
 const repeated=await claimProposal(dir,'p','CBS-9');assert.equal(repeated.ok,false);assert.equal(repeated.status,'done');
});
test('file transaction restores existing files and removes newly written output on failure',async()=>{
 const {withFileRollback}=await import('../../lib/file-transaction.mjs');
 const dir=await temp(),old=await write(dir,'old.json','old'),fresh=path.join(dir,'new.json');
 await assert.rejects(withFileRollback([old,fresh],async()=>{await writeFile(old,'changed');await writeFile(fresh,'new');throw new Error('manifest failed');}),/manifest failed/);
 assert.equal(await readFile(old,'utf8'),'old');await assert.rejects(readFile(fresh));
});
test('explicit validation stage cannot pass with no output; generic proposed is not automatically S2',async()=>{
 const {validateRun}=await import('../validate-run.mjs');const dir=await temp();
 await write(dir,'run-manifest.json',{run_id:'R',mode:'CCR_INGEST',product:'p'});
 assert.ok((await validateRun(dir,{stages:['profile']})).errors.some(e=>e.problem.includes('missing output')));
 await write(dir,'candidate/product-kb/f.json',{artifact_type:'ProductKBCandidate',producer:'normalizer',status:'READY',payload:{kb_context:{feature_key:'f'},kb_candidates:[{kb_id:'KB-1',statement:'not shipped yet',knowledge_kind:'PROPOSED',confidence:'LOW',scope:{environment:'documented'}}]}});
 assert.deepEqual((await validateRun(dir,{stages:['kb']})).errors,[]);
});
test('apply CLI rejects extra object and empty scope before any canonical writes',async()=>{
 const dir=await temp();await write(dir,'run-manifest.json',{run_id:'R',product:'p',mode:'DOC_BOOTSTRAP'});
 const verdict={decision:'APPROVED',publish_allowed:true,gate_results:['C0','C1-DOC','C2-DOC','C3','C4','C5','C6'].map(gate=>({gate,status:'PASS'}))};
 await write(dir,'review/verdict.json',verdict);await write(dir,'candidate/publish-preview/a/kb.json',[]);await write(dir,'candidate/publish-preview/b/kb.json',[]);
 const script=new URL('../publish-apply.mjs',import.meta.url).pathname;
 await assert.rejects(promisify(execFile)(process.execPath,[script,'--run',dir,'--objects','a']),e=>e.stderr.includes('preview_object_scope_mismatch'));
 await assert.rejects(promisify(execFile)(process.execPath,[script,'--run',dir,'--objects',',']),e=>e.stderr.includes('invalid_or_empty_object_scope'));
});
test('strip CLI is repeatable and removes outputs deleted during rework',async()=>{
 const dir=await temp();await write(dir,'run-manifest.json',{run_id:'R',product:'p',mode:'CCR_INGEST',source:{proposal_id:'CBS-9'},object_target:{object_key:'o'}});
 const kb=(f,items)=>({artifact_type:'ProductKBCandidate',producer:'normalizer',status:'READY',payload:{kb_context:{object_id:'o',feature_key:f},kb_candidates:items}});
 await write(dir,'candidate/product-kb/f.json',kb('f',[item('KB-1','old'),item('KB-2','new')]));
 await write(dir,'candidate/product-kb/g.json',kb('g',[item('KB-3')]));
 await write(dir,'review/knowledge-diff.json',{change_details:[{resolution:'SUPERSEDE',object_id:'o',feature_key:'f',kb_id:'KB-1',candidate_kb_id:'KB-2'}]});
 const script=new URL('../publish-strip.mjs',import.meta.url).pathname;
 const run=()=>promisify(execFile)(process.execPath,[script,'--run',dir,'--date','2026-11-08']);
 await run();const log=path.join(dir,'candidate/publish-preview/o/CHANGELOG.md');const first=await readFile(log,'utf8');
 await run();assert.equal(await readFile(log,'utf8'),first);
 const {rm}=await import('node:fs/promises');await rm(path.join(dir,'candidate/product-kb/g.json'));await run();
 await assert.rejects(readFile(path.join(dir,'candidate/publish-preview/o/features/g/kb.json')));
});
test('checkout header-pair scanning detects actual values without returning them',()=>{
 const value='fixture'+'x'.repeat(30);
 const hits=secretFindings(JSON.stringify({name:'x-checkout-one-session-token',value}));
 assert.ok(hits.some(h=>h.kind==='checkout-header-pair'));assert.ok(!JSON.stringify(hits).includes(value));
});
test('independent processes cannot take over the same expired lock',async()=>{
 const dir=await temp();
 await acquireAll(['x'],{ctxRunId:'old',dir,now:1,ttlSeconds:1});
 const module=new URL('../../lib/locks.mjs',import.meta.url).href;
 const code=`import {acquireAll} from ${JSON.stringify(module)}; console.log(JSON.stringify(await acquireAll(['x'],{dir:process.argv[1],ctxRunId:process.argv[2]})));`;
 const results=await Promise.all(Array.from({length:6},(_,i)=>promisify(execFile)(process.execPath,['--input-type=module','-e',code,dir,`owner-${i}`])));
 assert.equal(results.map(r=>JSON.parse(r.stdout)).filter(r=>r.ok).length,1);
});
test('review seal also invalidates when an oracle base shard outside preview changes',async()=>{
 const dir=await temp(),project=await temp(),knowledge=await temp();
 await write(dir,'run-manifest.json',{run_id:'R',product:'p',mode:'DOC_BOOTSTRAP'});
 await write(dir,'candidate/publish-preview/o/kb.json',[]);
 await write(knowledge,'p/other/features/f/kb.json',[item('KB-1')]);
 await write(dir,'review/verdict.json',{decision:'APPROVED',publish_allowed:true,gate_results:['C0','C1-DOC','C2-DOC','C3','C4','C5','C6'].map(gate=>({gate,status:'PASS'}))});
 const options={projectRoot:project,knowledgeDir:knowledge};await startReview(dir,options);await sealReview(dir,options);
 await write(knowledge,'p/other/features/f/kb.json',[item('KB-1','changed')]);
 await assert.rejects(verifyReview(dir,options),/review_inputs_changed/);
});
test('release recovery finds a PR created before receipt persistence failed',async()=>{
 let created=0,stored=false,known=false;
 const record={branch:'publish/recover',tree:'TREE'};
 const io={run:async(...a)=>a[0]==='diff'?'':a[0]==='branch'?record.branch:'TREE',findPr:async()=>known?[{url:'https://example.test/pr/2',state:'OPEN'}]:[],createPr:async()=>{created++;known=true;return 'https://example.test/pr/2';},persist:async()=>{if(!stored){stored=true;throw new Error('disk failure');}}};
 await assert.rejects(recoverRelease(record,io),/disk failure/);
 const diskRecord={branch:record.branch,tree:record.tree};
 assert.equal(await recoverRelease(diskRecord,io),'https://example.test/pr/2');assert.equal(created,1);
});

test('KEEP_BOTH approval cannot accidentally supersede a base item',()=>{
 const files={f:{object:'o',featureKey:'f',items:[item('KB-1','old'),item('KB-2','new')]}};
 const r=applySupersedes({change_details:[{resolution:'SUPERSEDE',object_id:'o',feature_key:'f',kb_id:'KB-1',candidate_kb_id:'KB-2',requires_human_decision:true}]},files,{...opts,approvals:new Map([['KB-1',{decision:'KEEP_BOTH'}]])});
 assert.ok(r.problems.length);assert.equal(files.f.items.length,2);assert.equal(files.f.items[0].statement,'old');
});
