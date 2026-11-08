# CBS-091 CLAIM-02 — block nguyên văn từ Proposal (get_proposal 2026-11-07)

### CLAIM-02

- **Statement:** Effect Gen AI trên layer Direct upload hoặc Cropper: hai layer khác kích thước thì gọi riêng, mỗi call trừ 1 lượt.
- **Object / feature:** artwork/populate-values (liên quan: sdk)
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (storefront); storefront, api
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (giangnth), 2026-10-27
- **Locator:** Jira TIB-5577 comment giangnth (QA ghi id 55689). Quote nói chung cho layer Direct upload / Cropper, không giới hạn Gen AI; giới hạn Gen AI đến từ lời sửa 2026-10-29 không có link. Bổ trợ: QA-3434 TC-14 ✅ 2026-10-29 staging, SDK app-v1.js Last-Modified 2026-10-29 01:58:10 GMT, chỉ Gemini trên Direct upload, chưa có Cropper; chưa chạy lại trên build 2026-10-29 08:21:05 GMT. Tên field size trong body derive không phải hợp đồng API. (CCR cũ: CBS-021 CLAIM-02)
- **Trích nguyên văn:**
  ```
  Câu hỏi (QA phuongbb, 2026-10-26): "Q2. "Same effect on the same photo shares one call": does "same effect" mean
  the same effect type only, or the same type **and** the same settings (prompt / ImagenHub template / colour / size)?"
  
  "...and the layer size for Direct upload / Cropper layers. Two layers with different sizes get separate calls and
  separate charges."
  ```
