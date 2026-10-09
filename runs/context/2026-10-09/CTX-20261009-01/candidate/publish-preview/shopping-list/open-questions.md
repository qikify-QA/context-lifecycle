# Open Questions — B2B Shopping List — list đã lưu, gửi duyệt / duyệt theo role, re-approval sau order, lưu sản phẩm / cart vào list, list do merchant quản lý / tạo hộ, reminder re-order

Tổng: 20 mục. Sinh từ lần bootstrap đầu tiên (DOC_BOOTSTRAP) của Duos B2B, ngày 2026-10-09.

- CONFLICT: 1
- NEEDS_CONFIRMATION: 13
- OPEN_ISSUE: 6

## OQ-shopping-list-001 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-shopping-list-001",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": null,
  "summary": "Một số quy tắc shopping list chỉ dựa trên Jira ticket, không có rule active, không có PO/Dev xác nhận hay test case PASS: rule Junior Buyer bị khoá sửa list Pending/Approved (Jira DUOS-395, rule còn nháp \"chỉ theo ticket\"); 4 status và chuyển trạng thái Draft / chờ duyệt / Approved / Rejected (Jira DUOS-86, description chưa hoàn tất); approver lưu `{ customerId, name }` (DUOS-368); thêm product từ PLP/PDP (DUOS-299); quick add-to-cart từng item (DUOS-306); add cả list vào cart (DUOS-334); nút \"Save to shopping list\" cho DTC (DUOS-358); reminder re-order (DUOS-341, custom app); lưu dạng metaobjects (DUOS-290). Cần PO xác nhận các quy tắc này còn đúng trước khi dùng làm kết quả mong đợi.",
  "kb_ids": [
    "KB-001",
    "KB-002",
    "KB-003",
    "KB-004",
    "KB-005",
    "KB-006",
    "KB-007",
    "KB-008",
    "KB-009",
    "KB-010",
    "KB-011",
    "KB-012",
    "KB-015",
    "KB-022",
    "KB-025",
    "KB-026",
    "KB-027",
    "KB-029",
    "KB-033",
    "KB-034",
    "KB-035",
    "KB-038",
    "KB-P-024"
  ],
  "related_questions": [
    "Khi Junior Buyer bấm gửi duyệt một list Draft, list chuyển sang status chờ duyệt nào và status đó hiển thị trên UI là \"Waiting for Approval\" (Jira DUOS-86) hay \"Pending\" (Jira DUOS-382, DUOS-395, DUOS-308)? Nhãn nút gửi duyệt chính thức là \"Submit for Approval\" không?",
    "Với Junior Buyer: ở list chờ duyệt / Approved các thao tác Delete, đổi số lượng, \"Edit Shopping list name\", search product, \"Add more line\", \"Upload CSV/Load Catalog\" có bị disable như Jira DUOS-395 không; còn ở Draft và Rejected thì những thao tác nào được bật?",
    "List Rejected có đúng là không update và không re-submit được, chỉ duplicate thành một Draft mới (Jira DUOS-86, description chưa hoàn tất) không? Khi reject / approve, lý do có bắt buộc không và field tên là gì (Jira DUOS-218 để trống)?",
    "Dữ liệu shopping list có được lưu dạng Shopify metaobjects (Jira DUOS-290) và approver có được lưu dạng `{ customerId, name }` (Jira DUOS-368) không? Giá trị status chờ duyệt được lưu là gì?",
    "Buyer lưu sản phẩm vào shopping list từ PLP và PDP (Jira DUOS-299) có phải hành vi của app chuẩn đã được PO xác nhận không? Nút lưu nằm ở đâu, lưu vào list mới hay list có sẵn, và list có giữ đúng variant + số lượng không?",
    "Quick add-to-cart từng item trong shopping list (Jira DUOS-306) có phải hành vi của app chuẩn đã được PO xác nhận không, và cart nhận đúng variant + số lượng của item hay số lượng mặc định?",
    "Add cả shopping list vào cart (Jira DUOS-334) có phải hành vi của app chuẩn đã được PO xác nhận không? Cart nhận đúng mọi item và số lượng của list không, và khi cart đã có cùng variant thì gộp số lượng hay thêm dòng?",
    "List chưa ở trạng thái Approved (Draft, chờ duyệt, Rejected) có được add vào cart không, đặc biệt với Junior Buyer — tức add-to-cart từ list có đi qua luồng duyệt không?",
    "Email reminder re-order (Jira DUOS-341, custom app) có CTA dẫn tới checkout với đúng item của list không? Reminder được gửi theo lịch nào (giờ chạy, múi giờ) — có phải job chạy hằng ngày không?",
    "Order đặt từ shopping list có reminder (Jira DUOS-341) được gắn tag tên gì, và tag có được gắn cho order đặt từ list không qua email reminder không?",
    "Bốn status và các chuyển trạng thái của Jira DUOS-86 (Draft sửa tới khi submit, Approved tạo order trực tiếp, Rejected chỉ duplicate thành draft mới) còn đúng không khi description ticket được hoàn tất, và approver có đúng được lưu `{ customerId, name }` không?",
    "Lỗi Jira DUOS-392 (thêm item từ Shopping List vào cart không đúng) tái hiện thế nào, mức độ ra sao và đã sửa bằng thay đổi gì?",
    "Các quy tắc lưu từ PLP / PDP (Jira DUOS-299), quick add-to-cart từng item (DUOS-306) và add cả list vào cart (DUOS-334) có phải hành vi của app chuẩn và được PO xác nhận không?",
    "List chưa ở trạng thái Approved có được add vào cart không, đặc biệt với Junior Buyer?",
    "Tag gắn vào order đặt từ list có reminder tên là gì?",
    "Status chờ duyệt của shopping list hiển thị trên UI tên là \"Waiting for Approval\" hay \"Pending\", và giá trị lưu là gì?",
    "Reminder được gửi theo lịch nào (giờ chạy, múi giờ) và role nào được tạo / điều khiển reminder?",
    "Ma trận quyền shopping list theo role chưa đủ để viết kết quả mong đợi: (1) Junior Buyer ở list Draft và Rejected được dùng những nút nào (Jira DUOS-395 chỉ nêu Pending/Approved); (2) quy tắc \"buyer không sửa được list chờ duyệt / Approved\" của Jira DUOS-86 áp cho mọi buyer hay chỉ Junior Buyer như DUOS-395; (3) cột \"created by\" thay cột \"location\" ở trang danh sách áp cho role nào; (4) custom role có hoặc không có quyền duyệt (\"Approve draft status list\") thì thấy nút submit / approve thế nào. Cần PO xác nhận ma trận role × status × nút.",
    "Luồng duyệt shopping list theo ticket (Senior Buyer hoặc Admin approve list chờ duyệt → list Approved → tạo order trực tiếp từ list Approved) có phải hành vi đã chốt không, và role nào được tạo order từ list Approved?",
    "Quy tắc \"buyer không sửa được list chờ duyệt / Approved\" (Jira DUOS-86) áp cho mọi buyer (kể cả Senior Buyer, Admin, custom role) hay chỉ Junior Buyer như Jira DUOS-395? Custom role có / không có quyền \"Approve draft status list\" thấy nút submit / approve thế nào?",
    "Ma trận role × status × nút của shopping list là gì: Junior Buyer ở list Draft và Rejected được dùng những nút nào; quy tắc \"không sửa list chờ duyệt / Approved\" áp cho mọi buyer hay chỉ Junior Buyer; custom role có hoặc không có quyền \"Approve draft status list\" thấy nút submit / approve thế nào?",
    "Cột \"created by\" thay cột \"location\" ở trang danh sách shopping list áp cho role nào?",
    "Role nào (Junior Buyer, Senior Buyer, Admin, merchant) được tạo, sửa và điều khiển reminder re-order của một shopping list, kể cả list do người khác tạo?"
  ],
  "check_ids": [
    "shopping-list-approval:CHK-004",
    "shopping-list-approval:CHK-006",
    "shopping-list-approval:CHK-008",
    "shopping-list-approval:CHK-009",
    "save-and-add-to-cart:CHK-002",
    "save-and-add-to-cart:CHK-005",
    "save-and-add-to-cart:CHK-006",
    "save-and-add-to-cart:CHK-008",
    "reorder-reminder:CHK-004",
    "reorder-reminder:CHK-005",
    "shopping-list-approval:CHK-005",
    "shopping-list-approval:CHK-007",
    "reorder-reminder:CHK-007"
  ]
}
```

## OQ-shopping-list-002 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-shopping-list-002",
  "type": "OPEN_ISSUE",
  "feature_id": null,
  "summary": "Customer Account của shopping list chưa được quan sát (khảo sát 08/10/2026 không có tài khoản buyer): trang Shopping List, nút submit / approve theo role, status chờ duyệt, các nút bị disable, cột \"created by\", hiệu ứng của \"Add \"Shopping List\" page\" / \"Add \"Shopping List\" to main menu\". Mọi quy tắc phía buyer hiện chỉ có từ Jira / PO, chưa có quan sát. Cần tài khoản buyer theo từng role mặc định trên store staging đã subscribe module.",
  "kb_ids": [
    "KB-001",
    "KB-002",
    "KB-003",
    "KB-004",
    "KB-005",
    "KB-039"
  ],
  "related_questions": [
    "Trong Customer Account, trang Shopping List, nút submit / approve và các nút bị disable hiển thị thế nào với từng role mặc định, và hai option \"Add \"Shopping List\" page\" / \"Add \"Shopping List\" to main menu\" có hiệu ứng gì?"
  ]
}
```

## OQ-shopping-list-003 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-shopping-list-003",
  "type": "OPEN_ISSUE",
  "feature_id": null,
  "summary": "Tài liệu nguồn của shopping list còn thiếu hoặc chưa hoàn tất: phần tài liệu sản phẩm Duos về Shopping list mà QA KB viện dẫn không có trong bộ tài liệu; description Jira DUOS-86 (status) còn đang cập nhật; Jira DUOS-218 (lý do accept/reject) để trống nên chưa biết lý do có bắt buộc không và tên field. Cần bổ sung tài liệu gốc trước khi viết case cho các mảng này.",
  "kb_ids": [
    "KB-005",
    "KB-008"
  ],
  "related_questions": [
    "Khi duyệt hoặc từ chối shopping list, lý do accept / reject có bắt buộc không và field tên là gì (Jira DUOS-218 để trống)?"
  ]
}
```

## OQ-shopping-list-004 — CONFLICT

```json
{
  "oq_id": "OQ-shopping-list-004",
  "type": "CONFLICT",
  "feature_id": "shopping-list-approval",
  "summary": "Status chờ duyệt của shopping list hiển thị trên UI tên là gì: \"Waiting for Approval\" (Jira DUOS-86 và tài liệu sản phẩm Duos) hay \"Pending\" (Jira DUOS-382, DUOS-395, DUOS-308)? Staging khảo sát 08/10/2026 chưa có list nào để quan sát. Cần PO chốt tên hiển thị và giá trị lưu.",
  "kb_ids": [
    "KB-009",
    "KB-010"
  ],
  "side_a": "Theo Jira DUOS-86 và tài liệu sản phẩm Duos (QA tóm tắt, đọc 07/10/2026), status chờ duyệt của shopping list tên là \"Waiting for Approval\".",
  "side_b": "Theo Jira DUOS-382 (Done 18/05/2026), DUOS-395 (Done 20/05/2026) và DUOS-308 (QA tóm tắt, đọc 07/10/2026), status chờ duyệt của shopping list tên là \"Pending\" (giá trị `pending`).",
  "conflict_group": "CONF-DUOS-shopping-list-01"
}
```

## OQ-shopping-list-005 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-shopping-list-005",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "re-approval-after-order",
  "summary": "Khi bật \"Reset approved list to pending after order submission\", list Approved do Senior Buyer hoặc Admin (role có quyền \"Approve draft status list\") đặt order có bị reset về Pending không? Quyết định Dev 28/04/2026 và PO + Dev 29/04/2026 (Jira DUOS-382) không nêu giới hạn role, trong khi help text trên staging 08/10/2026 ghi chỉ áp cho junior buyer và role không có quyền duyệt. Cần PO/Dev chốt phạm vi role.",
  "kb_ids": [
    "KB-013",
    "KB-015"
  ],
  "related_questions": [
    "Khi bật re-approval, list Approved do Senior Buyer hoặc Admin (role có quyền \"Approve draft status list\") đặt order có bị reset về chờ duyệt không? Quyết định Jira DUOS-382 không nêu giới hạn role, còn help text staging 08/10/2026 ghi chỉ áp cho junior buyer và role không có quyền duyệt.",
    "Khi bật \"Reset approved list to pending after order submission\", list Approved do Senior Buyer hoặc Admin (role có quyền \"Approve draft status list\") đặt order có bị reset về trạng thái chờ duyệt không?"
  ],
  "check_ids": [
    "re-approval-after-order:CHK-003"
  ]
}
```

## OQ-shopping-list-006 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-shopping-list-006",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "re-approval-after-order",
  "summary": "Label và giá trị mặc định của setting re-approval hiện chỉ dựa vào quan sát staging 08/10/2026 được QA lead xác nhận lưu, chưa có PO/Dev xác nhận: (1) label \"Reset approved list to pending after order submission\" + link \"Learn more\" có phải label chính thức không; (2) setting mặc định tắt khi cài mới, hay trạng thái tắt trên store staging chỉ là giá trị đã bị đổi?",
  "kb_ids": [
    "KB-014",
    "KB-016"
  ],
  "related_questions": [
    "Checkbox \"Reset approved list to pending after order submission\" mặc định bật hay tắt khi cài mới? Trạng thái tắt quan sát trên một store staging 08/10/2026 có phải mặc định không, và nhãn này có phải nhãn chính thức không?",
    "Label \"Reset approved list to pending after order submission\" có phải label chính thức không, và setting mặc định bật hay tắt khi cài mới?"
  ],
  "check_ids": [
    "re-approval-after-order:CHK-005"
  ]
}
```

## OQ-shopping-list-007 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-shopping-list-007",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "re-approval-after-order",
  "summary": "Shopping list có phải duyệt lại khi order tạo từ list bị edit, cancel hoặc refund không (GAP-02 của task Testlane DUOS-006)? Quyết định Jira DUOS-382 chỉ nói về thời điểm order được submit. Cần PO/Dev trả lời trước khi viết case cho các sự kiện order sau submit.",
  "kb_ids": [
    "KB-021",
    "KB-013",
    "KB-017"
  ],
  "related_questions": [
    "Shopping list có phải duyệt lại (hoặc đổi status) khi order tạo từ list bị edit, cancel hoặc refund không (GAP-02 của task Testlane DUOS-006)? Quyết định Jira DUOS-382 chỉ nói về thời điểm order được submit.",
    "Shopping list có phải duyệt lại khi order tạo từ list bị edit, cancel hoặc refund không (GAP-02 của task Testlane DUOS-006)?",
    "Trạng thái chờ duyệt mà list quay về sau order hiển thị tên \"Pending\" hay \"Waiting for Approval\" trên UI?"
  ],
  "check_ids": [
    "re-approval-after-order:CHK-009"
  ]
}
```

## OQ-shopping-list-008 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-shopping-list-008",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "re-approval-after-order",
  "summary": "Trong luồng re-approval (Jira DUOS-382, PO + Dev 29/04/2026), mail duyệt được gửi lại cho Senior Buyer và Admin vào thời điểm nào: ngay khi list về Pending sau order, hay khi list được approve lại? Nguồn đặt câu này ngay sau \"approve lại → reminder resume\" nên thời điểm không rõ.",
  "kb_ids": [
    "KB-020"
  ],
  "related_questions": [
    "Trong luồng re-approval, mail duyệt gửi lại cho Senior Buyer và Admin vào lúc list về trạng thái chờ duyệt sau order hay lúc list được approve lại?"
  ]
}
```

## OQ-shopping-list-009 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-shopping-list-009",
  "type": "OPEN_ISSUE",
  "feature_id": "save-and-add-to-cart",
  "summary": "Lỗi đã biết Jira DUOS-392 (Bug, Done — custom app của một merchant): thêm item từ Shopping List vào cart không đúng. Tài liệu chỉ có tiêu đề ticket, không có bước tái hiện, mức độ hay bản sửa. Cần lấy chi tiết ticket để biến thành case regression cho quick add-to-cart từng item và add cả list vào cart.",
  "kb_ids": [
    "KB-028"
  ]
}
```

## OQ-shopping-list-010 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-shopping-list-010",
  "type": "OPEN_ISSUE",
  "feature_id": "save-and-add-to-cart",
  "summary": "Phía storefront của shopping list chưa được quan sát (khảo sát 08/10/2026: storefront đang password page, app embed Disabled): chưa kiểm được nút \"Save to shopping list\" trên trang product / collection, hiệu ứng của \"Save products to shopping list from\" và \"Allow customers to save cart as Shopping List\", và nút cho khách DTC (Jira DUOS-358) — tên setting Portal cần bật cho nút DTC cũng chưa được ghi. Cần một store staging có storefront mở và tài khoản buyer để quan sát.",
  "kb_ids": [
    "KB-023",
    "KB-024",
    "KB-025",
    "KB-029"
  ],
  "related_questions": [
    "Nút \"Save to shopping list\" cho khách DTC / khách chưa login / buyer B2B không có quyền có chỉ hiện khi đồng thời có custom script `showShoppingListForDTC: true` và setting Portal tương ứng (Jira DUOS-358) không? Setting Portal đó tên là gì, và khi bấm nút thì người dùng thấy gì?",
    "Setting Portal nào phải bật để hiện nút \"Save to shopping list\" cho khách DTC / khách chưa login (Jira DUOS-358)?",
    "Trên storefront, \"Save products to shopping list from\" (Product page / Collection page) và \"Allow customers to save cart as Shopping List\" hiển thị nút ở đâu và lưu vào list nào (list mới hay list có sẵn)?"
  ],
  "check_ids": [
    "save-and-add-to-cart:CHK-007"
  ]
}
```

## OQ-shopping-list-011 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-shopping-list-011",
  "type": "OPEN_ISSUE",
  "feature_id": "merchant-managed-lists",
  "summary": "Màn list detail trong \"Manage shopping lists\" ở Portal và nút \"Copy link\" chưa được quan sát vì store khảo sát 08/10/2026 có 0 shopping list. Cần dữ liệu list (do buyer tạo và do merchant tạo hộ) để kiểm hành vi list detail (Jira DUOS-254) và link chia sẻ dẫn tới checkout (Jira DUOS-396).",
  "kb_ids": [
    "KB-030",
    "KB-031",
    "KB-032"
  ],
  "related_questions": [
    "List do buyer tự tạo có nút \"Copy link\" không (ở Customer Account hoặc ở Portal), hay chỉ list do merchant tạo hộ mới có?",
    "Màn list detail trong \"Manage shopping lists\" ở Portal cho merchant làm gì với list do buyer tạo (xem, sửa, xoá, duyệt)?",
    "List do buyer tự tạo có nút \"Copy link\" không, hay chỉ list do merchant tạo hộ?"
  ],
  "check_ids": [
    "merchant-managed-lists:CHK-005"
  ]
}
```

## OQ-shopping-list-012 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-shopping-list-012",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "reorder-reminder",
  "summary": "Reminder re-order (Jira DUOS-341) và status \"Re-order\" + tab lọc list có reminder (Jira DUOS-391) là tính năng chung của app Duos hay chỉ có trên custom app của một merchant? Nếu là tính năng chung thì merchant bật reminder ở đâu (trang Shopping list settings trên staging 08/10/2026 không có setting này)? Thêm: action Reschedule áp cho mọi lần reminder sau hay chỉ lần kế tiếp?",
  "kb_ids": [
    "KB-033",
    "KB-034",
    "KB-035",
    "KB-036",
    "KB-037"
  ],
  "related_questions": [
    "Reminder re-order (Jira DUOS-341) là tính năng chung của app Duos hay chỉ có trên custom app của một merchant? Nếu là tính năng chung thì ai (merchant hay buyer, role nào) bật reminder ở đâu và có những tần suất nào?",
    "Các action Pause / Resume, Skip next, View upcoming, Reschedule của reminder (Jira DUOS-341, custom app) có trên app chuẩn không, và Reschedule áp cho mọi lần reminder sau hay chỉ lần kế tiếp?",
    "Status \"Re-order\" và tab lọc list có reminder dựa trên field metaobject `reminder` (Jira DUOS-391) là tính năng chung của app hay chỉ của custom app? Status \"Re-order\" quan hệ thế nào với các status duyệt (Draft / chờ duyệt / Approved / Rejected)?",
    "Reminder re-order (Jira DUOS-341) và status \"Re-order\" + tab lọc list có reminder (Jira DUOS-391) là tính năng chung của app Duos hay chỉ có trên custom app của một merchant?",
    "Nếu là tính năng chung, merchant hoặc buyer bật reminder ở đâu?",
    "Action Reschedule áp cho mọi lần reminder sau hay chỉ lần kế tiếp?"
  ],
  "check_ids": [
    "reorder-reminder:CHK-002",
    "reorder-reminder:CHK-003",
    "reorder-reminder:CHK-006"
  ]
}
```

## OQ-shopping-list-013 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-shopping-list-013",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "shopping-list-approval",
  "summary": "Hai option \"Add \"Shopping List\" page\" và \"Add \"Shopping List\" to main menu\" ở Shopping list settings có hiệu ứng gì trong Customer Account (thêm / gỡ trang, thêm / gỡ mục menu), và tắt option có gỡ trang / menu đã thêm không?",
  "check_ids": [
    "shopping-list-approval:CHK-011"
  ]
}
```

## OQ-shopping-list-014 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-shopping-list-014",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "re-approval-after-order",
  "summary": "Khi checkbox re-approval tắt, list Approved có giữ nguyên Approved sau khi đặt order và đặt lại được nhiều lần mà không cần duyệt không? Quyết định Jira DUOS-382 chỉ mô tả trường hợp setting bật.",
  "check_ids": [
    "re-approval-after-order:CHK-002"
  ]
}
```

## OQ-shopping-list-015 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-shopping-list-015",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "save-and-add-to-cart",
  "summary": "Setting \"Save products to shopping list from\" (Product page / Collection page) ẩn / hiện nút lưu trên storefront thế nào: chỉ chọn một trang thì nút chỉ hiện ở trang đó, bỏ chọn cả hai thì nút biến mất?",
  "check_ids": [
    "save-and-add-to-cart:CHK-003"
  ]
}
```

## OQ-shopping-list-016 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-shopping-list-016",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "save-and-add-to-cart",
  "summary": "Khi bật \"Allow customers to save cart as Shopping List\", buyer lưu cart thành shopping list ở đâu, list mới có chứa đúng mọi item và số lượng trong cart không, và khi tắt option thì nút có biến mất không?",
  "check_ids": [
    "save-and-add-to-cart:CHK-004"
  ]
}
```

## OQ-shopping-list-017 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-shopping-list-017",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "merchant-managed-lists",
  "summary": "Checkout page mở từ link chia sẻ của list do merchant tạo hộ có chứa đúng item và số lượng của list không? Người mở có cần đăng nhập tài khoản thuộc company của list không, và buyer company khác hoặc khách chưa login mở link thì thấy gì?",
  "check_ids": [
    "merchant-managed-lists:CHK-004"
  ],
  "related_questions": [
    "Checkout page mở từ link chia sẻ chứa đúng các item và số lượng của list không, và khách có cần đăng nhập tài khoản company không?"
  ]
}
```

## OQ-shopping-list-018 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-shopping-list-018",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "merchant-managed-lists",
  "summary": "Màn list detail trong \"Manage shopping lists\" ở Portal (Jira DUOS-254) cho merchant làm gì với list do buyer tạo (xem, sửa, xoá, duyệt), và cột \"Number of shopping list\" đếm những list nào?",
  "check_ids": [
    "merchant-managed-lists:CHK-006"
  ]
}
```

## OQ-shopping-list-019 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-shopping-list-019",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "merchant-managed-lists",
  "summary": "List do merchant tạo hộ có status gì khi tạo, có xuất hiện trong Customer Account của buyer không, và có phải đi qua luồng duyệt (gửi duyệt / approve) như list do buyer tạo không?",
  "check_ids": [
    "merchant-managed-lists:CHK-007"
  ],
  "related_questions": [
    "List do merchant tạo hộ có phải đi qua luồng duyệt (status, approve) như list do buyer tạo không?"
  ]
}
```

## OQ-shopping-list-020 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-shopping-list-020",
  "type": "OPEN_ISSUE",
  "feature_id": null,
  "summary": "Bộ tài liệu nguồn (QA business rule, QA KB Duos, inventory staging) không có đặc tả API / data model cho các feature: save-and-add-to-cart, merchant-managed-lists. Cần Dev cung cấp endpoint, payload và dữ liệu lưu trữ liên quan nếu QA cần kiểm ở tầng API/DB.",
  "related_feature_ids": [
    "save-and-add-to-cart",
    "merchant-managed-lists"
  ]
}
```
