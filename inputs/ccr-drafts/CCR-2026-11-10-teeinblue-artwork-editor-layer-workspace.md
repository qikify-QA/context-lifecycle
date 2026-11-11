# Context Change Request: artwork-editor-layer-workspace — Convert layer, field theo type, Replace, thumbnail vector, danh sách layer type, Undo

- **Product:** `teeinblue`
- **Object:** `artwork`
- **Ticket:** `TIB-5265, TIB-5211, TIB-5327, TIB-5331, TIB-5325, TIB-5355 (QA-3345, QA-3355, QA-3364, QA-3378, QA-3361)`
- **Các khối có trong file:** `A`

## Mức độ gấp

`MEDIUM` — có 2 claim CONTRADICTS (CHK-001/KB-002 về 5 icon, KB-001 về số layer type) và 1 claim có thể làm sai check giả định danh sách field chung; Proposal gốc không chọn mức gấp, mức này do người soạn lại đề xuất.

# Khối A — Hành vi

### CLAIM-01

- **Statement:** Convert layer type: popup hiển thị type hiện tại ở dòng `FROM X TO Y` (KHÔNG phải `.convert-layer-popup__value`, vốn là target mặc định chọn sẵn); convert tự áp dụng, không cần Save, nhưng chỉ ghi vào draft local của browser — GraphQL server vẫn trả bản cũ cho tới khi Save; revert = Cancel editor + chấp nhận confirm native
- **Object / feature:** artwork/editor-layer-workspace
- **Quan hệ với canon:** `ADD`
- **Scope:** seller (owner/staff); portal
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA nội bộ (lượt chạy TC B3 của AI + QA Yến, ghi vào product_facts) — không phải PO/Dev, 2026-09-04
- **Locator:** apps/tib/knowledge/product_facts.md dòng 86 (FACT-032); apps/tib/outputs/QA-3345/03-testcases.md dòng 78–80 (ghi chú REPL) | https://ownego.atlassian.net/browse/TIB-5265 · https://ownego.atlassian.net/browse/QA-3345 (CCR cũ: CBS-042 CLAIM-01)
- **OQ:** NEEDS_CONFIRMATION — Convert layer type tự áp dụng vào draft local của browser (server vẫn trả bản cũ tới khi Save) có phải hành vi chủ ý và đã ship không? Claim không có nguồn. — Người trả lời: Dev. 
- **Trích nguyên văn:**
  ```
  product_facts.md dòng 86: - [FACT-032] **Convert-layer popup: type hiện tại nằm ở text `FROM X TO Y`, KHÔNG phải `.convert-layer-popup__value`** (cái đó là target mặc định được chọn sẵn). Parse nhầm đã làm một loạt assert convert báo sai type. Convert là **auto-apply không cần Save**, nhưng chỉ ghi vào **draft local của browser profile** — GraphQL server vẫn trả bản cũ; revert = editor Cancel + accept native confirm. (QA-3345 B3, 2026-09-04)
  apps/tib/outputs/QA-3345/03-testcases.md dòng 78–80: - Convert: `.la-ellipsis-h` trên box `1 selected` → `Convert to another layer` → `.convert-layer-popup`. Type hiện tại = parse `FROM (.+?) TO` trong `.convert-layer-popup` innerText. **KHÔNG dùng `.convert-layer-popup__value`** (đó là target mặc định). Convert là **auto-apply, KHÔNG cần Save** — nhưng chỉ ghi vào **draft local của browser profile**, server GraphQL vẫn giữ bản cũ. Revert = editor Cancel (native confirm "Do you really want to leave? You have unsaved changes!" → accept).
  ```

### CLAIM-02

- **Statement:** Bộ field của layer KHÁC NHAU THEO TỪNG LAYER TYPE, không có danh sách field dùng chung; cách lưu cũng khác (vd font size ở `typography.size` lồng bên trong, Word Cloud có `font_size_min/max` riêng); suy từ toolbar hay từ round-trip đều sai (control ẩn ≠ không có property; convert để lại key rác) — phải dump JSON theo từng type
- **Object / feature:** artwork/layer-common-config
- **Quan hệ với canon:** `ADD`
- **Scope:** seller (owner/staff); api · portal
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA Yến (đính chính) — không phải PO/Dev, 2026-08-27
- **Locator:** apps/tib/knowledge/product_facts.md dòng 110 (FACT-048) | https://ownego.atlassian.net/browse/TIB-5211 (CCR cũ: CBS-042 CLAIM-02)
- **OQ:** NEEDS_CONFIRMATION — Bộ field của layer khác nhau theo từng layer type, không có danh sách field dùng chung, có đúng và còn hiện hành không? Claim không có nguồn, chưa rõ đã ship. — Người trả lời: Dev. 
- **Trích nguyên văn:**
  ```
  product_facts.md dòng 110: - [FACT-048] **⚠️ Bộ field của layer KHÁC NHAU THEO TỪNG LAYER TYPE — không có danh sách dùng chung (user đính chính 2026-08-27).** Tôi đã đóng gói `DESIGN_FIELDS` (12) / `PERSONALIZATION_FIELDS` (9) dò từ **Word Cloud** vào `apps/tib/automation/lib/portal/artwork.js` như thể áp dụng cho mọi layer — **SAI**. Mỗi type có bộ property riêng, và cách lưu cũng khác (vd font size nằm ở `typography.size` lồng bên trong, không phải key phẳng; Word Cloud lại có `font_size_min/max` riêng). Khớp với cảnh báo sẵn có ở patterns §"Xác định type nào support setting nào — phải dump JSON, đừng suy từ UI" (TIB-5211): suy từ toolbar sai (control ẩn ≠ không có property), suy từ round-trip cũng sai (convert để lại key rác).
  ```

### CLAIM-03

- **Statement:** Layer vector-family (static-vector, vector-category, vector-upload, legacy `vector`) KHÔNG có nút Replace (`la-exchange-alt`) ở layer row lẫn trong panel `la-pen`; chỉ image-family (static-photo, photo, clipart-category, group-clipart-categories, dynamic-by-text, legacy clipart) có Replace — câu 'replace asset via Replace button' trong repro của dev chỉ đúng cho image
- **Object / feature:** artwork/editor-layer-workspace
- **Quan hệ với canon:** `CONTRADICTS KB-002`
- **Scope:** seller (owner/staff); portal
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA Yến (user chốt) — không phải PO/Dev, 2026-09-11
- **Locator:** apps/tib/knowledge/product_facts.md dòng 203 (FACT-073) | https://ownego.atlassian.net/browse/TIB-5327 · https://ownego.atlassian.net/browse/QA-3355 | Ghi chú: 'Đúng thiết kế' là lời QA chốt khi test, không phải quyết định PO. (CCR cũ: CBS-042 CLAIM-03)
- **OQ:** CONFLICT — Layer vector-family không có nút Replace, chỉ image-family có, có phải thiết kế đúng không? 'Đúng thiết kế' mới là lời QA chốt khi test, không phải quyết định PO. Side A: claim này, vector-family không có Replace / Side B: canon KB-002 (nội dung mâu thuẫn với claim). Chưa rõ đã ship. — Người trả lời: PO. 
- **Trích nguyên văn:**
  ```
  product_facts.md dòng 203: - [FACT-073] **Layer vector-family (static-vector, vector-category, vector-upload, legacy `vector`) KHÔNG có nút Replace** ở row (`la-exchange-alt`) lẫn trong panel `la-pen` — **đúng thiết kế**, không phải gap. Chỉ image-family (static-photo, photo, clipart-category, group-clipart-categories, dynamic-by-text, legacy clipart) có Replace. Câu "replace asset via Replace button" trong repro của dev chỉ đúng cho image.
  ```

### CLAIM-04

- **Statement:** Thumbnail của layer vector trong layer panel = file `.svg` gốc trong `<img>` (không có biến thể `_thumbnail`; quy ước `_large`→`_thumbnail` chỉ áp cho raster); đo 2026-09-11 (cache tắt): SVG tải 2 lần (fetch cho canvas + image cho row 28px), cache bật thì lần 2 trúng HTTP cache nên không tốn thêm download
- **Object / feature:** artwork/editor-layer-workspace
- **Quan hệ với canon:** `ADD`
- **Scope:** seller (owner/staff); portal · api
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA Yến (user chấp nhận + đo) — không phải PO/Dev, 2026-09-11
- **Locator:** apps/tib/knowledge/product_facts.md dòng 204 (FACT-074) · apps/tib/outputs/QA-3355/bugs/withdrawn_QA-3355_vector_thumbnail_uses_original_svg.md | https://ownego.atlassian.net/browse/TIB-5327 · https://ownego.atlassian.net/browse/QA-3355 | Ghi chú: Chỉ là hành vi quan sát QA chấp nhận; bug draft đã rút (WITHDRAWN 2026-09-11), không phải thiết kế đã duyệt. (CCR cũ: CBS-042 CLAIM-04)
- **OQ:** NEEDS_CONFIRMATION — Thumbnail layer vector dùng file `.svg` gốc (không có biến thể `_thumbnail`, tải 2 lần khi tắt cache) là thiết kế được chấp nhận không? Chỉ là hành vi quan sát, bug draft đã rút (WITHDRAWN 2026-09-11). — Người trả lời: Dev. 
- **Trích nguyên văn:**
  ```
  product_facts.md dòng 204: - [FACT-074] **Thumbnail của layer vector = file `.svg` gốc** trong `<img>` (không có biến thể `_thumbnail`; naming `_large`→`_thumbnail` chỉ áp cho raster). User chấp nhận là OK. Đo 2026-09-11 (cache tắt): SVG được tải 2 lần — `fetch` cho canvas (`<image>` 170px) + `image` cho row 28px; cache bật thì lần 2 trúng HTTP cache ⇒ **thumbnail không tốn thêm download** so với canvas, decode ở 28px không đáng kể. **Hai edge từng nêu đều RÚT (user + đo 2026-09-11):** (1) SVG thiếu `viewBox`/kích thước **không upload được** — `POST /api/layer-images/svg` trả 500, dropzone hiện `[object Object]` (bug riêng, Low) ⇒ không bao giờ vào storage, không có thumbnail méo; (2) vector thêm vào editor **chỉ từ storage TIB** (user chốt) ⇒ không có chuyện SVG tham chiếu font/ảnh ngoài. Thumbnail vector = .svg gốc: **không có rủi ro thực tế**, chỉ còn câu hỏi thiết kế.
  withdrawn_QA-3355_vector_thumbnail_uses_original_svg.md dòng 1: **WITHDRAWN 2026-09-11 (user decision):** not a bug — render is correct, no extra download (canvas loads the same file), SVGs without size are rejected at upload, and vectors only come from TIB storage. Kept for reference only.
  ```

### CLAIM-05

- **Statement:** SVG thiếu `viewBox`/kích thước KHÔNG upload được: `POST /api/layer-images/svg` trả 500 và dropzone hiện `[object Object]` (bug riêng, Low) — nên không bao giờ có thumbnail méo từ SVG thiếu kích thước
- **Object / feature:** artwork/editor-layer-workspace
- **Quan hệ với canon:** `ADD`
- **Scope:** seller (owner/staff); api · portal
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA Yến (đo) — không phải PO/Dev, 2026-09-11
- **Locator:** apps/tib/knowledge/product_facts.md dòng 204 (FACT-074, ý 'Hai edge từng nêu đều RÚT (1)') | https://ownego.atlassian.net/browse/TIB-5327 · https://ownego.atlassian.net/browse/QA-3355 (CCR cũ: CBS-042 CLAIM-05)
- **OQ:** NEEDS_CONFIRMATION — SVG thiếu `viewBox`/kích thước không upload được (500, dropzone `[object Object]`) có đúng và còn hiện hành không? Claim không có nguồn, chưa rõ đã ship, và là bug riêng mức Low. — Người trả lời: Dev. 
- **Trích nguyên văn:**
  ```
  product_facts.md dòng 204: - [FACT-074] **Thumbnail của layer vector = file `.svg` gốc** trong `<img>` (không có biến thể `_thumbnail`; naming `_large`→`_thumbnail` chỉ áp cho raster). User chấp nhận là OK. Đo 2026-09-11 (cache tắt): SVG được tải 2 lần — `fetch` cho canvas (`<image>` 170px) + `image` cho row 28px; cache bật thì lần 2 trúng HTTP cache ⇒ **thumbnail không tốn thêm download** so với canvas, decode ở 28px không đáng kể. **Hai edge từng nêu đều RÚT (user + đo 2026-09-11):** (1) SVG thiếu `viewBox`/kích thước **không upload được** — `POST /api/layer-images/svg` trả 500, dropzone hiện `[object Object]` (bug riêng, Low) ⇒ không bao giờ vào storage, không có thumbnail méo; (2) vector thêm vào editor **chỉ từ storage TIB** (user chốt) ⇒ không có chuyện SVG tham chiếu font/ảnh ngoài. Thumbnail vector = .svg gốc: **không có rủi ro thực tế**, chỉ còn câu hỏi thiết kế.
  ```

### CLAIM-06

- **Statement:** Layer vector chỉ được thêm vào editor từ storage của TIB (không có SVG tham chiếu font/ảnh ngoài, không có nguồn vector bên ngoài)
- **Object / feature:** artwork/editor-layer-workspace
- **Quan hệ với canon:** `ADD`
- **Scope:** seller (owner/staff); portal
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA Yến (user chốt) — không phải PO/Dev, 2026-09-11
- **Locator:** apps/tib/knowledge/product_facts.md dòng 204 (FACT-074, ý '(2) vector thêm vào editor chỉ từ storage TIB (user chốt)') | https://ownego.atlassian.net/browse/TIB-5327 · https://ownego.atlassian.net/browse/QA-3355 (CCR cũ: CBS-042 CLAIM-06)
- **OQ:** NEEDS_CONFIRMATION — Layer vector chỉ được thêm vào editor từ storage của TIB (không có nguồn vector bên ngoài) có được xác nhận không? Nguồn chỉ là 'user chốt' trong FACT-074, không có nguồn trực tiếp. — Người trả lời: Dev. 
- **Trích nguyên văn:**
  ```
  product_facts.md dòng 204: - [FACT-074] **Thumbnail của layer vector = file `.svg` gốc** trong `<img>` (không có biến thể `_thumbnail`; naming `_large`→`_thumbnail` chỉ áp cho raster). User chấp nhận là OK. Đo 2026-09-11 (cache tắt): SVG được tải 2 lần — `fetch` cho canvas (`<image>` 170px) + `image` cho row 28px; cache bật thì lần 2 trúng HTTP cache ⇒ **thumbnail không tốn thêm download** so với canvas, decode ở 28px không đáng kể. **Hai edge từng nêu đều RÚT (user + đo 2026-09-11):** (1) SVG thiếu `viewBox`/kích thước **không upload được** — `POST /api/layer-images/svg` trả 500, dropzone hiện `[object Object]` (bug riêng, Low) ⇒ không bao giờ vào storage, không có thumbnail méo; (2) vector thêm vào editor **chỉ từ storage TIB** (user chốt) ⇒ không có chuyện SVG tham chiếu font/ảnh ngoài. Thumbnail vector = .svg gốc: **không có rủi ro thực tế**, chỉ còn câu hỏi thiết kế.
  ```

### CLAIM-07

- **Statement:** Popup 'Select a layer type' của AW2.0 liệt kê 28 type (Single-line Text, Paragraph, Curve Text, Warp Text, Spiral Text, Static Image, Clipart Category, Photo Upload, Text to Image (AI), Dynamic Clipart by Text, Static Vector, Vector Category, Vector Upload, Street/Route/Star Maps, Moon Phase, Scrabble, Word Search/Cloud, Song Search, Calendar, QR Code, Clock, Toggle Switch, Additional Option, Addon Charge, JSON List, Font, Color); 'shape text' = Paragraph (không phải type riêng); 'clipart frame' không tồn tại trong popup
- **Object / feature:** artwork/editor-layer-workspace
- **Quan hệ với canon:** `CONTRADICTS KB-001`
- **Scope:** seller (owner/staff); portal
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA Yến (xác nhận) — không phải PO/Dev, 2026-09-17
- **Locator:** apps/tib/knowledge/product_facts.md dòng 234 (FACT-098) · dòng 498 (FACT-158, danh sách type có thêm Rectangle/Ellipse/Line) | https://ownego.atlassian.net/browse/TIB-5331 · https://ownego.atlassian.net/browse/QA-3364 | Ghi chú: Danh sách 28 type có thể không còn đủ: FACT-158 (2026-10) liệt kê thêm Rectangle/Ellipse/Line, nhiều khả năng do TIB-4726 (đang QA Review). OPEN QUESTION: số type thực tế hiện tại và cách đếm '29 item / 35 type' của KB-001. (CCR cũ: CBS-042 CLAIM-07)
- **OQ:** CONFLICT — Popup 'Select a layer type' liệt kê 28 type hay nhiều hơn (FACT-158 thêm Rectangle/Ellipse/Line, nhiều khả năng do TIB-4726 đang QA Review), và cách đếm '29 item / 35 type' của KB-001 có đúng không? Side A: claim này, 28 type, 'shape text' = Paragraph, không có 'clipart frame' / Side B: canon KB-001 ('29 item / 35 type') và FACT-158 (thêm Rectangle/Ellipse/Line). Chưa rõ đã ship. — Người trả lời: Dev. 
- **Trích nguyên văn:**
  ```
  product_facts.md dòng 234: - [FACT-098] **BR-8 "shape text"/"clipart frame" (comment dev) — QA xác nhận 2026-09-17: "shape text" = Paragraph layer (không phải type riêng); "clipart frame" NGOÀI SCOPE, không tồn tại trong popup "Select a layer type" của AW2.0** (danh sách đủ 28 type: Single-line Text, Paragraph, Curve Text, Warp Text, Spiral Text, Static Image, Clipart Category, Photo Upload, Text to Image (AI), Dynamic Clipart by Text, Static Vector, Vector Category, Vector Upload, Street/Route/Star Maps, Moon Phase, Scrabble, Word Search/Cloud, Song Search, Calendar, QR Code, Clock, Toggle Switch, Additional Option, Addon Charge, JSON List, Font, Color). Vậy BR-8 thật ra chỉ 5 type: Text, Curve Text, Warp Text, Paragraph, QR Code.
  product_facts.md dòng 498: - [FACT-158] **Đã kiểm trực tiếp:** tạo artwork mới sạch, thêm layer `Additional Option` đặt Option Title = "Shirt Color" (type GO/option list đầy đủ: Single-line Text, Paragraph, Curve Text, Static Image, Clipart/Vector Category, Photo Upload, Text to Image (AI), Dynamic Clipart by Text, Static/Street/Route/Star Maps, Moon Phase, Scrabble, Word Search/Cloud, Song Search, Calendar, QR Code, Clock, Toggle Switch, **Additional Option**, Addon Charge, JSON List, Font, **Color**, Rectangle/Ellipse/Line — **không loại nào tên "Platform Option"/"Variant"/"Product Option"**). Mở Conditional Setting của layer `rectangle-1` → `+ Add conditions` → dropdown "Select an option" chỉ liệt kê **"Shirt ColorAdditional option"** (chính layer vừa tạo) — tuyệt đối không có mục nào tham chiếu tới Shopify product option "Color"/"Size" thật của campaign.
  ```

### CLAIM-08

- **Statement:** TIB KHÔNG có layer type 'shape': đo qua MCP schema 2026-09-17 thấy 33 type, không type nào tên `shape` (đừng viết TC/fixture giả định có shape layer)
- **Object / feature:** artwork/editor-layer-workspace (danh sách layer type)
- **Quan hệ với canon:** `CONTRADICTS KB-001`
- **Scope:** seller (owner/staff); portal · api
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA nội bộ (đo bằng MCP) — không phải PO/Dev, 2026-09-17
- **Locator:** product_facts.md dòng 186 (FACT-063); product_facts.md dòng 498 (FACT-158) | https://ownego.atlassian.net/browse/TIB-5355 · https://ownego.atlassian.net/browse/QA-3361 · https://ownego.atlassian.net/browse/TIB-4726 | Ghi chú: Có thể đã lỗi thời: FACT-158 (2026-10) liệt kê Rectangle/Ellipse/Line trong popup type và TIB-4726 (Add basic shapes) đang QA Review. OPEN QUESTION: số layer type hiện tại và có type 'shape' chưa. Liên quan claim danh sách 28 type trong file artwork-editor-layer-workspace. (CCR cũ: CBS-043 CLAIM-15)
- **OQ:** CONFLICT — TIB có layer type 'shape' chưa (đo MCP 2026-09-17 thấy 33 type, không có `shape`) khi FACT-158 liệt kê Rectangle/Ellipse/Line và TIB-4726 (Add basic shapes) đang QA Review? Side A: claim này, không có type `shape` / Side B: canon KB-001 và FACT-158 (có Rectangle/Ellipse/Line trong popup type). Chưa rõ đã ship. — Người trả lời: Dev. 
- **Trích nguyên văn:**
  ```
  product_facts.md dòng 186: - **TIB KHÔNG có layer type "shape" — đo qua MCP schema 2026-09-17 (QA-3361/TC-6): 33 type, không type nào tên `shape`.** Đừng viết TC/fixture giả định có shape layer.
  product_facts.md dòng 498: - [FACT-158] **Đã kiểm trực tiếp:** tạo artwork mới sạch, thêm layer `Additional Option` đặt Option Title = "Shirt Color" (type GO/option list đầy đủ: Single-line Text, Paragraph, Curve Text, Static Image, Clipart/Vector Category, Photo Upload, Text to Image (AI), Dynamic Clipart by Text, Static/Street/Route/Star Maps, Moon Phase, Scrabble, Word Search/Cloud, Song Search, Calendar, QR Code, Clock, Toggle Switch, **Additional Option**, Addon Charge, JSON List, Font, **Color**, Rectangle/Ellipse/Line — **không loại nào tên "Platform Option"/"Variant"/"Product Option"**). Mở Conditional Setting của layer `rectangle-1` → `+ Add conditions` → dropdown "Select an option" chỉ liệt kê **"Shirt ColorAdditional option"** (chính layer vừa tạo) — tuyệt đối không có mục nào tham chiếu tới Shopify product option "Color"/"Size" thật của campaign.
  ```

### CLAIM-09

- **Statement:** Bấm nút Undo/Redo trên TOOLBAR (không phải phím tắt) khiến layer đang chọn mất focus/selection (cùng hành vi 4 chip resize layer biến mất khi out-focus) nên mọi overlay phụ thuộc layer đang chọn (warp-point-handle, resize chip…) ẩn theo; Cmd/Ctrl+Z KHÔNG gây mất focus, overlay vẫn hiện
- **Object / feature:** artwork/editor-layer-workspace
- **Quan hệ với canon:** `ADD`
- **Scope:** seller (owner/staff); portal
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA Yến (đính chính) — không phải PO/Dev, 2026-09-30
- **Locator:** apps/tib/knowledge/product_facts.md dòng 429 (FACT-140) | https://ownego.atlassian.net/browse/TIB-5325 · https://ownego.atlassian.net/browse/QA-3378 (CCR cũ: CBS-042 CLAIM-08)
- **OQ:** NEEDS_CONFIRMATION — Undo/Redo trên toolbar làm layer đang chọn mất focus (overlay ẩn) còn Cmd/Ctrl+Z thì không, có phải hành vi chủ ý hay lỗi? Claim không có nguồn, chưa rõ đã ship. — Người trả lời: Dev. 
- **Trích nguyên văn:**
  ```
  product_facts.md dòng 429: - [FACT-140] **QA: "TC-04 nó k hiện sau khi bấm nút undo là đúng nhé, giống như 4 chip để resize layer, là hành vi khi out focus khỏi layer. cmd/ctrl+Z thì k bị vậy đâu."** Bấm nút Undo/Redo trên TOOLBAR (không phải phím tắt) khiến layer đang chọn MẤT FOCUS/SELECTION — cùng hành vi với 4 chip resize layer (biến mất khi out-focus). Mọi overlay phụ thuộc vào layer đang được chọn (warp-point-handle, resize chip, …) đều ẩn theo. **Cmd/Ctrl+Z (phím tắt) KHÔNG gây mất focus** — overlay/handle vẫn hiện bình thường.
  ```
