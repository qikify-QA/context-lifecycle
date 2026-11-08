import { call, OPENAPI_BASE as B } from "./capture.mjs";
const rl = (r) => `${r.headers["x-ratelimit-remaining"] ?? "-"}/${r.headers["x-ratelimit-limit"] ?? "-"}`;
const sum = (tag, r) => { const b = r.entry.response?.body;
  const d = b?.data; console.log(new Date().toISOString().slice(11,19), tag, r.status, "rl", rl(r),
    Array.isArray(d) ? `n=${d.length} ids=${d.map((x) => x.id).join(",")} names=${JSON.stringify(d.slice(0,3).map((x) => x.name))} next=${b.meta?.next_cursor ? "y" : "n"}` : JSON.stringify(b).slice(0, 260),
    "ctype", r.headers["content-type"], "loc", r.headers.location ? "y" : "n"); return r; };
const p = (o) => new URLSearchParams(o).toString();

sum("no-accept+token", await call({ act: "ACT-01-01-006", url: `${B}/layer-images?per_page=1`, accept: null, note: "token hop le, khong gui header Accept" }));
sum("no-accept+no-token", await call({ act: "ACT-01-01-007", url: `${B}/layer-images?per_page=1`, accept: null, auth: false, note: "khong token, khong Accept" }));

const l1 = sum("li page1", await call({ act: "ACT-01-02-001", url: `${B}/layer-images?${p({ per_page: 2 })}`, note: "list layer images trang 1" }));
const next = l1.json?.links?.next;
if (next) sum("li page2", await call({ act: "ACT-01-02-002", url: next, note: "theo links.next" }));
const names = (l1.json?.data ?? []).map((x) => x.name);
const full = names[0] ?? "", other = names[1] ?? "zzz";
const part = full.slice(0, Math.max(3, Math.floor(full.length / 2)));
console.log("terms", JSON.stringify({ full, part, other }));
sum("li search", await call({ act: "ACT-01-02-003", url: `${B}/layer-images?${p({ per_page: 5, search: part })}`, note: "search = mot phan ten" }));
sum("li name", await call({ act: "ACT-01-02-004", url: `${B}/layer-images?${p({ per_page: 5, name: part })}`, note: "name = mot phan ten" }));
sum("li name exact", await call({ act: "ACT-01-02-005", url: `${B}/layer-images?${p({ per_page: 5, name: full })}`, note: "name = ten day du" }));
sum("li both", await call({ act: "ACT-01-02-006", url: `${B}/layer-images?${p({ per_page: 5, search: part, name: other })}`, note: "search va name khac gia tri cung luc" }));
sum("lic search", await call({ act: "ACT-01-02-007", url: `${B}/layer-image-categories?${p({ per_page: 5, search: "QA", name: "QA" })}`, note: "layer image categories voi search + name" }));
const c1 = sum("cc page1", await call({ act: "ACT-01-02-008", url: `${B}/clipart-categories?${p({ per_page: 2 })}`, note: "clipart categories trang 1" }));
if (c1.json?.links?.next) sum("cc page2", await call({ act: "ACT-01-02-009", url: c1.json.links.next, note: "theo links.next" }));
sum("cc search", await call({ act: "ACT-01-02-010", url: `${B}/clipart-categories?${p({ per_page: 5, search: "ReCheck" })}`, note: "search = mot phan ten" }));
sum("cc name", await call({ act: "ACT-01-02-011", url: `${B}/clipart-categories?${p({ per_page: 5, name: "ReCheck" })}`, note: "name = mot phan ten" }));
sum("cc both", await call({ act: "ACT-01-02-012", url: `${B}/clipart-categories?${p({ per_page: 5, search: "ReCheck", name: "zzz-no-match" })}`, note: "search khop, name khong khop" }));
