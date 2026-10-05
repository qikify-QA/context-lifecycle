# Payment Method & Payout Request Journey

> Xem tổng quan vị trí của mục này trong toàn bộ dashboard ở [00-overview.md](00-overview.md). Đây là bước cuối cùng của vòng đời affiliate: đổi hoa hồng đã tích luỹ (`balance`) thành tiền thật. Xem thêm vòng đời `Invoice` đầy đủ ở [../07-invoicing-payments/00-overview-and-balance-mechanics.md](../07-invoicing-payments/00-overview-and-balance-mechanics.md) — file này tập trung vào **trải nghiệm của affiliate**, không phải xử lý phía admin.

## Bước 1 — Chọn phương thức thanh toán (Account → Payment Info)

Affiliate gọi `GET /api/payment-methods`, chỉ thấy các method: `visible = true` **VÀ** (`country` để trống **HOẶC** trùng `country` của chính affiliate). Ví dụ: nếu admin cấu hình 1 method "Bank Transfer Vietnam" giới hạn `country = VN`, affiliate ở Mỹ sẽ không thấy method này trong danh sách chọn.

Tuỳ method được chọn, form hiển thị khác nhau:

| Loại method | `requires_bank_details` | Form hiển thị |
|---|---|---|
| Đơn giản (vd PayPal) | `false` | 1 ô nhập `payment_info` (ví dụ: email PayPal) |
| Ngân hàng (vd Bank Transfer) | `true` | 7 ô: tên ngân hàng, tên chi nhánh, số chi nhánh, loại tài khoản (Savings/Checking), số tài khoản, tên chủ tài khoản, tên chủ tài khoản dạng Katakana |

*Field "Katakana" cho thấy hệ thống có tính tới đối tác thanh toán tại Nhật Bản — chưa xác nhận với PO đây có phải nhu cầu thực tế đang dùng hay chỉ chuẩn bị sẵn.*

## Bước 2 — Tích luỹ `balance`

Mỗi lần có `Conversion` mới (từ import CSV hoặc custom conversion), `balance` của affiliate tự động tăng (hoặc giảm nếu là dòng âm/refund). Affiliate không cần làm gì ở bước này — chỉ cần quan sát số dư trên Dashboard tăng dần theo thời gian.

## Bước 3 — Điều kiện được phép bấm "Request Payment"

Nút "Request Payment" trên khối Payout chỉ **hiện/hoạt động** khi đủ điều kiện — điều kiện này được kiểm tra **cả ở giao diện lẫn ở backend** (middleware `check_can_create_invoice`), nên affiliate không thể lách bằng cách gọi thẳng API.

```
Điều kiện CHUNG (luôn bắt buộc):
    đã chọn phương thức thanh toán + điền đủ thông tin thanh toán
    VÀ balance > phí chuyển khoản (transfer_fee) của phương thức đó

Nếu affiliate là VIP (is_vip = true):
    → chỉ cần đủ điều kiện CHUNG là được, KHÔNG cần thêm gì

Nếu KHÔNG phải VIP, cần thêm CẢ 2:
    → số shop có ít nhất 1 conversion  >=  3   (mặc định, cấu hình qua MIN_TOTAL_PAID_CUSTOMERS)
    → balance                          >=  $50  (mặc định, cấu hình qua MIN_BALANCE_TO_CREATE_INVOICE)
```

### Ví dụ 1 — Affiliate CHƯA đủ điều kiện

> Affiliate Y (không VIP), đã điền payment info đầy đủ, `transfer_fee = $2`.
> - `balance = $45`
> - Số shop có conversion = 2 shop

Kiểm tra: `balance ($45) > transfer_fee ($2)` ✅ đủ điều kiện chung, nhưng vì không VIP nên cần thêm 2 điều kiện: `số shop (2) >= 3` ❌ **không đủ**. → **Nút "Request Payment" bị ẩn/khoá.** Dù `balance` đã vượt cả $50 hay chưa cũng không quan trọng nữa, vì điều kiện "số shop trả phí" đã không đạt.

### Ví dụ 2 — Affiliate ĐỦ điều kiện

> Affiliate Z (không VIP), đã điền payment info đầy đủ, `transfer_fee = $2`.
> - `balance = $80`
> - Số shop có conversion = 4 shop

Kiểm tra: `balance ($80) > transfer_fee ($2)` ✅, `số shop (4) >= 3` ✅, `balance ($80) >= $50` ✅ → **đủ cả 3 điều kiện** → nút "Request Payment" hoạt động, Z có thể gửi yêu cầu tối đa `$80` (hoặc ít hơn nếu tự nhập số tiền cụ thể).

### Ví dụ 3 — Affiliate VIP, chỉ cần điều kiện chung

> Affiliate W, `is_vip = true`, `balance = $30`, `transfer_fee = $2`, mới có 1 shop.

Kiểm tra: chỉ cần `balance ($30) > transfer_fee ($2)` ✅ → **đủ điều kiện ngay**, dù chỉ có 1 shop và `balance` chưa tới $50 — vì `is_vip` bỏ qua hoàn toàn 2 điều kiện về số shop/số dư tối thiểu.

## Bước 4 — Gửi yêu cầu thanh toán

Affiliate bấm "Request Payment" → modal xác nhận hiện phương thức, thông tin thanh toán, số dư, phí (nếu có), số tiền thực nhận dự kiến → xác nhận → `POST /api/invoices`. Có thể để trống số tiền (mặc định lấy toàn bộ `balance`) hoặc tự nhập số tiền cụ thể (miễn lớn hơn phí và không vượt quá `balance`).

Ngay sau khi tạo:
- Affiliate nhận email xác nhận "đã gửi yêu cầu thanh toán".
- `balance` bị **trừ ngay** đúng số tiền yêu cầu (xem chi tiết lý do ở [../07-invoicing-payments/00-overview-and-balance-mechanics.md](../07-invoicing-payments/00-overview-and-balance-mechanics.md)).
- Invoice xuất hiện ở trang Invoices, trạng thái `pending`.

## Bước 5 — Theo dõi / huỷ yêu cầu

Trên trang Invoices, affiliate thấy trạng thái từng yêu cầu (`pending` / `approved` / `completed` / `cancel`). **Chỉ huỷ được khi còn `pending`** — nút huỷ biến mất khi admin đã chuyển sang `approved` trở đi. Khi huỷ thành công, `balance` được hoàn lại, affiliate nhận email "yêu cầu đã bị huỷ".

## Lưu ý rủi ro: hardcode PayPal/Payoneer trên frontend

`PayoutBlock.vue` (component hiển thị điều kiện rút tiền) **hardcode cứng ID**: `payment_method_id === 1` được coi là PayPal (áp thêm điều kiện hiển thị "cần balance > $50 mới rút được"), `id === 2` được coi là Payoneer (hiển thị "không giới hạn tối thiểu"). Đây là hardcode ở tầng hiển thị (UI text), **không phải điều kiện thật** — điều kiện thật luôn là `InvoiceService::canCreateByUser` như mô tả ở Bước 3, áp dụng như nhau cho mọi payment method bất kể ID.

**Rủi ro cụ thể**: nếu admin xoá rồi tạo lại record PayPal trong bảng `payment_methods` (ID mới sẽ không còn là `1`), hoặc tạo thêm 1 method PayPal-like khác, dòng chữ điều kiện hiển thị trên UI cho affiliate sẽ **không khớp với ID thật** — có thể hiển thị nhầm thông báo "cần balance > $50" cho 1 method không phải PayPal, hoặc ngược lại. **QA nên test**: tạo mới 1 `PaymentMethod` tên "PayPal" (ID khác 1) → kiểm tra dòng chữ điều kiện hiển thị trên dashboard có đúng logic thật (`InvoiceService`) hay bị lệch theo hardcode ID cũ.
