<!-- testlane knowledge KB-383 · kind=feature-profile · tag=Automation reports · status=draft · sourceUrl=https://github.com/ownego/qa-knowledge-work/blob/ae07d04a61509378493a9a07714b04f4e77a36e6/kb/MTRO/features/13-automation-reports-run-history.md · createdAt=2026-10-08T08:01:15.819Z · updatedAt=2026-10-08T08:01:15.819Z -->

# 13. Automations — Reports · Test this flow · Run history (`/automations/:id/runs`)

**Status:** in-review

Phân tích ngày 2026-10-07 từ: `inventory/MTRO.md` § 2.11-C/D (staging đi thật 01/10/2026 trên automation `Test`, viewport 1680×900; kết quả dry-run giữ 29/09), Jira MTRO-16/61/94 (đọc 07/10; quyết định haptt / PO 21–24/09, chuyenmc 25/09), task QA Hub **MTRO-020** (automation report: 40 case TC-AREP, chưa chạy) và **MTRO-018** (BR-25, BR-28, BR-29 — PO 02/10), `business-rules/MTRO.md` § "Phải Save lần đầu mới có nút Test và View runs" (18/09) và repo `qikify-QA-mailtro` (test-run 03/09, 27/09). Phần list / builder ở [12-automations-list-builder](12-automations-list-builder.md).

## Purpose

Xem một automation đang hoạt động thế nào: bao nhiêu contact vào / hoàn tất, mỗi bước bao nhiêu qua, email trong flow được mở / click / huỷ đăng ký ra sao; tra từng lượt chạy (run) của từng contact, lý do dừng và chạy lại; diễn tập flow trên một contact mà không gửi gì.

## Business Rules

### Reports (rail `Flow` / `Reports`) — MTRO-61 + staging 01/10

- Rail `Reports` chỉ có sau lần Save đầu; flow có thay đổi chưa lưu → rail `Reports` **disabled** + tooltip "Save to see reports" (Dev chuyenmc 25/09, PR #39; staging khớp).
- Panel `Reports`: `Report range` {`Last 7 days` (mặc định), `Last 30 days`, `Custom`} (`Custom` → ô `From` / `To`; lỗi `The end date is before the start date.`); "As of 15:58"; thẻ `Entered` ("contacts that started the flow") · `Completed` ("{rate} of entered").
- Canvas ở chế độ Reports là **read-only**: node mất `Duplicate` / `Delete`, connector mất `+`, không kéo thả, ẩn badge test-run (MTRO-61).
- Overlay trên node: `Entered` / `Passed` + % pass (`—` khi chưa ai vào); node `Send email` thêm `Unique opens` · `Unique clicks` · `Unsubscribes` (% ÷ delivered + số, nút `About …`) và link "{count} unique opens — show these contacts in the run log".
- Panel `Step report`: "Click a step on the canvas to see its numbers."; chọn step → tên, nhãn (`Action` / `Step` / `Trigger`), `Entered` · `Passed` (`Pass rate`) · `Dropped`; Conditional split: `Branches` True / False (÷ entered); Send email: `Email performance` — `Sent` · `Delivered` · `Unique opens` · `Unique clicks` · `Unsubscribes` + bảng `Clicks by link`. Template đã xoá → dòng tên hiện id thô.
- Link sang run log: `/automations/:id/runs?step=<stepId>&event=opened&from=<ISO>`.
- Định nghĩa số (MTRO-16 / MTRO-94, haptt + PO 21–24/09): số trên node / report **unique theo contact**, run log liệt kê **từng lượt** (vào flow 2 lần = 2 dòng); mỗi node `entered = passed + waiting + dropped`; "Passed của step trước là Entered của step sau"; report **cộng mọi version** của flow, khớp theo step (sửa flow không reset về 0); step đã xoá vẫn trả về `in_current_version: false` và **giữ số**; số flow / node tính theo **ngày contact vào flow**, số email theo **ngày gửi**.
- **Không có node Exit** ở BE — kết thúc là `flow.completed` (haptt 24/09; MTRO-94). Canvas staging vẫn vẽ node `Exit` với overlay `Entered N` → xem Edge Cases.

### Test this flow (dry-run) — rule 18/09 + staging + haptt 24/09

- Nút `Test` chỉ có sau lần Save đầu → **không dry-run được flow chưa lưu** (rule 18/09).
- Dialog **Test this flow** — "Rehearse the flow for a real contact — nothing is sent, written, or opened.": ô `Search contacts by name or email...`; không khớp → `No contacts match your search.` (01/10).
- Kết quả (29/09): contact + `Change contact` + bảng `Step` · `Type` · `Status` · `Detail`; action ở trạng thái `Skipped` + "Would …" (vd "Would set `plan_tier`."). Test khi còn thay đổi chưa lưu chạy **bản đã lưu**: "Testing rehearses the last saved version of this flow, not the unsaved edits on screen." Contact đã xoá → "This contact couldn't be found. It may have been deleted." (404).
- Test **chỉ mô phỏng, không tạo log**; run log không có nhãn "Test" (haptt 24/09). `POST automations/{id}/test` (`contact_id`).

### Run history (`/automations/:id/runs`) — staging 01/10

- Breadcrumb `Automations › Run history` · `Back to builder` · h1 tên automation · "Every contact that has walked this flow, newest first."
- Khối `Delivery` — "Every email sent so far. Opens and clicks include repeats; Unsubscribed leaves out anyone who resubscribed.": `Sent` · `Delivered` · `Opens` · `Clicks` · `Bounced` · `Spam complaints` · `Unsubscribed` — **cả đời flow**, không theo range.
- `Search name or email…` (tham số `q`); `Filter by outcome` {`All outcomes`, `In progress`, `Completed`, `Exited`}; không khớp `No runs match these filters.` / "Try a different search or outcome." Chip lọc email khi vào từ Reports (`Unique opens · Send email · Sep 24 – today` + `Clear email filter`).
- Bảng: `Contact` (email, hoặc `Deleted contact`) · `Status` (`Failed` / `Completed` / `Waiting`) · `Last step` (`Send email · Failed`) · `Started` · `Finished` (`—` khi chưa xong); 25 dòng / trang; click dòng → Run detail.
- **Corrected** (so với bộ case 23/09): filter 7 status cũ (có `Skipped`) → `Filter by outcome` 3 outcome; cột `Current step` → `Last step` (inventory § 5.4).
- Trạng thái run (bundle): `Pending` · `Running` · `Waiting` · `Completed` · `Failed` · `Cancelled` · `Skipped`; outcome `Exited` **gồm cả run `Failed`**; trạng thái step `Passed` · `Failed` · `Skipped`.
- **Run detail** (dialog): Contact / Status / Started / Finished; Failed: alert `Why this run stopped` + thông điệp + "Something needs changing before this can get further." + `Retry this run` ("Picks up at the step that failed. A step that already sent its email will not send it again."); bảng `Step` · `Status` · `Detail` · `Occurred at` · `Message ID`. Waiting: thêm `Resumes at`, `Finished` = `Still running`, step Wait "Waiting 3 days."
- Thông điệp đã thấy: "The mail template this step sends no longer belongs to this workspace." (template bị xoá); "The contact this run was for no longer exists." (contact bị xoá khi Waiting → run Failed, vẫn có Retry — 27/09); run Skipped có mục "Why this run did not start" (event do chính flow phát → "…would have looped").
- i18n chưa thấy UI: `No runs yet`; `This one cannot be retried: the recipient has unsubscribed.`; `The run is queued to continue.`; `That run could not be retried.`
- id không tồn tại → alert `Not Found.` + `Retry` (BUG-56).

### Contact unsubscribed / suppressed trong flow — PO/BA 02/10

- Contact **đã unsubscribe** vào flow → run **Failed** (BR-28 MTRO-018).
- Contact **bị suppress** vào flow → run **Completed** và đếm vào `Bounced` / `Spam complaints` của khối Delivery (BR-29) — có tính vào `Sent` không còn mở (GAP-32).
- Pause không huỷ contact đang trong flow, kể cả đang chờ Wait (copy dialog Pause; build-staging 03/09: "pause không dọn contact đã vào"; 1 run / contact tại 1 thời điểm).

## Edge Cases

- Node `Exit` trên canvas + overlay `Entered N` (MTRO-33, MTRO-61) ↔ BE "không có node Exit" (MTRO-16, MTRO-94) — mâu thuẫn ticket; `Need confirm` số trên Exit lấy từ `flow.completed` (GAP-06 MTRO-020; AS-02).
- `Exited` gộp run `Failed` — không lọc riêng được run lỗi — `Need confirm` PO tách (GAP-25 MTRO-018; inventory L64).
- `Retry this run` vẫn hiện với lỗi permanent (template đã xoá) — `Need confirm` Dev (inventory L05; GAP-22).
- Run detail ghi "Took the \`no\` branch." — backtick thô và `yes` / `no` thay nhãn True / False (BUG-58, 27/09; inventory L04).
- Run detail hiện UUID node thay tên step khi Wait đã bị xoá; run vẫn Waiting theo mốc cũ (TC-MTRO-1103) — `Need confirm` (GAP-06 Major: runtime Wait khi Pause / sửa thời lượng / xoá node / worker restart).
- Contact bị xoá khi đang Waiting: cột Contact `Deleted contact`, vẫn có `Resumes at`; khi tới hạn → Failed (27/09) — `Need confirm` ngữ nghĩa (GAP-26).
- Khối Delivery (cả đời) và Reports (theo range) lệch mốc thời gian (Sent 3 vs Sent 2) — `Need confirm` thiết kế (GAP-27; inventory L64).
- Range `Custom` chưa nhập ngày → link sang run log mất `from` (inventory L64).
- Run history cột Contact từng hiện id `N01…` thay email (16/09) — 01/10 đã hiện email.
- Ở 1280×800 click node `Send email` trong Reports bị panel chặn (inventory L06).

## Testability Notes

- Số liệu không tất định trên workspace dùng chung; oracle theo quan hệ số (`entered = passed + waiting + dropped`, unique ≤ total).
- Dry-run an toàn (không gửi / ghi) nhưng chọn contact là chạy thật `POST …/test` — vẫn cần được phép.
- Bộ case `06-automations/automation-report.md` (40 case TC-AREP, task MTRO-020, chưa chạy); phần run history trong `list.md` / `runtime.md` (task MTRO-018).

## Known Issues

See [known-issues.md](../known-issues/known-issues.md) for entries tagged `automations`.

## Related Jira Tickets

- MTRO-61 — Automation report, Story, QA Review — Reports panel, overlay, Step report; quyết định disable Reports khi dirty (25/09).
- MTRO-16 — Analytics, Epic — quyết định số automation (21/09, 24/09).
- MTRO-94 — [BE] Analytic, Story, QA Review — endpoint `/automations/{id}/report`, `/runs` (filter `q`, `outcome`, `step` + `event`, `last_step`), `/runs/{run_id}` (có `emails`).
- MTRO-32 — View automation list (+ run history), Story, QA Review.

## Source

- `inventory/MTRO.md` § 2.11-C/D, L04, L05, L06, L64, § 5.4 — staging 01/10/2026 (dry-run: 29/09).
- QA Hub task MTRO-020 (BR-25…BR-37), MTRO-018 (BR-25, BR-28, BR-29) — đọc 2026-10-07.
- Jira MTRO-16, 32, 61, 94 — đọc 2026-10-07.
- `business-rules/MTRO.md` § "Phải Save lần đầu mới có nút Test và View runs" — 18/09/2026.
- Repo `qikify-QA-mailtro`: test-run `06-automations/2026-09-03…`, `2026-09-27-*-lot3…lot6`; `docs/manual-testcases/06-automations/automation-report.md`.
