---
name: ctx-review
description: Gate độc lập trước publish — chạy gate C0–C6 và các audit trên candidate gốc và publish-preview, ra review/verdict.json với publish_allowed. Dùng từ ctx-run sau publish-strip. Chỉ verify, không sửa.
---

# ctx-review

1. `node scripts/ctx/publish-strip.mjs --run <id>` (nếu chưa) rồi `node scripts/ctx/audit-preview.mjs --run <id>` — phần cơ học của C6 (zero-run-reference, version-consistency, format ref, fence OQ).
2. Spawn MỘT subagent mới (không phải subagent đã produce), model/effort theo `pick-model` (review = mạnh nhất). Brief: run id, đường dẫn candidate/preview/review, đọc `references/reviewer.md` và `contracts/gates.md`. Không đưa kết luận của bạn vào brief.
3. Subagent chạy lại toàn bộ gate áp dụng ở mode (bảng đầu `gates.md`) và phần phán đoán: feature theo user goal, rule không suy từ một sample, `oracle_strength`, S3 có xác minh được không, `known_defect`. Grep thật chuỗi `quote` (100% claim `CONFIRMED_EXPECTED` HIGH + ≥20% mẫu còn lại). Chỉ ghi `review/verdict.json`.
4. `validate-run.mjs --run <id> --stage verdict`. `rework_targets` → ctx-run dispatch đúng nhánh, strip lại, review lại.

`publish_allowed: true` khi và chỉ khi mọi gate áp dụng là PASS/CONDITIONAL_PASS/NOT_APPLICABLE và mọi audit C6 sạch. Không chạy `publish-knowledge.mjs` ở bước này (nó ghi `knowledge/`).
