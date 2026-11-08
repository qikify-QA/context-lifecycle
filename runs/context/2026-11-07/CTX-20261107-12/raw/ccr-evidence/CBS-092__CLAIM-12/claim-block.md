### CLAIM-12

- **Statement:** Panel Conditional Setting hiện khi ≥1 layer đã chọn hỗ trợ conditional; danh sách layer nguồn loại MỌI layer đang chọn và replica; rule ghi cho mọi layer hỗ trợ, bỏ qua layer linked và dynamic clipart by text; rule cũ của layer bị thay.
- **Object / feature:** artwork/MỚI: layer-bulk-edit — Thuộc: modal Bulk edit nhiều layer trong artwork editor (điều kiện selection, tập field chung, touched-only, tri-state, Conditional và Populate trong modal, undo, ghi vào editor); Không thuộc: action bar và menu More (editor-layer-workspace), panel single-layer của từng type (layer-config-*), lưu artwork phía server (artwork-save-persist)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner / staff; portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb), 2026-10-29, 2026-10-30, kết quả AI do máy chạy
- **Locator:** QA-3419 — TC-27 trong `result_QA-3419_remaining_2026-10-29.md`; TC-21 trong `result_QA-3419_retest3-regression_2026-10-30.md` | Link: https://qa-hub.ownego.com/test-cases?task=TIB-059 | Ngày, build: 2026-10-29 (TC-27, build `assets/index.BFN2fMjC.js`); 2026-10-30 (TC-21, build `index.BMgdZMSW.js`) | Vế 'rule cũ bị thay': TC-42 mới chạy bước 1 (⏸️ một phần, 2026-10-22), bước xoá rule và undo chưa chạy. Liên quan, không bị thay: KB-065, KB-005. KB-225 / CHK-017 / OQ-artwork-154 (Show/Hide khi bulk apply Conditional) vẫn chưa được trả lời bởi TC-21, TC-27 (CCR cũ: CBS-025 CLAIM-12)
- **Căn cứ expected:** Dev tuanva, comment 49205, 2026-08-27 (B7): "Self-reference đã bị chặn: LayersDependency.availableLayers loại bỏ toàn bộ layer đang được chọn (selectedIds) và loại cả layer replica (global_id) khỏi danh sách nguồn."
- **Trích nguyên văn:**
  ```
  TC-27 | ✅ AI — source list excludes T1, T2, D1 and replicas; rule written to T1 / T2 only | [artwork id] Local 1, T1 + T2 + D1 → "3 layers selected" → CONDITIONAL SETTING → + Add conditions → source dropdown options: **"L1"** only (no T1 / T2 / D1 / R1 / R2) → L1 "is" `a` → Save → form preview no longer lists T1 / T2 → Save & Close → GraphQL: T1 / T2 `dependency {action show, match_type all, dependencies [{element layer-[id], operator is, value "a"}], show_by_default false}`; L1 null; **D1 null**; replicas layer-[id] / -[id] / -[id] / -[id] unchanged (only `global_id`)
  TC-21 | ✅ AI — rule written to T1 only, LK1 untouched | T1 + LK1 → Conditional source list: A, B, T2, T3, C1, CL1–CL3, G1, G2, V1, V2, L1, L2, H1, GC1, GC2, JSON list (no T1 / LK1) → "A is any of 2" → Save → Save & Close → T1 dependency element layer-[id] value [2] (replaced B); LK1 same as baseline (linked)
  ```
