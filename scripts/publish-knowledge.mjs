#!/usr/bin/env node
// Phát hành knowledge cho team: sinh manifest -> kiểm nhất quán -> kiểm không rò rỉ field
// nội bộ -> đẩy sang repo qikify-QA/qa-knowledge.
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
//   node scripts/publish-knowledge.mjs --push      # đẩy thật (side effect: repo dùng chung)
//   node scripts/publish-knowledge.mjs --allow-unpublished   # cho qua object thiếu block publish

import { readFile, mkdir, rm, readdir, stat, cp } from "node:fs/promises";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import path from "node:path";
import { fileURLToPath } from "node:url";

const execFileAsync = promisify(execFile);
const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const knowledgeDir = path.join(rootDir, "knowledge");
const stageDir = path.join(rootDir, ".publish-stage");

const SOURCE_REPO = "qikify-QA/context-lifecycle";
const TARGET_REPO = "git@github.com:qikify-QA/qa-knowledge.git";

const doPush = process.argv.includes("--push");
const allowUnpublished = process.argv.includes("--allow-unpublished");

async function git(...args) {
  const { stdout } = await execFileAsync("git", args, { cwd: rootDir, maxBuffer: 32 * 1024 * 1024 });
  return stdout.trim();
}

async function walk(dir, out = []) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(full, out);
    else out.push(full);
  }
  return out;
}

// Field/đường dẫn cấm xuất hiện trong bất kỳ file nào dưới knowledge/, theo contract §5a.
// Đây là field thuộc "quá trình biết được sự thật" (run/act/doc nào tạo ra nó) —
// knowledge/ chỉ được nói "sự thật hiện tại", không được nói quá trình đó.
//
// Contract §5a liệt 20+ tên; script này trước đây chỉ kiểm 5. Bổ sung phần còn
// thiếu, NHƯNG không copy nguyên dạng /\b<name>\b/ — làm thế sẽ vỡ publish ngay,
// đã xác minh trên dữ liệu thật:
//   - "gate": có 62 hit chữ "gate" trong knowledge/, trong đó ĐANG được publish:
//     _registry.json "password gate", order/.../profile.json "should gate
//     regression test design", artwork/open-questions.md "bị gate bởi".
//     -> chỉ soi dạng KEY JSON ("gate":), prose không bị đụng.
//   - "ent_id": là substring của fulfillment_id và parent_id (12 hit trong
//     product-base/**). -> bắt buộc dạng key hoặc word-bounded.
// Vì vậy tên field nội bộ chỉ soi ở dạng `"<name>":` và chỉ trong file .json.
const JSON_KEY_NAMES = [
  "run_id",
  "ctx_run_id",
  "act_id",
  "apiop_id",
  "ent_id",
  "evidence_refs",
  "source_refs",
  "upstream_artifact_ids",
  "gate",
  "candidate_local_id",
  "legacy_kb_refs",
  // mode doc (contract §4, §5a) — ID run-local, ngoài thư mục run là vô nghĩa
  "doc_id",
  "dsec_id",
  "claim_id",
  "claim_key",
  "docset_id",
  "doc_refs",
  "normativity",
  "doc_support",
  "claim_ids",
  "strength"
];

const JSON_KEY_PATTERNS = JSON_KEY_NAMES.map((name) => ({
  name,
  re: new RegExp(`"${name}"\\s*:`),
  applies: (f) => f.endsWith(".json")
}));

// id_remap_* là một họ field, không phải một tên.
const JSON_KEY_FAMILY = [
  { name: "id_remap_*", re: /"id_remap_[a-z0-9_]*"\s*:/, applies: (f) => f.endsWith(".json") }
];

// Đường dẫn thì soi cả .json lẫn .md, kể cả trong prose — một path trỏ vào runs/
// là leak bất kể nó nằm ở field hay ở câu văn.
const PATH_PATTERNS = [
  { name: "runs/context", re: /runs\/context/, applies: () => true },
  { name: "input/docs", re: /input\/docs/, applies: () => true }
];

// Loại leak mà danh sách tên field BỎ SÓT: một `ACT-01-02-003` viết trong prose
// của feature-summary.md không chứa chữ "act_id" nào, nên không pattern tên nào
// thấy nó. Đây là chế độ WARN một vòng trước khi biến thành blocking — bật
// blocking bằng PUBLISH_STRICT_IDS=1.
const ID_IN_PROSE_PATTERNS = [
  { name: "ACT-<n> trong nội dung", re: /\bACT-\d/, applies: () => true },
  { name: "APIOP-<n> trong nội dung", re: /\bAPIOP-\d/, applies: () => true },
  { name: "CTX-<date> trong nội dung", re: /\bCTX-\d{8}-\d/, applies: () => true },
  { name: "DOC-<n> trong nội dung", re: /\bDOC-\d/, applies: () => true },
  { name: "DSEC-<n> trong nội dung", re: /\bDSEC-\d/, applies: () => true },
  { name: "CLM-<n> trong nội dung", re: /\bCLM-\d/, applies: () => true }
];

const STRICT_IDS = process.env.PUBLISH_STRICT_IDS === "1";

// Tự chứa (contract §5a): knowledge/ sau khi publish không được trỏ RA NGOÀI gói
// publish. Gói publish chỉ gồm products/**, manifest.json, how-to-request/** —
// nên một tham chiếu tới knowledge/_open-issues/..., knowledge/<legacy>.md, hay
// bất kỳ artifact nào của runs/ là một LINK CHẾT với mọi consumer, dù nó vẫn mở
// được trên máy người publish.
//
// Tham chiếu NỘI BỘ trong products/** (vd "xem artwork/kb.json") KHÔNG vi phạm:
// file đó cũng được publish, nên bundle vẫn tự chứa.
//
// Mặc định WARN. Bật blocking bằng PUBLISH_STRICT_SELFCONTAINED=1.
const OUTSIDE_BUNDLE_RE =
  /(?:runs\/\w|review\/(?:verdict|gate-results|knowledge-diff)\.json|candidate\/|intermediate\/|input\/docs\/|input\/ccr|docs-input\/|contracts\/|knowledge\/_open-issues\/|knowledge\/[\w.\-]+\.md|run-manifest\.json|product-kb\.json|ccr-fastpath-plan\.json|doc-manifest\.json)[\w.\-/]*/g;
const STRICT_SELFCONTAINED = process.env.PUBLISH_STRICT_SELFCONTAINED === "1";

const FORBIDDEN_PATTERNS = [...JSON_KEY_PATTERNS, ...JSON_KEY_FAMILY, ...PATH_PATTERNS];

// `confirmation_source` KHÔNG nằm trong danh sách cấm — nó được phép dưới
// knowledge/ (contract §3, §5a) vì nó trỏ ra nguồn thẩm quyền BÊN NGOÀI. Đã
// kiểm: không pattern nào ở trên khớp nó ("source_refs" != "confirmation_source").
// Nhưng chính `ref` của nó là chỗ một ID run-local dễ lọt qua dưới vỏ một field
// được phép, nên nó có check dương riêng bên dưới.
// `ref` phải là CÂU TRÍCH DẪN tự mô tả, còn đọc hiểu được sau khi nguồn bị xoá
// (contract §3, §5a). Cấm id run-local VÀ cấm cú pháp đường dẫn.
const CONFIRMATION_REF_BAD = /DOC-\d|DSEC-\d|CLM-\d|runs\//;
const CONFIRMATION_REF_PATHLIKE = /(?:\.{0,2}\/)?[\w.\-]+\/[\w.\-]+\.(?:md|json|mjs|ya?ml|txt|csv|har)\b/;

async function findForbiddenLeaks(dir) {
  const leaks = [];
  const warnings = [];
  for (const file of await walk(dir)) {
    if (!file.endsWith(".json") && !file.endsWith(".md")) continue;
    const text = await readFile(file, "utf8");
    for (const { name, re, applies } of FORBIDDEN_PATTERNS) {
      if (applies(file) && re.test(text)) leaks.push({ file, name });
    }
    for (const { name, re, applies } of ID_IN_PROSE_PATTERNS) {
      if (applies(file) && re.test(text)) (STRICT_IDS ? leaks : warnings).push({ file, name });
    }
    const outside = [...new Set((text.match(OUTSIDE_BUNDLE_RE) || []).map((m) => m.replace(/[.,);`]+$/, "")))];
    for (const ref of outside) {
      const entry = { file, name: `trỏ ra ngoài gói publish: ${ref}` };
      (STRICT_SELFCONTAINED ? leaks : warnings).push(entry);
    }
  }
  return { leaks, warnings };
}

/**
 * Check DƯƠNG: quét mọi kb.json staged, tìm item có confirmation_source.ref
 * mang ID run-local. Đây là lưới cuối trước khi nội dung rời repo build.
 */
async function findBadConfirmationRefs(dir) {
  const bad = [];
  for (const file of await walk(dir)) {
    if (path.basename(file) !== "kb.json") continue;
    let items;
    try {
      items = JSON.parse(await readFile(file, "utf8"));
    } catch {
      continue; // shape sai đã bị generate-manifest bắt
    }
    if (!Array.isArray(items)) continue;
    for (const item of items) {
      const cs = item?.confirmation_source;
      if (!cs) continue;
      if (typeof cs.ref === "string" && CONFIRMATION_REF_BAD.test(cs.ref)) {
        bad.push({ file, kb_id: item.kb_id, reason: "ref chứa ID run-local", ref: cs.ref });
      }
      if (typeof cs.ref === "string" && CONFIRMATION_REF_PATHLIKE.test(cs.ref)) {
        bad.push({
          file,
          kb_id: item.kb_id,
          reason: "ref dùng cú pháp đường dẫn — phải là câu trích dẫn còn đọc hiểu được sau khi nguồn bị xoá (§3)",
          ref: cs.ref
        });
      }
      if (cs.ref && typeof cs.ref !== "string") {
        bad.push({ file, kb_id: item.kb_id, reason: "ref phải là chuỗi citation ở bản published (§3)" });
      }
      if (!cs.authored_on) {
        bad.push({ file, kb_id: item.kb_id, reason: "thiếu authored_on — supersede lần sau không có gì để so (§12.5)" });
      }
    }
  }
  return bad;
}

async function main() {
  // 1. Trạng thái git phải sạch — tag publish (ctx-YYYY-MM-DD) và commit message ở repo
  // consumer trỏ về đúng 1 sha của repo build này; sha đó chỉ có ý nghĩa cho người khác
  // nếu mọi thứ đã được commit và đẩy lên (không ai mở được sha chỉ tồn tại cục bộ).
  const dirty = await git("status", "--porcelain", "knowledge", "runs");
  if (dirty) {
    console.error("FAIL: knowledge/ hoặc runs/ còn thay đổi chưa commit.");
    console.error("Publish gắn tag theo commit sha, nên phải commit + push repo build TRƯỚC khi publish.");
    console.error(dirty.split("\n").slice(0, 10).join("\n"));
    process.exit(1);
  }

  const sha = await git("rev-parse", "HEAD");
  let pushedSha = null;
  try {
    pushedSha = await git("rev-parse", "origin/main");
  } catch {
    /* chưa có upstream */
  }
  if (pushedSha && pushedSha !== sha) {
    console.error(`FAIL: HEAD (${sha.slice(0, 8)}) chưa được đẩy lên origin/main (${pushedSha.slice(0, 8)}).`);
    console.error("Commit sha ghi vào message publish sẽ không ai truy cập được. Chạy: git push");
    process.exit(1);
  }

  // 2. Sinh manifest + kiểm nhất quán
  console.log("== Kiểm tra knowledge ==");
  await execFileAsync("node", [path.join(rootDir, "scripts", "generate-manifest.mjs")], {
    cwd: rootDir,
    stdio: "inherit"
  }).catch(() => {});
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
  // Khuôn CCR đầy đủ KHÔNG ship từ đây — nó thuộc skill `create-ccr` và dùng chung
// cho mọi product. Repo chỉ ship PHỤ LỤC product-specific. Trước đây ship cả 2
// template (trong đó 1 bản .json đã tự khai deprecated và lỗi nhịp cấu trúc), nên
// consumer đọc được một khuôn không còn ai dùng.
for (const name of ["ccr-product-appendix.md"]) {
    await cp(path.join(rootDir, "contracts", name), path.join(stageDir, "how-to-request", name));
  }

  // 4. Lưới an toàn: staged knowledge/ không được rò rỉ field nội bộ nào (§5a). Đây là
  // chốt chặn cuối trước khi rời repo build sang repo consumer dùng chung cho cả team —
  // publish strip (orchestrator) và audit của context-quality-reviewer đáng lẽ đã chặn
  // việc này từ trước, nhưng object nào lọt qua (bug, dữ liệu cũ chưa migrate lại, v.v.)
  // thì dừng ở đây, không để lọt tiếp.
  const { leaks, warnings } = await findForbiddenLeaks(stageDir);
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
    console.error("không phải DOC-/SEC-/CLM- hay đường dẫn vào runs/. `authored_on` là ngày của nguồn.");
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

  // 5. Đẩy thật
  const tag = `ctx-${new Date().toISOString().slice(0, 10)}`;
  const workDir = path.join(stageDir, ".repo");
  console.log(`\n== Đẩy sang ${TARGET_REPO} (tag ${tag}) ==`);
  await execFileAsync("git", ["clone", "--depth", "1", TARGET_REPO, workDir]);
  for (const name of ["products", "manifest.json", "how-to-request"]) {
    await rm(path.join(workDir, name), { recursive: true, force: true });
    await cp(path.join(stageDir, name), path.join(workDir, name), { recursive: true });
  }
  const run = (...a) => execFileAsync("git", a, { cwd: workDir });
  await run("add", "-A");
  await run("commit", "-m", `Publish knowledge from ${SOURCE_REPO}@${sha.slice(0, 8)}`);
  await run("tag", tag);
  await run("push", "origin", "HEAD");
  await run("push", "origin", tag);
  console.log(`Xong. Team lấy bằng: git clone --depth 1 ${TARGET_REPO}`);
}

main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
