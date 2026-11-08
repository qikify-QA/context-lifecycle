import { call, OPENAPI_BASE } from "./capture.mjs";
const r = await call({ act: "ACT-01-01-003", url: `${OPENAPI_BASE}/layer-images?per_page=1`, note: "doc path cua url item de tim dinh danh account" });
const it = r.entry.response.body?.data?.[0] ?? {};
console.log("item", JSON.stringify({ id: it.id, url: it.url, thumbnail_url: it.thumbnail_url }));
for (const p of ["layer-image-categories", "clipart-categories"]) {
  const c = await call({ act: "ACT-01-01-003", url: `${OPENAPI_BASE}/${p}?per_page=1`, note: "tim field dinh danh account o item category" });
  console.log(p, c.status, JSON.stringify(c.entry.response.body).slice(0, 420));
}
