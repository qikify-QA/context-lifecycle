# Affiliate Dashboard — Overview

> Đây là web app (Vue 2 SPA, `resources/assets/js`) mà **affiliate tự đăng nhập vào** — hoàn toàn tách biệt với admin panel nội bộ (`encore/laravel-admin`, xem [../05-admin-panel/00-overview.md](../05-admin-panel/00-overview.md)). Backend là REST API JWT (`routes/api.php`, nhóm middleware `auth:api` + `verified`).

## Khác gì với admin panel?

| | Affiliate Dashboard | Admin Panel |
|---|---|---|
| Ai dùng | Affiliate/partner (bên ngoài Ownego) | Nhân viên Ops/Finance nội bộ |
| Công nghệ | Vue 2 SPA + REST API (JWT) | `encore/laravel-admin` (server-rendered) |
| Đăng nhập | Tự đăng ký, cần verify email + được duyệt | Tài khoản admin do Ownego cấp sẵn |
| Có thể sửa gì | Chỉ dữ liệu của chính mình (profile, payment method, yêu cầu thanh toán) | Toàn bộ dữ liệu hệ thống (mọi affiliate, mọi rate card, mọi conversion) |
| Xem hoa hồng | Chỉ xem, không tự nhập/sửa số tiền | Có thể nhập tay (Custom Conversion), sửa số liệu |

## Bộ 3 file con của mục này

Mục "Affiliate Dashboard" đã được tách thành 3 file chi tiết hơn, theo đúng thứ tự trải nghiệm 1 affiliate thật sẽ đi qua:

1. **[01-signup-and-verification.md](01-signup-and-verification.md)** — đăng ký, khảo sát, xác thực email, đăng nhập, các trường hợp bị chặn đăng nhập.
2. **[02-tracking-links.md](02-tracking-links.md)** — cơ chế link giới thiệu, timeline thực tế của 1 tracking_id từ lúc click tới lúc hết hạn.
3. **[03-payment-and-payout-request.md](03-payment-and-payout-request.md)** — chọn phương thức thanh toán, điều kiện được yêu cầu rút hoa hồng, ví dụ số cụ thể.

## Các trang trong dashboard (sau khi đăng nhập) — tổng quan nhanh

| Trang | Nội dung | Đọc chi tiết ở |
|---|---|---|
| **Dashboard** | Tổng quan: bảng shop đã giới thiệu, khối payout/balance, danh sách link giới thiệu, banner "thử thách nhận thưởng" (bonus) nếu affiliate còn trong 1 tháng đầu và chưa nhận bonus. | [01](01-signup-and-verification.md) (bonus), [03](03-payment-and-payout-request.md) (balance) |
| **Links** | Danh sách các `Program` (app) đang mở cho affiliate quảng bá (`visible = true`), sắp xếp theo mức độ phổ biến/mới/rate cao/hoa hồng cao. Nút "Get Link" copy link giới thiệu (`ref_url`) riêng cho từng app. | [02](02-tracking-links.md) |
| **Conversions** | Bảng các dòng hoa hồng (`Conversion`) của affiliate — shop, app, ngày trả, **số tiền** (đỏ/xanh theo dấu, có badge "cap reached" nếu `is_capped`), loại charge, %, loại (first/recurring/custom/usage), lý do (nếu là custom conversion). Các dòng `usage` bị cap về đúng $0 **không hiển thị** (tránh gây khó hiểu). | [../02-commission/00-overview.md](../02-commission/00-overview.md) |
| **Customers** | Danh sách shop affiliate đã giới thiệu, kèm trạng thái vòng đời (installed/uninstalled/reinstalled/subscribed/upgraded/canceled) lấy từ `CustomerEvent` mới nhất — trạng thái này do **client app báo về qua API**, affiliate chỉ xem, không tự cập nhật. | [../06-integration-api/00-overview-and-auth.md](../06-integration-api/00-overview-and-auth.md) |
| **Invoices** | Danh sách yêu cầu thanh toán hoa hồng đã gửi, trạng thái, phí, số tiền thực nhận. Có thể **huỷ** yêu cầu khi còn ở trạng thái `pending`. | [03](03-payment-and-payout-request.md), [../07-invoicing-payments/00-overview-and-balance-mechanics.md](../07-invoicing-payments/00-overview-and-balance-mechanics.md) |
| **Account** | Cập nhật thông tin cá nhân, đổi phương thức thanh toán, đổi mật khẩu. | [03](03-payment-and-payout-request.md) |

## Email affiliate nhận được (tổng hợp)

Toàn bộ qua Sendinblue (Brevo), theo template riêng cho brand Koin:
- **Xác thực email** (lúc đăng ký / resend) — [01](01-signup-and-verification.md).
- **Duyệt / từ chối tài khoản** (kèm lý do nếu từ chối) — [01](01-signup-and-verification.md).
- **Thưởng affiliate mới** (khi đủ điều kiện "premium offer") — [01](01-signup-and-verification.md).
- **Đặt lại mật khẩu**.
- **Xác nhận đã gửi yêu cầu thanh toán** (khi tạo Invoice) — [03](03-payment-and-payout-request.md).
- **Thanh toán hoàn tất / huỷ** (khi admin cập nhật trạng thái Invoice) — xem [../07-invoicing-payments/00-overview-and-balance-mechanics.md](../07-invoicing-payments/00-overview-and-balance-mechanics.md).

Ngoài ra, nội bộ Ownego cũng nhận thông báo Slack (kênh `affiliate`) khi có affiliate mới xác thực xong và khi có yêu cầu thanh toán mới — đây là cách ops biết cần xử lý, hệ thống không có badge/đếm số lượng "pending" nào trên admin panel.
