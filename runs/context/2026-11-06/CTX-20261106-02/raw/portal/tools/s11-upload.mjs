import { call, OPENAPI_BASE as B, runDir } from "./capture.mjs";
import { writeFileSync, readFileSync, existsSync } from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

const PREFIX = "QA-CTX-20261106-02-";
const FILENAME = `${PREFIX}a.png`;
const tools = path.join(runDir, "raw/portal/tools");
const statePath = path.join(tools, "created-assets.json");
const state = { created: [], deleted: [], notes: [] };
const save = () => writeFileSync(statePath, JSON.stringify(state, null, 2));
const log = (...a) => console.log(new Date().toISOString().slice(11, 19), ...a);
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const show = (tag, r) => { const b = r.entry.response?.body; log(tag, r.status, "rl", r.headers["x-ratelimit-remaining"] ?? "-", JSON.stringify(b ?? null).slice(0, 620)); return r; };

function png() { // PNG 32x32 hop le, sinh tai cho
  const crcT = Array.from({ length: 256 }, (_, n) => { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; return c >>> 0; });
  const crc = (b) => { let c = ~0; for (const x of b) c = crcT[(c ^ x) & 255] ^ (c >>> 8); return (~c) >>> 0; };
  const chunk = (t, d) => { const l = Buffer.alloc(4); l.writeUInt32BE(d.length); const td = Buffer.concat([Buffer.from(t), d]); const c = Buffer.alloc(4); c.writeUInt32BE(crc(td)); return Buffer.concat([l, td, c]); };
  const ihdr = Buffer.alloc(13); ihdr.writeUInt32BE(32, 0); ihdr.writeUInt32BE(32, 4); ihdr[8] = 8; ihdr[9] = 2;
  const row = Buffer.concat([Buffer.from([0]), Buffer.alloc(96, 0x5a)]);
  return Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk("IHDR", ihdr), chunk("IDAT", zlib.deflateSync(Buffer.concat(Array(32).fill(row)))), chunk("IEND", Buffer.alloc(0))]);
}
const fixture = path.join(tools, "fixtures", FILENAME);
if (!existsSync(fixture)) writeFileSync(fixture, png());
const file = readFileSync(fixture);

const findStr = (o, re) => { if (!o || typeof o !== "object") return undefined; for (const [k, v] of Object.entries(o)) { if (typeof v === "string" && re.test(k)) return v; if (v && typeof v === "object") { const x = findStr(v, re); if (x) return x; } } };
const assetOf = (r) => (r.json?.data && !Array.isArray(r.json.data) ? r.json.data : r.json);
function record(r, how) {
  const a = assetOf(r);
  if (r.status >= 200 && r.status < 300 && a?.id != null && !state.created.some((x) => x.id === a.id)) {
    state.created.push({ id: a.id, name: a.name, how }); save();
    log("CREATED", a.id, a.name);
  }
  return a;
}
async function reserve(act) {
  const r = await call({ act, method: "POST", url: `${B}/uploads`, json: { filename: FILENAME, filesize: file.length }, note: "xin upload URL" });
  show("uploads", r);
  if (r.status < 200 || r.status >= 300) throw new Error("uploads not 2xx");
  const url = findStr(r.json, /upload_?url|^url$/i), id = (r.json?.data ?? r.json)?.upload_id ?? (r.json?.data ?? r.json)?.id;
  if (!url || id == null) throw new Error("upload url/id not found in response");
  const u = new URL(url);
  const prodLike = (/\.?teeinblue\.com$/.test(u.host) && !/staging/.test(u.host)) || (/teeinblue/.test(u.host + u.pathname) && !/staging/.test(u.host + u.pathname));
  state.notes.push({ upload_host: u.host, path_prefix: u.pathname.split("/").slice(0, 3).join("/"), production_like: prodLike }); save();
  log("upload host", u.host, "path", u.pathname, "prodLike", prodLike);
  if (prodLike) { const e = new Error("BLOCKED: production-like upload host, PUT not sent"); e.blocked = true; throw e; }
  const meta = r.json?.data ?? r.json;
  return { url, id, hdrs: meta.headers && typeof meta.headers === "object" ? meta.headers : {}, method: (meta.method || "PUT").toUpperCase() };
}
const put = async (act, up) => show("PUT", await call({ act, method: up.method, url: up.url, auth: false, accept: null, raw: file, contentType: up.hdrs["Content-Type"] ?? up.hdrs["content-type"] ?? "image/png",
  extraHeaders: Object.fromEntries(Object.entries(up.hdrs).filter(([k]) => !/^content-type$/i.test(k))), allowOtherHost: true, maskQuery: true, note: "PUT file len upload URL, khong gui token" }));

async function flow() {
  show("before list", await call({ act: "ACT-01-03-004", url: `${B}/layer-images?name=${encodeURIComponent(FILENAME)}`, note: "before: list theo ten" }));
  const up = await reserve("ACT-01-03-005");
  const early = show("finalize-early", await call({ act: "ACT-01-03-006", method: "POST", url: `${B}/layer-images`, json: { upload_id: up.id }, note: "finalize truoc khi PUT" }));
  record(early, "finalize-before-put");
  const p = await put("ACT-01-03-007", up);
  if (p.status < 200 || p.status >= 300) throw new Error("PUT not 2xx");
  const fin = show("finalize", await call({ act: "ACT-01-03-008", method: "POST", url: `${B}/layer-images`, json: { upload_id: up.id }, note: "finalize sau PUT" }));
  let a = record(fin, "finalize");
  if (!state.created.length) throw new Error("no asset created by finalize");
  const id = state.created[0].id;

  let status = a?.status, url = a?.url, polls = 0;
  for (const delay of [30000, 60000, 90000]) {
    if (status && status !== "processing" && url) break;
    await wait(delay); polls++;
    const g = show(`poll${polls}`, await call({ act: "ACT-01-03-009", url: `${B}/layer-images/${id}`, note: "doc item theo doi status" }));
    a = assetOf(g); status = a?.status; url = a?.url;
  }
  log("final status", status, "url", url, "polls", polls);
  const owner = String(url ?? a?.thumbnail_url ?? "").match(/users\/(\d+)\//)?.[1] ?? null;
  state.notes.push({ created_asset_owner_path_id: owner }); save();
  log("OWNER", owner);
  if (owner !== null && owner !== "266") { const e = new Error("BLOCKED: asset owner is not 266"); e.blocked = true; throw e; }

  const dupProbe = show("on_duplicate probe", await call({ act: "ACT-01-04-001", method: "POST", url: `${B}/layer-images`, json: { on_duplicate: "__invalid__" }, note: "gia tri sai de doc validation, khong co upload_id nen khong tao gi" }));
  const dupKnown = Boolean(dupProbe.json?.errors?.on_duplicate);
  log("on_duplicate known", dupKnown);
  if (dupKnown && state.created.length <= 1) {
    const up2 = await reserve("ACT-01-04-002");
    const p2 = await put("ACT-01-04-003", up2);
    if (p2.status >= 200 && p2.status < 300) record(show("on_duplicate=skip", await call({ act: "ACT-01-04-004", method: "POST", url: `${B}/layer-images`, json: { upload_id: up2.id, on_duplicate: "skip" }, note: "ten trung asset run vua tao, on_duplicate=skip" })), "on_duplicate-skip");
  } else state.notes.push({ on_duplicate_flow_skipped: !dupKnown ? "param not recognised by validation" : "asset cap" });
  save();

  if (state.created.length <= 1) record(show("reuse upload_id", await call({ act: "ACT-01-05-001", method: "POST", url: `${B}/layer-images`, json: { upload_id: up.id }, note: "dung lai upload_id da finalize" })), "reuse-upload-id");
  else state.notes.push({ reuse_upload_id_skipped: "asset count > 1" });
  save();
}
async function retry(fn) { try { return await fn(); } catch (e) { if (e.rateLimited) { log("429 in cleanup, wait"); await wait(70000); return fn(); } throw e; } }
async function cleanup() {
  let n = 1;
  for (const it of state.created) {
    if (!String(it.name ?? "").startsWith(PREFIX)) { log("SKIP delete, prefix mismatch", it.id, it.name); state.notes.push({ delete_skipped: it.id }); continue; }
    const d = show(`delete ${it.id}`, await retry(() => call({ act: `ACT-01-06-00${n}`, method: "DELETE", url: `${B}/layer-images/${it.id}`, cleanup: true, note: "cleanup asset do run tao" })));
    const g = show(`get-after ${it.id}`, await retry(() => call({ act: `ACT-01-06-00${n + 1}`, url: `${B}/layer-images/${it.id}`, cleanup: true, note: "xac nhan da mat" })));
    if (d.status >= 200 && d.status < 300 && g.status === 404) state.deleted.push(it.id);
    n += 2; save();
  }
  show("list-after", await retry(() => call({ act: `ACT-01-06-00${n}`, url: `${B}/layer-images?name=${encodeURIComponent(FILENAME)}`, cleanup: true, note: "list theo ten sau cleanup" })));
  if (state.created[0]?.name) show("list-after-asset-name", await retry(() => call({ act: `ACT-01-06-00${n + 1}`, url: `${B}/layer-images?name=${encodeURIComponent(state.created[0].name)}`, cleanup: true, note: "list theo ten asset sau cleanup" })));
  save();
}
try { await flow(); } catch (e) { log("FLOW STOP:", e.message); state.notes.push({ flow_stop: e.message }); save(); }
finally { try { await cleanup(); } catch (e) { log("CLEANUP ERROR:", e.message); state.notes.push({ cleanup_error: e.message }); save(); } }
log("STATE", JSON.stringify(state));
