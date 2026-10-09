# Open Questions — Quick order CSV & SKU Order — đặt nhanh theo SKU / CSV ở Customer Account, hành động sau khi buyer tạo order, tải catalog CSV

Tổng: 26 mục. Sinh từ lần bootstrap đầu tiên (DOC_BOOTSTRAP) của Duos B2B, ngày 2026-10-09.

- CONFLICT: 1
- NEEDS_CONFIRMATION: 19
- OPEN_ISSUE: 6

## OQ-quick-order-001 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-quick-order-001",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": null,
  "summary": "Các hành vi Quick order sau chỉ dựa trên nội dung ticket Jira (hoặc tài liệu sản phẩm) do QA tóm tắt, chưa có business rule active hay xác nhận PO/Dev: layout trang Quick order SKU và modal tìm sản phẩm theo DUOS-219 (bỏ progress bar và heading cũ, menu \"More actions\" chứa \"Download catalog\"/\"Bulk add SKUs\", \"Go to order summary\" cạnh \"Clear all\", nút \"Search SKU\", \"Back to SKUs\", modal dùng chung với Shopping list, title/placeholder/nút \"Add\", hiển thị variant); upload CSV theo template và thông báo lỗi file quá lớn (DUOS-17, DUOS-361); hành vi khi bật/tắt \"Allow customers to create Shopping List\" (DUOS-357, comment QA 03/2026); catalog theo Shopify Market (DUOS-181). PO/Dev xác nhận các hành vi này còn đúng ở bản hiện tại để dùng làm kết quả mong đợi?",
  "kb_ids": [
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
    "KB-016",
    "KB-017",
    "KB-030",
    "KB-032",
    "KB-033",
    "KB-034",
    "KB-040"
  ],
  "related_questions": [
    "Bố cục trang Quick order SKU theo Jira DUOS-219 (bỏ progress bar và heading \"Provide the SKUs & quantities you wish to order:\", menu \"More actions\" chứa \"Download catalog\" và \"Bulk add SKUs\", \"Go to order summary\" cạnh \"Clear all\", order summary có \"Back to SKUs\") có còn đúng ở bản hiện tại để dùng làm kết quả mong đợi không?",
    "Quick order SKU và Shopping list có dùng chung một modal tìm sản phẩm không (theo Jira DUOS-219 / DUOS-357 như QA tóm tắt)? Nếu có, thay đổi modal cần được kiểm ở cả hai nơi.",
    "Khi merchant bật \"Allow customers to create Shopping List\" ở Quick order, có đúng là buyer thấy \"Create shopping list\", nút \"Create order\" bị ẩn, và shopping list được tạo từ variant và số lượng đã chọn (theo Jira DUOS-357 / DUOS-219 như QA tóm tắt)? Hành vi này còn đúng ở bản hiện tại không?",
    "Layout trang Quick order SKU và modal tìm sản phẩm theo Jira DUOS-219 (menu \"More actions\", \"Go to order summary\" cạnh \"Clear all\", \"Back to SKUs\", title \"Search products or SKUs\", placeholder, nút \"Add\", hiển thị variant) có còn đúng ở bản hiện tại để dùng làm kết quả mong đợi không?",
    "Lỗi \"tắt Allow customers to create Shopping List thì sau khi tạo order lại hiện Go to checkout thay vì thông báo đã tạo draft order\" đã được sửa trước khi Jira DUOS-357 Done (20/03/2026) chưa?",
    "Hành vi khi bật \"Allow customers to create Shopping List\" (ẩn \"Create order\", vẫn có \"Create shopping list\", tạo shopping list từ lựa chọn CSV/SKU) có còn đúng ở bản hiện tại để dùng làm kết quả mong đợi không?",
    "Tìm sản phẩm/SKU trong Quick order khớp chính xác hay khớp một phần (tên sản phẩm, SKU), và khi không có kết quả thì modal hiển thị gì? Jira DUOS-219 không mô tả.",
    "Modal tìm sản phẩm của Quick order theo Jira DUOS-219 (title \"Search products or SKUs\", placeholder \"Enter product name or SKU\", kết quả hiển thị SKU kèm variant, nút primary \"Add\" thay cho \"Save\") có còn đúng ở bản hiện tại không, và Jira DUOS-265 (chỉ có ảnh) đã thay đổi gì trong layout modal này?",
    "Giới hạn kích thước file CSV khi upload ở Quick order là bao nhiêu và nội dung thông báo lỗi khi file quá lớn là gì? Jira DUOS-361 chỉ thể hiện qua ảnh nên tài liệu QA chưa ghi được giá trị.",
    "Giới hạn kích thước file CSV khi upload ở Quick order là bao nhiêu và nội dung thông báo lỗi khi file quá lớn là gì?"
  ],
  "check_ids": [
    "sku-quick-order:CHK-004",
    "sku-quick-order:CHK-009",
    "order-creation-action:CHK-009",
    "sku-quick-order:CHK-005",
    "sku-quick-order:CHK-006",
    "csv-upload-order:CHK-005"
  ]
}
```

## OQ-quick-order-002 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-quick-order-002",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": null,
  "summary": "Phần lớn hành vi Quick order phía Customer Account (tìm/thêm SKU, upload CSV, tạo order/draft order, tạo shopping list từ lựa chọn) không ghi role áp dụng. Role nào của company (Admin, Senior buyer, Junior buyer, role tuỳ chỉnh) được dùng Quick order SKU và CSV Upload để tạo order, và role nào chỉ được tạo shopping list? Ma trận quyền nhóm \"CSV upload\" / \"Quick order\" do object Roles & permissions sở hữu; câu hỏi này cần trả lời để gán đúng role cho từng hành vi Quick order.",
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
    "KB-016",
    "KB-017",
    "KB-018",
    "KB-026",
    "KB-027",
    "KB-028",
    "KB-030",
    "KB-031",
    "KB-032",
    "KB-033",
    "KB-034",
    "KB-036",
    "KB-037"
  ],
  "related_questions": [
    "Role nào trong company (Admin, Senior buyer, Junior buyer, role tuỳ chỉnh) được dùng Quick order SKU để tạo order, role nào chỉ được tạo shopping list từ lựa chọn, và role không có quyền thấy gì (ẩn trang/block hay báo lỗi khi tạo order)? Ma trận quyền nhóm \"CSV upload\" / \"Quick order\" và tranh chấp quyền Junior buyer với order từ CSV/SKU do object Roles & permissions sở hữu.",
    "Role nào trong company (Admin, Senior buyer, Junior buyer, role tuỳ chỉnh) được dùng Quick order CSV Upload để tạo order, role nào chỉ được tạo shopping list từ lựa chọn, và role không có quyền thấy gì (ẩn trang/block hay báo lỗi khi tạo order)? Ma trận quyền nhóm \"CSV upload\" / \"Quick order\" và tranh chấp quyền Junior buyer với order từ CSV/SKU do object Roles & permissions sở hữu.",
    "Role nào trong company (Admin, Senior buyer, Junior buyer, role tuỳ chỉnh) được dùng Quick order SKU và CSV Upload để tạo order, và role nào chỉ được tạo shopping list từ lựa chọn?"
  ],
  "check_ids": [
    "sku-quick-order:CHK-010",
    "csv-upload-order:CHK-008"
  ]
}
```

## OQ-quick-order-003 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-quick-order-003",
  "type": "OPEN_ISSUE",
  "feature_id": null,
  "summary": "Phía buyer của Quick order (trang Quick order SKU, block CSV Upload trong Customer Account, tạo order/draft order, tải catalog) chưa được quan sát trên staging (không có tài khoản buyer, extension Inactive trên store Free plan). Mọi hành vi phía Customer Account hiện chỉ theo Jira/PO/Dev; cần tài khoản buyer và store đã subscribe module để quan sát.",
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
    "KB-016",
    "KB-017",
    "KB-026",
    "KB-027",
    "KB-028",
    "KB-030",
    "KB-031",
    "KB-032",
    "KB-033",
    "KB-034",
    "KB-042"
  ],
  "related_questions": [
    "Khi có tài khoản buyer trên store đã subscribe module Quick order CSV & SKU Order, các hành vi phía Customer Account mô tả trong ticket có thực sự xảy ra như vậy không?"
  ]
}
```

## OQ-quick-order-004 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-quick-order-004",
  "type": "OPEN_ISSUE",
  "feature_id": null,
  "summary": "Nguồn gốc của Quick order thiếu nội dung: phần Quick order trong tài liệu sản phẩm Duos không có trong bộ tài liệu, nhiều ticket gốc trống (DUOS-2, DUOS-15, DUOS-17, DUOS-181, DUOS-298) và DUOS-265 (cập nhật layout modal tìm sản phẩm) chỉ có ảnh. Hệ quả: chưa biết cấu trúc template CSV (cột, cột bắt buộc, định dạng) và thay đổi layout của DUOS-265. Cần bổ sung tài liệu sản phẩm phần Quick order hoặc mô tả từ PO/Dev.",
  "kb_ids": [
    "KB-016",
    "KB-040",
    "KB-042",
    "KB-008"
  ],
  "related_questions": [
    "Jira DUOS-265 thay đổi layout modal tìm/chọn sản phẩm cụ thể thế nào?",
    "Template CSV của Quick order gồm những cột nào, cột nào bắt buộc, định dạng số lượng / SKU ra sao, và dòng sai (SKU không tồn tại, số lượng không hợp lệ) được xử lý thế nào?"
  ]
}
```

## OQ-quick-order-005 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-quick-order-005",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "sku-quick-order",
  "summary": "Trang cài đặt \"Quick order with SKUs\" trên staging 08/10/2026 có hai checkbox \"Show download catalog button\" và \"Show bulk add SKU button\" chưa có trong tài liệu sản phẩm hay business rule. Khi merchant tắt từng checkbox, nút \"Download catalog\" / \"Bulk add SKUs\" trong menu \"More actions\" của trang Quick order phía buyer bị ẩn hay bị disable, và mặc định của hai checkbox là gì?",
  "kb_ids": [
    "KB-004",
    "KB-014",
    "KB-041"
  ],
  "related_questions": [
    "Khi merchant tắt \"Show bulk add SKU button\" trên trang \"Quick order with SKUs\", nút \"Bulk add SKUs\" trong menu \"More actions\" phía buyer bị ẩn hay bị disable, và mặc định của checkbox là gì?",
    "Khi merchant tắt \"Show download catalog button\" hoặc \"Show bulk add SKU button\", nút tương ứng trong menu \"More actions\" phía buyer bị ẩn hay bị disable, và mặc định của hai checkbox là gì?",
    "Khi merchant tắt \"Show download catalog button\" trên trang \"Quick order with SKUs\", nút \"Download catalog\" trong menu \"More actions\" phía buyer bị ẩn hay bị disable, và mặc định của checkbox là gì?",
    "Khi merchant tắt \"Show download catalog button\", nút \"Download catalog\" phía buyer bị ẩn hay disable, và mặc định của checkbox là gì?"
  ],
  "check_ids": [
    "sku-quick-order:CHK-008",
    "catalog-download:CHK-008"
  ]
}
```

## OQ-quick-order-006 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-quick-order-006",
  "type": "OPEN_ISSUE",
  "feature_id": "csv-upload-order",
  "summary": "Quick order CSV: Jira DUOS-97 (đang To Do) ghi trường hợp số variant trong file CSV vượt giới hạn API chưa được xử lý. Giới hạn API cụ thể là bao nhiêu, hệ thống hiện phản hồi thế nào khi vượt (lỗi, cắt bớt hay tạo order thiếu dòng), và khi nào DUOS-97 được xử lý? Cho tới khi có câu trả lời, checklist chỉ dùng đây làm regression watch, không làm kết quả mong đợi.",
  "kb_ids": [
    "KB-018"
  ],
  "related_questions": [
    "Giới hạn số variant của API khi tạo order từ CSV ở Quick order là bao nhiêu, hệ thống hiện phản hồi thế nào khi vượt (lỗi, cắt bớt hay tạo order thiếu dòng), và hành vi mong đợi sau khi Jira DUOS-97 được xử lý là gì?",
    "Giới hạn số variant của API khi tạo order từ CSV là bao nhiêu, hệ thống hiện phản hồi thế nào khi vượt (lỗi, cắt bớt hay tạo order thiếu dòng), và khi nào Jira DUOS-97 được xử lý?"
  ],
  "check_ids": [
    "csv-upload-order:CHK-006"
  ]
}
```

## OQ-quick-order-007 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-quick-order-007",
  "type": "OPEN_ISSUE",
  "feature_id": "csv-upload-order",
  "summary": "Hành vi của CSV Upload khi file chứa ký tự đặc biệt hoặc công thức (rủi ro CSV/formula injection) chưa được mô tả; case smoke liên quan chưa chạy. Cần PO/Dev mô tả hành vi mong đợi.",
  "kb_ids": [
    "KB-016"
  ],
  "related_questions": [
    "CSV Upload xử lý thế nào khi file chứa ký tự đặc biệt hoặc ô bắt đầu bằng công thức (=, +, -, @)?"
  ]
}
```

## OQ-quick-order-008 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-quick-order-008",
  "type": "OPEN_ISSUE",
  "feature_id": "order-creation-action",
  "summary": "Quick order chế độ \"Create draft order\": comment QA 09–10/03/2026 trên Jira DUOS-357 ghi lỗi khi tắt \"Allow customers to create Shopping List\" thì lại hiện \"Go to checkout\" thay vì thông báo đã tạo draft order. Lỗi này đã được sửa trước khi DUOS-357 Done (20/03/2026) chưa? Tài liệu không ghi trạng thái sửa; checklist giữ đây làm regression watch.",
  "kb_ids": [
    "KB-031"
  ]
}
```

## OQ-quick-order-009 — CONFLICT

```json
{
  "oq_id": "OQ-quick-order-009",
  "type": "CONFLICT",
  "feature_id": "order-creation-action",
  "summary": "Text thông báo sau khi buyer tạo draft order từ Quick order là \"Draft order created\" hay \"Draft order created!\"? Cùng Jira DUOS-357 ghi cả hai dạng và QA business rule Duos ghi text chính xác chưa chốt. Cần PO/Dev chốt một text chuẩn (cho cả thông báo phía buyer và bản dịch mặc định trên Portal).",
  "kb_ids": [
    "KB-028",
    "KB-029"
  ],
  "side_a": "Theo comment QA 09–10/03/2026 trên Jira DUOS-357: thông báo sau khi tạo draft order là \"Draft order created\" (không dấu chấm than).",
  "side_b": "Theo comment QA 09–10/03/2026 trên Jira DUOS-357: Portal được thêm bản dịch \"Draft order created!\" (có dấu chấm than) cho thông báo tạo draft order.",
  "conflict_group": "CONF-DUOS-quick-order-01",
  "related_questions": [
    "Text thông báo sau khi buyer tạo draft order từ Quick order là \"Draft order created\" hay \"Draft order created!\"? Cùng Jira DUOS-357 ghi cả hai dạng và QA business rule ghi text chính xác chưa chốt; cần một text chuẩn cho cả thông báo phía buyer và bản dịch mặc định trên Portal."
  ],
  "check_ids": [
    "order-creation-action:CHK-006"
  ]
}
```

## OQ-quick-order-010 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-quick-order-010",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "order-creation-action",
  "summary": "Nhãn UI theo quan sát staging 08/10/2026 mà QA lead xác nhận lưu (chưa có PO/Dev xác nhận): setting tên \"Action after customer's create order\" dạng radio (Jira DUOS-357 ghi \"Action after customer create order\"), dùng cùng nhãn ở trang Shopping list. PO/Dev xác nhận nhãn này là nhãn chuẩn?",
  "kb_ids": [
    "KB-023",
    "KB-025"
  ],
  "related_questions": [
    "PO/Dev xác nhận nhãn \"Action after customer's create order\" (dạng radio, dùng chung với trang Shopping list) là nhãn chuẩn thay cho \"Action after customer create order\" của Jira DUOS-357?"
  ]
}
```

## OQ-quick-order-011 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-quick-order-011",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "order-creation-action",
  "summary": "Giá trị mặc định của setting \"Action after customer's create order\" ở Quick order (CSV Upload và SKU Order) là gì? QA business rule Duos ghi \"Go to checkout\" theo quan sát staging 08/10/2026, nhưng store khảo sát đang lưu \"Go to checkout\" nên chưa phân biệt được mặc định với giá trị đã chọn.",
  "kb_ids": [
    "KB-024"
  ],
  "related_questions": [
    "Giá trị mặc định của \"Action after customer's create order\" ở Quick order (CSV Upload và SKU Order) trên store mới cài là gì?"
  ]
}
```

## OQ-quick-order-012 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-quick-order-012",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "order-creation-action",
  "summary": "Trên staging 08/10/2026, setting \"Action after customer's create order\" ở trang Shopping list không có lựa chọn \"Create draft order\" (chỉ có ở Quick order CSV Upload và SKU Order). Đây là chủ đích sản phẩm (draft order chỉ áp cho Quick order) hay Shopping list còn thiếu lựa chọn này?",
  "kb_ids": [
    "KB-025",
    "KB-021"
  ],
  "related_questions": [
    "Việc trang cài đặt Shopping list không có \"Create draft order\" là chủ đích sản phẩm (draft order chỉ áp cho Quick order) hay Shopping list còn thiếu lựa chọn này?"
  ]
}
```

## OQ-quick-order-013 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-quick-order-013",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "order-creation-action",
  "summary": "Ý nghĩa nghiệp vụ của hai lựa chọn \"Add to cart\" và \"Go to checkout\" trong setting \"Action after customer's create order\" của Quick order là gì — buyer thấy gì và được đưa tới đâu sau khi bấm tạo order? Hiện chưa có rule nào mô tả nên 2/3 nhánh chưa có kết quả mong đợi.",
  "kb_ids": [
    "KB-022"
  ],
  "related_questions": [
    "Khi chọn \"Add to cart\" hoặc \"Go to checkout\", sau khi bấm tạo order buyer thấy gì và được đưa tới đâu (giỏ hàng, checkout, có giữ lại lựa chọn Quick order không)?",
    "Khi setting hành động sau khi tạo order của Quick order là \"Add to cart\" hoặc \"Go to checkout\", sau khi bấm tạo order buyer thấy gì và được đưa tới đâu (giỏ hàng, checkout), nội dung giỏ/checkout có thay thế hay cộng dồn giỏ hàng hiện có, và lựa chọn Quick order còn được giữ không?"
  ],
  "check_ids": [
    "order-creation-action:CHK-008"
  ]
}
```

## OQ-quick-order-014 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-quick-order-014",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "order-creation-action",
  "summary": "Quick order khi bật \"Allow customers to create Shopping List\" và đặt chế độ \"Create draft order\": sau khi tạo draft order có hiện thông báo thành công không, và nút \"Go to checkout\" (nếu còn) nằm ở đâu? QA KB Duos ghi Need confirm cho nhánh này.",
  "kb_ids": [
    "KB-033",
    "KB-034",
    "KB-027"
  ],
  "related_questions": [
    "Quick order khi bật \"Allow customers to create Shopping List\" và đặt chế độ \"Create draft order\": buyer có tạo được draft order không (khi nút \"Create order\" bị ẩn), sau khi tạo có hiện thông báo thành công không, và nút \"Go to checkout\" (nếu còn) nằm ở đâu?",
    "Text chuẩn của thông báo sau khi buyer tạo draft order từ Quick order là \"Draft order created\" hay \"Draft order created!\" (áp cho cả thông báo phía buyer và bản dịch mặc định trên Portal)?",
    "Khi bật \"Allow customers to create Shopping List\" và đặt chế độ \"Create draft order\", sau khi tạo draft order có hiện thông báo thành công không, và nút \"Go to checkout\" (nếu còn) nằm ở đâu?"
  ],
  "check_ids": [
    "order-creation-action:CHK-010"
  ]
}
```

## OQ-quick-order-015 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-quick-order-015",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "catalog-download",
  "summary": "Config `download_catalog_condition` hỗ trợ những type điều kiện, operator và cách lồng nhóm nào ngoài ví dụ nhóm \"and\" + tag \"not_in\", và khi merchant chưa được set config thì giá trị mặc định là gì (tài liệu ghi mặc định \"—\")?",
  "kb_ids": [
    "KB-039",
    "KB-037"
  ],
  "related_questions": [
    "Config `download_catalog_condition` hỗ trợ những type điều kiện, operator và cách lồng nhóm nào ngoài ví dụ nhóm \"and\" + tag \"not_in\", và khi merchant chưa được set config thì file catalog chứa những sản phẩm nào?"
  ],
  "check_ids": [
    "catalog-download:CHK-004"
  ]
}
```

## OQ-quick-order-016 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-quick-order-016",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "sku-quick-order",
  "summary": "Sau khi merchant dùng \"Add quick order page\" và \"Add quick order to main menu\" trên trang \"Quick order with SKUs\", buyer thấy trang Quick order ở đâu trong Customer Account (trang riêng, mục menu chính, tên mục là gì), và có cần bước nào trong theme editor không?",
  "check_ids": [
    "sku-quick-order:CHK-003"
  ]
}
```

## OQ-quick-order-017 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-quick-order-017",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "sku-quick-order",
  "summary": "\"Bulk add SKUs\" của Quick order nhận dữ liệu theo định dạng nào, có giới hạn số dòng không, và xử lý SKU không tồn tại hoặc SKU trùng ra sao?",
  "check_ids": [
    "sku-quick-order:CHK-007"
  ],
  "related_questions": [
    "\"Bulk add SKUs\" nhận dữ liệu theo định dạng nào và xử lý SKU không tồn tại hoặc trùng ra sao?"
  ]
}
```

## OQ-quick-order-018 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-quick-order-018",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "csv-upload-order",
  "summary": "Sau khi merchant kích hoạt block CSV Upload ở trang Orders qua theme editor, block hiển thị ở đâu và gồm những thành phần nào phía buyer (link tải template, chọn file, nút tạo order)?",
  "check_ids": [
    "csv-upload-order:CHK-002"
  ]
}
```

## OQ-quick-order-019 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-quick-order-019",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "csv-upload-order",
  "summary": "Template CSV của Quick order gồm những cột nào, cột nào bắt buộc, định dạng SKU và số lượng ra sao, và sau khi upload buyer có được xem lại danh sách trước khi tạo order không?",
  "check_ids": [
    "csv-upload-order:CHK-003"
  ]
}
```

## OQ-quick-order-020 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-quick-order-020",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "csv-upload-order",
  "summary": "Khi file CSV của Quick order có dòng sai (SKU không tồn tại, số lượng 0/âm/không phải số, thiếu cột) hoặc sai định dạng/header, hệ thống chặn cả file hay bỏ qua dòng lỗi, và thông báo cho buyer là gì?",
  "check_ids": [
    "csv-upload-order:CHK-004"
  ]
}
```

## OQ-quick-order-021 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-quick-order-021",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "csv-upload-order",
  "summary": "CSV Upload của Quick order xử lý thế nào khi file chứa ký tự đặc biệt hoặc ô bắt đầu bằng công thức (=, +, -, @): từ chối file, làm sạch giá trị hay giữ nguyên?",
  "check_ids": [
    "csv-upload-order:CHK-007"
  ]
}
```

## OQ-quick-order-022 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-quick-order-022",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "order-creation-action",
  "summary": "Draft order tạo từ Quick order (CSV Upload / SKU Order) phải chứa gì trên Shopify: đủ line item và số lượng như buyer chọn, gắn customer và company location nào, áp giá catalog của location hay giá khác, và có tag/note đánh dấu nguồn Quick order không?",
  "check_ids": [
    "order-creation-action:CHK-007"
  ]
}
```

## OQ-quick-order-023 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-quick-order-023",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "catalog-download",
  "summary": "File catalog tải về từ Quick order có khác nhau theo Shopify Market của buyer không (sản phẩm, giá, tiền tệ), và Market được xác định theo company location hay theo buyer?",
  "check_ids": [
    "catalog-download:CHK-005"
  ],
  "related_questions": [
    "File catalog tải về có thực sự khác nhau theo Shopify Market của buyer không, và lấy Market theo company location hay theo buyer?"
  ]
}
```

## OQ-quick-order-024 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-quick-order-024",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "catalog-download",
  "summary": "File \"Download catalog\" của Quick order gồm những cột nào (SKU, tên, variant, giá…), dùng encoding/dấu phân cách nào, và có giới hạn theo catalog của company location hiện tại không?",
  "check_ids": [
    "catalog-download:CHK-006"
  ],
  "related_questions": [
    "File catalog gồm những cột nào và có giới hạn theo catalog của company location hiện tại không?"
  ]
}
```

## OQ-quick-order-025 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-quick-order-025",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": null,
  "summary": "PO/Dev xác nhận hay sửa các hiện trạng sau (ghi nhận trên staging, khảo sát 30/09–08/10/2026), hiện đang được checklist dùng làm kỳ vọng tạm thời nhưng chưa có ai xác nhận là hành vi đúng: csv customer account block activation: Trên staging (khảo sát 08/10/2026, store staging Plus (Free plan), extension Inactive), section \"Customer account settings\" của trang \"Quick · csv settings page identity: Trên staging (khảo sát 08/10/2026, store staging Plus (Free plan), extension Inactive), trang cài đặt Portal \"Quick order with CSV Upload\" l.",
  "kb_ids": [
    "KB-019",
    "KB-020"
  ],
  "check_ids": [
    "csv-upload-order:CHK-001"
  ]
}
```

## OQ-quick-order-026 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-quick-order-026",
  "type": "OPEN_ISSUE",
  "feature_id": null,
  "summary": "Bộ tài liệu nguồn (QA business rule, QA KB Duos, inventory staging) không có đặc tả API / data model cho các feature: sku-quick-order, csv-upload-order, order-creation-action. Cần Dev cung cấp endpoint, payload và dữ liệu lưu trữ liên quan nếu QA cần kiểm ở tầng API/DB.",
  "related_feature_ids": [
    "sku-quick-order",
    "csv-upload-order",
    "order-creation-action"
  ]
}
```
