# CBS-090 CLAIM-02 — Jira check
Checked 2026-11-07 via Atlassian MCP (getJiraIssue + listJiraIssueComments, read-only). TIB-5470 status: Done (statusCategory Done); resolution field not returned by API. Timestamps are +0700. Whitespace/markdown (h3 vs ######, bold, smart quotes) ignored.

Result: **MATCH**

| Quote part | Comment | Author | Date | Result |
|---|---|---|---|---|
| ok Q2 / ok Q3 / ok Q5 / ok Q7 | 54563 https://ownego.atlassian.net/browse/TIB-5470?focusedCommentId=54563 | huyen.chu | 2026-10-14 17:35 | MATCH |
| Q2, Q7 + QA proposals | 54545 https://ownego.atlassian.net/browse/TIB-5470?focusedCommentId=54545 | phuongbb | 2026-10-14 14:47 | MATCH |
| Spec "Disabled (grayed out)... Hover..." | description | (reporter giangnth; created 2026-09-22) | — | MATCH (CCR uses "…" ellipsis between two bullets) |

Verbatim Jira:
- 54563: "ok Q2 / ok Q3 / ok Q5 / ok Q7" (separate lines)
- 54545: "Q2. When the button is disabled because no effect is selected, which tooltip shows? — QA đề xuất: Same 'Applies all effects to the current image and replaces it.'"
- 54545: "Q7. Button is disabled for an unsaved PSD/Canva Photo Upload layer with tooltip 'Save the artwork first to run effects on this image.' — not in the spec. PO accepts? — QA đề xuất: Accept — an unsaved image has no server file to run on"
- description (Portal > Run effects): "Disabled (grayed out) when no effect is configured yet" · "Enabled once at least one effect is configured." · "Hover: existing primary blue background with white text." · "Tooltip: “Applies all effects to the current image and replaces it." (Jira lacks the closing quote mark)
- Note: Jira description author field = reporter giangnth (ticket reporter); CCR attributes spec to PO — Jira API does not show per-section author.
