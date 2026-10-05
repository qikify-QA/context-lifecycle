#!/usr/bin/env node
// Sinh knowledge/manifest.json — index mà daily test agent của QA member đọc ĐẦU TIÊN
// để biết có product/object nào, version bao nhiêu, cũ chưa, dùng được không.
//
// Không có manifest thì consumer phải quét cả cây mới biết có gì, và không có
// cách nào biết một object đang thiếu block publish hay version bị lệch.
//
// Cũng sinh lại knowledge/_open-issues/consolidated-open-questions.md — bản tổng hợp
// theo product, gộp mọi open-questions.md theo object (§5a). Tầng object-level mới là
// nguồn thật (oq_id được tạo/sửa ở đó); file consolidated CHỈ ĐỌC, luôn bị ghi đè lại
// toàn bộ ở đây để 2 tầng không bao giờ lệch nhau do sửa tay.
//
// LƯU Ý (§5a): không field nào trong knowledge/ được phép chứa run_id/ctx_run_id/act_id/
// evidence_refs/... — script này KHÔNG đọc và KHÔNG ghi ctx_run_id vào manifest.json dù
// object kb.json có vô tình còn field đó hay không (ctx_run_id là field bị cấm tuyệt đối
// dưới knowledge/, kể cả trong manifest.json do chính script này sinh ra).
//
//   node scripts/generate-manifest.mjs           # ghi knowledge/manifest.json + consolidated-open-questions.md
//   node scripts/generate-manifest.mjs --check   # chỉ kiểm, không ghi; exit 1 nếu có vấn đề

import { readFile, writeFile, mkdir, readdir, stat } from "node:fs/promises";
import {
  loadProducts,
  getProduct,
  onboardingProducts,
  staleAfterDays,
  consumerLabel
} from "./lib/product-config.mjs";
import { extractOpenQuestions, findUnfencedEntries } from "./lib/open-questions.mjs";
import { readChangelogRefs } from "./lib/changelog.mjs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const knowledgeDir = path.join(rootDir, "knowledge");
const productsDir = path.join(knowledgeDir, "products");
const openIssuesDir = path.join(knowledgeDir, "_open-issues");
const consolidatedFile = path.join(openIssuesDir, "consolidated-open-questions.md");
const checkOnly = process.argv.includes("--check");

const OQ_TYPE_ORDER = ["CONFLICT", "NEEDS_CONFIRMATION", "OPEN_ISSUE"];
const OQ_TYPE_LABEL = {
  CONFLICT: "Conflict — 2 statement mâu thuẫn nhau",
  NEEDS_CONFIRMATION: "Needs confirmation — chưa có authority xác nhận",
  OPEN_ISSUE: "Open issue — gap khác (unknown area, scope chưa rõ, chưa explore được)"
};

// Ngưỡng coi context là cũ. Không phải luật cứng — chỉ để consumer tự cân nhắc,
// vì freshness thật nằm ở từng KB item chứ không ở mức object.
//
// Giá trị thật lấy per-product từ config/products/<key>.json -> publish.stale_after_days
// (KB sinh từ tài liệu không "cũ" cùng tốc độ với hành vi quan sát trên staging).
// Hằng này chỉ còn là fallback khi product chưa khai.
const STALE_AFTER_DAYS_DEFAULT = 45;

async function readJson(file) {
  return JSON.parse(await readFile(file, "utf8"));
}

async function exists(file) {
  try {
    await stat(file);
    return true;
  } catch {
    return false;
  }
}

async function listDirs(dir) {
  try {
    return (await readdir(dir, { withFileTypes: true })).filter((e) => e.isDirectory()).map((e) => e.name);
  } catch {
    return [];
  }
}

async function listJson(dir) {
  try {
    return (await readdir(dir)).filter((n) => n.endsWith(".json"));
  } catch {
    return [];
  }
}

function daysSince(dateStr) {
  const t = Date.parse(dateStr);
  if (Number.isNaN(t)) return null;
  return Math.floor((Date.now() - t) / 86400000);
}

// Version của một object nằm ở publish-meta.json, nhưng feature-summary.md cũng
// nhắc lại nó bằng prose. Hai chỗ lệch nhau là lỗi vệ sinh có thật đã gặp, nên
// đọc cả hai và báo khi khác.
function versionFromSummary(text) {
  const m = text.match(/\*\*Published context version:\*\*\s*(\d+)/);
  return m ? m[1] : null;
}

async function describeObject(productKey, objectKey, staleDays = STALE_AFTER_DAYS_DEFAULT) {
  const dir = path.join(productsDir, productKey, objectKey);
  const kbFile = path.join(dir, "kb.json");
  const publishMetaFile = path.join(dir, "publish-meta.json");
  const rel = (f) => path.relative(knowledgeDir, f);

  const entry = {
    object_key: objectKey,
    status: "PUBLISHED",
    published_context_version: null,
    published_at: null,
    mode: null,
    features: [],
    checklists: [],
    files: {},
    issues: []
  };

  if (!(await exists(kbFile))) {
    entry.status = "UNPUBLISHED";
    entry.issues.push("Không có kb.json");
    return entry;
  }
  entry.files.kb = rel(kbFile);

  // Schema mới (§5a): kb.json là MẢNG phẳng các KB item, không mang theo block
  // publish nào — publish/version/mode giờ sống ở publish-meta.json riêng, cạnh
  // kb.json (KHÔNG chứa ctx_run_id — field đó bị cấm tuyệt đối dưới knowledge/).
  let objectKbItems;
  try {
    objectKbItems = await readJson(kbFile);
    if (!Array.isArray(objectKbItems)) {
      throw new Error("kb.json phải là 1 mảng JSON phẳng các KB item (§5a), không phải object bọc ngoài");
    }
  } catch (e) {
    entry.status = "UNPUBLISHED";
    entry.issues.push(`kb.json không hợp lệ: ${e.message}`);
    return entry;
  }

  if (!(await exists(publishMetaFile))) {
    entry.status = "UNPUBLISHED";
    entry.issues.push("Thiếu publish-meta.json — consumer không biết đang dùng version nào");
  } else {
    let pub;
    try {
      pub = await readJson(publishMetaFile);
    } catch (e) {
      entry.status = "UNPUBLISHED";
      entry.issues.push(`publish-meta.json không parse được: ${e.message}`);
      pub = null;
    }
    if (pub && !pub.published_context_version) {
      entry.status = "UNPUBLISHED";
      entry.issues.push("publish-meta.json thiếu published_context_version");
    } else if (pub) {
      entry.published_context_version = String(pub.published_context_version);
      entry.published_at = pub.published_at ?? null;
      entry.mode = pub.mode ?? null;
      // Không đọc/ghi ctx_run_id: field đó bị cấm tuyệt đối dưới knowledge/ (§5a),
      // kể cả khi publish-meta.json lỡ còn giữ nó do nhầm lẫn.
    }
  }

  const summaryFile = path.join(dir, "feature-summary.md");
  if (await exists(summaryFile)) {
    entry.files.feature_summary = rel(summaryFile);
    const summaryVersion = versionFromSummary(await readFile(summaryFile, "utf8"));
    if (summaryVersion && entry.published_context_version && summaryVersion !== entry.published_context_version) {
      entry.issues.push(
        `Version lệch: kb.json nói ${entry.published_context_version}, feature-summary.md nói ${summaryVersion}`
      );
    }
  }

  entry.features = (await listDirs(path.join(dir, "features"))).sort();
  entry.checklists = (await listJson(path.join(dir, "checklists"))).map((n) => n.replace(/\.json$/, "")).sort();

  const age = entry.published_at ? daysSince(entry.published_at) : null;
  if (age !== null) {
    entry.age_days = age;
    if (age > staleDays) {
      entry.status = entry.status === "PUBLISHED" ? "STALE" : entry.status;
      entry.issues.push(`Publish cách đây ${age} ngày (ngưỡng ${staleDays})`);
    }
  }

  // Một object toàn OBSERVED_CURRENT thì dùng được để khám phá regression,
  // nhưng KHÔNG dùng làm expected result. Consumer cần biết điều này trước khi
  // mở file, nên đếm luôn ở manifest.
  //
  // KB item giờ trải trên nhiều file (kb.json object-level + 1 file/feature, §5),
  // nên đếm phải gộp tất cả, không chỉ đọc mỗi kb.json gốc.
  const candidates = [...objectKbItems];
  for (const featureKey of entry.features) {
    const featureKbFile = path.join(dir, "features", featureKey, "kb.json");
    if (!(await exists(featureKbFile))) continue;
    try {
      const featureItems = await readJson(featureKbFile);
      if (Array.isArray(featureItems)) candidates.push(...featureItems);
      else entry.issues.push(`features/${featureKey}/kb.json không phải mảng JSON phẳng (§5a)`);
    } catch (e) {
      entry.issues.push(`features/${featureKey}/kb.json không parse được: ${e.message}`);
    }
  }
  // Mọi ccr_ref mà object này trỏ tới — dùng cho hygiene check ở main(), bị
  // strip trước khi ghi manifest (nội bộ, không phải thứ consumer cần đọc).
  entry.ccr_refs_seen = [
    ...new Set(candidates.map((c) => c?.last_updated?.ccr_ref).filter((v) => typeof v === "string"))
  ];

  // Object-level kb.json rỗng là HỢP LỆ (object không có fact dùng chung toàn
  // object), nhưng [] không phân biệt được "đã rà, không có" với "chưa ai rà".
  // Cảnh báo để sự mơ hồ đó không im lặng — xem DECISIONS.md.
  if (objectKbItems.length === 0 && candidates.length > objectKbItems.length) {
    entry.issues.push(
      "kb.json mức object rỗng trong khi feature shard có item — nếu object này thật sự không có fact dùng chung " +
        "toàn object thì ghi 1 OQ type OPEN_ISSUE để nói rõ là đã rà; [] trần không phân biệt được 'đã rà' với 'chưa rà'"
    );
  }

  if (candidates.length) {
    const confirmed = candidates.filter((c) => c.knowledge_kind === "CONFIRMED_EXPECTED").length;
    entry.kb_items = {
      total: candidates.length,
      confirmed_expected: confirmed,
      usable_as_oracle: confirmed > 0
    };
    if (confirmed === 0) {
      entry.issues.push("0 item CONFIRMED_EXPECTED — chỉ dùng cho regression discovery, không dùng làm expected result");
    }
  }

  return entry;
}

// Định dạng chuẩn của open-questions.md theo object (§5a, thống nhất với các agent đang
// migrate dữ liệu song song): 1 heading `## <oq_id> — <TYPE>` ngay sau đó là 1 fenced
// code block ```json chứa đúng object JSON của mục đó, ví dụ:
//
//   ## OQ-artwork-014 — CONFLICT
//
//   ```json
//   {"oq_id": "OQ-artwork-014", "type": "CONFLICT", "feature_id": "layer-config-image",
//    "summary": "...", "side_a": "...", "side_b": "..."}
//   ```
//
// Đây là cách đáng tin cậy để lấy dữ liệu có cấu trúc (oq_id/type/summary/...) ra khỏi
// file — không cố parse markdown/prose tự do. Heading chỉ để người đọc lướt nhanh, JSON
// trong fence mới là nguồn dữ liệu thật được đọc ở đây.
// Parser sống ở scripts/lib/open-questions.mjs — dùng CHUNG với ops-board.
// Bản cũ ở đây chỉ đọc fence ```json, trong khi ops-board đọc brace-balanced,
// nên entry không fence sẽ hiện trên board mà mất khỏi bản consolidated gửi
// PO/Dev. Một parser, không hai.
function extractOpenQuestionEntries(text) {
  return extractOpenQuestions(text);
}

// Regenerate knowledge/_open-issues/consolidated-open-questions.md từ toàn bộ
// open-questions.md theo object (§5a) — file này CHỈ ĐỌC, luôn bị ghi đè hoàn toàn ở
// đây, không sửa tay để 2 tầng (object-level nguồn thật vs consolidated tổng hợp)
// không bao giờ lệch nhau.
async function buildConsolidatedOpenQuestions(products) {
  const objectSections = [];
  let totalEntries = 0;

  for (const product of products) {
    for (const obj of product.objects) {
      const file = path.join(productsDir, product.product_key, obj.object_key, "open-questions.md");
      if (!(await exists(file))) continue;
      const entries = extractOpenQuestionEntries(await readFile(file, "utf8"));
      if (!entries.length) continue;
      totalEntries += entries.length;

      const byType = new Map();
      for (const e of entries) {
        const type = OQ_TYPE_ORDER.includes(e.type) ? e.type : "OPEN_ISSUE";
        if (!byType.has(type)) byType.set(type, []);
        byType.get(type).push(e);
      }
      for (const list of byType.values()) list.sort((a, b) => String(a.oq_id).localeCompare(String(b.oq_id)));

      const lines = [];
      lines.push(`## ${obj.object_key} (\`knowledge/products/${product.product_key}/${obj.object_key}/open-questions.md\`) — ${entries.length} mục\n`);
      for (const type of OQ_TYPE_ORDER) {
        const list = byType.get(type);
        if (!list || !list.length) continue;
        lines.push(`### ${OQ_TYPE_LABEL[type]}\n`);
        for (const e of list) {
          const featurePart = e.feature_id ? ` (feature: ${e.feature_id})` : "";
          lines.push(`- **[${e.oq_id}]**${featurePart} ${e.summary ?? "(thiếu summary)"}`);
          if (type === "CONFLICT") {
            if (e.side_a) lines.push(`    - Phía A: ${e.side_a}`);
            if (e.side_b) lines.push(`    - Phía B: ${e.side_b}`);
          }
        }
        lines.push("");
      }
      objectSections.push(lines.join("\n"));
    }
  }

  const header = [
    `# Open Questions tổng hợp — ${products.map((p) => p.consumer_label ?? p.product_key).join(" · ")}`,
    "",
    "File này được SINH TỰ ĐỘNG bởi `scripts/generate-manifest.mjs` từ toàn bộ " +
      "`open-questions.md` theo object (§5a của contract) — KHÔNG sửa tay ở đây. " +
      "Cần thêm/sửa/resolve 1 open question thì sửa ở file object-level tương ứng rồi " +
      "chạy lại script; sửa trực tiếp ở đây sẽ bị ghi đè mất ở lần chạy sau.",
    "",
    totalEntries
      ? `Tổng: ${totalEntries} open question đang mở trên ${objectSections.length} object.`
      : "Không có open question nào đang mở.",
    ""
  ].join("\n");

  return `${header}\n${objectSections.join("\n")}`.trimEnd() + "\n";
}

async function main() {
  const products = [];
  const changelogRefs = [];
  const productKeysOnDisk = (await listDirs(productsDir)).sort();
  for (const productKey of productKeysOnDisk) {
    const objectsDir = path.join(productsDir, productKey); // object nằm trực tiếp dưới product (§5)
    const cfg = await getProduct(productKey);
    const staleDays = staleAfterDays(cfg, STALE_AFTER_DAYS_DEFAULT);
    const objects = [];
    for (const objectKey of (await listDirs(objectsDir)).sort()) {
      if (objectKey.startsWith("_")) continue; // _archive, v.v.
      objects.push(await describeObject(productKey, objectKey, staleDays));
      const clFile = path.join(objectsDir, objectKey, "CHANGELOG.md");
      for (const r of await readChangelogRefs(clFile)) {
        changelogRefs.push({ ...r, product_key: productKey, object_key: objectKey });
      }
    }
    const registryFile = path.join(objectsDir, "_registry.json");
    // Tầng product (§5, optional). Nếu không đọc/đếm ở đây thì ai ghi
    // _product-kb.json sẽ thấy nó im lặng không vào manifest — một cái bẫy.
    const productKbFile = path.join(productsDir, productKey, "_product-kb.json");
    let productKb = null;
    if (await exists(productKbFile)) {
      try {
        const items = await readJson(productKbFile);
        if (Array.isArray(items)) {
          const confirmed = items.filter((c) => c.knowledge_kind === "CONFIRMED_EXPECTED");
          productKb = {
            file: path.relative(knowledgeDir, productKbFile),
            total: items.length,
            confirmed_expected: confirmed.length
          };
        } else {
          productKb = { file: path.relative(knowledgeDir, productKbFile), error: "không phải mảng JSON phẳng (§5a)" };
        }
      } catch (e) {
        productKb = { file: path.relative(knowledgeDir, productKbFile), error: `không parse được: ${e.message}` };
      }
    }
    const entry = {
      product_key: productKey,
      product_kb: productKb,
      consumer_label: consumerLabel(cfg, productKey),
      registry: (await exists(registryFile)) ? path.relative(knowledgeDir, registryFile) : null,
      objects
    };
    // knowledge/products/<key>/ mà không có config/products/<key>.json là FAIL:
    // từ đây trở xuống mọi consumer (manifest, publish, ops-board) sẽ phải ĐOÁN
    // ngưỡng freshness, environment và project_id của product này.
    if (!cfg) {
      entry.config_missing = true;
      entry.objects.forEach((o) => {
        o.status = "UNPUBLISHED";
        o.issues.push(
          `Thiếu config/products/${productKey}.json — không xác định được environment/freshness/project_id cho product này`
        );
      });
    }
    products.push(entry);
  }

  // Chiều ngược lại chỉ là warn: khai config trước khi có knowledge là quy trình
  // onboarding bình thường.
  const knownOnDisk = new Set(productKeysOnDisk);
  const declaredButEmpty = (await loadProducts()).filter((p) => !knownOnDisk.has(p.product_key));
  const onboarding = await onboardingProducts();

  const allObjects = products.flatMap((p) => p.objects);

  // Mảng phẳng giữ nguyên cho tương thích consumer; detail để tra ngược.
  const byRef = new Map();
  for (const r of changelogRefs) {
    const cur = byRef.get(r.ccr_ref);
    if (!cur || r.date > cur.date) byRef.set(r.ccr_ref, r);
  }
  const resolvedDetail = changelogRefs
    .slice()
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
    .map((r) => ({
      ccr_ref: r.ccr_ref,
      product_key: r.product_key,
      object_key: r.object_key,
      date: r.date,
      mode: r.mode,
      published_context_version:
        allObjects.find((o) => o.object_key === r.object_key)?.published_context_version ?? null
    }));
  const resolvedRefs = [...byRef.values()]
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
    .map((r) => r.ccr_ref);

  // Hygiene: kb.json trỏ một ccr_ref mà CHANGELOG không có dòng nào chứa nó
  // nghĩa là publish đã quên ghi CHANGELOG — và CHANGELOG là đường phục hồi duy
  // nhất sau khi supersede xoá statement cũ (§12.5). Chiều ngược lại là bình
  // thường (dòng migration, dòng resolve OQ).
  const knownRefs = new Set(changelogRefs.map((r) => r.ccr_ref));
  const orphanRefs = new Map();
  for (const product of products) {
    for (const obj of product.objects) {
      for (const ref of obj.ccr_refs_seen ?? []) {
        // 3 quy ước hợp lệ (§5a): mã CCR, "bootstrap", "user-annotation".
        // Chỉ mã CCR mới cần có dòng CHANGELOG tương ứng.
        if (!/^(?:CBS|CCR|QA)-/i.test(ref)) continue;
        if (!knownRefs.has(ref.toUpperCase())) {
          orphanRefs.set(`${obj.object_key}:${ref}`, { object_key: obj.object_key, ref });
        }
      }
    }
  }

  // strip field nội bộ trước khi nó vào manifest.json
  for (const product of products) for (const obj of product.objects) delete obj.ccr_refs_seen;

  const manifest = {
    schema_version: "1.0",
    artifact_type: "KnowledgeManifest",
    generated_at: new Date().toISOString().slice(0, 10),
    source_repo: "qikify-QA/context-lifecycle",
    how_to_use:
      "Đọc file này trước. Mỗi object có status (PUBLISHED/STALE/UNPUBLISHED), version, và issues[]. " +
      "Object UNPUBLISHED hoặc có kb_items.usable_as_oracle=false thì KHÔNG dùng làm expected result — " +
      "chỉ dùng để khám phá regression. Cần thay đổi context: gửi Context Change Request trên QA Hub " +
      "(section CCR của task, tag context-builder); template nằm ngay trong repo này ở how-to-request/.",
    summary: {
      products: products.length,
      objects: allObjects.length,
      published: allObjects.filter((o) => o.status === "PUBLISHED").length,
      stale: allObjects.filter((o) => o.status === "STALE").length,
      unpublished: allObjects.filter((o) => o.status === "UNPUBLISHED").length,
      objects_with_issues: allObjects.filter((o) => o.issues.length).length,
      products_missing_config: products.filter((p) => p.config_missing).map((p) => p.product_key),
      products_declared_without_knowledge: declaredButEmpty.map((p) => p.product_key),
      products_onboarding: onboarding.map((p) => ({ product_key: p.product_key, status: p.status }))
    },
    // §12.4 rule 5. Derive từ CHANGELOG.md của từng object — nguồn sự thật thật
    // sự, vì mỗi publish đều ghi 1 dòng ở đó. Trước đây field này bị gán cứng []
    // mỗi lần sinh, nên giá trị điền tay bị xoá ở lần chạy kế tiếp.
    resolved_requests: resolvedRefs,
    resolved_requests_detail: resolvedDetail,
    products
  };

  const blocking = allObjects.filter((o) => o.status === "UNPUBLISHED");
  for (const o of allObjects) {
    for (const issue of o.issues) console.log(`  [${o.status}] ${o.object_key}: ${issue}`);
  }
  for (const { object_key, ref } of orphanRefs.values()) {
    console.log(`  [changelog] ${object_key}: kb.json trỏ ccr_ref "${ref}" nhưng CHANGELOG.md không có dòng nào chứa nó`);
  }
  for (const p of declaredButEmpty) {
    console.log(
      `  [config] ${p.product_key}: khai trong config/products/ nhưng chưa có knowledge/products/${p.product_key}/ — chưa bootstrap`
    );
  }
  for (const p of onboarding) {
    console.log(
      `  [config] ${p.product_key}: status=${p.status} (chưa ACTIVE) — KHÔNG được nhặt Proposal trên QA Hub (contract §12.1)`
    );
  }
  console.log(
    `\n${manifest.summary.products} product (${(await loadProducts()).length} khai trong config, ` +
      `${(await onboardingProducts()).length} chưa ACTIVE), ` +
      `${manifest.summary.objects} object: ${manifest.summary.published} published, ` +
      `${manifest.summary.stale} stale, ${manifest.summary.unpublished} unpublished`
  );

  if (checkOnly) {
    if (blocking.length) {
      console.error(`\nFAIL: ${blocking.length} object chưa publish được: ${blocking.map((o) => o.object_key).join(", ")}`);
      process.exit(1);
    }
    console.log("OK: mọi object đều có block publish hợp lệ");
    return;
  }

  await writeFile(path.join(knowledgeDir, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
  console.log("Đã ghi knowledge/manifest.json");

  const consolidated = await buildConsolidatedOpenQuestions(products);
  await mkdir(openIssuesDir, { recursive: true });
  await writeFile(consolidatedFile, consolidated, "utf8");
  console.log(`Đã ghi ${path.relative(rootDir, consolidatedFile)}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
