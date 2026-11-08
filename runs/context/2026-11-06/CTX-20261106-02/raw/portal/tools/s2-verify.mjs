import { call, brief, API_BASE, OPENAPI_BASE } from "./capture.mjs";
const r = await call({ act: "ACT-01-01-001", url: `${API_BASE}/api/user`, keepOnly: ["id"],
  note: "lap lai de ghi nguyen van message 401 (lan 1 bi filter keepOnly che)" });
console.log("api/user", brief(r, 300));
// Tim spec, KHONG gui token.
const paths = [`${OPENAPI_BASE}`, `${OPENAPI_BASE}/openapi.json`, `${OPENAPI_BASE}/docs`, `${API_BASE}/openapi.json`, `${API_BASE}/openapi/docs`, `${API_BASE}/docs/openapi`];
for (const p of paths) {
  const s = await call({ act: "ACT-01-00-001", url: p, auth: false, accept: "application/json, text/html;q=0.9, */*;q=0.8", note: "tim spec, khong gui token" });
  console.log(new URL(p).pathname, brief(s, 300));
}
