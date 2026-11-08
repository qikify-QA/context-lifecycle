import {readFile,readdir} from 'node:fs/promises';
import path from 'node:path';
import {walk,exists} from './fs-utils.mjs';
import {kbIndex,resolveKbRef,referenceFields} from './kb-references.mjs';
import {validAuthority} from './authority.mjs';
import {oraclePolicy} from './oracle-policy.mjs';
import {extractOpenQuestions} from './open-questions.mjs';
export async function bundleIntegrity(dir,{baseDir}={}){
 // A products/ root contains multiple isolated namespaces.
 if(!baseDir){
  const children=await readdir(dir,{withFileTypes:true});
  const products=[];for(const child of children)if(child.isDirectory()&&await exists(path.join(dir,child.name,'_registry.json')))products.push(child.name);
  if(products.length){const all=[];for(const product of products)for(const error of await bundleIntegrity(path.join(dir,product)))all.push({...error,file:path.join(product,error.file)});return all;}
 }
 const errors=[],overlay=new Map();
 for(const root of [baseDir,dir].filter(Boolean))for(const f of await walk(root))if(f.endsWith('.json')||path.basename(f)==='open-questions.md')overlay.set(path.relative(root,f),f);
 const shards=[];
 for(const [rel,file] of overlay){
  if(rel==='_product-kb.json'){
   try{const items=JSON.parse(await readFile(file,'utf8'));if(!Array.isArray(items))throw new Error();shards.push({object:'_product-level',feature:null,items});}
   catch{errors.push({file:rel,problem:'invalid product KB'});}continue;
  }
  const m=/^([^/]+)\/(?:features\/([^/]+)\/)?kb\.json$/.exec(rel);if(!m)continue;
  let items;try{items=JSON.parse(await readFile(file,'utf8'));}catch{errors.push({file:rel,problem:'invalid KB JSON'});continue;}
  if(!Array.isArray(items)){errors.push({file:rel,problem:'KB must be array'});continue;}
  shards.push({object:m[1],feature:m[2]??null,items});
 }
 let index;try{index=kbIndex(shards);}catch(e){return [...errors,{file:'.',problem:e.message}];}
 const resolve=(ref,object,feature,rel,ancestors=[],field='')=>{try{return resolveKbRef(ref,{object,feature,index,ancestors,field}).item;}catch(e){errors.push({file:rel,problem:e.message});return null;}};
 const oqs=new Set();
 for(const [rel,f] of overlay)if(path.basename(rel)==='open-questions.md')for(const q of extractOpenQuestions(await readFile(f,'utf8')))oqs.add(q.oq_id);
 for(const f of await walk(dir)){
  const rel=path.relative(dir,f),m=/^([^/]+)\/(?:features\/([^/]+)\/(kb|profile)\.json|checklists\/([^/]+)\.json|kb\.json)$/.exec(rel);if(!m)continue;
  const object=m[1],feature=m[2]??m[4]??null;
  let value;try{value=JSON.parse(await readFile(f,'utf8'));}catch{continue;}
  const checkPending=(node)=>{
   if(Array.isArray(node)){for(const item of node)checkPending(item);return;}
   if(!node||typeof node!=='object')return;
   for(const issue of node.reference_issues??[])if(!issue.oq_id||!oqs.has(issue.oq_id))errors.push({file:rel,problem:'quarantined reference must have a published open question'});
   for(const [key,child] of Object.entries(node))if(key!=='reference_issues')checkPending(child);
  };checkPending(value);
  referenceFields(value,(_a,_i,ref,field,ancestors)=>resolve(ref,object,feature,rel,ancestors,field));
  for(const ch of value?.checks??[]){
   const ids=ch.oracle?.kb_ids??[],items=ids.map(ref=>resolve(ref,object,feature,rel)).filter(Boolean);
   if(items.some(i=>i.status==='KNOWN_DEFECT'))errors.push({file:rel,problem:`${ch.check_id}: KNOWN_DEFECT cannot be oracle`});
   if(ch.oracle?.oracle_strength==='STRONG'){
    if(!ids.length||items.length!==ids.length||items.some(i=>!validAuthority(i)))errors.push({file:rel,problem:`${ch.check_id}: invalid STRONG oracle`});
    if(items.length&&((ch.priority==='P1'&&items.every(i=>i.confirmation_source?.type==='dev_doc'))||items.some(i=>i.confirmation_source?.type==='dev_doc'&&i.confirmation_source.derivation!=='prose')))errors.push({file:rel,problem:`${ch.check_id}: dev_doc oracle guard`});
   }
   const policy=oraclePolicy(items,{priority:ch.priority,complete:items.length===ids.length});
   if(ch.oracle?.oracle_strength==='BASELINE'&&policy.maximum==='NONE')errors.push({file:rel,problem:`${ch.check_id}: invalid BASELINE oracle`});
   if(policy.needsConfirmation&&ch.status!=='NEEDS_CONFIRMATION')errors.push({file:rel,problem:`${ch.check_id}: baseline requires confirmation`});
   if(ch.oracle?.oracle_strength==='NONE'&&(ch.status!=='NEEDS_CONFIRMATION'||ch.expected_result))errors.push({file:rel,problem:`${ch.check_id}: NONE oracle must have empty expected and NEEDS_CONFIRMATION`});
   if(ch.status==='NEEDS_CONFIRMATION'&&(!ch.oq_id||!oqs.has(ch.oq_id)))errors.push({file:rel,problem:`${ch.check_id}: missing published open question`});
  }
 }
 return errors;
}
