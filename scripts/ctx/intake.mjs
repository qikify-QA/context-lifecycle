#!/usr/bin/env node
// Sắp hàng Proposal cho orchestrator (contracts/ccr-protocol.md §12.1).
//
//   node scripts/ctx/intake.mjs --proposals <file.json>
//
// <file.json> = mảng Proposal orchestrator đã lấy bằng list_context_board_proposals
// + get_proposal (mỗi phần tử có id, projectId, submittedAt, content). Script không
// gọi MCP. Output: hàng đợi theo mức gấp (CCR mục 4.4: HIGH > MEDIUM > LOW > UNKNOWN)
// rồi submittedAt cũ trước; Proposal của project không thuộc product ACTIVE nào nằm
// ở `skipped`. Lock vẫn là cơ chế concurrency duy nhất — hàng đợi chỉ quyết thứ tự thử.

import { readFile } from "node:fs/promises";
import { parseArgs } from "../lib/fs-utils.mjs";
import { activeProducts } from "../lib/product-config.mjs";

const RANK = { HIGH: 0, MEDIUM: 1, LOW: 2, UNKNOWN: 3 };

/** Mức gấp ở mục "4.4 Mức độ gấp": mức đầu tiên trên dòng đầu có giá trị; dòng chú thích mẫu (đủ cả 3 mức) → UNKNOWN. */
export function parseUrgency(content = "") {
  const lines = content.split("\n");
  const start = lines.findIndex((l) => /^#{1,4}\s*4\.4\b/.test(l));
  if (start < 0) return "UNKNOWN";
  for (const line of lines.slice(start + 1)) {
    if (/^#{1,4}\s/.test(line)) break;
    const found = [...line.matchAll(/`(HIGH|MEDIUM|LOW)`/g)].map((m) => m[1]);
    if (!found.length) continue;
    // Dòng chú thích của khuôn liệt kê đủ cả 3 mức = người gửi chưa chọn.
    if (new Set(found).size === 3) return "UNKNOWN";
    return found[0];
  }
  return "UNKNOWN";
}

export function buildQueue(proposals, products) {
  const byProject = new Map(products.map((p) => [p.qa_hub?.project_id, p.product_key]));
  const queue = [];
  const skipped = [];
  for (const p of proposals) {
    const product = byProject.get(p.projectId ?? p.project_id);
    if (!product) {
      skipped.push({ proposal_id: p.id, project_id: p.projectId ?? p.project_id ?? null, reason: "project không thuộc product ACTIVE nào" });
      continue;
    }
    queue.push({ proposal_id: p.id, product, urgency: parseUrgency(p.content), submitted_at: p.submittedAt ?? null });
  }
  queue.sort((a, b) => RANK[a.urgency] - RANK[b.urgency] || String(a.submitted_at).localeCompare(String(b.submitted_at)));
  return { queue, skipped };
}

async function main() {
  const args = parseArgs();
  if (typeof args.proposals !== "string") {
    console.error("Cần --proposals <file.json>");
    process.exit(1);
  }
  const proposals = JSON.parse(await readFile(args.proposals, "utf8"));
  console.log(JSON.stringify(buildQueue(Array.isArray(proposals) ? proposals : [proposals], await activeProducts()), null, 2));
}

if (import.meta.url === `file://${process.argv[1]}`) main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
