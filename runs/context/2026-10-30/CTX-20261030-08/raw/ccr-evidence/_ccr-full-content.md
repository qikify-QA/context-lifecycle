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

**Loại:** BEHAVIOR_CHANGE

**Object** `[AGENT]` — lấy từ `_registry.json` (hoặc tương đương) của knowledge base đích, nếu có quyền truy cập

- Product: teeinblue
- Object: artwork · Feature: text-color-sequence-render (feature_key do context builder tạo khi publish CBS-008 — lấy từ results CBS-008, bản clone qa-knowledge local chưa có thư mục này); CLAIM-16 thuộc artwork / layer-config-text; CLAIM-17 thuộc object sdk / storefront-buyer-facing
- Không khớp object nào trong registry, hoặc không tra được registry? Mô tả bằng lời. **Đừng bịa một `object_key` không có thật.**

**Quan sát được** `[AGENT]` — tổng hợp từ (các) ticket, KHÔNG phải suy đoán

```
TIB-5606 — "Render artwork is incorrect when the text layer uses rainbow and align right"
(Bug, TIB Sprint 181; tạo 2026-10-21 17:23; dev chauptm chuyển QA Review 2026-10-21 18:03;
QA chienct chuyển Passed + Resolution Done 2026-10-22 15:40; PR teeinblue-api #4044 MERGED 2026-10-22 15:44;
tinhpt chuyển Done 2026-10-22 16:26. Fix Version: không có. Ngày release production: không rõ.)

Jira description (trangdh tạo từ Slack 2026-10-21):
- Currently: "Rainbow text in a campaign renders correctly in the artwork but drops characters in Locate Artwork
  and Order Design (reported by a buyer on store sharedgifts.com). The affected text is right-aligned; switching it
  to left alignment avoids the issue."
- Expectation: "Rainbow text renders all characters correctly in Locate Artwork and Order Design, regardless of
  text alignment." Campaign prod 1050909.

Comment dev chauptm "Context / logic changes" (comment 55257, 2026-10-21 17:35, sửa 17:46):
- Root cause: rainbow (color_type: letter) render bằng TextRenderer::renderSegmented(), mỗi segment màu đo riêng rồi
  cộng độ rộng → font script/italic phình rộng (Carattere "Elizabeth" 229px: 751.5px vs 636.1px) → chữ nối bị tách,
  text rộng hơn preview, căn phải/giữa đẩy text quá mép → mất ký tự cuối; autoscale co tên dài nhỏ hơn SDK.
- Change: vị trí x từng segment đo từ cả font run; tổng độ rộng (autoscale, canvas size, alignment) dùng cùng phép đo.
  "A letter-colored render is now exactly as wide as the same text in one color. Font fallback runs (different font)
  keep the previous behaviour."
- Tests: TextRendererTest::testRenderKeepsLetterJoinsWithLetterColors (fail trên code cũ: 865 vs 783); 35/35 pass.
  Domain doc dev nhắc tới: .ai/domain-business/text-letter-colors.md (QA không đọc được, không rõ ngày viết).
- Notes: design/preview đã render trước deploy không tự cập nhật, phải regenerate; chỉ PNG renderer (API) đổi,
  SVG renderer teeinblue-vectorize "was checked and is not affected".

Đáp án Slack #req-chienct (ts 1792640378.627569, 2026-10-22) — người trả lời là QA (chienct), ghi trong "Nhật ký chốt"
của RA analysis_TIB-5606.md: Q1 fix áp dụng cho mọi text rainbow (kể cả curve); Q2 chỉ Locate Artwork + Order Design;
Q3 báo merchant; Q4 phép đo có tính letter spacing + kerning; Q5 run font fallback giữ hành vi cũ.

Kết quả chạy test staging 2026-10-22 (task Testlane TIB-230, test-executor [AI], order staging #1105, 14 line item),
đọc lại actualResult ngày 2026-10-30 (KHÔNG theo status — status Testlane đã đổi sau lượt chạy):
- actualResult PASS: TC-TIB-6638, 6639, 6640, 6641, 6642, 6643, 6644, 6645, 6646, 6647, 6648, 6650, 6651 (curve, chỉ
  chạy căn giữa), 6652 (không tới được nhánh fallback).
- actualResult Fail: TC-TIB-6649 (BUG-363) — status Testlane hiện là "passed", lệch actualResult.
- actualResult Blocked: TC-TIB-6653 (status "skipped"), TC-TIB-6654 (status hiện là "passed", lệch actualResult).
- Mọi case script chạy bằng Dancing Script; staging không có Carattere (font case gốc); RTL dùng Heebo.

Phát hiện phụ: layer Curve Text không có tuỳ chọn căn lề (luôn center); localStorage teeinblue-customizations chỉ
còn ~10 entry gần nhất; emoji bị ô nhập storefront bỏ ngay lúc gõ.
```

- Nguồn: tổng hợp từ 1 ticket Jira (Done 2026-10-22) + comment dev chauptm + RA analysis_TIB-5606.md + actualResult 17 test case Testlane TIB-230 do agent chạy trên staging 2026-10-22; KHÔNG PHẢI quan sát trực tiếp trên production
- Thấy mấy lần / xác nhận trực tiếp mấy lần: 1 lượt chạy staging 2026-10-22 (theo actualResult: 14 Pass / 1 Fail / 2 Blocked); tự tái hiện bug gốc (trước fix): 0; quan sát trên production: 0

**Thử gì mà KHÔNG tái hiện / chưa thử gì** `[AGENT + BẠN]`

```
[AGENT]
- Chưa tái hiện bug gốc trước fix: staging đã có bản fix khi chạy, không có baseline trước deploy.
- Chưa thử font Carattere (staging không có) — mọi PASS script là trên Dancing Script; chưa xem lại artwork 1370428 /
  campaign 1050909 trên production sau khi ticket Done 2026-10-22.
- Chưa thử Curve Text căn phải (layer Curve Text không có tuỳ chọn căn lề); TC-TIB-6651 chỉ chạy căn giữa.
- Chưa kiểm nhánh font fallback: emoji bị chặn ở ô nhập storefront nên không tới renderer (TC-TIB-6652).
- Chưa kiểm regenerate design đơn cũ (TC-TIB-6653 blocked) và SVG vector export (TC-TIB-6654 blocked, URL .svg/.pdf/.eps 403).
- Chưa kiểm thumbnail artwork / mockup server-side / ảnh product trên store (Q2 nói không ảnh hưởng — chưa xác minh).
- Chưa kiểm Warp Text + rainbow, sequence do buyer chọn (Populate Color from another option).
- Không có lượt chạy lại nào sau 2026-10-22; không có bằng chứng production.
[BẠN]
⏳ CHỜ BẠN: bạn đã tự thử gì trên staging/production mà kết quả test trên Testlane không ghi (vd đã tự xem case gốc artwork 1370428 / campaign 1050909 trên prod sau khi ticket Done 2026-10-22 chưa)?
⏳ CHỜ BẠN: hỏi Dev (chauptm) — BUG-363 (rainbow + multi-stroke 3 lớp có sợi màu chữ đè lên stroke ở chỗ nối, Order Design PNG) có từ trước bản fix TIB-5606 hay do fix mới gây ra (OQ-artwork-126)? Có trích được câu trả lời + link + ngày không?
⏳ CHỜ BẠN: hỏi Dev — xin nội dung + ngày viết của domain doc ".ai/domain-business/text-letter-colors.md" (dev nhắc trong comment 55257); có thì các claim CLAIM-02/12/13/14 nâng được lên dev_doc.
⏳ CHỜ BẠN: hỏi Dev — PNG renderer của teeinblue-api còn sinh ảnh nào khác ngoài Locate Artwork + Order Design (thumbnail artwork, mockup server-side, ảnh product)? Cần câu trả lời có trích dẫn để CLAIM-15 có nguồn.
⏳ CHỜ BẠN: hỏi Dev/PO — layer Curve Text không có tuỳ chọn căn lề (luôn center) là thiết kế hay thiếu sót (CLAIM-16)?
```

## Phần 1a — Phạm vi thay đổi & ảnh hưởng ước tính `[AGENT]` — BẮT BUỘC

> Mục này khác "Quan sát được" ở trên: nó không mô tả CÁI GÌ đã xảy ra, mà là **CẦN LÀM GÌ TIẾP**. Agent nhận CCR đọc xong phải biết ngay việc cần làm và phạm vi ảnh hưởng dây chuyền — không phải tự dò lại từ ticket gốc.

Một dòng cho MỖI claim/ticket riêng biệt trong "Quan sát được":

| Claim ID | Thay đổi / claim | Surface liên quan | Nguồn & độ mạnh | Object/feature/checklist bị ảnh hưởng | Quan hệ với canon |
|---|---|---|---|---|---|
| `CLAIM-01` | TIB-5606 — rainbow Single-line, font script, stroke 1 lớp, căn phải: Locate Artwork và Order Design PNG hiện đủ ký tự, chữ nối liền, mép phải trong printarea, khớp SDK preview (lệch ≤1px) | portal (Campaign editor → Locate artwork) · api (PNG renderer Order Design) | `test_case` — PASS TC-TIB-6638 2026-10-22 staging [AI]; PASS TC-TIB-6639 2026-10-22 staging [AI] — build: staging @ 2026-10-22 14:20 — sau lần TIB-5606 giao QA cuối (2026-10-21 18:03); Jira Passed 2026-10-22 15:40, Done 2026-10-22 16:26; build hash: không rõ (QA không có quyền repo) | artwork / text-color-sequence-render (KB-146..KB-156, chưa map được từng id) | `UNKNOWN` |
| `CLAIM-02` | TIB-5606 — case gốc font Carattere (artwork prod 1370428, 3 màu, stroke, căn phải) sau fix hiện đủ ký tự ở Locate Artwork + Order Design | api (PNG renderer) · portal (Locate artwork) | `KHÔNG CÓ NGUỒN` — staging không có font Carattere, mọi PASS là Dancing Script (TC-TIB-6638/6639); comment dev chỉ nêu nguyên nhân đo trên Carattere, không xác nhận kết quả sau fix; chưa ai kiểm trên production | artwork / text-color-sequence-render; font (Carattere) | `ADD` |
| `CLAIM-03` | TIB-5606 — rainbow căn giữa và căn trái: Locate Artwork + Order Design đủ ký tự, vị trí và độ rộng khớp SDK preview (lệch ≤1px) | portal (Locate artwork) · api (Order Design PNG) | `test_case` — PASS TC-TIB-6640 2026-10-22 staging [AI]; PASS TC-TIB-6641 2026-10-22 staging [AI] — build: staging @ 2026-10-22 14:20 — sau lần TIB-5606 giao QA cuối (2026-10-21 18:03); build hash: không rõ (QA không có quyền repo) | artwork / text-color-sequence-render | `UNKNOWN` |
| `CLAIM-04` | TIB-5606 — text rainbow rộng đúng bằng cùng text đó ở 1 màu (Order Design PNG chênh 0px, Locate Artwork mép phải trùng) | api (Order Design PNG) · portal (Locate artwork) | `test_case` — PASS TC-TIB-6642 2026-10-22 staging [AI] — build: staging @ 2026-10-22 14:20 — sau lần TIB-5606 giao QA cuối (2026-10-21 18:03); build hash: không rõ (QA không có quyền repo) | artwork / text-color-sequence-render | `UNKNOWN` |
| `CLAIM-05` | TIB-5606 — rainbow tên dài (32 ký tự) kích hoạt autoscale: co vừa printarea, đủ ký tự, độ rộng không nhỏ hơn SDK preview (chênh 2px) | api (Order Design PNG) · storefront (SDK preview) | `test_case` — PASS TC-TIB-6643 2026-10-22 staging [AI] — build: staging @ 2026-10-22 14:20 — sau lần TIB-5606 giao QA cuối (2026-10-21 18:03); build hash: không rõ (QA không có quyền repo) | artwork / text-color-sequence-render | `UNKNOWN` |
| `CLAIM-06` | TIB-5606 — rainbow font thường (Roboto) và text 1 màu font script, căn phải: đủ ký tự, khớp SDK preview (lệch ≤2px). KHÔNG claim "không đổi so với trước fix" (không có baseline) | api (Order Design PNG) · portal (Locate artwork) | `test_case` — PASS TC-TIB-6644 2026-10-22 staging [AI]; PASS TC-TIB-6645 2026-10-22 staging [AI] — build: staging @ 2026-10-22 14:20 — sau lần TIB-5606 giao QA cuối (2026-10-21 18:03); build hash: không rõ (QA không có quyền repo) | artwork / text-color-sequence-render | `UNKNOWN` |
| `CLAIM-07` | TIB-5606 — phép đo theo run tính letter spacing (cả 3 kiểu căn) và kerning (cặp AV, Wa, To): khớp SDK preview, căn phải không mất ký tự cuối | api (Order Design PNG) · portal (Locate artwork) | `test_case` — PASS TC-TIB-6646 2026-10-22 staging [AI]; PASS TC-TIB-6647 2026-10-22 staging [AI] — build: staging @ 2026-10-22 14:20 — sau lần TIB-5606 giao QA cuối (2026-10-21 18:03); build hash: không rõ (QA không có quyền repo) | artwork / text-color-sequence-render | `UNKNOWN` |
| `CLAIM-08` | TIB-5606 — rainbow + stroke 1 lớp, font script: stroke bám theo từng chữ, liền mạch, không hở/chồng ở chỗ đổi màu (Order Design PNG) | api (Order Design PNG) | `test_case` — PASS TC-TIB-6648 2026-10-22 staging [AI] — build: staging @ 2026-10-22 14:20 — sau lần TIB-5606 giao QA cuối (2026-10-21 18:03); build hash: không rõ (QA không có quyền repo) | artwork / text-color-sequence-render; text-multi-stroke | `UNKNOWN` |
| `CLAIM-09` | TIB-5606 — rainbow + multi-stroke 3 lớp căn phải: Order Design PNG có sợi màu chữ vẽ đè lên lớp stroke ở mọi chỗ nối chữ (BUG-363, known defect); SDK preview sạch; đủ ký tự, 3 lớp đúng thứ tự. **Có thể làm SAI** check multi-stroke đang coi "rainbow takes multi-stroke normally" là oracle | api (Order Design PNG) | `KHÔNG CÓ NGUỒN` — TC-TIB-6649 actualResult Fail 2026-10-22, BUG-363 (status Testlane "passed" lệch actualResult); chưa có Dev xác nhận lỗi mới hay cũ | artwork / text-color-sequence-render (KB-154, CHK-008); text-multi-stroke checklist | `UNKNOWN` |
| `CLAIM-10` | TIB-5606 — rainbow + RTL (cờ "Right to Left text"), căn phải: đủ ký tự, hướng phải sang trái, màu từng chữ cùng thứ tự SDK preview (lệch ≤1px) | api (Order Design PNG) · storefront (SDK preview) | `test_case` — PASS TC-TIB-6650 2026-10-22 staging [AI] — build: staging @ 2026-10-22 14:20 — sau lần TIB-5606 giao QA cuối (2026-10-21 18:03); build hash: không rõ (QA không có quyền repo) | artwork / text-color-sequence-render | `UNKNOWN` |
| `CLAIM-11` | TIB-5606 — Curve Text + rainbow (layer luôn căn giữa): Locate Artwork + Order Design đủ ký tự, đúng màu, khớp SDK preview (lệch ≤1px). KHÔNG claim fix cho curve căn phải | portal (Locate artwork) · api (Order Design PNG) | `test_case` — PASS TC-TIB-6651 2026-10-22 staging [AI] — build: staging @ 2026-10-22 14:20 — sau lần TIB-5606 giao QA cuối (2026-10-21 18:03); build hash: không rõ (QA không có quyền repo) | artwork / text-color-sequence-render | `UNKNOWN` |
| `CLAIM-12` | TIB-5606 — run dùng font fallback (font khác font layer) giữ hành vi cũ của PNG renderer, không theo phép đo mới (có thể vẫn lệch/mất chữ khi căn phải) | api (PNG renderer, nhánh fallback) | `po_dev_confirm` — "Font fallback runs (different font) keep the previous behaviour." — https://ownego.atlassian.net/browse/TIB-5606?focusedCommentId=55257 | artwork / text-color-sequence-render | `ADD` |
| `CLAIM-13` | TIB-5606 — preview/order design đã render trước deploy không tự cập nhật; phải regenerate design bị ảnh hưởng | portal (Orders → Re-generate design) · api (regenerate design) | `po_dev_confirm` — "Already-rendered previews/order designs (e.g. users/29106/artworks/6ad88a95861b5.png) do not update themselves; regenerate the affected designs after deploy." — https://ownego.atlassian.net/browse/TIB-5606?focusedCommentId=55257 | artwork / text-color-sequence-render; order (regenerate design) | `ADD` |
| `CLAIM-14` | TIB-5606 — chỉ PNG renderer (teeinblue-api) đổi; SVG renderer teeinblue-vectorize không bị ảnh hưởng, rainbow trong SVG có hình glyph giống text 1 màu | api (vector export) | `po_dev_confirm` — "Only the PNG renderer (API) is changed. The SVG renderer in teeinblue-vectorize was checked and is not affected" — https://ownego.atlassian.net/browse/TIB-5606?focusedCommentId=55257 | artwork / text-color-sequence-render | `ADD` |
| `CLAIM-15` | TIB-5606 — ảnh bị ảnh hưởng chỉ gồm Locate Artwork + Order Design; thumbnail, mockup server-side, ảnh product không đổi | api (thumbnail, mockup render) · storefront (ảnh product) | `KHÔNG CÓ NGUỒN` — chỉ có đáp án Q2 của QA (chienct) trên Slack 2026-10-22, không phải PO/Dev; comment dev chỉ nói PNG renderer đổi, không liệt kê ảnh nào dùng PNG renderer; chưa test | artwork / text-color-sequence-render; campaign; mockup | `ADD` |
| `CLAIM-16` | Phát hiện phụ — layer Curve Text không có tuỳ chọn căn lề (layer lưu align center) | portal (artwork editor, layer Curve Text) | `KHÔNG CÓ NGUỒN` — quan sát 1 lần khi dựng fixture 2026-10-22, ghi trong actualResult TC-TIB-6651; chưa Dev/PO xác nhận thiết kế hay thiếu | artwork / layer-config-text (KB-157, CHK-009) | `UNKNOWN` |
| `CLAIM-17` | Phát hiện phụ — localStorage teeinblue-customizations chỉ còn ~10 entry gần nhất; entry cũ bị đẩy ra / ghi đè khi thêm nhiều product | storefront (localStorage) | `KHÔNG CÓ NGUỒN` — quan sát phụ trong actualResult TC-TIB-6640, TC-TIB-6643 ngày 2026-10-22, không phải case kiểm hành vi này; chưa Dev/spec | sdk / storefront-buyer-facing (KB-066, CHK-050..051) | `UNKNOWN` |

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
| `CLAIM-01` | `artwork` | `text-color-sequence-render` | merchant/staff (Locate artwork, Order Design) | portal · api | KB-146..KB-156 (canon v7, bản clone chưa có — chưa map từng id) |
| `CLAIM-02` | `artwork` | `text-color-sequence-render` | merchant/staff | portal · api | không có (S0 ở CBS-008, chưa nạp) |
| `CLAIM-03` | `artwork` | `text-color-sequence-render` | merchant/staff | portal · api | KB-146..KB-156 (chưa map từng id) |
| `CLAIM-04` | `artwork` | `text-color-sequence-render` | merchant/staff | api · portal | KB-146..KB-156 (chưa map từng id) |
| `CLAIM-05` | `artwork` | `text-color-sequence-render` | merchant/staff · buyer (SDK preview đối chiếu) | api · storefront | KB-146..KB-156 (chưa map từng id) |
| `CLAIM-06` | `artwork` | `text-color-sequence-render` | merchant/staff | api · portal | KB-146..KB-156 (chưa map từng id) |
| `CLAIM-07` | `artwork` | `text-color-sequence-render` | merchant/staff | api · portal | KB-146..KB-156 (chưa map từng id) |
| `CLAIM-08` | `artwork` | `text-color-sequence-render` | merchant/staff | api | KB-146..KB-156 (chưa map từng id) |
| `CLAIM-09` | `artwork` | `text-color-sequence-render` | merchant/staff | api | KB-154 |
| `CLAIM-10` | `artwork` | `text-color-sequence-render` | merchant/staff · buyer | api · storefront | KB-146..KB-156 (chưa map từng id) |
| `CLAIM-11` | `artwork` | `text-color-sequence-render` | merchant/staff | portal · api | KB-146..KB-156 (chưa map từng id) |
| `CLAIM-12` | `artwork` | `text-color-sequence-render` | merchant/staff | api | không có (S0 ở CBS-008, chưa nạp) |
| `CLAIM-13` | `artwork` | `text-color-sequence-render` | merchant/staff | portal · api | không có (S0 ở CBS-008, chưa nạp) |
| `CLAIM-14` | `artwork` | `text-color-sequence-render` | merchant/staff | api | không có (S0 ở CBS-008, chưa nạp) |
| `CLAIM-15` | `artwork` | `text-color-sequence-render` | merchant/staff · buyer | api · storefront | không có (S0 ở CBS-008, chưa nạp) |
| `CLAIM-16` | `artwork` | `layer-config-text` | merchant/staff (artwork editor) | portal | KB-157 |
| `CLAIM-17` | `sdk` | `storefront-buyer-facing` | buyer (guest) | storefront | KB-066 (sdk) |

- **`scope.role` ở đây KHÁC "Role liên quan" ở Phần 2.** Phần 2 là **dữ kiện** (quan sát bằng tài khoản gì / ticket nêu role nào). Cột này là **chỉ định**: KB item này áp dụng cho role nào. Hai thứ có thể khác nhau hoàn toàn — quan sát bằng tài khoản admin nhưng hành vi áp cho buyer.
- **`scope.environment` không hỏi người gửi** — xem phụ lục product.
- `feature_key` ghi `"MỚI: …"` chỉ là **đề xuất tên**; agent xử lý CCR quyết định cuối và có thể đổi slug.
- Cột "Quan hệ với canon" là `SUPERSEDES` thì **bắt buộc** có `kb_id` ở bảng này **và** có ngày nguồn ở Phần 5.1. Thiếu một trong hai → claim bị xử lý là `CONTRADICTS` (giữ cả hai phía, chờ người phân xử), **không** ghi đè.

---

# Phần 2 — Thấy nó ở đâu `[AGENT]`

- **URL / ID cụ thể đã biết:** Jira https://ownego.atlassian.net/browse/TIB-5606 (comment dev 55257) · PR https://github.com/qikify/teeinblue-api/pull/4044 · case gốc prod: campaign 1050909, artwork 1370428 (store sharedgifts.com) · staging instance 520 / store nprice1: artwork #5256, #5258–#5268, campaign #3129–#3131, #3133–#3141 (nprice1.myshopify.com/products/cp-5606-*), order #1105 (https://staging-portal.teeinblue.com/orders/4762) · Testlane task TIB-230 (TC-TIB-6638…6654), BUG-363 · endpoint POST /api/merchant/shopify/customization
- **Trạng thái đối tượng lúc đó:** ticket gốc: rainbow căn phải trên prod mất ký tự cuối ở Locate Artwork + Order Design; lúc test: staging đã có bản fix (dev giao QA 2026-10-21 18:03), fixture AW 2.0 Single-line Text / Curve Text, Color sequences 3 màu, font Dancing Script (Heebo cho RTL), campaign publish lên nprice1, order Bogus #1105 đã tạo design
- **Environment** (nơi quan sát / nơi ticket mô tả, **KHÔNG** nhất thiết là môi trường agent sẽ dùng để verify): staging (lượt test 2026-10-22) · production (ticket gốc)
  > Kiểm chính sách môi trường ở phụ lục product trước khi coi trường này là blocking — nhiều dự án cố định môi trường verify (vd chỉ staging) độc lập với nơi bug gốc được quan sát. Ghi "không rõ" hay "production" **không** làm CCR bị chặn.
- **Role liên quan:** guest buyer (personalize + đặt hàng trên storefront) · merchant/staff (Locate artwork, xem Order Design)
- **Surface:** `portal` · `storefront` · `api` · `db`

Không có URL của surface mà bạn không có quyền? **Bình thường.** Gửi thứ bạn có; agent tự map sang target của nó.

---

# Phần 3 — Để không sinh conflict giả `[AGENT]`

> Phần lớn "conflict" phát sinh không phải mâu thuẫn thật, mà do hai quan sát đều đúng nhưng không ai ghi rõ chúng chạy trên build nào.

Với MỖI ticket:

- **Build / version / ngày deploy:** TIB-5606: staging @ 2026-10-22 14:20 — sau lần TIB-5606 giao QA cuối (2026-10-21 18:03); PR teeinblue-api #4044 merged 2026-10-22 15:44; Fix Version: không có; ngày release production: không rõ; build hash: không rõ (QA không có quyền repo)
- **Ngày resolve/update cuối:** 2026-10-22
- **Đã ship chưa:** Jira Resolution Done (QA chuyển Passed 2026-10-22 15:40, status Done 2026-10-22 16:26), PR merged — ngày lên production không rõ

> "Không rõ build" **tự nó là thông tin quan trọng** — agent sẽ biết là không thể kết luận hành vi này "mới hơn" hay "cũ hơn" canon chỉ dựa vào đây.
>
> "Chưa ship" **không** làm CCR bị loại, nhưng nó đổi kết quả: claim về hành vi chưa ship sẽ vào KB dưới dạng đề xuất, không đụng canon hiện tại.

**Context hiện đang nói gì** `[AGENT]` — tra canon TRƯỚC khi gửi, chỉ cần chép lại

- Context version đang dùng: bản clone qa-knowledge local (manifest.json generated_at 2026-10-30): artwork published_context_version 5, sdk 5 — CHƯA có bản publish theo CBS-008. Theo results Proposal CBS-008 (done 2026-10-26): context builder đã publish artwork v7, sdk v8, "Chưa phát hành sang repo qa-knowledge (chờ operator)"
- Canon hiện nói: (1) Bản clone local: không có feature text-color-sequence-render; không có KB nào về render rainbow/Color Sequence, căn lề Curve Text hay giới hạn entry của teeinblue-customizations. Item gần nhất: KB-041: "color có ghi chú mục đích tương tự Font: 'This color option appears on the personalization form and can be reused by text-based layers through retrieval'. Field riêng: 'Color options: Solid Color category/Color Sequence categories/Color picker', 'Select default value:', 'Populate to other layers: Select layers'. Đáng chú ý: color KHÔNG xuất hiện được làm nguồn Conditional Setting dù có đầy đủ Option Title (xem evidence capture Conditional Setting — carried tới KB-064 v2/KB-031 v1), khác Font là CÓ xuất hiện được." ▸ (2) Canon v7/v8 theo results CBS-008 (không đọc được nội dung từng item): "Artwork có feature mới text-color-sequence-render (KB-146..KB-156, CHK-001..CHK-019). Trong đó KB-154 (rainbow + multi-stroke 3 lớp làm hiện sợi màu chữ đè lên stroke ở chỗ nối chữ, BUG-363) được đánh dấu KNOWN_DEFECT và chỉ dùng làm defect watch (CHK-008), không làm oracle. Artwork layer-config-text thêm KB-157 (Curve Text không có tuỳ chọn căn lề) và CHK-009. Sdk storefront-buyer-facing thêm KB-066 (localStorage teeinblue-customizations chỉ giữ khoảng 10 entry gần nhất) cùng CHK-050..051. Toàn bộ item là OBSERVED_CURRENT/LOW … 12/17 claim được nạp; CLAIM-02, 12, 13, 14, 15 là S0." ▸ (3) (context local, không phải canon qa-knowledge): teeinblue/TIB automation/context/artwork.md → Text layer multi-stroke: "Color Sequence ("rainbow") text takes multi-stroke normally." (verified 2026-10-01, TC-TIB-4045) — mâu thuẫn với CLAIM-09; cùng file → "Rainbow (Color Sequence) alignment + segmented render (TIB-5606 / TIB-230, verified on staging 2026-10-22)" ghi lại chính lượt chạy này
- Đã tra bằng từ khoá nào: stroke, curve text align, color sequence, letter color, rainbow, regenerate, vector, svg, teeinblue-customizations, 10 entr — trong qa-knowledge/products/teeinblue/{artwork,sdk,order}/features/*/kb.json, artwork/open-questions.md, _registry.json, manifest.json; context local: artwork.md (rainbow, TIB-5606, multi-stroke); Proposal CBS-008 (get_proposal + list_context_board_proposals)
- Không tra được canon (không có quyền truy cập knowledge base đích)? Ghi rõ "không tra được — cần agent tự tra lại", **đừng suy đoán** canon nói gì.

---

# Phần 4 — Hai câu chỉ con người trả lời được `[BẠN]`

## 4.1 Có ai xác nhận đây là hành vi ĐÚNG không?

Field này quyết định knowledge có **dùng làm expected result** được hay không.

- Ai xác nhận: Dev (chauptm) cho CLAIM-12/13/14 qua comment Jira 55257; test case đã PASS (test-executor [AI]) cho CLAIM-01, 03–08, 10, 11; PO/business: KHÔNG AI — đáp án Q1–Q5 trên Slack do QA (chienct) trả lời, không phải PO. ⏳ CHỜ BẠN: có PO/business xác nhận nào ngoài Jira/Slack không (đặc biệt cho Q1 curve, Q2 phạm vi ảnh, Q5 fallback)?
- Ở đâu, ngày nào: comment Jira 55257 của chauptm trên TIB-5606, 2026-10-21 17:35 (sửa 17:46) · TC-TIB-6638…6648, 6650, 6651 PASS 2026-10-22 staging [AI], build staging @ 2026-10-22 14:20 · Slack #req-chienct ts 1792640378.627569, 2026-10-22 (QA, không tính)
- Họ xác nhận chính xác điều gì: "A letter-colored render is now exactly as wide as the same text in one color. Font fallback runs (different font) keep the previous behaviour." ▸ "Already-rendered previews/order designs (e.g. users/29106/artworks/6ad88a95861b5.png) do not update themselves; regenerate the affected designs after deploy." ▸ "Only the PNG renderer (API) is changed. The SVG renderer in teeinblue-vectorize was checked and is not affected: it lays out the glyphs of the whole string in one pass (font.forEachGlyph with kerning) and letter colors only change each glyph's fill."

> Comment kỹ thuật dev tự viết trong ticket (kể cả "Ready to test", "Resolution: Done") **KHÔNG PHẢI** PO/business sign-off. Không ai xác nhận thật sự → knowledge vào context dưới dạng "đã quan sát thấy", **không** dùng làm expected result. Đây là cố ý, không phải hạn chế.
>
> **Nhưng tài liệu dev sinh từ source code thì CÓ tính** (`dev_doc`) — nó khác một comment tiện tay ở chỗ nó được generate có hệ thống từ code và được dev chủ động gửi như mô tả chính thức. Khi đó knowledge vào context dưới dạng **hành vi đúng** và **sẽ được dùng làm expected result cho test hằng ngày**. Đây là quyền lực thật — chỉ ghi khi bạn có tên tài liệu + version + ngày + trích dẫn thật.
>
> Mục này chính là nguồn cho cột "Nguồn & độ mạnh" ở Phần 1a — trả lời "PO/Dev"/"test case"/"dev doc" ở đây mà không kèm quote/link/id/ngày cụ thể thì cột đó vẫn phải ghi `KHÔNG CÓ NGUỒN`.

## 4.2 KHÔNG đề xuất điều gì?

**Bắt buộc.** Đây là cái chặn agent nhận CCR nâng quan sát/mô tả ticket lên thành "hành vi đúng" quá tay.

```
- Mọi PASS là trên staging 2026-10-22 với font thay thế (Dancing Script; Heebo cho RTL) — không phải bằng chứng cho
  font Carattere của case gốc, cũng không phải bằng chứng production.
- Số đo bbox (vd 624–912, w=288, lệch ≤1–2px) chỉ là số đo tại lượt chạy đó, không phải ngưỡng chuẩn.
- Không claim "font thường / text 1 màu không đổi so với trước fix" — không có baseline trước deploy (CLAIM-06 chỉ claim
  khớp SDK preview).
- Không claim "fix áp dụng cho Curve Text căn phải" — chỉ chạy được curve căn giữa (CLAIM-11); đáp án Q1 là của QA.
- Không đề xuất sửa/xoá câu "rainbow takes multi-stroke normally" thành hành vi đúng hay sai — BUG-363 chưa được Dev
  xác nhận là lỗi mới hay lỗi cũ; CLAIM-09 chỉ là defect watch.
- Không coi giới hạn fallback/emoji là hành vi đúng vĩnh viễn — Dev nói giữ hành vi cũ, không nói đó là hành vi mong muốn;
  cách ghi nhận known issue còn treo (Q7 của RA).
- Không coi "Curve Text không có tuỳ chọn căn lề" và "localStorage chỉ giữ ~10 entry" là thiết kế đã chốt — mới quan sát 1 lần.
- Không coi đáp án Slack Q1–Q5 của QA là PO sign-off.
- Không đề xuất object/feature mới ngoài feature text-color-sequence-render context builder đã tạo ở CBS-008.
- Status Testlane của TC-TIB-6649 và TC-TIB-6654 ("passed") KHÔNG phải kết quả — actualResult là Fail / Blocked.
```

## 4.3 Đề xuất context nên nói gì `[AGENT soạn, BẠN duyệt]`

```
artwork / text-color-sequence-render:
- PNG renderer (Locate Artwork + Order Design) đặt từng segment màu của text Color Sequence theo phép đo cả font run,
  nên text rainbow rộng đúng bằng cùng text ở 1 màu; căn phải / giữa / trái đều đủ ký tự và khớp SDK preview; phép đo
  có tính letter spacing, kerning, autoscale (không co nhỏ hơn SDK), stroke 1 lớp liền ở chỗ nối, RTL giữ màu từng chữ
  (test case PASS staging 2026-10-22, font Dancing Script).
- Run dùng font fallback giữ hành vi cũ (Dev, 2026-10-21) — có thể vẫn lệch/mất chữ khi căn phải.
- Design đã render trước khi deploy fix không tự cập nhật; phải Re-generate design (Dev, 2026-10-21).
- Chỉ PNG renderer đổi; SVG renderer teeinblue-vectorize không bị ảnh hưởng (Dev, 2026-10-21).
- Known defect BUG-363: rainbow + multi-stroke 3 lớp, Order Design PNG có sợi màu chữ đè lên stroke ở chỗ nối chữ
  (staging 2026-10-22) — defect watch, không làm oracle.
artwork / layer-config-text: layer Curve Text không có tuỳ chọn căn lề (quan sát 2026-10-22, chưa xác nhận).
sdk / storefront-buyer-facing: teeinblue-customizations có thể chỉ giữ ~10 entry gần nhất — khi kiểm sau ATC nhiều
  product, đọc ngay sau từng lần ATC (quan sát 2026-10-22, chưa xác nhận).
```

## 4.4 Mức độ gấp `[BẠN]`

`HIGH` (đang chặn test P0/P1) · `MEDIUM` (ảnh hưởng coverage) · `LOW` (cải thiện dần)

---

# Phần 5 — Evidence `[AGENT]`

## 5.1 Nguồn & evidence theo từng claim — một block cho MỖI Claim ID ở Phần 1a

### CLAIM-01

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** TC-TIB-6638 · TC-TIB-6639 (Testlane task TIB-230)
- **Link:** https://staging-portal.teeinblue.com/orders/4762 (order #1105) · https://staging-portal.teeinblue.com/campaigns/3129/edit
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-22
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor [AI] (agent QA), lượt chạy của QA chienct
- **Trích nguyên văn:**
  ```
  TC-TIB-6638: "Locate Artwork hiển thị đủ 9 ký tự "Elizabeth", màu đỏ/xanh/vàng lặp lại, chữ nối liền; mép phải chữ "h"
  ở x=913/1400 nên nằm trong printarea. Đo ink bbox: Locate 623–913, Order Design PNG 624–912, SDK preview 624–913
  (lệch ≤1px). Pass trên Dancing Script, chưa kiểm được trên Carattere (staging không có font)."
  TC-TIB-6639: "Order #1105 (Bogus gateway, 14 line item): Order Design PNG của CP-5606-SCRIPT đủ 9 ký tự "Elizabeth",
  đúng màu từng chữ, stroke đen đầy đủ, căn phải, không tràn mép. Ink bbox PNG 624–912 (w=288) so với SDK preview
  624–913 (w=289). Pass trên Dancing Script, chưa kiểm được trên Carattere."
  ```
- **File đính kèm cho claim này:** không có (ảnh nằm trong actualResult Testlane)

### CLAIM-02

- **Loại nguồn** (đúng 1): `KHÔNG CÓ NGUỒN`
- **Locator:** comment Jira 55257 (nguyên nhân) · TC-TIB-6638/6639 (chạy trên font thay thế)
- **Link:** https://ownego.atlassian.net/browse/TIB-5606?focusedCommentId=55257
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-21
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** chauptm (Dev) — mô tả nguyên nhân, không xác nhận kết quả sau fix trên Carattere
- **Trích nguyên văn:**
  ```
  "In script and italic fonts the glyphs measured alone add up wider than the whole word (e.g. Carattere "Elizabeth"
  at 229px: 751.5px vs 636.1px)"
  "Possible test cases: [ ] Artwork 1370428 ("Elizabeth", Carattere, 3 letter colors, stroke, right-aligned): Locate
  Artwork / Order Design shows all letters, connected, and in the same position as the SDK live preview" (chưa tick)
  ```
- **File đính kèm cho claim này:** không có

### CLAIM-03

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** TC-TIB-6640 · TC-TIB-6641
- **Link:** https://staging-portal.teeinblue.com/campaigns/3130/edit · https://staging-portal.teeinblue.com/campaigns/3131/edit
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-22
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor [AI] (agent QA)
- **Trích nguyên văn:**
  ```
  TC-TIB-6640: "Căn giữa đúng: Locate Artwork ink 556–845 (trái 556px, phải 1400-845=555px), Order Design PNG 556–844,
  SDK preview 556–845; đủ 9 ký tự, không lệch phải. Pass trên Dancing Script, chưa kiểm được trên Carattere."
  TC-TIB-6641: "Căn trái đúng và không đổi: Locate Artwork ink 488–778, Order Design PNG 489–777, SDK preview 488–777;
  đủ 9 ký tự. Lưu ý: fixture đặt layer ở giữa printarea nên chữ bắt đầu ở x≈488, không sát mép trái printarea; chỉ đối
  chiếu theo SDK preview (khớp ≤1px)."
  ```
- **File đính kèm cho claim này:** không có

### CLAIM-04

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** TC-TIB-6642
- **Link:** https://staging-portal.teeinblue.com/orders/4762
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-22
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor [AI] (agent QA)
- **Trích nguyên văn:**
  ```
  "Cùng order #1105, 2 line item text "Elizabeth": Order Design PNG rainbow (SCRIPT) ink 624–912, w=288; text 1 màu
  (SOLID) ink 624–912, w=288; chênh 0px (ngưỡng ≤2px), chỉ khác màu chữ. Locate Artwork: SCRIPT 623–913, SOLID 623–913,
  mép phải trùng nhau."
  ```
- **File đính kèm cho claim này:** không có

### CLAIM-05

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** TC-TIB-6643
- **Link:** https://staging-portal.teeinblue.com/orders/4762
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-22
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor [AI] (agent QA)
- **Trích nguyên văn:**
  ```
  "Text 32 ký tự "Elizabeth Alexandra Mary Windsor" autoscale co lại vừa printarea, đủ 32 ký tự, căn phải. Order Design
  PNG ink 495–910 (w=415), SDK preview 493–910 (w=417): chênh 2px, không nhỏ hơn SDK."
  ```
- **File đính kèm cho claim này:** không có

### CLAIM-06

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** TC-TIB-6644 · TC-TIB-6645
- **Link:** https://staging-portal.teeinblue.com/campaigns/3134/edit · https://staging-portal.teeinblue.com/campaigns/3133/edit
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-22
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor [AI] (agent QA)
- **Trích nguyên văn:**
  ```
  TC-TIB-6644: "Font Roboto + rainbow căn phải: đủ 9 ký tự, 3 màu. Order Design PNG ink 560–905, SDK preview 558–904,
  Locate Artwork 558–904 (lệch ≤2px). Không có baseline trước fix để so."
  TC-TIB-6645: "Text 1 màu (đỏ), font script, căn phải: đủ 9 ký tự, Order Design PNG ink 624–912, SDK preview 624–913
  (lệch ≤1px), cùng cỡ chữ. Không có baseline trước deploy để so, chỉ đối chiếu SDK."
  ```
- **File đính kèm cho claim này:** không có

### CLAIM-07

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** TC-TIB-6646 · TC-TIB-6647
- **Link:** https://staging-portal.teeinblue.com/orders/4762
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-22
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor [AI] (agent QA)
- **Trích nguyên văn:**
  ```
  TC-TIB-6646: "Letter spacing ≠ 0, cả 3 kiểu căn, cùng order #1105 (3 line item). Đủ 9 ký tự, căn phải không mất "h".
  Ink PNG / SDK / Locate: Phải 620–912 / 620–913 / 620–913; Giữa 554–846 / 554–847 / 554–847; Trái 488–780 / 488–780 /
  488–781. Độ rộng ≈292–293px, lớn hơn bản không spacing (288px) nên spacing đã được áp dụng ở cả SDK và PNG"
  TC-TIB-6647: "Font Roboto rainbow căn phải, text "AVATAR Wave To": đủ 14 ký tự (4 màu lặp), các cặp AV, Wa, To sát
  nhau đúng như SDK preview (có kerning). Order Design PNG ink 494–906, SDK preview 493–906 (lệch ≤1px)."
  ```
- **File đính kèm cho claim này:** không có

### CLAIM-08

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** TC-TIB-6648
- **Link:** https://staging-portal.teeinblue.com/orders/4762
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-22
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor [AI] (agent QA)
- **Trích nguyên văn:**
  ```
  "Dùng lại order #1105 của CP-5606-SCRIPT. Phóng 500% vùng nối giữa các chữ (E-l-i-z-a-b): stroke đen bám theo từng
  chữ, liền mạch, không hở và không chồng ở chỗ đổi màu; giống SDK preview. Pass trên Dancing Script, chưa kiểm được
  trên Carattere."
  ```
- **File đính kèm cho claim này:** không có

### CLAIM-09

- **Loại nguồn** (đúng 1): `KHÔNG CÓ NGUỒN`
- **Locator:** TC-TIB-6649 (actualResult Fail) · BUG-363
- **Link:** https://staging-portal.teeinblue.com/campaigns/3139/edit · https://staging-portal.teeinblue.com/orders/4762
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-22
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor [AI] (agent QA); chưa Dev xác nhận
- **Trích nguyên văn:**
  ```
  "Fail — Order Design PNG của rainbow + multi-stroke có đường chỉ màu chữ cắt ngang các lớp stroke ở chỗ nối giữa các
  chữ; SDK preview không có. Actual: ở mỗi chỗ nối chữ (E-l, l-i, i-z, z-a, a-b, b-e, e-t, t-h) xuất hiện sợi mảnh màu
  đỏ/xanh/vàng (màu của chữ) vẽ đè lên lớp stroke trắng và đen; thêm vài chấm lấm tấm trong chữ "l". Phóng 500% thấy rõ.
  Expected: 3 lớp stroke trắng/đen/xanh liền mạch, không bị cắt, giống SDK preview. Các phần còn lại đúng: đủ 9 ký tự,
  3 lớp stroke đúng thứ tự, căn phải không tràn (PNG ink 617–919, SDK 617–919, Locate 618–919)."
  ```
- **File đính kèm cho claim này:** không có (ảnh trong actualResult TC-TIB-6649 và BUG-363)

### CLAIM-10

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** TC-TIB-6650
- **Link:** https://staging-portal.teeinblue.com/campaigns/3140/edit
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-22
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor [AI] (agent QA)
- **Trích nguyên văn:**
  ```
  "Rainbow + RTL (font Heebo, cờ "Right to Left text" bật), text "שלום עולם": đủ 9 ký tự, hướng phải sang trái, màu từng
  chữ cùng thứ tự với SDK preview (4 màu), căn phải đúng. Order Design PNG ink 519–903, SDK preview 520–902 (lệch ≤1px)."
  ```
- **File đính kèm cho claim này:** không có

### CLAIM-11

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** TC-TIB-6651
- **Link:** https://staging-portal.teeinblue.com/campaigns/3141/edit
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-22
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor [AI] (agent QA)
- **Trích nguyên văn:**
  ```
  "Lưu ý lệch case: layer Curve Text không có tuỳ chọn căn lề (luôn căn giữa), nên chạy với căn giữa, không dựng được
  căn phải. Kết quả: text uốn cong đủ 9 ký tự, đúng 3 màu, vị trí khớp SDK preview. Locate Artwork ink 564–836, Order
  Design PNG 564–835, SDK preview 565–836 (lệch ≤1px). SDK dùng textPath. Case này không chứng minh được fix cho curve
  căn phải; chưa biết bug có xảy ra với curve trước fix (Q6)."
  ```
- **File đính kèm cho claim này:** không có

### CLAIM-12

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** comment Jira 55257 trên TIB-5606, mục "Change"
- **Link:** https://ownego.atlassian.net/browse/TIB-5606?focusedCommentId=55257
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-21
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** chauptm (Dev, người sửa PR teeinblue-api #4044)
- **Trích nguyên văn:**
  ```
  "Change: each segment's x position is now measured from its font run as one string (width(run so far) -
  width(segment)), and the total width (used for autoscale, canvas size and alignment) comes from the same measurement.
  A letter-colored render is now exactly as wide as the same text in one color. Font fallback runs (different font)
  keep the previous behaviour."
  ```
- **File đính kèm cho claim này:** không có

### CLAIM-13

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** comment Jira 55257 trên TIB-5606, mục "Notes"
- **Link:** https://ownego.atlassian.net/browse/TIB-5606?focusedCommentId=55257
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-21
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** chauptm (Dev)
- **Trích nguyên văn:**
  ```
  "Already-rendered previews/order designs (e.g. users/29106/artworks/6ad88a95861b5.png) do not update themselves;
  regenerate the affected designs after deploy."
  ```
- **File đính kèm cho claim này:** không có

### CLAIM-14

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** comment Jira 55257 trên TIB-5606, mục "Notes"
- **Link:** https://ownego.atlassian.net/browse/TIB-5606?focusedCommentId=55257
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-21
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** chauptm (Dev)
- **Trích nguyên văn:**
  ```
  "Only the PNG renderer (API) is changed. The SVG renderer in teeinblue-vectorize was checked and is not affected: it
  lays out the glyphs of the whole string in one pass (font.forEachGlyph with kerning) and letter colors only change
  each glyph's fill. Rendering the reported layer there gives the same glyph geometry as the single-color text,
  positioned like the SDK preview — no change needed."
  ```
- **File đính kèm cho claim này:** không có

### CLAIM-15

- **Loại nguồn** (đúng 1): `KHÔNG CÓ NGUỒN`
- **Locator:** RA analysis_TIB-5606.md → "Nhật ký chốt" Q2 (đáp án Slack của QA) · comment Jira 55257
- **Link:** không có (Slack #req-chienct ts 1792640378.627569)
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-22
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** chienct (QA) trả lời trong thread của QA — không phải PO/Dev
- **Trích nguyên văn:**
  ```
  Slack (QA): "2. chỉ locate artwork và order design"
  Dev (chỉ nói renderer, không liệt kê ảnh): "Only the PNG renderer (API) is changed."
  ```
- **File đính kèm cho claim này:** không có

### CLAIM-16

- **Loại nguồn** (đúng 1): `KHÔNG CÓ NGUỒN`
- **Locator:** TC-TIB-6651 actualResult (ghi chú lệch case)
- **Link:** https://staging-portal.teeinblue.com/artworks?id=5268
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-22
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor [AI] (agent QA); chưa Dev/PO xác nhận
- **Trích nguyên văn:**
  ```
  "Lưu ý lệch case: layer Curve Text không có tuỳ chọn căn lề (luôn căn giữa), nên chạy với căn giữa, không dựng được
  căn phải."
  ```
- **File đính kèm cho claim này:** không có

### CLAIM-17

- **Loại nguồn** (đúng 1): `KHÔNG CÓ NGUỒN`
- **Locator:** TC-TIB-6640 · TC-TIB-6643 actualResult (ghi chú phụ)
- **Link:** https://nprice1.myshopify.com/products/cp-5606-script-c
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-22
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor [AI] (agent QA); chưa Dev/spec
- **Trích nguyên văn:**
  ```
  TC-TIB-6640: "localStorage teeinblue-customizations không đọc được cho artwork 5258 vì entry này bị đẩy khỏi danh sách
  sau khi đặt thêm các line item khác (localStorage chỉ giữ 10 entry cuối); check ý 3 chỉ dựa vào request/response."
  TC-TIB-6643: "localStorage không đọc được cho line item này vì entry artwork 5256 bị ghi đè bởi line item emoji đặt
  ngay sau (cùng product)."
  ```
- **File đính kèm cho claim này:** không có

*(lặp lại block trên cho CLAIM-02, CLAIM-03…)*

## 5.2 Evidence chung, không thuộc claim nào `[AGENT]`

Jira https://ownego.atlassian.net/browse/TIB-5606 · PR https://github.com/qikify/teeinblue-api/pull/4044 · RA teeinblue/TIB automation/qa-output/analysis_TIB-5606.md · Testlane task TIB-230 (TC-TIB-6638…6654, ảnh trong actualResult) + BUG-363 · TC-TIB-6652 (emoji bị bỏ ở ô nhập, không tới nhánh fallback), TC-TIB-6653 / TC-TIB-6654 (Blocked) · report lượt chạy https://claude.ai/artifact/FnaDMMFywjunqkJVP1bDkw · Proposal trước: CBS-008 (published artwork v7, sdk v8; OQ-artwork-122..137, OQ-sdk-066/067)

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
