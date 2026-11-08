# Context Change Request: artwork-form-field-reorder-save — gộp từ 3 Proposal khuôn cũ

- **Product:** `teeinblue`
- **Object:** `artwork`
- **Ticket:** `TIB-5561, QA-3435, TIB-5299, TIB-5354`
- **Các khối có trong file:** `A`

## Mức độ gấp

`MEDIUM` — mức cao nhất trong các Proposal gốc (MEDIUM); lý do gốc theo từng Proposal:

- CBS-024: MEDIUM — canon thiếu coverage cho field output size và check 4 MP (gap); CLAIM-23 chỉ là quan sát phụ, CHK-01-007, CHK-01-014 đã ở NEEDS_CONFIRMATION nên chưa đủ HIGH.
- CBS-025: MEDIUM — QA chọn MEDIUM (phuongbb, 2026-11-01): modal Bulk edit là gap coverage; riêng CHK-005 đang chạy sai vì expect không có menu overflow.
- CBS-033: MEDIUM — Canon thiếu coverage cho tab Re-order của Form panel (gap); không có checklist hay automation đang publish nào kiểm hành vi này nên không có gì đang chạy sai.

# Khối A — Hành vi

### CLAIM-01

- **Statement:** Hai tab cùng sửa một layer: lần save sau thắng cho cả layer (thay đổi của tab kia mất, không cảnh báo, không 500)
- **Object / feature:** artwork/artwork-save-persist
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff; portal
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA (phuongbb) quan sát, 2026-10-27; không có Dev, PO xác nhận
- **Locator:** QA-3435 TC-34 2026-10-27; TC chỉ "record", expected cho phép cả last save wins lẫn values merged, không assert hành vi đúng. Liên quan artwork KB-052 (PUT ghi đè toàn bộ artwork). Chỉ là quan sát QA (CCR cũ: CBS-024 CLAIM-22)
- **Trích nguyên văn:**
  ```
  TC-34 | ✅ AI — concurrent edits: last save wins for the whole layer | tab A gem 1K → 2K saved; tab B (stale) provider flux 1200×800 saved → final JSON {flux, gpt 3840, gem 1K, flux 1200×800}; tab A's change lost, no warning, no 500 | Record (expected portal behaviour)
  ```

### CLAIM-02

- **Statement:** Known issue (server-side, không do Bulk edit): `PUT /api/artworks/{id}` nhận thay đổi trên layer `locked: true` (200, giá trị được lưu).
- **Object / feature:** artwork/artwork-save-persist
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner / staff (request lưu tự dựng); api
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA (phuongbb), 2026-10-30, không ai xác nhận
- **Locator:** QA-3419 — TC-37 ❌ trong `result_QA-3419_retest3-regression_2026-10-30.md` (cùng kết quả 2026-10-23, `result_QA-3419_security_2026-10-23.md`); bug draft BUG-07 (không file) | Link: https://qa-hub.ownego.com/test-cases?task=TIB-059 | Ngày, build: 2026-10-30 (lần quan sát cuối, build `assets/index.BMgdZMSW.js`, API `staging-api.teeinblue.com`) | KNOWN ISSUE, KHÔNG dùng làm expected (Phần 4.2). Chưa file bug riêng (BUG-07 chỉ là draft). Liên quan, không bị thay: KB-052, KB-055 (CCR cũ: CBS-025 CLAIM-25)
- **Trích nguyên văn:**
  ```
  TC-37 | ❌ AI — retest BUG-07: server still accepts a change to a locked layer | Captured the editor's own `PUT https://staging-api.teeinblue.com/api/artworks/[id]` (Save & Close), changed only L1 (layer-[id], locked true) form_label "L1" → "HACK37", sent once → **200**; GraphQL read-back L1 form_label "HACK37", locked true (03:58:58 UTC) | Same as 2026-10-23. Restored L1 "L1" (MCP). Server-side issue, not bulk edit (TC expected)
  ```

### CLAIM-03

- **Statement:** Known issue (server-side, có từ trước): Option title chứa ký tự NUL (U+0000) → artwork save trả HTTP 500 `{"message": "Server Error"}`, dữ liệu không đổi.
- **Object / feature:** artwork/artwork-save-persist
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner / staff; api
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA (phuongbb), 2026-10-23, không ai xác nhận
- **Locator:** QA-3419 — TC-39 trong `result_QA-3419_security_2026-10-23.md` (TC ⏭️, quy về bug có sẵn BUG-3347-NUL) | Link: https://qa-hub.ownego.com/test-cases?task=TIB-059 | Ngày, build: 2026-10-23 (build `assets/index.BqS1iTCG.js`, API staging) | KNOWN ISSUE, KHÔNG dùng làm expected (Phần 4.2). Chưa file bug riêng (BUG-08 chỉ là draft, TC đánh ⏭️ quy về BUG-3347-NUL). Bổ trợ: TC-36 / TC-38 ✅ 2026-10-23, giá trị dài, unicode và chuỗi injection khác đều lưu nguyên văn, 200 (CCR cũ: CBS-025 CLAIM-26)
- **Trích nguyên văn:**
  ```
  TC-39 | ⏭️ — skipped: not a Bulk edit bug (NUL → HTTP 500 in the artwork save API, existing BUG-3347-NUL) | Option title `a` + U+0000 + `b` on T1 + T2, one request → **500** `{"message": "Server Error"}` in 436 ms; data unchanged
  ```

### CLAIM-04

- **Statement:** Trong tab Re-order của Form panel, chọn nhiều dòng liền nhau (kể cả selection lớn vắt qua dòng thứ 10) rồi kéo thả thì đúng các dòng đã chọn di chuyển thành một khối ngay dưới dòng đích, giữ thứ tự tương đối, không dòng nào rớt lại, không dòng nào không chọn bị kéo theo, tổng số dòng không đổi.
- **Object / feature:** artwork/MỚI: form-field-reorder — Thuộc: tab Re-order của Form panel trong Artwork Editor (chọn dòng, kéo thả một hoặc nhiều dòng, hiển thị label trong danh sách); Không thuộc: chọn layer trên canvas (artwork/editor-layer-workspace, KB-043), kéo thả ở màn hình product-base, thứ tự field trên storefront.
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff, portal, api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (automation Playwright, kết quả [AI]), tick ✅ trên bảng TC Jira QA-3352, 2026-09-28
- **Locator:** QA-3352 (QA Hub task TIB-079) TC-03 "Large contiguous selection (≥10 rows)" trong result_QA-3352_auto_2026-09-28.md, staging, không ghi số build portal; chạy sau khi TIB-5354 Done 2026-09-23. Bổ trợ: ảnh chụp TC-16 (2026-09-18, ⏸️ chưa tick). Mỗi TC chạy 1 lượt PASS, chưa lặp 3–5 lần như dev gợi ý; bug gốc ngẫu nhiên theo index. (CCR cũ: CBS-033 CLAIM-01)
- **Căn cứ expected:** Jira TIB-5354 dev summary (tuanva, comment 2026-09-07, mô tả kỹ thuật dev tự viết): "Sau: cả cụm đã chọn được đưa đúng về vị trí thả, giữ nguyên thứ tự tương đối, không rớt dòng nào."
- **Trích nguyên văn:**
  ```
  Expected (TC-03): Saved order: F01,F02,F15,F16,F17,F18,F03,F04,…,F14,F19,F20. 12 rows moved as one block after F18, original order kept.
  TC-03 | ✅ AI — Large contiguous selection (≥10 rows) | selected after plain-click F03..F14 = ["F03","F04","F05","F06","F07","F08","F09","F10","F11","F12","F13","F14"]<br>before=F01,F02,F03,F04,F05,F06,F07,F08,F09,F10,F11,F12,F13,F14,F15,F16,F17,F18,F19,F20 saved=F01,F02,F15,F16,F17,F18,F03,F04,F05,F06,F07,F08,F09,F10,F11,F12,F13,F14,F19,F20
  Ngữ cảnh (dev summary, tuanva, Jira TIB-5354 comment 2026-09-07 — mô tả kỹ thuật dev tự viết, không phải nguồn của claim):
  - Sau: cả cụm đã chọn được đưa đúng về vị trí thả, giữ nguyên thứ tự tương đối, không rớt dòng nào.
  ```

### CLAIM-05

- **Statement:** Chọn các dòng không liền nhau (thứ tự click khác thứ tự danh sách) rồi kéo thì các dòng gom thành một khối liền tại điểm thả, xếp theo thứ tự gốc trong danh sách, không theo thứ tự click.
- **Object / feature:** artwork/MỚI: form-field-reorder — Thuộc: tab Re-order của Form panel trong Artwork Editor (chọn dòng, kéo thả một hoặc nhiều dòng, hiển thị label trong danh sách); Không thuộc: chọn layer trên canvas (artwork/editor-layer-workspace, KB-043), kéo thả ở màn hình product-base, thứ tự field trên storefront.
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff, portal, api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (automation Playwright, kết quả [AI]), tick ✅ trên bảng TC Jira QA-3352, 2026-09-28
- **Locator:** QA-3352 TC-04 "Non-contiguous multi-select, large count" trong result_QA-3352_auto_2026-09-28.md, staging, không ghi số build portal; chạy sau khi TIB-5354 Done 2026-09-23. Bổ trợ: ảnh chụp TC-05 (2026-09-18, ⏸️ chưa tick). Repro gốc của QA trên ticket (2026-08-25) ghi kỳ vọng "9-10-19..." cho selection click 9-10-19-11..18; chưa rõ đó là thứ tự click hay tên dòng, context builder nên đối chiếu. (CCR cũ: CBS-033 CLAIM-02)
- **Căn cứ expected:** KHÔNG CÓ
- **Trích nguyên văn:**
  ```
  Expected (TC-04): Below F07: F09, F10, F11, F12, …, F18, F19 — i.e. the 11 rows in original list order (not click order, so F19 sits after F18, not 3rd). No row from F01–F08 or F20 disturbed. Count 20.
  TC-04 | ✅ AI — Non-contiguous multi-select, large count (missed_cases 190) | click order=F09,F10,F19,F11,F12,F13,F14,F15,F16,F17,F18 selected(list order)=F09,F10,F11,F12,F13,F14,F15,F16,F17,F18,F19<br>saved=F01,F02,F03,F04,F05,F06,F07,F09,F10,F11,F12,F13,F14,F15,F16,F17,F18,F19,F08,F20
  ```

### CLAIM-06

- **Statement:** Trong tab Re-order, click thường (không giữ phím) vào dòng chưa chọn sẽ thêm dòng đó vào selection, nên nhiều click thường dựng được selection liền nhau hoặc rời rạc.
- **Object / feature:** artwork/MỚI: form-field-reorder — Thuộc: tab Re-order của Form panel trong Artwork Editor (chọn dòng, kéo thả một hoặc nhiều dòng, hiển thị label trong danh sách); Không thuộc: chọn layer trên canvas (artwork/editor-layer-workspace, KB-043), kéo thả ở màn hình product-base, thứ tự field trên storefront.
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff, portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (automation Playwright, kết quả [AI]), tick ✅ trên bảng TC Jira QA-3352, 2026-09-28
- **Locator:** QA-3352 TC-03 bước 1 và TC-04 bước 1 (assert selection sau các click thường) trong result_QA-3352_auto_2026-09-28.md, staging, không ghi số build portal; chạy sau khi TIB-5354 Done 2026-09-23. Không bị thay: KB-043 (selection layer trên canvas). (CCR cũ: CBS-033 CLAIM-03)
- **Căn cứ expected:** KHÔNG CÓ (cơ chế click thường đến từ ghi nhận "Correction 2026-09-09 (Slack)" trong RA, không rõ người xác nhận)
- **Trích nguyên văn:**
  ```
  TC-03 steps: 1. Plain-click F03 through F14 individually (12 rows selected)
  TC-03 evidence: selected after plain-click F03..F14 = ["F03","F04","F05","F06","F07","F08","F09","F10","F11","F12","F13","F14"]
  TC-04 steps: 1. Plain-click (no modifier) F09, F10, F19, F11, F12, F13, F14, F15, F16, F17, F18 in that order
  TC-04 evidence: click order=F09,F10,F19,F11,F12,F13,F14,F15,F16,F17,F18 selected(list order)=F09,F10,F11,F12,F13,F14,F15,F16,F17,F18,F19
  ```

### CLAIM-07

- **Statement:** Thứ tự sau khi thả trong tab Re-order được lưu bền: Save rồi mở lại editor thì tab Re-order hiện đúng thứ tự ngay sau khi thả, và thứ tự đọc qua GraphQL khớp.
- **Object / feature:** artwork/artwork-save-persist
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff, portal, api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (automation Playwright, kết quả [AI]), tick ✅ trên bảng TC Jira QA-3352, 2026-09-28
- **Locator:** QA-3352 TC-08 "Order survives Save + reload" trong result_QA-3352_auto_2026-09-28.md, staging, không ghi số build portal; chạy sau khi TIB-5354 Done 2026-09-23. Liên quan, không thay: KB-050, KB-053. (CCR cũ: CBS-033 CLAIM-04)
- **Căn cứ expected:** KHÔNG CÓ
- **Trích nguyên văn:**
  ```
  Expected (TC-08): On-screen order after reload == the order right after the drop in TC-01; GraphQL field order matches.
  TC-08 | ✅ AI — Order survives Save + reload | dom right after drop = F01,F02,F06,F07,F08,F09,F10,F11,F03,F04,F05,F12,F13,F14,F15<br>dom after reload = F01,F02,F06,F07,F08,F09,F10,F11,F03,F04,F05,F12,F13,F14,F15; graphql = F01,F02,F06,F07,F08,F09,F10,F11,F03,F04,F05,F12,F13,F14,F15
  ```

### CLAIM-08

- **Statement:** Thứ tự field của tab Re-order được lưu ở templates[].positions, còn templates[].layers không đổi thứ tự khi reorder.
- **Object / feature:** artwork/artwork-save-persist
- **Quan hệ với canon:** `UNKNOWN`
- **Scope:** store owner/staff, api, db
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA (phiên automation có AI hỗ trợ), chưa ai xác nhận, 2026-09-28
- **Locator:** Ghi chú của QA khi duyệt spec TC-03 (qna.json → backfill.why.TC-03, 2026-09-28), không assert riêng. KB-053 mô tả positions là "mảng layer id theo thứ tự render"; nếu positions thật ra là thứ tự form thì KB-053 cần làm rõ. Giữ cả hai phía, không đề xuất thay KB-053. Quan sát, không dùng làm expected. (CCR cũ: CBS-033 CLAIM-05)
- **Trích nguyên văn:**
  ```
  … rồi đọc lại thứ tự thật từ GraphQL positions (không phải templates.layers, cái đó không đổi khi reorder).
  Canon phía bên kia (KB-053): "positions (mảng layer id theo thứ tự render)".
  ```

### CLAIM-09

- **Statement:** Trong tab Re-order, click lại một dòng đang chọn thì bỏ chọn riêng dòng đó, click ra ngoài danh sách thì bỏ chọn tất cả.
- **Object / feature:** artwork/MỚI: form-field-reorder — Thuộc: tab Re-order của Form panel trong Artwork Editor (chọn dòng, kéo thả một hoặc nhiều dòng, hiển thị label trong danh sách); Không thuộc: chọn layer trên canvas (artwork/editor-layer-workspace, KB-043), kéo thả ở màn hình product-base, thứ tự field trên storefront.
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff, portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** Máy thao tác (visual-capture), chưa có người xác nhận, 2026-09-18
- **Locator:** Ảnh chụp tier B TC-22 trong result_QA-3352_B-visual_2026-09-18.md, ⏸️ chờ mắt nhìn, chưa ai tick. Quan sát, không dùng làm expected. (CCR cũ: CBS-033 CLAIM-06)
- **Trích nguyên văn:**
  ```
  b1: plain-click F05,F06,F07 — selected=F05,F06,F07 (3) · b2: click lại F06 — selected=F05,F07 (2, đúng expected) · b3: click ra ngoài list (tab header 'Re-order') — selected= (rỗng, đúng expected). Khớp expected cả 2 mốc.
  ```

### CLAIM-10

- **Statement:** Shift-click trong tab Re-order có hai quan sát ngược nhau: (a) chọn dòng đó và mọi dòng phía trên tới đầu danh sách, (b) chỉ chọn dải liền giữa hai lần click.
- **Object / feature:** artwork/MỚI: form-field-reorder — Thuộc: tab Re-order của Form panel trong Artwork Editor (chọn dòng, kéo thả một hoặc nhiều dòng, hiển thị label trong danh sách); Không thuộc: chọn layer trên canvas (artwork/editor-layer-workspace, KB-043), kéo thả ở màn hình product-base, thứ tự field trên storefront.
- **Quan hệ với canon:** `UNKNOWN`
- **Scope:** store owner/staff, portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** (a) ghi nhận Slack không rõ người xác nhận, 2026-09-09; (b) máy thao tác, chưa có người xác nhận, 2026-09-18
- **Locator:** (a) RA 01-analysis.md §6 và bảng TC Jira QA-3352 "Correction 2026-09-09 (Slack)", 2026-09-09, không rõ người xác nhận; (b) ảnh chụp TC-21 trong result_QA-3352_B-visual_2026-09-18.md, ⏸️ chưa tick. Không phía nào là đúng; không đề xuất check nào assert shift-click cho tới khi có người kiểm tay hoặc dev xác nhận. (CCR cũ: CBS-033 CLAIM-07)
- **Trích nguyên văn:**
  ```
  (a) Real mechanic: plain click toggles a row into/out of the selection (this is how both contiguous ranges and non-contiguous sets are built — no modifier key at all); shift-click is a separate, unbounded "select to top" action.
  (b) b1: plain-click F10 — selected=F10 · b2: shift-click F13 — selected=F10,F11,F12,F13 (CHỈ 4 hàng, KHÔNG phải F01..F13 như expected ghi) · b3: kéo cụm thả dưới F14 — after=F01..F09,F14,F10,F11,F12,F13,F15 (4 hàng dồn xuống đúng dưới F14, nguyên vẹn).
  ```

### CLAIM-11

- **Statement:** Giới hạn đã biết, không thuộc fix và không phải hành vi mong muốn: cụm cao (nhiều dòng) thả sát mép trên hoặc dưới có thể rơi về đầu hoặc cuối danh sách thay vì đúng chỗ con trỏ, cụm vẫn nguyên và đúng thứ tự.
- **Object / feature:** artwork/MỚI: form-field-reorder — Thuộc: tab Re-order của Form panel trong Artwork Editor (chọn dòng, kéo thả một hoặc nhiều dòng, hiển thị label trong danh sách); Không thuộc: chọn layer trên canvas (artwork/editor-layer-workspace, KB-043), kéo thả ở màn hình product-base, thứ tự field trên storefront.
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff, portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** Dev (tuanva), mô tả kỹ thuật dev tự viết, 2026-09-07; ảnh chụp do máy, chưa có người xác nhận, 2026-09-18
- **Locator:** Jira TIB-5354 dev summary (comment 2026-09-07) mục "Known limitations"; ảnh chụp TC-10, TC-11 trong result_QA-3352_B-visual_2026-09-18.md, ⏸️ chưa tick. Giới hạn của thư viện; việc QA chấm PASS là quyết định chấm test, không phải sign-off sản phẩm. Tên thư viện chỉ là chi tiết code tại 2026-09-07, không phải oracle. (CCR cũ: CBS-033 CLAIM-08)
- **Trích nguyên văn:**
  ```
  - Vị trí thả do thư viện SortableJS quyết định theo ghost của cả cụm; khi cụm cao (nhiều dòng) và thả sát mép trên/dưới, cụm có thể rơi về đầu/cuối danh sách. Đây là hành vi sẵn có của thư viện, không thuộc phạm vi fix này.
  TC-10: kéo, thả tại đỉnh danh sách (cuộn lên top trước) — DOM: F06..F16 rồi F01..F05,F17..F20 — đúng known-limitation, cụm 11 hàng nguyên vẹn đúng thứ tự, không mất hàng nào
  TC-11: cuộn xuống đáy rồi kéo thả tại điểm cuối cùng — DOM: F01,F02,F03,F15..F20,F04..F14 — đúng known-limitation, cụm 11 hàng dồn về cuối, nguyên vẹn đúng thứ tự
  ```

### CLAIM-12

- **Statement:** Kéo một dòng trong tab Re-order không đổi so với trước fix: dòng được thả nằm ngay dưới dòng đích.
- **Object / feature:** artwork/MỚI: form-field-reorder — Thuộc: tab Re-order của Form panel trong Artwork Editor (chọn dòng, kéo thả một hoặc nhiều dòng, hiển thị label trong danh sách); Không thuộc: chọn layer trên canvas (artwork/editor-layer-workspace, KB-043), kéo thả ở màn hình product-base, thứ tự field trên storefront.
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff, portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA (automation, [AI]), chưa có người kiểm tay, 2026-09-18 (PASS) và 2026-09-28 (FAIL)
- **Locator:** TC-07: result_QA-3352_trial-TC-07_auto_2026-09-18.md (✅ lượt chạy thử 2026-09-18) và ghi chú review spec trong qna.json (❌ lượt sau, ghi nhận 2026-09-28, ở bước thả xuống cuối); Jira không tick TC-07. Chi tiết "modal ~900px, ≥13 field phải cuộn" là giải thích của máy cho lượt FAIL, chưa xác nhận; cần người kiểm tay để phân biệt giới hạn widget với cách giả lập chuột. (CCR cũ: CBS-033 CLAIM-09)
- **Trích nguyên văn:**
  ```
  TC-07 | ✅ AI — Single-row drag unchanged (regression) | after drag F12 below F03 (dom) = F01,F02,F03,F12,F04,F05,F06,F07,F08,F09,F10,F11,F13,F14,F15<br>after wheel: {"scrollTop":0,"lastRow":[849,900],"modalBottom":900}<br>after drag F05 to bottom (dom) = F01,F02,F03,F12,F04,F06,F07,F08,F09,F10,F11,F13,F14,F15,F05
  TC-07 :x: FAIL đúng như mô tả — bước 2 "drag F05 drop to bottom" luôn dừng NGAY TRƯỚC hàng vốn cuối cùng (F15), không bao giờ vượt qua được nó, thử 3 cách nhắm tọa độ khác nhau đều vậy. Có thể là giới hạn thật của widget Re-order (không có khu thả sau hàng cuối) hoặc do cách giả lập chuột — cần người kiểm bằng tay thật trên browser để phân biệt.
  Ngữ cảnh (dev summary 2026-09-07): "portal override lại hàm cập nhật danh sách khi thả nên chỉ ảnh hưởng luồng multi-drag, kéo 1 dòng không đổi."
  ```

### CLAIM-13

- **Statement:** Label field chứa HTML hoặc script hiển thị dạng chữ thường trong tab Re-order, không tạo node script hay img thật, kể cả sau reorder, Save và reload.
- **Object / feature:** artwork/MỚI: form-field-reorder — Thuộc: tab Re-order của Form panel trong Artwork Editor (chọn dòng, kéo thả một hoặc nhiều dòng, hiển thị label trong danh sách); Không thuộc: chọn layer trên canvas (artwork/editor-layer-workspace, KB-043), kéo thả ở màn hình product-base, thứ tự field trên storefront.
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff, portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (automation Playwright, kết quả [AI]), Jira không tick TC này, 2026-09-17
- **Locator:** QA-3352 TC-18 "Stored XSS via a field label re-rendered in the Re-order tab + storefront" trong result_QA-3352_auto_2026-09-17.md, chạy lại ✅ trong result_QA-3352_lane2_auto_2026-09-18..21.md; staging, không ghi số build. Chỉ bước 1-3 (portal); bước storefront chưa chạy vì thiếu campaign đã publish. (CCR cũ: CBS-033 CLAIM-10)
- **Căn cứ expected:** KHÔNG CÓ
- **Trích nguyên văn:**
  ```
  TC-18 | ✅ AI — Stored XSS via a field label re-rendered in the Re-order tab + storefront | label "<script>console.log('xss-test-"… → row#5, node <script>/<img> thật = false<br>label "\"><img src=x onerror=console.l"… → row#6, node <script>/<img> thật = false<br>saved order sau reorder+save = ["F01","F02","F03","F04","\"><img src=x on","<script>console"] | CHƯA test bước 4-5 (storefront form + console trên storefront) — thiếu fixture campaign đã publish, cùng blocker với TC-09.
  ```

### CLAIM-14

- **Statement:** Label field dài 5000 ký tự và label có ký tự điều khiển được tạo không lỗi 500, được lưu nguyên độ dài, reorder và Save vẫn chạy, và sau reload danh sách render đủ dòng.
- **Object / feature:** artwork/MỚI: form-field-reorder — Thuộc: tab Re-order của Form panel trong Artwork Editor (chọn dòng, kéo thả một hoặc nhiều dòng, hiển thị label trong danh sách); Không thuộc: chọn layer trên canvas (artwork/editor-layer-workspace, KB-043), kéo thả ở màn hình product-base, thứ tự field trên storefront.
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff, portal, api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (automation Playwright, kết quả [AI]), Jira không tick TC này, 2026-09-17
- **Locator:** QA-3352 TC-20 "Long / control-char field label" trong result_QA-3352_auto_2026-09-17.md; staging, không ghi số build. Con số 5000 chỉ là dữ liệu của một lượt chạy, không phải giá trị chuẩn. (CCR cũ: CBS-033 CLAIM-11)
- **Căn cứ expected:** KHÔNG CÓ
- **Trích nguyên văn:**
  ```
  Expected (TC-20): No crash, no 500; the label is stored/truncated per the field's own limit; reorder still works; list still renders.
  TC-20 | ✅ AI — Long / control-char field label | label 5000-char → row#3; label control-char → row#4 (creation không 500, xem không throw ở bước trên)<br>saved label lengths sau reorder+save = [3,3,12,5000]<br>sau reload, số hàng field render = 4
  ```

### CLAIM-15

- **Statement:** Fix của TIB-5354 chỉ nằm trong portal (tab Re-order, ghi đè hàm cập nhật danh sách khi thả nên chỉ ảnh hưởng multi-drag); API và SDK không đổi, và fork vue-draggable upstream chưa được sửa.
- **Object / feature:** artwork/MỚI: form-field-reorder — Thuộc: tab Re-order của Form panel trong Artwork Editor (chọn dòng, kéo thả một hoặc nhiều dòng, hiển thị label trong danh sách); Không thuộc: chọn layer trên canvas (artwork/editor-layer-workspace, KB-043), kéo thả ở màn hình product-base, thứ tự field trên storefront.
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff, portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** Dev (tuanva), mô tả kỹ thuật dev tự viết, 2026-09-07
- **Locator:** Jira TIB-5354 dev summary (comment 2026-09-07) mục "Code changes" và "Known limitations"; PR teeinblue-portal #3613. Danh sách kéo thả nhiều dòng khác dùng cùng fork: chưa rõ, context builder tự đánh giá. Tên class, thư viện là chi tiết code tại 2026-09-07, không phải oracle. (CCR cũ: CBS-033 CLAIM-12)
- **Trích nguyên văn:**
  ```
  API
  - Không thay đổi
  SDK
  - Không thay đổi
  Portal
  - Artwork editor > panel Form > tab Re-order (danh sách kéo thả thứ tự field của form): sửa lỗi khi chọn nhiều dòng rồi kéo cả cụm sang vị trí khác.
  - Nguyên nhân: thư viện kéo thả (fork vue-draggable, chế độ multi-drag) sắp xếp index theo chuỗi thay vì theo số; portal override lại hàm cập nhật danh sách khi thả nên chỉ ảnh hưởng luồng multi-drag, kéo 1 dòng không đổi.
  - Chưa sửa ở upstream fork vue-draggable (không có quyền), fix nằm trong portal.
  ```
