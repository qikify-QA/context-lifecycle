# Plan, capacity chu kỳ 30 ngày, usage fee, daily usage charge + Charge, đổi/huỷ gói, promote code, billing discount, catalog Plan
**Published context version:** 2

**Product:** mysbox · **Object:** `plans-billing` · **Mode:** REFRESH (trên nền DOC_BOOTSTRAP v1) · **Environment:** documented + staging · **Published:** 2026-10-17

## Features

- **plan-capacity-and-cycle** (P1) — Plan, capacity box miễn phí theo chu kỳ 30 ngày và trial: 89 KB item (8 quan sát staging), 28 check (21 cần xác nhận)
- **capacity-limit-enforcement** (P1) — Chạm trần capacity (Free): 46 KB item (1 quan sát staging), 14 check (10 cần xác nhận)
- **usage-fee-pricing** (P1) — Cách tính phí box vượt capacity (count-based và value-tiered): 60 KB item (1 quan sát staging), 18 check (17 cần xác nhận)
- **daily-usage-charge-and-charge-status** (P1) — Job usage charge hằng ngày và trạng thái Charge: 87 KB item (1 quan sát staging), 19 check (16 cần xác nhận)
- **plan-upgrade-downgrade-cancel** (P1) — Nâng, hạ, huỷ plan và trang xem trước thay đổi: 114 KB item (1 quan sát staging), 36 check (27 cần xác nhận)
- **promote-codes** (P1) — Promote code — mã cộng thêm capacity: 77 KB item (1 quan sát staging), 29 check (23 cần xác nhận)
- **billing-discount-codes** (P1) — Billing discount — mã giảm giá subscription và thêm trial: 67 KB item (1 quan sát staging), 28 check (24 cần xác nhận)
- **plan-catalog-administration** (P1) — Quản lý catalog Plan trong admin panel: 35 KB item (0 quan sát staging), 15 check (11 cần xác nhận)

## Tóm tắt knowledge

- KB item: 601 (CONFIRMED_EXPECTED 423 · INFERRED 153 · OBSERVED_CURRENT 25), trong đó 26 item mức object (`kb.json`).
- Quan sát staging (OBSERVED_CURRENT, `scope.environment: staging`): 14 item. Đây là hành vi hiện tại trên staging, không phải kỳ vọng đã xác nhận và không chứng minh hành vi production.
- Known defect (status KNOWN_DEFECT, chỉ làm regression watch): 11.
- Checklist: 187 check, 135 oracle STRONG, 8 BASELINE, 149 cần xác nhận.
- Conflict đang mở: CONF-plans-billing-01, CONF-plans-billing-02, CONF-plans-billing-03, CONF-plans-billing-04, CONF-plans-billing-05, CONF-plans-billing-06, CONF-plans-billing-07, CONF-plans-billing-08, CONF-plans-billing-09, CONF-plans-billing-10, CONF-plans-billing-11, CONF-plans-billing-12, CONF-plans-billing-13, CONF-plans-billing-20, CONF-plans-billing-21, CONF-plans-billing-22.

## Trạng thái open questions

- CONFLICT: 16
- OPEN_ISSUE: 71
- NEEDS_CONFIRMATION: 59
- Tổng: 146 — chi tiết trong `open-questions.md` của object này.

**Lưu ý về oracle:** toàn bộ KB của lần bootstrap này chỉ có nguồn `dev_doc` (tài liệu dev sinh từ source code). Theo luật C5, check P1 (tiền, billing, bốc thăm, refund, store credit, permission, xoá dữ liệu) có oracle STRONG nhưng chỉ dựa trên dev_doc vẫn giữ NEEDS_CONFIRMATION tới khi có `test_case` PASS — đây là kết quả đúng của bootstrap đầu, không phải thiếu sót.

## Nguồn & giới hạn

Version 1: knowledge sinh từ bootstrap DOC_BOOTSTRAP đầu tiên (khi đó chưa có quan sát runtime). Nguồn: bộ "Mysbox Product KB" v1 do dev viết từ source Mysbox (nhánh production và build-staging), ngày 2026-10-16, không kèm commit — nên `authored_on` của mọi item là 2026-10-16; KB này supersede được bởi CCR mới hơn. Nội dung gắn thẻ "chỉ có trên staging" trong tài liệu được giữ với tag `staging-only` và không được coi là hành vi production. Giá trị seed/minh hoạ (vd hạn mức gói Free 10 box/kỳ, giá gói ví dụ) không phải số production. Version 2: REFRESH quan sát trên staging ngày 2026-10-17 (gói Free: Pricing chỉ đọc, Dashboard Box sales limit, Style Settings, Content & Translation; widget storefront và config Liquid; 1 đơn test Bogus Gateway đo độ trễ tồn kho widget; box test Deactivate/sửa khi Draft; network merchant API, Storefront GraphQL, app proxy) nhằm trả lời open question đang mở. Chưa phủ: mọi thao tác billing/plan/charge (cấm), resell/buyback (Free khoá), Koin (cấm lưu key), admin panel (tắt), khách đã đăng nhập. NEEDS_CONFIRMATION/CONFLICT chỉ được ghi staging_observation; lần này không OPEN_ISSUE nào được gỡ.
