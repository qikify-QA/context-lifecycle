# CBS-090 CLAIM-05 — Jira check
Checked 2026-11-07 via Atlassian MCP (getJiraIssue + listJiraIssueComments, read-only). TIB-5470 status: Done (statusCategory Done); resolution field not returned by API. Timestamps are +0700. Whitespace/markdown (h3 vs ######, bold, smart quotes) ignored.

Result: **MATCH**

| Quote part | Comment | Author | Date | Result |
|---|---|---|---|---|
| ok Q3 | 54563 https://ownego.atlassian.net/browse/TIB-5470?focusedCommentId=54563 | huyen.chu | 2026-10-14 17:35 | MATCH |
| Q3 + proposal | 54545 https://ownego.atlassian.net/browse/TIB-5470?focusedCommentId=54545 | phuongbb | 2026-10-14 14:47 | MATCH |
| Dev doc HD / not saved | 53778 https://ownego.atlassian.net/browse/TIB-5470?focusedCommentId=53778 | giangnth | 2026-10-08 12:14 (edited 10-12) | MATCH |

Verbatim Jira:
- 54545: "Q3. PO OK that a successful run switches HD off for the layer and does not auto-save the artwork (reload without Save loses the result)? — QA đề xuất: Yes, as implemented by dev"
- 53778: "HD is switched off for that layer. Turning HD back on builds the HD version from the processed image." · "The artwork is **not saved automatically**; the seller must click Save."
