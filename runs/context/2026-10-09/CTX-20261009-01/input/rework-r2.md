# Rework sau review r2 (REJECTED) — duos CTX-20261009-01

Verdict: review/verdict.r2.json. Quyết định orchestrator CUỐI CÙNG cho round này; luật cũ + rework-r1.md vẫn áp. Script ở scratchpad riêng theo object + vai trò; không ghi dấu vết quá trình vào field publish.

- F-16 (BLOCKING) — luật C5: item `dev_doc` không được là oracle STRONG DUY NHẤT của check P1. pricing-subscription module-entitlement-gating CHK-001, CHK-002 (oracle KB-046/KB-047 dev_doc prose): giữ oracle_strength STRONG nhưng status NEEDS_CONFIRMATION + open_question_draft ("PO/Dev xác nhận điều kiện … là hành vi mong đợi; hiện chỉ có lời giải thích code FE của Dev 05/10/2026, chưa có test case PASS"). Rà toàn checklist pricing-subscription: mọi check P1 có oracle chỉ gồm item dev_doc → cùng xử lý.
- F-17 (MAJOR) — quote-request KB-039 (`quotation.skip_reassign_on_revoke` bật thì không reassign quote): QA KB Quote ghi đúng trường hợp này là "Need confirm" → áp D-1: INFERRED MEDIUM, bỏ confirmation_source, gắn OQ skip_reassign sẵn có. CHK-012 → NONE + NEEDS_CONFIRMATION.
- F-19 (MINOR) — profile notifications/sender-reply-to: bỏ KB-035 khỏi kb_refs của confirmed_rules (KB-035 là quan sát staging lệch rule, chỉ ở observed_behavior/risks).
- F-18 (MINOR, orchestrator) — OQ nhóm hiện trạng staging liệt kê từng hiện trạng (topic/statement rút gọn), bỏ từ vựng "căn cứ BASELINE".
