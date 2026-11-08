### CLAIM-15

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** Jira TIB-5510; skill-rules-audit.md #96, #97, #98, #99, #101, #102, #103, #105, #106, #109, #110 (rule `required-addon-checkout-validation`)
- **Link:** https://ownego.atlassian.net/browse/TIB-5510
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-26, 2026-10-27, 2026-11-02, 2026-11-03
- **Người viết / người xác nhận:** QA
- **Trích nguyên văn:**
  - skill-rules-audit.md #96, rule `required-addon-checkout-validation`, nguồn ghi: user/dev answers 2026-10-26, TIB-5510:
    ```
    `rate` comes from the addon setting in the artwork layer.
    ```
  - skill-rules-audit.md #97, rule `required-addon-checkout-validation`, nguồn ghi: user/dev answers 2026-10-26, TIB-5510:
    ```
    Direct-price addons do not carry `_tib_addon_variant` → never checked by the Function.
    ```
  - skill-rules-audit.md #98, rule `required-addon-checkout-validation`, nguồn ghi: user/dev answers 2026-10-26, TIB-5510:
    ```
    Edit Customization changes `_tib_customization_id` and the addon line follows it.
    ```
  - skill-rules-audit.md #99, rule `required-addon-checkout-validation`, nguồn ghi: user/dev answers 2026-10-26, TIB-5510:
    ```
    Validation banner shows on the checkout page; Pay now cannot complete. Function failure = fail open (checkout succeeds).
    ```
  - Jira TIB-5510 comment #55071, phatnt, 2026-10-19, khớp một phần:
    ```
    Trang Checkout của Shopify chặn đứng thanh toán. Hiển thị banner cảnh báo lỗi ở đầu trang checkout: The item "[Tên sản phẩm chính]" requires an attached add-on product. Please return to your cart, remove this item, and add it again. Không thể hoàn tất đặt hàng.
    ```
  - skill-rules-audit.md #101, rule `required-addon-checkout-validation`, nguồn ghi: user/dev answers 2026-10-26, TIB-5510:
    ```
    "Unlisted" = Shopify's Unlisted product status.
    ```
  - Jira TIB-5510 comment #55071, phatnt, 2026-10-19, khớp một phần:
    ```
    Phân biệt đúng: Cho phép bán tiếp khi hết hàng (Continue selling when out of stock) hoặc sản phẩm Unlisted (Active nhưng ẩn catalog) thì vẫn cho phép ATC bình thường.
    ```
  - skill-rules-audit.md #102, rule `required-addon-checkout-validation`, nguồn ghi: user/dev answers 2026-10-26, TIB-5510:
    ```
    Out of scope: Function failure cases, draft order / POS / B2B.
    ```
  - skill-rules-audit.md #103, rule `required-addon-checkout-validation`, nguồn ghi: user/dev answers 2026-10-26, TIB-5510:
    ```
    Checkout message is shared by "missing" and "not enough quantity" and is English only (Function runtime has no locale). The ATC message is translatable via `addon_unavailable_error`.
    ```
  - Jira TIB-5510 comment #55732, phatnt, 2026-10-27, khớp một phần:
    ```
    Tại Lớp 1 (SDK - ATC): CÓ hỗ trợ dịch theo ngôn ngữ storefront qua khóa addon_unavailable_error trong cấu hình translation của Teeinblue hoặc window.teeinblue.addonUnavailableMessage. Tại Lớp 2 (Checkout Function): Hiện tại trả về message tiếng Anh từ Shopify Function Wasm (Shopify Functions Checkout Validation API chưa hỗ trợ resolve locale trực tiếp trong function runtime, đây là chuẩn chung của Shopify Function hiện nay).
    ```
  - skill-rules-audit.md #105, rule `required-addon-checkout-validation`, nguồn ghi: user/dev answers 2026-10-26, TIB-5510:
    ```
    SDK availability is a page-load snapshot. A stale tab (addon archived after page load) does not block ATC: Shopify returns 422, or Layer 2 blocks at checkout. A stale tab where the addon came back in stock keeps blocking until reload. Stale-tab = the original bug path, so it must be a test case.
    ```
  - Jira TIB-5510 comment #55732, phatnt, 2026-10-27, khớp một phần:
    ```
    Nếu không reload trang cũ: Từ Có hàng -> Hết hàng/Draft: Khách bấm ATC sẽ bị Shopify API từ chối (422) hoặc bị Lớp 2 (Checkout Function) chặn đứng tại Checkout. Từ Hết hàng -> Có hàng: SDK ở tab cũ vẫn giữ cờ unavailable và chặn ATC cho đến khi khách F5 lại trang.
    ```
  - skill-rules-audit.md #106, rule `required-addon-checkout-validation`, nguồn ghi: Dev phatnt 2026-10-27, TIB-5510:
    ```
    Dev phatnt 2026-10-27: applies to all merchants, both layers in scope.
    ```
  - Jira TIB-5510 comment #55732, phatnt, 2026-10-27, khớp một phần:
    ```
    Scope: Áp dụng cho tất cả merchant (không hardcode riêng cho [store]).
    ```
  - skill-rules-audit.md #109, rule `required-addon-checkout-validation`, nguồn ghi: Dev 2026-11-02, TIB-5510:
    ```
    Dev 2026-11-02 (supersedes above): SDK ATC block now **default OFF**; enable per store with `window.teeinblue.blockAtcUnavailableAddon = true` in theme.liquid. Portal › Product Page Content / Translations › Addon Charge now has `addon_unavailable_error` (form-level, EN default "…contact store support.") and `addon_unavailable_message` (field-level, EN default "The selected add-on is currently unavailable."). Fallback field: snippet `addonUnavailableMessage` → Portal `addon_unavailable_message` → snippet `addonUnavailableError` → Portal `addon_unavailable_error` → EN. Form: snippet `addonUnavailableError` → Portal `addon_unavailable_error` → EN. Theme snippets override Portal, so remove them before testing Portal translation.
    ```
  - Jira TIB-5510 comment #56209, phatnt, 2026-11-02, khớp một phần:
    ```
    Mặc định: Tính năng chặn ATC ở tầng SDK hiện MẶC ĐỊNH TẮT (return false) cho toàn bộ store để không ảnh hưởng đến các merchant thông thường.
    ```
  - skill-rules-audit.md #110, rule `required-addon-checkout-validation`, nguồn ghi: User 2026-11-03, TIB-5510:
    ```
    User 2026-11-03: the toggle has no Portal UI; a merchant's dev must add the snippet to their theme. So the default-off state is not tested (no case for "no snippet → not blocked"). Run SDK ATC-block cases with the snippet `= true`.
    ```
- **File đính kèm cho claim này:** không có

