# CBS-096 CLAIM-01 — block nguyên văn từ Proposal

### CLAIM-01

- **Statement:** Khi import đơn Shopify, giá trị _customization_id / customization_id chỉ được dùng để tìm theo customizations.uuid khi là UUID hợp lệ theo Str::isUuid (8-4-4-4-12 hex, không phân biệt hoa thường, không trim); khoảng trắng đầu/cuối, {…}, 32 hex không gạch và UUID nằm trong chuỗi dài hơn đều là sai định dạng, không trích xuất; cả 2 tên property cùng một check, nhánh id số giữ nguyên.
- **Object / feature:** order/MỚI: shopify-order-import — Thuộc: import/đồng bộ đơn Shopify vào Teeinblue ở backend (webhook create/update, re-sync, khôi phục customization, usage); Không thuộc: flow đặt hàng của buyer trên storefront (place-personalized-order-storefront), review và fulfill ở portal (review-and-initiate-fulfillment-portal)
- **Quan hệ với canon:** `ADD`
- **Scope:** system (job webhook đơn Shopify, mọi store Shopify của merchant); api, db (customizations.uuid)
- **Đã ship:** `NOT_SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (tinhpt), 2026-10-26
- **Locator:** Jira TIB-5563 comment 55626, trả lời Q4, Q5, Q6, Q8c của comment 55595. Hành vi dự định sau fix, chưa quan sát; không dùng làm expected tới khi có TC PASS sau fix. Nhánh id số (hasCustomizationId): chỉ ghi "giữ nguyên", không suy thêm. (CCR cũ: CBS-020 CLAIM-01)
- **Trích nguyên văn:**
  ```
  Q4: Hyphenated 8-4-4-4-12 hex only, case-insensitive (Laravel `Str::isUuid`). The value is NOT trimmed, so leading/trailing spaces count as malformed. Braces and no-hyphen forms count as malformed.
  
  Q5 A — Malformed, no extraction.
  
  Q6: Yes. Please test both property names: `_customization_id` and `customization_id` (without underscore). Both go through the same check.
  
  (c) The numeric path (`hasCustomizationId`) is unchanged.
  
  Câu hỏi Q5 (QA, comment 55595): "For values that contain a UUID inside a longer string (e.g. https://cdn.teeinblue.com/designs/<uuid>-[đã bỏ id].jpeg), should the UUID be extracted, or is the value simply malformed? — chọn: A) Malformed · B) Extract the UUID"
  ```
