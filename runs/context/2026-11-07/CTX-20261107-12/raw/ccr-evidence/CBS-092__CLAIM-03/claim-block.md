### CLAIM-03

- **Statement:** Selection có layer replica Global Template: cờ `canMutate` (có từ trước) chặn Group / Duplicate / Delete — action bar thu gọn; ticket chỉ bỏ cờ này khỏi riêng mục Bulk edit.
- **Object / feature:** artwork/editor-layer-workspace
- **Quan hệ với canon:** `CONTRADICTS KB-042`
- **Scope:** store owner / staff; portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (tuanva), 2026-10-28
- **Locator:** Jira TIB-5299, comment 55846, mục "C3 — loại replica khỏi selection cho phép bulk edit" (dev trả lời PO sau khi QA báo bug TC-05) | Link: https://ownego.atlassian.net/browse/TIB-5299?focusedCommentId=55846 | Ngày, build: 2026-10-28 | Bổ trợ: QA 2026-10-23 trên build trước fix thấy T1 + R1 action bar thu gọn (no Group / Copy / Duplicate / Delete); chưa đọc lại action bar trên build cuối. Sample của KB-042 không có replica nên có thể chỉ khác scope. CHK-006 (READY) cùng expected với KB-042. Giữ cả hai phía (CCR cũ: CBS-025 CLAIM-03)
- **Trích nguyên văn:**
  ```
  Trước đó logic loại replica khỏi tập editable đã đúng như chị yêu cầu, nhưng entry "Bulk edit" trên menu vẫn bị 1 cờ khác (canMutate, có từ trước PR này, dùng chặn group/duplicate/delete) ẩn hẳn khi selection lẫn layer replica — nên chọn layer thường + replica không mở được Bulk edit luôn (đúng y bug QA báo). Đã bỏ cờ đó khỏi riêng entry Bulk edit, giờ chọn layer thường + replica vẫn mở Bulk edit được, chỉ layer thường bị sửa, replica vẫn giữ nguyên.
  ```
