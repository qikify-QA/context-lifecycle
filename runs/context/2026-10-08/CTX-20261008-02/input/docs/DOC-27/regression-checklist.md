<!-- testlane knowledge KB-394 · kind=qa-process · tag=— · status=draft · sourceUrl=https://github.com/ownego/qa-knowledge-work/blob/ae07d04a61509378493a9a07714b04f4e77a36e6/kb/MTRO/testing/regression-checklist.md · createdAt=2026-10-08T08:02:47.551Z · updatedAt=2026-10-08T08:02:47.551Z -->

# Regression Checklist — Mailtro (MTRO)

**Status:** in-review

Danh sách ngắn "luôn kiểm" sau mọi thay đổi của Mailtro, bắt lỗi vỡ chéo giữa các module — không phải test case chi tiết (case nằm trên QA Hub). Mỗi dòng ghi nguồn rule / quan sát. Dựng 2026-10-07.

## Auth & tenant

- [ ] Login → (2FA challenge nếu bật) → `Choose a workspace` → vào `<slug>.wisle.app` đúng workspace; điều hướng cross-domain không mất `returnTo` (rule MTRO-30; inventory § 1.2).
- [ ] Mở route cần auth khi chưa đăng nhập → về `AUTH_URL/login?returnTo=…` (inventory § 1.2).
- [ ] Multi-tenant isolation: contact / segment / email / campaign / automation của workspace A không hiện ở workspace B, kể cả gọi thẳng id qua URL / API (references § 4).
- [ ] Thông báo lỗi login / forgot password không lộ email có tồn tại hay không (references § 4).

## Gửi email (ràng buộc chéo quan trọng nhất)

- [ ] Workspace chưa có sending domain verified → kiểm hành vi gửi campaign / automation. ⚠ Rule 07/08 nói **không gửi được**; staging 09/09 và PO 02/10 (automation) cho gửi qua shared host `mailtro.ai` — chờ PO chốt cho campaign (xem [17-sending-domains](../features/17-sending-domains.md)).
- [ ] Campaign cần segment có contact + ít nhất 1 email trong Email library (rule MTRO-11/8/15).
- [ ] `SuppressionChecker` chặn cả 2 sổ: contact Unsubscribed và contact bị suppress (bounce / complaint) không nhận campaign lẫn automation (rule MTRO-78).
- [ ] Workspace **Sending suspended** chặn đúng các thao tác gửi (MTRO-92 §6 — khi staging có chế độ tự dừng).
- [ ] Merge tag `{{contact.first_name}}`, `{{unsubscribe_url}}`, `{{preferences_url}}` được thay đúng trong mail thật; link unsubscribe hoạt động (inventory L51, L68 — `Need confirm` mail thật).
- [ ] Unsubscribe có hiệu lực ngay cho lần gửi tiếp theo (references § 4).

## Số đếm dùng `ContactsResource::baseQuery`

- [ ] Import CSV **không** kích hoạt automation (KB-003); contact tạo lẻ thì có.
- [ ] Đụng contact / segment / suppression → kiểm lại số đếm: subtitle Contacts, cột `Contacts` của Segments, `~N contacts` trong builder, `estimated recipients` ở campaign, search contact (rule MTRO-78; inventory L44 search không ra contact Unsubscribed).
- [ ] Cột `Consent` ở list khớp detail, tab `Unsubscribe` và file export (inventory L43 — đang lệch).

## Dữ liệu tham chiếu chéo

- [ ] Xoá email đang được automation `Send email` dùng → builder có báo không / run Failed "…no longer belongs to this workspace." (inventory L60).
- [ ] Xoá custom field đang có contact mang / đang được preferences page dùng → bị từ chối (inventory § 2.5, § 2.9).
- [ ] Xoá preferences page đang được campaign dùng → link unsubscribe về trang "Unsubscribe from all" (i18n; inventory § 2.9).
- [ ] Sửa / xoá saved block → mọi email link block đó đổi theo (inventory § 2.8).
- [ ] Sửa segment sau khi campaign đã gửi → report hiện "Segment edited since this send" (i18n, inventory § 2.10-C).

## Automation

- [ ] Chỉ automation `Active` nổ trigger; `Pause` không cắt contact đang ở giữa flow (rule MTRO-32; i18n confirm Pause).
- [ ] Sửa flow `Active` rồi `Save` → áp dụng ngay, không có draft (rule 18/09).
- [ ] `Update contact field` phát event `Contact field changed` → có thể kích hoạt flow khác; re-entry once giữ đúng (rule 18/09; inventory L58).
- [ ] Giới hạn builder: tối đa 20 step, 10 `Send email`, wait 1 → 365 days (inventory § 3).

## Destructive action

- [ ] Mọi Delete (contact, segment, email, campaign, automation, preferences page, saved block, domain, key) có confirm và chữ đúng; bulk Delete không xoá dòng ngoài màn đang xem (inventory L53, open question bulk Delete campaign Sent).

## Source

- Quyết định PO / Dev 02/10, QA lead 05/10 (QA Hub MTRO-010, 011, 018; KB-003, KB-004).
- `business-rules/MTRO.md` (07/08 → 18/09/2026), `references/apps/MTRO.md` § 4, `inventory/MTRO.md` § 2–§ 5 (staging 01/10/2026).
