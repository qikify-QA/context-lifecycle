### CLAIM-16

- **Statement:** Bulk edit chỉ ghi vào editor; dữ liệu lên server khi bấm Save artwork; reload không Save → mất thay đổi; reload khi modal đang mở → modal không mở lại, layer giữ giá trị đã lưu.
- **Object / feature:** artwork/MỚI: layer-bulk-edit — Thuộc: modal Bulk edit nhiều layer trong artwork editor (điều kiện selection, tập field chung, touched-only, tri-state, Conditional và Populate trong modal, undo, ghi vào editor); Không thuộc: action bar và menu More (editor-layer-workspace), panel single-layer của từng type (layer-config-*), lưu artwork phía server (artwork-save-persist)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner / staff; portal · api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb), 2026-10-30, 2026-10-23, kết quả AI do máy chạy
- **Locator:** QA-3419 — TC-29 trong `result_QA-3419_retest3-regression_2026-10-30.md`; TC-41 trong `result_QA-3419_run2_2026-10-23.md` | Link: https://qa-hub.ownego.com/test-cases?task=TIB-059 | Ngày, build: 2026-10-30 (TC-29, build `index.BMgdZMSW.js`); 2026-10-23 (TC-41, build `index.BqS1iTCG.js`) | Nhất quán KB-049 và CHK-009 (editor-layer-workspace), phần riêng của Bulk edit không có trong canon (CCR cũ: CBS-025 CLAIM-16)
- **Căn cứ expected:** Dev tuanva, comment 49205, 2026-08-27 (C2): "Bulk edit không gọi API per-layer; nó chỉ ghi vào tree in-memory của editor (ArtworkEditor.setLayerData, :1881). Dữ liệu chỉ lên server khi user bấm Save artwork — lúc đó là 1 request duy nhất, all-or-nothing."
- **Trích nguyên văn:**
  ```
  TC-29 | ✅ AI — persisted only after Save artwork | Bulk title "P1" → modal Save → editor T2 "P1", server T2 still "Mix" → reload without saving → editor T2 "Mix", no modal → repeat + Save & Close → server T1 / T2 "P1"
  TC-41 | ✅ AI — reload with the modal open | Default text "R41" typed → reload → no modal; editor + server T1 {P1, Alice}, T2 {P1, Bob}
  ```
