<!-- testlane knowledge KB-372 · kind=feature-profile · tag=App shell · status=draft · sourceUrl=https://github.com/ownego/qa-knowledge-work/blob/ae07d04a61509378493a9a07714b04f4e77a36e6/kb/MTRO/features/02-home-app-shell.md · createdAt=2026-10-08T08:01:00.214Z · updatedAt=2026-10-08T08:01:00.214Z -->

# 2. Home & khung app (sidebar, workspace switcher, user menu, topbar)

**Status:** draft

Phân tích ngày 2026-10-07 từ `inventory/MTRO.md` § 2.2 (staging đi thật 29/09/2026, role Owner; Member quan sát 23/09 ở workspace `Qikify QA Team`) và `references/apps/MTRO.md` (Jira MTRO-7 đọc 11/09). Chưa có business rule, task QA Hub hay test case nào cho phần này.

## Purpose

Khung chung của app workspace: điều hướng giữa các module, chuyển workspace, đăng xuất, mở cài đặt tài khoản. `Home` (MTRO-7 Dashboard) hiện chỉ là màn placeholder.

## Business Rules

### Sidebar — staging 29/09 (inventory, chưa có rule xác nhận)

- Thứ tự mục: `Home` → `Contacts` (submenu `Segments`, `Custom fields`, `Suppressions`, mở bằng `Toggle Contacts submenu`) → `Email library` (submenu `Saved blocks`) → `Email preferences` → `Campaigns` → `Automations` → `Settings` (nhóm `Account settings`, `API keys`, `Claude connector`, `Sending domains`, `Workspace settings`).
- Ở 1280×800 sidebar mặc định **thu gọn** (icon + tooltip); nút `Toggle sidebar` mở rộng.
- `Team members` (`/members`) **không** nằm trên sidebar — chỉ vào từ workspace switcher.
- `/settings` redirect sang `/settings/domains` (bundle router; staging 16/09).

### Workspace switcher & user menu — staging 29/09

- Workspace switcher góc trên trái (hiện tên workspace + role, vd `QW QA Workspace Owner`) → menu: nhóm `Teams` (danh sách workspace), `Team members`, `Workspace settings`, `Sign out`.
- User menu góc dưới trái → `Account settings`, `Sign out`.
- Topbar: `News` → toast `News` / `Not available yet.`; `Support` → toast `Not available yet.` (cùng key i18n `topbar.notAvailable`). Hai nút chưa có chức năng.

### Home — staging 29/09

- Route `/` và `/dashboard` đều là **Home**; `/` **không** redirect sang `/dashboard`, URL giữ nguyên (16/09).
- Nội dung: h1 "Welcome to QA Workspace" / "This is a placeholder dashboard screen." — chưa có số liệu tổng hợp nào.

### Router & phân quyền — bundle 29/09

- Router chỉ có `meta.requiresAuth` và `title`, **không có meta theo role** → mọi chặn quyền phải nằm ở API, không dựa vào route guard FE.
- Member (workspace `Qikify QA Team`, 23/09) vẫn thấy đủ 5 mục Settings, kể cả `API keys`, `Workspace settings` (inventory L38) — chưa xác nhận đây là đúng ý đồ.

### Route không tồn tại

- Trả **trang trắng** (không sidebar, không 404): `/analytics`, `/brand`, `/forms`, `/settings/billing`, `/settings/integrations` (thử 16/09), `/settings/security`, `/settings/sessions`, `/settings/two-factor` (23/09), `/lists` (01/10). `/contacts/tags` bị hiểu là contact id → `Not Found.` (01/10).

## Edge Cases

- Route không tồn tại → trang trắng: `Need confirm` Dev có trang 404 dự kiến không (inventory L31). Hiện khó phân biệt "chưa có" với "lỗi render".
- Member thấy `API keys` + `Workspace settings` trong sidebar: `Need confirm` PO đây có đúng quyền không (inventory L38); hint bundle `Only owners and admins can rename this workspace.` gợi ý Member vào được trang nhưng không sửa được.
- Mở thẳng `https://<workspace thứ hai>.wisle.app/` trong phiên đang đăng nhập → vào luôn, không hỏi lại mật khẩu / 2FA (23/09, inventory L30): `Need confirm` Dev đây là SSO cố ý.
- Home MTRO-7 khi làm thật: Epic (Jira đọc 07/10, To Do, chưa có story) mô tả US-2.1 (P1) dashboard send volume, trend open / click / bounce, ≥1 cảnh báo khi metric bất thường; US-2.2 (P0) quick action tạo campaign / email / automation; US-2.3 (P1) landing mặc định Campaigns / Statistics thay Home (xung đột US-2.1, cân nhắc theo role) — `Need confirm` PO lịch làm và chọn US nào.

## Testability Notes

- Gợi ý auto/manual MTRO-7 Dashboard: 30% / 70% (`references/apps/MTRO-auto-manual-ratio.md`, đề xuất 13/08, chưa chốt).
- Case cross-workspace (isolation) dùng workspace thứ hai `Qikify QA Team`, nơi tài khoản Owner chung hiện mang role Member (inventory § 4.1).

## Known Issues

See [known-issues.md](../known-issues/known-issues.md) for entries tagged `home-app-shell`.

## Related Jira Tickets

- MTRO-7 — Dashboard / Home, Epic, To Do — US-2.1 / 2.2 / 2.3, chưa có story con (Jira đọc 07/10).
- MTRO-18 — Brand guideline, Epic, To Do — 4 story To Do (MTRO-37→40); chưa có mục nào trên app (`/brand` trắng).
- MTRO-9 — Sign-up form, Epic, To Do — PO 02/10: chỉ cần đổ contact đăng ký newsletter + ebook về Mailtro; Dev nghiêng tích hợp qua trung gian gọi API; double opt-in chưa trả lời. `/forms` trắng.
- MTRO-47 — **"MKT Feedbacks"** (Jira 07/10; references 11/09 gọi là "Onboarding" — corrected), Epic, To Do — gom feedback team MKT (rename Templates, saved block page, display condition, font, folder…). Onboarding trong app không có ticket riêng; `/onboarding` chỉ ở Mailtro ID (xem [01-auth-mailtro-id](01-auth-mailtro-id.md)).

## Source

- `inventory/MTRO.md` § 1.3, § 2.2, § 2.18, L30, L31, L38 — staging 29/09/2026 (Member: 23/09).
- `references/apps/MTRO.md` § 2 — Jira đọc 11/09/2026.
- Jira MTRO-7, MTRO-9, MTRO-18, MTRO-47 — đọc 2026-10-07.
