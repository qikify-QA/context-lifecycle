# Mua box và random quà

> Bước đầu của hành trình đơn hàng: khách thanh toán, app nhận đơn và chốt quà. Xem tổng quan nhóm ở [00-overview](00-overview.md). Bước sau là [mở box](02-reveal-journey.md).

## Bước 1 — Khách mua box

Không có trang checkout riêng của Mysbox. Khách dùng checkout Shopify bình thường (thẻ, ví, mã giảm giá). Mã giảm giá chỉ làm dòng box rẻ hơn; riêng việc hoàn tiền khi resell tính theo giá niêm yết của box, không theo giá đã trả (xem [03-refund-amount-examples](../04-resell-refund-credit/03-refund-amount-examples.md)).

Có một đường thanh toán phụ bằng store credit (cần app Koin), xem [04-store-credit-and-tickets](../04-resell-refund-credit/04-store-credit-and-tickets.md).

Điều kiện để app tạo box cho đơn:

```
Đơn đã thanh toán (paid)?
  không → chưa có gì; trang cảm ơn báo "You cannot unbox the box online because the order has not been paid yet."
  có → trong đơn có variant là box đã Publish?
        không → app bỏ qua đơn hoàn toàn
        có → đơn có thông tin customer?
              không → tạo box thất bại
              có → sang Bước 2
```

Đơn từ kênh khác (POS, kênh ngoài) không gửi thông báo "paid" bình thường có thể được đưa vào bằng action Flow "Handle paid order from external sales channel with mystery boxes" (xem [Shopify Flow](../07-automation-growth/01-shopify-flow.md)).

## Bước 2 — App nhận đơn và chốt quà (draw)

Vài giây sau khi paid, Shopify báo cho app. App làm theo thứ tự:

1. Tạo/cập nhật khách và bản ghi đơn.
2. Ghi usage để tính phí merchant ([billing](../05-plans-billing/02-usage-pricing.md)).
3. Tạo một "opening request" cho mỗi variant box được mua.
4. Một worker chạy **lần lượt từng variant** (để hai người mua cùng lúc không lấy trùng món cuối cùng) và random quà cho mọi request theo thứ tự mua.
5. Worker dùng **phiên bản box đã đóng băng lúc mua** ([versions](../02-boxes/03-versions.md)). Merchant sửa box sau đó không ảnh hưởng đơn cũ.

Kết quả lưu theo từng box: mỗi box có một "bundle" chứa các quà của nó, kèm hai mốc thời gian:
- **Hạn resell** = giờ random + "Buyback limit time" (chỉ khi box bật buyback).
- **Giờ auto-unbox** = giờ tạo đơn + "Auto-unbox after" (chỉ khi store bật auto-unbox; xem [03-auto-unbox](03-auto-unbox.md)).

Nếu một box hết hàng sau lần random này, trigger Flow "box sold out" được bắn; box tier có thể bị chuyển draft hoặc deactivate theo cài đặt ([pool refill](../02-boxes/06-pool-refill.md)).

### Trùng và sửa đơn

- Cùng một thông báo paid đến hai lần: không làm gì thêm.
- Merchant sửa đơn thêm box rồi Shopify báo paid lại: chỉ phần box tăng thêm thành request mới.
- Giảm số lượng: không làm gì.

### Đơn preview / test

Đơn test của Shopify có tag `mysbox-preview-order` chạy đủ luồng random nhưng không trừ tồn kho quà, để merchant thử an toàn. Đơn test thường vẫn trừ kho; chỉ bị loại khỏi tính phí nếu store chọn loại đơn test.

## Bước 3 — Trạng thái đơn mà các bên thấy

Khách và merchant không thấy trạng thái nội bộ; chỉ nhân viên support thấy trong admin nội bộ ([08-admin-panel/03-orders](../08-admin-panel/03-orders.md)).

| Trạng thái nội bộ | Nghĩa | Ghi chú |
|---|---|---|
| QUEUED (mặc định) | Đơn có box, quà chưa được thêm vào đơn Shopify | Có thể kéo dài rất lâu (cả thời gian mở + resell) |
| COMPLETED | Quà đã thêm vào đơn Shopify (hoặc không có gì để thêm) | Xóa giờ auto-unbox và hạn resell của đơn |
| FAILED | Sửa đơn Shopify bị lỗi | Support retry bằng "Retry Sync Winning Items & Boxes" |
| Mở lại | Đơn COMPLETED được thêm box (paid lần nữa) quay về QUEUED | |

Khách thấy bộ lọc khác, ở trang đơn của khách: "All", "Not unboxed yet", "Unboxed". Một box tính là "Unboxed" khi đã mở, và cả khi đã quá giờ auto-unbox dù hệ thống chưa kịp mở ([03-auto-unbox](03-auto-unbox.md)).

Merchant thấy trong Shopify: đơn bình thường với các dòng box; sau này thêm các dòng quà. Trong portal Mysbox mục Orders: danh sách đơn với số box và trạng thái fulfilment Shopify.

## Ví dụ: đơn của Bình

Thứ Hai 10:05 Bình trả 60$ cho 3 "Box Anime" (20$ x 3).
- 10:05: Shopify báo paid; app tạo 1 request "3 box".
- ~10:05 (vài giây): worker random 3 bundle, ví dụ Poster, Keychain, Poster. Hạn resell = thứ Ba 10:05. Giờ auto-unbox = thứ Hai 12:05.
- Trạng thái đơn: QUEUED. Bình chưa mở gì, quà trong đơn Shopify vẫn chưa có.
- Nếu trang cảm ơn chưa thấy đơn sau 30 giây: Bình thấy "Please come back later after 30 minutes on this order status page to open your box."

## Câu hỏi thường gặp

- **Khách nói đã trả tiền nhưng không có nút Unbox?** Có thể draw chưa chạy (trang hiện "Please wait.."), đơn chưa paid, box là physical, variant chưa Publish lúc mua, hoặc nhận đơn thất bại (khách guest không có customer). Support kiểm tra đơn trong admin nội bộ rồi retry.
- **Box hết hàng mà vẫn bán được?** Widget chỉ hiển thị tồn kho, không chặn mua. Đơn vẫn được nhận nhưng số quà ít hơn số box; box thiếu là box rỗng, không mở được.
