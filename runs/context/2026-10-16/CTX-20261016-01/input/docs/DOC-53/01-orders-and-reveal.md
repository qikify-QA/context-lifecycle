# Playbook 1: đơn hàng, bốc thăm và mở box

> 13 tình huống về chặng "khách mua box → hệ thống bốc quà → khách mở → quà vào đơn Shopify". Quay về [bảng tra](00-index.md). Nghiệp vụ nền: [mua và bốc thăm](../03-orders-and-reveal/01-purchase-and-draw.md), [hành trình mở box](../03-orders-and-reveal/02-reveal-journey.md), [quà vào đơn](../03-orders-and-reveal/04-prizes-added-to-order.md).

Nhớ ba điều trước khi đọc: (1) quà được **chọn ngay khi đơn được xử lý**, hoạt ảnh chỉ để "lộ" ra; (2) quà chỉ được thêm vào đơn Shopify **sau khi hết resell window** (mặc định 24 giờ) trừ khi merchant/auto-unbox mở hết; (3) job chạy định kỳ 8 giờ một lần (00:00, 08:00, 16:00).

<a id="o1"></a>
### O1. Khách đã trả tiền mà không có đơn / box trong Mysbox
- **Triệu chứng**: "Bình trả tiền rồi, Shopify báo Paid, mà trang đơn của Mysbox trống."
- **Xác nhận**: Shops -> shop -> tab Orders, tìm số đơn. Không có dòng nào = Mysbox chưa tạo. Kiểm tra trong Shopify đơn thực sự **Paid**.
- **Nguyên nhân**: (1) biến thể box **chưa publish** lúc đơn được trả (merchant gỡ, hoặc tự gỡ vì hết capacity): đơn bị bỏ qua im lặng; (2) thông báo "đơn đã trả" bị chậm/lỗi, Shopify không thử lại vì Mysbox luôn trả "ok"; (3) khách mua kiểu guest, đơn không gắn khách hàng nào nên bước xử lý báo lỗi "Customer is required"; (4) đơn từ POS/kênh bán khác không gửi thông báo chuẩn; (5) shop đang cần cấp quyền lại ([K1](05-account-and-integrations.md#k1)).
- **Xử lý**: **[Support]** nếu nguyên nhân 1 thì nhờ merchant publish lại box trước. Rồi Shops -> shop -> "Retry Handle Order" -> dán số đơn. Chạy lại không làm đôi box. Nếu báo "order not paid" thì merchant phải đánh dấu đã trả. **[Engineer]** nếu (3): xem failed jobs để biết đơn guest có thể cứu thế nào.
- **Đừng**: tạo đơn trùng hay draft order để "ép" ra box; publish/unpublish liên tục.
- **Ví dụ**: Shop An vừa bị khoá do hết 10 box capacity (xem [W1](03-storefront-and-widget.md#w1)). Bình trả tiền lúc 14:00 cho box đã bị gỡ. Chi nhờ An nâng plan, publish lại box, rồi bấm Retry Handle Order với mã đơn #1042; quà được bốc ngay, Bình mở được trong vài giây.

<a id="o2"></a>
### O2. Có đơn nhưng khách thấy "quay lại sau 30 phút", chưa mở được
- **Triệu chứng**: trang cảm ơn quay vòng khoảng 30 giây rồi báo quay lại sau.
- **Xác nhận**: Orders -> đơn -> tab Boxes: "winning bundles" có rỗng không, `total opened` bằng 0/N.
- **Nguyên nhân**: (1) hàng đợi nền chậm (bình thường vài giây); (2) job bốc thăm đang chờ khoá của chính box đó (mỗi biến thể box chỉ bốc một lượt một lúc, các lượt khác thử lại sau 30 giây); (3) job bốc thăm lỗi; (4) đơn chưa bao giờ được xử lý ([O1](#o1)).
- **Xử lý**: **[Support]** đợi tối đa 30 phút cho nguyên nhân 1-2. Mua thêm cùng loại box cũng bốc luôn các yêu cầu đang chờ nên tự gỡ. **[Engineer]** nếu sau 30 phút vẫn không có winners: xem failed jobs và xếp lại job bốc thăm của biến thể đó. "Retry Handle Order" **không** giúp khi yêu cầu mở đã tồn tại.
- **Đừng**: nói khách "box bị mất"; xoá yêu cầu mở (opening request).

<a id="o3"></a>
### O3. Nhận ít quà hơn số box đã mua
- **Triệu chứng**: mua 3 box, danh sách chỉ có 2 quà.
- **Xác nhận**: Orders -> Boxes -> "view winning bundles"; trang box -> tab Inventory xem tồn kho/pool có về 0 không.
- **Nguyên nhân**: (1) box có theo dõi tồn kho và hết hàng giữa lúc khách trả tiền và lúc bốc; (2) box Tier "dừng khi hết" cạn giữa đơn; (3) merchant sửa tồn kho đúng lúc.
- **Xử lý**: **[Support]** đây là quyết định của merchant: hoàn tiền các box chưa có quà trong Shopify, hoặc nạp thêm hàng rồi tự xử lý đơn. Mysbox không tự hoàn tiền.
- **Đừng**: sửa JSON winners bằng tay; xoá dòng inventory.

<a id="o4"></a>
### O4. Bấm Unbox thì lỗi, hoặc bị đẩy về trang đơn / "tôi mở hai lần"
- **Triệu chứng**: hoạt ảnh chạy rồi báo lỗi; hoặc khách refresh giữa chừng.
- **Xác nhận**: Boxes tab: `total opened` so với quantity (có thể đã mở hết); Status (Security); cờ re-auth.
- **Nguyên nhân**: (1) không còn box nào để mở (mở ở tab khác, bởi auto-unbox hoặc bởi merchant); (2) shop đang OFF ([K2](05-account-and-integrations.md#k2)); (3) link hết hạn ([O8](#o8)); (4) shop vượt capacity nên khối bị ẩn ([W3](03-storefront-and-widget.md#w3)); (5) khách refresh lúc server đã lộ box: lần refresh có thể bắt đầu lộ box kế tiếp, chặn trùng chỉ nằm ở trình duyệt khách.
- **Xử lý**: **[Support]** chỉ khách vào trang chi tiết đơn: mọi box đã mở đều liệt kê kèm quà. Không mất gì. `total opened` không bao giờ vượt quantity. Nếu box thật sự chưa mở và Status ON, xin ảnh chụp lỗi rồi báo engineer.
- **Đừng**: đặt lại `total opened` trong database.

<a id="o5"></a>
### O5. "Quà khác với hoạt ảnh" / "cho tôi quay lại"
- **Xác nhận**: Boxes -> "view winning bundles" là sự thật duy nhất.
- **Nguyên nhân**: quà do server chọn từ lúc xử lý đơn; hoạt ảnh chỉ lộ ra, không quyết định.
- **Xử lý**: **[Support]** giải thích; resell (nếu merchant bật) là "cơ hội thứ hai" duy nhất.
- **Đừng**: chạy lại bốc thăm (không có cách hỗ trợ; làm sai lệch tồn kho).

<a id="o6"></a>
### O6. Auto-unbox không xảy ra đúng giờ
- **Triệu chứng**: hẹn 09:00 mà tới tối vẫn chưa mở.
- **Xác nhận**: Boxes tab: "unboxing at", status, `total opened`. Giờ này được đóng dấu **lúc đặt hàng** nếu merchant đã bật auto-unbox khi đó; không tính lại.
- **Nguyên nhân**: (1) job chỉ chạy lúc 00:00/08:00/16:00 nên có thể trễ đến 8 giờ (hẹn 09:00 thì 16:00 mới chạy; trang khách đã hiện quà khi quá giờ); (2) đơn đang trong resell; (3) quá giờ hơn 7 ngày; (4) đơn đã Completed; (5) toàn box vật lý; (6) merchant bật tính năng sau khi khách đặt; (7) khách thêm box vào đơn đã Completed: đơn quay lại Queued nhưng box mới không có giờ unbox.
- **Xử lý**: **[Support]** merchant bấm "Open all boxes" trên đơn trong portal (hoặc "Unbox all boxes" ở trang đơn Shopify). **[Engineer]** một đơn lẻ: lệnh `should-unbox-orders:unbox --id=<id đơn Mysbox>`; vẫn phải qua đủ điều kiện nên đơn đã mở hết sẽ bị bỏ qua.
- **Đừng**: sửa giờ unbox trong database; chạy lệnh không có `--id` trên production.

<a id="o7"></a>
### O7. Khách không nhận nhắc "unboxing soon"
- **Nguyên nhân**: nhắc **không phải email của Mysbox** mà là trigger "order unboxing soon" trong Shopify Flow: (1) merchant chưa có workflow Flow; (2) giờ nhắc đã quá hơn 1 ngày; (3) đã gửi một lần (chỉ gửi tối đa một lần, không gửi lại); (4) shop cần cấp quyền lại.
- **Xác nhận/Xử lý**: **[Support]** kiểm tra workflow Flow và General Settings -> Auto-unbox notification. **[Engineer]** gửi lại: đặt lại giờ nhắc của đơn rồi chạy `should-unbox-order:send-trigger --order_id=<id>`.
- **Đừng**: hứa gửi lại nhiều lần.

<a id="o8"></a>
### O8. "Magic link is not correct" / hết hạn / bị bắt đăng nhập
- **Nguyên nhân**: (1) link bị cắt mất phần `?parameters=`; (2) token hết hạn; (3) khách mở link trên trình duyệt đang đăng nhập tài khoản khác.
- **Xử lý**: **[Support]** chỉ khách vào trang Thank-you / Order status của đơn đó (khối unbox tạo link mới) hoặc đăng nhập tài khoản shop rồi vào Orders. *chưa xác nhận: trang có tự làm mới token hết hạn không.*
- **Đừng**: tự ghép link gửi khách.

<a id="o9"></a>
### O9. Mất nút / khối Unbox ở trang cảm ơn hoặc order status
- **Xác nhận**: portal merchant -> Dashboard -> setup guide: khối unbox đã đặt ở Thank-you và Order-status chưa.
- **Nguyên nhân**: (1) merchant chưa thêm app block trong checkout editor; (2) hết hạn/vượt capacity nên khối không render ([W3](03-storefront-and-widget.md#w3)); (3) toàn box vật lý (không có gì để mở); (4) box chưa publish hoặc thiếu dữ liệu trên biến thể; (5) đang hiện chữ "chờ" ([O2](#o2)).
- **Xử lý**: **[Support]** hướng dẫn "Add block" theo setup guide.
- **Đừng**: sửa theme thay merchant.

<a id="o10"></a>
### O10. Khách mở hết rồi mà quà không có trong đơn Shopify
- **Triệu chứng**: "Bình mở xong từ sáng, đơn Shopify chỉ có dòng box."
- **Xác nhận**: Orders -> Boxes: status Queued/Failed và `total opened` = quantity; cột "resell processing at".
- **Nguyên nhân**: (1) **còn trong resell window** (mặc định 24 giờ sau lúc bốc, rồi chờ job 8 giờ); (2) chưa mở hết; (3) status Failed ([O11](#o11)); (4) job chỉ nhặt đơn có resell window kết thúc trong 24 giờ gần nhất, nên nếu scheduler tắt lâu thì đơn bị bỏ sót; (5) shop bật "skip order line item sync" (đơn qua Completed mà không thêm dòng, là chủ ý) hoặc cần cấp quyền lại; (6) đơn Shopify không sửa được (đã huỷ/đóng).
- **Xử lý**: **[Support]** Orders -> đơn -> "Retry Sync Winning Items & Boxes to Shopify Order"; chạy lại an toàn; xem đơn Shopify sau một phút. Merchant bấm "Open all boxes" thì quà vào ngay nhưng **chấm dứt resell** của đơn.
- **Đừng**: thêm dòng quà bằng tay trong Shopify (retry sẽ thêm lần nữa); retry quá hai lần mà không đọc lỗi. Dòng quà hiện giá bình thường kèm giảm 100 phần trăm mô tả "MYSBOX"; đó là chủ ý, tổng đơn không đổi.
- **Ví dụ**: Bình mua 2 box lúc 10:00 và mở ngay lúc 10:05. Resell window kết thúc 10:00 hôm sau; job kế tiếp là 16:00, nên quà vào đơn khoảng 16:00 hôm sau, tức hơn 30 giờ sau lúc mua. Đây là hành vi đúng, không phải lỗi.

<a id="o11"></a>
### O11. Đơn status Failed, hoặc đơn có rất nhiều loại quà bị kẹt
- **Xác nhận**: Boxes tab status Failed; engineer xem lỗi trong Horizon. Đơn Queued rất lâu mà có hơn 100 biến thể quà khác nhau thì rơi vào chế độ bulk.
- **Nguyên nhân (Failed)**: Shopify từ chối sửa đơn (đã huỷ/đóng/hoàn hết, sản phẩm hay biến thể bị xoá), rate limit, token chết. **(Kẹt bulk)**: mỗi bước chờ thông báo của Shopify, tối đa 5 bulk job mỗi shop, một thông báo mất làm chiếm chỗ tới 24 giờ.
- **Xử lý**: **[Support]** sửa nguyên nhân cùng merchant rồi "Retry Sync" một lần. Bulk: đợi 15-30 phút rồi retry một lần. **[Engineer]** lệnh `orders:sync-shopify-line-items --order_id=<id>` (hỏi xác nhận); bulk kẹt thì xem trạng thái bulk của shop.
- **Đừng**: đặt đơn Completed trong database; retry liên tiếp (mỗi lần xếp thêm việc bulk).

<a id="o12"></a>
### O12. Box vật lý: không trừ kho, thiếu tag/note/metafield, đơn cũ thiếu prize ids
- **Xác nhận**: trang đơn -> mục "Physical Box Post-Processing": các badge Inventory, Tag, Note, Metafield (rê chuột vào Failed để xem lỗi). Khách không tự mở được box vật lý: box được lộ ngay sau khi bốc; merchant ship quà dựa trên các thông tin này.
- **Nguyên nhân**: (1) chưa có location cho fulfillment ("inventory location not found"); (2) biến thể quà không theo dõi tồn kho (bỏ qua có chủ ý); (3) merchant tắt bước (tag và note **tắt mặc định**, metafield bật mặc định); (4) shop nhiều location: chỉ trừ ở location **đầu tiên** có fulfillment; (5) tag dài hơn 40 ký tự; (6) mẫu note dùng placeholder không hỗ trợ (chỉ id, quantity, sku, variant_title, product_title); (7) đơn cũ trước khi có bước prize ids.
- **Xử lý**: **[Support]** sửa cấu hình rồi Orders -> Actions -> "Retry Physical Box Post-Processing" (chỉ chạy lại bước Failed, bước Succeeded không lặp, trừ kho có khoá chống trừ đôi). **[Engineer]** đơn cũ: `physical-box:backfill-prize-ids --user_id=<id shop>` (hỏi xác nhận, an toàn khi chạy lại).
- **Đừng**: chỉnh kho tay rồi mới retry (trừ hai lần); sửa tag/note trong Shopify rồi retry (có thể ghi đè note).

<a id="o13"></a>
### O13. Đơn test / preview cư xử lạ
- **Xác nhận**: Orders -> lọc **Test = yes**. Đơn preview là đơn test mang tag `mysbox-preview-order`.
- **Hành vi**: đơn test vẫn bốc thật, **tiêu thụ tồn kho** và tính vào capacity; không tính phí usage nếu shop bật "Exclude test order" (Shop -> Edit -> Plan). `[chỉ có trên staging]` đơn preview không tiêu thụ kho/pool; trên production thì có.
- **Xử lý**: **[Support]** bảo merchant nạp lại kho/Sync sau khi test trên production. Chỉ bỏ "Exclude test order" khi cố ý.
- **Đừng**: xoá đơn test trong database (thống kê lệch).
