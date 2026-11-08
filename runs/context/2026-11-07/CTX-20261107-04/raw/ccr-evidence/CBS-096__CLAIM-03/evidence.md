# CBS-096 CLAIM-03 — block nguyên văn từ Proposal

### CLAIM-03

- **Statement:** Khôi phục customization qua cart token chạy theo đơn, không theo item: chỉ chạy khi không line nào trong đơn có id số/UUID hợp lệ; line có property được khớp theo giá trị property, không theo variant, nên line sai định dạng không bao giờ được khôi phục.
- **Object / feature:** order/MỚI: shopify-order-import — Thuộc: import/đồng bộ đơn Shopify vào Teeinblue ở backend (webhook create/update, re-sync, khôi phục customization, usage); Không thuộc: flow đặt hàng của buyer trên storefront (place-personalized-order-storefront), review và fulfill ở portal (review-and-initiate-fulfillment-portal)
- **Quan hệ với canon:** `ADD`
- **Scope:** system (job webhook); api, db
- **Đã ship:** `NOT_SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (tinhpt), 2026-10-26
- **Locator:** Jira TIB-5563 comment 55626, trả lời Q3. Hành vi dự định sau fix, chưa quan sát; không dùng làm expected tới khi có TC PASS sau fix. (CCR cũ: CBS-020 CLAIM-03)
- **Trích nguyên văn:**
  ```
  Q3: Different from the suggestion. The cart-token recovery works per order, not per item: it only runs when no line item in the order has a valid numeric/UUID id. Even when it does run, the malformed-id item does not get a recovered customization, because a line item that has the property is matched by that property's value, not by variant. So a malformed-id item is never recovered.
  ```
