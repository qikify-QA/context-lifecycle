### CLAIM-04

- **Statement:** Chọn một group layer thì các layer con được chọn theo; Bulk edit ghi cho layer con, group layer không bị ghi; header đếm cả group ("3 layers selected" cho 2 layer con). PO chưa quyết bỏ hay giữ flow này (PENDING-05).
- **Object / feature:** artwork/MỚI: layer-bulk-edit — Thuộc: modal Bulk edit nhiều layer trong artwork editor (điều kiện selection, tập field chung, touched-only, tri-state, Conditional và Populate trong modal, undo, ghi vào editor); Không thuộc: action bar và menu More (editor-layer-workspace), panel single-layer của từng type (layer-config-*), lưu artwork phía server (artwork-save-persist)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner / staff; portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA (phuongbb), 2026-10-22, không ai xác nhận
- **Locator:** QA-3419 — TC-04 trong `result_QA-3419_run1_2026-10-22.md` (quan sát của QA; TC expected là assumption khác) | Link: https://qa-hub.ownego.com/test-cases?task=TIB-059 | Ngày, build: 2026-10-22 (ngày quan sát). Build `assets/index.BqS1iTCG.js`. | KHÔNG dùng làm expected (Phần 4.2): chỉ quan sát 1 lượt trên build cũ, TC-04 expected là assumption khác, PO chưa quyết PENDING-05. Header đếm cả group chỉ là quan sát (CCR cũ: CBS-025 CLAIM-04)
- **Trích nguyên văn:**
  ```
  TC-04 expected: ⏸️ AI — assumption (PENDING-05): Step 1 Bulk edit disabled; step 2 group not edited (only T1 changed after Save)
  TC-04 | ✅ AI — selecting group GR1 selects its children and bulk-edits them; the group is not written | GR1 → "3 selected" → modal "3 layers selected" → Option title "Grp T" → GC1 / GC2 form_label "Grp T"; GR1 (type group) unchanged | PENDING-05 answered by behaviour: TIB-5028 group flow still works. Header counts the group ("3" for 2 edited layers)
  Dev (tuanva, comment 49205, 2026-08-27, A3): "Selection loại đúng 2 nhóm: layer group và layer đang locked (BulkEditLayersPopup.vue:97-101)." — câu hỏi PO (PENDING-05) chưa có trả lời.
  ```
