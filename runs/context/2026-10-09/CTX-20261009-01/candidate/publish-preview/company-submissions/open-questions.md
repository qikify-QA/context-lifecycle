# Open Questions — Company submissions — duyệt submission đăng ký, tìm customer có sẵn, tạo B2B company (luồng Approve và luồng tạo tự động lúc submit theo cờ store), trigger Flow company approved

Tổng: 30 mục. Sinh từ lần bootstrap đầu tiên (DOC_BOOTSTRAP) của Duos B2B, ngày 2026-10-09.

- CONFLICT: 2
- NEEDS_CONFIRMATION: 13
- OPEN_ISSUE: 15

## OQ-company-submissions-001 — CONFLICT

```json
{
  "oq_id": "OQ-company-submissions-001",
  "type": "CONFLICT",
  "feature_id": "submission-review-and-decision",
  "summary": "Submission có thao tác Reject hay không? Hai nguồn có thẩm quyền nói khác nhau và chưa được chốt; cần PO chọn một hành vi duy nhất làm kết quả mong đợi (và xác nhận số phận của TC-DUOS-069 đang passed với expected \"Rejected\").",
  "kb_ids": [
    "KB-008",
    "KB-009",
    "KB-001",
    "KB-010"
  ],
  "side_a": "Theo Jira DUOS-6 (spec gốc 2024, Done) và tài liệu sản phẩm Duos (docs 09/07/2026), merchant có thể \"approve or reject\" submission kèm lý do; TC-DUOS-069 (task Testlane DUOS-002) đang passed với expected \"Submission chuyển đúng trạng thái Rejected\".",
  "side_b": "Theo PO 30/09/2026 (chuyển lời qua QA lead, task Testlane DUOS-004 BR-48; Decision log Duos 30/09/2026), Portal không có nút Reject, submission không có status rejected — status lưu chỉ gồm pending, completed, failed (Dev FE 22/09 và 30/09/2026, BR-08, BR-47) — và chỉ có bulk action \"Delete selected submisisons\"; quan sát staging TC-DUOS-198 và TC-DUOS-203 không thấy nút Reject.",
  "conflict_group": "CONF-DUOS-company-submissions-01",
  "related_questions": [
    "Submission có thao tác Reject (kèm lý do, status rejected) hay không, và tập status đầy đủ của submission là gì (chỉ `pending` / `completed` / `failed` theo Dev FE 22/09 và 30/09/2026, hay có thêm `rejected`)? Jira DUOS-6 và tài liệu sản phẩm (docs 09/07/2026) nói có \"approve or reject\"; PO 30/09/2026 (task Testlane DUOS-004 BR-48) nói không có Reject, chỉ có bulk xoá. PO cần chọn một hành vi làm kết quả mong đợi và xác nhận số phận của TC-DUOS-069 đang passed với expected \"Rejected\"."
  ],
  "check_ids": [
    "submission-review-and-decision:CHK-006"
  ]
}
```

## OQ-company-submissions-002 — CONFLICT

```json
{
  "oq_id": "OQ-company-submissions-002",
  "type": "CONFLICT",
  "feature_id": "submission-review-and-decision",
  "summary": "Merchant bị khoá sửa email/phone của submission theo điều kiện nào: theo cờ enable_company_creation_on_submit của store hay theo việc submission đã có company_id? Đồng thời: store bật cờ nhưng job fail hoặc bị rate_limited (không có company_id) thì có sửa được không? (task Testlane GAP-27)",
  "kb_ids": [
    "KB-012",
    "KB-013",
    "KB-014"
  ],
  "side_a": "Theo PO 30/09/2026 (chuyển lời qua QA lead, task Testlane DUOS-004 BR-50; Decision log Duos 30/09/2026), store bật cờ enable_company_creation_on_submit thì merchant không sửa được email/phone của submission, muốn sửa phải vào Shopify admin.",
  "side_b": "Theo Dev FE 30/09/2026 (task Testlane DUOS-004 BR-24), Portal không đọc cờ mà chỉ dựa vào company_id; quan sát staging TC-DUOS-196 cho thấy submission có company_id thì card Submission không còn icon sửa.",
  "conflict_group": "CONF-DUOS-company-submissions-02",
  "related_questions": [
    "Merchant bị khoá sửa email/phone của submission theo điều kiện nào: theo cờ `enable_company_creation_on_submit` của store (PO 30/09/2026, task Testlane DUOS-004 BR-50) hay theo việc submission đã có `company_id` (Dev FE 30/09/2026, BR-24; quan sát TC-DUOS-196)? Store bật cờ nhưng job fail hoặc bị rate_limited (không có `company_id`) thì có sửa được không (task Testlane GAP-27)?"
  ],
  "check_ids": [
    "submission-review-and-decision:CHK-007"
  ]
}
```

## OQ-company-submissions-003 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-company-submissions-003",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "submission-review-and-decision",
  "summary": "Bulk action \"Delete selected submisisons\" xoá những gì: chỉ bản ghi submission, hay cả Company / Location / Main contact đã được job tạo lúc submit (store bật cờ)? PO chưa chốt phạm vi xoá.",
  "kb_ids": [
    "KB-010",
    "KB-011",
    "KB-057"
  ],
  "related_questions": [
    "Bulk action xoá submission (\"Delete selected submisisons\") xoá những gì: chỉ bản ghi submission, hay cả Company / Location / Main contact mà job đã tạo lúc submit trên store bật cờ `enable_company_creation_on_submit`?"
  ],
  "check_ids": [
    "submission-review-and-decision:CHK-005"
  ]
}
```

## OQ-company-submissions-004 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-company-submissions-004",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "submission-review-and-decision",
  "summary": "Ma trận quyền cho object Company submissions chưa được tài liệu nêu: role nào của merchant (chủ store, staff Shopify với quyền nào trong app) được xem danh sách submission, sửa email/phone, Approve và xoá submission; nhiều phát biểu không ghi role (status lưu, payload trigger, cấu hình cờ qua admin panel nội bộ). Cần PO/Dev xác nhận.",
  "kb_ids": [
    "KB-001",
    "KB-005",
    "KB-010",
    "KB-014",
    "KB-018",
    "KB-023",
    "KB-047",
    "KB-048"
  ],
  "related_questions": [
    "Role nào của merchant (chủ store, staff Shopify với quyền nào trong app) được xem danh sách submission, sửa email/phone, Approve và xoá submission? Tài liệu hiện chưa nêu ma trận quyền cho object Company submissions.",
    "Merchant bị khoá sửa email/phone của submission theo cờ `enable_company_creation_on_submit` hay theo việc submission đã có `company_id`? Store bật cờ nhưng job lỗi hoặc bị `rate_limited` (không có `company_id`) thì có sửa được không (task Testlane GAP-27)?",
    "Role nào của merchant được xem danh sách submission, sửa email/phone, Approve và xoá submission trong Company submissions?"
  ],
  "check_ids": [
    "submission-review-and-decision:CHK-010"
  ]
}
```

## OQ-company-submissions-005 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-company-submissions-005",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "submission-review-and-decision",
  "summary": "Một số hành vi chỉ dựa vào ticket Jira (không có rule đang hiệu lực hay quyết định PO/Dev có ngày): merchant sửa được email/phone trước khi Approve (Jira DUOS-91, description trống); Approve luồng cũ gán customer làm Main contact (Location admin) kèm role Admin của app (Jira DUOS-425); không khớp customer thì tạo customer mới (mục Jira DUOS-411, TC-DUOS-053 không ghi ngày chạy). Cần PO/Dev xác nhận các hành vi này còn đúng.",
  "kb_ids": [
    "KB-014",
    "KB-019",
    "KB-045"
  ],
  "related_questions": [
    "Hành vi \"merchant sửa được email/phone của submission trước khi Approve\" (Jira DUOS-91, description trống) còn đúng trên build hiện tại không?",
    "Luồng Approve cũ (submission không có `company_id`) tạo ra chính xác những gì trên Shopify: Company + Location + customer làm Main contact với Shopify role Location admin + role Admin của app như Jira DUOS-425 mô tả? Chưa có rule đang hiệu lực nào mô tả riêng các bước tạo của luồng này.",
    "Approve luồng cũ có thực sự gán customer làm Main contact (Location admin) kèm role Admin của app như Jira DUOS-425 mô tả không?",
    "Khi email/phone của submission không khớp customer có sẵn nào, hệ thống có luôn tạo customer mới làm contact (Jira DUOS-411; TC-DUOS-053 passed nhưng không ghi ngày chạy) trên build hiện tại không, ở cả nhánh job lúc submit và luồng Approve cũ?",
    "Không khớp customer nào thì hệ thống có luôn tạo customer mới (Jira DUOS-411) trên build hiện tại không?"
  ],
  "check_ids": [
    "approve-company-creation:CHK-003",
    "customer-matching:CHK-007"
  ]
}
```

## OQ-company-submissions-006 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-company-submissions-006",
  "type": "OPEN_ISSUE",
  "feature_id": "submission-review-and-decision",
  "summary": "Lỗi hiển thị đang mở: Portal viết sai chính tả \"submission\" ở toast sau Approve (\"Company submisison approved\") và ở bulk action (\"Delete selected submisisons\"); quan sát staging 30/09/2026, chưa log bug. Theo dõi đến khi sửa; checklist dùng như regression watch, không làm kết quả mong đợi.",
  "kb_ids": [
    "KB-016",
    "KB-033",
    "KB-010"
  ]
}
```

## OQ-company-submissions-007 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-company-submissions-007",
  "type": "OPEN_ISSUE",
  "feature_id": "submission-review-and-decision",
  "summary": "Bug đang mở BUG-210: có submission được lưu với phone chỉ là \"+84\" (thiếu số); nội dung bug chưa đọc được và nghi vấn nó làm Approve luồng cũ thất bại chưa được xác nhận. Cần Dev xác nhận nguyên nhân và phạm vi.",
  "kb_ids": [
    "KB-017",
    "KB-029"
  ],
  "related_questions": [
    "Phone của submission phải được lưu ở định dạng nào (mã quốc gia + đầy đủ số, chuẩn hoá ra sao)? Lỗi BUG-210 (submission lưu phone chỉ là \"+84\") do đâu, đã sửa chưa, và phone thiếu số có làm Approve luồng cũ thất bại không?"
  ],
  "check_ids": [
    "submission-review-and-decision:CHK-009"
  ]
}
```

## OQ-company-submissions-008 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-company-submissions-008",
  "type": "OPEN_ISSUE",
  "feature_id": "submission-review-and-decision",
  "summary": "Chưa kiểm chứng được trên Inventory staging Duos (08/10/2026): store khảo sát không có submission nên trang chi tiết submission, Approve, nút Reject / bulk Delete và icon sửa email/phone chưa được quan sát lại; build staging của các quan sát 30/09/2026 không được ghi. Cần một lượt khảo sát có dữ liệu submission.",
  "kb_ids": [
    "KB-005",
    "KB-009",
    "KB-010",
    "KB-013",
    "KB-015"
  ],
  "related_questions": [
    "Trang chi tiết submission, nút Approve, bulk Delete, sự vắng mặt của Reject và icon sửa email/phone hiện ra sao trên build staging hiện tại?"
  ]
}
```

## OQ-company-submissions-009 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-company-submissions-009",
  "type": "OPEN_ISSUE",
  "feature_id": "submission-review-and-decision",
  "summary": "Tài liệu liên kết không có trong bộ nguồn: file câu hỏi mở của QA (hai câu \"Submission có nút Reject hay chỉ Delete\" và \"Khoá sửa email/phone theo cờ hay theo company_id\"), nguyên văn tài liệu sản phẩm Duos (docs 09/07/2026) về \"approve or reject\" kèm lý do, và business rule bản gốc mục B2B Registration (04/09/2026). Không suy diễn nội dung; cần nạp bổ sung nếu muốn đóng tranh chấp.",
  "kb_ids": [
    "KB-008",
    "KB-009",
    "KB-012",
    "KB-013"
  ]
}
```

## OQ-company-submissions-010 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-company-submissions-010",
  "type": "OPEN_ISSUE",
  "feature_id": "approve-company-creation",
  "summary": "Nghi vấn đang mở (chưa log bug, cần Dev xem): trên store bật cờ, Approve một submission Failed không có company_id trả PUT 200 nhưng không có toast, vẫn Failed và không tạo company, trong khi Dev đã chốt submission không có company_id phải đi luồng cũ tạo company. Theo dõi như regression watch; không dùng làm kết quả mong đợi.",
  "kb_ids": [
    "KB-005",
    "KB-017",
    "KB-018",
    "KB-029"
  ],
  "related_questions": [
    "Trên store bật cờ, Approve một submission `failed` không có `company_id` trả `PUT` 200 nhưng không toast, vẫn Failed và không tạo company — đây là lỗi (Dev FE đã chốt nhánh này phải đi luồng cũ) và có liên quan phone \"+84\" thiếu số (BUG-210) không?",
    "BUG-210 (phone submission lưu chỉ \"+84\") do nguyên nhân gì, và phone thiếu số có làm Approve luồng cũ thất bại không?"
  ]
}
```

## OQ-company-submissions-011 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-company-submissions-011",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "approve-company-creation",
  "summary": "Ở luồng Approve cũ, khi bước gán contact lỗi thì company được tạo nhưng không có contact, submission vẫn completed và không có banner. Đây là lỗi cần sửa hay hành vi được chấp nhận? (task Testlane GAP-23)",
  "kb_ids": [
    "KB-030",
    "KB-043"
  ],
  "related_questions": [
    "Ở luồng Approve cũ, khi bước gán contact lỗi thì company được tạo nhưng không có contact, submission vẫn `completed` và không có banner báo. Đây là lỗi cần sửa hay hành vi được chấp nhận (task Testlane GAP-23)? Nếu là lỗi, kết quả mong đợi là gì?"
  ],
  "check_ids": [
    "approve-company-creation:CHK-017"
  ]
}
```

## OQ-company-submissions-012 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-company-submissions-012",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "approve-company-creation",
  "summary": "Submission đang setup_incomplete mà chưa được gán contact thì khi merchant Approve có báo customer_not_found (không bắn trigger) hay không? (task Testlane GAP-28)",
  "kb_ids": [
    "KB-034",
    "KB-020",
    "KB-025"
  ],
  "related_questions": [
    "Submission đang setup_incomplete mà company chưa được gán contact thì khi merchant Approve có báo không tìm thấy customer (`customer_not_found`, không bắn trigger, giữ status) hay không (task Testlane GAP-28)?"
  ],
  "check_ids": [
    "approve-company-creation:CHK-008"
  ]
}
```

## OQ-company-submissions-013 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-company-submissions-013",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "approve-company-creation",
  "summary": "Khi merchant đổi email của customer trên Shopify admin, submission ở nhánh có company_id bị kẹt Pending vì Approve không tìm lại được customer và app không có đường gỡ. PO chấp nhận giới hạn này hay cần đường gỡ trong app? (task Testlane GAP-29)",
  "kb_ids": [
    "KB-031",
    "KB-025"
  ],
  "related_questions": [
    "Khi merchant đổi email của customer trên Shopify admin, submission ở nhánh có `company_id` bị kẹt Pending vì Approve không tìm lại được customer và app không có đường gỡ (quan sát TC-DUOS-160, 30/09/2026). PO chấp nhận giới hạn này hay cần đường gỡ trong app (task Testlane GAP-29)?",
    "Khi merchant đổi email customer trên Shopify admin làm submission kẹt Pending, PO chấp nhận giới hạn này hay cần đường gỡ trong app (task Testlane GAP-29)?"
  ],
  "check_ids": [
    "approve-company-creation:CHK-013"
  ]
}
```

## OQ-company-submissions-014 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-company-submissions-014",
  "type": "OPEN_ISSUE",
  "feature_id": "approve-company-creation",
  "summary": "Shopify Flow chưa được mở trên staging trong lần khảo sát 08/10/2026: trigger \"company approved\" (duos-approve-company), payload và email \"B2B account created\" chỉ dựa vào Jira/Dev và quan sát test case cũ không ghi ngày. Nội dung/template email và điều kiện gửi khi workflow tắt cũng chưa được tài liệu nêu.",
  "kb_ids": [
    "KB-022",
    "KB-023",
    "KB-024",
    "KB-032"
  ],
  "related_questions": [
    "Trigger `duos-approve-company` và email \"B2B account created\" hoạt động thế nào trên build hiện tại (Flow chưa mở trên staging 08/10/2026), nội dung email là gì và có gửi khi workflow tắt không?"
  ]
}
```

## OQ-company-submissions-015 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-company-submissions-015",
  "type": "OPEN_ISSUE",
  "feature_id": "approve-company-creation",
  "summary": "Chưa có store tắt cờ (luồng Approve cũ) để kiểm: mọi hành vi luồng cũ (Portal tự tạo company, không kiểm tra kết quả trigger, xử lý customer thuộc company khác) chỉ dựa vào Dev/PO; chưa xác minh trên build hiện tại. Ngoài ra chưa rõ trigger_failed là giá trị của company_creation_error hay một trạng thái riêng, và merchant chọn payment term cho company trước hay sau Approve (Jira DUOS-230, câu hỏi PO chưa trả lời).",
  "kb_ids": [
    "KB-018",
    "KB-026",
    "KB-027",
    "KB-030"
  ],
  "related_questions": [
    "Luồng Approve cũ (submission không có `company_id`) có đúng như Dev mô tả trên build hiện tại không, `trigger_failed` là giá trị của `company_creation_error` hay trạng thái riêng, và merchant chọn payment term cho company trước hay sau Approve (Jira DUOS-230)?"
  ]
}
```

## OQ-company-submissions-016 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-company-submissions-016",
  "type": "OPEN_ISSUE",
  "feature_id": "customer-matching",
  "summary": "Bug đang mở (Dev FE xác nhận 30/09/2026): ở luồng Approve cũ, khi email submission trùng customer đã là contact của company khác (kể cả khác hoa/thường, khoảng trắng), hệ thống vẫn tạo company không có contact thay vì báo customer_in_other_company. TC-DUOS-057 và TC-DUOS-060 cần chạy lại trên build hiện tại; dùng như regression watch.",
  "kb_ids": [
    "KB-043",
    "KB-042",
    "KB-044"
  ],
  "related_questions": [
    "Ở luồng Approve cũ, email submission trùng customer đã thuộc company khác (kể cả khác hoa/thường, khoảng trắng) có còn tạo company không contact trên build hiện tại không (TC-DUOS-057, TC-DUOS-060 cần chạy lại)?"
  ]
}
```

## OQ-company-submissions-017 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-company-submissions-017",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "customer-matching",
  "summary": "Trên store bật cờ, người lạ submit form công khai bằng email của một customer có sẵn thì job tự gán customer đó làm Main contact (Location admin) của company mới mà không qua review của merchant. PO chấp nhận hành vi này hay cần chặn/thêm bước review? (task Testlane SEC-04)",
  "kb_ids": [
    "KB-046",
    "KB-035",
    "KB-049"
  ],
  "related_questions": [
    "Trên store bật cờ `enable_company_creation_on_submit`, người lạ submit form công khai bằng email của một customer có sẵn thì job tự gán customer đó làm Main contact với role Location admin của company mới mà không qua review của merchant (quan sát TC-DUOS-221, 30/09/2026). PO chấp nhận hành vi này hay cần chặn / thêm bước xác minh (task Testlane SEC-04)?",
    "PO chấp nhận việc người lạ submit form công khai bằng email customer có sẵn và được gán thẳng làm Main contact (store bật cờ), hay cần chặn / thêm bước review (task Testlane SEC-04)?"
  ],
  "check_ids": [
    "customer-matching:CHK-008"
  ]
}
```

## OQ-company-submissions-018 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-company-submissions-018",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "customer-matching",
  "summary": "Submission có email mới nhưng phone trùng customer cũ: job tạo customer mới không có phone (Shopify từ chối phone trùng). PO có chấp nhận kết quả customer mới thiếu phone này không?",
  "kb_ids": [
    "KB-041",
    "KB-040"
  ],
  "related_questions": [
    "PO có chấp nhận kết quả customer mới không có phone khi submission dùng email mới nhưng phone trùng customer cũ không?"
  ]
}
```

## OQ-company-submissions-019 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-company-submissions-019",
  "type": "OPEN_ISSUE",
  "feature_id": "customer-matching",
  "summary": "Quy tắc matching chưa được chốt cho các trường hợp biên: submission không có cả email lẫn phone, email dạng alias, và cách chuẩn hoá phone (ví dụ 0912 vs +84). Tài liệu chỉ ghi \"quy tắc chưa chốt\" (TC-DUOS-061…063, 076); chưa có kết quả mong đợi.",
  "kb_ids": [
    "KB-037",
    "KB-039",
    "KB-040"
  ],
  "related_questions": [
    "Matching customer chuẩn hoá email theo quy tắc nào (hoa/thường, khoảng trắng, alias), chuẩn hoá phone ra sao (vd 0912… vs +84…), và submission không có cả email lẫn phone thì xử lý thế nào? Tài liệu chỉ ghi \"quy tắc chưa chốt\" (TC-DUOS-061…063, 076).",
    "Matching xử lý thế nào khi submission không có cả email lẫn phone, khi email là alias, và phone được chuẩn hoá ra sao (ví dụ 0912 vs +84)?"
  ],
  "check_ids": [
    "customer-matching:CHK-009"
  ]
}
```

## OQ-company-submissions-020 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-company-submissions-020",
  "type": "OPEN_ISSUE",
  "feature_id": "auto-company-creation-on-submit",
  "summary": "Lỗi đang mở (có thể do cấu hình store test, cần xác nhận): company UK do job tạo lúc submit bị gắn Market \"Vietnam\" với 0 catalog, nên location UK không nhận Base catalog và buyer không đặt được đơn sample (TC-DUOS-153, 30/09/2026). Cần Dev xác nhận lỗi sản phẩm hay do dữ liệu store.",
  "kb_ids": [
    "KB-051",
    "KB-058",
    "KB-062"
  ],
  "related_questions": [
    "Company UK do job tạo lúc submit bị gắn Market \"Vietnam\" với 0 catalog (buyer không đặt được đơn sample) là lỗi sản phẩm hay do cấu hình store test?"
  ]
}
```

## OQ-company-submissions-021 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-company-submissions-021",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "auto-company-creation-on-submit",
  "summary": "Khi store bật cờ, email kích hoạt tài khoản cho buyer có \"setting riêng ở phần Notification\" (PO 30/09/2026) — đó là setting nào, và buyer đăng nhập được bằng Shopify login code trước khi Approve có phải hành vi mong đợi? (task Testlane GAP-25, GAP-26)",
  "kb_ids": [
    "KB-059",
    "KB-060"
  ],
  "related_questions": [
    "Khi store bật cờ, email kích hoạt tài khoản cho buyer có \"setting riêng ở phần Notification\" (PO 30/09/2026) — đó là setting nào, email có được gửi lúc submit hay lúc Approve (task Testlane GAP-25, GAP-26)?"
  ],
  "check_ids": [
    "auto-company-creation-on-submit:CHK-011"
  ]
}
```

## OQ-company-submissions-022 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-company-submissions-022",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "auto-company-creation-on-submit",
  "summary": "Nếu merchant Approve đúng lúc job tạo company chưa ghi company_id thì Portal đi luồng cũ và có thể tạo company thứ 2. PO/Dev có chặn race này không, và kết quả mong đợi là gì? (task Testlane GAP-21)",
  "kb_ids": [
    "KB-061",
    "KB-052",
    "KB-018"
  ],
  "check_ids": [
    "auto-company-creation-on-submit:CHK-009"
  ],
  "related_questions": [
    "Nếu merchant Approve đúng lúc job chưa ghi `company_id` thì có tạo company thứ 2 không, và PO/Dev có chặn race này (task Testlane GAP-21)?"
  ]
}
```

## OQ-company-submissions-023 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-company-submissions-023",
  "type": "OPEN_ISSUE",
  "feature_id": "auto-company-creation-on-submit",
  "summary": "Chưa kiểm: body submit kèm company_id có bị backend bỏ qua không (mass assignment, TC-DUOS-220 — Need confirm); quan hệ giữa rate limit theo IP của form đăng ký và rate limit tạo company theo shop chưa được tài liệu giải thích; định dạng và vị trí lưu của company_creation_rate_limit / company_creation_catalog_ids chưa được mô tả chi tiết.",
  "kb_ids": [
    "KB-049",
    "KB-051",
    "KB-055"
  ],
  "related_questions": [
    "Backend có bỏ qua `company_id` gửi kèm body submit (mass assignment, TC-DUOS-220) không; rate limit theo IP của form đăng ký và rate limit tạo company theo shop áp dụng theo thứ tự nào; định dạng chính xác của `company_creation_rate_limit` và `company_creation_catalog_ids` là gì?"
  ]
}
```

## OQ-company-submissions-024 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-company-submissions-024",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "auto-company-creation-on-submit",
  "summary": "Khi store bật cờ, Company + Location + Main contact do job tạo cho một submission spam hoặc không đạt có cách nào được dọn từ app không (Reject, xoá submission, thao tác riêng), hay chỉ gỡ được trong Shopify admin? Mô tả hiện có dựa trên một phía của tranh chấp Reject/Delete chưa chốt (PO 30/09/2026, chuyển lời qua QA lead) và phạm vi bulk xoá chưa chốt.",
  "check_ids": [
    "auto-company-creation-on-submit:CHK-008"
  ],
  "related_questions": [
    "Company / Location / Main contact tạo lúc submit cho submission spam có được dọn khi merchant xoá hoặc loại bỏ submission không, hay chỉ gỡ được trong Shopify admin?"
  ]
}
```

## OQ-company-submissions-025 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-company-submissions-025",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "auto-company-creation-on-submit",
  "summary": "Backend có bỏ qua field `company_id` gửi kèm body khi submit registration form không (mass assignment, TC-DUOS-220 — Need confirm)? Nếu không, Approve submission đó sẽ chỉ bắn trigger cho company của người khác.",
  "check_ids": [
    "auto-company-creation-on-submit:CHK-012"
  ]
}
```

## OQ-company-submissions-026 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-company-submissions-026",
  "type": "OPEN_ISSUE",
  "feature_id": "submission-review-and-decision",
  "summary": "Submission có thao tác Reject (kèm lý do, status Rejected) hay chỉ có bulk Delete, tức tập status lưu là `pending` / `completed` / `failed` hay có thêm `rejected`? Nếu chỉ Delete thì expected \"Rejected\" của TC-DUOS-069 xử lý thế nào?",
  "kb_ids": [
    "KB-008",
    "KB-009",
    "KB-001",
    "KB-010"
  ]
}
```

## OQ-company-submissions-027 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-company-submissions-027",
  "type": "OPEN_ISSUE",
  "feature_id": "submission-review-and-decision",
  "summary": "Status `failed` xuất hiện trong những trường hợp nào ở store không bật cờ, và hành vi khi cờ OFF có gì khác ở màn duyệt?",
  "kb_ids": [
    "KB-001",
    "KB-003",
    "KB-053",
    "KB-026"
  ]
}
```

## OQ-company-submissions-028 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-company-submissions-028",
  "type": "OPEN_ISSUE",
  "feature_id": "approve-company-creation",
  "summary": "Approve submission bị `rate_limited` đi luồng cũ cụ thể thế nào (có chạy matching, có bắn trigger, banner gì)?",
  "kb_ids": [
    "KB-028",
    "KB-056"
  ]
}
```

## OQ-company-submissions-029 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-company-submissions-029",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": null,
  "summary": "PO/Dev xác nhận hay sửa các hiện trạng sau (ghi nhận trên staging, khảo sát 30/09–08/10/2026), hiện đang được checklist dùng làm kỳ vọng tạm thời nhưng chưa có ai xác nhận là hành vi đúng: submission management screen layout: Trên staging (khảo sát 08/10/2026, store staging Plus (Free plan), tài khoản merchant staff), màn quản lý submission trên Portal mang header · submission table controls empty state: Trên staging (khảo sát 08/10/2026, store staging Plus (Free plan), không có submission), bảng submission có ô \"Search and filter results\", đ.",
  "kb_ids": [
    "KB-006",
    "KB-007",
    "KB-P-011"
  ],
  "check_ids": [
    "submission-review-and-decision:CHK-003"
  ]
}
```

## OQ-company-submissions-030 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-company-submissions-030",
  "type": "OPEN_ISSUE",
  "feature_id": null,
  "summary": "Bộ tài liệu nguồn (QA business rule, QA KB Duos, inventory staging) không có đặc tả API / data model cho các feature: submission-review-and-decision, customer-matching. Cần Dev cung cấp endpoint, payload và dữ liệu lưu trữ liên quan nếu QA cần kiểm ở tầng API/DB.",
  "related_feature_ids": [
    "submission-review-and-decision",
    "customer-matching"
  ]
}
```
