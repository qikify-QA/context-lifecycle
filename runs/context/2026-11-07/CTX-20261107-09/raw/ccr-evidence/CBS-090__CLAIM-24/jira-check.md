# CBS-090 CLAIM-24 — Jira check
Checked 2026-11-07 via Atlassian MCP (getJiraIssue + listJiraIssueComments, read-only). TIB-5470 status: Done (statusCategory Done); resolution field not returned by API. Timestamps are +0700. Whitespace/markdown (h3 vs ######, bold, smart quotes) ignored.

Result: **MATCH**

| Quote part | Comment | Author | Date | Result |
|---|---|---|---|---|
| "Q2 A. Clear on page reload." | 55851 https://ownego.atlassian.net/browse/TIB-5470?focusedCommentId=55851 | huyen.chu | 2026-10-28 14:42 | MATCH |
| Dev's version + A/B | 55823 https://ownego.atlassian.net/browse/TIB-5470?focusedCommentId=55823 | giangnth | 2026-10-28 12:30 | MATCH |
| Spec lines | description (Update: Prompt variables > Saved values, 2026-10-26) | — | — | MATCH (CCR stops before the trailing sentence) |

Verbatim Jira:
- 55851: "Q2 A. Clear on page reload."
- 55823: "Dev's version: per layer, kept after running and after reopening the artwork, but **cleared on a page reload**, and not shared with another browser, tab or staff member. Keeping them past a reload would mean saving them in the artwork data (they would then only stick after Save) or in a new server store." · "A) Clear on page reload (dev suggestion) · B) Keep after reload too"
- description: "Save the last-entered values separately for each layer. Values stay after each run." · "e.g. typing `Anna` for `{{Name}}` on layer 1 prefills `Anna` next time on layer 1 only; layer 2 starts from the option's default. The value is still there after running and after reopening the artwork."
