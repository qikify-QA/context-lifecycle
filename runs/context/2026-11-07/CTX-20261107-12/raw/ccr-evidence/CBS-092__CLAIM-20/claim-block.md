### CLAIM-20

- **Statement:** Selection không có setting chung → modal hiện empty state "No settings are shared across the selected layers"; mục Bulk edit trên menu vẫn bật.
- **Object / feature:** artwork/MỚI: layer-bulk-edit — Thuộc: modal Bulk edit nhiều layer trong artwork editor (điều kiện selection, tập field chung, touched-only, tri-state, Conditional và Populate trong modal, undo, ghi vào editor); Không thuộc: action bar và menu More (editor-layer-workspace), panel single-layer của từng type (layer-config-*), lưu artwork phía server (artwork-save-persist)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner / staff; portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** PO (huyen.chu), 2026-08-28
- **Locator:** Jira TIB-5299, comment 49367, mục "B4 — Selection không có setting chung" | Link: https://ownego.atlassian.net/browse/TIB-5299?focusedCommentId=49367 | Ngày, build: 2026-08-28 | QA không tái hiện được với dữ liệu thật (TC-22 ⏸️ 2026-10-29, 2026-10-30); chuỗi chỉ thấy trong bundle (artwork_editor.bulk_edit_empty). Vế 'mục menu vẫn bật' chỉ có ở dev summary 49895, PO không nói. 'Save bị disable' (dev summary) chưa ai thấy (CCR cũ: CBS-025 CLAIM-20)
- **Trích nguyên văn:**
  ```
  **B4 — Selection không có setting chung**
  Thêm empty state: *"No settings are shared across the selected layers”*
  ```
