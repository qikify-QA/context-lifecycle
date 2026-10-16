# Resell — chế độ ITEMS (bán từng quà)

> File này nói về chế độ ITEMS: khách bán lẻ từng quà trong box, có thể bán nhiều lần cho đến hết hoặc hết hạn. Phần cấu hình chung, điều kiện, double-click xem [01-resell-box-mode.md](01-resell-box-mode.md); công thức chia tiền xem [03-refund-amount-examples.md](03-refund-amount-examples.md). Tổng quan: [00-overview.md](00-overview.md).

## Khác BOX ở đâu

| Điểm | BOX | ITEMS |
|---|---|---|
| Đơn vị bán | cả box một lần | từng quà (từng bản sao) |
| Giá dùng để tính | giá niêm yết của dòng box trên đơn | **giá hiện tại** của từng quà trong store (theo thị trường của khách) |
| Bán một phần | không | có, các lần sau bán tiếp phần còn lại |
| Box được tính "Resold" khi | bán xong | **tất cả** quà đã bán |
| Trong cấu hình | "Percentage on" = "Box price" | "Percentage on" = "Original item price" |

Công thức mỗi quà: `giá hiện tại của quà × Value%`. Mỗi bản sao tính riêng (2 bản sao của quà A = 2 lần tính).

## Journey của khách (Bình)

**Bước 1 — Mở box.** Bình mua box dạng bundle có hai quà: A (giá hiện tại 30 USD) và B (20 USD). Merchant đặt Value 70.

**Bước 2 — Bấm "Resell".** Popup liệt kê từng quà với "Resale price" riêng: A = 21.00, B = 14.00. Bình chỉ chọn A.

**Bước 3 — Xác nhận lần 1.** Nhận 21 USD. Box chưa là "Resold" vì B còn.

**Bước 4 — Còn trong cửa sổ resell**, Bình bán nốt B: nhận 14 USD. Giờ box mới là "Resold" (tổng 35 USD).

Nếu Bình bán cả A và B trong một lần: 35 USD, kết quả như nhau. Nếu Bình không bán B, B được thêm vào đơn Shopify như quà bình thường khi hết hạn ([../03-orders-and-reveal/04-prizes-added-to-order.md](../03-orders-and-reveal/04-prizes-added-to-order.md)); quà đã bán thì không được thêm.

## Điều kiện riêng của ITEMS

```
Đơn cần có thông tin quốc gia (địa chỉ giao, địa chỉ thanh toán, hoặc ngôn ngữ khách)
  → để biết giá theo thị trường nào.
  Đơn cũ thiếu thông tin → lỗi "No country codes available for order ..."
     cho đến khi kỹ sư chạy lệnh backfill (support cần engineer).
Quà không tìm được giá → lỗi "No price found for variant ..."
Số bản sao yêu cầu bán > số còn lại → "Not enough items ..."
```

Giá lấy theo thứ tự quốc gia: nước giao hàng, nước thanh toán, nước trong ngôn ngữ khách; ưu tiên giá cùng đơn vị tiền với đơn. Nếu chỉ có giá ở đồng tiền khác thì app tự quy đổi.

## Ví dụ — giá đổi giữa hai lần bán

Đơn của Bình trả 40 USD bằng thẻ. Value 70.

1. Lần 1 bán A (giá hiện tại 30): hoàn 21. Đơn còn "giữ" 40 − 21 = 19 USD.
2. Merchant tăng giá B lên 50 USD.
3. Lần 2 bán B: 50 × 70% = 35. Đơn chỉ còn 19 USD nên 19 là store credit gắn với đơn, 16 còn lại cộng thẳng vào tài khoản khách. Bình nhận tổng 21 + 35 = 56 USD, nhiều hơn 40 đã trả. Đây là hệ quả của giá "hiện tại", không phải giá lúc mua.

Cách chia 19 + 16 xem [03-refund-amount-examples.md](03-refund-amount-examples.md).


## Câu hỏi thường gặp

- **Bán một phần rồi hết hạn thì sao?** Phần chưa bán được thêm vào đơn như bình thường; phần đã bán giữ nguyên credit.
- **Hai lần bán có bị chặn không?** Không, miễn còn trong cửa sổ và còn quà; mỗi lần là một yêu cầu riêng, cùng cơ chế khoá như BOX.
