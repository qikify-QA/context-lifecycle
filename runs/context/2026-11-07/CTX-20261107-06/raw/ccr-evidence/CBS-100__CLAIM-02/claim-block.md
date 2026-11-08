### CLAIM-02

- **Statement:** Known limitation: save global option lỗi → 2 toast: lỗi cụ thể ("Something went wrong! Flux dimension … 4 Megapixel)") + "Failed to save global option." (theo dev: mọi lỗi save trên trang này)
- **Object / feature:** global-option/global-option-instance-management
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff; portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb), kết quả [AI], 2026-10-27
- **Locator:** QA-3435 TC-16 PASS 2026-10-27, staging, build không ghi lại. Known limitation, KHÔNG dùng làm expected. "Mọi lỗi save trên trang này" chỉ theo dev summary 2026-10-26 (CCR cũ: CBS-024 CLAIM-11)
- **Căn cứ expected:** Dev summary chinhdt, Jira TIB-5561 comment 2026-10-26 (Known limitation)
- **Trích nguyên văn:**
  ```
  TC-16 | ✅ AI — T2I GO 4 MP check, two toasts | Flux 2000×2001 → PUT 422, toasts "Failed to save global option." + "Something went wrong! Flux dimension … 4 Megapixel)"; 2000×2000 → 200
  Ngữ cảnh (Dev summary, chinhdt, comment 2026-10-26, Known limitation):
  - When a global option fails to save, two toasts appear: the specific error and a generic "Failed to save global option." This happens for every save error on that page, not only this one.
  ```
