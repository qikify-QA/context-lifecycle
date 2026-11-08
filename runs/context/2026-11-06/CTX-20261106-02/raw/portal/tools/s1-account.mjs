import { call, brief, API_BASE } from "./capture.mjs";
const r = await call({ act: "ACT-01-01-001", url: `${API_BASE}/api/user`, keepOnly: ["id"],
  note: "account guard: GET /api/user bang token" });
console.log(brief(r, 800));
