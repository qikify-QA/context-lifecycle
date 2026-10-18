# Reveal / unbox: khách mở box (trang cảm ơn, order status, app proxy), truy cập bằng đăng nhập hoặc magic link, merchant unbox, auto-unbox
**Published context version:** 2

**Product:** mysbox · **Object:** `reveal` · **Mode:** REFRESH (trên nền DOC_BOOTSTRAP v1) · **Environment:** documented + staging · **Published:** 2026-10-16

## Features

- **reveal-journey** (P2) — Khách mở box (reveal) — điểm vào, màn reveal, mở một phần: 106 KB item (20 quan sát staging), 61 check (22 cần xác nhận)
- **customer-portal-access-magic-link** (P1) — Khách truy cập trang đơn/reveal qua app proxy hoặc magic link: 35 KB item (7 quan sát staging), 21 check (17 cần xác nhận)
- **auto-unbox** (P2) — Auto-unbox sau X giờ và nhắc 'unboxing soon': 67 KB item (3 quan sát staging), 22 check (12 cần xác nhận)

## Tóm tắt knowledge

- KB item: 211 (CONFIRMED_EXPECTED 140 · INFERRED 37 · OBSERVED_CURRENT 34), trong đó 3 item mức object (`kb.json`).
- Quan sát staging (OBSERVED_CURRENT, `scope.environment: staging`, tag `staging-observed`): 30 item. Đây là hành vi hiện tại trên staging, không phải kỳ vọng đã xác nhận và không chứng minh hành vi production.
- Known defect (status KNOWN_DEFECT, chỉ làm regression watch): 4.
- Item chỉ có trên nhánh build-staging theo tài liệu (tag `staging-only`): 0.
- Checklist: 104 check, 73 oracle STRONG, 7 BASELINE, 51 cần xác nhận.
- Conflict đang mở: CONF-reveal-01, CONF-reveal-02, CONF-reveal-03, CONF-reveal-04.

## Trạng thái open questions

- CONFLICT: 4
- OPEN_ISSUE: 32
- NEEDS_CONFIRMATION: 28
- Tổng: 64 — chi tiết trong `open-questions.md` của object này.

**Lưu ý về oracle:** KB documented chỉ có nguồn `dev_doc`; check P1 có oracle dev_doc vẫn NEEDS_CONFIRMATION tới khi có `test_case` PASS. Quan sát staging chỉ cho oracle BASELINE (lệch là cần điều tra, chưa phải bug) và không thay item documented; khi quan sát trái tài liệu thì hai phía được giữ song song dạng conflict.

## Nguồn & giới hạn

Version 1: bootstrap DOC_BOOTSTRAP từ bộ "Mysbox Product KB" v1 do dev viết từ source (2026-10-16, không kèm commit). Version 2: REFRESH quan sát trên staging (merchant app embedded trong Shopify admin của development store, storefront có password, test order qua Bogus Gateway, network của merchant API và app proxy) ngày 2026-10-16, gói Free. Chưa phủ: resell/buyback/pool refill (gói Free khoá buyback), auto-unbox theo job, sold-out, đơn sealed box, DB/code, admin panel, khách đã đăng nhập, mobile. Một host backend thứ hai (`staging-api.mysbox.io`, khác host API đã cấu hình) được trang cảm ơn gọi trực tiếp — item liên quan gắn tag `host_not_in_expected_api_base`, chờ operator xác nhận, không dùng làm oracle.
