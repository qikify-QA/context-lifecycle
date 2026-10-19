# Open Questions — onboarding-dashboard

Tổng: 13 mục (CONFLICT 2 · OPEN_ISSUE 3 · NEEDS_CONFIRMATION 8). Sinh từ bootstrap DOC_BOOTSTRAP đầu tiên của qik-volume (nguồn: KB do QA biên soạn, live-test trên store cũ test-vl-1); REFRESH trên store staging hiện tại 2026-10-18 thêm mục mới và ghi `staging_observation` (OBSERVED_CURRENT — không resolve NEEDS_CONFIRMATION/CONFLICT; xem CHANGELOG). Mỗi mục là một khối json; `kb_ids` dạng `<feature_key>#KB-xxx` (hoặc `_object-level#KB-xxx` cho tầng object), `check_ids` dạng `<feature_key>:CHK-xxx`.

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
    "onboarding-dashboard:CHK-023",
    "onboarding-dashboard:CHK-029"
  ],
  "summary": "Dashboard ATC click stat identity vs. the standalone Analytics feature's metric",
  "detail": "Is the Dashboard ATC (add-to-cart) click stat (KB-018, QVD-115) the same underlying counter/metric as the standalone Analytics feature's (\"Analytics\") metric, or an independent counter?",
  "staging_observation": "Ghi chú quan sát staging 2026-10-18 (OBSERVED_CURRENT, không resolve, giữ NEEDS_CONFIRMATION): Dashboard ATC lấy từ /api/events type=add_to_cart, Analytics từ /api/events không type, cùng window 30 ngày kết thúc hôm qua theo giờ trình duyệt; cả hai 0 (chưa có traffic trong window). (store staging hiện tại, 2026-10-18)",
  "staging_observation_kb_ids": [
    "onboarding-dashboard#KB-031"
  ]
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
  "detail": "Is the onboarding<->dashboard view switch and Setup Guide step-completion progress computed purely client-side from the offer list at render time, or is there a dedicated backend endpoint/table/cache behind it that could itself go stale, fail, or regress independently of the offer list?",
  "staging_observation": "Ghi chú quan sát staging 2026-10-18 (OBSERVED_CURRENT, không resolve, giữ NEEDS_CONFIRMATION): Không có endpoint riêng cho Setup guide; Theme extension status đọc qua settings_data.json của theme MAIN; Setup guide theo số offer hiện có (quay về 1/2 sau khi xoá hết). (store staging hiện tại, 2026-10-18)",
  "staging_observation_kb_ids": [
    "onboarding-dashboard#KB-033",
    "onboarding-dashboard#KB-029"
  ]
}
```

## OQ-onboarding-dashboard-005 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-onboarding-dashboard-005",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "onboarding-dashboard",
  "summary": "Setup guide staging quay về '1 / 2 Completed' (bước 'Create your offer' chưa xong) sau khi xoá hết offer, tức theo số offer hiện có chứ không theo 'đã từng tạo'; trong khi view Dashboard vẫn giữ (không về onboarding). Expected là gì?",
  "kb_ids": [
    "onboarding-dashboard#KB-029",
    "onboarding-dashboard#KB-020",
    "onboarding-dashboard#KB-014"
  ],
  "check_ids": [
    "onboarding-dashboard:CHK-027"
  ],
  "related_oq_ids": [
    "OQ-onboarding-dashboard-004"
  ]
}
```

## OQ-onboarding-dashboard-006 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-onboarding-dashboard-006",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "onboarding-dashboard",
  "summary": "Trong lúc Dashboard đang tải (~20s), card Theme extension hiển thị 'Inactive' + nút 'Enable theme app' (disabled/Loading) dù embed Active, sau đó mới đổi Active. Trạng thái tạm thời này là loading state chấp nhận được hay lỗi hiển thị?",
  "kb_ids": [
    "onboarding-dashboard#KB-028",
    "onboarding-dashboard#KB-009",
    "onboarding-dashboard#KB-010"
  ],
  "check_ids": [
    "onboarding-dashboard:CHK-028"
  ]
}
```

## OQ-onboarding-dashboard-007 — CONFLICT

```json
{
  "oq_id": "OQ-onboarding-dashboard-007",
  "type": "CONFLICT",
  "feature_id": "onboarding-dashboard",
  "summary": "'Recently created offers': tài liệu nói correction QA phủ định dạng bảng cột của QVD-27; staging hiển thị bảng cột Internal name/Extension type/Status/Trigger/Combination/Actions. Expected hiện hành?",
  "side_a": "Base KB-007: 5 offer mới nhất, phủ định bảng cột QVD-27.",
  "side_b": "Staging KB-030: bảng 6 cột (request limit=5); empty state khi 0 offer.",
  "conflict_group": "CONF-onboarding-dashboard-R1018-02",
  "kb_ids": [
    "onboarding-dashboard#KB-007",
    "onboarding-dashboard#KB-030"
  ],
  "check_ids": [
    "onboarding-dashboard:CHK-003",
    "onboarding-dashboard:CHK-012",
    "onboarding-dashboard:CHK-026",
    "onboarding-dashboard:CHK-031"
  ]
}
```

## OQ-onboarding-dashboard-008 — CONFLICT

```json
{
  "oq_id": "OQ-onboarding-dashboard-008",
  "type": "CONFLICT",
  "feature_id": "onboarding-dashboard",
  "summary": "Cấu trúc Dashboard: tài liệu nói gồm 3 section; staging có thêm card Sidekick (3 prompt), promo Transcy BFCM, promo 'Ultimate kit for conversion' (chỉ khi có offer), card 'Add to cart click' (ẩn khi 0 offer). Expected hiện hành và các card này có thuộc phạm vi test?",
  "side_a": "Base KB-006: 3 section Theme Extension Status / Setup Guide / Recently created offers.",
  "side_b": "Staging KB-032 (+KB-031): thêm card Sidekick, promo, Add to cart click, dropdown Language.",
  "conflict_group": "CONF-onboarding-dashboard-R1018-01",
  "kb_ids": [
    "onboarding-dashboard#KB-006",
    "onboarding-dashboard#KB-032",
    "onboarding-dashboard#KB-031"
  ],
  "check_ids": [
    "onboarding-dashboard:CHK-002",
    "onboarding-dashboard:CHK-030"
  ],
  "related_oq_ids": [
    "OQ-onboarding-dashboard-003"
  ]
}
```

## OQ-onboarding-dashboard-009 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-onboarding-dashboard-009",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "onboarding-dashboard",
  "summary": "Window 30 ngày của số ATC (Dashboard) và Analytics dùng offset timezone trình duyệt (+07:00) và kết thúc hôm qua, trong khi form offer hiển thị timezone store (-04:00). Expected là timezone store hay trình duyệt, và có tính cả hôm nay không?",
  "kb_ids": [
    "onboarding-dashboard#KB-018",
    "onboarding-dashboard#KB-031"
  ],
  "check_ids": [],
  "related_oq_ids": [
    "OQ-onboarding-dashboard-003"
  ]
}
```

## OQ-onboarding-dashboard-010 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-onboarding-dashboard-010",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "onboarding-dashboard",
  "summary": "Nút 'Manage offers' trong 'Recently created offers' chỉ hiện khi store có ≥1 offer (0 offer chỉ có 'Create offer'); tài liệu KB-008 nêu cả 2 nút không kèm điều kiện. Expected?",
  "kb_ids": [
    "onboarding-dashboard#KB-008",
    "onboarding-dashboard#KB-030"
  ],
  "check_ids": []
}
```

## OQ-onboarding-dashboard-011 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-onboarding-dashboard-011",
  "type": "OPEN_ISSUE",
  "feature_id": "onboarding-dashboard",
  "summary": "Trên store mới cài (chưa từng có offer), Home có hiện onboarding 'Hello {Store name}!' như tài liệu, và chuyển sang Dashboard khi nào?",
  "detail": "Store staging hiện tại 0 offer nhưng hiện Dashboard (lịch sử không xác định) — nhánh onboarding (B4S) NOT_COVERED; cần store/instance mới cài để quan sát.",
  "kb_ids": [],
  "check_ids": []
}
```

## OQ-onboarding-dashboard-012 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-onboarding-dashboard-012",
  "type": "OPEN_ISSUE",
  "feature_id": "onboarding-dashboard",
  "summary": "Khi app embed thật sự tắt, card Theme extension, nút 'Enable theme app' và deep-link theme editor hoạt động thế nào trên staging?",
  "detail": "Chỉ thấy trạng thái Inactive thoáng qua lúc tải; Inactive thật và deep-link NOT_COVERED (đổi theme bị cấm).",
  "kb_ids": [],
  "check_ids": []
}
```

## OQ-onboarding-dashboard-013 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-onboarding-dashboard-013",
  "type": "OPEN_ISSUE",
  "feature_id": "onboarding-dashboard",
  "summary": "Request GET /api/offers?status=ACTIVE&limit=1 (chỉ khi có offer) dùng cho phần nào của Dashboard?",
  "detail": "Mục đích không xác định từ network; không gán được UI nên không có oracle API cho request này.",
  "kb_ids": [],
  "check_ids": []
}
```
