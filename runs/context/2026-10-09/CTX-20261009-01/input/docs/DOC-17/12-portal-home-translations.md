<!-- testlane knowledge KB-358 · kind=feature-profile · tag=Portal · status=draft · sourceUrl=https://github.com/ownego/qa-knowledge-work/blob/357145d7b885b2f5c2f5592ebc81e54faf0a58a8/kb/DUOS/features/12-portal-home-translations.md · createdAt=2026-10-08T07:52:43.352Z · updatedAt=2026-10-08T10:28:02.356Z -->

# 12. Portal chung — Home, Translations, Admin panel, DTC banner

**Status:** draft

Phân tích ngày 2026-10-07 từ Jira DUOS-49 (Home page, 01/2025), DUOS-58
(Translation page), DUOS-340 (DTC banner), DUOS-429 (Laravel 12 regression),
DUOS-428 (qua task QA Hub DUOS-006) và `references/apps/DUOS-changelog.md`
(changelog "Cập nhật gần đây", tách khỏi `DUOS.md` § 2 ngày 2026-10-08). **Ít nguồn, nhiều ticket cũ**. Đã đối chiếu inventory
2026-10-08 (store `stg-duos-plus-2`, Free plan) — phần ✅/🟡/❌ xem
`inventory/DUOS.md` (§ 1, 2.1, 2.16, 2.23). Home và trang "Content &
Translation" đã quan sát thật (nội dung từng tab dịch chưa mở); DTC banner
(Customer Account) và bên trong admin panel **chưa verify**.

## Purpose

Các màn dùng chung không thuộc module trả phí: Home / Dashboard và onboarding
của Portal, trang Translations, banner cho khách DTC ở Customer Account, và
admin panel nội bộ (Filament) mà QA dùng để xem shop / sửa config.

## Business Rules

### Home (DUOS-49, 2025 — có thể đã đổi)

- Title "Welcome to Duos B2B," + "Help center"; card "Duos B2B app embed
  status" (badge "Disabled"/"Enabled", nút "Check status", "Enable app" /
  "Disable app"); "Setup guide" ("0/3 completed") 3 task: "Set up B2B Company
  Registration form", "Enable theme app extensions", "Add B2B quick order
  extensions to Customer Account"; Tutorials với nút "Watch tutorial". —
  DUOS-49 description. Theo ticket 2025.
- UI hiện tại (quan sát staging 2026-10-08, inventory/DUOS.md § 2.1):
  title "Welcome to Duos B2B," + nút "Help center"; card "Duos B2B app embed
  status" (badge `Disabled`, **chỉ có nút "Enable app"** — không thấy "Check
  status"), text "To display B2B registration form, please enable and save
  app embed block on Shopify Theme Editor."; "Setup guide" ("0 / 3
  completed") 3 bước: "Set up B2B Company Registration form" (nút "Create
  form"), "Enable theme app extensions" (nút "Enable theme app extension"),
  "Explore all B2B extensions in Customer Account" (ticket ghi: "Add B2B
  quick order extensions to Customer Account"; badge "Shopify's latest
  update", nút "Explore all extensions"); card "Onboarding call" — "Schedule
  your onboarding demo call", nút "Book a call", "Chat with us" (store
  Plus); "Tutorials" 3 card ("Display B2B/Wholesale registration form", "Add
  Quick order with SKUs page", "Add Quick order with CSV Upload") nút "Watch
  tutorial"; select "Language:" {English, 日本語}.
- Sidebar app: "B2B extensions" · "Notifications" · "Translations" ·
  "Pricing"; link gốc "Staging GetDous" = Home (tên app trong admin staging).
  — quan sát staging 2026-10-08 (inventory/DUOS.md § 1).
- ⚠ Lệch staging 2026-10-08: reference ghi có **Dashboard** riêng (Epic
  DUOS-46) nhưng sidebar không có mục Dashboard, route `/dashboard` trả
  iframe trống; Home là "Welcome to Duos B2B," (inventory/DUOS.md § 1, § 5
  #28) — Need confirm Dashboard đã gỡ hay gộp vào Home.
- App tự detect merchant đã add extension vào Customer Account chưa (DUOS-199);
  Portal đã restructure navigation 2 đợt (DUOS-168, 228); Book onboarding /
  demo call chỉ Plus + Advanced (DUOS-79, 387); Crisp live chat (DUOS-121);
  custom App Logo (Epic DUOS-144); tiếng Nhật (DUOS-108, 275). —
  references/apps/DUOS.md.

### Translations

- Trang Translation (DUOS-58, trống); extension chưa subscribe bị disable trên
  trang Translate (DUOS-329 comment haild). Translation của Quote PDF và
  custom error message regex nằm ở đây (DUOS-223, task DUOS-004 BR-43).
- UI hiện tại (quan sát staging 2026-10-08, inventory/DUOS.md § 2.16; chưa
  có business rule — § 5 #31): sidebar "Translations" mở trang h1 "Content &
  Translation"; "English" `Default`; combobox locale disabled "No locale
  found"; tab "Registration form" · "CSV Upload" · "Bulk add SKUs" ·
  "Members and roles" · "Shopping list" · "Quotation" + "More views"
  {"Finance & Credit", "Block checkout extension"}; "Translate and manage
  content for each market" / "Manage language translation, custom content
  for each market.", nút "Add language".
  ⚠ Lệch staging 2026-10-08: store Free plan, 8 extension Inactive nhưng tab
  Translations **không disabled** (inventory/DUOS.md § 5 #5) — Need confirm.

### DTC banner (DUOS-340)

- Khách không phải B2B vào trang extension B2B thấy banner mặc định "B2B
  account required." / "These B2B purchasing features are currently only
  available to our registered Business Partners. If you are buying for a
  company and need access to the B2B tools, please reach out to our support
  team for assistance."; merchant sửa được trong app admin; Customer Account
  chỉ cho text thường, link dùng Markdown `[text](url)`. — DUOS-340 +
  chuyenmc 2026-02-26. Đây là hành vi mong đợi, không phải trang trắng.

### Admin panel nội bộ (Filament)

- Shops → shop detail ("Token and scopes", JSON editor `users.config`), Plans,
  Discounts, Extensions, company submissions, Activity log, Admin users /
  roles (Shield), login Slack. — DUOS-399, DUOS-429 description.
- Trang login `staging-admin.getduos.io/admin/login`: "Get Duos Admin",
  "Sign in", chỉ có "Sign in with Slack" — quan sát staging 2026-10-08
  (inventory/DUOS.md § 2.23); bên trong admin panel chưa verify.
- Sau Laravel 12 (DUOS-429): gỡ `filament-json-preview` → JSON viewer ở
  "Form setting" và "Shop" thành JSON phẳng pretty-printed, không còn tree
  ("it looks different" — intended). — DUOS-429 description.

## Edge Cases

- DTC banner: giới hạn ký tự, nội dung rỗng, link sai? `Need confirm`.
- Home hiện tại còn "Setup guide" 3 bước không — Resolved: còn, quan sát
  staging 2026-10-08 (inventory/DUOS.md § 2.1).
- Lệch staging 2026-10-08 chờ chốt: inventory/DUOS.md § 5 #5 (tab
  Translations không disabled), #28 (không có Dashboard) — xem dòng ⚠ ở
  Business Rules.

## Testability Notes

- Regression sau nâng cấp hạ tầng (DUOS-428 composer audit, DUOS-429 Laravel
  12): xem [../testing/regression-checklist.md](../testing/regression-checklist.md).

## Known Issues

Xem [known-issues.md](../known-issues/known-issues.md), tag `portal-home-translations`.

## Related Jira Tickets

- [DUOS-46](https://ownego.atlassian.net/browse/DUOS-46) — Dashboard, Epic (Done); [DUOS-49](https://ownego.atlassian.net/browse/DUOS-49) — Home page, Story (Done).
- [DUOS-45](https://ownego.atlassian.net/browse/DUOS-45) — Translations, Epic (Done); [DUOS-58](https://ownego.atlassian.net/browse/DUOS-58) — Translation page, Story (Done) — trống.
- [DUOS-340](https://ownego.atlassian.net/browse/DUOS-340) — Message displaying for DTC customers when visiting B2B extension page, Story (Done).
- [DUOS-428](https://ownego.atlassian.net/browse/DUOS-428) — Security update of Composer dependencies, Task (QA Review) — task QA Hub DUOS-006.
- [DUOS-429](https://ownego.atlassian.net/browse/DUOS-429) — Upgrade to Laravel 12 — regression QA, Task (QA Review) — chưa có task QA Hub.

## Source

- Jira DUOS (Atlassian MCP), đọc 2026-10-07; `references/apps/DUOS.md`;
  QA Hub task DUOS-006.
- `knowledge-work/inventory/DUOS.md` (build 2026-10-08) § 1, 2.1, 2.16, 2.23, § 5 #5, #27, #28, #31.
