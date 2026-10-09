<!-- testlane knowledge KB-373 · kind=feature-profile · tag=Contacts · status=draft · sourceUrl=https://github.com/ownego/qa-knowledge-work/blob/ae07d04a61509378493a9a07714b04f4e77a36e6/kb/MTRO/features/03-contacts.md · createdAt=2026-10-08T08:01:02.879Z · updatedAt=2026-10-08T08:01:02.879Z -->

# 3. Contacts (list · New / Edit contact · Contact detail · Import contacts · Export contacts)

**Status:** in-review

Phân tích ngày 2026-10-07 từ: `business-rules/MTRO.md` § "Contacts — danh sách & tạo contact (MTRO-23, MTRO-24)" (rule 15/09/2026), `open-questions/MTRO.md` § Contacts, `inventory/MTRO.md` § 2.3 (staging đi thật 01/10/2026, role Owner; Import bước 2–3 chỉ từ bundle), task QA Hub **MTRO-010** (Partially Ready 11/14; BR-01…BR-27 — câu trả lời PO/BA và Dev 02/10, QA lead 05/10, Dev 06/10) và **MTRO-025** (Import/Export, Not Ready 6/14), Jira MTRO-8/21/22/23/24/25/26/95 (đọc 07/10), knowledge QA Hub KB-003 / KB-004, repo `qikify-QA-mailtro` (bug log contacts-segment 20/08–08/09, test-run 26/08, 05/10, 06/10). Custom field chi tiết ở [05-custom-fields](05-custom-fields.md); consent / suppression ở [06-suppressions](06-suppressions.md).

## Purpose

Quản lý danh bạ người nhận của workspace: xem / tìm / tạo / sửa / xoá contact, xem trạng thái email (consent, deliverability) của từng người, nhập hàng loạt từ CSV (thay Brevo) và xuất CSV. Contact là dữ liệu đầu vào của Segments → Campaigns / Automations.

## Business Rules

### Trang Contacts (`/contacts`) — staging 01/10; rule MTRO-23 bị corrected

- h1 `Contacts`, subtitle `{count} contacts` (đếm theo kết quả search; "0 contacts" thoáng qua lúc tải); nút `Export` (dialog Export contacts), `Import` (`/contacts/import`), `New contact`.
- `Search contacts...` tìm theo email (đủ hoặc một phần) **và theo tên** (`POST /api/teams/{slug}/contacts/search?page=1`); không khớp: `No contacts match your search` / `Try a different email or name.`
- Bảng: `Email` · `First name` · `Last name` · `Consent` (`Subscribed` / `Unsubscribed`) · `Created at` ↕ · `Updated at` ↕ · `Actions`; mặc định sort `Created at` giảm dần; click dòng → detail; 25 dòng/trang.
- **Corrected 01/10 (rule MTRO-23 15/09 ghi "search theo email, 6 cột có checkbox, chọn tất cả / từng dòng")**: staging có cột `Consent`, **không** có checkbox / bulk action, search cả tên (MTRO-010 BR-04; inventory L13).
- Menu dòng `Actions for {email}` → `Edit` · `Delete`; Delete: `Delete {email}?` / "This will permanently remove the contact. This can't be undone." · `Cancel` / `Delete`; toast `Contact deleted` / `Couldn't delete contact`.
- **Search phải ra cả contact Unsubscribed** — hiện search **không** trả contact Unsubscribed kể cả gõ đủ email → **PO/BA + Dev 02/10 xác nhận là lỗi** (MTRO-010 BR-13). Gốc: search đi qua `ContactsResource::baseQuery`, có điều kiện loại unsubscribe global + bounce/complaint (Dev 02/10, BR-08). Retest Slack 06/10: vẫn lỗi (REOPENED).
- `Consent` ở list và `Email status` ở detail đọc cùng bảng `unsubscribes` (global); khi lệch thì **Email status đúng** (PO/BA + Dev 02/10, BR-14). Bounce / complaint chỉ hiện ở `Deliverability`; unsubscribe theo topic không hiện ở cả hai. Retest Slack 06/10 (#11): Consent list = detail **VERIFIED**.
- Tag contact **ngoài phạm vi** ("bỏ tag rồi") — PO/BA 02/10 (BR-15). `/contacts/tags` bị hiểu là contact id → `Not Found.`

### Dialog New contact — PO/BA 02/10 thay AC MTRO-24

- **Corrected**: AC MTRO-24 + rule 15/09 ghi "dialog phase này chỉ có Email, First name, Last name"; **PO/BA 02/10 chốt bản dựng là chuẩn** (BR-09): tiêu đề `New contact` / "Add a contact to this workspace." gồm `Email` (`jane@company.com`), `First name`, `Last name`, `Country` (`Select a country`, tìm `Search countries...`, rỗng `No country found.`), `Address`, `SMS`, `Custom fields` › `Add field`. AC Jira chưa cập nhật.
- **Email** bắt buộc, là định danh chính (rule 15/09, BR-01); `Create contact` disabled khi Email trống. Format: chặn bằng HTML5 `<input type="email">` lúc submit (tooltip trình duyệt); BE thấy sai → 422 `The email field must be a valid email address.` ở khung đỏ đầu dialog; `a@b` qua cả 2 lớp; trùng → `The email has already been taken.` (Dev 02/10, BR-17). Email tối đa 255 ký tự (422 rõ, test-run 26/08).
- **SMS** (= field `phone`): combobox quốc gia mặc định **Afghanistan +93** là hành vi mong muốn (PO/BA 02/10, BR-10); libphonenumber FE + BE, hợp lệ theo từng nước (nhận số bàn); số nội địa lấy nước ở ô cờ, gõ `+…` tự đổi cờ; lưu **E.164**; tối đa 32 ký tự; sai → FE `Phone is invalid` khi rời ô + khoá nút; BE `Enter a valid SMS number with its country code…` (Dev 02/10, BR-18).
- Nhãn trường số điện thoại là **`SMS` ở mọi nơi** (dialog, Properties, segment builder, CSV, Automations, picker merge tag); key `phone`, `{{contact.phone}}` không đổi (QA lead 05/10, KB-004 / BR-25). Message lỗi FE giữ nguyên văn `Phone is invalid` (Dev 06/10, BR-27).
- **Custom fields**: `Add field` sinh dòng `key` (combobox gợi ý field có sẵn kèm kiểu) · `Kind of value` {`Text`, `Number`, `Boolean`, `Date`, `Datetime`} · ô `value` (Boolean → combobox `True` / `False`) · `Remove field`. Rule key / value / giới hạn ở [05-custom-fields](05-custom-fields.md) (BR-20…BR-24 của MTRO-010).
- Hai dòng cùng key: không chặn, dòng sau ghi đè, không báo (Dev 02/10 mô tả hiện trạng, BR-21; BUG-CS-08 coi là by-design 01/10) — PO chưa xác nhận là chủ ý.
- Contact vừa tạo hiện trong list có `Created at` / `Updated at` (rule 15/09, BR-02). Double-click `Create contact` chỉ 1 request (26/08).
- Portal `POST/PUT contacts` **không** có rate limit; Public API v1: 120 request/phút/API key (Dev 02/10, BR-23).
- Contact tạo lẻ (dialog / API) mới vào trigger automation; **import CSV không kích hoạt automation** (QA lead 05/10, KB-003 / BR-26).

### Dialog Edit contact — staging 01/10 + Dev 02/10

- Mở từ menu dòng hoặc `Contact actions` ở detail; field prefill; key custom field có sẵn chỉ là nhãn, `Kind of value` disabled.
- Sửa contact **không được đổi kiểu** custom field đã có; Boolean khi sửa chỉ nhận true/false (PO/BA 02/10, BR-12). Bản dựng Edit hiện ô text cho Boolean / Date / Number → **lỗi** so với BR-12 (Dev 02/10, BR-24). Retest Slack 06/10 (#10): Boolean ở Edit đã là combobox — **VERIFIED**; Date / Number vẫn là ô text (TC-MTRO-1717: Number `abc` → rỗng, Save làm mất giá trị).
- `Save` **không kiểm dirty** (chưa sửa vẫn bật + gửi PUT) và phụ đề Edit vẫn "Add a contact to this workspace." — cả hai Dev 02/10 xác nhận là **lỗi** (BR-19); 06/10 còn tái hiện (TC-MTRO-1720, 1721).
- Route sửa là `PUT` (PATCH → 405) (06/10). Hai tab Edit cùng contact: tab Save sau ghi đè tab kia (PUT toàn bộ attributes), không cảnh báo (quan sát 06/10, GAP-10 MTRO-022).
- Dialog Edit không có field Consent → UI không đổi consent được (AS-02 MTRO-010, chưa xác nhận).

### Contact detail (`/contacts/:id`) — staging 01/10

- Header: `Back` · avatar chữ cái đầu · h1 = email · `Contact actions` (`Edit` · `Delete`); `Created` / `Updated`.
- Khối **Email status** (read-only): `Consent` · `Unsubscribed via` (`Footer link` / `—`) · `Unsubscribed on` · `Deliverability` (`Good` / bounced…) · `Last delivery event` (vd `Clicked · Oct 1, 2026, 11:22 AM`).
- Khối **Properties**: `First name` · `Last name` · `Country` · `Address` · `SMS`. Khối **Custom fields**: key → value hoặc `—`.
- id không tồn tại → alert `Not Found.` (API 404), không có nút Back.
- Contact Unsubscribed: **không** có thao tác resubscribe trên UI (inventory L16; GAP-14 MTRO-010) — resubscribe chỉ qua API `DELETE teams/{team}/unsubscribes/{id}` (rule MTRO-81).
- `Updated` **không đổi** khi contact unsubscribe (Updated 11:18, Unsubscribed on 11:23 — inventory L13; GAP-13 MTRO-010).
- Trang detail không tự refresh sau khi automation ghi attribute (phải reload — test-run 06/10).
- **Corrected so với MTRO-26** (To Do): ticket mô tả Stat row `Status`, khối **Tags**, card **Activity** + timeline + `Refresh`; staging không có Tags (ngoài phạm vi, BR-15), không có timeline / activity (inventory § 2.3). Chỉ trong bundle: `Segment similar users`.

### Import contacts (`/contacts/import`) — staging 01/10 + comment PO MTRO-95 28/09

- Stepper `1 Upload file` · `2 Map columns` · `3 Review and import`; "Add or update contacts from a CSV file."
- Dropzone `Drop a CSV file here, or click to choose one` — "The first row holds the column names, one contact per row. Up to 10 MB and 50,000 contacts." (BR-11 MTRO-025).
- `Download an empty file with your columns` → `contacts-template.csv`, header: `Email,First name,Last name,Country code,Phone,Address,Consent,` + mọi custom field (staging 01/10 — **header vẫn `Phone`**, lệch KB-004 "header CSV dùng `SMS`", xem Edge Cases).
- "How your contacts are handled" (copy staging 01/10, BR-07…BR-10): khớp theo **email**, người dùng chọn giữ nguyên hay cập nhật người đã có; chỉ cột được import mới thay đổi, ô trống giữ giá trị cũ; cột Consent **có thể đánh unsubscribed nhưng không bao giờ subscribe lại** người đã opt-out; email trùng trong file → dùng dòng đầu, dòng sau vào "not imported".
- **Quyết định PO 28/09 (MTRO-95)**: cột chuẩn ghi vào field chuẩn; cột khác → custom field, **giữ nguyên tên header** (vd Brevo `HOST_APPSTATUS`, `COUNTRY_CODE`). Mâu thuẫn với PO/Dev 01/10 "attribute chữ hoa chuyển thành chữ thường" (MTRO-022 BR-18) và với rule key `^[a-z][a-z0-9_]*$` → GAP-01 Major.
- Bước 2 `Map columns` (bundle, chưa đối chiếu UI): `Choose the email column`; cột `Column in your file` / `Examples` / `Import as`; đích `Contact details` / `Your fields` / `New field` (+ `Name of the new field`) / `Don't import`; "If a contact is already in your list": `Leave them as they are` / `Fill in their details from the file`; khớp tên bỏ qua hoa thường, khoảng trắng, dấu câu (FIRSTNAME → First name).
- Bước 3 (bundle): `New contacts` · `Already in your list, left as they are` · `Already in your list, updated` · `New fields` · `Rows that won't be imported`; `Import {count} contacts`; "People marked unsubscribed in the file will be unsubscribed. Anyone who already opted out stays unsubscribed, whatever the file says." Import chạy nền: "You can leave this page…".
- Màn kết quả (thấy thật 01/10): `Import finished` / `Every row was imported.`; ô `Added` · `Updated` · `Left as they were` · `Not imported`; "7 contacts were marked unsubscribed."; `Import another file` / `View contacts`. Mở lại `/contacts/import` hiện lượt cuối **của cả workspace** (BR-13).
- Contact bị unsubscribe qua import có nguồn opt-out `Other` ở tab Unsubscribe (BR-14).
- Lỗi bước 1 (bundle): `That is not a CSV file. Save it as CSV (UTF-8) and try again.`, quá 10 MB, quá nhiều cột, rỗng, không đọc được; rate limit "You have started a lot of imports in the last minute…"; Leave dialog `Leave this import?`.

### Export contacts (dialog) — staging 01/10; **không có ticket Jira** (GAP-07)

- Radio `All contacts` (mặc định — "Everyone in your list, including people who unsubscribed.") / `Contacts in a segment` (hint "The people a campaign to this segment would reach, so unsubscribed people aren't in it."; `Export` disabled tới khi chọn segment) (BR-15).
- File: "One column per contact detail, a Consent column, then one per field. You can edit the file and import it back as it is." — field chuẩn → `Consent` (`subscribed` / `unsubscribed`) → custom field, header = key (PO 28/09 + staging, BR-04, BR-17).
- File tải được **7 ngày**; `Export history` ("You haven't exported anything in the last 7 days."); chỉ **người tạo export** mới tải được (`Only the person who ran this export can download it.`).
- Giá trị bắt đầu `= + - @` được prefix `'` (chống CSV formula injection — quan sát 06/10).
- Segment cũng xuất được từ menu dòng `Export CSV` ở [Segments](04-segments.md) (PO 02/10, MTRO-011 BR-13).

## Edge Cases

- Email `not-an-email` trong dialog: nút **enable**, không lỗi inline khi rời ô (inventory L12) — **Resolved** (Dev 02/10, BR-17): chặn ở HTML5 lúc submit + BE 422; rule 15/09 "validate format trước khi submit" nên sửa cho đúng tầng.
- Search không ra contact Unsubscribed — **Resolved: là lỗi** (PO/Dev 02/10). Rủi ro: sửa `baseQuery` có thể làm segment thôi loại contact bị suppress (RISK-02 MTRO-010) → regression segment count.
- Consent list lệch detail / tab Unsubscribe (inventory L43, 01/10) — retest 06/10 VERIFIED khớp; vẫn nên có case so list ↔ detail ↔ tab ↔ export.
- Custom field value rỗng hiện ô trắng ở detail thay vì `—` như field chuẩn (TC-MTRO-258, 06/10) — `Need confirm` PO.
- Alert "The email has already been taken." không tự mất khi sửa email (BUG-CS-09, 26/08).
- Dialog New contact không cuộn ở 375×667, ≥3 dòng custom field thì nút ra ngoài màn (BUG-CONTACT-01, P1, 06/10).
- Ma trận quyền tạo / sửa / xem contact theo Owner / Admin / Member, chặn ở API — `Need confirm` (GAP-15 Major MTRO-010).
- Ý nghĩa giá trị `Consent` / `Deliverability` / `Unsubscribed via`; `Updated at` có đổi khi consent đổi — `Need confirm` BE (GAP-13).
- Resubscribe / gỡ suppression có UI không — `Need confirm` PO (GAP-14; inventory L16).
- Subtitle `1 contacts` (số ít) — `Need confirm` (GAP-16; inventory L15).
- Search chậm 3–8 giây, trong lúc chờ còn hiện kết quả lần gõ trước (inventory L49) — ngưỡng chấp nhận `Need confirm` (GAP-17).
- Import: key cho cột lạ giữ header hay hạ chữ thường (GAP-01 Major); giá trị không hợp lệ trong dòng bỏ cả dòng hay chỉ ô (GAP-04 Major); header `Phone` cũ còn khớp trường SMS sau 05/10 không — template staging 01/10 vẫn là `Phone` (GAP-05 Major); quyền Import / Export theo role (GAP-06 Major); Export không ticket — hành vi staging có phải spec (GAP-07 Major) — tất cả `Need confirm` PO.
- Import email đang bị suppress, 2 lượt import đồng thời, BOM / dấu `;`, 50.001 dòng chặn ở bước nào, ngưỡng hiệu năng (đề xuất import 50.000 dòng ≤5 phút, export ≤2 phút) — `Need confirm` (GAP-08…GAP-18 MTRO-025).
- KB-003 ghi "import CSV chưa có UI trên staging" — **corrected**: staging 01/10 đã có màn Import (inventory L42). KB-003 cần sửa câu này.

## Testability Notes

- Workspace `qa-workspace` dùng chung, nhiều người dùng tài khoản Owner cùng lúc: số contact đổi liên tục (203 → 212 trong 15 phút ngày 01/10) — **không assert số tuyệt đối**, chỉ so delta; prefix data theo người (`qa-nga-{ts}-…`) (inventory L50; repo quy ước).
- Import tạo contact thật và **không có bulk delete** → dựng file CSV nhỏ, prefix riêng; case 10 MB / 50.000 dòng phải hỏi chị Nga trước (bulk-upload-contact.md).
- Không test được `notYours` của Export khi chỉ có 1 tài khoản Owner (inventory L50).
- Không gửi được API tuỳ ý bằng session trong sub-agent (Sanctum SPA cần header) → nhiều case API bị blocked (TC-MTRO-1710…1729).
- Bộ case: `02-contacts/create-contact.md` (75 case, task MTRO-010), `02-contacts/bulk-upload-contact.md` (95 case, task MTRO-025, chưa chạy). Gợi ý auto/manual MTRO-8: 65/35 (knowledge-work) · 70/30 (repo, hiệu chỉnh 18/08).

## Known Issues

See [known-issues.md](../known-issues/known-issues.md) for entries tagged `contacts`.

## Related Jira Tickets

- MTRO-8 — Contacts, Epic — description trống; ý tưởng segment bằng ngôn ngữ tự nhiên (PO 02/07).
- MTRO-23 — Contact manage page, Story, QA Review — header, search, bảng 6 cột (bị corrected).
- MTRO-24 — Create contact manually, Story, QA Review — AC 3 field (bị PO/BA 02/10 thay bằng bản dựng).
- MTRO-25 — Bulk import contact (bản cũ), Story, To Do — danh sách attribute MKT (OWNER, Plan, Domain, `[app]_APPSTATUS`…).
- MTRO-26 — Contact details: overview and activity timeline/history, Story, To Do — Tags / Activity chưa có trên staging.
- MTRO-95 — Bulk import contact, Story, QA Review — description trống; quyết định mapping PO 28/09 nằm trong comment.
- MTRO-21 — API for contact management, Story, To Do — trống. MTRO-22 — Migrate contacts from Brevo, Story, To Do — trống.
- MTRO-57 — [BE] Contact list api, Story, QA Review — trống.
- MTRO-109 — [BE] Sync contacts từ google sheet và form submission, Story, To Do — trống (bối cảnh ở Epic MTRO-9).
- MTRO-116 / 117 / 118 — Brevo converter tools / đặt tên CSV / kiểm nguồn CSV qua MCP, QA Review / To Do — trống.

## Source

- `business-rules/MTRO.md` § "Contacts — danh sách & tạo contact (MTRO-23, MTRO-24)" — 15/09/2026; `open-questions/MTRO.md` § "AC MTRO-24 lệch bản dựng dialog New contact".
- `inventory/MTRO.md` § 2.3, L12, L13, L15, L16, L42, L43, L44, L45, L49, L50 — staging 01/10/2026.
- QA Hub task MTRO-010 (75 case: 55 pass · 8 fail · 11 blocked · 1 skipped; notes cập nhật 06/10), MTRO-025 (95 case not-run), MTRO-007 (task cũ trùng phạm vi); knowledge KB-003, KB-004 — đọc 2026-10-07.
- Jira MTRO-8, 21, 22, 23, 24, 25, 26, 57, 95, 109, 116–118 — đọc 2026-10-07.
- Repo `qikify-QA-mailtro`: `docs/bugs/02-contacts/*`, test-run `02-contacts/2026-08-26-contacts-create-contact…`, `2026-10-05-contacts…`, `2026-10-06-contacts…`, `2026-10-06-segment-slack-retest…`; `docs/manual-testcases/02-contacts/create-contact.md`, `bulk-upload-contact.md`.
