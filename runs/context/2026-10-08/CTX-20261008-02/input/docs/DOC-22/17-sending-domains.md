<!-- testlane knowledge KB-387 · kind=feature-profile · tag=Sending domains · status=draft · sourceUrl=https://github.com/ownego/qa-knowledge-work/blob/ae07d04a61509378493a9a07714b04f4e77a36e6/kb/MTRO/features/17-sending-domains.md · createdAt=2026-10-08T08:01:21.249Z · updatedAt=2026-10-08T08:01:21.249Z -->

# 17. Settings › Sending domains (`/settings/domains`)

**Status:** in-review

Phân tích ngày 2026-10-07 từ: `business-rules/MTRO.md` § "Sending Domain & Campaign" (rule 07/08/2026, nguồn MTRO-6/MTRO-11), `inventory/MTRO.md` § 2.16 (staging đi thật 29/09/2026, tạo domain mẫu `ash-inventory.example.com` ở trạng thái Pending), Jira MTRO-6/48/56/92 (đọc 07/10), task QA Hub MTRO-018 (BR-27 — PO 02/10), MTRO-015 (quan sát gửi 09/09) và repo `qikify-QA-mailtro` (`07-settings/sending-domains.md` mới là khung, 0 case). Chưa có task QA Hub riêng cho sending domain.

## Purpose

Khai báo domain gửi email (SPF / DKIM / DMARC) để Mailtro gửi thay mặt merchant với thương hiệu riêng và deliverability tốt hơn. Ràng buộc chéo quan trọng nhất với [Campaigns](10-campaigns.md) và [Automations](12-automations-list-builder.md).

## Business Rules

### Ràng buộc gửi — rule 07/08 vs quyết định 02/10 (mâu thuẫn chưa đóng)

- **Rule 07/08 (đã xác nhận, MTRO-6 + MTRO-11)**: campaign **không gửi được** nếu workspace chưa có sending domain verified; luôn cover trong regression. Sending domain phải khai đủ SPF / DKIM / DMARC; verify thất bại phải chỉ rõ record nào thiếu / sai.
- **Hệ thống thật (09/09)**: workspace QA **không có** domain verified vẫn gửi campaign 15/15 lần qua host dùng chung — `sender_is_borrowed: true`, `effective_from_email` = `<owner>@mailtro.ai` (mượn domain hệ thống `mailtro.ai`) (QA Hub MTRO-015; repo suppression run 09/09).
- **PO/BA 02/10 (MTRO-018 BR-27)**: với **automation**, From email ngoài domain verified (kể cả workspace chưa có domain) **vẫn gửi qua shared sending host**, không chặn ở Save / Activate / runtime — "giống campaign". Chưa ai chốt lại rule 07/08 cho campaign → `Need confirm` PO (GAP-01 Blocker MTRO-009).
- UI vẫn ghi theo rule cũ: wizard bước Sender "Sending needs a verified domain — this address won't be accepted until its domain is verified." + `Manage sending domains`; automation Send email "Must be on one of your workspace's verified sending domains." + `Manage domains` (staging 29/09–01/10).
- One-click unsubscribe header chỉ sinh khi sender domain đã xác thực (MTRO-67).

### List & Add domain (`/settings/domains`) — staging 29/09

- `/settings` redirect về đây; header "Manage sending domains and DNS configuration."
- Empty: `Your domain, your brand` / "Better deliverability, stronger brand recognition, and full control over your sender identity." · `Add domain`.
- Dialog **Add sending domain** — "Enter the domain you want to send email from.": `Domain` (placeholder `mail.mydomain.com`, hint "Example: mydomain.com"). `gmail.com` → "Public email domains (gmail, yahoo, etc.) cannot be used"; `not a domain` → "Please enter a valid domain (e.g., mydomain.com)". `Add domain` disabled khi rỗng / sai; hợp lệ → `POST …/domains` 201, bảng nạp lại.
- Bảng: `Domains` · `Status` (`Pending`) · `Actions for {domain}` → `Edit` (Domain settings) · `Delete` (`Remove {domain}?` / "This domain will stop sending immediately. This can't be undone.").
- **Corrected so với MTRO-48**: ticket ghi status `Verified` (xanh) / `Not verified` (đỏ); staging domain mới là `Pending`; bundle có {`Verified`, `Pending`, `Failed`, `Temporary failure`, `Inactive`}.

### Domain settings (`/settings/domains/:id`) — staging 29/09

- Breadcrumb Settings › Sending domains › Domain settings · h1 domain · badge `Pending` · `Verify` (**disabled**) · `Back`.
- Domain chưa provision **không hiện DNS record nào**, chỉ "To send from this domain, contact support to start verification." (inventory L26). Giải thích: **quyết định PO 09/07 (MTRO-48)** — trước mắt chỉ add domain cơ bản, phần verify chỉ dựng UI. Rule 07/08 "verify thất bại chỉ rõ record thiếu" vì vậy chưa test được.
- Bundle (chưa đối chiếu UI): khối `DKIM`, `Custom MAIL FROM` (`Recommended`), `DMARC`, `Tracking` (`Optional`, "Domain tracking isn't available yet."), bảng DNS `Type` / `Name` / `Content` / `Priority`; `Domain not found.`
- MTRO-92 §6: workspace **Sending suspended** không thêm được domain (chưa kiểm UI).

## Edge Cases

- Gửi khi chưa verify domain — mâu thuẫn rule 07/08 vs staging + PO 02/10 — `Need confirm` PO (quan trọng nhất của module).
- Verify luôn qua support? Merchant tự thấy DNS records khi nào? — `Need confirm` PO (inventory L26).
- Status `Failed` / `Temporary failure` / `Inactive` có chặn gửi không — `Need confirm` Dev.
- Xoá domain đang là From của campaign Scheduled / automation Active — `Need confirm` (chưa có rule; copy nói "stop sending immediately").
- Sender bị đổi âm thầm sang host chung nhưng bước 4 / Preview campaign vẫn hiện địa chỉ người dùng gõ (25/08) — `Need confirm` UX có cần báo.
- Nội dung DNS record (DKIM / SPF / DMARC) chưa define trong ticket (MTRO-48; R23 repo).

## Testability Notes

- Workspace QA chưa có domain đã provision → không thấy DNS records / `Verify` enable (inventory L39). Domain mẫu `ash-inventory.example.com` (Pending) còn trên staging — người dùng quyết giữ làm fixture hay xoá (inventory L40).
- Không verify được domain thật trong test (repo `sending-domains.md`). ID case dự kiến `TC-DOMAIN-0xx`.
- Gợi ý auto/manual MTRO-6: 60/40 (knowledge-work) · 70/30 (repo).

## Known Issues

See [known-issues.md](../known-issues/known-issues.md) for entries tagged `sending-domains`.

## Related Jira Tickets

- MTRO-6 — Account setup, Epic, To Do — MVP: set up domain, domain authentication, set up senders.
- MTRO-48 — Set up sending domain, Story, **Code Review** (dù đã chạy trên staging) — spec 3 màn; quyết định PO 09/07 "verify chỉ dựng UI".
- MTRO-56 — [BE] Setup sending domain api, Story, QA Review — description trống.
- MTRO-67 / MTRO-68 — One-click unsubscribe header / DKIM-sign, DONE — phụ thuộc domain đã xác thực.
- MTRO-92 — [BE] Security, QA Review — chặn thêm domain khi workspace bị dừng.

## Source

- `business-rules/MTRO.md` § "Sending Domain & Campaign" — 07/08/2026.
- `inventory/MTRO.md` § 2.16, L26, L39, L40 — staging 29/09/2026.
- Jira MTRO-6, 48, 56, 67, 68, 92 — đọc 2026-10-07.
- QA Hub task MTRO-018 (BR-27), MTRO-015 (TC-MTRO-616), MTRO-009 (GAP-01) — đọc 2026-10-07.
- Repo `qikify-QA-mailtro`: test-run `02-contacts/2026-09-09-suppression-manual-run.md`, `05-campaigns/2026-08-25-campaigns-wizard…`; `docs/manual-testcases/07-settings/sending-domains.md`.
