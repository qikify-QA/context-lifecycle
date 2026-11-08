import { call, OPENAPI_BASE as B } from "./capture.mjs";
for (const [act, p] of [["ACT-01-03-002", "uploads"], ["ACT-01-03-003", "layer-images"]]) {
  const r = await call({ act, method: "POST", url: `${B}/${p}`, json: {}, note: "POST rong de doc validation, khong co du lieu de tao" });
  const b = r.entry.response?.body;
  console.log(new Date().toISOString().slice(11,19), p, r.status, "rl", r.headers["x-ratelimit-remaining"] ?? "-", "allow", r.headers.allow ?? "-", JSON.stringify(typeof b === "object" ? { message: b.message, errors: b.errors, keys: Object.keys(b) } : b).slice(0, 700));
}
