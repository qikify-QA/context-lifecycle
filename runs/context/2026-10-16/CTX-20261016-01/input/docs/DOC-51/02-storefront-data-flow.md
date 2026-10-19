# Dữ liệu storefront: metafield hay app proxy?

> Widget trên trang sản phẩm cần dữ liệu thật nhanh và không muốn gọi server mỗi lần khách xem. Vì vậy Mysbox chia dữ liệu storefront thành hai đường: **metafield** (Mysbox *ghi trước* vào Shopify, theme đọc thẳng) và **app proxy** (trang đơn hàng của khách gọi API Mysbox qua Shopify). Nằm trong nhóm [Tích hợp](00-overview-and-auth.md). Widget và block xem [../02-boxes/07-storefront-widget-and-translations.md](../02-boxes/07-storefront-widget-and-translations.md).

## Hiểu nhanh

- **Metafield** = ô dữ liệu tuỳ chỉnh gắn vào sản phẩm/biến thể/shop mà Shopify lưu hộ. Mysbox "đẩy" dữ liệu vào đó (khi publish box, khi đổi gói...), theme đọc bằng Liquid, **không cần gọi Mysbox**. Nhanh, nhưng có thể cũ nếu lần đẩy thất bại.
- **App proxy** = Shopify chuyển tiếp `/apps/mysbox/...` của shop về Mysbox kèm chữ ký. Dùng cho dữ liệu riêng từng khách (đơn, box chưa mở, resell) vì không thể đẩy sẵn.

## Widget ở trang sản phẩm đọc gì

| Dữ liệu | Lấy từ | Nội dung |
|---|---|---|
| Cấu hình box của biến thể | Metafield biến thể `mysbox.box` | Ảnh chụp box: loại, trạng thái publish, bundles/món, chance, tồn kho/pool, cài đặt (store credit, hiển thị tồn kho...) |
| Cài đặt giao diện shop | Metafield shop `mysbox.config` | Kết quả của Style Settings: ẩn tên/chance/giá, hình dạng ảnh, "Show recent pulls"... |
| Bản dịch | Metafield shop (`general_settings_translation`, `product_translation`, `unboxing_translation`...) | Chữ theo ngôn ngữ storefront; thiếu thì dùng chữ mặc định |
| Gói và dung lượng | Metafield shop `subscription`, `capabilities` | Quyết định widget có bị ẩn vì "hết hạn / vượt dung lượng" không |
| CSS/JS tuỳ chỉnh | Metafield `custom_style`, `custom_script` | Do nhân viên nhập; chèn nguyên văn vào trang |
| Recent pulls | Metafield biến thể `recent_pulls_current` | Xem [../07-automation-growth/03-recent-pulls.md](../07-automation-growth/03-recent-pulls.md); chỉ đọc qua Liquid |
| Tên, ảnh, giá, tồn kho từng món | **Gọi Storefront API** của Shopify bằng token công khai | Luôn mới nhất; sản phẩm đổi tên/xoá ở Shopify thì widget đổi ngay. Giá dùng tiền tệ mặc định của shop, không quy đổi theo Markets |

```
Merchant publish box ──► Mysbox ghi metafield (biến thể + shop) ──► Shopify lưu
Khách mở trang sản phẩm ──► theme in dữ liệu metafield ra trang (không gọi mạng)
                        ──► widget đọc, rồi hỏi Storefront API để lấy tên/ảnh/giá món
Khách đổi biến thể ──► widget tìm lại dữ liệu theo id biến thể, không tải lại trang
```

Widget **ẩn** nếu: box chưa Active hoặc chưa publish, không có món, hoặc shop gói Free vượt dung lượng (xem [../05-plans-billing/01-plans-and-capacity.md](../05-plans-billing/01-plans-and-capacity.md)). Trong theme editor nó hiện chữ giữ chỗ "Your box items will be displayed here."

## Block checkout / tài khoản khách đọc gì

| Block | Dữ liệu |
|---|---|
| Trang cảm ơn / trạng thái đơn ("Unbox your mystery box now!") | Metafield `mysbox.box` của từng dòng hàng; bản dịch, gói, capabilities; gọi API Mysbox (xác thực bằng tên shop, xem [00-overview-and-auth.md](00-overview-and-auth.md)) để mở box |
| Banner trong tài khoản khách ("Unbox alert") | Metafield bản dịch/gói; số box chưa mở lấy qua API Mysbox |
| "Items purchased with store credit" | Metafield khách `mysbox.customer_variants` + Storefront API |
| Block đơn trong admin Shopify ("Mysbox prizes", nút "Unbox all boxes") | Metafield đơn `mysbox_prize_ids`; metafield biến thể `mysbox.box` |
| Giảm giá 100% khi trả bằng store credit | Shopify Function đọc metafield khách `customer_variants` |

## Trang đơn hàng của khách (app proxy)

Trang `/apps/mysbox/orders` là một ứng dụng Vue riêng chạy *bên trong theme* của shop. Nó gọi API Mysbox qua app proxy cho: danh sách đơn, chi tiết đơn, box chưa mở, mở box, box-versions, bản dịch, resell (xem được món nào bán lại được, thực hiện resell), và (staging) tạo link chia sẻ. Dữ liệu tên/giá món vẫn lấy từ Storefront API. Xác thực: [00-overview-and-auth.md](00-overview-and-auth.md) mục 2-3.

## Khi dữ liệu storefront bị cũ

Vì metafield là bản "đã đẩy", nó cũ khi lần ghi thất bại. Dấu hiệu: widget hiện món/tồn kho cũ, "sold out" sai, widget ẩn dù gói ổn. Cách xử lý ở giao diện admin panel: Shops → "Sync capacity to metafield" (đẩy lại trạng thái gói/dung lượng); engineering chạy lệnh đẩy lại toàn bộ dữ liệu variant của shop. Chi tiết: [../10-support-playbook/03-storefront-and-widget.md](../10-support-playbook/03-storefront-and-widget.md).

## Ví dụ có số

Shop An publish "Neon Box" (3 bundle) lúc 09:00 → Mysbox ghi metafield `mysbox.box` của biến thể. Bình mở trang sản phẩm lúc 09:01: theme in dữ liệu có sẵn, widget vẽ 3 bundle; riêng ảnh và giá của từng món widget hỏi Storefront API. An đổi tên một món trong Shopify lúc 09:10 → Bình tải lại thấy tên mới ngay (tên đọc trực tiếp từ Shopify), nhưng nếu An sửa *chance* trong Mysbox mà bản publish lại chưa xong thì chance cũ vẫn hiện cho tới khi metafield được ghi lại. Sau khi Bình mua, trang `/apps/mysbox/orders` của cô lấy đơn qua app proxy, không qua metafield.

## Câu hỏi thường gặp

- **Widget hiện dữ liệu cũ?** Dữ liệu metafield chưa được đẩy lại; nhờ hỗ trợ đồng bộ lại.
- **Khách thấy trang cấu hình của shop trong mã nguồn trang?** Có: cấu hình shop và bản dịch nằm trong metafield công khai nên ai xem mã trang cũng đọc được. Đừng để thông tin bí mật vào cài đặt shop.
- **Theme không phải Online Store 2.0?** Không đặt block được, chỉ dùng app embed.
