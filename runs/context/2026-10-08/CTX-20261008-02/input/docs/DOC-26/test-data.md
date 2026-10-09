<!-- testlane knowledge KB-395 · kind=env · tag=— · status=draft · sourceUrl=https://github.com/ownego/qa-knowledge-work/blob/ae07d04a61509378493a9a07714b04f4e77a36e6/kb/MTRO/testing/test-data.md · createdAt=2026-10-08T08:02:49.937Z · updatedAt=2026-10-08T08:02:49.937Z -->

# Test Data — Mailtro (MTRO)

**Status:** in-review

Data dùng lại được và quy ước dựng data trên staging `qa-workspace` (dùng chung nhiều người). Dựng 2026-10-07 từ `inventory/MTRO.md` § 4.1–4.2 (01/10), quy ước trong test-run repo `qikify-QA-mailtro` và `business-rules/MTRO.md` § "Điều kiện dựng dữ liệu suppression phụ thuộc tầng test" (08/09). **Không có email / mật khẩu thật ở đây** — `<owner>` = phần trước `@` của `OWNER_EMAIL` trong `.env` repo.

## Quy ước chung (repo + inventory)

- Workspace dùng chung → **không assert số tuyệt đối**, chỉ so delta; **không xoá data của người khác**; mọi data mới mang **prefix theo người**: `qa-nga-{ts}-…` (tên), `qa_nga_{ts}_…` (key custom field — chỉ lowercase / số / `_`).
- Email contact test: `@mailtro-test.com` hoặc alias `<owner>+qaXXXX@…` (plus-addressing trên hộp thư Owner). Lưu ý signup chuẩn hoá `+tag` → không tạo được **tài khoản** test bằng alias (25/08), nhưng contact thì được.
- Bounce / complaint: **chỉ** AWS SES mailbox simulator — `bounce+tcNNN@`, `complaint+tcNNN@`, `success+tcNNN@`, `suppressionlist+tcNNN@` + `simulator.amazonses.com`; mỗi lượt dùng nhãn mới; simulator không có soft bounce, không chọn được `complaintFeedbackType` (MTRO-64, MTRO-92 §0).
- Automation thử nghiệm: chỉ dùng `Update contact field`; không Activate flow có `Send email` trừ khi được phép; Pause flow sau khi xong.
- Campaign: không bấm Send / Send test / Schedule trên workspace chung trừ khi được phép; gửi thử chỉ tới hộp thư QA hoặc simulator.
- Import CSV tạo contact thật, không có bulk delete — file nhỏ, prefix riêng; case 10 MB / 50.000 dòng hỏi chị Nga trước.

## Data đang có trên staging (01/10/2026)

| Loại | Hiện trạng | Ghi chú |
|---|---|---|
| Contacts | 203 → 212 trong 15 phút (01/10); nhiều `qa-mtro018-*@example.test`, `<owner>+analytics*`, `+qco*`, `+tepo*`, `+imp*`; 5 → 12 Unsubscribed | số thay đổi liên tục |
| Custom fields | 8: `plan_tier` (Text, 33) · `app` · `seg_run` · `keep_key` · `run_0826` · `new_letter` (**Boolean duy nhất**, 8) · `qa_l6_attr_x` · `empty_val` | `date_install` (Datetime) đã bị xoá → thiếu fixture Date / Datetime / Number |
| Segments | ~75 (3 trang), có `QCO - Test customers (01/10/2026)`, `Tepo - Test customers (01/10/2026)`, nhiều `Untitled segment` trùng tên | |
| Suppressions | Bounce & complaint 14 · Unsubscribe 12 (7 dòng `Other` từ import 01/10) | |
| Email library | 9 email (vd `Welcome - Install app (All apps)`, `test` canvas rỗng, `QCO - Upsell Guide (01/10/2026)`, `Tepo`, `Copy of Tepo`), đều do Owner chung tạo, đều có subject | thiếu: email chưa có subject, email có block cấp ngoài cùng, ≥21 email |
| Saved blocks | **0** | `ash-inventory-block` đã bị xoá |
| Email preferences | **0 page** | `ash-inventory-pref` đã bị xoá; repo ghi fixture L76 dựng 03/10 — chưa kiểm còn không |
| Campaigns | 33: 3 Draft (01/10, chưa đủ 4 bước — Sender trống), còn lại Sent; folder `1/10/2026`, `30/10/2026`, `New Letter`, `Update feature` | Sent từ 28/09 có số report; Sent ≤ 09/09 hiện `—`; không có Scheduled / Running / Partly sent / Failed |
| Automations | 27: 0 Draft, 2 **Active** (`Welcome`; `Chuỗi 2 email sau 3 ngày gửi tiếp email 2` ~22 run Waiting — **gửi mail thật khi tới hạn**), còn lại Paused (`Test` trỏ template đã xoá) | không có fixture Draft |
| Members | 1 (Owner) | lời mời mẫu đã Revoke |
| Sending domain | `ash-inventory.example.com` (Pending) | giữ làm fixture hay xoá: người dùng quyết |
| API keys | `ash-inventory-key` × 2, đều Revoked | giá trị key không ghi ở đâu |

## Fixture cần dựng (chưa có)

- 1 campaign Draft **đủ 4 bước** gửi tới hộp thư QA — để mở `Preview & test` / sheet `Send` (inventory L72).
- 1 preferences page ≥2 choice trên field Boolean riêng (`qa_pref_*`) + 1 email có `{{preferences_url}}` + `{{unsubscribe_url}}` + 1 campaign gửi tới hộp thư QA — để thấy trang công khai người nhận (inventory L76).
- Field Number / Date / Datetime; email chưa có subject; saved block có data và của người khác; ≥21 email; automation Draft; campaign Scheduled / Running.
- Tài khoản Admin / Member thật cùng workspace; workspace B không chung member; tài khoản chưa bật 2FA (`NO2FA_*`); domain đã provision.

## Dựng data suppression theo tầng test (rule 08/09)

- **E2E campaign**: contact → segment → campaign có template **có nội dung** (template rỗng gây BUG-SUPP-01) → send → quan sát event. Automation dùng flow / trigger tương ứng.
- **Integration / unit**: fixture DB hoặc event có attribution hợp lệ (envelope SNS ký hợp lệ nếu qua worker) — không chứng minh luồng gửi E2E.
- **Unsubscribe E2E**: gửi tới hộp thư QA rồi bấm link; không đồng nhất unsubscribe với bounce / complaint.
- **API đọc / xoá**: data có sẵn hoặc seed; case Draft / tài liệu / cấu hình không cần send.

## Source

- `inventory/MTRO.md` § 4.1, § 4.2, L40, L48, L54, L65, L72, L76 — staging 01/10/2026.
- `business-rules/MTRO.md` § "Điều kiện dựng dữ liệu suppression phụ thuộc tầng test" — 08/09/2026.
- Repo `qikify-QA-mailtro`: quy ước trong test-run 08/09 → 06/10, `docs/decisions/assignments.md`.
