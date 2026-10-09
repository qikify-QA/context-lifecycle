<!-- testlane knowledge KB-391 · kind=product · tag=— · status=draft · sourceUrl=https://github.com/ownego/qa-knowledge-work/blob/ae07d04a61509378493a9a07714b04f4e77a36e6/kb/MTRO/product/glossary.md · createdAt=2026-10-08T08:01:26.434Z · updatedAt=2026-10-08T08:01:26.434Z -->

# Glossary — Mailtro (MTRO)

**Status:** in-review

Thuật ngữ bị dùng lệch nhau giữa ticket Jira, business rule, test case và UI thật. Cột "Tên trên UI" chép nguyên văn từ `inventory/MTRO.md` (staging 01/10/2026 trừ khi ghi khác). File feature nên link tới đây thay vì giải thích lại.

| Thuật ngữ | Tên trên UI (nguyên văn) | Định nghĩa | Ghi chú lệch |
|---|---|---|---|
| Workspace / Team | `Choose a workspace`, `Workspace settings`, workspace switcher nhóm `Teams` | Không gian làm việc multi-tenant, 1 subdomain `<slug>.wisle.app`, chứa contact / email / campaign riêng | API và DB gọi là **team** (`teams/{team}/…`, `team_id`, payload signup `team_name` / `team_slug`). UI vừa dùng "workspace" vừa dùng "Teams" |
| Mailtro ID | (domain `staging-id.mailtro.ai`) | Service auth tách riêng: signup, login, 2FA, verify, reset password, chọn workspace | — |
| Role thứ 3 | `Member` (`Invite as` {Admin, Member}) | Role thấp nhất: tạo/sửa campaign, template, segment, automation; không quản lý users / billing | `.env.example` và Epic MTRO-20 ghi "Marketer / Editor" — open question chưa đóng; UI 29/09, MTRO-43, MTRO-49 dùng `Member` |
| Email / Template / Design | Sidebar `Email library`; nút `New email`; wizard campaign `Choose email library` / `Create email library`; editor `Edit email` | Một email thiết kế sẵn để dùng trong campaign / automation | Jira MTRO-15/34 và rule gọi "template", "email design"; API `mail-templates`; route `/templates`. Case cũ dùng `New template` (sai từ 01/10). PO 30/09 (MTRO-99) quyết đổi lại thành **`Templates`** / `New template` — chưa deploy staging 01/10 |
| Saved block | `Saved blocks`, `Save as Block`, `Browse saved blocks` | Khối (section) lưu lại để chèn vào nhiều email; sửa block cập nhật mọi email đang link | Chỉ block chèn bằng `Browse saved blocks` mới được đếm `Used in` |
| Custom field | Trang `Custom fields`; dialog `New custom field`; New contact `Custom fields` › `Add field` (`key`, `Kind of value`) | Thuộc tính tuỳ biến của contact, key dạng `^[a-z][a-z0-9_]*$`, kiểu Text / Number / Boolean / Date / Datetime | Jira MTRO-25 và rule cũ gọi "contact attributes" / "custom attribute"; segment builder cũ gọi nhóm `Custom attributes` (đổi `Custom fields` 29/09) |
| Contact field | Automation `Update contact field` › `Contact field` | Tập field gồm 5 field chuẩn (First name · Last name · Country code · Address · SMS) + custom field | Đổi tên 2 lần: `Update property` (rule 18/09) → `Update custom field` (29/09) → `Update contact field` (01/10) |
| SMS / Phone | `SMS` (New contact, detail, merge tag `SMS {{contact.phone}}`, menu biến) | Số điện thoại contact, có combobox mã quốc gia (mặc định Afghanistan +93) | Segment builder, CSV import / export vẫn gọi `Phone`; lỗi validate vẫn là `Phone is invalid` |
| Consent | Cột `Consent` (`Subscribed` / `Unsubscribed`); khối `Email status` | Sổ **consent** — người nhận tự opt-out (footer link, one-click header, import, staff) | Khác suppression. Tab `Unsubscribe` ở trang Suppressions là sổ consent |
| Suppression | Trang `Suppressions`, tab `Bounce & complaint` (`Bounced` / `Spam complaint`) | Sổ **deliverability** — địa chỉ bị chặn do hard bounce, complaint, 7 soft bounce liên tiếp; không tự gỡ | DB `suppressions` per `(team_id, email)`; SES có danh sách account-global riêng |
| Segment | `Segments`, `Create segment`, `New segment` / `Edit segment` | Tập contact động theo điều kiện (live, không phải snapshot) | Không có "list" tĩnh (`/lists` trắng). Tên segment cho trùng (`Untitled segment` nhiều bản) |
| Preferences page / Preference center | Sidebar `Email preferences`; `New preferences page`; combobox `Preferences page` (campaign), `Email preferences page` (automation) | Trang người nhận chọn loại email muốn nhận; mỗi choice ghi true/false vào 1 custom field Boolean | Jira MTRO-17 gọi "preference center"; trang công khai người nhận chưa thấy trên staging |
| Merge tag / Variable | Editor: `Insert merge tag`; automation: `Add variable` | Chuỗi thay giá trị lúc gửi: `{{contact.first_name}}`, `{{contact.attr.<key>}}`, `{{unsubscribe_url}}`, `{{preferences_url}}` | Cú pháp đảo 2 lần: hai ngoặc (≤ 23/09) → một ngoặc (29/09) → **hai ngoặc (01/10)**. Rule 18/09 còn ví dụ `{{email}}` |
| Trigger automation | `Contact created` / `Contact field changed` (+ `Which fields?`) | Sự kiện bắt đầu flow | Rule 18/09 ghi `Contact updated` (cũ) |
| Run / outcome | Run history: `Filter by outcome` {`All outcomes`, `In progress`, `Completed`, `Exited`} | 1 lượt contact đi qua flow; trạng thái run `Pending` · `Running` · `Waiting` · `Completed` · `Failed` · `Cancelled` · `Skipped` | `Exited` gồm cả run `Failed` |
| Sending domain | Settings › `Sending domains`, `Add sending domain`, `Domain settings` | Domain gửi email (SPF/DKIM/DMARC); chưa verify thì không gửi campaign | Domain mới `Pending` — "contact support to start verification", không tự xem DNS |
| Campaign status | Filter `All statuses` · `Draft` · `Scheduled` · `Running` · `Sent` · `Partly sent` · `Cancelled` · `Failed` | — | Rule ghi 4 status (Draft / Scheduled / Sent / Running) |
| Tên bản sao | Campaign: `<tên> (copy)`; Email library: `Copy of {name}`; Duplicate design: `{name} (copy)`; Segment: `<tên> (copy)` | — | Rule campaign ghi "Copy of {name}" (sai với staging) |
| Shared sending host / borrowed sender | (UI không hiện) — API `sender_is_borrowed: true`, `effective_from_email` | Khi From email không thuộc domain verified, Mailtro gửi qua domain hệ thống `mailtro.ai` | PO 02/10 chốt cho automation; mâu thuẫn rule "không gửi khi chưa verify" của campaign |
| Sending suspended / Disabled | banner "Sending from this workspace is paused" | Trạng thái workspace khi abuse guard tự dừng (bounce / complaint cao) hoặc staff khoá | MTRO-92, chưa kiểm trên staging |
| Sending lane | — | Luồng gửi (marketing, …) với reason-set suppression riêng, dùng chung `SuppressionChecker` | Nguồn MTRO-78 |
| Task QA Hub `MTRO-0xx` vs Jira `MTRO-xx` | — | QA Hub dùng cùng prefix `MTRO` với Jira nhưng đánh số riêng có 3 chữ số (MTRO-017 ≠ MTRO-17) | Luôn ghi rõ "task QA Hub" hay "Jira" khi trích |
| Test case id | QA Hub `TC-MTRO-<số>`; repo `TC-<SCREEN>-0xx` (`TC-SIGNUP-004`, `TC-FLOW-249`…) | — | Map qua field `Automation Script Ref` (`conventions/module-naming.md`) |

## Source

- `inventory/MTRO.md` § 2, § 5.1 (L01, L45, L48, L51, L58, L66, L67), § 5.4 — staging 01/10/2026.
- `business-rules/MTRO.md`, `open-questions/MTRO.md` § "Tên hiển thị chính thức của role thứ 3".
- `references/apps/README.md` (glossary chung), `conventions/module-naming.md`.
