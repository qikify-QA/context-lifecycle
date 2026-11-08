# Context Change Request (CCR) — TIB-5427 design_urls (open-platform callback)

> Khuôn dùng: bundled canonical (`create-ccr` skill, `references/ccr-template.md`).
> Phụ lục product dùng: `/Users/linhsmac/Documents/work/teeinblue-context-builder/knowledge/how-to-request/ccr-product-appendix.md` (tìm thấy, repo `qikify-QA/context-lifecycle` bản clone local).

## Cách gửi (theo phụ lục product, mục 3)

Submit tạo đồng thời 1 Proposal trên QA Hub + 1 Task trên agent board. **Trigger thật là kéo Task trên agent board (`ops-board/`, repo `teeinblue-context-builder`) từ `Todo` sang `In Progress`** — kéo card Proposal trên QA Hub không trigger gì.

Phụ lục ghi nhận (tính tới lần cập nhật gần nhất của nó): MCP server `qa-hub-production` chưa expose tool Context Board, nên đường dùng được là đặt file CCR này vào `runs/ccr-drafts/` của repo `teeinblue-context-builder` rồi gọi `qa-context-lifecycle-orchestrator`. Xác nhận lại tình trạng này còn đúng không trước khi submit — phụ lục có thể đã cập nhật.

**Tiêu đề task:** `[CCR] NEW_FEATURE — sdk — design_urls array trong onCustomizationCreated (open-platform)`

---

# Phần 0 — Cần mấy CCR? `[AGENT đề xuất]`

**Đề xuất: 1 CCR**, gồm 2 claim (CLAIM-01, CLAIM-02). Lý do gộp — cả 4 tiêu chí giống nhau:

| | CLAIM-01 | CLAIM-02 |
|---|---|---|
| Product | teeinblue | teeinblue |
| Người gỡ | Tự explore được (đã verify trực tiếp) | Tự explore được (đọc source bundle trực tiếp) |
| Điều kiện mở khoá | Không cần ai trả lời thêm để ghi nhận; multi-artwork (2+) vẫn cần agent tự dựng thêm data trên staging để verify tiếp | Không cần ai trả lời thêm để ghi nhận; **có** 1 câu hỏi mở cho PO/Dev về phạm vi chủ đích (xem Phần 4) nhưng không chặn việc ghi nhận observation |
| Vòng đời | Độc lập — có giá trị dù claim kia bị huỷ | Độc lập — có giá trị dù claim kia bị huỷ |
| Artifact đích | `knowledge/products/teeinblue/sdk/` | `knowledge/products/teeinblue/sdk/` (cùng object, liên quan trực tiếp tới KB-009 đã có) |

`[BẠN xác nhận]`: đồng ý gộp 1 CCR chứ?

---

# Phần 1 — Thấy gì

**Loại request:** `NEW_FEATURE` (CLAIM-01, hành vi mới đã ship) + có thành phần `PROFILE_GAP`/`CANON_HYGIENE` (CLAIM-02, làm rõ ranh giới 2 kênh delivery mà canon hiện chưa phân biệt).

**Object:** `[AGENT]` — tra được trong `_registry.json`

- Product: `teeinblue`
- Object: `sdk` (label "SDK / Storefront runtime") — khớp alias "storefront runtime", "add-to-cart storefront"
- Feature: xem Phần 1b (CLAIM-01 đề xuất feature mới; CLAIM-02 gắn vào feature có sẵn `storefront-buyer-facing`)

**Quan sát được** `[AGENT]`

```
TIB-5427 "Return all artwork design_urls when submitting a platform customization"
(Improvement, project TIB, resolved 2026-10-07, Resolution: Done)

- Request gốc (description, trích nguyên văn): "Return the full list of design_urls
  (one per artwork) when submitting a platform customization, instead of only the
  first artwork's URL."
- Trước fix: onCustomizationCreated chỉ trả 1 design_url (string), build từ artwork
  đầu tiên, pattern designs/{customizationId}/{customizationId}-{artworkId}.{ext}.
- Dev comment #50575 (tinhpt, 2026-09-11T12:30 +0700, Testing plan, PR
  github.com/qikify/teeinblue-sdk/pull/2014) mô tả hành vi dự kiến sau fix:
  design_urls (mảng, 1 URL/artwork, đúng thứ tự artwork trong form), design_url
  (số ít) giữ nguyên = design_urls[0] để backward-compat.

Agent (tôi) đã trực tiếp verify (KHÔNG chỉ tổng hợp từ ticket) trên 2 môi trường,
2 ngày khác nhau, bằng cách gán hàm capture vào window.teeinblue.onCustomizationCreated
trước khi submit, rồi đọc đúng tham số SDK truyền vào khi gọi callback thật:

1. Staging — linh-open-platform.myshopify.com (open-platform SDK,
   staging-sdk.teeinblue.com/open/index.js), 2026-10-07. Customization
   d9a13ceb-7d77-44c1-9c15-c538e4c02b6f, 1 artwork (id 2179, design_format "rgb").
   Callback trả: design_url = ".../designs/d9a13ceb-.../d9a13ceb-...-2179.png",
   design_urls = [cùng giá trị].

2. Production — coolgift.com (open-platform SDK, sdk.teeinblue.com/open/index.js,
   merchant THẬT đã tự gán window.teeinblue.onCustomizationCreated từ trước),
   2026-10-08. Customization [REDACTED-customization-id], 1 artwork
   (id 1136925, template-prefixed key xác nhận qua rule "value bắt đầu bằng
   'template' => key là artwork id" nêu trong chính ticket). Callback trả:
   design_url = "https://cdn.teeinblue.com/designs/[REDACTED]-.../[REDACTED]-...-1136925.png",
   design_urls = [cùng giá trị]. Bắt được bằng cách wrap (không ghi đè) callback
   thật của merchant, lưu vào sessionStorage để sống sót qua navigate sang /cart/.

3. Đọc trực tiếp source code bundle (không phải tài liệu dev viết tay — agent tự
   grep bundle đã minify) của CẢ 2 domain (staging-sdk.teeinblue.com/open/index.js
   và sdk.teeinblue.com/open/index.js, cùng 1 file, cùng nội dung):

   addToCart(e,t,i){return this.createPlatformCustomization(e).then(o=>{
     const n=this.generateDesignLinks(o,i),
     r={[q.attrPublicCustomizationId]:o.id,data:o.data,
        design_url:n[0],design_urls:n,preview_url:o.preview_url};
     return this.notifyParentIFrame(t,r),r})}

   generateDesignLinks(e,t){return t.map(i=>{
     const o=this.retrieveDesignExt(i.design_format),
     n=`designs/${e.id}/${e.id}-${i.id}.${o}`;
     return Ne(n)})}

   retrieveDesignExt -> function Zc(e){switch(e){case"svg":return"svg";
     case"eps":return"eps";case"ai":return"ai";case"jpeg":return"jpeg";
     case"jpeg_cmyk":return"jpeg";case"jpeg_cmyk_coated_fogra39":return"jpeg";
     case"pdf":return"pdf";default:return"png"}}

   -> .map() lặp qua MỌI artwork trong t (không chỉ artwork đầu), mỗi phần tử
   tự lấy extension riêng qua Zc(design_format của chính nó). Kiến trúc đã hỗ
   trợ nhiều artwork, dù agent chỉ verify end-to-end được 1 artwork (xem "Thử
   gì mà KHÔNG tái hiện" bên dưới).

   Giao callback bằng 1 trong 2 cách tuỳ component: window.parent.postMessage
   (component TeeinbluePlatformProductElement, dùng cho iframe embed) HOẶC gọi
   trực tiếp window.teeinblue.onCustomizationCreated(e,t) nếu merchant đã gán
   hàm đó (component modal) — khớp đúng 2 cơ chế "embed postMessage" / "open-
   platform window.teeinblue.onCustomizationCreated" mà ticket gốc nhắc tới.

4. Đối chứng: đọc source bundle SHOPIFY THEME-EMBED
   (staging-sdk.teeinblue.com/shopify/app-v1.js, ~1.7MB, cùng site
   linh-tib-staging.myshopify.com VÀ cùng domain/file mà coolgift.com load khi
   dùng kiểu tích hợp này) — grep toàn bộ bundle:
   generateDesignLinks: 0 lần · design_urls: 0 lần · onCustomizationCreated:
   0 lần · notifyParentIFrame: 0 lần · window.parent.postMessage: 0 lần.
   Có định nghĩa constant EVENT_CUSTOMIZATION_CREATED:"teeinblue-event-
   customization-created" trong enum event, nhưng KHÔNG có bất kỳ chỗ nào
   trong bundle thực sự dispatchEvent nó — tồn tại nhưng chết (dead code)
   trong bundle app-v1.js.
```

- Nguồn: mục (1)+(2) là quan sát trực tiếp của agent (không phải tổng hợp ticket); mục (3)+(4) là agent tự đọc source code production/staging thật, không phải tài liệu dev viết tay.
- Thấy mấy lần / xác nhận trực tiếp mấy lần: **2 lần** (staging 2026-10-07, production 2026-10-08) cho CLAIM-01 (array có mặt, length 1, = design_url, pattern đúng). **1 lần** (grep 1 file bundle app-v1.js) cho CLAIM-02.

**Thử gì mà KHÔNG tái hiện / chưa thử gì** `[AGENT + BẠN]`

```
- CHƯA verify design_urls với length >= 2 (nhiều artwork): mọi customization
  agent tự submit được (staging + production) đều chỉ có 1 artwork. Không dựng
  được data 2-artwork trong phiên làm việc này (xin ảnh thật để test qua upload
  field bắt buộc, nhưng vẫn dừng ở sản phẩm 1-artwork). Test case TC-TIB-001/
  002/007 (order/length với 2-3 artwork) đều SKIPPED trên Testlane (xem Phần 5).
  Có 1 campaign 2-artwork đã biết trên linh-tib-staging ("gift #1/#2", Quick
  Navigation) nhưng CHƯA thử submit qua nó trong phiên verify design_urls này.
- CHƯA thử mixed design_format giữa các artwork trong cùng 1 customization
  (TC-TIB-008, skipped).
- CHƯA thử trường hợp 1 artwork generate design thất bại giữa chừng (TC-TIB-009,
  skipped) — hành vi design_urls lúc đó (thiếu phần tử/null/chặn cả payload)
  hoàn toàn chưa biết.
- CLAIM-02 (bundle app-v1.js không có design_urls/onCustomizationCreated) CHỈ
  verify trên app-v1.js. CANON hiện tại (KB storefront-buyer-facing) có ghi
  nhận CẢ app-v2.js (store2, xem KB liên quan) — agent CHƯA grep app-v2.js
  trong phiên này. KHÔNG được suy diễn app-v2.js giống app-v1.js.
- Bảo mật URL design_urls (truy cập chéo customization khác, access-control
  model) — có quan sát sơ bộ (wrong-artwork-id trong cùng customization -> 403,
  không auth header) nhưng CHƯA kết luận, đang ở trạng thái blocked chờ PO/Dev
  trên Testlane (TC-TIB-010) — KHÔNG đưa vào claim nào ở CCR này vì chưa đủ
  nguồn theo chuẩn Phần 1a.
```

## Phần 1a — Phạm vi thay đổi & ảnh hưởng ước tính `[AGENT]`

| Claim ID | Thay đổi / claim | Surface liên quan | Nguồn & độ mạnh | Object/feature/checklist bị ảnh hưởng | Quan hệ với canon |
|---|---|---|---|---|---|
| `CLAIM-01` | TIB-5427 — `onCustomizationCreated` (open-platform delivery) trả thêm `design_urls` (mảng, 1 URL/artwork, pattern `designs/{customizationId}/{customizationId}-{artworkId}.{ext}`, extension lấy từ `design_format` riêng của từng artwork qua hàm mapping cố định); `design_url` (số ít) giữ nguyên = `design_urls[0]` | `sdk` (storefront runtime, open-platform delivery cụ thể — KHÔNG phải Shopify theme-embed, xem CLAIM-02) | `test_case` — TC-TIB-4355/4357/4358 PASS, 2026-10-07, Testlane task TIB-154 (xem 5.1) | object `sdk`; feature mới (xem 1b); không có checklist nào bị SAI (shape cũ `design_url` không đổi — backward-compat xác nhận qua chính TC-TIB-4358) | `ADD` |
| `CLAIM-02` | Bundle Shopify theme-embed (`.../shopify/app-v1.js`) KHÔNG có bất kỳ implementation nào của `onCustomizationCreated`/`design_urls`/`generateDesignLinks`/postMessage-tới-parent (0 occurrence) — cơ chế per-artwork DUY NHẤT ở kênh này vẫn là cart line-item properties `_tib_design_link_N` (đã có trong canon, KB-009) | `sdk` (storefront runtime, Shopify theme-embed delivery — app-v1.js cụ thể, app-v2.js CHƯA verify) | `KHÔNG CÓ NGUỒN` — quan sát kỹ thuật trực tiếp của agent (đọc/grep bundle production+staging), không phải dev_doc/spec_doc/po_dev_confirm/test_case theo đúng định nghĩa 5 loại | object `sdk`, feature có sẵn `storefront-buyer-facing`, liên quan trực tiếp KB-009 | `ADD` (bổ sung ranh giới kênh delivery, không phủ nhận KB-009 — chỉ làm rõ `_tib_design_link_N` vẫn là cơ chế duy nhất ở kênh này) |

## Phần 1b — Đề xuất địa chỉ trong KB `[AGENT đề xuất, BẠN duyệt]`

| Claim ID | object_key | feature_key | scope.role | scope.surface | kb_id bị ảnh hưởng |
|---|---|---|---|---|---|
| `CLAIM-01` | `sdk` | `"MỚI: open-platform-customization-callback"` | `merchant integration (consumer của callback)` — buyer chỉ kích hoạt gián tiếp qua submit form | `storefront` (open-platform runtime cụ thể) | không có (feature mới, chưa có KB nào) |
| `CLAIM-02` | `sdk` | `storefront-buyer-facing` (feature có sẵn) | `merchant integration` | `storefront` (Shopify theme-embed cụ thể) | `KB-009` (liên quan trực tiếp — bổ sung ngữ cảnh "đây vẫn là cơ chế DUY NHẤT ở kênh embed") |

- `scope.role` ở CLAIM-01/02 là bên tiêu thụ callback (merchant's own integration code), khác với role buyer quan sát ở Phần 2 bên dưới.
- `feature_key` CLAIM-01 chỉ là đề xuất tên — agent xử lý CCR quyết định cuối.

---

# Phần 2 — Thấy nó ở đâu `[AGENT]`

**CLAIM-01:**
- URL: `https://linh-open-platform.myshopify.com/products/the-collection-snowboard-hydrogen` (staging, 2026-10-07) và `https://www.coolgift.com/nl/t-shirt-met-zwart-wit-foto-s-en-herhalende-tekst` (production, 2026-10-08)
- Trạng thái đối tượng: campaign/product 1-artwork, submit customization thành công (HTTP 201) ở cả 2 nơi
- Environment: **cả staging LẪN production** (xem lưu ý chính sách dưới)
- Role liên quan: guest/buyer (storefront form), merchant's own integration code (người thực sự đọc callback)
- Surface: `storefront` (SDK runtime, open-platform bundle)

**CLAIM-02:**
- URL: bundle JS trực tiếp — `https://staging-sdk.teeinblue.com/shopify/app-v1.js?token=...&shop=linh-tib-staging.myshopify.com` (staging) — KHÔNG kiểm tra riêng bản production vì nội dung app-v1.js theo token/shop param không đổi logic, chỉ đổi cấu hình
- Environment: staging
- Role liên quan: không áp dụng (đọc source code tĩnh, không phải hành vi runtime theo role)
- Surface: `storefront` (SDK runtime, Shopify theme-embed bundle)

> **Lưu ý chính sách môi trường (theo phụ lục product, mục 2):** `teeinblue` cố định dùng `staging` làm môi trường context builder verify — **trỏ production là stop condition cho context builder**. CLAIM-01 ở đây có 1 phần bằng chứng từ **production** (coolgift.com, do công việc QA thực tế trên ticket yêu cầu xác nhận trên khách hàng thật) — bằng chứng production này VẪN gửi kèm làm evidence, nhưng agent xử lý CCR / context builder khi tự re-verify claim này chỉ nên dùng staging (linh-open-platform.myshopify.com) theo đúng chính sách, không tự ý chạm production.

---

# Phần 3 — Để không sinh conflict giả `[AGENT]`

**TIB-5427:**
- Build/version/ngày deploy: không rõ tag version chính xác, nhưng PR `qikify/teeinblue-sdk#2014` đã merge (không truy cập được diff — QA account không có quyền vào repo `teeinblue-sdk`, chỉ xác nhận gián tiếp qua hành vi runtime đã đổi đúng như PR mô tả)
- Ngày resolve: 2026-10-07 (Jira `resolutiondate`)
- Đã ship chưa: **Có** — `Resolution: Done`, status `Done` (xác nhận lại 2026-10-11, không phải chỉ dựa vào trạng thái cũ "QA Review" lúc phân tích yêu cầu ban đầu 2026-10-01)

**Context hiện đang nói gì** `[AGENT]`:
- Context version đang dùng (object `sdk`, theo `manifest.json`): **version 5**, published 2026-09-28, `mode: INCREMENTAL_UPDATE`, `usable_as_oracle: false` (0 item `CONFIRMED_EXPECTED` trong toàn object tính tới version 5)
- Canon hiện nói (trích nguyên văn, `features/storefront-buyer-facing/kb.json`):
  - **KB-009**: "Store2 (SDK v2): cart line item KHÔNG lộ giá trị cá nhân hoá dạng text đọc được, chỉ có reference nội bộ + mockup ảnh" — statement đầy đủ (dòng 162 trong file): "...line item properties trả về CHỈ gồm field nội bộ tiền tố '_' (_customization_id, _customization_image, _tib_fulfilled_sku, _tib_design_link_1) — KHÔNG có property text người đọc được..."
  - **KB-022**: "Server sync (APIOP-051, POST /api/merchant/shopify/customization) CHỈ xảy ra tại thời điểm Add-to-cart" — mô tả đúng luồng Shopify theme-embed (khác hẳn endpoint `platform-products/{id}/platform-customizations` mà open-platform dùng, quan sát ở CLAIM-01)
  - Hoàn toàn **KHÔNG tìm thấy** mention nào của `design_urls`, `onCustomizationCreated`, hay bundle `open/index.js` trong toàn bộ `feature-summary.md` + `features/storefront-buyer-facing/kb.json` của object `sdk`
- Đã tra bằng từ khoá: `onCustomizationCreated`, `design_url` (grep case-sensitive, không khớp), `callback`, `add to cart`, `submit`, `customization` (khớp nhiều, liệt kê ở trên)
- **Không có conflict** — CLAIM-01 và CLAIM-02 đều là thông tin MỚI hoàn toàn với canon hiện tại, không có statement nào trong canon nói ngược lại.

---

# Phần 4 — Hai câu chỉ con người trả lời được `[BẠN]`

## 4.1 Có ai xác nhận đây là hành vi ĐÚNG không?

**CLAIM-01:**
- Ai xác nhận: **test case PASS** (QA tự verify trực tiếp 2 lần, staging + production) — KHÔNG phải PO/Dev sign-off riêng biệt, dù dev CÓ viết testing plan mô tả đúng hành vi này trong comment #50575 (2026-09-11) trước khi QA verify
- Ở đâu, ngày nào: TC-TIB-4355/4357/4358, Testlane task TIB-154, PASS ngày 2026-10-07
- Họ xác nhận chính xác điều gì: xem trích dẫn nguyên văn ở Phần 5.1

**CLAIM-02:**
- Ai xác nhận: **KHÔNG AI** — đây thuần là quan sát kỹ thuật của agent (QA) tự đọc bundle, chưa có PO/Dev nào xác nhận đây là phạm vi CHỦ ĐÍCH (có thể là: (a) chủ đích — fix chỉ nhắm open-platform; hoặc (b) gap thật — Shopify embed đáng lẽ cũng cần có nhưng chưa làm). **Đây là câu hỏi mở cần hỏi dev/PO**, CCR này không tự chọn phía.

`[BẠN]`: ngoài 2 nguồn trên, bạn có xác nhận PO/business nào khác (Slack, meeting, v.v.) mà CCR này chưa biết không?

## 4.2 KHÔNG đề xuất điều gì?

```
- KHÔNG coi việc PR #2014 "đã merge" là xác nhận toàn bộ phạm vi ticket đã đúng
  100% — agent chỉ verify được hành vi RUNTIME quan sát trực tiếp (1-artwork
  case), KHÔNG verify được code diff thật (không có quyền truy cập repo).
- KHÔNG coi feature_key đề xuất "MỚI: open-platform-customization-callback" là
  tên đã duyệt — chỉ là đề xuất, agent xử lý CCR có thể đổi.
- KHÔNG coi CLAIM-02 (bundle app-v1.js thiếu design_urls) là bug đã xác nhận —
  có thể là phạm vi chủ đích của ticket, chưa ai quyết định đây là gap thật
  hay không. KHÔNG tự động tạo bug report trên Jira/Testlane từ quan sát này
  (đúng theo rào chắn nội bộ QA — xem memory "no-auto-bug-report-testlane").
- KHÔNG coi số liệu "0 occurrence" trên app-v1.js là đúng cho app-v2.js — chưa
  verify riêng.
- KHÔNG coi TC-TIB-010 (security/access-control của design_urls) là đã có kết
  luận — case đó đang `blocked` trên Testlane, cố ý KHÔNG đưa vào claim nào ở
  CCR này.
```

## 4.3 Đề xuất context nên nói gì `[AGENT soạn, BẠN duyệt]`

```
Khi submit 1 platform customization qua SDK "open platform"
(sdk.teeinblue.com/open/index.js), callback onCustomizationCreated — giao qua
window.parent.postMessage (nếu widget chạy trong iframe) hoặc gọi trực tiếp
window.teeinblue.onCustomizationCreated nếu merchant đã gán hàm đó — nhận
được payload gồm {customization_id, data, design_url, design_urls, preview_url}.
design_urls là mảng, .map() qua mọi artwork của customization, mỗi URL theo
pattern designs/{customizationId}/{customizationId}-{artworkId}.{ext}, extension
suy từ design_format RIÊNG của từng artwork (switch cố định: svg/eps/ai/jpeg/
jpeg_cmyk/jpeg_cmyk_coated_fogra39 giữ nguyên định dạng, mọi giá trị khác mặc
định về png). design_url (số ít) luôn bằng design_urls[0], giữ nguyên cho
integration cũ (backward-compat). Verify trực tiếp length>=2 (nhiều artwork)
VẪN CÒN THIẾU — chỉ verify được length=1 tới nay.

Kênh Shopify theme-embed (sdk.teeinblue.com/shopify/app-v1.js) KHÔNG dùng cơ
chế onCustomizationCreated/design_urls này — cơ chế per-artwork duy nhất ở
kênh đó vẫn là cart line-item properties _tib_design_link_N (xem KB-009).
Phạm vi này có phải chủ đích hay là gap thì CHƯA xác nhận.
```

## 4.4 Mức độ gấp `[BẠN]`

Đề xuất của agent: **MEDIUM** — không chặn test P0/P1 nào hiện tại (ticket đã Done, QA đã PASS phần verify được), nhưng CLAIM-02 có thể quan trọng hơn MEDIUM nếu coolgift.com (hoặc merchant khác) chuyển từ open-platform sang Shopify embed trong tương lai mà không biết design_urls không tồn tại ở kênh đó.

`[BẠN xác nhận]`: giữ MEDIUM hay đổi mức khác?

---

# Phần 5 — Evidence `[AGENT]`

## 5.1 Nguồn & evidence theo từng claim

### CLAIM-01

- **Loại nguồn:** `test_case`
- **Locator:** TC-TIB-4355, TC-TIB-4357, TC-TIB-4358 (task TIB-154, project TIB trên Testlane)
- **Link:** nội bộ Testlane (task id `TIB-154`) — không có public URL kèm sẵn trong phiên này
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-07 (ngày PASS, trùng đúng ngày Jira `resolutiondate`)
- **Người viết / người xác nhận:** QA (agent, phiên làm việc này) — tự thực thi + tự ghi kết quả, chưa có second-reviewer
- **Trích nguyên văn** (actualResult của TC-TIB-4355):
  ```
  Verified via real onCustomizationCreated capture on open-platform product
  (linh-open-platform.myshopify.com, "Girl & Dog" template, artwork 2179,
  customization d9a13ceb-7d77-44c1-9c15-c538e4c02b6f). design_url =
  https://cdn.ownego.com/teeinblue-staging/designs/d9a13ceb-.../d9a13ceb-...-2179.png,
  design_urls[0] = identical value. Confirmed equal. Confirmed also from source
  (open-platform SDK bundle, addToCart()): design_url: n[0], design_urls: n —
  same array reference, not independently computed.
  ```
  (actualResult của TC-TIB-4358):
  ```
  Single-artwork product (open-platform, artwork 2179) submitted. Captured
  callback payload: design_url present, design_urls = array with exactly 1
  element, equal to design_url. Matches expected pre-fix-compatible shape.
  ```
- **File đính kèm cho claim này:** không có (ảnh/network capture nằm trong session scratchpad, không đính kèm CCR này — theo đúng "trích nguyên văn mới là thứ sống sót", nội dung quan trọng đã chép nguyên văn ở trên)

### CLAIM-02

- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Locator:** grep trực tiếp bundle `staging-sdk.teeinblue.com/shopify/app-v1.js` (tải về qua `curl`, ~1.7MB, 2026-10-07)
- **Link:** `https://staging-sdk.teeinblue.com/shopify/app-v1.js?token=<token>&shop=linh-tib-staging.myshopify.com` (URL có token theo session, không phải credential bí mật dài hạn — token lộ trong script src công khai của storefront)
- **Ngày của nguồn:** 2026-10-07 (ngày agent tải/grep bundle — đây là ngày QUAN SÁT của agent, KHÔNG phải ngày code được viết/deploy, vốn không xác định được từ bundle minify)
- **Người viết / người xác nhận:** agent (QA), không có dev/PO nào xác nhận lại phát hiện này
- **Trích nguyên văn** (kết quả grep, không phải diễn giải):
  ```
  generateDesignLinks: 0 lần
  window.parent.postMessage: 0 lần
  notifyParentIFrame: 0 lần
  addToCartAction: 1 lần (string constant tồn tại, không thấy dùng kèm postMessage trong bundle này)
  onCustomizationCreated: 0 lần
  design_urls: 0 lần
  EVENT_CUSTOMIZATION_CREATED:"teeinblue-event-customization-created" — ĐỊNH NGHĨA tồn tại
    trong enum event, nhưng 0 lần dispatchEvent/CustomEvent nào tham chiếu hằng số này
    trong toàn bộ bundle.
  ```
- **File đính kèm cho claim này:** không có

## 5.2 Evidence chung, không thuộc claim nào `[AGENT]`

- Jira: `TIB-5427` — https://ownego.atlassian.net/browse/TIB-5427
- PR: `qikify/teeinblue-sdk#2014` (link nêu trong Jira, agent KHÔNG có quyền truy cập repo để đọc diff thật)
- Testlane task: `TIB-154` (project `TIB`), status `done`, 10 test case (4 passed, 1 blocked, 5 skipped — xem lý do skip ở "Thử gì mà KHÔNG tái hiện")

> Đã rà PII/token/credential: token trong URL script (Phần 5.1/CLAIM-02) là token truy cập CDN script công khai theo session storefront, không phải API key/secret dài hạn — chấp nhận được, nhưng vẫn flag ở đây để người review tự quyết có cần redact trước khi publish rộng hơn không.

---

# Tự kiểm trước khi gửi

`[AGENT]` (agent đã tự kiểm):
- [x] Số lần xác nhận trực tiếp là số thật (2 cho CLAIM-01, 1 cho CLAIM-02), không làm tròn lên
- [x] Đã ghi build/ngày resolve (2026-10-07) hoặc "không rõ" (build/tag version PR) cho ticket
- [x] Đã ghi rõ từ khoá đã tra canon
- [x] Mỗi claim trong "Quan sát được" có đúng 1 dòng ở Phần 1a, `Claim ID` duy nhất (CLAIM-01, CLAIM-02)
- [x] Mỗi Claim ID có đúng 1 block ở Phần 5.1 và 1 dòng ở Phần 1b
- [x] Cột "Nguồn & độ mạnh" đúng 1 trong 5 trạng thái, kèm trích dẫn cụ thể
- [x] CLAIM-01 (`test_case`) có ngày nguồn cụ thể (2026-10-07); CLAIM-02 là `KHÔNG CÓ NGUỒN` nên không bắt buộc ngày theo chuẩn mạnh, nhưng vẫn ghi ngày quan sát để tránh "không rõ" vô nghĩa
- [x] Không còn placeholder kiểu khối-góc-nhọn-ba-lần nào sót lại trong file này

`[BẠN cần xác nhận trước khi submit]`:
- [ ] Phần 0: đồng ý gộp 1 CCR?
- [ ] Phần 4.1: có xác nhận PO/business nào khác ngoài Jira không?
- [ ] Phần 4.4: giữ MEDIUM hay đổi?
- [ ] Phần 1b feature_key đề xuất "MỚI: open-platform-customization-callback" — ok không, hay bạn muốn tên khác?
