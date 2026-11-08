### CLAIM-17

- **Statement:** Admin > Settings từ chối lưu giá trị sai của `genai_model_retirements` (model / successor lạ, ngày hay `migrated_at` sai, `migrate_at` không trước `shutdown_at`, successor vòng lặp) và `genai_model_fallbacks` (provider / model lạ, backup trùng chính model, user id sai, entry không có `default` lẫn user), kèm danh sách lỗi.
- **Object / feature:** sdk/MỚI: genai-model-settings — Thuộc: cài đặt model GenAI cấp account ở Extras > 3rd-party Services > Gen AI Effects, lưu và Validate key, retirement (migration, email, chặn lưu), toggle auto-switch, Admin > Settings của 2 bảng GenAI; Không thuộc: định tuyến model lúc generate và failover (genai-personalization-runtime), field GenAI service trên layer (artwork/layer-config-image)
- **Quan hệ với canon:** `ADD`
- **Scope:** admin; api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** Dev (chinhdt), 2026-10-14, không ai xác nhận
- **Locator:** Jira TIB-5554, comment 54520 (mục "Admin > Settings" ở cả Part 1 và Part 2) | Link: https://ownego.atlassian.net/browse/TIB-5554?focusedCommentId=54520 | Ngày, build: 2026-10-14 (phần Part 2 sửa 2026-10-15) | TC-23, 24, 39, 42 chưa chạy, QA không có quyền Admin. CCR cũ ghi object chưa rõ vì registry không có object cho Admin; tạm đặt theo Phần 1b (CCR cũ: CBS-028 CLAIM-17)
- **Trích nguyên văn:**
  ```
  - **Admin > Settings:** an invalid `genai_model_retirements` value (unknown model or successor, bad date or `migrated_at`, `migrate_at` not before `shutdown_at`, successor cycle) is refused on save, with the list of problems.
  - **Admin > Settings:** an invalid `genai_model_fallbacks` value (unknown provider or model, backup equal to the model itself, bad user id, entry with neither a `default` nor a user) is refused on save, with the list of problems.
  ```
