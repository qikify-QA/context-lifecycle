# Payout Import — import file CSV Payout của Shopify, nguồn dữ liệu tiền duy nhất
**Published context version:** 1

**Product:** qikfiliate · **Mode:** DOC_BOOTSTRAP · **Environment:** documented · **Published:** 2026-10-05

## Features

- **charge-type-classification** — gate: CONDITIONAL_PASS
- **customer-matching-and-dedup** — gate: CONDITIONAL_PASS
- **payout-csv-upload** — gate: CONDITIONAL_PASS
- **populate-reconcile-late-data** — gate: CONDITIONAL_PASS

## Trạng thái open questions

- CONFLICT (chưa ngã ngũ, 2 phía song song): 1
- OPEN_ISSUE (known defect, quan sát hiện tại): 20
- NEEDS_CONFIRMATION (thiếu oracle đủ mạnh, chờ PO/Dev hoặc test_case PASS): 38
- Tổng: 59 — chi tiết đầy đủ trong `open-questions.md` của object này.

**Lưu ý về oracle_strength**: do toàn bộ KB của bootstrap đầu tiên này chỉ có nguồn `dev_doc` (chưa có `test_case`/`po_dev_confirm`/`spec_doc` nào), rất nhiều check regression phải giữ ở mức `BASELINE`/`NONE` thay vì `STRONG` theo đúng luật C5 của contract — đây là kết quả ĐÚNG và dự kiến của lần bootstrap đầu, không phải thiếu sót. `oracle_strength` sẽ nâng dần lên `STRONG` khi có `test_case` PASS tương ứng.

## Known defects đã ghi nhận (giữ nguyên hành vi hiện tại, KHÔNG dùng làm oracle đúng)

- `KB-004` (charge-type-classification): Không có gì đảm bảo Shopify giữ nguyên chuỗi đã quan sát (known defect)
- `KB-012` (charge-type-classification): Cơ chế code-level: Str::contains(Str::lower(...), 'usage'/'one-time') — rủi ro âm thầm nhất
- `KB-014` (charge-type-classification): charge_type mới không khớp 2 từ khoá → tự rơi vào recurring/first-month (known defect)
- `KB-015` (charge-type-classification): Không có log cảnh báo cho charge_type lạ
- `KB-016` (charge-type-classification): charge_type refund/downgrade chứa usage → đi qua UsageCommissionCapper (known defect)
- `KB-017` (charge-type-classification): Sai định tuyến không crash, chỉ ra sai số tiền — khó phát hiện
- `KB-018` (charge-type-classification): Refund của usage charge: rủi ro định tuyến nhầm — chưa có dữ liệu thật, cần QA test + PO xác nhận
- `KB-005` (customer-matching-and-dedup): Dòng không khớp Customer không được ghi log (known defect)
- `KB-007` (payout-csv-upload): App Title không dùng được làm khoá join (known defect)
- `KB-008` (payout-csv-upload): ShopifyPayoutImport::rules() bắt buộc app_slug, không tự suy
- `KB-011` (payout-csv-upload): Bổ sung app_slug là gánh nặng thao tác thủ công (known defect framing)
- `KB-024` (payout-csv-upload): Banner không liệt kê dòng bị bỏ qua (observability gap)
- `KB-031` (payout-csv-upload): Chênh lệch $0.06 chưa giải thích được ở ví dụ usage (regression watch)
- `KB-032` (payout-csv-upload): A1 cụ thể: thiếu app_slug → hoa hồng của app đó biến mất âm thầm cả kỳ
- `KB-033` (payout-csv-upload): A2 cụ thể: Partner Share rỗng → skip âm thầm, không phòng tránh được
- `KB-002` (populate-reconcile-late-data): Dễ nhầm giữa 2 màn hình Upload và Populate/reconcile (known defect)
- `KB-005` (populate-reconcile-late-data): Dùng lại Upload payout file cho export sau sẽ tạo Conversion trùng (known defect)
- `KB-011` (populate-reconcile-late-data): amount KHÔNG được tính lại khi populate (known defect)
- `KB-018` (populate-reconcile-late-data): Bất đối xứng hành vi lỗi giữa 2 màn hình — nên PO xác nhận có chủ đích hay không
- `KB-019` (populate-reconcile-late-data): 1 dòng lỗi trong file populate chặn cập nhật MỌI dòng hợp lệ phía sau nó

## Nguồn & giới hạn

Toàn bộ knowledge của object này sinh từ bootstrap DOC_BOOTSTRAP đầu tiên (0 quan sát runtime — không có credential/portal/API access khi bootstrap). Tài liệu nguồn do dev viết trực tiếp từ source code `koin-partners` (Laravel 6), version v1, generated 2026-08-20. Claim nào chỉ đúng cho brand Koin mang `scope.brand: "koin"` trong `kb.json` — Qikfiliate phục vụ nhiều brand trên cùng codebase.
