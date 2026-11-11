#!/usr/bin/env node
import path from 'node:path';
import {parseArgs,readJson,exists} from '../lib/fs-utils.mjs';
import {resolveRunDir} from '../lib/run-layout.mjs';
import {reviewInputs,compareHashes,startReview,sealReview,digest} from '../lib/review-state.mjs';
import {readFile} from 'node:fs/promises';
export const hashRun=reviewInputs;
export const compare=compareHashes;
async function main(){
 const args=parseArgs();if(typeof args.run!=='string')throw new Error('Need --run');
 const dir=resolveRunDir(args.run);
 if(args.start===true)return console.log(JSON.stringify(await startReview(dir)));
 if(args.snapshot===true)return console.log(JSON.stringify(await sealReview(dir)));
 const f=path.join(dir,'review/reviewed-hashes.json');
 if(!await exists(f))return console.log(JSON.stringify({full:true,reason:'no_snapshot'}));
 const snap=await readJson(f);
 if(snap.schema_version!==2)return console.log(JSON.stringify({full:true,reason:'legacy_snapshot'}));
 const previous=await readFile(path.join(dir,snap.verdict)).catch(()=>null);
 if(!previous||digest(JSON.stringify(JSON.parse(previous)))!==digest(JSON.stringify(JSON.parse(await readFile(path.join(dir,'review/verdict.json'))))))return console.log(JSON.stringify({full:true,reason:'baseline_verdict_mismatch'}));
 const delta=compareHashes(snap.files,await reviewInputs(dir));
 const all=[...delta.changed,...delta.added,...delta.removed];
 delta.full=all.some(k=>k==='run-manifest.json'||k.startsWith('@')||k.startsWith('raw/')||k==='input/ccr-fastpath-plan.json');
 delta.previous_verdict=snap.verdict;delta.previous_round=snap.round;
 console.log(JSON.stringify(delta,null,2));
}
if(import.meta.url===`file://${process.argv[1]}`)main().catch(e=>{console.error(e.message);process.exitCode=1;});
