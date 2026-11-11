#!/usr/bin/env node
// Durable idempotency marker for claim-less CCR edits. No automatic takeover of a crashed claim.
import {randomUUID} from 'node:crypto';
import {mkdir,open,readFile} from 'node:fs/promises';
import path from 'node:path';
import {parseArgs,writeJson} from '../lib/fs-utils.mjs';
import {rootDir} from '../lib/run-layout.mjs';
export async function claimProposal(dir,product,proposal){
 if(!/^[a-z0-9-]+$/.test(product)||!/^CBS-\d+$/.test(proposal))throw new Error('invalid proposal scope');
 await mkdir(dir,{recursive:true});const file=path.join(dir,`${product}-${proposal}.json`);
 let handle;try{handle=await open(file,'wx');}catch(e){
  if(e.code!=='EEXIST')throw e;
  let existing;try{existing=JSON.parse(await readFile(file,'utf8'));}catch{existing={status:'incomplete_claim'};}
  return {ok:false,already_claimed:true,...existing};
 }
 const record={product,proposal,claim_id:randomUUID(),status:'in-progress',started_at:new Date().toISOString()};
 try{await handle.writeFile(JSON.stringify(record,null,2)+'\n');}finally{await handle.close();}
 return {ok:true,...record};
}
async function main(){
 const a=parseArgs(),dir=path.join(rootDir,'runs','proposal-claims');
 if(a._[0]==='acquire'){const result=await claimProposal(dir,a.product,a.proposal);console.log(JSON.stringify(result));if(!result.ok)process.exitCode=3;return;}
 if(a._[0]!=='finish'||typeof a['claim-id']!=='string')throw new Error('Use acquire|finish --product --proposal [--claim-id --files]');
 if(!/^[a-z0-9-]+$/.test(a.product)||!/^CBS-\d+$/.test(a.proposal))throw new Error('invalid proposal scope');
 const file=path.join(dir,`${a.product}-${a.proposal}.json`),record=JSON.parse(await readFile(file,'utf8'));
 if(record.claim_id!==a['claim-id'])throw new Error('claim ownership mismatch');
 const files=typeof a.files==='string'?a.files.split(',').filter(Boolean):[];
 if(files.some(f=>path.isAbsolute(f)||f.split(/[\\/]/).includes('..')))throw new Error('invalid file receipt');
 await writeJson(file,{...record,status:'done',files,finished_at:new Date().toISOString()});console.log(JSON.stringify({ok:true,proposal:a.proposal,files}));
}
if(import.meta.url===`file://${process.argv[1]}`)main().catch(e=>{console.error(e.message);process.exitCode=1;});
