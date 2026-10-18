# Reveal / unbox: khách mở box (trang cảm ơn, order status, app proxy), truy cập bằng đăng nhập hoặc magic link, merchant unbox, auto-unbox
**Published context version:** 3

**Product:** mysbox · **Object:** `reveal` · **Mode:** REFRESH (trên nền DOC_BOOTSTRAP v1) · **Environment:** documented + staging · **Published:** 2026-10-17

## Features

- **reveal-journey** (P2) — Khách mở box (reveal) — điểm vào, màn reveal, mở một phần: 123 KB item (37 quan sát staging), 65 check (26 cần xác nhận)
- **customer-portal-access-magic-link** (P1) — Khách truy cập trang đơn/reveal qua app proxy hoặc magic link: 39 KB item (11 quan sát staging), 22 check (18 cần xác nhận)
- **auto-unbox** (P2) — Auto-unbox sau X giờ và nhắc 'unboxing soon': 68 KB item (4 quan sát staging), 23 check (13 cần xác nhận)

## Tóm tắt knowledge

- KB item: 233 (CONFIRMED_EXPECTED 140 · OBSERVED_CURRENT 56 · INFERRED 37), trong đó 3 item mức object (`kb.json`).
- Quan sát staging (OBSERVED_CURRENT, `scope.environment: staging`): 52 item. Đây là hành vi hiện tại trên staging, không phải kỳ vọng đã xác nhận và không chứng minh hành vi production.
- Known defect (status KNOWN_DEFECT, chỉ làm regression watch): 4.
- Checklist: 110 check, 72 oracle STRONG, 18 BASELINE, 57 cần xác nhận.
- Conflict đang mở: CONF-reveal-01, CONF-reveal-02, CONF-reveal-03, CONF-reveal-04, CONF-reveal-05.

## Trạng thái open questions

- CONFLICT: 5
- OPEN_ISSUE: 32
- NEEDS_CONFIRMATION: 37
- Tổng: 74 — chi tiết trong `open-questions.md` của object này.

**Lưu ý về oracle:** KB documented chỉ có nguồn `dev_doc`; check P1 có oracle dev_doc vẫn NEEDS_CONFIRMATION tới khi có `test_case` PASS. Quan sát staging chỉ cho oracle BASELINE (lệch là cần điều tra, chưa phải bug) và không thay item documented; khi quan sát trái tài liệu thì hai phía được giữ song song dạng conflict.

## Nguồn & giới hạn

Version 1: bootstrap DOC_BOOTSTRAP từ bộ "Mysbox Product KB" v1 do dev viết từ source (2026-10-16, không kèm commit). Version 2: REFRESH quan sát trên staging (merchant app embedded trong Shopify admin của development store, storefront có password, test order qua Bogus Gateway, network của merchant API và app proxy) ngày 2026-10-16, gói Free. Chưa phủ: resell/buyback/pool refill (gói Free khoá buyback), auto-unbox theo job, sold-out, đơn sealed box, DB/code, admin panel, khách đã đăng nhập, mobile. Một host backend thứ hai (`staging-api.mysbox.io`, khác host API đã cấu hình) được trang cảm ơn gọi trực tiếp — item liên quan gắn tag `host_not_in_expected_api_base`, chờ operator xác nhận, không dùng làm oracle. Version 3: REFRESH quan sát trên staging ngày 2026-10-17 (gói Free, 3 đơn test Bogus Gateway: đơn digital nhiều box, đơn bundle 3 set + sealed, đơn 2 box sealed; nút Unbox trong Manage orders; network merchant API và app proxy) nhằm trả lời open question đang mở. Chưa phủ: resell/buyback/pool refill (Free khoá), auto-unbox (bật thử bị chặn ở công cụ), Preview by test order, đổi version khi đơn còn box chưa mở, box group, khách đã đăng nhập. Mục OPEN_ISSUE chỉ được gỡ khi quan sát trả lời đủ câu hỏi về hành vi hiện tại; NEEDS_CONFIRMATION/CONFLICT chỉ được ghi staging_observation.
