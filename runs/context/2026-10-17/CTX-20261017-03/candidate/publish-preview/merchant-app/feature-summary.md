# Merchant app (portal nhúng): cài app/onboarding, dashboard/analytics, General Settings, trạng thái shop (kill switch, re-auth, uninstall/reinstall, frozen), GDPR
**Published context version:** 2

**Product:** mysbox · **Object:** `merchant-app` · **Mode:** REFRESH (trên nền DOC_BOOTSTRAP v1) · **Environment:** documented + staging · **Published:** 2026-10-17

## Features

- **install-and-onboarding** (P2) — Cài app, wizard onboarding và setup guide: 67 KB item (4 quan sát staging), 30 check (11 cần xác nhận)
- **dashboard-and-analytics** (P2) — Dashboard và analytics của merchant: 80 KB item (11 quan sát staging), 39 check (18 cần xác nhận)
- **general-settings** (P2) — General Settings và setting ẩn: 65 KB item (9 quan sát staging), 26 check (13 cần xác nhận)
- **account-kill-switch** (P1) — Công tắc tài khoản shop (Security status) — chặn truy cập app: 26 KB item (0 quan sát staging), 16 check (14 cần xác nhận)
- **shop-connection-and-reauth** (P2) — Kết nối Shopify của shop: 43 KB item (0 quan sát staging), 26 check (8 cần xác nhận)
- **shop-uninstall-reinstall-lifecycle** (P1) — Gỡ app, cài lại, store frozen — dữ liệu được giữ/khôi phục: 54 KB item (0 quan sát staging), 24 check (15 cần xác nhận)
- **gdpr-data-requests** (P1) — Yêu cầu GDPR (customers/data_request, customers/redact, shop/redact): 9 KB item (0 quan sát staging), 7 check (6 cần xác nhận)

## Tóm tắt knowledge

- KB item: 364 (CONFIRMED_EXPECTED 279 · INFERRED 52 · OBSERVED_CURRENT 33), trong đó 20 item mức object (`kb.json`).
- Quan sát staging (OBSERVED_CURRENT, `scope.environment: staging`): 25 item. Đây là hành vi hiện tại trên staging, không phải kỳ vọng đã xác nhận và không chứng minh hành vi production.
- Known defect (status KNOWN_DEFECT, chỉ làm regression watch): 8.
- Checklist: 168 check, 111 oracle STRONG, 13 BASELINE, 85 cần xác nhận.
- Conflict đang mở: CONF-merchant-app-01, CONF-merchant-app-02, CONF-merchant-app-03, CONF-merchant-app-04, CONF-merchant-app-05, CONF-merchant-app-06, CONF-merchant-app-07, CONF-plans-billing-01.

## Trạng thái open questions

- CONFLICT: 8
- OPEN_ISSUE: 51
- NEEDS_CONFIRMATION: 58
- Tổng: 117 — chi tiết trong `open-questions.md` của object này.

**Lưu ý về oracle:** toàn bộ KB của lần bootstrap này chỉ có nguồn `dev_doc` (tài liệu dev sinh từ source code). Theo luật C5, check P1 (tiền, billing, bốc thăm, refund, store credit, permission, xoá dữ liệu) có oracle STRONG nhưng chỉ dựa trên dev_doc vẫn giữ NEEDS_CONFIRMATION tới khi có `test_case` PASS — đây là kết quả đúng của bootstrap đầu, không phải thiếu sót.

## Nguồn & giới hạn

Version 1: knowledge sinh từ bootstrap DOC_BOOTSTRAP đầu tiên (khi đó chưa có quan sát runtime). Nguồn: bộ "Mysbox Product KB" v1 do dev viết từ source Mysbox (nhánh production và build-staging), ngày 2026-10-16, không kèm commit — nên `authored_on` của mọi item là 2026-10-16; KB này supersede được bởi CCR mới hơn. Nội dung gắn thẻ "chỉ có trên staging" trong tài liệu được giữ với tag `staging-only` và không được coi là hành vi production. Giá trị seed/minh hoạ (vd hạn mức gói Free 10 box/kỳ, giá gói ví dụ) không phải số production. Version 2: REFRESH quan sát trên staging ngày 2026-10-17 (merchant app embedded gói Free: Dashboard/Analytics center, General Settings, Style Settings Recent pulls/Share, App extension status; 1 đơn test Bogus Gateway; network merchant API, app proxy, Storefront) nhằm trả lời open question đang mở. Chưa phủ: validation Auto-unbox/Trigger before (bật thử bị chặn ở công cụ), feed recent pulls khi bật (công tắc đang tắt), Shopify Flow (cấm bật), Koin (cấm lưu key), onboarding (shop đã có box), khách đã đăng nhập, replay/sửa token xác thực (chờ operator duyệt). Mục OPEN_ISSUE chỉ được gỡ khi quan sát trả lời đủ câu hỏi về hành vi hiện tại; NEEDS_CONFIRMATION/CONFLICT chỉ được ghi staging_observation.
