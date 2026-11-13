import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, mkdir, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { restructureProduct, prepareRestructure, validateRestructureChanges } from "../restructure-knowledge.mjs";
import { applyDataMaintenance } from "../publish-apply.mjs";
import { sizeFlags, objectHealth } from "../../lib/context-health.mjs";
import { auditDir } from "../audit-preview.mjs";
import { extractOpenQuestions } from "../../lib/open-questions.mjs";
import { exists } from "../../lib/fs-utils.mjs";

const date = "2026-11-12";
const tmp = () => mkdtemp(path.join(tmpdir(), "restructure-test-"));
const write = async (root, rel, v) => {
  const file = path.join(root, rel);
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, typeof v === "string" ? v : JSON.stringify(v, null, 2));
};
const read = async (root, rel) => JSON.parse(await readFile(path.join(root, rel), "utf8"));
const item = (id, topic, extra = {}) => ({ kb_id: id, topic, statement: `statement ${id}`, knowledge_kind: "INFERRED", confidence: "LOW", scope: { environment: "staging" }, ...extra });
const check = (id, kb, extra = {}) => ({ check_id: id, title: `title ${id} ${kb.join(",")}`, steps: ["s"], expected_result: "", oracle: { kb_ids: kb, oracle_strength: "NONE" }, status: "NEEDS_CONFIRMATION", priority: "P2", ...extra });
const oq = (id, extra) => `## ${id} — NEEDS_CONFIRMATION\n\n\`\`\`json\n${JSON.stringify({ oq_id: id, type: "NEEDS_CONFIRMATION", summary: `q ${id}`, ...extra })}\n\`\`\``;

async function fixture(root) {
  await write(root, "_registry.json", { objects: [{ object_key: "o", label: "O", aliases: ["o", "f1", "f2", "f3", "screen o"] }, { object_key: "p", label: "P", aliases: ["p", "g"] }, { object_key: "old", label: "Old", aliases: ["old", "legacy screen", "h"] }] });
  for (const [o, v] of [["o", "3"], ["p", "1"], ["old", "2"]]) {
    await write(root, `${o}/publish-meta.json`, { published_context_version: v, published_at: "2026-10-01", mode: "DOC_BOOTSTRAP" });
    await write(root, `${o}/feature-summary.md`, `# ${o}\n**Published context version:** ${v}\n\nnote giữ lại\n`);
    await write(root, `${o}/CHANGELOG.md`, `# CHANGELOG — ${o}\n`);
  }
  await write(root, "o/kb.json", [item("KB-O1", "shared")]);
  await write(root, "o/features/f1/kb.json", [item("KB-1", "Alpha rule", { related_kb_ids: ["KB-2"] }), item("KB-2", "Beta rule"), item("KB-3", "Alpha edge")]);
  await write(root, "o/features/f1/profile.json", { feature_id: "FEAT-01-f1", feature_key: "f1", name: "F1", user_goal: "g1", capabilities: [{ name: "alpha", kb_refs: ["KB-1"] }, { name: "beta", kb_refs: ["KB-2"] }, { name: "plain" }] });
  await write(root, "o/checklists/f1.json", { feature_id: "FEAT-01-f1", feature_key: "f1", object_id: "o", checks: [check("CHK-001", ["KB-1"], { oq_id: "OQ-o-006" }), check("CHK-002", ["KB-2"], { oq_id: "OQ-o-002" })], coverage_by_feature_and_risk: [{ item: "a", check_ids: ["CHK-001"] }, { item: "b", check_ids: ["CHK-002"] }] });
  await write(root, "o/features/f2/kb.json", [item("KB-4", "Gamma")]);
  await write(root, "o/features/f2/profile.json", { feature_id: "FEAT-02-f2", feature_key: "f2", name: "F2", user_goal: "g2", capabilities: [{ kb_refs: ["KB-4"] }] });
  await write(root, "o/checklists/f2.json", { feature_key: "f2", checks: [check("CHK-001", ["KB-4"], { oq_id: "OQ-o-003" })] });
  await write(root, "o/features/f3/kb.json", [item("KB-5", "Delta")]);
  await write(root, "o/features/f3/profile.json", { feature_id: "FEAT-03-f3", feature_key: "f3", name: "F3", user_goal: "g3", capabilities: [] });
  await write(root, "o/checklists/f3.json", { feature_key: "f3", checks: [check("CHK-001", ["KB-5"], { oq_id: "OQ-o-004" })] });
  await write(root, "o/open-questions.md", ["# Open Questions — o", oq("OQ-o-001", { feature_id: "f1", kb_ids: ["KB-2"] }), oq("OQ-o-002", { feature_id: "f1", check_ids: ["CHK-002"] }), oq("OQ-o-003", { feature_id: "FEAT-02-f2" }), oq("OQ-o-004", { feature_id: "f3", check_ids: ["CHK-001"] }), oq("OQ-o-006", { feature_id: "f1", check_ids: ["CHK-001"] })].join("\n\n") + "\n");
  await write(root, "p/kb.json", []);
  await write(root, "p/features/g/kb.json", [item("KB-1", "other object same id", { related_kb_ids: ["o/f1#KB-2"] })]);
  await write(root, "p/features/g/profile.json", { feature_key: "g", capabilities: [{ kb_refs: ["o/f1#KB-1", "KB-1"] }] });
  await write(root, "p/open-questions.md", "# Open Questions — p\n");
  await write(root, "old/kb.json", []);
  await write(root, "old/features/h/kb.json", [item("KB-9", "Admin screen")]);
  await write(root, "old/features/h/profile.json", { feature_key: "h", capabilities: [{ kb_refs: ["KB-9"] }] });
  await write(root, "old/open-questions.md", "# Open Questions — old\n\n" + oq("OQ-old-001", { feature_id: "h", kb_ids: ["KB-9"] }) + "\n");
}

const mapping = {
  product: "prod",
  new_objects: { n: { label: "New entity", aliases: ["screen o"] } },
  operations: [
    { op: "split", from: "o/f1", parts: [{ to: "n/beta", name: "Beta", user_goal: "beta goal", topic_match: ["^Beta"] }, { to: "o/f1", rest: true }] },
    { op: "merge", sources: ["o/f2", "o/f3"], into: "o/f2", name: "F2+F3" },
    { op: "move", from: "old/h", to: "o/f2" }
  ]
};

test("size flags follow contract §5 thresholds", () => {
  assert.deepEqual(sizeFlags({ featureKb: { a: 41, b: 4 }, objectKb: 0 }).flags, ["oversized_feature", "undersized_feature"]);
  assert.deepEqual(sizeFlags({ featureKb: Object.fromEntries([...Array(11)].map((_, i) => [`f${i}`, 20])), objectKb: 31 }).flags, ["too_many_features", "oversized_object"]);
  assert.deepEqual(sizeFlags({ featureKb: { a: 20 }, summaryBytes: 11 * 1024 }).flags, ["oversized_summary"]);
  assert.deepEqual(sizeFlags({ featureKb: { a: 8, b: 40 } }).flags, []);
});

test("objectHealth reports size per feature", async () => {
  const root = await tmp();
  await fixture(root);
  const h = await objectHealth(path.join(root, "o"));
  assert.equal(h.size.features, 3);
  assert.ok(h.flags.includes("undersized_feature"));
  assert.deepEqual(h.size.undersized_features.map((x) => x.feature_key), ["f1", "f2", "f3"]);
});

test("restructure moves KB/checks/OQ, rewrites references and keeps totals", async () => {
  const root = await tmp();
  await fixture(root);
  const result = await restructureProduct(root, mapping, { date, product: "prod" });
  assert.deepEqual(result.totals, { kb: 8, checks: 4, oqs: 6 });
  assert.deepEqual(result.removed, ["old"]);
  assert.equal(await exists(path.join(root, "old")), false);
  assert.equal(await exists(path.join(root, "o/features/f3")), false);

  // split: Beta → object mới, phần còn lại giữ key; check đi theo KB oracle
  assert.deepEqual((await read(root, "n/features/beta/kb.json")).map((i) => i.kb_id), ["KB-2"]);
  assert.deepEqual((await read(root, "o/features/f1/kb.json")).map((i) => i.kb_id), ["KB-1", "KB-3"]);
  assert.deepEqual((await read(root, "o/features/f1/kb.json"))[0].related_kb_ids, ["n/beta#KB-2"]);
  const beta = await read(root, "n/checklists/beta.json");
  assert.deepEqual(beta.checks.map((c) => c.check_id), ["CHK-002"]);
  assert.equal(beta.object_id, "n");
  assert.deepEqual(beta.coverage_by_feature_and_risk.map((c) => c.item), ["b"]);
  const betaProfile = await read(root, "n/features/beta/profile.json");
  assert.equal(betaProfile.name, "Beta");
  assert.deepEqual(betaProfile.capabilities.map((c) => c.name), ["beta"]);
  assert.deepEqual((await read(root, "o/features/f1/profile.json")).capabilities.map((c) => c.name), ["alpha", "plain"]);

  // merge + move: check_id trùng được đánh số tiếp, giữ previous_check_id
  const f2 = await read(root, "o/checklists/f2.json");
  assert.deepEqual((await read(root, "o/features/f2/kb.json")).map((i) => i.kb_id), ["KB-4", "KB-5", "KB-9"]);
  assert.deepEqual(f2.checks.map((c) => c.check_id), ["CHK-001", "CHK-002"]);
  assert.deepEqual(f2.checks[1].previous_check_id, { feature_key: "f3", check_id: "CHK-001" });
  assert.equal((await read(root, "o/features/f2/profile.json")).name, "F2+F3");

  // reference từ object khác được viết lại; ref không đổi đích giữ nguyên chuỗi gốc
  assert.deepEqual((await read(root, "p/features/g/kb.json"))[0].related_kb_ids, ["n/beta#KB-2"]);
  assert.deepEqual((await read(root, "p/features/g/profile.json")).capabilities[0].kb_refs, ["o/f1#KB-1", "KB-1"]);

  // OQ: chuyển object thì mint id mới + supersedes, reference oq_id được viết lại
  const nOq = extractOpenQuestions(await readFile(path.join(root, "n/open-questions.md"), "utf8"));
  assert.deepEqual(nOq.map((q) => [q.oq_id, q.supersedes, q.feature_id]), [["OQ-n-001", "OQ-o-001", "beta"], ["OQ-n-002", "OQ-o-002", "beta"]]);
  assert.equal(beta.checks[0].oq_id, "OQ-n-002");
  const oOq = extractOpenQuestions(await readFile(path.join(root, "o/open-questions.md"), "utf8"));
  assert.deepEqual(oOq.map((q) => [q.oq_id, q.feature_id]).sort(), [["OQ-o-003", "FEAT-02-f2"], ["OQ-o-004", "f2"], ["OQ-o-006", "f1"], ["OQ-o-007", "f2"]]);
  assert.equal(oOq.find((q) => q.oq_id === "OQ-o-007").supersedes, "OQ-old-001");
  assert.deepEqual(oOq.find((q) => q.oq_id === "OQ-o-004").check_ids, ["CHK-002"]);

  // registry, version, prose
  const reg = await read(root, "_registry.json");
  assert.deepEqual(reg.objects.map((o) => o.object_key), ["o", "p", "n"]);
  const n = reg.objects.find((o) => o.object_key === "n");
  assert.equal(n.label, "New entity");
  assert.ok(n.aliases.includes("screen o") && n.aliases.includes("beta"));
  const o = reg.objects.find((x) => x.object_key === "o");
  assert.ok(!o.aliases.includes("screen o"));
  assert.ok(o.aliases.includes("legacy screen") && o.aliases.includes("old") && o.aliases.includes("f3"));
  assert.equal((await read(root, "o/publish-meta.json")).published_context_version, "4");
  assert.equal((await read(root, "n/publish-meta.json")).published_context_version, "1");
  assert.equal((await read(root, "n/publish-meta.json")).mode, "DOC_BOOTSTRAP");
  assert.equal((await read(root, "p/publish-meta.json")).published_context_version, "2");
  assert.match(await readFile(path.join(root, "p/feature-summary.md"), "utf8"), /^# p\n\*\*Published context version:\*\* 2\n\nnote giữ lại/);
  assert.match(await readFile(path.join(root, "o/feature-summary.md"), "utf8"), /\| `f2` — F2\+F3 \|/);
  assert.match(await readFile(path.join(root, "o/CHANGELOG.md"), "utf8"), /\(restructure-2026-11-12\)/);
  assert.equal((await auditDir(root)).ok, true);
});

test("restructure refuses kb_id collisions, empty new objects and undeclared objects", async () => {
  for (const [ops, extra, pattern] of [
    [[{ op: "move", from: "p/g", to: "o/f1" }], {}, /trùng kb_id KB-1/],
    [[{ op: "move", from: "o/f3", to: "x/f3" }], {}, /phải khai label/],
    [[{ op: "split", from: "o/f1", parts: [{ to: "o/a", topic_match: ["x"] }] }], {}, /đúng 1 part "rest"/]
  ]) {
    const root = await tmp();
    await fixture(root);
    await assert.rejects(restructureProduct(root, { product: "prod", operations: ops, ...extra }, { date }), pattern);
  }
});

test("preview + apply writes, deletes moved files and refuses content edits", async () => {
  const root = await tmp();
  await fixture(path.join(root, "products/prod"));
  await write(root, "manifest.json", "original manifest");
  const plan = await prepareRestructure(mapping, { knowledgeDir: root, date });
  assert.equal(plan.summary.audit.ok, true);
  assert.ok(plan.changes.some((c) => c.after === null && c.rel === path.join("products/prod/old/features/h/kb.json")));
  await applyDataMaintenance(plan, { targetDir: root, lockDir: path.join(root, ".locks"), regenerate: async () => {}, validate: validateRestructureChanges });
  assert.equal(await exists(path.join(root, "products/prod/old")), false);
  assert.deepEqual((await read(root, "products/prod/n/features/beta/kb.json")).map((i) => i.kb_id), ["KB-2"]);

  const edited = plan.changes.map((c) => ({ ...c }));
  const target = edited.find((c) => c.after && c.rel.endsWith("n/features/beta/kb.json"));
  target.after = Buffer.from(JSON.stringify([{ ...JSON.parse(target.after)[0], statement: "changed" }]));
  assert.throws(() => validateRestructureChanges(edited), /restructure_preservation_failed/);
});
