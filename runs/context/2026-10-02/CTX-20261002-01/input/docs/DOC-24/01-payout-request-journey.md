# Payout Request Journey — Ví dụ số liệu đầy đủ

> 3 kịch bản số liệu cụ thể để hiểu chính xác điều kiện tạo Invoice, tác động lên `balance`, và các nhánh xử lý của admin. Giá trị cấu hình dùng trong ví dụ là **mặc định hệ thống** (`config('app.min_total_paid_customers')` = 3, `config('app.min_balance_to_create_invoice')` = $50) — nếu môi trường thực tế đổi giá trị `.env`, thay số tương ứng.

## Điều kiện tạo Invoice — công thức gốc

```
canCreateByUser(affiliate):
    điều_kiện_chung = affiliate có payment method + payment info hợp lệ
                       VÀ balance > transfer_fee của payment method đó

    nếu KHÔNG thoả điều_kiện_chung → false

    nếu affiliate.is_vip → true   (VIP bỏ qua 2 điều kiện bên dưới)

    ngược lại, cần thêm CẢ HAI:
        số shop có ít nhất 1 Conversion (bất kỳ loại) >= min_total_paid_customers (mặc định 3)
        balance >= min_balance_to_create_invoice (mặc định $50)
```

## Ví dụ A — KHÔNG đủ điều kiện tạo Invoice

Affiliate **Mai** (không VIP): `balance = $45`, đã có 2 shop trả phí, đã chọn payment method PayPal (`transfer_fee = $2`).

- Điều kiện chung: `hasPaymentInfo()` = true (đã chọn PayPal + có payment_info), `balance ($45) > transfer_fee ($2)` = true → qua vòng 1.
- Không VIP nên cần thêm cả 2:
  - Số shop trả phí `2 >= 3`? → **false** (thiếu 1 shop).
  - `balance ($45) >= $50`? → **false** (thiếu $5).
- Kết quả: `canCreateByUser = false`. Nút "Request Payment" trên dashboard bị ẩn/disable, và nếu cố gọi thẳng `POST /invoices` sẽ bị middleware `check_can_create_invoice` chặn ở tầng server (không thể bypass qua frontend).

**Lưu ý cho QA**: đây là phép "VÀ" trên cả 2 điều kiện — Mai chỉ cần thoả 1 trong 2 (ví dụ đã có 3 shop trả phí nhưng balance mới $45) vẫn **không** đủ điều kiện. Nên test riêng từng trường hợp: chỉ thiếu số shop, chỉ thiếu balance, thiếu cả hai, và vừa đủ cả hai (biên `= 3` shop và `= $50` balance — dùng `>=` nên đúng bằng ngưỡng vẫn hợp lệ).

## Ví dụ B — Đủ điều kiện, luồng hoàn tất bình thường

Affiliate **John** (không VIP): `balance = $120`, đã có 5 shop trả phí, payment method PayPal (`transfer_fee = $2`).

1. **Kiểm tra điều kiện**: `hasPaymentInfo()` = true, `$120 > $2` = true, `5 >= 3` = true, `$120 >= $50` = true → `canCreateByUser = true`. Nút "Request Payment" hiện ra.
2. **John bấm "Request Payment"**, để trống ô nhập số tiền (dùng mặc định) → `POST /invoices` với `amount` không gửi lên → hệ thống tự lấy `amount = balance = $120`.
3. Hệ thống tạo `Invoice`:
   - `code` tự sinh dạng `"{ref-của-John}-{số-thứ-tự}"`, ví dụ `"john-affiliate-1"` nếu đây là invoice đầu tiên của John.
   - `status = "pending"`, `amount = $120`.
   - **`User.balance` bị trừ ngay lập tức về $0** — dù chưa có đồng nào thực sự được chuyển.
4. John nhận email "Đã nhận yêu cầu thanh toán" (`RequestInvoice`).
5. Nội bộ Ownego nhận **thông báo Slack** (kênh `affiliate`) — đây là cách duy nhất Ops biết có yêu cầu mới, admin panel không có badge đếm số invoice đang chờ.
6. **Ops xử lý ngoài hệ thống**: chuyển khoản PayPal thật cho John, số tiền thực nhận = `$120 - $2 (fee) = $118` — Ops tự tính và tự chuyển bằng tài khoản PayPal thật, hệ thống Qikfiliate không hề gọi API PayPal nào.
7. Ops vào admin panel, mở `Invoice`, đổi `status` sang `"completed"`. Ngay khi chọn "completed" trên form, hệ thống tự động AJAX lấy payment method/payment info/fee **hiện tại** của John và điền sẵn vào các ô snapshot (`payment_method_name`, `payment_info`, `fee`) — mục đích: nếu sau này John đổi phương thức thanh toán, lịch sử invoice này vẫn giữ đúng thông tin tại thời điểm đã chi trả.
8. John nhận email "Thanh toán hoàn tất" (`InvoiceCompleted`).

## Ví dụ C — Huỷ giữa chừng (2 biến thể, tiếp nối Ví dụ B)

### C1 — Huỷ khi còn `pending` (trước khi Ops xử lý)

Giả sử ngay sau bước 3 ở Ví dụ B (Invoice vừa tạo, còn `pending`), John đổi ý, bấm "Huỷ yêu cầu" trên dashboard → `PUT /invoices/{id}` chuyển `status = "cancel"`.

- Vì trạng thái gốc là `pending` → **balance được hoàn lại đầy đủ $120**, John quay lại đúng như trước khi tạo invoice.
- John nhận email "Yêu cầu đã bị huỷ".

### C2 — Huỷ khi đã ở `approved` (SAU khi Ops đã duyệt nhưng chưa hoàn tất)

Giả sử ở bước 7 (Ví dụ B), thay vì chuyển thẳng sang `completed`, Ops trước đó đã chuyển `status` sang `"approved"` (bước trung gian xác nhận "đã duyệt, sắp chi"), rồi vì lý do nào đó (phát hiện sai sót, affiliate vi phạm điều khoản...) Ops huỷ invoice này (`status = "cancel"`).

- ⚠️ **`balance` KHÔNG được hoàn lại trong trường hợp này** — cơ chế hoàn balance chỉ áp dụng cho đúng nhánh chuyển từ `pending → cancel`. Chuyển từ `approved → cancel` không kích hoạt hoàn balance.
- Hậu quả thực tế: $120 đã bị trừ khỏi balance của John từ bước 3, nay invoice bị huỷ mà John **không nhận được tiền và cũng không lấy lại được balance** — số tiền này "biến mất" khỏi hệ thống trừ khi Ops tự tay điều chỉnh `balance` thủ công qua form User.
- **Cần xác nhận với PO**: đây có phải hành vi cố ý (ví dụ ngụ ý "approved" = tiền đã cam kết chi ra khỏi hệ thống, huỷ sau đó là 1 tình huống lỗi quy trình cần Ops tự xử lý tay ngoài hệ thống) hay là một khoảng trống (gap) cần vá lại logic để hoàn balance ở mọi nhánh huỷ, không riêng gì từ `pending`.

## Business rationale — vì sao balance bị trừ ngay lúc `pending`, không đợi đến `completed`

**Đây là suy luận hợp lý dựa trên đọc code, chưa có xác nhận trực tiếp từ PO — cần hỏi lại nếu muốn khẳng định chắc chắn:**

Nếu balance chỉ bị trừ khi invoice hoàn tất (`completed`), 1 affiliate có thể tạo **nhiều invoice pending cùng lúc**, mỗi cái đều "nhìn thấy" cùng 1 số dư balance ban đầu (vì chưa cái nào trừ) → tổng số tiền yêu cầu có thể vượt quá balance thực tế, gây khó xử lý cho Ops (phải tự nhớ trừ tay). Trừ ngay lúc tạo `pending` giải quyết vấn đề này bằng cách "khoá" (reserve) số tiền đó ngay lập tức, đảm bảo tổng các invoice đang mở (pending + approved) không bao giờ vượt quá số dư ban đầu của affiliate.
