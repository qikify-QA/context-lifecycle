// Resumable release state machine; all I/O is injected so failure boundaries are testable.
export async function recoverRelease(record,{run,findPr,createPr,persist}){
 if(record.pr)return record.pr;
 if((await run('diff','--name-only')).trim())throw new Error('release_in_progress: finish current release before adding edits');
 let exists=true;try{await run('rev-parse','--verify',`refs/heads/${record.branch}`);}catch{exists=false;}
 if(!exists)await run('switch','-c',record.branch);
 else if((await run('branch','--show-current'))!==record.branch)await run('switch',record.branch);
 if((await run('write-tree'))!==record.tree)throw new Error('release_tree_changed');
 if((await run('rev-parse','HEAD^{tree}'))!==record.tree){
  await run('commit','-m',record.message);
 }
 await run('push','-u','origin',record.branch);
 const prs=await findPr(record.branch);
 if(prs.some(p=>p.state==='CLOSED'))throw new Error('release_pr_closed: operator decision required');
 const url=prs[0]?.url??await createPr(record);
 record.pr=url;await persist(record);
 return url;
}
