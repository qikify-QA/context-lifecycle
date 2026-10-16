# Tự động hoá và tăng trưởng: Shopify Flow, share unboxing [staging], recent pulls, banner [staging], email/thông báo, affiliate Qikfiliate, BigQuery partner sync
**Published context version:** 1

**Product:** mysbox · **Object:** `automation-growth` · **Mode:** DOC_BOOTSTRAP · **Environment:** documented · **Published:** 2026-10-16

## Features

- **shopify-flow-triggers** (P2) — Shopify Flow trigger từ Mysbox và công thức mẫu: 67 KB item, 29 check (8 cần xác nhận); gate KB/profile/checklist: PASS/CONDITIONAL_PASS/CONDITIONAL_PASS
- **shopify-flow-actions** (P1) — Shopify Flow action gọi vào Mysbox (Open/Remove order boxes, Handle external sales channel order paid): 38 KB item, 17 check (12 cần xác nhận); gate KB/profile/checklist: PASS/CONDITIONAL_PASS/CONDITIONAL_PASS
- **share-unboxing** (P3) — Share unboxing — khách chia sẻ kết quả mở box và đơn từ link chia sẻ: 148 KB item, 24 check (24 cần xác nhận); gate KB/profile/checklist: PASS/CONDITIONAL_PASS/CONDITIONAL_PASS · **chỉ có trên nhánh build-staging, chưa lên production**
- **recent-pulls-feed** (P2) — Feed Recent pulls ('vừa trúng') ở trang sản phẩm: 81 KB item, 30 check (11 cần xác nhận); gate KB/profile/checklist: PASS/CONDITIONAL_PASS/CONDITIONAL_PASS
- **dashboard-notification-banners** (P3) — Banner thông báo trên Dashboard merchant do admin tạo: 72 KB item, 22 check (20 cần xác nhận); gate KB/profile/checklist: PASS/CONDITIONAL_PASS/CONDITIONAL_PASS · **chỉ có trên nhánh build-staging, chưa lên production**
- **system-emails-and-notifications** (P2) — Email và thông báo hệ thống (merchant email, CRM Brevo, Slack): 50 KB item, 26 check (7 cần xác nhận); gate KB/profile/checklist: PASS/CONDITIONAL_PASS/CONDITIONAL_PASS
- **affiliate-referral-tracking** (P2) — Affiliate / referral tracking merchant mới (Qikfiliate): 44 KB item, 16 check (7 cần xác nhận); gate KB/profile/checklist: PASS/CONDITIONAL_PASS/CONDITIONAL_PASS
- **partner-events-bigquery-sync** (P3) — Đồng bộ Shopify Partner events sang BigQuery (báo cáo nội bộ): 20 KB item, 10 check (1 cần xác nhận); gate KB/profile/checklist: PASS/CONDITIONAL_PASS/CONDITIONAL_PASS

## Tóm tắt knowledge

- KB item: 525 (CONFIRMED_EXPECTED 235 · INFERRED 278 · OBSERVED_CURRENT 12), trong đó 5 item mức object (`kb.json`).
- Known defect (OBSERVED_CURRENT + status KNOWN_DEFECT, chỉ dùng làm regression watch): 12.
- Item chỉ có trên nhánh build-staging (tag `staging-only`, INFERRED, không dùng làm hành vi production): 225.
- Checklist: 174 check, 101 có oracle STRONG.

## Trạng thái open questions

- CONFLICT (hai phía song song, chưa ngã ngũ): 12
- OPEN_ISSUE (known defect, vùng tài liệu chưa nói tới): 34
- NEEDS_CONFIRMATION (thiếu oracle đủ mạnh, chờ PO/Dev hoặc test_case PASS): 53
- Tổng: 99 — chi tiết trong `open-questions.md` của object này.

**Lưu ý về oracle:** toàn bộ KB của lần bootstrap này chỉ có nguồn `dev_doc` (tài liệu dev sinh từ source code). Theo luật C5, check P1 (tiền, billing, bốc thăm, refund, store credit, permission, xoá dữ liệu) có oracle STRONG nhưng chỉ dựa trên dev_doc vẫn giữ NEEDS_CONFIRMATION tới khi có `test_case` PASS — đây là kết quả đúng của bootstrap đầu, không phải thiếu sót.

## Nguồn & giới hạn

Toàn bộ knowledge của object này sinh từ bootstrap DOC_BOOTSTRAP đầu tiên (0 quan sát runtime: không có credential/portal/API access). Nguồn: bộ "Mysbox Product KB" v1 do dev viết từ source Mysbox (nhánh production và build-staging), ngày 2026-10-16, không kèm commit — nên `authored_on` của mọi item là 2026-10-16; KB này supersede được bởi CCR mới hơn. Nội dung gắn thẻ "chỉ có trên staging" trong tài liệu được giữ với tag `staging-only` và không được coi là hành vi production. Giá trị seed/minh hoạ (vd hạn mức gói Free 10 box/kỳ, giá gói ví dụ) không phải số production.
