<!-- testlane knowledge KB-382 · kind=feature-profile · tag=Automation builder · status=draft · sourceUrl=https://github.com/ownego/qa-knowledge-work/blob/ae07d04a61509378493a9a07714b04f4e77a36e6/kb/MTRO/features/12-automations-list-builder.md · createdAt=2026-10-08T08:01:14.532Z · updatedAt=2026-10-08T08:01:14.532Z -->

# 12. Automations — list & builder (`/automations`, `/automations/new`, `/automations/:id`)

**Status:** in-review

Phân tích ngày 2026-10-07 từ: `business-rules/MTRO.md` § "Automations — danh sách (MTRO-32)", § "Automations — builder (MTRO-33)", § "Automations — runtime (MTRO-13)" (rule 11/09 và QA lead Nga chốt 18/09 sau buổi rà case blocked task MTRO-017), `open-questions/MTRO.md` § Automations, `inventory/MTRO.md` § 2.11-A/B + § 3 (staging đi thật 01/10/2026 — Activate / Pause / Duplicate / Delete / Save / kéo-thả chỉ từ bundle hoặc 29/09), task QA Hub **MTRO-018** (Not Ready 7/14; BR-01…BR-36 — PO/BA 02/10 hai lượt, QA lead 05/10; 243 case: 97 pass · 19 fail · 47 blocked), Jira MTRO-13/32/33/85/98/110/112/122 (đọc 07/10) và repo `qikify-QA-mailtro` (bug log automations 03/09, 12 test-run 03/09 → 05/10, `docs/build-staging-feature-overview.md`). **Nhiều tên UI trong rule 18/09 đã đổi trên staging 29/09 và 01/10** — ghi "corrected"; hành vi đã chốt vẫn giữ. Reports, Test, Run history ở [13-automation-reports-run-history](13-automation-reports-run-history.md).

## Purpose

Flow tự động theo sự kiện contact (thay transactional email đang nhờ dev gửi tay — PO 03/07): trigger → các bước Wait / Conditional split → hành động Send email / Update contact field → kết thúc. Xử lý **ngay khi sự kiện xảy ra**, không chạy định kỳ như Brevo (MTRO-13).

## Business Rules

### Trạng thái & list (`/automations`) — rule 11/09, 18/09 + staging 01/10

- Đúng 3 trạng thái `draft` (tạo chưa activate) · `active` (đang chạy) · `paused` (từng active, tạm dừng); **chỉ `active` mới nổ trigger** (rule 11/09). Draft / Paused không chạy, Resume không chạy bù (27/09).
- Header "Trigger-based flows that run automatically as contacts change."; `New automation` → `/automations/new` (không tạo bản ghi tới khi Save).
- `Search automations...` và filter {`All statuses`, `Draft`, `Active`, `Paused`} lọc phía server, không ghi lên URL.
- Bảng: `Automation` · `Status` · `Last run` · `Last edited` · cột hành động — **Last run đứng trước Last edited** (staging 01/10). Cột `Automation` chỉ hiện **tên**, description không hiện dòng phụ (chỉ ở header builder); `Last edited` đổi **mỗi lần Activate / Pause** kể cả khi flow không đổi (rule 18/09). `Last run` tương đối hoặc `Not recently run`.
- Nút nhanh: Active `Pause {name}`; Paused `Activate {name}`. Menu Active: `Edit` · `Duplicate` · `View runs` · `Pause` · **`Delete (pause first)` (disabled)**; Paused: `Edit` · `Duplicate` · `View runs` · `Activate` · `Delete`.
- Delete luôn qua dialog xác nhận (rule 11/09): `Delete "{name}"?` / "The flow and its steps are removed. This can't be undone." Activate: `Activate "{name}"?` / "This automation goes live immediately. Contacts that match its trigger start entering — and receiving whatever it sends — within seconds." Pause: `Pause "{name}"?` / "New contacts stop entering this flow. Anyone already inside — including a contact waiting on a delay — still finishes it. You can activate it again at any time." (29/09; i18n 01/10 không đổi).
- Duplicate: copy sâu, node id mới (03/09). Empty: "No automations yet" / "Build a flow once and it runs for every contact that matches its trigger."; lọc rỗng `No automations match your filters` / "Try a different search or status." 25 dòng / trang.
- Toast: `Automation created` · `Automation saved` · `Automation duplicated` · `Couldn't duplicate automation` · `Automation deleted` · `Automation activated` · `Automation paused` · `Couldn't change status`.
- **Corrected so với MTRO-32**: ticket ghi nút "Resume"; staging dùng `Activate` cho Paused.

### Builder — khung & lưu (rule 18/09 + staging 01/10)

- Click node → panel phải là form node; click canvas trống → panel về `Steps & actions` ("Click the + on any connector to add one to the flow.") (rule 11/09). Node vừa chèn hiện `Not configured yet`, panel **giữ** `Steps & actions` (không tự chọn node mới) — MTRO-112 (To Do) sẽ đổi sang tự chuyển panel.
- Mọi connector có nút `Add step or action` → menu **Steps**: `Wait / delay` · `Conditional split`; **Actions**: `Send email` · `Update contact field`. Cả 4 enable (Wait enable từ MTRO-85). Node chèn đúng connector, chuỗi nối lại (rule 18/09).
- Kéo thả: chỉ Wait, Send email, Update contact field kéo được; Trigger, Conditional split, Exit không; không thả vào connector downstream của chính nó (rule 11/09; xác nhận 27/09).
- Kebab `Actions for {name}` (`Duplicate` · `Delete`) chỉ ở node step; Trigger và Exit không có. Xoá split có step ở 2 nhánh → dialog `Delete this condition?` / "The {branch} branch and every step inside it are deleted with it. This can't be undone." (giữ nhánh False); split 1 nhánh rỗng → không dialog (27/09; BUG-50 đã sửa).
- **`Save` là cửa chặn duy nhất**: `Save` + `Activate` disabled khi thiếu trigger, thiếu step, hoặc còn step `Not configured`; hint header 3 nấc `Choose a trigger · Add at least one step` → `Add at least one step` → `Some steps are missing their settings` (không nêu tên node). Dialog **Edit automation** ("Update the name and description shown at the top of this automation.": `Automation name` ≤255, `Description`) chặn tên rỗng / toàn khoảng trắng. Hệ quả: **không tồn tại** flow đã lưu mà chưa đủ điều kiện Activate (rule 18/09) — ngoại lệ: template của Send email bị xoá sau đó (inventory L60).
- `/automations/new` header chỉ có `Save` + `Activate`; sau lần Save đầu (`POST` 201, URL đổi sang id) mới có `View runs`, `Test`, badge `Draft`, rail `Flow` / `Reports` (rule 18/09; 12/09).
- **Sửa flow Active rồi Save → `PUT` 200 ngay, không cảnh báo, không draft / version, badge vẫn `Active`, áp dụng luôn** (rule 18/09). Mailtro không có mô hình draft / publish cho automation.
- Rời trang khi có thay đổi → `Leave without saving?` / "You have unsaved changes. They'll be lost if you leave." (`Stay` / `Leave`). Dirty-check theo nội dung (03/09).
- Giới hạn (i18n / test-run 27/09): tối đa **20 step** ("A flow can hold at most 20 steps"), tối đa **10 Send email** ("A flow can send at most 10 emails"), độ sâu nhánh `tooDeep`, `Two steps share an id`, "Something is wrong with this flow's structure — reload the page".
- id không tồn tại → vẫn dựng khung builder + alert `Not Found.` (BUG-56).

### Trigger — **corrected 01/10** (rule 18/09 ghi `Contact created` / `Contact updated`)

- Panel Trigger: nhóm `Contacts`, radio **`Contact created`** / **`Contact field changed`**; badge `Not configured` / `Configured`. Đã chọn → tên trigger + `Change trigger` + mô tả `Starts once, when a new contact is created.` / `Starts every time a contact field you pick changes.` (staging 01/10; inventory L58).
- `Contact field changed` có ô **`Which fields?`** (`Search fields, or leave empty for any field`; First name · Last name · Country code · Address · SMS + custom key thô) — **phải chọn từ dropdown**, không nhập tự do (PO 02/10, BR-31); để trống = mọi field. Hint "…To act on only one, add a condition on Changed fields…" là **copy sai** — **không có** biến / điều kiện "Changed fields" (PO 02/10, BR-34). (Staging 01/10 vẫn thấy nhóm `What changed` › `Changed fields` trong menu biến khi dùng trigger này — mâu thuẫn, xem Edge Cases.)
- Nhãn node: chưa cấu hình `Click to configure →` (rule 18/09 — bản dựng thắng câu "Choose trigger" của AC §5); đã cấu hình `This flow starts when a new contact is created` / `This flow starts every time a contact field changes`.
- Step `Update contact field` của automation **cũng phát event contact-updated**, nên flow khác có trigger thay đổi field chạy được vì automation ghi attribute (rule 18/09). Event do **chính flow** phát ra bị chặn ("…would have looped", run Skipped — 27/09).
- **Re-entry once**: sửa cùng một contact nhiều lần không tạo thêm run cho cùng flow (rule 18/09) — **staging 27/09 trái rule**: 3 lần sửa → 3 run (TC-MTRO-1116). Payload có `re_entry {mode, cooldown_days}` (`once` / `can_reenter` / cooldown sàn 60s) nhưng không có UI.
- Contact tạo qua **import CSV không kích hoạt** automation, kể cả khi import ghi đè field (QA lead 05/10, KB-003, BR-35).
- MTRO-122 (To Do, 07/10): trigger mới "Contact joins segment".

### Wait / delay — staging 01/10 + MTRO-85

- `Duration` (spinbutton) + `Unit` {`minutes`, `hours`, `days`}; helper `Enter a whole number from 1 to {max} {unit}.` (days: 365 — tối đa 1 năm); node `3 days`.
- Duration `0` → helper + hint header `A wait must be a whole number from 1 up to a year`, Save disabled, nhưng badge vẫn `Configured`, node `0 days` (inventory L61).
- Step sau Wait chạy trễ 20–60 giây so với mốc; flow không có Wait chạy ngay (< ~19 s) (27/09).

### Conditional split — **corrected 01/10** (rule 18/09 ghi `Add filter`, prefill Email/Equals, `And` / `Or`, Between tag-input)

- Mô tả: "Checked once, when the contact reaches this step. It doesn't watch for changes. Contacts matching this condition go down the True branch, everyone else goes down False."
- Mỗi dòng: `Choose a variable` (không prefill) · `Operator` (disabled `Choose a variable first`) · `Value` + `Compare against a literal or a variable` · `Remove this condition`; nút `Add condition`; từ 2 dòng có combobox `Match` {`all of these`, `any of these}` (inventory L57).
- Operator text: `Equal to` · `Not equal to` · `Includes` · `Does not include` · `Starts with` · `Ends with` · `Is empty` · `Is not empty`; ngày (`Created at`): `After` (mặc định) · `Before` · `Between` · `Is empty` · `Is not empty`, value là `Pick a date`. Cùng ngữ nghĩa operator với segment (chốt 02/10) — xem [04-segments](04-segments.md).
- Menu biến split: nhóm `Contact` — Email address · First name · Last name · Country code · SMS · Address · **Created at** + custom key thô.
- Luôn **2 nhánh True / False** (badge True = emerald, False = rose) — rule 18/09. Chưa có trigger: "Choose a trigger first — which fields a split can compare depends on what starts the flow."
- Hint "A split needs at least one step under True or False" — **open question R39** (chưa rõ là rule chính thức).

### Send email — rule 18/09 + staging 01/10 + PO 02/10

- `Content` + nút `Choose an email` (dialog lưới template, **không search, không phân trang**; đã chọn thì nút hiện tên template) · `Subject line *` · `Preview text` · `From name` (3 ô có `Add variable`) · `From email *` ("Must be on one of your workspace's verified sending domains." + `Manage domains`) · `Reply-to` · `Email preferences page` (`None — people can only unsubscribe from everything`; helper "The page this email’s {{preferences_url}} link opens.").
- `From name` / `From email` là ô text tự nhập, rỗng, không prefill default sender (rule 18/09 — AC §7 dropdown là bản cũ).
- **Configured = template + Subject + From email**; From email thuộc domain chưa verify **vẫn tính Configured** (rule 18/09). Node chỉ hiện tên template + subject sau khi Configured.
- **From email ngoài domain verified (kể cả workspace chưa có domain) vẫn gửi được qua shared sending host**, không chặn ở Save / Activate / runtime (PO/BA 02/10, BR-27) → BUG-51 phần gửi không còn là bug. Helper "Must be on one of your workspace's verified sending domains." lệch quyết định này.
- From email / Reply-to sai định dạng: không báo inline, Save → `PUT` 422 chỉ toast (TC-MTRO-1044, 1046 fail 27/09).
- Menu biến (`Add variable`, "Insert a variable into this field"): nhóm `Contact` — Email address · First name · Last name · Country code · SMS · Address + custom key thô; **không có `Created at`** (split thì có — `conditionOnlyVariable`; inventory L10).
- MTRO-110 (To Do): subject line / preview text của template tự đồng bộ vào node Send email.

### Update contact field — **corrected tên** (rule 18/09: `Update property` / `Attribute`)

- Tên đổi 2 lần: `Update property` (18/09) → `Update custom field` (29/09) → **`Update contact field`** (01/10; palette "Set a contact field"). Ô `Contact field` (`Choose a contact field`): First name · Last name · Country code · Address · SMS + custom key thô — **không có** Email, Created at (inventory L01).
- `New value` (`e.g. vip`) + `Add variable`; chọn `SMS` → ô số điện thoại (mặc định Afghanistan +93) + `Use a variable` / `Type a number`. Chưa có trigger: "Choose a trigger first. Which contact fields you can pick depends on what starts the flow."
- Configured = đủ field + New value (rule 18/09). **`New value` không validate theo kiểu field** (phone sai, Boolean ngoài true/false vẫn nhận), step vẫn Configured (PO/BA 02/10, BR-32) — lệch chốt Contacts (Boolean chỉ true/false).
- Rule 18/09 "giá trị toàn khoảng trắng lưu nguyên, badge Configured" — **staging 27/09 trái**: sau Save + reload thành trống, badge `Not configured` (TC-MTRO-1052).
- Node `{field} = {value}` (vd `first_name = {{contact.last_name}} {{contact.attr.app}}`).

### Cú pháp biến — PO chốt 02/10

- **Hai ngoặc** `{{contact.<field>}}` (BR-30). `Add variable` chèn tại con trỏ. Tag hai ngoặc thiếu ngoặc → dưới ô "This field has a tag that can't be read. Write variables as a name in double braces, or insert one from the menu." + header `A step has a tag that can't be read — write variables as a name in double braces`, Save / Activate disabled. Biến trigger không cung cấp → `"{{contact.nope_field}}" isn't available with this trigger. Replace this variable.` Một ngoặc `{x}` coi là chữ thường, không cảnh báo (staging 01/10).
- Email / automation đã lưu bằng một ngoặc (giai đoạn 29/09) **không migrate**, người dùng tự sửa (BR-33).
- **Corrected**: rule 18/09 còn ví dụ "Merge tag `{{email}}` lưu nguyên văn, không hint" — sai từ 01/10.

## Edge Cases

- Re-entry once không giữ (3 lần sửa → 3 run; contact đang Waiting khớp trigger lần nữa vẫn tạo run) — trái rule 18/09 (TC-MTRO-1116, 1107, 27/09) — `Need confirm` Dev; quan hệ với `Which fields?` chưa rõ (GAP-20 Major).
- Sửa flow Active **không** áp cho contact đang Waiting (chạy theo cấu hình lúc vào flow) — trái rule 18/09 "áp dụng luôn" (TC-MTRO-1125) — `Need confirm` PO.
- Hint "Changed fields" (PO 02/10: không tồn tại) vs staging 01/10 có nhóm `What changed` › `Changed fields` trong menu biến; 27/09 điều kiện Changed fields khớp theo key `first_name` không theo nhãn — `Need confirm` Dev.
- Split rỗng có bắt buộc step dưới True / False (R39) — `Need confirm` PO.
- Template của Send email bị xoá: builder không báo, node hiện id thô, badge vẫn Configured, `Activate` bấm được; run Failed lúc chạy (inventory L60; GAP-09 Major) — `Need confirm` PO chặn xoá hay đánh dấu step.
- Custom field đang dùng ở Update contact field bị xoá vẫn không chặn (06/10) — xem [05-custom-fields](05-custom-fields.md).
- Engine ghi giá trị sai kiểu vào contact (do BR-32) thì sao — `Need confirm` (GAP-38 Major).
- Vòng lặp 2 flow ghi field của nhau — `Need confirm` cơ chế cắt (GAP-05 Major).
- Quyền Member / custom role với automation — `Need confirm` (GAP-07 Major).
- `Activate` ở builder **không hỏi xác nhận** (list thì có) — BUG-53, 27/09.
- Duplicate automation tên 255 ký tự → `POST …/duplicate` 500 (TC-MTRO-989). Search 300 ký tự → 422, bảng thay bằng alert thô, mất ô search / filter (TC-MTRO-970).
- List không sắp theo `Last edited` (request không gửi sort) — BUG-52.
- Nhãn Wait không có số ít (`1 days`, `1 minutes`); Duration rỗng / chữ không có inline message (TC-MTRO-1086, 1091).
- Panel phải (~450px) che node / kebab ở 1280×800 (inventory L06); builder 375px không thao tác được (BUG-55); 3 nút zoom thiếu accessible name (BUG-57).
- Dialog Edit automation với description ~5.000 ký tự không cuộn (TC-MTRO-1012).
- `Add variable` 27/09 còn chèn một ngoặc (TC-MTRO-1042) — staging 01/10 đã chèn hai ngoặc → **cần chạy lại**.

## Testability Notes

- Workspace dùng chung có 2 automation **Active** gửi mail thật (`Welcome`; `Chuỗi 2 email sau 3 ngày…` ~22 run Waiting) — không Activate flow có Send email trừ khi được phép; flow thử chỉ dùng `Update contact field`; Pause flow thử nghiệm khi xong (inventory L65).
- Activate bị bộ lọc quyền của harness sub-agent chặn → nhiều case runtime blocked; runtime Wait theo thời gian thực vượt ngân sách lượt.
- Thiếu workspace B không chung member, Admin / Member thật → 9 + 8 case isolation / RBAC blocked.
- Viewport tối thiểu 1680×900 để click được node khi panel mở.
- Bộ case: `06-automations/list.md` (46), `builder.md` (124), `runtime.md` (39), `security.md` (34) — task MTRO-018; ~170 case sửa Expected 02/10 cần chạy lại. Gợi ý auto/manual MTRO-13: 65/35 (knowledge-work) · 80/20 (repo).

## Known Issues

See [known-issues.md](../known-issues/known-issues.md) for entries tagged `automations`.

## Related Jira Tickets

- MTRO-13 — Automations, Epic — event-driven thay chạy định kỳ (PO 03/07).
- MTRO-32 — View automation list, Story, QA Review — 3 status, Pause / Resume, Duplicate, Delete confirm.
- MTRO-33 — Automation builder base flow, Story, QA Review — AC §1–§8 (nhiều mục bị bản dựng thay).
- MTRO-85 — Wait/delay step, Story, QA Review — description trống.
- MTRO-98 — MCP for automations, Story, QA Review — trống.
- MTRO-110 — Sync subject line / preview text từ template vào node Send email, Story, To Do.
- MTRO-112 — Switch view panel settings after adding new node, Story, To Do.
- MTRO-122 — Trigger: Contact joins segment, Story, To Do.

## Source

- `business-rules/MTRO.md` § Automations (11/09, 18/09/2026); `open-questions/MTRO.md` § Automations (R39).
- `inventory/MTRO.md` § 2.11-A/B, § 3, L01, L06, L10, L51, L57–L63, L65 — staging 01/10/2026.
- QA Hub task MTRO-018 (notes 05/10; 243 case) — đọc 2026-10-07; knowledge KB-003, KB-004.
- Jira MTRO-13, 32, 33, 85, 98, 110, 112, 122 — đọc 2026-10-07.
- Repo `qikify-QA-mailtro`: `docs/bugs/06-automations/2026-09-03-automations-bug-log.md`; test-run `06-automations/*` (03/09 → 05/10); `docs/manual-testcases/06-automations/*.md`; `docs/build-staging-feature-overview.md`.
