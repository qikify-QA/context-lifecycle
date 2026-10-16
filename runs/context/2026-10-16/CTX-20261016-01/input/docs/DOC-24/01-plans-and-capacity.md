# Plan và capacity (quota)

> File này nói về **các loại plan** và **cách đếm quota**: bao nhiêu box merchant được bán miễn phí mỗi chu kỳ, cái gì được tính là "đã dùng", chuyện gì xảy ra khi chạm giới hạn, email cảnh báo, và trial. Phí cho phần vượt quota nằm ở [02-usage-pricing.md](02-usage-pricing.md). Về nhóm: [00-overview.md](00-overview.md).

## Plan Free và Paid

| | Free | Paid |
|---|---|---|
| Cách có | Mặc định cho mọi shop mới cài | Merchant chọn "Choose this plan" |
| Giá | 0 | Giá tháng cố định (subscription Shopify) |
| Quota / chu kỳ | 10 box (seed) | Theo plan, ví dụ 100 |
| Hết quota | **Gỡ publish toàn bộ box** | Vẫn bán, phí từng box vượt |
| Phí vượt | Không | Có (số lượng hoặc theo giá trị) |

Trên trang "Pricing", merchant thấy thẻ Free đầu tiên rồi các plan Paid đang "Visible". Mỗi thẻ có tên plan, badge trial ("7 - days free trial" hoặc "N - trial days left" nếu đang trial), giá "/ month", mô tả ("Free N boxes sales/month") và nút "Choose this plan" (plan hiện tại: nút khoá, chữ "Selected"). Có tab Monthly / Annually nếu admin tạo plan năm.

Ai được chọn plan nào: plan gắn cờ "Plus" cho shop Shopify Plus, "Shopify Paid" cho shop gói trả phí thường; development store chọn được mọi plan (đăng ký dạng **test subscription**, không mất tiền). Sai điều kiện sẽ báo "Plan is not supported".

Sửa plan **không** ảnh hưởng shop đã đăng ký: lúc đăng ký, giá, quota, quy tắc phí và trial được chép vào bản ghi riêng của shop. Chỉ đăng ký mới (kể cả đăng ký lại cùng plan) mới nhận thay đổi.

## Chu kỳ và quota

- Chu kỳ dài **30 ngày**, neo vào **ngày shop cài app lần đầu** (không phải ngày đăng ký plan hay ngày Shopify tính tiền). Ví dụ shop cài 2026-01-01: các mốc 01-31, 03-02, 04-01...
- Không có job reset hằng đêm. Sau mốc, số đếm "tự đọc về 0"; đơn trả tiền đầu tiên của chu kỳ mới ghi lại giá trị mới.
- Merchant xem: thẻ "Box sales limit" gồm thanh tiến độ và `used / quota` (ví dụ `7 / 10`); plan Paid thêm "Total sold in cycle: N boxes", và khi vượt quota có "Extra fee: $X".
- Cảnh báo trên thẻ: từ 80% hiện "You almost reach the box limit, upgrade plan to sell more."; đủ 100% hiện "You have reached the box limit, upgrade plan to sell more."

Ba con số admin thấy: `Box Selling Capacity` (quota, đã gồm phần promote code), `Box Capacity Used` (quota đã dùng, dừng tăng sau khi vượt, có thể vượt nhẹ đúng đơn gây vượt: 95 + 10 = 105/100), `Box Sold in Cycle` (tổng box bán, luôn tăng).

## Cái gì tính là 1 box đã dùng

Đếm khi Shopify báo đơn **đã thanh toán**, theo **số lượng** từng variant box.

| Tình huống | Tính? |
|---|---|
| Đơn thật có box đang publish | Có, mỗi đơn vị 1 box |
| Box chưa publish lúc đơn trả tiền (nháp, đã gỡ, tự gỡ do hết Free) | Không (cũng không tạo lượt mở) |
| Đơn test của Shopify | Mặc định **không** (cài đặt "Exclude Test Order" bật mặc định; chỉ admin tắt được) |
| Preview order (đơn test gắn tag `mysbox-preview-order`, từ tính năng xem trước box) | Như đơn test: không tính khi "Exclude Test Order" bật |
| Đơn sửa thêm box sau đó | Chỉ phần box thêm |
| Đơn bị refund / huỷ | **Vẫn tính** |
| Box bị resell (buyback) | **Vẫn tính** |
| Box bị xoá về sau | **Vẫn tính** (lịch sử không viết lại) |
| Box được mở (reveal) | Không liên quan, đếm lúc thanh toán |
| Đơn trong thời gian trial | Tăng "sold in cycle" nhưng **không** dùng quota và không bao giờ bị tính phí |

Hệ quả: merchant test bằng đơn thật sẽ đốt quota; dùng đơn test hoặc preview thì không. Xem thêm [mua và rút trúng](../03-orders-and-reveal/01-purchase-and-draw.md).

## Chạm giới hạn

```
Used chạm quota trong chu kỳ đang chạy:
  nếu plan Free:
      gỡ publish TẤT CẢ box, làm mới dữ liệu storefront,
      gửi email "capacity limit" (mẫu Free)
      → khách không mua được box mới; đơn đã trả vẫn reveal/resell bình thường
  nếu plan Paid:
      không chặn gì, gửi email (mẫu Paid) khi vượt vạch
      → mỗi box vượt sinh phí (xem 02)
```

Sau khi nâng plan, thêm promote code hoặc sang chu kỳ mới, quota đủ lại nhưng box **vẫn unpublished** — merchant phải publish lại. Cài lại app khi vẫn quá giới hạn Free thì box bị gỡ và email gửi lại.

**Email**: gửi qua Mailgun, mẫu khác nhau cho Free và Paid. `[chỉ có trên staging]` nội dung mới: Free gồm tên shop, domain, giới hạn box, ngày gia hạn, link tới Pricing; Paid gồm tên shop, domain, giới hạn, ngày gia hạn, phí tối thiểu mỗi box vượt, link tới Orders, và (nếu value-tiered) phần trăm phí. Production vẫn gửi bản cũ (tên chủ shop, quota, phí usage, không link). *chưa xác nhận: câu chữ chính xác của template.*

## Trial

- Số ngày trial lấy từ plan. Lần đăng ký đầu: đủ ngày. Đăng ký lại plan từng có: chỉ còn **số ngày chưa dùng** (không reset).
- Billing discount có thể cộng thêm ngày ([06](06-billing-discounts.md)).
- Trong trial: không tính phí vượt, không trừ quota. Những box bán lúc trial không bị tính ngược sau này.

## Kịch bản

<a id="s1"></a>
**S1 — Shop An cài mới.** Bước 1: An cài app, shop vào plan Free, quota 10, used 0, chu kỳ 30 ngày tính từ hôm nay. Bước 2: An tạo và publish box, bán 7 box. Thẻ "Box sales limit" hiện `7 / 10`, không phí. Bước 3: bán tới box thứ 8, thẻ hiện "You almost reach the box limit...".

<a id="s2"></a>
**S2 — An chạm giới hạn.** Bước 1: khách Bình mua box thứ 10, used = 10. Bước 2: app gỡ publish mọi box của An, làm mới storefront, gửi email Free. Bước 3: Bình thấy box không còn bán; đơn cũ của Bình vẫn mở/resell được. Bước 4: An thấy "You have reached the box limit..." và nút "Upgrade". Nâng plan xem tiếp ở [04](04-upgrade-downgrade-cancel.md#s3); nhớ publish lại box.

## Câu hỏi thường gặp

- **Box biến mất khỏi cửa hàng?** Có thể Free đã đủ 10 và tự gỡ. Nâng plan xong phải publish lại.
- **Thấy 105 / 100?** Bình thường: đơn gây vượt làm used vượt nhẹ rồi dừng, "Total sold in cycle" vẫn tăng.
- **Đơn bị huỷ có trả lại quota không?** Không.
