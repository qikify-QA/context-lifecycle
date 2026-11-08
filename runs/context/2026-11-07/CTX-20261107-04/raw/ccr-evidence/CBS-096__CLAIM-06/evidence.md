# CBS-096 CLAIM-06 — block nguyên văn từ Proposal

### CLAIM-06

- **Statement:** Đơn đã lỗi SQLSTATE 22P02 trước bản fix (Sentry TEEINBLUE-4FG) không được import lại, và dev không theo dõi Sentry cho bản fix này.
- **Object / feature:** order/MỚI: shopify-order-import — Thuộc: import/đồng bộ đơn Shopify vào Teeinblue ở backend (webhook create/update, re-sync, khôi phục customization, usage); Không thuộc: flow đặt hàng của buyer trên storefront (place-personalized-order-storefront), review và fulfill ở portal (review-and-initiate-fulfillment-portal)
- **Quan hệ với canon:** `ADD`
- **Scope:** system (dữ liệu đơn lịch sử); api
- **Đã ship:** `NOT_SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (tinhpt), 2026-10-26
- **Locator:** Jira TIB-5563 comment 55626, trả lời Q7, Q10. Chỉ ghi giới hạn đã biết, không đề xuất cam kết vận hành; số sự kiện Sentry trong câu hỏi không phải dữ kiện canon. (CCR cũ: CBS-020 CLAIM-06)
- **Trích nguyên văn:**
  ```
  Q7: No action. The orders that failed earlier will not be re-imported.
  
  Q10: No action. We won't monitor Sentry or provide evidence for this.
  
  Câu hỏi Q7 (QA, comment 55595): "Will the orders that failed before the fix (98 Sentry events since 2026-09-17) be re-imported, and by whom?"
  ```
