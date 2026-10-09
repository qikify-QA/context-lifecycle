# Open Questions — Automations — list, builder (trigger/step), test dry-run, run history và Reports

Tổng: 48 mục. Sinh từ lần bootstrap đầu tiên (DOC_BOOTSTRAP) của Mailtro, ngày 2026-10-08.

- CONFLICT: 3
- NEEDS_CONFIRMATION: 24
- OPEN_ISSUE: 21

> Xung đột dùng chung nhiều object (CONF-MTRO-email-content-01) được theo dõi ở **OQ-email-content-026** trong open-questions của object `email-content`; phía object này: KB-144, KB-145.

## OQ-automations-001 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-automations-001",
  "type": "OPEN_ISSUE",
  "feature_id": "automation-list",
  "summary": "Danh sách automation có 3 lỗi đang mở trên staging (27/09–01/10/2026): BUG-52 danh sách không sắp theo Last edited mới nhất (request không gửi tham số sort); search dài hơn 255 ký tự trả 422 và bảng bị thay bằng alert thô, mất ô search / filter (TC-MTRO-970); Duplicate automation tên 255 ký tự trả 500 (TC-MTRO-989). Cần Dev xác nhận trạng thái sửa và PO chốt thứ tự sắp xếp mong đợi của danh sách; checklist dùng các mục này làm regression watch, không làm expected result.",
  "kb_ids": [
    "KB-023",
    "KB-024",
    "KB-025"
  ],
  "related_questions": [
    "Khi người dùng search automation bằng từ khoá dài hơn 255 ký tự, hệ thống phải xử lý thế nào: giới hạn độ dài ô search, tự cắt, hay hiện thông báo lỗi mà vẫn giữ bảng và ô search / filter?",
    "Danh sách automation phải sắp xếp theo thứ tự nào mặc định (Last edited mới nhất trước, Last run, hay tên), và người dùng có đổi được thứ tự không?",
    "Danh sách automation phải sắp xếp theo thứ tự nào (Last edited mới nhất, Last run, hay tên)?",
    "Search automation dài hơn 255 ký tự và Duplicate automation có tên 255 ký tự thì hệ thống phải xử lý thế nào (chặn nhập, cắt tên bản sao, thông báo lỗi)?"
  ],
  "check_ids": [
    "automation-list:CHK-003",
    "automation-list:CHK-005"
  ]
}
```

## OQ-automations-002 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-automations-002",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": null,
  "summary": "Ma trận quyền của automation chưa chốt: tài liệu không ghi role cho hầu hết hành vi của Automations (khảo sát bằng tài khoản Owner), quyền Member / custom role với automation đang \"Need confirm\" (GAP-07 Major) và Admin chưa từng được quan sát. PO cần xác nhận role nào được xem danh sách, tạo / sửa / Activate / Pause / Delete automation, xem Reports / Run history, chạy Test this flow và Retry this run.",
  "kb_ids": [
    "KB-026",
    "KB-176",
    "KB-P-051",
    "KB-P-052"
  ],
  "related_feature_ids": [
    "automation-list",
    "automation-builder",
    "automation-test-run",
    "automation-run-history",
    "automation-reports"
  ],
  "related_questions": [
    "Role nào (Owner, Admin, Member hoặc custom role) được xem danh sách automation, tạo, sửa, Activate, Pause, Duplicate và Delete automation; khi role không đủ quyền thì UI ẩn thao tác hay API trả lỗi gì?",
    "Role nào (Owner, Admin, Member hoặc custom role) được xem danh sách automation, tạo, sửa, Activate, Pause, Duplicate và Delete automation; khi role không đủ quyền thì UI ẩn nút hay API trả lỗi gì?",
    "Role nào được mở builder, tạo mới, sửa, Save, Activate và Pause automation; role không đủ quyền thì builder ở chế độ chỉ xem hay bị chặn vào, và API trả lỗi gì?",
    "Role nào được dựng, lưu, Activate, Pause flow trong builder?",
    "Role nào (Owner, Admin, Member, custom role) được chạy Test this flow của automation, và role không đủ quyền thì nút Test bị ẩn hay API trả lỗi gì?",
    "Role nào (Owner, Admin, Member) được chạy Test this flow?",
    "Role nào được xem Run history, Run detail và bấm Retry this run; role không đủ quyền thì UI ẩn hay API trả lỗi gì?",
    "Role nào được xem Run history, Run detail và bấm Retry this run?",
    "Role nào được xem Automation Reports và Step report; role không đủ quyền thì rail Reports bị ẩn hay API trả lỗi gì?",
    "Role nào được xem Automation Reports?"
  ],
  "check_ids": [
    "automation-list:CHK-017",
    "automation-builder:CHK-019",
    "automation-test-run:CHK-006",
    "automation-run-history:CHK-018",
    "automation-reports:CHK-014"
  ]
}
```

## OQ-automations-003 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-automations-003",
  "type": "OPEN_ISSUE",
  "feature_id": "automation-list",
  "summary": "Thiếu quan sát cho danh sách automation: chưa thấy dòng automation Draft (workspace khảo sát 01/10/2026 không có Draft nên không biết dòng Draft có nút nhanh / menu gì) và inventory 01/10 chưa bấm thật Activate / Pause / Duplicate / Delete để ghi kết quả. Cần khảo sát bổ sung trước khi viết expected result cho các thao tác này.",
  "kb_ids": [
    "KB-011",
    "KB-018",
    "KB-021",
    "KB-022"
  ],
  "missing_area": "automation-list-actions",
  "related_questions": [
    "Dòng automation ở trạng thái Draft trên danh sách có nút nhanh và menu hành động gì; có Activate và Delete trực tiếp từ danh sách được không, và Delete có cần dialog xác nhận như dòng Paused không?",
    "Dòng automation Draft trên danh sách có nút nhanh và menu hành động gì; Draft có Activate được trực tiếp từ danh sách không?",
    "Bấm thật Activate, Pause, Duplicate, Delete trên danh sách cho kết quả gì (toast, trạng thái mới, vị trí bản sao, tên bản sao)?",
    "Đường dẫn đầy đủ, method và mã lỗi của API danh sách / activate / pause / duplicate / delete automation là gì?"
  ],
  "check_ids": [
    "automation-list:CHK-016"
  ]
}
```

## OQ-automations-004 — CONFLICT

```json
{
  "oq_id": "OQ-automations-004",
  "type": "CONFLICT",
  "feature_id": "automation-builder",
  "summary": "Sửa một flow đang Active rồi Save có áp dụng thay đổi cho contact đang Waiting trong flow không? Hai nguồn trái nhau và chưa có quyết định PO/Dev; cần PO xác nhận hành vi mong đợi trước khi dùng làm oracle.",
  "kb_ids": [
    "KB-048",
    "KB-049"
  ],
  "side_a": "QA lead chốt 18/09/2026 theo bản dựng staging (QA business rule Mailtro): thay đổi khi lưu flow Active được áp dụng luôn cho contact đang chạy trong flow.",
  "side_b": "Trên staging test-run 27/09/2026 (TC-MTRO-1125, QA KB Mailtro \"Automations — list & builder\" v1): sửa flow Active không áp cho contact đang Waiting — contact chạy theo cấu hình lúc vào flow.",
  "conflict_group": "CONF-MTRO-automations-01",
  "related_questions": [
    "Sửa một flow đang Active rồi Save có áp dụng thay đổi cho contact đang Waiting trong flow không (áp ngay, hay contact chạy theo cấu hình lúc vào flow)?",
    "Sửa một flow đang Active rồi Save có áp dụng thay đổi cho contact đang Waiting trong flow không, hay contact chạy theo cấu hình lúc vào flow?"
  ],
  "check_ids": [
    "automation-builder:CHK-013"
  ]
}
```

## OQ-automations-005 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-automations-005",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "automation-builder",
  "summary": "Nhóm rule builder automation do QA lead chốt 18/09/2026 theo bản dựng staging (task Testlane MTRO-017) chưa có xác nhận PO/Dev: cột Automation chỉ hiện tên; Last edited đổi mỗi lần Activate / Pause; node vừa chèn ở Not configured yet và panel giữ Steps & actions; Save là cửa chặn duy nhất (Save / Activate disabled khi thiếu trigger / step / còn step chưa cấu hình) với hint 3 nấc không nêu tên node; dialog Edit automation (tên ≤255, chặn tên rỗng); header /automations/new chỉ có Save + Activate và phải Save lần đầu mới có Test / View runs; lưu flow Active ghi đè ngay, không draft / version; nhãn trigger \"Click to configure →\"; Update contact field phát event contact-updated và event do chính flow phát bị chặn; Send email Configured = template + Subject + From email (domain chưa verify vẫn tính) với From name / From email là ô text tự nhập; Update contact field Configured khi đủ field + New value. PO/Dev cần xác nhận cả nhóm là hành vi mong đợi (hiện chỉ là OBSERVED_CURRENT).",
  "kb_ids": [
    "KB-006",
    "KB-007",
    "KB-033",
    "KB-039",
    "KB-040",
    "KB-041",
    "KB-042",
    "KB-043",
    "KB-044",
    "KB-045",
    "KB-047",
    "KB-055",
    "KB-075",
    "KB-077",
    "KB-078",
    "KB-088",
    "KB-089",
    "KB-094",
    "KB-095",
    "KB-119",
    "KB-129",
    "KB-133"
  ],
  "related_feature_ids": [
    "automation-list",
    "automation-builder",
    "automation-triggers-and-entry",
    "automation-steps",
    "automation-test-run"
  ],
  "related_questions": [
    "PO/Dev có xác nhận nhóm hành vi builder QA lead chốt 18/09/2026 là hành vi mong đợi không (Save là cửa chặn duy nhất, hint 3 nấc không nêu tên node, node vừa chèn giữ panel Steps & actions, tên ≤ 255 và chặn rỗng, phải Save lần đầu mới có Test / View runs, lưu flow Active ghi đè không version)?"
  ]
}
```

## OQ-automations-006 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-automations-006",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "automation-builder",
  "summary": "Jira MTRO-112 (To Do khi QA đọc 07/10/2026) dự kiến đổi để panel tự chuyển sang node vừa chèn, trái với hành vi hiện tại (panel giữ Steps & actions). Khi nào thay đổi này được deploy lên staging, và sau đó case \"chèn node\" phải dùng expected result nào?",
  "kb_ids": [
    "KB-034",
    "KB-033"
  ],
  "related_questions": [
    "Khi Jira MTRO-112 được deploy (panel tự chuyển sang node vừa chèn), case chèn node phải dùng expected result nào và khi nào thay đổi lên staging?"
  ]
}
```

## OQ-automations-007 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-automations-007",
  "type": "OPEN_ISSUE",
  "feature_id": "automation-builder",
  "summary": "Builder automation có các lỗi đang mở trên staging (27/09–01/10/2026): BUG-53 Activate trong builder không hỏi xác nhận (bật flow gửi mail thật bằng 1 click); BUG-56 mở id automation không tồn tại vẫn dựng khung builder + alert Not Found.; builder không báo gì khi template của step Send email bị xoá (id thô, badge vẫn Configured, Activate bấm được — GAP-09); panel phải che node ở 1280×800; BUG-55 không thao tác được ở 375px; BUG-57 nút zoom thiếu accessible name; dialog Edit automation không cuộn / tràn nút với description dài (TC-MTRO-1012); Duplicate node không chuyển panel. Cần Dev xác nhận trạng thái sửa; checklist dùng làm regression watch, không làm expected result.",
  "kb_ids": [
    "KB-056",
    "KB-057",
    "KB-058",
    "KB-059",
    "KB-060",
    "KB-061",
    "KB-062",
    "KB-063",
    "KB-199",
    "KB-202"
  ],
  "related_questions": [
    "Bấm Activate trong builder có phải hiện cùng dialog xác nhận `Activate \"{name}\"?` như khi Activate từ danh sách không?",
    "Khi template đang được step Send email của automation dùng bị xoá, PO muốn chặn việc xoá ở thư viện email hay cho xoá rồi đánh dấu step là chưa hợp lệ (badge, hint, chặn Activate)?",
    "Mở `/automations/<id không tồn tại>` thì app phải hiển thị gì (trang lỗi / 404 riêng, hay chuyển về danh sách kèm thông báo)?",
    "Builder automation phải hỗ trợ viewport tối thiểu bao nhiêu (desktop 1280×800, mobile 375px?) và các nút điều khiển canvas có bắt buộc accessible name không?",
    "Activate trong builder có phải hỏi xác nhận giống Activate ở danh sách không?",
    "Mở `/automations/<id không tồn tại>` phải hiện gì (trang lỗi, redirect về danh sách)?",
    "Automation Reports có lỗi quan sát đang mở trên staging 01/10/2026: Step report hiện id template thô khi template của step Send email đã bị xoá; ở viewport 1280×800 click node Send email trong chế độ Reports bị panel phải chặn nên không xem được Step report. Cần Dev xác nhận trạng thái sửa; checklist dùng làm regression watch."
  ],
  "check_ids": [
    "automation-builder:CHK-014",
    "automation-builder:CHK-015",
    "automation-builder:CHK-017",
    "automation-builder:CHK-018"
  ]
}
```

## OQ-automations-008 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-automations-008",
  "type": "OPEN_ISSUE",
  "feature_id": "automation-builder",
  "summary": "Giới hạn của automation builder chưa có nguồn đáng tin: tối đa 20 step, 10 Send email và độ sâu nhánh (tooDeep) chỉ thấy qua chuỗi i18n / bundle, giá trị độ sâu không được nêu, và chương custom config / feature flag (\"Giới hạn builder\") của inventory tổng không có trong bộ nguồn. Cần Dev cung cấp giới hạn chính thức và thông báo hiển thị.",
  "kb_ids": [
    "KB-051",
    "KB-052"
  ],
  "missing_area": "automation-builder-limits",
  "related_questions": [
    "Giới hạn chính thức của một flow automation là bao nhiêu step, bao nhiêu step Send email và độ sâu nhánh tối đa bao nhiêu; khi vượt giới hạn thì builder hiển thị thông báo gì và chặn ở đâu (chèn node hay Save)?",
    "Giới hạn chính thức của builder là bao nhiêu (số step tối đa, số Send email tối đa, độ sâu nhánh split tối đa) và khi vượt thì thông báo gì?"
  ],
  "check_ids": [
    "automation-builder:CHK-016"
  ]
}
```

## OQ-automations-009 — CONFLICT

```json
{
  "oq_id": "OQ-automations-009",
  "type": "CONFLICT",
  "feature_id": "automation-triggers-and-entry",
  "summary": "Luật re-entry của automation: một contact khớp trigger nhiều lần (sửa nhiều lần, hoặc đang Waiting mà khớp lại) có được tạo thêm run cho cùng flow không? Hai nguồn trái nhau, chưa có quyết định PO/Dev; cần Dev / PO xác nhận staging là lỗi hay rule cần đổi.",
  "kb_ids": [
    "KB-080",
    "KB-081",
    "KB-158"
  ],
  "side_a": "QA lead chốt 18/09/2026 theo bản dựng staging (QA business rule Mailtro, Decision log Mailtro): re-entry once — sửa cùng một contact nhiều lần không tạo thêm run cho cùng flow.",
  "side_b": "Trên staging test-run 27/09/2026 (TC-MTRO-1116, 1107; Known issues ghi đang mở): sửa cùng contact 3 lần tạo 3 run, contact đang Waiting khớp trigger lần nữa vẫn tạo run thứ hai.",
  "conflict_group": "CONF-MTRO-automations-02",
  "related_questions": [
    "Luật re-entry của automation là gì: một contact khớp trigger nhiều lần (sửa nhiều lần, hoặc đang Waiting mà khớp lại) có được tạo thêm run cho cùng flow không; giá trị mặc định của re-entry khi tạo automation là gì và ô Which fields? có ảnh hưởng tới luật này không?",
    "Một contact khớp trigger nhiều lần (sửa nhiều lần, hoặc đang Waiting mà khớp lại) có được tạo thêm run cho cùng flow không?",
    "Nếu giữ re-entry once thì phạm vi là gì: cùng flow, trong khoảng thời gian nào, có tính contact đang Waiting không; và giá trị mặc định của `re_entry.mode` / `cooldown_days` khi tạo automation là gì?"
  ],
  "check_ids": [
    "automation-triggers-and-entry:CHK-010"
  ]
}
```

## OQ-automations-010 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-automations-010",
  "type": "OPEN_ISSUE",
  "feature_id": "automation-triggers-and-entry",
  "summary": "Trên staging 01/10/2026, trigger Contact field changed vẫn hiện nhóm biến What changed › Changed fields và hint \"add a condition on Changed fields\", trái quyết định PO 02/10 BR-34 (không có Changed fields, hint là copy sai). Cần Dev xác nhận sửa UI (gỡ nhóm biến và sửa hint); checklist dùng quyết định PO làm expected, quan sát này làm regression watch.",
  "kb_ids": [
    "KB-073",
    "KB-072"
  ],
  "related_questions": [
    "Khi nào UI gỡ nhóm biến `What changed` › `Changed fields` và sửa hint của `Which fields?` theo quyết định PO 02/10; flow đã lưu có điều kiện Changed fields sẽ được xử lý thế nào?"
  ]
}
```

## OQ-automations-011 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-automations-011",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "automation-triggers-and-entry",
  "summary": "Test-run 27/09/2026 thấy điều kiện Changed fields khớp theo key first_name (không theo nhãn). Sau quyết định PO 02/10 BR-34 (không có Changed fields), Dev cần xác nhận cơ chế này đã bị gỡ hay còn tồn tại ở engine, và flow đã lưu dùng điều kiện Changed fields sẽ xử lý thế nào.",
  "kb_ids": [
    "KB-074",
    "KB-072"
  ]
}
```

## OQ-automations-012 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-automations-012",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "automation-triggers-and-entry",
  "summary": "Nhóm quyết định QA lead chốt thay PO ngày 05/10/2026 (nhãn SMS + import không kích hoạt automation, task Testlane MTRO-018 BR-35) chưa có xác nhận PO/Dev: contact tạo hoặc cập nhật qua bulk upload / import CSV không kích hoạt automation nào (kể cả Contact created và Contact field changed khi import ghi đè), chỉ contact tạo lẻ mới vào trigger. PO cần xác nhận đây là hành vi mong đợi.",
  "kb_ids": [
    "KB-084"
  ],
  "related_questions": [
    "PO có xác nhận contact tạo hoặc cập nhật qua bulk upload / import CSV không kích hoạt automation (kể cả Contact created và Contact field changed khi import ghi đè) là hành vi mong đợi không?"
  ]
}
```

## OQ-automations-013 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-automations-013",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "automation-triggers-and-entry",
  "summary": "Cơ chế chống vòng lặp giữa các automation chưa chốt: khi 2 flow ghi field của nhau (GAP-05 Major) engine cắt vòng lặp thế nào; quan hệ giữa luật re-entry và ô Which fields? (GAP-20 Major); và payload re_entry {mode, cooldown_days} không có UI thì giá trị mặc định là gì. Dev cần xác nhận.",
  "kb_ids": [
    "KB-079",
    "KB-083",
    "KB-082"
  ],
  "related_questions": [
    "Khi hai automation ghi field của nhau (flow A ghi field mà flow B theo dõi và ngược lại), engine cắt vòng lặp thế nào: giới hạn số lần, chặn theo chuỗi event, hay không chặn?",
    "Khi hai flow ghi field của nhau thì engine cắt vòng lặp thế nào, và step Update contact field ghi một field nằm ngoài `Which fields?` có kích hoạt flow khác không?"
  ],
  "check_ids": [
    "automation-triggers-and-entry:CHK-009"
  ]
}
```

## OQ-automations-014 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-automations-014",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "automation-triggers-and-entry",
  "summary": "Jira MTRO-122 (To Do khi QA đọc 07/10/2026) dự kiến thêm trigger \"Contact joins segment\". Thay đổi này đã có lịch deploy chưa và sẽ ảnh hưởng thế nào tới panel Trigger (hiện chỉ 2 lựa chọn Contact created / Contact field changed)?",
  "kb_ids": [
    "KB-085",
    "KB-067"
  ],
  "related_questions": [
    "Trigger \"Contact joins segment\" (Jira MTRO-122) có lịch deploy chưa và panel Trigger sẽ thay đổi thế nào?"
  ]
}
```

## OQ-automations-015 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-automations-015",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "automation-steps",
  "summary": "QA business rule Mailtro (rule Update contact field, bản draft) còn ghi merge tag gõ vào New value (vd {{email}}) được lưu nguyên văn, không có hint, trong khi staging 01/10/2026 chặn tag hai ngoặc thiếu ngoặc và biến lạ, còn coi tag một ngoặc là chữ thường. Câu này còn hiệu lực không? Cần trả lời cùng lúc với việc chốt cú pháp merge tag (mâu thuẫn hai ngoặc / một ngoặc được theo dõi ở Email content — Merge tags).",
  "kb_ids": [
    "KB-138",
    "KB-141",
    "KB-143",
    "KB-144",
    "KB-145"
  ],
  "related_questions": [
    "(Cùng câu hỏi chủ ở Email content — Merge tags, áp cho builder automation) Cú pháp merge tag chính thức trong builder automation là hai ngoặc `{{contact.first_name}}` hay một ngoặc `{contact.first_name}`; dạng còn lại có phải bị cảnh báo / chặn Save không?",
    "Cú pháp merge tag chính thức trong builder automation là hai ngoặc `{{contact.<field>}}` hay một ngoặc `{contact.first_name}`; câu cũ \"merge tag gõ vào New value được lưu nguyên văn, không hint\" còn hiệu lực không?",
    "Gõ biến một ngoặc như `{contact.first_name}` trong builder có nên bị cảnh báo không, hay được coi là chữ thường?"
  ],
  "check_ids": [
    "automation-steps:CHK-018"
  ]
}
```

## OQ-automations-016 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-automations-016",
  "type": "OPEN_ISSUE",
  "feature_id": "automation-steps",
  "summary": "Helper dưới ô From email của step Send email trên staging (29/09–01/10/2026) vẫn ghi \"Must be on one of your workspace's verified sending domains.\" trong khi PO/BA 02/10 BR-27 chốt automation gửi được qua shared sending host khi From email ngoài domain verified. Cần Dev / UX sửa copy; checklist dùng quyết định BR-27 làm expected và không coi helper là rule (topic sending-domain-verification).",
  "kb_ids": [
    "KB-087",
    "KB-086"
  ],
  "related_questions": [
    "Khi nào helper \"Must be on one of your workspace's verified sending domains.\" dưới From email được sửa cho khớp quyết định gửi qua shared sending host (BR-27)?"
  ]
}
```

## OQ-automations-017 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-automations-017",
  "type": "OPEN_ISSUE",
  "feature_id": "automation-steps",
  "summary": "Các step của automation có lỗi validate / hiển thị đang mở trên staging (23/09–06/10/2026): From email / Reply-to sai định dạng chỉ báo toast khi PUT 422 (TC-MTRO-1044, 1046); Wait Duration 0 vẫn badge Configured, node \"0 days\"; Wait rỗng / chữ không có lỗi inline; nhãn Wait không có số ít (\"1 days\"); New value toàn khoảng trắng sau reload thành trống (TC-MTRO-1052, trái rule 18/09); chọn SMS mặc định Afghanistan +93; custom field đang được Update contact field dùng vẫn xoá được (06/10); BUG-54 (ô ngày split nhận text tự do) có vẻ đã sửa nhưng chưa chạy lại. Cần Dev xác nhận trạng thái sửa / retest; checklist dùng làm regression watch.",
  "kb_ids": [
    "KB-099",
    "KB-104",
    "KB-105",
    "KB-106",
    "KB-134",
    "KB-127",
    "KB-136",
    "KB-121"
  ],
  "related_questions": [
    "Duration của step Wait để rỗng hoặc nhập không phải số thì phải hiển thị lỗi gì, và mức tối đa khi Unit là minutes hoặc hours là bao nhiêu?",
    "From email hoặc Reply-to sai định dạng ở step Send email phải được báo lỗi ở đâu (inline khi rời ô, chặn Save, hay badge Not configured) và nội dung thông báo là gì?",
    "Quy tắc chặn xoá custom field đang được dùng (quyết định PO/Dev 01/10/2026 ở phần Custom fields) có áp cho field đang được step Update contact field của automation dùng không; nếu field vẫn bị xoá thì builder và run phải xử lý thế nào?",
    "Ô ngày của split còn nhận text tự do không (BUG-54 có vẻ đã sửa nhưng chưa chạy lại)?"
  ],
  "check_ids": [
    "automation-steps:CHK-003",
    "automation-steps:CHK-015",
    "automation-steps:CHK-025"
  ]
}
```

## OQ-automations-018 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-automations-018",
  "type": "OPEN_ISSUE",
  "feature_id": "automation-steps",
  "summary": "Quan sát 01/10/2026 ở Update contact field (đổi sang SMS vẫn giữ giá trị không phải số, không hiện \"Phone is invalid\"; field Boolean nhận giá trị không phải true/false) được Inventory ghi là nghi lỗi, nhưng PO/BA 02/10 BR-32 sau đó chốt việc không validate theo kiểu là chủ ý. Cần QA lead / Dev xác nhận đóng mục này hay vẫn còn phần lỗi (vd thông báo \"Phone is invalid\" có nên hiện khi rời ô).",
  "kb_ids": [
    "KB-131",
    "KB-130"
  ],
  "related_questions": [
    "Có còn phần lỗi trong việc không hiện \"Phone is invalid\" khi đổi field sang SMS với giá trị không phải số, hay toàn bộ được BR-32 chốt là chủ ý?"
  ]
}
```

## OQ-automations-019 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-automations-019",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "automation-steps",
  "summary": "Engine xử lý thế nào khi step Update contact field ghi giá trị sai kiểu vào contact (hệ quả của BR-32, GAP-38 Major): ghi nguyên giá trị, bỏ qua, hay run Failed? Dev cần xác nhận để có expected result cho run.",
  "kb_ids": [
    "KB-132",
    "KB-130"
  ],
  "related_questions": [
    "Khi step Update contact field ghi giá trị sai kiểu (vd `maybe` vào field Boolean, chuỗi không phải số điện thoại vào SMS), engine phải ghi nguyên giá trị, bỏ qua step, hay cho run Failed?",
    "Engine làm gì khi Update contact field ghi giá trị sai kiểu vào contact (ghi nguyên, bỏ qua hay run Failed)?"
  ],
  "check_ids": [
    "automation-steps:CHK-023"
  ]
}
```

## OQ-automations-020 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-automations-020",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "automation-steps",
  "summary": "Khi template đang được step Send email dùng bị xoá ở Email library, PO muốn chặn việc xoá hay đánh dấu step là chưa hợp lệ (GAP-09)? Hiện staging không chặn xoá, builder không báo và run Failed lúc chạy.",
  "kb_ids": [
    "KB-101",
    "KB-058",
    "KB-178"
  ],
  "related_questions": [
    "Khi template đang được step Send email dùng bị xoá, PO muốn chặn việc xoá hay đánh dấu step chưa hợp lệ?"
  ]
}
```

## OQ-automations-021 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-automations-021",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "automation-steps",
  "summary": "Email (step Send email) được dùng những biến nào? Staging 01/10/2026 không có Created at / Install date trong menu biến của Send email trong khi split có Created at, và bundle có hint \"An email step uses a variable a split can compare but an email can't show\". PO cần chốt danh sách biến email được dùng.",
  "kb_ids": [
    "KB-097",
    "KB-096"
  ],
  "related_questions": [
    "Step Send email được dùng những biến nào (vd Created at / Install date có được dùng trong email không), và khi email dùng một biến chỉ split so được thì builder phải báo gì?",
    "Email được dùng những biến nào (Created at / Install date có được dùng trong Send email không)?"
  ],
  "check_ids": [
    "automation-steps:CHK-016"
  ]
}
```

## OQ-automations-022 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-automations-022",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "automation-steps",
  "summary": "Split rỗng (không có step dưới cả nhánh True lẫn False) có bị chặn chính thức không? Bundle có hint \"A split needs at least one step under True or False\" nhưng Jira AC không có, và câu hỏi mở được tài liệu trỏ tới không có trong bộ nguồn. PO cần xác nhận đây là rule hay chỉ là copy.",
  "kb_ids": [
    "KB-120"
  ],
  "related_questions": [
    "Split không có step dưới cả nhánh True lẫn False có bị chặn Save không — hint \"A split needs at least one step under True or False\" là quy tắc chính thức hay chỉ là copy?",
    "Split rỗng (không có step dưới cả True và False) có bị chặn chính thức không?"
  ],
  "check_ids": [
    "automation-steps:CHK-011"
  ]
}
```

## OQ-automations-023 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-automations-023",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "automation-steps",
  "summary": "Jira MTRO-110 (To Do khi QA đọc 07/10/2026) dự kiến tự đồng bộ subject line / preview text của template vào node Send email. Khi nào deploy, và sau đó Subject line của step còn là ô bắt buộc tự nhập không?",
  "kb_ids": [
    "KB-100",
    "KB-092"
  ],
  "related_questions": [
    "Khi Jira MTRO-110 được deploy (đồng bộ subject / preview text của template vào node), Subject line của step còn là ô bắt buộc tự nhập không?"
  ]
}
```

## OQ-automations-024 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-automations-024",
  "type": "OPEN_ISSUE",
  "feature_id": "automation-test-run",
  "summary": "Test this flow chưa được chạy lại trên staging 01/10/2026: bảng kết quả dry-run, hành vi chạy bản đã lưu khi còn thay đổi chưa lưu và lỗi 404 với contact đã xoá chỉ có từ lần chạy 29/09; schema response của POST automations/{id}/test và role được phép chạy Test không được ghi. Cần khảo sát lại trước khi dùng làm expected result.",
  "kb_ids": [
    "KB-149",
    "KB-150",
    "KB-151",
    "KB-152"
  ],
  "missing_area": "automation-test-run",
  "related_questions": [
    "Response của `POST automations/{id}/test` có cấu trúc thế nào và mã lỗi nào được trả (ngoài 404 contact đã xoá)?"
  ]
}
```

## OQ-automations-025 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-automations-025",
  "type": "OPEN_ISSUE",
  "feature_id": "automation-run-history",
  "summary": "Run history / Run detail có lỗi đang mở trên staging (27/09–01/10/2026): BUG-58 Run detail và Test this flow ghi nhánh split là \"Took the `no` branch.\" (backtick thô, yes / no thay cho True / False); BUG-56 mở Run history của id automation không tồn tại vẫn hiện ô search và bộ lọc cạnh alert Not Found. Cần Dev xác nhận trạng thái sửa; checklist dùng làm regression watch.",
  "kb_ids": [
    "KB-182",
    "KB-183",
    "KB-184"
  ],
  "related_questions": [
    "Mở Run history của id automation không tồn tại thì app phải hiển thị gì (trang lỗi riêng, ẩn search / bộ lọc, hay chuyển về danh sách)?"
  ],
  "check_ids": [
    "automation-run-history:CHK-016"
  ]
}
```

## OQ-automations-026 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-automations-026",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "automation-run-history",
  "summary": "Contact bị suppress đi vào flow automation có được tính vào Sent của khối Delivery hay không (GAP-32)? Quyết định PO/BA 02/10 BR-29 chỉ nói run Completed và được đếm vào Bounced / Spam complaints, không nói tiêu chí chọn vế nào.",
  "kb_ids": [
    "KB-156",
    "KB-155"
  ],
  "related_questions": [
    "Contact bị suppress đi vào flow automation có được tính vào `Sent` của khối Delivery không, và tiêu chí nào quyết định lượt đó được đếm vào Bounced hay Spam complaints?",
    "Contact bị suppress đi vào flow có được tính vào `Sent` của khối Delivery không, và được đếm vào Bounced hay Spam complaints theo tiêu chí nào?"
  ],
  "check_ids": [
    "automation-run-history:CHK-009"
  ]
}
```

## OQ-automations-027 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-automations-027",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "automation-run-history",
  "summary": "Bộ lọc Filter by outcome của Run history có nên tách run Failed ra khỏi outcome Exited không (GAP-25)? Hiện staging 01/10/2026 gộp Failed vào Exited nên không lọc riêng được run lỗi. PO cần xác nhận.",
  "kb_ids": [
    "KB-165",
    "KB-164"
  ],
  "related_questions": [
    "Bộ lọc outcome có nên tách run Failed ra khỏi Exited không?"
  ]
}
```

## OQ-automations-028 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-automations-028",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "automation-run-history",
  "summary": "Nút Retry this run có nên ẩn hoặc disable với lỗi permanent (vd template đã bị xoá, contact đã bị xoá) không (GAP-22)? Staging 01/10/2026 vẫn hiện Retry dù thử lại vô ích. Dev cần xác nhận, kèm điều kiện được Retry và kết quả sau Retry.",
  "kb_ids": [
    "KB-173",
    "KB-174",
    "KB-175",
    "KB-179"
  ],
  "related_questions": [
    "Run Failed nào được Retry (lỗi tạm thời, lỗi permanent như template đã xoá, contact đã unsubscribe / đã xoá), nút Retry có nên ẩn / disable với lỗi permanent không, và sau Retry run tiếp tục trên dòng cũ hay tạo dòng mới?",
    "Retry this run được phép trong điều kiện nào, có ẩn / disable với lỗi permanent (template đã xoá, contact đã xoá, người nhận đã unsubscribe) không, và sau Retry thì run cũ đổi trạng thái gì hay tạo run mới?"
  ],
  "check_ids": [
    "automation-run-history:CHK-013"
  ]
}
```

## OQ-automations-029 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-automations-029",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "automation-run-history",
  "summary": "Ngữ nghĩa run của contact đã bị xoá khi đang Waiting (GAP-26): staging 27/09/2026 thấy run chuyển Failed khi tới hạn, staging 01/10/2026 thấy run vẫn Waiting với Deleted contact và Resumes at nhưng chưa biết kết quả khi tới hạn. PO cần chốt hành vi mong đợi.",
  "kb_ids": [
    "KB-180",
    "KB-179"
  ],
  "related_questions": [
    "Khi contact bị xoá trong lúc run đang Waiting, run phải xử lý thế nào khi tới mốc Resumes at (Failed, Cancelled hay bỏ qua), và có được hiện Retry không?",
    "Run Waiting của contact đã bị xoá thì khi tới mốc Resumes at phải ra sao?"
  ],
  "check_ids": [
    "automation-run-history:CHK-014"
  ]
}
```

## OQ-automations-030 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-automations-030",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "automation-run-history",
  "summary": "Khi node Wait bị xoá trong lúc có run đang Waiting ở node đó (GAP-06), run có giữ mốc Resumes at cũ không và Run detail nên hiện tên step hay UUID node? Staging (TC-MTRO-1103) thấy run vẫn Waiting theo mốc cũ và hiện UUID. PO / Dev cần xác nhận.",
  "kb_ids": [
    "KB-186"
  ],
  "related_questions": [
    "Khi node Wait bị xoá trong lúc có run đang Waiting ở node đó, run phải tiếp tục theo mốc Resumes at cũ, chuyển sang step kế tiếp ngay, hay kết thúc; Run detail phải hiện tên step hay id node?",
    "Khi node Wait bị xoá (hoặc thời lượng Wait bị sửa, hoặc flow bị Pause) trong lúc có run đang Waiting ở node đó, run giữ mốc Resumes at cũ không và Run detail hiện tên step hay UUID node?"
  ],
  "check_ids": [
    "automation-run-history:CHK-015"
  ]
}
```

## OQ-automations-031 — CONFLICT

```json
{
  "oq_id": "OQ-automations-031",
  "type": "CONFLICT",
  "feature_id": "automation-reports",
  "summary": "Automation có node Exit hay không? Quyết định PO/Dev 24/09 nói BE không có node Exit (kết thúc là flow.completed) trong khi Jira MTRO-33 / MTRO-61 và canvas staging 01/10 có node Exit với overlay Entered N; tài liệu tự ghi đây là mâu thuẫn ticket chưa chốt. PO / Dev cần chốt node Exit có tồn tại không và số Entered N trên Exit lấy từ đâu (có phải flow.completed không).",
  "kb_ids": [
    "KB-209",
    "KB-210",
    "KB-211"
  ],
  "side_a": "Theo quyết định PO/Dev 24/09/2026 (Jira MTRO-16 / MTRO-94, ghi trong Decision log Mailtro và QA KB Reports / Run history): automation không có node Exit ở BE, kết thúc là sự kiện flow.completed.",
  "side_b": "Theo Jira MTRO-33, MTRO-61 và staging khảo sát 01/10/2026 (QA KB Reports / Run history, Inventory staging Mailtro \"Automations\"): canvas vẽ node Exit, ở chế độ Reports node Exit hiện overlay Entered N.",
  "conflict_group": "CONF-MTRO-automations-04",
  "related_questions": [
    "Automation có node Exit hay không, và số Entered N trên node Exit ở chế độ Reports có phải lấy từ sự kiện flow.completed (bằng số run Completed) không?",
    "Automation có node Exit hay không, và số Entered N trên node Exit lấy từ đâu (có phải sự kiện flow.completed không)?"
  ],
  "check_ids": [
    "automation-reports:CHK-011"
  ]
}
```

## OQ-automations-032 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-automations-032",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "automation-reports",
  "summary": "Drill-down từ Reports sang run log chưa có rule: link dạng /automations/:id/runs?step=…&event=opened&from=… mất tham số from khi range Custom chưa nhập ngày (staging 01/10/2026). PO cần xác nhận hành vi mong đợi của link khi range Custom chưa đủ ngày (chặn, dùng mặc định hay bỏ lọc ngày).",
  "kb_ids": [
    "KB-201",
    "KB-200"
  ],
  "related_questions": [
    "Link drill-down từ Reports sang run log phải làm gì khi range Custom chưa nhập đủ ngày (chặn, dùng mặc định hay bỏ lọc ngày)?"
  ]
}
```

## OQ-automations-033 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-automations-033",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "automation-reports",
  "summary": "Khối Delivery của Run history tính cả đời flow còn Reports tính theo Report range, nên cùng chỉ số có thể khác nhau (GAP-27). PO cần xác nhận đây là thiết kế mong muốn, và ghi rõ định nghĩa Dropped cùng múi giờ dùng cho range / mốc \"As of\".",
  "kb_ids": [
    "KB-212",
    "KB-161",
    "KB-192"
  ],
  "related_questions": [
    "Khối Delivery của Run history tính cả đời flow còn Reports tính theo Report range — đây có phải thiết kế mong muốn không, và định nghĩa chính xác của Dropped là gì?",
    "Khối Delivery của Run history (cả đời flow) và Reports (theo range) cho số khác nhau có phải thiết kế mong muốn không?"
  ],
  "check_ids": [
    "automation-reports:CHK-013"
  ]
}
```

## OQ-automations-034 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-automations-034",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "automation-list",
  "summary": "Duplicate một automation có tên dài 255 ký tự thì bản sao được đặt tên thế nào (cắt tên, giữ nguyên, thêm hậu tố) và nếu không tạo được thì người dùng thấy thông báo gì?",
  "check_ids": [
    "automation-list:CHK-014"
  ]
}
```

## OQ-automations-035 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-automations-035",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "automation-list",
  "summary": "Khi người dùng của workspace B mở hoặc gọi API với id automation thuộc workspace A, hệ thống phải trả kết quả gì (403, 404 hay trang lỗi), và có đảm bảo không lộ tên, flow hay run của workspace A không?",
  "check_ids": [
    "automation-list:CHK-018"
  ]
}
```

## OQ-automations-036 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-automations-036",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "automation-reports",
  "summary": "Với automation chưa Save lần nào, rail / icon Reports phải bị ẩn hoàn toàn (theo quyết định Dev 25/09/2026) hay hiện ở trạng thái disabled kèm tooltip \"Save to see reports\"?",
  "kb_ids": [
    "KB-217"
  ],
  "check_ids": [
    "automation-reports:CHK-002"
  ],
  "related_questions": [
    "Với automation chưa lưu lần nào, Reports bị ẩn hoàn toàn hay hiện disabled kèm tooltip \"Save to see reports\"?"
  ]
}
```

## OQ-automations-037 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-automations-037",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "automation-reports",
  "summary": "Range Custom của Automation Reports có ngày kết thúc trước ngày bắt đầu thì phải báo lỗi gì và có chặn tải số liệu không; range Custom dùng múi giờ nào và giới hạn khoảng tối đa là bao nhiêu?",
  "kb_ids": [
    "KB-193"
  ],
  "check_ids": [
    "automation-reports:CHK-005"
  ],
  "related_questions": [
    "Report range và mốc \"As of\" dùng múi giờ nào; range Custom có giới hạn (ngày tương lai, khoảng tối đa) và báo lỗi ngày kết thúc trước ngày bắt đầu trên UI không?"
  ]
}
```

## OQ-automations-038 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-automations-038",
  "type": "OPEN_ISSUE",
  "feature_id": "automation-builder",
  "summary": "Kéo thả node có còn đúng như Jira AC §3 trên bản dựng sau 01/10/2026 không (node nào kéo được, thả vào đâu)?",
  "kb_ids": [
    "KB-035",
    "KB-036"
  ]
}
```

## OQ-automations-039 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-automations-039",
  "type": "OPEN_ISSUE",
  "feature_id": "automation-builder",
  "summary": "Automation được dựng ngoài visual builder (ví dụ qua API / MCP) thì mở trong builder ra sao, và thao tác automation qua MCP (Jira MTRO-98) có những hành vi gì?",
  "kb_ids": [
    "KB-053"
  ]
}
```

## OQ-automations-040 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-automations-040",
  "type": "OPEN_ISSUE",
  "feature_id": "automation-triggers-and-entry",
  "summary": "Bật lại flow Paused có chạy bù sự kiện trong lúc tạm dừng không — đây là hành vi mong đợi hay chỉ là quan sát?",
  "kb_ids": [
    "KB-066"
  ]
}
```

## OQ-automations-041 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-automations-041",
  "type": "OPEN_ISSUE",
  "feature_id": "automation-triggers-and-entry",
  "summary": "Node Trigger có hiện nhãn \"This flow starts every time one of these changes: {fields}\" khi chọn field cụ thể không?",
  "kb_ids": [
    "KB-076"
  ]
}
```

## OQ-automations-042 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-automations-042",
  "type": "OPEN_ISSUE",
  "feature_id": "automation-steps",
  "summary": "Duration tối đa của Wait khi Unit là minutes hoặc hours là bao nhiêu?",
  "kb_ids": [
    "KB-102"
  ]
}
```

## OQ-automations-043 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-automations-043",
  "type": "OPEN_ISSUE",
  "feature_id": "automation-steps",
  "summary": "Split có hiện operator cho biến số / custom field kiểu khác (is greater than, is any of, does not start with…) và lỗi ngày không hợp lệ trên UI không?",
  "kb_ids": [
    "KB-114",
    "KB-115",
    "KB-122"
  ]
}
```

## OQ-automations-044 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-automations-044",
  "type": "OPEN_ISSUE",
  "feature_id": "automation-test-run",
  "summary": "Trên bản dựng hiện tại, bảng kết quả dry-run của Test this flow hiển thị những gì cho từng loại step (Wait, split, Send email, Update contact field)?",
  "kb_ids": [
    "KB-149"
  ]
}
```

## OQ-automations-045 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-automations-045",
  "type": "OPEN_ISSUE",
  "feature_id": "automation-test-run",
  "summary": "Dry-run có xử lý Wait thế nào (bỏ qua thời gian chờ hay mô phỏng), và có đánh giá điều kiện split theo dữ liệu hiện tại của contact không?",
  "kb_ids": [
    "KB-149"
  ]
}
```

## OQ-automations-046 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-automations-046",
  "type": "OPEN_ISSUE",
  "feature_id": "automation-run-history",
  "summary": "HTTP method, schema response và mã lỗi của `/runs` và `/runs/{run_id}` là gì?",
  "kb_ids": [
    "KB-188",
    "KB-189",
    "KB-213",
    "KB-214"
  ],
  "related_questions": [
    "HTTP method, schema response và mã lỗi của `/automations/{id}/report` và `/report/steps/{step_id}` là gì?"
  ]
}
```

## OQ-automations-047 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-automations-047",
  "type": "OPEN_ISSUE",
  "feature_id": "automation-run-history",
  "summary": "Một contact khớp trigger lại khi đang có run (kể cả Waiting) thì Run history có thêm dòng mới không?",
  "kb_ids": [
    "KB-081",
    "KB-157",
    "KB-158",
    "KB-170"
  ]
}
```

## OQ-automations-048 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-automations-048",
  "type": "OPEN_ISSUE",
  "feature_id": "automation-reports",
  "summary": "`Dropped` của một step gồm những trường hợp nào?",
  "kb_ids": [
    "KB-204",
    "KB-198"
  ]
}
```
