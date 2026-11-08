### CLAIM-18

- **Statement:** "Default text (only for preview)" set qua Bulk edit KHÔNG điền sẵn vào ô nhập trên storefront; modal không có field "Prefill default text" (`autofill_default_value`) mà panel single-layer có.
- **Object / feature:** artwork/MỚI: layer-bulk-edit — Thuộc: modal Bulk edit nhiều layer trong artwork editor (điều kiện selection, tập field chung, touched-only, tri-state, Conditional và Populate trong modal, undo, ghi vào editor); Không thuộc: action bar và menu More (editor-layer-workspace), panel single-layer của từng type (layer-config-*), lưu artwork phía server (artwork-save-persist) (liên quan: sdk)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner / staff (cấu hình) + buyer (form storefront); portal · storefront
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA (phuongbb), 2026-10-29, 2026-10-30, không ai xác nhận
- **Locator:** QA-3419 — TC-30 trong `result_QA-3419_remaining_2026-10-29.md` và `result_QA-3419_retest3-regression_2026-10-30.md` (TC ⏸️) | Link: https://qa-hub.ownego.com/test-cases?task=TIB-059 | Ngày, build: 2026-10-29 (storefront, build `index.acNZihq9.js`); 2026-10-30 (đọc field modal, build `index.BMgdZMSW.js`) | KHÔNG dùng làm expected (Phần 4.2): chỉ quan sát của QA, chưa ai xác nhận; TC-30 ⏸️ có expected khác ('pre-filled Anna'), và lịch sử TIB-5236 theo ghi chú TC nói bulk default text có pre-fill (CCR cũ: CBS-025 CLAIM-18)
- **Trích nguyên văn:**
  ```
  TC-30 (2026-10-29) | ⏸️ AI — titles / required / show on cart / cart properties OK; "pre-filled Anna" not met → expected needs QA decision | … input `aria-required=true`, value "" … | Inputs are empty because the field is "Default text (only for preview)" and the layers have no `autofill_default_value` (bulk edit has no "Prefill default text" toggle). TIB-5236 history says bulk default text pre-fills the storefront
  TC-30 (2026-10-30) | ⏸️ AI — still waits for QA: bulk edit has no pre-fill option, storefront input stays empty (expected "pre-filled Anna") | T1 + T2 bulk modal fields: text (Default text only for preview), populate ×3, customization_type, form_label, form_placeholder, input_hint, required, show_in_cart, match_type, layer_display — no `autofill_default_value` (the single-layer T2 panel has it)
  ```
