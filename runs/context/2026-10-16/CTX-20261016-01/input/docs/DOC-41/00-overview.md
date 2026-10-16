# Admin panel — tổng quan và bản đồ màn hình

> Nhóm này mô tả **back office nội bộ** của Mysbox (Filament, "Mysbox Admin"). Merchant và khách của merchant không bao giờ thấy nó. Đây là nơi đội vận hành/support tra cứu shop, xử lý đơn, cấp quyền lợi (mã giảm giá, capacity) và đăng banner. Nằm ở phần "vận hành" của bức tranh chung — xem [tổng quan toàn bộ KB](../00-overview.md). Người dùng app của merchant (portal nhúng trong Shopify admin) là một sản phẩm khác: xem [06-merchant-app](../06-merchant-app/00-overview.md).

## Ai dùng và dùng để làm gì

- **Support**: tra shop/đơn, thử lại bước bị kẹt (đồng bộ quà vào đơn, xử lý lại đơn "paid").
- **Billing / partnership**: tạo Plan, Discount, Promote code, gửi link thanh toán.
- **Marketing**: đăng banner trong dashboard của merchant, upload ảnh.
- **Engineer**: token, queue (Horizon), version của portal, các lệnh `artisan` — xem [07-scheduled-jobs-and-ops](07-scheduled-jobs-and-ops.md).

Mọi thứ bị chặn **theo quyền** (permission): không có quyền thì nút/cột/màn hình **biến mất**, không bị làm mờ. Chi tiết ở [01-login-and-roles](01-login-and-roles.md).

## Sơ đồ tổng quát

```
Nhân viên ──(Sign in with Slack)──► Admin Panel (chỉ mở trên "admin host")
                                      │
     ┌──────────────┬─────────────────┼──────────────────┬───────────────┐
     ▼              ▼                 ▼                  ▼               ▼
   Shops         Orders        Plans / Charges     Discounts /      Notifications,
 (trung tâm)   (thử lại sync)  (tiền, read-only)   Promote codes     Analytics, Tools
     │              │
     ├─ tab Boxes ──┴─ tab Boxes ──► trang Box (Publish/Unpublish, versions, inventory, recent pulls)
     ├─ tab Orders
     └─ tab Charges
Mọi thao tác CRUD trên panel ──► Activity log (ghi lại ai làm gì)
```

## Bản đồ menu bên trái

| Nhóm menu | Màn hình | File mô tả |
|---|---|---|
| (đầu) | Dashboard (chỉ thẻ tài khoản) | [06](06-banners-and-other-screens.md) |
| Shops | Shops | [02](02-shops-users.md) |
| Orders | Orders | [03](03-orders.md) |
| Payment | Plans, Charges | [05](05-plans-discounts-promo-charges.md) |
| Marketing tools | Discounts, Promote codes, Notifications `[chỉ có trên staging]`, Upload Image | [05](05-plans-discounts-promo-charges.md), [06](06-banners-and-other-screens.md) |
| Analytics | Analytic | [06](06-banners-and-other-screens.md) |
| Development tools | Embedded Version, Customer Portal Resource | [06](06-banners-and-other-screens.md) |
| Admin (Shield) | Admin Users, Roles | [01](01-login-and-roles.md) |
| Activity | Activity log | [06](06-banners-and-other-screens.md) |
| (không có menu) | **Boxes** — chỉ vào qua tab trong Shop hoặc Order | [04](04-boxes.md) |
| (đường riêng) | Horizon `/admin/horizon` — dashboard hàng đợi | [07](07-scheduled-jobs-and-ops.md) |

Global search bị tắt. Chuông thông báo trong panel là của panel (báo export xong), **không liên quan** tới "Notifications" dành cho merchant.

## Mục lục file trong nhóm

| File | Nội dung |
|---|---|
| [01-login-and-roles.md](01-login-and-roles.md) | Đăng nhập Slack, cấp quyền cho người mới, role và danh mục quyền |
| [02-shops-users.md](02-shops-users.md) | Màn Shops: danh sách, filter, trang chi tiết, form Edit, action từng dòng |
| [03-orders.md](03-orders.md) | Màn Orders: danh sách, hai nút Retry, tab Boxes, "view winning bundles" |
| [04-boxes.md](04-boxes.md) | Trang Box: Publish/Unpublish, Versions, Inventory, Recent pulls, Tier settings |
| [05-plans-discounts-promo-charges.md](05-plans-discounts-promo-charges.md) | Plan, Charge, Discount, Promote code |
| [06-banners-and-other-screens.md](06-banners-and-other-screens.md) | Banner, widget dashboard, Analytic, export, Upload Image, Activity log |
| [07-scheduled-jobs-and-ops.md](07-scheduled-jobs-and-ops.md) | Job chạy định kỳ, vì sao merchant thấy trễ, lệnh `artisan` cần engineer |

## Từ vựng nhóm

| Từ | Nghĩa |
|---|---|
| Shop | Một cửa hàng Shopify đã cài Mysbox (trong database gọi là "user"). 1 shop = 1 dòng |
| Admin user | Một nhân viên được vào panel (khác với shop) |
| Shield | Hệ thống phân quyền của panel; quyền gán theo role |
| Row action | Nút trong menu "..." của mỗi dòng |
| Horizon | Màn theo dõi hàng đợi job nền và job lỗi |

## Ví dụ chạy xuyên suốt

Admin **Chi** (support lead) nhận ticket: "Shop An không thấy quà trên đơn #1042, và widget báo hết capacity". Trong các file sau, Chi mở Shops, tìm Shop An, kiểm tra tab Orders/Charges, bấm "Retry Sync Winning Items…", rồi "Sync capacity to metafield". Mỗi file cho thấy một bước của chuỗi đó.

## Câu hỏi thường gặp

- **Panel nằm ở URL nào?** Chỉ trả lời trên "admin host" cấu hình theo môi trường; host khác (kể cả domain app) trả 404 cho `/admin`. Hỏi engineer URL từng môi trường.
- **Panel khác gì portal của merchant?** Panel là nội bộ, nhìn xuyên mọi shop; portal chỉ thấy shop của chính merchant.
- **Staging có gì hơn production?** Màn Notifications và filter "Valid Shopify plan" `[chỉ có trên staging]`.
