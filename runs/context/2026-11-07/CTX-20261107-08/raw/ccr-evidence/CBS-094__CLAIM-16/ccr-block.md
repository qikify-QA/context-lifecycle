### CLAIM-16

- **Statement:** Model bị coi là down khi trong cửa sổ 5 phút có ≥ 50 lần gọi lỗi và chiếm ≥ 50% số lần gọi model đó (đếm cả account bật lẫn tắt toggle); chỉ timeout / không phản hồi, 408, 5xx được đếm; 4xx (400, 401, 404, 429) không bao giờ; ngưỡng là biến env `GENAI_FALLBACK_*`.
- **Object / feature:** sdk/genai-personalization-runtime
- **Quan hệ với canon:** `ADD`
- **Scope:** mọi account trên cùng model; api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** Dev (chinhdt), 2026-10-15, không ai xác nhận
- **Locator:** Jira TIB-5554, comment 54520 (dev notes Part 2, mục "When a model counts as down" + thresholds) | Link: https://ownego.atlassian.net/browse/TIB-5554?focusedCommentId=54520 | Ngày, build: 2026-10-15 (ngày dev thêm phần Part 2 vào comment tạo 2026-10-14) | TC-27, 28, 46 chưa chạy. 5 phút, 50 lỗi, 50% là giá trị cấu hình lúc ship (env), không phải hằng số sản phẩm (Phần 4.2) (CCR cũ: CBS-028 CLAIM-23)
- **Trích nguyên văn:**
  ```
  - **When a model counts as down:** one shared counter per provider + model, over all accounts' calls (toggle on or off). Inside a 5-minute window, at least 50 failed calls that are also at least 50% of the calls to that model. Only provider-side errors count: timeout / no response, 408 and 5xx. 4xx such as 400, 401, 404 and 429 (key, access, quota, rate limit) never count.
  - The thresholds are env settings (`GENAI_FALLBACK_WINDOW_SECONDS`, `_MIN_FAILURES`, `_FAILURE_RATE`, `_RETRY_AFTER_SECONDS`, `_INLINE_RETRY_MAX_SECONDS`).
  ```

