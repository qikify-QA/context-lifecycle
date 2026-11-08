# CBS-096 CLAIM-04 — block nguyên văn từ Proposal

### CLAIM-04

- **Statement:** Lookup ShopifyObjects\Order chỉ phục vụ luồng đơn Shopify (webhook create/update, re-sync thủ công SyncShopifyOrder / admin Order Sync, command FixMissingCustomization); Etsy và nền tảng khác không dùng, và _tib_customization_id đọc bằng method riêng, ngoài check này.
- **Object / feature:** order/MỚI: shopify-order-import — Thuộc: import/đồng bộ đơn Shopify vào Teeinblue ở backend (webhook create/update, re-sync, khôi phục customization, usage); Không thuộc: flow đặt hàng của buyer trên storefront (place-personalized-order-storefront), review và fulfill ở portal (review-and-initiate-fulfillment-portal)
- **Quan hệ với canon:** `ADD`
- **Scope:** system (webhook create/update, re-sync, command) + staff admin (Order Sync); api
- **Đã ship:** `NOT_SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (tinhpt), 2026-10-26
- **Locator:** Jira TIB-5563 comment 55626, trả lời Q8a, Q8b. Hành vi dự định sau fix, chưa quan sát; không dùng làm expected tới khi có TC PASS sau fix. Chưa thử TC-26 (re-sync), TC-27 (FixMissingCustomization). Không suy diễn từ TC-41 / TC-36; không đề xuất gì thêm về _tib_customization_id. (CCR cũ: CBS-020 CLAIM-04)
- **Trích nguyên văn:**
  ```
  Q8: (a) Only the Shopify order flow: order create/update webhooks, manual re-sync (`SyncShopifyOrder` / admin Order Sync), and the `FixMissingCustomization` command all go through the same `ShopifyObjects\Order` lookup. Etsy and other platforms are not affected. (b) `_tib_customization_id` is the addon key, read by a separate method; it is not part of this check and is unchanged.
  ```
