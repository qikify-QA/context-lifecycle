<!-- testlane knowledge KB-354 · kind=feature-profile · tag=Finance & Credit · status=draft · sourceUrl=https://github.com/ownego/qa-knowledge-work/blob/18e5531b0531cc8ed211d45de290a9aecfdf837c/kb/DUOS/features/08-finance-credit.md · createdAt=2026-10-08T07:50:50.594Z · updatedAt=2026-10-08T09:38:00.665Z -->

# 8. B2B Finance & Credit

**Status:** draft

Phân tích ngày 2026-10-07 từ Jira DUOS-7 (Epic Finance & payment), DUOS-200
(Epic Company credit limit), DUOS-201, 204, 205, 206, 238, 244, 246, 310, 397,
398, DUOS-423 (Epic Monthly statement), `references/apps/DUOS.md` § 2 mục 5
(docs 09/07/2026) và bản phân tích task QA Hub DUOS-006 (regression ledger).
**Chưa có task QA Hub riêng**. Đã đối chiếu inventory 2026-10-08 (store
`stg-duos-plus-2`, Free plan) — phần ✅/🟡/❌ xem `inventory/DUOS.md` (§ 2.5,
2.6, 2.18, 2.19, 2.21). Trang Portal "Credit management" / "Finance &
payment" đã quan sát thật; store **0 transaction** → ledger có dữ liệu,
Customer Account "Finance & credit" và chặn checkout **chưa verify**.

## Purpose

Merchant đặt credit limit cho company / location; app theo dõi Outstanding
balance và Available credit theo order net-term; buyer xem trong Customer
Account; checkout / draft order bị chặn khi vượt hạn mức (phần chặn checkout
chỉ Shopify Plus). Kèm Finance & payment overview + financial ledger. Module
trả phí "B2B Finance & Credit".

## Business Rules

### Công thức & phạm vi

- `Available credit = Credit limit − Outstanding balance`; 3 loại transaction
  `Purchased` (order net term), `Reimbursed` (trả invoice), `Reverted` (huỷ
  order). — references/apps/DUOS.md (docs); DUOS-201 `operation_type`.
- **Chỉ áp payment term Net 7/15/30/45/60/90**; không áp Due on fulfillment /
  Due on receipt / Due on fixed date — limitation đã biết, không phải bug. —
  references/apps/DUOS.md (docs); DUOS-201 comment haptt 2025-09-23 "Chỉ hỗ
  trợ Net".
- Edit order trong Shopify admin → 1 transaction revert giá cũ + 1 purchased
  giá mới, reference có thông tin order. — DUOS-201 comment thuongnth 2025-09-10.
- Giới hạn chốt (haptt 2025-09-23/25): order đã cancel / paid thì không hỗ trợ
  bước tiếp theo; edit order phải đổi outstanding kể cả khi xoá hết line mà
  còn payment_pending (tax, ship); **chưa hỗ trợ đổi payment_term** trong
  order (Shopify không có hook).

### Portal — "Credit management" (DUOS-204)

- Trang description "Monitor and manage B2B credit accounts, track outstanding
  balances across your B2B clients."; cột "Company", "Locations", "Total
  credit limit"; nút "+ Add company" (modal chọn nhiều, company đã add không
  hiện); chưa gán → "-". — DUOS-204 description.
- Modal "Add credit limit", label "Credit limit per location of [Company
  name]", helptext "This amount will be assigned as the individual credit
  limit for each of the company's locations." — áp cho mọi location, ghi đè. —
  DUOS-204.
- Empty state "No B2B company found" — thuongnth 2025-09-15.
- Company detail: cột "Locations" (ticket ghi: "Location"), "Credit limit",
  "Available credit", "Outstanding balance". Location detail: bảng "Date",
  "Operation", "Credit change", "Outstanding balance", "Available credit",
  "Credit Limit", "Reference"; Operation "Purchased" / "Reimbursed" /
  "Reverted"; nút "Download statement" (ticket ghi: "Download statements").
  Tooltip "Available credit": "The amount of unused credit left (Available
  Credit = Credit Limit - Outstanding Balance)". — DUOS-204; label cột +
  nút sửa theo quan sát staging 2026-10-08 (inventory/DUOS.md § 2.5).
- Quan sát staging 2026-10-08 (inventory/DUOS.md § 2.5): header "Credit
  management" — "Monitor and manage B2B credit accounts, track outstanding
  balances, and assess credit risk across your customer" (ticket ghi: "…track
  outstanding balances across your B2B clients."); tab "Company"; bảng
  checkbox "Select all companies", cột "Company" · "Locations" · "Total
  credit limit" · "Action"; **liệt kê sẵn mọi company Shopify** (Snowdevil,
  Powderbound — "-"); company detail: "Credit limit" là **ô sửa inline
  (spinbutton)**; location detail: 3 thẻ "Available credit" / "Outstanding
  balance" / "Credit limit", empty "No transactions found". Store Plus nên
  không thấy banner "Shopify Plus required for this feature".
  ⚠ Lệch staging 2026-10-08: **không có nút "+ Add company"** và modal "Add
  credit limit" ("Credit limit per location of [Company name]") như DUOS-204
  — credit limit gán bằng ô inline từng location ở company detail; rule "áp
  cho mọi location, ghi đè" chưa thấy trên UI (inventory/DUOS.md § 5 #16) —
  Need confirm flow gán credit hiện tại với Dev.
- Store non-Plus: banner "Shopify Plus required for this feature" dưới bảng
  company ("Blocking checkout based on credit limit availability uses
  Shopify's Checkout Extensibility…"). — DUOS-381.

### Customer Account — "Finance & credit" (DUOS-205)

- Chỉ buyer thuộc location **đã gán credit limit** mới thấy nội dung; overview
  "Credit limit", "Available credit", "Used credit"; bảng "Date",
  "Operations", "Credit change", "Available credit", "Credit limit"; show/hide
  history + download statement. — DUOS-205 description. Theo ticket.
- Finance & payment overview (DUOS-238, 244): full page + 2 block "Account
  overview", "Payment overview" ở trang Orders; có permission "View the list
  of orders that all customers have placed" → chọn xem cá nhân / mọi member,
  filter đặt 1 lần trên cùng áp cho mọi block. — thuongnth 2025-11-06/12.
  Portal section title "Finance & payment overview".

### Chặn checkout / draft order

- DUOS-206 (2025): checkout extension so cart total với available credit khi
  chọn "Net terms", banner "Order value has exceed your company available
  credit." / "Please reduce your order size or pay your outstanding balance to
  avoid any disruptions in the future".
- **Corrected bởi DUOS-397 (Done 2026-06-21):** dùng Shopify Function
  (Validation API) chạy ở Cart / Checkout / CreateDraftOrder; **bỏ validate ở
  block Checkout extension cũ** (haild 2026-05-20). Draft order vượt credit →
  banner "This order has exceeded this location available credit. Available
  credit: [X] / Credit limit: [Y]"; Function được thêm khi merchant edit
  credit limit lần đầu; cần approve thêm scope ở portal; chỉ áp cho location
  có credit limit active. Text ở checkout storefront hiện tại → `Need confirm`.
- Admin UI block trên trang Company / Location (Shopify admin): chỉ hiển thị,
  không edit; location không có limit → "No credit limit has been assigned to
  this company yet." — DUOS-398 comment thuongnth 2026-05-28.
  ⚠ Lệch staging 2026-10-08: trang location Snowdevil (target
  `admin.company-location-details.block.render`) block **không render gì**;
  console 404 `staging-api.getduos.io/api/admin-extensions/company-locations/<id>`
  + "Error fetching credit info: No query results for model
  [App\Models\CompanyLocation]."; trang company không thấy block Duos
  (inventory/DUOS.md § 2.18, § 5 #17) — Need confirm (bug hay do store Free /
  location chưa sync DB); xem known issues.

### Portal — "Finance & payment" (quan sát staging 2026-10-08)

- Trang "Finance & payment" (row hub "Finance & payment"), "Which data to
  display:" — 5 checkbox (store: tất cả bật): "Account overview" ("Including:
  Order count, Total payments & Total purchases"), "Payment overview"
  ("Including: Due amount, Due date & Total outstanding"), "Credit limit
  overview" ("Including: Available credit, Credit limit & Used credit"),
  "Order history" ("Show all order history with payment status and quick
  payment link"), "Financial ledger" ("Show chronological log of every order
  transaction"); "Customer account settings": "Active Finance & payment
  overview extension" ("Watch tutorial", "Open theme editor"). Chưa có
  business rule cho trang này (inventory/DUOS.md § 2.6, § 5 #31).

### Financial ledger (DUOS-246)

- Webhook `orders/create`, `orders/edited`, `orders/cancelled`,
  `refunds/create`, `orders/paid`; lưu MongoDB; ledger ghi "Order created",
  "Payment received", "Order edited", "Order refund", "Order cancelled". —
  DUOS-246 description + thuongnth 2025-11-06.

### Notification

- Low credit (< 20% tổng limit) → email nội bộ, toggle "Alert for “Low
  available credit” company"; credit limit được set → email cho Admin của
  location, toggle "Credit limit assigned to a company location". — DUOS-310.
  Xem [09-notifications.md](09-notifications.md).

### Monthly statement (DUOS-423, Epic To Do)

- 1 statement / location / tháng, gồm order **pending** giữa 2 ngày chốt sổ
  merchant đặt; status "Draft" → "Issued" → "Received"; Issue gửi email + PDF;
  Mark received chuyển order sang paid. — DUOS-423 description. Đề xuất Dev
  (haptt 2026-09-22) chưa được PO chốt → toàn bộ `Need confirm`.

## Edge Cases

- Tên Operation lệch giữa Portal ("Purchased"/"Reimbursed"/"Reverted"), CA
  ("Order purchased"/"Invoice paid"/"Credit allocated"/"Order canceled"/"Credit
  updated") và ledger — tên UI thật `Need confirm`.
- "Used credit" (CA) = "Outstanding balance" (Portal) — cùng số, khác nhãn.
- Cart total = available credit đúng bằng → chặn hay cho? `Need confirm`.
- Merchant chưa approve scope cho Function thì sao? `Need confirm`.
- Low credit đúng 20% có gửi; chống gửi lặp mỗi order; mail gửi tới đâu?
  `Need confirm` (DUOS-310).
- Ledger có loại đơn test không (`test` flag)? `Need confirm` (DUOS-246).
- Ledger bắt đầu ghi khi bật config hay luôn ghi? `Need confirm` (DUOS-244
  câu hỏi haptt chưa trả lời).
- Webhook tên không thống nhất giữa ticket (`orders/cancel`, `orders/updated`,
  `orders/cancelled`) — chỉ ảnh hưởng tài liệu.
- Hạn chế sửa net terms của order sau khi đặt (khuyến nghị docs).
- Lệch staging 2026-10-08 chờ chốt: inventory/DUOS.md § 5 #16 (không có "+
  Add company", gán inline), #17 (Admin UI block không render) — xem dòng ⚠
  ở Business Rules.

## Testability Notes

- Chặn checkout cần Shopify Plus. Test credit theo từng payment term.
- Store `stg-duos-plus-2` (2026-10-08): Free plan, "Credit limit" / "Finance
  & payment" Inactive, storefront có password, không có tài khoản buyer →
  chưa test được chặn checkout / Customer Account (inventory/DUOS.md § 5 #30).
- Mở trang "Credit management" có console `TypeError: Cannot read properties
  of null (reading 'field')` (ExtensionBundle) — inventory/DUOS.md § 2.5,
  chưa đánh giá ảnh hưởng.
- Webhook → ledger là bất đồng bộ (Horizon); quan sát sau khi job xong.
- Assign credit to each customer (DUOS-259), đổi currency (DUOS-260), alert
  buyer (DUOS-220), sync ERP (DUOS-336) — To Do.

## Known Issues

Xem [known-issues.md](../known-issues/known-issues.md), tag `finance-credit`.

## Related Jira Tickets

- [DUOS-7](https://ownego.atlassian.net/browse/DUOS-7) — Finance & payment, Epic (To Do).
- [DUOS-200](https://ownego.atlassian.net/browse/DUOS-200) — Company credit limit, Epic (To Do) — luồng webhook.
- [DUOS-201](https://ownego.atlassian.net/browse/DUOS-201) — [BE] Credit limit, Story (Done) — API, giới hạn.
- [DUOS-204](https://ownego.atlassian.net/browse/DUOS-204) / [DUOS-205](https://ownego.atlassian.net/browse/DUOS-205) / [DUOS-206](https://ownego.atlassian.net/browse/DUOS-206) — FE Portal / CA / Checkout, Story (Done).
- [DUOS-397](https://ownego.atlassian.net/browse/DUOS-397) — Checkout rules to validate credit on draft order, Story (Done) — thay DUOS-206.
- [DUOS-398](https://ownego.atlassian.net/browse/DUOS-398) — Admin UI Block on the Company / Location page, Story (Done).
- [DUOS-238](https://ownego.atlassian.net/browse/DUOS-238), [DUOS-244](https://ownego.atlassian.net/browse/DUOS-244), [DUOS-246](https://ownego.atlassian.net/browse/DUOS-246) — Finance overview + ledger (Done).
- [DUOS-310](https://ownego.atlassian.net/browse/DUOS-310) — Credit limit notification, Story (Done).
- [DUOS-423](https://ownego.atlassian.net/browse/DUOS-423) — Monthly statement, Epic (To Do).

## Source

- Jira DUOS (Atlassian MCP), đọc 2026-10-07; `references/apps/DUOS.md`;
  QA Hub task DUOS-006.
- `knowledge-work/inventory/DUOS.md` (build 2026-10-08) § 2.5, 2.6, 2.18, § 5 #16, #17, #30, #31.
