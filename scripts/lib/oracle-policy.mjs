import {validAuthority} from './authority.mjs';
// Maximum allowed strength, never a reason to upgrade an existing checklist.
export function oraclePolicy(items,{priority,complete=true}={}){
 if(!complete||!items.length||items.some(i=>['UNRESOLVED','CONFLICTED','KNOWN_DEFECT'].includes(i.status)))return {maximum:'NONE',reason:'missing_or_unresolved_oracle'};
 if(items.every(validAuthority)){
  if(items.some(i=>i.confirmation_source.type==='dev_doc'&&i.confirmation_source.derivation!=='prose'))return {maximum:'BASELINE',needsConfirmation:true,reason:'code_artifact_is_baseline'};
  if(priority==='P1'&&items.every(i=>i.confirmation_source.type==='dev_doc'))return {maximum:'BASELINE',needsConfirmation:true,reason:'P1_requires_independent_authority'};
  return {maximum:'STRONG'};
 }
 if(items.every(i=>validAuthority(i)||i.knowledge_kind==='OBSERVED_CURRENT'))return {maximum:'BASELINE',reason:'current_behavior_only'};
 return {maximum:'NONE',reason:'insufficient_authority'};
}
