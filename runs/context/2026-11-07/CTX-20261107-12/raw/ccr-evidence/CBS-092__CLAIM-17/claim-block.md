### CLAIM-17

- **Statement:** Bulk set cùng Option title cho N layer: cho trùng, không tự đánh số; storefront hiện N field cùng tiêu đề.
- **Object / feature:** artwork/MỚI: layer-bulk-edit — Thuộc: modal Bulk edit nhiều layer trong artwork editor (điều kiện selection, tập field chung, touched-only, tri-state, Conditional và Populate trong modal, undo, ghi vào editor); Không thuộc: action bar và menu More (editor-layer-workspace), panel single-layer của từng type (layer-config-*), lưu artwork phía server (artwork-save-persist) (liên quan: sdk)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner / staff (cấu hình) + buyer (form storefront); portal · storefront
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** PO (huyen.chu), 2026-08-28
- **Locator:** Jira TIB-5299, comment 49367 (PO), mục "B5 — Option title trùng, không tự uniquify", xác nhận trên câu trả lời B5 của dev ở comment 49205 | Link: https://ownego.atlassian.net/browse/TIB-5299?focusedCommentId=49367 | Ngày, build: 2026-08-28 | Bổ trợ: TC-30 ⏸️ 2026-10-29 thấy 2 field cùng tiêu đề trên storefront. Key cart 'Your name' / 'Your name 1' chỉ quan sát 1 lần, TC chưa PASS, không đề xuất (CCR cũ: CBS-025 CLAIM-17)
- **Trích nguyên văn:**
  ```
  PO (2026-08-28):
  **B5 — Option title trùng, không tự uniquify**
  Xác nhận giữ nguyên hành vi cũ
  
  Dev (2026-08-27, B5):
  → Không. Hệ thống cho phép trùng, N layer sẽ mang cùng form_label. (Prop :unique-name="false" trong code chỉ liên quan tới id/name của thẻ input trên DOM, không phải uniquify option title.) Trên storefront sẽ ra N form field cùng tiêu đề, không merge. Flow cũ (Bulk edit option title) cũng hành xử đúng như vậy.
  ```
