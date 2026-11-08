Jira TIB-5212 comment #54785, giangnth, 2026-10-16, đọc qua MCP 2026-11-06, trích nguyên văn (bỏ thẻ định dạng):

Auto-generated from the branch diff (teeinblue-api + teeinblue-portal) against dev.
Feature: endpoint POST /layer-images/create-master-large/batch, taking urls[].
More than MASTER_LARGE_BATCH_LIMIT (default 10) images → 422 with the limit message above; nothing is queued.
At most 10 different images per click (layers already in HD are not counted). More shows the error “You can turn on HD for up to 10 different images at a time. Layers already in HD are not counted.” and no layer changes.

Jira TIB-5212 comment #55717, giangnth, 2026-10-27:
answers below. Corrections to my earlier comment are marked (correction).
