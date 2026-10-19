# Box (mystery box = 1 variant Shopify): loại box Single/Bundle/Group-Tier, phần thưởng + xác suất, tạo/publish/xoá, version bất biến, tồn kho/pool, picking mode, pool refill
**Published context version:** 3

**Product:** mysbox · **Object:** `box` · **Mode:** REFRESH (trên nền DOC_BOOTSTRAP v1) · **Environment:** documented + staging · **Published:** 2026-10-17

## Features

- **box-type-and-prize-setup** (P1) — Chọn loại box và khai phần thưởng, xác suất, tier: 72 KB item (19 quan sát staging), 28 check (15 cần xác nhận)
- **box-create-and-publish** (P2) — Tạo box, Draft/Active, publish, unpublish, xoá: 106 KB item (26 quan sát staging), 51 check (13 cần xác nhận)
- **box-versioning** (P1) — Box version bất biến — đơn giữ cấu hình lúc mua: 55 KB item (12 quan sát staging), 22 check (12 cần xác nhận)
- **inventory-and-sold-out** (P1) — Tồn kho tracked/untracked, pool, sold-out và hiển thị tồn kho: 94 KB item (14 quan sát staging), 42 check (26 cần xác nhận)
- **picking-modes** (P1) — Picking mode — cách bốc item (simple, unique in order, unique across pools, group draw/pool/shared/independent): 56 KB item (6 quan sát staging), 26 check (21 cần xác nhận)
- **pool-refill** (P1) — Pool refill — trả món đã resell về pool (AUTO/MANUAL): 53 KB item (1 quan sát staging), 22 check (18 cần xác nhận)

## Tóm tắt knowledge

- KB item: 458 (CONFIRMED_EXPECTED 300 · OBSERVED_CURRENT 90 · INFERRED 68), trong đó 22 item mức object (`kb.json`).
- Quan sát staging (OBSERVED_CURRENT, `scope.environment: staging`): 82 item. Đây là hành vi hiện tại trên staging, không phải kỳ vọng đã xác nhận và không chứng minh hành vi production.
- Known defect (status KNOWN_DEFECT, chỉ làm regression watch): 8.
- Checklist: 191 check, 130 oracle STRONG, 27 BASELINE, 105 cần xác nhận.
- Conflict đang mở: CONF-admin-panel-01, CONF-box-01, CONF-box-02, CONF-box-03, CONF-box-04, CONF-box-05, CONF-box-10, CONF-box-11, CONF-box-12.

## Trạng thái open questions

- CONFLICT: 9
- OPEN_ISSUE: 61
- NEEDS_CONFIRMATION: 60
- Tổng: 130 — chi tiết trong `open-questions.md` của object này.

**Lưu ý về oracle:** KB documented chỉ có nguồn `dev_doc`; check P1 có oracle dev_doc vẫn NEEDS_CONFIRMATION tới khi có `test_case` PASS. Quan sát staging chỉ cho oracle BASELINE (lệch là cần điều tra, chưa phải bug) và không thay item documented; khi quan sát trái tài liệu thì hai phía được giữ song song dạng conflict.

## Nguồn & giới hạn

Version 1: bootstrap DOC_BOOTSTRAP từ bộ "Mysbox Product KB" v1 do dev viết từ source (2026-10-16, không kèm commit). Version 2: REFRESH quan sát trên staging (merchant app embedded trong Shopify admin của development store, storefront có password, test order qua Bogus Gateway, network của merchant API và app proxy) ngày 2026-10-16, gói Free. Chưa phủ: resell/buyback/pool refill (gói Free khoá buyback), auto-unbox theo job, sold-out, đơn sealed box, DB/code, admin panel, khách đã đăng nhập, mobile. Một host backend thứ hai (`staging-api.mysbox.io`, khác host API đã cấu hình) được trang cảm ơn gọi trực tiếp — item liên quan gắn tag `host_not_in_expected_api_base`, chờ operator xác nhận, không dùng làm oracle. Version 3: REFRESH quan sát trên staging ngày 2026-10-17 (gói Free, 3 đơn test Bogus Gateway: đơn digital nhiều box, đơn bundle 3 set + sealed, đơn 2 box sealed; nút Unbox trong Manage orders; network merchant API và app proxy) nhằm trả lời open question đang mở. Chưa phủ: resell/buyback/pool refill (Free khoá), auto-unbox (bật thử bị chặn ở công cụ), Preview by test order, đổi version khi đơn còn box chưa mở, box group, khách đã đăng nhập. Mục OPEN_ISSUE chỉ được gỡ khi quan sát trả lời đủ câu hỏi về hành vi hiện tại; NEEDS_CONFIRMATION/CONFLICT chỉ được ghi staging_observation.
