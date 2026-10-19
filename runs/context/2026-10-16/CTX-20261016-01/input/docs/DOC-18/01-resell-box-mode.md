# Resell — cấu hình và chế độ BOX (bán cả box)

> File này mô tả merchant cấu hình resell thế nào, điều kiện để khách resell được, khách thấy gì từng bước, và riêng chế độ BOX. Chế độ ITEMS ở [02-resell-items-mode.md](02-resell-items-mode.md); công thức tiền ở [03-refund-amount-examples.md](03-refund-amount-examples.md). Tổng quan nhóm: [00-overview.md](00-overview.md).

## Bước 1 — Merchant cấu hình (Shop An)

**Trên từng box** (màn hình sửa box, mục "Buy back function"; chỉ sửa được trên gói trả phí):

| Cài đặt (nhãn UI) | Lựa chọn | Mặc định | Ý nghĩa |
|---|---|---|---|
| "Enable buyback for this box" | bật/tắt | tắt | Công tắc chính. Cần thêm phương thức và % > 0 mới có hiệu lực |
| "Buyback method" (chỉ box dạng bundle) | "Buy back the entire bundle only (coming soon)" bị khoá / "Buy back individual items in the bundle" | từng quà | Hiện chỉ chọn được từng quà |
| "Refund method" | "By cash (coming soon)" bị khoá / "By store credit" | store credit | Credit được cộng vào tài khoản khách, chỉ dùng ở shop |
| "Trading price" > "Value" | số, tối thiểu 1 | 80 (%) | % áp lên giá bên dưới |
| "Trading price" > "Percentage on" | "Original item price" / "Box price" | Original item price | **Box price = BOX mode**, Original item price = ITEMS mode. Box dạng bundle không chọn được "Box price" |

*Backend còn hỗ trợ trả về phương thức thanh toán gốc (card), nhưng portal không cho chọn.*

**Trên cả shop** (General settings > Buyback): "Duration for customers to resell from order is created" (nhãn "Buyback limit time"), đơn vị giờ, mặc định 24, tối thiểu 1. Chỉ gói trả phí sửa được. Giá trị này được đọc **lúc draw**, nên đổi chỉ áp cho đơn mới. Cấu hình % và phương thức cũng được "đóng băng" theo phiên bản box tại lúc mua, nên sửa box không đổi đơn cũ ([../02-boxes/03-versions.md](../02-boxes/03-versions.md)).

*Giới hạn gói chỉ chặn ở giao diện portal; server không kiểm tra gói khi lưu hay khi resell.*

## Bước 2 — Điều kiện để khách resell được

```
Tất cả phải đúng tại thời điểm bấm:
  - Box là digital, buyback bật ở phiên bản box, cửa sổ resell còn hạn
  - Box đã mở (hoặc đã qua giờ auto-unbox) và chưa bán
  - Đơn Shopify chưa bị huỷ, chưa đóng, và "refundable"
      (đơn 0 đồng, ví dụ trả bằng ticket, vẫn được)
  - Shopify còn đủ số lượng chưa fulfill/chưa refund trên dòng box
  - Số dư store credit của khách sau khi hoàn không vượt 15.000 USD (quy đổi)
Sai một điều → khách thấy thông báo lỗi tương ứng (ví dụ "Order has been cancelled.")
```

Box vật lý (physical) không bao giờ resell được. Khi đơn chuyển sang COMPLETED (merchant mở hộ, auto-unbox, Flow) thì cửa sổ resell đóng ngay ([../03-orders-and-reveal/04-prizes-added-to-order.md](../03-orders-and-reveal/04-prizes-added-to-order.md)).

## Bước 3 — Khách (Bình) resell

1. Trang đơn hàng hiện nút "Resell" chỉ khi có thứ bán được; kèm đếm ngược "Time left". Hết giờ trang tự tải lại và nút biến mất. Màn hình winner cũng có "Resell".
2. Popup "Resell selected items for store credit. Time left: ...", mỗi quà có "Available quantity", ô chọn số lượng, "Resale price"; cuối popup "Total resale price"; nút "Resell" và "Cancel".
3. Bình xác nhận. Thành công: toast "Resell successfully!" và số tiền đã hoàn; lỗi: "Resell unsuccessfully!" hoặc câu của server.
4. Box đã bán có nhãn "Resold". Credit nằm ở số dư store credit trong trang tài khoản khách Shopify.

Quà đã bán **không** được thêm vào đơn. Với box nhóm bật refill, quà bán lại có thể quay về kho ([../02-boxes/06-pool-refill.md](../02-boxes/06-pool-refill.md)). Merchant có thể nhận trigger Flow "Resell completed" ([../07-automation-growth/01-shopify-flow.md](../07-automation-growth/01-shopify-flow.md)).

## Chế độ BOX

Khách phải bán **cả box** một lần (không bán lẻ). Số tiền = giá niêm yết của dòng box trên đơn × Value%. Công thức đầy đủ và ví dụ: [03-refund-amount-examples.md](03-refund-amount-examples.md).

### Ví dụ — Shop An cấu hình BOX 80%

Shop An bán box giá 50 USD, "Value" 80, "Percentage on" = "Box price". Bình mua và mở box. Trong 24 giờ, Bình bấm "Resell": nhận 40 USD store credit, box đánh dấu "Resold". Nếu Bình mua 2 box cùng đơn và chỉ bán 1, vẫn được; mỗi box là một lần bán riêng (mỗi box 40 USD).

## Double-click (bấm hai lần)

Bình bấm "Resell" hai lần liên tiếp thì thường chỉ một lần được hoàn:

- Lần bấm thứ hai trong khoảng 2 giây thấy "Another resell operation is in progress for this order. Please try again in a moment."
- Trong lúc tiền đang được chuyển có cờ khoá riêng: "Order resell is already being processed".
- Nếu lần đầu xong rồi: "This box has already been resold."
- Mỗi đơn tối đa 20 lần resell mỗi phút.


## Câu hỏi thường gặp

- **Sao nút "Resell" không hiện?** Hết hạn, box chưa mở, đơn đã COMPLETED, đơn bị huỷ/đóng, hoặc box đó tắt buyback lúc đơn được draw.
- **Merchant sửa % thì đơn cũ đổi không?** Không, đơn cũ dùng cấu hình đã đóng băng.
- **Có gia hạn cửa sổ được không?** Không có thao tác gia hạn; chỉ đơn mới theo giá trị mới.
