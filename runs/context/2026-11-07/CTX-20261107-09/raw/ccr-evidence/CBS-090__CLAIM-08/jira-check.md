# CBS-090 CLAIM-08 — Jira check
Checked 2026-11-07 via Atlassian MCP (getJiraIssue + listJiraIssueComments, read-only). TIB-5470 status: Done (statusCategory Done); resolution field not returned by API. Timestamps are +0700. Whitespace/markdown (h3 vs ######, bold, smart quotes) ignored.

Result: **MATCH**

| Quote part | Comment | Author | Date | Result |
|---|---|---|---|---|
| Q11 "The layer is replaced only if..." | 54560 https://ownego.atlassian.net/browse/TIB-5470?focusedCommentId=54560 | giangnth | 2026-10-14 16:59 | MATCH |
| "Closing the layer editor..." | 53778 https://ownego.atlassian.net/browse/TIB-5470?focusedCommentId=53778 | giangnth | 2026-10-08 (edited 10-12) | MATCH (QA description section) |
| "Reload the page during a run..." | 53778 | giangnth | 2026-10-08 | MATCH (it is a "Possible test cases" checklist item, not the QA description) |

Verbatim Jira:
- 54560: "The layer is replaced only if the same artwork is open in the editor at the moment the run finishes. Reopening the artwork later does not apply the result; the result is only in the library."
- 53778: "Closing the layer editor, selecting another layer, or reopening the artwork does not lose the run: reopening that layer shows the bar again and keeps the button locked until the run ends. Other layers are not affected."
- 53778 (test case list): "Reload the page during a run → the progress bar is gone and the layer is not replaced; the processed image still appears in the image library when the run ends."
