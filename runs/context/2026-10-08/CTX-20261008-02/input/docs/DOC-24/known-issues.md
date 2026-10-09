<!-- testlane knowledge KB-389 · kind=known-issue · tag=— · status=draft · sourceUrl=https://github.com/ownego/qa-knowledge-work/blob/ae07d04a61509378493a9a07714b04f4e77a36e6/kb/MTRO/known-issues/known-issues.md · createdAt=2026-10-08T08:01:23.066Z · updatedAt=2026-10-08T08:01:23.066Z -->

# Known Issues / Limitations — Mailtro (MTRO)

**Status:** in-review

Bug đang biết và giới hạn có chủ ý, gắn tag theo slug feature để lọc. Đây là nguồn duy nhất cho known issue — file `features/` chỉ link về đây. Dựng 2026-10-07 từ: bug log + test-run repo `qikify-QA-mailtro` (20/08 → 06/10), `bugId` / case failed trên QA Hub (18 task), Bug type trên Jira (3 issue), `inventory/MTRO.md` § 5.1 (staging 01/10). "Status" lấy theo **lần chạy lại gần nhất** có bằng chứng (không có tool đọc trạng thái bug QA Hub). Mã `BUG-<số>` = bug trên QA Hub; `BUG-XX-nn` = mã trong repo.

## Format

```
## <feature-slug> — short title

**Status:** open | fixed (chờ đóng) | wontfix | intentional limitation | chờ chốt
**Impact:** ai / cái gì bị ảnh hưởng
**Source:** ticket / bug ID / case, ngày
```

## Issues

## auth-mailtro-id — Phiên đăng nhập hết sau ~2 giờ (MTRO-106)

**Status:** open trên Jira (To Do) — Dev đã tăng phiên lên **1 ngày** 29/09, PO đồng ý 30/09; ticket chưa chuyển trạng thái, description vẫn kỳ vọng 1 tháng.
**Impact:** người dùng bị đăng xuất giữa chừng (kèm 2FA), có thể mất phần đang sửa template / campaign.
**Source:** Jira MTRO-106 (Bug), comment haptt 29–30/09.

## auth-mailtro-id — Không throttle khi nhập sai mã 2FA liên tục

**Status:** open — chưa report lên QA Hub.
**Impact:** 15–20 mã sai liên tiếp trong ~2'42" đều 422, không có 429 / `Too many attempts. Try again in a minute.` — trái MTRO-88 (6/phút/session, 20/phút/IP). Rủi ro brute-force mã TOTP. Mức High.
**Source:** TC-MTRO-931 (TC-2FA-037), test-run `01-auth/2026-09-23-two-factor-manual-run.md` (NB-1).

## auth-mailtro-id — Param `email` trên URL reset password in nguyên văn lên trang

**Status:** open (26/08).
**Impact:** kẻ xấu chèn chữ tuỳ ý vào trang "Choose a new password" trên domain Mailtro (content injection / phishing). XSS thì được escape (TC-RESET-042 pass).
**Source:** TC-MTRO-137 (TC-RESET-043), task MTRO-005.

## auth-mailtro-id — Màn reset: `Confirm new password` trống vẫn bấm được `Reset password`

**Status:** open (26/08).
**Impact:** client không chặn, server trả 422 "The password field confirmation does not match."
**Source:** TC-MTRO-117 (TC-RESET-007), task MTRO-005.

## auth-mailtro-id — Ô mã 2FA / recovery code không làm sạch giá trị hiển thị

**Status:** open (23/09), Low.
**Impact:** `12ab#3-4x56`, `123 456`, `123-456` giữ nguyên trên ô (body gửi đi vẫn đúng vì FE lọc ở biến dẫn xuất).
**Source:** TC-MTRO-902, 905, 906 (NB-3).

## auth-mailtro-id — `Sign out` ở Choose a workspace có thể không huỷ phiên workspace

**Status:** cần tái hiện (mới quan sát 1 lần 23/09), mức High nếu đúng.
**Impact:** đăng xuất ở Mailtro ID nhưng phiên `*.wisle.app` vẫn còn.
**Source:** TC-MTRO-932 (NB-2), test-run 23/09.

## auth-mailtro-id — Back trình duyệt sau khi login đứng ở form `/login` trống

**Status:** open (23/09), chưa report.
**Impact:** phiên vẫn còn nhưng không tự điều hướng lại vào app.
**Source:** TC-MTRO-040 (TC-LOGIN-052).

## auth-mailtro-id — Password toàn dấu cách: UI báo sai loại lỗi; 429 chỉ hiện alert chung

**Status:** open (25/08).
**Impact:** BUG-AUTH-06 — password 8 dấu cách lọt client, BE 422, UI "Incorrect email or password."; BUG-AUTH-08 — bị rate limit 429 chỉ thấy "Something went wrong", không nói bị khoá, nút vẫn enable. Thêm BUG-AUTH-03 (partial): `APP_DEBUG` từng lộ stack trace, nhánh 429 `/login` chưa đo lại; `/register` không còn kiểm CSRF (chờ Dev xác nhận).
**Source:** `docs/bugs/01-auth/2026-08-20-auth-bug-log.md`; test-run 25/08.

## auth-mailtro-id — Accessibility: thiếu focus ring nút Sign in, lỗi inline không đọc được bằng screen reader, `document.title` sai

**Status:** open (20–25/08), P2.
**Impact:** BUG-AUTH-07 (WCAG 2.4.7), BUG-AUTH-11 (thiếu `role="alert"` / `aria-live`), BUG-AUTH-10 (title luôn "Mailtro Staging — Sign in" ở `/signup`, `/verify`).
**Source:** auth bug log 20/08; test-run 25/08.

## auth-mailtro-id, team-members — Mở link invite không hợp lệ khi đang đăng nhập: BE 405, UI im lặng

**Status:** open (23/09, chưa kiểm lại).
**Impact:** `POST /api/invitations/<token>/accept` trả 405, UI bỏ `?invite` mà không hiện toast `We couldn't add you to that workspace…`.
**Source:** inventory L29.

## home-app-shell — Route không tồn tại trả trang trắng

**Status:** chờ chốt (hỏi Dev có trang 404 dự kiến không).
**Impact:** không phân biệt được "chưa có" với "lỗi render" (`/analytics`, `/brand`, `/forms`, `/settings/billing`, `/lists`…).
**Source:** inventory L31.

## contacts — Search Contacts không ra contact Unsubscribed

**Status:** open — PO/BA + Dev 02/10 xác nhận **là lỗi**; retest Slack 06/10 REOPENED (2/2).
**Impact:** không tìm được người đã huỷ đăng ký kể cả gõ đủ email. Gốc: search đi qua `ContactsResource::baseQuery` (loại unsubscribe + bounce / complaint). Sửa sai có thể làm segment thôi loại contact bị suppress → regression segment count.
**Source:** TC-MTRO-1722; MTRO-010 BR-13; inventory L44.

## contacts — Dialog Edit contact: Save bật khi chưa đổi gì, phụ đề dùng chữ của Create

**Status:** open — Dev 02/10 xác nhận là lỗi; tái hiện 06/10.
**Impact:** Save gửi `PUT` 200 dù không đổi; phụ đề "Add a contact to this workspace." (Lưu ý TC-MTRO-1512 bên custom field lại chấm PASS với Expected cũ — 2 bộ Expected mâu thuẫn.)
**Source:** TC-MTRO-1720, 1721; MTRO-010 BR-19.

## contacts, custom-fields — Edit contact: Date / Number là ô text, nhập sai làm mất giá trị

**Status:** open (06/10).
**Impact:** Number nhập `abc` → rỗng, Save mất giá trị cũ; BE không kiểm kiểu (API ghi `abc` vào Date vẫn được) → hỏng kiểu dữ liệu, ảnh hưởng segment. Boolean ở Edit đã là combobox (VERIFIED 06/10).
**Source:** TC-MTRO-1717; MTRO-010 BR-24.

## contacts — Dialog New contact không cuộn ở màn hình nhỏ

**Status:** open (26/08, 06/10), P1.
**Impact:** ở 375×667, ≥3 dòng custom field thì nút `Create contact` / `Cancel` ra ngoài màn, không bấm được (dialog cao 882px).
**Source:** BUG-CONTACT-01; TC-MTRO-239, 537, 1482.

## contacts — Alert "The email has already been taken." không tự mất khi sửa email

**Status:** open (26/08), P2.
**Impact:** UX — lỗi cũ còn hiện sau khi người dùng đã sửa.
**Source:** BUG-CS-09; TC-MTRO-271, 569.

## contacts, custom-fields — Custom field có value null hiện ô trắng thay vì "—"

**Status:** chờ chốt PO (06/10).
**Impact:** không nhất quán với field chuẩn (`—`).
**Source:** TC-MTRO-258, 1490, 1510, 1516.

## custom-fields — Key sai quy tắc bị chuẩn hoá im lặng, có thể ghi vào field có sẵn

**Status:** open (06/10), High — trái rule PO/Dev 01/10 (MTRO-022 BR-13); Dev 02/10 lại mô tả chuẩn hoá là chủ ý → rule mâu thuẫn.
**Impact:** `Bad Key!` → `bad_key`, `plan-tier` → `plan_tier` **ghi đè vào field có sẵn của người khác**, `x__y` → `x_y`, `gói_pro` → `g_i_pro` — không báo.
**Source:** TC-MTRO-1483→1486, 1508.

## custom-fields — Xoá được custom field đang dùng ở segment / automation

**Status:** open (06/10), High — trái rule PO/Dev 01/10 (MTRO-022 BR-19).
**Impact:** segment báo "Unknown field", preview 422; node automation trỏ field không tồn tại. (Field có contact mang hoặc dùng ở preferences page thì bị chặn đúng.)
**Source:** TC-MTRO-1524, 1525.

## custom-fields — Dialog `New custom field` không thống nhất giữa 2 nơi

**Status:** open (nhỏ).
**Impact:** ở `/contacts/fields` `Create field` enable khi Field name rỗng (bấm không làm gì); ở Email preferences disabled khi rỗng nhưng enable với tên sai định dạng, lỗi chỉ BE báo.
**Source:** inventory L09; TC-MTRO-1522.

## segments — Delete segment không gửi request (BUG-94)

**Status:** open — tái hiện lần 4 ngày 14/09, P0; sprint status 02/10 "chạy lại trước tiên".
**Impact:** dialog đóng như đã xoá nhưng segment vẫn còn (API `DELETE /segments/{id}` gọi thẳng thì chạy).
**Source:** BUG-CS-01 / BUG-94; TC-MTRO-330.

## segments — Điều kiện trên custom field Boolean luôn 422 nhưng toast báo thành công

**Status:** open — Dev 02/10 nghi bug (`attr:x = true` không ngoặc kép, `src/services/segment-query.ts:39`); tái hiện 06/10.
**Impact:** segment Boolean không dùng được; preview + contacts/search 422 `Expected a value, got 'true'.`, `Count unavailable`, toast "Segment evaluated · 0 contacts match right now." → người dùng tưởng 0 người. Liên quan BUG-67 (Run lỗi vẫn toast thành công — biến thể ngày sai đã sửa 14/09).
**Source:** TC-MTRO-1535; MTRO-011 BR-23; retest Slack #5.

## segments — Save segment khi Value trống tạo segment rác `Untitled segment` (BUG-97)

**Status:** fixed? — fail lần 4 ngày 14/09; staging 01/10 quan sát Save đã disabled khi Value trống (PO 02/10 chốt đây là rule) → **cần chạy lại** TC-SEGMENT-042 để đóng.
**Impact:** sinh segment rác trùng tên trong workspace.
**Source:** BUG-CS-11 / BUG-97; TC-MTRO-313; inventory L47.

## segments — Query hỏng làm cột Contacts câm (BUG-68)

**Status:** open (14/09).
**Impact:** `GET /segments/{id}/count` 422 (trước 500) nhưng ô Contacts chỉ `—`, không báo lỗi; campaign trỏ segment này sẽ rollback khi Send (`Couldn't start this send`).
**Source:** BUG-CS-15 / BUG-68; TC-MTRO-645.

## segments, campaigns — Segment trùng tên không phân biệt được ở picker (BUG-69)

**Status:** open (14/09) — tên segment được trùng (PO 02/10), còn chờ PO chốt picker hiện thêm gì (GAP-19).
**Impact:** rủi ro gửi campaign / export cho sai tập khách hàng; staging có nhiều `Untitled segment`.
**Source:** BUG-CS-16 / BUG-69; TC-MTRO-653.

## segments — Lỗi nhỏ khác của segment builder

**Status:** open (14/09 → 06/10).
**Impact:** ký tự `"` bị xoá khi serialize (BUG-CS-05); đổi operator xoá trắng value đã chọn (BUG-CS-13); `Is set` / value chứa ` OR ` không mở lại được bằng card editor (BUG-113); tên 255 ký tự tràn bảng 2415px (BUG-70); đổi field Text → Boolean operator vẫn hiện `Equal to`; nhãn `Phone` ở `Condition field` thay vì `SMS` (TC-MTRO-289); breadcrumb chỉ hiện mục cuối (Dev 02/10: lỗi đã biết).
**Source:** segment bug log 08/09; test-run 14/09, 05/10, 06/10; MTRO-011 BR-26.

## segments — Toggle Advanced bị ẩn

**Status:** intentional limitation (tạm) — Dev 02/10: ẩn có chủ ý (`display: none`); PO chưa quyết bỏ hẳn hay bật lại.
**Impact:** không test được chế độ pseudo-SQL; segment builder không đọc được query thì tự vào Advanced và không có nút quay lại.
**Source:** BUG-CS-04; MTRO-011 BR-20.

## suppressions — Link unsubscribe trong mail campaign (BUG-SUPP-06)

**Status:** cần retest — P0 mở theo bug log 08/09; dấu hiệu đã khắc phục (06/10 có contact Unsubscribed "via Footer link", BE tự chèn `{{unsubscribe_url}}`).
**Impact:** nếu còn lỗi: người nhận không huỷ được đăng ký (tuân thủ).
**Source:** `docs/bugs/02-contacts/2026-09-08-suppression-bug-log.md`; TC-MTRO-613, 614.

## suppressions, campaigns — Campaign dùng template rỗng → 500 khi Send (BUG-SUPP-01)

**Status:** open (08/09, 3/3), P0, chưa đo lại.
**Impact:** UI biết template rỗng mà vẫn cho `Send`, BE trả 500 `Server Error`.
**Source:** suppression bug log 08/09.

## suppressions — Route API suppression lệch AC; Draft trả 404 / hiện `—`

**Status:** chờ chốt PO/Dev.
**Impact:** BUG-SUPP-02 — route thật `deliverability-suppressions` (AC `suppressions` → 404); BUG-SUPP-05 — `GET /campaigns/{id}/broadcast` của Draft 404 thay vì 6 số 0; BUG-SUPP-03 — report có đủ số vẫn hiện `—`. BUG-SUPP-04 (đường gửi hỏng 08/09) **không tái hiện 09/09** (15/15) — đề nghị đóng.
**Source:** suppression bug log 08/09; run 09/09.

## suppressions — Không có nút gỡ suppression / resubscribe trên UI

**Status:** intentional limitation? — chờ PO (gỡ chỉ qua Portal API `DELETE`).
**Impact:** marketer không tự gỡ được địa chỉ bị chặn nhầm; contact Unsubscribed không resubscribe được từ detail.
**Source:** inventory L16; MTRO-010 GAP-14.

## email-library — Màu nền content đổi sau khi tạo qua MCP hoặc import HTML (MTRO-114)

**Status:** open (Jira In Progress) — MKT báo trên **production** 01/10 và 02/10.
**Impact:** template nguồn nền trắng vào Mailtro bị đổi màu nền, chỉ block cuối còn trắng — cả đường Claude MCP lẫn Import HTML.
**Source:** Jira MTRO-114 (Bug).

## email-library — Tab `Issues` của editor không bao giờ cảnh báo

**Status:** intentional limitation (theo bundle) — chờ Dev xác nhận có định bật bộ kiểm tra.
**Impact:** merge tag sai cú pháp / không tồn tại không được cảnh báo khi thiết kế; chỉ phát hiện lúc Send hoặc khi run automation Failed.
**Source:** inventory L02; MTRO-021 BR-40.

## email-library, automations, campaigns — Xoá template đang được dùng không bị chặn

**Status:** chờ chốt PO (GAP-04 MTRO-021, GAP-09 MTRO-018).
**Impact:** automation trỏ template đã xoá: builder không báo, node hiện id thô, badge vẫn Configured, `Activate` bấm được; mọi run Failed "The mail template this step sends no longer belongs to this workspace." Campaign Draft dùng chung `mail_template.id` cũng bị ảnh hưởng.
**Source:** inventory L02, L60; TC-MTRO-1133 / 1134.

## email-library, campaigns — Picker template chỉ nạp 50 email sửa gần nhất

**Status:** chờ chốt Dev (giới hạn chủ ý?).
**Impact:** workspace >50 email không chọn được email cũ ở bước Contents / Duplicate design; dialog không search, không phân trang.
**Source:** inventory L56; MTRO-021 BR-41.

## email-library — Bulk Delete: selection giữ qua trang, xoá tuần tự không rollback

**Status:** nghi vấn (bundle), chưa tái hiện trên UI (staging chỉ 9 email).
**Impact:** chọn ở trang 1, sang trang 2 rồi Delete có thể xoá cả dòng không thấy; lỗi giữa chừng để lại trạng thái nửa vời.
**Source:** inventory L53; MTRO-021 BR-35.

## email-library — Mở email không tồn tại hiện `Not saved`

**Status:** open (nhỏ).
**Impact:** header hiện nhãn "lưu thất bại" + alert `Not Found.` thay vì màn not-found riêng.
**Source:** inventory L55.

## saved-blocks — Đồng bộ saved block phía BE chưa xác nhận; `Save as Block` không link block gốc

**Status:** chờ chốt (GAP-01, GAP-02, GAP-07 MTRO-023).
**Impact:** nếu FE resolve mà BE chưa → preview mới, mail gửi đi mang nội dung cũ (lỗi im lặng). Block tạo bằng `Save as Block` hiện `Not used yet` dù đang nằm trong template.
**Source:** MTRO-89 comment 08/09, 02/10; inventory L17.

## email-preferences — Form không có cảnh báo rời trang; câu not-found lỗi thời

**Status:** open.
**Impact:** `Back` khi form có thay đổi về list ngay, mất dữ liệu; mở id đã xoá vẫn nói "…or the sample data reset when the app reloaded."
**Source:** inventory L11.

## email-preferences — `Used in` chỉ đếm campaign

**Status:** chờ chốt Dev.
**Impact:** page chỉ dùng ở automation hiện `Not used yet`, xoá không cảnh báo → link `{{preferences_url}}` trong mail automation có thể chết.
**Source:** inventory L74; MTRO-024 GAP-07.

## campaigns — Wizard nuốt lỗi 422 khi Save (BUG-WIZ-01)

**Status:** open, **P0** — sprint status 02/10 "chưa fix". Gốc chung: FE chưa có tầng xử lý lỗi chung.
**Impact:** from_email sai / subject >255 → Save thất bại im lặng, người dùng tưởng đã lưu.
**Source:** test-run `05-campaigns/2026-08-25-campaigns-wizard…`; TC-WIZ-015 / 022 / 054.

## campaigns — Rời wizard khi chưa lưu mất trắng (BUG-WIZ-02)

**Status:** open (25/08), P1.
**Impact:** bấm link `Manage sending domains` hay đổi menu khi chưa Save → mất thay đổi, không cảnh báo (bundle 01/10 không có leave guard).
**Source:** TC-WIZ-007.

## campaigns — Đổi filter không clear selection (BUG-CL-01)

**Status:** open (27/08), P1.
**Impact:** bulk bar vẫn `1 selected` + `Delete` cho dòng đã khuất — kết hợp với bulk Delete campaign Sent (chưa xác minh) có thể mất dữ liệu.
**Source:** TC-MTRO-368 (TC-CAMP-035).

## campaigns — Không có UI xoá / đổi tên folder; lỗi nhỏ ở list

**Status:** open (27/08).
**Impact:** BUG-CL-02 — BE có `DELETE /folders/{id}` nhưng FE không có UI; BUG-CL-03 — tràn ngang 36px ở 375px; copy `1 campaign(s) selected.`; `Next` của wizard không validate field bắt buộc; sender bị đổi sang host chung nhưng bước 4 / Preview vẫn hiện địa chỉ người dùng gõ.
**Source:** campaigns list bug log 27/08; wizard run 25/08.

## campaigns, campaign-report — Campaign Sent 30/09 lưu merge tag một ngoặc

**Status:** chờ Dev xác nhận người nhận thấy gì.
**Impact:** campaign `Tepo Newsletter – Tháng 10/2026` lưu `{contact.first_name}`, `{unsubscribe_url}`, `{preferences_url}` (một ngoặc); nếu renderer lúc đó không thay → người nhận thấy chuỗi thô, link huỷ đăng ký chết (tuân thủ). PO 02/10: dữ liệu một ngoặc không migrate.
**Source:** inventory L68; MTRO-009 GAP-05; MTRO-020 GAP-22.

## campaign-report — Report: biểu đồ Opens dùng số all-time; audience card báo sai lý do; id lạ khung trống

**Status:** known — MTRO-96, MTRO-97 (Task To Do, "không report bug lại"); id lạ chờ chốt.
**Impact:** headline "{total_opens} opens from {unique_opens} people" là all-time trên biểu đồ 24h đầu; audience có field đã xoá báo "too complex" thay vì "field removed"; `/campaigns/<id lạ>/report` hiện khung trống không `Not Found.`; Draft mở được `/report` (bố cục 4 tab cũ).
**Source:** Jira MTRO-96, MTRO-97; inventory L69.

## campaign-report — Merge tag hiện thô trong preview nội dung đã gửi

**Status:** intentional limitation — dialog ghi "Merge tags appear as written, because what each recipient received is not stored per address."
**Impact:** không xem được bản từng người nhận đã nhận.
**Source:** inventory L02, L68; MTRO-020 BR-40.

## automations — Re-entry once không giữ

**Status:** open (27/09) — trái rule QA chốt 18/09.
**Impact:** sửa cùng contact 3 lần → 3 run; contact đang Waiting khớp trigger lần nữa vẫn tạo run thứ hai → nguy cơ gửi trùng mail.
**Source:** TC-MTRO-1116, 1107.

## automations — Activate ở builder không hỏi xác nhận (BUG-53)

**Status:** open (27/09).
**Impact:** bật flow gửi mail thật chỉ bằng 1 click (list thì có dialog).
**Source:** BUG-AU-04 / BUG-53; TC-MTRO-1066, 1068.

## automations — Builder: validate yếu ở Send email / Wait / Update contact field

**Status:** open (27/09).
**Impact:** From email / Reply-to sai định dạng chỉ báo bằng toast khi `PUT` 422 (TC-MTRO-1044, 1046); Wait `0` vẫn badge Configured, `abc` / rỗng không có inline (TC-MTRO-1090, 1091); New value toàn khoảng trắng sau reload thành trống (TC-MTRO-1052); `New value` không kiểm theo kiểu field (PO 02/10 — intentional).
**Source:** test-run `06-automations/2026-09-27-*`; MTRO-018 BR-32.

## automations — Lỗi hiển thị / layout của builder và run detail

**Status:** open (14/09 → 01/10).
**Impact:** nhãn Wait không số ít (`1 days`); Run detail "Took the \`no\` branch." (BUG-58); panel phải che node ở 1280×800 (L06); 375px không thao tác được (BUG-55); 3 nút zoom thiếu accessible name (BUG-57); description dài đẩy nút dialog ra ngoài; Duplicate node không chuyển panel; list không sort theo Last edited (BUG-52); automation id lạ vẫn dựng khung builder (BUG-56).
**Source:** automations bug log 03/09; test-run 27/09; inventory L04, L06, L61, L63.

## automations — Search 300 ký tự / Duplicate tên 255 ký tự lỗi

**Status:** open (27/09).
**Impact:** search >255 → 422, bảng thay bằng alert thô, mất ô search / filter (TC-MTRO-970); Duplicate automation tên 255 ký tự → 500 (TC-MTRO-989).
**Source:** test-run lot2 27/09.

## automations — `Exited` gộp run Failed; Retry hiện với lỗi permanent

**Status:** chờ chốt PO / Dev.
**Impact:** không lọc riêng được run lỗi; `Retry this run` vẫn hiện khi template đã xoá (thử lại vô ích).
**Source:** inventory L05, L64.

## automations, sending-domains — Gửi được khi domain chưa verify (BUG-51)

**Status:** wontfix / by design cho automation — PO/BA 02/10 (BR-27) chốt gửi qua shared sending host; **chưa chốt cho campaign** (mâu thuẫn rule 07/08).
**Impact:** mail đi từ host dùng chung (`<owner>@mailtro.ai`) thay vì domain merchant; helper UI vẫn nói "Must be on one of your workspace's verified sending domains."
**Source:** BUG-51; MTRO-018 BR-27; MTRO-009 GAP-01.

## team-members — Gửi lời mời xong bảng không tự thêm dòng

**Status:** open (29/09).
**Impact:** phải reload mới thấy dòng `Invited`.
**Source:** inventory L24.

## api-keys-claude-workspace — Key sắp hết hạn vẫn Rotate được

**Status:** chờ chốt Dev / PO.
**Impact:** rotate key `Expires in 24 hours` sinh thêm key mới; bảng có nhiều dòng cùng tên chỉ khác tiền tố.
**Source:** inventory L25.

## api-keys-claude-workspace — MCP biến link inline thành block button (MTRO-101)

**Status:** fixed, chờ QA verify (Jira QA Review 02/10).
**Impact:** email Claude dựng qua MCP có mọi link trong đoạn văn thành nút riêng.
**Source:** Jira MTRO-101 (Bug).

## sending-domains — Domain mới không có DNS records, `Verify` disabled

**Status:** intentional limitation (PO 09/07: verify chỉ dựng UI) — xác minh phải qua support.
**Impact:** merchant không tự verify được; rule "chỉ rõ record thiếu" chưa test được.
**Source:** Jira MTRO-48; inventory L26.

## security-abuse-guard — Nhiều cơ chế MTRO-92 chưa kiểm được trên staging

**Status:** chờ chốt (GAP-01…GAP-03 MTRO-019).
**Impact:** chưa biết staging ở chế độ tự dừng hay chỉ cảnh báo; chưa có trang / tài khoản staff; đăng nhập mã email mô tả trong ticket không có trên staging; cú pháp merge tag trong ticket (một ngoặc) ngược quyết định PO 02/10.
**Source:** Jira MTRO-92; task MTRO-019.
