### CLAIM-13

- **Statement:** Đổi "Select one clipart category" / "Select a group of clipart categories" mà không chạm Default value → `default_value` = null trên mọi layer đã chọn; đổi kèm Default value mới → default mới được ghi; layer không chọn không đổi.
- **Object / feature:** artwork/MỚI: layer-bulk-edit — Thuộc: modal Bulk edit nhiều layer trong artwork editor (điều kiện selection, tập field chung, touched-only, tri-state, Conditional và Populate trong modal, undo, ghi vào editor); Không thuộc: action bar và menu More (editor-layer-workspace), panel single-layer của từng type (layer-config-*), lưu artwork phía server (artwork-save-persist)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner / staff; portal · api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb), 2026-10-30, 2026-10-23, kết quả AI do máy chạy
- **Locator:** QA-3419 — TC-23, TC-24 trong `result_QA-3419_retest3-regression_2026-10-30.md`; TC-25 trong `result_QA-3419_run2_2026-10-23.md` | Link: https://qa-hub.ownego.com/test-cases?task=TIB-059 | Ngày, build: 2026-10-30 (TC-23/24, build `index.BMgdZMSW.js`); 2026-10-23 (TC-25, build `index.BqS1iTCG.js`) | Liên quan KB-094, không bị thay (CCR cũ: CBS-025 CLAIM-13)
- **Căn cứ expected:** Dev tuanva, comment 49205, 2026-08-27 (B6): "Dev sẽ fix: khi clipart / grouped_clipart được thay đổi thì tự đẩy default_value: null vào patch."
- **Trích nguyên văn:**
  ```
  TC-23 | ✅ AI — category changed without default → default reset | CL1 + CL2 → Create a new option → category finder → "QA-3419 Cat B" → Save → clipart [id] → [id], default_value A2 → null on both; CL3 unchanged
  TC-24 | ✅ AI — category + new default applied | CL1 + CL2 → Cat B + default B2 (radio-image) → clipart [id], default_value `users/[id]/cliparts/[id]/[file].svg` on both; CL3 unchanged
  TC-25 | ✅ AI — group change resets default; group + default applies | G1 + G2 (group [id]): Group 2 ([id]), default untouched → grouped_clipart [id], default_value null on both; Group 2 + default C1 → default_value `users/[id]/cliparts/[id]/[file].svg` on both; server same after Save & Close
  ```
