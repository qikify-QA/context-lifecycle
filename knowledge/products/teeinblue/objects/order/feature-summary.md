# Object: Order (product: teeinblue) — Feature Profile Summary

- **Published context version:** 1 (bootstrap, `CTX-20260913-01`, observed & published 2026-09-13, env: staging)
- **Mode:** ZERO_DOC_BOOTSTRAP — toàn bộ profile là OBSERVED_CURRENT (0 CONFIRMED_EXPECTED, không có nguồn thẩm quyền spec/PO/ticket)
- **Actor test trong toàn bộ run:** storefront = GUEST buyer (chưa test signed-in); portal = owner (Linh explorer, sub=273) — chưa test role non-owner/restricted
- **Store authoritative cho version này: `linh-explorer-2.myshopify.com`** — KHÔNG PHẢI `linh-explorer.myshopify.com` như bootstrap-request.json ban đầu nêu (TIB_STORE_URL_1). Quyết định của orchestrator tại thời điểm publish: store1 có lỗi add-to-cart không bao giờ hoàn tất cho cùng campaign 2595 (ghi nhận ở run trước `CTX-20260912-03`), nên không thể đặt order thật ở đó với evidence hiện có; store2 hoàn tất thành công toàn bộ flow 2 lần trong run này. Xem `kb.json#payload.orchestrator_publish_notes`.
- **2/2 feature đã có profile** (FEAT-ORDER-01, FEAT-ORDER-PORTAL-01). Không feature nào bị chặn hoàn toàn.
- **24 KB candidate nguồn** (`kb.json`, KB-001..KB-024): 0 HIGH, 3 MEDIUM (corroborated bằng 1 run trước trên store khác), 21 LOW — toàn bộ dựa trên **đúng 1 order** (portal #1002 / id 4322) end-to-end, cộng 1 order thứ hai (JTEL87JY0) chỉ dùng để minh hoạ conflict sync.
- **1 conflict UNRESOLVED xuyên suốt mọi layer:** `KB-CONFLICT-001` — order JTEL87JY0 đặt thành công ở storefront nhưng không bao giờ sync vào portal Orders (>90 phút, 30 ngày, mọi status, cả 2 store); order thứ hai sync thành công sau khi user tự nhận đã sửa webhook config — **claim đó chưa được verify độc lập**, không được ghi là fact đã fix ở bất kỳ đâu.

---

## FEAT-ORDER-01 — Place personalized order from storefront
**Goal:** Buyer (GUEST) chọn personalization cho một sản phẩm, add to cart, và hoàn tất checkout để tạo order.
**Entry point:** Trang sản phẩm campaign "QA Explore Campaign PB 01" (campaign 2595) trên `linh-explorer-2.myshopify.com`

**Capabilities:**
1. Chọn personalize template → hiện 7 trường phụ thuộc bắt buộc (Skin Tone auto-default, Hairstyle 2 cấp, Woman Name text ≤10 ký tự, Cat Breed #1/#2 2 cấp, Cat Name #1/#2 text ≤10 ký tự)
2. Điền trường → counter ký tự cập nhật đúng, mockup preview cập nhật live
3. Add to cart → đúng 1 line item, cart/checkout chỉ hiển thị personalization qua mockup image, không có field=value text
4. Checkout: "Test Payment Gateway" (card 1/2/3 = approved/declined/gateway-failure) tồn tại song song real gateway; Standard shipping $8.00 hoàn tất → Subtotal $55.99 + Shipping $8.00 = Total $63.99, không tax cho địa chỉ US/NY này
5. Order confirmation hiển thị đầy đủ confirmation number, contact/shipping/billing/payment (masked), cost breakdown
6. Order hoàn tất ở storefront **có thể** xuất hiện trong portal Orders — nhưng KHÔNG đảm bảo (xem risk)

**Coverage:** storefront (product page → confirmation, 1 combo) ✅ · api (POST /cart/add) ⚠️ INFERRED-only, file capture thiếu · portal (order xuất hiện sau sync) ✅ (1/2 order) · signed-in buyer ❌ · Express shipping hoàn tất ❌ · declined/gateway-failure payment ❌ · missing-required-field submission ❌ · exact 10-char boundary ❌ · cart reload persistence ❌ · multi-item order ❌
**Confidence:** LOW (hầu hết KB item), 3 item MEDIUM nhờ corroborate với run `CTX-20260912-03` (store khác)
**Risks/Unknowns:**
- **KB-CONFLICT-001**: order sync từ storefront vào portal không đáng tin cậy — 1/2 order test không bao giờ sync; root cause (claim webhook config) chưa verify độc lập
- POST /cart/add request/response mechanics là INFERRED, không có raw payload (file capture bị thiếu trên đĩa)
- Express shipping price ($15.00) là INFERRED, chưa từng hoàn tất path này
- Không có error path (4xx/5xx, declined card, missing field) nào được quan sát trong run này
- Mọi finding pricing/field-dependency chỉ dựa 1-2 sample, không được suy rộng thành rule chung

**Gate:** CONDITIONAL_PASS (KB-CONFLICT-001 phải giữ UNRESOLVED; KB-006/KB-009 giữ INFERRED, không nâng cấp)

---

## FEAT-ORDER-PORTAL-01 — Review and initiate fulfillment for an incoming order
**Goal:** Merchant (owner) xem lại order đã sync (line item, campaign/variant, customization/design, customer/shipping/billing, status) và khởi tạo bước gửi fulfillment.
**Entry point:** portal Orders list → order-details → nút "Confirm & Send to fulfill" (KHÔNG có route `/fulfills` riêng biệt)

**Capabilities:**
1. Orders list: filter mặc định (date range, Store=Any, TIB Status=Any), backed bởi `GET /api/orders?by_teeinblue=1`; search theo internal order name (`#1002`) hoạt động, search theo Shopify confirmation code (`JTEL87JY0`) KHÔNG match dù order đã sync — 2 namespace khác nhau
2. Order-details: header `#1002 (#-4322)`, badge tib_status `ready` = API integer `6` (chỉ 1 cặp giá trị từng quan sát); order-item card có status badge RIÊNG, Shopify SKU khác Fulfilled SKU, Customization block, Designs (mockup + printarea 3600x5400px)
3. Item Activity Logs: 4 sự kiện tự động (created → generating design → design generated → Ready to fulfill) trong ~22 giây, KHÔNG cần thao tác merchant
4. "Confirm & Send to fulfill" **trên instance CHƯA connect POD (Printify)**: mở dialog review (không submit ngay), hiện prompt "Connect", chỉ 2 GraphQL query READ-ONLY chạy quanh click — KHÔNG có mutation/network call ra POD nào. **Phát hiện này CHỈ áp dụng cho trạng thái POD chưa connect** — nhánh đã connect hoàn toàn chưa quan sát
5. "Change status" dropdown hiện đúng 5 option (Ready/Sent/Fulfilled/Paused/Canceled) — chỉ quan sát danh sách, chưa test transition nào

**Coverage:** portal (orders list, order-details, activity log, fulfill dialog POD-disconnected, change-status list) ✅ · fulfill với POD ĐÃ connect ❌ (unknown lớn nhất, rủi ro production thật) · change-status transition thực thi ❌ · Bulk Fulfill page ❌ (tồn tại ở sidebar, chưa mở) · non-owner/restricted role ❌ · DB cross-check ❌ (db_observation disabled) · Edit/View customization ❌ · multi-item order ❌
**Confidence:** LOW toàn bộ (1 order, 1 line item, 1 role, 1 environment)
**Risks/Unknowns:**
- **KB-CONFLICT-001** (merchant-facing risk): order có thể silently không xuất hiện trong portal — feature này giả định order đã visible, nhưng precondition đó không được đảm bảo
- "Confirm & Send to fulfill" khi POD ĐÃ connect: hoàn toàn unknown, có thể có mutation/side-effect thật (rủi ro production) — đây là gap an toàn lớn nhất của object này
- "Change status" transition, "Bulk Fulfill": chưa test, side effect (notification, POD call) hoàn toàn unknown
- tib_status chỉ có 1 cặp giá trị quan sát (ready/6) — không suy enum đầy đủ
- 3/5 network entry quanh action fulfill-click chưa xác định được (network_entry_labels claim 5, capture file chỉ có 4)
- Không có permission boundary nào được test (chỉ owner sub=273)

**Gate:** CONDITIONAL_PASS (KB-022 phải giữ scope POD-disconnected; KB-CONFLICT-001 giữ UNRESOLVED)

---

## Gaps ở cấp Object (áp dụng cho MỌI feature trên)

| Gap | Ghi chú |
|---|---|
| **Store scope** | Run này chạy trên `linh-explorer-2.myshopify.com`, KHÔNG phải `linh-explorer.myshopify.com` như bootstrap-request.json ban đầu — quyết định orchestrator, xem `kb.json#payload.orchestrator_publish_notes`. Store1 cần điều tra riêng lỗi add-to-cart trước khi mở rộng KB này sang đó. |
| **KB-CONFLICT-001 (order sync)** | UNRESOLVED, ảnh hưởng cả 2 feature — entry point của FEAT-ORDER-PORTAL-01 phụ thuộc vào bước sync không đáng tin cậy của FEAT-ORDER-01. Claim "đã fix webhook" của user CHƯA được verify độc lập bởi bất kỳ exploration nào. |
| **POD-connected fulfill branch** | Hoàn toàn chưa quan sát — đây là rủi ro an toàn/production lớn nhất trong toàn bộ object; KB-022/CHK-P10 tuyệt đối không được suy rộng sang nhánh này (xem CHK-P16, oracle_strength NONE). |
| **Data layer (DB) thật** | `db_observation.enabled=false` trong bootstrap-request.json — không có `ent_ids`/DB evidence nào trong toàn bộ KB. |
| **Code-level facts** | code-config-explorer không chạy trong run này — code = NOT_OBSERVED cho cả 2 feature. |
| **2 file network capture bị thiếu trên đĩa** | `raw/network/ACT-101-004.json` (POST /cart/add) và `raw/portal/network/orders-get-4322.json` (GraphQL orders_by_pk) được reference nhưng không tồn tại — các KB item liên quan (KB-006, KB-016, KB-018) giữ LOW/INFERRED, không nâng cấp. |
| **RBAC / non-owner / signed-in buyer** | Chưa test trên bất kỳ feature nào — storefront chỉ GUEST, portal chỉ owner (sub=273). |
| **'portal/fulfills' route & 'Bulk Fulfill'** | Không có route `/fulfills` riêng biệt được tìm thấy; "Bulk Fulfill" tồn tại ở sidebar flyout nhưng chưa mở — hành vi hoàn toàn unknown, không suy đoán từ flow order-details. |
| **Checklist confidence nguồn** | 24 KB candidate: 0 HIGH, 3 MEDIUM, 21 LOW — theo contract "một sample → luôn LOW", không dùng làm hard assertion. 33 check trong 2 checklist, 13/33 là NEEDS_CONFIRMATION. |

**Review độc lập:** context-quality-reviewer → verdict `APPROVED_WITH_CONDITIONS`, `publish_allowed: true`. 3 finding không-blocking: F1/F2 (portal-explorer, structural/network-labeling gap, routed cho lần chạy sau) và F3 (run-manifest.json bị stale, đã reconcile trước publish). Không có illegal knowledge_kind upgrade, không có secret/PII lọt vào evidence.
