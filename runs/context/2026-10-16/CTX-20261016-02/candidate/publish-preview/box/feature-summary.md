# Box (mystery box = 1 variant Shopify): loại box Single/Bundle/Group-Tier, phần thưởng + xác suất, tạo/publish/xoá, version bất biến, tồn kho/pool, picking mode, pool refill
**Published context version:** 2

**Product:** mysbox · **Object:** `box` · **Mode:** REFRESH (trên nền DOC_BOOTSTRAP v1) · **Environment:** documented + staging · **Published:** 2026-10-16

## Features

- **box-type-and-prize-setup** (P1) — Chọn loại box và khai phần thưởng, xác suất, tier: 63 KB item (10 quan sát staging), 27 check (12 cần xác nhận)
- **box-create-and-publish** (P2) — Tạo box, Draft/Active, publish, unpublish, xoá: 95 KB item (15 quan sát staging), 47 check (9 cần xác nhận)
- **box-versioning** (P1) — Box version bất biến — đơn giữ cấu hình lúc mua: 51 KB item (8 quan sát staging), 20 check (10 cần xác nhận)
- **inventory-and-sold-out** (P1) — Tồn kho tracked/untracked, pool, sold-out và hiển thị tồn kho: 89 KB item (9 quan sát staging), 40 check (24 cần xác nhận)
- **picking-modes** (P1) — Picking mode — cách bốc item (simple, unique in order, unique across pools, group draw/pool/shared/independent): 52 KB item (2 quan sát staging), 24 check (19 cần xác nhận)
- **pool-refill** (P1) — Pool refill — trả món đã resell về pool (AUTO/MANUAL): 53 KB item (1 quan sát staging), 22 check (18 cần xác nhận)

## Tóm tắt knowledge

- KB item: 424 (CONFIRMED_EXPECTED 300 · INFERRED 68 · OBSERVED_CURRENT 56), trong đó 21 item mức object (`kb.json`).
- Quan sát staging (OBSERVED_CURRENT, `scope.environment: staging`, tag `staging-observed`): 48 item. Đây là hành vi hiện tại trên staging, không phải kỳ vọng đã xác nhận và không chứng minh hành vi production.
- Known defect (status KNOWN_DEFECT, chỉ làm regression watch): 8.
- Item chỉ có trên nhánh build-staging theo tài liệu (tag `staging-only`): 21.
- Checklist: 180 check, 132 oracle STRONG, 16 BASELINE, 92 cần xác nhận.
- Conflict đang mở: CONF-admin-panel-01, CONF-box-01, CONF-box-02, CONF-box-03, CONF-box-04, CONF-box-05.

## Trạng thái open questions

- CONFLICT: 6
- OPEN_ISSUE: 59
- NEEDS_CONFIRMATION: 49
- Tổng: 114 — chi tiết trong `open-questions.md` của object này.

**Lưu ý về oracle:** KB documented chỉ có nguồn `dev_doc`; check P1 có oracle dev_doc vẫn NEEDS_CONFIRMATION tới khi có `test_case` PASS. Quan sát staging chỉ cho oracle BASELINE (lệch là cần điều tra, chưa phải bug) và không thay item documented; khi quan sát trái tài liệu thì hai phía được giữ song song dạng conflict.

## Nguồn & giới hạn

Version 1: bootstrap DOC_BOOTSTRAP từ bộ "Mysbox Product KB" v1 do dev viết từ source (2026-10-16, không kèm commit). Version 2: REFRESH quan sát trên staging (merchant app embedded trong Shopify admin của development store, storefront có password, test order qua Bogus Gateway, network của merchant API và app proxy) ngày 2026-10-16, gói Free. Chưa phủ: resell/buyback/pool refill (gói Free khoá buyback), auto-unbox theo job, sold-out, đơn sealed box, DB/code, admin panel, khách đã đăng nhập, mobile. Một host backend thứ hai (`staging-api.mysbox.io`, khác host API đã cấu hình) được trang cảm ơn gọi trực tiếp — item liên quan gắn tag `host_not_in_expected_api_base`, chờ operator xác nhận, không dùng làm oracle.
