# Open Questions — Tasks — yêu cầu generate (/process), vòng đời task, ảnh output và Task History

Tổng: 26 mục. Sinh từ lần bootstrap đầu tiên (DOC_BOOTSTRAP) của ImagenHub, ngày 2026-10-08.

- CONFLICT: 1
- NEEDS_CONFIRMATION: 15
- OPEN_ISSUE: 10

## OQ-tasks-001 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-tasks-001",
  "type": "OPEN_ISSUE",
  "feature_id": "generate-request",
  "summary": "Tài liệu không nêu danh sách đầy đủ field body của POST /process, field nào bắt buộc, và tên field để truyền giá trị biến template khi gọi với template_id; payload mẫu chỉ là ví dụ nên không viết được case validation 422 cụ thể.",
  "kb_ids": [
    "KB-008",
    "KB-004",
    "KB-003"
  ],
  "related_questions": [
    "Danh sách đầy đủ field của body POST /process là gì, field nào bắt buộc, prompt dạng chuỗi có được chấp nhận không, và model_id không tồn tại trả 422 hay 404?",
    "Danh sách đầy đủ field body của POST /process, field nào bắt buộc?",
    "Tên field / cách truyền giá trị biến template khi gọi POST /process với template_id?"
  ],
  "check_ids": [
    "generate-request:CHK-006"
  ]
}
```

## OQ-tasks-002 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-tasks-002",
  "type": "OPEN_ISSUE",
  "feature_id": "generate-request",
  "summary": "Tài liệu chi tiết về endpoint staging (\"staging-api-endpoints\") được tham chiếu nhưng không có trong bộ tài liệu; trong đó có ghi chú 'gọi thẳng /api/process từ browser bị bypass billing' mà không mô tả nội dung. Cần bổ sung tài liệu hoặc xác nhận hành vi billing của /api/process trên staging.",
  "kb_ids": [
    "KB-007"
  ],
  "related_questions": [
    "Tài liệu endpoint staging được tham chiếu nhưng không có trong bộ tài liệu; trong đó có ghi chú về hành vi billing khi gọi thẳng /api/process từ browser."
  ]
}
```

## OQ-tasks-003 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-tasks-003",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "task-status-and-output",
  "summary": "IGH-261 (đang ở preview, chưa lên staging) đổi ảnh output full-size, avatar template và ảnh input sang URL công khai cố định, không hết hạn — trái với docs chính thức 'output là URL ký, hết hạn 1 giờ'. Cần dev/PO xác nhận thay đổi này có chủ đích không, link có mở được khi chưa đăng nhập không, và docs chính thức có được cập nhật theo không. Đây là lệch phạm vi (docs/prod vs staging vs preview), không tự resolve; topic signed-url-expiry không supersede tự động.",
  "kb_ids": [
    "KB-016",
    "KB-018",
    "KB-019",
    "KB-023",
    "KB-021"
  ],
  "related_questions": [
    "IGH-261 đổi ảnh sang URL công khai cố định không hết hạn. Việc ảnh output của task xem được vĩnh viễn và không cần đăng nhập có phải thay đổi có chủ đích không? Nếu có, docs chính thức (URL ký hết hạn 1 giờ) có được cập nhật theo và field output của GET /tasks/{id} có đổi theo không?",
    "IGH-261: link ảnh output công khai không hết hạn có chủ đích không, có mở được khi chưa đăng nhập không, và docs chính thức có được cập nhật theo không?"
  ],
  "check_ids": [
    "task-status-and-output:CHK-007"
  ]
}
```

## OQ-tasks-004 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-tasks-004",
  "type": "OPEN_ISSUE",
  "feature_id": "task-status-and-output",
  "summary": "Chưa kiểm signed URL output thực sự hết hạn sau 1 giờ trên staging (tài liệu chỉ đọc tham số X-Amz-Expires=3600), và chưa biết nút Download ở trang chi tiết task dùng URL nào; docs chính thức cũng không nói hạn của URL thumbnail.",
  "kb_ids": [
    "KB-022",
    "KB-021",
    "KB-019",
    "KB-052"
  ],
  "related_questions": [
    "Trên staging, link ảnh gốc ở trang chi tiết task (X-Amz-Expires=3600) có thực sự không mở được sau 1 giờ không? Hạn này có phải hành vi mong muốn cho portal giống như quy tắc 1 giờ của docs cho API không?",
    "Signed URL output trên staging có thực sự hết hạn sau 1 giờ không?",
    "Nút Download ở trang chi tiết task dùng URL nào?"
  ],
  "check_ids": [
    "task-status-and-output:CHK-006"
  ]
}
```

## OQ-tasks-005 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-tasks-005",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "task-history-list",
  "summary": "Object tasks: tài liệu không nêu role nào (Owner/Admin/Editor/Viewer của Organization, hay caller API) được gọi POST /process, xem Task History và trang chi tiết task, và có thấy task của thành viên khác trong org không. Mọi item của object hiện mang role 'unspecified' (riêng vài item API ghi 'api-caller').",
  "related_questions": [
    "Role nào xem được Task History; có thấy task của thành viên khác không?",
    "Role nào trong organization được gọi POST /process?",
    "Role nào xem được trang chi tiết task và dùng được Restore?",
    "Role nào được đọc trạng thái task và output?"
  ]
}
```

## OQ-tasks-006 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-tasks-006",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "task-history-list",
  "summary": "Task History còn các vùng chưa khảo sát: filter Model/Provider khi chọn và áp dụng có lọc đúng không và param URL là gì; kết hợp nhiều filter (AND/OR); search khớp theo cách nào; số task mỗi trang, thứ tự mặc định, task cũ hơn 30 ngày có truy cập được không; phân trang có thực sự cursor-based không.",
  "kb_ids": [
    "KB-034",
    "KB-035",
    "KB-036",
    "KB-038",
    "KB-039",
    "KB-040"
  ],
  "related_questions": [
    "Filter Model/Provider khi chọn và áp dụng có lọc đúng không, param URL là gì; nhiều filter kết hợp theo AND hay OR?",
    "Số task mỗi trang, thứ tự mặc định, task cũ hơn 30 ngày có truy cập được không, phân trang có thực sự cursor-based không?",
    "Filter Model/Provider khi chọn có lọc đúng không và dùng query param gì? Nhiều filter kết hợp theo AND hay OR; chọn nhiều model trong cùng filter là OR?"
  ],
  "check_ids": [
    "task-history-list:CHK-010"
  ]
}
```

## OQ-tasks-007 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-tasks-007",
  "type": "OPEN_ISSUE",
  "feature_id": "task-history-list",
  "summary": "Chưa biết task tạo trực tiếp qua POST /process bằng API key (không qua portal) có xuất hiện trong Task History không; phần verify chỉ liệt kê task từ Model Playground, Template Run, Batch và Design.",
  "kb_ids": [
    "KB-045"
  ],
  "related_questions": [
    "Task tạo trực tiếp qua POST /process bằng API key có xuất hiện trong Task History của portal không, và có hiển thị tên API key đã dùng không?",
    "Task tạo trực tiếp qua POST /process bằng API key có xuất hiện trong Task History không?"
  ],
  "check_ids": [
    "task-history-list:CHK-015"
  ]
}
```

## OQ-tasks-008 — CONFLICT

```json
{
  "oq_id": "OQ-tasks-008",
  "type": "CONFLICT",
  "feature_id": "task-detail-inspection",
  "summary": "Nhãn badge Post-processing khi bước post-processing lỗi mâu thuẫn trong cùng tài liệu Task History, cùng phạm vi staging: phần mô tả danh sách/header ghi Success/Error, phần mô tả task có bước lỗi ghi 'Failed'. Cần xác nhận nhãn thực tế ở danh sách và ở header trang chi tiết.",
  "kb_ids": [
    "KB-083",
    "KB-084"
  ],
  "side_a": "Badge Post-processing (cột danh sách và header trang chi tiết) mang nhãn Success/Error.",
  "side_b": "Task có bước post-processing lỗi hiện 'Status: Success' nhưng 'Post-processing: Failed'.",
  "conflict_group": "CONF-IGH-tasks-01",
  "related_questions": [
    "Nhãn badge Post-processing khi bước phụ lỗi là \"Error\" hay \"Failed\"?",
    "Khi một bước post-processing lỗi, badge Post-processing (cột danh sách và header trang chi tiết) hiển thị nhãn \"Error\" hay \"Failed\"? Tài liệu khảo sát ghi hai nhãn khác nhau ở hai đoạn."
  ],
  "check_ids": [
    "task-history-list:CHK-012"
  ]
}
```

## OQ-tasks-009 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-tasks-009",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "task-detail-inspection",
  "summary": "Nút Restore (cấp task và cấp từng bước trong Processing chain) làm gì: dùng lại ảnh làm input mới hay chạy lại từ bước đó; có tạo task mới hoặc trừ credit không? Tài liệu tự khai chưa bấm thử vì sợ side-effect.",
  "kb_ids": [
    "KB-051",
    "KB-056"
  ],
  "related_questions": [
    "Nút Restore (cấp task và cấp từng bước trong Processing chain) làm gì: khôi phục output về bước đó, chạy lại, hay nạp lại cấu hình? Có tạo task mới hoặc trừ credit không, và role nào được dùng?",
    "Nút Restore (cấp task và cấp từng bước) làm gì; có tạo task mới hoặc trừ credit không?"
  ],
  "check_ids": [
    "task-detail-inspection:CHK-013"
  ]
}
```

## OQ-tasks-010 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-tasks-010",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "task-detail-inspection",
  "summary": "Cột Code của bảng processing chain phản ánh tầng nào: task Error vẫn hiện Code 200 (người viết suy luận lỗi nằm trong body của provider), trong khi bước post-processing lỗi hiện Code 401. Cần xác nhận ngữ nghĩa cột Code trước khi dùng làm oracle.",
  "kb_ids": [
    "KB-060",
    "KB-061"
  ],
  "related_questions": [
    "Cột Code của bảng processing chain phản ánh mã HTTP từ provider hay kết quả xử lý? Danh sách đầy đủ giá trị Status của một bước là gì (đã thấy Success, Client Error)?",
    "Cột Code của bảng processing chain phản ánh tầng nào (HTTP hay kết quả provider)?"
  ],
  "check_ids": [
    "task-detail-inspection:CHK-007"
  ]
}
```

## OQ-tasks-011 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-tasks-011",
  "type": "OPEN_ISSUE",
  "feature_id": "task-detail-inspection",
  "summary": "Chưa biết task Error ở bước Generate (ví dụ bị content policy chặn) có bị tính credit không; tài liệu chỉ mô tả refund cho bước post-processing lỗi.",
  "kb_ids": [
    "KB-054",
    "KB-072"
  ],
  "related_questions": [
    "Task Error ở bước Generate (ví dụ bị content policy chặn) có bị tính credit không?"
  ]
}
```

## OQ-tasks-012 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-tasks-012",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": null,
  "summary": "Trên staging (2026-08-31), console ghi lỗi 401 ở /api/auth/me khi mở /tasks và /mcp. Request này là gì, có xuất hiện trên mọi trang portal không, và có ảnh hưởng chức năng nào không? Dùng làm điểm theo dõi hồi quy, không phải expected result; được ghi nhận là lỗi đã biết (quirk console), cần Dev xác nhận ảnh hưởng chức năng.",
  "kb_ids": [
    "KB-P-029",
    "KB-P-030",
    "KB-P-031"
  ],
  "scope_note": "Câu hỏi mức product (dùng chung nhiều object), đặt ở object này để theo dõi.",
  "related_questions": [
    "Request /api/auth/me trả 401 khi mở trang Task History (/tasks) và trang AI Assistant (/mcp) trên staging có phải hành vi mong muốn không? Nếu không, request này phải trả gì sau khi sửa, và lỗi này có ảnh hưởng chức năng nào của trang (phiên đăng nhập, refresh token) không?",
    "Giả thuyết của người khảo sát: request /api/auth/me trả 401 là một check phụ chạy nền (có thể liên quan refresh token) và không ảnh hưởng chức năng. Cần Dev xác nhận nguyên nhân và việc 401 ở đây là hành vi mong đợi hay không."
  ],
  "check_ids": [
    "task-history-list:CHK-017"
  ]
}
```

## OQ-tasks-013 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-tasks-013",
  "type": "OPEN_ISSUE",
  "feature_id": null,
  "summary": "Tài liệu về endpoint API của staging được link chéo nhưng không có trong bộ tài liệu. Base URL và danh sách endpoint trên staging (và mọi khác biệt so với production) chưa được mô tả; docs chính thức chỉ nêu base URL production.",
  "kb_ids": [
    "KB-P-016"
  ],
  "scope_note": "Câu hỏi mức product (dùng chung nhiều object), đặt ở object này để theo dõi."
}
```

## OQ-tasks-014 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-tasks-014",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "generate-request",
  "summary": "Khi field provider chỉ định một provider không hỗ trợ model, POST /process trả lỗi gì (422?) hay tự route sang provider hợp lệ?",
  "check_ids": [
    "generate-request:CHK-007"
  ],
  "related_questions": [
    "Hành vi khi field provider chỉ định một provider không hỗ trợ model đó?"
  ]
}
```

## OQ-tasks-015 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-tasks-015",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "generate-request",
  "summary": "POST /process với template_id không tồn tại hoặc template đã xoá trả 404 not_found hay 403 forbidden (docs chỉ nêu 403 cho template không truy cập được)?",
  "check_ids": [
    "generate-request:CHK-008"
  ]
}
```

## OQ-tasks-016 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-tasks-016",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "generate-request",
  "summary": "Response của POST /process trả những field nào (id task, trạng thái ban đầu, output khi xử lý đồng bộ?) và caller lấy id task ở field nào?",
  "check_ids": [
    "generate-request:CHK-009"
  ],
  "related_questions": [
    "Response của POST /process trả gì (task id, trạng thái ban đầu)?"
  ]
}
```

## OQ-tasks-017 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-tasks-017",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "task-status-and-output",
  "summary": "Khi task ở status error, GET /tasks/{id} trả lỗi ở field nào (tên, cấu trúc, mã lỗi), output là mảng rỗng hay null?",
  "check_ids": [
    "task-status-and-output:CHK-008"
  ],
  "related_questions": [
    "Cấu trúc field lỗi của task khi status là error?"
  ]
}
```

## OQ-tasks-018 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-tasks-018",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "task-status-and-output",
  "summary": "Đọc task của organization khác qua GET /tasks/{id} và /stream trả 403 hay 404, và có chắc chắn không lộ output/input không?",
  "check_ids": [
    "task-status-and-output:CHK-010"
  ]
}
```

## OQ-tasks-019 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-tasks-019",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "task-history-list",
  "summary": "Search của Task History khớp theo trường nào (model slug, tên hiển thị model, tên template, provider?), khớp một phần hay toàn bộ, có phân biệt hoa/thường không, và danh sách rỗng hiển thị gì?",
  "check_ids": [
    "task-history-list:CHK-007"
  ],
  "related_questions": [
    "Search \"by model or template\" khớp theo cách nào?"
  ]
}
```

## OQ-tasks-020 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-tasks-020",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "task-history-list",
  "summary": "Mở lại hoặc reload URL có query param filter của Task History có khôi phục đúng filter và danh sách đã lọc không?",
  "check_ids": [
    "task-history-list:CHK-011"
  ]
}
```

## OQ-tasks-021 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-tasks-021",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "task-history-list",
  "summary": "Task History hiển thị task của toàn organization cho mọi thành viên, hay mỗi người chỉ thấy task của mình? Có khác nhau theo role không?",
  "check_ids": [
    "task-history-list:CHK-016"
  ]
}
```

## OQ-tasks-022 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-tasks-022",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "task-detail-inspection",
  "summary": "Mở trang chi tiết task của organization khác bằng URL trực tiếp thì portal hiển thị gì (404, thông báo không có quyền, chuyển hướng), và có chắc chắn không lộ input, output, log không?",
  "check_ids": [
    "task-detail-inspection:CHK-014"
  ]
}
```

## OQ-tasks-023 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-tasks-023",
  "type": "OPEN_ISSUE",
  "feature_id": "task-status-and-output",
  "summary": "Docs chính thức quy định hạn URL thumbnail thế nào?"
}
```

## OQ-tasks-024 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-tasks-024",
  "type": "OPEN_ISSUE",
  "feature_id": "task-history-list",
  "summary": "Khi bước generate dùng BYOK, số credit post-processing thực bị trừ có khớp Est. Cost không?"
}
```

## OQ-tasks-025 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-tasks-025",
  "type": "OPEN_ISSUE",
  "feature_id": "task-detail-inspection",
  "summary": "Trang chi tiết thực tế hiển thị việc A fail và chuyển sang B (IGH-226) ra sao?"
}
```

## OQ-tasks-026 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-tasks-026",
  "type": "OPEN_ISSUE",
  "feature_id": "task-detail-inspection",
  "summary": "Danh sách đầy đủ giá trị Status của từng bước trong chain?"
}
```
