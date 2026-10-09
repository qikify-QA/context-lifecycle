# Open Questions — Security & Abuse guard (BE, MTRO-92) — giới hạn lạm dụng truy cập, kiểm nội dung, tự dừng gửi/trạng thái workspace, màn staff, an toàn mail giao dịch

Tổng: 20 mục. Sinh từ lần bootstrap đầu tiên (DOC_BOOTSTRAP) của Mailtro, ngày 2026-10-08.

- CONFLICT: 2
- NEEDS_CONFIRMATION: 10
- OPEN_ISSUE: 8

> Xung đột dùng chung nhiều object (CONF-MTRO-deliverability-02) được theo dõi ở **OQ-deliverability-004** trong open-questions của object `deliverability`; phía object này: KB-098, KB-099.

## OQ-abuse-guard-001 — CONFLICT

```json
{
  "oq_id": "OQ-abuse-guard-001",
  "type": "CONFLICT",
  "feature_id": "account-and-access-abuse-limits",
  "summary": "Khi đăng nhập, tài khoản không bật TOTP có phải nhập mã 6 số gửi qua email không? Jira MTRO-92 §1 yêu cầu có (kèm hết hạn 10 phút, gửi lại chờ ~60 giây, sai 5 lần thì về form, thông báo khoá nhập), trong khi staging và Jira MTRO-88 nói không có email OTP. Cần Dev xác nhận tính năng có thuộc phạm vi và đã deploy chưa (GAP-03).",
  "kb_ids": [
    "KB-004",
    "KB-005",
    "KB-006",
    "KB-007",
    "KB-008",
    "KB-009",
    "KB-010",
    "KB-011",
    "KB-012"
  ],
  "side_a": "Jira MTRO-92 §1 (tóm tắt trong QA KB Mailtro \"Security & Abuse guard\" v1, đọc 07/10/2026): tài khoản không bật TOTP vẫn phải nhập mã 6 số gửi qua email khi đăng nhập.",
  "side_b": "Known issues Mailtro và QA KB Mailtro \"Mailtro ID (Auth)\" v1: staging 23/09/2026 và bundle 29/09/2026 không có email OTP khi đăng nhập; Jira MTRO-88 ghi mã email là ngoài phạm vi.",
  "conflict_group": "CONF-MTRO-abuse-guard-01",
  "related_feature_ids": [
    "auth/two-factor-challenge",
    "auth/sign-in-and-workspace-selection"
  ],
  "related_questions": [
    "Khi đăng nhập, tài khoản không bật TOTP có phải nhập mã 6 số gửi qua email như Jira MTRO-92 §1 mô tả không, hay luồng này ngoài phạm vi như Jira MTRO-88 và staging 23/09/2026 cho thấy? Nếu có, đã deploy lên staging chưa và có áp cho mọi tài khoản không bật TOTP không (GAP-03)?",
    "Nếu đăng nhập bằng mã email thuộc phạm vi, các chi tiết của Jira MTRO-92 §1 có còn đúng không: mã hết hạn sau 10 phút, gửi lại chờ khoảng 60 giây (con số chính xác là bao nhiêu), sai 5 lần quay về form với \"That code has expired or been used up\", khoá nhập với \"Too many incorrect codes. Try again in N seconds\", F5 quay về form đăng nhập, và câu cảnh báo trong email có nội dung gì?",
    "Khi đăng nhập, tài khoản không bật TOTP có phải nhập mã 6 số gửi qua email như Jira MTRO-92 §1 mô tả không, hay luồng này ngoài phạm vi như Jira MTRO-88 và staging cho thấy? Nếu có, đã deploy lên staging chưa (GAP-03)?",
    "Khi đăng nhập, tài khoản chưa bật TOTP có phải nhập mã OTP gửi qua email không? (Mục này trùng câu hỏi CONFLICT cùng conflict_group ở object abuse-guard — quá trình publish gộp làm một mục khi publish.)",
    "Tài khoản chưa bật TOTP có phải nhập mã OTP gửi qua email khi đăng nhập không (Jira MTRO-92 §1 nói có, Jira MTRO-88 và staging nói không)?"
  ],
  "check_ids": [
    "account-and-access-abuse-limits:CHK-005",
    "account-and-access-abuse-limits:CHK-006"
  ],
  "also_affects": [
    {
      "object_id": "auth",
      "kb_ids": [
        "KB-031",
        "KB-032"
      ]
    }
  ]
}
```

## OQ-abuse-guard-002 — CONFLICT

```json
{
  "oq_id": "OQ-abuse-guard-002",
  "type": "CONFLICT",
  "feature_id": "account-and-access-abuse-limits",
  "summary": "API key có hỗ trợ giới hạn IP / dải IP (gọi từ IP khác nhận 403, Rotate giữ allowlist) như Jira MTRO-92 §3 không, và đã deploy lên staging chưa, ở dialog nào? Khảo sát staging 29/09/2026 chưa thấy ô IP allowlist trong dialog Create API key. Cùng tranh chấp này áp cho rule IP allowlist được ghi ở Settings › API keys (item của workspace-settings api-keys-and-public-api, cùng nhóm tranh chấp) — trả lời một lần cho cả hai.",
  "kb_ids": [
    "KB-019",
    "KB-020",
    "KB-021"
  ],
  "side_a": "Jira MTRO-92 §3 (tóm tắt trong QA KB Mailtro \"Security & Abuse guard\" v1, đọc 07/10/2026): API key có thể giới hạn theo IP hoặc dải IP; gọi từ IP ngoài danh sách nhận 403; key mới khi Rotate giữ allowlist.",
  "side_b": "Staging (khảo sát 29/09/2026, ghi trong QA KB Mailtro \"Security & Abuse guard\" v1): dialog Create API key chưa có ô nhập IP allowlist.",
  "conflict_group": "CONF-MTRO-abuse-guard-02",
  "related_feature_ids": [
    "workspace-settings/api-keys-and-public-api"
  ],
  "related_questions": [
    "API key có hỗ trợ IP allowlist (IP ngoài danh sách nhận 403, Rotate giữ allowlist) không, và nếu có thì ô nhập nằm ở dialog nào trên staging?"
  ],
  "also_affects": [
    {
      "object_id": "workspace-settings",
      "kb_ids": [
        "KB-058"
      ]
    }
  ]
}
```

## OQ-abuse-guard-003 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-abuse-guard-003",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "account-and-access-abuse-limits",
  "summary": "IP allowlist của API key chấp nhận định dạng nào (IPv4, IPv6, CIDR) và IP nguồn được lấy từ kết nối hay từ header X-Forwarded-For (GAP-09)?",
  "kb_ids": [
    "KB-022"
  ],
  "related_questions": [
    "API key có hỗ trợ IP allowlist không (Jira MTRO-92 §3: IP ngoài danh sách nhận 403, Rotate giữ allowlist) trong khi khảo sát staging 29/09/2026 chưa thấy ô IP allowlist? Nếu có, ô nhập nằm ở đâu, chấp nhận định dạng nào (IPv4, IPv6, CIDR) và IP nguồn lấy từ kết nối hay header X-Forwarded-For (GAP-09)?"
  ],
  "check_ids": [
    "account-and-access-abuse-limits:CHK-020"
  ]
}
```

## OQ-abuse-guard-004 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-abuse-guard-004",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": null,
  "summary": "Ma trận quyền cho các cơ chế Security & Abuse guard chưa chốt: role nào (Owner, Admin, role thứ ba đang tranh chấp tên Member / Marketer / Editor) được quản lý API key và mời thành viên (GAP-07), và các rule của Jira MTRO-92 áp cho role nào? Tài liệu không ghi role cho phần lớn rule; Admin chưa từng được quan sát.",
  "kb_ids": [
    "KB-013",
    "KB-014",
    "KB-016",
    "KB-018",
    "KB-023",
    "KB-031",
    "KB-033",
    "KB-046",
    "KB-047",
    "KB-050",
    "KB-053",
    "KB-P-051"
  ],
  "related_feature_ids": [
    "account-and-access-abuse-limits",
    "sending-suspension-and-staff-review",
    "workspace-settings/roles-and-permissions"
  ],
  "related_questions": [
    "Role nào (Owner, Admin, role thứ ba đang tranh chấp tên Member / Marketer / Editor) được tạo, Rotate, Revoke API key và gửi lời mời thành viên, và role không có quyền bị chặn ở API trả mã gì (GAP-07)?",
    "Role nào (Owner, Admin, role thứ ba đang tranh chấp tên Member / Marketer / Editor) được quản lý API key và mời thành viên (GAP-07)?",
    "Role nào được lưu template và Send / Test send (ma trận quyền chưa chốt)?",
    "Email báo Owner khi workspace bị tự dừng có nội dung gì, và banner \"Sending from this workspace is paused\" hiện cho role nào, ở màn nào?",
    "Role nào của workspace bị áp danh sách chặn / cho phép khi suspended, và role nào được chuyển Owner, đổi tên workspace (ma trận quyền chưa chốt)?"
  ],
  "check_ids": [
    "account-and-access-abuse-limits:CHK-021"
  ]
}
```

## OQ-abuse-guard-005 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-abuse-guard-005",
  "type": "OPEN_ISSUE",
  "feature_id": "account-and-access-abuse-limits",
  "summary": "Tài liệu không nêu: thời lượng chặn tạm và mã lỗi / thông báo khi vượt 10 lượt đăng ký / phút / mạng hoặc 20 lời mời / phút (chỉ đăng nhập có thời lượng 1 phút); khi nào API key chuyển sang expired; ai thực hiện Put back cho key paused. Cần bổ sung nguồn trước khi viết case biên.",
  "kb_ids": [
    "KB-003",
    "KB-017",
    "KB-029",
    "KB-030"
  ]
}
```

## OQ-abuse-guard-006 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-abuse-guard-006",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "content-screening",
  "summary": "Các rule kiểm nội dung và mail giao dịch của Jira MTRO-92 (link có URL bắt đầu bằng merge tag, merge tag không điền được, link huỷ chỉ có khi nội dung đặt tag unsubscribe_url) được viết với ví dụ cú pháp một ngoặc, trong khi PO/BA 02/10/2026 chốt hai ngoặc. Khi tranh chấp cú pháp merge tag được phân xử, thông báo lỗi và cách nhận diện tag của các rule này có giữ nguyên với cú pháp hai ngoặc không?",
  "kb_ids": [
    "KB-036",
    "KB-038",
    "KB-094"
  ],
  "conflict_group": "CONF-MTRO-email-content-01",
  "related_feature_ids": [
    "content-screening",
    "transactional-mail-safeguards",
    "email-content/merge-tags"
  ],
  "related_questions": [
    "Khi tranh chấp cú pháp merge tag (hai ngoặc theo PO/BA 02/10/2026 hay một ngoặc theo Jira MTRO-92) được phân xử, rule \"URL bắt đầu bằng merge tag\" và \"merge tag không điền được\" nhận diện tag theo cú pháp nào, chuỗi viết theo cú pháp còn lại bị coi là chữ thường hay cũng bị chặn, và nguyên văn đầy đủ của hai thông báo từ chối là gì?",
    "Khi tranh chấp cú pháp merge tag được phân xử (hai ngoặc theo PO/BA 02/10/2026 hay một ngoặc theo Jira MTRO-92), thông báo từ chối và cách nhận diện tag của rule \"URL bắt đầu bằng merge tag\" và \"merge tag không điền được\" có giữ nguyên không?",
    "Các rule chặn khi Send / Test send của Jira MTRO-92 §4 (link bắt đầu bằng merge tag, merge tag không điền được) có áp cho email trong automation và mail giao dịch không; nếu có thì chặn ở bước nào (lưu, kích hoạt hay lúc gửi) và báo lỗi ở đâu?",
    "Các rule chặn khi Send / Test send có áp cho email trong automation và mail giao dịch không, hay chỉ cho campaign?",
    "Khi cú pháp merge tag được phân xử, tag link huỷ trong mail giao dịch viết thế nào (một ngoặc hay hai ngoặc), và tag viết theo cú pháp còn lại có bị bỏ qua (mất link huỷ), bị báo lỗi, hay vẫn được nhận diện?",
    "Khi cú pháp merge tag được phân xử, tag link huỷ trong mail giao dịch viết thế nào (một ngoặc hay hai ngoặc) và tag sai cú pháp có làm mất link huỷ không?"
  ],
  "check_ids": [
    "content-screening:CHK-007",
    "content-screening:CHK-008",
    "transactional-mail-safeguards:CHK-009"
  ]
}
```

## OQ-abuse-guard-007 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-abuse-guard-007",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "sending-suspension-and-staff-review",
  "summary": "Staging đang chạy cơ chế abuse guard ở chế độ tự dừng gửi (Sending suspended) hay chỉ cảnh báo (Abuse alert), ngưỡng bounce / complaint có được hạ để test không, và chu kỳ quét thực tế (tài liệu ghi khoảng 5 phút) là bao nhiêu (GAP-01)?",
  "kb_ids": [
    "KB-087",
    "KB-045",
    "KB-049",
    "KB-041"
  ],
  "check_ids": [
    "sending-suspension-and-staff-review:CHK-006"
  ],
  "related_questions": [
    "Staging đang chạy abuse guard ở chế độ tự dừng gửi (Sending suspended) hay chỉ cảnh báo (Abuse alert), ngưỡng bounce / complaint có được hạ để test không, và chu kỳ quét thực tế là bao nhiêu (GAP-01)?"
  ]
}
```

## OQ-abuse-guard-008 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-abuse-guard-008",
  "type": "OPEN_ISSUE",
  "feature_id": "sending-suspension-and-staff-review",
  "summary": "Known issue: phần lớn cơ chế Jira MTRO-92 chưa kiểm được trên staging — chưa biết chế độ tự dừng / chỉ cảnh báo, chưa có trang và tài khoản staff để kiểm Abuse queue / Sending health / Abuse alerts, 164 case của task Testlane MTRO-019 chưa chạy. Mọi item CE của abuse guard hiện chỉ dựa trên Jira AC; cần môi trường / tài khoản để xác minh.",
  "kb_ids": [
    "KB-087",
    "KB-088"
  ]
}
```

## OQ-abuse-guard-009 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-abuse-guard-009",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "sending-suspension-and-staff-review",
  "summary": "URL trang quản trị staff, tài khoản staff dùng để test và tên các quyền staff (ví dụ nhóm quyền Security) là gì (GAP-02)?",
  "kb_ids": [
    "KB-089",
    "KB-085",
    "KB-086"
  ],
  "related_questions": [
    "URL trang quản trị staff, tài khoản staff dùng để test và tên các quyền staff là gì; khi nào staging có màn này (GAP-02)?"
  ],
  "check_ids": [
    "sending-suspension-and-staff-review:CHK-027"
  ]
}
```

## OQ-abuse-guard-010 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-abuse-guard-010",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "sending-suspension-and-staff-review",
  "summary": "Campaign ở trạng thái Scheduled đến giờ gửi đúng lúc workspace đang Sending suspended thì hệ thống xử lý thế nào: bỏ qua, giữ chờ Reinstate hay chuyển trạng thái khác (GAP-08)?",
  "kb_ids": [
    "KB-090"
  ],
  "related_questions": [
    "Campaign ở trạng thái Scheduled đến giờ gửi đúng lúc workspace Sending suspended thì bị bỏ qua, giữ chờ Reinstate hay chuyển trạng thái khác; sau Reinstate có tự gửi không (GAP-08)?"
  ],
  "check_ids": [
    "sending-suspension-and-staff-review:CHK-028"
  ]
}
```

## OQ-abuse-guard-011 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-abuse-guard-011",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "sending-suspension-and-staff-review",
  "summary": "Link huỷ đăng ký trong mail đã gửi có còn hoạt động khi workspace ở Sending suspended hoặc Disabled không (Disabled được mô tả là chặn mọi thao tác trừ xem) (GAP-10)?",
  "kb_ids": [
    "KB-091",
    "KB-058"
  ],
  "related_questions": [
    "Link huỷ đăng ký trong mail đã gửi (campaign, automation, transactional) có còn hoạt động và ghi nhận huỷ khi workspace Sending suspended hoặc Disabled không, trong khi Disabled được mô tả là chặn mọi thao tác trừ xem (GAP-10)?",
    "Link huỷ đăng ký trong mail đã gửi có còn hoạt động khi workspace Sending suspended hoặc Disabled không (GAP-10)?"
  ],
  "check_ids": [
    "sending-suspension-and-staff-review:CHK-029"
  ]
}
```

## OQ-abuse-guard-012 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-abuse-guard-012",
  "type": "OPEN_ISSUE",
  "feature_id": "sending-suspension-and-staff-review",
  "summary": "Tài liệu không mô tả hệ quả của nút Disable account / Reopen account trên màn staff và cách workspace chuyển từ Disabled về Sending.",
  "kb_ids": [
    "KB-068",
    "KB-058"
  ],
  "related_questions": [
    "Nút Stop sending đưa workspace sang trạng thái nào và có gắn Signal Manual không; Disable account và Reopen account gây ra gì (workspace chuyển từ Disabled về Sending bằng cách nào); Abuse alert chuyển sang Actioned khi nào?",
    "Nút Disable account và Reopen account trên màn staff gây ra gì, và workspace chuyển từ Disabled về Sending bằng cách nào?"
  ],
  "check_ids": [
    "sending-suspension-and-staff-review:CHK-030"
  ]
}
```

## OQ-abuse-guard-013 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-abuse-guard-013",
  "type": "OPEN_ISSUE",
  "feature_id": "transactional-mail-safeguards",
  "summary": "Tài liệu không nêu route, method và shape request / response của Transactional API (nơi trả 422 cho thiếu biến, tên biến cấm, link huỷ + cc/bcc, >13 header), cũng không nêu body lỗi 422 có ghi lý do không. Tài liệu Public API trên staging-api /docs (Jira MTRO-91) không có trong bộ nguồn.",
  "kb_ids": [
    "KB-092",
    "KB-093",
    "KB-096",
    "KB-097"
  ],
  "related_questions": [
    "Transactional API có route, method và shape request / response nào, và body lỗi 422 có nêu lý do cụ thể cho từng vi phạm (thiếu biến, tên biến cấm, link huỷ kèm cc / bcc, quá 13 header) không?",
    "Transactional API có route, method và shape request / response nào, và body lỗi 422 có nêu lý do (thiếu biến, tên biến cấm, link huỷ + cc / bcc, quá 13 header) không?"
  ],
  "check_ids": [
    "transactional-mail-safeguards:CHK-008"
  ]
}
```

## OQ-abuse-guard-014 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-abuse-guard-014",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "account-and-access-abuse-limits",
  "summary": "API key chuyển sang trạng thái expired khi nào (có ngày hết hạn đặt lúc tạo không), lời gọi bằng key expired nhận mã lỗi gì, và key expired có Rotate được không? Ngoài ra ai (staff hay khách) thực hiện Put back cho key đang paused?",
  "check_ids": [
    "account-and-access-abuse-limits:CHK-017"
  ],
  "related_questions": [
    "Khi nào API key chuyển sang trạng thái expired, và ai (staff hay khách) thực hiện Put back cho key đang paused?"
  ]
}
```

## OQ-abuse-guard-015 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-abuse-guard-015",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "account-and-access-abuse-limits",
  "summary": "Khi bị chặn tạm vì quá 10 lượt đăng ký/phút/mạng hoặc quá 20 lời mời/phút thì bị chặn bao lâu, hiện thông báo gì và trả HTTP status nào; khi đăng nhập bị chặn tạm 1 phút thì hiện thông báo gì?",
  "check_ids": [
    "account-and-access-abuse-limits:CHK-022"
  ]
}
```

## OQ-abuse-guard-016 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-abuse-guard-016",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "transactional-mail-safeguards",
  "summary": "Ai được gỡ trạng thái huỷ đăng ký của một người nhận: chỉ chính người nhận qua trang huỷ (Jira MTRO-92 §11) hay cả marketer qua Portal API DELETE teams/{team}/unsubscribes/{id} (Jira MTRO-81) (GAP-06)?",
  "kb_ids": [
    "KB-098",
    "KB-099"
  ],
  "check_ids": [
    "transactional-mail-safeguards:CHK-007"
  ]
}
```

## OQ-abuse-guard-017 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-abuse-guard-017",
  "type": "OPEN_ISSUE",
  "feature_id": "content-screening",
  "summary": "Nội dung đầy đủ của thông báo \"The data contains content that is not allowed for security reasons (…)\" và \"The body contains a link whose URL begins with a merge tag…\" là gì?",
  "kb_ids": [
    "KB-034",
    "KB-036"
  ]
}
```

## OQ-abuse-guard-018 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-abuse-guard-018",
  "type": "OPEN_ISSUE",
  "feature_id": "sending-suspension-and-staff-review",
  "summary": "Nút Stop sending của staff đưa workspace sang trạng thái nào và có gắn Signal Manual không; Abuse alert chuyển sang Actioned khi nào?",
  "kb_ids": [
    "KB-068",
    "KB-064",
    "KB-072"
  ]
}
```

## OQ-abuse-guard-019 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-abuse-guard-019",
  "type": "OPEN_ISSUE",
  "feature_id": "transactional-mail-safeguards",
  "summary": "Link huỷ trong mail giao dịch đã gửi còn hoạt động khi workspace Sending suspended hoặc Disabled không (GAP-10)?",
  "kb_ids": [
    "KB-091",
    "KB-095"
  ]
}
```

## OQ-abuse-guard-020 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-abuse-guard-020",
  "type": "OPEN_ISSUE",
  "feature_id": "transactional-mail-safeguards",
  "summary": "Huỷ qua link trong mail giao dịch được ghi vào sổ consent hay vào suppression, và hiển thị thế nào ở danh sách contact / suppression?",
  "kb_ids": [
    "KB-095",
    "KB-P-013",
    "KB-P-014"
  ]
}
```
