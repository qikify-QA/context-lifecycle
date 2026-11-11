# Context Change Request: artwork-populate-token-resolver — token {{...}} không hợp lệ, Date picker, hằng số năm, tham số X, text tĩnh

- **Product:** `teeinblue`
- **Object:** `artwork`
- **Ticket:** `TIB-5385, TIB-5331, TIB-5355 (QA-3353, QA-3364, QA-3361, QA-3362)`
- **Các khối có trong file:** `A`

## Mức độ gấp

`MEDIUM` — ảnh hưởng coverage của resolver populate (CHK-007 và OQ-artwork-088 mới liệt kê tên 11 template, chưa có cú pháp); không có checklist đang publish nào bị chạy sai theo các Proposal gốc. Proposal gốc không chọn mức gấp (để mẫu trống), mức này do người soạn lại đề xuất.

# Khối A — Hành vi

### CLAIM-01

- **Statement:** token `{{...}}` có SHAPE hợp lệ nhưng nội dung sai (`{{value.context.<from>To<to>}}` đơn vị sai / typo `yaerToMonth`; `{{value.formula(...)}}` đủ ngoặc nhưng biểu thức sai: chia 0, thiếu vế, thiếu ngoặc, ký tự `%` `^`; hậu tố `.N` hỏng nằm TRONG ngoặc `formula(origin.2+1)`) → layer đích RỖNG (Live Preview hiện 'Default text')
- **Object / feature:** artwork/populate-values
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (giá trị nhập) · seller (cấu hình token); portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** AI (tick [AI]); không có tick [QA]; dev giangnth (mô tả), TC-24, TC-26, TC-39, TC-45: 2026-09-08 (staging); TC-93: 2026-09-10 (staging)
- **Locator:** QA-3353 TC-24, TC-26, TC-39, TC-45, TC-93 — outputs/QA-3353/results/result_QA-3353_auto_2026-09-08.md, result_QA-3353_auto_2026-09-10.md; apps/tib/knowledge/product_facts.md [FACT-022] [FACT-089] | https://ownego.atlassian.net/browse/QA-3353 | build hash: không rõ (QA không có quyền repo) | Ghi chú: Chỉ là hành vi quan sát trên fixture staging; dev mô tả 'layer left empty instead of showing broken text' nhưng không nói raw-value fallback; chưa PO nào duyệt việc `{{value.wibble}}` ra giá trị nguồn thay vì rỗng. (CCR cũ: CBS-040 CLAIM-01)
- **Căn cứ expected:** Mô tả của dev (không phải xác nhận), nằm trong khối trích nguyên văn: Dev giangnth (comment 2026-09-07 'Change summary & test cases', mô tả — không phải sign-off): "If the buyer's value is not a number, or the …
- **OQ:** NEEDS_CONFIRMATION — Token có shape hợp lệ nhưng nội dung sai (đơn vị sai, formula sai, hậu tố .N hỏng trong ngoặc) ra layer RỖNG có phải hành vi được duyệt, hay chỉ là hành vi quan sát trên staging? Dev chỉ mô tả 'layer left empty' và chưa nói raw-value fallback. — Người trả lời: PO. 
- **Trích nguyên văn:**
  ```
  TC-24 (result_QA-3353_auto_2026-09-08): ✅ AI — Unsupported unit → empty layer — TGT1 = "Default text" for SRC=40, placeholder={{value.context.yearToFortnight}} (unsupported unit "fortnight") — falls back to Default text (Live-preview empty-equivalent), not NaN/raw placeholder
  TC-26 (result_QA-3353_auto_2026-09-08): ✅ AI — Typo’d unit `yaerToMonth` → empty layer — TGT1 = "Default text" for SRC=40, placeholder={{value.context.yaerToMonth}} (typo'd FROM unit "yaer") — falls back to Default text
  TC-39 (result_QA-3353_auto_2026-09-08): ✅ AI — Division by zero → empty layer, not `Infinity`/`NaN` — TGT1 = "Default text" for SRC=10, placeholder={{value.formula(origin/0)}} — division by zero
  TC-45 (result_QA-3353_auto_2026-09-08): ✅ AI — Disallowed symbol `%` → empty — TGT1 = "Default text" for SRC=10, placeholder={{value.formula(origin%2)}} — disallowed "%" operator
  TC-93 (result_QA-3353_auto_2026-09-10): ✅ AI — Malformed `.N` inside the expression: `formula(origin.2+1)` → empty — TGT1 = "Default text" for SRC="5", placeholder={{value.formula(origin.2+1)}} — shape khớp formula(...), nội dung sai → bucket "empty" (Live preview hiện Default text, y hệt TC-39/40/45)
  Dev giangnth (comment 2026-09-07 'Change summary & test cases', mô tả — không phải sign-off): "If the buyer's value is not a number, or the formula/unit is not understood, the layer is left empty instead of showing broken text."
  apps/tib/knowledge/product_facts.md dòng 58: - [FACT-022] **Resolver populate — token `{{...}}` KHÔNG hợp lệ rơi vào 1 trong 3 nhóm (user review + probe 2026-09-09, QA-3353 fixture #<id>):**
    1. `{{value.context.<from>To<to>}}` khớp **shape** (cả 2 vế là chữ, kể cả unit sai như `yearToFortnight` hoặc typo `yaerToMonth`) → **layer rỗng** ("Default text"). Tương tự `{{value.formula(<expr>)}}` có đủ `(` … `)` nhưng expr sai.
    2. Bất kỳ `{{value.<gì đó>}}` **không** phải format hợp lệ hoàn chỉnh — gồm `{{value.context.yearTo}}` (thiếu `<to>`), `{{value.context}}`, `{{value.wibble}}`, `{{value.contextt.…}}`, `{{value.formula(origin+}}` (thiếu `)`) → **raw-value fallback** (render giá trị nguồn). Đây là hành vi cũ của `{{value}}`.
    3. `{{…}}` **không có prefix `value`** (`{{7*7}}`, `{{foobar}}`, `{{name}}`, `{{ }}`) → **layer rỗng** ("Default text"). Raw-value fallback CHỈ thuộc namespace `value.`.
    4. **Hậu tố `.N` hỏng thì đi theo nhóm 2, không phải nhóm 1 (thêm 2026-09-10, QA-3353 TC-93/TC-94).**
       Ranh giới là **ký tự sai nằm TRONG hay NGOÀI ngoặc**: `{{value.formula(origin.2+1)}}` (sai bên trong)
       → nhóm 1, **rỗng**; còn `{{value.formula(origin/3).abc}}` (`.abc` không phải hậu tố `.N` hợp lệ, sai bên
       ngoài) → shape tổng thể không khớp → nhóm 2, **raw-value fallback** (`10`), KHÔNG rỗng và KHÔNG phải `3.33`.
    ⇒ Hệ thống **không bao giờ** render một token chưa resolve ra **nguyên văn**. Đừng viết expected "hiện literal `{{...}}`". Đừng giả định `{{value.context.` prefix là đủ để "recognized" → phải khớp đủ shape `<from>To<to>`. BR-16 (QA-3353) ghi "unknown → raw fallback" hơi rộng: chỉ đúng trong namespace `value.`.
  ```

### CLAIM-02

- **Statement:** `{{value.<gì đó>}}` KHÔNG phải format hợp lệ hoàn chỉnh (`{{value.context.yearTo}}` thiếu `<to>`, `{{value.context}}`, `{{value.wibble}}`, `{{value.contextt.yearToMonth}}`, `{{value.formula(origin/3).abc}}` — `.abc` sai NGOÀI ngoặc) → RAW-VALUE FALLBACK (layer đích hiện giá trị nguồn, không rỗng)
- **Object / feature:** artwork/populate-values
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (giá trị nhập) · seller (cấu hình token); portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** AI (tick [AI]); không có tick [QA]; QA (Yến) review 2026-09-09 chỉ làm rõ cách đọc kết quả, không phải PO/Dev, TC-25: 2026-09-09; TC-27, TC-28: 2026-09-08; TC-94: 2026-09-10 (staging)
- **Locator:** QA-3353 TC-25, TC-27, TC-28, TC-94 — outputs/QA-3353/results/result_QA-3353_review_2026-09-09.md, result_QA-3353_auto_2026-09-08.md, result_QA-3353_auto_2026-09-10.md; apps/tib/knowledge/product_facts.md [FACT-022] [FACT-089] | https://ownego.atlassian.net/browse/QA-3353 | build hash: không rõ (QA không có quyền repo) | Ghi chú: Như CLAIM trước cùng nhóm: hành vi quan sát, chưa PO duyệt việc ra giá trị nguồn thay vì rỗng. (CCR cũ: CBS-040 CLAIM-02)
- **Căn cứ expected:** KHÔNG CÓ (khuôn cũ không ghi ticket, comment hay câu trả lời PO/Dev mà expected của TC dựa vào)
- **OQ:** NEEDS_CONFIRMATION — Format `{{value.<gì đó>}}` không hợp lệ hoàn chỉnh ra RAW-VALUE FALLBACK (giá trị nguồn thay vì rỗng) có được PO duyệt là hành vi đúng không? Hiện mới là hành vi quan sát. — Người trả lời: PO. 
- **Trích nguyên văn:**
  ```
  TC-25 (result_QA-3353_review_2026-09-09): ✅ AI — `{{value.context.yearTo}}` → raw "40", consistent with the unknown-`value.*` bucket (TC-27/28), NOT a bug — Probe #<id>: `{{value.context.yearTo}}`→"40", `{{value.context.To}}`→"40", `{{value.context}}`→"40", `{{value.wibble}}`→"40", `{{value.contextt.yearToMonth}}`→"40" — all identical raw passthrough. `{{value.context.yearToFortnight}}`→"Default text" (shape matches, bad unit). `{{7*7}}`/`{{foobar}}`/`{{name}}`→"Default text" (no `value` prefix).
  TC-27 (result_QA-3353_auto_2026-09-08): ✅ AI — Totally unknown format → raw-value fallback (NOT empty) — TGT1 = "40" for SRC=40, placeholder={{value.wibble}} (unknown format) — raw SRC value passthrough, not "Default text" and not the literal placeholder
  TC-28 (result_QA-3353_auto_2026-09-08): ✅ AI — Near-miss on format name → still falls in "unknown" bucket, not "malformed" — TGT1 = "40" for SRC=40, placeholder={{value.contextt.yearToMonth}} (typo'd prefix "contextt") — raw SRC passthrough, same bucket as TC-27
  TC-94 (result_QA-3353_auto_2026-09-10): ✅ AI — Non-integer `.N` suffix: `formula(origin/3).abc` → raw-value fallback — TGT1 = "10" for SRC="10", placeholder={{value.formula(origin/3).abc}} — raw fallback (bucket 2), KHÔNG phải 3.33 và KHÔNG phải empty
  apps/tib/knowledge/product_facts.md dòng 58: - [FACT-022] **Resolver populate — token `{{...}}` KHÔNG hợp lệ rơi vào 1 trong 3 nhóm (user review + probe 2026-09-09, QA-3353 fixture #<id>):**
    1. `{{value.context.<from>To<to>}}` khớp **shape** (cả 2 vế là chữ, kể cả unit sai như `yearToFortnight` hoặc typo `yaerToMonth`) → **layer rỗng** ("Default text"). Tương tự `{{value.formula(<expr>)}}` có đủ `(` … `)` nhưng expr sai.
    2. Bất kỳ `{{value.<gì đó>}}` **không** phải format hợp lệ hoàn chỉnh — gồm `{{value.context.yearTo}}` (thiếu `<to>`), `{{value.context}}`, `{{value.wibble}}`, `{{value.contextt.…}}`, `{{value.formula(origin+}}` (thiếu `)`) → **raw-value fallback** (render giá trị nguồn). Đây là hành vi cũ của `{{value}}`.
    3. `{{…}}` **không có prefix `value`** (`{{7*7}}`, `{{foobar}}`, `{{name}}`, `{{ }}`) → **layer rỗng** ("Default text"). Raw-value fallback CHỈ thuộc namespace `value.`.
    4. **Hậu tố `.N` hỏng thì đi theo nhóm 2, không phải nhóm 1 (thêm 2026-09-10, QA-3353 TC-93/TC-94).**
       Ranh giới là **ký tự sai nằm TRONG hay NGOÀI ngoặc**: `{{value.formula(origin.2+1)}}` (sai bên trong)
       → nhóm 1, **rỗng**; còn `{{value.formula(origin/3).abc}}` (`.abc` không phải hậu tố `.N` hợp lệ, sai bên
       ngoài) → shape tổng thể không khớp → nhóm 2, **raw-value fallback** (`10`), KHÔNG rỗng và KHÔNG phải `3.33`.
    ⇒ Hệ thống **không bao giờ** render một token chưa resolve ra **nguyên văn**. Đừng viết expected "hiện literal `{{...}}`". Đừng giả định `{{value.context.` prefix là đủ để "recognized" → phải khớp đủ shape `<from>To<to>`. BR-16 (QA-3353) ghi "unknown → raw fallback" hơi rộng: chỉ đúng trong namespace `value.`.
  ```

### CLAIM-03

- **Statement:** `{{...}}` KHÔNG có prefix `value` (`{{7*7}}`, `{{foobar}}`, `{{name}}`) → layer đích RỖNG ('Default text'); raw-value fallback chỉ thuộc namespace `value.`; hệ thống KHÔNG BAO GIỜ render token chưa resolve ra nguyên văn và KHÔNG tính `{{7*7}}` thành `49`
- **Object / feature:** artwork/populate-values
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (giá trị nhập) · seller (cấu hình token); portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** AI (tick [AI]); không có tick [QA], TC-84 và probe: 2026-09-09 (staging, fixture #<id>)
- **Locator:** QA-3353 TC-84 (probe `{{7*7}}`/`{{foobar}}`/`{{name}}` ở TC-25) — outputs/QA-3353/results/result_QA-3353_review_2026-09-09.md; apps/tib/knowledge/product_facts.md [FACT-022] | https://ownego.atlassian.net/browse/QA-3353 | build hash: không rõ (QA không có quyền repo) | Ghi chú: Như trên: hành vi quan sát trên staging, chưa PO duyệt. (CCR cũ: CBS-040 CLAIM-03)
- **Căn cứ expected:** KHÔNG CÓ (khuôn cũ không ghi ticket, comment hay câu trả lời PO/Dev mà expected của TC dựa vào)
- **OQ:** NEEDS_CONFIRMATION — Token không có prefix `value` ra layer RỖNG và raw fallback chỉ thuộc namespace `value.` có được PO duyệt không? Hiện mới là hành vi quan sát trên staging. — Người trả lời: PO. 
- **Trích nguyên văn:**
  ```
  TC-84 (result_QA-3353_review_2026-09-09): ✅ AI — SECURITY PASS: `{{7*7}}` not evaluated (no `49`, no injection); only `{{value.formula(origin+1)}}` resolves → `6` — `prefix {{7*7}} {{value.formula(origin+1)}} suffix`, SRC=5 → `"prefix  6 suffix"`. Probe: bare `{{7*7}}`→"Default text", same as `{{foobar}}`/`{{name}}`.
  Probe (trong dòng TC-25 của result_QA-3353_review_2026-09-09): `{{7*7}}`/`{{foobar}}`/`{{name}}`→"Default text" (no `value` prefix).
  apps/tib/knowledge/product_facts.md dòng 58: - [FACT-022] **Resolver populate — token `{{...}}` KHÔNG hợp lệ rơi vào 1 trong 3 nhóm (user review + probe 2026-09-09, QA-3353 fixture #<id>):**
    1. `{{value.context.<from>To<to>}}` khớp **shape** (cả 2 vế là chữ, kể cả unit sai như `yearToFortnight` hoặc typo `yaerToMonth`) → **layer rỗng** ("Default text"). Tương tự `{{value.formula(<expr>)}}` có đủ `(` … `)` nhưng expr sai.
    2. Bất kỳ `{{value.<gì đó>}}` **không** phải format hợp lệ hoàn chỉnh — gồm `{{value.context.yearTo}}` (thiếu `<to>`), `{{value.context}}`, `{{value.wibble}}`, `{{value.contextt.…}}`, `{{value.formula(origin+}}` (thiếu `)`) → **raw-value fallback** (render giá trị nguồn). Đây là hành vi cũ của `{{value}}`.
    3. `{{…}}` **không có prefix `value`** (`{{7*7}}`, `{{foobar}}`, `{{name}}`, `{{ }}`) → **layer rỗng** ("Default text"). Raw-value fallback CHỈ thuộc namespace `value.`.
    4. **Hậu tố `.N` hỏng thì đi theo nhóm 2, không phải nhóm 1 (thêm 2026-09-10, QA-3353 TC-93/TC-94).**
       Ranh giới là **ký tự sai nằm TRONG hay NGOÀI ngoặc**: `{{value.formula(origin.2+1)}}` (sai bên trong)
       → nhóm 1, **rỗng**; còn `{{value.formula(origin/3).abc}}` (`.abc` không phải hậu tố `.N` hợp lệ, sai bên
       ngoài) → shape tổng thể không khớp → nhóm 2, **raw-value fallback** (`10`), KHÔNG rỗng và KHÔNG phải `3.33`.
    ⇒ Hệ thống **không bao giờ** render một token chưa resolve ra **nguyên văn**. Đừng viết expected "hiện literal `{{...}}`". Đừng giả định `{{value.context.` prefix là đủ để "recognized" → phải khớp đủ shape `<from>To<to>`. BR-16 (QA-3353) ghi "unknown → raw fallback" hơi rộng: chỉ đúng trong namespace `value.`.
  ```

### CLAIM-04

- **Statement:** nguồn Date picker (layer text `form_input_type: 'date'`) KHÔNG nuôi được `{{value.context.*}}` / `{{value.formula(...)}}` → cả hai ra RỖNG (chuỗi ngày `YYYY-MM-DD` không qua cổng numeric); `{{value}}` thì vẫn render ngày; không có token 'hôm nay'/'now' nên không làm được date-diff
- **Object / feature:** artwork/populate-values
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (chọn ngày) · seller (cấu hình token); portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA (Yến) đo tay — theo ghi chú product_facts.md, 2026-09-10 (QA đo tay)
- **Locator:** apps/tib/knowledge/product_facts.md [FACT-023]; không có TC tương ứng trong QA-3353 (TC-58/59 chỉ kiểm chữ/chuỗi lẫn trong input số) | https://ownego.atlassian.net/browse/TIB-5385 | Ghi chú: Chưa ai (PO/Dev) trả lời đây là giới hạn mong muốn hay lỗi; không coi là chủ ý thiết kế. (CCR cũ: CBS-040 CLAIM-04)
- **OQ:** OPEN_ISSUE — Date picker không nuôi được `{{value.context.*}}` / `{{value.formula(...)}}` (ra rỗng) là giới hạn mong muốn hay lỗi? Chưa ai trả lời, không coi là chủ ý thiết kế. — Người trả lời: PO. 
- **Trích nguyên văn:**
  ```
  apps/tib/knowledge/product_facts.md dòng 67: - [FACT-023] **Nguồn Date picker KHÔNG nuôi được `{{value.context.*}}` / `{{value.formula(...)}}` — cả hai ra RỖNG (đo 2026-09-10, artwork nháp #<id> đã xoá).** Layer text có `form_input_type: 'date'` (enum lưu là `date`, UI "Input type → Date picker", widget flatpickr, hidden input giữ `YYYY-MM-DD`). Chọn 2026-09-10 → target `{{value}}` render **`2026-09-10`** bình thường, nhưng `{{value.context.dayToHour}}` và `{{value.formula(origin+1)}}` đều ra **Default text** (rỗng) vì chuỗi ngày không qua được cổng numeric (cùng nhóm TC-58/59). **Không có token "hôm nay"/"now"** trong group "Text & Curve Text" (11 row: value · Xchar · capitalonly · initialofword×4 · firstword · lastword · context · formula) ⇒ **không làm được date-diff** kiểu "đã bao nhiêu ngày kể từ ngày kỷ niệm". Hệ quả cho yêu cầu khách: TIB-5385 chỉ quy đổi ĐƠN VỊ của một SỐ buyer tự gõ, không tự đếm từ một NGÀY. Nhánh chưa test: Calendar layer + token `{{date.<format>}}`.
  Dev giangnth (comment 2026-09-07 'Change summary & test cases', mô tả — không phải sign-off): "If the buyer's value is not a number, or the formula/unit is not understood, the layer is left empty instead of showing broken text."
  ```

### CLAIM-05

- **Statement:** hằng số năm của `{{value.context.*}}` là 365.2425 ngày/năm (năm Gregorian trung bình), dựng cứng, không có UI chọn '1 year = 365 days'; đo: `1 yearToSecond` = 31 556 952, `40 yearToDay` = 14 610, `2026 yearToDay` = 739 981; muốn 365 ngày/năm dùng `{{value.formula(originx365)}}`
- **Object / feature:** artwork/populate-values
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (giá trị nhập) · seller (cấu hình token); portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA (Yến) đo; dev giangnth (mô tả); AI (tick [AI] TC-12, TC-13), 2026-09-10 (QA đo tay); 2026-09-07 (comment dev); TC-12, TC-13: 2026-09-08 (staging)
- **Locator:** apps/tib/knowledge/product_facts.md [FACT-024]; TIB-5385 comment dev giangnth; QA-3353 TC-12, TC-13 — results/result_QA-3353_auto_2026-09-08.md | https://ownego.atlassian.net/browse/TIB-5385?focusedCommentId=50134 | Ghi chú: Các số đo cụ thể (31 556 952 giây, 14 610 ngày, 739 981 ngày) là kết quả đo lúc ghi, không phải giá trị bắt buộc. (CCR cũ: CBS-040 CLAIM-05)
- **OQ:** NEEDS_CONFIRMATION — Hằng số 365.2425 ngày/năm dựng cứng cho `{{value.context.*}}` có phải hành vi chủ ý được chốt không? Claim không có nguồn xác nhận trực tiếp ngoài FACT và comment dev. — Người trả lời: Dev. 
- **Trích nguyên văn:**
  ```
  Dev giangnth (comment 2026-09-07, mô tả — không phải sign-off): "A year is treated as **365.2425 days** (the mean Gregorian year) and a month as exactly **one twelfth of a year** (~30.44 days). This is a deliberate product decision — the buyer types a bare number with no start date attached, so there is no calendar to check leap years or 30 vs 31 day months against."
  TC-12 (result_QA-3353_auto_2026-09-08): ✅ AI — `1 yearToWeek` = `52` (365.2425/7=52.1746 → round) — TGT1 = "52" for SRC=1, placeholder={{value.context.yearToWeek}}
  TC-13 (result_QA-3353_auto_2026-09-08): ✅ AI — `40 yearToDay` = `14610` (never `14600`/`366`-based) — TGT1 = "14610" for SRC=40, placeholder={{value.context.yearToDay}} — confirms mean-length (365.2425), not calendar/leap-year
  apps/tib/knowledge/product_facts.md dòng 68: - [FACT-024] **Hằng số năm của `{{value.context.*}}` là 365.2425 ngày/năm (năm Gregorian trung bình), DỰNG CỨNG — không có UI chọn "1 year = 365 days" (đo 2026-09-10).** Bằng chứng khớp 3 điểm: `1 yearToSecond` = 31 556 952 = 365,2425 × 86 400; `40 yearToDay` = 14 610; `2026 yearToDay` = 739 981 (nếu 365 thì phải là 739 490). Muốn đúng 365 ngày/năm thì **không dùng token context**, dùng `{{value.formula(originx365)}}`.
  ```

### CLAIM-06

- **Statement:** Parse rule của tham số X KHÔNG đồng nhất giữa các token — đo trên `{{value.Xchar}}` (SRC `Daniel & Sophie` = 15 ký tự): `.0char` → rỗng; `.999999999999char` → nguyên chuỗi; `.abcchar` → raw fallback; `.-1char` → `Daniel & Sophi` (slice âm, KHÁC `initialofword.-1` = raw fallback); `.1.5char` → `D` (nhận số thập phân)
- **Object / feature:** artwork/populate-values
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (giá trị nhập) · seller (cấu hình token); portal
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA (Yến) đo tay — theo ghi chú product_facts.md; dev giangnth (mô tả trong comment 2026-09-09, chỉ cho `initialofword.X`), 2026-09-17 (QA đo tay)
- **Locator:** apps/tib/knowledge/product_facts.md [FACT-100]; QA-3364 TC-15, TC-51 (chỉ cho `initialofword.X`, không cho `Xchar`) — outputs/QA-3364/results/result_QA-3364_lane2_auto_2026-09-19.md | https://ownego.atlassian.net/browse/TIB-5331?focusedCommentId=50379 | Ghi chú: Số đo `Daniel & Sophi` không phải giá trị bắt buộc; dev 'confirmed behavior' chưa trích được nguyên văn; `.-1char` cắt bớt ký tự có thể là lỗi chưa ai phân xử. (CCR cũ: CBS-040 CLAIM-12)
- **OQ:** NEEDS_CONFIRMATION — Parse rule của tham số X khác nhau giữa các token (vd `.-1char` cắt bớt ký tự, `.1.5char` nhận số thập phân) là hành vi đúng hay lỗi? Dev 'confirmed behavior' chưa trích được nguyên văn và chưa rõ đã ship hay chưa. — Người trả lời: Dev. 
- **Trích nguyên văn:**
  ```
  apps/tib/knowledge/product_facts.md dòng 236: - [FACT-100] **⚠️ Parse rule cho tham số `X` KHÔNG đồng nhất giữa các token — đừng suy diễn từ `initialofword.X` sang token khác.** Đo trên `{{value.Xchar}}` (nhóm cùng dropdown, cú pháp `{{value.<N>char}}`, SRC `Daniel & Sophie` = 15 ký tự, 2026-09-17): `.0char` → rỗng (giống BR-4a của initialofword); `.999999999999char` → nguyên `Daniel & Sophie` (out-of-range dương = cả chuỗi, không lỗi); `.abcchar` (non-numeric) → raw-value fallback (giống BR-4b). Nhưng **`.-1char` → `Daniel & Sophi`** (cắt bớt 1 ký tự cuối — slice âm kiểu JS `slice(0, X)`) **KHÁC HẲN** `initialofword.-1` (raw fallback nguyên chuỗi, xem trên — dev tự xác nhận cả hai đều "confirmed behavior", không cái nào là bug, chỉ là 2 token dùng 2 cách xử lý X âm khác nhau); và **`.1.5char` → `D`** (chấp nhận số thập phân, có vẻ dùng `parseInt`/truncate chứ không phải regex `^\d+$` strict như initialofword — RQ9 kết luận "X parse bằng regex strict" CHỈ đúng cho `initialofword.X`, không generalize toàn bộ họ token `.X`). Không có TC nào cho `Xchar` trong QA-3364 (ngoài scope TIB-5331) — ghi lại đây làm tham chiếu nếu sau có ticket đụng tới token này.
  Dev giangnth (TIB-5331, comment 2026-09-09, mô tả — không phải sign-off; chỉ nói về `initialofword.X`): "Malformed `X` deviates from the written spec. The issue says an invalid `X` returns an empty value. Only a numeric `X` that points at no word does that; a non-numeric suffix falls through to the codebase's pre-existing \"unknown token prints the raw value\" behaviour. Changing that would alter existing behaviour outside this issue's scope, so it was left alone by decision."
  ```

### CLAIM-07

- **Statement:** Text layer TĨNH (không gắn populate/personalization config) KHÔNG đi qua populate resolver, luôn vẽ NGUYÊN VĂN: gõ `{{7*7}}` hay `<b>bold</b>` vào content hiện đúng chuỗi đó (không thành `49`, không bold hoá), ở editor lẫn render server-side (Preview/mockup)
- **Object / feature:** artwork/populate-values
- **Quan hệ với canon:** `ADD`
- **Scope:** seller (owner/staff); portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** AI chạy ([AI]); render server-side chỉ xác nhận 'sinh thumbnail thành công' (thumbnail 300px không đọc được chữ), 2026-09-17
- **Locator:** QA-3362 TC-15 (results/result_QA-3362_final_2026-09-17.md) · QA-3361 TC-24 (results/result_QA-3361_B7_2026-09-17.md); product_facts.md dòng 182 (FACT-063) | https://ownego.atlassian.net/browse/TIB-5355 · https://ownego.atlassian.net/browse/QA-3361 · https://ownego.atlassian.net/browse/TIB-5435 · https://ownego.atlassian.net/browse/QA-3362 | build hash: không rõ (QA không có quyền repo) | Ghi chú: Render server-side chỉ xác nhận 'sinh thumbnail thành công'. Phân biệt với lesson QA-3353 (populate resolver chỉ áp cho field đã gắn populate config); liên quan nhóm token ở file populate-token-resolver. (CCR cũ: CBS-043 CLAIM-14)
- **Căn cứ expected:** KHÔNG CÓ (khuôn cũ không ghi ticket, comment hay câu trả lời PO/Dev mà expected của TC dựa vào)
- **OQ:** NEEDS_CONFIRMATION — Text layer tĩnh vẽ nguyên văn ở render server-side (Preview/mockup) có được xác nhận đủ không? Nguồn chỉ xác nhận 'sinh thumbnail thành công'. — Người trả lời: Dev. 
- **Trích nguyên văn:**
  ```
  QA-3362 TC-15 (result_QA-3362_final_2026-09-17): ✅ AI — Từ trạng thái flip TC-1, default text = `{{7*7}} <b>x</b>` (ô `input[name=text]` trong Layer editor) → svg `<text>` editor `textContent="{{7*7}} <b>x</b>"`, innerHTML `{{7*7}} &lt;b&gt;x&lt;/b&gt;`, không `<b>`. Save & Close → reopen: GraphQL text(330,100,0°) photo(60,150,0°,fH=true) — **đúng giá trị TC-1, không drift, không flip lần 2**; text lưu literal. Mở Transform trên group → **Flip horizontal vẫn checked** (`checked=true`), V unchecked. Zoom 100% bảng vẽ: text hiện literal `{{7*7}} <b>x</b>` ở bên phải, photo mirror bên trái (`evidence/pass_TIB-5435_TC-15_editor_100pct.png`). Thumbnail …
  QA-3361 TC-24 (result_QA-3361_B7_2026-09-17): ✅ AI — 6 payload đều render literal, không thực thi, box bám layer — **Reflected** (6/6): svg `<text>` của TA == payload y nguyên: X1 `<script>console.log('xss-test-QA')</script>` · X2 `"><img src=x onerror=alert(1)>` · X8 `<div onmouseover=alert(1)>hover</div>` · A2 `<b>bold</b>` · A2 `<style>body{display:none}</style>` · A4 `{{7*7}}`; injected node = 0, `document.scripts` = 7 không đổi, alert = 0, dialog = 0, `body display:block`, không có log `xss-test-QA`. Với mỗi payload chọn TA+…
  product_facts.md dòng 182: - **Text layer TĨNH (không gắn populate/personalization config) KHÔNG đi qua populate resolver — luôn vẽ NGUYÊN VĂN — dev chốt 2026-09-16 (QA-3361, RQ2).** Gõ trực tiếp `{{7*7}}` hay `<b>bold</b>` vào content của một text layer thường (không phải field populate) → hiện đúng chuỗi ký tự đó (không thành `49`, không bị bold hoá), cả ở editor lẫn render engine server-side (Preview/mockup). Đừng nhầm với lesson QA-3353 (populate resolver trả rỗng cho token `{{...}}` không prefix `value`) — lesson đó CHỈ áp dụng cho field đã gắn populate config, một code path khác.
  ```
