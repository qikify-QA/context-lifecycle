<!-- testlane knowledge KB-363 · kind=product · tag=— · status=draft · sourceUrl=https://github.com/ownego/qa-knowledge-work/blob/18e5531b0531cc8ed211d45de290a9aecfdf837c/kb/DUOS/dev-references.md · createdAt=2026-10-08T07:54:15.478Z · updatedAt=2026-10-08T09:37:53.313Z -->

# Dev References — Duos B2B (DUOS)

**Status:** draft

Link ra ngoài: Jira, QA Hub, repo, tài liệu. Dựng 2026-10-07.

- **QA Hub** project key `DUOS` — projectId
  `proj-0b7fef03-7570-4326-97c8-b16336c40a76`. Test case id dạng
  `TC-DUOS-<số>`, task id dạng `DUOS-00N` (trùng prefix với key Jira — dễ
  nhầm: task QA Hub `DUOS-004` ≠ issue Jira `DUOS-4`).
  - Task hiện có (2026-10-07): DUOS-001 token (DUOS-399), DUOS-002 customer
    matching (DUOS-411), DUOS-003 Company member Ironwear (DUOS-412),
    DUOS-004 auto company creation (DUOS-424/425/426), DUOS-005 Pricing Oct
    2026 (DUOS-430/431), DUOS-006 composer audit regression (DUOS-428).
  - Knowledge QA Hub: KB-001 (draft — banner giữ giá cũ, DUOS-431), KB-002
    (active — SuggestedPlans + banner trial, DUOS-378). Project context: trống.
- **Jira** project `DUOS`, site `ownego.atlassian.net`. 23 Epic (2026-10-07),
  xem [product/feature-map.md](product/feature-map.md). Workflow có status
  `To Do` → `Code Review` → `QA Review` → `PASS` / `Done`.
- **Repo**
  - Backend: `qikify/b2b-api` (Laravel; PR #198 expiring token, #209/#210/#211
    Company member, #212 company creation on submit). Branch ví dụ
    `feature/expiring-offline-tokens`, `feature/DUOS-425-company-creation-on-submit`,
    `fix/composer-audit-vulnerabilities`.
  - Frontend: tên repo `Need confirm` (file nhắc tới: `src/pages/NewPricing.vue`,
    `src/composables/useSubscription.ts`, `src/pages/credit-limit/CompanyList.vue`,
    `src/pages/extensions/CompanyMembers.vue`, `SubmissionDetail.vue`,
    `Country.vue`) — nguồn: KB-002, task DUOS-004.
  - Flow action field khai báo ở repo **frontend** (DUOS-405).
- **Official help docs** (merchant-facing):
  https://duos-b2b-documentation.gitbook.io/duos-b2b-wholesale — đọc lần cuối
  09/07/2026 (references/apps/DUOS.md).
- **knowledge-work** (nguồn gốc của KB này):
  `business-rules/DUOS.md`, `open-questions/DUOS.md`,
  `references/apps/DUOS.md`, `references/apps/DUOS-quotation.md`,
  `inventory/DUOS.md` (build 2026-10-08 trên store `stg-duos-plus-2`, Free
  plan — đã đối chiếu vào KB; phần ✅/🟡/❌ xem inventory).
- **Tech stack** (theo DUOS-428): Laravel (sắp lên 12 — DUOS-429), Filament
  admin panel, Horizon queue, MongoDB (ledger / analytics), dompdf (Quote
  PDF), phpspreadsheet / maatwebsite-excel (export), Mailgun (email; DUOS-366
  định đổi sang Amazon — To Do).
- **Shopify API version**: đã lên 2026-04 (DUOS-388).
- **Host staging** (quan sát 2026-10-08, inventory/DUOS.md § 4): app admin
  "Staging GetDous" (`…/apps/staging-getdous`), bundle Portal
  `staging-portal.getduos.io` (KB cũ ghi `staging-embedded.getduos.io` —
  `Need confirm`, xem [testing/environments.md](testing/environments.md)),
  API `staging-api.getduos.io`, admin panel `staging-admin.getduos.io`.
- Slack channel: `Need confirm` (KB-002 trích một tin nhắn Slack DM với Dev
  haild ngày 05/10/2026).
- Người liên quan (theo ticket): PO/BA Ashley (thuongnth), Dev FE haild, Dev
  BE haptt, QA ngant.
