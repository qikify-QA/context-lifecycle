<!-- testlane knowledge KB-348 · kind=feature-profile · tag=Company Member · status=draft · sourceUrl=https://github.com/ownego/qa-knowledge-work/blob/18e5531b0531cc8ed211d45de290a9aecfdf837c/kb/DUOS/features/02-company-member.md · createdAt=2026-10-08T07:48:04.335Z · updatedAt=2026-10-08T09:37:55.466Z -->

# 2. Company member (Customer Account)

**Status:** in-review

Phân tích ngày 2026-10-07 từ Jira DUOS-412 và sub-task DUOS-413…421, 432
(qua bản phân tích 14 mục trong task QA Hub DUOS-003, cập nhật 2026-09-30),
73 test case TC-DUOS-077…149 (6 case passed ngày 2026-09-18 → 2026-09-30),
`references/apps/DUOS.md` và business rule member-sync DUOS-405. Đã đối
chiếu inventory 2026-10-08 (store `stg-duos-plus-2`, Free plan) — phần
✅/🟡/❌ xem `inventory/DUOS.md`. Riêng trang Company member trong Customer
Account là ❌ ở inventory (§ 2.19: không có tài khoản buyer; Portal báo "The
Company member extension block is not activated yet.") → tên UI ở file này
vẫn lấy từ ticket / test case, **chưa verify**; ảnh design DUOS-415,
DUOS-417 không đọc được qua API.

## Purpose

Trang **Company member** trong Customer Account extension: buyer Admin xem,
mời, sửa, xoá member của company location hiện tại và đổi role. Đợt
DUOS-412 (khách Ironwear) thêm: member không có quyền vẫn xem được bảng ở
chế độ view-only, chặn invite email trùng, search / sort trong location,
chỉnh UI bảng.

## Business Rules

### Quyền xem / sửa (DUOS-413)

- Mặc định member thiếu permission `read_members` mở trang → banner "no
  permission", API `GET customer-account/company-locations/{id}/customers`
  trả 403. — comment haptt 15/09/2026 (unit test). **QA đã pass** TC-DUOS-080
  (2026-09-30).
- Shop bật `customer-permission.allow_all_members_read_members = true` (trong
  `users.config`, sửa qua JSON editor admin panel, chỉ bật cho shop Ironwear):
  mọi member đã đăng nhập (kể cả không có role / custom role không có
  `read_members`) nhận 200 và thấy bảng **view-only** — không nút Invite,
  không edit/delete, tên role không dẫn tới trang role. — DUOS-413 + comment
  haptt 15/09. **QA đã pass** TC-DUOS-077, 078, 082.
- Flag bật **không** cấp quyền ghi: PUT update, DELETE, `GET customers/existed`
  vẫn cần `write_members` → 403. — comment haild 11/09 + haptt 15/09
  (unit test). Theo ticket; case API (TC-DUOS-085…087) chưa chạy.
- Admin vẫn thấy đủ Invite / edit / delete / link role khi flag bật —
  TC-DUOS-079 passed.
- Flag đọc theo `FILTER_VALIDATE_BOOLEAN` (true / "true" / 1 / "1" / "on" /
  "yes" là bật). — task DUOS-003 mục 5. Theo ticket.

### Invite trùng email (DUOS-414)

- Email đã có role assignment tại **location hiện tại** (assignment id khác
  `shopify_contact_role_assignment_gid` trong request) → HTTP 422, message
  nguyên văn "A member with this email already exists in this location.",
  hiện inline dưới field Email, modal giữ mở. Edit chính member đó vẫn lưu
  được. — comment haild 11/09/2026. **Corrected:** description còn ghi
  "warning hoặc block", comment chốt là block. Theo ticket, chưa chạy.
- Email generic (`info@`, `sales@`…) bị chặn — xem
  [01-roles-permissions.md](01-roles-permissions.md) (DUOS-410).
- Invite yêu cầu đủ field + job title (DUOS-335/343, Ironwear); sub-task
  DUOS-432 "Invite new member with required phone" (To Do) — chi tiết
  `Need confirm`.

### Search / sort (DUOS-415)

- Phạm vi **trong location hiện tại** (client bỏ yêu cầu cross-location). —
  DUOS-415 description.
- Query param: `search` (name + email), `role_name`, `sort_by` = `name` |
  `title`, `sort_order` = `asc` | `desc` (mặc định asc); `first`/`last` tối
  đa **50** (trước 250). Response không đổi. — comment haptt 15/09.
- Search là **prefix match** (gõ "Curr" ra "Currier", "urrier" không ra) —
  haptt 15/09; **chưa được PO/client chấp nhận** (GAP-05).
- Filter role xử lý trong bộ nhớ, đọc tối đa 10 trang × 50 = **500 member**,
  phần dư bị bỏ + ghi log (known limit). `member` là role_name hợp lệ. —
  haptt 15/09.
- Đổi search / role / sort → FE reset cursor; BE phát hiện cursor lệch thì về
  trang 1. — haptt 15/09.

### UI bảng (DUOS-416, 417, 418)

- Cột Email và Role: bỏ tooltip, cursor default. — DUOS-416.
- Row bottom border, tên customer đổi xanh → đen, **bỏ cột Phone** (API vẫn
  trả `default_phone_number` vì admin extension dùng chung service). — DUOS-417.
- Mobile responsiveness (DUOS-418): ticket không có nội dung → `Need confirm`.
- Badge "Main Contact" cho người giữ Main Contact trên Shopify — DUOS-406
  (xem file 01).

### Data source

- Endpoint list member đổi nguồn từ `CompanyLocation.roleAssignments` sang
  `Company.contacts` cho **mọi** request (kể cả không param) → regression list
  mặc định cả Customer Account lẫn admin extension. — task DUOS-003 mục 7.

## Edge Cases

- Cột Permissions hiển thị role Duos hay role Shopify (Location admin /
  Ordering only)? Role filter lọc theo role Duos — `Need confirm` PO (GAP-02).
- Roles endpoint có gate cho member view-only không — view-only còn thấy role
  filter không? `Need confirm` (GAP-03).
- Invite email tồn tại trên Shopify nhưng chưa ở location này (location khác
  / company khác / khách DTC) — vẫn ghi đè record customer như cũ? `Need confirm`
  (GAP-06, kèm rủi ro SEC-06).
- Admin extension đang gửi `first` > 50 thì BE trả gì? `Need confirm` (GAP-07).
- Tên key config chưa thống nhất: `customer-permission.allow_all_members_read_members`
  (BE) vs `customerPermissionSettings.allowAllMembersReadMembers` (spec haild)
  — `Need confirm` (GAP-01). Thực tế TC-DUOS-077 pass trên staging, nên key BE
  đang chạy được.
- Check trùng email có chuẩn hoá hoa/thường, trim không? `Need confirm` (GAP-11).
- Empty state khi search không có kết quả, nút clear search? `Need confirm`
  (GAP-12).
- `sort_by` / `first` không hợp lệ → 422 hay bỏ qua? `Need confirm` (GAP-13).

## Testability Notes

- Verdict bản phân tích: Not Ready 9/14 (8 GAP Major). Task QA Hub đang
  `done` nhưng 67/73 case `not-run` — nhiều sub-task FE (414–418) còn To Do
  trên Jira.
- Cần dữ liệu: location > 50 / > 500 member, member thuộc > 5 location
  (RISK-01 — 3 giả định Shopify API chưa verify).
- Ironwear có thể có default role riêng (DUOS-374).
- Store `stg-duos-plus-2` (2026-10-08): extension "Users & permissions"
  Inactive, alert "The Company member extension block is not activated yet."
  → không dùng store này cho case Customer Account khi chưa bật block + có
  tài khoản buyer (inventory/DUOS.md § 2.7, 2.19).

## Known Issues

Xem [known-issues.md](../known-issues/known-issues.md), tag `company-member`.

## Related Jira Tickets

- [DUOS-412](https://ownego.atlassian.net/browse/DUOS-412) — [Ironwear] Refinement, Story (QA Review) — story gom 6 hạng mục.
- DUOS-413 (QA Review) / DUOS-419 BE (Done) — view-only cho mọi member.
- DUOS-414 (To Do) / DUOS-420 BE (Done) — chặn invite trùng email.
- DUOS-415 (To Do) / DUOS-421 BE (Done) — search & sort trong location.
- DUOS-416, DUOS-417, DUOS-418 (To Do) — UI bảng, mobile.
- DUOS-432 (To Do) — Invite new member with required phone.
- [DUOS-359](https://ownego.atlassian.net/browse/DUOS-359) — [CA] Improve Company members, Task (Done) — không đọc chi tiết.
- [DUOS-335](https://ownego.atlassian.net/browse/DUOS-335) — [Ironwear] Required all fields when invite new members + add job title field, Story (Done) — không đọc chi tiết.

## Source

- QA Hub task DUOS-003 (notes + TC-DUOS-077…149), đọc 2026-10-07.
- Jira DUOS-412 (danh sách sub-task, đọc 2026-10-07); sub-task đọc gián tiếp
  qua bản phân tích task DUOS-003.
- `knowledge-work/inventory/DUOS.md` (build 2026-10-08) § 2.7, 2.19.
