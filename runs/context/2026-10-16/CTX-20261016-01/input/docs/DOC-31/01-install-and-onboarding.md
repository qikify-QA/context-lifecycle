# Cài app và onboarding

> Hành trình từ lúc merchant bấm cài app đến khi box đầu tiên lên sóng: quyền xin, dữ liệu được tạo, wizard 4 bước và "Setup guide". Thuộc nhóm [06-merchant-app](00-overview.md). Trạng thái shop sau cài đặt xem [04](04-shop-status-and-lifecycle.md).

## Bước 1 — Merchant cài app

An bấm cài từ App Store hoặc link của partner. Shopify hiện màn hình xin quyền; An bấm đồng ý.

| Quyền | Vì sao app cần (nói đơn giản) |
|---|---|
| Customers (đọc/ghi), store credit account | Tạo bản ghi khách để mở trang reveal; đọc và cộng store credit khi resell |
| Orders (đọc/ghi), order edits | Đọc đơn đã thanh toán; thêm quà vào đơn dưới dạng dòng $0; ghi note, tag, metafield |
| Products (ghi) | Ghi dữ liệu box vào metafield của variant để storefront đọc |
| Locales | Dịch chữ theo ngôn ngữ của shop |
| Themes (đọc) | Kiểm tra theme đã bật app embed và block chưa (Setup guide) |
| Discounts (ghi) | Tạo giảm giá tự động cho mua bằng store credit |
| Files (ghi) | Tải ảnh, âm thanh tuỳ chỉnh cho animation |
| Inventory, fulfillment orders (đọc) | Trừ tồn kho món thưởng của sealed box |

Production và staging xin cùng danh sách quyền; bản local dev ngắn hơn.

Khi cài xong, hệ thống tạo:
- **Bản ghi shop**: tên, tiền tệ, nước, cờ Plus, cờ dev store... lấy từ Shopify. Gói = Free.
- **Bộ đếm hạn mức**: hạn mức của gói mặc định (seed là 10 box), đã dùng 0, chu kỳ kết thúc sau 30 ngày kể từ ngày cài.
- **Storefront access token** (tạo một lần) và **metafield mirror**: gói, trạng thái, cấu hình được sao sang metafield để widget đọc.
- **Offline token dạng "expiring"**: khoá truy cập sống khoảng 1 giờ, khoá làm mới sống 90 ngày, tự xoay. Xem [04](04-shop-status-and-lifecycle.md).

Webhook app đăng ký: app uninstalled, shop update, orders paid, bulk operation finished, cùng 3 webhook quyền riêng tư bắt buộc. Merchant không phải làm gì thêm.

## Bước 2 — Mở app lần đầu: wizard onboarding

Chưa có box nào nên Dashboard hiện **wizard** thay cho dashboard. Menu trái chỉ có "Dashboard".

| Bước | Màn hình | Merchant làm |
|---|---|---|
| 1. Box type | "Welcome! Choose how customers experience the reveal." Hai thẻ: "Instantly opening box" (hợp gacha, lucky box), "Sealed box" (hợp xả kho) | Chọn Digital (mặc định) hoặc Physical |
| 2. Create box | "Let's create your first mystery box"; nút "Create product" rồi "Select mystery box you've just created." | Tạo sản phẩm Shopify và chọn nó |
| 2b. Set up | "Choose a box type": Single hoặc Bundle, rồi vào trình soạn box | Lưu lần đầu thì sang bước 3 |
| 3. Launch | Digital: "Last step! Make your mystery box visible" gồm "Enable theme app extension", "Add blocks to Thank you page", "Add blocks to Order status page". Sealed: giải thích quà ghi vào metafield đơn (mặc định "Variant SKU", ví dụ `{"sku":"SKU-01","quantity":5}`) | Dùng liên kết sâu vào theme editor và checkout editor |
| Kết | "Congratulations! Your mystery box is now live", nút "Complete and view in live store" | Đánh dấu xong, mở storefront |

Có link "Skip" với hộp xác nhận "Are you sure to skip onboarding?". Cho phép bỏ qua.

Wizard chỉ hiện khi shop **chưa có box** và chưa đánh dấu xong. Tiến độ lưu trong local storage của trình duyệt theo từng shop, nên đổi trình duyệt sẽ phải làm lại từ đầu.

**Ví dụ.** An chọn "Instantly opening box", tạo sản phẩm "Sneaker Mystery" giá $40, chọn Single box, khai Lace set 60%, Socks 30%, Limited Sneaker 10% rồi lưu và đặt trạng thái Active. Ở bước Launch, An bấm ba nút để bật embed và đặt block lên Thank-you và Order status. Xong, An mở storefront thấy box.

## Bước 3 — Dashboard sau onboarding: Setup guide

Thẻ "Setup guide: Follow these steps to set up your first mystery box and start selling!" với bộ đếm "N / 3 completed":

1. "Enable theme app extension": xong khi file cài đặt của theme chính liệt kê embed Mysbox ở trạng thái bật.
2. "Add blocks to Thank you & Order status pages": xong khi cả hai block có trong checkout editor.
3. "Set up your first mystery box": xong khi có box bất kỳ.

Thẻ thu gọn được; bấm tắt thì ẩn 30 ngày trong trình duyệt. Bên cạnh là bảng **App extension status**: "Theme extension" Active/Inactive và huy hiệu Installed / Not Installed cho từng block (hai block checkout; ba block tuỳ chọn: "Mysbox list box item", "Buy box by store credit", "Mysbox recent pulls"), kèm link "View instructions".


## Bước 4 — Gói Free

Merchant ở gói Free, không bị tính phí. Chữ trên màn hình: "You're in Free plan with the limit of 10 box sales. Once you reached the limit, mystery boxes will be disabled." Con số 10 gõ cứng trong chữ; giá trị thật là hạn mức của gói mặc định trong DB, *chưa xác nhận trên production*. Chạm trần thì mọi box bị gỡ xuất bản, xem [05/01](../05-plans-billing/01-plans-and-capacity.md).

## Câu hỏi thường gặp

1. **Wizard hiện lại dù đã làm?** Đổi trình duyệt hoặc xoá dữ liệu trình duyệt; tiến độ nằm ở local storage. Nếu shop đã có box thì wizard không hiện.
2. **Khách không thấy box trên trang sản phẩm?** Xem Theme extension trên Dashboard trước (embed tắt là nguyên nhân hàng đầu), rồi block "Mysbox list box item", rồi box có Active không.
3. **Có cần cấu hình webhook không?** Không, app tự đăng ký.
