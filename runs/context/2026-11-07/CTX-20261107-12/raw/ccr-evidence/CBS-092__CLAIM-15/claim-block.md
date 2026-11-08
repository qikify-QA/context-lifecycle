### CLAIM-15

- **Statement:** Một lần Save của Bulk edit (settings + Conditional) = đúng 1 undo step: Undo 1 lần hoàn tác hết cho mọi layer, Redo khôi phục hết.
- **Object / feature:** artwork/MỚI: layer-bulk-edit — Thuộc: modal Bulk edit nhiều layer trong artwork editor (điều kiện selection, tập field chung, touched-only, tri-state, Conditional và Populate trong modal, undo, ghi vào editor); Không thuộc: action bar và menu More (editor-layer-workspace), panel single-layer của từng type (layer-config-*), lưu artwork phía server (artwork-save-persist)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner / staff; portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb), 2026-10-30, kết quả AI do máy chạy
- **Locator:** QA-3419 — TC-28 trong `result_QA-3419_retest3-regression_2026-10-30.md` (cũng ✅ 2026-10-24, 2026-10-29) | Link: https://qa-hub.ownego.com/test-cases?task=TIB-059 | Ngày, build: 2026-10-30. Build `assets/index.BMgdZMSW.js`. (CCR cũ: CBS-025 CLAIM-15)
- **Căn cứ expected:** PO huyen.chu, comment 49367, 2026-08-28 (C1): "Gộp lại thành **đúng 1 undo step** cho mọi trường hợp, kể cả khi có đụng Conditional Setting. Undo 1 lần phải hoàn tác toàn bộ thay đổi trong 1 lượt bulk edit — tránh user undo tưởng đã hoàn tác hết nhưng Conditional vẫn còn."
- **Trích nguyên văn:**
  ```
  TC-28 | ✅ AI — one Undo reverts title + rule, Redo restores | T1 + T2: Option title "U1" + rule "B is any of 1" → Save → form preview T1 "U1", T2 "U1" → Undo once → T1 hidden again (old rule A = 2), T2 "Mix" → Redo → "U1" / "U1" → Undo → Save & Close → T1 / T2 = pre-edit snapshot (titles + dependencies)
  ```
