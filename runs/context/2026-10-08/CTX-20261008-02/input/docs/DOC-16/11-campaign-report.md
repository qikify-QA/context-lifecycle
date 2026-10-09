<!-- testlane knowledge KB-381 · kind=feature-profile · tag=Campaign report · status=draft · sourceUrl=https://github.com/ownego/qa-knowledge-work/blob/ae07d04a61509378493a9a07714b04f4e77a36e6/kb/MTRO/features/11-campaign-report.md · createdAt=2026-10-08T08:01:13.044Z · updatedAt=2026-10-08T08:01:13.044Z -->

# 11. Campaign report (`/campaigns/:id/report`) & Analytics API

**Status:** in-review

Phân tích ngày 2026-10-07 từ: `inventory/MTRO.md` § 2.10-C (staging đi thật 01/10/2026 trên campaign Sent 30/09 và Sent 09/09, report Draft), Jira MTRO-16/31/60/94/96/97 (đọc 07/10; quyết định PO / Dev trong comment 17/09 → 25/09), task QA Hub **MTRO-020** (Not Ready 10/14, 11 GAP Major; 158 case gồm campaign report + automation report + analytics API — chưa chạy case nào), `business-rules/MTRO.md` § "Sáu số delivery của campaign tính lúc đọc" (07/09) và repo `qikify-QA-mailtro` (`05-campaigns/campaign-report.md` 73 case, `09-api/analytics-api.md` 45 case). Phần report của automation ở [13-automation-reports-run-history](13-automation-reports-run-history.md).

## Purpose

Cho marketer xem hiệu quả một campaign đã gửi: giao tới bao nhiêu, mở / click / huỷ đăng ký / báo spam bao nhiêu, ai là audience lúc gửi và nội dung đã gửi. API analytics phục vụ cả UI lẫn Claude MCP (MTRO-60).

## Business Rules

### Định nghĩa số liệu — Epic MTRO-16 + quyết định PO / Dev 17–24/09

- **Sent** = số mail SES đã nhận · **Delivery rate** = delivered ÷ sent · **Open rate** = người mở (bỏ bot) ÷ delivered · **Click rate** = người click (bỏ bot) ÷ delivered, **không tính** link unsubscribe / preference · **Click-to-open** = người click ÷ người mở · **Bounce rate** = bounce ÷ sent (tách hard / soft) · **Spam complaint rate** = complaint ÷ delivered · **Unsubscribe rate** = unsubscribe ÷ delivered.
- Gộp nhiều cấp: cộng số đếm trước rồi mới chia; rate luôn kèm số đếm.
- Mọi số là **người** (unique contact), trừ `total_opens` / `total_clicks` (MTRO-94; PO 18/09). Click rate tính theo người; report có cả total và unique clicks (PO 18/09).
- 1 link = 1 tag (PO 17/09); Clicks by link gộp theo tag, không tag thì theo link gốc trong template — link có merge tag (`?ref={{contact_id}}`) **không** bị tách (haptt 24/09). Vòng này chỉ hiện Clicks by link.
- Unsubscribe chỉ tính unsubscribe **global** gắn campaign có link; bỏ một topic không tính (17/09). Trang global đếm unsubscribe theo ngày event, resubscribe không trừ.
- Rate tính theo **ngày gửi**; trang global **chỉ hiện số đếm, không rate** (PO 21/09).
- **Out of scope** (haptt 18/09, PO đồng ý): performance theo segment (campaign chỉ 1 segment), inbox placement (cần bên thứ ba), click heatmap, số opt-out theo topic.
- 6 số raw `delivered`, `bounced`, `complained`, `unsubscribed`, `opens`, `clicks` tính bằng COUNT trên `ses_events` + 2 sổ ledger lúc đọc, không counter, không cache; FE tự tính rate (rule 07/09, MTRO-82).
- SES gắn `isBotEvent` (Likely / Unlikely) từ 07/08/2026; lọc bot dựa trường `is_bot_event` (Epic).

### Report campaign Sent — staging 01/10 (khớp MTRO-31 với vài điểm corrected)

- Mở bằng click dòng `Sent` ở list (`Draft` / `Scheduled` mở builder) (MTRO-31).
- Header: h1 tên · "`Sent on Sep 30, 2026 16:00 · as of 16:23`"; **không** có subtitle, **không** có nút `Duplicate` / `Stop send`.
- 5 tab `Overview` · `Deliverability` · `Opens` · `Clicks` · `Unsubscribe`, mặc định Overview. Thẻ metric có chi tiết → tooltip khi hover / focus (MTRO-31); bấm thẻ không mở gì (29/09).
- **Overview**: `Campaign performance` 4 thẻ `Delivery rate` · `Open rate` · `Click rate` · `Unsubscribe rate`. `Campaign audience`: tên segment + điều kiện read-only theo **snapshot lúc bắt đầu gửi** (`segment_rules_snapshot`), không phải segment hiện tại; i18n "Segment edited since this send —" + `see it as it is now`, "Segment deleted since this send.", "This audience uses rules too complex to show as cards.". `Campaign content`: iframe `Preview the email` + `Click to preview` + `Subject` / `Preview text` (`Not set`) / `From` / `Reply-to` (`Same as sender (…)`).
- Dialog preview: h2 Subject · From · "This is the email exactly as it was submitted, kept separately from the design — so editing or deleting the template afterwards does not change it. Merge tags appear as written, because what each recipient received is not stored per address." → merge tag hiện thô là **theo thiết kế** (inventory L02, L68).
- **Deliverability**: `Sent to` (`of N recipients`; khi đang gửi `so far, of …`) · `Delivered` (`100% of 3 sent`) · `Delivery rate` · `Bounce` ("Hard bounces leave the list automatically."); bảng `Bounce reasons` (`No bounces recorded.`; i18n 10 nhãn lý do như `Address doesn't exist`, `Mailbox full`).
- **Opens**: `Total opens` ("every open, the same person counted again") · `Unique opens` ("people who opened") · `Open rate` (`3 of 3 delivered`); `Opens over time (first 24h)` — biểu đồ + bảng 8 khối 3 giờ.
- **Clicks**: `Total clicks` · `Unique clicks` · `Click rate` · `Click-to-open` (`1 of 3 openers`); bảng `Clicks by link` (`Link` · `Unique clicks` · `Total clicks`).
- **Unsubscribe**: `Unsubscribe` ("left all email") · `Unsubscribe rate` · `Spam complaint` ("reported as spam") · `Spam complaint rate`.
- Caveat (i18n): "Machine opens (Apple Mail Privacy, scanners) are excluded…", "Bot clicks and unsubscribe links are excluded.", "Gmail does not report complaints per recipient, so this undercounts Gmail."
- Campaign gửi trước pipeline (≤ 09/09): 4 thẻ Overview đều `—`, list `—` (inventory BR-43 MTRO-020).

### Report campaign chưa gửi xong — staging 01/10

- Mở thẳng `/campaigns/<id draft>/report` vẫn vào được: badge `Draft` + "Results for this campaign. Only a draft can be edited — duplicate it to change anything here." + **4 tab cũ** `Overview` / `Recipients` / `Content` / `Settings`; Overview "The detailed report — delivery, opens, clicks and unsubscribes — appears once the campaign has been fully sent."; Settings: `Subject` · `Preview text` · `From` · `Reply-to` · `Created by` · `Sent at` (`Not set`).
- **Corrected**: bố cục 4 tab (16/09) chỉ còn ở report chưa gửi xong; campaign Sent dùng 5 tab — tab `Recipients` (Handed over / Attempts / Last message), `Content`, `What recipients saw` không còn chỗ xem cho campaign Sent (inventory L23, L69).
- Bundle (chưa đối chiếu UI): khối `Send progress` (Recipients / Accepted / Rejected / Remaining, "The provider is pacing this send…"), bảng `Recipients of this send`, `Stop send` / `Resume send` (confirm `Stop this send?` / `Resume this send?`), `This campaign never went out` ("Nobody was mailed…").
- id không tồn tại → khung trống (h1 `Campaign`), **không** có `Not Found.` như module khác (inventory L69).

### Analytics API — MTRO-94 (QA Review)

- `GET /api/teams/{slug}/campaigns/{id}/report`; list campaigns có `report: {sent, delivered, unique_opens}`; `/campaigns/{id}/broadcast` có segment, template, snapshot rules; `/automations/{id}/report`, `/report/steps/{step_id}`, `/runs`, `/runs/{run_id}`; `GET /api/teams/{slug}/analytics?scope=all|campaigns|automations`.
- Thời gian gửi lên API luôn **UTC+0** dạng `2026-10-01T07:00:00` (có / không `Z`); kèm offset, chỉ ngày hoặc dạng tương đối → **422**.
- API chỉ trả số đếm; FE tính rate, chặn chia 0. Số tăng dần theo thời gian → luôn có `as_of`, không cache.
- Trang global: `totals` có thể **nhỏ hơn** tổng `sources` (1 người nhận cả campaign lẫn automation tính 1); không tính transactional.
- Quyền: scope `campaigns` cần `campaigns:read`, `automations` cần `automations:read`, `all` cần cả hai; thiếu → **403**. Campaign chưa gửi → report **404**.

## Edge Cases

- Status nào mở report (Running / Partly sent / Cancelled / Failed); "so far" hiện khi nào — `Need confirm` (GAP-01 Major MTRO-020); staging không có campaign ở các status này để kiểm.
- Tab Recipients / Settings / "What recipients saw" bỏ hẳn hay tạm ẩn ở campaign Sent; danh sách người nhận + cảnh báo gửi qua shared host xem ở đâu — `Need confirm` PO (GAP-02 Major; inventory L23).
- Lọc bot áp cho Total opens / clicks không; event trước 07/08/2026 — `Need confirm` (GAP-03 Major).
- Có trang `/analytics` UI không (route hiện trắng) — `Need confirm` (GAP-05 Major); hiện chỉ test ở mức API.
- Backfill số cho campaign gửi trước pipeline đã chạy chưa; `—` là thiết kế hay thiếu backfill — `Need confirm` (GAP-10 Major). BUG-SUPP-03: có đủ 6 số vẫn hiện `—` + "the backend records none yet" — chờ chốt `—` hay `0`.
- Contact suppressed trong campaign có đếm vào Bounce / Spam complaint và mẫu số Sent không — `Need confirm` (GAP-21 Major). (Automation: PO 02/10 chốt suppressed → run Completed + đếm Bounced / Spam complaints.)
- `{{preferences_url}}` có bị loại khỏi Click rate không (caveat staging chỉ nêu unsubscribe) — `Need confirm` (GAP-23).
- Draft vào được `/report` — `Need confirm` PO (GAP-19); id lạ khung trống (GAP-20).
- Biểu đồ Opens: dòng headline "{total_opens} opens from {unique_opens} people" là số all-time trong khi cột chỉ 24h đầu — known, chưa chốt cách sửa (MTRO-97, To Do).
- Audience card báo "too complex" khi field đã bị xoá — known, cần copy "field removed" (MTRO-96, To Do).
- Campaign 30/09 lưu tag một ngoặc: người nhận có thấy tag thô / link Huỷ đăng ký chết không — `Need confirm` Dev (GAP-22; inventory L68).
- Lệch biên ngày UTC ↔ UTC+7 khi so số theo range (RISK-06).

## Testability Notes

- Khó tạo event có kiểm soát (bot, Apple MPP) → oracle theo **quan hệ số** (unique ≤ total, rate = đếm ÷ mẫu) thay vì số tuyệt đối; data dùng được chỉ là campaign Sent từ 28/09.
- Hai bộ case chồng nhau đã gộp vào task MTRO-020: `05-campaigns/campaign-report.md` (73 case TC-CREP, 50 To be automated / 23 Manual) — `report.md` cũ (4 tab) không dùng nữa từ 02/10; `09-api/analytics-api.md` (45 case TC-ANAPI, chỉ test mức API).
- 14 case blocked vì thiếu campaign Running / Partly sent / Cancelled / Failed.

## Known Issues

See [known-issues.md](../known-issues/known-issues.md) for entries tagged `campaign-report`.

## Related Jira Tickets

- MTRO-16 — Analytics, Epic, To Do — định nghĩa metric + quyết định trong comment 17–24/09.
- MTRO-31 — Campaign detail report, Story, QA Review — spec 5 tab.
- MTRO-94 — [BE] Analytic, Story, QA Review — endpoint, UTC, quyền, 404.
- MTRO-60 — MCP for report, Story, In Progress — trống.
- MTRO-96 — Campaign report: "field removed" instead of "too complex", Task, To Do — hiện tượng đã biết.
- MTRO-97 — Opens chart headline uses all-time totals, Task, To Do — hiện tượng đã biết.
- MTRO-82 — Broadcast delivery metrics: six raw counts, Task, DONE.

## Source

- `inventory/MTRO.md` § 2.10-C, L02, L23, L68, L69 — staging 01/10/2026.
- QA Hub task MTRO-020 (notes 28/09 + 02/10; 158 case: 14 blocked · 144 not-run) — đọc 2026-10-07.
- Jira MTRO-16, 31, 60, 82, 94, 96, 97 — đọc 2026-10-07.
- `business-rules/MTRO.md` § "Delivery metrics & Portal API" — 07/09/2026.
- Repo `qikify-QA-mailtro`: `docs/manual-testcases/05-campaigns/campaign-report.md`, `09-api/analytics-api.md`, `docs/bugs/02-contacts/2026-09-08-suppression-bug-log.md` (BUG-SUPP-03, 05).
