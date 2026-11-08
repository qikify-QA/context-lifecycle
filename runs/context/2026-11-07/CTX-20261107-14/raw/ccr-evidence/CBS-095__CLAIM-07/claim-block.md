### CLAIM-07

- **Statement:** Khác biệt có từ trước, TIB-5521 không đổi: API áp placement position của layer "No personalization" đã populated, SDK preview thì không.
- **Object / feature:** artwork/layer-config-image (liên quan: sdk)
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (storefront preview so với order design); api, storefront
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chauptm), 2026-10-26
- **Locator:** Jira TIB-5521 comment 55637 mục Q3, cùng ý Dev summary 2026-10-06. Hành vi hiện tại, không phải expected. QA chưa tái hiện: TC-09 2026-10-26 không thấy khác biệt vị trí; không assert "preview khác design" tới khi có người tái hiện. (CCR cũ: CBS-019 CLAIM-07)
- **Trích nguyên văn:**
  ```
  Câu hỏi (QA): "The API applies the placement position of a populated no-personalization layer but the SDK preview does not — is this preview/design difference accepted for this release?"
  
  Q3 – Dev đề xuất A. Đây là khác biệt có từ trước, ticket này không đụng tới.
  
  Dev summary (chauptm, 2026-10-06):
  **Known difference, not changed by this ticket:** the API applies the placement position of a populated no-personalization layer, the SDK preview does not.
  ```
