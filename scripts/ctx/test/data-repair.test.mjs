import {test} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,mkdir,readFile,writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {repairProduct,prepareRepair} from '../repair-knowledge.mjs';
import {applyDataMaintenance} from '../publish-apply.mjs';
import {kbIndex,resolveKbRef,referenceFields} from '../../lib/kb-references.mjs';
import {secretFindings} from '../../lib/secret-scan.mjs';
import {oraclePolicy} from '../../lib/oracle-policy.mjs';
import {auditDir} from '../audit-preview.mjs';
import {walk} from '../../lib/fs-utils.mjs';
const date='2026-11-08';
const tmp=()=>mkdtemp(path.join(tmpdir(),'data-repair-test-'));
const write=async(root,rel,v)=>{const file=path.join(root,rel);await mkdir(path.dirname(file),{recursive:true});await writeFile(file,typeof v==='string'?v:JSON.stringify(v));};
const fact=(id,extra={})=>({kb_id:id,statement:'existing statement',knowledge_kind:'CONFIRMED_EXPECTED',confidence:'HIGH',scope:{environment:'documented'},confirmation_source:{type:'spec_doc',ref:'Spec v1 section 1',authored_on:'2026-01-01'},...extra});
async function fixture(root){
 await write(root,'_registry.json',{objects:[{object_key:'o'}]});
 await write(root,'_product-kb.json',[fact('KB-P-1')]);
 await write(root,'o/kb.json',[]);await write(root,'o/publish-meta.json',{published_context_version:'1',published_at:'2026-01-01'});
 await write(root,'o/feature-summary.md','# o\n**Published context version:** 1\n');
 await write(root,'o/CHANGELOG.md','# CHANGELOG\n');
 await write(root,'o/features/f/kb.json',[fact('KB-1',{confirmation_source:undefined}),fact('KB-2',{status:'KNOWN_DEFECT'}),fact('KB-3',{confirmation_source:{type:'dev_doc',ref:'Dev doc v1 section 2',authored_on:'2026-01-01',derivation:'code_artifact'}})]);
 await write(root,'o/features/f/profile.json',{feature_key:'f',capabilities:[{kb_refs:['KB-P-1','KB-1','KB-NOT-FOUND']} ]});
 await write(root,'o/checklists/f.json',{checks:[{check_id:'CHK-1',title:'unconfirmed behavior',oracle:{kb_ids:['KB-1'],oracle_strength:'STRONG'},status:'READY',expected_result:'an unsupported result',priority:'P2'},{check_id:'CHK-2',title:'watch defect',oracle:{kb_ids:['KB-2'],oracle_strength:'BASELINE'},status:'READY',expected_result:'known defect behavior',priority:'P2'},{check_id:'CHK-3',title:'source code rule',oracle:{kb_ids:['KB-3'],oracle_strength:'STRONG'},status:'READY',expected_result:'current implementation',priority:'P2'}]});
}
test('legacy/product/cross-object references resolve without flattening duplicate IDs',()=>{
 const index=kbIndex([{object:'a',feature:'f',items:[fact('KB-1')]},{object:'b',feature:'g',items:[fact('KB-1')]},{object:'b',feature:null,items:[fact('KB-O-1')]},{object:'_product-level',feature:null,items:[fact('KB-P-1')]}]);
 assert.equal(resolveKbRef('KB-P-1',{object:'a',feature:'f',index}).key,'_product-level#KB-P-1');
 assert.equal(resolveKbRef('g#KB-1',{object:'a',feature:'f',index}).key,'b/g#KB-1');
 assert.equal(resolveKbRef('obj:KB-O-1',{object:'b',feature:'g',index}).key,'b/_object-level#KB-O-1');
 const data={also_affects:[{object_id:'b',kb_ids:['KB-1']}],dependencies:[{object_key:'b',kb_refs:['KB-1']}]};const keys=[];
 referenceFields(data,(_a,_i,ref,field,ancestors)=>keys.push(resolveKbRef(ref,{object:'a',feature:'f',index,field,ancestors}).key));
 assert.deepEqual(keys,['b/g#KB-1','a/f#KB-1']);
});
test('scanner permits empty envs, prose and documented placeholders; still blocks real assignments',()=>{
 for(const text of [['AUTH_TOKEN',''].join('=')+'\n# setup\n'+['ANOTHER_KEY',''].join('=')+'\n','Header Authorization: Bearer YOUR_API_KEY','/forgot-password: Forgot your password?','password: về /login','TIB_FULL_ACCESS_TOKEN: đọc được dữ liệu','Storefront password: `TIB_STOREFRONT_PW`.'])assert.deepEqual(secretFindings(text),[],text);
 for(const value of ['realFixture'+'A'.repeat(25),'về'])assert.ok(secretFindings(JSON.stringify({['pass'+'word']:value})).length);
 assert.ok(secretFindings(['AUTH_TOKEN','UPPERCASEFIXTURE12345'].join('=')).length);
});
test('oracle policy rejects conflicts/defects and requires confirmation for code/P1 dev docs',()=>{
 assert.equal(oraclePolicy([fact('KB-1',{status:'CONFLICTED'})]).maximum,'NONE');
 assert.equal(oraclePolicy([fact('KB-1',{status:'KNOWN_DEFECT'})]).maximum,'NONE');
 const doc=fact('KB-1',{confirmation_source:{type:'dev_doc',ref:'Doc v1 section 1',authored_on:'2026-01-01',derivation:'prose'}});
 assert.equal(oraclePolicy([doc],{priority:'P1'}).maximum,'BASELINE');
 assert.equal(oraclePolicy([doc,fact('KB-2')],{priority:'P1'}).maximum,'STRONG');
});
test('repair preserves statements/guidance, quarantines broken links, fixes authority, version and OQs idempotently',async()=>{
 const root=await tmp();await fixture(root);const first=await repairProduct(root,{date});
 assert.ok(first.events.some(e=>e.kind==='authority_downgraded'));assert.equal((await auditDir(root)).ok,true);
 const kb=JSON.parse(await readFile(path.join(root,'o/features/f/kb.json')));assert.equal(kb[0].statement,'existing statement');assert.equal(kb[0].knowledge_kind,'INFERRED');
 const cl=JSON.parse(await readFile(path.join(root,'o/checklists/f.json')));assert.equal(cl.checks[0].expected_result,'');assert.equal(cl.checks[0].observation_guidance,'an unsupported result');assert.equal(cl.checks[1].oracle.oracle_strength,'NONE');assert.deepEqual(cl.checks[1].regression_watch_kb_ids,['o/f#KB-2']);assert.equal(cl.checks[2].oracle.oracle_strength,'BASELINE');assert.ok(cl.checks.every(c=>c.oq_id&&c.status==='NEEDS_CONFIRMATION'));
 const profile=JSON.parse(await readFile(path.join(root,'o/features/f/profile.json')));assert.equal(profile.context_status,'NEEDS_CONFIRMATION');assert.equal(profile.reference_issues[0].ref,'KB-NOT-FOUND');
 const before=new Map();for(const f of await walk(root))before.set(f,await readFile(f,'utf8'));
 assert.deepEqual((await repairProduct(root,{date})).events,[]);for(const f of await walk(root))assert.equal(await readFile(f,'utf8'),before.get(f));
 assert.equal(JSON.parse(await readFile(path.join(root,'o/publish-meta.json'))).published_context_version,'2');
});
test('maintenance refuses a changed base and rolls all files back if manifest regeneration fails',async()=>{
 const root=await tmp();await fixture(path.join(root,'products/p'));await write(root,'manifest.json','original manifest');
 const plan=await prepareRepair({knowledgeDir:root,date});assert.equal(plan.summary.audit.ok,true);
 const opts={targetDir:root,lockDir:path.join(await tmp(),'locks'),regenerate:async()=>{await write(root,'manifest.json','bad partial manifest');throw new Error('generation failed');}};
 const before=await readFile(path.join(root,'products/p/o/features/f/kb.json'),'utf8');
 await assert.rejects(applyDataMaintenance(plan,opts),/generation failed/);
 assert.equal(await readFile(path.join(root,'products/p/o/features/f/kb.json'),'utf8'),before);assert.equal(await readFile(path.join(root,'manifest.json'),'utf8'),'original manifest');
 await write(root,'products/p/o/kb.json',[fact('KB-new')]);await assert.rejects(applyDataMaintenance(plan,opts),/maintenance_base_changed/);
});
test('valid open questions from another object are accepted within the same product',async()=>{
 const root=await tmp();await write(root,'_product-kb.json',[]);await write(root,'o/kb.json',[]);await write(root,'o/checklists/f.json',{checks:[{check_id:'CHK-1',oracle:{kb_ids:[],oracle_strength:'NONE'},status:'NEEDS_CONFIRMATION',expected_result:'',oq_id:'OQ-other-001'}]});await write(root,'other/open-questions.md','```json\n{"oq_id":"OQ-other-001","type":"NEEDS_CONFIRMATION","summary":"question"}\n```');
 assert.equal((await auditDir(root)).ok,true);
});
test('maintenance preservation guard refuses rewritten facts, sources or discarded expected guidance',async()=>{
 const {validateMaintenanceChanges}=await import('../../lib/data-maintenance.mjs');
 for(const field of ['statement','kb_id','scope','confirmation_source']){
  const before=[fact('KB-1')],after=structuredClone(before);after[0][field]='changed';
  assert.throws(()=>validateMaintenanceChanges([{rel:'products/p/o/kb.json',before:JSON.stringify(before),after:JSON.stringify(after)}]),/maintenance_preservation_failed/);
 }
 const before={checks:[{check_id:'CHK-1',expected_result:'must preserve'}]},after={checks:[{check_id:'CHK-1',expected_result:'',oracle:{oracle_strength:'NONE'}}]};
 assert.throws(()=>validateMaintenanceChanges([{rel:'products/p/o/checklists/f.json',before:JSON.stringify(before),after:JSON.stringify(after)}]),/original expected text lost/);
});

test('published product KB filename is self-contained, while candidate filename remains forbidden',async()=>{
 const root=await tmp();await write(root,'_product-guide.md','Đọc `_product-kb.json` trước.');
 const good=await auditDir(root);assert.equal(good.ok,true);assert.deepEqual(good.warnings,[]);
 await write(root,'_product-guide.md','Đọc `product-kb.json` trước.');assert.ok((await auditDir(root)).warnings.some(w=>w.audit==='zero-run-reference'));
});
