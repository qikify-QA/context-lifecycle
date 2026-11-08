### CLAIM-22

- **Statement:** Bulk edit không có design settings font / color / size; yêu cầu bulk font, color, size nằm ngoài scope của PR này.
- **Object / feature:** artwork/MỚI: layer-bulk-edit — Thuộc: modal Bulk edit nhiều layer trong artwork editor (điều kiện selection, tập field chung, touched-only, tri-state, Conditional và Populate trong modal, undo, ghi vào editor); Không thuộc: action bar và menu More (editor-layer-workspace), panel single-layer của từng type (layer-config-*), lưu artwork phía server (artwork-save-persist)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner / staff; portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (tuanva), 2026-08-27
- **Locator:** Jira TIB-5299, comment 49205, mục C5 (trả lời câu QA "Có gì được tuyên bố out of scope (ví dụ: bulk edit design settings như font/color/size …)?") | Link: https://ownego.atlassian.net/browse/TIB-5299?focusedCommentId=49205 | Ngày, build: 2026-08-27 | Statement cố ý chỉ giữ vế không có font / color / size theo lưu ý của CCR cũ; vế 'Design settings chỉ gồm text, clipart, grouped_clipart, default_value' lệch với CLAIM-14 nên không đề xuất (CCR cũ: CBS-025 CLAIM-22)
- **Trích nguyên văn:**
  ```
  Câu hỏi QA: "Có gì được tuyên bố out of scope (ví dụ: bulk edit design settings như font/color/size …)?"
  
  → Out of scope trong PR này: bulk edit Design settings kiểu font / color / size. Panel "Design settings" của bulk hiện chỉ gồm text, clipart, grouped_clipart, default_value (bulkSchema.js:17). Yêu cầu bulk font/color/size mà khách nêu ở TIB-5028 chưa nằm trong scope này.
  ```
