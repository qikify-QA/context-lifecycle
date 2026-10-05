// Đọc CHANGELOG.md của object để suy ra resolved_requests (contract §12.4 rule 5).
//
// Trước đây generate-manifest.mjs gán cứng `resolved_requests: []` mỗi lần sinh,
// nên giá trị thật (ai đó điền tay) bị XOÁ ở lần chạy kế tiếp. Nguồn sự thật
// đã tồn tại sẵn — mỗi publish ghi 1 dòng CHANGELOG — chỉ là chưa ai đọc nó.
//
// Phương án bị loại: đọc-merge từ knowledge/manifest.json cũ. Làm thế biến
// manifest thành source of truth của chính nó: không rebuild-from-scratch được,
// mảng tăng vô hạn, và manifest hỏng là mất sạch.
//
// Thực tế repo có HAI format dòng, contract chỉ khai một:
//   artwork: - 2026-09-26 (`CBS-004`) — ...
//   sdk    : - 2026-09-12 — bootstrap:CTX-20260912-04 — ...
// Nên parser bắt ref ở bất kỳ đâu trên dòng, có/không backtick đều được.

import { readFile } from "node:fs/promises";

/** Mã CCR thật. `CTX-...` và `bootstrap:...` là run id, KHÔNG phải CCR. */
const CCR_REF_RE = /\b((?:CBS|CCR|QA)-[A-Za-z0-9][A-Za-z0-9._-]*)/gi;
const RUN_ID_RE = /\b(?:bootstrap:)?CTX-\d{8}-\d+/gi;
const LINE_RE = /^-\s+(\d{4}-\d{2}-\d{2})\b(.*)$/;
// Mode chỉ được nhận khi nó là một mode CÓ THẬT (contract §10) và nằm trong
// đúng nhóm ngoặc chứa ref — format khai báo là (`CBS-004`, INCREMENTAL_UPDATE).
// Không làm vậy thì prose lọt vào: `(POST /api/...)` cho ra mode "POST", và
// `(..., UNRESOLVED)` cho ra mode "UNRESOLVED".
const KNOWN_MODES = new Set([
  "ZERO_DOC_BOOTSTRAP",
  "BROAD_BOOTSTRAP",
  "DOC_BOOTSTRAP",
  "INCREMENTAL_UPDATE",
  "CCR_INGEST",
  "REFRESH",
  "RECONCILE",
  // mode lịch sử, có thật trong runs/ nhưng chưa bao giờ được khai ở §10
  "KNOWLEDGE_RESTRUCTURE"
]);
const PAREN_RE = /\(([^)]*)\)/g;

function modeFrom(rest, ref) {
  let m;
  PAREN_RE.lastIndex = 0;
  while ((m = PAREN_RE.exec(rest)) !== null) {
    const group = m[1];
    if (ref && !group.toUpperCase().includes(ref)) continue;
    for (const tok of group.split(/[,\s]+/)) {
      // "INCREMENTAL_UPDATE/DEEP_DIVE" -> lấy phần đầu
      const t = tok.replace(/`/g, "").trim().split("/")[0];
      if (KNOWN_MODES.has(t)) return t;
    }
  }
  return null;
}

/**
 * Trả về [{ ccr_ref, date, mode }] theo thứ tự xuất hiện trong file.
 * Một dòng có thể nhắc nhiều ref (vd "CCR CBS-003" trong mô tả) — giữ hết,
 * việc dedupe là của caller.
 */
export function parseChangelog(text) {
  const out = [];
  for (const line of String(text || "").split("\n")) {
    const m = LINE_RE.exec(line.trim());
    if (!m) continue;
    const [, date, rest] = m;
    // Bỏ run id TRƯỚC khi tìm CCR ref, để "bootstrap:CTX-..." không bị hiểu sai.
    const cleaned = rest.replace(RUN_ID_RE, " ");
    const seen = new Set();
    let r;
    CCR_REF_RE.lastIndex = 0;
    while ((r = CCR_REF_RE.exec(cleaned)) !== null) {
      const ref = r[1].toUpperCase();
      if (seen.has(ref)) continue;
      seen.add(ref);
      out.push({ ccr_ref: ref, date, mode: modeFrom(rest, ref) });
    }
  }
  return out;
}

export async function readChangelogRefs(file) {
  let text;
  try {
    text = await readFile(file, "utf8");
  } catch {
    return [];
  }
  return parseChangelog(text);
}
