### CLAIM-19

- **Statement:** Quay về model gốc có thể trễ tới 30 phút sau khi provider hồi phục; bộ đếm dùng chung nên một account gửi nhiều lần gọi lỗi có thể chuyển model sang backup cho mọi account opt-in; lần gọi treo không có client timeout chỉ được đếm sau khi TIB-5389 merge; deadline polling của Flux không tính là sập.
- **Object / feature:** sdk/genai-personalization-runtime
- **Quan hệ với canon:** `ADD`
- **Scope:** mọi account opt-in; api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** Dev (chinhdt), 2026-10-15, không ai xác nhận
- **Locator:** Jira TIB-5554, comment 54520 (dev notes Part 2, mục "Known limitation") | Link: https://ownego.atlassian.net/browse/TIB-5554?focusedCommentId=54520 | Ngày, build: 2026-10-15 (ngày dev thêm phần Part 2 vào comment tạo 2026-10-14) (CCR cũ: CBS-028 CLAIM-26)
- **Trích nguyên văn:**
  ```
  - Switching back can lag up to 30 minutes after the provider recovers.
  - The counter is shared, so one account sending many failing calls can switch the model to its backup for all opted-in accounts.
  - A provider call that hangs without a client timeout is only counted once TIB-5389 (read timeouts) is merged. Flux's own polling deadline is not counted as an outage.
  ```

