// Product config loader — nguồn duy nhất cho mọi giá trị từng bị hardcode là "teeinblue".
//
// Repo này là MỘT repo phục vụ N product-key (contract §12.1). Mỗi product có
// một file config/products/<key>.json; tập product mà repo chịu trách nhiệm là
// tập file có status: "ACTIVE".
//
// Có 3 consumer: scripts/generate-manifest.mjs, scripts/publish-knowledge.mjs,
// ops-board/server.mjs. Chúng từng tự đoán giá trị mỗi nơi một kiểu — và đó
// đúng là cách `confidence_source` / `confirmation_source` đã lệch nhau. Một
// nguồn, không ba bản copy-paste.
//
// File _*.json (vd _template.json) bị bỏ qua, cùng quy ước với cách
// generate-manifest.mjs discover knowledge/products/*.

import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const configDir = path.join(rootDir, "config", "products");

let cache = null;

/** Mọi product config đọc được, kể cả status != ACTIVE. Sort theo product_key. */
export async function loadProducts() {
  if (cache) return cache;
  let names;
  try {
    names = (await readdir(configDir)).filter((n) => n.endsWith(".json") && !n.startsWith("_"));
  } catch {
    // Chưa có config/products/ — trả rỗng thay vì throw, để consumer tự quyết
    // (generate-manifest cảnh báo, ops-board hiện "unknown").
    cache = [];
    return cache;
  }
  const out = [];
  for (const name of names.sort()) {
    const file = path.join(configDir, name);
    let cfg;
    try {
      cfg = JSON.parse(await readFile(file, "utf8"));
    } catch (e) {
      throw new Error(`config/products/${name} không parse được: ${e.message}`);
    }
    const expected = name.replace(/\.json$/, "");
    if (cfg.product_key !== expected) {
      throw new Error(
        `config/products/${name}: product_key "${cfg.product_key}" không khớp tên file "${expected}". ` +
          `Tên file là khoá tra cứu, lệch là mọi lookup sau đó sai im lặng.`
      );
    }
    out.push(cfg);
  }
  cache = out;
  return cache;
}

/** Placeholder `<<< ĐIỀN ... >>>` chưa được thay = giá trị chưa dùng được. */
export function isPlaceholder(v) {
  return typeof v === "string" && v.includes("<<<");
}

/**
 * Product mà repo đang thực sự chịu trách nhiệm. `status: "ONBOARDING"` là
 * trạng thái trung gian: đã khai config nhưng qa_hub.project_id còn placeholder
 * hoặc knowledge/products/<key>/ chưa tồn tại. Nó KHÔNG được nhặt Proposal —
 * gọi QA Hub bằng một chuỗi placeholder còn tệ hơn là không gọi.
 */
export async function activeProducts() {
  return (await loadProducts()).filter((p) => p.status === "ACTIVE");
}

/** Product khai trong config nhưng chưa sẵn sàng — để script cảnh báo, không im lặng. */
export async function onboardingProducts() {
  return (await loadProducts()).filter((p) => p.status !== "ACTIVE");
}

export async function getProduct(productKey) {
  if (!productKey) return null;
  return (await loadProducts()).find((p) => p.product_key === productKey) ?? null;
}

/** Map project_id -> product_key, dùng cho vòng quét Proposal (contract §12.1). */
export async function getProductByProjectId(projectId) {
  if (!projectId) return null;
  if (isPlaceholder(projectId)) return null;
  return (
    (await activeProducts()).find(
      (p) => p.qa_hub?.project_id === projectId && !isPlaceholder(p.qa_hub?.project_id)
    ) ?? null
  );
}

/**
 * Chỉ trả về product_key khi có ĐÚNG MỘT product ACTIVE.
 * Dùng cho fallback ở ops-board: với 1 product thì hành vi y như default cũ,
 * với >1 product thì trả null — thà hiện "unknown" còn hơn dán nhãn sai
 * product rồi đi đọc feature-summary.md của một object thuộc product khác.
 */
export async function soleActiveProductKey() {
  const actives = await activeProducts();
  return actives.length === 1 ? actives[0].product_key : null;
}

/** knowledge/products/<key>/<object>/... -> <key>. Trả null nếu không khớp. */
export function resolveProductFromKnowledgePath(p) {
  const m = String(p).replace(/\\/g, "/").match(/knowledge\/products\/([^/]+)\//);
  return m ? m[1] : null;
}

export function staleAfterDays(cfg, fallback = 45) {
  const v = cfg?.publish?.stale_after_days;
  return Number.isFinite(v) && v > 0 ? v : fallback;
}

export function consumerLabel(cfg, productKey) {
  return cfg?.publish?.consumer_label || productKey;
}

export { configDir, rootDir };
