# Context Change Request: artwork-word-cloud — required, Regenerate layout, dedupe từ trùng, Drop shadow của layer Word Cloud

- **Product:** `teeinblue`
- **Object:** `artwork`
- **Ticket:** `TIB-4413, TIB-5242 (QA-3212, QA-3343)`
- **Các khối có trong file:** `A`

## Mức độ gấp

`MEDIUM` — ảnh hưởng coverage: KB-031/CHK-005 chưa nói Word Cloud luôn required, hành vi Regenerate layout, dedupe và Drop shadow; không checklist đang publish nào bị chạy sai theo Proposal gốc (CBS-041). Proposal gốc không chọn mức gấp (để mẫu trống), mức này do người soạn lại đề xuất.

# Khối A — Hành vi

### CLAIM-01

- **Statement:** Layer Word Cloud luôn required (nhãn `*` và `aria-required`), buyer không thể để trống; 'Default words (only for preview)' chỉ dùng cho preview trong editor, không phải fallback khi input rỗng.
- **Object / feature:** artwork/layer-config-puzzles
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (nhập từ), seller (cấu hình); storefront, portal (editor)
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA (Yến) đính chính; AI tick TC-41, TC-42, TC-73; 2026-08-06 (TC-73: 2026-08-11, storefront staging)
- **Locator:** QA-3212 TC-41, TC-42, TC-73 (outputs/QA-3212/03-testcases.md); apps/tib/knowledge/qa_memory_history.md (mục TIB-4413 Word Cloud, 2026-08-06); product_facts.md FACT-004 | https://ownego.atlassian.net/browse/QA-3212 | Ghi chú: tick của TC-41 không kèm ngày chạy (QA-3212 không có thư mục results/); không coi là đã xác nhận bằng ngày chạy. Phân tích yêu cầu QA-3212 ghi 'Answered by PO/Dev 2026-08-06' (Q13, Q17) nhưng không ghi tên người hay link nên không dùng làm po_dev_confirm. Build hash: không rõ. (CCR cũ: CBS-041 CLAIM-01)
- **OQ:** NEEDS_CONFIRMATION — Layer Word Cloud luôn required và 'Default words (only for preview)' không phải fallback khi input rỗng có đúng không? Claim không có nguồn có tên người hay link, chưa rõ đã ship, TC-41 không kèm ngày chạy. — Người trả lời: PO. 
- **Trích nguyên văn:**
  ```
  apps/tib/knowledge/product_facts.md dòng 39: - [FACT-004] **Layer Word Cloud luôn `required`**, không thể để trống.
  apps/tib/knowledge/qa_memory_history.md: "**BR13 SAI — phải sửa TC-41/TC-42:** layer Word Cloud LUÔN required (`*` + `aria-required`), buyer không thể để trống. \"Default words (only for preview)\" chỉ dùng cho preview trong editor, không phải fallback khi input rỗng."
  QA-3212 TC-41 (03-testcases.md, tick inline): | TC-41 | BR13 | Field is required — empty input blocks submit | Validation | High | Personalization = Create new option, Default words configured, no prefill | 1. Open the product on SDK, leave the field empty<br>2. Inspect the field label<br>3. Attempt Add to cart | — | Field label shows the required asterisk `*` and the input carries `aria-required="true"`; counter reads `0/{{MAX}}`; **Add to cart is blocked** while the field is empty. The buyer is never able to order with no words ✅ AI | No | No |
  apps/tib/knowledge/qa_memory_history.md (chạy nhóm TC mới 2026-08-11): "**TC-73 (rủi ro cao nhất) PASS:** layer bị Conditional ẩn + field luôn required + field trống → **Add to cart vẫn thành công** trên storefront thật. Validation bỏ qua field bị điều kiện ẩn, không có rủi ro chặn đơn hàng."
  ```

### CLAIM-02

- **Statement:** Bấm 'Regenerate layout' nhiều lần ra layout khác nhau là đúng, không phải phá layout: mỗi lần bấm seed tăng 1, từ/shape/màu/số từ giữ nguyên, chỉ layout đóng gói đổi.
- **Object / feature:** artwork/layer-config-puzzles
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer, seller; portal (Design settings), storefront (form buyer)
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** AI (tick [AI], không có tick [QA]); QA (Yến) đính chính (persona nhóm F, không ghi ngày), 2026-08-26 (staging)
- **Locator:** QA-3343 TC-29 (outputs/QA-3343/results/result_QA-3343_B2_chromium_2026-08-26.md); ghi chú seed trong outputs/QA-3212/03-testcases.md; product_facts.md FACT-005 | https://ownego.atlassian.net/browse/QA-3343 | build hash: không rõ | Ghi chú: chỉ chứng minh qua seed đổi (0 sang 1, +1 mỗi lần bấm) và request render tương ứng, chưa so ảnh. (CCR cũ: CBS-041 CLAIM-02)
- **Căn cứ expected:** KHÔNG CÓ (khuôn cũ không ghi ticket, comment hay câu trả lời PO/Dev mà expected của TC dựa vào)
- **OQ:** NEEDS_CONFIRMATION — Regenerate layout ra layout khác mỗi lần bấm (seed +1, các thuộc tính khác giữ nguyên) là hành vi đúng đã ship chưa? Mới chứng minh qua seed và request render, chưa so ảnh. — Người trả lời: Dev. 
- **Trích nguyên văn:**
  ```
  TC-29 (result_QA-3343_B2_chromium_2026-08-26): ✅ AI — Regenerate trên origin đổi seed cho cả hai, mọi thứ khác giữ nguyên — Bấm `Regenerate layout` trong Design settings của origin → 2 request: `{fs:"20/120", seed:1, text:"love,mOm", shape:"6a8ec5a486ae6.svg", color:"#0000FF", color_source:"solid", word_count:50}` + `{fs:"30/60", seed:1, text:"love,mOm", shape:"6a8ec5a486ae6.svg", color:"#0000FF", color_source:"solid", word_count:50}` (trước đó `seed:0` ở cả hai)
  QA-3212 03-testcases.md (ghi chú storefront thật): "`layer-<id>-seed` = seed của layout. **Chỉ xuất hiện SAU khi buyer bấm "Regenerate layout"**; mỗi lần bấm seed +1 (1 → 2 → 3…). Chưa bấm thì key này không tồn tại."
  apps/tib/knowledge/product_facts.md dòng 40: - [FACT-005] **Bấm "Regenerate layout" nhiều lần ra layout khác nhau là ĐÚNG**, không phải phá layout.
  ```

### CLAIM-03

- **Statement:** Dedupe từ trùng là case-sensitive và chạy sau transform Input text case: với Normal thì `Love`, `love`, `LOVE` là 3 từ khác nhau (đều render); với UPPERCASE, lowercase, Capitalize thì gộp thành 1; trùng y hệt (`Love Love` với Normal) thì từ thứ 2 bị bỏ.
- **Object / feature:** artwork/layer-config-puzzles
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (nhập từ); storefront (form buyer, chip input), portal
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** AI (tick [AI], không có tick [QA]); QA (Yến) đính chính 2026-08-17; 2026-08-11 (TC-36 retest sau fix dedupe, TC-35 regression, staging)
- **Locator:** QA-3212 TC-35, TC-36 (outputs/QA-3212/03-testcases.md); qa_memory_history.md (mục TIB-4413, 'Retest bug 2026-08-11' và 'KB Word Cloud — sửa mục Duplicated words — 2026-08-17'); product_facts.md FACT-009 | https://ownego.atlassian.net/browse/QA-3212 | build hash: không rõ | Ghi chú: 'Capitalize gộp 3 biến thể thành 1' chỉ có kết quả 'FIXED' 2026-08-11 (TC-32/TC-37) và phân tích yêu cầu ghi 'verify which side of the transform applies' cho Capitalize; không coi là đã xác nhận bằng TC riêng. Con số ví dụ `Love love LOVE Family Love` (4 chip) là dữ liệu đo, không phải spec. (CCR cũ: CBS-041 CLAIM-03)
- **Căn cứ expected:** Phân tích yêu cầu QA-3212 §10, mục ghi 'PO/Dev' không tên người và không link (2026-08-06), nên không dùng làm xác nhận; trích ở khối dưới: "13. Duplicate removal → case-sensitive." và "17. Dedupe vs Input text case → dedupe runs after the case transform…".
- **OQ:** NEEDS_CONFIRMATION — Dedupe case-sensitive chạy sau transform Input text case, và Capitalize gộp 3 biến thể thành 1, có đúng không? Phân tích yêu cầu còn ghi 'verify which side of the transform applies' cho Capitalize, chưa có TC riêng. — Người trả lời: Dev. 
- **Trích nguyên văn:**
  ```
  QA-3212 TC-36 (03-testcases.md, tick inline): | TC-36 | BR11 | Dedupe runs AFTER the case transform — UPPERCASE collapses | Edge | High | Input text case = UPPERCASE | 1. Type `Love love` | `Love love` | Both normalize to `LOVE` and **collapse into one word** — input/cloud holds only 1 distinct word. Same expected result with case = lowercase ✅ AI (retest 2026-08-11: ĐÃ FIX) | No | No |
  QA-3212 TC-35 (03-testcases.md, tick inline): | TC-35 | BR11 | Case-sensitive dedupe — Input text case = Normal keeps both | Edge | High | Input text case = Normal | 1. Type `Love love` | `Love love` | Both words are kept (dedupe is case-sensitive) — input holds 2 distinct words, and both casings appear in the cloud ✅ AI | No | No |
  apps/tib/knowledge/qa_memory_history.md (Retest bug 2026-08-11): "**TC-36/TC-37 dedupe sau transform: FIXED** — UPPERCASE: `Love love LOVE Family` → `LOVE`, `FAMILY`." ▸ "**Regression check quan trọng khi fix dedupe:** phải kiểm lại TC-34/TC-35 với Text case = Normal. Kết quả: `Love love LOVE Family Love` → 4 chip (xoá đúng bản lặp, giữ 3 biến thể hoa/thường). Fix không làm hỏng nhánh case-sensitive."
  QA-3212 01-analysis.md §10 (PO/Dev, không ghi tên): "13. Duplicate removal → **case-sensitive**." ▸ "17. Dedupe vs Input text case → dedupe runs **after** the case transform, so with UPPERCASE/lowercase, \"Love\" and \"love\" **collapse into one word**."
  apps/tib/knowledge/product_facts.md dòng 44: - [FACT-009] **Dedupe từ trùng là case-sensitive và chạy SAU transform Text case.** `Normal` → `Love`/`love`/`LOVE` là **3 từ khác nhau**; UPPERCASE/lowercase/Capitalize → gộp thành 1.
  ```

### CLAIM-04

- **Statement:** Word Cloud có Drop shadow (nút icon-only `.qinline-shadow` ở toolbar mở popover `.qfield--shadow`: Enable shadow, color, X/Y/Blur, 'Display shadow on'); shadow của origin propagate sang linked copy, linked copy không có control shadow riêng; kết luận cũ 'không có control Drop shadow' (lô B2) là quan sát bị che vì innerText không đọc được nút icon-only.
- **Object / feature:** artwork/layer-config-puzzles
- **Quan hệ với canon:** `ADD`
- **Scope:** seller; portal (artwork editor toolbar)
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** AI (tick [AI], không có tick [QA]); QA (Yến) chốt premise 2026-08-27, 2026-08-27 (TC-25, staging)
- **Locator:** QA-3343 TC-25 (outputs/QA-3343/results/result_QA-3343_B3_chromium_2026-08-27.md); product_facts.md FACT-012 | https://ownego.atlassian.net/browse/QA-3343 | build hash: không rõ | Ghi chú: KB-031/CHK-005 hiện liệt kê field Design settings nhưng không có Drop shadow. Lần chạy trước (result_QA-3343_B2_chromium_2026-08-26) không phải bằng chứng PASS. (CCR cũ: CBS-041 CLAIM-04)
- **Căn cứ expected:** KHÔNG CÓ (khuôn cũ không ghi ticket, comment hay câu trả lời PO/Dev mà expected của TC dựa vào; premise do QA chốt 2026-08-27, không phải PO/Dev)
- **OQ:** NEEDS_CONFIRMATION — Word Cloud có Drop shadow và shadow origin propagate sang linked copy, đã ship chưa? KB-031/CHK-005 hiện không liệt kê Drop shadow, và kết luận cũ 'không có control Drop shadow' cần được thay thế. — Người trả lời: Dev. 
- **Trích nguyên văn:**
  ```
  TC-25 (result_QA-3343_B3_chromium_2026-08-27): ✅ AI — Drop shadow của origin propagate sang linked copy; linked KHÔNG có control shadow riêng — **Word Cloud CÓ Drop shadow** (bác bỏ kết luận lô B2). Nút nằm ở toolbar dạng icon-only `div.qinline-content > .qinline-shadow` — `innerText` KHÔNG đọc được nên B2 tưởng không có. Popover `.qfield--shadow` innerText = `"Enable shadow \| Shadow color: \| HEX \| X: \| Y: \| Blur: \| Display shadow on: \| Mockup Preview & Order Design \| Mockup Preview only (hide on Order Design) \| (Shadow does NOT work with AI, EPS, or PDF format)"`; input `#shadow-offset-x/#shadow-offset-y/#shadow-blur`, radio `display_shadow` = `mockup_order`/`mockup`.<br>**Oracle propagation = SVG `<filter>` của từng layer.** Trạng thái đầu (shadow ON 20/20/8): `artwork-filter-layer--artwork-preview-layer-<id> => <feDropShadow dx="10.8" dy="10.8" stdDeviation="4.32" flood-color="#000000">` và `...-<id> => <feDropShadow dx="10.8" dy="10.8" stdDeviation="4.32" flood-color="#000000">` (giống hệt).<br>**Đổi trên origin → X=60, Y=-40, Blur=24:** cả hai thành `dx="32.400000000000006" dy="-21.6" stdDeviation="12.96"` (= ×0.54 zoom preview) — **origin và linked giống hệt nhau**.<br>**Tắt `Enable shadow` trên origin** (`#shadow-enable input`.checked=false): filter của origin **VÀ** của linked **biến mất khỏi DOM cùng lúc**. Bật lại → cả hai xuất hiện lại với đúng 32.4/-21.6/12.96.<br>**Linked copy không có shadow riêng:** toolbar khi chọn layer linked = `["Transform","Align","Shape Cut","NUM(10)","NUM(14)"]` — không có SHADOW/COLOR/font. Toolbar origin = `["Transform","Align","Shape Cut","Multiple fonts","NUM(30)","NUM(60)","COLOR","SHADOW"]`
  TC-25 lần chạy trước (result_QA-3343_B2_chromium_2026-08-26, KHÔNG phải bằng chứng PASS): ⏸️ — Word Cloud KHÔNG có control Drop shadow nào trong Artwork Editor nên không có gì để bật/propagate
  apps/tib/knowledge/product_facts.md dòng 47: - [FACT-012] **Word Cloud CÓ Drop shadow.** User chốt 2026-08-27. ⇒ TC-25 của QA-3343 (shadow của origin propagate sang linked copy) **đúng premise, KHÔNG phải TC sai** — đừng park nó chờ PO/dev. Kết luận cũ của lô B2 ("không tìm thấy control Drop shadow nào trong editor, render params cũng không có field shadow") là **quan sát bị che**, đúng bẫy nhóm E: viewport hẹp gom control vào menu tràn `...`, hoặc shadow nằm trong panel Design settings phải mở ra mới thấy. Khi chạy lại: nới viewport ≥1600px, mở hết panel Design settings của origin, tìm cả trong menu tràn trước khi kết luận thiếu. Khớp với dòng "Ở local template vẫn SỬA ĐƯỢC: ... drop shadow ..." ở trên và với TC-18 (shadow là setting do origin điều khiển).
  ```
