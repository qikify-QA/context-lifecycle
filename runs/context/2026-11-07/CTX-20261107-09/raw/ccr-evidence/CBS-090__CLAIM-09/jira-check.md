# CBS-090 CLAIM-09 — Jira check
Checked 2026-11-07 via Atlassian MCP (getJiraIssue + listJiraIssueComments, read-only). TIB-5470 status: Done (statusCategory Done); resolution field not returned by API. Timestamps are +0700. Whitespace/markdown (h3 vs ######, bold, smart quotes) ignored.

Result: **MATCH**

| Quote part | Comment | Author | Date | Result |
|---|---|---|---|---|
| Q11 | 54560 https://ownego.atlassian.net/browse/TIB-5470?focusedCommentId=54560 | giangnth | 2026-10-14 16:59 | MATCH |
| Toast text | 53778 https://ownego.atlassian.net/browse/TIB-5470?focusedCommentId=53778 | giangnth | 2026-10-08 (edited 10-12) | MATCH |

Verbatim Jira:
- 54560: "**Q11:** The run is not cancelled; the editor just stops waiting." / "If it timed out while waiting in the queue (5 min), it still runs later. If it succeeds, the new image appears in the library, but the layer is not replaced." / "If it timed out while processing (about 6 min), the server has already stopped it, so no new image is added."
- 53778: "If the run has not finished about 6 minutes after it starts processing, or has not started within 5 minutes because the queue is busy, the toast says \"Timed out waiting for the effects to finish.\" Time spent waiting in the queue does not count toward the 6 minutes."
