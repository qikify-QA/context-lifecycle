# Hạ tầng tích hợp: xác thực từng kênh gọi API (portal nhúng, extension, Flow) và nhận webhook Shopify/EventBridge
**Published context version:** 2

**Product:** mysbox · **Object:** `integrations` · **Mode:** REFRESH (trên nền DOC_BOOTSTRAP v1) · **Environment:** documented + staging · **Published:** 2026-10-17

## Features

- **request-authentication** (P1) — Xác thực request vào Mysbox API theo từng kênh: 18 KB item (3 quan sát staging), 14 check (13 cần xác nhận)
- **webhook-ingestion** (P1) — Nhận webhook Shopify / EventBridge an toàn và đúng một lần: 45 KB item (3 quan sát staging), 21 check (18 cần xác nhận)

## Tóm tắt knowledge

- KB item: 63 (CONFIRMED_EXPECTED 43 · OBSERVED_CURRENT 10 · INFERRED 10), trong đó 0 item mức object (`kb.json`).
- Quan sát staging (OBSERVED_CURRENT, `scope.environment: staging`): 6 item. Đây là hành vi hiện tại trên staging, không phải kỳ vọng đã xác nhận và không chứng minh hành vi production.
- Known defect (status KNOWN_DEFECT, chỉ làm regression watch): 4.
- Checklist: 35 check, 23 oracle STRONG, 2 BASELINE, 31 cần xác nhận.
- Conflict đang mở: CONF-integrations-01.

## Trạng thái open questions

- CONFLICT: 1
- OPEN_ISSUE: 19
- NEEDS_CONFIRMATION: 14
- Tổng: 34 — chi tiết trong `open-questions.md` của object này.

**Lưu ý về oracle:** toàn bộ KB của lần bootstrap này chỉ có nguồn `dev_doc` (tài liệu dev sinh từ source code). Theo luật C5, check P1 (tiền, billing, bốc thăm, refund, store credit, permission, xoá dữ liệu) có oracle STRONG nhưng chỉ dựa trên dev_doc vẫn giữ NEEDS_CONFIRMATION tới khi có `test_case` PASS — đây là kết quả đúng của bootstrap đầu, không phải thiếu sót.

## Nguồn & giới hạn

Version 1: knowledge sinh từ bootstrap DOC_BOOTSTRAP đầu tiên (khi đó chưa có quan sát runtime). Nguồn: bộ "Mysbox Product KB" v1 do dev viết từ source Mysbox (nhánh production và build-staging), ngày 2026-10-16, không kèm commit — nên `authored_on` của mọi item là 2026-10-16; KB này supersede được bởi CCR mới hơn. Nội dung gắn thẻ "chỉ có trên staging" trong tài liệu được giữ với tag `staging-only` và không được coi là hành vi production. Giá trị seed/minh hoạ (vd hạn mức gói Free 10 box/kỳ, giá gói ví dụ) không phải số production. Version 2: REFRESH quan sát trên staging ngày 2026-10-17 (merchant app embedded gói Free: Dashboard/Analytics center, General Settings, Style Settings Recent pulls/Share, App extension status; 1 đơn test Bogus Gateway; network merchant API, app proxy, Storefront) nhằm trả lời open question đang mở. Chưa phủ: validation Auto-unbox/Trigger before (bật thử bị chặn ở công cụ), feed recent pulls khi bật (công tắc đang tắt), Shopify Flow (cấm bật), Koin (cấm lưu key), onboarding (shop đã có box), khách đã đăng nhập, replay/sửa token xác thực (chờ operator duyệt). Mục OPEN_ISSUE chỉ được gỡ khi quan sát trả lời đủ câu hỏi về hành vi hiện tại; NEEDS_CONFIRMATION/CONFLICT chỉ được ghi staging_observation.
