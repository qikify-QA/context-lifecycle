### CLAIM-02

- **Statement:** Bulk edit bật khi selection có ≥1 layer editable (editable = không phải group, không locked, không phải replica Global Template); 1 layer cũng mở được; layer hidden được bulk edit; chỉ locked hoặc chỉ replica → mục "Bulk edit" có nhưng disabled; selection lẫn editable + locked + replica → chỉ layer editable bị ghi.
- **Object / feature:** artwork/MỚI: layer-bulk-edit — Thuộc: modal Bulk edit nhiều layer trong artwork editor (điều kiện selection, tập field chung, touched-only, tri-state, Conditional và Populate trong modal, undo, ghi vào editor); Không thuộc: action bar và menu More (editor-layer-workspace), panel single-layer của từng type (layer-config-*), lưu artwork phía server (artwork-save-persist)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner / staff có quyền sửa artwork; portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb), 2026-10-30, kết quả AI do máy chạy
- **Locator:** QA-3419 — TC-02, TC-03, TC-05 trong `result_QA-3419_retest3-regression_2026-10-30.md` | Link: https://qa-hub.ownego.com/test-cases?task=TIB-059 | Ngày, build: 2026-10-30. Build `assets/index.BMgdZMSW.js`. | TC-06 (staff không có Manage Artwork) chưa chạy, không đề xuất gì về quyền. Header đếm cả layer không editable chỉ là quan sát, không nguồn nào nói con số phải là bao nhiêu (CCR cũ: CBS-025 CLAIM-02)
- **Căn cứ expected:** PO huyen.chu, comment 49367, 2026-08-28: "**A3 — Layer hidden giờ được bulk edit**  Xác nhận đúng" và "**C3 — Replica của Global Template**  Loại replica khỏi selection cho phép bulk edit — tương tự cách xử lý layer locked hiện tại." Dev tuanva, comment 55846, 2026-10-28: "giờ chọn layer thường + replica vẫn mở Bulk edit được, chỉ layer thường bị sửa, replica vẫn giữ nguyên."
- **Trích nguyên văn:**
  ```
  TC-02 | ✅ AI — 1 layer and hidden layer: Bulk edit enabled; T1 + H1 → "2 layers selected" | T1 alone → Bulk edit enabled; H1 (hidden) alone → enabled; T1 + H1 → modal "Bulk edit 2 layers selected"
  TC-03 | ✅ AI — locked only and replica only: Bulk edit present but disabled | [artwork id] L1 + L2 → `Bulk edit (disabled)`; [artwork id] Local 1 R1 + R2 → menu `Bulk edit (disabled)`, `Replace image layer (disabled)` | Changed since run 1: replica-only now shows the entry disabled (was hidden) → now matches the expected exactly
  TC-05 | ✅ AI — T1 + L1 + R1: only T1 written | [artwork id] Local 1 T1 + L1 + R1 → Bulk edit enabled → Create a new option → Option title "QA mix 1030" → Save → Save & Close → diff: only T1 form_label "QA mix" → "QA mix 1030"; L1, R1 (layer-[id]), Global R1 / R2 unchanged
  ```
