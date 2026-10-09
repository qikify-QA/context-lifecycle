# Open Questions — Email preferences — preference page cho người nhận chọn loại email, gắn vào campaign/automation

Tổng: 21 mục. Sinh từ lần bootstrap đầu tiên (DOC_BOOTSTRAP) của Mailtro, ngày 2026-10-08.

- CONFLICT: 2
- NEEDS_CONFIRMATION: 14
- OPEN_ISSUE: 5

## OQ-email-preferences-001 — CONFLICT

```json
{
  "oq_id": "OQ-email-preferences-001",
  "type": "CONFLICT",
  "feature_id": "preference-page-management",
  "summary": "Preference center của Mailtro theo mô hình nào: mỗi choice ghi true/false vào một custom field Boolean của contact (đúng như bản dựng staging 01/10/2026), hay cấu hình theo list như Jira MTRO-73 mô tả? PO cần chốt (GAP-01 Blocker); hiện mọi rule của module chỉ là quan sát staging.",
  "kb_ids": [
    "KB-045",
    "KB-046"
  ],
  "side_a": "Trên staging (bản dựng khảo sát 01/10/2026), mỗi choice của preference page là checkbox ghi true/false vào một custom field Boolean của contact; marketer lọc người nhận bằng segment trên field đó.",
  "side_b": "Theo Jira MTRO-73 (Story To Do, đọc 07/10/2026), preference center được cấu hình theo list, \"not custom-property-based topics\".",
  "conflict_group": "CONF-MTRO-email-preferences-01",
  "tags": [
    "unsubscribe-consent"
  ],
  "related_questions": [
    "Preference center của Mailtro theo mô hình nào: mỗi choice ghi true/false vào một custom field Boolean của contact (như bản dựng staging 01/10/2026), hay cấu hình theo list như Jira MTRO-73 mô tả, trong khi sản phẩm hiện không có khái niệm list tĩnh (GAP-01 Blocker)?",
    "Preference center theo mô hình nào: mỗi choice ghi true/false vào một custom field Boolean của contact (như bản dựng staging 01/10/2026), hay cấu hình theo list như Jira MTRO-73 mô tả, trong khi sản phẩm hiện không có khái niệm list tĩnh?"
  ],
  "check_ids": [
    "preference-page-management:CHK-027"
  ]
}
```

## OQ-email-preferences-002 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-email-preferences-002",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "preference-page-management",
  "summary": "Có được phép tắt switch Show “Unsubscribe from all emails” trên preference page không, xét yêu cầu CAN-SPAM / GDPR? Staging 01/10/2026 cho tắt (mặc định bật, chỉ hiện cảnh báo Gmail); PO cần xác nhận (GAP-11).",
  "kb_ids": [
    "KB-019"
  ],
  "tags": [
    "unsubscribe-consent"
  ],
  "related_questions": [
    "Có được phép lưu preference page với switch Show “Unsubscribe from all emails” tắt không, xét yêu cầu CAN-SPAM / GDPR (GAP-11)? Nếu được, có ràng buộc gì để người nhận vẫn huỷ toàn bộ được (ví dụ link unsubscribe ở footer)? Staging 01/10/2026 cho tắt và chỉ hiện cảnh báo.",
    "Có được phép tắt switch Show “Unsubscribe from all emails” trên preference page không, xét yêu cầu CAN-SPAM / GDPR (GAP-11)?"
  ],
  "check_ids": [
    "preference-page-management:CHK-005"
  ]
}
```

## OQ-email-preferences-003 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-email-preferences-003",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "preference-page-management",
  "summary": "Preference page lưu trước 01/10/2026 có choice trỏ vào custom field kiểu text (khi picker còn liệt kê field text) có được migrate sang field Boolean không, hay vẫn ghi true/false vào field text (GAP-14)?",
  "kb_ids": [
    "KB-022",
    "KB-023",
    "KB-026"
  ],
  "check_ids": [
    "preference-page-management:CHK-026"
  ],
  "related_questions": [
    "Preference page lưu trước 01/10/2026 có choice trỏ vào field kiểu text có được migrate sang field Boolean không, hay vẫn ghi true/false vào field text (GAP-14)?"
  ]
}
```

## OQ-email-preferences-004 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-email-preferences-004",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "preference-page-management",
  "summary": "Giới hạn của preference page chưa được nêu: độ dài tối đa của tên page / tên choice / mô tả, số choice tối đa, có cho trùng tên page không; và API preference-pages có phân trang hoặc giới hạn số page không (nếu có, màn Edit sẽ báo \"không tồn tại\" cho page ngoài trang đầu) — GAP-09, GAP-10, GAP-17.",
  "kb_ids": [
    "KB-015",
    "KB-010",
    "KB-033"
  ],
  "related_questions": [
    "API `preference-pages` có phân trang hay giới hạn số page trong một workspace không (GAP-17)? Nếu có, màn Edit (đang tìm id trong danh sách đã nạp) có báo \"không tồn tại\" cho page ngoài trang đầu không?",
    "Giới hạn của preference page là gì: độ dài tối đa của tên page / tên choice / mô tả, số choice tối đa, và có cho hai page trùng tên không (GAP-09, GAP-10)? Tài liệu chưa nêu boundary nào.",
    "Giới hạn của preference page là gì: độ dài tối đa của tên page / tên choice / mô tả, số choice tối đa, có cho trùng tên page không, và API `preference-pages` có phân trang hay giới hạn số page không (GAP-09, GAP-10, GAP-17)?"
  ],
  "check_ids": [
    "preference-page-management:CHK-023",
    "preference-page-management:CHK-024"
  ]
}
```

## OQ-email-preferences-005 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-email-preferences-005",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "preference-page-management",
  "summary": "Role nào (Owner / Admin / role thứ 3) được xem, tạo, sửa, xoá preference page? Route /preferences không khai báo phân quyền theo role và ma trận quyền theo module (gồm preferences page) chưa được PO chốt; tài liệu không ghi role của tài khoản khảo sát.",
  "kb_ids": [
    "KB-044"
  ],
  "tags": [
    "permission"
  ],
  "related_questions": [
    "Role nào (Owner / Admin / role thứ 3) được xem, tạo, sửa, xoá preference page, và việc chặn có nằm ở API không? Router không khai báo quyền theo role và ma trận quyền chưa chốt.",
    "Role nào (Owner / Admin / role thứ 3) được xem, tạo, sửa, xoá preference page, và việc chặn có nằm ở API không?"
  ],
  "check_ids": [
    "preference-page-management:CHK-028"
  ]
}
```

## OQ-email-preferences-006 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-email-preferences-006",
  "type": "OPEN_ISSUE",
  "feature_id": "preference-page-management",
  "summary": "Theo dõi hồi quy 4 lỗi đã biết của builder Email preferences (chưa có PO/Dev xác nhận, không dùng làm expected result): Back khi form có thay đổi về list ngay và mất dữ liệu (đóng tab/reload cũng không chặn); thông báo not-found vẫn nhắc \"sample data reset\"; danh sách tải lỗi bị hiện thành \"page doesn't exist\"; dialog New custom field bật Create field với tên sai định dạng.",
  "kb_ids": [
    "KB-009",
    "KB-011",
    "KB-013",
    "KB-014",
    "KB-028",
    "KB-040",
    "KB-042"
  ],
  "related_questions": [
    "Khi tạo custom field từ dialog New custom field với tên sai định dạng (ví dụ `Bad Name`), hệ thống phải chặn ở client hay để BE trả lỗi, và thông báo lỗi là gì? Staging 01/10/2026 bật nút `Create field` với tên sai định dạng, trái hint của dialog; chưa bấm thử để xem BE phản hồi.",
    "Khi API danh sách preference page lỗi, trang `/preferences` và màn Edit phải hiện gì? Theo bundle FE trang danh sách hiện `Could not load your preferences pages`, nhưng màn Edit đang hiện alert \"page không tồn tại\" (lỗi đã biết, chưa có PO/Dev xác nhận).",
    "Form preference page có thay đổi chưa lưu thì khi bấm Back / reload / đóng tab phải có cảnh báo rời trang không (như Email editor và Automation builder)? Staging 01/10/2026 về list ngay và mất thay đổi; đây là lỗi đã biết đang mở, chưa có PO/Dev xác nhận hành vi đúng.",
    "Bốn hành vi hiện trạng của builder — Back không cảnh báo rời trang, câu not-found nhắc \"sample data reset\", lỗi tải danh sách hiện thành not-found, dialog New custom field bật Create field với tên sai định dạng — sẽ được sửa thành hành vi nào?"
  ],
  "check_ids": [
    "preference-page-management:CHK-010",
    "preference-page-management:CHK-022",
    "preference-page-management:CHK-025"
  ]
}
```

## OQ-email-preferences-007 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-email-preferences-007",
  "type": "OPEN_ISSUE",
  "feature_id": "preference-page-management",
  "summary": "Module Email preferences chưa có nguồn thẩm quyền nào: QA business rule Mailtro chưa có rule cho Email preferences, Jira MTRO-70 (Partial unsubscribe - preference center) có description trống, AC của Jira MTRO-17 chưa được kiểm, và các BR của task Testlane MTRO-024 phần lớn là quan sát staging. Vì vậy object này không có item CONFIRMED_EXPECTED nào; cần PO/BA bổ sung rule hoặc AC.",
  "kb_ids": [
    "KB-045",
    "KB-047"
  ],
  "tags": [
    "unsubscribe-consent"
  ],
  "related_questions": [
    "Module Email preferences có nguồn thẩm quyền nào (business rule, AC Jira) để làm expected result không, khi business rule chưa có mục này, Jira MTRO-70 có description trống và AC của Jira MTRO-17 chưa được kiểm?"
  ]
}
```

## OQ-email-preferences-008 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-email-preferences-008",
  "type": "OPEN_ISSUE",
  "feature_id": "preference-page-management",
  "summary": "Nhiều luồng của preference page chưa được đối chiếu trên UI lần khảo sát 01/10/2026 (workspace có 0 page, không bấm Save/Delete): danh sách có dữ liệu, menu Edit/Delete, xoá thật, validate khi Save, Save thành công + toast, form Edit page khác form New page ở đâu. Các item tương ứng chỉ dựa trên quan sát 29/09/2026 hoặc bundle; cần khảo sát lại với fixture.",
  "kb_ids": [
    "KB-005",
    "KB-006",
    "KB-008",
    "KB-017",
    "KB-033",
    "KB-035",
    "KB-036",
    "KB-037"
  ],
  "tags": [
    "data-deletion"
  ],
  "related_questions": [
    "Màn Edit của preference page (`/preferences/:id`) có hành vi giống form New không (cùng giá trị, cùng kiểm tra khi Save) và sửa rồi Save có cập nhật đúng page cũ không? Lần khảo sát 01/10/2026 không có page để mở màn Edit; hành vi chỉ biết qua bundle.",
    "Xoá preference page thành công / thất bại phải hiện thông báo gì, và page có bị xoá hẳn ở BE không? Trên staging chưa xoá thật lần nào; toast `Preferences page deleted` / `Could not delete this page` chỉ biết qua bundle FE.",
    "Danh sách có dữ liệu, menu Edit/Delete, xoá thật, kiểm tra khi Save, Save thành công kèm toast, và khác biệt giữa form Edit với form New hiện hoạt động thế nào trên staging khi workspace có page?"
  ],
  "check_ids": [
    "preference-page-management:CHK-015",
    "preference-page-management:CHK-019"
  ]
}
```

## OQ-email-preferences-009 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-email-preferences-009",
  "type": "OPEN_ISSUE",
  "feature_id": "preference-page-management",
  "summary": "Email preferences chưa được khảo sát bằng role khác ngoài tài khoản khảo sát mặc định: tài khoản Admin là placeholder và chưa có lượt Member, nên không có quan sát nào về việc role khác thấy / thao tác được preference page.",
  "kb_ids": [
    "KB-044"
  ],
  "tags": [
    "permission"
  ]
}
```

## OQ-email-preferences-010 — CONFLICT

```json
{
  "oq_id": "OQ-email-preferences-010",
  "type": "CONFLICT",
  "feature_id": "preference-page-in-sends",
  "summary": "Khi người nhận bỏ tick một choice trên trang preference, họ có tự bị loại khỏi các campaign về choice đó không, hay vẫn nhận trừ khi segment của campaign có điều kiện loại giá trị false trên field của choice? Copy trên trang /preferences và cảnh báo ở bước Recipients nói ngược nhau; PO cần chốt (GAP-02 Blocker, rủi ro tuân thủ) và cần một lần gửi thật để kiểm chứng.",
  "kb_ids": [
    "KB-053",
    "KB-054",
    "KB-051",
    "KB-052",
    "KB-049",
    "KB-031"
  ],
  "side_a": "Theo copy bước 3 trên trang /preferences (staging 01/10/2026): \"Anyone who unticks a choice is left out of campaigns about it.\" — người bỏ tick tự bị loại.",
  "side_b": "Theo QA KB Mailtro \"Feature map\" v1 và cảnh báo i18n `Your segment ignores some of the page's choices` (staging 01/10/2026): người bỏ tick không tự bị loại, vẫn nhận campaign nếu segment không lọc field của choice.",
  "conflict_group": "CONF-MTRO-email-preferences-02",
  "tags": [
    "unsubscribe-consent"
  ],
  "related_questions": [
    "Khi người nhận bỏ tick một choice trên trang preference, họ có tự bị loại khỏi các campaign về choice đó không (như copy hướng dẫn bước 3 trên `/preferences`), hay vẫn nhận trừ khi segment của campaign có điều kiện loại giá trị false trên field của choice (như bản dựng và cảnh báo i18n mô tả)? PO cần chốt (GAP-02 Blocker, rủi ro tuân thủ).",
    "Khi người nhận bỏ tick một choice trên trang preference, họ có tự bị loại khỏi các campaign về choice đó không, hay vẫn nhận trừ khi segment của campaign có điều kiện loại giá trị false trên field của choice?"
  ],
  "check_ids": [
    "preference-page-in-sends:CHK-007"
  ]
}
```

## OQ-email-preferences-011 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-email-preferences-011",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "preference-page-in-sends",
  "summary": "Bước hướng dẫn 2 trên trang /preferences bảo \"pick the page and tick the choices this campaign is about\" ở bước Recipients, nhưng bước Recipients của campaign (staging 01/10/2026) chỉ có combobox chọn page, không có ô tick choice và campaign chỉ lưu preference_page_id. Đây là copy cũ cần sửa, hay wizard còn thiếu ô chọn choice?",
  "kb_ids": [
    "KB-050",
    "KB-049",
    "KB-048"
  ],
  "tags": [
    "unsubscribe-consent"
  ],
  "related_questions": [
    "Bước hướng dẫn 2 trên `/preferences` (\"pick the page and tick the choices this campaign is about\") là copy cũ cần sửa, hay bước Recipients của campaign còn thiếu ô chọn choice?"
  ]
}
```

## OQ-email-preferences-012 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-email-preferences-012",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "preference-page-in-sends",
  "summary": "Cột Used in và cảnh báo khi xoá preference page chỉ đếm campaign, không đếm automation (GAP-07). Dev cần xác nhận: used_in_campaigns có nên tính automation không; khi xoá page đang được automation hoặc campaign Scheduled dùng thì link {{preferences_url}} trong email mở trang nào, và builder có báo gì không (GAP-08)?",
  "kb_ids": [
    "KB-007",
    "KB-061",
    "KB-062"
  ],
  "tags": [
    "data-deletion",
    "unsubscribe-consent"
  ],
  "related_questions": [
    "Khi xoá preference page đang được automation (hoặc campaign Scheduled) dùng, link `{{preferences_url}}` trong email mở trang nào và builder có báo gì không (GAP-07, GAP-08)? Có nên chặn hoặc cảnh báo trước khi xoá không?",
    "Cột `Used in` và cảnh báo xoá có nên tính cả automation không (GAP-07); khi xoá page đang được automation hoặc campaign Scheduled dùng thì link `{{preferences_url}}` mở trang nào và builder có báo gì không (GAP-08)?",
    "Khi xoá preference page đang được campaign dùng, hộp xác nhận phải cảnh báo gì và link unsubscribe của các campaign đó (kể cả campaign Scheduled) mở trang nào sau khi xoá? Câu \"{count} campaign(s) use this page. Their unsubscribe link will go back to the plain “Unsubscribe from all” page.\" chỉ biết qua bundle FE (GAP-08)."
  ],
  "check_ids": [
    "preference-page-in-sends:CHK-017",
    "preference-page-management:CHK-020"
  ]
}
```

## OQ-email-preferences-013 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-email-preferences-013",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "preference-page-in-sends",
  "summary": "Trên trang preference công khai, bấm Unsubscribe from all emails có ghi sổ unsubscribe giống link unsubscribe ở footer không; và I clicked by mistake — resubscribe có gỡ trạng thái unsubscribe/suppression và ghi người thực hiện không (GAP-05)?",
  "kb_ids": [
    "KB-059",
    "KB-043"
  ],
  "tags": [
    "unsubscribe-consent",
    "suppression"
  ],
  "related_questions": [
    "Trên trang preference công khai, `Unsubscribe from all emails` có ghi sổ unsubscribe giống link footer không, và `I clicked by mistake — resubscribe` có gỡ trạng thái unsubscribe / suppression và ghi lại người thực hiện không (GAP-05)? Hai trạng thái này hiện chỉ biết qua preview phía client trong builder."
  ],
  "check_ids": [
    "preference-page-in-sends:CHK-012"
  ]
}
```

## OQ-email-preferences-014 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-email-preferences-014",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "preference-page-in-sends",
  "summary": "Contact chưa có giá trị (null) ở custom field của một choice thì trang preference hiện ô đó đã tick hay chưa tick; và segment điều kiện \"Is not false\" có giữ contact null không (GAP-06)? Liên quan quyết định Dev 02/10/2026 (task Testlane MTRO-011 BR-23) rằng điều kiện Boolean Is not khớp cả contact chưa có giá trị.",
  "kb_ids": [
    "KB-045",
    "KB-052",
    "KB-054"
  ],
  "tags": [
    "unsubscribe-consent"
  ],
  "related_questions": [
    "Contact chưa có giá trị (null) ở field của một choice thì trang preference hiện ô đó là đã tick hay chưa, và segment điều kiện `Is not` false có giữ contact null trong tập người nhận không (GAP-06)? Contact có giá trị false có chắc chắn bị loại không?",
    "Contact chưa có giá trị (null) ở field của một choice thì trang preference hiện ô đó đã tick hay chưa, và segment điều kiện \"Is not false\" có giữ contact null không (GAP-06)?"
  ],
  "check_ids": [
    "preference-page-in-sends:CHK-008"
  ]
}
```

## OQ-email-preferences-015 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-email-preferences-015",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "preference-page-in-sends",
  "summary": "Khi người nhận lưu lựa chọn trên trang preference, hệ thống có phát event Contact field changed (kích hoạt automation theo dõi field đó) như copy trên form gợi ý không (GAP-16)?",
  "kb_ids": [
    "KB-031"
  ],
  "tags": [
    "unsubscribe-consent"
  ],
  "check_ids": [
    "preference-page-in-sends:CHK-013"
  ]
}
```

## OQ-email-preferences-016 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-email-preferences-016",
  "type": "OPEN_ISSUE",
  "feature_id": "preference-page-in-sends",
  "summary": "Chưa quan sát được trang preference công khai cho người nhận (GAP-03 Blocker): URL dạng gì (tài liệu 03/09/2026 nhắc /u/{token}), có token và hạn dùng không, trang lỗi khi token sai / hết hạn / page bị xoá, lưu true/false lên contact thế nào. Cần Dev xác nhận và một fixture gửi thật (page ≥2 choice, email có {{preferences_url}} và {{unsubscribe_url}}) trước khi viết expected result cho role người nhận.",
  "kb_ids": [
    "KB-059",
    "KB-060",
    "KB-057",
    "KB-043"
  ],
  "tags": [
    "unsubscribe-consent"
  ],
  "related_questions": [
    "Lúc gửi, `{{preferences_url}}` được thay bằng URL nào (dạng `/u/{token}` theo tài liệu tổng quan 03/09/2026?), trang công khai hiển thị gì và có khớp preview `What people see` không? Staging 01/10/2026 chưa có route công khai và chưa có email thật để kiểm (GAP-03).",
    "Khi campaign không gắn preference page, link `{{preferences_url}}` trong email thật mở trang nào và trang đó có ghi sổ unsubscribe như link footer không? Mô tả của merge tag nói link mở trang unsubscribe thường, nhưng chưa có email thật để kiểm.",
    "Khi người nhận bấm `Save my choices` trên trang preference công khai, lựa chọn được ghi lên contact thế nào (bỏ tick = false, tick = true trên field Boolean của choice như copy trên form?), và mở lại link thì ô tick phản ánh giá trị đã lưu không? Trang công khai chưa có trên staging 01/10/2026 (GAP-03).",
    "Trang preference công khai có token và hạn dùng không, và hiển thị gì khi token sai, hết hạn hoặc preference page đã bị xoá (GAP-03, GAP-08)?",
    "Trang preference công khai định danh người nhận bằng gì và có ngăn việc đọc/sửa lựa chọn của contact khác (kể cả workspace khác) bằng cách sửa URL không?",
    "Trang preference công khai cho người nhận có URL dạng gì, có token và hạn dùng không, trang lỗi ra sao khi token sai / hết hạn / page bị xoá, và lựa chọn được lưu lên contact thế nào (GAP-03)?"
  ],
  "check_ids": [
    "preference-page-in-sends:CHK-009",
    "preference-page-in-sends:CHK-010",
    "preference-page-in-sends:CHK-011",
    "preference-page-in-sends:CHK-014",
    "preference-page-in-sends:CHK-015"
  ]
}
```

## OQ-email-preferences-017 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-email-preferences-017",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "preference-page-management",
  "summary": "Tạo field hợp lệ từ dialog New custom field của preference page thì field có được tạo kiểu Boolean và tự gán vào choice đang mở không, có toast gì? Hành vi này chỉ biết qua bundle FE, chưa bấm `Create field` trên staging.",
  "kb_ids": [
    "KB-029",
    "KB-030"
  ],
  "check_ids": [
    "preference-page-management:CHK-011"
  ]
}
```

## OQ-email-preferences-018 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-email-preferences-018",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "preference-page-management",
  "summary": "Khi Save preference page chưa hợp lệ, hệ thống phải báo gì cho từng trường hợp (thiếu tên page, không có choice, choice thiếu field, hai choice trùng tên không phân biệt hoa thường sau trim) và theo thứ tự nào? Danh sách thông điệp hiện chỉ biết qua bundle FE, chưa đối chiếu UI.",
  "kb_ids": [
    "KB-033"
  ],
  "check_ids": [
    "preference-page-management:CHK-013"
  ]
}
```

## OQ-email-preferences-019 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-email-preferences-019",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "preference-page-management",
  "summary": "Khi ô Heading của preference page để trống, preview và trang công khai hiển thị gì, và giá trị lưu là rỗng hay heading mặc định `Choose the emails you want`? Hành vi fallback hiện chỉ biết qua bundle FE.",
  "kb_ids": [
    "KB-020"
  ],
  "check_ids": [
    "preference-page-management:CHK-017"
  ]
}
```

## OQ-email-preferences-020 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-email-preferences-020",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "preference-page-management",
  "summary": "Khi chưa đăng nhập, mở các route `/preferences`, `/preferences/new`, `/preferences/:id` và gọi API `preference-pages` phải nhận kết quả gì (chuyển trang đăng nhập, mã HTTP nào)? Yêu cầu đăng nhập hiện chỉ suy ra từ router trong bundle FE.",
  "kb_ids": [
    "KB-044"
  ],
  "check_ids": [
    "preference-page-management:CHK-029"
  ]
}
```

## OQ-email-preferences-021 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-email-preferences-021",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "preference-page-in-sends",
  "summary": "Campaign có email dùng `{{preferences_url}}` nhưng chưa chọn preference page thì wizard phải cảnh báo gì và có chặn gửi không? Cảnh báo `Your email offers choices but has no page` hiện chỉ biết qua chuỗi i18n trong bundle FE, chưa thấy trên UI.",
  "kb_ids": [
    "KB-058"
  ],
  "check_ids": [
    "preference-page-in-sends:CHK-005",
    "preference-page-in-sends:CHK-006"
  ],
  "related_questions": [
    "Khi segment của campaign không lọc field của choice trong preference page đã chọn, wizard phải cảnh báo gì và có chặn gửi không? Cảnh báo `Your segment ignores some of the page's choices` hiện chỉ biết qua chuỗi i18n trong bundle FE, chưa thấy trên UI."
  ]
}
```
