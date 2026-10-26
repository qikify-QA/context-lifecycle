# Object: Order (product: teeinblue) — Feature Profile Summary
**Published context version:** 2
- **Context version:** 2 (published 2026-10-11, env: staging; v1 2026-09-13)
- **Mode:** bootstrap + CCR (CBS-002) — knowledge is `OBSERVED_CURRENT`, plus 6 `INFERRED` items in `open-api-replace-order-item-design` (0 `CONFIRMED_EXPECTED`; the CBS-002 dev writeup is not an authority source under teeinblue policy)
- **Actor coverage:** storefront = GUEST buyer only (no signed-in buyer tested); portal = owner (Linh explorer, sub=273) only (no non-owner/restricted role tested)
- **Authoritative store: `linh-explorer-2.myshopify.com`** — NOT `linh-explorer.myshopify.com`. The latter has a known add-to-cart failure for this campaign that prevents completing a real order there; this KB should not be treated as verified for that store until its add-to-cart issue is investigated separately (see `OQ-order-013`).
- **3 features:** `place-personalized-order-storefront`, `review-and-initiate-fulfillment-portal`, `open-api-replace-order-item-design` (CBS-002). None is fully blocked.
- **37 KB items** across the object. The 24 bootstrap items: 0 HIGH confidence, 3 MEDIUM (corroborated by a separate prior observation on a different store), 21 LOW — all resting on exactly ONE order end-to-end (plus a second order used only to illustrate the sync conflict below). The 13 CBS-002 items (Open API replace design): 7 MEDIUM `OBSERVED_CURRENT`, 6 LOW `INFERRED`.
- **1 unresolved conflict spanning both features:** `OQ-order-001` — an order placed successfully at storefront checkout did not appear in the portal Orders list for 90+ minutes across all statuses/stores/a 30-day range; a second order did sync after an unverified user claim that a webhook configuration issue had been fixed. That claim has never been independently verified.

---

## place-personalized-order-storefront — Place personalized order from storefront
**Goal:** Buyer (GUEST) chọn personalization cho một sản phẩm, add to cart, và hoàn tất checkout để tạo order.
**Entry point:** Trang sản phẩm campaign "QA Explore Campaign PB 01" (campaign 2595) trên `linh-explorer-2.myshopify.com`

**Capabilities:**
1. Chọn personalize template → hiện 7 trường phụ thuộc bắt buộc (Skin Tone auto-default, Hairstyle 2 cấp, Woman Name text ≤10 ký tự, Cat Breed #1/#2 2 cấp, Cat Name #1/#2 text ≤10 ký tự)
2. Điền trường → counter ký tự cập nhật đúng, mockup preview cập nhật live
3. Add to cart → đúng 1 line item, cart/checkout chỉ hiển thị personalization qua mockup image, không có field=value text
4. Checkout: "Test Payment Gateway" (card 1/2/3 = approved/declined/gateway-failure) tồn tại song song real gateway; Standard shipping $8.00 hoàn tất → Subtotal $55.99 + Shipping $8.00 = Total $63.99, không tax cho địa chỉ US/NY này
5. Order confirmation hiển thị đầy đủ confirmation number, contact/shipping/billing/payment (masked), cost breakdown
6. Order hoàn tất ở storefront **có thể** xuất hiện trong portal Orders — nhưng KHÔNG đảm bảo (xem risk)

**Coverage:** storefront (product page → confirmation, 1 combo) ✅ · api (POST /cart/add) ⚠️ INFERRED-only, chưa có raw payload · portal (order xuất hiện sau sync) ✅ (1/2 order) · signed-in buyer ❌ · Express shipping hoàn tất ❌ · declined/gateway-failure payment ❌ · missing-required-field submission ❌ · exact 10-char boundary ❌ · cart reload persistence ❌ · multi-item order ❌
**Confidence:** LOW (hầu hết KB item), 3 item MEDIUM nhờ corroborate với một quan sát trước đó (store khác)
**Risks/Unknowns:**
- **OQ-order-001**: order sync từ storefront vào portal không đáng tin cậy — 1/2 order test không bao giờ sync; root cause (claim webhook config) chưa verify độc lập
- POST /cart/add request/response mechanics là INFERRED, không có raw payload
- Express shipping price ($15.00) là INFERRED, chưa từng hoàn tất path này
- Không có error path (4xx/5xx, declined card, missing field) nào được quan sát trong lần khám phá này (xem `OQ-order-002`, `OQ-order-003`)
- Mọi finding pricing/field-dependency chỉ dựa 1-2 sample, không được suy rộng thành rule chung

**Gate:** publish này giữ điều kiện — `OQ-order-001` phải giữ UNRESOLVED; KB-006/KB-009 giữ INFERRED, không nâng cấp

---

## review-and-initiate-fulfillment-portal — Review and initiate fulfillment for an incoming order
**Goal:** Merchant (owner) xem lại order đã sync (line item, campaign/variant, customization/design, customer/shipping/billing, status) và khởi tạo bước gửi fulfillment.
**Entry point:** portal Orders list → order-details → nút "Confirm & Send to fulfill" (KHÔNG có route `/fulfills` riêng biệt)

**Capabilities:**
1. Orders list: filter mặc định (date range, Store=Any, TIB Status=Any), backed bởi `GET /api/orders?by_teeinblue=1`; search theo internal order name (`#1002`) hoạt động, search theo Shopify confirmation code (`JTEL87JY0`) KHÔNG match dù order đã sync — 2 namespace khác nhau
2. Order-details: header `#1002 (#-4322)`, badge tib_status `ready` = API integer `6` (chỉ 1 cặp giá trị từng quan sát); order-item card có status badge RIÊNG, Shopify SKU khác Fulfilled SKU, Customization block, Designs (mockup + printarea 3600x5400px)
3. Item Activity Logs: 4 sự kiện tự động (created → generating design → design generated → Ready to fulfill) trong ~22 giây, KHÔNG cần thao tác merchant
4. "Confirm & Send to fulfill" **trên instance CHƯA connect POD (Printify)**: mở dialog review (không submit ngay), hiện prompt "Connect", chỉ 2 GraphQL query READ-ONLY chạy quanh click — KHÔNG có mutation/network call ra POD nào. **Phát hiện này CHỈ áp dụng cho trạng thái POD chưa connect** — nhánh đã connect hoàn toàn chưa quan sát (xem `OQ-order-012`)
5. "Change status" dropdown hiện đúng 5 option (Ready/Sent/Fulfilled/Paused/Canceled) — chỉ quan sát danh sách, chưa test transition nào (xem `OQ-order-016`)

**Coverage:** portal (orders list, order-details, activity log, fulfill dialog POD-disconnected, change-status list) ✅ · fulfill với POD ĐÃ connect ❌ (unknown lớn nhất, rủi ro production thật) · change-status transition thực thi ❌ · Bulk Fulfill page ❌ (tồn tại ở sidebar, chưa mở) · non-owner/restricted role ❌ · DB cross-check ❌ (database observation bị tắt) · Edit/View customization ❌ · multi-item order ❌
**Confidence:** LOW toàn bộ (1 order, 1 line item, 1 role, 1 environment)
**Risks/Unknowns:**
- **OQ-order-001** (merchant-facing risk): order có thể silently không xuất hiện trong portal — feature này giả định order đã visible, nhưng precondition đó không được đảm bảo
- "Confirm & Send to fulfill" khi POD ĐÃ connect: hoàn toàn unknown, có thể có mutation/side-effect thật (rủi ro production) — đây là gap an toàn lớn nhất của object này (`OQ-order-012`)
- "Change status" transition, "Bulk Fulfill": chưa test, side effect (notification, POD call) hoàn toàn unknown (`OQ-order-016`, `OQ-order-017`)
- tib_status chỉ có 1 cặp giá trị quan sát (ready/6) — không suy enum đầy đủ (`OQ-order-014`)
- 3/5 network entry quanh action fulfill-click chưa xác định được
- Không có permission boundary nào được test (chỉ owner sub=273) (`OQ-order-009`)

**Gate:** publish này giữ điều kiện — KB-022 phải giữ scope POD-disconnected; `OQ-order-001` giữ UNRESOLVED

---

## open-api-replace-order-item-design — Open API: replace design của order item
**Goal:** Integration server-to-server thay printfile của một order item đang READY, không phải thao tác tay trên Portal.
**Entry point:** `POST openapi/v1/order-item-artworks/{order_item_artwork_id}/design` (token có ability `orders:write`); lấy id qua `GET openapi/v1/orders/{order_id}` → `line_items[].print_areas[].id`.
**Trạng thái:** chỉ có trên staging (TIB-5506, QA Review), chưa lên production. Toàn bộ là `OBSERVED_CURRENT`/`INFERRED` — nguồn là dev doc, bị hạ kind theo chính sách product; chưa dùng làm expected result.

**Capabilities:**
1. Tìm `order_item_artwork_id` từ GET order (KB-036; việc id này chính là `order_item_artwork_id` mới là suy luận — KB-037)
2. Replace file tại chỗ, giữ nguyên artwork_id/customization_id/printarea_id; chỉ Replace, không Add new design (KB-025, KB-026, KB-030)
3. Chặn request không hợp lệ: 404 khi artwork không tồn tại/khác account, 422 khi item không READY (status 2) hoặc thiếu cả file lẫn url (KB-027..029)

**Coverage:** api ✅ (staging) · portal sau khi replace ❌ · production ❌ · file validation / URL fetch / gửi cả file lẫn url ❌ (OQ-order-022..024)
**Checklist:** 27 check — 8 BASELINE, 19 NEEDS_CONFIRMATION. **Cần PO quyết:** KB-025, KB-028 (permission), KB-026, KB-033 (mất dữ liệu khi ghi đè file).

---

## Gaps ở cấp Object (áp dụng cho MỌI feature trên)

| Gap | Ghi chú |
|---|---|
| **Store scope** | Authoritative store cho context version này là `linh-explorer-2.myshopify.com`, KHÔNG PHẢI `linh-explorer.myshopify.com` — xem `OQ-order-013`. Store `linh-explorer.myshopify.com` cần điều tra riêng lỗi add-to-cart trước khi mở rộng KB này sang đó. |
| **OQ-order-001 (order sync)** | UNRESOLVED, ảnh hưởng cả 2 feature — entry point của review-and-initiate-fulfillment-portal phụ thuộc vào bước sync không đáng tin cậy của place-personalized-order-storefront. Claim "đã fix webhook" của user CHƯA được verify độc lập bởi bất kỳ exploration nào. |
| **POD-connected fulfill branch** | Hoàn toàn chưa quan sát — đây là rủi ro an toàn/production lớn nhất trong toàn bộ object (`OQ-order-012`); không được suy rộng từ nhánh POD-disconnected đã quan sát. |
| **Data layer (DB) thật** | Database observation bị tắt cho lần khám phá này — không có bằng chứng DB nào trong toàn bộ KB (`OQ-order-010`). |
| **Code-level facts** | Không có exploration ở tầng code trong lần khám phá này — code = NOT_OBSERVED cho cả 2 feature. |
| **Raw API/network payload** | Payload thô của POST /cart/add và của order-details GraphQL/REST chưa từng được capture — các KB item liên quan giữ LOW/INFERRED, không nâng cấp (`OQ-order-008`, `OQ-order-015`). |
| **RBAC / non-owner / signed-in buyer** | Chưa test trên bất kỳ feature nào — storefront chỉ GUEST, portal chỉ owner (sub=273) (`OQ-order-006`, `OQ-order-009`). |
| **'portal/fulfills' route & 'Bulk Fulfill'** | Không có route `/fulfills` riêng biệt được tìm thấy; "Bulk Fulfill" tồn tại ở sidebar flyout nhưng chưa mở — hành vi hoàn toàn unknown, không suy đoán từ flow order-details (`OQ-order-017`). |
| **Checklist confidence nguồn** | 24 KB item nguồn: 0 HIGH, 3 MEDIUM, 21 LOW — theo nguyên tắc "một sample → luôn LOW", không dùng làm hard assertion. 33 check trong 2 checklist, 13/33 là `NEEDS_CONFIRMATION`. |
