# Merchant app (portal nhúng): cài app/onboarding, dashboard/analytics, General Settings, trạng thái shop (kill switch, re-auth, uninstall/reinstall, frozen), GDPR
**Published context version:** 1

**Product:** mysbox · **Object:** `merchant-app` · **Mode:** DOC_BOOTSTRAP · **Environment:** documented · **Published:** 2026-10-16

## Features

- **install-and-onboarding** (P2) — Cài app, wizard onboarding và setup guide: 63 KB item, 28 check (9 cần xác nhận); gate KB/profile/checklist: PASS/CONDITIONAL_PASS/CONDITIONAL_PASS
- **dashboard-and-analytics** (P2) — Dashboard và analytics của merchant: 69 KB item, 36 check (14 cần xác nhận); gate KB/profile/checklist: PASS/CONDITIONAL_PASS/CONDITIONAL_PASS
- **general-settings** (P2) — General Settings và setting ẩn: 56 KB item, 24 check (11 cần xác nhận); gate KB/profile/checklist: PASS/CONDITIONAL_PASS/CONDITIONAL_PASS
- **account-kill-switch** (P1) — Công tắc tài khoản shop (Security status) — chặn truy cập app: 26 KB item, 16 check (14 cần xác nhận); gate KB/profile/checklist: PASS/CONDITIONAL_PASS/CONDITIONAL_PASS
- **shop-connection-and-reauth** (P2) — Kết nối Shopify của shop: token, làm mới, re-auth: 43 KB item, 26 check (8 cần xác nhận); gate KB/profile/checklist: PASS/CONDITIONAL_PASS/PASS
- **shop-uninstall-reinstall-lifecycle** (P1) — Gỡ app, cài lại, store frozen — dữ liệu được giữ/khôi phục: 54 KB item, 24 check (15 cần xác nhận); gate KB/profile/checklist: PASS/CONDITIONAL_PASS/PASS
- **gdpr-data-requests** (P1) — Yêu cầu GDPR (customers/data_request, customers/redact, shop/redact): 9 KB item, 7 check (6 cần xác nhận); gate KB/profile/checklist: PASS/CONDITIONAL_PASS/CONDITIONAL_PASS

## Tóm tắt knowledge

- KB item: 339 (CONFIRMED_EXPECTED 279 · INFERRED 52 · OBSERVED_CURRENT 8), trong đó 19 item mức object (`kb.json`).
- Known defect (OBSERVED_CURRENT + status KNOWN_DEFECT, chỉ dùng làm regression watch): 8.
- Item chỉ có trên nhánh build-staging (tag `staging-only`, INFERRED, không dùng làm hành vi production): 4.
- Checklist: 161 check, 112 có oracle STRONG.

## Trạng thái open questions

- CONFLICT (hai phía song song, chưa ngã ngũ): 7
- OPEN_ISSUE (known defect, vùng tài liệu chưa nói tới): 51
- NEEDS_CONFIRMATION (thiếu oracle đủ mạnh, chờ PO/Dev hoặc test_case PASS): 48
- Tổng: 106 — chi tiết trong `open-questions.md` của object này.

**Lưu ý về oracle:** toàn bộ KB của lần bootstrap này chỉ có nguồn `dev_doc` (tài liệu dev sinh từ source code). Theo luật C5, check P1 (tiền, billing, bốc thăm, refund, store credit, permission, xoá dữ liệu) có oracle STRONG nhưng chỉ dựa trên dev_doc vẫn giữ NEEDS_CONFIRMATION tới khi có `test_case` PASS — đây là kết quả đúng của bootstrap đầu, không phải thiếu sót.

## Nguồn & giới hạn

Toàn bộ knowledge của object này sinh từ bootstrap DOC_BOOTSTRAP đầu tiên (0 quan sát runtime: không có credential/portal/API access). Nguồn: bộ "Mysbox Product KB" v1 do dev viết từ source Mysbox (nhánh production và build-staging), ngày 2026-10-16, không kèm commit — nên `authored_on` của mọi item là 2026-10-16; KB này supersede được bởi CCR mới hơn. Nội dung gắn thẻ "chỉ có trên staging" trong tài liệu được giữ với tag `staging-only` và không được coi là hành vi production. Giá trị seed/minh hoạ (vd hạn mức gói Free 10 box/kỳ, giá gói ví dụ) không phải số production.
