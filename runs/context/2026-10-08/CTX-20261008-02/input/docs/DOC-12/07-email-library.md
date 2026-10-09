<!-- testlane knowledge KB-377 · kind=feature-profile · tag=Email library · status=draft · sourceUrl=https://github.com/ownego/qa-knowledge-work/blob/ae07d04a61509378493a9a07714b04f4e77a36e6/kb/MTRO/features/07-email-library.md · createdAt=2026-10-08T08:01:08.866Z · updatedAt=2026-10-08T08:01:08.866Z -->

# 7. Email library & Email editor (`/templates`, `/templates/:id`)

**Status:** in-review

Phân tích ngày 2026-10-07 từ: `inventory/MTRO.md` § 2.7 (staging đi thật 01/10/2026; New email / Import HTML / Duplicate / Delete / Save chỉ từ bundle), task QA Hub **MTRO-021** (Not Ready 7/14; BR-01…BR-43 — QA lead Nga chốt 30/09 "nghiệm thu theo staging", 124 case chưa chạy), task **MTRO-018** (BR-30/33 — PO 02/10 chốt cú pháp merge tag), Jira MTRO-15/34/35/36/51/58/86/90/92/99/104/105/111/114/115/119 (đọc 07/10), `business-rules/MTRO.md` (§ "Campaign phụ thuộc Contacts và Templates"; **chưa có rule riêng cho Email library**) và repo `qikify-QA-mailtro` (`03-templates/email-library.md` viết lại 01/10). Quyết định nền: **MTRO-34 nghiệm thu theo hành vi staging, không theo description** (QA lead Nga 30/09, BR-21) — description MTRO-34 là bản prototype (folder, `New template`, Paste HTML).

## Purpose

Thư viện email (template) dùng chung cho campaign và automation: tạo email trống, import HTML (từ Brevo / file), sửa bằng drag-and-drop editor (SDK Templatical), xem trước, nhân bản, xoá. Saved block (khối dùng lại) ở [08-saved-blocks](08-saved-blocks.md).

## Business Rules

### Tên module — đang đổi

- Staging 01/10: sidebar / h1 / breadcrumb là **`Email library`**, nút `New email`, copy dùng chữ "email".
- **Quyết định PO 30/09 (MTRO-99, In Progress)**: đổi "Email library" → **`Templates`** ở sidebar, page title, breadcrumbs; nút chính `New template`; thứ tự sidebar `Contacts → Templates → Campaigns`; màn campaign đổi `Choose email library` / `Create email library` thành `Choose a template` / `Create new template`; sửa cả text của Claude MCP. Route và tên API giữ nguyên; saved blocks và folders không đổi tên. Đảo ngược quyết định 11/08 (MTRO-15: "Templates" → "Email library"). Chưa thấy trên staging 01/10 → `Need confirm` ngày deploy.

### List (`/templates`) — staging 01/10 (BR-23…BR-30, BR-43)

- h1 `Email library`, "All emails from your campaigns and automation flows."; nút `Import HTML` (outline) và `New email`.
- Sort combobox `Updated: Newest first` (mặc định) / `Updated: Oldest first` (không ghi lên URL).
- Bảng: checkbox `Select all emails` · `Name` (link sang editor; badge `Missing subject` khi chưa có subject) · `Created by` (`—` khi không có) · `Updated` (tương đối: "4 hours ago") · `Actions`; nút mắt `Preview {name}` ngoài menu.
- Menu `Actions for {name}`: `Edit` · `Duplicate` · (separator) · `Delete`.
- Chọn checkbox → bulk bar thay chỗ sort: `{count} selected` + `Delete` + `Cancel`. Bulk confirm `Delete {count} email(s)?` / "This can't be undone."; toast `{count} emails deleted`; lỗi `Could not delete the email(s).`
- Phân trang `1-9 of 9`, rows per page **{10, 20, 25, 50, 100}** mặc định 20, combobox `Page n`, `Previous page` / `Next page` disabled ở biên; đổi rows per page → về trang 1.
- Loading 6 dòng skeleton; empty `No emails yet` / "Create your first email to reuse across campaigns." + `Import HTML` / `New email` trong khối empty (nút header ẩn); lỗi tải "Failed to load emails" (bundle).
- **Folder không thuộc MTRO-34** (QA lead 30/09, BR-22; PO 07/08 cho tạm bỏ CRUD folder). Staging không có toggle `All` / `By folder`, không `Add to folder`. **MTRO-115 (To Do, 02/10)** dự định làm lại folder dạng list phẳng: `Create folder`, search `Search emails...`, filter `All` / `Ungrouped` / từng folder, dropdown `Folder` trong Email details.

### New email & Email details — staging (giữ 29/09) + bundle + MTRO-90

- `New email` gọi `POST mail-templates` tên `Untitled email` → **tạo bản ghi ngay**, sang `/templates/<id>` rồi mở dialog Email details (BR-24). Lỗi: `Could not create the email.`
- Dialog lúc tạo: "Give this email a subject line before building its content." · `Email name` (prefill `Untitled email`, hint `For internal use`) · `Subject line *` (`Here's what's new this month`) · `Cancel` / `Add content` (disabled khi Subject trống). `Cancel` về `/templates`.
- MTRO-90 (To Do, spec prototype): khi Subject trống, dialog **blocking** — không đóng được bằng Esc / click ngoài / close; có thêm `Preview text` (optional) — `Need confirm` so với staging (staging không thấy ô Preview text trong dialog; preheader nằm ở tab Settings).
- Dialog sửa (bút chì `Edit email details`): "Change the name or subject line of this email." · `Email name` · `Subject line *` · `Save` (enable ngay khi chưa đổi; Subject trống / chỉ dấu cách hoặc Email name trống → disabled); lỗi `Could not save the email details.` (BR-37).

### Import HTML — staging 01/10 + bundle (BR-31) + MTRO-104 / 114

- File chooser `.html`, `.htm`, `text/html`; `POST mail-templates/import-html` (FormData `name` + `file`); **tên email = tên file bỏ đuôi** (không đọc `<title>`), trim, rỗng → `Untitled email`, cắt 255; xong mở thẳng editor của email mới.
- Toast `Imported “{name}”` hoặc cảnh báo 15 giây `Imported “{name}” — a few things need a look` + "{count} image(s) need(s) replacing in the editor: {alts}." / `Not carried over: {items}.`; lỗi `Could not import the HTML file.`
- **Corrected so với MTRO-34**: không có sheet `Paste HTML` / tên từ `<title>`.
- Sắp tới (MTRO-104, BE xong 06/10, chưa lên staging): ô **Nguồn** `HTML` (mặc định) / `Brevo`; chọn Brevo → map merge tag Brevo sang Mailtro (`{{ contact.FIRSTNAME }}` → `contact.first_name`), mỗi cụm `{% if %}` thành block có điều kiện, tag không chuyển được liệt kê kèm lý do; file giống Brevo mà chọn HTML → 422 + gợi ý "Import theo Brevo?".
- Bug đang mở **MTRO-114** (In Progress, MKT báo trên prod 01–02/10): màu nền content đổi sau khi tạo qua MCP hoặc import HTML — chỉ block cuối còn trắng.

### Duplicate & Delete — bundle 01/10 (BR-32, BR-33)

- `Duplicate` tạo bản sao `Copy of {name}` (cắt 255) bằng GET rồi POST (chép name / subject / design), không đổi trang, list nạp lại; lỗi `Could not duplicate the email.` (Khác campaign: `<tên> (copy)` — xem [glossary](../product/glossary.md).)
- `Delete` → `Delete "{name}"?` / "This can't be undone." · `Cancel` / `Delete`; toast `Deleted "{name}"`.
- Bulk Delete gửi `DELETE` **lần lượt từng id**; lỗi giữa chừng thì dòng đã xoá vẫn mất. Selection **giữ** khi đổi trang / sort / rows per page; `Select all emails` chỉ chọn trang đang xem (BR-35, nghi vấn inventory L53).
- Xoá template đang được campaign Draft / automation dùng **không bị chặn** — automation sau đó run Failed "The mail template this step sends no longer belongs to this workspace." (inventory L60; GAP-04 MTRO-021).

### Preview — staging 01/10 (BR-26, BR-34)

- Dialog h2 = tên email, "Rendered in a sandboxed frame — scripts in the email cannot run."; `Desktop` (720px) / `Mobile` (375px). Iframe `sandbox="allow-same-origin"` (không `allow-scripts`), `referrerpolicy="no-referrer"`.
- Render từ `design_json`; merge tag **không** được thay (hiện `Hi {{contact.first_name}},`). Email canvas rỗng chỉ hiện `No HTML source available` (không có Desktop / Mobile). Lỗi `Could not render this email.`
- Không có `Send test` trong Email library (chỉ có ở Campaign `Preview & test`). MTRO-119 (To Do) đang cân nhắc Send test / link preview / Download HTML để chia sẻ người ngoài — chưa chốt.

### Editor (`/templates/:id`) — staging 01/10 (BR-38…BR-40)

- Header: `Back to email library` · h1 tên · `Edit email details` · "Subject: {subject}" (`(no subject yet)`) · `Save` (disabled khi chưa đổi).
- **Không auto-save**: có thay đổi → `Unsaved changes` + `Discard changes` (confirm `Discard your changes?` / "The email goes back to how it was when you last saved. This cannot be undone.") + `Save`; toast `Email saved`; lỗi `Could not save this email.` `Reload` khi có thay đổi → `Replace your changes with the saved version?` ("…There is no version history to recover it from.").
- `Back to email library` khi có thay đổi → `Leave without saving?` · `Stay` / `Leave`.
- Thanh canvas: `Viewport` `Desktop` / `Mobile` · `Dark Mode Preview` ⇄ `Light Mode Preview` · `Preview Mode` ⇄ `Exit Preview`. Chuỗi `darkModeHint` (dark mode chưa render vào mail gửi) có trong i18n nhưng không dùng.
- Palette `Block palette`: `Browse saved blocks` + 12 block `Section` / `Title` / `Paragraph` / `Image` / `Button` / `Divider` / `Spacer` / `Social` / `Menu` / `Table` / `Video` / `HTML`. Image upload: gif / jpeg / png / webp, tối đa 5 MB (MTRO-86).
- Canvas rỗng: `No blocks yet` / "Start from scratch by dragging blocks from the sidebar"; merge tag trong chữ hiện dạng **chip nhãn**.
- Chọn block → panel `Block properties` (`Duplicate` / `Delete`, Spacing / Background / Display); toolbar block `Drag to reorder…` · `Duplicate block` · `Delete block` · `Save as Block` (chỉ block cấp ngoài cùng).
- Toolbar chữ: Font Family {Default, Arial, Courier New, Georgia, Helvetica, Times New Roman, Trebuchet MS, Verdana}, Font Size {Default, 10–64px}, màu, B / I / U / S, sub / sup, link, list, align, line height, letter spacing, emoji, `Insert merge tag`.
- Tab `Settings`: Width Preset 480 / 600 / 700 / 800px + Custom Width; Background / Text / Link Color; Underline Links; Font Family; `Content language` (BCP 47), `Right-to-left`; **Preheader Text** (≤150 ký tự, hỗ trợ merge tag).
- Tab `Issues` **luôn rỗng** — editor khởi tạo không truyền cấu hình kiểm tra → không bao giờ cảnh báo merge tag sai (BR-40; inventory L02).
- Không có comment, version history, Send test trong editor.
- id không tồn tại / đã xoá → header hiện `Not saved` + `Save` disabled + alert `Not Found.` + `Reload` (nghi lỗi nhỏ, inventory L55).

### Merge tag — PO chốt 02/10

- Cú pháp **hai ngoặc**: `{{contact.email}}`, `{{contact.first_name}}`, `{{contact.last_name}}`, `{{contact.country_code}}`, `{{contact.phone}}` (nhãn `SMS`), `{{contact.address}}`, `{{contact.attr.<key>}}`, `{{unsubscribe_url}}`, `{{preferences_url}}` (PO/BA 02/10, MTRO-018 BR-30; dữ liệu một ngoặc cũ **không migrate**, BR-33). Picker `Insert merge tag`: `Search merge tags`, nhóm `Contact fields` (14) / `System` (`Unsubscribe link`, `Preferences link`), `No matching merge tags`; danh sách từ `GET variable-tags`; autocomplete tắt.
- **Mâu thuẫn**: MTRO-92 §10 (description, QA Review) ghi cú pháp **một ngoặc** `{contact.first_name}` và `{{…}}` bị từ chối khi lưu; inventory 29/09 thấy một ngoặc, 01/10 thấy hai ngoặc. Ưu tiên quyết định PO 02/10 + staging 01/10; MTRO-92 cần sửa.
- MTRO-92 §4 (chưa đối chiếu UI): template có `<script>`, `onclick=`, `javascript:` → không lưu ("The data contains content that is not allowed for security reasons (…)"); link có URL **bắt đầu bằng merge tag** → Send / Test send bị từ chối; merge tag không điền được → Send bị từ chối, liệt kê tag sai; giá trị contact chứa HTML được escape.

### Phụ thuộc chéo

- Campaign cần ≥1 email trong thư viện (rule MTRO-11/8/15, 07/08). Picker template ở Campaign nạp **một lần** `GET mail-templates?per_page=50&sort=updated_at&direction=desc` — chỉ chọn được 50 email sửa gần nhất (BR-41; inventory L56).
- Không có copy-on-write: sửa design trong campaign Draft A đổi mọi Draft dùng cùng `mail_template.id`; campaign Sent đóng băng (chốt 25/08, TC-MTRO-208).

## Edge Cases

- Cancel sau `New email` để lại bản ghi `Untitled email` trong list? — `Need confirm` (GAP-06 Major).
- Xoá template đang được campaign / automation / saved block dùng — `Need confirm` PO chặn hay cảnh báo (GAP-04 Major).
- Quyền theo role (Member xoá template người khác?) — `Need confirm` (GAP-05 Major).
- Luồng Import HTML test sâu ở MTRO-34 hay MTRO-51 (HTML to JSON, description trống) — `Need confirm` (GAP-03 Major).
- Selection giữ qua trang → bulk Delete xoá dòng không thấy trên màn (L53) — `Need confirm` có chủ ý (GAP-16); chưa tái hiện vì staging chỉ 9 email.
- Picker 50 email ở campaign — `Need confirm` giới hạn chủ ý (GAP-18).
- Preview hiện nguyên merge tag — `Need confirm` ý đồ (GAP-08).
- Độ dài + trùng tên `Email name`; số template tối đa; kích thước file HTML import — `Need confirm` (GAP-10, GAP-13).
- Tahoma có ở BE (MCP `font_family`) nhưng thiếu trong picker editor; custom font Outfit / Nunito Sans đã được PO chốt 02/10 (MTRO-111, To Do).
- MTRO-105 (In Progress): border / background / border radius cho section — BE phải nâng renderer cùng phiên bản, nếu không preview có viền mà mail gửi không có.

## Testability Notes

- Bộ case `03-templates/email-library.md` (124 case TC-LIB-101…224, task MTRO-021, chưa chạy; 31 case nguồn bundle). Bộ cũ 70 case (03/09) lệch staging gần hết (inventory L52).
- Data staging 01/10: 9 email, đều do tài khoản Owner chung tạo, không email nào thiếu subject, không có block cấp ngoài cùng → thiếu fixture cho `Missing subject`, `Save as Block`, ≥21 email nhiều trang, email người khác tạo (inventory L54).
- `New email` tạo bản ghi thật ngay — mọi lượt thử để lại data; prefix theo người.
- Gợi ý auto/manual MTRO-15: 30 / 70 (knowledge-work) · 45 / 55 (repo) — editor là phần thị giác nặng nhất; render trên mail client (Gmail / Outlook / Apple Mail) phải manual.

## Known Issues

See [known-issues.md](../known-issues/known-issues.md) for entries tagged `email-library`.

## Related Jira Tickets

- MTRO-15 — Email library/Email builder, Epic — quyết định 11/08 đổi "Templates" → "Email library" (bị MTRO-99 đảo ngược).
- MTRO-34 — Email library, Story, QA Review — spec prototype (folder, New template, Paste HTML); nghiệm thu theo staging.
- MTRO-35 — Create email design from scratch, Story, QA Review — chỉ ghi dùng SDK Templatical.
- MTRO-36 — Duplicate design from existing emails, Story, To Do — trống.
- MTRO-51 — HTML to JSON, Story, QA Review — trống.
- MTRO-58 — [BE] mail template api, Story, QA Review — trống.
- MTRO-86 / MTRO-87 — Image upload in Image component / [BE] Upload image api, QA Review / DONE.
- MTRO-90 — Email details including subject line, Story, To Do — spec dialog blocking (prototype).
- MTRO-92 — [BE] Security, Story, QA Review — §4 kiểm nội dung, §10 merge tag (lệch cú pháp).
- MTRO-99 — Rename Email library to Templates, Story, In Progress — PO 30/09.
- MTRO-104 / 108 — Display condition of blocks / [BE] Blocked condition, In Progress — BE xong 06/10, chưa lên staging.
- MTRO-105 — Section background / border / radius, Story, In Progress.
- MTRO-111 — Custom font support, Story, To Do — Outfit + Nunito Sans (PO 02/10).
- MTRO-113 — Vertical alignment in block section, To Do. MTRO-103 — TOC block, To Do.
- MTRO-114 — Content background colour changes after MCP create or HTML import, **Bug, In Progress (đang mở)**.
- MTRO-115 — Manage email templates with folders, Story, To Do.
- MTRO-119 — Share email templates to outsiders, Story, To Do — chưa chốt option.

## Source

- `inventory/MTRO.md` § 2.7, L02, L51–L56, L60 — staging 01/10/2026.
- QA Hub task MTRO-021 (notes 01/10, 124 case not-run), MTRO-018 (BR-30, BR-33 — PO 02/10), MTRO-009 (TC-MTRO-208) — đọc 2026-10-07.
- Jira MTRO-15, 34, 35, 36, 51, 58, 86, 87, 90, 92, 99, 103, 104, 105, 108, 111, 113, 114, 115, 119 — đọc 2026-10-07.
- `business-rules/MTRO.md` § "Campaign phụ thuộc Contacts và Templates".
- Repo `qikify-QA-mailtro`: `docs/manual-testcases/03-templates/email-library.md`, `docs/qa-sprint-status.md`, `docs/build-staging-feature-overview.md`.
