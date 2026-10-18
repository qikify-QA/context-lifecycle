# Order và bốc thăm: webhook orders/paid → order + opening request, chốt quà (winning), trạng thái đơn, đưa quà vào đơn Shopify, box physical vs digital
**Published context version:** 3

**Product:** mysbox · **Object:** `order-draw` · **Mode:** REFRESH (trên nền DOC_BOOTSTRAP v1) · **Environment:** documented + staging · **Published:** 2026-10-17

## Features

- **purchase-and-prize-draw** (P1) — Mua box và bốc thăm quà khi đơn paid: 73 KB item (14 quan sát staging), 37 check (30 cần xác nhận)
- **prizes-added-to-order** (P1) — Quà được thêm vào đơn Shopify (dòng $0): 83 KB item (8 quan sát staging), 31 check (23 cần xác nhận)
- **physical-sealed-box-fulfilment** (P2) — Box physical (Sealed box): 74 KB item (10 quan sát staging), 31 check (11 cần xác nhận)

## Tóm tắt knowledge

- KB item: 264 (CONFIRMED_EXPECTED 161 · INFERRED 55 · OBSERVED_CURRENT 48), trong đó 34 item mức object (`kb.json`).
- Quan sát staging (OBSERVED_CURRENT, `scope.environment: staging`): 43 item. Đây là hành vi hiện tại trên staging, không phải kỳ vọng đã xác nhận và không chứng minh hành vi production.
- Known defect (status KNOWN_DEFECT, chỉ làm regression watch): 5.
- Checklist: 99 check, 67 oracle STRONG, 19 BASELINE, 64 cần xác nhận.
- Conflict đang mở: CONF-order-draw-01, CONF-order-draw-02, CONF-order-draw-03, CONF-order-draw-04, CONF-order-draw-05, CONF-reveal-01.

## Trạng thái open questions

- CONFLICT: 6
- OPEN_ISSUE: 33
- NEEDS_CONFIRMATION: 40
- Tổng: 79 — chi tiết trong `open-questions.md` của object này.

**Lưu ý về oracle:** KB documented chỉ có nguồn `dev_doc`; check P1 có oracle dev_doc vẫn NEEDS_CONFIRMATION tới khi có `test_case` PASS. Quan sát staging chỉ cho oracle BASELINE (lệch là cần điều tra, chưa phải bug) và không thay item documented; khi quan sát trái tài liệu thì hai phía được giữ song song dạng conflict.

## Nguồn & giới hạn

Version 1: bootstrap DOC_BOOTSTRAP từ bộ "Mysbox Product KB" v1 do dev viết từ source (2026-10-16, không kèm commit). Version 2: REFRESH quan sát trên staging (merchant app embedded trong Shopify admin của development store, storefront có password, test order qua Bogus Gateway, network của merchant API và app proxy) ngày 2026-10-16, gói Free. Chưa phủ: resell/buyback/pool refill (gói Free khoá buyback), auto-unbox theo job, sold-out, đơn sealed box, DB/code, admin panel, khách đã đăng nhập, mobile. Một host backend thứ hai (`staging-api.mysbox.io`, khác host API đã cấu hình) được trang cảm ơn gọi trực tiếp — item liên quan gắn tag `host_not_in_expected_api_base`, chờ operator xác nhận, không dùng làm oracle. Version 3: REFRESH quan sát trên staging ngày 2026-10-17 (gói Free, 3 đơn test Bogus Gateway: đơn digital nhiều box, đơn bundle 3 set + sealed, đơn 2 box sealed; nút Unbox trong Manage orders; network merchant API và app proxy) nhằm trả lời open question đang mở. Chưa phủ: resell/buyback/pool refill (Free khoá), auto-unbox (bật thử bị chặn ở công cụ), Preview by test order, đổi version khi đơn còn box chưa mở, box group, khách đã đăng nhập. Mục OPEN_ISSUE chỉ được gỡ khi quan sát trả lời đủ câu hỏi về hành vi hiện tại; NEEDS_CONFIRMATION/CONFLICT chỉ được ghi staging_observation.
