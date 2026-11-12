# Context Change Request: artwork-linked-layers-render-edit — gộp từ CBS-037 và CBS-038 (phần render và bề mặt sửa của linked copy)

- **Product:** `teeinblue`
- **Object:** `artwork`
- **Ticket:** `TIB-5242, TIB-5265, QA-3343, QA-3345`
- **Các khối có trong file:** `A`

## Mức độ gấp

`MEDIUM` — ảnh hưởng coverage render và sửa linked copy; các Proposal gốc CBS-037, CBS-038 không điền mức độ gấp, đây là mặc định của người chuyển khuôn, operator xác nhận.

# Khối A — Hành vi

Phần lớn claim là lời QA chốt khi test, test case tick `[AI]` chạy trước lần dev sửa TIB-5265 (2026-09-08) nên không đủ điều kiện làm nguồn. Build không rõ; quan sát trên staging. Chưa claim nào do PO/Dev xác nhận.

### CLAIM-01

- **Statement:** Ẩn origin (biểu tượng con mắt) thì linked copy vẫn hiện ở editor preview nhưng bị loại khỏi final render (storefront và bản in); rule chung của cơ chế link cho cả Word Cloud và Warp Text, mọi test hide-origin phải kiểm cả hai bề mặt.
- **Object / feature:** artwork/layer-duplicate-link-copy
- **Quan hệ với canon:** `ADD` (lấp OQ-artwork-081 và CHK-006)
- **Scope:** seller (ẩn origin), buyer (xem render); portal (preview), storefront, api (final render)
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA (Yến), 2026-09-04
- **Locator:** Gộp hai mục knowledge QA local trùng rule: FACT-014 (chốt 2026-08-26 cho Word Cloud TIB-5242, xác nhận lại 2026-09-04 cho Warp Text TIB-5265) và FACT-043 (Warp Text, 2026-09-04, QA-3345 TC-38). Bổ trợ: QA-3345 TC-38 ✅ AI 2026-09-06 (trước lần dev sửa 2026-09-08). QA-3343 TC-56 từng tick ✅ sai vì chỉ chứng minh nửa preview, đã rút về ⏸️ ngày 2026-09-04, còn nợ chạy lại nửa generated design. Ghi chú từ khuôn cũ: không coi hide-origin đã verify cả hai bề mặt.
- **OQ:** NEEDS_CONFIRMATION — Ẩn origin thì linked copy hiện ở editor preview nhưng bị loại khỏi final render (storefront và bản in) có đúng không, cả hai bề mặt đã được verify chưa (TC-56 từng tick sai, còn nợ nửa generated design)? — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  FACT-014: Ẩn origin (con mắt) → linked copy VẪN HIỆN trong editor preview NHƯNG bị LOẠI KHỎI final render (storefront + print). User chốt 2026-08-26 cho Word Cloud (TIB-5242) và xác nhận lại 2026-09-04 cho Warp Text (TIB-5265): "ẩn ở render nhưng k ẩn ở preview, như các layer khác" + "word cloud cũng thế mà nhỉ" ⇒ rule CHUNG của cơ chế link, không phải feature-specific.
  FACT-043: Hide origin → ẩn ở render, không ẩn ở preview. Warp Text giống hệt Word Cloud, không có ngoại lệ theo layer type. (2026-09-04, QA-3345 TC-38)
  ```

### CLAIM-02

- **Statement:** Background của linked layer hành xử y hệt origin; nếu thấy lệch giữa linked và non-linked thì đó là deviation phải escalate, không dựng expected kiểu "linked dùng cover còn non-linked dùng contain".
- **Object / feature:** artwork/layer-duplicate-link-copy
- **Quan hệ với canon:** `ADD` (lấp OQ-artwork-081 và CHK-006)
- **Scope:** seller, buyer (xem render); portal, storefront, api (render)
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA (Yến), 2026-08-26
- **Locator:** Knowledge QA local FACT-035 (TIB-5265). Bổ trợ: QA-3345 TC-55, TC-58 ✅ AI 2026-09-04 (kiểm bằng ảnh chụp, trước lần dev sửa 2026-09-08).
- **OQ:** NEEDS_CONFIRMATION — Background của linked layer hành xử y hệt origin, có đúng sau lần dev sửa 2026-09-08 không (kiểm bằng ảnh chụp trước lần sửa)? — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  Background của linked layer hành xử y hệt origin — "original layer như nào thì linked layer như thế". Không được dựng expected result kiểu "linked dùng cover còn non-linked dùng contain"; nếu thấy lệch thì đó là deviation phải escalate. User chốt 2026-08-26 (TIB-5265).
  ```

### CLAIM-03

- **Statement:** Warp Text linked copy sync background image từ origin: copy không lưu `background_image` riêng (kế thừa theo tham chiếu) và canvas render đổi màu hoặc hình theo origin ngay khi origin đổi background rồi Save.
- **Object / feature:** artwork/layer-duplicate-link-copy
- **Quan hệ với canon:** `ADD` (lấp OQ-artwork-081: sync origin sang linked chưa test end-to-end; CHK-006)
- **Scope:** seller; portal (editor canvas), api (field background_image của linked copy)
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** AI (tick `[AI]`, không có tick `[QA]`), 2026-09-08
- **Locator:** QA-3345 TC-25 ✅ PASS 2026-09-08 staging, kiểm bằng ảnh chụp canvas editor thật (đỏ rồi xanh theo origin) và dữ liệu `WT-Link` không có `background_image` riêng. Knowledge QA local FACT-030.
- **Căn cứ expected:** KHÔNG CÓ (expected dựa vào quy tắc BR-05 sync của QA và thông điệp UI "Design and personalization are synced from it", không có câu PO/Dev nguyên văn)
- **OQ:** NEEDS_CONFIRMATION — Warp Text linked copy kế thừa background_image theo tham chiếu từ origin có đúng trên production không (TC-25 PASS trên staging, ship UNKNOWN)? — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  Warp Text linked copy sync background image từ origin — CONFIRMED bằng mắt (TC-25 QA-3345, 2026-09-08). `WT-Link` không lưu `background_image` riêng (kế thừa theo tham chiếu) và render canvas thật sự đổi màu/hình theo origin ngay khi origin đổi bg + Save (visual: đỏ→xanh cùng lúc).
  ```

### CLAIM-04

- **Statement:** Linked Warp Text copy chỉ sửa được phần Extra và menu "..." (align, geometry, duplicate, delete); toàn bộ design, typography, warp preset, control point và background là read-only trên copy.
- **Object / feature:** artwork/layer-duplicate-link-copy
- **Quan hệ với canon:** `ADD` (CHK-002; lấp OQ-artwork-081)
- **Scope:** seller; portal (artwork editor AW2.0)
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA (Yến), 2026-09-04
- **Locator:** Knowledge QA local FACT-040 (QA-3345 TC-28). TC-28 ✅ AI 2026-09-04 (kiểm kê control: có 50%, Transform, Align, Print Effects; không có font, color, stroke, background, warp) nhưng bảng TC ghi ⏸️ Not run, và chạy trước lần dev sửa 2026-09-08.
- **OQ:** NEEDS_CONFIRMATION — Linked Warp Text copy chỉ sửa được phần Extra và menu "...", còn design, typography, warp, background read-only, có đúng sau lần dev sửa 2026-09-08 không (bảng TC ghi Not run)? — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  Linked Warp Text copy: bề mặt sửa được = CHỈ phần `Extra` + `...` menu action. Toàn bộ design/typography/warp preset/control point/background = read-only trên copy. User chốt 2026-09-04 (QA-3345, TC-28).
  ```

### CLAIM-05

- **Statement:** Word Cloud có Align và Align nằm trong nhóm sửa được của linked copy (cùng nhóm Min/Max font size và Transform); Align trên linked copy chỉ dịch chính copy, origin giữ nguyên; Align hợp lệ trên origin, linked copy và multi-selection, không được báo bug vì Align xuất hiện.
- **Object / feature:** artwork/layer-duplicate-link-copy (bổ sung cho editor-layer-workspace KB-042: toolbar đổi theo loại layer)
- **Quan hệ với canon:** `ADD`
- **Scope:** seller; portal (artwork editor AW2.0)
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA (Yến), 2026-08-26
- **Locator:** Knowledge QA local FACT-011 (TIB-5242), đính chính câu trả lời đầu cùng ngày là "word cloud không có align". QA-3343 TC-37 ✅ AI nhưng không có hàng kết quả ghi ngày chạy.
- **OQ:** NEEDS_CONFIRMATION — Word Cloud có Align và Align trong nhóm sửa được của linked copy (chỉ dịch copy) có đúng không (đính chính của chính nguồn, TC-37 không có hàng kết quả ghi ngày chạy)? — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  Word Cloud CÓ Align, và Align NẰM TRONG NHÓM SỬA ĐƯỢC trên linked copy (cùng nhóm với Min/Max font size + Transform) — apply Align trên linked copy chỉ dịch chuyển chính nó, origin giữ nguyên. Align là control hợp lệ trên origin, linked copy và multi-selection; không được báo bug vì Align xuất hiện. (User correction 2026-08-26, TIB-5242)
  ```

### CLAIM-06

- **Statement:** Align hợp lệ trên linked Warp Text copy (khớp Word Cloud); Align chỉ dịch box của chính copy, không đụng origin.
- **Object / feature:** artwork/layer-duplicate-link-copy (bổ sung cho editor-layer-workspace KB-042)
- **Quan hệ với canon:** `ADD`
- **Scope:** seller; portal (artwork editor AW2.0)
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA (Yến), 2026-09-04
- **Locator:** Knowledge QA local FACT-044 (QA-3345 TC-34). TC-34 ✅ AI 2026-09-04 (6 thao tác Align chỉ đổi vị trí copy, style origin byte-identical) nhưng bảng TC ghi ⏸️ Not run, và chạy trước lần dev sửa 2026-09-08.
- **OQ:** NEEDS_CONFIRMATION — Align hợp lệ trên linked Warp Text copy và chỉ dịch box của copy, có đúng sau lần dev sửa 2026-09-08 không (bảng TC ghi Not run)? — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  Align hợp lệ trên linked Warp Text copy — xác nhận cho Warp Text (2026-09-04, QA-3345), khớp Word Cloud nhóm F. Align chỉ dịch box của chính copy, không đụng origin.
  ```

### CLAIM-07

- **Statement:** Xoá origin của linked Warp Text: knowledge QA có hai kết luận ngược nhau chưa phân xử, một là copy render rỗng (2026-08-26), hai là copy vẫn hiện nội dung origin đã xoá, giống hệt layer Single-line Text (2026-09-07); giữ cả hai phía.
- **Object / feature:** artwork/layer-duplicate-link-copy
- **Quan hệ với canon:** `ADD` (lấp OQ-artwork-081; hai phía mâu thuẫn nhau trong chính nguồn)
- **Scope:** seller; portal (editor), storefront (render)
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA (Yến), 2026-08-26 (render rỗng) và 2026-09-07 (không rỗng)
- **Locator:** Knowledge QA local FACT-033 (TIB-5265). QA-3345 TC-35 recheck 2026-09-07 trên cặp clone: copy Warp Text giữ hàng, 🔗 và vẫn vẽ ảnh, copy Single-line Text vẫn hiện chữ của origin; 0 pageerror. Comment dev giangnth 2026-08-18 trên TIB-5265 là checklist tự sinh từ branch diff, không phải sign-off. Ghi chú từ khuôn cũ: không coi "render rỗng" là đúng; câu hỏi mở: copy sau khi xoá origin hiển thị gì ở editor, ở storefront render và ở design file.
- **OQ:** CONFLICT — Sau khi xoá origin của linked Warp Text, copy hiển thị gì ở editor, storefront render và design file? — Người trả lời: Dev. Side A: copy render rỗng (FACT-033, 2026-08-26) / Side B: copy vẫn hiện nội dung origin đã xoá, giống Single-line Text (QA-3345 TC-35 recheck 2026-09-07).
- **Trích nguyên văn:**
  ```
  FACT-033: Xoá origin của linked Warp Text → linked copy render RỖNG (không phải ẩn layer, không auto-unlink, không placeholder). User chốt 2026-08-26 (TIB-5265): "-> empty".
  TC-35 recheck 2026-09-07: warp text hành xử GIỐNG HỆT single-line text, đúng hành vi.
  Comment dev (2026-08-18): 'Delete the origin layer → the linked copy degrades gracefully (no crash, no blank canvas).'
  ```
