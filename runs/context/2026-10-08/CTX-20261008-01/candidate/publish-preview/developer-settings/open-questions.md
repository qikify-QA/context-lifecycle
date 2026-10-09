# Open Questions — Developer settings (nhóm 'Dev' trên sidebar) — API Keys, Provider Keys (BYOK), Webhooks, Alerts, AI Assistant (MCP)

Tổng: 32 mục. Sinh từ lần bootstrap đầu tiên (DOC_BOOTSTRAP) của ImagenHub, ngày 2026-10-08.

- CONFLICT: 1
- NEEDS_CONFIRMATION: 26
- OPEN_ISSUE: 5

## OQ-developer-settings-001 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-developer-settings-001",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": null,
  "summary": "Role cho object Developer settings chưa được xác định: tài liệu chỉ nói quyền quản lý API keys thuộc Owner/Admin (Editor/Viewer không có quyền) trong ma trận quyền của Organization; quyền theo role cho Provider Keys (BYOK), Webhooks, Alerts và AI Assistant (MCP) không được mô tả. Cần xác nhận role nào được xem/tạo/xoá/sửa ở từng trang."
}
```

## OQ-developer-settings-002 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-developer-settings-002",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": null,
  "summary": "Rotate signing secret chưa được test (bị chặn để tránh phá xác minh chữ ký hiện tại) và docs chỉ ghi header `webhook-signature` \"có thể\" chứa nhiều chữ ký khi đang rotate. Cần xác nhận: rotate làm gì trên portal, khoảng thời gian chữ ký cũ còn hợp lệ, và định dạng nhiều chữ ký.",
  "kb_ids": [
    "KB-079",
    "KB-078"
  ],
  "related_questions": [
    "Rotate signing secret trên portal làm gì, chữ ký theo secret cũ còn được gửi kèm trong bao lâu, và định dạng nhiều chữ ký trong `webhook-signature` là gì?"
  ],
  "check_ids": [
    "task-webhooks:CHK-015"
  ]
}
```

## OQ-developer-settings-003 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-developer-settings-003",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "api-keys",
  "summary": "Thiếu tài liệu chi tiết trang API Keys và Provider Keys (được link nhưng không có trên Testlane): chưa có mô tả form tạo key (field, validation), cột hiển thị/mask, luồng xoá/revoke (có confirm không), hành vi khi key chạm Credit Limit hoặc hết Expiration, danh sách provider BYOK hỗ trợ và ý nghĩa trạng thái \"healthy\". Không suy diễn UI; cần bổ sung tài liệu hoặc khảo sát lại.",
  "kb_ids": [
    "KB-002",
    "KB-003",
    "KB-004",
    "KB-007",
    "KB-026"
  ],
  "related_questions": [
    "Trang API Keys hiển thị gì: danh sách key, các cột, cách che (mask) giá trị key?",
    "Form tạo key có những field nào, field nào bắt buộc, validate gì (ví dụ giá trị Credit Limit, ngày Expiration trong quá khứ)?",
    "Khi key chạm Credit Limit hoặc quá Expiration thì request bị xử lý thế nào (mã lỗi, thông báo)?",
    "Form tạo API key có những field nào, field nào bắt buộc và quy tắc validate cho Credit Limit, Expiration là gì?",
    "Trang Provider Keys trên portal: form nhập key, provider nào được hỗ trợ, cách hiển thị masked, luồng xoá, trạng thái \"healthy\" nghĩa là gì?"
  ],
  "check_ids": [
    "api-keys:CHK-010"
  ]
}
```

## OQ-developer-settings-004 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-developer-settings-004",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "provider-keys-byok",
  "summary": "Mâu thuẫn trong ghi chép khảo sát staging: tài liệu ghi \"đã verify tạo/xoá thật cả 2\" (API Keys và Provider Keys) nhưng bảng hành động chưa test lại có \"Submit Provider Key thật — không có key thật để test\". Cần xác nhận thao tác tạo provider key và quan sát \"ghi đè, không tạo dòng mới\" đã được thực hiện với key hợp lệ hay với key giả, và hệ thống có validate key với provider lúc lưu không.",
  "kb_ids": [
    "KB-026",
    "KB-027"
  ],
  "related_questions": [
    "Hệ thống có kiểm tra key với provider lúc lưu không; lưu key sai định dạng hoặc key không hợp lệ thì phản hồi thế nào?"
  ]
}
```

## OQ-developer-settings-005 — CONFLICT

```json
{
  "oq_id": "OQ-developer-settings-005",
  "type": "CONFLICT",
  "feature_id": "provider-keys-byok",
  "summary": "Đơn vị sở hữu/duy nhất của provider key (BYOK) chưa thống nhất trong docs chính thức: §BYOK ghi \"1 key/user/provider\" trong khi §Organization ghi Organization sở hữu mọi thứ (template, media, credit, key). Cần xác nhận provider key thuộc user hay organization, và quy tắc \"ghi đè key cũ\" áp theo user hay theo org.",
  "kb_ids": [
    "KB-017",
    "KB-018"
  ],
  "side_a": "Theo docs chính thức §BYOK: mỗi user chỉ có 1 key cho mỗi provider; key mới ghi đè key cũ.",
  "side_b": "Theo docs chính thức §Organization: Organization là đơn vị sở hữu mọi thứ, gồm template, media, credit, key.",
  "conflict_group": "CONF-IGH-developer-settings-01",
  "related_questions": [
    "Provider key thuộc về user hay organization? Docs ghi '1 key cho mỗi user mỗi provider' ở mục BYOK nhưng ghi Organization sở hữu mọi thứ kể cả key ở mục Organization. Quy tắc ghi đè áp theo user hay theo org; thành viên khác có thấy/dùng key của nhau không?",
    "Provider key thuộc user hay organization; quy tắc ghi đè áp theo user hay theo org?"
  ],
  "check_ids": [
    "provider-keys-byok:CHK-006"
  ]
}
```

## OQ-developer-settings-006 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-developer-settings-006",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "provider-keys-byok",
  "summary": "Docs chính thức §Rate Limits & Credits ghi với BYOK \"credit ImagenHub vẫn có thể trừ tuỳ plan\" nhưng không nêu plan nào; quan sát staging thấy task dùng BYOK hiển thị \"Your key\" và không trừ credit. Cần PO xác nhận plan nào BYOK vẫn trừ credit và mức trừ (topic billing, không tự resolve). Kèm câu hỏi: khi Fail-Safe chuyển sang key hệ thống thì có trừ credit ImagenHub không.",
  "kb_ids": [
    "KB-023",
    "KB-025",
    "KB-020",
    "KB-022"
  ],
  "related_questions": [
    "Plan nào khiến BYOK vẫn trừ credit ImagenHub và mức trừ là bao nhiêu? Docs ghi 'có thể trừ tuỳ plan' nhưng không nêu plan, còn hiện trạng staging thấy task BYOK không bị trừ credit.",
    "Khi Fail-Safe chuyển sang key hệ thống của ImagenHub, credit ImagenHub có bị trừ không và Task history hiển thị gì ở cột Est. Cost?",
    "Plan nào khiến BYOK vẫn trừ credit ImagenHub, và mức trừ?",
    "Khi Fail-Safe chuyển sang key hệ thống thì có trừ credit ImagenHub không?"
  ],
  "check_ids": [
    "provider-keys-byok:CHK-012",
    "provider-keys-byok:CHK-014"
  ]
}
```

## OQ-developer-settings-007 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-developer-settings-007",
  "type": "OPEN_ISSUE",
  "feature_id": "task-webhooks",
  "summary": "Thiếu tài liệu chi tiết trang Webhooks và Alerts (được link nhưng không có trên Testlane): chưa có mô tả form/field channel, chọn event, signing secret, delivery board, luồng tạo/xoá channel; chưa rõ \"channel\" tạo/xoá trên staging thuộc trang Webhooks hay Alerts; docs cũng không nói rõ các quy tắc ở §Delivery (retry 6 lần, timeout 10 giây, chỉ 2xx, at-least-once) có áp cho alert channel loại HTTP hay chỉ cho task callback. Không suy diễn UI.",
  "kb_ids": [
    "KB-029",
    "KB-036",
    "KB-042",
    "KB-044",
    "KB-059",
    "KB-081"
  ],
  "related_questions": [
    "Trang Webhooks trên portal có những gì: form, validate default webhook URL, cách hiển thị signing secret, bảng delivery chi tiết?",
    "\"Channel\" có thao tác tạo/xoá trên staging thuộc trang Webhooks hay trang Alerts?",
    "\"Channel\" có thao tác tạo/xoá trên staging thuộc trang Alerts hay trang Webhooks?"
  ]
}
```

## OQ-developer-settings-008 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-developer-settings-008",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "task-webhooks",
  "summary": "Payload task callback trong docs chỉ là mẫu: cần danh sách đầy đủ giá trị `type` (ngoài task.succeeded/task.failed), kiểu dữ liệu và giá trị hợp lệ của từng field trong `data` (status, post_processing_status, output, cấu trúc error).",
  "kb_ids": [
    "KB-032",
    "KB-033"
  ],
  "related_questions": [
    "Danh sách đầy đủ giá trị `type` của task callback là gì (ngoài task.succeeded/task.failed), và kiểu dữ liệu, giá trị hợp lệ của `status`, `post_processing_status`, `output`, `error` trong `data`? Task thất bại có callback không?",
    "Danh sách đầy đủ giá trị `type`, kiểu và giá trị hợp lệ của từng field trong `data` (status, post_processing_status, output, cấu trúc error)?"
  ],
  "check_ids": [
    "task-webhooks:CHK-013"
  ]
}
```

## OQ-developer-settings-009 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-developer-settings-009",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "mcp-server",
  "summary": "Endpoint MCP lệch giữa môi trường: docs chính thức ghi production là `https://api.imagenhub.ai/mcp/imagenhub`, còn trên staging (khảo sát 2026-08-30) là `https://staging-api.imagenhub.ai/mcp` (không có hậu tố). Hai phạm vi khác nhau nên không coi là conflict; cần xác nhận path staging ngắn hơn là chủ đích và path production hiện hành vẫn đúng như docs.",
  "kb_ids": [
    "KB-064",
    "KB-072"
  ],
  "related_questions": [
    "Endpoint staging ngắn hơn (không có `/imagenhub`) là chủ đích, và endpoint production hiện hành có đúng như docs không?",
    "Method, transport và cách xác thực của endpoint MCP staging?"
  ]
}
```

## OQ-developer-settings-010 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-developer-settings-010",
  "type": "OPEN_ISSUE",
  "feature_id": "mcp-server",
  "summary": "Thiếu tài liệu chi tiết trang AI Assistant (MCP) (được link nhưng không có trên Testlane): chưa biết tên/nội dung 3 tab, cách portal hiển thị cấu hình kết nối và endpoint, cách chọn API key cho MCP client. Không suy diễn UI.",
  "kb_ids": [
    "KB-071"
  ],
  "related_questions": [
    "Ba tab của trang AI Assistant (MCP) tên là gì, hiển thị cấu hình kết nối và endpoint ra sao, chọn API key cho MCP client thế nào?"
  ]
}
```

## OQ-developer-settings-011 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-developer-settings-011",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": null,
  "summary": "Mục \"API Reference — endpoint map đầy đủ\" của docs chính thức không liệt kê nhóm /auth/* (login, refresh, OAuth) lẫn /provider-keys và các endpoint management dùng JWT (tạo template, quản lý API key/account) dù các mục Authentication và BYOK có nhắc tới. Danh sách endpoint đầy đủ (kể cả nhóm dùng JWT) là gì, và các endpoint đó có theo cùng envelope {data, meta} và bảng lỗi chuẩn không?",
  "kb_ids": [
    "KB-P-011",
    "KB-P-012",
    "KB-P-013",
    "KB-P-014",
    "KB-P-017"
  ],
  "scope_note": "Câu hỏi mức product (dùng chung nhiều object), đặt ở object này để theo dõi."
}
```

## OQ-developer-settings-012 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-developer-settings-012",
  "type": "OPEN_ISSUE",
  "feature_id": null,
  "summary": "Tài liệu không nêu: method HTTP của route OAuth callback /auth/{provider}/callback, các provider OAuth được hỗ trợ, thời hạn của JWT/refresh token và response khi refresh token hết hạn. Không có expected result để test các nhánh này.",
  "kb_ids": [
    "KB-P-012",
    "KB-P-013",
    "KB-P-014"
  ],
  "scope_note": "Câu hỏi mức product (dùng chung nhiều object), đặt ở object này để theo dõi."
}
```

## OQ-developer-settings-013 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-developer-settings-013",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "api-keys",
  "summary": "Khi API key chạm Credit Limit đã đặt lúc tạo, request tiếp theo bị xử lý thế nào (mã HTTP, type lỗi, có trừ credit không)? Tài liệu chỉ nói Credit Limit là tuỳ chọn khi tạo key.",
  "check_ids": [
    "api-keys:CHK-008"
  ]
}
```

## OQ-developer-settings-014 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-developer-settings-014",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "api-keys",
  "summary": "Khi API key đã quá Expiration, request dùng key đó nhận kết quả gì (mã HTTP, type lỗi) và portal hiển thị key đó thế nào?",
  "check_ids": [
    "api-keys:CHK-009"
  ]
}
```

## OQ-developer-settings-015 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-developer-settings-015",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "api-keys",
  "summary": "Sau khi xoá API key, request dùng key đó nhận kết quả gì và hiệu lực từ lúc nào; có thao tác thu hồi tạm khác với xoá không; xoá có hộp xác nhận không?",
  "check_ids": [
    "api-keys:CHK-012"
  ],
  "related_questions": [
    "Xoá key có hộp xác nhận không; sau khi xoá, request dùng key đó nhận kết quả gì; có thu hồi tạm (revoke) khác với xoá không?"
  ]
}
```

## OQ-developer-settings-016 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-developer-settings-016",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "api-keys",
  "summary": "Role nào (Owner, Admin, Editor, Viewer) được xem, tạo, sửa, xoá ở trang API Keys? Tài liệu nhóm trang Dev không gán role cho các thao tác này. Ma trận quyền ở phần phân quyền tổ chức ghi Owner/Admin quản lý API keys, Editor/Viewer không có quyền; cần xác nhận đây là quy tắc áp cho trang này.",
  "check_ids": [
    "api-keys:CHK-015"
  ],
  "related_questions": [
    "Role nào (Owner, Admin, Editor, Viewer) được xem, tạo, sửa, xoá ở từng trang của nhóm Dev trên portal?"
  ]
}
```

## OQ-developer-settings-017 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-developer-settings-017",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "api-keys",
  "summary": "Khi API key của org A đọc task của org B, hệ thống trả 403 `forbidden` hay 404 `not_found`? Danh sách task có được lọc tuyệt đối theo org của key không?",
  "check_ids": [
    "api-keys:CHK-016"
  ]
}
```

## OQ-developer-settings-018 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-developer-settings-018",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "provider-keys-byok",
  "summary": "Sau khi xoá mềm provider key: key còn hiển thị trong danh sách không, có khôi phục được không, và generation kế tiếp có chuyển sang key hệ thống + trừ credit ImagenHub không?",
  "check_ids": [
    "provider-keys-byok:CHK-008"
  ],
  "related_questions": [
    "Có lấy lại hoặc khôi phục được provider key đã xoá mềm không?"
  ]
}
```

## OQ-developer-settings-019 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-developer-settings-019",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "provider-keys-byok",
  "summary": "Field nào của `POST /provider-keys` là bắt buộc, lỗi validate trả mã gì, và hệ thống có kiểm tra key với provider lúc lưu không?",
  "check_ids": [
    "provider-keys-byok:CHK-015"
  ]
}
```

## OQ-developer-settings-020 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-developer-settings-020",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "provider-keys-byok",
  "summary": "Role nào (Owner, Admin, Editor, Viewer) được xem, tạo, sửa, xoá ở trang Provider Keys (BYOK)? Tài liệu nhóm trang Dev không gán role cho các thao tác này. Ngoài ra, khi JWT của org A thao tác lên provider key của org B thì hệ thống trả gì?",
  "check_ids": [
    "provider-keys-byok:CHK-017"
  ],
  "related_questions": [
    "Role nào (Owner, Admin, Editor, Viewer) được xem, tạo, sửa, xoá ở từng trang của nhóm Dev trên portal?"
  ]
}
```

## OQ-developer-settings-021 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-developer-settings-021",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "task-webhooks",
  "summary": "Sau khi hết 6 lần gửi mà vẫn không delivered, delivery được ghi nhận thế nào, người dùng thấy gì và có gửi lại thủ công được không?",
  "check_ids": [
    "task-webhooks:CHK-011"
  ],
  "related_questions": [
    "Sau khi hết 6 lần gửi mà vẫn không delivered thì delivery được ghi nhận thế nào và người dùng thấy gì?"
  ]
}
```

## OQ-developer-settings-022 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-developer-settings-022",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "task-webhooks",
  "summary": "Trang Webhooks validate default webhook URL thế nào (bắt buộc https, định dạng, độ dài)?",
  "check_ids": [
    "task-webhooks:CHK-016"
  ]
}
```

## OQ-developer-settings-023 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-developer-settings-023",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "task-webhooks",
  "summary": "Role nào (Owner, Admin, Editor, Viewer) được xem, tạo, sửa, xoá ở trang Webhooks? Tài liệu nhóm trang Dev không gán role cho các thao tác này. Đặc biệt: role nào được xem signing secret?",
  "check_ids": [
    "task-webhooks:CHK-017"
  ],
  "related_questions": [
    "Role nào (Owner, Admin, Editor, Viewer) được xem, tạo, sửa, xoá ở từng trang của nhóm Dev trên portal?"
  ]
}
```

## OQ-developer-settings-024 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-developer-settings-024",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "account-alerts",
  "summary": "Khi tạo channel thứ 11, thêm header thứ 11, hoặc khai custom header trùng tên header hệ thống, portal từ chối với thông báo gì hay âm thầm bỏ qua?",
  "check_ids": [
    "account-alerts:CHK-005"
  ],
  "related_questions": [
    "Nhập custom header trùng tên header hệ thống thì bị từ chối hay bị bỏ qua?",
    "Thêm channel thứ 11 hoặc header thứ 11 thì portal phản hồi thế nào?"
  ],
  "kb_ids": [
    "KB-044",
    "KB-059"
  ]
}
```

## OQ-developer-settings-025 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-developer-settings-025",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "account-alerts",
  "summary": "Lịch retry 6 lần, chỉ 2xx mới tính delivered, timeout 10 giây và at-least-once mô tả ở phần giao nhận webhook có áp cho channel HTTP của account alert không, hay chỉ cho task callback?",
  "check_ids": [
    "account-alerts:CHK-018"
  ],
  "related_questions": [
    "Lịch retry 6 lần, chỉ 2xx, timeout 10 giây, at-least-once có áp cho channel HTTP của alert không, hay chỉ cho task callback?"
  ]
}
```

## OQ-developer-settings-026 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-developer-settings-026",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "account-alerts",
  "summary": "Message card Lark 'chỉnh sửa được' nghĩa là người dùng chỉnh mẫu ở đâu, trong giới hạn nào?",
  "check_ids": [
    "account-alerts:CHK-019"
  ]
}
```

## OQ-developer-settings-027 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-developer-settings-027",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "account-alerts",
  "summary": "Role nào (Owner, Admin, Editor, Viewer) được xem, tạo, sửa, xoá ở trang Alerts? Tài liệu nhóm trang Dev không gán role cho các thao tác này.",
  "check_ids": [
    "account-alerts:CHK-021"
  ],
  "related_questions": [
    "Role nào (Owner, Admin, Editor, Viewer) được xem, tạo, sửa, xoá ở từng trang của nhóm Dev trên portal?"
  ]
}
```

## OQ-developer-settings-028 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-developer-settings-028",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "mcp-server",
  "summary": "Khi API key sai, hết hạn hoặc account hết credit, tool MCP trả lỗi thế nào; `get-task` trả gì khi task thất bại?",
  "check_ids": [
    "mcp-server:CHK-009"
  ],
  "related_questions": [
    "Khi API key sai, hết hạn hoặc hết credit, tool MCP trả lỗi thế nào; tool `get-task` trả gì khi task lỗi?"
  ]
}
```

## OQ-developer-settings-029 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-developer-settings-029",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "mcp-server",
  "summary": "Tham số đầu vào, field bắt buộc và cấu trúc kết quả của từng tool MCP là gì?",
  "check_ids": [
    "mcp-server:CHK-010"
  ],
  "related_questions": [
    "Tham số đầu vào và cấu trúc kết quả của từng tool là gì?"
  ]
}
```

## OQ-developer-settings-030 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-developer-settings-030",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "mcp-server",
  "summary": "Role nào (Owner, Admin, Editor, Viewer) được xem, tạo, sửa, xoá ở trang AI Assistant (MCP)? Tài liệu nhóm trang Dev không gán role cho các thao tác này. Ngoài ra, tool MCP dùng API key của org A đọc task của org B thì trả gì?",
  "check_ids": [
    "mcp-server:CHK-013"
  ],
  "related_questions": [
    "Role nào (Owner, Admin, Editor, Viewer) được xem, tạo, sửa, xoá ở từng trang của nhóm Dev trên portal?"
  ]
}
```

## OQ-developer-settings-031 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-developer-settings-031",
  "type": "OPEN_ISSUE",
  "feature_id": "task-webhooks",
  "summary": "Rotate signing secret trên portal làm gì, chữ ký cũ còn hợp lệ bao lâu, định dạng nhiều chữ ký ra sao?",
  "kb_ids": [
    "KB-079",
    "KB-078"
  ]
}
```

## OQ-developer-settings-032 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-developer-settings-032",
  "type": "OPEN_ISSUE",
  "feature_id": "account-alerts",
  "summary": "Trang Alerts trên portal có những gì: form tạo channel HTTP/Lark, nhập custom header, tick event, nút Test, sửa và xoá channel?",
  "kb_ids": [
    "KB-044",
    "KB-045"
  ]
}
```
