# Open Questions — Notifications — email gửi merchant / buyer theo sự kiện của module, template, sender / reply-to, Shopify Flow trigger cho email, email transaction gửi merchant từ Qikify

Tổng: 28 mục. Sinh từ lần bootstrap đầu tiên (DOC_BOOTSTRAP) của Duos B2B, ngày 2026-10-09.

- CONFLICT: 0
- NEEDS_CONFIRMATION: 20
- OPEN_ISSUE: 8

## OQ-notifications-001 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-notifications-001",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "notification-settings-and-templates",
  "summary": "Jira DUOS-310 (QA đọc 07/10/2026) ghi template email credit dùng param `{{store_owner}}`, `{{company_name}}`, `{{location_name}}`, `{{credit_limit}}`, `{{available_credit}}` (hai cặp ngoặc), còn editor template \"Credit limit assigned to a company location\" trên staging (08/10/2026) liệt kê biến một cặp ngoặc {customer_name}, {customer_email}, {shop_email}, {shop_name}, {company_name}, {location_name}, {credit_limit}, {currency_code}, {login_url} (không có store_owner, available_credit). Cú pháp và danh sách biến hiện hành của template email credit là gì? Cần PO/Dev xác nhận.",
  "kb_ids": [
    "KB-023",
    "KB-028"
  ],
  "related_questions": [
    "Template email credit dùng cú pháp và danh sách biến nào là hiện hành: bộ `{{store_owner}}`, `{{company_name}}`, `{{location_name}}`, `{{credit_limit}}`, `{{available_credit}}` theo Jira DUOS-310, hay bộ một cặp ngoặc {customer_name} … {login_url} (không có store_owner, available_credit) như editor staging 08/10/2026?",
    "Template email credit dùng cú pháp biến nào và danh sách biến nào là hiện hành: bộ `{{store_owner}}`, `{{company_name}}`, `{{location_name}}`, `{{credit_limit}}`, `{{available_credit}}` theo Jira DUOS-310, hay bộ một cặp ngoặc {customer_name} … {login_url} (không có store_owner, available_credit) trong editor staging 08/10/2026?"
  ],
  "check_ids": [
    "notification-settings-and-templates:CHK-019"
  ]
}
```

## OQ-notifications-002 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-notifications-002",
  "type": "OPEN_ISSUE",
  "feature_id": "notification-settings-and-templates",
  "summary": "Lỗi nghi vấn (Known issues Duos, chờ Dev, Minor): template mẫu \"Credit limit assigned to a company location\" trên staging (08/10/2026) có footer \"You received this email because you submitted a quote request to {shop_name}\" — sai ngữ cảnh credit. Cần Dev xác nhận là lỗi và theo dõi bản sửa; checklist dùng làm regression watch, không dùng footer hiện tại làm kết quả mong đợi.",
  "kb_ids": [
    "KB-030"
  ],
  "related_questions": [
    "Theo Jira DUOS-310, khi credit limit được set cho một company location, app gửi email cho Admin của location đó với subject \"Important: Credit limit established for [Location Name]\". Mô tả này có còn đúng không; có gửi lại khi credit limit được sửa không?",
    "Footer đúng của email \"Credit limit assigned to a company location\" là gì? Template mẫu hiện có footer \"You received this email because you submitted a quote request to {shop_name}\" (nghi sai ngữ cảnh, chờ Dev xác nhận).",
    "Footer \"You received this email because you submitted a quote request to {shop_name}\" của template mẫu credit-assigned có được Dev xác nhận là lỗi không, và footer đúng cho email credit là gì?"
  ],
  "check_ids": [
    "notification-settings-and-templates:CHK-017",
    "notification-settings-and-templates:CHK-020"
  ]
}
```

## OQ-notifications-003 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-notifications-003",
  "type": "OPEN_ISSUE",
  "feature_id": "notification-settings-and-templates",
  "summary": "Lỗi đang mở, chưa kết luận (Known issues Duos; comment PO và Dev BE trên Jira DUOS-309 ngày 25/03/2026): invite member bằng alias email `@qikify` thì người nhận không nhận được mail dù log báo delivered, alias `@gmail` vẫn nhận. Nguyên nhân (nghi do domain From) và việc PO liên hệ nhà cung cấp gửi mail chưa có kết luận; lỗi còn tái hiện sau thay đổi From sang sender mặc định của app (01/04/2026) không? Theo dõi như regression watch.",
  "kb_ids": [
    "KB-031",
    "KB-032"
  ],
  "related_questions": [
    "Invite member bằng alias email `@qikify` không nhận được mail dù log báo delivered có còn tái hiện sau khi From chuyển sang sender mặc định của app (01/04/2026) không, và nguyên nhân là gì?",
    "Lỗi alias `@qikify` không nhận email member dù log báo delivered có còn tái hiện sau khi From chuyển sang sender mặc định của app không?"
  ]
}
```

## OQ-notifications-004 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-notifications-004",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "notification-settings-and-templates",
  "summary": "Phạm vi toàn object Notifications: các hành vi sau chỉ có nguồn là nội dung Jira ticket do QA đọc ngày 07/10/2026 (không có quyết định PO/Dev hay test case PASS đi kèm): header trang Notifications (Jira DUOS-171); nhóm B2B submission chỉ có \"Read instruction\" / \"Open Shopify Flow\" (Jira DUOS-171); mặc định Disable và subject/CTA của email member (Jira DUOS-309); người nhận, toggle và template của email shopping list (Jira DUOS-308), biến {shopping_list_approver} (Jira DUOS-368); điều kiện gửi, người nhận, toggle, subject và param của email credit (Jira DUOS-310); email transaction Install / Uninstall / Subscription change / Cancel subscription (Jira DUOS-385) và email đổi Shopify plan (Jira DUOS-386). PO xác nhận các mô tả trong ticket này còn đúng với bản hiện tại để dùng làm kết quả mong đợi.",
  "kb_ids": [
    "KB-001",
    "KB-004",
    "KB-008",
    "KB-010",
    "KB-011",
    "KB-013",
    "KB-014",
    "KB-015",
    "KB-018",
    "KB-019",
    "KB-020",
    "KB-021",
    "KB-022",
    "KB-023",
    "KB-038",
    "KB-039",
    "KB-040",
    "KB-041"
  ],
  "related_questions": [
    "Biến `{shopping_list_approver}` (Jira DUOS-368) có đúng chỉ có trong template \"Shopping list approved\" và được thay bằng tên người duyệt khi gửi email không?",
    "Các hành vi của trang Notifications chỉ có nguồn nội dung Jira ticket (header trang DUOS-171; nhóm B2B submission chỉ có \"Read instruction\" / \"Open Shopify Flow\"; mặc định tắt, subject và CTA email member DUOS-309; người nhận, toggle, template và biến email shopping list DUOS-308 / DUOS-368; điều kiện gửi, người nhận, toggle, subject và param email credit DUOS-310) có còn đúng với bản hiện tại để dùng làm kết quả mong đợi không?"
  ],
  "check_ids": [
    "notification-settings-and-templates:CHK-014"
  ]
}
```

## OQ-notifications-005 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-notifications-005",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "notification-settings-and-templates",
  "summary": "Nhãn UI trên trang Notifications theo staging (khảo sát 08/10/2026) khác nhãn ghi trong Jira: nhóm B2B submission là \"New submission notification\" (ticket DUOS-171: \"New B2B submission\") với mô tả khác ticket; nhóm Members & permissions là \"Member added to location\" / \"Member role updated\" (ticket DUOS-309: \"Members added to location\" / \"Members' role updated\"). QA đã cập nhật tài liệu theo staging nhưng chưa có PO/Dev xác nhận. Nhãn và mô tả hiện hành đúng là bản trên staging?",
  "kb_ids": [
    "KB-005",
    "KB-007"
  ],
  "related_questions": [
    "Nhãn và mô tả hiện hành của thông báo nhóm B2B submission (\"New submission notification\" trên staging so với \"New B2B submission\" trong Jira DUOS-171) và nhóm Members & permissions (\"Member added to location\" / \"Member role updated\" trên staging so với \"Members added to location\" / \"Members' role updated\" trong Jira DUOS-309) có đúng là bản đang thấy trên staging không?"
  ]
}
```

## OQ-notifications-006 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-notifications-006",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": null,
  "summary": "Phạm vi toàn object Notifications: tài liệu không nêu role/quyền nào của tài khoản merchant (owner hay staff có giới hạn quyền) được xem trang Notifications, bật/tắt switch, sửa template và cấu hình sender email; staging chỉ khảo sát bằng một tài khoản merchant staff. Với nhiều thông báo, người nhận chỉ ghi chung (phía Admin = nội bộ merchant, phía Customer = buyer) mà không nêu role buyer cụ thể. Cần PO xác nhận ma trận quyền trên trang Notifications và người nhận cụ thể của từng thông báo.",
  "kb_ids": [
    "KB-001",
    "KB-003",
    "KB-004",
    "KB-008",
    "KB-009",
    "KB-010",
    "KB-011",
    "KB-014",
    "KB-015",
    "KB-017",
    "KB-020",
    "KB-022",
    "KB-023",
    "KB-024",
    "KB-026",
    "KB-034",
    "KB-035",
    "KB-041"
  ],
  "related_questions": [
    "Role/quyền merchant nào (chủ store hay staff giới hạn quyền) được xem trang Notifications, bật/tắt switch, sửa template và cấu hình sender email; và người nhận cụ thể theo role buyer của từng thông báo phía Customer là ai?",
    "Role/quyền merchant nào (owner hay staff có giới hạn quyền) được xem trang Notifications, bật/tắt switch và sửa template, và người nhận cụ thể theo role buyer của từng thông báo phía Customer là ai?",
    "Role/quyền merchant nào được cấu hình sender email trong editor template? (câu hỏi thuộc ma trận quyền chung của trang Notifications)",
    "Role/quyền merchant nào được cấu hình sender email trong editor template?"
  ],
  "check_ids": [
    "notification-settings-and-templates:CHK-025",
    "sender-reply-to:CHK-008"
  ]
}
```

## OQ-notifications-007 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-notifications-007",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "notification-settings-and-templates",
  "summary": "Khi store bật cờ tạo company tự động lúc submit, email kích hoạt account cho buyer do setting nào điều khiển, và được gửi lúc submit hay lúc merchant Approve? Trên staging (TC-DUOS-194, 30/09/2026) bật \"Member added to location\" rồi submit và Approve thì không nhận email nào ngoài login code (GAP-25, GAP-26 của task Testlane DUOS-004). Cần PO xác nhận.",
  "kb_ids": [
    "KB-012"
  ],
  "related_questions": [
    "Khi store bật cờ tạo company tự động lúc submit, email kích hoạt account cho buyer do setting nào điều khiển, và được gửi lúc submit hay lúc merchant Approve (GAP-25, GAP-26 của task Testlane DUOS-004)?"
  ]
}
```

## OQ-notifications-008 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-notifications-008",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "notification-settings-and-templates",
  "summary": "Thông báo \"Member added to location\" và luồng invite member có dùng chung một trigger email không (Jira DUOS-309)? Email có subject \"Welcome to the [Company name] team on [Store name]\" gắn với thông báo nào — \"Member added to location\" hay invite member? Cần PO/Dev xác nhận để biết case nào phải gửi email member.",
  "kb_ids": [
    "KB-007",
    "KB-008",
    "KB-010"
  ],
  "related_questions": [
    "Thông báo \"Member added to location\" và luồng invite member có dùng chung trigger email không, và email subject \"Welcome to the [Company name] team on [Store name]\" thuộc thông báo nào?",
    "Email member nào được gửi khi member được thêm vào location và khi đổi role: \"Member added to location\" và luồng invite member có dùng chung trigger không, email subject \"Welcome to the [Company name] team on [Store name]\" (CTA \"Log in to store\") và \"Update: Your access role for [Company name] has changed.\" (CTA \"View my account\") theo Jira DUOS-309 có còn đúng không?"
  ],
  "check_ids": [
    "notification-settings-and-templates:CHK-009"
  ]
}
```

## OQ-notifications-009 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-notifications-009",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "notification-settings-and-templates",
  "summary": "Trạng thái mặc định (bật hay tắt) của hai toggle thông báo Shopping list (\"Shopping list pending approval\", \"Shopping list approved\") là gì (Jira DUOS-308 không nêu)? Cần PO xác nhận.",
  "kb_ids": [
    "KB-015",
    "KB-017"
  ],
  "related_questions": [
    "Trên store chưa cấu hình, switch \"Member role updated\" mặc định tắt (Jira DUOS-309 ghi Disable) có còn đúng không, và hai switch \"Shopping list pending approval\", \"Shopping list approved\" mặc định bật hay tắt (Jira DUOS-308 không nêu)?",
    "Hai toggle thông báo Shopping list (\"Shopping list pending approval\", \"Shopping list approved\") mặc định bật hay tắt?"
  ],
  "check_ids": [
    "notification-settings-and-templates:CHK-008"
  ]
}
```

## OQ-notifications-010 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-notifications-010",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "notification-settings-and-templates",
  "summary": "Hai thông báo nhóm B2B submission (Admin \"New submission notification\", Customer \"B2B account created\") không có switch hay template trong app, chỉ có \"Read instruction\" và \"Open Shopify Flow\". Email của hai thông báo này do ai nhận và được gửi bằng cơ chế nào (chỉ qua workflow Shopify Flow do merchant tự dựng, hay app có gửi mặc định)? Cần PO/Dev xác nhận.",
  "kb_ids": [
    "KB-004",
    "KB-005"
  ],
  "related_questions": [
    "Hai thông báo nhóm B2B submission (Admin \"New submission notification\", Customer \"B2B account created\") không có switch hay template trong app. Email của hai thông báo này do ai nhận và được gửi bằng cơ chế nào: chỉ khi merchant tự dựng workflow Shopify Flow, hay app có gửi mặc định?",
    "Hai thông báo nhóm B2B submission (Admin \"New submission notification\", Customer \"B2B account created\") do ai nhận và được gửi bằng cơ chế nào — chỉ qua workflow Shopify Flow do merchant tự dựng hay app có gửi mặc định?"
  ],
  "check_ids": [
    "notification-settings-and-templates:CHK-003"
  ]
}
```

## OQ-notifications-011 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-notifications-011",
  "type": "OPEN_ISSUE",
  "feature_id": "notification-settings-and-templates",
  "summary": "Nhóm thông báo Quotations (Admin: New quote submitted, Quote accepted, Quote rejected, Quote re-quoted; Customer: Auto-response email, Proposal email) chỉ có nhãn UI quan sát trên staging 08/10/2026; người nhận, trạng thái mặc định, điều kiện gửi và nội dung (Jira DUOS-170, DUOS-161) chưa được tài liệu mô tả. Cần bổ sung nguồn trước khi viết kết quả mong đợi.",
  "kb_ids": [
    "KB-006"
  ],
  "related_questions": [
    "Nhóm thông báo Quotations (Admin: New quote submitted, Quote accepted, Quote rejected, Quote re-quoted; Customer: Auto-response email, Proposal email) gửi cho ai, mặc định bật hay tắt, gửi khi nào và nội dung mặc định là gì (Jira DUOS-170, DUOS-161)?",
    "Nhóm Quotations (New quote submitted, Quote accepted, Quote rejected, Quote re-quoted, Auto-response email, Proposal email) gửi cho ai, mặc định bật hay tắt, điều kiện gửi và nội dung là gì (Jira DUOS-170, DUOS-161)?"
  ],
  "check_ids": [
    "notification-settings-and-templates:CHK-005"
  ]
}
```

## OQ-notifications-012 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-notifications-012",
  "type": "OPEN_ISSUE",
  "feature_id": "notification-settings-and-templates",
  "summary": "Chưa quan sát việc gửi email thật: trang Notifications và một editor template mới được khảo sát cấu trúc trên store staging Plus (Free plan, 8 extension Inactive), switch và nút \"Activate\" chưa được bấm, chưa kiểm email đến inbox nào; mail staging gửi thật hay sandbox cũng chưa rõ. Mọi hành vi gửi email (người nhận, thời điểm, nội dung) hiện chưa có quan sát nào.",
  "kb_ids": [
    "KB-024",
    "KB-025",
    "KB-026",
    "KB-029",
    "KB-019",
    "KB-021",
    "KB-013",
    "KB-014"
  ],
  "related_questions": [
    "Email thật có được gửi khi bật switch tương ứng không (người nhận, thời điểm, nội dung), mail staging gửi thật hay sandbox, và nút \"Activate\" / badge \"Inactive\" của editor template có tác dụng gì?",
    "Hộp thoại beforeunload khi rời editor template mà chưa sửa gì là hành vi chấp nhận được hay cần sửa?"
  ]
}
```

## OQ-notifications-013 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-notifications-013",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "sender-reply-to",
  "summary": "Dev BE quyết định ngày 01/04/2026 và PO chốt (Jira DUOS-370): sender email của merchant được đưa vào reply-to và field \"reply to\" riêng bị bỏ. Nhưng trên staging (khảo sát 08/10/2026, store staging Plus (Free plan)), editor template email \"Credit limit assigned to a company location\" vẫn có field \"Reply to email:\" riêng bên cạnh \"Sender name:\" và \"Sender email:\". Đây là UI chưa cập nhật theo quyết định, hay quyết định đã thay đổi? Header Reply-To của email gửi buyer hiện lấy từ field nào? Cần Dev/PO xác nhận.",
  "kb_ids": [
    "KB-033",
    "KB-034",
    "KB-035"
  ],
  "related_questions": [
    "Field \"Reply to email:\" còn trong editor template trên staging (08/10/2026) là UI chưa cập nhật theo quyết định Dev BE 01/04/2026 (PO chốt, Jira DUOS-370) bỏ field reply-to riêng, hay quyết định đã thay đổi? Header Reply-To của email gửi buyer hiện lấy từ \"Sender email:\" hay \"Reply to email:\"?",
    "Khi merchant chưa cấu hình sender email, email gửi buyer có header Reply-To hay không, và trỏ về đâu?",
    "Khi merchant chưa cấu hình sender email, email gửi buyer có header Reply-To không và trỏ về địa chỉ nào (email store, email chủ store, hay không có)?"
  ],
  "check_ids": [
    "sender-reply-to:CHK-005"
  ]
}
```

## OQ-notifications-014 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-notifications-014",
  "type": "OPEN_ISSUE",
  "feature_id": "flow-email-triggers",
  "summary": "Shopify Flow chưa được mở trên staging: 4 trigger email (Member added to location, Role changes, Shopping list pending approval, Shopping list approved) và payload danh sách customer của trigger pending approval chỉ có nguồn Jira DUOS-371 + Dev 01/04/2026, chưa có quan sát nào trên Shopify Flow.",
  "kb_ids": [
    "KB-036",
    "KB-037"
  ],
  "related_questions": [
    "Bốn trigger email (Member added to location, Role changes, Shopping list pending approval, Shopping list approved) có hiện đúng tên trong Shopify Flow và bắn đúng sự kiện không, khi chưa ai mở Shopify Flow trên staging?",
    "Payload của ba trigger Member added to location, Role changes và Shopping list approved gồm những field nào?"
  ]
}
```

## OQ-notifications-015 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-notifications-015",
  "type": "OPEN_ISSUE",
  "feature_id": "flow-email-triggers",
  "summary": "Email báo đổi role có được gửi lặp lại khi Flow action assign role chạy lần 2 cho cùng member và cùng role không (tính idempotent)? Tài liệu chỉ trỏ sang danh sách câu hỏi mở không có trong bộ nguồn; không suy diễn. Hành vi Flow action thuộc nhóm Roles & permissions; cần nguồn bổ sung.",
  "kb_ids": [
    "KB-011",
    "KB-036"
  ],
  "related_questions": [
    "Khi Flow action assign role chạy lần 2 cho cùng member và cùng role (không đổi gì), email báo đổi role và trigger Role changes có bị gửi/bắn lặp không?",
    "Email báo đổi role có được gửi lặp khi Flow action assign role chạy lần 2 cho cùng member và cùng role không?"
  ],
  "check_ids": [
    "flow-email-triggers:CHK-005"
  ]
}
```

## OQ-notifications-016 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-notifications-016",
  "type": "OPEN_ISSUE",
  "feature_id": "merchant-transactional-emails",
  "summary": "Email transaction gửi merchant từ Qikify: nội dung template Install / Uninstall / Subscription change / Cancel subscription không có trong Jira DUOS-385, và trigger + điều kiện gửi email đổi Shopify plan (webhook nào, áp cho tier nào) không có trong Jira DUOS-386. Cần bổ sung nguồn trước khi viết kết quả mong đợi.",
  "kb_ids": [
    "KB-038",
    "KB-039",
    "KB-040",
    "KB-041"
  ],
  "related_questions": [
    "Theo Jira DUOS-385, Qikify gửi email transaction cho merchant khi Subscription change và Cancel subscription. Mô tả này có còn đúng không; nội dung template và địa chỉ nhận là gì?",
    "Các mô tả của Jira DUOS-385 (email Install / Uninstall chia 2 nhóm Shopify plan, email Subscription change / Cancel subscription) và Jira DUOS-386 (template \"[duos] shopify plan changes\" với param store_owner, module_included, previous_plan, current_plan) có còn đúng với bản hiện tại để dùng làm kết quả mong đợi không?",
    "Nội dung template của các email Install, Uninstall, Subscription change và Cancel subscription là gì, và hai nhóm Shopify plan khác nhau ở điểm nào trong email?",
    "Email đổi Shopify plan được gửi khi nhận webhook nào và áp cho chuyển đổi giữa các Shopify plan nào?"
  ],
  "check_ids": [
    "merchant-transactional-emails:CHK-002"
  ]
}
```

## OQ-notifications-017 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-notifications-017",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "notification-settings-and-templates",
  "summary": "Theo Jira DUOS-308, email \"Shopping list pending approval\" gửi Admin và Senior buyer khi Junior buyer bấm \"Submit for approval\", email \"Shopping list approved\" gửi người tạo list, và mỗi email có switch bật/tắt trên trang Notifications. Mô tả này có còn đúng với bản hiện tại không, và khi switch tắt thì email có bị chặn hoàn toàn không?",
  "check_ids": [
    "notification-settings-and-templates:CHK-013"
  ]
}
```

## OQ-notifications-018 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-notifications-018",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "notification-settings-and-templates",
  "summary": "Theo Jira DUOS-310, app gửi email nội bộ cho merchant khi credit khả dụng xuống dưới 20% tổng credit limit (subject \"ALERT: Low available credit for [Company name] - [Location name]\"). Mô tả này có còn đúng không; email gửi tới địa chỉ nào của merchant; ở mốc đúng bằng 20% có gửi không; và khi credit tiếp tục giảm thì cảnh báo gửi một lần hay mỗi lần?",
  "check_ids": [
    "notification-settings-and-templates:CHK-016"
  ]
}
```

## OQ-notifications-019 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-notifications-019",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "notification-settings-and-templates",
  "summary": "Đổi switch có được lưu ngay hay cần bấm lưu, và sửa template (subject, nội dung) được lưu theo từng thông báo ra sao? Có cách khôi phục template mặc định không?",
  "check_ids": [
    "notification-settings-and-templates:CHK-022"
  ]
}
```

## OQ-notifications-020 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-notifications-020",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "notification-settings-and-templates",
  "summary": "Editor template có chặn lưu khi subject trống không, và biến không có trong \"Available variables\" được xử lý thế nào khi lưu và khi gửi email?",
  "check_ids": [
    "notification-settings-and-templates:CHK-023"
  ]
}
```

## OQ-notifications-021 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-notifications-021",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "notification-settings-and-templates",
  "summary": "Badge \"Inactive\" và nút \"Activate\" trên editor template có ý nghĩa gì (template chưa kích hoạt, hay module chưa subscribe), và thông báo có template Inactive có gửi email khi switch bật không? Mail staging gửi thật hay sandbox?",
  "check_ids": [
    "notification-settings-and-templates:CHK-024"
  ]
}
```

## OQ-notifications-022 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-notifications-022",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "sender-reply-to",
  "summary": "Field \"Sender email:\" có validate định dạng email khi lưu không, và thông báo lỗi là gì?",
  "check_ids": [
    "sender-reply-to:CHK-006"
  ]
}
```

## OQ-notifications-023 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-notifications-023",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "sender-reply-to",
  "summary": "Field sender có mặt ở mọi template phía Customer hay chỉ một số template, cấu hình theo từng template hay dùng chung, và sender mặc định của app là địa chỉ nào?",
  "check_ids": [
    "sender-reply-to:CHK-007"
  ],
  "related_questions": [
    "Field sender có mặt ở mọi template phía Customer hay chỉ ở một số template, và sender mặc định của app cụ thể là địa chỉ nào?"
  ]
}
```

## OQ-notifications-024 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-notifications-024",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "flow-email-triggers",
  "summary": "Trigger Member added to location, Role changes và Shopping list approved bắn khi nào chính xác (vd invite member có tính là added to location không) và payload gồm những field nào?",
  "check_ids": [
    "flow-email-triggers:CHK-003"
  ]
}
```

## OQ-notifications-025 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-notifications-025",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "flow-email-triggers",
  "summary": "Trigger Shopify Flow có bắn khi switch thông báo tương ứng trên trang Notifications đang tắt không (hai cơ chế độc lập hay phụ thuộc)?",
  "check_ids": [
    "flow-email-triggers:CHK-004"
  ]
}
```

## OQ-notifications-026 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-notifications-026",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "merchant-transactional-emails",
  "summary": "Theo Jira DUOS-385, Qikify gửi email transaction cho merchant khi Install và Uninstall, chia 2 nhóm Shopify plan (Advanced / Plus / Plus Sandbox và Basic / Grow / Partner test / Affiliate). Mô tả này có còn đúng không; nội dung email của mỗi nhóm khác nhau ở đâu và gửi tới địa chỉ nào của merchant?",
  "check_ids": [
    "merchant-transactional-emails:CHK-001"
  ],
  "related_questions": [
    "Email transaction gửi tới địa chỉ nào của merchant (email store owner hay email khác)?"
  ]
}
```

## OQ-notifications-027 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-notifications-027",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "merchant-transactional-emails",
  "summary": "Theo Jira DUOS-386, email đổi Shopify plan dùng template \"[duos] shopify plan changes\" với param `{{store_owner}}`, `{{module_included}}`, `{{previous_plan}}`, `{{current_plan}}`. Mô tả này có còn đúng không; email được gửi khi nhận webhook nào và áp cho chuyển đổi giữa các Shopify plan nào?",
  "check_ids": [
    "merchant-transactional-emails:CHK-003"
  ]
}
```

## OQ-notifications-028 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-notifications-028",
  "type": "OPEN_ISSUE",
  "feature_id": null,
  "summary": "Bộ tài liệu nguồn (QA business rule, QA KB Duos, inventory staging) không có đặc tả API / data model cho các feature: sender-reply-to, merchant-transactional-emails. Cần Dev cung cấp endpoint, payload và dữ liệu lưu trữ liên quan nếu QA cần kiểm ở tầng API/DB.",
  "related_feature_ids": [
    "sender-reply-to",
    "merchant-transactional-emails"
  ]
}
```
