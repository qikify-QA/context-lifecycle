// Helper capture HTTP cho run CTX-20261106-02. Không chứa giá trị secret.
// Token đọc từ process.env.TIB_FULL_ACCESS_TOKEN; redact trong bộ nhớ trước khi ghi đĩa.
import https from "node:https";
import { readFileSync, writeFileSync, existsSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
export const runDir = path.resolve(here, "../../..");
const netDir = path.join(runDir, "raw/network");

const TOKEN = process.env.TIB_FULL_ACCESS_TOKEN || "";
export const API_BASE = process.env.TIB_API_BASE || "";
export const OPENAPI_BASE = process.env.TIB_OPENAPI_BASE || "";
const EXPECTED_HOST = "staging-api.teeinblue.com";
const PROD_HOSTS = new Set(["portal.teeinblue.com", "api.teeinblue.com", "portal-api.teeinblue.com",
  "sdk.teeinblue.com", "customize.teeinblue.com", "photo-api.teeinblue.com", "teeinblue.com", "www.teeinblue.com"]);
const MAX_REQUESTS = 60;
const GAP_MS = Number(process.env.CAP_GAP_MS || 20000);

if (!TOKEN) throw new Error("missing token env");
if (new URL(API_BASE).host !== EXPECTED_HOST) throw new Error("TIB_API_BASE is not the expected staging host");
if (new URL(OPENAPI_BASE).host !== EXPECTED_HOST) throw new Error("TIB_OPENAPI_BASE is not the expected staging host");

const R = "[REDACTED]";
const SENSITIVE_HEADER = /^(authorization|cookie|set-cookie|x-api-key|x-xsrf-token|x-csrf-token|proxy-authorization)$/i;
const SENSITIVE_KEY = /(token|password|passwd|secret|api[_-]?key|signature|hmac|credential|e-?mail|phone|address|first_?name|last_?name|full_?name|customer|buyer|card|payment)/i;
const EMAIL = /[A-Za-z0-9._%+-]+@(?!example\.(com|org|net)\b)[A-Za-z0-9-]+\.[A-Za-z0-9.-]+/g;
const URL_RE = /https?:\/\/[^\s"'<>\\]+/g;
const SIGNED_HINT = /(x-amz-|signature=|sig=|awsaccesskeyid|googleaccessid|x-goog-|se=|sp=)/i;

export function maskUrl(u) {
  const q = u.indexOf("?");
  if (q < 0 || !SIGNED_HINT.test(u)) return u;
  const names = u.slice(q + 1).split("&").map((p) => `${p.split("=")[0]}=${R}`);
  return `${u.slice(0, q)}?${names.join("&")}`;
}
export function forceMask(u) {
  const q = u.indexOf("?");
  if (q < 0) return u;
  return `${u.slice(0, q)}?${u.slice(q + 1).split("&").map((p) => `${p.split("=")[0]}=${R}`).join("&")}`;
}
export function scrubString(s) {
  let out = s;
  if (TOKEN && out.includes(TOKEN)) out = out.split(TOKEN).join(R);
  out = out.replace(URL_RE, maskUrl).replace(EMAIL, R);
  out = out.replace(/(name="csrf-token"\s+content=")[^"]*/gi, `$1${R}`);
  out = out.replace(/(name="_token"[^>]*value=")[^"]*/gi, `$1${R}`);
  return out;
}
export function redact(v, keepOnly = null, key = "") {
  if (Array.isArray(v)) return v.map((x) => redact(x, keepOnly, key));
  if (v && typeof v === "object") {
    const o = {};
    for (const [k, x] of Object.entries(v)) {
      if (x === null || typeof x === "boolean") { o[k] = x; continue; }
      if (keepOnly && !keepOnly.has(k) && typeof x !== "object") { o[k] = R; continue; }
      if (SENSITIVE_KEY.test(k) && typeof x !== "object") { o[k] = R; continue; }
      o[k] = redact(x, keepOnly, k);
    }
    return o;
  }
  if (typeof v === "string" && /upload_?url|presigned|signed_?url/i.test(key)) return scrubString(forceMask(v));
  return typeof v === "string" ? scrubString(v) : v;
}
const redactHeaders = (h) => Object.fromEntries(Object.entries(h).map(([k, v]) =>
  [k, SENSITIVE_HEADER.test(k) ? R : (Array.isArray(v) ? v.map(scrubString) : scrubString(String(v)))]));

function countRequests() {
  let n = 0;
  for (const f of readdirSync(netDir)) if (f.endsWith(".json")) n += JSON.parse(readFileSync(path.join(netDir, f), "utf8")).entries.length;
  return n;
}
let lastRemaining = null;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function send(url, method, headers, body) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, { method, headers }, (res) => {
      const chunks = [];
      res.on("data", (c) => chunks.push(c));
      res.on("end", () => resolve({ status: res.statusCode, headers: res.headers, bytes: Buffer.concat(chunks) }));
    });
    req.setTimeout(60000, () => req.destroy(new Error("timeout")));
    req.on("error", reject);
    if (body) req.write(body);
    req.end();
  });
}

// opts: act, method, url, auth (default true), accept (default application/json; null = bỏ header),
// json, raw (Buffer), contentType, extraHeaders, keepOnly (array), note, allowOtherHost
export async function call(opts) {
  const { act, method = "GET", url, auth = true, accept = "application/json", json, raw, contentType,
    extraHeaders = {}, keepOnly = null, note = "", allowOtherHost = false, cleanup = false, maskQuery = false } = opts;
  const u = new URL(url);
  if (u.protocol !== "https:") throw new Error("non-https refused");
  if (PROD_HOSTS.has(u.host)) throw new Error(`production host refused: ${u.host}`);
  if (u.host !== EXPECTED_HOST && !allowOtherHost) throw new Error(`unexpected host refused: ${u.host}`);
  if (auth && u.host !== EXPECTED_HOST) throw new Error("token only goes to the expected staging host");
  if (!cleanup && countRequests() >= MAX_REQUESTS) throw new Error("request budget reached");
  await sleep(GAP_MS);
  if (lastRemaining !== null && lastRemaining <= 1) { await sleep(75000); lastRemaining = null; }

  const headers = { ...extraHeaders };
  if (accept) headers.Accept = accept;
  if (auth) headers.Authorization = `Bearer ${TOKEN}`;
  let body = null;
  if (json !== undefined) { body = Buffer.from(JSON.stringify(json)); headers["Content-Type"] = "application/json"; }
  if (raw) { body = raw; if (contentType) headers["Content-Type"] = contentType; }
  if (body) headers["Content-Length"] = String(body.length);

  const started = new Date();
  let res, err = null;
  try { res = await send(u, method, headers, body); } catch (e) { err = String(e.message); }
  const duration_ms = Date.now() - started.getTime();

  const text = res ? res.bytes.toString("utf8") : "";
  let parsed; try { parsed = JSON.parse(text); } catch { parsed = undefined; }
  const keep = keepOnly ? new Set(keepOnly) : null;
  const entry = {
    started_at: started.toISOString(), duration_ms, note,
    request: { method, url: scrubString(maskQuery ? forceMask(url) : url), headers: redactHeaders(headers),
      body: json !== undefined ? redact(json) : raw ? { binary_bytes: raw.length, content_type: contentType ?? null } : null },
    response: res ? { status: res.status, headers: redactHeaders(res.headers), body_bytes: res.bytes.length,
      body: parsed !== undefined ? redact(parsed, res.status >= 200 && res.status < 300 ? keep : null) : scrubString(text) } : null,
    transport_error: err
  };
  const file = path.join(netDir, `${act}.json`);
  const doc = existsSync(file) ? JSON.parse(readFileSync(file, "utf8")) : { act_id: act, captured_by: "portal-explorer", transport: "http_via_bash", redaction_applied: true, entries: [] };
  doc.entries.push(entry);
  const out = JSON.stringify(doc, null, 2);
  if (out.includes(TOKEN)) throw new Error("token value in capture, write aborted");
  writeFileSync(file, out);
  if (res?.headers?.["x-ratelimit-remaining"] !== undefined) lastRemaining = Number(res.headers["x-ratelimit-remaining"]);
  if (res?.status === 429) { const e = new Error("RATE_LIMITED: stop"); e.rateLimited = true; e.retryAfter = res.headers["retry-after"]; throw e; }
  return { status: res?.status ?? null, headers: res?.headers ?? {}, text, json: parsed, entry, err };
}

// Tóm tắt đã redact để in ra terminal.
export function brief(r, n = 600) {
  const h = r.entry.response?.headers ?? {};
  const rl = Object.fromEntries(Object.entries(h).filter(([k]) => /ratelimit|retry-after|^location$|^content-type$/i.test(k)));
  const b = r.entry.response?.body;
  return JSON.stringify({ status: r.status, err: r.err, headers: rl, body: (typeof b === "string" ? b : JSON.stringify(b))?.slice(0, n) });
}
