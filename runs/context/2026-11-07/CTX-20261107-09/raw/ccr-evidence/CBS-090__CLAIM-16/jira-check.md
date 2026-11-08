# CBS-090 CLAIM-16 — Jira check
Checked 2026-11-07 via Atlassian MCP (getJiraIssue + listJiraIssueComments, read-only). TIB-5470 status: Done (statusCategory Done); resolution field not returned by API. Timestamps are +0700. Whitespace/markdown (h3 vs ######, bold, smart quotes) ignored.

Result: **MATCH**

| Quote part | Comment | Author | Date | Result |
|---|---|---|---|---|
| Known limitation | 53778 https://ownego.atlassian.net/browse/TIB-5470?focusedCommentId=53778 | giangnth | created 2026-10-08 12:14, edited 2026-10-12 | MATCH (section "Missing API key check before a run") |
| ok Q5 | 54563 https://ownego.atlassian.net/browse/TIB-5470?focusedCommentId=54563 | huyen.chu | 2026-10-14 17:35 | MATCH |
| Q5 + proposal | 54545 https://ownego.atlassian.net/browse/TIB-5470?focusedCommentId=54545 | phuongbb | 2026-10-14 14:47 | MATCH |

Verbatim Jira:
- 53778: "Known limitation: a chain with both Remove background and Face cutout asks for a Remove background key even though the server skips Remove background in that chain. Deleting the Remove background effect is the workaround."
- 54545: "Q5. Known limitation: a chain with Remove background + Face cutout asks for a Remove background key although the server skips it. Accept for this release? — QA đề xuất: Accept; workaround = delete the Remove background effect (already disabled with Face Cutout per QA-750)"
- 54563: "ok Q5"
