#!/usr/bin/env node
// Kiểm agent definition theo template chung (DECISIONS 2.18):
//   - subagent có đủ heading Function/Modes/Input/Method/Output/Self-gate/Stop conditions/Handoff
//   - không còn boilerplate đã chuyển vào contract §0
//   - không chứa từ vựng riêng của product (đặt ở config/products/<key>/explore-playbook.md)
//   - agent được nhắc trong bảng Handoff phải tồn tại
//
//   node scripts/ctx/lint-agents.mjs     # exit 1 nếu có vi phạm

import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { rootDir } from "../lib/run-layout.mjs";

const agentsDir = path.join(rootDir, ".claude", "agents");
const ORCHESTRATOR = "qa-context-lifecycle-orchestrator";
const REQUIRED_HEADINGS = ["Function", "Modes", "Input", "Method", "Output", "Self-gate", "Stop conditions", "Handoff"];
const BANNED = [
  { re: /^## Ops board status/m, why: "board_update đã ở contract §0" },
  { re: /Khi skill `[^`]+` tồn tại/, why: "skill binding đã ở contract §0" },
  { re: /\b(teeinblue|TIB_|qikfiliate|koin|mysbox|Shopify|campaign|artwork)\b/i, why: "từ vựng riêng của product — đặt vào playbook/config" },
  { re: /mcp__qa-hub__/, why: "không có MCP server tên qa-hub — dùng qa_hub.mcp_server của product" },
  { re: /\bfastpath\s*[:=]|confidence_source/, why: "mô hình C0.5 cũ" }
];

export async function lintAgents(dir = agentsDir) {
  const files = (await readdir(dir)).filter((f) => f.endsWith(".md"));
  const names = new Set(files.map((f) => f.replace(/\.md$/, "")));
  const problems = [];
  for (const file of files) {
    const name = file.replace(/\.md$/, "");
    const text = await readFile(path.join(dir, file), "utf8");
    // frontmatter + phần mô tả/tools được miễn kiểm từ vựng (tool name có thể chứa tên server)
    const body = text.replace(/^---[\s\S]*?\n---\n/, "");
    if (!/^---\nname: /.test(text)) problems.push(`${file}: thiếu frontmatter name`);
    if (name !== ORCHESTRATOR) {
      for (const h of REQUIRED_HEADINGS) {
        if (!new RegExp(`^## ${h.replace(/[-]/g, "\\-")}\\b`, "m").test(body)) problems.push(`${file}: thiếu heading "## ${h}"`);
      }
    }
    for (const { re, why } of BANNED) {
      const m = body.match(re);
      if (m) problems.push(`${file}: "${m[0]}" — ${why}`);
    }
    const handoff = body.split(/^## Handoff/m)[1] ?? "";
    for (const m of handoff.matchAll(/`([a-z][a-z-]+(?:explorer|builder|normalizer|analyzer|reviewer|planner|orchestrator))`/g)) {
      if (!names.has(m[1])) problems.push(`${file}: handoff tới agent không tồn tại "${m[1]}"`);
    }
  }
  return problems;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const problems = await lintAgents();
  if (problems.length) {
    console.error(problems.map((p) => `- ${p}`).join("\n"));
    process.exit(1);
  }
  console.log("OK: agent definitions theo template");
}
