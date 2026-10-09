# Open Questions — analytics

Tổng: 8 mục (NEEDS_CONFIRMATION/CONFLICT/OPEN_ISSUE). Sinh từ bootstrap DOC_BOOTSTRAP đầu tiên cho qik-volume.

- NEEDS_CONFIRMATION: 8
- CONFLICT: 0
- OPEN_ISSUE: 0

## OQ-analytics-001 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-analytics-001",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "analytics",
  "check_ids": [
    "analytics:CHK-017"
  ],
  "summary": "Chart endpoint backfill ngày trống bằng 0 trong range đã chọn — CHƯA XÁC NHẬN",
  "detail": {
    "text": "GET /api/order-analytics/graph có LUÔN backfill mọi ngày trống trong range đã chọn bằng giá trị 0 (ví dụ 'Last 30 days' luôn trả đủ 30 data point), hay có thể bỏ qua (omit) ngày trống trong một số trường hợp?",
    "reason": "knowledge_kind=INFERRED, confidence LOW — không có CONFIRMED_EXPECTED/OBSERVED_CURRENT nào xác nhận hành vi backfill này; cần xác nhận trước khi dùng làm oracle cho check hoàn chỉnh chart."
  }
}
```

## OQ-analytics-002 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-analytics-002",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "analytics",
  "check_ids": [
    "analytics:CHK-025"
  ],
  "summary": "Add-to-cart trên 1 widget có log nhầm add_to_cart cho widget khác chưa từng tương tác? — CHƯA XÁC NHẬN (nguy cơ over-count)",
  "detail": {
    "text": "Click 'Add to cart' trên 1 offer widget có log thêm 1 event add_to_cart nhầm cho 1 widget khác, chưa từng được tương tác, cùng active trên trang — xảy ra KHÔNG điều kiện mỗi khi có ≥2 widget active, hay chỉ riêng ở overlap-scenario (offer 815 + 816) đã quan sát 1 lần? Nếu xảy ra không điều kiện, số ATC/conversion của offer chưa từng được tương tác có thể bị inflate sai.",
    "reason": "Không có claim/kb_id nào được mint cho quan sát này — tài liệu nguồn tự nói chưa đủ bằng chứng kết luận; không có CONFIRMED_EXPECTED/OBSERVED_CURRENT nào làm oracle."
  }
}
```

## OQ-analytics-003 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-analytics-003",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "analytics",
  "check_ids": [
    "analytics:CHK-027"
  ],
  "summary": "Ngữ nghĩa param 'filter' (test/currency/...) trên endpoint Analytics — CHƯA XÁC NHẬN",
  "detail": {
    "text": "Param 'filter' trên các endpoint Analytics nhận đúng những giá trị nào, và mỗi giá trị làm gì — cụ thể, filter=test có loại trừ order test-mode/QA khỏi tổng số thật của merchant không? Tài liệu tự nói danh sách filter trong ticket là underspecified.",
    "reason": "knowledge_kind=INFERRED, confidence LOW — không có CONFIRMED_EXPECTED/OBSERVED_CURRENT cho semantics của param này; nguy cơ test order của QA làm sai lệch số liệu thật của merchant nếu hiểu nhầm."
  }
}
```

## OQ-analytics-004 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-analytics-004",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "analytics",
  "check_ids": [
    "analytics:CHK-028"
  ],
  "summary": "Dữ liệu lịch sử Views/ATC/Orders của 1 offer đã bị xoá còn query được không? — CHƯA XÁC NHẬN",
  "detail": {
    "text": "Khi 1 offer bị xoá, dữ liệu lịch sử Views/ATC/Orders của offer đó còn query được trên trang/API Analytics không, hay bị mất/orphan theo record offer?",
    "reason": "Không có claim/kb_id nào trong shard này trả lời câu hỏi này — là 1 unknown_area thuần của feature profile, chưa có oracle nào."
  }
}
```

## OQ-analytics-005 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-analytics-005",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "analytics",
  "check_ids": [
    "analytics:CHK-029"
  ],
  "summary": "ATC count trên Onboarding Dashboard (QVD-115) và 'Add to cart clicks' trên Analytics có cùng nguồn dữ liệu? — CHƯA XÁC NHẬN",
  "detail": {
    "text": "ATC count trên Onboarding Dashboard (QVD-115) và 'Add to cart clicks' trên Analytics page có cùng nguồn dữ liệu nền (event) hay được tính độc lập (và có thể lệch nhau)? Nếu khác nhau, QA có thể nhầm lẫn khi dùng 1 trang để verify số liệu của trang khác.",
    "reason": "knowledge_kind=INFERRED, confidence LOW — tài liệu tự nói chưa so sánh side-by-side; không có CONFIRMED_EXPECTED/OBSERVED_CURRENT nào xác nhận 2 nguồn là 1 hay khác."
  }
}
```

## OQ-analytics-006 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-analytics-006",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "analytics",
  "check_ids": [
    "analytics:CHK-030"
  ],
  "summary": "Role/permission tier cho việc truy cập trang Analytics — CHƯA XÁC NHẬN",
  "detail": {
    "text": "Truy cập Portal vào trang Analytics có bị giới hạn theo staff role/permission tier cụ thể (ví dụ chỉ owner mới xem được) không, hay mọi account staff đã đăng nhập đều thấy trang này giống nhau? Tài liệu nguồn không đề cập permission tier nào cho trang này.",
    "reason": "unknown_area thuần của feature profile — không có claim/kb_id nào về role/permission cho feature này ngoài 1 role 'merchant' chung; PERMISSION dimension không thể bao phủ cách nào khác."
  }
}
```

## OQ-analytics-007 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-analytics-007",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "analytics",
  "check_ids": [
    "analytics:CHK-031"
  ],
  "summary": "Metric 'Order with offers' render giá trị khi có order hợp lệ trong range — CHƯA XÁC NHẬN (có thể là bug 0-state)",
  "detail": {
    "text": "Khi có ≥1 order hoàn tất dùng discount offer trong range đã chọn, metric 'Order with offers' có render giá trị số/chart như kỳ vọng không, hay vẫn trống (như đã quan sát 1 lần, nguyên nhân chưa rõ)? Đây là bug thiếu xử lý khi có dữ liệu, hay chỉ do dữ liệu phiên trước tình cờ thiếu?",
    "reason": "Đây chỉ là 1 ví dụ quan sát được (1 sample)/hedged ; claim chủ đích KHÔNG được mint thành KB item theo chỉ dẫn của quá trình publish cho run này — không có oracle nào tồn tại."
  }
}
```

## OQ-analytics-008 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-analytics-008",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": null,
  "summary": "Doc set nguồn cho object analytics trải cả merchant (Portal dashboard) và buyer (storefront add-to-cart event tracking feeding backend) surface, không có 1 role duy nhất khai báo ở mức doc-set/object (bootstrap context.role=null, theo thiết kế; covers_surfaces=[\"portal\",\"api\"] ở mức doc-source). Cần xác nhận đây có phải invariant đúng hay chỉ là gap của bộ tài liệu nguồn."
}
```

