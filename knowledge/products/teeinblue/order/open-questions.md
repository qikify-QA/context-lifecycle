# Open Questions — Order

_Regenerated from `kb.json` (object-level + per-feature) and `checklists/*.json` at context version 1 (published 2026-09-13). This file does not itself resolve any entry — resolution requires the proper authority (orchestrator + reviewer for conflicts, PO/Dev for business questions)._

## Summary

| Type | Count |
|---|---|
| CONFLICT | 1 |
| NEEDS_CONFIRMATION | 11 |
| OPEN_ISSUE | 5 |

## OQ-order-001 — CONFLICT

```json
{"oq_id": "OQ-order-001", "type": "CONFLICT", "feature_id": "place-personalized-order-storefront", "summary": "An order completed successfully at storefront checkout (confirmation JTEL87JY0) never appeared in the portal Orders list (GET /api/orders?by_teeinblue=1), even after 90+ minutes, checked across all TIB statuses, both stores, and a 30-day date range. A second order placed afterward, following the user's claim that a webhook configuration issue had been fixed, DID sync successfully (portal #1002 / id 4322). This affects both place-personalized-order-storefront (the sync step) and review-and-initiate-fulfillment-portal (the entry precondition).", "side_a": "Storefront checkout completed successfully for order confirmation JTEL87JY0 (staging store linh-explorer-2.myshopify.com, GUEST buyer), placed approximately 2026-09-13T07:08 UTC, total $63.99, single line item — the order exists as a real, completed Shopify order.", "side_b": "GET /api/orders?by_teeinblue=1 from the portal never returned this order — checked across all TIB statuses, both stores, a 30-day date range, and repeatedly over more than 90 minutes after placement. It only ever showed a different, later order (confirmation PE7AU1Y53 / portal #1002 / id 4322)."}
```

Root cause (claimed webhook configuration fix) has never been independently verified by dev/infra logs or backend records — the user's statement is recorded as an unverified claim, not a confirmed fact. Do not mark this resolved based on that claim alone.

## OQ-order-002 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-order-002", "type": "NEEDS_CONFIRMATION", "feature_id": "place-personalized-order-storefront", "summary": "What is the expected checkout behavior/error message for declined (test card '2') and gateway-failure (test card '3') payments? Is any partial/failed order record created on the portal side? Never observed — only the approved-card path was exercised."}
```

## OQ-order-003 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-order-003", "type": "NEEDS_CONFIRMATION", "feature_id": "place-personalized-order-storefront", "summary": "Is add-to-cart actually blocked when a required personalization field is empty, and if so what validation message is shown? Never observed — 'required' is only an inferred label from the field UI, not a tested behavior."}
```

## OQ-order-004 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-order-004", "type": "NEEDS_CONFIRMATION", "feature_id": "place-personalized-order-storefront", "summary": "What happens at exactly 10 characters and on attempting an 11th character in the max-10 personalization text fields (Woman Name, Cat Name #1/#2) — hard client-side block, server-side validation error, or silently unenforced? Only 9/10 and 8/10 counter states (below the boundary) were observed."}
```

## OQ-order-005 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-order-005", "type": "NEEDS_CONFIRMATION", "feature_id": "place-personalized-order-storefront", "summary": "Does completing checkout with Express shipping succeed, and what is the actual (evidence-backed) Express price and resulting total? The $15.00 price was only summarized from observation text, with no screenshot/dom snapshot confirming it, and the Express path was never completed end-to-end."}
```

## OQ-order-006 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-order-006", "type": "NEEDS_CONFIRMATION", "feature_id": "place-personalized-order-storefront", "summary": "Does the checkout flow behave identically for a signed-in buyer, or are there differences (e.g. saved addresses, different payment options, order attribution)? Only the unauthenticated GUEST path was ever exercised."}
```

## OQ-order-007 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-order-007", "type": "NEEDS_CONFIRMATION", "feature_id": "place-personalized-order-storefront", "summary": "Does the cart (including the personalized mockup reference) survive a page reload without data loss or corruption? Never tested — the cart was only observed once, immediately after add-to-cart."}
```

## OQ-order-008 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-order-008", "type": "NEEDS_CONFIRMATION", "feature_id": "place-personalized-order-storefront", "summary": "What is the true, evidence-backed request/response schema of the add-to-cart call (POST /cart/add), and does it ever return a non-200 status (e.g. sold-out variant, invalid personalization payload)? Current knowledge is INFERRED only, summarized from a browser tool narrative with no raw request/response body captured."}
```

## OQ-order-009 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-order-009", "type": "NEEDS_CONFIRMATION", "feature_id": "review-and-initiate-fulfillment-portal", "summary": "Does any non-owner/restricted-permission portal role see the same orders list, order-details, and fulfill/status actions as the owner (sub=273)? Never tested — only the owner role was exercised against every capability of this feature."}
```

## OQ-order-010 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-order-010", "type": "NEEDS_CONFIRMATION", "feature_id": "review-and-initiate-fulfillment-portal", "summary": "Do the DB-layer order/order-item records match the UI/API-displayed state exactly, including for fields never independently verified at raw-payload level (order-details header, tib_status cross-layer mapping)? Database observation was disabled for this bootstrap, so no DB-layer evidence exists at all."}
```

## OQ-order-011 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-order-011", "type": "NEEDS_CONFIRMATION", "feature_id": "review-and-initiate-fulfillment-portal", "summary": "What do 'Edit customization' and 'View customization' actually do — do they affect the design, the order, or trigger downstream regeneration? Neither button was ever exercised."}
```

## OQ-order-012 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-order-012", "type": "NEEDS_CONFIRMATION", "feature_id": "review-and-initiate-fulfillment-portal", "summary": "Does 'Confirm & Send to fulfill' fire a mutation and/or call the POD provider once a POD account (e.g. Printify) IS connected, and does it create a real fulfillment/purchase order? This is the single biggest safety gap for this feature — the only observed behavior (review dialog only, no mutation) is scoped strictly to a POD-disconnected instance, which is not the state a real merchant using this feature would be in. Must be answered by PO/Dev, or verified very carefully in a sandboxed POD account, before any automated or exploratory test attempts it."}
```

## OQ-order-013 — OPEN_ISSUE

```json
{"oq_id": "OQ-order-013", "type": "OPEN_ISSUE", "feature_id": "place-personalized-order-storefront", "summary": "Exploration for this KB version ran against store linh-explorer-2.myshopify.com, not the originally-intended linh-explorer.myshopify.com. linh-explorer.myshopify.com is known (from a separate prior observation) to have an add-to-cart failure that never completes for the same campaign, so no order could be placed there with available evidence. Any future work targeting linh-explorer.myshopify.com specifically must treat this object's storefront findings as unverified there and should first re-investigate that store's add-to-cart issue."}
```

## OQ-order-014 — OPEN_ISSUE

```json
{"oq_id": "OQ-order-014", "type": "OPEN_ISSUE", "feature_id": "review-and-initiate-fulfillment-portal", "summary": "The full tib_status enum and its integer<->label mapping is unknown. Only one value pair has ever been observed (UI label 'ready' <-> API integer 6) for one order. Do not build validation or transition tests assuming a known, exhaustive enum."}
```

## OQ-order-015 — OPEN_ISSUE

```json
{"oq_id": "OQ-order-015", "type": "OPEN_ISSUE", "feature_id": "review-and-initiate-fulfillment-portal", "summary": "The true raw payload of GET /api/orders (order-details) and the GraphQL orders_by_pk query for an order have never been captured — current knowledge of their field shapes (order header, tib_status) is UI/name-only, not payload-verified. Schema-level assertions should not be built on this yet."}
```

## OQ-order-016 — OPEN_ISSUE

```json
{"oq_id": "OQ-order-016", "type": "OPEN_ISSUE", "feature_id": "review-and-initiate-fulfillment-portal", "summary": "'Change status' dropdown transitions (Ready/Sent/Fulfilled/Paused/Canceled) have only ever been seen as a displayed option list — no transition was ever executed, so the target endpoint, side effects (notifications, POD calls), and reversibility of any transition are completely unknown."}
```

## OQ-order-017 — OPEN_ISSUE

```json
{"oq_id": "OQ-order-017", "type": "OPEN_ISSUE", "feature_id": "review-and-initiate-fulfillment-portal", "summary": "The 'Bulk Fulfill' sidebar flyout item exists but has never been opened or explored. Its behavior is completely unknown and must not be inferred from the single-order 'Confirm & Send to fulfill' flow — it may operate at a different (higher-risk, multi-order) scope."}
```
