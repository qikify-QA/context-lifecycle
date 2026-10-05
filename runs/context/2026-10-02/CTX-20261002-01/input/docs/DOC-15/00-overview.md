# Admin Panel — Overview

> Admin panel nội bộ (`encore/laravel-admin`), dành cho Ownego Ops/Finance quản lý toàn bộ hệ thống affiliate. Khác hoàn toàn với dashboard affiliate ([../04-affiliate-dashboard/00-overview.md](../04-affiliate-dashboard/00-overview.md)) — đây là nơi **nhân viên nội bộ** đăng nhập, không phải affiliate. Mỗi màn hình dưới đây tương ứng 1 controller trong `app/Admin/Controllers/`.

## Trang chủ (Dashboard)

Khi vào `/admin`, màn hình đầu tiên chỉ để xem tổng quan: 5 ô số liệu tổng (tổng số affiliate, tổng số shop, tổng số Program, tổng số Conversion, tổng số Invoice) và 1 bảng 10 sự kiện customer gần nhất (ai vừa cài/gỡ/subscribe app nào). Không có filter, không có action nào ở đây — thuần hiển thị.

## Bản đồ 13 màn hình → thuộc file nào

| Màn hình | Thuộc file | Vai trò chính |
|---|---|---|
| User (Affiliate) | [01-managing-affiliates.md](01-managing-affiliates.md) | Duyệt/quản lý hồ sơ affiliate |
| Program | [02-programs-and-commissions.md](02-programs-and-commissions.md) | Quản lý app Shopify đang quảng bá |
| Program Commission | [02-programs-and-commissions.md](02-programs-and-commissions.md) | Cấu hình rate card % hoa hồng |
| Customer | [03-customers-and-conversions.md](03-customers-and-conversions.md) | Quản lý shop được giới thiệu |
| Conversion | [03-customers-and-conversions.md](03-customers-and-conversions.md) | Xem lịch sử hoa hồng, upload CSV Payout |
| Custom Conversion | [03-customers-and-conversions.md](03-customers-and-conversions.md) | Tạo hoa hồng thủ công |
| Invoice | [04-invoices-and-payment-methods.md](04-invoices-and-payment-methods.md) | Xử lý yêu cầu thanh toán cho affiliate |
| Payment Method | [04-invoices-and-payment-methods.md](04-invoices-and-payment-methods.md) | Danh sách phương thức thanh toán khả dụng |
| Level | [05-other-screens.md](05-other-screens.md) | Định nghĩa bậc affiliate |
| Tracking Information | [05-other-screens.md](05-other-screens.md) | Log click giới thiệu (chỉ xem) |
| Customer Event | [05-other-screens.md](05-other-screens.md) | Log vòng đời shop (chỉ xem) |
| Embedded Version | [05-other-screens.md](05-other-screens.md) | Ép dashboard affiliate tải bản mới |
| (Console commands) | [05-other-screens.md](05-other-screens.md) | Lệnh bảo trì dữ liệu, không có UI |

## Cách đọc bộ file này

Mỗi file con dưới đây không chỉ liệt kê field — có kèm **journey** (kịch bản thao tác thật, từng bước) và **business rationale** (giải thích "tại sao thiết kế vậy", có ghi rõ chỗ nào là suy luận hợp lý chưa xác nhận với PO). Nếu chỉ cần tra nhanh 1 field, xem bảng field ở đầu mỗi mục; nếu cần hiểu quy trình vận hành thật, đọc phần "Journey".
