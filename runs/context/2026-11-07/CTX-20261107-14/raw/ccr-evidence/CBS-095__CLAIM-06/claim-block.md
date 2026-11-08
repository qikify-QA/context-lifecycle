### CLAIM-06

- **Statement:** Linked copy ("Duplicate & Link") của photo layer "No personalization" dùng box, flip, rotate của chính nó, lấy ảnh, retrieval value, photo border, shadow từ layer gốc và không áp mask, color, cropper (API mask_enable = false; SDK xoá photo_editor, enable_cropper, masked_*, effects).
- **Object / feature:** artwork/layer-duplicate-link-copy (liên quan: sdk)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff (cấu hình) + buyer (preview, order design); api, storefront, portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chauptm), 2026-10-26
- **Locator:** Jira TIB-5521 comment 55637 mục Q6. Bổ trợ: TC-12/13/14/15 ✅ 2026-10-26 staging. Liên quan, không bị thay: KB-045, KB-429; CHK-006 (OQ-artwork-081) vẫn NEEDS_CONFIRMATION. (CCR cũ: CBS-019 CLAIM-06)
- **Trích nguyên văn:**
  ```
  Câu hỏi (QA): "Linked copy of a no-personalization layer: after the fix, does it take mask / color / cropper from the origin, from itself, or ignore them?"
  
  Q6 – C, không áp dụng. API luôn để mask_enable = false và không dùng color hay cropper. SDK xoá photo_editor, enable_cropper, masked_*, effects. Bản link lấy box, flip, rotate của chính nó. Ảnh, retrieval value, photo border và shadow lấy từ layer gốc.
  ```
