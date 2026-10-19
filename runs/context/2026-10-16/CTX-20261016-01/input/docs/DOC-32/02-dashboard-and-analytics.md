# Dashboard và analytics

> Giải thích **chính xác từng con số** trên Dashboard và màn Analytics: tính từ đâu, đơn nào bị loại, vì sao lệch so với báo cáo Shopify. Thuộc nhóm [06-merchant-app](00-overview.md). Bộ đếm hạn mức và cách tính phí xem [05/01](../05-plans-billing/01-plans-and-capacity.md).

## Các khối trên Dashboard (từ trên xuống)

| Khối | Hiển thị |
|---|---|
| Banner thông báo `[chỉ có trên staging]` | Banner do admin tạo; merchant không tắt được ([07/04](../07-automation-growth/04-banners-and-emails.md)) |
| App extension status, Setup guide | Xem [01](01-install-and-onboarding.md) |
| Promo carousel | Câu chuyện khách hàng, đặt lịch tư vấn (nội dung tĩnh) |
| **"Box sales limit"** | Bộ đếm hạn mức, mục dưới |
| **Analytics center** | Hai con số + chọn ngày + nút "View details" |
| "Recently created mystery boxes" | 5 box mới nhất: ảnh, tên, trạng thái, tổng, tồn kho, Edit / Analytics / Delete |
| Resources | Help center, cộng đồng, đối tác, chương trình affiliate (30% mỗi user trả phí giới thiệu) |
| Chọn ngôn ngữ | English / Japanese cho giao diện admin |

Nút chính "Create new box" bị khoá khi shop Free đã vượt hạn mức. Shop early-bird thấy thêm hộp "Hello, Founding member!".

## Bộ đếm "Box sales limit"

- Dòng `used / quota`, ví dụ `4 / 100`, kèm thanh tiến độ. **Used** = số box đã tính vào hạn mức chu kỳ này; **quota** = hạn mức của gói cộng phần promote code tặng thêm.
- Từ 80% thanh đổi màu; Free thấy chữ "You almost reach the box limit..." rồi "You have reached the box limit..." và nút "Upgrade" (trừ trang Pricing).
- Gói trả phí thêm "Total sold in cycle" (mọi box đã bán, kể cả vượt) và, khi đã đạt 100%, "Extra fee" (phí vượt đến giờ).
- Các số này đọc lúc trang mở; muốn số mới phải tải lại.

## Hai con số ở Analytics center và bốn thẻ ở màn Analytics

Chỉ tính **box** (không tính hàng khác trong giỏ), từ bản ghi tạo lúc đơn được thanh toán.

| Số (nhãn) | Định nghĩa chính xác |
|---|---|
| **"Total sales from mystery boxes"** | Tổng, trên các dòng box, của (đơn giá x số lượng trừ giảm giá phân bổ cho dòng đó), theo tiền tệ shop, trước thuế và ship. Hoàn tiền từ resell **không** bị trừ |
| **"Total mystery boxes sold"** | Tổng số lượng box trên các dòng đó |
| **"Mystery box average order value"** (chỉ ở Analytics) | Doanh thu box chia số **đơn** khác nhau có box trong khoảng ngày |
| **"Returning rate"** (chỉ ở Analytics) | Số khách có nhiều hơn một bản ghi đơn trong khoảng ngày / số khách có ít nhất một. Chỉ so trong khoảng ngày, không xét lịch sử cả đời |
| **"Top selling boxes"** | Tối đa 10 variant box, sắp theo số lượng: Box, Quantity, Revenue |


## Quy tắc làm đổi con số

1. **Khoảng ngày.** Mặc định "Today": từ 0h theo giờ trình duyệt đến lúc này. Có Today, Yesterday, Last 7 days, Last 30 days, Last week, Last month, Week to date, Month to date, Custom. "Last 7 days" và "Last 30 days" là N ngày trước hôm nay **đến hết hôm qua**, không gồm hôm nay. Server giới hạn tối đa 180 ngày và không cho ngày bắt đầu sớm hơn ngày shop cài app.
2. **Test order.** Portal luôn gửi `test:false`. Đơn test của Shopify chỉ bị gắn "test" (và bị loại) khi cờ **Exclude Test Order** của shop đang bật (mặc định bật, chỉ nhân viên Mysbox đổi được). Khi cờ tắt, đơn test được ghi như đơn thật: có trong analytics, **và** trừ hạn mức, **và** sinh usage fee. Đơn "preview" của tính năng xem trước box cũng là đơn test.
3. **Một tiền tệ.** Chỉ cộng đơn cùng tiền tệ với shop; đơn tiền tệ khác không được cộng.
4. **Sửa đơn.** Thêm dòng box vào đơn chỉ cộng phần chênh lệch (delta), nên số vẫn đúng.
5. **Gói Free** (hoặc không có charge): bốn thẻ hiện "-" và màn Analytics báo "Analytics is not available in the Free plan. Upgrade your plan to unlock detailed performance insights and analytics." Dữ liệu vẫn được thu thập, chỉ portal chặn hiển thị. Gói đã huỷ (charge ở trạng thái Cancelled) vẫn xem được số liệu.

## Ví dụ: ngày của Shop An (đã nâng lên gói trả phí, cờ Exclude Test Order bật)

| Đơn | Nội dung | Tính vào analytics? |
|---|---|---|
| #1001 | Bình mua 2 box, niêm yết $80, mã 10% nên trả $72 | Có: doanh thu $72, 2 box |
| #1002 | Dũng mua 1 box $40 | Có: $40, 1 box |
| #1003 | Bình mua thêm 1 box $40 | Có: $40, 1 box |
| #1004 | An tự đặt đơn test 1 box $40 | Không (test) |
| #1005 | Đơn chỉ có áo thun | Không (không có box) |

Kết quả khoảng "Today":
- Total sales = 72 + 40 + 40 = **$152**; Total boxes sold = 2 + 1 + 1 = **4 boxes**.
- AOV = 152 / 3 đơn = **$50.67**.
- Returning rate: Bình có 2 đơn, Dũng có 1; 1 / 2 = **50%**.
- Top selling: "Sneaker Mystery", 4 box, $152.
- Bộ đếm hạn mức tăng 4 (đơn test không tính). Nếu cờ Exclude Test Order tắt: $192, 5 box và hạn mức tăng 5.

Sau đó Bình resell 1 box lấy $32: doanh thu hôm nay **vẫn là $152**.

## Câu hỏi thường gặp

1. **Doanh thu khác báo cáo Shopify?** Mysbox chỉ cộng dòng box, sau giảm giá dòng, trước thuế/ship, không trừ resell, chỉ tiền tệ shop, ghi lúc đơn paid.
2. **Bộ đếm báo 10/10 nhưng An nhớ bán ít hơn?** Bộ đếm gồm box bán trước khi nâng gói hoặc cài lại; chu kỳ 30 ngày tính từ ngày cài đầu tiên; promote code cộng thêm vào quota.
3. **Hôm nay không có số?** Kiểm tra gói Free, khoảng ngày, đơn là đơn test, hoặc ngày cài app muộn hơn ngày bắt đầu.
