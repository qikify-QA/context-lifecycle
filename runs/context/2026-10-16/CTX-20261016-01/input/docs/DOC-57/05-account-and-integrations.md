# Playbook 5: tài khoản, kết nối, gỡ/cài app và tích hợp

> 14 tình huống về chặng "shop có còn nói chuyện được với Mysbox không" và các tích hợp xung quanh: token, kill switch, gỡ/cài lại, GDPR, Shopify Flow, email, analytics, share, affiliate, quyền nhân viên. Quay về [bảng tra](00-index.md). Nền: [shop status và vòng đời](../06-merchant-app/04-shop-status-and-lifecycle.md), [xác thực và token](../09-integrations/00-overview-and-auth.md), [webhooks](../09-integrations/01-webhooks.md), [Shopify Flow](../07-automation-growth/01-shopify-flow.md), [share unboxing](../07-automation-growth/02-share-unboxing.md).

<a id="k1"></a>
### K1. App đòi cấp quyền lại / email "reconnect the app"
- **Triệu chứng**: "Mở app thấy bắt authorize lại, kèm email yêu cầu kết nối lại."
- **Xác nhận**: Shop -> View -> mục **Tokens**: **Re-auth Required At** có ngày; Refresh Token Expires At đã qua, hoặc token là loại cũ không hết hạn.
- **Nguyên nhân**: (1) khoá làm mới 90 ngày hết hạn hoặc bị từ chối vì job làm mới hằng ngày không gia hạn được (shop không liên lạc được nhiều tuần, hoặc app từng ngừng); (2) token cũ không hết hạn đã quá hạn cắt của Shopify (1/1/2027); (3) store bị đóng/đóng băng lâu rồi mở lại; (4) gỡ rồi cài lại thì cờ này **được xoá**, không phải nguyên nhân.
- **Ảnh hưởng khi bị cờ**: Mysbox không đọc đơn, thêm quà, ghi dữ liệu box, lấy giá hay tính usage cho shop; mọi việc nền của shop lỗi.
- **Xử lý**: **[Support]** bảo merchant **mở app từ Shopify admin** và chấp nhận màn hình cấp quyền: cấp cặp khoá mới và xoá cờ. Sau đó chạy "Retry Handle Order" cho đơn trả trong lúc gián đoạn ([O1](01-orders-and-reveal.md#o1)) và Retry Sync cho đơn kẹt ([O10](01-orders-and-reveal.md#o10)). Có thể thử "Refresh access token" một lần trước (hỏng nếu khoá làm mới đã chết). **[Engineer]** làm mới hàng loạt: `tokens:refresh-expiring --days=90 --user_id=<id>`; đổi token cũ: `tokens:migrate-legacy --user_id=<id>` (không đảo ngược được, Shopify thu hồi khoá cũ).
- **Đừng**: bấm "Refresh access token" nhiều lần (khoá làm mới dùng một lần); bắt merchant OAuth lại chỉ vì khoá truy cập 1 giờ hết hạn (bình thường và tự làm mới).
- **Ví dụ**: Shop An đóng cửa hàng nghỉ lễ 3 tháng. Khi mở lại, An thấy yêu cầu authorize và nhận email. Chi hướng dẫn An mở app và bấm Accept; sau đó Chi chạy Retry Handle Order cho 6 đơn của khách đã trả trong thời gian shop mới mở lại nhưng chưa authorize.

<a id="k2"></a>
### K2. "App is not available yet. Please wait for the app to be ready or try again later."
- **Nguyên nhân**: Status (Security) của shop đang **OFF** (portal hiện khối này khi status bằng 0). Chỉ nhân viên tắt/bật (kill switch), không bao giờ tự động.
- **Xác nhận/Xử lý**: **[Support]** Shop -> Edit -> Security: xem Status và Note. Bật lại để khôi phục. Khi OFF: app nhúng và các lời gọi của khách trả "access denied". Nó **không** gỡ box hay dừng billing.
- **Đừng**: dùng OFF như "gỡ app" (billing vẫn chạy).

<a id="k3"></a>
### K3. Cài xong app trống: không có dữ liệu, profile trống, Pricing rỗng
- **Nguyên nhân**: bước lấy profile lúc cài thất bại; hàng plan Free mặc định bị thiếu (lúc đó cài đã lỗi); dev store thiếu địa chỉ; thông báo cập nhật shop chưa tới.
- **Xác nhận**: dòng shop phải có tên, tiền tệ, múi giờ, quốc gia. **Xử lý**: **[Support]** merchant reload; **[Engineer]** chạy lại lấy profile shop hoặc chờ thông báo cập nhật shop kế tiếp.

<a id="k4"></a>
### K4. Gỡ app rồi muốn xoá / lấy lại dữ liệu, hoặc cài lại và mong có lại box
- **Điều xảy ra khi gỡ**: shop và toàn bộ box, version, đơn, khách, usage, analytics **được giữ**; shop chỉ bị đánh dấu xoá mềm và token bị xoá; subscription huỷ có thời gian ân hạn đến hết kỳ đã trả; plan về Free.
- **Khi cài lại**: **cùng bản ghi** được khôi phục: box (thường đã unpublish), đơn, lịch sử xuất hiện lại. Plan là Free; nếu vượt capacity Free thì box bị gỡ và gửi email capacity. Bộ đếm capacity không reset (chu kỳ tính từ lần cài đầu).
- **Xác nhận**: Shops -> lọc Trashed "with trashed": thấy Deleted At; sau cài lại có Reinstalled At.
- **Xử lý**: **[Support]** giải thích. Merchant không có nút export; **[Engineer]** có thể trích dữ liệu box/đơn của shop khi chủ shop yêu cầu. Xoá thì xem [K5](#k5).
- **Đừng**: hứa dữ liệu đã bị xoá.
- **Ví dụ**: Shop An gỡ app tháng 6, cài lại tháng 10 và hỏi "box cũ của tôi đâu?". Chi mở Trashed: thấy Deleted At tháng 6 và Reinstalled At tháng 10; 4 box vẫn còn nhưng unpublished vì An đang ở Free với capacity đã vượt. An phải nâng plan và publish lại từng box.

<a id="k5"></a>
### K5. Yêu cầu GDPR: xoá hoặc xuất dữ liệu
- **Thực tế**: Shopify gửi ba thông báo (khách yêu cầu dữ liệu, khách yêu cầu xoá, shop yêu cầu xoá 48 giờ sau gỡ). Mysbox có handler cho cả ba nhưng **mỗi handler chỉ ghi một dòng log**, không xuất, không xoá.
- **Xử lý**: **[Support]** không nói đã xoá/xuất. Chuyển product owner và engineer; việc trích hoặc xoá phải làm tay trong database (không có công cụ và nhiều bảng không nối khoá tới khách). Xem dữ liệu cá nhân Mysbox giữ ở [vòng đời shop](../06-merchant-app/04-shop-status-and-lifecycle.md).
- **Đừng**: xác nhận đã hoàn tất với người yêu cầu.

<a id="k6"></a>
### K6. Store của merchant bị đóng băng / đóng cửa / tạm dừng
- Mysbox **không chặn** shop frozen: box vẫn publish, nhưng webhook ngừng đến vì Shopify ngừng gửi. Báo cáo bỏ qua plan frozen, cancelled, fraudulent. Khi mở lại mà khoá chết thì email re-auth gửi ([K1](#k1)). Dormant/paused coi như mở.
- **Xử lý**: **[Support]** sau khi mở lại: kiểm tra K1 và replay các đơn bỏ lỡ ([O1](01-orders-and-reveal.md#o1)). Câu hỏi billing của store frozen thuộc về support.

<a id="k7"></a>
### K7. Shopify Flow trigger không bắn
- **Xác nhận trước**: merchant đã **tick** "Enable Mysbox triggers in Shopify Flow" (General Settings -> Integration) và workflow dùng đúng trigger Mysbox.

| Trigger (như merchant thấy trong Flow) | Khi nào bắn | Cần công tắc? | Nếu không bắn |
|---|---|---|---|
| **All box opened** | khi mọi box **digital** của đơn đã mở; một lần mỗi đơn mãi mãi | có | đơn toàn box vật lý; công tắc tắt lúc đó (không phát lại); chưa mở hết |
| **Order unboxing soon** | mỗi giờ phút :30, đơn đã tới giờ nhắc, giờ unbox còn ở tương lai, còn box digital chưa mở; một lần | không | quá giờ nhắc hơn 1 ngày; đã gửi; tắt nhắc ([O7](01-orders-and-reveal.md#o7)) |
| **Resell completed** | ngay sau khi resell commit | có | resell lỗi; công tắc tắt |
| **Box sold out** | khi tồn kho box có theo dõi về 0 sau một lần bốc | không | box không theo dõi kho; chưa về 0 |
| **Digital order synced** | sau khi quà đã thêm vào đơn digital (kể cả khi không cần thêm) | có | đơn còn Queued/Failed ([O10](01-orders-and-reveal.md#o10)); không có box digital |
- Trigger gửi bằng job nền **không retry**: Shopify lỗi là mất. Không có công cụ admin phát lại. **Xử lý**: **[Support]** xác nhận trạng thái đơn trong tab Boxes. **[Engineer]** nếu trigger quan trọng với nghiệp vụ: dispatch lại từ console (chỉ "unboxing soon" có lệnh, xem O7).
- **Ví dụ**: An làm workflow gửi email "cảm ơn" khi All box opened. Bình mua 1 box vật lý và 1 box digital, mở box digital: trigger bắn một lần. Bình mua thêm box digital vào cùng đơn và mở: không bắn lại, vì trigger này chỉ một lần mỗi đơn.

<a id="k8"></a>
### K8. Action của Flow báo lỗi hoặc "still being processed"
- **Open order boxes**: "still being processed, try again" khi đơn chưa được phản chiếu (đợi ít nhất 10 giây sau khi trả, Flow tự thử lại); `processed: false` khi không còn gì để mở và đơn chưa Completed; còn lại bắt đầu unbox và trả quà.
- **Remove order boxes**: đơn phải Completed; chỉ dòng digital.
- **Handle external sales channel order paid**: đơn phải Paid trong Shopify.
- Giới hạn 60 action mỗi phút mỗi shop. Sai chữ ký (lệch secret) báo lỗi xác thực. **Xử lý**: **[Support]** chờ rồi chạy lại; kiểm tra đơn Completed ([O10](01-orders-and-reveal.md#o10)).

<a id="k9"></a>
### K9. Email (capacity reached, reconnect) không đến
- **Nguyên nhân**: email đi qua template cấu hình theo môi trường; tên template rỗng thì bỏ qua im lặng; cần email shop; email reconnect chỉ gửi một lần cho mỗi giai đoạn token chết (lúc cờ được đặt) và chỉ cho shop cài ở gói Shopify mở. Xem [F8](04-billing.md#f8), [K1](#k1). **Xử lý**: **[Engineer]** kiểm tra template ở môi trường đó.

<a id="k10"></a>
### K10. Trang Analytics ra 0 hoặc số lạ
- **Nguyên nhân**: (1) đơn trả khi shop mất kết nối **chưa bao giờ được ghi** (replay bằng Retry Handle Order, [O1](01-orders-and-reveal.md#o1)); (2) lọc sai tiền tệ (đơn tiền tệ khác bị loại, không quy đổi); (3) khoảng ngày vượt 180 ngày; (4) plan Free thấy banner "paid plan required"; (5) đơn test bị loại; (6) job analytics lỗi. Số toàn nền tảng (trang Analytic admin, bảng tính báo cáo) dùng định nghĩa "shop thật" hơi khác nên lệch nhỏ.
- **Xử lý**: **[Support]** replay đơn thiếu, kiểm tra khoảng ngày. Không có lệnh dựng lại analytics của merchant.

<a id="k11"></a>
### K11. Ảnh share bị thiếu / link share lỗi `[chỉ có trên staging]`
- **Nền**: sau khi mở box, khách tạo share link kèm ảnh. Mỗi lần mở một link; ảnh và chữ **đóng băng** lúc tạo; tạo lại trả cùng link.

| Triệu chứng | Nguyên nhân |
|---|---|
| Không có nút Share | Công tắc share của shop tắt (mặc định bật; merchant tắt ở Style settings -> Share). Production chưa có. |
| "Image too large / wrong shape / unsupported type" | Ảnh phải PNG hoặc JPEG, tối đa 2 MB, **đúng 1200 x 630 pixel**; được nén lại thành JPEG và xoá metadata. |
| "Too many requests" | 10 link/phút và 60 link/giờ mỗi khách. |
| "Daily limit reached" cả shop | Mỗi shop lưu tối đa 300 ảnh share/24 giờ; staff chỉnh được riêng mỗi shop, merchant không tự nâng. |
| Dán link vào chat không hiện ảnh xem trước | Ảnh nằm công khai trên kho file; cấu hình ổ lưu trữ sai thì link vẫn mở nhưng không có ảnh. Link: `https://<shop>/apps/mysbox/share/<token>`. |
| "Not found" khi tạo | Lượt mở không thuộc khách đó hoặc không tồn tại (cùng một câu trả lời để chống dò). |
| Link mở trang chủ chứ không phải sản phẩm | Lượt mở gồm box của nhiều sản phẩm nên trỏ về cửa hàng. |
- **Xử lý**: **[Support]** khách thử lại với ảnh đúng kích thước; **[Engineer]** nếu lỗi ổ lưu trữ.
- **Đừng**: bảo khách thử ảnh khác để có preview "mới" (ảnh đầu tiên giữ nguyên).
- **Ví dụ**: Bình tải ảnh 1080 x 1080 cho share link và nhận "wrong shape". Chi hướng dẫn Bình dùng ảnh 1200 x 630 PNG dưới 2 MB; link tạo ra dùng ảnh này mãi mãi.

<a id="k12"></a>
### K12. Order source (nguồn đơn) bị thiếu `[chỉ có trên staging]`
- **Cách hoạt động**: khi share link dẫn tới một đơn, hệ thống kiểm tra đơn khoảng 20 phút sau khi trả (rồi mỗi 30 phút bằng job) với dữ liệu customer journey của Shopify, kéo dài khoảng 60 phút kể từ lần kiểm tra đầu rồi bỏ cuộc thành "no source".
- **Nguyên nhân thiếu**: shop chưa từng tạo share link lúc đơn trả (không có lịch kiểm tra, và không lên lịch bù); đơn chỉ có box vật lý; dữ liệu journey của Shopify chưa sẵn trong 1 giờ; shop cần re-auth ([K1](#k1)); shop đã gỡ app (lịch bị xoá).
- **Xử lý**: **[Support]** giải thích giới hạn; analytics mất vì job lỗi không được tính lại.

<a id="k13"></a>
### K13. Referral của affiliate không được ghi nhận
- **Quy tắc**: tham chiếu gắn vào lần vào app nhúng đầu tiên trong **30 phút sau khi cài**; muộn hơn bị từ chối ("Instance is too old"); shop đã có reference thì bị từ chối ("already has affiliated"). Sự kiện subscribe/unsubscribe chỉ báo cho shop có reference. Nếu bật pricing affiliate, mã giảm giá đặc biệt tự áp lúc đăng ký plan.
- **Xử lý**: **[Support]** reference sửa được ở Shop -> Affiliate (admin). Backfill sang hệ thống partner thì chuyển engineer. Xem [affiliate và partner sync](../07-automation-growth/05-affiliate-and-partner-sync.md).

<a id="k14"></a>
### K14. Đồng nghiệp không thấy menu / nút, hoặc đăng nhập Slack lỗi
- **Quyền**: theo từng ability, mục không có quyền thì ẩn hẳn. Xem vai trò ở Admin -> Roles; ability mới cần engineer sinh trước. Xem [đăng nhập và vai trò](../08-admin-panel/01-login-and-roles.md).
- **Slack**: "Your Slack account is not authorized." (không có admin với email đó, hoặc sai workspace); "Unable to sign in with Slack. Please try again." (lỗi phía Slack, tự thử lại một lần); 404 ở /admin (sai host); "too many attempts" (20 lần/phút).
- **Xử lý**: **[Support]** quản trị viên cấp quyền hoặc tạo admin; **[Engineer]** sinh ability mới.
