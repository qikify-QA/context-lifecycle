# CBS-096 CLAIM-05 — block nguyên văn từ Proposal

### CLAIM-05

- **Statement:** Portal Order details / Edit order hiển thị nguyên giá trị _customization_id / customization_id của line item trong danh sách "Options" của item, chỉ khi store bật "show line item properties", ẩn sau "Show more", và giá trị được HTML-escape.
- **Object / feature:** order/review-and-initiate-fulfillment-portal
- **Quan hệ với canon:** `ADD`
- **Scope:** owner (merchant xem Order details / Edit order); portal
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (tinhpt), 2026-10-26
- **Locator:** Jira TIB-5563 comment 55626, trả lời Q11. Chưa quan sát: TC-29 bị chặn trong lượt staging 2026-10-28. Gần KB-017, CHK-P05, không thay thế. (CCR cũ: CBS-020 CLAIM-05)
- **Trích nguyên văn:**
  ```
  Q11 A — Yes, in the item's "Options" list. It only appears when the store has "show line item properties" on, it is collapsed behind "Show more", and the value is HTML-escaped.
  
  Câu hỏi Q11 (QA, comment 55595): "Does Portal → Order details / Edit order display the raw _customization_id / customization_id value of a line item? — chọn: A) Yes · B) No"
  ```
