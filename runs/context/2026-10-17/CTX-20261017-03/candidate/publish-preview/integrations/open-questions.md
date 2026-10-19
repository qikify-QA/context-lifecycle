# Open Questions — integrations

Tổng: 34 mục (CONFLICT 1 · OPEN_ISSUE 19 · NEEDS_CONFIRMATION 14). Sinh từ bootstrap DOC_BOOTSTRAP đầu tiên của Mysbox (nguồn: bộ Product KB v1 do dev viết từ source code, 2026-10-16); REFRESH trên staging 2026-10-17 thêm mục mới, ghi `staging_observation` (OBSERVED_CURRENT, không resolve NEEDS_CONFIRMATION/CONFLICT) và gỡ OPEN_ISSUE đã được quan sát trả lời (xem CHANGELOG). Mỗi mục là một khối json; `kb_ids` dạng `<feature_key>#KB-xxx` (hoặc `_object-level#KB-xxx` cho tầng object), `check_ids` dạng `<feature_key>:CHK-xxx`.

## OQ-integrations-001 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-integrations-001",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": null,
  "summary": "Bộ tài liệu nguồn không chỉ định role mặc định cho object này (bootstrap-request để role null): các KB item mang scope.role theo vai trò tài liệu nêu cho từng hành vi, hoặc \"unspecified\" khi tài liệu không nêu. Cần PO/Dev xác nhận ma trận role → quyền thực tế trên production (merchant owner/staff, khách, admin Mysbox theo từng role) trước khi dùng các check PERMISSION làm oracle."
}
```

## OQ-integrations-002 — CONFLICT

```json
{
  "oq_id": "OQ-integrations-002",
  "type": "CONFLICT",
  "feature_id": "webhook-ingestion",
  "summary": "Các tài liệu dev Mysbox Product KB v1 liệt kê khác nhau tập topic webhook Shopify mà app nhận: ba sự kiện, bốn webhook, hay bốn topic cộng ba topic compliance. Cần chủ sở hữu xác nhận danh sách topic thực sự đăng ký (đặc biệt bulk_operations/finish và các topic dữ liệu cá nhân).",
  "side_a": "Tài liệu \"Huỷ đơn và refund từ Shopify\" §App lắng nghe gì và \"Chu kỳ billing, job tạo phí và trạng thái Charge\" §Trạng thái Charge: app chỉ nhận ba sự kiện orders/paid, app/uninstalled, shop/update.",
  "side_b": "Tài liệu \"Webhook mà app nhận\" §Topic nào, làm gì và §Câu hỏi thường gặp: cấu hình app đăng ký app/uninstalled, shop/update, orders/paid, bulk_operations/finish cùng ba topic compliance, bulk_operations/finish có trong cấu hình staging và production; tài liệu \"Tạo box và vòng đời Draft / Active\" §Bước 4 — App tạo/đổi gì trong Shopify: chỉ có bốn webhook uninstall, shop update, orders paid, bulk finish (không nêu topic compliance).",
  "conflict_group": "CONF-integrations-01",
  "kb_ids": [
    "webhook-ingestion#KB-002",
    "webhook-ingestion#KB-003",
    "webhook-ingestion#KB-004",
    "webhook-ingestion#KB-005"
  ],
  "check_ids": [
    "webhook-ingestion:CHK-013",
    "webhook-ingestion:CHK-017"
  ]
}
```

## OQ-integrations-003 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-integrations-003",
  "type": "OPEN_ISSUE",
  "feature_id": "request-authentication",
  "summary": "Endpoint POST api/shopify-app/review (nhận review App Store từ ngoài) không có xác thực phía trước theo tài liệu dev. Cần xác nhận đây là lỗ hổng đã biết hay thiết kế có chủ đích, và có cơ chế chống lạm dụng nào (giới hạn, kiểm nguồn) không; không dùng làm oracle hành vi đúng.",
  "kb_ids": [
    "request-authentication#KB-015"
  ],
  "check_ids": [
    "request-authentication:CHK-013"
  ]
}
```

## OQ-integrations-004 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-integrations-004",
  "type": "OPEN_ISSUE",
  "feature_id": "request-authentication",
  "summary": "Session token của portal nhúng có thời hạn bao lâu, và Mysbox trả mã lỗi / redirect gì khi token sai chữ ký, hết hạn, hoặc shop chưa cài app / không có quyền? — Thiếu oracle cho các case negative của portal nhúng (status code, redirect).",
  "kb_ids": [
    "request-authentication#KB-006",
    "request-authentication#KB-008",
    "request-authentication#KB-009"
  ]
}
```

## OQ-integrations-005 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-integrations-005",
  "type": "OPEN_ISSUE",
  "feature_id": "request-authentication",
  "summary": "Request từ extension cho đơn không tồn tại ở Shopify nhận phản hồi gì? — Tài liệu chỉ nói Mysbox xác nhận đơn tồn tại trước khi trả dữ liệu, không nêu phản hồi khi không tồn tại.",
  "kb_ids": [
    "request-authentication#KB-014"
  ]
}
```

## OQ-integrations-006 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-integrations-006",
  "type": "OPEN_ISSUE",
  "feature_id": "request-authentication",
  "summary": "Khi Shopify Flow vượt giới hạn tần suất gọi theo shop, Mysbox phản hồi thế nào (status code, xếp hàng hay bỏ)? — Cần oracle cho case rate limit; giới hạn được mô tả ở feature Shopify Flow actions, phản hồi khi vượt chưa được tài liệu nêu.",
  "kb_ids": [
    "request-authentication#KB-010"
  ]
}
```

## OQ-integrations-007 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-integrations-007",
  "type": "OPEN_ISSUE",
  "feature_id": "request-authentication",
  "summary": "Lời gọi API từ banner 'Unbox alert' (lấy số box chưa mở) xác thực bằng cơ chế nào? — Tài liệu chỉ nêu xác thực bằng tên shop cho block trang cảm ơn / trạng thái đơn.",
  "kb_ids": [
    "request-authentication#KB-013"
  ]
}
```

## OQ-integrations-008 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-integrations-008",
  "type": "OPEN_ISSUE",
  "feature_id": "request-authentication",
  "summary": "HTTP status, field kỹ thuật và cơ chế xác thực của POST api/affiliate/tracking-id và POST api/affiliate/customers là gì? — Không kiểm được contract API và negative auth của hai endpoint này."
}
```

## OQ-integrations-009 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-integrations-009",
  "type": "OPEN_ISSUE",
  "feature_id": "request-authentication",
  "summary": "Request từ trang đơn hàng của khách được xác thực bằng cơ chế nào? — Đây là một loại client được liệt kê nhưng shard này không có rule xác thực cho nó; có thể thuộc profile khác — cần xác nhận để không bỏ sót coverage.",
  "kb_ids": [
    "request-authentication#KB-001"
  ],
  "staging_observation": "Ghi chú quan sát staging cho OQ-integrations-009: 2026-10-17: Trang khách gửi header customer-token + customer-id qua app proxy (không JWT; ?parameters= không gửi lại lên API); block trang cảm ơn chỉ gửi query shop. Cách server kiểm và chữ ký app proxy không quan sát được từ trình duyệt.",
  "staging_observation_kb_ids": [
    "request-authentication#KB-017",
    "request-authentication#KB-018"
  ],
  "status_note": "Quan sát staging chỉ là OBSERVED_CURRENT; mục vẫn mở (câu hỏi chưa được trả lời đủ, hoặc cần nguồn thẩm quyền)."
}
```

## OQ-integrations-010 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-integrations-010",
  "type": "OPEN_ISSUE",
  "feature_id": "webhook-ingestion",
  "summary": "Khi bộ xử lý webhook ném lỗi lúc xếp việc, lỗi bị nuốt và Shopify nhận 204 nên không gửi lại; đơn đã trả có thể không có trong Mysbox. Đây là lỗi đã biết theo tài liệu dev: cần xác nhận có kế hoạch sửa không và hành vi mong đợi (trả mã lỗi để Shopify gửi lại?). Mục này là regression watch, không phải oracle.",
  "kb_ids": [
    "webhook-ingestion#KB-032"
  ],
  "check_ids": [
    "webhook-ingestion:CHK-019"
  ]
}
```

## OQ-integrations-011 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-integrations-011",
  "type": "OPEN_ISSUE",
  "feature_id": "webhook-ingestion",
  "summary": "Job webhook đã xếp hàng mà thất bại (vd orders/paid) không tự thử lại và phải chạy lại thủ công. Lỗi đã biết theo tài liệu dev: cần xác nhận có kế hoạch thêm retry tự động không và hành vi mong đợi.",
  "kb_ids": [
    "webhook-ingestion#KB-034"
  ],
  "check_ids": [
    "webhook-ingestion:CHK-020"
  ]
}
```

## OQ-integrations-012 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-integrations-012",
  "type": "OPEN_ISSUE",
  "feature_id": "webhook-ingestion",
  "summary": "Đơn từ POS hoặc kênh bán khác không gửi thông báo \"đơn đã trả\" chuẩn nên có thể không có đơn/box trong Mysbox. Cần xác nhận phạm vi kênh bị ảnh hưởng và hành vi mong đợi (vd dùng action Shopify Flow cho kênh bán khác).",
  "kb_ids": [
    "webhook-ingestion#KB-042"
  ],
  "check_ids": [
    "webhook-ingestion:CHK-021"
  ]
}
```

## OQ-integrations-013 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-integrations-013",
  "type": "OPEN_ISSUE",
  "feature_id": "webhook-ingestion",
  "summary": "Webhook qua EventBridge có X-Api-Key chưa cấu hình bị từ chối với status code nào? — Tài liệu chỉ nói 'từ chối tất cả', không có mã.",
  "kb_ids": [
    "webhook-ingestion#KB-015"
  ]
}
```

## OQ-integrations-014 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-integrations-014",
  "type": "OPEN_ISSUE",
  "feature_id": "webhook-ingestion",
  "summary": "Bước 'kiểm hợp lệ' của bộ nhận chung gồm những gì ngoài HMAC / X-Api-Key? — Phạm vi kiểm tra không rõ, không thiết kế được case biên.",
  "kb_ids": [
    "webhook-ingestion#KB-017"
  ]
}
```

## OQ-integrations-015 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-integrations-015",
  "type": "OPEN_ISSUE",
  "feature_id": "webhook-ingestion",
  "summary": "Quy tắc chuẩn hoá tên topic là gì (vd khác biệt tên topic giữa HTTP và EventBridge)? — Không kiểm được topic nào được nhận dạng sau chuẩn hoá.",
  "kb_ids": [
    "webhook-ingestion#KB-018"
  ]
}
```

## OQ-integrations-016 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-integrations-016",
  "type": "OPEN_ISSUE",
  "feature_id": "webhook-ingestion",
  "summary": "'Dọn dữ liệu liên quan' khi nhận app/uninstalled gồm dữ liệu nào? — Tài liệu chỉ nói box/đơn được giữ lại; không biết dữ liệu nào bị xoá để kiểm.",
  "kb_ids": [
    "webhook-ingestion#KB-025"
  ]
}
```

## OQ-integrations-017 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-integrations-017",
  "type": "OPEN_ISSUE",
  "feature_id": "webhook-ingestion",
  "summary": "'Thử lại tối đa 3 lần' của shop/update nghĩa là gì (job retry hay chống trùng), và shop/update có chống xử lý trùng không? — Giá trị nằm trong cột chống trùng nhưng mô tả retry; không suy được hành vi khi giao trùng.",
  "kb_ids": [
    "webhook-ingestion#KB-026"
  ]
}
```

## OQ-integrations-018 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-integrations-018",
  "type": "OPEN_ISSUE",
  "feature_id": "webhook-ingestion",
  "summary": "Khoá chống trùng (đơn + event id) và (mã tác vụ + event id) tồn tại bao lâu? — Giao trùng sau thời hạn khoá có thể bị xử lý lại; tài liệu không nêu thời hạn.",
  "kb_ids": [
    "webhook-ingestion#KB-023",
    "webhook-ingestion#KB-029"
  ]
}
```

## OQ-integrations-019 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-integrations-019",
  "type": "OPEN_ISSUE",
  "feature_id": "webhook-ingestion",
  "summary": "Thời gian chờ khoá đơn của orders/paid được quy định là bao nhiêu? — Giá trị duy nhất trong tài liệu chỉ là ví dụ; không dùng được làm boundary.",
  "kb_ids": [
    "webhook-ingestion#KB-024",
    "webhook-ingestion#KB-036"
  ]
}
```

## OQ-integrations-020 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-integrations-020",
  "type": "OPEN_ISSUE",
  "feature_id": "webhook-ingestion",
  "summary": "Lịch gửi lại của Shopify khi nhận 401 (số lần, khoảng cách) là gì? — Thuộc Shopify; tài liệu chỉ nói 'theo lịch của Shopify', cần biết để quan sát retry khi test.",
  "kb_ids": [
    "webhook-ingestion#KB-009"
  ]
}
```

## OQ-integrations-021 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-integrations-021",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "request-authentication",
  "summary": "Các check P1 (tiền / billing / bốc thăm / refund / store credit / permission / xoá dữ liệu) của feature này có oracle STRONG nhưng chỉ dựa trên tài liệu dev (dev_doc). Theo luật oracle, chúng giữ NEEDS_CONFIRMATION cho tới khi có test_case PASS (hoặc PO/Dev xác nhận trực tiếp) cho đúng hành vi. Danh sách check ở check_ids.",
  "check_ids": [
    "request-authentication:CHK-001",
    "request-authentication:CHK-003",
    "request-authentication:CHK-005",
    "request-authentication:CHK-006",
    "request-authentication:CHK-007",
    "request-authentication:CHK-008",
    "request-authentication:CHK-010",
    "request-authentication:CHK-011"
  ],
  "staging_observation": "Ghi chú quan sát staging cho OQ-integrations-021: 2026-10-17: CHK-001 một phần: GET /api/boxes với Bearer hợp lệ → 200. CHK-010: block trang cảm ơn thành công chỉ với tham số shop, response {customer_id, token}. Các nhánh token sai/thiếu, uninstall, multi-shop, Flow: không làm.",
  "staging_observation_kb_ids": [
    "request-authentication#KB-016",
    "request-authentication#KB-018"
  ],
  "status_note": "Quan sát staging chỉ là OBSERVED_CURRENT; vẫn cần PO/Dev xác nhận, chưa resolve."
}
```

## OQ-integrations-022 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-integrations-022",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "request-authentication",
  "summary": "Request gọi Mysbox API của portal nhúng mà không kèm session token thì bị xử lý thế nào (bị chặn với mã lỗi nào, hay redirect về Shopify)?",
  "check_ids": [
    "request-authentication:CHK-004"
  ]
}
```

## OQ-integrations-023 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-integrations-023",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "request-authentication",
  "summary": "Khi Shopify Flow gọi action của Mysbox vượt giới hạn tần suất theo shop, Mysbox phản hồi thế nào (mã trạng thái nào, request bị xếp hàng hay bị bỏ)?",
  "check_ids": [
    "request-authentication:CHK-009"
  ]
}
```

## OQ-integrations-024 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-integrations-024",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "request-authentication",
  "summary": "Khi request từ extension (không ký) mang tên một shop nhưng mã đơn thuộc shop khác, Mysbox có kiểm đơn thuộc đúng shop đó không, và phản hồi thế nào?",
  "check_ids": [
    "request-authentication:CHK-012"
  ]
}
```

## OQ-integrations-025 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-integrations-025",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "webhook-ingestion",
  "summary": "Tài liệu nói webhook cho đơn test vẫn được nhận nhưng tự khai chưa xác nhận chi tiết. Cần xác nhận đơn test có được xử lý như đơn thật không (tạo yêu cầu mở box, rút thăm, ghi usage).",
  "kb_ids": [
    "webhook-ingestion#KB-041"
  ],
  "staging_observation": "Ghi chú quan sát staging cho OQ-integrations-025: 2026-10-17: Đơn test Bogus được tạo đơn Mysbox, bốc thăm, mở được (như đơn thật); Box sales limit 0/10 → 0/10 (exclude_test_order true). Ghi usage billing chưa quan sát.",
  "staging_observation_kb_ids": [
    "webhook-ingestion#KB-043",
    "webhook-ingestion#KB-045"
  ],
  "status_note": "Quan sát staging chỉ là OBSERVED_CURRENT; vẫn cần PO/Dev xác nhận, chưa resolve."
}
```

## OQ-integrations-026 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-integrations-026",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "webhook-ingestion",
  "summary": "Các check P1 (tiền / billing / bốc thăm / refund / store credit / permission / xoá dữ liệu) của feature này có oracle STRONG nhưng chỉ dựa trên tài liệu dev (dev_doc). Theo luật oracle, chúng giữ NEEDS_CONFIRMATION cho tới khi có test_case PASS (hoặc PO/Dev xác nhận trực tiếp) cho đúng hành vi. Danh sách check ở check_ids.",
  "check_ids": [
    "webhook-ingestion:CHK-001",
    "webhook-ingestion:CHK-002",
    "webhook-ingestion:CHK-004",
    "webhook-ingestion:CHK-005",
    "webhook-ingestion:CHK-006",
    "webhook-ingestion:CHK-010",
    "webhook-ingestion:CHK-012",
    "webhook-ingestion:CHK-014",
    "webhook-ingestion:CHK-016"
  ],
  "staging_observation": "Ghi chú quan sát staging cho OQ-integrations-026: 2026-10-17: Gián tiếp cho CHK-001: đơn Mysbox ~5 giây sau paid, link Unbox ≤ 9 giây. Các check khác (forge webhook, Horizon, uninstall...) NOT_OBSERVED.",
  "staging_observation_kb_ids": [
    "webhook-ingestion#KB-044"
  ],
  "status_note": "Quan sát staging chỉ là OBSERVED_CURRENT; vẫn cần PO/Dev xác nhận, chưa resolve."
}
```

## OQ-integrations-027 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-integrations-027",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "webhook-ingestion",
  "summary": "Những header nào là header bắt buộc của webhook, và request thiếu một header bắt buộc bị từ chối với mã trạng thái nào?",
  "kb_ids": [
    "webhook-ingestion#KB-021"
  ],
  "check_ids": [
    "webhook-ingestion:CHK-007"
  ]
}
```

## OQ-integrations-028 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-integrations-028",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "webhook-ingestion",
  "summary": "Khi Mysbox nhận hai webhook orders/paid cho cùng một đơn nhưng khác event id, đơn có bị xử lý (rút thăm) lần thứ hai không, hay có lớp bảo vệ theo đơn?",
  "check_ids": [
    "webhook-ingestion:CHK-011"
  ]
}
```

## OQ-integrations-029 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-integrations-029",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "webhook-ingestion",
  "summary": "'Thử lại tối đa 3 lần' của shop/update là số lần job tự thử lại khi lỗi hay là cơ chế chống trùng? shop/update giao trùng có bị xử lý hai lần không?",
  "check_ids": [
    "webhook-ingestion:CHK-015"
  ]
}
```

## OQ-integrations-030 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-integrations-030",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "webhook-ingestion",
  "summary": "Webhook cho đơn test có được xử lý như đơn thật không (tạo yêu cầu mở box, rút thăm, ghi usage)?",
  "check_ids": [
    "webhook-ingestion:CHK-018"
  ],
  "staging_observation": "Ghi chú quan sát staging cho OQ-integrations-030: 2026-10-17: Như OQ-integrations-025: bốc thăm có, có trong Manage orders, bộ đếm không tăng; billing usage NOT_OBSERVED.",
  "staging_observation_kb_ids": [
    "webhook-ingestion#KB-043",
    "webhook-ingestion#KB-045"
  ],
  "status_note": "Quan sát staging chỉ là OBSERVED_CURRENT; vẫn cần PO/Dev xác nhận, chưa resolve."
}
```

## OQ-integrations-031 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-integrations-031",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "request-authentication",
  "summary": "Trên staging, trang đơn hàng của khách xác thực API bằng header customer-token + customer-id qua app proxy. Server kiểm customer-token thế nào (gắn với đơn hay khách nào, hết hạn khi nào) và trả gì khi token sai, thiếu hoặc thuộc khách khác?",
  "kb_ids": [
    "request-authentication#KB-017"
  ],
  "check_ids": [
    "request-authentication:CHK-014"
  ],
  "tags": [
    "staging-observed"
  ]
}
```

## OQ-integrations-032 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-integrations-032",
  "type": "OPEN_ISSUE",
  "feature_id": "request-authentication",
  "summary": "Endpoint customer của block trang cảm ơn (/api/orders/{shopify_order_id}/customer?shop=...) trả customer_id + token chỉ dựa trên order id + tên shop: có kiểm đơn thuộc shop đó và yêu cầu đến từ extension không, gọi với order id của shop khác hoặc order id đoán thì trả gì, và host staging-api có phải backend chính thức của staging không? — Endpoint không xác thực trả token khách; không có oracle cho nhánh negative và host chưa được operator xác nhận.",
  "kb_ids": [
    "request-authentication#KB-018",
    "request-authentication#KB-013",
    "request-authentication#KB-014"
  ],
  "tags": [
    "staging-observed"
  ]
}
```

## OQ-integrations-033 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-integrations-033",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "request-authentication",
  "summary": "Quan sát staging mới chạm vùng rủi ro cao (quyền truy cập / tiền / billing): Request của merchant app tới backend: Bearer session token, không có shop id do client chọn; Trang đơn hàng của khách gửi header customer-token + customer-id qua app proxy; Block trang cảm ơn gọi backend chỉ với tham số shop, nhận customer_id + token. Item là OBSERVED_CURRENT; cần PO xác nhận đây là hành vi dự kiến trước khi dùng làm expected result.",
  "kb_ids": [
    "request-authentication#KB-016",
    "request-authentication#KB-017",
    "request-authentication#KB-018"
  ],
  "tags": [
    "staging-observed",
    "risk-flag"
  ]
}
```

## OQ-integrations-034 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-integrations-034",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "webhook-ingestion",
  "summary": "Quan sát staging mới chạm vùng rủi ro cao (quyền truy cập / tiền / billing): Đơn test Bogus được xử lý như đơn thật: có đơn Mysbox, bốc thăm, mở được, quà thêm vào đơn Shopify; Đơn test không làm tăng Box sales limit khi Exclude Test Order bật. Item là OBSERVED_CURRENT; cần PO xác nhận đây là hành vi dự kiến trước khi dùng làm expected result.",
  "kb_ids": [
    "webhook-ingestion#KB-043",
    "webhook-ingestion#KB-045"
  ],
  "tags": [
    "staging-observed",
    "risk-flag"
  ]
}
```
