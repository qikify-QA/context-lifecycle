import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, mkdir, readFile, writeFile, readdir } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { restructureProduct, prepareRestructure, findStaleReferences } from "../restructure-knowledge.mjs";
import { extractOpenQuestions, patchOpenQuestions } from "../../lib/open-questions.mjs";
import { walk } from "../../lib/fs-utils.mjs";

const date = "2026-11-13";
const tmp = () => mkdtemp(path.join(tmpdir(), "restructure-scope-"));
const write = async (root, rel, v) => {
  const file = path.join(root, rel);
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, typeof v === "string" ? v : JSON.stringify(v, null, 2) + "\n");
};
const read = async (root, rel) => JSON.parse(await readFile(path.join(root, rel), "utf8"));
const text = (root, rel) => readFile(path.join(root, rel), "utf8");
const item = (id, extra = {}) => ({ kb_id: id, topic: `topic ${id}`, statement: `statement ${id}`, knowledge_kind: "INFERRED", confidence: "LOW", scope: { environment: "staging" }, ...extra });
const check = (id, kb, extra = {}) => ({ check_id: id, title: `title ${id}`, steps: ["s"], expected_result: "", oracle: { kb_ids: kb, oracle_strength: "NONE" }, status: "PROPOSED", priority: "P2", ...extra });
const oqBlock = (q) => `## ${q.oq_id} — ${q.type}\n\n\`\`\`json\n${JSON.stringify(q)}\n\`\`\``;
const oqHead = (title, n) => `# Open Questions — ${title}\n\nProse đầu file phải giữ nguyên.\n\n## Tóm tắt\n\n| Loại | Số lượng |\n|---|---|\n| NEEDS_CONFIRMATION | ${n} |\n| **Tổng** | **${n}** |\n`;

/** a: object nguồn; t: object đích ĐÃ CÓ (FEAT-01, OQ-t-001..002); s: object không liên quan. */
async function fixture(root) {
  await write(root, "_registry.json", { objects: [{ object_key: "a", label: "A", aliases: ["a", "tools", "tool alias"] }, { object_key: "t", label: "T", aliases: ["t", "conn"] }, { object_key: "s", label: "S", aliases: ["s"] }] });
  await write(root, "_product-guide.md", "# Guide\n\n| `a` | tool ở `a/tools`, khác `a/tools-extra` |\n");
  for (const [o, v] of [["a", "7"], ["t", "1"], ["s", "3"]]) {
    await write(root, `${o}/publish-meta.json`, { published_context_version: v, published_at: "2026-11-01", mode: "CCR_INGEST" });
    await write(root, `${o}/feature-summary.md`, `# ${o}\n**Published context version:** ${v}\n\nprose ${o}\n`);
    await write(root, `${o}/CHANGELOG.md`, `# CHANGELOG — ${o}\n- lịch sử nhắc a/tools giữ nguyên\n`);
    await write(root, `${o}/kb.json`, []);
  }
  // a/tools: feature bị chuyển, profile mang ref ngoài field chuẩn + feature_id lồng nhau
  await write(root, "a/features/tools/kb.json", [item("KB-10"), item("KB-11", { related_kb_ids: ["KB-10"] })]);
  await write(root, "a/features/tools/profile.json", {
    feature_id: "FEAT-05-tools", feature_key: "tools", name: "Tools", user_goal: "g",
    user_goal_kb_refs: ["a/tools#KB-10"],
    surface_mapping: { api: ["a/tools#KB-10", "a/tools#KB-11"] },
    coverage_matrix: [{ feature_id: "FEAT-05-tools", kb_refs: ["a/tools#KB-11"] }]
  });
  await write(root, "a/checklists/tools.json", { feature_id: "FEAT-05-tools", feature_key: "tools", object_id: "a", checks: [check("CHK-001", ["a/tools#KB-10"], { status: "NEEDS_CONFIRMATION", oq_id: "OQ-a-002" })], coverage_by_feature_and_risk: [{ feature_id: "FEAT-05-tools", check_ids: ["CHK-001"] }] });
  // a/other: ở lại, tham chiếu sang a/tools bằng field không chuẩn
  await write(root, "a/features/other/kb.json", [item("KB-20", { related_kb_ids: ["a/tools#KB-11"] }), item("KB-21")]);
  await write(root, "a/features/other/profile.json", { feature_id: "FEAT-06-other", feature_key: "other", name: "Other", user_goal: "g", dependencies: [{ statement: "dùng FEAT-05-tools", cross_feature_kb_refs: ["a/tools#KB-10"] }] });
  await write(root, "a/checklists/other.json", { feature_id: "FEAT-06-other", feature_key: "other", object_id: "a", checks: [check("CHK-001", ["KB-20"], { status: "NEEDS_CONFIRMATION", oq_id: "OQ-a-001" })] });
  await write(root, "a/open-questions.md", [
    oqHead("A", 4),
    oqBlock({ oq_id: "OQ-a-001", type: "NEEDS_CONFIRMATION", feature_id: "other", kb_ids: ["KB-21"], summary: "ở lại" }),
    oqBlock({ oq_id: "OQ-a-002", type: "NEEDS_CONFIRMATION", feature_id: "tools", kb_ids: ["KB-10"], summary: "đi theo feature" }),
    // feature_id lệch với kb_ids, nhưng không dính mapping: không được "bỏ phiếu" lại
    oqBlock({ oq_id: "OQ-a-003", type: "NEEDS_CONFIRMATION", feature_id: "other", kb_ids: ["KB-20"], summary: "ở lại" }),
    oqBlock({ oq_id: "OQ-a-004", type: "NEEDS_CONFIRMATION", feature_id: "other", kb_ids: ["KB-21"], related_oq_ids: ["OQ-a-002"], summary: "trỏ OQ bị chuyển" })
  ].join("\n\n") + "\n");
  // t: object đích đã publish
  await write(root, "t/features/conn/kb.json", [item("KB-50")]);
  await write(root, "t/features/conn/profile.json", { feature_id: "FEAT-01-conn", feature_key: "conn", name: "Conn", user_goal: "g", profile_relationships: [{ from_feature_id: "FEAT-01-conn", to_feature_id: "a/tools (FEAT-05)", kb_refs: ["KB-50"] }] });
  await write(root, "t/checklists/conn.json", { feature_id: "FEAT-01-conn", feature_key: "conn", object_id: "t", checks: [check("CHK-001", ["KB-50"], { status: "NEEDS_CONFIRMATION", oq_id: "OQ-t-001" })] });
  await write(root, "t/open-questions.md", [oqHead("T", 2), oqBlock({ oq_id: "OQ-t-001", type: "NEEDS_CONFIRMATION", feature_id: "conn", summary: "x" }), oqBlock({ oq_id: "OQ-t-002", type: "NEEDS_CONFIRMATION", feature_id: "conn", summary: "y" })].join("\n\n") + "\n");
  // s: không liên quan; OQ có feature_id khác feature chứa kb_ids của nó (bản cũ re-assign sai)
  await write(root, "s/features/nav/kb.json", [item("KB-1")]);
  await write(root, "s/features/buyer/kb.json", [item("KB-2"), item("KB-3")]);
  await write(root, "s/features/nav/profile.json", { feature_id: "FEAT-01-nav", feature_key: "nav", name: "Nav", user_goal: "g" });
  await write(root, "s/features/buyer/profile.json", { feature_id: "FEAT-02-buyer", feature_key: "buyer", name: "Buyer", user_goal: "g" });
  await write(root, "s/open-questions.md", "# Open Questions — S\n\nBảng đếm tay | 1 |\n\n" + oqBlock({ oq_id: "OQ-s-112", type: "NEEDS_CONFIRMATION", feature_id: "nav", kb_ids: ["KB-2", "KB-3"], summary: "giữ nav" }) + "\n");
}

const mapping = (targetForm = "existing_objects") => ({
  product: "prod",
  [targetForm]: { t: { label: "T", aliases: ["tool alias"] } },
  operations: [{ op: "move", from: "a/tools", to: "t/tools" }]
});

async function snapshot(dir) {
  const out = {};
  for (const f of await walk(dir)) out[path.relative(dir, f)] = await readFile(f, "utf8");
  return out;
}

test("restructure only touches OQs and objects involved in the mapping", async () => {
  const root = await tmp();
  await fixture(root);
  const before = await snapshot(root);
  const result = await restructureProduct(root, mapping(), { date, product: "prod" });
  const after = await snapshot(root);
  assert.deepEqual(result.objects, ["a", "t"]);
  for (const rel of Object.keys(before).filter((r) => r.startsWith("s/"))) assert.equal(after[rel], before[rel], `${rel} phải giữ nguyên byte`);
  // OQ không dính mapping giữ feature_id, kể cả khi kb_ids nằm ở feature khác
  const a = extractOpenQuestions(after["a/open-questions.md"]);
  assert.deepEqual(a.map((q) => [q.oq_id, q.feature_id]), [["OQ-a-001", "other"], ["OQ-a-003", "other"], ["OQ-a-004", "other"]]);
  assert.deepEqual(a.find((q) => q.oq_id === "OQ-a-004").related_oq_ids, ["OQ-t-003"]);
  // open-questions.md được sửa tại chỗ: prose đầu file còn, bảng đếm cập nhật, entry khác giữ nguyên byte
  assert.match(after["a/open-questions.md"], /Prose đầu file phải giữ nguyên\./);
  assert.match(after["a/open-questions.md"], /\| NEEDS_CONFIRMATION \| 3 \|\n\| \*\*Tổng\*\* \| \*\*3\*\* \|/);
  const block1 = before["a/open-questions.md"].split("\n\n## ").find((b) => b.startsWith("OQ-a-001"));
  assert.ok(after["a/open-questions.md"].includes(block1));
});

test("restructure rewrites non-standard refs and nested feature ids; audit has no stale refs", async () => {
  const root = await tmp();
  await fixture(root);
  await restructureProduct(root, mapping(), { date, product: "prod" });
  const profile = await read(root, "t/features/tools/profile.json");
  assert.equal(profile.feature_id, "FEAT-02-tools");
  assert.deepEqual(profile.surface_mapping.api, ["t/tools#KB-10", "t/tools#KB-11"]);
  assert.equal(profile.coverage_matrix[0].feature_id, "FEAT-02-tools");
  const cl = await read(root, "t/checklists/tools.json");
  assert.equal(cl.coverage_by_feature_and_risk[0].feature_id, "FEAT-02-tools");
  assert.equal(cl.object_id, "t");
  const other = await read(root, "a/features/other/profile.json");
  assert.deepEqual(other.dependencies[0].cross_feature_kb_refs, ["t/tools#KB-10"]);
  assert.equal(other.dependencies[0].statement, "dùng FEAT-02-tools");
  assert.deepEqual((await read(root, "a/features/other/kb.json"))[0].related_kb_ids, ["t/tools#KB-11"]);
  assert.equal((await read(root, "t/features/conn/profile.json")).profile_relationships[0].to_feature_id, "t/tools (FEAT-02)");
  assert.equal(await text(root, "_product-guide.md"), "# Guide\n\n| `a` | tool ở `t/tools`, khác `a/tools-extra` |\n");
  assert.match(await text(root, "a/CHANGELOG.md"), /lịch sử nhắc a\/tools giữ nguyên/);
});

test("restructure reuses an existing target object: ids continue, version bumps, aliases merge", async () => {
  const root = await tmp();
  await fixture(root);
  await assert.rejects(restructureProduct(root, mapping("new_objects"), { date, product: "prod" }), /object t đã tồn tại — chuyển khai báo từ new_objects sang existing_objects/);
  await assert.rejects(restructureProduct(root, { ...mapping(), existing_objects: { zz: {} } }, { date, product: "prod" }), /existing_objects: object zz không tồn tại/);
  const before = await text(root, "t/open-questions.md");
  await restructureProduct(root, mapping(), { date, product: "prod" });
  assert.deepEqual((await readdir(path.join(root, "t/features"))).sort(), ["conn", "tools"]);
  assert.equal((await read(root, "t/features/conn/profile.json")).feature_id, "FEAT-01-conn");
  assert.equal((await read(root, "t/publish-meta.json")).published_context_version, "2");
  assert.equal((await read(root, "a/publish-meta.json")).published_context_version, "8");
  const tText = await text(root, "t/open-questions.md");
  assert.ok(tText.startsWith(before.trimEnd()) || tText.includes(before.split("## OQ-t-001")[1]), "OQ có sẵn của t giữ nguyên");
  assert.match(tText, /\| NEEDS_CONFIRMATION \| 3 \|\n\| \*\*Tổng\*\* \| \*\*3\*\* \|/);
  const t = extractOpenQuestions(tText);
  assert.deepEqual(t.map((q) => [q.oq_id, q.feature_id, q.supersedes ?? null]), [["OQ-t-001", "conn", null], ["OQ-t-002", "conn", null], ["OQ-t-003", "tools", "OQ-a-002"]]);
  assert.equal((await read(root, "t/checklists/tools.json")).checks[0].oq_id, "OQ-t-003");
  const reg = await read(root, "_registry.json");
  const tReg = reg.objects.find((o) => o.object_key === "t");
  assert.equal(tReg.label, "T");
  assert.ok(tReg.aliases.includes("conn") && tReg.aliases.includes("tool alias") && tReg.aliases.includes("tools"));
  assert.ok(!reg.objects.find((o) => o.object_key === "a").aliases.includes("tool alias"));
});

test("preview is a dry run and its audit blocks on stale references left in protected fields", async () => {
  const root = await tmp();
  await fixture(path.join(root, "products/prod"));
  const clean = await prepareRestructure(mapping(), { knowledgeDir: root, date });
  assert.equal(clean.summary.audit.ok, true, JSON.stringify(clean.summary.audit.blocking));
  assert.equal(clean.summary.audit.blocking.filter((b) => b.audit === "restructure-stale-reference").length, 0);
  assert.deepEqual(clean.summary.objects, ["a", "t"]);
  assert.equal(await text(root, "products/prod/a/features/tools/kb.json").then(() => "kept"), "kept");

  // KB statement là field bảo vệ: không được viết lại, nên audit phải chặn
  await write(root, "products/prod/a/features/other/kb.json", [item("KB-20", { statement: "xem a/tools#KB-10" }), item("KB-21")]);
  const plan = await prepareRestructure(mapping(), { knowledgeDir: root, date });
  assert.equal(plan.summary.audit.ok, false);
  const stale = plan.summary.audit.blocking.filter((b) => b.audit === "restructure-stale-reference");
  assert.deepEqual(stale.map((b) => [b.file, b.path]), [["a/features/other/kb.json", "/0/statement"]]);
  assert.deepEqual(await findStaleReferences(path.join(plan.preview, "prod"), { kbReloc: new Map(), keys: [], feats: [] }), []);
});

test("patchOpenQuestions falls back when an OQ is not in its own block", () => {
  const q = { oq_id: "OQ-x-001", type: "NEEDS_CONFIRMATION", summary: "a" };
  assert.equal(patchOpenQuestions(`# H\n\n\`\`\`json\n${JSON.stringify(q)}\n\`\`\`\n`, { remove: new Set(["OQ-x-001"]) }), null);
  const spaced = `# H\n\n## OQ-x-001 — NEEDS_CONFIRMATION\n\n\`\`\`json\n{"oq_id": "OQ-x-001", "type": "NEEDS_CONFIRMATION", "summary": "a"}\n\`\`\`\n`;
  const out = patchOpenQuestions(spaced, { replace: new Map([["OQ-x-001", { ...q, type: "CONFLICT" }]]) });
  assert.equal(out, `# H\n\n## OQ-x-001 — CONFLICT\n\n\`\`\`json\n{"oq_id": "OQ-x-001", "type": "CONFLICT", "summary": "a"}\n\`\`\`\n`);
});
