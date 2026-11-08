### CLAIM-10

- **Statement:** Câu báo model Gemini retired: "Nano Banana (Gemini 2.5 Flash) has been retired. Select Nano Banana 2 (Gemini 3.1 Flash) or another model."; tên model phía API khớp nhãn portal (không có hậu tố "Image") và dùng y như vậy trong email migration.
- **Object / feature:** sdk/MỚI: genai-model-settings — Thuộc: cài đặt model GenAI cấp account ở Extras > 3rd-party Services > Gen AI Effects, lưu và Validate key, retirement (migration, email, chặn lưu), toggle auto-switch, Admin > Settings của 2 bảng GenAI; Không thuộc: định tuyến model lúc generate và failover (genai-personalization-runtime), field GenAI service trên layer (artwork/layer-config-image)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner; api · portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chinhdt), 2026-10-15
- **Locator:** Jira TIB-5554, comment 54687, mục Q4 ("Exact 422 toast for a retired Gemini model?") | Link: https://ownego.atlassian.net/browse/TIB-5554?focusedCommentId=54687 | Ngày, build: 2026-10-15 | Bổ trợ: TC-22 ✅ 2026-10-16 thấy cùng câu trong response Validate key. Câu trong toast 422 và trong email chưa thấy trực tiếp (CCR cũ: CBS-028 CLAIM-09)
- **Trích nguyên văn:**
  ```
  Câu hỏi QA: "Exact 422 toast for a retired Gemini model?"
  
  Q4: *"Nano Banana (Gemini 2.5 Flash) has been retired. Select Nano Banana 2 (Gemini 3.1 Flash) or another model."* The API model names are aligned with the portal labels (no "Image" suffix); the same names appear in the migration email.
  ```
