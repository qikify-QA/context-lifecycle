### CLAIM-19

- **Statement:** Panel Populate values (layer cùng type): dropdown nguồn KHÔNG có layer nào đang chọn; Populate values + "Use an existing global option" set trong cùng 1 Save đều được ghi (`global_option` + `retrieval_value_enabled` / `retrieval_layer`).
- **Object / feature:** artwork/MỚI: layer-bulk-edit — Thuộc: modal Bulk edit nhiều layer trong artwork editor (điều kiện selection, tập field chung, touched-only, tri-state, Conditional và Populate trong modal, undo, ghi vào editor); Không thuộc: action bar và menu More (editor-layer-workspace), panel single-layer của từng type (layer-config-*), lưu artwork phía server (artwork-save-persist)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner / staff; portal · api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb), 2026-10-30, kết quả AI do máy chạy
- **Locator:** QA-3419 — TC-31 trong `result_QA-3419_retest3-regression_2026-10-30.md` (retest BUG-09) | Link: https://qa-hub.ownego.com/test-cases?task=TIB-059 | Ngày, build: 2026-10-30. Build `assets/index.BMgdZMSW.js`. | QA chạy staging 2026-10-29 build index.acNZihq9.js thấy ngược lại (nguồn còn CL2, CL3; layer lưu populate từ chính nó), đúng known limitation của dev summary 49895; TC-31 2026-10-30 đã khác. Hành vi đổi giữa 2 build, không ai trên Jira xác nhận thay đổi. Liên quan KB-076 (CCR cũ: CBS-025 CLAIM-19)
- **Căn cứ expected:** KHÔNG CÓ
- **Trích nguyên văn:**
  ```
  TC-31 | ✅ AI — retest BUG-09: Populate + existing GO saved together; source list excludes selected layers | Original steps: CL1 + CL2 + CL3 → Populate On → Source option list **empty** ("List is empty.") — selected layers no longer offered. Run 1 (03:57:54 UTC): CL1 + CL2, Source CL3, Use an existing global option → GO [id] → Save → Save & Close → CL1 / CL2 `global_option [id], retrieval_value_enabled true, retrieval_layer layer-[id]`; CL3 untouched. Run 2 (03:58:25 UTC): CL2 + CL3, Source CL1, GO [id] → CL2 / CL3 `global_option [id], retrieval_value_enabled true, retrieval_layer layer-[id]`
  Phía bên kia (dev summary, comment 49895, 2026-09-04, Known limitations): "Panel Populate values (chỉ hiện khi các layer cùng type): dropdown chọn layer nguồn dùng context của layer đầu tiên trong selection, nên chỉ loại layer đó khỏi danh sách; các layer còn lại trong selection vẫn chọn được làm nguồn, có thể dẫn tới layer tự populate từ chính nó. Cần verify." QA 2026-10-29 (build `index.acNZihq9.js`): "Source option list: **"CL2", "CL3"** (only CL1 excluded)".
  ```
