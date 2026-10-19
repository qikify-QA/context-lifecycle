# Store credit (Koin) và ticket

> File này nói về luồng khách mua box bằng Koin credit: đổi credit thành ticket, checkout 0 đồng, ticket bị trừ khi đơn được thanh toán, và quan hệ với store credit của Shopify ở phần resell. Nằm ở đầu hành trình mua ([../03-orders-and-reveal/01-purchase-and-draw.md](../03-orders-and-reveal/01-purchase-and-draw.md)). Tổng quan nhóm: [00-overview.md](00-overview.md).

## Hai loại credit, đừng lẫn

| | Koin credit | Shopify store credit |
|---|---|---|
| Là gì | Tài khoản credit của app Koin (hệ thống ngoài) | Số dư credit trong tài khoản khách Shopify |
| Dùng để | **Mua box** (đổi thành ticket) | Nhận tiền **resell**, tiêu ở shop |
| Mysbox làm gì | Trừ Koin khi khách mua | Cộng credit khi khách resell |
| Liên thông | Không tự quy đổi cho nhau | |

## Điều kiện merchant phải bật (Shop An)

1. General settings > Integration: "Store credit app" chọn Koin và lưu "Koin private API Key". Lưu xong app nhờ Shopify tạo một **automatic discount** làm box thành 0 đồng. *Việc tạo discount không báo lỗi nếu thất bại, support có thể phải tạo lại.*
2. Đặt block "Buy box by store credit" lên trang sản phẩm ([../02-boxes/07-storefront-widget-and-translations.md](../02-boxes/07-storefront-widget-and-translations.md)).
3. Trong box: bật "Allow purchase with store credit"; tuỳ chọn "Only allow store credit purchases" (khi bật, giỏ hàng bị dọn các dòng box không được giảm 100%).

## Journey của khách (Cường)

**Bước 1 — Trang sản phẩm.** Cường tích "Pay with store credit". Widget hiện "Balance", "Use balance", "Remaining balance" và dòng "The used credit amount will not be able to revert." Nếu số dư thấp hơn giá, tuỳ cấu hình merchant mà ô bị khoá hoặc ẩn.

**Bước 2 — Bấm Add to cart / Buy it now.** Thay vì thêm ngay, widget gọi app:
```
- Báo giá box theo quốc gia của Cường (số lượng 1 đến 50)
- Kiểm tra: box đã publish, là box store credit, còn đủ hàng
   ("Only N items available for purchase.")
- Trừ Koin = giá × số lượng
- Cộng số ticket của Cường cho box đó
- Cập nhật danh sách ticket ở thông tin khách trên Shopify
```
Lỗi từ Koin được hiển thị nguyên văn hoặc "Failed to debit store credit". Mỗi khách tối đa 20 lần mua mỗi phút.

**Bước 3 — Thêm vào giỏ như bình thường**, rồi checkout.

**Bước 4 — Checkout.** Automatic discount đọc danh sách ticket của khách: với mỗi dòng box, giảm 100% cho `min(số lượng trong giỏ, số ticket)` đơn vị, nhãn "Store credit discount". Tổng đơn 0.00 nếu ticket đủ.

**Bước 5 — Thanh toán xong.** Khi nhận đơn đã thanh toán, app xem các dòng mới có discount tự động 100% tên "Store credit discount" và trừ số ticket đúng bằng số lượng dòng. Sau đó quy trình box bình thường (draw, mở, resell).

**Bước 6 — Trang tài khoản khách** có khối "Items purchased with store credit" với nút "Add to cart" để mua lại.

## Ví dụ — Cường mua 3 box

Box 25 USD, số dư Koin của Cường 80.00.

| Bước | Koin | Ticket |
|---|---|---|
| Trước khi mua | 80.00 | 0 |
| Chọn số lượng 3, bấm Add to cart: trừ 25 × 3 = 75 | **5.00** | 3 |
| Checkout: 3 box giảm 100%, tổng 0.00 | 5.00 | 3 |
| Đơn được thanh toán | 5.00 | **0** |

Sau đó Cường resell 3 box (Value 80%): nhận 3 × 20 = 60 USD Shopify store credit, không trả lại Koin ([03-refund-amount-examples.md](03-refund-amount-examples.md), ví dụ 3). Cường đã bỏ 75 Koin, nhận 60 Shopify credit.

### Ví dụ — số ticket ít hơn số lượng trong giỏ
Cường còn 2 ticket nhưng thêm 3 box vào giỏ: 2 box được giảm 100%, box thứ 3 tính giá đầy đủ.

## Lưu ý vận hành

- **Ticket chỉ bị trừ khi đơn được thanh toán**, không phải khi thêm giỏ. Giỏ bị bỏ thì ticket vẫn giữ, mua sau vẫn dùng.
- Ticket tính theo từng box (variant), không theo phiên bản box.
- Đơn kết hợp dòng dùng ticket với dòng dùng mã giảm giá thường: *chưa xác nhận: ticket có thể bị trừ nhầm cho cả hai dòng*.
- Không có chức năng hoàn Koin khi huỷ đơn; xem [05-cancellations-and-refunds.md](05-cancellations-and-refunds.md).


## Câu hỏi thường gặp

- **Nút store credit không hiện?** Chưa chọn Koin hoặc thiếu key, box chưa bật "Allow purchase with store credit", chưa đặt block, hoặc số dư thấp hơn giá (nếu merchant chọn ẩn).
- **Khách dùng ticket mà vẫn bị tính tiền?** Automatic discount chưa được tạo (chọn lại Koin trong General settings để tạo) hoặc ticket ít hơn số lượng giỏ.
- **Khách dùng store credit có resell được không?** Có, đơn 0 đồng vẫn resell được, tiền hoàn là Shopify credit.
