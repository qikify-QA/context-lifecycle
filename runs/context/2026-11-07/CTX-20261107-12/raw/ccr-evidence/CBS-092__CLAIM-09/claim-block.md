### CLAIM-09

- **Statement:** Selection có layer linked: layer linked giữ `customization_type` = linked (Option title của nó không đổi) khi bulk edit settings, và không nhận rule Conditional.
- **Object / feature:** artwork/MỚI: layer-bulk-edit — Thuộc: modal Bulk edit nhiều layer trong artwork editor (điều kiện selection, tập field chung, touched-only, tri-state, Conditional và Populate trong modal, undo, ghi vào editor); Không thuộc: action bar và menu More (editor-layer-workspace), panel single-layer của từng type (layer-config-*), lưu artwork phía server (artwork-save-persist)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner / staff; portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb), 2026-10-30, kết quả AI do máy chạy
- **Locator:** QA-3419 — TC-43, TC-21 trong `result_QA-3419_retest3-regression_2026-10-30.md` | Link: https://qa-hub.ownego.com/test-cases?task=TIB-059 | Ngày, build: 2026-10-30. Build `assets/index.BMgdZMSW.js`. | Lệch nguồn, giữ cả hai phía: dev C3 2026-08-27 nói các setting khác vẫn áp bình thường; dev 55846 chỉ nói đã fix layer Link bị patch nhầm, không nói setting khác còn ghi lên layer linked hay không. Liên quan KB-045 (CCR cũ: CBS-025 CLAIM-09)
- **Căn cứ expected:** KHÔNG CÓ
- **Trích nguyên văn:**
  ```
  TC-43 expected: LK1 keeps customization_type `linked` (only the touched Option title may change, or the field is not offered for linked layers)
  TC-43 | ✅ AI — linked layer stays linked | T2 + LK1 → radios no_customization / normal / global_option none checked → Create a new option → Option title "Mix" → Save → Save & Close → T2 form_label "Mix43" → "Mix"; LK1 identical to baseline (customization_type linked, form_label unchanged)
  TC-21 | ✅ AI — rule written to T1 only, LK1 untouched | T1 + LK1 → Conditional source list: A, B, T2, T3, C1, CL1–CL3, G1, G2, V1, V2, L1, L2, H1, GC1, GC2, JSON list (no T1 / LK1) → "A is any of 2" → Save → Save & Close → T1 dependency element layer-[id] value [2] (replaced B); LK1 same as baseline (linked)
  Phía bên kia (dev tuanva, comment 49205, 2026-08-27, C3): "Linked (form_type = 'linked'): bị loại khỏi phần Conditional (NO_DEPENDENCY_FORM_TYPES), các setting khác vẫn áp bình thường." Dev tuanva, comment 55846, 2026-10-28: "Các điểm còn lại QA báo (layer Link bị patch nhầm, Preview sinh field trùng, Conditional áp nhầm cho layer Link) đã fix hết".
  ```
