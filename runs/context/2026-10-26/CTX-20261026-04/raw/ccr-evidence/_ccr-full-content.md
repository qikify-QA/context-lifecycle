# Phần B — Template CCR (điền trực tiếp hoặc copy sang file riêng)


Dùng khi canonical QA context (Product KB / Feature Profile / Checklist) của Teeinblue **thiếu, sai, cũ hoặc mâu thuẫn** với thay đổi đã/sắp ship.

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

- Object: không tra được registry (repo không có _registry.json) — vị trí thật: artwork.md → Text layer multi-stroke (TIB-5417, dev implementation comment 2026-09-21); artwork.md → Paragraph gains Drop shadow (TIB-5472 …) · Feature: Paragraph multi-stroke + paint order + shadow paragraph — mô tả bằng lời, không phải feature_key
- Không khớp object nào, hoặc không tra được registry? Mô tả bằng lời. **Đừng bịa một object_key không có thật.**

**Quan sát được** `[AGENT]` — tổng hợp từ (các) ticket Jira, KHÔNG phải suy đoán

```
TIB-5580 — Support multiple stroke layers on a paragraph text layer (Story, status QA Review, chưa resolve; tạo 2026-10-15, update cuối 2026-10-20)
- Description (PO): mở rộng multi-stroke của TIB-5417 sang Paragraph cùng model (danh sách lớp, màu + width riêng, xếp từ glyph ra ngoài, width cộng dồn khi render); gỡ lỗi render khiến Paragraph bị loại khỏi TIB-5417 (PNG vẽ stroke rồi text theo từng dòng, SVG vẽ text rồi stroke theo từng dòng); PNG và SVG phải giống preview, preview là chuẩn, kiểm cả PNG lẫn SVG; chỉ round stroke.
- Comment dev [dev] 2026-10-16 ("Context / logic changes"): Paragraph có stroke_layers như Text (innermost first, mỗi width là độ dày riêng, cộng dồn, tối đa 3); cả 3 renderer vẽ mỗi lớp qua mọi dòng, lớp ngoài trước, rồi fill mọi dòng; API có 2 đường vẽ (tổng width ≤ ngưỡng / cũ), padding canvas theo tổng width; linked paragraph scale mọi lớp theo tỉ lệ width; GlobalTemplateMerger giữ stroke_layers là field local, spiral/shape text không có; portal hiện editor multi-stroke (tối đa 3 row) cho paragraph new-schema, Custom Shape và paragraph legacy-schema giữ 1 stroke; paragraph mới tạo có 1 entry stroke_layers, stroke_color/stroke_width mirror lớp trong cùng; convert text ↔ paragraph giữ stack, sang loại khác gộp về lớp trong cùng; vectorize áp shadow 1 lần cho cả paragraph thay vì từng dòng. PR: api #4016, portal #3820, sdk #2124, vectorize #76 (Jira báo còn OPEN).
- File RA analysis_TIB-5580.md (vòng 3, 2026-10-21): C5–C9, R10–R16 từ đáp án Slack Q1–Q9 ngày 2026-10-21 — API PNG đã đổi shadow giống vectorize (R14); shadow 3 renderer không được lệch (R10); không nghiệm thu lại TIB-5472 (C6); template paragraph EVL là new-schema (C8); multi-select Text + Paragraph ngoài phạm vi (C7); "giống preview" so bằng mắt, QA tự phân xử (R13, R15); opacity < 1 vùng chồng giữa 2 dòng là Fail (R16); validate là bắt buộc (Section 5, Q6).
- Lượt test TIB-220 (agent test-executor, staging nprice1, 2026-10-21 → 2026-10-22): agent báo 13 Passed / 1 Failed (TC-TIB-6338 → BUG-357) / 13 Blocked; Testlane hiện ghi 19 Passed / 1 Failed / 7 Blocked (6 case lệch, xem bảng). Không có CR/bug fix nào sau lượt chạy.
```

- Nguồn: tổng hợp từ 1 ticket Jira (QA Review, chưa Done) + file RA + lượt test agent trên staging; KHÔNG PHẢI quan sát trên production
- Thấy mấy lần / xác nhận trực tiếp mấy lần: 1 lượt chạy test trên staging (agent, 2026-10-21 → 2026-10-22); 0 lần quan sát trên production

**Thử gì mà KHÔNG tái hiện / chưa thử gì** `[AGENT + BẠN]`

```
- Chưa có gì quan sát trên production — ticket chưa ship.
- Storefront preview (SDK) chưa kiểm được: staging đang chạy app-v2.js VERSION 20260929, chưa có PR sdk #2124 — mọi claim "PNG/SVG giống preview storefront" chưa được verify.
- SVG (vectorize) chưa kiểm được ở bất kỳ case nào: không tìm được đường tải SVG order design trên portal staging (order detail, Bulk Fulfill, thumbnail).
- Global template (TC-TIB-6328) chưa thử được: fixture #5186 dựng qua API không render trong editor.
- Paragraph legacy-schema chưa Save được: PUT /api/artworks/5187 trả 500.
- Validate stroke_layers ở portal API (PUT /api/artworks/{id}, entry thứ 4 / width không phải số trên paragraph) chưa có case nào gửi thẳng; chỉ kiểm nút Add bị disable trên UI.
- PSD import paragraph nhiều stroke: không có case.
- Multi-select Text + Paragraph: ngoài phạm vi theo C7, không thử.
- 6 case TC-TIB-6313/6319/6320/6321/6322/6332 đang Passed trên Testlane nhưng actualResult ghi Blocked / chỉ còn link order — chưa rõ ai đổi; coi như chưa verify.
- ⏳ CHỜ BẠN: bạn đã tự thử gì mà kết quả test không ghi? Bạn có tự đổi 6 case trên sang Passed không?
```

**Phạm vi cần re-explore & ảnh hưởng ước tính** `[AGENT]` — BẮT BUỘC, đây là phần quan trọng nhất

> Khác "Quan sát được" ở trên: không mô tả CÁI GÌ đã xảy ra, mà là **CẦN LÀM GÌ TIẾP**. Người/agent xử lý CCR đọc xong mục này phải biết ngay cần verify lại surface nào, và biết trước phạm vi ảnh hưởng dây chuyền.

Với MỖI ticket/claim riêng biệt trong "Quan sát được":

| Ticket / claim | Surface cần re-verify | Vì sao chưa thể tin ngay | Object/feature/checklist nhiều khả năng bị ảnh hưởng | Độ tin cậy |
|---|---|---|---|---|
| TIB-5580 — Paragraph new-schema có stack editor tối đa 3 lớp; đủ 3 row thì nút Add stroke bị disable, PUT lưu đúng 3 entry | portal (Artwork Editor 2.0 → popover Stroke) · api (PUT /api/artworks/{id}) | Đã có case PASS; mới chạy trên staging, ticket chưa ship production | artwork.md → Text layer multi-stroke (TIB-5417 …) (dòng "Paragraph stays at one stroke" thành SAI) · artwork.md → Paragraph multi-stroke (TIB-5580 / TIB-220 …) | ĐỦ TIN CẬY (test case PASS TC-TIB-6312 2026-10-21 staging nprice1 [AI]; TC-TIB-6314 2026-10-21 staging nprice1 [AI]; TC-TIB-6315 2026-10-21 staging nprice1 [AI] — build: staging @ 2026-10-21 → 2026-10-22 — sau lần TIB-5580 giao QA cuối (2026-10-15, chuyển QA Review); chưa có Fix Version; chưa release; SDK storefront staging app-v2.js VERSION 20260929 (chưa có PR sdk #2124); build hash: không rõ (QA không có quyền repo)) |
| TIB-5580 — Width mỗi lớp là độ dày riêng của vòng đó, cộng dồn khi render; thứ tự từ trong ra ngoài (row 1 sát glyph) — phần editor preview | portal (preview editor) | Chỉ kiểm trên preview editor; storefront/SVG nằm ở dòng thứ tự vẽ bên dưới | artwork.md → Paragraph multi-stroke (TIB-5580 / TIB-220 …) | ĐỦ TIN CẬY (test case PASS TC-TIB-6316 2026-10-21 staging nprice1 [AI]; TC-TIB-6314 2026-10-21 staging nprice1 [AI] — build: staging @ 2026-10-21 → 2026-10-22 — sau lần TIB-5580 giao QA cuối (2026-10-15, chuyển QA Review); chưa có Fix Version; chưa release; SDK storefront staging app-v2.js VERSION 20260929 (chưa có PR sdk #2124); build hash: không rõ (QA không có quyền repo)) |
| TIB-5580 — Xoá lớp giữa, đổi thứ tự lớp, Save + reload giữ đúng dữ liệu | portal · api (PUT /api/artworks/{id}) | Đã có case PASS trên staging | artwork.md → Paragraph multi-stroke (TIB-5580 / TIB-220 …) | ĐỦ TIN CẬY (test case PASS TC-TIB-6317 2026-10-21 staging nprice1 [AI] — build: staging @ 2026-10-21 → 2026-10-22 — sau lần TIB-5580 giao QA cuối (2026-10-15, chuyển QA Review); chưa có Fix Version; chưa release; SDK storefront staging app-v2.js VERSION 20260929 (chưa có PR sdk #2124); build hash: không rõ (QA không có quyền repo)) |
| TIB-5580 — Paragraph mới tạo có 1 entry stroke_layers; stroke_color/stroke_width mirror lớp trong cùng | portal · api | Đã có case PASS trên staging | artwork.md → Paragraph multi-stroke (TIB-5580 / TIB-220 …) | ĐỦ TIN CẬY (test case PASS TC-TIB-6318 2026-10-21 staging nprice1 [AI] — build: staging @ 2026-10-21 → 2026-10-22 — sau lần TIB-5580 giao QA cuối (2026-10-15, chuyển QA Review); chưa có Fix Version; chưa release; SDK storefront staging app-v2.js VERSION 20260929 (chưa có PR sdk #2124); build hash: không rõ (QA không có quyền repo)) |
| TIB-5580 — Thứ tự vẽ ở cả 3 renderer: từng lớp stroke vẽ qua mọi dòng, lớp ngoài trước, fill mọi dòng sau cùng; PNG (API, 2 đường ≤15px / >15px) và SVG (vectorize) phải giống preview | storefront (SDK preview) · api (PNG order design) · vectorize (SVG) | SDK storefront staging chưa có code TIB-5580 (chỉ vẽ 1 vòng); không tải được SVG từ portal staging. TC-TIB-6319/6320/6321/6322 trên Testlane đang Passed nhưng actualResult ghi Blocked hoặc chỉ còn link order — trạng thái không đáng tin. PNG khớp preview editor ở stack mỏng và dày (quan sát của agent) | artwork.md → Paragraph multi-stroke (TIB-5580 / TIB-220 …) · storefront-sdk.md (chưa có mục paragraph stroke) | CHƯA ĐỦ — cần re-explore |
| TIB-5580 — Chỉ round stroke ở preview, PNG, SVG | portal · api (PNG) · vectorize (SVG) | TC-TIB-6323 PASS 2026-10-22 nhưng bước SVG chưa kiểm (không tải được SVG) | artwork.md → Paragraph multi-stroke (TIB-5580 / TIB-220 …) | CHƯA ĐỦ — cần re-explore |
| TIB-5580 — Tắt stroke thì không vẽ gì ở preview/PNG/SVG, bật lại thì các lớp cũ quay lại | portal · api (PNG) · vectorize (SVG) | TC-TIB-6324 PASS 2026-10-21 cho editor + API (stroke_enabled=false, stroke_layers giữ nguyên) nhưng bước SVG chưa kiểm | artwork.md → Paragraph multi-stroke (TIB-5580 / TIB-220 …) | CHƯA ĐỦ — cần re-explore |
| TIB-5580 — Convert text ↔ paragraph giữ nguyên stack; convert sang curve/warp gộp về lớp trong cùng | portal (convert layer) · api | Đã có case PASS trên staging (làm trên bản copy #5214) | artwork.md → Paragraph multi-stroke (TIB-5580 / TIB-220 …) · artwork.md → Text layer multi-stroke (TIB-5417 …) (rule convert) | ĐỦ TIN CẬY (test case PASS TC-TIB-6325 2026-10-21 staging nprice1 [AI]; TC-TIB-6326 2026-10-21 staging nprice1 [AI] — build: staging @ 2026-10-21 → 2026-10-22 — sau lần TIB-5580 giao QA cuối (2026-10-15, chuyển QA Review); chưa có Fix Version; chưa release; SDK storefront staging app-v2.js VERSION 20260929 (chưa có PR sdk #2124); build hash: không rõ (QA không có quyền repo)) |
| TIB-5580 — Linked paragraph: mọi lớp stroke scale theo tỉ lệ width | portal · storefront · api (PNG) | TC-TIB-6327 Blocked: editor/API đạt nhưng storefront SDK chưa có code | artwork.md → Paragraph multi-stroke (TIB-5580 / TIB-220 …) · chưa rõ mục linked layer, cần tự đánh giá | CHƯA ĐỦ — cần re-explore |
| TIB-5580 — Global template: stroke_layers là field local của paragraph; spiral/shape text vẫn 1 stroke | portal (global template) · api | TC-TIB-6328 Blocked: fixture #5186 dựng qua API không render trong Artwork Editor — chưa rõ lỗi fixture hay lỗi sản phẩm | chưa rõ, cần tự đánh giá (canon không có mục global template cho stroke) | CHƯA ĐỦ — cần re-explore |
| TIB-5580 — Autoscale paragraph 3 lớp stroke dày không bị cắt mép viền | portal · storefront · api (PNG) | TC-TIB-6329 Blocked: PNG đạt, storefront SDK chưa có code, SVG không tải được | artwork.md → Paragraph multi-stroke (TIB-5580 / TIB-220 …) | CHƯA ĐỦ — cần re-explore |
| TIB-5580 — Paragraph chỉ có stroke legacy (không có stroke_layers) giữ nguyên hình trong editor; mở popover thì lift thành stack 1 row không đổi hình | portal (editor) | Đã có case PASS trên staging (bản copy #5212 của #5181); chưa kiểm storefront/SVG | artwork.md → Paragraph multi-stroke (TIB-5580 / TIB-220 …) | ĐỦ TIN CẬY (test case PASS TC-TIB-6330 2026-10-21 staging nprice1 [AI] — build: staging @ 2026-10-21 → 2026-10-22 — sau lần TIB-5580 giao QA cuối (2026-10-15, chuyển QA Review); chưa có Fix Version; chưa release; SDK storefront staging app-v2.js VERSION 20260929 (chưa có PR sdk #2124); build hash: không rõ (QA không có quyền repo)) |
| TIB-5580 — Custom Shape (shape-text) giữ popover 1 stroke, render không đổi | portal · api | Đã có case PASS trên staging | artwork.md → Paragraph multi-stroke (TIB-5580 / TIB-220 …) | ĐỦ TIN CẬY (test case PASS TC-TIB-6331 2026-10-21 staging nprice1 [AI] — build: staging @ 2026-10-21 → 2026-10-22 — sau lần TIB-5580 giao QA cuối (2026-10-15, chuyển QA Review); chưa có Fix Version; chưa release; SDK storefront staging app-v2.js VERSION 20260929 (chưa có PR sdk #2124); build hash: không rõ (QA không có quyền repo)) |
| TIB-5580 — Paragraph legacy-schema giữ popover 1 stroke, không có stack editor | portal · api | TC-TIB-6332: phần UI đạt nhưng PUT /api/artworks/5187 (AW 1.0) trả 500 kể cả khi không sửa gì; Testlane đang Passed trong khi actualResult ghi Blocked | artwork.md → Paragraph multi-stroke (TIB-5580 / TIB-220 …) · artwork.md → Artwork 1.0 vs 2.0 | CHƯA ĐỦ — cần re-explore |
| TIB-5580 — Shadow paragraph áp 1 lần cho cả khối ở vectorize và API PNG (PR api #4016); preview/PNG/SVG không được lệch shadow | storefront (SDK) · api (PNG) · vectorize (SVG) | Hành vi do dev mô tả trong comment + đáp án Slack của QA; TC-TIB-6313 (Testlane Passed nhưng actualResult ghi Blocked) và TC-TIB-6335 Blocked vì SDK chưa có code và không tải được SVG. Có thể làm SAI mục shadow paragraph của TIB-5472 trong canon | artwork.md → Paragraph gains Drop shadow (TIB-5472 …) · artwork.md → Drop shadow blur vs preview scale | CHƯA ĐỦ — cần re-explore |
| TIB-5580 — Fill opacity < 1: bleed trong phạm vi một dòng là Known Issue; vùng stroke 2 dòng chồng nhau bị đậm gấp đôi là Fail | api (PNG) · vectorize (SVG) · storefront | TC-TIB-6333 / TC-TIB-6334 Blocked: không tải được SVG, SDK chưa có code. Order #1095: vòng stroke trắng trên PNG ~2.5px so với ~10px trên editor (quan sát của agent, chưa rõ nguyên nhân) | artwork.md → Text layer multi-stroke (TIB-5417 …) (known limitation opacity) · artwork.md → Paragraph multi-stroke (TIB-5580 / TIB-220 …) | CHƯA ĐỦ — cần re-explore |
| TIB-5580 — Regression: multi-stroke text 1 dòng (TIB-5417) không đổi trong editor | portal · api | Đã có case PASS trên staging; bước SVG chưa kiểm | artwork.md → Text layer multi-stroke (TIB-5417 …) | ĐỦ TIN CẬY (test case PASS TC-TIB-6337 2026-10-21 staging nprice1 [AI] — build: staging @ 2026-10-21 → 2026-10-22 — sau lần TIB-5580 giao QA cuối (2026-10-15, chuyển QA Review); chưa có Fix Version; chưa release; SDK storefront staging app-v2.js VERSION 20260929 (chưa có PR sdk #2124); build hash: không rõ (QA không có quyền repo)) |
| TIB-5580 — Buyer chèn stroke_layers vượt giới hạn (4 entry, width "abc") qua request personalization | api (POST /api/merchant/shopify/customization) · storefront (localStorage) · api (PNG order) | TC-TIB-6338 Failed → BUG-357: API trả 201 và trả lại nguyên payload chèn; localStorage và PNG order #1100 không bị ảnh hưởng. Canon nói server "silently ignores rather than rejecting" là an toàn, còn RA (Q6 "Có validate") coi lọt là bug — mâu thuẫn chưa ai phân xử | artwork.md → Text layer multi-stroke (TIB-5417 …) (dòng "A buyer cannot inject strokes") | CHƯA ĐỦ — cần re-explore |
| Canon chưa commit — câu "Saving it once rewrites it to the new schema" về bản copy AW 1.0 | portal · api (PUT /api/artworks/{id}) | Lượt chạy thấy PUT /api/artworks/5187 trả 500, không Save được — mâu thuẫn với câu đang có trong working copy artwork.md | artwork.md → Paragraph multi-stroke (TIB-5580 / TIB-220 …) (gạch đầu dòng Fixture gotcha) | CHƯA ĐỦ — cần re-explore |

- Một claim có khả năng làm SAI một checklist/automation đang publish (không chỉ THIẾU coverage) → nêu rõ checklist_id/mã check nghi ngờ, đây là tín hiệu ưu tiên cao hơn "gap" thông thường.
- Nghi ngờ ranh giới object hiện tại không còn hợp lý → nêu Ý TƯỞNG, **không tự quyết tên object_key mới**.
- Không chắc surface nào bị ảnh hưởng → ghi "chưa rõ, cần tự đánh giá", **không bỏ trống**.
- Cột "Độ tin cậy" quyết định người/agent xử lý CCR có được phép bỏ qua việc re-explore claim này hay không — chỉ ghi "ĐỦ TIN CẬY" khi có 1 trong 2, kèm trích dẫn cụ thể:
  - **Test case đã chạy PASS**: id + ngày chạy + build, kiểm đúng hành vi đang claim.
  - **PO/Dev confirm rõ ràng**: trích nguyên văn + link, xác nhận đúng hành vi đang claim.
  - Chỉ có screenshot/API capture tự chụp → bắt buộc ghi "CHƯA ĐỦ — cần re-explore", dù tin chắc đến đâu.

---

## Phần 2 — Thấy nó ở đâu `[AGENT]`

- **URL / ID cụ thể đã biết:** https://ownego.atlassian.net/browse/TIB-5580 · staging instance 520 (nprice1.myshopify.com) · artwork #5177–#5184, #5186, #5187, #5212, #5214 · campaign #3093–#3101 · order Bogus #1091–#1100 (portal orders/4744–4756) · POST /api/merchant/shopify/customization · PUT /api/artworks/{id} · BUG-357
- **Trạng thái đối tượng lúc quan sát/lúc ticket mô tả:** Ticket ở QA Review, 4 PR (api #4016, portal #3820, sdk #2124, vectorize #76) Jira báo OPEN; staging có phần API + portal, SDK storefront chưa có (app-v2.js VERSION 20260929)
- **Environment mô tả trong ticket gốc (không nhất thiết là môi trường sẽ dùng để re-explore):** staging
- **Role liên quan:** owner/staff (Artwork Editor, campaign) · guest buyer (storefront personalization, TC-TIB-6338)
- **Surface:** `portal` · `storefront` · `api` · `db`

---

## Phần 3 — Để không sinh conflict giả `[AGENT]`

> Phần lớn "conflict" phát sinh không phải mâu thuẫn thật, mà do hai quan sát đều đúng nhưng không ai ghi rõ chúng chạy trên build nào.

Với MỖI ticket:

- **Build / version / ngày deploy:** staging @ 2026-10-21 → 2026-10-22 — sau lần TIB-5580 giao QA cuối (2026-10-15, chuyển QA Review); chưa có Fix Version; chưa release; SDK storefront staging app-v2.js VERSION 20260929 (chưa có PR sdk #2124); build hash: không rõ (QA không có quyền repo)
- **Ngày resolve/update cuối:** 2026-10-20
- **Đã ship chưa:** Chưa — status QA Review, chưa Resolution, chưa Fix Version

**Context hiện đang nói gì** `[AGENT]` — tra canon TRƯỚC khi gửi

- Context version đang dùng: không có manifest — artwork.md commit cuối 2026-10-19 + bản sửa local chưa commit (thêm mục Paragraph multi-stroke TIB-5580)
- Canon hiện nói: artwork.md → Text layer multi-stroke (TIB-5417, dev implementation comment 2026-09-21): "- **Scope of phase 1:** normal (single-line) Text layers on the **new schema / Artwork 2.0** only, round stroke only, 2–3 layers. Covers editor portal, storefront preview, order render, vector export and PSD import. **Paragraph stays at one stroke** (dropped from phase 1 in the same comment), and curve / warp / spiral / shape-text are phase 2." ▸ "- **Paragraph ignores `stroke_layers` entirely** — a Paragraph carrying three rings renders the single legacy `stroke_color`/`stroke_width` ring only, which is the "Paragraph stays at one stroke" scope behaving as specified (verified through MCP 2026-10-01)." (bản commit 2026-10-19; working copy đã thêm sau câu này: "⚠️ **Superseded for new-schema Paragraphs as of the 2026-10-21 build** — TIB-5580 brought the stack to Paragraph, see the section below.") ▸ "- **A buyer cannot inject strokes.** Posting a storefront customization payload carrying its own `stroke_layers` is accepted with a success response and then **ignored at render** — the merchant's strokes are used. Note the shape of it: the server silently ignores rather than rejecting, so a case that only checks the HTTP response would read as a security hole when the render is in fact safe." ▸ artwork.md → Paragraph gains Drop shadow (TIB-5472 …): "- **Fix spans 4 repos** (dev comment): api (print file), vectorize, sdk (preview/storefront — applies the shadow filter once over the whole rendered block, not per line), portal (surfaces the Shadow field in the Paragraph quick editor)." ▸ artwork.md → Paragraph multi-stroke (TIB-5580 / TIB-220, verified on staging 2026-10-21) — mục mới trong working copy, CHƯA commit: "- **The stack reached the API and the portal, not the storefront SDK.**" và "- **The PNG (api) render matched the editor preview** for both a thin and a thick stack. The **SVG / vectorize** file could not be pulled from the staging portal at all, so nothing about the vector path was concluded."
- Đã tra bằng từ khoá nào: "stroke_layers", "Paragraph", "multi-stroke", "5580", "5417", "shadow" trong teeinblue/TIB automation/context/*.md (artwork.md, storefront-sdk.md, api-endpoints.md, campaign.md, run-rules.md); "paragraph.*stroke" trong teeinblue/TIB context/[CONTEXT] Slack.md, daily_issues.md, missed_cases.md, qa_memory.md, KB.txt, support_usecases.md (không có kết quả); "TIB-5580" trong [CONTEXT] Jira.txt, [CONTEXT] QA.txt (không có kết quả)
- Không tra được canon → ghi rõ "không tra được — cần người/agent xử lý CCR tự tra lại".

---

## Phần 4 — Hai câu chỉ con người trả lời được `[BẠN]`

### 4.1 Có ai xác nhận đây là hành vi ĐÚNG không?

- Ai xác nhận: KHÔNG AI — chỉ là mô tả/comment của dev; đáp án Q1–Q9 trên Slack là của QA ([QA member]), không phải PO/business; test case PASS chỉ cover phần portal/editor. ⏳ CHỜ BẠN: có PO/business xác nhận ngoài Jira/Slack không?
- Ở đâu, ngày nào: comment dev [dev] 2026-10-16 trên TIB-5580; thread Slack #req-[qa-channel] ts 1792556100.094559 (2026-10-21 14:22 và 14:49, người trả lời: QA); test case PASS TC-TIB-6312/6314–6318/6324–6326/6330/6331/6337 ngày 2026-10-21 trên staging
- Họ xác nhận chính xác điều gì: comment dev: "each stroke layer is painted across every line before the next one, outermost first, then the fill of every line" — không có câu xác nhận nào của PO/business

> Comment kỹ thuật dev tự viết (kể cả "Ready to test", "Resolution: Done") **KHÔNG PHẢI** PO/business sign-off. Không ai xác nhận thật → knowledge vào context với nhãn "quan sát hiện tại" (chưa xác nhận), không dùng làm expected result.

### 4.2 KHÔNG đề xuất điều gì?

**Bắt buộc.** Liệt kê rõ những gì KHÔNG được coi là đã xác nhận/đã duyệt dù có trong ticket:

```
Ngưỡng 15px tách 2 đường vẽ stroke của API — số dev ghi trong mục test, chưa ai xác nhận là cố định. ▸ Loại trừ Custom Shape + paragraph legacy-schema khỏi multi-stroke — quyết định của dev; "đồng ý" trên Slack là của QA, không phải PO. ▸ Hành vi shadow mới (áp 1 lần cho cả khối ở vectorize + API) — chỉ là mô tả dev + đáp án QA, chưa quan sát được trên SVG. ▸ Các đáp án Slack Q1–Q9 ngày 2026-10-21 trong RA (C5–C9, R10–R16) — đều do QA trả lời, không phải PO/business sign-off. ▸ Kết luận "server bỏ qua stroke_layers buyer chèn là an toàn" (canon) và "lọt validate là bug" (RA, BUG-357) — chưa chọn bên nào. ▸ Số đo order #1095 (vòng trắng ~2.5px trên PNG so với ~10px trên editor) — đo bằng mắt từ ảnh, chưa phải số liệu. ▸ Mục "Paragraph multi-stroke (TIB-5580 / TIB-220 …)" đang có trong working copy artwork.md (chưa commit) — không coi là canon đã duyệt. ▸ Ranh giới object: không đề xuất tách Paragraph stroke thành object riêng; vị trí ghi chỉ là file → heading.
```

### 4.3 Đề xuất context nên nói gì `[AGENT soạn, BẠN duyệt]`

```
Paragraph new-schema (Artwork 2.0) mang được tối đa 3 lớp stroke (stroke_layers, lớp trong cùng trước, mỗi width là độ dày riêng và cộng dồn khi render): editor có stack editor, nút Add stroke tắt ở 3 lớp, Save/reload, xoá/đổi thứ tự và convert text ↔ paragraph giữ nguyên stack, convert sang curve/warp gộp về lớp trong cùng (quan sát trên staging 2026-10-21). Custom Shape (shape-text) và paragraph legacy-schema giữ 1 stroke. Theo mô tả dev, cả preview (SDK), PNG (API) và SVG (vectorize) vẽ từng lớp qua mọi dòng, lớp ngoài trước, fill sau cùng, và shadow paragraph áp 1 lần cho cả khối — phần render storefront/SVG và shadow CHƯA được verify (SDK staging chưa có code, SVG không tải được), cần re-explore trước khi dùng làm expected result. Câu "Paragraph stays at one stroke" / "Paragraph ignores stroke_layers entirely" ở mục TIB-5417 không còn đúng cho paragraph new-schema.
```

### 4.4 Mức độ gấp `[BẠN]`

`HIGH` (đang chặn test P0/P1) · `MEDIUM` (ảnh hưởng coverage) · `LOW` (cải thiện dần)

---

## Phần 5 — Evidence `[AGENT]`

Link Jira ticket / ảnh / response / HAR: https://ownego.atlassian.net/browse/TIB-5580 · Testlane task TIB-220 (TC-TIB-6312 → TC-TIB-6338) · BUG-357 · report https://claude.ai/artifact/5vvWKMFBHY1sQjE9ERB7vc · teeinblue/TIB automation/qa-output/analysis_TIB-5580.md · teeinblue/TIB automation/qa-output/api-observations_TIB-220.json · PR api #4016, portal #3820, sdk #2124, vectorize #76 (chỉ ghi nhận, chưa đọc)

> **Trước khi đính kèm: bỏ email, số điện thoại, địa chỉ, tên khách hàng thật, token, cookie, credential.** Tên nội bộ dev/support trong comment Jira thường chấp nhận được, nhưng vẫn kiểm kỹ.

---

## Tự kiểm trước khi gửi

`[BẠN]`:
- [ ] Đây thật sự là **một** thứ được gỡ độc lập (Phần 0)
- [ ] Đã trả lời mục 4.1 trung thực — kể cả khi câu trả lời là "không ai, chỉ là comment dev"
- [ ] Đã điền mục 4.2
- [ ] Evidence đã bỏ PII/token/credential

`[AGENT]`:
- [ ] Số lần xác nhận trực tiếp là con số thật, không làm tròn lên
- [ ] Đã ghi build/ngày resolve hoặc thừa nhận "không rõ" cho từng ticket
- [ ] Đã ghi rõ từ khoá đã tra canon (hoặc lý do không tra được)
- [ ] Mỗi ticket/claim trong "Quan sát được" đều có 1 dòng tương ứng trong "Phạm vi cần re-explore & ảnh hưởng ước tính"
- [ ] Cột "Độ tin cậy" của mỗi dòng đã ghi đúng 1 trong 3 trạng thái, có trích dẫn cụ thể khi ghi "ĐỦ TIN CẬY"
- [ ] Không còn placeholder dạng ba dấu nhỏ hơn … ba dấu lớn hơn nào sót lại trong file
