### CLAIM-07

- **Statement:** "Mark this option as required", "Show customization data on cart/checkout", "Populate Content from another option" là radio 3 trạng thái On / No change / Off, mặc định No change; On/Off ghi cho mọi layer đã chọn; quay lại No change trước Save → không ghi.
- **Object / feature:** artwork/MỚI: layer-bulk-edit — Thuộc: modal Bulk edit nhiều layer trong artwork editor (điều kiện selection, tập field chung, touched-only, tri-state, Conditional và Populate trong modal, undo, ghi vào editor); Không thuộc: action bar và menu More (editor-layer-workspace), panel single-layer của từng type (layer-config-*), lưu artwork phía server (artwork-save-persist)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner / staff; portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb), 2026-10-30, kết quả AI do máy chạy
- **Locator:** QA-3419 — TC-14, TC-15 trong `result_QA-3419_retest3-regression_2026-10-30.md` (cũng ✅ trong `result_QA-3419_retest2_2026-10-29.md`) | Link: https://qa-hub.ownego.com/test-cases?task=TIB-059 | Ngày, build: 2026-10-30. Build `assets/index.BMgdZMSW.js`. | Liên quan KB-087 (tri-state trong Bulk Edit của clipart), không bị thay. Tri-state Populate Color / Background của text layer là quan sát ngoài TC, không đề xuất (CCR cũ: CBS-025 CLAIM-07)
- **Căn cứ expected:** PO huyen.chu, comment 49367, 2026-08-28 (A2): "Thay 3 toggle (`Mark this option as required`, `Show customization data on cart/checkout`, `Personalization for this layer`) bằng segmented control 3 trạng thái: `On` — `–` (no change, default) — `Off`." Dev tuanva, comment 55846, 2026-10-28: "Mark as required và Show on cart đã đúng tri-state On/No change/Off như chị đề nghị."
- **Trích nguyên văn:**
  ```
  TC-14 | ✅ AI — tri-state On / Off / back to No change | required / show_in_cart open on "No change"; required On + show Off → T1 / T2 required true, show_in_cart false; next edit required Off → No change → unchanged (true); then literal TC step 1 (required Off, show On) → false / true on both | Matches dev comment 2026-10-28 (tri-state)
  TC-15 | ✅ AI — Populate tri-state; Personalization radio no selection on open, only Cancel returns to no change | `customization_type` radios no_customization / normal / global_option all unchecked on open; pick normal → click again stays checked; Cancel + reopen → all unchecked. Populate Content / Color / Background: On / No change / Off with No change active
  ```
