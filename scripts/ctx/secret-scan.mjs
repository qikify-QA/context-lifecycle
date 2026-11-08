#!/usr/bin/env node
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
import {readFile} from 'node:fs/promises';
import path from 'node:path';
import {parseArgs} from '../lib/fs-utils.mjs';
import {rootDir} from '../lib/run-layout.mjs';
import {secretFindings} from '../lib/secret-scan.mjs';
const git=async(...args)=>(await promisify(execFile)('git',args,{cwd:rootDir,maxBuffer:64*1024*1024})).stdout;
async function main(){
 const args=parseArgs(),findings=[];
 const base=typeof args.base==='string'?(await git('merge-base',args.base,'HEAD')).trim():null;
 const names=(await git(...(base?['diff','--name-only','--no-renames','-z',base,'HEAD']:['ls-files','-z']))).split('\0').filter(Boolean);
 for(const file of names){
  if(file==='knowledge')continue;
  const bytes=await readFile(path.join(rootDir,file)).catch(()=>null);if(!bytes||bytes.includes(0))continue;
  let previous='';if(base){try{previous=await git('show',`${base.trim()}:${file}`);}catch{/* added path */}}
  const options={envFile:file.endsWith('_env.example')};
  const known=new Map();for(const hit of secretFindings(previous,options))known.set(hit.fingerprint,(known.get(hit.fingerprint)??0)+1);
  for(const hit of secretFindings(bytes.toString('utf8'),options)){
   const count=known.get(hit.fingerprint)??0;
   if(base&&count){known.set(hit.fingerprint,count-1);continue;}
   findings.push({file,kind:hit.kind,line:hit.line});
  }
 }
 console.log(JSON.stringify({ok:!findings.length,scope:base?'new-or-changed-secrets':'all-tracked-content',findings},null,2));
 if(findings.length)process.exitCode=1;
}
main().catch(e=>{console.error(e.message);process.exitCode=1;});
