# Context Change Request: artwork-linked-layers-render-edit — gộp từ CBS-037 và CBS-038 (phần render và bề mặt sửa của linked copy) — rev2 (đối chiếu nguồn 2026-11-12)

- **Product:** `teeinblue`
- **Object:** `artwork`
- **Ticket:** `TIB-5242, TIB-5265, QA-3343, QA-3345`
- **Các khối có trong file:** `A`

## Mức độ gấp

`MEDIUM` — ảnh hưởng coverage render và sửa linked copy; các Proposal gốc CBS-037, CBS-038 không điền mức độ gấp, đây là mặc định của người chuyển khuôn, operator xác nhận.

> Ghi chú rev2: giữ nội dung Proposal CBS-116 (blocked, run CTX-20261111-21). Đã tra: spec-hub (log_id 239, 241; không có rule nào về linked layer render/hide/delete origin), Testlane (task TIB-044 = QA-3343, TIB-046 = QA-3345), Jira TIB-5242, TIB-5265 (chỉ đọc). Không claim nào có nguồn S3. Jira chỉ có mô tả ticket và checklist Dev sinh từ branch diff, dùng làm căn cứ expected một phần. Record Testlane có thật nhưng chỉ là tick `[AI]` đồng bộ, không build; hai record (TC-25, TC-35) còn ghi kết quả trái với claim. Claim gốc từ QA được xếp rule QA có chủ (S2) theo quyết định operator 2026-11-12. Tên cá nhân được thay bằng vai trò.

# Khối A — Hành vi

Phần lớn claim là lời QA chốt khi test, test case tick `[AI]` chạy trước lần dev sửa TIB-5265 (2026-09-08). Build không rõ; quan sát trên staging. Chưa claim nào do PO/Dev xác nhận.

### CLAIM-01

- **Statement:** Ẩn origin (biểu tượng con mắt) thì linked copy vẫn hiện ở editor preview nhưng bị loại khỏi final render (storefront và bản in); rule chung của cơ chế link cho cả Word Cloud và Warp Text, mọi test hide-origin phải kiểm cả hai bề mặt.
- **Object / feature:** artwork/layer-duplicate-link-copy
- **Quan hệ với canon:** `ADD` (lấp OQ-artwork-081 và CHK-006)
- **Scope:** seller (ẩn origin), buyer (xem render); portal (preview), storefront, api (final render)
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `QA_RULE`
- **Người xác nhận, ngày nguồn:** QA, 2026-09-04
- **Locator:** Gộp hai mục knowledge QA local trùng rule: FACT-014 (chốt 2026-08-26 cho Word Cloud TIB-5242, xác nhận lại 2026-09-04 cho Warp Text TIB-5265) và FACT-043 (Warp Text, 2026-09-04, QA-3345 TC-38). Ghi chú từ khuôn cũ: không coi hide-origin đã verify cả hai bề mặt.
  - Testlane: QA-3345 TC-38 = `TC-TIB-1242` (task TIB-046), status `passed`, actualResult chỉ "✅ AI" (không ngày/build; expected ghi "Assumption? Yes — confirmed for Word Cloud (TIB-5242), assumed ident…"). QA-3343 TC-56 = `TC-TIB-1112` (task TIB-044), status `passed` nhưng actualResult trống; expected đã sửa 2026-09-04 tách hai bề mặt. Proposal gốc ghi TC-56 đã rút về ⏸️ và còn nợ nửa generated design — trạng thái `passed` trên Testlane không khớp.
  - Jira TIB-5242 / TIB-5265: không có câu Dev nào về hide origin.
- **Rule QA có chủ:** FACT-014, FACT-043 · owner_role QA · recorded_on 2026-09-04 · locator Proposal CBS-116 CLAIM-01 (+ Testlane TC-TIB-1242, TC-TIB-1112)
- **OQ:** NEEDS_CONFIRMATION — Ẩn origin thì linked copy hiện ở editor preview nhưng bị loại khỏi final render (storefront và bản in) có đúng không, cả hai bề mặt đã được verify chưa (TC-56 từng tick sai, còn nợ nửa generated design)? — Người trả lời: Dev.
- **OQ:** Cho QA: Testlane `TC-TIB-1112` (QA-3343 TC-56) đang `passed` với actualResult trống, trái với ghi chú "đã rút về ⏸️". Cần chạy lại nửa generated design và cập nhật record (kết quả, ngày chạy, build).
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
- **Loại nguồn:** `QA_RULE`
- **Người xác nhận, ngày nguồn:** QA, 2026-08-26
- **Locator:** Knowledge QA local FACT-035 (TIB-5265). Testlane: QA-3345 TC-55 = `TC-TIB-1259`, TC-58 = `TC-TIB-1262` (task TIB-046), status `passed`, actualResult "✅ AI" (không ngày/build). Bổ trợ một phần: Jira TIB-5265 comment Dev 2026-08-18 (checklist sinh từ branch diff) — cover crop canh theo box của linked layer, fallback `contain` khi không đo được ảnh.
- **Rule QA có chủ:** FACT-035 · owner_role QA · recorded_on 2026-08-26 · locator Proposal CBS-116 CLAIM-02 (+ Testlane TC-TIB-1259, TC-TIB-1262)
- **OQ:** NEEDS_CONFIRMATION — Background của linked layer hành xử y hệt origin, có đúng sau lần dev sửa 2026-09-08 không (kiểm bằng ảnh chụp trước lần sửa)? — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  Background của linked layer hành xử y hệt origin — "original layer như nào thì linked layer như thế". Không được dựng expected result kiểu "linked dùng cover còn non-linked dùng contain"; nếu thấy lệch thì đó là deviation phải escalate. User chốt 2026-08-26 (TIB-5265).
  Jira TIB-5265, comment Dev 2026-08-18: "Background: the cover crop is centered on the **linked** layer's box, not stretched, and matches the SDK preview."
  Jira TIB-5265, comment Dev 2026-08-18: "A background image that cannot be downloaded or measured → falls back to `contain`, no exception, a warning is logged."
  ```

### CLAIM-03

- **Statement:** Warp Text linked copy sync background image từ origin: copy không lưu `background_image` riêng (kế thừa theo tham chiếu) và canvas render đổi màu hoặc hình theo origin ngay khi origin đổi background rồi Save.
- **Object / feature:** artwork/layer-duplicate-link-copy
- **Quan hệ với canon:** `ADD` (lấp OQ-artwork-081: sync origin sang linked chưa test end-to-end; CHK-006)
- **Scope:** seller; portal (editor canvas), api (field background_image của linked copy)
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `test_case` (không đủ S3) → xếp `QA_RULE`
- **Người xác nhận, ngày nguồn:** AI (tick `[AI]`, không có tick `[QA]`), 2026-09-08
- **Locator:** QA-3345 TC-25, theo Proposal gốc ✅ PASS 2026-09-08 staging, kiểm bằng ảnh chụp canvas editor thật (đỏ rồi xanh theo origin) và dữ liệu `WT-Link` không có `background_image` riêng. Knowledge QA local FACT-030. Testlane: TC-25 = `TC-TIB-1229` (task TIB-046), status `passed` nhưng actualResult và expectedResult đều là "❌ AI — replacing the saved background does not refresh the rendered image"; không ngày, không build, không ảnh đính kèm.
- **Căn cứ expected:** Jira TIB-5265, comment Dev 2026-08-18 (checklist sinh từ branch diff): "Set / change / remove a background image on the origin → reflected on the linked copy." Đây là checklist Dev tự sinh, chưa phải sign-off; trước đây (Proposal gốc) ghi KHÔNG CÓ.
- **Rule QA có chủ:** FACT-030 · owner_role QA · recorded_on 2026-09-08 · locator Proposal CBS-116 CLAIM-03 (+ Testlane TC-TIB-1229)
- **OQ:** NEEDS_CONFIRMATION — Warp Text linked copy kế thừa background_image theo tham chiếu từ origin có đúng trên production không (TC-25 PASS trên staging, ship UNKNOWN)? — Người trả lời: Dev.
- **OQ:** CONFLICT — Record Testlane `TC-TIB-1229` (TC-25) ghi "❌ AI — replacing the saved background does not refresh the rendered image" (status vẫn `passed`), trái với FACT-030 "CONFIRMED bằng mắt 2026-09-08". QA cần chạy lại TC-25 và ghi record Testlane có ngày chạy + build + ảnh; nếu canvas linked copy không đổi khi thay background của origin thì hỏi Dev đó là bug hay giới hạn đã biết. — Người trả lời: QA (chạy lại), Dev. Side A: Testlane TC-TIB-1229 ❌ / Side B: FACT-030 ✅ 2026-09-08.
- **Trích nguyên văn:**
  ```
  Warp Text linked copy sync background image từ origin — CONFIRMED bằng mắt (TC-25 QA-3345, 2026-09-08). `WT-Link` không lưu `background_image` riêng (kế thừa theo tham chiếu) và render canvas thật sự đổi màu/hình theo origin ngay khi origin đổi bg + Save (visual: đỏ→xanh cùng lúc).
  Testlane TC-TIB-1229 actualResult: "❌ AI — replacing the saved background does not refresh the rendered image"
  Jira TIB-5265, comment Dev 2026-08-18: "Set / change / remove a background image on the origin → reflected on the linked copy."
  ```

### CLAIM-04

- **Statement:** Linked Warp Text copy chỉ sửa được phần Extra và menu "..." (align, geometry, duplicate, delete); toàn bộ design, typography, warp preset, control point và background là read-only trên copy.
- **Object / feature:** artwork/layer-duplicate-link-copy
- **Quan hệ với canon:** `ADD` (CHK-002; lấp OQ-artwork-081)
- **Scope:** seller; portal (artwork editor AW2.0)
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `QA_RULE`
- **Người xác nhận, ngày nguồn:** QA, 2026-09-04
- **Locator:** Knowledge QA local FACT-040 (QA-3345 TC-28). Testlane: TC-28 = `TC-TIB-1232` (task TIB-046), status `passed`, "✅ AI — linked-copy editable-control inventory is restricted correctly" (không ngày/build; Proposal gốc ghi bảng TC local là ⏸️ Not run). Bổ trợ một phần từ Dev: TIB-5242 description (2026-07-25) "The linked layer should not be edited."; TIB-5265 description "same behavior as other supported layer types"; TIB-5265 comment Dev 2026-08-18 về tab bị ẩn trên linked copy. Không câu nào liệt kê đúng "chỉ Extra + menu ...".
- **Rule QA có chủ:** FACT-040 · owner_role QA · recorded_on 2026-09-04 · locator Proposal CBS-116 CLAIM-04 (+ Testlane TC-TIB-1232)
- **OQ:** NEEDS_CONFIRMATION — Linked Warp Text copy chỉ sửa được phần Extra và menu "...", còn design, typography, warp, background read-only, có đúng sau lần dev sửa 2026-09-08 không (bảng TC ghi Not run)? — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  Linked Warp Text copy: bề mặt sửa được = CHỈ phần `Extra` + `...` menu action. Toàn bộ design/typography/warp preset/control point/background = read-only trên copy. User chốt 2026-09-04 (QA-3345, TC-28).
  Jira TIB-5242 description (Dev, 2026-07-25): "Should support Duplicate & Link for Word Cloud. The linked layer should not be edited."
  Jira TIB-5265, comment Dev 2026-08-18: "The linked copy shows the \"Linked layer\" tab; Personalization, Populate values, Condition settings and Group name are hidden."
  ```

### CLAIM-05

- **Statement:** Word Cloud có Align và Align nằm trong nhóm sửa được của linked copy (cùng nhóm Min/Max font size và Transform); Align trên linked copy chỉ dịch chính copy, origin giữ nguyên; Align hợp lệ trên origin, linked copy và multi-selection, không được báo bug vì Align xuất hiện.
- **Object / feature:** artwork/layer-duplicate-link-copy (bổ sung cho editor-layer-workspace KB-042: toolbar đổi theo loại layer)
- **Quan hệ với canon:** `ADD`
- **Scope:** seller; portal (artwork editor AW2.0)
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `QA_RULE`
- **Người xác nhận, ngày nguồn:** QA, 2026-08-26
- **Locator:** Knowledge QA local FACT-011 (TIB-5242), đính chính câu trả lời đầu cùng ngày là "word cloud không có align". Testlane: QA-3343 TC-37 = `TC-TIB-1093` (task TIB-044), status `passed`, "✅ AI — Align was visible for the linked copy, the origin and a two-layer multi-selection. QA confirmed during the run…" (không ngày/build). Bổ trợ một phần: Jira TIB-5242 comment Dev 2026-08-24 — linked word cloud có Min/Max font size riêng, sửa độc lập; không nói Align.
- **Rule QA có chủ:** FACT-011 · owner_role QA · recorded_on 2026-08-26 · locator Proposal CBS-116 CLAIM-05 (+ Testlane TC-TIB-1093)
- **OQ:** NEEDS_CONFIRMATION — Word Cloud có Align và Align trong nhóm sửa được của linked copy (chỉ dịch copy) có đúng không (đính chính của chính nguồn, TC-37 không có hàng kết quả ghi ngày chạy)? — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  Word Cloud CÓ Align, và Align NẰM TRONG NHÓM SỬA ĐƯỢC trên linked copy (cùng nhóm với Min/Max font size + Transform) — apply Align trên linked copy chỉ dịch chuyển chính nó, origin giữ nguyên. Align là control hợp lệ trên origin, linked copy và multi-selection; không được báo bug vì Align xuất hiện. (User correction 2026-08-26, TIB-5242)
  Jira TIB-5242, comment Dev 2026-08-24: "\"Duplicate & Link\" action (`duplicateLinkSelectedLayers`) on a selected word-cloud layer → new layer is created with `customization_type: linked`, `linked: <originId>`, and starts with the origin's `min_font_size`/`max_font_size` values (deep-cloned), editable independently afterwards."
  ```

### CLAIM-06

- **Statement:** Align hợp lệ trên linked Warp Text copy (khớp Word Cloud); Align chỉ dịch box của chính copy, không đụng origin.
- **Object / feature:** artwork/layer-duplicate-link-copy (bổ sung cho editor-layer-workspace KB-042)
- **Quan hệ với canon:** `ADD`
- **Scope:** seller; portal (artwork editor AW2.0)
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `QA_RULE`
- **Người xác nhận, ngày nguồn:** QA, 2026-09-04
- **Locator:** Knowledge QA local FACT-044 (QA-3345 TC-34). Testlane: TC-34 = `TC-TIB-1238` (task TIB-046), status `passed`, "✅ AI — all six Align actions affect only the linked box" (không ngày/build; field "Assumption?" ghi "Yes — confirmed for Word Cloud, assumed identical for Warp Text"). Không có nguồn Dev/PO.
- **Rule QA có chủ:** FACT-044 · owner_role QA · recorded_on 2026-09-04 · locator Proposal CBS-116 CLAIM-06 (+ Testlane TC-TIB-1238)
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
- **Loại nguồn:** `QA_RULE` (hai rule QA mâu thuẫn nhau)
- **Người xác nhận, ngày nguồn:** QA, 2026-08-26 (render rỗng) và 2026-09-07 (không rỗng)
- **Locator:** Knowledge QA local FACT-033 (TIB-5265). QA-3345 TC-35 recheck 2026-09-07 trên cặp clone. Testlane: TC-35 = `TC-TIB-1239` (task TIB-046), status `passed`, expectedResult vẫn ghi "renders **empty** … ❌ AI — deleting origin leaves stale linked render instead of empty", actualResult ghi "✅ AI — xoá origin: warp text hành xử GIỐNG HỆT single-line text, đúng hành vi"; TC-36 = `TC-TIB-1240` passed. Jira: comment Dev 2026-08-18 trên TIB-5265 và comment Dev 2026-08-24 trên TIB-5242 là checklist tự sinh từ branch diff, chỉ nói "no crash", không nói copy hiển thị gì.
- **Rule QA có chủ:** FACT-033 (side A, recorded_on 2026-08-26) và TC-35 recheck (side B, recorded_on 2026-09-07) · owner_role QA · locator Proposal CBS-116 CLAIM-07 (+ Testlane TC-TIB-1239)
- **OQ:** CONFLICT — Sau khi xoá origin của linked Warp Text, copy hiển thị gì ở editor, storefront render và design file? — Người trả lời: Dev. Side A: copy render rỗng (FACT-033, 2026-08-26; expectedResult của TC-TIB-1239) / Side B: copy vẫn hiện nội dung origin đã xoá, giống Single-line Text (QA-3345 TC-35 recheck 2026-09-07; actualResult của TC-TIB-1239).
- **Trích nguyên văn:**
  ```
  FACT-033: Xoá origin của linked Warp Text → linked copy render RỖNG (không phải ẩn layer, không auto-unlink, không placeholder). User chốt 2026-08-26 (TIB-5265): "-> empty".
  TC-35 recheck 2026-09-07: warp text hành xử GIỐNG HỆT single-line text, đúng hành vi.
  Jira TIB-5265, comment Dev 2026-08-18: "Delete the origin layer → the linked copy degrades gracefully (no crash, no blank canvas)."
  Jira TIB-5242, comment Dev 2026-08-24: "Render `WordCloud.vue` with `customization_type = linked` but **no** `parentLayer` (edge case, e.g. origin deleted) → no crash, sensible fallback."
  ```
