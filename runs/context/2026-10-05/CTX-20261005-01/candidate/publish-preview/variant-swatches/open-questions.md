# Open Questions — variant-swatches

Tổng: 13 mục (NEEDS_CONFIRMATION/CONFLICT/OPEN_ISSUE). Sinh từ bootstrap DOC_BOOTSTRAP đầu tiên cho qik-volume.

- NEEDS_CONFIRMATION: 13
- CONFLICT: 0
- OPEN_ISSUE: 0

## OQ-variant-swatches-001 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-variant-swatches-001",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "variant-swatches",
  "check_ids": [
    "variant-swatches:CHK-012"
  ],
  "summary": "Variant image dropdown tooltip text — unconfirmed",
  "detail": "Confirm the live tooltip/helper text shown when selecting \"Variant image dropdown\" in the Swatch type dropdown — is it exactly \"Automatically assigns the existing variant images\" (matching the pattern of \"Variant color dropdown\"'s confirmed tooltip), or does it differ?"
}
```

## OQ-variant-swatches-002 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-variant-swatches-002",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "variant-swatches",
  "check_ids": [
    "variant-swatches:CHK-021"
  ],
  "summary": "Portal role/permission restriction for Variant swatches page — undocumented",
  "detail": "Does the Portal \"Variant swatches\" page (and its Setting Variant Option sub-page) have any role/permission restriction beyond general Portal access — e.g. can every staff account that can log into Portal also edit swatch config, or is there a read-only/limited role?"
}
```

## OQ-variant-swatches-003 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-variant-swatches-003",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "variant-swatches",
  "check_ids": [
    "variant-swatches:CHK-022"
  ],
  "summary": "Variant option table pagination behavior beyond 20 rows — not exercised",
  "detail": "What is the actual \"Previous\"/\"Next\" button and row-count behavior once a store has more than 20 variant options (at the 20/21-row boundary) — does pagination actually page as documented?"
}
```

## OQ-variant-swatches-004 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-variant-swatches-004",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "variant-swatches",
  "check_ids": [
    "variant-swatches:CHK-023"
  ],
  "summary": "HEX field format validation on save — undocumented",
  "detail": "What happens when a merchant enters a malformed HEX value (e.g. missing '#', wrong length, non-hex characters) into the Custom color dropdown's HEX textbox and attempts to save — is there client-side/server-side validation, an error message, or does it save as-is?"
}
```

## OQ-variant-swatches-005 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-variant-swatches-005",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "variant-swatches",
  "check_ids": [
    "variant-swatches:CHK-024"
  ],
  "summary": "Image upload format/size limits for Custom image dropdown — undocumented",
  "detail": "What file formats and maximum file size are accepted by the \"Choose File\"/\"Add image\" control in the Custom image dropdown's per-value rows, and what happens when an unsupported format or oversized file is uploaded?"
}
```

## OQ-variant-swatches-006 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-variant-swatches-006",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "variant-swatches",
  "check_ids": [
    "variant-swatches:CHK-026"
  ],
  "summary": "Direct navigation to Setting Variant Option URL for a nonexistent/unsynced option name — undocumented",
  "detail": "What does the app show when a merchant (or anyone with Portal access) navigates directly to /apps/<app-slug>/variant-swatches/setting/<OptionName> for an OptionName that was never synced/doesn't exist on this store — a 404, an empty page, a redirect, or something else?"
}
```

## OQ-variant-swatches-007 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-variant-swatches-007",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "variant-swatches",
  "check_ids": [
    "variant-swatches:CHK-028"
  ],
  "summary": "Re-sync behavior once variant table is already populated — undocumented",
  "detail": "Once a store's variant option table is already populated, is there still a way to re-sync (e.g. does the \"Sync variants\" button/action remain available to pull newly added Shopify variants/values), or is sync a one-time-only action tied to the empty state?"
}
```

## OQ-variant-swatches-008 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-variant-swatches-008",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "variant-swatches",
  "check_ids": [
    "variant-swatches:CHK-029"
  ],
  "summary": "Storefront reflects a swatch-type config change immediately, or requires resync/republish — undocumented",
  "detail": "If a merchant changes a variant option's swatch type after an offer using that option is already live on the storefront, does the storefront update immediately, or does it require a resync/republish?"
}
```

## OQ-variant-swatches-009 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-variant-swatches-009",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "variant-swatches",
  "check_ids": [
    "variant-swatches:CHK-030"
  ],
  "summary": "Post-fix: Quantity Break's \"Hide theme variant picker\" handoff to this feature's swatch widget — undocumented, blocked on KB-022 fix",
  "detail": "Once the storefront swatch-rendering defect (KB-022) is fixed, does Quantity Break's \"Hide theme variant picker\" checkbox correctly hand off rendering to this feature's own swatch widget, or does another gap exist in that handoff?"
}
```

## OQ-variant-swatches-010 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-variant-swatches-010",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "variant-swatches",
  "check_ids": [
    "variant-swatches:CHK-031"
  ],
  "summary": "Quantity Break's per-item inline dropdowns — do they apply this feature's swatch config? Undocumented",
  "detail": "Do the per-item inline variant-picker dropdowns rendered by Quantity Break's \"Allow customers to choose different variants for each item\" checkbox (on a product with real variants) actually read and apply this feature's swatch configuration (color/image), or do they always fall back to plain native dropdowns regardless of configured swatch type?"
}
```

## OQ-variant-swatches-011 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-variant-swatches-011",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "variant-swatches",
  "check_ids": [
    "variant-swatches:CHK-032"
  ],
  "summary": "Auto-source swatch types (Variant color/image dropdown) rendering with genuine native Shopify data — inconclusive",
  "detail": "Does \"Variant color dropdown\" \"Variant image dropdown\" (the 2 auto-source swatch types, pulling directly from Shopify's own native variant color/image data) actually render as a visual swatch on the storefront when a product has genuine Shopify-native variant color/image data configured, or does it share the same rendering defect confirmed for \"Custom color dropdown\" \"Custom image dropdown\" (KB-022)?"
}
```

## OQ-variant-swatches-012 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-variant-swatches-012",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "variant-swatches",
  "check_ids": [
    "variant-swatches:CHK-033"
  ],
  "summary": "Swatch config scope — global per option name across all products, or per-product override exists? Inferred, not tested",
  "detail": "Is the swatch configuration's scope confirmed to be global per variant-option name (one config applies to every product sharing that option name, no per-product override), or could an undocumented per-product override exist?"
}
```

## OQ-variant-swatches-013 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-variant-swatches-013",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": null,
  "summary": "Doc set nguồn cho object variant-swatches trải cả merchant (Portal settings) và buyer (storefront swatch display) surface, không có 1 role duy nhất khai báo ở mức doc-set/object (bootstrap context.role=null, theo thiết kế). Cần xác nhận đây có phải invariant đúng hay chỉ là gap của bộ tài liệu nguồn."
}
```

