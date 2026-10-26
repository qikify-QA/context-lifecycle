# CHANGELOG — Order (teeinblue)

- 2026-09-13 — bootstrap:CTX-20260913-01 — Initial context created from zero-doc bootstrap: 2 features (place-personalized-order-storefront, review-and-initiate-fulfillment-portal), 24 KB items, 33 checklist checks. Published as context version 1 (APPROVED_WITH_CONDITIONS).
- 2026-09-13 — bootstrap:CTX-20260913-01 — Orchestrator decided linh-explorer-2.myshopify.com (not the originally-requested linh-explorer.myshopify.com) is the authoritative store for this KB version, because the other store has a known add-to-cart failure for the same campaign that prevented placing a real order there.
- 2026-09-13 — bootstrap:CTX-20260913-01 — Reconciled a stale run-manifest before publish (it had recorded an earlier BLOCKED attempt under the same run id).
- 2026-10-11 (`CBS-002`, CCR_INGEST) — Thêm feature `open-api-replace-order-item-design` (Open API `POST openapi/v1/order-item-artworks/{id}/design`, staging, chưa lên production): 13 KB item (KB-025..037; 7 OBSERVED_CURRENT, 6 INFERRED — nguồn dev doc bị hạ kind theo `allow_dev_doc_supersede: false`), 27 check (8 BASELINE, 19 NEEDS_CONFIRMATION), 12 open question (OQ-order-018..029).
