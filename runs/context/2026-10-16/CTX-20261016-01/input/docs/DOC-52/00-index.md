# Support playbook: bảng tra cứu theo triệu chứng

> Bộ playbook cho team support Mysbox: 64 tình huống thực tế, tra theo **điều merchant/khách nói**, không theo tên tính năng. Nằm cuối bộ KB, sau khi đã hiểu nghiệp vụ ở [tổng quan](../00-overview.md) và màn hình admin ở [admin panel](../08-admin-panel/00-overview.md).

## Cách đọc một khối tình huống

Mọi tình huống có cùng 5 dòng:

| Dòng | Nội dung |
|---|---|
| **Triệu chứng** | Câu merchant/khách thật sự nói. |
| **Xác nhận** | Mở màn hình nào, nhìn trạng thái/field nào để chứng minh. |
| **Nguyên nhân** | Đánh số theo khả năng, cái hay gặp nhất đứng đầu. |
| **Xử lý** | **[Support]** = tự làm được trong admin panel hoặc hướng dẫn merchant. **[Engineer]** = cần engineer chạy lệnh/sửa dữ liệu. |
| **Đừng** | Việc nghe hợp lý nhưng làm tình hình tệ hơn. |

Thẻ `[chỉ có trên staging]` = chưa lên production. Ví dụ có nhân vật: shop **Shop An** (merchant An), khách **Bình**, support **Chi**, engineer **Dũng**.

## Bảng tra theo triệu chứng

| Merchant/khách nói | Xem mục |
|---|---|
| "Khách đã trả tiền mà không thấy box / không có đơn" | [O1](01-orders-and-reveal.md#o1) |
| "Khách đã trả tiền mà box chưa mở được", "bảo quay lại sau 30 phút" | [O2](01-orders-and-reveal.md#o2) |
| "Nhận ít quà hơn số box đã mua" | [O3](01-orders-and-reveal.md#o3) |
| "Bấm Unbox bị lỗi", "mở xong bị đẩy về trang đơn" | [O4](01-orders-and-reveal.md#o4) |
| "Quà khác với hoạt ảnh", "muốn quay lại" | [O5](01-orders-and-reveal.md#o5) |
| "Auto-unbox không chạy đúng giờ", "không nhận nhắc" | [O6](01-orders-and-reveal.md#o6), [O7](01-orders-and-reveal.md#o7) |
| "Link báo magic link không đúng", "bị bắt đăng nhập" | [O8](01-orders-and-reveal.md#o8) |
| "Không thấy nút Unbox ở trang cảm ơn" | [O9](01-orders-and-reveal.md#o9) |
| "Quà không có trong đơn Shopify" | [O10](01-orders-and-reveal.md#o10) |
| "Đơn báo Failed", "đơn quà nhiều bị kẹt" | [O11](01-orders-and-reveal.md#o11) |
| "Box vật lý: không trừ kho / thiếu tag" | [O12](01-orders-and-reveal.md#o12) |
| "Nút resell mất" | [R1](02-resell-refund-credit.md#r1) |
| "Resell báo lỗi" | [R2](02-resell-refund-credit.md#r2) |
| "Số tiền hoàn nhìn sai / thấp hơn đã trả / cao hơn đã trả" | [R3](02-resell-refund-credit.md#r3) |
| "Hoàn về store credit chứ không về thẻ" | [R4](02-resell-refund-credit.md#r4) |
| "Đã hoàn tiền mà box vẫn chưa bán", "bị hoàn hai lần" | [R5](02-resell-refund-credit.md#r5), [R6](02-resell-refund-credit.md#r6) |
| "Món đã bán lại không về pool" | [R8](02-resell-refund-credit.md#r8) |
| "Số dư store credit không cập nhật" | [R9](02-resell-refund-credit.md#r9) |
| "Dùng credit mà box vẫn tính tiền" | [R10](02-resell-refund-credit.md#r10) |
| "Box tự biến mất khỏi shop" | [W1](03-storefront-and-widget.md#w1) |
| "Widget không hiện trên theme" | [W2](03-storefront-and-widget.md#w2), [W3](03-storefront-and-widget.md#w3) |
| "Box báo hết hàng mà tồn kho còn" | [W4](03-storefront-and-widget.md#w4) |
| "Không publish được box", "không sửa được box" | [W9](03-storefront-and-widget.md#w9), [W10](03-storefront-and-widget.md#w10) |
| "Bản dịch không áp dụng" | [W8](03-storefront-and-widget.md#w8) |
| "Merchant nói bị tính phí hai lần" | [F1](04-billing.md#f1) |
| "Đã trả tiền mà app vẫn Free" | [F2](04-billing.md#f2) |
| "Thiếu/lỗi phí usage", "phí usage nhìn sai" | [F3](04-billing.md#f3), [F10](04-billing.md#f10) |
| "Mã giảm giá / promote code không nhận" | [F6](04-billing.md#f6), [F7](04-billing.md#f7) |
| "App đòi cấp quyền lại" | [K1](05-account-and-integrations.md#k1) |
| "App is not available yet" | [K2](05-account-and-integrations.md#k2) |
| "Gỡ app, muốn xoá/lấy lại dữ liệu" | [K4](05-account-and-integrations.md#k4), [K5](05-account-and-integrations.md#k5) |
| "Flow không bắn" | [K7](05-account-and-integrations.md#k7) |
| "Ảnh share bị thiếu" | [K11](05-account-and-integrations.md#k11) |
| "Analytics ra 0" | [K10](05-account-and-integrations.md#k10) |

## Phân loại nhanh 60 giây (làm trước khi mở mục nào)

```
Bước 1  Shops -> tìm domain *.myshopify.com. Xem: Install status, Status (Security),
        Re-auth Required At (mục Tokens), plan và Capacities.
Bước 2  Nếu "Re-auth Required At" có ngày -> gần như MỌI thứ của shop này dừng -> K1.
Bước 3  Nếu "Status" = OFF -> K2.
Bước 4  Nếu capacity used >= selling capacity và là plan Free -> W1.
Bước 5  Tìm đơn: tab Orders của shop -> tab Boxes: quantity, total opened, status
        (Queued / Completed / Failed), winning bundles, unboxing at.
Bước 6  Triệu chứng bắt đầu sau một lần release? -> nhờ engineer xem danh sách
        failed jobs (Horizon) cùng giờ.
```

Cả một shop sai nhiều thứ cùng lúc (box không hiện, đơn không xử lý, dữ liệu cũ) thường chỉ có **một** gốc: re-auth ([K1](05-account-and-integrations.md#k1)), kill switch ([K2](05-account-and-integrations.md#k2)), vượt capacity ([W1](03-storefront-and-widget.md#w1)) hoặc dữ liệu đã publish bị cũ ([W4](03-storefront-and-widget.md#w4)). Xử lý theo thứ tự đó, rồi bấm "Sync capacity to metafield" trước khi nhờ engineer.

## Việc support tự làm được (tất cả nằm trong admin panel)

| Việc | Màn hình |
|---|---|
| Chạy lại xử lý đơn đã trả tiền | Shops -> shop -> "Retry Handle Order" |
| Thêm lại quà vào đơn Shopify | Orders -> đơn -> Actions -> "Retry Sync Winning Items & Boxes to Shopify Order" |
| Chạy lại bước hậu xử lý box vật lý | Orders -> Actions -> "Retry Physical Box Post-Processing" |
| Đẩy lại plan/capacity lên Shopify | Shops -> hàng shop -> "Sync capacity to metafield" |
| Gia hạn token | Trang view shop -> "Refresh access token" (bấm một lần) |
| Gửi link thanh toán plan | Shops -> "Generate recurring payment link" |
| Dựng lại feed recent pulls | Trang box -> "Resync recent pulls" |
| Ẩn một lượt khỏi feed | Tab Recent pulls -> "Hide from recent pulls" |
| Khoá/mở shop | Shop -> Edit -> Security -> Status (kèm Note) |

Những thứ **không** có nút nào: mở lại resell window, hoàn tiền/sửa charge, sửa trạng thái đã bán của box, xuất/xoá dữ liệu shop, replay Flow trigger. Chúng luôn là việc của engineer hoặc của Shopify.

## Lệnh engineer: quy ước

Playbook chỉ ghi tên lệnh. Trên máy dev có tiền tố `./vendor/bin/spin exec php php artisan ...`; trên staging/production engineer chạy `php artisan ...` trong container app. Lệnh "hỏi xác nhận" cần terminal tương tác (đừng thêm `--no-interaction`). Hầu hết lệnh retry/backfill an toàn khi chạy lại; ngoại lệ sẽ được nói rõ trong mục.

## Nguyên tắc chung (áp dụng cho mọi mục)

1. **Đọc trước, sửa sau**: xem refund trong Shopify, xem Charges, xem Boxes tab trước khi bấm bất cứ nút nào.
2. **Không sửa thẳng database** các cột `total opened`, `resell expires`, `resell processing at`, trạng thái đơn, inventory: các bộ đếm sẽ lệch và không có công cụ dò lại.
3. **Không hứa** hoàn tiền, xoá dữ liệu, replay trigger. Nói đúng điều hệ thống làm.
4. Một việc "retry" bấm tối đa hai lần; lần thứ ba phải đọc lỗi thật (nhờ engineer).
5. Ghi mã mục (O1, R3...) vào ticket để đồng nghiệp tra lại.

## Mục lục

| File | Số tình huống | Chủ đề |
|---|---|---|
| [01-orders-and-reveal.md](01-orders-and-reveal.md) | 13 (O1-O13) | Mua, bốc thăm, mở box, quà vào đơn Shopify, box vật lý |
| [02-resell-refund-credit.md](02-resell-refund-credit.md) | 13 (R1-R13) | Resell, số tiền hoàn, pool refill, store credit Koin, vé |
| [03-storefront-and-widget.md](03-storefront-and-widget.md) | 12 (W1-W12) | Publish, widget/theme, hết hàng, bản dịch, recent pulls, trang khách |
| [04-billing.md](04-billing.md) | 12 (F1-F12) | Plan, phí usage, capacity, mã giảm giá, trial |
| [05-account-and-integrations.md](05-account-and-integrations.md) | 14 (K1-K14) | Token, gỡ/cài app, GDPR, Flow, email, analytics, share |

## Câu hỏi thường gặp

- **Production hay staging?** Nếu tính năng nằm ở thẻ `[chỉ có trên staging]` thì merchant production chưa có; đừng điều tra "lỗi" của thứ chưa phát hành.
- **Có chắc chắn mọi bước đã chạy trên production?** Các mục dựa trên code; runtime production (ai chạy scheduler, múi giờ) *chưa xác nhận*. Giờ job trong playbook là giờ máy chủ, mặc định UTC.
