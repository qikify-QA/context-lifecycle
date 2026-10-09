# Open Questions — Company member — trang quản lý member của company location trong Customer Account: quyền xem / view-only, mời / sửa / xoá member, tìm / sắp xếp / lọc theo role

Tổng: 19 mục. Sinh từ lần bootstrap đầu tiên (DOC_BOOTSTRAP) của Duos B2B, ngày 2026-10-09.

- CONFLICT: 0
- NEEDS_CONFIRMATION: 16
- OPEN_ISSUE: 3

## OQ-company-member-001 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-company-member-001",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": null,
  "summary": "Trang Company member (Customer Account): tài liệu mô tả quyền theo permission `read_members` / `write_members` và theo \"buyer Admin\", nhưng không có ma trận role → permission, và nhiều phát biểu không ghi role. Role mặc định nào (Admin, member, custom role) mang `read_members` / `write_members`; ai được invite, sửa, xoá và đổi role member; có role nào ngoài Admin có `write_members` không? Cần PO/Dev xác nhận ma trận.",
  "kb_ids": [
    "KB-001",
    "KB-002",
    "KB-006",
    "KB-007",
    "KB-008",
    "KB-010",
    "KB-013",
    "KB-020",
    "KB-021",
    "KB-022",
    "KB-023",
    "KB-024",
    "KB-026",
    "KB-027",
    "KB-034"
  ],
  "check_ids": [
    "member-search-sort-filter:CHK-006",
    "member-list-view-access:CHK-013",
    "member-invite-and-edit:CHK-011"
  ],
  "related_questions": [
    "Role filter của bảng member lọc theo role Duos hay role Shopify (Location admin / Ordering only), và cột Permissions của bảng hiển thị loại role nào? (GAP-02 task Testlane DUOS-003, cần PO xác nhận)",
    "Role filter của bảng member lọc theo role Duos hay role Shopify (Location admin / Ordering only), và cột Permissions của bảng hiển thị loại role nào?",
    "Member ở chế độ view-only có thấy và dùng được role filter không?",
    "Role mặc định nào (Admin, member thường, custom role) mang permission `read_members` / `write_members`, và có role nào ngoài Admin xem được bảng member khi cờ view-only tắt không?",
    "Ngoài buyer Admin, role nào (member mặc định, custom role) có `write_members` để invite, sửa, xoá và đổi role member ở trang Company member, và custom role có `write_members` có làm được cả 4 thao tác không?",
    "Ngoài buyer Admin, role nào (member mặc định, custom role) có write_members để invite, sửa, xoá và đổi role member?"
  ]
}
```

## OQ-company-member-002 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-company-member-002",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "member-list-view-access",
  "summary": "Cờ cho mọi member xem Company member ở chế độ view-only: backend dùng key `customer-permission.allow_all_members_read_members` (TC-DUOS-077 pass trên staging với key này), còn spec của Dev FE ghi `customerPermissionSettings.allowAllMembersReadMembers` (GAP-01 task Testlane DUOS-003). Frontend đọc key nào để ẩn nút Invite / edit / delete, và tên key chính thức là gì? Ngoài ra, khi key vắng mặt trong users.config thì cờ có mặc định là tắt không, và giá trị nào được coi là tắt?",
  "kb_ids": [
    "KB-003",
    "KB-004",
    "KB-005",
    "KB-011",
    "KB-012"
  ],
  "related_questions": [
    "Khi key `customer-permission.allow_all_members_read_members` vắng mặt trong users.config thì cờ view-only có mặc định tắt không, và những giá trị nào (false, \"0\", \"off\", \"no\", chuỗi rỗng…) được coi là tắt?",
    "Frontend của trang Company member đọc cờ view-only theo key backend `customer-permission.allow_all_members_read_members` hay key `customerPermissionSettings.allowAllMembersReadMembers` trong spec của Dev FE để ẩn Invite / edit / delete, và tên key chính thức là gì?",
    "Frontend đọc cờ view-only theo key backend `customer-permission.allow_all_members_read_members` hay key `customerPermissionSettings.allowAllMembersReadMembers` trong spec Dev FE, và tên key chính thức là gì?",
    "Khi key view-only vắng mặt trong users.config thì cờ có mặc định tắt không, và những giá trị nào được coi là tắt?"
  ],
  "check_ids": [
    "member-list-view-access:CHK-010",
    "member-list-view-access:CHK-011"
  ]
}
```

## OQ-company-member-003 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-company-member-003",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "member-list-view-access",
  "summary": "Khi shop bật cờ view-only cho mọi member, endpoint lấy danh sách role có chặn member không có `read_members` không, và member ở chế độ view-only có còn thấy role filter trên bảng member không? (GAP-03 task Testlane DUOS-003)",
  "kb_ids": [
    "KB-006",
    "KB-007",
    "KB-034"
  ],
  "related_questions": [
    "Khi shop bật cờ view-only, endpoint lấy danh sách role có chặn member không có `read_members` không, và member ở chế độ view-only có còn thấy role filter trên bảng member không?"
  ],
  "check_ids": [
    "member-list-view-access:CHK-012"
  ]
}
```

## OQ-company-member-004 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-company-member-004",
  "type": "OPEN_ISSUE",
  "feature_id": "member-list-view-access",
  "summary": "Trang Company member trong Customer Account chưa được quan sát trên staging: khảo sát 08/10/2026 không có tài khoản buyer, store staging Plus (Free plan) có extension \"Users & permissions\" Inactive và block Company member chưa activate. Mọi tên UI và hành vi của trang hiện chỉ dựa trên Jira, quyết định Dev và test case; theo tài liệu, các sub-task FE Jira DUOS-414…418 còn To Do và phần lớn test case chưa chạy. Cần store bật block Company member cùng tài khoản buyer (Admin, member thường, custom role) để quan sát và chạy lại.",
  "kb_ids": [
    "KB-001",
    "KB-006",
    "KB-007",
    "KB-008",
    "KB-013",
    "KB-014",
    "KB-015",
    "KB-018",
    "KB-020",
    "KB-021",
    "KB-022",
    "KB-023",
    "KB-026",
    "KB-029",
    "KB-030"
  ],
  "related_questions": [
    "Trang Company member trong Customer Account hiển thị chính xác những gì cho buyer Admin (cột nào, member nào của location hiện tại, có member chưa nhận lời mời không)? Mô tả hiện có chỉ là tóm tắt QA từ Jira DUOS-412, trang chưa được quan sát trên staging.",
    "Link role của buyer Admin trên bảng member khi cờ view-only bật có phải hành vi mong đợi không (hiện chỉ có kết quả TC-DUOS-079, chưa PO/Dev xác nhận)?",
    "Trang Company member hiển thị và hoạt động thế nào trên staging khi block được activate và có tài khoản buyer (Admin, member thường, custom role)?"
  ],
  "check_ids": [
    "member-list-view-access:CHK-001"
  ]
}
```

## OQ-company-member-005 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-company-member-005",
  "type": "OPEN_ISSUE",
  "feature_id": "member-list-view-access",
  "summary": "Bộ tài liệu thiếu nội dung cho các mảng sau của Company member: tài liệu sản phẩm Duos phần Company member (được nêu là nguồn phân tích nhưng không có trong bộ), RISK-01 (3 giả định Shopify API chưa verify, member thuộc > 5 location), ảnh design Jira DUOS-415 / DUOS-417 (không đọc được), yêu cầu mobile responsiveness Jira DUOS-418 (ticket trống), Jira DUOS-323 / DUOS-359 (chưa đọc), tác động của giới hạn \"Customer Account extension API không lấy được current company location\", và route đầy đủ của PUT update member, DELETE member, thao tác invite. Cần bổ sung nguồn trước khi viết kết quả mong đợi cho các mảng này.",
  "kb_ids": [
    "KB-010",
    "KB-015",
    "KB-017",
    "KB-019",
    "KB-021",
    "KB-028"
  ],
  "related_questions": [
    "Giới hạn nền tảng \"Customer Account extension API không lấy được current company location\" ảnh hưởng thế nào tới trang Company member: khi buyer thuộc nhiều location, trang xác định location hiện tại bằng cách nào và danh sách có đổi theo location đang chọn sau khi tải lại không?",
    "Giới hạn \"Customer Account extension API không lấy được current company location\" ảnh hưởng thế nào tới trang Company member (location nào được hiển thị khi buyer thuộc nhiều location)?",
    "Yêu cầu mobile responsiveness của bảng member (Jira DUOS-418, ticket trống), ảnh design Jira DUOS-415/417, RISK-01 (giả định Shopify API, member thuộc > 5 location), tài liệu sản phẩm Duos phần Company member và Jira DUOS-323 (alias email nhiều company) có nội dung gì ảnh hưởng tới bảng member?",
    "Route đầy đủ của PUT update member, DELETE member và thao tác invite là gì?"
  ],
  "check_ids": [
    "member-list-view-access:CHK-017"
  ]
}
```

## OQ-company-member-006 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-company-member-006",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "member-invite-and-edit",
  "summary": "Các hành vi Company member sau chỉ có nguồn ticket Jira hoặc bản phân tích QA, chưa có PO/Dev hay test case xác nhận: (1) chặn 14 prefix email generic khi invite (Jira DUOS-410, rule đang draft — khớp chính xác hay \"bắt đầu bằng\", có áp cho form edit / admin extension / theo config merchant không); (2) invite yêu cầu đủ field + job title (Jira DUOS-335/343 — field nào, áp cho mọi shop không); (3) chỉnh UI bảng member (Jira DUOS-416/417, ticket To Do — bỏ tooltip, bỏ cột Phone, API vẫn trả `default_phone_number`); (4) list member lấy dữ liệu từ `Company.contacts` cho mọi request. PO/Dev xác nhận đây là hành vi mong đợi và đã deploy chưa?",
  "kb_ids": [
    "KB-014",
    "KB-015",
    "KB-016",
    "KB-017",
    "KB-023",
    "KB-024"
  ],
  "related_questions": [
    "Chặn 14 prefix email generic khi invite member (Jira DUOS-410) có phải hành vi đã deploy và được PO/Dev xác nhận không; khớp chính xác local-part hay \"bắt đầu bằng\" prefix; có áp cho form edit, admin extension hay theo config merchant không?",
    "Chặn email generic khi invite khớp chính xác local-part hay \"bắt đầu bằng\" prefix (vd `infox@`), có áp cho form edit, admin extension hay theo config merchant không, và PO/Dev có xác nhận đây là hành vi đã deploy?",
    "Những field nào bắt buộc khi invite member (Jira DUOS-335/343), job title có bắt buộc không, và yêu cầu áp cho mọi shop hay chỉ shop yêu cầu?",
    "Các chỉnh UI bảng member theo Jira DUOS-416/417 (bỏ tooltip và dùng cursor default ở cột Email / Role, bottom border từng dòng, tên customer màu đen, bỏ cột Phone) đã được PO/Dev xác nhận là hành vi mong đợi và đã deploy chưa?",
    "Bảng member hiện tại trên Customer Account đã áp các thay đổi UI của Jira DUOS-416/417 (bỏ tooltip, bottom border, tên màu đen, bỏ cột Phone) chưa, và PO/Dev có xác nhận đây là hành vi mong đợi?"
  ],
  "check_ids": [
    "member-invite-and-edit:CHK-008",
    "member-list-view-access:CHK-016"
  ]
}
```

## OQ-company-member-007 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-company-member-007",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "member-invite-and-edit",
  "summary": "Sub-task Jira DUOS-432 \"Invite new member with required phone\" đang To Do: phone có bắt buộc khi invite member không, áp ở form nào (invite / edit, Customer Account / admin extension), định dạng và thông báo lỗi là gì?",
  "kb_ids": [
    "KB-025",
    "KB-024"
  ],
  "related_questions": [
    "Khi invite member, những field nào bắt buộc (Jira DUOS-335/343), job title có bắt buộc không, phone có bắt buộc không (Jira DUOS-432) cùng định dạng và thông báo lỗi; yêu cầu áp cho mọi shop hay chỉ shop yêu cầu, và cho form edit / admin extension không?",
    "Phone có bắt buộc khi invite member không (Jira DUOS-432), áp ở form nào (invite / edit, Customer Account / admin extension), định dạng và thông báo lỗi là gì?"
  ],
  "check_ids": [
    "member-invite-and-edit:CHK-009"
  ]
}
```

## OQ-company-member-008 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-company-member-008",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "member-invite-and-edit",
  "summary": "Khi invite member bằng email đã tồn tại trên Shopify nhưng chưa thuộc location hiện tại (ở location khác, company khác hoặc là khách DTC), hệ thống có ghi đè record customer như trước không (GAP-06, rủi ro SEC-06 task Testlane DUOS-003)? Và kiểm tra trùng email trong location có chuẩn hoá hoa/thường và trim khoảng trắng không (GAP-11)?",
  "kb_ids": [
    "KB-021",
    "KB-022"
  ],
  "related_questions": [
    "Khi invite member bằng email đã tồn tại trên Shopify nhưng chưa thuộc location hiện tại (ở location khác, company khác hoặc là khách DTC), hệ thống có ghi đè record customer không, và kết quả mong đợi cho từng trường hợp là gì?",
    "Invite email đã tồn tại trên Shopify nhưng chưa thuộc location hiện tại (location khác, company khác, khách DTC) thì hệ thống xử lý thế nào — có ghi đè record customer không?",
    "Kiểm tra trùng email trong location có chuẩn hoá hoa/thường và trim khoảng trắng trước khi so không?",
    "Kiểm tra trùng email khi invite / sửa member trong location có chuẩn hoá hoa/thường và trim khoảng trắng trước khi so không — biến thể viết hoa hoặc có khoảng trắng của email đã có trong location có bị chặn 422 không?"
  ],
  "check_ids": [
    "member-invite-and-edit:CHK-010",
    "member-invite-and-edit:CHK-007"
  ]
}
```

## OQ-company-member-009 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-company-member-009",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "member-search-sort-filter",
  "summary": "Dev BE (15/09/2026) mô tả hiện trạng search member chỉ khớp đầu chuỗi (gõ \"Curr\" ra \"Currier\", gõ \"urrier\" không ra), nhưng PO/client chưa chấp nhận đây là hành vi đúng (GAP-05 task Testlane DUOS-003; Known issues Duos để status open — chờ PO/client chấp nhận). PO/client có chấp nhận prefix match là hành vi đúng không, hay search member phải khớp cả chuỗi con?",
  "kb_ids": [
    "KB-030",
    "KB-031"
  ],
  "related_questions": [
    "Theo Dev BE (15/09/2026), hiện trạng search member chỉ khớp đầu chuỗi (gõ \"Curr\" ra \"Currier\", gõ \"urrier\" không ra). PO/client có chấp nhận prefix match là hành vi đúng không, hay search member phải khớp cả chuỗi con trong tên / email?",
    "PO/client có chấp nhận search member chỉ khớp đầu chuỗi (prefix match) là hành vi đúng không, hay search phải khớp cả chuỗi con trong tên / email?"
  ],
  "check_ids": [
    "member-search-sort-filter:CHK-002"
  ]
}
```

## OQ-company-member-010 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-company-member-010",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "member-search-sort-filter",
  "summary": "Với API list member: admin extension đang gửi `first` > 50 thì backend trả gì (GAP-07)? `sort_by` hoặc `first` không hợp lệ thì trả 422 hay bị bỏ qua (GAP-13)? Và trên trang Company member, empty state khi search không có kết quả trông thế nào, có nút clear search không (GAP-12)?",
  "kb_ids": [
    "KB-016",
    "KB-027",
    "KB-028"
  ],
  "related_questions": [
    "Trên trang Company member, empty state khi search không có kết quả trông thế nào (nội dung thông báo) và có nút clear search không?",
    "Admin extension đang gửi `first` > 50 thì backend trả gì (lỗi, cắt về 50)? (GAP-07 task Testlane DUOS-003)",
    "`sort_by` hoặc `first` không hợp lệ thì API trả 422 hay bỏ qua param? (GAP-13 task Testlane DUOS-003)",
    "Empty state khi search không có kết quả trông thế nào, có nút clear search không? (GAP-12 task Testlane DUOS-003)",
    "API list member xử lý thế nào khi `first` / `last` > 50 hoặc không hợp lệ, và khi `sort_by` / `sort_order` ngoài giá trị cho phép: trả 422 hay bỏ qua param (hoặc cắt về 50)?"
  ],
  "check_ids": [
    "member-search-sort-filter:CHK-013",
    "member-search-sort-filter:CHK-008"
  ]
}
```

## OQ-company-member-011 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-company-member-011",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "member-list-view-access",
  "summary": "API list member có lấy dữ liệu từ `Company.contacts` cho mọi request (kể cả không có param) không, danh sách mặc định ở Customer Account và admin extension thay đổi thế nào so với trước, và API có tiếp tục trả `default_phone_number` sau khi bảng Customer Account bỏ cột Phone không?",
  "kb_ids": [
    "KB-016",
    "KB-017"
  ],
  "check_ids": [
    "member-list-view-access:CHK-015"
  ],
  "related_questions": [
    "List member có thực sự lấy từ `Company.contacts` cho mọi request (kể cả không param) không, và danh sách mặc định ở Customer Account / admin extension thay đổi thế nào so với trước?"
  ]
}
```

## OQ-company-member-012 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-company-member-012",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "member-list-view-access",
  "summary": "API list member trả mã gì (401 / 403 / 404) khi gọi không có session Customer Account hoặc bằng buyer của company khác với id location không thuộc buyer đó, và có đảm bảo không bao giờ trả member của location ngoài phạm vi buyer không?",
  "check_ids": [
    "member-list-view-access:CHK-018"
  ]
}
```

## OQ-company-member-013 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-company-member-013",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "member-invite-and-edit",
  "summary": "Sau khi buyer Admin invite thành công, member mới xuất hiện ở trạng thái nào trong bảng, nhận role gì (merchant có default role riêng theo Jira DUOS-374 không), contact / role assignment trên Shopify được tạo thế nào và email mời được gửi khi nào?",
  "kb_ids": [
    "KB-020"
  ],
  "check_ids": [
    "member-invite-and-edit:CHK-001",
    "member-invite-and-edit:CHK-003"
  ],
  "related_questions": [
    "Xoá member ở Customer Account gỡ những gì (role assignment tại location, contact khỏi company, hay xoá cả customer trên Shopify), có hộp xác nhận không và hoàn tác được không?",
    "Sau khi invite thành công, member mới ở trạng thái nào, nhận role mặc định gì (merchant có default role riêng theo Jira DUOS-374 không) và email mời được gửi khi nào?"
  ]
}
```

## OQ-company-member-014 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-company-member-014",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "member-invite-and-edit",
  "summary": "Khi buyer Admin sửa thông tin và đổi role member ở Customer Account, những field nào sửa được và thay đổi được đồng bộ sang contact / role Shopify thế nào? (Đường đồng bộ role dùng chung do object Roles & permissions sở hữu.)",
  "kb_ids": [
    "KB-020"
  ],
  "check_ids": [
    "member-invite-and-edit:CHK-002"
  ],
  "related_questions": [
    "Xoá member hoặc đổi role ở Customer Account có được chặn khi đó là Admin cuối cùng của location không?"
  ]
}
```

## OQ-company-member-015 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-company-member-015",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "member-invite-and-edit",
  "summary": "Ở trang Company member, xoá hoặc đổi role của Admin cuối cùng trong location có bị chặn không, và thông báo là gì? (Quy tắc \"mỗi location ≥ 1 Admin\" thuộc nhóm câu hỏi do object Roles & permissions sở hữu.)",
  "check_ids": [
    "member-invite-and-edit:CHK-012"
  ]
}
```

## OQ-company-member-016 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-company-member-016",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "member-search-sort-filter",
  "summary": "Khi location có hơn 500 member, lọc theo role ở trang Company member hiển thị gì cho người dùng (thiếu kết quả, trang rỗng giữa chừng), và có thông báo nào về giới hạn không?",
  "kb_ids": [
    "KB-033"
  ],
  "check_ids": [
    "member-search-sort-filter:CHK-012"
  ],
  "related_questions": [
    "Khi location có hơn 500 member, lọc theo role trả gì cho người dùng (thiếu kết quả, trang rỗng giữa chừng) và có thông báo nào không?"
  ]
}
```

## OQ-company-member-017 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-company-member-017",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "member-search-sort-filter",
  "summary": "Admin UI extension đang gửi `first` > 50 khi lấy member list thì backend trả gì (lỗi, hay cắt về 50), và admin extension có còn hiển thị đủ member của location có hơn 50 member không?",
  "check_ids": [
    "member-search-sort-filter:CHK-014"
  ]
}
```

## OQ-company-member-018 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-company-member-018",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": null,
  "summary": "PO/Dev xác nhận hay sửa các hiện trạng sau (ghi nhận trên staging, khảo sát 30/09–08/10/2026), hiện đang được checklist dùng làm kỳ vọng tạm thời nhưng chưa có ai xác nhận là hành vi đúng: view only flag admin role link tc: Theo QA KB Duos \"Company member\" v1, TC-DUOS-079 được ghi passed (không có ngày chạy riêng; nằm trong đợt test 18/09–30/09/2026): khi shop b.",
  "kb_ids": [
    "KB-009"
  ],
  "check_ids": [
    "member-list-view-access:CHK-008"
  ]
}
```

## OQ-company-member-019 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-company-member-019",
  "type": "OPEN_ISSUE",
  "feature_id": null,
  "summary": "Bộ tài liệu nguồn (QA business rule, QA KB Duos, inventory staging) không có đặc tả API / data model cho các feature: member-invite-and-edit. Cần Dev cung cấp endpoint, payload và dữ liệu lưu trữ liên quan nếu QA cần kiểm ở tầng API/DB.",
  "related_feature_ids": [
    "member-invite-and-edit"
  ]
}
```
