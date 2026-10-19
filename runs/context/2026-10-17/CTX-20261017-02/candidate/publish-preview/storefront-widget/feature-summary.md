# Storefront widget: theme app embed + app block, Style Settings, Content & Translation, custom CSS/JS, dữ liệu storefront (metafield vs app proxy)
**Published context version:** 2

**Product:** mysbox · **Object:** `storefront-widget` · **Mode:** REFRESH (trên nền DOC_BOOTSTRAP v1) · **Environment:** documented + staging · **Published:** 2026-10-17

## Features

- **widget-theme-embed-setup** (P2) — Bật app embed, đặt block Mysbox và chỉnh Style Settings: 51 KB item (8 quan sát staging), 36 check (15 cần xác nhận)
- **widget-translations** (P3) — Dịch văn bản khách thấy (Content & Translation): 38 KB item (4 quan sát staging), 25 check (12 cần xác nhận)
- **widget-custom-code** (P3) — Custom CSS / JS cho widget — ai được sửa: 26 KB item (3 quan sát staging), 14 check (8 cần xác nhận)
- **storefront-data-sync** (P2) — Dữ liệu storefront qua metafield / app proxy và độ mới: 53 KB item (7 quan sát staging), 30 check (17 cần xác nhận)

## Tóm tắt knowledge

- KB item: 174 (CONFIRMED_EXPECTED 129 · OBSERVED_CURRENT 34 · INFERRED 11), trong đó 6 item mức object (`kb.json`).
- Quan sát staging (OBSERVED_CURRENT, `scope.environment: staging`): 24 item. Đây là hành vi hiện tại trên staging, không phải kỳ vọng đã xác nhận và không chứng minh hành vi production.
- Known defect (status KNOWN_DEFECT, chỉ làm regression watch): 10.
- Checklist: 105 check, 70 oracle STRONG, 17 BASELINE, 52 cần xác nhận.
- Conflict đang mở: CONF-storefront-widget-01, CONF-storefront-widget-02, CONF-storefront-widget-03, CONF-storefront-widget-04, CONF-storefront-widget-05, CONF-storefront-widget-06, CONF-storefront-widget-07.

## Trạng thái open questions

- CONFLICT: 7
- OPEN_ISSUE: 27
- NEEDS_CONFIRMATION: 33
- Tổng: 67 — chi tiết trong `open-questions.md` của object này.

**Lưu ý về oracle:** toàn bộ KB của lần bootstrap này chỉ có nguồn `dev_doc` (tài liệu dev sinh từ source code). Theo luật C5, check P1 (tiền, billing, bốc thăm, refund, store credit, permission, xoá dữ liệu) có oracle STRONG nhưng chỉ dựa trên dev_doc vẫn giữ NEEDS_CONFIRMATION tới khi có `test_case` PASS — đây là kết quả đúng của bootstrap đầu, không phải thiếu sót.

## Nguồn & giới hạn

Version 1: knowledge sinh từ bootstrap DOC_BOOTSTRAP đầu tiên (khi đó chưa có quan sát runtime). Nguồn: bộ "Mysbox Product KB" v1 do dev viết từ source Mysbox (nhánh production và build-staging), ngày 2026-10-16, không kèm commit — nên `authored_on` của mọi item là 2026-10-16; KB này supersede được bởi CCR mới hơn. Nội dung gắn thẻ "chỉ có trên staging" trong tài liệu được giữ với tag `staging-only` và không được coi là hành vi production. Giá trị seed/minh hoạ (vd hạn mức gói Free 10 box/kỳ, giá gói ví dụ) không phải số production. Version 2: REFRESH quan sát trên staging ngày 2026-10-17 (gói Free: Pricing chỉ đọc, Dashboard Box sales limit, Style Settings, Content & Translation; widget storefront và config Liquid; 1 đơn test Bogus Gateway đo độ trễ tồn kho widget; box test Deactivate/sửa khi Draft; network merchant API, Storefront GraphQL, app proxy) nhằm trả lời open question đang mở. Chưa phủ: mọi thao tác billing/plan/charge (cấm), resell/buyback (Free khoá), Koin (cấm lưu key), admin panel (tắt), khách đã đăng nhập. NEEDS_CONFIRMATION/CONFLICT chỉ được ghi staging_observation; lần này không OPEN_ISSUE nào được gỡ.
