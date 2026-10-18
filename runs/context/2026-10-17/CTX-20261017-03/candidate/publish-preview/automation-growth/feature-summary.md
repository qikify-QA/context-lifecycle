# Tự động hoá và tăng trưởng: Shopify Flow, share unboxing [staging], recent pulls, banner [staging], email/thông báo, affiliate Qikfiliate, BigQuery partner sync
**Published context version:** 2

**Product:** mysbox · **Object:** `automation-growth` · **Mode:** REFRESH (trên nền DOC_BOOTSTRAP v1) · **Environment:** documented + staging · **Published:** 2026-10-17

## Features

- **shopify-flow-triggers** (P2) — Shopify Flow trigger từ Mysbox và công thức mẫu: 67 KB item (0 quan sát staging), 29 check (8 cần xác nhận)
- **shopify-flow-actions** (P1) — Shopify Flow action gọi vào Mysbox (Open/Remove order boxes, Handle external sales channel order paid): 38 KB item (0 quan sát staging), 17 check (12 cần xác nhận)
- **share-unboxing** (P3) — Share unboxing — khách chia sẻ kết quả mở box và đơn từ link chia sẻ: 152 KB item (4 quan sát staging), 24 check (24 cần xác nhận)
- **recent-pulls-feed** (P2) — Feed Recent pulls ('vừa trúng') ở trang sản phẩm: 85 KB item (4 quan sát staging), 31 check (12 cần xác nhận)
- **dashboard-notification-banners** (P3) — Banner thông báo trên Dashboard merchant do admin tạo: 72 KB item (0 quan sát staging), 22 check (20 cần xác nhận)
- **system-emails-and-notifications** (P2) — Email và thông báo hệ thống (merchant email, CRM Brevo, Slack): 50 KB item (0 quan sát staging), 26 check (7 cần xác nhận)
- **affiliate-referral-tracking** (P2) — Affiliate / referral tracking merchant mới (Qikfiliate): 44 KB item (0 quan sát staging), 16 check (7 cần xác nhận)
- **partner-events-bigquery-sync** (P3) — Đồng bộ Shopify Partner events sang BigQuery (báo cáo nội bộ): 20 KB item (0 quan sát staging), 10 check (1 cần xác nhận)

## Tóm tắt knowledge

- KB item: 534 (INFERRED 278 · CONFIRMED_EXPECTED 235 · OBSERVED_CURRENT 21), trong đó 6 item mức object (`kb.json`).
- Quan sát staging (OBSERVED_CURRENT, `scope.environment: staging`): 9 item. Đây là hành vi hiện tại trên staging, không phải kỳ vọng đã xác nhận và không chứng minh hành vi production.
- Known defect (status KNOWN_DEFECT, chỉ làm regression watch): 12.
- Checklist: 175 check, 101 oracle STRONG, 3 BASELINE, 91 cần xác nhận.
- Conflict đang mở: CONF-automation-growth-01, CONF-automation-growth-02, CONF-automation-growth-03, CONF-automation-growth-04, CONF-automation-growth-05, CONF-automation-growth-06, CONF-automation-growth-07, CONF-automation-growth-08, CONF-automation-growth-09, CONF-automation-growth-10, CONF-automation-growth-11, CONF-automation-growth-12.

## Trạng thái open questions

- CONFLICT: 12
- OPEN_ISSUE: 36
- NEEDS_CONFIRMATION: 55
- Tổng: 103 — chi tiết trong `open-questions.md` của object này.

**Lưu ý về oracle:** toàn bộ KB của lần bootstrap này chỉ có nguồn `dev_doc` (tài liệu dev sinh từ source code). Theo luật C5, check P1 (tiền, billing, bốc thăm, refund, store credit, permission, xoá dữ liệu) có oracle STRONG nhưng chỉ dựa trên dev_doc vẫn giữ NEEDS_CONFIRMATION tới khi có `test_case` PASS — đây là kết quả đúng của bootstrap đầu, không phải thiếu sót.

## Nguồn & giới hạn

Version 1: knowledge sinh từ bootstrap DOC_BOOTSTRAP đầu tiên (khi đó chưa có quan sát runtime). Nguồn: bộ "Mysbox Product KB" v1 do dev viết từ source Mysbox (nhánh production và build-staging), ngày 2026-10-16, không kèm commit — nên `authored_on` của mọi item là 2026-10-16; KB này supersede được bởi CCR mới hơn. Nội dung gắn thẻ "chỉ có trên staging" trong tài liệu được giữ với tag `staging-only` và không được coi là hành vi production. Giá trị seed/minh hoạ (vd hạn mức gói Free 10 box/kỳ, giá gói ví dụ) không phải số production. Version 2: REFRESH quan sát trên staging ngày 2026-10-17 (merchant app embedded gói Free: Dashboard/Analytics center, General Settings, Style Settings Recent pulls/Share, App extension status; 1 đơn test Bogus Gateway; network merchant API, app proxy, Storefront) nhằm trả lời open question đang mở. Chưa phủ: validation Auto-unbox/Trigger before (bật thử bị chặn ở công cụ), feed recent pulls khi bật (công tắc đang tắt), Shopify Flow (cấm bật), Koin (cấm lưu key), onboarding (shop đã có box), khách đã đăng nhập, replay/sửa token xác thực (chờ operator duyệt). Mục OPEN_ISSUE chỉ được gỡ khi quan sát trả lời đủ câu hỏi về hành vi hiện tại; NEEDS_CONFIRMATION/CONFLICT chỉ được ghi staging_observation.
