# General Settings

> Mọi setting trên màn **General Settings** (`/general-settings`): nhãn, mặc định, tác dụng; cộng các setting ẩn chỉ nhân viên Mysbox đổi. Thuộc nhóm [06-merchant-app](00-overview.md). Cơ chế auto-unbox xem [03/03](../03-orders-and-reveal/03-auto-unbox.md), resell xem [04](../04-resell-refund-credit/00-overview.md).

## Cách màn hình hoạt động

Menu trái chia ba nhóm, mỗi mục một form bên phải. Có thay đổi thì hiện thanh "Save" / "Discard"; lưu xong báo "General settings updated!". Giá trị lưu vào cấu hình của shop và chỉ áp cho **đơn tạo sau đó**; đơn đã có giữ lịch cũ.

Lưu ý: khi lưu, form gửi cả các giá trị mặc định đang hiện. Một mục chưa từng mở/lưu thì chưa có giá trị trong cấu hình và hệ thống dùng mặc định phía server (cột "Nếu chưa lưu").

## Bảng setting

| Nhóm / mục | Setting (nhãn) | Mặc định trên form | Nếu chưa lưu | Tác dụng |
|---|---|---|---|---|
| Instantly opening box / Auto-Unbox | "Enable auto-unbox" | Tắt | Tắt | "Automatically unbox all items in confirmed orders after a specified delay." |
| | "Auto-unbox after" (hour) | 2 (chỉ hiện khi bật) | 0 | Giờ mở = giờ đơn paid + số giờ này, **ghi vào đơn lúc đơn được tạo**; đổi sau chỉ ảnh hưởng đơn mới |
| | "Enable auto-unbox trigger" | Tắt | Tắt | Bắn trigger Flow "Order unboxing soon" trước giờ mở ("A Shopify-triggered flow that runs at a predetermined time before the auto-unbox process.") |
| | "Trigger before" (hour) | 1 | 0 | Bắn trước giờ mở bao lâu |
| Instantly opening box / Buyback limit time | "Duration for customers to resell from order is created" (hours) | 24 (tối thiểu 1; gợi ý "e.g., 0.5, 1, 24") | 24 | Độ dài cửa sổ resell, tính từ lúc đơn paid. Để trống thì form từ chối lưu ("Buyback limit time is required") |
| Sealed box / Order setting ("Order prize information") | Khoá metafield | `sku` ("Variant SKU"; còn Variant ID, Variant title) | `sku` | Thuộc tính variant dùng làm khoá trong metafield đơn, dạng `{"sku":"SKU-01","quantity":5}` |
| Integration / Koin Store Credit & Rewards ("Store credit purchase integration") | "Store credit app" | Koin (có lựa chọn None) | — | Chọn Koin để bật "trả bằng store credit" ở trang box |
| | "Koin private API Key" | Trống | Trống | Khoá để app trừ Koin credit của khách. Lưu khi đã chọn Koin và có khoá thì app đồng thời tạo giảm giá tự động để box mua bằng credit về $0 |
| Integration / Shopify Flow | "Enable Mysbox triggers in Shopify Flow" | Tắt | Tắt | Cho phép gửi trigger "All box opened", "Resell completed", "Digital order synced". "Box sold out" và "Order unboxing soon" gửi bất kể công tắc này |

Ghi chú:
- Ô "Buyback limit time" bị **khoá (xám)** ở gói Free và Early-bird, kèm chữ "Upgrade subscription plan to use this feature".
- Mục sealed box có đường link "contact us" mở live chat cho quy trình fulfil khác; trong file dịch có chữ "Download flow" nhưng không có màn hình nào dùng.

## Setting ẩn (không có trên màn hình; nhân viên Mysbox đổi trong back-office)

| Khoá | Mặc định | Tác dụng |
|---|---|---|
| `enable_gacha_machine` | Tắt | Cho shop Free/Early-bird dùng animation Gacha machine |
| `skip_order_line_item_sync` | Tắt | Không thêm quà vào đơn Shopify |
| `orderUpdateEmailDisabled` | Tắt (khách vẫn nhận email Shopify khi đơn bị sửa) | Chặn email sửa đơn khi thêm quà |
| `physical_inventory_enabled` | Bật | Sealed box trừ tồn kho variant quà sau khi bốc thăm |
| `physical_tag_enabled` / mẫu | Tắt / `{{variant_title}}` | Gắn tag đơn (tối đa 40 ký tự) |
| `physical_note_enabled` / mẫu / ngăn cách | Tắt / `{{id}}: {{quantity}}` / dấu gạch đứng có khoảng trắng hai bên | Thêm quà vào ghi chú đơn |
| `physical_metafield_output_mode` | list (hoặc map) | Dạng metafield quà |
| `recent_pulls_visible_from` | Trống | Chỉ hiện lượt mở sau ngày này |
| `hide_watermark` | Tắt | Ẩn watermark Mysbox ở trang reveal |
| `recent_pulls_publish_test_orders` `[chỉ có trên staging]` | Tắt | Cho đơn test vào feed |
| `share_unboxing_enabled` `[chỉ có trên staging]` | Bật | Bật/tắt tính năng share cho shop |
| `share_image_daily_limit` `[chỉ có trên staging]` | 300 | Hạn ngạch ảnh share mỗi ngày; merchant không đổi được |

Hai cờ không nằm trong cấu hình nhưng ảnh hưởng số liệu: **Exclude Test Order** (mặc định bật) và gói/capacity; xem [dashboard](02-dashboard-and-analytics.md).

## Ví dụ: An cấu hình

1. An bật auto-unbox, "Auto-unbox after" = 2, và bật trigger "Trigger before" = 1.
2. Bình thanh toán đơn #1001 lúc 10:00. Giờ mở của đơn = 12:00 (lưu vào đơn).
3. Job auto-unbox chạy mỗi 8 giờ (00:00, 08:00, 16:00 giờ server), nên box thực sự được mở lúc **16:00**, trễ tối đa 8 giờ. Trigger "unboxing soon" được kiểm tra mỗi giờ vào phút 30, được kiểm tra mỗi giờ ở phút 30 (thời điểm bắn chính xác *chưa xác nhận*).
4. Hôm sau An đổi "Auto-unbox after" thành 6: đơn #1001 vẫn giữ 12:00, chỉ đơn mới theo 6 giờ.
5. Auto-unbox mở box bỏ qua cửa sổ resell 24 giờ khi đồng bộ quà vào đơn; việc Bình còn resell được hay không sau thời điểm đó *chưa xác nhận*.

## Câu hỏi thường gặp

1. **Đổi giờ auto-unbox mà đơn cũ vẫn giờ cũ?** Đúng, giờ mở ghi cố định vào đơn lúc tạo. Chỉ đơn mới có giờ mới.
2. **Trigger Flow "All box opened" không bắn?** Công tắc "Enable Mysbox triggers in Shopify Flow" mặc định tắt; trigger chỉ bắn một lần mỗi đơn và chỉ với box digital.
3. **Nút Koin không có tác dụng ở storefront?** Cần chọn Koin, đã lưu khoá, box bật "Allow purchase with store credit" và shop chưa chạm trần hạn mức.
4. **Ô Buyback bị xám?** Merchant đang ở Free hoặc Early-bird.
