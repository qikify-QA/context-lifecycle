# Phần B — Template CCR (điền trực tiếp hoặc copy sang file riêng)

Dùng khi canonical QA context (Product KB / Feature Profile / Checklist) của `Teeinblue` **thiếu, sai, cũ hoặc mâu thuẫn** với thay đổi đã/sắp ship.

**Cách gửi:** điền file này (giữ nguyên cấu trúc mục `# Phần N`), đính kèm vào task liên quan trên hệ thống quản lý context của team, rồi bấm Submit. Việc submit là thao tác thủ công của con người.

Hệ thống nhận CCR thường không đọc hiểu nội dung — chỉ kiểm tra thô là không còn placeholder dạng ba dấu nhỏ hơn … ba dấu lớn hơn nào sót lại.

## Nhãn field

| Nhãn | Nghĩa |
|---|---|
| `[AGENT]` | Người/agent soạn CCR tự điền được từ Jira + canon đã tra. Người gửi chỉ cần soát lại. |
| `[BẠN]` | Cần phán đoán của con người — không tự quyết, phải hỏi người gửi. |

Những thứ **không cần hỏi người gửi**: context builder được phép mutate gì trên môi trường thật, dùng account nào để explore, có capture network/DB không — đó là chính sách của bên sở hữu môi trường đích.

**Không có thông tin thì ghi "không rõ".** Một chỗ trống được khai báo thì xử lý được; một chỗ trống bị lấp bằng phỏng đoán sẽ lan vào KB và vào mọi test case sinh ra sau đó.

---

## Phần 0 — Cần mấy CCR? `[BẠN xác nhận, AGENT đề xuất]`

Đơn vị của một CCR là **một thứ được giải quyết độc lập**, không phải một ticket Jira riêng lẻ. Nhiều ticket có thể gộp thành 1 CCR nếu cả 4 điều dưới đây giống nhau; tách nếu **ít nhất một** điều khác nhau:

| | Câu hỏi |
|---|---|
| Người gỡ | Context builder tự explore được, hay cần dev trả lời / PO quyết / chủ taxonomy quyết? |
| Điều kiện mở khoá | Đúng **một** thông tin hoặc **một** việc nào làm nó xong? |
| Vòng đời | Nếu request này bị huỷ, các ticket còn lại còn giá trị riêng không? |
| Artifact đích | Cùng KB của một object cụ thể, hay đụng tới registry/taxonomy chung? |

Đừng gộp quá tay: nhét "cần dev trả lời" chung với "chỉ cần đi explore lại" sẽ khiến phần explore được ngay phải chờ dev vô cớ.

---

## Phần 1 — Thấy gì

**Loại request** `[AGENT đề xuất, BẠN duyệt]`

`NEW_FEATURE` · `BEHAVIOR_CHANGE` · `PROFILE_GAP` · `CHECKLIST_GAP` · `STALE_CONTEXT` · `CONFLICT` · `CANON_HYGIENE`

**Loại:** BEHAVIOR_CHANGE

**Object** `[AGENT]` — lấy từ registry của knowledge base đích, nếu có quyền truy cập

- Object: artwork.md → Color Sequence · Feature: artwork.md → Text layer multi-stroke (đoạn "Color Sequence ("rainbow") text takes multi-stroke normally")
- Không khớp object nào, hoặc không tra được registry? Mô tả bằng lời. **Đừng bịa một object_key không có thật.**

**Quan sát được** `[AGENT]` — tổng hợp từ (các) ticket Jira, KHÔNG phải suy đoán

```
TIB-5606 — "Preview artwork is incorrect when the text layer uses rainbow and align right"
(Bug, Sprint 181; Jira status QA Review, chưa resolve; tạo 2026-10-21, cập nhật cuối 2026-10-21; PR GitHub còn OPEN, cập nhật 2026-10-22).

Jira description:
- Currently: rainbow text (Color Sequence) căn phải hiển thị đúng ở artwork nhưng mất ký tự trong Locate Artwork và
  Order Design (store sharedgifts.com, campaign prod 1050909); đổi sang căn trái thì hết.
- Expectation: rainbow text hiển thị đủ mọi ký tự trong Locate Artwork và Order Design, bất kể căn lề.

Comment dev ([dev]), theo file RA analysis_TIB-5606.md:
- Nguyên nhân: TextRenderer::renderSegmented() cộng độ rộng từng segment đo riêng lẻ → font script/italic bị phình rộng
  → căn phải/giữa đẩy text tràn mép.
- Fix: đo vị trí segment theo cả run chữ; rainbow rộng đúng bằng text 1 màu (width dùng cho autoscale, canvas size,
  alignment). Chỉ sửa PNG renderer teeinblue-api (PR #4044); SVG renderer teeinblue-vectorize không đổi.
- Behaviour changes: vị trí/độ rộng khớp SDK preview ở trái/giữa/phải; font script nối liền chữ; tên dài autoscale co
  về đúng cỡ như SDK, không nhỏ hơn; font thường và text 1 màu không đổi; run dùng font fallback giữ hành vi cũ;
  stroke/multi-stroke bám theo từng chữ; RTL giữ màu từng chữ.
- Preview/order design đã render trước deploy không tự cập nhật, phải regenerate.

Đáp án Slack thread #req-[qa-channel] (ts 1792640378.627569, 2026-10-22), ghi trong "Nhật ký chốt" của RA:
- Q1 → fix áp dụng cho tất cả text có rainbow (kể cả curve text).
- Q2 → ảnh bị ảnh hưởng chỉ gồm Locate Artwork và Order Design.
- Q3 → sẽ báo merchant (ai regenerate: chưa chốt).
- Q4 → phép đo theo run có tính letter spacing và kerning.
- Q5 → run font fallback giữ hành vi cũ (chấp nhận có thể vẫn mất/tràn chữ khi căn phải).

Kết quả chạy test trên staging 2026-10-22 (task TIB-230, test-executor [AI], order #1105 — 14 line item):
- PASS: TC-TIB-6638/6639 (căn phải, Locate + Order Design), 6640 (giữa), 6641 (trái), 6642 (rainbow rộng = 1 màu, chênh
  0px), 6643 (32 ký tự autoscale), 6644 (Roboto), 6645 (1 màu), 6646 (letter spacing 3 căn lề), 6647 (kerning),
  6648 (stroke 1 lớp), 6650 (RTL), 6651 (curve — chạy căn giữa), 6652 (emoji — có ghi chú).
- FAILED: TC-TIB-6649 rainbow + multi-stroke 3 lớp → BUG-363: Order Design PNG có sợi mảnh màu chữ vẽ đè lên lớp stroke
  trắng/đen ở mọi chỗ nối chữ; SDK preview sạch; đủ ký tự, căn phải đúng.
- BLOCKED: TC-TIB-6653 (chưa có order render trước deploy), TC-TIB-6654 (không có đường UI tải vector; URL .svg/.pdf/.eps
  trên CDN trả 403).
- Mọi case chạy trên font Dancing Script (staging không có Carattere — font của case gốc).

Phát hiện phụ trong lúc dựng data / chạy test:
- Layer Curve Text không có tuỳ chọn căn lề (layer lưu align: center) → không dựng được curve căn phải.
- localStorage teeinblue-customizations chỉ giữ ~10 entry gần nhất; entry cũ bị đẩy ra / ghi đè khi thêm nhiều product.
- Emoji bị ô nhập storefront bỏ ngay lúc gõ, nên nhánh font fallback của renderer không được chạy tới.
```

- Nguồn: tổng hợp từ 1 ticket Jira (chưa resolve, QA Review) + file RA analysis_TIB-5606.md + 17 test case Testlane TIB-230 do agent chạy trên staging 2026-10-22; KHÔNG phải quan sát trên production
- Thấy mấy lần / xác nhận trực tiếp mấy lần: 1 lượt chạy trên staging (17 case: 14 passed / 1 failed / 2 blocked); bug gốc (mất ký tự trước fix) tự tái hiện: 0

**Thử gì mà KHÔNG tái hiện / chưa thử gì** `[AGENT + BẠN]`

```
[AGENT]
- Chưa tái hiện bug gốc trước fix: staging đã có bản fix khi chạy, không có baseline trước deploy.
- Chưa thử font Carattere (không có trên staging) — mọi PASS là trên Dancing Script.
- Chưa thử curve text căn phải (layer Curve Text không có tuỳ chọn căn lề); chưa biết curve trước fix có bị bug không (Q6).
- Chưa kiểm nhánh font fallback: emoji bị chặn ở ô nhập nên không tới renderer.
- Chưa kiểm regenerate design đơn cũ (TC-TIB-6653 blocked) và SVG vector export (TC-TIB-6654 blocked).
- Chưa kiểm thumbnail artwork / mockup server-side / ảnh product trên store (C7 nói không ảnh hưởng — chưa xác minh).
- Chưa kiểm Warp Text + rainbow, sequence do buyer chọn (Populate Color from another option).
- Chưa thử trên production.
- BUG-363 (multi-stroke) chưa biết có từ trước fix hay do fix mới.
[BẠN]
⏳ CHỜ BẠN: bạn đã tự thử gì trên staging/production mà kết quả test trên Testlane không ghi (vd đã tự xem case gốc trên prod sau deploy chưa)?
```

**Phạm vi cần re-explore & ảnh hưởng ước tính** `[AGENT]` — BẮT BUỘC, đây là phần quan trọng nhất

> Khác "Quan sát được" ở trên: không mô tả CÁI GÌ đã xảy ra, mà là **CẦN LÀM GÌ TIẾP**. Người/agent xử lý CCR đọc xong mục này phải biết ngay cần verify lại surface nào, và biết trước phạm vi ảnh hưởng dây chuyền.

Với MỖI ticket/claim riêng biệt trong "Quan sát được":

| Ticket / claim | Surface cần re-verify | Vì sao chưa thể tin ngay | Object/feature/checklist nhiều khả năng bị ảnh hưởng | Độ tin cậy |
|---|---|---|---|---|
| TIB-5606 — rainbow single-line, font script, căn phải: Locate Artwork và Order Design PNG đủ ký tự, khớp SDK preview | portal (campaign editor → Locate artwork) · api (PNG renderer Order Design) | đã PASS trên staging nhưng bằng Dancing Script, chưa trên production | artwork.md → Color Sequence | ĐỦ TIN CẬY (test case PASS TC-TIB-6638 2026-10-22 staging [AI]; TC-TIB-6639 2026-10-22 staging [AI] — build: staging @ 2026-10-22 14:20 — sau lần TIB-5606 giao QA cuối (2026-10-21); build hash: không rõ (QA không có quyền repo)) |
| TIB-5606 — case gốc font Carattere (3 màu, stroke, căn phải) | api (PNG renderer) · portal (Locate artwork) | staging không có font Carattere; bug gốc được báo riêng trên Carattere nên có thể không tái hiện trên font thay thế | artwork.md → Color Sequence; assets.md (font) | CHƯA ĐỦ — cần re-explore |
| TIB-5606 — rainbow căn giữa / căn trái khớp SDK preview (R2) | portal (Locate artwork) · api (Order Design) | đã PASS trên staging, Dancing Script; fixture căn trái đặt layer giữa printarea (chỉ so theo SDK) | artwork.md → Color Sequence | ĐỦ TIN CẬY (test case PASS TC-TIB-6640 2026-10-22 staging [AI]; TC-TIB-6641 2026-10-22 staging [AI] — build: staging @ 2026-10-22 14:20 — sau lần TIB-5606 giao QA cuối (2026-10-21); build hash: không rõ (QA không có quyền repo)) |
| TIB-5606 — rainbow rộng đúng bằng cùng text 1 màu (R1) | api (Order Design PNG) | đã PASS (chênh 0px) trên staging, Dancing Script | artwork.md → Color Sequence | ĐỦ TIN CẬY (test case PASS TC-TIB-6642 2026-10-22 staging [AI] — build: staging @ 2026-10-22 14:20 — sau lần TIB-5606 giao QA cuối (2026-10-21); build hash: không rõ (QA không có quyền repo)) |
| TIB-5606 — tên dài autoscale co đúng cỡ như SDK, không nhỏ hơn (R4) | api (Order Design PNG) · storefront (SDK preview) | đã PASS 32 ký tự trên staging; đơn cũ regenerate có thể ra cỡ chữ khác bản đã in (chưa kiểm) | artwork.md → Color Sequence; artwork.md → autoscale Single-line text | ĐỦ TIN CẬY (test case PASS TC-TIB-6643 2026-10-22 staging [AI] — build: staging @ 2026-10-22 14:20 — sau lần TIB-5606 giao QA cuối (2026-10-21); build hash: không rõ (QA không có quyền repo)) |
| TIB-5606 — font thường (Roboto) và text 1 màu: kết quả không đổi so với trước fix (R5) | api (Order Design PNG) | case PASS chỉ so với SDK preview; không có baseline trước deploy nên ý "không đổi so với trước" chưa kiểm được | artwork.md → Text (render Order Design) | CHƯA ĐỦ — cần re-explore |
| TIB-5606 — phép đo theo run tính letter spacing và kerning (R8) | api (Order Design PNG) · portal (Locate artwork) | đã PASS 3 kiểu căn lề + cặp kerning trên staging | artwork.md → Color Sequence | ĐỦ TIN CẬY (test case PASS TC-TIB-6646 2026-10-22 staging [AI]; TC-TIB-6647 2026-10-22 staging [AI] — build: staging @ 2026-10-22 14:20 — sau lần TIB-5606 giao QA cuối (2026-10-21); build hash: không rõ (QA không có quyền repo)) |
| TIB-5606 — stroke 1 lớp bám theo từng chữ, liền ở chỗ nối (R3, R7) | api (Order Design PNG) | đã PASS (phóng 500%) trên staging, Dancing Script | artwork.md → Text layer multi-stroke | ĐỦ TIN CẬY (test case PASS TC-TIB-6648 2026-10-22 staging [AI] — build: staging @ 2026-10-22 14:20 — sau lần TIB-5606 giao QA cuối (2026-10-21); build hash: không rõ (QA không có quyền repo)) |
| TIB-5606 — rainbow + multi-stroke 3 lớp không hở/chồng ở chỗ nối (R7) | api (Order Design PNG) | TC-TIB-6649 FAILED, BUG-363: sợi màu chữ vẽ đè lên lớp stroke ở mọi chỗ nối; chưa biết có từ trước fix hay do fix; **có thể làm SAI** đoạn canon "Color Sequence ("rainbow") text takes multi-stroke normally" (verified 2026-10-01, TC-TIB-4045) | artwork.md → Text layer multi-stroke; checklist regression multi-stroke (TIB-5417 R14) | CHƯA ĐỦ — cần re-explore |
| TIB-5606 — rainbow + RTL giữ màu từng chữ, layout khớp preview (R7) | api (Order Design PNG) · storefront | đã PASS trên staging với font Heebo, cờ "Right to Left text" bật | artwork.md → Color Sequence | ĐỦ TIN CẬY (test case PASS TC-TIB-6650 2026-10-22 staging [AI] — build: staging @ 2026-10-22 14:20 — sau lần TIB-5606 giao QA cuối (2026-10-21); build hash: không rõ (QA không có quyền repo)) |
| TIB-5606 — fix áp dụng cho Curve Text rainbow (C6, R10) | portal (Locate artwork) · api (Order Design PNG) | TC-TIB-6651 chỉ chạy căn giữa vì layer Curve Text không có tuỳ chọn căn lề → không chứng minh được fix cho trường hợp lỗi (căn phải); chưa biết curve trước fix có lỗi không (Q6); đáp án Q1 chưa phải PO sign-off | artwork.md → Color Sequence; artwork.md → Curve Text | CHƯA ĐỦ — cần re-explore |
| TIB-5606 — run font fallback (emoji/ký tự đặc biệt) giữ hành vi cũ, có thể vẫn mất chữ khi căn phải (R6, R9) | api (PNG renderer, nhánh fallback) | TC-TIB-6652 không tới được nhánh fallback: emoji bị chặn ở ô nhập storefront (canon: emoji bị chặn mặc định); cần ký tự fallback lọt qua input (bật cho phép emoji hoặc ký tự đặc biệt) | artwork.md → Add Text & Text Personalization; assets.md → Unsupported-character detection | CHƯA ĐỦ — cần re-explore |
| TIB-5606 — preview/order design render trước deploy không tự cập nhật; regenerate thì đúng (C5) | portal (Orders → Re-generate design) · api (POST /api/customizations/{id}/regenerate) | TC-TIB-6653 blocked: chưa có order render trước deploy; ai regenerate đơn bị ảnh hưởng chưa chốt (Q3) | campaign.md / mockup.md → Re-generate design | CHƯA ĐỦ — cần re-explore |
| TIB-5606 — SVG renderer teeinblue-vectorize không đổi (C4) | api (vector export) | TC-TIB-6654 blocked: không có đường UI tải vector trên staging, URL .svg/.pdf/.eps trả 403 | artwork.md → Text layer multi-stroke (vector export) | CHƯA ĐỦ — cần re-explore |
| TIB-5606 — ảnh bị ảnh hưởng chỉ gồm Locate Artwork + Order Design; thumbnail, mockup server-side, ảnh product không đổi (C7) | api (thumbnail, mockup render) · storefront (ảnh product) | chỉ có đáp án Slack, chưa test; chưa chốt có cần sync lại campaign đã publish (Q2) | campaign.md; mockup.md | CHƯA ĐỦ — cần re-explore |
| Phát hiện phụ — layer Curve Text không có tuỳ chọn căn lề (align luôn center) | portal (artwork editor, layer Curve Text) | chỉ quan sát 1 lần khi dựng fixture 2026-10-22, chưa hỏi dev đó là thiết kế hay thiếu | artwork.md → Curve Text | CHƯA ĐỦ — cần re-explore |
| Phát hiện phụ — localStorage teeinblue-customizations chỉ giữ ~10 entry gần nhất | storefront (localStorage) | quan sát trong 1 lượt chạy, chưa có nguồn dev/spec; ảnh hưởng cách kiểm "đọc localStorage sau ATC" khi thêm nhiều product | storefront-sdk.md; api-endpoints.md → Add to cart | CHƯA ĐỦ — cần re-explore |

- Một claim có khả năng làm SAI một checklist/automation đang publish (không chỉ THIẾU coverage) → nêu rõ checklist_id/mã check nghi ngờ, đây là tín hiệu ưu tiên cao hơn "gap" thông thường.
- Nghi ngờ ranh giới object hiện tại không còn hợp lý → nêu Ý TƯỞNG, **không tự quyết tên object_key mới**.
- Không chắc surface nào bị ảnh hưởng → ghi "chưa rõ, cần tự đánh giá", **không bỏ trống**.
- Cột "Độ tin cậy" quyết định người/agent xử lý CCR có được phép bỏ qua việc re-explore claim này hay không — chỉ ghi "ĐỦ TIN CẬY" khi có 1 trong 2, kèm trích dẫn cụ thể:
  - **Test case đã chạy PASS**: id + ngày chạy + build, kiểm đúng hành vi đang claim.
  - **PO/Dev confirm rõ ràng**: trích nguyên văn + link, xác nhận đúng hành vi đang claim.
  - Chỉ có screenshot/API capture tự chụp → bắt buộc ghi "CHƯA ĐỦ — cần re-explore", dù tin chắc đến đâu.

---

## Phần 2 — Thấy nó ở đâu `[AGENT]`

- **URL / ID cụ thể đã biết:** Jira https://ownego.atlassian.net/browse/TIB-5606 · case gốc prod: campaign 1050909, artwork 1370428 (store sharedgifts.com) · staging instance 520 / store nprice1: artwork #5256, #5258–#5268, campaign 3129–3131, 3133–3141 (storefront nprice1.myshopify.com/products/cp-5606-*), order #1105 (staging-portal.teeinblue.com/orders/4762) · Testlane task TIB-230, BUG-363 · endpoint POST /api/merchant/shopify/customization, POST /api/customizations/{id}/regenerate
- **Trạng thái đối tượng lúc quan sát/lúc ticket mô tả:** ticket: rainbow text căn phải trên prod mất ký tự cuối ở Locate Artwork + Order Design; lúc test: staging đã có bản fix, fixture AW 2.0 Single-line / Curve Text với Color sequences 3 màu, campaign đã publish lên nprice1, order Bogus đã tạo design
- **Environment mô tả trong ticket gốc (không nhất thiết là môi trường sẽ dùng để re-explore):** production
- **Role liên quan:** guest buyer (personalize + đặt hàng trên storefront) · merchant/staff (Locate artwork, xem Order Design)
- **Surface:** `portal` · `storefront` · `api` · `db`

---

## Phần 3 — Để không sinh conflict giả `[AGENT]`

> Phần lớn "conflict" phát sinh không phải mâu thuẫn thật, mà do hai quan sát đều đúng nhưng không ai ghi rõ chúng chạy trên build nào.

Với MỖI ticket:

- **Build / version / ngày deploy:** staging @ 2026-10-22 14:20 — sau lần TIB-5606 giao QA cuối (2026-10-21); PR GitHub còn OPEN (cập nhật 2026-10-22 12:28); Fix Version: không rõ; build hash: không rõ (QA không có quyền repo)
- **Ngày resolve/update cuối:** 2026-10-21
- **Đã ship chưa:** chưa — Jira status QA Review, chưa có resolution, PR còn OPEN

**Context hiện đang nói gì** `[AGENT]` — tra canon TRƯỚC khi gửi

- Context version đang dùng: artwork.md commit cuối 2026-10-19; storefront-sdk.md commit cuối 2026-10-19
- Canon hiện nói: artwork.md → Color Sequence: "**Color Sequence** — each character of buyer-entered text takes the next color in a preset sequence, looping back to the first color once the sequence is exhausted. Works on **Single-line Text, Curve Text, Warp Text**; explicitly **NOT supported on Paragraph or Spiral Text**." ▸ artwork.md → Text layer multi-stroke: "**Color Sequence ("rainbow") text takes multi-stroke normally.** A Text layer on a Color Sequence with 3 rings (white/black/blue, width 6, set through the editor's Stroke popover) renders all three in the right inside-out order with the per-character colours intact: in the storefront dynamic preview, in the order print file **and** in the SVG vector export (strokes drawn under the sequence-coloured glyphs); with a single ring only that one shows. Verified 2026-10-01 on two real orders (TC-TIB-4045)." ▸ artwork.md → Add Text & Text Personalization: "**emojis are blocked by default**" ▸ Không tìm thấy dòng nào về rainbow căn phải/giữa mất ký tự, về phép đo độ rộng segment, về tuỳ chọn căn lề của Curve Text, hay về giới hạn số entry của localStorage teeinblue-customizations.
- Đã tra bằng từ khoá nào: rainbow, color sequence, letter color, locate artwork, curve, emoji, glyph, teeinblue-customizations, vector, svg export, regenerate, Carattere, TIB-5606 (artwork.md, campaign.md, mockup.md, assets.md, storefront-sdk.md, api-endpoints.md, run-rules.md, [CONTEXT] missed_cases.md, [CONTEXT] qa_memory.md)
- Không tra được canon → ghi rõ "không tra được — cần người/agent xử lý CCR tự tra lại".

---

## Phần 4 — Hai câu chỉ con người trả lời được `[BẠN]`

### 4.1 Có ai xác nhận đây là hành vi ĐÚNG không?

- Ai xác nhận: KHÔNG AI — chỉ là mô tả/comment của dev; các đáp án Q1–Q5 trên Slack do [QA member] trả lời trong thread của QA. ⏳ CHỜ BẠN: người trả lời đó có phải PO/business không, và có xác nhận PO/business nào khác ngoài Jira/Slack không?
- Ở đâu, ngày nào: Slack #req-[qa-channel] thread ts 1792640378.627569, 2026-10-22 10:42; Jira description + comment dev [dev] (2026-10-21); test case TC-TIB-6638…6651 PASS 2026-10-22 trên staging (chưa phải xác nhận của PO)
- Họ xác nhận chính xác điều gì: Jira Expectation: "Rainbow text renders all characters correctly in Locate Artwork and Order Design, regardless of text alignment." ▸ Slack: "1. có, áp dụng cho tất cả text có rainbow 2. chỉ locate artwork và order design 3. báo merchant 4. có nhé. Rainbow có letter spacing ≠ 0 có khớp SDK preview 5. đúng rồi, giữ hành vi cũ"

> Comment kỹ thuật dev tự viết (kể cả "Ready to test", "Resolution: Done") **KHÔNG PHẢI** PO/business sign-off. Không ai xác nhận thật → knowledge vào context với nhãn "quan sát hiện tại" (chưa xác nhận), không dùng làm expected result.

### 4.2 KHÔNG đề xuất điều gì?

**Bắt buộc.** Liệt kê rõ những gì KHÔNG được coi là đã xác nhận/đã duyệt dù có trong ticket:

```
- Ticket chưa ship (QA Review, PR mở) — mọi mô tả ở đây là hành vi trên staging, không phải production. ▸ - Số đo bbox (vd 624–912, w=288, lệch ≤1–2px) chỉ là số đo tại lượt chạy 2026-10-22 trên Dancing Script, không phải ngưỡng chuẩn. ▸ - Font Dancing Script / Heebo chỉ là font thay thế để dựng fixture, không phải đề xuất font mặc định. ▸ - Không đề xuất sửa đoạn canon "rainbow takes multi-stroke normally" — BUG-363 chưa được dev xác nhận là lỗi mới hay lỗi cũ. ▸ - Không coi "fix áp dụng cho curve text" là đã kiểm (chỉ chạy curve căn giữa). ▸ - Không coi giới hạn fallback/emoji (R9) là hành vi đúng vĩnh viễn — chỉ là giới hạn được chấp nhận trong ticket này; cách ghi nhận còn treo (Q7). ▸ - Không coi "Curve Text không có tuỳ chọn căn lề" và "localStorage chỉ giữ ~10 entry" là thiết kế đã chốt — mới quan sát 1 lần. ▸ - Không đặt object/feature mới; vị trí đề xuất chỉ là heading có sẵn trong artwork.md.
```

### 4.3 Đề xuất context nên nói gì `[AGENT soạn, BẠN duyệt]`

```
artwork.md → Color Sequence (quan sát hiện tại, chưa PO xác nhận, ticket TIB-5606 chưa ship): ▸ - PNG renderer (Locate Artwork + Order Design) đo vị trí segment rainbow theo cả run chữ: text rainbow rộng đúng bằng cùng text đó ở 1 màu, nên căn phải / giữa / trái khớp SDK preview và không mất ký tự cuối (staging 2026-10-22, font Dancing Script; chưa kiểm trên Carattere và production). Phép đo có tính letter spacing và kerning; autoscale tên dài co về đúng cỡ như SDK. ▸ - Trước fix: rainbow căn phải/giữa với font script/italic có thể mất ký tự cuối ở Locate Artwork / Order Design; design đã render trước deploy không tự cập nhật, phải Re-generate design (chưa kiểm). ▸ - Ký tự dùng font fallback (emoji…) giữ hành vi cũ, có thể vẫn tràn/mất chữ khi căn phải (giới hạn chấp nhận ở TIB-5606, chưa kiểm vì emoji bị chặn ở ô nhập theo mặc định). ▸ - Curve Text: layer không có tuỳ chọn căn lề (luôn căn giữa) — cần dev xác nhận. ▸ artwork.md → Text layer multi-stroke: cần re-verify đoạn "rainbow takes multi-stroke normally" — lượt chạy 2026-10-22 (TIB-5606, BUG-363) thấy sợi màu chữ đè lên lớp stroke ở chỗ nối chữ trong Order Design PNG với multi-stroke 3 lớp. ▸ storefront-sdk.md: localStorage teeinblue-customizations có thể chỉ giữ ~10 entry gần nhất — khi kiểm sau ATC nhiều product, đọc ngay sau từng lần ATC.
```

### 4.4 Mức độ gấp `[BẠN]`

`HIGH` (đang chặn test P0/P1) · `MEDIUM` (ảnh hưởng coverage) · `LOW` (cải thiện dần)

---

## Phần 5 — Evidence `[AGENT]`

Link Jira ticket / ảnh / response / HAR: Jira https://ownego.atlassian.net/browse/TIB-5606 · RA teeinblue/TIB automation/qa-output/analysis_TIB-5606.md · Testlane task TIB-230 (TC-TIB-6638…6654, actualResult kèm ảnh) + BUG-363 · report lượt chạy https://claude.ai/artifact/FnaDMMFywjunqkJVP1bDkw · order staging #1105 https://staging-portal.teeinblue.com/orders/4762

> **Trước khi đính kèm: bỏ email, số điện thoại, địa chỉ, tên khách hàng thật, token, cookie, credential.** Tên nội bộ dev/support trong comment Jira thường chấp nhận được, nhưng vẫn kiểm kỹ.

---

## Tự kiểm trước khi gửi

`[BẠN]`:
- [ ] Đây thật sự là **một** thứ được gỡ độc lập (Phần 0)
- [ ] Đã trả lời mục 4.1 trung thực — kể cả khi câu trả lời là "không ai, chỉ là comment dev"
- [ ] Đã điền mục 4.2
- [ ] Evidence đã bỏ PII/token/credential

`[AGENT]`:
- [x] Số lần xác nhận trực tiếp là con số thật, không làm tròn lên
- [x] Đã ghi build/ngày resolve hoặc thừa nhận "không rõ" cho từng ticket
- [x] Đã ghi rõ từ khoá đã tra canon (hoặc lý do không tra được)
- [x] Mỗi ticket/claim trong "Quan sát được" đều có 1 dòng tương ứng trong "Phạm vi cần re-explore & ảnh hưởng ước tính"
- [x] Cột "Độ tin cậy" của mỗi dòng đã ghi đúng 1 trong 3 trạng thái, có trích dẫn cụ thể khi ghi "ĐỦ TIN CẬY"
- [ ] Không còn placeholder dạng ba dấu nhỏ hơn … ba dấu lớn hơn nào sót lại trong file
