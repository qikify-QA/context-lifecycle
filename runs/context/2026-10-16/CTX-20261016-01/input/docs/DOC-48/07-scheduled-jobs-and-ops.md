# Job chạy định kỳ và lệnh vận hành

> Phần "sau hậu trường": những việc Mysbox tự làm theo lịch (và vì sao merchant có thể thấy **trễ**), cùng các lệnh `artisan` mà **chỉ engineer** được chạy. Support dùng file này để biết khi nào nên chuyển ticket cho engineer. Thuộc nhóm [admin panel](00-overview.md). Giờ ghi theo đồng hồ máy chủ (mặc định coi là UTC). *chưa xác nhận: tiến trình scheduler trên production chạy ở đâu và múi giờ của nó (không có trong repo).*

## 1. Job theo lịch, bằng lời thường

Scheduler là một tiến trình chạy liên tục riêng. **Nếu nó dừng, mọi job bên dưới dừng im lặng.**

| Việc | Khi nào chạy | Làm gì | Vì sao merchant thấy trễ |
|---|---|---|---|
| Tính phí usage | Hằng ngày 00:00 | Gửi một charge usage cho mỗi shop trả phí, cộng phần box bán chưa tính trong tháng gần nhất | Box bán 00:05 phải chờ tới 00:00 hôm sau mới bị tính |
| Tự mở box tới hạn (auto-unbox) | Mỗi 8 giờ (00:00, 08:00, 16:00) | Mở toàn bộ box của đơn đã quá giờ auto-unbox và đưa quà vào đơn | Trễ tới 8 giờ so với giờ hẹn ([auto-unbox](../03-orders-and-reveal/03-auto-unbox.md)) |
| Đưa quà vào đơn sau cửa sổ resell | Mỗi 8 giờ (00:00, 08:00, 16:00) | Với đơn đã mở hết và cửa sổ resell vừa đóng trong 24 giờ qua | Quà lên đơn trễ tới 8 giờ sau khi cửa sổ đóng; **bị bỏ sót** nếu scheduler tắt quá 1 ngày ([prizes](../03-orders-and-reveal/04-prizes-added-to-order.md)) |
| Nhắc "sắp mở box" cho Flow | Hằng giờ phút 30 | Gửi trigger nhắc tới Shopify Flow | Trễ tới 1 giờ; chỉ gửi **một lần**, lỗi thì không gửi lại ([Flow](../07-automation-growth/01-shopify-flow.md)) |
| Gia hạn token shop | Hằng ngày | Làm mới cặp token của shop có refresh token hết hạn trong 10 ngày tới | Lỗi 10 ngày liên tiếp thì shop phải cấp quyền lại |
| Đổi token cũ sang token có hạn | Hằng tuần | Mỗi shop thử một lần mỗi tuần | Không thấy |
| Đẩy sự kiện Partner sang BigQuery | Hằng ngày 07:00 UTC | Chép sự kiện của hôm qua | Chỉ báo cáo nội bộ ([partner sync](../07-automation-growth/05-affiliate-and-partner-sync.md)) |
| Kiểm tra nguồn đơn `[chỉ có trên staging]` | Mỗi 30 phút | Xác định đơn đến từ share link nào | Gán nguồn trễ khoảng 1 giờ ([share](../07-automation-growth/02-share-unboxing.md)) |
| "inspire" | Hằng giờ | In một câu trích dẫn, không tác dụng gì | — |

Việc **không theo lịch** (xử lý tức thì khi có sự kiện): rút quà sau khi đơn paid, đưa quà vào đơn, hậu xử lý box vật lý, cập nhật metafield, recent pulls, Flow trigger, email. Chúng chạy trên hàng đợi; **hàng đợi kẹt hoặc worker dừng là nguyên nhân phần lớn ticket "trễ"**.

**Ví dụ độ trễ.** Đơn của khách Bình có giờ auto-unbox 10:30. Job chạy 08:00 (chưa tới giờ) và 16:00, nên box mở lúc **16:00**, trễ 5,5 giờ. Cửa sổ resell đóng 17:00 hôm sau; job 00:00 chạy gần nhất sau đó, nên quà lên đơn khoảng **00:00**, trễ 7 giờ — đều bình thường, không phải lỗi.

## 2. Horizon (theo dõi hàng đợi)

`/admin/horizon`, chỉ role `super_admin`. Cho thấy tốc độ xử lý, thời gian chờ, worker và **job lỗi** (giữ 7 ngày; lịch sử job hoàn tất giữ 60 phút). Job thường chỉ thử **một lần** nên job lỗi cần retry thủ công. Production tối đa 10 worker cho queue thường và 5 cho queue chậm (staging 3 và 2).

## 3. Lệnh `artisan` — cần engineer

Chạy dạng `php artisan <lệnh>` trong container app. ~20 lệnh hỏi xác nhận và **không làm gì** nếu chạy với `--no-interaction`. Không đưa lệnh nào cho support tự chạy.

| Lệnh | Dùng khi nào | Lặp lại an toàn? |
|---|---|---|
| `orders:sync-shopify-line-items --order_id=...` | Nút Retry Sync trên panel không đủ, hoặc cần retry hàng loạt đơn | Có |
| `should-unbox-orders:unbox --id=...` / `should-sync-line-items-orders:sync --id=...` | Scheduler đã tắt một thời gian; chạy tay cho đơn bị bỏ sót (vẫn phải thỏa điều kiện của đơn) | Có |
| `usage-charges:create --id=...` | Chạy lại tính phí cho một shop | Có (phần đã tính bị loại) |
| `tokens:refresh-expiring`, `tokens:migrate-legacy` | Hàng loạt shop cần token mới; thường để lịch tự chạy | Có |
| `physical-box:backfill-prize-ids` | Đơn box vật lý cũ thiếu bước Prize Ids | Có |
| `pool-refill:backfill-queue-tokens --dry-run` rồi chạy thật `[chỉ có trên staging]` | Sửa pool box Tier bị mất refill khi box đổi version giữa lúc mua và resell ([pool refill](../02-boxes/06-pool-refill.md)) | Có; luôn `--dry-run` trước |
| `subscribers:sync`, `user-product-variants:sync`, `order-customer:sync` | Đồng bộ lại danh bạ email, metafield biến thể box, khách của đơn | Có (đa số) |
| `app-analytics:export --email=...`, `store-metrics:export`, `order-metrics:export`, `user-orders:export`, `orders:summarize` | Báo cáo nền tảng/đơn hàng (gửi email hoặc ra file) | Có |
| `shopify-partner-app:backfill --from=YYYY-MM-DD` | Nạp bù sự kiện Partner đã lỡ | **Không** — nạp thêm lần nữa sẽ nhân đôi dòng |
| `opening-request-winning-bundles:migrate` | Chuyển dữ liệu cũ (một lần) | **Không** — chạy hai lần làm sai dữ liệu |
| `app:shopify-toml-generate` | Dựng file cấu hình app Shopify khi deploy | Có |

Khoảng 17 lệnh `*:migrate` còn lại là migration dữ liệu **một lần** theo từng release; phần lớn là no-op trên production. *chưa xác nhận: lệnh nào đã chạy trên production.* Nhiều lệnh ghi "im lặng" (không kích observer), nên sau đó cần đồng bộ lại (ví dụ `user-product-variants:sync`) nếu dữ liệu đó đi lên Shopify.

## 4. Khi nào support chuyển cho engineer

| Triệu chứng | Chuyển vì |
|---|---|
| Mọi merchant đều trễ | Có thể hàng đợi/Horizon/scheduler dừng |
| Hôm nay không có auto-unbox/đưa quà nào ở bất kỳ shop | Scheduler dừng; cần chạy tay lệnh cho đơn bị sót |
| Đơn có `resell processing at` cũ hơn 1 ngày | Bán lại có thể kẹt ([orders](03-orders.md)) |
| Retry trên panel báo thành công nhưng không đổi gì | Xem job lỗi trong Horizon |
| Box Tier rút không ra vì mất inventory | Cần dựng lại inventory |

## Ví dụ: sáng thứ Hai, ba shop cùng báo trễ

Chi nhận ticket từ Shop An, Shop Hoa và Shop Lan: không có đơn nào được mở tự động từ chiều Chủ nhật. Cô thấy `boxes opened` của nhiều đơn vẫn bằng 0 dù đã qua giờ hẹn nhiều giờ. Vì ảnh hưởng nhiều shop, cô không retry từng đơn mà chuyển cho engineer **Hùng**. Hùng mở Horizon: queue trống, không có job lỗi, nhưng không thấy job lịch chạy; scheduler đã dừng từ Chủ nhật. Hùng khởi động lại scheduler, rồi chạy `should-unbox-orders:unbox` cho các đơn bị sót (an toàn khi lặp) và `should-sync-line-items-orders:sync`, lưu ý các đơn có cửa sổ resell đã đóng quá 1 ngày sẽ không được job quà tự nhặt, nên xử lý bằng `orders:sync-shopify-line-items`. Chi báo lại ba merchant.

## Câu hỏi thường gặp

- **Vì sao job lỗi một lần là không tự chạy lại?** Hầu hết job chỉ thử một lần; retry thủ công trong Horizon.
- **Chạy lệnh hai lần có sao không?** Với các lệnh retry/backfill thì thường an toàn; hai lệnh nêu trên thì không.
- **Production khác staging ở lệnh nào?** Hai lệnh chỉ có trên staging và dòng lịch kiểm tra nguồn đơn.
