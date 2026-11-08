# Context Change Request: sdk-template-switch-storefront — gộp từ 2 Proposal khuôn cũ

- **Product:** `teeinblue`
- **Object:** `sdk`
- **Ticket:** `TIB-5566, TIB-5501, QA-3394`
- **Các khối có trong file:** `A`

## Mức độ gấp

`MEDIUM` — mức cao nhất trong các Proposal gốc (MEDIUM); lý do gốc theo từng Proposal:

- CBS-026: MEDIUM — Canon thiếu coverage cho sync ảnh và position khi đổi template (gap); không có checklist hay automation đang publish nào chạy sai, không chặn test.
- CBS-031: MEDIUM — Canon thiếu coverage cho đổi màu vector và id SVG trùng, nhưng không có checklist đang publish nào kiểm hành vi này nên không có gì đang chạy sai (QA phuongbb xác nhận 2026-11-01).

# Khối A — Hành vi

### CLAIM-01

- **Statement:** Khi bật sync và layer đích cùng tỉ lệ, cùng kích thước, ảnh của buyer giữ đúng position và size của template vừa rời, không hiện warning tỉ lệ, kể cả khi đổi template nhanh liên tục, ở popup desktop và mobile.
- **Object / feature:** sdk/MỚI: template-switch-photo-sync — Thuộc: sync ảnh và position của photo layer có reposition khi template đang chọn đổi (giữ, reset, warning tỉ lệ, round-trip, Multiple Uploads, đổi Size/option); Không thuộc: setting bật sync (sdk/product-page-settings-config), sync giá trị text, photo layer dùng Global Option.
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer, storefront
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb, kết quả [AI] do máy chạy trên Chrome của QA), 2026-10-21
- **Locator:** QA-3415 (QA Hub task TIB-223) TC-01 5/5 trong result_QA-3415_TC01-recheck_2026-10-21.md; TC-26, TC-28 trong result_QA-3415_B1-S1-clean_2026-10-21.md; staging SDK app-v1.js Last-Modified 2026-10-21 05:56:15 GMT, Chrome sạch. Nhánh "Enable Reposition on main gallery" = ON chưa kiểm. Liên quan, không thay: sdk KB-026, KB-027. (CCR cũ: CBS-026 CLAIM-01)
- **Căn cứ expected:** Jira TIB-5566 dev summary (chinhdt, comment 2026-10-21): "Destination layer has the same aspect ratio as the source layer (within 5%): the photo keeps the buyer's position." Phần đổi nhanh và mobile: KHÔNG CÓ.
- **Trích nguyên văn:**
  ```
  TC-01 | ✅ AI — T2s keeps T1's reposition, no ratio warning (current SDK 2026-10-21 05:56) | T1 after upload (default Cover) `{x:-0.3889,y:0,w:1.7778,h:1}` → after zoom in ×1 + left ×10 + Apply `{x:-0.6333,y:-0.025,w:1.8667,h:1.05}`, preview `translate(-205.8225 -8.125)` image 606.68×341.25 → switch to T2s: `layer-<id>-position` `{x:-0.6333,y:-0.025,w:1.8667,h:1.05}`, preview `translate(-205.8225 -8.125)` 606.68×341.25, `.tee-photo-warning` empty. 5/5 runs identical.
  TC-26 | ✅ AI — switch nhanh T2s↔T1 ×3 không chờ: T2s cuối giữ position T1 | 7 lần `selectOption` liên tiếp không chờ, rồi chờ 6 s: T2s `{x:-0.6333,y:-0.025,w:1.8667,h:1.05}` = T1; ảnh có, preview `translate(-205.8225 -8.125)`; không warning; không pageerror
  TC-28 | ✅ AI — popup desktop + mobile 390×844 đều giữ position; nhánh toggle ON ⏸️ AI — portal not reachable | Desktop popup: T2s = T1 `{x:-0.6333,y:-0.025,w:1.8667,h:1.05}`, warning rỗng. Mobile (isMobile, 390×844): T1 `{x:-0.6333,…}` → T2s y hệt, preview 305.46×171.82 `translate(-103.63 -4.09)` cả hai; warning rỗng
  Ngữ cảnh (Dev summary, chinhdt, Jira TIB-5566 comment 2026-10-21 — mô tả kỹ thuật dev tự viết, không phải nguồn của claim):
  - **Destination layer has the same aspect ratio as the source layer** (within 5%): the photo keeps the buyer's position. If the two layers differ in pixel size, the position and size scale with the layer.
  ```

### CLAIM-02

- **Statement:** Position lưu dạng giá trị 0–1 tương đối theo box layer nên khi layer đích cùng tỉ lệ nhưng khác kích thước pixel, position scale đều theo layer đích và ảnh không méo.
- **Object / feature:** sdk/MỚI: template-switch-photo-sync — Thuộc: sync ảnh và position của photo layer có reposition khi template đang chọn đổi (giữ, reset, warning tỉ lệ, round-trip, Multiple Uploads, đổi Size/option); Không thuộc: setting bật sync (sdk/product-page-settings-config), sync giá trị text, photo layer dùng Global Option.
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer, storefront
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chinhdt), 2026-10-21
- **Locator:** Jira TIB-5566 comment 55235 mục Q2. Bổ trợ: TC-02 ✅ 2026-10-21 staging (pixel ×2, không warning). Liên quan: sdk KB-015. (CCR cũ: CBS-026 CLAIM-02)
- **Trích nguyên văn:**
  ```
  Câu hỏi QA (comment 55234): "When the two layers have the same ratio but different pixel sizes (e.g. 1000x1000 to 2000x2000), are position and zoom scaled by one uniform factor? Is the reposition stored as relative values (0-1) or in pixels?"
  Q2: the position is stored as relative 0–1 values of the layer box, so it scales uniformly with the destination layer. Within the 5% tolerance the photo may stretch by up to 5%.
  ```

### CLAIM-03

- **Statement:** Khi layer đích khác tỉ lệ (lệch quá 5%), ảnh reset về placement mặc định theo Fit mode của layer đích (Cover hoặc Contain) và hiện warning "Your photo doesn't match this design's aspect ratio, so it may not fit perfectly. Re-adjust or upload another photo if needed."; giữ position thì không warning, reset thì có warning.
- **Object / feature:** sdk/MỚI: template-switch-photo-sync — Thuộc: sync ảnh và position của photo layer có reposition khi template đang chọn đổi (giữ, reset, warning tỉ lệ, round-trip, Multiple Uploads, đổi Size/option); Không thuộc: setting bật sync (sdk/product-page-settings-config), sync giá trị text, photo layer dùng Global Option.
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer, storefront
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb, kết quả [AI] do máy chạy trên Chrome của QA), 2026-10-21
- **Locator:** QA-3415 TC-03, TC-04, TC-07 trong result_QA-3415_B1-S1-clean_2026-10-21.md; staging SDK app-v1.js Last-Modified 2026-10-21 05:56:15 GMT, Chrome sạch. Chữ đầy đủ của warning lấy từ result_QA-3415_B1-S1_2026-10-21.md, file mà CCR cũ xếp là lượt SDK cache cũ không hợp lệ; lượt sạch chỉ ghi chữ cắt ngắn. (CCR cũ: CBS-026 CLAIM-03)
- **Căn cứ expected:** Jira TIB-5566 dev summary (chinhdt, comment 2026-10-21): "Destination layer has a different aspect ratio: the photo still resets to its default position (fill/fit per the layer's fit mode), and the ratio warning message still shows."
- **Trích nguyên văn:**
  ```
  TC-03 | ✅ AI — T3 (2:1 Cover) reset default + warning | T3 `{x:0,y:-0.0625,w:1,h:1.125}` (tràn đều trên/dưới 0.0625), preview 650×365.63 `translate(0 -20.3125)`; warning "Your photo doesn't match this design's aspect ratio, so it m…"
  TC-04 | ✅ AI — T3c (2:1 Contain) reset default Contain + warning | portrait T1 `{x:-0.225,y:-0.4333,w:1.05,h:1.8667}` → T3c `{x:0.3594,y:0,w:0.2813,h:1}`, preview 182.85×325 `translate(233.61 0)` (cả ảnh trong layer, căn giữa); warning hiện
  TC-07 | ✅ AI — 5.1% (T6 1000×1051): reset default + warning | T6 `{x:-0.4342,y:0,w:1.8684,h:1}` (default), preview 607.23×341.57 `translate(-141.115 0)`; warning hiện
  Chữ đầy đủ của warning (ghi trong `result_QA-3415_B1-S1_2026-10-21.md`, phần selector): "Your photo doesn't match this design's aspect ratio, so it may not fit perfectly. Re-adjust or upload another photo if needed."
  Ngữ cảnh (Dev summary, chinhdt, comment 2026-10-21):
  - **Destination layer has a different aspect ratio**: the photo still resets to its default position (fill/fit per the layer's fit mode), and the ratio warning message still shows. The 5% threshold is the same one the warning uses, so a kept position never shows the warning and a reset one always does.
  ```

### CLAIM-04

- **Statement:** Hai layer được coi là cùng tỉ lệ khi abs(sourceRatio − destRatio) / destRatio ≤ 0.05, layer đích là base, đúng 5% tính là cùng tỉ lệ, dùng chung hàm với warning tỉ lệ.
- **Object / feature:** sdk/MỚI: template-switch-photo-sync — Thuộc: sync ảnh và position của photo layer có reposition khi template đang chọn đổi (giữ, reset, warning tỉ lệ, round-trip, Multiple Uploads, đổi Size/option); Không thuộc: setting bật sync (sdk/product-page-settings-config), sync giá trị text, photo layer dùng Global Option.
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer, storefront
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chinhdt), 2026-10-21
- **Locator:** Jira TIB-5566 comment 55235 mục Q1. Bổ trợ: TC-05 ✅, TC-08 ✅ 2026-10-21. QA chạy staging 2026-10-21 thấy ngược lại ở đúng 5% (TC-06 ❌, xem CLAIM-05), chưa có dev/PO phản hồi; giữ cả hai phía. (CCR cũ: CBS-026 CLAIM-04)
- **Trích nguyên văn:**
  ```
  Câu hỏi QA (comment 55234): "How is the 5% computed: abs(ratioA - ratioB) / ratioB <= 0.05 (destination layer as base) or source as base? Is a difference of exactly 5% treated as the same ratio (keep, no warning)?"
  Q1: ok — abs(sourceRatio - destRatio) / destRatio <= 0.05, destination layer as base, same function as the ratio warning; exactly 5% counts as the same ratio (keep, no warning).
  ```

### CLAIM-05

- **Statement:** Known issue, không phải expected: cặp layer lệch đúng 5% (1000×1000 → 1000×1050) đang bị coi là khác tỉ lệ nên reset và hiện warning, vì phép tính JS ra 0.05000000000000006 > 0.05.
- **Object / feature:** sdk/MỚI: template-switch-photo-sync — Thuộc: sync ảnh và position của photo layer có reposition khi template đang chọn đổi (giữ, reset, warning tỉ lệ, round-trip, Multiple Uploads, đổi Size/option); Không thuộc: setting bật sync (sdk/product-page-settings-config), sync giá trị text, photo layer dùng Global Option.
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer, storefront
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA (phuongbb) quan sát, không ai xác nhận, 2026-10-21
- **Locator:** QA-3415 TC-06 ❌ 2/2 trong result_QA-3415_B1-S1-clean_2026-10-21.md; bug draft BUG-04 chưa file, dev chưa trả lời. Nói ngược lời dev ở CLAIM-04, chưa ai phân xử. Không dùng làm expected, không đề xuất check assert "đúng 5% thì reset". (CCR cũ: CBS-026 CLAIM-05)
- **Trích nguyên văn:**
  ```
  TC-06 | ❌ AI — đúng 5% (T5 1000×1050): reset default + HIỆN warning (2/2 context) | Lần 1 + lần 2: T5 `{x:-0.4333,y:0,w:1.8667,h:1}` (default cover), preview `translate(-140.8225 0)` + warning "Your photo doesn't match this design's aspect ratio…". JS trên trang: `Math.abs(1-1000/1050)/(1000/1050)` = **0.05000000000000006** (> 0.05)
  ```

### CLAIM-06

- **Statement:** Trong ngưỡng 5%, ảnh được giữ position có thể bị giãn tới 5%.
- **Object / feature:** sdk/MỚI: template-switch-photo-sync — Thuộc: sync ảnh và position của photo layer có reposition khi template đang chọn đổi (giữ, reset, warning tỉ lệ, round-trip, Multiple Uploads, đổi Size/option); Không thuộc: setting bật sync (sdk/product-page-settings-config), sync giá trị text, photo layer dùng Global Option.
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer, storefront
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chinhdt), 2026-10-21
- **Locator:** Jira TIB-5566 comment 55235 mục Q2 (câu thứ hai). Bổ trợ: TC-09 ✅ 2026-10-21 staging, méo đo được 4.67%, không skew hay xoay, không crop thêm (số đo chỉ là bằng chứng một lượt). (CCR cũ: CBS-026 CLAIM-06)
- **Trích nguyên văn:**
  ```
  Within the 5% tolerance the photo may stretch by up to 5%.
  ```

### CLAIM-07

- **Statement:** Template đã ghé (đã hiện ảnh này, với position mang sang hoặc mặc định, dù buyer có chỉnh hay không) giữ position của nó và không bị thay bằng chỉnh sửa mới hơn ở template khác khi quay lại.
- **Object / feature:** sdk/MỚI: template-switch-photo-sync — Thuộc: sync ảnh và position của photo layer có reposition khi template đang chọn đổi (giữ, reset, warning tỉ lệ, round-trip, Multiple Uploads, đổi Size/option); Không thuộc: setting bật sync (sdk/product-page-settings-config), sync giá trị text, photo layer dùng Global Option.
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer, storefront
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chinhdt), 2026-10-21
- **Locator:** Jira TIB-5566 comment 55235 mục Q7. Bổ trợ: TC-10 ✅, TC-11 ✅ 2026-10-21 staging; dev summary 2026-10-21 mục Known limitations. (CCR cũ: CBS-026 CLAIM-07)
- **Trích nguyên văn:**
  ```
  Câu hỏi QA (comment 55234): "When does layer B count as 'already holding this same photo with a position of its own'? … Example: adjust in A (left) -> switch to B -> back to A, adjust (right) -> switch to B: does B show left or right?"
  Q7: B — a visit counts: once B has shown this photo (carried or default position), it keeps that position; in the example B shows left.
  ```

### CLAIM-08

- **Statement:** Nếu buyer upload ảnh khác ở template A sau khi đã ghé template B cùng tỉ lệ, B nhận ảnh mới cùng position của A vì luật giữ position riêng chỉ áp cho cùng một ảnh.
- **Object / feature:** sdk/MỚI: template-switch-photo-sync — Thuộc: sync ảnh và position của photo layer có reposition khi template đang chọn đổi (giữ, reset, warning tỉ lệ, round-trip, Multiple Uploads, đổi Size/option); Không thuộc: setting bật sync (sdk/product-page-settings-config), sync giá trị text, photo layer dùng Global Option.
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer, storefront
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chinhdt) đồng ý đề xuất do QA phuongbb viết, 2026-10-21
- **Locator:** Jira TIB-5566 comment 55235 ("ok Q4" là đồng ý đề xuất của QA trong comment 55234). Bổ trợ: TC-13 ✅ 2026-10-21 staging. (CCR cũ: CBS-026 CLAIM-08)
- **Trích nguyên văn:**
  ```
  ok Q4
  Câu hỏi + đề xuất được đồng ý (phuongbb, comment 55234, 2026-10-21):
  **Q4.** If the buyer uploads a new (different) photo in A after B already holds a position for the old photo, does B take A's position (same ratio) or the default position? — chọn: A) B takes A's position · B) B uses the default position — QA đề xuất: B takes A's position, because the 'same photo keeps its own position' rule no longer applies
  ```

### CLAIM-09

- **Statement:** Position chỉ mang từ template vừa rời: đi A → B (khác tỉ lệ, reset) → C (cùng tỉ lệ A) thì C ở placement mặc định, kèm warning vì rời B khác tỉ lệ, không lấy position của A.
- **Object / feature:** sdk/MỚI: template-switch-photo-sync — Thuộc: sync ảnh và position của photo layer có reposition khi template đang chọn đổi (giữ, reset, warning tỉ lệ, round-trip, Multiple Uploads, đổi Size/option); Không thuộc: setting bật sync (sdk/product-page-settings-config), sync giá trị text, photo layer dùng Global Option.
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer, storefront
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb, kết quả [AI] do máy chạy trên Chrome của QA), 2026-10-21
- **Locator:** QA-3415 TC-12 trong result_QA-3415_B1-S1-clean_2026-10-21.md; staging SDK app-v1.js Last-Modified 2026-10-21 05:56:15 GMT, Chrome sạch. (CCR cũ: CBS-026 CLAIM-09)
- **Căn cứ expected:** Jira TIB-5566 dev summary (chinhdt, comment 2026-10-21), mục Known limitations: "A position only carries from the template the buyer just left."
- **Trích nguyên văn:**
  ```
  TC-12 | ✅ AI — T1 → T3 → T2: T2 ở default, không lấy position T1 | T3 `{x:0,y:-0.0625,w:1,h:1.125}` + warning → T2 `{x:-0.3889,y:0,w:1.7778,h:1}` (default cover T2), preview 1155.57×650 `translate(-252.785 0)`; T2 cũng hiện warning (rời T3 2:1 → reset ⇒ warning, khớp BR-02)
  Ngữ cảnh (Dev summary, chinhdt, comment 2026-10-21, Known limitations):
  - A position only carries from the template the buyer just left. Example: the buyer adjusts in template A, switches to B (different ratio, so it resets), then to C (same ratio as A). C gets the default position, not A's. This is by design: the position is never copied to a layer of a different shape.
  ```

### CLAIM-10

- **Statement:** Xoá ảnh ở template A rồi đổi sang B thì B rỗng, không warning, và ảnh mới upload ở B bắt đầu ở placement mặc định, không dùng position cũ.
- **Object / feature:** sdk/MỚI: template-switch-photo-sync — Thuộc: sync ảnh và position của photo layer có reposition khi template đang chọn đổi (giữ, reset, warning tỉ lệ, round-trip, Multiple Uploads, đổi Size/option); Không thuộc: setting bật sync (sdk/product-page-settings-config), sync giá trị text, photo layer dùng Global Option.
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer, storefront
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb, kết quả [AI] do máy chạy trên Chrome của QA), 2026-10-21
- **Locator:** QA-3415 TC-36 trong result_QA-3415_B1-S1-clean_2026-10-21.md; staging SDK app-v1.js Last-Modified 2026-10-21 05:56:15 GMT, Chrome sạch. (CCR cũ: CBS-026 CLAIM-10)
- **Căn cứ expected:** KHÔNG CÓ
- **Trích nguyên văn:**
  ```
  TC-36 | ✅ AI — xoá ảnh ở T1 → T2s rỗng, không warning; ảnh mới ở T2s bắt đầu ở default | T2s `{x:-0.6333,…}` → T1 `.tee-photo-clear` ⇒ `layer-<id>=null` → T2s: `layer-<id>=null`, không preview ảnh, warning rỗng → upload landscape (Apply không chỉnh) ⇒ T2s `{x:-0.3889,y:0,w:1.7778,h:1}` (default), ≠ vị trí cũ | Không lật. Quan sát: sau khi xoá ảnh LS vẫn giữ `layer-<id>-position` cũ (ảnh null) — không ảnh hưởng ảnh mới
  ```

### CLAIM-11

- **Statement:** Khi template đích có 2 photo layer cùng option title nhưng khác tỉ lệ, mỗi layer được xét riêng: layer cùng tỉ lệ giữ position, layer khác tỉ lệ reset và warning chỉ hiện ở field của layer đó.
- **Object / feature:** sdk/MỚI: template-switch-photo-sync — Thuộc: sync ảnh và position của photo layer có reposition khi template đang chọn đổi (giữ, reset, warning tỉ lệ, round-trip, Multiple Uploads, đổi Size/option); Không thuộc: setting bật sync (sdk/product-page-settings-config), sync giá trị text, photo layer dùng Global Option.
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer, storefront
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb, kết quả [AI] do máy chạy trên Chrome của QA), 2026-10-21
- **Locator:** QA-3415 TC-37 trong result_QA-3415_B1-S1-clean_2026-10-21.md; staging SDK app-v1.js Last-Modified 2026-10-21 05:56:15 GMT, Chrome sạch. (CCR cũ: CBS-026 CLAIM-11)
- **Căn cứ expected:** KHÔNG CÓ
- **Trích nguyên văn:**
  ```
  TC-37 | ✅ AI — T14: layer 1:1 giữ position T1, layer 2:1 reset + warning chỉ ở layer đó | `layer-<id>` (1:1) `{x:-0.6333,y:-0.025,w:1.8667,h:1.05}` = T1, warning rỗng; `layer-<id>` (2:1) `{x:0,y:-0.0625,w:1,h:1.125}` + warning chỉ ở `#tee-field--layer-<id>`
  ```

### CLAIM-12

- **Statement:** Việc giữ position áp cho "Upload Photo" có Photo reposition và "Multiple Uploads" có reposition; layer Multiple Uploads reposition giữ một ảnh ghép với một position, không theo slot, nên số slot không ảnh hưởng.
- **Object / feature:** sdk/MỚI: template-switch-photo-sync — Thuộc: sync ảnh và position của photo layer có reposition khi template đang chọn đổi (giữ, reset, warning tỉ lệ, round-trip, Multiple Uploads, đổi Size/option); Không thuộc: setting bật sync (sdk/product-page-settings-config), sync giá trị text, photo layer dùng Global Option. (liên quan: artwork)
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer, storefront
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chinhdt), 2026-10-21
- **Locator:** Jira TIB-5566 comment 55235 mục Q3; phạm vi từ dev summary 2026-10-21. TC-19, TC-20 chưa chạy, chỉ có lời dev, chưa có quan sát. Liên quan: artwork KB-017. (CCR cũ: CBS-026 CLAIM-12)
- **Trích nguyên văn:**
  ```
  Câu hỏi QA (comment 55234): "Multiple Uploads: is the position kept per photo slot by index (slot 1 to slot 1)? What happens when template B's layer has fewer or more slots than A's?"
  Q3: a Multiple Uploads reposition layer holds one combined image with one position — there are no per-slot positions, so slot count does not matter.
  Phạm vi (Dev summary, chinhdt, comment 2026-10-21 — ngữ cảnh):
  - Applies to "Upload Photo" layers with Photo reposition and to "Multiple Uploads" layers with reposition. Crop and direct-upload layers are unchanged.
  ```

### CLAIM-13

- **Statement:** Ảnh không sync giữa các field type khác nhau (Upload Photo reposition, Photo Cropper, Multiple Uploads); TIB-5566 không đổi hành vi này.
- **Object / feature:** sdk/MỚI: template-switch-photo-sync — Thuộc: sync ảnh và position của photo layer có reposition khi template đang chọn đổi (giữ, reset, warning tỉ lệ, round-trip, Multiple Uploads, đổi Size/option); Không thuộc: setting bật sync (sdk/product-page-settings-config), sync giá trị text, photo layer dùng Global Option. (liên quan: artwork)
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer, storefront
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chinhdt), 2026-10-21
- **Locator:** Jira TIB-5566 comment 55235 mục Q8. TC-21, 22, 23, 34 chưa chạy, chỉ có lời dev, chưa có quan sát. Liên quan: artwork KB-017. (CCR cũ: CBS-026 CLAIM-13)
- **Trích nguyên văn:**
  ```
  Câu hỏi QA (comment 55234): "Mixed-type pairs with the same ratio: Upload Photo (reposition) -> Photo Cropper, Photo Cropper -> Upload Photo (reposition), Upload Photo <-> Multiple Uploads. Is the position kept or reset?"
  Q8: neither — the photo does not sync between different field types at all (Upload Photo reposition / Photo Cropper / Multiple Uploads), unchanged by this issue.
  ```

### CLAIM-14

- **Statement:** Sync chạy mỗi khi template đang chọn đổi, kể cả khi đổi Size hoặc option map sang template hay artwork khác, với cùng logic giữ hoặc reset.
- **Object / feature:** sdk/MỚI: template-switch-photo-sync — Thuộc: sync ảnh và position của photo layer có reposition khi template đang chọn đổi (giữ, reset, warning tỉ lệ, round-trip, Multiple Uploads, đổi Size/option); Không thuộc: setting bật sync (sdk/product-page-settings-config), sync giá trị text, photo layer dùng Global Option.
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer, storefront
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chinhdt), 2026-10-21
- **Locator:** Jira TIB-5566 comment 55235 mục Q6. Dev xác nhận bằng đọc code và yêu cầu test; TC-14, TC-15 chưa chạy, chưa có quan sát. (CCR cũ: CBS-026 CLAIM-14)
- **Trích nguyên văn:**
  ```
  Câu hỏi QA (comment 55234): "Does a Size / option change that maps to another template follow the same keep / reset logic as a direct template switch?"
  Q6: A — same sync path. The sync runs whenever the selected template changes, whether the buyer picks it directly or a Size/option change maps to another template or artwork. Confirmed by reading the code, please cover it in testing.
  ```

### CLAIM-15

- **Statement:** Sync chỉ ghi vào template đang chọn nên template chưa ghé không có ảnh hay position, và layer là populate target (TIB-5302) bị sync bỏ qua, theo luật populate.
- **Object / feature:** sdk/MỚI: template-switch-photo-sync — Thuộc: sync ảnh và position của photo layer có reposition khi template đang chọn đổi (giữ, reset, warning tỉ lệ, round-trip, Multiple Uploads, đổi Size/option); Không thuộc: setting bật sync (sdk/product-page-settings-config), sync giá trị text, photo layer dùng Global Option. (liên quan: artwork)
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer, storefront
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chinhdt), 2026-10-21
- **Locator:** Jira TIB-5566 comment 55235 mục Q7 (phần lựa chọn (c)). TC-18 chưa chạy, chưa có quan sát. Có thể chạm artwork/populate-values, chưa rõ. (CCR cũ: CBS-026 CLAIM-15)
- **Trích nguyên văn:**
  ```
  (c) does not apply: the sync only writes into the currently selected template, so a template the buyer never visited holds no photo or position, and a populate target (TIB-5302) is skipped by the sync and follows the populate rules instead.
  ```

### CLAIM-16

- **Statement:** Position đã giữ được lưu trong customization data gửi lúc Add to cart, nên cart preview, Edit design từ cart và order design dùng đúng position đó.
- **Object / feature:** sdk/MỚI: template-switch-photo-sync — Thuộc: sync ảnh và position của photo layer có reposition khi template đang chọn đổi (giữ, reset, warning tỉ lệ, round-trip, Multiple Uploads, đổi Size/option); Không thuộc: setting bật sync (sdk/product-page-settings-config), sync giá trị text, photo layer dùng Global Option. (liên quan: order)
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer đặt đơn, store owner xem order design; storefront, api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chinhdt) đồng ý đề xuất do QA phuongbb viết, 2026-10-21
- **Locator:** Jira TIB-5566 comment 55235 ("ok Q5" là đồng ý đề xuất của QA trong comment 55234). Bổ trợ: thumbnail cart baseline ở TC-30 lượt 2026-10-21. Edit design từ cart và order design mới chưa kiểm (TC-16 phần Edit, TC-17 chưa chạy). Liên quan: sdk KB-022, order KB-369. (CCR cũ: CBS-026 CLAIM-16)
- **Trích nguyên văn:**
  ```
  ok Q5
  Câu hỏi + đề xuất được đồng ý (phuongbb, comment 55234, 2026-10-21):
  **Q5.** Do the cart preview, 'Edit design' from the cart and the order design / final print file use the kept position? — chọn: A) Yes · B) No — QA đề xuất: Yes - the kept position is saved in the customization data sent with Add to cart
  ```

### CLAIM-17

- **Statement:** Sau reload trang, template picker không được khôi phục ("Choose an option") dù localStorage vẫn giữ template, ảnh và position; chọn lại template thì ảnh và position đã giữ hiện lại đúng, không warning.
- **Object / feature:** sdk/storefront-buyer-facing
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer, storefront
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb, kết quả [AI]), 2026-10-22
- **Locator:** QA-3415 TC-35 trong result_QA-3415_TC35-rescoped_2026-10-22.md (expected đã đổi theo quyết định QA 2026-10-22), bằng chứng result_QA-3415_TC35-explain_2026-10-22.md; staging SDK app-v1.js Last-Modified 2026-10-21 05:56:15 GMT, Chrome sạch. Phần picker không khôi phục là quan sát có từ trước, cùng chiều KB-019 và CHK-027, không phải expected; phần position là mới. BUG-10 đã bị QA dismiss 2026-10-22. (CCR cũ: CBS-026 CLAIM-18)
- **Căn cứ expected:** KHÔNG CÓ
- **Trích nguyên văn:**
  ```
  TC-35 | ✅ AI — after reload + reselecting T2s: same photo, same position, no warning | Before reload T2s `{x:-0.6333,y:-0.025,w:1.8667,h:1.05}` → reload (picker shows "Choose an option") → select T2s → `{x:-0.6333,y:-0.025,w:1.8667,h:1.05}`, preview `translate(-205.8225 -8.125)`, warning empty | Picker reset after reload = existing behaviour, out of scope (QA decision A)
  Từ lượt giải thích (2026-10-22):
  Conclusion: after any reload the template picker is never restored from localStorage (even without a template switch, scenario B); the data is kept and comes back as soon as the buyer picks the template again. Not caused by TIB-5566's keep / reset logic.
  ```

### CLAIM-18

- **Statement:** Known issue, không phải expected: position sửa tay trong localStorage (x = -5, 99999, "abc", null) không bị clamp hay bỏ qua, customization POST 201 lưu nguyên giá trị, "abc" gây translate(NaN …) và lỗi console, thumbnail cart mất ảnh (-5, 99999) hoặc ảnh ở x=0 ("abc", null), không có 500; key position của campaign khác bị bỏ qua.
- **Object / feature:** sdk/storefront-buyer-facing
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer tự sửa dữ liệu của mình; storefront, api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA (phuongbb) quan sát, không ai xác nhận, 2026-10-21
- **Locator:** QA-3415 TC-30 ❌ 2/2 trong result_QA-3415_B1-S1-clean_2026-10-21.md; bug draft BUG-09 chưa file, dev chưa trả lời. Chỉ xảy ra khi buyer tự sửa localStorage của mình; order design với các giá trị này chưa kiểm. Không đề xuất check assert "server nhận nguyên giá trị". Liên quan: sdk KB-022; cùng dạng artwork KB-144. (CCR cũ: CBS-026 CLAIM-19)
- **Trích nguyên văn:**
  ```
  TC-30 | ❌ AI — position sửa tay không bị clamp/bỏ qua; `"abc"` gây lỗi console; thumbnail cart mất ảnh / lệch (2/2 context) | Sửa `layer-<id>-position.x` (T2s) → reload → chọn lại T2s → `Add to Cart`. Preview: `x=-5` `translate(-1625 …)`, `x=99999` `translate(32499675 …)`, `x="abc"` `translate(NaN …)` + 3 console error `<g> attribute transform: Expected number, "translate(NaN …"`, `x=null` `translate(0 …)`. `POST staging-api…/customization` **201** gửi nguyên `"x":-5` / `99999` / `"abc"` / `null`; `/cart/add.js` 200; không 500; cart không có "Invalid image geometry". **Thumbnail cart** (`.tee-cart-thumbnail__img`, 960 px, load OK): baseline ảnh lệch trái đúng; `x=-5`, `x=99999` = layer **không có ảnh**; `"abc"`, `null` = ảnh ở x=0. Key `layer-<id>-position` (campaign khác) không có trong payload gửi đi, thumbnail = baseline
  ```

### CLAIM-19

- **Statement:** Tên file upload chứa payload XSS, HTML hay traversal không render ở form, sau đổi template và ở cart (server đổi tên file); SVG chứa script và HTML đổi đuôi .jpg bị từ chối với thông báo "Cannot upload because the image is too small. Please upload a bigger image", không chạy script; payload trong text layer sync hiển thị literal.
- **Object / feature:** sdk/storefront-buyer-facing
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer, storefront
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb, kết quả [AI] do máy chạy trên Chrome của QA), 2026-10-21
- **Locator:** QA-3415 TC-31, TC-32, TC-33 trong result_QA-3415_B1-S1-clean_2026-10-21.md; staging SDK app-v1.js Last-Modified 2026-10-21 05:56:15 GMT, Chrome sạch. Phần order design của TC-33 dùng đơn tạo trên SDK cũ, không tính vào claim. Thông báo "too small" chỉ ghi đúng chữ đang hiện, không đề xuất đó là thông báo đúng cho file sai định dạng. (CCR cũ: CBS-026 CLAIM-20)
- **Căn cứ expected:** KHÔNG CÓ
- **Trích nguyên văn:**
  ```
  TC-31 | ✅ AI — tên file payload không render ở đâu, không chạy | 10 payload + baseline (`setInputFiles({name,mimeType,buffer})`): server đổi tên (`wa:customers/uploads/261021_<random>.png`); tên không có trong DOM (text/HTML) ở form T1, sau switch T2s, ở /cart (`namesInHtml=0`, `namesInText=0`, `namesInProps=0` — properties chỉ `_customization_id`, `_tib_design_link_1`) và sau reload /cart; `script,svg,iframe` 227–228 không đổi trước/sau upload/switch mọi case (dao động 1 cả ở baseline); console 0 dòng `xss-test-QA` / `1`; customization 201, cart/add 200
  TC-32 | ✅ AI — SVG chứa script / HTML đổi đuôi .jpg bị từ chối, không chạy script | `fx-script.svg`, `fx-script-big.svg`, `fx-html-as.jpg`: field báo "Cannot upload because the image is too small. Please upload a bigger image", popup không mở, 0 request upload/customization, T1 và T2s không có ảnh; console 0 dòng `xss-test-QA`
  TC-33 | ✅ AI — 8 payload text hiển thị literal ở field, preview, sau reload; order design dùng lại order cũ [đã bỏ id đơn] | T11 `#layer-<id>` → T12 `#layer-<id>`: value = payload (độ dài khớp, 10000 ký tự nhận đủ), preview `<text>` chứa payload literal (`{{7*7}}`, `${7*7}`, `<%= 7*7 %>`, `#{7*7}` không thành `49`), `script,svg,iframe` 227/228 không tăng, console sạch (không `xss-test-QA`/`1`)
  ```

### CLAIM-20

- **Statement:** Vector layer đã áp màu được inline vào preview storefront, mọi id trong SVG của layer mang prefix riêng dạng svg-<chuỗi ngẫu nhiên>-<id gốc>, mọi tham chiếu resolve trong chính layer, không id nào trùng trên trang, và các SVG vốn trùng clipPath id đều tô kín màu, không vùng trong suốt.
- **Object / feature:** sdk/storefront-buyer-facing
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (storefront, Chrome desktop), storefront (SDK preview)
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb, kết quả AI do máy chạy), 2026-10-08
- **Locator:** QA-3394 (QA Hub task TIB-166) TC-26, result_QA-3394_existing-templates_2026-10-08.md, staging, không ghi số build portal/SDK; DOM có prefix nên code fix đã chạy. Bổ trợ: TC-01 ⏸️ cùng lượt. Campaign chỉ có 1 Color option chung, chỉ chứng minh khi các layer cùng màu; "mỗi layer giữ màu riêng" chưa kiểm (TC-01, TC-03 ⏸️). Không assert độ dài, ký tự hay độ ổn định của prefix. Liên quan, không bị thay: storefront-buyer-facing KB-011. (CCR cũ: CBS-031 CLAIM-01)
- **Căn cứ expected:** Dev summary, chauptm, Jira TIB-5501 comment 2026-09-29 ("when a color is applied, every `id` in the SVG is prefixed with a random string (`svg-xxxxxxxx-<id>`)")
- **Trích nguyên văn:**
  ```
  TC-26 | ✅ AI — đổi màu 5 lần trong 3,5s: mọi lần 5/5 layer inline, 0 ref treo, 0 id trùng, màu cuối đúng, không vùng trong suốt | samples E63946→2A9D8F→F4A261→264653→8338EC: dangling 0 / dup 0 mỗi lần; prefix sinh lại mỗi lần (vd `rpf6fi0j`→`vwvmrz0v`→`hgyu4d66`); computed fill layer 70 = `rgb(131, 56, 236)`
  ```

### CLAIM-21

- **Statement:** Vector layer chưa áp màu render qua <image href=…svg>, không inline và không id nào bị prefix.
- **Object / feature:** sdk/storefront-buyer-facing
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (storefront), storefront (SDK preview)
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb, kết quả AI do máy chạy), 2026-10-08
- **Locator:** QA-3394 TC-18, result_QA-3394_existing-templates_2026-10-08.md, staging, không ghi số build portal/SDK. (CCR cũ: CBS-031 CLAIM-02)
- **Căn cứ expected:** Dev summary, chauptm, Jira TIB-5501 comment 2026-09-29 ("SVGs without ids, or layers without a color, are untouched.")
- **Trích nguyên văn:**
  ```
  TC-18 | ✅ AI — chưa áp màu: cả 5 vector render qua `<image href=…svg>`, không inline, không id nào bị prefix | sau `localStorage.clear()` + mở lại: modes = image×5, href `[đã bỏ id]` … `[đã bỏ id]`, handle màu `rgb(0,0,0)` (chưa chọn)
  Ngữ cảnh (Dev summary, 2026-09-29): "SVGs without ids, or layers without a color, are untouched."
  ```

### CLAIM-22

- **Statement:** Phần viết lại tham chiếu khi namespace id xử lý cả url('#id'), url("#id") có ngoặc kép và thuộc tính marker-*, ngoài url(#id), href="#id", xlink:href="#id" và selector #id trong <style>.
- **Object / feature:** sdk/storefront-buyer-facing (liên quan: order)
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (preview) và store owner/staff (order design), storefront (SDK) và api (vectorize)
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chauptm), 2026-10-07
- **Locator:** Jira TIB-5501 comment 53685, trả lời Q3 của QA (comment 53673, 2026-10-07). Câu trả lời chỉ áp cho phần dạng tham chiếu, nửa câu về prefix không được trả lời (xem CLAIM-08). Chưa có TC chạy cho url('#id') và marker-*. (CCR cũ: CBS-031 CLAIM-07)
- **Trích nguyên văn:**
  ```
  Hỏi (QA, comment 53673, 2026-10-07): "Besides url(#id), href="#id", xlink:href="#id" and <style> #id, does the rewrite also handle quoted url('#id') / url("#id") and marker-* attributes? Is the prefix regenerated on every recolor or fixed per layer instance?"
  Đáp: @phuongbb đã handle hết các case của Q3 rồi ạ
  Ngữ cảnh (Dev summary, chauptm, 2026-09-29 — mô tả kỹ thuật, không phải nguồn): "all references are updated: `url(#id)`, `href=\"#id\"`, `xlink:href=\"#id\"` and `#id` selectors inside `<style>`."
  ```

### CLAIM-23

- **Statement:** Quan sát cho thấy prefix được sinh lại mỗi lần đổi màu: cùng layer, 5 lần đổi cho 5 prefix khác nhau.
- **Object / feature:** sdk/storefront-buyer-facing
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (storefront), storefront (SDK preview)
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA (phuongbb, quan sát, không ai xác nhận), 2026-10-08
- **Locator:** Quan sát phụ trong QA-3394 TC-26 (result_QA-3394_existing-templates_2026-10-08.md, staging, không ghi số build portal/SDK), TC không assert điều này; dev chưa trả lời nửa câu Q3 về prefix. Không dùng làm expected, không đề xuất check nào assert prefix. (CCR cũ: CBS-031 CLAIM-08)
- **Trích nguyên văn:**
  ```
  prefix sinh lại mỗi lần (vd `rpf6fi0j`→`vwvmrz0v`→`hgyu4d66`)
  ```

### CLAIM-24

- **Statement:** Known issue chưa rõ nội dung: vector layer có Drop shadow và đổi màu khi SVG trùng id với layer khác đang được Testlane ghi TC-05 failed, gắn BUG-255.
- **Object / feature:** sdk/storefront-buyer-facing
- **Quan hệ với canon:** `UNKNOWN`
- **Scope:** buyer (storefront), storefront (SDK preview)
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** không rõ người xác nhận, ngày không rõ
- **Locator:** Testlane task TIB-166, TC-TIB-4811 (TC-05), status failed, bugId BUG-255, không có ngày chạy hay biên bản; CCR cũ không đọc được BUG-255. Không phải expected, không suy ra shadow mất hay shadow đúng. (CCR cũ: CBS-031 CLAIM-11)
- **Trích nguyên văn:**
  ```
  TC-05 — [Regression] Vector layer có Drop shadow, SVG trùng id với layer khác, đổi màu → shadow vẫn render đúng
  status: failed · bugId: BUG-255 · actualResult: null
  ```
