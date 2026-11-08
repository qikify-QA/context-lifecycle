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

**Loại:** `NEW_FEATURE`

**Object** `[AGENT]` — lấy từ `_registry.json` (hoặc tương đương) của knowledge base đích, nếu có quyền truy cập

- Product: `teeinblue`
- Object: `campaign` (chính; kèm `product-base`, `sdk` — từng claim ở Phần 1b) · Feature: `create-campaign-by-product-base` (chính; kèm `create-campaign-by-shopify`, `mockup-attachment`, `product-base-campaign-link`, `product-page-settings-config`, `storefront-buyer-facing` và vài `MỚI:` — xem Phần 1b)
- Không khớp object nào trong registry, hoặc không tra được registry? Mô tả bằng lời. **Đừng bịa một `object_key` không có thật.**

**Quan sát được** `[AGENT]` — tổng hợp từ (các) ticket, KHÔNG phải suy đoán

```
TIB-5428 — "Assign videos to variants" (Story, reporter/assignee huyenntk, tạo 2026-09-11).
Trạng thái: Done — QA Passed 2026-10-26 (chienct), Done 2026-10-27 (tinhpt); resolution Done, resolutiondate 2026-10-26;
không có Fix Version; Development: 4 PR GitHub MERGED (cập nhật cuối 2026-10-27), 3 build thành công.
Lịch sử: To Do → In Progress 2026-10-14 → Code Review 2026-10-14 → QA Review 2026-10-15 (giao QA, không có lần trả lại dev).
Description:
- Case: video (URL Youtube/Vimeo) chưa gán được cho variant; bật "Show only the assigned images of the selected variant"
  thì video bị loại khỏi gallery. Shopify không hỗ trợ gán video cho variant → xử lý bằng gallery SDK.
- Portal: áp dụng Product Base editor, Campaign by Product Base, Campaign by Shopify products — "Add video items alongside
  mockups in the assignment picker", "Multiple videos can be assigned to multiple variants".
- Product Page settings: đổi label thành "Show only the assigned images and videos of the selected variant".
- Backend: giữ flow sync video từ URL vào Shopify product media; lưu mapping variant-video riêng phía Teeinblue cho SDK.
- SDK: setting ON → gallery hiện video gán cho variant đang chọn; variant có video nhưng không có mockup → Shopify variant
  image để trống, gallery SDK hiện video đã gán.
Comment (2): 2026-09-11 trangdh — link hội thoại hỗ trợ khách (không nêu hành vi); 2026-10-23 trangdh — link thread Slack
#tib-devs "[TIB-5428] Assign videos to variants" (nội dung thread không đọc được). Không có comment "Context"/"Behaviour changes".
Luật chi tiết chốt qua Slack #req-chienct (thread ts 1792567996.329239, 2026-10-21, 4 vòng) — file RA C1–C24:
C12/C20 Save khi chỉ chọn video, rỗng không Save, video hiện bằng thumbnail, là dòng riêng trong view · C23 setting ON chỉ
hiện media gán cho variant đang chọn (lật một lần ở vòng 3, xác nhận cứng vòng 4) · C17 variant chỉ video → đúng tập video ·
C18 variant 0 assignment → hiện tất cả · C10 setting OFF → hiện tất cả · C24 variant chỉ video → không preview cá nhân hoá ·
C8 thứ tự theo list media, Always load first đứng đầu + focus · C7 variant chỉ video → variant image trống · C13 variant
image = mockup gán đầu tiên · C14 giữ assignment khi import/duplicate/clone/bulk create · C15 sửa URL giữ, xoá video/variant
mất · C11/C19 Etsy bỏ qua video, picker Etsy ẩn video · C16/C22 migration chỉ đổi format, assignment trống.
Còn treo: Q12 (Blocker — store bật setting mất video sau migration?), Q13, Q14, Q15.
Testlane TIB-221 (35 case, test-executor [AI] chạy 2026-10-22 trên staging, instance 520 / Nprice1):
- actualResult: 28 đạt / 1 Fail (TC-6433, BUG-362) / 2 Blocked (TC-6443, 6444 — Etsy) / 2 not-run (TC-6445, 6446 —
  migration) / TC-6432 lượt 10-22 FAIL (BUG-359), nay actualResult chỉ còn 1 ảnh / TC-6413 đạt nhưng đang gắn BUG-376.
- Trạng thái Testlane hiện tại: 33 passed + 2 skipped (task done 2026-10-27) — lệch actualResult, không dùng làm bằng chứng.
- Bug ghi khi chạy: BUG-359 (Always load first chỉ đổi focus), BUG-360 (sửa URL giữ thumbnail cũ), BUG-361 (campaign tạo
  từ PB có video mất URL/thumbnail), BUG-362 (variant chỉ-video vẫn có variant image); thêm BUG-376 gắn TC-6413 (chưa rõ).
```

- Nguồn: `1 ticket Jira đã Done (TIB-5428) + file RA analysis_TIB-5428.md (Slack #req-chienct 2026-10-21) + 35 test case Testlane TIB-221 chạy trực tiếp trên staging 2026-10-22 bởi test-executor [AI]`
- Thấy mấy lần / xác nhận trực tiếp mấy lần: `1 lượt chạy trên staging 2026-10-22 [AI]: 28 case đạt theo actualResult (trong đó TC-6413 đang gắn BUG-376), 2 fail (TC-6432, TC-6433), 2 Blocked, 2 not-run — production: 0`

**Thử gì mà KHÔNG tái hiện / chưa thử gì** `[AGENT + BẠN]`

```
[AGENT]
- Chưa thử trên production (ticket Done 2026-10-27, chưa có lượt nào sau release).
- Chưa chạy lại case nào sau 2026-10-22 có ghi actualResult kèm ngày (dù Jira chuyển QA Passed 2026-10-26).
- Etsy (C11, C19, Q13): chưa thử — không có store Etsy trong org test (TC-TIB-6443/6444 Blocked).
- Migration (C16, C22, Q12): chưa thử — không có campaign tạo trước deploy dùng được (TC-TIB-6445/6446 not-run).
- Campaign by Shopify products: chỉ kiểm picker (TC-TIB-6415) trên product thay thế "Selling Plans Ski Wax"; chưa kiểm
  gán/gallery/sync của loại campaign này.
- Gán nhiều-nhiều và luật lọc gallery chỉ chạy trên Campaign by PB; PB editor chỉ kiểm picker + kế thừa sang campaign.
- Form cá nhân hoá / order design của variant chỉ-video (Q15): chưa có luật nên chưa kiểm.
- Vimeo 76979871: sync báo "Can not upload images to shopify" — chưa thử trên bản trước ticket để biết lỗi cũ hay mới.
- Thread Slack #tib-devs (link trong comment Jira 2026-10-23) chưa đọc được nội dung.
[BẠN]
⏳ CHỜ BẠN: bạn đã tự thử gì (ngoài 35 case Testlane) mà kết quả test không ghi lại không?
⏳ CHỜ BẠN: TC-TIB-6432, 6433, 6443, 6444 đang "passed" trên Testlane nhưng actualResult ghi FAIL/Fail/Blocked (6432 chỉ còn 1 ảnh) — bạn có retest không, ngày nào, kết quả gì? Có thì gửi actualResult + ngày để nâng CLAIM-14/15/24.
⏳ CHỜ BẠN: BUG-359, BUG-360, BUG-361, BUG-362 đã được dev fix và retest chưa, ngày nào? Fix sau 2026-10-22 chạm flow của một claim `test_case` (vd thứ tự gallery CLAIM-13, sync CLAIM-16) thì claim đó phải hạ xuống `KHÔNG CÓ NGUỒN`.
⏳ CHỜ BẠN: BUG-376 (đang gắn TC-TIB-6413, PB editor picker) là bug gì, tạo ngày nào? (quyết định CLAIM-03)
```

## Phần 1a — Phạm vi thay đổi & ảnh hưởng ước tính `[AGENT]` — BẮT BUỘC

> Mục này khác "Quan sát được" ở trên: nó không mô tả CÁI GÌ đã xảy ra, mà là **CẦN LÀM GÌ TIẾP**. Agent nhận CCR đọc xong phải biết ngay việc cần làm và phạm vi ảnh hưởng dây chuyền — không phải tự dò lại từ ticket gốc.

Một dòng cho MỖI claim/ticket riêng biệt trong "Quan sát được":

| Claim ID | Thay đổi / claim | Surface liên quan | Nguồn & độ mạnh | Object/feature/checklist bị ảnh hưởng | Quan hệ với canon |
|---|---|---|---|---|---|
| `CLAIM-01` | `TIB-5428 — Campaign by Product Base editor: modal Assign mockups hiện video (thumbnail + icon play) cùng grid với mockup, theo thứ tự list media; chọn được video để gán` | `portal (modal Assign mockups của campaign editor)` | `test_case` — PASS TC-TIB-6414 2026-10-22 staging [AI] — build: staging @ 2026-10-22 (sau lần giao QA cuối 2026-10-15) | `campaign/create-campaign-by-product-base (KB nút Assign mockups ở STEP2)` | `ADD` |
| `CLAIM-02` | `TIB-5428 — Campaign by Shopify products editor: modal Assign mockups hiện video cạnh mockup và chọn được (quan sát trên platform product #589, product thay thế có 3 variant)` | `portal (modal Assign mockups của platform product)` | `test_case` — PASS TC-TIB-6415 2026-10-22 staging [AI] — build: staging @ 2026-10-22 (sau lần giao QA cuối 2026-10-15) | `campaign/create-campaign-by-shopify; KB-021 (modal khi chưa có mockup — không mâu thuẫn)` | `ADD` |
| `CLAIM-03` | `TIB-5428 — Product Base editor: modal Assign mockups hiện video V1/V2 cạnh 3 mockup và chọn được` | `portal (modal Assign mockups của PB editor)` | `KHÔNG CÓ NGUỒN` — TC-TIB-6413 actualResult ghi đạt (2026-10-22) nhưng case đang gắn BUG-376 — nội dung/ngày bug chưa đọc được qua MCP, chưa biết bug có chạm hành vi này không | `product-base/mockup-attachment — KB-052 (modal có cột Select variants/Select mockups), CHK-06-009` | `ADD` |
| `CLAIM-04` | `TIB-5428 / C3 — gán video ↔ variant nhiều-nhiều (1-n, n-1, n-n) ở campaign editor; mutation AssignMockupVariantIds set variant_ids cho đúng video, không xoá mapping video khác` | `portal · api (POST /api/graphql AssignMockupVariantIds)` | `test_case` — PASS TC-TIB-6416 2026-10-22 staging [AI]; PASS TC-TIB-6417 2026-10-22 staging [AI]; PASS TC-TIB-6418 2026-10-22 staging [AI] — build: staging @ 2026-10-22 (sau lần giao QA cuối 2026-10-15) | `campaign/create-campaign-by-product-base; tương tự KB-085 (PB dùng update_mockups_many)` | `ADD` |
| `CLAIM-05` | `TIB-5428 / C12 — modal Assign: Save được khi chỉ chọn video (0 mockup); không chọn media nào thì Save disabled; video hiện bằng thumbnail của chính video (YouTube/Vimeo)` | `portal · api` | `test_case` — PASS TC-TIB-6419 2026-10-22 staging [AI]; PASS TC-TIB-6420 2026-10-22 staging [AI]; PASS TC-TIB-6421 2026-10-22 staging [AI] — build: staging @ 2026-10-22 (sau lần giao QA cuối 2026-10-15) | `campaign/create-campaign-by-product-base; product-base/mockup-attachment CHK-06-009 (điều kiện Save)` | `ADD` |
| `CLAIM-06` | `TIB-5428 / C20 — view Mockup assignments (Group by Mockup và Group by Variant): video là một dòng/thumbnail riêng, không gộp vào dòng mockup` | `portal` | `test_case` — PASS TC-TIB-6422 2026-10-22 staging [AI] — build: staging @ 2026-10-22 (sau lần giao QA cuối 2026-10-15) | `campaign/create-campaign-by-product-base` | `ADD` |
| `CLAIM-07` | `TIB-5428 / C4 — label setting Product Page đổi thành "Show only the assigned images and videos of the selected variant"; trang không còn chuỗi cũ (config key vẫn là show_assigned_variant_images_only)` | `portal (Store Settings → Product Page Settings)` | `test_case` — PASS TC-TIB-6423 2026-10-22 staging [AI] — build: staging @ 2026-10-22 (sau lần giao QA cuối 2026-10-15) | `sdk/product-page-settings-config — KB-025 và CHK-003 đang ghi đúng chuỗi label CŨ → CHK-003 có thể chạy SAI (không chỉ thiếu); KB-038 (key config không đổi)` | `SUPERSEDES` |
| `CLAIM-08` | `TIB-5428 / C6, C23 — setting ON: gallery SDK chỉ hiện media (mockup + video) đã gán cho variant đang chọn; media không gán hoặc gán variant khác bị ẩn; đổi variant liên tục lọc lại đúng (storefront chỉ đổi sau Update/Sync campaign)` | `storefront (SDK gallery) · api (GET /api/merchant/campaigns/<id>.json, PUT /api/instances/520/config)` | `test_case` — PASS TC-TIB-6424 2026-10-22 staging [AI]; PASS TC-TIB-6425 2026-10-22 staging [AI]; PASS TC-TIB-6426 2026-10-22 staging [AI]; PASS TC-TIB-6447 2026-10-22 staging [AI] — build: staging @ 2026-10-22 (sau lần giao QA cuối 2026-10-15) | `sdk/storefront-buyer-facing; sdk/product-page-settings-config` | `ADD` |
| `CLAIM-09` | `TIB-5428 / C17 — setting ON, variant chỉ gán video (0 mockup): gallery đúng bằng tập video đã gán, không fallback hiện tất cả mockup` | `storefront (SDK gallery)` | `test_case` — PASS TC-TIB-6427 2026-10-22 staging [AI] — build: staging @ 2026-10-22 (sau lần giao QA cuối 2026-10-15) | `sdk/storefront-buyer-facing` | `ADD` |
| `CLAIM-10` | `TIB-5428 / C24 — setting ON, variant chỉ gán video: gallery và popup Preview chỉ có video, không render ảnh preview cá nhân hoá (không lấy mockup không gán làm nguồn preview)` | `storefront (SDK gallery, popup Preview)` | `test_case` — PASS TC-TIB-6428 2026-10-22 staging [AI] — build: staging @ 2026-10-22 (sau lần giao QA cuối 2026-10-15) | `sdk/storefront-buyer-facing; form cá nhân hoá / order design của variant này chưa có luật (Q15)` | `ADD` |
| `CLAIM-11` | `TIB-5428 / C18 — setting ON, variant không gán gì (0 mockup + 0 video): gallery hiện toàn bộ mockup + video của campaign` | `storefront (SDK gallery)` | `test_case` — PASS TC-TIB-6429 2026-10-22 staging [AI] — build: staging @ 2026-10-22 (sau lần giao QA cuối 2026-10-15) | `sdk/storefront-buyer-facing` | `ADD` |
| `CLAIM-12` | `TIB-5428 / C10 — setting OFF: gallery hiện toàn bộ mockup + video với mọi variant, assignment còn lưu nhưng không lọc` | `storefront (SDK gallery) · api (PUT /api/instances/520/config)` | `test_case` — PASS TC-TIB-6430 2026-10-22 staging [AI] — build: staging @ 2026-10-22 (sau lần giao QA cuối 2026-10-15) | `sdk/storefront-buyer-facing; sdk/product-page-settings-config` | `ADD` |
| `CLAIM-13` | `TIB-5428 / C8 (phần thứ tự) — gallery xếp theo thứ tự list media của campaign; video nằm giữa list giữ đúng vị trí (Always load first = OFF)` | `storefront (SDK gallery) · portal (list media)` | `test_case` — PASS TC-TIB-6431 2026-10-22 staging [AI] — build: staging @ 2026-10-22 (sau lần giao QA cuối 2026-10-15) | `sdk/storefront-buyer-facing` | `ADD` |
| `CLAIM-14` | `TIB-5428 / C8 (phần Always load first) — video bật Always load first và gán variant đang chọn: đứng đầu gallery và là item focus` | `storefront (SDK gallery) · portal (Always load first)` | `KHÔNG CÓ NGUỒN` — TC-TIB-6432 chạy 2026-10-22 FAIL (BUG-359: chỉ đổi focus, vẫn ở vị trí 2); actualResult hiện chỉ còn 1 ảnh, status passed không ngày; Q14 treo | `sdk/storefront-buyer-facing` | `ADD` |
| `CLAIM-15` | `TIB-5428 / C7 — variant chỉ gán video (0 mockup) → Shopify variant image để trống` | `api (sync/publish Shopify) · storefront (/products/<handle>.json)` | `KHÔNG CÓ NGUỒN` — TC-TIB-6433 actualResult ghi Fail 2026-10-22, BUG-362 (variant chỉ-video vẫn nhận mockup đầu tiên làm variant image); status passed không ngày | `campaign (sync Shopify); local mockup.md → TIB-4283` | `ADD` |
| `CLAIM-16` | `TIB-5428 / C13 — variant gán video + mockup, video đứng đầu thứ tự assignment → Shopify variant image = mockup gán đầu tiên, video bị bỏ qua` | `api (sync Shopify) · storefront` | `test_case` — PASS TC-TIB-6434 2026-10-22 staging [AI] — build: staging @ 2026-10-22 (sau lần giao QA cuối 2026-10-15) | `campaign (sync Shopify); local mockup.md → TIB-4283` | `ADD` |
| `CLAIM-17` | `TIB-5428 / C5 — sync campaign: video từ URL vẫn vào Shopify product media như cũ, không variant Shopify nào gán video; mapping variant-video chỉ lưu phía Teeinblue` | `api (POST /api/campaigns/<id>/sync) · storefront (Storefront API product media)` | `KHÔNG CÓ NGUỒN` — TC-TIB-6435 đạt với YouTube dQw4w9WgXcQ và Vimeo 22439234, nhưng Vimeo 76979871 không vào Shopify media và sync #3122 báo lỗi chung; chưa rõ lỗi cũ hay mới | `campaign (sync Shopify)` | `ADD` |
| `CLAIM-18` | `TIB-5428 / C14 (một phần) — duplicate video/mockup trong campaign và Duplicate campaign giữ nguyên assignment video (và cả mockup ảnh)` | `portal · api (POST /api/campaign-mockups/<id>/clone, POST /api/campaigns/<id>/clone)` | `test_case` — PASS TC-TIB-6437 2026-10-22 staging [AI]; PASS TC-TIB-6438 2026-10-22 staging [AI] — build: staging @ 2026-10-22 (sau lần giao QA cuối 2026-10-15) | `campaign/create-campaign-by-product-base; phù hợp KB-086 (duplicate mockup PB copy variant_ids); NGƯỢC local mockup.md (TIB-5237: duplicate campaign để mockup unassigned)` | `ADD` |
| `CLAIM-19` | `TIB-5428 / C14 (một phần) — import mockup từ PB sang campaign mới và bulk create campaign từ PB kế thừa assignment video của PB` | `portal · api (POST /api/campaign-mockups/generate, POST /api/artworks/<id>/campaigns)` | `KHÔNG CÓ NGUỒN` — TC-TIB-6436, TC-TIB-6439 đạt phần assignment 2026-10-22 nhưng cùng flow có BUG-361 (video mất URL/thumbnail); chưa rõ BUG-361 fix/retest ngày nào | `product-base/product-base-campaign-link` | `ADD` |
| `CLAIM-20` | `Phát hiện khi test (BUG-361, bug, KHÔNG phải hành vi đúng) — tạo campaign / bulk create từ PB có video: video sang campaign mới mất URL và thumbnail (preview_url/thumbnail = null), storefront hiện slide trống; duplicate campaign không bị` | `portal (thumbnail vỡ trong picker) · storefront (slide trống) · api` | `KHÔNG CÓ NGUỒN` — chỉ quan sát kèm trong TC-TIB-6436/6439 (2026-10-22), không có case riêng; BUG-361 trạng thái không rõ | `product-base/product-base-campaign-link` | `ADD` |
| `CLAIM-21` | `TIB-5428 / C15 (một phần) — sửa URL video: id video không đổi, assignment giữ nguyên, storefront phát nội dung URL mới` | `portal · api (PUT /api/campaign-products/<id>/campaign-mockups/<id>/video) · storefront` | `KHÔNG CÓ NGUỒN` — TC-TIB-6440 đạt phần assignment 2026-10-22 nhưng cùng request có BUG-360 (giữ thumbnail cũ); chưa rõ BUG-360 fix/retest ngày nào | `campaign/create-campaign-by-product-base` | `ADD` |
| `CLAIM-22` | `Phát hiện khi test (BUG-360, bug, KHÔNG phải hành vi đúng) — sửa URL video: request PUT gửi lại thumbnail_url của video cũ nên thumbnail không đổi` | `portal · api` | `KHÔNG CÓ NGUỒN` — chỉ quan sát kèm trong TC-TIB-6440 (2026-10-22); BUG-360 trạng thái không rõ | `campaign/create-campaign-by-product-base` | `ADD` |
| `CLAIM-23` | `TIB-5428 / C15 (một phần) — xoá video hoặc xoá variant khỏi campaign: assignment tương ứng biến mất, assignment khác giữ nguyên; storefront không còn video đã xoá` | `portal · api (DELETE /api/campaign-products/<id>/campaign-mockups, GraphQL delete_campaign_variants) · storefront` | `test_case` — PASS TC-TIB-6441 2026-10-22 staging [AI]; PASS TC-TIB-6442 2026-10-22 staging [AI] — build: staging @ 2026-10-22 (sau lần giao QA cuối 2026-10-15) | `campaign/create-campaign-by-product-base` | `ADD` |
| `CLAIM-24` | `TIB-5428 / C11, C19 — Etsy: sync bỏ qua video và assignment video; picker campaign Etsy ẩn hẳn video; Q13 (campaign nhiều platform) treo` | `api (sync Etsy) · portal (picker campaign Etsy)` | `KHÔNG CÓ NGUỒN` — TC-TIB-6443, TC-TIB-6444 Blocked 2026-10-22 — org test không nối store Etsy; chỉ có đáp án Slack, người trả lời chưa rõ vai trò | `campaign (sync Etsy, picker); canon chưa có object/feature Etsy` | `ADD` |
| `CLAIM-25` | `TIB-5428 / C16, C22 — campaign/PB đã có video trước deploy được migrate sang format mapping mới, assignment để trống; Q12 (store đang bật setting mất video sau deploy?) treo` | `db (migration) · storefront` | `KHÔNG CÓ NGUỒN` — TC-TIB-6445, TC-TIB-6446 not-run (skipped) — chưa có campaign tạo trước deploy; Q12 Blocker chưa trả lời | `campaign; sdk/product-page-settings-config; sdk/storefront-buyer-facing` | `ADD` |

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
| `CLAIM-01` | `campaign` | `create-campaign-by-product-base` | `owner/staff (seller, portal)` | `portal` | `không có` |
| `CLAIM-02` | `campaign` | `create-campaign-by-shopify` | `owner/staff (seller, portal)` | `portal` | `không có (liên quan KB-021, không bị thay)` |
| `CLAIM-03` | `product-base` | `mockup-attachment` | `owner/staff (seller, portal)` | `portal` | `không có (liên quan KB-052, KB-085)` |
| `CLAIM-04` | `campaign` | `create-campaign-by-product-base` | `owner/staff (seller, portal)` | `portal, api` | `không có` |
| `CLAIM-05` | `campaign` | `create-campaign-by-product-base` | `owner/staff (seller, portal)` | `portal` | `không có` |
| `CLAIM-06` | `campaign` | `create-campaign-by-product-base` | `owner/staff (seller, portal)` | `portal` | `không có` |
| `CLAIM-07` | `sdk` | `product-page-settings-config` | `owner/staff (seller, portal)` | `portal` | `KB-025` |
| `CLAIM-08` | `sdk` | `storefront-buyer-facing` | `buyer (guest, storefront)` | `storefront` | `không có` |
| `CLAIM-09` | `sdk` | `storefront-buyer-facing` | `buyer (guest, storefront)` | `storefront` | `không có` |
| `CLAIM-10` | `sdk` | `storefront-buyer-facing` | `buyer (guest, storefront)` | `storefront` | `không có` |
| `CLAIM-11` | `sdk` | `storefront-buyer-facing` | `buyer (guest, storefront)` | `storefront` | `không có` |
| `CLAIM-12` | `sdk` | `storefront-buyer-facing` | `buyer (guest, storefront)` | `storefront` | `không có` |
| `CLAIM-13` | `sdk` | `storefront-buyer-facing` | `buyer (guest, storefront)` | `storefront` | `không có` |
| `CLAIM-14` | `sdk` | `storefront-buyer-facing` | `buyer (guest, storefront)` | `storefront` | `không có` |
| `CLAIM-15` | `campaign` | `MỚI: campaign-shopify-media-sync` | `owner/staff (seller) — hiệu ứng trên Shopify product` | `api, storefront` | `không có` |
| `CLAIM-16` | `campaign` | `MỚI: campaign-shopify-media-sync` | `owner/staff (seller) — hiệu ứng trên Shopify product` | `api, storefront` | `không có` |
| `CLAIM-17` | `campaign` | `MỚI: campaign-shopify-media-sync` | `owner/staff (seller) — hiệu ứng trên Shopify product` | `api, storefront` | `không có` |
| `CLAIM-18` | `campaign` | `create-campaign-by-product-base` | `owner/staff (seller, portal)` | `portal, api` | `không có (liên quan KB-086)` |
| `CLAIM-19` | `product-base` | `product-base-campaign-link` | `owner/staff (seller, portal)` | `portal, api` | `không có` |
| `CLAIM-20` | `product-base` | `product-base-campaign-link` | `owner/staff (seller, portal)` | `portal, storefront, api` | `không có` |
| `CLAIM-21` | `campaign` | `create-campaign-by-product-base` | `owner/staff (seller, portal)` | `portal, api` | `không có` |
| `CLAIM-22` | `campaign` | `create-campaign-by-product-base` | `owner/staff (seller, portal)` | `portal, api` | `không có` |
| `CLAIM-23` | `campaign` | `create-campaign-by-product-base` | `owner/staff (seller, portal)` | `portal, api` | `không có` |
| `CLAIM-24` | `campaign` | `MỚI: campaign-etsy-sync` | `owner/staff (seller, portal)` | `portal, api` | `không có` |
| `CLAIM-25` | `campaign` | `MỚI: video-variant-migration` | `owner/staff (seller) và buyer (storefront)` | `db, storefront` | `không có` |

- **`scope.role` ở đây KHÁC "Role liên quan" ở Phần 2.** Phần 2 là **dữ kiện** (quan sát bằng tài khoản gì / ticket nêu role nào). Cột này là **chỉ định**: KB item này áp dụng cho role nào. Hai thứ có thể khác nhau hoàn toàn — quan sát bằng tài khoản admin nhưng hành vi áp cho buyer.
- **`scope.environment` không hỏi người gửi** — xem phụ lục product.
- `feature_key` ghi `"MỚI: …"` chỉ là **đề xuất tên**; agent xử lý CCR quyết định cuối và có thể đổi slug.
- Cột "Quan hệ với canon" là `SUPERSEDES` thì **bắt buộc** có `kb_id` ở bảng này **và** có ngày nguồn ở Phần 5.1. Thiếu một trong hai → claim bị xử lý là `CONTRADICTS` (giữ cả hai phía, chờ người phân xử), **không** ghi đè.

---

# Phần 2 — Thấy nó ở đâu `[AGENT]`

- **URL / ID cụ thể đã biết:** `Jira https://ownego.atlassian.net/browse/TIB-5428 · instance 520 (Nprice1) https://staging-admin.teeinblue.com/admin/instances/520 · PB #3415 https://staging-portal.teeinblue.com/products/3415 · campaign #3122 https://staging-portal.teeinblue.com/campaigns/3122 (clone #3142, #3146; tạo từ PB #3143; bulk #3144, #3145) · platform product #589 · storefront https://nprice1.myshopify.com/products/cp-5428-video-assign-tib-221 · setting https://staging-portal.teeinblue.com/product-page-settings · endpoint POST /api/graphql AssignMockupVariantIds, POST /api/campaigns/<id>/sync, PUT /api/instances/520/config, GET /api/merchant/campaigns/<id>.json`
- **Trạng thái đối tượng lúc đó:** `Lúc chạy 2026-10-22: ticket QA Review (giao QA 2026-10-15), chưa release; nay Done 2026-10-27. Campaign #3122 publish lên Nprice1; setting lọc media theo variant bật/tắt theo từng case, cuối lượt OFF; #3122 còn giữ assignment của lượt chạy (V1 → Red, V2 → Blue + Green, M1/M2 → Red)`
- **Environment** (nơi quan sát / nơi ticket mô tả, **KHÔNG** nhất thiết là môi trường agent sẽ dùng để verify): `staging`
  > Kiểm chính sách môi trường ở phụ lục product trước khi coi trường này là blocking — nhiều dự án cố định môi trường verify (vd chỉ staging) độc lập với nơi bug gốc được quan sát. Ghi "không rõ" hay "production" **không** làm CCR bị chặn.
- **Role liên quan:** `ticket không nêu role; portal chạy bằng tài khoản staff staging (đăng nhập /login?staff=true), storefront xem như guest/buyer`
- **Surface:** `portal` · `storefront` · `api` · `db`

Không có URL của surface mà bạn không có quyền? **Bình thường.** Gửi thứ bạn có; agent tự map sang target của nó.

---

# Phần 3 — Để không sinh conflict giả `[AGENT]`

> Phần lớn "conflict" phát sinh không phải mâu thuẫn thật, mà do hai quan sát đều đúng nhưng không ai ghi rõ chúng chạy trên build nào.

Với MỖI ticket:

- **Build / version / ngày deploy:** `staging @ 2026-10-22 (giờ từng case: không rõ, trước 15:11 +07 lúc gắn CCR nháp) — sau lần TIB-5428 giao QA cuối (Code Review → QA Review 2026-10-15); QA Passed 2026-10-26; Done 2026-10-27; không có Fix Version; build hash: không rõ (QA không có quyền repo)`
- **Ngày resolve/update cuối:** `resolve 2026-10-26 (QA Passed); update cuối 2026-10-27 (Done)`
- **Đã ship chưa:** `Resolution: Done; 4 PR MERGED 2026-10-27; status Done 2026-10-27 — ngày deploy production: không rõ (không có Fix Version / release note)`

> "Không rõ build" **tự nó là thông tin quan trọng** — agent sẽ biết là không thể kết luận hành vi này "mới hơn" hay "cũ hơn" canon chỉ dựa vào đây.
>
> "Chưa ship" **không** làm CCR bị loại, nhưng nó đổi kết quả: claim về hành vi chưa ship sẽ vào KB dưới dạng đề xuất, không đụng canon hiện tại.

**Context hiện đang nói gì** `[AGENT]` — tra canon TRƯỚC khi gửi, chỉ cần chép lại

- Context version đang dùng: `qa-knowledge manifest.json (generated_at 2026-10-30, HEAD 7bed4ea): teeinblue campaign v3 · product-base v3 · sdk v5`
- Canon hiện nói: sdk/features/product-page-settings-config/kb.json KB-025: "Khi owner mở tab 'Elements & Behaviors' > mục 'Gallery & Mockup' trên cả store1 và store2, quan sát thấy CÙNG giá trị: 'Show Gallery & live preview' = checked; 'Load gallery immediately' = checked; 'Show only one Mockup image' = unchecked; 'Zoom gallery' = unchecked; 'Show navigation numbers on gallery' = unchecked; 'Show only the assigned images of the selected variant' = unchecked; radio 'Display of Gallery's Thumbnails' = 'Static (exclude real-time change)'." ▸ sdk/checklists/product-page-settings-config.json CHK-003 "Xem cau hinh 'Gallery & Mockup' (tab Elements & Behaviors) hien dung gia tri hien tai, giong nhau ca 2 store" (oracle KB-025, BASELINE) — kỳ vọng chuỗi label CŨ ▸ sdk KB-038 (INFERRED): instance.config có key show_assigned_variant_images_only ▸ product-base/features/mockup-attachment/kb.json KB-052: "Khi mở modal 'Assign mockups', quan sát thấy UI có 2 cột 'Select variants'/'Select mockups' kèm 'Select all' mỗi cột, nút Cancel/Save; lần khảo sát này chỉ mở rồi Cancel, chưa thực sự gán mockup cho variant nào." ▸ KB-085: "Khi bấm 'Select all' cho variant, chọn mockup rồi Save THẬT trong modal 'Assign mockups', quan sát thấy mutation GraphQL thật chạy: `update_mockups_many(updates:[{where:{id}, _set:{variant_ids:[...]}}])`, response affected_rows=1. Gán thành công CHO DÙ product KHÔNG bật toggle 'Custom variant's printarea' và mockup không có field printarea nào - xác nhận việc gán mockup cho variant hoàn toàn độc lập với Custom Printareas." (checklist CHK-06-009) ▸ KB-086 (trích): "Duplicate gọi mutation thành công, TẠO BẢN GHI MOCKUP MỚI THẬT (id mới), COPY nguyên variant_ids từ bản gốc." ▸ campaign/features/create-campaign-by-shopify/kb.json KB-021: "Modal 'Assign mockups' khi platform_mockups rỗng hiển thị text 'There is no mockup to assign yet.' cùng 'Select variants'/'Select mockups' — yêu cầu Upload mockup trước qua nút riêng 'Upload mockup'. Store demo product chỉ có 1 variant ('Default Title') tại thời điểm test — CHƯA verify hành vi per-variant với sản phẩm nhiều variant thật." ▸ canon qa-knowledge KHÔNG có dòng nào chứa "video", không có luật lọc gallery theo variant, không có luật Shopify variant image ▸ (context local, không phải canon qa-knowledge): teeinblue/TIB automation/context/mockup.md → Feature evolution timeline (TIB-4283): "When syncing to Shopify, the **first** assigned mockup becomes the variant's Shopify thumbnail." ▸ (context local): mockup.md → "Video in the media gallery — assigning a video to a variant (TIB-5428 / TIB-221, verified on staging 2026-10-22)" — đã ghi BUG-359..362 và lỗi Vimeo 76979871 ▸ (context local): store-setting.md → Product Page Settings: "**Variant-Specific Images** ("gallery displays only the mockup images linked to the selected variant" — this is the storefront-facing effect of the [mockup.md](./mockup.md) variant-assignment mechanics)" ▸ (context local): mockup.md → TIB-5237 nói duplicate campaign KHÔNG mang assignment mockup — ngược quan sát TC-TIB-6438 (CLAIM-18)
- Đã tra bằng từ khoá nào: `qa-knowledge/products/teeinblue: _registry.json (aliases "mockup", "variant", "product page settings", "storefront", "campaign"); grep -i "video", "assigned images", "variant-specific", "Assign mockups", "variant_ids", "gallery" trong */kb.json, */features/*/kb.json, */checklists/*.json, feature-summary.md, open-questions.md · context local teeinblue/TIB automation/context/*.md: "video", "assigned images", "Variant-Specific", "images and videos"`
- Không tra được canon (không có quyền truy cập knowledge base đích)? Ghi rõ "không tra được — cần agent tự tra lại", **đừng suy đoán** canon nói gì.

---

# Phần 4 — Hai câu chỉ con người trả lời được `[BẠN]`

## 4.1 Có ai xác nhận đây là hành vi ĐÚNG không?

Field này quyết định knowledge có **dùng làm expected result** được hay không.

- Ai xác nhận: `test case đã PASS (15 claim, [AI] 2026-10-22 staging) + mô tả ticket do huyenntk (assignee/dev) viết; đáp án Slack Q1–Q11 — ⏳ CHỜ BẠN: người trả lời trong thread #req-chienct là PO/business hay ai khác? Ngoài Jira/Slack (vd thread #tib-devs 2026-10-23) có PO/business xác nhận nào khác không?`
- Ở đâu, ngày nào: `Jira description (tạo 2026-09-11); Slack #req-chienct thread ts 1792567996.329239, 2026-10-21; test case TC-TIB-6413…6447 chạy 2026-10-22 trên staging (sau giao QA 2026-10-15); Jira QA Passed 2026-10-26 (chienct)`
- Họ xác nhận chính xác điều gì: Description: "When `Show only the assigned images and videos of the selected variant` is ON, filter the gallery to show: Videos assigned to the selected variant" ▸ "When a variant has assigned videos but no assigned mockups: Shopify variant image remains empty. SDK gallery displays the assigned videos for the selected variant." · Slack Q3 (vòng 4): "Đúng" · Q7: "Đúng" · Q8: "Có" · Q10: "Migration nhé" · Q11: "nếu video ko gán thì sẽ ko hiện, nãy trả lời sai, logic theo lần trả lời này" · test case: actualResult trích ở 5.1 từng claim

> Comment kỹ thuật dev tự viết trong ticket (kể cả "Ready to test", "Resolution: Done") **KHÔNG PHẢI** PO/business sign-off. Không ai xác nhận thật sự → knowledge vào context dưới dạng "đã quan sát thấy", **không** dùng làm expected result. Đây là cố ý, không phải hạn chế.
>
> **Nhưng tài liệu dev sinh từ source code thì CÓ tính** (`dev_doc`) — nó khác một comment tiện tay ở chỗ nó được generate có hệ thống từ code và được dev chủ động gửi như mô tả chính thức. Khi đó knowledge vào context dưới dạng **hành vi đúng** và **sẽ được dùng làm expected result cho test hằng ngày**. Đây là quyền lực thật — chỉ ghi khi bạn có tên tài liệu + version + ngày + trích dẫn thật.
>
> Mục này chính là nguồn cho cột "Nguồn & độ mạnh" ở Phần 1a — trả lời "PO/Dev"/"test case"/"dev doc" ở đây mà không kèm quote/link/id/ngày cụ thể thì cột đó vẫn phải ghi `KHÔNG CÓ NGUỒN`.

## 4.2 KHÔNG đề xuất điều gì?

**Bắt buộc.** Đây là cái chặn agent nhận CCR nâng quan sát/mô tả ticket lên thành "hành vi đúng" quá tay.

```
Hành vi của BUG-359, BUG-360, BUG-361, BUG-362 (và BUG-376 chưa rõ nội dung) KHÔNG phải hành vi đúng — CLAIM-20 và CLAIM-22 chỉ ghi lại bug đã thấy
▸ Trạng thái "passed" trên Testlane của TC-6432/6433/6443/6444 KHÔNG phải bằng chứng PASS (actualResult ghi Fail/Blocked/chỉ có ảnh)
▸ Q12 (store đang bật setting mất video sau migration), Q13 (campaign nhiều platform), Q14 (Always load first không gán variant đang chọn), Q15 (form / order design của variant chỉ-video) chưa có đáp án, không suy ra luật
▸ lỗi "Can not upload images to shopify" với Vimeo 76979871 chưa rõ lỗi của ticket hay lỗi cũ
▸ đáp án Slack chưa phải PO/business sign-off cho tới khi xác định người trả lời (4.1)
▸ id fixture (PB #3415, campaign #3122…, variant 93496/93498/93502) và tên "M1/V1" chỉ là data test, không phải tên object
▸ quy ước Ski Wax = Red/Blue/Green chỉ dùng cho fixture
▸ feature_key "MỚI: campaign-shopify-media-sync / campaign-etsy-sync / video-variant-migration" chỉ là đề xuất tên; ranh giới video thuộc feature có sẵn hay tách feature riêng (vd một feature "media ↔ variant assignment" chung cho product-base + campaign + sdk) chỉ là Ý TƯỞNG, chưa quyết
▸ quan sát TC-6438 "clone giữ cả assignment mockup ảnh" ngược context local mockup.md (TIB-5237) — chưa xác nhận bên nào đúng
```

## 4.3 Đề xuất context nên nói gì `[AGENT soạn, BẠN duyệt]`

```
Từ TIB-5428 (Done 2026-10-27; quan sát trên staging 2026-10-22): video (URL Youtube/Vimeo) trong list media gán được cho variant qua cùng modal "Assign mockups", nhiều-nhiều, ở Product Base editor và Campaign editor (by Product Base, by Shopify products); picker hiện video bằng thumbnail của video, Save được khi chỉ chọn video (không chọn gì thì Save disabled), view "Mockup assignments" hiện video thành dòng riêng. Setting Product Page đổi label thành "Show only the assigned images and videos of the selected variant" (config key show_assigned_variant_images_only không đổi): khi ON, gallery SDK chỉ hiện mockup + video đã gán cho variant đang chọn (media không gán bị ẩn), variant chỉ gán video thì gallery chỉ có các video đó và không có ảnh preview cá nhân hoá, variant không gán gì thì hiện toàn bộ media; khi OFF hiện toàn bộ; thứ tự theo list media của campaign; storefront chỉ đổi sau Update/Sync campaign. Shopify variant image = mockup gán đầu tiên, video không bao giờ là variant image. Duplicate video/mockup và Duplicate campaign giữ assignment; xoá video/variant thì assignment tương ứng mất. Chưa đủ nguồn (quan sát, không dùng làm expected): Always load first (BUG-359), variant chỉ-video vẫn nhận variant image (BUG-362), sync video vào product media, kế thừa assignment khi tạo/bulk create từ PB (BUG-361), sửa URL video (BUG-360), picker PB editor (BUG-376), Etsy, migration campaign cũ.
```

## 4.4 Mức độ gấp `[BẠN]`

`HIGH` (đang chặn test P0/P1) · `MEDIUM` (ảnh hưởng coverage) · `LOW` (cải thiện dần)

---

# Phần 5 — Evidence `[AGENT]`

## 5.1 Nguồn & evidence theo từng claim — một block cho MỖI Claim ID ở Phần 1a

### CLAIM-01

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** `TC-TIB-6414`
- **Link:** `không có — Testlane task TIB-221 (QA hub, project TIB), case không có URL công khai`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-22`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `test-executor [AI] (agent chạy thay QA chienct, Testlane task TIB-221)`
- **Trích nguyên văn:**
  ```
  Modal "Assign mockups" của campaign #3122 hiển thị 5 item (M1/M2/M3 + 2 video V1, V2 cùng grid, theo thứ tự list media); click V1 thì ô được tick (checked=[F,F,F,T,F]), không lỗi. API: case chỉ đọc, chưa Save.
  ```
- **File đính kèm cho claim này:** `không có`

### CLAIM-02

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** `TC-TIB-6415`
- **Link:** `không có — Testlane task TIB-221 (QA hub, project TIB), case không có URL công khai`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-22`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `test-executor [AI] (agent chạy thay QA chienct, Testlane task TIB-221)`
- **Trích nguyên văn:**
  ```
  Quy ước fixture: Nprice1 không có product Shopify nào có variant Red/Blue/Green nên dùng product "Selling Plans Ski Wax" với 3 variant theo thứ tự "Selling Plans Ski Wax" / "Special Selling Plans Ski Wax" / "Sample Selling Plans Ski Wax" = Red / Blue / Green (dropdown variant liệt kê: Sample Selling Plans Ski Wax - 9.95$, Selling Plans Ski Wax - 24.95$, Special Selling Plans Ski Wax - 49.95$). Platform product #589 (campaign by Shopify products), modal "Assign mockups": grid có 3 item — 2 mockup (M4, M5) + video V3 (thumbnail YouTube i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg, 480px); click V3 thì được tick (checked=[F,F,T]), không báo lỗi. API: case chỉ đọc, chưa Save.
  ```
- **File đính kèm cho claim này:** `không có`

### CLAIM-03

- **Loại nguồn** (đúng 1): `KHÔNG CÓ NGUỒN`
- **Locator:** `TC-TIB-6413 + BUG-376`
- **Link:** `không có — Testlane task TIB-221 (QA hub, project TIB), case không có URL công khai`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-22`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `test-executor [AI] (agent chạy thay QA chienct, Testlane task TIB-221); BUG-376: không rõ`
- **Trích nguyên văn:**
  ```
  Modal "Assign mockups" của PB #3415 hiển thị đủ 5 item (3 mockup "Front (1400x1400)" + 2 video có thumbnail/icon play); click video V1 (YouTube) thì ô được tick và highlight, không báo lỗi. API: case chỉ đọc, chưa bấm Save.
  [bugId trên Testlane: BUG-376 — nội dung không đọc được]
  ```
- **File đính kèm cho claim này:** `không có`

### CLAIM-04

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** `TC-TIB-6416, TC-TIB-6417, TC-TIB-6418`
- **Link:** `không có — Testlane task TIB-221 (QA hub, project TIB), case không có URL công khai`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-22`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `test-executor [AI] (agent chạy thay QA chienct, Testlane task TIB-221)`
- **Trích nguyên văn:**
  ```
  [TC-TIB-6416]
  Bulk assign: chọn 3 variant Red/Blue/Green + V1, Save thành công. Sau khi reload trang, Mockup assignments: Group by Variant — Red, Blue, Green mỗi variant có "1 mockup" (V1); Group by Mockup — dòng V1 liệt kê Blue, Green, Red "3 variants". API: POST /api/graphql AssignMockupVariantIds => 200, update_campaign_mockups_many where id=12502 (V1) _set variant_ids=[93496,93498,93502] (Red, Blue, Green) — khớp đủ 3 variant, không rơi variant nào.
  [TC-TIB-6417]
  Lưu ý precondition: campaign lúc chạy đã có V1 → Red (từ case trước) nên chạy bằng Edit trên dòng variant Red (modal "Assign mockups to a variant", tick sẵn V1) rồi tick thêm V2 và Save. Kết quả: Group by Variant — Red - S "2 mockups" (V1 + V2). API: POST /api/graphql AssignMockupVariantIds => 200, where id=12503 (V2) _set variant_ids=[93496] (Red); V1 (id 12502) giữ nguyên Red, không bị xoá. Reload kiểm lại ở case sau vẫn giữ.
  [TC-TIB-6418]
  Bulk assign lần 1: Red+Blue + V1; lần 2: Blue+Green + V2. Group by Variant: Red 1 mockup, Blue 2 mockups (V1+V2), Green 1 mockup. Group by Mockup: dòng V1 → Blue, Red (2 variants); dòng V2 → Blue, Green (2 variants). API: lần 1 POST /api/graphql => 200, id 12502 (V1) variant_ids=[93496,93498]; lần 2 => 200, chỉ id 12503 (V2) variant_ids=[93498,93502], không có lệnh nào đụng V1 / không xoá mapping V1.
  ```
- **File đính kèm cho claim này:** `không có`

### CLAIM-05

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** `TC-TIB-6419, TC-TIB-6420, TC-TIB-6421`
- **Link:** `không có — Testlane task TIB-221 (QA hub, project TIB), case không có URL công khai`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-22`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `test-executor [AI] (agent chạy thay QA chienct, Testlane task TIB-221)`
- **Trích nguyên văn:**
  ```
  [TC-TIB-6419]
  Chọn variant Red + chỉ video V1 (0 mockup): nút Save enable, lưu thành công và modal chuyển sang "Mockup assignments"; Group by Variant: Red - S "1 mockup" (V1), Blue/Green "Not assigned yet". API: POST /api/graphql AssignMockupVariantIds, status 200, payload update_campaign_mockups_many where id=12502 (V1) _set variant_ids=[93496] (Red) — khớp, không có mockup id nào; response affected_rows=1.
  [TC-TIB-6420]
  Chọn variant Red, không chọn media nào (checked=[F,F,F,F,F]): nút Save ở trạng thái disabled. Network: không có request lưu assignment (chỉ có các GET campaign/clipart-categories lúc load trang). Red chưa có dòng media nào.
  [TC-TIB-6421]
  V1 hiển thị thumbnail YouTube của chính video (i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg, 480px) và V2 thumbnail Vimeo (i.vimeocdn.com/video/452001751…, 640px); cả hai naturalWidth > 0, không vỡ ảnh, không dùng placeholder mockup. Network: GET ytimg => 200, GET vimeocdn => 200.
  ```
- **File đính kèm cho claim này:** `không có`

### CLAIM-06

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** `TC-TIB-6422`
- **Link:** `không có — Testlane task TIB-221 (QA hub, project TIB), case không có URL công khai`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-22`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `test-executor [AI] (agent chạy thay QA chienct, Testlane task TIB-221)`
- **Trích nguyên văn:**
  ```
  Với M1 → Red và V1 → Red: Group by Mockup có dòng riêng cho M1 ("Red - S", 1 variant) và dòng riêng cho V1 (thumbnail hqdefault.jpg, "Red - S", 1 variant), không gộp. Group by Variant: Red - S "2 mockups" liệt kê 2 thumbnail riêng — M1 và V1. API: case chỉ đọc (dữ liệu assignment được set bằng mutation AssignMockupVariantIds => 200).
  ```
- **File đính kèm cho claim này:** `không có`

### CLAIM-07

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** `TC-TIB-6423`
- **Link:** `không có — Testlane task TIB-221 (QA hub, project TIB), case không có URL công khai`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-22`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `test-executor [AI] (agent chạy thay QA chienct, Testlane task TIB-221)`
- **Trích nguyên văn:**
  ```
  Store settings → Product Page hiển thị đúng label "Show only the assigned images and videos of the selected variant"; trang không còn chuỗi cũ "assigned images of the selected". API: case chỉ đọc, không có thao tác lưu.
  [Jira TIB-5428 description, mục Product Page settings] Rename `Show only the assigned images of the selected variant` to `Show only the assigned images and videos of the selected variant`.
  ```
- **File đính kèm cho claim này:** `không có`

### CLAIM-08

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** `TC-TIB-6424, TC-TIB-6425, TC-TIB-6426, TC-TIB-6447`
- **Link:** `không có — Testlane task TIB-221 (QA hub, project TIB), case không có URL công khai`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-22`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `test-executor [AI] (agent chạy thay QA chienct, Testlane task TIB-221)`
- **Trích nguyên văn:**
  ```
  [TC-TIB-6424]
  Setting ON (đã Save, request /api/instances/520/config có show_assigned_variant_images_only=true), assignment M1 → Red, V1 → Red, sync campaign (POST /api/campaigns/3122/sync => 200). Storefront chọn Red: gallery có đúng 2 slide — mockup M1 (qa-mockup_MK-5469-2) và video V1 (YouTube dQw4w9WgXcQ); bấm play thì iframe youtube.com/embed/dQw4w9WgXcQ?autoplay=1 được nạp và phát. API: GET /api/merchant/campaigns/15252195639537.json => 200, campaign_mockups[0] id 12499 variant_ids=[93496], [3] id 12502 type=video variant_ids=[93496] — khớp assignment.
  [TC-TIB-6425]
  Setting ON; assignment M1→Red, M2→Blue, M3 không gán, V1→Red, V2 không gán; đã sync (POST /api/campaigns/3122/sync => 200). Chọn Red: gallery đúng 2 slide = M1 (MK-5469-2) + V1 (YouTube); không có M2, M3, V2 (track chỉ chứa 2 slide, đã duyệt hết bằng nút next). API: GET /api/merchant/campaigns/15252195639537.json => 200, variant_ids: M1 [93496], M2 [93498], M3 [], V1 [93496], V2 [] — khớp.
  [TC-TIB-6426]
  Cùng assignment/sync như case chọn Red, setting ON. Chọn Blue: gallery đúng 1 slide = M2 (MK-5469-1, tee đen), không có nút prev/next, không có M1, V1, M3, V2. API: GET /api/merchant/campaigns/15252195639537.json => 200, M2 (id 12500) variant_ids=[93498]; M3/V2 variant_ids=[] — khớp.
  [TC-TIB-6447]
  Setting ON; assignment M1→Red, M2→Blue, M3 không gán, V1→Red, V2→Green; đã sync (POST /api/campaigns/3122/sync => 200; lưu ý storefront JSON chỉ cập nhật sau sync). Chọn Red → 2 slide {M1, V1}; Blue → 1 slide {M2}; Green → 1 slide {V2 Vimeo 76979871}; chọn lại Red → {M1, V1} giống lần đầu. M3 không xuất hiện lần nào, không sót item của variant trước. API: GET /api/merchant/campaigns/15252195639537.json => 200, variant_ids: 12499 [93496], 12500 [93498], 12501 [], 12502 [93496], 12503 [93502] — khớp.
  ```
- **File đính kèm cho claim này:** `không có`

### CLAIM-09

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** `TC-TIB-6427`
- **Link:** `không có — Testlane task TIB-221 (QA hub, project TIB), case không có URL công khai`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-22`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `test-executor [AI] (agent chạy thay QA chienct, Testlane task TIB-221)`
- **Trích nguyên văn:**
  ```
  Setting ON; Green → V1 + V2 (0 mockup), M1→Red, M2→Blue, M3 không gán; đã sync (POST /api/campaigns/3122/sync => 200). Chọn Green: gallery đúng 2 slide = V1 (YouTube dQw4w9WgXcQ) + V2 (Vimeo 76979871), không có M1/M2/M3, không áp fallback "hiện tất cả mockup". API: GET /api/merchant/campaigns/15252195639537.json => 200, variant_ids: 12502 (V1) [93496,93502], 12503 (V2) [93502], 3 mockup không chứa 93502 — khớp.
  ```
- **File đính kèm cho claim này:** `không có`

### CLAIM-10

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** `TC-TIB-6428`
- **Link:** `không có — Testlane task TIB-221 (QA hub, project TIB), case không có URL công khai`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-22`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `test-executor [AI] (agent chạy thay QA chienct, Testlane task TIB-221)`
- **Trích nguyên văn:**
  ```
  Setting ON; Green → chỉ V1 (0 mockup), M1 (có printarea) → Blue, M2 → Blue; đã sync (POST /api/campaigns/3122/sync => 200). Chọn Green, nhập "HELLO" vào ô "Your name": gallery đúng 1 slide = V1 (YouTube), không có mockup nào của campaign. Bấm Preview: popup chỉ hiện video V1, không có ảnh preview cá nhân hoá (không có tee-printarea--image nào được render, không lấy M1/M2/M3 làm nguồn preview). API: GET /api/merchant/campaigns/15252195639537.json => 200, 12502 (V1) variant_ids=[93502], M1/M2 [93498], M3/V2 [] — khớp.
  ```
- **File đính kèm cho claim này:** `không có`

### CLAIM-11

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** `TC-TIB-6429`
- **Link:** `không có — Testlane task TIB-221 (QA hub, project TIB), case không có URL công khai`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-22`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `test-executor [AI] (agent chạy thay QA chienct, Testlane task TIB-221)`
- **Trích nguyên văn:**
  ```
  Setting ON; Green 0 assignment (M1→Red, M2→Blue, V1→Red; M3, V2 không gán), đã sync. Chọn Green: gallery có đúng 5 slide: M1 (MK-5469-2), M2 (MK-5469-1), M3, V1 (YouTube), V2 (Vimeo 76979871) — fallback hiển thị toàn bộ media. API: GET /api/merchant/campaigns/15252195639537.json => 200, không có mockup nào có 93502 trong variant_ids — khớp.
  ```
- **File đính kèm cho claim này:** `không có`

### CLAIM-12

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** `TC-TIB-6430`
- **Link:** `không có — Testlane task TIB-221 (QA hub, project TIB), case không có URL công khai`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-22`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `test-executor [AI] (agent chạy thay QA chienct, Testlane task TIB-221)`
- **Trích nguyên văn:**
  ```
  Setting TẮT (PUT /api/instances/520/config với show_assigned_variant_images_only=false), assignment giữ M1→Red, M2→Blue, V1→Red. Storefront chọn lần lượt Red, Blue, Green: cả 3 lần gallery đều có 5 slide (M1, M2, M3, V1 YouTube dQw4w9WgXcQ, V2 Vimeo 76979871), giống hệt nhau. API: GET /api/merchant/campaigns/15252195639537.json => 200, config.show_assigned_variant_images_only=false; assignment variant_ids vẫn còn nhưng không có tác dụng lọc.
  ```
- **File đính kèm cho claim này:** `không có`

### CLAIM-13

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** `TC-TIB-6431`
- **Link:** `không có — Testlane task TIB-221 (QA hub, project TIB), case không có URL công khai`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-22`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `test-executor [AI] (agent chạy thay QA chienct, Testlane task TIB-221)`
- **Trích nguyên văn:**
  ```
  Setting ON; kéo V1 lên giữa list media (thứ tự campaign M1 → V1 → M2 → M3 → V2), Red → M1 + V1 + M2, V1 "Always load first" = OFF; sync (POST /api/campaigns/3122/sync => 200). Storefront chọn Red: gallery 3 slide theo đúng thứ tự M1 (active) → V1 (YouTube) → M2, video không bị đẩy xuống cuối hay lên đầu. Portal list media cũng là M1, V1, M2, M3, V2. API: GET /api/merchant/campaigns/15252195639537.json => 200, campaign_mockups theo position: 12499 p0 [93496], 12502 (video) p1 [93496], 12500 p2 [93496], 12501 p3 [], 12503 p4 [] — khớp thứ tự.
  ```
- **File đính kèm cho claim này:** `không có`

### CLAIM-14

- **Loại nguồn** (đúng 1): `KHÔNG CÓ NGUỒN`
- **Locator:** `TC-TIB-6432 + BUG-359`
- **Link:** `không có — Testlane task TIB-221 (QA hub, project TIB), case không có URL công khai`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-22`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `test-executor [AI] (agent chạy thay QA chienct, Testlane task TIB-221)`
- **Trích nguyên văn:**
  ```
  [actualResult hiện tại trên Testlane] (chỉ có 1 ảnh, không có chữ)
  [Kết quả lượt 2026-10-22, CCR đã submit CBS-009] TC-TIB-6432 FAIL — BUG-359: video bật Always load first là item focus nhưng vẫn ở vị trí thứ 2 (M1 → V1 → M2)
  [Slack #req-chienct 2026-10-21, đáp án Q2 theo RA] Thứ tự theo list campaign; video `Always load first` đứng đầu + là item focus
  ```
- **File đính kèm cho claim này:** `không có`

### CLAIM-15

- **Loại nguồn** (đúng 1): `KHÔNG CÓ NGUỒN`
- **Locator:** `TC-TIB-6433 + BUG-362`
- **Link:** `không có — Testlane task TIB-221 (QA hub, project TIB), case không có URL công khai`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-22`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `test-executor [AI] (agent chạy thay QA chienct, Testlane task TIB-221)`
- **Trích nguyên văn:**
  ```
  Fail — variant chỉ gán video (0 mockup) vẫn có Shopify variant image là mockup đầu tiên, không để trống.
  Actual: campaign clone #3146 publish mới lên Nprice1 (POST /api/campaigns/3146/publish => 200): Green → chỉ video (Group by Variant: Green "1 mockup"), Red → M1 + M2. Shopify (đọc qua /products/cp-5428-video-assign-tib-221-copy-copy.json): variant Green / S image_id = 96721 = ảnh đầu tiên của product (M1), giống Red. Tái hiện thêm trên #3142 (sync lại sau khi đổi Green sang chỉ-video): Green vẫn image_id = ảnh M1.
  Expected: Shopify variant image của Green để trống (không có ảnh, không phải video).
  Đúng: ảnh variant không phải video; media product có external video (VID 22439234) và gallery SDK chọn Green hiện đúng 1 slide video.
  [Jira TIB-5428 description, mục SDK] When a variant has assigned videos but no assigned mockups: Shopify variant image remains empty. SDK gallery displays the assigned videos for the selected variant.
  ```
- **File đính kèm cho claim này:** `không có`

### CLAIM-16

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** `TC-TIB-6434`
- **Link:** `không có — Testlane task TIB-221 (QA hub, project TIB), case không có URL công khai`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-22`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `test-executor [AI] (agent chạy thay QA chienct, Testlane task TIB-221)`
- **Trích nguyên văn:**
  ```
  Làm trên clone #3142 vì campaign gốc #3122 publish lỗi (xem ghi chú). List media: video đứng đầu rồi M1, M2; Red → video + M1 + M2 (Group by Variant: Red "3 mockups", thứ tự video → M1 → M2, không bị hệ thống tự sắp lại). Update (POST /api/campaigns/3142/sync => 200). Shopify (/products/cp-5428-video-assign-tib-221-copy.json): variant Red / S image_id = 95889 = ảnh đầu tiên của product = M1 (6ad9a4d9…); video nằm trong product media (ExternalVideo Vimeo 22439234), không phải variant image. Variant image = mockup gán đầu tiên, video bị bỏ qua dù đứng trước M1.
  Ghi chú: trên #3122, fixture V2 (https://vimeo.com/76979871) làm mỗi lần sync kết thúc với "Error when publishing … Can not upload images to shopify" và không có variant image nào được gán; khi dùng URL Vimeo khác (22439234) trên clone thì publish thành công. Nghi URL Vimeo fixture bị Shopify từ chối, không phải lỗi của tính năng. Shopify admin không dùng được (không đi OAuth) nên đọc qua storefront .json.
  ```
- **File đính kèm cho claim này:** `không có`

### CLAIM-17

- **Loại nguồn** (đúng 1): `KHÔNG CÓ NGUỒN`
- **Locator:** `TC-TIB-6435`
- **Link:** `không có — Testlane task TIB-221 (QA hub, project TIB), case không có URL công khai`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-22`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `test-executor [AI] (agent chạy thay QA chienct, Testlane task TIB-221)`
- **Trích nguyên văn:**
  ```
  Sync campaign lên Nprice1 (POST /api/campaigns/3122/sync => 200, /3142/sync => 200). Storefront API (Shopify product media): #3122 có ExternalVideo YOUTUBE dQw4w9WgXcQ (V1) + 3 ảnh; clone #3142 có ExternalVideo VIMEO 22439234 + 3 ảnh — video từ URL vẫn vào product media như flow hiện tại. Variant Shopify chỉ có image_id (ảnh), không variant nào gán video (video không bao giờ là variant image). Mapping variant↔video vẫn còn đủ ở Mockup assignments sau sync và merchant JSON (campaign_mockups.variant_ids, vd video 12502 variant_ids=[93496]), request sync chỉ gửi config (instance_id + các cờ description/images/variants…), không mang mapping.
  Ghi chú: V2 fixture (https://vimeo.com/76979871) không vào được Shopify media và làm publish #3122 kết thúc với "Can not upload images to shopify" (URL khác https://vimeo.com/22439234 sync bình thường) — nghi URL fixture bị Shopify từ chối, ngoài phạm vi feature; app báo lỗi chung chung, không nêu rõ video nào hỏng.
  ```
- **File đính kèm cho claim này:** `không có`

### CLAIM-18

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** `TC-TIB-6437, TC-TIB-6438`
- **Link:** `không có — Testlane task TIB-221 (QA hub, project TIB), case không có URL công khai`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-22`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `test-executor [AI] (agent chạy thay QA chienct, Testlane task TIB-221)`
- **Trích nguyên văn:**
  ```
  [TC-TIB-6437]
  Làm trên campaign clone #3142 (không đụng #3122). Gán V1 → Red + Blue, M1 → Red; duplicate V1 (POST /api/campaign-mockups/12549/clone => 201) và duplicate M1 (POST /api/campaign-mockups/12547/clone => 201, response variant_ids=[93496] = Red). Mockup assignments sau duplicate: Group by Mockup — V1 (Blue, Red) giữ nguyên, V1-copy (Blue, Red), M1-copy (Red); Group by Variant — Red "5 mockups" (V1, V1-copy, M1, M1-copy, M2), Blue "3 mockups" (V1, V1-copy, V2), Green "1 mockup" (V2). Bản copy giữ assignment giống bản gốc, assignment gốc không bị mất.
  [TC-TIB-6438]
  Campaign gốc #3122 gán V1 → Red, V2 → Blue + Green (kèm M1, M2 → Red). Dùng "Duplicate campaign" (POST /api/campaigns/3122/clone => 200) tạo clone #3142 "CP-5428 Video assign (TIB-221) copy". Mockup assignments của clone, Group by Variant: Red "3 mockups" (V1 + M1 + M2), Blue "1 mockup" (V2), Green "1 mockup" (V2); Group by Mockup: dòng V1 → Red, dòng V2 → Blue, Green — giống hệt campaign gốc. (Lưu ý: clone cũng giữ luôn assignment mockup ảnh, khác ghi chú trong mockup.md rằng duplicate campaign để mockup unassigned — chỉ ghi nhận, không ảnh hưởng kết quả case.) Campaign gốc không đổi.
  ```
- **File đính kèm cho claim này:** `không có`

### CLAIM-19

- **Loại nguồn** (đúng 1): `KHÔNG CÓ NGUỒN`
- **Locator:** `TC-TIB-6436, TC-TIB-6439 + BUG-361`
- **Link:** `không có — Testlane task TIB-221 (QA hub, project TIB), case không có URL công khai`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-22`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `test-executor [AI] (agent chạy thay QA chienct, Testlane task TIB-221)`
- **Trích nguyên văn:**
  ```
  [TC-TIB-6436]
  PB #3415: gán V1 → Red, V2 → Blue, Save (POST /api/graphql AssignMockupVariantIds => 200: mockup 8169 variant_ids=[93496] Red; mockup 8170 variant_ids=[93498] Blue). Tạo campaign mới #3143 by Product Base và thêm PB #3415 (POST /api/campaign-mockups/generate => 204, /campaign-products/4675/campaign-mockups/sync => 204). Mockup assignments của #3143: Group by Variant — Red "1 mockup", Blue "1 mockup", Green "Not assigned yet"; Group by Mockup — dòng video thứ 4 → Red - S, dòng video thứ 5 → Blue - S; GraphQL AssignMockupsModal trả variant_ids [93496] và [93498] cho 2 video. Reload vẫn còn. Assignment được kế thừa đúng, không phải gán lại.
  Lưu ý: 2 video trong campaign mới mất URL/thumbnail (preview_url, thumbnail = null, thumbnail vỡ) — đã tạo BUG-361 (High) theo task TIB-221.
  [TC-TIB-6439]
  PB #3415 đã gán V1 → Red, V2 → Blue (xem TC-6436). Bulk creator (nprice1, artwork #5257, PB #3415): tạo 2 campaign "CP-5428 BULK-A (TIB-221)" #3144 và "CP-5428 BULK-B (TIB-221)" #3145. API: POST /api/artworks/5257/campaigns => 201 và POST /api/campaigns/3144/publish => 200; POST /api/artworks/5257/campaigns => 201 và POST /api/campaigns/3145/publish => 200. Mockup assignments của cả 2 campaign, Group by Variant: Red "1 mockup" (video), Blue "1 mockup" (video), Green "Not assigned yet" — cả hai kế thừa Red → V1, Blue → V2.
  Lưu ý: video trong campaign bulk create mất URL/thumbnail (merchant JSON của #3145: mockup 12566/12567 type "image", url/preview_url/thumbnail null; storefront chỉ hiện slide trống) — thuộc BUG-361 (High).
  ```
- **File đính kèm cho claim này:** `không có`

### CLAIM-20

- **Loại nguồn** (đúng 1): `KHÔNG CÓ NGUỒN`
- **Locator:** `BUG-361 (ghi trong TC-TIB-6436, TC-TIB-6439)`
- **Link:** `không có — Testlane task TIB-221 (QA hub, project TIB), case không có URL công khai`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-22`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `test-executor [AI] (agent chạy thay QA chienct, Testlane task TIB-221)`
- **Trích nguyên văn:**
  ```
  [TC-TIB-6436] Lưu ý: 2 video trong campaign mới mất URL/thumbnail (preview_url, thumbnail = null, thumbnail vỡ) — đã tạo BUG-361 (High) theo task TIB-221.
  [TC-TIB-6439] Lưu ý: video trong campaign bulk create mất URL/thumbnail (merchant JSON của #3145: mockup 12566/12567 type "image", url/preview_url/thumbnail null; storefront chỉ hiện slide trống) — thuộc BUG-361 (High).
  ```
- **File đính kèm cho claim này:** `không có`

### CLAIM-21

- **Loại nguồn** (đúng 1): `KHÔNG CÓ NGUỒN`
- **Locator:** `TC-TIB-6440 + BUG-360`
- **Link:** `không có — Testlane task TIB-221 (QA hub, project TIB), case không có URL công khai`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-22`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `test-executor [AI] (agent chạy thay QA chienct, Testlane task TIB-221)`
- **Trích nguyên văn:**
  ```
  Làm trên campaign clone #3142 (đã publish lên Nprice1, setting ON). V1 → Red + Blue; sửa URL V1 sang https://www.youtube.com/watch?v=jNQXAC9IVRw. API: PUT /api/campaign-products/4674/campaign-mockups/12549/video => 204, id video 12549 không đổi, không có lệnh xoá mapping. Mockup assignments sau reload: Red "3 mockups" (V1, M1, M2), Blue "2 mockups" (V1, V2) — V1 vẫn Red + Blue. Sau Update (POST /api/campaigns/3142/sync => 200), storefront chọn Red: slide video alt "YouTube Video - jNQXAC9IVRw", bấm play nạp iframe youtube.com/embed/jNQXAC9IVRw?autoplay=1 — phát đúng nội dung URL mới. Phát hiện kèm (không ảnh hưởng kết luận case): request PUT gửi thumbnail_url của video cũ nên thumbnail vẫn là ảnh video cũ — đã tạo bug Low, xem BUG trong task (report_bug theo task TIB-221).
  ```
- **File đính kèm cho claim này:** `không có`

### CLAIM-22

- **Loại nguồn** (đúng 1): `KHÔNG CÓ NGUỒN`
- **Locator:** `BUG-360 (ghi trong TC-TIB-6440)`
- **Link:** `không có — Testlane task TIB-221 (QA hub, project TIB), case không có URL công khai`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-22`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `test-executor [AI] (agent chạy thay QA chienct, Testlane task TIB-221)`
- **Trích nguyên văn:**
  ```
  [TC-TIB-6440] Phát hiện kèm (không ảnh hưởng kết luận case): request PUT gửi thumbnail_url của video cũ nên thumbnail vẫn là ảnh video cũ — đã tạo bug Low, xem BUG trong task (report_bug theo task TIB-221).
  ```
- **File đính kèm cho claim này:** `không có`

### CLAIM-23

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** `TC-TIB-6441, TC-TIB-6442`
- **Link:** `không có — Testlane task TIB-221 (QA hub, project TIB), case không có URL công khai`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-22`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `test-executor [AI] (agent chạy thay QA chienct, Testlane task TIB-221)`
- **Trích nguyên văn:**
  ```
  [TC-TIB-6441]
  Làm trên campaign clone #3142 (publish lên Nprice1, setting ON). Gán V1 → Red + Blue, V2 → Green, xoá V1. API: DELETE /api/campaign-products/4674/campaign-mockups body {"ids":[12549]} => 204. Mockup assignments: Group by Variant — Red "2 mockups" (M1, M2, không còn V1), Blue "Not assigned yet", Green "1 mockup" (V2 giữ nguyên); Group by Mockup — không còn dòng V1. Sau Update (POST /api/campaigns/3142/sync => 200), storefront Red: gallery chỉ 2 slide mockup, không còn video V1; Green vẫn hiện V2 (Vimeo 76979871).
  [TC-TIB-6442]
  Làm trên campaign clone #3142, không đụng PB #3415. Precondition lệch nhẹ: V1 của clone đã bị xoá ở case trước nên dùng V2 → Red + Blue (M1, M2 → Red). Xoá Blue khỏi campaign bằng sửa product → đặt Blue / S = Unavailable → Save: POST /api/graphql delete_campaign_variants {campaign_product_id: 4674, variant_ids: [93498]} => 200 (+ staff-activity-logs/campaign-variant => 204). Sau reload, Mockup assignments: Group by Variant — không còn nhóm Blue, Green "Not assigned yet", Red "3 mockups" (M1, M2, V2); Group by Mockup — dòng V2 chỉ còn liệt kê Red - S. Assignment V2-Red giữ nguyên.
  ```
- **File đính kèm cho claim này:** `không có`

### CLAIM-24

- **Loại nguồn** (đúng 1): `KHÔNG CÓ NGUỒN`
- **Locator:** `TC-TIB-6443, TC-TIB-6444; Slack #req-chienct Q5`
- **Link:** `không có — Testlane task TIB-221 (QA hub, project TIB), case không có URL công khai`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-22`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `test-executor [AI] (agent chạy thay QA chienct, Testlane task TIB-221)`
- **Trích nguyên văn:**
  ```
  [TC-TIB-6443]
  Blocked — môi trường không có store Etsy.
  Org "Test new pricing 4" chỉ nối 6 store Shopify (nprice1–nprice6); dialog Multi-store launch không có store Etsy nào.
  Không có CP-5428-ETSY để sync.
  Không tự dựng/tìm store Etsy khác, đánh dấu blocked theo run-rules.md mục 2. Cần user nối store Etsy staging mới chạy được.
  [TC-TIB-6444]
  Blocked — môi trường không có store Etsy.
  Org "Test new pricing 4" chỉ nối 6 store Shopify; không có campaign publish lên Etsy để kiểm picker ẩn video.
  Ghi chú: modal "Update Video" của campaign editor có dòng "Note: Cannot sync videos to Etsy listing." (quan sát ở case khác, chưa đủ để kết luận picker Etsy).
  Không tự dựng/tìm store Etsy khác, đánh dấu blocked theo run-rules.md mục 2. Cần user nối store Etsy staging mới chạy được.
  ```
- **File đính kèm cho claim này:** `không có`

### CLAIM-25

- **Loại nguồn** (đúng 1): `KHÔNG CÓ NGUỒN`
- **Locator:** `TC-TIB-6445, TC-TIB-6446; Slack #req-chienct Q10, Q12`
- **Link:** `không có — Testlane task TIB-221 (QA hub, project TIB), case không có URL công khai`
- **Ngày của nguồn (YYYY-MM-DD):** `không rõ`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `test-executor [AI] (agent chạy thay QA chienct, Testlane task TIB-221)`
- **Trích nguyên văn:**
  ```
  [TC-TIB-6445]
  Chưa chạy: chưa có campaign tạo trước deploy TIB-5428 dùng được làm CP-OLD-5428 (ứng viên chỉ đọc: platform product #512 trên Nprice2 đang kẹt màn upgrade, PB #2799) — đang chờ user quyết.
  [TC-TIB-6446]
  Chưa chạy: chưa có campaign tạo trước deploy TIB-5428 dùng được làm CP-OLD-5428 (ứng viên chỉ đọc: platform product #512 trên Nprice2 đang kẹt màn upgrade, PB #2799) — đang chờ user quyết.
  [Slack #req-chienct 2026-10-21, theo RA] Q10: "Migration nhé" · Q12 (một phần): "(b) chỉ chuyển format mapping và để trống assignment"
  ```
- **File đính kèm cho claim này:** `không có`

*(lặp lại block trên cho CLAIM-02, CLAIM-03…)*

## 5.2 Evidence chung, không thuộc claim nào `[AGENT]`

`https://ownego.atlassian.net/browse/TIB-5428 · Testlane task TIB-221 (35 case; bug BUG-359/360/361/362, BUG-376) · Proposal đã submit CBS-009 (2026-10-27, khuôn cũ) · báo cáo run https://claude.ai/artifact/LwBnHtu2HufD6hnBXbzq4S (private) · traffic API teeinblue/TIB automation/qa-output/api-observations_TIB-221.json · file RA teeinblue/TIB automation/qa-output/analysis_TIB-5428.md`

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
- [x] Không còn placeholder dạng ba dấu nhỏ hơn … ba dấu lớn hơn nào sót lại trong file

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
