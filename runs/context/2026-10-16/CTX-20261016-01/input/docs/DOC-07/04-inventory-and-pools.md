# Tồn kho, pool, sold-out và hiển thị tồn kho

> Tồn kho của box hoạt động thế nào: box tracked vs untracked, pool của Group, chuyện gì xảy ra khi hết hàng/cạn nhóm, và storefront hiển thị tồn kho ra sao. Loại box xem [01-box-types](01-box-types.md); cách tung thăm xem [05-picking-modes](05-picking-modes.md); trả item về pool xem [06-pool-refill](06-pool-refill.md). Về nhóm: [00-overview](00-overview.md).

## Tracked và untracked

| | Tracked | Untracked |
|---|---|---|
| Nguồn | Variant Shopify bật "Track quantity" | Tắt |
| Dữ liệu item | số lượng | phần trăm |
| Bộ đếm của Mysbox | còn lại mỗi item, giảm mỗi lần bốc | không có |
| Luật bằng nhau | tổng mỗi set = tồn kho Shopify | mỗi set = 100% |
| Hết hàng | khi tồn kho về 0 | không bao giờ (Shopify quyết định) |
| Flow trigger "box sold out" | có | không |

Nếu merchant đổi "Track quantity" ở Shopify, phải mở lại form box cho khớp, nếu không lưu sẽ lỗi "Box tracking settings do not match...". Group box đọc tracked từ Shopify và bỏ qua giá trị trong form; chế độ draw luôn là không giới hạn.

## Sold-out với box Single/Bundle tracked

- Shopify ngừng bán khi tồn kho 0 (theme hiện "Sold out"). Box **vẫn Active**, Mysbox không tự unpublish.
- Danh sách box hiện "N available" cho box tracked.
- Nếu shop cho "continue selling when out of stock", đơn thừa có thể nhận **ít prize hơn số hộp đã mua** (hộp thừa không có gì để reveal). *chưa xác nhận: màn hình mở hộp xử lý đơn như vậy ra sao*.

## Ví dụ — hộp tracked cạn dần

Hộp keychain của Shop An (A5, B3, C2, tồn kho 10) bán 9 hộp, còn A1. Hộp thứ 10 chắc chắn là A, bán xong tồn kho 0, Shopify hiện "Sold out", Flow trigger "box sold out" bắn (nếu bật Flow).

## Nhóm hết item (pool mode)

Chỉ Group + "Items in a group are removed after pull". Mỗi nhóm có **hàng đợi đã xáo trộn**; trúng item nào thì item đó "đã bốc" và không trúng lại.

Ví dụ (Shop An, "Kuji 6"): tồn kho 6. Hiếm 50%: Phượng, Rồng. Thường 50%: Gà, Mèo, Vịt, Chó. Bình mua hai hộp liên tiếp, cả hai lần tung vào Hiếm → Phượng rồi Rồng. Nhóm Hiếm **cạn** (Thường còn 4). Từ lần tung kế, tuỳ cài đặt "When one of groups has been all revealed":

| Chọn | Lần tung kế vào Hiếm | Box |
|---|---|---|
| "Refill the group" (mặc định) | Hiếm được xáo lại đủ 2 item, tiếp tục bốc | Luôn bán; chance nhóm giữ như cấu hình |
| "Continuously randomize items in the remaining groups" | Hiếm bị bỏ qua; chance chia lại cho nhóm còn (Thường 100% hiệu lực); khi **mọi nhóm** cạn thì tất cả được xáo lại | Luôn bán; chance hiệu lực lệch dần |
| "Automatically deactivate box" | Ngay sau đơn làm Hiếm cạn, box bị **unpublish** (dù Thường còn 4); nếu tick, product Shopify thành Draft | Ngừng bán |

Đơn nhiều hộp mà một nhóm cạn giữa chừng có thể có hộp "rỗng"; với "deactivate", hộp rỗng được ghi nhận để số lượng khớp.

**Muốn bán lại box đã cạn (deactivate):** thêm item mới vào nhóm, lưu / "Sync data" khi Draft, rồi Activate. Giữ nguyên item thì không "nạp lại" (item đã bốc vẫn đã bốc). Publish bị chặn bằng "Cannot publish: inventory pools are exhausted." nếu pool vẫn cạn. Item trúng rồi nhưng được resell có thể quay về pool: [06-pool-refill](06-pool-refill.md). *chưa xác nhận: mẹo chuyển pool → draw → pool để tạo hàng đợi mới có phải quy trình support chính thức không.*

## Đồng bộ với Shopify

- Collection của Group chỉ là **ảnh chụp** lúc save/sync: thêm sản phẩm vào collection sau đó thì phải deactivate → "Sync data" → activate.
- Sync lại pool giữ các item đã bốc (nếu còn trong collection), xáo phần còn lại.
- Đồng bộ và bốc thăm không chung khoá; sync giữa lúc đang bán có thể chạy đua nhẹ với bốc thăm. *chưa xác nhận mức độ ảnh hưởng thực tế.*

## Hiển thị tồn kho trên storefront

Hai chỗ chỉnh: radio "Chance display" trong form và các cờ của box.

| Chế độ | Khách thấy |
|---|---|
| "Show original chance" | "Chance: 50%" tính lúc lưu, **không đổi** khi bán |
| "Show remaining stock" | Số còn lại mỗi item, mẫu mặc định `{remaining-items}/{total-items} left`; Single còn có "Remaining boxes: {remaining-items}/{total-items}". Chỉ cho Single tracked hoặc Group pool |
| Chế độ availability (cờ `show_item_availability`) | Item đã bốc có nhãn "Pulled"; Group pool hiện "N of M pulled" |

*chưa xác nhận: ai bật cờ `show_item_availability` (không thấy ô chỉnh trong portal; có thể do Mysbox team).* Box Bundle untracked không hiện được tồn kho hay "Pulled".

Khối hiển thị được cập nhật nền sau mỗi lần bốc, giới hạn vài lần ghi Shopify mỗi giây mỗi shop, nên có thể **trễ vài giây**.

## Câu hỏi thường gặp

- **Trang vẫn hiện 50% dù đã bán nhiều?** Đang ở "Show original chance"; đổi sang "Show remaining stock".
- **Item "Pulled" không hiện?** Cờ availability chưa bật hoặc box là Bundle untracked.
- **Khách thấy hết hàng nhưng box vẫn Active?** Bình thường với tracked; Mysbox không tự unpublish.
