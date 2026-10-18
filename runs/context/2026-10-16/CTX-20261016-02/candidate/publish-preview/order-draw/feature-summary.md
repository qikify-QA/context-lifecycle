# Order và bốc thăm: webhook orders/paid → order + opening request, chốt quà (winning), trạng thái đơn, đưa quà vào đơn Shopify, box physical vs digital
**Published context version:** 2

**Product:** mysbox · **Object:** `order-draw` · **Mode:** REFRESH (trên nền DOC_BOOTSTRAP v1) · **Environment:** documented + staging · **Published:** 2026-10-16

## Features

- **purchase-and-prize-draw** (P1) — Mua box và bốc thăm quà khi đơn paid: 67 KB item (8 quan sát staging), 32 check (25 cần xác nhận)
- **prizes-added-to-order** (P1) — Quà được thêm vào đơn Shopify (dòng $0): 78 KB item (3 quan sát staging), 29 check (21 cần xác nhận)
- **physical-sealed-box-fulfilment** (P2) — Box physical (Sealed box): quà giấu kín, metafield/tag/note, trừ kho: 65 KB item (1 quan sát staging), 27 check (7 cần xác nhận)

## Tóm tắt knowledge

- KB item: 239 (CONFIRMED_EXPECTED 161 · INFERRED 55 · OBSERVED_CURRENT 23), trong đó 29 item mức object (`kb.json`).
- Quan sát staging (OBSERVED_CURRENT, `scope.environment: staging`, tag `staging-observed`): 18 item. Đây là hành vi hiện tại trên staging, không phải kỳ vọng đã xác nhận và không chứng minh hành vi production.
- Known defect (status KNOWN_DEFECT, chỉ làm regression watch): 5.
- Item chỉ có trên nhánh build-staging theo tài liệu (tag `staging-only`): 1.
- Checklist: 88 check, 67 oracle STRONG, 8 BASELINE, 53 cần xác nhận.
- Conflict đang mở: CONF-order-draw-01, CONF-order-draw-02, CONF-order-draw-03, CONF-order-draw-04, CONF-order-draw-05, CONF-reveal-01.

## Trạng thái open questions

- CONFLICT: 6
- OPEN_ISSUE: 32
- NEEDS_CONFIRMATION: 27
- Tổng: 65 — chi tiết trong `open-questions.md` của object này.

**Lưu ý về oracle:** KB documented chỉ có nguồn `dev_doc`; check P1 có oracle dev_doc vẫn NEEDS_CONFIRMATION tới khi có `test_case` PASS. Quan sát staging chỉ cho oracle BASELINE (lệch là cần điều tra, chưa phải bug) và không thay item documented; khi quan sát trái tài liệu thì hai phía được giữ song song dạng conflict.

## Nguồn & giới hạn

Version 1: bootstrap DOC_BOOTSTRAP từ bộ "Mysbox Product KB" v1 do dev viết từ source (2026-10-16, không kèm commit). Version 2: REFRESH quan sát trên staging (merchant app embedded trong Shopify admin của development store, storefront có password, test order qua Bogus Gateway, network của merchant API và app proxy) ngày 2026-10-16, gói Free. Chưa phủ: resell/buyback/pool refill (gói Free khoá buyback), auto-unbox theo job, sold-out, đơn sealed box, DB/code, admin panel, khách đã đăng nhập, mobile. Một host backend thứ hai (`staging-api.mysbox.io`, khác host API đã cấu hình) được trang cảm ơn gọi trực tiếp — item liên quan gắn tag `host_not_in_expected_api_base`, chờ operator xác nhận, không dùng làm oracle.
