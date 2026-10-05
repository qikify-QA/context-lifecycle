# Invoice/Payout — balance của affiliate và yêu cầu thanh toán hoa hồng
**Published context version:** 1

**Product:** qikfiliate · **Mode:** DOC_BOOTSTRAP · **Environment:** documented · **Published:** 2026-10-05

## Features

- **admin-invoice-processing** — gate: CONDITIONAL_PASS
- **balance-accrual** — gate: CONDITIONAL_PASS
- **payout-request-cancellation** — gate: CONDITIONAL_PASS
- **payout-request-eligibility** — gate: CONDITIONAL_PASS
- **payout-request-submission** — gate: PASS

## Trạng thái open questions

- CONFLICT (chưa ngã ngũ, 2 phía song song): 1
- OPEN_ISSUE (known defect, quan sát hiện tại): 2
- NEEDS_CONFIRMATION (thiếu oracle đủ mạnh, chờ PO/Dev hoặc test_case PASS): 29
- Tổng: 32 — chi tiết đầy đủ trong `open-questions.md` của object này.

**Lưu ý về oracle_strength**: do toàn bộ KB của bootstrap đầu tiên này chỉ có nguồn `dev_doc` (chưa có `test_case`/`po_dev_confirm`/`spec_doc` nào), rất nhiều check regression phải giữ ở mức `BASELINE`/`NONE` thay vì `STRONG` theo đúng luật C5 của contract — đây là kết quả ĐÚNG và dự kiến của lần bootstrap đầu, không phải thiếu sót. `oracle_strength` sẽ nâng dần lên `STRONG` khi có `test_case` PASS tương ứng.

## Known defects đã ghi nhận (giữ nguyên hành vi hiện tại, KHÔNG dùng làm oracle đúng)

- `KB-015` (admin-invoice-processing): KNOWN DEFECT C2: doi status sang completed khong goi API thanh toan nao va khong co chan thao tac nham
- `KB-003` (payout-request-cancellation): KNOWN DEFECT C1: Huy tu approved KHONG hoan balance - mat tien thuc

## Nguồn & giới hạn

Toàn bộ knowledge của object này sinh từ bootstrap DOC_BOOTSTRAP đầu tiên (0 quan sát runtime — không có credential/portal/API access khi bootstrap). Tài liệu nguồn do dev viết trực tiếp từ source code `koin-partners` (Laravel 6), version v1, generated 2026-08-20. Claim nào chỉ đúng cho brand Koin mang `scope.brand: "koin"` trong `kb.json` — Qikfiliate phục vụ nhiều brand trên cùng codebase.
