import { call, OPENAPI_BASE } from "./capture.mjs";
const r = await call({ act: "ACT-01-01-003", url: `${OPENAPI_BASE}/layer-images?per_page=30`, note: "kiem tra tien to users/<id> tren mot trang list" });
const items = r.entry.response.body?.data ?? [];
const owners = {};
for (const it of items) { const m = String(it.url).match(/users\/(\d+)\//); const k = m ? m[1] : "none"; owners[k] = (owners[k] || 0) + 1; }
console.log(r.status, "items", items.length, "owners", JSON.stringify(owners), "rl", JSON.stringify(Object.fromEntries(Object.entries(r.headers).filter(([k]) => /ratelimit/i.test(k)))));
