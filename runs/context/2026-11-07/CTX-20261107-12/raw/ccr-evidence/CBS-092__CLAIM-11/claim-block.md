### CLAIM-11

- **Statement:** Layer Artwork 1.0: modal không có "Personalization for this layer" và "Use an existing global option" (2 field chỉ có ở schema 2.0); các field chung khác vẫn có.
- **Object / feature:** artwork/MỚI: layer-bulk-edit — Thuộc: modal Bulk edit nhiều layer trong artwork editor (điều kiện selection, tập field chung, touched-only, tri-state, Conditional và Populate trong modal, undo, ghi vào editor); Không thuộc: action bar và menu More (editor-layer-workspace), panel single-layer của từng type (layer-config-*), lưu artwork phía server (artwork-save-persist)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner / staff (artwork schema 1); portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb), 2026-10-23, kết quả AI do máy chạy
- **Locator:** QA-3419 — TC-20 trong `result_QA-3419_run2_2026-10-23.md` | Link: https://qa-hub.ownego.com/test-cases?task=TIB-059 | Ngày, build: 2026-10-23. Build `assets/index.BqS1iTCG.js`. | Chỉ kiểm selection toàn layer 1.0; selection lẫn 1.0 + 2.0 không dựng được (CCR cũ: CBS-025 CLAIM-11)
- **Căn cứ expected:** Dev tuanva, comment 49205, 2026-08-27 (A3): ""Personalization for this layer" (customization_type) và "Use an existing global option" chỉ tồn tại trên schema Artwork 2.0 (schema_version = 2). Chọn toàn layer Artwork 1.0, hoặc chọn lẫn 1.0 + 2.0 → 2 field này không hiện."
- **Trích nguyên văn:**
  ```
  TC-20 | ✅ AI — AW1.0: no Personalization for this layer / global option | Artwork [artwork id] (schema 1): Girl Name + Name Dog + Text layer → labels Default text, Option Title, Placeholder text, Add instruction for customer, Mark required (On / No change / Off), Show on cart; "Personalization for this layer" and "Use an existing global option" absent | Mixed 1.0 + 2.0 not buildable (schema is per artwork). AW1.0 menu still says "Share with another layer"
  ```
