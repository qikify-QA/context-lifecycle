### CLAIM-05

- **Statement:** Artwork thumbnail do API render với customization_data rỗng nên layer "No personalization" hiện ảnh mặc định bị kéo giãn (fill).
- **Object / feature:** artwork/layer-config-image
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff; api, portal (danh sách artwork)
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chauptm), 2026-10-26
- **Locator:** Jira TIB-5521 comment 55637 mục Q7. Bổ trợ: TC-22 ✅ 2026-10-26 staging. KB-090 nói về biến thể file thumbnail, không bị thay. (CCR cũ: CBS-019 CLAIM-05)
- **Trích nguyên văn:**
  ```
  Câu hỏi (QA): "Does the artwork thumbnail follow the new rule?"
  
  Q7 – Đồng ý. Thumbnail do API render (ArtworkRenderer → ArtworkAdapter → ArtworkToLayerTransformer) với customization_data rỗng, nên layer dùng ảnh mặc định và bị kéo giãn (fill). Thumbnail cũ chỉ đổi khi save lại.
  ```
