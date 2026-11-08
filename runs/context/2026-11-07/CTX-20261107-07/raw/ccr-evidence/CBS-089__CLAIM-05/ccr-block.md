### CLAIM-05

- **Statement:** "từ ngày migrate" tính từ 00:00 UTC của `migrate_at` (cùng giờ job migration chạy), áp cho quy tắc lưu, model mặc định và Validate key.
- **Object / feature:** sdk/MỚI: genai-model-settings — Thuộc: cài đặt model GenAI cấp account ở Extras > 3rd-party Services > Gen AI Effects, lưu và Validate key, retirement (migration, email, chặn lưu), toggle auto-switch, Admin > Settings của 2 bảng GenAI; Không thuộc: định tuyến model lúc generate và failover (genai-personalization-runtime), field GenAI service trên layer (artwork/layer-config-image)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner; api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chinhdt), 2026-10-15
- **Locator:** Jira TIB-5554, comment 54687, mục Q11 ("Which timezone defines 'from the migrate date': UTC or server timezone?") | Link: https://ownego.atlassian.net/browse/TIB-5554?focusedCommentId=54687 | Ngày, build: 2026-10-15 | 'ok' là dev đồng ý đề xuất UTC của QA, kèm câu khẳng định riêng của dev (CCR cũ: CBS-028 CLAIM-04)
- **Trích nguyên văn:**
  ```
  ok Q11. `migrate_at` starts at 00:00 UTC, the same time the daily migration runs.
  Câu hỏi QA (comment 54670, 2026-10-15) mà "ok" đồng ý: "Which timezone defines 'from the migrate date' for the save rule, the default model and Validate key — UTC like the 00:00 cron, or the server timezone? — QA đề xuất: UTC"
  ```
