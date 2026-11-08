### CLAIM-08

- **Statement:** "Personalization for this layer" là radio 3 lựa chọn (No personalization / Create a new option / Use an existing global option) KHÔNG có "No change": mở ra không chọn gì = không ghi; đã chọn thì chỉ Cancel mới quay lại được. Lệch với quyết định A2 của PO (đòi tri-state); dev hỏi lại PO 2026-10-28, chưa có trả lời.
- **Object / feature:** artwork/MỚI: layer-bulk-edit — Thuộc: modal Bulk edit nhiều layer trong artwork editor (điều kiện selection, tập field chung, touched-only, tri-state, Conditional và Populate trong modal, undo, ghi vào editor); Không thuộc: action bar và menu More (editor-layer-workspace), panel single-layer của từng type (layer-config-*), lưu artwork phía server (artwork-save-persist)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner / staff; portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (tuanva), 2026-10-28
- **Locator:** Jira TIB-5299, comment 55846, mục "A2 — tri-state cho 3 toggle" | Link: https://ownego.atlassian.net/browse/TIB-5299?focusedCommentId=55846 | Ngày, build: 2026-10-28 | KHÔNG đề xuất check assert 'không có No change' là đúng (Phần 4.2): hành vi hiện tại lệch quyết định A2 của PO, PO chưa trả lời dev (PENDING-02). Bổ trợ: TC-15 ✅ 2026-10-29 build index.BFN2fMjC.js, field phụ thuộc chỉ hiện sau khi chọn Personalization, khớp CHK-016 (CCR cũ: CBS-025 CLAIM-08)
- **Trích nguyên văn:**
  ```
  Riêng "Personalization for this layer" QA vừa phát hiện vẫn là radio thường, không có lựa chọn "No change" — lý do kỹ thuật là nó vốn là radio 3 lựa chọn (No personalization / Create a new option / Use existing global option), không phải toggle on-off nên không áp tri-state y hệt 2 field kia được. Hành vi hiện tại: mở ra không chọn gì thì Save không ghi đè gì (về chức năng đã = "No change"), chỉ là UI chưa có nhãn đó thôi.
  
  Chị xác nhận giúp mình: giữ nguyên radio-rỗng-là-no-change như vậy, hay cần đổi UI thành tri-state thật cho khớp A2 ạ? (đang để QA-3419 PENDING-02 chờ chị)
  ```
