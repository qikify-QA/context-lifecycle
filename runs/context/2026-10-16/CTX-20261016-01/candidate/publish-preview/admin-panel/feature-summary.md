# Admin panel nội bộ (Filament): đăng nhập Slack + Shield role, Shops, Orders retry, Box, analytics/export, activity log, Embedded Version, job/queue
**Published context version:** 1

**Product:** mysbox · **Object:** `admin-panel` · **Mode:** DOC_BOOTSTRAP · **Environment:** documented · **Published:** 2026-10-16

## Features

- **admin-login-and-roles** (P1) — Đăng nhập admin panel bằng Slack, role và quyền (Shield): 53 KB item, 19 check (16 cần xác nhận); gate KB/profile/checklist: PASS/CONDITIONAL_PASS/CONDITIONAL_PASS
- **admin-shop-management** (P2) — Màn Shops trong admin: tra cứu, chi tiết, sửa, row action: 97 KB item, 26 check (14 cần xác nhận); gate KB/profile/checklist: PASS/CONDITIONAL_PASS/CONDITIONAL_PASS
- **admin-order-inspection-and-retry** (P1) — Màn Orders trong admin: tra đơn, retry, winning bundles: 75 KB item, 21 check (12 cần xác nhận); gate KB/profile/checklist: PASS/CONDITIONAL_PASS/CONDITIONAL_PASS
- **admin-box-management** (P2) — Trang Box trong admin: Publish/Unpublish, Versions, Inventory, Recent pulls: 59 KB item, 23 check (7 cần xác nhận); gate KB/profile/checklist: PASS/CONDITIONAL_PASS/CONDITIONAL_PASS
- **admin-platform-analytics-and-export** (P2) — Dashboard admin, trang Analytic và export CSV danh sách Shops: 22 KB item, 14 check (6 cần xác nhận); gate KB/profile/checklist: PASS/CONDITIONAL_PASS/CONDITIONAL_PASS
- **admin-activity-log** (P2) — Activity log — ai đã làm gì trên admin panel: 10 KB item, 10 check (7 cần xác nhận); gate KB/profile/checklist: PASS/CONDITIONAL_PASS/CONDITIONAL_PASS
- **portal-release-version-control** (P2) — Embedded Version và Customer Portal Resource — đúng bản portal sau release: 11 KB item, 8 check (4 cần xác nhận); gate KB/profile/checklist: PASS/CONDITIONAL_PASS/CONDITIONAL_PASS
- **background-jobs-and-queue-monitoring** (P2) — Job định kỳ, độ trễ và theo dõi hàng đợi (Horizon): 21 KB item, 13 check (6 cần xác nhận); gate KB/profile/checklist: PASS/CONDITIONAL_PASS/CONDITIONAL_PASS

## Tóm tắt knowledge

- KB item: 364 (CONFIRMED_EXPECTED 324 · INFERRED 31 · OBSERVED_CURRENT 9), trong đó 16 item mức object (`kb.json`).
- Known defect (OBSERVED_CURRENT + status KNOWN_DEFECT, chỉ dùng làm regression watch): 9.
- Item chỉ có trên nhánh build-staging (tag `staging-only`, INFERRED, không dùng làm hành vi production): 2.
- Checklist: 134 check, 101 có oracle STRONG.

## Trạng thái open questions

- CONFLICT (hai phía song song, chưa ngã ngũ): 2
- OPEN_ISSUE (known defect, vùng tài liệu chưa nói tới): 59
- NEEDS_CONFIRMATION (thiếu oracle đủ mạnh, chờ PO/Dev hoặc test_case PASS): 34
- Tổng: 95 — chi tiết trong `open-questions.md` của object này.

**Lưu ý về oracle:** toàn bộ KB của lần bootstrap này chỉ có nguồn `dev_doc` (tài liệu dev sinh từ source code). Theo luật C5, check P1 (tiền, billing, bốc thăm, refund, store credit, permission, xoá dữ liệu) có oracle STRONG nhưng chỉ dựa trên dev_doc vẫn giữ NEEDS_CONFIRMATION tới khi có `test_case` PASS — đây là kết quả đúng của bootstrap đầu, không phải thiếu sót.

## Nguồn & giới hạn

Toàn bộ knowledge của object này sinh từ bootstrap DOC_BOOTSTRAP đầu tiên (0 quan sát runtime: không có credential/portal/API access). Nguồn: bộ "Mysbox Product KB" v1 do dev viết từ source Mysbox (nhánh production và build-staging), ngày 2026-10-16, không kèm commit — nên `authored_on` của mọi item là 2026-10-16; KB này supersede được bởi CCR mới hơn. Nội dung gắn thẻ "chỉ có trên staging" trong tài liệu được giữ với tag `staging-only` và không được coi là hành vi production. Giá trị seed/minh hoạ (vd hạn mức gói Free 10 box/kỳ, giá gói ví dụ) không phải số production.
