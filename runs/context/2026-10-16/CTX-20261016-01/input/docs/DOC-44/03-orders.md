# Màn Orders (đơn, retry, winning bundles)

> Màn Orders cho nhân viên thấy **đơn mua box** của mọi shop, kiểm tra khách đã trúng gì/đã mở chưa, và **chạy lại** hai bước hay kẹt: đưa quà vào đơn Shopify, và hậu xử lý box vật lý. Thuộc nhóm [admin panel](00-overview.md). Luồng nghiệp vụ nằm ở [orders & reveal](../03-orders-and-reveal/00-overview.md).

## 1. Danh sách

Mới nhất ở trên. Tìm theo id, id đơn Shopify, id shop.

| Cột | Ý nghĩa |
|---|---|
| id, shop id, Shopify order id, order name (ví dụ "#1042") | Định danh |
| customer ids, test | Khách; cờ đơn test |
| total boxes, **boxes opened** | Tổng box mua / đã mở |
| currency, presentment currency, total price | Tiền của đơn |
| revenue (tiền shop, USD, tiền khách) | Doanh thu quy đổi |
| **resell processing at** | Thường trống; có giá trị khi đang hoàn/bán lại box, hoặc **kẹt** |
| Shopify created, created, updated | Mốc thời gian |

Filter: **Test orders** (có/không), **Partner Development Status** (mặc định chỉ thấy shop thật), khoảng ngày tạo, khoảng ngày cập nhật.

Không có nút tạo/sửa/xóa đơn; đơn chỉ do webhook của Shopify tạo.

## 2. Trang một đơn

Có nút **Go to Shop** và menu **Actions**:

| Action (quyền) | Thực sự làm gì |
|---|---|
| **Retry Sync Winning Items & Boxes to Shopify Order** (retry sync) | Thêm các món trúng chưa có trên đơn Shopify thành dòng hàng **giảm 100%**. Không làm gì nếu không còn gì để thêm. Đơn ≤ 20 biến thể quà khác nhau chạy ngay trên queue thường; 21–100 qua queue chậm; > 100 dùng chế độ bulk của Shopify (vài phút, nhiều bước). **Lặp lại an toàn**: dòng đã sync được bỏ qua |
| **Retry Physical Box Post-Processing** (retry physical) | Chỉ cho box **vật lý**. Xếp lại hàng đợi **chỉ những bước đang Failed** (trừ tồn kho, gắn tag đơn, ghi note đơn, metafield quà, prize ids). Bước đã Succeeded không chạy lại |

Các section: Ids, Details, Timestamps, và với box vật lý có thêm **"Physical Box Post-Processing"** gồm 5 huy hiệu Inventory, Tag, Note, Metafield, Prize Ids (Pending khi chưa có ghi nhận; rê chuột vào Failed để xem lỗi).

Ý nghĩa vào việc retry: [bước đưa quà vào đơn](../03-orders-and-reveal/04-prizes-added-to-order.md) và [box vật lý](../03-orders-and-reveal/05-physical-vs-digital.md).

## 3. Tab Boxes trên đơn

Mỗi dòng là một dòng box của đơn:

| Cột | Ý nghĩa |
|---|---|
| id, Shopify order id, variant, box id, **box version** | Box nào, phiên bản nào lúc mua ([versions](../02-boxes/00-overview.md)) |
| quantity, **total opened** | Mua bao nhiêu, đã mở bao nhiêu |
| **status** | QUEUED = chưa đưa hết quà vào đơn (đơn mở hết vẫn QUEUED suốt cửa sổ resell); PENDING = đang thêm quà *ngay lúc này*; COMPLETED = quà đã vào đơn; FAILED = lần thêm gần nhất lỗi → dùng Retry Sync |
| auto-unbox time | Giờ hệ thống tự mở (nếu cấu hình) — xem [auto-unbox](../03-orders-and-reveal/03-auto-unbox.md) |
| **view winning bundles** | Pop-up liệt kê từng bundle đã rút: món, pool, xác suất, ngày bán lại, dùng dữ liệu Shopify hiện tại (tên, giá, còn hàng) |

Dùng tab này để trả lời "khách trúng gì và đã mở chưa" mà không cần hỏi merchant.

## 4. Những thứ KHÔNG làm được ở đây

- Tạo, sửa, xóa đơn; hoàn tiền hay bán lại thay khách.
- Chạy lại webhook khác ngoài "order paid" (nút này nằm ở trang Shop, xem [02](02-shops-users.md)).
- Mở lại box, kích Flow trigger, rebuild pool — cần engineer, xem [07](07-scheduled-jobs-and-ops.md).

## Ví dụ: Chi xử lý đơn #1042 của Shop An

Khách **Bình** mua 2 box trên Shop An, mở cả hai lúc 9:00. Cửa sổ resell 24 giờ đóng lúc 9:00 hôm sau. Job tự thêm quà chạy mỗi 8 giờ (00:00, 08:00, 16:00 giờ máy chủ), nên quà có thể lên đơn muộn tới 8 giờ sau khi cửa sổ đóng ([xem job](07-scheduled-jobs-and-ops.md)). Lúc 9:30 hôm sau An hỏi: "sao đơn chưa có quà?".

**Bước 1.** Chi mở Orders, tìm "#1042", thấy `boxes opened = 2/2`, `resell processing at` trống.
**Bước 2.** Tab Boxes: status vẫn QUEUED; "view winning bundles" cho thấy Bình trúng 3 món, không món nào bán lại.
**Bước 3.** Chi bấm **Retry Sync Winning Items & Boxes to Shopify Order**. Đơn có 3 biến thể quà (≤ 20) nên chạy ngay.
**Bước 4.** Vài giây sau, đơn Shopify có 3 dòng giảm 100%; status chuyển COMPLETED. Bấm lại lần hai cũng không nhân đôi dòng.

Nếu thay vào đó `resell processing at` có giá trị từ hôm qua: có thể một lần bán lại bị kẹt — đừng retry sync, báo engineer.


## Câu hỏi thường gặp

- **Retry sync bấm rồi mà không có gì?** Không còn món nào chưa sync (hoặc chưa có món nào được mở/rút).
- **Bấm Retry Sync khi cửa sổ resell còn mở được không?** Nút không tự kiểm cửa sổ resell. *chưa xác nhận: hệ quả khi đưa quà vào đơn trước khi cửa sổ đóng; nên chỉ bấm sau khi cửa sổ đã đóng.*
- **Retry post-processing không chạy bước tag?** Bước đó không ở trạng thái Failed (chỉ Failed được xếp lại).
- **Đơn test có hiện ở đây?** Có, lọc bằng "Test Orders".
