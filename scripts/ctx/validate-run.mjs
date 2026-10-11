#!/usr/bin/env node
// Validate artifact của một run theo contracts/schemas/*.schema.json + các luật có
// điều kiện giữa field (contract §3, §4, gates.md). Read-only.
//
//   node scripts/ctx/validate-run.mjs --run CTX-...                  # mọi artifact có trên đĩa
//   node scripts/ctx/validate-run.mjs --run CTX-... --stage kb       # chỉ một nhóm
//
// Stage: manifest · ccr-plan · approvals · doc · kb · profile · checklist · diff · verdict.
// Orchestrator gọi sau mỗi bước của subagent; lỗi → retry đúng agent đó.
// Exit 0 = sạch, 1 = có lỗi, 2 = input sai.

import { readdir } from "node:fs/promises";
import path from "node:path";
import { parseArgs, readJson, exists } from "../lib/fs-utils.mjs";
import { resolveRunDir, rootDir } from "../lib/run-layout.mjs";
import { check, loadSchema } from "../lib/schema.mjs";

const schemaDir = path.join(rootDir, "contracts", "schemas");
const DOC_MODES = new Set(["DOC_BOOTSTRAP", "CCR_INGEST"]);

const STAGES = {
  manifest: { files: ["run-manifest.json"], schema: "run-manifest", envelope: false },
  "ccr-plan": { files: ["input/ccr-fastpath-plan.json"], schema: "ccr-plan", envelope: false },
  approvals: { files: ["input/approvals.json"], schema: "approvals", envelope: false },
  doc: { dir: "intermediate/doc", match: /^DOC-\d+\.json$/, schema: "doc-evidence" },
  kb: { dir: "candidate/product-kb", match: /\.json$/, schema: "kb-shard" },
  profile: { dir: "candidate/feature-profiles", match: /\.json$/, schema: "feature-profile" },
  checklist: { dir: "candidate/checklists", match: /\.json$/, schema: "checklist" },
  diff: { files: ["review/knowledge-diff.json"], schema: "knowledge-diff" },
  verdict: { files: ["review/verdict.json"], schema: "verdict" }
};

const authoredOn = (cs) => cs?.authored_on ?? (typeof cs?.ref === "object" ? cs.ref?.authored_on : undefined);

// Luật có điều kiện, theo stage. Mỗi hàm nhận (body, ctx) và trả [{ path, problem }].
const RULES = {
  "ccr-plan": (body) =>
    (body.claims ?? []).flatMap((c, i) => {
      const at = `claims[${i}]`;
      const out = [];
      if (c.strength === "S3") {
        if (!c.confirmation_source) out.push({ path: at, problem: "claim S3 thiếu confirmation_source (§12.3a)" });
        else if (!authoredOn(c.confirmation_source)) out.push({ path: `${at}.confirmation_source`, problem: "thiếu authored_on" });
      } else if (c.confirmation_source) {
        out.push({ path: at, problem: `claim ${c.strength} không được có confirmation_source` });
      }
      return out;
    }),
  kb: (body, ctx) => {
    const out = [];
    const featureKey = body.kb_context?.feature_key;
    if (ctx.file && !path.basename(ctx.file).startsWith("_") && featureKey && `${featureKey}.json` !== path.basename(ctx.file)) {
      out.push({ path: "kb_context.feature_key", problem: `"${featureKey}" không khớp tên file shard` });
    }
    (body.kb_candidates ?? []).forEach((it, i) => {
      const at = `kb_candidates[${i}](${it.kb_id ?? "?"})`;
      const cs = it.confirmation_source;
      // Item carry-forward từ base mang sẵn last_updated (normalizer chỉ gán last_updated
      // cho item base). Luật confirmation_source áp cho item tạo mới hoặc sửa (§3) — item
      // legacy thiếu nguồn (DECISIONS §6) được chép nguyên trạng thì không bị chặn ở đây.
      const carried = Boolean(it.last_updated);
      if (it.knowledge_kind === "CONFIRMED_EXPECTED" && carried && !cs) {
        // legacy known debt
      } else if (it.knowledge_kind === "CONFIRMED_EXPECTED") {
        if (!cs) out.push({ path: at, problem: "CONFIRMED_EXPECTED thiếu confirmation_source (§3)" });
        else {
          if (!authoredOn(cs)) out.push({ path: `${at}.confirmation_source`, problem: "thiếu authored_on (§3)" });
          if (cs.type === "dev_doc" && !cs.derivation) out.push({ path: `${at}.confirmation_source`, problem: "dev_doc thiếu derivation (§3)" });
        }
      } else if (cs && it.knowledge_kind) {
        out.push({ path: at, problem: `${it.knowledge_kind} không được có confirmation_source (§3)` });
      }
      if (it.status === "KNOWN_DEFECT" && it.knowledge_kind !== "OBSERVED_CURRENT") out.push({ path: at, problem: "KNOWN_DEFECT phải là OBSERVED_CURRENT (§3)" });
      if (it.status === "UNRESOLVED" && !it.conflict_group) out.push({ path: at, problem: "UNRESOLVED thiếu conflict_group (§5a)" });
      if (ctx.mode === "DOC_BOOTSTRAP" && it.scope?.environment !== "documented") out.push({ path: `${at}.scope.environment`, problem: "mode doc phải là documented (§5a)" });
      if (DOC_MODES.has(ctx.mode) && (it.act_ids ?? []).length) out.push({ path: `${at}.act_ids`, problem: "mode doc không có ACT-ID (§4)" });
    });
    return out;
  },
  profile: (body, ctx) =>
    ctx.mode === "DOC_BOOTSTRAP"
      ? (body.feature_profiles ?? []).flatMap((p, i) =>
          (p.observed_validations ?? []).length ? [{ path: `feature_profiles[${i}].observed_validations`, problem: "mode doc phải rỗng (C4)" }] : []
        )
      : [],
  checklist: (body, ctx) =>
    (body.checklists ?? []).flatMap((cl, i) =>
      (cl.checks ?? []).flatMap((c, j) => {
        const at = `checklists[${i}].checks[${j}](${c.check_id ?? "?"})`;
        const out = [];
        if (c.oracle?.oracle_strength === "NONE" && c.status !== "NEEDS_CONFIRMATION") out.push({ path: at, problem: "oracle NONE phải NEEDS_CONFIRMATION (C5)" });
        if (DOC_MODES.has(ctx.mode) && (c.act_ids ?? []).length) out.push({ path: `${at}.act_ids`, problem: "mode doc không có ACT-ID (§4)" });
        return out;
      })
    ),
  diff: (body, ctx) =>
    (body.change_details ?? []).flatMap((c, i) => {
      const at = `change_details[${i}](${c.change_id ?? c.kb_id ?? "?"})`;
      const out = [];
      const approval = ctx.approvals.get(c.kb_id);
      if (c.requires_human_decision && c.resolution === "SUPERSEDE" && approval?.decision !== "ACCEPT_CANDIDATE") {
        out.push({ path: at, problem: "SUPERSEDE cần người quyết nhưng chưa có approval ACCEPT_CANDIDATE trong input/approvals.json" });
      }
      if (approval && approval.decision !== "ACCEPT_CANDIDATE" && c.resolution === "SUPERSEDE") {
        out.push({ path: at, problem: `approval ${approval.decision} mâu thuẫn với resolution SUPERSEDE` });
      }
      if (c.resolution === "SUPERSEDE") {
        if (!c.kb_id || !c.candidate_kb_id) out.push({ path: at, problem: "SUPERSEDE cần kb_id + candidate_kb_id (§12.5)" });
        if (!c.strength) out.push({ path: at, problem: "SUPERSEDE thiếu strength (§12.5)" });
      }
      const blockers = c.supersede_blockers ?? [];
      const humanOverride = approval?.decision === "ACCEPT_CANDIDATE" && !blockers.some((b) => String(b).startsWith("e"));
      if (blockers.length && c.resolution && c.resolution !== "CONFLICTED" && !(c.resolution === "SUPERSEDE" && humanOverride)) {
        out.push({ path: at, problem: "có supersede_blockers thì resolution phải là CONFLICTED, trừ khi có approval ACCEPT_CANDIDATE (§12.5)" });
      }
      return out;
    }),
  verdict: (body) => {
    const failed = (body.gate_results ?? []).filter((g) => g.status === "FAIL").map((g) => g.gate);
    return body.publish_allowed === true && failed.length ? [{ path: "publish_allowed", problem: `true trong khi gate FAIL: ${failed.join(", ")}` }] : [];
  }
};

async function filesOf(runDir, stage) {
  if (stage.files) {
    const out = [];
    for (const f of stage.files) if (await exists(path.join(runDir, f))) out.push(f);
    return out;
  }
  const dir = path.join(runDir, stage.dir);
  return (await readdir(dir).catch(() => [])).filter((n) => stage.match.test(n)).sort().map((n) => path.join(stage.dir, n));
}

/** Validate một run. Trả { ok, mode, checked: {stage: n}, errors: [{file, path, problem}] }. */
export async function validateRun(runDir, { stages = Object.keys(STAGES) } = {}) {
  const errors = [];
  const checked = {};
  const manifest = await readJson(path.join(runDir, "run-manifest.json")).catch(() => null);
  const mode = manifest?.mode ?? null;
  const envelope = await loadSchema(path.join(schemaDir, "envelope.schema.json"));
  const approvalsFile = await readJson(path.join(runDir, "input", "approvals.json")).catch(() => null);
  const approvals = new Map((approvalsFile?.approvals ?? []).map((a) => [a.kb_id, a]));
  for (const name of stages) {
    const stage = STAGES[name];
    if (!stage) throw new Error(`stage không tồn tại: ${name}`);
    const files = await filesOf(runDir, stage);
    checked[name] = files.length;
    const schema = await loadSchema(path.join(schemaDir, `${stage.schema}.schema.json`));
    for (const rel of files) {
      let data;
      try {
        data = await readJson(path.join(runDir, rel));
      } catch (e) {
        errors.push({ file: rel, path: "", problem: `không parse được: ${e.message}` });
        continue;
      }
      const found = [];
      if (stage.envelope !== false) check(envelope, data, "$", found);
      // Artifact mới: nội dung ở payload (§1). Artifact cũ đặt thẳng ở top-level.
      const body = data && typeof data === "object" && data.payload && typeof data.payload === "object" ? data.payload : data;
      check(schema, body, "$", found);
      found.push(...(RULES[name]?.(body, { mode, file: rel, approvals }) ?? []));
      for (const f of found) errors.push({ file: rel, ...f });
    }
  }
  return { ok: errors.length === 0, mode, checked, errors };
}

async function main() {
  const args = parseArgs();
  if (typeof args.run !== "string") {
    console.error("Cần --run CTX-... (hoặc đường dẫn thư mục run)");
    process.exit(2);
  }
  const runDir = resolveRunDir(args.run);
  if (!(await exists(path.join(runDir, "run-manifest.json")))) {
    console.error(`Không có run-manifest.json trong ${runDir}`);
    process.exit(2);
  }
  const stages = typeof args.stage === "string" ? args.stage.split(",") : undefined;
  const result = await validateRun(runDir, { stages });
  console.log(JSON.stringify(result, null, 2));
  process.exit(result.ok ? 0 : 1);
}

if (import.meta.url === `file://${process.argv[1]}`) main().catch((e) => {
  console.error(e.message || e);
  process.exit(2);
});
