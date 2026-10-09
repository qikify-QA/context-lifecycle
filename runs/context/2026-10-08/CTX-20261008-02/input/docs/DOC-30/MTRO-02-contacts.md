# MTRO — Inventory · Contacts, Segments, Custom fields, Suppressions

> Phần **Contacts, Segments, Custom fields, Suppressions** của inventory MTRO — tách từ `knowledge-work/inventory/MTRO.md` (bản staging 01/10/2026, commit 8596139). Tổng quan, nguồn, route, môi trường, lịch sử build: file `00-overview.md`. Link `#c-…` / `#lxx` trỏ sang file khác thì tìm theo id trong file tương ứng.

## 2. Feature theo trang (phần module)

<a id="c-contacts"></a>
### 2.3. Contacts

> **Build lại `--module contacts` ngày 2026-10-01** (staging 14:41–14:56 +07, role Owner). Chương 2.3–2.6 thay toàn bộ nội dung 29/09.

| Mục | Nội dung |
|---|---|
| Trạng thái | ✅ list, search, detail, dialog New / Edit, Delete confirm, **Import contacts** (`/contacts/import`, 3 bước), **Export contacts** (dialog + `Export history`). 🟡 Import: agent chỉ đi được bước 1 (không upload file vì Playwright MCP của phiên không có tool upload, và upload là tạo data). Bước 2–3 chép từ i18n bundle; màn kết quả thấy thật nhờ một lượt import của người khác lúc 14:49. ❌ chưa có checkbox chọn dòng / bulk action, chưa có tag, detail chưa có timeline / activity |
| Nguồn xác nhận | staging 01/10 (`MTRO-contacts.png`, `MTRO-contacts-import.png`, `MTRO-contacts-import-finished.png`, `MTRO-contacts-export.png`, `MTRO-contacts-export-new.png`, `MTRO-contacts-export-segment.png`, `MTRO-contacts-export-history.png`, `MTRO-contacts-new-contact.png`, `MTRO-contacts-new-contact-field-key.png`, `MTRO-contacts-new-contact-validation.png`, `MTRO-contacts-edit-contact.png`, `MTRO-contacts-detail.png`, `MTRO-contacts-detail-unsubscribed.png`, `MTRO-contacts-search-unsubscribed.png`, `MTRO-contacts-list-consent-mismatch.png`, `MTRO-contacts-detail-consent-mismatch.png`) · bundle `mailtro.js` 01/10 04:59 GMT (`page.contacts.*`, `page.contactImport.*`, `exportContactsDialog.*`, router) |
| Route | `/contacts`, `/contacts/import`, `/contacts/:id` |
| Vào từ | sidebar `Contacts`; nút `Import` → `/contacts/import`; nút `Export` → dialog **Export contacts**; click dòng → `/contacts/:id` |
| Tag / task QA Hub | `04-contacts`, `Create contact`, `UI` (MTRO-007, `todo`, sửa 30/09, 50 case) · `04-contacts`, `Create contact`, `MTRO-24`, `MTRO-25`, `UI` (MTRO-010, `in-progress`, 49 case). Hai task trùng phạm vi ([L36](#l36)). Import / Export: *chưa có task* |
| Jira | MTRO-8 Contacts › MTRO-23 (Contact manage page), MTRO-24 (Create contact manually), MTRO-25 (Create contact attributes), MTRO-26 (details). Import CSV: MTRO-22 (reference ghi To Do). Mã lấy từ reference / header test case, chưa kiểm Jira |
| Test case | `04-contacts/create-contact.md` (viết 19/08, chạy 26/08): lệch nhiều chỗ ([L45](#l45)). Import / Export / search: chưa có case |
| Lệch mở | [L12](#l12) · [L13](#l13) · [L15](#l15) · [L16](#l16) · [L32](#l32) · [L34](#l34) · [L42](#l42) · [L43](#l43) · [L44](#l44) · [L45](#l45) · [L49](#l49) · [L50](#l50) |
| Liên kết | [`business-rules/MTRO.md`](../business-rules/MTRO.md) § "Contacts — danh sách & tạo contact (MTRO-23, MTRO-24)" (4 rule) · [`open-questions/MTRO.md`](../open-questions/MTRO.md) § "AC MTRO-24 lệch bản dựng dialog New contact", § "Cột Consent trong bảng kết quả segment (R40)" |

**List** (`/contacts`)

| Phần tử | Loại | Action → kết quả |
|---|---|---|
| h1 `Contacts`, subtitle `{count} contacts` | text | 01/10: "203 contacts" lúc 14:41, "212 contacts" lúc 14:55 (sau lượt import 9 contact của người khác). Subtitle đếm theo kết quả search ("0 contacts", "1 contacts"). Lúc đang tải hiện "0 contacts" thoáng qua |
| `Export` | button | mở dialog **Export contacts** (bảng dưới) |
| `Import` | button | sang `/contacts/import` |
| `New contact` | button | mở dialog **New contact** |
| `Search contacts...` | field | tìm theo email, đủ hoặc một phần (`letter` ra `[REDACTED]`), và theo tên (`Customer` ra 10). Gọi `POST /api/teams/{slug}/contacts/search?page=1`. Không khớp: `No contacts match your search` / `Try a different email or name.` **Contact `Unsubscribed` không tìm ra**, kể cả gõ đủ email ([L44](#l44)). Kết quả về chậm; trong lúc chờ, bảng và subtitle còn giữ kết quả lần gõ trước ([L49](#l49)) |
| Bảng: `Email` · `First name` · `Last name` · `Consent` (`Subscribed` / `Unsubscribed`) · `Created at` ↕ · `Updated at` ↕ · `Actions` | table | không có cột checkbox, không bulk action. Mặc định sort `Created at` giảm dần. Click dòng sang detail. Cột `Consent` **không khớp** detail và tab Unsubscribe với một số contact ([L43](#l43)) |
| `Actions for {email}` | menu dòng | `Edit` (mở dialog Edit contact) · `Delete` |
| Delete | alertdialog | `Delete {email}?` / "This will permanently remove the contact. This can't be undone." · `Cancel` / `Delete` (chỉ mở rồi Cancel) |
| `Previous` / `Page 1`…`5` / `Next` | pagination | 25 dòng/trang (`per_page=25`) |

**Dialog New contact** (tiêu đề `New contact`, phụ đề "Add a contact to this workspace.")

| Phần tử | Loại | Action → kết quả |
|---|---|---|
| `Email` | field, placeholder `jane@company.com` | `Create contact` disabled khi trống. Với `not-an-email` thì nút **enable**, không có lỗi inline ([L12](#l12)). Không bấm submit |
| `First name` · `Last name` | field | — |
| `Country` | combobox `Select a country` | ô tìm `Search countries...`; rỗng: `No country found.` (i18n) |
| `Address` | field | — |
| `SMS` | combobox quốc gia (cờ + mã) + ô `SMS +93` | mặc định **Afghanistan +93**; ô tìm `Search countries...`, option dạng `🇻🇳 Vietnam +84`. Nhập `abc` rồi rời ô → `Phone is invalid`, ô `invalid`, `Create contact` disabled ([L45](#l45)) |
| `Custom fields` › `Add field` | button | sinh một dòng: combobox `key` (gợi ý field có sẵn kèm kiểu: `plan_tier Text`, `app Text`, `seg_run Text`, `keep_key Text`, `run_0826 Text`, `new_letter Boolean`, `empty_val Text`, `qa_l6_attr_x Text`) · combobox `Kind of value` {`Text`, `Number`, `Boolean`, `Date`, `Datetime`} · ô `value` (chọn `Boolean` thì thành combobox `Value` {`True`, `False`}) · `Remove field`. Gõ key `Bad Key!` thì tự chuẩn hoá thành `bad_key`, không thấy thông báo lỗi |
| `Cancel` / `Create contact` / `Close` | button | Cancel đóng dialog |

- Không còn **chip gợi ý** custom field dưới `Custom fields` (29/09 có): xem [§ 5.4](#s5-4).
- i18n (bundle 01/10): `Email is required.`, `Phone is invalid`, `Custom field keys must start with a lowercase letter and use only lowercase letters, digits and underscores.`; toast `Couldn't create contact`, `Couldn't update contact`, `Contact deleted`, `Couldn't delete contact`.

**Dialog Edit contact** (từ menu dòng hoặc `Contact actions`): tiêu đề `Edit contact`, phụ đề vẫn là "Add a contact to this workspace."; field prefill; nút `Save` **enable ngay** khi chưa đổi gì. Custom field có sẵn hiện key dạng nhãn (không sửa được key), `Kind of value` **disabled**, value là ô text. Field Boolean (`new_letter`) hiện chữ `true` trong ô text, không phải combobox `True` / `False` như lúc tạo ([L45](#l45)). Mở rồi Cancel.

**Import contacts** (`/contacts/import`, breadcrumb Contacts › Import contacts)

| Phần tử | Loại | Action → kết quả |
|---|---|---|
| h1 `Import contacts`, "Add or update contacts from a CSV file." + stepper `1 Upload file` · `2 Map columns` · `3 Review and import` | text | staging 01/10 |
| `Drop a CSV file here, or click to choose one` / "The first row holds the column names, one contact per row. Up to 10 MB and 50,000 contacts." | dropzone (button) | không upload |
| `Download an empty file with your columns` | button | tải `contacts-template.csv`, header: `Email,First name,Last name,Country code,Phone,Address,Consent,plan_tier,app,seg_run,keep_key,run_0826,new_letter,empty_val,qa_l6_attr_x` |
| Khối "How your contacts are handled" | text | 4 dòng: "Contacts are matched by email. You choose whether people already in your list are left as they are or updated." · "Only the columns you import change. A blank cell keeps the value a contact already has." · "A Consent column can mark people unsubscribed, but never subscribes someone who opted out." · "If the same email appears twice, the first row is used and the other is listed as not imported." |
| Bước 2 `Map columns` | (bundle, chưa đối chiếu UI) | `Choose the email column`; cột `Column in your file` / `Examples` / `Import as`; đích: nhóm `Contact details` (Email, First name, Last name, Country code, Phone, Address, Consent), `Your fields`, `New field` + `Name of the new field`, `Don't import`. Lựa chọn **If a contact is already in your list**: `Leave them as they are` / `Fill in their details from the file`. Lỗi: `newFieldInvalid`, `newFieldExists`, `newFieldIsDetail`, `newFieldReserved`, `blankHeader`, `duplicateHeader`, `alreadyFilled`. Ghi chú "Column names are matched ignoring capitals, spaces and punctuation, so FIRSTNAME fills First name. A new field is created when the import runs." |
| Bước 3 `Review and import` | (bundle) | `New contacts` · `Already in your list, left as they are` · `Already in your list, updated` · `New fields` · `Rows that won't be imported`; nút `Back to mapping` / `Import {count} contacts`; "People marked unsubscribed in the file will be unsubscribed. Anyone who already opted out stays unsubscribed, whatever the file says." |
| Tiến trình | (bundle) | `{processed} of {total} rows done` · "You can leave this page. The import keeps running, and coming back here shows where it is." · `Back to contacts` |
| Màn kết quả | alert + 4 ô số | **thấy thật** (lượt import của người khác lúc 14:49): `Import finished` / `Every row was imported.`; `Added` 9 · `Updated` 0 · `Left as they were` 0 · `Not imported` 0; "7 contacts were marked unsubscribed."; nút `Import another file` / `View contacts`. Mở `/contacts/import` sau đó hiện màn kết quả của lượt cuối trong workspace (`GET bulk-operations?type=contacts.import`) |

- Lỗi file (bundle): `notCsv` "That is not a CSV file. Save it as CSV (UTF-8) and try again.", `tooBig` (10 MB), `tooManyColumns`, `empty`, `noRows`, `unreadable`; rate limit `tooMany` "You have started a lot of imports in the last minute…"; Leave dialog `Leave this import?` / "Nothing has been imported yet. Your file and column choices will be lost."
- Kết quả một phần (bundle): `Import finished, some rows were not imported`, `Import stopped`, `consentKept`, `optOutsKept`, `Download these rows`.
- Endpoint (bundle): `POST contacts/imports/preview`, `POST contacts/imports`, `bulk-operations/{id}`, `bulk-operations/{id}/failures`, `…/failures/download`.
- Contact bị đánh unsubscribed qua import có nguồn opt-out `Other` ở tab Unsubscribe ([2.6](#c-suppressions)).

**Dialog Export contacts**

| Phần tử | Loại | Action → kết quả |
|---|---|---|
| Lần mở đầu tiên trong phiên (đã có export gần đây) | dialog | "Your export is ready" · "All contacts · 203 contacts" · "You can download it until Oct 8, 2026, 2:25 PM." (hạn 7 ngày) · `Export history` / `New export` / `Download` |
| Form (bấm `New export`, hoặc mở lại dialog) | dialog | "Download your contacts as a CSV file you can open in a spreadsheet." · radio `All contacts` (mặc định; hint "Everyone in your list, including people who unsubscribed.") / `Contacts in a segment` · "One column per contact detail, a Consent column, then one per field. You can edit the file and import it back as it is." · `Export history` / `Cancel` / `Export` |
| `Contacts in a segment` | radio | hiện combobox `Segment to export` (`Choose a segment`), hint đổi thành "The people a campaign to this segment would reach, so unsubscribed people aren't in it."; `Export` **disabled** cho tới khi chọn segment |
| Picker `Segment to export` | listbox | chỉ hiện tên segment; có nhiều `Untitled segment` trùng tên (R41) |
| `Export history` | view | `Back` + danh sách "All contacts — Oct 1, 2026, 2:25 PM · 203 contacts" + `Download`. Empty (i18n): "You haven't exported anything in the last 7 days." |
| `Download` (export có sẵn lúc 14:25) | file CSV | header `Email,"First name","Last name","Country code",Phone,Address,Consent,app,plan_tier,empty_val,keep_key,run_0826,seg_run,qa_l6_attr_x,new_letter`; `Consent` = `subscribed` / `unsubscribed` (203 dòng: 198 / 5). File đã xoá khỏi máy sau khi đọc header |

- i18n: `notYours` "Only the person who ran this export can download it.", `expired`, `failedTitle` "The export stopped", progress "Exported {processed} of {total} contacts", `tooMany`.
- Không bấm `Export` (sẽ tạo export job).

**Detail** (`/contacts/:id`)

| Phần tử | Loại | Action → kết quả |
|---|---|---|
| `Back` · avatar chữ cái đầu · h1 = email · `Contact actions` | header | menu `Contact actions`: `Edit` · `Delete` |
| `Created` / `Updated` | text | — |
| Khối **Email status** | read-only | `Consent` (`Subscribed` / `Unsubscribed`) · `Unsubscribed via` (`Footer link` / `—`) · `Unsubscribed on` · `Deliverability` (`Good`) · `Last delivery event` (vd `Clicked · Oct 1, 2026, 11:22 AM`) |
| Khối **Properties** | read-only | `First name` · `Last name` · `Country` · `Address` · **`SMS`** |
| Khối **Custom fields** | read-only | `key` → value (Boolean hiện `true`), hoặc `—` |
| id không tồn tại | alert | `Not Found.` (API 404), không có nút Back. Cùng kết quả với `/contacts/tags` |

- Contact `Unsubscribed`: menu `Contact actions` không có thao tác resubscribe ([L16](#l16)). `Updated` không đổi khi contact unsubscribe (vd Updated 11:18, Unsubscribed on 11:23) ([L13](#l13)).
- **Chỉ có trong bundle**: `Segment similar users` (`page.contacts.detail.segmentSimilar`), `Contact not found.` (UI hiện `Not Found.` của API).

---

<a id="c-segments"></a>
### 2.4. Segments

| Mục | Nội dung |
|---|---|
| Trạng thái | ✅ list, builder (new / edit), Run, bảng kết quả, menu dòng `Edit` · `Duplicate` · `Export CSV` · `Delete`. 🟡 **không có toggle `Advanced`** trên UI (bundle vẫn có key `Advanced` + class `segment-builder__advanced-toggle`). Không thử Save / Duplicate / Delete (tạo hoặc xoá data) |
| Nguồn xác nhận | staging 01/10 (`MTRO-segments.png`, `MTRO-segments-row-menu.png`, `MTRO-segments-export-csv.png`, `MTRO-segment-edit.png`, `MTRO-segment-operator-text.png`, `MTRO-segment-between-datepicker.png`, `MTRO-segment-new.png`, `MTRO-segment-edit-2cards.png`) · bundle `page.segments.*`, router |
| Route | `/segments`, `/segments/new`, `/segments/:id/edit` |
| Vào từ | Contacts › `Segments` |
| Tag / task QA Hub | `04-contacts`, `Segment`, `UI` (MTRO-008, `todo`, **0 case**) · `04-contacts`, `MTRO-53`, `Segment`, `UI` (MTRO-011, `waiting-for-dev`, 65 case, 8 case có bug) |
| Jira | MTRO-8 › MTRO-53 (Create/edit segment), MTRO-27 (list) |
| Test case | `04-contacts/segment.md` (cập nhật 08/09): lệch [L46](#l46), [L47](#l47) |
| Lệch mở | [L13](#l13) · [L14](#l14) · [L15](#l15) · [L34](#l34) · [L42](#l42) · [L46](#l46) · [L47](#l47) · [L49](#l49) |
| Liên kết | [`business-rules/MTRO.md`](../business-rules/MTRO.md) § "Segments — danh sách (MTRO-27)", § "Segments — builder (MTRO-53)" · [`open-questions/MTRO.md`](../open-questions/MTRO.md) § "Cột Consent trong bảng kết quả segment (R40)", § "Tên segment có unique trong workspace không (R41)", § "Save segment với điều kiện rỗng" |

**List** (`/segments`)

| Phần tử | Loại | Action → kết quả |
|---|---|---|
| h1 `Segments`, "Live audiences built from contact conditions — no lists to maintain." | text | breadcrumb chỉ có `Segments` |
| `Create segment` | button | sang `/segments/new` |
| Bảng: `Name` · `Conditions` (`1 conditions`, `2 conditions`) · `Contacts` (`5 contacts`, `0 contacts`; ô **trống** khi count chưa về hoặc lỗi) · `Created` · menu | table | click dòng mở builder. Không có ô search / filter |
| `Actions for {name}` | menu dòng | `Edit` · `Duplicate` · **`Export CSV`** · `Delete` |
| `Export CSV` | menuitem | mở dialog **Export contacts** ([2.3](#c-contacts)) với `Contacts in a segment` chọn sẵn segment đó; mở rồi Cancel |
| Delete | alertdialog | `Delete "{name}"?` / "This deletes the saved query only — no contacts are affected. This can't be undone." (i18n 01/10; thấy thật 29/09) |
| Phân trang | pagination | 3 trang |

**Builder** (`/segments/new`, `/segments/:id/edit`)

| Phần tử | Loại | Action → kết quả |
|---|---|---|
| Breadcrumb | nav | chỉ hiện `New segment` / `Edit segment`, dù router khai báo parent Contacts › Segments ([L49](#l49)) |
| `Back` | button | về list; còn thay đổi chưa lưu → alertdialog `Leave without saving?` / "You have unsaved changes. They'll be lost if you leave." · `Stay` / `Leave` |
| `Segment name` | field | mặc định `Untitled segment` |
| `~N contacts` + `X.XX% of your contact base` | text | nạp sẵn khi mở segment đã lưu; **không** tự tính lại khi đổi điều kiện (đổi field sang `new_letter` vẫn `~3 contacts`) ([L47](#l47)) |
| `Run` | button | chạy đánh giá, nạp bảng kết quả (không bấm lần này) |
| `Save` | button | **disabled** khi mở segment có sẵn mà chưa sửa; **disabled** ở segment mới khi `Value` còn trống; enable khi nhập `Value`. Xoá hết điều kiện → disabled |
| `Condition field` | combobox | nhóm `Contact details`: Email · First name · Last name · Country code · Address · Phone · Created at. Nhóm `Custom fields` hiện **key thô**: plan_tier · app · seg_run · keep_key · run_0826 · new_letter · empty_val · qa_l6_attr_x |
| `Condition operator` — field text | combobox | `Equal to` · `Not equal to` · `Includes` · `Does not include` · `Starts with` · `Ends with` · `Is empty` · `Is not empty` (mặc định `Equal to`). Không còn `In` ([L46](#l46)) |
| `Condition operator` — field Boolean | combobox | `Is` · `Is not`; giá trị là combobox `Condition value` |
| `Condition operator` — `Created at` | combobox | `After` · `Before` · `Between` · `Is empty` · `Is not empty`; giá trị là nút `Pick a date` mở lịch tháng (dialog `Condition value`, `Previous page` / `Next page`). `Between` = hai nút `Pick a date` nối bằng chữ `And` |
| `Value` | field | field text |
| `Remove condition` | button | xoá dòng; xoá hết thì còn nút `Add filter` |
| `And` (trong card) / `Or` (card mới, nhãn `Or` giữa hai card) | button | thêm dòng / thêm card |
| Bảng kết quả: Email · First name · Last name · Consent · Created at ↕ · Updated at ↕ | table | có phân trang (Page 1…5). Rỗng: `No contacts match` / `Loosen the conditions above.` |

- Segment 2 điều kiện AND (`sonder-0914-and2`) và segment 2 card OR (`2 segment`) mở bằng card editor, **không** còn bị đẩy sang textarea "This query is too complex for the card editor — edit it here as text instead." (chuỗi `parseError` vẫn còn trong bundle).
- Toast (i18n): `Segment created`, `Segment saved`, `Segment duplicated`, `Couldn't duplicate segment`, `Segment deleted`, `Couldn't delete segment`, `Couldn't save segment`, `Segment evaluated` + "{count} contacts match right now."; `Counting…`, `Count unavailable`.

---

<a id="c-fields"></a>
### 2.5. Custom fields

| Mục | Nội dung |
|---|---|
| Trạng thái | ✅ list, dialog New custom field (validation), dialog Delete. Không tạo, không xoá |
| Nguồn xác nhận | staging 01/10 (`MTRO-contacts-fields.png`, `MTRO-contacts-fields-new.png`) · i18n `page.contactFields.*` |
| Route | `/contacts/fields` |
| Vào từ | Contacts › `Custom fields` |
| Tag / task QA Hub | *chưa có task nào mang tag* |
| Jira | MTRO-25 (Create contact attributes), suy từ tên, chưa kiểm |
| Test case | không có file riêng; vài case gián tiếp ở `04-contacts/create-contact.md` § 3.4 |
| Lệch mở | [L09](#l09) · [L32](#l32) · [L48](#l48) |

| Phần tử | Loại | Action → kết quả |
|---|---|---|
| h1 `Custom fields`, "The fields your contacts can carry. Segments, imports and preference pages all read this list." | text | — |
| `New field` | button | mở dialog **New custom field** |
| Bảng: `Field` (key dạng code) · `Type` (`Text` / `Boolean`) · `In use` (`33 contacts`…) | table | **không còn cột `Name`** ([L48](#l48)) |
| `Delete {key}` | button dòng | mở alertdialog Delete |
| Dialog **New custom field**, "Creating it here means segments and preference pages can use it straight away, before any contact has a value." | dialog | — |
| `Field name` | field, placeholder `e.g. app_updates` | hint "Lowercase letters, numbers and _ only, starting with a letter. This is what segments read, and it cannot be changed later." |
| `Type` | select {`Text`, `Number`, `Boolean`, `Date`, `Datetime`}, mặc định `Text` | — |
| `Cancel` / `Create field` / `Close` | button | **không còn ô `Display name`** ([L48](#l48)) |
| Delete field đang dùng | alertdialog | `Delete empty_val?` / "2 contacts still carry this field. Remove it from them first — deleting it now will be refused." · `Cancel` / `Delete` |
| Delete field chưa dùng | alertdialog (i18n) | "No contact carries this field, so nothing is lost. Segments using it will need another field. If a preferences page uses it, remove that choice first — until then the delete is refused." |

**Validation (thấy thật 01/10)**: `Bad Name` → `Use lowercase letters, numbers and _ only, starting with a letter.` + `Create field` disabled. `plan_tier` → `This workspace already has a field with that name.` + disabled. Field name **rỗng** thì `Create field` vẫn **enable** ([L09](#l09)).

**Data 01/10**: plan_tier (Text, 33 contacts) · app (Text, 28) · seg_run (Text, 26) · keep_key (Text, 18) · run_0826 (Text, 12) · **new_letter (Boolean, 8)** · qa_l6_attr_x (Text, 7) · empty_val (Text, 2). **Không còn** `date_install` (Install date) và `ash_inventory_pref` (có ngày 29/09) ([L48](#l48), [L40](#l40)).

- Danh sách field này xuất hiện ở: picker `key` của New contact, nhóm `Custom fields` của segment builder, header CSV của template import và file export (mỗi nơi một thứ tự khác nhau).

---

<a id="c-suppressions"></a>
### 2.6. Suppressions

| Mục | Nội dung |
|---|---|
| Trạng thái | 🟡 chỉ xem được, **không có nút gỡ** trên UI |
| Nguồn xác nhận | staging 01/10 (`MTRO-contacts-suppressions.png`, `MTRO-contacts-suppressions-unsubscribe.png`) · i18n `page.suppressions.*` |
| Route | `/contacts/suppressions`, `?tab=unsubscribe` |
| Vào từ | Contacts › `Suppressions` |
| Tag / task QA Hub | `09-backlog`, `API`, `Bounce/Complaint`, `MTRO-64`, `Suppression` (MTRO-015, `in-progress`) |
| Jira | MTRO-64 Bounce/Complaint › MTRO-74…MTRO-83 (MTRO-81 portal API suppression) |
| Test case | `04-contacts/suppression.md` (chủ yếu API/DB; TC-SUPP-038 là case UI duy nhất) |
| Lệch mở | [L13](#l13) · [L16](#l16) · [L43](#l43) |
| Liên kết | [`business-rules/MTRO.md`](../business-rules/MTRO.md) § "Suppression trong luồng gửi", § "Suppression không tự gỡ khi contact resubscribe", § "API xem và gỡ suppression / unsubscribe" |

| Phần tử | Loại | Action → kết quả |
|---|---|---|
| Subtitle "Addresses this workspace can't email — and why. Every send skips them automatically." | text | — |
| Tab `Bounce & complaint` (14) | tab | mô tả "These addresses are skipped by every campaign and automation." Số trên tab hiện `0` / trống lúc đang tải |
| `Rows per page` | select {10, 20, 25, 50, 100}, mặc định 25 | — |
| Bảng Bounce: `Email` (+ `Copy {email}`) · `Reason` (`Bounced` / `Spam complaint`) · `Blocked since` | table | `Copy {email}` chép email |
| Tab `Unsubscribe` (12; 29/09 là 3) | tab (URL `?tab=unsubscribe`) | mô tả "These people opted out themselves — their choice stands until they resubscribe." |
| Bảng Unsubscribe: `Email` (+ `Copy`) · `Opt-out from` · `Unsubscribed on` | table | 01/10 thấy `Footer link` và `Other` (7 dòng `Other` từ lượt import CSV 14:49). Nguồn khác có thể là `One-click header` / `Added by staff` (29/09, i18n) |

- Empty state (i18n): `Nothing is blocked` / `Nobody has opted out`; `range` "{from}-{to} of {total}".
- Không có nút gỡ / resubscribe ở cả hai tab ([L16](#l16)).

---


## 5. Phát hiện lệch — Contacts, Segments, Custom fields, Suppressions

### 5.1. Còn mở (17 dòng thuộc module)

| # | Loại | Chương | Chi tiết | BR bị ảnh hưởng | Đề xuất | Số cũ |
|---|---|---|---|---|---|---|
| <a id="l09"></a>L09 | Bug? (nhỏ) | [2.5](#c-fields) [2.9](#c-preferences) | Dialog `New custom field` ở `/contacts/fields`: `Create field` **enable khi Field name rỗng** (bản ở Email preferences thì disabled). Kiểm lại 01/10: vẫn vậy. **01/10 (lượt email preferences) — đã so trên UI**: dialog `New custom field` mở từ picker `Custom field` của Email preferences: `Create field` **disabled khi rỗng** (khác `/contacts/fields`), nhưng gõ `Bad Name` (hoa + dấu cách, trái hint "Lowercase letters, numbers and _ only, starting with a letter.") thì **enable ngay, không cảnh báo**; bundle `pe()` chỉ chặn chuỗi rỗng, gửi `{key, type: boolean}` lên BE, lỗi định dạng (nếu BE bắt) hiện qua toast `Could not create the field`. Dialog ở Email preferences không có ô `Type` (luôn Boolean). Không bấm `Create field` để xem BE trả gì | — | báo Dev/UX: thống nhất trạng thái `Create field` giữa 2 dialog; cân nhắc kiểm định dạng key phía client theo đúng hint; case: tên rỗng / sai định dạng / trùng key ở cả 2 nơi | 5D #12 |
| <a id="l12"></a>L12 | Rule cần sửa? | [2.3](#c-contacts) | Rule § "Email là định danh chính, bắt buộc và phải đúng format trước khi submit": dialog New contact **enable `Create contact` với `not-an-email`**, không có lỗi inline khi rời ô. Kiểm lại 01/10: vẫn vậy. Case TC-CONTACT-010 (19/08) ghi HTML5 chặn lúc submit; chưa submit lại nên chưa biết còn đúng không | `business-rules/MTRO.md § "Email là định danh chính, bắt buộc và phải đúng format trước khi submit"` | chạy lại TC-CONTACT-010/011; nếu chỉ HTML5 / BE chặn thì sửa rule cho đúng tầng | 5D #11 |
| <a id="l13"></a>L13 | Rule cần sửa / Hỏi PO | [2.3](#c-contacts) [2.4](#c-segments) [2.6](#c-suppressions) | `business-rules` § "Trang Contacts: … 6 cột" và § "Trạng thái live, Run và bảng kết quả" (4 cột): staging có thêm cột **Consent** (`Subscribed` / `Unsubscribed`) ở Contacts và bảng kết quả segment; detail có khối **Email status** (Consent / Unsubscribed via / Unsubscribed on / Deliverability / Last delivery event). Từ 01/10 Consent còn là một cột của **Import** (đánh dấu unsubscribed, "never subscribes someone who opted out") và **Export** (`subscribed` / `unsubscribed`). `Updated` của contact không đổi khi contact unsubscribe (Updated 11:18, Unsubscribed on 11:23). Open question R40 chưa chốt | `business-rules/MTRO.md § "Trang Contacts: header, search theo email, 6 cột, click dòng mở chi tiết"`; `§ "Trạng thái live, Run và bảng kết quả"` | mở rộng R40 sang Contacts, detail, Import / Export; hỏi BE: giá trị Consent / Deliverability, Updated at có đổi khi consent đổi không; `update-business-rules` sau khi chốt | 5B #11 |
| <a id="l14"></a>L14 | Rule cần sửa / Bug? | [2.4](#c-segments) | Rule § "Advanced chỉ đổi cách hiển thị…" (toggle Advanced, pseudo-SQL): staging 01/10 vẫn **không có toggle Advanced** (bundle vẫn có key `Advanced`, class `segment-builder__advanced-toggle`, `dslPlaceholder`). Khác 29/09: segment 2 điều kiện AND / 2 card OR **không còn** bị đẩy sang textarea "too complex" ([L47](#l47)) | `business-rules/MTRO.md § "Advanced chỉ đổi cách hiển thị, cùng một dữ liệu"` | hỏi Dev: Advanced bỏ hẳn hay còn ẩn; nếu bỏ thì sửa rule; case TC-SEGMENT-052 để `blocked` | 5B #12, 5D #13 |
| <a id="l15"></a>L15 | Bug? (nhỏ) | [2.3](#c-contacts) [2.4](#c-segments) | Số ít/số nhiều: cột Conditions `1 conditions`, cột Contacts `1 contacts` (Segments), subtitle `1 contacts` (Contacts khi search ra 1). i18n `{count} conditions` / `{count} contacts` không có dạng số ít, trong khi `contactFields` và `exportContactsDialog` có `{count} contact \| {count} contacts`. Rule MTRO-27 ghi "xử lý đúng số ít/số nhiều" | `business-rules/MTRO.md § "Bảng Segments: 4 cột có nhãn, empty state, click dòng mở builder"` | báo bug UI (thêm dạng số ít vào i18n) hoặc xác nhận với PO | 5B #14, 5D #13 |
| <a id="l16"></a>L16 | Hỏi PO | [2.3](#c-contacts) [2.6](#c-suppressions) | Suppressions UI **không có nút gỡ** suppression / unsubscribe; detail của contact `Unsubscribed` cũng không có thao tác resubscribe (menu chỉ `Edit` · `Delete`). Rule MTRO-81 chỉ ghi API `DELETE`. Open question "Phân quyền 2 API" đang chờ. Kiểm lại 01/10 | `business-rules/MTRO.md § "API xem và gỡ suppression / unsubscribe"`; `§ "Suppression không tự gỡ khi contact resubscribe"` | hỏi PO: gỡ / resubscribe có UI không, hay chỉ API/admin; ghi vào open-questions | 5B #15, 5D #16 |
| <a id="l32"></a>L32 | Rule chưa có / task chưa có | [2.3](#c-contacts) [2.5](#c-fields) [2.7](#c-library) [2.8](#c-saved-blocks) [2.9](#c-preferences) | Feature mới chưa có business rule / task QA Hub: **Email preferences** (+ khối ở Recipients / Send email), **Saved blocks** (+ `Browse saved blocks`), **Custom fields**, **Import contacts / Export contacts** (01/10, [L42](#l42)), **Import HTML** + bulk Delete + Duplicate + merge tag picker ở Email library, **Automation Reports**, **Campaign report 5 tab**, khối Delivery ở Run history. (Email library đã có task MTRO-021 từ 30/09, 0 case). **01/10 (lượt email preferences)**: Email preferences vẫn 0 task / 0 case / 0 business rule; chỉ MTRO-022 nhắc tới như vùng regression; chương [2.9](#c-preferences) đã đủ để viết case (phạm vi đề xuất ở L71, L74–L76) | — | tạo task QA Hub + `qa-requirement-analysis` khi có ticket (MTRO-17, MTRO-89, MTRO-51, MTRO-16, MTRO-22) | 5D #10 |
| <a id="l34"></a>L34 | Case cần rà | [2.3](#c-contacts) [2.4](#c-segments) [2.10](#c-campaigns) [2.11](#c-automations) | Test case còn dùng UI cũ (hệ thống đã đổi, xem [§ 5.4](#s5-4)): `06-automations/builder.md`, `list.md`, `runtime.md`, `security.md` (**sửa 01/10**: `Update property` → `Update contact field`, `Contact updated` → `Contact field changed`, editor split, `Filter by outcome`, `Last step`, khối Delivery; cú pháp `{{contact.first_name}}` của bộ case **đúng** với staging 01/10, không sửa; danh sách TC từng file ở [L62](#l62)); `04-contacts/create-contact.md` (Phone → `SMS`, chip → combobox `key` + `Kind of value`, thông báo phone mới: chi tiết [L45](#l45)); `04-contacts/segment.md` (nhóm `Custom attributes` → `Custom fields`, tên operator, `In`, `Between`, các bug đã sửa: chi tiết [L46](#l46), [L47](#l47)); `07-campaigns/list.md` (Delivered/Opened `%`); `07-campaigns/wizard.md` (hint Preview & test mới); `07-campaigns/report.md` (5 tab) (**01/10, lượt campaigns**: đã đối chiếu cả 3 file — list.md lệch ít, wizard.md thiếu khối Email preferences + hint, report.md phải viết lại; danh sách TC từng file ở [L70](#l70)) | — | rà và sửa expected ở các file trên + task MTRO-007/010/011/009/012/017/018 | 5D #2, #13, #14, #15, #21 (phần case) |
| <a id="l42"></a>L42 | Hệ thống có, reference / rule chưa có | [2.3](#c-contacts) [2.4](#c-segments) [2.18](#c-missing) | **Import contacts** (`/contacts/import`, 3 bước Upload file → Map columns → Review and import, tối đa 10 MB / 50.000 contact, match theo email, chọn `Leave them as they are` / `Fill in their details from the file`, tạo field mới lúc import, cột Consent một chiều) và **Export contacts** (dialog: `All contacts` / `Contacts in a segment`, file CSV giữ 7 ngày, `Export history`, chỉ người tạo mới tải được) + menu dòng segment **`Export CSV`**. Bản 29/09 ghi ❌ "Contacts không có import/export". Chưa có business rule, task, test case; reference ghi MTRO-22 To Do | — | tạo task QA Hub (tag `04-contacts`, `Import`, `Export`); xin ticket / AC từ Dev rồi chạy `qa-requirement-analysis`; cần bộ file CSV mẫu (trùng email, cột lạ, Consent, > 10 MB) và quyết định có được chạy import thật trên staging không | — |
| <a id="l43"></a>L43 | Bug? | [2.3](#c-contacts) [2.6](#c-suppressions) | Cột `Consent` ở list Contacts **lệch** với detail và tab Unsubscribe. 14:55: `<owner>+test@…` list ghi `Subscribed` (lúc 14:41 ghi `Unsubscribed`), detail ghi `Unsubscribed` (Footer link, 11:23), có trong tab Unsubscribe; `+imp05`, `+imp04`, `+imp01` có trong tab Unsubscribe (`Other`) và màn kết quả import ghi "7 contacts were marked unsubscribed", nhưng list chỉ ghi `Unsubscribed` cho 4 dòng `+imp07…10`; `+check5`, `+analytics03`, `+analytics04` có trong tab Unsubscribe nhưng list ghi `Subscribed`. File export 14:25 có 5 `unsubscribed`, khớp số trong tab lúc đó. Ảnh `MTRO-contacts-list-consent-mismatch.png`, `MTRO-contacts-detail-consent-mismatch.png` | — | báo Dev (list Consent lấy dữ liệu sai dòng / thiếu); viết case so Consent list ↔ detail ↔ tab Unsubscribe ↔ export | — |
| <a id="l44"></a>L44 | Bug? / Hỏi Dev | [2.3](#c-contacts) | `Search contacts...` **không trả về contact `Unsubscribed`**: gõ đủ `<owner>+test@gmail.com` (có trên trang 1, detail mở được) → `No contacts match your search`; contact `Subscribed` cùng dạng `+qco5` thì tìm ra. Nghi search dùng chung `ContactsResource::baseQuery` (có điều kiện loại consent / suppression). Ảnh `MTRO-contacts-search-unsubscribed.png` | `business-rules/MTRO.md § "Trang Contacts: header, search theo email, 6 cột, click dòng mở chi tiết"`; `§ "Segment preview và count tự loại contact bị suppress"` | hỏi Dev: search có cố ý loại contact unsubscribed / suppressed không. Nếu cố ý thì ghi rule và đổi copy empty state; nếu không thì báo bug. Thêm case search contact Unsubscribed / bị suppress | — |
| <a id="l45"></a>L45 | Case cần rà / Hỏi PO | [2.3](#c-contacts) | Dialog New / Edit contact đổi so với case 19/08 và bản 29/09: (a) `Phone` → **`SMS`**: combobox mã quốc gia mặc định **Afghanistan +93** + ô `SMS +93`; thông báo đổi `Enter a valid phone number, such as +84 901 234 567.` → **`Phone is invalid`**; detail cũng ghi `SMS`, nhưng segment builder và CSV import / export vẫn gọi `Phone`. (b) Bỏ chip gợi ý custom field; thay bằng combobox `key` gợi ý kèm kiểu + combobox **`Kind of value`** {Text, Number, Boolean, Date, Datetime}; Boolean dùng combobox `True` / `False`. (c) Key sai (`Bad Key!`) tự chuẩn hoá `bad_key`, không thấy thông báo. (d) Edit: key có sẵn chỉ là nhãn, `Kind of value` disabled, field Boolean hiện ô text `true`; `Save` enable khi chưa đổi gì; phụ đề Edit vẫn "Add a contact to this workspace." | `business-rules/MTRO.md § "Dialog tạo contact phase này chỉ có Email, First name, Last name"` | sửa `04-contacts/create-contact.md` (TC-CONTACT-001, 004, 020–022, 030–037, 040–043) + task MTRO-007/010; hỏi PO: mặc định +93 có chủ ý không, nhãn chuẩn là SMS hay Phone, Edit có được đổi kiểu field không | — |
| <a id="l46"></a>L46 | Case cần rà | [2.4](#c-segments) | Segment builder đổi so với `04-contacts/segment.md` (08/09): operator text đổi tên `Equals`→`Equal to`, `Not equals`→`Not equal to`, `Contains`→`Includes`, `Does not contain`→`Does not include`, `Is set`→`Is not empty`, `Is not set`→`Is empty`; **thêm** `Starts with`, `Ends with`; **bỏ** `In` (ô chip `Add a value and press Enter`). Field Boolean dùng `Is` / `Is not` + combobox giá trị. `Created at`: giá trị là nút `Pick a date` (lịch), `Between` là 2 date picker thay cho 2 chip. Nhóm `Custom fields` hiện key thô (`plan_tier`) thay cho `Plan_tier`; field `Install date` không còn | — | sửa § 1.3 và TC-SEGMENT-010, 011, 012, 013, 014, 015, 016, 017, 019, 036 + task MTRO-011; thêm case Starts with / Ends with / Boolean / date picker | — |
| <a id="l47"></a>L47 | Case cần rà (chạy lại) | [2.4](#c-segments) | Một số bug trong `segment.md` § 4 có vẻ đã sửa (quan sát 01/10, chưa chạy lại case): (a) segment mới có `Value` trống → `Save` **disabled**, nhập value thì enable (TC-SEGMENT-042, bug #5 một phần); (b) mở segment có sẵn chưa sửa → `Save` **disabled** (TC-SEGMENT-043); (c) segment 2 điều kiện AND và 2 card OR mở bằng card editor, không còn textarea (TC-SEGMENT-051, bug #4 phần "khoá trong chế độ text"); (d) bảng kết quả có phân trang. **Vẫn lệch**: bộ đếm `~N contacts` không tự tính lại khi đổi điều kiện (TC-SEGMENT-033). Không thử Delete / Duplicate (bug #1, #2) vì phải xoá / tạo data | `business-rules/MTRO.md § "Trạng thái live, Run và bảng kết quả"` | chạy lại TC-SEGMENT-042, 043, 051, 033, 060, 064 và cập nhật § 4 của `segment.md`; open question "Save segment với điều kiện rỗng" có thể đóng nếu 042 pass | — |
| <a id="l48"></a>L48 | Case cần rà / Data | [2.5](#c-fields) | Trang Custom fields đổi: bỏ cột `Name` và ô `Display name` trong dialog New custom field (29/09 có, hint "Leave blank to generate one from the field name."); Type hiện viết hoa (`Text`, `Boolean`). Data: `date_install` (Install date, datetime) và `ash_inventory_pref` (boolean, tạo 29/09) **không còn**; `new_letter` nay là Boolean, 8 contact. Field datetime cũ biến mất nên chưa thấy field Date / Datetime nào để xem cách hiển thị | — | hỏi Dev: Display name bỏ hẳn chưa (nhãn hiển thị lấy từ key); ai xoá 2 field; tạo lại field Date / Datetime làm fixture nếu cần test | — |
| <a id="l49"></a>L49 | Bug? (nhỏ, chưa kiểm lại) | [2.3](#c-contacts) [2.4](#c-segments) | (a) Search Contacts về chậm (3–8 giây trở lên); trong lúc chờ, bảng và subtitle vẫn hiện kết quả lần gõ trước (gõ `letter` thấy "10 contacts" của lần `Customer`), có lần phải Enter mới cập nhật. Quan sát bằng `fill()` của Playwright, cần đo lại tay. (b) Subtitle hiện "0 contacts" thoáng qua lúc tải trang. (c) Breadcrumb Segments / New segment / Edit segment chỉ hiện mục cuối, dù router khai báo parent Contacts › Segments | — | đo lại search bằng tay + DevTools; báo Dev/UX nếu tái hiện | — |
| <a id="l50"></a>L50 | Môi trường | [2.3](#c-contacts) [§ 4](#s4) | Nhiều người dùng chung tài khoản Owner trên `qa-workspace` cùng lúc: trong 15 phút build có một lượt import 9 contact (14:49), số contact 203 → 212, tab Unsubscribe 5 → 12. Export chỉ người tạo mới tải được (`notYours`), nên dùng chung một tài khoản thì không test được quyền tải export của người khác. Màn `/contacts/import` hiện kết quả lượt import cuối của **cả workspace** | — | chốt quy ước data cho Contacts (prefix theo người, không assert số tuyệt đối, đã có ở case cũ); cần tài khoản thứ hai để test `notYours` | — |

### 5.2. Đã đóng (2 dòng thuộc module)

| # | Số cũ | Nội dung | Ngày đóng | Lý do đóng |
|---|---|---|---|---|
| Đ03 | 5D #13 (phần đổi tên) | Nhóm field segment `Custom attributes` → `Custom fields` | 2026-09-29 | hệ thống hoá vào [2.4](#c-segments); case → L34; `1 conditions` → L15, Advanced → L14 |
| Đ22 | L08 (5D #7) | Field `new_letter` có trong merge tag / menu biến nhưng không có trên trang Custom fields | 2026-10-01 | staging 01/10: `new_letter` hiện trên trang Custom fields (Boolean, 8 contacts), có trong picker `key` của New contact, nhóm Custom fields của segment, CSV template / export ([2.5](#c-fields)). Phần "picker Email preferences liệt kê field text" vẫn ở L10 |

### 5.4. Đã bỏ khỏi hệ thống (2 dòng thuộc module)

| Thứ đã bỏ | Thay bằng (29/09) | Xác nhận | Ghi chú |
|---|---|---|---|
| New contact: chip gợi ý custom field (`Plan_tier`, `Seg_run`…) dưới `Custom fields` | combobox `key` gợi ý kèm kiểu + combobox `Kind of value` | staging 01/10 | [2.3](#c-contacts), L45 |
| Contacts ❌ import/export | `Import contacts` (`/contacts/import`) + dialog `Export contacts` + segment `Export CSV` | staging 01/10 | [2.3](#c-contacts), L42 |
