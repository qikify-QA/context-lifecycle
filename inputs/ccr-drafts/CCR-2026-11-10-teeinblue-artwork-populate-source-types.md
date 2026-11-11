# Context Change Request: artwork-populate-source-types — layer làm nguồn populate, Populate Color, Dynamic Clipart by Text

- **Product:** `teeinblue`
- **Object:** `artwork`
- **Ticket:** `TIB-5331, TIB-1636 (QA-2844), TIB-4726 (QA-3416), TIB-5600 (QA-3418), TIB-5271`
- **Các khối có trong file:** `A`

## Mức độ gấp

`MEDIUM` — ảnh hưởng coverage: dropdown nguồn và hành vi Populate Color/DCT chưa có checklist; một số câu (Paragraph/Spiral) có thể đã lỗi thời sau TIB-5271. Proposal gốc không chọn mức gấp, mức này do người soạn lại đề xuất.

# Khối A — Hành vi

### CLAIM-01

- **Statement:** option `{{value.initialofword.X}}` hiện trong Available values và resolve đúng trên 5 loại layer: Single-line Text, Curve Text, Warp Text, Paragraph (làm đích), QR Code (QR encode đúng chuỗi đã resolve, decode ra `D`); không có layer type 'Shape Text' / 'Clipart Frame' trong picker
- **Object / feature:** artwork/populate-values
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (giá trị nhập) · seller (chèn token); portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** AI (tick [AI]); không có tick [QA]; đính chính loại layer do QA (Yến) 2026-09-17, TC-5: 2026-09-23 (staging); TC-47: 2026-09-17 (staging)
- **Locator:** QA-3364 TC-5, TC-47 — outputs/QA-3364/results/result_QA-3364_verify_tc5fix_0923_auto_2026-09-23.md, result_QA-3364_TC-2-5-47_2026-09-17.md; apps/tib/knowledge/product_facts.md [FACT-094] | https://ownego.atlassian.net/browse/QA-3364 | build hash: không rõ (QA không có quyền repo) (CCR cũ: CBS-040 CLAIM-06)
- **Căn cứ expected:** KHÔNG CÓ (khuôn cũ không ghi ticket, comment hay câu trả lời PO/Dev mà expected của TC dựa vào)
- **Trích nguyên văn:**
  ```
  TC-5 (result_QA-3364_verify_tc5fix_0923_auto_2026-09-23): ✅ AI — Option present in Available values dropdown for all 5 real supported types (Text, Curve Text, Warp Text, Paragraph, QR Code). PASS sạch 3 lượt liên tiếp trên Playwright (`npx playwright test populate-layer/initialofword.spec.js -g "TC-5 —"`, 49–56s/lượt) sau khi vá 2 chỗ rò modal trong `addTempLayerAndCheckToken()` (BUG-05 phần 2, 2026-09-23): hàm mở `.vue-dialog-content.lookup-value-popup` + `.layer-editor-panel` nhưng không đóng trước khi return — TC-5 gọi hàm này 4 lần liên tiếp nên lượt sau bị panel/modal của lượt trước che nút "Layer" (`#field__lookup_value_helper …intercepts pointer events`), timeout 20s. Đã bọc try/finally đóng cả modal (Escape) lẫn panel (`portal.closeLayerEditorPanel()`) trước mọi nhánh return. — commit `e9a9d4a` (phần 1, 2026-09-22) + phần 2 vá 2026-09-23 trong `apps/tib/automation/populate-layer/initialofword.spec.js`
  TC-47 (result_QA-3364_TC-2-5-47_2026-09-17): ✅ AI — Token resolves correctly on all 5 real types (T-TEXT/T-CURVE/T-PARA/T-WARP render "D", QR decodes to "D"), re-verified with SRC="Xavier Quinn" → "X" on T-TEXT/QR. No literal token leaked on any layer. Same scope correction as TC-5.
  apps/tib/knowledge/product_facts.md dòng 230: - [FACT-094] **Layer thấy option + resolve được:** Single-line Text, Curve Text, Paragraph, Warp Text, QR Code (QR encode đúng chuỗi resolved, decode ra `D`). Spiral Text / Clipart Category / Dynamic Clipart by Text: không có nhóm text trong Browse values, không chọn được text layer làm source → token không áp dụng. Không có layer type tên "Shape Text"/"Clipart Frame" trong picker.
  ```

### CLAIM-02

- **Statement:** Spiral Text / Clipart Category / Dynamic Clipart by Text: không có nhóm text trong Browse values, không chọn được text layer làm source → token populate không áp dụng (phần Spiral Text có thể đã LỖI THỜI sau TIB-5271)
- **Object / feature:** artwork/populate-values
- **Quan hệ với canon:** `ADD`
- **Scope:** seller (cấu hình populate); portal
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA (Yến) đo staging — theo ghi chú product_facts.md, 2026-09-16 (QA đo staging)
- **Locator:** apps/tib/knowledge/product_facts.md [FACT-094]; apps/tib/outputs/QA-3393/ccr/CCR-2026-10-28-populate-all-text-layers.md (CCR đang mở, TIB-5271) | https://ownego.atlassian.net/browse/QA-3364 | Ghi chú: Phần Spiral Text có thể đã lỗi thời: TIB-5271 (production 2026-10-26, theo CCR QA-3393) cho Paragraph và Spiral làm source. OPEN QUESTION: bỏ hẳn hay sửa câu này. (CCR cũ: CBS-040 CLAIM-07)
- **OQ:** NEEDS_CONFIRMATION — Phần Spiral Text không làm source populate có còn đúng sau TIB-5271 (production 2026-10-26) không, nên bỏ hẳn hay sửa câu này? Claim không có nguồn và chưa rõ đã ship. — Người trả lời: Dev. 
- **Trích nguyên văn:**
  ```
  apps/tib/knowledge/product_facts.md dòng 230: - [FACT-094] **Layer thấy option + resolve được:** Single-line Text, Curve Text, Paragraph, Warp Text, QR Code (QR encode đúng chuỗi resolved, decode ra `D`). Spiral Text / Clipart Category / Dynamic Clipart by Text: không có nhóm text trong Browse values, không chọn được text layer làm source → token không áp dụng. Không có layer type tên "Shape Text"/"Clipart Frame" trong picker.
  CCR QA-3393 (TIB-5271), Phần 1 'Thay đổi đã ship': "Source Single-line/Curve/Warp/Spiral → popup \"Browse values\" hiện short code nhóm \"Text, Curve Text, Warp Text & Spiral Text\" (tên nhóm mới)."
  ```

### CLAIM-03

- **Statement:** 'Populate X from another option' (panel POPULATE VALUES) luôn trỏ tới 1 LAYER cụ thể, KHÔNG BAO GIỜ trỏ trực tiếp tới 1 Global Option — GO chỉ là container nhóm layer, không phải nguồn populate
- **Object / feature:** artwork/populate-values
- **Quan hệ với canon:** `ADD`
- **Scope:** seller (cấu hình populate); portal
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA (Yến) đính chính; AI (tick [AI] TC-57, TC-58), 2026-10-15 (QA đính chính)
- **Locator:** apps/tib/knowledge/product_facts.md [FACT-096]; QA-2844 TC-57, TC-58 — outputs/QA-2844/results/result_QA-2844_B5-TC57-58_2026-10-15.md | https://ownego.atlassian.net/browse/QA-2844 (CCR cũ: CBS-040 CLAIM-09)
- **OQ:** NEEDS_CONFIRMATION — 'Populate X from another option' luôn trỏ tới 1 layer cụ thể, không bao giờ trỏ trực tiếp tới 1 Global Option, có phải thiết kế đã chốt không? Claim không có nguồn và chưa rõ đã ship. — Người trả lời: Dev. 
- **Trích nguyên văn:**
  ```
  apps/tib/knowledge/product_facts.md dòng 232: - [FACT-096] **"Populate X from another option" (panel "POPULATE VALUES") luôn trỏ tới 1 LAYER cụ thể, KHÔNG BAO GIỜ trỏ trực tiếp tới 1 Global Option** — GO chỉ là container nhóm nhiều layer lại, không phải nguồn populate (QA đính chính 2026-10-15, QA-2844, sau khi TC-57..60 viết nhầm thành "trỏ GO"). Dropdown source lọc theo TYPE của layer, mỗi field populate chấp nhận type khác nhau: **Content** → Single-line Text layer (Paragraph không được làm source, xem bullet trên); **Color** → CHỈ layer type `color` (`color_picker`/`color_category_option`) — trỏ layer `text` ra "List is empty" dù set qua API vẫn lưu được field (TIB-5636/QA-2844 TC-57/58); **Background** → CHỈ layer type `clipart-category`/`group-clipart-categories` — cùng pattern lọc-theo-type như Color (QA-2844 TC-59/60). Đừng viết TC/expected mô tả populate Background/Color là "trỏ Global Option X" — phải nói rõ "trỏ layer clipart-category/color tên Y" (Y có thể đang nằm dưới 1 GO để nhóm, nhưng đó không phải điều field populate tham chiếu).
  TC-57 (result_QA-2844_B5-TC57-58_2026-10-15): ✅ AI — panel "POPULATE VALUES": Content Source option="VT-GO57-Source", Color "Select a Color option"="VT-ColorSource57" (cả hai hiện đúng tên, không "List is empty").
  ```

### CLAIM-04

- **Statement:** Dropdown source của từng field Populate lọc theo TYPE của layer: Content → Single-line Text layer (Paragraph không làm source — có thể lỗi thời sau TIB-5271); Color → CHỈ layer type `color` (`color_picker`/`color_category_option`), trỏ layer `text` ra 'List is empty' dù set qua API vẫn lưu được field; Background → CHỈ layer `clipart-category`/`group-clipart-categories`
- **Object / feature:** artwork/populate-values
- **Quan hệ với canon:** `ADD`
- **Scope:** seller (cấu hình populate); portal
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** AI (quan sát khi dựng fixture); QA (Yến) đính chính, 2026-10-15 (QA-2844; ghi chú QA đính chính)
- **Locator:** apps/tib/knowledge/product_facts.md [FACT-096]; outputs/QA-2844/results/result_QA-2844_B5-TC57-58_2026-10-15.md (mục 'Phát hiện kỹ thuật'); result_QA-2844_B5-TC59-60_2026-10-15.md | https://ownego.atlassian.net/browse/QA-2844 | Ghi chú: Vế 'Content chỉ nhận Single-line Text' (Paragraph không làm source) có thể đã lỗi thời sau TIB-5271 (CCR QA-3393). OPEN QUESTION: bỏ hay sửa. Không dùng để nói populate Color/Background là 'trỏ Global Option'. (CCR cũ: CBS-040 CLAIM-10)
- **OQ:** NEEDS_CONFIRMATION — Vế 'Content chỉ nhận Single-line Text' (Paragraph không làm source) có còn đúng sau TIB-5271 không, nên bỏ hay sửa? Claim không có nguồn và chưa rõ đã ship. — Người trả lời: Dev. 
- **Trích nguyên văn:**
  ```
  result_QA-2844_B5-TC57-58_2026-10-15 (Phát hiện kỹ thuật): "Dropdown \"Select a Color option\" (field `retrieval_styles.color.layer`) CHỈ liệt kê layer TYPE `color` (`color_option: color_picker_option/color_category_option`) — trỏ vào layer `text` (kể cả không GO) ra thẳng \"List is empty\", dù set `retrieval_styles.color.layer`+`enabled` qua API vẫn lưu được (field tồn tại, không lỗi) nhưng UI hiện \"Select an option\" (không hiện tên layer đã set)"
  TC-59 (result_QA-2844_B5-TC59-60_2026-10-15): ✅ AI
  apps/tib/knowledge/product_facts.md dòng 232: - [FACT-096] **"Populate X from another option" (panel "POPULATE VALUES") luôn trỏ tới 1 LAYER cụ thể, KHÔNG BAO GIỜ trỏ trực tiếp tới 1 Global Option** — GO chỉ là container nhóm nhiều layer lại, không phải nguồn populate (QA đính chính 2026-10-15, QA-2844, sau khi TC-57..60 viết nhầm thành "trỏ GO"). Dropdown source lọc theo TYPE của layer, mỗi field populate chấp nhận type khác nhau: **Content** → Single-line Text layer (Paragraph không được làm source, xem bullet trên); **Color** → CHỈ layer type `color` (`color_picker`/`color_category_option`) — trỏ layer `text` ra "List is empty" dù set qua API vẫn lưu được field (TIB-5636/QA-2844 TC-57/58); **Background** → CHỈ layer type `clipart-category`/`group-clipart-categories` — cùng pattern lọc-theo-type như Color (QA-2844 TC-59/60). Đừng viết TC/expected mô tả populate Background/Color là "trỏ Global Option X" — phải nói rõ "trỏ layer clipart-category/color tên Y" (Y có thể đang nằm dưới 1 GO để nhóm, nhưng đó không phải điều field populate tham chiếu).
  ```

### CLAIM-05

- **Statement:** 'Populate Color from another option' của shape/vector/text chỉ trỏ vào 1 layer Color (color-picker) TRONG CÙNG ARTWORK và đồng bộ: đổi Color option → shape đổi màu ở Live Preview (TC-26) và storefront + cart thumbnail (TC-27); canvas editor (TC-25) vẫn chưa đồng bộ
- **Object / feature:** artwork/populate-values
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (chọn màu) · seller (cấu hình populate); portal · storefront
- **Đã ship:** `NOT_SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** AI (tick [AI]); không có tick [QA], TC-26: 2026-10-28 (staging); TC-27: 2026-10-29 (staging)
- **Locator:** QA-3416 TC-26 (BUG-05 retest) — outputs/QA-3416/results/result_QA-3416_retest-BUG05_2026-10-28.md; TC-27 — result_QA-3416_TC27_2026-10-29.md; apps/tib/knowledge/product_facts.md [FACT-162] | https://ownego.atlassian.net/browse/QA-3416 | build hash: không rõ (QA không có quyền repo) | Ghi chú: Không coi là bằng chứng canvas editor đã đồng bộ: TC-25 vẫn FAIL (AI) 2026-10-28; TIB-4726 chưa Passed. (CCR cũ: CBS-040 CLAIM-13)
- **Căn cứ expected:** KHÔNG CÓ (khuôn cũ không ghi ticket, comment hay câu trả lời PO/Dev mà expected của TC dựa vào)
- **OQ:** NEEDS_CONFIRMATION — Populate Color của shape/vector/text đã đồng bộ ở storefront và cart thumbnail nhưng canvas editor (TC-25) vẫn FAIL; hành vi mong đợi cuối cùng cho canvas editor là gì và khi nào ship (TIB-4726 chưa Passed)? — Người trả lời: Dev. 
- **Trích nguyên văn:**
  ```
  TC-26 (result_QA-3416_retest-BUG05_2026-10-28): ✅ AI — Live preview (`#artwork-live-preview-artwork-layer--layer-<id> rect[fill]`) baseline `#FF9900`, sau khi đổi Color option sang `#00B140` → đọc lại `#00B140`, khớp giá trị vừa chọn, không cần reload.
  TC-27 (result_QA-3416_TC27_2026-10-29): ✅ AI — Populate Color sync đúng trên storefront, cart thumbnail đúng màu — `evidence/tc27_after_atc4.png` (cart thumbnail #FFFF00)
  TC-25 (result_QA-3416_retest-BUG05_2026-10-28, KHÔNG phải bằng chứng PASS): ❌ AI — Đổi Color option (`layer-<id>`) qua `.tee-colorpicker-handle` → `#00B140` (handle bg đổi đúng `rgb(0,177,64)`). Canvas editor (`#artwork-board--layer-<id> rect[fill]`) baseline `#FF9900`, sau khi đổi + quay lại Edit mode (không reload trang) vẫn `#FF9900` — KHÔNG sync.
  apps/tib/knowledge/product_facts.md dòng 502: - [FACT-162] **Cùng cơ chế áp cho Populate Color (BUG-05):** "Populate Color from another option" của shape/vector/text cũng chỉ trỏ vào 1 layer Color (color-picker) TRONG CÙNG ARTWORK — không có field nào trỏ trực tiếp Shopify Color variant. Fixture cho TC liên quan "buyer chọn màu → shape đổi màu đồng bộ storefront" (vd QA-3416 TC-27, đã sửa) chỉ cần 1 layer Color option thường, KHÔNG cần product nhiều Color variant/bulk price — tránh tốn công dựng F2 kiểu product Color×Size đầy đủ khi không cần thiết.
  ```

### CLAIM-06

- **Statement:** không có field nào trỏ trực tiếp tới Shopify Color variant: fixture cho TC 'buyer chọn màu → shape đổi màu đồng bộ storefront' chỉ cần 1 layer Color option thường, KHÔNG cần product nhiều Color variant / bulk price
- **Object / feature:** artwork/populate-values
- **Quan hệ với canon:** `ADD`
- **Scope:** seller (cấu hình populate); portal
- **Đã ship:** `NOT_SHIPPED`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA (Yến) — theo ghi chú product_facts.md, 2026-10-23 (QA kiểm live staging)
- **Locator:** apps/tib/knowledge/product_facts.md [FACT-162]; QA-3416 BUG-05 (Hub BUG-377) — outputs/QA-3416/bugs/BUG-05.md | https://ownego.atlassian.net/browse/QA-3416 (CCR cũ: CBS-040 CLAIM-14)
- **OQ:** NEEDS_CONFIRMATION — Fixture cho TC 'buyer chọn màu thì shape đổi màu đồng bộ' chỉ cần 1 layer Color option thường, không cần product nhiều Color variant, có đúng không? Claim không có nguồn và chưa ship. — Người trả lời: Dev. 
- **Trích nguyên văn:**
  ```
  apps/tib/knowledge/product_facts.md dòng 502: - [FACT-162] **Cùng cơ chế áp cho Populate Color (BUG-05):** "Populate Color from another option" của shape/vector/text cũng chỉ trỏ vào 1 layer Color (color-picker) TRONG CÙNG ARTWORK — không có field nào trỏ trực tiếp Shopify Color variant. Fixture cho TC liên quan "buyer chọn màu → shape đổi màu đồng bộ storefront" (vd QA-3416 TC-27, đã sửa) chỉ cần 1 layer Color option thường, KHÔNG cần product nhiều Color variant/bulk price — tránh tốn công dựng F2 kiểu product Color×Size đầy đủ khi không cần thiết.
  ```

### CLAIM-07

- **Statement:** Dynamic Clipart by Text (DCT) chọn clipart hiển thị theo TÊN của clipart khớp ký tự input (`{{char1}}`/`{{char2}}`…), không theo tên file/asset: clipart tên 'A' + buyer nhập text bắt đầu bằng 'A' → layer hiện clipart 'A'
- **Object / feature:** artwork/populate-values
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (nhập text); storefront · portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA (Yến) xác nhận chat — không phải PO/Dev, 2026-10-26 (QA xác nhận chat)
- **Locator:** apps/tib/knowledge/product_facts.md [FACT-164]; QA-3418 RQ10 — chat QA-3418 2026-10-26; QA-3418 TC-01 — outputs/QA-3418/release-verification.md | https://ownego.atlassian.net/browse/QA-3418 (CCR cũ: CBS-040 CLAIM-15)
- **OQ:** NEEDS_CONFIRMATION — Dynamic Clipart by Text chọn clipart theo TÊN clipart khớp ký tự input (không theo tên file/asset) có được Dev/PO xác nhận không? Claim không có nguồn trực tiếp. — Người trả lời: Dev. 
- **Trích nguyên văn:**
  ```
  QA (Yến) chat QA-3418 2026-10-26, RQ10: "T không rõ là có không nhưng nó work thế này, ví dụ tên clipart là A -> map text char1=A thì nó sẽ hiện clipart A"
  TC-01 (release-verification.md, production 2026-10-27, TIB-5600): PASS — Campaign <id> (instance <id>, hidden layer B KHÔNG xoá). Gõ "Anna" vào "Enter Custom Name" → Preview hiện đúng monogram "A" trong compass + banner tên "Anna"; Title/Signature giữ nguyên.
  apps/tib/knowledge/product_facts.md dòng 504: - [FACT-164] **Dynamic Clipart by Text (DCT) — cơ chế match ký tự (QA xác nhận 2026-10-26, review-gate QA-3418 RQ10):** clipart hiển thị được chọn theo TÊN của clipart khớp với ký tự input (`{{char1}}`/`{{char2}}`…), không phải theo tên file/asset. VD: trong category/option gắn có 1 clipart tên "A" → buyer nhập text bắt đầu bằng "A" thì layer hiện đúng clipart tên "A" đó. Viết Expected cho TC loại DCT theo "tên clipart khớp ký tự" — không giả định pattern tên file như `char_A.svg` khi chưa xác nhận asset thật dùng tên gì.
  ```
