# Open Questions — admin-panel

Tổng: 99 mục (CONFLICT 2 · OPEN_ISSUE 60 · NEEDS_CONFIRMATION 37). Sinh từ bootstrap DOC_BOOTSTRAP đầu tiên của Mysbox (nguồn: bộ Product KB v1 do dev viết từ source code, 2026-10-16); REFRESH trên staging 2026-10-17 thêm mục mới, ghi `staging_observation` (OBSERVED_CURRENT, không resolve NEEDS_CONFIRMATION/CONFLICT). Mỗi mục là một khối json; `kb_ids` dạng `<feature_key>#KB-xxx` (hoặc `_object-level#KB-xxx` cho tầng object), `check_ids` dạng `<feature_key>:CHK-xxx`.

## OQ-admin-panel-001 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-admin-panel-001",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": null,
  "summary": "Bộ tài liệu nguồn không chỉ định role mặc định cho object này (bootstrap-request để role null): các KB item mang scope.role theo vai trò tài liệu nêu cho từng hành vi, hoặc \"unspecified\" khi tài liệu không nêu. Cần PO/Dev xác nhận ma trận role → quyền thực tế trên production (merchant owner/staff, khách, admin Mysbox theo từng role) trước khi dùng các check PERMISSION làm oracle."
}
```

## OQ-admin-panel-002 — CONFLICT

```json
{
  "oq_id": "OQ-admin-panel-002",
  "type": "CONFLICT",
  "feature_id": "admin-shop-management",
  "summary": "Shop đã gỡ app có hiện trong danh sách Shops của admin panel ở trạng thái mặc định hay không? Mâu thuẫn nội bộ trong tài liệu màn Shops; hai câu chỉ khớp nếu giá trị mặc định của filter Trashed đã lọc bỏ shop đã gỡ, điều tài liệu không nói. Cần xác nhận giá trị mặc định của filter Trashed.",
  "side_a": "Tài liệu \"Màn Shops (danh sách, chi tiết, sửa, action)\" §1. Danh sách: shop đã gỡ app vẫn nằm trong danh sách (dữ liệu được giữ) trừ khi lọc bỏ.",
  "side_b": "Tài liệu \"Màn Shops (danh sách, chi tiết, sửa, action)\" §Câu hỏi thường gặp (cùng tài liệu \"Trạng thái shop và vòng đời\" §3. Gỡ app): shop đã gỡ đang bị filter Trashed ẩn, phải chọn \"with trashed\" mới hiện.",
  "conflict_group": "CONF-admin-panel-02",
  "kb_ids": [
    "admin-shop-management#KB-005",
    "admin-shop-management#KB-006"
  ],
  "check_ids": [
    "admin-shop-management:CHK-002"
  ]
}
```

## OQ-admin-panel-003 — CONFLICT

```json
{
  "oq_id": "OQ-admin-panel-003",
  "type": "CONFLICT",
  "feature_id": "background-jobs-and-queue-monitoring",
  "summary": "Có bao nhiêu lệnh vận hành chỉ có trên nhánh build-staging? Mâu thuẫn nội bộ trong tài liệu job nền: câu hỏi thường gặp nói \"hai lệnh\", bảng lệnh chỉ gắn thẻ chỉ-có-trên-staging cho một lệnh (backfill token hàng đợi của pool refill). Cần dev xác nhận lệnh thứ hai, hoặc \"hai lệnh\" có tính lượt --dry-run và lượt chạy thật của cùng một lệnh hay không.",
  "side_a": "Tài liệu \"Job chạy định kỳ và lệnh vận hành\" §Câu hỏi thường gặp: hai lệnh chỉ có trên staging và dòng lịch kiểm tra nguồn đơn.",
  "side_b": "Tài liệu \"Job chạy định kỳ và lệnh vận hành\" §3. Lệnh artisan: chỉ dòng lệnh backfill token hàng đợi của pool refill mang thẻ chỉ có trên staging.",
  "conflict_group": "CONF-admin-panel-01",
  "kb_ids": [
    "background-jobs-and-queue-monitoring#KB-021",
    "pool-refill#KB-050"
  ],
  "check_ids": [
    "background-jobs-and-queue-monitoring:CHK-013"
  ]
}
```

## OQ-admin-panel-004 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-admin-panel-004",
  "type": "OPEN_ISSUE",
  "feature_id": null,
  "summary": "Hạn chế đã biết theo tài liệu (theo dõi như regression watch; cần xác nhận trạng thái sửa và mức ảnh hưởng): sản phẩm không có công cụ dò lại (đối soát) khi các bộ đếm total opened, resell expires, resell processing at, trạng thái đơn hoặc inventory bị lệch.",
  "kb_ids": [
    "_object-level#KB-016"
  ],
  "check_ids": [
    "admin-box-management:CHK-021",
    "admin-order-inspection-and-retry:CHK-018"
  ]
}
```

## OQ-admin-panel-005 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-admin-panel-005",
  "type": "OPEN_ISSUE",
  "feature_id": "admin-activity-log",
  "summary": "Row action/Retry (không phải CRUD) có được ghi vào Activity log không? — Tài liệu chỉ nói mọi thao tác CRUD; check Activity log cho thao tác retry/sync cần biết phạm vi.",
  "kb_ids": [
    "admin-activity-log#KB-001"
  ]
}
```

## OQ-admin-panel-006 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-admin-panel-006",
  "type": "OPEN_ISSUE",
  "feature_id": "admin-activity-log",
  "summary": "Những thay đổi nào khác trên màn Shops (ngoài Generate recurring payment link), ví dụ sửa capacity hay Security status, được ghi vào Activity log? — Cần để kiểm truy vết thay đổi của nhân viên trên shop.",
  "kb_ids": [
    "admin-activity-log#KB-004"
  ]
}
```

## OQ-admin-panel-007 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-admin-panel-007",
  "type": "OPEN_ISSUE",
  "feature_id": "admin-activity-log",
  "summary": "Role admin nào được xem Activity log? — Thiếu thì không viết được check PERMISSION cho màn Activity.",
  "kb_ids": [
    "admin-activity-log#KB-003"
  ]
}
```

## OQ-admin-panel-008 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-admin-panel-008",
  "type": "OPEN_ISSUE",
  "feature_id": "admin-activity-log",
  "summary": "Tài liệu không nêu route/endpoint hay bảng dữ liệu nào cho Activity log. — Không kiểm được contract API hay dữ liệu lưu."
}
```

## OQ-admin-panel-009 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-admin-panel-009",
  "type": "OPEN_ISSUE",
  "feature_id": "admin-box-management",
  "summary": "Hạn chế đã biết theo tài liệu (theo dõi như regression watch; cần xác nhận trạng thái sửa và mức ảnh hưởng): sau khi xoá dòng ở tab Inventory, box không rút được cho tới khi inventory được dựng lại.",
  "kb_ids": [
    "admin-box-management#KB-054"
  ],
  "check_ids": [
    "admin-box-management:CHK-019"
  ]
}
```

## OQ-admin-panel-010 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-admin-panel-010",
  "type": "OPEN_ISSUE",
  "feature_id": "admin-box-management",
  "summary": "Hạn chế đã biết theo tài liệu (theo dõi như regression watch; cần xác nhận trạng thái sửa và mức ảnh hưởng): với shop gói Free đã chạm trần capacity, việc admin publish lại từng box không tự giải quyết được việc tiếp tục bán vượt capacity.",
  "kb_ids": [
    "admin-box-management#KB-056"
  ],
  "check_ids": [
    "admin-box-management:CHK-020"
  ]
}
```

## OQ-admin-panel-011 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-admin-panel-011",
  "type": "OPEN_ISSUE",
  "feature_id": "admin-box-management",
  "summary": "\"Draft on empty\" và \"Deactivate on empty\" chỉ áp dụng cho picking mode BasePool hay cả Draw? — Phạm vi không rõ, ảnh hưởng ma trận test Configure Tier Settings.",
  "kb_ids": [
    "admin-box-management#KB-010"
  ]
}
```

## OQ-admin-panel-012 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-admin-panel-012",
  "type": "OPEN_ISSUE",
  "feature_id": "admin-box-management",
  "summary": "Unpublish và Delete có hộp xác nhận không? — Chỉ Publish và Hide from recent pulls được nêu có hộp xác nhận.",
  "kb_ids": [
    "admin-box-management#KB-030",
    "admin-box-management#KB-048"
  ]
}
```

## OQ-admin-panel-013 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-admin-panel-013",
  "type": "OPEN_ISSUE",
  "feature_id": "admin-box-management",
  "summary": "Khi Shopify lỗi và publish bị huỷ, admin thấy thông báo gì; sync status có đổi không? — Nhánh lỗi Shopify không có thông điệp cụ thể.",
  "kb_ids": [
    "admin-box-management#KB-029"
  ]
}
```

## OQ-admin-panel-014 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-admin-panel-014",
  "type": "OPEN_ISSUE",
  "feature_id": "admin-box-management",
  "summary": "Edit (sửa JSON settings/bundles) có tạo box version mới không, và JSON không hợp lệ bị chặn thế nào? — Không có expected result cho version và validation của Edit.",
  "kb_ids": [
    "admin-box-management#KB-043"
  ]
}
```

## OQ-admin-panel-015 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-admin-panel-015",
  "type": "OPEN_ISSUE",
  "feature_id": "admin-box-management",
  "summary": "Resync recent pulls và Hide from recent pulls báo hoàn tất/thất bại cho admin thế nào (ngoài nhãn Retry hiding)? — Cả hai chạy qua job; không có tín hiệu hoàn tất được mô tả để kiểm.",
  "kb_ids": [
    "_object-level#KB-014",
    "admin-box-management#KB-036",
    "admin-box-management#KB-040"
  ]
}
```

## OQ-admin-panel-016 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-admin-panel-016",
  "type": "OPEN_ISSUE",
  "feature_id": "admin-box-management",
  "summary": "Quyền publish, publish/unpublish, resync, hide recent pull, update, delete được gán cho role admin nào? — Chỉ có tên quyền theo nút; không có mapping role → quyền.",
  "kb_ids": [
    "admin-box-management#KB-018"
  ]
}
```

## OQ-admin-panel-017 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-admin-panel-017",
  "type": "OPEN_ISSUE",
  "feature_id": "admin-box-management",
  "summary": "'Box Tier hết hàng' được xác định thế nào (mọi pool cạn hay một pool cạn)? — Điều kiện chặn publish 'inventory pools are exhausted' cần định nghĩa biên để dựng data.",
  "kb_ids": [
    "admin-box-management#KB-024"
  ]
}
```

## OQ-admin-panel-018 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-admin-panel-018",
  "type": "OPEN_ISSUE",
  "feature_id": "admin-login-and-roles",
  "summary": "Admin host đúng của từng môi trường là gì, và 'host sai' gồm những trường hợp nào? — Cần để dựng check 'chỉ mở trên admin host' và 404 trên host khác.",
  "kb_ids": [
    "admin-login-and-roles#KB-003",
    "admin-login-and-roles#KB-004"
  ]
}
```

## OQ-admin-panel-019 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-admin-panel-019",
  "type": "OPEN_ISSUE",
  "feature_id": "admin-login-and-roles",
  "summary": "Giới hạn 20 lần/phút tính theo IP, tài khoản Slack hay phiên; chạm giới hạn thì thông báo, mã lỗi và thời gian chờ cụ thể là gì? — Có boundary nhưng thiếu expected result khi chạm boundary; không viết được negative check đầy đủ.",
  "kb_ids": [
    "admin-login-and-roles#KB-025"
  ]
}
```

## OQ-admin-panel-020 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-admin-panel-020",
  "type": "OPEN_ISSUE",
  "feature_id": "admin-login-and-roles",
  "summary": "'Một lần tự thử lại' khi lỗi phía Slack do hệ thống tự làm hay người dùng bấm lại? — Quyết định cách dựng case lỗi Slack.",
  "kb_ids": [
    "admin-login-and-roles#KB-019"
  ]
}
```

## OQ-admin-panel-021 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-admin-panel-021",
  "type": "OPEN_ISSUE",
  "feature_id": "admin-login-and-roles",
  "summary": "Cấu hình role và quyền thực tế trên production là gì, và ranh giới quyền giữa các nhóm nhân viên nội bộ (support, support lead, engineer, billing/partnership, marketing) ra sao? — Ma trận role cho check permission của mọi màn admin phụ thuộc cấu hình này; tài liệu chỉ nêu việc từng nhóm làm, không nêu giới hạn quyền.",
  "kb_ids": [
    "admin-login-and-roles#KB-046",
    "admin-login-and-roles#KB-047"
  ]
}
```

## OQ-admin-panel-022 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-admin-panel-022",
  "type": "OPEN_ISSUE",
  "feature_id": "admin-login-and-roles",
  "summary": "Mã định danh thật của từng quyền (ngoài export, advanced_filter, use_paginated_has_overview) là gì; các màn Plans/Discounts/Promote codes/Admin Users/Roles tách quyền xem/tạo/sửa/xoá riêng hay một quyền cho cả nhóm? — Không ánh xạ được sang tick box trên màn Roles và không biết số tổ hợp permission cần kiểm.",
  "kb_ids": [
    "_object-level#KB-013",
    "admin-login-and-roles#KB-048",
    "admin-login-and-roles#KB-049"
  ]
}
```

## OQ-admin-panel-023 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-admin-panel-023",
  "type": "OPEN_ISSUE",
  "feature_id": "admin-login-and-roles",
  "summary": "So khớp email admin user với email Slack có phân biệt hoa thường/khoảng trắng không? — Ảnh hưởng case 'email lệch = not authorized'.",
  "kb_ids": [
    "admin-login-and-roles#KB-015",
    "admin-login-and-roles#KB-022"
  ]
}
```

## OQ-admin-panel-024 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-admin-panel-024",
  "type": "OPEN_ISSUE",
  "feature_id": "admin-login-and-roles",
  "summary": "Sau khi đã gắn Slack id ở lần đầu, nếu đổi email trên dòng admin user thì còn đăng nhập được không? — Luật 'liên kết Slack đã gắn luôn ưu tiên' gợi ý có, nhưng không được nêu rõ.",
  "kb_ids": [
    "admin-login-and-roles#KB-013",
    "admin-login-and-roles#KB-023"
  ]
}
```

## OQ-admin-panel-025 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-admin-panel-025",
  "type": "OPEN_ISSUE",
  "feature_id": "admin-login-and-roles",
  "summary": "Truy cập trực tiếp URL của màn hình/action không có quyền thì nhận gì (403, 404, chuyển hướng)? — Chỉ biết mục không có quyền bị ẩn; thiếu expected result cho truy cập trực tiếp.",
  "kb_ids": [
    "admin-login-and-roles#KB-028"
  ]
}
```

## OQ-admin-panel-026 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-admin-panel-026",
  "type": "OPEN_ISSUE",
  "feature_id": "admin-login-and-roles",
  "summary": "Role nào được vào Horizon và các màn Development tools; admin không có super_admin mở Horizon thì nhận gì? — Cần để viết test phân quyền Horizon/Development tools.",
  "kb_ids": [
    "admin-login-and-roles#KB-045"
  ]
}
```

## OQ-admin-panel-027 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-admin-panel-027",
  "type": "OPEN_ISSUE",
  "feature_id": "admin-login-and-roles",
  "summary": "Xoá admin user có chấm dứt ngay phiên đang đăng nhập của người đó không; phiên kéo dài bao lâu, có logout không? — Xoá dòng = thu hồi quyền, nhưng không rõ thời điểm có hiệu lực với phiên hiện tại.",
  "kb_ids": [
    "admin-login-and-roles#KB-042"
  ]
}
```

## OQ-admin-panel-028 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-admin-panel-028",
  "type": "OPEN_ISSUE",
  "feature_id": "admin-order-inspection-and-retry",
  "summary": "Hạn chế đã biết theo tài liệu (theo dõi như regression watch; cần xác nhận trạng thái sửa và mức ảnh hưởng): nút Retry Sync không tự kiểm cửa sổ resell, nên có thể bấm khi cửa sổ resell còn mở.",
  "kb_ids": [
    "admin-order-inspection-and-retry#KB-037"
  ],
  "check_ids": [
    "admin-order-inspection-and-retry:CHK-016"
  ]
}
```

## OQ-admin-panel-029 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-admin-panel-029",
  "type": "OPEN_ISSUE",
  "feature_id": "admin-order-inspection-and-retry",
  "summary": "Hạn chế đã biết theo tài liệu (theo dõi như regression watch; cần xác nhận trạng thái sửa và mức ảnh hưởng): thao tác Retry trên admin panel có thể báo thành công nhưng không đổi gì; khi đó cần chuyển engineer xem job lỗi trong Horizon.",
  "kb_ids": [
    "admin-order-inspection-and-retry#KB-070"
  ],
  "check_ids": [
    "admin-order-inspection-and-retry:CHK-017"
  ]
}
```

## OQ-admin-panel-030 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-admin-panel-030",
  "type": "OPEN_ISSUE",
  "feature_id": "admin-order-inspection-and-retry",
  "summary": "Role admin nào giữ quyền 'retry sync' và 'retry physical'; menu Actions hiển thị gì với người không có quyền? — Cần cho kiểm thử phân quyền; tài liệu chỉ nêu tên quyền và 'support'.",
  "kb_ids": [
    "admin-order-inspection-and-retry#KB-006",
    "admin-order-inspection-and-retry#KB-026",
    "admin-order-inspection-and-retry#KB-040"
  ]
}
```

## OQ-admin-panel-031 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-admin-panel-031",
  "type": "OPEN_ISSUE",
  "feature_id": "admin-order-inspection-and-retry",
  "summary": "'Chỉ cho box vật lý' được áp thế nào: Retry Physical bị ẩn, vô hiệu hay báo lỗi với đơn chỉ có box digital; đơn trộn box vật lý và digital xử lý ra sao? — Không có điều kiện hiển thị/thông báo để viết expected result.",
  "kb_ids": [
    "admin-order-inspection-and-retry#KB-041"
  ]
}
```

## OQ-admin-panel-032 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-admin-panel-032",
  "type": "OPEN_ISSUE",
  "feature_id": "admin-order-inspection-and-retry",
  "summary": "Queue chậm (21–100 biến thể) và chế độ bulk (> 100) mất bao lâu; bulk lỗi giữa chừng thì status dòng box là gì? — Không có ngưỡng thời gian/trạng thái để kiểm kết quả retry cho đơn lớn.",
  "kb_ids": [
    "admin-order-inspection-and-retry#KB-034",
    "admin-order-inspection-and-retry#KB-035"
  ]
}
```

## OQ-admin-panel-033 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-admin-panel-033",
  "type": "OPEN_ISSUE",
  "feature_id": "admin-order-inspection-and-retry",
  "summary": "Job tự thêm quà chạy theo 'giờ máy chủ' — múi giờ nào và cấu hình ở đâu? — Mốc chạy định kỳ phụ thuộc múi giờ khi test thời điểm quà lên đơn.",
  "kb_ids": [
    "admin-order-inspection-and-retry#KB-029"
  ]
}
```

## OQ-admin-panel-034 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-admin-panel-034",
  "type": "OPEN_ISSUE",
  "feature_id": "admin-order-inspection-and-retry",
  "summary": "Tìm theo id / id đơn Shopify / id shop là khớp chính xác hay một phần; có tìm theo order name (dạng \"#1042\") không? — Ví dụ tìm theo order name trong khi quy định chỉ liệt kê id.",
  "kb_ids": [
    "admin-order-inspection-and-retry#KB-011",
    "admin-order-inspection-and-retry#KB-012"
  ]
}
```

## OQ-admin-panel-035 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-admin-panel-035",
  "type": "OPEN_ISSUE",
  "feature_id": "admin-order-inspection-and-retry",
  "summary": "Partner Development Status có những giá trị nào và 'shop thật' được xác định thế nào? — Cần để test filter mặc định ẩn đơn của shop development.",
  "kb_ids": [
    "admin-order-inspection-and-retry#KB-020"
  ]
}
```

## OQ-admin-panel-036 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-admin-panel-036",
  "type": "OPEN_ISSUE",
  "feature_id": "admin-order-inspection-and-retry",
  "summary": "Huy hiệu hậu xử lý có những trạng thái nào ngoài Pending/Failed/Succeeded? — Không có danh sách trạng thái đầy đủ.",
  "kb_ids": [
    "admin-order-inspection-and-retry#KB-043",
    "admin-order-inspection-and-retry#KB-048",
    "admin-order-inspection-and-retry#KB-049"
  ]
}
```

## OQ-admin-panel-037 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-admin-panel-037",
  "type": "OPEN_ISSUE",
  "feature_id": "admin-order-inspection-and-retry",
  "summary": "Nút chạy lại webhook ở trang Shop là cho 'order paid' hay webhook khác; khi Retry Handle Order không tạo gì, UI phản hồi gì? — Ảnh hưởng nơi tester tìm action và expected message.",
  "kb_ids": [
    "admin-order-inspection-and-retry#KB-063",
    "admin-order-inspection-and-retry#KB-068"
  ]
}
```

## OQ-admin-panel-038 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-admin-panel-038",
  "type": "OPEN_ISSUE",
  "feature_id": "admin-platform-analytics-and-export",
  "summary": "Hạn chế đã biết theo tài liệu (theo dõi như regression watch; cần xác nhận trạng thái sửa và mức ảnh hưởng): nút \"Metric\" trên trang Analytic trỏ tới địa chỉ trống (nút chết).",
  "kb_ids": [
    "admin-platform-analytics-and-export#KB-009"
  ],
  "check_ids": [
    "admin-platform-analytics-and-export:CHK-006"
  ]
}
```

## OQ-admin-panel-039 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-admin-panel-039",
  "type": "OPEN_ISSUE",
  "feature_id": "admin-platform-analytics-and-export",
  "summary": "Hạn chế đã biết theo tài liệu (theo dõi như regression watch; cần xác nhận trạng thái sửa và mức ảnh hưởng): hai nhóm báo cáo định nghĩa \"shop thật\" hơi khác nhau (một bên theo cờ test của đơn, một bên theo cờ development của shop), nên số toàn nền tảng (trang Analytic của admin, bảng tính báo cáo) có thể lệch nhỏ, không khớp hoàn toàn với số của merchant.",
  "kb_ids": [
    "admin-platform-analytics-and-export#KB-010"
  ],
  "check_ids": [
    "admin-platform-analytics-and-export:CHK-007"
  ]
}
```

## OQ-admin-panel-040 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-admin-panel-040",
  "type": "OPEN_ISSUE",
  "feature_id": "admin-platform-analytics-and-export",
  "summary": "Khoảng ngày của widget App Overview có mặc định/giới hạn không, và chỉ số nào (Total Installs, Active, Free, Paid, Users without Box) phụ thuộc khoảng ngày? — Expected result khi đổi khoảng ngày trên trang Analytic.",
  "kb_ids": [
    "admin-platform-analytics-and-export#KB-003"
  ]
}
```

## OQ-admin-panel-041 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-admin-panel-041",
  "type": "OPEN_ISSUE",
  "feature_id": "admin-platform-analytics-and-export",
  "summary": "Khoảng ngày của Export áp cho cột nào (chỉ \"số box bán trong khoảng\" hay cả danh sách shop), và export có tôn trọng filter đang chọn trên danh sách Shops không? — Quyết dữ liệu mong đợi trong file khi đổi khoảng ngày/filter.",
  "kb_ids": [
    "admin-platform-analytics-and-export#KB-015",
    "admin-platform-analytics-and-export#KB-017"
  ]
}
```

## OQ-admin-panel-042 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-admin-panel-042",
  "type": "OPEN_ISSUE",
  "feature_id": "admin-platform-analytics-and-export",
  "summary": "Ghi chú (tên \"shop\") là tên file CSV hay tên thông báo; link tải có hết hạn không? — Expected result của bước tải file export.",
  "kb_ids": [
    "admin-platform-analytics-and-export#KB-014"
  ]
}
```

## OQ-admin-panel-043 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-admin-panel-043",
  "type": "OPEN_ISSUE",
  "feature_id": "admin-platform-analytics-and-export",
  "summary": "Báo cáo nào bỏ qua shop có plan frozen/cancelled/fraudulent (trang Analytic, export, bảng tính báo cáo)? — Không biết màn hình nào để kiểm ảnh hưởng của trạng thái plan lên số liệu."
}
```

## OQ-admin-panel-044 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-admin-panel-044",
  "type": "OPEN_ISSUE",
  "feature_id": "admin-platform-analytics-and-export",
  "summary": "Tài liệu không nêu route/endpoint hay bảng dữ liệu nào cho Analytic và Export. — Không kiểm được contract API hay dữ liệu lưu; chỉ kiểm được qua giao diện và file."
}
```

## OQ-admin-panel-045 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-admin-panel-045",
  "type": "OPEN_ISSUE",
  "feature_id": "admin-shop-management",
  "summary": "Tên quyền cụ thể cho từng nhóm cột và từng row action/nút (View, Edit, Generate recurring payment link, Sync capacity to metafield, Refresh access token, Retry Handle Order, Export) là gì, và role nào (support, support lead, billing/partnership) giữ quyền nào? — Không dựng được ma trận quyền × role để kiểm.",
  "kb_ids": [
    "admin-shop-management#KB-008",
    "admin-shop-management#KB-010",
    "admin-shop-management#KB-038",
    "admin-shop-management#KB-081"
  ]
}
```

## OQ-admin-panel-046 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-admin-panel-046",
  "type": "OPEN_ISSUE",
  "feature_id": "admin-shop-management",
  "summary": "\"Plan mặc định\" mà shop được đưa về khi tắt cờ development store là plan nào? — Expected state sau khi chuyển dev store thành cửa hàng thật cần plan cụ thể.",
  "kb_ids": [
    "admin-shop-management#KB-076"
  ]
}
```

## OQ-admin-panel-047 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-admin-panel-047",
  "type": "OPEN_ISSUE",
  "feature_id": "admin-shop-management",
  "summary": "Nâng capacity used bằng/vượt selling capacity trên plan trả phí có tác động gì (unpublish, usage fee)? — Chỉ biết hệ quả trên plan Free.",
  "kb_ids": [
    "admin-shop-management#KB-079"
  ]
}
```

## OQ-admin-panel-048 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-admin-panel-048",
  "type": "OPEN_ISSUE",
  "feature_id": "admin-shop-management",
  "summary": "Khi Retry Handle Order không tạo gì (đơn không có box đã publish), UI hiển thị gì (thông báo thành công hay không phản hồi)? — Check cần expected message; tài liệu chỉ nói 'im lặng'.",
  "kb_ids": [
    "admin-shop-management#KB-070"
  ]
}
```

## OQ-admin-panel-049 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-admin-panel-049",
  "type": "OPEN_ISSUE",
  "feature_id": "admin-shop-management",
  "summary": "Những thay đổi nào trên màn Shops được ghi vào Activity log (ví dụ sửa capacity, Security status)? — Cần để kiểm truy vết thay đổi của nhân viên.",
  "kb_ids": [
    "admin-shop-management#KB-036"
  ]
}
```

## OQ-admin-panel-050 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-admin-panel-050",
  "type": "OPEN_ISSUE",
  "feature_id": "admin-shop-management",
  "summary": "Khoảng ngày của dải số trên trang chi tiết tính theo múi giờ nào? — Giá trị 'hôm nay' của Usage Charge/Boxes Sold/Orders phụ thuộc múi giờ.",
  "kb_ids": [
    "admin-shop-management#KB-050",
    "admin-shop-management#KB-051"
  ]
}
```

## OQ-admin-panel-051 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-admin-panel-051",
  "type": "OPEN_ISSUE",
  "feature_id": "admin-shop-management",
  "summary": "Khi Status (Security) tắt, webhook đơn, billing và storefront/reveal của khách bị ảnh hưởng thế nào; enum đầy đủ của Status là gì và Note có bắt buộc không? — Phạm vi chặn và required-ness của Note không được nêu.",
  "kb_ids": [
    "admin-shop-management#KB-084"
  ]
}
```

## OQ-admin-panel-052 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-admin-panel-052",
  "type": "OPEN_ISSUE",
  "feature_id": "admin-shop-management",
  "summary": "Job hằng tuần chuyển token cũ chạy theo chu kỳ/thời điểm nào, và job nền nào làm mới token có thể đua với nút Refresh? — Cần để dựng điều kiện tái hiện đua token và kiểm sự xuất hiện của nút Refresh.",
  "kb_ids": [
    "admin-shop-management#KB-059",
    "admin-shop-management#KB-061"
  ]
}
```

## OQ-admin-panel-053 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-admin-panel-053",
  "type": "OPEN_ISSUE",
  "feature_id": "admin-shop-management",
  "summary": "'Một shop = một dòng' là dòng trong database hay dòng trong danh sách Shops; shop cài lại có tạo dòng mới không? — Ảnh hưởng cách kiểm (DB vs UI) và hành vi reinstall.",
  "kb_ids": [
    "_object-level#KB-011",
    "admin-shop-management#KB-003"
  ]
}
```

## OQ-admin-panel-054 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-admin-panel-054",
  "type": "OPEN_ISSUE",
  "feature_id": "admin-shop-management",
  "summary": "Nút chạy lại webhook ở trang Shop là cho webhook 'order paid' (Retry Handle Order) hay cho webhook khác? — Câu nguồn mơ hồ về đối tượng; ảnh hưởng nơi tester tìm action.",
  "kb_ids": [
    "admin-shop-management#KB-072"
  ]
}
```

## OQ-admin-panel-055 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-admin-panel-055",
  "type": "OPEN_ISSUE",
  "feature_id": "background-jobs-and-queue-monitoring",
  "summary": "Tài liệu job nền nêu: nếu tiến trình scheduler dừng thì mọi job theo lịch dừng im lặng, không có báo hiệu. Đây là hành vi hiện tại đã biết (rủi ro vận hành); có kế hoạch cảnh báo/giám sát không, và QA kiểm như regression watch thế nào?",
  "kb_ids": [
    "background-jobs-and-queue-monitoring#KB-016"
  ],
  "check_ids": [
    "background-jobs-and-queue-monitoring:CHK-011"
  ]
}
```

## OQ-admin-panel-056 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-admin-panel-056",
  "type": "OPEN_ISSUE",
  "feature_id": "background-jobs-and-queue-monitoring",
  "summary": "Tài liệu job nền nêu hàng đợi kẹt hoặc worker dừng là nguyên nhân phần lớn ticket \"trễ\". Đây là vấn đề vận hành đã biết; có cảnh báo khi worker dừng/queue kẹt không?",
  "kb_ids": [
    "background-jobs-and-queue-monitoring#KB-019"
  ],
  "check_ids": [
    "background-jobs-and-queue-monitoring:CHK-012"
  ]
}
```

## OQ-admin-panel-057 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-admin-panel-057",
  "type": "OPEN_ISSUE",
  "feature_id": "background-jobs-and-queue-monitoring",
  "summary": "Admin không có role super_admin truy cập /admin/horizon thì nhận gì (ẩn, 403 hay redirect)? Support có super_admin không? — Cần để viết check phân quyền Horizon.",
  "kb_ids": [
    "background-jobs-and-queue-monitoring#KB-003"
  ]
}
```

## OQ-admin-panel-058 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-admin-panel-058",
  "type": "OPEN_ISSUE",
  "feature_id": "background-jobs-and-queue-monitoring",
  "summary": "Khi scheduler đã dừng, Horizon có luôn cho thấy queue trống, không có job lỗi và không có job lịch chạy (như ví dụ minh hoạ) không? — Dấu hiệu chẩn đoán chỉ có trong ví dụ, chưa phải rule.",
  "kb_ids": [
    "background-jobs-and-queue-monitoring#KB-020"
  ]
}
```

## OQ-admin-panel-059 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-admin-panel-059",
  "type": "OPEN_ISSUE",
  "feature_id": "background-jobs-and-queue-monitoring",
  "summary": "Tài liệu không nêu endpoint hay bảng dữ liệu nào cho Horizon/hàng đợi ngoài route /admin/horizon. — Không kiểm được qua API/data layer."
}
```

## OQ-admin-panel-060 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-admin-panel-060",
  "type": "OPEN_ISSUE",
  "feature_id": "portal-release-version-control",
  "summary": "Ô Embedded Version / Customer Portal Resource có ràng buộc định dạng hay validation nào cho giá trị nhập không (rỗng, ký tự đặc biệt)? — Tài liệu chỉ nói là ô chữ lưu version; không có oracle cho input sai.",
  "kb_ids": [
    "portal-release-version-control#KB-003"
  ]
}
```

## OQ-admin-panel-061 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-admin-panel-061",
  "type": "OPEN_ISSUE",
  "feature_id": "portal-release-version-control",
  "summary": "Với từng nguyên nhân trang khách lỗi (chưa đăng nhập + link thiếu danh tính, shop tắt, đơn của khách khác, cache cũ), trang trả 404, trang trắng hay đẩy sang đăng nhập? — Expected result của từng case truy cập trang khách không xác định được.",
  "kb_ids": [
    "portal-release-version-control#KB-011"
  ],
  "staging_observation": "Ghi chú quan sát staging cho OQ-admin-panel-061: 2026-10-17: Chỉ case khách chưa đăng nhập mở /apps/mysbox/orders không parameters: redirect sang đăng nhập customer account Shopify (không 404/trắng). Request API 401 là do explorer tự dựng. Các case còn lại NOT_OBSERVED.",
  "staging_observation_kb_ids": [
    "portal-release-version-control#KB-012",
    "portal-release-version-control#KB-013"
  ],
  "status_note": "Quan sát staging chỉ là OBSERVED_CURRENT; mục vẫn mở (câu hỏi chưa được trả lời đủ, hoặc cần nguồn thẩm quyền)."
}
```

## OQ-admin-panel-062 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-admin-panel-062",
  "type": "OPEN_ISSUE",
  "feature_id": "portal-release-version-control",
  "summary": "Tài liệu không nêu route/endpoint hay bảng dữ liệu nào cho Embedded Version / Customer Portal Resource. — Không kiểm được contract API hay dữ liệu lưu."
}
```

## OQ-admin-panel-063 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-admin-panel-063",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": null,
  "summary": "Tài liệu nêu giờ job trong playbook là giờ máy chủ, mặc định UTC, nhưng tự khai runtime production (ai chạy scheduler, múi giờ thực tế) chưa xác nhận. Cần dev/PO xác nhận nơi chạy scheduler và múi giờ thực tế trên production, vì mọi expected result về giờ chạy job (auto-unbox, usage charge hằng ngày, sync quà, nhắc Flow) phụ thuộc vào đó.",
  "kb_ids": [
    "_product-level#KB-PL-028"
  ]
}
```

## OQ-admin-panel-064 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-admin-panel-064",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "admin-activity-log",
  "summary": "Activity log có thực sự ghi đăng nhập của nhân viên không? Tài liệu nói cấu hình có bật nhưng tự khai chưa xác nhận và chưa kiểm thử.",
  "kb_ids": [
    "admin-activity-log#KB-005"
  ],
  "check_ids": [
    "admin-activity-log:CHK-007"
  ]
}
```

## OQ-admin-panel-065 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-admin-panel-065",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "admin-activity-log",
  "summary": "Các check P1 (tiền / billing / bốc thăm / refund / store credit / permission / xoá dữ liệu) của feature này có oracle STRONG nhưng chỉ dựa trên tài liệu dev (dev_doc). Theo luật oracle, chúng giữ NEEDS_CONFIRMATION cho tới khi có test_case PASS (hoặc PO/Dev xác nhận trực tiếp) cho đúng hành vi. Danh sách check ở check_ids.",
  "check_ids": [
    "admin-activity-log:CHK-003",
    "admin-activity-log:CHK-005",
    "admin-activity-log:CHK-006"
  ]
}
```

## OQ-admin-panel-066 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-admin-panel-066",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "admin-activity-log",
  "summary": "Một dòng Activity log của thao tác sửa có luôn hiển thị người thực hiện, thời điểm và giá trị cũ, giá trị mới của từng trường đã đổi (như ví dụ sửa selling capacity) không, hay chỉ trong một số trường hợp?",
  "kb_ids": [
    "admin-activity-log#KB-010"
  ],
  "check_ids": [
    "admin-activity-log:CHK-008"
  ]
}
```

## OQ-admin-panel-067 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-admin-panel-067",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "admin-activity-log",
  "summary": "Màn Activity log có tìm hoặc lọc được theo shop không, và có lọc theo nhân viên, loại thao tác hay khoảng ngày không? Tài liệu chỉ nhắc việc tìm log theo shop trong một ví dụ minh hoạ.",
  "kb_ids": [
    "admin-activity-log#KB-009"
  ],
  "check_ids": [
    "admin-activity-log:CHK-009"
  ]
}
```

## OQ-admin-panel-068 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-admin-panel-068",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "admin-activity-log",
  "summary": "Ngoài tạo/sửa/xoá và tạo payment link, các row action khác trên admin panel (như retry, resync, đổi trạng thái bảo mật của shop) có được ghi vào Activity log không? Nếu có thì là những action nào?",
  "check_ids": [
    "admin-activity-log:CHK-010"
  ]
}
```

## OQ-admin-panel-069 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-admin-panel-069",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "admin-box-management",
  "summary": "Ngoài quyền delete, có điều kiện nào chặn xoá box khi box đã có đơn không? Tài liệu tự khai chưa xác nhận.",
  "kb_ids": [
    "admin-box-management#KB-052"
  ],
  "check_ids": [
    "admin-box-management:CHK-022"
  ]
}
```

## OQ-admin-panel-070 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-admin-panel-070",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "admin-box-management",
  "summary": "Các check P1 (tiền / billing / bốc thăm / refund / store credit / permission / xoá dữ liệu) của feature này có oracle STRONG nhưng chỉ dựa trên tài liệu dev (dev_doc). Theo luật oracle, chúng giữ NEEDS_CONFIRMATION cho tới khi có test_case PASS (hoặc PO/Dev xác nhận trực tiếp) cho đúng hành vi. Danh sách check ở check_ids.",
  "check_ids": [
    "admin-box-management:CHK-011",
    "admin-box-management:CHK-018"
  ]
}
```

## OQ-admin-panel-071 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-admin-panel-071",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "admin-box-management",
  "summary": "Thông báo thành công sau khi Publish box từ admin panel có nội dung chính xác là gì?",
  "kb_ids": [
    "admin-box-management#KB-058"
  ],
  "check_ids": [
    "admin-box-management:CHK-023"
  ]
}
```

## OQ-admin-panel-072 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-admin-panel-072",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "admin-login-and-roles",
  "summary": "Giới hạn đăng nhập admin theo Slack workspace được bật ở môi trường nào (đặc biệt production)? Tài liệu login tự khai chưa xác nhận; playbook tài khoản thì nêu sai workspace sẽ báo \"Your Slack account is not authorized.\".",
  "kb_ids": [
    "admin-login-and-roles#KB-026"
  ],
  "check_ids": [
    "admin-login-and-roles:CHK-008"
  ]
}
```

## OQ-admin-panel-073 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-admin-panel-073",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "admin-login-and-roles",
  "summary": "Các check P1 (tiền / billing / bốc thăm / refund / store credit / permission / xoá dữ liệu) của feature này có oracle STRONG nhưng chỉ dựa trên tài liệu dev (dev_doc). Theo luật oracle, chúng giữ NEEDS_CONFIRMATION cho tới khi có test_case PASS (hoặc PO/Dev xác nhận trực tiếp) cho đúng hành vi. Danh sách check ở check_ids.",
  "check_ids": [
    "admin-login-and-roles:CHK-001",
    "admin-login-and-roles:CHK-003",
    "admin-login-and-roles:CHK-004",
    "admin-login-and-roles:CHK-005",
    "admin-login-and-roles:CHK-006",
    "admin-login-and-roles:CHK-007",
    "admin-login-and-roles:CHK-011",
    "admin-login-and-roles:CHK-012",
    "admin-login-and-roles:CHK-015",
    "admin-login-and-roles:CHK-016",
    "admin-login-and-roles:CHK-017",
    "admin-login-and-roles:CHK-018",
    "admin-login-and-roles:CHK-019"
  ]
}
```

## OQ-admin-panel-074 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-admin-panel-074",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "admin-login-and-roles",
  "summary": "Đổi quyền của role có hiệu lực ngay khi nhân viên tải lại trang (không cần đăng nhập lại) như một quy tắc chung không, cả khi thêm lẫn khi bỏ quyền?",
  "kb_ids": [
    "admin-login-and-roles#KB-050",
    "admin-login-and-roles#KB-051"
  ],
  "check_ids": [
    "admin-login-and-roles:CHK-013"
  ]
}
```

## OQ-admin-panel-075 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-admin-panel-075",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "admin-login-and-roles",
  "summary": "Khi nhân viên thiếu quyền mở trực tiếp URL của một màn hình hoặc action trong admin panel, hệ thống trả gì (403, 404 hay chuyển hướng) và có chặn hoàn toàn dữ liệu không?",
  "check_ids": [
    "admin-login-and-roles:CHK-014"
  ]
}
```

## OQ-admin-panel-076 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-admin-panel-076",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "admin-order-inspection-and-retry",
  "summary": "Cột resell processing at của đơn có giá trị chính xác trong những trường hợp nào (đang hoàn/bán lại, bị kẹt), và cờ kẹt được gỡ thế nào? Tài liệu chỉ nói \"thường trống\".",
  "kb_ids": [
    "admin-order-inspection-and-retry#KB-017"
  ],
  "check_ids": [
    "admin-order-inspection-and-retry:CHK-020"
  ]
}
```

## OQ-admin-panel-077 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-admin-panel-077",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "admin-order-inspection-and-retry",
  "summary": "Hệ quả khi support bấm Retry Sync đưa quà vào đơn trong lúc cửa sổ resell còn mở là gì (khách còn bán lại được không, dòng quà có bị gỡ khi bán lại), và có phải quy tắc chỉ được bấm sau khi cửa sổ đóng? Tài liệu tự khai chưa xác nhận.",
  "kb_ids": [
    "admin-order-inspection-and-retry#KB-038",
    "admin-order-inspection-and-retry#KB-039"
  ]
}
```

## OQ-admin-panel-078 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-admin-panel-078",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "admin-order-inspection-and-retry",
  "summary": "Cột auto-unbox time hiển thị gì khi auto-unbox không được cấu hình, và giờ đó tính theo múi giờ nào?",
  "kb_ids": [
    "admin-order-inspection-and-retry#KB-059"
  ],
  "check_ids": [
    "admin-order-inspection-and-retry:CHK-021"
  ]
}
```

## OQ-admin-panel-079 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-admin-panel-079",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "admin-order-inspection-and-retry",
  "summary": "Các check P1 (tiền / billing / bốc thăm / refund / store credit / permission / xoá dữ liệu) của feature này có oracle STRONG nhưng chỉ dựa trên tài liệu dev (dev_doc). Theo luật oracle, chúng giữ NEEDS_CONFIRMATION cho tới khi có test_case PASS (hoặc PO/Dev xác nhận trực tiếp) cho đúng hành vi. Danh sách check ở check_ids.",
  "check_ids": [
    "admin-order-inspection-and-retry:CHK-007",
    "admin-order-inspection-and-retry:CHK-008",
    "admin-order-inspection-and-retry:CHK-010",
    "admin-order-inspection-and-retry:CHK-013",
    "admin-order-inspection-and-retry:CHK-014"
  ]
}
```

## OQ-admin-panel-080 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-admin-panel-080",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "admin-order-inspection-and-retry",
  "summary": "Với đơn chỉ có box digital, Retry Physical Box Post-Processing bị ẩn, vô hiệu hay báo lỗi? Với đơn trộn box vật lý và digital, thao tác này áp dụng cho những dòng nào?",
  "check_ids": [
    "admin-order-inspection-and-retry:CHK-012"
  ]
}
```

## OQ-admin-panel-081 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-admin-panel-081",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "admin-order-inspection-and-retry",
  "summary": "Sau khi Retry Sync đưa quà lên đơn Shopify thành công, status của dòng box có luôn chuyển sang COMPLETED không?",
  "kb_ids": [
    "admin-order-inspection-and-retry#KB-074"
  ],
  "check_ids": [
    "admin-order-inspection-and-retry:CHK-019"
  ]
}
```

## OQ-admin-panel-082 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-admin-panel-082",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "admin-platform-analytics-and-export",
  "summary": "Khi chọn khoảng ngày dài hơn 180 ngày trên trang Analytic của admin panel, hệ thống chặn không cho chọn, tự cắt bớt khoảng ngày hay trả về 0? Khoảng ngày có giá trị mặc định và giới hạn nào, và chỉ số nào của widget App Overview phụ thuộc khoảng ngày?",
  "check_ids": [
    "admin-platform-analytics-and-export:CHK-005"
  ]
}
```

## OQ-admin-panel-083 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-admin-panel-083",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "admin-platform-analytics-and-export",
  "summary": "Khoảng ngày khi export danh sách Shops chỉ áp cho cột số box đã bán trong khoảng hay cũng lọc danh sách shop trong file? Export có tôn trọng filter đang chọn trên danh sách Shops không? Ghi chú tên \"shop\" là tên file hay tên thông báo, và link tải có hết hạn không?",
  "check_ids": [
    "admin-platform-analytics-and-export:CHK-011"
  ]
}
```

## OQ-admin-panel-084 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-admin-panel-084",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "admin-platform-analytics-and-export",
  "summary": "Các check P1 (tiền / billing / bốc thăm / refund / store credit / permission / xoá dữ liệu) của feature này có oracle STRONG nhưng chỉ dựa trên tài liệu dev (dev_doc). Theo luật oracle, chúng giữ NEEDS_CONFIRMATION cho tới khi có test_case PASS (hoặc PO/Dev xác nhận trực tiếp) cho đúng hành vi. Danh sách check ở check_ids.",
  "check_ids": [
    "admin-platform-analytics-and-export:CHK-012",
    "admin-platform-analytics-and-export:CHK-013"
  ]
}
```

## OQ-admin-panel-085 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-admin-panel-085",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "admin-shop-management",
  "summary": "Filter \"Valid Shopify plan\" của màn Shops trong admin panel hiện chỉ có trên nhánh build-staging. Khi nào filter này lên production, và trước đó production có cách nào lọc/ẩn shop có plan Shopify cancelled, fraudulent, frozen không?",
  "kb_ids": [
    "admin-shop-management#KB-031"
  ],
  "check_ids": [
    "admin-shop-management:CHK-008"
  ]
}
```

## OQ-admin-panel-086 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-admin-panel-086",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "admin-shop-management",
  "summary": "Tài liệu màn Shops nói thay đổi lưu từ form Edit \"có thể\" kích hoạt job nền nhưng không nêu section nào kích hoạt job nào. Cần dev xác nhận ánh xạ section → job nền.",
  "kb_ids": [
    "admin-shop-management#KB-037"
  ],
  "check_ids": [
    "admin-shop-management:CHK-026"
  ]
}
```

## OQ-admin-panel-087 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-admin-panel-087",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "admin-shop-management",
  "summary": "Các check P1 (tiền / billing / bốc thăm / refund / store credit / permission / xoá dữ liệu) của feature này có oracle STRONG nhưng chỉ dựa trên tài liệu dev (dev_doc). Theo luật oracle, chúng giữ NEEDS_CONFIRMATION cho tới khi có test_case PASS (hoặc PO/Dev xác nhận trực tiếp) cho đúng hành vi. Danh sách check ở check_ids.",
  "check_ids": [
    "admin-shop-management:CHK-004",
    "admin-shop-management:CHK-005",
    "admin-shop-management:CHK-006",
    "admin-shop-management:CHK-010",
    "admin-shop-management:CHK-015",
    "admin-shop-management:CHK-016",
    "admin-shop-management:CHK-019",
    "admin-shop-management:CHK-020",
    "admin-shop-management:CHK-021",
    "admin-shop-management:CHK-024",
    "admin-shop-management:CHK-025"
  ]
}
```

## OQ-admin-panel-088 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-admin-panel-088",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "background-jobs-and-queue-monitoring",
  "summary": "Tài liệu job nền nói job trên hàng đợi \"thường\" chỉ thử một lần nên job lỗi cần retry thủ công trong Horizon, nhưng không nêu job nào là ngoại lệ có retry tự động và số lần retry. Cần dev xác nhận chính sách retry của từng loại job.",
  "kb_ids": [
    "background-jobs-and-queue-monitoring#KB-008",
    "background-jobs-and-queue-monitoring#KB-009"
  ],
  "check_ids": [
    "background-jobs-and-queue-monitoring:CHK-007"
  ]
}
```

## OQ-admin-panel-089 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-admin-panel-089",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "background-jobs-and-queue-monitoring",
  "summary": "Giờ chạy của các job theo lịch được tài liệu ghi theo đồng hồ máy chủ và \"mặc định coi là UTC\", tài liệu tự khai chưa xác nhận múi giờ scheduler trên production. Cần xác nhận múi giờ thực tế của scheduler production.",
  "kb_ids": [
    "background-jobs-and-queue-monitoring#KB-014"
  ],
  "check_ids": [
    "background-jobs-and-queue-monitoring:CHK-010"
  ]
}
```

## OQ-admin-panel-090 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-admin-panel-090",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "background-jobs-and-queue-monitoring",
  "summary": "Hai lệnh vận hành và dòng lịch kiểm tra nguồn đơn hiện chỉ có trên nhánh build-staging. Khi nào lên production, và hành vi production hiện tại (không có các phần này) là gì?",
  "kb_ids": [
    "background-jobs-and-queue-monitoring#KB-021"
  ]
}
```

## OQ-admin-panel-091 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-admin-panel-091",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "background-jobs-and-queue-monitoring",
  "summary": "Các check P1 (tiền / billing / bốc thăm / refund / store credit / permission / xoá dữ liệu) của feature này có oracle STRONG nhưng chỉ dựa trên tài liệu dev (dev_doc). Theo luật oracle, chúng giữ NEEDS_CONFIRMATION cho tới khi có test_case PASS (hoặc PO/Dev xác nhận trực tiếp) cho đúng hành vi. Danh sách check ở check_ids.",
  "check_ids": [
    "background-jobs-and-queue-monitoring:CHK-002"
  ]
}
```

## OQ-admin-panel-092 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-admin-panel-092",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "portal-release-version-control",
  "summary": "Giá trị Customer Portal Resource gắn với tài nguyên nào của trang khách trên storefront (tên file hay tham số nào thay đổi theo giá trị), để kiểm được trang khách đã tải đúng bản mới sau khi đổi?",
  "kb_ids": [
    "portal-release-version-control#KB-009",
    "portal-release-version-control#KB-010"
  ],
  "check_ids": [
    "portal-release-version-control:CHK-004"
  ],
  "staging_observation": "Ghi chú quan sát staging cho OQ-admin-panel-092: 2026-10-17: Asset trang khách staging là mysbox-proxy.js/css tên cố định trên staging-proxy.mysbox.io, không ?v=/version trong HTML; không đối chiếu được với giá trị Customer Portal Resource (admin panel NOT_COVERED). Host ngoài expected_api_base.",
  "staging_observation_kb_ids": [
    "portal-release-version-control#KB-014"
  ],
  "status_note": "Quan sát staging chỉ là OBSERVED_CURRENT; vẫn cần PO/Dev xác nhận, chưa resolve."
}
```

## OQ-admin-panel-093 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-admin-panel-093",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "portal-release-version-control",
  "summary": "Khi trang proxy của khách bị cache bản cũ sau release, trang my orders / unbox hiển thị lỗi gì (trang trắng, 404 hay đẩy sang đăng nhập)? Đổi Customer Portal Resource có phải cách khắc phục chuẩn không, hay cần thêm bước xoá cache khác?",
  "check_ids": [
    "portal-release-version-control:CHK-006"
  ]
}
```

## OQ-admin-panel-094 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-admin-panel-094",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "portal-release-version-control",
  "summary": "Ô Embedded Version và Customer Portal Resource có ràng buộc định dạng nào cho giá trị nhập không? Lưu giá trị rỗng hoặc có ký tự đặc biệt bị chặn hay được chấp nhận, và nếu được chấp nhận thì portal của merchant và trang khách có còn tải được không?",
  "check_ids": [
    "portal-release-version-control:CHK-007"
  ]
}
```

## OQ-admin-panel-095 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-admin-panel-095",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "portal-release-version-control",
  "summary": "Các check P1 (tiền / billing / bốc thăm / refund / store credit / permission / xoá dữ liệu) của feature này có oracle STRONG nhưng chỉ dựa trên tài liệu dev (dev_doc). Theo luật oracle, chúng giữ NEEDS_CONFIRMATION cho tới khi có test_case PASS (hoặc PO/Dev xác nhận trực tiếp) cho đúng hành vi. Danh sách check ở check_ids.",
  "check_ids": [
    "portal-release-version-control:CHK-008"
  ]
}
```

## OQ-admin-panel-096 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-admin-panel-096",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "portal-release-version-control",
  "summary": "Staging (1 lần, trang danh sách đơn): khách không có danh tính bị chuyển sang trang đăng nhập Shopify. Trang chi tiết đơn /apps/mysbox/orders/<id> không có parameters hoặc có parameters thiếu thông tin thì phản hồi thế nào, và đây có phải hành vi mong đợi cho mọi trang khách không?",
  "kb_ids": [
    "portal-release-version-control#KB-012"
  ],
  "check_ids": [
    "portal-release-version-control:CHK-009"
  ],
  "tags": [
    "staging-observed"
  ]
}
```

## OQ-admin-panel-097 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-admin-panel-097",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "portal-release-version-control",
  "summary": "Host phục vụ asset trang khách trên staging (nằm ngoài expected_api_base) có phải host hợp lệ của staging không, và production dùng host nào? Trên môi trường có version, Customer Portal Resource đổi phần nào của tham chiếu asset (tên file hay tham số), và thời gian cache mong đợi của asset trang khách là bao lâu?",
  "kb_ids": [],
  "check_ids": [
    "portal-release-version-control:CHK-010"
  ],
  "tags": [
    "staging-observed"
  ]
}
```

## OQ-admin-panel-098 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-admin-panel-098",
  "type": "OPEN_ISSUE",
  "feature_id": "portal-release-version-control",
  "summary": "Host staging-proxy.mysbox.io phục vụ asset trang khách có phải host hợp lệ của staging (ngoài expected_api_base) không, và production dùng host nào? — KB-014 tag host_not_in_expected_api_base; ảnh hưởng việc dùng quan sát này cho check môi trường.",
  "kb_ids": [
    "portal-release-version-control#KB-014"
  ],
  "tags": [
    "staging-observed"
  ]
}
```

## OQ-admin-panel-099 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-admin-panel-099",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "portal-release-version-control",
  "summary": "Quan sát staging mới chạm vùng rủi ro cao (quyền truy cập / tiền / billing): Trang khách /apps/mysbox/orders khi không có danh tính; API đơn của trang khách trả 401 khi thiếu danh tính (request tự dựng, không phải app gọi). Item là OBSERVED_CURRENT; cần PO xác nhận đây là hành vi dự kiến trước khi dùng làm expected result.",
  "kb_ids": [
    "portal-release-version-control#KB-012",
    "portal-release-version-control#KB-013"
  ],
  "tags": [
    "staging-observed",
    "risk-flag"
  ]
}
```
