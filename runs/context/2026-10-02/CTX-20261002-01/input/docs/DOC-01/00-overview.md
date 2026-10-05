# Overview

> Product KB cho **Qikfiliate** (koin-partners) — hệ thống backend quản lý affiliate/partner commission cho brand **Koin** (khách hàng dùng chính: mysbox). Tài liệu này viết từ việc đọc trực tiếp source code (Laravel 6, `~/Code/Ownego/koin-partners`), không suy diễn.
>
> Bộ KB gồm 24 file, chia thành 8 nhóm chủ đề (mỗi nhóm 1 thư mục con, trừ 3 file dùng chung ở gốc: overview, domain-entities, known-issues) trong `docs/kb/affiliate-kb/`. Đọc theo thứ tự số nếu muốn hiểu toàn bộ hệ thống từ đầu, hoặc nhảy thẳng vào file cần — mỗi nhóm đều có sẵn ví dụ số liệu cụ thể và user journey từng bước, không chỉ mô tả code.

## What the system does

Qikfiliate theo dõi doanh thu Shopify Partner Referral và tính hoa hồng ("commission") cho các **affiliate** (gọi là `User` trong code) dựa trên các **shop** mà họ giới thiệu ("customer", model `Customer`) cài vào một **app Shopify** đang được quảng bá (`Program`).

Có 3 nhóm actor chính trong hệ thống:

1. **Affiliate (partner)** — người đăng ký tài khoản, lấy link giới thiệu (`TrackingInformation`/`ref_url`), giới thiệu shop cài app, và nhận hoa hồng qua `Invoice`. Họ dùng **affiliate dashboard** (web app riêng, không phải admin panel) — xem [04-affiliate-dashboard/00-overview.md](04-affiliate-dashboard/00-overview.md).
2. **Ownego ops/admin** — vận hành hệ thống qua **admin panel** (`encore/laravel-admin`): duyệt affiliate, cấu hình % hoa hồng, upload file payout Shopify, duyệt invoice thanh toán. Xem [05-admin-panel/00-overview.md](05-admin-panel/00-overview.md).
3. **Client app** (mysbox và các app Shopify khác dùng SDK `laravel-qikfiliate`) — gửi sự kiện vòng đời customer (cài app, subscribe, huỷ...) vào Qikfiliate qua API. Xem [06-integration-api/00-overview-and-auth.md](06-integration-api/00-overview-and-auth.md).

## High-level data flow

```
Shopify Partner Dashboard
        │  (admin tải file CSV Payout report thủ công mỗi kỳ)
        ▼
Admin panel: Upload payout CSV ──► ShopifyPayoutImport (per row)
        │
        ├─ Khớp row với Customer đã có (theo shop + app_slug)
        ├─ Loại bỏ charge_type "one-time" (không tính hoa hồng)
        ├─ Tính Level của affiliate (dựa trên số shop trả phí họ giới thiệu)
        ├─ Tra ProgramCommission (theo Program + Level) để lấy %, cap
        └─ Tạo Conversion (bản ghi hoa hồng cho 1 dòng payout)
                │
                ▼
        Conversion cộng dồn ► affiliate xem trên dashboard
                │
                ▼
        Admin tạo Invoice (thanh toán hoa hồng cho affiliate) ► duyệt ► completed
```

Song song đó, client app (mysbox...) gọi API `customer-events` để báo các sự kiện cài đặt/subscribe/huỷ của shop — việc này KHÔNG mang theo số tiền, chỉ dùng để tạo/cập nhật `Customer` và lịch sử trạng thái; toàn bộ số tiền hoa hồng đến từ file CSV Payout của Shopify, xử lý độc lập.

## File index

| Nhóm | File | Nội dung |
|---|---|---|
| — | [01-domain-entities.md](01-domain-entities.md) | Các model chính, field, quan hệ (ERD dạng bảng), 1 ví dụ xuyên suốt dùng lại ở các nhóm khác |
| **02-commission/** | [00-overview.md](02-commission/00-overview.md) | Sơ đồ quyết định tổng thể, bảng so sánh cap per-row vs lifetime |
| | [01-level-and-tier.md](02-commission/01-level-and-tier.md) | Cách lên bậc Level, VIP override, ví dụ số |
| | [02-recurring-and-first-month.md](02-commission/02-recurring-and-first-month.md) | Công thức recurring/first-month, 5 timeline ví dụ cho `isFirstMonth()` |
| | [03-usage-charge.md](02-commission/03-usage-charge.md) | Công thức usage-charge, ví dụ cap lifetime chạy qua nhiều kỳ |
| | [04-custom-conversion.md](02-commission/04-custom-conversion.md) | Journey tạo custom conversion, bảng ràng buộc |
| **03-payout-import/** | [00-overview-and-upload-journey.md](03-payout-import/00-overview-and-upload-journey.md) | Journey đầy đủ admin upload CSV Payout |
| | [01-charge-type-reference.md](03-payout-import/01-charge-type-reference.md) | Bảng charge_type + ví dụ số thật, cơ chế refund/downgrade |
| | [02-dedup-and-reconciliation.md](03-payout-import/02-dedup-and-reconciliation.md) | Khớp Customer, chống trùng, màn hình populate/reconcile |
| **04-affiliate-dashboard/** | [00-overview.md](04-affiliate-dashboard/00-overview.md) | Tổng quan các trang dashboard |
| | [01-signup-and-verification.md](04-affiliate-dashboard/01-signup-and-verification.md) | Journey đăng ký, xác thực, edge case đăng nhập |
| | [02-tracking-links.md](04-affiliate-dashboard/02-tracking-links.md) | Cơ chế link giới thiệu, timeline hết hạn |
| | [03-payment-and-payout-request.md](04-affiliate-dashboard/03-payment-and-payout-request.md) | Chọn payment method, ví dụ số điều kiện rút tiền |
| **05-admin-panel/** | [00-overview.md](05-admin-panel/00-overview.md) | Bản đồ 13 màn hình admin |
| | [01-managing-affiliates.md](05-admin-panel/01-managing-affiliates.md) | Duyệt/từ chối affiliate |
| | [02-programs-and-commissions.md](05-admin-panel/02-programs-and-commissions.md) | Journey launching 1 Program + rate card |
| | [03-customers-and-conversions.md](05-admin-panel/03-customers-and-conversions.md) | Xử lý payout hàng tháng, custom conversion |
| | [04-invoices-and-payment-methods.md](05-admin-panel/04-invoices-and-payment-methods.md) | Journey xử lý 1 yêu cầu thanh toán |
| | [05-other-screens.md](05-admin-panel/05-other-screens.md) | Level, Tracking Information, Customer Event, console command |
| **06-integration-api/** | [00-overview-and-auth.md](06-integration-api/00-overview-and-auth.md) | Cơ chế xác thực API key, rủi ro bảo mật |
| | [01-customer-lifecycle-api.md](06-integration-api/01-customer-lifecycle-api.md) | Timeline 6 bước end-to-end kèm payload JSON thật |
| **07-invoicing-payments/** | [00-overview-and-balance-mechanics.md](07-invoicing-payments/00-overview-and-balance-mechanics.md) | Cơ chế balance, phân biệt Payout vs Invoice |
| | [01-payout-request-journey.md](07-invoicing-payments/01-payout-request-journey.md) | 3 ví dụ số end-to-end (không đủ điều kiện / hoàn tất / huỷ giữa chừng) |
| — | [08-known-issues-edge-cases.md](08-known-issues-edge-cases.md) | 15 rủi ro/edge case, kèm kịch bản tái hiện cụ thể — nên đọc trước khi test |

## Key vocabulary (tránh nhầm lẫn)

- **"Customer" trong code = một SHOP** (merchant Shopify) được affiliate giới thiệu — không phải khách hàng cuối của shop đó.
- **"User" trong code = AFFILIATE/PARTNER** — không phải merchant hay khách hàng cuối.
- **Payout (Shopify)**: tiền Shopify trả cho Ownego (chủ app) — nguồn dữ liệu đầu vào để tính hoa hồng.
- **Invoice (Qikfiliate)**: tiền Ownego trả cho **affiliate** — đầu ra của hệ thống, khác hoàn toàn với "Payout" phía Shopify.
- **`partner_share`**: số tiền Ownego thực nhận từ Shopify cho 1 dòng charge (đã trừ phí Shopify) — là con số gốc để nhân % hoa hồng.
- **`amount` (trên Conversion)**: số tiền hoa hồng affiliate thực nhận cho dòng đó, sau khi áp % và cap.
