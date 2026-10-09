<!-- testlane knowledge KB-371 · kind=feature-profile · tag=Auth · status=draft · sourceUrl=https://github.com/ownego/qa-knowledge-work/blob/ae07d04a61509378493a9a07714b04f4e77a36e6/kb/MTRO/features/01-auth-mailtro-id.md · createdAt=2026-10-08T08:00:59.499Z · updatedAt=2026-10-08T08:00:59.499Z -->

# 1. Sign in · Two-factor authentication · Choose a workspace · Create your account · Forgot / Reset password (Mailtro ID)

**Status:** in-review

Phân tích ngày 2026-10-07 từ: `business-rules/MTRO.md` (§ "Kiến trúc & Điều hướng", § "Signup & Workspace", rule 07/08/2026), `open-questions/MTRO.md` § Signup / Login, `inventory/MTRO.md` § 1.2 + § 2.1 (staging đi thật 29/09/2026; màn 2FA challenge 23/09), Jira MTRO-30/41/42/52/54/88/92/106 (đọc 07/10), task QA Hub MTRO-003 / MTRO-004 / MTRO-005 (task cũ, chỉ có notes tóm tắt, **không** có bản phân tích 14 mục / BR ID) và repo `qikify-QA-mailtro` (`docs/bugs/01-auth/2026-08-20-auth-bug-log.md`, test-run 20/08 → 23/09). Nhiều rule Auth dưới đây là **hành vi quan sát trên staging** chứ không phải rule PO chốt — ghi rõ ở từng dòng.

## Purpose

Mọi xác thực của Mailtro chạy trên service riêng **Mailtro ID** (`https://staging-id.mailtro.ai`, biến `AUTH_URL`): đăng ký kèm tạo workspace đầu tiên, đăng nhập (kèm 2FA nếu bật), chọn workspace, quên / đặt lại mật khẩu, verify email. Xong thì điều hướng **cross-domain** sang `https://<slug>.wisle.app`.

## Business Rules

### Kiến trúc & điều hướng — đã xác nhận (rule 07/08, MTRO-30 + repo automation)

- Auth trên Mailtro ID; tính năng trên subdomain workspace `<slug>.wisle.app` (`BASE_URL`, suffix `WORKSPACE_DOMAIN_SUFFIX` = `.wisle.app`). Điều hướng sau signup / verify / login là cross-domain.
- Router Mailtro ID (bundle 28/09, inventory § 1.2): `/login` (`guestOnly`), `/login/two-factor-challenge` (`guestOnly` + `requiresTwoFactorPending` — mở thẳng khi không có lượt chờ → về `/login`), `/signup`, `/forgot-password`, `/reset-password`, `/verify` (`requiresAuth`), `/onboarding` (`requiresAuth` + `requiresVerified`), `/` = **Choose a workspace**.
- Route cần auth trên workspace khi chưa đăng nhập → `AUTH_URL/login?returnTo=AUTH_URL/authorize?redirect_uri=https://<slug>.wisle.app/callback&state=<random>` (staging 29/09).
- **Corrected so với ticket**: MTRO-41 mô tả `/signin` → `/workspaces`; hệ thống thật là `/login` → `/` (Choose a workspace). Description MTRO-41 là spec prototype ("Accept any non-empty email/password…") — không dùng làm rule.

### Sign in (`/login`) — staging 29/09

- h1 `Sign in`, "Welcome back. Enter your details to continue."; `Email` (`you@company.com`), `Password` (`Enter your password`), link `Forgot password?` cùng hàng label Password, link "Don't have an account? `Create one`".
- `Sign in` disabled tới khi cả 2 field có giá trị; `POST /login` `{email, password}`. Response có khoá `two_factor` → `/login/two-factor-challenge`; không có → `Choose a workspace`.
- Sai thông tin: alert `Sign in failed` / `Incorrect email or password.` Không có captcha ở `/login`.
- **Không lộ user enumeration**: email không tồn tại và sai mật khẩu cho cùng status / body / message (bug log auth 20/08; MTRO-92 §1 cũng yêu cầu). Server message "These credentials do not match our records." khác chữ UI — chỉ UI được assert.
- Email **không phân biệt hoa thường** khi login — BUG-AUTH-02 đã sửa, xác nhận 23/09 (TC-MTRO-015). Open question "Email viết HOA" trong `open-questions/MTRO.md` có thể đóng.
- Double-click `Sign in` chỉ gửi 1 request — đã sửa ≤20/08 (spec TC-LOGIN-035 còn `test.fail()` cần gỡ). Open question "Double-click nút Sign in" có thể đóng.
- Rate limit: `/login` 10 request / 60 giây, bucket theo **email**, trừ cả lần login thành công; body 429 `{"message":"Too Many Attempts."}` + `retry-after` (quan sát 20/08). MTRO-92 §1 ghi ">10 lần login/phút cùng email → chặn tạm, thử lại sau 1 phút" — khớp.
- Phiên đăng nhập: **1 ngày** (Dev tăng từ ~2 giờ ngày 29/09, PO đồng ý 30/09 — MTRO-106). Description MTRO-106 vẫn kỳ vọng 1 tháng → xem Edge Cases.

### Two-factor authentication challenge (`/login/two-factor-challenge`) — staging 23/09 + Jira MTRO-88

- 2FA là **opt-in TOTP** bằng authenticator app (bật ở Account settings — xem [15-account-settings-2fa](15-account-settings-2fa.md)). Out of scope theo MTRO-88: bắt buộc 2FA toàn workspace, SMS / email code, "remember this browser", admin reset 2FA của member khác.
- h1 `Two-factor authentication`; chế độ app "Enter the 6-digit code from your authenticator app." (`Authentication code`, placeholder `123456`, `inputmode=numeric`, `autocomplete=one-time-code`); chế độ recovery "Enter one of the recovery codes you saved." (`Recovery code`, `Paste a recovery code`). Nút đổi `Use a recovery code instead` ⇄ `Use a code from your app instead` (xoá nội dung đã gõ + lỗi).
- `This sign-in expires in {time}.` đếm ngược **5:00**; hết giờ → toast `Your sign-in expired. Please sign in again.` và về `/login`. Reload / tab mới mất lượt challenge (state chỉ trong tab, quan sát 23/09).
- `Verify` disabled khi chưa đủ 6 ký tự; sai mã → 422, lỗi dưới field ("The provided two-factor code was invalid."); quá số lần → 429 `Too many attempts. Try again in a minute.` (MTRO-88: 6/phút/session, 20/phút/IP).
- Không có resend, không SMS, không email OTP, không "remember this device" (cả 2 bundle).
- Sau challenge OK → landing bình thường + accept invite nếu URL có `?invite=` (MTRO-88).

### Choose a workspace (`/`) — staging 29/09

- h1 `Choose a workspace`, `Pick a workspace to continue.`; mỗi workspace là link tuyệt đối `https://<slug>.wisle.app/`; `Sign out`.
- Mở thẳng workspace thứ hai trong phiên đang có → **không hỏi lại mật khẩu / 2FA** (23/09, inventory L30). Ngược lại test-run 27/09 ghi "đổi workspace qua switcher bắt đăng nhập lại" (trong phiên Playwright MCP) — hai quan sát lệch, xem Edge Cases.

### Create your account (`/signup`) — rule 07/08 + staging 29/09 + test-run 25/08

- h1 `Create your account`, "Start your free 14-day trial. No credit card required."; 5 field: `Full name` (`Ashley Nguyen`), `Email`, `Password` (`Create a password`), `Workspace name` (`Qikify`), `Workspace URL` (`qikify` + hậu tố `.wisle.app`); link "Already have an account? `Log in`".
- **Đã xác nhận (rule 07/08)**: `Create account` disabled tới khi toàn form hợp lệ; password tối thiểu 8 ký tự; Workspace URL slugify từ Workspace name (lowercase, khoảng trắng → `-`, loại ký tự ngoài `a-z0-9-`) và **ngừng auto-sync vĩnh viễn** khi người dùng sửa tay ô URL; `POST {apiUrl}/register` `{name, email, password, team_name, team_slug}` rồi sang `/verify`; lỗi 422 map xuống đúng field (email trùng → dưới Email, slug trùng → dưới Workspace URL), lỗi không thuộc field → alert chung; CSRF 419 được FE tự lấy token mới và retry.
- **Corrected (25/08)**: open question "Slug từ tên tiếng Việt có dấu" đã có hành vi: slug **transliterate** (`Đội QA Mailtro` → `doi-qa-mailtro`) — BUG-AUTH-05 đã sửa 25/08. Workspace name toàn khoảng trắng → slug rỗng, nút disabled; slug trùng → 422 "The team slug has already been taken." inline. Chưa có xác nhận PO là chủ ý → giữ open question tới khi PO chốt.
- Email signup được **chuẩn hoá** (quan sát 25/08): lowercase + bỏ `+tag` ở mọi domain + bỏ dấu chấm với Gmail → trùng thì 422 ("The email has already been taken." / "An account already exists for this mailbox..."). Hệ quả: không còn tạo tài khoản test bằng alias `+`.
- Client chặn email thiếu TLD (`abc@domain`) — nút disabled (BUG-AUTH-09 sửa 25/08); `abc..def@x.com` qua client, server 422.
- Rule mật khẩu (quan sát 26/08 ở luồng reset, áp dụng chung): ≥8 ký tự **và** có chữ cái **và** không nằm trong danh sách rò rỉ (Pwned).
- Rate limit `/register`: 10 request / 60 giây theo IP/session, trừ cả request 422 (20/08 — BUG-AUTH-04 là not-bug); 429 → `Too many sign-up attempts. Please try again later.` nhưng UI thực tế chỉ hiện alert chung (BUG-AUTH-08).
- **Captcha**: Cloudflare Turnstile ở `/signup` và `/forgot-password` (`window.__MAILTRO__.captcha.enabled = true`, `appearance: interaction-only`), submit kèm `captcha_token`; lỗi `The security check couldn't load. Please reload the page and try again.` / `The security check failed. Please try again.` (23/09). Chưa có business rule cho Turnstile (inventory L33).
- Biến thể invite `?invite=<token>`: h1 `Accept your invitation`, ẩn 2 field workspace, Email prefill readonly, gửi `invitation_token` thay `team_name` / `team_slug` (rule 07/08) — chi tiết ở [14-team-members](14-team-members.md).

### Check your email (`/verify`) & Create your workspace (`/onboarding`)

- **Đã xác nhận (rule 07/08)**: `/verify` có `Resend verification email` (`POST /api/auth/email/verification-notification`) và `I've verified — continue`; bấm continue khi chưa verify thật → bị giữ lại ở `/verify`. Tài khoản chưa verify đăng nhập được nhưng dừng ở `/verify` (task MTRO-004).
- Inventory 29/09 chỉ probe redirect (chưa đăng nhập → `/login`); nội dung `/onboarding` chưa đi (cần tài khoản chưa có workspace — inventory L39).

### Forgot your password? / Reset password — staging 29/09 + test-run 26/08

- `/forgot-password`: h1 `Forgot your password?`, "Enter your email and we'll send you a reset link.", `Send reset link` (disabled khi rỗng; `POST /api/auth/forgot-password` kèm `captcha_token`), `Back to sign in`. Đã login mà mở `/forgot-password` → redirect `/`.
- Màn sau gửi: `Check your email` / `The link expires in 60 minutes.` / `If an account exists for {email}, we've sent a link to reset its password.` (không lộ email có tồn tại) / `Didn't get it? Check your spam folder.` / `Send it again` — 60 giây đầu `Send it again in {seconds}s`; toast `Reset link sent.`; 429 → `Too many attempts. Please wait a minute and try again.`
- Server cooldown ~60 giây / tài khoản: request trong cooldown vẫn 200 nhưng không gửi mail; client lowercase email trước khi gửi (26/08).
- `/reset-password?token=&email=`: h1 `Choose a new password`, `Enter a new password for {email}.`, `New password` (`At least 8 characters`), `Confirm new password` (lệch → `Both passwords must match.`), `Reset password` → toast `Password updated. Sign in with your new password.` rồi về `/login`. Validate password chạy trước kiểm token.
- Không token / token hết hạn: h1 `This link is no longer valid`, "This reset link has expired or has already been used. Request a new one to continue.", `Request a new link` → `/forgot-password`.

## Edge Cases

- Field chỉ chứa khoảng trắng ở Full name / Workspace name — `Need confirm` Dev có trim rồi báo required không (open-questions; TC-SIGNUP-018).
- Password 8 dấu cách: client không chặn, BE 422 "Incorrect email or password." ở login (BUG-AUTH-06, UI báo sai loại lỗi) — `Need confirm` Dev chặn ở tầng nào (open-questions).
- Email `abc..def@x.com`: **Resolved** (test-run 25/08) — server 422. Email `abc@domain`: **Resolved** — client chặn.
- Truy cập `/signup` khi đã đăng nhập — `Need confirm` Dev redirect hay hiện form (open-questions, TC-SIGNUP-056).
- Slug tiếng Việt: **Resolved hành vi** 25/08 (transliterate) — `Need confirm` PO xác nhận là chủ ý.
- Thời hạn phiên: **Resolved** 1 ngày (MTRO-106 comment Dev 29/09, PO OK 30/09); ticket vẫn To Do và description ghi 1 tháng — cần đóng ticket / sửa description.
- **Mâu thuẫn MTRO-92 §1 với hệ thống thật**: MTRO-92 mô tả đăng nhập gửi **mã OTP qua email** ("Check your email", mã 6 số hết hạn 10 phút, khoá gửi lại 60 giây, sai 5 lần về form login) khi chưa bật app; staging 23/09 + bundle 29/09 không có email OTP (chỉ TOTP opt-in), MTRO-88 cũng ghi email code là out-of-scope. `Need confirm` Dev: email OTP đã bỏ, chưa deploy, hay chỉ bật trên production?
- Nhập sai mã 2FA 15–20 lần liên tiếp không bị 429 (TC-MTRO-931, 23/09) trái MTRO-88 (6/phút/session) — nghi bug High, chưa report QA Hub.
- `Sign out` ở `Choose a workspace` (ID host) có huỷ phiên workspace `*.wisle.app` không — quan sát 1 lần 23/09 là **không** (NB-2) — `Need confirm` tái hiện.
- Back của trình duyệt sau login thành công đứng ở form `/login` trống dù phiên còn (TC-MTRO-040, 23/09).
- SSO giữa 2 workspace: 23/09 không hỏi lại 2FA, 27/09 (Playwright MCP) bị bắt đăng nhập lại — `Need confirm` Dev cơ chế cookie trên `staging-id`.
- `/register` không còn kiểm CSRF (token rác vẫn 201, 25/08) — `Need confirm` Dev có chủ ý không.
- Reset password: email trong URL bị sửa nhưng token đúng — case P0 bị blocked (không được đổi mật khẩu tài khoản QA dùng chung).
- Window TOTP, số lần sai trước khi khoá, TTL thật của challenge, định dạng recovery code: không có trong nguồn — `Need confirm` Dev (inventory L41, `two-factor.md`).

## Testability Notes

- Tài khoản Owner QA **bật 2FA** → mỗi phiên cần người nhập mã; `auth.setup.ts` / `login.spec.ts` (10 chỗ) và `signup.spec.ts` (2 chỗ) giả định login xong là thấy `Choose a workspace` sẽ vỡ (inventory L37). Hướng xử lý chưa chọn: tài khoản test không 2FA (`NO2FA_*`), tiêm `AUTH_TOTP_SECRET`, hoặc `storageState` dựng sẵn.
- Không có recovery code thật / không được Regenerate trên tài khoản dùng chung → 6 case recovery bị blocked; không được đổi mật khẩu tài khoản QA → 11 case reset blocked.
- Case nhận mail thật (verify, reset, invite) chặn bởi R13 (chưa có mail API / hộp thư QA kiểm soát được).
- Chạy suite API riêng 1 worker: endpoint auth 10 req/60s, forgot + reset chung bucket (ADR 0004). Case rate limit chỉ chạy khi `RUN_RATE_LIMIT_TESTS=1`.
- `01-auth` là module duy nhất có spec Playwright chạy thật (~133 test, 78% Automated — `auto-manual-ratio.md` 18/08); project `chromium-unauthenticated`.

## Known Issues

See [known-issues.md](../known-issues/known-issues.md) for entries tagged `auth-mailtro-id`.

## Related Jira Tickets

- MTRO-30 — Login / Signup, Epic, **PASS** — flow Sign up → Verify → Login → Create workspace; nguồn các rule 07/08.
- MTRO-41 — Implement email/password sign up and login, Story, PASS — spec prototype (`/signin`, `/workspaces`), không dùng làm rule.
- MTRO-42 — Create workspace during new user sign up, Story, PASS — tạo workspace đầu tiên khi signup.
- MTRO-52 — Forgot and reset password, Story, PASS — description trống; hành vi lấy từ staging + test-run 26/08.
- MTRO-54 — [BE] Build Auth, Login, Story, PASS — description trống.
- MTRO-88 — 2FA login, Story, QA Review — spec TOTP opt-in + challenge (nguồn chính cho phần 2FA).
- MTRO-92 — [BE] Security, Story, QA Review — §1 đăng nhập / captcha / rate limit; phần email OTP lệch staging.
- MTRO-106 — Signed out about 2 hours after logging in, Bug, **To Do (đang mở)** — phiên tăng lên 1 ngày.

## Source

- `business-rules/MTRO.md` § "Kiến trúc & Điều hướng", § "Signup & Workspace" — 07/08/2026.
- `open-questions/MTRO.md` § "Signup", § "Login".
- `inventory/MTRO.md` § 1.2, § 2.1, § 3, L29, L30, L33, L37, L39, L41 — staging 29/09/2026 (2FA: 23/09).
- Jira MTRO-30, 41, 42, 52, 54, 88, 92, 106 — Atlassian MCP, đọc 2026-10-07.
- QA Hub task MTRO-003 (98 case: 32 pass · 5 fail · 20 blocked), MTRO-004 (47 case: 44 pass · 3 blocked), MTRO-005 (62 case: 49 pass · 2 fail · 11 blocked) — đọc 2026-10-07.
- Repo `qikify-QA-mailtro`: `docs/bugs/01-auth/2026-08-20-auth-bug-log.md`; test-run `01-auth/2026-08-20…`, `2026-08-21…`, `2026-08-25…`, `2026-08-26-forgot-password…`, `2026-09-23-login…`, `2026-09-23-two-factor…`; `docs/manual-testcases/01-auth/*.md`.
