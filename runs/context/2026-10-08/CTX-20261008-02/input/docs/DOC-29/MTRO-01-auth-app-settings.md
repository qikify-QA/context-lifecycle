# MTRO — Inventory · Auth, khung app & Settings

> Phần **Auth, khung app & Settings** của inventory MTRO — tách từ `knowledge-work/inventory/MTRO.md` (bản staging 01/10/2026, commit 8596139). Tổng quan, nguồn, route, môi trường, lịch sử build: file `00-overview.md`. Link `#c-…` / `#lxx` trỏ sang file khác thì tìm theo id trong file tương ứng.

## 2. Feature theo trang (phần module)

<a id="c-auth"></a>
### 2.1. Auth & onboarding (Mailtro ID)

| Mục | Nội dung |
|---|---|
| Trạng thái | ✅ Sign in, Choose a workspace, Sign up (form), Forgot / Reset password (form). 🟡 `/verify`, `/onboarding`: chỉ probe redirect. 2FA challenge ✅ theo 23/09 |
| Nguồn xác nhận | staging 29/09 (`MTRO-id-choose-workspace.png`, `MTRO-id-signup.png`, `MTRO-id-forgot-password.png`); challenge: staging 23/09 (giữ) (`MTRO-id-login-two-factor-challenge.png`, `MTRO-id-two-factor-recovery-code.png`); bundle auth 28/09 |
| Route | `/login`, `/login/two-factor-challenge`, `/`, `/signup`, `/forgot-password`, `/reset-password`, `/verify`, `/onboarding` (bảng guard ở [§ 1.2](#s1)) |
| Vào từ | `https://staging-id.mailtro.ai/login`; route cần auth trên workspace redirect sang đây |
| Tag / task QA Hub | `01-auth`, `Login`, `MTRO-30` (MTRO-003, `waiting-for-dev`) · `01-auth`, `Signup`, `MTRO-30` (MTRO-004, `waiting-for-dev`) · `01-auth`, `Forgot password`, `MTRO-52`, `UI` (MTRO-005, `waiting-for-dev`). 2FA: chưa có task |
| Jira | MTRO-30 (Login/Signup phase 1), MTRO-52 (forgot/reset), MTRO-88 (2FA), MTRO-47 (Onboarding) |
| Test case | `01-auth/login.md`, `01-auth/two-factor.md`, `01-auth/signup.md`, `01-auth/forgot-password.md` |
| Lệch mở | [L28](#l28) · [L29](#l29) · [L30](#l30) · [L33](#l33) · [L37](#l37) |
| Liên kết | [`business-rules/MTRO.md`](../business-rules/MTRO.md) § "Kiến trúc & Điều hướng", § "Signup & Workspace" · [`open-questions/MTRO.md`](../open-questions/MTRO.md) § "Login", § "Signup" |

**A. Sign in** (`/login`) — staging 29/09

| Phần tử | Loại | Action → kết quả |
|---|---|---|
| h1 `Sign in`, phụ đề "Welcome back. Enter your details to continue." | text | — |
| `Email` | field, placeholder `you@company.com` | — |
| `Password` | field (password), placeholder `Enter your password` | — |
| `Forgot password?` | link (cùng hàng label Password) | sang `/forgot-password` |
| `Sign in` | button | disabled tới khi cả 2 field có giá trị. `POST /login` `{email, password}`; response có khoá `two_factor` → sang `/login/two-factor-challenge`; không có → vào `Choose a workspace` (23/09) |
| "Don't have an account? `Create one`" | link | sang `/signup` |

- Sai thông tin: alert `Sign in failed` / `Incorrect email or password.` (i18n `auth.signIn.errors.incorrect`; giữ 23/09).
- Không có captcha trên `/login` (Turnstile chỉ ở `/signup`, `/forgot-password`).

**B. Two-factor authentication** (`/login/two-factor-challenge`) — staging 23/09 (giữ); 29/09 chỉ probe guard

| Phần tử | Loại | Action → kết quả |
|---|---|---|
| h1 `Two-factor authentication` | text | cả 2 chế độ |
| Mô tả chế độ app: `Enter the 6-digit code from your authenticator app.` / chế độ recovery: `Enter one of the recovery codes you saved.` | text | — |
| `Authentication code` | field, placeholder `123456` | `id=code`, `inputmode=numeric`, `autocomplete=one-time-code`; FE lọc ký tự không phải số |
| `Recovery code` | field, placeholder `Paste a recovery code` | `id=recovery_code`, `autocomplete=off`; FE bỏ mọi khoảng trắng |
| `This sign-in expires in {time}.` | đồng hồ | đếm ngược từ **5:00** (hằng `d_=300` giây). Hết giờ: toast `Your sign-in expired. Please sign in again.` và tự về `/login` |
| `Verify` | button | disabled khi ô rỗng / chưa đủ **6** ký tự (hằng `f_=6`). `POST /login/two-factor-challenge` body `{code}` hoặc `{recovery_code}` |
| `Use a recovery code instead` ⇄ `Use a code from your app instead` | button | đổi chế độ, xoá nội dung ô và lỗi đang hiện |
| `Back to sign in` | link | sang `/login` |
| Alert `Verification failed` + nội dung | alert | sai mã: BE 422, lỗi field lấy từ `code[0]` / `recovery_code[0]`. Quá số lần: 429 `Too many attempts. Try again in a minute.` |

- Không có nút resend / cooldown mã; không có "remember / trust this device"; không có SMS, email OTP (không có chuỗi nào trong cả 2 bundle).
- Guard `requiresTwoFactorPending`: mở thẳng URL khi không có lượt login đang chờ thì về `/login` (probe 29/09).

**C. Choose a workspace** (`/`) — staging 29/09

| Phần tử | Loại | Action → kết quả |
|---|---|---|
| h1 `Choose a workspace`, phụ đề `Pick a workspace to continue.` | text | — |
| `QA Workspace`, `Qikify QA Team` | link (href tuyệt đối `https://<slug>.wisle.app/`) | sang workspace |
| `Sign out` | button | đăng xuất |

- Mở thẳng `https://<slug>.wisle.app/` trong phiên đang có thì **không hỏi lại mật khẩu, không hỏi lại 2FA** (23/09, [L30](#l30)).

**D. Create your account** (`/signup`) — staging 29/09 (không submit)

| Phần tử | Loại | Action → kết quả |
|---|---|---|
| h1 `Create your account`, phụ đề "Start your free 14-day trial. No credit card required." | text | — |
| `Full name` | field, placeholder `Ashley Nguyen` | — |
| `Email` | field, placeholder `you@company.com` | — |
| `Password` | field, placeholder `Create a password` | — |
| `Workspace name` | field, placeholder `Qikify` | — |
| `Workspace URL` | field, placeholder `qikify`, hậu tố `.wisle.app` | — |
| `Create account` | button | disabled khi form trống. `POST /register`; 429 → `Too many sign-up attempts. Please try again later.` (23/09) |
| "Already have an account? `Log in`" | link | sang `/login` |

- **Biến thể invite** `?invite=<token>`: h1 `Accept your invitation`, phụ đề `Create your account to join the workspace.` Thấy thật 29/09 bằng token giả khi **chưa** đăng nhập. Khi **đang** đăng nhập: xem [L29](#l29).
- **Captcha**: Cloudflare Turnstile, `window.__MAILTRO__.captcha.enabled = true` (HTML `/login` 29/09), `appearance: interaction-only` nên thường vô hình; submit gửi kèm `captcha_token`. Lỗi: `The security check couldn't load. Please reload the page and try again.` / `The security check failed. Please try again.` (23/09).

**E. Forgot your password? / Reset password** — staging 29/09 (không submit)

| Phần tử | Loại | Action → kết quả |
|---|---|---|
| `/forgot-password`: h1 `Forgot your password?`, phụ đề "Enter your email and we'll send you a reset link." | text | — |
| `Email` | field, placeholder `you@company.com` | — |
| `Send reset link` | button | disabled khi rỗng. `POST /api/auth/forgot-password` (kèm `captcha_token`) |
| `Back to sign in` | link | sang `/login` |
| Màn sau khi gửi (23/09, giữ) | text + button | `Check your email` / `The link expires in 60 minutes.` / `If an account exists for {email}, we've sent a link to reset its password.` / `Didn't get it? Check your spam folder.` / nút `Send it again`, 60 giây đầu là `Send it again in {seconds}s` (hằng `L_=60`); toast `Reset link sent.`; 429 → `Too many attempts. Please wait a minute and try again.` |
| `/reset-password?token=…&email=…` (thử bằng token giả `ash-inventory-probe`): h1 `Choose a new password`, phụ đề `Enter a new password for {email}.` | text | — |
| `New password` | field, placeholder `At least 8 characters` | — |
| `Confirm new password` | field, placeholder `Re-enter your new password` | lệch nhau: `Both passwords must match.` (23/09) |
| `Reset password` | button | disabled khi rỗng. `POST /api/auth/reset-password`; thành công: toast `Password updated. Sign in with your new password.` rồi về `/login` (23/09) |
| Không token: h1 `This link is no longer valid`, alert "This reset link has expired or has already been used. Request a new one to continue." | text | — |
| `Request a new link` | button | sang `/forgot-password` |

**F. Check your email** (`/verify`) · **Create your workspace** (`/onboarding`) — chỉ probe 29/09: chưa đăng nhập thì redirect về `/login`. Chưa đi nội dung (cần tài khoản chưa verify / chưa có workspace, [L39](#l39)).

---

<a id="c-shell"></a>
### 2.2. Khung app: sidebar, workspace switcher, user menu, topbar, Home

| Mục | Nội dung |
|---|---|
| Trạng thái | ✅ khung · 🟡 Home là placeholder · `News` / `Support` chưa có chức năng |
| Nguồn xác nhận | staging 29/09 (`MTRO-workspace-switcher.png`, `MTRO-sidebar-expanded.png`, `MTRO-home.png`) |
| Route | `/`, `/dashboard` (Home; `/` không redirect sang `/dashboard`, URL giữ nguyên — 16/09) |
| Tag / task QA Hub | *chưa có task nào mang tag* |
| Jira | MTRO-7 Dashboard |
| Test case | — |
| Lệch mở | [L31](#l31) |

**Sidebar** (thứ tự thật, staging 29/09, sau khi bấm `Toggle sidebar` để mở rộng)

| Mục | Loại | Action → kết quả |
|---|---|---|
| `Home` | nav item | `/` |
| `Contacts` + `Toggle Contacts submenu` | nav item + button | `/contacts`; submenu: `Segments`, `Custom fields`, `Suppressions` |
| `Email library` + `Toggle Email library submenu` | nav item + button | `/templates`; submenu: `Saved blocks` |
| `Email preferences` | nav item | `/preferences` |
| `Campaigns` | nav item | `/campaigns` |
| `Automations` | nav item | `/automations` |
| `Settings` | button mở nhóm | `Account settings`, `API keys`, `Claude connector`, `Sending domains`, `Workspace settings` |
| `Toggle sidebar` | button (pressed) | sidebar mặc định **thu gọn** (icon + tooltip) ở 1280×800 |

**Thành phần khung khác**

| Phần tử | Loại | Action → kết quả |
|---|---|---|
| Workspace switcher góc trên trái (`QW QA Workspace Owner`) | button → menu | nhóm `Teams` (`QA Workspace`, `Qikify QA Team`) · `Team members` (`/members`) · `Workspace settings` · `Sign out` |
| User menu góc dưới trái | button → menu | `Account settings` · `Sign out` |
| `News` (topbar) | button | toast `News` / `Not available yet.` |
| `Support` (topbar) | button | toast `Not available yet.` (cùng key i18n `topbar.notAvailable`) |

**Home**: h1 "Welcome to QA Workspace" / "This is a placeholder dashboard screen." — không đổi từ 16/09.

**Khác biệt role**: Member (workspace `Qikify QA Team`, 23/09) vẫn thấy đủ 5 mục Settings ([L38](#l38)).

---

<a id="c-members"></a>
### 2.12. Settings › Team members

| Mục | Nội dung |
|---|---|
| Trạng thái | 🟡 list, Invite, lời mời (Resend / Revoke) thấy thật. `Edit member` / đổi role / `Remove from team`: bundle (không có member Active nào ngoài Owner) |
| Nguồn xác nhận | staging 29/09 (`MTRO-members.png`, `MTRO-members-invite-chips.png`) |
| Route | `/members` (không có trên sidebar) |
| Vào từ | workspace switcher › `Team members` |
| Tag / task QA Hub | `Permission` (MTRO-017/018, gián tiếp); `02-team` chưa có task |
| Jira | MTRO-20 Team & member › MTRO-43 (invite new user), MTRO-55 (BE invite API) |
| Test case | `02-team/invite-member.md` |
| Lệch mở | [L24](#l24) · [L33](#l33) · [L38](#l38) · [L39](#l39) |
| Liên kết | [`business-rules/MTRO.md`](../business-rules/MTRO.md) § "Role & Permission" · [`open-questions/MTRO.md`](../open-questions/MTRO.md) § "Tên hiển thị chính thức của role thứ 3" |

| Phần tử | Loại | Action → kết quả |
|---|---|---|
| Header "Invite teammates and manage their access." | text | — |
| `Invite member` | button | mở dialog **Invite a member** |
| Bảng: `Name` (avatar, tên, email) · `Role` (`Owner`) · `Status` (`Active`) · cột menu (trống cho Owner) | table | không có cột 2FA (23/09) |
| Dialog **Invite a member** — "They'll receive an email invite to join this workspace." | dialog | — |
| `Email` | field dạng chip (phân tách bằng dấu phẩy; placeholder `teammate@company.com, another@company.com`) | chip lỗi viền đỏ + icon khi: sai định dạng (`bad-email`), đã là member (email Owner), trùng lặp. Dòng lỗi "Remove the invalid or duplicate email(s) to send invites." |
| `Invite as` | select {Admin, Member}, mặc định Member | — |
| `Cancel` / `Send invite` | button | `Send invite` disabled khi rỗng hoặc còn chip lỗi. i18n: `Send {count} invites`, `Sending {done}/{total}…`. Gửi xong: toast `Invitation sent` / `Invited as Member.` — **bảng không tự thêm dòng**, phải reload ([L24](#l24)) |
| Dòng lời mời | row | avatar `A`, tên = phần trước @, `Member`, `Invited`, nút `Row actions` |
| `Row actions` (lời mời) | menu | `Resend invite` · `Revoke invitation` |
| `Revoke invitation` | alertdialog | `Revoke invitation?` / "{email} will no longer be able to join with this invite." (`Cancel` / `Revoke`) → toast `Invitation revoked` + email |

- **Bundle, chưa đối chiếu UI**: menu dòng member Active `Edit member` · `Remove from team`; dialog `Edit member` ("Update this teammate's access.", Name/Email chỉ đọc, `Role`, `Save changes`); confirm `Change {name}'s role to {role}?`, `Remove {name}?` ("They will immediately lose access to {team}. This can't be undone.").

---

<a id="c-account"></a>
### 2.13. Settings › Account settings & 2FA

| Mục | Nội dung |
|---|---|
| Trạng thái | ✅ trang và 2 dialog xác nhận (`Turn off`, `Regenerate recovery codes`, thấy thật 29/09). 🟡 luồng enrol: bundle (tài khoản đang On) |
| Nguồn xác nhận | staging 29/09 (`MTRO-settings-account.png`, `MTRO-settings-account-2fa-turnoff.png`); enrol, trạng thái Off, API: bundle 23/09 (giữ) |
| Route | `/settings/account` |
| Vào từ | Settings › `Account settings`; user menu › `Account settings` |
| Tag / task QA Hub | *chưa có task nào mang tag* (`01-auth` chỉ có MTRO-003/004/005) |
| Jira | MTRO-88 (2FA); MTRO-45/46/49 (settings — theo ghi chú 16/09, chưa kiểm) |
| Test case | `01-auth/two-factor.md` |
| Lệch mở | [L27](#l27) · [L28](#l28) · [L33](#l33) |

| Phần tử | Loại | Action → kết quả |
|---|---|---|
| Header "Manage your personal account." | text | — |
| Khối **Profile** — "The account you're signed in as." | read-only | `Name:` · `Email:` (không đổi tại đây) |
| Khối **Password** — "We'll email you a secure link to set a new password." | group | nút `Send reset link` + "The link expires in 60 minutes." (không bấm). Sau khi bấm (i18n): `Resend in {seconds}s`; lỗi `We can't tell which account you're signed in as. Reload the page and try again.` |
| Khối **Two-factor authentication** — "Ask for a code from an authenticator app on top of your password." | group | badge `On` / `Off` (Owner: **On**) |
| Khi On | text + button | "You'll be asked for a code the next time you sign in." · `Regenerate recovery codes` · `Turn off` |
| Khi Off (i18n) | text + button | "Your password on its own signs you in." · `Set up two-factor authentication` |
| `Turn off` | dialog | **`Turn off two-factor authentication?`** — "Your password alone will sign you in again, and your recovery codes stop working. Enter your current password to confirm." · `Current password` · `Cancel` / `Turn off` (disabled khi rỗng). **Đã Cancel.** Toast sau khi tắt (i18n): `Two-factor authentication turned off` |
| `Regenerate recovery codes` | dialog | **`Regenerate recovery codes?`** — "This replaces all eight codes — the ones you saved before stop working immediately. Enter your current password to confirm." · `Current password` · `Cancel` / `Regenerate` (disabled). **Đã Cancel.** Toast (i18n): `Recovery codes regenerated` |

**Enrol** (i18n `settings.twoFactor.enrol.*`, bundle, chưa đối chiếu UI) — tiêu đề `Set up two-factor authentication`:
1. "Start by confirming the password you sign in with." · `Current password` · `Continue`.
2. "Scan this with an authenticator app — 1Password, Google Authenticator, Authy, or any other." · "Can't scan it? Enter this key in the app instead:" + `Copy the setup key` · `Continue`.
3. "Enter the six-digit code your app is showing now." · `Authentication code` · `Verify and turn on`.
4. "Two-factor authentication is on. Save these recovery codes — they're the way back in if you lose your phone." · `Done`.

**Recovery codes** dialog: "Your previous codes no longer work. Save this set instead." · "Each code works once, and this is the only time we can show them. Store them somewhere you can reach without your phone." · `Copy all` · `Download` · `Done`. **8 mã**, mỗi mã dùng một lần.

**API** (bundle 23/09): `POST /api/user/two-factor` `{password}` (bắt đầu enrol) · `POST /api/user/two-factor/confirm` `{code}` · `DELETE /api/user/two-factor` `{password}` · `POST /api/user/two-factor/recovery-codes` `{password}` → `recovery_codes`.

- **Hành vi**: trang giống nhau ở mọi workspace (mở ở `qikify-qa-team.wisle.app` với role Member cũng vậy, 23/09) — cấu hình thuộc **tài khoản**, không thuộc workspace.
- **Không có ở đâu trong app**: quản lý phiên / thiết bị, "sign out other sessions", lịch sử đăng nhập, khoá tài khoản, đổi mật khẩu tại chỗ (chỉ gửi link), 2FA qua SMS/email, "remember this device" ([L28](#l28)). Màn chặn "workspace bắt buộc 2FA" đã bị gỡ khỏi bundle ([§ 5.4](#s5-4), [L27](#l27)).

---

<a id="c-api-keys"></a>
### 2.14. Settings › API keys

| Mục | Nội dung |
|---|---|
| Trạng thái | ✅ (đi bằng `ash-inventory-key`, scope `contacts:read`: tạo → Audit log → Rotate → Revoke cả hai key) |
| Nguồn xác nhận | staging 29/09 (`MTRO-settings-api-keys-create.png`) · i18n `page.apiKeys.*` |
| Route | `/settings/api-keys` |
| Vào từ | Settings › `API keys` |
| Tag / task QA Hub | *chưa có task nào mang tag* |
| Jira | MTRO-44 (MCP connectors) / MTRO-21 (API?) — theo ghi chú 16/09, chưa kiểm |
| Test case | — |
| Lệch mở | [L25](#l25) · [L33](#l33) |

| Phần tử | Loại | Action → kết quả |
|---|---|---|
| Header "Let your own code call the Mailtro API for this workspace." | text | — |
| Empty | text + button | `No API keys yet` / "Create a key to let your app read and manage this workspace through the Mailtro API." · `Create API key` |
| Dialog **Create API key** — "The key belongs to this workspace and can only do what its scopes allow." | dialog | — |
| `Name` | field, placeholder `e.g. Storefront sync` | hint "Shown in the key list and audit log." |
| Ma trận `Resource` × `Read` / `Write` / `Send` | checkbox grid | Contacts (`contacts:read` ✔, `contacts:write` ✔) · Segments (`segments:read` ✔, `segments:write`) · Templates (`templates:read` ✔, `templates:write`) · Campaigns (`campaigns:read` ✔, `campaigns:write`, `campaigns:send`) · Suppressions (`suppressions:read` ✔, `suppressions:write`) · Domains (`domains:read` ✔) · Automations (`automations:read` ✔) · Transactional emails (`emails:send`). "At least one scope is required." Tick scope Send → "Send scopes let this key send email to real recipients. Grant them only if this integration must trigger sends." |
| `Cancel` / `Create key` | button | `Create key` disabled khi Name trống |
| Dialog **API key created** | dialog | "“{name}” is ready to use." · "Copy it now — this is the only time the full key is shown. If you lose it, rotate the key to get a new one." · khối code chứa full key (tiền tố `mtro_sk_`) + `Copy` · "Use it as a Bearer token in the Authorization header." · `Done` / `Close` |
| Bảng: `Name` (+ "Created by {name}") · `Key` (tiền tố `mtro_sk_xxxx…`) · `Scopes` · `Status` (`Active` / `Expires in 24 hours` / `Revoked`) · `Last used` (`Never`) · `Actions for {name}` | table | — |
| Menu dòng Active | menu | `Audit log` · `Rotate` · `Revoke` |
| Menu dòng `Expires in 24 hours` | menu | vẫn `Audit log` · `Rotate` · `Revoke` ([L25](#l25)) |
| Menu dòng Revoked | menu | chỉ `Audit log` |
| `Audit log` | dialog | `Audit log — {name}` / "Every change to this key, and who made it." · danh sách sự kiện (`Created` by [REDACTED] · `this minute`) · `Close` |
| `Rotate` | alertdialog | `Rotate “{name}”?` / "Rotating creates a new key with the same name and scopes and shows it once. The current key keeps working for 24 hours, then expires." (`Cancel` / `Rotate key`) → dialog `API key created` với key mới; bảng thành **2 dòng cùng tên**: mới `Active`, cũ `Expires in 24 hours` |
| `Revoke` | alertdialog | `Revoke “{name}”?` / "The key stops working immediately and can't be restored. Anything still using it will start getting authentication errors." (`Cancel` / `Revoke key`) → status `Revoked` |

---

<a id="c-claude"></a>
### 2.15. Settings › Claude connector

| Mục | Nội dung |
|---|---|
| Trạng thái | ✅ trang hướng dẫn (không có form), không đổi từ 16/09 |
| Nguồn xác nhận | staging 29/09 (`MTRO-settings-claude.png`) |
| Route | `/settings/claude` |
| Vào từ | Settings › `Claude connector` |
| Tag / task QA Hub | *chưa có task nào mang tag* |
| Jira | MTRO-44 MCP connectors, MTRO-50 "MCP Claude for contact" (theo ghi chú 16/09) |
| Test case | — |
| Lệch mở | [L33](#l33) |

| Phần tử | Loại | Action → kết quả |
|---|---|---|
| Header "Let Claude build campaigns in this workspace from a plain-English brief." | text | — |
| `What Claude gets access to` | alert | — |
| `Connector URL` `https://staging-mcp.mailtro.ai/mcp` + `Copy` | text + button | chép URL |
| `Connect it` | 4 bước | copy URL → claude.ai Settings → Connectors → Add custom connector → approve trên màn sign-in Mailtro, chọn workspace |
| `Things to ask it` | 3 câu ví dụ | — |
| `What it can and cannot do` | text | build & save segments, create/edit draft campaigns, "It cannot send." |

---

<a id="c-domains"></a>
### 2.16. Settings › Sending domains

| Mục | Nội dung |
|---|---|
| Trạng thái | ✅ list, Add domain (validation + submit), menu dòng, Delete confirm, Domain settings của domain Pending. Bảng DNS records **không hiện** khi domain chưa provision ([L26](#l26)) |
| Nguồn xác nhận | staging 29/09 (`MTRO-domain-settings.png`) · i18n `page.domains.*`, `page.domainConfig.*` |
| Route | `/settings/domains`, `/settings/domains/:id`; `/settings` redirect về đây |
| Vào từ | Settings › `Sending domains`; `Manage sending domains` (wizard Sender), `Manage domains` (Send email automation) |
| Tag / task QA Hub | *chưa có task nào mang tag* (`03-account-setup` chưa có task) |
| Jira | — (chưa rõ) |
| Test case | — |
| Lệch mở | [L26](#l26) · [L39](#l39) |
| Liên kết | [`business-rules/MTRO.md`](../business-rules/MTRO.md) § "Bắt buộc SPF/DKIM/DMARC cho sending domain", § "Sending Domain & Campaign" |

| Phần tử | Loại | Action → kết quả |
|---|---|---|
| Header "Manage sending domains and DNS configuration." | text | — |
| Empty | text + button | `Your domain, your brand` / "Better deliverability, stronger brand recognition, and full control over your sender identity." · `Add domain` |
| Dialog **Add sending domain** — "Enter the domain you want to send email from." | dialog | — |
| `Domain` | field, placeholder `mail.mydomain.com`, hint "Example: mydomain.com" | `gmail.com` → "Public email domains (gmail, yahoo, etc.) cannot be used"; `not a domain` → "Please enter a valid domain (e.g., mydomain.com)" |
| `Cancel` / `Add domain` | button | disabled khi rỗng hoặc sai. Hợp lệ: `POST …/domains` 201, dialog đóng, bảng nạp lại |
| Bảng: `Domains` · `Status` (`Pending`) · `Actions for {domain}` | table | — |
| Menu dòng | menu | `Edit` (sang Domain settings) · `Delete` |
| Delete | alertdialog | `Remove {domain}?` / "This domain will stop sending immediately. This can't be undone." (`Cancel` / `Remove`) — đã Cancel |
| **Domain settings** (`/settings/domains/:id`) | page | breadcrumb Settings › Sending domains › Domain settings · h1 = domain · badge `Pending` · `Verify` (disabled) · link `Back` · "To send from this domain, contact support to start verification." Không có khối DKIM / Custom MAIL FROM / DMARC / Tracking khi chưa provision |

- **Bundle, chưa đối chiếu UI**: khối `DKIM`, `Custom MAIL FROM` (`Recommended`), `DMARC`, `Tracking` (`Optional`, "Domain tracking isn't available yet."), bảng DNS Type / Name / Content / Priority, status {Verified, Pending, Failed, Temporary failure, Inactive}, `Domain not found.`

---

<a id="c-workspace"></a>
### 2.17. Settings › Workspace settings

| Mục | Nội dung |
|---|---|
| Trạng thái | ✅ (đi thật 29/09, không Save) |
| Nguồn xác nhận | staging 29/09 · bundle 29/09 |
| Route | `/settings/workspace` |
| Vào từ | Settings › `Workspace settings`; switcher › `Workspace settings` |
| Tag / task QA Hub | *chưa có task nào mang tag* |
| Jira | — (chưa rõ) |
| Test case | — |
| Lệch mở | [L33](#l33) · [L38](#l38) |

| Phần tử | Loại | Action → kết quả |
|---|---|---|
| h1 `Workspace settings`, phụ đề "Manage QA Workspace." (mới 29/09; 23/09 không có) | text | — |
| `Workspace name` | field (placeholder `Acme Marketing`, giá trị `QA Workspace`) | — |
| `Save changes` | button | disabled khi chưa đổi |
| **Transfer ownership** — "Hand this workspace to another member. You'll become an admin afterward." | group | — |
| `Transfer ownership` | button (disabled) | "Invite another member first — ownership can only go to an existing member." |

- **Bundle, chưa đối chiếu UI**: hint `Only owners and admins can rename this workspace.` (khi không có quyền); dialog chuyển quyền "Choose the member who will become the new owner. You'll be demoted to admin." · `Member` (`Select a member`) · `Cancel` / `Transfer`.
- Không có mục bảo mật / bắt buộc 2FA cấp workspace (23/09).

---

<a id="c-missing"></a>
### 2.18. Mục chưa có trên staging

| Mục | Nội dung |
|---|---|
| Nguồn xác nhận | staging 29/09 (sidebar); route trắng: thử 16/09 và 23/09 |
| Lệch mở | [L28](#l28) · [L42](#l42) |

| Epic / mục | Trạng thái 2026-09-29 (MTRO-22: 2026-10-01) |
|---|---|
| MTRO-7 Dashboard | 🟡 placeholder ([2.2](#c-shell)) |
| MTRO-16 Analytics | 🟡 số liệu đã có ở Campaign report ([2.10-C](#c-campaigns)) và Automation Reports ([2.11-C](#c-automations)). Chưa có trang analytics tổng (`/analytics` trắng, lần thử trước) |
| MTRO-17 Preference center | 🟡 đã có Email preferences builder ([2.9](#c-preferences)) + chọn page ở Recipients / Send email. **Chưa thấy trang công khai** (01/10: không có route trong SPA, chỉ có component preview — [L76](#l76)) |
| MTRO-18 Brand guideline | ❌ không có mục nào (`/brand` trắng) |
| MTRO-9 Sign-up form | ❌ (`/forms` trắng) |
| MTRO-22 Migrate Brevo / Import CSV contacts | 🟡 **01/10**: đã có Import contacts (CSV) + Export contacts ([2.3](#c-contacts), [L42](#l42)). Chưa thấy gì riêng cho Brevo |
| MTRO-47 Onboarding trong app | ❌ không có trên app; `/onboarding` chỉ có trên Mailtro ID, cần tài khoản chưa có workspace |
| Billing | ❌ (`/settings/billing` trắng) |
| Quản lý phiên / thiết bị | ❌ (`/settings/security`, `/settings/sessions` trắng) |

<a id="s3"></a>
## 5. Phát hiện lệch — Auth, khung app & Settings

### 5.1. Còn mở (12 dòng thuộc module)

| # | Loại | Chương | Chi tiết | BR bị ảnh hưởng | Đề xuất | Số cũ |
|---|---|---|---|---|---|---|
| <a id="l24"></a>L24 | Bug? | [2.12](#c-members) | Gửi lời mời xong có toast `Invitation sent` nhưng **bảng không thêm dòng `Invited`**, phải reload | — | báo Dev: refetch list sau khi invite | 5D #24 |
| <a id="l25"></a>L25 | Hỏi Dev / PO | [2.14](#c-api-keys) | Sau `Rotate`, dòng key cũ (`Expires in 24 hours`) **vẫn có `Rotate`**, nên rotate lần nữa sinh thêm key từ key sắp hết hạn. Bảng hiện 2 dòng cùng tên, khác nhau chỉ ở tiền tố key | — | hỏi: key đang hết hạn có được rotate không; thêm case | 5D #25 |
| <a id="l26"></a>L26 | Rule cần sửa / Hỏi PO | [2.16](#c-domains) | Domain mới ở `Pending`: Domain settings **không hiện record DNS nào**, chỉ "To send from this domain, contact support to start verification." và `Verify` disabled. Rule § "Bắt buộc SPF/DKIM/DMARC cho sending domain" giả định user tự cấu hình DNS | `business-rules/MTRO.md § "Bắt buộc SPF/DKIM/DMARC cho sending domain"` | hỏi PO: verify có qua support không; sửa rule / case domain | 5D #26 |
| <a id="l27"></a>L27 | Hỏi PO | [2.13](#c-account) | Route `/setup-2fa` và khối i18n `settings.twoFactorSetup` ("Two-factor authentication is required to use this workspace…") đã bị gỡ khỏi bundle 29/09 | — | hỏi PO: "bắt buộc 2FA theo workspace" đã bỏ khỏi scope chưa | 5D #20 (phần câu hỏi) |
| <a id="l28"></a>L28 | Hỏi PO | [2.13](#c-account) [2.18](#c-missing) | **Không có** quản lý phiên / thiết bị, "sign out other sessions", lịch sử đăng nhập, đổi mật khẩu tại chỗ (chỉ gửi link) | — | hỏi PO có trong roadmap không; nếu không thì case "đăng xuất thiết bị khác" đóng ❌ out-of-scope thay vì blocked | 5A #10 |
| <a id="l29"></a>L29 | Bug? (chưa kiểm lại) | [2.1](#c-auth) | Mở `/signup?invite=<token không hợp lệ>` khi **đang đăng nhập**: picker gọi `POST /api/invitations/<token>/accept`, BE trả **405**; UI im lặng, bỏ tham số `?invite`, không hiện toast `We couldn't add you to that workspace. Pick one of your workspaces to continue.` (23/09) | — | báo Dev: mong đợi 404/410 + toast `inviteFailed`; thêm case vào `01-auth` | 5A #7 |
| <a id="l30"></a>L30 | Hỏi Dev (chưa kiểm lại) | [2.1](#c-auth) | Mở thẳng `https://qikify-qa-team.wisle.app/` trong phiên đang đăng nhập → vào luôn, không hỏi lại mật khẩu / 2FA. Log `docs/test-runs/06-automations/2026-09-16-automations-manual-run.md` ghi 6 case blocked vì "workspace B đòi login lại + 2FA": TC-MTRO-812/813/814/823/824/891 | — | chạy lại 6 case; xác nhận với Dev đây là SSO cố ý (cookie trên `staging-id`) | 5A #5 |
| <a id="l31"></a>L31 | Hỏi Dev | [2.2](#c-shell) | Route không tồn tại trả **trang trắng** (không sidebar, không 404) — khó phân biệt "chưa có" với "lỗi render" | — | hỏi Dev có trang 404 dự kiến không | 5B #21 |
| <a id="l33"></a>L33 | Rule chưa có | [2.1](#c-auth) [2.12](#c-members) [2.13](#c-account) [2.14](#c-api-keys) [2.15](#c-claude) [2.17](#c-workspace) | Chưa có business rule cho: 2FA (challenge 6 số, hạn 5 phút; enrol 4 bước; **8 recovery code dùng một lần**; `Turn off` / `Regenerate` đòi `Current password`; 4 endpoint `/api/user/two-factor*`), Turnstile ở `/signup` + `/forgot-password`, Account settings (reset link 60 phút), API keys (scope matrix, mặc định `*:read` + `contacts:write`, Rotate 24h), Claude connector, Workspace settings (Transfer ownership chặn khi 1 member), Team members (Invite as Admin/Member, nhiều email). Case 2FA đã có (`01-auth/two-factor.md`); Turnstile chưa có case | — | chạy `update-business-rules` khi có ticket chạm các màn này (MTRO-88, MTRO-45/46/49, MTRO-44); hỏi Dev key test/bypass Turnstile cho CI | 5A #1, 5A #8, 5A #9, 5B #16 |
| <a id="l37"></a>L37 | Môi trường | [2.1](#c-auth) | Đăng nhập: 29/09 agent không đọc được mật khẩu trong `.env` (permission classifier), người dùng nhập tay. **01/10** agent điền `OWNER_EMAIL` / `OWNER_PASSWORD` từ `.env` được, người dùng chỉ nhập mã 2FA. Vẫn cần người cho mỗi phiên vì Owner bật 2FA. Spec tự động: `tests/01-auth/login.spec.ts` (10 chỗ) và `signup.spec.ts` (2 chỗ) giả định login xong là thấy `Choose a workspace`: với Owner bật 2FA sẽ dừng ở challenge (TC-LOGIN-020/021/023/024) | — | chọn: tài khoản test không 2FA, tiêm TOTP secret vào runner, hoặc `storageState` dựng sẵn; ghi vào README + `.env` repo automation | 5D #22 (phần đăng nhập), 5A #3 |
| <a id="l38"></a>L38 | Môi trường / Hỏi PO | [2.12](#c-members) [2.17](#c-workspace) | `ADMIN_*` vẫn placeholder, workspace chỉ 1 member → permission matrix Owner/Admin/Member chưa chạy được; Member chưa đi lần này. Quan sát 23/09 ở `Qikify QA Team` (role Member): sidebar vẫn đủ 5 mục Settings (`API keys`, `Workspace settings`…) | — | invite tài khoản Admin/Member thật + điền `.env`; tạm dùng workspace B cho case Member; hỏi PO Member thấy `API keys` + `Workspace settings` có đúng không | 5B #18, 5C #9, 5A #6 |
| <a id="l39"></a>L39 | Môi trường | [2.1](#c-auth) [2.8](#c-saved-blocks) [2.10](#c-campaigns) [2.12](#c-members) [2.16](#c-domains) | Còn thiếu data để đi: member Active (Edit member / Remove), domain đã provision (DNS records, Verify), campaign Scheduled / Running (Reschedule / Stop), saved block của người khác (read-only; **01/10 workspace không còn saved block nào**, xem [L54](#l54)), tài khoản QA phụ chưa bật 2FA và chưa verify (enrol 2FA, `/verify`, `/onboarding`, link invite thật, nội dung mail reset/verify) | — | chuẩn bị các data này trước lần build sau | 5D #22 (phần data), 5B #19 (phần còn), 5A #11 (phần còn) |

### 5.2. Đã đóng (3 dòng thuộc module)

| # | Số cũ | Nội dung | Ngày đóng | Lý do đóng |
|---|---|---|---|---|
| Đ19 | 5A #11 (phần dialog) | 2 dialog `Turn off` / `Regenerate recovery codes` chưa thấy UI | 2026-09-29 | đã mở rồi Cancel 29/09, hệ thống hoá vào [2.13](#c-account); phần còn → L39 |
| Đ20 | 5B #2 (phần hệ thống), 5B #1 (phần hệ thống), 5B #13 (phần hệ thống) | 2FA login, Suppressions / API keys / Claude connector, dialog Email details đã lên staging | 2026-09-29 | hệ thống hoá vào [2.1](#c-auth), [2.13](#c-account), [2.6](#c-suppressions), [2.14](#c-api-keys), [2.15](#c-claude), [2.7](#c-library); phần reference → L35 |
| Đ21 | 5A #8 (phần hệ thống) | Turnstile bật trên staging | 2026-09-29 | hệ thống hoá vào [2.1-D](#c-auth), [§ 3](#s3); phần rule/case → L33 |

### 5.4. Đã bỏ khỏi hệ thống (1 dòng thuộc module)

| Thứ đã bỏ | Thay bằng (29/09) | Xác nhận | Ghi chú |
|---|---|---|---|
| Epic MTRO-16 Analytics ❌, MTRO-17 Preference center ❌ | 🟡 một phần | staging 29/09 | [2.18](#c-missing) |
