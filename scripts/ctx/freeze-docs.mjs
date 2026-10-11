#!/usr/bin/env node
// Đóng băng tài liệu của một run DOC_BOOTSTRAP (contract §9, orchestrator "Khởi động" 1b).
//
//   node scripts/ctx/freeze-docs.mjs --run CTX-... [--allow-pii-warnings]
//
// Đọc input/bootstrap-request.json → doc_sources[]. DOC-ID = DOC-<nn> theo đúng thứ tự.
//   - source "local_path": copy `path` vào input/docs/<DOC-ID>/ (nếu chưa có).
//   - nguồn khác (qa-hub:*): orchestrator đã lấy nội dung qua MCP, REDACT, và ghi
//     sẵn vào input/docs/<DOC-ID>/<file>. Script không gọi MCP.
// Sau đó tính sha256, quét pattern secret/PII còn sót, ghi input/doc-manifest.json.
//
// Redact là việc của orchestrator (cần phán đoán). Script chỉ phát hiện pattern
// còn sót và FAIL (exit 2) — fail-closed, vì evidence còn secret là block publish (§6).
// Exit 1: thiếu version/generated_at hoặc thiếu file (gate C0 FAIL).

import { readFile, readdir, copyFile, mkdir } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";
import { parseArgs, readJson, readJsonOr, writeJson, exists } from "../lib/fs-utils.mjs";
import { resolveRunDir, runPaths, rootDir } from "../lib/run-layout.mjs";

// Domain dành cho tài liệu (RFC 2606) không phải PII (§6).
const DOC_DOMAINS = /@(?:[\w-]+\.)*(?:example\.(?:com|org|net)|example|test|invalid|localhost)\b/i;

const SECRET_PATTERNS = [
  { name: "email", re: /[\w.+-]+@[\w-]+(?:\.[\w-]+)+/g, keep: (m) => DOC_DOMAINS.test(m) },
  { name: "bearer token", re: /\bbearer\s+[A-Za-z0-9._\-]{16,}/gi },
  { name: "credential trong URL", re: /\b[a-z][\w+.-]*:\/\/[^\s/:@]+:[^\s/@]+@/gi },
  { name: "gán password/secret/token", re: /\b(?:password|passwd|secret|api[_-]?key|access[_-]?token|refresh[_-]?token)\b["']?\s*[:=]\s*["']?(?!\[REDACTED\])[^\s"',]{8,}/gi },
  { name: "token có tiền tố đã biết", re: /\b(?:tlmcp_|sk-|ghp_|xox[bp]-|shpat_|shpca_)[A-Za-z0-9_\-]{12,}/g }
];

export function scanSecrets(text) {
  const hits = [];
  for (const { name, re, keep } of SECRET_PATTERNS) {
    for (const m of text.match(re) || []) if (!keep?.(m)) hits.push({ name, sample: m.slice(0, 12) + "…" });
  }
  return hits;
}

async function main() {
  const args = parseArgs();
  if (typeof args.run !== "string") {
    console.error("Cần --run CTX-...");
    process.exit(1);
  }
  const paths = runPaths(resolveRunDir(args.run));
  const request = await readJson(paths.bootstrapRequest);
  const sources = request.doc_sources ?? [];
  if (!sources.length) {
    console.error("C0 FAIL: doc_sources[] rỗng — không được chuyển sang explore để cứu run (§10a).");
    process.exit(1);
  }

  const previous = await readJsonOr(paths.docManifest, {});
  const docs = [];
  const c0 = [];
  const secrets = [];
  for (const [i, src] of sources.entries()) {
    const docId = `DOC-${String(i + 1).padStart(2, "0")}`;
    const dir = path.join(paths.docsDir, docId);
    await mkdir(dir, { recursive: true });
    if (src.source === "local_path") {
      if (!src.path) c0.push(`${docId}: local_path thiếu path`);
      else {
        const from = path.resolve(rootDir, src.path);
        const to = path.join(dir, path.basename(src.path));
        if (!(await exists(to))) await copyFile(from, to);
      }
    }
    const files = (await readdir(dir)).filter((f) => !f.startsWith(".")).sort();
    if (!files.length) c0.push(`${docId}: chưa có file trong input/docs/${docId}/ (nguồn ${src.source} phải được orchestrator ghi sẵn, đã redact)`);
    if (!src.version) c0.push(`${docId}: thiếu version`);
    if (!src.generated_at) c0.push(`${docId}: thiếu generated_at`);

    const hash = createHash("sha256");
    for (const f of files) {
      const buf = await readFile(path.join(dir, f));
      hash.update(buf);
      for (const hit of scanSecrets(buf.toString("utf8"))) secrets.push({ doc_id: docId, file: f, ...hit });
    }
    const prev = (previous.docs ?? []).find((d) => d.doc_id === docId) ?? {};
    docs.push({
      ...prev,
      doc_id: docId,
      logical_name: src.doc_ref_label ?? src.path ?? prev.logical_name ?? null,
      type: src.type ?? null,
      version: src.version ?? null,
      generated_at: src.generated_at ?? null,
      generated_from_commit: src.generated_from_commit ?? null,
      source: src.source ?? null,
      files,
      sha256: hash.digest("hex")
    });
  }

  const manifest = { ...previous, schema_version: "1.0", product: request.product_key ?? request.product, docs };
  await writeJson(paths.docManifest, manifest);

  const result = { ok: c0.length === 0 && (secrets.length === 0 || args["allow-pii-warnings"] === true), docs: docs.length, c0_problems: c0, secret_hits: secrets };
  console.log(JSON.stringify(result, null, 2));
  if (c0.length) process.exit(1);
  if (secrets.length && args["allow-pii-warnings"] !== true) process.exit(2);
}

if (import.meta.url === `file://${process.argv[1]}`) main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
