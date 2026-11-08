# Object: Account & Security (product: teeinblue) — Feature Profile Summary
**Published context version:** 1

- **Object:** login portal, trạng thái bảo mật staff, thao tác nhạy cảm. Không gồm quyền riêng của campaign (`campaign/campaign-security-permissions`).
- **Quan sát:** staging, role `merchant-owner`, một account owner đang 2FA off. Explorer không chủ động ghi gì ngoài một lần login hợp lệ; các POST tự phát sau login chưa xác định, xem OQ-account-security-015.
- **Toàn bộ knowledge là `OBSERVED_CURRENT`/`LOW`:** 15 KB item, 0 `CONFIRMED_EXPECTED`, 12 check `BASELINE`. Hành vi hiện tại không phải expected requirement.
- **Open question:** 31 mục ở `open-questions.md`.

---

## `portal-login-paths` — Vào portal bằng đường đăng nhập đúng loại account

**Entry points:** `/login`, `/login?staff=true`; `/campaigns` khi chưa có session về `/login` (mới thử route này).

**Đã quan sát:**
1. `/login`: form store domain cho Shopify owner, link sang `/login?staff=true` và `/register`.
2. `/login?staff=true`: form email và password, widget Cloudflare, link Forgot password, Continue with Google, Shopify owner, Register, Re-send verification.
3. Login hợp lệ: `POST /api/login` 200, URL về `/`, không có bước 2FA với account 2FA off.

**Chưa quan sát:** nhánh lỗi, social login flow, account bật 2FA và `/login/two-factor`, các trang `/forgot-password`, `/register`, `/resend-verification`, cơ chế cookie session.
**Checklist:** 9 check `BASELINE`. **KB:** KB-001 đến KB-009.

## `confirm-password-dialog` — Dialog xác nhận password (chưa quan sát được)

Dialog chưa từng hiện ra trong lần explore này. Không có entry point, hiển thị, field, hiệu lực hay validation nào được ghi nhận.

**Đã quan sát:** mở 12 trang/form về staff, role, profile, Integrations và API Keys không làm dialog hiện ra. Chỉ mở, không điền, không submit (KB-010 đến KB-012).
**Không dùng để kết luận:** dialog có tồn tại hay không, hoặc action nào không cần xác nhận password. Các item này không làm oracle.
**Checklist:** rỗng, mọi dimension nằm ở `excluded_dimensions`. Việc còn lại ở OQ-account-security-016.

## `staff-security-status` — Xem cột Security của staff trên danh sách staff

**Entry point:** sidebar Organization > Staff (`/staffs`).

**Đã quan sát:**
1. Bảng có các cột Avatar, Name, Email, Roles, Security, Last login, Action.
2. Chip trên 2 dòng mẫu, cả 2 role owner: "Password", "Shopify SSO", "Google", "2FA off"; và "Password", "2FA off".
3. Sau khi hover chip không thấy tooltip hay popover hiển thị.

**Chưa biết:** tập chip đầy đủ, nghĩa chip, quy tắc hiển thị, nguồn dữ liệu chip, staff không password, 2FA bật, quy tắc cập nhật Last login.
**Checklist:** 3 check `BASELINE`. **KB:** KB-013 đến KB-015.

## Chưa khám phá ở mức object

Multi-store, acting-user, Hasura permission, billing webhook, role khác owner (OQ-account-security-025 đến 029). Nhóm cấu hình riêng trong response `GET /api/user`: OQ-account-security-030.
