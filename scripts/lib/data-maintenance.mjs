import path from 'node:path';
import {isDeepStrictEqual} from 'node:util';
// Maintenance must not rewrite product behavior, test steps, identities or sources.
export function validateMaintenanceChanges(changes){
 const errors=[];
 for(const {rel,before,after} of changes){
  if(!rel.endsWith('.json')||before===null)continue;
  const old=JSON.parse(before),next=JSON.parse(after);
  if(path.basename(rel)==='kb.json'||path.basename(rel)==='_product-kb.json'){
   if(!Array.isArray(old)||!Array.isArray(next)||old.length!==next.length){errors.push(rel+': KB item count changed');continue;}
   for(let i=0;i<old.length;i++)for(const field of ['kb_id','statement','confirmation_source','scope','status','conflict_group'])if(!isDeepStrictEqual(old[i][field],next[i][field]))errors.push(`${rel}: KB ${field} changed`);
  }
  if(rel.includes('/checklists/')&&Array.isArray(old.checks)){
   if(!Array.isArray(next.checks)||old.checks.length!==next.checks.length){errors.push(rel+': check count changed');continue;}
   for(let i=0;i<old.checks.length;i++){
    const b=old.checks[i],a=next.checks[i];
    for(const field of ['check_id','title','steps','precondition','applicability','priority'])if(!isDeepStrictEqual(b[field],a[field]))errors.push(`${rel}: check ${field} changed`);
    if(b.expected_result!==a.expected_result&&!(a.expected_result===''&&a.oracle?.oracle_strength==='NONE'&&a.observation_guidance?.includes(b.expected_result)))errors.push(`${rel}: original expected text lost`);
   }
  }
 }
 if(errors.length)throw new Error('maintenance_preservation_failed: '+errors.join('; '));
 return {ok:true};
}
