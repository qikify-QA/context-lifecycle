<!-- testlane knowledge KB-369 · kind=product · tag=— · status=draft · sourceUrl=https://github.com/ownego/qa-knowledge-work/blob/ae07d04a61509378493a9a07714b04f4e77a36e6/kb/MTRO/decisions/decision-log.md · createdAt=2026-10-08T08:00:56.560Z · updatedAt=2026-10-08T08:00:56.560Z -->

# Decision Log — Mailtro (MTRO)

**Status:** in-review — append-only

Vì sao một rule / hành vi lại như vậy. Mỗi quyết định một mục, có ngày và lý do. Không xoá hay viết lại mục cũ — quyết định đổi thì thêm mục mới và ghi rõ nó thay mục nào. Các mục trước 2026-10-07 được gom lại từ nguồn (Jira, QA Hub, business-rules, ADR repo) khi dựng KB.

## Format

```
## YYYY-MM-DD — <tiêu đề ngắn>

**Decision:** quyết định gì
**Why:** lý do / ràng buộc dẫn tới quyết định
**Source:** ticket, comment, task QA Hub, hoặc người chốt
```

## Log

## 2026-07-08 — Invite nhiều email một lần, cùng một role

**Decision:** dialog Invite member nhận nhiều email, tất cả cùng 1 role (mặc định Member); FE gọi API invite theo batch có delay.
**Why:** PO muốn mời cả nhóm một lượt; BE dặn chia batch để tránh dồn request.
**Source:** MTRO-43 comment PO thuongnth + haptt, 08/07/2026.

## 2026-07-09 — Sending domain: chỉ add domain, verify chỉ dựng UI

**Decision:** trước mắt chỉ làm thêm domain cơ bản; phần verify / DNS records chỉ dựng UI, nội dung define sau.
**Why:** ưu tiên luồng chính; hệ quả trên staging là domain `Pending`, "contact support to start verification", `Verify` disabled.
**Source:** MTRO-48 comment PO 09/07/2026.

## 2026-08-04 — Dialog tạo contact phase này chỉ giữ field cơ bản

**Decision:** dialog New contact chỉ có Email, First name, Last name.
**Why:** PO liệt kê thêm Country code, Address, Phone, custom attributes rồi rút description về "các field cơ bản nhất". **Bị thay** bởi mục 2026-10-02 (bản dựng là chuẩn).
**Source:** MTRO-24 AC + comment thuongnth/Ashley 04/08/2026.

## 2026-08-07 — Email library: tạm bỏ CRUD folder

**Decision:** nếu CRUD folder tốn thời gian thì bỏ tạm, chỉ cần list all.
**Why:** giảm scope MTRO-34. Folder template được làm lại ở MTRO-115 (To Do, 02/10) dạng list phẳng.
**Source:** MTRO-34 comment PO 07/08/2026; QA Hub MTRO-021 BR-17.

## 2026-08-11 — Campaign wizard: bỏ auto-save, Recipients chỉ chọn 1 segment, đổi nút Contents

**Decision:** (1) wizard **không auto-save**, có nút `Save`; (2) Recipients đổi multi-select → **single-select** 1 segment, bỏ helptext "X contacts"; heading "Segment" → "Send to"; (3) `*` cho 2 field bắt buộc; (4) Contents có `Choose from existing` / `Create new` (→ `Create from scratch` / `Duplicate design`) và menu `Reset design`.
**Why:** PO chốt khi review prototype; số contact từng segment không đếm ngay được. Description MTRO-29 chưa sửa theo. Tên nút (4) về sau thành `Choose email library` / `Create email library` (staging 01/10) và sắp thành `Choose a template` / `Create new template` (mục 2026-09-30).
**Source:** MTRO-29 comment thuongnth/Ashley 11/08/2026.

## 2026-08-11 — Campaign list: thêm status Running, click dòng theo status; Duplicate bỏ content

**Decision:** thêm status `Running`; dòng draft / scheduled mở builder, dòng sent / running mở report và ẩn Edit; Duplicate copy subject / sender / segment, **content để trống**.
**Why:** cập nhật description MTRO-28 ngày 11/08, thay câu cũ "Row is only clickable when status = sent".
**Source:** MTRO-28 (mục cập nhật 11/08/2026).

## 2026-08-11 — Đổi "Templates" thành "Email library"

**Decision:** toàn bộ copy "Templates" đổi thành "Email library". **Bị thay** bởi mục 2026-09-30.
**Why:** không ghi lý do trong ticket.
**Source:** MTRO-15 comment PO 11/08/2026.

## 2026-08-17 — Kiến trúc repo automation (ADR 0001–0009)

**Decision:** test bám epic Jira (0001, bị 0010 thay một phần); tag thay thư mục smoke / regression (0002); login sẵn theo role + project không đăng nhập cho `01-auth` (0003); test API project riêng 1 worker (0004); case auto và manual chung một file (0005); feature chưa có UI là `test.fixme` (0006); HTTP qua `utils/<module>-api.ts`, không "chữa lành" lỗi (0007); Mailtro không phải Shopify app — 2 host `AUTH_URL` / `BASE_URL` (0008); JSON test case vừa 1 ô Google Sheet (0009 — bỏ 02/10, case chỉ ở QA Hub + Markdown).
**Why:** UI còn đổi nhanh; endpoint auth 10 req/60s; tránh mô hình iframe / shop của app Shopify.
**Source:** repo `qikify-QA-mailtro` `docs/decisions/0001`–`0009`.

## 2026-08-24 — Unsubscribe MVP Sprint 4: footer link tự động, one-click header

**Decision:** footer unsubscribe tự động ở mọi campaign marketing (không transactional), unsubscribe ngay không survey; contact đã unsubscribe không hiện trong segment; one-click header RFC 8058 làm nhưng "chưa work ngay vì domain cần gửi đủ nhiều thì Gmail mới support". Preference center (U5 / U6) để Later.
**Why:** tuân thủ yêu cầu Gmail / Yahoo bulk sender; ưu tiên U1 + U2 (Thương 18/08).
**Source:** MTRO-17 bảng Decision 24/08/2026.

## 2026-08-25 — Không copy-on-write giữa campaign Draft

**Decision:** sửa design trong một campaign Draft đổi mọi Draft dùng cùng `mail_template.id`; campaign Sent đóng băng.
**Why:** hành vi hiện tại được chấp nhận khi chạy wizard.
**Source:** QA Hub MTRO-009 TC-MTRO-208 "Đã chốt 2026-08-25"; MTRO-021 BR-20.

## 2026-09-03 — Chỉ test bounce / complaint bằng SES mailbox simulator

**Decision:** QA chỉ dùng địa chỉ giả lập của AWS SES khi test bounce / complaint, không dùng email thật / bịa.
**Why:** bảo vệ reputation gửi và quota AWS; bounce / complaint thật làm workspace bị siết.
**Source:** MTRO-64 comment haptt → ngant 03/09/2026; MTRO-92 §0.

## 2026-09-07 — Bounce / complaint: suppress ngay, soft bounce theo ngưỡng 7, không tự gỡ

**Decision:** hard bounce và complaint tạo suppression ngay, vĩnh viễn; soft bounce suppress sau **7 lần liên tiếp** (Delivery reset về 0); suppression **không tự gỡ** khi contact resubscribe, chỉ gỡ thủ công qua Portal API (kèm quét SES mọi region).
**Why:** ưu tiên reputation gửi hơn giữ contact — AWS siết / treo quota khi bounce > ~5%, complaint > ~0.1%; ngưỡng 7 và cách reset theo Klaviyo.
**Source:** MTRO-64 (B1–B5), MTRO-76, MTRO-77, MTRO-80; `business-rules/MTRO.md` 07/09/2026.

## 2026-09-07 — Không lưu raw payload SES, không bảng analytics riêng, không cột counter

**Decision:** `ses_events` lưu mọi loại event kèm attribution nhưng không raw JSONB; 6 số delivery tính bằng COUNT lúc đọc, không cache.
**Why:** một nguồn sự thật cho mọi con số; tránh lệch giữa counter và event.
**Source:** MTRO-75, MTRO-82; `business-rules/MTRO.md`.

## 2026-09-08 — Saved block: detach thay "khoá cứng", resolve-on-read

**Decision:** block chèn từ saved block được link theo run (`savedBlockId`) và resolve lại từ entry ở editor, preview, Contents và lúc gửi; sửa tại chỗ → run đó **tách** khỏi bản gốc; xoá saved block → biến mất khỏi mọi template; có trang Saved blocks riêng để sửa bản gốc.
**Why:** SDK Templatical OSS không hỗ trợ khoá block hay link native; custom block bị loại (không có UI tạo, BE không resolve thì mất block im lặng). PO chưa xác nhận chấp nhận detach (GAP-03 MTRO-023).
**Source:** MTRO-89 comment Dev haild 08/09/2026 (+ PR #27, 02/10).

## 2026-09-17 → 2026-09-24 — Định nghĩa số liệu analytics

**Decision:** 1 link = 1 tag; click rate theo **người**, có cả total + unique; mọi số là unique contact trừ total opens / clicks; chỉ tính unsubscribe global; trang global chỉ số đếm, không rate; rate theo ngày gửi; step send-mail bị xoá vẫn giữ số; report automation cộng mọi version; **không có node Exit** (kết thúc = `flow.completed`); nút Test chỉ mô phỏng, không tạo log. Hoãn: performance theo segment, inbox placement, click heatmap.
**Why:** thống nhất cách đếm giữa BE và FE trước khi làm report; tránh số nhảy khi sửa flow.
**Source:** MTRO-16 comment PO 17/09, 18/09, 21/09 và haptt 24/09; MTRO-94.

## 2026-09-18 — Chốt hành vi builder automation sau buổi rà case blocked (task QA Hub MTRO-017)

**Decision:** bản dựng staging thắng AC cũ: nhãn trigger chưa cấu hình `Click to configure →`; split multi-condition; Sender của Send email là 2 ô text; Configured = template + Subject + From email (domain chưa verify vẫn tính); `Save` là cửa chặn duy nhất; sửa flow Active ghi đè thẳng, **không draft / version**; phải Save lần đầu mới có `Test` / `View runs`; Update property phát event contact updated, re-entry once.
**Why:** AC MTRO-33 là bản cũ; QA đối chiếu staging 16/09 để mở khoá case blocked. Nhiều tên UI đã đổi tiếp 29/09 và 01/10 (`Update contact field`, `Contact field changed`, split editor mới) — hành vi giữ, tên phải cập nhật.
**Source:** QA (Nga) 18/09/2026; `business-rules/MTRO.md`.

## 2026-09-25 — Automation Reports disable khi flow có thay đổi chưa lưu

**Decision:** icon `Reports` disabled + tooltip "Save to see reports" khi builder dirty.
**Why:** report tính theo bản đã lưu; tránh người dùng nhìn số của flow khác với canvas.
**Source:** MTRO-61 comment Dev chuyenmc 25/09/2026 (PR #39), PO không phản đối.

## 2026-09-28 — Import CSV: giữ tên header cho cột lạ, export đối xứng

**Decision:** cột chuẩn ghi vào field chuẩn; cột khác thành custom field **giữ nguyên tên header** (vd Brevo `HOST_APPSTATUS`); export: field chuẩn trước, mỗi custom field một cột, header = key để import lại tự khớp.
**Why:** migrate từ Brevo không mất attribute. Mâu thuẫn với mục 2026-10-01 (hạ chữ thường) và rule key `^[a-z][a-z0-9_]*$` — GAP-01 MTRO-025 chưa đóng.
**Source:** MTRO-95 comment PO thuongnth 28/09/2026.

## 2026-09-29/30 — Phiên đăng nhập 1 ngày

**Decision:** tăng thời hạn phiên từ ~2 giờ lên **1 ngày** (không phải 1 tháng như kỳ vọng ban đầu).
**Why:** Dev: "thông thường 1 ngày là đủ… dài quá họ lấy được session sẽ không hay"; PO đồng ý.
**Source:** MTRO-106 comment haptt 29–30/09/2026.

## 2026-09-30 — Đổi "Email library" thành "Templates"

**Decision:** sidebar, page title, breadcrumb đổi thành `Templates`, nút `New template`; màn campaign `Choose a template` / `Create new template`; sửa text Claude MCP; route / API giữ nguyên. **Thay** mục 2026-08-11 (Templates → Email library).
**Why:** 2/3 tester trên staging hiểu "Email library" là kho email đã gửi / ảnh / asset. Chưa thấy trên staging 01/10.
**Source:** MTRO-99 description + comment PO 30/09/2026.

## 2026-09-30 — Member không được tạo / sửa segment

**Decision:** Member bị chặn ngay ở nút `Create segment` (tooltip), không vào builder; toast "Only workspace Owners and Admins can create segments. Ask an Admin to create it for you."
**Why:** toast cũ `This action is unauthorized.` làm tester tưởng bug; quyền segment thuộc Owner / Admin. Thay phần "Member tạo / sửa segment" trong rule 07/08.
**Source:** MTRO-100 description + comment PO 30/09/2026.

## 2026-09-30 — Email library nghiệm thu theo staging; folder ra khỏi MTRO-34

**Decision:** scope nghiệm thu MTRO-34 là hành vi staging (không phải description prototype); folder không thuộc MTRO-34.
**Why:** description MTRO-34 lệch staging gần hết (New template, Paste HTML, By folder).
**Source:** QA lead Nga 30/09/2026 — QA Hub MTRO-021 BR-21, BR-22.

## 2026-10-01 — Custom field thuộc phạm vi release (PO/Dev qua QA lead)

**Decision:** custom field thuộc release; value trống lưu `null`; 2 dòng cùng key → dòng sau ghi đè; key sai phải hiện thông báo; Edit được đổi key / Kind; gõ key mới tự tạo field; `/contacts/fields` trong phạm vi; Member tạo / xoá field; import hạ chữ thường; field đang dùng không xoá được; không giới hạn số field.
**Why:** không có ticket AC cho custom field. Một phần bị mục 2026-10-02 (PO/BA) nói ngược (không đổi kiểu khi sửa; Dev mô tả FE tự chuẩn hoá key) — mâu thuẫn chưa đóng.
**Source:** QA Hub MTRO-022 BR-10…BR-20 (PO/Dev qua Nga 01/10/2026).

## 2026-10-01 — Cú pháp merge tag hai ngoặc `{{…}}` trên staging

**Decision:** staging dùng `{{contact.first_name}}`, `{{contact.attr.<key>}}`, `{{unsubscribe_url}}`, `{{preferences_url}}`; một ngoặc là chữ thường; tag hai ngoặc thiếu ngoặc bị chặn ở builder automation.
**Why:** quan sát hệ thống thật (picker, bundle, i18n), thay hiện trạng 29/09 (một ngoặc). Được PO chốt ở mục 2026-10-02.
**Source:** `inventory/MTRO.md` L51, Đ01.

## 2026-10-02 — Contacts, Segments, Automations: PO/BA và Dev trả lời GAP

**Decision:** Contacts — bản dựng dialog New contact là chuẩn (Email, First, Last, Country, Address, SMS, Custom field); +93 mặc định là chủ ý; không đổi kiểu custom field khi sửa; search ẩn Unsubscribed là **lỗi**; Email status là nguồn đúng; bỏ tag; bỏ Display name. Segments — chỉ gồm contact Subscribed; tên không unique; xoá segment đang dùng được; Save disabled khi Value trống; giữ `1 conditions`; bộ đếm chỉ cập nhật khi Run; Advanced ẩn tạm. Automations — From email ngoài domain verified vẫn gửi qua **shared sending host**; contact unsubscribed → run Failed; suppressed → run Completed + đếm Bounced / Spam complaints; cú pháp biến **hai ngoặc**, dữ liệu một ngoặc không migrate; `Which fields?` chọn từ dropdown; New value không validate theo kiểu; không có "Changed fields".
**Why:** mở khoá các task Not Ready; chốt hành vi để viết lại case.
**Source:** QA Hub MTRO-010 BR-09…BR-24, MTRO-011 BR-12…BR-27, MTRO-018 BR-27…BR-34 (PO/BA và Dev qua Nga, 02/10/2026).

## 2026-10-02 — Custom font Outfit + Nunito Sans; Sign-up form chỉ newsletter + ebook

**Decision:** font brand Outfit và Nunito Sans (Google Fonts), chấp nhận Gmail / Outlook desktop rơi về `sans-serif`, load Google Fonts trực tiếp ở chỗ chọn font (không trang settings font). Sign-up form chỉ cần đổ contact đăng ký newsletter + ebook về Mailtro.
**Why:** thương hiệu Qikify; Tally ↔ Brevo trước đây không nối vì API key Brevo không có scope (bảo mật).
**Source:** MTRO-111 comment PO + haild 02/10/2026; MTRO-9 comment PO 02/10/2026.

## 2026-10-02 — Bỏ Google Sheet cho test case (ADR 0009 superseded)

**Decision:** test case chỉ ở QA Hub + Markdown repo; xoá `data-output/`, script, `npm run testcases:json`.
**Why:** từ 10/09 case ghi thẳng lên QA Hub qua MCP.
**Source:** repo `docs/decisions/0009` (superseded 02/10/2026).

## 2026-10-05 — Nhãn số điện thoại là `SMS`; import CSV không kích hoạt automation

**Decision:** nhãn `SMS` ở mọi nơi (key `phone`, `{{contact.phone}}` giữ); bug "nhãn SMS" ngày 02/10 huỷ. Contact tạo / cập nhật qua import CSV không kích hoạt automation. **Thay** quyết định 02/10 "nhãn đúng là Phone".
**Why:** QA lead chốt thay PO để thống nhất case.
**Source:** QA Hub knowledge KB-004, KB-003 (Nga 05/10/2026).

## 2026-10-05 — Thư mục repo bám sidebar app (ADR 0010)

**Decision:** `tests/`, `manual-testcases/`, `test-runs/`, `bugs/` đánh số theo sidebar (`01-auth`, `02-contacts`, `03-templates`, `04-unsubscribe`, `05-campaigns`, `06-automations`, `07-settings`, `08-team`, `09-api`, `smoke/`); bỏ `09-backlog`. Thay một phần ADR 0001.
**Why:** epic lệch app thật; QA / sonder tìm case theo chỗ bấm trên sidebar.
**Source:** repo `docs/decisions/0010` (Nga 05/10/2026).

## 2026-10-06 — Message lỗi ô SMS là `Phone is invalid`

**Decision:** message FE khi số ở ô `SMS` sai định dạng (New / Edit contact) giữ nguyên văn `Phone is invalid`; nhãn ô vẫn `SMS`; message BE không đổi. KB-004 (phần "thông báo lỗi dùng chữ SMS") chưa cập nhật theo.
**Why:** Dev chốt qua QA lead sau lượt chạy 05/10.
**Source:** QA Hub MTRO-010 BR-27 (Dev qua Nga 06/10/2026).

## 2026-10-07 — Dựng KB Mailtro theo khuôn KB của QVL

**Decision:** dựng `knowledge-work/kb/MTRO/` theo đúng cấu trúc KB của Qikify Volume (QVL): mỗi màn / module lớn một file `features/NN-<slug>.md` (18 file), cộng `product/` (overview, feature-map, glossary), `decisions/decision-log.md`, `known-issues/known-issues.md`, `testing/` và `dev-references.md`. Khác QVL: viết tiếng Việt, tên UI chép nguyên văn từ inventory, chia feature theo sidebar thật (inventory § 2) thay vì theo help center; Campaigns và Automations tách 2 file mỗi module; Security / Abuse guard (MTRO-92) thành file riêng vì chạm mọi module; mỗi file < 40.000 ký tự để nộp QA Hub nguyên khối.
**Why:** cần một nguồn đọc theo feature cho QA và cho agent (terra / ore / sonder) thay vì ghép từ business-rules + open-questions + inventory + Jira + QA Hub. Thứ tự ưu tiên khi lệch: hệ thống thật (inventory) > rule đã xác nhận / quyết định PO-Dev mới nhất > ticket; chỗ lệch ghi "corrected" kèm nguồn, chỗ thiếu nguồn ghi `Need confirm`. KB **không thay** `business-rules/MTRO.md` — các rule lệch được đánh dấu để chạy `update-business-rules` sau.
**Source:** Hae giao việc 2026-10-07; nguồn đọc liệt kê ở [README](../README.md).
