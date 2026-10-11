import { createServer } from "node:http";
import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getProduct, soleActiveProductKey } from "../scripts/lib/product-config.mjs";
import { extractOpenQuestions } from "../scripts/lib/open-questions.mjs";
import { walk, readJson, readJsonOr, writeJson, exists as fileExists } from "../scripts/lib/fs-utils.mjs";
import { contextHealth } from "../scripts/lib/context-health.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const publicDir = path.join(__dirname, "public");
// roster.json: danh sách agent (track git). state.json: trạng thái live do PATCH ghi (gitignore).
const rosterFile = path.join(__dirname, "data", "roster.json");
const stateFile = path.join(__dirname, "data", "state.json");
const port = Number(process.env.OPS_BOARD_PORT || process.env.PORT || 4177);
// How many of the most recent runs get their own card. Older runs still exist
// on disk but fall off the board rather than cluttering it forever.
const maxRuns = Number(process.env.OPS_BOARD_MAX_RUNS || 8);

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8"
};

async function readBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  if (!chunks.length) return {};
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

function send(res, status, body, headers = {}) {
  const payload = typeof body === "string" ? body : JSON.stringify(body);
  res.writeHead(status, {
    "content-type": typeof body === "string" ? "text/plain; charset=utf-8" : "application/json; charset=utf-8",
    ...headers
  });
  res.end(payload);
}

function normalizeState(state) {
  const allowed = new Set(["idle", "running", "blocked", "review", "done", "failed"]);
  return allowed.has(state) ? state : "idle";
}

const runsDir = path.join(rootDir, "runs", "context");
const SIGNAL_FILES = new Set(["run-manifest.json", "verdict.json", "gate-results.json"]);

async function collectRunSignals() {
  const signals = [];
  for (const full of await walk(runsDir)) {
    const name = path.basename(full);
    if (!SIGNAL_FILES.has(name)) continue;
    const rel = path.relative(rootDir, full);
    try {
      const data = await readJson(full);
      signals.push({
        file: rel,
        mtime_ms: (await stat(full)).mtimeMs,
        status: data.status || data.verdict || data.decision || data.gate?.decision || "observed",
        title: data.run_id || data.ctx_run_id || data.artifact_id || path.basename(path.dirname(full))
      });
    } catch {
      signals.push({ file: rel, status: "unreadable", title: name });
    }
  }
  return signals.sort((a, b) => (b.mtime_ms || 0) - (a.mtime_ms || 0)).slice(0, 12);
}

// Mọi run-manifest.json dưới runs/context/, mới nhất trước — mỗi run một card (tối đa maxRuns).
async function findRecentRuns(limit) {
  const manifests = (await walk(runsDir)).filter((f) => path.basename(f) === "run-manifest.json");
  const withTime = await Promise.all(manifests.map(async (file) => ({ file, mtime_ms: (await stat(file)).mtimeMs })));
  withTime.sort((a, b) => b.mtime_ms - a.mtime_ms);
  return withTime.slice(0, limit).map((m) => path.dirname(m.file));
}

function artifactState(artifact) {
  const blocking = artifact.blocking_issues?.length || artifact.gate?.blocking_findings?.length;
  if (blocking) return "blocked";
  if (artifact.gate?.decision === "FAIL" || artifact.status === "FAILED") return "failed";
  if (artifact.gate?.decision === "CONDITIONAL_PASS" || artifact.status === "PARTIAL") return "review";
  return "done";
}

function verdictState(artifact) {
  if (artifact.payload?.publish_allowed) return "done";
  return artifactState(artifact);
}

function worstState(states) {
  const rank = { blocked: 5, failed: 4, review: 3, running: 2, done: 1, idle: 0 };
  return states.reduce((worst, state) => (rank[state] > rank[worst] ? state : worst), "idle");
}

async function readArtifact(runDir, rel) {
  const file = path.join(runDir, rel);
  if (!(await fileExists(file))) return null;
  return { file, rel: path.relative(rootDir, file), data: await readJson(file), mtime_ms: (await stat(file)).mtimeMs };
}

// A candidate is "updated" if a canonical version of it already exists (this
// run is refreshing published knowledge), otherwise it's genuinely "added"
// (first time this KB/profile/checklist exists for the object).
async function classifyChange(canonicalFile) {
  if (!canonicalFile) return "added";
  return (await fileExists(canonicalFile)) ? "updated" : "added";
}

async function readArtifactsInDir(runDir, relDir) {
  const dir = path.join(runDir, relDir);
  let names = [];
  try {
    names = (await readdir(dir)).filter((name) => name.endsWith(".json"));
  } catch {
    return [];
  }
  return Promise.all(names.map((name) => readArtifact(runDir, path.join(relDir, name))));
}

function summarizeArtifacts(label, runId, artifacts) {
  const states = artifacts.map((artifact) => artifactState(artifact.data));
  const allConditions = artifacts.flatMap((artifact) => artifact.data.gate?.conditions || []);
  const blockers = artifacts.flatMap((artifact) => artifact.data.blocking_issues || artifact.data.gate?.blocking_findings || []);
  const decisions = [...new Set(artifacts.map((artifact) => artifact.data.gate?.decision || "no gate"))].join(", ");
  return {
    state: worstState(states),
    outputs: artifacts.map((artifact) => artifact.rel),
    blocked_by: blockers,
    status: [...new Set(artifacts.map((artifact) => artifact.data.status).filter(Boolean))].join(", ") || null,
    gate_decision: decisions,
    conditions: allConditions,
    last_event: `${label} for ${runId}: ${decisions}${allConditions.length ? ` (${allConditions.length} condition(s))` : ""}`
  };
}

// Open-questions.md (contract §5a) embeds one JSON object per entry
// (oq_id/type/feature_id/summary, +side_a/side_b for CONFLICT), wrapped in
// whatever markdown heading/fence style the writer used. We don't assume a
// specific wrapper — just scan for balanced-brace JSON objects that contain
// an "oq_id" field, so this keeps working regardless of formatting choices
// made object-by-object.
// Parser dùng chung: scripts/lib/open-questions.mjs (import ở đầu file).

// This is the whole implementation of contract §12.3b's "ops-board sync":
// the board is computed fresh from disk on every /api/board request, so as
// soon as the orchestrator writes open-questions.md there is nothing further
// to push — the card reflects it on the very next fetch. No PATCH payload
// change needed.
async function readOpenQuestions(objectDir) {
  // objectDir null = run-manifest không xác định được product/object. Trả rỗng
  // thay vì throw — card vẫn dựng được và hiện "object unknown".
  if (!objectDir) return [];
  const file = path.join(objectDir, "open-questions.md");
  if (!(await fileExists(file))) return [];
  const text = await readFile(file, "utf8");
  return extractOpenQuestions(text);
}

function roleInfo(roster, id) {
  const agent = roster.find((item) => item.id === id) || {};
  return { id, label: agent.label || id, type: agent.type || "agent" };
}

// Computes one run's full agent/task state purely from files on disk — no
// mutation of shared state, so runs can be computed independently and shown
// side by side instead of one run's sync overwriting another's.
async function computeRun(runDir, roster) {
  const manifest = await readArtifact(runDir, "run-manifest.json");
  if (!manifest) return null;

  const runId = manifest.data.run_id || manifest.data.ctx_run_id || path.basename(runDir);
  // Product và object KHÔNG được đoán nữa (trước đây default "teeinblue"/"sdk").
  // Repo phục vụ N product (contract §12.1); một run của product khác bị dán
  // nhãn sai sẽ đi đọc feature-summary.md của object thuộc product khác rồi
  // báo "done" sai. Thà hiện "unknown" còn hơn.
  //
  // soleActiveProductKey() giữ hành vi cũ khi repo chỉ có 1 product ACTIVE;
  // từ product thứ hai trở đi, run-manifest thiếu `product` sẽ là unknown.
  const product = manifest.data.product || (await soleActiveProductKey());
  const productCfg = await getProduct(product);
  // Một số run-manifest dùng `primary_object_key` (run cross-object, vd CBS-004)
  // chứ không phải `object_key`. Đọc thiếu nhánh đó là lý do CTX-20260926-01
  // (thực ra là object `artwork`) từng bị fallback dán nhãn `sdk`.
  const objectKey =
    manifest.data.object_target?.object_key ||
    manifest.data.object_target?.primary_object_key ||
    productCfg?.defaults?.object_key_fallback ||
    null;
  const objectBaseDir =
    product && objectKey
      ? path.join(rootDir, "knowledge", "products", product, objectKey)
      : null;
  const canonPath = (...parts) => (objectBaseDir ? path.join(objectBaseDir, ...parts) : null);
  const objectLabel = objectKey ?? "unknown";
  // DOC_BOOTSTRAP runs (doc-ingest-explorer fan-in from a provided doc set,
  // see contracts §DOC_BOOTSTRAP) have no single object_target — scope-planner
  // decomposes the doc set's table of contents instead. "explore unknown"
  // would be actively wrong here (there's no exploring at all), so fall back
  // to the run's own label.
  const mode = manifest.data.mode;
  const isDocBootstrap = mode === "DOC_BOOTSTRAP";
  const isCcrIngest = mode === "CCR_INGEST";
  // CCR-sourced runs carry source.proposal_id (+ an optional short human label)
  // written by the orchestrator into run-manifest.json — prefer that over the
  // generic "explore <object>" so a CCR-driven card reads e.g. "CBS-003 —
  // Photo Upload" instead of just "explore artwork".
  const taskName = manifest.data.source?.proposal_id
    ? [manifest.data.source.proposal_id, manifest.data.label].filter(Boolean).join(" — ")
    : isDocBootstrap
      ? manifest.data.label || manifest.data.source?.label || `doc bootstrap ${runId}`
      : manifest.data.object_target?.object_key
        ? `explore ${manifest.data.object_target.object_key}`
        : `explore ${objectLabel}`;
  const sourceInput = path.relative(rootDir, path.join(runDir, "input", "bootstrap-request.json"));

  const agents = {};
  let seq = 0;
  // updated_seq only needs to order events WITHIN this one run's activity
  // list, so a fresh per-run counter (in fixed pipeline order) is enough —
  // no need to persist it across syncs.
  const stamp = (id, patch) => {
    seq += 1;
    agents[id] = { ...roleInfo(roster, id), ...patch, updated_at: new Date().toISOString(), updated_seq: seq, run_id: runId };
  };

  stamp("qa-context-lifecycle-orchestrator", {
    state: "running",
    current_task: taskName,
    inputs: [sourceInput],
    outputs: [],
    blocked_by: [],
    last_event: `Coordinating explorer fan-out for ${runId}`
  });

  // upstreamDone gates the normalizer stage below: true once this run's
  // evidence-capture phase (whichever shape it takes) has produced everything
  // qa-knowledge-normalizer needs to start building candidate/product-kb.json.
  let upstreamDone;
  let normalizerInputs;

  if (isDocBootstrap) {
    // DOC_BOOTSTRAP has no portal/API/storefront runtime to explore — doc-ingest-
    // explorer fans out per doc (often several in parallel, one per doc-manifest
    // group) and the orchestrator merges their per-group indexes into
    // _docset-index.json (see contracts §DOC_BOOTSTRAP). Progress is "how many
    // of the manifest's docs have a DOC-<n>.json evidence artifact yet", not a
    // fixed well-known file path like the EXPLORE pipeline below.
    const docManifestRel = "input/doc-manifest.json";
    const docManifest = await readArtifact(runDir, docManifestRel);
    const totalDocs = docManifest?.data.docs?.length ?? null;
    const docDir = path.join(runDir, "intermediate", "doc");
    let docFiles = [];
    try {
      docFiles = (await readdir(docDir)).filter((name) => /^DOC-[^.]+\.json$/.test(name));
    } catch {
      docFiles = [];
    }
    const docsDone = docFiles.length;
    const indexArtifact = await readArtifact(runDir, "intermediate/doc/_docset-index.json");

    if (totalDocs === null) {
      stamp("doc-ingest-explorer", {
        state: "idle",
        current_task: taskName,
        inputs: [docManifestRel],
        outputs: [],
        blocked_by: [],
        last_event: `Waiting on ${docManifestRel} for ${runId}`
      });
      upstreamDone = false;
    } else if (!indexArtifact) {
      stamp("doc-ingest-explorer", {
        state: "running",
        current_task: `ingest docs (${docsDone}/${totalDocs})`,
        inputs: [docManifestRel],
        outputs: docFiles.map((name) => path.relative(rootDir, path.join(docDir, name))),
        blocked_by: [],
        last_event:
          docsDone < totalDocs
            ? `In progress for ${runId}: ${docsDone}/${totalDocs} doc evidence artifact(s) produced`
            : `All ${totalDocs} docs ingested for ${runId}; waiting on docset index fan-in (_docset-index.json)`
      });
      upstreamDone = false;
    } else {
      const conflicts = indexArtifact.data.doc_internal_conflicts?.length ?? 0;
      stamp("doc-ingest-explorer", {
        state: "done",
        current_task: `ingest docs (${docsDone}/${totalDocs})`,
        inputs: [docManifestRel],
        outputs: [...docFiles.map((name) => path.relative(rootDir, path.join(docDir, name))), indexArtifact.rel],
        blocked_by: [],
        last_event: `Docset index merged for ${runId}: ${indexArtifact.data.total_docs ?? docsDone} doc(s), ${indexArtifact.data.total_claims ?? "?"} claim(s)${conflicts ? `, ${conflicts} unresolved conflict(s)` : ""}`
      });
      upstreamDone = true;
    }

    normalizerInputs = ["intermediate/doc/DOC-*.json", "intermediate/doc/_docset-index.json"];
  } else if (isCcrIngest) {
    // CCR_INGEST: 0 explorer. Upstream của normalizer là kế hoạch C0.5 + evidence theo claim.
    const plan = await readArtifact(runDir, "input/ccr-fastpath-plan.json");
    upstreamDone = Boolean(plan);
    normalizerInputs = ["input/ccr-fastpath-plan.json", "raw/ccr-evidence/<claim_key>/"];
  } else {
    // Stage explorer theo modes.allowed_explorers của product. Explorer tuỳ chọn
    // (storefront/db/code) chỉ hiện khi đã có artifact hoặc bootstrap-request bật surface đó.
    const request = (await readArtifact(runDir, "input/bootstrap-request.json"))?.data ?? {};
    const allowed = productCfg?.modes?.allowed_explorers ?? ["portal-explorer", "api-explorer"];
    const explorerStages = [
      { agent_id: "portal-explorer", rel: "raw/portal/portal-evidence.json", required: true, doneText: "Portal evidence captured" },
      { agent_id: "api-explorer", rel: "intermediate/api/action-api-map.json", required: true, doneText: "API runtime trace mapped" },
      { agent_id: "storefront-explorer", rel: "raw/storefront/storefront-evidence.json", surface: "storefront", doneText: "Storefront evidence captured" },
      { agent_id: "db-explorer", rel: "intermediate/db/db-evidence.json", surface: "db", doneText: "DB evidence captured" },
      { agent_id: "code-config-explorer", rel: "intermediate/code/code-evidence.json", surface: "code", doneText: "Code evidence captured" }
    ].filter((stage) => allowed.includes(stage.agent_id));

    const explorerArtifacts = [];
    for (const item of explorerStages) {
      const artifact = await readArtifact(runDir, item.rel);
      const expected = item.required || Boolean(request.surfaces?.[item.surface]?.enabled);
      if (!artifact && !expected) continue;
      explorerArtifacts.push(artifact);
      const inputs = [sourceInput];
      if (!artifact) {
        stamp(item.agent_id, {
          state: "running",
          current_task: taskName,
          inputs,
          outputs: [],
          blocked_by: [],
          last_event: `In progress for ${runId}: ${item.rel} not yet produced`
        });
        continue;
      }
      const state = artifactState(artifact.data);
      const conditions = artifact.data.gate?.conditions || [];
      stamp(item.agent_id, {
        state,
        current_task: taskName,
        inputs,
        outputs: [artifact.rel],
        blocked_by: artifact.data.blocking_issues || artifact.data.gate?.blocking_findings || [],
        status: artifact.data.status || null,
        gate_decision: artifact.data.gate?.decision || null,
        conditions,
        last_event: `${item.doneText} for ${runId}: ${artifact.data.status || "observed"} / ${artifact.data.gate?.decision || "no gate"}${conditions.length ? ` (${conditions.length} condition(s))` : ""}`
      });
    }

    upstreamDone = explorerArtifacts.every(Boolean);
    normalizerInputs = explorerStages.map((stage) => stage.rel);
  }
  // Normalizer ghi một shard mỗi feature dưới candidate/product-kb/ (contract §5).
  // Run cũ (trước 2026-09-28) ghi một file candidate/product-kb.json — vẫn đọc được.
  const kbShards = (await readArtifactsInDir(runDir, "candidate/product-kb")).filter(Boolean);
  const legacyKb = kbShards.length ? null : await readArtifact(runDir, "candidate/product-kb.json");
  const kbArtifacts = kbShards.length ? kbShards : legacyKb ? [legacyKb] : [];
  const normalizerArtifact = kbArtifacts.length ? kbArtifacts[0] : null;

  if (kbArtifacts.length) {
    stamp("qa-knowledge-normalizer", {
      ...summarizeArtifacts("Product KB candidate(s) generated", runId, kbArtifacts),
      current_task: taskName,
      inputs: normalizerInputs
    });
  } else {
    stamp("qa-knowledge-normalizer", {
      state: upstreamDone ? "running" : "idle",
      current_task: taskName,
      inputs: normalizerInputs,
      outputs: [],
      blocked_by: [],
      last_event: upstreamDone
        ? `In progress for ${runId}: candidate/product-kb/ not yet produced`
        : `Queued for ${runId}, waiting on ${isDocBootstrap ? "docset index" : isCcrIngest ? "C0.5 plan" : "explorer evidence"}`
    });
  }

  const profileDir = path.join(runDir, "candidate", "feature-profiles");
  let profileFiles = [];
  try {
    profileFiles = (await readdir(profileDir)).filter((name) => name.endsWith(".json"));
  } catch {
    profileFiles = [];
  }
  if (profileFiles.length) {
    const profileArtifacts = (await readArtifactsInDir(runDir, "candidate/feature-profiles")).filter(Boolean);
    stamp("feature-profile-builder", {
      ...summarizeArtifacts("Feature profile candidate(s) generated", runId, profileArtifacts),
      current_task: taskName,
      inputs: ["candidate/product-kb/*.json"]
    });
  } else if (kbArtifacts.length) {
    stamp("feature-profile-builder", {
      state: "running",
      current_task: taskName,
      inputs: ["candidate/product-kb/*.json"],
      outputs: ["candidate/feature-profiles/<feature-key>.json"],
      blocked_by: [],
      last_event: `Ready for feature profile build after Product KB candidate in ${runId}`
    });
  } else {
    stamp("feature-profile-builder", {
      state: "idle",
      current_task: taskName,
      inputs: ["candidate/product-kb/*.json"],
      outputs: [],
      blocked_by: [],
      last_event: `Queued for ${runId}, waiting on Product KB candidate`
    });
  }

  const checklistArtifacts = (await readArtifactsInDir(runDir, "candidate/checklists")).filter(Boolean);
  if (checklistArtifacts.length) {
    stamp("qa-checklist-builder", {
      ...summarizeArtifacts("Checklist candidate(s) generated", runId, checklistArtifacts),
      current_task: taskName,
      inputs: ["candidate/feature-profiles/*.json"]
    });
  } else if (profileFiles.length) {
    stamp("qa-checklist-builder", {
      state: "running",
      current_task: taskName,
      inputs: ["candidate/feature-profiles/*.json"],
      outputs: ["candidate/checklists/<feature-key>.json"],
      blocked_by: [],
      last_event: `Ready for checklist build after feature profiles in ${runId}`
    });
  } else {
    stamp("qa-checklist-builder", {
      state: "idle",
      current_task: taskName,
      inputs: ["candidate/feature-profiles/*.json"],
      outputs: [],
      blocked_by: [],
      last_event: `Queued for ${runId}, waiting on feature profiles`
    });
  }

  const diffArtifact = await readArtifact(runDir, "review/knowledge-diff.json");
  if (diffArtifact) {
    stamp("knowledge-diff-analyzer", {
      state: artifactState(diffArtifact.data),
      current_task: taskName,
      inputs: ["candidate/product-kb/*.json", "candidate/feature-profiles/*.json", "candidate/checklists/*.json"],
      outputs: [diffArtifact.rel],
      blocked_by: diffArtifact.data.blocking_issues || diffArtifact.data.gate?.blocking_findings || [],
      status: diffArtifact.data.status || null,
      gate_decision: diffArtifact.data.gate?.decision || null,
      conditions: diffArtifact.data.gate?.conditions || [],
      last_event: `Knowledge diff generated for ${runId}: ${diffArtifact.data.status || "observed"} / ${diffArtifact.data.gate?.decision || "no gate"}`
    });
  } else if (checklistArtifacts.length) {
    stamp("knowledge-diff-analyzer", {
      state: "running",
      current_task: taskName,
      inputs: ["candidate artifacts"],
      outputs: ["review/knowledge-diff.json"],
      blocked_by: [],
      last_event: `Ready for semantic diff after checklist candidates in ${runId}`
    });
  } else {
    stamp("knowledge-diff-analyzer", {
      state: "idle",
      current_task: taskName,
      inputs: ["candidate artifacts"],
      outputs: [],
      blocked_by: [],
      last_event: `Queued for ${runId}, waiting on checklist candidates`
    });
  }

  const verdictArtifact = await readArtifact(runDir, "review/verdict.json");
  const gateArtifact = verdictArtifact || (await readArtifact(runDir, "review/gate-results.json"));
  if (gateArtifact) {
    const reviewState = verdictArtifact ? verdictState(gateArtifact.data) : artifactState(gateArtifact.data);
    const blockers = gateArtifact.data.blocking_issues || gateArtifact.data.gate?.blocking_findings || [];
    const publishAllowed = gateArtifact.data.payload?.publish_allowed ?? gateArtifact.data.publish_allowed;
    stamp("context-quality-reviewer", {
      state: reviewState,
      current_task: taskName,
      inputs: ["candidate artifacts", "review/knowledge-diff.json"],
      outputs: [gateArtifact.rel],
      blocked_by: blockers,
      status: gateArtifact.data.status || null,
      gate_decision: gateArtifact.data.gate?.decision || null,
      conditions: gateArtifact.data.gate?.conditions || [],
      last_event: `Review ${verdictArtifact ? "verdict" : "gate results"} for ${runId}: ${gateArtifact.data.status || "observed"} / ${gateArtifact.data.gate?.decision || "no gate"}${publishAllowed ? " / publish allowed" : ""}`
    });
    if (blockers.some((item) => String(item).includes("raw/storefront/") || String(item).includes("storefront-explorer"))) {
      stamp("storefront-explorer", {
        state: "blocked",
        current_task: taskName,
        blocked_by: blockers,
        last_event: `Reviewer requested storefront redaction fix for ${runId}`
      });
    }

    // Bỏ hẳn fallback sang objects/sdk (teeinblue-specific): đọc feature-summary
    // của MỘT OBJECT KHÁC để kết luận run này đã publish là sai thẳng.
    // Không xác định được object -> coi như chưa có summary, đúng nghĩa.
    const summaryFile = objectBaseDir ? path.join(objectBaseDir, "feature-summary.md") : null;
    const summaryExists = summaryFile ? await fileExists(summaryFile) : false;
    // For an object published before (incremental update), summaryFile already
    // exists from the PRIOR version — its mere existence says nothing about
    // this run. Only a summary written/touched at or after this run's manifest
    // counts as "this run's publish landed"; anything older is still pending,
    // same as if the file didn't exist at all (the old if/else-if here used to
    // check existence first and skip the "pending" branch whenever an old
    // summary happened to exist, leaving orchestrator stuck on its very first
    // "coordinating fan-out" message even after publish was approved).
    // run-manifest.status = PUBLISHED là tín hiệu chính (orchestrator ghi khi run terminal, §15).
    // Run cũ không ghi status thì fallback: feature-summary của object được ghi sau manifest.
    const summaryFreshForThisRun =
      manifest.data.status === "PUBLISHED" ||
      (summaryExists && (await stat(summaryFile)).mtimeMs >= (await stat(manifest.file)).mtimeMs);
    if (summaryFreshForThisRun) {
      for (const agentId of [
        ...Object.keys(agents).filter((id) => id.endsWith("-explorer")),
        "qa-knowledge-normalizer",
        "feature-profile-builder",
        "qa-checklist-builder",
        "knowledge-diff-analyzer",
        "context-quality-reviewer"
      ]) {
        stamp(agentId, {
          state: "done",
          current_task: taskName,
          blocked_by: [],
          last_event: `Accepted in approved publish for ${runId}; conditions preserved in review verdict`
        });
      }
      stamp("qa-context-lifecycle-orchestrator", {
        state: "done",
        current_task: `write feature summary for ${objectLabel}`,
        inputs: ["review/verdict.json", "candidate artifacts"],
        outputs: summaryFile ? [path.relative(rootDir, summaryFile)] : [],
        blocked_by: [],
        last_event: `Feature summary published after approved review for ${runId}`
      });
    } else if (publishAllowed) {
      stamp("qa-context-lifecycle-orchestrator", {
        state: "running",
        current_task: `write feature summary for ${objectLabel}`,
        inputs: ["review/verdict.json", "candidate artifacts"],
        outputs: objectBaseDir ? [path.relative(rootDir, path.join(objectBaseDir, "feature-summary.md"))] : [],
        blocked_by: [],
        last_event: `Publish approved; feature summary pending for ${runId}`
      });
    }
  } else if (diffArtifact) {
    stamp("context-quality-reviewer", {
      state: "running",
      current_task: taskName,
      inputs: ["candidate artifacts", "review/knowledge-diff.json"],
      outputs: ["review/gate-results.json", "review/verdict.json"],
      blocked_by: [],
      last_event: `Ready for context quality review after semantic diff in ${runId}`
    });
  } else {
    stamp("context-quality-reviewer", {
      state: "idle",
      current_task: taskName,
      inputs: ["candidate artifacts", "review/knowledge-diff.json"],
      outputs: [],
      blocked_by: [],
      last_event: `Queued for ${runId}, waiting on knowledge diff`
    });
  }

  // Open conflicts explain WHY so many stages sit in "review": the QA
  // contract requires every downstream agent that touches a conflicted topic
  // to carry it forward (not silently resolve it), so one open conflict can
  // show up as a condition on several agents at once. product-kb.json is the
  // most complete source for the run's conflict set (topic + resolution).
  const conflicts = kbArtifacts.flatMap((a) => a.data.payload?.conflicts || a.data.conflicts || []).map((c) => ({
    id: c.conflict_id,
    topic: c.topic,
    resolution: c.resolution || c.status || "UNKNOWN"
  }));

  // Contract §12.3b: the object's open-questions.md is the card's live view
  // of everything still unresolved for it (NEEDS_CONFIRMATION/CONFLICT/
  // OPEN_ISSUE) — read fresh every request, no separate sync step needed.
  const openQuestions = await readOpenQuestions(objectBaseDir);

  const results = {
    conflicts,
    open_questions: openQuestions,
    product_kb: kbArtifacts.length
      ? { path: kbShards.length ? path.relative(rootDir, path.join(runDir, "candidate", "product-kb")) : normalizerArtifact.rel, shards: kbArtifacts.length, change: await classifyChange(canonPath("kb.json")) }
      : null,
    profiles: await Promise.all(
      profileFiles.map(async (name) => {
        const featureKey = name.replace(/\.json$/, "");
        return {
          name: featureKey,
          change: await classifyChange(canonPath("features", featureKey, "profile.json"))
        };
      })
    ),
    checklists: await Promise.all(
      checklistArtifacts.map(async (artifact) => {
        const featureKey = path.basename(artifact.rel, ".json");
        return {
          name: featureKey,
          change: await classifyChange(canonPath("checklists", `${featureKey}.json`))
        };
      })
    ),
    kb_diff: diffArtifact
      ? {
          added: diffArtifact.data.payload?.added?.length || 0,
          changed: diffArtifact.data.payload?.changed?.length || 0,
          refreshed_only: diffArtifact.data.payload?.refreshed_only?.length || 0,
          deprecated: diffArtifact.data.payload?.deprecated?.length || 0,
          conflicted: diffArtifact.data.payload?.conflicted?.length || 0
        }
      : null
  };

  const orchestratorRole = roster.find((item) => item.id === "qa-context-lifecycle-orchestrator");
  return {
    run_id: runId,
    path: path.relative(rootDir, runDir),
    status: manifest.data.status || "observed",
    task_name: taskName,
    workflow_id: orchestratorRole?.workflow_id || "context-lifecycle",
    synced_at: new Date().toISOString(),
    state: worstState(Object.values(agents).map((agent) => agent.state)),
    agents,
    results
  };
}

// A PATCH to /api/agents/:id is a live self-report from a running agent (see
// the "if a board API exists" instruction in .claude/agents/*.md) and only
// makes sense against whichever run is currently active. Historical runs stay
// purely file-derived; only the most recent run's card gets overlaid with a
// roster field if that field was PATCHed more recently than the file scan.
function overlayPatchedState(latestRun, roster) {
  if (!latestRun) return;
  for (const roleAgent of roster) {
    const computed = latestRun.agents[roleAgent.id];
    if (!computed || !roleAgent.updated_at) continue;
    if (new Date(roleAgent.updated_at).getTime() <= new Date(computed.updated_at).getTime()) continue;
    latestRun.agents[roleAgent.id] = {
      ...computed,
      state: normalizeState(roleAgent.state),
      current_task: roleAgent.current_task ?? computed.current_task,
      last_event: roleAgent.last_event ?? computed.last_event,
      blocked_by: roleAgent.blocked_by ?? computed.blocked_by,
      inputs: roleAgent.inputs ?? computed.inputs,
      outputs: roleAgent.outputs ?? computed.outputs,
      updated_at: roleAgent.updated_at,
      // A manual PATCH is by definition the most recent signal for this run.
      updated_seq: Number.MAX_SAFE_INTEGER
    };
  }
  latestRun.state = worstState(Object.values(latestRun.agents).map((agent) => agent.state));
}

// Roster (tĩnh) + state live (PATCH) → danh sách agent như trước khi tách file.
async function loadAgents() {
  const roster = await readJson(rosterFile);
  const state = await readJsonOr(stateFile, { agents: {}, events: [] });
  const agents = roster.agents.map((a) => ({ ...a, ...(state.agents?.[a.id] ?? {}) }));
  return { roster, state, agents };
}

async function getBoard() {
  const { roster, state, agents } = await loadAgents();
  const runDirs = await findRecentRuns(maxRuns);
  const runs = (await Promise.all(runDirs.map((dir) => computeRun(dir, agents)))).filter(Boolean);
  if (runs[0]) overlayPatchedState(runs[0], agents);
  return {
    source: roster.source,
    workflows: roster.workflows,
    agents,
    events: state.events ?? [],
    updated_at: state.updated_at ?? null,
    runs,
    active_run: runs[0]
      ? { run_id: runs[0].run_id, path: runs[0].path, status: runs[0].status, synced_at: runs[0].synced_at, results: runs[0].results }
      : null,
    local: {
      repo: path.basename(rootDir),
      root: rootDir,
      generated_at: new Date().toISOString(),
      integrations: { cloud: Boolean(process.env.QA_HUB_MCP_TOKEN) },
      run_signals: await collectRunSignals()
    }
  };
}

// Override live từ agent (contract §0 board_update) — chỉ ghi state.json, roster không đổi.
async function patchAgent(agentId, patch) {
  const { roster, state } = await loadAgents();
  const role = roster.agents.find((item) => item.id === agentId);
  if (!role) return null;
  state.agents ??= {};
  const current = state.agents[agentId] ?? {};
  const previous = { state: current.state ?? "idle" };
  const allowed = ["state", "confidence", "current_task", "last_event", "blocked_by", "inputs", "outputs"];
  for (const key of allowed) {
    if (Object.prototype.hasOwnProperty.call(patch, key)) current[key] = patch[key];
  }
  current.state = normalizeState(current.state);
  current.updated_at = new Date().toISOString();
  state.agents[agentId] = current;
  state.updated_at = current.updated_at;
  state.events = [
    { id: `evt-${Date.now()}`, at: current.updated_at, agent_id: agentId, from_state: previous.state, to_state: current.state, text: patch.last_event || `Updated ${role.label}` },
    ...(state.events ?? [])
  ].slice(0, 80);
  await writeJson(stateFile, state);
  return { ...role, ...current };
}

async function handleApi(req, res, url) {
  if (req.method === "GET" && url.pathname === "/api/board") {
    return send(res, 200, await getBoard());
  }
  // Sức khoẻ context theo product/object — tính từ knowledge/ mỗi lần gọi, không ghi file.
  if (req.method === "GET" && url.pathname === "/api/health") {
    return send(res, 200, await contextHealth());
  }
  const match = url.pathname.match(/^\/api\/agents\/([^/]+)$/);
  if (req.method === "PATCH" && match) {
    const agent = await patchAgent(decodeURIComponent(match[1]), await readBody(req));
    if (!agent) return send(res, 404, { error: "agent not found" });
    return send(res, 200, { agent });
  }
  return send(res, 404, { error: "not found" });
}

async function serveStatic(res, pathname) {
  const safePath = pathname === "/" ? "/index.html" : pathname;
  const file = path.normalize(path.join(publicDir, safePath));
  if (!file.startsWith(publicDir)) return send(res, 403, "Forbidden");
  try {
    const body = await readFile(file);
    const type = contentTypes[path.extname(file)] || "application/octet-stream";
    res.writeHead(200, { "content-type": type });
    res.end(body);
  } catch {
    send(res, 404, "Not found");
  }
}

createServer(async (req, res) => {
  try {
    const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);
    if (url.pathname === "/favicon.ico") {
      res.writeHead(204);
      return res.end();
    }
    if (url.pathname.startsWith("/api/")) return await handleApi(req, res, url);
    await serveStatic(res, url.pathname);
  } catch (error) {
    send(res, 500, { error: error.message });
  }
}).listen(port, "127.0.0.1", () => {
  console.log(`Agent ops board: http://127.0.0.1:${port}`);
});
