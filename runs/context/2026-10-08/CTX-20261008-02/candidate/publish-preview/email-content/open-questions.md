# Open Questions — Email content — Email library (đang đổi tên Templates), Email editor, Saved blocks và merge tag

Tổng: 45 mục. Sinh từ lần bootstrap đầu tiên (DOC_BOOTSTRAP) của Mailtro, ngày 2026-10-08.

- CONFLICT: 3
- NEEDS_CONFIRMATION: 28
- OPEN_ISSUE: 14

## OQ-email-content-001 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-email-content-001",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": null,
  "summary": "Ma trận quyền cho Email library, Email editor, Saved blocks và merge tag theo role Owner / Admin / Member chưa chốt: Member có được tạo, sửa, xoá email do người khác tạo không (GAP-05); sửa / xoá saved block theo người tạo hay theo role (GAP-04); quyền tạo trong điều kiện hiện nút `Save as Block` phụ thuộc gì; tên role thứ 3 chưa thống nhất. Tài liệu chỉ khảo sát bằng Owner và gần như không gắn role cho hành vi nào — cần PO xác nhận ma trận quyền cho các màn này.",
  "kb_ids": [
    "KB-104",
    "KB-105",
    "KB-111",
    "KB-128",
    "KB-134"
  ],
  "related_feature_ids": [
    "email-library",
    "email-editor",
    "merge-tags",
    "saved-blocks"
  ],
  "check_ids": [
    "email-library:CHK-024",
    "email-editor:CHK-021",
    "saved-blocks:CHK-017"
  ],
  "related_questions": [
    "Ma trận quyền của Email library theo role (Owner / Admin / role thứ 3 — tên chính thức đang tranh chấp) là gì: role nào được tạo, import, sửa, nhân bản, xoá email, kể cả email do người khác tạo; chặn ở API trả mã gì?",
    "Ma trận quyền cho Email library theo role (Owner / Admin / role thứ 3, tên đang tranh chấp) là gì: role nào được tạo, sửa, xoá email, kể cả email do người khác tạo?",
    "Role nào (Owner / Admin / role thứ 3 — tên đang tranh chấp) được mở, sửa và lưu email trong editor, kể cả email do người khác tạo? Khi không có quyền, UI và API phản hồi thế nào?",
    "Ma trận quyền cho Email editor theo role (Owner / Admin / role thứ 3, tên đang tranh chấp) là gì: role nào được sửa và lưu email, kể cả email do người khác tạo?",
    "Quyền sửa / xoá saved block theo người tạo hay theo role (Owner / Admin / role thứ 3)? Saved block do người khác tạo có phải hiện `View` và mở chỉ đọc với thông báo \"You can open this block but not save it — it was created by someone else.\" không? Role nào được `Save as Block`?",
    "Quyền sửa / xoá saved block theo người tạo hay theo role (Owner / Admin / role thứ 3), và `View` / chỉ đọc cho block của người khác có đúng trên UI không?"
  ]
}
```

## OQ-email-content-002 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-email-content-002",
  "type": "OPEN_ISSUE",
  "feature_id": "email-library",
  "summary": "Chưa có khảo sát nào cho Email library, Email editor, Saved blocks và merge tag bằng role Admin hoặc Member (chỉ có tài khoản Owner); hành vi của các role này ở các màn trên chưa được ghi nhận. Cần khảo sát bổ sung trước khi viết case theo role.",
  "kb_ids": [
    "KB-009",
    "KB-104",
    "KB-105"
  ],
  "related_feature_ids": [
    "email-library",
    "email-editor",
    "merge-tags",
    "saved-blocks"
  ],
  "missing_area": "role-coverage"
}
```

## OQ-email-content-003 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-email-content-003",
  "type": "OPEN_ISSUE",
  "feature_id": "email-library",
  "summary": "Build/version của bản dựng staging không được ghi ở tài liệu nào (chỉ có ngày khảo sát 16/09, 29/09, 01/10/2026); nhiều luồng chỉ có từ bundle front-end, chưa đối chiếu UI ngày 01/10/2026 (`New email` và dialog lúc tạo, Import HTML, Duplicate, Delete đơn lẻ và hàng loạt, toast, empty state, phân trang nhiều trang, `Save as Block`, danh sách saved block có data). Cần ghi build và đi lại các luồng này trên UI.",
  "kb_ids": [
    "KB-013",
    "KB-015",
    "KB-017",
    "KB-024",
    "KB-025",
    "KB-030",
    "KB-031",
    "KB-032",
    "KB-033",
    "KB-034",
    "KB-043",
    "KB-053",
    "KB-054",
    "KB-103",
    "KB-109"
  ],
  "related_feature_ids": [
    "email-library",
    "email-editor",
    "merge-tags",
    "saved-blocks"
  ],
  "missing_area": "build-and-ui-verification",
  "related_questions": [
    "Các luồng chỉ có từ bundle front-end (toast tạo / xoá / import / duplicate, empty state, Delete đơn lẻ, phân trang nhiều trang) hiển thị thế nào trên UI, và build staging nào đang được mô tả?"
  ]
}
```

## OQ-email-content-004 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-email-content-004",
  "type": "OPEN_ISSUE",
  "feature_id": "email-library",
  "summary": "Chưa có quan sát nào trên mail thật gửi đi: merge tag được thay giá trị thế nào lúc gửi (giá trị rỗng / contact thiếu field render ra gì), nội dung saved block trong mail gửi sau khi sửa, và dark mode có được render vào mail không. Cần gửi thật tới hộp thư QA để có oracle.",
  "kb_ids": [
    "KB-041",
    "KB-119",
    "KB-133",
    "KB-057",
    "KB-098"
  ],
  "related_feature_ids": [
    "email-library",
    "email-editor",
    "merge-tags",
    "saved-blocks"
  ],
  "missing_area": "sent-mail-rendering"
}
```

## OQ-email-content-005 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-email-content-005",
  "type": "OPEN_ISSUE",
  "feature_id": "email-library",
  "summary": "Thiếu tài liệu nguồn: bản inventory staging đầy đủ (các mục lệch được trỏ tới như chi tiết tab Issues, nhãn SMS, case merge tag không có trong bộ nguồn); description Jira MTRO-36 (Duplicate), MTRO-51 (HTML to JSON), MTRO-58 (API mail template) đều trống; route API của Save editor, Delete và bước GET / POST của Duplicate không được ghi. Không suy diễn; cần bổ sung tài liệu hoặc khảo sát lại.",
  "kb_ids": [
    "KB-030",
    "KB-031",
    "KB-025",
    "KB-053"
  ],
  "related_feature_ids": [
    "email-library",
    "email-editor",
    "merge-tags",
    "saved-blocks"
  ],
  "missing_area": "linked-docs-and-api-routes",
  "related_questions": [
    "Route API cụ thể của Delete và bước GET / POST của Duplicate là gì (description Jira MTRO-36, MTRO-51, MTRO-58 đều trống)?"
  ]
}
```

## OQ-email-content-006 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-email-content-006",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "email-library",
  "summary": "PO đã quyết ngày 30/09/2026 (Jira MTRO-99) đổi `Email library` thành `Templates` (sidebar, page title, breadcrumbs, nút `New template`, nút ở campaign, text Claude MCP), nhưng staging 01/10/2026 vẫn hiện `Email library`. Thay đổi này đã deploy lên staging / production chưa và từ ngày nào thì checklist phải assert theo tên mới?",
  "kb_ids": [
    "KB-001",
    "KB-002",
    "KB-003"
  ],
  "related_questions": [
    "Việc đổi tên `Email library` thành `Templates` (quyết định PO 30/09/2026, Jira MTRO-99) đã deploy lên staging / production chưa, từ ngày nào thì checklist phải assert theo tên mới?"
  ]
}
```

## OQ-email-content-007 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-email-content-007",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "email-library",
  "summary": "Nhóm hành vi Email library và Email editor do QA lead chốt ngày 30/09/2026 'nghiệm thu theo bản dựng staging' (task Testlane MTRO-021 BR-21…BR-43: list, sort, phân trang, bulk bar, New email và dialog Email details, Preview, editor, picker 50 email ở Campaign, folder ngoài phạm vi) chưa có xác nhận PO/Dev. PO/Dev có chấp nhận hành vi bản dựng này là hành vi mong đợi không?",
  "kb_ids": [
    "KB-004",
    "KB-005",
    "KB-007",
    "KB-008",
    "KB-009",
    "KB-010",
    "KB-011",
    "KB-012",
    "KB-014",
    "KB-016",
    "KB-018",
    "KB-023",
    "KB-038",
    "KB-040",
    "KB-041",
    "KB-042",
    "KB-044",
    "KB-047",
    "KB-050",
    "KB-051",
    "KB-052",
    "KB-055",
    "KB-056",
    "KB-058",
    "KB-060",
    "KB-061",
    "KB-063",
    "KB-064",
    "KB-065",
    "KB-066",
    "KB-067",
    "KB-068",
    "KB-070",
    "KB-072",
    "KB-073",
    "KB-094",
    "KB-111"
  ],
  "related_feature_ids": [
    "email-library",
    "email-editor",
    "merge-tags",
    "saved-blocks"
  ],
  "related_questions": [
    "PO/Dev có chấp nhận hành vi bản dựng staging của Email library (list, sort, phân trang, bulk bar, New email, dialog Email details, Preview, picker 50 email) mà QA lead chốt 30/09/2026 là hành vi mong đợi không?"
  ]
}
```

## OQ-email-content-008 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-email-content-008",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "email-library",
  "summary": "Hành vi 'không có copy-on-write giữa các campaign Draft dùng cùng email; campaign Sent đóng băng' được chốt ngày 25/08/2026 khi chạy wizard (TC-MTRO-208) nhưng tài liệu không ghi ai chốt và chưa có xác nhận PO/Dev. PO/Dev có xác nhận đây là hành vi mong đợi không?",
  "kb_ids": [
    "KB-048",
    "KB-049"
  ],
  "related_questions": [
    "Hành vi không copy-on-write giữa các campaign Draft và đóng băng nội dung campaign Sent (chốt 25/08/2026, không ghi người chốt) có được PO/Dev xác nhận không?"
  ]
}
```

## OQ-email-content-009 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-email-content-009",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "email-library",
  "summary": "Staging 01/10/2026 cho xoá email đang được campaign Draft hoặc automation dùng mà không chặn; sau đó automation bị Failed và campaign Draft dùng chung email bị ảnh hưởng. PO muốn chặn xoá, cảnh báo, hay giữ như hiện tại (GAP-04 task Testlane MTRO-021, GAP-09 task Testlane MTRO-018)? Áp dụng thế nào khi email đang được saved block / campaign Scheduled dùng?",
  "kb_ids": [
    "KB-035",
    "KB-036",
    "KB-037"
  ],
  "related_questions": [
    "Xoá email đang được campaign Draft / Scheduled, automation hoặc saved block dùng: phải chặn, cảnh báo, hay giữ như hiện tại (không chặn)?",
    "Sau khi email bị xoá, campaign Draft đang dùng email đó hiển thị gì?",
    "Xoá email đang được campaign Draft (hoặc Scheduled) dùng: phải chặn, cảnh báo hay cho xoá như hiện tại? Sau khi xoá, campaign Draft hiển thị gì ở bước nội dung và có được Send / Schedule không?"
  ],
  "check_ids": [
    "email-library:CHK-017"
  ]
}
```

## OQ-email-content-010 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-email-content-010",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "email-library",
  "summary": "Theo bundle, selection ở Email library được giữ khi đổi trang / sắp xếp / số dòng (nên bulk Delete có thể xoá dòng không còn thấy trên màn) và bulk Delete xoá tuần tự từng id, không rollback khi lỗi giữa chừng. Đây có phải chủ ý không, và khi lỗi một phần thì UI phải báo gì (GAP-14, GAP-16)?",
  "kb_ids": [
    "KB-032",
    "KB-033",
    "KB-034"
  ],
  "related_questions": [
    "Khi chọn email ở trang 1 rồi chuyển trang / đổi sắp xếp / đổi số dòng, selection có được giữ lại không, và bulk Delete có được phép xoá cả email không còn hiện trên màn không (GAP-16)? Khi một request xoá lỗi giữa chừng, các email đã xoá có được rollback không và UI phải báo gì (GAP-14)?",
    "Selection giữ qua đổi trang / sắp xếp / số dòng và bulk Delete xoá tuần tự không rollback có phải chủ ý không; khi lỗi giữa chừng UI phải báo gì?"
  ],
  "check_ids": [
    "email-library:CHK-015"
  ]
}
```

## OQ-email-content-011 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-email-content-011",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "email-library",
  "summary": "`New email` tạo bản ghi `Untitled email` ngay khi bấm; nếu người dùng bấm `Cancel` ở dialog Email details thì bản ghi đó phải còn lại trong thư viện hay bị xoá (GAP-06)?",
  "kb_ids": [
    "KB-016",
    "KB-018"
  ],
  "related_questions": [
    "Sau khi bấm `New email` rồi `Cancel` ở dialog Email details, bản ghi `Untitled email` đã được tạo ngay khi bấm `New email` phải còn lại trong thư viện hay bị xoá? (GAP-06)",
    "Bấm `Cancel` ở dialog Email details sau `New email` thì bản ghi `Untitled email` đã tạo còn lại trong thư viện hay bị xoá?"
  ],
  "check_ids": [
    "email-library:CHK-007"
  ]
}
```

## OQ-email-content-012 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-email-content-012",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "email-library",
  "summary": "Picker chọn email ở Campaign chỉ nạp 50 email sửa gần nhất (không phân trang, không tìm kiếm). Giới hạn 50 có chủ ý không, và có định thêm tìm kiếm / phân trang không (GAP-18)?",
  "kb_ids": [
    "KB-047"
  ]
}
```

## OQ-email-content-013 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-email-content-013",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "email-library",
  "summary": "Preview trong Email library hiện nguyên merge tag (vd `Hi {{contact.first_name}},`) và link Unsubscribe giữ nguyên tag, không thay bằng giá trị mẫu. Đây có phải ý đồ thiết kế không (GAP-08)?",
  "kb_ids": [
    "KB-041"
  ],
  "related_questions": [
    "Preview hiện nguyên merge tag và link Unsubscribe giữ nguyên tag (không thay giá trị mẫu) có phải ý đồ thiết kế không?"
  ]
}
```

## OQ-email-content-014 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-email-content-014",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "email-library",
  "summary": "Các tính năng Email library đang ở trạng thái To Do / chưa lên staging: folder dạng list phẳng (Jira MTRO-115), Import từ Brevo (Jira MTRO-104, BE xong 06/10/2026), chia sẻ template cho người ngoài (Jira MTRO-119, chưa chốt phương án), dialog Email details blocking (Jira MTRO-90). Khi nào deploy và nội dung spec hiện tại còn đúng không?",
  "kb_ids": [
    "KB-006",
    "KB-019",
    "KB-026",
    "KB-045"
  ],
  "related_questions": [
    "Folder dạng list phẳng (Jira MTRO-115), Import từ Brevo (Jira MTRO-104), chia sẻ template cho người ngoài (Jira MTRO-119) và dialog Email details blocking (Jira MTRO-90) khi nào lên staging, spec hiện tại còn đúng không?"
  ]
}
```

## OQ-email-content-015 — CONFLICT

```json
{
  "oq_id": "OQ-email-content-015",
  "type": "CONFLICT",
  "feature_id": "email-library",
  "summary": "Dialog Email details có ô `Preview text` hay không? Jira MTRO-90 (To Do, spec prototype) mô tả có ô `Preview text` (optional), còn staging 29/09/2026 không có ô này và preheader nằm ở tab Settings của editor. Bên nào là hành vi mong đợi?",
  "kb_ids": [
    "KB-020",
    "KB-021"
  ],
  "side_a": "Theo Jira MTRO-90 (To Do, spec prototype, đọc 07/10/2026), dialog Email details có thêm ô `Preview text` (optional).",
  "side_b": "Trên staging (khảo sát 29/09/2026), dialog Email details không có ô Preview text; preheader nằm ở tab `Settings` của editor.",
  "conflict_group": "CONF-MTRO-email-content-03",
  "related_questions": [
    "Dialog Email details lúc tạo email phải có ô `Preview text` (optional) và chặn đóng bằng Esc / click ngoài / nút close khi Subject trống như spec Jira MTRO-90, hay giữ như bản dựng staging (không có ô Preview text, preheader nằm ở tab Settings của editor)?",
    "Dialog Email details có ô `Preview text` (theo Jira MTRO-90) hay giữ như bản dựng (preheader ở tab Settings của editor)?"
  ],
  "check_ids": [
    "email-library:CHK-008"
  ]
}
```

## OQ-email-content-016 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-email-content-016",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "email-library",
  "summary": "Chưa có boundary: độ dài tối đa và việc cho trùng tên `Email name`, độ dài Subject line, số template tối đa của workspace, kích thước file HTML tối đa khi import, Preheader vượt 150 ký tự; với saved block: ràng buộc tên / category / số lượng và ngưỡng hiệu năng (GAP-10, GAP-13, GAP-06). PO/Dev cần chốt các giới hạn này.",
  "kb_ids": [
    "KB-024",
    "KB-067",
    "KB-115"
  ],
  "related_feature_ids": [
    "email-library",
    "email-editor",
    "saved-blocks"
  ],
  "related_questions": [
    "Boundary của Email library là gì: độ dài tối đa và việc cho trùng `Email name`, độ dài Subject line, số email tối đa của workspace, kích thước file HTML tối đa khi import?"
  ]
}
```

## OQ-email-content-017 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-email-content-017",
  "type": "OPEN_ISSUE",
  "feature_id": "email-library",
  "summary": "Bug Jira MTRO-114 (In Progress, theo báo cáo từ production 01–02/10/2026): email tạo qua Claude MCP hoặc Import HTML bị đổi màu nền content, chỉ block cuối còn trắng. Theo dõi như regression watch cho tới khi Jira đóng; cần xác nhận có tái hiện trên staging không.",
  "kb_ids": [
    "KB-027"
  ],
  "related_questions": [
    "Email tạo qua Import HTML hoặc Claude MCP từ template nguồn nền trắng có phải giữ nguyên màu nền content của mọi block không? Lỗi Jira MTRO-114 (theo báo cáo từ production) có tái hiện trên staging và đã được sửa chưa?",
    "Lỗi đổi màu nền content của email tạo qua Claude MCP / Import HTML (Jira MTRO-114, theo báo cáo từ production) có tái hiện trên staging không, và đã sửa chưa?"
  ],
  "check_ids": [
    "email-library:CHK-011"
  ]
}
```

## OQ-email-content-018 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-email-content-018",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "email-editor",
  "summary": "Tab `Issues` của email editor luôn rỗng vì Mailtro khởi tạo editor không truyền cấu hình bộ kiểm tra, nên merge tag sai chỉ bị phát hiện lúc Send hoặc khi automation Failed. Đây là giới hạn chủ ý hay Dev sẽ bật bộ kiểm tra?",
  "kb_ids": [
    "KB-068",
    "KB-069"
  ],
  "related_questions": [
    "Email chứa merge tag sai cú pháp hoặc không tồn tại phải bị phát hiện ở đâu: lúc thiết kế trong editor, lúc Send campaign, hay chỉ khi run automation bị Failed? Thông báo mong đợi là gì?",
    "Tab `Issues` luôn rỗng (không cảnh báo merge tag sai) là giới hạn chủ ý hay Dev sẽ bật bộ kiểm tra?"
  ],
  "check_ids": [
    "email-editor:CHK-018"
  ]
}
```

## OQ-email-content-019 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-email-content-019",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "email-editor",
  "summary": "Dark mode có được render vào email gửi đi không? Bundle có chuỗi báo 'dark mode chưa render vào mail gửi' nhưng không hiển thị; người dùng bật `Dark Mode Preview` không được báo. Dev/UX có định hiện thông báo này không?",
  "kb_ids": [
    "KB-057",
    "KB-056"
  ],
  "related_questions": [
    "Dark mode có được render vào mail gửi đi không? Khi người dùng bật `Dark Mode Preview`, editor có phải hiện thông báo rằng dark mode chưa được áp vào mail thật không (chuỗi này có trong bundle nhưng không được dùng)?",
    "Dark mode có được render vào mail gửi đi không, và có hiện thông báo cho người dùng khi bật `Dark Mode Preview` không?"
  ],
  "check_ids": [
    "email-editor:CHK-016"
  ]
}
```

## OQ-email-content-020 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-email-content-020",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "email-editor",
  "summary": "Các thay đổi editor chưa lên staging 01/10/2026: custom font Outfit / Nunito Sans (Jira MTRO-111, To Do), border / background / border radius cho section (Jira MTRO-105, In Progress) và việc nâng SDK editor lên v0.42.0. Đã deploy chưa, và backend đã nâng renderer cùng phiên bản để mail gửi khớp preview chưa?",
  "kb_ids": [
    "KB-075",
    "KB-063",
    "KB-078"
  ],
  "related_questions": [
    "Tuỳ chọn border / background / radius cho section (Jira MTRO-105) đã lên staging chưa, và renderer gửi mail ở backend đã được nâng cùng phiên bản SDK editor để mail gửi đi có viền / nền / bo góc giống preview chưa?",
    "Font brand Outfit / Nunito Sans (Jira MTRO-111), border / background / radius cho section (Jira MTRO-105) và bản nâng SDK editor đã lên staging chưa; backend đã nâng renderer cùng phiên bản chưa?"
  ],
  "check_ids": [
    "email-editor:CHK-020"
  ]
}
```

## OQ-email-content-021 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-email-content-021",
  "type": "OPEN_ISSUE",
  "feature_id": "email-editor",
  "summary": "Lỗi nhỏ đang mở: mở `/templates/<id>` không tồn tại hoặc đã xoá thì editor hiện `Not saved` + alert `Not Found.` thay vì màn not-found riêng. Theo dõi như regression watch; cần Dev/UX chốt màn not-found mong đợi.",
  "kb_ids": [
    "KB-071"
  ],
  "related_questions": [
    "Mở `/templates/<id>` với id không tồn tại hoặc đã xoá thì màn mong đợi là gì (màn not-found riêng, thông báo `Could not load this email.`, hay điều hướng về danh sách)? Hiện trạng hiện `Not saved` + alert `Not Found.` + nút `Reload` đang được ghi là lỗi.",
    "Mở `/templates/<id>` không tồn tại hoặc đã xoá thì màn not-found mong đợi là gì (hiện tại hiện `Not saved` + alert `Not Found.`)?"
  ],
  "check_ids": [
    "email-editor:CHK-019"
  ]
}
```

## OQ-email-content-022 — CONFLICT

```json
{
  "oq_id": "OQ-email-content-022",
  "type": "CONFLICT",
  "feature_id": "saved-blocks",
  "summary": "Block linked với saved block phải 'khoá cứng' (description Jira MTRO-89) hay được sửa tại chỗ và tự detach khi Save (thiết kế Dev 08/09/2026)? PO chưa xác nhận chấp nhận detach (GAP-03), và chưa chốt thao tác nào gây detach (GAP-05).",
  "kb_ids": [
    "KB-126",
    "KB-127",
    "KB-128"
  ],
  "side_a": "Theo description Jira MTRO-89 (Story Saved block, QA Review, đọc 07/10/2026), block linked với saved block phải được 'khoá cứng' trong email.",
  "side_b": "Theo thiết kế Dev ngày 08/09/2026 (Jira MTRO-89 comment), 'khoá cứng' không làm được; sửa block linked trong email rồi Save thì cả run tách khỏi saved block gốc (detach) và không nhận cập nhật nữa.",
  "conflict_group": "CONF-MTRO-email-content-02",
  "related_questions": [
    "Block linked với saved block trong email phải bị khoá cứng (description Jira MTRO-89) hay được sửa tại chỗ và tự tách link khi Save (thiết kế Dev 08/09/2026, PO chưa xác nhận)? Nếu tách, những thao tác nào gây tách (kéo đổi thứ tự, xoá một block trong dải, chèn giữa dải, Duplicate) và chỉ báo trên UI mong đợi là gì?",
    "Block linked với saved block phải 'khoá cứng' (description Jira MTRO-89) hay được sửa tại chỗ và tự detach khi Save (thiết kế Dev 08/09/2026)? Nếu detach, thao tác nào gây detach (kéo đổi thứ tự, xoá một block trong run, chèn giữa run, Duplicate)?"
  ],
  "check_ids": [
    "saved-blocks:CHK-015"
  ]
}
```

## OQ-email-content-023 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-email-content-023",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "saved-blocks",
  "summary": "Phần đồng bộ saved block phía backend (resolve-on-read lúc gửi, hash cache theo `savedBlockId:updated_at`) đã lên staging chưa (GAP-01), và PR #27 (nút `New saved block`, cảnh báo detach) đã deploy chưa (GAP-02)? Nếu front-end có mà backend chưa thì preview mới nhưng mail gửi mang nội dung cũ.",
  "kb_ids": [
    "KB-133",
    "KB-114",
    "KB-115",
    "KB-116",
    "KB-118",
    "KB-119",
    "KB-120",
    "KB-102"
  ],
  "related_questions": [
    "Đồng bộ saved block phía backend (resolve-on-read lúc gửi, hash cache theo `savedBlockId:updated_at`) và PR #27 (`New saved block`, chỉ báo detach) đã lên staging chưa?",
    "Mail thật gửi đi sau khi sửa hoặc xoá saved block có mang nội dung mới / mất section đúng như thiết kế không?"
  ]
}
```

## OQ-email-content-024 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-email-content-024",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "saved-blocks",
  "summary": "Block gốc dùng để tạo saved block bằng `Save as Block` không tự link tới saved block vừa tạo (saved block hiện `Not used yet`); chỉ block chèn qua `Browse saved blocks` mới được đếm `Used in`. Đây có đúng ý đồ của PO không (GAP-07)?",
  "kb_ids": [
    "KB-130",
    "KB-129"
  ],
  "related_questions": [
    "Block gốc dùng để tạo saved block bằng `Save as Block` không tự link tới saved block vừa tạo (hiện `Not used yet`) có đúng ý đồ PO không?"
  ]
}
```

## OQ-email-content-025 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-email-content-025",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "saved-blocks",
  "summary": "Các trường hợp saved block chưa chốt: Duplicate template / Duplicate design / Import HTML có giữ link tới saved block không (GAP-09); hai người hoặc hai tab cùng sửa một saved block, UI khi API saved block lỗi, và backend gửi mail khi không đọc được entry (GAP-10, GAP-11); campaign Scheduled / Sent hiển thị và gửi nội dung nào sau khi saved block đổi (GAP-15).",
  "kb_ids": [
    "KB-135",
    "KB-122"
  ],
  "related_questions": [
    "Sau khi sửa saved block, campaign Scheduled gửi nội dung mới nhất hay nội dung lúc lên lịch? Campaign Sent hiển thị nội dung cũ (đã đóng băng) hay nội dung mới của saved block? (GAP-15)",
    "Duplicate template, `Duplicate design` hoặc Import HTML có giữ link tới saved block không (bản sao có đổi theo khi sửa saved block, có được đếm vào `Used in` không)? Hai người / hai tab cùng sửa một saved block thì bản nào thắng?",
    "Campaign ở trạng thái Scheduled / Sent hiển thị và gửi nội dung nào sau khi saved block thay đổi?",
    "Duplicate template, Duplicate design hoặc Import HTML có giữ link tới saved block không; hai người / hai tab cùng sửa một saved block thì sao; UI hiển thị gì khi API saved block lỗi?"
  ],
  "check_ids": [
    "saved-blocks:CHK-016",
    "saved-blocks:CHK-019"
  ]
}
```

## OQ-email-content-026 — CONFLICT

```json
{
  "oq_id": "OQ-email-content-026",
  "type": "CONFLICT",
  "feature_id": "merge-tags",
  "summary": "Cú pháp merge tag mong đợi là hai ngoặc `{{…}}` hay một ngoặc `{…}`? Quyết định PO/BA 02/10/2026 và bản dựng staging 01/10/2026 dùng hai ngoặc, còn description Jira MTRO-92 mục 10 ghi một ngoặc và từ chối `{{…}}` khi lưu; Jira chưa được sửa. Cần PO/Dev phân xử và sửa nguồn còn lại. Đây là OQ CONFLICT duy nhất cho tranh chấp này; automations, campaigns, contacts trỏ về đây.",
  "kb_ids": [
    "KB-080",
    "KB-081",
    "KB-082",
    "KB-093",
    "KB-096",
    "KB-099"
  ],
  "side_a": "Theo quyết định PO/BA ngày 02/10/2026 (task Testlane MTRO-018 BR-30), merge tag dùng cú pháp hai ngoặc (`{{contact.first_name}}`, `{{contact.attr.<key>}}`, `{{unsubscribe_url}}`, `{{preferences_url}}`…); staging khảo sát 01/10/2026 cũng dùng hai ngoặc. Cùng phía: automations và campaigns, contacts (theo cùng quyết định PO/BA 02/10/2026).",
  "side_b": "Theo description Jira MTRO-92 mục 10 (QA Review, đọc 07/10/2026), merge tag dùng cú pháp một ngoặc (`{contact.first_name}`) và nội dung có `{{…}}` bị từ chối khi lưu với thông báo yêu cầu viết một ngoặc. Mọi item phía này ở object khác cũng mang conflict_group CONF-MTRO-email-content-01.",
  "conflict_group": "CONF-MTRO-email-content-01",
  "related_questions": [
    "Cú pháp merge tag mong đợi là hai ngoặc `{{…}}` (quyết định PO/BA 02/10/2026, đang dùng trên bản dựng staging 01/10/2026) hay một ngoặc `{…}` (Jira MTRO-92 mục 10, từ chối `{{…}}` khi lưu kể cả qua Claude MCP)? Nguồn nào sẽ được sửa cho khớp?",
    "Với cú pháp merge tag đang dùng, CSS dạng `a { color: red }` trong nội dung có được giữ nguyên (không bị coi là merge tag, không bị từ chối khi lưu) không?",
    "Cú pháp merge tag mong đợi là hai ngoặc `{{…}}` (quyết định PO/BA 02/10/2026, bản dựng staging 01/10/2026) hay một ngoặc `{…}` (Jira MTRO-92 mục 10, từ chối `{{…}}` khi lưu)? Nguồn nào sẽ được sửa?",
    "Cú pháp merge tag đúng là hai ngoặc {{…}} (quyết định PO 02/10/2026, staging 01/10/2026) hay một ngoặc như Jira MTRO-92 §10? Cần PO/Dev chốt một cú pháp duy nhất cho nội dung campaign.",
    "Cú pháp merge tag đúng cho nội dung campaign là hai ngoặc {{…}} (quyết định PO 02/10/2026, staging 01/10/2026) hay một ngoặc như Jira MTRO-92 §10 (nội dung dùng {{…}} bị từ chối khi lưu)? Cần PO/Dev chốt một cú pháp duy nhất.",
    "Cú pháp merge tag đúng cho nội dung campaign là hai ngoặc `{{…}}` (quyết định PO 02/10/2026, staging 01/10/2026) hay một ngoặc như Jira MTRO-92 §10?"
  ],
  "check_ids": [
    "merge-tags:CHK-001",
    "merge-tags:CHK-009",
    "campaign-wizard:CHK-039"
  ],
  "also_affects": [
    {
      "object_id": "campaigns",
      "kb_ids": [
        "KB-088"
      ]
    },
    {
      "object_id": "contacts",
      "kb_ids": [
        "KB-154",
        "KB-155"
      ]
    },
    {
      "object_id": "automations",
      "kb_ids": [
        "KB-144",
        "KB-145"
      ]
    }
  ]
}
```

## OQ-email-content-027 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-email-content-027",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "merge-tags",
  "summary": "Nội dung đã lưu / đã gửi trong giai đoạn cú pháp một ngoặc (campaign Sent 30/09/2026, email chứa `{preferences_url}`) không được migrate theo quyết định PO/BA 02/10/2026. Người nhận các mail đó thấy gì — chuỗi thô và link huỷ đăng ký chết, hay renderer vẫn thay giá trị? Cần Dev xác nhận vì ảnh hưởng tuân thủ unsubscribe.",
  "kb_ids": [
    "KB-085",
    "KB-086",
    "KB-087"
  ],
  "related_questions": [
    "Khi gửi nội dung còn tag một ngoặc (dữ liệu giai đoạn 29/09/2026 không migrate), renderer có thay giá trị không? Nếu không, mail có link huỷ đăng ký chết — hệ thống có chặn gửi / cảnh báo hay luôn chèn link huỷ đăng ký hợp lệ để đảm bảo tuân thủ không?",
    "Người nhận các mail đã lưu / đã gửi bằng cú pháp một ngoặc (vd campaign Sent 30/09/2026 chứa `{preferences_url}`) thấy gì: chuỗi thô và link huỷ đăng ký chết, hay renderer vẫn thay giá trị?"
  ],
  "check_ids": [
    "merge-tags:CHK-006"
  ]
}
```

## OQ-email-content-028 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-email-content-028",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "email-library",
  "summary": "Khi Import HTML: tên email phải lấy từ tên file bỏ đuôi `.html` / `.htm`, được trim, rỗng thì thành `Untitled email` và cắt còn tối đa 255 ký tự; import xong mở thẳng editor với toast `Imported “{name}”` hoặc cảnh báo liệt kê phần cần xem lại — có đúng là hành vi mong đợi không, và kích thước file HTML tối đa là bao nhiêu?",
  "kb_ids": [
    "KB-024",
    "KB-025"
  ],
  "check_ids": [
    "email-library:CHK-010"
  ]
}
```

## OQ-email-content-029 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-email-content-029",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "email-library",
  "summary": "Xoá một email qua menu dòng phải hỏi xác nhận bằng hộp `Delete \"{name}\"?` / \"This can't be undone.\" và báo `Deleted \"{name}\"` khi xong không? Hộp này không mở được trên staging 01/10/2026 — đây là lỗi hay thay đổi chủ ý?",
  "kb_ids": [
    "KB-031"
  ],
  "check_ids": [
    "email-library:CHK-014"
  ]
}
```

## OQ-email-content-030 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-email-content-030",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "email-library",
  "summary": "Iframe Preview có phải luôn chặn script (không có `allow-scripts`, `referrerpolicy=\"no-referrer\"`) không? Import HTML có giữ hay loại bỏ thẻ `<script>` trong nội dung email?",
  "kb_ids": [
    "KB-039"
  ],
  "check_ids": [
    "email-library:CHK-020"
  ]
}
```

## OQ-email-content-031 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-email-content-031",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "email-library",
  "summary": "Khi người dùng workspace A mở hoặc gọi API với id email của workspace B, hệ thống phải trả gì (404 hay 403, màn nào trên UI)? Có quy tắc đã được PO/Dev xác nhận cho việc cô lập email giữa workspace không?",
  "check_ids": [
    "email-library:CHK-025"
  ]
}
```

## OQ-email-content-032 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-email-content-032",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "email-editor",
  "summary": "Khi còn thay đổi chưa lưu, bấm `Reload` trong editor phải hỏi `Replace your changes with the saved version?` và cảnh báo không có version history không? Tải lại trang bằng trình duyệt (F5) có phải cảnh báo mất thay đổi không?",
  "kb_ids": [
    "KB-054"
  ],
  "check_ids": [
    "email-editor:CHK-004"
  ]
}
```

## OQ-email-content-033 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-email-content-033",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "email-editor",
  "summary": "Độ dài tối đa của `Email name` và `Subject line` khi tạo / sửa email là bao nhiêu, vượt giới hạn thì bị chặn ở UI, bị cắt hay báo lỗi API? Có cho trùng `Email name` trong workspace không?",
  "check_ids": [
    "email-editor:CHK-008"
  ]
}
```

## OQ-email-content-034 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-email-content-034",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "saved-blocks",
  "summary": "Rời editor saved block (`Back to saved blocks`, đổi trang, đóng tab) khi còn thay đổi chưa lưu có phải cảnh báo như Email editor (`Leave without saving?`) không?",
  "check_ids": [
    "saved-blocks:CHK-018"
  ],
  "related_questions": [
    "Rời editor saved block khi còn thay đổi chưa lưu có cảnh báo không?"
  ]
}
```

## OQ-email-content-035 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-email-content-035",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "merge-tags",
  "summary": "Lúc gửi, merge tag được thay thế nào khi contact thiếu field hoặc giá trị rỗng (để trống, giữ nguyên tag, giá trị mặc định)? `{{unsubscribe_url}}` và `{{preferences_url}}` trong mail thật phải dẫn tới trang nào và có huỷ đăng ký đúng contact không?",
  "check_ids": [
    "merge-tags:CHK-007"
  ],
  "related_questions": [
    "Lúc gửi, merge tag được thay giá trị thế nào khi contact thiếu field hoặc giá trị rỗng?"
  ]
}
```

## OQ-email-content-036 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-email-content-036",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "merge-tags",
  "summary": "Trong builder automation, tag thiếu ngoặc có phải hiện \"This field has a tag that can't be read. Write variables as a name in double braces, or insert one from the menu.\", header `A step has a tag that can't be read — write variables as a name in double braces` và disabled Save / Activate không? Quy tắc này phụ thuộc cú pháp hai ngoặc đang tranh chấp.",
  "kb_ids": [
    "KB-096"
  ],
  "check_ids": [
    "merge-tags:CHK-011"
  ]
}
```

## OQ-email-content-037 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-email-content-037",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "merge-tags",
  "summary": "Khi tải danh sách merge tag lỗi, picker có phải chỉ còn `Unsubscribe link` kèm cảnh báo danh sách bị giới hạn không? Cảnh báo hiển thị thế nào trên UI?",
  "kb_ids": [
    "KB-091",
    "KB-092"
  ],
  "check_ids": [
    "merge-tags:CHK-013"
  ],
  "related_questions": [
    "Khi tải danh sách merge tag lỗi, picker chỉ còn `Unsubscribe link` kèm cảnh báo `limited` (theo bundle) — hiển thị thật trên UI thế nào?"
  ]
}
```

## OQ-email-content-038 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-email-content-038",
  "type": "OPEN_ISSUE",
  "feature_id": "email-editor",
  "summary": "PO/Dev có chấp nhận hành vi editor theo bản dựng staging (save / discard / leave guard, toolbar, Settings, Preheader, dialog Edit email details) mà QA lead chốt 30/09/2026 là hành vi mong đợi không?",
  "kb_ids": [
    "KB-050",
    "KB-051",
    "KB-052",
    "KB-055",
    "KB-065",
    "KB-067",
    "KB-072",
    "KB-073"
  ]
}
```

## OQ-email-content-039 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-email-content-039",
  "type": "OPEN_ISSUE",
  "feature_id": "email-editor",
  "summary": "Độ dài tối đa của `Email name` / `Subject line` khi sửa qua dialog Edit email details là bao nhiêu, và Preheader vượt 150 ký tự bị xử lý thế nào?",
  "kb_ids": [
    "KB-067",
    "KB-072",
    "KB-073"
  ]
}
```

## OQ-email-content-040 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-email-content-040",
  "type": "OPEN_ISSUE",
  "feature_id": "email-editor",
  "summary": "Toast lưu thành công / lỗi, hộp xác nhận Reload và lỗi lưu Email details (chỉ có từ bundle) hiển thị thế nào trên UI?",
  "kb_ids": [
    "KB-053",
    "KB-054",
    "KB-074"
  ]
}
```

## OQ-email-content-041 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-email-content-041",
  "type": "OPEN_ISSUE",
  "feature_id": "email-editor",
  "summary": "Font Tahoma có cần xuất hiện trong picker font của editor để khớp với backend / Claude MCP không?",
  "kb_ids": [
    "KB-077"
  ]
}
```

## OQ-email-content-042 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-email-content-042",
  "type": "OPEN_ISSUE",
  "feature_id": "saved-blocks",
  "summary": "Category của saved block được tạo / quản lý thế nào, có bắt buộc không; ô `Search saved blocks...` tìm theo trường nào; `Rename` / `Delete` trên thẻ ở dialog Browse hoạt động thế nào?",
  "kb_ids": [
    "KB-131",
    "KB-112"
  ]
}
```

## OQ-email-content-043 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-email-content-043",
  "type": "OPEN_ISSUE",
  "feature_id": "saved-blocks",
  "summary": "Nội dung thông báo lỗi khi tạo saved block với tên trống hoặc canvas trống, giới hạn độ dài tên và số lượng saved block là gì?",
  "kb_ids": [
    "KB-115"
  ]
}
```

## OQ-email-content-044 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-email-content-044",
  "type": "OPEN_ISSUE",
  "feature_id": "merge-tags",
  "summary": "Với cú pháp hai ngoặc đang dùng trên staging, CSS dạng `a { color: red }` và giá trị contact có HTML được xử lý thế nào khi gửi (hai quy tắc này viết cho Jira MTRO-92 và chưa kiểm trên staging)?",
  "kb_ids": [
    "KB-098",
    "KB-099"
  ]
}
```

## OQ-email-content-045 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-email-content-045",
  "type": "OPEN_ISSUE",
  "feature_id": "merge-tags",
  "summary": "Email editor có cần cảnh báo merge tag sai / không tồn tại ngay lúc thiết kế (như builder automation) không, hay chỉ phát hiện lúc Send?",
  "kb_ids": [
    "KB-068",
    "KB-069",
    "KB-096"
  ]
}
```
