<!-- testlane knowledge KB-370 · kind=product · tag=— · status=draft · sourceUrl=https://github.com/ownego/qa-knowledge-work/blob/ae07d04a61509378493a9a07714b04f4e77a36e6/kb/MTRO/dev-references.md · createdAt=2026-10-08T08:00:58.027Z · updatedAt=2026-10-08T08:00:58.027Z -->

# Dev References — Mailtro (MTRO)

**Status:** in-review

Link và nơi tra cứu. Cập nhật 2026-10-07.

- **QA Hub**: project `mailtro`, key `MTRO`, projectId `proj-1ffcd909-2d85-46eb-b4c8-f518cbb0962a`. 18 task (MTRO-003 → MTRO-025); task QA Hub đánh số 3 chữ số (MTRO-017) **khác** Jira (MTRO-17). Test case id do QA Hub cấp `TC-MTRO-<số>`. Knowledge: KB-003, KB-004. Context: 7 item "Inventory MTRO" (01/10).
- **Jira**: project `MTRO`, site `ownego.atlassian.net`, [board 735 timeline](https://ownego.atlassian.net/jira/software/projects/MTRO/boards/735/timeline). 112 issue (MTRO-6 → MTRO-122). Key Jira và key QA Hub trùng nhau (`MTRO`).
- **Repo automation**: `qikify-QA-mailtro` (Playwright TypeScript) — `docs/manual-testcases/<NN-module>/` (case manual + auto chung file, ADR 0005), `docs/test-runs/`, `docs/bugs/`, `docs/decisions/` (ADR 0001–0010), `docs/business-rules/MTRO.md` (bản sao của knowledge-work), `.claude/qa-automation.md` (profile cho Luke). Branch đọc 07/10: `docs/contacts-automations-2026-10-05`.
- **Code sản phẩm**: `mailtro-api` (BE Laravel), `mailtro-app` (workspace SPA, Vue), `mailtro-acc` (Mailtro ID) — **chưa có clone** cho QA; inventory dùng bundle FE đã deploy thay thế (inventory L41). Repo `build-staging` từng được đọc 03/09 (`docs/build-staging-feature-overview.md`).
- **Editor**: SDK Templatical (`@templatical/editor`, OSS) — MTRO-35; nâng cấp v0.42.0 cho border / radius (MTRO-105).
- **Public API docs**: staging-api `/docs` (MTRO-91). Rate limit 120 request / phút / API key.
- **MCP connector**: `https://staging-mcp.mailtro.ai/mcp` (Claude connector).
- **Hạ tầng gửi**: AWS SES — 5 region × 2 account, SNS → SQS → worker (MTRO-74); design doc `docs/plans/2026-08-26-bounce-complaint-design-decisions.md` (repo sản phẩm, QA chưa truy cập được).
- **Knowledge-work (nguồn nền)**: `business-rules/MTRO.md`, `open-questions/MTRO.md`, `references/apps/MTRO.md`, `references/apps/MTRO-auto-manual-ratio.md`, `inventory/MTRO.md` (1.417 dòng, 01/10), `conventions/`.
- **Người liên quan** (theo Jira): PO thuongnth / Ashley (QKF) — còn gọi "Thương"; Dev FE haild, chuyenmc; Dev BE haptt; MCP / BE huongtt; QA lead Nga (ngant). Repo assignments: Nga (tầng chung, `01-auth`), Hảo (`02-contacts`, `03-templates`), Tình (`05-campaigns`, `07-settings`); `08-team` chưa có chủ.
- **Slack**: `Need confirm` — chưa có tên kênh trong nguồn đã đọc (MTRO-83 nhắc cảnh báo region câm gửi Slack; retest "Slack" 06/10 nhắc danh sách fix Dev báo qua Slack 28/09).
