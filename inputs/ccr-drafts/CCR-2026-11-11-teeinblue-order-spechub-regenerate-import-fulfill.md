# Context Change Request: order-spechub-regenerate-import-fulfill — đối chiếu spec-hub cho regenerate design, import đơn Shopify, gộp request fulfillment

- **Product:** `teeinblue`
- **Object:** `order`
- **Ticket:** không có
- **Các khối có trong file:** `A`

## Mức độ gấp

`LOW` — làm giàu bằng chứng cho các quan sát đã có, không phát hiện mâu thuẫn nghiêm trọng; CLAIM-05 cần Dev xác nhận tên setting. Người gửi: operator, qua `mcp__spec-hub__ask` ngày 2026-11-11 (log_id 159, 160, 161).

## Khối A — Hành vi

### CLAIM-01

- **Statement:** Order giữ nguyên artwork version lúc shopper personalize; sửa/restore artwork sau đó không đổi design của order đã đặt. Regenerate design render theo version đã dùng, không theo version hiện tại, trừ khi merchant chủ động chọn "upgrade" artwork version cho order đó.
- **Object / feature:** order/edit-customization-after-order
- **Quan hệ với canon:** `ADD` (củng cố KB-779, KB-780 — LOW)
- **Scope:** owner (merchant), portal (Order detail, Edit customization)
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** S2 (`qa_rule_ref`) — chỉ có `sources: [{kind: code}]` + 1 doc nội bộ không có ngày tác giả rõ, không có Jira
- **Mã rule:** `spec-hub:design-generation-artwork-version`, `spec-hub:artwork-versions-orders-keep-version`
- **Người sở hữu (vai trò):** code (spec-hub đọc trực tiếp source code + doc `teeinblue-api/.ai/domain-business/recover-order-design.md`)
- **Ngày ghi nhận:** 2026-11-11 (ngày truy vấn spec-hub)
- **Nơi mở lại được:** spec-hub `mcp__spec-hub__ask` log_id=160, rule id `design-generation-artwork-version` (feature `design-generation`) và `artwork-versions-orders-keep-version` (feature `artwork-versions`)
- **OQ:** không có — chỉ làm giàu quan sát đã có.
- **Trích nguyên văn:**
  ```
  design-generation-artwork-version: "Designs are rendered from the artwork version the shopper personalized, not the artwork's current version, unless the merchant chooses to upgrade when re-generating."
  artwork-versions-orders-keep-version: "An order's personalization keeps the artwork version it was made with. Editing or restoring the artwork later does not change designs of orders already placed; the merchant can choose to upgrade an order's design to the latest version from Orders."
  ```

### CLAIM-02

- **Statement:** Khi design file đã được tạo/lưu, item chuyển sang Ready nếu đang ở trạng thái active/personalized và mọi design đã xong; item đã fulfilled/trạng thái khác giữ nguyên trạng thái, không bị kéo lùi về Ready khi regenerate.
- **Object / feature:** order/review-and-initiate-fulfillment-portal
- **Quan hệ với canon:** `ADD` (củng cố KB-393 — LOW)
- **Scope:** owner (merchant), portal (Orders list)
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `dev_doc`
- **Người xác nhận, ngày nguồn:** spec-hub, đối chứng Jira TIB-4641 (2026-01-16, "Keep the current order item status when re-generating the design file")
- **Locator:** spec-hub `mcp__spec-hub__ask` log_id=160, rule id `design-generation-ready` (feature `design-generation`), `sure: green`
- **OQ:** không có.
- **Trích nguyên văn:**
  ```
  design-generation-ready: "When a design file is saved, the item becomes ready to fulfill if it was active or personalized and all its designs are finished. ... An item already fulfilled in Shopify gets its design re-generated: it stays fulfilled and does not move back to Ready."
  ```

### CLAIM-03

- **Statement:** Khi order Shopify thiếu personalization id trên line item (do theme xoá mất), Teeinblue tìm lại bằng cách khớp personalization tạo trong cùng cart, cùng variant, trong vòng 1 tháng dương lịch trở về trước; mỗi personalization chỉ dùng cho 1 item, và nếu shopper personalize cùng variant nhiều lần trong cùng cart thì không hứa chọn đúng lần nào.
- **Object / feature:** order/shopify-order-import
- **Quan hệ với canon:** `ADD` (làm giàu chi tiết cho KB-762, KB-763 — LOW, mô tả chung "khôi phục qua cart token")
- **Scope:** owner (merchant), api (order sync)
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `dev_doc`
- **Người xác nhận, ngày nguồn:** spec-hub, đối chứng Jira TIB-2579 (2024-05-15, "[SDK] Shopify product - using cart token to improve missing customization id")
- **Locator:** spec-hub `mcp__spec-hub__ask` log_id=161, rule id `order-sync-match-personalization` (feature `order-sync`), `sure: green`
- **OQ:** không có.
- **Trích nguyên văn:**
  ```
  order-sync-match-personalization: "Teeinblue finds the shopper's personalization from the personalization id saved on the ordered item. ... Only if no item in the order has an id, it looks for personalizations made in the same cart for the same variants within the last month (one calendar month back); there, each personalization is used for one item only, and if the shopper personalized the same variant more than once, which one is used is not promised."
  ```

### CLAIM-04

- **Statement:** Khi Confirm & Send gửi fulfillment, item được nhóm theo print provider rồi theo order (hoặc theo địa chỉ giao hàng nếu store gộp đơn theo địa chỉ); mỗi nhóm gửi thành một provider order riêng. Đơn có nhiều provider khác nhau sẽ tách thành nhiều request, mỗi provider một request.
- **Object / feature:** order/fulfillment-provider-request
- **Quan hệ với canon:** `ADD` (củng cố KB-777 — LOW, "Đơn nhiều provider tách một request cho mỗi provider")
- **Scope:** owner (merchant), portal (Bulk fulfill)
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** S2 (`qa_rule_ref`) — chỉ có `sources: [{kind: code}]`, không có Jira/ngày
- **Mã rule:** `spec-hub:bulk-fulfill-grouping`
- **Người sở hữu (vai trò):** code (spec-hub đọc trực tiếp source code teeinblue-api)
- **Ngày ghi nhận:** 2026-11-11 (ngày truy vấn spec-hub)
- **Nơi mở lại được:** spec-hub `mcp__spec-hub__ask` log_id=159, rule id `bulk-fulfill-grouping` (feature `bulk-fulfill`)
- **OQ:** NEEDS_CONFIRMATION — liên quan CLAIM-05 dưới đây về tên setting "order_combine_by" mà KB-776 nhắc tới.
- **Trích nguyên văn:**
  ```
  bulk-fulfill-grouping: "Confirm & Send groups items by print provider and then by order, or by shipping address when the store combines orders by shipping address. Each group is sent as one provider order..."
  ```

### CLAIM-05

- **Statement:** (Làm rõ, không phải claim hành vi mới) KB-776 hiện ghi "Gộp line item cùng provider thành một request khi order_combine_by = 1" — spec-hub không xác nhận có setting tên chính xác "order_combine_by"; chỉ nói chung "khi store combines orders by shipping address". Cần Dev xác nhận tên cờ/setting thật trong code.
- **Object / feature:** order/fulfillment-provider-request
- **Quan hệ với canon:** `UNKNOWN` (không SUPERSEDES, không CONTRADICTS rõ — chỉ là câu hỏi làm rõ danh xưng)
- **Scope:** owner (merchant), api/config
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** không có — đây là ghi nhận câu hỏi, không phải claim hành vi
- **Locator:** đối chiếu KB-776 hiện có với spec-hub rule `bulk-fulfill-grouping` (log_id=159)
- **OQ:** NEEDS_CONFIRMATION — Tên setting thật để gộp line item cùng provider/cùng địa chỉ thành một request là gì (`order_combine_by` hay tên khác)? — Người trả lời: Dev.
- **Trích nguyên văn:** không áp dụng (câu hỏi làm rõ, không trích nguồn)
