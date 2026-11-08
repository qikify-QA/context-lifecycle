# Common brief — runtime explorers, teeinblue REFRESH runs CTX-20261031-01..05 (2026-10-31)

Read first: `contracts/qa-context-contract.md` (§0–§9), your agent definition, `config/products/teeinblue.json`, playbook `config/products/teeinblue/explore-playbook.md`, then your run's `run-manifest.json`, `input/bootstrap-request.json`, `input/refresh-targets.json`, `input/testlane-cases.json`.

## Why this run exists
Operator asked to re-observe on staging the Testlane cases whose status is `passed` but whose actualResult is empty / Fail / Blocked / known issue. Goal: current runtime observation (OBSERVED_CURRENT only) for the related claims. Each target in `input/refresh-targets.json` has the TC id, prior evidence dir (`runs/context/2026-10-30/<run>/raw/ccr-evidence/<claim>/` — read-only, contains expected result and the old actual), and a `feasibility_note` you MUST follow.

## Hard rules
- **Account guard is step 1, and again after every re-login:** `GET /api/user` (run `fetch('/api/user')` inside the portal page, cookie session) must return `id` = 266. Record the check (time + id only, no email) in your artifact. Wrong id → STOP, status BLOCKED. Login: `/login?staff=true`, overwrite BOTH email and password fields from env `TIB_STAGING_EMAIL`/`TIB_STAGING_PASSWORD` (autofill trap). Session TTL ~15 min — expect to re-login; re-verify every time. Never print credential values.
- Mutation policy SAFE_REVERSIBLE_ONLY. Forbidden: delete, publish_live (no sync/publish campaign to Shopify/Etsy), charge, send_notification. No new/real order; storefront stops at cart. Any edit on a fixture must be reverted in the same run and recorded with `cleanup_result`. If no clean revert path exists → do not do it; put it in `skipped_actions[]` with reason.
- Things the operator said NOT to attempt: Etsy store, downloading SVG/PDF vector, creating new orders, sync/publish live. Record "NOT_FEASIBLE: <reason>" and move on.
- Do not modify Testlane. You have no Testlane tools; the case text is in `input/testlane-cases.json`.
- Redact per §6 before writing (cookies, XSRF, tokens, emails, buyer PII). Never write values of .env.
- Write only inside your run dir, in the paths your agent definition gives (`raw/portal/…`, `raw/network/<ACT-ID>.json`, `raw/storefront/…`).
- Basis is always `observed`; `current_behavior_only: true`. You do not decide what is "correct".
- Fixtures: use names/ids from the case Preconditions/Test Data (e.g. PB-BULK, CP-0, CP-K, PB-MANY #3385, artwork #5179…). If a fixture no longer exists or is changed, record it and say so; do not invent a new fixture unless reversible and cheap (prefix `QA-CTX1031-`), and say exactly what you made.
- Shared single Playwright browser: you are the only agent using it right now. Close nothing else; leave the browser logged in at the end.
- Progress: append one line per finished TC to `<run>/progress.log` (`<UTC time> <TC-id> <short status>`). The orchestrator watches its mtime.

## Extra required section in your artifact payload: `tc_retest[]`
One entry per target TC (including NOT_FEASIBLE ones):
```json
{ "tc_id": "TC-TIB-xxxx", "observed_at": "<UTC ISO>", "fixture": "<what you actually used>",
  "status": "OBSERVED | PARTIAL | NOT_FEASIBLE | BLOCKED",
  "steps_observed": [ {"step": "...", "observed": "<verbatim UI text / values>", "act_ids": ["ACT-..."], "evidence": ["raw/..."]} ],
  "literal_comparison_with_expected": [ {"expected_point": "<verbatim point from expectedResult>", "observed": "...", "same_as_expected_text": "yes|no|not_observed"} ],
  "not_done_reason": null }
```
`same_as_expected_text` is a literal comparison of what you saw versus the case text, not a judgment of correctness.

Return a short summary (≤ 25 lines): per TC one line (status + yes/no counts), account-guard checks, skipped actions, cleanup results, artifact paths.

## OPERATOR RULE (2026-10-31 16:05Z) — overrides anything above
- ONLY use stores of account 266: linh-explorer (instance 609) and linh-explorer-2 (instance 613) — the stores on the sidebar / env TIB_STORE_URL_*. Storefront password: env TIB_STORE_PASSWORD (do not print).
- NEVER open Nprice1–6 / instance 520 / org "Test new pricing 4" or any store/campaign/product/order id taken from the CCR or test cases — not even public storefront URLs or public API URLs with shop=nprice*. Those ids only describe the configuration to rebuild.
- Build equivalent fixtures on the explorer store (prefix `QA-CTX1031-`), within mutation policy. If a case needs a fixture you cannot build within policy (e.g. needs order, Shopify publish/sync, Etsy, vector download, >25 campaigns, legacy schema) → NOT_FEASIBLE, and state exactly: what is needed, on which store, why you could not build it (`operator_setup_needed`).

## RESUME RULES (2026-11-01, operator via coordinator) — override anything above
- Still only account-266 stores (linh-explorer 609 / linh-explorer-2 613). Account guard first and after every re-login.
- NO order creation (not even Bogus), NO campaign Update/Sync/publish live, NO delete of entities. The 12 items in run-manifest `resume_note.operator_setup_needed` stay NOT_FEASIBLE — do not look for workarounds.
- Revert each case's edit as soon as that case is observed. A fixture shared by several cases is reverted when the object is finished, and the revert is verified via API (fresh-`v` SDK JSON, or GraphQL).
- Storefront: prefer observing via a fresh `v` URL; if you must wait for the CDN, write the reason and time into progress.log.
- If a permission prompt or a dialog hangs you (e.g. a Save click that does not return), write a progress.log line `HANG <what>` immediately and return to the orchestrator with status BLOCKED — do NOT wait.
- Nprice evidence remains excluded.
