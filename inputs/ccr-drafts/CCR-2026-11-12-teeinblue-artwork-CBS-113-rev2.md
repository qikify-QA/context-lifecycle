# Context Change Request: artwork-linked-layers-create-convert — gộp từ CBS-037 và CBS-038 (phần tạo link và convert) — rev2 (đối chiếu nguồn 2026-11-12)

- **Product:** `teeinblue`
- **Object:** `artwork`
- **Ticket:** `TIB-5242, TIB-5265, TIB-5241, TIB-5211, QA-3343, QA-3345, QA-3350`
- **Các khối có trong file:** `A`

## Mức độ gấp

`MEDIUM` — ảnh hưởng coverage cơ chế link của layer; các Proposal gốc CBS-037, CBS-038 không điền mức độ gấp, đây là mặc định của người chuyển khuôn, operator xác nhận. CLAIM-05 có thể làm sai CHK-005 của editor-layer-workspace nếu "..." là menu cấp layer.

> Ghi chú rev2: giữ nội dung Proposal CBS-113 (blocked, run CTX-20261111-19). Đã tra: spec-hub (log_id 239, 241; không có rule nào về Duplicate & Link hay convert layer có link), Testlane (task TIB-044 = QA-3343, TIB-046 = QA-3345, TIB-062 = QA-3350), Jira TIB-5211, TIB-5242, TIB-5265, TIB-5241 (chỉ đọc). Nguồn S3 tìm được: mô tả story TIB-5211 (Dev, 2026-07-20) cho CLAIM-06/07 và một phần CLAIM-05; mô tả TIB-5265 (Dev, 2026-07-31) cho CLAIM-04. Các record Testlane có thật nhưng chỉ là tick `[AI]` đồng bộ, không ghi build, nên không đủ S3. Claim gốc từ QA được xếp rule QA có chủ (S2) theo quyết định operator 2026-11-12. Tên cá nhân được thay bằng vai trò.

# Khối A — Hành vi

Phần lớn claim là lời QA chốt khi test, test case tick `[AI]` chạy trước lần dev sửa TIB-5265 (2026-09-08). Build không rõ cho mọi claim; quan sát trên staging, production không rõ.

### CLAIM-01

- **Statement:** Duplicate & Link trên layer đã linked thì bản mới trỏ về origin gốc, không tạo chain và không bị chặn; áp dụng cho Word Cloud và Warp Text, coi là rule chung của cơ chế link.
- **Object / feature:** artwork/layer-duplicate-link-copy
- **Quan hệ với canon:** `ADD` (lấp OQ-artwork-081 và CHK-006: đồng bộ origin sang linked chưa test)
- **Scope:** seller; portal (artwork editor AW2.0)
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `QA_RULE`
- **Người xác nhận, ngày nguồn:** QA, 2026-08-26
- **Locator:** Gộp hai mục knowledge QA local trùng rule: FACT-013 (Word Cloud, TIB-5242, 2026-08-26) và FACT-037 (Warp Text, TIB-5265, chốt 2026-08-26). Bổ trợ: QA-3343 TC-07, QA-3345 TC-04, đều trước lần dev sửa TIB-5265 2026-09-08. Ghi chú từ khuôn cũ: gộp hay tách hai FACT là việc của agent xử lý CCR.
  - Testlane: QA-3343 TC-07 = `TC-TIB-1063` (task TIB-044), status `passed`, "✅ AI — Duplicate & Link on an already-linked copy created a new copy whose `Source layer` resolved to the original Word Cloud…"; QA-3345 TC-04 = `TC-TIB-1540` (task TIB-046), status `passed`, "✅ AI — link về ORIGIN GỐC, không tạo chain". Không ngày chạy/build trong record; căn cứ expected ghi trong case là "Confirmed by QA 2026-08-26". Không đủ S3.
  - Jira TIB-5242, comment Dev 2026-08-24 (checklist sinh từ branch diff): chỉ nêu "verify no nested/circular reference", không nói rõ trỏ về origin gốc. Bổ trợ, chưa đủ S3.
- **Rule QA có chủ:** FACT-013, FACT-037 · owner_role QA · recorded_on 2026-08-26 · locator Proposal CBS-113 CLAIM-01 (+ Testlane TC-TIB-1063, TC-TIB-1540)
- **OQ:** NEEDS_CONFIRMATION — Duplicate & Link trên layer đã linked luôn trỏ về origin gốc (không chain, không bị chặn) có là rule chung của cơ chế link không (nguồn là knowledge QA, kiểm trước lần dev sửa TIB-5265 ngày 2026-09-08)? — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  FACT-013: Duplicate & Link trên một layer ĐÃ linked → bản mới trỏ về ORIGIN GỐC, không tạo chain và không bị chặn. (User chốt 2026-08-26, TIB-5242)
  FACT-037: Duplicate & Link trên layer đã linked → bản mới trỏ về ORIGIN GỐC (vd `warp text` → `warp text copy` → `warp text copy copy` link về `warp text`). Đã chốt cho Word Cloud (TIB-5242) và xác nhận lại cho Warp Text (TIB-5265) — coi như rule chung của cơ chế link.
  Jira TIB-5242, comment Dev 2026-08-24: "Duplicate a word-cloud layer that is already linked (linked → linked) — verify no nested/circular reference."
  ```

### CLAIM-02

- **Statement:** Duplicate & Link trên multi-select có lẫn type không support link thì type đó được duplicate thường (bản copy độc lập, không biểu tượng link), không bị bỏ qua.
- **Object / feature:** artwork/layer-duplicate-link-copy
- **Quan hệ với canon:** `ADD` (liên quan KB-045: 20 type LINKED, 15 type PLAIN_COPY; không mâu thuẫn)
- **Scope:** seller; portal (artwork editor AW2.0)
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `QA_RULE`
- **Người xác nhận, ngày nguồn:** QA, 2026-08-26
- **Locator:** Knowledge QA local FACT-015 (TIB-5242). Bổ trợ: QA-3345 TC-07 = `TC-TIB-1543` (task TIB-046), status `passed`, "✅ AI — type không support được duplicate thường" (không ngày/build; căn cứ expected là "qa_memory group F"). Jira TIB-5265, comment Dev 2026-08-18 (checklist sinh từ branch diff) chỉ nói "only the allowed types get linked", không nói type còn lại được duplicate thường.
- **Rule QA có chủ:** FACT-015 · owner_role QA · recorded_on 2026-08-26 · locator Proposal CBS-113 CLAIM-02 (+ Testlane TC-TIB-1543)
- **OQ:** NEEDS_CONFIRMATION — Duplicate & Link trên multi-select lẫn type không support link thì type đó duplicate thường, có đúng không (nguồn là knowledge QA, kiểm trước lần dev sửa 2026-09-08)? — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  Duplicate & Link trên multi-select có lẫn type KHÔNG support → type đó được DUPLICATE THƯỜNG (bản copy độc lập, không 🔗), không phải bị bỏ qua. (User chốt 2026-08-26, TIB-5242)
  Jira TIB-5265, comment Dev 2026-08-18: "Duplicate & Link on a multi-selection mixing warp text with other layer types → only the allowed types get linked."
  ```

### CLAIM-03

- **Statement:** Duplicate & Link áp dụng ngay, không có bước confirm, đúng cho cả Warp Text lẫn các type khác.
- **Object / feature:** artwork/layer-duplicate-link-copy
- **Quan hệ với canon:** `ADD` (khớp CHK-004: client-side, không request tới Save)
- **Scope:** seller; portal (artwork editor AW2.0)
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `QA_RULE`
- **Người xác nhận, ngày nguồn:** QA, 2026-08-26
- **Locator:** Knowledge QA local FACT-036 (TIB-5265). Bổ trợ: QA-3345 TC-01 = `TC-TIB-1537` (task TIB-046), status `passed`, "✅ AI — tạo link từ toolbar, apply ngay" (không ngày/build). Không có nguồn Dev/PO hay spec-hub.
- **Rule QA có chủ:** FACT-036 · owner_role QA · recorded_on 2026-08-26 · locator Proposal CBS-113 CLAIM-03 (+ Testlane TC-TIB-1537)
- **OQ:** NEEDS_CONFIRMATION — Duplicate & Link áp dụng ngay không có bước confirm cho mọi type, có đúng sau lần dev sửa TIB-5265 ngày 2026-09-08 không? — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  Duplicate & Link áp dụng NGAY, không có bước confirm — đúng cho cả Warp Text lẫn các type khác. User chốt 2026-08-26.
  ```

### CLAIM-04

- **Statement:** Warp Text đã support Duplicate & Link từ TIB-5265 ở Artwork 2.0; câu cũ "Warp Text chưa support link" của TIB-5211 (2026-08-11) hết hiệu lực; Warp Text legacy (Artwork 1.0) không có Duplicate & Link.
- **Object / feature:** artwork/layer-duplicate-link-copy
- **Quan hệ với canon:** `ADD` (khớp KB-045: Warp Text thuộc nhóm LINKED, CHK-002)
- **Scope:** seller; portal (artwork editor AW2.0)
- **Đã ship:** `UNKNOWN` (TIB-5265 Done 2026-09-10; production không rõ)
- **Loại nguồn:** `spec_doc` (mô tả ticket TIB-5265 do Dev viết, kèm checklist Dev sinh từ branch diff). Ghi chú: run CTX-20261111-19 từng coi mô tả này "là mô tả yêu cầu, không phải sign-off"; reviewer cần quyết lại theo contract §3 (`spec_doc` = sản phẩm nên là gì). Vế "câu cũ của TIB-5211 hết hiệu lực" vẫn là lời QA.
- **Người xác nhận, ngày nguồn:** Dev (reporter/assignee TIB-5265), 2026-07-31 (mô tả) và 2026-08-18 (comment checklist); QA, 2026-08-26
- **Locator:** Jira TIB-5265 description (https://ownego.atlassian.net/browse/TIB-5265, created 2026-07-31, status Done 2026-09-10); comment Dev id 48238, 2026-08-18. Knowledge QA local FACT-029. Testlane: QA-3345 TC-01 = `TC-TIB-1537` passed; TC-08 = `TC-TIB-1212` skipped ("AW1.0 out of scope per standing directive 2026-08-18").
- **Rule QA có chủ:** (cho vế TIB-5211) FACT-029 · owner_role QA · recorded_on 2026-08-26 · locator Proposal CBS-113 CLAIM-04
- **OQ:** NEEDS_CONFIRMATION — Warp Text support Duplicate & Link ở Artwork 2.0 và câu cũ của TIB-5211 hết hiệu lực, có đúng không (mô tả TIB-5265 của dev không phải sign-off, kiểm trước lần dev sửa 2026-09-08)? — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  Warp Text ĐÃ support Duplicate & Link từ TIB-5265 (AW2.0) — câu cũ "Warp Text chưa support link" (TIB-5211, 2026-08-11) đã hết hiệu lực. (2026-08-26, QA-3345)
  Jira TIB-5265 description (Dev, 2026-07-31): "**Currently:** Duplicate & Link is not supported for Warp text layers. **Expectation:** Support Duplicate & Link for Warp text layers, same behavior as other supported layer types. Scope: Apply for Artwork 2.0"
  Jira TIB-5265, comment Dev 2026-08-18: "Duplicate & Link on a **legacy** warp text layer → still not offered (unchanged behavior)."
  ```

### CLAIM-05

- **Statement:** Entry point "link một layer sẵn có vào origin" ở Artwork 2.0 là menu "..." rồi "Link with another layer"; radio "Share with another layer" đã bị bỏ (disabled và display:none ở mọi layer type), thấy nó ẩn không phải regression.
- **Object / feature:** artwork/layer-duplicate-link-copy (chạm editor-layer-workspace)
- **Quan hệ với canon:** `CONTRADICTS KB-043` (KB-043 và CHK-005 nói layer action bar không có menu overflow "..."; chưa phân xử; CHK-005 nghi sai nếu "..." là menu cấp layer)
- **Scope:** seller; portal (artwork editor AW2.0)
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `spec_doc` cho vế "layer toolbar có menu `...` More actions" (story TIB-5211 do Dev viết). Vế "mục Link with another layer" và "radio Share with another layer đã bị bỏ" vẫn là `QA_RULE`.
- **Người xác nhận, ngày nguồn:** Dev (reporter/assignee TIB-5211), 2026-07-20; QA, 2026-09-04
- **Locator:** Jira TIB-5211 description (https://ownego.atlassian.net/browse/TIB-5211, Story, created 2026-07-20, Done 2026-08-13). Knowledge QA local FACT-038 (QA-3345, TIB-5265). Testlane: QA-3345 TC-02 = `TC-TIB-1538` (task TIB-046), status `passed`, "✅ AI — tạo được link qua entry point thứ 2"; tiêu đề case vẫn là "Create the link through Personalization Options → `Share with another layer`" trong khi expected nói radio không còn ở AW2.0. Menu "..." ghi nhận trên layer Warp Text: Bulk edit, Replace image layer, Link with another layer, Convert to another layer.
  - spec-hub `artwork-editor-bulk-edit` (feature `artwork-editor` v3, `sure: yellow`, log_id 239): còn liệt kê "the 'Share with another layer' option" trong bulk edit. Yellow nên chỉ là S1, nhưng là một phía khác cần hỏi.
- **Rule QA có chủ:** FACT-038 · owner_role QA · recorded_on 2026-09-04 · locator Proposal CBS-113 CLAIM-05 (+ Testlane TC-TIB-1538)
- **OQ:** CONFLICT — Menu "..." với mục "Link with another layer" có phải entry point link layer sẵn có ở Artwork 2.0 không, và có cùng bề mặt với layer action bar mà KB-043 nói không có overflow "..." không? — Người trả lời: Dev. Side A: KB-043 và CHK-005 nói layer action bar không có menu overflow "..." / Side B: FACT-038, QA-3345 TC-02 và story TIB-5211 ("layer toolbar's `...` More actions menu"). Gắn vào OQ-artwork-286 (CONF-CBS-092-01), không mở conflict mới.
- **OQ:** CONFLICT — Option "Share with another layer" ở Artwork 2.0 đã bị bỏ hẳn (disabled + display:none ở mọi layer type, theo QA) hay vẫn còn trong Bulk edit khi chọn nhiều layer (theo spec-hub `artwork-editor-bulk-edit`, yellow)? — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  Entry point "link một layer sẵn có vào origin" ở AW2.0 = `...` menu → `Link with another layer`. Radio `Share with another layer` trong Personalization Options đã bị bỏ ở AW2.0 (`disabled` + `display:none` ở MỌI layer type, kể cả Single-line Text) — thấy nó ẩn KHÔNG phải regression. User chốt 2026-09-04 (QA-3345). Áp dụng chung, không riêng Warp Text.
  Jira TIB-5211 description (Dev, 2026-07-20): "Extend the existing `Convert to another layer` action in the layer toolbar's `...` More actions menu to support conversion between all text layer types"
  spec-hub artwork-editor-bulk-edit (yellow): "When several layers are selected the merchant can change shared settings for all of them at once: text style (font, size, auto scale, alignment, color, stroke, curve, skew, spacing, shadow) for text-type layers, the 'Share with another layer' option, and replace the image of several image layers. Bulk changes overwrite the existing values."
  ```

### CLAIM-06

- **Statement:** Convert origin (đang có linked copy) sang type khác thì giữ link và cả nhóm convert cùng; convert một linked copy (không phải source) sang type khác thì tự gỡ link của chính nó và thành layer độc lập (không personalization), origin và copy khác giữ nguyên.
- **Object / feature:** artwork/layer-duplicate-link-copy
- **Quan hệ với canon:** `ADD` (thay câu cũ trong knowledge QA local ngày 2026-08-11, không phải canon publish)
- **Scope:** seller; portal (artwork editor AW2.0)
- **Đã ship:** `SHIPPED` theo ticket (TIB-5211 Done 2026-08-13); với Warp Text phụ thuộc TIB-5265 (Done 2026-09-10)
- **Loại nguồn:** `spec_doc` (story TIB-5211 do Dev viết)
- **Người xác nhận, ngày nguồn:** Dev (reporter/assignee TIB-5211), 2026-07-20
- **Locator:** Jira TIB-5211 description, mục "Duplicate and Linked layers" (https://ownego.atlassian.net/browse/TIB-5211). Bổ trợ: knowledge QA local FACT-039 (QA-3345); Testlane QA-3345 TC-42 = `TC-TIB-1578` passed "✅ AI — converting the origin converts the linked group and retains link", TC-43 = `TC-TIB-1579` passed "✅ AI — convert linked copy (non-source) chỉ đổi đúng layer đó và tự gỡ link" (expectedResult của TC-43 còn sót dòng "❌ AI — converting non-source linked copy is a no-op"; không ngày/build).
  - Lưu ý về nguồn: mô tả TIB-5211 đã nói "giữ link khi convert source" ngay từ 2026-07-20. Câu của Proposal gốc "rule TIB-5211 ('convert link-source sang Warp Text thì gỡ link') đã chết hẳn" nói về một xác nhận QA ngày 2026-08-11 trong knowledge QA, không phải nội dung ticket TIB-5211. Statement đã được viết lại theo đúng ticket; câu gốc giữ trong trích dẫn.
- **Căn cứ expected:** Jira TIB-5211 description (Dev, 2026-07-20) — trích dưới; dùng được làm căn cứ khi chạy lại TC-42/43 thành record Testlane có build.
- **OQ:** NEEDS_CONFIRMATION — Convert linked copy thành "independent layer (No personalization)": copy sau khi convert có mất hết personalization (thành layer tĩnh) không, và quy tắc này có áp cho Warp Text sau TIB-5265 không? — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  Jira TIB-5211 description (Dev, 2026-07-20): "Duplicate and Linked layers — Converting the source layer: Keep the link relationship and convert all linked layers to the same target type. Converting a linked layer: Unlink the selected layer and convert it into an independent layer (No personalization)."
  Proposal gốc: Convert type khi có link — rule TIB-5211 ("convert link-source sang Warp Text thì gỡ link") ĐÃ CHẾT HẲN. User chốt 2026-09-04: "bỏ rule này, dup & link thì sẽ thành linked layer" ⇒ convert origin (đang có linked copy) sang type khác, hoặc convert Single-line Text origin sang Warp Text → giữ link, cả nhóm thành linked layer. NHƯNG convert một linked copy (không phải source) sang type khác thì vẫn unlink chính nó, origin + copy khác giữ nguyên (user chốt 2026-09-04, TC-43). (QA-3345)
  ```

### CLAIM-07

- **Statement:** Convert origin Single-line Text sang Warp Text thì cả nhóm link convert cùng và linked copy giữ link (lỗi cũ gỡ link đã được dev sửa).
- **Object / feature:** artwork/layer-duplicate-link-copy
- **Quan hệ với canon:** `ADD`
- **Scope:** seller; portal (artwork editor AW2.0), api (linked, type sau Save và Close)
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `spec_doc` cho expected behavior (TIB-5211 + TIB-5265 do Dev viết). Vế "lỗi đã được dev sửa" vẫn chỉ là tick `[AI]` local, và mâu thuẫn với record Testlane (xem OQ CONFLICT).
- **Người xác nhận, ngày nguồn:** Dev (TIB-5211), 2026-07-20; Dev (TIB-5265), 2026-07-31; AI (tick `[AI]`), 2026-09-08
- **Locator:** Jira TIB-5211 description; Jira TIB-5265 description. QA-3345 TC-44 = `TC-TIB-1580` (task TIB-046) trên Testlane: status `passed` nhưng actualResult là "❌ AI — source conversion drops the link", không ngày chạy, không build. Knowledge QA local FACT-031 ghi "ĐÃ FIX (recheck 2026-09-08)".
- **Căn cứ expected:** Jira TIB-5211 description (Dev, 2026-07-20) "Converting the source layer: Keep the link relationship…" và TIB-5265 (Dev, 2026-07-31) "same behavior as other supported layer types".
- **OQ:** NEEDS_CONFIRMATION — Convert origin Single-line Text sang Warp Text giữ link cho cả nhóm đã được dev sửa và có lên production chưa (TC-44 PASS trên staging, production không rõ)? — Người trả lời: Dev.
- **OQ:** CONFLICT — Record Testlane `TC-TIB-1580` (TC-44) có status `passed` nhưng actualResult ghi "❌ AI — source conversion drops the link", trái với FACT-031 "ĐÃ FIX (recheck 2026-09-08)". QA cần chạy lại TC-44 và ghi record Testlane có ngày chạy + build; nếu vẫn gỡ link thì hỏi Dev: convert Single-line Text origin có linked copy sang Warp Text trên bản hiện tại có giữ link không? — Người trả lời: QA (chạy lại), Dev (nếu còn lỗi). Side A: Testlane TC-TIB-1580 actualResult ❌ / Side B: FACT-031 recheck 2026-09-08 ✅.
- **Trích nguyên văn:**
  ```
  TC-44 QA-3345 — ĐÃ FIX (recheck 2026-09-08). Bug cũ (2026-09-04: convert Single-line origin → Warp Text gỡ link) đã được dev sửa. Recheck: convert `WT-Single` origin → Warp Text thì cả nhóm link convert cùng nhau, `WT-Single copy` giữ `linked=layer-795015` + đổi sang warp-text, origin → warp-text, 0 pageerror.
  Testlane TC-TIB-1580 actualResult: "❌ AI — source conversion drops the link"
  Jira TIB-5211 description (Dev, 2026-07-20): "Converting the source layer: Keep the link relationship and convert all linked layers to the same target type."
  ```

### CLAIM-08

- **Statement:** Color layer không có link sống: Duplicate & Link trên Color layer chạy y hệt Duplicate thường (copy `default_value` một lần, `customization_type` vẫn `normal`, không có field `linked`), sửa default trên origin sau đó không propagate sang copy, đó là đúng hành vi.
- **Object / feature:** artwork/layer-duplicate-link-copy
- **Quan hệ với canon:** `ADD` (bổ sung KB-045, Color đã nằm nhóm PLAIN_COPY; CHK-003)
- **Scope:** seller; portal (artwork editor AW2.0), api (field linked, customization_type)
- **Đã ship:** `UNKNOWN` (TIB-5241 lên production 2026-09-17 nhưng release-verification chỉ kiểm chỉ-đọc default value, không kiểm Duplicate & Link)
- **Loại nguồn:** `QA_RULE` (test case không đủ S3: không build, căn cứ expected là lời QA)
- **Người xác nhận, ngày nguồn:** QA, 2026-09-06; AI (tick `[AI]`), 2026-09-11
- **Locator:** QA-3350 TC-39 = `TC-TIB-2060`, TC-40 = `TC-TIB-2061` (task TIB-062) trên Testlane, status `passed`, actualResult "✅ AI — … (full-suite regression run 2026-09-11, 48 pass/3 flaky-then-pass/0 fail)", không build. Knowledge QA local FACT-045 (TIB-5241). Jira TIB-5241 (description và comment Dev 2026-08-20) không nói gì về Duplicate & Link trên Color layer. Ghi chú từ khuôn cũ: không suy rule này cho layer type khác Color.
- **Căn cứ expected:** KHÔNG CÓ (căn cứ là lời QA chốt 2026-09-06 trong chat, không PO/Dev)
- **Rule QA có chủ:** FACT-045 · owner_role QA · recorded_on 2026-09-06 · locator Proposal CBS-113 CLAIM-08 (+ Testlane TC-TIB-2060, TC-TIB-2061)
- **OQ:** NEEDS_CONFIRMATION — Duplicate & Link trên Color layer là copy thường (không link sống) có đúng trên production không (TC PASS trên staging, release-verification không kiểm Duplicate & Link)? — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  Color layer KHÔNG support Duplicate & Link kiểu link sống — khác Word Cloud/Warp Text (user chốt 2026-09-06, QA-3350/TIB-5241). "Duplicate & Link" trên Color layer hoạt động y hệt Duplicate thường: copy giá trị `default_value` một lần tại thời điểm bấm, KHÔNG tạo link sống (không có field `linked`, `customization_type` vẫn "normal"). Sửa default trên origin SAU khi copy không propagate sang bản copy — đây là hành vi ĐÚNG, không phải bug.
  TC-39 (result 2026-09-11): ✅ AI — "Duplicate & Link" on a Color layer copies the value once, does NOT create a live link
  ```
