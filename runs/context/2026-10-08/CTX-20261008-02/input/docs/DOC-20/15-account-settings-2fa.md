<!-- testlane knowledge KB-385 · kind=feature-profile · tag=Account settings · status=draft · sourceUrl=https://github.com/ownego/qa-knowledge-work/blob/ae07d04a61509378493a9a07714b04f4e77a36e6/kb/MTRO/features/15-account-settings-2fa.md · createdAt=2026-10-08T08:01:18.341Z · updatedAt=2026-10-08T08:01:18.341Z -->

# 15. Settings › Account settings & Two-factor authentication (`/settings/account`)

**Status:** in-review

Phân tích ngày 2026-10-07 từ: `inventory/MTRO.md` § 2.13 (trang đi thật 29/09/2026, role Owner, 2FA đang On; luồng enrol và trạng thái Off chỉ từ bundle 23/09), Jira **MTRO-88** "2FA login" (QA Review — spec đầy đủ enrol / challenge) và MTRO-92 §1 (đọc 07/10), task QA Hub MTRO-003 (nhóm TC-2FA, 23/09) và repo `qikify-QA-mailtro` (`01-auth/two-factor.md` 62 case, test-run 23/09). `business-rules/MTRO.md` **chưa có** rule 2FA / Account settings (inventory L33) — rule dưới đây theo ticket MTRO-88 + hiện trạng staging. Màn nhập mã lúc đăng nhập ở [01-auth-mailtro-id](01-auth-mailtro-id.md).

## Purpose

Trang cài đặt **cấp tài khoản** (không theo workspace): xem profile, gửi link đặt lại mật khẩu, bật / tắt 2FA bằng authenticator app (TOTP opt-in) và quản lý recovery code.

## Business Rules

### Trang Account settings — staging 29/09

- Vào từ Settings › `Account settings` hoặc user menu › `Account settings`; header "Manage your personal account."
- Giống nhau ở mọi workspace (mở ở workspace có role Member cũng vậy, 23/09) — 2FA thuộc **tài khoản**, không có toggle ở Workspace settings.
- **Profile** — "The account you're signed in as.": `Name:` · `Email:` chỉ đọc.
- **Password** — "We'll email you a secure link to set a new password.": `Send reset link` + "The link expires in 60 minutes."; sau khi bấm `Resend in {seconds}s`; lỗi `We can't tell which account you're signed in as. Reload the page and try again.` Không đổi mật khẩu tại chỗ.

### Two-factor authentication — MTRO-88 + staging

- Card thứ 3 dưới Profile và Password: "Ask for a code from an authenticator app on top of your password." + badge `On` / `Off`.
- **Off**: "Your password on its own signs you in." · `Set up two-factor authentication`.
- **Enrol 4 bước** (MTRO-88; bundle, chưa đối chiếu UI vì tài khoản Owner đang On): (1) `Current password` — sai → 422 inline; (2) quét QR (vẽ client-side từ `provisioning_uri`) + setup key nhóm 4 ký tự, `Copy the setup key` ("Can't scan it? Enter this key in the app instead:"); (3) "Enter the six-digit code your app is showing now." — **tự submit ở chữ số thứ 6**, sai → xoá ô, enrolment vẫn pending; `Verify and turn on`; (4) recovery codes — **8 mã**, `Copy all` / `Download` (`mailtro-recovery-codes.txt`), **`Done` là lối thoát duy nhất** (không đóng được khi request đang chạy và ở màn codes; click ngoài không làm mất).
- Enrol ≠ activate: thoát trước bước 3 thì tài khoản giữ nguyên, lần sau ghi đè secret treo. `409` khi enrol mà 2FA đã bật ở tab / thiết bị khác → card chuyển On + dialog báo.
- **On**: "You'll be asked for a code the next time you sign in." · `Regenerate recovery codes` · `Turn off` (destructive). Cả hai đòi `Current password`.
- `Turn off two-factor authentication?` — "Your password alone will sign you in again, and your recovery codes stop working. Enter your current password to confirm." · `Turn off` (disabled khi rỗng) → toast `Two-factor authentication turned off`.
- `Regenerate recovery codes?` — "This replaces all eight codes — the ones you saved before stop working immediately. Enter your current password to confirm." · `Regenerate` → toast `Recovery codes regenerated`; dialog codes "Your previous codes no longer work. Save this set instead." / "Each code works once, and this is the only time we can show them…". `409` khi regenerate mà 2FA đã tắt → card về Off (MTRO-88).
- API (bundle 23/09): `POST /api/user/two-factor` `{password}` · `POST /api/user/two-factor/confirm` `{code}` · `DELETE /api/user/two-factor` `{password}` · `POST /api/user/two-factor/recovery-codes` `{password}` → `recovery_codes`.
- **Out of scope (MTRO-88)**: bắt buộc 2FA toàn workspace, SMS / email code, "remember this browser", admin reset 2FA của member khác. Màn chặn "workspace bắt buộc 2FA" (`/setup-2fa`) đã bị gỡ khỏi bundle 29/09 — khớp out-of-scope.

### Không có trong app

- Quản lý phiên / thiết bị, "sign out other sessions", lịch sử đăng nhập, khoá tài khoản (inventory L28). Phiên đăng nhập 1 ngày (MTRO-106).

## Edge Cases

- MTRO-92 §1 mô tả tài khoản **không bật TOTP** vẫn phải nhập mã gửi qua email và "Tắt (nhập mật khẩu) → quay về mã email" — mâu thuẫn MTRO-88 (email code out-of-scope) và staging — `Need confirm` Dev.
- "Bắt buộc 2FA theo workspace" — **Resolved theo ticket** (MTRO-88 out-of-scope); câu hỏi PO ở inventory L27 có thể đóng.
- Session / thiết bị: case "đăng xuất thiết bị khác" nên đóng out-of-scope — `Need confirm` PO (inventory L28).
- Window TOTP, số lần sai trước khi khoá, định dạng recovery code, TTL challenge vs đồng hồ 5:00, maxlength ô mã — `Need confirm` Dev (10 điểm chờ trong `two-factor.md`; inventory L41).
- `Current password` sai ở `Turn off` / `Regenerate` — thông báo lỗi chưa quan sát.

## Testability Notes

- Tài khoản Owner QA **bật 2FA** → spec `auth.setup.ts` / `login.spec.ts` vỡ (10 chỗ); chưa chọn hướng: tài khoản `NO2FA_*`, `AUTH_TOTP_SECRET`, hay `storageState` (inventory L37).
- Không có tài khoản phụ đang Off → enrol chưa đi được; không được `Turn off` / `Regenerate` trên tài khoản dùng chung (người khác mất recovery code) → 6 case recovery blocked.
- Bộ case `01-auth/two-factor.md` (62 case, task MTRO-003; chạy 23/09: 22 pass · 4 fail · 21 blocked trên 47 case). Repo `07-settings/account-settings.md` mới là khung.

## Known Issues

See [known-issues.md](../known-issues/known-issues.md) for entries tagged `account-settings-2fa` và `auth-mailtro-id`.

## Related Jira Tickets

- MTRO-88 — 2FA login, Story, QA Review — spec enrol / On / Off / challenge, 409, out-of-scope.
- MTRO-92 — [BE] Security, Story, QA Review — §1 (mã email — lệch).
- MTRO-52 — Forgot and reset password, Story, PASS — link reset dùng chung luồng.
- MTRO-106 — Signed out about 2 hours after logging in, Bug, To Do — phiên 1 ngày.

## Source

- `inventory/MTRO.md` § 2.13, § 3, § 5.4, L27, L28, L33, L37, L39, L41 — staging 29/09/2026, bundle 23/09.
- Jira MTRO-52, 88, 92, 106 — đọc 2026-10-07.
- QA Hub task MTRO-003 (nhóm TC-2FA) — đọc 2026-10-07.
- Repo `qikify-QA-mailtro`: `docs/manual-testcases/01-auth/two-factor.md`, test-run `01-auth/2026-09-23-two-factor-manual-run.md`.
