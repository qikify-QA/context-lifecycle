# Open Questions — Contacts — danh sách/tìm kiếm, tạo/sửa, chi tiết, import/export CSV và custom field dùng chung

Tổng: 42 mục. Sinh từ lần bootstrap đầu tiên (DOC_BOOTSTRAP) của Mailtro, ngày 2026-10-08.

- CONFLICT: 4
- NEEDS_CONFIRMATION: 16
- OPEN_ISSUE: 22

> Xung đột dùng chung nhiều object (CONF-MTRO-email-content-01) được theo dõi ở **OQ-email-content-026** trong open-questions của object `email-content`; phía object này: KB-154, KB-155.

## OQ-contacts-001 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-contacts-001",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": null,
  "summary": "Ma trận quyền của Contacts chưa được chốt: ai (Owner / Admin / role thứ ba đang tranh chấp tên Member vs Marketer/Editor) được xem, tạo, sửa, xoá contact, import / export và tải file export của người khác, và các thao tác này có bị chặn ở API không (GAP-15, GAP-06)? Hiện chỉ có quyết định PO/Dev 01/10/2026 cho Member tạo / xoá field definition và sửa custom field của contact (chưa quan sát); mọi quan sát staging đều bằng Owner, tài khoản Admin chỉ là placeholder.",
  "kb_ids": [
    "KB-048",
    "KB-113",
    "KB-119",
    "KB-138"
  ],
  "related_feature_ids": [
    "contact-export",
    "custom-fields"
  ],
  "check_ids": [
    "contact-list-and-search:CHK-013",
    "contact-create-and-edit:CHK-030",
    "contact-detail:CHK-009",
    "contact-import:CHK-016",
    "custom-fields:CHK-022"
  ],
  "related_questions": [
    "Owner, Admin và role thứ ba (Member hay Marketer/Editor) được xem, tìm, xoá contact tới đâu, và API có chặn tương ứng không?",
    "Owner, Admin và role thứ ba được tạo contact và sửa field chuẩn của contact tới đâu, và API có chặn tương ứng không?",
    "Owner, Admin và role thứ ba được tạo / sửa contact và field chuẩn tới đâu?",
    "Owner, Admin và role thứ ba được xem trang chi tiết contact và dùng Edit / Delete trong Contact actions tới đâu, và API có chặn tương ứng không?",
    "Owner, Admin và role thứ ba được xem trang chi tiết và dùng Contact actions tới đâu?",
    "Role nào được import contact, và việc mọi người trong workspace thấy kết quả lượt import do người khác chạy có phải chủ ý không?",
    "Ai được import, và có nên cho mọi người thấy kết quả lượt import của người khác không?",
    "Owner và Admin được tạo / xoá field definition không, và API có chặn theo role không (router frontend không phân quyền theo role)?",
    "Owner và Admin được tạo / xoá field definition không, và API có chặn theo role không?"
  ]
}
```

## OQ-contacts-002 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-contacts-002",
  "type": "OPEN_ISSUE",
  "feature_id": null,
  "summary": "Thiếu tài liệu câu hỏi mở của Mailtro được tham chiếu cho Contacts (mục § Contacts và mục \"AC MTRO-24 lệch bản dựng dialog New contact\", Consent trong bảng kết quả segment). Không suy diễn nội dung các mục này; cần bổ sung tài liệu hoặc hỏi lại QA lead / PO.",
  "missing_area": "missing-linked-docs"
}
```

## OQ-contacts-003 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-contacts-003",
  "type": "OPEN_ISSUE",
  "feature_id": null,
  "summary": "Chưa có quan sát Contacts / Custom fields / Import / Export bằng role Admin hoặc Member (inventory chỉ đi bằng Owner; Admin là placeholder; quyền `notYours` của Export chưa test được vì dùng chung một tài khoản Owner). Cần tài khoản Admin / Member thật để khảo sát.",
  "kb_ids": [
    "KB-119"
  ],
  "related_feature_ids": [
    "custom-fields"
  ],
  "missing_area": "role-coverage"
}
```

## OQ-contacts-004 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-contacts-004",
  "type": "OPEN_ISSUE",
  "feature_id": null,
  "summary": "Tài liệu không ghi build / version của bản dựng staging cho các lần khảo sát Contacts (29/09, 01/10, 06/10/2026); mọi item quan sát staging chỉ gắn ngày khảo sát. Cần ghi build khi khảo sát lại để biết lỗi nào đã được sửa ở bản nào.",
  "missing_area": "build-not-recorded"
}
```

## OQ-contacts-005 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-contacts-005",
  "type": "OPEN_ISSUE",
  "feature_id": "contact-list-and-search",
  "summary": "Lỗi search Contacts không trả về contact Unsubscribed (PO/BA + Dev xác nhận là lỗi 02/10/2026, retest 06/10/2026 vẫn REOPENED) đã được sửa chưa và sửa ở bản build nào? Khi sửa query nền của search, số đếm segment (vốn loại contact bị suppress / Unsubscribed) có bị ảnh hưởng không — cần chạy kèm regression số đếm segment.",
  "kb_ids": [
    "KB-008",
    "KB-009"
  ],
  "related_questions": [
    "Lỗi search Contacts không trả về contact Unsubscribed đã được sửa chưa, ở bản build nào, và sau khi sửa thì số đếm segment (dùng chung query nền) có thay đổi không?"
  ]
}
```

## OQ-contacts-006 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-contacts-006",
  "type": "OPEN_ISSUE",
  "feature_id": "contact-list-and-search",
  "summary": "Các lỗi / nghi lỗi nhỏ ở danh sách Contacts trên staging cần theo dõi: subtitle hiện \"0 contacts\" thoáng qua lúc tải (01/10/2026, chưa kiểm lại); search về chậm 3–8 giây và hiện kết quả lần gõ trước trong lúc chờ (01/10/2026, chưa đo tay); cột Consent lệch trang chi tiết / tab Unsubscribe (01/10/2026, retest 06/10/2026 VERIFIED). Có ticket theo dõi chưa và lỗi Consent đã được đóng chính thức chưa?",
  "kb_ids": [
    "KB-003",
    "KB-006",
    "KB-010",
    "KB-015",
    "KB-020"
  ],
  "related_questions": [
    "Subtitle danh sách Contacts khi có đúng 1 kết quả phải là \"1 contact\" hay chấp nhận \"1 contacts\" (GAP-16)? Và trong lúc trang đang tải, subtitle có được phép hiện \"0 contacts\" không?",
    "Lỗi lệch cột Consent (retest 06/10/2026 đã khớp) và hai nghi lỗi \"0 contacts\" thoáng qua / search chậm đã có ticket theo dõi và đã được đóng chính thức chưa?",
    "Search có số ký tự tối thiểu hoặc debounce không, và kết quả search có phân trang 25 dòng như danh sách không?"
  ],
  "check_ids": [
    "contact-list-and-search:CHK-010"
  ]
}
```

## OQ-contacts-007 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-contacts-007",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "contact-list-and-search",
  "summary": "Cần PO chốt: (1) subtitle danh sách Contacts hiện \"1 contacts\" khi có đúng 1 kết quả có được chấp nhận không, hay phải chia số ít \"1 contact\" (GAP-16)? (2) Ngưỡng thời gian phản hồi search Contacts chấp nhận được là bao nhiêu giây (GAP-17), và có yêu cầu bỏ kết quả cũ trong lúc chờ không?",
  "kb_ids": [
    "KB-004",
    "KB-010"
  ],
  "related_questions": [
    "Thời gian phản hồi search Contacts tối đa chấp nhận được là bao nhiêu giây, và trong lúc chờ có phải bỏ kết quả của lần gõ trước khỏi bảng / subtitle không (GAP-17)?",
    "Subtitle khi có đúng 1 kết quả phải là \"1 contact\" hay chấp nhận \"1 contacts\" (GAP-16)?",
    "Thời gian phản hồi search tối đa chấp nhận được là bao nhiêu giây, và có yêu cầu bỏ kết quả cũ khỏi bảng trong lúc chờ không (GAP-17)?"
  ],
  "check_ids": [
    "contact-list-and-search:CHK-011"
  ]
}
```

## OQ-contacts-008 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-contacts-008",
  "type": "OPEN_ISSUE",
  "feature_id": "contact-create-and-edit",
  "summary": "Các lỗi đang mở ở dialog New / Edit contact: Save của Edit bật và gửi PUT khi chưa đổi gì; phụ đề Edit dùng chữ của Create (Dev xác nhận lỗi 02/10/2026, tái hiện 06/10/2026); custom field Date / Number ở Edit là ô text, nhập `abc` vào Number làm mất giá trị khi Save (TC-MTRO-1717); alert \"The email has already been taken.\" không tự mất khi sửa email (BUG-CS-09); dialog New contact không cuộn ở 375×667 khi có ≥3 dòng custom field (BUG-CONTACT-01, P1). Trạng thái sửa và bản build sửa của từng lỗi là gì? Phụ đề đúng của dialog Edit contact là gì?",
  "kb_ids": [
    "KB-028",
    "KB-049",
    "KB-050",
    "KB-053",
    "KB-055",
    "KB-056",
    "KB-057",
    "KB-058"
  ],
  "related_questions": [
    "Dialog New contact có phải dùng được trên viewport 375×667 (cuộn được, bấm được Create contact / Cancel) khi có nhiều dòng custom field không, và lỗi không cuộn được đã sửa ở build nào?",
    "Ở dialog Edit contact, custom field Number / Date phải dùng control gì, nhập giá trị sai kiểu (ví dụ `abc` vào Number) thì phải báo lỗi hay giữ giá trị cũ, và backend có validate value theo Kind không (GAP-05)?",
    "Phụ đề đúng của dialog Edit contact là gì, và các lỗi đang mở (Save bật khi chưa đổi gì; Number / Date là ô text làm mất giá trị; alert email trùng không tự mất; dialog không cuộn ở 375×667 khi ≥3 dòng custom field) đã sửa ở build nào?"
  ],
  "check_ids": [
    "contact-create-and-edit:CHK-020",
    "contact-create-and-edit:CHK-025"
  ]
}
```

## OQ-contacts-009 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-contacts-009",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "contact-create-and-edit",
  "summary": "Nhóm quyết định QA lead chốt 05/10/2026 theo bản dựng staging, chưa có xác nhận PO/Dev: (a) nhãn số điện thoại của contact là `SMS` ở mọi nơi (dialog, Properties, segment builder, CSV import / export, Automations, picker merge tag); (b) key dữ liệu vẫn là `phone` và merge tag `{{contact.phone}}` không đổi; (c) contact tạo bằng import CSV không kích hoạt automation, chỉ contact tạo lẻ mới vào trigger. PO/Dev xác nhận cả ba điểm? Lưu ý độ lệch: staging 01/10/2026 segment builder, template CSV import và file export vẫn ghi `Phone` — đã đổi sang `SMS` chưa, và header `Phone` cũ trong file import còn được khớp vào trường SMS không (GAP-05)?",
  "kb_ids": [
    "KB-041",
    "KB-042",
    "KB-043",
    "KB-080",
    "KB-101"
  ],
  "related_feature_ids": [
    "contact-import"
  ],
  "related_questions": [
    "PO/Dev có xác nhận nhãn số điện thoại là `SMS` ở mọi nơi, kể cả `Condition field` của segment builder, header template CSV import và header file export? Nếu có, các nơi này đã đổi từ `Phone` sang `SMS` ở build nào (GAP-05)?",
    "PO/Dev có xác nhận quyết định QA lead 05/10/2026: nhãn `SMS` ở mọi nơi, key dữ liệu và merge tag vẫn là `phone`? Segment builder và CSV đã đổi từ Phone sang SMS chưa?",
    "Sau khi đổi nhãn sang `SMS`, file import có header `Phone` cũ còn được tự khớp vào trường SMS không, và header `SMS` có được khớp không (GAP-05)?",
    "Header `Phone` trong file import còn được khớp vào trường SMS sau quyết định nhãn 05/10/2026 không, và template đã đổi sang `SMS` chưa (GAP-05)?"
  ],
  "check_ids": [
    "contact-create-and-edit:CHK-015",
    "contact-import:CHK-014"
  ]
}
```

## OQ-contacts-010 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-contacts-010",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "contact-create-and-edit",
  "summary": "Xác nhận ngày 07/10/2026 qua thread Slack (tài liệu không ghi vai trò người xác nhận) rằng dialog New contact không hiện sẵn custom field và dropdown `key` khi chưa gõ chỉ liệt kê tối đa 20 field. PO/Dev xác nhận quyết định này? Trong khi đó lần chạy TC-MTRO-1469 (06/10/2026) thấy combobox chỉ hiện tối đa 8 field khi workspace có 16 field — giới hạn đúng là 8 hay 20, và có phải chủ ý?",
  "kb_ids": [
    "KB-046",
    "KB-143"
  ],
  "related_feature_ids": [
    "custom-fields"
  ],
  "related_questions": [
    "Dropdown key khi chưa gõ liệt kê tối đa bao nhiêu field (8 hay 20) và đó có phải chủ ý?",
    "Dropdown `key` trong dialog contact khi chưa gõ phải liệt kê tối đa bao nhiêu custom field (8 hay 20), có phải chủ ý, và field ngoài giới hạn có luôn tìm được bằng cách gõ tên không?"
  ],
  "check_ids": [
    "contact-create-and-edit:CHK-018"
  ]
}
```

## OQ-contacts-011 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-contacts-011",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "contact-create-and-edit",
  "summary": "Hai dòng custom field cùng key trong dialog contact: dòng sau ghi đè dòng trước, không chặn, không báo. Decision log ghi đây là quyết định PO/Dev 01/10/2026 (task Testlane MTRO-022 BR-12), nhưng QA KB Contacts ghi PO chưa xác nhận là chủ ý. PO xác nhận hành vi ghi đè im lặng này là đúng thiết kế?",
  "kb_ids": [
    "KB-047"
  ],
  "related_questions": [
    "Hai dòng custom field cùng key ghi đè im lặng có phải thiết kế PO chấp nhận không?"
  ]
}
```

## OQ-contacts-012 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-contacts-012",
  "type": "OPEN_ISSUE",
  "feature_id": "contact-create-and-edit",
  "summary": "Thiếu hợp đồng API của Contacts: đường dẫn đầy đủ của API tạo / sửa / xem chi tiết contact ở portal, API tạo / xoá field definition và ghi custom field (method, path, request/response), Public API v1 cho contact (Jira MTRO-21 trống), route cụ thể để gỡ suppression / unsubscribe. Giới hạn độ dài / định dạng First name, Last name, Address và Country lưu dạng mã hay tên cũng chưa được nêu.",
  "kb_ids": [
    "KB-059",
    "KB-158"
  ],
  "related_feature_ids": [
    "custom-fields"
  ],
  "missing_area": "api-contract-missing",
  "related_questions": [
    "Đường dẫn đầy đủ và request / response của API tạo, sửa contact ở portal là gì; Public API v1 có endpoint contact nào (Jira MTRO-21 trống)?",
    "Giới hạn độ dài / định dạng của First name, Last name, Address là gì, và Country lưu dạng mã hay tên?"
  ]
}
```

## OQ-contacts-013 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-contacts-013",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "contact-detail",
  "summary": "Cần PO chốt (GAP-14): resubscribe contact / gỡ suppression có thao tác trên UI không, hay chỉ qua API `DELETE teams/{team}/unsubscribes/{id}` như rule Jira MTRO-81? Đồng thời xác nhận giả định AS-02 \"UI không đổi được consent của contact\" (staging 01/10/2026: dialog Edit không có trường Consent, trang chi tiết không có thao tác resubscribe).",
  "kb_ids": [
    "KB-061",
    "KB-062",
    "KB-070",
    "KB-071",
    "KB-075"
  ],
  "related_feature_ids": [
    "contact-create-and-edit"
  ],
  "related_questions": [
    "Resubscribe contact / gỡ suppression có thao tác trên UI không, hay chỉ qua API `DELETE teams/{team}/unsubscribes/{id}` như rule Jira MTRO-81 (GAP-14)? Người dùng có được đổi consent của contact trên UI không?",
    "Resubscribe contact / gỡ suppression có thao tác trên UI không, hay chỉ qua API `DELETE teams/{team}/unsubscribes/{id}` (GAP-14) — và marketer có được resubscribe qua API không, hay chỉ người nhận tự làm qua trang của họ (tranh chấp CONF-MTRO-deliverability-02)?"
  ],
  "check_ids": [
    "contact-detail:CHK-006"
  ]
}
```

## OQ-contacts-014 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-contacts-014",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "contact-detail",
  "summary": "Cần Dev BE xác nhận (GAP-13): danh sách đầy đủ và ý nghĩa các giá trị của `Consent`, `Deliverability` và `Unsubscribed via` trong khối Email status; và mốc `Updated` / `Updated at` của contact có phải thay đổi khi consent đổi không (staging 01/10/2026 không đổi khi contact unsubscribe).",
  "kb_ids": [
    "KB-064",
    "KB-072"
  ],
  "related_questions": [
    "Danh sách đầy đủ và ý nghĩa các giá trị Consent, Deliverability, Unsubscribed via; mốc Updated có phải đổi khi consent đổi không (GAP-13)?"
  ]
}
```

## OQ-contacts-015 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-contacts-015",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "contact-detail",
  "summary": "Cần PO chốt quy tắc hiển thị value custom field ở trang chi tiết contact (GAP-11): value null / rỗng đang hiện ô trắng thay vì `—` như field chuẩn, và value Datetime đang hiện dạng ISO UTC thô (`2026-10-01T16:30:00Z`) — cả hai quan sát 06/10/2026, chưa có rule. Hiển thị đúng là gì?",
  "kb_ids": [
    "KB-068",
    "KB-135",
    "KB-140"
  ],
  "related_feature_ids": [
    "custom-fields"
  ],
  "related_questions": [
    "Ở trang chi tiết contact, value custom field rỗng / null phải hiện `—` như field chuẩn hay ô trắng, và value Datetime phải hiện theo định dạng và múi giờ nào (GAP-11)?",
    "Value custom field null / rỗng nên hiện `—` hay ô trắng, và Datetime nên hiện theo định dạng / múi giờ nào (GAP-11)?"
  ],
  "check_ids": [
    "contact-detail:CHK-005"
  ]
}
```

## OQ-contacts-016 — CONFLICT

```json
{
  "oq_id": "OQ-contacts-016",
  "type": "CONFLICT",
  "feature_id": "contact-import",
  "summary": "Khi import CSV, key của custom field sinh từ cột lạ giữ nguyên tên header (PO 28/09/2026) hay được hạ chữ thường (PO/Dev 01/10/2026)? Hai quyết định trái nhau, quyết định mới hơn không ghi rõ thay bản cũ, và tài liệu tự ghi chưa chốt (GAP-01 Major). Giữ nguyên header chữ hoa cũng vi phạm quy tắc key `^[a-z][a-z0-9_]*$`.",
  "kb_ids": [
    "KB-086",
    "KB-087",
    "KB-090"
  ],
  "side_a": "Theo quyết định PO 28/09/2026 (comment Jira MTRO-95, Decision log Mailtro), custom field sinh từ cột lạ khi import CSV giữ nguyên tên header (ví dụ `HOST_APPSTATUS`, `COUNTRY_CODE` từ Brevo).",
  "side_b": "Theo quyết định PO/Dev 01/10/2026 (task Testlane MTRO-022 BR-18, chốt qua QA lead, Decision log Mailtro), attribute chữ hoa khi migrate / import được chuyển thành chữ thường; phía này khớp quy tắc key `^[a-z][a-z0-9_]*$` (Dev BE 02/10/2026).",
  "conflict_group": "CONF-MTRO-contacts-03",
  "related_questions": [
    "Khi import CSV, key của custom field sinh từ cột lạ giữ nguyên tên header (PO 28/09/2026) hay được hạ chữ thường (PO/Dev 01/10/2026)? Nếu giữ nguyên thì quy tắc key `^[a-z][a-z0-9_]*$` có ngoại lệ cho import không (GAP-01)?",
    "Khi import, key của custom field sinh từ cột lạ giữ nguyên tên header hay được hạ chữ thường (GAP-01)?"
  ],
  "check_ids": [
    "contact-import:CHK-007"
  ]
}
```

## OQ-contacts-017 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-contacts-017",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "contact-import",
  "summary": "Các điểm import CSV chưa được PO chốt (task Testlane MTRO-025): một dòng có giá trị không hợp lệ thì bỏ cả dòng hay chỉ bỏ ô (GAP-04); import email đang bị suppress xử lý thế nào; hai lượt import chạy đồng thời; file có BOM hoặc dùng dấu `;` làm phân cách; file 50.001 dòng bị chặn ở bước nào; ngưỡng hiệu năng (QA đề xuất import 50.000 dòng ≤5 phút, export ≤2 phút) (GAP-08…GAP-18).",
  "kb_ids": [
    "KB-078",
    "KB-082",
    "KB-085",
    "KB-088",
    "KB-092"
  ],
  "related_questions": [
    "Khi import, một dòng có giá trị không hợp lệ thì bỏ cả dòng hay chỉ bỏ ô (GAP-04)? Email đang bị suppress trong file được xử lý thế nào? File có BOM hoặc dùng `;` làm phân cách có được hỗ trợ không?",
    "Một dòng có giá trị không hợp lệ thì bỏ cả dòng hay chỉ bỏ ô (GAP-04)? Email đang bị suppress trong file được xử lý thế nào?",
    "File có BOM hoặc dùng `;` làm phân cách, file 50.001 dòng, hai lượt import chạy đồng thời thì hệ thống xử lý ra sao; ngưỡng thời gian import 50.000 dòng là bao nhiêu?",
    "File 50,001 dòng bị chặn ở bước nào và báo gì? Ngưỡng thời gian chấp nhận được khi import 50,000 dòng là bao nhiêu?"
  ],
  "check_ids": [
    "contact-import:CHK-012",
    "contact-import:CHK-011"
  ]
}
```

## OQ-contacts-018 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-contacts-018",
  "type": "OPEN_ISSUE",
  "feature_id": "contact-import",
  "summary": "Bước 2 (Map columns), bước 3 (Review and import), tiến trình, kết quả một phần và các lỗi file của Import contacts chỉ được chép từ bundle FE 01/10/2026, chưa upload file nào trên staging; kết quả thật khi submit New contact sai email, khi bấm Delete contact / Create field / Delete field và khi bấm Export cũng chưa được ghi. Cần khảo sát lại bằng thao tác thật.",
  "kb_ids": [
    "KB-088",
    "KB-092",
    "KB-093",
    "KB-095",
    "KB-098",
    "KB-099",
    "KB-100"
  ],
  "missing_area": "import-ui-unobserved",
  "related_questions": [
    "Bước Map columns, Review and import, tiến trình nền và các lỗi file trên UI thật hoạt động thế nào?"
  ]
}
```

## OQ-contacts-019 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-contacts-019",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "contact-export",
  "summary": "Export contacts không có ticket Jira (GAP-07 Major): các hành vi đang thấy trên staging — mặc định All contacts gồm cả người đã unsubscribe, export theo segment loại người đã unsubscribe, file tải được 7 ngày, chỉ người tạo export mới tải được, tiền tố `'` chống formula injection — có phải là spec không? PO xác nhận để dùng làm expected result.",
  "kb_ids": [
    "KB-103",
    "KB-104",
    "KB-105",
    "KB-111",
    "KB-112",
    "KB-113",
    "KB-115"
  ],
  "related_questions": [
    "PO có xác nhận các hành vi export hiện có là spec không: mặc định All contacts gồm cả người đã unsubscribe, export theo segment loại người đã unsubscribe, file tải được 7 ngày, chỉ người tạo mới tải được, tiền tố `'` chống formula injection (GAP-07)?",
    "Sau 7 ngày file export và mục trong Export history bị xử lý thế nào?",
    "Người dùng khác (hoặc role khác) trong workspace có thấy và tải được export do người khác tạo không? Chỉ người tạo mới tải được có phải là spec, và API có chặn tương ứng không?",
    "Người dùng khác (hoặc role khác) trong workspace có thấy và tải được export của người khác không?"
  ],
  "check_ids": [
    "contact-export:CHK-008"
  ]
}
```

## OQ-contacts-020 — CONFLICT

```json
{
  "oq_id": "OQ-contacts-020",
  "type": "CONFLICT",
  "feature_id": "custom-fields",
  "summary": "Key custom field sai quy tắc nhập trong dialog contact phải báo lỗi (PO/Dev 01/10/2026) hay được frontend tự chuẩn hoá (Dev 02/10/2026)? Hai phát biểu cùng phạm vi trái nhau, bản mới hơn không ghi rõ thay bản cũ. Staging 06/10/2026 đang chuẩn hoá im lặng và còn ghi đè vào field có sẵn (`plan-tier` → `plan_tier`) — mục này được ghi là lỗi High đang mở bất kể phía nào thắng.",
  "kb_ids": [
    "KB-130",
    "KB-131",
    "KB-132"
  ],
  "side_a": "Theo quyết định PO/Dev 01/10/2026 (task Testlane MTRO-022 BR-13, chốt qua QA lead, Decision log Mailtro), key custom field sai quy tắc phải hiện thông báo lỗi và không được tự chuẩn hoá im lặng.",
  "side_b": "Theo mô tả của Dev FE 02/10/2026 (task Testlane MTRO-010, QA KB Mailtro \"Custom fields\" v1), frontend tự chuẩn hoá key khi rời ô (ví dụ `Plan Name` → `plan_name`) và đây là chủ ý; chỉ khi sau chuẩn hoá vẫn sai mới hiện message và khoá Save.",
  "conflict_group": "CONF-MTRO-contacts-01",
  "related_questions": [
    "Key custom field sai quy tắc nhập trong dialog contact phải hiện thông báo lỗi (PO/Dev 01/10/2026) hay được frontend tự chuẩn hoá (Dev FE 02/10/2026)? Nếu chuẩn hoá, khi key sau chuẩn hoá trùng field đã có thì phải xử lý thế nào để không ghi đè dữ liệu?",
    "Key custom field sai quy tắc phải báo lỗi hay được tự chuẩn hoá, và lỗi chuẩn hoá ghi đè field có sẵn đã sửa chưa?"
  ],
  "check_ids": [
    "custom-fields:CHK-008"
  ]
}
```

## OQ-contacts-021 — CONFLICT

```json
{
  "oq_id": "OQ-contacts-021",
  "type": "CONFLICT",
  "feature_id": "custom-fields",
  "summary": "Khi Edit contact, có được đổi key / Kind của custom field đã lưu không? PO/Dev 01/10/2026 cho phép, PO/BA 02/10/2026 cấm đổi kiểu; nguồn ghi \"mâu thuẫn\", không ghi bản sau thay bản trước. Nếu cho đổi thì thay đổi áp lên field definition dùng chung hay chỉ contact đang sửa (GAP-16 Major)?",
  "kb_ids": [
    "KB-052",
    "KB-144",
    "KB-145"
  ],
  "side_a": "Theo quyết định PO/Dev 01/10/2026 (task Testlane MTRO-022 BR-14, chốt qua QA lead, Decision log Mailtro), khi Edit contact được đổi key và đổi Kind của custom field.",
  "side_b": "Theo quyết định PO/BA 02/10/2026 (task Testlane MTRO-010 BR-12, Decision log Mailtro), khi Edit contact không được đổi kiểu custom field đã có; staging 06/10/2026 khoá key và Kind ở dialog Edit.",
  "conflict_group": "CONF-MTRO-contacts-02",
  "related_feature_ids": [
    "contact-create-and-edit"
  ],
  "related_questions": [
    "Khi Edit contact có được đổi key / Kind của field đã lưu không, và thay đổi áp cho definition chung hay một contact (GAP-16)?",
    "Khi Edit contact có được đổi key và / hoặc Kind của custom field đã lưu không (PO/Dev 01/10/2026 cho phép, PO/BA 02/10/2026 cấm đổi kiểu)? Nếu được thì thay đổi áp lên field definition dùng chung hay chỉ contact đang sửa (GAP-16)?",
    "Khi Edit contact có được đổi key / Kind của custom field đã lưu không, và nếu được thì thay đổi áp lên field definition dùng chung hay chỉ contact đang sửa (GAP-16)?"
  ],
  "check_ids": [
    "contact-create-and-edit:CHK-026"
  ]
}
```

## OQ-contacts-022 — CONFLICT

```json
{
  "oq_id": "OQ-contacts-022",
  "type": "CONFLICT",
  "feature_id": "custom-fields",
  "summary": "Hợp đồng API custom field của contact dùng khoá nào — `customFields` (Jira MTRO-26) hay `attributes` (staging 26/08/2026) — và khi contact không có custom field thì trả object rỗng hay mảng `[]`? Cần Dev xác nhận để chuẩn hoá (GAP-10).",
  "kb_ids": [
    "KB-157",
    "KB-158"
  ],
  "side_a": "Theo Jira MTRO-26 (story To Do, đọc 07/10/2026), khối Custom fields của contact là key/value động tên `customFields`.",
  "side_b": "Trên staging (test-run 26/08/2026), API contact dùng khoá `attributes` cho custom field, là object khi có data và mảng rỗng `[]` khi không có custom field.",
  "conflict_group": "CONF-MTRO-contacts-04",
  "related_questions": [
    "API contact dùng khoá `attributes` hay `customFields` cho custom field, và khi contact không có custom field thì trả object rỗng hay mảng `[]` (GAP-10)?",
    "API contact dùng khoá `attributes` hay `customFields` cho custom field, và khi rỗng trả object hay `[]` (GAP-10)?"
  ],
  "check_ids": [
    "custom-fields:CHK-024"
  ]
}
```

## OQ-contacts-023 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-contacts-023",
  "type": "OPEN_ISSUE",
  "feature_id": "custom-fields",
  "summary": "Các lỗi custom field đang mở trên staging (06/10/2026): xoá được field đang dùng ở segment / automation, sau đó segment báo \"Unknown field\", preview 422 và node automation trỏ field đã mất (High, trái quyết định PO/Dev 01/10/2026); key sai bị chuẩn hoá im lặng và ghi đè field có sẵn (High); backend không kiểm kiểu value (API ghi `abc` vào Date vẫn được); nút `Create field` enable khi Field name rỗng và không thống nhất với dialog ở Email preferences (nhỏ). Trạng thái sửa và bản build sửa?",
  "kb_ids": [
    "KB-124",
    "KB-130",
    "KB-131",
    "KB-132",
    "KB-141",
    "KB-146",
    "KB-147"
  ],
  "related_questions": [
    "Lỗi xoá được field đang được segment / automation dùng đã sửa chưa, ở build nào?",
    "Key custom field sai quy tắc nhập trong dialog contact phải báo lỗi hay được tự chuẩn hoá, và việc chuẩn hoá ghi đè vào field có sẵn đã được sửa chưa?"
  ]
}
```

## OQ-contacts-024 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-contacts-024",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "custom-fields",
  "summary": "Các điểm custom field chưa chốt: value có được validate theo Kind không (Number thập phân / âm, Date sai format, trim khoảng trắng — GAP-05); `Remove field` trên field đã lưu của contact gỡ key hay set value `null` (GAP-06); danh sách đầy đủ key dành riêng ngoài `email`, `consent`, `first_name`, `country_code` và hành vi khi trùng (GAP-04); trạng thái enable / disable của nút tạo field nên thống nhất thế nào giữa trang Custom fields và Email preferences; giới hạn key mỗi lần lưu là 50 hay 100 (nhánh nâng lên 100 chưa merge tại 02/10/2026)?",
  "kb_ids": [
    "KB-124",
    "KB-128",
    "KB-136",
    "KB-137",
    "KB-141"
  ],
  "related_questions": [
    "Ở bản đang chạy, mỗi lần lưu contact được gửi tối đa 50 hay 100 key custom field (nhánh nâng lên 100 đã merge chưa), và thông báo khi vượt là gì?",
    "Backend và frontend có phải validate value custom field theo Kind không (Number thập phân / âm, Date sai format, trim khoảng trắng), và lỗi trả về là gì (GAP-05)?",
    "Value có được validate theo Kind không (Number thập phân / âm, Date sai format, trim khoảng trắng) ở FE và BE (GAP-05)?",
    "`Remove field` trên field đã lưu của contact gỡ hẳn key hay set value null (GAP-06), và In use có đổi theo không?",
    "Danh sách đầy đủ key dành riêng ngoài `email`, `consent`, `first_name`, `country_code` là gì (GAP-04)?",
    "Giới hạn key mỗi lần lưu contact là 50 hay 100 ở bản đang chạy?",
    "Trạng thái nút tạo field nên thống nhất thế nào giữa trang Custom fields và dialog ở Email preferences khi tên rỗng / sai định dạng?"
  ],
  "check_ids": [
    "custom-fields:CHK-012",
    "custom-fields:CHK-014"
  ]
}
```

## OQ-contacts-025 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-contacts-025",
  "type": "OPEN_ISSUE",
  "feature_id": "custom-fields",
  "summary": "Không có Jira AC nào cho custom field, Import contacts và Export contacts, và QA business rule Mailtro chưa có mục riêng cho custom field — mọi rule hiện có đến từ câu trả lời PO/Dev chuyển qua QA hoặc từ hệ thống thật. Cần PO bổ sung AC (danh sách \"cột chuẩn\" / \"field chuẩn\" khi import / export cũng chưa được liệt kê).",
  "kb_ids": [
    "KB-079",
    "KB-085",
    "KB-107",
    "KB-117"
  ],
  "related_feature_ids": [
    "contact-export",
    "contact-import"
  ],
  "missing_area": "no-ac-custom-fields-import-export",
  "related_questions": [
    "PO sẽ bổ sung Jira AC / business rule riêng cho custom field không?",
    "Danh sách chính xác các \"cột chuẩn\" / \"field chuẩn\" khi import là gì?"
  ]
}
```

## OQ-contacts-026 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-contacts-026",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": null,
  "summary": "Sign-up form (Jira MTRO-9) chưa có trên staging; PO 02/10/2026 chốt phạm vi chỉ đổ contact đăng ký newsletter và ebook về Mailtro. Dev đang nghiêng tích hợp qua một trung gian gọi API nhưng chưa chốt, và câu hỏi có dùng double opt-in hay không chưa được trả lời. PO/Dev cần chốt cách tích hợp và chính sách double opt-in.",
  "kb_ids": [
    "KB-P-056",
    "KB-P-055",
    "KB-P-054"
  ],
  "scope_note": "Câu hỏi mức product (dùng chung nhiều object), đặt ở object này để theo dõi."
}
```

## OQ-contacts-027 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-contacts-027",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "contact-list-and-search",
  "summary": "Khi xoá vĩnh viễn một contact, bản ghi unsubscribe / suppression của email đó có được giữ lại để không gửi lại cho người đã opt-out không; contact có bị gỡ khỏi số đếm segment và các automation run đang chạy không; lịch sử gửi / report có còn giữ dữ liệu của contact không; và toast thành công / thất bại thật là gì?",
  "check_ids": [
    "contact-list-and-search:CHK-009"
  ],
  "related_questions": [
    "Xoá một contact thì bản ghi unsubscribe / suppression, thành viên segment, run automation đang chạy và lịch sử gửi của contact đó bị xử lý thế nào; toast thành công / thất bại thật hiện gì?"
  ]
}
```

## OQ-contacts-028 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-contacts-028",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "contact-import",
  "summary": "Khi upload file không phải CSV, file rỗng / chỉ có header, file không đọc được, file trên 10 MB hoặc quá nhiều cột, Import contacts phải báo gì và chặn ở bước nào? Số cột tối đa là bao nhiêu?",
  "check_ids": [
    "contact-import:CHK-010"
  ]
}
```

## OQ-contacts-029 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-contacts-029",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "contact-import",
  "summary": "Bước Map columns của Import contacts tự khớp tên cột theo quy tắc nào, và với header trống, header trùng, field mới sai định dạng / trùng field có sẵn / trùng field chuẩn thì báo gì và có cho tiếp tục không?",
  "check_ids": [
    "contact-import:CHK-013"
  ],
  "kb_ids": [
    "KB-091"
  ]
}
```

## OQ-contacts-030 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-contacts-030",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "contact-import",
  "summary": "Rời trang khi đang ở bước Map columns thì có cảnh báo không, và rời trang khi import đang chạy thì import có tiếp tục chạy nền và hiện tiến trình khi quay lại không?",
  "check_ids": [
    "contact-import:CHK-015"
  ]
}
```

## OQ-contacts-031 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-contacts-031",
  "type": "OPEN_ISSUE",
  "feature_id": "contact-list-and-search",
  "summary": "Contact của workspace A có bị lộ ở workspace B khi tìm kiếm hoặc gọi thẳng id qua URL / API không?",
  "kb_ids": [
    "KB-P-001",
    "KB-P-005"
  ]
}
```

## OQ-contacts-032 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-contacts-032",
  "type": "OPEN_ISSUE",
  "feature_id": "contact-create-and-edit",
  "summary": "Hai tab cùng sửa một contact thì tab lưu sau ghi đè tab trước — có cần cảnh báo xung đột không?",
  "kb_ids": [
    "KB-060"
  ]
}
```

## OQ-contacts-033 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-contacts-033",
  "type": "OPEN_ISSUE",
  "feature_id": "contact-create-and-edit",
  "summary": "Người dùng có đổi được consent của contact trên UI không (giả định AS-02 chưa xác nhận)?",
  "kb_ids": [
    "KB-061",
    "KB-062"
  ]
}
```

## OQ-contacts-034 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-contacts-034",
  "type": "OPEN_ISSUE",
  "feature_id": "contact-detail",
  "summary": "Contact id không tồn tại có nên hiện `Contact not found.` kèm đường quay lại thay vì alert `Not Found.` không có nút Back?",
  "kb_ids": [
    "KB-069",
    "KB-P-050"
  ]
}
```

## OQ-contacts-035 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-contacts-035",
  "type": "OPEN_ISSUE",
  "feature_id": "contact-detail",
  "summary": "Trang chi tiết có cần tự cập nhật khi automation ghi attribute không?",
  "kb_ids": [
    "KB-073"
  ]
}
```

## OQ-contacts-036 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-contacts-036",
  "type": "OPEN_ISSUE",
  "feature_id": "contact-detail",
  "summary": "Activity / timeline của contact (Jira MTRO-26, To Do) có nằm trong phạm vi release không?",
  "kb_ids": [
    "KB-074",
    "KB-162"
  ]
}
```

## OQ-contacts-037 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-contacts-037",
  "type": "OPEN_ISSUE",
  "feature_id": "contact-import",
  "summary": "Ngưỡng rate limit import (`tooMany`) và số cột tối đa (`tooManyColumns`) là bao nhiêu?",
  "kb_ids": [
    "KB-098",
    "KB-099"
  ]
}
```

## OQ-contacts-038 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-contacts-038",
  "type": "OPEN_ISSUE",
  "feature_id": "contact-import",
  "summary": "PO/Dev có xác nhận contact tạo bằng import CSV không kích hoạt automation?",
  "kb_ids": [
    "KB-101"
  ]
}
```

## OQ-contacts-039 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-contacts-039",
  "type": "OPEN_ISSUE",
  "feature_id": "contact-export",
  "summary": "File export dùng encoding và dấu phân cách gì, và export có rate limit không?",
  "kb_ids": [
    "KB-106",
    "KB-107"
  ]
}
```

## OQ-contacts-040 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-contacts-040",
  "type": "OPEN_ISSUE",
  "feature_id": "contact-export",
  "summary": "Bấm Export thật (đặc biệt theo segment) thì nhận gì, mất bao lâu, và export lỗi hiện gì trên UI?",
  "kb_ids": [
    "KB-104",
    "KB-114"
  ]
}
```

## OQ-contacts-041 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-contacts-041",
  "type": "OPEN_ISSUE",
  "feature_id": "contact-export",
  "summary": "Header số điện thoại trong file export sẽ là `Phone` hay `SMS`?",
  "kb_ids": [
    "KB-108",
    "KB-041"
  ]
}
```

## OQ-contacts-042 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-contacts-042",
  "type": "OPEN_ISSUE",
  "feature_id": "custom-fields",
  "summary": "Cú pháp merge tag cho custom field là `{{contact.attr.<key>}}` hay `{contact.attr.<key>}`?",
  "kb_ids": [
    "KB-133",
    "KB-154",
    "KB-155"
  ]
}
```
