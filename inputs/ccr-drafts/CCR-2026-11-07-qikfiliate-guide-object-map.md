# Context Change Request: Guide qikfiliate dừng ở mức object

- **Product:** `qikfiliate`
- **Object:** tất cả, thay đổi mức product
- **Ticket:** `không có`
- **Các khối có trong file:** `C`

## Mức độ gấp

`LOW` — dọn canon, không chặn test.

# Khối C — Guide, flow

Không đổi KB, checklist, flow hay rule nào. Chỉ thay mục 2 của guide; các mục khác giữ nguyên.

| File | Hành động | Nội dung | Lý do |
|---|---|---|---|
| `_product-guide.md` mục 2 | Sửa: thay cả mục 2 (từ dòng `## 2.` tới trước `## 3.`) | Đoạn mới: Phụ lục C-1. Đoạn cũ: Phụ lục C-2 | Guide đang 9,97 KB; contract §5c mới (DECISIONS 2.31): guide tối đa 10 KB và không liệt kê feature key, feature nằm ở `<object>/feature-summary.md`. Bỏ cột Feature, đổi tên mục thành "Object". Sau khi áp: 9968 → 8744 byte |

## Phụ lục C-1 — mục 2 mới

~~~~~text
## 2. Object

Từ khoá sang object: `_registry.json`. Trạng thái, oracle: `manifest.json`. Feature của object: `<object>/feature-summary.md`. Vào đâu, cần fixture nào: `_flows/feature-entry.md`.

| Object | Phạm vi | Không thuộc |
|---|---|---|
| `affiliate-account` | Vòng đời tài khoản affiliate | Thông tin nhận tiền (`payment-method`) |
| `affiliate-level` | Bậc theo số shop trả phí, VIP | Rate card (`commission-rate-card`) |
| `program` | App được quảng bá | % hoa hồng (`commission-rate-card`) |
| `commission-rate-card` | % và cap theo Program × Level | Tính tiền từng dòng (`commission-calculation`) |
| `referral-attribution` | Gắn shop với đúng affiliate | Endpoint và auth (`integration-api`) |
| `customer-shop` | Shop được giới thiệu và vòng đời | |
| `integration-api` | 5 endpoint cho client app | |
| `payout-import` | Upload CSV, khớp shop, chống trùng | Tính tiền (`commission-calculation`) |
| `commission-calculation` | Engine tính tiền cho một dòng CSV | Hiển thị Conversion (`conversion-ledger`) |
| `conversion-ledger` | Sổ hoa hồng | |
| `invoice-payout` | Balance và yêu cầu rút tiền | CSV Payout (`payout-import`) |
| `payment-method` | Phương thức nhận tiền | |
| `admin-console` | Trang chủ admin, Embedded Version, console command | |
~~~~~

## Phụ lục C-2 — mục 2 cũ

~~~~~text
## 2. Object và feature

Từ khoá sang object: `_registry.json`. Trạng thái, oracle: `manifest.json`. Vào đâu, cần fixture nào: `_flows/feature-entry.md`.

| Object | Phạm vi | Không thuộc | Feature |
|---|---|---|---|
| `affiliate-account` | Vòng đời tài khoản affiliate | Thông tin nhận tiền (`payment-method`) | `affiliate-signup` `email-verification-and-auto-approval` `affiliate-login-access-control` `admin-affiliate-review` `affiliate-dashboard-overview` `affiliate-profile-maintenance` `affiliate-email-notifications` `new-affiliate-bonus` |
| `affiliate-level` | Bậc theo số shop trả phí, VIP | Rate card (`commission-rate-card`) | `level-definition-management` `level-progression` `vip-level-override` |
| `program` | App được quảng bá | % hoa hồng (`commission-rate-card`) | `program-launch` `program-catalog-for-affiliates` |
| `commission-rate-card` | % và cap theo Program × Level | Tính tiền từng dòng (`commission-calculation`) | `rate-card-configuration` `usage-commission-enablement` |
| `referral-attribution` | Gắn shop với đúng affiliate | Endpoint và auth (`integration-api`) | `tracking-link-generation` `click-to-install-attribution` `tracking-information-log` |
| `customer-shop` | Shop được giới thiệu và vòng đời | | `customer-shop-registry` `customer-lifecycle-state` |
| `integration-api` | 5 endpoint cho client app | | `api-key-authentication` `customer-provisioning-api` `customer-event-reporting-api` |
| `payout-import` | Upload CSV, khớp shop, chống trùng | Tính tiền (`commission-calculation`) | `payout-csv-upload` `charge-type-classification` `customer-matching-and-dedup` `populate-reconcile-late-data` |
| `commission-calculation` | Engine tính tiền cho một dòng CSV | Hiển thị Conversion (`conversion-ledger`) | `commission-decision-flow` `first-month-commission` `recurring-commission` `refund-and-downgrade-adjustment` `usage-charge-commission` |
| `conversion-ledger` | Sổ hoa hồng | | `admin-conversion-review` `affiliate-conversion-view` `custom-conversion-entry` |
| `invoice-payout` | Balance và yêu cầu rút tiền | CSV Payout (`payout-import`) | `balance-accrual` `payout-request-eligibility` `payout-request-submission` `payout-request-cancellation` `admin-invoice-processing` |
| `payment-method` | Phương thức nhận tiền | | `affiliate-payment-info-setup` `payment-method-catalog` |
| `admin-console` | Trang chủ admin, Embedded Version, console command | | `admin-home-dashboard` `embedded-version-cache-bust` `data-maintenance-commands` |
~~~~~
