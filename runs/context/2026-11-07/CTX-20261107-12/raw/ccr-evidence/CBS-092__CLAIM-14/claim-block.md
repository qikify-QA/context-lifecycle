### CLAIM-14

- **Statement:** Chọn 2 layer vector category, modal (sau "Create a new option") có "Select one vector category" + "Vector category's default value".
- **Object / feature:** artwork/MỚI: layer-bulk-edit — Thuộc: modal Bulk edit nhiều layer trong artwork editor (điều kiện selection, tập field chung, touched-only, tri-state, Conditional và Populate trong modal, undo, ghi vào editor); Không thuộc: action bar và menu More (editor-layer-workspace), panel single-layer của từng type (layer-config-*), lưu artwork phía server (artwork-save-persist)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner / staff; portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb), 2026-10-22, kết quả AI do máy chạy
- **Locator:** QA-3419 — TC-26 trong `result_QA-3419_run1_2026-10-22.md` (chỉ phần field có mặt; reset chưa chạy) | Link: https://qa-hub.ownego.com/test-cases?task=TIB-059 | Ngày, build: 2026-10-22. Build `assets/index.BqS1iTCG.js`. | Chỉ kiểm field CÓ MẶT, chưa kiểm reset default khi đổi category; build cũ. Lệch nguồn, giữ cả hai phía: dev C5 2026-08-27 liệt kê Design settings không có vector; PENDING-01 chưa ai trả lời, 'PENDING-01 answered' trong kết quả TC là suy luận của QA. Liên quan layer-config-vector (CCR cũ: CBS-025 CLAIM-14)
- **Căn cứ expected:** KHÔNG CÓ
- **Trích nguyên văn:**
  ```
  TC-26 | ✅ AI — vector category field present | V1 + V2 → Create a new option → Design settings "Select one vector category" + "Vector category's default value" | PENDING-01 answered: vector in scope. Reset not run
  Phía bên kia (dev tuanva, comment 49205, 2026-08-27, C5): "Panel "Design settings" của bulk hiện chỉ gồm text, clipart, grouped_clipart, default_value (bulkSchema.js:17)."
  ```
