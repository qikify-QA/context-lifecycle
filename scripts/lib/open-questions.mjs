// Parser duy nhất cho open-questions.md (contract §5a, §12.3b).
//
// Trước đây có HAI parser cho cùng một file và chúng không giống nhau:
//   - (không còn consumer khác)
//   - scripts/generate-manifest.mjs: đòi fence ```json
// Hệ quả: một entry viết không có fence sẽ được đọc ở nơi này nhưng MẤT khỏi
// consolidated-open-questions.md — tức mất khỏi đúng bản được gửi cho PO/Dev.
// Đó là loại lệch âm thầm nên chỉ có một implementation.
//
// Parser này lấy bản rộng hơn (brace-balanced) để không đánh mất entry nào.
// Contract §5a vẫn yêu cầu người ghi dùng fence ```json — parser rộng là lưới
// an toàn, không phải giấy phép viết lỏng.

/** Mọi object JSON có field oq_id, bất kể nó nằm trong fence hay không. */
export function extractOpenQuestions(text) {
  const entries = [];
  if (!text) return entries;
  for (let i = 0; i < text.length; i++) {
    if (text[i] !== "{") continue;
    let depth = 0, quoted = false, escaped = false;
    for (let j = i; j < text.length; j++) {
      const ch = text[j];
      if (quoted) { if (escaped) escaped = false; else if (ch === "\\") escaped = true; else if (ch === '"') quoted = false; continue; }
      if (ch === '"') { quoted = true; continue; }
      if (text[j] === "{") depth++;
      else if (text[j] === "}") {
        depth--;
        if (depth === 0) {
          const candidate = text.slice(i, j + 1);
          if (candidate.includes('"oq_id"')) {
            try {
              entries.push(JSON.parse(candidate));
            } catch {
              /* prose có ngoặc lạc — bỏ qua, không làm hỏng cả file */
            }
          }
          i = j;
          break;
        }
      }
    }
  }
  return entries;
}

/**
 * Entry nào KHÔNG nằm trong fence ```json — vi phạm §5a nhưng vẫn parse được.
 * Dùng để cảnh báo thay vì im lặng chấp nhận.
 */
export function findUnfencedEntries(text) {
  const all = extractOpenQuestions(text);
  if (!all.length) return [];
  const fenced = new Set();
  const fenceRe = /```json\s*\n([\s\S]*?)```/g;
  let m;
  while ((m = fenceRe.exec(text)) !== null) {
    for (const e of extractOpenQuestions(m[1])) if (e.oq_id) fenced.add(e.oq_id);
  }
  return all.filter((e) => e.oq_id && !fenced.has(e.oq_id)).map((e) => e.oq_id);
}

// ---------------------------------------------------------------- patch tại chỗ

/** Serialize theo style của entry gốc (compact, `", "` kiểu Python, hoặc pretty). */
function serializeLike(sample, q) {
  if (/\n\s*"/.test(sample ?? "")) return JSON.stringify(q, null, 2);
  if (!/^\{"[^"]*": /.test(sample ?? "")) return JSON.stringify(q);
  const py = (v) => (Array.isArray(v) ? `[${v.map(py).join(", ")}]` : v && typeof v === "object" ? `{${Object.entries(v).map(([k, x]) => `${JSON.stringify(k)}: ${py(x)}`).join(", ")}}` : JSON.stringify(v));
  return py(q);
}

/** Span [start,end) của mọi object JSON có "oq_id" trong text. */
function oqSpans(text) {
  const spans = [];
  for (let i = 0; i < text.length; i++) {
    if (text[i] !== "{") continue;
    let depth = 0, quoted = false, escaped = false;
    for (let j = i; j < text.length; j++) {
      const ch = text[j];
      if (quoted) { if (escaped) escaped = false; else if (ch === "\\") escaped = true; else if (ch === '"') quoted = false; continue; }
      if (ch === '"') { quoted = true; continue; }
      if (ch === "{") depth++;
      else if (ch === "}" && --depth === 0) {
        const candidate = text.slice(i, j + 1);
        if (candidate.includes('"oq_id"')) {
          try { spans.push({ start: i, end: j + 1, q: JSON.parse(candidate), raw: candidate }); } catch { /* prose */ }
        }
        i = j;
        break;
      }
    }
  }
  return spans;
}

/**
 * Sửa open-questions.md tại chỗ: bỏ block của OQ trong `remove`, thay JSON (và heading)
 * của OQ trong `replace` (oq_id cũ → entry mới), nối `append` vào cuối; cập nhật bảng
 * đếm `| TYPE | N |` / `| **Tổng** | **N** |` trong phần đầu nếu có. Giữ nguyên prose
 * còn lại. Trả null khi file không chia được thành một block `## ` cho mỗi OQ cần sửa
 * (người gọi khi đó render lại cả file).
 */
export function patchOpenQuestions(text, { remove = new Set(), replace = new Map(), append = [], final = null } = {}) {
  const starts = [...text.matchAll(/^## .*$/gm)].map((m) => m.index);
  const cuts = [0, ...starts, text.length].filter((v, i, a) => i === 0 || v !== a[i - 1]);
  const segments = [];
  for (let i = 0; i < cuts.length - 1; i++) segments.push(text.slice(cuts[i], cuts[i + 1]));
  let sample = null;
  const out = [];
  const touched = new Set();
  for (const [i, seg] of segments.entries()) {
    const spans = oqSpans(seg);
    sample ??= spans[0]?.raw ?? null;
    const target = spans.filter((s) => remove.has(s.q.oq_id) || replace.has(s.q.oq_id));
    if (!target.length) {
      out.push(seg);
      continue;
    }
    if (i === 0 && !seg.startsWith("## ")) return null; // OQ nằm trong prose đầu file
    if (spans.length !== 1) return null;
    const [s] = spans;
    touched.add(s.q.oq_id);
    if (remove.has(s.q.oq_id)) continue;
    const next = replace.get(s.q.oq_id);
    let body = seg.slice(0, s.start) + serializeLike(s.raw, next) + seg.slice(s.end);
    body = body.replace(/^## .*$/m, (h) => (h.includes(s.q.oq_id) ? `## ${next.oq_id} — ${next.type}` : h));
    out.push(body);
  }
  for (const id of [...remove, ...replace.keys()]) if (!touched.has(id)) return null;
  let result = out.join("");
  if (append.length) {
    result = result.replace(/\n*$/, "\n\n");
    result += append.map((q) => `## ${q.oq_id} — ${q.type}\n\n\`\`\`json\n${serializeLike(sample, q)}\n\`\`\``).join("\n\n") + "\n";
  }
  if (final) result = updateCountTable(result, final);
  return result;
}

function updateCountTable(text, oqs) {
  const first = text.search(/^## OQ-/m);
  const head = first < 0 ? text : text.slice(0, first);
  const rest = first < 0 ? "" : text.slice(first);
  if (!/^\|\s*\*\*Tổng\*\*\s*\|/m.test(head)) return text;
  const counts = new Map();
  for (const q of oqs) counts.set(q.type, (counts.get(q.type) ?? 0) + 1);
  const seen = new Set();
  let next = head.replace(/^\|\s*([A-Z_]+)\s*\|\s*\d+\s*\|$/gm, (line, type) => {
    seen.add(type);
    return `| ${type} | ${counts.get(type) ?? 0} |`;
  });
  const missing = [...counts.keys()].filter((t) => !seen.has(t)).map((t) => `| ${t} | ${counts.get(t)} |\n`).join("");
  next = next.replace(/^\|\s*\*\*Tổng\*\*\s*\|.*$/m, (line) => `${missing}| **Tổng** | **${oqs.length}** |`);
  return next + rest;
}
