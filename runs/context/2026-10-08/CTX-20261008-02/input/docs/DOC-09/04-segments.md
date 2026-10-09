<!-- testlane knowledge KB-374 · kind=feature-profile · tag=Segment · status=draft · sourceUrl=https://github.com/ownego/qa-knowledge-work/blob/ae07d04a61509378493a9a07714b04f4e77a36e6/kb/MTRO/features/04-segments.md · createdAt=2026-10-08T08:01:04.338Z · updatedAt=2026-10-08T08:01:04.338Z -->

# 4. Segments (list · New segment / Edit segment builder)

**Status:** in-review

Phân tích ngày 2026-10-07 từ: `business-rules/MTRO.md` § "Segments — danh sách (MTRO-27)", § "Segments — builder (MTRO-53)", § "Segment preview và count tự loại contact bị suppress" (rule 07/09–15/09/2026), `open-questions/MTRO.md` § Segments, `inventory/MTRO.md` § 2.4 (staging đi thật 01/10/2026, role Owner), task QA Hub **MTRO-011** (Partially Ready 11/14; BR-01…BR-27 — PO/BA và Dev trả lời 02/10), Jira MTRO-27/53/100/120 (đọc 07/10) và repo `qikify-QA-mailtro` (bug log segment 20/08 → 08/09, test-run 14/09, retest Slack 06/10, custom-field run 06/10).

## Purpose

Segment là **tập contact động** (live audience) xác định bằng điều kiện trên field chuẩn và custom field. Campaign gửi tới đúng 1 segment; Export contacts có thể xuất theo segment. Không có "list" tĩnh trong Mailtro (`/lists` trắng).

## Business Rules

### Nguyên tắc chung — đã xác nhận

- Số contact của segment là **đánh giá live**, không phải snapshot; membership tự cập nhật khi attribute contact đổi (rule 15/09, MTRO-27). Contact mới thoả điều kiện tự tăng count (08/09).
- Segment (count + bảng kết quả + preview) **chỉ gồm contact Subscribed**: loại contact Unsubscribed và contact bị suppress (PO/BA 02/10, BR-12 MTRO-011; rule MTRO-78 07/09 — `ContactsResource::baseQuery` có `whereNotExists` thứ hai). Hệ quả: cột Consent của bảng kết quả luôn `Subscribed`. Vì nằm ở `baseQuery`, mọi màn dùng query này đều bị ảnh hưởng (search Contacts — xem [03-contacts](03-contacts.md)).
- `estimated recipients` ở bước Recipients của campaign = cột Contacts của segment (08/09).
- Tên segment **không unique** trong workspace (PO/BA 02/10, BR-14).
- Segment đang được campaign dùng **vẫn xoá được**; campaign hiện thông báo segment đã bị xoá (PO/BA 02/10, BR-15; report: "Segment deleted since this send.").
- **Member không được tạo / sửa segment** (MTRO-100, PO chốt 30/09): chặn + tooltip ngay ở nút `Create segment`, Member không vào được builder; toast mới "Only workspace Owners and Admins can create segments. Ask an Admin to create it for you." (Dev đề xuất "…create or edit segments…"). Ticket In Progress — chưa thấy trên staging (staging hiện toast `Couldn't save segment — This action is unauthorized.`). API key scope `segments:write` khớp ý này.

### List (`/segments`) — staging 01/10

- h1 `Segments`, "Live audiences built from contact conditions — no lists to maintain."; `Create segment` → `/segments/new`; breadcrumb chỉ `Segments`; không có search / filter.
- Bảng: `Name` · `Conditions` (`1 conditions`, `2 conditions`) · `Contacts` (`5 contacts`; ô **trống / `—`** khi count chưa về hoặc lỗi) · `Created` (ngày giờ tuyệt đối) · menu. Click dòng / Enter → builder chế độ edit.
- Giữ dạng `1 conditions` / `1 contacts` — **PO/BA 02/10 chốt không sửa số ít** (BR-17). Rule 15/09 "xử lý đúng số ít/số nhiều" coi như **corrected**.
- Menu `Actions for {name}`: `Edit` · `Duplicate` · **`Export CSV`** · `Delete`. Export CSV mở dialog Export contacts chọn sẵn `Contacts in a segment` (PO/BA 02/10 BR-13: test trong task Segments, file giống export contact).
- **Duplicate**: clone cây điều kiện sang segment id mới, tên thêm " (copy)", toast `Segment duplicated` (rule 15/09). BUG-CS-02 (422 im lặng) đã sửa 14/09.
- **Delete**: `Delete "{segment name}"?` / "This deletes the saved query only — no contacts are affected. This can't be undone." · `Cancel` / `Delete` → toast `Segment deleted`; contact không bị đụng (rule 15/09). Thực tế: nút Delete **không gửi request** (BUG-CS-01 / QA Hub BUG-94, P0, tái hiện lần 4 ngày 14/09).
- Phân trang (staging 01/10: 3 trang ~75 segment).

### Builder (`/segments/new`, `/segments/:id/edit`) — rule 15/09 + staging 01/10 + PO/Dev 02/10

- Create → builder có sẵn **1 dòng điều kiện trống**, tên mặc định `Untitled segment` (ô `Segment name` sửa inline); Edit → load cây điều kiện, tên, sort; lưu segment có sẵn = `PUT /segments/{id}` (BE chốt 08/09).
- Cấu trúc: mỗi card là nhóm điều kiện; trong card nối **AND**, giữa card nối **OR** (nhãn `Or`); `And` thêm dòng vào card, `Or` thêm card; xoá điều kiện cuối thì card tự mất; xoá hết → còn nút `Add filter`. Ưu tiên AND > OR (`A AND B OR C` = `(A AND B) OR C`, 08/09).
- `Condition field`: nhóm `Contact details` (Email · First name · Last name · Country code · Address · Phone · Created at) + nhóm `Custom fields` hiện **key thô** (`plan_tier`) — key thô là thiết kế cuối (PO/BA 02/10, BR-19). Nhãn `Phone` ở đây **lệch KB-004** (phải là `SMS`) — TC-MTRO-289 fail 05/10.
- `Condition operator`:
  - Text: `Equal to` · `Not equal to` · `Includes` · `Does not include` · `Starts with` · `Ends with` · `Is empty` · `Is not empty` (mặc định `Equal to`; không còn `In`) — staging 01/10.
  - Number: `Equal to`, `Greater than`, `Less than`, `Between` (2 ô số), `Is empty`, `Is not empty` (Dev 02/10, BR-21).
  - Date / Datetime (`Created at`): `After` (mặc định) · `Before` · `Between` · `Is empty` · `Is not empty`; giá trị là nút `Pick a date` (chỉ chọn ngày), `Between` = 2 picker nối bằng `And`; giá trị tương đối `-7 days` hiện ô text (BR-21).
  - Boolean: `Is` / `Is not` + combobox `Condition value`; `Is not` khớp cả contact chưa có giá trị (BR-23).
- So khớp (Dev 02/10, BR-22): `Includes` / `Starts with` / `Ends with` = ilike, **không** phân biệt hoa thường; `Equal to` / `Is any of` phân biệt hoa thường **trừ** `email`, `country_code`; `%`, `_` được escape; `Is empty` khớp null, `""` và thiếu key.
- Ngày tính theo **UTC** (list hiện giờ VN); `After` / `Before` không gồm ngày biên; `Between` gồm cả hai; Between đảo thứ tự → 0 kết quả, không báo lỗi (Dev 02/10, BR-24).
- Toolbar: chấm xanh + `~N contacts` + `X.XX% of your contact base`; **bộ đếm chỉ cập nhật khi bấm `Run`**, đổi điều kiện không tự tính lại (PO/BA 02/10 — hỏi lại lần 2, BR-27). **Corrected**: rule 15/09 (MTRO-53) ghi "tính lại khi điều kiện đổi".
- `Run` chạy đánh giá, toast `Segment evaluated` + "{count} contacts match right now."; bảng kết quả `Email` · `First name` · `Last name` · `Consent` · `Created at` ↕ · `Updated at` ↕, có phân trang; rỗng `No contacts match` / `Loosen the conditions above.` (**corrected**: rule ghi 4 cột và "No contacts match.").
- `Save` enable khi tên không rỗng **và** ≥1 điều kiện **và** có thay đổi so với lúc load; **Save disabled khi Value điều kiện còn trống là rule chính thức** (PO/BA 02/10, BR-16) — đóng open question "Save segment với điều kiện rỗng". Segment có sẵn chưa sửa → Save disabled (staging 01/10).
- `Back` khi còn thay đổi → `Leave without saving?` / "You have unsaved changes. They'll be lost if you leave." · `Stay` / `Leave` (+ `beforeunload` chỉ khi có thay đổi, 08/09).
- Toggle **Advanced** (pseudo-SQL) **chỉ ẩn tạm** (`display: none`, commit d165e6c2); khi builder không đọc được query thì tự chuyển Advanced, không có nút quay lại (Dev 02/10, BR-20). Rule 15/09 "Advanced chỉ đổi cách hiển thị" chưa test được.
- Khối "Refine your segment" **ngoài phạm vi MTRO-53** (PO/BA 02/10, BR-18).
- Breadcrumb đúng phải là Contacts › Segments; hiện chỉ hiện mục cuối — **lỗi đã biết, chưa sửa** (Dev 02/10, BR-26).
- Toast khác: `Segment created`, `Segment saved`, `Couldn't save segment` (+ message server — BUG-CS-12 sửa 08/09), `Couldn't duplicate segment`, `Couldn't delete segment`, `Counting…`, `Count unavailable`.

### Segment hỏng và campaign — Dev 02/10 (BR-25)

- Campaign trỏ segment có count lỗi: lúc Send BE chạy lại query; lỗi → rollback, campaign giữ Draft, sheet `Couldn't start this send`; FE không chặn Send, chỉ hiện `—`. Ngoại lệ: count 500 do lỗi tạm thời → vẫn gửi. Tái hiện 500: field Number chứa giá trị chữ + `Greater than` / `Less than` / `Between` (cast `::numeric`). Đóng open question R42.

## Edge Cases

- Điều kiện **Boolean** luôn 422 `Expected a value, got 'true'.` (builder sinh `attr:x = true` không ngoặc kép, `src/services/segment-query.ts:39`) nhưng toast vẫn báo thành công — Dev 02/10 nghi bug (BR-23), **tái hiện 06/10** (TC-MTRO-1535, retest Slack #5 REOPENED).
- Đổi field Text → Boolean: operator vẫn hiện `Equal to` (list chỉ Is / Is not) — REOPENED một phần 06/10. Đổi operator xoá trắng value đã chọn (BUG-CS-13, 14/09 + 06/10).
- Save khi Value trống tạo segment rác `Untitled segment` (BUG-CS-11 / BUG-97, fail lần 4 ngày 14/09); staging 01/10 quan sát Save đã disabled — **cần chạy lại** TC-SEGMENT-042 để đóng.
- Segment `Is set` (`IS NOT NULL`) hoặc value chứa ` OR ` mở lại không đọc được bằng card editor (BUG-CS-03 / BUG-113, thu hẹp 14/09); 2 điều kiện AND / 2 card OR đã mở bằng card editor 01/10.
- Ký tự `"` trong value bị xoá khi serialize (`Say "hi"` → `Say hi`) (BUG-CS-05, 14/09).
- Query hỏng → `GET /segments/{id}/count` 422/500, ô Contacts chỉ `—`, không báo lỗi (BUG-CS-15 / BUG-68, 14/09).
- Tên 255 ký tự không truncate → bảng 2415px, trang cuộn ngang; ô tên không có `maxlength` (BE chặn >255) (BUG-CS-17 / BUG-70).
- Segment trùng tên không phân biệt được ở picker Recipients / `Segment to export` → rủi ro gửi nhầm tập (BUG-CS-16 / BUG-69) — tên không unique đã chốt (BR-14), còn `Need confirm` PO picker hiện thêm gì để phân biệt (GAP-19).
- Role nào được tạo / sửa / xoá / duplicate / export segment — `Need confirm` (GAP-07 Major); MTRO-100 mới chốt Member không create/edit.
- Campaign Scheduled trỏ segment đã xoá → làm gì, nội dung thông báo — `Need confirm` (GAP-20).
- Advanced bỏ hẳn hay bật lại — `Need confirm` PO (GAP-01).
- Xoá custom field đang dùng ở segment **không bị chặn** → segment báo "Unknown field", preview 422 (06/10, trái MTRO-022 BR-19) — xem [05-custom-fields](05-custom-fields.md).
- MTRO-120 (To Do): lọc recipient theo engagement (opened / clicked trong N ngày) — chưa chốt làm ở segment builder hay ở bước Recipients.

## Testability Notes

- Bộ case `02-contacts/segment.md` (90 case, task MTRO-011: 24 pass · 3 fail · 5 blocked · 3 skipped · 55 not-run); ~10 case fail giả vì UI đổi tên operator 01/10 (RISK-01).
- Bảng kết quả cập nhật trễ 8–20 giây sau toast; toast tắt nhanh — sub-agent phải poll `[aria-label*="Notifications"]` ~100 ms.
- Thiếu fixture field Number / Date / Datetime (field `date_install` đã bị xoá) (inventory L48).
- Không thử Delete / Duplicate trên segment của người khác — workspace dùng chung; prefix theo người.

## Known Issues

See [known-issues.md](../known-issues/known-issues.md) for entries tagged `segments`.

## Related Jira Tickets

- MTRO-27 — Contact segments (list), Story, QA Review — list, Duplicate, Delete confirm.
- MTRO-53 — Create/edit segment, Story, QA Review — builder, AND/OR, Advanced, Save; danh sách operator không có trong ticket.
- MTRO-100 — Error message permission when a Member cannot save a segment, Story, In Progress — Member không create/edit; chặn ở `Create segment`.
- MTRO-120 — Filter recipients by email engagement, Story, To Do — chưa chốt phương án.
- MTRO-78 — Wire suppressions into send path + segment exclusion, Task, DONE — loại contact bị suppress khỏi count / preview.

## Source

- `business-rules/MTRO.md` § "Segments — danh sách (MTRO-27)", § "Segments — builder (MTRO-53)", § "Segment preview và count tự loại contact bị suppress"; `open-questions/MTRO.md` § Segments.
- `inventory/MTRO.md` § 2.4, L14, L15, L46, L47, L49 — staging 01/10/2026.
- QA Hub task MTRO-011 (90 case, 8 case có bugId BUG-67/68/69/70/94/96/97/113; notes 02/10), MTRO-008 (rỗng) — đọc 2026-10-07.
- Jira MTRO-27, 53, 78, 100, 120 — đọc 2026-10-07.
- Repo `qikify-QA-mailtro`: `docs/bugs/02-contacts/2026-08-20…`, `2026-08-26…`, `2026-09-08-contacts-segment-bug-log.md`; test-run `2026-09-14-segment…`, `2026-10-06-segment-slack-retest…`, `2026-10-06-custom-field…`; `docs/manual-testcases/02-contacts/segment.md`.
