### CLAIM-17

- **Statement:** Lần gọi làm model chuyển sang down được thử lại 1 lần trên backup trong cùng job nếu lỗi trong 60 s; 30 phút sau khi down, 1 request thử lại model gốc (thành công → mọi account opt-in quay về; lỗi → giữ backup thêm 30 phút); backup cũng lỗi → lỗi của backup, không có backup thứ hai; toggle OFF hoặc model không có backup → lỗi provider như cũ (vẫn được đếm).
- **Object / feature:** sdk/genai-personalization-runtime
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer + store owner opt-in; api · storefront
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** Dev (chinhdt), 2026-10-15, không ai xác nhận
- **Locator:** Jira TIB-5554, comment 54520 (dev notes Part 2, mục "While a model is down", "Recovery", "Toggle off, or no backup", "Backup also fails") | Link: https://ownego.atlassian.net/browse/TIB-5554?focusedCommentId=54520 | Ngày, build: 2026-10-15 (ngày dev thêm phần Part 2 vào comment tạo 2026-10-14) | TC-26, 29, 30, 31, 45 chưa chạy. 60 s, 30 phút là giá trị cấu hình lúc ship, không phải hằng số sản phẩm (Phần 4.2) (CCR cũ: CBS-028 CLAIM-24)
- **Trích nguyên văn:**
  ```
  - The call that tipped the model into "down" is retried once on the backup in the same job, if it failed within 60s.
  - **Recovery:** 30 minutes after the model went down, one request tries the original model again. Success switches every opted-in account back; another outage error keeps the backup for another 30 minutes.
  - **Toggle off, or no backup for that model:** behaves as before. The call fails with the provider error; it still counts towards the shared counter.
  - **Backup also fails:** the call fails with the backup's error. There is no second backup.
  ```

