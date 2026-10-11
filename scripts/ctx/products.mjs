#!/usr/bin/env node
// Danh sách product cho orchestrator (vòng quét Proposal, contracts/ccr-protocol.md §12.1).
//
//   node scripts/ctx/products.mjs                     # mọi product ACTIVE
//   node scripts/ctx/products.mjs --project-id <id>   # product sở hữu project_id đó (exit 2 nếu không có)
//
// Config sai schema làm script dừng (loadProducts validate) — đúng ý: không quét
// QA Hub bằng config hỏng.

import { parseArgs } from "../lib/fs-utils.mjs";
import { activeProducts, getProductByProjectId, explorePlaybookPath, rootDir } from "../lib/product-config.mjs";
import path from "node:path";

const summary = (p) => ({
  product_key: p.product_key,
  project_id: p.qa_hub?.project_id,
  mcp_server: p.qa_hub?.mcp_server,
  explore_enabled: p.modes?.explore_enabled === true,
  allowed_modes: p.modes?.allowed_modes ?? [],
  allowed_explorers: p.modes?.allowed_explorers ?? [],
  environment: p.environments?.default,
  supersede_enabled: p.supersede_policy?.enabled === true,
  playbook: explorePlaybookPath(p) ? path.relative(rootDir, explorePlaybookPath(p)) : null
});

async function main() {
  const args = parseArgs();
  if (typeof args["project-id"] === "string") {
    const p = await getProductByProjectId(args["project-id"]);
    if (!p) {
      console.error(`project_id ${args["project-id"]} không thuộc product ACTIVE nào — bỏ qua Proposal này.`);
      process.exit(2);
    }
    console.log(JSON.stringify(summary(p), null, 2));
    return;
  }
  console.log(JSON.stringify((await activeProducts()).map(summary), null, 2));
}

main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
