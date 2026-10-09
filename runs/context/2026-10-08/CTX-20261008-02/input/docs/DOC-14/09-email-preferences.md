<!-- testlane knowledge KB-379 · kind=feature-profile · tag=Email preferences · status=draft · sourceUrl=https://github.com/ownego/qa-knowledge-work/blob/ae07d04a61509378493a9a07714b04f4e77a36e6/kb/MTRO/features/09-email-preferences.md · createdAt=2026-10-08T08:01:10.761Z · updatedAt=2026-10-08T08:01:10.761Z -->

# 9. Email preferences (preference center — `/preferences`)

**Status:** draft

Phân tích ngày 2026-10-07 từ: `inventory/MTRO.md` § 2.9 (staging đi thật 01/10/2026 tối: list rỗng, form `New page`, picker, dialog field, preview; list có data / Edit / Delete giữ 29/09 + bundle; **trang công khai người nhận chưa thấy**), task QA Hub **MTRO-024** (Not Ready 5/14, **3 GAP Blocker**, 92 case chưa chạy — BR phần lớn là quan sát staging, chưa có PO/Dev xác nhận), Jira MTRO-17/66/69/70/73 (đọc 07/10; MTRO-70 **description trống**), repo `04-unsubscribe/email-preferences.md` (02/10, fixture L76 dựng 03/10). `business-rules/MTRO.md` chưa có rule nào cho Email preferences. Status `draft` vì mô hình (List vs custom field) chưa chốt.

## Purpose

Cho người nhận chọn **loại email muốn nhận** thay vì phải huỷ toàn bộ (partial unsubscribe — MTRO-17 U5). Mỗi lựa chọn (choice) là một checkbox ghi true/false vào một custom field Boolean của contact; marketer lọc người nhận bằng segment trên field đó.

## Business Rules

### List (`/preferences`) — staging 01/10

- Sidebar `Email preferences` (giữa `Email library` và `Campaigns`); h1 `Email preferences`, "Let people pick which emails they get, instead of unsubscribing from everything."; nút `New preferences page`.
- 3 bước hướng dẫn luôn hiện: `1` `List your kinds of email` · `2` `Use the page on a campaign` — "On the Recipients step, pick the page and tick the choices this campaign is about." · `3` `People choose` — "Anyone who unticks a choice is left out of campaigns about it. Everything else still reaches them."
- Empty: `No preferences pages yet` / "Create one so people can say no to some emails without leaving all of them." + `New preferences page`.
- Bảng (29/09 + bundle): `Name` · `Choices` (tối đa 3 badge + `+{count} more`) · `Used in` (`Not used yet` / `1 campaign` / `{count} campaigns` — chỉ đếm **campaign**) · `Last edited`; menu `Edit` · `Delete`.
- Delete: `Delete {name}?` / "This can't be undone."; page đang được campaign dùng thêm "{count} campaign(s) use this page. Their unsubscribe link will go back to the plain “Unsubscribe from all” page."; toast `Preferences page deleted` / `Could not delete this page` (bundle).
- Lỗi tải: `Could not load your preferences pages` / "Reload the page to try again."
- `/preferences/:id` không gọi GET theo id — nạp cả list rồi tìm; không có → "This preferences page doesn't exist. It may have been deleted, or the sample data reset when the app reloaded." (câu "sample data" lỗi thời — inventory L11, L75).

### Form New page / Edit page — staging 01/10 + bundle

- Mặc định: `Page name` `Untitled preferences page`; **What people read** — `Heading` `Choose the emails you want`, `Message` "Untick anything you'd rather not get. You can change this any time." (Heading rỗng → preview dùng lại câu mặc định); **Choices** — 1 choice rỗng; switch `Show “Unsubscribe from all emails”` **bật** (BR-05 MTRO-024).
- Mỗi choice: `Move this choice up` / `down`, `Choice name` (`e.g. App updates`), `Custom field` (combobox `Choose a field` + badge `Checkbox · true / false`), `Short description (optional)`, `Remove this choice`; nút `Add a choice`.
- Picker `Custom field` chỉ liệt kê field **Boolean** + `Create a new field…`; field đã dùng ở choice khác cùng page → disabled `· already used on this page` (staging 01/10, BR-08). Hint: "This field holds a true/false value. Unticking this choice saves "false" in this field, ticking it saves "true". Your segments read the same field, so changing it later points this choice somewhere else — whatever the old field already holds stays put."
- `Create a new field…` → dialog `New custom field` ("A true/false field, created right away so your segments can read it — empty until someone saves their choices."): chỉ `Field name`, không có Type (luôn Boolean); `Create field` disabled khi rỗng nhưng **enable với tên sai định dạng** (`Bad Name`) — định dạng chỉ BE kiểm, lỗi → toast `Could not create the field`; tạo xong gán luôn vào choice (BR-09; inventory L09).
- Tắt switch → alert "Inboxes like Gmail still show their own unsubscribe button, and that one always unsubscribes from everything." và preview mất nút; helper khi bật: "Recommended. People who want no email at all can leave in one click, instead of marking you as spam." (BR-11).
- **What happens when someone saves**: "Each choice is saved straight onto the contact: unticked is false, ticked is true. Build your campaign's segment on that field and it skips everyone who unticked it." · "No automation needed. If you want one anyway — a follow-up email, say — start it with “Contact field changed” watching that field." (BR-13).
- `Save` luôn bấm được; validate client theo thứ tự: `Give the page a name.` → `Add at least one choice.` → `Every choice needs a name.` → `Every choice needs a valid field that no other choice on this page writes.` → `Two choices have the same name. Give each one a different name.` (so không phân biệt hoa thường, đã trim); lỗi → toast `Can't save yet` + inline `Give this choice a name people will recognise.` / `Pick the field this choice saves into.` (BR-06). Thành công: toast `Preferences page saved` / "Campaigns and automations can use it now.", page mới chuyển `/preferences/<id>` (BR-07). Payload `name`, `heading`, `intro`, `show_unsubscribe_all`, `choices[{key,label,description}]`.
- `Back` khi form có thay đổi → **về list luôn, không hỏi, thay đổi mất** (khác Email editor / Automation builder — inventory L11, nghi bug).
- Preview `What people see` (`Desktop` / `Mobile`): tên workspace (không có → `Acme`), heading, message, checkbox của choice **đã có tên** (mặc định tick), `Save my choices`, `Unsubscribe from all emails`. Bấm trong preview chỉ đổi trạng thái client: `Thanks, you're all set!` / "Your email choices are saved. Changed your mind? Just open this link again…" + `Open the page again`; `You're unsubscribed` / "You won't get any more marketing emails from {workspace}." + `I clicked by mistake — resubscribe` (BR-12).

### Dùng ở đâu

- Campaign bước Recipients: khối `Email preferences` — "Let people tell you which emails they want. Each choice is saved onto the contact, so a segment can read it."; combobox `Preferences page` (`None — people can only unsubscribe from everything` + tên page), hint "The page people reach from this campaign's unsubscribe link.", link `Manage pages`. Campaign chỉ lưu `preference_page_id` — **không có ô tick choice** (BR-14; inventory L71). Cảnh báo (i18n): `Your email offers choices but has no page` ("The design uses {tag}, so everyone who clicks it lands on the plain unsubscribe page instead…") và `Your segment ignores some of the page's choices` ("…add a condition on each of these fields that leaves out false (“Is not” or “Not equal to” false).").
- Automation `Send email`: combobox `Email preferences page` + helper "The page this email’s {{preferences_url}} link opens." (BR-15).
- Merge tag `{{preferences_url}}` (nhóm System của picker — "…the plain unsubscribe page when none is attached."); cú pháp hai ngoặc theo PO 02/10, nội dung một ngoặc cũ không migrate (BR-17).
- Không xoá được custom field đang được page dùng ("If a preferences page uses it, remove that choice first — until then the delete is refused.") — xác nhận 06/10 (bị chặn 422).
- Analytics: click vào link unsubscribe / preference **không tính** click rate (MTRO-16).

### Theo Jira (chưa khớp hệ thống thật)

- MTRO-17 U5 (bỏ tick từng topic) và U6 (marketer chọn topic) ghi **Later**; MTRO-73 (To Do): cấu hình preference center **theo list**, "not custom-property-based topics". Staging làm theo **custom field Boolean** — mâu thuẫn mô hình (GAP-01 Blocker).
- MTRO-66 (QA Review): footer unsubscribe → trang xác nhận tự host, unsubscribe ngay, không survey, không áp dụng transactional. MTRO-69 (To Do): unsubscribe cập nhật consent trong vài giây.

## Edge Cases

- Mô hình List (Jira MTRO-73) hay custom field Boolean (staging) — `Need confirm` PO (GAP-01 **Blocker**).
- Người untick có **tự bị loại** khỏi campaign không, hay chỉ khi segment lọc field đó? Bước 2 nói "tick the choices this campaign is about" nhưng Recipients không có ô tick; bước 3 nói "left out of campaigns about it", cảnh báo `filterMissing` lại nói vẫn nhận nếu segment không lọc — `Need confirm` PO (GAP-02 **Blocker**; inventory L71). Rủi ro tuân thủ.
- Trang công khai người nhận: URL dạng gì, token, hạn dùng, trang lỗi khi token sai / hết hạn / page bị xoá — `Need confirm` Dev (GAP-03 **Blocker**; inventory L76). SPA workspace không có route public; build-staging overview 03/09 nhắc trang `/u/{token}`.
- `Unsubscribe from all emails` trên trang công khai có ghi sổ `unsubscribes` như footer không; resubscribe có gỡ entry + ghi actor — `Need confirm` (GAP-05 Major).
- Contact chưa có giá trị (null) hiện tick hay không; segment "Is not false" có giữ contact null — `Need confirm` (GAP-06 Major). Liên quan Dev 02/10: Boolean `Is not` khớp cả contact chưa có giá trị (MTRO-011 BR-23).
- `Used in` không đếm automation; xoá page đang dùng ở automation / campaign Scheduled → link mở gì — `Need confirm` Dev (GAP-07, GAP-08 Major; inventory L74).
- Được phép tắt `Unsubscribe from all emails` không (CAN-SPAM / GDPR) — `Need confirm` PO (GAP-11 Major).
- Quyền theo role; giới hạn độ dài / số choice / trùng tên page; `preference-pages` có phân trang không (page ngoài trang đầu sẽ "không tồn tại") — `Need confirm` (GAP-09, GAP-10, GAP-17; inventory L75).
- Lưu choice có phát event `Contact field changed` (kích hoạt automation) không — `Need confirm` (GAP-16).
- Page cũ trỏ vào field Text (trước 01/10 picker còn liệt kê field Text) — `Need confirm` có migrate không (inventory L10, GAP-14).
- Thiếu leave guard ở form — nghi bug (inventory L11).

## Testability Notes

- Workspace 01/10 có **0 page**; page `ash-inventory-pref` đã bị xoá. Fixture đề xuất (inventory L76): 1 page ≥2 choice trên field Boolean riêng (`qa_pref_*`), 1 email có `{{preferences_url}}` + `{{unsubscribe_url}}`, 1 campaign gửi tới hộp thư QA (đọc qua Chrome bridge). Repo ghi fixture dựng 03/10 — chưa kiểm còn trên staging.
- Trang công khai chỉ thấy được khi gửi mail thật → phụ thuộc hộp thư QA.
- Bộ case `04-unsubscribe/email-preferences.md` (92 case TC-PREF, task MTRO-024, 55 case đánh `PO/DEV confirm`; 69 To be automated / 23 Manual). ID QA Hub TC-PREF-001 = TC-MTRO-1935.

## Known Issues

See [known-issues.md](../known-issues/known-issues.md) for entries tagged `email-preferences`.

## Related Jira Tickets

- MTRO-17 — Unsubscribe, Epic, To Do — U5 / U6 preference center ghi "Later".
- MTRO-70 — Partial unsubscrube - preference center, Story, QA Review — **description trống**; build staging được coi là của ticket này (AS-01 MTRO-024).
- MTRO-73 — (tên "N/A") cấu hình preference center theo list, Story, To Do — mâu thuẫn mô hình staging.
- MTRO-66 — Footer unsubscribe link, Story, QA Review. MTRO-69 — Update consent status on unsubscribe, Story, To Do.

## Source

- `inventory/MTRO.md` § 2.9, L09, L10, L11, L71, L74, L75, L76, Đ27 — staging 01/10/2026 (list có data: 29/09).
- QA Hub task MTRO-024 (notes 02–05/10, 92 case not-run) — đọc 2026-10-07.
- Jira MTRO-17, 66, 69, 70, 73 — đọc 2026-10-07.
- Repo `qikify-QA-mailtro`: `docs/manual-testcases/04-unsubscribe/email-preferences.md`, `docs/build-staging-feature-overview.md` (03/09).
