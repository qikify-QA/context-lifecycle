# CBS-090 CLAIM-01 — Jira check
Checked 2026-11-07 via Atlassian MCP (getJiraIssue + listJiraIssueComments, read-only). TIB-5470 status: Done (statusCategory Done); resolution field not returned by API. Timestamps are +0700. Whitespace/markdown (h3 vs ######, bold, smart quotes) ignored.

Result: **MATCH**

| Quote part | Comment | Author | Date | Result |
|---|---|---|---|---|
| Question Q1 | 54545 https://ownego.atlassian.net/browse/TIB-5470?focusedCommentId=54545 | phuongbb | 2026-10-14 14:47 | MATCH |
| "Q1: Accept the implementation..." | 54563 https://ownego.atlassian.net/browse/TIB-5470?focusedCommentId=54563 | huyen.chu | 2026-10-14 17:35 | MATCH |
| Dev doc "A Run effects button sits on..." | 53778 https://ownego.atlassian.net/browse/TIB-5470?focusedCommentId=53778 | giangnth | created 2026-10-08 12:14 (edited 2026-10-12) | MATCH |

Verbatim Jira:
- 54545: "Q1. Spec says the Run effects button is 'Always visible', but it is hidden for Global option / Linked / No customization Photo layers and on Etsy stores. Which is correct? — QA đề xuất: Accept the implementation — those layers don't own their image, and AI effects are already disabled on Etsy (support 2026-03-03)"
- 54563: "Q1: Accept the implementation. \"Always visible\" in the spec meant visible whether or not effects are configured (disabled until then), not across all layer types or stores."
- 53778: "A **Run effects** button sits on the \"Image effects\" heading of a Photo layer whose customization type is Normal. It is not shown for Global option / Linked / No customization layers, nor on Etsy stores."
- Global option reversal: comment 55059 (huyen.chu 2026-10-19) "2026-10-19: Added the global option case to Portal > Run effects."; description now has "When a layer uses an existing Global Option: Show Run effects next to Image effects (N)...". Consistent with CCR note.
