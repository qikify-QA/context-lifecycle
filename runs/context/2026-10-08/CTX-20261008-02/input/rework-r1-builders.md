# Rework r1 — feature-profile-builder & qa-checklist-builder (mailtro CTX-20261008-02)

Các shard candidate/product-kb/*.json đã được normalizer sửa theo input/rework-r1.md (đọc file đó + review/verdict.r1.json để hiểu lý do). Mỗi shard có payload.kb_context.removed_kb_ids_r1 (id bị bỏ, để trống) và f03_splits (item CE bị rút statement + item OBSERVED/INFERRED mới tách ra). Một số item đổi kind (CE → INFERRED/OBSERVED), đổi conflict_group (KB-058 workspace-settings → CONF-MTRO-abuse-guard-02; automations KB-144/145 → CONF-MTRO-email-content-01; abuse-guard KB-098/099 → CONF-MTRO-deliverability-02).

## feature-profile-builder
Dựng lại (ghi đè) profile của object được giao từ shard hiện tại: bỏ mọi kb_ref tới id đã bỏ, đưa item mới vào đúng mục (CE không conflict → confirmed_rules; OBSERVED → observed_behavior; INFERRED/conflict/KNOWN_DEFECT → risks/unknown_areas), cập nhật profile_conflicts theo conflict_group mới. Mọi luật cũ (profile-checklist-brief.md) vẫn áp. kb_trace_complete phải true, unassigned_kb_items rỗng.

## qa-checklist-builder
Dựng lại (ghi đè) checklist của object được giao từ shard + profile hiện tại, tính lại oracle_strength theo luật cũ (STRONG ⟺ mọi oracle CE không conflict; có OBSERVED → BASELINE; INFERRED/PROPOSED/conflict/gap → NONE + NEEDS_CONFIRMATION). Bắt buộc:
- Không còn tham chiếu id đã bỏ. Check phụ thuộc item đã bỏ vì trùng object khác (F-06) → bỏ check, ghi vào duplicates_removed ('covered in <object>/<feature>').
- F-03: phần expected_result lấy từ chi tiết staging đã tách ra item OBSERVED phải nằm ở check BASELINE riêng (oracle = item OBSERVED mới), check STRONG chỉ khẳng định đúng nội dung authority (vd campaign-wizard CHK-035, contact-create-and-edit CHK-016/CHK-001).
- F-02: workspace-settings api-keys-and-public-api CHK-015 (IP allowlist) → NONE + NEEDS_CONFIRMATION.
- F-01: các check có oracle là item vừa hạ khỏi CE (auth KB-109/078/079/100; workspace-settings KB-080/021/001/075; v.v.) tính lại strength.
- F-09 (chỉ abuse-guard): CHK-009 account-and-access-abuse-limits dùng placeholder có cấu trúc, giữ ý nghĩa biến thể Gmail: '<local>@gmail.com', '<local>+t1@gmail.com', '<l.o.c.a.l>@gmail.com' (dấu chấm chèn vào phần local), '<local>+t2@gmail.com'.
- Segments: 3 file checklist segments đã bị agent khác vô tình chạy lại script cũ lúc 23:41 — dựng lại hoàn toàn từ shard hiện tại, KHÔNG dùng script trong scratchpad dùng chung (ghi script vào thư mục con riêng scratchpad/<object>-chk-r1/).
gate.decision PASS. Trả handoff ngắn: số check theo oracle_strength, thay đổi chính.
