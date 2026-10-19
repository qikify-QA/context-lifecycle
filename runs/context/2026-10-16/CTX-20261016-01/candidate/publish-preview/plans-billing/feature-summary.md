# Plan, capacity chu kỳ 30 ngày, usage fee, daily usage charge + Charge, đổi/huỷ gói, promote code, billing discount, catalog Plan
**Published context version:** 1

**Product:** mysbox · **Object:** `plans-billing` · **Mode:** DOC_BOOTSTRAP · **Environment:** documented · **Published:** 2026-10-16

## Features

- **plan-capacity-and-cycle** (P1) — Plan, capacity box miễn phí theo chu kỳ 30 ngày và trial: 81 KB item, 23 check (16 cần xác nhận); gate KB/profile/checklist: PASS/CONDITIONAL_PASS/CONDITIONAL_PASS
- **capacity-limit-enforcement** (P1) — Chạm trần capacity (Free): gỡ xuất bản box và ẩn storefront: 45 KB item, 14 check (10 cần xác nhận); gate KB/profile/checklist: PASS/CONDITIONAL_PASS/CONDITIONAL_PASS
- **usage-fee-pricing** (P1) — Cách tính phí box vượt capacity (count-based và value-tiered): 59 KB item, 16 check (15 cần xác nhận); gate KB/profile/checklist: PASS/CONDITIONAL_PASS/CONDITIONAL_PASS
- **daily-usage-charge-and-charge-status** (P1) — Job usage charge hằng ngày và trạng thái Charge: 86 KB item, 18 check (15 cần xác nhận); gate KB/profile/checklist: PASS/CONDITIONAL_PASS/CONDITIONAL_PASS
- **plan-upgrade-downgrade-cancel** (P1) — Nâng, hạ, huỷ plan và trang xem trước thay đổi: 113 KB item, 36 check (27 cần xác nhận); gate KB/profile/checklist: PASS/CONDITIONAL_PASS/CONDITIONAL_PASS
- **promote-codes** (P1) — Promote code — mã cộng thêm capacity: 76 KB item, 29 check (23 cần xác nhận); gate KB/profile/checklist: PASS/CONDITIONAL_PASS/CONDITIONAL_PASS
- **billing-discount-codes** (P1) — Billing discount — mã giảm giá subscription và thêm trial: 66 KB item, 28 check (24 cần xác nhận); gate KB/profile/checklist: PASS/CONDITIONAL_PASS/CONDITIONAL_PASS
- **plan-catalog-administration** (P1) — Quản lý catalog Plan trong admin panel: 35 KB item, 15 check (11 cần xác nhận); gate KB/profile/checklist: PASS/CONDITIONAL_PASS/CONDITIONAL_PASS

## Tóm tắt knowledge

- KB item: 587 (CONFIRMED_EXPECTED 423 · INFERRED 153 · OBSERVED_CURRENT 11), trong đó 26 item mức object (`kb.json`).
- Known defect (OBSERVED_CURRENT + status KNOWN_DEFECT, chỉ dùng làm regression watch): 11.
- Item chỉ có trên nhánh build-staging (tag `staging-only`, INFERRED, không dùng làm hành vi production): 1.
- Checklist: 179 check, 135 có oracle STRONG.

## Trạng thái open questions

- CONFLICT (hai phía song song, chưa ngã ngũ): 14
- OPEN_ISSUE (known defect, vùng tài liệu chưa nói tới): 68
- NEEDS_CONFIRMATION (thiếu oracle đủ mạnh, chờ PO/Dev hoặc test_case PASS): 49
- Tổng: 131 — chi tiết trong `open-questions.md` của object này.

**Lưu ý về oracle:** toàn bộ KB của lần bootstrap này chỉ có nguồn `dev_doc` (tài liệu dev sinh từ source code). Theo luật C5, check P1 (tiền, billing, bốc thăm, refund, store credit, permission, xoá dữ liệu) có oracle STRONG nhưng chỉ dựa trên dev_doc vẫn giữ NEEDS_CONFIRMATION tới khi có `test_case` PASS — đây là kết quả đúng của bootstrap đầu, không phải thiếu sót.

## Nguồn & giới hạn

Toàn bộ knowledge của object này sinh từ bootstrap DOC_BOOTSTRAP đầu tiên (0 quan sát runtime: không có credential/portal/API access). Nguồn: bộ "Mysbox Product KB" v1 do dev viết từ source Mysbox (nhánh production và build-staging), ngày 2026-10-16, không kèm commit — nên `authored_on` của mọi item là 2026-10-16; KB này supersede được bởi CCR mới hơn. Nội dung gắn thẻ "chỉ có trên staging" trong tài liệu được giữ với tag `staging-only` và không được coi là hành vi production. Giá trị seed/minh hoạ (vd hạn mức gói Free 10 box/kỳ, giá gói ví dụ) không phải số production.
