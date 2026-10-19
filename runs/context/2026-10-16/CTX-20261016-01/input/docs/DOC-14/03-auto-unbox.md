# Auto-unbox

> Tính năng tự mở box khi khách không quay lại, để quà vẫn vào đơn Shopify và merchant đóng gói được. Nằm sau [random](01-purchase-and-draw.md), cạnh [các cách mở khác](02-reveal-journey.md). Tổng quan nhóm: [00-overview](00-overview.md).

## Cấu hình của merchant

Portal: General settings > Auto-Unbox.

| Cài đặt (nhãn trên màn hình) | Mặc định | Ý nghĩa |
|---|---|---|
| "Enable auto-unbox" | Tắt | Tự mở mọi box trong đơn đã xác nhận sau một độ trễ. Chỉ đơn **tạo sau khi bật** mới có giờ auto-unbox |
| "Auto-unbox after" (giờ) | 2 (giá trị form) | Độ trễ tính từ lúc tạo đơn |
| "Enable auto-unbox trigger" | Tắt | Bắn trigger Flow "order unboxing soon" trước giờ auto-unbox để merchant gửi email nhắc khách |
| "Trigger before" (giờ) | 1 | Bắn trước giờ auto-unbox bao lâu |

Giờ auto-unbox được ghi **một lần** lúc đơn được tạo. Box thêm vào đơn sau (paid lại) không được ghi giờ mới.

## Hệ thống chạy khi nào

Có hai job định kỳ (giờ máy chủ, cấu hình mặc định UTC):

| Job | Lịch | Việc |
|---|---|---|
| Quét mở box | Mỗi 8 giờ: 00:00, 08:00, 16:00 | Mở box cho các đơn đủ điều kiện |
| Gửi trigger nhắc | Mỗi giờ, phút 30 | Bắn trigger "order unboxing soon" cho đơn sắp tới giờ; mỗi đơn chỉ bắn một lần |

Nên box được mở ở lần quét **đầu tiên sau giờ auto-unbox**, trễ tối đa gần 8 giờ. Trigger nhắc có thể trễ tối đa 1 giờ.

## Điều kiện để một đơn bị auto-unbox

```
Tất cả cùng đúng:
  - đơn còn QUEUED (chưa hoàn tất)
  - không có resell đang chạy dở
  - giờ auto-unbox nằm trong 7 ngày gần nhất
  - còn ít nhất 1 box digital chưa mở
  - hạn resell: trống, hoặc đã hết VÀ nằm trong 7 ngày gần nhất
Nếu sai bất kỳ điều kiện nào → quét bỏ qua đơn này (lần quét sau xét lại)
```

Hệ quả:
- **Auto-unbox chờ resell window hết.** Box có buyback thì không bị mở trong lúc khách còn bán lại được.
- **Giới hạn 7 ngày:** đơn có giờ auto-unbox hoặc hạn resell đã quá 7 ngày thì không bao giờ được auto-unbox nữa. Nếu resell window dài hơn (7 ngày trừ độ trễ auto-unbox) thì đơn đó sẽ không tự mở được *(suy ra từ điều kiện quét, chưa chạy thử)*.
- Khi quét mở, quà được **thêm vào đơn Shopify ngay** (bỏ qua resell window vì lúc này đã hết) và đơn thành COMPLETED, xem [04](04-prizes-added-to-order.md).

## Cái khách thấy trước khi quét chạy

Ngay khi qua giờ auto-unbox, storefront đã hiển thị quà như đã mở và cho resell, dù job chưa mở thật. Trước đó, đơn có đếm ngược "Auto-open in: {time}", và banner "Unbox now before your mystery boxes are auto-unboxed."

## Timeline ví dụ

Cài đặt Shop An: auto-unbox after 2 giờ, trigger before 1 giờ, "Buyback limit time" 24 giờ, box bật buyback. Bình trả tiền thứ Hai 10:05.

| Mốc | Chuyện gì xảy ra |
|---|---|
| T2 10:05 | Random; giờ auto-unbox 12:05; giờ trigger 11:05; hạn resell T3 10:05 |
| T2 11:30 | Job giờ-phút-30 bắn "order unboxing soon"; Flow của Shop An gửi email cho Bình |
| T2 12:05 | Storefront hiển thị quà như đã mở, Bình vẫn resell được |
| T2 16:00 | Quét bỏ qua đơn (resell window còn mở) |
| T3 08:00 | Quét bỏ qua (hạn resell 10:05 chưa tới) |
| T3 16:00 | Quét thấy đủ điều kiện; mở 3 box, thêm quà vào đơn ngay, đơn COMPLETED |

Cùng khách nhưng box **không bật buyback**: quét T2 16:00 mở luôn.

Ví dụ giới hạn 7 ngày: "Buyback limit time" = 240 giờ (10 ngày). Hạn resell tới T+10 ngày; lúc đó giờ auto-unbox (T+2 giờ) đã quá 7 ngày nên đơn không bao giờ được quét. Quà chỉ vào đơn khi khách tự mở hết rồi cron thêm-quà xử lý (xem [04](04-prizes-added-to-order.md)), hoặc support xử lý tay.

## Câu hỏi thường gặp

- **Auto-unbox không mở box của khách?** Kiểm tra: tính năng đã bật *trước* khi đơn được tạo chưa; resell window đã hết chưa; có trong 7 ngày không; và quét chỉ chạy 3 lần/ngày.
- **Vì sao box mở trễ hơn "Auto-unbox after"?** Vì quét 8 giờ một lần và phải đợi resell window.
- **Khách có thể resell sau khi auto-unbox mở không?** Không; đơn đã chốt.
