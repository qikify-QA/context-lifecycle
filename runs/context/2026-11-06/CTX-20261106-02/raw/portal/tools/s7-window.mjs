import { call, brief, OPENAPI_BASE } from "./capture.mjs";
await new Promise((r) => setTimeout(r, 100000));
const a = await call({ act: "ACT-01-01-004", url: `${OPENAPI_BASE}/layer-images?per_page=1`, auth: false, note: "khong gui Authorization" });
console.log(new Date().toISOString(), "no-token", brief(a, 200));
const b = await call({ act: "ACT-01-01-005", url: `${OPENAPI_BASE}/layer-images?per_page=1`, note: "token hop le + Accept: application/json; do cua so quota" });
console.log(new Date().toISOString(), "valid", b.status, JSON.stringify(Object.fromEntries(Object.entries(b.headers).filter(([k]) => /ratelimit|retry/i.test(k)))));
