### CLAIM-04

- **Statement:** Known limitation: global option đã lưu từ trước với Flux > 4 MP sẽ báo lỗi 4 MP ở lần save tiếp theo cho tới khi giảm size
- **Object / feature:** global-option/global-option-instance-management
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff; portal · api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** Dev (chinhdt) tự viết trong dev summary, 2026-10-26; không phải trả lời xác nhận
- **Locator:** Jira TIB-5561 dev summary 2026-10-26 mục Known limitation (không có comment id). QA chưa kiểm GO cũ. Known limitation, KHÔNG dùng làm expected (CCR cũ: CBS-024 CLAIM-21)
- **Trích nguyên văn:**
  ```
  - Global options already saved with a Flux size over 4 MP will show this error on their next save until the size is reduced.
  ```
