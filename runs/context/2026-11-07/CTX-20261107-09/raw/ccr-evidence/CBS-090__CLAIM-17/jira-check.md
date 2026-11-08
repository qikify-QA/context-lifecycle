# CBS-090 CLAIM-17 — Jira check
Checked 2026-11-07 via Atlassian MCP (getJiraIssue + listJiraIssueComments, read-only). TIB-5470 status: Done (statusCategory Done); resolution field not returned by API. Timestamps are +0700. Whitespace/markdown (h3 vs ######, bold, smart quotes) ignored.

Result: **MATCH**

Source: description TIB-5470, section "Update: Prompt variables" > Trigger, Fields. Date 2026-10-26 confirmed by comment 55607 https://ownego.atlassian.net/browse/TIB-5470?focusedCommentId=55607 (huyen.chu, 2026-10-26 12:46): "2026-10-26: Added `## Update: Prompt variables` to the description. It replaces the `Can't run: {{variable}} has no default value…` toast in Portal > Behavior with a `Fill in variables` popover."

Verbatim Jira (description):
- "Replaces the `Can't run: {{variable}} has no default value…` toast in **Behavior**."
- Trigger: "If any effect prompt contains variables, `Run effects` opens a `Fill in variables` popover, for both normal and global options." · "Description: `Enter the values to use for this run.`"
- Fields: "Show one field per unique variable matched to an existing option, in order of appearance, labelled with its token (e.g. `{{Name}}`)."
