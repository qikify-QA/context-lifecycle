### CLAIM-07

- **Statement:** Sau một lượt chạy đầy đủ không lỗi, entry retirement được đặt `migrated_at` và các lượt sau bỏ qua nó; lượt có account lỗi, `--dry-run` hay `--user-id` không đặt, lượt sau thử lại. Known limitation: đã có `migrated_at` thì account bị ép về model retired ngoài portal (vd sửa DB) không bị chuyển lại; account đã migrate không nhận email lần hai khi successor bị khai tử sau, trừ khi lần khai tử đó chuyển nó tiếp.
- **Object / feature:** sdk/MỚI: genai-model-settings — Thuộc: cài đặt model GenAI cấp account ở Extras > 3rd-party Services > Gen AI Effects, lưu và Validate key, retirement (migration, email, chặn lưu), toggle auto-switch, Admin > Settings của 2 bảng GenAI; Không thuộc: định tuyến model lúc generate và failover (genai-personalization-runtime), field GenAI service trên layer (artwork/layer-config-image)
- **Quan hệ với canon:** `ADD`
- **Scope:** admin / dev (vận hành migration) + store owner; api · db
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** Dev (chinhdt), 2026-10-14, không ai xác nhận
- **Locator:** Jira TIB-5554, comment 54520 (dev notes Part 1, mục "Behaviour changes" + "Known limitation") | Link: https://ownego.atlassian.net/browse/TIB-5554?focusedCommentId=54520 | Ngày, build: 2026-10-14 | TC-09, 12, 13, 17 chưa chạy; QA không có quyền Admin, dev không chia sẻ migrated_at (CCR cũ: CBS-028 CLAIM-06)
- **Trích nguyên văn:**
  ```
  - **After a clean full run**, the retirement entry gets a `migrated_at` date in Admin > Settings and later runs skip it, so nobody is emailed twice. A run with failed accounts, `--dry-run` or `--user-id` does not set it, and the next run retries.
  
  **Known limitation**
  
  - After an entry has `migrated_at`, the daily run no longer looks at it. An account set back to a retired model outside the portal (e.g. directly in the DB) fails to generate and is not moved again. To re-run an edited entry, remove its `migrated_at`.
  - Migrated accounts do not get a second email when the successor itself is retired later. They get a new email only when the later retirement moves them again.
  ```
