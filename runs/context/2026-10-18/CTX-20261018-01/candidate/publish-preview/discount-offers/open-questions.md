# Open Questions — discount-offers

Tổng: 105 mục (CONFLICT 12 · OPEN_ISSUE 24 · NEEDS_CONFIRMATION 69). Sinh từ bootstrap DOC_BOOTSTRAP đầu tiên của qik-volume (nguồn: KB do QA biên soạn, live-test trên store cũ test-vl-1); REFRESH trên store staging hiện tại 2026-10-18 thêm mục mới và ghi `staging_observation` (OBSERVED_CURRENT — không resolve NEEDS_CONFIRMATION/CONFLICT; xem CHANGELOG). Mỗi mục là một khối json; `kb_ids` dạng `<feature_key>#KB-xxx` (hoặc `_object-level#KB-xxx` cho tầng object), `check_ids` dạng `<feature_key>:CHK-xxx`.

## OQ-discount-offers-001 — CONFLICT

```json
{
  "oq_id": "OQ-discount-offers-001",
  "type": "CONFLICT",
  "feature_id": "quantity-break",
  "summary": "[DCONF-001] [CONFLICT - phía A] Banner: automatic discount hoạt động dù app block bị tắt",
  "side_a": "Theo tài liệu \"Quantity Break\" §Shared cross-variant rules, màn hình tạo offer có banner cảnh báo (ghi nhận live 2026-09-03): 'Automatic discounts work even if the app block is disabled. For testing, we recommend using Discount code to prevent customers from receiving unintended discounts.' Đây là 1 phía của xung đột DCONF-001 — xem conflicts[] — mâu thuẫn với hành vi hiện tại được ghi ở §Shared rules sau fix QVD-167 (phía B).",
  "side_b": "Theo tài liệu \"Quantity Break\" §Shared cross-variant rules + §Edge Cases, hiện tại (sau fix QVD-167), discount Function của Quantity Break check theme-embed status và skip áp dụng discount nếu app block không được enable trong theme editor, ngay cả khi cart content khớp 1 tier hợp lệ; regression test của gating này đã được verified: với app/embed bị disable, 1 cart vốn đủ điều kiện 1 tier sẽ không được auto-discount. Đây là phía B của xung đột DCONF-001 — xem conflicts[] — mâu thuẫn với banner cảnh báo ở phía A vẫn còn hiển thị trên UI tạo offer.",
  "staging_observation": "Ghi chú quan sát staging 2026-10-18 (OBSERVED_CURRENT, không resolve, giữ CONFLICT): Banner 'Automatic discounts work even if the app block is disabled…' còn hiện nguyên văn trên form cả 3 loại offer khi chọn Automatic discount; Dashboard báo embed Active và discount Quantity Break áp trong cart. Nhánh embed tắt (gating QVD-167) NOT_COVERED. (store staging hiện tại, 2026-10-18)",
  "staging_observation_kb_ids": [
    "quantity-break#KB-083"
  ]
}
```

## OQ-discount-offers-002 — CONFLICT

```json
{
  "oq_id": "OQ-discount-offers-002",
  "type": "CONFLICT",
  "feature_id": "multibuy-mix-match-combo",
  "summary": "[CONF-DOC04-001] Business Rules > Appearance & style (QVD-107)",
  "side_a": "Theo tài liệu \"Multibuy – Mix & Match Combo\" §`Business Rules > Appearance & style (QVD-107)`, nêu rằng live-observed default của Badge border radius slider trong Appearance & style là 6px — khác với 10px mà QVD-132 document; tài liệu nêu rõ discrepancy này chưa được giải quyết.",
  "side_b": "Theo tài liệu \"Multibuy – Mix & Match Combo\" §`Business Rules > Multibuy discount badge (QVD-132)`, (ticket QVD-132, chưa được QA xác nhận lại ở mục này) nêu rằng Badge border radius slider default là 10px.",
  "staging_observation": "Ghi chú quan sát staging 2026-10-18 (OBSERVED_CURRENT, không resolve, giữ CONFLICT): Form Multibuy mới: Badge border radius mặc định 6px. (store staging hiện tại, 2026-10-18)",
  "staging_observation_kb_ids": [
    "multibuy-mix-match-combo#KB-090"
  ]
}
```

## OQ-discount-offers-003 — CONFLICT

```json
{
  "oq_id": "OQ-discount-offers-003",
  "type": "CONFLICT",
  "feature_id": "multibuy-mix-match-combo",
  "summary": "[CONF-DOC04-002] Business Rules > Appearance & style (QVD-107)",
  "side_a": "Theo tài liệu \"Multibuy – Mix & Match Combo\" §`Business Rules > Appearance & style (QVD-107)`, nêu rằng live example quan sát được cho Badge text trong Appearance & style là \"MULTIBUY\" (chữ hoa) — khác với default \"Multi buy\" mà QVD-132 document; tài liệu nêu rõ chưa xác nhận giá trị nào là true out-of-the-box default so với giá trị đã bị merchant chỉnh.",
  "side_b": "Theo tài liệu \"Multibuy – Mix & Match Combo\" §`Business Rules > Multibuy discount badge (QVD-132)`, (ticket QVD-132, chưa được QA xác nhận lại ở mục này) nêu rằng Badge text default là \"Multi buy\"; để trống thì ẩn badge; recommend khoảng 20-25 ký tự.",
  "staging_observation": "Ghi chú quan sát staging 2026-10-18 (OBSERVED_CURRENT, không resolve, giữ CONFLICT): Form Multibuy mới: Badge text mặc định 'MULTIBUY'; render 'MULTIBUY' trên collection/search; PDP không đánh giá được (không ảnh). (store staging hiện tại, 2026-10-18)",
  "staging_observation_kb_ids": [
    "multibuy-mix-match-combo#KB-091"
  ]
}
```

## OQ-discount-offers-004 — CONFLICT

```json
{
  "oq_id": "OQ-discount-offers-004",
  "type": "CONFLICT",
  "feature_id": "wholesale-pricing-offer",
  "summary": "[DCONF-001] Storefront — drawer doesn't exist (structural correction)",
  "side_a": "Tài liệu §Storefront nêu rằng, trái với spec, hành vi live trên store test-vl-1 (product 'Clay Plant Pot', offer 'Offer 17') render toàn bộ variant-composition UI trực tiếp inline trên PDP — không có preview card, không có link 'Select now', không slide-in panel, không backdrop. Lưu ý: (Table layout) lại mô tả nội dung render 'inside the Variant Selection Drawer' — xem DCONF-001, hai mô tả này chưa được hoà giải trong tài liệu.",
  "side_b": "Tài liệu §Table layout nêu rằng cùng table này cũng render bên trong Variant Selection Drawer, compact hơn (giảm font size/padding) để fit chiều rộng drawer; hành vi active-row highlight giống hệt và vẫn update live theo stepper. Lưu ý: điều này nhắc tới 'Variant Selection Drawer' như một UI đang tồn tại, trong khi ở §Storefront nêu rằng rendering thực tế trên test-vl-1 là inline, không có drawer — xem DCONF-001, chưa được hoà giải.",
  "staging_observation": "Ghi chú quan sát staging 2026-10-18 (OBSERVED_CURRENT, không resolve, giữ CONFLICT): Composer Wholesale inline trên PDP, không preview card/'Select now'/drawer, desktop + mobile, theme 'Generated Data Theme'. (store staging hiện tại, 2026-10-18)",
  "staging_observation_kb_ids": [
    "wholesale-pricing-offer#KB-WPO-083"
  ]
}
```

## OQ-discount-offers-005 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-discount-offers-005",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "quantity-break",
  "check_ids": [
    "quantity-break:CHK-054"
  ],
  "summary": "[Cần xác nhận] Phân cấp quyền staff sub-role khi cấu hình Quantity Break",
  "detail": "Một tài khoản staff bị hạn chế quyền app (không phải Owner/Full-access) có bị giới hạn khả năng cấu hình offer Quantity Break so với Owner/staff full-access hay không? Tài liệu nguồn không có bằng chứng về phân cấp quyền staff cho riêng feature này."
}
```

## OQ-discount-offers-006 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-discount-offers-006",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "quantity-break",
  "check_ids": [
    "quantity-break:CHK-056"
  ],
  "summary": "[Cần xác nhận] Giá quantity-break có tự recompute khi subscription discount đổi/mất giữa session",
  "detail": "Khi discount của subscription app thay đổi hoặc bị xoá giữa session, giá quantity-break hiển thị cho shopper có tự recompute ngay lập tức hay giữ giá cũ (stale) cho tới khi reload/điều hướng? Tài liệu nguồn tự gắn cờ chưa chắc cho mô tả này."
}
```

## OQ-discount-offers-007 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-discount-offers-007",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "quantity-break",
  "check_ids": [
    "quantity-break:CHK-057"
  ],
  "summary": "[Cần xác nhận] Tier/trigger/gift/subscription/display settings reload đúng sau khi refresh trang Portal",
  "detail": "Sau khi Save và refresh toàn bộ trang Settings, mọi field (trigger/tier/gift/subscription/display/appearance/combination/scheduling/advanced) có reload lại đúng khớp dữ liệu đã lưu không? KB hiện chỉ xác nhận success toast xuất hiện ngay sau Save, chưa có xác nhận riêng cho bước reload.",
  "staging_observation": "Ghi chú quan sát staging 2026-10-18 (OBSERVED_CURRENT, không resolve, giữ NEEDS_CONFIRMATION): Reload sau khi lưu 3 loại offer: mọi field bằng giá trị đã lưu; GET trả đúng response lưu (khác duy nhất kiểu shopify_connection_id). Một mẫu mỗi loại. (store staging hiện tại, 2026-10-18)",
  "staging_observation_kb_ids": [
    "_object-level#KB-032"
  ]
}
```

## OQ-discount-offers-008 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-discount-offers-008",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "quantity-break",
  "check_ids": [
    "quantity-break:CHK-060"
  ],
  "summary": "[Cần xác nhận] Biến quyết định offer nào thắng khi ≥2 offer type overlap trên cùng cart",
  "detail": "Khi ≥2 offer type (bao gồm Quantity Break) cùng qualify trên 1 cart, biến nào quyết định offer nào thắng (discount rank/order trong Shopify admin? thứ tự Function evaluate? thứ tự add-to-cart?)? Đã xác nhận chắc là đúng 1 offer thắng (không chia/không cả hai), nhưng kết quả bị flip giữa 2 lần test live trên cùng 1 cặp offer — cần PO/Dev xác định rule trước khi viết test case regression xác định cho mọi tình huống overlap.",
  "staging_observation": "Ghi chú quan sát staging 2026-10-18 (OBSERVED_CURRENT, không resolve, giữ NEEDS_CONFIRMATION): Overlap trên staging: cùng giỏ 3 đơn vị, đường add qua composer/ATC theme (property Quantity Break) → mã Quantity Break; qua popup Multibuy hoặc add không property → mã Multibuy; lặp lại ổn định theo đường add. Giỏ 11 đơn vị add không property → 2 line với 2 mã khác nhau. Chỉ quan sát, không suy quy tắc. (store staging hiện tại, 2026-10-18)",
  "staging_observation_kb_ids": [
    "_object-level#KB-026",
    "_object-level#KB-027",
    "_object-level#KB-028",
    "_object-level#KB-014"
  ]
}
```

## OQ-discount-offers-009 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-discount-offers-009",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "quantity-break",
  "check_ids": [
    "quantity-break:CHK-061"
  ],
  "summary": "[Cần xác nhận — KHÔNG dùng 1 phía làm oracle] DCONF-001: automatic discount có áp dụng khi app block/theme embed bị tắt hay không",
  "detail": "DCONF-001: Automatic discount của Quantity Break có áp dụng khi app block/theme embed bị tắt hay không? Banner UI (KB-060) nói 'có vẫn hoạt động', nhưng fix QVD-167 sau 1 incident thật (77 đơn live, KB-062) cho thấy discount Function SKIP khi app block/theme-embed tắt (KB-061). Cần PO/Dev xác nhận: banner đang là copy cũ chưa update sau fix, hay 'app block' và 'theme embed' là 2 khái niệm Shopify khác nhau mà fix chỉ cover 1 trong 2, hay đây là 1 gap thật cần fix thêm.",
  "staging_observation": "Ghi chú quan sát staging 2026-10-18 (OBSERVED_CURRENT, không resolve, giữ NEEDS_CONFIRMATION): Như OQ-001: banner nguyên văn, embed Active, discount áp trong cart khi embed Active; nhánh embed tắt NOT_COVERED. (store staging hiện tại, 2026-10-18)",
  "staging_observation_kb_ids": [
    "quantity-break#KB-083"
  ]
}
```

## OQ-discount-offers-010 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-discount-offers-010",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "quantity-break",
  "check_ids": [
    "quantity-break:CHK-065",
    "quantity-break:CHK-081"
  ],
  "summary": "[Cần xác nhận] Portal preview pricing khớp storefront live rendering — chỉ 1 sample, chưa đủ để tổng quát hoá",
  "detail": "Portal tier-settings preview pricing có LUÔN khớp chính xác với giá render thực tế trên storefront cho mọi offer/sản phẩm, hay ví dụ khớp đã quan sát (offer 'Offer 15') chỉ là 1 trường hợp đơn lẻ? Cần thêm ≥1 sample độc lập khác (sản phẩm/offer khác) để nâng cấp thành rule tổng quát CONFIRMED_EXPECTED.",
  "staging_observation": "Ghi chú quan sát staging 2026-10-18 (OBSERVED_CURRENT, không resolve, giữ NEEDS_CONFIRMATION): Preview form dùng giá mẫu cố định ($100/$180/$240) không theo product trigger; PDP dùng giá thật và khớp cart. Mẫu thứ 2 cho thấy preview KHÔNG phản ánh giá product. (store staging hiện tại, 2026-10-18)",
  "staging_observation_kb_ids": [
    "quantity-break#KB-086"
  ]
}
```

## OQ-discount-offers-011 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-discount-offers-011",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "quantity-break",
  "check_ids": [
    "quantity-break:CHK-066"
  ],
  "summary": "[Cần xác nhận] True default của field 'Position' (Above vs Below volume tiers)",
  "detail": "True default của field Position (Volume discount for subscription) là 'Above volume tiers' hay 'Below volume tiers'? Ticket gốc và ví dụ live quan sát mâu thuẫn nhau; cần 1 lần test trên offer hoàn toàn mới (chưa qua tay merchant) để xác định default ngoài-hộp.",
  "staging_observation": "Ghi chú quan sát staging 2026-10-18 (OBSERVED_CURRENT, không resolve, giữ NEEDS_CONFIRMATION): Form subscription mới: Position mặc định 'Above volume tiers'. (store staging hiện tại, 2026-10-18)",
  "staging_observation_kb_ids": [
    "quantity-break#KB-077"
  ]
}
```

## OQ-discount-offers-012 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-discount-offers-012",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "quantity-break",
  "check_ids": [
    "quantity-break:CHK-067"
  ],
  "summary": "[Cần xác nhận] Sự tồn tại của group 'Content' trong Display settings",
  "detail": "Group 'Content' trong Display settings có tồn tại/được ship cho Quantity Break hay không? 3 ví dụ live kiểm tra đều không thấy group này. Cần PO/Dev xác nhận group này có áp dụng cho offer type này hay chỉ tồn tại ở ticket.",
  "staging_observation": "Ghi chú quan sát staging 2026-10-18 (OBSERVED_CURRENT, không resolve, giữ NEEDS_CONFIRMATION): Display settings có đúng 2 nhóm Variant display / Pricing display; không có nhóm Content. (store staging hiện tại, 2026-10-18)",
  "staging_observation_kb_ids": [
    "quantity-break#KB-079"
  ]
}
```

## OQ-discount-offers-013 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-discount-offers-013",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "quantity-break",
  "check_ids": [
    "quantity-break:CHK-068"
  ],
  "summary": "[Cần xác nhận] Hành vi accordion (collapse-by-default) của Display settings",
  "detail": "Display settings có hành vi accordion (collapsed-by-default, click để mở) như spec mô tả, hay luôn hiển thị (always-visible section) như quan sát qua accessibility-tree gợi ý? Cần 1 lần click-test trực tiếp trên Portal thật để xác nhận.",
  "staging_observation": "Ghi chú quan sát staging 2026-10-18 (OBSERVED_CURRENT, không resolve, giữ NEEDS_CONFIRMATION): Display settings luôn mở, không collapse; accordion có ở Appearance & style (thu gọn mặc định, click mở/đóng). (store staging hiện tại, 2026-10-18)",
  "staging_observation_kb_ids": [
    "quantity-break#KB-079"
  ]
}
```

## OQ-discount-offers-014 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-discount-offers-014",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "quantity-break",
  "check_ids": [
    "quantity-break:CHK-069"
  ],
  "summary": "[Cần xác nhận] 2 field điều kiện của Variant display xuất hiện khi checkbox cha ON",
  "detail": "Khi bật checkbox cha của Variant display, 2 field con ('Allow customer to choose variant for single-item offer', 'Variant swatch settings') có thực sự xuất hiện như ticket mô tả hay không? Chưa có ví dụ live nào bật thử checkbox cha này.",
  "staging_observation": "Ghi chú quan sát staging 2026-10-18 (OBSERVED_CURRENT, không resolve, giữ NEEDS_CONFIRMATION): Không có checkbox cha 'Variant display' (là nhãn nhóm); bật checkbox con không làm xuất hiện field con, chỉ preview đổi. (store staging hiện tại, 2026-10-18)",
  "staging_observation_kb_ids": [
    "quantity-break#KB-079",
    "quantity-break#KB-080"
  ]
}
```

## OQ-discount-offers-015 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-discount-offers-015",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "quantity-break",
  "check_ids": [
    "quantity-break:CHK-070"
  ],
  "summary": "[Cần xác nhận] 'Enable countdown timer' và quan hệ với QVD-147",
  "detail": "Checkbox 'Enable countdown timer' có hành vi/validation bổ sung nào liên quan QVD-147 ngoài việc hiện/ẩn 1 countdown timer đơn giản không? Ticket chưa được phân tích sâu; cần PO/Dev xác nhận phạm vi đầy đủ trước khi viết test case regression chi tiết.",
  "staging_observation": "Ghi chú quan sát staging 2026-10-18 (OBSERVED_CURRENT, không resolve, giữ NEEDS_CONFIRMATION): (bucket b — chỉ ghi kèm) Countdown: checkbox chỉ hiện sau khi bật end date, mặc định 'HURRY UP!'/'Sale end in'; trên PDP nằm đầu widget Quantity Break, đếm ngược live. Phạm vi QVD-147 vẫn cần PO/Dev. (store staging hiện tại, 2026-10-18)",
  "staging_observation_kb_ids": [
    "quantity-break#KB-084",
    "quantity-break#KB-085",
    "_object-level#KB-013"
  ]
}
```

## OQ-discount-offers-016 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-discount-offers-016",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "quantity-break",
  "check_ids": [
    "quantity-break:CHK-071",
    "quantity-break:CHK-076"
  ],
  "summary": "[Cần xác nhận] UI hiển thị khi 1 tier có nhiều gift PRODUCT KHÁC NHAU",
  "detail": "Khi 1 tier có nhiều gift PRODUCT KHÁC NHAU (không cùng loại) được gắn cùng lúc, badge đếm gift và dòng giá hiển thị trên storefront có dạng gì? Tài liệu nguồn chỉ quan sát trường hợp nhiều gift cùng loại; cần 1 lần test live để xác định UI thật.",
  "staging_observation": "Ghi chú quan sát staging 2026-10-18 (OBSERVED_CURRENT, không resolve, giữ NEEDS_CONFIRMATION): Không tạo offer Buy X get Y kèm gift; chỉ quan sát form (khối Gifts trên tier 1). (store staging hiện tại, 2026-10-18)",
  "staging_observation_kb_ids": [
    "quantity-break#KB-078"
  ]
}
```

## OQ-discount-offers-017 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-discount-offers-017",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "quantity-break",
  "check_ids": [
    "quantity-break:CHK-072"
  ],
  "summary": "[Cần xác nhận] Checkbox 'Allow customers to choose different variants for each item' có nối với config Variant Swatches hay không",
  "detail": "Checkbox 'Allow customers to choose different variants for each item' (Display settings của Quantity Break) có thực sự nối với/chia sẻ configuration của feature Variant Swatches riêng hay không, và nếu có, UI 'Variant swatch settings' hình dạng gì? Hiện Preview chỉ hiện mock data chung, chưa rõ liên kết thật.",
  "staging_observation": "Ghi chú quan sát staging 2026-10-18 (OBSERVED_CURRENT, không resolve, giữ NEEDS_CONFIRMATION): Bật 'Allow customers to choose different variants for each item': không có 'Variant swatch settings' hay link Variant swatches; chỉ preview đổi. (store staging hiện tại, 2026-10-18)",
  "staging_observation_kb_ids": [
    "quantity-break#KB-080"
  ]
}
```

## OQ-discount-offers-018 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-discount-offers-018",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "quantity-break",
  "check_ids": [
    "quantity-break:CHK-074"
  ],
  "summary": "[Cần xác nhận] Toggle hiện/ẩn selector riêng của widget đồng bộ động với theme",
  "detail": "Khi merchant bật toggle cho widget hiện variant selector riêng, selector đó có thực sự đồng bộ động 2 chiều với variant selector gốc của theme, hay là 2 selector độc lập có thể lệch nhau? Tài liệu tự gắn cờ chưa chắc cho phần đồng bộ này.",
  "staging_observation": "Ghi chú quan sát staging 2026-10-18 (OBSERVED_CURRENT, không resolve, giữ NEEDS_CONFIRMATION): Widget không có selector variant riêng khi checkbox tắt; đổi variant theme thì widget giữ nguyên. Đồng bộ hai chiều không kiểm được. (store staging hiện tại, 2026-10-18)",
  "staging_observation_kb_ids": [
    "quantity-break#KB-087"
  ]
}
```

## OQ-discount-offers-019 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-discount-offers-019",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "multibuy-mix-match-combo",
  "check_ids": [
    "multibuy-mix-match-combo:CHK-019"
  ],
  "summary": "NEEDS_CONFIRMATION — Pooling across different products có áp dụng cho trigger Collection/Specific products không?",
  "detail": "Quantity pooling across different products (đã confirm cho trigger 'All products', KB-032) có áp dụng nhất quán cho trigger 'Collection' và 'Specific products' không? Cơ chế pooling là core mechanic của Multibuy; nếu khác nhau giữa trigger type thì coverage hiện tại (chỉ test All products) không đủ.",
  "staging_observation": "Ghi chú quan sát staging 2026-10-18 (OBSERVED_CURRENT, không resolve, giữ NEEDS_CONFIRMATION): Trigger Specific products 2 product: số lượng gộp giữa product (1+1 → tier 2, 1+2 → tier 3, 2+2 → tier 4). (store staging hiện tại, 2026-10-18)",
  "staging_observation_kb_ids": [
    "multibuy-mix-match-combo#KB-095"
  ]
}
```

## OQ-discount-offers-020 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-discount-offers-020",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "multibuy-mix-match-combo",
  "check_ids": [
    "multibuy-mix-match-combo:CHK-028",
    "multibuy-mix-match-combo:CHK-071"
  ],
  "summary": "NEEDS_CONFIRMATION — Customer product selection behavior: radio Popup (default) vs Redirect",
  "detail": "Customer product selection behavior có đúng là radio 2 option (Open selection popup [default] Redirect to a specific page/URL) như ticket QVD-106 mô tả không? Cần QA re-confirm live trước khi dùng làm oracle, vì tài liệu này đã phát hiện ≥3 case khác nơi ticket không khớp hành vi live.",
  "staging_observation": "Ghi chú quan sát staging 2026-10-18 (OBSERVED_CURRENT, không resolve, giữ NEEDS_CONFIRMATION): 3 radio: Open selection popup / Redirect to specific page/URL (mặc định) / Direct to collection page; lưu được với URL rỗng. (store staging hiện tại, 2026-10-18)",
  "staging_observation_kb_ids": [
    "multibuy-mix-match-combo#KB-088"
  ]
}
```

## OQ-discount-offers-021 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-discount-offers-021",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "multibuy-mix-match-combo",
  "check_ids": [
    "multibuy-mix-match-combo:CHK-029",
    "multibuy-mix-match-combo:CHK-072"
  ],
  "summary": "NEEDS_CONFIRMATION — Popup mode detail (variant picker slide-up, overlay, no-variant instant add)",
  "detail": "Popup mode detail (variant picker slide-up từ đáy card + overlay semi-transparent cho product có variant; instant add-to-cart + icon đổi state cho product không variant) theo ticket QVD-121 còn khớp hành vi live hiện tại không?",
  "staging_observation": "Ghi chú quan sát staging 2026-10-18 (OBSERVED_CURRENT, không resolve, giữ NEEDS_CONFIRMATION): Popup là modal căn giữa, fade; '+' chỉ mở rộng thẻ (stepper/select + Pick), không instant add; Pick không thêm cart, Done mới thêm và chuyển /cart; lỗi console mỗi lần Pick. (store staging hiện tại, 2026-10-18)",
  "staging_observation_kb_ids": [
    "multibuy-mix-match-combo#KB-094",
    "multibuy-mix-match-combo#KB-093"
  ]
}
```

## OQ-discount-offers-022 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-discount-offers-022",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "multibuy-mix-match-combo",
  "check_ids": [
    "multibuy-mix-match-combo:CHK-043"
  ],
  "summary": "NEEDS_CONFIRMATION — Badge border radius true default: 6px (live-observed) hay 10px (ticket QVD-132)?",
  "detail": "True out-of-the-box default của Multibuy discount badge border radius là 6px (live-observed, KB-081) hay 10px (ticket QVD-132, KB-082)? Hai giá trị khác nhau trong cùng 1 tài liệu, chưa resolve — không dùng được làm expected default cho test case badge appearance.",
  "staging_observation": "Ghi chú quan sát staging 2026-10-18 (OBSERVED_CURRENT, không resolve, giữ NEEDS_CONFIRMATION): = OQ-002: 6px. (store staging hiện tại, 2026-10-18)",
  "staging_observation_kb_ids": [
    "multibuy-mix-match-combo#KB-090"
  ]
}
```

## OQ-discount-offers-023 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-discount-offers-023",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "multibuy-mix-match-combo",
  "check_ids": [
    "multibuy-mix-match-combo:CHK-044"
  ],
  "summary": "NEEDS_CONFIRMATION — Badge text true default: \"MULTIBUY\" (live example) hay \"Multi buy\" (ticket QVD-132)?",
  "detail": "True out-of-the-box default của Multibuy discount badge text là \"MULTIBUY\" (live example, KB-083) hay \"Multi buy\" (ticket, KB-084), hoặc liệu giá trị live đã bị merchant chỉnh? Không dùng được làm expected default cho test case badge text cho tới khi xác nhận.",
  "staging_observation": "Ghi chú quan sát staging 2026-10-18 (OBSERVED_CURRENT, không resolve, giữ NEEDS_CONFIRMATION): = OQ-003: 'MULTIBUY'. (store staging hiện tại, 2026-10-18)",
  "staging_observation_kb_ids": [
    "multibuy-mix-match-combo#KB-091"
  ]
}
```

## OQ-discount-offers-024 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-discount-offers-024",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "multibuy-mix-match-combo",
  "check_ids": [
    "multibuy-mix-match-combo:CHK-046"
  ],
  "summary": "NEEDS_CONFIRMATION — Discount combination checkboxes (Order/Product/Shipping), default off",
  "detail": "Discount combination section (checkbox combine Order/Product/Shipping discount, theo ticket QVD-108) có đúng cả 3 default off như tài liệu mô tả không? Cần QA re-confirm live.",
  "staging_observation": "Ghi chú quan sát staging 2026-10-18 (OBSERVED_CURRENT, không resolve, giữ NEEDS_CONFIRMATION): Combination trên form Multibuy (và QB, WH): 3 checkbox đều CHECKED mặc định + dropdown 'One per product (best value wins)'. (store staging hiện tại, 2026-10-18)",
  "staging_observation_kb_ids": [
    "_object-level#KB-012"
  ]
}
```

## OQ-discount-offers-025 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-discount-offers-025",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "multibuy-mix-match-combo",
  "check_ids": [
    "multibuy-mix-match-combo:CHK-048"
  ],
  "summary": "NEEDS_CONFIRMATION — Offer scheduling: start date required/not-past, end date optional toggle",
  "detail": "Offer scheduling base rule (start date required, default = creation time, không thể là ngày quá khứ, dùng store timezone; end date optional sau toggle 'Enable end date', default off = chạy vô thời hạn) theo ticket QVD-109 còn khớp hành vi live không?",
  "staging_observation": "Ghi chú quan sát staging 2026-10-18 (OBSERVED_CURRENT, không resolve, giữ NEEDS_CONFIRMATION): Start mặc định = lúc mở form (timezone store), ngày quá khứ disabled trong picker; end date tắt mặc định; trên offer đã lưu end date điền sẵn hôm nay, giờ ≈ hiện tại + 1h. (store staging hiện tại, 2026-10-18)",
  "staging_observation_kb_ids": [
    "_object-level#KB-013",
    "quantity-break#KB-084"
  ]
}
```

## OQ-discount-offers-026 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-discount-offers-026",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "multibuy-mix-match-combo",
  "check_ids": [
    "multibuy-mix-match-combo:CHK-050"
  ],
  "summary": "NEEDS_CONFIRMATION — Internal name auto-default \"Offer #N\", merchant-only",
  "detail": "Internal name có đúng auto-default theo pattern \"Offer #N\" và chỉ merchant thấy (không hiển thị customer) như ticket QVD-103 mô tả không? Cần QA re-confirm live.",
  "staging_observation": "Ghi chú quan sát staging 2026-10-18 (OBSERVED_CURRENT, không resolve, giữ NEEDS_CONFIRMATION): Internal name mặc định 'Offer N' (không '#'); không hiện trên UI storefront nhưng có trong JSON cấu hình nhúng ở HTML PDP. (store staging hiện tại, 2026-10-18)",
  "staging_observation_kb_ids": [
    "_object-level#KB-010",
    "_object-level#KB-029"
  ]
}
```

## OQ-discount-offers-027 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-discount-offers-027",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "multibuy-mix-match-combo",
  "check_ids": [
    "multibuy-mix-match-combo:CHK-051"
  ],
  "summary": "NEEDS_CONFIRMATION — Offer title default template {{quantity_tier}} for {{total_price}}",
  "detail": "Offer title default template có đúng là {{quantity_tier}} for {{total_price}} (double braces, theo ticket QVD-103) hay dùng single-brace notation như đã confirm cho Tier Title/Badge (KB-020/021)? Notation đã bị phát hiện sai ở phần Tier settings — rủi ro drift tương tự ở đây chưa loại trừ.",
  "staging_observation": "Ghi chú quan sát staging 2026-10-18 (OBSERVED_CURRENT, không resolve, giữ NEEDS_CONFIRMATION): Offer title (Fixed price) mặc định BUY ANY {quantity_tier} ITEMS FOR {discount} (ngoặc đơn, không nháy). (store staging hiện tại, 2026-10-18)",
  "staging_observation_kb_ids": [
    "multibuy-mix-match-combo#KB-085"
  ]
}
```

## OQ-discount-offers-028 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-discount-offers-028",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "multibuy-mix-match-combo",
  "check_ids": [
    "multibuy-mix-match-combo:CHK-052"
  ],
  "summary": "NEEDS_CONFIRMATION — Discount method default automatic; limit 25/code → contact support",
  "detail": "Discount method default có đúng là automatic discount, và hành vi khi chạm giới hạn 25/muốn dùng discount code (hướng dẫn liên hệ support, không self-serve) theo ticket QVD-103 còn khớp hành vi live không?",
  "staging_observation": "Ghi chú quan sát staging 2026-10-18 (OBSERVED_CURRENT, không resolve, giữ NEEDS_CONFIRMATION): Discount method mặc định Automatic; option Discount code không khoá, chọn được (form chưa lưu). (store staging hiện tại, 2026-10-18)",
  "staging_observation_kb_ids": [
    "_object-level#KB-011"
  ]
}
```

## OQ-discount-offers-029 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-discount-offers-029",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "multibuy-mix-match-combo",
  "check_ids": [
    "multibuy-mix-match-combo:CHK-056"
  ],
  "summary": "NEEDS_CONFIRMATION — \"Silent\" mode (discount tự áp dụng, widget UI ẩn qua custom CSS)",
  "detail": "Compare-at-Price logic có thực sự hỗ trợ 1 \"silent\" mode (discount tự áp dụng, widget UI ẩn qua custom CSS) như tài liệu mô tả (feasible, chưa verify) không? Nếu có, giới hạn 25-automatic-discount của Shopify có cần cảnh báo riêng cho merchant khi dùng mode này?",
  "staging_observation": "Ghi chú quan sát staging 2026-10-18 (OBSERVED_CURRENT, không resolve, giữ NEEDS_CONFIRMATION): (bucket b — chỉ ghi kèm) Custom CSS vẫn khoá sau 'contact our support team to enable' trên cả 3 form; silent mode không kiểm được. (store staging hiện tại, 2026-10-18)",
  "staging_observation_kb_ids": [
    "multibuy-mix-match-combo#KB-089"
  ]
}
```

## OQ-discount-offers-030 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-discount-offers-030",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "multibuy-mix-match-combo",
  "check_ids": [
    "multibuy-mix-match-combo:CHK-060"
  ],
  "summary": "NEEDS_CONFIRMATION — Offer nào thắng khi Multibuy overlap trigger với Quantity Break (2-way)?",
  "detail": "Biến nào quyết định offer nào thắng khi trigger của Multibuy overlap với Quantity Break (2-way)? Kết quả đã bị 'flip' giữa 2 lần test live trên cùng 1 cặp offer, không biến nào được xác định. Cần PO/Dev confirm trước khi viết được regression test case xác định cho trigger-overlap.",
  "staging_observation": "Ghi chú quan sát staging 2026-10-18 (OBSERVED_CURRENT, không resolve, giữ NEEDS_CONFIRMATION): = OQ-008. (store staging hiện tại, 2026-10-18)",
  "staging_observation_kb_ids": [
    "_object-level#KB-026",
    "_object-level#KB-028"
  ]
}
```

## OQ-discount-offers-031 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-discount-offers-031",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "multibuy-mix-match-combo",
  "check_ids": [
    "multibuy-mix-match-combo:CHK-061"
  ],
  "summary": "NEEDS_CONFIRMATION — Offer nào thắng khi cả 3 offer type (Multibuy, Quantity Break, Wholesale Pricing) cùng trigger và ≥2 discount đang active (3-way)?",
  "detail": "Khi Wholesale Pricing's own tier có discount nonzero và đồng thời qualify cho tier của Quantity Break/Multibuy, offer nào thắng trong 3-way overlap? Test 3-way hiện có (qty=3) không phải test priority sạch; chưa có dữ liệu trả lời priority thật khi 2 discount active cùng lúc.",
  "staging_observation": "Ghi chú quan sát staging 2026-10-18 (OBSERVED_CURRENT, không resolve, giữ NEEDS_CONFIRMATION): 3 offer cùng product với mức khác 0 (11 đơn vị): qua composer → 1 line mã Quantity Break; add không property → 2 line, mã Multibuy (4 món) + mã Quantity Break (7 món); không thấy mã Wholesale. (store staging hiện tại, 2026-10-18)",
  "staging_observation_kb_ids": [
    "_object-level#KB-028",
    "_object-level#KB-026"
  ]
}
```

## OQ-discount-offers-032 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-discount-offers-032",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "multibuy-mix-match-combo",
  "check_ids": [
    "multibuy-mix-match-combo:CHK-064"
  ],
  "summary": "NEEDS_CONFIRMATION — Có permission/role boundary chi tiết hơn (sub-role, plan/feature-flag) kiểm soát quyền cấu hình Multibuy không?",
  "detail": "Có permission/role boundary nào (vd Portal staff sub-role, plan/feature-flag gating) kiểm soát việc ai được cấu hình Multibuy không? permissions[] hiện chỉ phân biệt ở mức merchant (Portal) vs buyer (storefront) — không phải 1 authorization model."
}
```

## OQ-discount-offers-033 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-discount-offers-033",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "multibuy-mix-match-combo",
  "check_ids": [
    "multibuy-mix-match-combo:CHK-065"
  ],
  "summary": "NEEDS_CONFIRMATION — Hành vi khi checkbox \"Allow to apply multiplier discounts per order\" bị UNCHECK",
  "detail": "Khi checkbox \"Allow to apply multiplier discounts per order\" (Maximum discount uses) bị UNCHECK, hành vi chính xác là gì? Setting này chỉ áp dụng cho Fixed-price mode hay cũng ảnh hưởng Percentage mode cùng với toggle riêng của QVD-178?",
  "staging_observation": "Ghi chú quan sát staging 2026-10-18 (OBSERVED_CURRENT, không resolve, giữ NEEDS_CONFIRMATION): Multiplier tắt: chỉ một combo được áp dù đủ nhiều combo (6/8/12/18 món); bật (mặc định): nhiều combo. (store staging hiện tại, 2026-10-18)",
  "staging_observation_kb_ids": [
    "multibuy-mix-match-combo#KB-087"
  ]
}
```

## OQ-discount-offers-034 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-discount-offers-034",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "multibuy-mix-match-combo",
  "check_ids": [
    "multibuy-mix-match-combo:CHK-066"
  ],
  "summary": "NEEDS_CONFIRMATION — Tie-break rule khi nhiều unit cùng giá 'cheapest' trong remainder calculation",
  "detail": "Khi nhiều unit cùng share giá 'cheapest' trong remainder calculation của Fixed total price tier (pooled quantity có remainder), quy tắc tie-break chọn unit nào bị để lại full price là gì — cart order, product ID, hay yếu tố khác?",
  "staging_observation": "Ghi chú quan sát staging 2026-10-18 (OBSERVED_CURRENT, không resolve, giữ NEEDS_CONFIRMATION): 5 món (2 giá khác nhau): đơn vị giá rẻ hơn ở giá gốc, Shopify tách line; tie-break khi cùng giá chưa kiểm. (store staging hiện tại, 2026-10-18)",
  "staging_observation_kb_ids": [
    "multibuy-mix-match-combo#KB-095"
  ]
}
```

## OQ-discount-offers-035 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-discount-offers-035",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "multibuy-mix-match-combo",
  "check_ids": [
    "multibuy-mix-match-combo:CHK-067"
  ],
  "summary": "NEEDS_CONFIRMATION — Discount-combination checkboxes là component UI chung hay per-offer-type riêng?",
  "detail": "Discount-combination checkboxes (Order/Product/Shipping, QVD-108) có phải là 1 UI component chung dùng lại across cả 3 offer type (Quantity Break/Multibuy/Wholesale), hay mỗi offer type có bản copy riêng? Ảnh hưởng tới phạm vi regression.",
  "staging_observation": "Ghi chú quan sát staging 2026-10-18 (OBSERVED_CURRENT, không resolve, giữ NEEDS_CONFIRMATION): Section Combination giống hệt nguyên văn trên 3 form (chỉ ghi, không kết luận component). (store staging hiện tại, 2026-10-18)",
  "staging_observation_kb_ids": [
    "_object-level#KB-012"
  ]
}
```

## OQ-discount-offers-036 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-discount-offers-036",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "multibuy-mix-match-combo",
  "check_ids": [
    "multibuy-mix-match-combo:CHK-068",
    "quantity-break:CHK-078"
  ],
  "summary": "NEEDS_CONFIRMATION — Hành vi/placement thật của \"Enable countdown timer\" trên storefront",
  "detail": "\"Enable countdown timer\" checkbox (Offer scheduling) có hành vi/placement chính xác là gì trên storefront, và quan hệ của nó với QVD-147 \"Countdown timer to offer\" ra sao?",
  "staging_observation": "Ghi chú quan sát staging 2026-10-18 (OBSERVED_CURRENT, không resolve, giữ NEEDS_CONFIRMATION): Countdown: checkbox chỉ hiện sau khi bật end date; trên PDP nằm đầu widget Quantity Break, 'HURRY UP!'/'Sale end in'/đếm ngược live. Không quan sát trên widget Multibuy; lúc hết giờ NOT_COVERED. (store staging hiện tại, 2026-10-18)",
  "staging_observation_kb_ids": [
    "quantity-break#KB-085",
    "_object-level#KB-013"
  ]
}
```

## OQ-discount-offers-037 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-discount-offers-037",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "wholesale-pricing-offer",
  "check_ids": [
    "wholesale-pricing-offer:CHK-015"
  ],
  "summary": "Variant Selection UI pattern thật trên storefront — inline-on-PDP hay slide-in Drawer (DCONF-001)",
  "detail": "Wholesale Pricing Offer storefront: 'Variant Selection Drawer' (slide-in panel, theo spec QVD-143 và theo mô tả Table layout) có thực sự tồn tại, hay inline-rendering-on-PDP (đã quan sát live trên test-vl-1) là hành vi chuẩn/cuối? Nếu drawer tồn tại, nó xuất hiện trong điều kiện nào (theme khác, device khác, config khác) mà test-vl-1 chưa cover?",
  "staging_observation": "Ghi chú quan sát staging 2026-10-18 (OBSERVED_CURRENT, không resolve, giữ NEEDS_CONFIRMATION): = OQ-004. (store staging hiện tại, 2026-10-18)",
  "staging_observation_kb_ids": [
    "wholesale-pricing-offer#KB-WPO-083"
  ]
}
```

## OQ-discount-offers-038 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-discount-offers-038",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "wholesale-pricing-offer",
  "check_ids": [
    "wholesale-pricing-offer:CHK-018"
  ],
  "summary": "Để Max của tier cuối trống — display label vs discount math thật",
  "detail": "Khi merchant để trống Max của tier cuối (hint 'leave Max empty for unlimited'), việc này chỉ thay đổi display label của tier đó, hay cũng thay đổi discount math thật áp dụng cho quantity vượt ngưỡng? Hint text hiện tại có thể gây hiểu lầm — cần xác nhận hành vi thật trước khi viết oracle cho boundary case này.",
  "staging_observation": "Ghi chú quan sát staging 2026-10-18 (OBSERVED_CURRENT, không resolve, giữ NEEDS_CONFIRMATION): Max trống → nhãn '21+ Items', lưu null; 42 đơn vị nhận mức tier cuối cho toàn bộ. (store staging hiện tại, 2026-10-18)",
  "staging_observation_kb_ids": [
    "wholesale-pricing-offer#KB-WPO-080"
  ]
}
```

## OQ-discount-offers-039 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-discount-offers-039",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "wholesale-pricing-offer",
  "check_ids": [
    "wholesale-pricing-offer:CHK-019"
  ],
  "summary": "UI stepper/badge khi variant type cuối có số lượng value lớn (20+)",
  "detail": "Với variant type cuối có số lượng value lớn (ví dụ 20+ màu), UI badge/quantity-stepper-per-value của Wholesale Pricing Offer có scale/scroll hợp lý không, hay thiết kế hiện tại giả định số lượng value nhỏ? Cần một test fixture cụ thể và xác nhận PO/Dev về kỳ vọng UX ở quy mô này."
}
```

## OQ-discount-offers-040 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-discount-offers-040",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "wholesale-pricing-offer",
  "check_ids": [
    "wholesale-pricing-offer:CHK-020"
  ],
  "summary": "Offer chỉ có 1 variant type (không multi-variant) — rule 'variant type cuối đặc cách' có còn áp dụng hợp lý",
  "detail": "Khi offer Wholesale chỉ cấu hình trên product có đúng 1 variant type (không có type thứ hai để làm 'type đầu'), rule 'variant type cuối cùng nhận quantity stepper, type khác render single-select' áp dụng ra sao? Logic badge-counter (gắn theo value hiện tại của type đầu) có còn ý nghĩa khi không có type đầu riêng biệt, hay suy biến thành dạng khác?",
  "staging_observation": "Ghi chú quan sát staging 2026-10-18 (OBSERVED_CURRENT, không resolve, giữ NEEDS_CONFIRMATION): Product 1 option: VARIANTS chỉ có nhãn option + dòng stepper từng giá trị, không có hàng swatch (quan sát trên product cũng thuộc QB+MB). (store staging hiện tại, 2026-10-18)",
  "staging_observation_kb_ids": [
    "wholesale-pricing-offer#KB-WPO-085"
  ]
}
```

## OQ-discount-offers-041 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-discount-offers-041",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "wholesale-pricing-offer",
  "check_ids": [
    "wholesale-pricing-offer:CHK-022"
  ],
  "summary": "Chuyển Layout (card <-> table) có áp dụng live trên storefront không cần reload",
  "detail": "Việc chuyển đổi Layout (card <-> table) trong Portal có thực sự áp dụng live trên storefront mà không cần reload trang, như ticket AC claim? Claim này chưa được independently verify — cần 1 lần test trực tiếp (hoặc xác nhận PO/Dev) trước khi dùng làm oracle cho check STATE_DATA này.",
  "staging_observation": "Ghi chú quan sát staging 2026-10-18 (OBSERVED_CURRENT, không resolve, giữ NEEDS_CONFIRMATION): Preview đổi ngay khi chọn layout; storefront sau khi lưu hiện bảng; cập nhật live không cần reload không đo được. (store staging hiện tại, 2026-10-18)",
  "staging_observation_kb_ids": [
    "wholesale-pricing-offer#KB-WPO-082"
  ]
}
```

## OQ-discount-offers-042 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-discount-offers-042",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "wholesale-pricing-offer",
  "check_ids": [
    "wholesale-pricing-offer:CHK-023"
  ],
  "summary": "Một chỉnh sửa tier HỢP LỆ (không gap) có persist sau khi reload Portal",
  "detail": "Tài liệu nguồn chỉ xác nhận rằng một GAP do lỗi continuity vẫn tồn tại sau reload (KB-WPO-023, khung KNOWN_DEFECT) — không có statement riêng nào xác nhận rằng một chỉnh sửa tier HỢP LỆ (không tạo gap) cũng persist đúng sau reload. Đây có phải một gap documentation đơn giản (hành vi hiển nhiên, không cần ghi) hay cần 1 test riêng để xác nhận?",
  "staging_observation": "Ghi chú quan sát staging 2026-10-18 (OBSERVED_CURRENT, không resolve, giữ NEEDS_CONFIRMATION): Sửa tier hợp lệ được lưu và giữ sau reload (giá trị lưu dạng chuỗi). (store staging hiện tại, 2026-10-18)",
  "staging_observation_kb_ids": [
    "wholesale-pricing-offer#KB-WPO-081"
  ]
}
```

## OQ-discount-offers-043 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-discount-offers-043",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "wholesale-pricing-offer",
  "check_ids": [
    "wholesale-pricing-offer:CHK-026",
    "wholesale-pricing-offer:CHK-034"
  ],
  "summary": "[NEEDS_CONFIRMATION] Offer nào thắng khi Wholesale overlap Quantity Break/Multibuy — biến quyết định CHƯA xác định",
  "detail": "Khi Wholesale Pricing Offer overlap trigger với Quantity Break và/hoặc Multibuy trên cùng 1 cart VÀ cả hai offer đều có discount active khác 0% (không phải trường hợp qty=3 đã test, nơi Wholesale Tier 1 là 0%), biến nào quyết định offer nào thắng? Kết quả đã quan sát bị flip giữa 2 lần test live trên cùng cặp offer — cần PO/Dev xác nhận rule priority (discount rank trong Shopify Admin, thứ tự function evaluate, thứ tự add-to-cart, hay yếu tố khác) trước khi viết được oracle regression xác định cho trigger-overlap.",
  "staging_observation": "Ghi chú quan sát staging 2026-10-18 (OBSERVED_CURRENT, không resolve, giữ NEEDS_CONFIRMATION): Wholesale × Quantity Break cả hai khác 0 (11/21 đơn vị): luôn mã Quantity Break (7 lần), cả có/không property. (store staging hiện tại, 2026-10-18)",
  "staging_observation_kb_ids": [
    "_object-level#KB-027",
    "wholesale-pricing-offer#KB-WPO-087"
  ]
}
```

## OQ-discount-offers-044 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-discount-offers-044",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "wholesale-pricing-offer",
  "check_ids": [
    "wholesale-pricing-offer:CHK-030",
    "wholesale-pricing-offer:CHK-033"
  ],
  "summary": "[NEEDS_CONFIRMATION] Campaign scheduling thực sự gate offer availability cho Wholesale (chưa re-verify riêng)",
  "detail": "Campaign scheduling (start/end date) của Wholesale Pricing Offer có thực sự gate việc hiển thị/áp dụng offer trên storefront đúng như Quantity Break/Multibuy, hay đây chỉ là một suy đoán từ sự tương tự UI chưa được live-test riêng cho Wholesale? Cần 1 lần test riêng hoặc xác nhận PO/Dev trước khi dùng CHK-011 (UI fields) làm proxy cho enforcement hành vi thật.",
  "staging_observation": "Ghi chú quan sát staging 2026-10-18 (OBSERVED_CURRENT, không resolve, giữ NEEDS_CONFIRMATION): Offer start ngày mai: Scheduled; trước giờ start không widget, không event view, không áp discount; sau start/end NOT_COVERED. (store staging hiện tại, 2026-10-18)",
  "staging_observation_kb_ids": [
    "wholesale-pricing-offer#KB-WPO-086"
  ]
}
```

## OQ-discount-offers-045 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-discount-offers-045",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": null,
  "summary": "Khi 2-3 offer type (Quantity Break / Multibuy – Mix & Match Combo / Wholesale Pricing Offer) cùng qualify trên 1 cart (trigger overlap), đúng 1 discount thắng -- xác nhận không bao giờ cả hai, không bao giờ chia -- nhưng biến quyết định offer nào thắng chưa được xác định. Kết quả live-test bị flip giữa 2 lần test trên cùng 1 cặp offer (store test-vl-1, 2026-09-03); test 3-way (2026-09-09) không đủ sạch để trả lời vì Wholesale Tier 1 = 0% ở mức quantity test đó, nên không có 2 discount active cùng lúc thật. Cần PO/Dev xác nhận rule độ ưu tiên (discount rank/order trong Shopify admin? function evaluate sau? thứ tự add-to-cart?) trước khi viết được test case regression xác định cho trigger-overlap.",
  "staging_observation": "Ghi chú quan sát staging 2026-10-18 (OBSERVED_CURRENT, không resolve, giữ NEEDS_CONFIRMATION): = OQ-008: cùng đường add cho cùng kết quả (lặp lại ổn định); khác đường add cho mã khác; có trường hợp 2 mã trên 2 line cùng product. (store staging hiện tại, 2026-10-18)",
  "staging_observation_kb_ids": [
    "_object-level#KB-026",
    "_object-level#KB-027",
    "_object-level#KB-028"
  ]
}
```

## OQ-discount-offers-046 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-discount-offers-046",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": null,
  "summary": "Doc set nguồn cho object discount-offers trải cả merchant (Portal) và buyer (storefront) surface, không có 1 role duy nhất khai báo ở mức doc-set/object (bootstrap context.role=null, theo thiết kế). Từng claim riêng lẻ có role_stated rõ (merchant cho Portal settings, buyer cho storefront widget) nhưng ở mức object không có 1 role tổng quát -- cần xác nhận đây có phải invariant đúng (object luôn đa-role) hay chỉ là gap của bộ tài liệu nguồn."
}
```

## OQ-discount-offers-047 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-discount-offers-047",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "quantity-break",
  "summary": "Card \"Appstle℠ Subscriptions App\" dưới info banner của Volume discount for subscription (Quantity Break) được tài liệu nguồn tự diễn giải (hedged, chưa xác nhận) thành \"app Quantity Break không tự có hạ tầng subscription riêng mà phụ thuộc vào 1 app subscription riêng\" — cách diễn đạt chung của app có thể tương thích app subscription khác ngoài Appstle. Cần PO/Dev xác nhận app Quantity Break có phụ thuộc cứng vào một app subscription ngoài hay không, và nếu có thì giới hạn ở app nào (KB-074, INFERRED/LOW, tách riêng khỏi KB-043 vì mang nội dung hedged mà KB-043 không có).",
  "staging_observation": "Ghi chú quan sát staging 2026-10-18 (OBSERVED_CURRENT, không resolve, giữ NEEDS_CONFIRMATION): Form subscription mới: banner nguyên văn + card 'Recommended app:' chỉ nhắc Appstle (Free to install). (store staging hiện tại, 2026-10-18)",
  "staging_observation_kb_ids": [
    "quantity-break#KB-077"
  ]
}
```

## OQ-discount-offers-048 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-discount-offers-048",
  "type": "OPEN_ISSUE",
  "feature_id": null,
  "summary": "Quy ước confirmation_source.type cho toàn bộ product qik-volume (áp dụng cho 329 item CONFIRMED_EXPECTED trên cả 8 object, không riêng discount-offers): bộ tài liệu nguồn \"qa-volume-kb\" là KB do chính QA tự biên soạn từ live-test qua Playwright MCP trên store test-vl-1 -- KHÔNG phải tài liệu dev-gen từ source code, KHÔNG phải spec/PRD chính thức, và KHÔNG phải một hệ thống test case có track (không có test-case ID/PASS/build record). Claim không gắn 1 ngày live-test cụ thể (narrative chung) được gán type=\"spec_doc\", và claim gắn 1 ngày live-test cụ thể được gán type=\"test_case\" -- một pragmatic nearest-fit trong 4 giá trị enum cố định của §3, không giá trị nào khớp chữ nghĩa 100%. Hệ quả cần biết: theo §12.5, 192 item \"spec_doc\" (claim không gắn ngày, nguồn yếu hơn) KHÔNG có blocker (a) chặn một dev_doc tương lai ghi đè chúng, trong khi 137 item \"test_case\" (claim gắn ngày live-verify) CÓ. Đây là lựa chọn chấp nhận được cho lần bootstrap đầu (không có lựa chọn nào khớp 100% trong 4 giá trị enum cố định) nhưng cần ghi lại tường minh, không âm thầm hấp thụ. Revisit nếu/khi có Testlane test-case backfill chính thức hoặc spec_doc thật cho product này."
}
```

## OQ-discount-offers-049 — CONFLICT

```json
{
  "oq_id": "OQ-discount-offers-049",
  "type": "CONFLICT",
  "feature_id": "quantity-break",
  "summary": "Mặc định 3 checkbox Combination (Product/Order/Shipping) của offer Quantity Break: tài liệu nói tắt hết, staging hiện bật hết (kèm dropdown 'One per product (best value wins)'). Expected mặc định là gì?",
  "side_a": "Base KB-055: tất cả default unchecked (QVD-25).",
  "side_b": "Staging KB-082: cả 3 CHECKED mặc định; offer lưu combinesWith true/true/true.",
  "conflict_group": "CONF-discount-offers-R1018-01",
  "kb_ids": [
    "quantity-break#KB-055",
    "quantity-break#KB-082"
  ],
  "check_ids": [
    "quantity-break:CHK-034"
  ],
  "related_oq_ids": [
    "OQ-discount-offers-024",
    "OQ-discount-offers-035"
  ]
}
```

## OQ-discount-offers-050 — CONFLICT

```json
{
  "oq_id": "OQ-discount-offers-050",
  "type": "CONFLICT",
  "feature_id": "quantity-break",
  "summary": "Màu mặc định Appearance & style của offer Quantity Break: tài liệu #2196F3/#262626/#FC81C7/#FFFFFF, staging #606B57/#1C1D21/#D75E60/#FFFFFF. Default hiện hành là bộ nào?",
  "side_a": "Base KB-054: #2196F3 / #262626 / #FC81C7 / #FFFFFF.",
  "side_b": "Staging KB-081: #606B57 / #1C1D21 / #D75E60 / #FFFFFF.",
  "conflict_group": "CONF-discount-offers-R1018-02",
  "kb_ids": [
    "quantity-break#KB-054",
    "quantity-break#KB-081"
  ],
  "check_ids": [
    "quantity-break:CHK-033"
  ]
}
```

## OQ-discount-offers-051 — CONFLICT

```json
{
  "oq_id": "OQ-discount-offers-051",
  "type": "CONFLICT",
  "feature_id": "quantity-break",
  "summary": "Label type mặc định của tier 2 Quantity Break: tài liệu 'Flat', staging 'Classic' (dropdown không có 'Flat').",
  "side_a": "Base KB-017: tier 2 label 'Flat' text 'Most popular'.",
  "side_b": "Staging KB-076: tier 2 Label type 'Classic', options Classic/Oval/Tag/Callout.",
  "conflict_group": "CONF-discount-offers-R1018-03",
  "kb_ids": [
    "quantity-break#KB-017",
    "quantity-break#KB-076"
  ],
  "check_ids": [
    "quantity-break:CHK-008"
  ]
}
```

## OQ-discount-offers-052 — CONFLICT

```json
{
  "oq_id": "OQ-discount-offers-052",
  "type": "CONFLICT",
  "feature_id": "multibuy-mix-match-combo",
  "summary": "Tier mặc định khi tạo Multibuy: tài liệu 1 tier (qty 1, $10), staging 3 tier (2→$10, 3→$20, 4→$30).",
  "side_a": "Base KB-022: 1 tier quantity 1 $10.",
  "side_b": "Staging KB-086: 3 tier 2/$10, 3/$20, 4/$30.",
  "conflict_group": "CONF-discount-offers-R1018-04",
  "kb_ids": [
    "multibuy-mix-match-combo#KB-022",
    "multibuy-mix-match-combo#KB-086"
  ],
  "check_ids": [
    "multibuy-mix-match-combo:CHK-009"
  ]
}
```

## OQ-discount-offers-053 — CONFLICT

```json
{
  "oq_id": "OQ-discount-offers-053",
  "type": "CONFLICT",
  "feature_id": null,
  "summary": "Overlap Quantity Break × Multibuy: tài liệu nói luôn đúng một discount, không bao giờ cả hai/không chia; staging thấy một giỏ (11 đơn vị, add không property) tách 2 line cùng product mang 2 mã khác nhau. Expected là gì? (Không suy quy tắc ưu tiên — topic discount-priority/discount-calculation không supersede.)",
  "side_a": "Base KB-005: đúng một discount thắng, không cả hai, không chia (store test-vl-1).",
  "side_b": "Staging KB-028: line 4 đơn vị mã Multibuy + line 7 đơn vị mã Quantity Break trên cùng product (2/2 lần); các giỏ khác mỗi line một mã, mã thắng tương quan với đường add (KB-026/027).",
  "conflict_group": "CONF-discount-offers-R1018-05",
  "kb_ids": [
    "_object-level#KB-005",
    "_object-level#KB-028"
  ],
  "check_ids": [
    "multibuy-mix-match-combo:CHK-059",
    "quantity-break:CHK-082",
    "wholesale-pricing-offer:CHK-025"
  ],
  "related_oq_ids": [
    "OQ-discount-offers-008",
    "OQ-discount-offers-030",
    "OQ-discount-offers-031",
    "OQ-discount-offers-045"
  ]
}
```

## OQ-discount-offers-054 — CONFLICT

```json
{
  "oq_id": "OQ-discount-offers-054",
  "type": "CONFLICT",
  "feature_id": "wholesale-pricing-offer",
  "summary": "Header cột thứ 3 bảng Wholesale (layout table): tài liệu 'Unit price', staging 'ITEM PRICE'.",
  "side_a": "Base KB-WPO-059: Quantity | Discount | Unit price.",
  "side_b": "Staging KB-WPO-082: QUANTITY | DISCOUNT | ITEM PRICE.",
  "conflict_group": "CONF-discount-offers-R1018-06",
  "kb_ids": [
    "wholesale-pricing-offer#KB-WPO-059",
    "wholesale-pricing-offer#KB-WPO-082"
  ],
  "check_ids": [
    "wholesale-pricing-offer:CHK-012"
  ],
  "related_oq_ids": [
    "OQ-discount-offers-041"
  ]
}
```

## OQ-discount-offers-055 — CONFLICT

```json
{
  "oq_id": "OQ-discount-offers-055",
  "type": "CONFLICT",
  "feature_id": "quantity-break",
  "summary": "End time mặc định khi end date = start date: tài liệu 11:59 PM; staging (tick end date trên offer đã lưu, start hôm nay) điền End date = hôm nay, End time ≈ hiện tại + 1 giờ. Quy tắc hiện hành là gì (khác nhau giữa form mới và offer đã lưu?)",
  "side_a": "Base KB-057: start = end date → end time default 11:59 PM.",
  "side_b": "Staging KB-084: End date = hôm nay, End time ≈ giờ hiện tại + 1h (form mới: start + 1 ngày).",
  "conflict_group": "CONF-discount-offers-R1018-08",
  "kb_ids": [
    "quantity-break#KB-057",
    "quantity-break#KB-084"
  ],
  "check_ids": [
    "quantity-break:CHK-036",
    "quantity-break:CHK-077"
  ],
  "related_oq_ids": [
    "OQ-discount-offers-025"
  ]
}
```

## OQ-discount-offers-056 — CONFLICT

```json
{
  "oq_id": "OQ-discount-offers-056",
  "type": "CONFLICT",
  "feature_id": "quantity-break",
  "summary": "Slots QVD-127 trên widget Quantity Break: tài liệu nói có slot hiện dần theo số unit còn thiếu; staging (layout mặc định) không có slot (slot chỉ ở widget Multibuy). Slot phụ thuộc layout/cấu hình, hay đã bỏ?",
  "side_a": "Base KB-024: storefront hiển thị slots đến tier kế tiếp (QVD-127).",
  "side_b": "Staging KB-087: widget Quantity Break không có slot.",
  "conflict_group": "CONF-discount-offers-R1018-07",
  "kb_ids": [
    "quantity-break#KB-024",
    "quantity-break#KB-087"
  ],
  "check_ids": [
    "quantity-break:CHK-029",
    "quantity-break:CHK-079"
  ]
}
```

## OQ-discount-offers-057 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-discount-offers-057",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "multibuy-mix-match-combo",
  "summary": "Customer product selection behavior trên staging có 3 lựa chọn (thêm 'Direct to collection page'), mặc định 'Redirect to specific page/URL' và lưu được với URL rỗng (khi đó slot '+' trên storefront không phản hồi); tài liệu nói 2 cách (popup/redirect) và ticket nói mặc định popup. Expected mặc định và có nên chặn lưu URL rỗng?",
  "kb_ids": [
    "multibuy-mix-match-combo#KB-003",
    "multibuy-mix-match-combo#KB-045",
    "multibuy-mix-match-combo#KB-088"
  ],
  "check_ids": [],
  "related_oq_ids": [
    "OQ-discount-offers-020"
  ]
}
```

## OQ-discount-offers-058 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-discount-offers-058",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "wholesale-pricing-offer",
  "summary": "Trên product thuộc cả Wholesale (layout table) và Quantity Break, composer Wholesale ở 11/21 đơn vị không đánh dấu hàng active và 'Subtotal' hiện giá gốc (không trừ 15%/20%), trong khi tài liệu nói hàng active được highlight và subtotal gạch giá gốc khi có discount. Đây là hành vi đúng khi overlap (offer khác thắng ở cart) hay lỗi hiển thị?",
  "kb_ids": [
    "wholesale-pricing-offer#KB-WPO-054",
    "wholesale-pricing-offer#KB-WPO-060",
    "wholesale-pricing-offer#KB-WPO-087"
  ],
  "check_ids": [],
  "related_oq_ids": [
    "OQ-discount-offers-043"
  ]
}
```

## OQ-discount-offers-059 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-discount-offers-059",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": null,
  "summary": "Option 'Discount code' trên form Quantity Break/Multibuy staging không bị khoá (chọn được, có field Discount code + Generate), trong khi tài liệu nói chuyển sang discount code phải liên hệ support (Wholesale KB-WPO-007, ticket Multibuy KB-007). Discount code nay là self-serve cho mọi loại offer? (Form Wholesale và việc lưu offer discount code chưa kiểm.)",
  "kb_ids": [
    "_object-level#KB-011",
    "wholesale-pricing-offer#KB-WPO-007",
    "multibuy-mix-match-combo#KB-007"
  ],
  "check_ids": [],
  "related_oq_ids": [
    "OQ-discount-offers-028"
  ]
}
```

## OQ-discount-offers-060 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-discount-offers-060",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": null,
  "summary": "Section Combination có dropdown mới 'One per product (best value wins)' (mặc định) / 'Multiple per product' dưới Product discount — tài liệu không nhắc. Ý nghĩa nghiệp vụ và quan hệ với overlap giữa các offer của app? (Chỉ hỏi, không suy quy tắc ưu tiên.)",
  "kb_ids": [
    "_object-level#KB-012"
  ],
  "check_ids": [],
  "related_oq_ids": [
    "OQ-discount-offers-008",
    "OQ-discount-offers-045"
  ]
}
```

## OQ-discount-offers-061 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-discount-offers-061",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": null,
  "summary": "Manage offers staging có filter Status 'Scheduled' và các action 'Rename', 'Ask Sidekick about this offer', 'Deactivate', 'Duplicate' mà tài liệu không nhắc (tài liệu chỉ nêu Running/Expired, không Draft). Đây là phạm vi chính thức cần test?",
  "kb_ids": [
    "_object-level#KB-016"
  ],
  "check_ids": [
    "quantity-break:CHK-084"
  ]
}
```

## OQ-discount-offers-062 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-discount-offers-062",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": null,
  "summary": "Trang Create offer staging có thẻ thứ 6 'Product recommendations (Upselling)' (badge Recommended, 'Free to install' — app bên thứ ba). Thẻ này có thuộc phạm vi app (điều kiện hiển thị) không?",
  "kb_ids": [
    "_object-level#KB-009"
  ],
  "check_ids": []
}
```

## OQ-discount-offers-063 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-discount-offers-063",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": null,
  "summary": "Modal 'How's your experience so far?' (xin review) xuất hiện sau khi lưu offer tạo tay thứ 2 (không phải offer AI), không xuất hiện ở offer 1 và 3. Điều kiện kích hoạt expected là gì? (Liên quan object ask-for-review — base nói overlay gắn với offer AI.)",
  "kb_ids": [
    "_object-level#KB-020"
  ],
  "check_ids": []
}
```

## OQ-discount-offers-064 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-discount-offers-064",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": null,
  "summary": "Internal name không hiện trên UI storefront nhưng có trong JSON cấu hình nhúng ở HTML PDP (kèm discount id, lịch của offer Scheduled). Tài liệu nói internal name chỉ merchant thấy — việc lộ qua view-source có chấp nhận được không?",
  "kb_ids": [
    "_object-level#KB-029"
  ],
  "check_ids": [],
  "related_oq_ids": [
    "OQ-discount-offers-026"
  ]
}
```

## OQ-discount-offers-065 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-discount-offers-065",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": null,
  "summary": "Known defect chuỗi text thô dưới nút Add to cart (QVD-28) không tái hiện trên staging (theme khác Dawn, product không có swatch). Bug đã được sửa hay chỉ do khác theme/dữ liệu? Cần kiểm lại với product có swatch màu/ảnh.",
  "kb_ids": [
    "_object-level#KB-008",
    "_object-level#KB-030"
  ],
  "check_ids": [
    "quantity-break:CHK-063",
    "wholesale-pricing-offer:CHK-029"
  ]
}
```

## OQ-discount-offers-066 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-discount-offers-066",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": null,
  "summary": "Mở form offer MỚI (chưa sửa gì) đã hiện save bar 'Unsaved changes' và chặn điều hướng back/nav (không có modal), Discard không hỏi lại. Đây là hành vi mong muốn?",
  "kb_ids": [
    "_object-level#KB-018"
  ],
  "check_ids": [
    "quantity-break:CHK-085"
  ]
}
```

## OQ-discount-offers-067 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-discount-offers-067",
  "type": "OPEN_ISSUE",
  "feature_id": null,
  "summary": "Document iframe app tải từ https://staging-bkv-embedded.qikify.com — host không nằm trong environments.staging.expected_api_base và config không khai host bổ sung. Chờ operator xác nhận host có hợp lệ cho staging (additional_api_hosts) hay không; item giữ LOW, không oracle.",
  "kb_ids": [
    "_object-level#KB-022"
  ],
  "check_ids": []
}
```

## OQ-discount-offers-068 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-discount-offers-068",
  "type": "OPEN_ISSUE",
  "feature_id": null,
  "summary": "POST /api/completions/review trên staging trả 500 với stack trace debug (đường dẫn nội bộ, thư viện vendor) mỗi lần mở form offer (9/9). Ghi nhận như issue staging — không tự escalate; operator quyết có báo dev không.",
  "kb_ids": [
    "_object-level#KB-021"
  ],
  "check_ids": []
}
```

## OQ-discount-offers-069 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-discount-offers-069",
  "type": "OPEN_ISSUE",
  "feature_id": "multibuy-mix-match-combo",
  "summary": "Popup Multibuy trên staging: mỗi lần 'Pick' console báo 'TypeError: Cannot read properties of null (reading 'url')' và subtotal/slot trong popup không cập nhật (dù 'Done' vẫn thêm đúng item vào cart). Có thể liên quan product không có ảnh — cần xác nhận là defect hay do dữ liệu thử.",
  "kb_ids": [
    "multibuy-mix-match-combo#KB-094"
  ],
  "check_ids": [],
  "related_oq_ids": [
    "OQ-discount-offers-021"
  ]
}
```

## OQ-discount-offers-070 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-discount-offers-070",
  "type": "OPEN_ISSUE",
  "feature_id": null,
  "summary": "POST /api/events (ghi analytics) từ storefront nhận request guest không thấy header auth, response CORS allow-origin '*'. Khả năng gửi event giả chưa kiểm (ngoài policy). Ghi nhận bề mặt bảo mật — không tự escalate.",
  "kb_ids": [
    "_object-level#KB-024"
  ],
  "check_ids": []
}
```

## OQ-discount-offers-071 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-discount-offers-071",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "wholesale-pricing-offer",
  "summary": "Tạo offer có start date tương lai: discount Shopify được tạo ở trạng thái ACTIVE (startsAt = lúc lưu) rồi vài giây sau mới update sang SCHEDULED. Khoảng ACTIVE ngắn này có được chấp nhận (rủi ro áp discount sớm) không?",
  "kb_ids": [
    "wholesale-pricing-offer#KB-WPO-086"
  ],
  "check_ids": [],
  "related_oq_ids": [
    "OQ-discount-offers-044"
  ]
}
```

## OQ-discount-offers-072 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-discount-offers-072",
  "type": "OPEN_ISSUE",
  "feature_id": "multibuy-mix-match-combo",
  "summary": "[Regression watch — known defect] [Regression-watch, KNOWN_DEFECT/limitation — KHÔNG dùng làm oracle] Đổi quantity trực tiếp trong cart có thể hiện discount/compare price inconsistent",
  "detail": "Known limitation KB-069: đổi quantity trực tiếp trong cart có thể hiện discount/compare price không nhất quán (ràng buộc hiển thị cart của Shopify, đã được accept). Limitation này còn được chấp nhận không, và mức lệch nào thì coi là regression?",
  "kb_ids": [
    "multibuy-mix-match-combo#KB-069"
  ],
  "check_ids": [
    "multibuy-mix-match-combo:CHK-055"
  ]
}
```

## OQ-discount-offers-073 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-discount-offers-073",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "multibuy-mix-match-combo",
  "summary": "Backend lưu \"How discount is applied\" dưới field tier_application_method, xử lý trong multibuy-discount Function",
  "detail": "Phanh derivation: oracle duy nhất KB-043 có derivation code_artifact (suy từ cách dữ liệu tổ chức trong code). Tên field tier_application_method và 2 giá trị per_group/highest_tier_all có đúng với backend hiện hành không? Lưu ý staging 2026-10-18 thấy offer lưu giá trị ẩn discount_apply_type 'per_combo' (KB-086) — cần Dev xác nhận tên field/giá trị thật.",
  "kb_ids": [
    "multibuy-mix-match-combo#KB-043",
    "multibuy-mix-match-combo#KB-086"
  ],
  "check_ids": [
    "multibuy-mix-match-combo:CHK-026"
  ]
}
```

## OQ-discount-offers-074 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-discount-offers-074",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "multibuy-mix-match-combo",
  "summary": "Empty \"+\" combo slot tồn tại trong DOM với id qvl-multibuy-tier_add-more",
  "detail": "Phanh derivation: oracle duy nhất KB-051 có derivation code_artifact. Slot '+' trống được đánh dấu bằng id hay class `qvl-multibuy-tier_add-more`? Staging 2026-10-18 (KB-092) ghi nhận class `qvl-multibuy-tier_add-more` — cần Dev xác nhận selector ổn định trước khi dùng cho automation.",
  "kb_ids": [
    "multibuy-mix-match-combo#KB-051",
    "multibuy-mix-match-combo#KB-092"
  ],
  "check_ids": [
    "multibuy-mix-match-combo:CHK-032"
  ]
}
```

## OQ-discount-offers-075 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-discount-offers-075",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "multibuy-mix-match-combo",
  "summary": "Widget Multibuy trên PDP: cấu trúc, phản ánh cart thật, không chặn nút Add to cart của theme",
  "detail": "Cấu trúc widget Multibuy trên PDP staging (progress 3 mốc, slot '+', recommendation inline có stepper + 'Pick', nút ATC của theme không bị chặn) có phải thiết kế mong muốn? Tài liệu chỉ mô tả từng phần (remaining message, progress, slot).",
  "kb_ids": [
    "multibuy-mix-match-combo#KB-092"
  ],
  "check_ids": [
    "multibuy-mix-match-combo:CHK-069"
  ]
}
```

## OQ-discount-offers-076 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-discount-offers-076",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "multibuy-mix-match-combo",
  "summary": "Số trên badge 'Saved' của widget Multibuy so với discount thực trong cart",
  "detail": "Badge 'Saved' của widget Multibuy trên staging hiện số khác discount thực trong cart (cart 6 món giảm $41.00, badge $27.00). Badge 'Saved' tính theo công thức nào (theo tier hiện tại, theo một combo, hay theo cart)? Lệch này có phải lỗi hiển thị gây hiểu nhầm cho buyer?",
  "kb_ids": [
    "multibuy-mix-match-combo#KB-092"
  ],
  "check_ids": [
    "multibuy-mix-match-combo:CHK-070"
  ]
}
```

## OQ-discount-offers-077 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-discount-offers-077",
  "type": "OPEN_ISSUE",
  "feature_id": "quantity-break",
  "summary": "[Regression watch — known defect] [Regression-watch, KNOWN_DEFECT — KHÔNG dùng làm oracle đúng/sai] Giá trị discount âm nhập trực tiếp không bị chặn",
  "detail": "Known defect KB-063: Discount value âm gõ/paste trực tiếp không bị chặn (chỉ nút mũi tên bị chặn). Đây vẫn là defect mở? Expected sau fix là chặn mọi giá trị âm bằng inline error? Nếu lần chạy thấy hành vi khác (đã chặn, hoặc ảnh hưởng giá storefront), báo QA/Dev — không tự kết luận đâu là đúng.",
  "kb_ids": [
    "quantity-break#KB-063"
  ],
  "check_ids": [
    "quantity-break:CHK-047"
  ]
}
```

## OQ-discount-offers-078 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-discount-offers-078",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "quantity-break",
  "summary": "Form 'Quantity breaks for same product' mới: Offer title mặc định và trigger mặc định 'All products'",
  "detail": "Offer title mặc định 'Buy more, save more' và trigger mặc định 'All products' của form Quantity Break mới (quan sát staging) có phải là mặc định mong muốn không? Tài liệu chỉ xác nhận 5 radio và vị trí 'Exclude products', không nêu giá trị mặc định.",
  "kb_ids": [
    "quantity-break#KB-075"
  ],
  "check_ids": [
    "quantity-break:CHK-075"
  ]
}
```

## OQ-discount-offers-079 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-discount-offers-079",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "quantity-break",
  "summary": "Add to cart với widget Quantity Break: số lượng = tier đang chọn, property ẩn; không chọn tier thì theme thêm 1 đơn vị",
  "detail": "Đường add-to-cart của widget Quantity Break trên staging (add.js?qvl-discount với số lượng = tier và property _qvl-volume-id; không chọn tier thì theme thêm 1 đơn vị không property) có phải hành vi mong muốn? Property này còn ảnh hưởng mã thắng khi product thuộc nhiều offer (object:KB-026) — cần xác nhận vai trò của property.",
  "kb_ids": [
    "quantity-break#KB-088"
  ],
  "check_ids": [
    "quantity-break:CHK-080"
  ]
}
```

## OQ-discount-offers-080 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-discount-offers-080",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "quantity-break",
  "summary": "[Mức object] Mỗi offer = một automatic discount Shopify: tạo/sửa/xoá offer đồng bộ discount",
  "detail": "Vòng đời offer ↔ automatic discount Shopify (tạo discount trước khi lưu offer; xoá discount phía client sau DELETE API) quan sát trên staging có phải thiết kế mong muốn? Khi một bước phía client thất bại (ví dụ discountAutomaticDelete lỗi sau khi offer đã xoá) có cơ chế dọn discount mồ côi không — chưa kiểm.",
  "kb_ids": [
    "_object-level#KB-015",
    "_object-level#KB-017"
  ],
  "check_ids": [
    "quantity-break:CHK-083"
  ]
}
```

## OQ-discount-offers-081 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-discount-offers-081",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "quantity-break",
  "summary": "Badge Quantity Break trên card collection/search: text theo tier cao nhất, góc trên-trái",
  "detail": "Badge trên collection/search cho product thuộc nhiều offer chỉ hiện một badge (quan sát: Quantity Break + Wholesale → 'UP TO 20% OFF'; cả 3 loại → 'MULTIBUY'). Quy tắc chọn badge nào là gì? (không suy từ quan sát)",
  "kb_ids": [
    "_object-level#KB-031",
    "_object-level#KB-025"
  ],
  "check_ids": [
    "quantity-break:CHK-086"
  ]
}
```

## OQ-discount-offers-082 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-discount-offers-082",
  "type": "OPEN_ISSUE",
  "feature_id": "wholesale-pricing-offer",
  "summary": "[Regression watch — known defect] [Regression-watch, KNOWN_DEFECT] Sửa Max của 1 tier tạo gap — save không báo lỗi validation",
  "detail": "Known defect KB-WPO-023: tier continuity không được validate (sửa Max tạo gap vẫn lưu được, gap còn sau reload), trái AC gốc 'must be validated for continuity'. Defect còn mở? Expected sau fix là chặn lưu với thông báo gì?",
  "kb_ids": [
    "wholesale-pricing-offer#KB-WPO-023"
  ],
  "check_ids": [
    "wholesale-pricing-offer:CHK-016"
  ]
}
```

## OQ-discount-offers-083 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-discount-offers-083",
  "type": "OPEN_ISSUE",
  "feature_id": "wholesale-pricing-offer",
  "summary": "[Regression watch — known defect] [Regression-watch, KNOWN_DEFECT] Quantity rơi vào gap do misconfiguration — full price, không lỗi hiển thị cho buyer",
  "detail": "Known defect KB-WPO-024: quantity rơi vào gap (do lỗi continuity) nhận full price, không tier highlight, không thông báo cho shopper. Defect còn mở và có kế hoạch xử lý (chặn gap ở portal hay cảnh báo ở storefront) không?",
  "kb_ids": [
    "wholesale-pricing-offer#KB-WPO-024"
  ],
  "check_ids": [
    "wholesale-pricing-offer:CHK-017"
  ]
}
```

## OQ-discount-offers-084 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-discount-offers-084",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "wholesale-pricing-offer",
  "summary": "Add to cart từ composer Wholesale: 1 request nhiều item kèm property ẩn; tier tính trên tổng số lượng các variant line",
  "detail": "Đường add-to-cart của composer Wholesale trên staging (1 request nhiều item, property _qvl-wholesale-id, tier theo tổng số lượng các variant line của cùng product) có phải hành vi mong muốn? Tài liệu nêu tier theo tổng số lượng nhưng không mô tả cơ chế add/property.",
  "kb_ids": [
    "wholesale-pricing-offer#KB-WPO-084"
  ],
  "check_ids": [
    "wholesale-pricing-offer:CHK-031"
  ]
}
```

## OQ-discount-offers-085 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-discount-offers-085",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "wholesale-pricing-offer",
  "summary": "Nút Add to cart của theme bị disable khi composer Wholesale đang ở số lượng 0",
  "detail": "Trên product thuộc cả Wholesale và Quantity Break, nút Add to cart của theme bị disable khi composer Wholesale = 0 dù widget Quantity Break đã chọn tier — buyer muốn mua theo tier Quantity Break bị chặn. Đây là hành vi mong muốn?",
  "kb_ids": [
    "_object-level#KB-025"
  ],
  "check_ids": [
    "wholesale-pricing-offer:CHK-032"
  ]
}
```

## OQ-discount-offers-086 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-discount-offers-086",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "wholesale-pricing-offer",
  "summary": "Badge Wholesale trên card collection/search: 'BULK SAVING' góc trên-trái",
  "detail": "Badge Wholesale 'BULK SAVING' trên collection/search (góc trên-trái, bo 6px) quan sát trên staging có phải hành vi mong muốn? Badge trên ảnh PDP chưa đánh giá được (product thử không có ảnh); badge không phân biệt offer Running với Scheduled.",
  "kb_ids": [
    "_object-level#KB-031"
  ],
  "check_ids": [
    "wholesale-pricing-offer:CHK-035"
  ]
}
```

## OQ-discount-offers-087 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-discount-offers-087",
  "type": "OPEN_ISSUE",
  "feature_id": "multibuy-mix-match-combo",
  "summary": "Chế độ Percentage và 'How discount is applied' (Apply per combo / highest tier) tính giá thế nào trên storefront staging?",
  "detail": "Run giữ mặc định Fixed total price nên control ẩn; 2 mode tính giá chưa có quan sát.",
  "kb_ids": [],
  "check_ids": []
}
```

## OQ-discount-offers-088 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-discount-offers-088",
  "type": "OPEN_ISSUE",
  "feature_id": "multibuy-mix-match-combo",
  "summary": "Badge Multibuy có ẩn khi offer ngoài lịch, và countdown có hiện trên widget Multibuy không; offer sau giờ start/hết hạn hiển thị thế nào?",
  "detail": "KB-076 chưa kiểm được riêng cho Multibuy; chuyển trạng thái theo thời gian NOT_COVERED.",
  "kb_ids": [],
  "check_ids": []
}
```

## OQ-discount-offers-089 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-discount-offers-089",
  "type": "OPEN_ISSUE",
  "feature_id": "multibuy-mix-match-combo",
  "summary": "Popup và widget Multibuy trên mobile và với product có ảnh hiển thị thế nào?",
  "detail": "Popup chỉ kiểm desktop; product thử không có ảnh (badge trên ảnh, lỗi console).",
  "kb_ids": [],
  "check_ids": []
}
```

## OQ-discount-offers-090 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-discount-offers-090",
  "type": "OPEN_ISSUE",
  "feature_id": null,
  "summary": "Gating QVD-167 trên staging chưa quan sát được: khi app embed bị tắt, discount của Quantity Break / Multibuy / Wholesale có còn áp trong cart không (run REFRESH chỉ quan sát với embed Active; tắt embed là theme_change bị cấm, cần operator chủ động tắt/bật).",
  "kb_ids": [],
  "check_ids": [],
  "related_oq_ids": [
    "OQ-discount-offers-001",
    "OQ-discount-offers-009"
  ]
}
```

## OQ-discount-offers-091 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-discount-offers-091",
  "type": "OPEN_ISSUE",
  "feature_id": "quantity-break",
  "summary": "Widget subscription (Subscribe & save / One-time purchase) trên storefront render và tính giá thế nào khi có app subscription (Appstle) và product eligible?",
  "detail": "Template subscription chỉ quan sát được form; stacking formula và reset tier selection không có quan sát storefront — cài app bên thứ ba bị cấm trong run.",
  "kb_ids": [],
  "check_ids": []
}
```

## OQ-discount-offers-092 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-discount-offers-092",
  "type": "OPEN_ISSUE",
  "feature_id": "quantity-break",
  "summary": "Offer Scheduled khi tới giờ start có tự chuyển Running và widget/discount xuất hiện trên storefront không; khi tới end date, countdown về 0 và offer chuyển Expired thì widget/discount ra sao?",
  "detail": "Run chỉ quan sát offer Running và Scheduled trước giờ start (offer bị xoá trước start); chuyển trạng thái theo thời gian NOT_COVERED.",
  "kb_ids": [],
  "check_ids": []
}
```

## OQ-discount-offers-093 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-discount-offers-093",
  "type": "OPEN_ISSUE",
  "feature_id": "quantity-break",
  "summary": "Khi store chạm giới hạn 25 automatic discount của Shopify, app báo gì khi tạo offer Quantity Break mới?",
  "detail": "Store staging có 5/25, không thấy cảnh báo — ngưỡng chưa chạm; mỗi offer chiếm 1 automatic discount nên giới hạn ảnh hưởng trực tiếp việc tạo offer.",
  "kb_ids": [],
  "check_ids": []
}
```

## OQ-discount-offers-094 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-discount-offers-094",
  "type": "OPEN_ISSUE",
  "feature_id": "quantity-break",
  "summary": "Quantity Break có thật sự không gộp số lượng giữa các product khác nhau trên store staging hiện tại?",
  "detail": "Run chỉ đo với offer 1 product; vế 'không pool giữa product khác' của KB-010 chưa có quan sát.",
  "kb_ids": [],
  "check_ids": []
}
```

## OQ-discount-offers-095 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-discount-offers-095",
  "type": "OPEN_ISSUE",
  "feature_id": "wholesale-pricing-offer",
  "summary": "Trên product nằm trong trigger của cả Wholesale và Quantity Break, có đường thêm cart nào tạo line mang property _qvl-wholesale-id không, và khi đó mã nào áp?",
  "detail": "Staging: composer Wholesale trên product overlap gắn property Quantity Break; chưa có line mang _qvl-wholesale-id trên product overlap, chưa kiểm cart trộn line có/không property — không biết Wholesale có thể thắng khi overlap.",
  "kb_ids": [],
  "check_ids": [],
  "related_oq_ids": [
    "OQ-discount-offers-043"
  ]
}
```

## OQ-discount-offers-096 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-discount-offers-096",
  "type": "OPEN_ISSUE",
  "feature_id": "wholesale-pricing-offer",
  "summary": "Offer Wholesale Scheduled khi tới giờ start có tự chuyển Running và widget/discount xuất hiện; khi tới end date chuyển Expired thì sao?",
  "detail": "Offer Scheduled bị xoá trước giờ start; chuyển trạng thái theo thời gian NOT_COVERED.",
  "kb_ids": [],
  "check_ids": [],
  "related_oq_ids": [
    "OQ-discount-offers-044"
  ]
}
```

## OQ-discount-offers-097 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-discount-offers-097",
  "type": "OPEN_ISSUE",
  "feature_id": "wholesale-pricing-offer",
  "summary": "Composer product 1 option khi Wholesale đứng riêng, và layout table ở số lượng có giảm khi product chỉ thuộc Wholesale, hiển thị thế nào?",
  "detail": "Hai trường hợp chỉ quan sát trên product overlap (1 option) hoặc ở 2 đơn vị tier 0% (table).",
  "kb_ids": [],
  "check_ids": []
}
```

## OQ-discount-offers-098 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-discount-offers-098",
  "type": "OPEN_ISSUE",
  "feature_id": "wholesale-pricing-offer",
  "summary": "Typography của form Wholesale có nhóm 'Normal text' (KB-WPO-032) không?",
  "detail": "Explorer chỉ ghi 3 nhóm Heading/Body/Badge, không khẳng định vắng — test case Typography chưa có quan sát đủ.",
  "kb_ids": [],
  "check_ids": []
}
```

## OQ-discount-offers-099 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-discount-offers-099",
  "type": "OPEN_ISSUE",
  "feature_id": "wholesale-pricing-offer",
  "summary": "Account staff hạn quyền có cấu hình offer Wholesale được không; khi store chạm 25 automatic discount thì tạo offer báo gì?",
  "detail": "Không có account phụ; store 5/25 chưa chạm ngưỡng.",
  "kb_ids": [],
  "check_ids": []
}
```

## OQ-discount-offers-100 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-discount-offers-100",
  "type": "OPEN_ISSUE",
  "feature_id": "wholesale-pricing-offer",
  "summary": "Tier continuity (gap) trên store staging hiện tại có còn không được validate như KNOWN_DEFECT KB-WPO-023?",
  "detail": "Run chỉ sửa tier hợp lệ, không thử lại tạo gap; known defect chưa được re-check.",
  "kb_ids": [],
  "check_ids": []
}
```

## OQ-discount-offers-101 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-discount-offers-101",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": null,
  "summary": "Xác nhận expected cho các hành vi rủi ro cao (tiền/discount, mất dữ liệu, quyền) mới quan sát trên staging 2026-10-18 — hiện chỉ là OBSERVED_CURRENT, chưa có nguồn thẩm quyền, không dùng làm oracle STRONG: KB-024 (permission: POST /api/events từ guest không thấy auth, CORS '*'. Item vẫn publish theo kno); KB-026 (tiền / discount-priority: mã thắng theo đường add khi overlap. Item vẫn publish theo knowl); KB-027 (tiền / discount-priority: overlap QB × Wholesale luôn thấy mã QB. Item vẫn publish theo kn)",
  "kb_ids": [
    "_object-level#KB-024",
    "_object-level#KB-026",
    "_object-level#KB-027"
  ],
  "check_ids": []
}
```

## OQ-discount-offers-102 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-discount-offers-102",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "multibuy-mix-match-combo",
  "summary": "Xác nhận expected cho các hành vi rủi ro cao (tiền/discount, mất dữ liệu, quyền) mới quan sát trên staging 2026-10-18 — hiện chỉ là OBSERVED_CURRENT, chưa có nguồn thẩm quyền, không dùng làm oracle STRONG: KB-087 (tiền / discount-calculation: multiplier bật mặc định → nhiều combo trong 1 cart. Item vẫn ); KB-095 (tiền / discount-calculation: pooling Multibuy và phân bổ theo tỷ lệ giá. Item vẫn publish )",
  "kb_ids": [
    "multibuy-mix-match-combo#KB-087",
    "multibuy-mix-match-combo#KB-095"
  ],
  "check_ids": []
}
```

## OQ-discount-offers-103 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-discount-offers-103",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "quantity-break",
  "summary": "Xác nhận expected cho các hành vi rủi ro cao (tiền/discount, mất dữ liệu, quyền) mới quan sát trên staging 2026-10-18 — hiện chỉ là OBSERVED_CURRENT, chưa có nguồn thẩm quyền, không dùng làm oracle STRONG: KB-089 (tiền / discount-calculation: cart tự tính lại mức Quantity Break khi đổi số lượng. Item vẫ)",
  "kb_ids": [
    "quantity-break#KB-089"
  ],
  "check_ids": []
}
```

## OQ-discount-offers-104 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-discount-offers-104",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "wholesale-pricing-offer",
  "summary": "Xác nhận expected cho các hành vi rủi ro cao (tiền/discount, mất dữ liệu, quyền) mới quan sát trên staging 2026-10-18 — hiện chỉ là OBSERVED_CURRENT, chưa có nguồn thẩm quyền, không dùng làm oracle STRONG: KB-WPO-080 (tiền: Max trống ở tier cuối, 42 đơn vị vẫn nhận mức tier cuối. Item vẫn publish theo knowl)",
  "kb_ids": [
    "wholesale-pricing-offer#KB-WPO-080"
  ],
  "check_ids": []
}
```

## OQ-discount-offers-105 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-discount-offers-105",
  "type": "OPEN_ISSUE",
  "feature_id": "quantity-break",
  "summary": "Known defect (tài liệu v1): casing của label đếm gift của Buy X get Y không nhất quán giữa các tier ('1 gift' / '2 Gifts' / '3 gifts') — chỉ là regression watch, không phải expected. Chưa tái kiểm trên staging (run REFRESH 2026-10-18 không tạo offer Buy X get Y).",
  "kb_ids": [
    "quantity-break#KB-039"
  ],
  "check_ids": []
}
```
