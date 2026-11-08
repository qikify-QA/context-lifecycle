import { call, brief, OPENAPI_BASE } from "./capture.mjs";
const keep = ["id", "user_id", "owner_id", "instance_id", "shop_id", "store_id"];
for (const p of ["user", "me", "account", "shop", "store"]) {
  const r = await call({ act: "ACT-01-01-002", url: `${OPENAPI_BASE}/${p}`, keepOnly: keep, note: "tim endpoint dinh danh account" });
  console.log(p, brief(r, 200));
}
