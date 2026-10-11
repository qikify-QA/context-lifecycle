# Orchestrator — CCR_INGEST

Object đã publish (có base), CCR mang claim `S3`/`S1`. **0 explorer.** Chạy sau `.claude/orchestrator/ccr-intake.md` (C0, lock, C0.5 đã xong, mode đã settle).

| # | Bước | Điều kiện |
|---|---|---|
| 1 | `qa-knowledge-normalizer` mode `from-ccr` | → C3. Shard của feature bị chạm = toàn bộ base + delta (carry-forward) |
| 2 | `feature-profile-builder` → `qa-checklist-builder` | → C4, C5; base + delta |
| 3 | `knowledge-diff-analyzer` | **LUÔN**; `NOT_APPLICABLE` là gate FAIL |
| 4 | publish | `.claude/orchestrator/publish.md` — `publish-strip.mjs` áp `SUPERSEDE` khi product có `supersede_policy.enabled: true`; 6 blocker của §12.5 STEP 6 là bất khả xâm phạm |

Gate C1/C2 dùng biến thể CCR của C1-DOC/C2-DOC (`contracts/gates.md`). Claim `S0` không vào candidate; nêu trong `results.open_questions` của Proposal.
