# Context Change Request: artwork-photo-border — gộp từ 1 Proposal khuôn cũ

- **Product:** `teeinblue`
- **Object:** `artwork`
- **Ticket:** `TIB-5592, QA-3414`
- **Các khối có trong file:** `A`

## Mức độ gấp

`MEDIUM` — mức cao nhất trong các Proposal gốc (MEDIUM); lý do gốc theo từng Proposal:

- CBS-027: MEDIUM — Canon thiếu coverage cho vẽ viền Photo Border, nhưng không có checklist đang publish nào kiểm các hành vi này nên không có gì đang chạy sai (QA phuongbb xác nhận 2026-11-01).

# Khối A — Hành vi

### CLAIM-01

- **Statement:** Layer clipart bật Border kiểu Contour cut với Border size = 1 có viền đi theo outline phần đục của clipart, không thành khung vuông theo bounding box của layer.
- **Object / feature:** artwork/MỚI: layer-photo-border — Thuộc: tuỳ chọn Border trên toolbar layer (Enable photo border, Type Contour cut / Custom shape, Border color, Border size, Add a thin line, Display border on) và kết quả vẽ viền ở các bề mặt; Không thuộc: preset shape-cut của Print Effects (layer-print-effects), multi-select và rule ẩn của Photo Border (editor-layer-workspace KB-427..429)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff, portal (Artwork editor)
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb, kết quả AI do máy chạy), 2026-10-19
- **Locator:** QA-3414 (QA Hub task TIB-218) TC-01 "[Regression] Artwork editor: Contour cut at Border size 1 follows the clipart outline (reported case)", result_QA-3414_B1_2026-10-19.md, staging, không ghi số build portal; bản fix đã deploy staging theo QA xác nhận 2026-10-19. Chỉ kiểm Artwork editor trên 1 layer Clipart Category. Đo ở zoom 50% (TC viết 100%). Liên quan: layer-config-image (FEAT-13). (CCR cũ: CBS-027 CLAIM-01)
- **Căn cứ expected:** Jira TIB-5592 description (Expectation), 2026-10-19, mô tả lỗi tạo từ Slack, không phải sign-off
- **Trích nguyên văn:**
  ```
  TC-01 | ✅ AI — size 1: no square frame; border never extends past the shape (`farFromShapePx 0`, `borderOutsideShapePx 0`); at 50% zoom the 1-unit border is thinner than 1 screen px and shows only along the soft clipart edge | pixel measure; evidence/pass_TC-01_editor_size1_no_square.png | Reported case fixed in the editor
  Expected của TC (03-testcases.md): "No square frame: the transparent-area point inside the bounding box equals the outside background (±3). Border present: a 1–2 px darker band touches the flower outline"
  Ngữ cảnh (description TIB-5592 — mô tả lỗi, không phải nguồn của claim):
  **Expectation:** The `Contour cut` border should follow the clipart shape at every `Border size`, including `1`, as it did before, without the color blending at small sizes.
  ```

### CLAIM-02

- **Statement:** Contour cut ở Border size 1, 2, 3 chỉ vẽ màu viền thành vòng ngoài hình, không ám lên pixel clipart hay vùng trong suốt trong bounding box, và trong editor ảnh viền nằm dưới ảnh clipart.
- **Object / feature:** artwork/MỚI: layer-photo-border — Thuộc: tuỳ chọn Border trên toolbar layer (Enable photo border, Type Contour cut / Custom shape, Border color, Border size, Add a thin line, Display border on) và kết quả vẽ viền ở các bề mặt; Không thuộc: preset shape-cut của Print Effects (layer-print-effects), multi-select và rule ẩn của Photo Border (editor-layer-workspace KB-427..429)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff, portal (Artwork editor)
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb, kết quả AI do máy chạy), 2026-10-19
- **Locator:** QA-3414 TC-02 "[Regression] Artwork editor: no color tint at Border size 1, 2, 3", result_QA-3414_B1_2026-10-19.md, staging, không ghi số build portal; bản fix đã deploy staging theo QA xác nhận 2026-10-19. Bổ trợ: chauptm comment 55072 (Q5) "đã fix cho cả case 2-3". Ở zoom 50% size 2 và 3 cho cùng một vòng, chưa phân biệt được độ dày. Số đo pixel không phải giá trị chuẩn. (CCR cũ: CBS-027 CLAIM-02)
- **Căn cứ expected:** Jira TIB-5592 description (Expectation), 2026-10-19; Jira TIB-5592 comment 55072 (Q5), 2026-10-19
- **Trích nguyên văn:**
  ```
  TC-02 | ✅ AI — no tint at sizes 1, 2, 3: the border image sits under the clipart and is drawn only around the shape; border pixels outside the shape = RGB (78,38,38) ≈ `#4E2626` (pure border color); no border pixels far from the shape | sizes 2 and 3: `borderOutsideShapePx 772`, `farFromShapePx 0`, `maxRingPx 3` | Sizes 2 and 3 render the same ring at 50% zoom (both ≈ 1 screen px)
  ```

### CLAIM-03

- **Statement:** Viền Contour cut ở storefront live preview (mockup), cart Edit design, Portal View/Edit customization và Artwork editor dùng chung một code phía client, là chỗ bị lỗi và đã được fix, và lỗi sinh ra từ TIB-5516.
- **Object / feature:** artwork/MỚI: layer-photo-border — Thuộc: tuỳ chọn Border trên toolbar layer (Enable photo border, Type Contour cut / Custom shape, Border color, Border size, Add a thin line, Display border on) và kết quả vẽ viền ở các bề mặt; Không thuộc: preset shape-cut của Print Effects (layer-print-effects), multi-select và rule ẩn của Photo Border (editor-layer-workspace KB-427..429) (liên quan: sdk, order)
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (storefront preview, cart Edit design) và store owner/staff (Artwork editor, Portal View/Edit customization), portal và storefront
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chauptm), 2026-10-19
- **Locator:** Jira TIB-5592 comment 55072, mục 1.1 (Q1) và mục 5 (Q5). QA chỉ kiểm Artwork editor; storefront (TC-07, 08), cart Edit design (TC-09), Portal View/Edit customization (TC-12, 13) chưa chạy, không assert như đã verified. "Lỗi từ TIB-5516" là nguyên nhân lịch sử, không phải hành vi để test. (CCR cũ: CBS-027 CLAIM-03)
- **Trích nguyên văn:**
  ```
  Hỏi (Q1): "Which surfaces did the fix change: Artwork editor canvas, storefront SDK live preview, server render (Order Design file / mockups), or all?"
  Đáp: 1. 1. Các chỗ dùng code này nên có lỗi và được fix: storefront live preview (mockup), cart Edit design, Portal View/Edit customization và Artwork editor
  Hỏi (Q5): "What caused the regression (which change / PR), and is the color tint at sizes 2–3 part of the same regression or older behaviour?"
  Đáp: 5. Lỗi từ issue: https://ownego.atlassian.net/browse/TIB-5516  đã fix cho cả case 2-3
  ```

### CLAIM-04

- **Statement:** Server render (file Order Design, mockup render) do teeinblue-api vẽ bằng ImageMagick là code riêng, không dùng công thức bị lỗi và fix không đụng tới, nên đơn đã có không bị sai.
- **Object / feature:** artwork/MỚI: layer-photo-border — Thuộc: tuỳ chọn Border trên toolbar layer (Enable photo border, Type Contour cut / Custom shape, Border color, Border size, Add a thin line, Display border on) và kết quả vẽ viền ở các bề mặt; Không thuộc: preset shape-cut của Print Effects (layer-print-effects), multi-select và rule ẩn của Photo Border (editor-layer-workspace KB-427..429) (liên quan: order)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff xử lý đơn (Order Design file), api (server render)
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chauptm), 2026-10-19
- **Locator:** Jira TIB-5592 comment 55072, mục 1.2 (Q1) và mục 4 (Q4). QA chưa kiểm Order Design file và mockup render (TC-11..15 chưa chạy). Liên quan, không mâu thuẫn: layer-print-effects KB-391 (quan sát contour cut trên order design của group), KB-425 (custom_shape bỏ file pre-render). ImageMagick, teeinblue-api là chi tiết code, không phải oracle. (CCR cũ: CBS-027 CLAIM-04)
- **Trích nguyên văn:**
  ```
  Hỏi (Q1): "Which surfaces did the fix change: Artwork editor canvas, storefront SDK live preview, server render (Order Design file / mockups), or all?"
  Đáp: 2. Server render (file Order Design, mockup render): do teeinblue-api vẽ bằng ImageMagick, là code riêng. Fix không đụng vào và code đó không dùng công thức bị lỗi
  Hỏi (Q4): "Orders already rendered with the square frame: regenerated automatically, or does the seller/support need to regenerate the design?"
  Đáp: 4. Order không sai
  ```

### CLAIM-05

- **Statement:** Border size có min = 0, step = 1 và không có max.
- **Object / feature:** artwork/MỚI: layer-photo-border — Thuộc: tuỳ chọn Border trên toolbar layer (Enable photo border, Type Contour cut / Custom shape, Border color, Border size, Add a thin line, Display border on) và kết quả vẽ viền ở các bề mặt; Không thuộc: preset shape-cut của Print Effects (layer-print-effects), multi-select và rule ẩn của Photo Border (editor-layer-workspace KB-427..429)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff, portal (Border popup)
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chauptm), 2026-10-19
- **Locator:** Jira TIB-5592 comment 55072, mục 2 (Q2). Bổ trợ: TC-03 2026-10-19 staging ghi input min="0"; không có max và step chưa kiểm (TC-23 chưa chạy). Dev chỉ nêu giới hạn input, chưa ai nói size 0 phải vẽ gì (xem CLAIM-09). (CCR cũ: CBS-027 CLAIM-05)
- **Trích nguyên văn:**
  ```
  Hỏi (Q2): "What is the allowed Border size range (min, max, decimals)?"
  Đáp: 2. Giới hạn Border size: min = 0, step = 1, không có max
  ```

### CLAIM-06

- **Statement:** Các loại layer dùng chung hàm vẽ viền đã fix gồm Clipart Category, Dynamic clipart (dynamic_by_text), Clipart group, Linked clipart, Static image và Photo Upload (ảnh buyer upload, Contour cut), và border kiểu Custom shape theo mask cũng dùng chung hàm này.
- **Object / feature:** artwork/MỚI: layer-photo-border — Thuộc: tuỳ chọn Border trên toolbar layer (Enable photo border, Type Contour cut / Custom shape, Border color, Border size, Add a thin line, Display border on) và kết quả vẽ viền ở các bề mặt; Không thuộc: preset shape-cut của Print Effects (layer-print-effects), multi-select và rule ẩn của Photo Border (editor-layer-workspace KB-427..429) (liên quan: sdk)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff (cấu hình) và buyer (Photo Upload), portal và storefront
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chauptm), 2026-10-19
- **Locator:** Jira TIB-5592 comment 55072, mục 3 (Q3). QA chỉ kiểm Clipart Category; loại khác và Custom shape (TC-16..22) chưa chạy, không assert như đã verified. Liên quan: layer-config-image KB-017, layer-duplicate-link-copy KB-045, layer-print-effects KB-425 (custom_shape vẽ từ mask), editor-layer-workspace KB-429 (Photo Border bị ẩn khi selection có layer Linked). (CCR cũ: CBS-027 CLAIM-06)
- **Trích nguyên văn:**
  ```
  Hỏi (Q3): "Does the fix also cover Photo Upload, Static image, Clipart group and Dynamic clipart layers with Contour cut, or only Clipart Category?"
  Đáp: 3. Các loại layer được fix
    1. Clipart Category, Dynamic clipart (dynamic_by_text), Clipart group, Linked clipart, Static image.
    2. Photo Upload (ảnh buyer tự upload, Contour cut).
    3. Border kiểu custom shape theo mask cũng dùng chung hàm này
  ```

### CLAIM-07

- **Statement:** Thiết lập Border lưu và đọc lại đúng sau Save & Close và reload, và API lưu ở field photo_border gồm size, type, color, display, line, enabled, với display mockup_order ứng với "Mockup Preview & Order Design".
- **Object / feature:** artwork/MỚI: layer-photo-border — Thuộc: tuỳ chọn Border trên toolbar layer (Enable photo border, Type Contour cut / Custom shape, Border color, Border size, Add a thin line, Display border on) và kết quả vẽ viền ở các bề mặt; Không thuộc: preset shape-cut của Print Effects (layer-print-effects), multi-select và rule ẩn của Photo Border (editor-layer-workspace KB-427..429)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff, portal và api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb, kết quả AI do máy chạy), 2026-10-19
- **Locator:** QA-3414 TC-04 "[Data] Border settings at size 1 are saved and reloaded", result_QA-3414_B1_2026-10-19.md, staging, không ghi số build portal; bản fix đã deploy staging theo QA xác nhận 2026-10-19, đọc lại qua UI và MCP get-artwork. Liên quan: artwork-save-persist. (CCR cũ: CBS-027 CLAIM-07)
- **Căn cứ expected:** KHÔNG CÓ
- **Trích nguyên văn:**
  ```
  TC-04 | ✅ AI — after Save & Close and reload the Border popup shows Enable ON, Contour cut, `#4E2626`, size `1`, thin line OFF, *Mockup Preview & Order Design*; API `photo_border` = `{size:1, type:contour_cut, color:#4E2626, display:mockup_order, line:false, enabled:true}` | toast "Your artwork has been updated"; MCP get-artwork
  ```

### CLAIM-08

- **Statement:** Undo và Redo đổi Border size đúng cả giá trị lẫn hình vẽ, và Duplicate layer tạo bản copy giữ nguyên thiết lập Border, cả hai layer vẽ viền theo outline.
- **Object / feature:** artwork/MỚI: layer-photo-border — Thuộc: tuỳ chọn Border trên toolbar layer (Enable photo border, Type Contour cut / Custom shape, Border color, Border size, Add a thin line, Display border on) và kết quả vẽ viền ở các bề mặt; Không thuộc: preset shape-cut của Print Effects (layer-print-effects), multi-select và rule ẩn của Photo Border (editor-layer-workspace KB-427..429)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff, portal (Artwork editor)
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb, kết quả AI do máy chạy), 2026-10-19
- **Locator:** QA-3414 TC-27 "[State] Undo / redo and duplicate layer at size 1", result_QA-3414_B1_2026-10-19.md, staging, không ghi số build portal; bản fix đã deploy staging theo QA xác nhận 2026-10-19. Bản Duplicate không được lưu (Cancel), chưa kiểm Border của bản copy sau khi save. Liên quan, không bị thay: editor-layer-workspace KB-428, CHK-021 (undo step khi multi-select). (CCR cũ: CBS-027 CLAIM-08)
- **Căn cứ expected:** KHÔNG CÓ
- **Trích nguyên văn:**
  ```
  TC-27 | ✅ AI — size 3 → 1, Undo → size 3 render (ring 3 px), Redo → size 1 render; Duplicate layer → copy "Choose dog copy" has the same border, both layers `farFromShapePx 0` | pixel measure per layer | Duplicate discarded (Cancel, not saved)
  ```

### CLAIM-09

- **Statement:** Known issue chưa file và chưa ai xác nhận: Contour cut Border size = 0 trong Artwork editor vẽ viền dày như size 10 thay vì không có viền.
- **Object / feature:** artwork/MỚI: layer-photo-border — Thuộc: tuỳ chọn Border trên toolbar layer (Enable photo border, Type Contour cut / Custom shape, Border color, Border size, Add a thin line, Display border on) và kết quả vẽ viền ở các bề mặt; Không thuộc: preset shape-cut của Print Effects (layer-print-effects), multi-select và rule ẩn của Photo Border (editor-layer-workspace KB-427..429)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff, portal (Artwork editor)
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA (phuongbb, kết quả AI do máy chạy, không ai xác nhận), 2026-10-19
- **Locator:** QA-3414 TC-03 ❌ "[Boundary] Border size 0 and large sizes" trong result_QA-3414_B1_2026-10-19.md; bug draft BUG-01 chưa submit, chưa chạy lại. "Expected: no border" là suy luận của QA từ min = 0, không phải lời dev/PO. Hành vi lỗi quan sát được, không dùng làm oracle. Chưa kiểm storefront và Order Design ở size 0. (CCR cũ: CBS-027 CLAIM-09)
- **Trích nguyên văn:**
  ```
  TC-03 | ❌ AI — size 0 renders a thick border (same as size 10) instead of no border. Sizes 4 / 10 correct: ring 4 px / 6 px, `farFromShapePx 0` | size 0 → `borderOutsideShapePx 3783`, `maxRingPx 6` (= size 10); input accepts 0 (`min="0"`); evidence/bug_TC-03_editor_size0_renders_thick_border.png | Q2: min is 0 → expected no border. Production comparison for 4/10 not done (no prod artwork). Size 100 not run
  
  **Border size 0 renders as a thick border in the Artwork editor.** Repro: artwork [đã bỏ id] → select "Choose dog" → Border → Contour cut → set Border size `0`. Expected: no border (min = 0 per dev Q2). Actual: the canvas shows a thick border identical to size 10 (looks like 0 falls back to the default size 10).
  ```
