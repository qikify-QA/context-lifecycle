# Context Change Request: order — gộp từ 3 Proposal khuôn cũ

- **Product:** `teeinblue`
- **Object:** `order`
- **Ticket:** `TIB-5563, TIB-5561, QA-3435, TIB-5501, QA-3394`
- **Các khối có trong file:** `A`

## Mức độ gấp

`MEDIUM` — mức cao nhất trong các Proposal gốc (MEDIUM); lý do gốc theo từng Proposal:

- CBS-020: MEDIUM — Ảnh hưởng coverage của object order; không checklist đang publish nào chạy sai vì thiếu các claim này; hành vi chưa ship nên không HIGH (QA phuongbb, 2026-11-01).
- CBS-024: MEDIUM — canon thiếu coverage cho field output size và check 4 MP (gap); CLAIM-23 chỉ là quan sát phụ, CHK-01-007, CHK-01-014 đã ở NEEDS_CONFIRMATION nên chưa đủ HIGH.
- CBS-031: MEDIUM — Canon thiếu coverage cho đổi màu vector và id SVG trùng, nhưng không có checklist đang publish nào kiểm hành vi này nên không có gì đang chạy sai (QA phuongbb xác nhận 2026-11-01).

# Khối A — Hành vi

### CLAIM-01

- **Statement:** Khi import đơn Shopify, giá trị _customization_id / customization_id chỉ được dùng để tìm theo customizations.uuid khi là UUID hợp lệ theo Str::isUuid (8-4-4-4-12 hex, không phân biệt hoa thường, không trim); khoảng trắng đầu/cuối, {…}, 32 hex không gạch và UUID nằm trong chuỗi dài hơn đều là sai định dạng, không trích xuất; cả 2 tên property cùng một check, nhánh id số giữ nguyên.
- **Object / feature:** order/MỚI: shopify-order-import — Thuộc: import/đồng bộ đơn Shopify vào Teeinblue ở backend (webhook create/update, re-sync, khôi phục customization, usage); Không thuộc: flow đặt hàng của buyer trên storefront (place-personalized-order-storefront), review và fulfill ở portal (review-and-initiate-fulfillment-portal)
- **Quan hệ với canon:** `ADD`
- **Scope:** system (job webhook đơn Shopify, mọi store Shopify của merchant); api, db (customizations.uuid)
- **Đã ship:** `NOT_SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (tinhpt), 2026-10-26
- **Locator:** Jira TIB-5563 comment 55626, trả lời Q4, Q5, Q6, Q8c của comment 55595. Hành vi dự định sau fix, chưa quan sát; không dùng làm expected tới khi có TC PASS sau fix. Nhánh id số (hasCustomizationId): chỉ ghi "giữ nguyên", không suy thêm. (CCR cũ: CBS-020 CLAIM-01)
- **Trích nguyên văn:**
  ```
  Q4: Hyphenated 8-4-4-4-12 hex only, case-insensitive (Laravel `Str::isUuid`). The value is NOT trimmed, so leading/trailing spaces count as malformed. Braces and no-hyphen forms count as malformed.
  
  Q5 A — Malformed, no extraction.
  
  Q6: Yes. Please test both property names: `_customization_id` and `customization_id` (without underscore). Both go through the same check.
  
  (c) The numeric path (`hasCustomizationId`) is unchanged.
  
  Câu hỏi Q5 (QA, comment 55595): "For values that contain a UUID inside a longer string (e.g. https://cdn.teeinblue.com/designs/<uuid>-[đã bỏ id].jpeg), should the UUID be extracted, or is the value simply malformed? — chọn: A) Malformed · B) Extract the UUID"
  ```

### CLAIM-02

- **Statement:** Line item có customization_id sai định dạng không làm hỏng đơn: đơn vẫn được import, line hiện như item không có design, đơn toàn line sai định dạng import như đơn không customization, và line sai định dạng không tạo usage.
- **Object / feature:** order/MỚI: shopify-order-import — Thuộc: import/đồng bộ đơn Shopify vào Teeinblue ở backend (webhook create/update, re-sync, khôi phục customization, usage); Không thuộc: flow đặt hàng của buyer trên storefront (place-personalized-order-storefront), review và fulfill ở portal (review-and-initiate-fulfillment-portal)
- **Quan hệ với canon:** `ADD`
- **Scope:** system (import) + owner (xem kết quả ở Portal); api, portal, db (usage)
- **Đã ship:** `NOT_SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (tinhpt), 2026-10-26
- **Locator:** Jira TIB-5563 comment 55626, trả lời Q1, Q2, Q9. QA chạy staging 2026-10-28 (QA-3430) thấy ngược lại: đơn có line id sai định dạng không vào Teeinblue sau 33–38 phút, đơn đối chứng vào trong < 4 phút; bug draft BUG-01 chưa file, chưa có TC PASS sau fix. Không đóng OQ-order-001, không sửa CHK-006-ORDER01-SYNC. Gần KB-011, KB-017, không thay thế. (CCR cũ: CBS-020 CLAIM-02)
- **Trích nguyên văn:**
  ```
  Q1 A — Imported. The order record is created the same way as an order whose items have no `customization_id`; whether it is a TeeInBlue order still depends only on the product (`by_teeinblue`), not on the property.
  
  Q2 A — Item without design. The order item is created; it just has no customization attached.
  
  Q9: Not counted. Usage is only created when a customization is matched, so a malformed-id item counts the same as an item without `customization_id`. QA can check that the order item has no usage record / the usage counter does not increase.
  ```

### CLAIM-03

- **Statement:** Khôi phục customization qua cart token chạy theo đơn, không theo item: chỉ chạy khi không line nào trong đơn có id số/UUID hợp lệ; line có property được khớp theo giá trị property, không theo variant, nên line sai định dạng không bao giờ được khôi phục.
- **Object / feature:** order/MỚI: shopify-order-import — Thuộc: import/đồng bộ đơn Shopify vào Teeinblue ở backend (webhook create/update, re-sync, khôi phục customization, usage); Không thuộc: flow đặt hàng của buyer trên storefront (place-personalized-order-storefront), review và fulfill ở portal (review-and-initiate-fulfillment-portal)
- **Quan hệ với canon:** `ADD`
- **Scope:** system (job webhook); api, db
- **Đã ship:** `NOT_SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (tinhpt), 2026-10-26
- **Locator:** Jira TIB-5563 comment 55626, trả lời Q3. Hành vi dự định sau fix, chưa quan sát; không dùng làm expected tới khi có TC PASS sau fix. (CCR cũ: CBS-020 CLAIM-03)
- **Trích nguyên văn:**
  ```
  Q3: Different from the suggestion. The cart-token recovery works per order, not per item: it only runs when no line item in the order has a valid numeric/UUID id. Even when it does run, the malformed-id item does not get a recovered customization, because a line item that has the property is matched by that property's value, not by variant. So a malformed-id item is never recovered.
  ```

### CLAIM-04

- **Statement:** Lookup ShopifyObjects\Order chỉ phục vụ luồng đơn Shopify (webhook create/update, re-sync thủ công SyncShopifyOrder / admin Order Sync, command FixMissingCustomization); Etsy và nền tảng khác không dùng, và _tib_customization_id đọc bằng method riêng, ngoài check này.
- **Object / feature:** order/MỚI: shopify-order-import — Thuộc: import/đồng bộ đơn Shopify vào Teeinblue ở backend (webhook create/update, re-sync, khôi phục customization, usage); Không thuộc: flow đặt hàng của buyer trên storefront (place-personalized-order-storefront), review và fulfill ở portal (review-and-initiate-fulfillment-portal)
- **Quan hệ với canon:** `ADD`
- **Scope:** system (webhook create/update, re-sync, command) + staff admin (Order Sync); api
- **Đã ship:** `NOT_SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (tinhpt), 2026-10-26
- **Locator:** Jira TIB-5563 comment 55626, trả lời Q8a, Q8b. Hành vi dự định sau fix, chưa quan sát; không dùng làm expected tới khi có TC PASS sau fix. Chưa thử TC-26 (re-sync), TC-27 (FixMissingCustomization). Không suy diễn từ TC-41 / TC-36; không đề xuất gì thêm về _tib_customization_id. (CCR cũ: CBS-020 CLAIM-04)
- **Trích nguyên văn:**
  ```
  Q8: (a) Only the Shopify order flow: order create/update webhooks, manual re-sync (`SyncShopifyOrder` / admin Order Sync), and the `FixMissingCustomization` command all go through the same `ShopifyObjects\Order` lookup. Etsy and other platforms are not affected. (b) `_tib_customization_id` is the addon key, read by a separate method; it is not part of this check and is unchanged.
  ```

### CLAIM-05

- **Statement:** Portal Order details / Edit order hiển thị nguyên giá trị _customization_id / customization_id của line item trong danh sách "Options" của item, chỉ khi store bật "show line item properties", ẩn sau "Show more", và giá trị được HTML-escape.
- **Object / feature:** order/review-and-initiate-fulfillment-portal
- **Quan hệ với canon:** `ADD`
- **Scope:** owner (merchant xem Order details / Edit order); portal
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (tinhpt), 2026-10-26
- **Locator:** Jira TIB-5563 comment 55626, trả lời Q11. Chưa quan sát: TC-29 bị chặn trong lượt staging 2026-10-28. Gần KB-017, CHK-P05, không thay thế. (CCR cũ: CBS-020 CLAIM-05)
- **Trích nguyên văn:**
  ```
  Q11 A — Yes, in the item's "Options" list. It only appears when the store has "show line item properties" on, it is collapsed behind "Show more", and the value is HTML-escaped.
  
  Câu hỏi Q11 (QA, comment 55595): "Does Portal → Order details / Edit order display the raw _customization_id / customization_id value of a line item? — chọn: A) Yes · B) No"
  ```

### CLAIM-06

- **Statement:** Đơn đã lỗi SQLSTATE 22P02 trước bản fix (Sentry TEEINBLUE-4FG) không được import lại, và dev không theo dõi Sentry cho bản fix này.
- **Object / feature:** order/MỚI: shopify-order-import — Thuộc: import/đồng bộ đơn Shopify vào Teeinblue ở backend (webhook create/update, re-sync, khôi phục customization, usage); Không thuộc: flow đặt hàng của buyer trên storefront (place-personalized-order-storefront), review và fulfill ở portal (review-and-initiate-fulfillment-portal)
- **Quan hệ với canon:** `ADD`
- **Scope:** system (dữ liệu đơn lịch sử); api
- **Đã ship:** `NOT_SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (tinhpt), 2026-10-26
- **Locator:** Jira TIB-5563 comment 55626, trả lời Q7, Q10. Chỉ ghi giới hạn đã biết, không đề xuất cam kết vận hành; số sự kiện Sentry trong câu hỏi không phải dữ kiện canon. (CCR cũ: CBS-020 CLAIM-06)
- **Trích nguyên văn:**
  ```
  Q7: No action. The orders that failed earlier will not be re-imported.
  
  Q10: No action. We won't monitor Sentry or provide evidence for this.
  
  Câu hỏi Q7 (QA, comment 55595): "Will the orders that failed before the fix (98 Sentry events since 2026-09-17) be re-imported, and by whom?"
  ```

### CLAIM-07

- **Statement:** Order design dùng ảnh đã generate, fit vào box layer: T2I GPT Default (master 1536×1024) phủ đúng box; MU GPT 2K (master 2048×1360) phủ hết chiều rộng, contain (~1 px dải), không crop; item ở trạng thái Ready, không lỗi
- **Object / feature:** order/place-personalized-order-storefront (liên quan: sdk)
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer đặt đơn / store owner xử lý đơn; api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb), kết quả [AI], 2026-10-27
- **Locator:** QA-3435 TC-29 PASS 2026-10-27, staging, build không ghi lại. bbox, kích thước master là số đo một lượt chạy, không phải giá trị chuẩn (CCR cũ: CBS-024 CLAIM-18)
- **Căn cứ expected:** KHÔNG CÓ
- **Trích nguyên văn:**
  ```
  TC-29 | ✅ AI — order design uses the generated image, fitted to the layer box | #<id>: T2I gpt Default → master 1536×1024, design bbox (83,83)-(827,579) = box (82.7,82.7)-(827,578.9); MU-G gpt 2K → master 2048×1360 (ratio 1.506), bbox (83,84)-(827,578): full width, height 494 vs 496 (contain, ~1 px band), no crop; both Ready, `error_message null`
  ```

### CLAIM-08

- **Statement:** Order design PNG (Re-generate sau fix) của các vector layer đã recolor có SVG trùng clipPath id tô kín màu mọi vector, không vùng trong suốt, bố cục giống preview storefront.
- **Object / feature:** order/MỚI: order-design-vector-render — Thuộc: order design PNG và SVG của vector layer có màu (tô màu, id trong file gộp, tham chiếu); Không thuộc: preview storefront (sdk/storefront-buyer-facing), file SVG nguồn (artwork/layer-config-vector), luồng Regenerate design và fulfillment (order/review-and-initiate-fulfillment-portal) (liên quan: artwork)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff xử lý đơn (Re-generate design), api (order design)
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb, kết quả AI do máy chạy), 2026-10-08
- **Locator:** QA-3394 TC-20, result_QA-3394_existing-templates_2026-10-08.md, staging, không ghi số build portal/SDK; trạng thái deploy TIB-5350 không ghi. Campaign chỉ có 1 Color option chung, chỉ chứng minh khi các layer cùng màu; "mỗi layer giữ màu riêng" chưa kiểm (TC-01, TC-03 ⏸️). Đối chiếu artwork/layer-config-vector KB-418: fixture chỉ có static-vector báo "Line item cannot generate design" ở PNG_RGB, fixture TC-20 có thêm Word Cloud. (CCR cũ: CBS-031 CLAIM-04)
- **Căn cứ expected:** KHÔNG CÓ
- **Trích nguyên văn:**
  ```
  TC-20 | ✅ AI — order design PNG ([đã bỏ id], 37×52, regenerate sau fix, PNG_RGB) tô kín mọi vector, không vùng trong suốt, bố cục giống preview storefront | design `[đã bỏ id].png` 3552×4992; vùng 69/70/76/77/74 kín màu xanh của order | evidence/pass_TC-20_[đã bỏ id]_png.png · order chỉ có 1 màu chung (A=B)
  ```

### CLAIM-09

- **Statement:** Việc order design PNG áp đúng clipPath giống preview thuộc ticket riêng TIB-5350 (hỗ trợ clipPath khi chuyển SVG sang ảnh), không phải code của TIB-5501.
- **Object / feature:** order/MỚI: order-design-vector-render — Thuộc: order design PNG và SVG của vector layer có màu (tô màu, id trong file gộp, tham chiếu); Không thuộc: preview storefront (sdk/storefront-buyer-facing), file SVG nguồn (artwork/layer-config-vector), luồng Regenerate design và fulfillment (order/review-and-initiate-fulfillment-portal) (liên quan: artwork)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff xử lý đơn, api (order design)
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chauptm), 2026-10-08
- **Locator:** Jira TIB-5501 comment 53757, trả lời Q1 của QA (comment 53673, 2026-10-07). Chỉ xác nhận clipPath PNG thuộc TIB-5350, không nói gì về hành vi hay trạng thái deploy của TIB-5350. (CCR cũ: CBS-031 CLAIM-05)
- **Trích nguyên văn:**
  ```
  Hỏi (QA, comment 53673, 2026-10-07): "For the reported SVGs (colored vector layers relying on clipPath), what is the expected order design in PNG format: identical to the preview, or is the clipPath limitation still expected there?"
  Đáp: @phuongbb Q1 resolved in issue https://ownego.atlassian.net/browse/TIB-5350
  ```

### CLAIM-10

- **Statement:** Order design định dạng SVG (mọi layer gộp vào 1 file) có mọi id duy nhất trên toàn file, đều mang prefix svg-…-, 0 tham chiếu treo, cùng một id gốc xuất hiện dưới nhiều prefix khác nhau và màu đúng.
- **Object / feature:** order/MỚI: order-design-vector-render — Thuộc: order design PNG và SVG của vector layer có màu (tô màu, id trong file gộp, tham chiếu); Không thuộc: preview storefront (sdk/storefront-buyer-facing), file SVG nguồn (artwork/layer-config-vector), luồng Regenerate design và fulfillment (order/review-and-initiate-fulfillment-portal) (liên quan: artwork)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff xử lý đơn, api (order design)
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb, kết quả AI do máy chạy), 2026-10-08
- **Locator:** QA-3394 TC-21, result_QA-3394_existing-templates_2026-10-08.md, staging, không ghi số build portal/SDK; file design render 2026-10-07, đã có prefix nên sau fix. Campaign chỉ có 1 Color option chung, chỉ chứng minh khi các layer cùng màu; "mỗi layer giữ màu riêng" chưa kiểm (TC-01, TC-03 ⏸️). (CCR cũ: CBS-031 CLAIM-06)
- **Căn cứ expected:** Dev summary, chauptm, Jira TIB-5501 comment 2026-09-29 (khi có màu, SVG gộp vào 1 SVG output ở vectorize, mọi id được thêm prefix)
- **Trích nguyên văn:**
  ```
  TC-21 | ✅ AI — order design SVG ([đã bỏ id], render 2026-10-07): mọi id duy nhất toàn file, đều prefix, không ref treo, màu đúng | `[đã bỏ id].svg`: 236 id / 236 unique, dup 0, 236 có prefix `svg-xxxxxxxx-`, 61 ref → dangling 0; `clipPath18` 4 biến thể `svg-020p6log-`, `svg-yjsfiutd-`, `svg-u3s3f54u-s75-`, `svg-r8ry74n4-s74-`; fill `#E40909` ×20
  ```
