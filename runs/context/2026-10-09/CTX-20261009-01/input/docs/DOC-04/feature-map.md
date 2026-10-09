<!-- testlane knowledge KB-360 · kind=product · tag=— · status=draft · sourceUrl=https://github.com/ownego/qa-knowledge-work/blob/18e5531b0531cc8ed211d45de290a9aecfdf837c/kb/DUOS/product/feature-map.md · createdAt=2026-10-08T07:53:18.023Z · updatedAt=2026-10-08T09:38:06.128Z -->

# Feature Map — Duos B2B (DUOS)

**Status:** draft

Danh sách feature và tương tác **giữa** các feature. Dựng 2026-10-07. Chia
theo module trên trang pricing (`references/apps/DUOS.md` § 1–2) cộng các
mảng dùng chung. Đã đối chiếu inventory 2026-10-08 (store `stg-duos-plus-2`,
Free plan) — phần ✅/🟡/❌ xem `inventory/DUOS.md`; Customer Account,
checkout, storefront chưa verify.

Tên trên Portal (quan sát staging 2026-10-08, inventory/DUOS.md § 2.2): 8
row ở "B2B extensions hub" — "B2B registration", "Credit limit", "Finance &
payment", "Users & permissions", "Quote requests", "CSV Upload", "SKU Order",
"Shopping list"; tab nhóm "Company setup (2)", "Ordering (4)", "Finance &
credit (2)".

## Features in scope

Module theo gói (giá: [10-pricing-plans.md](../features/10-pricing-plans.md)):
- User & Permission → [Roles & permissions](../features/01-roles-permissions.md), [Company member](../features/02-company-member.md)
- B2B Registration → [Registration form](../features/03-b2b-registration-form.md), [Company submissions](../features/04-company-submissions.md)
- B2B Quote Request → [Quote Request](../features/05-quote-request.md)
- Quick order CSV & SKU Order → [Quick Order](../features/06-quick-order.md)
- B2B Shopping List → [Shopping List](../features/07-shopping-list.md)
- B2B Finance & Credit → [Finance & Credit](../features/08-finance-credit.md)

Dùng chung / hạ tầng:
- [Notifications](../features/09-notifications.md)
- [Pricing & Subscription](../features/10-pricing-plans.md)
- [Auth & Token lifecycle](../features/11-auth-token-lifecycle.md)
- [Portal chung — Home, Translations, Admin panel, DTC banner](../features/12-portal-home-translations.md)

Jira Epic → file (23 Epic, 2026-10-07): DUOS-1 → 03/04; DUOS-2 → 06; DUOS-7,
DUOS-200, DUOS-423 → 08; DUOS-11 → 01/02; DUOS-13 Invoice Management (To Do,
chưa có file); DUOS-45, DUOS-101 → 12; DUOS-46 → 12; DUOS-50 Sale/Marketing
(nội bộ, không có file); DUOS-63 Order discount (To Do, chưa có file); DUOS-81
→ 07; DUOS-98, DUOS-320, DUOS-377, DUOS-430 → 10; DUOS-125 → 05; DUOS-137 → 09;
DUOS-138 Sale reps (To Do); DUOS-144 App Logo → 12; DUOS-261 Shared cart (To
Do); DUOS-321 Research (một phần đã Done: DUOS-323 alias email nhiều company,
DUOS-324 feature-based pricing — chưa đọc).

## Known interactions

| Feature A | Feature B | Interaction | Source |
|---|---|---|---|
| Pricing (module chưa mua) | Mọi module | Tính năng thuộc module chưa subscribe bị ẩn / disable (Portal: List extensions, Notifications, Translate) — không phải bug. ⚠ Lệch staging 2026-10-08: store Free vẫn mở + lưu được trang cài đặt extension, switch Notifications / tab Translations không disabled (inventory/DUOS.md § 5 #5) — Need confirm | references/apps/DUOS.md § 1; DUOS-329 comment haild 2026-03-05 |
| Pricing (Oct 2026) | Roles & permissions | User & Permission chuyển từ Free/bắt buộc sang trả phí $90/$150 — chưa rõ còn bắt buộc không, tính năng dựa trên role chạy ra sao nếu không mua. `Need confirm` (GAP-13 task DUOS-005) | DUOS-430 |
| Pricing (Shopify plan) | Roles & permissions, Finance & Credit | Chặn checkout (by permission, by credit) chỉ Shopify Plus; non-Plus thấy banner "Shopify Plus required for this feature" | DUOS-377, DUOS-381; KB-002 |
| Pricing (Shopify plan) | Registration form | EU VAT validation chỉ Plus ("This feature is available on Shopify Plus only.") | DUOS-377 |
| Company submissions | Roles & permissions | Approve gán customer làm Main contact (Location admin) + app Admin role; company do job tạo dùng được bulk "assign admin from main contact" (chưa test — TC-DUOS-215) | DUOS-425; task DUOS-004 |
| Company submissions | Notifications | Email "B2B account created" khi Approve; trigger Flow `duos-approve-company` chỉ bắn khi Approve | DUOS-171; DUOS-425 |
| Roles & permissions | Company member | Cùng member-sync path (Flow action, Admin extension, CA member management, bulk) → sửa một nơi phải regression 4 nơi | business-rules/DUOS.md (DUOS-405) |
| Roles & permissions | Quote Request | Revoke role → quote được reassign cho owner location (delay 5 phút) trừ khi config `quotation.skip_reassign_on_revoke`; customer bị xoá → quote reassign | DUOS-400; DUOS-176 |
| Roles & permissions | Shopping List | Junior Buyer cần duyệt; nút trong list disable theo role/status | DUOS-86, DUOS-395 |
| Roles & permissions | Finance & Credit | Permission "View the list of orders that all customers have placed" quyết định xem finance cá nhân hay cả location; Finance & payment có permission riêng ở CA | DUOS-238; DUOS-244, DUOS-245 |
| Quick Order | Shopping List | Tạo shopping list từ CSV/SKU khi bật "Allow customers to create Shopping List"; modal tìm sản phẩm dùng chung. Cùng label "Action after customer's create order" nhưng Shopping list không có "Create draft order" (quan sát staging 2026-10-08) | DUOS-357; DUOS-219; inventory/DUOS.md § 2.12–2.14 |
| Quick Order | Quote Request | Quote hoạt động với Quick order trên các theme B2B | DUOS-207 |
| Quote Request | Finance & Credit | One-time deal tạo draft order → không áp net-term deposit; Function validate credit chạy cả CreateDraftOrder | DUOS-187; DUOS-397 |
| Shopping List | Finance & Credit (order webhook) | Order từ list gắn `duos_shopping_list_id`; re-approval khi order edit/cancel/refund chưa rõ. `Need confirm` (GAP-02 task DUOS-006) | DUOS-382; task DUOS-006 |
| Auth & Token | Mọi module | Mọi call Shopify đi qua lớp token; token chết → chặn trước khi gọi Shopify → toàn bộ sync/quote/credit/Flow dừng tới khi reconnect | DUOS-399 |
| Notifications | Roles & permissions | Flow action assign role gửi email đổi role + bắn trigger "member role updated" → workflow nghe trigger này mà chứa assign-role sẽ loop vô hạn | DUOS-405 |
| Checkout Customizer (QCO, app khác) | Duos | B2B checkout field / minimum order theo company có thể overlap | references/apps/README.md |
