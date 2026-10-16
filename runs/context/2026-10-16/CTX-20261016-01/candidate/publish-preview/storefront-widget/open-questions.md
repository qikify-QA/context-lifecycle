# Open Questions — storefront-widget

Tổng: 40 mục (CONFLICT 4 · OPEN_ISSUE 20 · NEEDS_CONFIRMATION 16). Sinh từ bootstrap DOC_BOOTSTRAP đầu tiên của Mysbox (nguồn: bộ Product KB v1 do dev viết từ source code, 2026-10-16). Mỗi mục là một khối json; `kb_ids` dạng `<feature_key>#KB-xxx` (hoặc `_object-level#KB-xxx` cho tầng object), `check_ids` dạng `<feature_key>:CHK-xxx`.

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
  ]
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
  ]
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
  ]
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
  ]
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
  ]
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
  ]
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
  ]
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
  ]
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
  ]
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
  ]
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
  ]
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
  ]
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
  ]
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
  ]
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
  ]
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
  ]
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
  ]
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
  ]
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
  ]
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
  ]
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
  ]
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
