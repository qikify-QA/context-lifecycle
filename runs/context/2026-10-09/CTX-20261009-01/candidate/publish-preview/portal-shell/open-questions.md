# Open Questions — Portal chung — Home / onboarding, điều hướng Portal & B2B extensions hub, Content & Translation, banner DTC ở Customer Account, admin panel nội bộ (Filament)

Tổng: 21 mục. Sinh từ lần bootstrap đầu tiên (DOC_BOOTSTRAP) của Duos B2B, ngày 2026-10-09.

- CONFLICT: 0
- NEEDS_CONFIRMATION: 12
- OPEN_ISSUE: 9

> Câu hỏi dùng chung với object `pricing-subscription` được theo dõi ở **OQ-pricing-subscription-022** trong open-questions của object đó (các check liên quan của object này trỏ `oq_id` tới mục đó).

## OQ-portal-shell-001 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-portal-shell-001",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "home-onboarding",
  "summary": "Tài liệu sản phẩm Duos ghi Portal có trang Dashboard riêng (Epic Jira DUOS-46, trạng thái Done khi đọc Jira 07/10/2026), nhưng trên staging khảo sát 08/10/2026 sidebar của app không có mục Dashboard và route `/dashboard` mở ra iframe trống chỉ có nút \"Open chat\"; trang chính là Home \"Welcome to Duos B2B,\". Dashboard đã bị gỡ hay đã gộp vào Home, và route `/dashboard` hiện nên hiển thị gì? Cần PO/Dev xác nhận.",
  "kb_ids": [
    "KB-001",
    "KB-002",
    "KB-003",
    "KB-004",
    "KB-008",
    "KB-014",
    "KB-015"
  ],
  "related_questions": [
    "Dashboard riêng (Epic Jira DUOS-46) đã bị gỡ hay đã gộp vào Home, và route `/dashboard` hiện nên hiển thị gì (staging 08/10/2026 mở iframe trống chỉ có nút \"Open chat\")?",
    "Card \"Duos B2B app embed status\" ở Home: Jira DUOS-49 (01/2025) mô tả badge \"Disabled\" / \"Enabled\", nút \"Check status\" và nút \"Enable app\" / \"Disable app\"; trên staging khảo sát 08/10/2026 (app embed chưa bật) chỉ thấy badge Disabled và nút \"Enable app\", không thấy \"Check status\". Nút \"Check status\" đã bị gỡ hay chỉ hiện ở trạng thái khác? Khi app embed đã bật, card hiển thị badge và nút nào? Cần PO/Dev xác nhận.",
    "Khi app embed của Duos đã bật, card \"Duos B2B app embed status\" ở Home hiển thị badge và nút nào (\"Enabled\", \"Disable app\")? Nút \"Check status\" mà Jira DUOS-49 (01/2025) mô tả đã bị gỡ hay chỉ hiện ở trạng thái khác (staging 08/10/2026 ở trạng thái chưa bật không thấy nút này)?",
    "Khi app embed đã bật, card \"Duos B2B app embed status\" hiển thị badge và nút nào; nút \"Check status\" đã bị gỡ hay chỉ hiện ở trạng thái khác?",
    "Portal tích hợp Crisp live chat (Jira DUOS-121): nút nào trên Portal mở Crisp (\"Chat with us\" trên Home, \"Open chat\" ở route `/dashboard` hay nút khác)?",
    "Nút nào trên Portal mở Crisp live chat (\"Chat with us\", \"Open chat\" hay nút khác)?"
  ],
  "check_ids": [
    "home-onboarding:CHK-003",
    "home-onboarding:CHK-008"
  ]
}
```

## OQ-portal-shell-002 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-portal-shell-002",
  "type": "OPEN_ISSUE",
  "feature_id": "home-onboarding",
  "summary": "Home của Portal chưa có business rule do PO/Dev chốt; mọi mô tả hiện hành chỉ đến từ khảo sát staging 08/10/2026 trên một store Shopify Plus ở Free plan, app embed chưa bật, Setup guide 0/3. Chưa có quan sát nào cho: card app embed khi đã bật, điều kiện để từng bước Setup guide được tính completed, card \"Onboarding call\" và \"Chat with us\" trên store không phải Plus / Advanced, hành vi sau khi đổi select \"Language:\". Cần business rule hoặc khảo sát bổ sung trước khi dùng các màn này làm kết quả mong đợi.",
  "kb_ids": [
    "KB-001",
    "KB-002",
    "KB-005",
    "KB-006",
    "KB-007",
    "KB-009",
    "KB-010"
  ],
  "missing_area": "home-business-rule-and-states",
  "related_questions": [
    "Theo Jira DUOS-79 và DUOS-387, đặt lịch onboarding / demo call chỉ hiện cho store Shopify Plus và Advanced: trên store gói khác, card \"Onboarding call\" bị ẩn toàn bộ hay chỉ ẩn phần đặt lịch (\"Book a call\"), và \"Chat with us\" có còn không?",
    "Trên store không phải Shopify Plus / Advanced, card \"Onboarding call\" với \"Book a call\" và \"Chat with us\" bị ẩn toàn bộ hay chỉ ẩn phần đặt lịch?",
    "Staff Shopify có quyền giới hạn có thấy và thao tác được Home (bật app embed, đặt lịch gọi) không?"
  ],
  "check_ids": [
    "home-onboarding:CHK-007"
  ]
}
```

## OQ-portal-shell-003 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-portal-shell-003",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "portal-navigation",
  "summary": "Ma trận quyền cho các màn dùng chung của Portal chưa được ghi: mọi khảo sát staging dùng một tài khoản merchant staff, tài liệu không nói staff Shopify bị giới hạn quyền có thấy Home, B2B extensions hub, Content & Translation hay không; banner cho khách không phải B2B ở Customer Account không nói rõ áp cho khách đã đăng nhập nhưng chưa thuộc company nào hay cho mọi khách; trong admin panel nội bộ, role nào (quản lý bằng Shield) được xem shop, sửa `users.config`, quản lý Plans / Discounts / Extensions chưa được ghi. Cần PO/Dev xác nhận ma trận quyền cho các màn này.",
  "kb_ids": [
    "KB-017",
    "KB-018",
    "KB-027",
    "KB-028",
    "KB-031",
    "KB-032",
    "KB-033",
    "KB-034",
    "KB-035",
    "KB-038",
    "KB-040"
  ],
  "related_feature_ids": [
    "home-onboarding",
    "portal-navigation",
    "content-translations",
    "dtc-access-banner",
    "internal-admin-panel"
  ],
  "related_questions": [
    "Staff Shopify bị giới hạn quyền có thấy và thao tác được các màn chung của Portal (Home, sidebar, B2B extensions hub, Content & Translation) không, và Portal giới hạn theo quyền nào của Shopify?",
    "Staff Shopify có quyền giới hạn có thấy các mục sidebar và B2B extensions hub không?",
    "Staff Shopify có quyền giới hạn có xem / sửa bản dịch được không?",
    "Banner cho khách không phải B2B ở Customer Account (Jira DUOS-340): giới hạn ký tự của nội dung là bao nhiêu, khi merchant để trống nội dung thì hiển thị gì, khi link Markdown viết sai cú pháp thì hiển thị gì, và merchant sửa banner ở màn nào của Portal? Tài liệu tự ghi các điểm này là \"Need confirm\". Cần PO/Dev xác nhận.",
    "Merchant sửa nội dung banner cho khách không phải B2B ở màn nào của Portal, role nào được sửa, và nội dung mới có hiển thị ngay ở Customer Account sau khi lưu không?",
    "Theo Jira DUOS-340, banner ở Customer Account chỉ là text thường và link viết bằng cú pháp Markdown `[text](url)`: link có mở ở tab mới không, và ký hiệu định dạng khác (đậm, xuống dòng) hiển thị thế nào?",
    "Nội dung banner cho khách không phải B2B có giới hạn bao nhiêu ký tự, và khi merchant để trống nội dung thì Customer Account hiển thị gì (banner mặc định, banner rỗng hay trang trắng)?",
    "Khi link Markdown trong banner cho khách không phải B2B viết sai cú pháp, Portal có chặn khi lưu không và Customer Account hiển thị gì?",
    "Nội dung banner cho khách không phải B2B có giới hạn bao nhiêu ký tự, khi merchant để trống thì hiển thị gì, và khi link Markdown viết sai cú pháp thì hiển thị gì?",
    "Merchant sửa nội dung banner ở màn nào của Portal?",
    "Những trang extension B2B nào ở Customer Account hiển thị banner (Company member, Quick Order, Shopping list, My Quotes, mục tài chính)?",
    "Banner cho khách không phải B2B áp cho khách đã đăng nhập nhưng chưa thuộc company nào, hay cho mọi khách mở trang extension B2B (kể cả chưa đăng nhập)? Thành viên company B2B có bao giờ thấy banner không?",
    "Banner áp cho khách đã đăng nhập nhưng chưa thuộc company nào, hay cho mọi khách mở trang extension B2B (kể cả chưa đăng nhập)?"
  ],
  "check_ids": [
    "portal-navigation:CHK-011",
    "dtc-access-banner:CHK-003",
    "dtc-access-banner:CHK-004",
    "dtc-access-banner:CHK-005",
    "dtc-access-banner:CHK-006",
    "dtc-access-banner:CHK-002"
  ]
}
```

## OQ-portal-shell-004 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-portal-shell-004",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "portal-navigation",
  "summary": "Các hành vi sau của Portal chung chỉ có nguồn là mô tả Jira hoặc tài liệu sản phẩm Duos do QA tóm tắt lại, chưa có business rule hay PO/Dev xác nhận: card app embed và nút \"Check status\" theo Jira DUOS-49 (01/2025, tài liệu ghi \"có thể đã đổi\"); đặt lịch onboarding / demo call chỉ cho Shopify Plus và Advanced (DUOS-79, DUOS-387); Crisp live chat (DUOS-121); hỗ trợ tiếng Nhật (DUOS-108, DUOS-275); App Logo tuỳ chỉnh (DUOS-144); app tự phát hiện extension đã thêm vào Customer Account (DUOS-199); điều hướng tái cấu trúc 2 đợt (DUOS-168, DUOS-228); Translations có EN + JP (không rõ là ngôn ngữ giao diện Portal hay ngôn ngữ bản dịch nội dung cho buyer); banner cho khách không phải B2B (DUOS-340 kèm comment 26/02/2026); các mục bên trong admin panel nội bộ và JSON viewer sau Laravel 12 (DUOS-399, DUOS-429). Những hành vi này còn đúng ở bản hiện hành không? Cần PO xác nhận trước khi dùng làm kết quả mong đợi.",
  "kb_ids": [
    "KB-003",
    "KB-004",
    "KB-007",
    "KB-008",
    "KB-011",
    "KB-012",
    "KB-013",
    "KB-027",
    "KB-031",
    "KB-032",
    "KB-033",
    "KB-034",
    "KB-035",
    "KB-036",
    "KB-038",
    "KB-039",
    "KB-040",
    "KB-041"
  ],
  "related_feature_ids": [
    "home-onboarding",
    "portal-navigation",
    "content-translations",
    "dtc-access-banner",
    "internal-admin-panel"
  ],
  "related_questions": [
    "Bản đồ route đầy đủ của Portal (gồm route chi tiết của từng extension) là gì sau 2 đợt tái cấu trúc điều hướng (Jira DUOS-168, DUOS-228)?",
    "App Logo tuỳ chỉnh được cấu hình ở màn nào và logo hiển thị ở đâu?"
  ]
}
```

## OQ-portal-shell-005 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-portal-shell-005",
  "type": "OPEN_ISSUE",
  "feature_id": "portal-navigation",
  "summary": "Tài liệu sản phẩm Duos (bản tham chiếu và changelog \"Cập nhật gần đây\") mà phần Home, Dashboard và điều hướng viện dẫn không có trong bộ nguồn, nên các dòng về DUOS-199, DUOS-168/228, DUOS-79/387, DUOS-121, DUOS-144, DUOS-108/275 và Dashboard riêng chỉ có một câu tóm tắt; bản đồ route đầy đủ của Portal cũng chỉ có từ khảo sát staging. Không suy diễn nội dung các tài liệu này; cần bổ sung vào bộ nguồn lần sau.",
  "kb_ids": [
    "KB-007",
    "KB-008",
    "KB-011",
    "KB-013",
    "KB-012",
    "KB-027",
    "KB-014"
  ],
  "related_feature_ids": [
    "home-onboarding",
    "portal-navigation",
    "content-translations",
    "dtc-access-banner",
    "internal-admin-panel"
  ],
  "missing_area": "missing-linked-docs"
}
```

## OQ-portal-shell-006 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-portal-shell-006",
  "type": "OPEN_ISSUE",
  "feature_id": "portal-navigation",
  "summary": "Build/version của bản dựng staging không được ghi cho các quan sát ngày 08/10/2026 (Home, sidebar, B2B extensions hub, route map, Content & Translation, trang đăng nhập admin panel); toàn bộ khảo sát làm trên một store Shopify Plus ở Free plan với 8 extension Inactive, app embed chưa bật, không có dữ liệu. Các quan sát này chưa gắn được với bản dựng nào và chưa đối chiếu ở store đã subscribe hoặc store không phải Plus. Cần ghi build và khảo sát thêm bối cảnh khác.",
  "kb_ids": [
    "KB-001",
    "KB-002",
    "KB-005",
    "KB-006",
    "KB-009",
    "KB-010",
    "KB-015",
    "KB-016",
    "KB-017",
    "KB-018",
    "KB-019",
    "KB-020",
    "KB-021",
    "KB-022",
    "KB-023",
    "KB-024",
    "KB-025",
    "KB-026",
    "KB-028",
    "KB-029",
    "KB-030",
    "KB-037"
  ],
  "related_feature_ids": [
    "home-onboarding",
    "portal-navigation",
    "content-translations",
    "dtc-access-banner",
    "internal-admin-panel"
  ],
  "missing_area": "staging-build-and-context",
  "related_questions": [
    "Các quan sát sidebar / hub / route ngày 08/10/2026 gắn với build staging nào?"
  ]
}
```

## OQ-portal-shell-007 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-portal-shell-007",
  "type": "OPEN_ISSUE",
  "feature_id": "content-translations",
  "summary": "Trang \"Content & Translation\" chưa có business rule (Jira DUOS-58 không có mô tả) và khảo sát staging 08/10/2026 chưa mở nội dung từng tab: field nào dịch được, lưu thế nào, hành vi nút \"Add language\", và danh sách locale khi store có nhiều ngôn ngữ đều chưa được ghi. Cần business rule hoặc khảo sát bổ sung trước khi viết kết quả mong đợi cho trang này.",
  "kb_ids": [
    "KB-028",
    "KB-029",
    "KB-030"
  ],
  "missing_area": "content-translation-behavior",
  "related_questions": [
    "Mỗi tab của trang Content & Translation cho dịch những field nào, lưu thế nào (nút Save, tự lưu) và bản dịch hiển thị cho buyer ở đâu?"
  ]
}
```

## OQ-portal-shell-008 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-portal-shell-008",
  "type": "OPEN_ISSUE",
  "feature_id": "dtc-access-banner",
  "summary": "Customer Account chưa được quan sát trên staging (không có tài khoản buyer; store khảo sát có 8 extension Inactive), nên banner cho khách không phải B2B chỉ có nguồn Jira DUOS-340, chưa đối chiếu được trên giao diện thật. Cần tài khoản khách và extension Customer Account đang bật để khảo sát.",
  "kb_ids": [
    "KB-032",
    "KB-033",
    "KB-035"
  ],
  "missing_area": "customer-account-surface",
  "related_questions": [
    "Theo Jira DUOS-340 (comment 26/02/2026), khách không phải B2B mở trang extension B2B ở Customer Account thấy banner mặc định \"B2B account required.\" thay vì trang trắng. Đây có phải hành vi mong đợi đã chốt không, áp cho những trang extension nào (Company member, Quick Order, Shopping list, My Quotes, mục tài chính), và nội dung mặc định hiện hành có đúng như Jira không?",
    "Trên staging, banner có hiển thị đúng như Jira DUOS-340 không (cần tài khoản khách và extension Customer Account đang bật)?"
  ],
  "check_ids": [
    "dtc-access-banner:CHK-001"
  ]
}
```

## OQ-portal-shell-009 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-portal-shell-009",
  "type": "OPEN_ISSUE",
  "feature_id": "internal-admin-panel",
  "summary": "Bên trong admin panel nội bộ chưa được quan sát trên staging (khảo sát 08/10/2026 chỉ tới trang đăng nhập \"Sign in with Slack\"); các mục Shops, trang chi tiết shop với JSON editor `users.config`, Plans, Discounts, Extensions, company submissions, Activity log, Admin users / roles và JSON viewer sau Laravel 12 chỉ có nguồn Jira. Cần tài khoản Slack được cấp quyền để khảo sát.",
  "kb_ids": [
    "KB-036",
    "KB-038",
    "KB-039",
    "KB-040",
    "KB-041"
  ],
  "missing_area": "admin-panel-inside",
  "related_questions": [
    "Trong admin panel nội bộ, Admin users và roles được quản lý bằng Shield (Jira DUOS-399, DUOS-429): những role nào tồn tại, và role nào được xem shop, sửa `users.config`, quản lý Plans / Discounts / Extensions, quản lý Admin users?",
    "Danh sách Shops của admin panel nội bộ có những bộ lọc, khoảng ngày và sắp xếp nào, và trang chi tiết shop gồm những mục gì ngoài JSON editor `users.config` và \"Token and scopes\"?",
    "Sửa `users.config` trong JSON editor của admin panel nội bộ có hiệu lực ngay với merchant không (hay cần cài lại app / xoá cache), và thay đổi có được ghi vào Activity log không?",
    "JSON editor `users.config` trong admin panel nội bộ xử lý thế nào khi nhập JSON không hợp lệ hoặc key / kiểu giá trị không được hỗ trợ (chặn khi lưu, lưu nguyên, hay bỏ qua)?",
    "Admin panel nội bộ có đúng các mục Plans, Discounts, Extensions, company submissions và Activity log như Jira DUOS-399, DUOS-429 mô tả không, và mỗi mục cho xem / sửa những gì?",
    "Nâng cấp Laravel 12 (Jira DUOS-429) đã lên staging chưa, và JSON viewer ở \"Form setting\" và \"Shop\" của admin panel nội bộ hiện phải hiển thị dạng phẳng pretty-printed hay dạng tree?",
    "Bên trong admin panel (Shops, chi tiết shop, Plans, Discounts, Extensions, company submissions, Activity log, Admin users / roles) có đúng như Jira DUOS-399, DUOS-429 mô tả trên staging không?",
    "Tài khoản Slack nào được đăng nhập admin panel, và role (Shield) nào được xem shop, sửa `users.config`, quản lý Plans / Discounts / Extensions / admin users?",
    "JSON editor `users.config` xử lý thế nào khi nhập JSON không hợp lệ hoặc key không được hỗ trợ, và thay đổi có hiệu lực ngay với merchant không?",
    "Danh sách Shops có lọc, khoảng ngày và sắp xếp nào, và trang chi tiết shop gồm những mục gì ngoài JSON editor và Token and scopes?",
    "Nâng cấp Laravel 12 (Jira DUOS-429) đã lên staging chưa, để biết JSON viewer hiện là dạng phẳng hay dạng tree?"
  ],
  "check_ids": [
    "internal-admin-panel:CHK-003",
    "internal-admin-panel:CHK-004",
    "internal-admin-panel:CHK-005",
    "internal-admin-panel:CHK-006",
    "internal-admin-panel:CHK-007",
    "internal-admin-panel:CHK-008"
  ]
}
```

## OQ-portal-shell-010 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-portal-shell-010",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": null,
  "summary": "Trên staging Duos, Portal nhúng (embedded portal) dùng host nào: staging-embedded.getduos.io (ghi chép môi trường QA theo actual result TC-DUOS-219 ngày 30/09/2026) hay staging-portal.getduos.io (bundle Portal trong iframe thấy qua console ngày 30/09/2026 và khi khảo sát 08/10/2026)? Hay cả hai cùng được dùng cho các vai trò khác nhau (trang nhúng và nơi tải bundle)? Dev cần xác nhận để QA mở đúng Portal và đối chiếu network.",
  "kb_ids": [
    "KB-P-043",
    "KB-P-044"
  ],
  "scope_note": "Câu hỏi mức product (dùng chung nhiều object), đặt ở object này để theo dõi."
}
```

## OQ-portal-shell-011 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-portal-shell-011",
  "type": "OPEN_ISSUE",
  "feature_id": null,
  "summary": "Jira DUOS-323 (alias email dùng cho nhiều company, thuộc Epic Research DUOS-321) đã Done nhưng QA ghi chưa đọc nội dung; bộ nguồn không mô tả hành vi này đang áp ở đâu (đăng ký, member, matching customer). Cần đọc ticket và bổ sung vào feature sở hữu.",
  "kb_ids": [
    "KB-P-035"
  ],
  "scope_note": "Câu hỏi mức product (dùng chung nhiều object), đặt ở object này để theo dõi."
}
```

## OQ-portal-shell-012 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-portal-shell-012",
  "type": "OPEN_ISSUE",
  "feature_id": null,
  "summary": "Không tài liệu nào ghi build/version (hash, Fix Version) của staging tại các lần quan sát host và cấu trúc surface (30/09/2026, 01/10/2026, 08/10/2026); chỉ có ngày. Cần bổ sung build/version để biết các quan sát tầng sản phẩm còn đúng ở bản hiện tại.",
  "kb_ids": [
    "KB-P-003",
    "KB-P-031",
    "KB-P-041",
    "KB-P-042",
    "KB-P-043",
    "KB-P-044"
  ],
  "scope_note": "Câu hỏi mức product (dùng chung nhiều object), đặt ở object này để theo dõi."
}
```

## OQ-portal-shell-013 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-portal-shell-013",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "home-onboarding",
  "summary": "Mỗi bước của Setup guide ở Home được tính completed theo điều kiện nào (đã tạo registration form, đã bật theme app extension, đã thêm extension vào Customer Account), bộ đếm có tự cập nhật không, và việc app tự phát hiện extension đã thêm vào Customer Account (Jira DUOS-199) hiển thị kết quả ở đâu?",
  "kb_ids": [
    "KB-012"
  ],
  "check_ids": [
    "home-onboarding:CHK-005"
  ],
  "related_questions": [
    "Mỗi bước Setup guide được tính completed theo điều kiện nào (vd form đã tạo, theme app extension đã bật, extension đã thêm vào Customer Account) và bộ đếm có tự cập nhật không?"
  ]
}
```

## OQ-portal-shell-014 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-portal-shell-014",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "home-onboarding",
  "summary": "Đổi select \"Language:\" của Portal sang 日本語 thì phần nào của Portal đổi ngôn ngữ (toàn bộ giao diện hay một phần), và lựa chọn có được lưu cho lần mở sau không?",
  "kb_ids": [
    "KB-011"
  ],
  "check_ids": [
    "home-onboarding:CHK-011"
  ],
  "related_questions": [
    "Đổi select \"Language:\" sang 日本語 thì những phần nào của Portal đổi ngôn ngữ, và lựa chọn có được lưu cho lần mở sau không?"
  ]
}
```

## OQ-portal-shell-015 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-portal-shell-015",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "portal-navigation",
  "summary": "Tab \"Active\" của B2B extensions hub đếm extension theo điều kiện nào (đã subscribe, đã bật, hay đã thêm vào Customer Account), và mỗi row hiển thị trạng thái của extension bằng gì?",
  "check_ids": [
    "portal-navigation:CHK-005"
  ],
  "related_questions": [
    "Khi có extension đang hoạt động, tab \"Active\" của B2B extensions hub đếm theo điều kiện nào (đã subscribe, đã bật, hay đã thêm vào Customer Account)?",
    "Mỗi row của B2B extensions hub hiển thị trạng thái của extension (Active / Inactive, đã subscribe hay chưa) bằng gì và có nút bật / tắt không?"
  ]
}
```

## OQ-portal-shell-016 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-portal-shell-016",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "portal-navigation",
  "summary": "Khi mở trực tiếp route chi tiết của Portal với id company / location không tồn tại (vd `/extensions/credit-limit/<companyId>`) hoặc một route không có, Portal phải hiển thị gì (trang lỗi, thông báo, chuyển về màn danh sách)?",
  "check_ids": [
    "portal-navigation:CHK-009"
  ],
  "related_questions": [
    "Mở trực tiếp route con với id company / location không tồn tại (vd `/extensions/credit-limit/<companyId>`) thì Portal hiển thị gì?"
  ]
}
```

## OQ-portal-shell-017 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-portal-shell-017",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "content-translations",
  "summary": "Nút \"Add language\" trên trang Content & Translation làm gì (thêm locale từ ngôn ngữ đã publish của store Shopify hay tạo mới), và câu \"Translations có EN + JP\" nghĩa là chỉ dịch được nội dung sang EN và JP hay chỉ là ngôn ngữ giao diện Portal?",
  "kb_ids": [
    "KB-031"
  ],
  "check_ids": [
    "content-translations:CHK-004"
  ],
  "related_questions": [
    "Bấm \"Add language\" làm gì (thêm locale từ ngôn ngữ đã publish của store Shopify hay tạo mới), và vì sao store chỉ có English hiển thị \"No locale found\"?",
    "\"Translations có EN + JP\" nghĩa là giao diện Portal có 2 ngôn ngữ hay nội dung cho buyer chỉ dịch được sang EN và JP?"
  ]
}
```

## OQ-portal-shell-018 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-portal-shell-018",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "content-translations",
  "summary": "Mỗi tab của trang Content & Translation cho dịch những field nào và lưu thế nào (nút Save hay tự lưu)? Bản dịch có được giữ theo từng locale sau khi tải lại không?",
  "check_ids": [
    "content-translations:CHK-005"
  ]
}
```

## OQ-portal-shell-019 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-portal-shell-019",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "content-translations",
  "summary": "Bản dịch lưu ở trang Content & Translation hiển thị cho buyer ở surface nào (storefront, Customer Account, PDF báo giá), và chọn locale theo ngôn ngữ storefront / Customer Account của buyer hay theo thiết lập khác?",
  "check_ids": [
    "content-translations:CHK-006"
  ]
}
```

## OQ-portal-shell-020 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-portal-shell-020",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "internal-admin-panel",
  "summary": "Tài khoản Slack nào được đăng nhập admin panel nội bộ (toàn workspace Slack hay chỉ tài khoản được cấp), và truy cập route bên trong khi chưa đăng nhập hoặc bằng tài khoản Slack chưa được cấp quyền thì kết quả là gì?",
  "check_ids": [
    "internal-admin-panel:CHK-002"
  ]
}
```

## OQ-portal-shell-021 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-portal-shell-021",
  "type": "OPEN_ISSUE",
  "feature_id": null,
  "summary": "Bộ tài liệu nguồn (QA business rule, QA KB Duos, inventory staging) không có đặc tả API / data model cho các feature: home-onboarding, portal-navigation, content-translations, dtc-access-banner, internal-admin-panel. Cần Dev cung cấp endpoint, payload và dữ liệu lưu trữ liên quan nếu QA cần kiểm ở tầng API/DB.",
  "related_feature_ids": [
    "home-onboarding",
    "portal-navigation",
    "content-translations",
    "dtc-access-banner",
    "internal-admin-panel"
  ]
}
```
