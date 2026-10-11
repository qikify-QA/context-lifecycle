#!/usr/bin/env node
// Sức khoẻ context theo product/object, tính từ knowledge/ lúc chạy (không ghi file).
//
//   node scripts/ctx/health.mjs            # bảng tóm tắt
//   node scripts/ctx/health.mjs --json     # đầy đủ, dạng JSON (ops-board /api/health dùng cùng hàm)
//   node scripts/ctx/health.mjs --flagged  # chỉ object có cờ

import { parseArgs } from "../lib/fs-utils.mjs";
import { contextHealth } from "../lib/context-health.mjs";

const args = parseArgs();
const health = await contextHealth();
if (args.json === true) {
  console.log(JSON.stringify(health, null, 2));
} else {
  for (const p of health.products) {
    const t = p.totals;
    console.log(`\n${p.product_key} — ${t.objects} object (${t.flagged} có cờ), KB ${t.kb} (${t.confirmed_expected} confirmed), conflict ${t.unresolved_conflicts}, OQ ${t.open_questions}`);
    for (const o of p.objects) {
      if (args.flagged === true && !o.flags.length) continue;
      const oq = o.open_questions;
      console.log(
        `  ${o.object_key.padEnd(28)} v${o.version ?? "-"} ${String(o.age_days ?? "-").padStart(4)}d  KB ${String(o.kb.total).padStart(4)} CE ${String(o.kb.CONFIRMED_EXPECTED).padStart(3)}  ` +
          `oracle S/B/N ${o.checks.STRONG}/${o.checks.BASELINE}/${o.checks.NONE}  OQ ${oq.CONFLICT}c/${oq.NEEDS_CONFIRMATION}n/${oq.OPEN_ISSUE}o  ` +
          `${o.last_ccr ? `last ${o.last_ccr.ccr_ref}` : ""} ${o.flags.length ? `[${o.flags.join(", ")}]` : ""}`
      );
    }
  }
}
