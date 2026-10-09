# DUOS — Inventory: hệ thống thật đang có gì

> Ghi **những gì đang có trên hệ thống thật** tại thời điểm build. Không chứa rule đã xác nhận (→ [`business-rules/DUOS.md`](../business-rules/DUOS.md)), không chứa câu hỏi chưa chốt (→ [`open-questions/DUOS.md`](../open-questions/DUOS.md)), không chứa bối cảnh sản phẩm (→ [`references/apps/DUOS.md`](../references/apps/DUOS.md), [`references/apps/DUOS-quotation.md`](../references/apps/DUOS-quotation.md)). Ba thứ đó chỉ được **link** từ đây. KB tổng hợp theo ticket: [`kb/DUOS/`](../kb/DUOS/).

## 0. Nguồn & thời điểm build

| Nguồn | Vai trò | Đã đọc gì | Mốc |
|---|---|---|---|
| Code Duos (portal FE, `qikify/b2b-api`, extension) | — | **không đọc được** — không có clone local | — |
| Staging (Playwright MCP, headed 1280×800) | Shopify admin embedded app **"Staging GetDous"** · `https://admin.shopify.com/store/stg-duos-plus-2/apps/staging-getdous` · dev store `stg-duos-plus-2` (Shopify Plus, instance 70). Bundle portal tải từ `https://staging-portal.getduos.io/assets/…` (console), API `https://staging-api.getduos.io/api/…` | Đi đủ 4 mục sidebar (B2B extensions · Notifications · Translations · Pricing) + Home; mở cả 8 extension trong "B2B extensions hub" và các trang con (Spam protection, Credit management › company › location, Manage roles + modal xem 3 default role + modal "Create custom role" bước 1, Quote widget settings, Quote PDF template, Manage shopping lists › company); 5 tab Notifications + 1 "Edit template"; Shopify admin › Companies › Snowdevil › location (Admin UI block). 17 screenshot | 2026-10-08 15:38–16:11 (+07) |
| Storefront dev store | `https://stg-duos-plus-2.myshopify.com/` | chỉ tới `/password` — **không có mật khẩu storefront của store này**, không đi tiếp | 2026-10-08 |
| Admin panel nội bộ (Filament) | `https://staging-admin.getduos.io/admin/login` | trang login chỉ có **"Sign in with Slack"** — không đăng nhập được bằng tài khoản Shopify, không thử thêm | 2026-10-08 |
| QA Hub project `DUOS` (`proj-0b7fef03-…`) | tag task + knowledge + context | `list_tasks` → 6 task (DUOS-001…006); `search_knowledge` → 50 doc business-rule (KB-009…KB-097, giới hạn 50) + 1 known-issue (KB-364) + 2 env (KB-365/366) + 6 product (KB-346, 359–363) + feature-profile (mirror 12 file `kb/DUOS/features/`, đọc bản local); `get_project_context` → 0 item | 2026-10-08 |
| knowledge-work (đối chiếu) | nguồn kỳ vọng cho § 5 | `references/apps/DUOS.md`, `DUOS-quotation.md`, `business-rules/DUOS.md` (cập nhật 2026-10-07), `open-questions/DUOS.md`, `kb/DUOS/` (README, feature-map, environments, 12 file features — label UI theo ticket, chưa verify) | 2026-10-08 |
| Confluence / Jira | — | **không đọc** — Hae không đưa space/trang; MCP Atlassian trong session chỉ đọc trang Confluence theo id / issue theo ARI, không search. Số ticket ở file này lấy từ business-rules / KB | — |

- **Build bởi**: skill `build-app-context` (sub-agent ash), Playwright MCP headed. Session Shopify admin còn hiệu lực — không qua màn login/2FA.
- **Phiên bản hệ thống lúc build**: `staging @ 2026-10-08 15:38–16:11 (+07) — sau lần DUOS-005 (Jira DUOS-430/431 Pricing, QA Hub cập nhật 2026-10-05) giao QA cuối; DUOS-004 (DUOS-424/425/426) done 2026-10-02 · Fix Version không rõ · hash: không rõ`.
- **Build lần trước**: không có — đây là build đầu (`inventory/DUOS.md` chưa từng có; QA Hub chưa có item `Inventory DUOS`).
- **Quy mô**: § 2 có 23 mục (lần trước 0) · § 5 có 31 dòng (lần trước 0).
- **Đã gỡ so với build trước**: không (build đầu).
- **Trạng thái dữ liệu store lúc build** (ảnh hưởng mức đi sâu): store đang **Free plan** của app ("Current subscription: Free", "No items selected"); cả 8 extension **Inactive**; app embed **Disabled**; Setup guide 0/3; **0 form**, **0 submission**, **0 quote**, **0 shopping list**, 0 transaction credit. Shopify có 2 company mẫu (Snowdevil, Powderbound — mỗi company 1 location).
- **Nguồn không đọc được lần này**:
  - Code → § 1 không có router, § 2 không có label i18n, § 3 không xác minh được flag nào.
  - Customer Account extensions (Company member, Quick order, Shopping list, Quotes, Finance) — **không có tài khoản buyer**; Storefront — **password page**; Checkout extension — cần buyer + cart. Tất cả ❌ ở § 2.19–2.21.
  - Admin panel Filament — chỉ Slack OAuth (🟡 § 2.23).
  - Form builder registration — store chưa có form, nút "Create form" sẽ tạo dữ liệu → **không bấm**. Submission detail / Approve — không có submission.
  - Quote detail, shopping list detail, ledger có dữ liệu — không có data.
  - Field site key / secret key của Spam protection — chỉ hiện khi tick "Enable reCAPTCHA"; thao tác tick bị hệ thống quyền chặn → không xem.
  - Shopify Flow (trigger/action của app) — không mở ("Open Shopify Flow" không bấm).
  - Jira / Confluence — xem bảng trên.
- **Thao tác có tác động phụ (đã ghi lại)**: (1) Mở modal xem quyền "Admin" / "Junior buyer" / "Senior buyer" → Close/Escape. (2) Mở modal "Create custom role" (bước 1) → **Close**, không nhập gì, không bấm Next. (3) Mở "Edit template" của "Credit limit assigned to a company location" → rời trang; trình duyệt hiện hộp thoại `beforeunload` (editor Unlayer coi là có thay đổi dù chưa sửa gì) → chọn rời trang, **không Save**, không bấm "Activate". (4) Bấm accordion "Content" ở Quote PDF template (chỉ mở rộng, không đổi field). (5) Thử tick "Enable reCAPTCHA" để xem field — **bị hệ thống quyền chặn, không thực hiện**. Không Save, không Run bulk assign, không đổi radio/checkbox/switch nào, không tạo company/role/form, không thêm gì vào cart.
- **Screenshot**: 17 file `DUOS-<slug>.png` ở `…/scratchpad/ash-DUOS/` (home, extensions, extensions-company-submissions, company-submissions-settings, credit-limit, finance, company-members, roles-permissions, quotation, quotation-settings, quotation-template-pdf-preview, csv-upload, sku, shopping-list, notifications, translation, pricing) — không commit. Lưu ý: chụp sau `page.goto` ra ảnh trắng; ảnh hợp lệ chụp sau khi điều hướng bằng click. Bằng chứng label chính là accessibility snapshot trong iframe `app-iframe`.

## 1. Bản đồ màn hình / route

Route là phần sau `https://admin.shopify.com/store/stg-duos-plus-2/apps/staging-getdous`. Tên màn hình = h1/h2 trong iframe. Nguồn: staging 2026-10-08.

| Route / vị trí | Màn hình | Nguồn |
|---|---|---|
| `/` | **"Welcome to Duos B2B,"** (Home) | staging |
| `/extensions` | **"B2B extensions hub"** (sidebar "B2B extensions") | staging |
| `/extensions/company-submissions` | **"B2B Company management"** (row "B2B registration") | staging |
| `/extensions/company-submissions/settings` | **"Spam protection"** (nút "Spam protection settings") | staging |
| `/extensions/credit-limit` | **"Credit management"** (row "Credit limit") | staging |
| `/extensions/credit-limit/<companyId>` | company detail (h1 = tên company), tab "Location" | staging |
| `/extensions/credit-limit/<companyId>/location/<locationId>?companyName=…&locationDBId=…&locationName=…` | location detail (h1 = tên location, nút "Download statement") | staging |
| `/extensions/finance` | **"Finance & payment"** | staging |
| `/extensions/company-members` | **"Users & permission"** (row "Users & permissions") | staging |
| `/extensions/company-members/roles-permissions` | **"Roles & permissions"** (nút "Manage roles") | staging |
| `/extensions/quotation` | **"Quote management"** (row "Quote requests") | staging |
| `/extensions/quotation/settings` | **"Quote widget settings"** | staging |
| `/extensions/quotation/template-pdf-preview` | **"Quote PDF template"** (nút "Back to Quotes") | staging |
| `/extensions/csv-upload` | **"Quick order with CSV Upload"** (row "CSV Upload") | staging |
| `/extensions/sku` | **"Quick order with SKUs"** (row "SKU Order") | staging |
| `/extensions/shopping-list` | **"Shopping list"** (settings) | staging |
| `/extensions/shopping-list/companies` | "Shopping list" — "Manage shopping lists across your B2B clients" | staging |
| `/extensions/shopping-list/<companyId>` | company › bảng location "Number of shopping list" | staging |
| `/notifications` | **"Notifications"** | staging |
| `/notifications/templates/0?type=credit-assigned` | editor template email (Unlayer) | staging |
| `/translation` | **"Content & Translation"** (sidebar "Translations") | staging |
| `/pricing` | **"Subscription"** (sidebar "Pricing") | staging |
| Shopify admin `/companies/<id>/locations/<id>` | trang location Shopify — vùng "Blocks" (target `admin.company-location-details.block.render` của app) | staging (console) |
| `staging-admin.getduos.io/admin/login` | "Get Duos Admin — Sign in" | staging |

Sidebar app (App Bridge nav): `B2B extensions` · `Notifications` · `Translations` · `Pricing`; link gốc "Staging GetDous" = Home.

Route **không tồn tại** (tính tới 2026-10-08): `/dashboard` (iframe trống, chỉ nút "Open chat").

## 2. Feature

Thứ tự theo sidebar → thứ tự row trong "B2B extensions hub" → bề mặt ngoài Portal.

## 3. Custom config / feature flag

Không có clone code → **không xác minh được flag nào**. Các key dưới đây chỉ là danh sách theo nguồn thứ cấp (business-rules / KB, comment Dev), đặt trong `users.config` của shop qua JSON editor admin panel (§ 2.23 — không vào được). Không có UI Portal cho key nào trong số này (quan sát staging: không thấy setting tương ứng ở § 2).

| Flag | Mặc định | Bật thì gì đổi | Nguồn |
|---|---|---|---|
| `enable_company_creation_on_submit` | off | submit form → job tạo Company/Location/Main contact (§ 2.3) | business-rules § "Cờ `enable_company_creation_on_submit`…" (haild 22/09/2026) — chưa xác minh |
| `company_creation_catalog_ids`, `company_creation_rate_limit` | — | catalog gán cho location do job tạo; override 10/phút + 50/ngày | business-rules (haptt 23/09/2026) — chưa xác minh |
| `company_submission_captcha.min_score` | 0.5 | ngưỡng reCAPTCHA (không có UI, § 2.4) | business-rules (DUOS-425) — chưa xác minh |
| `customer-permission.allow_all_members_read_members` | off | mọi member xem Company member view-only (§ 2.19) | business-rules (DUOS-413) — chưa xác minh |
| `customer-permission.hideDefaultRoles`, `adminRoleDisplayName`, `disableCreateRole`, `enable_edit_locked_role_permissions`, `allowZeroSubtotalCheckout`, `hideRoleManageButton` + `roleManageLinkUrl` + `roleManageLinkLabel`, `quotation.skip_reassign_on_revoke` | off | tuỳ biến role / checkout / quote theo merchant (§ 2.8, 2.9) | business-rules § "Tuỳ biến role theo merchant chỉ bật qua `users.config`…" — chưa xác minh |
| `download_catalog_condition` | — | loại sản phẩm khỏi file "Download catalog" theo tag (§ 2.13) | business-rules (DUOS-342) — chưa xác minh |

## 4. Môi trường test

| Thứ | Giá trị | Ghi chú |
|---|---|---|
| Shopify admin app | `https://admin.shopify.com/store/stg-duos-plus-2/apps/staging-getdous` | tên app trong admin: "Staging GetDous" |
| Portal (iframe) | `staging-portal.getduos.io` (theo URL bundle trong console) | KB ghi `staging-embedded.getduos.io` — xem § 5 |
| API | `staging-api.getduos.io` | |
| Admin panel | `https://staging-admin.getduos.io/admin/login` | Slack OAuth |
| Dev store | `stg-duos-plus-2` | Shopify Plus (title tab "Shopify Plus"); app ở **Free plan**, 8 extension Inactive, app embed Disabled; storefront có password (không có trong `.env` đã biết) |
| Tài khoản | biến `SHOPIFY_EMAIL` / `SHOPIFY_PASSWORD` (repo `shopify-app/.env`) — staff store | không có tài khoản buyer / Customer Account |
| Data mẫu | company "Snowdevil" (1 location, contact có sẵn, Market Canada, "Catalog for Canada", 3 draft order), "Powderbound" (1 location, "Not approved", "No main contact"); 0 form / submission / quote / shopping list / transaction credit | Shopify admin › Companies — 2026-10-08 |
| Quyền thao tác cart/checkout | **chưa được duyệt** | không có dòng "Được phép" → ash không thêm vào cart, không checkout |

## 5. Phát hiện lệch — build ngày 2026-10-08

Người đọc quyết, skill không tự sửa. Cột **BR bị ảnh hưởng**: rule có tên ở đây bị coi là **đang lệch**.

| # | Loại | Chi tiết | BR bị ảnh hưởng | Đề xuất |
|---|---|---|---|---|
| 28 | Reference nói có, hệ thống không có route | `references/apps/DUOS.md` § 2 "có thêm **Dashboard** riêng (Epic DUOS-46)" — sidebar không có mục Dashboard; `/dashboard` trả iframe trống; Home là "Welcome to Duos B2B," | — | hỏi Dev Dashboard đã gỡ/gộp vào Home chưa; sửa reference |
| 29 | Môi trường lệch KB | Portal iframe tải từ `staging-portal.getduos.io` (console bundle); KB `testing/environments.md` (KB-365) ghi embedded portal `staging-embedded.getduos.io` | — | sửa KB environments (cần Dev xác nhận host nào là đúng) |
| 30 | Môi trường không đáp ứng rule | Store `stg-duos-plus-2` đang **Free plan**, 8 extension Inactive, app embed Disabled, storefront có password → không test được chặn checkout / storefront / Customer Account trên store mà rule chỉ định | `business-rules/DUOS.md § "Chặn checkout theo permission / theo credit chỉ chạy trên Shopify Plus"` | Hae/chị Nga quyết: xin Dev bật gói test + password storefront + tài khoản buyer cho store này |

> Dòng gắn module ở file module: 01-welcome-to-duos-b2b-home 28.


## Tách file (QA Hub)

| File | Nội dung |
|---|---|
| `DUOS-00-overview.md` | Tổng quan (file này) |
| `DUOS-01-welcome-to-duos-b2b-home.md` | Chương 2 + phát hiện lệch: Welcome to Duos B2B, (Home) … Get Duos Admin (admin panel nội bộ Filament) |
