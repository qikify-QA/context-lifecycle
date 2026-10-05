# Invoices & Payment Methods (màn hình Invoice, Payment Method)

> Đây là bước cuối của vòng đời hoa hồng: affiliate đã tích luỹ `balance`, đến lúc thực sự **trả tiền thật ra ngoài hệ thống**. Cơ chế/trạng thái đầy đủ đã có ở [../07-invoicing-payments/00-overview-and-balance-mechanics.md](../07-invoicing-payments/00-overview-and-balance-mechanics.md) — file này tập trung vào **thao tác thật trên màn hình admin**.

## Điều quan trọng cần hiểu trước: đổi status KHÔNG tự động chuyển tiền

Hệ thống **không tích hợp bất kỳ cổng thanh toán thật nào** (không PayPal Payouts API, không Stripe, không API ngân hàng). Đổi `status` sang `completed` trên admin panel chỉ là **admin tự xác nhận bằng tay rằng mình đã chuyển tiền thật ở đâu đó bên ngoài** (PayPal thật, chuyển khoản ngân hàng thật...) — hệ thống không xác minh việc chuyển tiền có thực sự xảy ra hay không. Nói cách khác: **thứ tự đúng luôn phải là chuyển tiền thật trước, đổi status sau** — nếu đổi status trước khi chuyển tiền thật, hệ thống sẽ "nói dối" rằng affiliate đã được trả, trong khi thực tế chưa.

## Journey — Xử lý 1 yêu cầu thanh toán từ đầu đến cuối

1. **Nhận tín hiệu**: khi affiliate bấm "Request Payment" trên dashboard, hệ thống gửi 1 **thông báo Slack** vào kênh `affiliate` — đây là cách duy nhất Ops biết có yêu cầu mới (admin panel **không có** badge/số đếm "pending invoices" nào để nhắc).
2. **Tìm invoice**: vào màn hình Invoice, lọc theo `status = pending`, hoặc tìm theo tên affiliate từ nội dung thông báo Slack.
3. **Kiểm tra thông tin thanh toán**: mở dòng invoice đó, xem `payment_method_name`/`payment_info` (hoặc nếu trống, hệ thống tự fallback hiển thị thông tin thanh toán hiện tại của `User`) — đây là nơi affiliate sẽ nhận tiền.
4. **Chuyển tiền thật, ngoài hệ thống**: Ops tự tay thực hiện chuyển khoản/PayPal thật theo đúng thông tin đã xem ở bước 3, trừ đi `fee` nếu có.
5. **Cập nhật trạng thái trên hệ thống**: mở form Edit invoice, đổi `status` sang `completed` (hoặc `approved` trước nếu quy trình nội bộ yêu cầu 1 bước duyệt trung gian trước khi thực sự chi tiền — thứ tự `pending → approved → completed` hay đi thẳng `pending → completed` tuỳ quy trình vận hành thực tế, không bị code ép buộc).
6. **Hệ thống tự động điền sẵn (snapshot) thông tin thanh toán** ngay khi form chuyển sang `completed`: 1 đoạn JS gọi AJAX lấy `payment_method_name`/`fee`/`payment_info` **hiện tại** của affiliate và điền vào các ô tương ứng trên form — admin chỉ cần xác nhận rồi lưu, không cần gõ tay.
7. Lưu — hệ thống tự gửi email "Payment completed" cho affiliate.

### Tại sao snapshot thông tin thanh toán vào Invoice thay vì luôn đọc trực tiếp (live) từ User?

> *Suy luận business rationale (khá chắc chắn, dựa trên hành vi code rõ ràng — không phải suy đoán mơ hồ):* nếu Invoice luôn hiển thị thông tin thanh toán **live** từ `User` (không snapshot), thì khi affiliate đổi phương thức thanh toán **sau khi** đã được trả tiền, lịch sử Invoice cũ sẽ tự động hiển thị sai — trông như thể khoản tiền đó đã được chuyển vào tài khoản mới, trong khi thực tế đã chuyển vào tài khoản cũ từ trước. Việc snapshot tại đúng thời điểm `completed` giữ cho lịch sử giao dịch **chính xác vĩnh viễn theo thời điểm nó xảy ra** — quan trọng cho việc đối soát/audit sau này (ví dụ affiliate khiếu nại "tôi không nhận được tiền", Ops cần biết chính xác tiền đã gửi tới đâu tại thời điểm đó, không phải tài khoản hiện tại).

## Journey — Huỷ 1 yêu cầu thanh toán

⚠️ **Cẩn trọng đặc biệt với hành động này** — xem chi tiết rủi ro ở [../08-known-issues-edge-cases.md](../08-known-issues-edge-cases.md) mục C1:

- Nếu invoice đang ở `pending` → đổi sang `cancel`: `balance` của affiliate **được hoàn lại đầy đủ** — an toàn.
- Nếu invoice đã ở `approved` → đổi sang `cancel`: `balance` **KHÔNG được hoàn lại tự động**. Nếu Ops huỷ 1 invoice đã `approved` mà chưa thực sự chi tiền, cần **tự tay cộng lại `balance`** cho affiliate ở màn hình User (xem [01-managing-affiliates.md](01-managing-affiliates.md)), nếu không affiliate sẽ mất số tiền đó khỏi số dư mà không hề nhận được thanh toán.

## Payment Method — danh sách phương thức khả dụng cho affiliate chọn

| Field | Ý nghĩa |
|---|---|
| `name` | Tên hiển thị (PayPal, Bank Transfer...) |
| `transfer_fee` | Phí trừ khi thanh toán — để trống nghĩa là **Ownego chịu phí** ("Absorbed"), không phải $0 mặc định |
| `visible` | Bật/tắt cho affiliate chọn — sửa nhanh trực tiếp trên danh sách (switch AJAX-inline) |
| `country` | Giới hạn phương thức chỉ cho affiliate ở 1 quốc gia — để trống = mọi quốc gia đều thấy |
| `requires_bank_details` | Bật lên thì affiliate phải điền 7 field ngân hàng thay vì 1 ô đơn giản |

### Journey — Thêm 1 phương thức thanh toán mới (ví dụ: mở thêm "Wise" cho affiliate châu Âu)

1. Vào Payment Method → Create.
2. Điền `name = "Wise"`, `payment_info_field_name = "Wise email"` (label ô nhập cho affiliate).
3. Nếu Ownego không thu phí khi trả qua Wise → để trống `transfer_fee`.
4. Nếu muốn chỉ affiliate ở khu vực châu Âu thấy phương thức này → chọn `country` tương ứng (lưu ý field này chỉ nhận **1 quốc gia**, không nhận cả khu vực — nếu cần cho nhiều quốc gia châu Âu cùng lúc, phải tạo nhiều dòng Payment Method riêng, mỗi dòng 1 quốc gia, cùng tên "Wise" nhưng khác `country`, **hoặc để trống `country` để mở cho tất cả** rồi tự giải thích trong `payment_info_field_name`/mô tả — đây là giới hạn thiết kế hiện tại, không có kiểu "danh sách nhiều quốc gia" trong 1 dòng).
5. Để `requires_bank_details = false` (Wise chỉ cần email, không cần 7 field ngân hàng).
6. Bật `visible = true` khi sẵn sàng cho affiliate thấy.

⚠️ **Lưu ý khi affiliate dashboard đang hardcode ID cụ thể**: frontend hiện đang gán cứng "PayPal = ID 1" và "Payoneer = ID 2" để hiển thị điều kiện rút tiền riêng cho 2 phương thức đó (xem [../08-known-issues-edge-cases.md](../08-known-issues-edge-cases.md) mục F1). Việc thêm Payment Method mới như "Wise" ở trên **không bị ảnh hưởng** bởi vấn đề này (chỉ ảnh hưởng nếu vô tình xoá rồi tạo lại đúng 2 dòng PayPal/Payoneer khiến ID đổi khác 1/2) — nhưng nên biết trước để tránh thao tác nhầm.
