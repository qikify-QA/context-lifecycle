# Context Change Request: artwork-transform-apply-mode — Apply for Group/Individual, AW1.0 vs AW2.0, ô số Transform, preference per-account

- **Product:** `teeinblue`
- **Object:** `artwork`
- **Ticket:** `TIB-5197, TIB-5397, TIB-5355 (QA-3361, QA-3363)`
- **Các khối có trong file:** `A`

## Mức độ gấp

`MEDIUM` — ảnh hưởng coverage: canon chưa có check nào cho popover Transform; Proposal gốc không chọn mức gấp, mức này do người soạn lại đề xuất.

# Khối A — Hành vi

### CLAIM-01

- **Statement:** `Apply for: Group / Individual` trong Transform popover chỉ support AW 2.0: chọn ≥2 layer → có radio; ở Individual, Width hiện width thật của từng layer (hoặc `Mixed` khi khác nhau); group width được tính lại từ bounding box của selection (mép trái layer trái nhất → mép phải layer phải nhất) sau mỗi lần đổi width của layer bất kỳ
- **Object / feature:** MỚI: transform-multi-select — Thuộc: popover Transform khi chọn nhiều layer trong artwork editor (Apply for Group/Individual, AW1.0 vs AW2.0, ô Width/Height/Top/Left, preference per-account). Không thuộc: Flip nhóm (file artwork-transform-group-flip), box và selection (file artwork-transform-multi-select-boxes).
- **Quan hệ với canon:** `ADD`
- **Scope:** seller (owner/staff); portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** AI chạy ([AI]) trên production, chưa có tick [QA] tay; mô tả của dev tuanva (reporter TIB-5397), 2026-09-28
- **Locator:** QA-3363 TC-9 · TC-8 (outputs/QA-3363/release-verification.md, store <store-production> production); product_facts.md dòng 165–166 (FACT-063) | https://ownego.atlassian.net/browse/TIB-5397 · https://ownego.atlassian.net/browse/TIB-5197 · https://ownego.atlassian.net/browse/QA-3363 | build hash: không rõ (QA không có quyền repo) | Ghi chú: Số đo cụ thể trong fixture không phải spec. (CCR cũ: CBS-043 CLAIM-01)
- **Căn cứ expected:** Mô tả của dev (không phải xác nhận), nằm trong khối trích nguyên văn: TIB-5397 description (tuanva, 2026-09-03), mục Case: "Artwork 2.0 already behaves correctly: with multiple layers selected in Individual mod…
- **Trích nguyên văn:**
  ```
  QA-3363 TC-9 (release-verification.md — Staging ✅ · Production ✅): Lượt 2 — AW2.0 #<id> (fixture riêng), 2 layer width 150/250: radio Individual (theo preference tài khoản), Width field trống + placeholder "Mixed" (không 0/stale); sửa riêng 1 layer không ảnh hưởng layer kia; re-select tính lại đúng ngay.
  QA-3363 TC-8 (release-verification.md — Staging ✅ · Production ✅): AW2.0 mới tạo, 2 layer, chọn cả 2, Transform: `Apply for: Group/Individual` vẫn hiện diện đúng label/help text. BR-4 giữ nguyên trên prod.
  TIB-5397 description (tuanva, 2026-09-03), mục Case: "Artwork 2.0 already behaves correctly: with multiple layers selected in Individual mode, Width shows the common width, or Mixed when the selected layers differ; and the group width is recomputed from the selection's bounding box (left edge of the left-most layer to the right edge of the right-most layer) after any layer width change."
  product_facts.md dòng 165: - [FACT-063] **Chế độ `Apply for: Group / Individual` trong Transform popover chỉ support ARTWORK 2.0.** User chốt 2026-09-10 khi sửa Solution của TIB-5397.
  product_facts.md dòng 166: - **AW 2.0 — ĐÃ LÀM XONG Ở TIB-5197, TIB-5397 không đụng gì tới 2.0 (dùng làm expected result khi test regression):** chọn ≥2 layer → có `Apply for: Group / Individual`. Ở `Individual`, `Width` hiện width thật của từng layer (bằng auto-scale max width), hoặc `Mixed` khi các layer khác nhau; group width được **tính lại từ bounding box của selection** (mép trái của layer trái nhất → mép phải của layer phải nhất) sau mỗi lần đổi width của bất kỳ layer nào.
  ```

### CLAIM-02

- **Statement:** AW 1.0: gỡ hẳn `Apply for: Group / Individual` khỏi popover Transform; chọn nhiều layer chỉ còn Width/Height/Top/Left/Rotate + Fit to canvas + Flip H/V (như trước TIB-5197); seller 1.0 vẫn chỉnh auto-scale max width từng layer; editor AW 1.0 vẫn còn tồn tại (chỉ control bị gỡ)
- **Object / feature:** MỚI: transform-multi-select — Thuộc: popover Transform khi chọn nhiều layer trong artwork editor (Apply for Group/Individual, AW1.0 vs AW2.0, ô Width/Height/Top/Left, preference per-account). Không thuộc: Flip nhóm (file artwork-transform-group-flip), box và selection (file artwork-transform-multi-select-boxes).
- **Quan hệ với canon:** `ADD`
- **Scope:** seller (owner/staff); portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** AI chạy ([AI]) trên production; mô tả của dev tuanva, 2026-09-23
- **Locator:** QA-3363 TC-1 · TC-7 (outputs/QA-3363/release-verification.md, production); product_facts.md dòng 167, 181 (FACT-063) | https://ownego.atlassian.net/browse/TIB-5397 · https://ownego.atlassian.net/browse/QA-3363 | build hash: không rõ (QA không có quyền repo) | Ghi chú: Ngoài ra: câu 'không test Artwork 1.0 nữa' trong knowledge QA là quy tắc quy trình test, không đưa vào KB. (CCR cũ: CBS-043 CLAIM-02)
- **Căn cứ expected:** Mô tả của dev (không phải xác nhận), nằm trong khối trích nguyên văn: TIB-5397 description (reporter tuanva — dev, tạo 2026-09-03), mục Solution: "Artwork 1.0 — do not fix the Width = 0 / stale group width beha…
- **Trích nguyên văn:**
  ```
  QA-3363 TC-1 (release-verification.md — Staging ✅ · Production ✅): AW1.0 #<id>, chọn 2 layer (Meta+click — đúng fix đã áp dụng cho staging, hoạt động y hệt trên prod): popover chỉ còn Width/Height/Top/Left/Rotate/Fit to canvas/Flip H/Flip V, **0** control Apply for.
  QA-3363 TC-7 (release-verification.md — Staging ✅ · Production ✅): Lượt 2 — AW1.0 #<id> (fixture riêng), 1 layer text: không control Apply for ở đâu cả; `autoscale_max_width` set qua API áp dụng + persist đúng. BR-3 giữ nguyên trên prod.
  TIB-5397 description (reporter tuanva — dev, tạo 2026-09-03), mục Solution: "Artwork 1.0 — do not fix the Width = 0 / stale group width behaviour. Bring the Transform popover back to its pre-TIB-5197 state: remove the Apply for: Group / Individual setting from Artwork 1.0 so multi-selection behaves exactly as it did before that feature. Sellers on 1.0 keep setting the auto-scale max width per layer."
  TIB-5397 comment tuanva 2026-09-10 "Summary cho QA" (mô tả thay đổi, không phải sign-off): "Artwork editor 1.0: bỏ hẳn phần Apply for: Group / Individual trong popover Transform. Chọn nhiều layer rồi mở Transform sẽ chỉ còn Width/Height/Top/Left/Rotate/Fit to canvas/Flip như trước khi tính năng này được thêm ở TIB-5197."
  product_facts.md dòng 167: - **AW 1.0 — chỗ đang hỏng, nhưng KHÔNG fix theo hướng sửa bug:** ở 1.0 chọn nhiều layer + `Individual` cho `Width = 0` và group width không recalculate. Quyết định: **trả popup Transform của 1.0 về trạng thái trước TIB-5197** — gỡ hẳn setting `Apply for: Group / Individual` khỏi 1.0, multi-selection chạy y như trước khi có feature đó. Seller 1.0 vẫn chỉnh auto-scale max width từng layer (Đỗ Hồng Trang chốt 2026-09-03 Slack; user chốt lại 2026-09-10 khi sửa TIB-5397).
  product_facts.md dòng 181: - **AW1.0 (editor) vẫn còn tồn tại — user chốt 2026-09-16 (QA-3361), đừng nhầm là đã gỡ bỏ hoàn toàn.** Chỉ riêng control `Apply for: Group/Individual` bị gỡ khỏi Transform popover của AW1.0 (theo TIB-5397 ở trên); bản thân AW1.0 editor không biến mất.
  ```

### CLAIM-03

- **Statement:** AW1.0 sau khi gỡ Apply for: sửa Width/Height/Top/Left với nhiều layer chọn = group edit — scale cả khối quanh góc trên-trái của nhóm, giữ tỉ lệ (Width 500→520 ⇒ mọi layer ×1.04); Rotate xoay quanh tâm bounding box nhóm
- **Object / feature:** MỚI: transform-multi-select — Thuộc: popover Transform khi chọn nhiều layer trong artwork editor (Apply for Group/Individual, AW1.0 vs AW2.0, ô Width/Height/Top/Left, preference per-account). Không thuộc: Flip nhóm (file artwork-transform-group-flip), box và selection (file artwork-transform-multi-select-boxes).
- **Quan hệ với canon:** `ADD`
- **Scope:** seller (owner/staff); portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** AI chạy ([AI]); chạy sau BUG-127 (Done) và sau khi sửa lỗi modifier của script test (không phải sửa sản phẩm), 2026-09-23
- **Locator:** QA-3363 TC-4 (release-verification.md, production) · TC-12 · TC-5 (results/result_QA-3363_full_greenline_2026-09-22.md, staging); product_facts.md dòng 180 (FACT-063) | https://ownego.atlassian.net/browse/TIB-5397 · https://ownego.atlassian.net/browse/QA-3363 | build hash: không rõ (QA không có quyền repo) (CCR cũ: CBS-043 CLAIM-03)
- **Căn cứ expected:** KHÔNG CÓ (khuôn cũ không ghi ticket, comment hay câu trả lời PO/Dev mà expected của TC dựa vào)
- **Trích nguyên văn:**
  ```
  QA-3363 TC-4 (release-verification.md — Staging ✅ · Production ✅): Cùng artifact, sửa group Width 500→600 (×1.2): A và B cùng scale đúng tỉ lệ (136px→163.2px mỗi layer), B dịch trái theo đúng công thức neo góc trái nhóm (272→312.8). Group-apply hoạt động đúng trên prod.
  QA-3363 TC-12 (result_QA-3363_full_greenline_2026-09-22): ✅ AI — Group Rotate 90° pivots on group bounding-box center — nt
  QA-3363 TC-5 (result_QA-3363_full_greenline_2026-09-22): ✅ AI — Group-apply Top/Left/Height on A+B — Nạn nhân gián tiếp của corruption từ các lần chạy trước, tự hết khi chạy sạch từ đầu với fix
  product_facts.md dòng 180: - **AW1.0 Transform popover sau TIB-5397 — đo staging 2026-09-16 (QA-3363, aw#<id> schema_version 1):** multi-select chỉ còn Width/Height/Top/Left/Rotate + Fit to canvas + Flip H/V (checkbox, "Only work with Cliparts & Upload photo"); cùng id input `quick-transform-editor-*` như AW2.0. Group edit = scale cả khối quanh góc trên-trái nhóm, giữ tỉ lệ (Width 500→520 ⇒ mọi layer ×1.04); Rotate xoay quanh tâm bbox nhóm; Undo/Redo 1 bước cho cả nhóm. **Fit to canvas neo top-left (không căn giữa) — cả 1.0 lẫn 2.0.** Flip AW1.0 = lật ảnh từng layer tại chỗ (không group-mirror như TIB-4778 AW2.0). Ô số: `0`/âm/rỗng/chữ → layer không đổi nhưng ô vẫn hiện giá trị đó (không revert); `99999`/`12.5`/`1e3` chấp nhận. AW1.0 vẫn ĐỌC preference per-account để vẽ box cá nhân (BUG-001 QA-3363, chờ QA quyết), nhưng không ghi.
  ```

### CLAIM-04

- **Statement:** AW1.0 (đo staging 2026-09-16, aw#<id>): Undo/Redo 1 bước cho cả nhóm; Fit to canvas neo top-left (không căn giữa) — cả 1.0 lẫn 2.0; Flip ở AW1.0 = lật ảnh từng layer tại chỗ (không group-mirror như AW2.0), checkbox ghi 'Only work with Cliparts & Upload photo'; ô số: `0`/âm/rỗng/chữ → layer không đổi nhưng ô vẫn hiện giá trị đó (không revert); `99999`/`12.5`/`1e3` chấp nhận
- **Object / feature:** MỚI: transform-multi-select — Thuộc: popover Transform khi chọn nhiều layer trong artwork editor (Apply for Group/Individual, AW1.0 vs AW2.0, ô Width/Height/Top/Left, preference per-account). Không thuộc: Flip nhóm (file artwork-transform-group-flip), box và selection (file artwork-transform-multi-select-boxes).
- **Quan hệ với canon:** `ADD`
- **Scope:** seller (owner/staff); portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA nội bộ (lượt chạy TC của AI + QA Yến) — không phải PO/Dev, 2026-09-16
- **Locator:** product_facts.md dòng 180 (FACT-063); outputs/QA-3363/results/result_QA-3363_B1_*_2026-09-16.md | https://ownego.atlassian.net/browse/TIB-5397 · https://ownego.atlassian.net/browse/QA-3363 | Ghi chú: Số đo trên fixture AW1.0 staging; không phải spec. (CCR cũ: CBS-043 CLAIM-04)
- **OQ:** NEEDS_CONFIRMATION — Hành vi AW1.0 Transform (undo/redo 1 bước, Fit to canvas neo top-left, Flip từng layer, ô số không revert) chỉ là số đo QA trên fixture staging, không có nguồn PO/Dev; đây có phải hành vi mong muốn không? — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  product_facts.md dòng 180: - **AW1.0 Transform popover sau TIB-5397 — đo staging 2026-09-16 (QA-3363, aw#<id> schema_version 1):** multi-select chỉ còn Width/Height/Top/Left/Rotate + Fit to canvas + Flip H/V (checkbox, "Only work with Cliparts & Upload photo"); cùng id input `quick-transform-editor-*` như AW2.0. Group edit = scale cả khối quanh góc trên-trái nhóm, giữ tỉ lệ (Width 500→520 ⇒ mọi layer ×1.04); Rotate xoay quanh tâm bbox nhóm; Undo/Redo 1 bước cho cả nhóm. **Fit to canvas neo top-left (không căn giữa) — cả 1.0 lẫn 2.0.** Flip AW1.0 = lật ảnh từng layer tại chỗ (không group-mirror như TIB-4778 AW2.0). Ô số: `0`/âm/rỗng/chữ → layer không đổi nhưng ô vẫn hiện giá trị đó (không revert); `99999`/`12.5`/`1e3` chấp nhận. AW1.0 vẫn ĐỌC preference per-account để vẽ box cá nhân (BUG-001 QA-3363, chờ QA quyết), nhưng không ghi.
  QA-3363 TC-4 (result_QA-3363_B1_manual_2026-09-16): ✅ AI — group-apply Width on 2 text layers, undo/redo 1 step, persist after Save & Close, payload has no applyFor — s0 group 720/172/464/40 · T1=[71.31,464.22,57.38×71.57] T2=[40.16,564.22,719.68×71.57] → Width 740: group 740/177/464/40 · T1=[72.19,463.75,59.01×74.51] T2=[40.15,566.57,740.03×74.51] (k=1.0278 cả 2, không re-wrap: 1 dòng/1 layer, ảnh `evidence/pass_TIB-5397_TC-4_aw1_text_group_width740.png`) · Ctrl+Z → về đúng s0 (1 bước) · Ctrl+Shift+Z → về đúng 740 · Save & Close → `PUT /api/artworks/4221` 2713B, regex `applyFor
  ```

### CLAIM-05

- **Statement:** AW1.0 KHÔNG vẽ box cá nhân (`.artwork-layer-frame`) dù account đang lưu preference Individual; trước khi fix, AW1.0 vẫn ĐỌC preference per-account để vẽ box (BUG-001 QA-3363, sau là BUG-127, đã Done) — câu 'chờ QA quyết' trong FACT-063 dòng 180 đã LỖI THỜI
- **Object / feature:** MỚI: transform-multi-select — Thuộc: popover Transform khi chọn nhiều layer trong artwork editor (Apply for Group/Individual, AW1.0 vs AW2.0, ô Width/Height/Top/Left, preference per-account). Không thuộc: Flip nhóm (file artwork-transform-group-flip), box và selection (file artwork-transform-multi-select-boxes).
- **Quan hệ với canon:** `ADD`
- **Scope:** seller (owner/staff); portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** AI chạy ([AI]) sau khi dev fix BUG-127, 2026-09-23
- **Locator:** QA-3363 TC-10 (release-verification.md, production; results/result_QA-3363_TC-10_retest_2026-09-22.md, staging); product_facts.md dòng 180 (FACT-063, câu cuối) | https://ownego.atlassian.net/browse/TIB-5397 · https://ownego.atlassian.net/browse/QA-3363 | build hash: không rõ (QA không có quyền repo) | Ghi chú: Câu cũ 'AW1.0 vẫn đọc preference per-account để vẽ box cá nhân (chờ QA quyết)' của knowledge QA đã lỗi thời sau khi BUG-127 được fix; không đưa lên canon. (CCR cũ: CBS-043 CLAIM-05)
- **Căn cứ expected:** KHÔNG CÓ (khuôn cũ không ghi ticket, comment hay câu trả lời PO/Dev mà expected của TC dựa vào)
- **OQ:** NEEDS_CONFIRMATION — Xác nhận AW1.0 không vẽ box cá nhân sau khi BUG-127 được fix và câu cũ "AW1.0 vẫn đọc preference để vẽ box (chờ QA quyết)" trong FACT-063 không còn áp dụng; có cần giữ việc AW1.0 vẫn đọc preference per-account không? — Người trả lời: QA lead.
- **Trích nguyên văn:**
  ```
  QA-3363 TC-10 (release-verification.md — Staging ✅ · Production ✅): Cùng artifact AW1.0, account đang có preference Individual persisted (xác nhận ở bước TC-8) — đếm `.artwork-layer-frame` = **0** (đúng bug BUG-127 đã fix, trước fix ra 2), console sạch. **Case ưu tiên nhất đã verify xong trên production.**
  QA-3363 TC-10 (result_QA-3363_TC-10_retest_2026-09-22): ✅ AI — retest pass, BUG-127 → Done — `.artwork-selected-layer-editor .artwork-layer-frame` count = 0 (trước fix: 2), preference Individual set trên AW2.0 #<id>, AW1.0 #<id> chọn A+B, popover không có Apply for, console sạch
  product_facts.md dòng 180 (đoạn cuối): AW1.0 vẫn ĐỌC preference per-account để vẽ box cá nhân (BUG-001 QA-3363, chờ QA quyết), nhưng không ghi.
  ```

### CLAIM-06

- **Statement:** 'Group' trong radio `Apply for: Group/Individual` nghĩa là coi CẢ multi-selection trên canvas như một khối; KHÔNG liên quan loại layer `group` (container lồng layer con trên layer list) — hai khái niệm trùng tên nhưng độc lập
- **Object / feature:** MỚI: transform-multi-select — Thuộc: popover Transform khi chọn nhiều layer trong artwork editor (Apply for Group/Individual, AW1.0 vs AW2.0, ô Width/Height/Top/Left, preference per-account). Không thuộc: Flip nhóm (file artwork-transform-group-flip), box và selection (file artwork-transform-multi-select-boxes).
- **Quan hệ với canon:** `ADD`
- **Scope:** seller (owner/staff); portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA Yến (user chốt) — không phải PO/Dev, 2026-09-16
- **Locator:** product_facts.md dòng 169 (FACT-063) | https://ownego.atlassian.net/browse/TIB-5355 · https://ownego.atlassian.net/browse/QA-3361 (CCR cũ: CBS-043 CLAIM-06)
- **OQ:** NEEDS_CONFIRMATION — "Group" trong radio Apply for độc lập với loại layer group chỉ là QA chốt, chưa có nguồn PO/Dev; Dev/PO có xác nhận hai khái niệm không liên quan không? — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  product_facts.md dòng 169: - **`Apply for: Group/Individual` KHÔNG liên quan gì tới "Group layer" (layer nhóm/nested trên layer list) — user chốt 2026-09-16 (QA-3361/TIB-5355).** "Group" ở radio này nghĩa là "coi CẢ multi-selection trên canvas như một khối", KHÔNG phải loại layer `group` (container lồng layer con). Hai khái niệm trùng tên nhưng độc lập hoàn toàn — đừng suy luận hành vi của cái này từ cái kia (vd không có chuyện "chọn layer con bên trong Group layer" liên quan tới radio Group/Individual).
  ```

### CLAIM-07

- **Statement:** Ô Width/Height/Top/Left của Transform: nhập 0 hoặc số âm KHÔNG bị clamp về 1px mà bị BỎ QUA HOÀN TOÀN (ô hiện đúng số vừa gõ nhưng layer không đổi; chọn lại layer thì ô trả về giá trị thật cũ); giá trị nhỏ nhất áp được là 1 (0.5 làm tròn lên 1); 99999 áp cho MỌI layer đang chọn, không có max clamp; chữ không phải số bị `input[type=number]` lọc từ keystroke; để trống rồi blur → trả về giá trị cũ; ô không gọi API khi blur, chỉ khi Save artwork
- **Object / feature:** MỚI: transform-multi-select — Thuộc: popover Transform khi chọn nhiều layer trong artwork editor (Apply for Group/Individual, AW1.0 vs AW2.0, ô Width/Height/Top/Left, preference per-account). Không thuộc: Flip nhóm (file artwork-transform-group-flip), box và selection (file artwork-transform-multi-select-boxes).
- **Quan hệ với canon:** `ADD`
- **Scope:** seller (owner/staff); portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** AI chạy ([AI]); expected của TC được viết lại 2026-09-17 theo số đo (lệch dự đoán 'clamp 1px' của dev ở RQ6), 2026-09-16
- **Locator:** QA-3361 TC-35 (results/result_QA-3361_B3_2026-09-16.md); product_facts.md dòng 187 (FACT-063) | https://ownego.atlassian.net/browse/TIB-5355 · https://ownego.atlassian.net/browse/QA-3361 | build hash: không rõ (QA không có quyền repo) | Ghi chú: Dev dự đoán (RQ6) 0/âm clamp về 1px bị số đo QA bác; chưa ai hỏi lại dev đây là hành vi mong muốn hay lỗi. Số 99999, 0.5 là số đo, không phải spec. (CCR cũ: CBS-043 CLAIM-16)
- **Căn cứ expected:** KHÔNG CÓ (khuôn cũ không ghi ticket, comment hay câu trả lời PO/Dev mà expected của TC dựa vào)
- **OQ:** CONFLICT — Nhập 0 hoặc số âm vào ô Width/Height/Top/Left bị bỏ qua hoàn toàn (ô hiện số vừa gõ, layer không đổi) hay clamp về 1px; chưa ai hỏi lại dev đây là hành vi mong muốn hay lỗi. Side A: dev dự đoán ở RQ6 là clamp về 1px / Side B: số đo QA 2026-09-16 là bỏ qua hoàn toàn, ô hiện stale tới khi chọn lại layer — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  QA-3361 TC-35 (result_QA-3361_B3_2026-09-16): ✅ AI — box luôn khớp giá trị thật, không NaN, không API; lệch RQ6 ở 0/-50 (bỏ qua, không clamp) — T plain(500×107) + P photo(400×400), Individual, `#quick-transform-editor-width` (hiện rỗng = Mixed), nhập + Tab (blur), reload giữa các case. **0** → field vẫn hiện "0", layer KHÔNG đổi (chọn riêng: 500 / 400), frames không đổi [482,183.5,140,30],[440,464.5,112,112], drr không đổi; Enter cũng vậy. **-50** → y hệt (field hiện -50, layer giữ 500/400). **1** → áp: T plain=1, TA=1, frames 1.3px wide, drr w 0.3. **0.5** → field & layer = 1 (làm tròn lên). **99999** → áp cho cả 2: T plain w=99999 (h 107), P photo 99999×99999 (giữ tỉ lệ); frames [-13447.8,183.5,27999.7,30],[440,464.5,27999.7,27999.7]; drr [-13447.9,183.5,41887.6,28280.7] bao trọn — không max. **abc** → input type=number lọc hết, field rỗng, layer giữ 500/400, frames không đổi. **rỗng** + blur → không đổi (T plain+TA: field 500 → "" → layer vẫn 500). **`1;sleep(5)`** → input number giữ lại `1e5` (chữ `e` của "sleep" thành số mũ…
  product_facts.md dòng 187: - **Transform panel Width/Height/Top/Left: SỬA LẠI (đo thật 2026-09-17, QA-3361/TC-35) — 0/số âm KHÔNG clamp về 1px như dev đã trả lời RQ6 (2026-09-16), mà bị BỎ QUA HOÀN TOÀN.** Nhập 0 hoặc -50 → field hiển thị đúng số vừa gõ (0/-50) nhưng layer/canvas KHÔNG đổi kích thước; chọn lại layer thì field trả về giá trị thật cũ (500/400…) — tức field hiển thị **stale** cho tới khi re-select. Giá trị nhỏ nhất áp được là **1** (0.5 làm tròn lên 1). Số rất lớn (99999) **luôn áp dụng cho MỌI layer đang chọn**, không có max clamp — photo giữ tỉ lệ, box có thể tràn xa ngoài canvas. Chữ không phải số (`abc`) bị `input[type=number]` LỌC NGAY TỪ KEYSTROKE, không bao giờ tới field. Để trống rồi blur → field trả về giá trị cũ. Field KHÔNG gọi API khi blur, chỉ khi bấm Save artwork. Bẫy phụ: gõ chuỗi có ký tự `e` sau số (vd `1;sleep(5)`) → browser number input đọc thành exponent (`1e5`=100000) thay vì lọc bỏ toàn bộ — không phải lỗ hổng, chỉ là cách trình duyệt parse `type=number`.
  ```

### CLAIM-08

- **Statement:** Preference `Apply for: Group/Individual` per-account chỉ ĐỌC lúc load editor, KHÔNG sync live giữa các tab (mở 2 tab cùng account: đổi mode ở tab 2 không cập nhật tab 1 tới khi reload; tab lưu sau cùng là giá trị persist cho lần load kế tiếp)
- **Object / feature:** MỚI: transform-multi-select — Thuộc: popover Transform khi chọn nhiều layer trong artwork editor (Apply for Group/Individual, AW1.0 vs AW2.0, ô Width/Height/Top/Left, preference per-account). Không thuộc: Flip nhóm (file artwork-transform-group-flip), box và selection (file artwork-transform-multi-select-boxes).
- **Quan hệ với canon:** `ADD`
- **Scope:** seller (owner/staff); portal · api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** AI chạy ([AI]); 'dev chốt RQ11 2026-09-16' theo ghi chú QA, chưa trích được quote dev, 2026-09-17
- **Locator:** QA-3361 TC-22 (results/result_QA-3361_B6_2026-09-17.md); product_facts.md dòng 188 (FACT-063) | https://ownego.atlassian.net/browse/TIB-5355 · https://ownego.atlassian.net/browse/QA-3361 | build hash: không rõ (QA không có quyền repo) | Ghi chú: Ghi chú 'dev chốt RQ11 2026-09-16' là theo QA, chưa trích được nguyên văn dev; không coi là dev sign-off. (CCR cũ: CBS-043 CLAIM-17)
- **Căn cứ expected:** KHÔNG CÓ (khuôn cũ không ghi ticket, comment hay câu trả lời PO/Dev mà expected của TC dựa vào)
- **OQ:** NEEDS_CONFIRMATION — Ghi chú "dev chốt RQ11 2026-09-16" (preference chỉ đọc lúc load, không sync live giữa các tab) là theo QA, chưa trích được quote dev; Dev có xác nhận đây là hành vi mong muốn không? — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  QA-3361 TC-22 (result_QA-3361_B6_2026-09-17): ✅ AI — persist theo account, đọc lúc load, không sync live — Tab1: pre-reload Individual → reload: `GET /api/staff` → `layer`, radio Individual, frames 2 [482,632,140,29],[482,688,140,29]. Tab2 (cùng profile) load: `/api/staff → layer`, chọn TA+TB, đổi Group → `PUT uiconfig {"transform_apply_for":"group"}` 200, tab2 frames 0. **Tab1 không reload**, chọn TC+TD: radio vẫn **Individual**, frames 2 [482,744,140,29],[804,786,140,29] (không sync live). Reload tab1: `/api/staff → gro…
  product_facts.md dòng 188: - **Preference `Apply for: Group/Individual` per-account chỉ ĐỌC lúc load editor, KHÔNG sync live giữa các tab — dev chốt 2026-09-16 (QA-3361, RQ11).** Mở 2 tab cùng account: đổi mode ở tab 2 không cập nhật ngay cho tab 1 đang mở sẵn; tab 1 chỉ thấy giá trị mới sau khi reload. Tab nào lưu (đổi mode) sau cùng là giá trị được persist cho lần load tiếp theo.
  ```

### CLAIM-09

- **Statement:** `Apply for` KHÔNG mặc định Group khi mở popover: là state per-account để lại từ lần trước (production quan sát mặc định là Individual) — test phải tự set tường minh
- **Object / feature:** MỚI: transform-multi-select — Thuộc: popover Transform khi chọn nhiều layer trong artwork editor (Apply for Group/Individual, AW1.0 vs AW2.0, ô Width/Height/Top/Left, preference per-account). Không thuộc: Flip nhóm (file artwork-transform-group-flip), box và selection (file artwork-transform-multi-select-boxes).
- **Quan hệ với canon:** `ADD`
- **Scope:** seller (owner/staff); portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA nội bộ (đo) — không phải PO/Dev, 2026-09-16
- **Locator:** product_facts.md dòng 195 (FACT-067); outputs/QA-3363/release-verification.md (mục Quan sát thêm) | https://ownego.atlassian.net/browse/TIB-5435 · https://ownego.atlassian.net/browse/QA-3362 · https://ownego.atlassian.net/browse/TIB-5397 · https://ownego.atlassian.net/browse/QA-3363 | Ghi chú: QA-3363 TC-8 ('default Group after reset') và TC-13 tick 2026-09-16 nằm trước fix BUG-127, không dùng làm căn cứ. (CCR cũ: CBS-043 CLAIM-22)
- **OQ:** NEEDS_CONFIRMATION — Apply for không mặc định Group mà là state per-account (production quan sát Individual) chỉ là số đo QA, không có nguồn PO/Dev; mặc định thiết kế cho account mới là gì? — Người trả lời: PO.
- **Trích nguyên văn:**
  ```
  product_facts.md dòng 195: - [FACT-067] **`Apply for` KHÔNG mặc định Group** khi mở popover (state per-account để lại từ lần trước) — test phải tự set tường minh.
  ```
