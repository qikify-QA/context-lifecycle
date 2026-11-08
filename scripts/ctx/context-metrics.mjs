#!/usr/bin/env node
// Byte counts are diagnostics, never billed-token estimates.
import { stat } from 'node:fs/promises';
import path from 'node:path';
import { walk, parseArgs, readJson, writeJson } from '../lib/fs-utils.mjs';
import { resolveRunDir } from '../lib/run-layout.mjs';
export async function measureContext(dir) {
  const groups = {};
  const files = [];
  for (const file of await walk(dir)) {
    const rel = path.relative(dir,file);
    if (rel.startsWith('review/context-metrics') || rel === 'review/runtime-usage.json') continue;
    const bytes = (await stat(file)).size;
    const key = rel.startsWith('candidate/') || rel.startsWith('input/context-packs/') ? rel.split(path.sep).slice(0,2).join('/') : rel.split(path.sep)[0];
    groups[key] ??= { files:0, bytes:0 };
    groups[key].files++; groups[key].bytes += bytes;
    files.push({ path:rel, bytes });
  }
  return { measured_at:new Date().toISOString(), unit:'bytes', token_usage:null, groups, largest:files.sort((a,b) => b.bytes-a.bytes).slice(0,10) };
}
async function main() {
  const args = parseArgs();
  if (typeof args.run !== 'string') throw new Error('Need --run');
  const dir = resolveRunDir(args.run);
  const report = await measureContext(dir);
  // Optional runtime report: copied verbatim, never inferred from file size.
  const usageFile = path.join(dir,'review/runtime-usage.json');
  try { report.token_usage = await readJson(usageFile); } catch (e) { if (e.code !== 'ENOENT') throw e; }
  const output = path.join(dir,'review/context-metrics.json');
  await writeJson(output,report);
  console.log(JSON.stringify({ ok:true, output, groups:report.groups, token_usage_available: report.token_usage !== null }));
}
if (import.meta.url === `file://${process.argv[1]}`) main().catch(e => { console.error(e.message); process.exitCode=1; });
