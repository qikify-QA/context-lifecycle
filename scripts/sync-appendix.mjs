#!/usr/bin/env node
// Sinh lại bảng product trong contracts/ccr-product-appendix.md từ config/products/*.json,
// giữa hai marker <!-- products:start --> và <!-- products:end -->. Bảng viết tay từng
// bỏ sót product (ACTIVE nhưng không có trong bảng) — config là nguồn duy nhất.
//
//   node scripts/sync-appendix.mjs           # ghi lại file
//   node scripts/sync-appendix.mjs --check   # exit 1 nếu bảng đang lệch config

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { activeProducts, rootDir } from "./lib/product-config.mjs";

const file = path.join(rootDir, "contracts", "ccr-product-appendix.md");
const START = "<!-- products:start -->";
const END = "<!-- products:end -->";

export function renderTable(products) {
  const rows = products.map((p) => {
    const explore = p.modes?.explore_enabled;
    const source = explore ? `explore (${(p.modes?.allowed_explorers ?? []).join(", ")})` : "tài liệu (doc-first)";
    const env = p.environments?.default ?? "?";
    const supersede = p.supersede_policy?.enabled ? "có" : "không — CCR mâu thuẫn canon luôn giữ cả hai phía";
    return `| \`${p.product_key}\` | ${p.label ?? ""} | \`${p.qa_hub?.project_key ?? "?"}\` | ${source} | \`${env}\` | ${supersede} |`;
  });
  return [
    "| `product_key` | Nhãn | Key trên QA Hub | Nguồn knowledge | Environment context builder dùng | CCR được ghi đè canon (§12.5) |",
    "|---|---|---|---|---|---|",
    ...rows
  ].join("\n");
}

async function main() {
  const text = await readFile(file, "utf8");
  const a = text.indexOf(START);
  const b = text.indexOf(END);
  if (a < 0 || b < a) throw new Error(`thiếu marker ${START} / ${END} trong ${file}`);
  const next = `${text.slice(0, a + START.length)}\n${renderTable(await activeProducts())}\n${text.slice(b)}`;
  if (process.argv.includes("--check")) {
    if (next !== text) {
      console.error("Bảng product trong ccr-product-appendix.md lệch config — chạy: node scripts/sync-appendix.mjs");
      process.exit(1);
    }
    console.log("OK: bảng product khớp config");
    return;
  }
  await writeFile(file, next);
  console.log("Đã cập nhật bảng product trong contracts/ccr-product-appendix.md");
}

main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
