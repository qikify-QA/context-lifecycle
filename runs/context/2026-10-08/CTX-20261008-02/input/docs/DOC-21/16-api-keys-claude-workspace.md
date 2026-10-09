<!-- testlane knowledge KB-386 · kind=feature-profile · tag=API keys · status=draft · sourceUrl=https://github.com/ownego/qa-knowledge-work/blob/ae07d04a61509378493a9a07714b04f4e77a36e6/kb/MTRO/features/16-api-keys-claude-workspace.md · createdAt=2026-10-08T08:01:19.644Z · updatedAt=2026-10-08T08:01:19.644Z -->

# 16. Settings › API keys · Claude connector · Workspace settings

**Status:** draft

Phân tích ngày 2026-10-07 từ: `inventory/MTRO.md` § 2.14, § 2.15, § 2.17 (staging đi thật 29/09/2026, role Owner — tạo / rotate / revoke key mẫu `ash-inventory-key`), Jira MTRO-44/45/49/50/91/92/101/102/111/121 (đọc 07/10), task QA Hub MTRO-010 (BR-23 — Dev 02/10: rate limit Public API) và repo `qikify-QA-mailtro` (`07-settings/api-keys.md`, `claude-connector.md`, `workspace-settings.md` — mới là khung, 0 case). **Chưa có business rule** cho 3 trang này (inventory L33) và chưa có task QA Hub — phần lớn là hiện trạng staging; phần API key theo MTRO-92 chưa đối chiếu hết.

## Purpose

- **API keys**: cho code của merchant gọi Mailtro **Public API** của một workspace theo scope (Bearer token).
- **Claude connector**: hướng dẫn nối Claude (claude.ai custom connector qua MCP) để Claude dựng segment / campaign nháp từ brief. Không có form.
- **Workspace settings**: đổi tên workspace, chuyển quyền sở hữu.

## Business Rules

### API keys (`/settings/api-keys`) — staging 29/09

- Header "Let your own code call the Mailtro API for this workspace."; empty `No API keys yet` / "Create a key to let your app read and manage this workspace through the Mailtro API." + `Create API key`.
- Dialog **Create API key** — "The key belongs to this workspace and can only do what its scopes allow.": `Name` (`e.g. Storefront sync`, "Shown in the key list and audit log."; `Create key` disabled khi trống); ma trận `Resource` × `Read` / `Write` / `Send`: Contacts (`contacts:read` ✔, `contacts:write` ✔) · Segments (`segments:read` ✔, `segments:write`) · Templates (`templates:read` ✔, `templates:write`) · Campaigns (`campaigns:read` ✔, `campaigns:write`, `campaigns:send`) · Suppressions (`suppressions:read` ✔, `suppressions:write`) · Domains (`domains:read` ✔) · Automations (`automations:read` ✔) · Transactional emails (`emails:send`) — ✔ = tick sẵn; "At least one scope is required."; tick scope Send → "Send scopes let this key send email to real recipients. Grant them only if this integration must trigger sends."
- Dialog **API key created**: "Copy it now — this is the only time the full key is shown. If you lose it, rotate the key to get a new one."; key tiền tố `mtro_sk_`; "Use it as a Bearer token in the Authorization header." Key chỉ hiện **một lần** (khớp MTRO-92 §3).
- Bảng: `Name` (+ "Created by {name}") · `Key` (`mtro_sk_xxxx…`) · `Scopes` · `Status` (`Active` / `Expires in 24 hours` / `Revoked`) · `Last used` (`Never`) · menu.
- Menu: Active và `Expires in 24 hours` → `Audit log` · `Rotate` · `Revoke`; Revoked → chỉ `Audit log`. `Audit log — {name}` — "Every change to this key, and who made it."
- **Rotate** `Rotate “{name}”?` — "Rotating creates a new key with the same name and scopes and shows it once. The current key keeps working for 24 hours, then expires." → 2 dòng cùng tên (mới `Active`, cũ `Expires in 24 hours`). Khớp MTRO-92 §3.
- **Revoke** `Revoke “{name}”?` — "The key stops working immediately and can't be restored. Anything still using it will start getting authentication errors." → `Revoked`.
- Theo MTRO-92 §3 (chưa thấy trên UI 29/09): giới hạn IP / dải IP (gọi từ IP khác → 403; key mới khi rotate giữ allowlist); rotate key đã revoke → "A revoked API key cannot be rotated."; staff **Report as leaked** → key `paused` (403 "key paused", khách không tự mở), **Put back**; trạng thái key active · paused · expired · revoked; workspace Sending suspended không tạo được key mới — xem [18-security-abuse-guard](18-security-abuse-guard.md).
- Public API v1: **120 request / phút / API key**, chung mọi endpoint (Dev 02/10, MTRO-010 BR-23). API docs ở staging-api `/docs` (MTRO-91, haptt 11/09).
- Scope dùng cho API analytics: `campaigns:read` / `automations:read` (thiếu → 403, MTRO-94).

### Claude connector (`/settings/claude`) — staging 29/09, không đổi từ 16/09

- Header "Let Claude build campaigns in this workspace from a plain-English brief."; khối `What Claude gets access to`; `Connector URL` `https://staging-mcp.mailtro.ai/mcp` + `Copy`; `Connect it` 4 bước (copy URL → claude.ai Settings → Connectors → Add custom connector → approve trên màn sign-in Mailtro, chọn workspace); `Things to ask it`; `What it can and cannot do` — build & save segments, create / edit draft campaigns, **"It cannot send."**
- Theo Jira (MCP): MTRO-44 (Epic) Sprint 5 output "Create + Send campaign from Claude" — lệch "It cannot send." (xem Edge Cases). MTRO-101 (Bug, QA Review): MCP biến link inline thành block button — đã fix, chờ QA verify. MTRO-102 (QA Review): cho connector tạo section nhiều cột, table, style block. MTRO-111: MCP `font_family` chỉ nhận 8 font built-in. MTRO-121 (In Progress): MCP gợi ý branding. MTRO-114 (Bug, In Progress): màu nền content đổi khi Claude tạo email qua MCP. Claude MCP tạo template có `{{…}}` → lỗi (MTRO-92 §10 — mâu thuẫn cú pháp, xem [07-email-library](07-email-library.md)).

### Workspace settings (`/settings/workspace`) — staging 29/09, không Save

- h1 `Workspace settings`, "Manage QA Workspace."; `Workspace name` + `Save changes` (disabled khi chưa đổi).
- **Transfer ownership** — "Hand this workspace to another member. You'll become an admin afterward."; nút `Transfer ownership` **disabled** khi workspace chỉ có 1 member: "Invite another member first — ownership can only go to an existing member." Khớp MTRO-49: đúng **1 Owner**, owner cũ thành Admin.
- Bundle (chưa đối chiếu UI): hint `Only owners and admins can rename this workspace.`; dialog "Choose the member who will become the new owner. You'll be demoted to admin." · `Member` · `Transfer`.
- Không có mục bảo mật / bắt buộc 2FA cấp workspace (23/09).

## Edge Cases

- Key `Expires in 24 hours` vẫn có `Rotate` → sinh thêm key từ key sắp hết hạn — `Need confirm` Dev / PO (inventory L25).
- Scope mặc định tick sẵn gồm `contacts:write` — `Need confirm` PO.
- Ô IP allowlist (MTRO-92) chưa thấy trên dialog — `Need confirm` đã deploy chưa; định dạng IPv4 / IPv6 / CIDR (GAP-09 MTRO-019).
- Member có tạo được API key / đổi tên workspace — `Need confirm` (Member 23/09 vẫn thấy cả 2 mục — inventory L38; GAP-07 MTRO-019).
- Claude "It cannot send." (trang) vs MTRO-44 "Create + Send campaign from Claude" — `Need confirm` PO phạm vi MCP.
- Cơ chế auth của Portal API: build-staging overview (03/09) ghi Sanctum SPA cookie + CSRF, không bearer; actualResult QA Hub 06/10 ghi "API portal dùng bearer token, gọi từ browser 401" — `Need confirm` Dev (R2 repo).
- Transfer ownership khi có ≥2 member — chưa đi được (inventory L39).

## Testability Notes

- Tạo key để lại dòng Revoked không xoá được; prefix tên theo người. **Không bao giờ ghi giá trị key** vào case, log, screenshot.
- Gợi ý auto/manual MTRO-44: 50/50 (chưa rõ scope).

## Known Issues

See [known-issues.md](../known-issues/known-issues.md) for entries tagged `api-keys-claude-workspace`.

## Related Jira Tickets

- MTRO-44 — MCP connectors, Epic, To Do — Sprint 5: create + send campaign từ Claude.
- MTRO-50 — MCP Claude for contact, Story, QA Review — trống.
- MTRO-91 — [BE] Public api, Story, QA Review — docs ở staging-api `/docs`.
- MTRO-92 — [BE] Security, Story, QA Review — §3 API key.
- MTRO-101 — MCP converts inline text links into button blocks, Bug, QA Review.
- MTRO-102 — Expose section, table and block styling through MCP, Story, QA Review.
- MTRO-121 — MCP Branding suggestion, Task, In Progress — trống.
- MTRO-45 — Team (Transfer ownership), Story, To Do. MTRO-49 — Team members manage page, Story, To Do.

## Source

- `inventory/MTRO.md` § 2.14, § 2.15, § 2.17, L25, L33, L38, L39 — staging 29/09/2026.
- Jira MTRO-44, 45, 49, 50, 91, 92, 94, 101, 102, 111, 114, 121 — đọc 2026-10-07.
- QA Hub task MTRO-010 (BR-23), MTRO-019 (GAP-07, GAP-09) — đọc 2026-10-07.
- Repo `qikify-QA-mailtro`: `docs/manual-testcases/07-settings/*.md` (khung), `docs/build-staging-feature-overview.md`.
