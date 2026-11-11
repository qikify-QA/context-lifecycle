// Canonical reference: object/feature#KB-id (object/_object-level#KB-id).
// Legacy references are resolved in their own feature first; never flatten an object by ID.
export const canonicalKbRef=(object,feature,id)=>object==='_product-level'?`_product-level#${id}`:`${object}/${feature??'_object-level'}#${id}`;
export function kbIndex(shards){
 const index=new Map();
 for(const {object,feature,items} of shards)for(const item of items){
  const key=canonicalKbRef(object,feature,item.kb_id);
  if(index.has(key))throw new Error(`duplicate KB identity ${key}`);
  index.set(key,item);
 }
 return index;
}
export function resolveKbRef(ref,{object,feature,index,ancestors=[],field=''}){
 for(const owner of /\/also_affects\//.test(field)?ancestors:[]){
  const targetObject=owner.object_key??owner.object_id;
  if(typeof targetObject==='string'&&[...index.keys()].some(k=>k.startsWith(`${targetObject}/`))&&targetObject!==object){object=targetObject;feature=null;}
  if(typeof owner.feature_key==='string'&&[...index.keys()].some(k=>k.startsWith(`${object}/${owner.feature_key}#`)))feature=owner.feature_key;
 }
 if(typeof ref!=='string')throw new Error('KB reference must be a string');
 let id=ref,where=null;
 const hash=ref.lastIndexOf('#'),colon=ref.lastIndexOf(':');
 if(hash>=0){where=ref.slice(0,hash);id=ref.slice(hash+1);}
 else if(colon>=0){where=ref.slice(0,colon);id=ref.slice(colon+1);}
 if(where){
  let key;
  if(['_product-level','_product-kb','product'].includes(where))key=canonicalKbRef('_product-level',null,id);
  else if(where.includes('/'))key=`${where}#${id}`;
  else if(['_object-level','object','object-level','obj'].includes(where))key=canonicalKbRef(object,null,id);
  else if(where.startsWith('_object-level.'))key=canonicalKbRef(where.slice(14),null,id);
  else {
   const featureKey=canonicalKbRef(object,where,id),objectKey=canonicalKbRef(where,null,id);
   if(index.has(featureKey)&&index.has(objectKey)&&featureKey!==objectKey)throw new Error(`ambiguous legacy reference ${ref}`);
   key=index.has(featureKey)?featureKey:objectKey;
   if(!index.has(key)){
    const matches=[...index.keys()].filter(k=>k.endsWith(`/${where}#${id}`));
    if(matches.length>1)throw new Error(`ambiguous legacy reference ${ref}`);
    if(matches.length===1)key=matches[0];
   }
  }
  if(!index.has(key))throw new Error(`missing KB reference ${ref}`);
  return {key,item:index.get(key)};
 }
 for(const f of [feature??null,null]){
  const key=canonicalKbRef(object,f,id);if(index.has(key))return {key,item:index.get(key)};
 }
 const matches=[...index.keys()].filter(k=>k.startsWith(`${object}/`)&&k.endsWith(`#${id}`));
 if(!matches.length){const key=canonicalKbRef('_product-level',null,id);if(index.has(key))return {key,item:index.get(key)};}
 if(!matches.length){
  const namedObjects=new Set(ancestors.flatMap(owner=>[owner.object_key,owner.object_id]).filter(Boolean));
  const scoped=[...index.keys()].filter(k=>k.endsWith(`#${id}`)&&namedObjects.has(k.split('/')[0]));
  if(scoped.length===1)return {key:scoped[0],item:index.get(scoped[0])};
  const namedFeatures=new Set(ancestors.flatMap(owner=>[owner.from_feature_key,owner.to_feature_key]).filter(Boolean));
  const explicit=[...index.keys()].filter(k=>k.endsWith(`#${id}`)&&namedFeatures.has(k.split('/')[1]?.split('#')[0]));
  if(explicit.length===1)return {key:explicit[0],item:index.get(explicit[0])};
 }
 if(matches.length!==1)throw new Error(`${matches.length?'ambiguous':'missing'} KB reference ${ref}`);
 return {key:matches[0],item:index.get(matches[0])};
}
export function referenceFields(value,visit,trail='',ancestors=[]){
 if(Array.isArray(value)){value.forEach((v,i)=>referenceFields(v,visit,`${trail}/${i}`,ancestors));return;}
 if(!value||typeof value!=='object')return;
 for(const [key,v] of Object.entries(value)){
  if(['kb_refs','kb_ids','related_kb_ids','regression_watch_kb_ids','user_goal_kb_refs'].includes(key)&&Array.isArray(v))v.forEach((ref,i)=>visit(v,i,ref,`${trail}/${key}/${i}`,[...ancestors,value]));
  else referenceFields(v,visit,`${trail}/${key}`,[...ancestors,value]);
 }
}
