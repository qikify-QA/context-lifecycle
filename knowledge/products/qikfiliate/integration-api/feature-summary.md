# Integration API — client app báo sự kiện vòng đời shop vào Qikfiliate
**Published context version:** 1

**Product:** qikfiliate · **Mode:** DOC_BOOTSTRAP · **Environment:** documented · **Published:** 2026-10-05

## Features

- **api-key-authentication** — gate: PASS
- **customer-event-reporting-api** — gate: PASS
- **customer-provisioning-api** — gate: PASS

## Trạng thái open questions

- CONFLICT (chưa ngã ngũ, 2 phía song song): 0
- OPEN_ISSUE (known defect, quan sát hiện tại): 8
- NEEDS_CONFIRMATION (thiếu oracle đủ mạnh, chờ PO/Dev hoặc test_case PASS): 27
- Tổng: 35 — chi tiết đầy đủ trong `open-questions.md` của object này.

**Lưu ý về oracle_strength**: do toàn bộ KB của bootstrap đầu tiên này chỉ có nguồn `dev_doc` (chưa có `test_case`/`po_dev_confirm`/`spec_doc` nào), rất nhiều check regression phải giữ ở mức `BASELINE`/`NONE` thay vì `STRONG` theo đúng luật C5 của contract — đây là kết quả ĐÚNG và dự kiến của lần bootstrap đầu, không phải thiếu sót. `oracle_strength` sẽ nâng dần lên `STRONG` khi có `test_case` PASS tương ứng.

## Known defects đã ghi nhận (giữ nguyên hành vi hiện tại, KHÔNG dùng làm oracle đúng)

- `KB-007` (api-key-authentication): KNOWN_DEFECT — không thu hồi quyền riêng theo app
- `KB-008` (api-key-authentication): KNOWN_DEFECT — không phân biệt được app nào gọi request nào
- `KB-009` (api-key-authentication): KNOWN_DEFECT — không có rate limit riêng cho nhóm endpoint tích hợp
- `KB-010` (api-key-authentication): KNOWN_DEFECT — không có chữ ký request (HMAC), key lộ là gọi được cả DELETE
- `KB-007` (customer-event-reporting-api): KNOWN_DEFECT — name sai không bị chặn, lưu nguyên văn, không cảnh báo
- `KB-009` (customer-provisioning-api): KNOWN_DEFECT — POST /api/customers không validate program_slug tồn tại
- `KB-010` (customer-provisioning-api): KNOWN_DEFECT (nghi vấn) — program_slug không tồn tại có thể gây lỗi 500
- `KB-011` (customer-provisioning-api): KNOWN_DEFECT (nghi vấn, chưa xác minh) — endpoint khác dùng program_slug có thể cùng lỗi

## Nguồn & giới hạn

Toàn bộ knowledge của object này sinh từ bootstrap DOC_BOOTSTRAP đầu tiên (0 quan sát runtime — không có credential/portal/API access khi bootstrap). Tài liệu nguồn do dev viết trực tiếp từ source code `koin-partners` (Laravel 6), version v1, generated 2026-08-20. Claim nào chỉ đúng cho brand Koin mang `scope.brand: "koin"` trong `kb.json` — Qikfiliate phục vụ nhiều brand trên cùng codebase.
