<!-- testlane knowledge KB-392 · kind=product · tag=— · status=draft · sourceUrl=https://github.com/ownego/qa-knowledge-work/blob/ae07d04a61509378493a9a07714b04f4e77a36e6/kb/MTRO/product/overview.md · createdAt=2026-10-08T08:02:42.041Z · updatedAt=2026-10-08T08:02:42.041Z -->

# Product Overview — Mailtro (MTRO)

**Status:** in-review

Dựng ngày 2026-10-07 từ `references/apps/MTRO.md` (Jira đọc 11/09/2026), `inventory/MTRO.md` (staging đi thật 29/09 và 01/10/2026, role Owner) và `business-rules/MTRO.md` (cập nhật tới 18/09/2026). Chỗ hai nguồn lệch nhau, mô tả hệ thống thật theo inventory, rule cũ ghi ở file feature tương ứng kèm chữ "corrected".

## Mailtro là gì

SaaS **email marketing multi-tenant** (theo workspace): quản lý contact, custom field, segment; thiết kế email bằng drag-and-drop editor; tạo / lên lịch / gửi campaign; automation flow theo trigger; trang Email preferences cho người nhận; báo cáo delivery / open / click / unsubscribe; quản lý suppression (bounce, complaint, unsubscribe).

**Không phải Shopify app** — không có theme, Shopify plan, checkout extensibility, development store. Mọi ràng buộc môi trường là staging vs production của chính Mailtro. Mailtro hiện không tích hợp với các app Shopify khác của team (không dùng tag `[Cross-app]`). Nguồn: `references/apps/README.md`, ADR 0008 của repo automation.

## Kiến trúc 2 domain (rất quan trọng khi viết Preconditions / Steps)

| Thành phần | Staging | Biến `.env` repo automation | Chứa gì |
|---|---|---|---|
| **Mailtro ID** (service auth) | `https://staging-id.mailtro.ai` | `AUTH_URL` | `/login`, `/login/two-factor-challenge`, `/signup`, `/forgot-password`, `/reset-password`, `/verify`, `/onboarding`, `/` (**Choose a workspace**) |
| **App workspace** | `https://<workspace-slug>.wisle.app` (QA dùng `qa-workspace`) | `BASE_URL`, suffix `WORKSPACE_DOMAIN_SUFFIX` = `.wisle.app` | toàn bộ tính năng trong app |
| Bundle FE | `staging-portal.mailtro.ai`, `staging-login.mailtro.ai` | — | nguồn đọc route / i18n của inventory |
| MCP connector | `https://staging-mcp.mailtro.ai/mcp` | — | Claude connector |

- Điều hướng sau signup / verify / login là **cross-domain** (Mailtro ID → `<slug>.wisle.app`). Mở route cần auth trên workspace khi chưa đăng nhập → đi `AUTH_URL/login?returnTo=…/authorize?redirect_uri=https://<slug>.wisle.app/callback&state=…` (inventory § 1.2, staging 29/09).
- Phiên đăng nhập dùng chung giữa các workspace của cùng tài khoản: mở thẳng workspace thứ hai không hỏi lại mật khẩu / 2FA (inventory L30, quan sát 23/09 — `Need confirm` với Dev đây là SSO cố ý).

## Sidebar (thứ tự thật, staging 29/09) → file feature

| Sidebar | Route | File KB |
|---|---|---|
| *(Mailtro ID)* | `staging-id.mailtro.ai/*` | [01-auth-mailtro-id](../features/01-auth-mailtro-id.md) |
| `Home` + khung app (workspace switcher, user menu, `News`, `Support`) | `/`, `/dashboard` | [02-home-app-shell](../features/02-home-app-shell.md) |
| `Contacts` | `/contacts`, `/contacts/import`, `/contacts/:id` | [03-contacts](../features/03-contacts.md) |
| Contacts › `Segments` | `/segments` | [04-segments](../features/04-segments.md) |
| Contacts › `Custom fields` | `/contacts/fields` | [05-custom-fields](../features/05-custom-fields.md) |
| Contacts › `Suppressions` | `/contacts/suppressions` | [06-suppressions](../features/06-suppressions.md) |
| `Email library` | `/templates`, `/templates/:id` | [07-email-library](../features/07-email-library.md) |
| Email library › `Saved blocks` | `/saved-blocks` | [08-saved-blocks](../features/08-saved-blocks.md) |
| `Email preferences` | `/preferences` | [09-email-preferences](../features/09-email-preferences.md) |
| `Campaigns` | `/campaigns`, `/campaigns/:id/*` | [10-campaigns](../features/10-campaigns.md) · [11-campaign-report](../features/11-campaign-report.md) |
| `Automations` | `/automations` | [12-automations-list-builder](../features/12-automations-list-builder.md) · [13-automation-reports-run-history](../features/13-automation-reports-run-history.md) |
| Workspace switcher › `Team members` | `/members` | [14-team-members](../features/14-team-members.md) |
| Settings › `Account settings` | `/settings/account` | [15-account-settings-2fa](../features/15-account-settings-2fa.md) |
| Settings › `API keys`, `Claude connector`, `Workspace settings` | `/settings/api-keys`, `/settings/claude`, `/settings/workspace` | [16-api-keys-claude-workspace](../features/16-api-keys-claude-workspace.md) |
| Settings › `Sending domains` | `/settings/domains` | [17-sending-domains](../features/17-sending-domains.md) |
| *(BE xuyên suốt — không có trên sidebar)* | trang staff riêng | [18-security-abuse-guard](../features/18-security-abuse-guard.md) |

## Trạng thái phát triển (Jira đọc 2026-10-07)

112 issue (MTRO-6 → MTRO-122): To Do 47 · QA Review 39 · In Progress 10 · DONE 10 · PASS 5 · Code Review 1. Epic Login/Signup (MTRO-30) đã PASS; phần còn lại phần lớn ở QA Review, nhiều story QA Review có **description trống** (MTRO-51, 55–58, 63, 70, 84, 85, 86, 91, 95, 98…) — spec phải lấy từ staging. Epic MTRO-47 "MKT Feedbacks" gom yêu cầu mới của team MKT sau khi dùng thật (rename Templates, display condition, custom font, folder template…). 3 Bug đang mở: MTRO-106, MTRO-114, MTRO-101. Chi tiết: [feature-map](feature-map.md).

## Role

3 role chuẩn **Owner / Admin / Member** + custom role (rule MTRO-20/MTRO-46, 07/08). Router FE không có meta phân quyền theo role (inventory § 1.3) — chặn quyền phải nằm ở API. Chi tiết: [14-team-members](../features/14-team-members.md).

## Chưa có trên staging (01/10/2026)

MTRO-18 Brand guideline (`/brand` trắng), MTRO-9 Sign-up form (`/forms` trắng), Billing (`/settings/billing` trắng), quản lý phiên / thiết bị, onboarding trong app (`/onboarding` chỉ ở Mailtro ID; MTRO-47 trên Jira thực ra là epic "MKT Feedbacks"); MTRO-7 Dashboard chỉ là placeholder; MTRO-16 Analytics chỉ có ở Campaign report + Automation Reports, chưa có trang analytics tổng. Route không tồn tại trả **trang trắng**, không 404 (inventory § 2.18, L31). Xem [feature-map](feature-map.md).

## Source

- `references/apps/MTRO.md` (Jira đọc 11/09/2026), `references/apps/README.md`.
- `inventory/MTRO.md` — build 29/09 và 5 lượt theo module ngày 01/10/2026.
- `business-rules/MTRO.md` — rule cập nhật tới 18/09/2026.
- Repo automation `qikify-QA-mailtro` (`docs/`), đọc 2026-10-07.
- Jira project MTRO (112 issue, 108 đọc chi tiết) và QA Hub project MTRO (18 task), đọc 2026-10-07.
