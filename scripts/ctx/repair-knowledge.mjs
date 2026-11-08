#!/usr/bin/env node
// Explicit operator-authorized maintenance. Dry-run by default, no authority invented.
import {mkdtemp,cp,readFile,writeFile,mkdir} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {isDeepStrictEqual} from 'node:util';
import {walk,parseArgs,writeJson,today} from '../lib/fs-utils.mjs';
import {rootDir} from '../lib/run-layout.mjs';
import {kbIndex,resolveKbRef,referenceFields,canonicalKbRef} from '../lib/kb-references.mjs';
import {extractOpenQuestions} from '../lib/open-questions.mjs';
import {oraclePolicy} from '../lib/oracle-policy.mjs';
import {validateMaintenanceChanges} from '../lib/data-maintenance.mjs';
import {auditDir} from './audit-preview.mjs';
import {applyDataMaintenance} from './publish-apply.mjs';
import {digest} from '../lib/review-state.mjs';
const normalize=s=>String(s??'').replace(/\s+/g,' ').trim();
const rank={NONE:0,BASELINE:1,STRONG:2};
export async function repairProduct(productDir,{date=today(),product=path.basename(productDir)}={}){
 const originals=new Map(),json=new Map(),texts=new Map(),events=[];
 for(const f of await walk(productDir)){
  const rel=path.relative(productDir,f),text=await readFile(f,'utf8');originals.set(rel,text);
  if(rel.endsWith('.json'))json.set(rel,JSON.parse(text));else texts.set(rel,text);
 }
 const record=(kind,file,details={})=>events.push({product,kind,file,...details});
 // Known malformed legacy JSON: four unescaped document-title quotes, no semantic edit.
 for(const [rel,text] of texts)if(path.basename(rel)==='open-questions.md'){
  let fixed=text.replace(/```json\s*\n([\s\S]*?)```/g,(full,body)=>{
   try{JSON.parse(body);return full;}catch{
    const repaired=body.replace(/(?<!\\)"portal-fonts"/g,'\\"portal-fonts\\"');
    JSON.parse(repaired);record('oq_json_repaired',rel);return full.replace(body,repaired);
   }
  });texts.set(rel,fixed);
 }
 const oqByObject=new Map(),allOqs=new Set();
 for(const [rel,text] of texts)if(path.basename(rel)==='open-questions.md'){
  const object=rel.split(path.sep)[0],items=extractOpenQuestions(text);oqByObject.set(object,items);for(const q of items)allOqs.add(q.oq_id);
 }
 const question=(object,feature,summary)=>{
  const items=oqByObject.get(object)??[];oqByObject.set(object,items);
  const found=items.find(q=>normalize(q.summary)===normalize(summary));if(found)return found.oq_id;
  const prefix=`OQ-${object}-`,numbers=items.filter(q=>q.oq_id?.startsWith(prefix)).map(q=>Number(q.oq_id.slice(prefix.length))).filter(Number.isFinite);
  const id=prefix+String(Math.max(0,...numbers)+1).padStart(3,'0');
  const q={oq_id:id,type:'NEEDS_CONFIRMATION',feature_id:feature??null,summary};items.push(q);allOqs.add(id);
  const rel=`${object}/open-questions.md`,text=texts.get(rel)??`# Open questions — ${object}\n`;
  texts.set(rel,text.trimEnd()+`\n\n\`\`\`json\n${JSON.stringify(q)}\n\`\`\`\n`);record('oq_created',rel,{oq_id:id});return id;
 };
 const shards=[];
 for(const [rel,items] of json){const m=/^([^/]+)\/(?:features\/([^/]+)\/)?kb\.json$/.exec(rel);if(m)shards.push({object:m[1],feature:m[2]??null,items});else if(rel==='_product-kb.json')shards.push({object:'_product-level',feature:null,items});}
 // Do not pretend these are runtime observations when provenance has been stripped.
 for(const shard of shards)for(const item of shard.items)if(item.knowledge_kind==='CONFIRMED_EXPECTED'&&!item.confirmation_source){
  item.knowledge_kind='INFERRED';item.confidence='LOW';
  const rel=shard.object==='_product-level'?'_product-kb.json':shard.feature?`${shard.object}/features/${shard.feature}/kb.json`:`${shard.object}/kb.json`;
  const oq_id=question(shard.object,shard.feature,`Cần nguồn thẩm quyền để xác nhận ${canonicalKbRef(shard.object,shard.feature,item.kb_id)}. Nhãn confirmed legacy thiếu nguồn đã được hạ xuống INFERRED; chưa đủ bằng chứng để coi là requirement hoặc quan sát runtime.`);
  item.reference_issues=[...(item.reference_issues??[]),{reason:'missing_authority',oq_id}];record('authority_downgraded',rel,{kb_id:item.kb_id,oq_id});
 }
 const index=kbIndex(shards);
 const resolve=(ref,object,feature,ancestors=[],field='')=>{
  try{return resolveKbRef(ref,{object,feature,index,ancestors,field});}catch(error){
   // Migration can qualify a bare cross-object ID only when globally unique.
   if(typeof ref!=='string'||/[#:/]/.test(ref))throw error;
   const candidates=[...index].filter(([key])=>key.endsWith(`#${ref}`));
   if(candidates.length!==1)throw error;
   return {key:candidates[0][0],item:candidates[0][1]};
  }
 };
 function repairRefs(value,object,feature,rel){
  const removals=new Map(),issues=[];
  referenceFields(value,(array,i,ref,field,ancestors)=>{
   try{const target=resolve(ref,object,feature,ancestors,field);if(ref!==target.key){array[i]=target.key;record('reference_qualified',rel,{from:ref,to:target.key});}}
   catch(error){if(!removals.has(array))removals.set(array,new Set());removals.get(array).add(i);issues.push({ref,field,reason:error.message.startsWith('ambiguous')?'ambiguous_reference':'unresolved_reference'});}
  });
  for(const [array,positions] of removals){const keep=array.filter((_v,i)=>!positions.has(i));array.splice(0,array.length,...keep);}
  if(issues.length){
   const oq_id=question(object,feature,`Cần xác định KB đích cho các reference của ${feature??object}: ${[...new Set(issues.map(i=>i.ref))].join(', ')}. Chưa có đích duy nhất; các ref được tách khỏi liên kết đang hoạt động, không dùng chúng làm căn cứ kết luận.`);
   value.reference_issues=[...(value.reference_issues??[]),...issues.map(issue=>({...issue,oq_id}))];
   for(const issue of issues)record('reference_quarantined',rel,{...issue,oq_id});
  }
 }
 for(const [rel,value] of json){
  if(rel==='_product-kb.json'){for(const item of value)repairRefs(item,'_product-level',null,rel);continue;}
  const m=/^([^/]+)\/(?:features\/([^/]+)\/(kb|profile)\.json|checklists\/([^/]+)\.json|kb\.json)$/.exec(rel);if(!m)continue;
  const object=m[1],feature=m[2]??m[4]??null;
  if(Array.isArray(value)){for(const item of value)repairRefs(item,object,feature,rel);continue;}
  if(!Array.isArray(value.checks)){repairRefs(value,object,feature,rel);if(value.reference_issues?.length)value.context_status='NEEDS_CONFIRMATION';continue;}
  for(const check of value.checks){
   const before=structuredClone(check),oldIds=[...(check.oracle?.kb_ids??[])];repairRefs(check,object,feature,rel);
   check.oracle??={kb_ids:[],oracle_strength:'NONE'};const ids=check.oracle.kb_ids??[];
   const pairs=ids.map(id=>resolve(id,object,feature));
   const defects=pairs.filter(p=>p.item.status==='KNOWN_DEFECT');
   if(defects.length){check.regression_watch_kb_ids=[...new Set([...(check.regression_watch_kb_ids??[]),...defects.map(p=>p.key)])];check.oracle.kb_ids=ids.filter(id=>!defects.some(p=>p.key===id));record('defect_removed_from_oracle',rel,{check_id:check.check_id});}
   const actual=check.oracle.kb_ids.map(id=>resolve(id,object,feature).item);
   const complete=oldIds.length===ids.length&&!defects.length;
   const policy=oraclePolicy(actual,{priority:check.priority,complete});
   const strength=rank[check.oracle.oracle_strength]<=rank[policy.maximum]?check.oracle.oracle_strength:policy.maximum;
   if(strength!==check.oracle.oracle_strength){record('oracle_downgraded',rel,{check_id:check.check_id,from:check.oracle.oracle_strength,to:strength});check.oracle.oracle_strength=strength;}
   if(strength==='NONE'){
    check.status='NEEDS_CONFIRMATION';
    if(check.expected_result){check.observation_guidance=[check.observation_guidance,check.expected_result].filter(Boolean).filter((s,i,a)=>a.indexOf(s)===i).join('\n');check.expected_result='';record('expected_moved_to_guidance',rel,{check_id:check.check_id});}
   }else if(policy.needsConfirmation){check.status='NEEDS_CONFIRMATION';check.expected_result_basis='BASELINE_NOT_REQUIREMENT';}
   if(check.reference_issues?.length)check.status='NEEDS_CONFIRMATION';
   if(check.status==='NEEDS_CONFIRMATION'&&(!check.oq_id||!allOqs.has(check.oq_id))){
    const summary=normalize(check.open_question_draft)||`Cần xác nhận expected behavior và nguồn cho check ${check.check_id} “${check.title??feature}” của feature ${feature}. ${policy.reason??'Nguồn hiện có chưa đủ để chốt requirement.'}`;
    check.oq_id=question(object,feature,summary);record('check_oq_linked',rel,{check_id:check.check_id,oq_id:check.oq_id});
   }
   if(!isDeepStrictEqual(before,check))record('check_repaired',rel,{check_id:check.check_id});
  }
 }
 const changedObjects=new Set(),lastUpdated={date,ccr_ref:`maintenance-${date}`};
 for(const [rel,value] of json){const prior=JSON.parse(originals.get(rel));if(!isDeepStrictEqual(value,prior)){
  const object=rel.split(path.sep)[0];if(!object.startsWith('_'))changedObjects.add(object);
  if(Array.isArray(value)){for(let i=0;i<value.length;i++)if(!isDeepStrictEqual(value[i],prior[i]))value[i].last_updated=lastUpdated;}
  else if(!rel.startsWith('_'))value.last_updated=lastUpdated;
  await writeJson(path.join(productDir,rel),value);
 }}
 for(const [rel,text] of texts)if(text!==originals.get(rel)){await mkdir(path.dirname(path.join(productDir,rel)),{recursive:true});await writeFile(path.join(productDir,rel),text);const object=rel.split(path.sep)[0];if(!object.startsWith('_'))changedObjects.add(object);}
 for(const object of changedObjects){
  const metaRel=`${object}/publish-meta.json`,meta=JSON.parse(originals.get(metaRel));meta.published_context_version=String(Number(meta.published_context_version)+1);meta.published_at=date;await writeJson(path.join(productDir,metaRel),meta);
  const summaryRel=`${object}/feature-summary.md`,summary=originals.get(summaryRel);if(!summary)throw new Error('missing feature summary: '+summaryRel);
  const lines=summary.split('\n');lines[1]=`**Published context version:** ${meta.published_context_version}`;await writeFile(path.join(productDir,summaryRel),lines.join('\n'));
  const logRel=`${object}/CHANGELOG.md`,log=texts.get(logRel)??`# CHANGELOG — ${object}\n`;
  await writeFile(path.join(productDir,logRel),log.trimEnd()+`\n- ${date} (maintenance-${date}) — Chuẩn hoá reference theo namespace; sửa OQ và phân loại oracle/expected theo nguồn hiện có. Không xác nhận thêm requirement hoặc thay đổi hành vi sản phẩm.\n`);
 }
 return {events,objects:[...changedObjects].sort()};
}
export async function prepareRepair({knowledgeDir=path.join(rootDir,'knowledge'),date=today()}={}){
 const baseline={};for(const f of await walk(path.join(knowledgeDir,'products')))baseline[path.relative(knowledgeDir,f)]=digest(await readFile(f));
 const temp=await mkdtemp(path.join(tmpdir(),'ctx-data-repair-')),preview=path.join(temp,'products');await cp(path.join(knowledgeDir,'products'),preview,{recursive:true});
 const events=[],objects=[];
 const {readdir}=await import('node:fs/promises');
 for(const child of await readdir(preview,{withFileTypes:true}))if(child.isDirectory()){
  const result=await repairProduct(path.join(preview,child.name),{date,product:child.name});events.push(...result.events);objects.push(...result.objects.map(object=>({product:child.name,object})));
 }
 const changes=[];
 for(const f of await walk(preview)){const rel=path.join('products',path.relative(preview,f)),after=await readFile(f);let before=null;try{before=await readFile(path.join(knowledgeDir,rel));}catch(e){if(e.code!=='ENOENT')throw e;}if(!before||!before.equals(after))changes.push({rel,before,after});}
 validateMaintenanceChanges(changes);
 const audit=await auditDir(preview);const summary={date,preview,changed_files:changes.length,objects:objects.length,event_counts:{},events,audit};for(const e of events)summary.event_counts[e.kind]=(summary.event_counts[e.kind]??0)+1;
 await writeJson(path.join(temp,'report.json'),summary);
 return {temp,preview,changes,summary,objects,baseline};
}
async function main(){
 const args=parseArgs(),plan=await prepareRepair();
 console.log(JSON.stringify({preview:plan.preview,report:path.join(plan.temp,'report.json'),changed_files:plan.changes.length,event_counts:plan.summary.event_counts,audit_ok:plan.summary.audit.ok,blocking:plan.summary.audit.blocking.length,warnings:plan.summary.audit.warnings.length},null,2));
 if(!plan.summary.audit.ok){process.exitCode=1;return;}
 if(args.apply===true){await applyDataMaintenance(plan);console.log(JSON.stringify({applied:true,backup:path.join(plan.temp,'backup')}));}
}
if(import.meta.url===`file://${process.argv[1]}`)main().catch(e=>{console.error(e.message);process.exitCode=1;});
