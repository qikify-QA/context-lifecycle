# CBS-090 CLAIM-18 — Jira check
Checked 2026-11-07 via Atlassian MCP (getJiraIssue + listJiraIssueComments, read-only). TIB-5470 status: Done (statusCategory Done); resolution field not returned by API. Timestamps are +0700. Whitespace/markdown (h3 vs ######, bold, smart quotes) ignored.

Result: **MATCH** (Jira-attributed part only: the spec line). TC-59/TC-74 lines are Testlane results, not Jira — not checked here.

Source: description TIB-5470, "Update: Prompt variables" (added 2026-10-26 per comment 55607 https://ownego.atlassian.net/browse/TIB-5470?focusedCommentId=55607, huyen.chu).

Verbatim Jira:
- Fields: "The field follows the option's input type."
- Saved values: "If the option changes (input type or name), use the updated input type and validate the saved value; if it is deleted, remove its field."
- No Jira text about an invalid saved value becoming empty (consistent with CCR "KHÔNG CÓ (PENDING-20)").
