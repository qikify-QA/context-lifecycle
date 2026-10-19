# Open Questions — merchant-app

Tổng: 106 mục (CONFLICT 7 · OPEN_ISSUE 51 · NEEDS_CONFIRMATION 48). Sinh từ bootstrap DOC_BOOTSTRAP đầu tiên của Mysbox (nguồn: bộ Product KB v1 do dev viết từ source code, 2026-10-16). Mỗi mục là một khối json; `kb_ids` dạng `<feature_key>#KB-xxx` (hoặc `_object-level#KB-xxx` cho tầng object), `check_ids` dạng `<feature_key>:CHK-xxx`.

## OQ-merchant-app-001 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-merchant-app-001",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": null,
  "summary": "Bộ tài liệu nguồn không chỉ định role mặc định cho object này (bootstrap-request để role null): các KB item mang scope.role theo vai trò tài liệu nêu cho từng hành vi, hoặc \"unspecified\" khi tài liệu không nêu. Cần PO/Dev xác nhận ma trận role → quyền thực tế trên production (merchant owner/staff, khách, admin Mysbox theo từng role) trước khi dùng các check PERMISSION làm oracle."
}
```

## OQ-merchant-app-002 — CONFLICT

```json
{
  "oq_id": "OQ-merchant-app-002",
  "type": "CONFLICT",
  "feature_id": "account-kill-switch",
  "summary": "Thông điệp portal của merchant khi công tắc tài khoản (Status Security) tắt không thống nhất giữa các tài liệu; cần dev xác nhận chữ thực tế (hoặc điều kiện hiện từng thông điệp) trước khi viết expected result.",
  "side_a": "Tài liệu \"Trạng thái shop và vòng đời\" §1. Công tắc tài khoản: portal hiện banner \"Access to Mysbox is currently restricted\" kèm nút \"Contact support\".",
  "side_b": "Tài liệu \"Màn Shops (danh sách, chi tiết, sửa, action)\" §3. Form Edit và \"Playbook 5: tài khoản, kết nối, gỡ/cài app và tích hợp\": portal hiện \"App is not available yet. Please wait for the app to be ready or try again later.\"",
  "conflict_group": "CONF-merchant-app-02",
  "kb_ids": [
    "account-kill-switch#KB-003",
    "account-kill-switch#KB-004"
  ],
  "check_ids": [
    "account-kill-switch:CHK-003"
  ]
}
```

## OQ-merchant-app-003 — CONFLICT

```json
{
  "oq_id": "OQ-merchant-app-003",
  "type": "CONFLICT",
  "feature_id": "account-kill-switch",
  "summary": "Phản hồi API của app nhúng khi công tắc tài khoản tắt được mô tả bằng hai thông điệp khác nhau; cần xác nhận status code và nội dung chính xác.",
  "side_a": "Tài liệu \"Trạng thái shop và vòng đời\" §1. Công tắc tài khoản: mọi API của portal trả 403 \"Your account is not activated. Please contact support.\"",
  "side_b": "Tài liệu \"Màn Shops (danh sách, chi tiết, sửa, action)\" §3. Form Edit và \"Playbook 5: tài khoản, kết nối, gỡ/cài app và tích hợp\": app nhúng trả \"access denied\" cho mọi thao tác.",
  "conflict_group": "CONF-merchant-app-03",
  "kb_ids": [
    "account-kill-switch#KB-005",
    "account-kill-switch#KB-006"
  ],
  "check_ids": [
    "account-kill-switch:CHK-004"
  ]
}
```

## OQ-merchant-app-004 — CONFLICT

```json
{
  "oq_id": "OQ-merchant-app-004",
  "type": "CONFLICT",
  "feature_id": "dashboard-and-analytics",
  "summary": "Thông báo cho shop gói Free trên màn Analytics được mô tả khác nhau giữa các tài liệu; cần xác nhận chữ hiển thị thực tế.",
  "side_a": "Tài liệu \"Dashboard và analytics\" §Quy tắc làm đổi con số: màn Analytics báo \"Analytics is not available in the Free plan. Upgrade your plan to unlock detailed performance insights and analytics.\"",
  "side_b": "Tài liệu \"Playbook 5: tài khoản, kết nối, gỡ/cài app và tích hợp\" §Trang Analytics ra 0 hoặc số lạ: merchant plan Free thấy banner \"paid plan required\".",
  "conflict_group": "CONF-merchant-app-04",
  "kb_ids": [
    "dashboard-and-analytics#KB-052",
    "dashboard-and-analytics#KB-053"
  ],
  "check_ids": [
    "dashboard-and-analytics:CHK-025"
  ]
}
```

## OQ-merchant-app-005 — CONFLICT

```json
{
  "oq_id": "OQ-merchant-app-005",
  "type": "CONFLICT",
  "feature_id": "general-settings",
  "summary": "Giá trị nhỏ nhất của Buyback limit time mâu thuẫn ngay trong cùng tài liệu: ghi 'tối thiểu 1' nhưng gợi ý trên ô có 0.5. Cần dev xác nhận form chấp nhận 0.5 giờ hay từ chối (tối thiểu 1), và có nhận số thập phân không — trước khi viết boundary test.",
  "side_a": "Tài liệu \"General Settings\" §Bảng setting: Buyback limit time mặc định 24, tối thiểu 1.",
  "side_b": "Tài liệu \"General Settings\" §Bảng setting: ô Buyback limit time gợi ý \"e.g., 0.5, 1, 24\".",
  "conflict_group": "CONF-merchant-app-05",
  "kb_ids": [
    "general-settings#KB-023",
    "general-settings#KB-024"
  ],
  "check_ids": [
    "general-settings:CHK-011"
  ]
}
```

## OQ-merchant-app-006 — CONFLICT

```json
{
  "oq_id": "OQ-merchant-app-006",
  "type": "CONFLICT",
  "feature_id": "general-settings",
  "summary": "Mốc bắt đầu cửa sổ resell mâu thuẫn ngay trong cùng tài liệu: nhãn UI nói tính từ lúc đơn được tạo, phần mô tả nói tính từ lúc đơn paid. Cần xác nhận mốc thực tế (nếu đơn chỉ được tạo trong app khi nhận webhook paid thì hai mốc trùng nhau). Phía mô tả 'tính từ lúc đơn paid' thuộc shard feature thiết lập resell. Các tài liệu resell khác nói cửa sổ tính từ lúc draw (random quà), mà draw xảy ra khi app nhận webhook đơn paid; cần dev xác nhận mốc bắt đầu thực tế (lúc tạo đơn, lúc paid hay lúc draw) và các mốc này có trùng nhau không.",
  "side_a": "Tài liệu \"General Settings\" §Bảng setting: nhãn \"Duration for customers to resell from order is created\" (hours).",
  "side_b": "Tài liệu \"General Settings\" §Bảng setting: Buyback limit time là độ dài cửa sổ resell, tính từ lúc đơn paid.",
  "conflict_group": "CONF-merchant-app-01",
  "kb_ids": [
    "general-settings#KB-021",
    "resell-setup-and-eligibility#KB-008"
  ],
  "check_ids": [
    "general-settings:CHK-012"
  ]
}
```

## OQ-merchant-app-007 — CONFLICT

```json
{
  "oq_id": "OQ-merchant-app-007",
  "type": "CONFLICT",
  "feature_id": "shop-uninstall-reinstall-lifecycle",
  "summary": "Mâu thuẫn về gói hiệu lực của shop ngay sau khi gỡ app: về Free ngay, hay vẫn giữ quyền lợi / bị tính usage của gói trả phí trong thời gian ân hạn đến hết kỳ đã trả. Một số tài liệu nêu cả hai ý trong cùng một câu (gói về Free, gói trả phí vẫn còn hạn đến hết kỳ) nên có thể là hai khái niệm khác nhau (nhãn gói và subscription), nhưng tài liệu không nói rõ. Cần dev/PO xác nhận: hạn mức box, tính năng trả phí và phí usage áp theo gói nào trong thời gian ân hạn; và nếu cài lại trong thời gian ân hạn thì hạn mức nào áp dụng (tài liệu tự khai là chưa xác nhận). Ngày hết hạn của charge (cuối kỳ 30 ngày đã trả) không bị tranh chấp.",
  "side_a": "Tài liệu \"Trạng thái shop và vòng đời\" §3. Gỡ app (uninstall), cùng \"Domain entities\", \"Tích hợp: tổng quan và cách xác thực request\", \"Webhook mà app nhận\" và \"Playbook 5: tài khoản, kết nối, gỡ/cài app và tích hợp\": khi gỡ app, gói của shop về Free.",
  "side_b": "Tài liệu \"Trạng thái shop và vòng đời\" (bảng hạn mức: shop đã huỷ gói trả phí còn tính năng trả phí đến hết kỳ đã trả; §Câu hỏi thường gặp: shop đã gỡ app vẫn có thể bị tính usage vì subscription còn ân hạn), cùng \"Tích hợp: tổng quan và cách xác thực request\" và \"Playbook 5: tài khoản, kết nối, gỡ/cài app và tích hợp\": gói trả phí vẫn còn hạn đến hết kỳ đã trả.",
  "conflict_group": "CONF-plans-billing-01",
  "kb_ids": [
    "plan-upgrade-downgrade-cancel#KB-091",
    "shop-uninstall-reinstall-lifecycle#KB-001",
    "shop-uninstall-reinstall-lifecycle#KB-002",
    "shop-uninstall-reinstall-lifecycle#KB-003"
  ],
  "check_ids": [
    "shop-uninstall-reinstall-lifecycle:CHK-004",
    "shop-uninstall-reinstall-lifecycle:CHK-005"
  ]
}
```

## OQ-merchant-app-008 — CONFLICT

```json
{
  "oq_id": "OQ-merchant-app-008",
  "type": "CONFLICT",
  "feature_id": "shop-uninstall-reinstall-lifecycle",
  "summary": "Mâu thuẫn giữa hai tài liệu về lịch kiểm nguồn đơn (order source) của shop sau khi gỡ app: bị huỷ khi nhận thông báo app/uninstalled, hay vẫn còn nguyên trên production (việc huỷ chỉ có trên nhánh build-staging). Cần dev xác nhận hành vi production hiện tại.",
  "side_a": "Tài liệu \"Webhook mà app nhận\" §Topic nào, làm gì: khi nhận app/uninstalled, app huỷ lịch kiểm nguồn đơn của shop.",
  "side_b": "Tài liệu \"Trạng thái shop và vòng đời\" §3. Gỡ app (uninstall): trên production lịch thăm dò nguồn đơn của shop vẫn còn nguyên sau khi gỡ app; việc huỷ lịch chỉ có trên nhánh build-staging.",
  "conflict_group": "CONF-merchant-app-06",
  "kb_ids": [
    "shop-uninstall-reinstall-lifecycle#KB-018",
    "shop-uninstall-reinstall-lifecycle#KB-019"
  ],
  "check_ids": [
    "shop-uninstall-reinstall-lifecycle:CHK-014",
    "shop-uninstall-reinstall-lifecycle:CHK-015"
  ]
}
```

## OQ-merchant-app-009 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-merchant-app-009",
  "type": "OPEN_ISSUE",
  "feature_id": "account-kill-switch",
  "summary": "Khi công tắc Tắt, storefront (widget, theme block, block Unbox, store credit) có bị ẩn/chặn không ngoài trang reveal, và widget dùng metafield user_status thế nào? — Hiệu ứng lên storefront chưa xác nhận; chưa có expected result cho case kill switch trên storefront.",
  "kb_ids": [
    "account-kill-switch#KB-007",
    "account-kill-switch#KB-015"
  ]
}
```

## OQ-merchant-app-010 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-merchant-app-010",
  "type": "OPEN_ISSUE",
  "feature_id": "account-kill-switch",
  "summary": "Shop trial vừa cài (chưa nhận thông báo shop update chứa tên plan) có bị nhận diện là trial thiếu tỉnh/thành và chặn portal ngay không? — Điều kiện dựa vào plan 'trial' nhưng tên plan Shopify chỉ đến qua thông báo shop update, không phải lúc cài.",
  "kb_ids": [
    "account-kill-switch#KB-012"
  ]
}
```

## OQ-merchant-app-011 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-merchant-app-011",
  "type": "OPEN_ISSUE",
  "feature_id": "account-kill-switch",
  "summary": "Field Status (Security) trong admin có những giá trị hiển thị nào ngoài OFF, và Note có bắt buộc khi đổi Status không? — Chưa có enum hiển thị đầy đủ hay tính bắt buộc của Note.",
  "kb_ids": [
    "account-kill-switch#KB-018",
    "account-kill-switch#KB-019"
  ]
}
```

## OQ-merchant-app-012 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-merchant-app-012",
  "type": "OPEN_ISSUE",
  "feature_id": "dashboard-and-analytics",
  "summary": "Hạn chế đã biết: không có lệnh dựng lại analytics của merchant (vd sau khi job analytics lỗi hoặc đơn trả lúc mất kết nối không được ghi). Cần xác nhận có kế hoạch sửa hay chấp nhận; checklist chỉ dùng làm regression watch.",
  "kb_ids": [
    "dashboard-and-analytics#KB-069"
  ],
  "check_ids": [
    "dashboard-and-analytics:CHK-035"
  ]
}
```

## OQ-merchant-app-013 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-merchant-app-013",
  "type": "OPEN_ISSUE",
  "feature_id": "dashboard-and-analytics",
  "summary": "Khi chọn khoảng ngày vượt 180 ngày hoặc ngày bắt đầu sớm hơn ngày cài app, server trả lỗi, cắt khoảng, trả 0 hay hiển thị thông báo gì? — Boundary test cần expected result cụ thể cho giá trị vượt giới hạn.",
  "kb_ids": [
    "dashboard-and-analytics#KB-041",
    "dashboard-and-analytics#KB-042",
    "dashboard-and-analytics#KB-067"
  ]
}
```

## OQ-merchant-app-014 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-merchant-app-014",
  "type": "OPEN_ISSUE",
  "feature_id": "dashboard-and-analytics",
  "summary": "Ngưỡng chính xác để hiện \"You almost reach the box limit...\" và \"You have reached the box limit...\", và màu cụ thể của thanh tiến độ? — Tài liệu chỉ nêu thứ tự hai thông điệp và mốc đổi màu 80%.",
  "kb_ids": [
    "dashboard-and-analytics#KB-022",
    "dashboard-and-analytics#KB-023"
  ]
}
```

## OQ-merchant-app-015 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-merchant-app-015",
  "type": "OPEN_ISSUE",
  "feature_id": "dashboard-and-analytics",
  "summary": "Hai con số ở Analytics center trên Dashboard hiển thị gì với gói Free (có hiện \"-\" như bốn thẻ không)? — Quy tắc gói Free chỉ nói bốn thẻ và màn Analytics.",
  "kb_ids": [
    "dashboard-and-analytics#KB-008",
    "dashboard-and-analytics#KB-051"
  ]
}
```

## OQ-merchant-app-016 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-merchant-app-016",
  "type": "OPEN_ISSUE",
  "feature_id": "dashboard-and-analytics",
  "summary": "Các khoảng ngày khác ngoài Today (Yesterday, Last week, Month to date, ...) tính theo múi giờ trình duyệt hay múi giờ shop? — Lệch múi giờ làm đổi số liệu.",
  "kb_ids": [
    "dashboard-and-analytics#KB-038",
    "dashboard-and-analytics#KB-039"
  ]
}
```

## OQ-merchant-app-017 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-merchant-app-017",
  "type": "OPEN_ISSUE",
  "feature_id": "dashboard-and-analytics",
  "summary": "Huỷ đơn/refund từ Shopify ảnh hưởng thế nào tới doanh thu analytics? — Shard chỉ nói resell không bị trừ; refund/cancel chưa có expected result.",
  "kb_ids": [
    "dashboard-and-analytics#KB-005"
  ]
}
```

## OQ-merchant-app-018 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-merchant-app-018",
  "type": "OPEN_ISSUE",
  "feature_id": "dashboard-and-analytics",
  "summary": "Đơn test được nhận biết thế nào (ngoài cờ test của Shopify và đơn preview)? — Cần dựng data kiểm luật loại đơn test.",
  "kb_ids": [
    "dashboard-and-analytics#KB-001",
    "dashboard-and-analytics#KB-044",
    "dashboard-and-analytics#KB-048"
  ]
}
```

## OQ-merchant-app-019 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-merchant-app-019",
  "type": "OPEN_ISSUE",
  "feature_id": "dashboard-and-analytics",
  "summary": "Endpoint nào portal gọi để lấy số liệu Dashboard/Analytics và tham số test:false nằm ở đâu trong request? — Không có route thì không kiểm được contract API của analytics.",
  "kb_ids": [
    "dashboard-and-analytics#KB-043"
  ]
}
```

## OQ-merchant-app-020 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-merchant-app-020",
  "type": "OPEN_ISSUE",
  "feature_id": "dashboard-and-analytics",
  "summary": "Trạng thái extension trên Dashboard có những giá trị nào ngoài \"Active\"? — Chỉ có \"Active\" trong ví dụ; không suy enum được.",
  "kb_ids": [
    "dashboard-and-analytics#KB-014"
  ]
}
```

## OQ-merchant-app-021 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-merchant-app-021",
  "type": "OPEN_ISSUE",
  "feature_id": "dashboard-and-analytics",
  "summary": "Thứ tự khi trùng số lượng trong \"Top selling boxes\", và \"5 box mới nhất\" sắp theo thời điểm tạo nào? — Ảnh hưởng expected result khi kiểm sắp xếp.",
  "kb_ids": [
    "dashboard-and-analytics#KB-010",
    "dashboard-and-analytics#KB-035"
  ]
}
```

## OQ-merchant-app-022 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-merchant-app-022",
  "type": "OPEN_ISSUE",
  "feature_id": "dashboard-and-analytics",
  "summary": "Thao tác Delete trong \"Recently created mystery boxes\" có hộp xác nhận không và hệ quả gì với box đã bán? — Hành động phá huỷ cần expected result.",
  "kb_ids": [
    "dashboard-and-analytics#KB-016"
  ]
}
```

## OQ-merchant-app-023 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-merchant-app-023",
  "type": "OPEN_ISSUE",
  "feature_id": "dashboard-and-analytics",
  "summary": "Sau khi shop gói Free nâng lên gói trả phí, số liệu đã thu thập trong thời gian Free có hiển thị không? — Dữ liệu vẫn được thu thập khi Free nhưng hành vi hiển thị sau khi nâng gói chưa được mô tả.",
  "kb_ids": [
    "dashboard-and-analytics#KB-054"
  ]
}
```

## OQ-merchant-app-024 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-merchant-app-024",
  "type": "OPEN_ISSUE",
  "feature_id": "gdpr-data-requests",
  "summary": "Hạn chế đã biết: handler cho ba webhook GDPR (customers/data_request, customers/redact, shop/redact) chỉ ghi log, không xuất và không xoá dữ liệu; không có công cụ trích/xoá, phải làm tay trong database. Cần PO/dev xác nhận đây là hành vi chấp nhận hay lỗi cần sửa (nghĩa vụ quyền riêng tư); checklist chỉ dùng làm regression watch.",
  "kb_ids": [
    "gdpr-data-requests#KB-001",
    "gdpr-data-requests#KB-002",
    "gdpr-data-requests#KB-003",
    "gdpr-data-requests#KB-008"
  ],
  "check_ids": [
    "gdpr-data-requests:CHK-003",
    "gdpr-data-requests:CHK-004",
    "gdpr-data-requests:CHK-005"
  ]
}
```

## OQ-merchant-app-025 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-merchant-app-025",
  "type": "OPEN_ISSUE",
  "feature_id": "gdpr-data-requests",
  "summary": "Khi nhiều bảng không nối khoá tới khách, làm sao xác định đủ dữ liệu của một khách để xuất/xoá? — Không kiểm được tính đầy đủ của việc xuất/xoá.",
  "kb_ids": [
    "gdpr-data-requests#KB-009"
  ]
}
```

## OQ-merchant-app-026 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-merchant-app-026",
  "type": "OPEN_ISSUE",
  "feature_id": "general-settings",
  "summary": "Mặc định phía server (khi chưa lưu) của \"Store credit app\" là Koin hay None? — Shop chưa từng lưu mục Koin: không biết store credit đang Koin hay None, ảnh hưởng nút trả bằng store credit.",
  "kb_ids": [
    "general-settings#KB-032",
    "general-settings#KB-033"
  ]
}
```

## OQ-merchant-app-027 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-merchant-app-027",
  "type": "OPEN_ISSUE",
  "feature_id": "general-settings",
  "summary": "Khoảng hợp lệ và validation của \"Auto-unbox after\" và \"Trigger before\" (min/max, số nguyên, cho phép 0, để trống)? — Không có boundary để viết test validation mục Auto-Unbox.",
  "kb_ids": [
    "general-settings#KB-014",
    "general-settings#KB-019"
  ]
}
```

## OQ-merchant-app-028 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-merchant-app-028",
  "type": "OPEN_ISSUE",
  "feature_id": "general-settings",
  "summary": "Nguyên tắc chỉ áp cho đơn tạo sau thời điểm lưu có áp cho setting không gắn với lịch đơn (Koin, công tắc Flow, khoá metafield) hay chỉ cho lịch auto-unbox/resell? — Quyết định expected result khi đổi setting với đơn đang mở.",
  "kb_ids": [
    "general-settings#KB-009"
  ]
}
```

## OQ-merchant-app-029 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-merchant-app-029",
  "type": "OPEN_ISSUE",
  "feature_id": "general-settings",
  "summary": "Merchant/staff role nào trên Shopify được mở và lưu General Settings? — Phân quyền portal cho màn này không được nêu.",
  "kb_ids": [
    "_object-level#KB-006",
    "general-settings#KB-001"
  ]
}
```

## OQ-merchant-app-030 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-merchant-app-030",
  "type": "OPEN_ISSUE",
  "feature_id": "general-settings",
  "summary": "Ai bật hide_watermark (merchant, nhân viên, theo gói) và ở đâu? — Quyết định test watermark theo role/plan.",
  "kb_ids": [
    "general-settings#KB-052"
  ]
}
```

## OQ-merchant-app-031 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-merchant-app-031",
  "type": "OPEN_ISSUE",
  "feature_id": "general-settings",
  "summary": "Tag đơn sinh theo mẫu khi vượt giới hạn độ dài thì bị cắt, bỏ qua hay báo lỗi? — Không có hành vi khi vượt giới hạn cho mẫu tag đơn.",
  "kb_ids": [
    "general-settings#KB-045",
    "general-settings#KB-046"
  ]
}
```

## OQ-merchant-app-032 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-merchant-app-032",
  "type": "OPEN_ISSUE",
  "feature_id": "general-settings",
  "summary": "Các gói khác ngoài Free/Early-bird có dùng animation Gacha machine mặc định không, và Free/Early-bird khi cờ tắt thấy gì? — Tài liệu chỉ nêu cờ cho phép Free/Early-bird dùng, không nêu hành vi khi tắt.",
  "kb_ids": [
    "general-settings#KB-040",
    "general-settings#KB-041"
  ]
}
```

## OQ-merchant-app-033 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-merchant-app-033",
  "type": "OPEN_ISSUE",
  "feature_id": "general-settings",
  "summary": "recent_pulls_visible_from dùng định dạng ngày nào và so sánh theo múi giờ nào? — Boundary test lọc feed Recent pulls.",
  "kb_ids": [
    "general-settings#KB-051"
  ]
}
```

## OQ-merchant-app-034 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-merchant-app-034",
  "type": "OPEN_ISSUE",
  "feature_id": "general-settings",
  "summary": "skip_order_line_item_sync và Exclude Test Order nằm ở đâu trong back-office và ai bật được? — Cần biết vị trí và người thao tác để dựng data kiểm.",
  "kb_ids": [
    "dashboard-and-analytics#KB-046",
    "general-settings#KB-042"
  ]
}
```

## OQ-merchant-app-035 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-merchant-app-035",
  "type": "OPEN_ISSUE",
  "feature_id": "install-and-onboarding",
  "summary": "Hạn chế đã biết: con số 10 trong chữ thông báo gói Free được gõ cứng, không lấy từ hạn mức thật, nên chữ có thể lệch với hạn mức thật của gói mặc định. Cần xác nhận có sửa không; checklist chỉ dùng làm regression watch.",
  "kb_ids": [
    "install-and-onboarding#KB-057"
  ],
  "check_ids": [
    "install-and-onboarding:CHK-024"
  ]
}
```

## OQ-merchant-app-036 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-merchant-app-036",
  "type": "OPEN_ISSUE",
  "feature_id": "install-and-onboarding",
  "summary": "Bấm \"Skip\" và xác nhận có đánh dấu onboarding là xong không, và Dashboard/Setup guide/menu trái hiện gì sau đó? — Xác định trạng thái sau khi bỏ qua wizard.",
  "kb_ids": [
    "install-and-onboarding#KB-039",
    "install-and-onboarding#KB-040"
  ]
}
```

## OQ-merchant-app-037 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-merchant-app-037",
  "type": "OPEN_ISSUE",
  "feature_id": "install-and-onboarding",
  "summary": "Onboarding kết thúc khi nào (tạo box đầu tiên hay hoàn tất màn kết) để menu trái hiện đủ màn hình? — Check chuyển trạng thái menu trái cần trigger chính xác.",
  "kb_ids": [
    "_object-level#KB-007",
    "install-and-onboarding#KB-007"
  ]
}
```

## OQ-merchant-app-038 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-merchant-app-038",
  "type": "OPEN_ISSUE",
  "feature_id": "install-and-onboarding",
  "summary": "Tên và nội dung 4 bước onboarding là gì, khi bảng wizard có các bước 1, 2, 2b, 3 và màn kết? — Checklist cần số bước và tên bước thống nhất.",
  "kb_ids": [
    "install-and-onboarding#KB-006",
    "install-and-onboarding#KB-032"
  ]
}
```

## OQ-merchant-app-039 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-merchant-app-039",
  "type": "OPEN_ISSUE",
  "feature_id": "install-and-onboarding",
  "summary": "Sau khi lưu box lần đầu (shop đã có box), nếu merchant tải lại trang ở bước Launch thì wizard còn hiện hay chuyển sang Dashboard? — Hai quy tắc (lưu lần đầu sang bước 3; wizard chỉ hiện khi chưa có box) giao nhau ở biên này.",
  "kb_ids": [
    "install-and-onboarding#KB-033",
    "install-and-onboarding#KB-041"
  ]
}
```

## OQ-merchant-app-040 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-merchant-app-040",
  "type": "OPEN_ISSUE",
  "feature_id": "install-and-onboarding",
  "summary": "Lựa chọn Physical/Digital ở bước 1 có ánh xạ chính thức với thẻ \"Sealed box\"/\"Instantly opening box\" không, và ảnh hưởng thế nào tới box tạo ở bước 2b? — Tài liệu đặt hai cặp tên cạnh nhau nhưng không phát biểu ánh xạ.",
  "kb_ids": [
    "install-and-onboarding#KB-028",
    "install-and-onboarding#KB-029"
  ]
}
```

## OQ-merchant-app-041 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-merchant-app-041",
  "type": "OPEN_ISSUE",
  "feature_id": "install-and-onboarding",
  "summary": "Danh sách đầy đủ các trường của bản ghi shop lấy từ Shopify lúc cài, có gồm múi giờ không? — Mục tiêu feature kỳ vọng dữ liệu shop (tên, tiền tệ, múi giờ) lấy đúng; danh sách trường lúc cài được ghi là không đầy đủ và không nêu múi giờ.",
  "kb_ids": [
    "install-and-onboarding#KB-021",
    "install-and-onboarding#KB-063"
  ]
}
```

## OQ-merchant-app-042 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-merchant-app-042",
  "type": "OPEN_ISSUE",
  "feature_id": "install-and-onboarding",
  "summary": "Chuỗi topic chính xác của các webhook đăng ký lúc cài và tên của 3 webhook quyền riêng tư bắt buộc? — Tester cần topic để đối chiếu đăng ký webhook sau khi cài.",
  "kb_ids": [
    "install-and-onboarding#KB-024",
    "install-and-onboarding#KB-025"
  ]
}
```

## OQ-merchant-app-043 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-merchant-app-043",
  "type": "OPEN_ISSUE",
  "feature_id": "install-and-onboarding",
  "summary": "Dashboard phát hiện app embed/block đã cài như thế nào và hiển thị gì khi chưa cài? — Expected result cho trạng thái setup trên Dashboard.",
  "kb_ids": [
    "install-and-onboarding#KB-048",
    "install-and-onboarding#KB-053"
  ]
}
```

## OQ-merchant-app-044 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-merchant-app-044",
  "type": "OPEN_ISSUE",
  "feature_id": "install-and-onboarding",
  "summary": "Mục \"Set up your first mystery box\" có tính box ở trạng thái nháp/không Active không? — Biên của điều kiện hoàn thành Setup guide (\"box bất kỳ\").",
  "kb_ids": [
    "install-and-onboarding#KB-050"
  ]
}
```

## OQ-merchant-app-045 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-merchant-app-045",
  "type": "OPEN_ISSUE",
  "feature_id": "install-and-onboarding",
  "summary": "Hai block checkout trong bảng App extension status có tên nguyên văn là gì? — Cần tên để kiểm huy hiệu Installed/Not Installed.",
  "kb_ids": [
    "install-and-onboarding#KB-054"
  ]
}
```

## OQ-merchant-app-046 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-merchant-app-046",
  "type": "OPEN_ISSUE",
  "feature_id": "install-and-onboarding",
  "summary": "Ẩn thẻ Setup guide 30 ngày tính theo shop hay chỉ theo trình duyệt, và có cách hiện lại sớm hơn không? — Biên thời gian và phạm vi ẩn của thẻ.",
  "kb_ids": [
    "install-and-onboarding#KB-052"
  ]
}
```

## OQ-merchant-app-047 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-merchant-app-047",
  "type": "OPEN_ISSUE",
  "feature_id": "install-and-onboarding",
  "summary": "App trừ tồn kho món thưởng của sealed box bằng cơ chế nào khi quyền Inventory/fulfillment orders chỉ là quyền đọc? — Mục đích trừ tồn kho không khớp với quyền đọc; tester cần cơ chế thật.",
  "kb_ids": [
    "install-and-onboarding#KB-019"
  ]
}
```

## OQ-merchant-app-048 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-merchant-app-048",
  "type": "OPEN_ISSUE",
  "feature_id": "install-and-onboarding",
  "summary": "Khi merchant từ chối màn hình xin quyền của Shopify lúc cài thì điều gì xảy ra? — Luồng lỗi của cài đặt chưa có expected result.",
  "kb_ids": [
    "install-and-onboarding#KB-002"
  ]
}
```

## OQ-merchant-app-049 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-merchant-app-049",
  "type": "OPEN_ISSUE",
  "feature_id": "shop-connection-and-reauth",
  "summary": "Lỗi đã biết: bấm \"Refresh access token\" trong admin nhiều lần, hoặc thao tác này chạy đua với job nền làm mới token, khiến một bên bị lỗi (tài liệu gọi là vô hại vì khoá làm mới chỉ dùng một lần). Cần xác nhận có fix/kế hoạch không, và trạng thái cờ cần cấp quyền lại sau khi một bên lỗi.",
  "kb_ids": [
    "shop-connection-and-reauth#KB-033"
  ],
  "check_ids": [
    "shop-connection-and-reauth:CHK-026"
  ]
}
```

## OQ-merchant-app-050 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-merchant-app-050",
  "type": "OPEN_ISSUE",
  "feature_id": "shop-connection-and-reauth",
  "summary": "Nội dung, tiêu đề và tên template theo môi trường của email \"reconnect the app\"; email có gửi lại nếu cờ bị xoá rồi đặt lại không? — Không có oracle cho email và không kiểm được việc gửi ở staging/production.",
  "kb_ids": [
    "shop-connection-and-reauth#KB-020",
    "shop-connection-and-reauth#KB-021"
  ]
}
```

## OQ-merchant-app-051 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-merchant-app-051",
  "type": "OPEN_ISSUE",
  "feature_id": "shop-connection-and-reauth",
  "summary": "Merchant từ chối màn xin quyền của Shopify lúc cài thì hệ thống làm gì? — Luồng lỗi của cài đặt chưa có expected result.",
  "kb_ids": [
    "shop-connection-and-reauth#KB-037"
  ]
}
```

## OQ-merchant-app-052 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-merchant-app-052",
  "type": "OPEN_ISSUE",
  "feature_id": "shop-connection-and-reauth",
  "summary": "Trong 10 ngày gia hạn token lỗi trước khi phải cấp quyền lại, merchant có thấy thông báo gì không? — Ảnh hưởng trải nghiệm re-auth và test luồng token hết hạn.",
  "kb_ids": [
    "shop-connection-and-reauth#KB-008"
  ]
}
```

## OQ-merchant-app-053 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-merchant-app-053",
  "type": "OPEN_ISSUE",
  "feature_id": "shop-connection-and-reauth",
  "summary": "'Shop không liên lạc được nhiều tuần' là bao lâu, và cờ cần cấp quyền lại được đặt đúng lúc nào? — Không có boundary để dựng case chuyển sang cần re-auth.",
  "kb_ids": [
    "shop-connection-and-reauth#KB-009",
    "shop-connection-and-reauth#KB-010"
  ]
}
```

## OQ-merchant-app-054 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-merchant-app-054",
  "type": "OPEN_ISSUE",
  "feature_id": "shop-connection-and-reauth",
  "summary": "Shop còn 'đã cài' mà token chết được phát hiện thế nào (thành phần nào bật cờ, khi nào)? — Tài liệu chỉ nêu hệ quả, không nêu cơ chế.",
  "kb_ids": [
    "shop-connection-and-reauth#KB-041"
  ]
}
```

## OQ-merchant-app-055 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-merchant-app-055",
  "type": "OPEN_ISSUE",
  "feature_id": "shop-uninstall-reinstall-lifecycle",
  "summary": "Lỗi đã biết: nếu thông báo gỡ app bị mất, shop vẫn ở trạng thái INSTALLED trong khi token đã chết; job nền của shop thất bại dần với lỗi re-auth cho tới lần đăng nhập kế tiếp. Cần xác nhận có cơ chế phát hiện / tự sửa trạng thái không, và ai bật cờ cấp quyền lại vào lúc nào.",
  "kb_ids": [
    "shop-uninstall-reinstall-lifecycle#KB-022"
  ],
  "check_ids": [
    "shop-uninstall-reinstall-lifecycle:CHK-013"
  ]
}
```

## OQ-merchant-app-056 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-merchant-app-056",
  "type": "OPEN_ISSUE",
  "feature_id": "shop-uninstall-reinstall-lifecycle",
  "summary": "'Dọn dữ liệu liên quan' khi nhận app/uninstalled gồm những dữ liệu nào? — Tài liệu chỉ nói box/đơn được giữ; không biết dữ liệu nào bị xoá để kiểm.",
  "kb_ids": [
    "shop-uninstall-reinstall-lifecycle#KB-017"
  ]
}
```

## OQ-merchant-app-057 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-merchant-app-057",
  "type": "OPEN_ISSUE",
  "feature_id": "shop-uninstall-reinstall-lifecycle",
  "summary": "Email capacity khi chạm trần được gửi một lần hay mỗi lần vượt; khi nào reset? — Kiểm số lượng email gửi khi cài lại vượt hạn mức.",
  "kb_ids": [
    "shop-uninstall-reinstall-lifecycle#KB-034"
  ]
}
```

## OQ-merchant-app-058 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-merchant-app-058",
  "type": "OPEN_ISSUE",
  "feature_id": "shop-uninstall-reinstall-lifecycle",
  "summary": "Giá trị mặc định của bộ lọc Trashed khi mở màn Shops là gì? — Quyết định shop đã gỡ có hiện trong danh sách mặc định không.",
  "kb_ids": [
    "shop-uninstall-reinstall-lifecycle#KB-043"
  ]
}
```

## OQ-merchant-app-059 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-merchant-app-059",
  "type": "OPEN_ISSUE",
  "feature_id": "shop-uninstall-reinstall-lifecycle",
  "summary": "shop/update có chống xử lý trùng không; 'thử lại tối đa 3 lần' là retry của job hay chống trùng? — Không suy được hành vi khi Shopify giao trùng thông báo.",
  "kb_ids": [
    "shop-uninstall-reinstall-lifecycle#KB-052"
  ]
}
```

## OQ-merchant-app-060 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-merchant-app-060",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": null,
  "summary": "Các phát biểu mức object này không nêu vai trò áp dụng (role để 'unspecified' vì yêu cầu bootstrap không cố định role); cần xác nhận vai trò/bề mặt áp dụng trước khi dùng làm oracle theo role.",
  "kb_ids": [
    "_object-level#KB-001",
    "_object-level#KB-011",
    "_object-level#KB-012",
    "_object-level#KB-013",
    "_object-level#KB-016",
    "_object-level#KB-019"
  ]
}
```

## OQ-merchant-app-061 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-merchant-app-061",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "account-kill-switch",
  "summary": "Tài liệu ghi kèm 'chưa xác nhận' rằng webhook không đi qua lớp chặn của công tắc tài khoản; cần dev xác nhận webhook (orders/paid, shop/update...) có bỏ qua công tắc hay không.",
  "kb_ids": [
    "account-kill-switch#KB-011"
  ]
}
```

## OQ-merchant-app-062 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-merchant-app-062",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "account-kill-switch",
  "summary": "Các check P1 (tiền / billing / bốc thăm / refund / store credit / permission / xoá dữ liệu) của feature này có oracle STRONG nhưng chỉ dựa trên tài liệu dev (dev_doc). Theo luật oracle, chúng giữ NEEDS_CONFIRMATION cho tới khi có test_case PASS (hoặc PO/Dev xác nhận trực tiếp) cho đúng hành vi. Danh sách check ở check_ids.",
  "check_ids": [
    "account-kill-switch:CHK-002",
    "account-kill-switch:CHK-005",
    "account-kill-switch:CHK-006",
    "account-kill-switch:CHK-007",
    "account-kill-switch:CHK-008",
    "account-kill-switch:CHK-009",
    "account-kill-switch:CHK-010",
    "account-kill-switch:CHK-012"
  ]
}
```

## OQ-merchant-app-063 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-merchant-app-063",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "account-kill-switch",
  "summary": "Portal chỉ bị chặn khi shop vừa có plan Shopify \"trial\" vừa thiếu tỉnh hoặc thành phố phải không (shop trial đủ địa chỉ và shop không phải trial thiếu địa chỉ đều không bị chặn)? Shop trial vừa cài, chưa nhận thông báo shop update chứa tên plan, có bị chặn ngay không?",
  "check_ids": [
    "account-kill-switch:CHK-013"
  ]
}
```

## OQ-merchant-app-064 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-merchant-app-064",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "account-kill-switch",
  "summary": "Khi công tắc tài khoản Tắt, ngoài trang reveal thì widget, theme block, block Unbox ở trang cảm ơn/order status và mua box bằng store credit trên storefront có bị ẩn hay chặn không, và storefront dùng metafield trạng thái tài khoản thế nào?",
  "check_ids": [
    "account-kill-switch:CHK-014"
  ]
}
```

## OQ-merchant-app-065 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-merchant-app-065",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "account-kill-switch",
  "summary": "Khi công tắc tài khoản Tắt, các webhook khác ngoài webhook đơn (shop update, app uninstalled, bulk operation finished) có bỏ qua lớp chặn và vẫn được xử lý không? Tài liệu ghi điều này nhưng kèm chú thích chưa xác nhận.",
  "check_ids": [
    "account-kill-switch:CHK-015"
  ]
}
```

## OQ-merchant-app-066 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-merchant-app-066",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "account-kill-switch",
  "summary": "Khi công tắc tài khoản Tắt, trang my orders và trang unbox của khách phải trả gì cụ thể (404, trang trắng, đẩy sang đăng nhập hay một thông báo bị từ chối), với status code nào?",
  "check_ids": [
    "account-kill-switch:CHK-016"
  ]
}
```

## OQ-merchant-app-067 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-merchant-app-067",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "dashboard-and-analytics",
  "summary": "Với gói Free, thông điệp \"You almost reach the box limit...\" và \"You have reached the box limit...\" hiện ở ngưỡng used chính xác nào, và shop gói trả phí có thấy cảnh báo hạn mức cùng nút \"Upgrade\" không?",
  "check_ids": [
    "dashboard-and-analytics:CHK-004"
  ]
}
```

## OQ-merchant-app-068 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-merchant-app-068",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "dashboard-and-analytics",
  "summary": "Các check P1 (tiền / billing / bốc thăm / refund / store credit / permission / xoá dữ liệu) của feature này có oracle STRONG nhưng chỉ dựa trên tài liệu dev (dev_doc). Theo luật oracle, chúng giữ NEEDS_CONFIRMATION cho tới khi có test_case PASS (hoặc PO/Dev xác nhận trực tiếp) cho đúng hành vi. Danh sách check ở check_ids.",
  "check_ids": [
    "dashboard-and-analytics:CHK-005",
    "dashboard-and-analytics:CHK-006",
    "dashboard-and-analytics:CHK-018",
    "dashboard-and-analytics:CHK-028"
  ]
}
```

## OQ-merchant-app-069 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-merchant-app-069",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "dashboard-and-analytics",
  "summary": "Server giới hạn khoảng ngày analytics tối đa 180 ngày: khi merchant chọn khoảng dài hơn 180 ngày thì server trả lỗi, tự cắt khoảng, hay trả 0, và màn Analytics hiện thông báo gì?",
  "check_ids": [
    "dashboard-and-analytics:CHK-014"
  ]
}
```

## OQ-merchant-app-070 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-merchant-app-070",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "dashboard-and-analytics",
  "summary": "Server không cho ngày bắt đầu của khoảng analytics sớm hơn ngày shop cài app: khi merchant chọn ngày sớm hơn thì server báo lỗi, tự dời về ngày cài app, hay trả 0, và màn hình hiện gì?",
  "check_ids": [
    "dashboard-and-analytics:CHK-015"
  ]
}
```

## OQ-merchant-app-071 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-merchant-app-071",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "dashboard-and-analytics",
  "summary": "Khi đơn có box bị huỷ hoặc được refund (toàn phần hoặc một phần) từ Shopify, doanh thu, số box và AOV trên analytics có bị trừ đi không?",
  "check_ids": [
    "dashboard-and-analytics:CHK-023"
  ]
}
```

## OQ-merchant-app-072 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-merchant-app-072",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "dashboard-and-analytics",
  "summary": "Shop đang trong thời gian trial của gói trả phí có xem được số liệu analytics không, hay bị chặn như gói Free?",
  "check_ids": [
    "dashboard-and-analytics:CHK-027"
  ]
}
```

## OQ-merchant-app-073 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-merchant-app-073",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "dashboard-and-analytics",
  "summary": "Thao tác Delete box trên Dashboard có hộp xác nhận không, và xoá một box đã có đơn bán thì đơn, quà đã bốc và trang mở box của khách bị ảnh hưởng thế nào?",
  "check_ids": [
    "dashboard-and-analytics:CHK-030"
  ]
}
```

## OQ-merchant-app-074 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-merchant-app-074",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "dashboard-and-analytics",
  "summary": "Điều kiện để một shop được coi là early-bird (Founding member) là gì và dựng dữ liệu thế nào để kiểm hộp \"Hello, Founding member!\"; shop không phải early-bird có chắc không thấy hộp này không?",
  "kb_ids": [
    "dashboard-and-analytics#KB-020"
  ],
  "check_ids": [
    "dashboard-and-analytics:CHK-033"
  ]
}
```

## OQ-merchant-app-075 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-merchant-app-075",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "dashboard-and-analytics",
  "summary": "Các khoảng ngày khác \"Today\" (Yesterday, Last week, Last month, Week to date, Month to date, Custom) tính mốc ngày theo múi giờ trình duyệt hay múi giờ shop?",
  "check_ids": [
    "dashboard-and-analytics:CHK-036"
  ]
}
```

## OQ-merchant-app-076 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-merchant-app-076",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "gdpr-data-requests",
  "summary": "Các check P1 (tiền / billing / bốc thăm / refund / store credit / permission / xoá dữ liệu) của feature này có oracle STRONG nhưng chỉ dựa trên tài liệu dev (dev_doc). Theo luật oracle, chúng giữ NEEDS_CONFIRMATION cho tới khi có test_case PASS (hoặc PO/Dev xác nhận trực tiếp) cho đúng hành vi. Danh sách check ở check_ids.",
  "check_ids": [
    "gdpr-data-requests:CHK-001",
    "gdpr-data-requests:CHK-002"
  ]
}
```

## OQ-merchant-app-077 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-merchant-app-077",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "gdpr-data-requests",
  "summary": "Khi nhiều bảng dữ liệu không nối khoá tới khách, làm sao xác định đủ dữ liệu của một khách để xuất hoặc xoá, và bảng nào thuộc phạm vi?",
  "check_ids": [
    "gdpr-data-requests:CHK-007"
  ]
}
```

## OQ-merchant-app-078 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-merchant-app-078",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "general-settings",
  "summary": "Các setting ẩn recent_pulls_publish_test_orders, share_unboxing_enabled, share_image_daily_limit chỉ có trên nhánh build-staging, chưa lên production. Cần xác nhận khi nào lên production và giá trị mặc định/hành vi trên production.",
  "kb_ids": [
    "general-settings#KB-053",
    "general-settings#KB-054",
    "general-settings#KB-055"
  ]
}
```

## OQ-merchant-app-079 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-merchant-app-079",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "general-settings",
  "summary": "Bấm \"Discard\" trên màn General Settings thì form trở về giá trị đã lưu gần nhất (hay giá trị mặc định nếu mục chưa từng lưu), có hộp xác nhận không, và thanh Save/Discard có ẩn đi không?",
  "check_ids": [
    "general-settings:CHK-003"
  ]
}
```

## OQ-merchant-app-080 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-merchant-app-080",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "general-settings",
  "summary": "Nguyên tắc \"giá trị đã lưu chỉ áp cho đơn tạo sau thời điểm lưu\" có áp cho cả các setting không gắn với lịch đơn (khoá metafield quà, Store credit app, công tắc Shopify Flow) không, hay chỉ cho lịch auto-unbox và cửa sổ resell?",
  "check_ids": [
    "general-settings:CHK-008"
  ]
}
```

## OQ-merchant-app-081 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-merchant-app-081",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "general-settings",
  "summary": "Các check P1 (tiền / billing / bốc thăm / refund / store credit / permission / xoá dữ liệu) của feature này có oracle STRONG nhưng chỉ dựa trên tài liệu dev (dev_doc). Theo luật oracle, chúng giữ NEEDS_CONFIRMATION cho tới khi có test_case PASS (hoặc PO/Dev xác nhận trực tiếp) cho đúng hành vi. Danh sách check ở check_ids.",
  "check_ids": [
    "general-settings:CHK-015",
    "general-settings:CHK-019"
  ]
}
```

## OQ-merchant-app-082 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-merchant-app-082",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "general-settings",
  "summary": "Khi shop chưa từng lưu mục Koin, mặc định phía server của \"Store credit app\" là Koin hay None, và khi đó khách có thấy lựa chọn mua box bằng store credit không?",
  "check_ids": [
    "general-settings:CHK-016"
  ]
}
```

## OQ-merchant-app-083 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-merchant-app-083",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "general-settings",
  "summary": "Lưu Koin private API Key không hợp lệ thì có bị từ chối không và thông báo gì; khi chuyển Store credit app sang None thì giảm giá tự động mua bằng store credit đã tạo có bị gỡ không?",
  "check_ids": [
    "general-settings:CHK-017"
  ]
}
```

## OQ-merchant-app-084 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-merchant-app-084",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "general-settings",
  "summary": "Tài liệu ghi ba setting ẩn chỉ có trên nhánh build-staging với mặc định recent_pulls_publish_test_orders Tắt, share_unboxing_enabled Bật, share_image_daily_limit 300. Các mặc định này có phải là hành vi mong đợi không, khi nào chúng lên production và mặc định trên production là gì?",
  "check_ids": [
    "general-settings:CHK-022"
  ]
}
```

## OQ-merchant-app-085 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-merchant-app-085",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "general-settings",
  "summary": "Khoảng hợp lệ của \"Auto-unbox after\" và \"Trigger before\" là gì (cho phép 0, số thập phân, để trống không, giá trị tối đa, Trigger before có được lớn hơn Auto-unbox after không) và form báo lỗi gì khi nhập sai?",
  "check_ids": [
    "general-settings:CHK-023"
  ]
}
```

## OQ-merchant-app-086 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-merchant-app-086",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "general-settings",
  "summary": "Mọi nhân viên Shopify được phép mở app có được lưu General Settings không, hay việc lưu còn phụ thuộc quyền Shopify cụ thể nào của nhân viên?",
  "check_ids": [
    "general-settings:CHK-024"
  ]
}
```

## OQ-merchant-app-087 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-merchant-app-087",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "install-and-onboarding",
  "summary": "Chữ thông báo gói Free nêu giới hạn 10 box sales; 10 là giá trị gõ cứng/seed, không phải hạn mức production đã xác nhận. Cần xác nhận hạn mức thật của gói Free trên production và chữ hiển thị tương ứng.",
  "kb_ids": [
    "install-and-onboarding#KB-056"
  ]
}
```

## OQ-merchant-app-088 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-merchant-app-088",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "install-and-onboarding",
  "summary": "Sau khi merchant bấm Skip và xác nhận bỏ qua wizard, onboarding có được đánh dấu là xong không, và Dashboard, thẻ Setup guide, menu trái hiện gì (kể cả sau khi tải lại trang khi shop vẫn chưa có box)?",
  "check_ids": [
    "install-and-onboarding:CHK-008"
  ]
}
```

## OQ-merchant-app-089 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-merchant-app-089",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "install-and-onboarding",
  "summary": "Khi merchant đã lưu box lần đầu (shop đã có box) nhưng chưa hoàn tất màn kết, tải lại trang ở bước Launch thì wizard còn hiện ở bước Launch hay app chuyển thẳng sang Dashboard?",
  "check_ids": [
    "install-and-onboarding:CHK-011"
  ]
}
```

## OQ-merchant-app-090 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-merchant-app-090",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "install-and-onboarding",
  "summary": "Mục \"Set up your first mystery box\" của Setup guide có được tính là xong khi shop chỉ có box ở trạng thái nháp (chưa Active) không?",
  "check_ids": [
    "install-and-onboarding:CHK-016"
  ]
}
```

## OQ-merchant-app-091 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-merchant-app-091",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "install-and-onboarding",
  "summary": "Việc ẩn thẻ Setup guide 30 ngày tính theo trình duyệt hay theo shop (trình duyệt khác có còn thấy thẻ không), thẻ có tự hiện lại đúng sau 30 ngày không, và có cách nào cho merchant hiện lại thẻ sớm hơn không?",
  "check_ids": [
    "install-and-onboarding:CHK-018"
  ]
}
```

## OQ-merchant-app-092 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-merchant-app-092",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "install-and-onboarding",
  "summary": "Khi merchant từ chối màn hình xin quyền của Shopify lúc cài app thì merchant thấy gì, và hệ thống có tạo bản ghi shop hay gói Free nào không?",
  "check_ids": [
    "install-and-onboarding:CHK-021"
  ]
}
```

## OQ-merchant-app-093 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-merchant-app-093",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "install-and-onboarding",
  "summary": "Các check P1 (tiền / billing / bốc thăm / refund / store credit / permission / xoá dữ liệu) của feature này có oracle STRONG nhưng chỉ dựa trên tài liệu dev (dev_doc). Theo luật oracle, chúng giữ NEEDS_CONFIRMATION cho tới khi có test_case PASS (hoặc PO/Dev xác nhận trực tiếp) cho đúng hành vi. Danh sách check ở check_ids.",
  "check_ids": [
    "install-and-onboarding:CHK-023",
    "install-and-onboarding:CHK-028"
  ]
}
```

## OQ-merchant-app-094 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-merchant-app-094",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "install-and-onboarding",
  "summary": "Tài liệu nêu dev store thiếu địa chỉ là một nguyên nhân khiến app trống sau khi cài. Đây là hành vi chấp nhận được hay là lỗi cần sửa, và khi đó merchant phải thấy gì, bản ghi shop phải có những trường nào?",
  "check_ids": [
    "install-and-onboarding:CHK-025"
  ]
}
```

## OQ-merchant-app-095 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-merchant-app-095",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "shop-connection-and-reauth",
  "summary": "Thời hạn chính xác của khoá truy cập (tài liệu ghi \"khoảng 1 giờ\") và thời điểm token đăng nhập của shop bị đóng băng chết (tài liệu ghi \"khoảng 90 ngày\") cần dev xác nhận; một tài liệu khác ghi khoá truy cập hết hạn sau đúng 1 giờ và khoá làm mới sống 90 ngày.",
  "kb_ids": [
    "shop-connection-and-reauth#KB-001",
    "shop-connection-and-reauth#KB-005"
  ],
  "check_ids": [
    "shop-connection-and-reauth:CHK-023",
    "shop-connection-and-reauth:CHK-024"
  ]
}
```

## OQ-merchant-app-096 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-merchant-app-096",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "shop-connection-and-reauth",
  "summary": "Nhận định của support playbook rằng khi shop có ngày \"Re-auth Required At\" thì \"gần như mọi thứ\" của shop dừng và re-auth \"thường\" là gốc chung khi cả shop sai nhiều thứ cần xác nhận phạm vi chính xác: chức năng nào vẫn chạy khi shop cần cấp quyền lại.",
  "kb_ids": [
    "shop-connection-and-reauth#KB-027"
  ]
}
```

## OQ-merchant-app-097 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-merchant-app-097",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "shop-connection-and-reauth",
  "summary": "Job gia hạn token hằng ngày có làm mới shop có khoá làm mới còn đúng 10 ngày không, và shop còn hơn 10 ngày có chắc chắn không bị job làm mới không?",
  "check_ids": [
    "shop-connection-and-reauth:CHK-004"
  ]
}
```

## OQ-merchant-app-098 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-merchant-app-098",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "shop-connection-and-reauth",
  "summary": "Các check P1 (tiền / billing / bốc thăm / refund / store credit / permission / xoá dữ liệu) của feature này có oracle STRONG nhưng chỉ dựa trên tài liệu dev (dev_doc). Theo luật oracle, chúng giữ NEEDS_CONFIRMATION cho tới khi có test_case PASS (hoặc PO/Dev xác nhận trực tiếp) cho đúng hành vi. Danh sách check ở check_ids.",
  "check_ids": [
    "shop-connection-and-reauth:CHK-017",
    "shop-connection-and-reauth:CHK-018"
  ]
}
```

## OQ-merchant-app-099 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-merchant-app-099",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "shop-connection-and-reauth",
  "summary": "Đơn khách đã trả trong lúc shop cần cấp quyền lại có tự được xử lý lại sau khi merchant cấp quyền không, hay bắt buộc support xử lý lại bằng tay cho từng đơn?",
  "kb_ids": [
    "shop-connection-and-reauth#KB-043"
  ],
  "check_ids": [
    "shop-connection-and-reauth:CHK-019"
  ]
}
```

## OQ-merchant-app-100 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-merchant-app-100",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "shop-connection-and-reauth",
  "summary": "Khi merchant từ chối màn cấp quyền lúc cài app lần đầu, hệ thống có tạo bản ghi shop không và merchant thấy gì?",
  "check_ids": [
    "shop-connection-and-reauth:CHK-025"
  ]
}
```

## OQ-merchant-app-101 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-merchant-app-101",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "shop-uninstall-reinstall-lifecycle",
  "summary": "Hành vi huỷ lịch thăm dò nguồn đơn sau khi xoá shop (để không gọi Shopify bằng token đã thu hồi) chỉ có trên nhánh build-staging, chưa lên production. Khi nào thay đổi này lên production, và đến lúc đó hành vi production là gì?",
  "kb_ids": [
    "shop-uninstall-reinstall-lifecycle#KB-020"
  ]
}
```

## OQ-merchant-app-102 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-merchant-app-102",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "shop-uninstall-reinstall-lifecycle",
  "summary": "Sau khi gỡ app, theme embed và block checkout trên storefront có còn render hay không? Tài liệu cho rằng đây là hành vi của Shopify và tự ghi là chưa xác nhận.",
  "kb_ids": [
    "shop-uninstall-reinstall-lifecycle#KB-021"
  ],
  "check_ids": [
    "shop-uninstall-reinstall-lifecycle:CHK-017"
  ]
}
```

## OQ-merchant-app-103 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-merchant-app-103",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "shop-uninstall-reinstall-lifecycle",
  "summary": "Box được khôi phục khi cài lại \"thường\" ở trạng thái đã unpublish: trường hợp nào box không bị unpublish (vd shop chưa vượt hạn mức gói Free)? Cần xác nhận điều kiện chính xác.",
  "kb_ids": [
    "shop-uninstall-reinstall-lifecycle#KB-035"
  ],
  "check_ids": [
    "shop-uninstall-reinstall-lifecycle:CHK-009"
  ]
}
```

## OQ-merchant-app-104 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-merchant-app-104",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "shop-uninstall-reinstall-lifecycle",
  "summary": "Các check P1 (tiền / billing / bốc thăm / refund / store credit / permission / xoá dữ liệu) của feature này có oracle STRONG nhưng chỉ dựa trên tài liệu dev (dev_doc). Theo luật oracle, chúng giữ NEEDS_CONFIRMATION cho tới khi có test_case PASS (hoặc PO/Dev xác nhận trực tiếp) cho đúng hành vi. Danh sách check ở check_ids.",
  "check_ids": [
    "shop-uninstall-reinstall-lifecycle:CHK-001",
    "shop-uninstall-reinstall-lifecycle:CHK-002",
    "shop-uninstall-reinstall-lifecycle:CHK-003",
    "shop-uninstall-reinstall-lifecycle:CHK-006",
    "shop-uninstall-reinstall-lifecycle:CHK-007",
    "shop-uninstall-reinstall-lifecycle:CHK-008"
  ]
}
```

## OQ-merchant-app-105 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-merchant-app-105",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "shop-uninstall-reinstall-lifecycle",
  "summary": "'Dọn dữ liệu liên quan' khi nhận thông báo gỡ app gồm chính xác những dữ liệu nào (ngoài phiên, token và cờ re-auth)?",
  "check_ids": [
    "shop-uninstall-reinstall-lifecycle:CHK-016"
  ]
}
```

## OQ-merchant-app-106 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-merchant-app-106",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "shop-uninstall-reinstall-lifecycle",
  "summary": "Báo cáo 'active' loại bỏ shop có plan Shopify đóng nằm ở màn hình hoặc bản xuất nào để kiểm được?",
  "kb_ids": [
    "_object-level#KB-019",
    "shop-uninstall-reinstall-lifecycle#KB-045",
    "shop-uninstall-reinstall-lifecycle#KB-046",
    "shop-uninstall-reinstall-lifecycle#KB-047"
  ],
  "check_ids": [
    "shop-uninstall-reinstall-lifecycle:CHK-021"
  ]
}
```
