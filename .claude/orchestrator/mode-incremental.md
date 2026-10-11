# Orchestrator — INCREMENTAL_UPDATE

Run CCR có ≥1 claim được operator yêu cầu explore (mode settle ở C0.5), hoặc operator yêu cầu cập nhật hẹp một feature đã publish. Object phải có base. Không supersede (§12.5 chỉ áp cho mode doc-based) — mọi `changed` là `CONFLICTED`.

Trước khi dispatch explorer: đổi `exploration_policy` trong `input/bootstrap-request.json` sang `defaults.mutation_policy`/`defaults.forbidden_actions` của product.

| # | Bước | Điều kiện |
|---|---|---|
| 1 | explorer theo `required_explorers` của từng claim | scope hẹp đúng feature/ACT của claim, không explore lại cả object; như `mode-explore.md` bước 2–6 |
| 2 | gate **C1**, **C2** | |
| 3 | `qa-knowledge-normalizer` mode `from-observation` (+ `from-ccr` cho claim S3) | → C3; carry-forward base của feature bị chạm |
| 4 | `feature-profile-builder` → `qa-checklist-builder` | → C4, C5; base + delta |
| 5 | `knowledge-diff-analyzer` | **LUÔN**; `NOT_APPLICABLE` là gate FAIL |
| 6 | publish | `.claude/orchestrator/publish.md` |
