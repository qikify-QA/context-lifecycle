<!-- testlane knowledge KB-388 · kind=feature-profile · tag=Abuse guard · status=draft · sourceUrl=https://github.com/ownego/qa-knowledge-work/blob/ae07d04a61509378493a9a07714b04f4e77a36e6/kb/MTRO/features/18-security-abuse-guard.md · createdAt=2026-10-08T08:01:22.100Z · updatedAt=2026-10-08T08:01:22.100Z -->

# 18. Security & Abuse guard (BE xuyên suốt — MTRO-92)

**Status:** draft

Phân tích ngày 2026-10-07 từ Jira **MTRO-92 "[BE] Security"** (Story, QA Review, không epic; case QA nằm trong description theo comment haptt 23/09), task QA Hub **MTRO-019** (Not Ready 10/14, 10 GAP Major; 164 case **chưa chạy**; BR-01…BR-45 đều **theo ticket**, chưa có PO/Dev xác nhận thêm), đối chiếu với `inventory/MTRO.md` (staging 29/09–01/10) và các feature liên quan. Status `draft` vì: chưa có trang / tài khoản staff để đi, chưa biết staging đang ở chế độ **tự dừng** hay **chỉ cảnh báo** (GAP-01), và một số mục mâu thuẫn trực tiếp với hệ thống thật (đăng nhập mã email, merge tag một ngoặc). Không phải một màn trên sidebar — gom ở đây vì chạm nhiều module; các file feature link về đây.

## Purpose

Chống lạm dụng gửi mail và bảo vệ tài khoản: chặn đăng nhập / đăng ký tự động, giới hạn mời thành viên, quản lý API key an toàn, kiểm nội dung email, **tự dừng gửi** workspace có bounce / complaint cao, cảnh báo khối lượng bất thường cho staff, và quy tắc link huỷ đăng ký trong mail giao dịch.

## Business Rules

> Tất cả theo description MTRO-92 (chưa xác nhận trên staging trừ khi ghi khác). Mục nào lệch hệ thống thật có ghi "corrected / mâu thuẫn".

### §0 Quy tắc test

- **Bắt buộc chỉ dùng AWS SES mailbox simulator** khi test bounce / complaint (`success@`, `bounce@`, `complaint@`, `ooto@`, `suppressionlist@` + `simulator.amazonses.com`, tạo nhiều địa chỉ bằng nhãn `+NNN`); tuyệt đối không dùng email thật / bịa / domain lạ. Địa chỉ đã bounce / complaint bị chặn gửi lại trong workspace → mỗi lượt dùng nhãn mới. Simulator vẫn tính hạn mức mail / ngày; complaint có thể về chậm tới 15 phút.
- Tài khoản cần: 1 Owner có domain gửi đã xác thực, 1 tài khoản khách thứ 2, 1 staff có quyền nhóm **Security**, 1 staff không có quyền. Hỏi Dev trước khi test §5, §8: chế độ tự dừng hay chỉ cảnh báo, có hạ ngưỡng không.

### §1 Đăng nhập / đăng ký

- Sai mật khẩu và email không tồn tại → **cùng một** thông báo (khớp staging 20/08). >10 lần đăng nhập / phút / email → chặn tạm 1 phút (khớp 20/08).
- TOTP: bật cần mật khẩu → QR → mã đầu → **8 recovery code** dùng một lần; tắt cần mật khẩu (khớp staging — xem [15-account-settings-2fa](15-account-settings-2fa.md)).
- Captcha ở đăng ký + quên mật khẩu; lỗi "The captcha could not be verified. Please try again."; >10 đăng ký / phút / mạng → chặn tạm. **Corrected 23/09**: copy lỗi Turnstile trên staging là `The security check couldn't load…` / `The security check failed. Please try again.`
- **Mâu thuẫn — mã email khi đăng nhập**: ticket ghi tài khoản không bật TOTP vẫn phải nhập **mã 6 số gửi qua email** (hết hạn 10 phút, gửi lại cooldown ~60 giây, sai cùng mã 5 lần → về form "That code has expired or been used up", khoá nhập "Too many incorrect codes. Try again in N seconds", F5 → về form, email có câu cảnh báo). Staging 23/09 + bundle 29/09 **không có** email OTP; MTRO-88 ghi email code là out-of-scope → `Need confirm` Dev (GAP-03 Major; AS-01: nếu bật sẽ làm vỡ spec `tests/01-auth`).

### §2 Mời thành viên

- Tên workspace trong email mời hiện dạng chữ, không thành link. Mời trùng khi lời mời còn hạn → "An invitation for this email is already pending."; huỷ rồi mời lại được.
- Tối đa **3 lời mời / hộp thư / ngày** (gộp biến thể `+tag`, dấu chấm Gmail); >20 lời mời / phút → chặn tạm.

### §3 API key

- Key hiện **một lần duy nhất** (khớp staging 29/09). Giới hạn IP / dải IP → gọi từ IP khác 403 (staging 29/09 **chưa thấy** ô allowlist trong dialog Create API key).
- **Rotate**: key mới hiện 1 lần, key cũ chạy thêm **24 giờ**, key mới giữ allowlist (khớp staging). **Revoke** ngừng ngay. Rotate key đã revoke → "A revoked API key cannot be rotated."
- Staff **Report as leaked** → key **paused** (403 "key paused"), khách không tự mở; **Put back** mở lại. Trạng thái key: active · paused · expired · revoked.
- Workspace Sending suspended → không tạo key mới (rotate / revoke vẫn được); Disabled → chỉ xem.

### §4 Kiểm nội dung email

- Template có `<script>`, `on*=`, `javascript:` → không lưu ("The data contains content that is not allowed for security reasons (…)"); `data:image` cho phép.
- Link có URL **bắt đầu bằng merge tag** (`href="{contact.attr.cta_url}"`) → Send / Test send bị từ chối ("The body contains a link whose URL begins with a merge tag…"); merge tag sau phần URL cố định thì được.
- Merge tag không điền được (thuộc tính chưa tạo, workspace khác, `{order_id}`, `{change.keys}`) → Send / Test send bị từ chối, nêu tên tag.

### §5–§6 Tự dừng gửi & trạng thái workspace

- Xét trong 24 giờ, quét ~5 phút / lần, **chỉ khi workspace đã gửi ≥1.000 mail**: hard bounce **≥20 và >3%**, hoặc complaint **≥5 và >0,05%**.
- Vượt ngưỡng (chế độ tự dừng) → **Sending suspended**, Signal `Bounce rate` / `Complaint rate`, email cho Owner, banner "Sending from this workspace is paused", vào **Abuse queue**. Chế độ chỉ cảnh báo → vẫn gửi, tạo **Abuse alert**.
- Sending suspended **chặn**: gửi campaign, Test send, Resume campaign, transactional API, thêm / sửa contact, bật automation, mời thành viên, thêm domain, tạo API key, chuyển Owner, Owner tạo workspace mới ("A workspace you own is stopped, so you cannot create another one right now."); thông báo "Sending is paused for this workspace."
- Suspended **vẫn cho**: xem mọi thứ, xoá contact / campaign / template / segment / API key, huỷ campaign, pause automation, lưu nháp, rotate / revoke key, quản lý thành viên, đổi tên workspace.
- Campaign đang gửi dở khi bị dừng: phần còn lại không gửi, sau Reinstate **không tự chạy** — phải bấm **Resume**. Automation: contact vẫn vào nhưng không mail nào đi, sau Reinstate chạy tiếp đúng chỗ.
- **Disabled**: mọi thao tác trừ xem bị chặn (kể cả xoá / huỷ) — "This workspace is closed and is read-only."; accept lời mời bị từ chối "This workspace is closed and is not accepting members."
- Reinstate: gửi lại ngay, chỉ mail **sau** mốc reinstate được tính (`Evaluated from`); bị dừng lần 2 → `Times stopped` = 2 (đỏ).
- Trạng thái workspace: **Sending** / **Sending suspended** / **Disabled**. Signal: Bounce rate · Complaint rate · Volume anomaly · Dormant wake · Manual.

### §7–§8 Màn staff & cảnh báo khối lượng (trang quản trị riêng — AS-03)

- Abuse queue (cột Status, Signal, Stopped, Evidence, Account age, Times stopped; trống "Every workspace is sending"); trang workspace (Status history, Sending volume Learning / Watching / Dormant); nút **Stop sending** / **Reinstate** (bắt buộc ghi chú) / **Disable account** / **Reopen account**; Sending health 24 giờ / 7 ngày / 30 ngày — **Not judged** (<1.000 mail) · **Fine** · **Near the line** (≥50% ngưỡng) · **Over the ceiling**; Abuse alerts (Open / Legitimate / Actioned; Mark legitimate cần ghi chú); Link risk chỉ xem, không chặn.
- Cảnh báo khối lượng: ô 15 phút, tách transactional và automation, **campaign không bị xét**; baseline p95 30 ngày; cảnh báo khi 1 ô ≥200 mail và >10× baseline (hoặc 2 ô liền ≥200 và >20×); cần ≥20 ô có gửi (trước đó Learning); Dormant wake = im 30 ngày rồi 1 ô >500 mail; **không bao giờ tự dừng**; Slack nhắc lại mỗi 24 giờ khi alert còn Open.
- Staff không có quyền một màn: không thấy menu, vào link bị từ chối.

### §10–§11 Merge tag & link huỷ trong mail giao dịch

- **Mâu thuẫn — cú pháp**: ticket ghi merge tag **một cặp ngoặc** (`{contact.first_name}`), `{{…}}` bị từ chối khi lưu ("… uses merge tags that cannot be read: {{contact.first_name}}. Write a tag in single braces, as {contact.first_name}."). **PO chốt 02/10 là hai ngoặc** `{{contact.<field>}}` (MTRO-018 BR-30) và staging 01/10 dùng hai ngoặc → coi §10 cú pháp là **lỗi thời**; `Need confirm` Dev sửa ticket (GAP-05 Major).
- Bộ chọn tag: 6 field contact (Email, First name, Last name, Country code, Phone, Address) + thuộc tính workspace hiện tại + Unsubscribe link; không Created at. **Corrected 01/10**: picker staging có thêm `Preferences link` và nhãn `SMS` thay `Phone`.
- Giá trị contact chứa HTML được escape; CSS `a { color: red }` không bị coi là tag; `\{contact.first_name}` hiện nguyên chữ.
- Transactional API: thiếu biến → 422; biến tên `unsubscribe_url` hoặc có dấu chấm → 422. Mail giao dịch chỉ có link huỷ khi nội dung tự đặt `{unsubscribe_url}`; huỷ qua link = huỷ **toàn workspace** (campaign, automation, cả transactional); có link huỷ + cc / bcc → 422; >13 header tự đặt → 422; resubscribe chỉ qua trang huỷ đăng ký của chính người nhận.

## Edge Cases

- Staging đang ở chế độ tự dừng hay chỉ cảnh báo, ngưỡng đã hạ chưa — `Need confirm` Dev (GAP-01 Major).
- URL trang staff, tài khoản staff, tên quyền — `Need confirm` (GAP-02 Major); chưa có thì §7–§8 không test được.
- Đăng nhập mã email đã lên staging chưa / áp cho mọi tài khoản không TOTP — `Need confirm` (GAP-03 Major).
- §11 "resubscribe chỉ qua trang của chính người nhận" ↔ Portal API `DELETE teams/{team}/unsubscribes/{id}` cho marketer (MTRO-81) — `Need confirm` PO (GAP-06 Major).
- Role nào quản lý API key / mời thành viên — `Need confirm` (GAP-07 Major).
- Campaign Scheduled tới giờ khi workspace bị dừng; link huỷ còn hoạt động khi Suspended / Disabled — `Need confirm` (GAP-08, GAP-10 Major).
- Định dạng IP allowlist (IPv4 / IPv6 / CIDR), IP nguồn lấy từ kết nối hay `X-Forwarded-For` — `Need confirm` (GAP-09 Major).
- Nhập sai mã 2FA 15–20 lần không bị 429 (TC-MTRO-931, 23/09) — trái giới hạn MTRO-88.

## Testability Notes

- Test §5 cần ≥1.000 mail / lượt → cạn hạn mức AWS và làm bẩn workspace chung (RISK-01) — chỉ làm trên workspace riêng, có Dev hạ ngưỡng.
- Bộ case nằm trong task QA Hub MTRO-019 (164 case, chưa chạy); không có file trong repo automation.

## Known Issues

See [known-issues.md](../known-issues/known-issues.md) for entries tagged `security-abuse-guard`.

## Related Jira Tickets

- MTRO-92 — [BE] Security, Story, QA Review — nguồn duy nhất của file này.
- MTRO-91 — [BE] Public api, Story, QA Review — API docs trên staging-api `/docs` (haptt 11/09).
- MTRO-88 — 2FA login, Story, QA Review — out-of-scope email code (mâu thuẫn §1).
- MTRO-106 — Signed out about 2 hours after logging in, Bug, To Do — phiên 1 ngày.

## Source

- Jira MTRO-88, 91, 92, 106 — Atlassian MCP, đọc 2026-10-07.
- QA Hub task MTRO-019 (notes 25/09, 164 case not-run), MTRO-018 (BR-30 — PO 02/10) — đọc 2026-10-07.
- `inventory/MTRO.md` § 2.1, § 2.7, § 2.14 — staging 29/09 và 01/10/2026 (đối chiếu).
