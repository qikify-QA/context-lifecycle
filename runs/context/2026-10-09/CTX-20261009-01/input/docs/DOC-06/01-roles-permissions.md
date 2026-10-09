<!-- testlane knowledge KB-347 · kind=feature-profile · tag=Roles & Permissions · status=draft · sourceUrl=https://github.com/ownego/qa-knowledge-work/blob/70dccab15a36ba7d70909ba41e0eea53f1204078/kb/DUOS/features/01-roles-permissions.md · createdAt=2026-10-08T07:47:35.640Z · updatedAt=2026-10-08T11:10:11.712Z -->

# 1. Roles & permissions (module User & Permission)

**Status:** draft

Phân tích ngày 2026-10-07 từ Jira (Epic DUOS-11 và các story DUOS-88, 89,
232, 266, 285, 372, 393, 400, 401, 402, 403, 405, 406, 407, 408, 409 — đọc
description + comment), `references/apps/DUOS-roles-permissions.md` (tách từ `DUOS.md` § 2 mục 1 ngày 2026-10-08) (đọc docs
09/07/2026), `business-rules/DUOS.md` (Shopify Flow, member sync, bulk —
cập nhật 2026-08-11) và `open-questions/DUOS.md`. Đã đối chiếu inventory
2026-10-08 (store `stg-duos-plus-2`, Free plan) — phần ✅/🟡/❌ xem
`inventory/DUOS.md` (§ 2.7, 2.8, 2.19, 2.21, 2.22). Trang Portal "Users &
permission" / "Roles & permissions" đã quan sát thật; Customer Account,
checkout extension và Shopify Flow **chưa verify** (không có tài khoản buyer,
Flow không mở). Trang Company member phía buyer tách sang
[02-company-member.md](02-company-member.md).

## Purpose

Nền tảng bắt buộc của Duos (module "User & Permission"): gán role Duos cho
member của từng company location, mỗi role mang một tập permission (đặt
hàng, shopping list, quick order, quản lý member…), map xuống contact role
của Shopify B2B (Location admin / Ordering only). Merchant quản lý role ở
Portal, buyer Admin quản lý member ở Customer Account, có thể tự động hoá
qua Shopify Flow, và enforce tại checkout (chỉ Shopify Plus).

## Business Rules

### Role mặc định và map sang Shopify

- 3 default role: **Admin** (Shopify **Location Admin**), **Senior Buyer**,
  **Junior Buyer** (cả hai **Ordering Only**). Junior Buyer không tự hoàn tất
  checkout, cần Senior/Admin duyệt (qua Shopping list); Senior Buyer mua trực
  tiếp + duyệt list người khác; Admin thêm xem mọi order, sửa billing/shipping,
  quản lý member/role. — references/apps/DUOS.md (docs 09/07/2026); DUOS-88
  comment thuongnth 2025-04-09 (chốt đổi từ "Location admin / Ordering only"
  sang Admin / Senior / Junior — **corrected** so với description DUOS-88).
  Tên hiển thị trên Portal: "Admin" / "Senior buyer" / "Junior buyer" (chữ
  thường) — quan sát staging 2026-10-08 (inventory/DUOS.md § 2.8).
  ⚠ Lệch staging 2026-10-08: modal quyền "Junior buyer" **không** có "Create
  order from CSV" / "Create order from SKU" / "Complete purchases from online
  store"; có "Create order from approved shopping list" và "Submit shopping
  list for approval"; nhóm Quotes có "Create and edit quotations" ✓ nhưng
  "View quotations" — (reference ghi Junior "tạo Shopping List/order từ CSV &
  Bulk SKU") (inventory/DUOS.md § 5 #12) — Need confirm (Junior tạo quote mà
  không xem được quote?).
- Mỗi company location **bắt buộc có ít nhất 1 Admin**. — references/apps/DUOS.md
  (docs). API đếm admin `GET company-locations/{id}/roles/admin/count` có ở
  DUOS-285 nhưng ticket không nêu chặn ở đâu / message gì → `Need confirm`.
- Nhóm permission (DUOS-88 comment thuongnth 2025-04-09): "Order history",
  "Shipping and billing", "User management", "Role management" ("will add
  later"), "Shopping list", "Quick order CSV", "Quick order SKU", "Purchase
  from online store" ("Includes adding products to the cart, proceeding to
  checkout and paying for the order"). Order history + Shipping and billing
  luôn disabled (phụ thuộc Shopify); permission của Admin không sửa được.
  Theo ticket (2025).
- Nhóm permission trên modal "<Role>'s permissions" (quan sát staging
  2026-10-08, inventory/DUOS.md § 2.8): "Order history" · "Shipping and
  billing" · "Finance & credit" · "User management" · "Role management" ·
  "Shopping list" · "CSV upload" · "Quick order" · "Quotes" · "Purchase from
  online store". So với ticket: "Quick order CSV" / "Quick order SKU" hiển
  thị thành "CSV upload" / "Quick order"; có thêm "Finance & credit" (View
  finance account / Make payments / View credit limit / View order history /
  View ledger) và "Quotes" (View quotations / Create and edit quotations /
  Create order from quotation); "Role management" đã có (ticket: "will add
  later"). "User management" và "Role management" chỉ có ở Admin — Senior /
  Junior không có nhóm này. Mọi checkbox của default role disabled. Ý nghĩa
  nghiệp vụ từng permission mới (Finance & credit, Quotes) chưa có rule chốt
  (inventory/DUOS.md § 5 #11) — Need confirm.
- Banner mô tả role (DUOS-88): Admin — "This role should be assigned to
  individuals that manage the entire Company location."; Senior Buyer — "This
  role can be used for managers that regularly make purchases on behalf of
  the business, or who oversee a team that creates purchase lists to be
  approved."; Junior Buyer — "This role is useful for employees/junior staffs
  that require approval to make purchases for the business." Theo ticket.

### Portal — card + trang "Roles & permissions" (DUOS-372, Done 2026-05-08)

- Card trong app admin đổi tên "Roles & permissions"; section "View and
  manage available buyer roles for B2B companies" với nút "Manage roles";
  section "Bulk assign admin role" giữ nguyên. — DUOS-372 description; dev
  haild xác nhận requirement 2026-04-14.
- Label thật trên Portal: trang h2 "Users & permission" (row ở B2B
  extensions hub: "Users & permissions"); khối bulk **không có tiêu đề "Bulk
  assign admin role"** (ticket ghi: "Bulk assign admin role") mà là "Apply
  admin role to:" radio {"Main contacts", "Location admin"} + "Last synced
  at: Not synced yet" + nút "Run bulk assign". — quan sát staging 2026-10-08
  (inventory/DUOS.md § 2.7).
- Trang: title "Roles & permissions", description "Manage buyer roles
  globally and customize roles to your B2B client needs", nút "Help center"
  và "Create custom role". Bảng mọi role, tab **All** (badge đếm) /
  **Default** / **Custom**; cột **Role**, **Type** (badge "Default" xám /
  "Custom" xanh lá), **Used in** ("All companies" cho default, số company
  cho custom), **Actions** (icon view cho mọi role; icon edit chỉ custom
  role). — DUOS-372.
- Default role chỉ xem; modal có banner "This is a default role. Its
  permissions are fixed and read-only. You can create a custom role based on
  this template to customize to your needs". — DUOS-372.
- "Create custom role": Role name bắt buộc; dropdown "Select based role"
  (ticket ghi: "Select base role to duplicate") mặc định Admin; checkbox
  permission kế thừa base role, sửa được. — DUOS-372; label sửa theo quan sát
  staging 2026-10-08 (inventory/DUOS.md § 2.8).
- Modal "Create custom role" bước 1 (quan sát staging 2026-10-08,
  inventory/DUOS.md § 2.8): "Role name" (placeholder "Enter role name"),
  select "Select based role" {Admin, Senior buyer, Junior buyer},
  "Description" (placeholder "Enter role description (optional)"), nút
  "Close" / "Next" (disabled khi trống) → tạo role là luồng 2 bước; bước 2
  chưa xem. Accessible name của dialog là "535" (a11y, Minor —
  inventory/DUOS.md § 5 #10).
- Publish: click ô "Used in" → modal chọn 1 hoặc nhiều company → "Used in"
  cập nhật; mở lại để thêm/bớt. — DUOS-372.
- Merchant có thể có **default role riêng** (DUOS-374: 2 default role thêm
  cho Ironwear, tên không ghi trong ticket). — DUOS-372 comment thuongnth
  2026-04-14.

### Custom config theo merchant (admin panel, không có UI Portal)

| Config | Tác dụng | Nguồn |
|---|---|---|
| `customer-permission.hideDefaultRoles: true` | Ẩn Senior/Junior ở CA + Portal | DUOS-401, haild 2026-07-24 |
| `adminRoleDisplayName: "Location admin"` | Đổi tên hiển thị Admin | DUOS-401 |
| `disableCreateRole: true` | Customer không tự tạo role | DUOS-401 |
| `enable_edit_locked_role_permissions: true` | Mở khoá permission settings trong Portal | DUOS-401 |
| `allowZeroSubtotalCheckout: true` | Cho checkout khi cart = 0 dù không có quyền mua | DUOS-403, haild 2026-07-28 |
| `hideRoleManageButton`, `roleManageLinkUrl`, `roleManageLinkLabel` | Ẩn nút quản lý role, thay bằng link help (label "How do roles work?") | DUOS-408, haild 2026-08-11 |
| `quotation.skip_reassign_on_revoke` | Không reassign quote khi revoke role | DUOS-400, haptt 2026-07-14 |

- Bộ role Ca' Pietra (DUOS-401): Main Contact (duplicate Admin → Location
  Admin), Admin (đổi tên), Ordering Only (custom, base Admin → Ordering
  Only, xem member list không sửa), View Only (custom, base Admin → Ordering
  Only, không đặt hàng). Tạo bằng **templates trong portal** (haild
  2026-07-22). **Corrected bởi DUOS-406:** "Main Contact" bị bỏ khỏi dropdown
  role, thay bằng badge "Main Contact" cho người giữ Main Contact trên
  Shopify, tự cập nhật khi đổi ở backend. Theo ticket (PASS 2026-08-18).

### Đồng bộ role ↔ Shopify contact role

- Đổi role ở CA hoặc Admin extension → map lại contact role Shopify (field
  `shopify_company_contact_role_gid`); webhook revoke role **delay 5 phút**
  rồi kiểm tra có reassign cho owner location. — DUOS-400 comment haptt
  2026-07-14. Theo ticket.
- 4 path dùng chung member-sync code: Admin extension đổi role; Customer
  Account member management; bulk "assign admin from main contact"; bulk
  member sync → luôn regression khi path này đổi. — business-rules/DUOS.md
  (DUOS-405). Đã xác nhận.
- Role template là source of truth: mỗi lần Flow action chạy, permission
  re-sync xuống **mọi** member đang giữ role đó (cả location khác). —
  business-rules/DUOS.md. Đã xác nhận (intended).

### Shopify Flow — action "assign role" (DUOS-402, DUOS-405)

- Auto-assign theo customer tag: trigger `companyContact Assigned` (chạy 1 lần
  khi customer được thêm vào location) → gán role template; location chưa có
  role thì tự create-role rồi gán; gỡ tag → về `Member`. — DUOS-402
  description. Tên role tạo từ template: "prefix baserole + name" (haild
  2026-07-15, chưa có ví dụ → `Need confirm` format).
- Field `shopify_contact_role` (single_line_text, ngay sau field role
  template): chỉ nhận đúng `location_admin` → "Location admin", `ordering_only`
  → "Ordering only"; strict, case-sensitive, **không trim**. Trống →
  `Shopify contact role is required`; sai → `Shopify contact role "X" is not
  supported. Use one of: location_admin, ordering_only`. — business-rules/DUOS.md
  (DUOS-405, 2026-08-11). Đã xác nhận.
- Fail ở mọi nhánh (slug sai, role template không tồn tại / chưa publish cho
  company, customer không tồn tại) → không ghi gì ở app lẫn Shopify. —
  business-rules/DUOS.md. Đã xác nhận.
- Key field do FE khai báo; sai key → luôn "required". — business-rules/DUOS.md.
- Flow action gửi email đổi role + bắn trigger "member role updated" (trigger
  sẵn có `duos-member-role-updated`, DUOS-409 comment haptt/haild 2026-08-18).
  — business-rules/DUOS.md.

### Bulk assign admin (DUOS-393, DUOS-405)

- `type` = `assign_admin_main_contact` (gán main contact thành Location admin
  ở location chưa gán + sync DB) hoặc `assign_admin_location_admin` (chỉ sync
  DB cho người đang là Location admin trên Shopify). Status: `pending`,
  `processing`, `completed`, `partial_completed`, `failed`, `canceled` (chưa
  dùng). `total` / `total_success` đếm theo **company**. — DUOS-393
  description. Theo ticket.
- Customer đã có role trong DB vẫn bị bulk ghi đè. — DUOS-393 comment
  haptt/thuongnth 2026-05-04.
- Từ DUOS-405: Shopify reject 1 item → skip và chạy tiếp, item skip không để
  lại dấu vết; có thể báo Completed dù location chưa gán. —
  business-rules/DUOS.md. Đã xác nhận (known limitation).
- Portal staging (2026-09-30): màn "Users & permissions" chỉ có "Run bulk
  assign" (Main contacts / Location admin), **không có màn Members theo
  company** — quan sát của sonder, TC-DUOS-187. Khớp inventory 2026-10-08
  (§ 2.7: h2 "Users & permission", "Apply admin role to:", "Run bulk assign").

### Chặn checkout (chỉ Shopify Plus)

- "Block checkout by customer permissions" chỉ chạy trên Shopify Plus; non-Plus
  hiển thị disabled (không phải bug). — references/apps/DUOS.md (docs).
- Từng có bug checkout extension bỏ qua member role (DUOS-273, đã fix) → test
  đủ từng role. — references/apps/DUOS.md.
- Value-based blocking (DUOS-403 → **corrected bởi DUOS-407**): View Only chỉ
  được thanh toán khi **tổng order gồm cả shipping** = 0 (trước đó config
  `allowZeroSubtotalCheckout` chỉ xét cartSubtotal, nên item £0 + shipping
  £4.99 vẫn vào "Pay now"). Theo ticket (PASS 2026-08-18).
- Merchant sửa được nội dung warning message ở checkout (DUOS-266) — ticket
  trống, không biết text mặc định / chỗ cấu hình → `Need confirm`.

### Invite member (Customer Account)

- Chặn email generic: local-part khớp 1 trong 14 prefix (`info@`, `sales@`,
  `hello@`, `contact@`, `hi@`, `office@`, `enquiries@`, `orders@`, `support@`,
  `help@`, `admin@`, `accounts@`, `billing@`, `marketing@`), không phân biệt
  hoa thường → khi Save hiện "Generic email addresses aren't accepted for
  security reasons. Please use a personal business email instead. Get in
  touch if you run into any issues". — DUOS-410 description (Done
  2026-08-28). Theo ticket.
- Các rule invite trùng email / phân trang / search: xem
  [02-company-member.md](02-company-member.md).

## Edge Cases

- Customer có nhiều tag map tới nhiều role → gán role nào? `Need confirm`
  (open-questions, TC-DUOS-006).
- Thêm tag SAU khi customer đã ở trong location có kích hoạt assign không
  (trigger chỉ fire lúc add)? `Need confirm` (TC-DUOS-008).
- Add member thủ công (ngoài Matrixify) có fire `companyContact Assigned`
  không? `Need confirm` (TC-DUOS-009).
- Customer nhiều location, gỡ tag → gỡ role ở location nào? `Need confirm`
  (TC-DUOS-012).
- create-role / assign fail giữa chừng → retry / log / báo merchant?
  `Need confirm` (TC-DUOS-013).
- Custom role / default role riêng làm role template có được không?
  `Need confirm` (TC-DUOS-049).
- Field chỉ chứa khoảng trắng `"   "` → "required" hay "not supported"?
  `Need confirm` (TC-DUOS-023).
- Chạy lại Flow action lần 2 có gửi email đổi role lần 2 không? `Need confirm`
  PO (TC-DUOS-050).
- Hạ Admin cuối cùng của location xuống `ordering_only` qua Flow — rule "tối
  thiểu 1 Admin" có được enforce? `Need confirm` — **nên chốt sớm**
  (TC-DUOS-041).
- Shopify API rate limit giữa batch bulk → skip hay retry? `Need confirm`
  (TC-DUOS-047).
- Workflow nghe "member role updated" mà chứa action assign-role → **loop vô
  hạn**: Resolved — limitation chấp nhận, không log bug (business-rules,
  DUOS-405).
- Dropdown "Select based role" có liệt kê custom role không; có
  validate trùng tên role; có xoá custom role không? `Need confirm` (DUOS-372
  không nói).
- DUOS-410: khớp chính xác local-part hay "bắt đầu bằng" (`info.john@`)?
  Áp dụng cho form edit / admin extension không? Bật theo config merchant
  không? `Need confirm`.
- DUOS-407: discount và thuế có tính vào "tổng order" không? `Need confirm`.
- DUOS-401 mô tả View Only "không đặt hàng" nhưng map sang Ordering Only —
  việc chặn nằm ở checkout extension (DUOS-403/407). Resolved theo ticket.
- Lệch staging 2026-10-08 chờ chốt: inventory/DUOS.md § 5 #11 (ý nghĩa nhóm
  permission mới), #12 (quyền Junior buyer) — xem dòng ⚠ ở Business Rules.

## Testability Notes

- Phần lớn hành vi theo merchant bật bằng custom config → cần BE set trong
  `users.config` (xem [../testing/environments.md](../testing/environments.md)).
- Test checkout blocking cần store **Shopify Plus** (`stg-duos-plus-2`).
  Lúc 2026-10-08 store này đang **Free plan** của app, 8 extension Inactive,
  app embed Disabled, storefront có password, không có tài khoản buyer →
  chưa test được chặn checkout / Customer Account trên store này
  (inventory/DUOS.md § 5 #30; xem
  [../testing/environments.md](../testing/environments.md)).
- Flow action không có automation round-trip trên Shopify admin — test tay
  (DUOS-405 comment haptt 2026-08-10).
- Bộ case DUOS-402 (TC-DUOS-001…015) và DUOS-405 (TC-DUOS-016…050) là dữ
  liệu lịch sử từ Master Sheet (`conventions/module-naming.md`), **không có
  trên QA Hub** hiện tại — id TC-DUOS-0xx trên QA Hub đã bị dùng lại cho task
  khác (token, customer matching). Cẩn thận khi trích id.

## Known Issues

Xem [known-issues.md](../known-issues/known-issues.md), tag `roles-permissions`.

## Related Jira Tickets

- [DUOS-11](https://ownego.atlassian.net/browse/DUOS-11) — Buyer Roles and Permissions, Epic (To Do) — epic gom, không có description.
- [DUOS-88](https://ownego.atlassian.net/browse/DUOS-88) — [CA] Role management page, Story (Done) — 3 default role + nhóm permission.
- [DUOS-89](https://ownego.atlassian.net/browse/DUOS-89) — [CA] Member management page, Story (Done) — chỉ ảnh; quan hệ customer–role chuyển từ metafield sang DB.
- [DUOS-232](https://ownego.atlassian.net/browse/DUOS-232) — [CA] Update names of default roles + button text, Story (Done) — trống.
- [DUOS-266](https://ownego.atlassian.net/browse/DUOS-266) — Allow merchant edit content of warning message in checkout page, Story (Done) — trống.
- [DUOS-273](https://ownego.atlassian.net/browse/DUOS-273) — [CA] Block CO ext ignore members roles, Story (Done) — bug fix checkout blocking.
- [DUOS-285](https://ownego.atlassian.net/browse/DUOS-285) — [BE] Unique admin per location validation, Story (Done) — API đếm admin.
- [DUOS-372](https://ownego.atlassian.net/browse/DUOS-372) — Role & permission manage in app, Story (Done) — trang "Roles & permissions".
- [DUOS-393](https://ownego.atlassian.net/browse/DUOS-393) — Bulk assign admin to location admins, Story (Done) — API bulk + status.
- [DUOS-400](https://ownego.atlassian.net/browse/DUOS-400) — Syncing role back to Shopify customer permissions, Story (Done) — sync 2 chiều.
- [DUOS-401](https://ownego.atlassian.net/browse/DUOS-401) — Custom roles and hide unused roles, Story (Done) — config Ca' Pietra.
- [DUOS-402](https://ownego.atlassian.net/browse/DUOS-402) — Auto-assign Duos role via Shopify Flow (tag-based), Story (Done).
- [DUOS-403](https://ownego.atlassian.net/browse/DUOS-403) — Value-based checkout blocking, Story (Done) — bị DUOS-407 sửa.
- [DUOS-405](https://ownego.atlassian.net/browse/DUOS-405) — Update Shopify Flow "assign role" action, Story (PASS) — field `shopify_contact_role`, re-sync, bulk continue-on-error.
- [DUOS-406](https://ownego.atlassian.net/browse/DUOS-406) — Display Main Contact per Shopify with badge, Story (PASS).
- [DUOS-407](https://ownego.atlassian.net/browse/DUOS-407) — Value-based checkout blocking must include shipping in total, Story (PASS).
- [DUOS-408](https://ownego.atlassian.net/browse/DUOS-408) — Hide "Role manage" button and replace with custom link, Story (PASS).
- [DUOS-409](https://ownego.atlassian.net/browse/DUOS-409) — Shopify Flow trigger when Duos role is changed, Story (To Do) — trigger có sẵn, chưa chốt.
- [DUOS-410](https://ownego.atlassian.net/browse/DUOS-410) — Block generic email prefixes on the invite member modal, Story (Done).

## Source

- Jira DUOS (Atlassian MCP), đọc 2026-10-07.
- `knowledge-work/business-rules/DUOS.md`, `open-questions/DUOS.md`,
  `references/apps/DUOS.md`.
- QA Hub task DUOS-004 (TC-DUOS-187 actual result, 2026-09-30).
- `knowledge-work/inventory/DUOS.md` (build 2026-10-08, store
  `stg-duos-plus-2`) § 2.7, 2.8, § 5 #10–13, #30.
