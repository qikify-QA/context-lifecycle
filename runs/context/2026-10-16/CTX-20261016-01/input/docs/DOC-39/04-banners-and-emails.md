# Banner thông báo trong admin và mọi email/thông báo của app

> Hai thứ khác nhau: (1) **banner** quảng bá/thông tin hiện trên Dashboard của merchant do nhân viên Ownego tạo; (2) **email và thông báo** hệ thống tự gửi. Nằm trong nhóm [Tự động hoá và tăng trưởng](00-overview.md). Màn tạo banner phía admin panel: [../08-admin-panel/06-banners-and-other-screens.md](../08-admin-panel/06-banners-and-other-screens.md).

## Phần 1 — Banner thông báo `[chỉ có trên staging]`

### Nó là gì

Một thẻ (card) trên trang chủ Dashboard của app, ví dụ co-marketing. Không gửi email hay push. Không nhầm với thông báo nội bộ của admin panel hay các cảnh báo cố định của portal (cảnh báo translation, early-bird, đổi giá, nâng cấp gói Free).

### Ai tạo, nội dung gì

Nhân viên Ownego ở admin panel: nhóm "Marketing tools" → "Notifications" (cần quyền `view_list`, `view_detail`, `create`, `update`, `delete`; không seed sẵn).

| Trường | Quy tắc |
|---|---|
| Title | bắt buộc, tối đa 48 ký tự |
| Description | tối đa 110 ký tự hiển thị; chỉ đậm, nghiêng, gạch chân, xuống dòng; không để trống |
| Badge label | tuỳ chọn, tối đa 18 |
| App icon URL | bắt buộc, https |
| Ảnh minh hoạ, ảnh nền | tuỳ chọn, URL https hoặc upload (PNG/JPEG/WebP/GIF, tối đa 2 MB) |
| Nút chính và nút phụ | chữ và link phải điền cùng nhau; link bắt đầu bằng https:// |
| Màu | hex như `#1a2b3c` (có thể kèm alpha): nền, tiêu đề, mô tả, nút chính (nền + chữ), chữ nút phụ |
| Background fit | Cover, Contain right, Repeat tile |
| Internal note | chỉ admin thấy |
| Active, giờ bắt đầu, giờ kết thúc | bắt buộc, nhập theo giờ Việt Nam (Asia/Ho_Chi_Minh) |
| Đối tượng | gói Mysbox (tất cả hoặc danh sách), gói Shopify (tất cả hoặc danh sách), "installed after" / "installed before" |

### Ai thấy banner

```
Merchant thấy banner khi TẤT CẢ đều đúng:
   Active = bật
   VÀ bây giờ nằm trong [start, end]
   VÀ gói Mysbox của shop nằm trong danh sách (hoặc chọn tất cả)
   VÀ gói Shopify khớp (xem bảng)
   VÀ ngày cài (hoặc ngày cài lại) nằm trong khoảng đã chọn
Nếu nhiều banner cùng đủ điều kiện → chỉ hiện banner TẠO SAU CÙNG (không có trường ưu tiên)
```

Ánh xạ gói Shopify (khớp theo chữ tên gói): Basic = basic, basic shopify; Shopify = grow, shopify; Advanced = advanced, advanced shopify; Plus = plus, shopify plus; Trial = trial, plus trial. Gói khác (development, paused, affiliate...) chỉ khớp khi chọn "tất cả".

Merchant **không tắt được** banner; nó ở đó đến hết hạn, đến khi admin tắt, hoặc shop không còn đủ điều kiện. Banner tải cùng màn hình đầu của app. Admin lưu xong, thay đổi tới merchant trong vài giây (cache bị xoá khi lưu); merchant đang mở app thấy ở lần tải sau. HTML trong mô tả được làm sạch; ảnh phải https và không chứa dấu nháy/ngoặc. Lỗi khi chọn banner bị nuốt: Dashboard không có banner, không hỏng gì.

### Ví dụ

Admin **Chi** tạo banner "Cùng Shopify Editions" từ 01/11 tới 07/11 (giờ VN), gói Mysbox "tất cả", gói Shopify chọn Basic và Grow, installed after 01/10. Shop An (gói Shopify "Basic", cài ngày 15/10) thấy banner. Shop Lan (gói "Plus") không thấy. Nếu Chi tạo thêm banner thứ hai cùng thời gian cho cả hai shop, Shop An chỉ thấy banner thứ hai (tạo sau).

## Phần 2 — Email và thông báo hệ thống

Email gửi qua Mailgun; mã template nằm trong cấu hình môi trường, nếu template hoặc email shop trống thì bỏ qua im lặng. **App không gửi email cho khách mua hàng**; email duy nhất khách có thể nhận là thông báo "order updated" của chính Shopify khi quà được thêm vào đơn (mặc định bật, có công tắc cấu hình nội bộ để tắt). *Không tìm thấy trong code: email chào mừng, hết trial, gỡ app, biên nhận resell.*

### Email gửi merchant

| Email | Khi nào | Nội dung |
|---|---|---|
| Hết dung lượng (gói Free) | Số box dùng chạm hạn mức (vượt từ dưới lên), hoặc shop bị chuyển về Free khi đã bằng/vượt hạn mức, hoặc shop đã vượt rồi cài lại | Tên shop, giới hạn box, ngày kết thúc dung lượng, link trang giá. Kèm hệ quả: box bị unpublish khỏi storefront |
| Hết dung lượng (gói trả phí) | Cùng điều kiện, trên gói trả phí | Tên shop, giới hạn, ngày, phí tối thiểu (hoặc phí tối thiểu bậc theo giá trị + phần trăm phí `[chỉ có trên staging]`), link quản lý đơn |
| Cần cấp quyền lại ("Re-authorisation required") | App mất quyền truy cập hợp lệ vào shop (token hết hạn không làm mới được) và shop đang cài ở gói mở | Tên chủ shop, domain, link mở app để duyệt quyền. Gửi một lần khi cờ lần đầu được bật |

Chi tiết dung lượng: [../05-plans-billing/01-plans-and-capacity.md](../05-plans-billing/01-plans-and-capacity.md).

### Mọi sự kiện → kênh → người nhận → điều kiện

| # | Sự kiện | Kênh | Người nhận | Điều kiện |
|---|---|---|---|---|
| 1 | Box digital cuối của đơn được mở | Flow trigger "All box opened" | Flow của merchant | Công tắc Flow bật; mỗi đơn một lần |
| 2 | Quà đã ghi vào đơn | Flow trigger "Digital order synced" | Flow của merchant | Công tắc bật; đơn có box digital |
| 3 | Sắp auto-reveal | Flow trigger "Order unboxing soon" | Flow của merchant | Auto-unbox + "Enable auto-unbox trigger" bật; tới giờ thông báo |
| 4 | Khách resell xong | Flow trigger "Resell completed" | Flow của merchant | Công tắc bật |
| 5 | Box hết tồn kho sau reveal | Flow trigger "Box sold out" | Flow của merchant | Box có theo dõi tồn kho |
| 6 | Flow gọi 3 action | Request vào Mysbox | Mysbox | Có chữ ký; 60/phút/shop |
| 7 | Quà thêm vào đơn Shopify | Email "order updated" của Shopify | Khách mua | Mặc định bật |
| 8-9 | Dung lượng box chạm hạn mức (Free / trả phí) | Email Mailgun | Email shop | Lúc vượt hạn mức hoặc hạ gói/cài lại khi đã vượt |
| 10 | Shop cần cấp quyền lại | Email Mailgun | Email shop | Cờ mới bật; shop cài ở gói mở |
| 11 | Hồ sơ/gói/trạng thái shop đổi hoặc gỡ app | Brevo (CRM) cập nhật contact | Danh sách marketing | Shop có email; một trường theo dõi đổi |
| 12 | Review App Store mới/sửa/publish/xoá | Tin nhắn Slack + gọi dịch vụ review | Kênh team | Webhook từ hệ thống review |
| 13 | Nhân viên đăng nhập | Slack OAuth | Admin | Slack user khớp admin |
| 14-15 | File báo cáo xuất xong (`app-analytics:export`, `store-metrics:export`) | Email Mailgun kèm link | Địa chỉ gõ vào lệnh | Nhân viên chạy lệnh |
| 16 | Tạo link / xem / click / mở popup / hành động chia sẻ `[chỉ có trên staging]` | Sự kiện analytics nội bộ (không phải tin nhắn) | Lưu cho báo cáo chia sẻ | Giới hạn theo link |
| 17-18 | Merchant subscribe/unsubscribe; gỡ/cài lại (shop có mã affiliate) | Sự kiện sang dịch vụ affiliate | Nền tảng affiliate | Shop có affiliate ref |
| 19 | Partner events hằng ngày | Dòng dữ liệu BigQuery | Bảng báo cáo nội bộ | 07:00 UTC mỗi ngày |
| 20 | Admin đổi banner | Banner trong app (không phải tin nhắn) | Merchant đủ điều kiện | Xem Phần 1 |
| 21 | Hết ngân sách ảnh share/ngày | Cảnh báo trong log | Developer | Một lần/shop/ngày |
| 22 | Thao tác admin panel (hide pull, resync...) | Toast / thông báo DB của Filament | Admin thao tác | Khi chạy |

### CRM (Brevo)

Merchant được phản chiếu thành contact để marketing gửi email. Tạo/cập nhật tự động khi hồ sơ shop đổi (email, chủ shop, tên, domain, gói, điện thoại, địa chỉ, trạng thái app, trạng thái hành động, gói Mysbox) và khi gỡ app. Thêm vào hai danh sách (mặc định list 2 và 106). Shop không có email thì không gửi gì. Sửa hàng loạt bằng lệnh `subscribers:sync` (gồm cả shop đã gỡ).

### Slack và hỗ trợ

Admin đăng nhập bằng "Sign in with Slack". Cảnh báo review App Store có bốn biến thể (mới, sửa, publish, xoá). Hỗ trợ trong app là widget live-chat Crisp; không có luồng cảnh báo trong code.

## Câu hỏi thường gặp

- **Merchant không nhận email dung lượng?** Template Mailgun chưa cấu hình, shop không có email, hoặc đã vượt hạn mức từ trước (email chỉ gửi đúng lúc vượt).
- **Merchant thấy sai banner / không thấy?** Kiểm tra Active, ngày (giờ VN), gói Mysbox, ánh xạ gói Shopify, ngày cài; banner tạo sau thắng.
