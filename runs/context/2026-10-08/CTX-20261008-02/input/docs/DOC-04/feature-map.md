<!-- testlane knowledge KB-390 · kind=product · tag=— · status=draft · sourceUrl=https://github.com/ownego/qa-knowledge-work/blob/ae07d04a61509378493a9a07714b04f4e77a36e6/kb/MTRO/product/feature-map.md · createdAt=2026-10-08T08:01:23.733Z · updatedAt=2026-10-08T08:01:23.733Z -->

# Feature Map — Mailtro (MTRO)

**Status:** in-review

Danh sách feature theo **sidebar thật** (inventory § 2, staging 01/10/2026) và các tương tác **giữa** feature — thứ không thuộc riêng file nào. Cập nhật file này mỗi khi thay đổi ở một feature ảnh hưởng feature khác. Dựng 2026-10-07.

## Features in scope

| # | File | Màn / route | Jira chính | Task QA Hub | Tiến độ Jira (07/10) |
|---|---|---|---|---|---|
| 1 | [Sign in · 2FA · Choose a workspace · Sign up · Forgot / Reset](../features/01-auth-mailtro-id.md) | `staging-id.mailtro.ai/*` | MTRO-30 (+41, 42, 52, 54, 88, 106) | MTRO-003, 004, 005 | Epic **PASS**; MTRO-88 QA Review; Bug MTRO-106 To Do |
| 2 | [Home & khung app](../features/02-home-app-shell.md) | `/`, `/dashboard` | MTRO-7 | — | To Do (placeholder) |
| 3 | [Contacts (list · New/Edit · detail · Import · Export)](../features/03-contacts.md) | `/contacts`, `/contacts/import` | MTRO-8 › 23, 24, 26, 95 | MTRO-010, 025 (007 cũ) | QA Review / To Do |
| 4 | [Segments](../features/04-segments.md) | `/segments` | MTRO-27, 53, 100 | MTRO-011 (008 rỗng) | QA Review; MTRO-100 In Progress |
| 5 | [Custom fields](../features/05-custom-fields.md) | `/contacts/fields` | (không có ticket AC) | MTRO-022 | — |
| 6 | [Suppressions & SES pipeline](../features/06-suppressions.md) | `/contacts/suppressions` | MTRO-64 › 74–83; MTRO-17 › 66–68 | MTRO-015 | 6 DONE · 4 QA Review |
| 7 | [Email library & Email editor](../features/07-email-library.md) | `/templates` | MTRO-15 › 34, 35, 51, 58, 86, 90; MTRO-99, 104, 105, 111, 114, 115 | MTRO-021 | QA Review; nhiều story MKT Feedbacks In Progress / To Do |
| 8 | [Saved blocks](../features/08-saved-blocks.md) | `/saved-blocks` | MTRO-89, 107 | MTRO-023 | QA Review / In Progress |
| 9 | [Email preferences](../features/09-email-preferences.md) | `/preferences` | MTRO-17 › 70, 73 | MTRO-024 | QA Review (không description) |
| 10 | [Campaigns (list · wizard · send / schedule)](../features/10-campaigns.md) | `/campaigns`, `/campaigns/:id/*` | MTRO-11 › 28, 29, 59, 84 | MTRO-009, 012 | In Progress / QA Review |
| 11 | [Campaign report & Analytics API](../features/11-campaign-report.md) | `/campaigns/:id/report` | MTRO-16 › 31, 94, 96, 97, 60 | MTRO-020 | QA Review / To Do |
| 12 | [Automations — list & builder](../features/12-automations-list-builder.md) | `/automations`, `/automations/:id` | MTRO-13 › 32, 33, 85 (+110, 112, 122) | MTRO-018 (017 cũ) | QA Review |
| 13 | [Automations — Reports · Test · Run history](../features/13-automation-reports-run-history.md) | `/automations/:id/runs` | MTRO-61, 94 | MTRO-020, 018 | QA Review |
| 14 | [Team members & Role](../features/14-team-members.md) | `/members` | MTRO-20 › 43, 45, 46, 49, 55 | — | QA Review / To Do |
| 15 | [Account settings & 2FA](../features/15-account-settings-2fa.md) | `/settings/account` | MTRO-88 | (trong MTRO-003) | QA Review |
| 16 | [API keys · Claude connector · Workspace settings](../features/16-api-keys-claude-workspace.md) | `/settings/api-keys`, `/settings/claude`, `/settings/workspace` | MTRO-44, 91, 92, 101, 102 | — | QA Review / To Do |
| 17 | [Sending domains](../features/17-sending-domains.md) | `/settings/domains` | MTRO-6 › 48, 56 | — | Code Review / QA Review |
| 18 | [Security & Abuse guard (BE)](../features/18-security-abuse-guard.md) | trang staff riêng | MTRO-92 | MTRO-019 | QA Review |

**Chưa có trên staging** (route trắng hoặc không có màn): MTRO-18 Brand guideline (4 story To Do), MTRO-9 Sign-up form (PO 02/10: chỉ newsletter + ebook), Billing, quản lý phiên / thiết bị, trang `/analytics` tổng, trang công khai preference cho người nhận (chưa thấy). MTRO-47 trên Jira là epic **"MKT Feedbacks"** (references cũ gọi là Onboarding).

## Known interactions

| Feature A | Feature B | Interaction | Source |
|---|---|---|---|
| Sending domains | Campaigns, Automations | **Mâu thuẫn chưa đóng**: rule 07/08 "không gửi được campaign khi chưa có domain verified" ↔ staging gửi 15/15 lần qua host dùng chung `<owner>@mailtro.ai` (`sender_is_borrowed: true`) ↔ PO 02/10 chốt automation gửi qua shared host "giống campaign". UI (Sender, Send email) vẫn ghi "needs a verified domain". `Need confirm` PO cho campaign. | business-rules 07/08; MTRO-015 (09/09); MTRO-018 BR-27 (02/10) |
| Contacts, Email library | Campaigns | Campaign cần segment có contact + ≥1 email; picker email ở Contents chỉ nạp 50 email sửa gần nhất | business-rules 07/08; inventory L56 |
| Segments | Campaigns | Campaign gửi tới **đúng 1 segment**; `estimated recipients` = cột Contacts; segment chỉ gồm contact Subscribed; segment trùng tên không phân biệt ở picker (BUG-69); xoá segment đang dùng được, report hiện "Segment deleted since this send"; count lỗi → Send rollback `Couldn't start this send` | MTRO-29 (PO 11/08); MTRO-011 BR-12, 14, 15, 25 (02/10) |
| Suppressions | Segments, Contacts search, Campaigns, Automations | `ContactsResource::baseQuery` loại contact bị suppress / unsubscribe → ảnh hưởng **mọi** màn dùng query: segment count / preview, estimated recipients, **search Contacts** (đang bị lỗi không ra Unsubscribed). `SuppressionChecker` chặn cả 2 sổ ở mọi lane gửi. Automation: unsubscribed → run Failed; suppressed → run Completed + đếm Bounced / Spam complaints | MTRO-78; MTRO-010 BR-08, 13; MTRO-018 BR-28, 29 |
| Custom fields | Segments, Automations, Email preferences, Email library (merge tag), Import / Export | Một danh sách field dùng chung (key thô). Xoá field: bị chặn nếu còn contact mang hoặc preferences page dùng; **không** bị chặn nếu chỉ segment / automation dùng → segment "Unknown field", node trỏ field mất (trái rule 01/10). Email preferences chỉ dùng field Boolean. Segment điều kiện Boolean đang 422 | MTRO-022 BR-19; TC-MTRO-1524/1525/1535; inventory § 2.9 |
| Contacts (Import CSV) | Automations | Contact tạo / cập nhật qua import **không kích hoạt** automation (kể cả trigger thay đổi field) | KB-003 (QA lead 05/10) |
| Automations (Update contact field) | Automations (trigger `Contact field changed`) | Ghi field bằng automation phát event thay đổi field → kích hoạt flow khác; event do chính flow phát bị chặn ("…would have looped"). Re-entry once theo rule nhưng staging 27/09 vẫn tạo nhiều run | rule 18/09; test-run 27/09 |
| Email library | Automations, Campaigns | Xoá email đang được dùng không bị chặn → automation run Failed "The mail template this step sends no longer belongs to this workspace."; builder không báo. Không copy-on-write: sửa design trong Draft A đổi mọi Draft cùng `mail_template.id`; Sent đóng băng | inventory L60; chốt 25/08 (TC-MTRO-208) |
| Saved blocks | Email library, Campaigns, Automations | Sửa saved block → mọi template link nó đổi theo, kể cả mail campaign / automation gửi sau (resolve-on-read); sửa tại chỗ → detach; xoá saved block → section biến mất khỏi mọi template | MTRO-89 (Dev 08/09, 02/10) |
| Email preferences | Campaigns, Automations, Segments | Campaign / Send email gắn `preference_page_id`; link `{{preferences_url}}`. Người untick **không tự bị loại** — phải lọc bằng segment trên field Boolean (cảnh báo `Your segment ignores some of the page's choices`); hướng dẫn trên trang lại nói "tick the choices this campaign is about" — `Need confirm` PO. `Used in` chỉ đếm campaign | inventory L71, L74; MTRO-024 GAP-01/02 |
| Email library (merge tag) | Campaigns, Automations, Email preferences, Claude MCP | Cú pháp **hai ngoặc** `{{…}}` (PO 02/10; staging 01/10) ↔ MTRO-92 §10 ghi một ngoặc và từ chối `{{…}}`. Dữ liệu một ngoặc giai đoạn 29/09 không migrate; campaign Sent 30/09 lưu một ngoặc | MTRO-018 BR-30, 33; inventory L51, L68 |
| Campaigns, Automations | Campaign report, Automation Reports | Số liệu từ `ses_events` (COUNT lúc đọc); unique theo contact; click rate không tính link unsubscribe / preference; campaign gửi ≤09/09 hiện `—` | MTRO-16, 82, 94 |
| Team members (role) | Mọi module | Ma trận quyền chưa chốt ở bất kỳ module nào; mới chốt riêng: Member không create / edit segment (MTRO-100), Member tạo / xoá custom field (MTRO-022 BR-17). Router FE không có meta role → chặn phải ở API | task QA Hub GAP quyền; MTRO-100 |
| Security & Abuse guard | Campaigns, Automations, Contacts, Team, Sending domains, API keys | Workspace **Sending suspended** chặn gửi campaign / Test send / Resume, bật automation, thêm / sửa contact, mời member, thêm domain, tạo API key; **Disabled** chỉ xem. Chưa kiểm trên staging | MTRO-92 §6 |
| Auth (2FA) | Mọi module (automation) | Tài khoản Owner QA bật 2FA → mọi phiên Playwright cần mã tay; spec login giả định không 2FA sẽ vỡ | inventory L37 |

## Source

- `inventory/MTRO.md` § 1–§ 2.18, § 5.1 — staging 01/10/2026.
- Jira MTRO (112 issue) và QA Hub MTRO (18 task) — đọc 2026-10-07.
- `business-rules/MTRO.md`, `references/apps/MTRO.md` § 2.
