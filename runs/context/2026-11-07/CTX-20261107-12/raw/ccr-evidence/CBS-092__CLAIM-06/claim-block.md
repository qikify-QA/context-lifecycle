### CLAIM-06

- **Statement:** Mọi field mở ra rỗng / "No change", không đọc giá trị của layer; Save chỉ ghi field đã chạm, cho mọi layer đã chọn; field không chạm giữ giá trị riêng từng layer; chạm rồi xoá trắng → ghi rỗng (null) cho mọi layer; ghi đúng giá trị layer đã có → không lỗi, 1 undo step; Cancel / Esc / click ngoài modal → không ghi gì, không thêm undo step.
- **Object / feature:** artwork/MỚI: layer-bulk-edit — Thuộc: modal Bulk edit nhiều layer trong artwork editor (điều kiện selection, tập field chung, touched-only, tri-state, Conditional và Populate trong modal, undo, ghi vào editor); Không thuộc: action bar và menu More (editor-layer-workspace), panel single-layer của từng type (layer-config-*), lưu artwork phía server (artwork-save-persist)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner / staff; portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb), 2026-10-30, 2026-10-23, kết quả AI do máy chạy
- **Locator:** QA-3419 — TC-09, TC-10, TC-11 trong `result_QA-3419_retest3-regression_2026-10-30.md`; TC-12, TC-13, TC-40 trong `result_QA-3419_run2_2026-10-23.md` | Link: https://qa-hub.ownego.com/test-cases?task=TIB-059 | Ngày, build: 2026-10-30 (TC-09/10/11, build `index.BMgdZMSW.js`); 2026-10-23 (TC-12/13/40, build `index.BqS1iTCG.js`) | Bước 'Save không đụng gì thì không sinh undo step' (TC-09 bước 5) không dùng undo làm oracle được; chỉ kiểm Cancel / Esc / click ngoài không thêm undo step (CCR cũ: CBS-025 CLAIM-06)
- **Căn cứ expected:** Dev tuanva, comment 49205, 2026-08-27 (A1): "→ Giữ nguyên. Modal dùng cờ touched (BulkEditLayersPopup.vue:91,150-161): chỉ field nào user thực sự thao tác mới được đưa vào patch gửi xuống layer. Field mở ra rỗng và không đụng tới → không ghi gì cả." … "Muốn xoá trắng thì phải chạm vào field rồi để rỗng → khi đó ghi giá trị rỗng cho toàn bộ layer đã chọn."
- **Trích nguyên văn:**
  ```
  TC-09 | ✅ AI — all controls open empty / No change; untouched Save changes nothing | T1 + T2: Default text "", Populate Content / Color / Background = No change, Personalization radios none checked, Display radios none checked → Save → Save & Close → diff vs baseline: 0 changed fields on all 38 layers (updated_at moved) | Undo history not used as oracle (as before)
  TC-10 | ✅ AI — only Option title overwritten | T1 + T2 → Create a new option → Option Title "Bulk Title" → diff: only form_label on T1 / T2; T1 input_hint "PH A", required / show_in_cart unchanged
  TC-11 | ✅ AI — Placeholder touched then cleared → empty on both | Step A: Placeholder "Bulk PH" → saved on T1 / T2; step B: typed "x", cleared → Save → Save & Close → form_placeholder null on both (same as before step A)
  TC-12 | ✅ AI — same value written, no error, one undo step | Precondition adapted: T1 "mix", T2 "Mix" → bulk Option title "mix" → T1 "mix", T2 "mix"; undo ops 1 → 2
  TC-13 | ✅ AI — Cancel discards everything | T1 + T2: Default text "X13", Create a new option, Option Title "C13", Show on cart Off → Cancel → T1 {mix, required false, show_in_cart true, Alice, normal}, T2 {Mix, false, true, Bob, normal} unchanged; undo ops 1 → 1
  TC-40 | ✅ AI — Esc and click outside close the modal, nothing written | Option Title "E40" → Esc → modal closed, no prompt; reopened, Default text typed → click on the overlay → modal closed; T1 / T2 unchanged; undo ops 1 → 1
  ```
