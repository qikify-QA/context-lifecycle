export const AUTHORITY_TYPES=['spec_doc','dev_doc','po_dev_confirm','test_case'];
export function validDate(value,{future=false}={}){
 if(typeof value!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(value))return false;
 const parsed=new Date(value+'T00:00:00Z');
 return !Number.isNaN(parsed.getTime())&&parsed.toISOString().slice(0,10)===value&&(future||value<=new Date().toISOString().slice(0,10));
}
export function validAuthority(item){
 const cs=item?.confirmation_source;
 return item?.knowledge_kind==='CONFIRMED_EXPECTED'&&!['UNRESOLVED','CONFLICTED','KNOWN_DEFECT'].includes(item.status)&&AUTHORITY_TYPES.includes(cs?.type)&&typeof cs.ref==='string'&&cs.ref.trim().length>0&&validDate(cs.authored_on)&&(cs.type!=='dev_doc'||['prose','code_artifact'].includes(cs.derivation));
}
export function oracleSummary(items){
 const confirmed=items.filter(i=>i.knowledge_kind==='CONFIRMED_EXPECTED');
 const valid=confirmed.filter(validAuthority),docs=valid.filter(i=>i.confirmation_source.type==='dev_doc');
 return {total:items.length,confirmed_expected:confirmed.length,confirmed_with_valid_source:valid.length,confirmed_from_dev_doc:docs.length,invalid_confirmed:confirmed.length-valid.length,usable_as_oracle:!valid.length?false:docs.length===valid.length?'DOC_ONLY':true};
}
