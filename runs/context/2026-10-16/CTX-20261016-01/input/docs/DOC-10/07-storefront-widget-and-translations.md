# Widget storefront, theme block, dịch văn bản, custom CSS/JS

> Khách thấy box thế nào trên storefront: các block merchant phải thêm vào theme, cài đặt giao diện, trang dịch văn bản ("Content & Translation"), và custom CSS/JS (ai được sửa). Nội dung chạy phía khách sau khi mua xem [nhóm 03](../03-orders-and-reveal/02-reveal-journey.md); luồng dữ liệu storefront xem [nhóm 09](../09-integrations/02-storefront-data-flow.md). Về nhóm: [00-overview](00-overview.md).

## Bước 1 — Merchant bật app embed và block

Mysbox **không bao giờ tự sửa theme**. Merchant tự thêm; portal có nút deep-link ("Add block to theme editor" ở trang "Setup instructions"), và Dashboard cho biết embed/block nào đã cài.

| Block (tên trong theme editor) | Đặt ở | Khách thấy |
|---|---|---|
| App embed "Mysbox App" | Theme editor → App embeds | Nạp widget trên mọi trang; **bắt buộc** cho các block khác |
| "Mysbox list box item" | Trang sản phẩm | Mục "Box items". Single: lưới thẻ item (tên, "Chance: x%" hoặc tồn kho, giá tuỳ chọn, nhãn "Pulled"). Bundle: "You will receive a box of N premium products", mỗi set có "Get 1 out of N items", "View all"/"Shrink". Group: thẻ độ hiếm xếp theo chance (mặc định hiện 2 nhóm) |
| "Buy box by store credit" | Trang sản phẩm | Checkbox "Pay with store credit", số dư; chặn Add to cart / Buy now |
| "Mysbox recent pulls" | Trang sản phẩm | Carousel "Recent pulls" kèm "X ago"; cần bật "Show recent pulls" và box số |
| "Mystery box unboxing - Thank you page" / "- Order status page" | Checkout editor | Lưới hộp đã mua với nút "Unbox"/"Multi-unbox" và đếm ngược auto-unbox; mở reveal ở **tab mới** |
| Customer account blocks | Customer accounts editor | Banner "Unbox alert" và "Items purchased with store credit" |
| Watermark "Powered by Mysbox" | tự động | Link trên danh sách item và màn winner; ẩn bằng `hide_watermark` |

Widget ẩn nếu box không Active, không có item, hoặc shop vượt capacity (gói Free). Chỉ trong theme editor mới thấy dòng giữ chỗ "Your box items will be displayed here.".

## Bước 2 — Style Settings (merchant tự chỉnh)

Trang "Style Settings" → "Item list": "Item image shape" (Square/Circle thumbnail), "Hide item name", "Hide item chance", "Hide item price" (**mặc định bật**), "Image size (px)", "Show tier chance", "Show random items in each group", "Show item name and price", "Maximum number of groups shown" (hiện theo độ hiếm), "Box item is shown as: List / Carousel". Bản xem trước trong portal dùng chính code widget thật. Ngoài ra có màu, âm thanh, thông số animation. Giá item: widget hiện giá thật khi lấy được, nếu không dùng giá chụp lúc lưu.

## Bước 3 — Dịch văn bản ("Content & Translation")

Cần **gói trả phí** (gói Free chỉ thấy banner). Merchant chọn "Select language" (ngôn ngữ lấy từ Shopify; không có ngôn ngữ phụ thì hiện "No locale found"), sửa "Default Text" hoặc "Translation". Có cảnh báo "Only translate the text outside the curly brackets." (đừng dịch phần trong `{}`).

| Nhóm | Khách thấy ở đâu | Ví dụ mặc định |
|---|---|---|
| General settings | Reveal và widget | "Box items", "Unbox", "Multi-unbox", "Chance", "Skip", "Auto-open in: {time}" |
| Product | Widget trang sản phẩm | "Pay with store credit", "Balance", "Get 1 out of {quantity} items", `{remaining-items}/{total-items} left`, "Recent pulls" |
| Thank-you and order status | Checkout | "Unbox your mystery box now", "You cannot unbox the box online because the order has not been paid yet." |
| Unboxing | Trang mở hộp | "Congratulations! Your lucky item is revealed", "Next unbox", "Open more" |
| Customer account | Trang tài khoản | "You've got {box_quantity} mystery boxes waiting to be unboxed" |
| Order | Danh sách đơn | "Your orders", "Not unboxed yet", "Unboxed" |
| Buyback widget | Popup resell | "Resell selected items for store credit. Time left: {resell-end-time}", "Resell successfully" |
| Share unboxing `[chỉ có trên staging]` | Popup chia sẻ | "Share unboxing" |

Khách thấy bản dịch theo ngôn ngữ storefront của họ, nếu thiếu thì dùng "Default Text". **Tên item/prize** lấy từ bản dịch sản phẩm của Shopify, không phải trang này. Chính portal chỉ có tiếng Anh hoặc tiếng Nhật.

Ví dụ: Shop An bán sang Nhật. Trong "Content & Translation" chọn Japanese, dịch "Unbox" thành "開封する" ở nhóm General settings. Bình duyệt storefront tiếng Nhật thấy nút mới; khách tiếng Pháp (chưa dịch) vẫn thấy "Unbox". Tên figure vẫn lấy từ bản dịch product trong Shopify.

## Bước 4 — Custom CSS / JS: ai được sửa

| Muốn chỉnh | Ai làm | Ở đâu |
|---|---|---|
| Màu, hình dạng, ẩn/hiện tên-chance-giá, animation | **Merchant** tự làm | "Style Settings" trong portal |
| CSS/JS tự do ở trang sản phẩm và theme (`custom_style`, `custom_script`) | **Mysbox staff** | Admin panel → shop → mục "Customizations" (cần quyền `update_customizations`) |
| CSS/JS trang đơn của khách (`customer_portal_style/script`) | Mysbox staff | cùng mục |
| CSS/JS portal của merchant (`portal_style/script`) | Mysbox staff | cùng mục |

Merchant không có ô CSS/JS tự do trong portal; muốn là nhờ support (Chi). Tuỳ chọn mà `custom_script` có thể đặt qua `window.Mysbox`: `listItemSize`, `hideChance`, `priorItemSettingsTitle`, `isSkipAtcClick`, `hideStoreCreditWhenInsufficient`, `itemStockText` (mặc định `{quantity}/{total} left`), `remainText` (mặc định `Remain`), cùng ghi đè selector cho theme có form Add to cart lạ. Với trang đơn: `window.MysboxCustomOptions` (`primaryColor`, `delayAnimationRunningState`, `showVariantTitleOnly`, `showBuybackValue`, cờ theme tối). Dev có thể ghi đè một chuỗi bằng `customTranslate`.


## Câu hỏi thường gặp

- **Widget không hiện?** Chưa bật app embed / block; box Draft; hoặc shop vượt capacity Free.
- **Khách thấy chữ cũ?** Bản dịch lưu cho ngôn ngữ khác, hoặc chưa có gói trả phí.
- **Stock hiện cũ?** Có thể trễ vài giây: [04](04-inventory-and-pools.md#hiển-thị-tồn-kho-trên-storefront).
- **Muốn đổi font hoặc layout đặc biệt?** Gửi yêu cầu cho support để thêm `custom_style`.
