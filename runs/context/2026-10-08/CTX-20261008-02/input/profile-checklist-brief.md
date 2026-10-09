# Brief feature-profile-builder + qa-checklist-builder — mailtro CTX-20261008-02 (DOC_BOOTSTRAP)

Run dir: /Users/linhsmac/Documents/work/teeinblue-context-builder/runs/context/2026-10-08/CTX-20261008-02
Đọc: input/orchestrator-directives.json, input/scope-plan.json (feature_candidates của object), candidate/product-kb/<feature-key>.json của từng feature + candidate/product-kb/_object-level.<object-key>.json (nếu có) + candidate/product-kb/_product-level.json (chỉ tham chiếu KB-P-xxx), intermediate/doc/DOC-27.json (regression checklist QA = RISK HINT, KHÔNG phải oracle).
Tiền lệ shape: runs/context/2026-10-08/CTX-20261008-01/candidate/feature-profiles/api-keys.json và candidate/checklists/api-keys.json (payload.feature_profiles[0] / payload.checklists[0]).

## feature-profile-builder
- Ghi candidate/feature-profiles/<feature-key>.json cho MỖI feature của object được giao (1 file/feature, payload.feature_profiles = [1 profile]).
- observed_validations = [] (DOC_BOOTSTRAP không có quan sát runtime); act_ids rỗng; mọi kb_refs phải tồn tại trong shard của object (KB-xxx) hoặc product-level (KB-P-xxx).
- Không tạo expected behavior khi KB chưa CE. Item OBSERVED/INFERRED/KNOWN_DEFECT mô tả như hiện trạng/nghi vấn.
- unknown_areas: mỗi mục {question, kb_refs} là CÂU HỎI cụ thể, tự hiểu được; mỗi conflict_group / KNOWN_DEFECT / OQ draft liên quan nên có mặt ở unknown_areas hoặc risks. Không lặp OQ vô nghĩa.
- statement hygiene giống normalizer (không DOC-/DSEC-/CLM- id, không id knowledge Testlane, không tên file, không tên/handle người, không từ vựng nội bộ, không CTX id).
- gate.decision PASS / CONDITIONAL_PASS kèm lý do.

## qa-checklist-builder
- Ghi candidate/checklists/<feature-key>.json cho MỖI feature của object (payload.checklists = [1 checklist]).
- oracle_strength theo luật chung: STRONG ⟺ mọi oracle.kb_ids là CONFIRMED_EXPECTED không thuộc conflict_group; có kb OBSERVED_CURRENT (không KNOWN_DEFECT) → BASELINE; INFERRED / conflict / chỉ có gap → NONE và status NEEDS_CONFIRMATION + open_question_draft (câu hỏi cụ thể). NONE ⟺ NEEDS_CONFIRMATION.
- Item KNOWN_DEFECT KHÔNG BAO GIỜ nằm trong oracle.kb_ids — đặt ở regression_watch_kb_ids; check theo rule CE tương ứng (nếu có) là STRONG với oracle = rule.
- Không viết expected_result khẳng định khi oracle NONE. Expected của BASELINE phải ghi rõ "theo hiện trạng staging <ngày>, lệch = cần điều tra".
- DOC-27 chỉ dùng làm gợi ý risk/phủ, KHÔNG làm oracle.
- Check là test condition tái sử dụng, không phải test case chi tiết; không nhân bản 1 check / 1 KB vô tội vạ — gom theo hành vi.
- hygiene như trên. gate.decision PASS.

Trả handoff ngắn: số profile/checklist, số check theo oracle_strength, NEEDS_CONFIRMATION, + board_update payload.
