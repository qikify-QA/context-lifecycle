# Context Change Request: artwork-bulk-edit — gộp từ 2 Proposal khuôn cũ

- **Product:** `teeinblue`
- **Object:** `artwork`
- **Ticket:** `TIB-5299, TIB-5412`
- **Các khối có trong file:** `A`

## Mức độ gấp

`MEDIUM` — mức cao nhất trong các Proposal gốc (MEDIUM); lý do gốc theo từng Proposal:

- CBS-025: MEDIUM — QA chọn MEDIUM (phuongbb, 2026-11-01): modal Bulk edit là gap coverage; riêng CHK-005 đang chạy sai vì expect không có menu overflow.
- CBS-032: MEDIUM — Canon thiếu coverage cho so khớp tên của Dynamic Clipart by Text; không có checklist đang publish nào kiểm hành vi này nên không có gì chạy sai ngay (QA phuongbb, 2026-11-01).

# Khối A — Hành vi

### CLAIM-01

- **Statement:** Chọn ≥1 layer, menu More (…) trên action bar có: Bulk edit (icon bút) đứng đầu, rồi Replace image layer, Link with another layer, Convert to another layer; 6 mục cũ (Replace clipart category, Replace group of clipart categories, Conditional setting, Bulk edit default text, Bulk edit option title, Bulk edit display setting) không còn.
- **Object / feature:** artwork/editor-layer-workspace
- **Quan hệ với canon:** `CONTRADICTS KB-043`
- **Scope:** store owner / staff có quyền sửa artwork; portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb), 2026-10-30, kết quả AI do máy chạy
- **Locator:** QA-3419 (QA Hub task TIB-059) — TC-01 trong `result_QA-3419_retest3-regression_2026-10-30.md` (cũng ✅ trong `result_QA-3419_run1_2026-10-22.md`) | Link: https://qa-hub.ownego.com/test-cases?task=TIB-059 | Ngày, build: 2026-10-30 (ngày chạy). Build: staging portal `assets/index.BMgdZMSW.js` (Last-Modified 2026-10-29 14:32:50 GMT), sau dev summary (2026-09-04) và fix cuối của dev (2026-10-28). | Checklist CHK-005 (artwork/editor-layer-workspace, READY) đang assert không có menu overflow. KB-085/CHK-015 lại nói có menu '...' > 'Bulk edit'. Giữ cả hai phía. Dev summary comment 49895 chỉ là ngữ cảnh, không phải nguồn. Nhãn thật theo TC-01 khác nhãn trong TC expected và ticket; Artwork 1.0 vẫn ghi 'Share with another layer'; không đề xuất nhãn nào là chuẩn ngoài cái TC-01 đọc được (CCR cũ: CBS-025 CLAIM-01)
- **Căn cứ expected:** KHÔNG CÓ
- **Trích nguyên văn:**
  ```
  TC-01 expected: Items in order: "Bulk edit" (pen icon), "Replace image", "Share with another layer", "Convert layer"; none of "Replace clipart category", "Replace group of clipart categories", "Conditional setting", "Bulk edit default text", "Bulk edit option title", "Bulk edit display setting"
  TC-01 | ✅ AI — More menu: Bulk edit (pen icon), Replace image layer (disabled), Link with another layer, Convert to another layer; no old bulk entries | T1 + T2 → More popper shown: `Bulk edit` (`las la-pen`), `Replace image layer (disabled)`, `Link with another layer`, `Convert to another layer`; none of the 6 old labels in the page | Build BMgdZMSW
  Ngữ cảnh (dev summary, comment 49895, 2026-09-04 — mô tả kỹ thuật dev tự viết, không phải nguồn của claim):
  Artwork editor, chọn nhiều layer, menu More (…): gỡ 6 entry cũ (Replace clipart category, Replace group of clipart categories, Conditional setting, Bulk edit default text, Bulk edit option title, Bulk edit display setting) và thay bằng một entry duy nhất **Bulk edit** (icon bút). Các entry Replace image, Share with another layer, Convert layer vẫn giữ nguyên, chỉ đổi thứ tự (Bulk edit đứng đầu).
  ```

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

### CLAIM-03

- **Statement:** Selection có layer replica Global Template: cờ `canMutate` (có từ trước) chặn Group / Duplicate / Delete — action bar thu gọn; ticket chỉ bỏ cờ này khỏi riêng mục Bulk edit.
- **Object / feature:** artwork/editor-layer-workspace
- **Quan hệ với canon:** `CONTRADICTS KB-042`
- **Scope:** store owner / staff; portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (tuanva), 2026-10-28
- **Locator:** Jira TIB-5299, comment 55846, mục "C3 — loại replica khỏi selection cho phép bulk edit" (dev trả lời PO sau khi QA báo bug TC-05) | Link: https://ownego.atlassian.net/browse/TIB-5299?focusedCommentId=55846 | Ngày, build: 2026-10-28 | Bổ trợ: QA 2026-10-23 trên build trước fix thấy T1 + R1 action bar thu gọn (no Group / Copy / Duplicate / Delete); chưa đọc lại action bar trên build cuối. Sample của KB-042 không có replica nên có thể chỉ khác scope. CHK-006 (READY) cùng expected với KB-042. Giữ cả hai phía (CCR cũ: CBS-025 CLAIM-03)
- **Trích nguyên văn:**
  ```
  Trước đó logic loại replica khỏi tập editable đã đúng như chị yêu cầu, nhưng entry "Bulk edit" trên menu vẫn bị 1 cờ khác (canMutate, có từ trước PR này, dùng chặn group/duplicate/delete) ẩn hẳn khi selection lẫn layer replica — nên chọn layer thường + replica không mở được Bulk edit luôn (đúng y bug QA báo). Đã bỏ cờ đó khỏi riêng entry Bulk edit, giờ chọn layer thường + replica vẫn mở Bulk edit được, chỉ layer thường bị sửa, replica vẫn giữ nguyên.
  ```

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

### CLAIM-05

- **Statement:** Modal "Bulk edit" rộng 620 px: "1 layer selected" / "N layers selected", mô tả "Only settings available to all selected layers are shown.", footer "Any changes will override existing values" (không có dấu chấm), nút Cancel / Save, accordion panel đầu tiên mở sẵn.
- **Object / feature:** artwork/MỚI: layer-bulk-edit — Thuộc: modal Bulk edit nhiều layer trong artwork editor (điều kiện selection, tập field chung, touched-only, tri-state, Conditional và Populate trong modal, undo, ghi vào editor); Không thuộc: action bar và menu More (editor-layer-workspace), panel single-layer của từng type (layer-config-*), lưu artwork phía server (artwork-save-persist)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner / staff; portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb), 2026-10-30, kết quả AI do máy chạy
- **Locator:** QA-3419 — TC-07, TC-08 trong `result_QA-3419_retest3-regression_2026-10-30.md` | Link: https://qa-hub.ownego.com/test-cases?task=TIB-059 | Ngày, build: 2026-10-30. Build `assets/index.BMgdZMSW.js`. | Footer không có dấu chấm cuối. 620 px là giá trị dev summary nêu (CCR cũ: CBS-025 CLAIM-05)
- **Căn cứ expected:** KHÔNG CÓ
- **Trích nguyên văn:**
  ```
  TC-07 | ✅ AI — header, description, footer, buttons, first panel open | T1 + T2 + T3 → "Bulk edit 3 layers selected", "Only settings available to all selected layers are shown.", footer "Any changes will override existing values", buttons Cancel / Save, DESIGN SETTINGS expanded, modal 620 px | Footer still without final period
  TC-08 | ✅ AI — singular count | T1 alone → "Bulk edit 1 layer selected"
  ```

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

### CLAIM-08

- **Statement:** "Personalization for this layer" là radio 3 lựa chọn (No personalization / Create a new option / Use an existing global option) KHÔNG có "No change": mở ra không chọn gì = không ghi; đã chọn thì chỉ Cancel mới quay lại được. Lệch với quyết định A2 của PO (đòi tri-state); dev hỏi lại PO 2026-10-28, chưa có trả lời.
- **Object / feature:** artwork/MỚI: layer-bulk-edit — Thuộc: modal Bulk edit nhiều layer trong artwork editor (điều kiện selection, tập field chung, touched-only, tri-state, Conditional và Populate trong modal, undo, ghi vào editor); Không thuộc: action bar và menu More (editor-layer-workspace), panel single-layer của từng type (layer-config-*), lưu artwork phía server (artwork-save-persist)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner / staff; portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (tuanva), 2026-10-28
- **Locator:** Jira TIB-5299, comment 55846, mục "A2 — tri-state cho 3 toggle" | Link: https://ownego.atlassian.net/browse/TIB-5299?focusedCommentId=55846 | Ngày, build: 2026-10-28 | KHÔNG đề xuất check assert 'không có No change' là đúng (Phần 4.2): hành vi hiện tại lệch quyết định A2 của PO, PO chưa trả lời dev (PENDING-02). Bổ trợ: TC-15 ✅ 2026-10-29 build index.BFN2fMjC.js, field phụ thuộc chỉ hiện sau khi chọn Personalization, khớp CHK-016 (CCR cũ: CBS-025 CLAIM-08)
- **Trích nguyên văn:**
  ```
  Riêng "Personalization for this layer" QA vừa phát hiện vẫn là radio thường, không có lựa chọn "No change" — lý do kỹ thuật là nó vốn là radio 3 lựa chọn (No personalization / Create a new option / Use existing global option), không phải toggle on-off nên không áp tri-state y hệt 2 field kia được. Hành vi hiện tại: mở ra không chọn gì thì Save không ghi đè gì (về chức năng đã = "No change"), chỉ là UI chưa có nhãn đó thôi.
  
  Chị xác nhận giúp mình: giữ nguyên radio-rỗng-là-no-change như vậy, hay cần đổi UI thành tri-state thật cho khớp A2 ạ? (đang để QA-3419 PENDING-02 chờ chị)
  ```

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

### CLAIM-10

- **Statement:** Modal chỉ hiện field có (cùng kiểu) trong schema của MỌI layer đã chọn: Text + Paragraph và cả 5 text type có "Default text (only for preview)"; khác type → ẩn cả panel Populate values và bỏ "Use an existing global option"; cùng type (vd 2 clipart) → hiện Populate values, "Use an existing global option", "Select one clipart category" + default value; Text + Clipart → Personalization, Option Title, Add instruction, Mark required, Show on cart, Conditional, Display this layer on.
- **Object / feature:** artwork/MỚI: layer-bulk-edit — Thuộc: modal Bulk edit nhiều layer trong artwork editor (điều kiện selection, tập field chung, touched-only, tri-state, Conditional và Populate trong modal, undo, ghi vào editor); Không thuộc: action bar và menu More (editor-layer-workspace), panel single-layer của từng type (layer-config-*), lưu artwork phía server (artwork-save-persist)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner / staff; portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb), 2026-10-30, 2026-10-23, kết quả AI do máy chạy
- **Locator:** QA-3419 — TC-16, TC-17 trong `result_QA-3419_retest3-regression_2026-10-30.md`; TC-18, TC-19 trong `result_QA-3419_run2_2026-10-23.md` | Link: https://qa-hub.ownego.com/test-cases?task=TIB-059 | Ngày, build: 2026-10-30 (TC-16/17, build `index.BMgdZMSW.js`); 2026-10-23 (TC-18/19, build `index.BqS1iTCG.js`) | TC-18/19 chạy trên build cũ index.BqS1iTCG.js (CCR cũ: CBS-025 CLAIM-10)
- **Căn cứ expected:** Dev tuanva, comment 49205, 2026-08-27 (B3): "Panel Populate values có cờ sameLayerTypeOnly (bulkSchema.js:24) → ẩn nguyên panel khi chọn nhiều type khác nhau. … Cùng một type → hiện đầy đủ cả hai."
- **Trích nguyên văn:**
  ```
  TC-16 | ✅ AI — Text + Paragraph: Default text, no Populate panel, no GO option | T1 + P1 → panels DESIGN / PERSONALIZATION / CONDITIONAL / EXTRA; fields text, customization_type (no_customization, normal), form_label, input_hint, required, show_in_cart, match_type, layer_display; "Use an existing global option" absent
  TC-17 | ✅ AI — Text + Clipart: only common settings | T1 + CL1 → panels PERSONALIZATION / CONDITIONAL / EXTRA; radios no_customization, normal; fields form_label, input_hint, required (tri), show_in_cart (tri), match_type, layer_display; no Default text, Populate, Placeholder, clipart category
  TC-18 | ✅ AI — same type shows Populate values + global option + clipart fields | CL1 + CL2: panels DESIGN / POPULATE VALUES (Populate Content On / No change / Off) / PERSONALIZATION / CONDITIONAL / EXTRA; radios No personalization / Create a new option / Use an existing global option; after Create a new option: "Select one clipart category:", "Clipart category's default value:", Option Title, Add instruction for customer, Mark required, Show on cart
  TC-19 | ✅ AI — five text types: Default text only, no Populate values | T1 + P1 + C1 + W1 + S1 → "Bulk edit 5 layers selected"; DESIGN SETTINGS has only "Default text (only for preview):"; no POPULATE VALUES panel; Personalization radios only No personalization / Create a new option
  ```

### CLAIM-11

- **Statement:** Layer Artwork 1.0: modal không có "Personalization for this layer" và "Use an existing global option" (2 field chỉ có ở schema 2.0); các field chung khác vẫn có.
- **Object / feature:** artwork/MỚI: layer-bulk-edit — Thuộc: modal Bulk edit nhiều layer trong artwork editor (điều kiện selection, tập field chung, touched-only, tri-state, Conditional và Populate trong modal, undo, ghi vào editor); Không thuộc: action bar và menu More (editor-layer-workspace), panel single-layer của từng type (layer-config-*), lưu artwork phía server (artwork-save-persist)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner / staff (artwork schema 1); portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb), 2026-10-23, kết quả AI do máy chạy
- **Locator:** QA-3419 — TC-20 trong `result_QA-3419_run2_2026-10-23.md` | Link: https://qa-hub.ownego.com/test-cases?task=TIB-059 | Ngày, build: 2026-10-23. Build `assets/index.BqS1iTCG.js`. | Chỉ kiểm selection toàn layer 1.0; selection lẫn 1.0 + 2.0 không dựng được (CCR cũ: CBS-025 CLAIM-11)
- **Căn cứ expected:** Dev tuanva, comment 49205, 2026-08-27 (A3): ""Personalization for this layer" (customization_type) và "Use an existing global option" chỉ tồn tại trên schema Artwork 2.0 (schema_version = 2). Chọn toàn layer Artwork 1.0, hoặc chọn lẫn 1.0 + 2.0 → 2 field này không hiện."
- **Trích nguyên văn:**
  ```
  TC-20 | ✅ AI — AW1.0: no Personalization for this layer / global option | Artwork [artwork id] (schema 1): Girl Name + Name Dog + Text layer → labels Default text, Option Title, Placeholder text, Add instruction for customer, Mark required (On / No change / Off), Show on cart; "Personalization for this layer" and "Use an existing global option" absent | Mixed 1.0 + 2.0 not buildable (schema is per artwork). AW1.0 menu still says "Share with another layer"
  ```

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

### CLAIM-14

- **Statement:** Chọn 2 layer vector category, modal (sau "Create a new option") có "Select one vector category" + "Vector category's default value".
- **Object / feature:** artwork/MỚI: layer-bulk-edit — Thuộc: modal Bulk edit nhiều layer trong artwork editor (điều kiện selection, tập field chung, touched-only, tri-state, Conditional và Populate trong modal, undo, ghi vào editor); Không thuộc: action bar và menu More (editor-layer-workspace), panel single-layer của từng type (layer-config-*), lưu artwork phía server (artwork-save-persist)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner / staff; portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb), 2026-10-22, kết quả AI do máy chạy
- **Locator:** QA-3419 — TC-26 trong `result_QA-3419_run1_2026-10-22.md` (chỉ phần field có mặt; reset chưa chạy) | Link: https://qa-hub.ownego.com/test-cases?task=TIB-059 | Ngày, build: 2026-10-22. Build `assets/index.BqS1iTCG.js`. | Chỉ kiểm field CÓ MẶT, chưa kiểm reset default khi đổi category; build cũ. Lệch nguồn, giữ cả hai phía: dev C5 2026-08-27 liệt kê Design settings không có vector; PENDING-01 chưa ai trả lời, 'PENDING-01 answered' trong kết quả TC là suy luận của QA. Liên quan layer-config-vector (CCR cũ: CBS-025 CLAIM-14)
- **Căn cứ expected:** KHÔNG CÓ
- **Trích nguyên văn:**
  ```
  TC-26 | ✅ AI — vector category field present | V1 + V2 → Create a new option → Design settings "Select one vector category" + "Vector category's default value" | PENDING-01 answered: vector in scope. Reset not run
  Phía bên kia (dev tuanva, comment 49205, 2026-08-27, C5): "Panel "Design settings" của bulk hiện chỉ gồm text, clipart, grouped_clipart, default_value (bulkSchema.js:17)."
  ```

### CLAIM-15

- **Statement:** Một lần Save của Bulk edit (settings + Conditional) = đúng 1 undo step: Undo 1 lần hoàn tác hết cho mọi layer, Redo khôi phục hết.
- **Object / feature:** artwork/MỚI: layer-bulk-edit — Thuộc: modal Bulk edit nhiều layer trong artwork editor (điều kiện selection, tập field chung, touched-only, tri-state, Conditional và Populate trong modal, undo, ghi vào editor); Không thuộc: action bar và menu More (editor-layer-workspace), panel single-layer của từng type (layer-config-*), lưu artwork phía server (artwork-save-persist)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner / staff; portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb), 2026-10-30, kết quả AI do máy chạy
- **Locator:** QA-3419 — TC-28 trong `result_QA-3419_retest3-regression_2026-10-30.md` (cũng ✅ 2026-10-24, 2026-10-29) | Link: https://qa-hub.ownego.com/test-cases?task=TIB-059 | Ngày, build: 2026-10-30. Build `assets/index.BMgdZMSW.js`. (CCR cũ: CBS-025 CLAIM-15)
- **Căn cứ expected:** PO huyen.chu, comment 49367, 2026-08-28 (C1): "Gộp lại thành **đúng 1 undo step** cho mọi trường hợp, kể cả khi có đụng Conditional Setting. Undo 1 lần phải hoàn tác toàn bộ thay đổi trong 1 lượt bulk edit — tránh user undo tưởng đã hoàn tác hết nhưng Conditional vẫn còn."
- **Trích nguyên văn:**
  ```
  TC-28 | ✅ AI — one Undo reverts title + rule, Redo restores | T1 + T2: Option title "U1" + rule "B is any of 1" → Save → form preview T1 "U1", T2 "U1" → Undo once → T1 hidden again (old rule A = 2), T2 "Mix" → Redo → "U1" / "U1" → Undo → Save & Close → T1 / T2 = pre-edit snapshot (titles + dependencies)
  ```

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

### CLAIM-17

- **Statement:** Bulk set cùng Option title cho N layer: cho trùng, không tự đánh số; storefront hiện N field cùng tiêu đề.
- **Object / feature:** artwork/MỚI: layer-bulk-edit — Thuộc: modal Bulk edit nhiều layer trong artwork editor (điều kiện selection, tập field chung, touched-only, tri-state, Conditional và Populate trong modal, undo, ghi vào editor); Không thuộc: action bar và menu More (editor-layer-workspace), panel single-layer của từng type (layer-config-*), lưu artwork phía server (artwork-save-persist) (liên quan: sdk)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner / staff (cấu hình) + buyer (form storefront); portal · storefront
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** PO (huyen.chu), 2026-08-28
- **Locator:** Jira TIB-5299, comment 49367 (PO), mục "B5 — Option title trùng, không tự uniquify", xác nhận trên câu trả lời B5 của dev ở comment 49205 | Link: https://ownego.atlassian.net/browse/TIB-5299?focusedCommentId=49367 | Ngày, build: 2026-08-28 | Bổ trợ: TC-30 ⏸️ 2026-10-29 thấy 2 field cùng tiêu đề trên storefront. Key cart 'Your name' / 'Your name 1' chỉ quan sát 1 lần, TC chưa PASS, không đề xuất (CCR cũ: CBS-025 CLAIM-17)
- **Trích nguyên văn:**
  ```
  PO (2026-08-28):
  **B5 — Option title trùng, không tự uniquify**
  Xác nhận giữ nguyên hành vi cũ
  
  Dev (2026-08-27, B5):
  → Không. Hệ thống cho phép trùng, N layer sẽ mang cùng form_label. (Prop :unique-name="false" trong code chỉ liên quan tới id/name của thẻ input trên DOM, không phải uniquify option title.) Trên storefront sẽ ra N form field cùng tiêu đề, không merge. Flow cũ (Bulk edit option title) cũng hành xử đúng như vậy.
  ```

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

### CLAIM-20

- **Statement:** Selection không có setting chung → modal hiện empty state "No settings are shared across the selected layers"; mục Bulk edit trên menu vẫn bật.
- **Object / feature:** artwork/MỚI: layer-bulk-edit — Thuộc: modal Bulk edit nhiều layer trong artwork editor (điều kiện selection, tập field chung, touched-only, tri-state, Conditional và Populate trong modal, undo, ghi vào editor); Không thuộc: action bar và menu More (editor-layer-workspace), panel single-layer của từng type (layer-config-*), lưu artwork phía server (artwork-save-persist)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner / staff; portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** PO (huyen.chu), 2026-08-28
- **Locator:** Jira TIB-5299, comment 49367, mục "B4 — Selection không có setting chung" | Link: https://ownego.atlassian.net/browse/TIB-5299?focusedCommentId=49367 | Ngày, build: 2026-08-28 | QA không tái hiện được với dữ liệu thật (TC-22 ⏸️ 2026-10-29, 2026-10-30); chuỗi chỉ thấy trong bundle (artwork_editor.bulk_edit_empty). Vế 'mục menu vẫn bật' chỉ có ở dev summary 49895, PO không nói. 'Save bị disable' (dev summary) chưa ai thấy (CCR cũ: CBS-025 CLAIM-20)
- **Trích nguyên văn:**
  ```
  **B4 — Selection không có setting chung**
  Thêm empty state: *"No settings are shared across the selected layers”*
  ```

### CLAIM-21

- **Statement:** Known limitation: field cùng tên nhưng khác kiểu giữa các layer type bị loại khỏi modal, không có thông báo.
- **Object / feature:** artwork/MỚI: layer-bulk-edit — Thuộc: modal Bulk edit nhiều layer trong artwork editor (điều kiện selection, tập field chung, touched-only, tri-state, Conditional và Populate trong modal, undo, ghi vào editor); Không thuộc: action bar và menu More (editor-layer-workspace), panel single-layer của từng type (layer-config-*), lưu artwork phía server (artwork-save-persist)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner / staff; portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** Dev (tuanva), 2026-09-04, không ai xác nhận
- **Locator:** Jira TIB-5299, comment 49895 (dev summary), mục "Known limitations"; câu hỏi QA PENDING-04 chưa có trả lời | Link: https://ownego.atlassian.net/browse/TIB-5299?focusedCommentId=49895 | Ngày, build: 2026-09-04 (ngày comment) | Chỉ có trong dev summary, câu hỏi QA PENDING-04 chưa ai trả lời, QA chưa thử (Phần 4.2) (CCR cũ: CBS-025 CLAIM-21)
- **Trích nguyên văn:**
  ```
  Field cùng tên nhưng khác kiểu (type) giữa các layer type sẽ bị loại khỏi modal âm thầm, không có thông báo.
  ```

### CLAIM-22

- **Statement:** Bulk edit không có design settings font / color / size; yêu cầu bulk font, color, size nằm ngoài scope của PR này.
- **Object / feature:** artwork/MỚI: layer-bulk-edit — Thuộc: modal Bulk edit nhiều layer trong artwork editor (điều kiện selection, tập field chung, touched-only, tri-state, Conditional và Populate trong modal, undo, ghi vào editor); Không thuộc: action bar và menu More (editor-layer-workspace), panel single-layer của từng type (layer-config-*), lưu artwork phía server (artwork-save-persist)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner / staff; portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (tuanva), 2026-08-27
- **Locator:** Jira TIB-5299, comment 49205, mục C5 (trả lời câu QA "Có gì được tuyên bố out of scope (ví dụ: bulk edit design settings như font/color/size …)?") | Link: https://ownego.atlassian.net/browse/TIB-5299?focusedCommentId=49205 | Ngày, build: 2026-08-27 | Statement cố ý chỉ giữ vế không có font / color / size theo lưu ý của CCR cũ; vế 'Design settings chỉ gồm text, clipart, grouped_clipart, default_value' lệch với CLAIM-14 nên không đề xuất (CCR cũ: CBS-025 CLAIM-22)
- **Trích nguyên văn:**
  ```
  Câu hỏi QA: "Có gì được tuyên bố out of scope (ví dụ: bulk edit design settings như font/color/size …)?"
  
  → Out of scope trong PR này: bulk edit Design settings kiểu font / color / size. Panel "Design settings" của bulk hiện chỉ gồm text, clipart, grouped_clipart, default_value (bulkSchema.js:17). Yêu cầu bulk font/color/size mà khách nêu ở TIB-5028 chưa nằm trong scope này.
  ```

### CLAIM-23

- **Statement:** Known issue (có từ trước, không thuộc ticket): Option title và Add instruction được chèn như HTML trên form storefront và form preview portal (`<b>`, `<img>` hiện thật; `<script>` và `onerror` bị bỏ, không chạy script).
- **Object / feature:** artwork/layer-common-config (liên quan: sdk)
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (form storefront) + store owner / staff (form preview portal); storefront · portal
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA (phuongbb), 2026-10-29, không ai xác nhận
- **Locator:** QA-3419 — TC-35 ❌ trong `result_QA-3419_security_2026-10-23.md`, `result_QA-3419_retest_2026-10-24.md`, `result_QA-3419_retest2_2026-10-29.md`; TC-35 ⏭️ sau đó (`result_QA-3419_TC35-skip_2026-10-29.md`); Jira comment 55846 (dev) | Link: https://ownego.atlassian.net/browse/TIB-5299?focusedCommentId=55846 | Ngày, build: 2026-10-29 (lần quan sát cuối, build `assets/index.BFN2fMjC.js`); dev nhắc 2026-10-28 | KNOWN ISSUE, KHÔNG dùng làm expected (Phần 4.2). Dev chỉ nói không liên quan ticket, chưa ai nói đây là đúng. Feature và object phụ theo đề xuất CCR cũ, chưa rõ (CCR cũ: CBS-025 CLAIM-24)
- **Trích nguyên văn:**
  ```
  TC-35 (2026-10-29) | ❌ AI — retest: Option title / Add instruction still rendered as HTML (portal form preview + storefront) | … Portal form preview: heading `<span><b>BOLD title</b> <img src="x"> ${7*7}</span>`, hint `<u>underlined</u> <img src="x">`. Storefront (campaign [id] synced): heading `<span><b>BOLD title</b> <img src="x"> ${7*7}</span>`, hint `<div class="tee-text-muted tee-font-italic tee-input-hint"><u>underlined</u> <img src="x"></div>`, 2 broken `<img src="x">`; placeholder literal; no `49`; no `<script>` with xss-test-QA; console: no `1` / `xss-test-QA`
  
  Dev (2026-10-28): Còn 1 điểm bảo mật (HTML injection ở Option Title/Add instruction) QA phát hiện kèm theo nhưng không liên quan tới ticket này, mình để riêng ra, không gộp vào đây.
  ```

### CLAIM-24

- **Statement:** Live Preview trong Portal artwork editor dùng teeinblue-sdk qua git submodule teeinblue-portal/src/sdk, nên chỉ có fix TIB-5412 sau khi submodule được bump riêng.
- **Object / feature:** artwork/editor-layer-workspace (liên quan: sdk)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff (Live Preview); portal
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** Dev (chauptm) viết, không ai xác nhận, 2026-09-23
- **Locator:** Jira TIB-5412 comment 51755 mục Notes, gạch đầu dòng 2. Đã bump chưa: không rõ (Q1 không có trả lời); không đề xuất "đã có fix" hay "chưa có". QA Hub TC-13 ở passed, không ghi SHA submodule, không kết quả. (CCR cũ: CBS-032 CLAIM-05)
- **Trích nguyên văn:**
  ```
  - `teeinblue-portal/src/sdk` is a git submodule pointing to `teeinblue-sdk`; its submodule pointer needs to be bumped separately after this PR merges so the portal's live preview picks up the fix.
  ```
