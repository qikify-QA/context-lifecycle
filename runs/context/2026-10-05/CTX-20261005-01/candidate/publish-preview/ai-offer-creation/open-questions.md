# Open Questions — ai-offer-creation

Tổng: 6 mục (NEEDS_CONFIRMATION/CONFLICT/OPEN_ISSUE). Sinh từ bootstrap DOC_BOOTSTRAP đầu tiên cho qik-volume.

- NEEDS_CONFIRMATION: 6
- CONFLICT: 0
- OPEN_ISSUE: 0

## OQ-ai-offer-creation-001 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-ai-offer-creation-001",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "ai-offer-creation",
  "check_ids": [
    "ai-offer-creation:CHK-015"
  ],
  "summary": "ai_prompt_limit nâng lên một giá trị rất lớn — hành vi upper bound chưa xác nhận",
  "detail": "Có giới hạn trên (upper bound) hay approval workflow nào cho giá trị `ai_prompt_limit` mà admin có thể set qua Admin Config không? Tài liệu nguồn (\"AI Offer Creation\") không đề cập."
}
```

## OQ-ai-offer-creation-002 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-ai-offer-creation-002",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "ai-offer-creation",
  "check_ids": [
    "ai-offer-creation:CHK-017"
  ],
  "summary": "Merchant role có bị chặn sửa ai_prompt_limit qua Admin Config không — chưa xác nhận",
  "detail": "Merchant role có bị chặn truy cập Admin page Config (nơi sửa `ai_prompt_limit`) không, hay đây là platform-level RBAC chung chưa được xác nhận riêng cho feature AI Offer Creation? Shard tài liệu hiện tại (\"AI Offer Creation\") chỉ mô tả hành vi phía staff/admin, không nêu rõ merchant bị chặn ra sao."
}
```

## OQ-ai-offer-creation-003 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-ai-offer-creation-003",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "ai-offer-creation",
  "check_ids": [
    "ai-offer-creation:CHK-018"
  ],
  "summary": "Truy cập chưa đăng nhập vào AI Offer Creation entry point — chưa xác nhận",
  "detail": "Hành vi cụ thể khi một người chưa đăng nhập truy cập trang offer creation AI Offer Assistant panel là gì? Shard tài liệu của feature này không nêu rõ (có thể là platform-level login-wall chung, nhưng chưa được xác nhận riêng cho feature này)."
}
```

## OQ-ai-offer-creation-004 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-ai-offer-creation-004",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "ai-offer-creation",
  "check_ids": [
    "ai-offer-creation:CHK-022"
  ],
  "summary": "ai_prompt_limit đã nâng có persist qua reload/session mới không — chưa xác nhận",
  "detail": "KB-028 chỉ xác nhận counter phản ánh limit mới 'ngay' tại thời điểm thay đổi — tài liệu không tái xác nhận riêng việc giá trị này còn giữ nguyên qua một reload/session mới. Cần xác nhận: đây có phải chỉ là một live in-session update, hay là một thay đổi Config thật sự persist?"
}
```

## OQ-ai-offer-creation-005 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-ai-offer-creation-005",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "ai-offer-creation",
  "check_ids": [
    "ai-offer-creation:CHK-023"
  ],
  "summary": "Giá trị default thật của ai_prompt_limit trong production — claim hedged, chưa xác nhận",
  "detail": "Giá trị default chính xác hiện tại của `ai_prompt_limit` trong production là gì? Tài liệu nguồn (\"AI Offer Creation\") tự đánh dấu claim này là hedged ('currently set to ___ (default 1 in production)')."
}
```

## OQ-ai-offer-creation-006 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-ai-offer-creation-006",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "ai-offer-creation",
  "check_ids": [
    "ai-offer-creation:CHK-026"
  ],
  "summary": "ai_offer_event_id qua flow preview→edit→save — cơ chế 'fragile', chưa xác nhận là defect",
  "detail": "Theo QVD-173's 'FE contract', mất `ai_offer_event_id` qua flow preview→edit→save có thực sự khiến offer mất AI flag, review overlay không hiện, và view rate giảm hay không — hay đây chỉ là một rủi ro lý thuyết được tài liệu tự gọi là 'fragile', chưa từng xác nhận đang xảy ra? Cần Dev xác nhận độ tin cậy thật của cơ chế persist `ai_offer_event_id` này."
}
```

