#!/usr/bin/env node
// Index JSON by pointer, ID, shape, size. Does not echo full artifacts.
import { readFile, mkdir, realpath } from 'node:fs/promises';
import path from 'node:path';
import { parseArgs, writeJson } from '../lib/fs-utils.mjs';
import { rootDir, resolveRunDir } from '../lib/run-layout.mjs';
import { contentHash } from '../lib/context-routing.mjs';
const escapePointer = key => String(key).replace(/~/g,'~0').replace(/\//g,'~1');
export function indexJson(value, pointer = '', entries = []) {
  if (!value || typeof value !== 'object') return entries;
  const id = ['kb_id','check_id','feature_key','claim_id','change_id','finding_id','act_id','dsec_id'].find(key => typeof value[key] === 'string');
  if (!pointer || id || Array.isArray(value)) {
    entries.push({pointer,id:id ? value[id] : null,type:Array.isArray(value)?'array':'object',count:Array.isArray(value)?value.length:Object.keys(value).length,bytes:Buffer.byteLength(JSON.stringify(value)),label: typeof value.title === 'string' ? value.title.slice(0,100) : null});
  }
  for (const [key,item] of Object.entries(value)) if (item && typeof item === 'object') indexJson(item,`${pointer}/${escapePointer(key)}`,entries);
  return entries;
}
export function readPointer(value, pointer) {
  if (pointer === '') return value;
  if (!pointer.startsWith('/')) throw new Error('JSON Pointer must start with /');
  for (const key of pointer.slice(1).split('/').map(k=>k.replace(/~1/g,'/').replace(/~0/g,'~'))) {
    if (!value || typeof value !== 'object' || !Object.hasOwn(value,key)) throw new Error(`Pointer not found: ${pointer}`);
    value = value[key];
  }
  return value;
}
export async function indexArtifact(runDir,file) {
  const text = await readFile(file,'utf8');
  const hash = contentHash(text), entries = indexJson(JSON.parse(text));
  const dir = path.join(runDir,'input','artifact-index',hash.slice(0,24));
  await mkdir(dir,{recursive:true});
  const pages = [];
  for (let start=0; start<entries.length; start+=80) {
    const rel = `page-${String(pages.length+1).padStart(3,'0')}.json`;
    await writeJson(path.join(dir,rel),entries.slice(start,start+80)); pages.push(rel);
  }
  await writeJson(path.join(dir,'index.json'),{source:file,sha256:hash,entries:entries.length,pages});
  return {ok:true,index:path.join(dir,'index.json'),entries:entries.length,pages:pages.length,source_sha256:hash};
}
async function main() {
  const args = parseArgs();
  if (typeof args.run !== 'string' || typeof args.file !== 'string') throw new Error('Need --run --file <workspace-relative JSON>');
  const dir = resolveRunDir(args.run), file = await realpath(path.resolve(rootDir,args.file));
  const workspace = await realpath(rootDir);
  if (!file.startsWith(workspace+path.sep) || path.extname(file)!=='.json') throw new Error('Source must be workspace JSON');
  if (typeof args.pointer === 'string') {
    const text = await readFile(file,'utf8');
    if (args.sha256 && contentHash(text)!==args.sha256) throw new Error('Source changed: regenerate index');
    const output = JSON.stringify({source:file,sha256:contentHash(text),pointer:args.pointer,value:readPointer(JSON.parse(text),args.pointer)});
    const limit = args['max-bytes'] === undefined ? 12000 : Number(args['max-bytes']);
    if (!Number.isInteger(limit) || limit<1 || limit>20000) throw new Error('max-bytes must be 1..20000');
    if (Buffer.byteLength(output)>limit) throw new Error('Selection too large; use a narrower pointer');
    console.log(output);
  } else console.log(JSON.stringify(await indexArtifact(dir,file)));
}
if (import.meta.url === `file://${process.argv[1]}`) main().catch(e=>{console.error(e.message);process.exitCode=1;});
