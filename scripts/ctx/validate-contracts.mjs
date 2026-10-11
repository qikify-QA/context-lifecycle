#!/usr/bin/env node
// Kiểm phần "luật" của repo — chạy trong CI và trước khi commit:
//   - mọi JSON dưới contracts/ và config/ parse được
//   - mọi schema trong contracts/schemas/ có $comment và type
//   - 3 template bootstrap-request cùng shape C0 (contract §0, gates.md C0)
//   - config product ACTIVE hợp lệ theo _schema.json (loadProducts)
//   - bảng product trong ccr-product-appendix.md khớp config
//   - agent definition theo template (lint-agents)
//
//   node scripts/ctx/validate-contracts.mjs     # exit 1 nếu có lỗi

import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { walk } from "../lib/fs-utils.mjs";
import { rootDir } from "../lib/run-layout.mjs";
import { loadProducts } from "../lib/product-config.mjs";
import { lintAgents } from "./lint-agents.mjs";

const C0_KEYS = ["mode", "product_key", "context", "object_target", "exploration_policy"];

export async function validateContracts() {
  const problems = [];
  const rel = (f) => path.relative(rootDir, f);

  for (const file of [...(await walk(path.join(rootDir, "contracts"))), ...(await walk(path.join(rootDir, "config")))]) {
    if (!file.endsWith(".json")) continue;
    try {
      JSON.parse(await readFile(file, "utf8"));
    } catch (e) {
      problems.push(`${rel(file)}: JSON không hợp lệ — ${e.message}`);
    }
  }

  const schemaDir = path.join(rootDir, "contracts", "schemas");
  for (const name of (await readdir(schemaDir)).filter((n) => n.endsWith(".schema.json"))) {
    const s = JSON.parse(await readFile(path.join(schemaDir, name), "utf8"));
    if (!s.$comment) problems.push(`contracts/schemas/${name}: thiếu $comment (artifact nào, ai sinh)`);
    if (!s.type) problems.push(`contracts/schemas/${name}: thiếu type`);
  }

  const templateDir = path.join(rootDir, "contracts", "templates");
  for (const name of (await readdir(templateDir)).filter((n) => n.endsWith(".json"))) {
    const t = JSON.parse(await readFile(path.join(templateDir, name), "utf8"));
    for (const k of C0_KEYS) if (!(k in t)) problems.push(`contracts/templates/${name}: thiếu key C0 "${k}"`);
    if (t.object_target && !("object_key" in t.object_target)) problems.push(`contracts/templates/${name}: thiếu object_target.object_key`);
  }

  try {
    await loadProducts();
  } catch (e) {
    problems.push(e.message);
  }

  try {
    await promisify(execFile)("node", [path.join(rootDir, "scripts", "sync-appendix.mjs"), "--check"], { cwd: rootDir });
  } catch (e) {
    problems.push((e.stderr || e.message).trim());
  }

  for (const p of await lintAgents()) problems.push(`agents: ${p}`);
  return problems;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const problems = await validateContracts();
  if (problems.length) {
    console.error(problems.map((p) => `- ${p}`).join("\n"));
    process.exit(1);
  }
  console.log("OK: contracts, schemas, templates, config, appendix, agents");
}
