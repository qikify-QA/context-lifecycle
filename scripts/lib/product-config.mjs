// Product config loader — nguồn duy nhất cho mọi giá trị từng bị hardcode là "teeinblue".
//
// Repo này là MỘT repo phục vụ N product-key (contract §12.1). Mỗi product có
// một file config/products/<key>.json; tập product mà repo chịu trách nhiệm là
// tập file có status: "ACTIVE".
//
// Consumer: scripts/generate-manifest.mjs, scripts/sync-appendix.mjs, scripts/ctx/*,
// ops-board/server.mjs. Một nguồn, không nhiều bản copy-paste.
//
// Config ACTIVE được validate theo config/products/_schema.json ngay lúc load —
// config sai là throw, không im lặng chạy với giá trị đoán.
//
// File _*.json (vd _template.json) bị bỏ qua, cùng quy ước với cách
// generate-manifest.mjs discover knowledge/products/*.

import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { check, loadSchema } from "./schema.mjs";

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
    if (cfg.status === "ACTIVE") {
      const problems = await validateProduct(cfg);
      if (problems.length) throw new Error(`config/products/${name} không hợp lệ:\n  - ${problems.join("\n  - ")}`);
    }
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

/** Đường dẫn tuyệt đối tới explore playbook của product, hoặc null. */
export function explorePlaybookPath(cfg) {
  const p = cfg?.explore?.playbook;
  return typeof p === "string" && !isPlaceholder(p) ? path.join(rootDir, p) : null;
}

/** Danh sách lỗi của một config (rỗng = hợp lệ). */
export async function validateProduct(cfg) {
  const errs = [];
  check(await loadSchema(path.join(configDir, "_schema.json")), cfg, cfg.product_key ?? "config", errs, { rejectPlaceholders: true });
  const out = errs.map((e) => `${e.path}: ${e.problem}`);
  const modes = cfg.modes ?? {};
  if (modes.explore_enabled) {
    if (!(modes.allowed_explorers ?? []).length) out.push("modes.explore_enabled=true nhưng allowed_explorers rỗng");
    const playbook = explorePlaybookPath(cfg);
    if (!playbook) out.push("modes.explore_enabled=true nhưng thiếu explore.playbook");
    else {
      try {
        await stat(playbook);
      } catch {
        out.push(`explore.playbook không tồn tại: ${cfg.explore.playbook}`);
      }
    }
  } else if ((modes.allowed_explorers ?? []).length) {
    out.push("modes.explore_enabled=false nhưng allowed_explorers không rỗng");
  }
  if (cfg.environments && !(cfg.environments.allowed ?? []).includes(cfg.environments.default)) {
    out.push(`environments.default "${cfg.environments.default}" không nằm trong environments.allowed`);
  }
  return out;
}

export function staleAfterDays(cfg, fallback = 45) {
  const v = cfg?.publish?.stale_after_days;
  return Number.isFinite(v) && v > 0 ? v : fallback;
}

export function consumerLabel(cfg, productKey) {
  return cfg?.publish?.consumer_label || productKey;
}

export { configDir, rootDir };
