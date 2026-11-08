import { createHash } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
export const contentHash = text => createHash('sha256').update(text).digest('hex');

// Split at paragraph boundaries outside fences; a code fence remains intact.
export function splitRuleText(text, maxBytes = 10000) {
  const blocks = []; let block = [], fence = null;
  for (const line of text.split('\n')) {
    const marker = /^\s*(`{3,}|~{3,})/.exec(line)?.[1];
    if (marker && !fence) fence = {char:marker[0],length:marker.length};
    else if (marker && marker[0] === fence.char && marker.length >= fence.length) fence = null;
    block.push(line);
    if (!line.trim() && !fence) { blocks.push(block.join('\n')); block = []; }
  }
  if (block.length) blocks.push(block.join('\n'));
  const chunks = []; let current = '';
  for (const part of blocks) {
    if (current && Buffer.byteLength(current + '\n' + part) > maxBytes) { chunks.push(current.trim()); current = ''; }
    current += (current ? '\n' : '') + part;
  }
  if (current.trim()) chunks.push(current.trim());
  return chunks;
}

export async function writeRuleRoute(runDir, { agent, mode, fullText }) {
  const chunksDir = path.join(runDir,'input','context-rules');
  const packsDir = path.join(runDir,'input','context-packs');
  await mkdir(chunksDir,{recursive:true}); await mkdir(packsDir,{recursive:true});
  const entries = [];
  for (const section of fullText.split(/(?=^## )/m)) {
    if (!section.trim() || !section.startsWith('## ')) continue;
    const title = section.split('\n')[0].replace(/^## /,'');
    for (const [index,chunk] of splitRuleText(section).entries()) {
      const hash = contentHash(chunk);
      const rel = `input/context-rules/${hash.slice(0,24)}.md`;
      await writeFile(path.join(runDir,rel),chunk+'\n');
      entries.push({title,part:index+1,path:rel,sha256:hash,bytes:Buffer.byteLength(chunk+'\n')});
    }
  }
  const route = `# Rule agenda: ${agent}\n\nMode: ${mode}. Read input/agenda.md first.\nCanonical rules, verbatim. Read these chunks in order once per worker context.\nA chunk already read with the same hash need not be read again in this context; read it in a new worker or after compaction if no longer available.\nDo not also open whole contract files. Missing rules: request the exact source section.\n\n` + entries.map(e=>`- ${e.title}, part ${e.part}: ${e.path} (${e.bytes} bytes; sha256 ${e.sha256})`).join('\n')+'\n';
  const file = path.join(packsDir,`${agent}.md`);
  await writeFile(file,route);
  return {file,entries,bytes:Buffer.byteLength(route)};
}

export function runAgenda(manifest) {
  const mode = manifest.mode;
  const lane = mode === 'DOC_BOOTSTRAP' ? 'scope plan → doc ingest → C1-DOC/C2-DOC' : mode === 'CCR_INGEST' ? 'C0.5 claim plan → C1-DOC/C2-DOC (CCR)' : 'scoped explorers → C1/C2';
  return `# Run agenda: ${manifest.run_id}\n\nMode: ${mode}. Product: ${manifest.product}.\n\n1. Read run-manifest.json and input/bootstrap-request.json; use only assigned object/feature/claim IDs.\n2. Read input/context-packs/<your-agent>.md; follow its rule chunks in order.\n3. Input lane: ${lane}.\n4. Normalizer → materialize KB delta → C3.\n5. Feature context builder: profile → materialize → C4 → checklist → materialize → C5.\n6. Diff when base exists → compile OQ → publish strip/prose → independent review → publish/apply/outcome/release.\n\nThis agenda is generated, not execution state. input/run-checkpoint.json is Otto's persistent checkpoint: current stage, assigned scope, worker IDs, valid outputs, blockers, next action, read file hashes. Update it at phase boundaries and before compaction. Never treat a listed stage as completed.\n\n## Artifact routing\n\n- Explorer: assigned raw capture/doc source and playbook only.\n- Normalizer: assigned evidence IDs, matching base items, KB shard.\n- Feature context builder: assigned KB + base profile/checklist; keep both phases in the same context.\n- Diff: changed IDs + relevant base/oracle/dependencies; unchanged items compared by scripts where possible.\n- Reviewer: candidate and evidence in assigned run scope; retain full required verification.\n- Otto: receipts/checkpoint and script summaries; open detailed content only for a decision/blocker.\n\nLarge JSON: index with context-index.mjs, read exact JSON Pointers with --pointer. Index entries are locators, not evidence or a replacement for C4/C5/C6 verification. Generated indexes/rules stay in input; never publish them.\n`;
}
