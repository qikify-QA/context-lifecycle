# Commission Rate Card (ProgramCommission) — rate card theo cặp (Program × Level)
**Published context version:** 1

**Product:** qikfiliate · **Mode:** DOC_BOOTSTRAP · **Environment:** documented · **Published:** 2026-10-05

## Features

- **rate-card-configuration** — gate: CONDITIONAL_PASS
- **usage-commission-enablement** — gate: CONDITIONAL_PASS

## Trạng thái open questions

- CONFLICT (chưa ngã ngũ, 2 phía song song): 0
- OPEN_ISSUE (known defect, quan sát hiện tại): 4
- NEEDS_CONFIRMATION (thiếu oracle đủ mạnh, chờ PO/Dev hoặc test_case PASS): 23
- Tổng: 27 — chi tiết đầy đủ trong `open-questions.md` của object này.

**Lưu ý về oracle_strength**: do toàn bộ KB của bootstrap đầu tiên này chỉ có nguồn `dev_doc` (chưa có `test_case`/`po_dev_confirm`/`spec_doc` nào), rất nhiều check regression phải giữ ở mức `BASELINE`/`NONE` thay vì `STRONG` theo đúng luật C5 của contract — đây là kết quả ĐÚNG và dự kiến của lần bootstrap đầu, không phải thiếu sót. `oracle_strength` sẽ nâng dần lên `STRONG` khi có `test_case` PASS tương ứng.

## Known defects đã ghi nhận (giữ nguyên hành vi hiện tại, KHÔNG dùng làm oracle đúng)

- `KB-RCC-005` (rate-card-configuration): KNOWN DEFECT — thêm Level mới dễ bỏ quên tạo ProgramCommission cho Program hiện có
- `KB-RCC-007` (rate-card-configuration): KNOWN DEFECT — màn Program Commission hiển thị số âm sai format so với Conversion/Invoice
- `KB-UCE-008` (usage-commission-enablement): KNOWN DEFECT — rủi ro cơ chế Grid-switch bỏ qua required_if (lớp rủi ro chung, lý do UI dùng icon chỉ-xem)
- `KB-UCE-012` (usage-commission-enablement): KNOWN DEFECT — skip do cấu hình không phân biệt được với skip do lỗi khác, banner không báo gì

## Nguồn & giới hạn

Toàn bộ knowledge của object này sinh từ bootstrap DOC_BOOTSTRAP đầu tiên (0 quan sát runtime — không có credential/portal/API access khi bootstrap). Tài liệu nguồn do dev viết trực tiếp từ source code `koin-partners` (Laravel 6), version v1, generated 2026-08-20. Claim nào chỉ đúng cho brand Koin mang `scope.brand: "koin"` trong `kb.json` — Qikfiliate phục vụ nhiều brand trên cùng codebase.
