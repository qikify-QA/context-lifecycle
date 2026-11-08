### CLAIM-14

- **Statement:** API lưu Gen AI Effects không kiểm tra giá trị model: id lạ (`gpt-image-999`), chuỗi `<script>…</script>`, chuỗi SQL/NoSQL đều trả 200 và được lưu nguyên văn; chuỗi rỗng được thay bằng model mặc định. Là hành vi hiện tại, không phải expected.
- **Object / feature:** sdk/MỚI: genai-model-settings — Thuộc: cài đặt model GenAI cấp account ở Extras > 3rd-party Services > Gen AI Effects, lưu và Validate key, retirement (migration, email, chặn lưu), toggle auto-switch, Admin > Settings của 2 bảng GenAI; Không thuộc: định tuyến model lúc generate và failover (genai-personalization-runtime), field GenAI service trên layer (artwork/layer-config-image)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner; api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chinhdt), 2026-10-15
- **Locator:** Jira TIB-5554, comment 54687, mục Q5 ("The Gen AI Effects save still stores junk `gpt_model` values with HTTP 200. Does this ticket also reject unknown models with 4xx?") | Link: https://ownego.atlassian.net/browse/TIB-5554?focusedCommentId=54687 | Ngày, build: 2026-10-15 | Hành vi HIỆN TẠI dev chấp nhận, KHÔNG phải mong muốn, không dùng làm expected kiểu phải trả 200 hay phải lưu (Phần 4.2). QA từng muốn 4xx (QA-3403 RQ2). Bổ trợ: TC-37, TC-41 ⏭️ 2026-10-16 giữ quan sát id lạ, script, chuỗi SQL/NoSQL lưu nguyên văn với 200; chuỗi rỗng lưu thành model mặc định; không có HTTP 500 (CCR cũ: CBS-028 CLAIM-13)
- **Trích nguyên văn:**
  ```
  Câu hỏi QA: "The Gen AI Effects save still stores junk `gpt_model` values with HTTP 200. Does this ticket also reject unknown models with 4xx?"
  
  Q5: No. Unknown model values have never been rejected on save, and this ticket does not change that, so this case can be skipped here.
  ```
