### CLAIM-17

- **Statement:** Flux width × height > 4,000,000 trên layer Multiple Uploads / Text to Image → server từ chối khi save artwork; biên là ≤ (2000×2000 lưu được); check trên mọi đường save (portal/REST và MCP). Portal không check trước, lỗi về từ server sau khi bấm Save, editor vẫn mở
- **Object / feature:** artwork/layer-config-image (liên quan: global-option)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff + client API/MCP; portal · api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chinhdt), 2026-10-27
- **Locator:** Jira TIB-5561 comment 55697 mục Q4 (biên), Q7 (đường save); phần portal không check trước theo dev summary 2026-10-26. Bổ trợ TC-15, TC-31 PASS 2026-10-27. Chỉ chữ thông báo chờ PO (xem CLAIM-10), biên ≤ thì không (CCR cũ: CBS-024 CLAIM-08)
- **Trích nguyên văn:**
  ```
  - **Q4:** The boundary is ≤ (2000×2000 passes). "must be less than" is the existing Single upload message, reused unchanged. Agree with "must not exceed 4.000.000 px (4 Megapixel)". This also changes the Single upload message. **PO to confirm.**
  - **Q7:** Partly.
    - The 4 MP limit is checked on every save path: portal/REST and MCP, for both artworks and global options.
  Ngữ cảnh (Dev summary, chinhdt, comment 2026-10-26, Known limitation):
  - The portal does not check the 4 MP limit before saving. The error comes from the server after Save is clicked.
  ```
