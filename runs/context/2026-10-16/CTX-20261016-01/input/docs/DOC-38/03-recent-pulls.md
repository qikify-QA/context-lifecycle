# Recent pulls (feed "vừa trúng" ở trang sản phẩm)

> Dải thẻ tự cuộn trên trang sản phẩm box, cho người xem thấy người khác vừa trúng gì (social proof). Nằm trong nhóm [Tự động hoá và tăng trưởng](00-overview.md). Block hiển thị cùng các block khác ở [../02-boxes/07-storefront-widget-and-translations.md](../02-boxes/07-storefront-widget-and-translations.md); cách storefront đọc dữ liệu ở [../09-integrations/02-storefront-data-flow.md](../09-integrations/02-storefront-data-flow.md).

## Khách thấy gì

- Tiêu đề "Recent pulls" (sửa được ở Content & Translation → product → "Recent pulls heading").
- Dải thẻ cuộn ngang, mới nhất ở đầu, lấy từ các lượt reveal gần nhất của box digital đang xem. Mỗi thẻ: ảnh món (vuông hoặc tròn), tuỳ chọn tên / chance / giá, kèm chú thích "x minutes ago". Chance và giá **ẩn mặc định**.
- Một lượt mở nhiều món cho nhiều thẻ. Món không còn trong cấu hình box thì bị bỏ qua.
- Dữ liệu tính tại lúc tải trang, không tự làm mới.

## Bước 1 — Một lượt reveal xảy ra

App ghi một dòng lịch sử cho mỗi bundle digital đã mở. `[chỉ có trên staging]` thay đổi: ghi cho **mọi** shop (trước đó chỉ ghi khi feed bật). Box physical không bao giờ được ghi.

## Bước 2 — Publish ra storefront

Nếu "Show recent pulls" của shop BẬT, entry mới được thêm vào metafield của biến thể box (namespace `mysbox`): một trang "current" cố định mà theme đọc trực tiếp, cộng các trang cũ hơn. Mỗi trang tối đa 100 entry (và ~100 KB). Cập nhật bị giới hạn 1 lần/10 giây/box (6 lần/phút); lượt reveal dư vẫn được lưu và đi lên ở lần publish kế hoặc khi rebuild.

## Bước 3 — Merchant gắn block

Admin → "Instructions" → block "Mysbox recent pulls" → "Add block to theme editor" (chỉ template product). Panel trạng thái trên Dashboard cho biết block đã bật chưa.

## Ẩn danh

Feed công khai chỉ chứa: mã entry (băm một chiều từ mã reveal + box, nên không đối chiếu được giữa hai box), thời điểm mở (chính xác tới giây), và mỗi món chỉ có variant id + pool/tier id. **Không có** tên khách, email, order id hay số đơn. Ai mở trang sản phẩm cũng đọc được feed (chỉ qua Liquid, không có trong Storefront API).

Hạn chế đã chấp nhận: resell, hoàn tiền, huỷ đơn **không** được phản ánh (món đã bán lại vẫn nằm trong feed).

## Setting (Style Settings → "Recent pulls")

| Setting | Mặc định | Tác dụng |
|---|---|---|
| "Show recent pulls" | TẮT | Công tắc chính. Tắt: không publish lượt mới; feed đã publish vẫn ở đó đến khi bấm Resync |
| "Item image shape" | Square | Vuông / tròn |
| "Hide item name" | TẮT | Ẩn tên |
| "Hide item chance" / "Hide item price" | BẬT | Ẩn % / giá |
| "Image size" | 200 px (tối thiểu 20) | Cỡ ảnh thẻ |
| "Maximum items shown" | 10 (1-100) | Số thẻ hiển thị |
| `recent_pulls_visible_from` | không có | Lượt cũ hơn mốc này không publish/rebuild (không có màn hình) |
| `recent_pulls_publish_test_orders` `[chỉ có trên staging]` | TẮT | Bật thì gồm cả reveal của đơn test (cho demo); production luôn loại đơn test |

Đổi cấu hình **không** tự publish lại. Muốn áp dụng cho dữ liệu đã publish, admin bấm "Resync".

## Ẩn một dòng, rebuild, xoá (chỉ admin panel nội bộ)

Admin panel → Boxes → một box → tab "Recent pulls" (bảng lịch sử gom theo lượt reveal: thời điểm mở, order id, bundle index, items, test, giờ ẩn; phân trang 10/20/50/100).
- **"Hide"** (quyền `hide_recent_pull`): đánh dấu cả lượt reveal là ẩn cho mọi box nó chạm tới và gỡ entry khỏi feed. Dòng ẩn không bao giờ được rebuild đưa lại.
- **"Resync"** (quyền `resync_recent_pulls`): dựng lại mọi trang của box từ lịch sử, áp công tắc, cờ ẩn, quy tắc đơn test và mốc visible-from. Chạy hàng đợi, mỗi box một lần.
- Xoá box có lịch sử sẽ xoá feed đã publish. Nếu bộ trang bị hỏng hoặc quá lớn, hệ thống tự rebuild.
- Hai quyền trên không được seed sẵn; admin phải tạo và cấp.

## Ví dụ có số

Neon Box của Shop An bật feed, "Maximum items shown" = 10. Lúc 14:03:12, Bình mở 2 bundle bằng một cú bấm. Lịch sử lưu 2 dòng cùng mã reveal; một entry (box_count 2) được ghi vào trang "current" trong vài giây. Một khách tải trang lúc 14:05 thấy hai thẻ mới ở đầu với chú thích "2 minutes ago". Admin **Chi** thấy ảnh món hiếm bị chụp đăng công khai và bấm "Hide": entry biến mất khỏi trang cho lượt tải sau, lịch sử vẫn giữ dòng (đã ẩn).

## Giới hạn

Tổng số lượt mở trọn đời xấp xỉ số trang x 100; resell không phản ánh; một entry trên 128 KB không ghi được; khoá trang cũ không được dọn.

## Câu hỏi thường gặp

- **Dải trống?** "Show recent pulls" đã bật? Block đã thêm? Box digital? Đơn test (bị loại trừ)? Có `visible_from`? Sau khi bật công tắc, lượt cũ chỉ lên feed sau khi bấm Resync.
- **Khách muốn gỡ chiến tích?** Admin Hide lượt đó; dù sao feed không chứa tên hay order id.
