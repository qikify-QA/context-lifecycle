# Nâng, hạ, huỷ plan và trang xem trước thay đổi

> File này đi qua **luồng chọn plan** (Choose this plan → trang duyệt của Shopify → plan mới), ba kiểu đổi (nâng, hạ, huỷ), số quota sau khi đổi, trang "xem trước" số tiền tính lại, và ca huỷ rồi cài lại. Cách tính phí ở [02-usage-pricing.md](02-usage-pricing.md); trạng thái Charge ở [03-billing-cycle-and-charges.md](03-billing-cycle-and-charges.md). Về nhóm: [00-overview.md](00-overview.md).

## Luồng chọn plan

**Bước 1 — Merchant** mở "Pricing", bấm "Choose this plan". Shop còn ở plan Early-bird (cũ) thấy trước một hộp thoại "Are you sure to leave the Early-bird plan?" (rời là mất vĩnh viễn trạng thái Early-bird; nút "Stay on Early-bird" / "Upgrade now").

**Bước 2 — Hộp thoại xác nhận** tuỳ hướng đổi: sang Free = hộp thoại huỷ; quota lớn hơn = hộp thoại nâng; còn lại = hạ.

**Bước 3 — Server kiểm tra** shop có đủ điều kiện chọn plan (xem [01](01-plans-and-capacity.md)) và, nếu có mã, kiểm tra billing discount ([06](06-billing-discounts.md)). Rồi trả về đường dẫn duyệt của Shopify.

**Bước 4 — Trang duyệt của Shopify** hiện giá, trial, dòng usage kèm Capped Amount và Terms. Development store bỏ qua bước này và đi vào link xác nhận nội bộ.

**Bước 5 — Sau khi duyệt**, Shopify đưa merchant về qua link có chữ ký (hiệu lực 7 ngày). Mysbox kiểm tra subscription đang ACTIVE (không thì báo "Shopify subscription is not active"), đánh dấu charge của plan cũ là Cancelled, tạo charge mới (Active, hết trial = lúc kích hoạt + số ngày trial), chuyển plan, tính lại quota, ghi nhận discount nếu có, làm mới dữ liệu storefront, đưa merchant về app. Thẻ plan mới hiện "Selected".

Admin **không** đổi trực tiếp plan của shop: phải gửi "Generate recurring payment link" (nút ở dòng shop) để merchant duyệt. Xem [08-admin](../08-admin-panel/05-plans-discounts-promo-charges.md).

## Nâng plan (quota lớn hơn)

Hộp thoại "Are you sure to upgrade your plan?" mô tả quota mới và phí box vượt. Nếu shop Free còn trong thời gian ân hạn đã dùng hơn quota plan mới, hộp thoại hiện thêm khối "Over capacity fee" (tính trong trình duyệt, xem mục xem trước bên dưới). Thực tế: số đã dùng được giữ nguyên (không vượt quota cũ), box Free **không** bị tính ngược, và promote code loại First Upgrade được kích hoạt ([05](05-promote-codes.md)).

<a id="s3"></a>
**S3 — Shop An nâng plan giữa chu kỳ.**
- Bước 1: An đang Free, đã dùng 10/10, box đã bị gỡ publish. An vào Pricing chọn "Growth" ($29, quota 100, trial 7 ngày, $0.25/box).
- Bước 2: hộp thoại nâng không có khối Over capacity (đã dùng 10 < 100).
- Bước 3: An duyệt trên Shopify. Charge Active, trial hết sau 7 ngày, plan Growth, quota 100, used vẫn 10 (box Free không bị tính ngược).
- Bước 4: An phải publish lại box (nâng plan không tự publish).
- Bước 5: trong 7 ngày trial, box bán chỉ tăng "sold in cycle", không trừ quota, không phí. Sau trial, box dùng quota và phần vượt bị tính phí hằng đêm ([03](03-billing-cycle-and-charges.md)).

## Hạ plan (quota nhỏ hơn)

Hộp thoại "Are you sure to downgrade your plan?" có khối "Over capacity fee {X} * $0.25/box sale = ${fee}" và nút "Confirm & Downgrade" / "Contact us" (mở live chat). Plan mới có hiệu lực ngay khi duyệt (Shopify huỷ subscription cũ); Mysbox **không hoàn tiền theo tỷ lệ** phần còn lại của plan cũ.

Số quota sau khi đổi:

| Trường hợp | Kết quả |
|---|---|
| Used nhỏ hơn quota mới | Giữ used (không vượt quota cũ) |
| Hạ và used >= quota mới | used = quota mới; phần dư được **tính lại phí** |
| Nâng mà used đã >= quota mới | Giữ nguyên used |
| Free → Paid | Giữ used, không tính lại gì |

Tính lại khi hạ: lấy các dòng phí **mới nhất** (nguyên dòng, không cắt lẻ) sao cho tổng box không quá phần dư, tính theo mức phí đã ghi lúc bán, rồi gửi **ngay** thành một usage record (không đợi nửa đêm).

<a id="s5"></a>
**S5 — Shop Cúc hạ plan (Hoá đơn 4).**
- Cúc đang "Pro" ($79, quota 100, $0.25/box), used 100/100, mọi box đều trong quota nên phí lúc bán = 0 (nhưng dòng phí ghi mức "nếu không có quota" là $0.25).
- Cúc chọn "Growth" ($29, quota 50). Phần dư = 100 − 50 = 50 box. Dòng mới nhất, ví dụ 30 + 20 = 50 box, trở thành phải trả: 50 × $0.25 = **$12.50**, gửi Shopify ngay.
- used mới = 50. Charge Pro → Cancelled, Growth → Active, chu kỳ không đổi.
- Hoá đơn kế: $29.00 (plan mới) + $12.50. *chưa xác nhận: Shopify xử lý phần chưa dùng của subscription cũ thế nào.*

## Huỷ plan (chọn Free)

Hộp thoại "Are you sure?": tính năng plan hiện tại còn dùng tới **ngày hết hạn**, plan mới (Free) bắt đầu sau đó; nút "Continue subscription" / "Cancel subscription". Khi bấm huỷ:

```
1. Phí usage chưa gửi được gửi NGAY (khỏi mất khoản cuối)
2. Subscription bị huỷ trên Shopify, không hoàn tiền theo tỷ lệ
3. Charge nội bộ → Cancelled, hết hạn vào cuối 30 ngày đã trả
4. Shop chuyển Free, nhưng quota Paid vẫn dùng đến lúc hết hạn
   (nếu đã vượt quota Free thì box bị gỡ publish ngay)
5. [chỉ có trên staging] dữ liệu storefront được làm mới lại đúng lúc hết hạn
```

Hết ân hạn thì áp quota Free (10).

<a id="s6"></a>
**S6 — Shop Dũng huỷ rồi cài lại.**
- Bước 1: Dũng đang Growth, bấm "Cancel subscription": phí chưa gửi được gửi ngay, subscription huỷ, charge Cancelled với hạn cuối kỳ đã trả, shop thành Free nhưng giữ quota Growth tới hạn.
- Bước 2: Dũng gỡ app. Charge được huỷ theo cách tương tự, shop bị xoá mềm.
- Bước 3: Dũng cài lại. Shop được khôi phục ở plan Free. Neo chu kỳ vẫn là ngày cài **đầu tiên** nên số đếm có thể đang ở giữa chu kỳ với giá trị cũ.
- Bước 4: nếu used >= quota Free, box bị gỡ publish lại và email giới hạn được gửi.
- Bước 5: Dũng chọn Growth lần nữa: trial **không** bắt đầu lại, chỉ còn số ngày chưa dùng. *chưa xác nhận: phí tạo trong thời gian ân hạn có bị tính nếu đăng ký lại trong vòng 1 tháng (suy luận: dòng chưa gửi sẽ được job nhặt).*

## Trang xem trước thay đổi plan

Server có một endpoint trả `will_recalculate` (có tính lại không), `recalculated_boxes` (số box) và `recalculated_amount_usd` (số tiền gửi ngay), cho plan đích hoặc cho việc huỷ. Số box = used − quota đích nhưng chỉ lấy nguyên dòng nên có thể nhỏ hơn hiệu thuần.

Trên màn Pricing hiện tại, các hộp thoại **không dùng** endpoint này: chúng tự tính "box vượt × $0.25" trong trình duyệt, nên với plan phí khác $0.25 hoặc khi dòng phí không chia đều thì số hiển thị lệch số thật.

## Câu hỏi thường gặp

- **Nâng plan xong box vẫn tắt?** Cần publish lại.
- **Huỷ xong sao vẫn có quota Paid?** Đúng, tới hết kỳ đã trả.
- **Tại sao admin không đổi plan hộ merchant?** Phải qua duyệt của Shopify; dùng payment link.
