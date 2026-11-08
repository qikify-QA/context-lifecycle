# CBS-090 CLAIM-13 — Jira check
Checked 2026-11-07 via Atlassian MCP (getJiraIssue + listJiraIssueComments, read-only). TIB-5470 status: Done (statusCategory Done); resolution field not returned by API. Timestamps are +0700. Whitespace/markdown (h3 vs ######, bold, smart quotes) ignored.

Result: **MATCH**

Comment 54560 https://ownego.atlassian.net/browse/TIB-5470?focusedCommentId=54560 · giangnth · 2026-10-14 16:59

Verbatim Jira: "**Q4:** Correction: there is no separate \"create layer images\" permission. The permission needed is **Manage Artwork** (Artworks → Manage in the staff role). Staff without it cannot open the artwork editor, so they never see the Run effects button (closest to A). The server also rejects a run from staff without this permission."

Note: dev doc 53778 "Affected areas" still says "a staff member needs permission to create layer images to start a run" — superseded by this Q4 correction.
