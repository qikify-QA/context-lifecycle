# Context Change Request (CCR) — template

Dùng khi canonical QA context (Product KB / Feature Profile / Checklist) của một product **thiếu, sai, cũ hoặc mâu thuẫn** với thay đổi đã/sắp ship.

## Cách gửi

Quy trình thật thường gồm 2 bước ở **2 board khác nhau** — rất dễ nhầm, và phụ lục product là nơi nói chính xác cho product đó:

1. **Soạn + Submit.** Điền file này (giữ nguyên Markdown, đừng đổi cấu trúc `# Phần N`), đính kèm vào task liên quan (field CCR / attachment), bấm Submit. Submit thường tạo đồng thời **1 Proposal** trên board context và **1 Task** trên agent board của repo context-builder.
2. **Trigger xử lý.** Kéo status của **Task trên agent board** từ `Todo` sang `In Progress`.

> **Kéo card Proposal trên board context có thể KHÔNG trigger gì** — ở một số hệ thống tính năng đổi status thủ công trên board đó chưa hoạt động. Xem phụ lục product để biết kênh nào là kênh thật. Nhiều CCR cùng lúc → kéo **từng cái một**.
>
> Việc submit là hành động thủ công của con người — **skill `create-ccr` không tự submit thay bạn.**

Hệ thống nhận CCR thường **không đọc hiểu nội dung** — chỉ kiểm tra thô là không còn placeholder dạng ba dấu nhỏ hơn … ba dấu lớn hơn nào sót lại.

**Tiêu đề task:** `[CCR] <loại> — <object> — <tóm tắt 1 dòng>`

---

## Nhãn field

| Nhãn | Nghĩa |
|---|---|
| `[AGENT]` | Skill/agent tự điền được từ ticket + canon đã tra. Người gửi chỉ soát lại. |
| `[BẠN]` | Cần phán đoán của con người — skill không tự quyết, phải hỏi người gửi. |

Những thứ **không hỏi người gửi**: context builder được phép mutate gì trên môi trường thật, dùng account nào để explore, có capture network/DB không, dùng environment nào để verify. Đó là chính sách của bên sở hữu môi trường (xem phụ lục product), không phải việc của người gửi CCR.

**Không có thông tin thì ghi "không rõ".** Một chỗ trống được khai báo thì xử lý được; một chỗ trống bị lấp bằng phỏng đoán sẽ lan vào KB và vào mọi test case sinh ra sau đó.

---

# Phần 0 — Cần mấy CCR? `[BẠN xác nhận, AGENT đề xuất]`

Đơn vị của một CCR là **một thứ được giải quyết độc lập**, không phải một ticket riêng lẻ. Nhiều ticket gộp được thành 1 CCR nếu cả 5 điều dưới đây giống nhau; tách nếu **ít nhất một** điều khác:

| | Câu hỏi |
|---|---|
| **Product** | Mọi claim thuộc cùng một product? Khác product → **bắt buộc tách**, không ngoại lệ |
| Người gỡ | Context builder tự explore/đọc tài liệu được, hay cần dev trả lời / PO quyết / chủ taxonomy quyết? |
| Điều kiện mở khoá | Đúng **một** thông tin hoặc **một** việc nào làm nó xong? |
| Vòng đời | Nếu request này bị huỷ, các ticket còn lại còn giá trị riêng không? |
| Artifact đích | Cùng KB của một object cụ thể, hay đụng tới `_registry.json`/taxonomy chung? |

Đừng gộp quá tay: nhét "cần dev trả lời" chung với "chỉ cần đọc lại tài liệu" sẽ khiến phần làm được ngay phải nằm chờ dev vô cớ.

---

# Phần 1 — Thấy gì

**Loại request** `[AGENT đề xuất, BẠN duyệt]`

`NEW_FEATURE` · `BEHAVIOR_CHANGE` · `PROFILE_GAP` · `CHECKLIST_GAP` · `STALE_CONTEXT` · `CONFLICT` · `CANON_HYGIENE`

**Loại:** `BEHAVIOR_CHANGE`

**Object** `[AGENT]` — lấy từ `_registry.json` (hoặc tương đương) của knowledge base đích, nếu có quyền truy cập

- Product: `teeinblue`
- Object: `artwork` · Feature: `text-multi-stroke` (key lấy từ results của Proposal CBS-007 và danh sách features của artwork trong manifest.json; thư mục features/text-multi-stroke chưa có trong bản clone) — riêng CLAIM-19 thuộc `artwork-save-persist`
- Không khớp object nào trong registry, hoặc không tra được registry? Mô tả bằng lời. **Đừng bịa một `object_key` không có thật.**

**Quan sát được** `[AGENT]` — tổng hợp từ (các) ticket, KHÔNG phải suy đoán

```
TIB-5580 — Support multiple stroke layers on a paragraph text layer (Story, khách EVL; tạo 2026-10-15;
giao QA 2026-10-16 11:00 (Code Review → QA Review); QA chuyển Passed + Resolution Done 2026-10-22 10:33;
Done 2026-10-22 14:47; 7 PR MERGED, cập nhật PR cuối 2026-10-22 14:31; Jira không có Fix Version)

- Description (PO, sửa cuối 2026-10-15): mở rộng multi-stroke của TIB-5417 sang paragraph cùng model
  (danh sách lớp, màu + width riêng, xếp từ mép glyph ra ngoài, width cộng dồn khi render); gỡ lỗi render
  khiến paragraph bị loại khỏi TIB-5417 (PNG vẽ stroke rồi text theo từng dòng, SVG vẽ text rồi stroke theo
  từng dòng); "The preview is the source of truth. Should check both PNG and SVG output."; chỉ round stroke.
- Comment dev chauptm id 54782 (2026-10-16, "Context / logic changes"): paragraph có stroke_layers như text
  (innermost first, mỗi width là độ dày riêng, cộng dồn, tối đa 3); cả 3 renderer vẽ từng lớp qua mọi dòng,
  lớp ngoài trước, rồi fill mọi dòng; API có 2 đường vẽ (tổng width ≤ ngưỡng / cũ), padding canvas theo tổng
  width; linked paragraph scale mọi lớp theo tỉ lệ width; GlobalTemplateMerger giữ stroke_layers là field
  local, spiral/shape text không có; portal hiện editor multi-stroke (tối đa 3 row) cho paragraph new-schema,
  Custom Shape và paragraph legacy-schema giữ 1 stroke; paragraph mới tạo có 1 entry stroke_layers,
  stroke_color/stroke_width mirror lớp trong cùng; convert text ↔ paragraph giữ stack, sang loại khác gộp về
  lớp trong cùng; vectorize áp shadow 1 lần cho cả paragraph thay vì từng dòng.
  PR: api #4016, portal #3820, sdk #2124, vectorize #76.
- File RA analysis_TIB-5580.md (vòng 3, 2026-10-21): C5–C9, R10–R16 từ đáp án Slack Q1–Q9 ngày 2026-10-21
  (thread ts 1792556100.094559) — shadow 3 renderer không được lệch (R10), API PNG đã đổi shadow giống
  vectorize (R14), không nghiệm thu lại TIB-5472 (C6), template paragraph EVL là new-schema (C8),
  multi-select Text + Paragraph ngoài phạm vi (C7), "giống preview" so bằng mắt, QA tự phân xử (R13, R15),
  opacity < 1 vùng chồng giữa 2 dòng là Fail (R16), portal API có validate stroke_layers (Section 5, Q6).
- Lượt test Testlane TIB-220 (agent test-executor, staging instance 520, 2026-10-21 → 2026-10-22, report
  artifact 5vvWKMFBHY1sQjE9ERB7vc): theo actualResult 13 PASS / 1 Fail (TC-TIB-6338 → BUG-357) / 13 Blocked.
  Testlane status đọc lại ngày 2026-10-30: 26 passed + 1 skipped — 13 case status passed nhưng actualResult
  ghi Blocked hoặc chỉ còn link order (6313, 6319, 6320, 6321, 6322, 6327, 6328, 6329, 6332, 6333, 6334,
  6335, 6336). CCR này tin actualResult, không tin status.
- Proposal CBS-007 (bản khuôn cũ của CCR này) đã publish artwork v6 ngày 2026-10-26: 16/19 claim nạp dạng
  OBSERVED_CURRENT/LOW; CLAIM-10, 15, 16 là S0. Bản này giữ nguyên số CLAIM-01..19 của bản cũ.
```

- Nguồn: `tổng hợp từ 1 ticket Jira đã Done + file RA + 1 lượt test agent trên staging (actualResult từng case); KHÔNG PHẢI quan sát trên production`
- Thấy mấy lần / xác nhận trực tiếp mấy lần: `1 lượt chạy agent trên staging (2026-10-21 → 2026-10-22), 13 case có actualResult PASS; 0 lần trên production; người soạn CCR không tự verify lại (0)`

**Thử gì mà KHÔNG tái hiện / chưa thử gì** `[AGENT + BẠN]`

```
- Chưa có gì quan sát trên production; Jira không có Fix Version / ngày release.
- Chưa chạy lại case nào sau khi 7 PR merge (2026-10-22 14:31) và ticket Done — mọi kết quả là build staging
  ngày 2026-10-21/22, trước merge.
- Storefront preview (SDK) chưa kiểm được: staging lúc chạy là app-v2.js VERSION 20260929, chưa có PR sdk
  #2124 — storefront chỉ vẽ 1 vành stroke cho paragraph và không có shadow. Mọi claim "giống preview
  storefront" chưa verify.
- SVG (vectorize) chưa kiểm ở bất kỳ case nào: không tìm được đường tải SVG trên portal staging (order detail,
  Bulk Fulfill, thumbnail). CLAIM-06, 07, 17 vì vậy chỉ claim phần editor / PNG / storefront đã kiểm.
- Global template (TC-TIB-6328): fixture #5186 dựng qua API không render trong Artwork Editor.
- Paragraph legacy-schema (TC-TIB-6332): PUT /api/artworks/5187 trả 500, không Save được.
- Template paragraph thật của EVL (TC-TIB-6336): không có bản copy để chạy.
- Validate stroke_layers ở portal API (PUT /api/artworks/{id}, entry thứ 4 / width không phải số trên
  paragraph): chưa có case gửi thẳng; chỉ kiểm nút Add bị disable trên UI.
- PSD import paragraph nhiều stroke: không có case. Multi-select Text + Paragraph: ngoài phạm vi (C7).
- Vùng stroke 2 dòng giao nhau thật sự (stroke ≥ 30px) chưa dựng; TC-TIB-6333 dùng stroke 10px nên 2 dòng
  không giao nhau.
- ⏳ CHỜ BẠN: bạn đã tự thử gì mà kết quả test không ghi? Bạn có tự đổi 13 case Blocked nêu trên sang passed
  không, có chạy tay case nào trong đó không? Có chạy lại gì sau khi PR merge 2026-10-22 (SDK mới lên staging)
  không?
```

## Phần 1a — Phạm vi thay đổi & ảnh hưởng ước tính `[AGENT]` — BẮT BUỘC

> Mục này khác "Quan sát được" ở trên: nó không mô tả CÁI GÌ đã xảy ra, mà là **CẦN LÀM GÌ TIẾP**. Agent nhận CCR đọc xong phải biết ngay việc cần làm và phạm vi ảnh hưởng dây chuyền — không phải tự dò lại từ ticket gốc.

Một dòng cho MỖI claim/ticket riêng biệt trong "Quan sát được":

| Claim ID | Thay đổi / claim | Surface liên quan | Nguồn & độ mạnh | Object/feature/checklist bị ảnh hưởng | Quan hệ với canon |
|---|---|---|---|---|---|
| `CLAIM-01` | TIB-5580 — Paragraph new-schema có stack editor tối đa 3 lớp stroke; đủ 3 row thì nút Add stroke bị disable; Save lưu stroke_layers đúng 3 entry, đúng thứ tự | portal (Artwork Editor 2.0 → popover Stroke) · api (PUT /api/artworks/{id}) | `test_case` — PASS TC-TIB-6312 2026-10-21 staging [AI]; TC-TIB-6314 2026-10-21 staging [AI]; TC-TIB-6315 2026-10-21 staging [AI] — build: staging @ 2026-10-21 (giờ không rõ) — sau lần TIB-5580 giao QA cuối (2026-10-16 11:00); Jira không có Fix Version; PR merged + Done 2026-10-22; build hash: không rõ (QA không có quyền repo) | artwork/text-multi-stroke (KB-129..KB-144, checklist text-multi-stroke, v6) | `UNKNOWN` |
| `CLAIM-02` | TIB-5580 — Width mỗi lớp là độ dày riêng của vòng đó, cộng dồn khi render; row 1 sát glyph, xếp ra ngoài (kiểm trên preview editor) | portal (preview editor) | `test_case` — PASS TC-TIB-6316 2026-10-21 staging [AI]; TC-TIB-6314 2026-10-21 staging [AI] — build: staging @ 2026-10-21 (giờ không rõ) — sau lần TIB-5580 giao QA cuối (2026-10-16 11:00); Jira không có Fix Version; PR merged + Done 2026-10-22; build hash: không rõ (QA không có quyền repo) | artwork/text-multi-stroke | `UNKNOWN` |
| `CLAIM-03` | TIB-5580 — Xoá lớp giữa, kéo đổi thứ tự lớp, Save + reload giữ đúng dữ liệu; stroke_color/stroke_width mirror lớp trong cùng sau đổi thứ tự | portal · api (PUT /api/artworks/{id}) | `test_case` — PASS TC-TIB-6317 2026-10-21 staging [AI] — build: staging @ 2026-10-21 (giờ không rõ) — sau lần TIB-5580 giao QA cuối (2026-10-16 11:00); Jira không có Fix Version; PR merged + Done 2026-10-22; build hash: không rõ (QA không có quyền repo) | artwork/text-multi-stroke | `UNKNOWN` |
| `CLAIM-04` | TIB-5580 — Paragraph mới tạo: Enable stroke mặc định tắt, bật lên có đúng 1 row; Save lưu 1 entry stroke_layers; stroke_color/stroke_width luôn mirror lớp trong cùng (không theo lớp ngoài) | portal · api | `test_case` — PASS TC-TIB-6318 2026-10-21 staging [AI] — build: staging @ 2026-10-21 (giờ không rõ) — sau lần TIB-5580 giao QA cuối (2026-10-16 11:00); Jira không có Fix Version; PR merged + Done 2026-10-22; build hash: không rõ (QA không có quyền repo) | artwork/text-multi-stroke | `UNKNOWN` |
| `CLAIM-05` | TIB-5580 — Thứ tự vẽ ở cả 3 renderer: từng lớp stroke vẽ qua mọi dòng, lớp ngoài trước, fill mọi dòng sau cùng; PNG (API, 2 đường ≤ 15px / > 15px) và SVG (vectorize) giống preview | storefront (SDK preview) · api (PNG order design) · vectorize (SVG) | `KHÔNG CÓ NGUỒN` — TC-TIB-6319 và TC-TIB-6322 Blocked (SDK staging chưa có code, không tải được SVG); TC-TIB-6320 và TC-TIB-6321 actualResult chỉ còn link order, Testlane status passed không đáng tin | artwork/text-multi-stroke · sdk storefront render (chưa rõ feature, cần agent tự đánh giá) | `UNKNOWN` |
| `CLAIM-06` | TIB-5580 — Stroke paragraph chỉ có kiểu round: góc trong và ngoài của mọi lớp bo tròn ở preview editor và PNG order; SDK preview dùng stroke-linejoin round (SVG vectorize chưa kiểm) | portal (preview editor) · api (PNG) · storefront | `test_case` — PASS TC-TIB-6323 2026-10-22 staging [AI] — build: staging @ 2026-10-22 (giờ không rõ) — sau lần TIB-5580 giao QA cuối (2026-10-16 11:00); Jira không có Fix Version; PR merged + Done 2026-10-22; build hash: không rõ (QA không có quyền repo) | artwork/text-multi-stroke | `UNKNOWN` |
| `CLAIM-07` | TIB-5580 — Tắt stroke: preview editor, SVG preview storefront và PNG order không có viền; stroke_enabled=false nhưng stroke_layers giữ nguyên; bật lại thì các lớp cũ quay lại đúng thứ tự (SVG vectorize chưa kiểm) | portal · api (PNG) · storefront | `test_case` — PASS TC-TIB-6324 2026-10-21 staging [AI] — build: staging @ 2026-10-21 (giờ không rõ) — sau lần TIB-5580 giao QA cuối (2026-10-16 11:00); Jira không có Fix Version; PR merged + Done 2026-10-22; build hash: không rõ (QA không có quyền repo) | artwork/text-multi-stroke | `UNKNOWN` |
| `CLAIM-08` | TIB-5580 — Convert paragraph ↔ single-line text giữ nguyên stack 3 lớp; convert paragraph sang Curve Text / Warp Text chỉ giữ lớp trong cùng (stroke_color/stroke_width), xoá stroke_layers | portal (convert layer) · api | `test_case` — PASS TC-TIB-6325 2026-10-21 staging [AI]; TC-TIB-6326 2026-10-21 staging [AI] — build: staging @ 2026-10-21 (giờ không rõ) — sau lần TIB-5580 giao QA cuối (2026-10-16 11:00); Jira không có Fix Version; PR merged + Done 2026-10-22; build hash: không rõ (QA không có quyền repo) | artwork/text-multi-stroke (rule convert; OQ-artwork-107) · CCR TIB-5417 (text) nói convert text → paragraph gộp lớp, nay đã đổi | `UNKNOWN` |
| `CLAIM-09` | TIB-5580 — Linked paragraph mang cùng stack của paragraph gốc; mọi lớp stroke scale theo tỉ lệ width | portal · storefront · api (PNG) | `KHÔNG CÓ NGUỒN` — TC-TIB-6327 Blocked: editor/API đạt nhưng storefront SDK staging chưa có code | artwork/text-multi-stroke · artwork/layer-duplicate-link-copy (chưa rõ, cần agent tự đánh giá) | `UNKNOWN` |
| `CLAIM-10` | TIB-5580 — Global template: stroke_layers là field local của paragraph (override theo product được giữ); spiral / shape text vẫn 1 stroke | portal (global template) · api | `KHÔNG CÓ NGUỒN` — TC-TIB-6328 Blocked: fixture #5186 dựng qua API không render trong Artwork Editor; chỉ có mô tả dev comment 54782 | artwork/text-multi-stroke · artwork/artwork-template-management (chưa rõ, cần agent tự đánh giá); OQ-artwork-117 | `ADD` |
| `CLAIM-11` | TIB-5580 — Autoscale paragraph nhiều dòng với 3 lớp stroke dày: chữ thu nhỏ, vành ngoài không bị cắt mép | portal · storefront · api (PNG) | `KHÔNG CÓ NGUỒN` — TC-TIB-6329 Blocked: PNG đạt, storefront SDK chưa có code, SVG không tải được | artwork/text-multi-stroke | `UNKNOWN` |
| `CLAIM-12` | TIB-5580 — Paragraph chỉ có stroke legacy (không có stroke_layers) giữ nguyên hình trong editor; mở popover thì lift thành stack 1 row không đổi hình; Save ghi stroke_layers 1 entry, cặp cũ giữ nguyên | portal (editor) · api | `test_case` — PASS TC-TIB-6330 2026-10-21 staging [AI] — build: staging @ 2026-10-21 (giờ không rõ) — sau lần TIB-5580 giao QA cuối (2026-10-16 11:00); Jira không có Fix Version; PR merged + Done 2026-10-22; build hash: không rõ (QA không có quyền repo) | artwork/text-multi-stroke | `UNKNOWN` |
| `CLAIM-13` | TIB-5580 — Custom Shape (shape-text) giữ popover 1 stroke, không có Add stroke; Save chỉ lưu stroke_color/stroke_width, không có stroke_layers | portal · api | `test_case` — PASS TC-TIB-6331 2026-10-21 staging [AI] — build: staging @ 2026-10-21 (giờ không rõ) — sau lần TIB-5580 giao QA cuối (2026-10-16 11:00); Jira không có Fix Version; PR merged + Done 2026-10-22; build hash: không rõ (QA không có quyền repo) | artwork/text-multi-stroke · artwork/layer-config-text | `UNKNOWN` |
| `CLAIM-14` | TIB-5580 — Paragraph legacy-schema (AW 1.0) giữ popover 1 stroke, không có stack editor | portal · api | `KHÔNG CÓ NGUỒN` — TC-TIB-6332 Blocked: phần UI đạt nhưng PUT /api/artworks/5187 trả 500 nên không kiểm được bước Save | artwork/text-multi-stroke | `UNKNOWN` |
| `CLAIM-15` | TIB-5580 — Shadow paragraph áp 1 lần cho cả khối ở vectorize (dev comment) và API PNG (R14); preview / PNG / SVG không được lệch shadow (R10) | storefront (SDK) · api (PNG) · vectorize (SVG) | `KHÔNG CÓ NGUỒN` — TC-TIB-6313 và TC-TIB-6335 Blocked (SDK staging chưa có code, không tải được SVG); editor ↔ PNG khớp chỉ là một phần case | artwork/text-multi-stroke · artwork/layer-print-effects (shadow paragraph TIB-5472, chưa rõ, cần agent tự đánh giá); OQ-artwork-118. Có thể làm SAI mô tả shadow per-line của TIB-5472 | `ADD` |
| `CLAIM-16` | TIB-5580 — Fill opacity < 1: bleed trong phạm vi một dòng là Known Issue (R12); vùng stroke 2 dòng chồng nhau bị đậm gấp đôi là Fail (R16) | api (PNG) · vectorize (SVG) · storefront | `KHÔNG CÓ NGUỒN` — TC-TIB-6333 và TC-TIB-6334 Blocked (không tải được SVG, SDK chưa có code); quy tắc chỉ từ đáp án Slack | artwork/text-multi-stroke; OQ-artwork-119 | `ADD` |
| `CLAIM-17` | TIB-5580 — Regression: multi-stroke text 1 dòng (TIB-5417) không đổi ở editor, preview storefront và PNG order (SVG vectorize chưa kiểm) | portal · storefront · api (PNG) | `test_case` — PASS TC-TIB-6337 2026-10-21 staging [AI] — build: staging @ 2026-10-21 (giờ không rõ) — sau lần TIB-5580 giao QA cuối (2026-10-16 11:00); Jira không có Fix Version; PR merged + Done 2026-10-22; build hash: không rõ (QA không có quyền repo) | artwork/text-multi-stroke (phần text) | `UNKNOWN` |
| `CLAIM-18` | TIB-5580 — Buyer chèn stroke_layers vượt giới hạn (4 entry, width "abc") vào POST customization: API trả 201 và echo nguyên payload chèn; localStorage và PNG order không bị ảnh hưởng | api (POST /api/merchant/shopify/customization) · storefront (localStorage) · api (PNG order) | `KHÔNG CÓ NGUỒN` — case TC-TIB-6338 failed, BUG-357; chưa ai phân xử nên từ chối hay bỏ qua (OQ-artwork-111) | artwork/text-multi-stroke; context local artwork.md dòng "A buyer cannot inject strokes" nói ngược với RA | `UNKNOWN` |
| `CLAIM-19` | Bản copy AW 1.0 (#5187, duplicate của #2164): PUT /api/artworks/5187 trả 500 kể cả khi Save không đổi gì — ngược với câu "Saving it once rewrites it to the new schema" trong context local | portal · api (PUT /api/artworks/{id}) | `KHÔNG CÓ NGUỒN` — TC-TIB-6332 actualResult ghi 500, chưa rõ nguyên nhân, chưa có bug | artwork/artwork-save-persist (KB-145, CHK-018..CHK-020 v6 theo results CBS-007) | `UNKNOWN` |

`Claim ID` đánh số `CLAIM-01`, `CLAIM-02`… trong phạm vi **file này**. Cố ý không nhúng mã Proposal: lúc soạn, mã đó chưa tồn tại (hệ thống cấp lúc Submit). Agent xử lý CCR sẽ tự namespace lại.

**Cột "Nguồn & độ mạnh" quyết định claim này có được nạp thẳng vào KB hay không** (contract §12.3a). Đúng 1 trong 5, kèm trích dẫn cụ thể — không phải diễn giải:

| Trạng thái | Yêu cầu |
|---|---|
| `dev_doc` | Tài liệu dev sinh từ source code / changelog / release note / PR-commit diff: tên tài liệu + version + **ngày viết** + trích nguyên văn |
| `spec_doc` | Spec/PRD chính thức: tên + version/ngày + mục cụ thể |
| `po_dev_confirm` | Quote **nguyên văn** comment + link, xác nhận đúng hành vi đang claim. Comment mơ hồ ("chắc ổn", "để check sau") không tính |
| `test_case` | id test case + PASS + ngày chạy + build ≥ bản có thay đổi, và test case phải kiểm **đúng** hành vi đang claim — không phải test case liên quan chung chung |
| `KHÔNG CÓ NGUỒN` | Chỉ có ảnh/HAR/capture tự chụp, hoặc chỉ là mô tả/comment chưa đủ điều kiện ở trên |

Ghi `KHÔNG CÓ NGUỒN` **không làm claim bị loại**. Nó vẫn được nạp vào KB, nhưng dưới dạng "đã quan sát thấy" với độ tin cậy thấp kèm một open question — **và không được dùng làm expected result** cho test. Đừng tự nâng lên trạng thái mạnh hơn vì bạn tin chắc hành vi đó đúng; ảnh chụp tay không thay được test case hay PO/Dev confirm.

Hai lưu ý thêm:

- Claim có khả năng làm **SAI** một checklist/automation đang publish (không chỉ THIẾU coverage) → nêu rõ `checklist_id`/mã check nghi ngờ. Đây là tín hiệu ưu tiên cao hơn "gap" thông thường, vì automation có thể đang chạy sai ngay lúc này.
- Nghi ngờ ranh giới object hiện tại không còn hợp lý → nêu Ý TƯỞNG ở đây, nhưng **không tự quyết tên `object_key` mới**; quyết định thuộc về agent xử lý CCR khi build KB thật.
- Không chắc surface nào bị ảnh hưởng → ghi "chưa rõ, cần agent tự đánh giá", **không bỏ trống** (bỏ trống khiến agent tưởng không cần kiểm thêm).

## Phần 1b — Đề xuất địa chỉ trong KB `[AGENT đề xuất, BẠN duyệt]`

Để agent nhận CCR dựng được Feature Profile/Checklist mà không phải mở lại nguồn gốc:

| Claim ID | object_key | feature_key | scope.role | scope.surface | kb_id bị ảnh hưởng |
|---|---|---|---|---|---|
| `CLAIM-01` | `artwork` | `text-multi-stroke` | owner/staff (merchant soạn artwork) | portal · api | KB-129..KB-144 (v6, chưa rõ item nào — clone chưa có) |
| `CLAIM-02` | `artwork` | `text-multi-stroke` | owner/staff | portal | KB-129..KB-144 (v6, chưa rõ item nào) |
| `CLAIM-03` | `artwork` | `text-multi-stroke` | owner/staff | portal · api | KB-129..KB-144 (v6, chưa rõ item nào) |
| `CLAIM-04` | `artwork` | `text-multi-stroke` | owner/staff | portal · api | KB-129..KB-144 (v6, chưa rõ item nào) |
| `CLAIM-05` | `artwork` | `text-multi-stroke` | owner/staff + guest buyer (render storefront/order) | storefront · api | KB-129..KB-144 (v6, chưa rõ item nào) |
| `CLAIM-06` | `artwork` | `text-multi-stroke` | owner/staff + guest buyer | portal · api · storefront | KB-129..KB-144 (v6, chưa rõ item nào) |
| `CLAIM-07` | `artwork` | `text-multi-stroke` | owner/staff + guest buyer | portal · api · storefront | KB-129..KB-144 (v6, chưa rõ item nào) |
| `CLAIM-08` | `artwork` | `text-multi-stroke` | owner/staff | portal · api | KB-129..KB-144 (v6, chưa rõ item nào) |
| `CLAIM-09` | `artwork` | `text-multi-stroke` | owner/staff + guest buyer | portal · storefront · api | KB-129..KB-144 (v6, chưa rõ item nào) |
| `CLAIM-10` | `artwork` | `text-multi-stroke` | owner/staff | portal · api | không có (S0, chưa nạp) |
| `CLAIM-11` | `artwork` | `text-multi-stroke` | owner/staff + guest buyer | storefront · api | KB-129..KB-144 (v6, chưa rõ item nào) |
| `CLAIM-12` | `artwork` | `text-multi-stroke` | owner/staff | portal · api | KB-129..KB-144 (v6, chưa rõ item nào) |
| `CLAIM-13` | `artwork` | `text-multi-stroke` | owner/staff | portal · api | KB-129..KB-144 (v6, chưa rõ item nào) |
| `CLAIM-14` | `artwork` | `text-multi-stroke` | owner/staff | portal · api | KB-129..KB-144 (v6, chưa rõ item nào) |
| `CLAIM-15` | `artwork` | `text-multi-stroke` | owner/staff + guest buyer | storefront · api | không có (S0, chưa nạp) |
| `CLAIM-16` | `artwork` | `text-multi-stroke` | owner/staff + guest buyer | storefront · api | không có (S0, chưa nạp) |
| `CLAIM-17` | `artwork` | `text-multi-stroke` | owner/staff + guest buyer | portal · storefront · api | KB-129..KB-144 (v6, chưa rõ item nào) |
| `CLAIM-18` | `artwork` | `text-multi-stroke` | guest buyer | api · storefront | KB-129..KB-144 (v6, chưa rõ item nào) |
| `CLAIM-19` | `artwork` | `artwork-save-persist` | owner/staff | portal · api | KB-145 (v6 theo results CBS-007, chưa đọc được nội dung) |

- **`scope.role` ở đây KHÁC "Role liên quan" ở Phần 2.** Phần 2 là **dữ kiện** (quan sát bằng tài khoản gì / ticket nêu role nào). Cột này là **chỉ định**: KB item này áp dụng cho role nào. Hai thứ có thể khác nhau hoàn toàn — quan sát bằng tài khoản admin nhưng hành vi áp cho buyer.
- **`scope.environment` không hỏi người gửi** — xem phụ lục product.
- `feature_key` ghi `"MỚI: …"` chỉ là **đề xuất tên**; agent xử lý CCR quyết định cuối và có thể đổi slug.
- Cột "Quan hệ với canon" là `SUPERSEDES` thì **bắt buộc** có `kb_id` ở bảng này **và** có ngày nguồn ở Phần 5.1. Thiếu một trong hai → claim bị xử lý là `CONTRADICTS` (giữ cả hai phía, chờ người phân xử), **không** ghi đè.

---

# Phần 2 — Thấy nó ở đâu `[AGENT]`

- **URL / ID cụ thể đã biết:** `https://ownego.atlassian.net/browse/TIB-5580 · staging instance 520 (nprice1) · artwork #5177 NEW, #5178 SHADOW, #5179 TIGHT, #5180 OPACITY, #5181 LEGACY (copy #5212), #5182 TEXT, #5183 LINKED, #5184 SHAPE, #5186 GLOBAL, #5187 AW 1.0 copy, #5214 copy của #5177 · campaign #3093–#3101 · order Bogus #1091–#1100 (portal orders/4744–4756) · POST /api/merchant/shopify/customization · PUT /api/artworks/{id} · Testlane task TIB-220 (TC-TIB-6312 → TC-TIB-6338) · BUG-357`
- **Trạng thái đối tượng lúc đó:** `lúc chạy test (2026-10-21/22): ticket ở QA Review, 4 PR chưa merge; staging có phần API + portal, SDK storefront còn app-v2.js VERSION 20260929 (chưa có PR sdk #2124). Hiện tại: Done 2026-10-22, 7 PR MERGED — chưa ai kiểm lại sau merge`
- **Environment** (nơi quan sát / nơi ticket mô tả, **KHÔNG** nhất thiết là môi trường agent sẽ dùng để verify): `staging`
  > Kiểm chính sách môi trường ở phụ lục product trước khi coi trường này là blocking — nhiều dự án cố định môi trường verify (vd chỉ staging) độc lập với nơi bug gốc được quan sát. Ghi "không rõ" hay "production" **không** làm CCR bị chặn.
- **Role liên quan:** `owner/staff (Artwork Editor, campaign, order) · guest buyer (storefront personalization, TC-TIB-6338)`
- **Surface:** `portal` · `storefront` · `api` · `db`

Không có URL của surface mà bạn không có quyền? **Bình thường.** Gửi thứ bạn có; agent tự map sang target của nó.

---

# Phần 3 — Để không sinh conflict giả `[AGENT]`

> Phần lớn "conflict" phát sinh không phải mâu thuẫn thật, mà do hai quan sát đều đúng nhưng không ai ghi rõ chúng chạy trên build nào.

Với MỖI ticket:

- **Build / version / ngày deploy:** `staging @ 2026-10-21 → 2026-10-22 (giờ không rõ) — sau lần TIB-5580 giao QA cuối (2026-10-16 11:00, Code Review → QA Review); trước khi 7 PR merge (2026-10-22 14:31); SDK storefront staging lúc đó app-v2.js VERSION 20260929; Jira không có Fix Version; ngày release production không rõ; build hash: không rõ (QA không có quyền repo)`
- **Ngày resolve/update cuối:** `2026-10-22`
- **Đã ship chưa:** `Status Done 2026-10-22 14:47 (QA chuyển Passed + Resolution Done 2026-10-22 10:33), 7 PR MERGED; không có Fix Version / ngày release — chưa tự xác nhận trên production`

> "Không rõ build" **tự nó là thông tin quan trọng** — agent sẽ biết là không thể kết luận hành vi này "mới hơn" hay "cũ hơn" canon chỉ dựa vào đây.
>
> "Chưa ship" **không** làm CCR bị loại, nhưng nó đổi kết quả: claim về hành vi chưa ship sẽ vào KB dưới dạng đề xuất, không đụng canon hiện tại.

**Context hiện đang nói gì** `[AGENT]` — tra canon TRƯỚC khi gửi, chỉ cần chép lại

- Context version đang dùng: `bản clone qa-knowledge (commit 7bed4ea, 2026-10-30): artwork published_context_version 5 (published_at 2026-09-26; manifest.json generated_at 2026-10-30). Manifest đã liệt kê tên feature text-multi-stroke nhưng clone CHƯA có thư mục features/text-multi-stroke, checklist text-multi-stroke hay KB-129..KB-145. Theo results của Proposal CBS-007 (done 2026-10-26): canon đã publish artwork v6 — text-multi-stroke KB-129..KB-144 + CHK-001..CHK-024, artwork-save-persist KB-145 + CHK-018..CHK-020, OQ-artwork-100..OQ-artwork-121, toàn bộ OBSERVED_CURRENT/LOW, "Chưa phát hành sang repo qa-knowledge (chờ operator)"`
- Canon hiện nói: `qa-knowledge clone (artwork v5): không tìm thấy KB nào nói về stroke_layers / multi-stroke / paragraph stroke. Nội dung v6 (KB-129..KB-145) không đọc được từ clone nên không trích nguyên văn — cần agent tự đối chiếu claim với KB v6. (context local, không phải canon qa-knowledge): teeinblue/TIB automation/context/artwork.md → Text layer multi-stroke (TIB-5417, dev implementation comment 2026-09-21): "- **Scope of phase 1:** normal (single-line) Text layers on the **new schema / Artwork 2.0** only, round stroke only, 2–3 layers. Covers editor portal, storefront preview, order render, vector export and PSD import. **Paragraph stays at one stroke** (dropped from phase 1 in the same comment), and curve / warp / spiral / shape-text are phase 2." ▸ "- **Paragraph ignores `stroke_layers` entirely** — a Paragraph carrying three rings renders the single legacy `stroke_color`/`stroke_width` ring only, which is the "Paragraph stays at one stroke" scope behaving as specified (verified through MCP 2026-10-01). ⚠️ **Superseded for new-schema Paragraphs as of the 2026-10-21 build** — TIB-5580 brought the stack to Paragraph, see the section below." ▸ "- **A buyer cannot inject strokes.** Posting a storefront customization payload carrying its own `stroke_layers` is accepted with a success response and then **ignored at render** — the merchant's strokes are used. Note the shape of it: the server silently ignores rather than rejecting, so a case that only checks the HTTP response would read as a security hole when the render is in fact safe." ▸ artwork.md → Paragraph gains Drop shadow (TIB-5472): "- **Fix spans 4 repos** (dev comment): api (print file), vectorize, sdk (preview/storefront — applies the shadow filter once over the whole rendered block, not per line), portal (surfaces the Shadow field in the Paragraph quick editor)." ▸ artwork.md → Paragraph multi-stroke (TIB-5580 / TIB-220, verified on staging 2026-10-21): "- **The PNG (api) render matched the editor preview** for both a thin and a thick stack. The **SVG / vectorize** file could not be pulled from the staging portal at all, so nothing about the vector path was concluded." ▸ cùng mục: "Saving it once rewrites it to the new schema, so duplicate per retest." (ngược với CLAIM-19)`
- Đã tra bằng từ khoá nào: `qa-knowledge/products/teeinblue: "stroke", "stroke_layers", "multi-stroke", "paragraph", "text-multi-stroke", "KB-129", "KB-145", "OQ-artwork-1" trong _registry.json, artwork/kb.json, artwork/features/*/kb.json, artwork/checklists/*.json, artwork/feature-summary.md, artwork/open-questions.md, artwork/CHANGELOG.md, manifest.json (chỉ thấy tên feature trong manifest). Context local: "stroke_layers", "Paragraph", "multi-stroke", "5580", "5417", "shadow", "Saving it once" trong teeinblue/TIB automation/context/artwork.md. CCR cùng thư mục: CCR-2026-10-28-text-multi-stroke.md (TIB-5417)`
- Không tra được canon (không có quyền truy cập knowledge base đích)? Ghi rõ "không tra được — cần agent tự tra lại", **đừng suy đoán** canon nói gì.

---

# Phần 4 — Hai câu chỉ con người trả lời được `[BẠN]`

## 4.1 Có ai xác nhận đây là hành vi ĐÚNG không?

Field này quyết định knowledge có **dùng làm expected result** được hay không.

- Ai xác nhận: `test case đã PASS cho 10 claim (CLAIM-01, 02, 03, 04, 06, 07, 08, 12, 13, 17 — agent [AI] trên staging); PO/business: KHÔNG AI có trích dẫn — comment 54782 là mô tả kỹ thuật của dev; đáp án Slack Q1–Q9 trong RA ghi "PO đã đồng ý" (R3, R11) nhưng CCR bản cũ ghi người trả lời là QA; chuyển Passed trên Jira (2026-10-22) là QA. ⏳ CHỜ BẠN: có PO/business xác nhận ngoài Jira/Slack không? Người trả lời Q1–Q9 trên thread Slack ts 1792556100.094559 là ai — nếu là PO thì cho link tin nhắn + nguyên văn để nâng CLAIM-15 (R10, R14) và CLAIM-16 (R16) lên po_dev_confirm`
- Ở đâu, ngày nào: `TC-TIB-6312, 6314–6318, 6324–6326, 6330, 6331, 6337 PASS 2026-10-21 và TC-TIB-6323 PASS 2026-10-22 trên staging instance 520 (build sau lần giao QA 2026-10-16); comment dev chauptm id 54782 trên TIB-5580 ngày 2026-10-16; thread Slack #req-chienct ts 1792556100.094559 ngày 2026-10-21`
- Họ xác nhận chính xác điều gì: `test case: actualResult từng case trích ở 5.1. Comment dev (không tính là xác nhận): "each stroke layer is painted across every line before the next one, outermost first, then the fill of every line". Không có câu xác nhận nguyên văn nào của PO/business`

> Comment kỹ thuật dev tự viết trong ticket (kể cả "Ready to test", "Resolution: Done") **KHÔNG PHẢI** PO/business sign-off. Không ai xác nhận thật sự → knowledge vào context dưới dạng "đã quan sát thấy", **không** dùng làm expected result. Đây là cố ý, không phải hạn chế.
>
> **Nhưng tài liệu dev sinh từ source code thì CÓ tính** (`dev_doc`) — nó khác một comment tiện tay ở chỗ nó được generate có hệ thống từ code và được dev chủ động gửi như mô tả chính thức. Khi đó knowledge vào context dưới dạng **hành vi đúng** và **sẽ được dùng làm expected result cho test hằng ngày**. Đây là quyền lực thật — chỉ ghi khi bạn có tên tài liệu + version + ngày + trích dẫn thật.
>
> Mục này chính là nguồn cho cột "Nguồn & độ mạnh" ở Phần 1a — trả lời "PO/Dev"/"test case"/"dev doc" ở đây mà không kèm quote/link/id/ngày cụ thể thì cột đó vẫn phải ghi `KHÔNG CÓ NGUỒN`.

## 4.2 KHÔNG đề xuất điều gì?

**Bắt buộc.** Đây là cái chặn agent nhận CCR nâng quan sát/mô tả ticket lên thành "hành vi đúng" quá tay.

```
- Ngưỡng 15px tách 2 đường vẽ stroke của API — số dev ghi trong mục "Possible test cases", chưa ai xác nhận
  là cố định.
- Loại trừ Custom Shape + paragraph legacy-schema khỏi multi-stroke — quyết định của dev; "đồng ý" trên Slack
  chưa rõ là PO hay QA.
- Hành vi shadow mới (áp 1 lần cho cả khối ở vectorize + API PNG) — chỉ là mô tả dev + đáp án Slack, chưa
  quan sát được trên SVG / storefront.
- Các đáp án Slack Q1–Q9 ngày 2026-10-21 trong RA (C5–C9, R10–R16) — chưa phải PO/business sign-off có
  trích dẫn.
- "Server bỏ qua stroke_layers buyer chèn là an toàn" (context local) và "lọt validate là bug" (RA Q6,
  BUG-357) — chưa chọn bên nào.
- Số đo order #1095 (vòng trắng ~2,5px trên PNG so với ~10px trên editor) — ước lượng bằng mắt từ ảnh.
- Testlane status "passed" của 13 case có actualResult Blocked — không coi là đã verify.
- Mọi so sánh "giống preview" là so bằng mắt (R13), không có ngưỡng pixel.
- Ticket Done / PR merged KHÔNG có nghĩa hành vi storefront SDK và SVG đã được ai kiểm.
- Ranh giới object: không đề xuất object mới; feature_key text-multi-stroke lấy từ canon v6, không tự đặt.
```

## 4.3 Đề xuất context nên nói gì `[AGENT soạn, BẠN duyệt]`

```
Paragraph new-schema (Artwork 2.0) mang được tối đa 3 lớp stroke (stroke_layers, lớp trong cùng trước, mỗi
width là độ dày riêng của vòng đó và cộng dồn khi render). Trên portal: popover Stroke là stack editor, nút
Add stroke tắt ở 3 lớp; xoá / kéo đổi thứ tự / Save / reload giữ đúng dữ liệu; stroke_color/stroke_width
luôn mirror lớp trong cùng; paragraph mới tạo có stroke tắt, bật lên được 1 row; tắt stroke giữ nguyên
stroke_layers và bật lại thì các lớp cũ quay về; paragraph chỉ có stroke legacy được lift thành 1 row không
đổi hình; convert paragraph ↔ text giữ stack, sang Curve/Warp chỉ giữ lớp trong cùng; Custom Shape giữ 1
stroke. Stroke chỉ có kiểu round ở editor và PNG. (Test case PASS trên staging 2026-10-21/22, trước khi PR
merge.) CHƯA verify, không dùng làm expected: thứ tự vẽ và độ giống preview ở storefront SDK và SVG
vectorize, shadow paragraph áp 1 lần ở 3 renderer, opacity < 1 giữa 2 dòng, linked paragraph và autoscale
ở storefront, global template, paragraph legacy-schema khi Save. Buyer gửi stroke_layers vượt giới hạn vào
customization API được nhận (201, echo lại) nhưng không ảnh hưởng render — từ chối hay bỏ qua là đúng vẫn
chờ PO (BUG-357).
```

## 4.4 Mức độ gấp `[BẠN]`

`HIGH` (đang chặn test P0/P1) · `MEDIUM` (ảnh hưởng coverage) · `LOW` (cải thiện dần)

---

# Phần 5 — Evidence `[AGENT]`

## 5.1 Nguồn & evidence theo từng claim — một block cho MỖI Claim ID ở Phần 1a

### CLAIM-01

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** `TC-TIB-6312, TC-TIB-6314, TC-TIB-6315 (Testlane task TIB-220); ngày chạy từ report lượt chạy TIB-220 (Testlane không lưu ngày từng case)`
- **Link:** `https://claude.ai/artifact/5vvWKMFBHY1sQjE9ERB7vc (report lượt chạy); case trên Testlane không có URL công khai`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-21`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `agent test-executor [AI], chạy cho QA chienct`
- **Trích nguyên văn:**
  ```
  TC-TIB-6312: Popover Stroke của paragraph new-schema là editor stack ("Stroke 1 sits closest to the text… Up to 3"). Thêm row 2 = #00FF00 / 4px; Save OK, reload mở lại vẫn 2 row (#FF0000/4, #00FF00/4). API: PUT /api/artworks/5177 → 200, stroke_layers = [{#FF0000,4},{#00ff00,4}] đúng thứ tự, stroke_color/width mirror lớp 1 (màu row 2 lưu dạng lowercase "#00ff00", cùng giá trị hex).
  TC-TIB-6314: 3 row trong popover Stroke (#FF0000/3, #00FF00/3, #0000FF/3); preview 200% cho thấy từ mép chữ ra ngoài là đỏ → xanh lá → xanh dương, đúng trên cả 3 dòng. API: PUT /api/artworks/5177 → 200, stroke_layers 3 entry [{#FF0000,3},{#00ff00,3},{#0000ff,3}] đúng thứ tự, stroke_color/width = lớp 1 (#FF0000/3), không làm tròn/đổi tên field.
  TC-TIB-6315: Ở 3 row, nút "Add stroke" bị disabled (không tạo được row thứ 4, click force cũng không thêm). Save → PUT /api/artworks/5177 → 200, stroke_layers đúng 3 entry [{#FF0000,2},{#00ff00,2},{#0000ff,2}], không có entry thứ 4; reload mở lại popover vẫn đúng 3 row (2/2/2).
  ```
- **File đính kèm cho claim này:** `không có (ảnh chụp nằm trong từng case trên Testlane)`

### CLAIM-02

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** `TC-TIB-6316, TC-TIB-6314 (Testlane task TIB-220)`
- **Link:** `https://claude.ai/artifact/5vvWKMFBHY1sQjE9ERB7vc`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-21`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `agent test-executor [AI], chạy cho QA chienct`
- **Trích nguyên văn:**
  ```
  TC-TIB-6316: Preview 200%: 4/4/4 cho 3 vành mỗi vành ~4px; đổi lớp giữa lên 8px thì chỉ vành #00FF00 dày thêm, vành đỏ và xanh dương giữ nguyên bề dày. Sau Save + reload popover là 4 / 8 / 4 (width lưu đúng giá trị nhập, không cộng dồn). Lưu ý: request PUT /api/artworks/5177 của lần Save này không bắt được body trong Network (tool); đã đối chiếu bằng dữ liệu đọc lại sau reload (#FF0000/4, #00FF00/8, #0000FF/4); PUT trả thành công, editor đóng về /artworks.
  TC-TIB-6314: preview 200% cho thấy từ mép chữ ra ngoài là đỏ → xanh lá → xanh dương, đúng trên cả 3 dòng.
  ```
- **File đính kèm cho claim này:** `không có (ảnh chụp nằm trong case trên Testlane)`

### CLAIM-03

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** `TC-TIB-6317 (Testlane task TIB-220)`
- **Link:** `https://claude.ai/artifact/5vvWKMFBHY1sQjE9ERB7vc`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-21`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `agent test-executor [AI], chạy cho QA chienct`
- **Trích nguyên văn:**
  ```
  Đặt 3 lớp #FF0000/#00FF00/#0000FF (3px), Save (PUT /api/artworks/5177 → 200, 3 entry), reload đủ 3 row. Xoá row giữa còn 2 row (#FF0000, #0000FF), vành xanh lá biến mất khỏi preview. Kéo handle đổi thứ tự → vành sát mép chữ là #0000FF, ngoài là #FF0000. Save: PUT → 200, stroke_layers = [{#0000ff,3},{#FF0000,3}], stroke_color/width mirror lớp trong cùng (#0000ff/3). Reload: popover còn 2 row #0000FF/3, #FF0000/3 và preview giữ thứ tự mới.
  ```
- **File đính kèm cho claim này:** `không có (ảnh chụp nằm trong case trên Testlane)`

### CLAIM-04

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** `TC-TIB-6318 (Testlane task TIB-220)`
- **Link:** `https://claude.ai/artifact/5vvWKMFBHY1sQjE9ERB7vc`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-21`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `agent test-executor [AI], chạy cho QA chienct`
- **Trích nguyên văn:**
  ```
  Paragraph (Normal) mới tạo: popover Stroke mặc định tắt (Enable stroke off); bật lên thì có đúng 1 row (#FF0000 / 1px). Save lần 1 (#FF0000/5): PUT /api/artworks/5177 → 200, stroke_layers = [{#FF0000,5}], stroke_color #FF0000, stroke_width 5. Save lần 2 (thêm lớp #00FF00/7): stroke_layers = [{#FF0000,5},{#00ff00,7}], stroke_color/width vẫn #FF0000 / 5 (không nhảy theo lớp ngoài). Save lần 3 (đổi lớp trong cùng #123456/2): stroke_color #123456, stroke_width 2, stroke_layers = [{#123456,2},{#00ff00,7}]. Ghi chú nhỏ: stroke của paragraph mới mặc định tắt chứ không bật sẵn 1 lớp.
  ```
- **File đính kèm cho claim này:** `không có (ảnh chụp nằm trong case trên Testlane)`

### CLAIM-05

- **Loại nguồn** (đúng 1): `KHÔNG CÓ NGUỒN`
- **Locator:** `TC-TIB-6319, TC-TIB-6320, TC-TIB-6321, TC-TIB-6322 (Testlane task TIB-220); comment dev chauptm id 54782 trên TIB-5580`
- **Link:** `https://ownego.atlassian.net/browse/TIB-5580?focusedCommentId=54782`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-21`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `agent test-executor [AI] (actualResult 2026-10-21); dev chauptm (comment 2026-10-16) — không ai xác nhận`
- **Trích nguyên văn:**
  ```
  TC-TIB-6319 (actualResult): Blocked — Phần preview storefront không kiểm được: SDK staging chưa có code vẽ multi-stroke cho paragraph. Preview editor (#5179, line-height 1.0, 3 lớp; đã quan sát ở 4/4/4 và 8/8/8): vành stroke xếp đỏ → xanh lá → xanh dương từ mép chữ ra ngoài, fill trắng của cả 3 dòng nằm trên cùng; ở vùng giáp dòng 1–2 và 2–3 không có chữ nào bị viền dòng khác cắt/che.
  TC-TIB-6320 (actualResult): https://staging-portal.teeinblue.com/orders/4751.
  TC-TIB-6321 (actualResult): https://staging-portal.teeinblue.com/orders/4751
  TC-TIB-6322 (actualResult): https://staging-portal.teeinblue.com/orders/4752
  Comment dev 54782 (2026-10-16): "makes all three renderers use the preview's paint order: each stroke layer is painted across every line before the next one, outermost first, then the fill of every line."
  ```
- **File đính kèm cho claim này:** `không có`

### CLAIM-06

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** `TC-TIB-6323 (Testlane task TIB-220); order #1097 (portal orders/4753)`
- **Link:** `https://claude.ai/artifact/5vvWKMFBHY1sQjE9ERB7vc`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-22`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `agent test-executor [AI], chạy cho QA chienct`
- **Trích nguyên văn:**
  ```
  2 lớp #FF0000/8px + #0000FF/8px trên #5177 (Save: PUT /api/artworks/5177 → 200, stroke_layers [{#ff0000,8},{#0000ff,8}]). Preview editor zoom 250% (góc chữ L, O, E): viền bo tròn ở cả 2 lớp, không có đầu nhọn/vuông. PNG order #1097 (portal orders/4753, zoom 700% trên chữ W, O, R): các góc ngoài và trong của cả 2 vành đều bo tròn. Preview storefront: SVG của SDK dùng stroke-linejoin="round" stroke-linecap="round" (SDK staging chỉ vẽ 1 vành cho paragraph, đã ghi ở các case khác). Giới hạn: không lấy được bản SVG vectorize nên chưa kiểm góc ở SVG.
  ```
- **File đính kèm cho claim này:** `không có (ảnh chụp nằm trong case trên Testlane)`

### CLAIM-07

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** `TC-TIB-6324 (Testlane task TIB-220); order #1098 (portal orders/4754)`
- **Link:** `https://claude.ai/artifact/5vvWKMFBHY1sQjE9ERB7vc`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-21`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `agent test-executor [AI], chạy cho QA chienct`
- **Trích nguyên văn:**
  ```
  Đặt 3 lớp #FF0000/#00FF00/#0000FF (3px) trên #5177 rồi tắt Enable stroke. Preview editor chỉ còn fill. Save khi tắt: PUT /api/artworks/5177 → 200, stroke_enabled = false, stroke_layers vẫn giữ nguyên 3 entry (không bị xoá). Preview storefront CP-5580: SVG paragraph không có thuộc tính stroke nào. PNG order #1098 (portal orders/4754, xem trên nền xám): chỉ có chữ trắng, không có viền. Bật lại stroke trong editor: popover hiện đúng 3 row #FF0000/3, #00FF00/3, #0000FF/3 theo thứ tự cũ và preview có lại 3 vành. Giới hạn: không lấy được bản SVG vectorize nên chưa kiểm "không viền" ở SVG.
  ```
- **File đính kèm cho claim này:** `không có (ảnh chụp nằm trong case trên Testlane)`

### CLAIM-08

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** `TC-TIB-6325, TC-TIB-6326 (Testlane task TIB-220); artwork #5214 (copy của #5177)`
- **Link:** `https://claude.ai/artifact/5vvWKMFBHY1sQjE9ERB7vc`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-21`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `agent test-executor [AI], chạy cho QA chienct. ⏳ CHỜ BẠN (câu cho PO, OQ-artwork-107): convert paragraph 3 lớp sang Curve/Warp làm mất 2 lớp ngoài mà không cảnh báo — PO có xác nhận đây là chủ ý không? Có thì cho nguyên văn + link`
- **Trích nguyên văn:**
  ```
  TC-TIB-6325: Làm trên bản copy #5214 (paragraph 3 lớp #FF0000/#00FF00/#0000FF, 3px). Convert paragraph → Single-line Text: popover Stroke còn đúng 3 row; Save: PUT /api/artworks/5214 → 200, layer type "text", stroke_layers 3 entry theo đúng thứ tự (#ff0000, #00ff00, #0000ff / 3), reload vẫn 3 row. Convert ngược text → Normal Paragraph: popover vẫn 3 row đúng giá trị; Save: PUT → 200, type "paragraph", stroke_layers 3 entry đúng thứ tự, stroke_color/width mirror lớp 1 (#ff0000/3). Preview vẫn 3 vành.
  TC-TIB-6326: Trên bản copy #5214 (paragraph 3 lớp, lớp trong cùng #FF0000/3): convert sang Curve Text → popover Stroke chuyển về dạng 1 stroke (không còn stack, không lỗi); Save: PUT /api/artworks/5214 → 200, layer type "curve-text", stroke_color #ff0000, stroke_width 3, không có stroke_layers. Dựng lại 3 lớp trên paragraph rồi convert sang Warp Text → cũng 1 stroke; Save: PUT → 200, type "warp-text", stroke_color #ff0000 / stroke_width 3, không có stroke_layers. Hai lớp ngoài bị bỏ, đúng R6.
  ```
- **File đính kèm cho claim này:** `không có (ảnh chụp nằm trong case trên Testlane)`

### CLAIM-09

- **Loại nguồn** (đúng 1): `KHÔNG CÓ NGUỒN`
- **Locator:** `TC-TIB-6327 (Testlane task TIB-220); artwork #5183, campaign #3099`
- **Link:** `https://claude.ai/artifact/5vvWKMFBHY1sQjE9ERB7vc`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-21`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `agent test-executor [AI] — không ai xác nhận`
- **Trích nguyên văn:**
  ```
  Blocked — Phần editor/API đạt, nhưng bước preview storefront không kiểm được vì SDK staging chưa vẽ multi-stroke cho paragraph.
  #5183: paragraph gốc PARA-ORIGIN (1400px, font 140) + PARA-LINKED-50 (linked, 700px, font 70). Layer linked không có nút Stroke riêng (kế thừa từ gốc). Đặt 3 lớp #FF0000/#00FF00/#0000FF (6px) trên paragraph gốc, Save: PUT /api/artworks/5183 → 200; payload PARA-ORIGIN stroke_layers = [{#FF0000,6},{#00FF00,6},{#0000FF,6}], PARA-LINKED-50 (customization_type linked, linked=layer-558007) mang cùng 3 lớp, cùng thứ tự/màu.
  Preview editor (zoom 100%): paragraph linked (font 70) cho vành stroke mảnh xấp xỉ một nửa paragraph gốc (font 140), cùng thứ tự đỏ → xanh lá → xanh dương — scale theo tỉ lệ width, đúng R7. (Đối chiếu bằng mắt, không đo pixel.)
  ```
- **File đính kèm cho claim này:** `không có`

### CLAIM-10

- **Loại nguồn** (đúng 1): `KHÔNG CÓ NGUỒN`
- **Locator:** `TC-TIB-6328 (Testlane task TIB-220); comment dev chauptm id 54782 trên TIB-5580 (mục teeinblue-api và mục Possible test cases)`
- **Link:** `https://ownego.atlassian.net/browse/TIB-5580?focusedCommentId=54782`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-16`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `dev chauptm (comment kỹ thuật, không phải dev_doc); test agent [AI] không chạy được — không ai xác nhận`
- **Trích nguyên văn:**
  ```
  Comment dev 54782 (2026-10-16): "`GlobalTemplateMerger` keeps `stroke_layers` as a local field for paragraph; spiral / shape text still don't get it." · teeinblue-sdk: "`stroke_layers` is a paragraph global-template local field." · Possible test cases: "Global template: per-product paragraph stroke stack override is kept; spiral / shape text still only have the single stroke."
  TC-TIB-6328 (actualResult 2026-10-21): Blocked — Fixture #5186 (artwork dùng global template, dựng qua API) không mở được trong Artwork Editor nên không thực hiện được các bước. Mở #5186 từ URL ?id=5186 và từ nút Edit trên card: modal editor chỉ hiện lớp overlay xám, không có panel layer / popover (đợi tới 15s); không có lỗi console (chỉ 404 gravatar) và không có request lỗi (mọi graphql 200, validate-default-value 204). Chưa xác định nguyên nhân (fixture API chưa từng mở bằng editor hay lỗi editor với global template) nên không kết luận Fail.
  ```
- **File đính kèm cho claim này:** `không có`

### CLAIM-11

- **Loại nguồn** (đúng 1): `KHÔNG CÓ NGUỒN`
- **Locator:** `TC-TIB-6329 (Testlane task TIB-220); order #1099 (portal orders/4755)`
- **Link:** `https://claude.ai/artifact/5vvWKMFBHY1sQjE9ERB7vc`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-21`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `agent test-executor [AI] — không ai xác nhận`
- **Trích nguyên văn:**
  ```
  Blocked — PNG đạt, nhưng preview storefront (đủ 3 vành) và SVG không kiểm được: SDK staging chưa vẽ multi-stroke paragraph, không có đường tải SVG.
  Storefront text dài (3 dòng ~40 ký tự): POST /api/merchant/shopify/customization → 201; autoscale thu font 140 → 97 và tự xuống thành 6 dòng.
  PNG order #1099 (portal orders/4755, xem trên nền xám): 3 vành đỏ → xanh lá → xanh dương scale theo chữ đã thu nhỏ, vành ngoài cùng không bị cắt ở 4 mép, giống kiểu hình các case PNG khác.
  ```
- **File đính kèm cho claim này:** `không có`

### CLAIM-12

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** `TC-TIB-6330 (Testlane task TIB-220); artwork #5181, copy #5212`
- **Link:** `https://claude.ai/artifact/5vvWKMFBHY1sQjE9ERB7vc`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-21`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `agent test-executor [AI], chạy cho QA chienct`
- **Trích nguyên văn:**
  ```
  Paragraph chỉ có stroke legacy (stroke_color #FF0000 / stroke_width 3, không có stroke_layers) mở trong editor: preview không đổi trước/sau khi mở popover; popover hiện stack đúng 1 row = #FF0000 / 3px. Save (làm trên bản copy #5212 để giữ #5181 sạch): PUT /api/artworks/5212 → 200, stroke_layers = [{#FF0000,3}], stroke_color/stroke_width vẫn #FF0000 / 3. Preview storefront của CP-5580-LEGACY (SDK hiện hành) vẫn 1 vành đỏ mảnh như bình thường.
  ```
- **File đính kèm cho claim này:** `không có (ảnh chụp nằm trong case trên Testlane)`

### CLAIM-13

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** `TC-TIB-6331 (Testlane task TIB-220); artwork #5184`
- **Link:** `https://claude.ai/artifact/5vvWKMFBHY1sQjE9ERB7vc`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-21`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `agent test-executor [AI], chạy cho QA chienct`
- **Trích nguyên văn:**
  ```
  Layer Custom Shape text (shape-text) vẫn là popover 1 stroke (Enable stroke + Stroke width 3px + color picker), không có nút "Add stroke"/stack. Đổi màu #FF0000 → #0000FF, giữ width 3, Save: PUT /api/artworks/5184 → 200, layer chỉ có stroke_color #0000FF, stroke_width 3, không có stroke_layers. Preview editor: 1 vành viền. (Không so preview storefront vì campaign chưa sync artwork mới; không có thay đổi render nào ngoài màu.)
  ```
- **File đính kèm cho claim này:** `không có (ảnh chụp nằm trong case trên Testlane)`

### CLAIM-14

- **Loại nguồn** (đúng 1): `KHÔNG CÓ NGUỒN`
- **Locator:** `TC-TIB-6332 (Testlane task TIB-220); artwork #5187 (AW 1.0 copy của #2164)`
- **Link:** `https://claude.ai/artifact/5vvWKMFBHY1sQjE9ERB7vc`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-21`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `agent test-executor [AI] — không ai xác nhận`
- **Trích nguyên văn:**
  ```
  Blocked — Phần UI đạt (popover vẫn 1 stroke) nhưng không Save được artwork AW 1.0 để kiểm bước đổi width và payload.
  Popover Stroke: chỉ có Enable stroke + Stroke width + color picker; không có stack, không có nút "Add stroke" — đúng R11.
  ```
- **File đính kèm cho claim này:** `không có`

### CLAIM-15

- **Loại nguồn** (đúng 1): `KHÔNG CÓ NGUỒN`
- **Locator:** `TC-TIB-6313, TC-TIB-6335 (Testlane task TIB-220); comment dev chauptm id 54782 (mục teeinblue-vectorize); RA analysis_TIB-5580.md R10, R14 (đáp án Slack Q2, thread ts 1792556100.094559)`
- **Link:** `https://ownego.atlassian.net/browse/TIB-5580?focusedCommentId=54782`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-21`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `dev chauptm (comment 2026-10-16, mô tả kỹ thuật); người trả lời Slack Q2 2026-10-21 chưa rõ PO hay QA (xem ⏳ ở 4.1); agent test-executor [AI] — không ai xác nhận có trích dẫn`
- **Trích nguyên văn:**
  ```
  Comment dev 54782 (2026-10-16), teeinblue-vectorize: "`ParagraphRenderer` interleaves stroke passes across lines (outermost of every line → … → innermost → all fills). Shadow is now applied once to the whole paragraph instead of per line."
  Đáp án Slack Q2 (2026-10-21, chép trong Nhật ký chốt của RA): "không được phép khác nhau"; "ko cần nghiệm thu lại 5472"; vòng 3: "a" (API PNG đã đổi sang áp shadow 1 lần, trong PR api #4016).
  TC-TIB-6335 (actualResult 2026-10-21): Blocked — Preview editor và PNG khớp nhau, nhưng preview storefront (SDK staging chưa vẽ multi-stroke paragraph) và SVG vectorize (không tải được) không có để so đủ 3 renderer. PNG order #1096 (portal orders/4749): cùng kiểu hình — 1 khối shadow cho cả paragraph (không lặp theo dòng), 3 vành đúng thứ tự, fill trên cùng; không thấy lệch shadow so với preview editor. Preview storefront chỉ vẽ 1 vành và không có shadow trong SVG preview (SDK VERSION 20260929); SVG vectorize không có đường tải trên portal.
  TC-TIB-6313 (actualResult 2026-10-21): Blocked — Không so được đủ 3 renderer: SDK storefront trên staging chưa có code TIB-5580 và không tìm được đường lấy SVG vectorize từ portal. PNG order design (order #1091, design 14184): khớp preview editor — 1 khối shadow cho cả paragraph, 2 vành đỏ → xanh dương. Không lệch giữa editor và PNG.
  ```
- **File đính kèm cho claim này:** `không có`

### CLAIM-16

- **Loại nguồn** (đúng 1): `KHÔNG CÓ NGUỒN`
- **Locator:** `TC-TIB-6333, TC-TIB-6334 (Testlane task TIB-220); RA analysis_TIB-5580.md R12, R16 (đáp án Slack Q5, Q9, thread ts 1792556100.094559); order #1095 (portal orders/4748)`
- **Link:** `https://claude.ai/artifact/5vvWKMFBHY1sQjE9ERB7vc`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-21`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `người trả lời Slack Q5/Q9 2026-10-21 chưa rõ PO hay QA (xem ⏳ ở 4.1); agent test-executor [AI] — không ai xác nhận có trích dẫn`
- **Trích nguyên văn:**
  ```
  Đáp án Slack (2026-10-21, chép trong Nhật ký chốt của RA): Q5 "đúng" (→ R12: bleed preview/SVG không block, opacity cộng dồn ở vector là Known Issue); Q9 "Đó là fail phải sửa" (→ R16: vùng stroke của 2 dòng chồng nhau bị đậm gấp đôi là Fail).
  TC-TIB-6333 (actualResult 2026-10-21): Blocked — Không lấy được SVG vectorize (nơi nghi có lỗi opacity cộng dồn, Q10), nên không kết luận được Pass/Fail cho tiêu chí chính của case. PNG order design (xem trên nền xám): fill #3d3d3d (black 50%), vành trắng mỏng bao ngoài; giữa các dòng không có vùng chồng nhau bị đậm gấp đôi (với stroke 10px khoảng cách dòng vẫn chừa trống nên vùng stroke của 2 dòng không giao nhau). Ghi nhận: vành stroke trong PNG mỏng hơn nhiều so với preview (~2,5px so với ~10px ở preview editor) — QA đánh giá lệch về bề dày, cần dev xác nhận.
  TC-TIB-6334 (actualResult 2026-10-21): Blocked — Chỉ kiểm được preview editor; preview storefront (2 lớp stroke, SDK staging chưa có code paragraph multi-stroke) và SVG vectorize không có để đối chiếu. Preview editor: thứ tự vẽ đúng — fill nằm trên các lớp stroke, 2 vành trắng (trong) → đỏ (ngoài) đúng thứ tự; bên trong chữ thấy bleed của stroke xuyên qua fill bán trong suốt (đúng mô tả Known Issue R12, không block).
  ```
- **File đính kèm cho claim này:** `không có`

### CLAIM-17

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** `TC-TIB-6337 (Testlane task TIB-220); artwork #5182, campaign #3098, order #1094 (portal orders/4747)`
- **Link:** `https://claude.ai/artifact/5vvWKMFBHY1sQjE9ERB7vc`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-21`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `agent test-executor [AI], chạy cho QA chienct`
- **Trích nguyên văn:**
  ```
  Text layer 1 dòng "TEEINBLUE" (#5182) giữ nguyên hành vi TIB-5417: popover Stroke 3 row (#FF0000/3, #00FF00/3, #0000FF/3), nút Add bị disabled ở lớp thứ 4; xoá lớp giữa → 2 row, thêm lại → 3 row, kéo đổi thứ tự → [#0000FF, #FF0000, #00FF00] hoạt động bình thường. Save: PUT /api/artworks/5182 → 200, type "text", stroke_layers 3 entry, stroke_color/width mirror lớp trong cùng (#ff0000/3). Preview storefront CP-5580-TEXT: 3 vành đỏ/xanh lá/xanh dương trên text. Order #1094 (portal orders/4747): PNG có đủ 3 vành đúng thứ tự, giống preview. Giới hạn: không lấy được bản SVG vectorize (không có đường tải SVG trên portal) nên bước so SVG chưa kiểm.
  ```
- **File đính kèm cho claim này:** `không có (ảnh chụp nằm trong case trên Testlane)`

### CLAIM-18

- **Loại nguồn** (đúng 1): `KHÔNG CÓ NGUỒN`
- **Locator:** `TC-TIB-6338 (Testlane task TIB-220, status skipped, actualResult Fail); BUG-357; order #1100 (portal orders/4756); RA analysis_TIB-5580.md Section 5 (đáp án Slack Q6 "Có validate")`
- **Link:** `https://claude.ai/artifact/5vvWKMFBHY1sQjE9ERB7vc`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-21`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `agent test-executor [AI] — không ai phân xử. ⏳ CHỜ BẠN (câu cho PO, OQ-artwork-111): buyer chèn stroke_layers vượt giới hạn vào POST customization — server nên TỪ CHỐI (4xx) hay được phép NHẬN rồi bỏ qua khi render? BUG-357 hiện đã fix, đóng hay để Known Issue (ticket đã Done 2026-10-22)?`
- **Trích nguyên văn:**
  ```
  Fail — API customization nhận và lưu stroke_layers do buyer chèn (4 entry và width "abc"), không từ chối cũng không loại bỏ.
  Actual: POST /api/merchant/shopify/customization với stroke_layers 4 entry → 201, response echo đủ 4 entry; với width "abc" → 201, response echo width "abc".
  Expected: bị từ chối hoặc payload thừa/sai kiểu bị bỏ; response không có entry thứ 4 / width sai kiểu.
  Phần còn lại đạt: localStorage teeinblue-customizations không chứa stroke_layers chèn; PNG order #1100 (orders/4756) chỉ có đúng 3 vành theo artwork, không có vành thứ 4, không dùng giá trị chèn.
  Đã tạo bug BUG-357 kèm screenshot.
  ```
- **File đính kèm cho claim này:** `không có`

### CLAIM-19

- **Loại nguồn** (đúng 1): `KHÔNG CÓ NGUỒN`
- **Locator:** `TC-TIB-6332 (Testlane task TIB-220); artwork #5187; context local teeinblue/TIB automation/context/artwork.md → Paragraph multi-stroke (TIB-5580 / TIB-220), gạch "Fixture gotcha"`
- **Link:** `https://claude.ai/artifact/5vvWKMFBHY1sQjE9ERB7vc`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-21`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `agent test-executor [AI] — chưa có bug, chưa dev nào xem log`
- **Trích nguyên văn:**
  ```
  Save artwork: PUT /api/artworks/5187 → 500 {"message":"Server Error"} kể cả khi chỉ mở lại editor và Save không đổi gì (artwork chưa có version nào đã lưu). Vì vậy không kiểm được payload "chỉ stroke_width đổi 3 → 6" và không so được preview storefront sau đổi.
  Chưa xác định 500 có liên quan TIB-5580 hay do dữ liệu AW 1.0 của bản copy này; cần dev xem log. Không tự coi là bug của ticket.
  Context local (artwork.md): "Saving it once rewrites it to the new schema, so duplicate per retest."
  ```
- **File đính kèm cho claim này:** `không có`

*(lặp lại block trên cho CLAIM-02, CLAIM-03…)*

## 5.2 Evidence chung, không thuộc claim nào `[AGENT]`

`https://ownego.atlassian.net/browse/TIB-5580 (description + comment dev id 54782 ngày 2026-10-16) · report lượt chạy https://claude.ai/artifact/5vvWKMFBHY1sQjE9ERB7vc · teeinblue/TIB automation/qa-output/analysis_TIB-5580.md (vòng 3, Nhật ký chốt) · teeinblue/TIB automation/qa-output/api-observations_TIB-220.json · Proposal CBS-007 results (2026-10-26) · PR api #4016, portal #3820, sdk #2124, vectorize #76 (chỉ ghi nhận, chưa đọc diff)`

> **Trước khi đính kèm: bỏ email, số điện thoại, địa chỉ, tên khách hàng thật, token, cookie, credential.** Tên nội bộ của dev/support trong comment ticket thường CHẤP NHẬN ĐƯỢC (không phải PII khách hàng), nhưng vẫn kiểm kỹ. Evidence còn dữ liệu nhạy cảm sẽ **chặn publish**, không phải cảnh báo.

---

# Tự kiểm trước khi gửi

`[BẠN]`:

- [ ] Đây thật sự là **một** thứ được gỡ độc lập, và mọi claim thuộc **cùng một product** (Phần 0)
- [ ] Đã trả lời 4.1 trung thực — kể cả khi câu trả lời là "không ai, chỉ là comment dev"
- [ ] Đã điền 4.2 (KHÔNG đề xuất điều gì)
- [ ] Đã chọn mức độ gấp (4.4)
- [ ] Evidence đã bỏ PII/token/credential

`[AGENT]`:

- [x] Số lần xác nhận trực tiếp là con số thật, không làm tròn lên
- [x] Đã ghi build/ngày resolve hoặc thừa nhận "không rõ" cho từng ticket
- [x] Đã ghi rõ từ khoá đã tra canon (hoặc lý do không tra được)
- [x] Mỗi claim trong "Quan sát được" có đúng 1 dòng ở Phần 1a, với `Claim ID` **duy nhất**
- [x] Mỗi `Claim ID` ở Phần 1a có đúng 1 block tương ứng ở Phần 5.1
- [x] Mỗi `Claim ID` ở Phần 1a có dòng tương ứng ở Phần 1b (object/feature/role/surface)
- [x] Cột "Nguồn & độ mạnh" của mỗi dòng ghi đúng 1 trong 5 trạng thái, kèm trích dẫn cụ thể khi không phải `KHÔNG CÓ NGUỒN`
- [x] Mọi claim ghi `dev_doc`/`spec_doc`/`po_dev_confirm`/`test_case` đều có **ngày nguồn cụ thể** ở 5.1 (không phải "không rõ")
- [ ] Không còn placeholder dạng ba dấu nhỏ hơn … ba dấu lớn hơn nào sót lại trong file

---

# Sau khi gửi

Bạn nhận phản hồi trên Proposal/Task đó với 1 trong 5 kết cục:

| Kết cục | Nghĩa |
|---|---|
| `ACCEPTED` | Đã vào canonical context; version ghi trong `manifest.json` → `resolved_requests` |
| `NEEDS_INFO` | Thiếu thông tin, nêu **đúng tên mục** cần bổ sung. Sửa rồi Submit lại (tạo Proposal mới) |
| `CONFLICT` | Mâu thuẫn với canon và **chưa ngã ngũ** — cả hai phía được giữ kèm nguồn, chờ PO/Dev/QA lead phân xử |
| `REJECTED` | Không vào canon, kèm lý do |
| `DEFERRED` | Hoãn, kèm điều kiện để làm lại |

**Lưu ý về sức ghi đè:** nếu CCR của bạn có nguồn **mạnh hơn hoặc mới hơn** canon hiện tại, canon có thể **bị ghi đè** thay vì sinh conflict — statement cũ chuyển vào `CHANGELOG.md` dạng superseded. Luật ở contract §12.5, và nó chỉ bật cho product có bật chính sách đó (xem phụ lục). Đây là lý do ngày nguồn ở Phần 5.1 phải chính xác.
