<!-- testlane knowledge KB-357 · kind=feature-profile · tag=Auth & Token · status=draft · sourceUrl=https://github.com/ownego/qa-knowledge-work/blob/18e5531b0531cc8ed211d45de290a9aecfdf837c/kb/DUOS/features/11-auth-token-lifecycle.md · createdAt=2026-10-08T07:52:24.946Z · updatedAt=2026-10-08T09:38:03.301Z -->

# 11. Auth & Token lifecycle (expiring offline token)

**Status:** in-review

Phân tích ngày 2026-10-07 từ Jira DUOS-399 (qua bản phân tích 14 mục trong
task QA Hub DUOS-001, cập nhật 2026-10-02), `business-rules/DUOS.md` (mục
Token Lifecycle → Admin UI, cập nhật 2026-07-07/08) và 49 test case
TC-DUOS-001…049. Đã đối chiếu inventory 2026-10-08 (store `stg-duos-plus-2`,
Free plan) — phần ✅/🟡/❌ xem `inventory/DUOS.md` (§ 2.23). Admin panel
Filament chỉ tới trang login (🟡: "Get Duos Admin", "Sign in", "Sign in with
Slack") → tên UI bên trong admin panel ("Token and scopes", "Refresh access
token") vẫn lấy từ ticket và test case, **chưa verify**. Đây là thay đổi
backend diện rộng, không phải màn hình merchant.

## Purpose

Shopify bỏ offline access token vĩnh viễn: token mới hết hạn sau ~60 phút,
kèm refresh token ~90 ngày; bắt buộc với mọi public app từ **01/01/2027**
(sau mốc đó token legacy bị 401). App phải tự refresh, tự migrate shop cũ
(legacy → expiring), và khi token thật sự "chết" thì flag shop + email
merchant để reconnect. Mọi call Shopify Admin API của Duos (sync catalog,
company, order, quote → order, Flow action, bulk) đều đi qua lớp token này.

## Business Rules

### Điều kiện token chết

- **Dead token** ⟺ (expiring AND `Refresh Token Expires At` < now) OR
  (legacy AND now ≥ 2027-01-01). — DUOS-399; business-rules/DUOS.md
  (2026-07-07). **Đã xác nhận** (rule đã lưu vào business-rules).
- Token chết → app **chặn trước khi gọi Shopify** (không đợi 401 thật), set
  `Re-auth Required At`, gửi email reconnect ngay. Reconnect thành công → flag
  tự clear. — DUOS-399, business-rules/DUOS.md. Đã xác nhận.
- **401 đơn thuần KHÔNG được coi là cần re-auth**: shop freeze/close giữa lúc
  job chạy vẫn có token hợp lệ → job chỉ fail và retry, không email. (Trước
  đây mọi 401 đều bắn email — đã fix.) — DUOS-399 qua task DUOS-001 mục 2.
  Theo ticket, chưa có xác nhận riêng ngoài ticket.
- Token legacy chỉ chết ở 3 tình huống: app migrate thành công (Shopify kill
  token cũ **ngay**), uninstall, hoặc từ 01/01/2027. **Re-authorize KHÔNG kill
  token cũ.** — DUOS-399 (task DUOS-001 mục 2). Theo ticket.

### Migrate legacy → expiring

- 2 đường: (1) lệnh `tokens:migrate-legacy` — silent, hủy token cũ ngay, phải
  chạy xong trước 2027-01-01; (2) re-login khi merchant tự mở app — không hủy
  token cũ. — business-rules/DUOS.md. Đã xác nhận.
- **Thứ tự deploy bắt buộc:** `tokens:migrate-legacy` chạy xong hoàn toàn
  rồi mới ship re-login-khi-mở-app. — business-rules/DUOS.md. Đã xác nhận.
- Sau 01/01/2027 migrate silent không còn dùng được → re-login là đường duy
  nhất. — DUOS-399 (task DUOS-001 BR-10). Theo ticket.

### Scheduled jobs

- `tokens:refresh-expiring --days=10` chạy **daily**; `tokens:migrate-legacy`
  chạy **weekly** + 1 lần chạy tay ngay sau deploy. Cả hai bỏ qua shop đã
  uninstall, xử lý tuần tự 1 shop / background task, cần Horizon queue worker.
  — business-rules/DUOS.md. Đã xác nhận.
- Auto refresh trong luồng gọi Shopify chạy trong **buffer 10 phút** trước
  hạn, đẩy cả 2 mốc ngày và **rotate refresh token**; background (webhook,
  queued/scheduled job) tự refresh, không bị chặn bởi hạn 60 phút. — DUOS-399
  (task DUOS-001 BR-4, BR-5). Theo ticket.

### Khi merchant mở app

| Tình huống | Hành vi | Nguồn |
|---|---|---|
| Token legacy | re-login | business-rules/DUOS.md |
| Scope / permission đổi | re-login | business-rules/DUOS.md |
| Expiring, session còn hạn | vào thẳng | business-rules/DUOS.md |
| Expiring, session ~60 phút đã hết | re-login (**không** silent refresh) | business-rules/DUOS.md |
| Không có session / shop not found | re-login | business-rules/DUOS.md |

### Proactive reopen email

- Trigger qua webhook `shop-update` khi shop chuyển từ đóng
  (frozen/cancelled/fraudulent/paused) → active **và** token đã chết tại thời
  điểm đó. Gửi **đúng 1 lần**. Áp dụng cả development store. Bỏ qua shop đã
  uninstall hoặc vẫn đang đóng. Shop đóng < 90 ngày → token vẫn sống, không
  làm gì. — business-rules/DUOS.md. Đã xác nhận.

### Uninstall / Reinstall

- Uninstall: xoá session, clear 4 field (`Access Token Expires At`,
  `Refresh Token`, `Refresh Token Expires At`, `Re-auth Required At`), clear
  cached shop, soft-delete uninstalled; job refresh/migrate bỏ qua shop. —
  business-rules/DUOS.md. Đã xác nhận.
- Reinstall: luôn nhận token expiring; clear field cũ còn sót (safety net nếu
  miss uninstall webhook) trước khi ghi token mới; chạy luồng reinstall thường
  (sync dữ liệu + email reinstall). — business-rules/DUOS.md. Đã xác nhận.
- Uninstall khi đang pending reconnect → soft-delete + clear
  `Re-auth Required At` → không email/refresh nữa. — business-rules/DUOS.md.

### Admin panel — Shops → shop detail → "Token and scopes"

- Trang login `https://staging-admin.getduos.io/admin/login` ("Get Duos
  Admin — Sign in") chỉ có link **"Sign in with Slack"** — không đăng nhập
  bằng tài khoản Shopify (quan sát staging 2026-10-08, inventory/DUOS.md
  § 2.23). QA cần tài khoản Slack workspace được cấp quyền.

- Hiển thị: Access Token, Offline Token Type (Legacy / Expiring),
  `Access Token Expires At`, `Refresh Token Expires At`, `Re-auth Required At`.
  `Refresh Token` lưu mã hoá, **không hiển thị raw** ở bất kỳ đâu. Shop chưa
  migrate: cả 3 field ngày **rỗng** (rỗng = không có hạn, không phải thiếu
  dữ liệu). — business-rules/DUOS.md; DUOS-399.
- Nút **"Refresh access token"**: chỉ hiển thị cho shop expiring, force
  refresh thủ công; gắn permission mới đăng ký qua
  `php artisan shield:generate --all --ignore-existing-policies` (chạy trước
  `php artisan migrate`). — business-rules/DUOS.md; DUOS-399.
- Permission phải chặn ở API, không chỉ ẩn nút (TC-DUOS-041) — Security
  Assumption trong task DUOS-001 mục 9, chưa xác nhận.

## Edge Cases

- 2 tiến trình cùng refresh 1 shop → rotate chồng làm vô hiệu token của tiến
  trình chậm hơn — có lock không? `Need confirm` (câu hỏi 6, TC-DUOS-044).
- Migrate thành công phía Shopify nhưng app không nhận response → shop mất
  token, chỉ phục hồi khi merchant mở app; có job đối soát không? `Need confirm`
  (câu hỏi 8, TC-DUOS-009).
- Refresh thất bại do lỗi tạm thời (mạng / Shopify 5xx) — retry mấy lần, có
  email không (phải khác nhánh token chết)? `Need confirm` (câu hỏi 3,
  TC-DUOS-048).
- Biên `--days=10`: còn đúng 10 ngày có được refresh không (≤ hay <)?
  `Need confirm` (TC-DUOS-011).
- Email reconnect ở luồng job thường có gửi lặp mỗi lần job chạy không (rule
  "đúng 1 lần" chỉ nêu cho proactive reopen)? `Need confirm` (câu hỏi 5,
  TC-DUOS-025).
- Merchant thấy gì trong app khi shop đang bị flag Re-auth Required (banner
  hay redirect thẳng)? `Need confirm` (câu hỏi 4, TC-DUOS-049).
- Nội dung cuối của email reconnect (template `reopen.blade.php` mới là bản
  nháp trong comment Jira), địa chỉ nhận, ngôn ngữ — `Need confirm` (câu hỏi 5).
- Role admin nào được gán permission "Refresh access token" mặc định?
  `Need confirm` (câu hỏi 10).

## Testability Notes

- Không thể chờ thật 60 phút / 90 ngày / mốc 2027 → cần Dev sửa ngày trong DB
  hoặc fake clock (câu hỏi 1 task DUOS-001 — blocker thực thi). Nhiều case
  (TC-DUOS-006, 022) đánh `PO/DEV confirm` vì lý do này.
- Store đối chứng: 70, 67 expiring; 22, 30, 68 legacy — xem
  [../testing/environments.md](../testing/environments.md).
- Trạng thái task: `waiting-for-dev`; 48 case not-run, 1 passed (TC-DUOS-001
  — kèm `BUG-36`, nội dung bug chưa đọc được qua MCP).
- Mọi flow nghiệp vụ gọi Shopify cần regression sau migrate (TC-DUOS-046) —
  xem [../testing/regression-checklist.md](../testing/regression-checklist.md).

## Known Issues

Xem [known-issues.md](../known-issues/known-issues.md), tag `auth-token-lifecycle`.

## Related Jira Tickets

- [DUOS-399](https://ownego.atlassian.net/browse/DUOS-399) — [BE] Migrate expiring offline token, Story (QA Review) — toàn bộ spec của file này; PR `qikify/b2b-api#198`.
- [DUOS-388](https://ownego.atlassian.net/browse/DUOS-388) — [BE] Upgrade shopify API from 2025-07 to 2026-04, Story (Done) — bối cảnh API version.
- [DUOS-428](https://ownego.atlassian.net/browse/DUOS-428) — composer audit, Task (QA Review) — guzzle/psr7 nằm dưới bước đổi token OAuth, cần smoke auth.

## Source

- Task QA Hub DUOS-001 (notes 14 mục, test case TC-DUOS-001…049), đọc 2026-10-07.
- `knowledge-work/business-rules/DUOS.md` (DUOS-399, 2026-07-07/08).
- `knowledge-work/inventory/DUOS.md` (build 2026-10-08) § 2.23.
