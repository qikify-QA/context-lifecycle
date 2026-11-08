### CLAIM-16

- **Statement:** Không có email báo trước (advance notice) trước ngày cắt; chỉ có email xác nhận sau khi đổi model.
- **Object / feature:** sdk/MỚI: genai-model-settings — Thuộc: cài đặt model GenAI cấp account ở Extras > 3rd-party Services > Gen AI Effects, lưu và Validate key, retirement (migration, email, chặn lưu), toggle auto-switch, Admin > Settings của 2 bảng GenAI; Không thuộc: định tuyến model lúc generate và failover (genai-personalization-runtime), field GenAI service trên layer (artwork/layer-config-image)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner; api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chinhdt), 2026-10-15
- **Locator:** Jira TIB-5554, comment 54687, mục Q13 | Link: https://ownego.atlassian.net/browse/TIB-5554?focusedCommentId=54687 | Ngày, build: 2026-10-15 | 'ok' là dev đồng ý đề xuất của QA (CCR cũ: CBS-028 CLAIM-16)
- **Trích nguyên văn:**
  ```
  > **Q13.** The spec mentions an advance notice before the cutoff. Is that part of this ticket?
  
  ok Q13
  Đề xuất của QA mà "ok" đồng ý (comment 54670, 2026-10-15): "QA đề xuất: Out of scope here (only the post-switch email is implemented)"
  ```
