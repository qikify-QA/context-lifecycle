# Tạo box và vòng đời Draft / Active

> Hướng dẫn từng màn hình khi merchant tạo box, nhãn UI và thông báo lỗi thật, mặc định và giới hạn; app tạo/đổi gì trong Shopify; và chuyện gì xảy ra khi draft, publish, unpublish, delete (kể cả với đơn cũ). Loại box xem [01-box-types](01-box-types.md); version xem [03-versions](03-versions.md). Về nhóm: [00-overview](00-overview.md).

## Bước 1 — Vào form

Shop An có ba cách: nút "Create new box" ở Dashboard; "Boxes" → "Set up new box"; hoặc wizard lần đầu ("Welcome! Choose how customers experience the reveal." → chọn "Instantly opening box" hoặc "Sealed box" → chọn loại box → form → "Last step! Make your mystery box visible" → "Congratulations! Your mystery box is now live"). Có thêm "Duplicate box" (copy mọi cài đặt sang box mới chưa lưu).

Nút "Create new box" bị khoá khi gói Free đã dùng hết quota box.

## Bước 2 — Điền "Box settings" (theo thứ tự màn hình)

| # | Mục | Chọn / nhập | Mặc định | Quy tắc, giới hạn |
|---|---|---|---|---|
| 1 | "Box type" | "Instantly opening box" / "Sealed box" | số (hoặc lựa chọn ở onboarding) | Sealed ẩn animation và buyback |
| 2 | "Link to mystery product" (bắt buộc) | nút "Select product to sell as mystery box"; hiện "N boxes in stock" hoặc "Product is out of stock or deleted" | — | Chỉ 1 variant. Một variant thuộc **một** box |
| 3 | "Randomization method" | "Random by single item(s)" / "Random by group(s)" | single item | Chỉ hiện nếu tuỳ chọn Group được bật cho shop |
| 3b | "Group chance mechanism" (Group) | draw / pool | draw | Pool cần tổng item ≥ tồn kho |
| 3c | "When one of groups has been all revealed" (pool) | "Refill the group" / "Continuously randomize items in the remaining groups" / "Automatically deactivate box" | Refill | Xem [04](04-inventory-and-pools.md) |
| 3d | Dưới "deactivate" | tick "Automatically set the mystery product to draft in Shopify admin" | đã tick | Product Shopify thành Draft khi hết |
| 3e | "When items are resold by customers:" | "Not refill..." / "Automatically refill resold items in the group" | Not refill | Xem [06](06-pool-refill.md) |
| 4 | "Prize" | Single: 1 set. Bundle: "Prize #1", "Prize #2", nút "Add prize set". Group: "Add tier" | Group có 4 nhóm sẵn | Bundle 2-20 set, không xoá dưới mức tối thiểu |
| 5 | "Chance display" (Single tracked) | "Show original chance" / "Show remaining stock" | original | Stock cần box tracked |
| 6 | "Animation Settings" (box số) | Single: "Carousel", "Drawing", "Card flip", "Gacha", "None". Bundle: "Drawing", "Card flip", "None" | Single carousel; Bundle drawing | "Gacha" khoá với gói Free/Early-bird |
| 7 | "Buy back function" (box số) | bật buyback, refund method, value % | tắt | Khoá ở Free/Early-bird: "Upgrade subscription plan to use this feature. It is not available on Free and Early-bird plan." Chi tiết ở [nhóm 04](../04-resell-refund-credit/00-overview.md) |
| 8 | "Advanced Settings" | "Allow purchase with store credit (using Koin app)", "Only allow store credit purchases", "Unique in an order" | tất cả tắt | "Unique in an order" không có ở Group |
| phải | "Status" | "Draft" / "Active" | Active sau lần lưu đầu | Khoá khi form có thay đổi chưa lưu |
| phải | "Preview by test order" | nút "Preview" | — | Tạo đơn test, mở trang order status để xem animation; khoá nếu box Draft/chưa lưu |
| phải | "Sync data" (Group, Draft) | nút | — | Dùng khi sản phẩm/collection ở Shopify đổi sau khi publish |

**Prize set:** box tracked điền "Quantity", tổng mỗi set **phải bằng tồn kho Shopify** (thanh tiến độ "All set!"). Box untracked điền "Chance" %, tổng **phải bằng 100**. Tồn kho của chính variant prize chỉ để tham khảo, không bị kiểm tra.

**Group:** mỗi nhóm chọn "Select by specific product(s)" hoặc "Select by specific collection". Hiện "N item(s) included" và "Item chance in group: X%". Phải có ≥ 1 nhóm; chance nhóm cộng đúng 100%. Dòng "Expected value" chỉ để định giá, không dùng để tính tiền.

## Bước 3 — Bấm Save: lỗi thật có thể gặp

| Thông báo | Khi nào |
|---|---|
| "Missing mystery product. Please select one from your list to be the mystery box." | chưa chọn sản phẩm |
| "The random set is empty..." / "Each group must have at least one item added." | set/nhóm rỗng |
| "The item quantities in {set} are inconsistent. Please adjust each item so that the total quantities equals {N}." (hoặc "percentages", 100) | tổng không khớp tồn kho / 100 |
| "Group chances must total 100%" | chance nhóm ≠ 100 |
| "You need to set the total random items in all tiers are more than or equal the box stock." | pool mà item ít hơn tồn kho |
| "The selected mystery product is already linked to another box." | variant đã thuộc box khác (kể cả box Draft) |
| "Box tracking settings do not match the box variant tracking settings in Shopify." | form tracked khác Shopify "Track quantity" |
| "Box items rates must sum to 1" / "Total bundle rate must sum to 1." | % không tròn 100% |
| "All bundles must have the same total quantity of items." / "Box items count does not match the box variant count" | các set không bằng nhau hoặc ≠ tồn kho |
| "Related box not found" / "One or more item variants not found in Shopify." | thiếu tài nguyên ở Shopify (Shopify lỗi tạm cũng có thể hiện như vậy) |
| Sau lưu: "Box created!" / "Box updated!" / "Syncing inventory..." / "Sync failed. Please contact support for assistance." | kết quả |

**Save làm gì:** Single/Bundle mới → tạo box rồi **tự publish ngay** (thành Active). Sửa box Draft → chỉ lưu, không tự publish. Group → lưu, chờ "Syncing inventory..." (tối đa khoảng 60 giây trên màn hình, backend chờ tới 180 giây để phân giải collection) rồi mới publish.

## Bước 4 — App tạo/đổi gì trong Shopify

| Thứ | Hành vi |
|---|---|
| Sản phẩm/variant mystery | Không đổi giá, tên, ảnh, tồn kho. Chỉ **thêm dữ liệu** vào variant (metafield `mysbox.box`: cấu hình box cho widget đọc). Xoá box thì metafield bị xoá. |
| Variant prize | Chỉ đọc (tên, ảnh, giá). |
| Trạng thái product | Chỉ khi Group hết nhóm và đã tick "Automatically set the mystery product to draft": product thành Draft. |
| Đơn hàng | Sau khi box số mở xong (và hết thời gian resell), prize được thêm vào đơn Shopify với giảm 100%, tên "MYSBOX". Box Sealed không thêm dòng. |
| Theme | Không bao giờ tự sửa. Merchant tự bật app embed và block ([07](07-storefront-widget-and-translations.md)). |
| Test order | "Preview" tạo đơn test tag `mysbox-preview-order`. |

**Mysbox không theo dõi Shopify thay đổi.** Chỉ có webhook uninstall, shop update, orders paid, bulk finish. Nếu Shop An nhập thêm hàng hay sửa product/collection ở Shopify, bản sao trong Mysbox **không tự cập nhật** cho tới khi deactivate → lưu lại (hoặc "Sync data" với Group) → activate.

## Bước 5 — Draft, publish, unpublish, delete

```
Draft (published_at trống) ──Save lần đầu / nút Activate──► Active
Active ──"Deactivate box" / toggle──► Draft
Active: KHÔNG sửa, KHÔNG xoá được (banner "The box is on sale and cannot be edited. Pause sales to make changes.")
```

- **Draft:** widget ẩn. Đơn mua variant này được coi là sản phẩm thường, **không có bốc thăm**.
- **Publish** cần: đồng bộ xong (nếu chưa: "Box sync is not complete."); Group pool phải còn item ("Cannot publish: inventory pools are exhausted."); Shopify nhận được metafield (nếu Shopify từ chối, publish thất bại).
- **Delete:** Draft → "Are you sure you want to delete this box?". Active → "To delete this box, you must deactivate it first, and should pause sales to avoid any disruption to your customers." Xoá box bỏ luôn tồn kho và metafield; **version vẫn còn** nên đơn đã bốc thăm vẫn mở được.
- **Tự unpublish:** gói Free đạt quota → *tất cả* box bị unpublish (đến khi nâng gói); huỷ gói trả phí cũng vậy; Group "Automatically deactivate box" khi một nhóm hết.

## Ví dụ — Bình mua lúc box đổi trạng thái

Shop An có box Single (Active). 14:00 Bình mua và thanh toán; 14:00:05 server bốc thăm xong, kết quả gắn với version đang hiệu lực. 14:10 An deactivate để sửa tỉ lệ; 14:20 An xoá hẳn box. Bình vẫn mở hộp được và thấy đúng prize đã bốc. Ngoại lệ hẹp: đơn thanh toán ngay trước khi An deactivate mà job bốc thăm chưa chạy thì bị bỏ qua vì box không còn published.

## Câu hỏi thường gặp

- **"Preview" bị xám?** Box đang Draft hoặc chưa lưu: lưu và activate trước.
- **Không sửa được box?** Box đang Active: "Deactivate box", sửa, Save, bật lại Active.
- **Toàn bộ box biến mất khỏi store?** Gói Free hết quota hoặc gói bị huỷ; xem [nhóm 05](../05-plans-billing/01-plans-and-capacity.md).
