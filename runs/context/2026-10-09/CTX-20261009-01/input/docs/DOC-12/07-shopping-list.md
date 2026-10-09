<!-- testlane knowledge KB-353 · kind=feature-profile · tag=Shopping List · status=draft · sourceUrl=https://github.com/ownego/qa-knowledge-work/blob/37e6ec5b0083026b736655f8335f2f684bcbb060/kb/DUOS/features/07-shopping-list.md · createdAt=2026-10-08T07:50:20.349Z · updatedAt=2026-10-08T10:44:17.584Z -->

# 7. B2B Shopping List

**Status:** draft

Phân tích ngày 2026-10-07 từ Jira DUOS-81 (Epic), DUOS-62, 84, 86, 218, 254,
299, 306, 341, 358, 368, 382, 391, 395, 396 (description + comment), DUOS-308
(notification) và `references/apps/DUOS-shopping-list.md` (tách từ
`DUOS.md` § 2 mục 4 ngày 2026-10-08). **Chưa có task QA Hub
riêng**; nhiều ticket chỉ có ảnh hoặc trống. Đã đối chiếu inventory
2026-10-08 (store `stg-duos-plus-2`, Free plan) — phần ✅/🟡/❌ xem
`inventory/DUOS.md` (§ 2.14, 2.19, 2.20). Trang cài đặt Portal + "Manage
shopping lists" đã quan sát thật; store có **0 shopping list** → list
detail, "Copy link", Customer Account và storefront **chưa verify**.

## Purpose

Buyer B2B tạo danh sách sản phẩm (variant + số lượng) đã lưu để reorder hoặc
gửi cấp trên duyệt: Junior Buyer "Submit for Approval" → Senior Buyer/Admin
duyệt → tạo order. Module trả phí "B2B Shopping List". Dữ liệu lưu dạng
Shopify metaobjects (DUOS-290).

## Business Rules

### Status

- 4 status: "Draft", "Waiting for Approval", "Approved", "Rejected". Draft sửa
  được tới khi submit; Waiting for approval / Approved buyer không sửa được;
  Approved tạo order trực tiếp; Rejected không update / re-submit được, muốn
  làm lại thì duplicate thành draft mới. — DUOS-86 description (ghi
  "_updating…_", chưa hoàn tất). Theo ticket.
- Tên status chờ duyệt: DUOS-86 / references dùng "Waiting for Approval",
  DUOS-382 / DUOS-395 / DUOS-308 dùng "Pending" / `pending` → tên trên UI
  `Need confirm`.
- Status "Re-order" + tab lọc list có reminder (field metaobject `reminder`) —
  DUOS-391 (GrowerHouse); global hay chỉ custom app → `Need confirm`.

### Quyền theo role

- Admin / member có quyền approve + create order from shopping list: không
  hiện nút submit trên draft; Junior buyer: không hiện nút approve; trang
  danh sách thay cột "location" bằng "created by". — DUOS-86 comment Ashley
  (PO) 2025-05-09.
- Junior Buyer, list ở Pending hoặc Approved: disable Delete, tăng/giảm số
  lượng, "Edit Shopping list name", search product, "Add more line", "Upload
  CSV/Load Catalog". — DUOS-395 description (Done 2026-05-20).
- Approver lưu `{ customerId, name }`; biến email `{shopping_list_approver}`
  chỉ có trong template "ShoppingListApproved". — DUOS-368 description.

### Re-approval sau mỗi order (DUOS-382, Done 2026-05-18)

- Bật checkbox trong Shopping list settings (label chỉ có trong ảnh) → sau khi
  đặt order từ list Approved, list **tự về "Pending"** ngay khi order được
  submit (không đợi paid / fulfilled); lần sau phải duyệt lại. — DUOS-382
  description (Pablo xác nhận 04/2026).
- Label thật của checkbox: "Reset approved list to pending after order
  submission", help "Applies to junior buyers and any role without shopping
  list approval permission." + "Learn more"; store `stg-duos-plus-2` đang
  tắt. — quan sát staging 2026-10-08 (inventory/DUOS.md § 2.14).
  ⚠ Lệch staging 2026-10-08: help text giới hạn re-approval cho "junior
  buyers and any role without shopping list approval permission" — rule
  DUOS-382 không nêu giới hạn role (inventory/DUOS.md § 5 #25) — Need
  confirm (list do Senior/Admin đặt order có bị reset không).
- Order gắn note_attributes `duos_shopping_list_id`. — haild 2026-04-28.
- List về Pending → **pause reminder, giữ frequency**; approve lại → reminder
  resume; gửi lại mail cho Senior + Admin. — Ashley (PO) + haptt 2026-04-29.
  Đã chốt PO/Dev trong comment.

### Portal — "Shopping list settings" (quan sát staging 2026-10-08)

- inventory/DUOS.md § 2.14 (chưa có business rule — § 5 #26):
  - "Save products to shopping list from" checkbox {"Product page",
    "Collection page"} (store: cả hai tắt).
  - "Action after customer's create order" radio {"Add to cart", "Go to
    checkout"} (store: "Go to checkout"). ⚠ Lệch staging 2026-10-08: **không
    có "Create draft order"** như CSV/SKU — rule "Action after customer
    create order có lựa chọn Create draft order" không áp cho Shopping list
    (inventory/DUOS.md § 5 #23) — Need confirm là chủ đích.
  - "Allow customers to save cart as Shopping List" ("Create the saved list
    from all items in the cart") — tắt.
  - "Reset approved list to pending after order submission" — xem mục
    Re-approval.
  - "Customer account settings": "Add "Shopping List" page", "Add "Shopping
    List" to main menu".
- Nút header "Manage shopping lists" → bảng company ("Company" · "Locations"
  · "Action") → company › tab "Location", cột "Locations" · "Number of
  shopping list" · "Action" — đây là bề mặt "quản lý shopping list từ Portal"
  (DUOS-254) đang có trên staging.
- Không thấy setting reminder (DUOS-341) trên trang này — có thể chỉ ở
  custom app GrowerHouse; reminder bật ở đâu chưa rõ (inventory/DUOS.md
  § 5 #26).

### Thêm vào list / cart

- Add product vào shopping list từ PLP và PDP (DUOS-299, Ironwear).
- Quick ATC từng item trong list (DUOS-306, Ashley 2026-01-20) và add cả list
  vào cart (DUOS-334).
- Nút "Save to shopping list" cho khách DTC / chưa login / B2B không quyền:
  chỉ hiện khi có custom script `showShoppingListForDTC: true` **và** đã bật
  setting trong Portal; hàm `onSaveToShoppingListForDTC` chạy khi click. —
  DUOS-358 description. Tên setting Portal `Need confirm`.

### Reminder re-order (DUOS-341, GrowerHouse custom app)

- Setting: bật/tắt reminder, tần suất, các action Pause/Resume, Skip next,
  View upcoming, Reschedule; email có CTA tới checkout; order đặt từ list có
  reminder gắn tag. — DUOS-341 description. Áp cho custom app.

### Shareable link (DUOS-396, QA Review)

- Merchant tạo list hộ khách, nút "Copy link" ở header. **Corrected:**
  description nói link mở list trong Customer Account; chốt cuối Ashley (PO)
  2026-06-22: link **đến checkout page**. Description chưa cập nhật.

### Notification

- "Shopping list pending approval" (gửi Admin + Senior buyer khi Junior bấm
  "Submit for approval") và "Shopping list approved" (gửi người tạo) — toggle
  trong trang Notifications, template sửa được. — DUOS-308. Xem
  [09-notifications.md](09-notifications.md).

## Edge Cases

- Junior Buyer ở Draft / Rejected: nút nào bật? `Need confirm` (DUOS-395 không nói).
- Checkbox re-approval: label đã có (quan sát staging 2026-10-08, xem trên);
  store `stg-duos-plus-2` đang tắt nhưng chưa rõ đó là mặc định khi cài mới
  hay đã bị đổi — `Need confirm`.
- Re-approval khi order bị edit / cancel / refund? `Need confirm` (GAP-02 task
  DUOS-006).
- Reschedule áp cho mọi reminder sau hay chỉ lần kế? `Need confirm` (DUOS-341).
- Lý do accept/reject shopping list (DUOS-218) bắt buộc không, tên field?
  `Need confirm` (ticket trống).
- Quản lý shopping list từ Portal (DUOS-254) — staging 2026-10-08 có trang
  "Manage shopping lists" (company › location › "Number of shopping list");
  list detail chưa xem được (0 list). Hành vi trong list detail `Need confirm`.
- Lệch staging 2026-10-08 chờ chốt: inventory/DUOS.md § 5 #23 (Shopping list
  không có "Create draft order"), #25 (phạm vi role của re-approval) — xem
  dòng ⚠ ở Business Rules.
- Share junior-to-junior (DUOS-282), view/checkout từ online store
  (DUOS-281), export sang quotation (DUOS-82) — To Do.

## Testability Notes

- haptt (2026-04-29): "QA cần check qua full luồng về SL (mail, reminder …,
  create, update, delete, filter by status)" khi đụng re-approval.
- Recurring reminder cần Dev trigger thủ công trên staging (GAP-04 task DUOS-006).
- Nhiều tính năng chỉ có trên custom app (Ironwear, GrowerHouse) — xác định
  store test đã cài đúng app.

## Known Issues

Xem [known-issues.md](../known-issues/known-issues.md), tag `shopping-list`.

## Related Jira Tickets

- [DUOS-81](https://ownego.atlassian.net/browse/DUOS-81) — Shopping List, Epic (To Do) — trống.
- [DUOS-62](https://ownego.atlassian.net/browse/DUOS-62) — Shopping Lists, Story (Done) — định nghĩa.
- [DUOS-86](https://ownego.atlassian.net/browse/DUOS-86) — Shopping lists status, Story (Done) — 4 status.
- [DUOS-368](https://ownego.atlassian.net/browse/DUOS-368) — Shopping list approver, Story (Done).
- [DUOS-382](https://ownego.atlassian.net/browse/DUOS-382) — Re-approval after each submission, Story (Done).
- [DUOS-395](https://ownego.atlassian.net/browse/DUOS-395) — Disable button in Shopping list for Junior buyer, Story (Done).
- [DUOS-396](https://ownego.atlassian.net/browse/DUOS-396) — Shareable link for shopping list, Story (QA Review).
- [DUOS-341](https://ownego.atlassian.net/browse/DUOS-341) / [DUOS-391](https://ownego.atlassian.net/browse/DUOS-391) — reminder re-order + filter (GrowerHouse), Story (Done).
- [DUOS-358](https://ownego.atlassian.net/browse/DUOS-358) — Show `Save to Shopping list` button to DTC customers, Story (Done).
- [DUOS-299](https://ownego.atlassian.net/browse/DUOS-299), [DUOS-306](https://ownego.atlassian.net/browse/DUOS-306), [DUOS-254](https://ownego.atlassian.net/browse/DUOS-254), [DUOS-218](https://ownego.atlassian.net/browse/DUOS-218), [DUOS-84](https://ownego.atlassian.net/browse/DUOS-84) — Story (Done), gần như không có requirement text.
- [DUOS-392](https://ownego.atlassian.net/browse/DUOS-392) — [Ironwear] Add items from Shopping List to cart - items not added correctly, Bug (Done) — không đọc chi tiết.

## Source

- Jira DUOS (Atlassian MCP), đọc 2026-10-07; `references/apps/DUOS.md`.
- `knowledge-work/inventory/DUOS.md` (build 2026-10-08) § 2.14, § 5 #23, #25, #26.
