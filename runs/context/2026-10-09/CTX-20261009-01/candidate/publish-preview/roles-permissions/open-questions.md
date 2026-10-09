# Open Questions — User & Permission — role Duos mặc định/custom, ánh xạ contact role Shopify (Location admin / Ordering only), gán/đổi role và đồng bộ member-sync, Shopify Flow action 'assign role', bulk assign admin, tuỳ biến role theo merchant (users.config), chặn checkout theo permission

Tổng: 29 mục. Sinh từ lần bootstrap đầu tiên (DOC_BOOTSTRAP) của Duos B2B, ngày 2026-10-09.

- CONFLICT: 1
- NEEDS_CONFIRMATION: 16
- OPEN_ISSUE: 12

## OQ-roles-permissions-001 — CONFLICT

```json
{
  "oq_id": "OQ-roles-permissions-001",
  "type": "CONFLICT",
  "feature_id": "default-and-custom-roles",
  "summary": "Role mặc định Junior Buyer có được tạo order từ CSV và từ SKU (Bulk SKU) hay chỉ được tạo shopping list từ CSV/SKU? Tài liệu sản phẩm và staging nói khác nhau; cần PO/Dev chốt bộ quyền mặc định của Junior Buyer trước khi dùng làm kết quả mong đợi.",
  "kb_ids": [
    "KB-011",
    "KB-012"
  ],
  "side_a": "Theo tài liệu sản phẩm Duos (docs 09/07/2026), như QA KB Duos \"Roles & permissions\" v1 tóm tắt, Junior Buyer được tạo shopping list và tạo order từ CSV và Bulk SKU.",
  "side_b": "Trên staging (khảo sát 08/10/2026, store staging Plus (Free plan)), modal quyền của role mặc định Junior buyer chỉ có \"Create shopping list from CSV\" và \"Create shopping list from SKU\", không có \"Create order from CSV\" và \"Create order from SKU\" (Admin và Senior buyer có cả hai).",
  "conflict_group": "CONF-DUOS-roles-permissions-01",
  "related_questions": [
    "Role mặc định Junior Buyer có được tạo order từ CSV và từ SKU (Bulk SKU) hay chỉ được tạo shopping list từ CSV/SKU? Tài liệu sản phẩm (docs 09/07/2026) ghi Junior được tạo shopping list và order từ CSV & Bulk SKU, còn staging 08/10/2026 chỉ tick \"Create shopping list from CSV\" / \"Create shopping list from SKU\" cho Junior buyer."
  ],
  "check_ids": [
    "default-and-custom-roles:CHK-008"
  ]
}
```

## OQ-roles-permissions-002 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-roles-permissions-002",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "default-and-custom-roles",
  "summary": "Trên staging 08/10/2026, role mặc định Junior buyer có \"Create and edit quotations\" nhưng không có \"View quotations\". Junior Buyer tạo/sửa được quotation mà không xem được quotation có đúng thiết kế không, hay bộ quyền Quotes của Junior cần sửa? Cần PO/Dev xác nhận.",
  "kb_ids": [
    "KB-007",
    "KB-008",
    "KB-013"
  ],
  "related_questions": [
    "Junior Buyer có \"Create and edit quotations\" nhưng không có \"View quotations\" trên staging — đây là thiết kế đúng hay bộ quyền Quotes của Junior cần sửa?",
    "Hai nhóm permission mới thấy trên staging 08/10/2026 là \"Finance & credit\" (View finance account, Make payments, View credit limit, View order history, View ledger) và \"Quotes\" (View quotations, Create and edit quotations, Create order from quotation) chưa có rule nghiệp vụ. Mỗi permission này cho phép/chặn hành vi cụ thể nào của buyer ở Customer Account? Cần PO/Dev xác nhận.",
    "Mỗi permission của nhóm \"Finance & credit\" (View finance account, Make payments, View credit limit, View order history, View ledger) và nhóm \"Quotes\" (View quotations, Create and edit quotations, Create order from quotation) cho phép / chặn hành vi cụ thể nào của buyer ở Customer Account?",
    "Từng permission trong nhóm \"Finance & credit\" (View finance account, Make payments, View credit limit, View order history, View ledger) và nhóm \"Quotes\" cho phép/chặn hành vi cụ thể nào của buyer ở Customer Account?"
  ],
  "check_ids": [
    "default-and-custom-roles:CHK-010"
  ]
}
```

## OQ-roles-permissions-003 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-roles-permissions-003",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "default-and-custom-roles",
  "summary": "Các label UI của module User & Permission lấy theo staging 08/10/2026 và mới được QA lead xác nhận lưu, chưa có PO/Dev xác nhận: tên 10 nhóm permission (\"CSV upload\", \"Quick order\", \"Finance & credit\", \"Quotes\"…), tab/cột của trang Roles & permissions, banner role mặc định, modal \"Create custom role\" (2 bước, ô \"Description\", label \"Select based role\" khác label ghi trong ticket Jira DUOS-372), tiêu đề \"Users & permission\" và khối \"Apply admin role to:\" / \"Run bulk assign\" (không có tiêu đề \"Bulk assign admin role\" như ticket). Các label này có phải là bản đúng hiện hành để dùng làm kết quả mong đợi không?",
  "kb_ids": [
    "KB-007",
    "KB-016",
    "KB-018",
    "KB-052"
  ],
  "related_questions": [
    "Các label UI của module theo staging 08/10/2026 (tên 10 nhóm permission, tab/cột trang Roles & permissions, banner role mặc định, modal Create custom role 2 bước với ô Description và label \"Select based role\") có phải bản đúng hiện hành để làm kết quả mong đợi không?"
  ]
}
```

## OQ-roles-permissions-004 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-roles-permissions-004",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "default-and-custom-roles",
  "summary": "Hai rule của object này đang ở trạng thái draft với mức tin \"chỉ theo ticket\" (Jira status PASS 18/08/2026, chưa có PO/Dev hoặc test case xác nhận): (1) Jira DUOS-406 — Main Contact không còn là role, hiển thị badge \"Main Contact\", bỏ khỏi dropdown role và badge tự cập nhật khi đổi Main Contact ở Shopify; (2) Jira DUOS-407 — role không có quyền mua (ví dụ View Only) chỉ được thanh toán khi tổng order gồm cả shipping bằng 0. Với (2) còn cần biết rule có còn phụ thuộc config allowZeroSubtotalCheckout không, áp cho mọi role không có quyền mua hay chỉ store bật config, và discount/thuế có tính vào tổng order không. PO/Dev xác nhận để nâng thành kết quả mong đợi?",
  "kb_ids": [
    "KB-023",
    "KB-054"
  ],
  "related_questions": [
    "Theo ticket Jira DUOS-406 (status PASS 18/08/2026, rule còn draft): Main Contact không còn là role, hiển thị badge \"Main Contact\", bị bỏ khỏi dropdown role và badge tự cập nhật khi đổi Main Contact ở Shopify — PO/Dev xác nhận đây là hành vi đúng hiện hành? Badge cập nhật sau bao lâu?",
    "Main Contact không còn là role (badge \"Main Contact\", bỏ khỏi dropdown role, tự cập nhật khi đổi ở Shopify) — PO/Dev có xác nhận để dùng làm kết quả mong đợi không?",
    "Role không có quyền mua chỉ được thanh toán khi tổng order gồm cả shipping bằng 0 (ticket Jira DUOS-407, rule còn draft) — PO/Dev xác nhận? Ngoại lệ này chỉ áp cho store bật users.config `allowZeroSubtotalCheckout` hay mọi store, và discount/thuế có tính vào tổng order không?",
    "Rule \"role không có quyền mua chỉ thanh toán khi tổng order gồm cả shipping bằng 0\" (Jira DUOS-407) có được PO/Dev xác nhận không; có còn phụ thuộc `allowZeroSubtotalCheckout` không; áp cho mọi role không có quyền mua hay chỉ store bật config; discount/thuế có tính vào tổng order không?"
  ],
  "check_ids": [
    "default-and-custom-roles:CHK-017",
    "checkout-blocking-by-permission:CHK-004"
  ]
}
```

## OQ-roles-permissions-005 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-roles-permissions-005",
  "type": "OPEN_ISSUE",
  "feature_id": "default-and-custom-roles",
  "summary": "Lỗi accessibility đang mở: trên staging 08/10/2026, dialog \"Create custom role\" có accessible name là \"535\" thay vì tên có nghĩa (mức Minor, chưa có Dev xác nhận). Cần log bug và theo dõi; checklist dùng làm regression watch, không làm kết quả mong đợi.",
  "kb_ids": [
    "KB-019"
  ],
  "related_questions": [
    "Dialog \"Create custom role\" có accessible name \"535\" — Dev xác nhận là lỗi và khi nào sửa?"
  ]
}
```

## OQ-roles-permissions-006 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-roles-permissions-006",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "default-and-custom-roles",
  "summary": "Tạo/quản lý custom role trên Portal còn chưa rõ (Jira DUOS-372 không nói): select \"Select based role\" có liệt kê custom role đã có không; có chặn trùng tên role không; có xoá được custom role không; bước 2 của modal \"Create custom role\" gồm những gì. Cần PO/Dev xác nhận.",
  "kb_ids": [
    "KB-017",
    "KB-018",
    "KB-020"
  ],
  "related_questions": [
    "Khi tạo custom role trên Portal: có chặn trùng tên role không; select role nền có liệt kê custom role đã có không; có xoá được custom role không (và member đang giữ role thì sao); bước 2 của modal \"Create custom role\" gồm những gì?",
    "Select \"Select based role\" có liệt kê custom role đã có không; có chặn trùng tên role không; có xoá được custom role không; bước 2 của modal Create custom role gồm những gì?"
  ],
  "check_ids": [
    "default-and-custom-roles:CHK-015"
  ]
}
```

## OQ-roles-permissions-007 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-roles-permissions-007",
  "type": "OPEN_ISSUE",
  "feature_id": "default-and-custom-roles",
  "summary": "Các thao tác ghi trên Portal của module chưa được thực hiện khi khảo sát (chỉ đọc): tạo custom role sau bước 1, publish custom role theo company, chạy \"Run bulk assign\". Kết quả của các thao tác này chưa có quan sát.",
  "kb_ids": [
    "KB-017",
    "KB-018",
    "KB-020",
    "KB-052"
  ],
  "related_questions": [
    "Sau bước 1, tạo custom role thật và publish custom role theo company cho kết quả gì trên staging (\"Used in\" hiển thị gì, company được chọn thấy role ở Customer Account không)?"
  ]
}
```

## OQ-roles-permissions-008 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-roles-permissions-008",
  "type": "OPEN_ISSUE",
  "feature_id": "default-and-custom-roles",
  "summary": "Tài liệu nguồn mà các rule role mặc định, tối thiểu 1 Admin và chặn checkout trích dẫn không có trong bộ tài liệu đã nạp: tài liệu sản phẩm Duos (docs 09/07/2026) phần Roles & permissions, file câu hỏi mở của QA và description cũ của Jira DUOS-88. Các item liên quan chỉ dựa trên bản tóm tắt của QA; cần nạp tài liệu gốc để đối chiếu.",
  "kb_ids": [
    "KB-001",
    "KB-003",
    "KB-027",
    "KB-053"
  ],
  "related_questions": [
    "Tài liệu sản phẩm Duos phần Roles & permissions (docs 09/07/2026) và description gốc của Jira DUOS-88 nói gì về role mặc định và quyền của từng role?"
  ]
}
```

## OQ-roles-permissions-009 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-roles-permissions-009",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "member-role-assignment-sync",
  "summary": "Rule \"mỗi company location bắt buộc có ít nhất 1 Admin\" được enforce ở đâu và báo message gì (Customer Account, Admin extension, bulk, API)? Đặc biệt QA business rule ghi \"Chưa chốt\": khi Shopify Flow action \"assign role\" hạ Admin cuối cùng của location xuống ordering_only thì có bị chặn không (QA ghi nên chốt sớm)? Cần PO/Dev trả lời.",
  "kb_ids": [
    "KB-027",
    "KB-028",
    "KB-029"
  ],
  "related_questions": [
    "Shopify Flow action \"assign role\" có enforce rule mỗi company location tối thiểu 1 Admin không — khi hạ Admin cuối cùng của location xuống ordering_only thì run bị chặn (message gì) hay vẫn thực hiện?",
    "Rule \"mỗi company location bắt buộc có ít nhất 1 Admin\" được chặn ở đâu (Customer Account, Admin extension, bulk, API) và báo message gì? Khi Shopify Flow action \"assign role\" hạ Admin cuối cùng của location xuống ordering_only thì có bị chặn không?",
    "API đếm Admin `GET company-locations/{id}/roles/admin/count` được gọi ở đâu và ai được gọi?",
    "Flow action assign role có chặn việc hạ Admin cuối cùng của location xuống `ordering_only` không?"
  ],
  "check_ids": [
    "member-role-assignment-sync:CHK-004"
  ]
}
```

## OQ-roles-permissions-010 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-roles-permissions-010",
  "type": "OPEN_ISSUE",
  "feature_id": "member-role-assignment-sync",
  "summary": "Customer Account (quản lý member/role của buyer) và Admin extension (đổi role member ở trang company location) chưa được quan sát trên staging; việc map lại contact role Shopify khi đổi role chưa có quan sát nào. Cần tài khoản buyer và quyền mở Admin extension để kiểm.",
  "kb_ids": [
    "KB-024",
    "KB-026",
    "KB-027"
  ],
  "related_questions": [
    "Đổi role ở Customer Account / Admin extension có thực sự map lại contact role Shopify trên staging không?"
  ]
}
```

## OQ-roles-permissions-011 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-roles-permissions-011",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "flow-assign-role-automation",
  "summary": "Flow action \"assign role\" còn các điểm chưa có kết quả mong đợi: field shopify_contact_role chỉ chứa khoảng trắng báo \"required\" hay \"not supported\"; message lỗi khi role template không tồn tại/chưa publish hoặc customer không tồn tại; tạo role/gán role fail giữa chừng thì retry, ghi log hay báo merchant; chạy lại action lần 2 có gửi email đổi role lần 2 không; nội dung và người nhận email đổi role; và Jira DUOS-409 (trigger khi role thay đổi, đang To Do) còn phạm vi gì chưa làm. Cần PO/Dev trả lời.",
  "kb_ids": [
    "KB-034",
    "KB-033",
    "KB-037",
    "KB-038",
    "KB-041",
    "KB-045"
  ],
  "related_questions": [
    "Khi field `shopify_contact_role` chỉ chứa khoảng trắng, Flow action \"assign role\" báo `Shopify contact role is required` hay `Shopify contact role \"X\" is not supported…`?",
    "Chạy lại Flow action \"assign role\" lần 2 cho member đã giữ đúng role có gửi email đổi role và bắn trigger lần nữa không? Nội dung và người nhận email đổi role là gì? Tạo/gán role fail giữa chừng thì retry, ghi log hay báo merchant?",
    "Field `shopify_contact_role` chỉ chứa khoảng trắng báo `required` hay `not supported`?",
    "Message lỗi khi role template không tồn tại / chưa publish cho company, hoặc customer không tồn tại trên Shopify là gì?",
    "Tạo/gán role fail giữa chừng (sau khi qua validation) thì hệ thống retry, ghi log hay báo merchant?",
    "Chạy lại action lần 2 với cùng role có gửi email đổi role lần nữa không; nội dung và người nhận email đổi role là gì; Jira DUOS-409 (đang To Do) còn phạm vi gì chưa làm?"
  ],
  "check_ids": [
    "flow-assign-role-automation:CHK-005",
    "flow-assign-role-automation:CHK-010"
  ]
}
```

## OQ-roles-permissions-012 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-roles-permissions-012",
  "type": "OPEN_ISSUE",
  "feature_id": "flow-assign-role-automation",
  "summary": "Shopify Flow (action \"assign role\", trigger \"member role updated\") chưa được mở trên staging khi khảo sát 08/10/2026; toàn bộ hành vi Flow của object chỉ dựa trên Jira/quyết định Dev, chưa có quan sát hay test case PASS có ngày. Cần một đợt quan sát/kiểm thử Flow trên store có quyền dùng module.",
  "kb_ids": [
    "KB-032",
    "KB-033",
    "KB-034",
    "KB-035",
    "KB-036",
    "KB-037",
    "KB-038",
    "KB-039",
    "KB-040",
    "KB-041",
    "KB-042",
    "KB-043"
  ],
  "related_questions": [
    "Khi nào có được store staging mở Shopify Flow để quan sát/kiểm thử action assign role và trigger member role updated?"
  ]
}
```

## OQ-roles-permissions-013 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-roles-permissions-013",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "bulk-assign-admin",
  "summary": "Bulk assign admin còn thiếu thông tin để viết kết quả mong đợi: radio \"Main contacts\" / \"Location admin\" trên Portal ứng với type assign_admin_main_contact / assign_admin_location_admin như thế nào; merchant có được báo gì về item bị Shopify reject/bỏ qua không; gặp Shopify API rate limit giữa batch thì bỏ qua hay retry; bulk member sync khởi chạy ở đâu; khi nào trạng thái là partial_completed thay vì completed. Cần PO/Dev xác nhận.",
  "kb_ids": [
    "KB-046",
    "KB-047",
    "KB-049",
    "KB-051",
    "KB-052"
  ],
  "related_questions": [
    "Radio \"Main contacts\" / \"Location admin\" trên Portal ứng với kiểu bulk `assign_admin_main_contact` / `assign_admin_location_admin` thế nào, và sau khi chạy Portal báo cho merchant những gì?",
    "Bulk assign admin / bulk member sync gặp Shopify API rate limit giữa batch thì bỏ qua item (như item bị reject) hay retry? Bulk member sync được khởi chạy ở đâu?",
    "Radio \"Main contacts\" / \"Location admin\" trên Portal ứng với type `assign_admin_main_contact` / `assign_admin_location_admin` như thế nào?",
    "Merchant có được báo gì về item bị Shopify reject / bỏ qua không, và khi nào trạng thái là partial_completed thay vì completed?",
    "Gặp Shopify API rate limit giữa batch thì bỏ qua hay retry?",
    "Bulk member sync được khởi chạy ở đâu và bởi ai?",
    "Sau khi bấm \"Run bulk assign\" trên staging, Portal hiển thị gì (\"Last synced at\", trạng thái, số company)?",
    "Khi nào bulk assign admin có trạng thái `partial_completed` thay vì `completed`? Company có location bị Shopify reject vẫn tính success nên bulk có thể báo Completed dù location chưa được gán — merchant có được báo gì về item bị bỏ qua không?"
  ],
  "check_ids": [
    "bulk-assign-admin:CHK-002",
    "bulk-assign-admin:CHK-008",
    "bulk-assign-admin:CHK-007"
  ]
}
```

## OQ-roles-permissions-014 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-roles-permissions-014",
  "type": "OPEN_ISSUE",
  "feature_id": "checkout-blocking-by-permission",
  "summary": "Lỗi đã sửa cần theo dõi regression: checkout extension từng bỏ qua member role khi chặn checkout theo permission (Jira DUOS-273, fixed). Chưa có lần chạy lại nào được ghi; cần regression với đủ từng role (Junior Buyer, Senior Buyer, Admin, custom role) trên store Shopify Plus.",
  "kb_ids": [
    "KB-056"
  ],
  "related_questions": [
    "Sau khi đổi role của member (vd Senior Buyer → Junior Buyer), checkout extension áp chặn theo role mới ngay ở lần checkout kế tiếp hay chỉ sau khi buyer đăng nhập lại?"
  ],
  "check_ids": [
    "checkout-blocking-by-permission:CHK-005"
  ]
}
```

## OQ-roles-permissions-015 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-roles-permissions-015",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "checkout-blocking-by-permission",
  "summary": "Theo Jira DUOS-266 (ticket trống), merchant sửa được nội dung warning message ở checkout khi bị chặn theo permission. Text mặc định là gì và merchant cấu hình ở đâu (Portal, checkout editor, hay users.config)? Cần PO/Dev xác nhận.",
  "kb_ids": [
    "KB-057"
  ],
  "related_questions": [
    "Warning message hiển thị ở checkout khi bị chặn theo permission (Jira DUOS-266, ticket không mô tả): text mặc định là gì và merchant sửa ở đâu (Portal, checkout editor hay users.config)?",
    "Khi Junior Buyer (hoặc View Only) vào checkout bị chặn, buyer thấy gì (message, nút bị disable, chuyển hướng), text warning mặc định là gì và merchant sửa ở đâu (Portal, checkout editor, users.config)?"
  ],
  "check_ids": [
    "checkout-blocking-by-permission:CHK-006"
  ]
}
```

## OQ-roles-permissions-016 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-roles-permissions-016",
  "type": "OPEN_ISSUE",
  "feature_id": "checkout-blocking-by-permission",
  "summary": "Checkout extension (chặn checkout theo permission) chưa quan sát được: store staging Plus đang ở Free plan, extension Inactive, app embed Disabled, storefront có password và không có tài khoản buyer. Hành vi chặn checkout theo role chỉ dựa trên rule/Jira; cần store Shopify Plus có buyer và module được bật để kiểm.",
  "kb_ids": [
    "KB-053",
    "KB-054",
    "KB-056",
    "KB-058",
    "KB-060"
  ],
  "related_questions": [
    "Lỗi checkout extension bỏ qua member role (Jira DUOS-273, đã sửa) có còn tái hiện khi regression với đủ Junior Buyer, Senior Buyer, Admin và custom role trên store Shopify Plus không?",
    "Custom role tạo từ role nền Senior Buyer hoặc Admin nhưng bỏ quyền mua có bị chặn ở checkout giống View Only không?",
    "Khi nào có store Shopify Plus với module bật, buyer và cart để quan sát checkout extension?",
    "Bật `customer-permission.hideDefaultRoles` thì member đang giữ Senior Buyer / Junior Buyer bị xử lý thế nào?"
  ]
}
```

## OQ-roles-permissions-017 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-roles-permissions-017",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "merchant-role-customization-config",
  "summary": "Merchant có bộ role mặc định riêng (PO 14/04/2026, Jira DUOS-374 thêm 2 role mặc định cho một merchant) được bật bằng cơ chế nào, tên role là gì và các role này có hiện ở trang Roles & permissions / dùng làm role template cho Flow không? Cần PO/Dev xác nhận.",
  "kb_ids": [
    "KB-066",
    "KB-065"
  ],
  "related_questions": [
    "Merchant có bộ role mặc định riêng ngoài 3 role chung (PO 14/04/2026, Jira DUOS-374 thêm 2 role mặc định cho một merchant) được bật bằng cơ chế nào, tên role là gì, có hiện ở trang Roles & permissions và dùng làm role template cho Flow được không?",
    "Merchant có bộ role mặc định riêng (Jira DUOS-374 thêm 2 role mặc định cho một merchant) được bật bằng cơ chế nào, tên role là gì, có hiện ở trang Roles & permissions và dùng làm role template cho Flow được không?"
  ],
  "check_ids": [
    "merchant-role-customization-config:CHK-008"
  ]
}
```

## OQ-roles-permissions-018 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-roles-permissions-018",
  "type": "OPEN_ISSUE",
  "feature_id": "merchant-role-customization-config",
  "summary": "Các key users.config tuỳ biến role theo merchant chỉ cấu hình được ở admin panel nội bộ (khảo sát 08/10/2026 chỉ thấy trang login) và cần BE set cho store test; chưa có quan sát hiệu ứng của key nào trên Portal/Customer Account. Cần store test được bật từng key để kiểm.",
  "kb_ids": [
    "KB-059",
    "KB-060",
    "KB-061",
    "KB-062",
    "KB-063",
    "KB-064"
  ],
  "related_questions": [
    "Hiệu ứng thực tế của từng key (hideDefaultRoles, adminRoleDisplayName, disableCreateRole, enable_edit_locked_role_permissions, hideRoleManageButton + link) trên Portal và Customer Account trông thế nào khi store test được bật?",
    "Tên hiển thị đổi bằng `adminRoleDisplayName` áp ở những màn nào (Portal, Customer Account, email đổi role)?"
  ]
}
```

## OQ-roles-permissions-019 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-roles-permissions-019",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": null,
  "summary": "Ma trận actor × surface của Duos B2B chưa được tài liệu nào chốt ở mức sản phẩm: buyer với role nào (Admin, Senior Buyer, Junior Buyer, custom role, Member fallback) truy cập được từng Customer Account extension (Company member, Quick Order, Shopping list, My Quotes, mục tài chính) và từng tính năng storefront; ngoài merchant còn ai (staff Shopify có quyền giới hạn?) dùng Portal và Admin UI extension; và ai được sửa users.config trong admin panel nội bộ. Ma trận permission chi tiết thuộc object roles-permissions — câu hỏi ở đây chỉ là phân vai actor theo surface.",
  "kb_ids": [
    "KB-004",
    "KB-005",
    "KB-014",
    "KB-017",
    "KB-028",
    "KB-032",
    "KB-043",
    "KB-044",
    "KB-052",
    "KB-P-003",
    "KB-P-004",
    "KB-P-007",
    "KB-P-008",
    "KB-P-009",
    "KB-P-010",
    "KB-P-014",
    "KB-P-017",
    "KB-P-030"
  ],
  "scope_note": "Câu hỏi mức product (dùng chung nhiều object), đặt ở object này để theo dõi.",
  "check_ids": [
    "default-and-custom-roles:CHK-018",
    "default-and-custom-roles:CHK-019",
    "flow-assign-role-automation:CHK-009",
    "member-role-assignment-sync:CHK-005",
    "bulk-assign-admin:CHK-003",
    "bulk-assign-admin:CHK-009"
  ],
  "related_questions": [
    "Ma trận role/quyền của module User & Permission chưa đủ: (1) hai nhóm \"Order history\" và \"Shipping and billing\" luôn disabled áp cho role nào (chỉ role mặc định, mọi role kể cả Admin, hay cả custom role)? (2) \"permission của Admin không sửa được\" là khoá với merchant trên Portal, với buyer Admin ở Customer Account, hay cả hai? (3) staff role nào của merchant được vào trang Roles & permissions, tạo/publish custom role và chạy bulk assign admin? (4) buyer role nào gọi được API đếm admin của location? Các rule Shopify Flow và cấu hình users.config cũng không ghi role thao tác. Cần PO/Dev chốt ma trận role cho object này.",
    "Staff role nào của merchant được vào trang Roles & permissions, tạo và publish custom role? Hai nhóm \"Order history\" và \"Shipping and billing\" luôn disabled áp cho role nào, và \"permission của Admin không sửa được\" khoá với merchant trên Portal, với buyer Admin ở Customer Account, hay cả hai?",
    "Quy tắc \"hai nhóm Order history và Shipping and billing luôn disabled vì phụ thuộc Shopify\" có áp cho custom role không, hay chỉ cho role mặc định?",
    "Ma trận role cho module: nhóm \"Order history\" và \"Shipping and billing\" luôn disabled áp cho role nào; \"permission của Admin không sửa được\" khoá với merchant trên Portal, với buyer Admin ở Customer Account hay cả hai; staff role nào của merchant được vào trang Roles & permissions, tạo/publish custom role, chạy bulk assign admin; buyer role nào gọi được API đếm admin; ai thao tác Flow và users.config?",
    "Auto-assign role theo customer tag qua Shopify Flow (Jira DUOS-402) còn nhiều điểm chưa chốt: customer có nhiều tag map tới nhiều role thì gán role nào; thêm tag sau khi customer đã ở trong location có kích hoạt assign không (trigger companyContact Assigned chỉ chạy lúc thêm); thêm member thủ công có kích hoạt trigger không; customer nhiều location bị gỡ tag thì gỡ role ở location nào; custom role hoặc role mặc định riêng của merchant có làm role template được không; và format tên role tạo từ template (\"prefix baserole + name\") cụ thể ra sao. Cần PO/Dev xác nhận.",
    "Auto-assign role theo customer tag (Jira DUOS-402): customer có nhiều tag map tới nhiều role thì gán role nào; thêm tag sau khi customer đã ở trong location có kích hoạt không; customer nhiều location bị gỡ tag thì gỡ role ở location nào; role tạo từ template có tên cụ thể ra sao (\"prefix baserole + name\"); gỡ tag thì role về `Member` có đúng không?",
    "Auto-assign theo customer tag (Jira DUOS-402): customer có nhiều tag map nhiều role thì gán role nào; thêm tag sau khi đã ở location có kích hoạt không; thêm member thủ công có kích hoạt trigger không; customer nhiều location bị gỡ tag thì gỡ role ở đâu; custom role / role mặc định riêng của merchant có làm role template được không; tên role tạo từ template cụ thể ra sao?",
    "API `GET company-locations/{id}/roles/admin/count` trả về dữ liệu gì, được dùng để chặn ở đâu, và buyer role nào (hay chỉ buyer của đúng company) được gọi?",
    "Kiểu bulk \"Location admin\" chỉ sync database app cho người đang là Location admin trên Shopify (không đổi contact role nào ở Shopify) như ticket Jira DUOS-393 mô tả có đúng là hành vi hiện hành không?",
    "Staff role nào của merchant được chạy \"Run bulk assign\" trên Portal (thao tác ghi đè role hàng loạt)?"
  ]
}
```

## OQ-roles-permissions-020 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-roles-permissions-020",
  "type": "OPEN_ISSUE",
  "feature_id": null,
  "summary": "Các surface Customer Account, storefront, Checkout extension, Shopify Flow và phần bên trong admin panel nội bộ chưa từng được quan sát trên staging (khảo sát 08/10/2026 trên store staging Plus (Free plan): không có tài khoản buyer, storefront có password, chưa được duyệt thao tác cart/checkout, Flow không mở, admin panel chỉ có trang login). Bản đồ surface tầng sản phẩm vì vậy chỉ dựa trên tóm tắt QA; cần một lần khảo sát có tài khoản buyer, mật khẩu storefront, quyền Flow và quyền vào admin panel để xác nhận.",
  "kb_ids": [
    "KB-P-005",
    "KB-P-006",
    "KB-P-007",
    "KB-P-008",
    "KB-P-009",
    "KB-P-030"
  ],
  "scope_note": "Câu hỏi mức product (dùng chung nhiều object), đặt ở object này để theo dõi."
}
```

## OQ-roles-permissions-021 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-roles-permissions-021",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "default-and-custom-roles",
  "summary": "Sau khi publish custom role cho company A (không cho company B), role đó có hiện để chọn ở Customer Account của company A và không hiện ở company B không? Khi bỏ một company khỏi \"Used in\" trong lúc đã có member giữ custom role đó, role của member bị xử lý thế nào?",
  "check_ids": [
    "default-and-custom-roles:CHK-014"
  ]
}
```

## OQ-roles-permissions-022 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-roles-permissions-022",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "default-and-custom-roles",
  "summary": "Banner mô tả của 3 role mặc định ở Customer Account theo ticket Jira DUOS-88 (Admin — \"This role should be assigned to individuals that manage the entire Company location.\", …) có còn là nội dung đúng hiện hành không?",
  "check_ids": [
    "default-and-custom-roles:CHK-016"
  ]
}
```

## OQ-roles-permissions-023 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-roles-permissions-023",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "member-role-assignment-sync",
  "summary": "Role Duos được gán theo company location (mỗi location một role riêng cho cùng customer) hay theo company? Định nghĩa trong glossary QA chưa ghi nguồn PO/Dev.",
  "check_ids": [
    "member-role-assignment-sync:CHK-006"
  ],
  "kb_ids": [
    "KB-030"
  ]
}
```

## OQ-roles-permissions-024 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-roles-permissions-024",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "checkout-blocking-by-permission",
  "summary": "Với custom role không có quyền mua (vd View Only): việc chặn đặt hàng nằm ở checkout extension (role vẫn map contact role Shopify Ordering Only) đúng không, và permission \"Purchase from online store\" chặn cả thêm vào giỏ, vào checkout và thanh toán hay chỉ bước thanh toán?",
  "check_ids": [
    "checkout-blocking-by-permission:CHK-003"
  ]
}
```

## OQ-roles-permissions-025 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-roles-permissions-025",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "merchant-role-customization-config",
  "summary": "Key users.config `enable_edit_locked_role_permissions: true` mở khoá chính xác phần nào trên Portal: permission của role mặc định (kể cả Admin, vốn theo PO không sửa được), hai nhóm \"Order history\" / \"Shipping and billing\", hay chỉ phần khác?",
  "check_ids": [
    "merchant-role-customization-config:CHK-006"
  ],
  "related_questions": [
    "`enable_edit_locked_role_permissions` mở khoá phần permission nào — của role mặc định Admin, của mọi role mặc định, hay chỉ các nhóm luôn disabled (Order history, Shipping and billing)?"
  ]
}
```

## OQ-roles-permissions-026 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-roles-permissions-026",
  "type": "OPEN_ISSUE",
  "feature_id": "default-and-custom-roles",
  "summary": "Role mặc định Junior Buyer có được tạo order từ CSV và từ SKU (Bulk SKU), hay chỉ được tạo shopping list từ CSV/SKU như modal quyền trên staging 08/10/2026?",
  "kb_ids": [
    "KB-011",
    "KB-012"
  ]
}
```

## OQ-roles-permissions-027 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-roles-permissions-027",
  "type": "OPEN_ISSUE",
  "feature_id": "default-and-custom-roles",
  "summary": "Permission \"Purchase from online store\" bao gồm chính xác những bước nào (thêm vào cart, checkout, thanh toán) và banner mô tả từng role mặc định ở Customer Account có còn đúng như ticket không?",
  "kb_ids": [
    "KB-006",
    "KB-022"
  ]
}
```

## OQ-roles-permissions-028 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-roles-permissions-028",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": null,
  "summary": "PO/Dev xác nhận hay sửa các hiện trạng sau (ghi nhận trên staging, khảo sát 30/09–08/10/2026), hiện đang được checklist dùng làm kỳ vọng tạm thời nhưng chưa có ai xác nhận là hành vi đúng: default role modal checkboxes disabled: Trên staging (khảo sát 08/10/2026, store staging Plus (Free plan)), modal xem quyền của 3 role mặc định có mọi checkbox permission ở trạng t.",
  "kb_ids": [
    "KB-015"
  ],
  "check_ids": [
    "default-and-custom-roles:CHK-004"
  ]
}
```

## OQ-roles-permissions-029 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-roles-permissions-029",
  "type": "OPEN_ISSUE",
  "feature_id": null,
  "summary": "Bộ tài liệu nguồn (QA business rule, QA KB Duos, inventory staging) không có đặc tả API / data model cho các feature: default-and-custom-roles, checkout-blocking-by-permission, merchant-role-customization-config. Cần Dev cung cấp endpoint, payload và dữ liệu lưu trữ liên quan nếu QA cần kiểm ở tầng API/DB.",
  "related_feature_ids": [
    "default-and-custom-roles",
    "checkout-blocking-by-permission",
    "merchant-role-customization-config"
  ]
}
```
