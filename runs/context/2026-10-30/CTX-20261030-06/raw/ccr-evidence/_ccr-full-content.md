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
- Object: `sdk` · Feature: `storefront-buyer-facing` (claim phụ chạm `sdk/product-page-settings-config`, `order/place-personalized-order-storefront`, `global-option/artwork-personalization-global-option-link`, `campaign` — xem Phần 1b)
- Không khớp object nào trong registry, hoặc không tra được registry? Mô tả bằng lời. **Đừng bịa một `object_key` không có thật.**

**Quan sát được** `[AGENT]` — tổng hợp từ (các) ticket, KHÔNG phải suy đoán

```
TIB-5203 — "Production cache Redis running out of memory" (Bug, High). Jira: QA Review 2026-10-27 14:09
(+07, lần giao QA cuối) → Passed + resolution Done 2026-10-28 18:05 (+07) → Done 2026-10-29 11:41 (+07).
2 PR merged (cập nhật cuối 2026-10-29 11:19 +07), trong đó PR api #4063. Không có Fix Version. Liên quan
TIB-5624 ("Remove pre-v2 campaign cache key cleanup after TIB-5203 is fully deployed", To Do).

Description: gốc rễ là sorted set tag:{tag}:entries của Cache::tags() không có TTL; fix chính đề xuất =
Schedule::command('cache:prune-stale-tags')->hourly(); kèm 7 phát hiện phụ. Phát hiện #3:
PublicCampaignService.php:39 cache cả CampaignResource + Instance, hàng trăm KB tới vài MB mỗi key.

Comment dev 55763 (tinhpt, tạo 2026-10-27, sửa 2026-10-28 22:21 +07) — "QA plan (staging)", PR #4063
xử lý phát hiện #3; không nhắc fix chính / phát hiện còn lại:
- Rule: personalization storefront như cũ, mỗi entry cache campaign/platform product nhỏ ~8.5 lần;
  setting merchant đổi là thấy ngay, sửa campaign vẫn xoá cache, metafield Shopify không còn merchant setting.
- Bước 4: response /api/merchant/campaigns/<id>.json?shop=... hoặc /api/merchant/platform-products/<uuid>.json
  có thêm resource_type (campaign / platform_product), vẫn có config, has_subscription, is_development,
  is_plus, sku_enabled, shop_name; artworks[] chỉ còn global_option_ids, global option đầy đủ nằm 1 lần ở
  top-level global_options.
- Cập nhật 2026-10-28 (commit 8731f3a): bỏ artworks[].description / is_locked / status;
  campaign_products[].created_at / updated_at; product internal_tags / status (product description vẫn còn);
  variant created_at / updated_at / deleted_at. Yêu cầu redeploy + recheck bước 1–4, 5 và 12.
- Bước 5–7: sửa campaign / platform product / setting toàn store → reload storefront thấy ngay.
- Bước 8–10: ATC + checkout có GO (campaign, platform product); customization link submit được.
- Bước 11: publish / re-publish OK. Bước 12 (mới): sửa setting campaign product trong campaign editor,
  save → reload vẫn đủ product, variant, setting.
- Không cho QA (unit test): entry cache khớp response; key cũ không được đọc; mỗi artwork chỉ resolve GO
  trong global_option_ids của nó; metafield không có merchant setting; cache:memory-report.
- Cho dev lúc deploy production: chạy cache:memory-report trước/sau; sau >1 giờ làm TIB-5624.
Comment 55906 (trangdh, 2026-10-28): link thread Slack #tib-devs về TIB-5203 (nội dung chưa đọc được).

Lượt chạy [AI] 2026-10-28 ~05:58–06:30 UTC trên staging (Testlane TIB-257, 20 case): 13 PASS · 4 FAIL ·
3 Blocked. Retest [AI] 2026-10-28 ~09:24–09:33 UTC sau khi dev báo đã sửa: TC-TIB-7396 (BUG-437),
TC-TIB-7402 (BUG-446), TC-TIB-7403 (BUG-439), TC-TIB-7404 (BUG-440) vẫn FAIL:
- SDK luôn gọi …/campaigns/<id>.json?shop=…&v=1; trang có link preload v=<metafield version mới> trả đúng.
- URL v=1 không được làm mới sau save artwork + sync campaign, publish platform product, PUT
  /api/instances/520/config: last-modified 05:29:56 GMT (campaign) / 04:59:40 GMT (PP), cache-control
  private, max-age=14400; v mới (chưa gọi) trả dữ liệu mới và artworks[] chỉ có global_option_ids.
- Curl thẳng staging-api ~09:37–10:30 UTC: bản cũ do Cloudflare trả (CF-Cache-Status: HIT, Age 13131);
  tái hiện trên nprice2 (instance 521) sau save + sync.
TC-TIB-7507 [AI] 2026-10-28 ~10:30 UTC (curl, v mới, CF MISS): các field 8731f3a đã bỏ; resource_type,
config, has_subscription, is_development, is_plus, sku_enabled, shop_name, global_options top-level,
artworks[].global_option_ids vẫn đủ (#3279 nprice1/nprice2, #3270, PP #602) — PASS.
Khác: SDK lấy platform product qua /api/merchant/campaigns/<shopify product id>.json (không phải
platform-products/<uuid>.json); storefront PP không render form vì BUG-310 có sẵn (category
"<script>alert('xss')" in không escape) — PASS 7391/7393 là trên HTML đã chặn route.
Testlane: cả 21 case hiện status "passed" nhưng actualResult của 7396/7402/7403/7404 ghi Fail,
7397/7406/7407 ghi Blocked — CCR này chấm theo actualResult. Chưa có lượt chạy nào sau 2026-10-28.
```

- Nguồn: `1 ticket Jira TIB-5203 (description, changelog, 2 comment) + Testlane TIB-257 (21 case, actualResult) + file RA analysis_TIB-5203.md (Nhật ký chốt trống) — KHÔNG PHẢI quan sát trực tiếp mới của agent; dữ liệu test là của lượt [AI] 2026-10-28`
- Thấy mấy lần / xác nhận trực tiếp mấy lần: `2 lượt chạy [AI] trên staging cùng ngày 2026-10-28 (lượt đầu 13 PASS / 4 FAIL / 3 Blocked; retest 4 case FAIL vẫn FAIL) + 1 case mới TC-TIB-7507 PASS; 0 lần trên production; 0 lần sau khi PR merge 2026-10-29`

**Thử gì mà KHÔNG tái hiện / chưa thử gì** `[AGENT + BẠN]`

```
[AGENT] Chưa thử / chưa verify:
- Không có lượt chạy nào sau khi PR merge + Jira Done (2026-10-29), chưa kiểm production.
- Bước 1–3, 5 sau redeploy 8731f3a (dev yêu cầu recheck): chưa chạy lại; chỉ có PASS lượt đầu ~06:00 UTC.
- Bước 12 (campaign editor: sửa setting campaign product + save): chưa có test case, chưa thử.
- Mục tiêu chính (Redis hết OOM, entry nhỏ ~8.5 lần), key {domain}_campaign_v2_{id}, TTL, lệnh
  cache:memory-report: QA không xem được Redis / không chạy lệnh trên staging.
- Fix chính cache:prune-stale-tags và phát hiện phụ #1, #2, #4–#7: không thấy trong QA plan, chưa test.
- Metafield Shopify không còn merchant setting: chưa đọc metafield, chỉ biết publish OK.
- TC-TIB-7397 (đổi design trong 1 campaign) Blocked — CP-CACHE #3270 không bật artwork navigation.
- TC-TIB-7406 (order platform product) Blocked — order Bogus #T5VV43D5E không về portal sau 9+ phút.
- TC-TIB-7407 (customization link) Blocked — không tìm được điểm vào link cho buyer.
- Storefront platform product không patch HTML: form không render (BUG-310 có sẵn).
- Consumer khác đọc artworks[].global_options (SDK cũ, theme custom, MCP/public API): chưa thử.
- Setting lưu qua GraphQL update_instances: chưa thử (chỉ thử PUT /api/instances/{id}/config).
[BẠN] ⏳ CHỜ BẠN: bạn đã tự thử gì mà kết quả test không ghi (vd retest sau khi PR merge 2026-10-29, đọc
metafield, xem Redis, test order PP ở chỗ khác)?
[BẠN] ⏳ CHỜ BẠN: Jira được chuyển Passed 2026-10-28 18:05 (+07) trong khi TC-TIB-7396/7402/7403/7404 còn FAIL —
4 bug BUG-437/446/439/440 được dev/PO chấp nhận, hoãn hay đã sửa (thread Slack #tib-devs)? Có quote + link không?
[BẠN] ⏳ CHỜ BẠN: dev có đẩy commit nào sau 2026-10-28 10:30 UTC trước khi merge 2026-10-29 không? Nếu có,
CLAIM-01/02 (TC-TIB-7507) phải hạ xuống KHÔNG CÓ NGUỒN cho tới khi chạy lại.
```

## Phần 1a — Phạm vi thay đổi & ảnh hưởng ước tính `[AGENT]` — BẮT BUỘC

> Mục này khác "Quan sát được" ở trên: nó không mô tả CÁI GÌ đã xảy ra, mà là **CẦN LÀM GÌ TIẾP**. Agent nhận CCR đọc xong phải biết ngay việc cần làm và phạm vi ảnh hưởng dây chuyền — không phải tự dò lại từ ticket gốc.

Một dòng cho MỖI claim/ticket riêng biệt trong "Quan sát được":

| Claim ID | Thay đổi / claim | Surface liên quan | Nguồn & độ mạnh | Object/feature/checklist bị ảnh hưởng | Quan hệ với canon |
|---|---|---|---|---|---|
| `CLAIM-01` | TIB-5203 — response GET /api/merchant/campaigns/{id}.json?shop=… của campaign và platform product có thêm resource_type ("campaign" / "platform_product"), vẫn giữ config, has_subscription, is_development, is_plus, sku_enabled, shop_name | api | `test_case` — PASS TC-TIB-7507 2026-10-28 staging [AI] — build: staging @ 2026-10-28 10:30 UTC — sau lần TIB-5203 giao QA cuối (2026-10-27) và sau commit 8731f3a; Jira Done 2026-10-29, 2 PR merged 2026-10-29 (sau ngày chạy); không có Fix Version; build hash: không rõ (QA không có quyền repo) | sdk/storefront-buyer-facing (endpoint bootstrap, KB-013); checklist sdk/checklists/storefront-buyer-facing.json | ADD |
| `CLAIM-02` | TIB-5203 commit 8731f3a — payload bỏ artworks[].description / is_locked / status; campaign_products[].created_at / updated_at; product internal_tags / status; variants created_at / updated_at / deleted_at | api | `test_case` — PASS TC-TIB-7507 2026-10-28 staging [AI] — build: staging @ 2026-10-28 10:30 UTC — sau lần TIB-5203 giao QA cuối (2026-10-27) và sau commit 8731f3a; Jira Done 2026-10-29, 2 PR merged 2026-10-29 (sau ngày chạy); không có Fix Version; build hash: không rõ (QA không có quyền repo) | sdk/storefront-buyer-facing; consumer nào còn đọc các field đã bỏ (chưa rõ, cần agent tự đánh giá) | ADD |
| `CLAIM-03` | TIB-5203 — artworks[] chỉ còn global_option_ids; global option đầy đủ nằm 1 lần ở top-level global_options | api | `KHÔNG CÓ NGUỒN` — TC-TIB-7396 Fail retest 2026-10-28 (BUG-437): URL SDK v=1 vẫn có artworks[].global_options; chỉ URL v mới đúng shape (TC-TIB-7507) | sdk/storefront-buyer-facing; global-option/artwork-personalization-global-option-link; mọi consumer đọc artworks[].global_options | ADD |
| `CLAIM-04` | SDK lấy platform product qua GET /api/merchant/campaigns/{shopify product id}.json?shop=…, không phải /api/merchant/platform-products/{uuid}.json như QA plan dev ghi | api · storefront | `KHÔNG CÓ NGUỒN` — chỉ là network capture của agent (TC-TIB-7391, TC-TIB-7395, 2026-10-28), lệch với comment dev 55763, chưa ai xác nhận | sdk/storefront-buyer-facing (KB-013 nói endpoint campaigns/{platformProductId}.json cho campaign) | ADD |
| `CLAIM-05` | Sửa artwork + sync campaign → theo QA plan dev reload storefront thấy bản mới trong vài giây; quan sát: URL SDK …/campaigns/{id}.json?shop=…&v=1 vẫn trả bản cũ (Cloudflare HIT, max-age=14400), link preload v=<version mới> và v mới trả đúng | storefront · api | `KHÔNG CÓ NGUỒN` — TC-TIB-7402 Fail retest 2026-10-28, BUG-446 | sdk/storefront-buyer-facing; campaign; context local storefront-sdk.md → "CDN cache on campaign / platform-product JSON" | ADD |
| `CLAIM-06` | Sửa + publish platform product → theo QA plan dev storefront thấy bản mới; quan sát: URL SDK v=1 vẫn bản cũ (last-modified 04:59:40 GMT) | storefront · api | `KHÔNG CÓ NGUỒN` — TC-TIB-7403 Fail retest 2026-10-28, BUG-439 | sdk/storefront-buyer-facing | ADD |
| `CLAIM-07` | Đổi setting toàn store (PUT /api/instances/{id}/config) → theo QA plan dev áp dụng ngay; quan sát: config trong URL SDK v=1 và cả link preload vẫn giá trị cũ, chỉ v mới đúng | portal · storefront · api | `KHÔNG CÓ NGUỒN` — TC-TIB-7404 Fail retest 2026-10-28, BUG-440 | sdk/product-page-settings-config (KB-038); có thể làm SAI context local store-setting.md → "Instance config cache" (ghi PUT config xoá cache) | ADD |
| `CLAIM-08` | Storefront campaign (có / không GO): form như cũ, reload từ cache không khác, preview cập nhật, 2 layer dùng chung GO, lựa chọn GO nhớ qua campaign khác | storefront | `KHÔNG CÓ NGUỒN` — PASS TC-TIB-7390/7392/7393/7398/7399/7400 2026-10-28 ~06:00 UTC [AI] nhưng chạy trước redeploy (fix bug trước retest + commit 8731f3a, dev yêu cầu recheck bước 1–3), chưa chạy lại | sdk/storefront-buyer-facing; checklist sdk/checklists/storefront-buyer-facing.json | ADD |
| `CLAIM-09` | Storefront platform product: form personalization như cũ | storefront | `KHÔNG CÓ NGUỒN` — TC-TIB-7391/7393 PASS 2026-10-28 chỉ trên HTML đã chặn route để né BUG-310; trang thật không render form | sdk/storefront-buyer-facing | ADD |
| `CLAIM-10` | Campaign: ATC + checkout có giá trị GO → cart, order, design đúng | storefront · portal | `KHÔNG CÓ NGUỒN` — PASS TC-TIB-7405 2026-10-28 ~06:00 UTC [AI] trước redeploy (payload đổi sau đó), chưa chạy lại | order/place-personalized-order-storefront | ADD |
| `CLAIM-11` | Platform product: ATC + checkout có giá trị GO → order gắn đúng platform product | storefront · portal | `KHÔNG CÓ NGUỒN` — TC-TIB-7406 Blocked 2026-10-28: order không về portal | order/place-personalized-order-storefront | ADD |
| `CLAIM-12` | Customization link của order item có GO: form tải được, submit được | storefront · api | `KHÔNG CÓ NGUỒN` — TC-TIB-7407 Blocked 2026-10-28: không tìm được điểm vào link | order (chưa rõ feature, cần agent tự đánh giá) | UNKNOWN |
| `CLAIM-13` | Publish / re-publish campaign thành công, storefront vẫn chạy | portal · storefront | `KHÔNG CÓ NGUỒN` — PASS TC-TIB-7408 2026-10-28 ~06:00 UTC [AI] trước redeploy, chưa chạy lại | campaign (multi-store launch) | ADD |
| `CLAIM-14` | Campaign editor portal vẫn hiện layer GO kèm lựa chọn | portal | `KHÔNG CÓ NGUỒN` — PASS TC-TIB-7401 2026-10-28 ~06:00 UTC [AI] trước redeploy (dev yêu cầu recheck bước 5), chưa chạy lại | campaign; global-option/artwork-personalization-global-option-link | ADD |
| `CLAIM-15` | Đổi design trong 1 campaign: mỗi artwork chỉ hiện / resolve GO của chính nó | storefront | `KHÔNG CÓ NGUỒN` — TC-TIB-7397 Blocked 2026-10-28 (không có design switcher) | global-option/artwork-personalization-global-option-link | ADD |
| `CLAIM-16` | Response campaign / platform product không lộ token/secret của instance; có config.maps_api_key (Mapbox public token "pk.") | api | `KHÔNG CÓ NGUỒN` — PASS TC-TIB-7409 2026-10-28 ~06:00 UTC [AI] trước redeploy; maps_api_key chưa ai xác nhận được phép public | sdk/storefront-buyer-facing (KB-013: endpoint public) | ADD |
| `CLAIM-17` | Metafield campaign data trên Shopify không còn merchant setting (config, has_subscription, shop_name…) | api (metafield Shopify) | `KHÔNG CÓ NGUỒN` — chỉ có mô tả dev (comment 55763), QA chưa đọc metafield | campaign (publish); sdk/storefront-buyer-facing | ADD |
| `CLAIM-18` | Entry cache campaign / platform product nhỏ hơn ~8.5 lần; key mới {domain}_campaign_v2_{id}, key cũ bị bỏ qua, không cần flush; lệnh php artisan cache:memory-report (--domain) | db (Redis) · server CLI | `KHÔNG CÓ NGUỒN` — chỉ có mô tả dev (comment 55763), QA không xem được Redis / chạy lệnh | không khớp object nào trong registry (cache server-side), chưa rõ, cần agent tự đánh giá | UNKNOWN |
| `CLAIM-19` | Fix chính Schedule cache:prune-stale-tags hằng giờ + phát hiện phụ #1, #2, #4–#7 của description — không rõ đã ship trong ticket này hay tách | chưa rõ, cần agent tự đánh giá | `KHÔNG CÓ NGUỒN` — description đề xuất, comment dev không nhắc, Q1 trong RA chưa có đáp án | không khớp object nào trong registry, chưa rõ, cần agent tự đánh giá | UNKNOWN |
| `CLAIM-20` | Campaign editor portal (bước 12 mới): sửa setting campaign product (giá, title trên store), save → reload vẫn đủ product, variant, setting | portal | `KHÔNG CÓ NGUỒN` — chỉ có comment dev 55763 (cập nhật 2026-10-28), chưa có test case | campaign | ADD |

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
| `CLAIM-01` | `sdk` | `storefront-buyer-facing` | guest buyer (storefront SDK đọc) | api | KB-013 (liên quan, không thay thế) |
| `CLAIM-02` | `sdk` | `storefront-buyer-facing` | guest buyer (storefront SDK đọc) | api | không có |
| `CLAIM-03` | `sdk` | `storefront-buyer-facing` | guest buyer (storefront SDK đọc) | api | không có |
| `CLAIM-04` | `sdk` | `storefront-buyer-facing` | guest buyer | api | KB-013 (liên quan, không thay thế) |
| `CLAIM-05` | `sdk` | `storefront-buyer-facing` | guest buyer (thay đổi do owner/staff làm trên portal) | storefront | không có |
| `CLAIM-06` | `sdk` | `storefront-buyer-facing` | guest buyer (thay đổi do owner/staff làm trên portal) | storefront | không có |
| `CLAIM-07` | `sdk` | `product-page-settings-config` | guest buyer (setting do owner đổi) | storefront | KB-038 (liên quan, không thay thế) |
| `CLAIM-08` | `sdk` | `storefront-buyer-facing` | guest buyer | storefront | không có |
| `CLAIM-09` | `sdk` | `storefront-buyer-facing` | guest buyer | storefront | không có |
| `CLAIM-10` | `order` | `place-personalized-order-storefront` | guest buyer | storefront | không có |
| `CLAIM-11` | `order` | `place-personalized-order-storefront` | guest buyer | storefront | không có |
| `CLAIM-12` | `order` | MỚI: order-item-customization-link | guest buyer | storefront | không có |
| `CLAIM-13` | `campaign` | MỚI: campaign-publish-multi-store | owner / staff | portal | không có |
| `CLAIM-14` | `campaign` | MỚI: campaign-editor-personalization-preview | owner / staff | portal | không có |
| `CLAIM-15` | `global-option` | `artwork-personalization-global-option-link` | guest buyer | storefront | không có |
| `CLAIM-16` | `sdk` | `storefront-buyer-facing` | guest (unauthenticated) | api | KB-013 (liên quan, không thay thế) |
| `CLAIM-17` | `campaign` | MỚI: shopify-campaign-metafield | owner / staff (publish) | api | không có |
| `CLAIM-18` | không khớp registry — cache Redis phía server (mô tả bằng lời) | MỚI: campaign-payload-cache | không áp role (hạ tầng) | db | không có |
| `CLAIM-19` | không khớp registry — cache Redis phía server (mô tả bằng lời) | chưa rõ | không áp role (hạ tầng) | db | không có |
| `CLAIM-20` | `campaign` | MỚI: campaign-product-settings-save | owner / staff | portal | không có |

- **`scope.role` ở đây KHÁC "Role liên quan" ở Phần 2.** Phần 2 là **dữ kiện** (quan sát bằng tài khoản gì / ticket nêu role nào). Cột này là **chỉ định**: KB item này áp dụng cho role nào. Hai thứ có thể khác nhau hoàn toàn — quan sát bằng tài khoản admin nhưng hành vi áp cho buyer.
- **`scope.environment` không hỏi người gửi** — xem phụ lục product.
- `feature_key` ghi `"MỚI: …"` chỉ là **đề xuất tên**; agent xử lý CCR quyết định cuối và có thể đổi slug.
- Cột "Quan hệ với canon" là `SUPERSEDES` thì **bắt buộc** có `kb_id` ở bảng này **và** có ngày nguồn ở Phần 5.1. Thiếu một trong hai → claim bị xử lý là `CONTRADICTS` (giữ cả hai phía, chờ người phân xử), **không** ghi đè.

---

# Phần 2 — Thấy nó ở đâu `[AGENT]`

- **URL / ID cụ thể đã biết:** `Jira https://ownego.atlassian.net/browse/TIB-5203 (liên quan TIB-5624); PR https://github.com/qikify/teeinblue-api/pull/4063, commit 8731f3a; instance 520 (nprice1.myshopify.com) https://staging-admin.teeinblue.com/admin/instances/520; instance 521 (nprice2.myshopify.com) https://staging-admin.teeinblue.com/admin/instances/521; campaign #3270 CP-CACHE (storefront /products/tib5203-cp-cache), #3271 CP-CACHE2, #3272 CP-NOGO, #3279 CP-CACHE-R2 (nprice1 + nprice2); platform product #602 PP-CACHE (Shopify product 9452881084657, storefront /products/the-complete-snowboard); artwork #5952, #5953, #5954; global option #1125, #1126; order #1121 (portal orders/4812); endpoint GET /api/merchant/campaigns/{id}.json?shop=…&v=1, PUT /api/instances/{id}/config, POST /api/campaigns/{id}/sync, POST /api/platform-products/{id}/publish; Testlane task TIB-257 (TC-TIB-7390..7409, TC-TIB-7507); bug BUG-437, BUG-446, BUG-439, BUG-440, BUG-438 (thay bằng BUG-446 ở TC-TIB-7402), BUG-310 (có sẵn)`
- **Trạng thái đối tượng lúc đó:** `Lúc chạy (2026-10-28): ticket QA Review, PR #4063 chưa merge nhưng đã deploy staging (có resource_type); fixture campaign / platform product đã publish trên nprice1 (và #3279 trên nprice2). Hiện tại (2026-10-30): Jira Done 2026-10-29, PR merged 2026-10-29; chưa chạy lại sau merge; AW-GO #5952 default text đã bị sửa nhiều lần khi test ("FIX5203B", "NP2FIX")`
- **Environment** (nơi quan sát / nơi ticket mô tả, **KHÔNG** nhất thiết là môi trường agent sẽ dùng để verify): `staging (QA chạy); production là nơi ticket mô tả lỗi Redis`
  > Kiểm chính sách môi trường ở phụ lục product trước khi coi trường này là blocking — nhiều dự án cố định môi trường verify (vd chỉ staging) độc lập với nơi bug gốc được quan sát. Ghi "không rõ" hay "production" **không** làm CCR bị chặn.
- **Role liên quan:** `guest buyer (storefront) · owner / staff (portal)`
- **Surface:** `portal` · `storefront` · `api` · `db`

Không có URL của surface mà bạn không có quyền? **Bình thường.** Gửi thứ bạn có; agent tự map sang target của nó.

---

# Phần 3 — Để không sinh conflict giả `[AGENT]`

> Phần lớn "conflict" phát sinh không phải mâu thuẫn thật, mà do hai quan sát đều đúng nhưng không ai ghi rõ chúng chạy trên build nào.

Với MỖI ticket:

- **Build / version / ngày deploy:** `TIB-5203: staging @ 2026-10-28 05:58–10:30 UTC — sau lần TIB-5203 giao QA cuối (2026-10-27 14:09 +07); staging redeploy giữa lượt đầu và retest (fix bug + commit 8731f3a); 2 PR merged 2026-10-29 11:19 +07 (sau mọi lượt chạy); không có Fix Version; ngày deploy production: không rõ; build hash: không rõ (QA không có quyền repo)`
- **Ngày resolve/update cuối:** `2026-10-28 (resolution Done, chuyển Passed 18:05 +07); 2026-10-29 (chuyển Done 11:41 +07, Jira updated cuối)`
- **Đã ship chưa:** `Jira Done + PR merged 2026-10-29; đã lên production chưa: không rõ (TIB-5624 dọn key cũ sau deploy production vẫn To Do)`

> "Không rõ build" **tự nó là thông tin quan trọng** — agent sẽ biết là không thể kết luận hành vi này "mới hơn" hay "cũ hơn" canon chỉ dựa vào đây.
>
> "Chưa ship" **không** làm CCR bị loại, nhưng nó đổi kết quả: claim về hành vi chưa ship sẽ vào KB dưới dạng đề xuất, không đụng canon hiện tại.

**Context hiện đang nói gì** `[AGENT]` — tra canon TRƯỚC khi gửi, chỉ cần chép lại

- Context version đang dùng: `qa-knowledge manifest.json (generated_at 2026-10-30): sdk v5, campaign v3, order v1, global-option v1`
- Canon hiện nói: `sdk/features/storefront-buyer-facing/kb.json KB-013: "GET https://staging-api.teeinblue.com/api/merchant/campaigns/{platformProductId}.json (dùng để bootstrap widget cá nhân hoá trên storefront) trả 200 KHÔNG kèm authorization header nào ở cả 2 sample (store1 product 8138398629987, store2 product 15280333291824) — public, chỉ cần biết platform_product_id + tham số shop. Bất kỳ ai biết platform_product_id có thể đọc được toàn bộ config cá nhân hoá (template/field/artwork) của campaign đó. Không khẳng định đây là defect (có thể là thiết kế cố ý cho 1 public storefront-config endpoint)." ▸ sdk/features/product-page-settings-config/kb.json KB-038: "instance.config (từ GET /api/instances?trashed) chứa ~27 key (style_variants, preview_content, add_design_links, atc_border_radius, atc_button_layout, position_of_price, addon_price_enable, alignment_variants, border_radius_variants, sync_between_templates, show_navigation_numbers, support_public_property, load_gallery_immediately, personalization_alignment, personalization_font_size, auto_select_first_template, collapse_description_block, personalization_item_per_row, personalization_toggle_style, show_custom_info_below_price, action_button_in_zoom_gallery, personalization_border_radius, show_galley_thumbnails_mobile, personalization_choose_a_theme, action_button_in_show_save_badge, show_personalization_form_header, show_assigned_variant_images_only) mà tên/giá trị TƯƠNG QUAN hợp lý với các control quan sát trên UI (vd load_gallery_immediately:true <-> checkbox 'Load gallery immediately' checked, KB-025). Đây CHỈ LÀ correlation theo tên, KHÔNG xác nhận qua code reference hay contract field-by-field tường minh -- giữ nguyên INFERRED, KHÔNG nâng thành CONFIRMED_EXPECTED." ▸ Canon qa-knowledge KHÔNG có gì về resource_type, global_option_ids trong payload storefront, cache campaign / Cloudflare v=1, metafield merchant setting, Redis. ▸ (context local, không phải canon qa-knowledge): store-setting.md → Instance config cache — why a saved setting can have no effect (TIB-5493): "Writes through **PUT /api/instances/{id}/config** (Eloquent) do clear it." — ngược với quan sát CLAIM-07 (BUG-440). ▸ (context local, không phải canon qa-knowledge): storefront-sdk.md → CDN cache on campaign / platform-product JSON (TIB-5203, confirmed 2026-10-28): "Cache này **không bị xoá** khi Save artwork + Sync campaign, khi Publish platform product, hay khi đổi Store setting — gọi lại đúng URL `v=1` ngay sau các hành động đó vẫn ra response cũ"`
- Đã tra bằng từ khoá nào: `qa-knowledge/products/teeinblue (_registry.json, */kb.json, */features/*, */checklists/*.json, */feature-summary.md, */open-questions.md): "merchant/campaigns", "resource_type", "global_option_ids", "global_options", "cache", "metafield", "redis", "platform-products", "instances/", "show_navigation", "maps_api_key", "customization link"; context local teeinblue/TIB automation/context/*.md: "TIB-5203", "resource_type", "global_option_ids", "campaign_v2", "v=1", "CF-Cache", "Cloudflare", "maps_api_key", "Instance config cache"`
- Không tra được canon (không có quyền truy cập knowledge base đích)? Ghi rõ "không tra được — cần agent tự tra lại", **đừng suy đoán** canon nói gì.

---

# Phần 4 — Hai câu chỉ con người trả lời được `[BẠN]`

## 4.1 Có ai xác nhận đây là hành vi ĐÚNG không?

Field này quyết định knowledge có **dùng làm expected result** được hay không.

- Ai xác nhận: `⏳ CHỜ BẠN: có PO/business xác nhận nào ngoài Jira/Slack không (kể cả trong thread Slack #tib-devs ở comment 55906)? Hiện tại: KHÔNG AI là PO/business — chỉ có QA plan do dev viết (comment 55763) + test case [AI] PASS (TC-TIB-7507 cho CLAIM-01, CLAIM-02)`
- Ở đâu, ngày nào: `TC-TIB-7507 PASS 2026-10-28 ~10:30 UTC trên staging [AI]; QA plan dev comment 55763 tạo 2026-10-27, sửa 2026-10-28; không có PO sign-off`
- Họ xác nhận chính xác điều gì: `TC-TIB-7507: "Field SDK cần vẫn đủ ở cả 4: resource_type, config, has_subscription, is_development, is_plus, sku_enabled, shop_name, global_options (top-level)." — các claim còn lại chỉ là mô tả của dev hoặc quan sát chưa đủ điều kiện`

> Comment kỹ thuật dev tự viết trong ticket (kể cả "Ready to test", "Resolution: Done") **KHÔNG PHẢI** PO/business sign-off. Không ai xác nhận thật sự → knowledge vào context dưới dạng "đã quan sát thấy", **không** dùng làm expected result. Đây là cố ý, không phải hạn chế.
>
> **Nhưng tài liệu dev sinh từ source code thì CÓ tính** (`dev_doc`) — nó khác một comment tiện tay ở chỗ nó được generate có hệ thống từ code và được dev chủ động gửi như mô tả chính thức. Khi đó knowledge vào context dưới dạng **hành vi đúng** và **sẽ được dùng làm expected result cho test hằng ngày**. Đây là quyền lực thật — chỉ ghi khi bạn có tên tài liệu + version + ngày + trích dẫn thật.
>
> Mục này chính là nguồn cho cột "Nguồn & độ mạnh" ở Phần 1a — trả lời "PO/Dev"/"test case"/"dev doc" ở đây mà không kèm quote/link/id/ngày cụ thể thì cột đó vẫn phải ghi `KHÔNG CÓ NGUỒN`.

## 4.2 KHÔNG đề xuất điều gì?

**Bắt buộc.** Đây là cái chặn agent nhận CCR nâng quan sát/mô tả ticket lên thành "hành vi đúng" quá tay.

```
- Con số "nhỏ hơn ~8.5 lần", tên key {domain}_campaign_v2_{id}, "không cần flush khi deploy", TTL cache:
  số liệu dev ghi, QA chưa đo.
- Shape "artworks[] chỉ còn global_option_ids" trên URL SDK thật: đang FAIL (BUG-437) ở lượt cuối 2026-10-28;
  chưa phải hành vi đã kiểm trên storefront.
- "Save campaign / publish PP / đổi setting thấy ngay": ngược với quan sát 2026-10-28 (BUG-446/439/440);
  KHÔNG coi là expected đã xác nhận, cũng KHÔNG coi bản cũ 4 giờ là thiết kế.
- Nhận định nguyên nhân BUG-446/439/440 là SDK gọi v=1 cố định + Cloudflare cache: suy ra từ quan sát,
  dev chưa xác nhận.
- Cửa sổ stale (~20–29 phút lượt đầu, tới 4 giờ theo max-age=14400): đo 1 lần trên staging, không phải hằng số.
- Đường endpoint platform product (/campaigns/{shopify product id}.json): quan sát của agent, chưa xác nhận là chính thức.
- config.maps_api_key được phép public: chưa ai xác nhận.
- "product description vẫn còn" trong payload: dev ghi, TC-TIB-7507 không kiểm.
- Jira chuyển Passed / Done KHÔNG có nghĩa 4 bug trên đã được chấp nhận hay đã sửa.
- Không đề xuất sửa store-setting.md ("PUT config xoá cache") cho tới khi dev chốt BUG-440.
- Các tên feature_key "MỚI: …" ở Phần 1b chỉ là đề xuất; không đề xuất object mới cho cache Redis.
```

## 4.3 Đề xuất context nên nói gì `[AGENT soạn, BẠN duyệt]`

```
Storefront SDK lấy dữ liệu campaign qua GET /api/merchant/campaigns/{id}.json?shop=<shop>&v=<version>
(platform product: quan sát thấy cùng endpoint với id = Shopify product id, chưa xác nhận). Từ TIB-5203
(Done 2026-10-29), response có resource_type = "campaign" hoặc "platform_product" và vẫn có config,
has_subscription, is_development, is_plus, sku_enabled, shop_name; không còn artworks[].description /
is_locked / status, campaign_products[].created_at / updated_at, product internal_tags / status, variant
created_at / updated_at / deleted_at (TC-TIB-7507 PASS staging 2026-10-28). Theo dev, artworks[] chỉ còn
global_option_ids và global option đầy đủ nằm 1 lần ở top-level global_options — đúng trên URL v mới,
nhưng URL SDK v=1 còn bản cũ (BUG-437). Khi test invalidation: URL ?v=1 SDK gọi có thể trả bản cũ (Cloudflare
HIT, max-age=14400) sau save artwork / sync campaign / publish platform product / PUT
/api/instances/{id}/config (BUG-446, BUG-439, BUG-440, staging 2026-10-28) — chấm theo đúng URL SDK gọi
trong Network và so với URL v mới chưa từng gọi trước khi kết luận; hard reload trình duyệt không đủ.
```

## 4.4 Mức độ gấp `[BẠN]`

`HIGH` (đang chặn test P0/P1) · `MEDIUM` (ảnh hưởng coverage) · `LOW` (cải thiện dần)

---

# Phần 5 — Evidence `[AGENT]`

## 5.1 Nguồn & evidence theo từng claim — một block cho MỖI Claim ID ở Phần 1a

### CLAIM-01

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** `Testlane TIB-257 · TC-TIB-7507 (bổ sung: TC-TIB-7394, TC-TIB-7395 lượt đầu)`
- **Link:** `https://qa-hub.ownego.com/test-cases?task=TIB-257`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-28`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `test-executor [AI] (QA agent), task của chienct (QA)`
- **Trích nguyên văn:**
  ```
  TC-TIB-7507 actualResult: "Chạy 2026-10-28 ~10:30 UTC trên staging [AI], gọi thẳng API (curl) với tham số v
  chưa từng dùng → CF-Cache-Status: MISS ở cả 4 response. … Field SDK cần vẫn đủ ở cả 4: resource_type, config,
  has_subscription, is_development, is_plus, sku_enabled, shop_name, global_options (top-level)."
  TC-TIB-7395 actualResult (lượt đầu): "GET /api/merchant/campaigns/9452881084657.json?shop=nprice1.myshopify.com
  … => 200: resource_type="platform_product", id=602, … đủ 6 field merchant: config, has_subscription=true,
  is_development=true, is_plus=false, sku_enabled=true, shop_name="Nprice1"."
  ```
- **File đính kèm cho claim này:** `không có`

### CLAIM-02

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** `Testlane TIB-257 · TC-TIB-7507; Jira TIB-5203 comment 55763 (mục "Updated 2026-10-28")`
- **Link:** `https://qa-hub.ownego.com/test-cases?task=TIB-257`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-28`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `test-executor [AI] (QA agent); mô tả thay đổi: tinhpt (dev)`
- **Trích nguyên văn:**
  ```
  TC-TIB-7507 actualResult: "CP-CACHE-R2 #3279 / Nprice2 (…/campaigns/9138273779910.json?shop=nprice2.myshopify.com):
  artworks (2) không còn description / is_locked / status / global_options, có global_option_ids; campaign_products (1)
  không còn created_at / updated_at; product không còn internal_tags / status; variants (4) không còn created_at /
  updated_at / deleted_at." "CP-CACHE-R2 #3279 / Nprice1 … và CP-CACHE #3270 / Nprice1 …: kết quả giống hệt."
  Comment 55763 (dev): "the PR gained commit `8731f3a`, which drops a few fields from the payload that neither the
  storefront nor the renderers read: artwork `description`, `is_locked`, `status`; campaign product `created_at`,
  `updated_at`; product `internal_tags`, `status`; variant `created_at`, `updated_at`, `deleted_at`."
  ```
- **File đính kèm cho claim này:** `không có`

### CLAIM-03

- **Loại nguồn** (đúng 1): `KHÔNG CÓ NGUỒN`
- **Locator:** `Testlane TIB-257 · TC-TIB-7396 (BUG-437); Jira TIB-5203 comment 55763 bước 4`
- **Link:** `https://qa-hub.ownego.com/test-cases?task=TIB-257`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-28`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `test-executor [AI]; mô tả: tinhpt (dev)`
- **Trích nguyên văn:**
  ```
  TC-TIB-7396 actualResult: "Fail — Retest 2026-10-28: vẫn tái hiện trên URL SDK thật sự dùng. … artworks[0] (#5952)
  có cả `global_options` (1 phần tử) lẫn `global_option_ids`=[1125] … Phần fix: cùng endpoint với v mới … trả đúng
  shape: artworks[] chỉ có `global_option_ids` (AW-GO=[1125], AW-GO2=[1125,1126]), top-level 2 phần tử."
  Comment 55763: "Each entry in `artworks` now has only `global_option_ids` (no `global_options` list of its own);
  the full global options appear once, in the top-level `global_options`."
  ```
- **File đính kèm cho claim này:** `ảnh chụp đính kèm trên TC-TIB-7396 (Testlane)`

### CLAIM-04

- **Loại nguồn** (đúng 1): `KHÔNG CÓ NGUỒN`
- **Locator:** `Testlane TIB-257 · TC-TIB-7391, TC-TIB-7395; Jira TIB-5203 comment 55763 bước 4`
- **Link:** `https://qa-hub.ownego.com/test-cases?task=TIB-257`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-28`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `test-executor [AI]`
- **Trích nguyên văn:**
  ```
  TC-TIB-7391 actualResult: "API: SDK gọi GET /api/merchant/campaigns/9452881084657.json?shop=… (theo Shopify product
  id, KHÔNG phải platform-products/<uuid>.json như case ghi) => 200, resource_type="platform_product"."
  Comment 55763: "find the campaign request (`/api/merchant/campaigns/<id>.json?shop=...` or
  `/api/merchant/platform-products/<uuid>.json?shop=...`)"
  ```
- **File đính kèm cho claim này:** `teeinblue/TIB automation/qa-output/api-observations_TIB-257.json`

### CLAIM-05

- **Loại nguồn** (đúng 1): `KHÔNG CÓ NGUỒN`
- **Locator:** `Testlane TIB-257 · TC-TIB-7402 (BUG-446); Jira TIB-5203 comment 55763 bước 5`
- **Link:** `https://qa-hub.ownego.com/test-cases?task=TIB-257`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-28`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `test-executor [AI]; mô tả expected: tinhpt (dev)`
- **Trích nguyên văn:**
  ```
  TC-TIB-7402 actualResult: "Fail — Retest 2026-10-28: BUG-446 vẫn tái hiện, storefront (URL SDK v=1) không hiện bản mới.
  … Actual: SDK vẫn gọi GET …/campaigns/15271489765617.json?shop=nprice1.myshopify.com&v=1 => text "NAME"
  (last-modified 05:29:56 GMT, 09:29:01). Trang còn link preload v=1793179721 (version mới) trả "FIX5203A" …"
  Comment 55763 bước 5: "Reload the product page: the change shows (a few seconds for the queue at most), not the old version."
  ```
- **File đính kèm cho claim này:** `ảnh chụp đính kèm trên TC-TIB-7402 / BUG-446 (Testlane)`

### CLAIM-06

- **Loại nguồn** (đúng 1): `KHÔNG CÓ NGUỒN`
- **Locator:** `Testlane TIB-257 · TC-TIB-7403 (BUG-439); Jira TIB-5203 comment 55763 bước 6`
- **Link:** `https://qa-hub.ownego.com/test-cases?task=TIB-257`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-28`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `test-executor [AI]; mô tả expected: tinhpt (dev)`
- **Trích nguyên văn:**
  ```
  TC-TIB-7403 actualResult: "Fail — Retest 2026-10-28: BUG-439 vẫn tái hiện cho platform product. … Actual: SDK vẫn gọi
  GET …/campaigns/9452881084657.json?shop=nprice1.myshopify.com&v=1 => "NAME", last-modified 04:59:40 GMT (cũ ~4.5 giờ),
  artworks[] còn key `global_options`. Link preload trên trang dùng v=1793179820 (version mới) trả "FIX5203B" …"
  Comment 55763 bước 6: "edit and save it in the portal, then reload its Shopify product page; the change shows."
  ```
- **File đính kèm cho claim này:** `ảnh chụp đính kèm trên TC-TIB-7403 / BUG-439 (Testlane)`

### CLAIM-07

- **Loại nguồn** (đúng 1): `KHÔNG CÓ NGUỒN`
- **Locator:** `Testlane TIB-257 · TC-TIB-7404 (BUG-440); Jira TIB-5203 comment 55763 bước 7`
- **Link:** `https://qa-hub.ownego.com/test-cases?task=TIB-257`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-28`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `test-executor [AI]; mô tả expected: tinhpt (dev)`
- **Trích nguyên văn:**
  ```
  TC-TIB-7404 actualResult: "Fail — Retest 2026-10-28: BUG-440 vẫn tái hiện. … PUT /api/instances/520/config (09:31:41 UTC)
  => 200, body show_navigation_numbers=true. … Actual: SDK GET …/campaigns/15271489765617.json?shop=nprice1.myshopify.com&v=1
  => config.show_navigation_numbers=false (last-modified 05:29:56 GMT). Link preload v=1793179721 cũng trả false
  (entry 09:28:47). Chỉ URL với v mới (chưa từng gọi) trả true."
  Comment 55763 bước 7: "Reload the campaign page: the new setting applies right away."
  ```
- **File đính kèm cho claim này:** `ảnh chụp đính kèm trên TC-TIB-7404 / BUG-440 (Testlane)`

### CLAIM-08

- **Loại nguồn** (đúng 1): `KHÔNG CÓ NGUỒN`
- **Locator:** `Testlane TIB-257 · TC-TIB-7390, 7392, 7393, 7398, 7399, 7400`
- **Link:** `https://qa-hub.ownego.com/test-cases?task=TIB-257`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-28`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `test-executor [AI]`
- **Trích nguyên văn:**
  ```
  TC-TIB-7390: "Form CP-CACHE (AW-GO) hiển thị đủ: Name (text, mockup hiện default "NAME"), Dog (clipart 4 item), Color A1
  (dropdown Red/Blue/Green, default Red); mockup hiển thị."
  TC-TIB-7393: "Reload 4 lần CP-CACHE và PP-CACHE: chữ ký form (4 clipart, dropdown Red/Blue/Green, 5 input layer) giống hệt lần đầu."
  TC-TIB-7398: "Chọn Color A1 = "Green": form hiển thị "Green" … body global-option-1125="green" (cả 2 layer Color A1/A2 cùng
  dùng GO 1125 nên chỉ 1 giá trị)."
  TC-TIB-7399: "Chọn GO-A trên CP-CACHE rồi mở CP-CACHE2 cùng trình duyệt: GO-A tự điền đúng giá trị đã chọn"
  TC-TIB-7400: "CP-NOGO: form chỉ có 1 input Text (layer-520331), không có dropdown GO; nhập "NOGO", preview hiện, reload vẫn giữ "NOGO"."
  Comment 55763 (Updated 2026-10-28): "Please redeploy the branch to staging and recheck **steps 1–4, 5 and 12**"
  ```
- **File đính kèm cho claim này:** `không có`

### CLAIM-09

- **Loại nguồn** (đúng 1): `KHÔNG CÓ NGUỒN`
- **Locator:** `Testlane TIB-257 · TC-TIB-7391, TC-TIB-7393; BUG-310 (có sẵn)`
- **Link:** `https://qa-hub.ownego.com/test-cases?task=TIB-257`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-28`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `test-executor [AI]`
- **Trích nguyên văn:**
  ```
  TC-TIB-7391: "Lưu ý quan trọng: trên storefront KHÔNG patch thì form KHÔNG render (console: SyntaxError + "TypeError: e is not
  iterable" ở getDefaultVariant) do category tên `<script>alert('xss')` làm đóng sớm thẻ script teeinblueCampaign (571KB) — lỗi
  có sẵn BUG-310 (storefront-sdk.md), không do TIB-5203; cả PP cũ #589 cũng bị."
  ```
- **File đính kèm cho claim này:** `không có`

### CLAIM-10

- **Loại nguồn** (đúng 1): `KHÔNG CÓ NGUỒN`
- **Locator:** `Testlane TIB-257 · TC-TIB-7405; order #1121 (portal orders/4812)`
- **Link:** `https://qa-hub.ownego.com/test-cases?task=TIB-257`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-28`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `test-executor [AI]`
- **Trích nguyên văn:**
  ```
  TC-TIB-7405: "Campaign CP-CACHE: nhập "ORDER5203", GO-A "Blue", Add to cart rồi checkout Bogus … → order Shopify #1121 = portal
  orders/4812, thuộc campaign #3270 "TIB5203 CP-CACHE" (item 7629). … "View customization" trong order: Name=ORDER5203, Color A1
  (global-option-1125)=Blue. File design (…-14184.png) render "ORDER5203" + clipart, không phải "NAME""
  ```
- **File đính kèm cho claim này:** `không có`

### CLAIM-11

- **Loại nguồn** (đúng 1): `KHÔNG CÓ NGUỒN`
- **Locator:** `Testlane TIB-257 · TC-TIB-7406 (Blocked)`
- **Link:** `https://qa-hub.ownego.com/test-cases?task=TIB-257`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-28`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `test-executor [AI]`
- **Trích nguyên văn:**
  ```
  TC-TIB-7406: "Blocked — Order platform product đã thanh toán trên Shopify nhưng không xuất hiện trong portal nên không kiểm được
  order item/design. … Chưa kết luận được do TIB-5203 hay do webhook/ingest đơn platform product nói chung"
  ```
- **File đính kèm cho claim này:** `không có`

### CLAIM-12

- **Loại nguồn** (đúng 1): `KHÔNG CÓ NGUỒN`
- **Locator:** `Testlane TIB-257 · TC-TIB-7407 (Blocked); Jira TIB-5203 comment 55763 bước 10`
- **Link:** `https://qa-hub.ownego.com/test-cases?task=TIB-257`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-28`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `test-executor [AI]; mô tả expected: tinhpt (dev)`
- **Trích nguyên văn:**
  ```
  TC-TIB-7407: "Blocked — Không tìm được điểm vào "customization link" của order item để mở form buyer."
  Comment 55763 bước 10: "Open the customization link of the prepared order item … the form, including that layer's choices,
  loads. Personalize and submit. The submission is accepted, and the order item shows the submitted customization in the portal."
  ```
- **File đính kèm cho claim này:** `không có`

### CLAIM-13

- **Loại nguồn** (đúng 1): `KHÔNG CÓ NGUỒN`
- **Locator:** `Testlane TIB-257 · TC-TIB-7408`
- **Link:** `https://qa-hub.ownego.com/test-cases?task=TIB-257`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-28`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `test-executor [AI]`
- **Trích nguyên văn:**
  ```
  TC-TIB-7408: "Re-publish CP-CACHE (Update cho Nprice1 trong Multi-store launch): POST /api/campaigns/3270/sync => 200, link
  storefront tib5203-cp-cache còn nguyên, metafield version đổi (1793166073). Storefront tải đủ form (Name/Dog/Color A1), reload
  4 lần giống hệt … Lưu ý: không thấy toast trong ảnh chụp (dialog launch vẫn mở)."
  ```
- **File đính kèm cho claim này:** `không có`

### CLAIM-14

- **Loại nguồn** (đúng 1): `KHÔNG CÓ NGUỒN`
- **Locator:** `Testlane TIB-257 · TC-TIB-7401`
- **Link:** `https://qa-hub.ownego.com/test-cases?task=TIB-257`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-28`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `test-executor [AI]`
- **Trích nguyên văn:**
  ```
  TC-TIB-7401: "Campaign editor portal (CP-CACHE, design AW-GO): mục "Personalization form" hiển thị Name, Dog (4 clipart) và
  Color A1 (dropdown Red/Blue/Green); preview mockup hiển thị bình thường. API đọc: GET /api/campaigns/3270 => 200."
  ```
- **File đính kèm cho claim này:** `không có`

### CLAIM-15

- **Loại nguồn** (đúng 1): `KHÔNG CÓ NGUỒN`
- **Locator:** `Testlane TIB-257 · TC-TIB-7397 (Blocked)`
- **Link:** `https://qa-hub.ownego.com/test-cases?task=TIB-257`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-28`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `test-executor [AI]`
- **Trích nguyên văn:**
  ```
  TC-TIB-7397: "Blocked — Fixture CP-CACHE không có cách chuyển design trên storefront. … Bằng chứng bán phần: CP-CACHE2 (#3271,
  chỉ AW-GO2) hiện cả GO-A (Red/Blue/Green) và GO-B (Small/Large) — tức mỗi artwork chỉ hiện GO của chính nó khi tách campaign;
  chưa kiểm được bước đổi design trong cùng 1 campaign."
  ```
- **File đính kèm cho claim này:** `không có`

### CLAIM-16

- **Loại nguồn** (đúng 1): `KHÔNG CÓ NGUỒN`
- **Locator:** `Testlane TIB-257 · TC-TIB-7409`
- **Link:** `https://qa-hub.ownego.com/test-cases?task=TIB-257`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-28`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `test-executor [AI]`
- **Trích nguyên văn:**
  ```
  TC-TIB-7409: "access_token=0, token=0, secret=0, password=0; api_key=1 → chỉ config.maps_api_key = Mapbox public token (tiền tố
  "pk.", loại token công khai dùng ở trình duyệt, có trong config merchant). Không lộ token/secret của instance. Cần dev/PO xác nhận
  maps_api_key được phép public (nếu chính sách là "không có key nào" thì đổi thành Fail)."
  ```
- **File đính kèm cho claim này:** `không có`

### CLAIM-17

- **Loại nguồn** (đúng 1): `KHÔNG CÓ NGUỒN`
- **Locator:** `Jira TIB-5203 comment 55763 (Rule under test; Not for QA)`
- **Link:** `https://ownego.atlassian.net/browse/TIB-5203`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-27`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `tinhpt (dev)`
- **Trích nguyên văn:**
  ```
  "no merchant setting leaks into the product's Shopify metafield." "The Shopify metafield job sends the campaign data without any
  merchant setting fields (`config`, `has_subscription`, `shop_name`, ...): `UpdateCampaignDataMetafieldTest`."
  ```
- **File đính kèm cho claim này:** `không có`

### CLAIM-18

- **Loại nguồn** (đúng 1): `KHÔNG CÓ NGUỒN`
- **Locator:** `Jira TIB-5203 comment 55763 (Rule under test; Test setup; Not for QA; For the developer at production deploy)`
- **Link:** `https://ownego.atlassian.net/browse/TIB-5203`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-27`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `tinhpt (dev)`
- **Trích nguyên văn:**
  ```
  "each cached campaign/platform-product entry is about 8.5x smaller" "the old cache entries are skipped automatically (new cache
  key), so no cache flush is needed." "`cache:memory-report` counts exactly one shop's live keys with `--domain` and ignores a shop
  whose domain ends with it" "run `php artisan cache:memory-report` on production and compare the "Campaign + platform product" live
  row and `used_memory`: the total should fall toward roughly 1/8 within an hour, with no spike in between."
  ```
- **File đính kèm cho claim này:** `không có`

### CLAIM-19

- **Loại nguồn** (đúng 1): `KHÔNG CÓ NGUỒN`
- **Locator:** `Jira TIB-5203 description (Primary fix; Secondary findings); RA analysis_TIB-5203.md Q1`
- **Link:** `https://ownego.atlassian.net/browse/TIB-5203`
- **Ngày của nguồn (YYYY-MM-DD):** `không rõ`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `tinhpt (dev, reporter hiện tại)`
- **Trích nguyên văn:**
  ```
  Description: "Add to routes/console.php: Schedule::command('cache:prune-stale-tags')->hourly(); Run it once manually on production
  for immediate relief — it reclaims memory without dropping any cache entries that are still live." "## Secondary findings
  (suggest splitting into subtasks)"
  RA Q1 [Blocker]: "Phạm vi QA của TIB-5203 là chỉ PR #4063 (thu nhỏ cache campaign, phát hiện phụ #3), hay gồm cả fix chính
  (schedule `cache:prune-stale-tags` hằng giờ) và các phát hiện #1, #2, #4–#7?" — Nhật ký chốt trống, chưa có đáp án.
  ```
- **File đính kèm cho claim này:** `không có`

### CLAIM-20

- **Loại nguồn** (đúng 1): `KHÔNG CÓ NGUỒN`
- **Locator:** `Jira TIB-5203 comment 55763 bước 12 (thêm khi sửa comment 2026-10-28)`
- **Link:** `https://ownego.atlassian.net/browse/TIB-5203`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-28`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `tinhpt (dev)`
- **Trích nguyên văn:**
  ```
  "12. In the portal campaign editor, change a campaign product's settings (for example its price or the product's title on the
  store) and save. The save succeeds and the product row still shows its product, variants and settings after the page reloads."
  ```
- **File đính kèm cho claim này:** `không có`

*(lặp lại block trên cho CLAIM-02, CLAIM-03…)*

## 5.2 Evidence chung, không thuộc claim nào `[AGENT]`

`Jira https://ownego.atlassian.net/browse/TIB-5203 (description, comment 55763, 55906, changelog); Testlane https://qa-hub.ownego.com/test-cases?task=TIB-257 (TC-TIB-7390..7409, TC-TIB-7507, BUG-437, BUG-446, BUG-439, BUG-440 kèm ảnh chụp); report lượt chạy https://claude.ai/artifact/GW9Xo8nciAh2rAsG8FXkKy; report retest https://claude.ai/artifact/73Z1q4Am27R8EXpAjarxS5; API capture teeinblue/TIB automation/qa-output/api-observations_TIB-257.json; RA teeinblue/TIB automation/qa-output/analysis_TIB-5203.md; Proposal cũ CBS-013 (khuôn cũ, submitted 2026-10-28)`

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
