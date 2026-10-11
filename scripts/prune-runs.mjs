#!/usr/bin/env node
// Báo cáo (và, nếu được yêu cầu rõ, xoá) những run trong runs/context/ đã đủ điều kiện
// xoá theo contract §15.
//
// LƯU Ý QUAN TRỌNG (thay đổi so với bản cũ): từ khi knowledge/ chuyển sang schema §5a,
// các file trong knowledge/ KHÔNG còn nhắc tới CTX-RUN-ID (hay bất kỳ run_id/ctx_run_id
// nào) dưới bất kỳ hình thức nào nữa. Vì vậy cách làm cũ — grep knowledge/** tìm chuỗi
// CTX-\d{8}-\d{2} rồi coi run KHÔNG được nhắc tới là "orphan an toàn để xoá" — giờ hoàn
// toàn sai: MỌI run sẽ luôn hiện ra là "orphan", kể cả run vừa publish xong 5 phút trước.
// Điều kiện xoá đúng theo §15 phải dựa vào run-manifest.json + open-questions.md, không
// dựa vào việc knowledge/ có nhắc tên run hay không nữa.
//
// Một run được coi là ĐỦ ĐIỀU KIỆN xoá khi CẢ HAI đúng:
//   1. run-manifest.json.status là terminal: PUBLISHED | BLOCKED | REJECTED | CONFLICT | DEFERRED
//      (KHÔNG PHẢI IN_PROGRESS — run còn dở không bao giờ được xoá).
//   2. Mọi oq_id trong run-manifest.json.produced_open_questions KHÔNG còn xuất hiện
//      trong open-questions.md của object tương ứng (nghĩa là open-question do run này
//      tạo ra hoặc để mở đã được một run sau đó resolve). Còn dù chỉ 1 oq_id chưa resolve
//      thì vẫn giữ nguyên run, không xoá — team còn cần quay lại evidence gốc.
//
// Run định dạng cũ (trước khi có produced_open_questions trong run-manifest.json) không
// đủ dữ liệu để tự động kết luận — liệt kê riêng để người kiểm tra thủ công, KHÔNG bao
// giờ tự xoá nhóm này dù có cờ --delete.
//
// Script mặc định CHỈ BÁO CÁO, không bao giờ tự xoá. Truyền --delete để xoá thật các run
// đủ điều kiện sau khi đã liệt kê — an toàn để làm vậy vì điều kiện ở trên đã đủ chặt.
//
//   node scripts/prune-runs.mjs             # chỉ liệt kê
//   node scripts/prune-runs.mjs --delete    # liệt kê rồi xoá những run đủ điều kiện

import { readFile, readdir, stat, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { walk } from "./lib/fs-utils.mjs";
import { extractOpenQuestions } from "./lib/open-questions.mjs";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const knowledgeProductsDir = path.join(rootDir, "knowledge", "products");
const runsDir = path.join(rootDir, "runs", "context");

const TERMINAL_STATUSES = new Set(["PUBLISHED", "BLOCKED", "REJECTED", "CONFLICT", "DEFERRED"]);

async function dirSize(dir) {
  const files = await walk(dir);
  const sizes = await Promise.all(files.map(async (f) => (await stat(f)).size));
  return sizes.reduce((a, b) => a + b, 0);
}

// Tập oq_id còn mở trên toàn bộ knowledge/. oq_id mang sẵn tên object
// (OQ-<object-key>-<nnn>, §4) nên tra toàn cục vẫn chính xác. Dùng parser thật thay vì
// tìm substring: "OQ-x-01" không được khớp nhầm vào "OQ-x-014".
async function loadOpenOqIds() {
  const ids = new Set();
  for (const file of await walk(knowledgeProductsDir)) {
    if (path.basename(file) !== "open-questions.md") continue;
    for (const e of extractOpenQuestions(await readFile(file, "utf8"))) if (e.oq_id) ids.add(e.oq_id);
  }
  return ids;
}

async function main() {
  const doDelete = process.argv.includes("--delete");
  const openOqIds = await loadOpenOqIds();

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

  const eligible = [];
  const pendingOq = [];
  const notTerminal = [];
  const needsManualCheck = [];

  for (const run of onDisk) {
    const manifestPath = path.join(run.runPath, "run-manifest.json");
    let manifest;
    try {
      manifest = JSON.parse(await readFile(manifestPath, "utf8"));
    } catch {
      needsManualCheck.push({ ...run, reason: "không đọc được run-manifest.json (thiếu file hoặc JSON hỏng)" });
      continue;
    }

    const status = manifest.status;
    if (!TERMINAL_STATUSES.has(status)) {
      notTerminal.push({ ...run, status: status ?? "(không rõ)" });
      continue;
    }

    if (!Array.isArray(manifest.produced_open_questions)) {
      needsManualCheck.push({
        ...run,
        reason: "chưa có produced_open_questions trong run-manifest.json (run định dạng cũ, trước redesign §15)"
      });
      continue;
    }

    const stillOpen = manifest.produced_open_questions.filter((oqId) => openOqIds.has(oqId));
    if (stillOpen.length) {
      pendingOq.push({ ...run, status, stillOpen });
    } else {
      eligible.push({ ...run, status });
    }
  }

  console.log(`Run trên đĩa                         : ${onDisk.length}`);
  console.log(`Đủ điều kiện xoá                     : ${eligible.length}`);
  console.log(`Còn open-question chưa resolve       : ${pendingOq.length}`);
  console.log(`Chưa terminal (IN_PROGRESS/khác)     : ${notTerminal.length}`);
  console.log(`Cần kiểm tra thủ công (định dạng cũ) : ${needsManualCheck.length}\n`);

  if (pendingOq.length) {
    console.log("== Còn open-question chưa resolve — GIỮ NGUYÊN ==");
    for (const r of pendingOq) {
      console.log(`  ${r.runId}  [${r.status}]  ${path.relative(rootDir, r.runPath)}`);
      console.log(`      oq_id còn treo: ${r.stillOpen.join(", ")}`);
    }
    console.log("");
  }

  if (notTerminal.length) {
    console.log("== Chưa terminal — GIỮ NGUYÊN ==");
    for (const r of notTerminal) {
      console.log(`  ${r.runId}  [${r.status}]  ${path.relative(rootDir, r.runPath)}`);
    }
    console.log("");
  }

  if (needsManualCheck.length) {
    console.log("== Cần kiểm tra thủ công — chưa có produced_open_questions ==");
    for (const r of needsManualCheck) {
      console.log(`  ${r.runId}  ${path.relative(rootDir, r.runPath)}  (${r.reason})`);
    }
    console.log("KHÔNG tự xoá nhóm này dù có --delete — không đủ dữ liệu để kết luận an toàn.\n");
  }

  if (!eligible.length) {
    console.log("Không có run nào đủ điều kiện xoá tự động lúc này.");
    return;
  }

  console.log("== Đủ điều kiện xoá (status terminal + mọi oq_id đã resolve) ==");
  let total = 0;
  for (const r of eligible) {
    const size = await dirSize(r.runPath);
    total += size;
    console.log(
      `  ${r.runId}  [${r.status}]  ${(size / 1024 / 1024).toFixed(1).padStart(7)} MB  ${path.relative(rootDir, r.runPath)}`
    );
  }
  console.log(`\nTổng: ${(total / 1024 / 1024).toFixed(1)} MB có thể thu hồi.`);

  if (!doDelete) {
    console.log("\nĐây là báo cáo — chưa xoá gì. Chạy lại với --delete để xoá thật các run trên.");
    console.log("Lưu ý: xoá file KHÔNG làm .git nhỏ lại (blob vẫn nằm trong history).");
    return;
  }

  console.log("\n== Đang xoá ==");
  for (const r of eligible) {
    await rm(r.runPath, { recursive: true, force: true });
    console.log(`  Đã xoá: ${path.relative(rootDir, r.runPath)}`);
  }
  console.log("\nXong. Nhắc lại: xoá file KHÔNG làm .git nhỏ lại (blob vẫn nằm trong history) —");
  console.log("nếu cần giải phóng dung lượng .git thật sự, đó là việc khác (rewrite history), không");
  console.log("thuộc phạm vi script này.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
