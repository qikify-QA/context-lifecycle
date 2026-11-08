### CLAIM-12

- **Statement:** Account còn ở model retired sau ngày shutdown (chỉ xảy ra khi bị ép, vd sửa DB, vì portal từ chối lưu): buyer thấy lỗi generate; không có cảnh báo / CTA cho seller, không tự fallback.
- **Object / feature:** sdk/genai-personalization-runtime
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (storefront) + store owner; storefront · api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chinhdt), 2026-10-15
- **Locator:** Jira TIB-5554, comment 54687, mục Q8 (A: Error + seller warning/CTA · B: Plain failure (as dev limitation) · C: Auto-fallback) | Link: https://ownego.atlassian.net/browse/TIB-5554?focusedCommentId=54687 | Ngày, build: 2026-10-15 | Hành vi HIỆN TẠI dev chấp nhận, KHÔNG phải mong muốn (Phần 4.2); QA từng muốn cảnh báo seller (QA-3403 RQ3). TC-36, TC-47 (sau shutdown) chưa chạy, QA chưa thấy buyer, seller thấy gì (CCR cũ: CBS-028 CLAIM-14)
- **Trích nguyên văn:**
  ```
  Câu hỏi QA, các lựa chọn: A: Error + seller warning/CTA · B: Plain failure (as dev limitation) · C: Auto-fallback
  
  Q8: B. The daily migration moves every account on a retired model, including accounts with no model selected, to its nearest live successor before the shutdown date. An account can only end up on a retired model afterwards if someone forces it back (e.g. a direct DB edit), since the portal save refuses it with 422. In that case the buyer sees the generation error.
  ```

