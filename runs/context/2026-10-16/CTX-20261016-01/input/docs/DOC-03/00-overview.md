# Nhóm 02 — Boxes (hộp bí ẩn)

> Nhóm này giải thích **box** — đơn vị bán hàng cốt lõi của Mysbox: merchant tạo box thế nào, box có những loại nào, tồn kho và pool vận hành ra sao, khách thấy gì trên storefront. Nằm giữa [tổng quan chung](../00-overview.md) (bức tranh toàn app) và [nhóm 03 — đơn hàng và reveal](../03-orders-and-reveal/00-overview.md) (chuyện xảy ra sau khi khách mua). Thực thể và field xem [01-domain-entities](../01-domain-entities.md).

## Nhóm này làm gì, ai dùng

- **Merchant** (Shop An, chủ shop Shopify) dùng màn hình "Boxes" trong app để tạo box, chọn prize (item khách có thể trúng), đặt tỉ lệ, bật bán.
- **Khách** (Bình) thấy danh sách item trên trang sản phẩm (widget) và mua như một sản phẩm Shopify bình thường.
- **Support / Mysbox team** (Chi) xử lý các tuỳ chỉnh mà merchant không tự làm được (custom CSS/JS, bật nhóm "Random by group(s)", chế độ MANUAL của pool refill).

## Sơ đồ tổng quát

```
Shopify: sản phẩm "mystery" (1 variant)          Shopify: các variant prize
        \                                         /
         \__ Merchant tạo Box (Draft) ___________/
                     |  Save
                     v
            Box được publish (Active) ──► app ghi dữ liệu vào variant (metafield)
                     |                          |
                     |                          v
                     |                 Widget storefront hiện item + chance/tồn kho
                     v
   Khách mua ► đơn "paid" ► server bốc thăm trước (draw) ► reveal (nhóm 03)
                     |
                     v
   Tồn kho box giảm ► (box tracked/pool) hết ► sold-out / tự deactivate / refill
```

Ý chính: **việc bốc thăm xảy ra trên server ngay sau khi đơn được thanh toán**, trước khi khách mở. Animation chỉ "diễn" lại kết quả đã chọn.

## Mục lục

| File | Nội dung |
|---|---|
| [01-box-types](01-box-types.md) | Single, Bundle, Group (tier); bảng chọn loại; ví dụ số mỗi loại |
| [02-create-and-publish](02-create-and-publish.md) | Từng màn hình tạo box, nhãn UI, lỗi thật, mặc định; app đổi gì trong Shopify; draft/publish/delete |
| [03-versions](03-versions.md) | Box version: thay đổi nào tạo version mới, đơn cũ chịu ảnh hưởng ra sao |
| [04-inventory-and-pools](04-inventory-and-pools.md) | Tồn kho tracked/untracked, pool cạn, sold-out, cách hiển thị tồn kho |
| [05-picking-modes](05-picking-modes.md) | Các picking mode, kể cả "unique across pools" `[chỉ có trên staging]` |
| [06-pool-refill](06-pool-refill.md) | Trả item đã resell về pool: AUTO và MANUAL |
| [07-storefront-widget-and-translations](07-storefront-widget-and-translations.md) | Widget, theme block, dịch văn bản, custom CSS/JS |

## Từ vựng nhóm

| Thuật ngữ | Nghĩa |
|---|---|
| Box | Một variant Shopify được "biến" thành hộp bí ẩn. Một variant chỉ thuộc một box. |
| Mystery product | Sản phẩm/variant khách mua (giá, ảnh, tồn kho là của merchant). |
| Prize / item | Variant Shopify mà khách có thể trúng. |
| Prize set ("Prize #1"...) | Chỉ ở Bundle: một danh sách ứng viên; mỗi hộp lấy đúng 1 item từ mỗi set. |
| Group (tier) | Chỉ ở Group box: nhóm độ hiếm ("Common", "Rare"...) có chance riêng; item trong nhóm có xác suất bằng nhau. |
| Tracked / untracked | Variant Shopify bật hay tắt "Track quantity". Tracked = có tồn kho, item dùng **số lượng**. Untracked = không giới hạn, item dùng **phần trăm**. |
| Draft / Active | Trạng thái box. Draft sửa được, chưa bán dạng mystery. Active đang bán, chỉ đọc. |
| Version | Bản chụp bất biến của cấu hình box. Đơn nhớ version lúc được bốc thăm. |
| Sealed box / Instantly opening box | Box vật lý (ship, prize ẩn) / box số (mở online). Chi tiết ở [nhóm 03](../03-orders-and-reveal/05-physical-vs-digital.md). |

## Ví dụ chạy xuyên suốt cả nhóm

Shop An bán hộp **"Hộp may mắn"** giá 10 USD. Cả nhóm dùng các biến thể của shop này: bản Single có 10 hộp (3 item), bản Bundle (figure + sticker), bản Group (Common/Rare/Epic/Legendary). Khách tên **Bình**.
