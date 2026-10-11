// Sức khoẻ context theo product → object, tính lúc đọc từ file trong knowledge/.
// Không ghi file nào — knowledge/ không phình thêm (DECISIONS 2.20).

import { readFile } from "node:fs/promises";
import path from "node:path";
import { listDirs, readJsonOr, walk, exists } from "./fs-utils.mjs";
import { extractOpenQuestions } from "./open-questions.mjs";
import { readChangelogRefs } from "./changelog.mjs";
import { getProduct, staleAfterDays } from "./product-config.mjs";
import { knowledgeProductsDir } from "./run-layout.mjs";

const daysSince = (d) => (Number.isNaN(Date.parse(d)) ? null : Math.floor((Date.now() - Date.parse(d)) / 86400000));

/** Số liệu một object. `dir` = knowledge/products/<product>/<object>. */
export async function objectHealth(dir, staleDays = 45) {
  const meta = await readJsonOr(path.join(dir, "publish-meta.json"), null);
  const kinds = { CONFIRMED_EXPECTED: 0, OBSERVED_CURRENT: 0, INFERRED: 0, PROPOSED: 0 };
  let unresolved = 0;
  let knownDefects = 0;
  const oracle = { STRONG: 0, BASELINE: 0, NONE: 0 };
  for (const file of await walk(dir)) {
    const name = path.basename(file);
    if (name === "kb.json") {
      for (const it of (await readJsonOr(file, [])) ?? []) {
        if (it.knowledge_kind in kinds) kinds[it.knowledge_kind]++;
        if (it.status === "UNRESOLVED") unresolved++;
        if (it.status === "KNOWN_DEFECT") knownDefects++;
      }
    } else if (file.includes(`${path.sep}checklists${path.sep}`) && name.endsWith(".json")) {
      for (const c of (await readJsonOr(file, {}))?.checks ?? []) {
        const s = c.oracle?.oracle_strength;
        if (s in oracle) oracle[s]++;
      }
    }
  }
  const oqFile = path.join(dir, "open-questions.md");
  const oq = { CONFLICT: 0, NEEDS_CONFIRMATION: 0, OPEN_ISSUE: 0 };
  if (await exists(oqFile)) for (const e of extractOpenQuestions(await readFile(oqFile, "utf8"))) oq[e.type in oq ? e.type : "OPEN_ISSUE"]++;
  const refs = (await readChangelogRefs(path.join(dir, "CHANGELOG.md"))).filter((r) => !["BOOTSTRAP", "USER-ANNOTATION"].includes(r.ccr_ref));
  const last = refs.sort((a, b) => String(b.date).localeCompare(String(a.date)))[0] ?? null;
  const ageDays = meta?.published_at ? daysSince(meta.published_at) : null;
  const totalKb = Object.values(kinds).reduce((a, b) => a + b, 0);
  const totalChecks = Object.values(oracle).reduce((a, b) => a + b, 0);
  const flags = [];
  if (!meta) flags.push("unpublished");
  if (ageDays != null && ageDays > staleDays) flags.push("stale");
  if (totalKb && kinds.CONFIRMED_EXPECTED === 0) flags.push("no_confirmed_expected");
  if (unresolved) flags.push("open_conflicts");
  if (totalChecks && oracle.STRONG / totalChecks < 0.2) flags.push("weak_oracle");
  return {
    object_key: path.basename(dir),
    version: meta?.published_context_version ?? null,
    published_at: meta?.published_at ?? null,
    mode: meta?.mode ?? null,
    age_days: ageDays,
    kb: { total: totalKb, ...kinds },
    unresolved_conflicts: unresolved,
    known_defects: knownDefects,
    open_questions: oq,
    checks: { total: totalChecks, ...oracle },
    last_ccr: last ? { ccr_ref: last.ccr_ref, date: last.date } : null,
    flags
  };
}

/** Toàn bộ product trong knowledge/products (hoặc `productsDir` khác). */
export async function contextHealth(productsDir = knowledgeProductsDir) {
  const products = [];
  for (const product of (await listDirs(productsDir)).sort()) {
    const staleDays = staleAfterDays(await getProduct(product));
    const objects = [];
    for (const object of (await listDirs(path.join(productsDir, product))).sort()) {
      if (object.startsWith("_")) continue;
      objects.push(await objectHealth(path.join(productsDir, product, object), staleDays));
    }
    const sum = (f) => objects.reduce((a, o) => a + f(o), 0);
    products.push({
      product_key: product,
      objects,
      totals: {
        objects: objects.length,
        flagged: objects.filter((o) => o.flags.length).length,
        kb: sum((o) => o.kb.total),
        confirmed_expected: sum((o) => o.kb.CONFIRMED_EXPECTED),
        unresolved_conflicts: sum((o) => o.unresolved_conflicts),
        open_questions: sum((o) => o.open_questions.CONFLICT + o.open_questions.NEEDS_CONFIRMATION + o.open_questions.OPEN_ISSUE)
      }
    });
  }
  return { generated_at: new Date().toISOString(), products };
}
