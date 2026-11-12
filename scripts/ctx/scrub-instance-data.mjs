#!/usr/bin/env node
// Codemod một lần (operator yêu cầu 2026-11-12): bỏ dữ liệu instance/cá nhân khỏi knowledge/
// teeinblue — tên store Shopify, tên account explorer/user B, id user/staff, handle cá nhân.
// Thay bằng tên biến env (memory/guide chỉ ghi tên biến, không ghi giá trị). Không đổi ý nghĩa
// item: chỉ thay chuỗi định danh trong scope/statement/OQ.
//
//   node scripts/ctx/scrub-instance-data.mjs --dry-run   # in số chỗ sẽ đổi theo file
//   node scripts/ctx/scrub-instance-data.mjs             # áp dụng

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { walk } from "../lib/fs-utils.mjs";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const productDir = path.join(rootDir, "knowledge", "products", "teeinblue");
const dryRun = process.argv.includes("--dry-run");

// Thứ tự quan trọng: chuỗi dài trước chuỗi ngắn.
export const RULES = [
  [/https?:\/\/linh-explorer-2\.myshopify\.com/g, "<TIB_STORE_URL_2>"],
  [/https?:\/\/linh-explorer\.myshopify\.com/g, "<TIB_STORE_URL_1>"],
  [/https?:\/\/linh-tib-staging\.myshopify\.com/g, "<TIB_USER_B_STORE_URL>"],
  [/https?:\/\/n(price[12])\.myshopify\.com/gi, "<store>"],
  [/\b(store|shop) linh-explorer-2(\.myshopify\.com)?\b/gi, "store TIB_STORE_URL_2"],
  [/\b(store|shop) linh-explorer(\.myshopify\.com)?\b/gi, "store TIB_STORE_URL_1"],
  [/\b(store|shop) linh-tib-staging(\.myshopify\.com)?\b/gi, "store TIB_USER_B_STORE_URL"],
  [/linh-explorer-2(\.myshopify\.com)?/g, "store TIB_STORE_URL_2"],
  [/linh-explorer(\.myshopify\.com)?/g, "store TIB_STORE_URL_1"],
  [/linh-tib-staging(\.myshopify\.com)?/g, "store TIB_USER_B_STORE_URL"],
  [/\bn(price[12])\.myshopify\.com/gi, "<store>.myshopify.com"],
  [/\bN(price[12])\b/g, "store không thuộc explorer"],
  [/\bn(price[12])\b/g, "store không thuộc explorer"],
  [/'Linh explorer'/gi, "explorer (TIB_STAGING_EMAIL)"],
  [/Linh explorer/gi, "explorer (TIB_STAGING_EMAIL)"],
  [/'Linh Pham'/gi, "user B (TIB_USER_B_*)"],
  [/Linh Pham/gi, "user B (TIB_USER_B_*)"],
  [/\bstaff sub ?= ?273\b/g, "staff sub=<explorer>"],
  [/\bsub ?= ?273\b/g, "sub=<explorer>"],
  [/\buser_id ?= ?266\b/g, "user_id=<explorer>"],
  [/\buser_id 266\b/g, "user_id <explorer>"],
  [/\bid ?= ?266\b/g, "id=<explorer>"],
  [/\bphuongbb\b/g, "QA"],
];

export function scrub(text) {
  let out = text, hits = 0;
  for (const [re, to] of RULES) out = out.replace(re, () => { hits++; return to; });
  return { out, hits };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  let total = 0, files = 0;
  for (const abs of await walk(productDir)) {
    if (!/\.(json|md)$/.test(abs) || / 2\./.test(path.basename(abs))) continue;
    const before = await readFile(abs, "utf8");
    const { out, hits } = scrub(before);
    if (!hits) continue;
    if (abs.endsWith(".json")) JSON.parse(out); // không ghi nếu làm hỏng JSON
    total += hits; files++;
    console.log(`${dryRun ? "[dry-run] " : ""}${path.relative(rootDir, abs)}: ${hits}`);
    if (!dryRun) await writeFile(abs, out, "utf8");
  }
  console.log(`\nTổng: ${total} chỗ trong ${files} file ${dryRun ? "sẽ được" : "đã được"} thay.`);
}
