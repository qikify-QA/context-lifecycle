### CLAIM-11

- **Statement:** Generate chỉ đọc model trong `private_config` của store owner; artwork và layer không lưu model; migration và email chỉ áp cho store owner, staff không nhận.
- **Object / feature:** sdk/genai-personalization-runtime
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner + staff + buyer (generate dùng model của owner); api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chinhdt), 2026-10-15
- **Locator:** Jira TIB-5554, comment 54687, mục Q12 | Link: https://ownego.atlassian.net/browse/TIB-5554?focusedCommentId=54687 | Ngày, build: 2026-10-15 (CCR cũ: CBS-028 CLAIM-03)
- **Trích nguyên văn:**
  ```
  Q12: Generation reads only the store owner's `private_config` model; artworks and layers do not store a model. The migration and the email go to the store owner only; staff accounts do not receive it.
  ```

