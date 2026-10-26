# Object: SDK (product: teeinblue) — Feature Profile Summary
**Published context version:** 6

- **Environment:** staging. Kiến thức trong object này phần lớn là `OBSERVED_CURRENT` baseline; **`CONFIRMED_EXPECTED` chỉ có KB-053, KB-058 (CBS-001, chỉ staging build TIB-5352)**, KB-056/KB-060 là `INFERRED`, chưa có nguồn thẩm quyền nào xác nhận business rule.
- **Feature hiện có (3):** `storefront-buyer-facing`, `product-page-settings-config`, `genai-personalization-runtime` — mỗi feature có `features/<key>/{kb.json,profile.json}` và `checklists/<key>.json`. 3 feature KHÔNG phải tín hiệu coverage đủ ở cấp object (xem `open-questions.md` OQ-sdk-002).
- **Actor đã test:** `guest` (storefront, không login) trên 2 store — store1 (instance 609, `linh-explorer.myshopify.com`) và store2 (instance 613, `linh-explorer-2.myshopify.com`); `owner` (portal: multi-store launch + inventory config `/product-page-settings`); và staff-authenticated Live Preview widget dùng làm proxy cho buyer ở `genai-personalization-runtime`. **Chưa test buyer đã login, chưa test role portal khác owner, chưa test guest session thật cho luồng GenAI.**
- **⚠ Conflict P1 ảnh hưởng 2 feature (UNRESOLVED):** SDK version thực sự đang serve cho từng store mâu thuẫn giữa 3 nguồn evidence (baseline 2026-09-12 "store1 = SDK v1" vs portal API `sdk_version=2` cho cả 2 instance + storefront runtime re-check 2026-09-21 cho thấy cả 2 store serve `app-v2.js`). Đọc đầy đủ 3 phía ở `open-questions.md` OQ-sdk-001 (conflict_group `CFL-004`) **trước khi** dùng bất kỳ capability/check phân biệt v1/v2 theo store làm oracle.

---

## storefront-buyer-facing

**Goal:** Buyer/guest xem và tương tác với sản phẩm của 1 campaign đã publish trên storefront — vượt password-gate, xem trang sản phẩm, personalize (kể cả draft cá nhân hoá đệm tạm ở client), preview mockup, add-to-cart, cart.

**Entry points:**
- `linh-explorer.myshopify.com` (store1) / `linh-explorer-2.myshopify.com` (store2) → `/password` → route sản phẩm campaign 2595 (cần `TIB_STORE_PASSWORD` hợp lệ)
- URL sản phẩm thật đã publish (xác nhận qua href DOM + GraphQL `campaign_instances.handle/platform_linked_id`)
- `GET /api/merchant/campaigns/{platformProductId}.json` — bootstrap config cá nhân hoá, **public, không cần auth**

**Capabilities:**
1. Vượt password-gate, xem trang sản phẩm đã publish (cả 2 store)
2. Personalization: chọn variant + dependency 2 cấp, radiogroup lồng ~10 clipart (quan sát 2026-09-12 trên store1, nhãn SDK v1 — xem OQ-sdk-001)
3. Personalization: cặp cha-con là 1 đơn vị required duy nhất, grid ~9 clipart (store2, nhãn SDK v2)
4. Client-side draft persistence qua localStorage (`teeinblue-customizations`, `teeinblue-global-options`) — **capability hiếm KHÔNG tách v1/v2**, hành vi/shape giống hệt nhau ở cả 2 store; ghi đồng bộ khi click (radio/clipart), chỉ ghi khi blur (field text)
5. grouped_clipart cần đủ 2 bước (radio nhóm + click thumbnail con) mới thực sự hợp lệ (store2/SDK v2) — thiếu bước con làm ATC fail thật, ZERO request tới `POST /api/merchant/shopify/customization` (chặn client-side)
6. Artwork preview: lightbox mockup TĨNH (nhãn SDK v1) vs SVG sống map theo layer-id (nhãn SDK v2) — 2 cơ chế hoàn toàn khác nhau
7. Pricing display: giá theo variant cập nhật đúng; giá ATC khớp hiển thị, tăng tuyến tính theo quantity (store2, 1 sample)
8. Add-to-cart trên store1 — **CHƯA xác nhận hoàn tất**: banner lỗi + 0 network request, tái hiện với 2 template (conflict `CFL-001`, OQ-sdk-008)
9. Add-to-cart trên store2 — hoàn tất thành công toàn trình, NHƯNG lần thử đầu tiên fail thật do thiếu click con grouped_clipart (conflict `CFL-003`, OQ-sdk-010)
10. Post-ATC persistence: localStorage giữ nguyên byte-identical sau ATC thành công lẫn sau clear cart (chỉ xác nhận trên store2)
11. Server sync tại ATC: `POST /api/merchant/shopify/customization` chỉ fire đúng lúc ATC (store2), absent khi ATC fail do validation client-side
12. Cart handoff/line-item: chỉ có property nội bộ `_`-prefix, không tìm thấy "edit personalization từ cart" (chỉ store2 — store1 chưa từng chạm network layer)
13. Multi-store publish pre-flight check: `GET /themes/app-block-enabled` trước khi cho publish (portal, owner, 1 sample thành công)
14. Publish tạo Shopify product độc lập theo từng store (`platform_linked_id` riêng biệt, xác nhận qua 2 nguồn)
15. SDK runtime re-check 2026-09-21: store2 vẫn `app-v2.js`/`tee-campaign-v2`; store1 nay cũng quan sát thấy `app-v2.js`/`tee-campaign-v2` — đối lập trực tiếp capability #2 (2026-09-12) → xem OQ-sdk-001, KHÔNG tự thay thế capability #2/#3/#6
16. Dependency mechanism trên template option 2 (campaign 2595) quan sát lại 2026-09-21 — hình thái không khớp verbatim mô tả cũ, ghi nhận riêng, chưa đối chiếu dứt khoát với capability #2/#3
17. Cơ chế artwork preview quan sát 2026-09-21: `<img>` + overlay class `tee-printarea` (KHÔNG có `[data-layer-id]` SVG) — KHÔNG khớp verbatim lightbox tĩnh (capability #6, nhãn v1) lẫn SVG sống layer-id (capability #6, nhãn v2). Đánh dấu UNKNOWN, không ép vào 1 trong 2 nhãn cũ
18. Add-to-cart bị chặn client-side khi cố tình để trống field required, quan sát ĐỐI XỨNG trên cả 2 store (0 request tới backend) — đây là KỊCH BẢN KHÁC với `CFL-001` (field để trống, không phải field đã điền đủ), KHÔNG dùng để đóng `CFL-001`
19. Re-verify identity campaign 2595/theme không đổi giữa 2 lần quan sát — loại trừ khả năng nhầm campaign/theme làm nguyên nhân của `CFL-004`

**Coverage:**
storefront guest store1 ✅ · storefront guest store2 ✅ · localStorage draft persistence (cả 2 store) ✅ · post-ATC persistence store2 ✅ / store1 ❌ · portal owner multi-store launch ✅ · api store1 ✅ · api store2 (presence/absence của endpoint customization) ✅ · full contract endpoint customization (body/auth/error-path) ❌ · **data layer ❌ (toàn bộ)** · template 1 & 3 (cả 2 store, kể cả 2-step grouped_clipart) ❌ · field-remount pre-fill cho radio/clipart ❌ (chỉ xác nhận field text, 1 sample) · TTL/expiry localStorage ❌ · buyer logged-in ❌ · non-US market/locale/currency ❌ · mobile/tablet viewport ❌ · edit-from-cart ❌

**Confidence:** MEDIUM

**Risks/Unknowns:**
- **(P1) `CFL-001` UNRESOLVED (OQ-sdk-008)** — add-to-cart trên store1 CHƯA rõ hoạt động hay không: evidence automation HIGH-weight (0 network request, tái hiện 2 template) mâu thuẫn lời khai manual-test LOW-weight của user (không có evidence file).
- **(P1) `CFL-003` UNRESOLVED (OQ-sdk-010)** — lần ATC đầu tiên trên store2 fail thật (thiếu click con grouped_clipart), mâu thuẫn framing "ATC store2 đã known-working" kế thừa từ lần quan sát trước; 2 khả năng đều INFERRED, chưa kết luận.
- `CFL-002` UNRESOLVED (OQ-sdk-009) — nhãn heading cha "dog" vs field con "cat" (store2) không khớp, chưa rõ lỗi copy hay quy ước nội bộ.
- Endpoint bootstrap config cá nhân hoá không yêu cầu authorization — public data exposure tiềm ẩn, chưa khẳng định là defect.
- TTL/expiry thật của localStorage draft, hành vi group-click-alone (chỉ click radio nhóm), field-remount pre-fill cho field non-text — đều CHƯA xác định (OQ-sdk-018..020).
- Template 1/3, buyer logged-in, market/locale/currency khác, mobile/tablet viewport, "edit từ cart" — hoàn toàn chưa test.
- Toàn bộ hành vi post-ATC/server-sync/grouped_clipart-2-step trên store1 CHƯA xác nhận vì store1 chưa từng tới được bước ATC (OQ-sdk-022).

**Ràng buộc khi dùng làm oracle:**
- Checklist ATC của store2 phải tách rõ "click radio nhóm" và "click thumbnail con" thành 2 case riêng, không gộp ngầm.
- KHÔNG viết case khẳng định ATC store1 PASS/FAIL dứt khoát — chỉ "needs manual re-verification (`CFL-001`)".
- Oracle liên quan nhãn field template store2 phải ghi chú mâu thuẫn dog/cat (`CFL-002`), không chọn 1 nhãn làm chuẩn.
- Capability #2/#3/#6 và mọi check phân biệt v1/v2 theo store (CHK-002/003/004/007/011) chỉ được dùng kèm ghi chú `CFL-004`, không coi là "chân lý hiện tại".

---

**CBS-001 (TIB-5352, staging):** khi translations API timeout >5s widget hiện chữ gốc (KB-053); nhãn thiếu trong dictionary hiện chữ gốc (KB-058); fallback khi 500/503/abort, pageerror khi timeout, retry lazy và dictionary inline in 1 lần còn cần xác nhận (OQ-sdk-051..054). Chỉ kiểm bundle app-v1.js (OQ-sdk-057).

## product-page-settings-config

**Goal:** Merchant (owner) cấu hình cách Teeinblue hiển thị/vận hành trên trang sản phẩm Shopify của từng store (instance) đã kết nối — gallery/mockup, personalization form, upload photo, cross-sell, nút Preview, nút ATC + addon charge, hành vi mobile, extras, logo, và style/màu sắc — riêng biệt theo từng store, qua trang portal `/product-page-settings` (2 tab: Elements & Behaviors, Styles & Colors).

**Entry points:**
- Portal sidebar → Store Settings → Product Page Settings → `https://staging-portal.teeinblue.com/product-page-settings` (đã login, role owner, ≥1 store kết nối)
- `.user-switcher`/`.user-switcher-toggle` (sidebar) → panel "Switch to:" → chọn store khác → redirect về Home → phải tự re-navigate lại `/product-page-settings`
- Link "(Switch store?)" riêng ngay trên chính trang (heading "For store: `<store>`") — entry point thứ hai, DOM tách biệt với sidebar switcher, **chưa test riêng** hành vi click (OQ-sdk-032)

**Capabilities (67/67 control quan sát giống hệt nhau giữa store1/609 và store2/613 — bác bỏ premise "config khác nhau theo SDK v1/v2 tuỳ store"):**
1. Gallery & Mockup (tab Elements & Behaviors) — 7 control (Show Gallery & live preview, Load gallery immediately, Show only one Mockup image, Zoom gallery, Show navigation arrows, v.v.)
2. Personalization Form (tab Elements & Behaviors) — 12 control (dropdown Form type, các checkbox search/sync/auto-select/form header/date-time picker/text reposition/auto-zoom/clear-all)
3. Upload Photo (tab Elements & Behaviors) — 4 control (re-upload trong popup, photo reposition on mockup, cho phép chọn lại ảnh đã xử lý trước đó trong cửa sổ 72h, auto-zoom)
4. Cross-sell Personalization — 1 checkbox "Show Cross-sell Personalization" (unchecked mặc định, giống hệt 2 store)
5. Preview button — 4 control (show/hide, radio ảnh hiện trong popup, show close text, block preview nếu field còn trống)
6. ATC button + Addon Charge — 1 control bị hệ thống khoá: "Show addon price warning message" = checked VÀ DISABLED (không toggle được); "Show Confirmation checkbox" = unchecked cả 2 store
7. Mobile — 3 checkbox (nút Personalize trên mobile, mũi tên navigation của gallery, thumbnail của gallery trên mobile) = checked cả 3, giống hệt 2 store
8. Extras — 4 checkbox (collapse description block, skeleton loader, block inspecting clipart, load scripts ngoài trang sản phẩm) = unchecked cả 4, giống hệt 2 store
9. Upload logo — **CHƯA test** (không xác nhận được đường revert an toàn); nút hiện diện cả 2 store, không thấy logo thumbnail có sẵn
10. Theme (tab Styles & Colors) — radio "Choose a Theme:" (Classic/Modern/Dark) = "Modern" cả 2 store; "Font size:" 3 icon-only swatch, hiện diện cả 2 store, giá trị lựa chọn CHƯA đọc được
11. Personalization form styling — 9 control (3 color-picker header/form-background, toggle-style icon-swatch, radio "Thumbnails per row"=Auto, alignment icon-swatch, ...)
12. Colors — 1 ghi chú ("Some options only work with Campaigns by Product base.") + 10 color-picker (Primary color, các màu nút Preview/Personalize, ...)
13. Chuyển đổi store context/multi-store scoping toàn trang — trang tự bind theo store đang active (heading "For store: `<store>`" cập nhật đúng)
14. *(INFERRED, KHÔNG PHẢI contract đã xác nhận)* API backing qua `GET /api/instances?trashed` `.config` — trả field `sdk_version=2` cho CẢ 2 instance (609, 613); `.config` object ~27 key, tương quan tên/giá trị với một phần 67 control quan sát, CHƯA xác nhận qua code reference hay write-path
15. `GET /api/settings` fire trên trang này (config registry toàn account, ~36KB, dùng chung nhiều trang portal) nhưng CHƯA khớp field cụ thể nào với 1 trong 67 control đã quan sát — xem OQ-sdk-024

**Coverage:**
portal owner, 2 store (609/613) ✅ · UI inventory 67/67 control ✅ (giá trị hiện tại, không phải mọi state có thể) · write-path (Save/Reset) ❌ (chưa từng click) · hex color-picker values / icon-swatch selection ❌ (không đọc được qua accessibility tree) · role khác owner ❌ · template option 1/3 ❌ · entry point "(Switch store?)" trên trang ❌ · buyer-facing effect mapping cho từng control ❌

**Confidence:** MEDIUM (đa số item MEDIUM/LOW, 1 sample account-wide; capability #13 HIGH nhờ cross-check 2 lần độc lập)

**Risks/Unknowns:**
- **(P1) `CFL-004` UNRESOLVED (OQ-sdk-001)** — feature này là 1 trong 2 nguồn evidence chính của conflict SDK version (cùng storefront runtime re-check).
- **`CFL-005` UNRESOLVED (OQ-sdk-024)** — `config_registry.instance.config` (~38 key schema, `GET /api/settings`) vs `.config` thực tế (~27 key, `GET /api/instances?trashed`), chỉ 1 tên trùng ("add_design_links", bản thân cũng chưa khớp control cụ thể nào).
- Binding `.config` ↔ 67 UI control là INFERRED (tương quan tên/giá trị), KHÔNG PHẢI contract đã xác nhận qua code reference — không viết oracle "đổi checkbox X sẽ ghi đúng key Y" cho tới khi có code reference hoặc quan sát write-path (Save).
- Write-path (Save/Reset) hoàn toàn chưa có evidence (OQ-sdk-028) — mọi hành vi lưu/validate-khi-lưu đều là suy diễn.
- Giá trị hex của ~13 color-picker và lựa chọn của các icon-only swatch (Font size, Toggle style, Alignment, Field's border radius) KHÔNG đọc được qua accessibility tree (OQ-sdk-026) — chỉ xác nhận sự hiện diện/cấu trúc.
- Chỉ 1 role (owner) được test — biến thiên permission/role trên trang này hoàn toàn chưa quan sát (OQ-sdk-029).

**Ràng buộc khi dùng làm oracle:** `CFL-004`/`CFL-005` giữ UNRESOLVED, không chọn phía; capability #14 giữ nhãn INFERRED, không trình bày như data contract; không viết oracle "giá trị hex/icon-swatch phải là X" cho tới khi đọc được giá trị thật.

---

## genai-personalization-runtime

**Goal:** Buyer upload ảnh (Multiple Uploads) hoặc nhập prompt (Text to Image AI) trên layer GenAI của artwork, bấm Generate, và nhận ảnh do 3rd-party GenAI (Gemini/OpenAI/Flux/ImagenHub) sinh ra — companion 1-1 với feature `layer-config-image` của object `artwork` (nơi seller cấu hình các field này).

**Entry points:**
- Widget personalization trên storefront PDP thật (CHƯA test được — xem caveat) tại layer Multiple Uploads / Text to Image (AI)
- Artwork Editor's "Live preview" toggle (staff-authenticated) — surface đã dùng làm proxy cho buyer

**Capabilities:**
1. Async job + polling dùng chung giữa Multiple Uploads (`POST .../customer-uploads/generate-from-multiple-images`) và Text to Image (`POST .../customer-uploads/generate`, số ít) — cả 2 trả 202 + job id, client poll `GET .../customer-uploads/{id}/image-filter-effects/status` tới khi status=2 (KB-045)
2. Minimum-filesize validation server-side (10000 byte) SAU KHI client tự re-encode ảnh — có thể đẩy 1 ảnh gốc hợp lệ (vd 17217 byte) xuống dưới ngưỡng (9598 byte) và bị 422; route fallback multipart `/photo-upload` cũng tồn tại và tự động thử khi presigned-URL lỗi, nhưng cả 2 route đều fail cùng lý do nên CHƯA so sánh được downstream generate là sync hay async khi fallback THÀNH CÔNG (KB-046, OQ-sdk-035)
3. "Select a previously generated image" xuất hiện SAU generate thành công đầu tiên, không có trước đó — cả 2 layer type (KB-047)
4. Ngưỡng enable nút Generate của Multiple Uploads nghi ngờ ≥2 ảnh (1 sample, chưa xác nhận là ngưỡng thật hay render-lag) (KB-048)
5. **[MỚI, CCR CBS-005/TIB-5460]** Rate-limit buyer-facing theo visitor/thumbmark cho upload dùng AI effect (Remove Background/AI Enhance/Image Filter/Text-to-Image) — plain upload không giới hạn. Default 5 upload/window/visitor; window staging=5', production=1h; thumbmark cache localStorage key `teeinblue_signed_thumbmark`, không expiry. Nguồn: Dev confirm nguyên văn (Jira TIB-5460, comment 51220, huyenntk, 2026-09-17) — **CHƯA re-verify độc lập qua storefront/API**, giữ `OBSERVED_CURRENT` (KB-051, OQ-sdk-044..049 xem chi tiết dưới)
6. **[MỚI, CCR CBS-005/TIB-5460, PENDING RE-VERIFY]** Bug root-cause (KB-049, CHƯA reproduce độc lập): fallback ID sinh từ device-info có thể collide giữa visitor cùng thiết bị/khu vực, share chung quota, block ngay lần upload đầu. Fix 3 phần (KB-050 — fallback random-per-browser, fetch-thumbmark sớm, retry non-429) **ĐANG QA Review, CHƯA SHIP** (0/13 Testlane task TIB-116 đã chạy tại 2026-09-28) — KHÔNG coi là hành vi hiện hành cho tới khi ship + re-verify.

**Coverage:** async generate mechanism (Gemini, cả 2 layer type) ✅ · minimum-filesize business rule ✅ (1 sample) · route fallback multipart existence ✅ · route fallback SUCCESS path ❌ · resize/crop order khi minimum-resolution bật ❌ · "Duplicate & Share" ❌ (không tìm thấy, cả portal lẫn widget) · add-to-cart/cart/checkout-boundary ❌ (không chạm tới được) · OpenAI/Flux/ImagenHub ❌ (chỉ test Gemini) · guest buyer session thật ❌ · rate-limit/thumbmark cấu hình hiện tại ❌ (chưa re-verify độc lập, chỉ Dev comment) · fix TIB-5460 ❌ (chưa ship, chưa test)

**Confidence:** LOW-MEDIUM (đa số quan sát 1-2 lần, single session; phần rate-limit/thumbmark LOW, single-source Jira/Dev comment)

**Risks/Unknowns:**
- Toàn bộ evidence từ Live Preview widget (staff-authenticated proxy cho buyer), KHÔNG PHẢI guest session thật trên storefront công khai (OQ-sdk-039) — cần re-verify trên PDP thật.
- Thứ tự resize/crop khi minimum-resolution bật HOÀN TOÀN CHƯA TEST (OQ-sdk-041).
- Route fallback THÀNH CÔNG thay đổi sync/async ra sao KHÔNG xác định được — chỉ xác nhận route fallback tồn tại (OQ-sdk-035).
- "Duplicate & Share" không tìm thấy độc lập ở cả portal editor lẫn widget này — có thể chưa tồn tại trong build hiện tại, hoặc gated bởi điều kiện chưa trigger (OQ-sdk-037).
- Add-to-cart/cart/checkout-boundary hoàn toàn chưa quan sát được (OQ-sdk-042).
- **[MỚI]** Rate-limit/thumbmark (KB-051) chỉ có 1 nguồn — Dev comment Jira, CHƯA re-verify độc lập; vai trò kỹ thuật (dev/PM) của người xác nhận không rõ (OQ-sdk-044).
- **[MỚI, PENDING RE-VERIFY]** Fix TIB-5460 (KB-050) CHƯA SHIP — 0/13 Testlane test case đã chạy; TUYỆT ĐỐI không dùng làm oracle cho tới khi ship + re-verify (OQ-sdk-045..048).
- **[MỚI]** Follow-up rate-limit theo IP cho endpoint issuance thumbmark — chưa có ticket con Jira, dev tự cảnh báo (OQ-sdk-049).

**Ràng buộc khi dùng làm oracle:** mọi capability giữ `knowledge_kind: OBSERVED_CURRENT`, KHÔNG nâng `CONFIRMED_EXPECTED` (ticket Jira không phải authority); KHÔNG viết oracle khẳng định route fallback là sync hay async cho tới khi quan sát được 1 lần fallback THÀNH CÔNG; phải đọc kèm companion feature `layer-config-image` của object `artwork` khi dựng test case. **KB-051 (rate-limit/thumbmark) và KB-049/050 (bug/fix TIB-5460) giữ nguyên `OBSERVED_CURRENT`/`PROPOSED` — KHÔNG nâng `CONFIRMED_EXPECTED` dù có Dev confirm nguyên văn, cho tới khi TIB-5460 ship VÀ ≥1/13 test case Testlane TIB-116 PASS đúng hành vi tương ứng.**

---

## Gaps ở cấp Object (áp dụng cho toàn bộ object `sdk`)

| Gap | Ghi chú |
|---|---|
| **Phạm vi object chưa chắc đủ** (OQ-sdk-002) | Chỉ 3 feature được profile hoá; không rõ SDK còn bề mặt nào khác chưa vào scope — cần qa-context-scope-planner xác nhận. |
| **Data layer (DB)** (OQ-sdk-003) | NOT_OBSERVED hoàn toàn — mọi state chỉ dựa trên response API/localStorage/DOM. |
| **(P1) `CFL-004` UNRESOLVED** (OQ-sdk-001) | Baseline 2026-09-12 (store1=v1) mâu thuẫn evidence 2026-09-21 (portal API + storefront runtime cho thấy cả 2 store đều v2). Implicate trực tiếp KB-004/005/007/010/011. Cần evidence độc lập (deploy log, re-run cách vài ngày) trước khi resolve. |
| **`CFL-005` UNRESOLVED** (OQ-sdk-024) | `config_registry` schema (~38 key) vs `.config` thực tế (~27 key) gần như không trùng nhau — cần code-config-explorer. |
| **`CFL-003` UNRESOLVED** (OQ-sdk-010) | Grouped_clipart 2-step KHÔNG được diễn giải là xác nhận hay phủ nhận baseline "ATC store2 works". |
| **Post-ATC persistence & server sync lúc ATC** (OQ-sdk-022) | Chỉ xác nhận trên store2 — store1 chưa từng tới ATC trong bất kỳ lần khám phá nào. |
| **TTL/expiry localStorage** (OQ-sdk-018) | Vẫn NOT_OBSERVED. |
| **Template coverage** (OQ-sdk-006) | Dependency 2 cấp & 2-step grouped_clipart chỉ dựa trên template 1-2; template 3 hoàn toàn chưa test, kể cả cho trang `/product-page-settings`. |
| **Biến thiên phổ biến chưa test** (OQ-sdk-005) | buyer logged-in, market/locale/currency ngoài US-default, mobile/tablet viewport, role portal khác owner — 0% coverage. |
| **Chỉ 1 campaign làm nguồn** (OQ-sdk-004) | Toàn bộ evidence buyer-facing từ campaign 2595 (by product base); flow by-shopify chưa test chéo. |
| **Contract endpoint customization** (OQ-sdk-021) | Chỉ quan sát presence/absence lúc ATC; full request/response body, auth, error-path chưa test. |
| **Write-path `/product-page-settings`** (OQ-sdk-028) | Chưa từng click Save/Reset — mọi hành vi lưu/validate-khi-lưu là suy diễn. |
| **Hex/icon-swatch values** (OQ-sdk-026) | ~13 color-picker + 4 nhóm icon-swatch không đọc được giá trị cụ thể qua accessibility tree. |
| **GenAI: guest session thật** (OQ-sdk-039) | Toàn bộ evidence qua Live Preview widget staff-authenticated, KHÔNG PHẢI guest buyer thật trên PDP công khai. |
| **GenAI: add-to-cart/checkout** (OQ-sdk-042) | Hoàn toàn không chạm tới được — Live Preview không có product/campaign/cart context. |
| **Companion conflict ở object khác** (OQ-sdk-007) | Feature companion `layer-config-image` bên object `artwork` đang có 1 conflict UNRESOLVED cần authority quyết định — nêu để downstream đọc `genai-personalization-runtime` biết. |

**Trạng thái tổng quát:** object `sdk` có 3 feature nhưng vẫn ở giai đoạn coverage sớm — 5 conflict UNRESOLVED (nổi bật là `CFL-004`, implicate trực tiếp dữ liệu v1/v2 đã dùng và trụ cột add-to-cart), toàn bộ data layer, write-path config, guest session thật cho luồng GenAI, và nhiều biến thiên phổ biến (device, locale, logged-in, role) chưa được chạm tới. Danh sách đầy đủ 43 open question ở `open-questions.md`.
