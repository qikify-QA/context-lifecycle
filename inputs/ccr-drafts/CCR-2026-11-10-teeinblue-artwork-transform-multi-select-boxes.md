# Context Change Request: artwork-transform-multi-select-boxes — box cá nhân và box nhóm, lock/hide, text, Delete, Align, Group layer

- **Product:** `teeinblue`
- **Object:** `artwork`
- **Ticket:** `TIB-5355 (QA-3361)`
- **Các khối có trong file:** `A`

## Mức độ gấp

`MEDIUM` — ảnh hưởng coverage: canon chưa có check nào về multi-select; Proposal gốc không chọn mức gấp, mức này do người soạn lại đề xuất.

# Khối A — Hành vi

### CLAIM-01

- **Statement:** Multi-selection + lock/hide MỘT layer giữa chừng: layer đó VẪN nằm trong selection (đếm 'N selected' không đổi), chỉ box cá nhân của nó biến mất; group box KHÔNG bao layer locked/hidden và co lại theo thời gian thực khi lock/hide/unlock/unhide; stepper +/- ở ô Top/Left/Width/Height chỉ áp cho layer không locked/hidden
- **Object / feature:** MỚI: transform-multi-select — Thuộc: box cá nhân/box nhóm và hành vi selection khi chọn nhiều layer trong artwork editor AW2.0 (lock/hide, sửa text, Delete, Align, layer con của Group layer). Không thuộc: Apply for và ô số (file artwork-transform-apply-mode), Flip nhóm (file artwork-transform-group-flip).
- **Quan hệ với canon:** `ADD`
- **Scope:** seller (owner/staff); portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** AI chạy ([AI]); chạy sau lần dev giao QA 2026-09-14, không có bug fix sau đó, 2026-09-23
- **Locator:** QA-3361 TC-13 (release-verification.md, production) · TC-13/14/28 (results B4_2026-09-16) · TC-32 (results B5_2026-09-17); product_facts.md dòng 170, 178, 179 (FACT-063) | https://ownego.atlassian.net/browse/TIB-5355 · https://ownego.atlassian.net/browse/QA-3361 | build hash: không rõ (QA không có quyền repo) (CCR cũ: CBS-043 CLAIM-07)
- **Căn cứ expected:** KHÔNG CÓ (khuôn cũ không ghi ticket, comment hay câu trả lời PO/Dev mà expected của TC dựa vào)
- **Trích nguyên văn:**
  ```
  QA-3361 TC-13 (release-verification.md — Staging ✅ · Production ✅): Chọn T1+T2+T3 (3 frame). Khoá T2 qua icon lock trên layer panel (đang chọn, không đổi selection): vẫn "3 selected", frame còn lại **2** (T2 mất box, T1/T3 giữ nguyên) — khớp hành vi đã chốt (layer khoá vẫn trong selection, chỉ mất box riêng). Mở khoá lại → khôi phục
  QA-3361 TC-13 (result_QA-3361_B4_2026-09-16): ✅ AI — locked layer excluded, group box shrinks — Lock `TC` (dưới cùng) → chọn TA+TB+TC: selected=[TC,TB,TA] (TC vẫn `--active --locked`), Individual=true, frames=2 [482,631.5,140,30],[482,687.5,140,30] (TA, TB) — không có frame tại y 743.5 của TC; `.drr` [482,631.5,140,**86**] = TA top → TB bottom (3 layer không lock là 142) → loại hình học TC
  QA-3361 TC-28 (result_QA-3361_B4_2026-09-16): ✅ AI — live transitions, no reselect — 3 chọn: frames=3, drr h=142. **Lock TA** (trên cùng): frames=2 [687.5],[743.5], drr [482,687.5,140,86] (bắt đầu từ TB, loại TA); không frame sót tại 631.5. **Unlock TA**: frames=3, drr h=142. **Hide TC**: frames=2, `#artwork-board--layer-<id>`=null, drr [482,631.5,140,86]. **Unhide TC**: frames=3, canvas TC trở lại [482,743.5,140,30], drr h=142. selected=[TC,TB,TA] suốt 4 bước, không cần chọn lại, 0 pageerror
  QA-3361 TC-32 (result_QA-3361_B5_2026-09-17): ✅ AI — zoom/pan bám 0px; stepper bỏ qua layer lock — Zoom 32%→50%→200%: `maxDelta(frame,layer)` = 0/0/0 cho TA/TB/TC ở mọi mức (vd 200%: TA layer=[1080,3499.5,1000,211] = frame). Pan wheel (150,200) ở 200%: layer & frame cùng dời về [930,3299.5,…], delta 0. Alt+0 về 32%, delta ≤0.1. Lock `TC` (hàng `--active --locked`, selection vẫn 3): frames còn 2 (TA,TB), `.drr` [628,651.8,160,97.2] chỉ bao 2 layer unlocked. Left field 350; click spin-button ▲ (native `input[type=nu…
  product_facts.md dòng 170: - **Multi-selection + lock/hide MỘT layer giữa chừng: layer đó VẪN nằm trong selection, không bị tự bỏ chọn — user chốt 2026-09-16 (QA-3361).** Chỉ cái box riêng (individual bounding box, TIB-5355) của nó biến mất; selection count và group box không đổi. Áp dụng cho cả lock và hide.
  product_facts.md dòng 178: - **Sửa lại (user đính chính 2026-09-16, QA-3361): group box KHÔNG bao layer đang locked/hidden — dù layer đó vẫn còn trong selection.** Khi multi-select có 1 layer locked/hidden: layer đó vẫn tính là "đang được chọn" (đúng như đã chốt ở trên), nhưng **group box chỉ bao vùng của các layer KHÔNG locked/hidden** — layer bị khoá/ẩn bị loại khỏi phép tính bounding box của group, dù nó vẫn nằm trong danh sách layer đang chọn trên layer list. Group box co lại theo thời gian thực khi lock/hide/unlock/unhide giữa chừng.
  ```

### CLAIM-02

- **Statement:** Individual mode mà selection chỉ còn ĐÚNG 1 layer đủ điều kiện (unlocked + visible): canvas coi như chọn 1 layer — layer list vẫn '2/3 selected' nhưng không vẽ box cá nhân, popover Transform mất radio `Apply for` và hiện Width/Height/Top/Left của chính layer đó, group box co về layer đó; còn ≥2 layer đủ điều kiện thì box cá nhân + radio vẫn có
- **Object / feature:** MỚI: transform-multi-select — Thuộc: box cá nhân/box nhóm và hành vi selection khi chọn nhiều layer trong artwork editor AW2.0 (lock/hide, sửa text, Delete, Align, layer con của Group layer). Không thuộc: Apply for và ô số (file artwork-transform-apply-mode), Flip nhóm (file artwork-transform-group-flip).
- **Quan hệ với canon:** `ADD`
- **Scope:** seller (owner/staff); portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** AI chạy ([AI]); ghi chú 'dev chốt by design 2026-09-16' là theo QA, chưa trích được quote dev, 2026-09-16
- **Locator:** QA-3361 TC-34 · TC-14 (results/result_QA-3361_B4_2026-09-16.md); product_facts.md dòng 183 (FACT-063) | https://ownego.atlassian.net/browse/TIB-5355 · https://ownego.atlassian.net/browse/QA-3361 | build hash: không rõ (QA không có quyền repo) | Ghi chú: Ghi chú 'dev chốt by design 2026-09-16' là theo QA, chưa trích được nguyên văn dev; không coi là dev sign-off. (CCR cũ: CBS-043 CLAIM-08)
- **Căn cứ expected:** KHÔNG CÓ (khuôn cũ không ghi ticket, comment hay câu trả lời PO/Dev mà expected của TC dựa vào)
- **OQ:** NEEDS_CONFIRMATION — Ghi chú "dev chốt by design 2026-09-16" (selection còn đúng 1 layer đủ điều kiện thì canvas coi như chọn 1 layer, mất radio Apply for) là theo QA, chưa trích được quote dev; Dev có xác nhận by design không? — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  QA-3361 TC-34 (result_QA-3361_B4_2026-09-16): ✅ AI — 2 selected + 1 locked ⇒ single-layer behaviour (no individual box, no Apply for), by design — Chọn TA+TB, Individual: frames=2, drr h=86. Lock TB giữ selection: header "2 selected", selected=[TB,TA] (TB `--active --locked`) ✔ ngưỡng ≥2 vẫn đạt; frames=**0** (expected 1 cho TA); `.drr` [482,631.5,140,30] = đúng TA, sticks=5 (không phải UI 1 layer sticks=7) ✔; popover Transform render lại **không còn** `Apply for: Group/Individual`, field = giá trị TA (500×107, top 1696, left 350)
  QA-3361 TC-14 (result_QA-3361_B4_2026-09-16): ✅ AI — hidden/locked excluded; step 5 (1 eligible left) = single-layer behaviour, by design — Hide `TC` → `#artwork-board--layer-<id>` = null (không render), hàng `--active --hidden`; chọn TA+TB+TC: selected 3, frames=2 (TA, TB), `.drr` [482,631.5,140,86] loại TC ✔. **Bước 5** lock `TA`: selected vẫn 3 (TA `--active --locked`), frames=**0** (expected 1 cho TB), `.drr` [482,687.5,140,30] = đúng TB, sticks=5
  product_facts.md dòng 183: - **Individual mode với selection chỉ còn ĐÚNG 1 layer đủ điều kiện (unlocked + visible) → canvas coi như chọn 1 layer — dev chốt 2026-09-16 (QA-3361 BUG-001, by design).** Chọn 2 layer rồi lock/hide 1 (hoặc chọn 3 rồi lock 1 + hide 1): layer list vẫn "2/3 selected", nhưng canvas KHÔNG vẽ box cá nhân cho layer còn lại, popover Transform mất radio `Apply for` và hiện Width/Height/Top/Left của chính layer đó; box nhóm co về đúng layer đó. Còn ≥2 layer đủ điều kiện thì box cá nhân + radio vẫn có (lock/hide chỉ loại layer đó). Đừng báo bug lại case này.
  ```

### CLAIM-03

- **Statement:** Double-click vào 1 text layer để sửa nội dung khi đang multi-select → COLLAPSE selection về đúng layer đó; đổi font size qua toolbar (không vào edit mode) áp cho CẢ selection nhưng ô cỡ chữ `.qte-font-size` BIẾN MẤT HOÀN TOÀN nếu selection không phải 100% text — chỉ khi tất cả layer là text mới thấy ô và giá trị nhập áp cho tất cả text đó
- **Object / feature:** MỚI: transform-multi-select — Thuộc: box cá nhân/box nhóm và hành vi selection khi chọn nhiều layer trong artwork editor AW2.0 (lock/hide, sửa text, Delete, Align, layer con của Group layer). Không thuộc: Apply for và ô số (file artwork-transform-apply-mode), Flip nhóm (file artwork-transform-group-flip).
- **Quan hệ với canon:** `ADD`
- **Scope:** seller (owner/staff); portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA Yến tick [QA] tay trên web 2026-09-17; AI chạy 2026-09-16, 2026-09-17
- **Locator:** QA-3361 TC-30 (results/result_QA-3361_B3_2026-09-16.md, results/result_QA-3361_QA-web_2026-09-17.md); product_facts.md dòng 171–173 (FACT-063) | https://ownego.atlassian.net/browse/TIB-5355 · https://ownego.atlassian.net/browse/QA-3361 | build hash: không rõ (QA không có quyền repo) (CCR cũ: CBS-043 CLAIM-09)
- **Căn cứ expected:** KHÔNG CÓ (khuôn cũ không ghi ticket, comment hay câu trả lời PO/Dev mà expected của TC dựa vào)
- **Trích nguyên văn:**
  ```
  QA-3361 TC-30 (result_QA-3361_B3_2026-09-16): ✅ AI — edit mode collapses to 1; toolbar font size applies to whole selection — Bước 1 (18:00): T plain + P photo, Individual, frames=2. Dblclick T plain trên canvas → selected=[T plain] (collapse về 1), frames=0, `.drr` 1 layer sticks=7, activeElement=`.artwork-layer-text--inplace-input`; gõ 20 ký tự → `.drr` 135×27.6 (autoscale); click canvas trống → thoát edit; chọn lại 2 layer → frames 2 + `.drr` — Individual hoạt động lại. **Bước 2 (21:35, REPL 9334)**: `T plain` + `TA` (cả 2 font 90), Individual, frames [482,183.5,140,30],[482,631.5,140,30], drr h=478. Ô cỡ chữ toolbar `.qinline-value:visible` = 90 → nhập 150 + Enter (không vào edit mode): frames **cả 2** thành 140×50.7 (y 173.2 / 621.2, cao lên vì font lớn hơn; width 140 giữ vì text layer fixed-width autoscale), …
  QA-3361 TC-30 (result_QA-3361_QA-web_2026-09-17): ✅ QA — re-checked by eye on web
  product_facts.md dòng 172: - **Đổi font size qua toolbar (KHÔNG double-click vào edit mode) khi đang multi-select nhiều layer → áp dụng cho CẢ selection — user chốt 2026-09-16 (QA-3361).** Trừ layer type không hỗ trợ font size (warp text, shape, …) thì layer đó không đổi theo.
  product_facts.md dòng 173: - **SỬA LẠI/CHI TIẾT (đo thật 2026-09-17, QA-3361/TC-30): ô cỡ chữ toolbar (`.qte-font-size`) KHÔNG "hiện nhưng không ảnh hưởng" khi selection có layer không hỗ trợ — nó BIẾN MẤT HOÀN TOÀN nếu selection không phải 100% text.** Chọn text+photo → cả `.qte-font-size` không hiện, không có ô `.qinline-value` nào để gõ. Chỉ khi TẤT CẢ layer trong selection đều là text thì mới thấy ô, và giá trị nhập áp cho tất cả các text đó cùng lúc. Đây là hành vi toolbar có sẵn của editor, không riêng gì TIB-5355.
  ```

### CLAIM-04

- **Statement:** Box cá nhân (`.artwork-layer-frame`) và box nhóm (`.drr`) CÙNG MÀU `#00c4cc` nhưng KHÁC KIỂU NÉT: box cá nhân solid 1px, box nhóm (`.drr::before`) dashed 2px; cả hai `pointer-events:none`, không box-shadow
- **Object / feature:** MỚI: transform-multi-select — Thuộc: box cá nhân/box nhóm và hành vi selection khi chọn nhiều layer trong artwork editor AW2.0 (lock/hide, sửa text, Delete, Align, layer con của Group layer). Không thuộc: Apply for và ô số (file artwork-transform-apply-mode), Flip nhóm (file artwork-transform-group-flip).
- **Quan hệ với canon:** `ADD`
- **Scope:** seller (owner/staff); portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** AI chạy ([AI]), 2026-09-17
- **Locator:** QA-3361 TC-16 (results/result_QA-3361_B5_2026-09-17.md); product_facts.md dòng 174 (FACT-063) | https://ownego.atlassian.net/browse/TIB-5355 · https://ownego.atlassian.net/browse/QA-3361 | build hash: không rõ (QA không có quyền repo) (CCR cũ: CBS-043 CLAIM-10)
- **Căn cứ expected:** KHÔNG CÓ (khuôn cũ không ghi ticket, comment hay câu trả lời PO/Dev mà expected của TC dựa vào)
- **Trích nguyên văn:**
  ```
  QA-3361 TC-16 (result_QA-3361_B5_2026-09-17): ✅ AI — cùng màu, khác kiểu nét (solid 1px vs dashed 2px) — TB top 1897→1747 (chồng 16px lên TA). Frames [628,651.5,160,34] + [628,667.5,160,34], `.drr` [628,651.5,160,50]. Computed: frame `border: 1px solid rgb(0,196,204)`, `.drr::before border: 2px dashed rgb(0,196,204)`, cả hai `pointer-events:none`, không box-shadow
  product_facts.md dòng 174: - **Box cá nhân (individual, TIB-5355) và box nhóm (group, `.drr`) CÙNG MÀU `#00c4cc` nhưng KHÁC KIỂU NÉT — đo thật 2026-09-17 (QA-3361/TC-16).** Box cá nhân = `.artwork-layer-frame`, viền **solid 1px**. Box nhóm = `.drr::before`, viền **dashed 2px**. Cả hai `pointer-events:none`, không box-shadow. Kiểu nét khác nhau đủ để phân biệt 2 loại box khi chồng lên nhau, dù màu giống hệt.
  ```

### CLAIM-05

- **Statement:** Phím Delete xoá TOÀN BỘ multi-selection cùng lúc (không có cách xoá riêng 1 layer khi vẫn giữ các layer khác đang chọn); Undo khôi phục cả nhóm
- **Object / feature:** MỚI: transform-multi-select — Thuộc: box cá nhân/box nhóm và hành vi selection khi chọn nhiều layer trong artwork editor AW2.0 (lock/hide, sửa text, Delete, Align, layer con của Group layer). Không thuộc: Apply for và ô số (file artwork-transform-apply-mode), Flip nhóm (file artwork-transform-group-flip).
- **Quan hệ với canon:** `ADD`
- **Scope:** seller (owner/staff); portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** AI chạy ([AI]); phần 'không có cách xoá riêng 1 layer' là lời QA chốt, TC không kiểm riêng, 2026-09-16
- **Locator:** QA-3361 TC-33 (results/result_QA-3361_B4_2026-09-16.md); product_facts.md dòng 175 (FACT-063) | https://ownego.atlassian.net/browse/TIB-5355 · https://ownego.atlassian.net/browse/QA-3361 | build hash: không rõ (QA không có quyền repo) (CCR cũ: CBS-043 CLAIM-11)
- **Căn cứ expected:** KHÔNG CÓ (khuôn cũ không ghi ticket, comment hay câu trả lời PO/Dev mà expected của TC dựa vào)
- **OQ:** NEEDS_CONFIRMATION — Phần "không có cách xoá riêng 1 layer khi vẫn giữ các layer khác đang chọn" chỉ là lời QA chốt, TC không kiểm riêng; Dev/PO có xác nhận không? — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  QA-3361 TC-33 (result_QA-3361_B4_2026-09-16): ✅ AI — all-locked: no box, no crash; Delete xoá cả 3; Undo khôi phục 3 layer (selection rỗng như baseline 1 layer) — **Bước 1** lock TA+TB, chọn 2: selected=[TB,TA], frames=0, `.drr` `drr--inactive` ẩn rect [0,0,0,0] (= không box nhóm), toolbar Transform không mở được (nút không hiện khi cả selection lock), 0 pageerror. **Bước 3** chọn TA+TB+TC (frames=3) → phím Delete (focus BODY, ngay sau chọn ở panel): rows 13→10, selected=[], frames=0, drr ẩn. **Bước 4** Ctrl+Z: rows 13, đủ TA/TB/TC; selected=[] → frames=0; chọn lại 3 → frames=3 + drr h=142. Baseline: xoá 1 layer TA rồi Ctrl+Z cũng selected=[] → undo không…
  product_facts.md dòng 175: - **Phím Delete xoá TOÀN BỘ multi-selection cùng lúc, không có cách xoá riêng 1 layer trong khi vẫn giữ các layer khác đang chọn — user chốt 2026-09-16 (QA-3361).**
  ```

### CLAIM-06

- **Statement:** Align (Align Left/Center/…) dùng target riêng 'Align to:', KHÔNG liên quan radio `Apply for`; TIB KHÔNG có shortcut Ctrl+D (Duplicate layer); TIB KHÔNG có phím tắt mũi tên để nudge layer — cách di chuyển bằng số là nút +/- (stepper) trên các ô input Transform
- **Object / feature:** MỚI: transform-multi-select — Thuộc: box cá nhân/box nhóm và hành vi selection khi chọn nhiều layer trong artwork editor AW2.0 (lock/hide, sửa text, Delete, Align, layer con của Group layer). Không thuộc: Apply for và ô số (file artwork-transform-apply-mode), Flip nhóm (file artwork-transform-group-flip).
- **Quan hệ với canon:** `ADD`
- **Scope:** seller (owner/staff); portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA Yến (user chốt) — không phải PO/Dev, 2026-09-16
- **Locator:** product_facts.md dòng 176, 177, 179 (FACT-063) | https://ownego.atlassian.net/browse/TIB-5355 · https://ownego.atlassian.net/browse/QA-3361 (CCR cũ: CBS-043 CLAIM-12)
- **OQ:** NEEDS_CONFIRMATION — Align dùng target riêng "Align to:", không có Ctrl+D và không có phím mũi tên nudge chỉ là QA chốt, không có nguồn PO/Dev và chưa có TC; Dev có xác nhận không? — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  product_facts.md dòng 176: - **Align (Align Left/Center/…) dùng target riêng "Align to:", KHÔNG liên quan tới radio `Apply for: Group/Individual` ở Transform — user chốt 2026-09-16 (QA-3361).** Đừng gộp 2 tính năng này khi viết TC.
  product_facts.md dòng 177: - **TIB KHÔNG có shortcut Ctrl+D (Duplicate layer) — user chốt 2026-09-16 (QA-3361).** Đừng viết TC dùng Ctrl+D.
  product_facts.md dòng 179: - **TIB KHÔNG có phím tắt mũi tên (arrow key) để nudge layer — user chốt 2026-09-16 (QA-3361).** Cách di chuyển bằng số là nút tăng/giảm (+/-, "stepper") ngay trên các ô input (Top/Left/Width/Height…) trong Transform panel. Stepper này áp dụng cho **TẤT CẢ layer đang được chọn mà KHÔNG locked/hidden** — layer locked/hidden trong cùng selection không bị dịch theo (nhất quán với việc chúng bị loại khỏi group box).
  ```

### CLAIM-07

- **Statement:** Chọn được layer CON bên trong một Group layer qua layer panel (Ctrl/Shift-click child không tự nâng lên chọn cả Group cha; mỗi child có individual box riêng); ngược lại chọn CHÍNH Group layer (container) tự kéo theo toàn bộ child vào selection ('3 selected' với Group 1 có 2 child), container KHÔNG BAO GIỜ có `.artwork-layer-frame`, group box `.drr` bao union của mọi layer trong selection và luôn axis-aligned dù có layer đã xoay
- **Object / feature:** MỚI: transform-multi-select — Thuộc: box cá nhân/box nhóm và hành vi selection khi chọn nhiều layer trong artwork editor AW2.0 (lock/hide, sửa text, Delete, Align, layer con của Group layer). Không thuộc: Apply for và ô số (file artwork-transform-apply-mode), Flip nhóm (file artwork-transform-group-flip).
- **Quan hệ với canon:** `ADD`
- **Scope:** seller (owner/staff); portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** AI chạy ([AI]); 'dev chốt RQ5 2026-09-16' theo ghi chú QA, chưa trích được quote dev, 2026-09-16
- **Locator:** QA-3361 TC-36 · TC-6 (results/result_QA-3361_B2_2026-09-16.md); product_facts.md dòng 184–185 (FACT-063) | https://ownego.atlassian.net/browse/TIB-5355 · https://ownego.atlassian.net/browse/QA-3361 | build hash: không rõ (QA không có quyền repo) | Ghi chú: Ghi chú 'dev chốt RQ5 2026-09-16' là theo QA, chưa trích được nguyên văn dev; không coi là dev sign-off. (CCR cũ: CBS-043 CLAIM-13)
- **Căn cứ expected:** KHÔNG CÓ (khuôn cũ không ghi ticket, comment hay câu trả lời PO/Dev mà expected của TC dựa vào)
- **OQ:** CONFLICT — Chọn layer con trong Group layer, và box của Group layer container. Side A: RQ13 (dev trả lời 2026-09-16) "individual box của group layer = union bbox của child" / Side B: số đo 2026-09-17 (TC-6) container không bao giờ có .artwork-layer-frame, chỉ child có box riêng; ngoài ra "dev chốt RQ5" theo QA chưa trích được quote dev. Dev xác nhận bên nào? — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  QA-3361 TC-36 (result_QA-3361_B2_2026-09-16): ✅ AI — group children — Expand Group 1 (`.la-angle-right`). G1 alone: "1 selected", `.drr` [781,629.5,135,23] sticks=7 · G2 alone: [781,683.5,135,23]. Cmd-click G1+G2: "2 selected" = [G2,G1] — **Group 1 KHÔNG bị chọn**; Individual → 2 frame [781,683.5,135,23],[781,629.5,135,23] trùng oracle 0px; `.drr` [781,629.5,135,77] chỉ bao 2 child
  QA-3361 TC-6 (result_QA-3361_B2_2026-09-16): ✅ AI — 6 leaf type khớp oracle 0px; Group layer container không có box riêng, chỉ child có (chốt đúng thiết kế) — Oracle 1-layer (`.drr`): T plain [470.5,194.5,135,29] · T rot30 [782.8,176.2,131.4,92.6] rotate(30deg) · CT curve [474.5,348,127,103.4] · C clipart [781,303.5,108,108] · P photo [430,465.5,108,108] · V vector [592,465.5,108,108] · Group 1 = `.drr` union [781,629.5,135,77] + 2 child frame. Chọn cả 7 (9 selected: Group 1 kéo theo G1+G2) + Individual → **8 frame**: 6 leaf rect+style **trùng 0px** với oracle (kể cả `tran…
  product_facts.md dòng 184: - **Chọn được layer CON bên trong một Group layer (layer nhóm/nested) qua layer panel — dev chốt 2026-09-16 (QA-3361, RQ5).** Expand Group trên layer panel rồi Ctrl/Shift-click các child KHÔNG tự nâng selection lên chọn cả Group cha. Mỗi child được chọn xử lý như layer thường (có individual box riêng ở Individual mode theo type của chính nó).
  product_facts.md dòng 185: - **Ngược lại: chọn CHÍNH Group layer (container) trên layer panel = tự động kéo theo TOÀN BỘ child vào selection — đo thật 2026-09-17 (QA-3361/TC-6).** Container không bao giờ tự chọn được "một mình" theo nghĩa opaque — chọn Group 1 (có 2 child) ra "3 selected". Container KHÔNG BAO GIỜ có `.artwork-layer-frame` (individual box) dù ở chế độ nào — chỉ 2 child có box riêng (giống hệt khi chọn thẳng child, xem RQ5 ở trên). Group box (`.drr`) bao union của MỌI layer trong selection (leaf + child của Group), luôn axis-aligned dù có layer đã xoay. **Sửa lại RQ13** (2026-09-16, dev trả lời "individual box của group layer = union bbox của child") — câu đó không chính xác: không có "individual box của group layer" nào cả, chỉ có box của từng child.
  ```
