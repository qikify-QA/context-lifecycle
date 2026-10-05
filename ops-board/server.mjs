import { createServer } from "node:http";
import { access, readFile, writeFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getProduct, soleActiveProductKey } from "../scripts/lib/product-config.mjs";
import { extractOpenQuestions } from "../scripts/lib/open-questions.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const publicDir = path.join(__dirname, "public");
const stateFile = path.join(__dirname, "data", "agents.json");
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

async function readJson(file) {
  return JSON.parse(await readFile(file, "utf8"));
}

async function writeJson(file, value) {
  await writeFile(file, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

async function fileExists(file) {
  try {
    await access(file);
    return true;
  } catch {
    return false;
  }
}

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

async function collectRunSignals() {
  const runsDir = path.join(rootDir, "runs", "context");
  const signals = [];
  async function walk(dir) {
    let entries = [];
    try {
      entries = await readdir(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        await walk(full);
        continue;
      }
      if (entry.name === "run-manifest.json" || entry.name === "verdict.json" || entry.name === "gate-results.json") {
        try {
          const data = await readJson(full);
          const rel = path.relative(rootDir, full);
          signals.push({
            file: rel,
            mtime_ms: (await stat(full)).mtimeMs,
            status: data.status || data.verdict || data.decision || data.gate?.decision || "observed",
            title: data.run_id || data.context_id || data.artifact_id || data.workflow_id || path.basename(path.dirname(full))
          });
        } catch {
          signals.push({ file: path.relative(rootDir, full), status: "unreadable", title: entry.name });
        }
      }
    }
  }
  await walk(runsDir);
  return signals.sort((a, b) => (b.mtime_ms || 0) - (a.mtime_ms || 0)).slice(0, 12);
}

// Every run-manifest.json under runs/context/, newest first. The board shows
// one card per run (capped at maxRuns) instead of only ever the single latest
// one, so a finished task doesn't get silently overwritten the moment the
// next run starts.
async function findRecentRuns(limit) {
  const runsDir = path.join(rootDir, "runs", "context");
  let manifests = [];
  async function walk(dir) {
    let entries = [];
    try {
      entries = await readdir(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        await walk(full);
      } else if (entry.name === "run-manifest.json") {
        manifests.push(full);
      }
    }
  }
  await walk(runsDir);
  manifests = await Promise.all(manifests.map(async (file) => ({ file, mtime_ms: (await stat(file)).mtimeMs })));
  manifests.sort((a, b) => b.mtime_ms - a.mtime_ms);
  return manifests.slice(0, limit).map((m) => path.dirname(m.file));
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

  const runId = manifest.data.run_id || path.basename(runDir);
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
  const isDocBootstrap = manifest.data.mode === "DOC_BOOTSTRAP";
  // CCR-sourced runs carry source.proposal_id (+ an optional short human label)
  // written by the orchestrator into run-manifest.json — prefer that over the
  // generic "explore <object>" so a CCR-driven card reads e.g. "CBS-003 —
  // Photo Upload" instead of just "explore artwork".
  const taskName = manifest.data.source?.proposal_id
    ? [manifest.data.source.proposal_id, manifest.data.label].filter(Boolean).join(" — ")
    : isDocBootstrap
      ? manifest.data.label || `doc bootstrap ${runId}`
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
  } else {
    const explorerStages = [
      {
        agent_id: "portal-explorer",
        rel: "raw/portal/portal-evidence.json",
        inputs: [sourceInput, "portal Product Page Settings scope"],
        doneText: "Portal evidence captured"
      },
      {
        agent_id: "api-explorer",
        rel: "intermediate/api/action-api-map.json",
        inputs: [sourceInput, "raw/network/*.json and storefront network refs"],
        doneText: "API runtime trace mapped"
      },
      {
        agent_id: "storefront-explorer",
        rel: "raw/storefront/storefront-evidence.json",
        inputs: [sourceInput, "storefront runtime verification scope"],
        doneText: "Storefront evidence captured"
      }
    ];

    const explorerArtifacts = [];
    for (const item of explorerStages) {
      const artifact = await readArtifact(runDir, item.rel);
      explorerArtifacts.push(artifact);
      if (!artifact) {
        stamp(item.agent_id, {
          state: "running",
          current_task: taskName,
          inputs: item.inputs,
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
        inputs: item.inputs,
        outputs: [artifact.rel],
        blocked_by: artifact.data.blocking_issues || artifact.data.gate?.blocking_findings || [],
        status: artifact.data.status || null,
        gate_decision: artifact.data.gate?.decision || null,
        conditions,
        last_event: `${item.doneText} for ${runId}: ${artifact.data.status || "observed"} / ${artifact.data.gate?.decision || "no gate"}${conditions.length ? ` (${conditions.length} condition(s))` : ""}`
      });
    }

    upstreamDone = explorerArtifacts.every(Boolean);
    normalizerInputs = [
      "raw/portal/portal-evidence.json",
      "intermediate/api/action-api-map.json",
      "raw/storefront/storefront-evidence.json"
    ];
  }
  const normalizerArtifact = await readArtifact(runDir, "candidate/product-kb.json");
  if (normalizerArtifact) {
    const state = artifactState(normalizerArtifact.data);
    const conditions = normalizerArtifact.data.gate?.conditions || [];
    stamp("qa-knowledge-normalizer", {
      state,
      current_task: taskName,
      inputs: normalizerInputs,
      outputs: [normalizerArtifact.rel],
      blocked_by: normalizerArtifact.data.blocking_issues || normalizerArtifact.data.gate?.blocking_findings || [],
      status: normalizerArtifact.data.status || null,
      gate_decision: normalizerArtifact.data.gate?.decision || null,
      conditions,
      last_event: `Product KB candidate generated for ${runId}: ${normalizerArtifact.data.status || "observed"} / ${normalizerArtifact.data.gate?.decision || "no gate"}${conditions.length ? ` (${conditions.length} condition(s))` : ""}`
    });
  } else {
    stamp("qa-knowledge-normalizer", {
      state: upstreamDone ? "running" : "idle",
      current_task: taskName,
      inputs: normalizerInputs,
      outputs: [],
      blocked_by: [],
      last_event: upstreamDone
        ? `In progress for ${runId}: candidate/product-kb.json not yet produced`
        : `Queued for ${runId}, waiting on ${isDocBootstrap ? "docset index" : "explorer evidence"}`
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
      inputs: ["candidate/product-kb.json"]
    });
  } else if (await fileExists(path.join(runDir, "candidate", "product-kb.json"))) {
    stamp("feature-profile-builder", {
      state: "running",
      current_task: taskName,
      inputs: ["candidate/product-kb.json"],
      outputs: ["candidate/feature-profiles/<feature-key>.json"],
      blocked_by: [],
      last_event: `Ready for feature profile build after Product KB candidate in ${runId}`
    });
  } else {
    stamp("feature-profile-builder", {
      state: "idle",
      current_task: taskName,
      inputs: ["candidate/product-kb.json"],
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
      inputs: ["candidate/product-kb.json", "candidate/feature-profiles/*.json", "candidate/checklists/*.json"],
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
    const publishAllowed = gateArtifact.data.payload?.publish_allowed;
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
    const summaryFreshForThisRun =
      summaryExists && (await stat(summaryFile)).mtimeMs >= (await stat(manifest.file)).mtimeMs;
    if (summaryFreshForThisRun) {
      for (const agentId of [
        ...(isDocBootstrap ? ["doc-ingest-explorer"] : ["portal-explorer", "api-explorer", "storefront-explorer"]),
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
        outputs: [path.relative(rootDir, summaryFile)],
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
  const conflicts = (normalizerArtifact?.data.conflicts || []).map((c) => ({
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
    product_kb: normalizerArtifact
      ? { path: normalizerArtifact.rel, change: await classifyChange(canonPath("kb.json")) }
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

async function getBoard() {
  const board = await readJson(stateFile);
  const runDirs = await findRecentRuns(maxRuns);
  const runs = (await Promise.all(runDirs.map((dir) => computeRun(dir, board.agents)))).filter(Boolean);
  if (runs[0]) overlayPatchedState(runs[0], board.agents);
  board.runs = runs;
  board.active_run = runs[0]
    ? { run_id: runs[0].run_id, path: runs[0].path, status: runs[0].status, synced_at: runs[0].synced_at, results: runs[0].results }
    : null;
  board.local = {
    repo: path.basename(rootDir),
    root: rootDir,
    generated_at: new Date().toISOString(),
    integrations: { jira: false, slack: false, cloud: Boolean(process.env.QA_HUB_MCP_TOKEN) },
    run_signals: await collectRunSignals()
  };
  return board;
}

// Manual/live overrides only: mutates the static roster record for one agent
// (see overlayPatchedState above for how this surfaces on the board).
async function patchAgent(agentId, patch) {
  const board = await readJson(stateFile);
  const agent = board.agents.find((item) => item.id === agentId);
  if (!agent) return null;
  const previous = { state: agent.state, current_task: agent.current_task };
  const allowed = ["state", "confidence", "current_task", "last_event", "blocked_by", "inputs", "outputs"];
  for (const key of allowed) {
    if (Object.prototype.hasOwnProperty.call(patch, key)) agent[key] = patch[key];
  }
  agent.state = normalizeState(agent.state);
  agent.updated_at = new Date().toISOString();
  board.updated_at = agent.updated_at;
  board.events = board.events || [];
  board.events.unshift({
    id: `evt-${Date.now()}`,
    at: agent.updated_at,
    agent_id: agent.id,
    from_state: previous.state,
    to_state: agent.state,
    text: patch.last_event || `Updated ${agent.label}`
  });
  board.events = board.events.slice(0, 80);
  await writeJson(stateFile, board);
  return agent;
}

async function handleApi(req, res, url) {
  if (req.method === "GET" && url.pathname === "/api/board") {
    return send(res, 200, await getBoard());
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
