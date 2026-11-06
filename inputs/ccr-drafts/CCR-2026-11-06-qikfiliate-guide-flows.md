# Context Change Request: Đưa guide qikfiliate về khuôn mới, tách flow và biến env

- **Product:** `qikfiliate`
- **Object:** tất cả, thay đổi mức product
- **Ticket:** `không có`
- **Các khối có trong file:** `C`

## Mức độ gấp

`LOW` — dọn canon, không chặn test.

# Khối C — Guide, flow

Không đổi KB, checklist hay rule nào. Nội dung đầy đủ của từng file nằm ở phụ lục cùng số ngay dưới bảng.

| File | Hành động | Nội dung | Lý do |
|---|---|---|---|
| `_product-guide.md` | Thay toàn bộ file | Phụ lục C-1 | Guide 31 KB khuôn cũ vượt giới hạn 10 KB của contract §5c; đưa về `contracts/templates/product-guide.template.md`. Bản cũ: qa-knowledge `820e334` |
| `_env.example` | Thêm file mới | Phụ lục C-2 | Danh sách biến env tách khỏi guide, chỉ có tên biến (contract §5b) |
| `_flows/README.md` | Thêm file mới | Phụ lục C-3 | Index flow |
| `_flows/login-account.md` | Thêm file mới | Phụ lục C-4 | Chuyển từ guide cũ mục 2 |
| `_flows/routes-api.md` | Thêm file mới | Phụ lục C-5 | Chuyển từ guide cũ mục 1, 3, 6 |
| `_flows/test-data.md` | Thêm file mới | Phụ lục C-6 | Chuyển từ guide cũ mục 8 |
| `_flows/feature-entry.md` | Thêm file mới | Phụ lục C-7 | Chuyển từ guide cũ mục 9 |
| `_flows/troubleshooting.md` | Thêm file mới | Phụ lục C-8 | Chuyển từ guide cũ mục 7 |
| `_flows/qa-rules.md` | Thêm file mới | Phụ lục C-9 | Chuyển từ guide cũ mục 10 |

## Phụ lục C-1 — `_product-guide.md`

~~~~~text
# Product guide — qikfiliate

Bản đồ của product: có gì, ở đâu, test được không. Mọi bước đều đọc file này.

- Đúng phải là gì: `<object>/features/<feature>/kb.json`, `checklists/`.
- Làm thế nào: `_flows/`, đọc `_flows/README.md` rồi đúng file theo chủ đề.
- Biến env: `_env.example`.

Không dùng guide làm expected result. Không ghi giá trị credential, id, tên store.

Nhãn nguồn: `[RG]` regression staging 2026-10-22, sau upgrade · `[TC]` test case trước upgrade · `[DOC]` chỉ có trong tài liệu dev 2026-08-20 · `[?]` chưa biết, gặp thì báo operator.

> **KB v1 cũ hơn hệ thống:** viết trước đợt upgrade Laravel và đổi URL, admin nay chạy Filament. Lệch về **giao diện** là KB cũ, không phải bug. Lệch về **hành vi tiền** thì ghi evidence và hỏi PO.

## 1. Product

Hệ thống affiliate dùng chung của Qikify. Một KB cho nhiều brand: item có `scope.brand` khác `null` chỉ đúng cho brand đó. Luồng chính:

1. Affiliate lấy link giới thiệu ở Dashboard (Vue SPA).
2. Client app báo qua Integration API, server-to-server, không có UI: `tracking-id` khi click, `customers` khi cài, `customer-events` cho vòng đời shop. API không mang số tiền.
3. Admin upload CSV Payout của Shopify ở Admin panel (Filament `[RG]`), hệ thống tính hoa hồng từng dòng theo Level × Program, sinh Conversion, `balance` tăng.
4. Affiliate bấm Request Payment, tạo Invoice `pending`.
5. Admin chuyển tiền ngoài hệ thống rồi đổi status Invoice.

| Thuật ngữ | Nghĩa | Hay nhầm với |
|---|---|---|
| User | Affiliate | Merchant, khách cuối |
| Customer | **Shop** Shopify được giới thiệu, theo cặp shop × app | Khách cuối của shop |
| `slug` (Program) | Khoá khớp `app_slug` trong CSV | `ref_slug` của link giới thiệu |
| `ref` | Slug link riêng của affiliate | `tracking_id` |
| Payout | Shopify → Ownego, đầu vào | Invoice |
| Invoice | Ownego → affiliate, đầu ra | Payout |
| Conversion | Một dòng hoa hồng: `first`, `recurring`, `usage`, `custom` | Chuyển đổi marketing |
| `partner_share` | Tiền Ownego nhận cho một dòng charge, gốc để nhân % | `amount` |
| `amount` | Hoa hồng sau % và cap | `partner_share` |

Định nghĩa đầy đủ: `_product-kb.json`.

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

## 3. Môi trường

Host khác `KOIN_DASHBOARD_URL` thì dừng và hỏi operator. Host production `[?]`. Production là stop condition cho mọi thao tác ghi.

| Biến | Đặc điểm | Dùng cho | Không dùng cho |
|---|---|---|---|
| `KOIN_DASHBOARD_URL` | Dashboard staging, instance Koin/Mysbox `[RG]` | Mọi test Dashboard | Kết luận cho brand khác |
| `KOIN_DASHBOARD_OLD_URL` | URL cũ | Kiểm redirect | |
| `KOIN_AFF_APPROVED_*` | Đã verify, approved, có data | Xem hiển thị | Test invoice (làm mất balance) |
| `KOIN_AFF_UNVERIFIED_*` | Chưa verify email | Chặn login | |
| `KOIN_AFF_DISAPPROVED_*` | Bị từ chối, có thể chưa verify | | Test disapprove khi chưa xác nhận đã verify |
| `KOIN_AFF_WITH_BALANCE_*` | Có balance | Request Payment | |
| `KOIN_AFF_MAIN_*` | Email chính | Happy case signup | |
| `KOIN_SIGNUP_BASE_EMAIL` | Plus-addressing | Affiliate mới, đọc mail | |
| `KOIN_ALLOW_CREATE_INVOICE` | `yes`/`no` | `no` thì case tạo Invoice là `BLOCKED` | |

Chưa có biến: credential admin, `X-API-Key`, host admin, host Integration API. Không có storefront, DB access, OpenAPI.

## 4. Test được gì

**Nhãn test case:** không test được cả case là `env-blocked`: Testlane `skipped` kèm lý do, verdict `NOT_APPLICABLE`. Không test được một vế: giữ case, ghi "vế X: skip — <lý do>", kết luận theo các vế còn lại.

Chưa feature nào có `environment_differences`: cột `type` để `—` tới khi có khối B.

| Hạng mục | Feature | `type` | Mức | Cách xử lý |
|---|---|---|---|---|
| Hết hạn tracking | `referral-attribution/click-to-install-attribution` | — | Vế | Không tua được giờ, skip vế này |
| Console command | `admin-console/data-maintenance-commands` | — | Case | Cần dev chạy, không thì `NOT_COVERED` |
| Check `layer: db` | Nhiều feature | — | Vế | Quan sát qua Admin, Activities, `GET /api/user`; không có thì `NOT_COVERED` |
| Integration API | `integration-api/*`, fixture F3 | — | Case | Chưa có key và host, hỏi operator |

**Cần người hỗ trợ:** agent không tự login admin, QA bàn giao session hoặc tự làm phần admin. Mail không về, CSV mẫu: `_flows/troubleshooting.md`, `_flows/test-data.md`.

## 5. Bẫy làm sai kết luận

| Dấu hiệu | Cách hiểu |
|---|---|
| Check nhắc nút Approve, Custom Conversion, menu Upload | UI admin cũ, đối chiếu `_flows/routes-api.md` |
| KB nói mọi admin có quyền như nhau, staging có Roles | Phân quyền thực tế `[?]`, không kết luận |
| Modal Request Payment không có ô nhập số tiền | Luôn rút toàn bộ `[RG]`, khác KB. Hỏi PO, chưa kết luận |
| `usage_maximum_amount` hiện "$0" | `0` là không giới hạn `[RG]` |
| Login account disapproved báo "not verified" | Account chưa verify, không phải lỗi login. Dùng F8 |
| Upload lại cùng file báo "0 created" | Chống trùng, không phải lỗi `[DOC]` |
| Banner upload không báo dòng lỗi | Dòng lỗi bị bỏ âm thầm `[DOC]`, tự đối chiếu số dòng |

## 6. Mutation guard

Staging dùng chung. Production chỉ đọc, và chỉ khi operator giao đúng việc đó.

**Được phép:** tạo affiliate, Program, shop tiền tố `QA-`/`qa-` · upload CSV chỉ chứa shop `QA-` · New conversion, VIP, disapprove, Invoice trên affiliate `QA-` (Invoice cần `KOIN_ALLOW_CREATE_INVOICE=yes`) · gọi Integration API với shop `qa-…`.

**Cấm:**

- Sửa, xoá Program, rate card, Payment Method, affiliate, shop không phải của mình. Chỉ dùng account trong env và account `QA-` tự tạo.
- Xoá hoặc tạo lại Payment Method PayPal, Payoneer: frontend hardcode id. Muốn test thì tạo method `QA-`.
- Tạo, sửa Level khi chưa được phép: thiếu rate card cho Level mới làm lỗi import của Program khác.
- Upload file Payout thật. Gửi tiền thật. Dùng thông tin thanh toán thật.
- Chạy console command, sửa DB.
- Dùng Embedded Version khi người khác đang test: nó ép mọi affiliate tải lại.

**Tác dụng phụ:** signup, verify, tạo Invoice bắn Slack kênh `affiliate` `[DOC]`, có vào kênh thật không `[?]`: hỏi operator trước khi chạy hàng loạt · `affiliate-account`, `invoice-payout` gửi email Brevo: chỉ dùng alias của `KOIN_SIGNUP_BASE_EMAIL` · Register bằng API bỏ qua blocklist `ref` `[RG]`: gọi thử là tạo tài khoản rác thật.

**Cleanup:** ghi id mọi thứ đã tạo và `balance` trước/sau. Action ngoài danh sách được phép và không có đường cleanup thì dừng, báo operator.

**Evidence phải che:** JWT, `X-API-Key`, password, `payment_info`, `payment_details`, email. Staging bật `APP_DEBUG`: cắt trace và đường dẫn server. Không lưu HTML form Edit affiliate: có password hash.
~~~~~

## Phụ lục C-2 — `_env.example`

~~~~~text
# Biến env của người test qikfiliate, instance Koin/Mysbox. Chép thành .env.koin rồi điền giá trị, không commit.
# File này chỉ có tên biến. Dùng biến nào cho việc gì: _product-guide.md mục 3.
# Chưa có biến cho: credential admin, X-API-Key, host admin, host Integration API.

# Host
KOIN_DASHBOARD_URL=
# URL cũ, để kiểm redirect. Không biết thì để trống
KOIN_DASHBOARD_OLD_URL=

# Affiliate đã verify, approved, có data
KOIN_AFF_APPROVED_EMAIL=
KOIN_AFF_APPROVED_PASSWORD=

# Affiliate chưa verify email
KOIN_AFF_UNVERIFIED_EMAIL=
KOIN_AFF_UNVERIFIED_PASSWORD=

# Affiliate bị từ chối
KOIN_AFF_DISAPPROVED_EMAIL=
KOIN_AFF_DISAPPROVED_PASSWORD=

# Affiliate có balance để test Request Payment. Trống thì dùng account approved
KOIN_AFF_WITH_BALANCE_EMAIL=
KOIN_AFF_WITH_BALANCE_PASSWORD=

# Đăng ký bằng email chính, happy case signup
KOIN_AFF_MAIN_EMAIL=
KOIN_AFF_MAIN_PASSWORD=

# Email gốc cho plus-addressing. Phải mở được hộp thư này
KOIN_SIGNUP_BASE_EMAIL=

# yes/no: có được tạo Invoice trên staging không
KOIN_ALLOW_CREATE_INVOICE=
~~~~~

## Phụ lục C-3 — `_flows/README.md`

~~~~~text
# Sổ tay flow staging qikfiliate — index

Cách thao tác đã biết trên `KOIN_DASHBOARD_URL` và admin. Đọc file này trước, rồi mở đúng file theo việc cần làm. Nhãn `[RG]`, `[TC]`, `[DOC]`, `[?]`: guide, đầu file.

## Danh sách file

| File | Đọc khi |
|---|---|
| `login-account.md` | Login Dashboard, phiên JWT, bàn giao session admin, xác minh account |
| `routes-api.md` | Route Dashboard, menu admin và đối chiếu với KB, request hay dùng |
| `test-data.md` | Fixture F0–F8 |
| `feature-entry.md` | Một feature vào đâu, làm gì, cần fixture nào |
| `troubleshooting.md` | Gặp block: dấu hiệu, cách xử lý, cách xác minh |
| `qa-rules.md` | Trình tự test một feature, cách kết luận từng check |

## Cạm bẫy chung

- Xác minh account trước khi tạo data, và sau mỗi lần login lại: `login-account.md`.
- Request API phải có `Accept: application/json`.
- Ô status Invoice ở admin không validate: gõ chính xác.
- Upload CSV xong phải tự đối chiếu số dòng với số Conversion.
- Data lạ có sẵn trên staging có thể là rác từ đợt test trước: không dùng làm mẫu, đọc lại số trước khi dùng.
- Conversion cũ không đổi sau khi sửa rate card, Level, VIP `[DOC]`: test bằng dòng CSV mới.
~~~~~

## Phụ lục C-4 — `_flows/login-account.md`

~~~~~text
# Login, phiên, xác minh account

## Dashboard

- `POST /api/login` trả JWT `access_token`, kèm `expires_in`. `POST /api/refresh` cấp token mới.
- Mọi request phải có `Accept: application/json`, thiếu thì bị 302 về `#/login` `[RG]`.
- Email phân biệt hoa thường khi login `[RG]`: copy đúng giá trị trong env.
- Selector ngôn ngữ chỉ có ở trang login `[RG]`.

## Admin

Agent không tự login. QA đăng nhập trong profile browser riêng rồi bàn giao session, hoặc tự làm phần admin theo hướng dẫn `[RG]`.

## Xác minh account

Bước đầu tiên, và sau mỗi lần login lại:

1. Host đang mở đúng `KOIN_DASHBOARD_URL`.
2. `GET /api/user` trả `data.email` đúng biến env của account đang dùng `[RG]`. Sai thì dừng, `BLOCKED`.
3. Với admin: tài khoản ở Profile đúng tài khoản QA bàn giao.
~~~~~

## Phụ lục C-5 — `_flows/routes-api.md`

~~~~~text
# Route, menu admin, request

## Route Dashboard `[RG]`

`#/login`, `#/signup`, `#/verification`, `#/verified`, `#/resend-verification`, `#/forgot-password`, `#/dashboard`, `#/links`, `#/conversions`, `#/customers`, `#/invoices`, `#/account`. Nav Resources mở Google Drive.

## Menu admin `[RG]`

Profile, Embedded Version, Admin Users, Roles, Activities, Upload Payouts, Conversions, Customer Events, Customers, Tracking Informations, Affiliate Users, Invoices, Payment Methods, Levels, Program Commissions, Programs.

Check mô tả UI cũ thì đối chiếu bảng này rồi test mục tiêu của check trên UI mới:

| KB nói | Trên staging |
|---|---|
| Nút "Approve" trên danh sách | Approve qua form Edit |
| Disapprove qua form Edit | Có thêm row action "Disapproved" và "Disapproved and send notification" |
| Màn Custom Conversion, nút "Add Custom Conversion" | "New conversion" ở Conversions |
| Upload ở menu Conversion | Màn riêng Upload Payouts |
| Màn Populate/reconcile | Không thấy |
| Switch `visible` sửa nhanh trên danh sách | Không còn sửa nhanh trên danh sách |
| Không có audit log | Activities ghi lại thay đổi, kể cả do hệ thống |

## API Dashboard

JWT Bearer, base `<KOIN_DASHBOARD_URL>/api`, `[RG]`:

| Method + path | Việc |
|---|---|
| `POST /api/register` | Đăng ký |
| `POST /api/login`, `/api/refresh`, `/api/logout` | Phiên đăng nhập |
| `POST /api/email/resend`, `POST /api/password/email` | Gửi lại xác thực, quên mật khẩu |
| `GET /email/verify/{id}/{hash}?expires&signature` | Link xác thực, redirect về `/` |
| `GET /api/user` | Thông tin affiliate: `balance`, `can_create_invoice`, `bonus_at`, `payment_method`, `payment_details` |
| `GET /api/payment-methods`, `PUT /api/user/payment-method` | Danh sách theo country, lưu thông tin nhận tiền |
| `POST /api/invoices`, `PUT /api/invoices/{code}` | Tạo, huỷ yêu cầu thanh toán. `{code}` là mã invoice, không phải id số |

API list phân trang có `meta.total`.

## Integration API

Header `X-API-Key`, tất cả `[DOC]`, host `[?]`. Payload mẫu: `test-data.md` F3.

| Method + path | Việc |
|---|---|
| `POST /api/tracking-id` | Ghi một lượt click |
| `POST /api/customers` | Tạo shop, tiêu thụ `tracking_id` |
| `DELETE /api/customers` | Soft-delete shop |
| `PUT /api/trashed-customers` | Khôi phục shop |
| `POST /api/customer-events` | Ghi sự kiện vòng đời |

Console command, chỉ dev chạy trên server `[DOC]`: `user-level:update`, `conversion-type:update`, `charge_creation_time:fill`.
~~~~~

## Phụ lục C-6 — `_flows/test-data.md`

~~~~~text
# Dựng test data

Dựng theo thứ tự phụ thuộc. Giá trị cụ thể (ngưỡng, %, số ngày) lấy từ KB. Ghi lại id từng thứ đã tạo.

```
F1 affiliate ──┐
F2 Program ────┴─► F3 shop ─► F4 CSV ─► balance ─► F6 đủ điều kiện rút ─► F7 invoice
                                         ▲
                           F5 New conversion (đường tắt)
```

## F0 — Login và xác minh

Làm theo `login-account.md`. Không bỏ qua.

## F1 — Affiliate mới

1. Mở `#/signup`, điền `name`, alias `+qa-<run>-NN` của `KOIN_SIGNUP_BASE_EMAIL`, password, `ref` dạng `qa-<run>-<n>`. Với `ref`, kiểm tra trước blocklist trong KB của `affiliate-signup`. Thành công chuyển sang `#/verification`.
2. Mở mail, click link. Admin → Activities xác nhận status đổi cùng lúc với verify.
3. Login, xác minh `GET /api/user`.

## F2 — Program và rate card

1. Admin → Programs: `name` `QA-<run>`, `slug` `qa-<run>`.
2. Admin → Program Commissions: tạo một dòng cho mỗi Level đang có. Thiếu dòng sẽ làm lỗi import.
3. Muốn test usage: bật `handle_usage_charge` và điền 2 field kèm theo.

## F3 — Shop được giới thiệu

Cần `X-API-Key`, chưa có thì hỏi operator. Admin → Customers có tạo tay được không `[?]`.

```http
POST /api/tracking-id
X-API-Key: <key>
{ "ref": "<ref của F1>", "source_url": "https://example.com/qa" }

POST /api/customers
X-API-Key: <key>
{ "tracking_id": "<từ bước trên>", "related_id": "qa-<run>-1.myshopify.com",
  "name": "qa-<run>-1.myshopify.com", "email": "<alias test>", "program_slug": "qa-<run>" }

POST /api/customer-events
X-API-Key: <key>
{ "customer_related_id": "qa-<run>-1.myshopify.com", "program_slug": "qa-<run>", "name": "installed" }
```

Xác minh ở Admin → Customers và Dashboard → Customers. Đặt cả `name` và `related_id` là domain: tài liệu lệch nhau về trường nào dùng để khớp CSV.

## F4 — CSV Payout tối thiểu

Tự viết file, không dùng file thật. Upload ở Admin → Upload Payouts `[RG]`. Header đầy đủ chưa được ghi lại `[?]`: lần đầu xin QA file đã upload thành công làm mẫu, rồi gửi khối C để bổ sung vào đây.

| Cột | Giá trị |
|---|---|
| `Shop` | domain của F3 |
| `app_slug` | slug của F2 |
| `Charge Type` | `App sale – 30-day subscription`, `App sale – usage`, `App refund`, `App downgrade`. Dấu là en dash |
| `Charge ID` | chuỗi bất kỳ; để trống với downgrade |
| `Charge Creation Time` | timestamp; thiếu cột là file bị từ chối |
| `Partner Share` | số; âm với refund, downgrade |
| kỳ payout và payout date | tên cột chính xác `[?]` |

Đối chiếu banner với số dòng sau khi upload.

## F5 — Có balance nhanh

Admin → Conversions → New conversion → chọn affiliate, shop, `amount`, `reason` `[RG]`. Không dùng khi test Level hoặc first-month, vì `custom` không tham gia các cơ chế đó.

## F6 — Affiliate đủ điều kiện rút

Điền Payment Info ở Account bằng dữ liệu giả. `GET /api/user` → `can_create_invoice` cho biết kết quả.

- Đường nhanh: bật `is_vip`, đặt `level` trùng một `level_index` đang có, rồi F5.
- Đường không VIP: đủ số shop và balance theo KB của `payout-request-eligibility`. Cách đếm shop còn là `OQ-invoice-payout-003`, nên dùng shop có conversion `first`/`recurring` qua F3 + F4 để đúng theo cả hai cách hiểu.

## F7 — Invoice ở từng trạng thái

Cần `KOIN_ALLOW_CREATE_INVOICE=yes`. Dùng affiliate `QA-` riêng, không dùng account approved chung.

- `pending`: Dashboard → Request Payment → Send Request.
- `cancel`: Dashboard → icon thùng rác → Cancel Request, khi còn pending.
- `approved`, `completed`: Admin → Invoices → gõ status → Save.
- Request Payment rút toàn bộ balance, nên nạp lại bằng F5 cho invoice tiếp theo.

## F8 — Trạng thái đặc biệt của affiliate

- Disapprove: Admin → Affiliate Users → row action, hoặc Edit `status` + `disapproved_reason`. Account phải đã verify, nếu không login sẽ báo lý do khác.
- Approve lại: form Edit.
- Chưa verify: dừng F1 trước bước click link.

## Cleanup balance

Khôi phục balance chỉ bằng New conversion ghi rõ lý do; nó thêm một dòng vào lịch sử. Xoá Conversion có hoàn balance không `[?]`: kiểm lại sau khi xoá.
~~~~~

## Phụ lục C-7 — `_flows/feature-entry.md`

~~~~~text
# Feature vào đâu, cần fixture nào

Cột Fixture trỏ tới `test-data.md`. Expected result và check: `<object>/checklists/<feature>.json`.

| Object | Feature | Vào đâu, làm gì | Fixture |
|---|---|---|---|
| affiliate-account | `affiliate-signup` | `#/signup`, thử field và `ref`; thử cả UI lẫn API | — |
| | `email-verification-and-auto-approval` | Click link trong email, `#/resend-verification` | F1 |
| | `affiliate-login-access-control` | Login ở từng trạng thái tài khoản | F1, F8 |
| | `admin-affiliate-review` | Admin → Affiliate Users: row action, Edit | F1, F8 |
| | `affiliate-dashboard-overview` | `#/dashboard`: bảng shop, khối Payout, banner bonus | F1 |
| | `affiliate-profile-maintenance` | `#/account`. Admin → Affiliate Users → Edit | F1 |
| | `affiliate-email-notifications` | Kích hoạt từng sự kiện, đọc hộp thư | F1, F7, F8 |
| | `new-affiliate-bonus` | Banner Dashboard, `bonus_at`. Staging có cấu hình không `[?]` | F1, F3, F4 |
| affiliate-level | `level-definition-management` | Admin → Levels. Chỉ đọc nếu chưa được phép (guide mục 6) | — |
| | `level-progression` | Tăng shop trả phí qua CSV, xem Level | F3, F4 |
| | `vip-level-override` | Affiliate Users → Edit `is_vip`, `level`, rồi upload CSV | F3, F4 |
| program | `program-launch` | Admin → Programs, rồi rate card | F2 |
| | `program-catalog-for-affiliates` | `#/links`, sort, `visible` | F2 |
| commission-rate-card | `rate-card-configuration` | Admin → Program Commissions | F2 |
| | `usage-commission-enablement` | Form rate card, switch usage | F2 |
| referral-attribution | `tracking-link-generation` | `#/links` → Get Link | F1, F2 |
| | `click-to-install-attribution` | Gọi `tracking-id` rồi `customers`. Không tua được giờ để test hết hạn | F3 |
| | `tracking-information-log` | Admin → Tracking Informations, chỉ xem | F3 |
| customer-shop | `customer-shop-registry` | Admin → Customers: list, Show, Skip First Month, Restore | F3 |
| | `customer-lifecycle-state` | Gửi event, xem Customer Events và `#/customers` | F3 |
| integration-api | `api-key-authentication` | Gọi không key, sai key, đúng key | — |
| | `customer-provisioning-api` | `customers`, `DELETE`, `trashed-customers` | F3 |
| | `customer-event-reporting-api` | `customer-events` với event đúng và sai | F3 |
| payout-import | `payout-csv-upload` | Upload Payouts: file đúng, thiếu cột, thiếu giá trị | F3, F4 |
| | `charge-type-classification` | Một file với đủ loại `Charge Type` | F3, F4 |
| | `customer-matching-and-dedup` | Upload lại cùng file, dòng không khớp shop | F3, F4 |
| | `populate-reconcile-late-data` | Trước hết tìm xem màn này còn không; không có thì ghi `NOT_COVERED` và báo | F3, F4 |
| commission-calculation | `commission-decision-flow` | Upload rồi đọc Conversions | F2, F3, F4 |
| | `first-month-commission` | Chuỗi charge theo ngày lịch, kể cả ranh giới | F2, F3, F4 |
| | `recurring-commission` | Charge sau tháng đầu, có và không cap | F2, F3, F4 |
| | `refund-and-downgrade-adjustment` | Dòng âm sau dòng dương | F2, F3, F4 |
| | `usage-charge-commission` | Nhiều dòng usage, nhiều kỳ, để chạm cap | F2, F3, F4 |
| conversion-ledger | `admin-conversion-review` | Admin → Conversions | F4 |
| | `affiliate-conversion-view` | `#/conversions`. Kiểm ngày ở 2 timezone | F4 |
| | `custom-conversion-entry` | Admin → Conversions → New conversion | F5 |
| invoice-payout | `balance-accrual` | So `balance` trước/sau từng sự kiện | F4 hoặc F5 |
| | `payout-request-eligibility` | Khối Payout ở từng tổ hợp điều kiện; `can_create_invoice`; gọi thẳng API | F6 |
| | `payout-request-submission` | Request Payment | F6 |
| | `payout-request-cancellation` | `#/invoices` → huỷ | F7 |
| | `admin-invoice-processing` | Admin → Invoices. Kiểm chuyển status và snapshot | F7 |
| payment-method | `affiliate-payment-info-setup` | `#/account` → Payout Information. Full reload sau khi đổi Country | F1 |
| | `payment-method-catalog` | Admin → Payment Methods. Tạo method `QA-`, không đụng PayPal, Payoneer | — |
| admin-console | `admin-home-dashboard` | Trang đầu admin | — |
| | `embedded-version-cache-bust` | Admin → Embedded Version (guide mục 6) | — |
| | `data-maintenance-commands` | Cần dev chạy; không thì `NOT_COVERED` | — |
~~~~~

## Phụ lục C-8 — `_flows/troubleshooting.md`

~~~~~text
# Gỡ block khi vận hành

Tra theo dấu hiệu, làm theo cách xử lý, rồi xác minh. Cách xử lý chỉ áp cho bước setup, không áp cho luồng đang kiểm thử, và không bao giờ là tiêu chí Pass.

## Mail không về
- Dấu hiệu: không thấy mail verify; Dashboard có banner báo email platform lỗi `[RG]`.
- Cách xử lý: nhờ dev sinh link.
- Cách xác minh: Admin → Activities thấy status đổi.

## API bị 302 về `#/login`
- Dấu hiệu: request trả 302 thay vì JSON.
- Cách xử lý: thêm `Accept: application/json` `[RG]`.
- Cách xác minh: `GET /api/user` trả JSON.

## Bị chặn ở trang login
- Dấu hiệu: permission classifier chặn thao tác.
- Cách xử lý: không thử vòng, trả `BLOCKED` để operator xử lý.

## Không thấy payment method sau khi đổi Country
- Dấu hiệu: danh sách vẫn như cũ `[TC]`.
- Cách xử lý: full reload, danh sách bị cache trong SPA.
- Cách xác minh: danh sách theo Country mới hiện ra.

## Sửa Balance ở admin không có tác dụng
- Dấu hiệu: báo "Saved" nhưng số không đổi `[RG]`.
- Cách xử lý: dùng New conversion ghi rõ lý do, không dùng field Balance.
- Cách xác minh: `GET /api/user` trả `balance` mới.

## Import báo lỗi sau khi thêm Program hoặc Level
- Dấu hiệu: dòng CSV không ra Conversion.
- Cách xử lý: kiểm Program Commissions có đủ dòng cho mọi Level.
- Cách xác minh: upload file `QA-` mới ra đúng số Conversion.

## Không có Conversion cho dòng usage
- Dấu hiệu: upload xong dòng `App sale – usage` không ra Conversion.
- Cách xử lý: kiểm rate card, `handle_usage_charge` có thể đang tắt `[DOC]`.
- Cách xác minh: bật ở rate card `QA-`, upload file mới.

## Không tìm thấy `tracking_id` đã dùng
- Dấu hiệu: tìm ở Tracking Informations không ra.
- Cách xử lý: không phải block, `tracking_id` bị xoá sau khi tạo shop `[DOC]`. Xác minh qua Customers.

## Thiếu `X-API-Key` hoặc session admin
- Dấu hiệu: không có giá trị trong env, không có session.
- Cách xử lý: hỏi operator. Không có thì case phụ thuộc là `BLOCKED`.
~~~~~

## Phụ lục C-9 — `_flows/qa-rules.md`

~~~~~text
# Trình tự test và cách kết luận

## Trình tự cho một feature

1. Chọn feature: từ khoá sang `object_key` qua `_registry.json`, trạng thái qua `manifest.json`.
2. Đọc `<object>/feature-summary.md` → `features/<feature>/profile.json` → `checklists/<feature>.json` → `open-questions.md` lọc theo feature → guide mục 5.
3. Dựng data theo `feature-entry.md`, sau khi xác minh account.
4. Chạy từng check: `precondition` → `steps` → `observation_point` → so `expected_result`.
5. Ghi evidence: instance, tên biến account (không ghi email), id data, thời điểm, screenshot hoặc response đã che.
6. Dọn data theo guide mục 6.

## Kết luận mỗi check

| Tình huống | Kết luận |
|---|---|
| `status: READY`, khớp `expected_result` | `PASS` |
| `status: READY`, oracle `STRONG`, lệch, `confirmation_source.type` là `spec_doc` / `po_dev_confirm` / `test_case` | `FAIL` |
| `status: READY`, lệch, nguồn chỉ `dev_doc` | `SUSPECTED_FAIL`: ghi đủ evidence, đối chiếu PO/spec rồi mới chốt bug, kể cả khi manifest ghi `usable_as_oracle: true` |
| Check mô tả UI admin cũ (`routes-api.md`) | `OUTDATED_CHECK`: test lại mục tiêu của check trên UI mới, ghi cả hai |
| `status: NEEDS_CONFIRMATION`, oracle `NONE`, hoặc item `CONFLICTED` / `UNRESOLVED` | Chỉ ghi `OBSERVED: <hành vi thật>`, không kết luận |
| Item có `scope.brand` khác brand đang test | `NOT_APPLICABLE` |
| `environment_differences` có `NOT_TESTABLE` | `NOT_APPLICABLE` trên môi trường đó |
| Không quan sát được, thiếu quyền, thiếu data | `NOT_COVERED` hoặc `BLOCKED`, nêu rõ thiếu gì |

## Đừng hiểu sai checklist

- `applicability.environment: documented` chỉ nói nguồn là tài liệu, không có nghĩa là không chạy được trên staging.
- `steps` có thể nói theo hàm code, như `canCreateByUser`: quan sát qua UI hoặc API tương ứng.

## Sau khi test

- Hành vi thật khác knowledge, hoặc đã xác nhận một Open Question: gửi CCR (`consumer-guide.md` §5).
- Bug thật: báo trên Testlane. Không tự tạo hay comment Jira, không nhắn kênh ngoài khi operator chưa đồng ý.
- Guide hoặc flow sai, hoặc gặp `[?]` đã có đáp án: gửi CCR khối C.
~~~~~
