// Luật "knowledge/ tự chứa" (contract §5a) dưới dạng code. Danh sách nằm ở
// contracts/forbidden-fields.json — file này chỉ biên dịch và áp dụng nó.
//
// Hai cách dùng:
//   - stripForbidden(value): xoá key cấm khỏi một object (publish strip)
//   - findForbiddenLeaks(dir) / findBadConfirmationRefs(dir): audit read-only
//     (publish-knowledge.mjs, audit-preview.mjs, reviewer)
//
// Tên field chỉ soi ở dạng KEY JSON (`"gate":`) và chỉ trong .json: prose hợp lệ
// có chữ "gate" ("password gate"), và "ent_id" là substring của "parent_id".

import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { walk } from "./fs-utils.mjs";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const spec = JSON.parse(await readFile(path.join(rootDir, "contracts", "forbidden-fields.json"), "utf8"));

export const FORBIDDEN_KEYS = new Set(spec.json_keys);
export const FORBIDDEN_KEY_PREFIXES = spec.json_key_prefixes;
export const PUBLISHED_KB_ITEM_KEYS = spec.published_kb_item_keys;
export const PUBLISHED_SCOPE_KEYS = spec.published_scope_keys;
export const PUBLISHED_CONFIRMATION_SOURCE_KEYS = spec.published_confirmation_source_keys;

const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const KEY_PATTERNS = [
  ...spec.json_keys.map((name) => ({ name, re: new RegExp(`"${escape(name)}"\\s*:`), jsonOnly: true })),
  ...spec.json_key_prefixes.map((p) => ({ name: `${p}*`, re: new RegExp(`"${escape(p)}[a-z0-9_]*"\\s*:`), jsonOnly: true }))
];
const PATH_PATTERNS = spec.path_patterns.map((src) => ({ name: src.replace(/\\/g, ""), re: new RegExp(src), jsonOnly: false }));
const ID_PATTERNS = Object.entries(spec.id_in_prose_patterns).map(([name, src]) => ({ name: `${name} trong nội dung`, re: new RegExp(src) }));
const OUTSIDE_BUNDLE_SRC = spec.outside_bundle_pattern;
export const CONFIRMATION_REF_BAD = new RegExp(spec.confirmation_ref_bad);
export const CONFIRMATION_REF_PATHLIKE = new RegExp(spec.confirmation_ref_pathlike);

export function isForbiddenKey(key) {
  return FORBIDDEN_KEYS.has(key) || FORBIDDEN_KEY_PREFIXES.some((p) => key.startsWith(p));
}

/** Bản sao sâu của `value` đã bỏ mọi key cấm (§5a). Không đụng tới giá trị chuỗi. */
export function stripForbidden(value) {
  if (Array.isArray(value)) return value.map(stripForbidden);
  if (value && typeof value === "object") {
    const out = {};
    for (const [k, v] of Object.entries(value)) {
      if (isForbiddenKey(k)) continue;
      out[k] = stripForbidden(v);
    }
    return out;
  }
  return value;
}

/**
 * Quét một đoạn text. `strictIds`/`strictSelfContained` biến cảnh báo thành leak.
 * Trả { leaks: [name], warnings: [name] }.
 */
export function scanText(file, text, { strictIds = false, strictSelfContained = false } = {}) {
  const leaks = [];
  const warnings = [];
  const isJson = file.endsWith(".json");
  for (const { name, re, jsonOnly } of [...KEY_PATTERNS, ...PATH_PATTERNS]) {
    if (jsonOnly && !isJson) continue;
    if (re.test(text)) leaks.push(name);
  }
  for (const { name, re } of ID_PATTERNS) {
    if (re.test(text)) (strictIds ? leaks : warnings).push(name);
  }
  const outside = [...new Set((text.match(new RegExp(OUTSIDE_BUNDLE_SRC, "g")) || []).map((m) => m.replace(/[.,);`]+$/, "")))];
  for (const ref of outside) (strictSelfContained ? leaks : warnings).push(`trỏ ra ngoài gói publish: ${ref}`);
  return { leaks, warnings };
}

/** Audit mọi .json/.md dưới `dir`. Trả { leaks: [{file,name}], warnings: [{file,name}] }. */
export async function findForbiddenLeaks(dir, opts = {}) {
  const leaks = [];
  const warnings = [];
  for (const file of await walk(dir)) {
    if (!file.endsWith(".json") && !file.endsWith(".md")) continue;
    const r = scanText(file, await readFile(file, "utf8"), opts);
    for (const name of r.leaks) leaks.push({ file, name });
    for (const name of r.warnings) warnings.push({ file, name });
  }
  return { leaks, warnings };
}

/** Lỗi của một confirmation_source dạng published (§3). Trả mảng lý do. */
export function confirmationSourceProblems(cs) {
  const problems = [];
  if (!cs) return problems;
  if (typeof cs.ref !== "string") problems.push("ref phải là chuỗi citation ở bản published (§3)");
  else {
    if (CONFIRMATION_REF_BAD.test(cs.ref)) problems.push("ref chứa ID run-local hoặc đường runs/");
    if (CONFIRMATION_REF_PATHLIKE.test(cs.ref)) problems.push("ref dùng cú pháp đường dẫn — phải là câu trích dẫn (§3)");
  }
  if (!cs.authored_on) problems.push("thiếu authored_on (§12.5)");
  if (cs.type === "dev_doc" && !["prose", "code_artifact"].includes(cs.derivation)) problems.push("dev_doc thiếu derivation hợp lệ");
  return problems;
}

/** Check dương trên mọi kb.json / _product-kb.json dưới `dir`. */
export async function findBadConfirmationRefs(dir) {
  const bad = [];
  for (const file of await walk(dir)) {
    const base = path.basename(file);
    if (base !== "kb.json" && base !== "_product-kb.json") continue;
    let items;
    try {
      items = JSON.parse(await readFile(file, "utf8"));
    } catch {
      continue;
    }
    if (!Array.isArray(items)) continue;
    for (const item of items) {
      for (const reason of confirmationSourceProblems(item?.confirmation_source)) {
        bad.push({ file, kb_id: item.kb_id, reason, ref: item.confirmation_source?.ref });
      }
    }
  }
  return bad;
}
