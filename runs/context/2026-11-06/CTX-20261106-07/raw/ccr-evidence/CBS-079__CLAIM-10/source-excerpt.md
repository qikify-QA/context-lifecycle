Jira TIB-5212 comment #55717, giangnth, 2026-10-27, đọc qua MCP 2026-11-06, trích nguyên văn (bỏ thẻ định dạng):

Batch HD is in scope for TIB-5212. The “Selected layers use different images…” tooltip came from an older fix that was only on staging and never went to dev; the current staging build replaces it with batch HD (max 10 different images per click).
Over the limit: an info toast appears first, then the error toast titled “Something went wrong!”.
Default is 10 unless set on the staging server. You can check it on the UI: select 11 different images not in HD; the error shows the limit.
Batch HD: each 2-second check that switches at least one layer is 1 step; one Undo reverts only the latest check. Turning HD off is 1 step.
