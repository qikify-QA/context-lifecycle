# Trang Box (Publish, Versions, Inventory, Recent pulls)

> Box **không có mục menu riêng**: nhân viên đi vào qua tab **Boxes** của một Shop hoặc của một Order, rồi bấm View. Trang này cho xem toàn bộ trạng thái một box và có vài nút làm thay đổi cái mà khách thấy trên storefront. Thuộc nhóm [admin panel](00-overview.md); kiến thức về box ở [nhóm boxes](../02-boxes/00-overview.md).

## 1. Danh sách và trang View

Danh sách (qua tab của Shop): id, shop id, type, category (digital/physical), ngày publish, ngày tạo/cập nhật; lọc theo type và category.

Trang View gồm:

| Khối | Cho thấy |
|---|---|
| Overview | id, id biến thể Shopify, type, category, shop, **sync status** (completed xanh, syncing vàng, failed đỏ), version hiện tại |
| Tier configuration | picking mode, tier mode, "deactivate on empty", "draft on empty" |
| Setup, Timeline | settings + bundles (JSON), mốc thời gian |
| Tab **Versions** | mọi bản chụp của box; bản hiện tại có huy hiệu xanh; mở từng bản để xem chi tiết ([versions](../02-boxes/00-overview.md)) |
| Tab **Inventory** | trạng thái tồn kho/pool dùng để rút thưởng; xem chi tiết được ([inventory](../02-boxes/00-overview.md)) |
| Tab **Recent pulls** | mỗi dòng là một lần reveal ("Reveal action"): giờ, đơn, bundle, món, cờ test, ngày bị ẩn |

## 2. Nút và tác động thật lên shop

| Nút (quyền) | Điều kiện | Làm gì |
|---|---|---|
| **Publish** (publish) | Hiện khi box chưa publish. Có hộp xác nhận | Nếu sync chưa xong: báo "Box must finish syncing before it can be published." Với box Tier hết hàng: "Cannot publish: inventory pools are exhausted." Ngược lại box **được ghi lên Shopify ngay** (metafield của biến thể) và storefront bắt đầu bán. Shopify lỗi thì publish bị hủy |
| **Unpublish** (publish/unpublish) | Hiện khi đang publish | Storefront ngừng bán box ngay. **Khách đã mua vẫn mở được** box của mình |
| **Resync recent pulls** (resync) | Chỉ hiện khi box có pulls | Dựng lại feed "recent pulls" của box trên Shopify từ đầu, chạy nền. Lặp lại an toàn ([recent pulls](../07-automation-growth/03-recent-pulls.md)) |
| **Hide from recent pulls** / "Retry hiding" (hide recent pull) | Có hộp xác nhận | Ẩn **cả lần reveal** (mọi box nó chạm tới) khỏi feed công khai của **mọi** box liên quan. Nếu job gỡ bị lỗi, dòng đổi thành "Retry hiding" để thử lại |
| **Edit** (update) | Khóa khi đang publish | Sửa JSON settings/bundles. Chỉ ảnh hưởng đơn **mua sau đó** |
| **Configure Tier Settings** (update) | Chỉ box **Tier**, **chưa publish**, không đang syncing | Chọn Picking Mode (Draw hoặc "BasePool"), và với BasePool: Tier Mode (Shared: các pool refill cùng nhau / Independent: mỗi pool tự refill), "Draft product when empty", "Deactivate box when empty". Lưu xong hệ thống đồng bộ lại inventory và **tạo box version mới** |
| **Delete** (delete) | | Xóa box, gỡ metafield trên Shopify, xóa luôn inventory; versions còn lại nên đơn cũ vẫn chạy được. *chưa xác nhận: ngoài quyền thì có chặn gì khi box đã có đơn không — hỏi engineer trước khi xóa* |
| Xóa dòng ở tab Inventory (delete) | | **Nguy hiểm**: box không rút được cho tới khi dựng lại inventory (cần engineer) |

## 3. Hệ quả cần nhớ

- Publish/Unpublish là **ghi trực tiếp vào Shopify**, khác với khi merchant dùng portal (portal còn đi qua các kiểm tra riêng của API; panel tự lặp lại hai kiểm tra: sync xong, pool còn hàng).
- Capacity: shop Free chạm trần sẽ bị unpublish toàn bộ box (xem [02](02-shops-users.md)); admin publish lại từng box **không tự giải quyết** việc tiếp tục bán vượt capacity.
- Đơn đã mua trỏ vào **box version** lúc mua, nên sửa/xóa box không làm đổi kết quả đơn cũ ([versions](../02-boxes/00-overview.md)).

## Ví dụ: Chi publish lại box của Shop An

Shop An nâng lên plan Pro, nhưng box "Summer Mystery" vẫn chưa bán được. Chi vào Shops → Shop An → tab Boxes → View. Overview ghi sync status **completed**, ngày publish trống. Chi bấm **Publish → xác nhận**: thấy "Box published". Chi vào storefront của An và thấy widget đã hiện box. Với box Tier "Gacha Rare", Chi bấm Publish nhưng được báo "Cannot publish: inventory pools are exhausted." — pool hết quà, nên Chi nhắn An nạp thêm tồn kho (hoặc dùng refill, xem [pool refill](../02-boxes/06-pool-refill.md)) rồi mới publish.

Một ca khác: khách **Bình** thấy reveal của mình, có thông tin nhạy cảm, hiện trong feed recent pulls. Chi mở tab Recent pulls của box, tìm dòng đó và bấm **Hide from recent pulls**. Dòng biến mất khỏi feed của tất cả box mà lần reveal đó chạm tới.

## Câu hỏi thường gặp

- **Bấm Publish chỉ thấy báo lỗi?** Đọc chữ trong thông báo: hoặc đang syncing/failed, hoặc box Tier hết pool.
- **Unpublish có làm khách mất box đã mua không?** Không.
- **Sửa box đang publish được không?** Không; phải Unpublish trước.
- **Hide recent pull có xóa dữ liệu không?** Chỉ gỡ khỏi feed công khai; lịch sử vẫn nằm trong hệ thống.
