// Đường dẫn trong một run (contract §5) — một nơi duy nhất cho scripts và ops-board.

import path from "node:path";
import { fileURLToPath } from "node:url";

export const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
export const runsContextDir = path.join(rootDir, "runs", "context");
export const locksDir = path.join(rootDir, "runs", ".locks");
export const knowledgeProductsDir = path.join(rootDir, "knowledge", "products");

export const RUN_ID_RE = /^CTX-(\d{8})-(\d{2,})$/;

/** Thư mục con được tạo sẵn cho mọi run. */
export const RUN_SUBDIRS = [
  "input",
  "raw",
  "intermediate",
  "candidate/product-kb",
  "candidate/feature-profiles",
  "candidate/checklists",
  "review"
];

export function runPaths(runDir) {
  const p = (...s) => path.join(runDir, ...s);
  return {
    runDir,
    manifest: p("run-manifest.json"),
    bootstrapRequest: p("input", "bootstrap-request.json"),
    scopePlan: p("input", "scope-plan.json"),
    ccrPlan: p("input", "ccr-fastpath-plan.json"),
    docManifest: p("input", "doc-manifest.json"),
    docsDir: p("input", "docs"),
    ccrEvidenceDir: p("raw", "ccr-evidence"),
    productKbDir: p("candidate", "product-kb"),
    profilesDir: p("candidate", "feature-profiles"),
    checklistsDir: p("candidate", "checklists"),
    previewDir: p("candidate", "publish-preview"),
    diff: p("review", "knowledge-diff.json"),
    gateResults: p("review", "gate-results.json"),
    verdict: p("review", "verdict.json")
  };
}

/** `runs/context/<YYYY-MM-DD>/<CTX-RUN-ID>` từ run id, hoặc trả nguyên nếu đã là đường dẫn. */
export function resolveRunDir(runIdOrPath, base = runsContextDir) {
  const m = RUN_ID_RE.exec(runIdOrPath);
  if (!m) return path.resolve(runIdOrPath);
  const d = m[1];
  return path.join(base, `${d.slice(0, 4)}-${d.slice(4, 6)}-${d.slice(6, 8)}`, runIdOrPath);
}

export function lockFile(productKey, objectKey, dir = locksDir) {
  return path.join(dir, `${productKey}__${objectKey}.lock`);
}
