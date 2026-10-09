# Brief feature-profile-builder + qa-checklist-builder — duos CTX-20261009-01 (DOC_BOOTSTRAP)

Run dir: /Users/linhsmac/Documents/work/teeinblue-context-builder/runs/context/2026-10-09/CTX-20261009-01
Đọc: input/orchestrator-directives.json, input/scope-plan.json (feature_candidates của object), candidate/product-kb/<feature-key>.json của từng feature + candidate/product-kb/_object-level.<object-key>.json (nếu có) + candidate/product-kb/_product-level.json (chỉ tham chiếu KB-P-xxx), intermediate/doc/DOC-21.json (regression checklist QA = RISK HINT, KHÔNG phải oracle).
Tiền lệ shape: runs/context/2026-10-08/CTX-20261008-02/candidate/feature-profiles/api-keys-and-public-api.json và candidate/checklists/api-keys-and-public-api.json (payload.feature_profiles[0] / payload.checklists[0]).
Script/nháp → scratchpad riêng của bạn (thư mục con theo object), KHÔNG ghi vào run dir ngoài file đích, KHÔNG dùng script của agent khác.

## feature-profile-builder
- Ghi candidate/feature-profiles/<feature-key>.json cho MỖI feature của object được giao (1 file/feature, payload.feature_profiles = [1 profile]).
- observed_validations = [] (DOC_BOOTSTRAP không có quan sát runtime); act_ids rỗng; mọi kb_refs phải tồn tại trong shard của object (KB-xxx) hoặc product-level (KB-P-xxx). kb_trace_complete true, unassigned_kb_items rỗng.
- Không tạo expected behavior khi KB chưa CE. Item OBSERVED/INFERRED/KNOWN_DEFECT mô tả như hiện trạng/nghi vấn. CE không conflict → confirmed_rules; OBSERVED → observed_behavior; INFERRED/conflict/KNOWN_DEFECT → risks/unknown_areas.
- unknown_areas: mỗi mục {question, kb_refs} là CÂU HỎI cụ thể, tự hiểu được; mỗi conflict_group / KNOWN_DEFECT / OQ draft liên quan nên có mặt ở unknown_areas hoặc risks. Không lặp OQ vô nghĩa.
- statement hygiene giống normalizer-brief (không DOC-/DSEC-/CLM- id, không id knowledge Testlane KB-0xx/KB-3xx, không tên file/đường dẫn, không tên/handle người, không tên store staging, không từ vựng nội bộ, không CTX id, không dấu vết quá trình).
- gate.decision PASS / CONDITIONAL_PASS kèm lý do.

## qa-checklist-builder
- Ghi candidate/checklists/<feature-key>.json cho MỖI feature của object (payload.checklists = [1 checklist]).
- oracle_strength: STRONG ⟺ mọi oracle.kb_ids là CONFIRMED_EXPECTED không thuộc conflict_group; có kb OBSERVED_CURRENT (không KNOWN_DEFECT) → BASELINE; INFERRED / PROPOSED / conflict / chỉ có gap → NONE và status NEEDS_CONFIRMATION + open_question_draft (câu hỏi cụ thể). NONE ⟺ NEEDS_CONFIRMATION (orchestrator tính lại từng check, lệch là reject).
- Item KNOWN_DEFECT KHÔNG BAO GIỜ nằm trong oracle.kb_ids — đặt ở regression_watch_kb_ids; check theo rule CE tương ứng (nếu có) là STRONG với oracle = rule.
- Không viết expected_result khẳng định khi oracle NONE. Expected của BASELINE ghi rõ "theo hiện trạng staging 08/10/2026 (store Free plan), lệch = cần điều tra".
- Check STRONG chỉ khẳng định đúng nội dung authority; chi tiết staging (label UI) ở check BASELINE riêng (bài học F-03 Mailtro).
- Hành vi chỉ bật theo users.config: precondition ghi rõ config key; tên merchant không làm precondition.
- DOC-21 chỉ là gợi ý risk/phủ, KHÔNG làm oracle. Không dùng tên store staging/email thật trong precondition/steps — dùng placeholder có cấu trúc (vd <store-plus>, <email-buyer>).
- Check là test condition tái sử dụng, không phải test case chi tiết; gom theo hành vi.
- hygiene như trên. gate.decision PASS.

Trả handoff NGẮN: số profile/checklist, số check theo oracle_strength, NEEDS_CONFIRMATION, + board_update payload.
