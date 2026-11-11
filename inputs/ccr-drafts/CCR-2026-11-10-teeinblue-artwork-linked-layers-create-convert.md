# Context Change Request: artwork-linked-layers-create-convert — gộp từ CBS-037 và CBS-038 (phần tạo link và convert)

- **Product:** `teeinblue`
- **Object:** `artwork`
- **Ticket:** `TIB-5242, TIB-5265, TIB-5241, TIB-5211, QA-3343, QA-3345, QA-3350`
- **Các khối có trong file:** `A`

## Mức độ gấp

`MEDIUM` — ảnh hưởng coverage cơ chế link của layer; các Proposal gốc CBS-037, CBS-038 không điền mức độ gấp, đây là mặc định của người chuyển khuôn, operator xác nhận. CLAIM-05 có thể làm sai CHK-005 của editor-layer-workspace nếu "..." là menu cấp layer.

# Khối A — Hành vi

Phần lớn claim là lời QA chốt khi test, test case tick `[AI]` chạy trước lần dev sửa TIB-5265 (2026-09-08) nên không đủ điều kiện làm nguồn. Build không rõ cho mọi claim; quan sát trên staging, production không rõ. Chưa claim nào do PO/Dev xác nhận.

### CLAIM-01

- **Statement:** Duplicate & Link trên layer đã linked thì bản mới trỏ về origin gốc, không tạo chain và không bị chặn; áp dụng cho Word Cloud và Warp Text, coi là rule chung của cơ chế link.
- **Object / feature:** artwork/layer-duplicate-link-copy
- **Quan hệ với canon:** `ADD` (lấp OQ-artwork-081 và CHK-006: đồng bộ origin sang linked chưa test)
- **Scope:** seller; portal (artwork editor AW2.0)
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA (Yến), 2026-08-26
- **Locator:** Gộp hai mục knowledge QA local trùng rule: FACT-013 (Word Cloud, TIB-5242, 2026-08-26) và FACT-037 (Warp Text, TIB-5265, chốt 2026-08-26, ngày xác nhận lại cho Warp Text không rõ). Bổ trợ: QA-3343 TC-07 ✅ AI (không có hàng ghi ngày chạy), QA-3345 TC-04 ✅ AI 2026-08-26, đều trước lần dev sửa TIB-5265 2026-09-08. Ghi chú từ khuôn cũ: gộp hay tách hai FACT là việc của agent xử lý CCR.
- **OQ:** NEEDS_CONFIRMATION — Duplicate & Link trên layer đã linked luôn trỏ về origin gốc (không chain, không bị chặn) có là rule chung của cơ chế link không (nguồn là knowledge QA, kiểm trước lần dev sửa TIB-5265 ngày 2026-09-08)? — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  FACT-013: Duplicate & Link trên một layer ĐÃ linked → bản mới trỏ về ORIGIN GỐC, không tạo chain và không bị chặn. (User chốt 2026-08-26, TIB-5242)
  FACT-037: Duplicate & Link trên layer đã linked → bản mới trỏ về ORIGIN GỐC (vd `warp text` → `warp text copy` → `warp text copy copy` link về `warp text`). Đã chốt cho Word Cloud (TIB-5242) và xác nhận lại cho Warp Text (TIB-5265) — coi như rule chung của cơ chế link.
  ```

### CLAIM-02

- **Statement:** Duplicate & Link trên multi-select có lẫn type không support link thì type đó được duplicate thường (bản copy độc lập, không biểu tượng link), không bị bỏ qua.
- **Object / feature:** artwork/layer-duplicate-link-copy
- **Quan hệ với canon:** `ADD` (liên quan KB-045: 20 type LINKED, 15 type PLAIN_COPY; không mâu thuẫn)
- **Scope:** seller; portal (artwork editor AW2.0)
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA (Yến), 2026-08-26
- **Locator:** Knowledge QA local FACT-015 (TIB-5242). Bổ trợ: QA-3345 TC-07 ✅ AI 2026-08-26, trước lần dev sửa TIB-5265 2026-09-08.
- **OQ:** NEEDS_CONFIRMATION — Duplicate & Link trên multi-select lẫn type không support link thì type đó duplicate thường, có đúng không (nguồn là knowledge QA, kiểm trước lần dev sửa 2026-09-08)? — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  Duplicate & Link trên multi-select có lẫn type KHÔNG support → type đó được DUPLICATE THƯỜNG (bản copy độc lập, không 🔗), không phải bị bỏ qua. (User chốt 2026-08-26, TIB-5242)
  ```

### CLAIM-03

- **Statement:** Duplicate & Link áp dụng ngay, không có bước confirm, đúng cho cả Warp Text lẫn các type khác.
- **Object / feature:** artwork/layer-duplicate-link-copy
- **Quan hệ với canon:** `ADD` (khớp CHK-004: client-side, không request tới Save)
- **Scope:** seller; portal (artwork editor AW2.0)
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA (Yến), 2026-08-26
- **Locator:** Knowledge QA local FACT-036 (TIB-5265). Bổ trợ: QA-3345 TC-01 ✅ AI 2026-08-26, trước lần dev sửa TIB-5265 2026-09-08.
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
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA (Yến), 2026-08-26
- **Locator:** Knowledge QA local FACT-029; mô tả TIB-5265 do dev giangnth viết (không phải sign-off). Bổ trợ: QA-3345 TC-01 ✅ AI 2026-08-26 (trước lần dev sửa 2026-09-08); TC-08 (Artwork 1.0) ⏭️ bỏ qua.
- **OQ:** NEEDS_CONFIRMATION — Warp Text support Duplicate & Link ở Artwork 2.0 và câu cũ của TIB-5211 hết hiệu lực, có đúng không (mô tả TIB-5265 của dev không phải sign-off, kiểm trước lần dev sửa 2026-09-08)? — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  Warp Text ĐÃ support Duplicate & Link từ TIB-5265 (AW2.0) — câu cũ "Warp Text chưa support link" (TIB-5211, 2026-08-11) đã hết hiệu lực. (2026-08-26, QA-3345)
  Mô tả TIB-5265 (dev giangnth): Currently: Duplicate & Link is not supported for Warp text layers. Expectation: Support Duplicate & Link for Warp text layers, same behavior as other supported layer types. Scope: Apply for Artwork 2.0
  ```

### CLAIM-05

- **Statement:** Entry point "link một layer sẵn có vào origin" ở Artwork 2.0 là menu "..." rồi "Link with another layer"; radio "Share with another layer" đã bị bỏ (disabled và display:none ở mọi layer type), thấy nó ẩn không phải regression.
- **Object / feature:** artwork/layer-duplicate-link-copy (chạm editor-layer-workspace)
- **Quan hệ với canon:** `CONTRADICTS KB-043` (KB-043 và CHK-005 nói layer action bar không có menu overflow "..."; chưa biết hai bên nói cùng một bề mặt hay khác nhau, chưa phân xử; CHK-005 nghi sai nếu "..." là menu cấp layer)
- **Scope:** seller; portal (artwork editor AW2.0)
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA (Yến), 2026-09-04
- **Locator:** Knowledge QA local FACT-038 (QA-3345, TIB-5265). Bổ trợ: QA-3345 TC-02 ✅ AI 2026-08-26, trước lần dev sửa 2026-09-08. Menu "..." ghi nhận trên layer Warp Text: Bulk edit, Replace image layer, Link with another layer, Convert to another layer.
- **OQ:** CONFLICT — Menu "..." với mục "Link with another layer" có phải entry point link layer sẵn có ở Artwork 2.0 không, và có cùng bề mặt với layer action bar mà KB-043 nói không có overflow "..." không? — Người trả lời: Dev. Side A: KB-043 và CHK-005 nói layer action bar không có menu overflow "..." / Side B: FACT-038 và QA-3345 TC-02 thấy menu "..." có Link with another layer.
- **Trích nguyên văn:**
  ```
  Entry point "link một layer sẵn có vào origin" ở AW2.0 = `...` menu → `Link with another layer`. Radio `Share with another layer` trong Personalization Options đã bị bỏ ở AW2.0 (`disabled` + `display:none` ở MỌI layer type, kể cả Single-line Text) — thấy nó ẩn KHÔNG phải regression. User chốt 2026-09-04 (QA-3345). Áp dụng chung, không riêng Warp Text.
  ```

### CLAIM-06

- **Statement:** Rule TIB-5211 "convert link-source sang Warp Text thì gỡ link" đã bỏ: convert origin (đang có linked copy) sang type khác thì giữ link và cả nhóm convert cùng; convert một linked copy (không phải source) sang type khác thì tự gỡ link của chính nó, origin và copy khác giữ nguyên.
- **Object / feature:** artwork/layer-duplicate-link-copy
- **Quan hệ với canon:** `ADD` (thay câu cũ của TIB-5211 ngày 2026-08-11 trong knowledge QA local, không phải canon publish)
- **Scope:** seller; portal (artwork editor AW2.0)
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA (Yến), 2026-09-04
- **Locator:** Knowledge QA local FACT-039 (QA-3345). Bổ trợ: TC-42 ✅ AI 2026-09-04 (bảng TC còn ghi Not run), TC-43 ✅ AI 2026-09-07, đều trước lần dev sửa convert 2026-09-08. Liên quan CLAIM-07 (convert Single-line sang Warp Text).
- **OQ:** NEEDS_CONFIRMATION — Rule convert link-source: convert origin giữ link và cả nhóm convert cùng, convert linked copy thì sao, có đúng sau lần dev sửa convert 2026-09-08 không (TC chạy trước lần sửa, bảng TC ghi Not run)? — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  Convert type khi có link — rule TIB-5211 ("convert link-source sang Warp Text thì gỡ link") ĐÃ CHẾT HẲN. User chốt 2026-09-04: "bỏ rule này, dup & link thì sẽ thành linked layer". ⇒ convert origin (đang có linked copy) sang type khác, hoặc convert Single-line Text origin sang Warp Text → giữ link, cả nhóm thành linked layer. NHƯNG convert một linked copy (không phải source) sang type khác thì vẫn unlink chính nó, origin + copy khác giữ nguyên (user chốt 2026-09-04, TC-43). (QA-3345)
  ```

### CLAIM-07

- **Statement:** Convert origin Single-line Text sang Warp Text thì cả nhóm link convert cùng và linked copy giữ link (lỗi cũ gỡ link đã được dev sửa).
- **Object / feature:** artwork/layer-duplicate-link-copy
- **Quan hệ với canon:** `ADD`
- **Scope:** seller; portal (artwork editor AW2.0), api (linked, type sau Save và Close)
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** AI (tick `[AI]`, không có tick `[QA]`), 2026-09-08
- **Locator:** QA-3345 TC-44 ✅ PASS 2026-09-08 staging (recheck sau dev fix; lần chạy 2026-09-04 ❌ ghi gỡ link). Knowledge QA local FACT-031.
- **Căn cứ expected:** KHÔNG CÓ (expected dựa vào lời QA FACT-029/FACT-039, không có câu PO/Dev nguyên văn; mô tả TIB-5265 của dev chỉ nói "same behavior as other supported layer types")
- **OQ:** NEEDS_CONFIRMATION — Convert origin Single-line Text sang Warp Text giữ link cho cả nhóm đã được dev sửa và có lên production chưa (TC-44 PASS trên staging, production không rõ)? — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  TC-44 QA-3345 — ĐÃ FIX (recheck 2026-09-08). Bug cũ (2026-09-04: convert Single-line origin → Warp Text gỡ link) đã được dev sửa. Recheck: convert `WT-Single` origin → Warp Text thì cả nhóm link convert cùng nhau, `WT-Single copy` giữ `linked=layer-795015` + đổi sang warp-text, origin → warp-text, 0 pageerror.
  ```

### CLAIM-08

- **Statement:** Color layer không có link sống: Duplicate & Link trên Color layer chạy y hệt Duplicate thường (copy `default_value` một lần, `customization_type` vẫn `normal`, không có field `linked`), sửa default trên origin sau đó không propagate sang copy, đó là đúng hành vi.
- **Object / feature:** artwork/layer-duplicate-link-copy
- **Quan hệ với canon:** `ADD` (bổ sung KB-045, Color đã nằm nhóm PLAIN_COPY; CHK-003)
- **Scope:** seller; portal (artwork editor AW2.0), api (field linked, customization_type)
- **Đã ship:** `UNKNOWN` (TIB-5241 lên production 2026-09-17 nhưng release-verification chỉ kiểm chỉ-đọc default value, không kiểm Duplicate & Link)
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** AI (tick `[AI]`, không có tick `[QA]`), 2026-09-11
- **Locator:** QA-3350 TC-39, TC-40 ✅ PASS 2026-09-11 staging (full-suite regression); TC-40 sửa từ ❌ sang ✅ ngày 2026-09-06 sau khi QA chốt luật. Knowledge QA local FACT-045 (TIB-5241). Ghi chú từ khuôn cũ: không suy rule này cho layer type khác Color; câu "chỉ áp dụng cho type đã xác nhận có cơ chế link" là bài học của QA, không phải spec.
- **Căn cứ expected:** KHÔNG CÓ (căn cứ là lời QA chốt 2026-09-06 trong chat, không PO/Dev)
- **OQ:** NEEDS_CONFIRMATION — Duplicate & Link trên Color layer là copy thường (không link sống) có đúng trên production không (TC PASS trên staging, release-verification không kiểm Duplicate & Link)? — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  Color layer KHÔNG support Duplicate & Link kiểu link sống — khác Word Cloud/Warp Text (user chốt 2026-09-06, QA-3350/TIB-5241). "Duplicate & Link" trên Color layer hoạt động y hệt Duplicate thường: copy giá trị `default_value` một lần tại thời điểm bấm, KHÔNG tạo link sống (không có field `linked`, `customization_type` vẫn "normal"). Sửa default trên origin SAU khi copy không propagate sang bản copy — đây là hành vi ĐÚNG, không phải bug.
  TC-39 (result 2026-09-11): ✅ AI — "Duplicate & Link" on a Color layer copies the value once, does NOT create a live link
  ```
