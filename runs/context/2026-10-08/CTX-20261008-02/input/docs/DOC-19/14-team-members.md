<!-- testlane knowledge KB-384 · kind=feature-profile · tag=Team members · status=draft · sourceUrl=https://github.com/ownego/qa-knowledge-work/blob/ae07d04a61509378493a9a07714b04f4e77a36e6/kb/MTRO/features/14-team-members.md · createdAt=2026-10-08T08:01:17.191Z · updatedAt=2026-10-08T08:01:17.191Z -->

# 14. Team members & Role / Permission (`/members`)

**Status:** draft

Phân tích ngày 2026-10-07 từ: `business-rules/MTRO.md` (§ "Role & Permission", § "Payload đăng ký thường và đăng ký qua invite khác nhau", § "Màn signup đổi hình thái khi vào bằng link invite" — rule 07/08/2026, nguồn MTRO-20/MTRO-46/MTRO-30), `open-questions/MTRO.md` § Role & Permission, `inventory/MTRO.md` § 2.12 (staging 29/09/2026, gửi rồi revoke một lời mời mẫu; Edit / Remove member chỉ từ bundle), Jira MTRO-20/43/45/46/49/55/92/100 (đọc 07/10), các GAP quyền trong task QA Hub (MTRO-009…025) và repo (`08-team/invite-member.md` 32 case, chưa chạy). Chưa có task QA Hub cho `08-team`. Status `draft` vì ma trận quyền **chưa chốt ở module nào**.

## Purpose

Mời đồng đội vào workspace qua email, gán role, quản lý lời mời và member. Role quyết định ai được đụng billing, quản lý users, và từng module nội dung.

## Business Rules

### Role — rule 07/08 (MTRO-20, MTRO-46)

- 3 role chuẩn **Owner** (billing + quản lý users + toàn bộ settings), **Admin** (campaigns / contacts / templates / automations / users, **không billing**), **Member** (tạo / sửa campaign, template, segment, automation; **không** quản lý users, **không** billing) + **custom role** chỉ mang quyền được cấu hình.
- Chặn quyền phải nằm ở **API**, không chỉ ẩn UI — router FE không có meta theo role (inventory § 1.3).
- **Mâu thuẫn tên role**: Epic MTRO-20 ghi Owner / Admin / **Marketer-Editor** / Custom; MTRO-43, MTRO-49 và UI staging dùng **Member** (`Invite as` {Admin, Member}). Open question chưa đóng.
- **Mâu thuẫn quyền segment**: rule 07/08 cho Member tạo / sửa segment; **PO 30/09 (MTRO-100)** chốt Member **không** được tạo / sửa segment (chặn + tooltip ở `Create segment`; scope API `segments:write`). Custom field: PO/Dev 01/10 cho Member tạo / xoá field definition (MTRO-022 BR-17).
- MTRO-49 (To Do): **đúng 1 Owner**; chuyển Owner = transfer ownership (cần confirm), owner cũ thành Admin; chỉ Owner / Admin đổi role / remove member; member không tự nâng role; Admin không sửa / xoá Owner.

### Invite — rule 07/08 + MTRO-43 + staging 29/09

- Link invite `/signup?invite={token}&email=...&team=...`: h1 `Accept your invitation`, ẩn 2 field workspace, Email prefill **readonly**; signup gửi `invitation_token` thay `team_name` / `team_slug` (rule 07/08). Email phải lấy **từ token**, không tin query string (references § 4 — QA focus security).
- Invite **nhiều email** một lần, cùng 1 role (PO 08/07, MTRO-43); FE gọi API theo batch có delay.
- Dialog **Invite a member** — "They'll receive an email invite to join this workspace.": `Email` dạng chip, phân tách dấu phẩy (`teammate@company.com, another@company.com`); chip lỗi khi sai định dạng / đã là member / trùng → "Remove the invalid or duplicate email(s) to send invites."; `Invite as` {Admin, Member} mặc định **Member**; `Send invite` (`Send {count} invites`, `Sending {done}/{total}…`) → toast `Invitation sent` / `Invited as Member.`
- Dòng lời mời: tên = phần trước @, `Member`, `Invited`, `Row actions` → `Resend invite` · `Revoke invitation` (`Revoke invitation?` / "{email} will no longer be able to join with this invite." → toast `Invitation revoked`). **Corrected**: MTRO-43 ghi status `Pending`; staging hiển thị `Invited`.
- MTRO-92 §2 (chưa kiểm UI): mời trùng khi lời mời còn hạn → "An invitation for this email is already pending."; tối đa 3 lời mời / hộp thư / ngày; >20 lời mời / phút → chặn tạm; workspace Sending suspended không mời được; workspace Disabled → accept bị từ chối.

### Trang Team members (`/members`) — staging 29/09

- Không có trên sidebar; vào từ workspace switcher › `Team members` (`/settings/team` render trắng — 23/09). Header "Invite teammates and manage their access."; `Invite member`.
- Bảng: `Name` (avatar, tên, email) · `Role` · `Status` (`Active` / `Invited`) · cột menu (trống cho Owner). Không có checkbox / bulk như MTRO-49 mô tả, không có cột 2FA.
- Bundle (chưa đối chiếu UI — chưa có member Active ngoài Owner): `Edit member` (Name / Email chỉ đọc, `Role`, `Save changes`) · `Remove from team`; confirm `Change {name}'s role to {role}?`, `Remove {name}?` ("They will immediately lose access to {team}. This can't be undone."). **Corrected so với MTRO-49**: đổi role qua dialog, không inline.

## Edge Cases

- Ma trận quyền chi tiết theo module (contact, segment, campaign, automation, email library, saved block, preferences page, import / export, analytics, API key) — `Need confirm` PO; là GAP Major ở hầu hết task QA Hub (MTRO-010 GAP-15, 011 GAP-07, 009/012 GAP-12, 018 GAP-07, 021 GAP-05, 023 GAP-04, 024 GAP-09, 025 GAP-06, 020 GAP-04, 019 GAP-07).
- Tên hiển thị role thứ 3 (Member hay Marketer) — `Need confirm` PO / Dev (open-questions).
- Member thấy `API keys` + `Workspace settings` trong sidebar (23/09) — `Need confirm` (inventory L38).
- Phân quyền API suppression / unsubscribe (tạm: xem = mọi member, gỡ = admin / owner) — `Need confirm` PO Thương (open-questions).
- Custom role: chưa thấy UI tạo — `Need confirm` có thuộc scope hiện tại.
- Gửi lời mời xong bảng không tự thêm dòng `Invited` (phải reload) — nghi bug (inventory L24).
- Mở `/signup?invite=<token không hợp lệ>` khi **đang** đăng nhập: `POST /api/invitations/<token>/accept` trả 405, UI im lặng bỏ `?invite`, không toast `We couldn't add you to that workspace…` (inventory L29, 23/09).
- Mời lại địa chỉ đang Pending, người được mời đã có tài khoản, cú pháp nhiều email — câu hỏi mở trong `invite-member.md`; MTRO-55 (BE invite API) không có AC.

## Testability Notes

- `ADMIN_*` và `MEMBER_*` trong `.env` repo automation là placeholder → mọi case Admin / Member blocked; workspace QA chỉ có 1 member. Tạm dùng workspace `Qikify QA Team` (tài khoản chung mang role Member) cho góc nhìn Member; chưa có workspace B mà Owner không là member (case isolation non-member kẹt).
- Sub-agent không được tạo tài khoản / mời member / đổi role trên staging dùng chung.
- Mail invite thật cần hộp thư QA (R13).
- `08-team` chưa có chủ trong `assignments.md` (đề xuất Tình, chờ R22 + R13). Gợi ý auto/manual MTRO-20: 70/30 (knowledge-work) · 75/25 (repo).

## Known Issues

See [known-issues.md](../known-issues/known-issues.md) for entries tagged `team-members`.

## Related Jira Tickets

- MTRO-20 — Team & member, Epic, To Do — bảng role MVP (Owner / Admin / Marketer-Editor / Custom).
- MTRO-43 — Support invite new user, Story, QA Review — nhiều email, role mặc định Member.
- MTRO-55 — [BE] Invite new user api, Story, QA Review — trống.
- MTRO-45 — Team, Story, To Do — màn members kiểu Slack, Transfer ownership.
- MTRO-46 — Permission, Story, To Do — trống.
- MTRO-49 — Team members manage page, Story, To Do (trang đã lên staging).
- MTRO-100 — Member cannot save a segment, Story, In Progress — PO 30/09.
- MTRO-92 — [BE] Security, Story, QA Review — §2 giới hạn mời.

## Source

- `business-rules/MTRO.md` § "Role & Permission", § "Signup & Workspace" — 07/08/2026; `open-questions/MTRO.md` § "Role & Permission".
- `inventory/MTRO.md` § 1.3, § 2.12, L24, L29, L38, L39 — staging 29/09/2026 (L29: 23/09).
- Jira MTRO-20, 43, 45, 46, 49, 55, 92, 100 — đọc 2026-10-07.
- QA Hub: GAP quyền trong notes các task MTRO-009…025 — đọc 2026-10-07.
- Repo `qikify-QA-mailtro`: `docs/manual-testcases/08-team/invite-member.md`, `docs/decisions/assignments.md`.
