# Admin panel nội bộ (Filament): đăng nhập Slack + Shield role, Shops, Orders retry, Box, analytics/export, activity log, Embedded Version, job/queue
**Published context version:** 2

**Product:** mysbox · **Object:** `admin-panel` · **Mode:** REFRESH (trên nền DOC_BOOTSTRAP v1) · **Environment:** documented + staging · **Published:** 2026-10-17

## Features

- **admin-login-and-roles** (P1) — Đăng nhập admin panel bằng Slack, role và quyền (Shield): 53 KB item (0 quan sát staging), 19 check (16 cần xác nhận)
- **admin-shop-management** (P2) — Màn Shops trong admin: 97 KB item (0 quan sát staging), 26 check (14 cần xác nhận)
- **admin-order-inspection-and-retry** (P1) — Màn Orders trong admin: 75 KB item (0 quan sát staging), 21 check (12 cần xác nhận)
- **admin-box-management** (P2) — Trang Box trong admin: 59 KB item (0 quan sát staging), 23 check (7 cần xác nhận)
- **admin-platform-analytics-and-export** (P2) — Dashboard admin, trang Analytic và export CSV danh sách Shops: 22 KB item (0 quan sát staging), 14 check (6 cần xác nhận)
- **admin-activity-log** (P2) — Activity log — ai đã làm gì trên admin panel: 10 KB item (0 quan sát staging), 10 check (7 cần xác nhận)
- **portal-release-version-control** (P2) — Embedded Version và Customer Portal Resource — đúng bản portal sau release: 14 KB item (3 quan sát staging), 10 check (6 cần xác nhận)
- **background-jobs-and-queue-monitoring** (P2) — Job định kỳ, độ trễ và theo dõi hàng đợi (Horizon): 21 KB item (0 quan sát staging), 13 check (6 cần xác nhận)

## Tóm tắt knowledge

- KB item: 367 (CONFIRMED_EXPECTED 324 · INFERRED 31 · OBSERVED_CURRENT 12), trong đó 16 item mức object (`kb.json`).
- Quan sát staging (OBSERVED_CURRENT, `scope.environment: staging`): 3 item. Đây là hành vi hiện tại trên staging, không phải kỳ vọng đã xác nhận và không chứng minh hành vi production.
- Known defect (status KNOWN_DEFECT, chỉ làm regression watch): 9.
- Checklist: 136 check, 101 oracle STRONG, 1 BASELINE, 74 cần xác nhận.
- Conflict đang mở: CONF-admin-panel-01, CONF-admin-panel-02.

## Trạng thái open questions

- CONFLICT: 2
- OPEN_ISSUE: 60
- NEEDS_CONFIRMATION: 37
- Tổng: 99 — chi tiết trong `open-questions.md` của object này.

**Lưu ý về oracle:** toàn bộ KB của lần bootstrap này chỉ có nguồn `dev_doc` (tài liệu dev sinh từ source code). Theo luật C5, check P1 (tiền, billing, bốc thăm, refund, store credit, permission, xoá dữ liệu) có oracle STRONG nhưng chỉ dựa trên dev_doc vẫn giữ NEEDS_CONFIRMATION tới khi có `test_case` PASS — đây là kết quả đúng của bootstrap đầu, không phải thiếu sót.

## Nguồn & giới hạn

Version 1: knowledge sinh từ bootstrap DOC_BOOTSTRAP đầu tiên (khi đó chưa có quan sát runtime). Nguồn: bộ "Mysbox Product KB" v1 do dev viết từ source Mysbox (nhánh production và build-staging), ngày 2026-10-16, không kèm commit — nên `authored_on` của mọi item là 2026-10-16; KB này supersede được bởi CCR mới hơn. Nội dung gắn thẻ "chỉ có trên staging" trong tài liệu được giữ với tag `staging-only` và không được coi là hành vi production. Giá trị seed/minh hoạ (vd hạn mức gói Free 10 box/kỳ, giá gói ví dụ) không phải số production. Version 2: REFRESH quan sát trên staging ngày 2026-10-17 (gói Free: Pricing chỉ đọc, Dashboard Box sales limit, Style Settings, Content & Translation; widget storefront và config Liquid; 1 đơn test Bogus Gateway đo độ trễ tồn kho widget; box test Deactivate/sửa khi Draft; network merchant API, Storefront GraphQL, app proxy) nhằm trả lời open question đang mở. Chưa phủ: mọi thao tác billing/plan/charge (cấm), resell/buyback (Free khoá), Koin (cấm lưu key), admin panel (tắt), khách đã đăng nhập. NEEDS_CONFIRMATION/CONFLICT chỉ được ghi staging_observation; lần này không OPEN_ISSUE nào được gỡ.
