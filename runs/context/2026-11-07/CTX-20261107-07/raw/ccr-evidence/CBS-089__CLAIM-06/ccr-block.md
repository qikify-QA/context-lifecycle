### CLAIM-06

- **Statement:** Lượt chạy `genai:migrate-retired-models --user-id` không đặt `migrated_at` nên chạy lại được; khi `migrate_at` đã tới, quy tắc lưu và model mặc định áp cho mọi account, không chỉ account trong lượt chạy.
- **Object / feature:** sdk/MỚI: genai-model-settings — Thuộc: cài đặt model GenAI cấp account ở Extras > 3rd-party Services > Gen AI Effects, lưu và Validate key, retirement (migration, email, chặn lưu), toggle auto-switch, Admin > Settings của 2 bảng GenAI; Không thuộc: định tuyến model lúc generate và failover (genai-personalization-runtime), field GenAI service trên layer (artwork/layer-config-image)
- **Quan hệ với canon:** `ADD`
- **Scope:** admin / dev (vận hành migration); api · db
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chinhdt), 2026-10-15
- **Locator:** Jira TIB-5554, comment 54687, mục Q2 | Link: https://ownego.atlassian.net/browse/TIB-5554?focusedCommentId=54687 | Ngày, build: 2026-10-15 (CCR cũ: CBS-028 CLAIM-05)
- **Trích nguyên văn:**
  ```
  ok Q2. Note: a run with `--user-id` does not stamp `migrated_at`, so it can be repeated. While `migrate_at` is set to today, the save rule and the default model apply to every account on staging, not only the ones in the run.
  ```
