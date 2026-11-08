# CBS-090 CLAIM-19 — Jira check
Checked 2026-11-07 via Atlassian MCP (getJiraIssue + listJiraIssueComments, read-only). TIB-5470 status: Done (statusCategory Done); resolution field not returned by API. Timestamps are +0700. Whitespace/markdown (h3 vs ######, bold, smart quotes) ignored.

Result: **MATCH**

Source: description TIB-5470, "Update: Prompt variables" > Fields, Run (added 2026-10-26 per comment 55607 https://ownego.atlassian.net/browse/TIB-5470?focusedCommentId=55607, huyen.chu).

Verbatim Jira:
- Fields: "Prefill with the last entered value, then the option's default. If neither exists, show `No default value. Enter one to run.`"
- Run: "`Run effects` in the popover stays disabled until every field has a value." · "Clicking `Run effects` closes the popover and runs the effects."
