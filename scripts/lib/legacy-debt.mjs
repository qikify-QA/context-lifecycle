import {createHash} from 'node:crypto';
import {readFile} from 'node:fs/promises';
export function stableJson(value){return JSON.stringify(value,(_k,v)=>v&&typeof v==='object'&&!Array.isArray(v)?Object.fromEntries(Object.entries(v).sort(([a],[b])=>a.localeCompare(b))):v);}
export const itemHash=value=>createHash('sha256').update(stableJson(value)).digest('hex');
let cache;
export async function unchangedLegacySource(file,item){
 cache??=JSON.parse(await readFile(new URL('../../config/legacy-authority-debt.json',import.meta.url),'utf8'));
 return (cache.items??[]).some(entry=>entry.file===file&&entry.kb_id===item.kb_id&&entry.sha256===itemHash(item));
}
