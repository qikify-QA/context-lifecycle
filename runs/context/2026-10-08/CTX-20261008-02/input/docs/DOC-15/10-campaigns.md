<!-- testlane knowledge KB-380 · kind=feature-profile · tag=Campaigns · status=draft · sourceUrl=https://github.com/ownego/qa-knowledge-work/blob/ae07d04a61509378493a9a07714b04f4e77a36e6/kb/MTRO/features/10-campaigns.md · createdAt=2026-10-08T08:01:11.945Z · updatedAt=2026-10-08T08:01:11.945Z -->

# 10. Campaigns (list & folder · wizard Campaign details → Sender → Recipients → Contents · Preview & test · Send / Schedule)

**Status:** in-review

Phân tích ngày 2026-10-07 từ: `business-rules/MTRO.md` § "Campaigns — danh sách & folder (MTRO-28)", § "Campaigns — wizard tạo/sửa (MTRO-29)", § "Campaigns — gửi (MTRO-59)", § "Sending Domain & Campaign" (rule 07/08 và 15/09/2026), `open-questions/MTRO.md` § Campaigns, `inventory/MTRO.md` § 2.10-A/B (staging đi thật 01/10/2026; Sender, Preview & test, sheet Send: 29/09), task QA Hub **MTRO-012** (list, Not Ready 8/14) và **MTRO-009** (wizard, Not Ready 7/14, GAP-01 Blocker), Jira MTRO-11/28/29/59/62/63/84/99/120 (đọc 07/10) và repo `qikify-QA-mailtro` (bug log campaigns-list 27/08, test-run wizard 25/08, list 27/08). Report của campaign đã gửi ở [11-campaign-report](11-campaign-report.md). Nhiều rule 15/09 lệch staging — ghi "corrected" kèm nguồn.

## Purpose

Tạo một campaign = **một email gửi tới một segment**: đặt tên + subject, chọn người gửi, chọn segment, chọn email từ thư viện, xem trước / gửi thử, rồi gửi ngay hoặc lên lịch. Danh sách campaign có folder, search, lọc theo status / folder, thao tác hàng loạt.

## Business Rules

### List (`/campaigns`) — rule 15/09 + staging 01/10

- Header `Campaigns` / "Create, schedule, and track email campaigns sent to your contacts."; `Create folder` (secondary) và `New campaign` (primary → `/campaigns/new/details`) — khớp rule.
- Toolbar: `Search campaigns…` (theo tên); `Filter by status`; `Filter by folder` (`All folders` · `Ungrouped` · từng folder; `Ungrouped` gửi `folder=ungrouped`). Search + 2 filter ghép AND (27/08).
- **Corrected 01/10 — filter status 8 mục**: `All statuses` · `Draft` · `Scheduled` · `Running` · `Sent` · `Partly sent` · `Cancelled` · `Failed` (rule 15/09 ghi All / Draft / Scheduled / Sent; inventory L73). Ý nghĩa `Partly sent` / `Cancelled` / `Failed` chưa có AC (GAP-02 MTRO-012).
- Bảng: `Select all campaigns` · `Campaign` · `Recipients` · `Delivered` · `Opened` · `Status` (badge; `Running` có chấm xanh) · `Sent` · `Actions`. `Delivered` / `Opened` hiện **%** cho campaign gửi từ 28/09, `—` cho campaign gửi ≤ 09/09 (trước pipeline SES) và cho Draft.
- Click dòng: Draft → `/campaigns/:id/details`; Sent → `/campaigns/:id/report` (staging 01/10). Rule 11/08: draft / scheduled (và Edit) mở builder, sent / running mở report và ẩn Edit.
- **Corrected 01/10 — menu dòng**: Draft = `Duplicate` · `Add to folder` · `Delete`; Sent = `Duplicate` · `Add to folder`; **không có** `Preview/Test`, `Edit` (rule 15/09 ghi 5 mục — inventory L20). Scheduled (bundle) thêm `Reschedule` · `Unschedule`.
- **Duplicate**: campaign mới status draft, copy subject / sender / segment, **content để trống** (`mail_template: null`, `is_complete: false`, điều hướng `/content`) (rule 11/08, xác nhận 27/08). **Corrected tên**: staging `<tên> (copy)` (nhân tiếp `(copy) (copy)`), toast `Duplicated as "{name}"` — rule ghi "Copy of {name}" (inventory L66).
- **Delete**: 1 campaign `Delete "{campaign name}"?`, nhiều `Delete N campaigns?`, "This can't be undone.", `Cancel` / `Delete`, toast (rule 15/09). Campaign Scheduled (bundle): "This campaign is booked to go out. Deleting it cancels that send, so nobody will receive it. This can't be undone."
- Bulk bar: `1 selected` + `Delete` + `Add to folder`. Dialog **Add to folder**: "{n} campaign(s) selected.", nút từng folder + `Ungrouped`, ô `New folder name` (maxlength 255) + `Create`.
- Dialog **Create folder**: "Organize campaigns into a folder." · `Folder name` · `Create` (disabled khi rỗng); trùng tên → 422 `The name has already been taken.` (27/08); toast `Folder "{name}" created` (i18n).
- Phân trang: `Rows per page` (mặc định 20; 10 / 20 / 50 / 100) · `1-20 of 33` · `Jump to page` · prev / next.
- Empty: `No campaigns yet` / "A campaign is one email sent to one segment of your contacts."; lọc rỗng `No campaigns match your filters` / "Try a different search, status, or folder." Tên campaign được trùng (folder thì chặn trùng — 25/08).

### Wizard — entry & header (rule 15/09 + staging 01/10)

- `New campaign` → `/campaigns/new/details` (bước 1 rỗng, **chưa gọi API tạo** tới khi `Save`); sau Save URL thành `/campaigns/:id/<bước>`. **Corrected**: rule ghi Edit → `/campaigns/:id/edit/setup`; staging là `/campaigns/:id/details` · `/sender` · `/recipients` · `/content` (inventory L73).
- Stepper `Campaign steps` 4 bước (`Campaign details` "Name your campaign and write the subject line" · `Sender` "Configure the sender identity" · `Recipients` "Select who should receive this email" · `Contents` "Choose the email design for this campaign"); bước done khi đủ field bắt buộc: (1) Campaign name + Subject line, (2) người gửi, (3) đã chọn segment, (4) đã chọn email (rule 15/09).
- Header: h1 tên (chưa có → `New campaign`) · badge `Draft` · `Save` · `Preview & test` · `Send`. **Không auto-save** (PO 11/08). `Save` **chỉ hiện khi có thay đổi chưa lưu** (`isEditable && isDirty`; `/campaigns/new/*` hiện ngay) — staging 01/10 (inventory Đ25). Lưu khi chưa có tên → "Give this campaign a name before saving it." (i18n). Update bằng `PUT` (25/08).
- `Preview & test` / `Send` disabled tới khi `canSendCampaign` = true; tooltip `Finish every step before sending.` / `This campaign is missing a subject, sender, audience or design, so it cannot be sent.`
- Rời wizard khi chưa lưu: **không** có route-leave guard / `beforeunload` (bundle 01/10) — BUG-WIZ-02 (P1, 25/08).

### Bước 1 Campaign details

- `Campaign name *` ("Internal only — recipients never see this.") · `Subject line *` (≤255, 422 khi vượt) · `Preview text` ("The snippet shown after the subject line in most inboxes.") · `Back` / `Next: Sender`. Dấu `*` cho 2 field bắt buộc (PO 11/08).
- **Corrected 01/10**: không có field **Folder** ở bước 1 — folder chỉ gán qua `Add to folder` ở list (rule 15/09 ghi có; inventory L19).

### Bước 2 Sender — staging 29/09

- `From name` (`Mailtro Team`) · `From email` (`hello@yourdomain.com`) · `Reply-to (optional)` (`Defaults to the sender email`, "Replies go to the sender address unless you set one here.") — Reply-to mặc định = From email (rule 15/09).
- Cảnh báo "Sending needs a verified domain — this address won't be accepted until its domain is verified." + `Manage sending domains`.
- **Mâu thuẫn GAP-01 Blocker**: rule 07/08 (MTRO-6 + MTRO-11) "không gửi được campaign khi workspace chưa có sending domain verified" ↔ staging 09/09 gửi campaign 15/15 lần qua host dùng chung (`sender_is_borrowed: true`, `effective_from_email` = `<owner>@mailtro.ai`) ↔ PO 02/10 chốt cho **automation** "From email ngoài domain verified vẫn gửi qua shared sending host, giống campaign" (MTRO-018 BR-27). Chưa ai chốt lại cho campaign → `Need confirm` PO.

### Bước 3 Recipients — PO 11/08 + staging 01/10

- h3 `Send to`; popover `Select a segment…` (`Search segments…`) — chọn **đúng 1 segment** (PO đổi multi → single 11/08; description MTRO-29 vẫn ghi multi-select). Danh sách segment chỉ hiện tên, **không** "X contacts". Đã chọn → chip tên + `Remove {name}` + dòng `N estimated recipients` (= cột Contacts của segment).
- Chưa có segment: "There are no segments yet. Add a new segment to this folder to better manage your contacts." + `Create segment`; không khớp search: `No segments match your search.`
- Segment chỉ gồm contact Subscribed (PO 02/10); tên segment không unique → picker không phân biệt được 2 segment trùng tên (BUG-CS-16 / BUG-69).
- Khối `Email preferences`: combobox `Preferences page` + `Manage pages` + 2 cảnh báo — chi tiết ở [09-email-preferences](09-email-preferences.md). Không có ô tick choice.
- Send khi count segment lỗi → BE chạy lại query, lỗi thì rollback, campaign giữ Draft, sheet `Couldn't start this send` (Dev 02/10, MTRO-011 BR-25).

### Bước 4 Contents — staging 01/10

- Chưa có design: "Add email content to this campaign" / "Use an email you already have, or start a new one." · **`Choose email library`** · **`Create email library`**. **Corrected**: rule 15/09 ghi `Choose from existing` / `Create new` (inventory L67). **Sắp đổi tiếp** (MTRO-99, PO 30/09): `Choose a template` / `Create new template`.
- Dialog `Choose email library` — "Pick an existing email design to use for this campaign.": lưới thẻ tên + người tạo; **không search, không phân trang**; nạp một lần `GET mail-templates?per_page=50&sort=updated_at&direction=desc` → chỉ 50 email sửa gần nhất (inventory L56).
- Dialog `Create email library` — "How do you want to start?": `Create from scratch` ("Start with a blank canvas") / `Duplicate design` ("Start from an existing design and customize it"; bản sao tên `{name} (copy)`).
- Đã có design: tên design · `Edit design` · `Design actions` › `Reset design` (về empty) · `Subject` · `Preheader` · iframe · `From`. Đổi email ở bước 4 chỉ qua `Reset design` (25/08).
- **Không copy-on-write**: sửa design trong Draft A đổi mọi Draft dùng cùng `mail_template.id`; campaign Sent đóng băng (chốt 25/08).
- Merge tag trong nội dung dùng **hai ngoặc** `{{contact.first_name}}`, `{{unsubscribe_url}}` (PO 02/10); nội dung một ngoặc cũ không migrate, người dùng tự sửa (MTRO-009 BR-10).

### Preview & test — staging 29/09, i18n 01/10 khớp

- "Check how this email renders, then send a test to yourself or a teammate."; Subject · From · `Desktop` / `Mobile` (`720px`); `Send a test`: `Test email address` (`you@company.com — press Enter to add`), `Send test` (disabled khi rỗng); hint "Up to 5 addresses. There is no contact behind a test address, so merge tags with no value for it render empty."
- Lỗi: `That doesn't look like an email address.`, `That address is already on the list.`, `You can send a test to at most 5 addresses.`, `Too many test sends. Wait a minute, then try again.`

### Send / Schedule — MTRO-59 + staging 29/09

- Sheet `Send campaign` / "Choose when this campaign goes out.": Recipients / Subject / From; radio `Send now` / `Schedule for later`; `Cancel` / `Send`. Send now → status `sent` + toast "Going out to {total} recipients." rồi chuyển sang report (rule 15/09).
- **Corrected**: rule 15/09 ghi Schedule "[CONFIRMED LATER], chưa thuộc phạm vi"; staging **đã có** `Schedule for later` (inventory L21): "When should it go out?", `Pick a date and time` (lịch tháng, ô `Time`, "Times are in your timezone (GMT+7).", ngày quá khứ mờ), "Sends start at the time you pick, give or take a few seconds — which is why only :00 and :30 are offered.", `Schedule` (disabled tới khi chọn). MTRO-84 "Schedule campaigns" đang QA Review nhưng **description trống**.
- Bundle (chưa đối chiếu UI): `Reschedule campaign` ("Pick a new time. The campaign stays frozen until it goes out.", "Sends within 30 minutes of {at}…"), `Unschedule` (toast `"{name}" is a draft again`), `Going out on {at}.`
- Campaign là one-shot: gửi lại campaign đã `sent` → 403 (09/09). Status sau gửi: `sent` = đã submit provider (build-staging 03/09); `Running` / `Partly sent` / `Failed` khi nào — chưa có AC (GAP-19 MTRO-009).
- MTRO-92 §6 (chưa đối chiếu): workspace **Sending suspended** chặn gửi campaign, Test send, Resume; campaign đang gửi dở thì phần còn lại không gửi, sau reinstate phải bấm Resume — xem [18-security-abuse-guard](18-security-abuse-guard.md).

## Edge Cases

- Gửi khi chưa verify domain — **mâu thuẫn rule vs staging** (GAP-01 Blocker MTRO-009) — `Need confirm` PO.
- Bulk Delete khi tập chọn có campaign Sent / Running (menu Sent không có Delete nhưng bulk bar vẫn bật) — `Need confirm` PO, nếu xoá được là mất dữ liệu P0 (open-questions; GAP-01 MTRO-012; chưa xác minh vì cần workspace riêng).
- Đổi filter không clear selection → `1 selected` + Delete vẫn bật cho dòng đã biến mất (BUG-CL-01, P1, 27/08).
- Xoá folder đang chứa campaign: BE có `DELETE /api/teams/{slug}/folders/{id}` (200) nhưng FE không có UI — `Need confirm` PO (open-questions; BUG-CL-02).
- Wizard nuốt lỗi 422 khi `Save` (from_email sai, subject >255) — BUG-WIZ-01, **P0**, chưa sửa (sprint status 02/10).
- `Next` không validate field bắt buộc (25/08); sender bị đổi âm thầm sang host chung nhưng bước 4 / Preview vẫn hiện địa chỉ người dùng gõ (25/08).
- Campaign Sent 30/09 lưu tag **một ngoặc** (`{contact.first_name}`, `{unsubscribe_url}`): người nhận thấy gì, link huỷ đăng ký có sống không — `Need confirm` Dev (inventory L68; GAP-05 MTRO-009). Rủi ro tuân thủ.
- Campaign Scheduled click đi đâu, menu Reschedule / Unschedule / Delete — `Need confirm` (GAP-03 MTRO-012); không dựng được Scheduled / Running / Partly sent / Failed trên staging dùng chung.
- Phân quyền tạo / Save / Send / Schedule / xoá theo role ở API — `Need confirm` (GAP-12 MTRO-009/012).
- Picker 50 email — `Need confirm` giới hạn chủ ý (GAP-04).
- Copy số ít: `1 estimated recipients`, `1 campaign(s) selected.` (VĐ-5).
- Không có toast khi xoá campaign / tạo folder (27/08) — bundle 01/10 đã có toast `Deleted "{name}"`, `Folder "{name}" created` → cần chạy lại TC-CAMP-045 / 051.
- Trang tràn ngang 36px ở 375px (BUG-CL-03).
- MTRO-120 (To Do): lọc recipient theo engagement — có thể thêm bộ lọc ở bước Recipients.

## Testability Notes

- **Không bấm Send / Send test / Schedule trên workspace dùng chung trừ khi được phép** — gửi mail thật, không hoàn tác; case Send / schedule độ phủ 0 (R6 / R25 / R31). Gửi thử chỉ tới hộp thư QA hoặc SES simulator.
- 3 draft trên staging 01/10 đều chưa đủ 4 bước (Sender trống) → `Preview & test` / `Send` disabled, không xem được dialog nếu không sửa (inventory L72). Cần fixture: 1 draft đủ 4 bước gửi tới hộp thư QA, 1 preferences page.
- Hai campaign trùng tên làm `aria-label` trùng → selector strict-mode lỗi (list.md).
- Bộ case: `05-campaigns/list.md` (64 case, task MTRO-012), `05-campaigns/wizard.md` (85 case, task MTRO-009). `report.md` cũ không dùng nữa từ 02/10. Gợi ý auto/manual MTRO-11: 55/45 (knowledge-work) · 65/35 (repo).

## Known Issues

See [known-issues.md](../known-issues/known-issues.md) for entries tagged `campaigns`.

## Related Jira Tickets

- MTRO-11 — Campaigns, Epic — flow sender → recipients → subject → design → preview & test → send / schedule.
- MTRO-28 — Manage campaigns (with view, search), Story, In Progress — list; cập nhật PO 11/08 trong description.
- MTRO-29 — Campaign builder, Story, QA Review — wizard; quyết định PO 11/08 nằm ở comment (description chưa sửa).
- MTRO-59 — Send email campaigns, Story, QA Review — Send now; Schedule "[CONFIRMED LATER]".
- MTRO-84 — Schedule campaigns, Story, QA Review — description trống.
- MTRO-62 — Send test email campaign, Story, To Do — trống (dù staging đã có `Preview & test`).
- MTRO-63 — [BE] Campaign core api, Story, QA Review — trống.
- MTRO-99 — Rename Email library to Templates, Story, In Progress — đổi tên nút bước Contents.
- MTRO-120 — Filter recipients by email engagement, Story, To Do.

## Source

- `business-rules/MTRO.md` § Campaigns (15/09/2026), § "Sending Domain & Campaign" (07/08/2026); `open-questions/MTRO.md` § Campaigns.
- `inventory/MTRO.md` § 2.10-A/B, L19, L20, L21, L56, L66, L67, L68, L71, L72, L73, Đ25, Đ26 — staging 01/10/2026 (Sender / Preview & test / Send: 29/09).
- QA Hub task MTRO-012 (64 case: 24 pass · 2 fail · 9 blocked), MTRO-009 (85 case: 33 pass · 18 blocked) — đọc 2026-10-07.
- Jira MTRO-11, 28, 29, 59, 62, 63, 84, 99, 120 — đọc 2026-10-07.
- Repo `qikify-QA-mailtro`: `docs/bugs/05-campaigns/2026-08-27-campaigns-list-bug-log.md`; test-run `05-campaigns/2026-08-25-campaigns-wizard…`, `2026-08-27-campaigns-list…`; `docs/qa-sprint-status.md`; `docs/manual-testcases/05-campaigns/list.md`, `wizard.md`.
