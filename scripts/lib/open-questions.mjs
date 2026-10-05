// Parser duy nhất cho open-questions.md (contract §5a, §12.3b).
//
// Trước đây có HAI parser cho cùng một file và chúng không giống nhau:
//   - ops-board/server.mjs        : quét brace-balanced, chấp mọi wrapper
//   - scripts/generate-manifest.mjs: đòi fence ```json
// Hệ quả: một entry viết không có fence sẽ HIỆN trên ops-board nhưng MẤT khỏi
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
    let depth = 0;
    for (let j = i; j < text.length; j++) {
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
