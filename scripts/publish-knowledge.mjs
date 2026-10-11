#!/usr/bin/env node
// Phát hành knowledge cho team: sinh manifest -> kiểm nhất quán -> kiểm không rò rỉ field
// nội bộ -> commit + tag + push NGAY TRONG submodule knowledge/ (repo qikify-QA/qa-knowledge).
//
// knowledge/ là git submodule trỏ tới qa-knowledge, nên publish KHÔNG cần commit/push repo
// build này. Muốn ghim phiên bản knowledge vào repo build thì tự `git add knowledge` (tuỳ chọn).
//
// Từ khi knowledge/ chuyển sang schema §5a, knowledge/ HOÀN TOÀN TỰ CHỨA: không còn giữ
// evidence_refs hay bất kỳ con trỏ nào vào runs/ (runs/ không đi kèm khi publish, và giờ
// cũng không cần đi kèm). Vì vậy bước rewrite evidence ref thành permalink GitHub (từng
// bắt buộc vì knowledge/ cũ chỉ chứa con trỏ tới evidence trong runs/) đã bị loại bỏ hoàn
// toàn — không còn gì để rewrite.
//
// Thay vào đó, script thêm 1 lưới an toàn: quét toàn bộ file sắp publish tìm các field bị
// cấm xuất hiện trong knowledge/ theo contract §5a (run_id, ctx_run_id, act_id,
// evidence_refs, đường dẫn runs/context). `context-quality-reviewer` đã phải chặn việc
// này trước khi cho publish_allowed: true, và orchestrator phải chạy "publish strip"
// trước khi ghi vào knowledge/ — nhưng nếu 1 object nào đó lọt qua các bước trên (bug,
// object cũ chưa được strip lại, v.v.), đây là chốt chặn cuối cùng trước khi rò rỉ sang
// repo consumer dùng chung cho cả team.
//
//   node scripts/publish-knowledge.mjs             # dry-run: chuẩn bị + kiểm, KHÔNG đẩy
//   node scripts/publish-knowledge.mjs --push      # commit + push thật trong knowledge/ (side effect: repo dùng chung)
//   node scripts/publish-knowledge.mjs --allow-unpublished   # cho qua object thiếu block publish

import { readFile, mkdir, rm, stat, cp } from "node:fs/promises";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { walk } from "./lib/fs-utils.mjs";
import { findForbiddenLeaks, findBadConfirmationRefs } from "./lib/forbidden-fields.mjs";

const execFileAsync = promisify(execFile);
const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const knowledgeDir = path.join(rootDir, "knowledge");
const stageDir = path.join(rootDir, ".publish-stage");

const SOURCE_REPO = process.env.CTX_SOURCE_REPO ?? "qikify-QA/context-lifecycle";
const TARGET_REPO = process.env.CTX_TARGET_REPO ?? "https://github.com/qikify-QA/qa-knowledge.git";

const doPush = process.argv.includes("--push");
const allowUnpublished = process.argv.includes("--allow-unpublished");

async function git(...args) {
  const { stdout } = await execFileAsync("git", args, { cwd: rootDir, maxBuffer: 32 * 1024 * 1024 });
  return stdout.trim();
}

// Danh sách field/đường dẫn cấm (§5a) nằm ở contracts/forbidden-fields.json;
// scripts/lib/forbidden-fields.mjs biên dịch nó. Bật blocking cho cảnh báo bằng
// PUBLISH_STRICT_IDS=1 (ID nội bộ trong prose) và PUBLISH_STRICT_SELFCONTAINED=1
// (tham chiếu trỏ ra ngoài gói publish).
const STRICT_IDS = process.env.PUBLISH_STRICT_IDS === "1";
const STRICT_SELFCONTAINED = process.env.PUBLISH_STRICT_SELFCONTAINED === "1";

async function main() {
  // 1. knowledge/ phải là submodule đã checkout. Sha repo build chỉ ghi vào commit message
  // để tra ngược (không bắt buộc đã push — knowledge publish độc lập với repo build).
  try {
    await git("-C", knowledgeDir, "rev-parse", "--git-dir");
  } catch {
    console.error("FAIL: knowledge/ không phải git repo. Chạy: git submodule update --init knowledge");
    process.exit(1);
  }
  const sha = await git("rev-parse", "HEAD");

  // 2. Sinh manifest + kiểm nhất quán
  console.log("== Kiểm tra knowledge ==");
  try {
    const { stdout } = await execFileAsync("node", [path.join(rootDir, "scripts", "generate-manifest.mjs")], { cwd: rootDir });
    process.stdout.write(stdout);
  } catch (e) {
    process.stdout.write(e.stdout ?? "");
    console.error(`FAIL: generate-manifest.mjs lỗi:\n${e.stderr ?? e.message}`);
    process.exit(1);
  }
  const manifest = JSON.parse(await readFile(path.join(knowledgeDir, "manifest.json"), "utf8"));

  if (manifest.summary.unpublished > 0 && !allowUnpublished) {
    const names = manifest.products
      .flatMap((p) => p.objects)
      .filter((o) => o.status === "UNPUBLISHED")
      .map((o) => o.object_key);
    console.error(`\nFAIL: ${names.length} object thiếu block publish hợp lệ: ${names.join(", ")}`);
    console.error("Consumer sẽ không biết mình đang dùng version nào của các object này.");
    console.error("Hoặc bổ sung block publish, hoặc chạy lại với --allow-unpublished để publish");
    console.error("kèm nhãn UNPUBLISHED (chúng vẫn sẽ hiện rõ trong manifest).");
    process.exit(1);
  }

  // 3. Dựng staging: products/** + manifest + template gửi request. KHÔNG có runs/.
  //
  // Template PHẢI đi kèm: consumer chỉ clone repo qa-knowledge, không clone repo build,
  // nên template nằm trong contracts/ của repo này là thứ họ không bao giờ đọc được.
  // Không ship = họ không biết gửi request thế nào cho đúng.
  await rm(stageDir, { recursive: true, force: true });
  await mkdir(stageDir, { recursive: true });
  await cp(path.join(knowledgeDir, "products"), path.join(stageDir, "products"), { recursive: true });
  await cp(path.join(knowledgeDir, "manifest.json"), path.join(stageDir, "manifest.json"));
  await mkdir(path.join(stageDir, "how-to-request"), { recursive: true });
  // Khuôn CCR đầy đủ thuộc skill `create-ccr`; repo chỉ ship phụ lục product-specific
  // và hướng dẫn dùng context cho consumer.
  for (const name of ["ccr-product-appendix.md", "consumer-guide.md"]) {
    await cp(path.join(rootDir, "contracts", name), path.join(stageDir, "how-to-request", name));
  }

  // 4. Lưới an toàn: staged knowledge/ không được rò rỉ field nội bộ nào (§5a). Đây là
  // chốt chặn cuối trước khi rời repo build sang repo consumer dùng chung cho cả team —
  // publish strip (orchestrator) và audit của context-quality-reviewer đáng lẽ đã chặn
  // việc này từ trước, nhưng object nào lọt qua (bug, dữ liệu cũ chưa migrate lại, v.v.)
  // thì dừng ở đây, không để lọt tiếp.
  const { leaks, warnings } = await findForbiddenLeaks(stageDir, { strictIds: STRICT_IDS, strictSelfContained: STRICT_SELFCONTAINED });
  for (const { file, name } of warnings) {
    console.warn(`  WARN [${name}] ${path.relative(stageDir, file)}`);
  }
  if (warnings.length) {
    console.warn(
      `  ${warnings.length} cảnh báo: ID nội bộ trong nội dung (PUBLISH_STRICT_IDS=1 để blocking) ` +
        `và/hoặc tham chiếu trỏ ra ngoài gói publish (PUBLISH_STRICT_SELFCONTAINED=1 để blocking). ` +
        `Loại thứ hai là LINK CHẾT với consumer — họ chỉ nhận products/**, manifest.json, how-to-request/**.`
    );
  }
  if (leaks.length) {
    console.error(`\nFAIL: ${leaks.length} field/đường dẫn bị cấm rò rỉ vào knowledge/ sắp publish:`);
    for (const { file, name } of leaks) {
      console.error(`  [${name}] ${path.relative(stageDir, file)}`);
    }
    console.error("Đây là field thuộc quá trình biết được sự thật (run/act/doc nào tạo ra), không phải");
    console.error("sự thật hiện tại — knowledge/ không được giữ. Kiểm lại bước publish strip của");
    console.error("orchestrator (§5a) cho (các) object trên trước khi publish lại.");
    process.exit(1);
  }

  // 4b. confirmation_source được PHÉP dưới knowledge/ (§3), nên nó không bị
  // pattern nào ở trên chặn — và chính vì thế `ref` của nó là chỗ một ID
  // run-local dễ lọt qua nhất. Check dương, không phải grep.
  const badRefs = await findBadConfirmationRefs(stageDir);
  if (badRefs.length) {
    console.error(`\nFAIL: ${badRefs.length} confirmation_source không hợp lệ (§3, §12.5):`);
    for (const b of badRefs) {
      console.error(`  [${b.kb_id ?? "?"}] ${path.relative(stageDir, b.file)} — ${b.reason}${b.ref ? `: ${b.ref}` : ""}`);
    }
    console.error("`ref` phải là chuỗi citation người đọc tự tra được (tên tài liệu@version §heading — url),");
    console.error("không phải DOC-/DSEC-/CLM- hay đường dẫn vào runs/. `authored_on` là ngày của nguồn.");
    process.exit(1);
  }

  const stageSize = (await Promise.all((await walk(stageDir)).map(async (f) => (await stat(f)).size))).reduce(
    (a, b) => a + b,
    0
  );

  console.log(`\n== Đã chuẩn bị ==`);
  console.log(`  commit sha      : ${sha}`);
  console.log(`  kích thước      : ${(stageSize / 1024 / 1024).toFixed(1)} MB`);
  console.log(`  object          : ${manifest.summary.published} published, ${manifest.summary.stale} stale, ${manifest.summary.unpublished} unpublished`);
  console.log(`  staging         : ${path.relative(rootDir, stageDir)}`);

  if (!doPush) {
    console.log(`\nDRY-RUN — chưa đẩy đi đâu. Kiểm tra ${path.relative(rootDir, stageDir)} rồi chạy lại với --push.`);
    return;
  }

  // 5. Commit + tag + push trong submodule knowledge/. how-to-request/ được đồng bộ từ
  // contracts/ vào knowledge/ trước khi commit để consumer luôn có bản mới nhất.
  const tag = `ctx-${new Date().toISOString().slice(0, 10)}`;
  console.log(`\n== Đẩy knowledge/ -> ${TARGET_REPO} (tag ${tag}) ==`);
  await rm(path.join(knowledgeDir, "how-to-request"), { recursive: true, force: true });
  await cp(path.join(stageDir, "how-to-request"), path.join(knowledgeDir, "how-to-request"), { recursive: true });
  const run = (...a) => git("-C", knowledgeDir, ...a);
  await run("add", "-A");
  if (!(await run("status", "--porcelain"))) {
    console.log("knowledge/ không có thay đổi — không có gì để publish.");
    return;
  }
  await run("commit", "-m", `Publish knowledge from ${SOURCE_REPO}@${sha.slice(0, 8)}`);
  await run("tag", "-f", tag);
  await run("push", "origin", "HEAD");
  await run("push", "-f", "origin", tag);
  console.log(`Xong. Team lấy bằng: git clone --depth 1 ${TARGET_REPO}`);
}

main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
