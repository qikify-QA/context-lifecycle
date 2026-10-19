# Orders và Reveal — tổng quan

> Nhóm này mô tả đoạn đường từ lúc khách bấm mua box đến lúc quà nằm trong đơn Shopify của merchant. Nó nằm giữa phần tạo box ([02-boxes](../02-boxes/00-overview.md)) và phần bán lại/hoàn tiền ([04-resell-refund-credit](../04-resell-refund-credit/00-overview.md)). Bức tranh toàn hệ thống ở [00-overview](../00-overview.md).

## Nhóm này làm gì, ai dùng

- **Khách** (ví dụ Bình): mua box, mở box (xem quà), có thể bán lại quà.
- **Merchant** (ví dụ Shop An): thấy đơn trong Shopify và trong portal của app; có thể mở box thay khách, bật auto-unbox, nhận quà đã được thêm vào đơn để đóng gói.
- **Hệ thống**: random quà ngay khi đơn được thanh toán, tự mở box khi đến hạn, thêm quà vào đơn Shopify.

## Sơ đồ tổng quát

```
Khách mua box ──► đơn "paid" ──► RANDOM quà (vài giây)  ◄── quà đã chốt, không đổi nữa
                                      │
              ┌───────────────────────┴────────────────────────┐
              ▼                                                ▼
        Box DIGITAL (mở tức thì)                        Box PHYSICAL (sealed)
   khách / merchant / Flow / auto-unbox mở         hệ thống tự "mở" ngay, khách không thấy
              │                                                │
   mở hết box + hết resell window                   ghi tag / note / metafield,
              ▼                                      trừ tồn kho (cho kho đóng gói)
   Thêm quà vào đơn Shopify (giá 0, "MYSBOX")
```

Ba điều cần nhớ:
1. **Random xảy ra lúc thanh toán, không phải lúc mở.** "Mở box" chỉ là cho khách xem kết quả đã chốt.
2. **Resell window bắt đầu từ lúc random**, không phải từ lúc khách mở.
3. **Quà chỉ vào đơn Shopify khi mọi box digital của đơn đã mở VÀ resell window đã hết** (hoặc box không có resell). Merchant mở / Flow mở / auto-unbox thì thêm ngay, bỏ qua resell window.

## Mục lục

| File | Nội dung |
|---|---|
| [01-purchase-and-draw.md](01-purchase-and-draw.md) | Khách mua, đơn paid, random quà, trạng thái đơn khách và merchant thấy |
| [02-reveal-journey.md](02-reveal-journey.md) | Các cách mở box, màn hình reveal, hiệu ứng, đơn nhiều box, mở một phần |
| [03-auto-unbox.md](03-auto-unbox.md) | Cấu hình, giờ chạy, điều kiện, giới hạn 7 ngày, timeline ví dụ |
| [04-prizes-added-to-order.md](04-prizes-added-to-order.md) | Bước thêm quà vào đơn giá 0, vì sao có thể trễ, email, lỗi |
| [05-physical-vs-digital.md](05-physical-vs-digital.md) | So sánh box sealed và instant ở từng bước, tag/note/metafield |

## Từ vựng nhóm

| Từ | Nghĩa |
|---|---|
| Draw / random | Lúc app chọn quà cho từng box, phía server, ngay sau khi đơn paid |
| Reveal / unbox / open | Cho khách xem quà đã chọn (hiệu ứng + màn hình kết quả) |
| Digital box ("Instantly opening box") | Khách xem quà online ngay sau khi mua |
| Physical box ("Sealed box") | Quà giấu kín, merchant gửi hộp kín |
| Resell window | Khoảng thời gian khách được bán lại quà; merchant đặt ở "Buyback limit time" (giờ) |
| Sync | Bước app sửa đơn Shopify để thêm quà vào |
| Opening request | Dòng nội bộ "N box của variant V trong đơn O"; nhân viên support thấy tên này trong admin nội bộ |

## Ví dụ chạy xuyên suốt trong nhóm

Shop An bán "Box Anime" (digital, 3 quà khả dĩ) giá 20$. Khách Bình mua 3 box, thanh toán lúc 10:05 thứ Hai. "Buyback limit time" = 24 giờ, "Auto-unbox after" = 2 giờ. Ví dụ này được dùng lại trong các file 01-04.
