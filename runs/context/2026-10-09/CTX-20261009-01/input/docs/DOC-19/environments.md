<!-- testlane knowledge KB-365 · kind=env · tag=— · status=draft · sourceUrl=https://github.com/ownego/qa-knowledge-work/blob/18e5531b0531cc8ed211d45de290a9aecfdf837c/kb/DUOS/testing/environments.md · createdAt=2026-10-08T07:55:17.043Z · updatedAt=2026-10-08T09:38:08.820Z -->

# Environments — Duos B2B (DUOS)

**Status:** draft

Môi trường staging, store test, cách bật cấu hình theo store. Dựng 2026-10-07
từ test case + bản phân tích trên QA Hub (task DUOS-001…DUOS-006) và
`business-rules/DUOS.md`. Đã đối chiếu inventory 2026-10-08 (store
`stg-duos-plus-2`, Free plan) — phần ✅/🟡/❌ xem `inventory/DUOS.md` (§ 0,
§ 4). Store khác ngoài `stg-duos-plus-2` **chưa verify** qua inventory. Không
ghi tài khoản / mật khẩu / token ở đây.

## Các bề mặt (surface) của app

| Surface | Ai dùng | Ghi chú | Nguồn |
|---|---|---|---|
| **Portal** (embedded app trong Shopify admin) | Merchant | Sidebar "B2B extensions" · "Notifications" · "Translations" · "Pricing" (+ Home). Trang: "B2B extensions hub", "B2B Company management" (ticket: Company submissions), form builder, "Notifications", "Subscription" (Pricing), "Content & Translation", "Quote widget settings"… Tên app trong admin staging: "Staging GetDous" | Task QA Hub DUOS-004, DUOS-005, DUOS-006; quan sát staging 2026-10-08 (inventory/DUOS.md § 1) |
| **Admin panel nội bộ** (Filament) | Team Qikify / Ops | Shops → shop detail → mục "Token and scopes"; JSON editor `users.config` của từng shop | DUOS-399 (task DUOS-001), DUOS-413 (task DUOS-003) |
| **Customer Account extension** | Buyer B2B | Company member, Quick Order, Shopping list, My Quotes, Finance & Payment report | references/apps/DUOS.md § 2 |
| **Storefront / SDK** (theme app extension) | Buyer | Registration form, Add to Quote, Save to Shopping list | references/apps/DUOS.md § 2; DUOS-424 |
| **Admin UI extension** (trong Shopify admin, trang Company / Location) | Merchant | Member list của company location, block credit info (DUOS-398) | task DUOS-003 mục 7 |
| **Checkout extension** | Buyer (chỉ Shopify Plus) | Block checkout by permission / by credit | references/apps/DUOS.md § 1 |
| **Shopify Flow** (trigger + action của app) | Merchant | Action "assign role", trigger "company approved", "member role updated" | DUOS-405, DUOS-424 |

## Staging

| Thành phần | Host | Nguồn | Mức tin |
|---|---|---|---|
| Shopify admin app | `https://admin.shopify.com/store/stg-duos-plus-2/apps/staging-getdous` | inventory/DUOS.md § 4 | Quan sát staging 2026-10-08 |
| Admin panel (Filament) | `https://staging-admin.getduos.io` — login `/admin/login` chỉ có **"Sign in with Slack"** | Precondition TC-DUOS-001, TC-DUOS-036; inventory/DUOS.md § 2.23 | Quan sát staging 2026-10-08 (chỉ trang login) |
| API | `staging-api.getduos.io` (VD `POST /api/company-submissions`) | Actual result TC-DUOS-166, TC-DUOS-219 (2026-10-01); inventory/DUOS.md § 4 | Quan sát thật bởi sonder; khớp inventory 2026-10-08 |
| Embedded portal | `staging-embedded.getduos.io` (sonder) · `staging-portal.getduos.io` (bundle portal trong iframe, console) | Actual result TC-DUOS-219 (2026-09-30); inventory/DUOS.md § 4 | ⚠ Lệch staging 2026-10-08: iframe Portal tải bundle từ `staging-portal.getduos.io` (inventory/DUOS.md § 5 #29) — Need confirm với Dev host nào đúng / cả hai cùng dùng |

- Route Portal quan sát được: `/extensions/company-submissions/settings` (nút
  "Spam protection settings", h1 trang "Spam protection") — TC-DUOS-156,
  2026-09-30; label h1 theo quan sát staging 2026-10-08 (inventory/DUOS.md
  § 2.4). Bản đồ route đầy đủ: inventory/DUOS.md § 1 (route `/dashboard` không
  tồn tại).
- **Health check pre-flight**: mở `https://staging-admin.getduos.io/admin/login`
  (trang "Get Duos Admin — Sign in" hiện ra = staging sống) — không cần đăng
  nhập. Nguồn: inventory/DUOS.md § 0, § 2.23 (2026-10-08).
- Gọi `GET /api/user/config` không kèm session → HTTP 400
  `{"message":"Missing Authorization key in headers array"}` (không lộ data,
  nhưng không phải 401/403) — TC-DUOS-219, 2026-09-30.

## Store staging dùng chung

| Store | Instance | Trạng thái đã biết | Dùng cho | Nguồn |
|---|---|---|---|---|
| `stg-duos-plus-2` | 70 | Shopify Plus; đã migrate **expiring token**. Quan sát 2026-10-08: app ở **Free plan** ("Current subscription: Free"), **8 extension Inactive**, app embed **Disabled**, Setup guide 0/3; storefront có **password** (chưa có mật khẩu); 0 form / submission / quote / shopping list / transaction credit; 2 company mẫu Snowdevil, Powderbound; không có tài khoản buyer | Token (DUOS-001), Pricing (DUOS-005), regression composer audit (DUOS-006) | business-rules/DUOS.md (DUOS-399, 2026-07-08); precondition TC-DUOS-303; inventory/DUOS.md § 0, § 4 (2026-10-08) |
| `stg-duos-email-testing-advanced` | 67 | Đã migrate expiring token; plan Advanced (theo tên — `Need confirm`) | Token, Pricing non-Plus | business-rules/DUOS.md |
| `staging-duos-ngant-3` | 22 | Giữ **legacy token** (đối chứng DUOS-399); **flag `enable_company_creation_on_submit` đang ON** từ 2026-09-30 | Token legacy; B2B Registration auto company creation (DUOS-004) | business-rules/DUOS.md; actual TC-DUOS-150, TC-DUOS-159 |
| `stg-duos-email-testing-grow` | 68 | Giữ legacy token; plan Grow (theo tên — `Need confirm`) | Token legacy, Pricing non-Plus | business-rules/DUOS.md |
| `staging-duos-ngant-9` | 30 | Giữ legacy token; có thể đang free (không có charge active — `Need confirm` với Dev) | Re-login legacy (TC-DUOS-015), Pricing không charge (TC-DUOS-307) | business-rules/DUOS.md; TC-DUOS-307 |

- `Need confirm` (Dev): trạng thái token của 5 store trên vẫn như comment
  DUOS-399 ngày 02/07/2026 không (câu hỏi 9 task DUOS-001).
- Môi trường chưa đáp ứng rule (inventory/DUOS.md § 5 #30): rule chỉ định
  `stg-duos-plus-2` (Plus) cho chặn checkout, nhưng store đang Free plan, 8
  extension Inactive, app embed Disabled, storefront có password, không có
  tài khoản buyer → **không test được** chặn checkout / storefront /
  Customer Account trên store này. Cần Hae / chị Nga xin Dev bật gói test +
  mật khẩu storefront + tài khoản buyer. Thao tác cart/checkout trên store
  này chưa được duyệt cho sub-agent.
- **Chưa có store flag OFF** cho B2B Registration: mọi case "luồng cũ / flag OFF"
  của task DUOS-004 bị treo vì `staging-duos-ngant-3` đang flag ON
  (TC-DUOS-159, 173, 175, 202, 204, 209, 210 — 2026-09-30). Cần BE tắt flag
  hoặc cấp store thứ 2.
- Store dev thông thường **không thấy SuggestedPlans** ở trang Pricing vì code
  coi store dev là Plus (`test` / `staff` / `Plus Trial`) hoặc loại ra
  (`partner_development`) — KB-001/KB-002 QA Hub (Dev haild, Slack 05/10/2026).
  Cách giả lập non-Plus phía FE: xem
  [../features/10-pricing-plans.md](../features/10-pricing-plans.md) § Testability.

## Cấu hình theo store (không có UI Portal)

Đặt trong `users.config` của shop, sửa qua JSON editor ở admin panel (BE/Ops
làm, QA không tự sửa):

| Key | Ý nghĩa | Nguồn |
|---|---|---|
| `customer-permission.allow_all_members_read_members` | Mọi member xem được trang Company member ở chế độ view-only (chỉ bật cho shop Ironwear) | DUOS-413, comment haptt 15/09/2026 |
| `enable_company_creation_on_submit` | Submit registration form tự tạo Company (Ca' Pietra) | DUOS-425, comment haild 22/09/2026 |
| `company_creation_catalog_ids` | Catalog gán cho location do job tạo | DUOS-425, haptt 23/09/2026 |
| `company_creation_rate_limit {per_minute, per_day}` | Override rate limit theo shop (mặc định 10/phút, 50/ngày) | DUOS-425, haptt 23/09 + 25/09/2026 |
| `company_submission_captcha {enabled, site_key, secret_key, min_score}` | reCAPTCHA v3 — 3 key đầu có UI ("Spam protection settings"), `min_score` chỉ BE set | DUOS-425, haptt/haild 23/09/2026 |

## Hạn chế môi trường đã gặp

- Rate limit IP trên `POST /company-submissions` (4/phút, 20/ngày, cửa sổ cố
  định 24h) áp cho **cả team dùng chung 1 IP** → test registration form tốn
  quota; chưa có cách reset limit theo IP (GAP-16 task DUOS-004).
- Sub-agent sonder bị hệ thống quyền chặn sửa cấu hình store dùng chung
  (form builder, Spam protection settings) — nhiều case DUOS-004 phải chạy tay
  (actual result TC-DUOS-155…238, 2026-09-30).
- Không có hộp thư test đọc được cho mọi luồng email (GAP-01 task DUOS-006).
- Giả lập thời gian (hạn token 60 phút / 90 ngày / mốc 2027-01-01) cần Dev
  (câu hỏi 1 task DUOS-001) — `Need confirm`.

## Related

- Không có repo automation Playwright cho DUOS (chưa thấy trong nguồn) —
  `Need confirm`.
- `knowledge-work/inventory/DUOS.md` (build 2026-10-08, store
  `stg-duos-plus-2`) — nguồn đối chiếu môi trường § 0, § 4, § 5 #29, #30.
