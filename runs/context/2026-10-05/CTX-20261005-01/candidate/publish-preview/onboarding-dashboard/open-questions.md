# Open Questions — onboarding-dashboard

Tổng: 4 mục (NEEDS_CONFIRMATION/CONFLICT/OPEN_ISSUE). Sinh từ bootstrap DOC_BOOTSTRAP đầu tiên cho qik-volume.

- NEEDS_CONFIRMATION: 4
- CONFLICT: 0
- OPEN_ISSUE: 0

## OQ-onboarding-dashboard-001 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-onboarding-dashboard-001",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "onboarding-dashboard",
  "check_ids": [
    "onboarding-dashboard:CHK-014"
  ],
  "summary": "Onboarding header rendering for unusually long/special-character/emoji store names",
  "detail": "What is the exact truncation/overflow behavior for the onboarding header 'Hello {{Store name}}!' when the store name is unusually long, contains special characters, or contains emoji? Source doc flags this explicitly as an untested edge case with no resolved expected behavior."
}
```

## OQ-onboarding-dashboard-002 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-onboarding-dashboard-002",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "onboarding-dashboard",
  "check_ids": [
    "onboarding-dashboard:CHK-015"
  ],
  "summary": "Staff permission level required to view Home or perform onboarding/dashboard actions",
  "detail": "What staff permission level, if any, is required to view Home (onboarding/dashboard), click 'Create offer', or click 'Enable theme app extension' 'Enable theme app'? No permission/role model is documented anywhere in the source doc for this feature."
}
```

## OQ-onboarding-dashboard-003 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-onboarding-dashboard-003",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "onboarding-dashboard",
  "check_ids": [
    "onboarding-dashboard:CHK-023"
  ],
  "summary": "Dashboard ATC click stat identity vs. the standalone Analytics feature's metric",
  "detail": "Is the Dashboard ATC (add-to-cart) click stat (KB-018, QVD-115) the same underlying counter/metric as the standalone Analytics feature's (\"Analytics\") metric, or an independent counter?"
}
```

## OQ-onboarding-dashboard-004 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-onboarding-dashboard-004",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "onboarding-dashboard",
  "check_ids": [
    "onboarding-dashboard:CHK-024"
  ],
  "summary": "Backend persistence (or absence thereof) behind the onboarding<->dashboard switch and Setup Guide progress",
  "detail": "Is the onboarding<->dashboard view switch and Setup Guide step-completion progress computed purely client-side from the offer list at render time, or is there a dedicated backend endpoint/table/cache behind it that could itself go stale, fail, or regress independently of the offer list?"
}
```

