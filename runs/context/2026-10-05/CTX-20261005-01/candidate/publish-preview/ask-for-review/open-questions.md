# Open Questions — ask-for-review

Tổng: 6 mục (NEEDS_CONFIRMATION/CONFLICT/OPEN_ISSUE). Sinh từ bootstrap DOC_BOOTSTRAP đầu tiên cho qik-volume.

- NEEDS_CONFIRMATION: 6
- CONFLICT: 0
- OPEN_ISSUE: 0

## OQ-ask-for-review-001 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-ask-for-review-001",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "ask-for-review",
  "check_ids": [
    "ask-for-review:CHK-012"
  ],
  "summary": "[NEEDS_CONFIRMATION] Offer AI bi discard (khong luu) co chac khong trigger overlay (khong false-positive)",
  "detail": "Khi mot AI-generated offer bi merchant discard (khong luu), overlay Ask for Review co chac chan khong hien ra (khong co false-positive) khong? Tai lieu suy luan dieu nay tu viec trigger yeu cau 'after saving', nhung tu yeu cau 'confirm no false-positive' — chua co xac nhan doc lap."
}
```

## OQ-ask-for-review-002 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-ask-for-review-002",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "ask-for-review",
  "check_ids": [
    "ask-for-review:CHK-013"
  ],
  "summary": "[NEEDS_CONFIRMATION] Dismiss (X) khong chon star co ghi reviewAction='dismissed' + reviewRating=null khong",
  "detail": "Khi merchant dong overlay (X) ma khong chon star nao, he thong co ghi reviewAction='dismissed' kem reviewRating=null hay khong? Tai lieu noi dieu nay 'matches the schema' nhung tu nhan la 'worth an explicit test' — chua duoc xac nhan, chi suy luan tu tinh nullable cua field."
}
```

## OQ-ask-for-review-003 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-ask-for-review-003",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "ask-for-review",
  "check_ids": [
    "ask-for-review:CHK-014"
  ],
  "summary": "[NEEDS_CONFIRMATION] Submit feedback rong tren nhanh 1-4 star co duoc chap nhan khong",
  "detail": "Textarea feedback o nhanh 1-4 sao co bat buoc nhap (required) hay cho phep submit rong? Tai lieu tu danh dau 'Need confirm' — khong co validation rule nao duoc xac nhan cho field nay."
}
```

## OQ-ask-for-review-004 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-ask-for-review-004",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "ask-for-review",
  "check_ids": [
    "ask-for-review:CHK-017"
  ],
  "summary": "[NEEDS_CONFIRMATION] UI co cho doi lai star da chon truoc khi dong overlay khong, va last-rating-wins co ap dung dung khong",
  "detail": "UI co thuc su cho phep merchant doi lai muc star da chon (vd chon 5 roi doi sang 2), hay chi la one-shot pick? QVD-173 ky vong 'last star_selected wins' cho metric star distribution, nhung tai lieu khong xac nhan UI co ho tro doi lua chon hay khong — neu khong, metric do khong bao gio xay ra tren thuc te."
}
```

## OQ-ask-for-review-005 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-ask-for-review-005",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "ask-for-review",
  "check_ids": [
    "ask-for-review:CHK-018"
  ],
  "summary": "[NEEDS_CONFIRMATION] Overlay hien cho moi merchant staff co quyen tao offer, hay chi owner/admin",
  "detail": "Overlay Ask for Review hien ra cho moi merchant staff co quyen tao offer, hay chi merchant owner/admin? Tai lieu chi noi chung 'merchant', khong phan biet role/permission cu the — checklist se khong biet test voi role nao de bao phu day du."
}
```

## OQ-ask-for-review-006 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-ask-for-review-006",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "ask-for-review",
  "check_ids": [
    "ask-for-review:CHK-022"
  ],
  "summary": "[NEEDS_CONFIRMATION] Offer tao thu cong roi sua bang AI assistant co bi gan nguoc (retroactive) isAiGenerated khong",
  "detail": "Mot offer duoc tao thu cong, sau do merchant sua lai bang AI assistant (neu flow do ton tai) — offer do co duoc gan nguoc (retroactive) co isAiGenerated va trigger overlay o lan save tiep theo khong? Tai lieu tu danh dau 'Need confirm PO/Dev' va goi day la 'crux cua toan bo trigger condition' cua tinh nang nay (xem KB-023, INFERRED/LOW, suy luan hien tai nghieng ve 'khong' nhung chua xac nhan)."
}
```

