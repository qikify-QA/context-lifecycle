# Context Change Request: artwork-vector-svg-render — gộp từ 2 Proposal khuôn cũ

- **Product:** `teeinblue`
- **Object:** `artwork`
- **Ticket:** `TIB-5350, QA-3395, TIB-5501, QA-3394`
- **Các khối có trong file:** `A`

## Mức độ gấp

`MEDIUM` — mức cao nhất trong các Proposal gốc (MEDIUM); lý do gốc theo từng Proposal:

- CBS-030: MEDIUM — Canon thiếu coverage cho render SVG và design format, nhưng không có checklist đang publish nào kiểm hành vi này nên không có gì đang chạy sai (QA phuongbb xác nhận 2026-11-01).
- CBS-031: MEDIUM — Canon thiếu coverage cho đổi màu vector và id SVG trùng, nhưng không có checklist đang publish nào kiểm hành vi này nên không có gì đang chạy sai (QA phuongbb xác nhận 2026-11-01).

# Khối A — Hành vi

### CLAIM-01

- **Statement:** Design file định dạng PNG (PNG_RGB, PNG_RGBA, PNG_ADOBE_RGB, PNG_SRGB) của artwork có layer SVG dùng clip-path lồng nhiều cấp vẽ đúng hình đã mask.
- **Object / feature:** artwork/MỚI: svg-to-image-rendering — Thuộc: rasterize SVG sang ảnh ở thumbnail và design file theo Design format (PNG_*, EPS, AI, PDF), gồm áp clip-path, ảnh nhúng, nền theo format; Không thuộc: field cấu hình layer vector và upload SVG (layer-config-vector), render Word Cloud (layer-config-puzzles), render group (group-layer-order-design-render) (liên quan: order)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff (design file đơn hàng), api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `dev_doc`
- **Người xác nhận, ngày nguồn:** Dev (chauptm), 2026-09-23
- **Locator:** Jira TIB-5350, comment chauptm 2026-09-23 "Context / logic changes" (PR teeinblue-api #3836, v1, "Auto-generated from the branch diff"), mục root cause, Fix bullet DesignConverter::convertFromSVG(), Possible test cases bullet 2. Bổ trợ: QA-3395 TC-04 ✅ AI 2026-10-07 staging, chỉ PNG_RGB. Đối chiếu artwork/layer-config-vector KB-418: fixture đó chỉ có static-vector và báo "Line item cannot generate design" ở PNG_RGB. (CCR cũ: CBS-030 CLAIM-02)
- **Trích nguyên văn:**
  ```
  - `DesignConverter::convertFromSVG()` / `VectorRenderer` (final artwork render) — used Inkscape 1.2.2, which also fails on this pattern.
  ...
  - `DesignConverter::convertFromSVG()` — PNG branch (`PNG_RGB`/`PNG_RGBA`/`PNG_ADOBE_RGB`/`PNG_SRGB`) now shells out to resvg instead of Inkscape, preserving the same opaque-white-vs-transparent background behavior per format.
  ...
  - [ ] Place the same SVG as a vector layer on an artwork and render it (mockup/production) → final PNG shows the correctly masked shape.
  ```

### CLAIM-02

- **Statement:** Chỉ nhánh PNG đổi sang resvg, còn export EPS, AI và PDF vẫn đi qua Inkscape.
- **Object / feature:** artwork/MỚI: svg-to-image-rendering — Thuộc: rasterize SVG sang ảnh ở thumbnail và design file theo Design format (PNG_*, EPS, AI, PDF), gồm áp clip-path, ảnh nhúng, nền theo format; Không thuộc: field cấu hình layer vector và upload SVG (layer-config-vector), render Word Cloud (layer-config-puzzles), render group (group-layer-order-design-render)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff, api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `dev_doc`
- **Người xác nhận, ngày nguồn:** Dev (chauptm), 2026-09-23
- **Locator:** Jira TIB-5350, comment chauptm 2026-09-23 "Context / logic changes" (PR teeinblue-api #3836, v1, "Auto-generated from the branch diff"), Fix bullet "Inkscape is kept", Possible test cases bullet 7. Bổ trợ: QA-3395 TC-15 ✅ AI 2026-10-07 staging, chỉ PDF, kiểm cấu trúc bằng PyMuPDF. EPS và AI chưa kiểm, chỉ dựa dev doc. (CCR cũ: CBS-030 CLAIM-03)
- **Trích nguyên văn:**
  ```
  - Inkscape is **kept** for the non-PNG export formats (`svgToEPS`/`svgToAI`/`svgToPDF`) — resvg doesn't produce those.
  ...
  - [ ] SVG export to EPS / AI / PDF (unaffected paths) → still works via Inkscape, no regression.
  ```

### CLAIM-03

- **Statement:** SVG có ảnh raster nhúng qua <image href="data:…"> không tiền tố xlink: vẫn hiện ảnh nhúng ở thumbnail và design PNG.
- **Object / feature:** artwork/MỚI: svg-to-image-rendering — Thuộc: rasterize SVG sang ảnh ở thumbnail và design file theo Design format (PNG_*, EPS, AI, PDF), gồm áp clip-path, ảnh nhúng, nền theo format; Không thuộc: field cấu hình layer vector và upload SVG (layer-config-vector), render Word Cloud (layer-config-puzzles), render group (group-layer-order-design-render) (liên quan: asset-category)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff, api và portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `dev_doc`
- **Người xác nhận, ngày nguồn:** Dev (chauptm), 2026-09-23
- **Locator:** Jira TIB-5350, comment chauptm 2026-09-23 "Context / logic changes" (PR teeinblue-api #3836, v1, "Auto-generated from the branch diff"), Fix bullet ThumbnailMaker::makeFromSvg(), Possible test cases bullet 4. Bổ trợ: QA-3395 TC-08 ✅ AI 2026-10-07 staging. (CCR cũ: CBS-030 CLAIM-04)
- **Trích nguyên văn:**
  ```
  Removed the now-unneeded `normalizeEmbeddedRasterImages()` MSVG-specific workaround (resvg reads `href` correctly natively).
  ...
  - [ ] SVG with an embedded raster image via `<image href="data:...">` (bare `href`, no `xlink:` prefix) → still resolves and rasterizes the embedded image correctly.
  ```

### CLAIM-04

- **Statement:** Theo tài liệu dev, nền design file là trong suốt với PNG_RGBA và trắng đục với PNG_RGB, PNG_ADOBE_RGB, PNG_SRGB, giữ như mặc định Inkscape cũ.
- **Object / feature:** artwork/MỚI: svg-to-image-rendering — Thuộc: rasterize SVG sang ảnh ở thumbnail và design file theo Design format (PNG_*, EPS, AI, PDF), gồm áp clip-path, ảnh nhúng, nền theo format; Không thuộc: field cấu hình layer vector và upload SVG (layer-config-vector), render Word Cloud (layer-config-puzzles), render group (group-layer-order-design-render) (liên quan: order)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff (design file gửi nhà in), api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `dev_doc`
- **Người xác nhận, ngày nguồn:** Dev (chauptm), 2026-09-23
- **Locator:** Jira TIB-5350, comment chauptm 2026-09-23 "Context / logic changes" (PR teeinblue-api #3836, v1, "Auto-generated from the branch diff"), Fix bullet DesignConverter::convertFromSVG(), Possible test cases bullet 5 và 6. Mâu thuẫn nội bộ với CLAIM-06: QA đo staging 2026-10-07 thấy ngược lại, không tái hiện được nền trắng đục. Giữ cả hai phía, không dùng làm expected tới khi PO/Dev trả lời PENDING-09. PNG_RGBA chưa thử được (TC-09 ⏸️). (CCR cũ: CBS-030 CLAIM-05)
- **Trích nguyên văn:**
  ```
  - [ ] `PNG_RGBA` conversion (vector layer render) → background stays transparent.
  - [ ] `PNG_RGB` / `PNG_ADOBE_RGB` / `PNG_SRGB` conversion → background is opaque white (matches prior Inkscape default behavior).
  ```

### CLAIM-05

- **Statement:** Đo trên staging, design file PNG_RGB, PNG_ADOBE_RGB, PNG_SRGB là PNG RGBA nền trong suốt (alpha 0), giống nhau trước và sau fix; PNG_ADOBE_RGB nhúng ICC "Adobe RGB (1998)", PNG_SRGB nhúng ICC "sRGB IEC61966-2.1".
- **Object / feature:** artwork/MỚI: svg-to-image-rendering — Thuộc: rasterize SVG sang ảnh ở thumbnail và design file theo Design format (PNG_*, EPS, AI, PDF), gồm áp clip-path, ảnh nhúng, nền theo format; Không thuộc: field cấu hình layer vector và upload SVG (layer-config-vector), render Word Cloud (layer-config-puzzles), render group (group-layer-order-design-render) (liên quan: order)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff (design file gửi nhà in), api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA (phuongbb, số đo AI do máy chạy, không ai xác nhận là đúng), 2026-10-07
- **Locator:** QA-3395 TC-10, TC-11, TC-12 (để ⏸️ chờ PENDING-09, không PASS), result_QA-3395_all_2026-10-07.md. Mâu thuẫn nội bộ với CLAIM-05. Chỉ là số đo của một lượt chạy, không phải hành vi đúng hay giá trị chuẩn, không dùng làm expected. (CCR cũ: CBS-030 CLAIM-06)
- **Trích nguyên văn:**
  ```
  TC-10 | ⏸️ AI — PENDING-09: PNG_RGB sau fix ra RGBA nền TRONG SUỐT (không phải trắng đục như TC giả định), GIỐNG hệt PNG_RGB trước fix (order 15–17/09, artwork [đã bỏ id] format `rgb`: cũng RGBA nền trong suốt) → không phải hồi quy; expected của TC sai so với hành vi thật | order [đã bỏ id] PNG: pixel (2,2)=(255,255,255,0); alpha0=13 009 177/17 731 584 px. Pre-fix order [đã bỏ id] (artwork [đã bỏ id], rgb): RGBA, 1 152 805 px trong suốt
  TC-11 | ⏸️ AI — PENDING-09: PNG_ADOBE_RGB có `iCCP` Adobe RGB (1998) ✔, nền trong suốt (alpha 0) như TC-10 | order [đã bỏ id] 60×80 PNG 5760×7680 RGBA, iCCP desc "Adobe RGB (1998)", pixel (2,2)=(255,255,255,0)
  TC-12 | ⏸️ AI — PENDING-09: PNG_SRGB có ICC sRGB IEC61966-2.1 ✔, nền trong suốt như TC-10 | order [đã bỏ id] 37×52 PNG RGBA, iCCP "sRGB IEC61966-2.1", pixel (2,2)=(255,255,255,0)
  ```

### CLAIM-06

- **Statement:** Word Cloud dùng shape SVG có clip-path lồng nhiều cấp chỉ đặt chữ trong vùng shape đã mask, không tràn ra khung chữ nhật ngoài.
- **Object / feature:** artwork/layer-config-puzzles
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (đơn có Word Cloud) và store owner/staff (cấu hình shape), api (render design)
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb, kết quả AI do máy chạy), 2026-10-07
- **Locator:** QA-3395 (QA Hub task TIB-167) TC-05 (TC-TIB-4723, passed), result_QA-3395_all_2026-10-07.md, staging, không ghi số build. Liên quan, không bị thay: layer-config-puzzles KB-031. Chưa so preview storefront/editor với final render (TC-32 ⏸️). (CCR cũ: CBS-030 CLAIM-07)
- **Căn cứ expected:** Jira TIB-5350, comment chauptm 2026-10-07 (PR #3836, commit ffef0097f; dev không ghi auto-generated)
- **Trích nguyên văn:**
  ```
  TC-05 | ✅ AI — Word Cloud shape 74.svg (7-level chained clip): chữ chỉ nằm dọc que + cụm trong ngôi sao, không tràn ra khung chữ nhật 129×364 | order [đã bỏ id] PNG + design preview [đã bỏ id] (PNG): words nằm trong vùng sao/que | dùng attachment 74.svg (chain 7 cấp quanh star) thay cho fixture circle của dev
  Ngữ cảnh (dev, chauptm, Jira TIB-5350 comment 2026-10-07 — không ghi auto-generated, không phải nguồn của claim):
  - [ ] Word Cloud layer with an SVG shape that uses a chained/nested `clip-path` (e.g. the SVG attached to this ticket) → words fill only the clipped shape, not its bounding rectangle.
  ```

### CLAIM-07

- **Statement:** Word Cloud bật color source = shape ("Use shape's color") trên shape SVG có clip-path chỉ lấy màu chữ từ vùng shape nhìn thấy, không lấy từ vùng bị clip bỏ.
- **Object / feature:** artwork/layer-config-puzzles
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer và store owner/staff, api (render design)
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb, kết quả AI do máy chạy), 2026-10-07
- **Locator:** QA-3395 TC-29 (TC-TIB-4770, passed), staging, không ghi số build. Liên quan: layer-config-puzzles KB-031. (CCR cũ: CBS-030 CLAIM-08)
- **Căn cứ expected:** Jira TIB-5350, comment chauptm 2026-10-07 (PR #3836, commit ffef0097f; dev không ghi auto-generated)
- **Trích nguyên văn:**
  ```
  TC-29 | ✅ AI — Word Cloud color source = Shape trên SVG chained clip: chữ chỉ mang màu đỏ/xanh dương trong vùng sao đã mask, không chữ nào ngoài sao | artwork [đã bỏ id] PNG preview [đã bỏ id]: WC1 chỉ có chữ đỏ + xanh dương trong vùng sao
  Ngữ cảnh (dev, comment 2026-10-07):
  - [ ] Word Cloud with color source = Shape on that SVG → word colors are sampled from the visible shape, with no colors from the clipped-away area.
  ```

### CLAIM-08

- **Statement:** Word Cloud không bị ảnh hưởng ở các trường hợp còn lại: shape SVG đơn giản không clip và shape PNG đều lấp chữ trong shape, tắt custom shape thì chữ lấp đầy ô vuông.
- **Object / feature:** artwork/layer-config-puzzles
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer và store owner/staff, api (render design)
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb, kết quả AI do máy chạy), 2026-10-07
- **Locator:** QA-3395 TC-30 (TC-TIB-4771), TC-31 (TC-TIB-4772), passed, staging, không ghi số build. Không có ảnh trước fix để so pixel, "không đổi" chỉ kiểm theo logic shape. Liên quan: layer-config-puzzles KB-031. (CCR cũ: CBS-030 CLAIM-09)
- **Căn cứ expected:** KHÔNG CÓ
- **Trích nguyên văn:**
  ```
  TC-30 | ✅ AI — shape SVG đơn giản (sao, không clip) → chữ lấp trong sao | artwork [đã bỏ id] WC2 | không có pixel baseline trước fix — kiểm theo logic shape
  TC-31 | ✅ AI — (a) shape PNG sao → chữ lấp trong sao; (b) tắt shape → chữ lấp đầy ô vuông | artwork [đã bỏ id] WC3 / WC4
  ```

### CLAIM-09

- **Statement:** Layer QR Code render nguyên vẹn và quét ra đúng chuỗi ở cả design PNG (resvg) lẫn PDF (Inkscape) của cùng đơn.
- **Object / feature:** artwork/layer-config-others
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff (design file), api (order design)
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb, kết quả AI do máy chạy), 2026-10-07
- **Locator:** QA-3395 TC-06 (TC-TIB-4724, passed), staging, không ghi số build; cùng lượt TC-01/02/04 cho thấy resvg đã live. (CCR cũ: CBS-030 CLAIM-10)
- **Căn cứ expected:** KHÔNG CÓ
- **Trích nguyên văn:**
  ```
  TC-06 | ✅ AI — QR render nguyên vẹn, decode đúng chuỗi ở cả PNG (resvg) và PDF (Inkscape) cùng order | OpenCV decode PNG 37×52 = `'cnn.com'`; PDF 60×80 = `'cnn.com'`
  ```

### CLAIM-10

- **Statement:** SVG layer image cũ, upload từ 05/2025 trước khi có resvg, render lại design PNG bình thường, không lỗi và không trống.
- **Object / feature:** artwork/layer-config-vector
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff, api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb, kết quả AI do máy chạy), 2026-10-07
- **Locator:** QA-3395 TC-16 (TC-TIB-4734, passed, TC dạng quan sát), staging, không ghi số build. Mẫu nhỏ (3 file); file thứ 3 không có <text> sống nên không chạm known issue mất chữ. Liên quan: layer-config-vector KB-128. (CCR cũ: CBS-030 CLAIM-11)
- **Căn cứ expected:** KHÔNG CÓ
- **Trích nguyên văn:**
  ```
  TC-16 | ✅ AI — 3 SVG cũ (05/2025, chưa từng qua resvg) re-render PNG OK, không lỗi/trống | artwork [đã bỏ id] PNG: tim cam ([đã bỏ id]), xe ([đã bỏ id], 5 clipPath), "Girls Weekend LAS VEGAS 2022" ([đã bỏ id], chữ đã outline, 0 `<text>`) | quan sát theo PENDING-06
  ```

### CLAIM-11

- **Statement:** clip-path trỏ tới id không tồn tại thì shape hiện đầy đủ, không bị clip, còn clip-path khai qua CSS style vẫn clip đúng.
- **Object / feature:** artwork/MỚI: svg-to-image-rendering — Thuộc: rasterize SVG sang ảnh ở thumbnail và design file theo Design format (PNG_*, EPS, AI, PDF), gồm áp clip-path, ảnh nhúng, nền theo format; Không thuộc: field cấu hình layer vector và upload SVG (layer-config-vector), render Word Cloud (layer-config-puzzles), render group (group-layer-order-design-render) (liên quan: asset-category)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff, api và portal (thumbnail)
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb, kết quả AI do máy chạy), 2026-10-07
- **Locator:** QA-3395 TC-28 (TC-TIB-4746, passed), phần (a) và (c), staging, không ghi số build. Phần (b) không thuộc claim: thông báo "no viewBox" khi upload XML hỏng chỉ là quan sát UX, không dùng làm expected. (CCR cũ: CBS-030 CLAIM-12)
- **Căn cứ expected:** KHÔNG CÓ
- **Trích nguyên văn:**
  ```
  TC-28 | ✅ AI — (a) `url(#khong-ton-tai)`: shape không bị clip (ô xanh đầy); (b) XML malformed: bị từ chối gọn, không 500, nhưng message là "This SVG has no viewBox attribute…" thay vì "Invalid SVG"; (c) clip-path qua CSS `style` → ngôi sao đúng | thumbnail [đã bỏ id] = ô xanh đầy; [đã bỏ id] = sao xanh
  ```

### CLAIM-12

- **Statement:** Upload SVG làm layer image hoặc clipart thì bản lưu bị bỏ DOCTYPE, ENTITY (XXE không resolve, không lộ nội dung file hệ thống) và thẻ <script>, và upload không trả 500.
- **Object / feature:** artwork/layer-config-vector (liên quan: asset-category)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff (upload SVG), api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb, kết quả AI do máy chạy), 2026-10-07
- **Locator:** QA-3395 TC-17 (TC-TIB-4735), TC-21 (TC-TIB-4739), passed, staging, không ghi số build. Hành vi upload có sẵn, kiểm cùng lượt, không phải do TIB-5350 thay đổi. SSRF, DoS, file cực lớn (TC-18/19/20) chưa kiểm. Liên quan: layer-config-vector KB-128 (POST /api/layer-images/svg), asset-category-item-management KB-015 (POST /api/cliparts/svg). (CCR cũ: CBS-030 CLAIM-13)
- **Căn cứ expected:** KHÔNG CÓ
- **Trích nguyên văn:**
  ```
  TC-17 | ✅ AI — XXE không resolve: DOCTYPE + entity bị sanitize bỏ, `<text>` rỗng; thumbnail trắng, không có nội dung `/etc/passwd` | stored SVG layer-image [đã bỏ id] / clipart [đã bỏ id]: không có `DOCTYPE`/`ENTITY`/`root:` (grep = 0) | upload không 500
  TC-21 | ✅ AI — `<script>` bị bỏ khi sanitize, thumbnail chỉ còn ô tím | stored SVG [đã bỏ id]/[đã bỏ id]: `grep -c script` = 0; thumbnail tím `#8e24aa`
  ```

### CLAIM-13

- **Statement:** Tên file SVG upload được làm sạch (test.png.svg thành test.png, ../../evil.svg thành evil), file lưu với key ngẫu nhiên nên không path traversal, và tên dài hơn 255 ký tự bị chặn bằng validate.
- **Object / feature:** artwork/layer-config-vector
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff (upload SVG), api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb, kết quả AI do máy chạy), 2026-10-07
- **Locator:** QA-3395 TC-22 (TC-TIB-4740, passed), staging, không ghi số build. Hành vi upload có sẵn, không phải do TIB-5350 thay đổi. Phần hiển thị trên UI chưa xem. Liên quan: layer-config-vector KB-128. (CCR cũ: CBS-030 CLAIM-14)
- **Căn cứ expected:** KHÔNG CÓ
- **Trích nguyên văn:**
  ```
  TC-22 | ✅ AI — tên file giả mạo được làm sạch, key lưu ngẫu nhiên, không path traversal; tên > 255 ký tự bị validate chặn | `test.png.svg` → name `test.png`, url `…/image-layers/[đã bỏ id].svg`; `../../evil.svg` → name `evil`, url `…/[đã bỏ id].svg`; 300 ký tự → "The filenames.2 field must not be greater than 255 characters." | phần hiển thị trên UI chưa xem (REPL không login được)
  ```

### CLAIM-14

- **Statement:** File SVG nguồn lưu trên CDN không bị sửa: sau khi đã recolor và đặt order, tập id trong file giống hệt file gốc và không có prefix svg-.
- **Object / feature:** artwork/layer-config-vector
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff (asset đã upload), api (asset CDN)
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb, kết quả AI do máy chạy), 2026-10-08
- **Locator:** QA-3394 TC-19, result_QA-3394_existing-templates_2026-10-08.md, staging, không ghi số build portal/SDK. (CCR cũ: CBS-031 CLAIM-03)
- **Căn cứ expected:** Jira TIB-5501 description §Expected, 2026-09-29
- **Trích nguyên văn:**
  ```
  TC-19 | ✅ AI — file SVG nguồn lưu trên CDN giữ nguyên id gốc, không prefix runtime, sau khi đã recolor + có order ([đã bỏ id]) | `[đã bỏ id].svg` (70): 113 id = 113 id file gốc, set giống hệt, `svg-xxxxxxxx-` = 0; `[đã bỏ id].svg` (69): 96 = 96, prefix 0
  Ngữ cảnh (description §Expected, 2026-09-29): "The source SVG files are not modified — ids are deduplicated only at preview and at design/render time."
  ```

### CLAIM-15

- **Statement:** Theo mô tả ticket, fix áp cho mọi loại id (clipPath, gradient, mask, filter, pattern, symbol) và cho SVG đã upload trước và sau fix, còn SVG không có id hoặc layer không có màu không bị đụng.
- **Object / feature:** artwork/layer-config-vector (liên quan: sdk, order)
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (preview) và store owner/staff (order design), storefront và api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** Người tạo ticket và Dev (chauptm), mô tả, không phải xác nhận, 2026-09-29
- **Locator:** Jira TIB-5501 description §Expected result; Dev summary comment 2026-09-29 §Fix. TC-08..17 chưa có biên bản chạy. Không dùng làm expected cho tới khi explore. (CCR cũ: CBS-031 CLAIM-09)
- **Trích nguyên văn:**
  ```
  It should cover **all** id types that can collide, not only `<clipPath>` — including gradients, masks, filters, patterns and symbols.
  
  It applies to both already-uploaded (old) SVGs and newly uploaded ones. The source SVG files are not modified — ids are deduplicated only at preview and at design/render time.
  
  SVGs without ids, or layers without a color, are untouched.
  ```

### CLAIM-16

- **Statement:** Campaign editor preview trên Portal hiện vector dạng <image> và không có ô chọn màu nên namespace không được kích hoạt ở đó, và Portal cần bump submodule src/sdk mới có code SDK mới.
- **Object / feature:** artwork/layer-config-vector (liên quan: campaign)
- **Quan hệ với canon:** `UNKNOWN`
- **Scope:** store owner/staff (Portal preview), portal (campaign editor, artwork editor Live preview)
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA (phuongbb, quan sát) và Dev (chauptm, mô tả), không ai xác nhận, 2026-10-08 và 2026-09-29
- **Locator:** QA-3394 TC-24 ⏸️ (result_QA-3394_existing-templates_2026-10-08.md, staging, không ghi số build portal/SDK); Dev summary comment 2026-09-29 §Notes. Q2 (deploy) và Q5 (Portal có trong phạm vi không) chưa ai trả lời. Không đề xuất gì về artwork editor Live preview. Có thể thuộc campaign thay vì artwork. (CCR cũ: CBS-031 CLAIM-10)
- **Trích nguyên văn:**
  ```
  TC-24 | ⏸️ AI — campaign editor preview hiện vector dạng `<image>` và không có ô chọn màu trong preview → không kích hoạt được inline/namespace để so | `[đã bỏ id]`: 5 group `artwork-layer--layer-…` inline=false, image=true; `.tee-field--color` count 0
  
  No migrations, no submodule bump in this change. `teeinblue-portal`'s `src/sdk` submodule will need a pointer bump after the SDK PR is merged, and vectorize must be deployed for exported SVGs.
  ```
