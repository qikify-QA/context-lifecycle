// node --test scripts/ctx/test/

import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readdir, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { acquireAll, verifyAll, releaseAll } from "../../lib/locks.mjs";
import { stripForbidden, scanText, confirmationSourceProblems } from "../../lib/forbidden-fields.mjs";
import { createRun } from "../new-run.mjs";
import { publishKbItem, applySupersedes, publishConfirmationSource } from "../publish-strip.mjs";
import { scanSecrets } from "../freeze-docs.mjs";

const tmp = () => mkdtemp(path.join(tmpdir(), "ctx-test-"));
const obj = (object) => ({ product: "p", object });

test("lock: run thứ hai trên cùng object nhận CONFLICT", async () => {
  const dir = await tmp();
  assert.equal((await acquireAll([obj("a")], { ctxRunId: "CTX-1", dir })).ok, true);
  const second = await acquireAll([obj("a")], { ctxRunId: "CTX-2", dir });
  assert.equal(second.ok, false);
  assert.equal(second.conflict.held_by.ctx_run_id, "CTX-1");
});

test("lock: fail ở object thứ hai thì không sót lock nào của lần claim đó", async () => {
  const dir = await tmp();
  await acquireAll([obj("b")], { ctxRunId: "CTX-1", dir });
  const r = await acquireAll([obj("a"), obj("b")], { ctxRunId: "CTX-2", dir });
  assert.equal(r.ok, false);
  assert.deepEqual((await readdir(dir)).sort(), ["p__b.lock"]);
});

test("lock: hết TTL thì run khác claim lại được, kèm cảnh báo", async () => {
  const dir = await tmp();
  const t0 = Date.parse("2026-10-01T00:00:00Z");
  await acquireAll([obj("a")], { ctxRunId: "CTX-1", dir, ttlSeconds: 60, now: t0 });
  const r = await acquireAll([obj("a")], { ctxRunId: "CTX-2", dir, now: t0 + 61_000 });
  assert.equal(r.ok, true);
  assert.equal(r.warnings.length, 1);
  assert.equal((await verifyAll([obj("a")], { ctxRunId: "CTX-1", dir, now: t0 + 62_000 })).ok, false);
});

test("lock: verify/release chỉ đụng lock của chính run", async () => {
  const dir = await tmp();
  await acquireAll([obj("a")], { ctxRunId: "CTX-1", dir });
  assert.equal((await verifyAll([obj("a")], { ctxRunId: "CTX-1", dir })).ok, true);
  assert.deepEqual(await releaseAll([obj("a")], { ctxRunId: "CTX-2", dir }), []);
  assert.deepEqual(await releaseAll([obj("a")], { ctxRunId: "CTX-1", dir }), ["p__a.lock"]);
});

test("new-run: chạy song song không trùng run id", async () => {
  const base = await tmp();
  const runs = await Promise.all(Array.from({ length: 8 }, () => createRun({ product: "p", mode: "CCR_INGEST", date: "2026-10-11", base })));
  const ids = runs.map((r) => r.ctx_run_id);
  assert.equal(new Set(ids).size, 8);
  const manifest = JSON.parse(await readFile(path.join(runs[0].run_dir, "run-manifest.json"), "utf8"));
  assert.equal(manifest.status, "IN_PROGRESS");
  assert.match(manifest.run_id, /^CTX-20261011-\d{2}$/);
});

test("forbidden: strip bỏ key cấm ở mọi tầng, giữ prose", () => {
  const out = stripForbidden({ a: 1, evidence_refs: [1], nested: [{ act_ids: [], note: "password gate", id_remap_x: 1 }] });
  assert.deepEqual(out, { a: 1, nested: [{ note: "password gate" }] });
  assert.deepEqual(scanText("x.json", '{"note": "password gate"}').leaks, []);
  assert.deepEqual(scanText("x.json", '{"gate": {}}').leaks, ["gate"]);
  assert.deepEqual(scanText("x.md", "xem runs/context/2026").leaks, ["runs/context"]);
});

test("publish: KB item theo allowlist, confirmation_source đúng 4 key", () => {
  const item = publishKbItem(
    {
      kb_id: "KB-1", topic: "t", statement: "s", knowledge_kind: "CONFIRMED_EXPECTED", confidence: "MEDIUM",
      scope: { environment: "documented", role: "r", object_state: "x", surface: "api", brand: null },
      evidence_refs: [], doc_refs: [{ doc_id: "DOC-01" }], status: null,
      confirmation_source: { type: "dev_doc", ref: { locator: "Spec A v1 §2", authored_on: "2026-09-01", quote: "q" }, derivation: "prose" }
    },
    { date: "2026-10-11", ccr_ref: "bootstrap" }
  );
  assert.deepEqual(Object.keys(item).sort(), ["confidence", "confirmation_source", "kb_id", "knowledge_kind", "last_updated", "scope", "statement", "topic"]);
  assert.deepEqual(item.scope, { environment: "documented", role: "r", surface: "api", brand: null });
  assert.deepEqual(item.confirmation_source, { type: "dev_doc", ref: "Spec A v1 §2", authored_on: "2026-09-01", derivation: "prose" });
  assert.deepEqual(confirmationSourceProblems(item.confirmation_source), []);
  assert.ok(confirmationSourceProblems(publishConfirmationSource({ type: "dev_doc", ref: "docs/a.md", derivation: "prose" })).length >= 2);
});

test("publish: item carry-forward giữ last_updated của base", () => {
  const base = publishKbItem({ kb_id: "KB-1", statement: "s", last_updated: { date: "2026-09-01", ccr_ref: "CBS-1" } }, { date: "2026-10-11", ccr_ref: "CBS-9" });
  assert.deepEqual(base.last_updated, { date: "2026-09-01", ccr_ref: "CBS-1" });
});

test("supersede: giữ kb_id base, bỏ candidate, sinh 1 dòng CHANGELOG có statement cũ", () => {
  const kbFiles = {
    "o/features/f/kb.json": {
      object: "o",
      featureKey: "f",
      items: [
        { kb_id: "KB-1", statement: "cũ", related_kb_ids: ["KB-9"] },
        { kb_id: "KB-7", statement: "mới", confirmation_source: { type: "dev_doc", authored_on: "2026-10-01" } }
      ]
    }
  };
  const diff = { change_details: [{ change_id: "CH-1", resolution: "SUPERSEDE", kb_id: "KB-1", candidate_kb_id: "KB-7", feature_key: "f" }] };
  const r = applySupersedes(diff, kbFiles, { date: "2026-10-11", ccrRef: "CBS-9", mode: "CCR_INGEST" });
  assert.deepEqual(r.problems, []);
  assert.deepEqual(kbFiles["o/features/f/kb.json"].items, [{ kb_id: "KB-1", statement: "mới", confirmation_source: { type: "dev_doc", authored_on: "2026-10-01" }, related_kb_ids: ["KB-9"] }]);
  assert.equal(r.changelog.o.length, 1);
  assert.match(r.changelog.o[0], /Cũ: "cũ"/);
});

test("supersede: base không tồn tại thì báo problem, không đoán", () => {
  const r = applySupersedes({ change_details: [{ resolution: "SUPERSEDE", kb_id: "KB-404", feature_key: "f" }] }, {}, { date: "d", ccrRef: "c", mode: "m" });
  assert.equal(r.problems.length, 1);
});

test("freeze-docs: phát hiện secret, bỏ qua domain RFC 2606", () => {
  assert.deepEqual(scanSecrets("liên hệ buyer@mail.example.com"), []);
  const hits = scanSecrets("owner: an.nguyen@company.vn\nAuthorization: Bearer abcdefghijklmnopqrstuvwx\npassword=SuperSecret123");
  assert.deepEqual(hits.map((h) => h.name).sort(), ["bearer token", "email", "gán password/secret/token"]);
});

test("audit: preview sạch thì ok, có key cấm thì blocking", async () => {
  const { auditDir } = await import("../audit-preview.mjs");
  const dir = await tmp();
  await writeFile(path.join(dir, "kb.json"), JSON.stringify([{ kb_id: "KB-1", statement: "s" }]));
  assert.equal((await auditDir(dir)).ok, true);
  await writeFile(path.join(dir, "kb.json"), JSON.stringify([{ kb_id: "KB-1", evidence_refs: [] }]));
  assert.equal((await auditDir(dir)).ok, false);
});

test("lint: agent definitions theo template chung", async () => {
  const { lintAgents } = await import("../lint-agents.mjs");
  assert.deepEqual(await lintAgents(), []);
});

async function makeRun(files) {
  const { mkdir } = await import("node:fs/promises");
  const dir = await tmp();
  for (const [rel, data] of Object.entries(files)) {
    await mkdir(path.dirname(path.join(dir, rel)), { recursive: true });
    await writeFile(path.join(dir, rel), JSON.stringify(data));
  }
  return dir;
}
const env = (payload) => ({ artifact_type: "X", producer: "p", status: "READY", payload });
const manifest = (mode = "DOC_BOOTSTRAP") => ({ run_id: "CTX-20261011-01", product: "p", mode, status: "IN_PROGRESS" });
const kbItem = (o = {}) => ({ kb_id: "KB-1", statement: "s", knowledge_kind: "INFERRED", confidence: "LOW", scope: { environment: "documented" }, ...o });

test("validate-run: run hợp lệ thì ok", async () => {
  const { validateRun } = await import("../validate-run.mjs");
  const dir = await makeRun({
    "run-manifest.json": manifest(),
    "candidate/product-kb/f.json": env({ kb_context: { feature_key: "f" }, kb_candidates: [kbItem()] }),
    "candidate/checklists/f.json": env({ checklists: [{ feature_key: "f", checks: [{ check_id: "CHK-001", status: "NEEDS_CONFIRMATION", oracle: { oracle_strength: "NONE" } }] }] })
  });
  const r = await validateRun(dir);
  assert.deepEqual(r.errors, []);
});

test("validate-run: bắt lỗi shape và luật có điều kiện", async () => {
  const { validateRun } = await import("../validate-run.mjs");
  const dir = await makeRun({
    "run-manifest.json": { ...manifest(), status: "DONE" },
    "candidate/product-kb/f.json": env({
      kb_context: { feature_key: "other" },
      kb_candidates: [
        kbItem({ knowledge_kind: "CONFIRMED_EXPECTED" }),
        kbItem({ kb_id: "KB-2", scope: { environment: "staging" } }),
        kbItem({ kb_id: "KB-3", knowledge_kind: "CONFIRMED_EXPECTED", confirmation_source: { type: "dev_doc", ref: { locator: "x" } } })
      ]
    }),
    "input/ccr-fastpath-plan.json": { proposal_id: "CBS-1", claims: [{ claim_id: "CLAIM-01", claim_key: "CBS-1__CLAIM-01", strength: "S3" }] },
    "review/verdict.json": env({ decision: "APPROVED", publish_allowed: true, gate_results: [{ gate: "C3", status: "FAIL" }] })
  });
  const problems = (await validateRun(dir)).errors.map((e) => e.problem);
  for (const expected of [
    /không thuộc IN_PROGRESS/,
    /không khớp tên file shard/,
    /CONFIRMED_EXPECTED thiếu confirmation_source/,
    /mode doc phải là documented/,
    /thiếu authored_on/,
    /dev_doc thiếu derivation/,
    /claim S3 thiếu confirmation_source/,
    /true trong khi gate FAIL/
  ]) assert.ok(problems.some((p) => expected.test(p)), `thiếu lỗi ${expected}`);
});

test("product config: placeholder vẫn bị chặn sau khi tách lib schema", async () => {
  const { validateProduct } = await import("../../lib/product-config.mjs");
  const { readFile } = await import("node:fs/promises");
  const cfg = JSON.parse(await readFile(new URL("../../../config/products/duos.json", import.meta.url)));
  assert.deepEqual(await validateProduct(cfg), []);
  cfg.qa_hub.project_id = "<<< ĐIỀN >>>";
  assert.ok((await validateProduct(cfg)).some((p) => p.includes("placeholder")));
});

test("intake: xếp theo mức gấp rồi submittedAt, bỏ project lạ", async () => {
  const { buildQueue, parseUrgency } = await import("../intake.mjs");
  const ccr = (u) => `## 4.4 Mức độ gấp\n\n\`${u}\` — lý do\n\n# Phần 5`;
  assert.equal(parseUrgency("## 4.4 Mức độ gấp `[BẠN]`\n\n`HIGH` (đang chặn) · `MEDIUM` · `LOW`\n"), "UNKNOWN");
  assert.equal(parseUrgency("## 4.4 Mức độ gấp\n\n`MEDIUM` — có thể nâng lên `HIGH` nếu test P0 fail\n"), "MEDIUM");
  assert.equal(parseUrgency("## 4.4 Mức độ gấp `[BẠN]`\n\n**MEDIUM** (đề xuất, BẠN duyệt)\n"), "MEDIUM");
  const products = [{ product_key: "p", qa_hub: { project_id: "proj-1" } }];
  const { queue, skipped } = buildQueue(
    [
      { id: "CBS-1", projectId: "proj-1", submittedAt: "2026-10-01", content: ccr("LOW") },
      { id: "CBS-2", projectId: "proj-1", submittedAt: "2026-10-03", content: ccr("HIGH") },
      { id: "CBS-3", projectId: "proj-1", submittedAt: "2026-10-02", content: ccr("HIGH") },
      { id: "CBS-4", projectId: "proj-x", submittedAt: "2026-10-01", content: ccr("HIGH") }
    ],
    products
  );
  assert.deepEqual(queue.map((q) => q.proposal_id), ["CBS-3", "CBS-2", "CBS-1"]);
  assert.deepEqual(skipped.map((s) => s.proposal_id), ["CBS-4"]);
});

test("dedup: trùng theo target_kb_ids hoặc confirmation_source, chỉ cùng object", async () => {
  const { findDuplicates } = await import("../dedup.mjs");
  const cs = { type: "dev_doc", ref: { citation: "Jira PROJ-1 §3" } };
  const plan = { product_key: "p", object_key: "o", claims: [
    { claim_key: "CBS-9__CLAIM-01", target_kb_ids: ["KB-5"] },
    { claim_key: "CBS-9__CLAIM-02", confirmation_source: cs },
    { claim_key: "CBS-9__CLAIM-03", target_kb_ids: ["KB-7"] } ] };
  const others = [
    { runId: "CTX-A", status: "IN_PROGRESS", product: "p", object: "o", plan: { proposal_id: "CBS-1", claims: [{ claim_key: "CBS-1__CLAIM-01", target_kb_ids: ["KB-5"] }, { claim_key: "CBS-1__CLAIM-02", confirmation_source: { type: "dev_doc", ref: { citation: "jira  proj-1 §3" } } }] } },
    { runId: "CTX-B", status: "PUBLISHED", product: "p", object: "other", plan: { proposal_id: "CBS-2", claims: [{ claim_key: "CBS-2__CLAIM-01", target_kb_ids: ["KB-7"] }] } }
  ];
  const r = findDuplicates(plan, others, new Set(["KB-7"]));
  assert.deepEqual(r.duplicates.map((d) => [d.claim_key, d.basis[0]]), [["CBS-9__CLAIM-01", "same_target_kb_ids"], ["CBS-9__CLAIM-02", "same_confirmation_source"]]);
  assert.deepEqual(r.covered_by_open_question, [{ claim_key: "CBS-9__CLAIM-03", kb_ids: ["KB-7"] }]);
});

test("lock CLI: bị run khác giữ → DEFERRED + locked_by_run, không phải CONFLICT", async () => {
  const { execFile } = await import("node:child_process");
  const { promisify } = await import("node:util");
  const run = promisify(execFile);
  const cli = new URL("../lock.mjs", import.meta.url).pathname;
  const obj = `zz-test-${process.pid}`;
  const args = (id, action = "acquire") => [cli, action, "--run", id, "--product", "test", "--objects", obj];
  await run("node", args("CTX-T-1"));
  try {
    const second = await run("node", args("CTX-T-2")).catch((e) => e);
    assert.equal(second.code, 2);
    const out = JSON.parse(second.stdout);
    assert.equal(out.outcome, "DEFERRED");
    assert.equal(out.reason, "locked_by_run");
    assert.equal(out.conflict.held_by.ctx_run_id, "CTX-T-1");
  } finally {
    await run("node", args("CTX-T-1", "release"));
  }
});

test("publish release: tag không ghi đè, PR body đủ object/version/run", async () => {
  const { nextTagName, changedObjects, buildPrBody } = await import("../../lib/publish-release.mjs");
  assert.equal(nextTagName([], "2026-10-11"), "ctx-2026-10-11");
  assert.equal(nextTagName(["ctx-2026-10-11", "ctx-2026-10-11-2"], "2026-10-11"), "ctx-2026-10-11-3");
  const files = ["products/p/o/kb.json", "products/p/o/features/f/kb.json", "products/p/_registry.json", "manifest.json"];
  assert.deepEqual(changedObjects(files), ["p/o"]);
  const body = buildPrBody({
    sourceRepo: "org/build", sha: "abcdef1234567", files,
    manifest: { products: [{ product_key: "p", objects: [{ object_key: "o", published_context_version: "3", status: "PUBLISHED" }] }] },
    runs: [{ run_id: "CTX-20261011-01", proposal_id: "CBS-7", mode: "CCR_INGEST", verdict: { decision: "APPROVED" }, diff: { added: [1], changed: [], refreshed_only: [], conflicted: [] }, open_questions: 2 }]
  });
  for (const s of ["`p/o` — version 3", "CBS-7", "CCR_INGEST", "verdict APPROVED", "+1", "2 open question", "abcdef12"]) assert.ok(body.includes(s), `thiếu "${s}"`);
});

test("publish-knowledge: --push bị từ chối", async () => {
  const { execFile } = await import("node:child_process");
  const { promisify } = await import("node:util");
  const cli = new URL("../../publish-knowledge.mjs", import.meta.url).pathname;
  const r = await promisify(execFile)("node", [cli, "--push"]).catch((e) => e);
  assert.equal(r.code, 1);
  assert.match(r.stderr, /--push đã bỏ/);
});

test("approval: SUPERSEDE cần người quyết phải có ACCEPT_CANDIDATE; CHANGELOG ghi người duyệt", async () => {
  const { validateRun } = await import("../validate-run.mjs");
  const diff = (resolution, blockers = ["b:impact_high"]) => env({ change_details: [{ type: "changed", kb_id: "KB-1", candidate_kb_id: "KB-9", resolution, strength: {}, requires_human_decision: true, supersede_blockers: blockers }] });
  const base = { "run-manifest.json": manifest("CCR_INGEST") };
  const noApproval = await validateRun(await makeRun({ ...base, "review/knowledge-diff.json": diff("SUPERSEDE") }));
  assert.ok(noApproval.errors.some((e) => /chưa có approval/.test(e.problem)));
  const approved = { approvals: [{ kb_id: "KB-1", decision: "ACCEPT_CANDIDATE", approver_role: "PO", ref: "QA Hub CBS-9 note", decided_at: "2026-10-11" }] };
  const ok = await validateRun(await makeRun({ ...base, "input/approvals.json": approved, "review/knowledge-diff.json": diff("SUPERSEDE") }));
  assert.deepEqual(ok.errors, []);
  const scope = await validateRun(await makeRun({ ...base, "input/approvals.json": approved, "review/knowledge-diff.json": diff("SUPERSEDE", ["e:scope_differs"]) }));
  assert.ok(scope.errors.some((e) => /phải là CONFLICTED/.test(e.problem)));

  const { applySupersedes } = await import("../publish-strip.mjs");
  const kbFiles = { k: { object: "o", featureKey: "f", items: [{ kb_id: "KB-1", statement: "cũ" }, { kb_id: "KB-9", statement: "mới" }] } };
  const r = applySupersedes({ change_details: [{ resolution: "SUPERSEDE", kb_id: "KB-1", candidate_kb_id: "KB-9", feature_key: "f" }] }, kbFiles, { date: "2026-10-11", ccrRef: "CBS-9", mode: "CCR_INGEST", approvals: new Map([["KB-1", approved.approvals[0]]]) });
  assert.match(r.changelog.o[0], /Duyệt: PO \(QA Hub CBS-9 note, 2026-10-11\)/);
});

test("changelog: chỉ đếm CBS-<n> / QA-<n> / CCR-<...>, không bắt chữ trong mô tả", async () => {
  const { parseChangelog } = await import("../../lib/changelog.mjs");
  const refs = parseChangelog([
    "- 2026-10-09 (`bootstrap`, DOC_BOOTSTRAP) — từ bộ tài liệu QA-authored, repo qa-volume-kb",
    "- 2026-10-10 (`CBS-12`, CCR_INGEST) — KB-1 superseded",
    "- 2026-10-10 (`CCR-2026-09-25-photo-upload`, INCREMENTAL_UPDATE) — thêm KB-2; liên quan QA-123"
  ].join("\n")).map((r) => r.ccr_ref);
  assert.deepEqual(refs, ["CBS-12", "CCR-2026-09-25-PHOTO-UPLOAD", "QA-123"]);
});

test("context health: đếm KB/oracle/OQ/conflict và gắn cờ, không ghi file", async () => {
  const { objectHealth } = await import("../../lib/context-health.mjs");
  const { readdir } = await import("node:fs/promises");
  const dir = await makeRun({
    "publish-meta.json": { published_context_version: "2", published_at: "2000-01-01", mode: "CCR_INGEST" },
    "kb.json": [{ kb_id: "KB-1", knowledge_kind: "OBSERVED_CURRENT", status: "UNRESOLVED" }],
    "features/f/kb.json": [{ kb_id: "KB-2", knowledge_kind: "INFERRED" }, { kb_id: "KB-3", knowledge_kind: "OBSERVED_CURRENT", status: "KNOWN_DEFECT" }],
    "checklists/f.json": { checks: [{ oracle: { oracle_strength: "NONE" } }, { oracle: { oracle_strength: "BASELINE" } }] }
  });
  await writeFile(path.join(dir, "open-questions.md"), '```json\n{"oq_id":"OQ-o-001","type":"CONFLICT"}\n```\n```json\n{"oq_id":"OQ-o-002","type":"NEEDS_CONFIRMATION"}\n```\n');
  await writeFile(path.join(dir, "CHANGELOG.md"), "- 2026-10-01 (`bootstrap`, DOC_BOOTSTRAP) — QA-authored\n- 2026-10-05 (`CBS-7`, CCR_INGEST) — đổi KB-1\n");
  const before = (await readdir(dir, { recursive: true })).sort();
  const h = await objectHealth(dir, 45);
  assert.equal(h.version, "2");
  assert.deepEqual([h.kb.total, h.kb.OBSERVED_CURRENT, h.unresolved_conflicts, h.known_defects], [3, 2, 1, 1]);
  assert.deepEqual(h.checks, { total: 2, STRONG: 0, BASELINE: 1, NONE: 1 });
  assert.deepEqual(h.open_questions, { CONFLICT: 1, NEEDS_CONFIRMATION: 1, OPEN_ISSUE: 0 });
  assert.deepEqual(h.last_ccr, { ccr_ref: "CBS-7", date: "2026-10-05" });
  assert.deepEqual(h.flags.sort(), ["no_confirmed_expected", "open_conflicts", "stale", "weak_oracle"]);
  assert.deepEqual((await readdir(dir, { recursive: true })).sort(), before);
});
