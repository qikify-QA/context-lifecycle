### CLAIM-10

- **Statement:** Modal chỉ hiện field có (cùng kiểu) trong schema của MỌI layer đã chọn: Text + Paragraph và cả 5 text type có "Default text (only for preview)"; khác type → ẩn cả panel Populate values và bỏ "Use an existing global option"; cùng type (vd 2 clipart) → hiện Populate values, "Use an existing global option", "Select one clipart category" + default value; Text + Clipart → Personalization, Option Title, Add instruction, Mark required, Show on cart, Conditional, Display this layer on.
- **Object / feature:** artwork/MỚI: layer-bulk-edit — Thuộc: modal Bulk edit nhiều layer trong artwork editor (điều kiện selection, tập field chung, touched-only, tri-state, Conditional và Populate trong modal, undo, ghi vào editor); Không thuộc: action bar và menu More (editor-layer-workspace), panel single-layer của từng type (layer-config-*), lưu artwork phía server (artwork-save-persist)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner / staff; portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb), 2026-10-30, 2026-10-23, kết quả AI do máy chạy
- **Locator:** QA-3419 — TC-16, TC-17 trong `result_QA-3419_retest3-regression_2026-10-30.md`; TC-18, TC-19 trong `result_QA-3419_run2_2026-10-23.md` | Link: https://qa-hub.ownego.com/test-cases?task=TIB-059 | Ngày, build: 2026-10-30 (TC-16/17, build `index.BMgdZMSW.js`); 2026-10-23 (TC-18/19, build `index.BqS1iTCG.js`) | TC-18/19 chạy trên build cũ index.BqS1iTCG.js (CCR cũ: CBS-025 CLAIM-10)
- **Căn cứ expected:** Dev tuanva, comment 49205, 2026-08-27 (B3): "Panel Populate values có cờ sameLayerTypeOnly (bulkSchema.js:24) → ẩn nguyên panel khi chọn nhiều type khác nhau. … Cùng một type → hiện đầy đủ cả hai."
- **Trích nguyên văn:**
  ```
  TC-16 | ✅ AI — Text + Paragraph: Default text, no Populate panel, no GO option | T1 + P1 → panels DESIGN / PERSONALIZATION / CONDITIONAL / EXTRA; fields text, customization_type (no_customization, normal), form_label, input_hint, required, show_in_cart, match_type, layer_display; "Use an existing global option" absent
  TC-17 | ✅ AI — Text + Clipart: only common settings | T1 + CL1 → panels PERSONALIZATION / CONDITIONAL / EXTRA; radios no_customization, normal; fields form_label, input_hint, required (tri), show_in_cart (tri), match_type, layer_display; no Default text, Populate, Placeholder, clipart category
  TC-18 | ✅ AI — same type shows Populate values + global option + clipart fields | CL1 + CL2: panels DESIGN / POPULATE VALUES (Populate Content On / No change / Off) / PERSONALIZATION / CONDITIONAL / EXTRA; radios No personalization / Create a new option / Use an existing global option; after Create a new option: "Select one clipart category:", "Clipart category's default value:", Option Title, Add instruction for customer, Mark required, Show on cart
  TC-19 | ✅ AI — five text types: Default text only, no Populate values | T1 + P1 + C1 + W1 + S1 → "Bulk edit 5 layers selected"; DESIGN SETTINGS has only "Default text (only for preview):"; no POPULATE VALUES panel; Personalization radios only No personalization / Create a new option
  ```
