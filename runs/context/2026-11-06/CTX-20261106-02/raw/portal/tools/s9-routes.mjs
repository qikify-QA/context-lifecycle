import { call, OPENAPI_BASE as B } from "./capture.mjs";
const paths = ["layer-images/10277", "layer-images/upload-url", "layer-images/uploads", "layer-images/upload", "uploads", "upload-url", "temporary-files/upload-url", "assets/upload-url", "cliparts?per_page=1", "cliparts?per_page=1&search=qa"];
for (const p of paths) {
  const r = await call({ act: "ACT-01-03-001", url: `${B}/${p}`, note: "xac dinh route that bang GET, khong POST len route doan" });
  const b = r.entry.response?.body;
  console.log(new Date().toISOString().slice(11,19), p, r.status, "rl", r.headers["x-ratelimit-remaining"] ?? "-", "allow", r.headers.allow ?? "-", JSON.stringify(typeof b === "object" ? (b.message ?? Object.keys(b.data ?? b)) : b).slice(0, 170));
}
