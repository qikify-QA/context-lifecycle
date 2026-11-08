# CBS-090 CLAIM-07 — Jira check
Checked 2026-11-07 via Atlassian MCP (getJiraIssue + listJiraIssueComments, read-only). TIB-5470 status: Done (statusCategory Done); resolution field not returned by API. Timestamps are +0700. Whitespace/markdown (h3 vs ######, bold, smart quotes) ignored.

Result: **MATCH**

Source: description TIB-5470 (issue created 2026-09-22 10:16; no per-section date available in Jira API), sections "Re-running effects" and "Effect configuration changes" (h3 in Jira; CCR renders as ######).

Verbatim Jira:
- "Every run uses the layer's current image **at the time of execution** as its input."
- "To run the effects again from the previous image, merchants must **Undo** the previous run first."
- "Changing, adding, removing, or reordering effects does not update the current image automatically. The image may remain out of sync until **Run effects** is run again."
