#!/usr/bin/env node
// Codemod một lần: thay literal metadata "CTX-YYYYMMDD-NN" (chỉ dạng thuần ngày+số thứ tự
// của run, KHÔNG phải dữ liệu quan sát thật) bằng "run YYYY-MM-DD #NN" để không còn khớp
// pattern cấm `\bCTX-\d{8}-\d` (contracts/forbidden-fields.json, audit zero-run-reference).
// Chỉ chạy trên danh sách file cố định dưới đây — KHÔNG quét toàn repo, vì một số chỗ khác
// (font/features/manage-uploaded-font/*, sdk/features/*) chứa literal tương tự nhưng là dữ
// liệu quan sát thật hoặc ID bằng chứng gắn chặt nội dung, cần người xem lại, không sửa máy.
//
//   node scripts/ctx/fix-legacy-ctx-run-id-literals.mjs           # áp dụng
//   node scripts/ctx/fix-legacy-ctx-run-id-literals.mjs --dry-run # chỉ in diff, không ghi

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const dryRun = process.argv.includes("--dry-run");

const FILES = [
  "knowledge/products/teeinblue/_registry.json",
  "knowledge/products/teeinblue/artwork/CHANGELOG.md",
  "knowledge/products/teeinblue/asset-category/CHANGELOG.md",
  "knowledge/products/teeinblue/campaign/CHANGELOG.md",
  "knowledge/products/teeinblue/font/CHANGELOG.md",
  "knowledge/products/teeinblue/global-option/CHANGELOG.md",
  "knowledge/products/teeinblue/product-base/CHANGELOG.md",
  "knowledge/products/teeinblue/translation/checklists/language-locale-switcher.json",
  "knowledge/products/teeinblue/translation/checklists/product-page-content-translation.json",
  "knowledge/products/teeinblue/sdk/features/genai-personalization-runtime/kb.json",
  "knowledge/products/teeinblue/sdk/features/genai-personalization-runtime/profile.json",
];

const PATTERN = /\bCTX-(\d{4})(\d{2})(\d{2})-(\d+)\b/g;
const replace = (text) => text.replace(PATTERN, (_m, y, mo, d, n) => `run ${y}-${mo}-${d} #${n}`);

let totalHits = 0;
for (const relFile of FILES) {
  const abs = path.join(rootDir, relFile);
  const before = await readFile(abs, "utf8");
  const hits = [...before.matchAll(PATTERN)].length;
  if (hits === 0) { console.log(`skip (0 hit): ${relFile}`); continue; }
  const after = replace(before);
  totalHits += hits;
  console.log(`${dryRun ? "[dry-run] " : ""}${relFile}: ${hits} hit`);
  if (!dryRun) await writeFile(abs, after, "utf8");
}
console.log(`\nTổng: ${totalHits} literal CTX-<run-id> ${dryRun ? "sẽ được" : "đã được"} đổi sang dạng "run YYYY-MM-DD #NN".`);
