# Chu kỳ billing, job tạo phí và trạng thái Charge

> File này nói về **đường đi của tiền**: hai "đồng hồ" khác nhau (chu kỳ quota và kỳ hoá đơn Shopify), job chạy hằng ngày gửi phí usage lên Shopify, merchant thấy gì ở Shopify Billing, các trạng thái của Charge, và những ca thất bại (phí bị từ chối, shop frozen). Cách tính số tiền ở [02-usage-pricing.md](02-usage-pricing.md). Về nhóm: [00-overview.md](00-overview.md).

## Hai đồng hồ khác nhau

| | Chu kỳ quota (Mysbox) | Kỳ hoá đơn (Shopify) |
|---|---|---|
| Neo vào | Ngày shop cài app lần đầu | Ngày merchant duyệt subscription |
| Dùng để | Đếm và đặt lại quota | Thu tiền plan và các dòng usage |

Nên "tháng" quota thường lệch với ngày hoá đơn.

## Bước theo bước: một khoản phí usage đi từ đơn đến hoá đơn

**Bước 1 — Đơn trả tiền.** Khách đặt box, đơn paid. Hệ thống tạo dòng phí (xem [02](02-usage-pricing.md)); dòng này ở trạng thái "chưa gửi".

**Bước 2 — Job hằng ngày.** Một lệnh chạy mỗi ngày lúc nửa đêm (giờ server; *chưa xác nhận: múi giờ*). Nó tìm shop thoả cả bốn điều kiện: đang plan Paid, charge subscription Active, **không** đang trial, có dòng phí chưa gửi tạo trong **1 tháng gần nhất**.

**Bước 3 — Gom và gửi.** Với mỗi shop, cộng mọi dòng chưa gửi thành **một** số tiền và gửi **một** usage record lên Shopify, mô tả kiểu "`$7.50 - Usage fee for 3 orders (#1042 to #1051)`" (hoặc "... for order #1042"). Tổng dưới $0.005 thì không gọi Shopify, chỉ đánh dấu xong. Vì vậy mỗi shop tối đa 1 dòng usage mỗi ngày.

**Bước 4 — Merchant thấy.** Ở Shopify admin > Settings > Billing: dòng subscription theo giá plan (đã trừ billing discount nếu có) và các dòng usage với mô tả trên; Shopify cộng vào hoá đơn kế tiếp. Trang duyệt lúc đăng ký có dòng phí usage kèm Capped Amount và Terms.

Admin có thể chạy tay cho một shop: lệnh `usage-charges:create` với `--id=<id shop>`.

## Trạng thái Charge

Admin xem ở "Payment" > "Charges" (chỉ đọc). Có hai loại bản ghi: **Recurring charge** (subscription của shop, giữ bản chép quota và quy tắc phí) và **Usage charge** (một usage record).

| Trạng thái | Nghĩa | Loại |
|---|---|---|
| Pending | Vừa tạo, Shopify chưa trả lời (kẹt lại nếu process chết) | Usage |
| Active | Subscription đang sống | Recurring |
| Accepted | Shopify chấp nhận usage (hoặc tổng < $0.005 nên không gửi) | Usage |
| Declined | Shopify trả về rỗng | Usage |
| Failed | Lỗi khi gọi Shopify (mạng, vượt cap, token chết, shop frozen) | Usage |
| Cancelled | Merchant huỷ, bị thay bằng plan khác, hoặc gỡ app | Recurring |

Báo cáo tính trạng thái plan của shop = trạng thái charge Active; "Accepted" nếu đang plan mặc định; còn lại "No Active Plan".

Không có webhook báo thay đổi subscription (chỉ có gỡ app, cập nhật shop, đơn paid). Nên trạng thái trong Mysbox có thể lệch với Shopify.

## Kịch bản

<a id="s7"></a>
**S7 — Phí usage của Shop Em bị từ chối.**
- Bước 1: Em đang plan Paid, đã qua trial, có $7.50 phí chưa gửi.
- Bước 2: job nửa đêm tạo Usage charge (Pending) và **đánh dấu các dòng phí là "completed" ngay lúc này**, rồi mới gọi Shopify.
- Bước 3: Shopify từ chối (ví dụ đã chạm Capped Amount). Charge thành Declined hoặc Failed; log chỉ ở mức debug.
- Bước 4: đêm sau job **không** nhặt lại vì các dòng đã "completed"; không có lệnh retry hay cảnh báo. Em không thấy gì ở Shopify, Mysbox mất $7.50.
- Bước 5: chị Chi (admin) dò ở "Payment" > "Charges" lọc Declined/Failed, xử lý tay (ví dụ nhờ Em duyệt lại subscription để nâng cap, hoặc chấp nhận mất).

<a id="s8"></a>
**S8 — Shopify freeze Shop Phú.**
- Bước 1: Shopify đóng băng cửa hàng; webhook cập nhật shop đổi tên Shopify plan của Phú thành `frozen`.
- Bước 2: Mysbox chỉ lưu tên này; **không** gỡ box, **không** đổi plan Mysbox. Báo cáo loại shop khỏi thống kê.
- Bước 3: shop frozen khó có đơn mới nên không phát sinh phí. Nếu vẫn còn phí chưa gửi, cuộc gọi Shopify nhiều khả năng lỗi → Failed, không retry. *chưa xác nhận: phản hồi thật của Shopify cho shop frozen.*
- Bước 4: nếu cửa hàng mở lại sau khi token đăng nhập đã chết (khoảng 90 ngày), shop bị gắn "cần cấp quyền lại" và merchant được gửi email; mọi cuộc gọi billing lỗi tới khi Phú kết nối lại. Xem [vòng đời shop](../06-merchant-app/04-shop-status-and-lifecycle.md).

**Thẻ bị từ chối ở phía merchant.** Nếu Shopify tự huỷ subscription vì merchant không trả tiền, Mysbox không được báo: shop vẫn hiện plan Paid, vẫn thử billing phí vượt và bị Shopify từ chối (Failed). Phát hiện bằng cách đối chiếu "Charges" với Shopify Partner billing.

## Câu hỏi thường gặp

- **Phí usage không xuất hiện?** Do shop đang trial; charge không Active; tổng < $0.005; lần gọi Failed/Declined; dòng cũ hơn 1 tháng; hoặc shop ở Free.
- **Phí lạ trong Shopify?** Mở Charges của shop, đọc mô tả (khoảng số đơn), kiểm tra quy tắc phí của plan và "Exclude Test Order" đang bật.
- **Merchant huỷ trong Shopify admin nhưng Mysbox vẫn Active?** Đúng như mục trên; lần đổi plan hoặc gỡ app kế tiếp sẽ sửa.
