# Open Questions — Workspace settings — Team members & role/quyền, API keys & Public API, Claude connector, Workspace settings, Sending domains

Tổng: 45 mục. Sinh từ lần bootstrap đầu tiên (DOC_BOOTSTRAP) của Mailtro, ngày 2026-10-08.

- CONFLICT: 3
- NEEDS_CONFIRMATION: 27
- OPEN_ISSUE: 15

> Xung đột dùng chung nhiều object (CONF-MTRO-abuse-guard-02) được theo dõi ở **OQ-abuse-guard-002** trong open-questions của object `abuse-guard`; phía object này: KB-058.

## OQ-workspace-settings-001 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-workspace-settings-001",
  "type": "OPEN_ISSUE",
  "feature_id": "team-members-and-invitations",
  "summary": "Lỗi đang mở trên staging (29/09/2026): gửi lời mời thành công (toast Invitation sent) nhưng bảng Team members không tự thêm dòng Invited, phải tải lại trang. Theo dõi như regression watch cho tới khi Dev sửa (frontend tải lại danh sách sau khi mời) và QA xác nhận lại.",
  "kb_ids": [
    "KB-015"
  ],
  "related_questions": [
    "Sau khi gửi lời mời thành công, bảng Team members có phải tự thêm dòng `Invited` mà không cần tải lại trang không, và lỗi hiện tại (phải tải lại mới thấy) đã được Dev sửa chưa?",
    "Lỗi bảng Team members không tự thêm dòng `Invited` sau khi gửi lời mời (phải tải lại trang) đã được Dev sửa và QA xác nhận lại chưa?"
  ],
  "check_ids": [
    "team-members-and-invitations:CHK-009"
  ]
}
```

## OQ-workspace-settings-002 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-workspace-settings-002",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "team-members-and-invitations",
  "summary": "Jira MTRO-49 (To Do) mô tả bảng Team members có checkbox / thao tác hàng loạt, nhưng trang trên staging 29/09/2026 không có. Bulk action còn trong phạm vi phát hành không, hay MTRO-49 sẽ được cập nhật theo bản dựng hiện tại? Cần PO xác nhận.",
  "kb_ids": [
    "KB-008",
    "KB-007"
  ],
  "related_questions": [
    "Bulk action (checkbox chọn nhiều dòng) mà Jira MTRO-49 mô tả còn thuộc phạm vi phát hành không, hay ticket sẽ được cập nhật theo bản dựng hiện tại không có bulk action?"
  ]
}
```

## OQ-workspace-settings-003 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-workspace-settings-003",
  "type": "OPEN_ISSUE",
  "feature_id": "team-members-and-invitations",
  "summary": "Edit member, đổi role và Remove from team mới chỉ có trong chuỗi bundle; staging chưa có member Active nào ngoài Owner nên chưa quan sát hành vi thật (dialog, xác nhận, hệ quả sau khi đổi role / xoá member). Cần dữ liệu member Active để khảo sát.",
  "kb_ids": [
    "KB-019",
    "KB-020",
    "KB-035"
  ],
  "missing_area": "member-management-ui",
  "related_questions": [
    "Trên UI thật, `Edit member` / đổi role / `Remove from team` hoạt động thế nào, và sau khi đổi role hoặc xoá member thì quyền truy cập của người đó thay đổi ngay hay sau phiên đăng nhập kế tiếp?"
  ]
}
```

## OQ-workspace-settings-004 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-workspace-settings-004",
  "type": "OPEN_ISSUE",
  "feature_id": "team-members-and-invitations",
  "summary": "Tài liệu chưa mô tả: mời lại một địa chỉ đang có lời mời Invited, người được mời đã có tài khoản Mailtro, cú pháp nhập nhiều email ngoài dấu phẩy và số email tối đa mỗi lần, thời hạn lời mời và tác dụng của Resend invite, cũng như contract API mời (Jira MTRO-55 và MTRO-46 để trống). Cần PO/Dev bổ sung trước khi viết case cho các nhánh này.",
  "kb_ids": [
    "KB-001",
    "KB-002",
    "KB-004",
    "KB-009",
    "KB-016",
    "KB-017",
    "KB-028"
  ],
  "missing_area": "invite-flow-details",
  "related_questions": [
    "Mời lại một email đang có lời mời `Invited` thì UI báo gì và có tạo lời mời mới không?",
    "Contract API mời thành viên (endpoint, payload, mã lỗi) là gì? Jira MTRO-55 và MTRO-46 đang để trống AC."
  ]
}
```

## OQ-workspace-settings-005 — CONFLICT

```json
{
  "oq_id": "OQ-workspace-settings-005",
  "type": "CONFLICT",
  "feature_id": "roles-and-permissions",
  "summary": "Tên hiển thị chính thức của role thứ 3 trong workspace Mailtro là \"Member\" hay \"Marketer / Editor\"? Hai nguồn đang nói khác nhau và chưa có PO/Dev chốt; cần PO/Dev xác nhận tên chính thức để test case và UI dùng thống nhất.",
  "kb_ids": [
    "KB-030",
    "KB-031",
    "KB-003",
    "KB-010"
  ],
  "side_a": "Theo Epic Jira MTRO-20 và file cấu hình mẫu của repo automation (ghi trong QA business rule Mailtro, cập nhật 07/10/2026), bộ role là Owner / Admin / Marketer-Editor / Custom — role thứ 3 tên \"Marketer / Editor\".",
  "side_b": "Theo Jira MTRO-43, MTRO-49 và UI staging khảo sát 29/09/2026 (ô Invite as chỉ có Admin và Member), role thứ 3 tên \"Member\"; QA business rule Mailtro (cập nhật 07/10/2026) cũng dùng Member nhưng tự đánh dấu là đang tranh chấp.",
  "conflict_group": "CONF-MTRO-workspace-settings-01",
  "check_ids": [
    "roles-and-permissions:CHK-008"
  ],
  "related_questions": [
    "Tên hiển thị chính thức của role thứ 3 là \"Member\" (Jira MTRO-43/49, UI staging) hay \"Marketer / Editor\" (Epic MTRO-20)?"
  ]
}
```

## OQ-workspace-settings-006 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-workspace-settings-006",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "roles-and-permissions",
  "summary": "Trên staging 23/09/2026, tài khoản role Member vẫn thấy mục API keys và Workspace settings trong Settings. Đây có đúng quyền không: Member có được tạo / rotate / revoke API key không, và có được đổi tên workspace không (bundle có hint \"Only owners and admins can rename this workspace.\")? Cần PO xác nhận (GAP-07 của task Testlane MTRO-019).",
  "kb_ids": [
    "KB-033",
    "KB-074"
  ],
  "related_questions": [
    "Member có được tạo / rotate / revoke API key và đổi tên workspace không? Member vẫn thấy hai mục này trong Settings trên staging 23/09/2026 (GAP-07 của task Testlane MTRO-019)."
  ]
}
```

## OQ-workspace-settings-007 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-workspace-settings-007",
  "type": "OPEN_ISSUE",
  "feature_id": "roles-and-permissions",
  "summary": "Chưa có quan sát nào bằng tài khoản Admin (tài khoản Admin của bộ test là placeholder) và Member chỉ được quan sát rời rạc ở workspace thứ hai (chỉ xem sidebar 23/09/2026); vì vậy mọi item quyền của object Workspace settings hiện chỉ có nguồn Jira, chưa có đối chiếu thật theo role. Cần chuẩn bị tài khoản Admin/Member thật trong cùng workspace để khảo sát.",
  "kb_ids": [
    "KB-023",
    "KB-032",
    "KB-033"
  ],
  "missing_area": "role-coverage",
  "related_questions": [
    "Admin và Member thật trong cùng workspace nhìn thấy và làm được gì? Chưa có quan sát bằng tài khoản Admin; Member chỉ được xem sidebar ở workspace thứ hai."
  ]
}
```

## OQ-workspace-settings-008 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-workspace-settings-008",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "api-keys-and-public-api",
  "summary": "Dialog Create API key trên staging (29/09/2026) tick sẵn mọi scope đọc cộng thêm contacts:write. Việc tick sẵn một scope ghi (contacts:write) có chủ đích không, hay mặc định chỉ nên là các scope đọc? Cần PO xác nhận.",
  "kb_ids": [
    "KB-044"
  ],
  "related_questions": [
    "Việc dialog Create API key tick sẵn `contacts:write` cùng các scope đọc có chủ đích không, hay mặc định chỉ nên là scope đọc?"
  ]
}
```

## OQ-workspace-settings-009 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-workspace-settings-009",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "api-keys-and-public-api",
  "summary": "Trên staging (29/09/2026), key ở trạng thái \"Expires in 24 hours\" (key cũ sau khi rotate) vẫn có nút Rotate, nên có thể sinh thêm key mới từ một key sắp hết hạn. Key đang hết hạn có được phép rotate không? Cần Dev/PO chốt đây là thiết kế hay lỗi.",
  "kb_ids": [
    "KB-054",
    "KB-050",
    "KB-052"
  ],
  "related_questions": [
    "Key ở trạng thái `Expires in 24 hours` có được phép rotate tiếp không?"
  ]
}
```

## OQ-workspace-settings-010 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-workspace-settings-010",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "api-keys-and-public-api",
  "summary": "Jira MTRO-92 §3 mô tả các cơ chế API key: báo key bị lộ / trạng thái paused, và chặn tạo key khi workspace Sending suspended, nhưng trang API keys trên staging 29/09/2026 chưa thấy các phần này. Các cơ chế này đã deploy staging chưa? Cần Dev xác nhận. (IP allowlist được hỏi trong câu hỏi xung đột của object Security & Abuse guard, không lặp ở đây.)",
  "kb_ids": [
    "KB-059"
  ],
  "related_questions": [
    "IP allowlist, báo key bị lộ / trạng thái paused và chặn tạo key khi workspace Sending suspended đã deploy staging chưa, và allowlist nhận định dạng nào (IPv4 / IPv6 / CIDR)?"
  ]
}
```

## OQ-workspace-settings-011 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-workspace-settings-011",
  "type": "OPEN_ISSUE",
  "feature_id": "api-keys-and-public-api",
  "summary": "Tài liệu Public API (đường dẫn /docs trên host staging-api, Jira MTRO-91) không được đóng băng trong bộ nguồn, nên KB chưa có danh sách endpoint, request/response, mã lỗi theo scope, hay phản hồi khi vượt rate limit. Cần đóng băng một bản tài liệu Public API để bổ sung.",
  "kb_ids": [
    "KB-060",
    "KB-039"
  ],
  "missing_area": "public-api-contract",
  "related_questions": [
    "Danh sách endpoint, request/response, mã lỗi khi thiếu scope và phản hồi khi vượt 120 request/phút (mã HTTP, header, thời gian reset) của Public API là gì?"
  ]
}
```

## OQ-workspace-settings-012 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-workspace-settings-012",
  "type": "OPEN_ISSUE",
  "feature_id": "api-keys-and-public-api",
  "summary": "Chưa kiểm: key cũ có thật sự ngừng hoạt động sau 24 giờ kể từ rotate không và lúc đó hiển thị status gì; gọi Public API bằng key đã revoke trả mã gì; trạng thái trên UI (Active / Expires in 24 hours / Revoked) ánh xạ thế nào với trạng thái theo Jira MTRO-92 (active / paused / expired / revoked); nội dung từng dòng Audit log; giới hạn độ dài tên key. Cần khảo sát bổ sung.",
  "kb_ids": [
    "KB-052",
    "KB-055",
    "KB-056",
    "KB-049"
  ],
  "missing_area": "api-key-lifecycle-effects",
  "related_questions": [
    "Sau 24 giờ kể từ rotate, key cũ hiển thị status gì và gọi API trả mã gì; gọi API bằng key đã revoke trả mã gì?",
    "Status trên UI (`Active` / `Expires in 24 hours` / `Revoked`) ánh xạ thế nào với các trạng thái active / paused / expired / revoked mà Jira MTRO-92 mô tả?",
    "Tên API key có giới hạn độ dài / ký tự không, và mỗi dòng trong Audit log của key ghi những gì?"
  ]
}
```

## OQ-workspace-settings-013 — CONFLICT

```json
{
  "oq_id": "OQ-workspace-settings-013",
  "type": "CONFLICT",
  "feature_id": "claude-connector",
  "summary": "Claude (qua MCP connector) có được gửi campaign không? Trang Claude connector trên staging nói không gửi được, còn Epic Jira MTRO-44 đặt mục tiêu tạo và gửi campaign từ Claude. Cần PO chốt phạm vi MCP hiện tại.",
  "kb_ids": [
    "KB-065",
    "KB-066"
  ],
  "side_a": "Trên staging (khảo sát 29/09/2026), trang Claude connector ghi \"It cannot send.\" — Claude chỉ dựng/lưu segment và tạo/sửa campaign nháp.",
  "side_b": "Theo Epic Jira MTRO-44 (MCP connectors, To Do; đọc 07/10/2026), output Sprint 5 là \"Create + Send campaign from Claude\" — Claude được tạo và gửi campaign.",
  "conflict_group": "CONF-MTRO-workspace-settings-02",
  "related_questions": [
    "Claude (qua MCP connector) có được gửi campaign không? Trang Claude connector trên staging ghi Claude không gửi được (\"It cannot send.\"), còn Epic Jira MTRO-44 đặt mục tiêu tạo và gửi campaign từ Claude. Cần PO chốt phạm vi hiện tại.",
    "Claude (qua MCP connector) có được gửi campaign không — trang staging ghi \"It cannot send.\" còn Epic Jira MTRO-44 đặt mục tiêu \"Create + Send campaign from Claude\"?"
  ],
  "check_ids": [
    "claude-connector:CHK-004"
  ]
}
```

## OQ-workspace-settings-014 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-workspace-settings-014",
  "type": "OPEN_ISSUE",
  "feature_id": "claude-connector",
  "summary": "Lỗi Jira MTRO-101: email Claude dựng qua MCP biến mọi link inline trong đoạn văn thành nút riêng. Jira ghi đã fix, đang chờ QA verify (02/10/2026). Cần QA verify trên staging rồi đóng; tới lúc đó giữ làm regression watch.",
  "kb_ids": [
    "KB-067"
  ],
  "related_questions": [
    "Sau bản sửa Jira MTRO-101, link inline trong đoạn văn của email Claude dựng qua MCP phải giữ nguyên là link inline (không tách thành nút riêng) — Dev/PO xác nhận đây là hành vi mong đợi và QA đã verify chưa?",
    "Lỗi email dựng qua MCP biến link inline thành nút riêng (Jira MTRO-101) đã được QA verify trên staging chưa?"
  ],
  "check_ids": [
    "claude-connector:CHK-007"
  ]
}
```

## OQ-workspace-settings-015 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-workspace-settings-015",
  "type": "OPEN_ISSUE",
  "feature_id": "claude-connector",
  "summary": "Claude connector mới chỉ được khảo sát qua trang hướng dẫn; chưa kết nối thật qua claude.ai, chưa thấy màn approve trên Mailtro, chưa biết danh sách tool MCP thật, nội dung các khối \"What Claude gets access to\" / \"Things to ask it\", và phạm vi Jira MTRO-50 / MTRO-121 (mô tả trống). Cần khảo sát với kết nối thật.",
  "kb_ids": [
    "KB-061",
    "KB-062",
    "KB-063",
    "KB-064",
    "KB-070"
  ],
  "missing_area": "claude-connector-live",
  "related_questions": [
    "Khi kết nối thật: màn approve trên Mailtro trông thế nào, danh sách tool MCP thật gồm những gì, và nội dung các khối \"What Claude gets access to\" / \"Things to ask it\" là gì?",
    "Phạm vi của Jira MTRO-50 (MCP cho contact) và MTRO-121 (gợi ý branding) là gì? Cả hai đang để trống mô tả."
  ]
}
```

## OQ-workspace-settings-016 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-workspace-settings-016",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "workspace-profile-settings",
  "summary": "Theo Jira MTRO-49 (To Do), đổi Owner được thực hiện bằng transfer ownership và owner cũ thành Admin; tài liệu QA tự ghi điểm \"chuyển Owner = transfer ownership\" còn cần xác nhận, dù copy trên staging 29/09/2026 cũng nói Owner sẽ thành admin sau khi chuyển. PO xác nhận đây là cách duy nhất để đổi Owner, và Owner cũ luôn bị hạ xuống Admin?",
  "kb_ids": [
    "KB-034",
    "KB-075",
    "KB-077",
    "KB-078",
    "KB-102"
  ],
  "related_questions": [
    "Chuyển quyền sở hữu có phải cách duy nhất để đổi Owner, và Owner cũ có luôn bị hạ xuống Admin không?",
    "Sau khi Owner chuyển quyền sở hữu cho một member Active, member đó có trở thành Owner và owner cũ luôn bị hạ xuống Admin không (Jira MTRO-49 đang To Do, tài liệu QA ghi điểm này còn cần xác nhận)?"
  ],
  "check_ids": [
    "workspace-profile-settings:CHK-006"
  ]
}
```

## OQ-workspace-settings-017 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-workspace-settings-017",
  "type": "OPEN_ISSUE",
  "feature_id": "workspace-profile-settings",
  "summary": "Khảo sát Workspace settings 29/09/2026 không bấm Save và workspace chỉ có một member, nên chưa quan sát: kết quả đổi tên workspace (thông báo, giới hạn độ dài/ký tự), luồng chuyển quyền sở hữu khi có từ 2 member (dialog chọn member, trạng thái sau khi chuyển). Cần khảo sát bổ sung.",
  "kb_ids": [
    "KB-073",
    "KB-076",
    "KB-077",
    "KB-072"
  ],
  "missing_area": "workspace-settings-save-transfer",
  "related_questions": [
    "Bấm `Save changes` sau khi đổi tên workspace thì hiện thông báo gì, tên mới có cập nhật ngay ở workspace switcher và phụ đề trang không, và tên có giới hạn độ dài / ký tự không?",
    "Khi workspace có từ 2 thành viên, luồng chuyển quyền sở hữu diễn ra thế nào (dialog chọn member, xác nhận, trạng thái hai bên sau khi chuyển), và có chọn được người còn ở trạng thái `Invited` không?"
  ]
}
```

## OQ-workspace-settings-018 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-workspace-settings-018",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "sending-domains",
  "summary": "Xung đột đã biết về gửi khi workspace chưa có sending domain verified (nhóm xung đột của Campaigns): rule 07/08/2026 nói campaign không gửi được, staging 09/09/2026 gửi qua shared host mailtro.ai, PO/BA 02/10/2026 chỉ chốt cho automation là được gửi qua shared host. Từ phía Sending domains: sau khi PO chốt cho campaign, copy trên trang domain và yêu cầu \"domain verified\" có cần đổi không, và việc gửi qua shared host có cần báo cho người dùng không?",
  "kb_ids": [
    "KB-081",
    "KB-083",
    "KB-098"
  ],
  "conflict_group": "CONF-MTRO-campaigns-01",
  "related_questions": [
    "Campaign có được gửi khi workspace chưa có sending domain verified không? Rule 07/08/2026 nói không gửi được, staging 09/09/2026 gửi qua shared host `mailtro.ai`, còn quyết định PO/BA 02/10/2026 chỉ chốt cho automation. Sau khi PO chốt cho campaign, trang Sending domains có cần báo người dùng về việc gửi qua shared host không?",
    "Sau khi PO chốt cho campaign việc gửi khi workspace chưa có sending domain verified, copy trên trang domain và yêu cầu \"domain verified\" có cần đổi không, và việc gửi qua shared host `mailtro.ai` có cần báo cho người dùng không?"
  ],
  "check_ids": [
    "sending-domains:CHK-012"
  ]
}
```

## OQ-workspace-settings-019 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-workspace-settings-019",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "sending-domains",
  "summary": "Verify sending domain có luôn phải đi qua support không, và khi nào merchant tự thấy bản ghi DNS để cấu hình? Rule 07/08/2026 (khai đủ SPF/DKIM/DMARC, verify thất bại phải chỉ rõ record) giả định merchant tự cấu hình DNS, trong khi staging 29/09/2026 chỉ hiện \"contact support to start verification\". Cần PO xác nhận rule có cần sửa theo luồng qua support không.",
  "kb_ids": [
    "KB-081",
    "KB-082",
    "KB-083",
    "KB-084"
  ],
  "related_questions": [
    "Verify sending domain có luôn phải đi qua support không, và khi nào merchant tự thấy bản ghi DNS để cấu hình? Quy tắc SPF / DKIM / DMARC và \"verify thất bại chỉ rõ record\" có cần sửa theo luồng qua support không?"
  ]
}
```

## OQ-workspace-settings-020 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-workspace-settings-020",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "sending-domains",
  "summary": "Sending domain ở status Failed, Temporary failure hoặc Inactive có chặn gửi email không (campaign và automation)? Cần Dev xác nhận.",
  "kb_ids": [
    "KB-094",
    "KB-095"
  ],
  "related_questions": [
    "Domain ở status `Failed`, `Temporary failure` hoặc `Inactive` có chặn gửi email (campaign và automation) không?",
    "Xoá một sending domain đang là From của campaign Scheduled hoặc automation Active thì chuyện gì xảy ra (bị chặn xoá, hay campaign/automation ngừng gửi ngay như copy \"This domain will stop sending immediately.\")? Chưa có rule; cần PO xác nhận.",
    "Xoá một sending domain đang là From của campaign Scheduled hoặc automation Active thì bị chặn xoá, hay campaign/automation ngừng gửi ngay (như copy \"This domain will stop sending immediately.\"), hay chuyển sang gửi qua shared host?",
    "Xoá một sending domain đang là From của campaign Scheduled hoặc automation Active thì bị chặn xoá, hay campaign / automation ngừng gửi ngay?",
    "Tập status chính thức của sending domain là gì (staging hiện `Pending`, bundle có `Verified` / `Pending` / `Failed` / `Temporary failure` / `Inactive`, Jira MTRO-48 ghi `Verified` / `Not verified`), và domain ở status Failed, Temporary failure hoặc Inactive có chặn gửi campaign/automation không?"
  ],
  "check_ids": [
    "sending-domains:CHK-010",
    "sending-domains:CHK-008"
  ]
}
```

## OQ-workspace-settings-021 — CONFLICT

```json
{
  "oq_id": "OQ-workspace-settings-021",
  "type": "CONFLICT",
  "feature_id": null,
  "summary": "API của portal Mailtro (app workspace) xác thực bằng cơ chế nào: Sanctum SPA cookie kèm CSRF (theo tổng quan build staging QA đọc 03/09/2026) hay bearer token (theo kết quả thực tế QA ghi trên QA Hub 06/10/2026, gọi từ browser trả 401)? Dev BE cần xác nhận cơ chế hiện hành và cho biết có thay đổi giữa hai thời điểm không.",
  "kb_ids": [
    "KB-P-034",
    "KB-P-035",
    "KB-P-033"
  ],
  "side_a": "Theo tổng quan build staging do QA đọc ngày 03/09/2026, API của portal xác thực bằng Sanctum SPA cookie kèm CSRF, không dùng bearer token.",
  "side_b": "Theo kết quả thực tế QA ghi trên QA Hub ngày 06/10/2026, API của portal dùng bearer token và gọi trực tiếp từ browser trả 401.",
  "conflict_group": "CONF-MTRO-product-01",
  "scope_note": "Câu hỏi mức product (dùng chung nhiều object), đặt ở object này để theo dõi."
}
```

## OQ-workspace-settings-022 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-workspace-settings-022",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": null,
  "summary": "Trên staging (16/09–01/10/2026), mọi route không tồn tại trong app workspace (ví dụ /analytics, /brand, /forms, /settings/billing, /lists) trả trang trắng, không sidebar, không 404, nên không phân biệt được 'tính năng chưa có' với 'lỗi render'. Mailtro có dự kiến một trang 404 cho route không tồn tại không, và nếu có thì nội dung là gì? (Câu hỏi đang gửi Dev, chưa có trả lời.)",
  "kb_ids": [
    "KB-P-049",
    "KB-P-053",
    "KB-P-054",
    "KB-P-057",
    "KB-P-058",
    "KB-P-061"
  ],
  "scope_note": "Câu hỏi mức product (dùng chung nhiều object), đặt ở object này để theo dõi."
}
```

## OQ-workspace-settings-023 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-workspace-settings-023",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": null,
  "summary": "Trang Home (Jira MTRO-7 Dashboard) hiện chỉ là placeholder trên staging. Epic MTRO-7 (To Do) mô tả 3 user story US-2.1 dashboard số liệu + cảnh báo, US-2.2 quick action, US-2.3 landing mặc định Campaigns/Statistics thay Home (tự ghi xung đột với US-2.1). PO sẽ chọn US nào và lịch làm khi nào?",
  "kb_ids": [
    "KB-P-047",
    "KB-P-046"
  ],
  "scope_note": "Câu hỏi mức product (dùng chung nhiều object), đặt ở object này để theo dõi."
}
```

## OQ-workspace-settings-024 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-workspace-settings-024",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": null,
  "summary": "Ở tầng product, phần lớn hành vi khung app và route được khảo sát bằng tài khoản Owner; Member chỉ quan sát ở một workspace thứ hai, Admin và custom role chưa bao giờ được quan sát, và tên role thứ 3 (Member vs Marketer/Editor) cùng ma trận quyền chưa chốt. Sidebar, workspace switcher, nhóm Settings và các route có khác nhau theo role không? (Ma trận chi tiết thuộc workspace-settings/roles-and-permissions.)",
  "kb_ids": [
    "KB-021",
    "KB-023",
    "KB-024",
    "KB-025",
    "KB-026",
    "KB-027",
    "KB-030",
    "KB-031",
    "KB-032",
    "KB-035",
    "KB-036",
    "KB-037",
    "KB-063",
    "KB-080",
    "KB-081",
    "KB-082",
    "KB-084",
    "KB-091",
    "KB-095",
    "KB-096",
    "KB-P-031",
    "KB-P-037",
    "KB-P-041",
    "KB-P-051",
    "KB-P-052"
  ],
  "scope_note": "Câu hỏi mức product (dùng chung nhiều object), đặt ở object này để theo dõi.",
  "check_ids": [
    "roles-and-permissions:CHK-009",
    "api-keys-and-public-api:CHK-017",
    "claude-connector:CHK-008",
    "workspace-profile-settings:CHK-004",
    "sending-domains:CHK-014"
  ],
  "related_questions": [
    "Ma trận quyền Owner / Admin / Member (và custom role) theo từng module của workspace — contact, segment, campaign, automation, email library, saved block, trang preferences, import/export, analytics, API key, sending domain, đổi tên workspace — chưa được PO chốt; ngoài ra custom role có thuộc phạm vi phát hành hiện tại không, và có UI tạo custom role không? Hiện chỉ có quy tắc khung theo Jira MTRO-20/46/49 và hai quyết định riêng lẻ (Member không tạo/sửa segment; Member được tạo/xoá custom field). PO cần chốt ma trận để viết case quyền.",
    "Ma trận quyền Owner / Admin / role thứ 3 theo từng module của workspace (contact, segment, suppression, email library, saved block, trang preferences, import/export, analytics, sending domain) và theo từng thao tác xem/tạo/sửa/xoá là gì? Hiện chỉ có quy tắc khung theo Jira MTRO-20/46/49 và hai quyết định riêng lẻ (role thứ 3 không tạo/sửa segment; role thứ 3 được tạo/xoá custom field).",
    "Ma trận quyền Owner / Admin / role thứ 3 (và custom role) theo từng thao tác của từng module — contact, segment, campaign, automation, email library, saved block, trang preferences, import/export, analytics, API key, sending domain, đổi tên workspace — là gì?",
    "Custom role có thuộc phạm vi phát hành hiện tại không, và nếu có thì tạo / cấu hình ở đâu?",
    "Role nào (Owner / Admin / role thứ 3) được tạo, rotate, revoke API key? Trên staging 23/09/2026 tài khoản role thứ 3 vẫn thấy mục API keys trong Settings; đây có đúng quyền không?",
    "Role nào được tạo / rotate / revoke API key (Member vẫn thấy mục này trên staging)?",
    "Role nào (Owner / Admin / role thứ 3) được nối Claude với workspace, và sau khi nối Claude thao tác với quyền của người đã approve hay có quyền riêng của connector?",
    "Role nào được đổi tên workspace? Bundle frontend có hint \"Only owners and admins can rename this workspace.\" và tài khoản role thứ 3 vẫn thấy mục Workspace settings trên staging 23/09/2026 — PO xác nhận chỉ Owner và Admin được đổi tên, và role thứ 3 vào trang thì thấy gì?",
    "Role nào (Owner / Admin / role thứ 3) được thêm, sửa, xoá sending domain? Thao tác bị chặn ở UI hay ở API?",
    "Role nào (Owner / Admin / Member) được thêm, sửa, xoá sending domain?",
    "Tài liệu câu hỏi mở của QA (mục Role & Permission: tên role thứ 3, ma trận quyền, phân quyền API suppression/unsubscribe) được trỏ tới nhiều lần nhưng không có trong bộ nguồn; KB chỉ dùng các câu hỏi ghi tại chỗ, không suy diễn nội dung mục đó. Cần bổ sung tài liệu này vào bộ nguồn lần sau.",
    "Tài liệu câu hỏi mở của QA về Role & Permission (tên role thứ 3, ma trận quyền, phân quyền API suppression / unsubscribe) được nhắc tới nhưng không có trong bộ nguồn; nội dung các câu hỏi đó và câu trả lời (nếu đã có) là gì?",
    "Chưa có domain đã provision trên staging nên chưa quan sát: bảng bản ghi DNS thật (nội dung DKIM / SPF / DMARC / Custom MAIL FROM chưa được define trong Jira MTRO-48), điều kiện để nút Verify bật, chuyển trạng thái Pending sang Verified / Failed, thông báo khi verify thất bại, kết quả thật của Edit/Delete domain, và contract API sending domain (Jira MTRO-56 để trống). Ngoài ra role nào được thêm/sửa/xoá domain chưa được nêu. Cần dữ liệu domain đã provision và tài liệu API.",
    "Với domain đã provision: bảng bản ghi DNS thật gồm những record nào (type / name / content / priority), khi nào nút `Verify` bật, chuyển `Pending` sang `Verified` / `Failed` thế nào, và `Edit` sửa được field nào?",
    "Contract API sending domain (route đầy đủ, payload, mã lỗi cho add / list / get / delete / verify) là gì? Jira MTRO-56 để trống mô tả.",
    "Role nào trong workspace được nối Claude, và Claude hành động với quyền của user đã approve hay quyền riêng?"
  ]
}
```

## OQ-workspace-settings-025 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-workspace-settings-025",
  "type": "OPEN_ISSUE",
  "feature_id": null,
  "summary": "Không tài liệu nào ghi build/version staging tại các lần khảo sát khung app, route và captcha (16/09, 23/09, 29/09, 01/10/2026); chỉ có ngày khảo sát. Cần bổ sung build/version để biết các quan sát tầng product còn đúng ở bản hiện tại.",
  "kb_ids": [
    "KB-P-046",
    "KB-P-049",
    "KB-P-066"
  ],
  "scope_note": "Câu hỏi mức product (dùng chung nhiều object), đặt ở object này để theo dõi."
}
```

## OQ-workspace-settings-026 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-workspace-settings-026",
  "type": "OPEN_ISSUE",
  "feature_id": null,
  "summary": "Tài liệu chỉ mô tả môi trường staging: domain production của app workspace (có còn dạng <slug>.wisle.app không), host đầy đủ của tài liệu Public API (staging-api /docs) và endpoint MCP production không được ghi; production chỉ có dấu hiệu nhận diện 'mailtro.ai không tiền tố staging-'. Cần nguồn cho bản đồ host production.",
  "kb_ids": [
    "KB-P-026",
    "KB-P-032",
    "KB-P-029",
    "KB-P-024"
  ],
  "scope_note": "Câu hỏi mức product (dùng chung nhiều object), đặt ở object này để theo dõi."
}
```

## OQ-workspace-settings-027 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-workspace-settings-027",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "team-members-and-invitations",
  "summary": "Mời lại một email đang có lời mời `Invited` thì dialog Invite a member báo gì (chip lỗi, toast, hay gửi lại mail), và có tạo thêm lời mời mới không?",
  "check_ids": [
    "team-members-and-invitations:CHK-007"
  ]
}
```

## OQ-workspace-settings-028 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-workspace-settings-028",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "team-members-and-invitations",
  "summary": "Ô Email của dialog mời có nhận phân tách khác dấu phẩy (khoảng trắng, xuống dòng, chấm phẩy) không, và tối đa bao nhiêu email trong một lần mời? Khi vượt ngưỡng thì báo gì?",
  "check_ids": [
    "team-members-and-invitations:CHK-008"
  ],
  "related_questions": [
    "Ô Email của dialog mời có nhận phân tách khác dấu phẩy (khoảng trắng, xuống dòng, chấm phẩy) không, và tối đa bao nhiêu email trong một lần mời?"
  ]
}
```

## OQ-workspace-settings-029 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-workspace-settings-029",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "team-members-and-invitations",
  "summary": "`Resend invite` có gửi lại mail và gia hạn/thay token của lời mời không? Lời mời có hiệu lực bao lâu, và lời mời hết hạn hiển thị status gì trong bảng Team members?",
  "check_ids": [
    "team-members-and-invitations:CHK-011"
  ],
  "related_questions": [
    "Lời mời có hiệu lực bao lâu, `Resend invite` có gia hạn token và gửi lại mail không, và lời mời hết hạn hiển thị trạng thái gì?"
  ]
}
```

## OQ-workspace-settings-030 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-workspace-settings-030",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "team-members-and-invitations",
  "summary": "Người được mời (chưa có hoặc đã có tài khoản Mailtro) chấp nhận lời mời theo luồng nào, và sau khi chấp nhận dòng trong bảng Team members có chuyển từ `Invited` sang `Active` với đúng role đã chọn lúc mời không?",
  "check_ids": [
    "team-members-and-invitations:CHK-012"
  ],
  "related_questions": [
    "Người được mời đã có tài khoản Mailtro (đăng nhập với token mời hợp lệ) thì chấp nhận lời mời theo luồng nào, và sau khi chấp nhận dòng trong bảng có chuyển từ `Invited` sang `Active` với role đã chọn không?"
  ]
}
```

## OQ-workspace-settings-031 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-workspace-settings-031",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "team-members-and-invitations",
  "summary": "Trên UI thật, `Edit member` cho sửa những gì, đổi role có bước xác nhận không, và sau khi đổi role thì quyền của member thay đổi ngay hay từ phiên đăng nhập kế tiếp?",
  "check_ids": [
    "team-members-and-invitations:CHK-013",
    "team-members-and-invitations:CHK-014"
  ],
  "related_questions": [
    "Trên UI thật, `Remove from team` có hộp xác nhận nào, và sau khi xoá thì member mất quyền truy cập workspace ngay lập tức (kể cả phiên đang mở) hay từ lần đăng nhập kế tiếp?"
  ]
}
```

## OQ-workspace-settings-032 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-workspace-settings-032",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "roles-and-permissions",
  "summary": "Custom role (role mang quyền theo feature được cấu hình) có thuộc phạm vi phát hành hiện tại không, và nếu có thì tạo/gán custom role ở màn nào?",
  "check_ids": [
    "roles-and-permissions:CHK-010"
  ]
}
```

## OQ-workspace-settings-033 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-workspace-settings-033",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "api-keys-and-public-api",
  "summary": "Gọi Public API bằng key đã revoke trả mã HTTP và thông báo gì, và key ngừng hoạt động ngay lập tức sau khi revoke hay có độ trễ?",
  "check_ids": [
    "api-keys-and-public-api:CHK-010"
  ]
}
```

## OQ-workspace-settings-034 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-workspace-settings-034",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "api-keys-and-public-api",
  "summary": "Khi API key gọi một endpoint ngoài scope được cấp, Public API trả mã HTTP và thông báo gì? Danh sách endpoint ứng với từng scope là gì?",
  "check_ids": [
    "api-keys-and-public-api:CHK-013"
  ]
}
```

## OQ-workspace-settings-035 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-workspace-settings-035",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "api-keys-and-public-api",
  "summary": "IP allowlist cho API key theo Jira MTRO-92 §3 (gọi từ IP ngoài danh sách trả 403, key mới khi rotate giữ allowlist) đã được deploy chưa và có còn trong phạm vi không? Staging 29/09/2026 chưa có ô IP allowlist; allowlist nhận định dạng nào (IPv4 / IPv6 / CIDR)? Câu hỏi này thuộc nhóm xung đột do object Security & Abuse guard sở hữu.",
  "kb_ids": [
    "KB-058"
  ],
  "check_ids": [
    "api-keys-and-public-api:CHK-015"
  ]
}
```

## OQ-workspace-settings-036 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-workspace-settings-036",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "api-keys-and-public-api",
  "summary": "Khi API key của workspace A gọi tới id dữ liệu thuộc workspace B, Public API trả mã gì (403 hay 404), và danh sách có được lọc tuyệt đối theo workspace của key không?",
  "check_ids": [
    "api-keys-and-public-api:CHK-018"
  ]
}
```

## OQ-workspace-settings-037 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-workspace-settings-037",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "workspace-profile-settings",
  "summary": "Khi Owner/Admin bấm `Save changes` đổi tên workspace, hệ thống báo gì, và tên mới có cập nhật ngay ở workspace switcher, phụ đề trang và màn Choose a workspace không? Đổi tên có ảnh hưởng tới subdomain của workspace không?",
  "check_ids": [
    "workspace-profile-settings:CHK-002"
  ]
}
```

## OQ-workspace-settings-038 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-workspace-settings-038",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "workspace-profile-settings",
  "summary": "Tên workspace có giới hạn độ dài và tập ký tự nào? Tên rỗng hoặc chỉ khoảng trắng bị chặn thế nào và báo lỗi gì?",
  "check_ids": [
    "workspace-profile-settings:CHK-003"
  ]
}
```

## OQ-workspace-settings-039 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-workspace-settings-039",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "workspace-profile-settings",
  "summary": "Chuyển quyền sở hữu có phải là cách duy nhất để đổi Owner (không đổi được qua Edit member), và chỉ Owner hiện tại được thực hiện thao tác này không?",
  "check_ids": [
    "workspace-profile-settings:CHK-007"
  ]
}
```

## OQ-workspace-settings-040 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-workspace-settings-040",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "sending-domains",
  "summary": "Thêm một sending domain đã có trong workspace (kể cả khác hoa/thường hoặc có dấu chấm cuối) thì bị chặn hay tạo trùng, và báo gì? Có giới hạn độ dài domain không? Một domain đã được workspace khác thêm thì có thêm được không?",
  "check_ids": [
    "sending-domains:CHK-004"
  ]
}
```

## OQ-workspace-settings-041 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-workspace-settings-041",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "sending-domains",
  "summary": "Mở Domain settings với id không tồn tại hoặc id domain thuộc workspace khác thì trang hiển thị gì? Bundle có chuỗi `Domain not found.` nhưng chưa đối chiếu UI.",
  "check_ids": [
    "sending-domains:CHK-013"
  ],
  "kb_ids": [
    "KB-097"
  ]
}
```

## OQ-workspace-settings-042 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-workspace-settings-042",
  "type": "OPEN_ISSUE",
  "feature_id": "team-members-and-invitations",
  "summary": "Admin có thấy và dùng được trang Team members như Owner không (mời, thu hồi, đổi role, xoá), và Member mở `/members` thì thấy gì?",
  "kb_ids": [
    "KB-023",
    "KB-024",
    "KB-032"
  ]
}
```

## OQ-workspace-settings-043 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-workspace-settings-043",
  "type": "OPEN_ISSUE",
  "feature_id": "roles-and-permissions",
  "summary": "Khi role không đủ quyền gọi một API bị giới hạn, API trả mã và thông báo gì?",
  "kb_ids": [
    "KB-028"
  ]
}
```

## OQ-workspace-settings-044 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-workspace-settings-044",
  "type": "OPEN_ISSUE",
  "feature_id": "claude-connector",
  "summary": "8 font built-in mà `font_family` chấp nhận là những font nào, và truyền font khác thì MCP trả lỗi hay tự thay font?",
  "kb_ids": [
    "KB-069"
  ]
}
```

## OQ-workspace-settings-045 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-workspace-settings-045",
  "type": "OPEN_ISSUE",
  "feature_id": "workspace-profile-settings",
  "summary": "Admin có được đổi tên workspace không, và Member mở trang này thì thấy gì (ô bị khoá kèm hint hay bị chặn ở API)?",
  "kb_ids": [
    "KB-074",
    "KB-033"
  ]
}
```
