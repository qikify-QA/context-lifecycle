# Quà được thêm vào đơn Shopify

> Bước cuối của box digital: app sửa đơn Shopify để thêm các quà đã trúng thành dòng sản phẩm giá 0. Đứng sau [reveal](02-reveal-journey.md) và [auto-unbox](03-auto-unbox.md). Box physical không đi qua bước này, xem [05](05-physical-vs-digital.md). Tổng quan nhóm: [00-overview](00-overview.md).

## Khi nào quà được thêm

Cần đủ cả ba điều kiện:

```
1. Mọi box digital của đơn đã mở
2. Resell window đã hết (hoặc box không bật buyback)
3. Đơn không bị khóa vì một lần resell đang chạy
Đủ → thêm quà. Thiếu → đơn ở lại QUEUED, chờ.
```

Ai kích hoạt:

| Tình huống | Khi nào quà vào đơn |
|---|---|
| Khách mở box cuối và resell window đã hết / không có | Ngay lập tức |
| Khách mở hết nhưng window còn | Job "sync" chạy lúc 00:00, 08:00, 16:00 (UTC mặc định) sau khi window hết; chỉ xét đơn có window hết trong 24 giờ qua. Trễ tối đa gần 8 giờ |
| Merchant mở qua Flow, hoặc auto-unbox | Ngay lập tức, không xét window |
| Support bấm "Retry Sync Winning Items & Boxes" | Ngay lập tức |

Quà **không** được thêm cho: box/quà đã resell; box physical.

## App làm gì với đơn (Shopify)

1. Bắt đầu một phiên sửa đơn (order edit).
2. Với mỗi loại quà trúng, thêm vào đơn **với giá gốc** rồi áp giảm giá 100% có mô tả "MYSBOX". Kết quả: quà hiện trên đơn với giá cuối 0.
3. Chốt (commit) phiên sửa. Mặc định app yêu cầu Shopify gửi email thông báo sửa đơn cho khách ("order edit notification"). Có một cấu hình ẩn để tắt email này; chưa thấy chỗ nào trong portal sửa được. *Chưa xác nhận: email có thực sự đến khách hay không còn phụ thuộc cài đặt thông báo của store.*
4. Đơn chuyển COMPLETED (xóa giờ auto-unbox và hạn resell). Nếu store bật "Enable Mysbox triggers in Shopify Flow" thì bắn trigger "Digital order synced" (kể cả khi không có quà nào để thêm).

Dòng box gốc trên đơn **giữ nguyên**; quà chỉ là các dòng thêm. Dòng quà chưa fulfill, merchant xử lý như hàng thường (gộp hoặc tách shipment). Đơn đã fulfill xong trước đó có thể cần fulfill lần hai cho phần quà. *Chưa xác nhận: Shopify có tính lại phí ship/thuế khi thêm dòng.*

### Đơn lớn

Ngưỡng tính theo số **loại quà khác nhau**, không theo số box (50 cái cùng một quà chỉ tính 1):

| Số loại quà | Cách làm |
|---|---|
| Tối đa 20 | Thêm trực tiếp trong một job thường |
| 21 đến 100 | Job dài (long-running), khoảng chục món mỗi lô |
| Trên 100 | Bulk operation của Shopify, hai pha (thêm món, rồi áp giảm giá), mất vài phút |

## Merchant thấy gì và ở đâu

| Chỗ | Dấu hiệu |
|---|---|
| Đơn Shopify, danh sách dòng | Dòng quà với giảm giá 100% "MYSBOX" (digital) |
| Trang đơn Shopify admin | Action "Open mystery box" > "Unbox all boxes" |
| Portal Mysbox, mục Orders | Danh sách đơn, số box, trạng thái fulfilment Shopify; "Open all boxes" ở trang chi tiết |
| Flow | Trigger "All box opened", "Digital order synced", "Order unboxing soon" |

Tag, note, metafield chỉ dành cho box physical, xem [05](05-physical-vs-digital.md). Với box digital merchant nhận biết quà qua chính các dòng thêm vào đơn.

## Vì sao có thể trễ

Lần lượt từ hay gặp:
1. Khách chưa mở hết box (và chưa tới giờ auto-unbox).
2. Resell window còn mở.
3. Job sync/auto-unbox chỉ chạy 3 lần/ngày.
4. Lần thêm trước bị lỗi (đơn FAILED).
5. Đơn dài hơn giới hạn 7 ngày của auto-unbox ([03](03-auto-unbox.md)).

## Khi thất bại

Mọi lỗi từ Shopify (ví dụ đơn không sửa được) làm đơn FAILED. Không có tình trạng làm dở một nửa: phiên sửa chưa commit sẽ bị bỏ, lần retry làm lại với đủ quà. Support retry trong admin nội bộ ([08-admin-panel/03-orders](../08-admin-panel/03-orders.md)). *Chưa xác nhận: hành vi trên đơn đã hủy, đã đóng hoặc hoàn tiền hết (dự kiến thất bại).* Một cờ ẩn của admin có thể bỏ qua hẳn bước sửa đơn (đánh dấu COMPLETED mà không động vào Shopify) cho vài merchant đặc biệt.

## Ví dụ: đơn của Bình

Từ [ví dụ 02](02-reveal-journey.md): Bình mở cả 3 box (Poster, Keychain, Poster) và bán lại Poster thứ nhất; resell window tới T3 10:05.
- T2 11:30: mở xong, window còn → chưa thêm gì.
- T3 08:00: job sync xét, window chưa hết → bỏ qua. T3 10:05 window hết.
- T3 16:00: job sync thấy window hết trong 24 giờ qua và mọi box đã mở. App thêm Keychain x1 và Poster x1 (Poster đã resell bị trừ), mỗi dòng giảm 100% "MYSBOX". Shopify gửi email thông báo sửa đơn cho Bình. Đơn COMPLETED.
- Trên đơn của Shop An: dòng 3 box gốc (60$) + 2 dòng quà giá 0. Quà chờ Shop An fulfill.
Nếu Bình không bán lại gì và Shop An nhấn "Unbox all boxes" lúc T2 14:00: vì cách này vẫn chờ window nên quà vào đơn cùng mốc T3 16:00 như trên. Nếu thay vào đó dùng Flow "Open all mystery boxes in an order", quà vào đơn ngay lúc T2 14:00 và Bình hết cơ hội resell.

## Câu hỏi thường gặp

- **Khách mở hết rồi, vì sao đơn Shopify chưa có quà?** Thường là resell window còn mở hoặc chờ job 8 giờ; xem mục "Vì sao có thể trễ".
- **Khách nhận mấy email?** Một email thông báo sửa đơn mỗi lần quà được thêm; không có email của Mysbox ở bước này. Email nhắc khách mở box là việc của Flow, xem [04-banners-and-emails](../07-automation-growth/04-banners-and-emails.md).
- **Đơn hiện FAILED?** Nhờ support bấm retry; quà không bị thêm trùng.
