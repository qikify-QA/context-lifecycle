#!/usr/bin/env node
// Audit read-only cho Gate C6 (contract §5a): chạy trên candidate/publish-preview/
// của một run (hoặc một thư mục bất kỳ có layout knowledge/products/<product>/).
//
//   node scripts/ctx/audit-preview.mjs --run CTX-...     # audit preview của run
//   node scripts/ctx/audit-preview.mjs --dir <path>      # audit thư mục bất kỳ
//
// Kiểm: field/đường dẫn cấm · confirmation_source dạng published · open-questions.md
// có entry ngoài fence ```json · feature-summary.md dòng 2 khớp publish-meta.json.
// Không ghi file nào. Exit 0 = sạch, 1 = có finding BLOCKING.

import { readFile } from "node:fs/promises";
import path from "node:path";
import { parseArgs, walk, readJsonOr, exists } from "../lib/fs-utils.mjs";
import { resolveRunDir, runPaths } from "../lib/run-layout.mjs";
import { findForbiddenLeaks, findBadConfirmationRefs } from "../lib/forbidden-fields.mjs";
import { bundleIntegrity } from "../lib/bundle-integrity.mjs";
import { secretFindings } from "../lib/secret-scan.mjs";
import { findUnfencedEntries } from "../lib/open-questions.mjs";

export async function auditDir(dir, opts = {}) {
  const blocking = [];
  if(!await exists(dir))return {ok:false,blocking:[{audit:"bundle-exists",file:".",problem:"missing preview directory"}],warnings:[]};
  const warnings = [];
  const rel = (f) => path.relative(dir, f);

  const { leaks, warnings: leakWarnings } = await findForbiddenLeaks(dir, opts);
  for (const l of leaks) blocking.push({ audit: "zero-run-reference", file: rel(l.file), problem: l.name });
  for (const w of leakWarnings) warnings.push({ audit: "zero-run-reference", file: rel(w.file), problem: w.name });

  for (const b of await findBadConfirmationRefs(dir, opts)) {
    blocking.push({ audit: "confirmation-source-validity", file: rel(b.file), kb_id: b.kb_id, problem: b.reason });
  }

  for (const file of await walk(dir)) {
    const name = path.basename(file);
    const bytes=await readFile(file);
    if(!bytes.includes(0))for(const hit of secretFindings(bytes.toString("utf8"),{envFile:name==="_env.example"}))blocking.push({audit:"secret-redaction",file:rel(file),problem:hit.kind,line:hit.line});
    if(name.endsWith(".json")){try{
      const value=JSON.parse(bytes);
      const pending=(node)=>{
        if(Array.isArray(node)){for(const item of node)pending(item);return;}
        if(!node||typeof node!=='object')return;
        for(const issue of node.reference_issues??[])warnings.push({audit:"pending-reference-decision",file:rel(file),problem:issue.reason,ref:issue.ref,oq_id:issue.oq_id});
        for(const [key,child] of Object.entries(node))if(key!=='reference_issues')pending(child);
      };pending(value);
    }catch{blocking.push({audit:"json-integrity",file:rel(file),problem:"invalid JSON"});}}
    if (name === "open-questions.md") {
      const oqText=await readFile(file,"utf8");
      for(const block of oqText.matchAll(/```json\s*\n([\s\S]*?)```/g))try{JSON.parse(block[1]);}catch{blocking.push({audit:"open-question-format",file:rel(file),problem:"invalid fenced JSON"});}
      const unfenced = findUnfencedEntries(oqText);
      if (unfenced.length) blocking.push({ audit: "open-question-format", file: rel(file), problem: `entry ngoài fence \`\`\`json: ${unfenced.join(", ")}` });
    }
    if (name === "publish-meta.json") {
      const meta = await readJsonOr(file, {});
      const summary = path.join(path.dirname(file), "feature-summary.md");
      if (!(await exists(summary))) {
        blocking.push({ audit: "version-consistency", file: rel(file), problem: "object chưa có feature-summary.md" });
        continue;
      }
      const line2 = (await readFile(summary, "utf8")).split("\n")[1] ?? "";
      const m = line2.match(/\*\*Published context version:\*\*\s*(\d+)/);
      if (!m) blocking.push({ audit: "version-consistency", file: rel(summary), problem: "dòng 2 phải là `**Published context version:** <N>`" });
      else if (m[1] !== String(meta.published_context_version)) {
        blocking.push({ audit: "version-consistency", file: rel(summary), problem: `dòng 2 ghi ${m[1]}, publish-meta ghi ${meta.published_context_version}` });
      }
    }
  }
  for(const finding of await bundleIntegrity(dir,opts))blocking.push({audit:"referential-integrity",...finding});
  return { ok: blocking.length === 0, blocking, warnings };
}

async function main() {
  const args = parseArgs();
  const dir = typeof args.dir === "string" ? path.resolve(args.dir) : typeof args.run === "string" ? runPaths(resolveRunDir(args.run)).previewDir : null;
  if (!dir) {
    console.error("Cần --run CTX-... hoặc --dir <path>");
    process.exit(1);
  }
  if (!(await exists(dir))) {
    console.error(`Không có ${dir}`);
    process.exit(1);
  }
  let baseDir,product;
  if(typeof args.run==="string"){const manifest=await readJsonOr(path.join(resolveRunDir(args.run),"run-manifest.json"),{});const {knowledgeProductsDir}=await import("../lib/run-layout.mjs");product=manifest.product; baseDir=path.join(knowledgeProductsDir,product??"");}
  const result = await auditDir(dir, { baseDir, product, strictIds: process.env.PUBLISH_STRICT_IDS === "1", strictSelfContained: process.env.PUBLISH_STRICT_SELFCONTAINED === "1" });
  console.log(JSON.stringify(result, null, 2));
  process.exit(result.ok ? 0 : 1);
}

if (import.meta.url === `file://${process.argv[1]}`) main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
