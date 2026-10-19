# Playbook 2: resell, số tiền hoàn, pool refill, store credit

> 13 tình huống về chặng sau khi mở box: khách bán lại quà (resell), tiền hoàn, món quay về pool, và store credit của Koin. Quay về [bảng tra](00-index.md). Nghiệp vụ nền: [resell](../04-resell-refund-credit/00-overview.md), [ví dụ số tiền hoàn](../04-resell-refund-credit/03-refund-amount-examples.md), [store credit và vé](../04-resell-refund-credit/04-store-credit-and-tickets.md), [pool refill](../02-boxes/06-pool-refill.md).

Hai điều dễ nhầm: (1) resell trả **tiền** (money-only), không trả lại hàng vào đơn; (2) "store credit" trong mua box là **Koin**, hệ thống credit bên ngoài, khác hẳn store credit gốc của Shopify mà resell có thể hoàn về.

<a id="r1"></a>
### R1. Nút resell mất / "nothing to resell"
- **Triệu chứng**: "Hôm qua còn nút Resell, giờ không thấy."
- **Xác nhận**: trang chi tiết đơn của khách chỉ hiện Resell khi còn ít nhất một box bán được. Admin: Orders -> Boxes -> `resell expires`; cột "resell processing at" phải trống; trang box -> cấu hình buyback (bật, kiểu Box/Items, cách hoàn, phần trăm lớn hơn 0).
- **Nguyên nhân**: (1) **hết resell window** (mặc định 24 giờ sau lúc bốc; "buyback delay" tối thiểu 1 giờ, chỉnh được chỉ trên plan trả phí); (2) buyback chưa bật/chưa đủ **tại lúc đơn được bốc** (đổi cấu hình sau không áp cho đơn cũ); (3) box chưa mở (box đã quá giờ auto-unbox coi như đã mở); (4) đơn đã Completed (quà đã vào đơn nên window bị xoá; thường do merchant/auto-unbox mở hết); (5) đơn Shopify bị huỷ/đóng/không hoàn được (đơn miễn phí vẫn bán được); (6) đã bán hết; (7) box vật lý (không bao giờ bán lại được).
- **Xử lý**: **[Support]** giải thích nguyên nhân. Không có action nào để mở lại window; window mới chỉ áp cho đơn tương lai (merchant tăng buyback delay).
- **Đừng**: sửa `resell expires` trong database; hoàn tay "làm ơn" mà không báo merchant (Mysbox không ghi nhận).
- **Ví dụ**: An bật auto-unbox 6 giờ. Bình mua box lúc 08:00, giờ auto-unbox là 14:00, nhưng job chạy lúc 16:00 mới mở box và đơn thành Completed; nút Resell biến mất từ 16:00, sớm hơn nhiều so với 24 giờ. Chi giải thích: mở box (tay hay tự động) kết thúc resell.

<a id="r2"></a>
### R2. Khách báo lỗi khi resell
| Thông báo | Ý nghĩa | Việc làm |
|---|---|---|
| "The resell window for this order has expired." | Hết window | Xem [R1](#r1) |
| "Order has been cancelled." / "closed." / "not refundable." | Trạng thái đơn Shopify | Merchant sửa đơn; đơn miễn phí vẫn bán được |
| "Cannot resell a box that has not been opened." | Chưa mở | Khách mở trước |
| "This box has already been resold." / "Not enough items..." | Bấm đôi hoặc đã bán | Xem bundles của đơn |
| "Not enough refundable quantity for variant..." | Shopify nói số lượng đó không còn hoàn được | Merchant xem refund trên đơn Shopify |
| "Refund would exceed customer store credit balance limit." | Xem [R7](#r7) | |
| "No price found for variant..." / "No country codes available..." | Chế độ Items cần giá theo quốc gia, đơn rất cũ thiếu | **[Engineer]** `order-resell-country-codes:migrate --order_id=<id>` (hỏi xác nhận) |
| 409 "Another resell operation is in progress..." | Bấm lần hai trong 2 giây hoặc khoá kẹt | Đợi một phút; kẹt thì xem [R5](#r5) |
| 429 "Too many attempts" | Hơn 20 lần/phút trên một đơn | Đợi một phút |
- **Đừng**: bảo khách bấm lại liên tục.

<a id="r3"></a>
### R3. Số tiền hoàn nhìn sai
- **Triệu chứng**: "Tôi trả 25 USD mà được hoàn 40", hoặc "hoàn thấp hơn món quà tôi thấy".
- **Xác nhận**: đơn Shopify -> refund có ghi chú bắt đầu "Buyback Refund | #variant (BOX|ITEMS): Nx = amount" kèm chia Cash/Store Credit. Mysbox: Orders -> Boxes -> winning bundles hiện số hoàn lưu cho mỗi bundle (Box) hay món (Items).
- **Nguyên nhân**: (1) chế độ **Box** hoàn phần trăm của **giá niêm yết** của box, không phải giá khách đã trả; (2) chế độ **Items** hoàn phần trăm của **giá hiện tại** của món trong thị trường của khách, không phải giá lúc bốc; (3) cách hoàn quyết định tiền đi đâu ([R4](#r4)); (4) giá món chỉ có ở tiền tệ khác nên app quy đổi; (5) làm tròn: tính 4 chữ số thập phân, Shopify làm tròn theo tiền tệ; (6) thuế và ship không bao giờ được hoàn.
- **Xử lý**: **[Support]** giải thích công thức.
- **Đừng**: hoàn thêm "bù" mà không ghi lại cho merchant.
- **Ví dụ**: box niêm yết 50 USD, buyback 80 phần trăm. Bình mua lúc giảm giá còn 25 USD, resell box: hoàn 50 x 80 phần trăm = 40 USD. Chế độ Items: món Bình trúng nay giá 30 USD, buyback 70 phần trăm, hoàn 30 x 70 phần trăm = 21 USD dù lúc trúng món rẻ hơn.

<a id="r4"></a>
### R4. Hoàn về store credit thay vì thẻ (hoặc ngược lại)
- **Xác nhận**: ghi chú refund Shopify: Cash / Store Credit (original) / Store Credit (order) / Store Credit (account). Cấu hình box: cách hoàn "store credit" hay "original payment".
- **Nguyên nhân**: (1) cách hoàn của box; (2) cách là "original payment" nhưng phần thẻ của đơn đã được hoàn hết, hoặc đơn trả bằng store credit, hoặc chỉ mới authorize chưa capture: phần còn lại rơi về store credit Shopify trong tài khoản khách.
- **Xử lý**: **[Support]** giải thích; đổi cách hoàn chỉ áp cho đơn tương lai.
- **Đừng**: đổi cấu hình box để "sửa" đơn cũ.
- **Ví dụ**: Bình trả 40 USD bằng thẻ, đã được hoàn 40 USD cho một sự cố khác. Sau đó Bình resell 30 USD: phần thẻ không còn, nên 30 USD thành store credit trong tài khoản Bình.

<a id="r5"></a>
### R5. Đã hoàn tiền mà box vẫn chưa bán / resell treo
- **Xác nhận**: Orders (danh sách/chi tiết): "resell processing at" **có giá trị** (Shopify đã hoàn nhưng Mysbox chưa lưu xong). Khoá tự gỡ **sau một ngày**. So với danh sách refund trên đơn Shopify.
- **Nguyên nhân**: Shopify hoàn xong rồi mới lưu cục bộ, và lưu thất bại hoặc worker sập.
- **Xử lý**: **[Support]** đọc refund trên Shopify trước. **[Engineer]** nếu refund đã tồn tại: đánh dấu bundle đã bán và gỡ khoá (không có action trong admin). Nếu chưa có refund: đợi một ngày hoặc nhờ engineer.
- **Đừng**: để khách bán lại trước khi kiểm tra (app không thấy refund đầu và Shopify chấp nhận lần hai).

<a id="r6"></a>
### R6. Khách nói bị hoàn hai lần
- **Xác nhận**: danh sách refund trên đơn Shopify; ghi chú từng refund; marker `resold` của bundles trong Mysbox.
- **Nguyên nhân**: (1) trạng thái kẹt rồi bán lại ([R5](#r5)); (2) hai box khác nhau, bán thành hai refund riêng.
- **Xử lý**: **[Support]** đối chiếu ghi chú với bundles. Nếu trùng thật, merchant tự thu hồi trong Shopify; Mysbox không đảo được refund.

<a id="r7"></a>
### R7. "Refund would exceed customer store credit balance limit"
- **Nguyên nhân**: hoàn vào store credit bị chặn để số dư store credit Shopify của khách không vượt 15.000 USD (quy đổi theo tiền đơn). Chỉ áp cho món có cách hoàn là store credit.
- **Xử lý**: **[Support]** merchant đổi box sang "original payment" cho đơn tương lai, hoặc khách dùng bớt credit.

<a id="r8"></a>
### R8. Món đã bán lại không về pool (refill)
- **Xác nhận**: trang box Tier: picking mode **Pool**, đã tick "Draft product when empty" hoặc "Deactivate box when empty", refill bật và chế độ Auto/Manual. Refill chỉ có với box Tier kiểu Pool **dừng khi hết**.
- **Nguyên nhân**: (1) chế độ **Manual**: món nằm trong bộ đệm chờ merchant áp dụng; (2) refill **tắt** lúc khách bán (bật sau không phát lại); (3) trên **production**, việc khớp dùng version box lúc mua: nếu box đổi version (bất kỳ chỉnh sửa nào) giữa lúc bốc và lúc resell thì refill mất im lặng
- **Xử lý**: **[Support]** Manual: merchant áp dụng refill đang chờ. **[Engineer]** `[chỉ có trên staging]` refill mất từ trước bản sửa: chạy thử `pool-refill:backfill-queue-tokens --dry-run --box=<id>`, đọc bảng kết quả rồi chạy lại không `--dry-run` (hỏi xác nhận, an toàn khi lặp). Lệnh chưa tồn tại trên production.
- **Đừng**: sửa hàng đợi pool bằng tay.
- **Ví dụ**: box Pool của Shop An có 5 món, đã hết hàng nên bị draft. Bình bán lại 1 món lúc refill ở Manual: món nằm trong bộ đệm, box vẫn "hết hàng" cho đến khi An áp dụng refill (xem [W4](03-storefront-and-widget.md#w4)).

<a id="r9"></a>
### R9. Số dư store credit không cập nhật
- **Xác nhận**: trước hết hỏi **số dư nào**. (a) Koin: trừ ngay khi mua box bằng credit, xem trên dashboard Koin. (b) store credit Shopify sau resell: ghi chú refund "Store Credit (account)", xem Shopify admin -> Customers. Hai số dư không liên kết với nhau.
- **Nguyên nhân**: (1) nhìn nhầm số dư; (2) theme hiện số dư từ lúc tải trang (cần reload); (3) Koin trừ thất bại ([R12](#r12)); (4) refund đi về thẻ ([R4](#r4)).
- **Xử lý**: **[Support]** xác định đúng số dư; (a) merchant kiểm tra Koin, (b) kiểm tra Shopify.
- **Đừng**: tự điều chỉnh số dư.
- **Ví dụ**: Bình mua box bằng 20 credit Koin rồi resell box được 15 USD, và thắc mắc "credit sao không thành 35". 15 USD nằm ở store credit Shopify (hoặc về thẻ), còn 20 credit Koin đã bị trừ thật.

<a id="r10"></a>
### R10. Dùng credit mà box vẫn tính tiền khi checkout
- **Xác nhận**: khách phải có vé cho biến thể đó (customer metafield). Discount tự động tên "Store credit discount" (app discount "Mystery Box 100% Discount").
- **Nguyên nhân**: (1) merchant chưa tạo app discount (Settings -> integration -> chọn app store credit); (2) Koin đã trừ nhưng ghi vé thất bại (không có bù trừ); (3) discount khác xung đột; (4) khách mua nhiều hơn số vé (chỉ chừng đó đơn vị được miễn phí).
- **Xử lý**: **[Support]** merchant chọn lại app store credit để tạo discount. **[Engineer]** thêm vé và publish lại metafield khách (chưa có lệnh).
- **Đừng**: hoàn Koin rồi bảo khách mua lại trước khi engineer kiểm tra (có thể khách bị trừ cả hai).

<a id="r11"></a>
### R11. Không thấy nút "Buy by store credit"
- **Nguyên nhân**: app store credit chưa là Koin hoặc thiếu Koin private key (General Settings -> integration); box tắt "enable store credit"; chưa đặt block "Buy box by store credit" ở product template; khách chưa đăng nhập; số dư thấp hơn giá (widget có thể ẩn); box chưa publish.
- **Xử lý**: **[Support]** theo setup guide ở Dashboard và cấu hình box.

<a id="r12"></a>
### R12. Mua bằng credit lỗi: "Failed to debit store credit" / "Only N items available for purchase."
- **Nguyên nhân**: Koin từ chối trừ (thiếu số dư, sai key, Koin gián đoạn); số lượng vượt tồn; box không đánh dấu là box store credit (400); chạm giới hạn 20 lần/phút/khách.
- **Xử lý**: **[Support]** merchant kiểm tra Koin private key, số dư, tồn kho.
- **Đừng**: bảo khách thử lại liên tục: mỗi lần thành công là bị trừ.

<a id="r13"></a>
### R13. Khách còn vé sau khi bỏ giỏ
- **Nguyên nhân**: vé chỉ bị dùng khi có đơn đã trả mang discount tương ứng; bỏ giỏ không tiêu vé. Vé còn hiệu lực, tính theo biến thể (không theo version box).
- **Xử lý**: **[Support]** không cần làm gì.
