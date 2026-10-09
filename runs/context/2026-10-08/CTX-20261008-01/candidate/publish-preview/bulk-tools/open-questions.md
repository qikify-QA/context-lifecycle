# Open Questions — Bulk tools (Beta) — Batch (1 template cho nhiều ảnh) và Design (mockup → file in)

Tổng: 20 mục. Sinh từ lần bootstrap đầu tiên (DOC_BOOTSTRAP) của ImagenHub, ngày 2026-10-08.

- CONFLICT: 0
- NEEDS_CONFIRMATION: 14
- OPEN_ISSUE: 6

## OQ-bulk-tools-001 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-bulk-tools-001",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": null,
  "summary": "Bulk tools (Batch, Design): role nào trong organization (Owner/Admin/Editor/Viewer) được truy cập và chạy Batch/Design? Tài liệu Batch và Design không nêu role của tài khoản khảo sát hay ràng buộc quyền; dấu hiệu duy nhất là nút Run in Batch trên trang chi tiết template bị disable với role Viewer (thuộc object Templates).",
  "kb_ids": [
    "KB-001",
    "KB-019"
  ],
  "related_questions": [
    "Role nào trong Organization (Owner/Admin/Editor/Viewer) được truy cập và chạy Batch? Tài liệu không nêu; dấu hiệu duy nhất là nút Run in Batch trên trang chi tiết template bị disable với role Viewer.",
    "Role nào trong Organization (Owner/Admin/Editor/Viewer) được truy cập và chạy Design?"
  ],
  "check_ids": [
    "batch-edit:CHK-016",
    "design-print-file:CHK-023"
  ]
}
```

## OQ-bulk-tools-002 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-bulk-tools-002",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "batch-edit",
  "summary": "Batch: giới hạn 250 ảnh và cơ chế xử lý 5 ảnh/lần mới chỉ là quan sát UI. Chưa thử thêm quá 250 ảnh (UI chặn, báo lỗi, cắt bớt hay server từ chối?) và chưa có lần chạy nào quá 5 ảnh. Cần xác nhận giới hạn và hành vi khi vượt.",
  "kb_ids": [
    "KB-006",
    "KB-007"
  ],
  "related_questions": [
    "Hệ thống làm gì khi thêm hơn 250 ảnh vào Batch (UI chặn, báo lỗi, cắt bớt hay server từ chối)?",
    "Cơ chế xử lý 5 ảnh mỗi lần có thật khi upload hơn 5 ảnh không?",
    "Batch: giới hạn tối đa 250 ảnh ở bước Add images có phải giới hạn thật không, và khi thêm ảnh thứ 251 thì hệ thống làm gì (chặn ở UI, báo lỗi, cắt bớt hay phía server từ chối)?"
  ],
  "check_ids": [
    "batch-edit:CHK-004"
  ]
}
```

## OQ-bulk-tools-003 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-bulk-tools-003",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "batch-edit",
  "summary": "Batch: số credit thực tế bị trừ sau Process có khớp cost ước tính trong confirm dialog không, và có hiện trong Task History / số dư Subscription không? Mới chỉ thấy ước tính trước khi chạy.",
  "kb_ids": [
    "KB-012",
    "KB-016"
  ],
  "related_questions": [
    "Batch: số credit thật bị trừ sau khi Process có khớp cost ước tính trong confirm dialog không, công thức ước tính là gì, và chi phí có hiện trong Task History / số dư không?",
    "Số credit thực tế bị trừ có khớp cost ước tính trong confirm dialog không, và có hiện trong Task History / số dư Subscription không?"
  ],
  "check_ids": [
    "batch-edit:CHK-009"
  ]
}
```

## OQ-bulk-tools-004 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-bulk-tools-004",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "batch-edit",
  "summary": "Batch: chưa có tài liệu cho nhánh lỗi và các hành vi phụ — ảnh lỗi giữa batch (ảnh khác có chạy tiếp không, có tính credit, có retry), định dạng/kích thước ảnh được chấp nhận, kết quả có được lưu lại sau khi rời trang không, confirm dialog có nút huỷ không; fallback trong Batch chưa được chạy test (bị chặn bởi Q25). Tính năng Beta, không có trong docs chính thức ImagenHub.",
  "kb_ids": [
    "KB-005",
    "KB-011",
    "KB-017",
    "KB-018"
  ],
  "related_questions": [
    "Batch: khi một hoặc vài ảnh trong batch xử lý lỗi thì các ảnh khác có chạy tiếp không, ảnh lỗi có bị tính credit không, và có cơ chế retry không?",
    "Khi một hoặc vài ảnh trong batch lỗi thì sao (ảnh khác có chạy tiếp, có tính credit ảnh lỗi, có retry)?",
    "Confirm dialog có nút huỷ không, và huỷ thì có trừ credit không?",
    "Fallback trong Batch chạy thế nào khi template chính fail (retry/timeout, post-processing nào chạy, lỗi nào kích hoạt)?",
    "Batch: định dạng và kích thước/dung lượng ảnh nào được chấp nhận ở bước Add images, và file không hợp lệ bị xử lý thế nào?",
    "Định dạng và kích thước ảnh nào được chấp nhận ở bước Add images?",
    "Batch: confirm dialog có nút huỷ không; huỷ thì ảnh đã thêm có được giữ lại không, và có bị trừ credit hay tạo task không?",
    "Batch: kết quả có được lưu lại (ví dụ thành task trong Task History) hay chỉ tồn tại trên trang hiện tại; reload hoặc rời trang có làm mất kết quả chưa tải không?",
    "Kết quả Batch có được lưu lại (ví dụ thành task trong Task History) hay chỉ tồn tại trên trang hiện tại?"
  ],
  "check_ids": [
    "batch-edit:CHK-014",
    "batch-edit:CHK-005",
    "batch-edit:CHK-008",
    "batch-edit:CHK-013"
  ]
}
```

## OQ-bulk-tools-005 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-bulk-tools-005",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "design-print-file",
  "summary": "Design: giới hạn upload 250 ảnh và text \"Up to 5 run at once\" mới chỉ là quan sát UI; chưa thử vượt 250 ảnh, chưa chạy quá 1 ảnh. Cũng chưa rõ step nào là \"cần thiết\" để nút Process bật, và hành vi khi thiếu model ở một step (đặc biệt Step 2/3 không có mặc định).",
  "kb_ids": [
    "KB-035",
    "KB-041",
    "KB-036",
    "KB-024",
    "KB-025"
  ],
  "related_questions": [
    "Khi upload hơn 250 ảnh thì trang Design xử lý thế nào, và giới hạn \"Up to 5 run at once\" có thật khi chạy nhiều ảnh không?",
    "Step nào là bắt buộc để nút Process được bật; thiếu model ở Step 2/3 thì sao; có bỏ qua được Upscale/cắt nền không?"
  ]
}
```

## OQ-bulk-tools-006 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-bulk-tools-006",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "design-print-file",
  "summary": "Design: số credit thực tế bị trừ sau toàn bộ pipeline (15 credits/image + từng finishing step bao nhiêu) có khớp ước tính và có hiện trong Task History / số dư Subscription không? Hiện chỉ có ước tính trước khi chạy và diễn giải của người viết.",
  "kb_ids": [
    "KB-032",
    "KB-033",
    "KB-042"
  ],
  "related_questions": [
    "Design: credit thật bị trừ sau toàn bộ pipeline là bao nhiêu (15 credit mỗi ảnh cộng mỗi bước hoàn thiện bao nhiêu), có khớp ước tính trong dialog không, và có hiện trong Task History / số dư không?",
    "Số credit thực tế bị trừ sau toàn bộ pipeline là bao nhiêu và có khớp Task History / số dư Subscription không?"
  ],
  "check_ids": [
    "design-print-file:CHK-012"
  ]
}
```

## OQ-bulk-tools-007 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-bulk-tools-007",
  "type": "OPEN_ISSUE",
  "feature_id": "design-print-file",
  "summary": "Design: mission Redesign chưa từng được chạy — chưa biết prompt, pipeline, chi phí và output khác Clone thế nào.",
  "kb_ids": [
    "KB-031"
  ],
  "related_questions": [
    "Design: mission Redesign chạy thế nào — prompt, pipeline, chi phí và output khác Clone ra sao? Redesign chưa từng được chạy.",
    "Mission Redesign thực tế tạo ra gì (prompt, pipeline, chi phí, output)?"
  ],
  "check_ids": [
    "design-print-file:CHK-003"
  ]
}
```

## OQ-bulk-tools-008 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-bulk-tools-008",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "design-print-file",
  "summary": "Design: dropdown Step 2 (Upscaler) và Step 3 (Background remover) hiện cùng một danh sách đầy đủ mọi model image-editor, không lọc theo chức năng step, và không cảnh báo khi chọn nhầm. Việc không lọc có phải chủ đích thiết kế không?",
  "kb_ids": [
    "KB-037",
    "KB-038",
    "KB-039"
  ],
  "related_questions": [
    "Design: dropdown Step 2 (Upscaler) và Step 3 (Background remover) không lọc model theo chức năng step và không cảnh báo khi chọn nhầm — đây có phải chủ đích thiết kế không?",
    "Dropdown Step 2/3 không lọc model theo chức năng có phải chủ đích thiết kế không?"
  ],
  "check_ids": [
    "design-print-file:CHK-008"
  ]
}
```

## OQ-bulk-tools-009 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-bulk-tools-009",
  "type": "OPEN_ISSUE",
  "feature_id": "design-print-file",
  "summary": "Design: chưa có tài liệu cho nhánh lỗi khi một bước pipeline thất bại, định dạng/kích thước thực tế của file output so với preset, toggle Custom instructions làm gì, danh sách preset Step 4 đầy đủ và ràng buộc Custom size, và Design có được expose qua API/MCP không. Tính năng Beta, không có trong docs chính thức ImagenHub.",
  "kb_ids": [
    "KB-023",
    "KB-026",
    "KB-027",
    "KB-045"
  ],
  "related_questions": [
    "Design: file in đầu ra có định dạng gì (PNG?), có luôn nền trong suốt không, và kích thước có đúng preset/Custom size đã chọn ở Step 4 không?",
    "Toggle \"Custom instructions\" ở Step 1 làm gì?",
    "Danh sách preset đầy đủ của Step 4 và ràng buộc Width/Height của \"Custom size\" là gì?",
    "Khi một bước pipeline thất bại thì UI và output xử lý thế nào?",
    "Định dạng file output và kích thước thực tế có khớp preset (ví dụ 4500×5400) không?"
  ],
  "check_ids": [
    "design-print-file:CHK-018"
  ]
}
```

## OQ-bulk-tools-010 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-bulk-tools-010",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "batch-edit",
  "summary": "Batch: khi chưa chọn template hoặc chưa có ảnh, nút \"Process N images\" bị disable hay vẫn bấm được, và hệ thống báo gì?",
  "check_ids": [
    "batch-edit:CHK-006"
  ]
}
```

## OQ-bulk-tools-011 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-bulk-tools-011",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "design-print-file",
  "summary": "Design: toggle \"Custom instructions\" ở Step 1 làm gì, và nội dung người dùng nhập có được đưa vào prompt của bước Generate không?",
  "check_ids": [
    "design-print-file:CHK-005"
  ]
}
```

## OQ-bulk-tools-012 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-bulk-tools-012",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "design-print-file",
  "summary": "Design: step nào là bắt buộc để nút Process được bật? Có thể bỏ trống Step 2 (Upscale) hoặc Step 3 (cắt nền) để bỏ qua bước đó không?",
  "check_ids": [
    "design-print-file:CHK-010"
  ]
}
```

## OQ-bulk-tools-013 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-bulk-tools-013",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "design-print-file",
  "summary": "Design: giới hạn 250 ảnh có phải giới hạn thật không, và khi thêm ảnh thứ 251 thì hệ thống làm gì?",
  "check_ids": [
    "design-print-file:CHK-015"
  ]
}
```

## OQ-bulk-tools-014 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-bulk-tools-014",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "design-print-file",
  "summary": "Design: chỉ báo tiến độ khi chạy (chip Generate → Upscale → Remove background → Resize và text \"N of M processed\") có phải hành vi ổn định không, và hiển thị thế nào khi chạy nhiều ảnh?",
  "kb_ids": [
    "KB-043",
    "KB-044"
  ],
  "check_ids": [
    "design-print-file:CHK-016"
  ]
}
```

## OQ-bulk-tools-015 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-bulk-tools-015",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "design-print-file",
  "summary": "Design: các step Upscale và cắt nền có luôn chạy đúng model người dùng chọn trong dropdown không? Mới có một lần chạy mẫu.",
  "kb_ids": [
    "KB-051"
  ],
  "check_ids": [
    "design-print-file:CHK-020"
  ]
}
```

## OQ-bulk-tools-016 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-bulk-tools-016",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "design-print-file",
  "summary": "Design: khi một bước của pipeline thất bại thì UI hiển thị gì, các bước sau có chạy tiếp không, và credit của các bước đã/chưa chạy được tính thế nào?",
  "check_ids": [
    "design-print-file:CHK-022"
  ]
}
```

## OQ-bulk-tools-017 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-bulk-tools-017",
  "type": "OPEN_ISSUE",
  "feature_id": "batch-edit",
  "summary": "Tiêu chí chính xác để một template xuất hiện trong combobox \"Choose a template\" là gì?",
  "kb_ids": [
    "KB-010"
  ]
}
```

## OQ-bulk-tools-018 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-bulk-tools-018",
  "type": "OPEN_ISSUE",
  "feature_id": "batch-edit",
  "summary": "Role nào trong Organization được dùng Batch?",
  "kb_ids": [
    "KB-001"
  ],
  "related_questions": [
    "Batch có API/endpoint riêng (gửi nhiều ảnh qua một request, request/response thế nào) hay chỉ dùng được trên trang /batch của portal?"
  ]
}
```

## OQ-bulk-tools-019 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-bulk-tools-019",
  "type": "OPEN_ISSUE",
  "feature_id": "design-print-file",
  "summary": "Design có được expose qua API/MCP hay chỉ có trên portal?",
  "kb_ids": [
    "KB-019"
  ]
}
```

## OQ-bulk-tools-020 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-bulk-tools-020",
  "type": "OPEN_ISSUE",
  "feature_id": "design-print-file",
  "summary": "Role nào trong Organization được dùng Design?",
  "kb_ids": [
    "KB-019"
  ]
}
```
