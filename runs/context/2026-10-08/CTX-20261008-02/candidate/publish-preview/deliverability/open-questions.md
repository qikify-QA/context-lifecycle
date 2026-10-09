# Open Questions — Deliverability — sổ suppression (bounce/complaint), sổ consent (unsubscribe), chặn lúc gửi và pipeline sự kiện SES

Tổng: 26 mục. Sinh từ lần bootstrap đầu tiên (DOC_BOOTSTRAP) của Mailtro, ngày 2026-10-08.

- CONFLICT: 2
- NEEDS_CONFIRMATION: 16
- OPEN_ISSUE: 8

## OQ-deliverability-001 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-deliverability-001",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": null,
  "summary": "Ma trận quyền của object Deliverability chưa chốt: role nào (Owner / Admin / Member) được xem trang Suppressions và gọi các API xem / gỡ suppression, xem / resubscribe unsubscribe? Tài liệu không ghi role cho phần lớn phát biểu; tên role thứ 3 (Member hay Marketer/Editor) còn đang tranh chấp ở cấp workspace.",
  "kb_ids": [
    "KB-001",
    "KB-012",
    "KB-026",
    "KB-027",
    "KB-028",
    "KB-035",
    "KB-044"
  ],
  "never_supersede_topic": "permission",
  "related_questions": [
    "Tài liệu câu hỏi mở của Mailtro (mục Bounce / Complaint & Suppression và mục phân quyền 2 API) không có trong bộ nguồn; không biết các câu hỏi đã có câu trả lời nào. Cần bổ sung tài liệu này trước khi publish các mục đang chờ xác nhận.",
    "Trang Suppressions chỉ được khảo sát bằng tài khoản Owner; role Admin và Member chưa từng được quan sát cho object này. Cần khảo sát lại với Admin và Member.",
    "Phân quyền của 2 Portal API suppression và unsubscribe hiện chỉ là mặc định tạm (xem = mọi member, gỡ = Admin / Owner, chặn ở API). PO chốt ma trận quyền xem / gỡ / resubscribe cho Owner, Admin, Member như thế nào?",
    "PO chốt ma trận quyền cho 2 Portal API suppression và unsubscribe: Owner, Admin, Member (hoặc tên chính thức của role thứ 3) được xem / gỡ / resubscribe thế nào? Hiện chỉ có mặc định tạm 'xem = mọi member, gỡ = Admin / Owner, chặn ở tầng API'.",
    "Ma trận quyền xem / gỡ / resubscribe cho Owner, Admin, Member (hoặc tên role thứ 3) trên trang Suppressions và 2 Portal API là gì?",
    "Role Admin và Member (tên role thứ 3 đang tranh chấp) có được xem trang Suppressions và cả hai tab không? Trang mới chỉ được khảo sát bằng Owner.",
    "Mục câu hỏi mở về Bounce / Complaint & Suppression và phân quyền 2 API (tài liệu câu hỏi mở Mailtro, không có trong bộ nguồn) đã có câu trả lời nào chưa?"
  ],
  "check_ids": [
    "suppression-list-management:CHK-016",
    "suppression-list-management:CHK-017"
  ]
}
```

## OQ-deliverability-002 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-deliverability-002",
  "type": "OPEN_ISSUE",
  "feature_id": null,
  "summary": "Các quan sát staging của object Deliverability (08–09/09, 29/09, 01/10, 06/10/2026) không ghi build / phiên bản đã deploy, nên không biết hành vi quan sát thuộc bản dựng nào. Cần ghi build khi khảo sát lại.",
  "kb_ids": [
    "KB-001",
    "KB-019",
    "KB-022",
    "KB-050"
  ],
  "missing_area": "staging-build-not-recorded",
  "related_questions": [
    "Các quan sát staging của trang này thuộc bản dựng nào (build không được ghi)?"
  ]
}
```

## OQ-deliverability-003 — CONFLICT

```json
{
  "oq_id": "OQ-deliverability-003",
  "type": "CONFLICT",
  "feature_id": "suppression-list-management",
  "summary": "Route chính thức của Portal API sổ deliverability là gì: `teams/{team}/suppressions` như AC Jira MTRO-81, hay `teams/{team}/deliverability-suppressions` như staging đang chạy (BUG-SUPP-02)? PO/Dev cần chốt đổi AC hay đổi route trước khi viết expected cho case API.",
  "kb_ids": [
    "KB-020",
    "KB-021"
  ],
  "side_a": "Theo AC Jira MTRO-81 (rule 07/09/2026 trong QA business rule Mailtro), API sổ deliverability là `GET teams/{team}/suppressions` (phân trang, lọc reason) và `DELETE teams/{team}/suppressions/{id}`.",
  "side_b": "Trên staging (lượt chạy 08/09/2026), route thật là `teams/{team}/deliverability-suppressions`; gọi `…/suppressions` theo AC trả 404 (BUG-SUPP-02, chờ PO/Dev chốt).",
  "conflict_group": "CONF-MTRO-deliverability-01",
  "never_supersede_topic": "suppression",
  "related_questions": [
    "Route chính thức của Portal API sổ deliverability là `teams/{team}/suppressions` (có phân trang, lọc theo reason, DELETE kích hoạt job quét SES) như AC Jira MTRO-81, hay `teams/{team}/deliverability-suppressions` như staging đang chạy (route AC trả 404, BUG-SUPP-02)? PO/Dev chốt đổi AC hay đổi route.",
    "Route chính thức của Portal API sổ deliverability là `teams/{team}/suppressions` (AC Jira MTRO-81) hay `teams/{team}/deliverability-suppressions` (staging, BUG-SUPP-02)?"
  ],
  "check_ids": [
    "suppression-list-management:CHK-014"
  ]
}
```

## OQ-deliverability-004 — CONFLICT

```json
{
  "oq_id": "OQ-deliverability-004",
  "type": "CONFLICT",
  "feature_id": "suppression-list-management",
  "summary": "Marketer có được resubscribe hộ người nhận (xoá entry opt-out) qua Portal API `DELETE teams/{team}/unsubscribes/{id}` hay không, khi Jira MTRO-92 mục 11 ghi người nhận chỉ resubscribe được qua trang huỷ đăng ký của chính mình (GAP-06 Major)?",
  "kb_ids": [
    "KB-024",
    "KB-025"
  ],
  "side_a": "Theo Jira MTRO-81 (rule trong QA business rule Mailtro, cập nhật 07/10/2026), `DELETE teams/{team}/unsubscribes/{id}` là thao tác resubscribe do marketer khởi xướng, bắt buộc ghi actor.",
  "side_b": "Theo Jira MTRO-92 mục 11 (QA KB Mailtro \"Security & Abuse guard\" v1, đọc 07/10/2026), người nhận chỉ resubscribe được qua trang huỷ đăng ký của chính mình — phía này thuộc object abuse-guard (feature transactional-mail-safeguards), cùng conflict_group CONF-MTRO-deliverability-02.",
  "conflict_group": "CONF-MTRO-deliverability-02",
  "never_supersede_topic": "unsubscribe-consent",
  "related_questions": [
    "Marketer có được resubscribe hộ người nhận qua `DELETE teams/{team}/unsubscribes/{id}` (Jira MTRO-81, cập nhật 07/10/2026) hay người nhận chỉ resubscribe được qua trang huỷ đăng ký của chính mình (Jira MTRO-92 mục 11, GAP-06)? Nếu được, actor bắt buộc ghi lại được lưu ở đâu và xem lại thế nào?",
    "Marketer có được resubscribe hộ người nhận qua `DELETE teams/{team}/unsubscribes/{id}` không, khi Jira MTRO-92 mục 11 ghi người nhận chỉ resubscribe qua trang huỷ đăng ký của chính mình (GAP-06)?"
  ],
  "check_ids": [
    "suppression-list-management:CHK-015"
  ],
  "also_affects": [
    {
      "object_id": "abuse-guard",
      "kb_ids": [
        "KB-098",
        "KB-099"
      ]
    }
  ]
}
```

## OQ-deliverability-005 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-deliverability-005",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "suppression-list-management",
  "summary": "Trang Suppressions trên staging (01/10/2026) chỉ để xem, không có nút gỡ suppression hay resubscribe; rule 07/09/2026 ghi chỉ gỡ được thủ công qua Portal API. PO xác nhận đây là giới hạn có chủ ý, hay UI cần có thao tác gỡ / resubscribe (GAP-14, task Testlane MTRO-010)?",
  "kb_ids": [
    "KB-012",
    "KB-013"
  ],
  "related_questions": [
    "Trang Suppressions chỉ để xem (không có nút gỡ / resubscribe) là giới hạn có chủ ý hay UI cần có thao tác này (GAP-14)?"
  ]
}
```

## OQ-deliverability-006 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-deliverability-006",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "suppression-list-management",
  "summary": "Khi một team gỡ suppression, địa chỉ cũng bị xoá khỏi danh sách suppression account-global của SES, nên team khác trên cùng AWS account mất lớp bảo vệ. PO/Dev chấp nhận hành vi này hay cần xử lý khác?",
  "kb_ids": [
    "KB-028",
    "KB-015",
    "KB-041"
  ],
  "never_supersede_topic": "suppression",
  "related_questions": [
    "Khi một workspace gỡ suppression, địa chỉ cũng bị xoá khỏi danh sách suppression account-global của SES nên workspace khác trên cùng AWS account mất lớp bảo vệ đó. PO/Dev chấp nhận hành vi này hay cần xử lý khác (ví dụ chỉ xoá khỏi SES khi không workspace nào còn suppress địa chỉ)?",
    "Gỡ suppression ở một team làm địa chỉ rời danh sách SES account-global, team khác cùng AWS account mất bảo vệ — PO/Dev chấp nhận hay cần xử lý khác?"
  ],
  "check_ids": [
    "suppression-list-management:CHK-018"
  ]
}
```

## OQ-deliverability-007 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-deliverability-007",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "suppression-list-management",
  "summary": "Import CSV lại một contact đang bị suppress có báo cho người dùng biết hay không (GAP-10, task Testlane MTRO-025)? Hiện chưa có expected.",
  "kb_ids": [
    "KB-010"
  ],
  "related_questions": [
    "Import CSV lại một contact đang bị suppress có báo cho người dùng không (GAP-10)?"
  ]
}
```

## OQ-deliverability-008 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-deliverability-008",
  "type": "OPEN_ISSUE",
  "feature_id": "suppression-list-management",
  "summary": "Tài liệu chưa mô tả một số chi tiết của trang và API Suppressions: suppression do soft bounce hiển thị nhãn `Reason` gì (UI chỉ có `Bounced` / `Spam complaint`); `Rows per page` và mặc định của tab `Unsubscribe`; trang có ô tìm kiếm / lọc không; actor của thao tác resubscribe được lưu ở đâu và xem lại thế nào. Không suy diễn; cần khảo sát hoặc hỏi Dev.",
  "kb_ids": [
    "KB-004",
    "KB-005",
    "KB-007",
    "KB-025",
    "KB-032"
  ],
  "missing_area": "suppressions-ui-and-audit-details",
  "related_questions": [
    "Suppression do soft bounce hiện nhãn `Reason` gì trên UI (chỉ thấy `Bounced` / `Spam complaint`); tab Unsubscribe có `Rows per page` và mặc định nào; trang có ô tìm kiếm / lọc không?",
    "Actor của mỗi lần resubscribe qua API được lưu ở đâu và xem lại bằng cách nào?",
    "Suppression do soft bounce hiển thị nhãn gì ở cột `Reason` của trang Suppressions?"
  ]
}
```

## OQ-deliverability-009 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-deliverability-009",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "bounce-complaint-suppression",
  "summary": "Vì mỗi event Delivery xoá hẳn counter soft bounce, rule \"7 soft bounce liên tiếp\" gần như không kích hoạt. PO xác nhận đây là chủ ý hay thiếu sót cần đổi cách reset?",
  "kb_ids": [
    "KB-034",
    "KB-035",
    "KB-032"
  ],
  "related_questions": [
    "Reset counter soft bounce mỗi khi có Delivery khiến ngưỡng 7 lần liên tiếp gần như không đạt — PO muốn giữ cách reset này hay đổi?"
  ]
}
```

## OQ-deliverability-010 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-deliverability-010",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "bounce-complaint-suppression",
  "summary": "Dev xác nhận các điểm biên của rule suppress: (1) địa chỉ có sẵn trên danh sách suppression của SES sinh row `reason = hard_bounce` ở tầng ứng dụng (TC-MTRO-601, 09/09/2026) có đúng Expected không; (2) event `bounceSubType = Suppressed` tạo row với reason gì; (3) mọi `complaintFeedbackType` đều dẫn tới suppress hay chỉ loại `abuse`.",
  "kb_ids": [
    "KB-044",
    "KB-030",
    "KB-018",
    "KB-029"
  ],
  "related_questions": [
    "Gửi tới địa chỉ đã có trên danh sách suppression account-level của SES sinh row suppression ở tầng ứng dụng với `reason = hard_bounce` (quan sát TC-MTRO-601, 09/09/2026) — đó có phải Expected không, hay cần reason riêng / không tạo row?",
    "Event bounce `bounceSubType = Suppressed` tạo row suppression với reason gì? Mọi `complaintFeedbackType` đều dẫn tới suppress hay chỉ loại `abuse`?",
    "Địa chỉ có sẵn trên danh sách suppression của SES có đúng là sinh row `reason = hard_bounce` ở tầng ứng dụng không; event `bounceSubType = Suppressed` tạo row với reason gì; mọi `complaintFeedbackType` đều dẫn tới suppress hay chỉ loại `abuse`?"
  ],
  "check_ids": [
    "bounce-complaint-suppression:CHK-011",
    "bounce-complaint-suppression:CHK-012"
  ]
}
```

## OQ-deliverability-011 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-deliverability-011",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "bounce-complaint-suppression",
  "summary": "Epic Jira MTRO-64 ghi use case B2 (soft bounce) và B6 (delivery breakdown) là \"Later\", nhưng task MTRO-77 (soft bounce counter) và MTRO-82 (6 số delivery) đã DONE và rule/quyết định 07/09/2026 coi chúng là hành vi hiện hành. PO xác nhận hai mảng này thuộc phạm vi hiện hành?",
  "kb_ids": [
    "KB-031",
    "KB-032",
    "KB-033",
    "KB-034",
    "KB-069"
  ],
  "related_questions": [
    "Soft bounce (Epic B2 'Later') và 6 số delivery (Epic B6 'Later') có thuộc phạm vi hiện hành không, khi task MTRO-77 và MTRO-82 đã DONE?"
  ]
}
```

## OQ-deliverability-012 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-deliverability-012",
  "type": "OPEN_ISSUE",
  "feature_id": "bounce-complaint-suppression",
  "summary": "Tài liệu thiết kế bounce / complaint của repo sản phẩm (26/08/2026) QA chưa truy cập được; chi tiết ngoài rule 07/09/2026 và Decision log (cách chọn region/account SES cho một lần gửi, cập nhật trạng thái contact) chưa được mô tả. Không suy diễn.",
  "kb_ids": [
    "KB-029",
    "KB-030",
    "KB-041"
  ],
  "missing_area": "bounce-complaint-design-doc",
  "related_questions": [
    "Tài liệu thiết kế bounce / complaint của repo sản phẩm (26/08/2026) mô tả gì thêm ngoài rule 07/09/2026 — cách chọn region / account SES cho một lần gửi, cập nhật trạng thái contact?"
  ]
}
```

## OQ-deliverability-013 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-deliverability-013",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "send-time-suppression-check",
  "summary": "Reason-set của các sending lane khác marketing (transactional, và automation nếu khác) là gì — lane nào chặn sổ nào? Rule 07/09/2026 chỉ khẳng định lane marketing chặn cả hai sổ, còn QA KB Mailtro \"Feature map\" v1 ghi chặn cả hai sổ ở mọi lane.",
  "kb_ids": [
    "KB-045",
    "KB-046",
    "KB-048"
  ],
  "never_supersede_topic": "unsubscribe-consent",
  "related_questions": [
    "Reason-set của các sending lane khác marketing (transactional, và automation nếu khác) là gì — lane nào chặn sổ consent, lane nào chặn sổ suppression? Rule 07/09/2026 chỉ khẳng định lane marketing chặn cả hai sổ; tài liệu Feature map ghi chặn cả hai sổ ở mọi lane.",
    "Reason-set của các sending lane khác marketing (transactional, và automation nếu khác) là gì — lane nào chặn sổ suppression, lane nào chặn sổ consent?"
  ],
  "check_ids": [
    "send-time-suppression-check:CHK-007"
  ]
}
```

## OQ-deliverability-014 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-deliverability-014",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "send-time-suppression-check",
  "summary": "Những màn hình nào dùng `ContactsResource::baseQuery` (loại contact bị suppress)? Trên staging 08–09/09/2026 contact bị suppress vẫn hiện ở màn Contacts — đó có phải expected không? Ngoài ra, danh sách người nhận campaign \"chốt lúc dựng\" là lúc bấm Send, lúc schedule hay lúc bắt đầu gửi, và contact bị suppress sau thời điểm đó còn nhận mail không?",
  "kb_ids": [
    "KB-049",
    "KB-051",
    "KB-053"
  ],
  "related_questions": [
    "Danh sách người nhận của campaign 'chốt lúc dựng lần gửi' là lúc bấm Send, lúc schedule hay lúc bắt đầu gửi? Contact unsubscribe / bị suppress sau thời điểm đó còn nhận mail không, hay bước kiểm lúc gửi vẫn chặn?",
    "Những màn nào dùng query cơ sở loại contact bị suppress; màn Contacts vẫn hiện contact bị suppress có phải expected không?",
    "Danh sách người nhận campaign 'chốt lúc dựng' là lúc bấm Send, lúc schedule hay lúc bắt đầu gửi; contact bị suppress sau thời điểm đó còn nhận mail không?"
  ],
  "check_ids": [
    "send-time-suppression-check:CHK-009"
  ]
}
```

## OQ-deliverability-015 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-deliverability-015",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "send-time-suppression-check",
  "summary": "Khi so địa chỉ với sổ suppression / unsubscribe trước lúc gửi, email được chuẩn hoá thế nào (chữ hoa / thường, plus-addressing)? Dev cần xác nhận để biết địa chỉ biến thể có bị chặn gửi không.",
  "kb_ids": [
    "KB-045"
  ],
  "related_questions": [
    "Khi so địa chỉ với sổ suppression / unsubscribe trước lúc gửi, email được chuẩn hoá thế nào (chữ hoa / thường, plus-addressing)? Địa chỉ biến thể của địa chỉ bị suppress / đã unsubscribe có bị chặn gửi không?",
    "Khi so địa chỉ với hai sổ trước lúc gửi, email được chuẩn hoá thế nào (chữ hoa / thường, plus-addressing)?"
  ],
  "check_ids": [
    "send-time-suppression-check:CHK-008"
  ]
}
```

## OQ-deliverability-016 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-deliverability-016",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "ses-event-pipeline",
  "summary": "Worker xử lý sự kiện SES có dedupe message SQS (giao at-least-once) không — event trùng có làm tăng counter soft bounce hai lần? Message SNS có chữ ký sai bị xử lý thế nào (drop / log / cảnh báo)?",
  "kb_ids": [
    "KB-058",
    "KB-060",
    "KB-031"
  ],
  "related_questions": [
    "Worker validate chữ ký SNS của mỗi message; message có chữ ký sai bị xử lý thế nào — drop, log, cảnh báo, hay đưa vào dead-letter queue?",
    "Worker có dedupe message SQS (giao at-least-once) không? Event trùng có làm tăng counter soft bounce hai lần hoặc làm số liệu delivery của campaign đếm hai lần không?",
    "Worker có dedupe message SQS (giao at-least-once) không — event trùng có làm counter soft bounce tăng hai lần?",
    "Message SNS có chữ ký sai bị xử lý thế nào (drop, log, cảnh báo)?"
  ],
  "check_ids": [
    "ses-event-pipeline:CHK-004",
    "ses-event-pipeline:CHK-005"
  ]
}
```

## OQ-deliverability-017 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-deliverability-017",
  "type": "OPEN_ISSUE",
  "feature_id": "ses-event-pipeline",
  "summary": "Pipeline sự kiện SES chỉ có mô tả từ rule 07/09/2026 và Decision log; chưa có quan sát staging trực tiếp của worker (phần lớn case bị chặn vì thiếu credential AWS và quyền DB staging). Ngưỡng \"câm bất thường\" và lịch chạy của cảnh báo region cũng chưa được mô tả. Cần quyền truy cập hoặc tài liệu bổ sung.",
  "kb_ids": [
    "KB-058",
    "KB-063",
    "KB-070",
    "KB-071"
  ],
  "missing_area": "ses-pipeline-observation",
  "related_questions": [
    "Ngưỡng 'câm bất thường' và lịch chạy của scheduled command cảnh báo region là gì?",
    "Khi nào QA có quyền AWS / DB staging để quan sát trực tiếp pipeline (whitelist, drop, `ses_events`, `last_event_at`)?"
  ]
}
```

## OQ-deliverability-018 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-deliverability-018",
  "type": "OPEN_ISSUE",
  "feature_id": "unsubscribe-handling",
  "summary": "BUG-SUPP-06 (P0, 08/09/2026: link unsubscribe trong mail campaign không bật được, `rendered_html` không có link) đang ở trạng thái cần retest; ngày 06/10/2026 đã thấy contact Unsubscribed \"via Footer link\". Cần một lượt retest chính thức để đóng hoặc mở lại lỗi; trong lúc chờ, dùng làm regression watch, không làm expected.",
  "kb_ids": [
    "KB-085",
    "KB-086",
    "KB-073",
    "KB-084"
  ],
  "never_supersede_topic": "unsubscribe-consent",
  "related_questions": [
    "BUG-SUPP-06 (link unsubscribe trong mail campaign không bật được) đã thực sự được sửa chưa — cần một lượt retest chính thức để đóng hay mở lại?"
  ]
}
```

## OQ-deliverability-019 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-deliverability-019",
  "type": "OPEN_ISSUE",
  "feature_id": "unsubscribe-handling",
  "summary": "Trang xác nhận unsubscribe phía người nhận (route dạng `/u/{token}` theo tổng quan bản dựng 03/09/2026) chưa được mô tả và chưa đối chiếu trên staging: nội dung hiển thị, có nút resubscribe không, token hết hạn thì sao. Không suy diễn; cần khảo sát với role người nhận.",
  "kb_ids": [
    "KB-075",
    "KB-087"
  ],
  "missing_area": "recipient-unsubscribe-page",
  "related_questions": [
    "Trang xác nhận unsubscribe phía người nhận (dạng `/u/{token}` theo tổng quan bản dựng 03/09/2026, chưa đối chiếu staging) hiển thị gì, có nút resubscribe không, và phản hồi thế nào khi token sai, hết hạn hoặc đã dùng?",
    "Trang xác nhận unsubscribe phía người nhận (dạng `/u/{token}`) hiển thị gì, có nút resubscribe không, token hết hạn hoặc sai thì sao?"
  ],
  "check_ids": [
    "unsubscribe-handling:CHK-009"
  ]
}
```

## OQ-deliverability-020 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-deliverability-020",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "unsubscribe-handling",
  "summary": "Sau khi người nhận unsubscribe, Consent của contact đổi trong bao lâu (Jira MTRO-69 \"vài giây\" đang To Do)? Và sau khi resubscribe qua Portal API, Consent của contact có đổi về `Subscribed` không? Tài liệu không mô tả đồng bộ giữa sổ consent và trạng thái contact.",
  "kb_ids": [
    "KB-088",
    "KB-076",
    "KB-024"
  ],
  "never_supersede_topic": "unsubscribe-consent",
  "related_questions": [
    "Sau khi người nhận unsubscribe, Consent của contact đổi sang Unsubscribed trong bao lâu (Jira MTRO-69 'trong vài giây' đang To Do)? Consent ở danh sách, trang chi tiết và sổ consent có luôn khớp nhau không?",
    "Sau khi người nhận unsubscribe, Consent của contact đổi trong bao lâu; sau khi resubscribe, Consent có về `Subscribed` không?"
  ],
  "check_ids": [
    "unsubscribe-handling:CHK-010"
  ]
}
```

## OQ-deliverability-021 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-deliverability-021",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "suppression-list-management",
  "summary": "Trên UI, nguồn opt-out qua one-click header và do staff thêm có hiển thị nhãn `One-click header` / `Added by staff` không, và trạng thái rỗng của tab `Bounce & complaint` / `Unsubscribe` có phải `Nothing is blocked` / `Nobody has opted out`? Hai chi tiết này mới chỉ thấy trong chuỗi i18n, chưa thấy trên UI.",
  "check_ids": [
    "suppression-list-management:CHK-007"
  ],
  "kb_ids": [
    "KB-009",
    "KB-011"
  ]
}
```

## OQ-deliverability-022 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-deliverability-022",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "ses-event-pipeline",
  "summary": "Ngưỡng 'câm bất thường' của một region (bao lâu không có event trong khi vẫn có broadcast gửi qua) và lịch chạy của scheduled command cảnh báo region là bao nhiêu?",
  "check_ids": [
    "ses-event-pipeline:CHK-008"
  ]
}
```

## OQ-deliverability-023 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-deliverability-023",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "unsubscribe-handling",
  "summary": "Unsubscribe qua header one-click hiện đã có hiệu lực chưa: POST tới URL `List-Unsubscribe` có ghi entry opt-out (nguồn `One-click header`) không, và domain cần gửi đủ bao nhiêu thì Gmail mới hỗ trợ (ghi chú PO 24/08/2026 nói 'chưa có hiệu lực ngay')?",
  "kb_ids": [
    "KB-081"
  ],
  "check_ids": [
    "unsubscribe-handling:CHK-007"
  ],
  "related_questions": [
    "Domain phải gửi bao nhiêu thì Gmail mới hỗ trợ one-click unsubscribe?"
  ]
}
```

## OQ-deliverability-024 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-deliverability-024",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "unsubscribe-handling",
  "summary": "Link huỷ đăng ký trong mail đã gửi còn hoạt động (mở trang xác nhận và ghi opt-out) khi workspace bị Sending suspended hoặc Disabled không (GAP-10)?",
  "check_ids": [
    "unsubscribe-handling:CHK-011"
  ],
  "related_questions": [
    "Link huỷ đăng ký trong mail đã gửi còn hoạt động khi workspace ở trạng thái Sending suspended / Disabled không (GAP-10)?"
  ]
}
```

## OQ-deliverability-025 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-deliverability-025",
  "type": "OPEN_ISSUE",
  "feature_id": "bounce-complaint-suppression",
  "summary": "Địa chỉ nằm trên danh sách suppression account-global của SES (không có row trong workspace) có hiện ở trang Suppressions của workspace không?",
  "kb_ids": [
    "KB-041",
    "KB-043"
  ]
}
```

## OQ-deliverability-026 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-deliverability-026",
  "type": "OPEN_ISSUE",
  "feature_id": "send-time-suppression-check",
  "summary": "Run automation gặp contact bị suppressed được đếm vào Bounced hay Spam complaints theo tiêu chí nào?",
  "kb_ids": [
    "KB-057"
  ]
}
```
