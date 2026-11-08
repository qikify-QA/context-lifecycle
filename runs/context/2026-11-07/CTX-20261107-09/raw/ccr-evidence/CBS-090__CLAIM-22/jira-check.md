# CBS-090 CLAIM-22 — Jira check
Checked 2026-11-07 via Atlassian MCP (getJiraIssue + listJiraIssueComments, read-only). TIB-5470 status: Done (statusCategory Done); resolution field not returned by API. Timestamps are +0700. Whitespace/markdown (h3 vs ######, bold, smart quotes) ignored.

Result: **MATCH**

| Quote part | Comment | Author | Date | Result |
|---|---|---|---|---|
| "Q1 B. Keep as spec..." | 55851 https://ownego.atlassian.net/browse/TIB-5470?focusedCommentId=55851 | huyen.chu | 2026-10-28 14:42 | MATCH |
| Dev question Problem / A-B | 55823 https://ownego.atlassian.net/browse/TIB-5470?focusedCommentId=55823 | giangnth | 2026-10-28 12:30 | MATCH |
| Spec lines | description (Update: Prompt variables, 2026-10-26) | — | — | MATCH |

Verbatim Jira:
- 55851: "Q1 B. Keep as spec: don't show unmatched variables, same as the storefront (left as is). A plain text field would not indicate to the user that the variable is unmatched."
- 55823: "Problem: the AI then gets the raw `{{Hat}}` text in its prompt (the storefront leaves it as is too). It still costs a provider call and counts toward the run limit, and it usually means a typo or a renamed or deleted layer. This also covers `{{School.color}}`, JSON list variables and the template selector."
- 55823: "A) Plain text field, required (dev suggestion) · B) Hide and run, as in the spec"
- description: "Unmatched variables are not shown and do not block the run." · "...if it is deleted, remove its field."
