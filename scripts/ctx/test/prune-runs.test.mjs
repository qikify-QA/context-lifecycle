import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, mkdir, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { classifyRun, loadOpenOqTypes, TERMINAL_STATUSES } from "../../prune-runs.mjs";

const types = (pairs) => new Map(pairs);
const manifest = (status, oqs) => ({ status, produced_open_questions: oqs });

test("oq đã resolve hết → xoá cả run, bất kể status terminal nào", () => {
  for (const status of TERMINAL_STATUSES) {
    const v = classifyRun(manifest(status, ["OQ-a-001"]), types([]));
    assert.equal(v.action, "DELETE_RUN", status);
    assert.deepEqual(v.remove, []);
  }
  // produced_open_questions rỗng cũng vậy
  assert.equal(classifyRun(manifest("PUBLISHED", []), types([["OQ-a-001", "CONFLICT"]])).action, "DELETE_RUN");
});

test("PUBLISHED + chỉ còn NEEDS_CONFIRMATION → dọn raw/ và candidate/", () => {
  const v = classifyRun(
    manifest("PUBLISHED", ["OQ-a-001", "OQ-a-002"]),
    types([["OQ-a-001", "NEEDS_CONFIRMATION"], ["OQ-a-002", "NEEDS_CONFIRMATION"]])
  );
  assert.equal(v.action, "PRUNE_EVIDENCE");
  assert.deepEqual(v.remove, ["raw", "candidate"]);
  assert.deepEqual(v.stillOpen, ["OQ-a-001", "OQ-a-002"]);
});

test("PUBLISHED + còn CONFLICT hoặc OPEN_ISSUE → chỉ dọn candidate/, raw/ phải giữ", () => {
  for (const t of ["CONFLICT", "OPEN_ISSUE"]) {
    const v = classifyRun(
      manifest("PUBLISHED", ["OQ-a-001", "OQ-a-002"]),
      types([["OQ-a-001", "NEEDS_CONFIRMATION"], ["OQ-a-002", t]])
    );
    assert.equal(v.action, "PRUNE_CANDIDATE", t);
    assert.deepEqual(v.remove, ["candidate"], t);
  }
});

test("type lạ hoặc thiếu được coi là cần evidence — không dọn raw/", () => {
  const v = classifyRun(manifest("PUBLISHED", ["OQ-a-001"]), types([["OQ-a-001", undefined]]));
  assert.equal(v.action, "PRUNE_CANDIDATE");
  assert.deepEqual(v.remove, ["candidate"]);
});

test("chưa publish mà còn oq treo → giữ nguyên, kể cả khi chỉ có NEEDS_CONFIRMATION", () => {
  for (const status of ["BLOCKED", "DEFERRED", "REJECTED", "CONFLICT"]) {
    const v = classifyRun(manifest(status, ["OQ-a-001"]), types([["OQ-a-001", "NEEDS_CONFIRMATION"]]));
    assert.equal(v.action, "KEEP", status);
    assert.deepEqual(v.remove, [], status);
  }
});

test("chưa terminal và định dạng cũ không bao giờ bị động tới", () => {
  const open = types([["OQ-a-001", "NEEDS_CONFIRMATION"]]);
  for (const status of ["IN_PROGRESS", "REWORK_REQUIRED", undefined]) {
    const v = classifyRun({ status, produced_open_questions: [] }, open);
    assert.equal(v.action, "NOT_TERMINAL", String(status));
    assert.deepEqual(v.remove, []);
  }
  // thiếu produced_open_questions → MANUAL, kể cả khi status terminal
  const old = classifyRun({ status: "PUBLISHED" }, open);
  assert.equal(old.action, "MANUAL");
  assert.deepEqual(old.remove, []);
  // không đọc được manifest
  const broken = classifyRun(null, open);
  assert.equal(broken.action, "MANUAL");
  assert.deepEqual(broken.remove, []);
});

test("loadOpenOqTypes đọc đúng type và không khớp nhầm oq_id có tiền tố chung", async () => {
  const root = await mkdtemp(path.join(tmpdir(), "prune-oq-"));
  const file = path.join(root, "a", "open-questions.md");
  await mkdir(path.dirname(file), { recursive: true });
  const block = (q) => `## ${q.oq_id}\n\n\`\`\`json\n${JSON.stringify(q)}\n\`\`\`\n`;
  await writeFile(
    file,
    "# Open Questions — a\n\n" +
      block({ oq_id: "OQ-a-01", type: "NEEDS_CONFIRMATION", summary: "s" }) +
      block({ oq_id: "OQ-a-014", type: "CONFLICT", summary: "s" })
  );

  const map = await loadOpenOqTypes(root);
  assert.equal(map.get("OQ-a-01"), "NEEDS_CONFIRMATION");
  assert.equal(map.get("OQ-a-014"), "CONFLICT");
  assert.equal(map.has("OQ-a-0"), false);

  // Run chỉ treo OQ-a-01 không được coi là có CONFLICT của OQ-a-014.
  assert.equal(classifyRun(manifest("PUBLISHED", ["OQ-a-01"]), map).action, "PRUNE_EVIDENCE");
});
