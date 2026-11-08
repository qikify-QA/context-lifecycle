### CLAIM-05

- **Statement:** Modal "Bulk edit" rộng 620 px: "1 layer selected" / "N layers selected", mô tả "Only settings available to all selected layers are shown.", footer "Any changes will override existing values" (không có dấu chấm), nút Cancel / Save, accordion panel đầu tiên mở sẵn.
- **Object / feature:** artwork/MỚI: layer-bulk-edit — Thuộc: modal Bulk edit nhiều layer trong artwork editor (điều kiện selection, tập field chung, touched-only, tri-state, Conditional và Populate trong modal, undo, ghi vào editor); Không thuộc: action bar và menu More (editor-layer-workspace), panel single-layer của từng type (layer-config-*), lưu artwork phía server (artwork-save-persist)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner / staff; portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb), 2026-10-30, kết quả AI do máy chạy
- **Locator:** QA-3419 — TC-07, TC-08 trong `result_QA-3419_retest3-regression_2026-10-30.md` | Link: https://qa-hub.ownego.com/test-cases?task=TIB-059 | Ngày, build: 2026-10-30. Build `assets/index.BMgdZMSW.js`. | Footer không có dấu chấm cuối. 620 px là giá trị dev summary nêu (CCR cũ: CBS-025 CLAIM-05)
- **Căn cứ expected:** KHÔNG CÓ
- **Trích nguyên văn:**
  ```
  TC-07 | ✅ AI — header, description, footer, buttons, first panel open | T1 + T2 + T3 → "Bulk edit 3 layers selected", "Only settings available to all selected layers are shown.", footer "Any changes will override existing values", buttons Cancel / Save, DESIGN SETTINGS expanded, modal 620 px | Footer still without final period
  TC-08 | ✅ AI — singular count | T1 alone → "Bulk edit 1 layer selected"
  ```
