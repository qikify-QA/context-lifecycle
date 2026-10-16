# Playbook 3: storefront, widget, theme và trang khách

> 12 tình huống về thứ khách nhìn thấy trên cửa hàng: box bị gỡ, widget không hiện, "hết hàng" sai, bản dịch, recent pulls, trang của khách. Quay về [bảng tra](00-index.md). Nền: [widget và bản dịch](../02-boxes/07-storefront-widget-and-translations.md), [tồn kho và pool](../02-boxes/04-inventory-and-pools.md), [luồng dữ liệu storefront](../09-integrations/02-storefront-data-flow.md).

Ghi nhớ: widget **không đọc tồn kho trực tiếp từ Shopify**. Nó đọc "dữ liệu đã publish" mà app ghi lên biến thể sản phẩm (tối đa 5 lần ghi mỗi giây mỗi shop, nên trễ một phút là bình thường). Ảnh và tên món thì lấy trực tiếp từ Shopify.

<a id="w1"></a>
### W1. Box tự unpublish
- **Triệu chứng**: "Sáng nay vào shop, tất cả box biến mất."
- **Xác nhận**: Shops -> shop -> Edit -> Capacities: **capacity used** bằng hoặc hơn **selling capacity** và shop đang ở plan Free; ngày publish của box trống; shop có email "capacity reached".
- **Nguyên nhân**: (1) chạm giới hạn plan Free (mặc định 10 box mỗi chu kỳ 30 ngày): app gỡ **toàn bộ** box một lượt; (2) plan bị huỷ khi shop đang vượt capacity Free; (3) cài lại khi vượt capacity Free; (4) box Tier bật "Deactivate box when empty" hết hàng (chỉ box đó); (5) nhân viên sửa capacity; (6) merchant tự gỡ.
- **Xử lý**: **[Support]** cho shop thêm chỗ: merchant nâng plan (trang Pricing hoặc link thanh toán, xem [F2](04-billing.md#f2)), hoặc promote code ([F7](04-billing.md#f7)), hoặc support lead nâng "Box Selling Capacity" của chu kỳ. **Sau đó từng box phải Publish lại** (tab Boxes -> Publish): nâng capacity không tự publish. Khách đã mua vẫn mở và resell bình thường trong lúc bị khoá.
- **Đừng**: hạ "capacity used" để "reset" mà không báo merchant (số liệu chu kỳ sai); publish từ database.
- **Ví dụ**: Shop An dùng plan Free, bán box thứ 10 trong chu kỳ lúc 09:12; hệ thống gỡ cả 4 box của An. Chi hướng dẫn An nâng plan; An phải bấm Publish cho từng box trong 4 box, rồi Chi bấm "Sync capacity to metafield" để widget hiện lại ([W3](#w3)).

<a id="w2"></a>
### W2. Widget không hiện trên trang sản phẩm / theme
- **Xác nhận**: portal merchant -> Dashboard -> setup guide: **app embed** đã bật trong *theme chính*? Khối "Mysbox list box item" có ở *product template*? Admin: trang box có ngày publish (không ở tương lai), có bundles, sync status completed; **biến thể** đang chọn trên trang phải là biến thể của box.
- **Nguyên nhân**: (1) thiếu app embed hoặc block, hay gặp sau khi merchant **đổi hoặc nhân bản theme** (phải bật lại embed ở theme mới); (2) box chưa publish, hoặc biến thể chọn khác biến thể box; (3) widget bị ẩn vì shop bị cờ hết hạn/vượt capacity ([W3](#w3)); (4) theme cũ (không phải Online Store 2.0) không đặt block được, chỉ dùng app embed; (5) theme có form add-to-cart mà widget không nhận ra (block có ô "form" để nhập selector); (6) script tuỳ chỉnh của merchant hoặc app khác lỗi JavaScript làm widget không dựng được; (7) dữ liệu box trên biến thể chưa được ghi hoặc đã bị xoá.
- **Xử lý**: **[Support]** dẫn merchant qua guide / trang "Instructions" ("Add block to theme" mở theme editor). **[Engineer]** ghi lại toàn bộ dữ liệu publish của shop: lệnh `user-product-variants:sync --user_id=<id shop>` (hỏi xác nhận, an toàn, bỏ qua box không đổi trong 1 ngày).
- **Đừng**: tự sửa theme của merchant; dán JSON box vào theme.
- **Ví dụ**: An nhân bản theme "Dawn" để thử giao diện mới rồi publish theme nhân bản. Widget biến mất trên cả shop vì app embed chỉ bật ở theme cũ. Chi hướng dẫn An bật lại embed ở theme mới; không cần chạm gì phía Mysbox.

<a id="w3"></a>
### W3. Widget / khối unbox ẩn dù plan có vẻ ổn
- **Xác nhận**: storefront coi là "hết hạn" từ hai giá trị đã publish: tên plan và cặp "over capacity / capacity expires at". Widget bị ẩn khi: plan không thuộc hai plan đặc biệt vĩnh viễn, **và** chu kỳ capacity chưa kết thúc, **và** shop bị cờ vượt capacity. So Shop -> Plan, Capacities với điều storefront đang tin.
- **Nguyên nhân**: (1) thật sự vượt capacity Free ([W1](#w1)); (2) cờ đã publish bị **cũ** sau khi đổi plan (ghi cờ thất bại/chậm); (3) plan đã huỷ nhưng còn thời gian ân hạn: storefront vẫn hiện plan trả phí đến hết kỳ đã trả rồi mới đổi.
- **Xử lý**: **[Support]** Shops -> hàng shop -> "Sync capacity to metafield" (an toàn, lặp được); đợi một phút rồi reload storefront.
- **Đừng**: nâng capacity để "chữa" cờ cũ.

<a id="w4"></a>
### W4. Box báo hết hàng mà tồn kho còn (hoặc ngược lại)
- **Triệu chứng**: "Tôi còn 20 món mà widget ghi Sold out."
- **Xác nhận**: Shops -> Boxes -> box -> tab **Inventory** và **Overview**; cài đặt box "show item availability / show item stock".
- **Nguyên nhân**: (1) box Tier kiểu **Pool** đã cạn, món khách bán lại đang chờ trong bộ đệm refill ([R8](02-resell-refund-credit.md#r8)); (2) dữ liệu đã publish **cũ** (trễ vài phút là bình thường); (3) sản phẩm Shopify của box tự bị draft/deactivate do bật "draft/deactivate on empty"; (4) pool theo collection là **ảnh chụp lúc Sync**: sản phẩm thêm vào collection sau đó không được tính tới khi merchant bấm Sync trên box; (5) pool có xác suất 0 thì mọi món hiện không có sẵn; (6) dòng Inventory bị xoá hoặc sync box thất bại (trang box: sync status failed).
- **Xử lý**: **[Support]** xem sync status của box; merchant bấm "Sync" (inventory) trong portal; chỉ unpublish rồi publish lại sau khi sync xong. **[Engineer]** ghi lại dữ liệu publish của cả shop: `user-product-variants:sync --user_id=<id>` (hỏi xác nhận, an toàn).
- **Đừng**: xoá dòng Inventory; sửa JSON trên box đã publish.
- **Ví dụ**: An thêm 15 sản phẩm mới vào collection "Plushies" mà box Pool của An dựa vào, nhưng widget vẫn ghi Sold out. Collection chỉ được đọc lúc Sync, nên An bấm Sync trên box, đợi trạng thái completed rồi publish lại.

<a id="w5"></a>
### W5. Widget hiện món / ảnh / giá cũ hoặc sai tiền tệ
- **Nguyên nhân**: dữ liệu cũ như [W4](#w4). Ảnh và tên món lấy **trực tiếp từ Shopify** nên đổi tên, draft hoặc xoá sản phẩm là widget đổi ngay; món không còn khả dụng hiện chữ "Not available" ở chỗ giá. Giá trên thẻ món dùng **tiền tệ mặc định của shop**, không quy đổi theo Shopify Markets (chủ ý). Giá hoàn khi resell Items thì theo thị trường của đơn ([R3](02-resell-refund-credit.md#r3)).
- **Xử lý**: **[Support]** giải thích; không có chỉnh sửa. Dữ liệu cũ xử lý như W4.

<a id="w6"></a>
### W6. Widget vỡ layout sau khi thêm custom code
- **Xác nhận**: Shop -> Edit -> Customizations: có custom CSS/JavaScript không? Lỗi có mất khi để trống không (nhờ merchant thử)?
- **Nguyên nhân**: CSS tuỳ chỉnh xung đột theme; script tuỳ chỉnh có lỗi cú pháp hoặc thẻ đóng thừa (mã được chèn **nguyên văn** vào trang); cart drawer đặc thù của theme; đối tượng `window.Mysbox` của merchant (list size, hide chance, selector).
- **Xử lý**: **[Support]** gỡ khối custom, thử lại, rồi đưa lại từng phần. Có thể chỉnh Style settings trong portal (animation, item list, recent pulls) trước khi đụng custom code.
- **Đừng**: dán JavaScript chưa thử vào ô Customizations trên shop đang bán (ảnh hưởng mọi khách ngay lập tức).

<a id="w7"></a>
### W7. Feed recent pulls thiếu / sai / hiện đơn test
- **Xác nhận**: trang box -> tab **Recent pulls** (các lượt mở đã ghi) và cài đặt (portal Style settings -> Recent pulls): công tắc, "visible from", "publish test orders" (mặc định tắt).
- **Nguyên nhân**: (1) feed **tắt** cho shop (trên production tắt thì không ghi gì); (2) box vật lý không bao giờ được ghi; (3) thiếu block "Mysbox recent pulls" ở product template; (4) lượt mở của đơn test bị ẩn nếu chưa bật "publish test orders"; (5) lượt cũ hơn "visible from" bị lọc; (6) trễ: mỗi box publish tối đa khoảng 6 lần mỗi phút; (7) nhân viên đã ẩn lượt đó.
- **Xử lý**: **[Support]** trang box -> "Resync recent pulls" (dựng lại cả feed theo cài đặt hiện tại, an toàn). Gỡ một lượt: tab Recent pulls -> "Hide from recent pulls" (ẩn cả lượt mở trên mọi box nó chạm; nhãn đổi thành "Retry hiding" nếu lần trước chưa xong). Đổi cài đặt không tự viết lại feed; phải chạy Resync.
- **Đừng**: xoá dòng box pulls (chúng nuôi share link). Resell/hoàn tiền/huỷ không được phản ánh trong feed.

<a id="w8"></a>
### W8. Bản dịch không áp dụng / sai ngôn ngữ
- **Xác nhận**: portal trang **Translation**: ngôn ngữ chọn, văn bản đã lưu cho ngôn ngữ đó; các ngôn ngữ shop đã publish.
- **Nguyên nhân**: (1) văn bản chỉ lưu cho ngôn ngữ khác; (2) bản dịch lưu thành hai bản (dữ liệu app và dữ liệu shop), ghi bản hai thất bại thì lệch nhau; (3) hai người lưu hai ngôn ngữ cùng lúc có thể ghi đè nhau; (4) storefront gán chuỗi **unboxing** từ khoá dịch của **product**, nên chữ ở bước unbox có thể ra chữ của product hoặc mặc định
- **Xử lý**: **[Support]** lưu lại văn bản đúng ngôn ngữ. **[Engineer]** so sánh hai bản nếu vẫn sai. Không có màn hình admin cho bản dịch.

<a id="w9"></a>
### W9. Không publish được box
- **Xác nhận**: đọc đúng toast: "Box must finish syncing before it can be published." / "Cannot publish: inventory pools are exhausted." / (portal) "Box sync is not complete".
- **Nguyên nhân**: sync chưa xong (đang đọc collection, có thể mất vài phút) hoặc thất bại; box Tier không còn hàng; shop Free đã chạm capacity nên box bị gỡ tự động ([W1](#w1)).
- **Xử lý**: **[Support]** đợi sync completed, nạp hàng, hoặc nâng capacity/plan.

<a id="w10"></a>
### W10. Không sửa được box đã publish / đổi collection mà box không đổi
- **Nguyên nhân**: box đã publish bị khoá sửa (chủ ý; route sửa trả "not found"). Quy trình: Unpublish -> sửa -> sync -> publish. Khách đã mua không bị ảnh hưởng. Pool theo collection là ảnh chụp lúc sync: bấm Sync trên box (sync lại giữ các món đã bốc còn tồn tại, xáo phần còn lại và dời con trỏ).
- **Xử lý**: **[Support]** hướng dẫn quy trình trên.
- **Đừng**: sửa JSON ở admin panel trên box đang chạy để lách khoá.

<a id="w11"></a>
### W11. Trang của khách (my orders / unbox) báo 404, trắng, hoặc đẩy sang đăng nhập
- **Xác nhận**: địa chỉ phải dạng `https://<shop>/apps/mysbox/orders/...`; đoạn `mysbox` là subpath của app proxy lúc cài, merchant đổi tên thì link cũ hỏng.
- **Nguyên nhân**: khách chưa đăng nhập và link thiếu phần danh tính ([O8](01-orders-and-reveal.md#o8)); Status của shop OFF ([K2](05-account-and-integrations.md#k2)); đơn/box của khách khác; trang proxy bị cache bản cũ ([W12](#w12)).
- **Xử lý**: **[Support]** đưa khách qua trang order status; nếu mọi khách đều trắng thì xem W12 và K2.

<a id="w12"></a>
### W12. Merchant vẫn thấy bản app cũ sau release
- **Nguyên nhân**: bundle app nhúng được cache theo một nhãn phiên bản không tự đổi. Trang khách thì theo "Customer Portal Resource".
- **Xử lý**: **[Support]** (chỉ khi engineer Dũng đã xác nhận bản mới đã deploy) Admin -> Development tools -> **Embedded Version** -> lưu giá trị mới; tương tự **Customer Portal Resource**. Cả hai ảnh hưởng mọi merchant/khách. Trước đó nhờ merchant hard-refresh.
- **Đừng**: đổi giá trị ngẫu nhiên.
