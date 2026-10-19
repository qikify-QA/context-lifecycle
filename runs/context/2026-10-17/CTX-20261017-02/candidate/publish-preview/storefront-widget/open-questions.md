# Open Questions — storefront-widget

Tổng: 67 mục (CONFLICT 7 · OPEN_ISSUE 27 · NEEDS_CONFIRMATION 33). Sinh từ bootstrap DOC_BOOTSTRAP đầu tiên của Mysbox (nguồn: bộ Product KB v1 do dev viết từ source code, 2026-10-16); REFRESH trên staging 2026-10-17 thêm mục mới, ghi `staging_observation` (OBSERVED_CURRENT, không resolve NEEDS_CONFIRMATION/CONFLICT). Mỗi mục là một khối json; `kb_ids` dạng `<feature_key>#KB-xxx` (hoặc `_object-level#KB-xxx` cho tầng object), `check_ids` dạng `<feature_key>:CHK-xxx`.

## OQ-storefront-widget-001 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-storefront-widget-001",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": null,
  "summary": "Bộ tài liệu nguồn không chỉ định role mặc định cho object này (bootstrap-request để role null): các KB item mang scope.role theo vai trò tài liệu nêu cho từng hành vi, hoặc \"unspecified\" khi tài liệu không nêu. Cần PO/Dev xác nhận ma trận role → quyền thực tế trên production (merchant owner/staff, khách, admin Mysbox theo từng role) trước khi dùng các check PERMISSION làm oracle."
}
```

## OQ-storefront-widget-002 — CONFLICT

```json
{
  "oq_id": "OQ-storefront-widget-002",
  "type": "CONFLICT",
  "feature_id": "storefront-data-sync",
  "summary": "Ngưỡng trễ được coi là bình thường giữa thay đổi (tồn kho/plan) và dữ liệu trên widget: một phút hay vài phút? Cùng một playbook nêu hai con số khác nhau.",
  "side_a": "Playbook 3 (storefront, widget, theme và trang khách), phần mở đầu: trễ một phút là bình thường",
  "side_b": "Playbook 3 §Box báo hết hàng mà tồn kho còn: trễ vài phút là bình thường",
  "conflict_group": "CONF-storefront-widget-02",
  "kb_ids": [
    "storefront-data-sync#KB-041",
    "storefront-data-sync#KB-044"
  ],
  "staging_observation": "Ghi chú quan sát staging cho OQ-storefront-widget-002 / CONF-storefront-widget-02: 2026-10-17: Một đơn Bogus: tồn kho trên widget đổi trong ≤ 23 giây sau paid (mẫu đầu +23s đã đổi), không đổi thêm tới +5 phút. Không trả lời được \"ngưỡng bình thường\" là 1 phút hay vài phút — đó là câu hỏi về expected.",
  "staging_observation_kb_ids": [
    "storefront-data-sync#KB-048"
  ],
  "status_note": "Quan sát staging chỉ là OBSERVED_CURRENT; conflict vẫn mở, chưa resolve."
}
```

## OQ-storefront-widget-003 — CONFLICT

```json
{
  "oq_id": "OQ-storefront-widget-003",
  "type": "CONFLICT",
  "feature_id": "storefront-data-sync",
  "summary": "Độ trễ của khối hiển thị tồn kho trên storefront: vài giây (tài liệu tồn kho) hay một phút / vài phút (playbook storefront)?",
  "side_a": "Tài liệu \"Tồn kho, pool, sold-out và hiển thị tồn kho\" §Hiển thị tồn kho trên storefront: có thể trễ vài giây so với lần bốc",
  "side_b": "Playbook 3 (storefront, widget, theme và trang khách): trễ một phút (phần mở đầu) hoặc vài phút (§Box báo hết hàng mà tồn kho còn) là bình thường",
  "conflict_group": "CONF-storefront-widget-03",
  "kb_ids": [
    "storefront-data-sync#KB-006",
    "storefront-data-sync#KB-041",
    "storefront-data-sync#KB-044"
  ],
  "check_ids": [
    "storefront-data-sync:CHK-019"
  ],
  "staging_observation": "Ghi chú quan sát staging cho OQ-storefront-widget-003 / CONF-storefront-widget-03: 2026-10-17: Độ trễ quan sát ≤ 23 giây (dưới 1 phút); mốc dưới trong 23 giây đầu không đo được; một đơn.",
  "staging_observation_kb_ids": [
    "storefront-data-sync#KB-048"
  ],
  "status_note": "Quan sát staging chỉ là OBSERVED_CURRENT; conflict vẫn mở, chưa resolve."
}
```

## OQ-storefront-widget-004 — CONFLICT

```json
{
  "oq_id": "OQ-storefront-widget-004",
  "type": "CONFLICT",
  "feature_id": "storefront-data-sync",
  "summary": "Tồn kho từng món trên widget lấy từ đâu: gọi Storefront API của Shopify (luôn mới nhất) hay từ dữ liệu đã publish do app ghi lên biến thể (có thể cũ)?",
  "side_a": "Tài liệu \"Dữ liệu storefront: metafield hay app proxy?\" §Widget ở trang sản phẩm đọc gì: tên, ảnh, giá, tồn kho từng món gọi Storefront API bằng token công khai",
  "side_b": "Playbook 3 (storefront, widget, theme và trang khách), phần mở đầu: widget không đọc tồn kho trực tiếp từ Shopify mà đọc dữ liệu đã publish",
  "conflict_group": "CONF-storefront-widget-04",
  "kb_ids": [
    "storefront-data-sync#KB-019",
    "storefront-data-sync#KB-039"
  ],
  "check_ids": [
    "storefront-data-sync:CHK-020"
  ],
  "staging_observation": "Ghi chú quan sát staging cho OQ-storefront-widget-004 / CONF-storefront-widget-04: 2026-10-17: Trên staging số tồn kho widget lấy từ metafield mysbox.box in ra trong Liquid (pools/quantity); Storefront API không có quantityAvailable và getProducts trả metafield null.",
  "staging_observation_kb_ids": [
    "storefront-data-sync#KB-049"
  ],
  "status_note": "Quan sát staging chỉ là OBSERVED_CURRENT; conflict vẫn mở, chưa resolve."
}
```

## OQ-storefront-widget-005 — CONFLICT

```json
{
  "oq_id": "OQ-storefront-widget-005",
  "type": "CONFLICT",
  "feature_id": "widget-translations",
  "summary": "Chuỗi mặc định hiển thị tồn kho còn lại trên widget trang sản phẩm: `{remaining-items}/{total-items} left` (bảng Content & Translation, nhóm Product) hay `{quantity}/{total} left` (mặc định của itemStockText trong window.Mysbox)? Là cùng một chuỗi với hai cú pháp placeholder hay hai chuỗi khác nhau, và khách thực sự thấy chuỗi nào khi không có custom_script?",
  "side_a": "Tài liệu \"Widget storefront, theme block, dịch văn bản, custom CSS/JS\" §Bước 3 — Dịch văn bản: `{remaining-items}/{total-items} left`",
  "side_b": "Cùng tài liệu §Bước 4 — Custom CSS / JS: itemStockText mặc định `{quantity}/{total} left`",
  "conflict_group": "CONF-storefront-widget-01",
  "kb_ids": [
    "widget-custom-code#KB-008",
    "widget-translations#KB-011"
  ],
  "check_ids": [
    "widget-translations:CHK-018"
  ],
  "staging_observation": "Ghi chú quan sát staging cho OQ-storefront-widget-005 / CONF-storefront-widget-01: 2026-10-17: Không có custom script: khách thấy \"3/3 left\"; itemStockText không đặt nên bundle rơi về item_stock_left \"{remaining-items}/{total-items} left\" (cùng chuỗi với bảng Content & Translation); không thấy cú pháp {quantity}/{total}.",
  "staging_observation_kb_ids": [
    "widget-translations#KB-038",
    "widget-custom-code#KB-024",
    "widget-custom-code#KB-025"
  ],
  "status_note": "Quan sát staging chỉ là OBSERVED_CURRENT; conflict vẫn mở, chưa resolve."
}
```

## OQ-storefront-widget-006 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-storefront-widget-006",
  "type": "OPEN_ISSUE",
  "feature_id": "storefront-data-sync",
  "summary": "Hạn chế đã biết: metafield storefront bị cũ khi lần đẩy thất bại (widget hiện món/tồn kho cũ, \"sold out\" sai). Có retry/cảnh báo không, mức độ nghiêm trọng và kế hoạch sửa?",
  "kb_ids": [
    "storefront-data-sync#KB-013",
    "storefront-data-sync#KB-034",
    "storefront-data-sync#KB-035"
  ],
  "check_ids": [
    "storefront-data-sync:CHK-022"
  ]
}
```

## OQ-storefront-widget-007 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-storefront-widget-007",
  "type": "OPEN_ISSUE",
  "feature_id": "storefront-data-sync",
  "summary": "Hạn chế đã biết: cờ capacity đã publish có thể cũ sau khi đổi plan, làm widget/khối unbox bị ẩn dù plan đã ổn. Mức độ nghiêm trọng và trạng thái sửa?",
  "kb_ids": [
    "storefront-data-sync#KB-036"
  ],
  "check_ids": [
    "storefront-data-sync:CHK-023"
  ]
}
```

## OQ-storefront-widget-008 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-storefront-widget-008",
  "type": "OPEN_ISSUE",
  "feature_id": "storefront-data-sync",
  "summary": "Danh sách đầy đủ các thời điểm Mysbox ghi metafield ngoài publish box và đổi gói, và các namespace/key cụ thể được ghi vào biến thể khi publish. — Tester cần biết hành động nào phải làm mới widget và side effect nào cần kiểm trên Shopify.",
  "kb_ids": [
    "storefront-data-sync#KB-011",
    "storefront-data-sync#KB-015",
    "storefront-data-sync#KB-022"
  ],
  "staging_observation": "Ghi chú quan sát staging cho OQ-storefront-widget-008: 2026-10-17: Variant chỉ có metafield mysbox.box: ghi khi publish, pools cập nhật sau đơn, giữ với published_at null khi Deactivate, không ghi lại khi Save lúc Draft. Danh sách đầy đủ thời điểm ghi vẫn cần Dev.",
  "staging_observation_kb_ids": [
    "storefront-data-sync#KB-047",
    "storefront-data-sync#KB-048",
    "storefront-data-sync#KB-051",
    "storefront-data-sync#KB-052"
  ],
  "status_note": "Quan sát staging chỉ là OBSERVED_CURRENT; mục vẫn mở (câu hỏi chưa được trả lời đủ, hoặc cần nguồn thẩm quyền)."
}
```

## OQ-storefront-widget-009 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-storefront-widget-009",
  "type": "OPEN_ISSUE",
  "feature_id": "storefront-data-sync",
  "summary": "Deactivate (về Draft) box có xoá metafield mysbox.box không, hay chỉ xoá khi xoá box? — Ảnh hưởng dữ liệu storefront và điều kiện ẩn widget khi box Draft.",
  "kb_ids": [
    "storefront-data-sync#KB-003",
    "storefront-data-sync#KB-025",
    "storefront-data-sync#KB-042"
  ],
  "staging_observation": "Ghi chú quan sát staging cho OQ-storefront-widget-009: 2026-10-17: Deactivate (POST /unpublish) KHÔNG xoá metafield mysbox.box; ~1 phút sau metafield còn, chỉ published_at = null; widget không render. Trường hợp xoá box không thử (cấm).",
  "staging_observation_kb_ids": [
    "storefront-data-sync#KB-051"
  ],
  "status_note": "Quan sát staging chỉ là OBSERVED_CURRENT; mục vẫn mở (câu hỏi chưa được trả lời đủ, hoặc cần nguồn thẩm quyền)."
}
```

## OQ-storefront-widget-010 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-storefront-widget-010",
  "type": "OPEN_ISSUE",
  "feature_id": "storefront-data-sync",
  "summary": "Ở shop dùng Shopify Markets (đa tiền tệ), widget hiển thị ký hiệu tiền tệ nào và checkout tính theo tiền tệ nào? — Tài liệu chỉ nói \"không quy đổi\"; thiếu expected result cho shop đa tiền tệ.",
  "kb_ids": [
    "storefront-data-sync#KB-021"
  ]
}
```

## OQ-storefront-widget-011 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-storefront-widget-011",
  "type": "OPEN_ISSUE",
  "feature_id": "storefront-data-sync",
  "summary": "Token công khai Storefront API được cấp/quản lý thế nào, và widget hành xử ra sao khi lời gọi Storefront API thất bại? — Case lỗi mạng/token cho widget chưa có expected result.",
  "kb_ids": [
    "storefront-data-sync#KB-007",
    "storefront-data-sync#KB-023"
  ],
  "staging_observation": "Ghi chú quan sát staging cho OQ-storefront-widget-011: 2026-10-17: Token Storefront API nằm ở window._Mysbox.storefrontToken và được gửi qua header X-Shopify-Storefront-Access-Token; cách cấp/quản lý token và hành vi khi lỗi không quan sát được.",
  "staging_observation_kb_ids": [
    "storefront-data-sync#KB-050"
  ],
  "status_note": "Quan sát staging chỉ là OBSERVED_CURRENT; mục vẫn mở (câu hỏi chưa được trả lời đủ, hoặc cần nguồn thẩm quyền)."
}
```

## OQ-storefront-widget-012 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-storefront-widget-012",
  "type": "OPEN_ISSUE",
  "feature_id": "storefront-data-sync",
  "summary": "Hai plan đặc biệt vĩnh viễn được miễn điều kiện ẩn widget/khối unbox theo trạng thái hết hạn là plan nào? — Cần để kiểm điều kiện ẩn widget theo plan.",
  "kb_ids": [
    "storefront-data-sync#KB-043"
  ]
}
```

## OQ-storefront-widget-013 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-storefront-widget-013",
  "type": "OPEN_ISSUE",
  "feature_id": "widget-custom-code",
  "summary": "Hạn chế đã biết: JS tuỳ biến lỗi cú pháp trong Customizations có thể làm hỏng widget, không có cơ chế chặn được nêu. Có kế hoạch validate/chặn không?",
  "kb_ids": [
    "widget-custom-code#KB-016"
  ],
  "check_ids": [
    "widget-custom-code:CHK-013"
  ]
}
```

## OQ-storefront-widget-014 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-storefront-widget-014",
  "type": "OPEN_ISSUE",
  "feature_id": "widget-custom-code",
  "summary": "Ai được sửa ô Customizations: chỉ admin nội bộ có quyền update_customizations, hay support có role riêng; merchant có bao giờ được sửa không? — Feature xoay quanh \"ai được sửa\"; cần ma trận role để viết check permission.",
  "kb_ids": [
    "widget-custom-code#KB-001",
    "widget-custom-code#KB-004",
    "widget-custom-code#KB-018"
  ]
}
```

## OQ-storefront-widget-015 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-storefront-widget-015",
  "type": "OPEN_ISSUE",
  "feature_id": "widget-custom-code",
  "summary": "Nơi lưu (bảng/field) của các field Customizations và metafield custom_style/custom_script gắn ở owner nào (shop, sản phẩm hay biến thể)? — Không có data model thì không kiểm dữ liệu custom code được.",
  "kb_ids": [
    "widget-custom-code#KB-017"
  ]
}
```

## OQ-storefront-widget-016 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-storefront-widget-016",
  "type": "OPEN_ISSUE",
  "feature_id": "widget-custom-code",
  "summary": "Giá trị mặc định của các tuỳ chọn window.Mysbox / window.MysboxCustomOptions khác (ngoài remainText). — Cần baseline để kiểm hành vi khi không có custom script.",
  "kb_ids": [
    "widget-custom-code#KB-007",
    "widget-custom-code#KB-011"
  ],
  "staging_observation": "Ghi chú quan sát staging cho OQ-storefront-widget-016: 2026-10-17: window.Mysbox và window.MysboxCustomOptions đều undefined (không có object mặc định); bundle widget rơi về itemStockText → item_stock_left, remainText → remain_text, currencyPrecision 100. Mặc định của MysboxCustomOptions (bundle trang khách) chưa kiểm.",
  "staging_observation_kb_ids": [
    "widget-custom-code#KB-024",
    "widget-custom-code#KB-025"
  ],
  "status_note": "Quan sát staging chỉ là OBSERVED_CURRENT; mục vẫn mở (câu hỏi chưa được trả lời đủ, hoặc cần nguồn thẩm quyền)."
}
```

## OQ-storefront-widget-017 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-storefront-widget-017",
  "type": "OPEN_ISSUE",
  "feature_id": "widget-theme-embed-setup",
  "summary": "Hạn chế tương thích theme đã biết: widget không nhận ra form add-to-cart của một số theme, và cart drawer đặc thù làm vỡ layout widget. Danh sách theme bị ảnh hưởng và trạng thái sửa?",
  "kb_ids": [
    "widget-theme-embed-setup#KB-039",
    "widget-theme-embed-setup#KB-042"
  ],
  "check_ids": [
    "widget-theme-embed-setup:CHK-026",
    "widget-theme-embed-setup:CHK-027"
  ]
}
```

## OQ-storefront-widget-018 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-storefront-widget-018",
  "type": "OPEN_ISSUE",
  "feature_id": "widget-theme-embed-setup",
  "summary": "Giá trị mặc định và biên của các tuỳ chọn Style Settings ngoài \"Hide item price\" (Image size min/max, Maximum number of groups shown mặc định, Box item is shown as mặc định...). — Không có default/boundary thì không test giá trị biên được.",
  "kb_ids": [
    "widget-theme-embed-setup#KB-026",
    "widget-theme-embed-setup#KB-027"
  ],
  "staging_observation": "Ghi chú quan sát staging cho OQ-storefront-widget-018: 2026-10-17: Đã ghi mặc định mọi tuỳ chọn Item list (Image size 200 min 20 không max/step, Maximum groups 2 min 1...) và cách client kẹp giá trị ngoài biên; không có \"Box item is shown as\" (mở CONF-storefront-widget-05). Validate phía server khi Save không thử; mỗi giá trị biên một lần.",
  "staging_observation_kb_ids": [
    "widget-theme-embed-setup#KB-046",
    "widget-theme-embed-setup#KB-047"
  ],
  "status_note": "Quan sát staging chỉ là OBSERVED_CURRENT; mục vẫn mở (câu hỏi chưa được trả lời đủ, hoặc cần nguồn thẩm quyền)."
}
```

## OQ-storefront-widget-019 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-storefront-widget-019",
  "type": "OPEN_ISSUE",
  "feature_id": "widget-theme-embed-setup",
  "summary": "Hành vi trên production và staging chưa được xác minh — toàn bộ profile dựng từ tài liệu. — Mọi rule là expected theo tài liệu dev; chưa có quan sát runtime để đối chiếu.",
  "kb_ids": [
    "widget-theme-embed-setup#KB-003"
  ],
  "staging_observation": "Ghi chú quan sát staging cho OQ-storefront-widget-019: 2026-10-17: Staging: embed Active, 5 block Installed, widget mount với watermark trên trang product. Production chưa xác minh.",
  "staging_observation_kb_ids": [
    "widget-theme-embed-setup#KB-044",
    "widget-theme-embed-setup#KB-045",
    "widget-theme-embed-setup#KB-048"
  ],
  "status_note": "Quan sát staging chỉ là OBSERVED_CURRENT; mục vẫn mở (câu hỏi chưa được trả lời đủ, hoặc cần nguồn thẩm quyền)."
}
```

## OQ-storefront-widget-020 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-storefront-widget-020",
  "type": "OPEN_ISSUE",
  "feature_id": "widget-translations",
  "summary": "Hạn chế đã biết của bản dịch: hai bản (dữ liệu app/dữ liệu shop) lệch khi ghi bản thứ hai thất bại; lưu hai ngôn ngữ cùng lúc có thể ghi đè nhau; chuỗi unboxing lấy từ khoá dịch của product. Mức độ nghiêm trọng và trạng thái sửa?",
  "kb_ids": [
    "widget-translations#KB-031",
    "widget-translations#KB-032",
    "widget-translations#KB-033"
  ],
  "check_ids": [
    "widget-translations:CHK-020",
    "widget-translations:CHK-021",
    "widget-translations:CHK-022"
  ]
}
```

## OQ-storefront-widget-021 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-storefront-widget-021",
  "type": "OPEN_ISSUE",
  "feature_id": "widget-translations",
  "summary": "Banner gói Free ở Content & Translation có nội dung gì; gói Free bấm lưu thì UI phản hồi thế nào (nút khoá, thông báo nâng gói hay lỗi) và có sửa được không? — Tài liệu chỉ nói \"chỉ thấy banner\" / \"không lưu được\"; expected result cần thông điệp/trạng thái UI cụ thể.",
  "kb_ids": [
    "widget-translations#KB-001",
    "widget-translations#KB-002"
  ],
  "staging_observation": "Ghi chú quan sát staging cho OQ-storefront-widget-021: 2026-10-17: Banner gói Free nguyên văn đã ghi; trang vẫn hiện form, không có nút Save khi chưa sửa nên chưa có phản hồi lưu (mở CONF-storefront-widget-06).",
  "staging_observation_kb_ids": [
    "widget-translations#KB-035"
  ],
  "status_note": "Quan sát staging chỉ là OBSERVED_CURRENT; mục vẫn mở (câu hỏi chưa được trả lời đủ, hoặc cần nguồn thẩm quyền)."
}
```

## OQ-storefront-widget-022 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-storefront-widget-022",
  "type": "OPEN_ISSUE",
  "feature_id": "widget-translations",
  "summary": "Danh sách đầy đủ chuỗi mặc định của từng nhóm dịch. — Bảng chỉ ghi ví dụ; không kiểm hết được chuỗi.",
  "kb_ids": [
    "widget-translations#KB-008",
    "widget-translations#KB-010",
    "widget-translations#KB-013"
  ],
  "staging_observation": "Ghi chú quan sát staging cho OQ-storefront-widget-022: 2026-10-17: Có đủ 16 chuỗi mặc định nhóm general-settings và chuỗi mặc định Product page từ bundle; các nhóm unboxing/buyback-widget/order/share-unboxing trả data null qua API nên chuỗi mặc định của chúng chưa thấy. | 2026-10-17: Bổ sung ngoài outcome: \"Auto-open in: {time}\" (ví dụ ở KB-008) không có trong 16 key general-settings; 6 tab dịch còn lại chưa mở.",
  "staging_observation_kb_ids": [
    "widget-translations#KB-036",
    "widget-translations#KB-037",
    "widget-translations#KB-038"
  ],
  "status_note": "Quan sát staging chỉ là OBSERVED_CURRENT; mục vẫn mở (câu hỏi chưa được trả lời đủ, hoặc cần nguồn thẩm quyền)."
}
```

## OQ-storefront-widget-023 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-storefront-widget-023",
  "type": "OPEN_ISSUE",
  "feature_id": "widget-translations",
  "summary": "Khi merchant dịch cả phần trong ngoặc nhọn thì hệ thống xử lý thế nào (validate, chặn lưu, hay hiển thị sai)? — Tài liệu chỉ nêu cảnh báo; hành vi khi vi phạm chưa mô tả.",
  "kb_ids": [
    "widget-translations#KB-006"
  ]
}
```

## OQ-storefront-widget-024 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-storefront-widget-024",
  "type": "OPEN_ISSUE",
  "feature_id": "widget-translations",
  "summary": "Danh sách đầy đủ metafield bản dịch của shop (tài liệu liệt kê 3 key rồi \"...\"). — Không kiểm được đủ phạm vi dịch nếu không biết hết key.",
  "kb_ids": [
    "widget-translations#KB-029"
  ],
  "staging_observation": "Ghi chú quan sát staging cho OQ-storefront-widget-024: 2026-10-17: Nguồn dịch thấy phía client: _Mysbox.mysboxTranslation / mysboxProductPageTranslation / mysboxUnboxingTranslation và 5 endpoint /apps/mysbox/api/translations/*; tên metafield shop không thấy phía client.",
  "staging_observation_kb_ids": [
    "widget-translations#KB-037"
  ],
  "status_note": "Quan sát staging chỉ là OBSERVED_CURRENT; mục vẫn mở (câu hỏi chưa được trả lời đủ, hoặc cần nguồn thẩm quyền)."
}
```

## OQ-storefront-widget-025 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-storefront-widget-025",
  "type": "OPEN_ISSUE",
  "feature_id": "widget-translations",
  "summary": "Danh sách ngôn ngữ ở \"Select language\" có giới hạn theo các ngôn ngữ shop đã publish trên Shopify không? — Ảnh hưởng check chọn ngôn ngữ và trạng thái \"No locale found\".",
  "kb_ids": [
    "widget-translations#KB-003",
    "widget-translations#KB-004"
  ]
}
```

## OQ-storefront-widget-026 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-storefront-widget-026",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "storefront-data-sync",
  "summary": "Các check P1 (tiền / billing / bốc thăm / refund / store credit / permission / xoá dữ liệu) của feature này có oracle STRONG nhưng chỉ dựa trên tài liệu dev (dev_doc). Theo luật oracle, chúng giữ NEEDS_CONFIRMATION cho tới khi có test_case PASS (hoặc PO/Dev xác nhận trực tiếp) cho đúng hành vi. Danh sách check ở check_ids.",
  "check_ids": [
    "storefront-data-sync:CHK-004",
    "storefront-data-sync:CHK-007",
    "storefront-data-sync:CHK-008",
    "storefront-data-sync:CHK-013",
    "storefront-data-sync:CHK-024"
  ],
  "staging_observation": "Ghi chú quan sát staging cho OQ-storefront-widget-026: 2026-10-17: CHK-007: widget ở chế độ tồn kho không hiện giá item; CHK-024: khách vãng lai đọc được config shop + bản dịch trong HTML trang. CHK-004/008/013 không quan sát. Không thay authority.",
  "staging_observation_kb_ids": [
    "storefront-data-sync#KB-053",
    "_object-level.storefront-widget#KB-006"
  ],
  "status_note": "Quan sát staging chỉ là OBSERVED_CURRENT; vẫn cần PO/Dev xác nhận, chưa resolve."
}
```

## OQ-storefront-widget-027 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-storefront-widget-027",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "storefront-data-sync",
  "summary": "QA quan sát tần suất ghi metafield lên biến thể (giới hạn 5 lần mỗi giây mỗi shop) ở đâu: log ứng dụng, admin panel hay công cụ của Shopify? Các lần ghi vượt giới hạn được xếp hàng hay bị bỏ?",
  "kb_ids": [
    "storefront-data-sync#KB-005",
    "storefront-data-sync#KB-040"
  ],
  "check_ids": [
    "storefront-data-sync:CHK-018"
  ]
}
```

## OQ-storefront-widget-028 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-storefront-widget-028",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "storefront-data-sync",
  "summary": "Khi merchant sửa chance trong Mysbox mà chưa publish lại, widget có tiếp tục hiện chance cũ cho tới khi metafield được ghi lại không; sửa box có tự kích hoạt ghi lại metafield hay chỉ khi publish?",
  "check_ids": [
    "storefront-data-sync:CHK-021"
  ],
  "staging_observation": "Ghi chú quan sát staging cho OQ-storefront-widget-028: 2026-10-17: Save khi Draft tạo version mới, không tự publish, metafield vẫn giữ chance cũ (v3026) sau ~47s; chance trên widget không quan sát được vì widget ẩn khi Draft; publish lại không thử.",
  "staging_observation_kb_ids": [
    "storefront-data-sync#KB-052",
    "storefront-data-sync#KB-053"
  ],
  "status_note": "Quan sát staging chỉ là OBSERVED_CURRENT; vẫn cần PO/Dev xác nhận, chưa resolve."
}
```

## OQ-storefront-widget-029 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-storefront-widget-029",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "widget-custom-code",
  "summary": "Các check P1 (tiền / billing / bốc thăm / refund / store credit / permission / xoá dữ liệu) của feature này có oracle STRONG nhưng chỉ dựa trên tài liệu dev (dev_doc). Theo luật oracle, chúng giữ NEEDS_CONFIRMATION cho tới khi có test_case PASS (hoặc PO/Dev xác nhận trực tiếp) cho đúng hành vi. Danh sách check ở check_ids.",
  "check_ids": [
    "widget-custom-code:CHK-001",
    "widget-custom-code:CHK-002",
    "widget-custom-code:CHK-003"
  ],
  "staging_observation": "Ghi chú quan sát staging cho OQ-storefront-widget-029: 2026-10-17: CHK-001: staging không có ô nhập CSS/JS tự do cho merchant. CHK-002/003 cần admin panel — không quan sát.",
  "staging_observation_kb_ids": [
    "widget-custom-code#KB-026"
  ],
  "status_note": "Quan sát staging chỉ là OBSERVED_CURRENT; vẫn cần PO/Dev xác nhận, chưa resolve."
}
```

## OQ-storefront-widget-030 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-storefront-widget-030",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "widget-custom-code",
  "summary": "Ai được sửa ô Customizations của shop: chỉ admin nội bộ có quyền update_customizations, hay support có role riêng? Support bật custom CSS/JS cho shop ở đâu, và \"nhân viên\" nhập CSS/JS là nhân viên của bên nào?",
  "check_ids": [
    "widget-custom-code:CHK-004"
  ]
}
```

## OQ-storefront-widget-031 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-storefront-widget-031",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "widget-custom-code",
  "summary": "Chữ của tuỳ chọn remainText (mặc định \"Remain\") hiển thị ở vị trí nào trên widget và trong điều kiện nào; các tuỳ chọn khác của window.Mysbox và window.MysboxCustomOptions có giá trị mặc định là gì?",
  "kb_ids": [
    "widget-custom-code#KB-009"
  ],
  "check_ids": [
    "widget-custom-code:CHK-009"
  ],
  "staging_observation": "Ghi chú quan sát staging cho OQ-storefront-widget-031: 2026-10-17: Dòng box hiện \"Remaining boxes: x/y\" bên phải tiêu đề \"Box items\" (box Single, tracked, show_item_stock true); không thấy chữ \"Remain\" (mở CONF-storefront-widget-07). Mặc định các tuỳ chọn khác chỉ thấy một phần.",
  "staging_observation_kb_ids": [
    "widget-custom-code#KB-025",
    "widget-custom-code#KB-024"
  ],
  "status_note": "Quan sát staging chỉ là OBSERVED_CURRENT; vẫn cần PO/Dev xác nhận, chưa resolve."
}
```

## OQ-storefront-widget-032 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-storefront-widget-032",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "widget-custom-code",
  "summary": "Cú pháp và phạm vi của customTranslate là gì (ghi đè theo khoá nào, theo từng ngôn ngữ hay mọi ngôn ngữ), và nó ưu tiên hơn bản dịch trong Content & Translation không?",
  "kb_ids": [
    "widget-custom-code#KB-012"
  ],
  "check_ids": [
    "widget-custom-code:CHK-012"
  ]
}
```

## OQ-storefront-widget-033 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-storefront-widget-033",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "widget-theme-embed-setup",
  "summary": "Các check P1 (tiền / billing / bốc thăm / refund / store credit / permission / xoá dữ liệu) của feature này có oracle STRONG nhưng chỉ dựa trên tài liệu dev (dev_doc). Theo luật oracle, chúng giữ NEEDS_CONFIRMATION cho tới khi có test_case PASS (hoặc PO/Dev xác nhận trực tiếp) cho đúng hành vi. Danh sách check ở check_ids.",
  "check_ids": [
    "widget-theme-embed-setup:CHK-013"
  ]
}
```

## OQ-storefront-widget-034 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-storefront-widget-034",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "widget-theme-embed-setup",
  "summary": "Ai được bật cờ ẩn watermark \"Powered by Mysbox\" (merchant, nhân viên Mysbox hay tự động theo gói), và bật ở màn hình nào?",
  "kb_ids": [
    "widget-theme-embed-setup#KB-019"
  ],
  "check_ids": [
    "widget-theme-embed-setup:CHK-017"
  ],
  "staging_observation": "Ghi chú quan sát staging cho OQ-storefront-widget-034: 2026-10-17: Gói Free hiện \"Powered by Mysbox\"; merchant không có control ẩn. Ai bật hide_watermark vẫn cần PO.",
  "staging_observation_kb_ids": [
    "widget-theme-embed-setup#KB-048",
    "widget-theme-embed-setup#KB-049"
  ],
  "status_note": "Quan sát staging chỉ là OBSERVED_CURRENT; vẫn cần PO/Dev xác nhận, chưa resolve."
}
```

## OQ-storefront-widget-035 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-storefront-widget-035",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "widget-theme-embed-setup",
  "summary": "Nhãn chính xác của trang hướng dẫn và nút deep-link trong portal là \"Setup instructions\" / \"Add block to theme editor\" hay \"Instructions\" / \"Add block to theme\"?",
  "kb_ids": [
    "widget-theme-embed-setup#KB-004",
    "widget-theme-embed-setup#KB-041"
  ],
  "check_ids": [
    "widget-theme-embed-setup:CHK-022"
  ],
  "staging_observation": "Ghi chú quan sát staging cho OQ-storefront-widget-035: 2026-10-17: Nhãn trên staging: trang \"Setup instructions\" (route /instructions) và nút \"Add block to theme editor\" — khớp KB-004. Không thay authority cho production.",
  "staging_observation_kb_ids": [
    "widget-theme-embed-setup#KB-045"
  ],
  "status_note": "Quan sát staging chỉ là OBSERVED_CURRENT; vẫn cần PO/Dev xác nhận, chưa resolve."
}
```

## OQ-storefront-widget-036 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-storefront-widget-036",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "widget-theme-embed-setup",
  "summary": "Dashboard phát hiện app embed/block đã cài bằng cách nào và hiển thị những giá trị trạng thái nào (ngoài \"Active\"); tên nguyên văn của hai block checkout trong bảng trạng thái app extension là gì?",
  "kb_ids": [
    "widget-theme-embed-setup#KB-005",
    "widget-theme-embed-setup#KB-034"
  ],
  "check_ids": [
    "widget-theme-embed-setup:CHK-023"
  ],
  "staging_observation": "Ghi chú quan sát staging cho OQ-storefront-widget-036: 2026-10-17: Tên nguyên văn hai block checkout và request lấy trạng thái (Admin GraphQL App Bridge đọc file theme + checkoutProfiles) đã ghi; chỉ thấy \"Active\"/\"Installed\", logic phía server/client suy trạng thái không quan sát.",
  "staging_observation_kb_ids": [
    "widget-theme-embed-setup#KB-044"
  ],
  "status_note": "Quan sát staging chỉ là OBSERVED_CURRENT; vẫn cần PO/Dev xác nhận, chưa resolve."
}
```

## OQ-storefront-widget-037 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-storefront-widget-037",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "widget-translations",
  "summary": "Nhóm dịch \"Share unboxing\" chỉ có trên nhánh build-staging. Khi nào lên production, và trên production trang Content & Translation có hiện nhóm này không?",
  "kb_ids": [
    "widget-translations#KB-022",
    "widget-translations#KB-023"
  ]
}
```

## OQ-storefront-widget-038 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-storefront-widget-038",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "widget-translations",
  "summary": "Khi merchant dịch hoặc sửa cả phần trong ngoặc nhọn của một chuỗi, hệ thống xử lý thế nào: chặn lưu, cảnh báo, hay lưu và hiển thị sai trên storefront?",
  "check_ids": [
    "widget-translations:CHK-012"
  ]
}
```

## OQ-storefront-widget-039 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-storefront-widget-039",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "widget-translations",
  "summary": "Các check P1 (tiền / billing / bốc thăm / refund / store credit / permission / xoá dữ liệu) của feature này có oracle STRONG nhưng chỉ dựa trên tài liệu dev (dev_doc). Theo luật oracle, chúng giữ NEEDS_CONFIRMATION cho tới khi có test_case PASS (hoặc PO/Dev xác nhận trực tiếp) cho đúng hành vi. Danh sách check ở check_ids.",
  "check_ids": [
    "widget-translations:CHK-013",
    "widget-translations:CHK-014",
    "widget-translations:CHK-017"
  ],
  "staging_observation": "Ghi chú quan sát staging cho OQ-storefront-widget-039: 2026-10-17: CHK-013: banner Free ghi nguyên văn, chưa thử lưu; CHK-014: widget hiện chuỗi mặc định. CHK-017 cần admin panel.",
  "staging_observation_kb_ids": [
    "widget-translations#KB-035",
    "widget-translations#KB-038"
  ],
  "status_note": "Quan sát staging chỉ là OBSERVED_CURRENT; vẫn cần PO/Dev xác nhận, chưa resolve."
}
```

## OQ-storefront-widget-040 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-storefront-widget-040",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "widget-translations",
  "summary": "Nhóm dịch \"Share unboxing\" (chữ ở popup chia sẻ) hiện chỉ có trên nhánh build-staging: khi nào lên production, và trên production trang Content & Translation có hiển thị nhóm này không?",
  "check_ids": [
    "widget-translations:CHK-019"
  ]
}
```

## OQ-storefront-widget-041 — CONFLICT

```json
{
  "oq_id": "OQ-storefront-widget-041",
  "type": "CONFLICT",
  "feature_id": "widget-custom-code",
  "summary": "Giá trị mặc định của remainText: tài liệu ghi \"Remain\"; staging (không có window.Mysbox) hiện \"Remaining boxes: 6/6\" do bundle rơi về remain_text \"Remaining boxes: {remaining-items}/{total-items}\". \"Remain\" là giá trị cũ, giá trị ở surface khác, hay tài liệu sai?",
  "side_a": "Base KB-009 (CE, dev_doc): remainText của window.Mysbox mặc định \"Remain\".",
  "side_b": "Quan sát staging KB-025: không đặt remainText thì dòng box hiện \"Remaining boxes: {remaining-items}/{total-items}\".",
  "conflict_group": "CONF-storefront-widget-07",
  "kb_ids": [
    "widget-custom-code#KB-009",
    "widget-custom-code#KB-025"
  ],
  "related_oq_ids": [
    "OQ-storefront-widget-031"
  ],
  "tags": [
    "staging-observed"
  ]
}
```

## OQ-storefront-widget-042 — CONFLICT

```json
{
  "oq_id": "OQ-storefront-widget-042",
  "type": "CONFLICT",
  "feature_id": "widget-theme-embed-setup",
  "summary": "Tài liệu nói Style Settings có tuỳ chọn \"Box item is shown as\" (List / Carousel); trên staging, Item list (Single, Bundle, cả Random by items và Random by groups) và các trang Style Settings đã mở đều không có tuỳ chọn này. Tuỳ chọn đã bị bỏ, nằm ở chỗ khác (setting block trong theme editor?) hay chưa lên staging?",
  "side_a": "Base KB-027 (CE, dev_doc): tuỳ chọn \"Box item is shown as\" có hai giá trị List / Carousel.",
  "side_b": "Quan sát staging KB-047: không có tuỳ chọn này ở Item list và các trang Style Settings đã duyệt.",
  "conflict_group": "CONF-storefront-widget-05",
  "kb_ids": [
    "widget-theme-embed-setup#KB-027",
    "widget-theme-embed-setup#KB-047"
  ],
  "related_oq_ids": [
    "OQ-storefront-widget-018"
  ],
  "tags": [
    "staging-observed"
  ],
  "check_ids": [
    "widget-theme-embed-setup:CHK-028"
  ]
}
```

## OQ-storefront-widget-043 — CONFLICT

```json
{
  "oq_id": "OQ-storefront-widget-043",
  "type": "CONFLICT",
  "feature_id": "widget-translations",
  "summary": "Merchant gói Free mở Content & Translation: tài liệu nói chỉ thấy banner; staging hiện banner kèm toàn bộ form (8 tab, input không bị khoá). Expected cho gói Free là chỉ banner hay banner + form chỉ đọc/không lưu được?",
  "side_a": "Base KB-002 (CE, dev_doc): merchant gói Free mở trang chỉ thấy banner.",
  "side_b": "Quan sát staging KB-035: banner \"Translations are not available in the Free plan\" + form đầy đủ, 16 textbox tab General không disabled, không có Save khi chưa sửa.",
  "conflict_group": "CONF-storefront-widget-06",
  "kb_ids": [
    "widget-translations#KB-002",
    "widget-translations#KB-035"
  ],
  "related_oq_ids": [
    "OQ-storefront-widget-021",
    "OQ-storefront-widget-039"
  ],
  "tags": [
    "staging-observed"
  ],
  "check_ids": [
    "widget-translations:CHK-023"
  ]
}
```

## OQ-storefront-widget-044 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-storefront-widget-044",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "storefront-data-sync",
  "summary": "Staging (1 đơn): tồn kho trên widget cập nhật ≤ 23 giây sau khi đơn paid, chỉ pool của item trúng giảm, chance trong metafield không tính lại. Đây có phải hành vi mong đợi (chance hiển thị không tính lại theo tồn kho còn lại), và độ trễ tối đa chấp nhận được là bao nhiêu?",
  "kb_ids": [
    "storefront-data-sync#KB-048",
    "storefront-data-sync#KB-053"
  ],
  "check_ids": [
    "storefront-data-sync:CHK-025"
  ],
  "tags": [
    "staging-observed"
  ]
}
```

## OQ-storefront-widget-045 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-storefront-widget-045",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "storefront-data-sync",
  "summary": "Staging (một box, 4 lần đọc): variant chỉ có metafield mysbox.box với shape như đã ghi. Đây có phải contract ổn định của metafield (key nào bắt buộc), và Mysbox còn ghi metafield ở những thời điểm nào khác?",
  "kb_ids": [
    "storefront-data-sync#KB-047"
  ],
  "check_ids": [
    "storefront-data-sync:CHK-026"
  ],
  "tags": [
    "staging-observed"
  ]
}
```

## OQ-storefront-widget-046 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-storefront-widget-046",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "storefront-data-sync",
  "summary": "Staging: token Storefront API nằm công khai trong trang (window._Mysbox.storefrontToken) và được widget gửi qua header. Token này được cấp/xoay vòng thế nào, phạm vi quyền của nó là gì, và widget xử lý ra sao khi lời gọi Storefront API lỗi?",
  "kb_ids": [
    "storefront-data-sync#KB-050"
  ],
  "check_ids": [
    "storefront-data-sync:CHK-027"
  ],
  "tags": [
    "staging-observed"
  ]
}
```

## OQ-storefront-widget-047 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-storefront-widget-047",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "storefront-data-sync",
  "summary": "Staging (1 lần): sau Deactivate, widget ẩn nhưng nút Add to cart / Buy it now của biến thể box vẫn hiện và metafield vẫn còn với published_at null. Khách có mua được biến thể box đang Draft không, và đó có phải hành vi mong đợi?",
  "kb_ids": [
    "storefront-data-sync#KB-051"
  ],
  "check_ids": [
    "storefront-data-sync:CHK-028"
  ],
  "tags": [
    "staging-observed"
  ]
}
```

## OQ-storefront-widget-048 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-storefront-widget-048",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "storefront-data-sync",
  "summary": "Staging: Save box ở Draft tạo version mới nhưng không ghi lại metafield variant. Khi Activate lại, metafield có được ghi theo version mới nhất không, và với box đang Active thì Save có ghi lại metafield ngay không?",
  "kb_ids": [
    "storefront-data-sync#KB-052"
  ],
  "check_ids": [
    "storefront-data-sync:CHK-029"
  ],
  "tags": [
    "staging-observed"
  ]
}
```

## OQ-storefront-widget-049 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-storefront-widget-049",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "storefront-data-sync",
  "summary": "Staging: ở chế độ \"Show remaining stock\", thẻ item chỉ hiện \"x/y left\" và không có Chance. Hai chế độ hiển thị (tồn kho / chance) có loại trừ nhau theo thiết kế không, và chế độ \"Show original chance\" hiển thị gì trên storefront?",
  "kb_ids": [
    "storefront-data-sync#KB-053"
  ],
  "check_ids": [
    "storefront-data-sync:CHK-030"
  ],
  "tags": [
    "staging-observed"
  ]
}
```

## OQ-storefront-widget-050 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-storefront-widget-050",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "widget-custom-code",
  "summary": "Staging (shop không có custom code): window.Mysbox và window.MysboxCustomOptions không tồn tại và bundle widget không tham chiếu MysboxCustomOptions/custom_style/custom_script. custom_script được chèn vào trang theo cơ chế nào (khối riêng của theme extension?) và trang khách có đọc MysboxCustomOptions không?",
  "kb_ids": [
    "widget-custom-code#KB-024"
  ],
  "check_ids": [
    "widget-custom-code:CHK-014"
  ],
  "tags": [
    "staging-observed"
  ]
}
```

## OQ-storefront-widget-051 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-storefront-widget-051",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "widget-theme-embed-setup",
  "summary": "Staging (1 mẫu, mọi block đã cài): Dashboard chỉ hiện \"Active\" / \"Installed\" và lấy trạng thái bằng Admin GraphQL đọc file theme MAIN + checkoutProfiles. Khi embed tắt hoặc block chưa đặt thì thẻ và bảng hiển thị giá trị gì, và đọc theme MAIN có đúng là cách phát hiện chính thức không?",
  "kb_ids": [
    "widget-theme-embed-setup#KB-044"
  ],
  "check_ids": [
    "widget-theme-embed-setup:CHK-029"
  ],
  "tags": [
    "staging-observed"
  ]
}
```

## OQ-storefront-widget-052 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-storefront-widget-052",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "widget-theme-embed-setup",
  "summary": "Staging (1 mẫu, setup đã hoàn tất): các nút của setup guide disabled khi bước đã xong. Khi bước chưa xong, setup guide hiển thị gì và mỗi nút mở đâu? Nhãn \"Setup instructions\" / \"Add block to theme editor\" thấy trên staging có phải nhãn chính thức không?",
  "kb_ids": [
    "widget-theme-embed-setup#KB-045"
  ],
  "check_ids": [
    "widget-theme-embed-setup:CHK-030"
  ],
  "tags": [
    "staging-observed"
  ]
}
```

## OQ-storefront-widget-053 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-storefront-widget-053",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "widget-theme-embed-setup",
  "summary": "Staging (1 mẫu): mặc định Item list là Square thumbnail, Hide item name/chance OFF, Hide item price ON, Image size 200, Show tier chance ON, Show random items in each group ON, Show item name and price OFF, Maximum number of groups shown 2. Đây có phải bộ mặc định chính thức không (tài liệu chỉ nêu Hide item price mặc định bật và 2 nhóm)?",
  "kb_ids": [
    "widget-theme-embed-setup#KB-046"
  ],
  "check_ids": [
    "widget-theme-embed-setup:CHK-031"
  ],
  "tags": [
    "staging-observed"
  ]
}
```

## OQ-storefront-widget-054 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-storefront-widget-054",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "widget-theme-embed-setup",
  "summary": "Item list nhận Image size 99999 và Maximum groups 2.5 mà không báo lỗi (staging, chưa lưu, mỗi giá trị 1 lần). Giới hạn đúng của hai ô là gì, server có từ chối khi Save giá trị ngoài biên không, và widget storefront hiển thị ra sao nếu lưu được?",
  "kb_ids": [
    "widget-theme-embed-setup#KB-046"
  ],
  "check_ids": [
    "widget-theme-embed-setup:CHK-032"
  ],
  "tags": [
    "staging-observed"
  ]
}
```

## OQ-storefront-widget-055 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-storefront-widget-055",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "widget-theme-embed-setup",
  "summary": "Staging gói Free: link \"Powered by Mysbox\" mở apps.shopify.com/mystery-box-builder ở tab mới. Đích link và việc watermark luôn hiện ở gói Free có phải hành vi chính thức không, và gói nào thì watermark bị ẩn?",
  "kb_ids": [
    "widget-theme-embed-setup#KB-048"
  ],
  "check_ids": [
    "widget-theme-embed-setup:CHK-033"
  ],
  "tags": [
    "staging-observed"
  ]
}
```

## OQ-storefront-widget-056 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-storefront-widget-056",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "widget-theme-embed-setup",
  "summary": "Staging gói Free: merchant không có control ẩn watermark và không thấy cờ watermark trong dữ liệu merchant. Ai bật cờ hide_watermark (nhân viên Mysbox ở admin panel, hay tự động theo gói trả phí)?",
  "kb_ids": [
    "widget-theme-embed-setup#KB-049"
  ],
  "check_ids": [
    "widget-theme-embed-setup:CHK-034"
  ],
  "tags": [
    "staging-observed"
  ]
}
```

## OQ-storefront-widget-057 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-storefront-widget-057",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "widget-theme-embed-setup",
  "summary": "Staging (1 mẫu): nội dung widget render ở light DOM, shadow root của custom element mở và rỗng. Đây có phải cấu trúc ổn định mà automation có thể dựa vào không?",
  "kb_ids": [
    "widget-theme-embed-setup#KB-050"
  ],
  "check_ids": [
    "widget-theme-embed-setup:CHK-035"
  ],
  "tags": [
    "staging-observed"
  ]
}
```

## OQ-storefront-widget-058 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-storefront-widget-058",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "widget-theme-embed-setup",
  "summary": "Staging (1 mẫu): mặc định của Animation (tab Carousel), Recent pulls (Show recent pulls OFF) và Share unboxing (Sharing popup) như đã ghi. Đây có phải mặc định chính thức không, và tab Drawing / Card flip / Gacha, \"Sharing image\" có tuỳ chọn / mặc định gì?",
  "kb_ids": [
    "widget-theme-embed-setup#KB-051",
    "_object-level.storefront-widget#KB-005"
  ],
  "check_ids": [
    "widget-theme-embed-setup:CHK-036"
  ],
  "tags": [
    "staging-observed"
  ]
}
```

## OQ-storefront-widget-059 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-storefront-widget-059",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "widget-translations",
  "summary": "Staging: nhóm general-settings có 16 chuỗi mặc định (box_items có dấu cách cuối \"Box items \") và không có \"Auto-open in: {time}\". Đây có phải bộ chuỗi mặc định chính thức không, dấu cách cuối có chủ ý không, và \"Auto-open in: {time}\" thuộc nhóm nào?",
  "kb_ids": [
    "widget-translations#KB-036"
  ],
  "check_ids": [
    "widget-translations:CHK-024"
  ],
  "tags": [
    "staging-observed"
  ]
}
```

## OQ-storefront-widget-060 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-storefront-widget-060",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "widget-translations",
  "summary": "Staging (shop chưa có bản dịch, shopLocale en): mọi request bản dịch gửi locale=default. Khi shop có ngôn ngữ phụ và bản dịch, client gửi locale nào, và metafield shop nào là nguồn của các API này?",
  "kb_ids": [
    "widget-translations#KB-037"
  ],
  "check_ids": [
    "widget-translations:CHK-025"
  ],
  "tags": [
    "staging-observed"
  ]
}
```

## OQ-storefront-widget-061 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-storefront-widget-061",
  "type": "OPEN_ISSUE",
  "feature_id": "storefront-data-sync",
  "summary": "Activate lại box đã sửa khi Draft có ghi metafield mysbox.box version mới (quantity/chance mới) không, và widget hiện chance nào sau đó? — Save khi Draft không ghi lại metafield (KB-052); nếu Activate cũng không ghi thì widget hiện chance/tồn kho cũ.",
  "kb_ids": [
    "storefront-data-sync#KB-052",
    "storefront-data-sync#KB-037"
  ],
  "tags": [
    "staging-observed"
  ]
}
```

## OQ-storefront-widget-062 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-storefront-widget-062",
  "type": "OPEN_ISSUE",
  "feature_id": "storefront-data-sync",
  "summary": "Khi box Draft (metafield published_at null) khách vẫn bấm Add to cart / Buy it now trên variant box được — đơn đó được xử lý thế nào? — Widget ẩn nhưng nút mua vẫn hiện (KB-051); chưa có expected result cho đơn mua box Draft.",
  "kb_ids": [
    "storefront-data-sync#KB-051"
  ],
  "tags": [
    "staging-observed"
  ]
}
```

## OQ-storefront-widget-063 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-storefront-widget-063",
  "type": "OPEN_ISSUE",
  "feature_id": "storefront-data-sync",
  "summary": "Vì sao getProducts (Storefront API) trả metafield mysbox.box = null trong khi Liquid in được metafield đó — widget có phụ thuộc vào trường này không? — Có thể là quyền đọc metafield của token Storefront; ảnh hưởng nguồn dữ liệu dự phòng của widget.",
  "kb_ids": [
    "storefront-data-sync#KB-049"
  ],
  "tags": [
    "staging-observed"
  ]
}
```

## OQ-storefront-widget-064 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-storefront-widget-064",
  "type": "OPEN_ISSUE",
  "feature_id": "widget-custom-code",
  "summary": "Mục \"Advanced Settings\" của form box có chứa ô nhập code/tuỳ chọn nâng cao nào không? — Là màn duy nhất chưa mở khi kiểm 'merchant không có ô CSS/JS'.",
  "kb_ids": [
    "widget-custom-code#KB-026"
  ],
  "tags": [
    "staging-observed"
  ]
}
```

## OQ-storefront-widget-065 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-storefront-widget-065",
  "type": "OPEN_ISSUE",
  "feature_id": "widget-theme-embed-setup",
  "summary": "Save Style Settings với giá trị ngoài biên (Image size 99999, Maximum groups 2.5) thì server chấp nhận hay từ chối, và widget storefront hiển thị ra sao? — Client không báo lỗi (KB-046); chưa biết có validate phía server.",
  "kb_ids": [
    "widget-theme-embed-setup#KB-046"
  ],
  "tags": [
    "staging-observed"
  ]
}
```

## OQ-storefront-widget-066 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-storefront-widget-066",
  "type": "OPEN_ISSUE",
  "feature_id": "widget-theme-embed-setup",
  "summary": "Tab Drawing / Card flip / Gacha của Animation và tab \"Sharing image\" của Share unboxing có tuỳ chọn / mặc định gì? — Chưa mở trên staging; thiếu baseline Style Settings.",
  "kb_ids": [
    "widget-theme-embed-setup#KB-051",
    "_object-level.storefront-widget#KB-005"
  ],
  "tags": [
    "staging-observed"
  ]
}
```

## OQ-storefront-widget-067 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-storefront-widget-067",
  "type": "OPEN_ISSUE",
  "feature_id": "widget-translations",
  "summary": "Widget/trang khách luôn gửi locale=default dù shopLocale là \"en\" — ở shop có ngôn ngữ phụ, locale gửi đi có theo ngôn ngữ storefront của khách không? — Quyết định bản dịch theo ngôn ngữ có tới được khách (KB-024).",
  "kb_ids": [
    "widget-translations#KB-037",
    "widget-translations#KB-024"
  ],
  "tags": [
    "staging-observed"
  ]
}
```
