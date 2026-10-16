# Cách tính số tiền hoàn — công thức và ví dụ

> File này là "máy tính" của nhóm resell: bước 1 tính ra khách được bao nhiêu, bước 2 chia số đó thành các khoản hoàn trên Shopify. Dùng khi cần trả lời "sao hoàn số này?". Cấu hình và journey khách xem [01-resell-box-mode.md](01-resell-box-mode.md) và [02-resell-items-mode.md](02-resell-items-mode.md). Tổng quan: [00-overview.md](00-overview.md).

## Bước 1 — Tính giá trị bán lại

```
BOX   : giá niêm yết của dòng box trên đơn (trước mọi giảm giá) × Value% / 100
ITEMS : với từng quà: giá HIỆN TẠI của quà trong store × Value% / 100
Làm tròn 4 chữ số thập phân (Shopify tự làm tròn theo đồng tiền).
```

Chỉ hoàn tiền, không có thuế, không có phí ship. Không có dòng sản phẩm nào bị refund hay restock trên Shopify; dòng box vẫn nằm nguyên trên đơn. Ghi chú của refund bắt đầu bằng "Buyback Refund | ..." để merchant nhận ra.


## Bước 2 — Chia tiền (phương thức "By store credit")

Số tiền X ở bước 1 được trả theo thứ tự ưu tiên:

```
(a) Trả ngược vào phần đã thanh toán bằng store credit của chính đơn (nếu có)
(b) Phần còn lại: "store credit gắn với đơn", tối đa bằng số tiền đơn còn "giữ"
      (đã thanh toán trừ đã hoàn)  → hiện trên đơn Shopify là một khoản hoàn
(c) Phần dư vượt quá: cộng thẳng vào tài khoản store credit của khách,
      không gắn với đơn (không hiện trên đơn)
Tổng (a)+(b)+(c) luôn bằng X.
```

Vì refund gửi kèm cờ cho phép hoàn vượt, Shopify không từ chối khi X lớn hơn số đã trả. Đơn bị coi là "0 đồng" (trả bằng ticket, giảm 100%) thì mọi thứ rơi vào (c).

Giới hạn: số dư store credit của khách sau khi hoàn không vượt 15.000 USD (quy đổi theo tiền của đơn), nếu vượt khách thấy "Refund would exceed customer store credit balance limit."

## Các ví dụ (Shop An, Value 80, BOX mode, box niêm yết 50 USD)

### Ví dụ 1 — Đơn thường (Bình)
Bình trả 50 USD bằng thẻ. X = 50 × 80% = **40**. Không có phần store credit trong đơn nên (a) = 0. Đơn còn giữ 50 nên (b) = 40, (c) = 0. Shopify hiện khoản hoàn 40 USD store credit trên đơn; số dư tài khoản Bình +40.

### Ví dụ 2 — Đơn có discount
Bình dùng mã giảm 30%, trả **35** USD. X vẫn là 50 × 80% = **40** (tính trên giá niêm yết, không phải 35). Đơn chỉ còn giữ 35: (b) = 35, (c) = 40 − 35 = **5** cộng thẳng vào tài khoản. Bình nhận 40, nhiều hơn đã trả 5.

### Ví dụ 3 — Đơn mua bằng store credit / ticket (Cường)
Cường dùng ticket Koin mua 3 box, giá niêm yết 25 USD mỗi box, Value 80: mỗi box X = 25 × 80% = 20, bán cả 3: **60**. Tổng đơn 0 đồng, không có giao dịch nào để hoàn: (a) = 0, (b) = 0, (c) = **60** vào tài khoản Shopify store credit. Trên đơn Shopify không xuất hiện khoản hoàn nào. Số dư Koin của Cường không đổi (Koin và Shopify là hai hệ thống riêng, xem [04-store-credit-and-tickets.md](04-store-credit-and-tickets.md)).

### Ví dụ 4 — Thanh toán hỗn hợp thẻ + store credit (Dung)
Dung mua box niêm yết 100 USD, trả 70 USD thẻ + 30 USD Shopify store credit. Value 90, X = **90**.
- (a) Phần store credit của đơn: min(90, 30) = **30** hoàn ngược về khoản thanh toán store credit.
- Còn 60. Đơn còn giữ: 100 − 30 = 70 nên (b) = **60**.
- (c) = 0. Tổng 30 + 60 = 90.
Dung nhận toàn bộ 90 dưới dạng store credit; thẻ không được hoàn tiền mặt.

### Ví dụ 5 — Đã có hoàn tiền trước đó (Dung, tiếp)
Merchant đã tự hoàn tay 60 USD tiền thẻ trên đơn của Dung (ví dụ 4, trước khi resell). Đơn còn giữ 100 − 60 = 40. Dung bán box với X = 50:
- (a) = min(50, 30) = 30.
- Còn 20; đơn còn giữ 40 − 30 = 10, nên (b) = **10**.
- (c) = 20 − 10 = **10** vào tài khoản.
Cộng lại 30 + 10 + 10 = 50.

### Ví dụ 6 — ITEMS bán từng phần (Bình)
Box bundle, Value 70, đơn Bình trả 40 USD thẻ. Quà A hiện 30, B hiện 20.
- Lần 1 bán A: 30 × 70% = **21**. Đơn giữ 40: (b) = 21, (c) = 0.
- Lần 2 bán B: 20 × 70% = **14**. Đơn còn giữ 19: (b) = 14, (c) = 0. Tổng 35.
- Nếu giữa hai lần giá B tăng lên 50: X = 35, đơn còn giữ 19: (b) = **19**, (c) = **16** (xem [02-resell-items-mode.md](02-resell-items-mode.md)).
- Bán hai bản sao của A cùng lúc: 21 + 21 = 42.

## Phương thức "original payment" (backend có, portal không cho chọn)

Tiền hoàn về lại thẻ trước, tối đa số đã thu và chưa hoàn; phần thẻ không hoàn được chuyển thành store credit theo quy tắc ở trên. Ví dụ đơn Dung (70 thẻ + 30 store credit) X = 90: 70 về thẻ, 20 về khoản store credit của đơn. *Hiện không merchant nào chọn được cách này từ portal; chỉ xuất hiện nếu dữ liệu box cũ có phương thức này.*

## Mỗi tiền tệ

Mỗi quà tính theo tiền của đơn; nếu chỉ có giá ở tiền khác, app quy đổi sang tiền của đơn trước khi cộng. *chưa xác nhận: tỷ giá lấy ở đâu.*

## Câu hỏi thường gặp

- **Khách nhận nhiều hơn đã trả?** Có thể (ví dụ 2, 3, 6), đây là hành vi theo công thức.
- **Hoàn có làm doanh thu dashboard giảm không?** Không, doanh thu dashboard không trừ hoàn buyback ([../06-merchant-app/02-dashboard-and-analytics.md](../06-merchant-app/02-dashboard-and-analytics.md)).
- **Khoản hoàn nằm ở đâu để đối soát?** Ghi chú refund "Buyback Refund | ..." trên đơn Shopify, và số dư store credit của khách. Với đơn 0 đồng chỉ có số dư tài khoản.
