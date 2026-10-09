<!-- testlane knowledge KB-355 · kind=feature-profile · tag=Notifications · status=draft · sourceUrl=https://github.com/ownego/qa-knowledge-work/blob/18e5531b0531cc8ed211d45de290a9aecfdf837c/kb/DUOS/features/09-notifications.md · createdAt=2026-10-08T07:51:14.139Z · updatedAt=2026-10-08T09:38:01.404Z -->

# 9. Notifications (email & Shopify Flow trigger)

**Status:** draft

Phân tích ngày 2026-10-07 từ Jira DUOS-137 (Epic), DUOS-171, 308, 309, 310,
311, 370, 371, 385, 386, DUOS-399 (email reconnect) và quan sát staging của
sonder (TC-DUOS-194, 2026-09-30). **Chưa có task QA Hub riêng**. Đã đối
chiếu inventory 2026-10-08 (store `stg-duos-plus-2`, Free plan) — phần
✅/🟡/❌ xem `inventory/DUOS.md` (§ 2.15, 2.22). Trang Notifications + 1
editor template đã quan sát thật (switch không bấm); gửi email thật và
Shopify Flow **chưa verify**.

## Purpose

Trang **"Notifications"** trong Portal gom các email gửi merchant (nội bộ)
và buyer theo sự kiện của từng module; template sửa được trong email editor
giống Quote; một số sự kiện có thêm Shopify Flow trigger để merchant tự route
(VD qua Klaviyo). Ngoài ra có email transaction gửi merchant từ phía Qikify.

## Business Rules

### Trang Notifications (DUOS-171)

- Title "Notifications", description "Set up and manage notifications for you
  and your customers", nút "Help center". — DUOS-171.
- Nhóm "B2B submission": Admin notification "New submission notification"
  ("Send internal notification email when receiving new B2B submissions.")
  (ticket ghi: "New B2B submission" / "Send internal email when when
  receiving new submissions."); Customer notification "B2B account created"
  ("Send email to customer when their B2B submission is approved.") (ticket
  ghi: "Send email to customers when their submission is approved."). Cả hai
  chỉ có nút "Read instruction" + "Open Shopify Flow" — không có switch /
  template trong app. — DUOS-171; label sửa theo quan sát staging 2026-10-08
  (inventory/DUOS.md § 2.15).
- Nhóm "Quotations" (DUOS-170, 161 — không đọc chi tiết). Quan sát staging
  2026-10-08 (inventory/DUOS.md § 2.15): Admin notification là switch "New
  quote submitted", "Quote accepted", "Quote rejected", "Quote re-quoted";
  Customer notification "Auto-response email", "Proposal email" ("Edit
  template" + switch).
- Nhóm "Members & permissions" (quan sát staging): Customer notification
  "Member added to location" ("Send email automatically when a member is
  added to a company location"), **mặc định TẮT** (TC-DUOS-194, 2026-09-30).
  DUOS-309 ghi 2 toggle "Members added to location" và "Members' role
  updated", mặc định Disable. Label thật: "Member added to location" và
  "Member role updated" ("Edit template" + switch) — quan sát staging
  2026-10-08 (inventory/DUOS.md § 2.15).
- Nhóm Shopping list: "Shopping list pending approval" (gửi Admin + Senior
  buyer khi Junior "Submit for approval"), "Shopping list approved" (gửi
  người tạo). Có default template (Ashley 2026-01-15). — DUOS-308.
- Credit: "Alert for “Low available credit” company" (< 20% limit, email nội
  bộ, subject "ALERT: Low available credit for [Company name] - [Location
  name]"), "Credit limit assigned to a company location" (gửi Admin location,
  subject "Important: Credit limit established for [Location Name]"); param
  `{{store_owner}}`, `{{company_name}}`, `{{location_name}}`,
  `{{credit_limit}}`, `{{available_credit}}`. — DUOS-310.
- Quan sát staging 2026-10-08 (inventory/DUOS.md § 2.15): nhóm "Credit
  limit" — Admin: switch "Alert for "Low available credit" company" ("…falls
  below 20% of total limit."); Customer: "Credit limit assigned to a company
  location" ("Edit template" + switch). Editor template `credit-assigned`:
  badge `Inactive` + nút "Activate"; field "Sender name:", "Sender email:",
  "Reply to email:", "Email template subject:" (mặc định `Important: Credit
  limit established for {location_name}`); "Available variables":
  {customer_name}, {customer_email}, {shop_email}, {shop_name},
  {company_name}, {location_name}, {credit_limit}, {currency_code},
  {login_url} (cú pháp 1 cặp ngoặc, khác `{{…}}` trong ticket); editor
  Unlayer.
- Nhóm "Shopping list" (quan sát staging 2026-10-08): "Shopping list
  approved", "Shopping list pending approval" — "Edit template" + switch.
- Member: subject "Welcome to the [Company name] team on [Store name]" (CTA
  "Log in to store"); "Update: Your access role for [Company name] has
  changed." (CTA "View my account"). — DUOS-309.
- Extension chưa subscribe bị disable trên trang Notifications. — DUOS-329
  comment haild 2026-03-05.
  ⚠ Lệch staging 2026-10-08: store Free plan, 8 extension `Inactive` nhưng
  switch ở Notifications **không mang thuộc tính disabled** (chưa bấm thử)
  (inventory/DUOS.md § 5 #5) — Need confirm "disable" là khoá UI Portal hay
  chỉ Inactive trên storefront.

### Sender / reply-to

- DUOS-311: setting sender email ở từng template thuộc Customer notification.
  **Corrected bởi DUOS-370** (chốt haptt 2026-04-01, Ashley "Okie chốt v"):
  sender email merchant setup được đưa vào **reply-to**, bỏ field "reply to"
  riêng → From không còn là email merchant.
  ⚠ Lệch staging 2026-10-08: editor template vẫn có field **"Reply to
  email:"** riêng bên cạnh "Sender name:" / "Sender email:" (inventory/DUOS.md
  § 2.15, § 5 #6) — Need confirm UI chưa cập nhật hay rule sai.

### Shopify Flow trigger (DUOS-371)

- 4 trigger: Member added to location, Role changes, Shopping list pending
  approval, Shopping list approved — để route qua Klaviyo. Payload pending
  approval gửi danh sách customer (Admin + Senior) → dùng loop action. — DUOS-371
  + haild 2026-04-01.
- Trigger "company approved" (`duos-approve-company`) — xem
  [04-company-submissions.md](04-company-submissions.md); "member role updated"
  — xem [01-roles-permissions.md](01-roles-permissions.md).

### Email transaction cho merchant (từ Qikify)

- Install / Uninstall (2 nhóm plan: Advanced / Plus / Plus Sandbox và Basic /
  Grow / Partner test / Affiliate), Subscription change, Cancel subscription.
  — DUOS-385. Template không có trong ticket → `Need confirm`.
- Đổi Shopify plan: template "[duos] shopify plan changes", param
  `{{store_owner}}`, `{{module_included}}`, `{{previous_plan}}`,
  `{{current_plan}}`. — DUOS-386.
- Email reconnect khi token chết (template `reopen.blade.php`, bản nháp) —
  xem [11-auth-token-lifecycle.md](11-auth-token-lifecycle.md).
- Email đi qua Mailgun; DUOS-366 định đổi sang Amazon (To Do).

## Edge Cases

- Flag ON (auto company creation): email kích hoạt account buyer do setting
  nào điều khiển, gửi lúc submit hay Approve? Sonder bật "Member added to
  location" + submit + Approve mà không có email nào ngoài login code
  (TC-DUOS-194). `Need confirm` PO (GAP-25/26 task DUOS-004).
- "Added to location" vs "invite member" có cùng trigger không? `Need confirm`
  (DUOS-309).
- Trạng thái mặc định toggle shopping list? `Need confirm` (DUOS-308).
- Trigger + điều kiện gửi email đổi plan (webhook nào, tier nào)? `Need confirm`
  (DUOS-386).
- Email đổi role khi Flow action chạy lại lần 2 (idempotent) — `Need confirm`
  (open-questions).
- Lệch staging 2026-10-08 chờ chốt: inventory/DUOS.md § 5 #5 (switch không
  disabled khi Free), #6 (còn field "Reply to email:") — xem dòng ⚠ ở
  Business Rules. Nghi lỗi #9 (footer template credit nói "quote request") —
  xem known issues.

## Testability Notes

- Mail staging gửi thật hay sandbox, inbox nào QA đọc được? `Need confirm`
  (GAP-01 task DUOS-006).
- Klaviyo cần paid plan mới gửi được — khó test DUOS-371.

## Known Issues

Xem [known-issues.md](../known-issues/known-issues.md), tag `notifications`.

## Related Jira Tickets

- [DUOS-137](https://ownego.atlassian.net/browse/DUOS-137) — Notification, Epic (To Do).
- [DUOS-171](https://ownego.atlassian.net/browse/DUOS-171) — Notification page, Story (Done).
- [DUOS-308](https://ownego.atlassian.net/browse/DUOS-308) / [DUOS-309](https://ownego.atlassian.net/browse/DUOS-309) / [DUOS-310](https://ownego.atlassian.net/browse/DUOS-310) — Shopping list / Member / Credit notification, Story (Done).
- [DUOS-311](https://ownego.atlassian.net/browse/DUOS-311) → [DUOS-370](https://ownego.atlassian.net/browse/DUOS-370) — sender email → reply-to, Story (Done).
- [DUOS-371](https://ownego.atlassian.net/browse/DUOS-371) — Add trigger to Shopify Flow for email notifications, Story (Done).
- [DUOS-385](https://ownego.atlassian.net/browse/DUOS-385) / [DUOS-386](https://ownego.atlassian.net/browse/DUOS-386) — email transaction / đổi plan cho merchant, Story (Done).
- [DUOS-366](https://ownego.atlassian.net/browse/DUOS-366) — Change email sending service from Mailgun to Amazon, Story (To Do).

## Source

- Jira DUOS (Atlassian MCP), đọc 2026-10-07; QA Hub task DUOS-004 (TC-DUOS-194).
- `knowledge-work/inventory/DUOS.md` (build 2026-10-08) § 2.15, § 5 #5–9.
