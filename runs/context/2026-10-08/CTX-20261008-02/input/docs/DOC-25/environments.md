<!-- testlane knowledge KB-393 · kind=env · tag=— · status=draft · sourceUrl=https://github.com/ownego/qa-knowledge-work/blob/ae07d04a61509378493a9a07714b04f4e77a36e6/kb/MTRO/testing/environments.md · createdAt=2026-10-08T08:02:44.869Z · updatedAt=2026-10-08T08:02:44.869Z -->

# Environments — Mailtro (MTRO)

**Status:** in-review

Môi trường test, tài khoản, cách chạy. **Không ghi mật khẩu, token, API key ở đây** — data đăng nhập nằm ở file `.env` của repo automation `qikify-QA-mailtro` (chỉ liệt kê tên biến). Dựng 2026-10-07 từ `inventory/MTRO.md` § 4.1 (01/10), repo (`README.md`, `playwright.config.ts`, `.env.example`, `config/env.ts`, test-run 16/09 → 06/10) và ghi chú `references/apps/MTRO.md`.

## Staging

| Thứ | Giá trị | Biến `.env` |
|---|---|---|
| Mailtro ID (auth) | `https://staging-id.mailtro.ai` | `AUTH_URL` |
| App workspace QA | `https://qa-workspace.wisle.app` (workspace `QA Workspace`, role Owner) | `BASE_URL`; suffix `WORKSPACE_DOMAIN_SUFFIX` = `.wisle.app` |
| Workspace thứ hai | `https://qikify-qa-team.wisle.app` (`Qikify QA Team`) — cùng tài khoản, role **Member** | — (dùng tạm cho case góc nhìn Member) |
| MCP connector | `https://staging-mcp.mailtro.ai/mcp` | — |
| Bundle FE (nguồn đọc route / i18n) | `staging-portal.mailtro.ai/assets/mailtro.js`, `staging-login.mailtro.ai/assets/mailtro.js` | — |
| API docs Public API | staging-api `/docs` (MTRO-91) | — |
| Captcha | Cloudflare Turnstile bật, `interaction-only`, chỉ ở `/signup`, `/forgot-password` | — |

- **Production**: không test. Dấu hiệu production = URL `mailtro.ai` không có tiền tố `staging-` (profile `.claude/qa-automation.md` của repo). Biến `ENV` (`staging | production`) có trong `.env.example` nhưng chưa có guard code nào kiểm tra.
- Mailtro **không phải Shopify app** — không có store, theme, Shopify plan (ADR 0008).

## Tài khoản (chỉ tên biến — giá trị trong `.env` repo)

| Biến | Tình trạng (06/10) |
|---|---|
| `OWNER_EMAIL` / `OWNER_PASSWORD` (= `AUTH_EMAIL` / `AUTH_PASSWORD` khi trống) | Có thật, tên hiển thị "[REDACTED]", **2FA On** — mã TOTP phải nhập tay mỗi phiên (không có `AUTH_TOTP_SECRET`) |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | **Placeholder `@example.com`** → mọi case Admin BLOCKED |
| `MEMBER_EMAIL` / `MEMBER_PASSWORD` | Placeholder → góc nhìn Member tạm dùng Owner ở `qikify-qa-team` |
| `EXISTING_WORKSPACE_SLUG` | slug đã tồn tại cho TC-SIGNUP-034 (trống thì skip) |
| `RUN_RATE_LIMIT_TESTS` | `=1` mới chạy case rate limit (TC-SIGNUP-063) — chạy riêng |
| Đề xuất chưa có | `API_BASE_URL`, `RUN_SIDE_EFFECT`, `MAIL_API_KEY`, `QA_WORKSPACE_SLUG`, `AUTH_TOTP_SECRET`, `NO2FA_EMAIL` / `NO2FA_PASSWORD`, `ISO_B_*` (workspace B không chung member) |

- Nhiều người dùng chung tài khoản Owner trên `qa-workspace` cùng lúc → data thay đổi liên tục (inventory L50).
- Chưa có: workspace B mà Owner **không** là member (case isolation non-member kẹt), tài khoản phụ chưa bật 2FA / chưa verify, bộ recovery code thật, domain gửi đã verify, hộp thư / mail API kiểm soát được (R13 — blocker lớn nhất).
- Sub-agent (sonder / ash) không được đọc mật khẩu `.env` theo một số phiên, không được tạo tài khoản / mời member / đổi role, `Activate` automation bị harness chặn (actualResult QA Hub).

## Repo automation `qikify-QA-mailtro` — cách chạy

- Cài: `npm install` · `npx playwright install` · `cp .env.example .env` (rồi điền giá trị — không commit).
- Lệnh: `npm test`, `test:smoke` (`@smoke`), `test:phase1..4`, `test:backlog`, `test:P0`, `test:auth|team|contacts|templates|automations|campaigns`, `test:api` (`--project=api`), `test:headed`, `test:slow` (`SLOW_MO` 800), `test:debug`, `test:ui`, `report`, `report:smart`. Chạy 1 case: `npx playwright test --grep "TC-LOGIN-020"`.
- Playwright projects: `setup` (`tests/auth.setup.ts` lưu `.auth/<role>.json`) · `api` (`*.api.spec.ts`, `workers: 1`, timeout 120s — endpoint auth 10 req/60s, forgot + reset chung bucket; **không chạy song song** suite UI `01-auth`) · `chromium-unauthenticated` (`01-auth/*.spec.ts`) · `chromium` (storageState `.auth/admin.json`; role khác dùng `roleAwarePage`).
- Tài khoản bật 2FA làm `auth.setup.ts` / `login.spec.ts` vỡ (10 chỗ) — chưa chọn hướng xử lý (inventory L37).
- Thực tế: chỉ `01-auth` có spec chạy thật (~133 test); các module khác 100% `test.fixme`; `fixtures/workspace.fixture.ts`, `seed-data.fixture.ts`, `utils/api-client.ts` còn TODO (chờ OpenAPI R1 + cơ chế auth `*.wisle.app` R2).
- Thư mục test / case / run / bug đánh số theo **sidebar app** từ 05/10 (ADR 0010): `01-auth`, `02-contacts`, `03-templates`, `04-unsubscribe`, `05-campaigns`, `06-automations`, `07-settings`, `08-team`, `09-api`, `smoke/`.

## Hạn chế công cụ manual agent (Playwright MCP)

- Không đọc body request / response, cookie, localStorage; không route / abort / mock 500; không offline / throttle; không gửi request song song; gọi API thẳng từ tab trả 401.
- Toast tắt nhanh — poll `[aria-label*="Notifications"]` ~100 ms. Search Contacts trễ 3–8 giây; bảng kết quả segment trễ 8–20 giây.
- Viewport 1280×800: panel phải của automation builder che node — dùng 1680×900 khi cần click node (inventory L06).
- Không dùng `add_test_case_image` khi ghi lên QA Hub (treo) — ghi chú memory của người dùng.

## Related

- [test-data.md](test-data.md) · [regression-checklist.md](regression-checklist.md) · [dev-references.md](../dev-references.md)

## Source

- `inventory/MTRO.md` § 3, § 4.1, L37, L38, L39, L50 — 01/10/2026.
- Repo `qikify-QA-mailtro` (`README.md`, `playwright.config.ts`, `.env.example` — chỉ tên biến, `config/env.ts`, `docs/decisions/0003`, `0004`, `0008`, `0010`, `docs/decisions/assignments.md`) — đọc 2026-10-07.
- QA Hub actualResult các task MTRO-010, 018, 022 (06/10).
