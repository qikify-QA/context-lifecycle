#!/usr/bin/env node
// Báo cáo (và, nếu được yêu cầu rõ, xoá) phần dư thừa trong runs/context/ theo contract §15.
//
// LƯU Ý QUAN TRỌNG: từ khi knowledge/ chuyển sang schema §5a, các file trong knowledge/
// KHÔNG còn nhắc tới CTX-RUN-ID (hay bất kỳ run_id/ctx_run_id nào) nữa. Vì vậy cách làm cũ
// — grep knowledge/** tìm chuỗi CTX-\d{8}-\d{2} rồi coi run KHÔNG được nhắc tới là "orphan
// an toàn để xoá" — hoàn toàn sai: MỌI run sẽ luôn hiện ra là "orphan", kể cả run vừa
// publish xong 5 phút trước. Điều kiện phải dựa vào run-manifest.json + open-questions.md.
//
// Giữ run KHÔNG phải để chạy lại run đó — trả lời một open question luôn là một run MỚI.
// Giữ là để quay lại EVIDENCE THÔ (ảnh chụp, network capture, response body) mà knowledge/
// không bao giờ chứa và staging không dựng lại được. Mức độ cần evidence thô khác nhau theo
// loại open question, nên luật chia ba mức thay vì giữ/xoá cả run:
//
//   1. XOÁ CẢ RUN — status terminal (PUBLISHED | BLOCKED | REJECTED | CONFLICT | DEFERRED)
//      và mọi oq_id trong produced_open_questions KHÔNG còn trong open-questions.md.
//
//   2. DỌN raw/ + candidate/ — run PUBLISHED mà mọi oq_id còn treo đều là NEEDS_CONFIRMATION.
//      Nhóm này chờ Dev/PO trả lời kèm nguồn riêng của họ; evidence thô của run cũ hầu như
//      không được mở lại. Giữ input/, run-manifest.json và review/ (hai file sau nằm trong git).
//
//   3. DỌN candidate/ — run PUBLISHED còn oq_id loại CONFLICT hoặc OPEN_ISSUE. Evidence thô
//      PHẢI giữ (CONFLICT là lúc cần biết QA đã thấy chính xác cái gì), nhưng candidate/ chỉ
//      là bản dựng trung gian đã được publish-apply chép sang knowledge/ — không còn giá trị
//      truy vết nào mà knowledge/ và review/verdict.json không có.
//
// Run CHƯA publish (BLOCKED | DEFERRED | REJECTED | CONFLICT) mà còn oq_id treo thì GIỮ
// NGUYÊN mọi thứ: run loại này có thể được resume, và candidate/ của nó là nơi duy nhất
// chứa phần việc chưa vào knowledge/.
//
// Run định dạng cũ (chưa có produced_open_questions) và run chưa terminal không bao giờ bị
// động tới, kể cả khi có --delete.
//
//   node scripts/prune-runs.mjs             # chỉ liệt kê
//   node scripts/prune-runs.mjs --delete    # liệt kê rồi thực hiện

import { readFile, readdir, stat, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { walk } from "./lib/fs-utils.mjs";
import { extractOpenQuestions } from "./lib/open-questions.mjs";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const knowledgeProductsDir = path.join(rootDir, "knowledge", "products");
const runsDir = path.join(rootDir, "runs", "context");

export const TERMINAL_STATUSES = new Set(["PUBLISHED", "BLOCKED", "REJECTED", "CONFLICT", "DEFERRED"]);

/**
 * Quyết định làm gì với một run. Thuần tuý: không đụng đĩa.
 *
 * @param manifest    nội dung run-manifest.json đã parse, hoặc null nếu không đọc được.
 * @param openOqTypes Map oq_id -> type của mọi open question CÒN MỞ trong knowledge/.
 * @returns { action, status, stillOpen, remove, reason }
 *          action: DELETE_RUN | PRUNE_EVIDENCE | PRUNE_CANDIDATE | KEEP | NOT_TERMINAL | MANUAL
 *          remove: thư mục con sẽ xoá (tương đối với thư mục run)
 */
export function classifyRun(manifest, openOqTypes) {
  if (!manifest) {
    return { action: "MANUAL", reason: "không đọc được run-manifest.json (thiếu file hoặc JSON hỏng)", remove: [] };
  }
  const status = manifest.status ?? "(không rõ)";
  if (!TERMINAL_STATUSES.has(manifest.status)) {
    return { action: "NOT_TERMINAL", status, remove: [] };
  }
  if (!Array.isArray(manifest.produced_open_questions)) {
    return {
      action: "MANUAL",
      status,
      reason: "chưa có produced_open_questions trong run-manifest.json (run định dạng cũ, trước redesign §15)",
      remove: []
    };
  }

  const stillOpen = manifest.produced_open_questions.filter((oqId) => openOqTypes.has(oqId));
  if (!stillOpen.length) return { action: "DELETE_RUN", status, stillOpen, remove: [] };

  // Run chưa publish còn oq treo: giữ nguyên — có thể resume, và candidate/ là nơi duy nhất
  // chứa phần việc chưa vào knowledge/.
  if (status !== "PUBLISHED") return { action: "KEEP", status, stillOpen, remove: [] };

  // type lạ hoặc thiếu được coi là "cần evidence" (bảo thủ): chỉ dọn candidate/.
  const onlyNeedsConfirmation = stillOpen.every((oqId) => openOqTypes.get(oqId) === "NEEDS_CONFIRMATION");
  return onlyNeedsConfirmation
    ? { action: "PRUNE_EVIDENCE", status, stillOpen, remove: ["raw", "candidate"] }
    : { action: "PRUNE_CANDIDATE", status, stillOpen, remove: ["candidate"] };
}

async function dirSize(dir) {
  const files = await walk(dir).catch(() => []);
  const sizes = await Promise.all(files.map(async (f) => (await stat(f)).size));
  return sizes.reduce((a, b) => a + b, 0);
}

// Map oq_id -> type của mọi open question còn mở trên toàn bộ knowledge/. oq_id mang sẵn tên
// object (OQ-<object-key>-<nnn>, §4) nên tra toàn cục vẫn chính xác. Dùng parser thật thay vì
// tìm substring: "OQ-x-01" không được khớp nhầm vào "OQ-x-014".
export async function loadOpenOqTypes(productsDir = knowledgeProductsDir) {
  const types = new Map();
  for (const file of await walk(productsDir).catch(() => [])) {
    if (path.basename(file) !== "open-questions.md") continue;
    for (const e of extractOpenQuestions(await readFile(file, "utf8"))) {
      if (e.oq_id) types.set(e.oq_id, e.type);
    }
  }
  return types;
}

const rel = (p) => path.relative(rootDir, p);
const mb = (n) => `${(n / 1024 / 1024).toFixed(1).padStart(7)} MB`;

async function main() {
  const doDelete = process.argv.includes("--delete");
  const openOqTypes = await loadOpenOqTypes();

  const onDisk = [];
  for (const dateDir of (await readdir(runsDir).catch(() => [])).sort()) {
    const full = path.join(runsDir, dateDir);
    if (!(await stat(full)).isDirectory()) continue;
    for (const runId of (await readdir(full)).sort()) {
      const runPath = path.join(full, runId);
      if (!(await stat(runPath)).isDirectory()) continue;
      onDisk.push({ runId, runPath });
    }
  }

  const byAction = { DELETE_RUN: [], PRUNE_EVIDENCE: [], PRUNE_CANDIDATE: [], KEEP: [], NOT_TERMINAL: [], MANUAL: [] };
  for (const run of onDisk) {
    let manifest = null;
    try {
      manifest = JSON.parse(await readFile(path.join(run.runPath, "run-manifest.json"), "utf8"));
    } catch {
      /* classifyRun xử lý manifest null */
    }
    const verdict = classifyRun(manifest, openOqTypes);
    byAction[verdict.action].push({ ...run, ...verdict });
  }

  console.log(`Run trên đĩa                          : ${onDisk.length}`);
  console.log(`Xoá cả run (oq đã resolve hết)        : ${byAction.DELETE_RUN.length}`);
  console.log(`Dọn raw/ + candidate/ (chỉ NEEDS_CONF): ${byAction.PRUNE_EVIDENCE.length}`);
  console.log(`Dọn candidate/ (còn CONFLICT/ISSUE)   : ${byAction.PRUNE_CANDIDATE.length}`);
  console.log(`Giữ nguyên (chưa publish, còn oq)     : ${byAction.KEEP.length}`);
  console.log(`Chưa terminal                         : ${byAction.NOT_TERMINAL.length}`);
  console.log(`Cần kiểm tra thủ công (định dạng cũ)  : ${byAction.MANUAL.length}\n`);

  for (const [action, title] of [
    ["KEEP", "Chưa publish mà còn open-question — GIỮ NGUYÊN"],
    ["NOT_TERMINAL", "Chưa terminal — GIỮ NGUYÊN"]
  ]) {
    if (!byAction[action].length) continue;
    console.log(`== ${title} ==`);
    for (const r of byAction[action]) console.log(`  ${r.runId}  [${r.status}]  ${rel(r.runPath)}`);
    console.log("");
  }

  if (byAction.MANUAL.length) {
    console.log("== Cần kiểm tra thủ công — chưa có produced_open_questions ==");
    for (const r of byAction.MANUAL) console.log(`  ${r.runId}  ${rel(r.runPath)}  (${r.reason})`);
    console.log("KHÔNG tự động làm gì nhóm này dù có --delete — không đủ dữ liệu để kết luận an toàn.\n");
  }

  // Tính dung lượng và in theo từng nhóm sẽ bị tác động.
  let total = 0;
  const plan = [];
  for (const [action, title] of [
    ["DELETE_RUN", "Xoá cả run (status terminal + mọi oq_id đã resolve)"],
    ["PRUNE_EVIDENCE", "Dọn raw/ + candidate/ (PUBLISHED, oq còn treo đều là NEEDS_CONFIRMATION)"],
    ["PRUNE_CANDIDATE", "Dọn candidate/ (PUBLISHED, còn oq CONFLICT hoặc OPEN_ISSUE)"]
  ]) {
    const rows = byAction[action];
    if (!rows.length) continue;
    console.log(`== ${title} ==`);
    for (const r of rows) {
      const targets = action === "DELETE_RUN" ? [r.runPath] : r.remove.map((d) => path.join(r.runPath, d));
      const existing = [];
      for (const t of targets) if (await stat(t).catch(() => null)) existing.push(t);
      if (!existing.length) continue;
      let size = 0;
      for (const t of existing) size += await dirSize(t);
      total += size;
      plan.push({ runId: r.runId, targets: existing, action });
      const what = action === "DELETE_RUN" ? "" : `  (${existing.map((t) => path.basename(t) + "/").join(" ")})`;
      console.log(`  ${r.runId}  [${r.status}]  ${mb(size)}  ${rel(r.runPath)}${what}`);
    }
    console.log("");
  }

  if (!plan.length) {
    console.log("Không có gì để dọn lúc này.");
    return;
  }
  console.log(`Tổng: ${(total / 1024 / 1024).toFixed(1)} MB có thể thu hồi.`);

  if (!doDelete) {
    console.log("\nĐây là báo cáo — chưa xoá gì. Chạy lại với --delete để thực hiện.");
    console.log("Lưu ý: xoá file KHÔNG làm .git nhỏ lại (blob vẫn nằm trong history).");
    return;
  }

  console.log("\n== Đang thực hiện ==");
  for (const p of plan) {
    for (const t of p.targets) {
      await rm(t, { recursive: true, force: true });
      console.log(`  ${p.action === "DELETE_RUN" ? "Đã xoá run" : "Đã dọn"}: ${rel(t)}`);
    }
  }
  console.log("\nXong. Nhắc lại: xoá file KHÔNG làm .git nhỏ lại (blob vẫn nằm trong history) —");
  console.log("nếu cần giải phóng dung lượng .git thật sự, đó là việc khác (rewrite history), không");
  console.log("thuộc phạm vi script này.");
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
