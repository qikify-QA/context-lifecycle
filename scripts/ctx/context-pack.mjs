#!/usr/bin/env node
// Extract canonical rules verbatim; never maintain copied role-specific contracts.
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { parseArgs, readJson } from '../lib/fs-utils.mjs';
import { rootDir, resolveRunDir } from '../lib/run-layout.mjs';
import { writeFile } from 'node:fs/promises';
import { writeRuleRoute, runAgenda } from '../lib/context-routing.mjs';

export function sections(text) {
  return text.split(/(?=^## )/m).filter(s => s.startsWith('## '));
}
export function selectSections(text, keys) {
  const parts = sections(text);
  return keys.map(key => {
    const escaped = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const part = parts.find(s => new RegExp(`^## ${escaped}\\.(?: |$)`).test(s));
    if (!part) throw new Error(`Missing contract section: ${key}`);
    return part.trim();
  }).join('\n\n');
}
export async function buildPack({ agent, mode, ccr = false }) {
  const policy = await readJson(path.join(rootDir, 'config/context-policy.json'));
  if (!Object.hasOwn(policy.roles, agent)) throw new Error(`Unknown agent: ${agent}`);
  if (!['ZERO_DOC_BOOTSTRAP','BROAD_BOOTSTRAP','DOC_BOOTSTRAP','CCR_INGEST','INCREMENTAL_UPDATE','REFRESH','RECONCILE'].includes(mode)) throw new Error(`Unknown mode: ${mode}`);
  const read = rel => readFile(path.join(rootDir, rel), 'utf8');
  const keys = [...new Set([...policy.common_sections, ...policy.roles[agent]])];
  let text = `# Context pack: ${agent}\n\nMode: ${mode}. Generated from canonical contracts; do not edit.\nRead contracts/context-routing.md for dispatch and delta protocol.\n\nSource: contracts/qa-context-contract.md\n\n${selectSections(await read('contracts/qa-context-contract.md'), keys)}\n`;
  if ((ccr || mode === 'CCR_INGEST') && ['otto','qa-knowledge-normalizer','knowledge-diff-analyzer','context-quality-reviewer'].includes(agent)) {
    const ccrKeys = agent === 'otto' ? ['12.1','12.2','12.3','12.3a','12.3b','12.3c','12.3d','12.4'] : ['12.3a','12.3c','12.3d','12.4'];
    const ccrText = await read('contracts/ccr-protocol.md');
    text += '\nSource: contracts/ccr-protocol.md\n\n' + sections(ccrText).filter(s => ccrKeys.includes(/^## ([^ ]+)/.exec(s)?.[1])).join('\n');
  }
  if (['knowledge-diff-analyzer','context-quality-reviewer'].includes(agent) && ['CCR_INGEST','DOC_BOOTSTRAP'].includes(mode)) {
    text += '\nSource: contracts/supersede.md\n\n' + await read('contracts/supersede.md');
  }
  const gates = { 'qa-context-scope-planner':['C0'], 'portal-explorer':['C1'], 'storefront-explorer':['C1'], 'api-explorer':['C2'], 'db-explorer':['C2'], 'code-config-explorer':['C2'], 'doc-ingest-explorer':['C1-DOC','C2-DOC'], 'qa-knowledge-normalizer':['C3'], 'feature-context-builder':['C4','C5'] };
  const gateText = await read('contracts/gates.md');
  const wanted = agent === 'context-quality-reviewer' || agent === 'otto' ? ['C0',...(['DOC_BOOTSTRAP','CCR_INGEST'].includes(mode) ? ['C1-DOC','C2-DOC'] : ['C1','C2']),'C3','C4','C5','C6'] : gates[agent] ?? [];
  const selected = sections(gateText).filter(s => {
    const key = /^## (C[0-6](?:-DOC)?)\b/.exec(s)?.[1];
    return key ? wanted.includes(key) : /^## (Gate applicability|REJECT)/.test(s);
  });
  if (selected.length) text += '\nSource: contracts/gates.md\n\n' + selected.join('\n');
  return text;
}
async function main() {
  const args = parseArgs();
  if (typeof args.run !== 'string' || typeof args.agent !== 'string') throw new Error('Need --run <id> --agent <name>');
  const dir = resolveRunDir(args.run);
  const manifest = await readJson(path.join(dir, 'run-manifest.json'));
  const text = await buildPack({ agent: args.agent, mode: manifest.mode, ccr: Boolean(manifest.source?.proposal_id || manifest.mode_settled_at === 'C0.5') });
  const route = await writeRuleRoute(dir,{agent:args.agent,mode:manifest.mode,fullText:text});
  await writeFile(path.join(dir,'input','agenda.md'),runAgenda(manifest));
  console.log(JSON.stringify({ok:true,path:route.file,agenda:path.join(dir,'input','agenda.md'),bytes:route.bytes,rule_chunks:route.entries.length,rule_bytes:route.entries.reduce((n,e)=>n+e.bytes,0)}));
}
if (import.meta.url === `file://${process.argv[1]}`) main().catch(e => { console.error(e.message); process.exitCode = 1; });
