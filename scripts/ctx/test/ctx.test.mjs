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
