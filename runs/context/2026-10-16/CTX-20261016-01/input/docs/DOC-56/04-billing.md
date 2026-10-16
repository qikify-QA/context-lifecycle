# Playbook 4: billing, plan, capacity, mã giảm giá

> 12 tình huống merchant hỏi về tiền Mysbox thu: tính phí hai lần, đã trả mà vẫn Free, phí usage thiếu hoặc sai, huỷ plan, mã giảm giá. Quay về [bảng tra](00-index.md). Nền: [plan và capacity](../05-plans-billing/01-plans-and-capacity.md), [giá usage](../05-plans-billing/02-usage-pricing.md), [chu kỳ và charge](../05-plans-billing/03-billing-cycle-and-charges.md), [mã khuyến mãi](../05-plans-billing/05-promote-codes.md), [màn hình Charges/Plans admin](../08-admin-panel/05-plans-discounts-promo-charges.md).

Nhớ: plan trả phí có **hai dòng tiền**. (1) **Subscription** hằng tháng/năm do Shopify thu. (2) **Phí usage mỗi box** do Mysbox gửi qua Shopify mỗi ngày một lần, chỉ tính cho box **vượt capacity** của chu kỳ 30 ngày; không tính khi trial, không tính trên plan Free. Mysbox không tự trừ thẻ; mọi khoản nằm trên hoá đơn Shopify của merchant. Màn hình Charges chỉ-đọc.

<a id="f1"></a>
### F1. "Tôi bị tính phí hai lần"
- **Xác nhận**: Shops -> shop -> tab **Charges**: loại **Recurring** (subscription), **Usage** (mỗi lần chạy một dòng, mô tả dạng "12.40 - Usage fee for 5 orders (#1021 to #1030)"), One-time. Đối chiếu danh sách giao dịch trong Shopify Partner dashboard.
- **Nguyên nhân**: (1) **bình thường**: một dòng subscription cộng một hoặc nhiều dòng usage, merchant đọc thành trùng; (2) **đổi plan**: usage cuối của plan cũ gửi ngay, và khi hạ xuống plan có capacity nhỏ hơn, box đang vượt được tính ngay ("recalculation"), nên có khoản phụ ngay sau đổi plan; (3) **huỷ plan**: usage cuối gửi ngay trước khi huỷ; (4) đăng ký lại hoặc cài lại trong cùng chu kỳ tạo subscription mới (cái cũ bị huỷ ở Shopify); (5) bấm duyệt hai link thanh toán (support gửi link rồi merchant cũng tự nâng ở trang Pricing); (6) Shopify tự thử lại thanh toán: xem danh sách giao dịch Shopify.
- **Xử lý**: **[Support]** giải thích từng dòng bằng mô tả. Khoản tính dư thật sự do chủ tài khoản Shopify Partner hoàn; Mysbox không hoàn hay sửa được charge. Usage bị trùng từ Mysbox gần như không xảy ra vì dòng usage được đánh dấu đã tính **trước** khi gọi Shopify (lỗi thì thu thiếu, không thu dư; xem [F3](#f3)).
- **Đừng**: xoá dòng charge; hứa hoàn tiền trước khi so với Shopify.
- **Ví dụ**: An thấy hai khoản 29 USD và 3,40 USD vào cùng ngày và nói "bị tính hai lần". Chi mở tab Charges: khoản 29 USD là subscription Recurring, 3,40 USD là Usage cho 34 box vượt capacity ghi "Usage fee for ... orders". Không có khoản nào trùng.

<a id="f2"></a>
### F2. Đã trả tiền mà app vẫn hiện Free / báo vượt capacity
- **Xác nhận**: Shop -> Plan (**Plan ID** và tên) và tab Charges: có dòng Recurring **ACTIVE** không? Chỉ PENDING/DECLINED/không có = merchant chưa duyệt. Link duyệt có hiệu lực 7 ngày.
- **Nguyên nhân**: (1) merchant chưa hoàn tất duyệt ở Shopify; (2) đã duyệt nhưng subscription Shopify không Active ("Shopify subscription is not active."); (3) cờ storefront/app bị cũ ([W3](03-storefront-and-widget.md#w3)); (4) merchant ở shop khác; (5) plan từ payment link không đủ điều kiện với shop ("Plan is not supported", xem [F5](#f5)).
- **Xử lý**: **[Support]** gửi lại link: Shops -> "Generate recurring payment link". Sau khi duyệt, bấm "Sync capacity to metafield" và kiểm tra mục Capacities đã lên capacity của plan. Nhớ publish lại box ([W1](03-storefront-and-widget.md#w1)).
- **Đừng**: đặt plan trong database (capacity, điều khoản usage và cờ đều phụ thuộc luồng kích hoạt).

<a id="f3"></a>
### F3. Phí usage thiếu, ở trạng thái Failed/Declined, hoặc bằng 0
- **Xác nhận**: Charges -> loại Usage: PENDING (vừa tạo), ACCEPTED (đã gửi), DECLINED (Shopify từ chối), FAILED (lỗi).
- **Nguyên nhân**: (1) không có phí: plan Free, đang trial, hoặc còn trong capacity (N box đầu mỗi chu kỳ phí 0); (2) tổng dưới nửa xu thì đánh dấu accepted mà không gọi Shopify; (3) Shopify từ chối: đã chạm **capped amount** của plan hoặc subscription không còn hoạt động; Mysbox không kiểm tra cap trước; (4) usage cũ hơn một tháng không bao giờ được tính; (5) plan trả phí bỏ trống điều khoản usage khiến đơn mới của shop **lỗi ngay lúc nhập** (đơn không được tạo; xem Plans ở admin).
- **Xử lý**: **[Support]** 1-2: giải thích. 3: nhờ merchant nâng cap hoặc sửa thanh toán trong Shopify. **[Engineer]** mở lại các dòng usage và chạy `usage-charges:create --id=<id shop>` (chỉ xét shop có plan trả phí active, không trial, có usage chưa tính trong tháng qua). 5: sửa Plan (Usage fee type/value hoặc value threshold).
- **Đừng**: xuất hoá đơn ngoài Shopify; xoá dòng usage.
- **Ví dụ**: tháng 9, plan của Shop An có cap usage 20 USD; ngày 25 usage tích luỹ vượt, Shopify từ chối khoản 6,50 USD, dòng ghi DECLINED. Vì các dòng đã đánh dấu đã tính nên không tự thử lại. Dũng mở lại các dòng đó sau khi An nâng cap trong Shopify, rồi chạy lệnh trên cho shop An.

<a id="f4"></a>
### F4. Đã huỷ plan mà vẫn thấy capacity / vẫn bị tính tiền
- **Xác nhận**: Charges: dòng recurring CANCELLED, ngày huỷ và **expires on** ở tương lai.
- **Giải thích**: huỷ có hiệu lực với billing ngay (Shopify dừng subscription tương lai; usage cuối cho các box trước đó được gửi), nhưng shop **giữ capacity và điều khoản trả phí đến hết kỳ đã trả**. Nhãn plan hiển thị Free sớm hơn. Hết ngày đó áp capacity Free và shop có thể vượt ([W1](03-storefront-and-widget.md#w1)).
- **Xử lý**: **[Support]** giải thích; nếu có khoản tính sau ngày expires on thì so với Shopify.
- **Đừng**: nói merchant là đã về Free ngay.
- **Ví dụ**: An huỷ plan ngày 5/10 vì đã trả đến 28/10. Từ 5/10 nhãn ghi Free nhưng An vẫn bán dư capacity bình thường đến 28/10. Sang 29/10 nếu An đã dùng quá 10 box, hệ thống gỡ toàn bộ box.

<a id="f5"></a>
### F5. Không thấy plan / "Plan is not supported"
- **Nguyên nhân**: plan lọc theo loại store: store **Shopify Plus** thấy plan Plus; store Shopify trả phí thường thấy plan trả phí thường; **development store** chọn tự do. Plan có Visible tắt thì ẩn. Link thanh toán áp cùng kiểm tra.
- **Xử lý**: **[Support]** so mục Plan của shop (cờ Shopify Plus, Development store) với các công tắc Plus / Shopify-paid của plan; gửi link của plan phù hợp.

<a id="f6"></a>
### F6. Mã giảm giá (discount code) bị từ chối
| Thông báo | Ý nghĩa |
|---|---|
| "Out of discount code" | Hết lượt dùng. Mã mới tạo mặc định 0 là hết ngay; -1 là không giới hạn. |
| "not active" | Công tắc Active tắt. |
| "not been applied yet" / "expired" | Ngoài khoảng start/end. |
| Không dùng được cho shop | Kiểu Limited và shop không có trong danh sách. |
| Plan không nằm trong danh sách plan của mã | Thêm plan vào mã. |
| "has been used" | Mỗi cặp (shop, plan) dùng một lần; plan khác dùng lại được. |
- Mã giảm chỉ giảm **giá subscription** Shopify thu, không đổi capacity hay phí usage. Mã "extend trial" thêm 7 ngày (không cho dev store). Support không áp mã thay merchant; gửi link plan và merchant nhập mã ở trang Pricing.
- **Ví dụ**: mã 20 phần trăm trên plan 29 USD: 29 x 0,8 = 23,20 USD cho các tháng được giảm.

<a id="f7"></a>
### F7. Promote code bị từ chối / capacity thêm không hiện
| Thông báo chứa | Ý nghĩa |
|---|---|
| "reached its maximum usage limit" | Hết lượt (-1 = không giới hạn). |
| "currently not active" / "not yet active" / "has expired" | Công tắc hoặc ngày. |
| "not available for your store" | Danh sách store riêng. |
| "already redeemed" | Mỗi store dùng một mã **một lần trọn đời**. |
| "already has an active promote code" | Mỗi lúc chỉ một mã đang chạy. |
| "Current plan is not eligible" | Mã immediate đòi plan hiện tại (kể cả Free) nằm trong danh sách plan của mã. |
| "only available for first-time upgrades" | Mã first-upgrade đòi shop chưa từng có charge nào. |
- Mã **first-upgrade** ở Pending đến khi merchant đăng ký plan có trong danh sách rồi mới cộng capacity; mã **immediate** cộng ngay. Xem capacity: Shop -> Capacities -> Box Selling Capacity (capacity plan + box tặng); tab **Redemptions** của mã cho trạng thái và ngày.
- **Nhầm hay gặp**: discount code giảm *giá*, promote code cộng *capacity*.

<a id="f8"></a>
### F8. Email "capacity reached" sai hoặc không nhận
- **Nguyên nhân**: email gửi **một lần** lúc vượt giới hạn (không lặp lại); cần email shop và template email cấu hình ở môi trường đó (nếu thiếu thì im lặng không gửi); template Free và plan trả phí khác nhau. `[chỉ có trên staging]` bản mới có link trực tiếp và, với plan value-tiered, mức phí tối thiểu và phần trăm; production gửi tham số cũ.
- **Xử lý**: **[Support]** xem Shop -> Email; hỏi engineer template đã cấu hình chưa. Không có action gửi lại.

<a id="f9"></a>
### F9. Nhầm lẫn về trial
- Trial **không bắt đầu lại** nếu đăng ký lại plan shop từng có: số ngày đã dùng bị trừ; ngày trial còn dư của lần huỷ được cộng sang; mã "extend trial" thêm ngày. Trong trial: không phí usage nhưng box bán ra vẫn tính vào capacity. Development store hoặc store "Plus Trial" nhận subscription thử (không thu tiền thật).
- **Xử lý**: **[Support]** giải thích; muốn thêm trial thì dùng discount có thêm ngày trial.

<a id="f10"></a>
### F10. Số phí usage nhìn sai
- **Xác nhận**: thẻ "Usage Charge" ở trang view shop theo khoảng ngày (tổng phí phát sinh) so với tab Charges (tổng usage đã tính). Mức giá được **cố định lúc bán box**, đổi plan sau không tính lại usage cũ.
- **Ví dụ (phí cố định)**: capacity 100, 0,10 USD mỗi box, Shop An đã dùng 95. Một đơn gồm 4 + 6 = 10 box: 5 box đầu còn trong capacity (phí 0), 5 box còn lại tính phí: 5 x 0,10 = 0,50 USD. Đơn kế 3 box: cả 3 tính phí = 0,30 USD.
- **Ví dụ (theo giá trị)**: ngưỡng 50 USD, tối thiểu 0,50 USD mỗi box, 2 phần trăm. Box 120 USD: 120 x 2 phần trăm = 2,40 USD. Box 30 USD (hoặc một món tặng 0 USD): lấy mức tối thiểu 0,50 USD. Box đúng 50 USD: dùng phần trăm = 1,00 USD. Mỗi dòng hàng trong đơn được xét riêng.
- **Xử lý**: **[Support]** tính lại theo hai ví dụ trên cho từng đơn.

<a id="f11"></a>
### F11. Shopify đã huỷ / đóng băng subscription mà Mysbox vẫn Active
- **Nguyên nhân**: Mysbox **không được báo** khi subscription đổi (không có webhook cho sự kiện này). Huỷ hoặc lỗi thanh toán trong Shopify admin chưa phản ánh cho đến khi một luồng của Mysbox chạm tới shop.
- **Xác nhận**: Shopify Partner dashboard (trạng thái subscription). **Xử lý**: **[Engineer]** chỉnh charge của shop; admin panel không có nút.

<a id="f12"></a>
### F12. Development store: billing lạ
- Dev store (store thử của partner) và store Plus-trial tạo subscription **thử** (không thu tiền), không tính vào báo cáo "thật". Nếu dev store trở thành store thật (Shopify cập nhật shop), Mysbox **huỷ subscription thủ công và đưa shop về plan mặc định** (chủ ý); merchant phải đăng ký lại.
- **Xử lý**: **[Support]** giải thích; gửi lại link thanh toán khi merchant sẵn sàng.
