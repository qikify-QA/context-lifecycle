# Box physical (sealed) và digital (instant)

> So sánh hai loại box ở từng bước của hành trình đơn hàng. Loại box chọn ở cài đặt box, xem [box types](../02-boxes/01-box-types.md). Tổng quan nhóm: [00-overview](00-overview.md).

## Bảng so sánh

| Bước | Digital ("Instantly opening box") | Physical ("Sealed box") |
|---|---|---|
| Mua và random | Như nhau: random ngay khi paid | Như nhau |
| Ai mở | Khách, merchant, Flow hoặc auto-unbox | Không ai online; hệ thống tự đánh dấu "đã mở" ngay sau khi random |
| Khách thấy | Khối Unbox, trang đơn, hiệu ứng, kết quả | Không thấy gì. Khối trên trang cảm ơn bỏ qua box physical. Merchant mô tả: "Prizes remain hidden until the order is delivered." |
| Quà vào đơn Shopify | Dòng giá 0 "MYSBOX" ([04](04-prizes-added-to-order.md)) | **Không bao giờ** thành dòng sản phẩm; chỉ ghi tag/note/metafield |
| Fulfil | Merchant fulfil các dòng quà thêm vào | Merchant gửi hộp kín; kho đọc quà từ thông tin trên đơn |
| Resell | Có (nếu bật) | Không |
| Recent pulls và share | Có | Không |
| Tồn kho quà | Chỉ đếm số quà trong box | App trừ tồn kho Shopify của variant quà trúng (mặc định bật) |

Đơn có cả hai loại thì mỗi loại đi đường riêng trong cùng một đơn.

## Hành trình box physical

Bước 1 — Random như box digital ([01](01-purchase-and-draw.md)), rồi hệ thống tự "mở" box.
Bước 2 — Khi **mọi** box physical của đơn đã được random xong, app chạy một lần các hành động hậu xử lý (kể cả khi một box rỗng vì hết hàng).
Bước 3 — Merchant nhìn thông tin quà trên đơn và đóng hộp.

## Hậu xử lý: merchant thấy gì trong Shopify

Cài đặt ở portal "General settings > Order prize information".

| Hành động | Mặc định | Kết quả trong Shopify |
|---|---|---|
| Trừ tồn kho (deduct inventory) | Bật | Giảm tồn kho mỗi variant quà trúng, lý do "correction", tại vị trí đầu tiên có fulfillment order. Variant không theo dõi tồn kho thì bỏ qua. Không có vị trí nào thì hành động lỗi và retry được |
| Tag đơn | Tắt | Mỗi quà một tag theo mẫu (mặc định `{{variant_title}}`), tối đa 40 ký tự mỗi tag |
| Note đơn | Tắt | Thêm một dòng vào ghi chú đơn, mẫu mặc định `{{id}}: {{quantity}}`, cách nhau bằng ` | ` |
| Metafield quà của đơn | Bật | Metafield `mysbox_prizes` (thuộc app): danh sách dòng (mặc định hai cột `sku`, `quantity`) hoặc dạng map khóa → giá trị. Có mẫu Flow tải về trong portal |
| Metafield mã quà | Luôn bật | Metafield `mysbox_prize_ids` dạng `{id variant: số lượng}`; hiện ở trang đơn Shopify admin qua khối "Mysbox prizes" với nút "View all" |

Chỗ điền mẫu: `{{id}}`, `{{quantity}}`, `{{sku}}`, `{{variant_title}}`, `{{product_title}}`. `{{title}}` **không** được hỗ trợ. Mẫu tag/note hiện chỉ đổi được bằng cấu hình, chưa có ô trên portal.

Mỗi hành động có trạng thái riêng (pending, processing, succeeded, failed); hành động failed được support retry bằng "retry physical box post processing" trong admin nội bộ, không ảnh hưởng hành động khác.

## Ví dụ

Shop An bán thêm "Box Figure" (physical) giá 30$. Khách Cúc mua 2 box, thứ Ba 09:00. Random cho ra Figure A (SKU `FIG-A`) và Figure B (SKU `FIG-B`). Cài đặt mặc định (tag/note tắt).
- 09:00: hệ thống tự mở 2 box; Cúc không thấy nút Unbox nào.
- Vài giây sau: tồn kho `FIG-A` và `FIG-B` mỗi cái giảm 1 (lý do "correction"). Metafield `mysbox_prizes` của đơn = `[{"sku":"FIG-A","quantity":1},{"sku":"FIG-B","quantity":1}]`. Metafield mã quà ghi id hai variant với số lượng 1.
- Kho đọc metafield (hoặc khối "Mysbox prizes") và cho đúng hai món vào hộp. Đơn Shopify không có dòng quà giá 0.
Nếu Shop An bật Tag với mẫu `{{sku}}` thì đơn có thêm tag `FIG-A` và `FIG-B`.

## Đơn lẫn hai loại

Bình mua 2 "Box Anime" (digital) và 1 "Box Figure" (physical) cùng đơn. Box Figure xử lý ngay (hậu xử lý). Hai Box Anime chờ Bình mở. Khi Bình mở xong và window hết thì chỉ quà Anime được thêm thành dòng giá 0; quà Figure không bao giờ xuất hiện ở dạng dòng.

## Câu hỏi thường gặp

- **Đơn physical không có tag?** Tag và note tắt mặc định; chỉ trừ kho và metafield bật sẵn.
- **Khách có biết mình trúng gì với box physical?** Không qua Mysbox; khách thấy khi mở hộp.
- **Trừ kho sai chỗ?** App chỉ trừ ở một vị trí (vị trí đầu tiên có fulfillment order); store nhiều kho cần lưu ý.
