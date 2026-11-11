# Context Change Request: account-security-spechub-2fa-password-confirm — đối chiếu spec-hub cho 2FA và confirm-password dialog

- **Product:** `teeinblue`
- **Object:** `account-security`
- **Ticket:** không có
- **Các khối có trong file:** `A`

## Mức độ gấp

`LOW` — làm giàu bằng chứng cho quan sát đã có, không phát hiện mâu thuẫn. Người gửi: operator, qua `mcp__spec-hub__ask` ngày 2026-11-11 (log_id 157, 158).

## Khối A — Hành vi

### CLAIM-01

- **Statement:** Two-factor login là tuỳ chọn cho từng staff, không có setting bắt buộc cho cả organization. Khi 2FA đang tắt, đăng nhập thành công bằng email+password là xong, không có bước thử thách 2FA nào xen giữa. Khi 2FA đang bật, sau password đúng mới mở challenge 2FA (còn hiệu lực 5 phút, sai 5 lần phải làm lại từ đầu).
- **Object / feature:** account-security/portal-login-paths
- **Quan hệ với canon:** `ADD` (củng cố KB-009 — LOW, "Login không hỏi bước 2FA với account 2FA off")
- **Scope:** owner/staff, portal (/login?staff=true)
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `dev_doc`
- **Người xác nhận, ngày nguồn:** spec-hub (đọc source code + doc nội bộ `teeinblue-api/.ai/domain-business/staff-two-factor-auth.md`), đối chứng Jira TIB-5333 (2026-10-05, "Two-factor Authentication for Portal")
- **Locator:** spec-hub `mcp__spec-hub__ask` log_id=157, rule id `login-two-factor-optional` (feature `login-security`), `sure: green`, `sources: [{kind: code}, {kind: doc, ref: "teeinblue-api/.ai/domain-business/staff-two-factor-auth.md"}, {kind: jira, ref: "TIB-5333", when: "2026-10-05"}]`
- **OQ:** không có — bằng chứng cùng hướng với KB-009, đủ để đề xuất nâng `knowledge_kind`/confidence nếu reviewer đồng ý coi Jira TIB-5333 là authored_on hợp lệ cho `dev_doc`.
- **Trích nguyên văn:**
  ```
  login-two-factor-optional: "Two-factor is optional for each staff member; there is no setting to force it for a whole organization. When it is on, a correct password only starts a 5-minute challenge, and 5 wrong codes end it, so the staff member must start again."
  ```

### CLAIM-02

- **Statement:** Dialog xác nhận lại password chỉ xuất hiện khi **submit** các hành động: invite staff, remove staff, đổi role của staff, tạo/sửa role — không phải khi chỉ **mở** form staff/role để xem. Xoá role thì không cần confirm password.
- **Object / feature:** account-security/confirm-password-dialog
- **Quan hệ với canon:** `ADD` (nhất quán, không mâu thuẫn, với KB-010 — LOW, "Không thấy dialog khi mở các form staff và role" — KB-010 chỉ quan sát hành vi MỞ form, spec-hub nói rõ dialog gắn với hành vi SUBMIT, không phải mở, nên hai quan sát bổ sung cho nhau)
- **Scope:** owner, portal (Staff & Roles)
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** S2 (`qa_rule_ref`) — chỉ có `sources: [{kind: code}]`, không có Jira/ngày
- **Mã rule:** `spec-hub:staff-roles-password-confirm`
- **Người sở hữu (vai trò):** code (spec-hub đọc trực tiếp source code teeinblue-api)
- **Ngày ghi nhận:** 2026-11-11 (ngày truy vấn spec-hub)
- **Nơi mở lại được:** spec-hub `mcp__spec-hub__ask` log_id=158, rule id `staff-roles-password-confirm` (feature `staff-roles`)
- **OQ:** NEEDS_CONFIRMATION — Xác nhận đúng là dialog gắn với hành động submit (invite/remove/đổi role/tạo-sửa role), không gắn với việc mở form, và xoá role không cần confirm — khớp để viết rõ hơn trong KB-010 (hiện đang mô tả mơ hồ "mở form không thấy dialog")? — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  staff-roles-password-confirm: "Inviting staff, removing staff, changing a staff member's roles, and creating or editing a role ask the owner to confirm their password first. Deleting a role does not."
  ```
