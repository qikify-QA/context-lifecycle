# Open Questions — Campaigns — list & folder, wizard 4 bước, preview & test, gửi/lên lịch, report & Analytics API

Tổng: 47 mục. Sinh từ lần bootstrap đầu tiên (DOC_BOOTSTRAP) của Mailtro, ngày 2026-10-08.

- CONFLICT: 1
- NEEDS_CONFIRMATION: 32
- OPEN_ISSUE: 14

> Xung đột dùng chung nhiều object (CONF-MTRO-email-content-01) được theo dõi ở **OQ-email-content-026** trong open-questions của object `email-content`; phía object này: KB-088.

## OQ-campaigns-001 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-campaigns-001",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "campaign-list-and-folders",
  "summary": "Jira MTRO-28 AC chỉ định nghĩa 4 status campaign (Draft, Scheduled, Sent, Running), nhưng filter Status trên staging 01/10/2026 có thêm Partly sent, Cancelled, Failed. Ba status này nghĩa là gì, campaign chuyển sang chúng trong điều kiện nào, và AC có được bổ sung để coi bộ 8 status là hành vi đúng không?",
  "kb_ids": [
    "KB-006",
    "KB-007",
    "KB-008"
  ],
  "check_ids": [
    "campaign-list-and-folders:CHK-009"
  ],
  "related_questions": [
    "Ba status `Partly sent`, `Cancelled`, `Failed` trên filter của staging nghĩa là gì, campaign chuyển sang chúng trong điều kiện nào, và AC có được bổ sung để coi bộ 8 status là hành vi đúng không?"
  ]
}
```

## OQ-campaigns-002 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-campaigns-002",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "campaign-list-and-folders",
  "summary": "Quyết định PO 11/08/2026 (Jira MTRO-28) nhắc nút Edit mở builder cho campaign draft / scheduled, nhưng staging 01/10/2026 không còn mục Edit trong menu dòng ở bất kỳ status nào (chỉ click dòng Draft để mở wizard). Việc bỏ Edit có chủ ý không? Click dòng campaign Scheduled và menu dòng Scheduled (Reschedule / Unschedule / Delete) hoạt động thế nào trên UI thật?",
  "kb_ids": [
    "KB-016",
    "KB-018",
    "KB-019",
    "KB-026"
  ],
  "related_questions": [
    "Menu dòng campaign Scheduled có những mục nào (Reschedule / Unschedule / Delete / Edit) và xoá campaign Scheduled có huỷ lịch gửi kèm cảnh báo \"This campaign is booked to go out…\" không? Quyết định PO 11/08/2026 có nhắc nút Edit cho draft / scheduled nhưng staging 01/10/2026 không còn mục Edit — việc bỏ Edit có chủ ý không?",
    "Việc staging không còn mục Edit trong menu dòng (khác quyết định PO 11/08/2026) có chủ ý không? Click dòng campaign Scheduled đi đâu, và menu dòng Scheduled (Reschedule / Unschedule / Delete) hoạt động thế nào trên UI thật?"
  ],
  "check_ids": [
    "campaign-list-and-folders:CHK-014"
  ]
}
```

## OQ-campaigns-003 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-campaigns-003",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "campaign-list-and-folders",
  "summary": "Khi tập chọn trên danh sách campaign có campaign Sent hoặc Running, bulk bar vẫn bật Delete dù menu dòng Sent không có Delete. Bulk Delete có được phép xoá campaign Sent / Running không, hay phải chặn / bỏ qua các dòng đó? (Nếu xoá được là mất dữ liệu đã gửi.)",
  "kb_ids": [
    "KB-027",
    "KB-028",
    "KB-011"
  ],
  "check_ids": [
    "campaign-list-and-folders:CHK-019"
  ],
  "related_questions": [
    "Bulk Delete khi tập chọn có campaign Sent hoặc Running có được phép xoá các dòng đó không, hay phải chặn / bỏ qua chúng?"
  ]
}
```

## OQ-campaigns-004 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-campaigns-004",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "campaign-list-and-folders",
  "summary": "Folder campaign hiện không có UI xoá / đổi tên dù BE có endpoint DELETE folder (BUG-CL-02). Việc thiếu UI là lỗi hay chủ ý? Nếu có xoá folder, campaign bên trong folder sẽ bị xử lý thế nào (chuyển về Ungrouped, chặn xoá, hay xoá theo)?",
  "kb_ids": [
    "KB-033",
    "KB-032"
  ],
  "check_ids": [
    "campaign-list-and-folders:CHK-025"
  ],
  "related_questions": [
    "Thiếu UI xoá/đổi tên folder campaign là lỗi hay chủ ý? Nếu có xoá folder, campaign bên trong được chuyển về Ungrouped, chặn xoá, hay xoá theo?"
  ]
}
```

## OQ-campaigns-005 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-campaigns-005",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "campaign-list-and-folders",
  "summary": "Jira MTRO-28 AC yêu cầu toast sau khi xoá campaign, nhưng staging 27/08/2026 không hiện toast khi xoá campaign và khi tạo folder; bundle 01/10/2026 đã có chuỗi toast. Cần chạy lại trên build hiện tại để xác nhận toast đã hiện đúng chưa.",
  "kb_ids": [
    "KB-024",
    "KB-023",
    "KB-025"
  ],
  "related_questions": [
    "Trên build hiện tại, xoá campaign và tạo folder đã hiện toast như AC chưa (staging 27/08/2026 không hiện, bundle 01/10/2026 đã có chuỗi toast)?"
  ]
}
```

## OQ-campaigns-006 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-campaigns-006",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "campaign-list-and-folders",
  "summary": "Bản sao campaign trên staging đặt tên \"<tên> (copy)\" còn bản sao email trong Email library đặt \"Copy of {name}\". PO có muốn thống nhất một kiểu đặt tên bản sao giữa Campaign và Email library không?",
  "kb_ids": [
    "KB-022",
    "KB-021"
  ]
}
```

## OQ-campaigns-007 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-campaigns-007",
  "type": "OPEN_ISSUE",
  "feature_id": "campaign-list-and-folders",
  "summary": "Theo dõi hồi quy các lỗi đã biết của danh sách campaign (không dùng làm expected result): BUG-CL-01 đổi filter không xoá lựa chọn, Delete vẫn bật cho dòng đã khuất; BUG-CL-02 không có UI xoá / đổi tên folder; BUG-CL-03 tràn ngang 36px ở 375px; copy số ít sai \"1 campaign(s) selected.\" / \"1 estimated recipients\". Cần xác nhận trạng thái sửa trên build hiện tại.",
  "kb_ids": [
    "KB-028",
    "KB-032",
    "KB-034",
    "KB-035"
  ],
  "related_questions": [
    "Khi đổi filter hoặc search trên danh sách campaign, lựa chọn trước đó phải được xoá hay giữ lại? Nếu giữ lại, bulk Delete có được tác động tới dòng không còn hiển thị không? (Lỗi đã biết BUG-CL-01 ghi lựa chọn không bị xoá và Delete vẫn bật.)",
    "Danh sách campaign có phải hỗ trợ viewport 375px (mobile) không, và mức tràn ngang nào là chấp nhận được? Lỗi đã biết BUG-CL-03 ghi trang tràn ngang 36px ở 375px.",
    "Copy số ít mong đợi ở dialog Add to folder và dòng estimated recipients là gì (ví dụ \"1 campaign selected.\", \"1 estimated recipient\")? Lỗi đã biết ghi staging hiện \"1 campaign(s) selected.\" và \"1 estimated recipients\"."
  ],
  "check_ids": [
    "campaign-list-and-folders:CHK-020",
    "campaign-list-and-folders:CHK-027",
    "campaign-list-and-folders:CHK-028"
  ]
}
```

## OQ-campaigns-008 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-campaigns-008",
  "type": "OPEN_ISSUE",
  "feature_id": "campaign-list-and-folders",
  "summary": "Tài liệu câu hỏi mở của QA cho Campaigns (được trỏ tới cho bulk Delete có campaign Sent và xoá folder đang chứa campaign) không có trong bộ nguồn, và luồng Delete campaign Draft / Sent chưa được bấm thử trong lượt khảo sát 01/10/2026. Cần bổ sung tài liệu hoặc khảo sát lại; không suy diễn nội dung.",
  "kb_ids": [
    "KB-027",
    "KB-033",
    "KB-023"
  ],
  "missing_area": "open-questions (mục Campaigns)",
  "related_questions": [
    "Tài liệu câu hỏi mở của QA cho Campaigns (được trỏ tới cho bulk Delete có campaign Sent và xoá folder đang chứa campaign) có nội dung gì?"
  ]
}
```

## OQ-campaigns-009 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-campaigns-009",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "campaign-wizard",
  "summary": "PO quyết ngày 30/09/2026 (Jira MTRO-99) đổi hai nút ở bước Contents của campaign thành \"Choose a template\" / \"Create new template\", nhưng staging khảo sát 01/10/2026 vẫn hiện \"Choose email library\" / \"Create email library\". Thay đổi này đã được deploy lên staging chưa, từ build nào?",
  "kb_ids": [
    "KB-078",
    "KB-077"
  ],
  "related_questions": [
    "Nhãn nút `Choose a template` / `Create new template` (quyết định PO 30/09/2026, Jira MTRO-99) đã được deploy lên staging chưa, từ build nào?"
  ]
}
```

## OQ-campaigns-010 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-campaigns-010",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "campaign-wizard",
  "summary": "Picker email ở bước Contents (và Duplicate design) chỉ nạp một lần 50 email được sửa gần nhất, không có search hay phân trang, nên workspace có hơn 50 email không chọn được email cũ. Giới hạn 50 có chủ ý không, và có định thêm tìm kiếm / phân trang không?",
  "kb_ids": [
    "KB-081",
    "KB-080"
  ],
  "related_questions": [
    "Picker email ở bước Contents (và Duplicate design) chỉ nạp 50 email sửa gần nhất, không search hay phân trang. Workspace có hơn 50 email thì email cũ hơn có phải chọn được không? Giới hạn 50 có chủ ý không, có định thêm tìm kiếm / phân trang không?",
    "Giới hạn picker email ở bước Contents (nạp một lần 50 email sửa gần nhất, không search, không phân trang) có chủ ý không, và có định thêm tìm kiếm / phân trang không?"
  ],
  "check_ids": [
    "campaign-wizard:CHK-032"
  ]
}
```

## OQ-campaigns-011 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-campaigns-011",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "campaign-wizard",
  "summary": "Tên segment không unique nên picker Recipients không phân biệt được hai segment trùng tên (BUG-69). PO muốn picker hiện thêm thông tin gì để phân biệt (ví dụ số contact, ngày tạo, người tạo)?",
  "kb_ids": [
    "KB-070",
    "KB-069"
  ],
  "related_questions": [
    "Picker Recipients phải hiện thêm thông tin gì để phân biệt hai segment trùng tên (ví dụ số contact, ngày tạo, người tạo), hay tên segment phải unique (GAP-19)? Lỗi đã biết BUG-69 ghi rủi ro gửi nhầm tập khách hàng.",
    "Picker Recipients phải hiện thêm thông tin gì (số contact, ngày tạo, người tạo) để phân biệt hai segment trùng tên?"
  ],
  "check_ids": [
    "campaign-wizard:CHK-025"
  ]
}
```

## OQ-campaigns-012 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-campaigns-012",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "campaign-wizard",
  "summary": "Trang Email preferences hướng dẫn \"tick the choices this campaign is about\" ở bước Recipients, nhưng bước Recipients trên staging 01/10/2026 không có ô tick nào và cảnh báo trong bundle nói người đã tắt lựa chọn vẫn nhận campaign nếu segment không lọc. Người bỏ tick một lựa chọn có bị loại tự động khỏi campaign liên quan không, hay chỉ bị loại khi segment lọc theo field đó? Hướng dẫn trên trang là copy cũ hay wizard còn thiếu ô chọn?",
  "kb_ids": [
    "KB-071",
    "KB-072",
    "KB-073",
    "KB-074",
    "KB-075",
    "KB-197"
  ],
  "related_questions": [
    "Người đã bỏ tick một lựa chọn trên preferences page có bị loại tự động khỏi campaign liên quan không, hay chỉ bị loại khi segment lọc theo field đó? Hướng dẫn \"tick the choices this campaign is about\" là copy cũ hay wizard còn thiếu ô chọn? Cảnh báo `Your email offers choices but has no page` và `Your segment ignores some of the page's choices` có phải hiện ở bước Recipients không?",
    "Người bỏ tick một lựa chọn trên preferences page có bị loại tự động khỏi campaign liên quan không, hay chỉ bị loại khi segment lọc theo field đó? Hướng dẫn \"tick the choices this campaign is about\" là copy cũ hay wizard còn thiếu ô chọn?"
  ],
  "check_ids": [
    "campaign-wizard:CHK-027"
  ]
}
```

## OQ-campaigns-013 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-campaigns-013",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "campaign-wizard",
  "summary": "Khi From email của campaign không thuộc domain verified, sender bị đổi âm thầm sang host gửi dùng chung nhưng bước Contents và Preview vẫn hiện địa chỉ người dùng gõ. UX có cần báo cho người dùng biết địa chỉ gửi thật không?",
  "kb_ids": [
    "KB-061",
    "KB-060"
  ],
  "related_questions": [
    "Khi From email của campaign không thuộc domain verified, người dùng có phải được báo rằng mail sẽ gửi từ host dùng chung (và địa chỉ gửi thật) không? Staging hiện cảnh báo \"Sending needs a verified domain — this address won't be accepted until its domain is verified.\" trong khi mail vẫn gửi qua host dùng chung, và bước Contents / Preview vẫn hiện địa chỉ người dùng gõ.",
    "Khi From email không thuộc domain verified và sender bị đổi sang host gửi dùng chung, UX có cần báo cho người dùng biết địa chỉ gửi thật không?"
  ],
  "check_ids": [
    "campaign-wizard:CHK-019"
  ]
}
```

## OQ-campaigns-014 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-campaigns-014",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "campaign-wizard",
  "summary": "Trên staging 01/10/2026, dòng \"N estimated recipients\" ở bước Recipients bằng cột Contacts của segment; tài liệu không gắn rõ quyết định PO/Dev nào cho quy tắc này (PO 11/08/2026 đã bỏ helptext \"X contacts\" trong danh sách segment). PO xác nhận estimated recipients phải bằng cột Contacts của segment?",
  "kb_ids": [
    "KB-067",
    "KB-064"
  ],
  "related_questions": [
    "PO xác nhận `N estimated recipients` ở bước Recipients phải bằng cột Contacts của segment?"
  ]
}
```

## OQ-campaigns-015 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-campaigns-015",
  "type": "OPEN_ISSUE",
  "feature_id": "campaign-wizard",
  "summary": "Theo dõi hồi quy các lỗi đã biết của wizard campaign (không dùng làm expected result): BUG-WIZ-01 (P0) Save nuốt lỗi 422; BUG-WIZ-02 (P1) rời wizard chưa lưu mất thay đổi không cảnh báo; nút Next không validate field bắt buộc; sender bị đổi sang host chung nhưng bước Contents / Preview vẫn hiện địa chỉ đã gõ; BUG-69 picker không phân biệt segment trùng tên.",
  "kb_ids": [
    "KB-092",
    "KB-093",
    "KB-056",
    "KB-060",
    "KB-069"
  ],
  "related_questions": [
    "Khi người dùng rời wizard campaign (đổi menu, bấm link `Manage sending domains`, đóng / tải lại tab) lúc còn thay đổi chưa Save, wizard có phải cảnh báo trước khi rời không? Lỗi đã biết BUG-WIZ-02 ghi thay đổi bị mất mà không có cảnh báo.",
    "Khi Save ở wizard campaign bị BE từ chối (422, ví dụ From email sai định dạng hoặc subject dài hơn 255 ký tự), wizard phải hiển thị lỗi thế nào (inline theo field hay toast)? Quy tắc validate From email / Reply-to là gì? Lỗi đã biết BUG-WIZ-01 (P0) ghi wizard nuốt lỗi, người dùng tưởng đã lưu."
  ],
  "check_ids": [
    "campaign-wizard:CHK-003",
    "campaign-wizard:CHK-014"
  ]
}
```

## OQ-campaigns-016 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-campaigns-016",
  "type": "OPEN_ISSUE",
  "feature_id": "campaign-preview-and-test",
  "summary": "Chưa có AC cho Send test (Jira MTRO-62 description trống): ngưỡng \"Too many test sends\" là bao nhiêu lần / phút, giá trị 720px gắn với chế độ Desktop hay Mobile, quy tắc validate From email / Reply-to, và dialog Preview & test chưa được mở lại trong lượt khảo sát 01/10/2026. Cần bổ sung AC hoặc khảo sát lại.",
  "kb_ids": [
    "KB-099",
    "KB-094",
    "KB-095"
  ],
  "missing_area": "Jira MTRO-62 (Send test) description trống",
  "related_questions": [
    "Ngưỡng chặn \"Too many test sends\" là bao nhiêu lần gửi test trong bao lâu?",
    "Giá trị 720px ở Preview & test gắn với chế độ Desktop hay Mobile?"
  ]
}
```

## OQ-campaigns-017 — CONFLICT

```json
{
  "oq_id": "OQ-campaigns-017",
  "type": "CONFLICT",
  "feature_id": "campaign-send-and-schedule",
  "summary": "Campaign có được gửi khi workspace chưa có sending domain verified không? Rule 07/08/2026 nói chặn gửi, staging 09/09/2026 gửi được 15/15 lần qua host dùng chung, và quyết định PO/BA 02/10/2026 chỉ áp cho automation. PO cần chốt cho campaign: chặn gửi, hay cho gửi qua shared sending host như automation (và khi đó copy \"Sending needs a verified domain\" ở bước Sender có cần sửa không)?",
  "kb_ids": [
    "KB-100",
    "KB-101"
  ],
  "side_a": "Theo QA business rule Mailtro (rule draft ngày 07/08/2026, Jira MTRO-6 + MTRO-11), campaign không thể gửi nếu workspace chưa có sending domain nào ở trạng thái verified.",
  "side_b": "Trên staging (quan sát 09/09/2026, task Testlane MTRO-015), workspace chưa có domain verified vẫn gửi campaign thành công 15/15 lần qua host gửi dùng chung (sender_is_borrowed: true, From là địa chỉ Owner trên mailtro.ai).",
  "conflict_group": "CONF-MTRO-campaigns-01",
  "check_ids": [
    "campaign-send-and-schedule:CHK-014"
  ],
  "related_questions": [
    "Campaign có được gửi khi workspace chưa có sending domain verified không: chặn gửi như rule 07/08/2026, hay cho gửi qua shared sending host như staging 09/09/2026 (và như quyết định PO/BA 02/10/2026 cho automation)? Nếu cho gửi, copy \"Sending needs a verified domain\" ở bước Sender có cần sửa không?"
  ]
}
```

## OQ-campaigns-018 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-campaigns-018",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": null,
  "summary": "Ma trận quyền cho Campaigns chưa chốt: role nào (Owner / Admin / role thứ 3 đang tranh chấp tên Member hay Marketer/Editor / custom role) được tạo, Save, Send, Schedule, xoá campaign và xem report; quyền có được chặn ở API không? Toàn bộ tài liệu Campaigns không ghi role, staging chỉ khảo sát bằng Owner, Admin chưa từng được quan sát.",
  "kb_ids": [
    "KB-023",
    "KB-102",
    "KB-104",
    "KB-107",
    "KB-186",
    "KB-P-051",
    "KB-P-052"
  ],
  "related_feature_ids": [
    "campaign-list-and-folders",
    "campaign-wizard",
    "campaign-preview-and-test",
    "campaign-send-and-schedule",
    "campaign-report"
  ],
  "related_questions": [
    "Ma trận quyền Campaigns chưa chốt: role nào (Owner / Admin / role thứ 3 đang tranh chấp tên Member hay Marketer/Editor / custom role) được Send và Schedule campaign; quyền có được chặn ở API không? Staging chỉ khảo sát bằng Owner, Admin chưa từng được quan sát.",
    "Role nào (Owner, Admin, role thứ 3 đang tranh chấp tên Member hay Marketer/Editor, custom role) được tạo, Save, Send, Schedule, xoá campaign và xem report; quyền có được chặn ở API không?",
    "Role nào (Owner / Admin / role thứ 3 đang tranh chấp tên Member hay Marketer/Editor / custom role) được xem danh sách campaign, tạo, duplicate, xoá campaign và tạo / gán folder? Quyền có được chặn ở API không? Tài liệu Campaigns không ghi role, staging chỉ khảo sát bằng Owner.",
    "Role nào (Owner / Admin / role thứ 3 đang tranh chấp tên / custom role) được tạo campaign mới, sửa và Save bản nháp campaign? Quyền có được chặn ở API không?",
    "Role nào (Owner / Admin / role thứ 3 đang tranh chấp tên / custom role) được mở Preview & test và gửi email test của campaign? Quyền có được chặn ở API không?",
    "Role nào (Owner / Admin / role thứ 3 đang tranh chấp tên / custom role) được xem report campaign trên UI? Quyền có được chặn ở API không?"
  ],
  "check_ids": [
    "campaign-send-and-schedule:CHK-017",
    "campaign-list-and-folders:CHK-029",
    "campaign-wizard:CHK-043",
    "campaign-preview-and-test:CHK-008",
    "campaign-report:CHK-034"
  ]
}
```

## OQ-campaigns-019 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-campaigns-019",
  "type": "OPEN_ISSUE",
  "feature_id": "campaign-send-and-schedule",
  "summary": "Theo dõi hồi quy các lỗi đã biết của luồng gửi campaign (không dùng làm expected result): BUG-SUPP-01 (P0) campaign dùng template rỗng vẫn cho bấm Send và BE trả 500; BUG-SUPP-04 đường gửi hỏng ngày 08/09/2026, không tái hiện 09/09 — chờ Dev xác nhận đóng; BUG-68 segment có query hỏng khiến campaign trỏ tới nó rollback khi Send.",
  "kb_ids": [
    "KB-117",
    "KB-118",
    "KB-202"
  ],
  "related_questions": [
    "BUG-SUPP-04 (đường gửi hỏng 08/09/2026) đã được Dev xác nhận đóng chưa; BUG-SUPP-01 (Send với template rỗng trả 500) và BUG-68 (segment có query hỏng làm campaign rollback khi Send) còn tái hiện trên build hiện tại không?"
  ]
}
```

## OQ-campaigns-020 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-campaigns-020",
  "type": "OPEN_ISSUE",
  "feature_id": "campaign-send-and-schedule",
  "summary": "Chưa có AC cho Schedule campaigns (Jira MTRO-84 description trống) và cho API campaign core (Jira MTRO-63 trống): giới hạn thời gian đặt lịch, timezone dùng để lên lịch, hành vi Reschedule / Unschedule, route và status code của API gửi. UI campaign Scheduled / đang gửi / Partly sent chỉ biết qua bundle vì staging không có data ở các trạng thái này. Cần bổ sung AC hoặc dữ liệu khảo sát.",
  "kb_ids": [
    "KB-091",
    "KB-103",
    "KB-106",
    "KB-107",
    "KB-108",
    "KB-110"
  ],
  "missing_area": "Jira MTRO-84 / MTRO-63 description trống",
  "related_questions": [
    "Jira MTRO-84 (Schedule campaigns) chưa có AC: sau khi lên lịch campaign có status gì và hiển thị giờ gửi thế nào; được lên lịch xa tối đa bao lâu; dùng múi giờ nào; Reschedule / Unschedule hoạt động thế nào (bundle có \"Pick a new time. The campaign stays frozen until it goes out.\", gửi trong vòng 30 phút quanh thời điểm, Unschedule đưa về draft)?",
    "AC của Schedule campaigns (Jira MTRO-84 trống) là gì: giới hạn thời gian đặt lịch, timezone dùng để lên lịch, hành vi Reschedule / Unschedule?",
    "Hợp đồng API campaign core (Jira MTRO-63 trống) gồm route, payload và status code nào cho tạo, gửi, lên lịch campaign?"
  ],
  "check_ids": [
    "campaign-send-and-schedule:CHK-008"
  ]
}
```

## OQ-campaigns-021 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-campaigns-021",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "campaign-report",
  "summary": "Epic Jira MTRO-16 ghi Click rate không tính link unsubscribe và link preference, nhưng caveat trên report chỉ nêu link unsubscribe. Click vào link {{preferences_url}} có bị loại khỏi Click rate không?",
  "kb_ids": [
    "KB-123",
    "KB-124",
    "KB-134"
  ],
  "check_ids": [
    "campaign-report:CHK-009"
  ],
  "related_questions": [
    "Click vào link `{{preferences_url}}` có bị loại khỏi Click rate không (Epic Jira MTRO-16 nói có, caveat trên report chỉ nêu link unsubscribe)?"
  ]
}
```

## OQ-campaigns-022 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-campaigns-022",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "campaign-report",
  "summary": "Lọc bot (is_bot_event) có áp cho Total opens / Total clicks hay chỉ cho số unique? Event trước ngày 07/08/2026 (trước khi SES gắn cờ bot) được xử lý thế nào trong số liệu report?",
  "kb_ids": [
    "KB-140",
    "KB-139"
  ],
  "related_questions": [
    "Lọc bot (is_bot_event) có áp cho Total opens / Total clicks hay chỉ cho số unique? Event trước ngày 07/08/2026 (trước khi SES gắn cờ bot) được xử lý thế nào (GAP-03)?",
    "Lọc bot có áp cho Total opens / Total clicks hay chỉ cho số unique? Event trước 07/08/2026 (chưa có cờ bot) được xử lý thế nào?"
  ],
  "check_ids": [
    "campaign-report:CHK-014"
  ]
}
```

## OQ-campaigns-023 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-campaigns-023",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "campaign-report",
  "summary": "Staging 29/09/2026 ghi bấm thẻ metric trên report không mở gì, còn 01/10/2026 ghi Delivery rate / Open rate / Click rate là nút bấm được (Unsubscribe rate không). Bấm thẻ metric thì kỳ vọng xảy ra gì (chỉ tooltip theo Jira MTRO-31, hay chuyển tab)?",
  "kb_ids": [
    "KB-145",
    "KB-143",
    "KB-144"
  ],
  "related_questions": [
    "Bấm thẻ metric trên report thì kỳ vọng xảy ra gì (chỉ tooltip theo Jira MTRO-31, hay chuyển tab)? Staging 29/09 và 01/10/2026 ghi hai hành vi khác nhau."
  ]
}
```

## OQ-campaigns-024 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-campaigns-024",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "campaign-report",
  "summary": "Preview nội dung đã gửi trên report hiện merge tag thô và không xem được bản từng người nhận; QA đánh giá là theo thiết kế dựa trên chữ trên dialog nhưng không có quyết định PO/Dev. PO/Dev xác nhận đây là giới hạn có chủ ý?",
  "kb_ids": [
    "KB-152",
    "KB-151"
  ],
  "related_questions": [
    "PO/Dev xác nhận preview nội dung đã gửi hiện merge tag thô và không xem được bản từng người nhận là giới hạn có chủ ý?"
  ]
}
```

## OQ-campaigns-025 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-campaigns-025",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "campaign-report",
  "summary": "Campaign Sent ngày 30/09/2026 lưu merge tag một ngoặc ({contact.first_name}, {unsubscribe_url}, {preferences_url}). Người nhận thực nhận gì: tên có được thay không, link Huỷ đăng ký có trỏ tới trang unsubscribe thật không? Nếu link chết thì đây là rủi ro tuân thủ cần Dev xác nhận và xử lý. (Quyết định PO/BA 02/10/2026 không migrate dữ liệu một ngoặc thuộc email-content.)",
  "kb_ids": [
    "KB-154",
    "KB-153"
  ],
  "related_questions": [
    "Campaign Sent ngày 30/09/2026 lưu merge tag một ngoặc ({contact.first_name}, {unsubscribe_url}, {preferences_url}). Người nhận thực nhận gì: tên có được thay không, link Huỷ đăng ký có trỏ tới trang unsubscribe thật không (GAP-22, GAP-05)? Nếu link chết đây là rủi ro tuân thủ cần Dev xử lý.",
    "Người nhận campaign Sent 30/09/2026 (lưu merge tag một ngoặc) thực nhận gì: tên có được thay không, link Huỷ đăng ký có trỏ tới trang unsubscribe thật không?"
  ],
  "check_ids": [
    "campaign-report:CHK-021"
  ]
}
```

## OQ-campaigns-026 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-campaigns-026",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "campaign-report",
  "summary": "Campaign ở trạng thái Running / Partly sent / Cancelled / Failed có mở được report không, report hiển thị gì, và thẻ Sent to hiện dạng \"so far, of …\" khi nào? Staging chưa có campaign ở các trạng thái này để kiểm.",
  "kb_ids": [
    "KB-179",
    "KB-156",
    "KB-178"
  ],
  "related_questions": [
    "Campaign ở trạng thái Running / Partly sent / Cancelled / Failed có mở được report không, report hiển thị gì (bundle có khối `Send progress`, `Recipients of this send`, `Stop send` / `Resume send`, `This campaign never went out`), và thẻ Sent to hiện dạng \"so far, of …\" khi nào (GAP-01)?"
  ],
  "check_ids": [
    "campaign-report:CHK-026"
  ]
}
```

## OQ-campaigns-027 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-campaigns-027",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "campaign-report",
  "summary": "Campaign gửi từ 09/09/2026 trở về trước (trước pipeline số liệu SES) hiện \"—\" ở report và danh sách. Đó là thiết kế, hay số liệu chưa được backfill? Có kế hoạch backfill không?",
  "kb_ids": [
    "KB-165",
    "KB-164"
  ],
  "related_questions": [
    "Campaign gửi từ 09/09/2026 trở về trước hiện `—` là thiết kế hay do chưa backfill? Có kế hoạch backfill không?"
  ]
}
```

## OQ-campaigns-028 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-campaigns-028",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "campaign-report",
  "summary": "Khi chưa có số liệu, report phải hiện \"—\" hay \"0\"? Report campaign Draft hiện \"—\" và GET /campaigns/{id}/broadcast của Draft trả 404 thay vì 6 số 0 — đó là thiết kế hay lỗi?",
  "kb_ids": [
    "KB-169",
    "KB-166",
    "KB-167",
    "KB-168"
  ],
  "related_questions": [
    "Khi chưa có số liệu, report phải hiện \"—\" hay \"0\"? Report campaign Draft hiện \"—\" và GET /campaigns/{id}/broadcast của Draft trả 404 thay vì 6 số 0 (BUG-SUPP-03, BUG-SUPP-05) — đó là thiết kế hay lỗi? Có kế hoạch backfill số liệu cho campaign gửi trước pipeline không?"
  ],
  "check_ids": [
    "campaign-report:CHK-023"
  ]
}
```

## OQ-campaigns-029 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-campaigns-029",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "campaign-report",
  "summary": "Mở thẳng /campaigns/<id>/report của campaign Draft vẫn vào được trang report (bố cục 4 tab cũ), không redirect về wizard. Campaign Draft có được phép vào trang report không?",
  "kb_ids": [
    "KB-173",
    "KB-170"
  ],
  "related_questions": [
    "Campaign Draft có được phép vào trang `/report` không (hiện mở thẳng URL vẫn vào được bố cục 4 tab cũ)?"
  ]
}
```

## OQ-campaigns-030 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-campaigns-030",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "campaign-report",
  "summary": "Report campaign Sent trên staging 01/10/2026 không còn tab Recipients / Content / Settings và khối \"What recipients saw\". Việc bỏ là chủ ý hay tạm ẩn? Danh sách người nhận và cảnh báo gửi qua shared host của campaign Sent sẽ xem ở đâu?",
  "kb_ids": [
    "KB-172",
    "KB-174",
    "KB-175"
  ]
}
```

## OQ-campaigns-031 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-campaigns-031",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "campaign-report",
  "summary": "Mở report với id campaign không tồn tại hiện khung trống, không có \"Not Found.\" như các module khác. Đây là hành vi chấp nhận được hay cần thêm trạng thái not-found?",
  "kb_ids": [
    "KB-177",
    "KB-176"
  ],
  "related_questions": [
    "Mở report với id campaign không tồn tại hiện khung trống thay vì \"Not Found.\" như module khác: có cần thêm trạng thái not-found không?"
  ]
}
```

## OQ-campaigns-032 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-campaigns-032",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "campaign-report",
  "summary": "Có trang giao diện /analytics (analytics global) không? Hiện route /analytics trên staging là trang trắng và analytics global mới kiểm được ở mức API.",
  "kb_ids": [
    "KB-189",
    "KB-188",
    "KB-130"
  ],
  "check_ids": [
    "campaign-report:CHK-036"
  ],
  "related_questions": [
    "Có trang giao diện `/analytics` (analytics global) không, hay analytics global chỉ có ở mức API?"
  ]
}
```

## OQ-campaigns-033 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-campaigns-033",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "campaign-report",
  "summary": "Contact bị suppressed trong một campaign có được đếm vào Bounce / Spam complaint và vào mẫu số Sent của report campaign không? (Quyết định PO 02/10/2026 về việc này chỉ áp cho automation.)",
  "kb_ids": [
    "KB-190"
  ],
  "check_ids": [
    "campaign-report:CHK-037"
  ],
  "related_questions": [
    "Contact bị suppressed trong một campaign có được đếm vào Bounce / Spam complaint và vào mẫu số Sent của report campaign không?"
  ]
}
```

## OQ-campaigns-034 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-campaigns-034",
  "type": "OPEN_ISSUE",
  "feature_id": "campaign-report",
  "summary": "Theo dõi hồi quy các lỗi / hiện tượng đã biết của Campaign report (không dùng làm expected result): BUG-SUPP-03 report có đủ số vẫn hiện \"—\" và report Draft hiện \"—\" thay vì 0; BUG-SUPP-05 broadcast của Draft trả 404; Jira MTRO-96 audience card báo \"too complex\" thay vì \"field removed\"; Jira MTRO-97 headline Opens dùng số all-time trên biểu đồ 24h; campaign Sent 30/09/2026 lưu merge tag một ngoặc.",
  "kb_ids": [
    "KB-166",
    "KB-167",
    "KB-168",
    "KB-149",
    "KB-160",
    "KB-153"
  ]
}
```

## OQ-campaigns-035 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-campaigns-035",
  "type": "OPEN_ISSUE",
  "feature_id": "campaign-report",
  "summary": "Thiếu đặc tả UI report campaign: danh sách đầy đủ 10 nhãn lý do bounce, giá trị hiển thị khi mẫu số bằng 0, UI có tách hard / soft bounce không, và ở report từng campaign resubscribe có làm giảm số Unsubscribe không. Cần bổ sung tài liệu; không suy diễn từ ví dụ.",
  "kb_ids": [
    "KB-158",
    "KB-155",
    "KB-137",
    "KB-128"
  ],
  "missing_area": "report UI",
  "related_questions": [
    "Danh sách đủ 10 nhãn lý do bounce là gì, UI hiện rate thế nào khi mẫu số bằng 0, UI có tách hard / soft bounce không, và ở report từng campaign resubscribe có làm giảm số Unsubscribe không?"
  ]
}
```

## OQ-campaigns-036 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-campaigns-036",
  "type": "OPEN_ISSUE",
  "feature_id": "campaign-report",
  "summary": "Thiếu hợp đồng đầy đủ của Analytics API và MCP report: HTTP method / route đầy đủ của list campaigns và /campaigns/{id}/broadcast, shape response report campaign, tên tham số khoảng thời gian và mặc định, tên hai sổ ledger dùng để COUNT, và tool MCP report (Jira MTRO-60 mô tả trống). Cần bổ sung tài liệu API.",
  "kb_ids": [
    "KB-180",
    "KB-181",
    "KB-183",
    "KB-187",
    "KB-136"
  ],
  "missing_area": "Analytics API / MCP contract",
  "related_questions": [
    "Jira MTRO-60 \"MCP for report\" chưa có mô tả: MCP có tool report nào, dữ liệu trả về gồm gì và có dùng chung định nghĩa số liệu với report UI / Analytics API không?",
    "Hợp đồng đầy đủ của Analytics API và MCP report là gì: method / route của list campaigns và `/campaigns/{id}/broadcast`, shape response report, tên tham số khoảng thời gian và mặc định, tên hai sổ ledger dùng để COUNT, tool MCP (Jira MTRO-60 trống)?"
  ],
  "check_ids": [
    "campaign-report:CHK-035"
  ]
}
```

## OQ-campaigns-037 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-campaigns-037",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "campaign-wizard",
  "summary": "Save campaign khi chưa có Campaign name phải bị chặn với thông báo gì? Bundle front-end có chuỗi \"Give this campaign a name before saving it.\" nhưng chưa thấy trên UI.",
  "kb_ids": [
    "KB-046"
  ],
  "check_ids": [
    "campaign-wizard:CHK-011"
  ]
}
```

## OQ-campaigns-038 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-campaigns-038",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "campaign-wizard",
  "summary": "Khi thư viện email của workspace trống, picker email ở bước Contents phải hiện gì? Bundle có chuỗi `No emails in this workspace yet.` nhưng chưa thấy trên UI.",
  "kb_ids": [
    "KB-082"
  ],
  "check_ids": [
    "campaign-wizard:CHK-033"
  ]
}
```

## OQ-campaigns-039 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-campaigns-039",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "campaign-preview-and-test",
  "summary": "Jira MTRO-62 (Send test) chưa có AC: sau khi bấm Send test người dùng phải thấy gì, mail test có subject / From như mail thật hay có đánh dấu \"test\", và gửi test có bị tính vào hạn mức gửi hằng ngày của workspace không?",
  "check_ids": [
    "campaign-preview-and-test:CHK-003"
  ]
}
```

## OQ-campaigns-040 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-campaigns-040",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "campaign-send-and-schedule",
  "summary": "Jira MTRO-92 §6 nói workspace Sending suspended bị chặn gửi campaign, Test send và Resume, phần người nhận còn lại của campaign đang gửi dở không được gửi và phải bấm Resume sau khi reinstate — quy tắc này đã áp dụng trên staging chưa, người dùng thấy thông báo gì, và campaign Scheduled tới giờ gửi khi workspace bị dừng xử lý thế nào?",
  "kb_ids": [
    "KB-116"
  ],
  "check_ids": [
    "campaign-send-and-schedule:CHK-016"
  ],
  "related_questions": [
    "UI thật của campaign đang gửi / Partly sent ra sao, và campaign Scheduled tới giờ gửi khi workspace bị Sending suspended thì xử lý thế nào?"
  ]
}
```

## OQ-campaigns-041 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-campaigns-041",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "campaign-report",
  "summary": "Khối Campaign audience phải báo gì khi segment đã bị sửa sau lần gửi (bundle: \"Segment edited since this send —\" kèm link `see it as it is now`), khi rule quá phức tạp (\"This audience uses rules too complex to show as cards.\") và khi field trong rule đã bị xoá khỏi catalog (Jira MTRO-96 ghi đang báo \"too complex\" thay vì \"field removed\")?",
  "kb_ids": [
    "KB-148"
  ],
  "check_ids": [
    "campaign-report:CHK-019"
  ]
}
```

## OQ-campaigns-042 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-campaigns-042",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "campaign-report",
  "summary": "Trên analytics global, `totals` có phải luôn dedupe người nhận (một người nhận cả campaign lẫn automation chỉ tính 1, nên totals có thể nhỏ hơn tổng sources) cho mọi chỉ số không, hay chỉ cho một số chỉ số?",
  "kb_ids": [
    "KB-185"
  ],
  "check_ids": [
    "campaign-report:CHK-030"
  ]
}
```

## OQ-campaigns-043 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-campaigns-043",
  "type": "OPEN_ISSUE",
  "feature_id": "campaign-wizard",
  "summary": "Tooltip nào của nút gửi bị disabled hiện ở trường hợp nào (`Finish every step before sending.` hay `This campaign is missing a subject, sender, audience or design…`)?",
  "kb_ids": [
    "KB-048"
  ]
}
```

## OQ-campaigns-044 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-campaigns-044",
  "type": "OPEN_ISSUE",
  "feature_id": "campaign-wizard",
  "summary": "Quy tắc validate của From email và Reply-to ở bước Sender là gì (định dạng, domain)?",
  "kb_ids": [
    "KB-057",
    "KB-092"
  ]
}
```

## OQ-campaigns-045 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-campaigns-045",
  "type": "OPEN_ISSUE",
  "feature_id": "campaign-preview-and-test",
  "summary": "Điều kiện chính xác để nút `Send test` được bật, và người nhận test có nhận email đúng nội dung/sender như campaign thật không?",
  "kb_ids": [
    "KB-095",
    "KB-097"
  ]
}
```

## OQ-campaigns-046 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-campaigns-046",
  "type": "OPEN_ISSUE",
  "feature_id": "campaign-preview-and-test",
  "summary": "Trên staging, workspace ở trạng thái Sending suspended có thật sự bị chặn Test send không, và thông báo hiện ra là gì?",
  "kb_ids": [
    "KB-116"
  ]
}
```

## OQ-campaigns-047 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-campaigns-047",
  "type": "OPEN_ISSUE",
  "feature_id": "campaign-send-and-schedule",
  "summary": "Sheet Send campaign và Schedule for later trên build hiện tại còn như quan sát 29/09/2026 không (lượt 01/10 không mở lại được vì không có draft đủ 4 bước)?",
  "kb_ids": [
    "KB-103",
    "KB-107"
  ]
}
```
