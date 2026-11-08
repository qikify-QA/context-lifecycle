### CLAIM-21

- **Statement:** Known limitation: field cùng tên nhưng khác kiểu giữa các layer type bị loại khỏi modal, không có thông báo.
- **Object / feature:** artwork/MỚI: layer-bulk-edit — Thuộc: modal Bulk edit nhiều layer trong artwork editor (điều kiện selection, tập field chung, touched-only, tri-state, Conditional và Populate trong modal, undo, ghi vào editor); Không thuộc: action bar và menu More (editor-layer-workspace), panel single-layer của từng type (layer-config-*), lưu artwork phía server (artwork-save-persist)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner / staff; portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** Dev (tuanva), 2026-09-04, không ai xác nhận
- **Locator:** Jira TIB-5299, comment 49895 (dev summary), mục "Known limitations"; câu hỏi QA PENDING-04 chưa có trả lời | Link: https://ownego.atlassian.net/browse/TIB-5299?focusedCommentId=49895 | Ngày, build: 2026-09-04 (ngày comment) | Chỉ có trong dev summary, câu hỏi QA PENDING-04 chưa ai trả lời, QA chưa thử (Phần 4.2) (CCR cũ: CBS-025 CLAIM-21)
- **Trích nguyên văn:**
  ```
  Field cùng tên nhưng khác kiểu (type) giữa các layer type sẽ bị loại khỏi modal âm thầm, không có thông báo.
  ```
