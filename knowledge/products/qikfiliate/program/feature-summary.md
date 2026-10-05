# Program — app Shopify được quảng bá trong chương trình affiliate
**Published context version:** 1

**Product:** qikfiliate · **Mode:** DOC_BOOTSTRAP · **Environment:** documented · **Published:** 2026-10-05

## Features

- **program-catalog-for-affiliates** — gate: CONDITIONAL_PASS
- **program-launch** — gate: CONDITIONAL_PASS

## Trạng thái open questions

- CONFLICT (chưa ngã ngũ, 2 phía song song): 0
- OPEN_ISSUE (known defect, quan sát hiện tại): 2
- NEEDS_CONFIRMATION (thiếu oracle đủ mạnh, chờ PO/Dev hoặc test_case PASS): 14
- Tổng: 16 — chi tiết đầy đủ trong `open-questions.md` của object này.

**Lưu ý về oracle_strength**: do toàn bộ KB của bootstrap đầu tiên này chỉ có nguồn `dev_doc` (chưa có `test_case`/`po_dev_confirm`/`spec_doc` nào), rất nhiều check regression phải giữ ở mức `BASELINE`/`NONE` thay vì `STRONG` theo đúng luật C5 của contract — đây là kết quả ĐÚNG và dự kiến của lần bootstrap đầu, không phải thiếu sót. `oracle_strength` sẽ nâng dần lên `STRONG` khi có `test_case` PASS tương ứng.

## Known defects đã ghi nhận (giữ nguyên hành vi hiện tại, KHÔNG dùng làm oracle đúng)

- `KB-PL-004` (program-launch): KNOWN DEFECT — gõ sai Program.slug làm mất hoa hồng âm thầm
- `KB-PL-006` (program-launch): KNOWN DEFECT — quick-switch trên danh sách bỏ qua validate form đầy đủ

## Nguồn & giới hạn

Toàn bộ knowledge của object này sinh từ bootstrap DOC_BOOTSTRAP đầu tiên (0 quan sát runtime — không có credential/portal/API access khi bootstrap). Tài liệu nguồn do dev viết trực tiếp từ source code `koin-partners` (Laravel 6), version v1, generated 2026-08-20. Claim nào chỉ đúng cho brand Koin mang `scope.brand: "koin"` trong `kb.json` — Qikfiliate phục vụ nhiều brand trên cùng codebase.
