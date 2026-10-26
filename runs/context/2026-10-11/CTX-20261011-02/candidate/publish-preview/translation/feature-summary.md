# Object: Translation (product: teeinblue) — Feature Profile Summary
**Published context version:** 2

Env: staging — role `owner` (account explore) on portal, `GUEST buyer` on storefront.

**Mode:** Entire KB is `OBSERVED_CURRENT`/`OBSERVED_BASELINE`, except KB-011 (`INFERRED`) and KB-020/KB-021 (`PROPOSED`, unverified user annotation). **`CONFIRMED_EXPECTED`: KB-022, KB-023, KB-029 (CBS-001, test case PASS, chỉ staging build TIB-5352 — chưa release production, OQ-translation-023).** Object covers 2 user-facing sub-features plus 1 shared mechanism, across 3 feature profiles, all `CONDITIONAL_PASS`.

## FEAT-01-05 — Product Page Content translation (`product-page-content-translation`)
**Goal:** Merchant translates the app's static, built-in product-page UI strings (form labels, buttons, help text) so buyers see localized UI text.
**Entry points:** Portal Store Settings > Product Page Content (`/product-page-content`) · storefront personalization widget on `/{locale}/products/...`

**Capabilities:**
1. ~110 static string fields across 21 sections, each pre-filled with English default (some `{{PLACEHOLDER}}` templates) — KB-002
2. Language list sourced from `GET /api/instances/{id}/shop-locales` (2 entries observed: en/vi) — KB-003
3. Save sends `PUT /api/instances/{id}/config-translations` with FULL English default (~110 fixed semantic keys) + sparse override for the edited locale — KB-005
4. Clearing a field persists as `null` server-side (not empty string), reverting to default on reload — KB-006
5. **Storefront propagation: IMMEDIATE, server-side rendered.** Override appears in the very first HTML document response for `/vi/products/...` — NOT via any client-visible XHR. `GET /api/merchant/campaigns/{id}.json` stays byte-identical between locales even with the override saved — the mechanism injecting the translation is architecturally server-side and has no mapped API operation — KB-015, KB-017, KB-018

**Coverage:** portal CRUD ✅ · storefront propagation (1 field, 1 locale) ✅ · load-existing-overrides endpoint ❌ (only the save/PUT call was captured) · mobile viewport ❌ · permission/cross-tenant ❌ · DB layer ❌ (not explored)
**Confidence:** LOW (most items observed_count=1)
**Gate:** CONDITIONAL_PASS — no item promoted to CONFIRMED_EXPECTED; server-side injection mechanism and load-endpoint remain genuine unknowns, not silently assumed. See `open-questions.md` OQ-translation-002, OQ-translation-003.

---

## FEAT-03-06 — Dynamic Translations (`dynamic-translations`)
**Goal:** Merchant translates content they typed themselves — Option Title (personalization form), Product base name, Variants name — by typing pairs manually or importing.
**Entry points:** Portal Extras > Dynamic Translations (`/artwork-translations`)

**Capabilities:**
1. UI self-declares scope verbatim: "Currently support translating: Option Title in the personalization form, Product base and Variants name." No mention of layer placeholder / artwork custom name / campaign custom name-label observed anywhere on the page (absence recorded as NOT_OBSERVED, not confirmed-unsupported) — KB-007
2. Manual entry table (Default source ↔ target locale), `+ Add new translation`, Search, Auto translate (untested), Import/Export — KB-008
3. **Import is file-upload, not an entity picker** — clicking Import opens a native OS file-chooser immediately, contradicting the initial assumption that import pulls from Artworks/Product Base/Campaigns list pages. No file was submitted (stopped at safe checkpoint) — KB-009
4. Save: `POST /api/translations/bulk`, storage key = the literal free-text source string the merchant typed (NOT a fixed semantic key, unlike Product Page Content) — KB-010, KB-019
5. Delete uses full-set-replace via the same bulk endpoint, not delete-by-id — KB-012

**⚠️ OQ-translation-001 (CONFLICT, UNRESOLVED) — Storefront propagation.** See `open-questions.md` for full detail. The initial business-context premise said both translation types show on storefront; direct observation (buyer at locale=vi, campaign 2595, entry already saved) found the Product base name sub-scope did **NOT** appear anywhere on the page — not in the DOM, not in `GET /api/merchant/campaigns/{id}.json` (byte-identical between locales). Only 1 of 3 declared sub-scopes was testable (campaign 2595 has no free-text Option Title). **This is not resolved** — treat as an open question, not as confirmed working or confirmed broken.

A later, unverified user annotation (KB-020, KB-021 — `PROPOSED`) suggests the real import entry point may be a different button ("Import to Translations" on Artwork/Product Base/Campaign list pages) and the field scope may be broader than the UI banner states — see `open-questions.md` OQ-translation-022. This may be the path to finally resolving OQ-translation-001.

**Coverage:** portal CRUD ✅ · storefront propagation, sub-scope=Product base name (NOT_OBSERVED, see OQ-translation-001) ⚠️ · sub-scope=Option Title ❌ · sub-scope=Variants name ❌ · multi-entry table ❌ · real file import ❌ · permission/cross-tenant ❌ · DB layer ❌
**Confidence:** LOW
**Gate:** CONDITIONAL_PASS — OQ-translation-001 preserved with both sides' evidence intact at every layer (KB → feature profile `state_transitions`/`risks`/`dependencies` → checklist CHK-008/009/010); no layer picked a side.

---

**CBS-001 (TIB-5352, staging):** dưới 1000 key dictionary nhúng trong HTML, từ 1000 key nạp qua `translations/<locale>.json` (KB-022); Save một locale không đổi locale khác (KB-023, cần PO xác nhận — OQ-translation-033); chuỗi form được dịch trên product page và modal 'Edit design' (KB-029). Endpoint public chưa rõ ranh giới cross-shop (OQ-translation-032).

## FEAT-02-04 — Language / locale switcher (`language-locale-switcher`)
**Goal:** Merchant chooses which published language they're editing translations for (without changing portal UI language); buyer chooses which published language they browse the storefront in.

> **Note:** This profile deliberately combines 2 mechanically INDEPENDENT locale-selection UIs (portal edit-context selector + storefront buyer switcher) because they share the same underlying locale list and object, not because they share implementation. Do not assume a change to one affects the other. May be split into 2 profiles in a future run if it proves confusing.

**Capabilities:**
1. Portal `'Languages from <store>'` combobox (identical on both Translation pages) sourced from `GET /api/instances/{id}/shop-locales` — KB-003
2. Selecting a locale in the portal combobox changes ONLY which locale's content is edited — does NOT change portal UI language (sidebar/heading/buttons stay English) — KB-004
3. **Storefront header switcher IS Shopify's own native `<localization-form>` mechanism (Dawn theme), NOT a teeinblue-built widget.** Submits `POST https://<shop>.myshopify.com/localization`, Shopify responds 302 to the locale-prefixed URL — this directly answers the initial business-context question — KB-013
4. Locale carried via URL path prefix (`/vi/...`), consistent across pages — KB-014

**Coverage:** portal switcher ✅ · storefront switcher (desktop) ✅ · mobile viewport interaction ❌ (DOM inventoried only, never tapped) · >2-locale scale ❌ (store only has en/vi) · permission/cross-tenant ❌
**Confidence:** LOW
**Gate:** CONDITIONAL_PASS — the 2-UI grouping should be confirmed as useful before further checklist growth; not assumed to be the same backend locale source (portal: possibly-cached; storefront: Shopify's own Markets config).

---

## Gaps at Object level (applies to ALL 3 features)

| Gap | Note |
|---|---|
| **OQ-translation-001 (HIGH attention)** | Dynamic Translations storefront propagation — UNRESOLVED. See `open-questions.md`. This is the single most important open item for this object; possible real defect, or by-design/missing-step, unconfirmed either way. |
| **Data layer (DB)** | No DB layer exploration exists for this object — every "storage"/"persisted" claim in this KB is based on API request/response only, not confirmed DB schema. See OQ-translation-021. |
| **Confirmation status** | 0/21 KB items have a confirmed business-rule source — entire object is OBSERVED_CURRENT/INFERRED/PROPOSED, none is a confirmed business rule. |
| **Permission/cross-tenant** | 0/6 mapped API operations have any PERMISSION or cross-tenant test — untested across all 3 features. See OQ-translation-004, 012, 016. |
| **Error/negative path** | 0 operations have a captured 4xx/5xx sample. See OQ-translation-019. |
| **Dynamic Translations sub-scope coverage** | Only "Product base name" tested for storefront propagation; "Option Title" and "Variants name" both remain open (do NOT generalize OQ-translation-001's result to these). See OQ-translation-010, 011. |
| **Import (both features)** | Dynamic Translations import stopped at file-chooser open — no real file ever submitted; behavior (format, entity matching, collision handling) is completely unverified. See OQ-translation-009. |
| **Import entry point + field scope correction (unverified)** | See OQ-translation-022 — a later user-provided annotation suggests the real import mechanism and field scope differ from what was directly observed; not yet re-verified. |
| **Server-side HTML-injection mechanism** | Architecturally required for Product Page Content's confirmed-immediate propagation, but produces no client-observable network entry — no mapped API operation exists for it. See OQ-translation-003. |
| **Store scale** | Store only has 2 published locales (en/vi); behavior with >2 locales untested on either switcher. A second store was not tested. See OQ-translation-013, OQ-translation-020. |
