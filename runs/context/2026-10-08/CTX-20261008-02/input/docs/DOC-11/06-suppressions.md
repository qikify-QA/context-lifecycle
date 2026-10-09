<!-- testlane knowledge KB-376 · kind=feature-profile · tag=Suppression · status=draft · sourceUrl=https://github.com/ownego/qa-knowledge-work/blob/ae07d04a61509378493a9a07714b04f4e77a36e6/kb/MTRO/features/06-suppressions.md · createdAt=2026-10-08T08:01:06.118Z · updatedAt=2026-10-08T08:01:06.118Z -->

# 6. Suppressions (Bounce & complaint · Unsubscribe) và pipeline sự kiện SES

**Status:** in-review

Phân tích ngày 2026-10-07 từ: `business-rules/MTRO.md` (§ "Bounce / Complaint — quyết định suppress", § "Suppression trong luồng gửi", § "SES event pipeline", § "Delivery metrics & Portal API", § "Điều kiện dựng dữ liệu suppression phụ thuộc tầng test" — rule 07/09–08/09/2026, nguồn MTRO-64/74…83), `open-questions/MTRO.md` § Bounce / Complaint & Suppression và § "Phân quyền 2 API", `inventory/MTRO.md` § 2.6 (staging 01/10/2026), task QA Hub **MTRO-015** (notes dạng cũ, không có BR/GAP ID; 65 case: 13 pass · 25 blocked · 27 not-run), Jira MTRO-17/64/66/67/68/74…83/92 (đọc 07/10), repo `qikify-QA-mailtro` (`docs/bugs/02-contacts/2026-09-08-suppression-bug-log.md`, 5 lượt chạy 08–09/09). Các rule BE dưới đây đều **đã xác nhận** ở mức "rule trong business-rules có nguồn task Jira" — nhưng hầu hết chỉ có trong ticket kỹ thuật, chưa có AC.

## Purpose

Bảo vệ reputation gửi của Mailtro: tự chặn gửi tới địa chỉ chết (hard bounce, 7 soft bounce liên tiếp) và người báo spam, tôn trọng người tự huỷ đăng ký, đồng thời cho marketer xem ai đang bị chặn và vì sao. Có **hai sổ độc lập**: sổ **consent** (`unsubscribes` — người nhận tự opt-out) và sổ **deliverability** (`suppressions` — bounce / complaint).

## Business Rules

### Trang Suppressions (`/contacts/suppressions`) — staging 01/10

- Vào từ Contacts › `Suppressions`; subtitle "Addresses this workspace can't email — and why. Every send skips them automatically."
- Tab `Bounce & complaint` ("These addresses are skipped by every campaign and automation."): bảng `Email` (+ `Copy {email}`) · `Reason` (`Bounced` / `Spam complaint`) · `Blocked since`; `Rows per page` {10, 20, 25, 50, 100}, mặc định 25. Số trên tab hiện `0` / trống lúc đang tải.
- Tab `Unsubscribe` (URL `?tab=unsubscribe`, "These people opted out themselves — their choice stands until they resubscribe."): `Email` · `Opt-out from` (`Footer link` / `Other` / `One-click header` / `Added by staff`) · `Unsubscribed on`. Contact bị đánh unsubscribed qua import CSV có nguồn `Other`.
- Empty (i18n): `Nothing is blocked` / `Nobody has opted out`.
- **Không có nút gỡ / resubscribe** ở cả hai tab (inventory L16) — chỉ xem. Gỡ chỉ qua Portal API (bên dưới).

### Quyết định suppress — rule 07/09 (MTRO-64, 76, 77)

- **Hard bounce** (`bounceType = Permanent`) → row `suppressions` `reason = hard_bounce` **ngay, vĩnh viễn**. **Complaint** → `reason = complaint` ngay, vĩnh viễn. Lý do: AWS siết / treo quota khi bounce > ~5%, complaint > ~0.1%.
- **Soft bounce** (`Transient`) → `soft_bounce_counters` của `(team_id, email)` +1; đủ **7 lần liên tiếp** → `reason = soft_bounce` + xoá counter (ngưỡng theo Klaviyo; SES không tự xử lý soft bounce). Một event **Delivery xoá hẳn counter** (reset về 0).
- Mỗi `(team_id, email)` chỉ 1 row active (soft-delete + partial unique); **verdict đầu tiên thắng** (hard bounce rồi complaint → reason vẫn `hard_bounce`); row đã gỡ giữ làm audit, event mới vẫn tạo được row mới.
- Suppression **không tự gỡ** khi contact resubscribe — chỉ gỡ thủ công qua Portal API (chủ ý, giống Klaviyo).
- Gỡ = soft-delete row **+** job `DeleteSuppressedDestination(email)` cho mọi `sending_account_regions` active (≤10 lời gọi, idempotent, `NotFound` = no-op), có retry, lỗi cuối → `AdminNotification`. Thiếu bước quét SES → lần gửi sau SES chặn, sinh `bounceSubType = Suppressed`, row bị tạo lại (**ghost loop**) (MTRO-80).
- DB per-team `(team_id, email)`; SES account-level suppression list (`BOUNCE + COMPLAINT`, bật trên cả 2 AWS account) là lưới **account-global**; bảng `suppressions` không có cột region — provenance ở `ses_events`; task import một lần kéo entry SES vào `suppressions` (MTRO-79, 80).

### Suppression trong luồng gửi — rule 07/09 (MTRO-78)

- `SuppressionChecker` tra **cả hai sổ** (`unsubscribes` + `suppressions`) theo reason-set của từng sending lane; lane marketing chặn trên cả hai; automation dùng chung send stack.
- Segment preview / count loại contact bị suppress (`whereNotExists` trong `ContactsResource::baseQuery`) — ảnh hưởng mọi màn dùng query đó (xem [04-segments](04-segments.md), [03-contacts](03-contacts.md)).
- Quan sát 08–09/09: contact bị suppress bị loại khỏi segment count / preview, Recipients và lần gửi sau nhưng **vẫn còn** ở màn Contacts (Consent vẫn `Subscribed`, chỉ detail ghi Deliverability bounced); danh sách người nhận chốt lúc dựng; độ trễ send → suppression 8–62 giây; gửi lại campaign đã `sent` → 403 (campaign one-shot); gỡ suppression đã gỡ → 404.
- Automation (PO 02/10, MTRO-018): contact **unsubscribed** → run `Failed`; contact **suppressed** → run `Completed` và đếm vào Bounced / Spam complaints (BR-28, BR-29) — xem [13-automation-reports-run-history](13-automation-reports-run-history.md).

### SES event pipeline — rule 07/09 (MTRO-74, 75, 83)

- SNS → SQS → worker, 10 nguồn (5 region × 2 AWS account), raw message delivery OFF; validate chữ ký SNS, whitelist `TopicArn` theo `sending_account_regions.sns_topic_arn`, tự xử lý `SubscriptionConfirmation`; event không khớp whitelist / không có tag attribution → **log + drop**.
- `ses_events` lưu mọi loại event (kể cả open / click native) kèm attribution (`team_id`, `campaign_id`, `campaign_broadcast_recipient_id`), `source_domain`, trường chẩn đoán; **không** lưu raw payload, **không** có bảng analytics riêng — mọi số thống kê là COUNT trên bảng này.
- Heartbeat `last_event_at`; scheduled command cảnh báo (`AdminNotification` + Slack) khi region chưa từng nhận event hoặc câm bất thường.

### Delivery metrics & Portal API — rule 07/09 (MTRO-81, 82)

- `CampaignBroadcastResource` trả 6 số raw `delivered`, `bounced`, `complained`, `unsubscribed`, `opens`, `clicks`, tính lúc đọc, không counter, không cache; FE tự tính tỉ lệ (dùng ở [11-campaign-report](11-campaign-report.md)).
- Portal API: `GET teams/{team}/suppressions` (phân trang, lọc reason) · `DELETE …/suppressions/{id}` (kích hoạt sweep SES) · `GET teams/{team}/unsubscribes` (sổ consent độc lập, trả cả entry không có contact khớp) · `DELETE …/unsubscribes/{id}` (resubscribe do marketer, **bắt buộc ghi actor** — nhạy cảm pháp lý).
- **Corrected theo staging 08/09**: route thật là `deliverability-suppressions` (AC ghi `suppressions` → 404) — BUG-SUPP-02 chờ PO/Dev chốt đổi AC hay route. API chỉ GET / HEAD (+ DELETE item); `POST …/unsubscribes` → 405.
- Phân quyền mặc định tạm: **xem = mọi member, gỡ = admin / owner**, chờ PO (Thương) chốt — chặn phải ở API.

### Unsubscribe link — Jira MTRO-17 / 66 / 67 (một phần đã DONE)

- Quyết định 24/08 (MVP Sprint 4): footer unsubscribe tự động ở **mọi** campaign marketing, không áp dụng transactional; link tới trang xác nhận tự host, unsubscribe **ngay**, không survey; contact đã unsubscribe không hiện trong segment (MTRO-17, MTRO-66 QA Review).
- One-click header `List-Unsubscribe` + `List-Unsubscribe-Post` (RFC 8058) cho bulk send, chỉ khi sender domain đã xác thực và không phải transactional; 2 header được DKIM-sign (MTRO-67, 68 — DONE). Ghi chú PO 24/08: "chưa work ngay vì domain cần gửi đủ nhiều thì Gmail mới support".
- Merge tag `{{unsubscribe_url}}` (picker Email editor, nhóm System — "The recipient's personal unsubscribe link."); BE tự chèn link khi email không có (build-staging overview 03/09). Trang unsubscribe công khai dạng `/u/{token}` (build-staging overview 03/09 — chưa đối chiếu staging).

### Dựng dữ liệu test — rule 08/09 (hiệu chỉnh điều kiện test)

- E2E campaign: contact → segment → campaign có template có nội dung → send → quan sát event. Integration / unit: fixture DB hoặc event có attribution hợp lệ (envelope SNS ký hợp lệ nếu đi qua worker). Unsubscribe E2E: gửi tới hộp thư QA rồi bấm link — không đồng nhất unsubscribe với event bounce / complaint. API đọc / xoá dùng data có sẵn hoặc seed.
- **Bắt buộc chỉ dùng AWS SES mailbox simulator** khi test bounce / complaint (`bounce@`, `complaint@`, `success@`, `ooto@`, `suppressionlist@` + `simulator.amazonses.com`, tạo nhiều địa chỉ bằng nhãn `+`); không dùng email thật / bịa (haptt 03/09 MTRO-64; MTRO-92 §0). Simulator vẫn tính vào hạn mức mail/ngày; complaint về chậm tới 15 phút.

## Edge Cases

- Rule soft bounce gần như không kích hoạt vì Delivery reset streak về 0 — `Need confirm` PO chủ ý hay thiếu sót (open-questions).
- Một team gỡ suppression làm địa chỉ rời danh sách SES account-global → team khác mất lớp bảo vệ — `Need confirm` PO / Dev (open-questions).
- Phân quyền xem / gỡ của 2 API — `Need confirm` PO (Thương) (open-questions; MTRO-81).
- UI có nút gỡ / resubscribe không, hay chỉ API — `Need confirm` PO (inventory L16; GAP-14 MTRO-010).
- Địa chỉ trên SES account-level suppression list sinh row ở tầng ứng dụng `reason = hard_bounce` (TC-MTRO-601, 09/09) — `Need confirm` Dev đúng Expected.
- Event `bounceSubType = Suppressed` mang reason gì; `complaintFeedbackType` nào cũng suppress hay chỉ `abuse`; chuẩn hoá email (hoa thường, plus-addressing) khi so sổ; SQS at-least-once có dedupe không — `Need confirm` Dev (MTRO-015 câu hỏi mở).
- Import CSV lại contact đang bị suppress có báo không — `Need confirm` (GAP-10 MTRO-025).
- Campaign Draft gọi `GET /campaigns/{id}/broadcast` → 404 thay vì 6 số 0 (BUG-SUPP-05) và report hiện `—` thay vì `0` (BUG-SUPP-03) — `Need confirm` PO thiết kế.
- Campaign dùng template rỗng (`data: []`) → 500 khi Send (BUG-SUPP-01, P0, 08/09).
- Link unsubscribe trong mail: BUG-SUPP-06 (P0, 08/09: không bật được, `rendered_html` không có link) có dấu hiệu đã khắc phục (06/10 có contact Unsubscribed "via Footer link") — **cần retest** chính thức.
- Đường gửi hỏng toàn bộ (BUG-SUPP-04, 08/09) — **không tái hiện 09/09** (15/15 `sent`), đề nghị đóng, chờ Dev xác nhận.
- Simulator không có địa chỉ soft bounce và không chọn được `complaintFeedbackType` → "7 soft bounce", "first verdict wins" chỉ test được bằng fixture DB.
- Epic MTRO-64 ghi B2 (soft bounce) và B6 (delivery breakdown) là "Later" nhưng task MTRO-77, MTRO-82 đã DONE — mâu thuẫn ticket nội bộ.

## Testability Notes

- 25 / 65 case blocked vì thiếu AWS credential (SQS, SNS, log worker) và quyền đọc / ghi DB staging (`soft_bounce_counters`, `sending_account_regions`) — R36 chưa được cấp.
- Workspace QA không có sending domain verified nhưng vẫn gửi được qua borrowed sender (`sender_is_borrowed: true`, From thật = `<owner>@mailtro.ai`) — dùng để dựng data gửi thật.
- Template duy nhất có nội dung trên workspace (08/09) từng là id `M01M0C4RK2RE06YH6Y7FAB3W821`; template rỗng gây BUG-SUPP-01.
- Bộ case `02-contacts/suppression.md` (73 case; P0 48 / P1 19 / P2 2), task MTRO-015; ID QA Hub = TC-MTRO-(579 + số TC-SUPP).

## Known Issues

See [known-issues.md](../known-issues/known-issues.md) for entries tagged `suppressions`.

## Related Jira Tickets

- MTRO-64 — Bounce/Complaint, Epic, To Do — use case B1–B9; comment haptt 03/09 "chỉ test bằng địa chỉ giả lập".
- MTRO-74 — SES event ingestion pipeline (10 sources), Task, DONE.
- MTRO-75 — ses_events table, Task, QA Review.
- MTRO-76 — Suppressions ledger: hard bounce + complaint suppress immediately, Task, QA Review.
- MTRO-77 — Soft bounce counter: suppress after 7 consecutive, Task, DONE.
- MTRO-78 — Wire suppressions into send path + segment exclusion, Task, DONE.
- MTRO-79 — Enable SES account-level suppression + one-time import, Task, QA Review.
- MTRO-80 — Manual unsuppress with SES sweep propagation, Task, DONE.
- MTRO-81 — Portal APIs: suppression list + unsubscribe list (view & remove), Task, QA Review — phân quyền chưa chốt.
- MTRO-82 — Broadcast delivery metrics: six raw counts, Task, DONE.
- MTRO-83 — Silent-region alarm, Task, DONE.
- MTRO-17 — Unsubscribe, Epic, To Do; MTRO-66 footer link (QA Review); MTRO-67 one-click header (DONE); MTRO-68 DKIM-sign headers (DONE); MTRO-69 cập nhật consent (To Do); MTRO-71 dừng automation khi unsubscribe (To Do); MTRO-72 analytics unsubscribe (To Do).

## Source

- `business-rules/MTRO.md` (các mục Bounce / Suppression / SES / Portal API) — 07/09 và 08/09/2026; `open-questions/MTRO.md`.
- `inventory/MTRO.md` § 2.6, L16, L43 — staging 01/10/2026.
- QA Hub task MTRO-015 (notes + 65 case), MTRO-018 (BR-28, BR-29 PO 02/10) — đọc 2026-10-07.
- Jira MTRO-17, 64, 66–69, 71, 72, 74–83, 92 — đọc 2026-10-07.
- Repo `qikify-QA-mailtro`: `docs/bugs/02-contacts/2026-09-08-suppression-bug-log.md`; test-run `02-contacts/2026-09-08-suppression-*`, `2026-09-09-suppression-manual-run.md`; `docs/build-staging-feature-overview.md` (03/09); `docs/manual-testcases/02-contacts/suppression.md`.
