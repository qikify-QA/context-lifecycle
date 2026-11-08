### CLAIM-12

- **Statement:** Trước ngày migrate vẫn chọn và lưu được model retired (200); lưu mà giữ nguyên model đã lưu (kể cả model retired) trả 200.
- **Object / feature:** sdk/MỚI: genai-model-settings — Thuộc: cài đặt model GenAI cấp account ở Extras > 3rd-party Services > Gen AI Effects, lưu và Validate key, retirement (migration, email, chặn lưu), toggle auto-switch, Admin > Settings của 2 bảng GenAI; Không thuộc: định tuyến model lúc generate và failover (genai-personalization-runtime), field GenAI service trên layer (artwork/layer-config-image)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner; api · portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chinhdt), 2026-10-15
- **Locator:** Jira TIB-5554, comment 54687, mục Q10 | Link: https://ownego.atlassian.net/browse/TIB-5554?focusedCommentId=54687 | Ngày, build: 2026-10-15 | 'ok' là dev đồng ý đề xuất của QA, không có PO. TC-04 (trước ngày migrate) ⏸️ 2026-10-16 inconclusive, không chứng minh được phía này (CCR cũ: CBS-028 CLAIM-11)
- **Trích nguyên văn:**
  ```
  > **Q10.** Dev keeps 200 before the migrate date and for an unchanged stored model. Accept?
  
  ok Q10
  ```
