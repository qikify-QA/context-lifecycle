# Open Questions — B2B Finance & Credit — credit limit theo location (payment term Net), giao dịch & financial ledger, validate credit ở checkout / draft order (Shopify Function), Finance & payment cho buyer

Tổng: 20 mục. Sinh từ lần bootstrap đầu tiên (DOC_BOOTSTRAP) của Duos B2B, ngày 2026-10-09.

- CONFLICT: 0
- NEEDS_CONFIRMATION: 14
- OPEN_ISSUE: 6

## OQ-finance-credit-001 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-finance-credit-001",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "credit-limit-management",
  "summary": "Flow gán credit limit hiện hành ở Portal là gì? Jira DUOS-204 mô tả nút \"+ Add company\" và modal \"Add credit limit\" áp một giá trị cho mọi location của company và ghi đè limit cũ; khảo sát staging 08/10/2026 (store staging Plus, Free plan) không thấy nút và modal đó, bảng liệt kê sẵn mọi company và credit limit sửa inline từng location. Cần Dev/PO xác nhận flow đúng và việc ghi đè limit còn áp dụng không.",
  "kb_ids": [
    "KB-003",
    "KB-005",
    "KB-007",
    "KB-008"
  ],
  "related_questions": [
    "Flow gán credit limit hiện hành ở Portal là gì: nút \"+ Add company\" và modal \"Add credit limit\" áp một giá trị cho mọi location của company và ghi đè limit cũ (Jira DUOS-204), hay ô số inline sửa từng location như staging 08/10/2026? Việc ghi đè limit của mọi location còn áp dụng không, credit limit gán theo location hay theo company, và \"Total credit limit\" của company được tính thế nào?",
    "Flow gán credit limit hiện hành ở Portal là gì: nút \"+ Add company\" + modal \"Add credit limit\" áp một giá trị cho mọi location và ghi đè limit cũ (Jira DUOS-204), hay ô số inline sửa từng location như staging 08/10/2026? Việc ghi đè limit của mọi location còn áp dụng không, và credit limit gán theo location hay theo company?",
    "Mô tả theo Jira DUOS-204 của trang \"Credit management\" (cột Company / Locations / Total credit limit, \"-\" cho company chưa gán, cột Credit limit / Available credit / Outstanding balance theo location, tooltip của Available credit) có còn đúng làm kết quả mong đợi không?"
  ],
  "check_ids": [
    "credit-limit-management:CHK-007"
  ]
}
```

## OQ-finance-credit-002 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-finance-credit-002",
  "type": "OPEN_ISSUE",
  "feature_id": "credit-limit-management",
  "summary": "Known issue nghi vấn chờ Dev: trên staging 08/10/2026 block Duos ở trang location của company trong Shopify admin không hiển thị gì (request admin-extensions company-locations trả 404, không tìm thấy bản ghi company location) và trang Company không thấy block, trong khi rule Jira DUOS-398 yêu cầu hiển thị credit hoặc \"No credit limit has been assigned to this company yet.\". Đây là bug hay do store Free plan / location chưa đồng bộ vào dữ liệu app? Dùng làm regression watch, không làm kết quả mong đợi.",
  "kb_ids": [
    "KB-019",
    "KB-016",
    "KB-017",
    "KB-018"
  ],
  "related_questions": [
    "Block Duos ở trang location của company trong Shopify admin không hiển thị gì trên staging 08/10/2026 (request lấy credit info trả 404, không tìm thấy bản ghi company location) và trang Company không thấy block: đây là bug, hay do store Free plan / location chưa đồng bộ vào dữ liệu app?",
    "Khi location đã có credit limit, block Duos trong Shopify admin hiển thị những trường nào, và block có xuất hiện ở trang Company (không chỉ trang Location) không?"
  ]
}
```

## OQ-finance-credit-003 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-finance-credit-003",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "credit-limit-management",
  "summary": "Mở trang Portal \"Credit management\" trên staging (08/10/2026) phát sinh lỗi console \"TypeError: Cannot read properties of null (reading 'field')\" (ExtensionBundle). Lỗi này có ảnh hưởng chức năng của trang không, và có cần ghi nhận là bug không? Cần Dev xác nhận.",
  "kb_ids": [
    "KB-015"
  ],
  "related_questions": [
    "Lỗi console \"TypeError: Cannot read properties of null (reading 'field')\" khi mở trang \"Credit management\" trên staging có ảnh hưởng chức năng của trang không, có cần ghi nhận là bug không?"
  ]
}
```

## OQ-finance-credit-004 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-finance-credit-004",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "credit-limit-management",
  "summary": "Ma trận quyền của Finance & Credit chưa được tài liệu nêu: (1) staff/role nào của merchant được xem và sửa credit limit ở trang Portal \"Credit management\" và cấu hình trang \"Finance & payment\"; (2) ở Customer Account, role buyer nào (Admin, Senior buyer, Junior buyer, custom role) xem được trang \"Finance & credit\" và Finance & payment overview, và nhóm permission \"Finance & credit\" trên modal role ánh xạ vào hành vi nào; (3) checkout bị chặn theo credit áp cho mọi buyer của location hay tuỳ role. Cần PO xác nhận.",
  "kb_ids": [
    "KB-001",
    "KB-004",
    "KB-005",
    "KB-006",
    "KB-010",
    "KB-012",
    "KB-026",
    "KB-027",
    "KB-028",
    "KB-033",
    "KB-038",
    "KB-046"
  ],
  "related_questions": [
    "Staff/role nào của merchant được xem và sửa credit limit ở trang Portal \"Credit management\", xem lịch sử giao dịch và tải statement của location, và cấu hình trang \"Finance & payment\"?",
    "Staff/role nào của merchant được xem và sửa credit limit ở trang Portal \"Credit management\"?",
    "Chặn checkout theo credit áp cho mọi buyer của location hay tuỳ role (Admin, Senior buyer, Junior buyer, custom role), và nhóm permission \"Finance & credit\" trên modal role có ảnh hưởng tới việc chặn không?",
    "Chặn checkout theo credit áp cho mọi buyer của location hay tuỳ role (Admin, Senior buyer, Junior buyer, custom role)?",
    "Ở Customer Account, role buyer nào (Admin, Senior buyer, Junior buyer, custom role) xem được trang \"Finance & credit\" và Finance & payment overview, và các permission trong nhóm \"Finance & credit\" trên modal role (View finance account, Make payments, View credit limit, View order history, View ledger) ánh xạ vào hành vi nào?",
    "Ở Customer Account, role buyer nào (Admin, Senior buyer, Junior buyer, custom role) xem được trang \"Finance & credit\" và Finance & payment overview, và nhóm permission \"Finance & credit\" trên modal role ánh xạ vào hành vi nào?"
  ],
  "check_ids": [
    "credit-limit-management:CHK-012",
    "checkout-credit-validation:CHK-011",
    "buyer-finance-overview:CHK-010"
  ]
}
```

## OQ-finance-credit-005 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-finance-credit-005",
  "type": "OPEN_ISSUE",
  "feature_id": "credit-limit-management",
  "summary": "Phần credit limit còn thiếu nguồn: giá trị credit limit hợp lệ khi nhập ở Portal (min/max, số thập phân, 0, để trống) không được tài liệu nêu; nội dung tài liệu sản phẩm Duos (docs 09/07/2026) phần Finance & Credit được viện dẫn cho công thức credit và giới hạn payment term không có trong bộ tài liệu; luồng gán/đổi credit limit và block Duos trong Shopify admin khi location đã có limit chưa được quan sát.",
  "kb_ids": [
    "KB-001",
    "KB-002",
    "KB-008",
    "KB-016",
    "KB-017"
  ],
  "related_questions": [
    "Giá trị credit limit nào hợp lệ khi nhập ở Portal (min/max, số thập phân, 0, số âm, để trống) và Portal báo lỗi gì khi giá trị không hợp lệ?",
    "Giá trị credit limit nào hợp lệ khi nhập ở Portal (giới hạn min/max, số thập phân, 0, để trống) và Portal báo lỗi gì khi không hợp lệ?",
    "Ngoài công thức Available credit và giới hạn payment term Net, tài liệu sản phẩm Duos (docs 09/07/2026) phần Finance & Credit còn quy định gì cho credit limit?"
  ],
  "check_ids": [
    "credit-limit-management:CHK-008"
  ]
}
```

## OQ-finance-credit-006 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-finance-credit-006",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "credit-ledger-and-transactions",
  "summary": "Nhãn Operation hiện hành của giao dịch credit trên từng bề mặt là gì? Theo ticket: Portal dùng \"Purchased\" / \"Reimbursed\" / \"Reverted\"; Customer Account dùng \"Order purchased\" / \"Invoice paid\" / \"Credit allocated\" / \"Order canceled\" / \"Credit updated\"; financial ledger ghi \"Order created\" / \"Payment received\" / \"Order edited\" / \"Order refund\" / \"Order cancelled\". Tài liệu QA ghi tên UI thật chưa chốt; cần PO/Dev xác nhận nhãn của từng bề mặt (có thể khác nhau có chủ đích).",
  "kb_ids": [
    "KB-020",
    "KB-027",
    "KB-031",
    "KB-050"
  ],
  "related_questions": [
    "Nhãn Operation hiện hành của giao dịch credit trên từng bề mặt là gì: Portal (\"Purchased\" / \"Reimbursed\" / \"Reverted\" theo ticket), Customer Account (\"Order purchased\" / \"Invoice paid\" / \"Credit allocated\" / \"Order canceled\" / \"Credit updated\") và financial ledger (\"Order created\" / \"Payment received\" / \"Order edited\" / \"Order refund\" / \"Order cancelled\")? Sự khác nhau có chủ đích không, và bảng giao dịch ở Portal có đúng các cột Date, Operation, Credit change, Outstanding balance, Available credit, Credit Limit, Reference không?",
    "Nhãn Operation hiện hành của giao dịch credit trên từng bề mặt là gì: Portal (\"Purchased\" / \"Reimbursed\" / \"Reverted\" theo ticket), Customer Account (\"Order purchased\" / \"Invoice paid\" / \"Credit allocated\" / \"Order canceled\" / \"Credit updated\") và financial ledger (\"Order created\" / \"Payment received\" / \"Order edited\" / \"Order refund\" / \"Order cancelled\")? Sự khác nhau có chủ đích không?",
    "Staff/role nào của merchant được xem lịch sử giao dịch credit và tải statement ở Portal?",
    "Nhãn Operation hiện hành trong lịch sử credit ở Customer Account là gì (ticket ghi \"Order purchased\" / \"Invoice paid\" / \"Credit allocated\" / \"Order canceled\" / \"Credit updated\", khác Portal và ledger)?"
  ],
  "check_ids": [
    "credit-ledger-and-transactions:CHK-008"
  ]
}
```

## OQ-finance-credit-007 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-finance-credit-007",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "credit-ledger-and-transactions",
  "summary": "PO có chốt phạm vi Monthly statement (Epic Jira DUOS-423, To Do) không? Đề xuất Dev 22/09/2026: mỗi location có 1 statement mỗi tháng gồm order đang pending giữa 2 ngày chốt sổ merchant đặt, trạng thái \"Draft\" → \"Issued\" → \"Received\", Issue gửi email kèm PDF, Mark received chuyển order sang paid. Chưa có quyết định PO nên chưa có hành vi nào để kiểm.",
  "related_questions": [
    "Ngoài nút tải statement hiện có ở chi tiết location, PO có chốt phạm vi Monthly statement (Epic Jira DUOS-423, To Do) không — mỗi location 1 statement mỗi tháng giữa 2 ngày chốt sổ, trạng thái \"Draft\" → \"Issued\" → \"Received\", Issue gửi email kèm PDF, Mark received chuyển order sang paid (đề xuất Dev 22/09/2026)?"
  ]
}
```

## OQ-finance-credit-008 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-finance-credit-008",
  "type": "OPEN_ISSUE",
  "feature_id": "credit-ledger-and-transactions",
  "summary": "Ghi nhận giao dịch credit và financial ledger chưa được quan sát với dữ liệu thật (store staging 0 transaction, chưa đổi credit limit), và tài liệu chưa nêu: ledger có loại trừ order test không; ledger bắt đầu ghi khi merchant bật cấu hình hay luôn ghi; \"bước tiếp theo\" không được hỗ trợ với order đã cancel/paid là thao tác nào; đổi payment term sau khi đặt order làm transaction sai ở giá trị nào. Cần Dev/PO bổ sung để viết kết quả mong đợi.",
  "kb_ids": [
    "KB-020",
    "KB-021",
    "KB-022",
    "KB-023",
    "KB-024",
    "KB-025",
    "KB-026",
    "KB-029",
    "KB-030",
    "KB-032"
  ],
  "related_questions": [
    "Financial ledger và giao dịch credit có loại trừ order test không, và ledger bắt đầu ghi khi merchant bật cấu hình (module / extension) hay luôn ghi cho mọi store đã cài app?",
    "Financial ledger có loại trừ order test không, và ledger bắt đầu ghi khi merchant bật cấu hình hay luôn ghi?",
    "Đổi payment term sau khi đặt order làm transaction credit sai ở giá trị nào (Outstanding balance, Available credit, loại transaction) và trong kịch bản nào?",
    "Chuỗi order net term thật (tạo → thanh toán → edit → huỷ → refund) có sinh đúng transaction và cập nhật đúng Outstanding balance / Available credit trên Portal không? Store staging hiện có 0 transaction nên chưa có quan sát nào.",
    "Mô tả theo Jira DUOS-204 của bảng giao dịch ở chi tiết location (các cột Date, Operation, Credit change, Outstanding balance, Available credit, Credit Limit, Reference) và nút tải statement có còn đúng làm kết quả mong đợi không?"
  ],
  "check_ids": [
    "credit-ledger-and-transactions:CHK-010"
  ]
}
```

## OQ-finance-credit-009 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-finance-credit-009",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "checkout-credit-validation",
  "summary": "Sau khi validate credit chuyển sang Shopify Function (Dev 20/05/2026, Jira DUOS-397), buyer thấy thông báo gì ở Cart và Checkout khi giá trị order vượt available credit của location? Banner của checkout extension cũ (Jira DUOS-206) không còn là hành vi hiện hành và tài liệu ghi text hiện tại chưa xác nhận.",
  "kb_ids": [
    "KB-033",
    "KB-034",
    "KB-040"
  ],
  "related_questions": [
    "Sau khi validate credit chuyển sang Shopify Function (Jira DUOS-397), buyer thấy thông báo gì ở Cart và ở Checkout khi giá trị order vượt available credit của location?",
    "Banner draft order vượt credit \"This order has exceeded this location available credit. Available credit: [X] / Credit limit: [Y]\" (theo Jira DUOS-397) có đúng là hành vi hiện hành không, và [X], [Y] lấy theo số liệu nào của location?"
  ],
  "check_ids": [
    "checkout-credit-validation:CHK-007",
    "checkout-credit-validation:CHK-006"
  ]
}
```

## OQ-finance-credit-010 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-finance-credit-010",
  "type": "OPEN_ISSUE",
  "feature_id": "checkout-credit-validation",
  "summary": "Chặn checkout / draft order theo credit chưa được quan sát trên staging (store Free plan, không có tài khoản buyer, chưa duyệt thao tác checkout), và tài liệu chưa nêu: cart total đúng bằng available credit thì chặn hay cho đặt; merchant chưa approve scope cho Shopify Function thì validate hành xử thế nào. Cần bổ sung quan sát trên store Plus có buyer và rule biên từ PO/Dev.",
  "kb_ids": [
    "KB-033",
    "KB-035",
    "KB-037",
    "KB-038",
    "KB-039",
    "KB-040"
  ],
  "related_questions": [
    "Khi giá trị cart / draft order đúng bằng available credit của location thì bị chặn hay được đặt?",
    "Merchant chưa approve scope mới cho Shopify Function thì validate credit có chạy không, và Portal / checkout báo gì?",
    "Validate credit ở Cart / Checkout / draft order có thực sự chặn trên một store Shopify Plus có buyer thật không? Staging chưa quan sát được (store Free plan, không có tài khoản buyer, chưa duyệt thao tác checkout)."
  ]
}
```

## OQ-finance-credit-011 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-finance-credit-011",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "buyer-finance-overview",
  "summary": "Các mô tả chỉ dựa trên ticket (không có PO/Dev xác nhận, không có rule active hoặc rule ghi \"theo ticket\") của Finance & Credit có còn đúng không: (1) trang Customer Account \"Finance & credit\" chỉ hiện nội dung cho buyer thuộc location đã gán credit limit, có overview Credit limit / Available credit / Used credit, bảng lịch sử, ẩn/hiện lịch sử và tải statement (Jira DUOS-205); (2) draft order vượt credit hiện banner \"This order has exceeded this location available credit. Available credit: [X] / Credit limit: [Y]\" (Jira DUOS-397); (3) trang Portal \"Credit management\" theo Jira DUOS-204: danh sách company có cột \"Company\", \"Locations\", \"Total credit limit\", company chưa gán limit hiện \"-\", chi tiết company có cột Credit limit / Available credit / Outstanding balance theo từng location, tooltip của \"Available credit\", chi tiết location có bảng giao dịch (Date, Operation, Credit change, Outstanding balance, Available credit, Credit Limit, Reference) và nút tải statement. Cần PO/Dev xác nhận để dùng làm kết quả mong đợi.",
  "kb_ids": [
    "KB-004",
    "KB-005",
    "KB-010",
    "KB-012",
    "KB-026",
    "KB-028",
    "KB-039",
    "KB-041",
    "KB-042"
  ],
  "related_questions": [
    "Mô tả theo Jira DUOS-205 của trang Customer Account \"Finance & credit\" có còn đúng làm kết quả mong đợi không: overview \"Credit limit\", \"Available credit\", \"Used credit\"; bảng lịch sử với các cột \"Date\", \"Operations\", \"Credit change\", \"Available credit\", \"Credit limit\"; ẩn/hiện lịch sử và tải statement; và nhãn Operations hiện hành là gì?",
    "Buyer thuộc location chưa gán credit limit thấy gì ở Customer Account: mục \"Finance & credit\" có hiện không, và nếu mở trang thì hiển thị nội dung / thông báo gì (Jira DUOS-205 chỉ nói trang hiện nội dung cho buyer thuộc location đã gán limit)?",
    "Mô tả theo Jira DUOS-205 của trang Customer Account \"Finance & credit\" có còn đúng làm kết quả mong đợi không: chỉ hiện nội dung cho buyer thuộc location đã gán credit limit; overview Credit limit / Available credit / Used credit; bảng lịch sử; ẩn/hiện lịch sử và tải statement? Buyer thuộc location chưa gán limit thấy gì?",
    "\"Used credit\" ở Customer Account có đúng là cùng con số với \"Outstanding balance\" ở Portal không, và Credit limit / Available credit ở Customer Account có phải là số liệu cấp location (giống Portal) hay theo phạm vi buyer đang chọn?"
  ],
  "check_ids": [
    "buyer-finance-overview:CHK-005",
    "buyer-finance-overview:CHK-006",
    "buyer-finance-overview:CHK-007"
  ]
}
```

## OQ-finance-credit-012 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-finance-credit-012",
  "type": "OPEN_ISSUE",
  "feature_id": "buyer-finance-overview",
  "summary": "Customer Account \"Finance & credit\" và Finance & payment overview chưa được quan sát trên staging (không có tài khoản buyer, extension chưa kích hoạt), và trang Portal \"Finance & payment\" chưa có business rule: bỏ chọn từng checkbox \"Which data to display:\" ảnh hưởng gì tới Customer Account, mặc định ban đầu là gì. Cần quan sát với buyer thật và rule từ PO.",
  "kb_ids": [
    "KB-041",
    "KB-042",
    "KB-043",
    "KB-044",
    "KB-045",
    "KB-047",
    "KB-049"
  ],
  "related_questions": [
    "Finance & payment overview và trang \"Finance & credit\" hiển thị thế nào với buyer thật khi extension đã kích hoạt (staging chưa có tài khoản buyer, extension chưa kích hoạt)?"
  ]
}
```

## OQ-finance-credit-013 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-finance-credit-013",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "credit-ledger-and-transactions",
  "summary": "Với order đã cancel hoặc đã paid, \"bước xử lý credit tiếp theo\" không được hỗ trợ là những thao tác nào (edit, refund, huỷ lần nữa…), và khi merchant thực hiện các thao tác đó thì transaction / Outstanding balance được kỳ vọng ra sao?",
  "check_ids": [
    "credit-ledger-and-transactions:CHK-005"
  ],
  "related_questions": [
    "Với order đã cancel hoặc đã paid, 'bước xử lý credit tiếp theo' không được hỗ trợ là thao tác nào (edit, refund, huỷ lần nữa…)?"
  ]
}
```

## OQ-finance-credit-014 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-finance-credit-014",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "credit-ledger-and-transactions",
  "summary": "File statement tải từ chi tiết location ở Portal có định dạng gì, gồm những cột nào, bao phủ khoảng thời gian / giao dịch nào, và có phải khớp từng dòng với bảng giao dịch trên Portal không?",
  "check_ids": [
    "credit-ledger-and-transactions:CHK-009"
  ]
}
```

## OQ-finance-credit-015 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-finance-credit-015",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "checkout-credit-validation",
  "summary": "Validate credit so tổng order với Available credit hay với Credit limit, tổng có gồm thuế / phí ship không, và khi tổng đúng bằng Available credit thì order bị chặn hay được đặt?",
  "check_ids": [
    "checkout-credit-validation:CHK-008"
  ]
}
```

## OQ-finance-credit-016 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-finance-credit-016",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "checkout-credit-validation",
  "summary": "Khi merchant chưa approve scope bổ sung cho Shopify Function validate credit, validate có chạy không, checkout / draft order có bị chặn không, và Portal hiển thị lời nhắc approve ở đâu, nội dung gì?",
  "check_ids": [
    "checkout-credit-validation:CHK-010"
  ]
}
```

## OQ-finance-credit-017 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-finance-credit-017",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "buyer-finance-overview",
  "summary": "Buyer KHÔNG có permission \"View the list of orders that all customers have placed\" thấy gì ở Finance & payment overview: chỉ số liệu của riêng mình, có thấy lựa chọn phạm vi không, và số liệu credit cấp location (Credit limit, Available credit) có bị giới hạn không?",
  "check_ids": [
    "buyer-finance-overview:CHK-004"
  ]
}
```

## OQ-finance-credit-018 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-finance-credit-018",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "buyer-finance-overview",
  "summary": "Bỏ chọn từng checkbox \"Which data to display:\" ở Portal \"Finance & payment\" (Account overview, Payment overview, Credit limit overview, Order history, Financial ledger) ảnh hưởng gì tới Customer Account, có lưu ngay hay cần bấm lưu, và mặc định ban đầu của 5 checkbox là gì?",
  "check_ids": [
    "buyer-finance-overview:CHK-009"
  ]
}
```

## OQ-finance-credit-019 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-finance-credit-019",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": null,
  "summary": "PO/Dev xác nhận hay sửa các hiện trạng sau (ghi nhận trên staging, khảo sát 30/09–08/10/2026), hiện đang được checklist dùng làm kỳ vọng tạm thời nhưng chưa có ai xác nhận là hành vi đúng: location detail cards staging: Trên staging (khảo sát 08/10/2026, store staging Plus (Free plan), 0 transaction), trang chi tiết location trong \"Credit management\" có 3 th · plus banner absent on plus staging: Trên staging (khảo sát 08/10/2026, một store Shopify Plus ở Free plan của app), trang Portal \"Credit management\" không hiển thị banner \"Shop.",
  "kb_ids": [
    "KB-013",
    "KB-014"
  ],
  "check_ids": [
    "credit-limit-management:CHK-006",
    "credit-limit-management:CHK-013"
  ]
}
```

## OQ-finance-credit-020 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-finance-credit-020",
  "type": "OPEN_ISSUE",
  "feature_id": null,
  "summary": "Bộ tài liệu nguồn (QA business rule, QA KB Duos, inventory staging) không có đặc tả API / data model cho các feature: checkout-credit-validation, buyer-finance-overview. Cần Dev cung cấp endpoint, payload và dữ liệu lưu trữ liên quan nếu QA cần kiểm ở tầng API/DB.",
  "related_feature_ids": [
    "checkout-credit-validation",
    "buyer-finance-overview"
  ]
}
```
