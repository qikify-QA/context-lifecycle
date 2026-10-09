# MTRO — Inventory: hệ thống thật đang có gì

> File này ghi **những gì đang có trên hệ thống thật** tại thời điểm build. Nó không chứa rule đã xác nhận (xem [`business-rules/MTRO.md`](../business-rules/MTRO.md)), không chứa câu hỏi chưa chốt (xem [`open-questions/MTRO.md`](../open-questions/MTRO.md)), không chứa bối cảnh sản phẩm (xem [`references/apps/MTRO.md`](../references/apps/MTRO.md)). Ba thứ đó chỉ được **link** từ đây.
>
> **Trạng thái mô tả: staging ngày 2026-09-29, role Owner; riêng chương 2.3–2.6 (module Contacts), 2.7–2.8 (module Email library), 2.9 (module Email preferences), 2.10 (module Campaigns) và 2.11 (module Automations) build lại ngày 2026-10-01.** Mọi tên/hành vi cũ đã được xác nhận là đổi hoặc mất đều đã sửa thẳng trong chương feature; thứ đã bỏ khỏi hệ thống liệt kê ở [§ 5.4](#s5-4).

## Mục lục

- [0. Nguồn & thời điểm build](#s0)
- [1. Tổng quan feature & bản đồ route](#s1)
- [2. Feature theo trang](#s2)
  - [2.1. Auth & onboarding (Mailtro ID)](#c-auth)
  - [2.2. Khung app: sidebar, workspace switcher, user menu, topbar, Home](#c-shell)
  - [2.3. Contacts](#c-contacts)
  - [2.4. Segments](#c-segments)
  - [2.5. Custom fields](#c-fields)
  - [2.6. Suppressions](#c-suppressions)
  - [2.7. Email library & Email editor](#c-library)
  - [2.8. Saved blocks](#c-saved-blocks)
  - [2.9. Email preferences](#c-preferences)
  - [2.10. Campaigns: list & folder · wizard · report](#c-campaigns)
  - [2.11. Automations: list · builder · Reports & Test · Run history](#c-automations)
  - [2.12. Settings › Team members](#c-members)
  - [2.13. Settings › Account settings & 2FA](#c-account)
  - [2.14. Settings › API keys](#c-api-keys)
  - [2.15. Settings › Claude connector](#c-claude)
  - [2.16. Settings › Sending domains](#c-domains)
  - [2.17. Settings › Workspace settings](#c-workspace)
  - [2.18. Mục chưa có trên staging](#c-missing)
- [3. Custom config / feature flag](#s3)
- [4. Môi trường, tài khoản & data mẫu](#s4)
- [5. Phát hiện lệch](#s5) — [5.1 Còn mở](#s5-1) · [5.2 Đã đóng](#s5-2) · [5.3 Tra số cũ](#s5-3) · [5.4 Đã bỏ khỏi hệ thống](#s5-4)
- [6. Lịch sử build](#s6)

<a id="s0"></a>
## 0. Nguồn & thời điểm build

> **Build gần nhất: 2026-10-01 tối (16:33–16:38 +07), `--module email-preferences`, role Owner** (lượt 5/5 — **xong chuỗi build theo module**). Chỉ chương 2.9 Email preferences được đi lại; chương khác giữ nguyên chữ, chỉ đổi dòng tổng hợp (§ 0, § 1.1 dòng 2.9, § 1.3 ba route `/preferences*`, § 2.18 dòng MTRO-17, § 4.1 thêm dòng Email preferences, § 4.2 dòng preferences page, § 5, § 6).
>
> **Build trước đó: 2026-10-01 cuối chiều, `--module campaigns`, role Owner** (lượt 4/5). Chỉ chương 2.10 Campaigns được đi lại; chương khác giữ nguyên chữ, chỉ đổi dòng tổng hợp (§ 0, § 1.1 dòng 2.10, § 1.3 các route campaign, § 4.1 dòng Campaigns, § 5, § 6) và thêm ghi chú lượt này vào L02, L19–L21, L23, L34, L56.
>
> **Build trước đó: 2026-10-01 chiều muộn, `--module automations`, role Owner** (lượt 3/5). Chỉ chương 2.11 Automations được đi lại; chương khác giữ nguyên chữ, chỉ đổi dòng tổng hợp (§ 0, § 1, § 3 dòng "Giới hạn builder", § 4.1 dòng Automations, § 5, § 6) và, theo quyết định của Hae, sửa L01, L34, Đ01 cho khớp cú pháp merge tag hai ngoặc ([L51](#l51)).
>
> **Build trước đó: 2026-10-01 chiều, `--module email-library`, role Owner** (lượt 2/5). Chỉ chương 2.7 Email library & Email editor và 2.8 Saved blocks được đi lại; chương khác giữ nguyên chữ, chỉ đổi các dòng tổng hợp (§ 0, § 1, § 4, § 5, § 6) và thêm link L51 / L56 vào ô "Lệch mở" của 2.10, 2.11.
>
> **Build trước đó: 2026-10-01, `--module contacts`, role Owner** (lượt 1/5 trong chuỗi build theo module: contacts → email library → automations → campaigns → email preferences). Chỉ chương 2.3 Contacts, 2.4 Segments, 2.5 Custom fields, 2.6 Suppressions được đi lại; các chương khác giữ nguyên chữ của bản 29/09, chỉ đổi những dòng tổng hợp (§ 1, § 2.18, § 4, § 5, § 6) chạm tới module này.
>
> **Build toàn app trên staging trước đó: 2026-09-29, role Owner** (buổi chiều bổ sung một lượt tạo data mẫu `ash-inventory-*` để đi nốt các màn trước đó chỉ đọc được từ bundle; chị Nga cho phép). Mọi chương được đối chiếu với staging và bundle deploy ngày 28–29/09.
>
> **Bản này (2026-09-29, tối)**: tái cấu trúc theo feature/page và sửa nội dung theo § 5 — **không đi lại staging**. Nguồn dùng: bản `4ad0e71` (build 29/09), bản `c8949e6` (chi tiết đi thật 16/09 và 23/09 mà bản 29/09 chỉ ghi "giữ 23/09"), `business-rules/MTRO.md` (đọc để đóng các dòng lệch rule đã sửa), `list_tasks` QA Hub 29/09, header các file test case repo automation.

**Nhãn nguồn dùng trong file**

| Nhãn | Nghĩa |
|---|---|
| **staging 29/09** | đi thật trên UI ngày 29/09 |
| **staging 23/09 (giữ)** / **staging 16/09 (giữ)** | đi thật lần trước, 29/09 không đi lại; nội dung giữ nguyên |
| **bundle, chưa đối chiếu UI** | chỉ thấy trong router / i18n của bundle FE, chưa thấy trên màn hình |

| Nguồn | Vai trò | Đã đọc gì | Mốc |
|---|---|---|---|
| **Staging 01/10 tối** (`--module email-preferences`), Playwright MCP headed 1280×800 | workspace `https://qa-workspace.wisle.app` (`BASE_URL`) | Role **Owner** (phiên còn đăng nhập trong Chromium, không phải nhập 2FA): đi thật **~11 màn / dialog / trạng thái**: list `/preferences` (empty, 3 bước hướng dẫn), route-probe id cũ của `ash-inventory-pref`, `/preferences/new` (form mặc định, picker `Custom field`, dialog `New custom field` rỗng + gõ tên sai định dạng, form dirty 2 choice + tắt switch, tab `Mobile`, `Back` khi dirty), preview `What people see` (bấm `Save my choices` / `Unsubscribe from all emails` / `Open the page again` / `I clicked by mistake — resubscribe` — chỉ đổi trạng thái preview phía client, không gọi API). 8 screenshot `MTRO-preferences*.png` ở scratchpad `ash-email-preferences/` (không đưa vào repo) | 2026-10-01 16:33–16:38 +07 |
| **Bundle FE 01/10** (lượt email preferences) | i18n + component + endpoint module Email preferences | `mailtro.js` **không đổi** so với 4 lượt trước (`last-modified` 01/10 04:59:06 GMT, 1.663.094 byte). Đọc `page.preferences.*` (list, builder, `fieldDialog`, `errors`), `component.preferenceChoiceEditor.*`, `component.preferencePagePreview.*`, `page.campaignRecipients.preferences.*`, router `preferences/*`, component `PreferencePageBuilder` (lọc field `[Boolean]`, validate `se()`, Save `le()`, tạo field `pe()`), `PreferencePagePreview`, list (`used_in_campaigns`, 3 badge), store `ZF()`, resource `preference-pages` (GET / POST / PUT / DELETE), `contacts/attributes`, `CampaignRecipients` (`preferencePageId`, `filterMissing`), Send email automation (`preference_page_id`) | 2026-10-01 |
| QA Hub (01/10, lượt email preferences) | project `mailtro`, key `MTRO` | `list_tasks`: 16 task (không đổi), **không task nào mang tag Email preferences**; MTRO-022 (Custom field, 01/10) nhắc Email preferences trong RISK-05 và ghi "Picker Custom field của Email preferences — Confirmed (inventory L10)"; MTRO-020 (Analytics) BR-12 không tính click link preference. `search_knowledge`: **0 doc**. `get_project_context`: 1 item `Inventory MTRO` (cập nhật 01/10 09:30 UTC, file đính kèm vẫn bản lượt 2/5) | 2026-10-01 |
| **Staging 01/10 cuối chiều** (`--module campaigns`), Playwright MCP headed 1280×800 | workspace `https://qa-workspace.wisle.app` (`BASE_URL`) | Role **Owner** (phiên còn đăng nhập trong Chromium, không phải nhập 2FA): đi thật **~17 màn / menu / dialog / tab**: list (menu dòng Draft + Sent, 2 filter), wizard draft `QCO - Upsell Guide (01/10/2026)` (details sạch + dirty, Recipients + combobox `Preferences page`, Contents có design), `/campaigns/new/content` (empty + dialog `Choose email library` + `Create email library`, bắt request `mail-templates?per_page=50`), report Sent `Tepo Newsletter – Tháng 10/2026` (5 tab + dialog preview), report Sent 09/09 (metric `—`), report Draft (4 tab cũ, tab Settings), 1 route-probe id lạ, trang `/preferences` (đếm page). 8 screenshot `MTRO-campaign*.png` ở scratchpad `ash-campaigns/` (không đưa vào repo) | 2026-10-01 16:21–16:26 +07 |
| **Bundle FE 01/10** (lượt campaigns) | i18n + component + endpoint module Campaigns | `mailtro.js` **không đổi** so với 3 lượt trước (`last-modified` 01/10 04:59:06 GMT, 1.663.094 byte). Đọc `page.campaigns.*`, `page.campaignReport.*`, `page.campaignBuilder/Details/Sender/Recipients/Content.*`, `component.campaignPreviewDialog/SendSheet/ScheduleDialog/campaignAudience.*`, component `CampaignBuilder` (điều kiện hiện `Save`, param `new`), `TemplatePicker`, store `WF()` (`per_page:50`, nạp một lần), `MoveToFolderDialog` | 2026-10-01 |
| Repo automation `qikify-QA-mailtro` (01/10, lượt campaigns) | đối chiếu case module Campaigns | commit `2808647`: `docs/manual-testcases/07-campaigns/list.md` (45 case, 19/08 + chạy 27/08), `wizard.md` (61 case, 19/08 + rà 25/08), `report.md` (4 tab, 19/08); `docs/business-rules/MTRO.md` § Campaigns | 2026-10-01 |
| QA Hub (01/10, lượt campaigns) | project `mailtro`, key `MTRO` | `list_tasks`: 16 task (không đổi); MTRO-009 (wizard, 61 case: 45 passed · 11 blocked · 5 failed, sửa 26/08), MTRO-012 (list, 45 case: 39 passed · 4 blocked · 2 failed, sửa 27/08); không có task cho `report.md`. `search_knowledge`: **0 doc**. `get_project_context`: 1 item `Inventory MTRO` (cập nhật 01/10 09:16 UTC, file đính kèm vẫn bản lượt 2/5) | 2026-10-01 |
| **Staging 01/10 chiều muộn** (`--module automations`), Playwright MCP headed 1280×800 (tạm 1680×900 để click node bị panel che, [L06](#l06)) | workspace `https://qa-workspace.wisle.app` (`BASE_URL`) | Role **Owner** (phiên còn đăng nhập trong Chromium, không phải nhập 2FA): đi thật **~27 màn / panel / dialog / trạng thái**: list (trang 1–2, filter Draft / Active / All, search, menu dòng Active / Paused), builder automation `Test` (Trigger + `Change trigger` + `Which fields?`, split với operator text / ngày + 2 điều kiện, Send email + menu biến + 3 kiểu tag, Update contact field + `SMS` + `Use