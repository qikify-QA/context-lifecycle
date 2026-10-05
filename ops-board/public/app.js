const stateOrder = ["idle", "running", "blocked", "review", "done", "failed"];
const stateColumnLabels = {
  idle: "To-do",
  running: "In progress",
  blocked: "Blocked",
  review: "Waiting for review",
  done: "Done",
  failed: "Failed"
};

let board = null;
let selectedTask = null;

const $ = (selector) => document.querySelector(selector);

const AUTO_REFRESH_MS = 15000;
const AUTO_REFRESH_STORAGE_KEY = "opsBoard.autoRefresh";
let autoRefreshTimer = null;

async function loadBoard() {
  $("#refreshBoard").disabled = true;
  $("#refreshStatus").textContent = "Refreshing...";
  const response = await fetch("/api/board");
  board = await response.json();
  renderBoard(buildTasks(board.runs));
  const syncedAt = board.active_run?.synced_at || board.local?.generated_at || new Date().toISOString();
  $("#refreshStatus").textContent = `Updated ${new Date(syncedAt).toLocaleTimeString()}`;
  $("#refreshBoard").disabled = false;
}

function isAutoRefreshOn() {
  try {
    return localStorage.getItem(AUTO_REFRESH_STORAGE_KEY) === "on";
  } catch {
    return false;
  }
}

function setAutoRefresh(on) {
  try {
    localStorage.setItem(AUTO_REFRESH_STORAGE_KEY, on ? "on" : "off");
  } catch {
    // ignore storage failures (private mode, etc.); still apply in-memory
  }
  updateAutoRefreshButton(on);
  if (on) startAutoRefresh();
  else stopAutoRefresh();
}

function startAutoRefresh() {
  stopAutoRefresh();
  autoRefreshTimer = setInterval(() => {
    if (!document.hidden && !$("#agentDialog").open) loadBoard();
  }, AUTO_REFRESH_MS);
}

function stopAutoRefresh() {
  if (autoRefreshTimer) clearInterval(autoRefreshTimer);
  autoRefreshTimer = null;
}

function updateAutoRefreshButton(on) {
  const button = $("#autoRefreshToggle");
  button.textContent = on ? "Auto-refresh: On" : "Auto-refresh: Off";
  button.setAttribute("aria-pressed", String(on));
}

function workflowLabel(id) {
  return board.workflows.find((item) => item.id === id)?.label || id;
}

// A run's agent state is a plain map { agentId: state } (server.mjs), not an
// array — turn it into the ordered list of roles the UI actually cares about.
function runAgentList(run) {
  return Object.values(run.agents || {});
}

function renderBoard(tasks) {
  $("#boardHeader").innerHTML = stateOrder.map((state) => {
    const columnTasks = tasks.filter((task) => task.state === state);
    return `
      <div class="head-cell" data-state="${state}">
        <h2>${stateColumnLabels[state]}</h2>
        <span>${columnTasks.length}</span>
      </div>
    `;
  }).join("");

  $("#board").innerHTML = stateOrder.map((state) => {
    const columnTasks = tasks.filter((task) => task.state === state);
    return `
      <section class="column" data-state="${state}">
        <div class="column-list">
          ${columnTasks.map(renderTaskCard).join("") || `<div class="empty-column">No tasks</div>`}
        </div>
      </section>
    `;
  }).join("");

  document.querySelectorAll("[data-task]").forEach((button) => {
    button.addEventListener("click", () => openTask(button.dataset.task));
  });
}

function isOrchestrator(agent) {
  return agent.type === "orchestrator";
}

// One run = one task/card. Each run already carries its own full agent set
// (see server.mjs computeRun), so unlike before there's no grouping/merging
// needed here — that's also what lets a finished run's card keep showing in
// "Done" instead of being overwritten the moment the next run starts.
function buildTasks(runs) {
  return (runs || []).map((run) => {
    const groupAgents = runAgentList(run);
    const orchestrator = groupAgents.find(isOrchestrator) || null;
    const subAgents = groupAgents.filter((agent) => agent !== orchestrator && hasTask(agent));
    const relevantAgents = [orchestrator, ...subAgents].filter(Boolean);
    return {
      id: run.run_id,
      name: run.task_name,
      runId: run.run_id,
      workflowId: run.workflow_id,
      orchestrator,
      subAgents: subAgents.sort((a, b) => newestTime(b) - newestTime(a)),
      agents: relevantAgents.sort((a, b) => newestTime(b) - newestTime(a)),
      state: relevantAgents.length ? taskState(relevantAgents) : run.state,
      results: run.results
    };
  });
}

function taskState(agents) {
  const rank = { failed: 6, blocked: 5, running: 4, review: 3, idle: 2, done: 1 };
  return agents.map((agent) => agent.state).sort((a, b) => rank[b] - rank[a])[0] || "idle";
}

function renderTaskCard(task) {
  const agentLabel = task.orchestrator ? task.orchestrator.label : workflowLabel(task.workflowId);
  return `
    <article class="card" data-state="${task.state}">
      <div class="accent"></div>
      <p class="run-id">${escapeHtml(task.runId)}</p>
      <h3>${escapeHtml(task.name)}</h3>
      <p class="agent-name">Agent: ${escapeHtml(agentLabel)}</p>
      <button class="card-hit" type="button" data-task="${escapeHtml(task.id)}" aria-label="Open ${escapeHtml(task.name)} details"></button>
    </article>
  `;
}

function taskTitle(agent) {
  return agent.task_name || agent.current_task || "Untitled task";
}

function hasTask(agent) {
  if (agent.state !== "idle") return true;
  const task = String(agent.current_task || "").trim().toLowerCase();
  if (!task) return false;
  return !/^(no |ready to |waiting for )/.test(task);
}

function getInputFiles(agent) {
  const explicitFiles = agent.input_files || agent.files || [];
  if (explicitFiles.length) return explicitFiles;
  return agent.inputs || [];
}

function getOutputs(agent) {
  const explicitOutputs = agent.output_files || agent.outputs_after_done || [];
  if (explicitOutputs.length) return explicitOutputs;
  return agent.outputs || [];
}

function currentStateText(agent) {
  if (agent.last_event) return agent.last_event;
  return `${agent.state} / ${agent.confidence || "medium"} confidence`;
}

function openTask(id) {
  selectedTask = buildTasks(board.runs).find((task) => task.id === id);
  if (!selectedTask) return;
  $("#dialogType").textContent = `Agent + ${selectedTask.subAgents.length} sub-agent(s) · Run ${selectedTask.runId}`;
  $("#dialogTitle").textContent = selectedTask.name;
  $("#dialogResults").innerHTML =
    renderConflicts(selectedTask.results?.conflicts) +
    renderOpenQuestions(selectedTask.results?.open_questions) +
    renderResults(selectedTask.results);
  $("#activityCount").textContent = `${selectedTask.agents.length} update(s)`;
  $("#activityList").innerHTML = selectedTask.agents
    .sort((a, b) => newestTime(b) - newestTime(a))
    .map(renderActivity)
    .join("");
  $("#agentDialog").showModal();
}

function changeTag(change) {
  return `<span class="change-tag ${escapeHtml(change)}">${escapeHtml(change)}</span>`;
}

// Open conflicts are the root cause behind several sub-agents sitting in
// "review" at once (the QA contract requires every agent touching a
// conflicted topic to carry it forward, not resolve it silently). Which
// specific sub-agent is affected and why is already visible below in
// Activity — Results only needs to answer "is there an open conflict".
function renderConflicts(conflicts) {
  if (!conflicts?.length) return "";
  return conflicts
    .map((c) => {
      const resolved = !/UNRESOLVED/i.test(c.resolution);
      const rowClass = resolved ? "result-row" : "result-row result-row--alert";
      const cls = resolved ? "pass" : "fail";
      return `<div class="${rowClass}"><strong>${escapeHtml(c.id)}</strong> <span class="change-tag ${cls}">${escapeHtml(c.resolution)}</span> — ${escapeHtml(c.topic)}</div>`;
    })
    .join("");
}

// Open-questions.md (contract §5a) is the object's own live list of unresolved
// NEEDS_CONFIRMATION/CONFLICT/OPEN_ISSUE items — shown here so the card answers
// "what's still blocking this object" without anyone opening the repo (§12.3b).
function renderOpenQuestions(items) {
  if (!items?.length) return "";
  const typeClass = { CONFLICT: "fail", NEEDS_CONFIRMATION: "review", OPEN_ISSUE: "review" };
  return items
    .map((oq) => {
      const cls = typeClass[oq.type] || "review";
      const sides = oq.type === "CONFLICT" && (oq.side_a || oq.side_b)
        ? `<div class="result-row__detail">A: ${escapeHtml(oq.side_a || "")} &nbsp;|&nbsp; B: ${escapeHtml(oq.side_b || "")}</div>`
        : "";
      return `<div class="result-row result-row--alert"><strong>${escapeHtml(oq.oq_id)}</strong> <span class="change-tag ${cls}">${escapeHtml(oq.type)}</span> — ${escapeHtml(oq.summary || "")}${sides}</div>`;
    })
    .join("");
}

// Results = candidate KB/profile/checklist output this run produced, and
// whether each one is brand new or refreshes an already-published version
// (see classifyChange in server.mjs).
function renderResults(results) {
  if (!results) return "No candidate output yet";
  const rows = [];
  if (results.product_kb) {
    rows.push(`<div class="result-row"><strong>Product KB</strong> ${changeTag(results.product_kb.change)} — ${escapeHtml(results.product_kb.path)}</div>`);
  }
  if (results.kb_diff) {
    const d = results.kb_diff;
    const parts = [`${d.added} added`, `${d.changed} changed`, `${d.refreshed_only} refreshed`, `${d.deprecated} deprecated`];
    if (d.conflicted) parts.push(`${d.conflicted} conflicted`);
    rows.push(`<div class="result-row"><strong>KB diff</strong> — ${escapeHtml(parts.join(", "))}</div>`);
  }
  if (results.profiles?.length) {
    const list = results.profiles.map((p) => `${escapeHtml(p.name)} ${changeTag(p.change)}`).join(", ");
    rows.push(`<div class="result-row"><strong>Feature profiles</strong> — ${list}</div>`);
  }
  if (results.checklists?.length) {
    const list = results.checklists.map((c) => `${escapeHtml(c.name)} ${changeTag(c.change)}`).join(", ");
    rows.push(`<div class="result-row"><strong>Checklists</strong> — ${list}</div>`);
  }
  return rows.join("") || "No candidate output yet";
}

function renderActivity(agent) {
  const role = isOrchestrator(agent) ? "agent" : "sub-agent";
  return `
    <article class="activity-item" data-state="${agent.state}">
      <div class="activity-avatar">${escapeHtml(agentInitials(agent))}</div>
      <div class="activity-body">
        <div class="activity-title">
          <strong>${escapeHtml(agent.label)}</strong>
          <span class="role-pill ${role}">${role === "agent" ? "Agent" : "Sub-agent"}</span>
          <span>${escapeHtml(activityVerb(agent))}</span>
          <span class="status-pill ${escapeHtml(agent.state)}">${escapeHtml(stateColumnLabels[agent.state] || agent.state)}</span>
        </div>
        <time>${escapeHtml(formatTime(agent.updated_at || board.updated_at || board.active_run?.synced_at))}</time>
        <p>${escapeHtml(currentStateText(agent))}</p>
        <div class="activity-io">
          <section>
            <h4>Input</h4>
            <ul>${listItems(getInputFiles(agent)) || "<li>No input file</li>"}</ul>
          </section>
          <section>
            <h4>Output</h4>
            <ul>${listItems(getOutputs(agent)) || "<li>No output yet</li>"}</ul>
          </section>
        </div>
      </div>
    </article>
  `;
}

function activityVerb(agent) {
  if (agent.state === "done") return "completed";
  if (agent.state === "running") return "is working on";
  if (agent.state === "blocked") return "is blocked on";
  if (agent.state === "review") return "is waiting for review on";
  if (agent.state === "failed") return "failed";
  return "updated";
}

// updated_seq is a monotonic per-board counter (see server.mjs) that breaks
// ties from same-millisecond batch updates, so this stays a true "most
// recent activity first" ordering instead of falling back to array order.
// Agents never touched by a sync/patch have no seq and sort to the bottom.
function newestTime(agent) {
  return agent.updated_seq || 0;
}

function formatTime(value) {
  if (!value) return "Unknown time";
  return new Date(value).toLocaleString();
}

function agentInitials(agent) {
  return String(agent.label || agent.id || "?")
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function taskId(name) {
  return String(name).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function listItems(items = []) {
  return items.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
}

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[char]));
}

$("#refreshBoard").addEventListener("click", loadBoard);
$("#autoRefreshToggle").addEventListener("click", () => setAutoRefresh(!isAutoRefreshOn()));

// Click on the backdrop (outside the dialog's own box, padding included) to
// close it. Checking coordinates against getBoundingClientRect — rather than
// event.target === dialog — also covers the dialog's own padding ring so a
// click just inside the border doesn't get mistaken for a backdrop click.
$("#agentDialog").addEventListener("click", (event) => {
  const dialogEl = event.currentTarget;
  const rect = dialogEl.getBoundingClientRect();
  const inside = event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
  if (!inside) dialogEl.close();
});

loadBoard();
setAutoRefresh(isAutoRefreshOn());
