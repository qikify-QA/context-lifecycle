# CBS-090 CLAIM-12 — Jira check
Checked 2026-11-07 via Atlassian MCP (getJiraIssue + listJiraIssueComments, read-only). TIB-5470 status: Done (statusCategory Done); resolution field not returned by API. Timestamps are +0700. Whitespace/markdown (h3 vs ######, bold, smart quotes) ignored.

Result: **MATCH**

| Quote part | Comment | Author | Date | Result |
|---|---|---|---|---|
| Q10 | 54560 https://ownego.atlassian.net/browse/TIB-5470?focusedCommentId=54560 | giangnth | 2026-10-14 16:59 | MATCH |
| 5 runs/min | 53778 https://ownego.atlassian.net/browse/TIB-5470?focusedCommentId=53778 | giangnth | 2026-10-08 (edited 10-12) | MATCH |

Verbatim Jira:
- 54560: "**Q10:** A 6th run within a minute shows the error toast \"Too many requests! – Please retry after N second(s)\" (N = seconds left in that minute). When the upload limit is used up (default 1000 images per day per store), the toast is \"Too many requests! – Reach the limit 1000 records in 1 day. Wait until {date time} to try again or contact support to increase.\" In both cases no run starts and the image is unchanged."
- 53778: "A store can start at most **5 runs per minute**, shared by the owner and all staff. 5 is the default and can be changed in the server config. Each run also counts toward the layer image upload limit."
