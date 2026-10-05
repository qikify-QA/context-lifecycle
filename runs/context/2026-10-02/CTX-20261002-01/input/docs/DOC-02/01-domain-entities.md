# Domain Entities

> Xác nhận trực tiếp từ model + migration source (không lấy từ tài liệu cũ). Xem [00-overview.md](00-overview.md) để hiểu vai trò từng entity trong bức tranh lớn.

## Entity relationship (tóm tắt)

```
Program 1───N Customer N───1 User (affiliate)
Program 1───N ProgramCommission N───1 Level
User    1───N Customer
User    1───N TrackingInformation
User    1───N Invoice
User    N───1 PaymentMethod
Customer 1───N Conversion
Customer 1───N CustomerEvent
```

## Worked example — theo dõi 1 câu chuyện thật xuyên suốt các entity

Trước khi đi vào từng bảng field, hãy hình dung 1 kịch bản cụ thể để thấy các entity liên kết với nhau thế nào trong thực tế:

> Affiliate **Jane** (`User#42`, `ref = "jane-partner"`) đăng ký tài khoản, được xếp **Level 1** (`min_paid_customers = 0`). Jane quảng bá app **"B2B Manager"** (`Program#7`, `slug = "b2b-manager"`). Cửa hàng **"Cool Gadgets"** (`Customer#301`, `related_id = "cool-gadgets.myshopify.com"`) click link giới thiệu của Jane rồi cài app — hệ thống ghi nhận `Customer#301.user_id = 42`, `Customer#301.program_id = 7`.
>
> Tháng đầu tiên, Shopify báo charge $100 cho "Cool Gadgets" → admin upload CSV Payout → hệ thống tạo `Conversion#5001` (`customer_id = 301`, `partner_share = 100`, `type = "first"`, tra `ProgramCommission` của `(Program#7, Level 1)` có `first_month_percentage = 20%` → `amount = 20`). Jane nhận ngay **$20**, `User#42.balance` tăng từ $0 lên $20.
>
> Tháng 2, Shopify báo tiếp charge $100 → tạo `Conversion#5002` (`type = "recurring"`, `percentage` gốc `10%`, `maximum_amount` cap $8 → dù `10% × 100 = 10` nhưng bị cắt còn **$8**). Balance Jane lên $28.
>
> "Cool Gadgets" là customer trả phí thứ nhất của Jane → `User#42.hasSubscriptionConversionsCustomers()` đếm được 1. Nếu Jane có thêm 3 shop trả phí nữa để đạt `Level 2` (`min_paid_customers = 4`), `calculateLevel()` sẽ tự nâng level cho các đợt payout tiếp theo — nhưng `Conversion#5001`/`#5002` đã lưu **giữ nguyên** rate cũ, không tính lại.
>
> Khi balance đủ điều kiện (xem [07-invoicing-payments/](07-invoicing-payments/00-overview-and-balance-mechanics.md)), Jane bấm "Request Payment" → tạo `Invoice#88` (`user_id = 42`, `amount = 28`, `status = "pending"`) → balance Jane về $0 ngay lập tức. Admin xử lý xong, chuyển `Invoice#88.status = "completed"`.

Ví dụ này sẽ được dùng lại (mở rộng thêm số liệu) ở các file chuyên sâu khác trong bộ KB — nếu thấy số ID/tên trùng lặp giữa các file, đó là cùng 1 câu chuyện, không phải trùng lặp ngẫu nhiên.

## Program

App Shopify đang được quảng bá qua chương trình affiliate. `app/Program.php`.

| Field | Ý nghĩa |
|---|---|
| `name`, `name_in_store` | Tên hiển thị / tên trên Shopify App Store |
| `slug` | Dùng để khớp `app_slug` trong file CSV Payout của Shopify — **khoá join quan trọng nhất** khi import |
| `ref_slug` / `ref_url` | Sinh link giới thiệu; nếu `ref_url` có sẵn trong DB thì dùng thẳng, ngược lại ghép `config('app.affiliate_url') . '/' . ref_slug` |
| `image`, `app_store_url`, `description` | Thông tin hiển thị trên trang danh sách app để affiliate chọn quảng bá |
| `visible` | Scope `active()` — chỉ chương trình `visible = true` mới hiện cho affiliate chọn |

Quan hệ: `hasMany(Customer)`, `hasMany(ProgramCommission)`.

## Level

Bậc/tier của affiliate, dùng để tra mức % hoa hồng. `app/Level.php`, bảng `levels`.

| Field | Ý nghĩa |
|---|---|
| `level_index` | Số thứ tự bậc (0, 1, 2, 3...) |
| `min_paid_customers` | Số shop trả phí tối thiểu để đạt bậc này |

Logic chọn Level cho một affiliate (xem chi tiết + ví dụ số ở [02-commission/01-level-and-tier.md](02-commission/01-level-and-tier.md)): lấy `Level` có `min_paid_customers <= (số Customer có ít nhất 1 Conversion loại subscription)`, ưu tiên `min_paid_customers` cao nhất thoả điều kiện. Nếu `User.is_vip = true`, bỏ qua công thức, dùng thẳng `Level` ứng với `User.level` (level bị ghim/pin thủ công).

> **Rationale**: tiêu chí lên bậc dùng "số shop trả phí" (đếm đầu shop) chứ không dùng "tổng doanh thu cả đời" — nghĩa là 1 affiliate có 10 shop nhỏ lên bậc nhanh hơn 1 affiliate chỉ có 1 shop rất lớn. Đây là quan sát từ code, chưa có xác nhận rõ ràng từ PO về lý do lựa chọn tiêu chí này — nên hỏi lại nếu cần điều chỉnh.

## ProgramCommission

Cấu hình % hoa hồng theo **từng cặp (Program, Level)** — đây là bảng "rate card". `app/ProgramCommission.php`, bảng `program_commissions`.

| Field | Ý nghĩa |
|---|---|
| `program_id`, `level_id` | Khoá cấu hình — 1 dòng = rate cho 1 Program ở 1 Level |
| `name` | Tên hiển thị cho dòng cấu hình (nullable) |
| `percentage` | % hoa hồng cho charge recurring bình thường |
| `first_month_percentage` | % hoa hồng ưu đãi cho tháng đầu tiên của 1 customer (thường cao hơn `percentage`) |
| `maximum_amount` | Cap **trên từng dòng conversion** (per-row) cho charge recurring/first-month, tính bằng tiền tuyệt đối |
| `usage_percentage` | % hoa hồng cho **usage charge** (tính phí theo mức dùng, khác subscription) |
| `usage_maximum_amount` | Cap **cả đời (lifetime), theo affiliate + theo Program** cho tổng hoa hồng usage-charge — KHÔNG phải theo kỳ, KHÔNG phải theo dòng (xem [02-commission/03-usage-charge.md](02-commission/03-usage-charge.md) để có ví dụ số cụ thể) |
| `handle_usage_charge` | Cờ bật/tắt: nếu `false`, mọi dòng `usage` charge_type của Program này bị bỏ qua hoàn toàn, không tạo Conversion |

> **Rationale suy luận (chưa xác nhận với PO)**: cap `maximum_amount` (recurring) là per-row vì mỗi charge subscription tương đối cố định/dự đoán được theo tháng, dễ đặt 1 mức trần cứng. Cap usage lại là lifetime vì usage charge phát sinh thành **nhiều dòng nhỏ, không đều đặn** trong 1 kỳ (theo mức sử dụng thực tế) — cap theo dòng sẽ vô nghĩa (mỗi dòng quá nhỏ để chạm cap), nên phải cộng dồn theo affiliate để giới hạn tổng chi phí hoa hồng usage mà Ownego chấp nhận trả cho 1 affiliate với 1 Program, bất kể phát sinh bao nhiêu dòng nhỏ.

## User (Affiliate)

Người tham gia chương trình affiliate. `app/User.php`, bảng `users`. Dùng JWT auth (`JWTSubject`) cho API, còn web dashboard dùng session Laravel thường (`Authenticatable` + `MustVerifyEmail`).

| Field | Ý nghĩa |
|---|---|
| `status` | `pending` / `approved` / `disapproved` — hồ sơ đăng ký phải được admin duyệt mới hoạt động đầy đủ (`isApproved()`) |
| `approved_at`, `disapproved_reason` | Mốc thời gian/lý do duyệt |
| `level` | Bậc hiện tại (số nguyên, đồng bộ với `Level.level_index` qua `calculateLevel()`/`updateLevel()`) |
| `is_vip` | Ghim cứng `level`, bỏ qua công thức tính theo số customer |
| `survey` (cast `array`) | Dữ liệu khảo sát lúc đăng ký (khảo sát riêng cho Koin) |
| `payment_method_id` | FK tới `PaymentMethod` đã chọn để nhận thanh toán |
| `payment_info` | Chuỗi thông tin thanh toán đơn giản (dùng khi payment method KHÔNG cần bank details, ví dụ PayPal email) |
| `payment_details` (cast `array`) | 7 field ngân hàng có cấu trúc (dùng khi payment method `requires_bank_details = true`) — xem `User::BANK_DETAIL_LABELS` |
| `bonus_at` | Mốc thời gian được cộng thưởng "premium offer" (xem `hasPremiumOffer()`) |
| `country` | ISO 3166-1 alpha-2, dùng để lọc `PaymentMethod` khả dụng theo quốc gia |
| `ref` | Ai giới thiệu affiliate này vào hệ thống (self-referral tracking) |

Các hàm nghiệp vụ đáng chú ý trên `User`:
- `calculateLevel()` — công thức chọn Level như mô tả ở trên.
- `hasSubscriptionConversionsCustomers()` — đếm số Customer có **ít nhất 1 Conversion loại `first`/`recurring`** (KHÔNG tính `custom` hay `usage`) — đây là con số dùng để lên bậc.
- `getAllTimeCommissionAttribute()` — tổng hoa hồng cả đời = `balance` (số dư nội bộ) + tổng `Invoice.amount` của các invoice ở trạng thái `completed`/`pending`/`approved`.
- `hasPaymentInfo()` — điều kiện affiliate được phép tạo yêu cầu thanh toán (`payment_method_id` + có `formatted_payment_info`).
- `isFirstMonth()` / `hasPremiumOffer()` — logic thưởng "premium offer" cho affiliate mới (khác với first-month của Customer, xem [02](02-commission/00-overview.md), đừng nhầm 2 khái niệm "first month" này).

## Customer

**Một shop Shopify** được 1 affiliate giới thiệu vào 1 Program. `app/Customer.php`, bảng `customers`, có `SoftDeletes`.

| Field | Ý nghĩa |
|---|---|
| `related_id` | ID định danh shop bên phía client app (unique) |
| `name`, `email`, `source_url` | Thông tin shop |
| `program_id`, `user_id` | Shop này thuộc Program nào, do affiliate nào giới thiệu |
| `skip_first_month` | Nếu `true`, Customer này KHÔNG được hưởng `first_month_percentage` — luôn tính theo `percentage` recurring ngay từ dòng đầu tiên |
| `deleted_at` | Soft-delete — vẫn tính vào cap lifetime usage-charge (`withTrashed()` trong `UsageCommissionCapper`) |

Hàm nghiệp vụ quan trọng: `isFirstMonth(Carbon $charge_creation_time, $partner_share)` — xem chi tiết đầy đủ ở [02](02-commission/00-overview.md), đây là logic dễ hiểu sai nhất trong toàn hệ thống.

## Conversion

**Một dòng hoa hồng**, tương ứng 1 dòng trong file CSV Payout (hoặc 1 conversion tạo tay bởi admin). `app/Conversion.php`, bảng `conversions`.

| Field | Ý nghĩa |
|---|---|
| `customer_id` | Shop nào tạo ra charge này |
| `type` | `first` \| `recurring` \| `usage` \| `custom` (const `Conversion::TYPE_*`) |
| `amount` | Số tiền hoa hồng affiliate nhận (đã áp %, đã cap) |
| `partner_share` | Số tiền Ownego thực nhận từ Shopify cho dòng charge gốc (input để tính `amount`) |
| `percentage` | % hiệu lực thực tế đã dùng để tính `amount` (có thể khác `ProgramCommission.percentage` gốc nếu bị cap — được tính ngược `amount/partner_share`) |
| `charge_type` | Chuỗi gốc từ Shopify, ví dụ `"App sale – 30-day subscription"`, `"App sale – usage"`, `"App refund"`, `"App downgrade"` |
| `charge_id` | ID charge từ Shopify (nullable — dòng downgrade/credit không có) |
| `charge_creation_time`, `payout_date`, `date_from`/`date_to` (= kỳ payout) | Mốc thời gian từ CSV |
| `is_capped` | `true` nếu dòng `usage` bị cắt bớt bởi lifetime cap (xem [02](02-commission/00-overview.md)) |
| `reason` | Lý do (dùng cho `custom` conversion, admin nhập tay) |

Scope hữu ích: `subscription()` (chỉ `first`+`recurring`, loại `custom`/`usage` — dùng cho tính level/bonus/first-month), `withoutCappedToZero()` (ẩn các dòng `usage` bị cap về đúng $0, tránh affiliate thấy dòng "$0" khó hiểu).

## CustomerEvent

Lịch sử vòng đời 1 Customer (shop), do client app báo về qua API. `app/CustomerEvent.php`, bảng `customer_events`.

`name` ∈ `installed | uninstalled | reinstalled | subscribed | upgraded | canceled` (const `CustomerEvent::STATUS_*`). Quan hệ `belongsTo(Customer::class)->withTrashed()` — vẫn xem được event dù Customer đã bị soft-delete.

## TrackingInformation

Link tracking/giới thiệu do affiliate tạo. `app/TrackingInformation.php`, bảng `tracking_information`.

| Field | Ý nghĩa |
|---|---|
| `user_id` | Affiliate sở hữu |
| `source_url` | URL nguồn (nơi affiliate đặt link, ví dụ blog/landing page) |
| `tracking_id` | Mã tracking unique, gắn vào link giới thiệu |
| `expires_at` | Hạn dùng của link |

## PaymentMethod

Phương thức nhận thanh toán mà affiliate có thể chọn. `app/PaymentMethod.php`, bảng `payment_methods`.

| Field | Ý nghĩa |
|---|---|
| `name` | Tên hiển thị (PayPal, Bank Transfer...) |
| `payment_info_field_name` | Label cho ô nhập thông tin đơn giản (khi không cần bank details) |
| `transfer_fee` | Phí chuyển khoản mặc định, dùng làm fallback cho `Invoice.fee` nếu invoice không tự set |
| `visible` | Ẩn/hiện phương thức này cho affiliate chọn |
| `country` | Giới hạn phương thức này chỉ cho affiliate ở 1 quốc gia (null = mọi quốc gia) |
| `requires_bank_details` | `true` → affiliate phải điền 7 field ngân hàng (`User.payment_details`) thay vì 1 chuỗi đơn giản (`User.payment_info`) |

Scope `availableFor(User $user)`: trả về các method `visible = true` và (`country` null HOẶC trùng `user.country`).

## Invoice

Yêu cầu/thanh toán hoa hồng **từ Ownego cho affiliate**. `app/Invoice.php`, bảng `invoices`. Xem chi tiết vòng đời ở [07-invoicing-payments/00-overview-and-balance-mechanics.md](07-invoicing-payments/00-overview-and-balance-mechanics.md).

| Field | Ý nghĩa |
|---|---|
| `code` | Mã invoice, unique |
| `status` | `pending` \| `approved` \| `cancel` \| `completed` (const `Invoice::STATUS_*`) |
| `amount` | Số tiền hoa hồng yêu cầu thanh toán |
| `fee` | Phí trừ đi khi thanh toán (nullable — fallback về `PaymentMethod.transfer_fee` nếu trống, xem `getActualFeeAttribute()`) |
| `payment_method_name`, `payment_info` | Snapshot thông tin thanh toán tại thời điểm tạo invoice (fallback về thông tin hiện tại của `User` nếu trống — xem `getActualPaymentMethodAttribute()`/`getActualPaymentInfoAttribute()`) |
| `cancellation_reason` | Lý do huỷ (khi `status = cancel`) |

`getActualReceivedAttribute()` = `amount - actual_fee` — số tiền affiliate thực nhận sau phí.
