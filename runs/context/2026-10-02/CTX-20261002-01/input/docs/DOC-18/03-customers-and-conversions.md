# Customers & Conversions (màn hình Customer, Conversion, Custom Conversion)

> Đây là nơi admin xem lại "kết quả cuối" của toàn bộ business logic tính hoa hồng ([../02-commission/00-overview.md](../02-commission/00-overview.md)) và luồng import CSV ([../03-payout-import/00-overview-and-upload-journey.md](../03-payout-import/00-overview-and-upload-journey.md)) — nói cách khác, đây là màn hình "sự thật" (source of truth) mà admin dùng để trả lời câu hỏi affiliate hay hỏi nhất: *"Sao tôi chưa thấy hoa hồng của tháng này?"*

## Customer — shop được giới thiệu

| Field | Ý nghĩa |
|---|---|
| `name`, `email`, `source_url` | Thông tin shop |
| `program_id`, `user_id` | Thuộc Program nào, do affiliate nào giới thiệu |
| `related_id` | ID định danh phía client app — hiển thị dạng **QR code** trên danh sách |
| `skip_first_month` | Bỏ qua ưu đãi first-month, tính recurring ngay từ dòng đầu |
| `deleted_at` | Soft-delete khi shop gỡ cài app |

### Ví dụ cụ thể khi nào bật `skip_first_month`

> *Suy luận business rationale (chưa xác nhận với PO):* trường này hợp lý nhất khi Ownego có **thoả thuận riêng** với 1 shop lớn/đối tác chiến lược — ví dụ shop đó được ký hợp đồng đặc biệt, trả phí subscription ngay từ tháng đầu theo mức giá đã thương lượng riêng (không qua kênh affiliate tự nhiên thông thường), nên Ops chủ động tắt ưu đãi first-month bonus cho Customer đó để tránh trả dư hoa hồng không cần thiết. Một khả năng khác: dùng cho các trường hợp migrate dữ liệu cũ (shop đã là customer từ trước khi có hệ thống affiliate, tạo lại record `Customer` cho mục đích thống kê nhưng không muốn tính lại first-month bonus). **Cần hỏi lại PO để xác nhận use-case thật đang dùng field này trong vận hành.**

### Journey — Tra cứu 1 shop cụ thể khi affiliate thắc mắc về hoa hồng

Ví dụ: affiliate Jane nhắn hỏi "Sao tháng này tôi không thấy hoa hồng từ Cool Gadgets?"

1. Vào màn hình Customer, tìm theo tên shop "Cool Gadgets" (hoặc lọc theo `ref` của Jane để xem toàn bộ shop cô ấy giới thiệu).
2. Mở **Chi tiết (Show)** — kiểm tra 2 bảng con:
   - Bảng **Conversion**: có dòng nào của tháng đang hỏi không? Nếu không có dòng nào → khả năng cao file CSV Payout tháng đó chưa được upload, hoặc dòng CSV của shop này bị `onFailure()` bỏ qua âm thầm (thiếu `app_slug`/`partner_share`, xem [../08-known-issues-edge-cases.md](../08-known-issues-edge-cases.md)).
   - Bảng **CustomerEvent**: xem shop có đang ở trạng thái `uninstalled`/`canceled` không — nếu shop đã gỡ app hoặc huỷ subscription, sẽ không có charge mới nào từ Shopify nữa.
3. Nếu cả 2 bảng đều trống bất thường trong khi affiliate chắc chắn shop vẫn đang hoạt động → nghi ngờ lỗi khớp dữ liệu (`Program.slug` sai, hoặc `related_id` không khớp giữa 2 hệ thống) — cần kiểm tra thêm ở [../03-payout-import/00-overview-and-upload-journey.md](../03-payout-import/00-overview-and-upload-journey.md).

## Conversion — dòng hoa hồng

| Field | Ý nghĩa |
|---|---|
| `type` | `First` / `Recurring` / `Custom` / `Usage` |
| `amount` | Số tiền hoa hồng thực nhận |
| `partner_share`, `percentage` | Số tiền gốc từ Shopify, % hiệu lực đã dùng |
| `charge_type`, `charge_id` | Dữ liệu gốc từ CSV Shopify |

Màn hình này **không có nút "Create"** — Conversion chỉ sinh ra qua 2 cách: (a) import CSV Payout, hoặc (b) Custom Conversion (bên dưới). Sửa/xoá tay vẫn được phép, dùng khi cần chỉnh 1 dòng đã lỡ sai (ví dụ nhập nhầm `amount` qua Custom Conversion).

⚠️ Cột `is_capped` (đánh dấu 1 dòng `usage` có bị cắt bởi cap lifetime hay không) **không hiển thị ở đây** — chỉ hiển thị phía dashboard affiliate. Muốn biết 1 dòng `usage` có bị cap không, admin phải tự tính `partner_share × usage_percentage` rồi so với `amount` đã lưu; nếu 2 số khác nhau → dòng đó đã bị cap.

### Journey — Xử lý payout hàng tháng (quy trình định kỳ chính của toàn hệ thống)

Đây là công việc lặp lại quan trọng nhất của Ops mỗi kỳ (thường hàng tháng), mô tả chi tiết cơ chế kỹ thuật đã có ở [../03-payout-import/00-overview-and-upload-journey.md](../03-payout-import/00-overview-and-upload-journey.md) — dưới đây là góc nhìn **quy trình thao tác** trên chính màn hình Conversion:

1. Ops tải file "Payout report" từ Shopify Partner Dashboard.
2. Nếu file thuộc format mới (không có cột `App Slug`) → **bước ngoài hệ thống**: đối chiếu `App Title` với bảng mapping nội bộ (không nằm trong Qikfiliate) để bổ sung cột `app_slug` cho từng dòng.
3. Vào Conversion → nút "Upload payout file" → chọn file → submit.
4. Đọc banner kết quả: số conversion đã tạo. Nếu số này thấp bất thường so với kỳ vọng (ví dụ tháng trước có 50 dòng, tháng này chỉ 5 dòng) → nghi ngờ có Program nào đó bị lỗi khớp `app_slug`, cần điều tra thêm (xem Journey ở [02-programs-and-commissions.md](02-programs-and-commissions.md)).
5. Vài ngày/tuần sau, nếu Shopify gửi lại dữ liệu đã settle cho cùng kỳ (dữ liệu payout hay đến muộn ở 1-2 kỳ gần nhất) → dùng màn hình **"Upload/populate payout file"** riêng (không phải upload thường) để cập nhật lại các Conversion đã có, không tạo trùng.

### Journey — Tạo Custom Conversion (hoa hồng nhập tay)

Ví dụ: 1 affiliate mang về 1 deal đặc biệt ngoài luồng CSV Payout thông thường (ví dụ deal Ownego thoả thuận trực tiếp, không qua Shopify Partner payout), cần ghi nhận hoa hồng thủ công cho affiliate đó.

1. Vào màn hình **User**, mở trang Chi tiết của đúng affiliate cần ghi nhận.
2. Bấm nút **"Add Custom Conversion"** — form mở ra đã **khoá sẵn affiliate này** (không đổi được sang affiliate khác).
3. Chọn `Customer` — dropdown chỉ hiện các shop **thuộc chính affiliate đang được chọn** (không thấy shop của affiliate khác). Nếu cố tình can thiệp để chọn shop của affiliate khác (ví dụ sửa request tay), hệ thống sẽ từ chối lưu với lỗi "Customer does not belong to this user".
4. Điền `amount` (số tiền hoa hồng), `reason` (**bắt buộc** — lý do, sẽ hiển thị lại ở cột "Reason" trên trang Conversion và cả trên dashboard affiliate, nên cần viết rõ ràng, dễ hiểu cho cả affiliate đọc được).
5. Lưu — Conversion mới tạo có `type = "Custom"`.
6. **Lưu ý quan trọng**: Custom Conversion **không tính vào số shop trả phí để lên bậc Level** của affiliate, và **không ảnh hưởng tới việc tính first-month** của Customer đó (nếu Customer này sau đó có charge thật qua CSV Payout, `isFirstMonth()` vẫn tính như thể Custom Conversion chưa từng tồn tại). Nhưng nó **vẫn cộng vào `balance`** của affiliate như 1 Conversion bình thường — vẫn dùng được để tạo Invoice thanh toán.
