// Validator JSON Schema tối giản, không dependency. Hỗ trợ đúng phần repo dùng:
// type, enum, required, properties, items, minItems, pattern, anyOf.
// Luật có điều kiện giữa các field (vd "CONFIRMED_EXPECTED ⇒ có confirmation_source")
// không viết bằng schema — chúng là code rule trong scripts/ctx/validate-run.mjs.

import { readFile } from "node:fs/promises";

export function typeOf(v) {
  if (v === null) return "null";
  if (Array.isArray(v)) return "array";
  if (Number.isInteger(v)) return "integer";
  return typeof v;
}

const isPlaceholder = (v) => typeof v === "string" && v.includes("<<<");

/** Kiểm `value` theo `schema`, đẩy lỗi dạng `{ path, problem }` vào `out`. */
export function check(schema, value, at, out, { rejectPlaceholders = false } = {}) {
  const opts = { rejectPlaceholders };
  if (schema.anyOf) {
    const ok = schema.anyOf.some((sub) => {
      const tmp = [];
      check(sub, value, at, tmp, opts);
      return tmp.length === 0;
    });
    if (!ok) out.push({ path: at, problem: schema.anyOfMessage ?? "không khớp lựa chọn nào của anyOf" });
  }
  if (schema.enum && !schema.enum.includes(value)) {
    out.push({ path: at, problem: `${JSON.stringify(value)} không thuộc ${schema.enum.join(" | ")}` });
  }
  if (schema.type) {
    const types = [].concat(schema.type);
    const t = typeOf(value);
    const matches = types.includes(t) || (t === "integer" && types.includes("number"));
    if (!matches) {
      out.push({ path: at, problem: `kiểu ${t}, cần ${types.join(" | ")}` });
      return;
    }
  }
  if (rejectPlaceholders && isPlaceholder(value)) out.push({ path: at, problem: "còn placeholder <<< ... >>>" });
  if (schema.pattern && typeof value === "string" && !new RegExp(schema.pattern).test(value)) {
    out.push({ path: at, problem: `"${value}" không khớp ${schema.pattern}` });
  }
  if (schema.required && value && typeof value === "object" && !Array.isArray(value)) {
    for (const k of schema.required) if (!(k in value)) out.push({ path: `${at}.${k}`, problem: "thiếu" });
  }
  if (schema.properties && value && typeof value === "object" && !Array.isArray(value)) {
    for (const [k, sub] of Object.entries(schema.properties)) if (k in value) check(sub, value[k], `${at}.${k}`, out, opts);
  }
  if (Array.isArray(value)) {
    if (schema.minItems && value.length < schema.minItems) out.push({ path: at, problem: `cần ít nhất ${schema.minItems} phần tử` });
    if (schema.items) value.forEach((v, i) => check(schema.items, v, `${at}[${i}]`, out, opts));
  }
}

const cache = new Map();
export async function loadSchema(file) {
  if (!cache.has(file)) cache.set(file, JSON.parse(await readFile(file, "utf8")));
  return cache.get(file);
}
