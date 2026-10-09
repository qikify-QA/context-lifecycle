# Open Questions — Teeinblue integration — gắn template ImagenHub vào Photo Upload layer ('[ImagenHub] AI Effect') của Teeinblue

Tổng: 5 mục. Sinh từ lần bootstrap đầu tiên (DOC_BOOTSTRAP) của ImagenHub, ngày 2026-10-08.

- CONFLICT: 0
- NEEDS_CONFIRMATION: 3
- OPEN_ISSUE: 2

## OQ-teeinblue-integration-001 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-teeinblue-integration-001",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "teeinblue-ai-effect-setup",
  "summary": "Nhãn UI chính xác phía Teeinblue để gắn template ImagenHub vào Photo Upload Layer: docs chính thức ImagenHub gọi bằng hai tên khác nhau — mục \"Gen AI Effect\" → chọn \"[ImagenHub] AI Effect\" (Bước setup đầy đủ) và mục \"ImagenHub Template\" (Image effects) trong personalization settings của layer (Dùng với Teeinblue). Đây là cùng một chỗ gọi hai kiểu, hai bước lồng nhau, hay hai phiên bản UI? Nhãn nào là hiện hành?",
  "kb_ids": [
    "KB-006"
  ],
  "related_questions": [
    "Nhãn chính xác phía Teeinblue để gắn template ImagenHub vào Photo Upload Layer là gì? Docs chính thức gọi bằng hai tên: mục \"Gen AI Effect\" → chọn \"[ImagenHub] AI Effect\" và mục \"ImagenHub Template\" (Image effects) trong personalization settings của layer. Đây là cùng một chỗ, hai bước lồng nhau, hay hai phiên bản UI?",
    "Nhãn UI chính xác phía Teeinblue để gắn template ImagenHub vào Photo Upload Layer là \"Gen AI Effect\" → \"[ImagenHub] AI Effect\" hay \"ImagenHub Template\" (Image effects), hay đó là hai bước lồng nhau / hai phiên bản UI?"
  ],
  "check_ids": [
    "teeinblue-ai-effect-setup:CHK-008"
  ]
}
```

## OQ-teeinblue-integration-002 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-teeinblue-integration-002",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "teeinblue-ai-effect-setup",
  "summary": "Role thực hiện các bước tích hợp Teeinblue (dán API key vào Teeinblue Portal, gắn template vào Photo Upload Layer) không được docs nêu: có phải merchant/admin của store Teeinblue không, và phía ImagenHub cần role nào trong Organization để tạo API key và template dùng cho tích hợp?",
  "kb_ids": [
    "KB-001",
    "KB-002",
    "KB-003",
    "KB-004",
    "KB-005",
    "KB-006",
    "KB-007",
    "KB-008",
    "KB-009",
    "KB-010",
    "KB-011"
  ],
  "related_questions": [
    "Ai được thực hiện các bước tích hợp Teeinblue: phía Teeinblue có phải merchant/admin của store không, và phía ImagenHub cần role nào trong Organization để tạo API key và template dùng cho tích hợp?",
    "Role nào thực hiện các bước tích hợp phía Teeinblue, và role nào trong Organization ImagenHub được tạo API key và template cho tích hợp?"
  ],
  "check_ids": [
    "teeinblue-ai-effect-setup:CHK-014"
  ]
}
```

## OQ-teeinblue-integration-003 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-teeinblue-integration-003",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "teeinblue-ai-effect-setup",
  "summary": "Docs không mô tả hành vi phía Teeinblue khi ImagenHub lỗi: task ImagenHub fail, hết credit, API key sai/hết hạn/bị thu hồi, hoặc template đã gắn bị xoá — khách upload ảnh nhận được gì trên storefront và merchant thấy gì. Chưa có expected cho luồng lỗi của tích hợp.",
  "kb_ids": [
    "KB-002",
    "KB-004",
    "KB-006",
    "KB-011"
  ],
  "related_questions": [
    "Phía Teeinblue/storefront nhận gì khi ImagenHub lỗi: task fail, hết credit, API key sai/hết hạn/bị thu hồi, template đã gắn bị xoá?",
    "Khi Teeinblue gọi template ImagenHub đã gắn ở Photo Upload Layer, contract dữ liệu là gì: Teeinblue gọi endpoint nào, request gửi gì (ảnh khách upload, template, ratio/resolution), nhận về gì và xử lý lỗi theo response nào?",
    "Tích hợp Teeinblue: khi API key ImagenHub sai, hết hạn hoặc bị thu hồi, Teeinblue Portal báo gì lúc lưu key, và khách upload ảnh vào layer có AI effect trên storefront nhận được gì?",
    "Tích hợp Teeinblue: khi task ImagenHub thất bại hoặc organization hết credit, khách upload ảnh trên storefront nhận được gì (ảnh gốc, thông báo lỗi, chặn đặt hàng?) và merchant thấy gì?",
    "Tích hợp Teeinblue: khi template ImagenHub đã gắn vào Photo Upload Layer bị xoá trên ImagenHub, Artwork Editor hiển thị gì và khách upload ảnh vào layer đó nhận được gì?"
  ],
  "check_ids": [
    "teeinblue-ai-effect-setup:CHK-002",
    "teeinblue-ai-effect-setup:CHK-012",
    "teeinblue-ai-effect-setup:CHK-013"
  ]
}
```

## OQ-teeinblue-integration-004 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-teeinblue-integration-004",
  "type": "OPEN_ISSUE",
  "feature_id": "teeinblue-ai-effect-setup",
  "summary": "Fail-Safe Redundancy trong tích hợp Teeinblue: khi key BYOK hết token và request chạy qua mạng ImagenHub, có trừ credit ImagenHub không, có giới hạn theo plan không, và merchant có được báo không? Docs không nêu (chủ đề tính phí, không tự suy).",
  "kb_ids": [
    "KB-004"
  ],
  "related_questions": [
    "Tích hợp Teeinblue: khi key BYOK hết token và request chạy qua mạng ImagenHub (Fail-Safe), có trừ credit ImagenHub không, có giới hạn theo plan không, và merchant có được báo không?",
    "Khi key BYOK hết token và request chạy qua mạng ImagenHub, có trừ credit ImagenHub không, có giới hạn theo plan không, merchant có được báo không?"
  ],
  "check_ids": [
    "teeinblue-ai-effect-setup:CHK-005"
  ]
}
```

## OQ-teeinblue-integration-005 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-teeinblue-integration-005",
  "type": "OPEN_ISSUE",
  "feature_id": "teeinblue-ai-effect-setup",
  "summary": "Chi tiết từng trang của mục Teeinblue trong docs chính thức (tổng quan, api-keys, model-access, templates, integration) là gì?",
  "kb_ids": [
    "KB-001"
  ]
}
```
