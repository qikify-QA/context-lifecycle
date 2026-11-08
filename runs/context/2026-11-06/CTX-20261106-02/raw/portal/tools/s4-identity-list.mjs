import { call, brief, OPENAPI_BASE } from "./capture.mjs";
const keep = ["id", "user_id", "owner_id", "instance_id", "shop_id", "store_id", "current_page", "per_page", "total", "last_page", "status"];
const keysOf = (o, d = 0) => (o && typeof o === "object" && d < 3) ? Object.fromEntries(Object.entries(o).slice(0, 40).map(([k, v]) => [k, Array.isArray(v) ? [keysOf(v[0], d + 1)] : keysOf(v, d + 1)])) : typeof o;
for (const p of ["layer-images", "layer-image-categories", "clipart-categories"]) {
  const r = await call({ act: "ACT-01-01-003", url: `${OPENAPI_BASE}/${p}?per_page=1`, keepOnly: keep, note: "xac minh dinh danh qua item list read-only" });
  console.log(p, r.status, r.status === 200 ? JSON.stringify(keysOf(r.entry.response.body)) : brief(r, 160));
  if (r.status === 200) { console.log(JSON.stringify(r.entry.response.body).slice(0, 700)); break; }
}
