# CBS-096 CLAIM-02 — block nguyên văn từ Proposal

### CLAIM-02

- **Statement:** Line item có customization_id sai định dạng không làm hỏng đơn: đơn vẫn được import, line hiện như item không có design, đơn toàn line sai định dạng import như đơn không customization, và line sai định dạng không tạo usage.
- **Object / feature:** order/MỚI: shopify-order-import — Thuộc: import/đồng bộ đơn Shopify vào Teeinblue ở backend (webhook create/update, re-sync, khôi phục customization, usage); Không thuộc: flow đặt hàng của buyer trên storefront (place-personalized-order-storefront), review và fulfill ở portal (review-and-initiate-fulfillment-portal)
- **Quan hệ với canon:** `ADD`
- **Scope:** system (import) + owner (xem kết quả ở Portal); api, portal, db (usage)
- **Đã ship:** `NOT_SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (tinhpt), 2026-10-26
- **Locator:** Jira TIB-5563 comment 55626, trả lời Q1, Q2, Q9. QA chạy staging 2026-10-28 (QA-3430) thấy ngược lại: đơn có line id sai định dạng không vào Teeinblue sau 33–38 phút, đơn đối chứng vào trong < 4 phút; bug draft BUG-01 chưa file, chưa có TC PASS sau fix. Không đóng OQ-order-001, không sửa CHK-006-ORDER01-SYNC. Gần KB-011, KB-017, không thay thế. (CCR cũ: CBS-020 CLAIM-02)
- **Trích nguyên văn:**
  ```
  Q1 A — Imported. The order record is created the same way as an order whose items have no `customization_id`; whether it is a TeeInBlue order still depends only on the product (`by_teeinblue`), not on the property.
  
  Q2 A — Item without design. The order item is created; it just has no customization attached.
  
  Q9: Not counted. Usage is only created when a customization is matched, so a malformed-id item counts the same as an item without `customization_id`. QA can check that the order item has no usage record / the usage counter does not increase.
  ```
