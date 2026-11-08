### CLAIM-15

- **Statement:** Trạng thái "down" dùng một bộ đếm chung cho mọi account trên cùng provider + model; lỗi `model_not_found` (GPT trả khi key không có quyền dùng model) không bao giờ được đếm.
- **Object / feature:** sdk/genai-personalization-runtime
- **Quan hệ với canon:** `ADD`
- **Scope:** mọi account trên cùng model; api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chinhdt), 2026-10-15
- **Locator:** Jira TIB-5554, comment 54687, mục Q7 | Link: https://ownego.atlassian.net/browse/TIB-5554?focusedCommentId=54687 | Ngày, build: 2026-10-15 | Số ngưỡng ở claim liên quan là giá trị cấu hình lúc ship (CCR cũ: CBS-028 CLAIM-22)
- **Trích nguyên văn:**
  ```
  Q7: Dev will simulate the provider errors on staging and add a backup mapping for QA's own user only (per-user override in `genai_model_fallbacks`). The failure counter is still shared by all accounts on that model. `model_not_found` is never counted: GPT returns it when the key has no access to the model, which a backup on the same key would not fix.
  ```

