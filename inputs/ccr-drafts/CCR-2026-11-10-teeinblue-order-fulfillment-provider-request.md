# Context Change Request: order — request gửi nhà in qua API (Myze, PosterFlow), gộp từ CBS-045 (khuôn cũ)

- **Product:** `teeinblue`
- **Object:** `order`
- **Ticket:** `TIB-5228, QA-3348, TIB-4778, QA-3365, TIB-3925, TIB-5400 (không tra được trên Jira)`
- **Các khối có trong file:** `A`

## Mức độ gấp

`MEDIUM` — canon order không có item nào về payload gửi nhà in, no-retry, webhook, order_combine_by nên thiếu coverage; Proposal gốc CBS-045 không điền mức gấp (mục 4.4 để trống), đây là đề xuất khi chuyển khuôn, operator xác nhận. CLAIM-12, CLAIM-13 có thể làm sai assert của TC-12/13/14 (QA-3365), không phải checklist đang publish.

# Khối A — Hành vi

Nguồn gốc chung: các claim lấy từ knowledge QA local (product_facts.md), không phải quan sát trực tiếp của agent soạn CCR. Mọi lượt chạy trên staging; production không rõ; build không rõ. Không có tick QA nào chứng minh hành vi, chỉ tick AI, trừ khi ghi khác.

### CLAIM-01

- **Statement:** Payload TIB gửi Myze (fulfill_requests.request_data) gửi recipient.country dạng full name ("United States", "Germany") thay vì ISO alpha-2 và không gửi recipient.state (kể cả đơn có province); QA chấp nhận cả hai vì Myze vẫn nhận đúng data.
- **Object / feature:** order/MỚI: fulfillment-provider-request — Thuộc: payload và request TIB gửi nhà in qua API (Myze, PosterFlow), lưu response, tách/gộp theo provider, URL webhook tracking; Không thuộc: kết nối và cấu hình provider ở trang Fulfillments (product-base/MỚI: fulfillment-provider-connection), review và gửi fulfill ở portal (order/review-and-initiate-fulfillment-portal)
- **Quan hệ với canon:** `ADD`
- **Scope:** system (payload gửi Myze); api, portal (order)
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA (Yến), 2026-09-03; không phải PO/Dev
- **Locator:** QA-3348 TC-5, TC-21 (tick QA: chấp nhận lệch, tick đầu là ❌ AI vì country không ISO và thiếu state); product_facts FACT-046; TIB-5228 staging 2026-09-03. Lệch với expected gốc (ISO + state) nên không phải TC PASS đúng hành vi. Không đề xuất coi đây là PO/Dev đã duyệt. Câu hỏi mở: PO/dev Myze có chấp nhận country full-name và thiếu recipient.state không?
- **OQ:** NEEDS_CONFIRMATION — PO/dev Myze có chấp nhận payload gửi recipient.country dạng full name và không gửi recipient.state không? Hiện chỉ QA chấp nhận lệch so với expected gốc (ISO + state). — Người trả lời: PO.
- **Trích nguyên văn:**
  ```
  - [FACT-046] **⚠️ Myze integration — recipient payload (user chốt 2026-09-03, TIB-5228/QA-3348):** payload TIB→Myze (`fulfill_requests.request_data`) hiện gửi `recipient.country` dưới dạng **full name** ("United States", "Germany") chứ không phải ISO alpha-2, và **KHÔNG gửi `recipient.state`** (kể cả đơn có province). **User chấp nhận cả 2** — "Myze vẫn nhận đúng data". Đừng raise lại thành bug ở các issue Myze sau; nếu cần thì chỉ ghi "polish: `provinceCode → recipient.state`".
  Tick trên Jira (QA-3348 TC-5): ✅ QA — deviation accepted 2026-09-03 (Myze nhận đúng data; `country` full-name + thiếu `state` OK
  Tick trên Jira (QA-3348 TC-21): ✅ QA — accepted 2026-09-03: gửi `provinceCode` là đủ; `recipient.state` mapping để làm sau, không block
  ```

### CLAIM-02

- **Statement:** Payload TIB gửi Myze mang pickUp là boolean true (không phải string 'true' như mô tả issue), và đơn pickup (shippingAddress null) được gửi và hiện trạng thái Sent.
- **Object / feature:** order/MỚI: fulfillment-provider-request — Thuộc: payload và request TIB gửi nhà in qua API (Myze, PosterFlow), lưu response, tách/gộp theo provider, URL webhook tracking; Không thuộc: kết nối và cấu hình provider ở trang Fulfillments (product-base/MỚI: fulfillment-provider-connection), review và gửi fulfill ở portal (order/review-and-initiate-fulfillment-portal)
- **Quan hệ với canon:** `ADD`
- **Scope:** system (payload gửi Myze); api, portal (order)
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (kết quả [AI]), 2026-09-03
- **Locator:** QA-3348 TC-3 và TC-1 PASS 2026-09-03, staging, build không rõ (sau lần TIB-5228 giao QA cuối 2026-08-20); result_QA-3348_F1_manual_2026-09-03.md; product_facts FACT-046. Không có tick QA cho TC-1/TC-3.
- **Căn cứ expected:** Doc D1 (OpenAPI Myze khai báo pickUp là boolean, deprecated) theo cột expected của TC-3; không có version/ngày tài liệu
- **Trích nguyên văn:**
  ```
  QA-3348 TC-3 — Outgoing payload includes `pickUp` with a type Myze accepts — expected/kết quả ghi trong bảng TC: `pickUp` is present and set truthy. Doc D1: OpenAPI declares `pickUp` as boolean (deprecated). Expected: the fix serializes whatever Myze staging actually accepts without rejection; record which type. If the fix sends string `"true"` and Myze rejects → BUG. `✅ AI — 2026-09-03: payload has boolean "pickUp": true (NOT string). Matches OpenAPI schema; Myze accepted. D1 resolved.`
  Tick trên Jira (QA-3348 TC-1): ✅ AI — Pickup order (null shippingAddress) sent to Myze OK
  ```

### CLAIM-03

- **Statement:** Payload TIB gửi Myze gửi phone và supplement là null khi vắng, và Myze không validate mà bỏ qua.
- **Object / feature:** order/MỚI: fulfillment-provider-request — Thuộc: payload và request TIB gửi nhà in qua API (Myze, PosterFlow), lưu response, tách/gộp theo provider, URL webhook tracking; Không thuộc: kết nối và cấu hình provider ở trang Fulfillments (product-base/MỚI: fulfillment-provider-connection), review và gửi fulfill ở portal (order/review-and-initiate-fulfillment-portal)
- **Quan hệ với canon:** `ADD`
- **Scope:** system (payload gửi Myze); api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA (Yến), 2026-09-03; không phải PO/Dev
- **Locator:** product_facts FACT-046; QA-3348 TC-12 ✅ AI "required fields đủ, optionals xử lý được" nhưng không ghi giá trị null cụ thể nên không đủ làm test_case.
- **OQ:** NEEDS_CONFIRMATION — Payload gửi Myze có thật sự gửi phone/supplement là null khi vắng và Myze bỏ qua không validate không? Không có nguồn và TC-12 không ghi giá trị null cụ thể. — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  `phone`/`supplement` gửi `null` khi vắng — Myze không validate, bỏ qua.
  Tick trên Jira (QA-3348 TC-12): ✅ AI (kèm note) — required fields đủ, optionals xử lý được
  ```

### CLAIM-04

- **Statement:** Trên Shopify order, shippingAddress chỉ null khi là đơn pickup và khi đó null cả object, không có trạng thái "address object có nhưng address1/city/zip rỗng", nên điều kiện kiểm tra là nhị phân shippingAddress === null.
- **Object / feature:** order/MỚI: fulfillment-provider-request — Thuộc: payload và request TIB gửi nhà in qua API (Myze, PosterFlow), lưu response, tách/gộp theo provider, URL webhook tracking; Không thuộc: kết nối và cấu hình provider ở trang Fulfillments (product-base/MỚI: fulfillment-provider-connection), review và gửi fulfill ở portal (order/review-and-initiate-fulfillment-portal)
- **Quan hệ với canon:** `ADD`
- **Scope:** system (dữ liệu đơn Shopify); api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA (Yến), 2026-09-03; không phải PO/Dev
- **Locator:** product_facts FACT-047 ý 1; TIB-5228; QA-3348 TC-1 chỉ kiểm đơn pickup null gửi được, không kiểm "không bao giờ rỗng từng phần". Không đề xuất coi đây là tính chất Shopify đã chứng minh; chưa có TC hay tài liệu Shopify.
- **OQ:** NEEDS_CONFIRMATION — Có đúng shippingAddress của Shopify order chỉ null khi là đơn pickup (null cả object, không có trạng thái rỗng từng phần) không? Chưa có TC hay tài liệu Shopify chứng minh. — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  **`shippingAddress` chỉ null khi là đơn PICKUP, và khi đó null cả object.** KHÔNG tồn tại trạng thái "address object có nhưng `address1`/`city`/`zip` rỗng" — mấy field đó không null được nếu đơn không phải pickup. ⇒ Điều kiện kiểm tra là **nhị phân `shippingAddress === null`**
  ```

### CLAIM-05

- **Statement:** billingAddress của Shopify order không bao giờ null hoặc rỗng, nên fallback lấy billing luôn có nguồn và ca "cả shipping lẫn billing đều rỗng" không tồn tại.
- **Object / feature:** order/MỚI: fulfillment-provider-request — Thuộc: payload và request TIB gửi nhà in qua API (Myze, PosterFlow), lưu response, tách/gộp theo provider, URL webhook tracking; Không thuộc: kết nối và cấu hình provider ở trang Fulfillments (product-base/MỚI: fulfillment-provider-connection), review và gửi fulfill ở portal (order/review-and-initiate-fulfillment-portal)
- **Quan hệ với canon:** `ADD`
- **Scope:** system (dữ liệu đơn Shopify); api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA (Yến), 2026-09-03; không phải PO/Dev
- **Locator:** product_facts FACT-047 ý 2; TIB-5228. Không có TC kiểm điều "không bao giờ rỗng". Gần KB-021 (panel Shipping/Billing hiển thị đúng), không thay thế. Không đề xuất coi đây là tính chất Shopify đã chứng minh.
- **OQ:** NEEDS_CONFIRMATION — Có đúng billingAddress của Shopify order không bao giờ null hoặc rỗng, nên không tồn tại ca "cả shipping lẫn billing đều rỗng" không? Không có TC kiểm điều này. — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  **`billingAddress` của Shopify order KHÔNG BAO GIỜ null/rỗng.** ⇒ Mọi TC kiểu "cả shipping lẫn billing đều rỗng thì sao?" là **case không tồn tại** — không viết, không hỏi PO. Fallback lấy billing luôn có nguồn.
  ```

### CLAIM-06

- **Statement:** Combine đơn pickup với đơn ship có cùng địa chỉ hiệu dụng là won't-fix, vì địa chỉ pickup là địa chỉ store và tổ hợp "đơn ship thật + đơn pickup, địa chỉ trùng khít" hiếm tới mức không đáng sửa.
- **Object / feature:** order/MỚI: fulfillment-provider-request — Thuộc: payload và request TIB gửi nhà in qua API (Myze, PosterFlow), lưu response, tách/gộp theo provider, URL webhook tracking; Không thuộc: kết nối và cấu hình provider ở trang Fulfillments (product-base/MỚI: fulfillment-provider-connection), review và gửi fulfill ở portal (order/review-and-initiate-fulfillment-portal)
- **Quan hệ với canon:** `ADD`
- **Scope:** system (order combine); api
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA (Yến), 2026-09-04; không phải PO/Dev
- **Locator:** product_facts FACT-047 ý 3; QA-3348 TC-30, BUG-3; TIB-5400 không tra được trên Jira (404). Quyết định won't-fix của QA, không phải PO/Dev.
- **OQ:** NEEDS_CONFIRMATION — Quyết định won't-fix cho combine đơn pickup với đơn ship cùng địa chỉ hiệu dụng có được PO/Dev duyệt không, và đã ship chưa? Hiện chỉ là quyết định của QA, TIB-5400 không tra được trên Jira. — Người trả lời: PO.
- **Trích nguyên văn:**
  ```
  **Combine pickup + ship cùng địa chỉ hiệu dụng → won't-fix (user chốt 2026-09-04, TC-30/BUG-3/TIB-5400).** Địa chỉ pickup = địa chỉ store; khách nhập shipping address trùng địa chỉ store thì bản chất đơn đó là pickup rồi → tổ hợp "đơn ship thật + đơn pickup, địa chỉ trùng khít" hiếm tới mức không đáng fix.
  ```

### CLAIM-07

- **Statement:** Text buyer nhập chỉ được gửi nguyên văn cho provider khi layer text bật "Attach customer input for fulfillment" (artwork editor); khi tắt, provider chỉ nhận URL design đã render, không có text thô, và áp dụng chung cho mọi provider dùng flow này.
- **Object / feature:** order/MỚI: fulfillment-provider-request — Thuộc: payload và request TIB gửi nhà in qua API (Myze, PosterFlow), lưu response, tách/gộp theo provider, URL webhook tracking; Không thuộc: kết nối và cấu hình provider ở trang Fulfillments (product-base/MỚI: fulfillment-provider-connection), review và gửi fulfill ở portal (order/review-and-initiate-fulfillment-portal) (liên quan: artwork, layer text và toggle)
- **Quan hệ với canon:** `ADD`
- **Scope:** seller (artwork editor), system (payload gửi provider); portal, api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** Dev (không rõ tên, theo ghi chú QA về thread Slack), 2026-09-16; không có quote
- **Locator:** product_facts FACT-076; 01-analysis.md QA-3365; Jira TIB-3925 (Story, tạo 2025-04-15, Done 2025-07-15) mô tả toggle nhưng là mô tả ticket không có version/ngày sửa, không đủ dev_doc/spec_doc; QA-3365 TC-39 ⏭️ (QA skip 2026-10-09 sau 4/5 payload). Không đề xuất coi đây là dev đã xác nhận bằng văn bản.
- **OQ:** NEEDS_CONFIRMATION — Dev có xác nhận bằng văn bản rằng text buyer chỉ gửi nguyên văn cho provider khi layer bật "Attach customer input for fulfillment" và áp dụng cho mọi provider không? Nguồn là ghi chú QA về thread Slack, không có quote, TC-39 bị skip. — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  - [FACT-076] **Buyer personalization text chỉ gửi nguyên văn cho provider nếu layer bật "Attach customer input for fulfillment"** (artwork editor) — nếu tắt, provider chỉ nhận URL design đã render, không có text thô. Liên quan TIB-3925 (Send text value when sending orders to API providers for engraving/embroidery products) — áp dụng chung cho MỌI provider dùng flow này, không riêng PosterFlow.
  TIB-3925 (description): […] In Text, add a toggle “Attach customer input for fulfillment” under “Show customization data on cart/checkout” (only show when selecting “Enable personalization”)
  ```

### CLAIM-08

- **Statement:** Create Order gửi provider không tự động retry khi thất bại, chỉ staff resend thủ công, theo pattern chung của các integration provider (Myze, Marketprint, Printbelle).
- **Object / feature:** order/MỚI: fulfillment-provider-request — Thuộc: payload và request TIB gửi nhà in qua API (Myze, PosterFlow), lưu response, tách/gộp theo provider, URL webhook tracking; Không thuộc: kết nối và cấu hình provider ở trang Fulfillments (product-base/MỚI: fulfillment-provider-connection), review và gửi fulfill ở portal (order/review-and-initiate-fulfillment-portal)
- **Quan hệ với canon:** `ADD`
- **Scope:** system (Create Order); api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** Dev (không rõ tên, theo ghi chú QA về thread Slack), 2026-09-16; không có quote
- **Locator:** product_facts FACT-079; 01-analysis.md QA-3365 BR-7; QA-3365 TC-19 tick cuối ⏭️ AI "skipped" nên không phải bằng chứng PASS. Không đề xuất coi đây là dev đã xác nhận bằng văn bản.
- **OQ:** NEEDS_CONFIRMATION — Dev có xác nhận bằng văn bản rằng Create Order gửi provider không tự động retry, chỉ staff resend thủ công, cho mọi provider không? Nguồn là ghi chú QA về thread Slack, không có quote, TC-19 bị skip. — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  - [FACT-079] **Create Order KHÔNG tự động retry khi thất bại** — chỉ staff resend thủ công. Áp dụng theo pattern chung của integration provider (đồng nhất Myze/Marketprint/Printbelle).
  01-analysis.md QA-3365 BR-7 (candidate): On a Create Order 4xx/5xx response from PosterFlow, TIB marks the order as failed and surfaces the error to the merchant (no automatic retry mentioned). [Confirmed 2026-09-16 via Slack — candidate for `update-business-rules` if this generalizes across providers, not auto-saved here]
  ```

### CLAIM-09

- **Statement:** TIB không lưu header outbound (Authorization) gửi provider mà chỉ lưu body request, nên auth scheme chỉ suy ra gián tiếp qua response success hoặc 401.
- **Object / feature:** order/MỚI: fulfillment-provider-request — Thuộc: payload và request TIB gửi nhà in qua API (Myze, PosterFlow), lưu response, tách/gộp theo provider, URL webhook tracking; Không thuộc: kết nối và cấu hình provider ở trang Fulfillments (product-base/MỚI: fulfillment-provider-connection), review và gửi fulfill ở portal (order/review-and-initiate-fulfillment-portal)
- **Quan hệ với canon:** `ADD`
- **Scope:** system; db
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** Dev (không rõ tên, theo ghi chú QA về thread Slack), 2026-09-16 (sửa 2026-09-22); không có quote
- **Locator:** product_facts FACT-080; QA-3365 TC-27 ✅ AI chỉ kiểm "payload đã lưu không chứa raw API key", không kiểm trực tiếp việc không lưu header. Bảng lưu phần REQUEST (outbound payload) chưa xác nhận lại.
- **OQ:** NEEDS_CONFIRMATION — TIB có thật sự không lưu header outbound (Authorization) mà chỉ lưu body request không? Bảng lưu phần REQUEST chưa xác nhận lại và TC-27 chỉ kiểm không lộ raw API key. — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  - [FACT-080] **Không lưu header outbound (Authorization)** — chỉ lưu body request. Auth scheme phải suy ra gián tiếp qua response success/401, không đọc raw header.
  Tick trên Jira (QA-3365 TC-27): ✅ AI — API key not leaked in accessible logs or stored payloads
  ```

### CLAIM-10

- **Statement:** Response của provider được lưu ở fulfillers.metadata (PosterFlow: id, status, reference_order_id) và fulfillers.fulfillment_linked_id được set, không phải ở fulfill_requests như suy đoán theo pattern Myze; Portal chỉ hiện fulfillment_linked_id và tracking.
- **Object / feature:** order/MỚI: fulfillment-provider-request — Thuộc: payload và request TIB gửi nhà in qua API (Myze, PosterFlow), lưu response, tách/gộp theo provider, URL webhook tracking; Không thuộc: kết nối và cấu hình provider ở trang Fulfillments (product-base/MỚI: fulfillment-provider-connection), review và gửi fulfill ở portal (order/review-and-initiate-fulfillment-portal)
- **Quan hệ với canon:** `ADD`
- **Scope:** system; db, portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (kết quả [AI]), 2026-10-08
- **Locator:** QA-3365 TC-15 PASS 2026-10-08 (cũng 2026-10-06, 2026-10-07), staging, build không rõ (sau lần TIB-4778 giao QA cuối 2026-09-14); result_QA-3365_lane2-gha_auto_2026-10-08.md; product_facts FACT-080. TC không mở màn Portal để soi UI; vế "Portal chỉ hiện fulfillment_linked_id" chỉ từ expected của TC.
- **Căn cứ expected:** KHÔNG CÓ (expected ghi "dev confirmed" vị trí bảng ở RQ10, 2026-09-22, không có tên người hay quote)
- **OQ:** NEEDS_CONFIRMATION — Vị trí lưu response (fulfillers.metadata, fulfillment_linked_id) và việc Portal chỉ hiện fulfillment_linked_id + tracking có được Dev xác nhận không? Expected ghi "dev confirmed" nhưng không có tên hay quote, và TC không mở màn Portal. — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  QA-3365 TC-15 — Order response mapped into TIB records — expected/kết quả ghi trong bảng TC: `fulfillers.metadata` contains PosterFlow's response (`id`, `status`, `reference_order_id`); `fulfillers.fulfillment_linked_id` is set. Portal ONLY shows `fulfillment_linked_id` + tracking info (dev confirmed: same as Myze, shared resource/UI)
  Tick trên Jira (QA-3365 TC-15): ✅ AI — Order response mapped into TIB records
  result_QA-3365_lane2-gha_auto_2026-10-08.md TC-15: fulfillers#[đã bỏ id]: metadata={"id":"#[đã bỏ id]","status":"success","reference_order_id":"CF#[đã bỏ id]"}, fulfillment_linked_id="#[đã bỏ id]"
  ```

### CLAIM-11

- **Statement:** Payload Create Order gửi PosterFlow không có field giá hay pricing nào, nên không có trường hợp Product Base thiếu Price ảnh hưởng lời gọi này.
- **Object / feature:** order/MỚI: fulfillment-provider-request — Thuộc: payload và request TIB gửi nhà in qua API (Myze, PosterFlow), lưu response, tách/gộp theo provider, URL webhook tracking; Không thuộc: kết nối và cấu hình provider ở trang Fulfillments (product-base/MỚI: fulfillment-provider-connection), review và gửi fulfill ở portal (order/review-and-initiate-fulfillment-portal)
- **Quan hệ với canon:** `ADD`
- **Scope:** system (payload gửi PosterFlow); api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (kết quả [AI]), 2026-10-08
- **Locator:** QA-3365 TC-14 PASS 2026-10-08, staging, build không rõ (sau lần TIB-4778 giao QA cuối 2026-09-14); result_QA-3365_auto_2026-10-08.md; product_facts FACT-083. Cùng ngày lượt lane2-gha TC-14 ❌ vì assert `id` (xem CLAIM-12). Chỉ kiểm PosterFlow trên staging; Myze, Marketprint, Printbelle chưa kiểm, không suy rộng cho mọi provider.
- **Căn cứ expected:** Jira TIB-4778 comment 51328 (dev huyenntk, 2026-09-18), ví dụ "Create order" không có field giá
- **Trích nguyên văn:**
  ```
  QA-3365 TC-14 — Outbound payload contains NO pricing field — confirm this stays true — expected/kết quả ghi trong bảng TC: Confirms the real payload has no pricing field, matching the documented shape […] If a price-like field unexpectedly appears, that's a finding — schema changed from the documented example
  Tick trên Jira (QA-3365 TC-14): ✅ AI — Outbound payload contains NO pricing field — confirm this stays true
  result_QA-3365_auto_2026-10-08.md TC-14: request_data keys (top) = ["line_items","test_order","shipping_address","reference_order_id","shipment_notification_url"] · các field nghi ngờ giá/cost tìm thấy = [] · request_data có 'id'? false (không assert ở đây — xem BUG-05)
  ```

### CLAIM-12

- **Statement:** Shape Create Order payload gửi PosterFlow theo ví dụ của dev gồm id (order id nội bộ TIB), reference_order_id, test_order: true, shipping_address, line_items[] (quantity, variant_sku, print_areas[] với key và url), shipment_notification_url; response PosterFlow có id (khác id request), status, reference_order_id; shape hiện hành chưa được xác nhận vì payload thật từ 2026-10-05 mất key id và có thêm shipping_address.state: null.
- **Object / feature:** order/MỚI: fulfillment-provider-request — Thuộc: payload và request TIB gửi nhà in qua API (Myze, PosterFlow), lưu response, tách/gộp theo provider, URL webhook tracking; Không thuộc: kết nối và cấu hình provider ở trang Fulfillments (product-base/MỚI: fulfillment-provider-connection), review và gửi fulfill ở portal (order/review-and-initiate-fulfillment-portal)
- **Quan hệ với canon:** `ADD`
- **Scope:** system (payload gửi PosterFlow); api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** Dev (huyenntk), ví dụ trong comment không phải sign-off, 2026-09-18
- **Locator:** Jira TIB-4778 comment 51328 (mục "PosterFlow API description" → "Create order"); product_facts FACT-083; QA-3365 BUG-05 (re-check 2026-10-06, dismissed 2026-10-07: 4/4 order thật từ 2026-10-05 không còn `id`, 3/4 có `state: null`). Có thể làm SAI assert `id` của TC-13/TC-14. Không coi shape trong ví dụ là hiện hành. Câu hỏi mở: dev có chủ ý bỏ `id` và thêm `state: null` không, shape nào là chuẩn?
- **OQ:** CONFLICT — Dev có chủ ý bỏ `id` và thêm `state: null` trong payload Create Order gửi PosterFlow không, và shape nào là chuẩn? Side A: ví dụ dev (TIB-4778 comment 51328, 2026-09-18) có `id` và không có `state` / Side B: BUG-05 (order thật từ 2026-10-05) không có `id`, 3/4 có `shipping_address.state: null`. — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  Jira TIB-4778 comment 51328 (huyenntk, 2026-09-18), mục 'Create order' — ví dụ request: {"id": [đã bỏ id], "reference_order_id": "#3304x", "test_order": true, "shipping_address": {…}, "line_items": [{"quantity": 1, "variant_sku": "…", "print_areas": [{"key": "front", "url": "…"}]}, …], "shipment_notification_url": "https://staging-api.teeinblue.com/api/webhook/general?order_token=..."} · Response: {"id": "123456", "status": "success", "reference_order_id": "TT123456"}
  BUG-05 (QA-3365, re-check 2026-10-06): 4/4 order thật từ 2026-10-05 trở đi đều KHÔNG còn `id` ở request_data, và 3/4 có thêm `state: null` trong shipping_address dù oracle orders.shipping_address không có key này — QA dismissed BUG-05 2026-10-07 (không ảnh hưởng gửi fulfill request).
  ```

### CLAIM-13

- **Statement:** shipping_address gửi PosterFlow có cả country full-name ("Vietnam") lẫn ISO code ("VN"), khác Myze (chỉ full-name), và dùng province/province_code thay vì field state.
- **Object / feature:** order/MỚI: fulfillment-provider-request — Thuộc: payload và request TIB gửi nhà in qua API (Myze, PosterFlow), lưu response, tách/gộp theo provider, URL webhook tracking; Không thuộc: kết nối và cấu hình provider ở trang Fulfillments (product-base/MỚI: fulfillment-provider-connection), review và gửi fulfill ở portal (order/review-and-initiate-fulfillment-portal)
- **Quan hệ với canon:** `ADD`
- **Scope:** system (payload gửi PosterFlow); api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** Dev (không rõ tên, theo ghi chú QA về thread Slack), 2026-09-16; không có quote
- **Locator:** product_facts FACT-084; QA-3365 TC-12 tick cuối ❌ trên Jira (QA đổi thành skip 2026-10-08) vì payload thật từ 2026-10-05 có `state: null` (BUG-05 dismissed 2026-10-07). Phần "không có field state" có thể đã lỗi thời và có thể làm SAI assert "không có state" của TC-12 (xem CLAIM-12).
- **OQ:** CONFLICT — shipping_address gửi PosterFlow có field state hay không? Side A: FACT-084 (Dev, Slack 2026-09-16, không có quote) ghi không có field `state`, dùng province/province_code / Side B: payload thật từ 2026-10-05 có `state: null` (BUG-05 dismissed 2026-10-07, TC-12 ❌ rồi skip). — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  - [FACT-084] **`shipping_address` gửi CẢ full-name country ("Vietnam") LẪN ISO code ("VN")** — khác Myze (chỉ full-name, không ISO). Không có field `state`, dùng `province`/`province_code` thay thế.
  Tick trên Jira (QA-3365 TC-12): ❌ -> skip (BUG-05 dismissed 2026-10-07 — state:null thừa/id thiếu không ảnh hưởng gửi fulfill request)
  ```

### CLAIM-14

- **Statement:** TIB không có stub hay sandbox nào để ép PosterFlow trả 4xx/5xx mà chỉ forward nguyên status và message PosterFlow trả về (server-to-server, page.route() phía browser không chặn được); muốn test lỗi phải nhờ PosterFlow hoặc dùng payload sai thật như variant_sku không hợp lệ.
- **Object / feature:** order/MỚI: fulfillment-provider-request — Thuộc: payload và request TIB gửi nhà in qua API (Myze, PosterFlow), lưu response, tách/gộp theo provider, URL webhook tracking; Không thuộc: kết nối và cấu hình provider ở trang Fulfillments (product-base/MỚI: fulfillment-provider-connection), review và gửi fulfill ở portal (order/review-and-initiate-fulfillment-portal)
- **Quan hệ với canon:** `ADD`
- **Scope:** system (cách test); api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** Dev (không rõ tên, theo ghi chú QA về thread Slack), 2026-09-16; không có quote
- **Locator:** product_facts FACT-086; QA-3365 TC-17 ✅ AI (4xx thì order bị đánh dấu failed, dựng lỗi bằng variant_sku sai) nhưng không kiểm điều "không có stub/sandbox".
- **OQ:** NEEDS_CONFIRMATION — Dev có xác nhận TIB không có stub/sandbox ép PosterFlow trả 4xx/5xx và chỉ forward nguyên status/message không? Nguồn là ghi chú QA về thread Slack, không có quote, TC-17 không kiểm điều này. — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  - [FACT-086] **TIB KHÔNG có stub/sandbox nào để ép PosterFlow trả 4xx/5xx** — chỉ forward nguyên status/message PosterFlow trả về (server-to-server, `page.route()` phía browser KHÔNG chặn được cuộc gọi này). Muốn test lỗi 4xx/5xx phải nhờ PosterFlow tạo tình huống thật, hoặc dùng payload sai thật (vd `variant_sku` không hợp lệ).
  ```

### CLAIM-15

- **Statement:** order_combine_by chỉ được xét sau khi đã tách theo provider: tách theo provider luôn xảy ra bất kể giá trị order_combine_by, và setting này chỉ quyết định các item cùng provider có gộp chung một request hay không (áp dụng chung, không riêng PosterFlow).
- **Object / feature:** order/MỚI: fulfillment-provider-request — Thuộc: payload và request TIB gửi nhà in qua API (Myze, PosterFlow), lưu response, tách/gộp theo provider, URL webhook tracking; Không thuộc: kết nối và cấu hình provider ở trang Fulfillments (product-base/MỚI: fulfillment-provider-connection), review và gửi fulfill ở portal (order/review-and-initiate-fulfillment-portal)
- **Quan hệ với canon:** `ADD`
- **Scope:** system; api, db (fulfillers)
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (kết quả [AI]), 2026-10-08
- **Locator:** QA-3365 TC-33 (order_combine_by=1: 1 request chứa 2 line item) và TC-34 (cross-provider luôn tách) PASS 2026-10-08, staging, build không rõ (sau lần TIB-4778 giao QA cuối 2026-09-14); result_QA-3365_auto_2026-10-08.md, result_QA-3365_TC34_auto_2026-10-08.md; product_facts FACT-087. Nhánh order_combine_by khác 1 chưa có lần chạy (TC-33 chỉ chạy bằng 1).
- **Căn cứ expected:** KHÔNG CÓ (TC-34 ghi "Dev-confirmed 2026-09-22 (RQ6)", không có tên người hay quote)
- **OQ:** NEEDS_CONFIRMATION — Nhánh order_combine_by khác 1 (một request cho mỗi line item) và việc luôn tách theo provider có được Dev xác nhận không? TC-33 chỉ chạy với giá trị 1, và "Dev-confirmed 2026-09-22 (RQ6)" không có tên hay quote. — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  QA-3365 TC-33 — Multi-line-item order, all SAME provider (PosterFlow) → combine per `order_combine_by` — expected/kết quả ghi trong bảng TC: If `order_combine_by = 1`: exactly ONE request row for this order containing all PosterFlow line items in its payload. If `order_combine_by ≠ 1`: one row PER line item instead
  Tick trên Jira (QA-3365 TC-33): ✅ AI — Multi-line-item order, all SAME provider (PosterFlow) → combine per `order_combine_by`
  QA-3365 TC-34 — Cross-provider order always splits by provider — `order_combine_by` does NOT affect this — expected/kết quả ghi trong bảng TC: Dev-confirmed 2026-09-22 (RQ6): ALWAYS exactly one request row per provider (PosterFlow items in one, the other provider's items in another) regardless of `order_combine_by` value — same-address does NOT cause cross-provider combining.
  Tick trên Jira (QA-3365 TC-34): ✅ AI — Cross-provider order always splits by provider — `order_combine_by` does NOT affect this
  ```

### CLAIM-16

- **Statement:** shipment_notification_url gửi provider dùng chung endpoint /api/webhook/general?user_id=...&token=...&order_token=..., luôn do TIB tự sinh per-request và không phải input staff hay merchant cấu hình được (trang cấu hình PosterFlow không có ô nhập).
- **Object / feature:** order/MỚI: fulfillment-provider-request — Thuộc: payload và request TIB gửi nhà in qua API (Myze, PosterFlow), lưu response, tách/gộp theo provider, URL webhook tracking; Không thuộc: kết nối và cấu hình provider ở trang Fulfillments (product-base/MỚI: fulfillment-provider-connection), review và gửi fulfill ở portal (order/review-and-initiate-fulfillment-portal)
- **Quan hệ với canon:** `ADD`
- **Scope:** system; api, portal (trang cấu hình PosterFlow)
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (kết quả [AI]), 2026-10-08
- **Locator:** QA-3365 TC-31 PASS 2026-10-08 (cũng 2026-10-07), staging, build không rõ (sau lần TIB-4778 giao QA cuối 2026-09-14); result_QA-3365_lane2-gha_auto_2026-10-08.md; product_facts FACT-088. TC kết luận "N/A theo điều kiện" (field không configurable) nhưng tick ✅ và đã ghi URL thật. Chỉ quan sát PosterFlow, không kiểm mọi provider; TC-21 (webhook cập nhật tracking) ⏭️ nên chưa có bằng chứng webhook tự cập nhật tracking.
- **Căn cứ expected:** KHÔNG CÓ
- **OQ:** NEEDS_CONFIRMATION — TC-31 kết luận "N/A theo điều kiện" nhưng tick ✅: có xác nhận được shipment_notification_url luôn do TIB tự sinh và webhook tự cập nhật tracking đúng không (TC-21 bị skip, chỉ quan sát PosterFlow)? — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  - [FACT-088] **Webhook `shipment_notification_url` dùng chung endpoint `/api/webhook/general` với query `user_id` (id), `token` (32-hex), `order_token` (ULID)** (xác nhận lại 2026-10-06, QA-3365 TC-31 — trước đó chỉ quan sát thấy `order_token`, giờ URL thật đã có đủ `user_id`+`token` đúng mô tả dev) — field luôn TIB tự sinh per-request, không phải input staff/merchant cấu hình được (không có ô nhập nào trên `/fulfillments/posterflow`).
  result_QA-3365_lane2-gha_auto_2026-10-08.md TC-31: input/textarea trên trang settings PosterFlow = [] · TC-31 kết luận N/A theo đúng điều kiện ghi trong TC gốc: field KHÔNG staff/merchant-configurable (TIB tự sinh per-order)
  ```
