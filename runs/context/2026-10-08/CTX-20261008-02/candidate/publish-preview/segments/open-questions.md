# Open Questions — Segments — tập contact động theo điều kiện (list, builder, cách đánh giá audience)

Tổng: 23 mục. Sinh từ lần bootstrap đầu tiên (DOC_BOOTSTRAP) của Mailtro, ngày 2026-10-08.

- CONFLICT: 0
- NEEDS_CONFIRMATION: 13
- OPEN_ISSUE: 10

## OQ-segments-001 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-segments-001",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "segment-list-management",
  "summary": "PO đã chốt tên segment không bắt buộc unique (quyết định PO/BA 02/10/2026, BR-14), nhưng chưa chốt (GAP-19) picker Recipients của campaign và picker `Segment to export` phải hiện thêm thông tin gì (ví dụ số contact, ngày tạo, id) để phân biệt hai segment trùng tên. Hiện hai segment trùng tên không phân biệt được (BUG-69). PO cần chốt thông tin hiển thị để có expected result cho picker.",
  "kb_ids": [
    "KB-015",
    "KB-016",
    "KB-017",
    "KB-082"
  ],
  "related_questions": [
    "Khi hai segment trùng tên, picker Recipients của campaign và picker `Segment to export` phải hiện thêm thông tin gì (số contact, ngày tạo, id…) để người dùng phân biệt? Tên segment không bắt buộc unique đã được PO/BA chốt 02/10/2026, nhưng hành vi picker chưa chốt (GAP-19) và hiện hai segment trùng tên không phân biệt được (BUG-69).",
    "Khi hai segment trùng tên, picker Recipients của campaign và picker `Segment to export` phải hiện thêm thông tin gì (số contact, ngày tạo, id...) để phân biệt (GAP-19)?"
  ],
  "check_ids": [
    "segment-list-management:CHK-014"
  ]
}
```

## OQ-segments-002 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-segments-002",
  "type": "OPEN_ISSUE",
  "feature_id": "segment-list-management",
  "summary": "Nhóm lỗi đã biết ở danh sách Segments cần theo dõi làm regression watch, không dùng làm expected result: BUG-94 (P0, nút Delete trong dialog xác nhận không gửi request, segment vẫn còn — gọi thẳng API xoá thì chạy); BUG-68 (query hỏng làm ô Contacts chỉ hiện `—`, count trả 422, không báo lỗi — tài liệu chưa nêu hành vi mong đợi là báo lỗi hay chỉ hiện `—`); BUG-69 (segment trùng tên không phân biệt được ở picker); BUG-70 (tên 255 ký tự tràn bảng, ô tên không có maxlength); BUG-CS-02 (Duplicate 422 im lặng, ghi đã sửa 14/09/2026). Cần trạng thái mới nhất và build đã sửa cho từng lỗi.",
  "kb_ids": [
    "KB-012",
    "KB-013",
    "KB-019",
    "KB-016",
    "KB-018",
    "KB-010"
  ],
  "related_questions": [
    "Khi segment có query hỏng (số đếm trả lỗi), ô Contacts trên danh sách chỉ cần hiện `—` như Jira MTRO-27 AC cho phép, hay phải báo lỗi rõ cho người dùng? Lỗi BUG-68 coi việc không báo lỗi là lỗi nhưng chưa có hành vi mong đợi.",
    "Tên segment dài (tới 255 ký tự) phải hiển thị thế nào trên danh sách Segments (cắt ngắn + tooltip, xuống dòng…)? Hiện tên không bị cắt làm bảng rộng 2415px và trang cuộn ngang (BUG-70), nhưng không có rule hiển thị.",
    "Khi segment có query hỏng, ô Contacts chỉ cần hiện `—` (như AC) hay phải báo lỗi cho người dùng?",
    "Segment của workspace A có bị lộ ở workspace B khi gọi thẳng id segment qua URL hoặc API không?"
  ],
  "check_ids": [
    "segment-list-management:CHK-016",
    "segment-list-management:CHK-017"
  ]
}
```

## OQ-segments-003 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-segments-003",
  "type": "OPEN_ISSUE",
  "feature_id": "segment-list-management",
  "summary": "Chưa có tài liệu API cho segment ngoài `PUT /segments/{id}` (lưu), `GET /segments/{id}/count` (đếm) và `DELETE /segments/{id}` (xoá): thiếu endpoint tạo / liệt kê / duplicate segment, shape request/response và status thành công. Không suy diễn; cần tài liệu API hoặc khảo sát bổ sung trước khi viết test API cho segment.",
  "kb_ids": [
    "KB-013",
    "KB-019"
  ],
  "related_questions": [
    "API tạo, liệt kê và nhân bản segment là endpoint nào, shape request/response và status thành công ra sao?"
  ]
}
```

## OQ-segments-004 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-segments-004",
  "type": "OPEN_ISSUE",
  "feature_id": "segment-list-management",
  "summary": "Khảo sát staging 01/10/2026 không thực hiện các thao tác ghi dữ liệu trên segment (Save, Duplicate, Delete, Export) — chỉ mở dialog rồi Cancel — nên chưa có quan sát mới về phản hồi thật (toast, status, dữ liệu sau thao tác) ở bản dựng đó; bộ test-run và bug log gốc của QA cũng không có trong bộ nguồn và không ghi build. Cần chạy lại các case Duplicate / Delete / Save trên build hiện tại.",
  "kb_ids": [
    "KB-009",
    "KB-011",
    "KB-005",
    "KB-006",
    "KB-081"
  ],
  "related_questions": [
    "Trên build hiện tại, Duplicate / Delete / Export CSV thực sự trả kết quả gì (toast, status, dữ liệu sau thao tác)? Khảo sát 01/10/2026 chỉ mở dialog rồi Cancel."
  ]
}
```

## OQ-segments-005 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-segments-005",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": null,
  "summary": "Ma trận quyền của segment chưa chốt (GAP-07, mức Major): role nào được tạo, sửa, xoá, duplicate, export segment. Hiện mới có quyết định PO 30/09/2026 (Jira MTRO-100) rằng Member không được tạo / sửa segment — nhưng quyết định chỉ mô tả chặn ở nút `Create segment`, chưa nói Member mở / sửa segment có sẵn bị chặn thế nào. Role Admin chưa từng được quan sát (tài khoản Admin là placeholder), mọi khảo sát staging dùng Owner; tên role thứ ba (Member hay tên khác) cũng đang tranh chấp ở phần quản lý role của workspace. Cần PO chốt ma trận quyền segment cho Owner / Admin / Member (và custom role nếu có).",
  "kb_ids": [
    "KB-001",
    "KB-063",
    "KB-067",
    "KB-068"
  ],
  "related_questions": [
    "Ngoài quyết định Member không được tạo / sửa segment (PO 30/09/2026, Jira MTRO-100), Owner, Admin và custom role có được tạo / sửa segment không? Member mở segment có sẵn bị chặn ở đâu và API `PUT /segments/{id}` trả gì cho role không có quyền? Ma trận quyền segment chưa chốt (GAP-07), tên role thứ ba đang tranh chấp.",
    "Owner, Admin, Member và custom role mỗi role được tạo, sửa, xoá, duplicate, export segment hay không? Member mở / sửa segment có sẵn bị chặn ở đâu và báo gì?",
    "Role nào (Owner, Admin, Member, custom role) được xoá, nhân bản và export segment, và role không có quyền thấy gì (mục menu ẩn, vô hiệu, hay bị từ chối khi gửi request)? Hiện mới có quyết định PO 30/09/2026 (Jira MTRO-100) rằng Member không được tạo / sửa segment; ma trận quyền còn lại chưa chốt (GAP-07).",
    "Role nào (Owner / Admin / Member / custom role) được xoá, nhân bản và export segment?"
  ],
  "check_ids": [
    "segment-builder:CHK-032",
    "segment-list-management:CHK-018"
  ]
}
```

## OQ-segments-006 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-segments-006",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "segment-builder",
  "summary": "Quyết định PO 30/09/2026 (Jira MTRO-100) chặn Member tạo / sửa segment ngay ở nút `Create segment` chưa được deploy lên staging tại lần khảo sát 01/10/2026 (ticket In Progress): Member vẫn vào được builder và khi lưu nhận `Couldn't save segment — This action is unauthorized.`. Cần xác nhận MTRO-100 đã deploy chưa và từ build nào, để biết lúc nào dùng quyết định này làm expected result trên staging.",
  "kb_ids": [
    "KB-063",
    "KB-064",
    "KB-066"
  ],
  "related_questions": [
    "Jira MTRO-100 (chặn Member tạo / sửa segment) đã deploy lên staging từ build nào?"
  ]
}
```

## OQ-segments-007 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-segments-007",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "segment-builder",
  "summary": "Copy toast khi Member bị chặn tạo segment chưa chốt cuối: quyết định PO 30/09/2026 (Jira MTRO-100) ghi \"Only workspace Owners and Admins can create segments. Ask an Admin to create it for you.\", còn Dev đề xuất một copy khác có cụm \"…create or edit segments…\". PO cần xác nhận copy cuối cùng sẽ hiện trên UI.",
  "kb_ids": [
    "KB-064",
    "KB-065"
  ],
  "related_questions": [
    "Copy toast cuối cùng khi Member bị chặn tạo segment là copy PO chốt 30/09/2026 (Jira MTRO-100) \"Only workspace Owners and Admins can create segments. Ask an Admin to create it for you.\" hay copy Dev đề xuất có cụm \"…create or edit segments…\"?",
    "Copy toast cuối cùng khi Member bị chặn là copy PO chốt 30/09/2026 hay copy Dev đề xuất có cụm \"…create or edit segments…\"?"
  ],
  "check_ids": [
    "segment-builder:CHK-031"
  ]
}
```

## OQ-segments-008 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-segments-008",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "segment-builder",
  "summary": "Chế độ Advanced (pseudo-SQL) của segment builder: Dev 02/10/2026 (BR-20) cho biết toggle đang được ẩn có chủ ý và builder tự vào Advanced (không có nút quay lại) khi card editor không đọc được query; PO chưa quyết (GAP-01) bỏ hẳn hay bật lại Advanced. Jira MTRO-53 AC mô tả Advanced là cách hiển thị khác của cùng dữ liệu nhưng chưa test được. Cần PO chốt hướng đi để biết AC Advanced còn hiệu lực hay không.",
  "kb_ids": [
    "KB-051",
    "KB-052",
    "KB-053",
    "KB-054"
  ],
  "related_questions": [
    "PO quyết bỏ hẳn hay bật lại chế độ Advanced (pseudo-SQL) của segment builder (GAP-01)? Dev 02/10/2026 cho biết toggle đang ẩn có chủ ý; nếu bật lại thì mô tả trong Jira MTRO-53 AC (`FROM contacts` / `WHERE (...)` / `OR (...)`, monospace, số dòng, × khi hover, hai chế độ là hai cách thể hiện cùng dữ liệu) còn hiệu lực không?",
    "PO quyết bỏ hẳn hay bật lại chế độ Advanced (pseudo-SQL) của builder (GAP-01)?"
  ],
  "check_ids": [
    "segment-builder:CHK-027"
  ]
}
```

## OQ-segments-009 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-segments-009",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "segment-builder",
  "summary": "QA lead chốt 05/10/2026 theo bản dựng staging (chưa có xác nhận PO/Dev) rằng trường số điện thoại của contact mang nhãn `SMS` ở mọi nơi, kể cả dropdown `Condition field` của segment builder; staging hiện vẫn ghi `Phone` (TC-MTRO-289 fail 05/10/2026). Cần PO/Dev xác nhận nhãn chuẩn trong segment builder là `SMS` để coi `Phone` là lỗi.",
  "kb_ids": [
    "KB-028",
    "KB-029",
    "KB-027"
  ],
  "related_questions": [
    "Nhãn chuẩn của trường số điện thoại trong `Condition field` có phải `SMS` (PO/Dev xác nhận) để coi `Phone` là lỗi không?"
  ]
}
```

## OQ-segments-010 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-segments-010",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "segment-builder",
  "summary": "Jira MTRO-120 (To Do) — lọc recipient theo engagement (opened / clicked trong N ngày) — chưa quyết làm trong segment builder hay ở bước Recipients của campaign. Cần PO chốt vị trí tính năng trước khi viết test.",
  "kb_ids": [
    "KB-069"
  ],
  "related_questions": [
    "Lọc recipient theo engagement (opened / clicked trong N ngày, Jira MTRO-120) sẽ nằm trong segment builder hay ở bước Recipients của campaign?"
  ]
}
```

## OQ-segments-011 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-segments-011",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "segment-builder",
  "summary": "Một số hành vi của segment builder chỉ có từ quan sát QA, chưa có xác nhận PO/Dev: AND được ưu tiên hơn OR (`A AND B OR C` = `(A AND B) OR C`, ghi nhận 08/09/2026); BE chặn tên segment dài hơn 255 ký tự; danh sách operator cho field Text (8 operator, mặc định `Equal to`, không còn `In`); nhóm `Contact details` của `Condition field`; guard `Leave without saving?`; danh sách toast phụ (`Segment created`, `Segment saved`, `Couldn't duplicate segment`, `Couldn't delete segment`, `Counting…`, `Count unavailable`) mới thấy trong chuỗi i18n của bundle. Cần PO/Dev xác nhận đây là hành vi mong đợi trước khi dùng làm oracle mạnh.",
  "kb_ids": [
    "KB-025",
    "KB-058",
    "KB-030",
    "KB-027",
    "KB-050",
    "KB-061"
  ],
  "related_questions": [
    "Các toast của segment (`Segment created`, `Segment saved`, `Couldn't save segment` kèm message server, `Couldn't duplicate segment`, `Couldn't delete segment`, `Counting…`, `Count unavailable`) mới thấy trong chuỗi i18n của bundle FE: PO/Dev có xác nhận đây là copy và thời điểm hiển thị mong đợi không?",
    "PO/Dev có xác nhận các hành vi hiện chỉ có từ quan sát QA là hành vi mong đợi không: AND ưu tiên hơn OR, danh sách operator Text, nhóm Contact details, BE chặn tên > 255 ký tự, guard `Leave without saving?`, các toast phụ?"
  ],
  "check_ids": [
    "segment-builder:CHK-029"
  ]
}
```

## OQ-segments-012 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-segments-012",
  "type": "OPEN_ISSUE",
  "feature_id": "segment-builder",
  "summary": "Nhóm lỗi đã biết ở segment builder cần theo dõi làm regression watch, không dùng làm expected result: điều kiện custom field Boolean luôn 422 nhưng toast báo thành công (tái hiện 06/10/2026, TC-MTRO-1535, REOPENED); đổi field Text sang Boolean operator vẫn `Equal to` (REOPENED một phần 06/10/2026); BUG-CS-13 đổi operator xoá trắng value; BUG-97 lưu khi Value trống tạo segment rác (staging 01/10 đã thấy Save disabled, chờ chạy lại case để đóng); BUG-113 segment `Is set` / value chứa ` OR ` không mở lại được bằng card editor; BUG-CS-05 ký tự `\"` bị xoá khi serialize; breadcrumb chỉ hiện mục cuối (Dev 02/10/2026 xác nhận lỗi); nhãn `Phone` thay vì `SMS`; toggle Advanced bị ẩn (giới hạn tạm); Member vẫn vào builder trên staging; BUG-CS-12 (đã sửa 08/09/2026). Cần trạng thái mới nhất và build sửa của từng lỗi.",
  "kb_ids": [
    "KB-035",
    "KB-036",
    "KB-037",
    "KB-049",
    "KB-055",
    "KB-057",
    "KB-060",
    "KB-029",
    "KB-052",
    "KB-066",
    "KB-062"
  ],
  "related_questions": [
    "Khi đổi operator của một điều kiện đã có Value (ví dụ `Equal to` sang `Includes` cùng kiểu Text), Value phải được giữ hay xoá? Hiện staging xoá trắng Value (BUG-CS-13, còn open 06/10/2026) nhưng tài liệu không có rule mong đợi.",
    "Hành vi đúng của segment có điều kiện trên custom field Boolean (ngoài lỗi 422 hiện tại) là gì, và kế hoạch sửa ra sao?"
  ],
  "check_ids": [
    "segment-builder:CHK-015"
  ]
}
```

## OQ-segments-013 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-segments-013",
  "type": "OPEN_ISSUE",
  "feature_id": "segment-builder",
  "summary": "Biên của segment builder chưa được tài liệu nêu: validation tên segment ngoài giới hạn 255 ký tự ở BE (tên chỉ có khoảng trắng, trim, ký tự đặc biệt, FE báo gì khi BE chặn); giới hạn số điều kiện / số card trong một segment; các tuỳ chọn sort được lưu cùng segment và mặc định; cách hiển thị điều kiện trên custom field kiểu Date / Datetime (staging chưa có fixture field Date / Datetime). Không suy diễn; cần bổ sung tài liệu hoặc khảo sát.",
  "kb_ids": [
    "KB-020",
    "KB-021",
    "KB-047",
    "KB-058",
    "KB-032"
  ],
  "related_questions": [
    "Biên của builder: tên chỉ có khoảng trắng / có trim / ký tự đặc biệt xử lý thế nào, FE báo gì khi BE chặn tên dài; giới hạn số điều kiện và số card; sort lưu cùng segment gồm tuỳ chọn nào, mặc định gì; điều kiện trên custom field Date / Datetime hiển thị ra sao?"
  ]
}
```

## OQ-segments-014 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-segments-014",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "segment-audience-evaluation",
  "summary": "Phạm vi của hai phát biểu về số đếm segment chưa được chốt. Một phía: QA business rule bản nháp (Jira MTRO-27, cập nhật 15/09/2026) nói cột Contacts của segment là đánh giá live theo dữ liệu contact hiện tại, membership tự cập nhật khi attribute contact đổi (QA ghi nhận 08/09/2026 contact mới thoả điều kiện làm count tự tăng). Phía kia: quyết định PO/BA 02/10/2026 (task Testlane MTRO-011 BR-27, hỏi lại lần 2) nói bộ đếm `~N contacts` trong builder chỉ cập nhật khi bấm Run, đổi điều kiện không tự tính lại — staging 01/10/2026 quan sát đúng như vậy. Nguồn tự nghi hai bên nói về hai chỗ khác nhau (cột Contacts ở danh sách vs bộ đếm trong builder). Cần PO xác nhận: (1) cột Contacts ở danh sách có tự phản ánh thay đổi dữ liệu contact không; (2) bộ đếm trong builder có tự cập nhật khi dữ liệu contact đổi (không đổi điều kiện) không.",
  "kb_ids": [
    "KB-075",
    "KB-041",
    "KB-042",
    "KB-004"
  ],
  "related_questions": [
    "Cột Contacts ở danh sách Segments có tự phản ánh thay đổi dữ liệu contact (contact mới thoả điều kiện, attribute đổi) không, và bộ đếm `~N contacts` trong builder có tự cập nhật khi dữ liệu contact đổi mà điều kiện không đổi không? Rule nháp Jira MTRO-27 nói đánh giá live; quyết định PO/BA 02/10/2026 (BR-27) chỉ nói bộ đếm builder không tự tính lại khi đổi điều kiện; nguồn nghi hai bên nói về hai chỗ khác nhau.",
    "Cột Contacts ở danh sách Segments có tự phản ánh thay đổi dữ liệu contact (contact mới thoả điều kiện, attribute đổi) không? Bộ đếm trong builder có tự cập nhật khi dữ liệu contact đổi mà điều kiện không đổi không?"
  ],
  "check_ids": [
    "segment-audience-evaluation:CHK-004"
  ]
}
```

## OQ-segments-015 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-segments-015",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "segment-audience-evaluation",
  "summary": "Chưa chốt (GAP-20): campaign đang Scheduled trỏ tới segment đã bị xoá thì lúc tới giờ gửi hệ thống làm gì (huỷ, gửi lỗi, giữ Draft…) và hiện thông báo gì. Quyết định PO/BA 02/10/2026 (BR-15) mới chỉ nói segment đang được dùng vẫn xoá được và report campaign đã gửi hiện \"Segment deleted since this send.\".",
  "kb_ids": [
    "KB-078",
    "KB-014"
  ],
  "check_ids": [
    "segment-audience-evaluation:CHK-007"
  ],
  "related_questions": [
    "Campaign đang Scheduled trỏ tới segment đã bị xoá thì lúc tới giờ gửi hệ thống làm gì (huỷ, lỗi, giữ Draft...) và hiện thông báo gì (GAP-20)?"
  ]
}
```

## OQ-segments-016 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-segments-016",
  "type": "OPEN_ISSUE",
  "feature_id": "segment-audience-evaluation",
  "summary": "Lỗi / rủi ro đã biết liên quan cách segment đánh giá audience: field Number chứa giá trị chữ cộng điều kiện `Greater than` / `Less than` / `Between` làm query ép kiểu `::numeric` lỗi và số đếm trả 500 (Dev 02/10/2026, BR-25; gốc là BE không kiểm kiểu custom field); và cảnh báo sửa lỗi search Contacts không ra contact Unsubscribed sai cách có thể làm segment thôi loại contact bị suppress (regression số đếm). Cần trạng thái và kế hoạch sửa; luôn chạy regression số đếm segment khi đụng query nền danh sách contact. Ngoài ra độ trễ hiển thị bảng kết quả segment khoảng 8–20 giây trên staging chỉ là số đo mẫu của QA, chưa có cam kết hiệu năng nào.",
  "kb_ids": [
    "KB-077",
    "KB-072",
    "KB-071",
    "KB-079"
  ],
  "related_questions": [
    "Khi custom field Number của contact chứa giá trị chữ, điều kiện `Greater than` / `Less than` / `Between` phải xử lý thế nào: contact đó coi là không khớp, bị chặn ngay khi nhập dữ liệu, hay segment báo lỗi rõ? Hiện query ép kiểu `::numeric` lỗi và số đếm trả 500 (Dev 02/10/2026, BR-25); chưa có kế hoạch sửa và hành vi mong đợi.",
    "Lỗi ép kiểu numeric (field Number chứa chữ) có kế hoạch sửa không, và sau khi sửa contact có giá trị chữ được coi là khớp hay không khớp điều kiện so sánh số?",
    "Có cam kết hiệu năng nào cho thời gian hiển thị bảng kết quả segment không?"
  ],
  "check_ids": [
    "segment-audience-evaluation:CHK-006"
  ]
}
```

## OQ-segments-017 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-segments-017",
  "type": "OPEN_ISSUE",
  "feature_id": "segment-audience-evaluation",
  "summary": "Tài liệu câu hỏi mở của QA cho Mailtro (mục Segments) không có trong bộ nguồn, dù nhiều rule segment trỏ tới nó (Consent trong bảng kết quả, tên segment có unique không, Save với điều kiện rỗng, segment hỏng khi gửi campaign). Các câu đã có quyết định PO/BA / Dev 02/10/2026 được dùng theo quyết định; phần còn lại không suy diễn. Cần bổ sung tài liệu để rà các câu còn mở của Segments.",
  "kb_ids": [
    "KB-070",
    "KB-045",
    "KB-015",
    "KB-048",
    "KB-076"
  ]
}
```

## OQ-segments-018 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-segments-018",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "segment-list-management",
  "summary": "Khi người dùng của workspace B mở hoặc gọi API với id segment thuộc workspace A, hệ thống trả gì (trang trắng, 403, 404) và có đảm bảo không đọc / sửa / xoá được segment của A không? Tài liệu segment không nêu rule cô lập dữ liệu giữa workspace.",
  "check_ids": [
    "segment-list-management:CHK-019"
  ]
}
```

## OQ-segments-019 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-segments-019",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "segment-builder",
  "summary": "Tên segment chỉ gồm khoảng trắng có được coi là rỗng (Save disabled) không, và tên có khoảng trắng đầu / cuối có được trim khi lưu không? Ngoài giới hạn 255 ký tự ở BE, tài liệu chưa nêu quy tắc validate tên segment; cũng chưa nêu giới hạn số điều kiện / số card trong một segment.",
  "check_ids": [
    "segment-builder:CHK-023"
  ]
}
```

## OQ-segments-020 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-segments-020",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "segment-audience-evaluation",
  "summary": "Tài liệu segment không nêu rule cô lập dữ liệu: PO/Dev xác nhận số đếm, bảng kết quả và tập người nhận của segment chỉ tính contact của workspace đang mở, kể cả khi cùng tài khoản thuộc nhiều workspace?",
  "check_ids": [
    "segment-audience-evaluation:CHK-008"
  ]
}
```

## OQ-segments-021 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-segments-021",
  "type": "OPEN_ISSUE",
  "feature_id": "segment-builder",
  "summary": "Sửa segment sau khi campaign đã gửi thì report của campaign đó hiển thị gì?",
  "kb_ids": [
    "KB-014",
    "KB-021"
  ]
}
```

## OQ-segments-022 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-segments-022",
  "type": "OPEN_ISSUE",
  "feature_id": "segment-audience-evaluation",
  "summary": "`estimated recipients` của campaign có được PO/Dev xác nhận là luôn bằng cột Contacts của segment không?",
  "kb_ids": [
    "KB-074",
    "KB-071"
  ]
}
```

## OQ-segments-023 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-segments-023",
  "type": "OPEN_ISSUE",
  "feature_id": "segment-audience-evaluation",
  "summary": "Remove field trên contact gỡ key hay set null (GAP-06), và contact đó có khớp điều kiện `Is empty` của segment không?",
  "kb_ids": [
    "KB-039"
  ]
}
```
