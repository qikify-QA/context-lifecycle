# Open Questions — Models — catalog model/provider (kể cả model nội bộ Teeinblue) và Playground chạy model trực tiếp

Tổng: 18 mục. Sinh từ lần bootstrap đầu tiên (DOC_BOOTSTRAP) của ImagenHub, ngày 2026-10-08.

- CONFLICT: 0
- NEEDS_CONFIRMATION: 10
- OPEN_ISSUE: 8

## OQ-models-001 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-models-001",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": null,
  "summary": "Role cho object Models: bootstrap không cố định role; docs chính thức chỉ nêu GET /models, /model-providers public và GET /providers cần API key, còn mọi quan sát portal (catalog, Playground, Run, Save as Template) chỉ làm trên một tài khoản của org test. Role nào trong Organization (Owner/Admin/Editor/Viewer) được xem catalog, chạy model trong Playground (tốn credit) và lưu/cập nhật template từ trang model?",
  "kb_ids": [
    "KB-001",
    "KB-003",
    "KB-025",
    "KB-034"
  ],
  "related_questions": [
    "Role nào trong Organization (Owner/Admin/Editor/Viewer) được xem catalog model trên portal? Tài liệu chỉ mô tả quan sát bằng một tài khoản của org test.",
    "Role nào trong Organization (Owner/Admin/Editor/Viewer) được chạy model trong Playground (tốn credit), Save as Template và Update template từ trang model?"
  ],
  "check_ids": [
    "model-catalog:CHK-018",
    "model-playground:CHK-026"
  ]
}
```

## OQ-models-002 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-models-002",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "model-catalog",
  "summary": "Trên staging (khảo sát 2026-08-30) catalog có 37 model (13 Image To Image + 24 Text To Image) nhưng số đếm cạnh 14 owner cộng lại là 61. Tài liệu giải thích số đếm owner là 'tổng biến thể trên cả 2 type + bản main/edit', nhưng bản base và bản /edit vốn đã là 2 entry riêng trong 37. Số đếm cạnh owner được định nghĩa thế nào và giá trị nào là kỳ vọng đúng?",
  "kb_ids": [
    "KB-009",
    "KB-010",
    "KB-011",
    "KB-012"
  ],
  "related_questions": [
    "Số đếm cạnh mỗi owner trong dropdown \"All owners\" của trang Models được định nghĩa thế nào? Trên staging tổng catalog là 37 model nhưng tổng số đếm theo 14 owner là 61, và cách giải thích \"tính cả bản main và bản /edit\" không khớp vì hai bản đó đã là hai entry riêng.",
    "Số đếm cạnh mỗi owner trong dropdown được định nghĩa thế nào, và giá trị nào là kỳ vọng đúng (tổng 61 so với 37 model)?"
  ],
  "check_ids": [
    "model-catalog:CHK-016"
  ]
}
```

## OQ-models-003 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-models-003",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "model-catalog",
  "summary": "Model Remove background on color được ghi là 'mới cập nhật 2026-08' kèm banner thông báo trên portal. Bản cập nhật này đã thay đổi gì cụ thể, và banner/thay đổi đó còn là trạng thái hiện tại không?",
  "kb_ids": [
    "KB-015",
    "KB-016"
  ],
  "related_questions": [
    "Bản cập nhật 2026-08 của Remove background on color thay đổi gì, và banner thông báo còn là trạng thái hiện tại không?"
  ]
}
```

## OQ-models-004 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-models-004",
  "type": "OPEN_ISSUE",
  "feature_id": "model-playground",
  "summary": "Lỗi UX đã biết trên staging (2026-08-30, model google/nano-banana-2-lite): khi Run bị chặn vì Seed bắt buộc còn trống, portal chỉ hiện dòng chữ nhỏ 'Seed is required.' dưới field, không có toast/alert, không cuộn/focus tới field lỗi. Có ticket theo dõi không, và hành vi mong muốn là gì? Checklist dùng làm regression watch, không làm expected result.",
  "kb_ids": [
    "KB-039",
    "KB-038"
  ],
  "related_questions": [
    "Khi Run trong Playground bị chặn vì field bắt buộc (ví dụ Seed) còn trống, hành vi mong muốn là gì: có hiện toast/alert không, có tự cuộn và focus vào field lỗi không? Hiện trạng staging chỉ hiện dòng chữ nhỏ \"Seed is required.\" dưới field và được ghi nhận là lỗi trải nghiệm đã biết; lỗi này có đang được theo dõi để sửa không?"
  ],
  "check_ids": [
    "model-playground:CHK-018"
  ]
}
```

## OQ-models-005 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-models-005",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "model-playground",
  "summary": "IGH-233: Dev xác nhận replicate trả size 9:16 riêng (1152×2048 khi chọn 1024x2048) cho GPT-image-2.5 /edit là expected. Xác nhận đó có bao gồm việc UI không hiện cảnh báo nào khi chọn provider replicate không, hay UI nên cảnh báo size output khác size đã chọn?",
  "kb_ids": [
    "KB-050",
    "KB-049",
    "KB-048"
  ],
  "related_questions": [
    "Xác nhận của Dev cho IGH-233 có bao gồm việc UI không cảnh báo khi chọn provider replicate không?"
  ]
}
```

## OQ-models-006 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-models-006",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "model-playground",
  "summary": "Field size của GPT-image-2.5 sunburst/flare /edit: danh sách đầy đủ 31 giá trị là gì, và đợt IGH-233 thêm 5 size portrait (26 → 31) có còn đúng ở bản hiện tại không?",
  "kb_ids": [
    "KB-042",
    "KB-043",
    "KB-045"
  ],
  "related_questions": [
    "Danh sách đầy đủ 31 giá trị size của GPT-image-2.5 sunburst/flare /edit là gì, và 5 size dọc thêm trong IGH-233 (672x1008, 1024x2048, 1920x2880, 1440x2880, 1920x3840) có còn đúng ở bản hiện tại không?",
    "Danh sách đầy đủ 31 giá trị size của GPT-image-2.5 sunburst/flare /edit là gì, và đợt IGH-233 (26 → 31) còn đúng ở bản hiện tại không?"
  ],
  "check_ids": [
    "model-playground:CHK-020"
  ]
}
```

## OQ-models-007 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-models-007",
  "type": "OPEN_ISSUE",
  "feature_id": "model-playground",
  "summary": "Aspect Ratio 'Auto': trên staging model google/nano-banana-2-lite có picker mặc định Auto, gpt-image-1.5/edit có Auto, còn GPT-image-2.5 sunburst/flare /edit không có auto trong enum size (nên không tạo được template ratio = Auto cho 2 model này), trong khi docs chính thức nói Auto được thêm vào cuối dropdown size của model. Model nào có/không có Auto, và GPT-image-2.5 /edit có dự kiến bật Auto không?",
  "kb_ids": [
    "KB-030",
    "KB-042"
  ],
  "related_questions": [
    "Model nào có Aspect Ratio \"Auto\" và model nào không? Trên staging google/nano-banana-2-lite có picker mặc định Auto, còn GPT-image-2.5 sunburst/flare /edit không có auto trong size, trong khi docs chính thức nói Auto được thêm vào dropdown size của model. GPT-image-2.5 /edit có dự kiến bật Auto không?",
    "Model nào có picker Aspect Ratio Auto, model nào không, và GPT-image-2.5 /edit có dự kiến bật Auto không?"
  ],
  "check_ids": [
    "model-playground:CHK-011"
  ]
}
```

## OQ-models-008 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-models-008",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "model-playground",
  "summary": "Đổi provider trong Playground có làm đổi các field schema không, và cùng một model có giá khác nhau theo provider không? Tài liệu chỉ nói 'có thể' (cả docs chính thức lẫn ghi chú staging), chưa nêu cặp model/provider cụ thể nào.",
  "kb_ids": [
    "KB-026",
    "KB-056"
  ],
  "related_questions": [
    "Đổi provider trong Playground có làm đổi các field input schema không, và cùng một model có giá khác nhau theo provider không? Cần một cặp model/provider cụ thể làm ví dụ.",
    "Đổi provider có làm đổi các field schema của Form không, với cặp model/provider cụ thể nào?"
  ],
  "check_ids": [
    "model-playground:CHK-007"
  ]
}
```

## OQ-models-009 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-models-009",
  "type": "OPEN_ISSUE",
  "feature_id": "model-playground",
  "summary": "Provider 'Auto' trong Playground chọn provider theo logic nào (thứ tự ưu tiên, giá, BYOK)? Tài liệu chỉ ghi 'để hệ thống tự chọn'.",
  "kb_ids": [
    "KB-025"
  ],
  "related_questions": [
    "Provider \"Auto\" trong Playground chọn provider theo logic nào (thứ tự ưu tiên, giá, provider key riêng của organization)? Tài liệu chỉ ghi \"để hệ thống tự chọn\".",
    "Provider \"Auto\" chọn provider theo logic nào (thứ tự ưu tiên, giá, BYOK)?"
  ],
  "check_ids": [
    "model-playground:CHK-006"
  ]
}
```

## OQ-models-010 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-models-010",
  "type": "OPEN_ISSUE",
  "feature_id": "model-playground",
  "summary": "Chưa có ghi nhận nào cho nhánh Run lỗi trong Playground (status error): khu Result/Logs hiển thị gì, có bị trừ credit không. Bảng giá credit theo size/quality của GPT-image-2.5 /edit cũng chỉ có một điểm đo (1024x2048 low = 2 credit).",
  "kb_ids": [
    "KB-032",
    "KB-053",
    "KB-051"
  ],
  "related_questions": [
    "Khi Run trong Playground kết thúc ở status error, khu Result/Logs hiển thị gì, task có được ghi vào Task History không, và có bị trừ credit không?",
    "Khi Run lỗi (status error), khu Result/Logs hiển thị gì và có bị trừ credit không?",
    "Bảng credit theo size/quality của GPT-image-2.5 /edit là gì?"
  ],
  "check_ids": [
    "model-playground:CHK-016"
  ]
}
```

## OQ-models-011 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-models-011",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "model-catalog",
  "summary": "GET /models/{id} (chi tiết một model, gồm input schema và provider kèm cost) có phải endpoint public như GET /models và GET /model-providers không, hay cần API key/JWT? Docs chính thức không nêu.",
  "check_ids": [
    "model-catalog:CHK-008"
  ],
  "kb_ids": [
    "KB-002"
  ],
  "related_questions": [
    "GET /models/{id} có cần xác thực không?"
  ]
}
```

## OQ-models-012 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-models-012",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "model-catalog",
  "summary": "Cost ước tính hiển thị cho một model trên portal được tính từ provider nào khi model có nhiều provider ở giá khác nhau (provider rẻ nhất, provider mặc định, hay provider Auto chọn)? Và cùng một model có thật sự có nhiều provider khác giá không — docs chỉ nói \"có thể\".",
  "kb_ids": [
    "KB-004",
    "KB-013",
    "KB-056"
  ],
  "check_ids": [
    "model-catalog:CHK-017"
  ],
  "related_questions": [
    "Model cụ thể nào có nhiều provider với giá khác nhau, và các giá trị type hợp lệ của field trong input format là gì?"
  ]
}
```

## OQ-models-013 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-models-013",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "model-playground",
  "summary": "Khi chuyển giữa chế độ Form và JSON trong Playground, giá trị đã nhập có được giữ và đồng bộ hai chiều không? Tài liệu chỉ ghi nhận sự tồn tại của toggle.",
  "check_ids": [
    "model-playground:CHK-009"
  ]
}
```

## OQ-models-014 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-models-014",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "model-playground",
  "summary": "Cost thực tế bị trừ khi Run trong Playground có luôn bằng số credit ước tính hiển thị trên nút Run không? Mới có 3 lần chạy mẫu đều completed.",
  "kb_ids": [
    "KB-052",
    "KB-053"
  ],
  "check_ids": [
    "model-playground:CHK-015"
  ]
}
```

## OQ-models-015 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-models-015",
  "type": "OPEN_ISSUE",
  "feature_id": "model-catalog",
  "summary": "Role nào trong Organization được xem catalog trên portal?",
  "kb_ids": [
    "KB-005"
  ]
}
```

## OQ-models-016 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-models-016",
  "type": "OPEN_ISSUE",
  "feature_id": "model-playground",
  "summary": "Role nào được chạy model, Save as Template và Update template từ Playground?",
  "kb_ids": [
    "KB-031",
    "KB-034"
  ]
}
```

## OQ-models-017 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-models-017",
  "type": "OPEN_ISSUE",
  "feature_id": "model-playground",
  "summary": "Hành vi của biến {{...}} trong Playground được mô tả ở đâu?"
}
```

## OQ-models-018 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-models-018",
  "type": "OPEN_ISSUE",
  "feature_id": "model-playground",
  "summary": "Khi bấm Run, Playground gọi API/endpoint nào, request gửi đi có body gì và response trả về có cấu trúc ra sao (phần hiển thị ở Result/JSON)?",
  "kb_ids": [
    "KB-034",
    "KB-035",
    "KB-037"
  ]
}
```
