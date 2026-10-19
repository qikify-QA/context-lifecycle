# Hành trình reveal (mở box)

> Mô tả mọi cách một box digital được mở, màn hình khách thấy, hiệu ứng và chuyện đơn nhiều box. Đứng sau [random quà](01-purchase-and-draw.md), đứng trước [thêm quà vào đơn](04-prizes-added-to-order.md). Tổng quan nhóm: [00-overview](00-overview.md). Box physical không có bước này, xem [05](05-physical-vs-digital.md).

## Các cách mở box

| Cách | Ai | Phạm vi | Thêm quà vào đơn Shopify |
|---|---|---|---|
| Nút "Unbox" trên một box (trang cảm ơn, trang đơn) | Khách | 1 box | Chỉ khi đó là box cuối **và** resell window đã hết |
| "Multi-unbox" (danh sách đơn hoặc chi tiết đơn) | Khách | Mọi box chưa mở của đơn, kết quả trên một màn hình | Như trên |
| "Open all boxes" trên trang đơn trong portal, hoặc "Unbox all boxes" trong action "Open mystery box" của trang đơn Shopify admin | Merchant | Mọi box digital chưa mở | Như khách (chờ resell window) |
| Action Flow "Open all mystery boxes in an order" | Automation của merchant | Mọi box digital chưa mở | Thêm ngay, bỏ qua resell window |
| Auto-unbox | Hệ thống | Mọi box digital chưa mở | Thêm ngay, bỏ qua resell window |

Lưu ý: cách mở của merchant qua portal/admin hành xử như khách (chờ resell window), còn Flow và auto-unbox thì chốt đơn ngay nên **chấm dứt luôn cơ hội resell** của đơn đó. Xem [resell](../04-resell-refund-credit/01-resell-box-mode.md).

## Khách vào bằng đâu

- Khối "Unbox your mystery box now!" trên trang cảm ơn và trang order status (merchant phải đặt khối này trong checkout editor; dashboard portal có bước kiểm tra).
- Banner ở danh sách đơn trong tài khoản: "You've got {box_quantity} mystery boxes waiting to be unboxed." và khi xong "You've unboxed all mystery boxes!" kèm "View box history".
- Link trong email xác nhận hoặc thẳng `https://{shop}/apps/mysbox/orders`.
- Khách đã đăng nhập: Shopify nhận diện. Khách guest: cần "magic link" (link có mã khách). Không có cả hai thì bị chuyển về `/account` của shop. Mã guest hết hạn sau 1 năm, khi đó hiện trang "authentication token expired".

### Trang cảm ơn từng bước

1. Trang tải ngay sau thanh toán nhưng app biết đơn sau vài giây; nút hiện "Please wait.." (xám).
2. Khối hỏi app mỗi 5 giây, tối đa 30 giây.
3. Có đơn: hiện lưới box, kèm "Auto-open in: {time}" nếu bật auto-unbox.
4. Vẫn chưa có đơn: nếu chưa paid thì báo chưa paid; nếu đã paid thì "Please come back later after 30 minutes on this order status page to open your box."
5. Bấm "Unbox" mở **tab mới** trên domain của store (`/apps/mysbox/orders/...`).

Khối này bỏ qua box physical.

## Trang danh sách và chi tiết đơn của khách

- Danh sách "Your orders": chip lọc "All", "Not unboxed yet", "Unboxed"; mỗi đơn có ảnh box, "{n} unboxed", đếm ngược "Auto-open in", nút "Multi-unbox". Tải 5 đơn mỗi lần với "load more". Trống: "You have no orders yet".
- Chi tiết đơn: "Ordered at", nút "Resell" (chỉ khi đang bán lại được), đếm ngược auto-unbox, "N / M unboxed", mỗi box một thẻ có nút "Unbox" hoặc nhãn "Resold".

## Màn hình reveal

1. Bình bấm "Unbox"; trang toàn màn hình mở với hiệu ứng merchant chọn cho box (portal: Box settings > Animation).
2. App được gọi **một lần**: server lấy quà đã random, đánh dấu box đã mở. Hiệu ứng chỉ diễn lại kết quả; không đổi được kết quả. Tải lại trang giữa chừng được chặn ở trình duyệt để không mở nhầm thêm box khác.
3. Hiệu ứng (bấm "Skip" để rút ngắn):

| Hiệu ứng | Dành cho | Khách thấy |
|---|---|---|
| Carousel | Single | Dải ngang quay khoảng 12 giây rồi dừng ở quà thắng, chữ "Roll to get your lucky items"; có âm thanh tùy chọn |
| Drawing | Single, Bundle | Khách vẽ một nét ("Draw your lucky pattern in one stroke"), tự hoàn tất ở khoảng 65% |
| Card flip | Single, Bundle | Các thẻ úp, chạm để lật hoặc "Flip all card" |
| Gacha machine | Single | Viên capsule rơi và vỡ; cần gói trả phí (không phải early-bird), nếu không tự hạ về carousel |
| None | Mọi loại | Hiện kết quả ngay |

4. Màn hình kết quả: "Congratulations! Your lucky item is revealed", ảnh và tên quà, tỉ lệ ("chance") trừ khi merchant bật "Hide winner chance", có pháo giấy. Nút: "Resell" (nếu còn hạn), "Share unboxing" `[chỉ có trên staging]`, "Next unbox" (sang box chưa mở tiếp theo) hoặc "Open more" (thêm lại các box này vào giỏ sau khi kiểm tra tồn kho).
5. Box bundle hiển thị tất cả quà của box đó; box tier hiển thị quà của nhóm đã trúng.

Lỗi thường gặp: nếu gọi mở thất bại (ví dụ "No more items to open" vì đã mở hết), hiệu ứng kết thúc và khách quay lại trang đơn.

## Đơn nhiều box, mở một phần

Mỗi box mua là một mục riêng, mở lần lượt theo thứ tự tùy ý hoặc mở hết một lần. Tổng hiển thị "N / M unboxed". Box thuộc variant khác nhau hiện thành các thẻ riêng.

Khi mới mở một phần:
- Chưa có quà nào được thêm vào đơn Shopify (phải đợi box cuối).
- Resell vẫn dùng được cho box đã mở trong lúc các box khác chưa mở.

### Ví dụ: Bình mở dần

Đơn 3 box (xem [ví dụ ở 01](01-purchase-and-draw.md)). Thứ Hai 10:30 Bình mở box 1 (Poster) → "1 / 3 unboxed". 11:00 bán lại Poster lấy store credit (còn trong resell window). 11:30 bấm "Multi-unbox" mở 2 box còn lại → "3 / 3 (kèm 1 resold)". Lúc này hạn resell vẫn là thứ Ba 10:05 nên **chưa thêm quà vào đơn**. Việc đó xảy ra khi hết hạn, xem [04](04-prizes-added-to-order.md).

Nếu Bình không làm gì: hệ thống tự mở theo [auto-unbox](03-auto-unbox.md).

## Câu hỏi thường gặp

- **Reveal có thể ra kết quả khác nếu bấm lại?** Không, quà đã chốt từ lúc paid.
- **Merchant bấm "Open all boxes" thì khách còn resell được không?** Còn, nếu resell window chưa hết, vì cách này vẫn chờ window. Flow hoặc auto-unbox mới chấm dứt cơ hội resell.
- **Trang kết quả cho thấy quà nhưng đơn Shopify chưa có?** Bình thường, xem [04](04-prizes-added-to-order.md).
