---
name: ctx-review
description: Gate độc lập trước publish — chạy gate C0–C6 và các audit trên candidate gốc và publish-preview, ra review/verdict.json với publish_allowed. Dùng từ ctx-run sau publish-strip. Chỉ verify, không sửa.
---

# ctx-review

1. `node scripts/ctx/publish-strip.mjs --run <id>` (nếu chưa) rồi `node scripts/ctx/audit-preview.mjs --run <id>` — phần cơ học của C6 (zero-run-reference, version-consistency, format ref, fence OQ).
2. Chọn phạm vi review: `node scripts/ctx/review-delta.mjs --run <id>`.
   - `{"full": true}` (chưa có snapshot, tức vòng 1): kiểm toàn bộ gate áp dụng ở bước 3.
   - Vòng 2+: kiểm (a) mỗi finding BLOCKING/MAJOR của verdict trước đã xử lý thật chưa; (b) các gate mà file trong `changed`/`added`/`removed` thuộc về, kể cả gate phía sau chúng (đổi plan hoặc KB shard → chạy lại từ C0.5/C3 trở xuống; chỉ đổi profile hoặc checklist → C4/C5); (c) C6 đầy đủ trên preview đã sinh lại. Đổi code trong `scripts/` thì chạy `npm test`. Đổi `input/ccr-fastpath-plan.json` hoặc `raw/ccr-evidence/**` luôn kéo theo review đầy đủ như vòng 1.
   Verdict mới ghi đủ gate_results (gate không phải chạy lại thì giữ kết quả vòng trước và ghi `carried_from: <verdict trước>` trong note).
3. Spawn MỘT subagent mới (không phải subagent đã produce), model/effort theo `pick-model` (review = mạnh nhất). Brief: run id, đường dẫn candidate/preview/review, phạm vi ở bước 2 (kèm output `review-delta`), đọc `references/reviewer.md` và `contracts/gates.md`. Không đưa kết luận của bạn vào brief. Subagent chạy các gate trong phạm vi và phần phán đoán: feature theo user goal, rule không suy từ một sample, `oracle_strength`, S3 có xác minh được không, `known_defect`. Grep thật chuỗi `quote` (100% claim `CONFIRMED_EXPECTED` HIGH + ≥20% mẫu còn lại). Chỉ ghi `review/verdict.json`.
4. `validate-run.mjs --run <id> --stage verdict`, rồi `node scripts/ctx/review-delta.mjs --run <id> --snapshot` để vòng sau chỉ kiểm phần đổi. `rework_targets` → ctx-run dispatch đúng nhánh, strip lại, review lại.

`publish_allowed: true` khi và chỉ khi mọi gate áp dụng là PASS/CONDITIONAL_PASS/NOT_APPLICABLE và mọi audit C6 sạch. Không chạy `publish-knowledge.mjs` ở bước này (nó ghi `knowledge/`).
