# Resell (BOX / ITEMS), số tiền hoàn, store credit Koin + ticket + cart Function, huỷ/refund đơn từ Shopify
**Published context version:** 2

**Product:** mysbox · **Object:** `resell-refund-credit` · **Mode:** REFRESH (trên nền DOC_BOOTSTRAP v1) · **Environment:** documented + staging · **Published:** 2026-10-17

## Features

- **resell-setup-and-eligibility** (P1) — Cấu hình buyback và điều kiện để khách resell: 79 KB item (2 quan sát staging), 34 check (25 cần xác nhận)
- **resell-box-mode** (P1) — Resell chế độ BOX — bán lại cả box: 37 KB item (0 quan sát staging), 20 check (16 cần xác nhận)
- **resell-items-mode** (P1) — Resell chế độ ITEMS — bán lại từng món: 26 KB item (0 quan sát staging), 15 check (13 cần xác nhận)
- **refund-amount-calculation** (P1) — Công thức số tiền hoàn và chia thẻ / store credit: 74 KB item (0 quan sát staging), 23 check (21 cần xác nhận)
- **buy-box-with-store-credit** (P1) — Mua box bằng store credit Koin qua ticket và cart Function: 69 KB item (1 quan sát staging), 31 check (27 cần xác nhận)
- **order-cancellation-and-refund-sync** (P1) — Huỷ đơn và refund từ Shopify: 22 KB item (0 quan sát staging), 13 check (10 cần xác nhận)

## Tóm tắt knowledge

- KB item: 322 (CONFIRMED_EXPECTED 239 · INFERRED 67 · OBSERVED_CURRENT 16), trong đó 15 item mức object (`kb.json`).
- Quan sát staging (OBSERVED_CURRENT, `scope.environment: staging`): 3 item. Đây là hành vi hiện tại trên staging, không phải kỳ vọng đã xác nhận và không chứng minh hành vi production.
- Known defect (status KNOWN_DEFECT, chỉ làm regression watch): 13.
- Checklist: 136 check, 98 oracle STRONG, 3 BASELINE, 112 cần xác nhận.
- Conflict đang mở: CONF-merchant-app-01, CONF-resell-refund-credit-01, CONF-resell-refund-credit-02, CONF-resell-refund-credit-03.

## Trạng thái open questions

- CONFLICT: 4
- OPEN_ISSUE: 59
- NEEDS_CONFIRMATION: 39
- Tổng: 102 — chi tiết trong `open-questions.md` của object này.

**Lưu ý về oracle:** toàn bộ KB của lần bootstrap này chỉ có nguồn `dev_doc` (tài liệu dev sinh từ source code). Theo luật C5, check P1 (tiền, billing, bốc thăm, refund, store credit, permission, xoá dữ liệu) có oracle STRONG nhưng chỉ dựa trên dev_doc vẫn giữ NEEDS_CONFIRMATION tới khi có `test_case` PASS — đây là kết quả đúng của bootstrap đầu, không phải thiếu sót.

## Nguồn & giới hạn

Version 1: knowledge sinh từ bootstrap DOC_BOOTSTRAP đầu tiên (khi đó chưa có quan sát runtime). Nguồn: bộ "Mysbox Product KB" v1 do dev viết từ source Mysbox (nhánh production và build-staging), ngày 2026-10-16, không kèm commit — nên `authored_on` của mọi item là 2026-10-16; KB này supersede được bởi CCR mới hơn. Nội dung gắn thẻ "chỉ có trên staging" trong tài liệu được giữ với tag `staging-only` và không được coi là hành vi production. Giá trị seed/minh hoạ (vd hạn mức gói Free 10 box/kỳ, giá gói ví dụ) không phải số production. Version 2: REFRESH quan sát trên staging ngày 2026-10-17 (gói Free: Pricing chỉ đọc, Dashboard Box sales limit, Style Settings, Content & Translation; widget storefront và config Liquid; 1 đơn test Bogus Gateway đo độ trễ tồn kho widget; box test Deactivate/sửa khi Draft; network merchant API, Storefront GraphQL, app proxy) nhằm trả lời open question đang mở. Chưa phủ: mọi thao tác billing/plan/charge (cấm), resell/buyback (Free khoá), Koin (cấm lưu key), admin panel (tắt), khách đã đăng nhập. NEEDS_CONFIRMATION/CONFLICT chỉ được ghi staging_observation; lần này không OPEN_ISSUE nào được gỡ.
