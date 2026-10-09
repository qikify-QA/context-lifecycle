# Open Questions — discount-offers

Tổng: 48 mục (NEEDS_CONFIRMATION/CONFLICT/OPEN_ISSUE). Sinh từ bootstrap DOC_BOOTSTRAP đầu tiên cho qik-volume.

- NEEDS_CONFIRMATION: 43
- CONFLICT: 4
- OPEN_ISSUE: 1

## OQ-discount-offers-001 — CONFLICT

```json
{
  "oq_id": "OQ-discount-offers-001",
  "type": "CONFLICT",
  "feature_id": "quantity-break",
  "summary": "[DCONF-001] [CONFLICT - phía A] Banner: automatic discount hoạt động dù app block bị tắt",
  "side_a": "Theo tài liệu \"Quantity Break\" §Shared cross-variant rules, màn hình tạo offer có banner cảnh báo (ghi nhận live 2026-09-03): 'Automatic discounts work even if the app block is disabled. For testing, we recommend using Discount code to prevent customers from receiving unintended discounts.' Đây là 1 phía của xung đột DCONF-001 — xem conflicts[] — mâu thuẫn với hành vi hiện tại được ghi ở §Shared rules sau fix QVD-167 (phía B).",
  "side_b": "Theo tài liệu \"Quantity Break\" §Shared cross-variant rules + §Edge Cases, hiện tại (sau fix QVD-167), discount Function của Quantity Break check theme-embed status và skip áp dụng discount nếu app block không được enable trong theme editor, ngay cả khi cart content khớp 1 tier hợp lệ; regression test của gating này đã được verified: với app/embed bị disable, 1 cart vốn đủ điều kiện 1 tier sẽ không được auto-discount. Đây là phía B của xung đột DCONF-001 — xem conflicts[] — mâu thuẫn với banner cảnh báo ở phía A vẫn còn hiển thị trên UI tạo offer."
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
  "side_b": "Theo tài liệu \"Multibuy – Mix & Match Combo\" §`Business Rules > Multibuy discount badge (QVD-132)`, (ticket QVD-132, chưa được QA xác nhận lại ở mục này) nêu rằng Badge border radius slider default là 10px."
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
  "side_b": "Theo tài liệu \"Multibuy – Mix & Match Combo\" §`Business Rules > Multibuy discount badge (QVD-132)`, (ticket QVD-132, chưa được QA xác nhận lại ở mục này) nêu rằng Badge text default là \"Multi buy\"; để trống thì ẩn badge; recommend khoảng 20-25 ký tự."
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
  "side_b": "Tài liệu §Table layout nêu rằng cùng table này cũng render bên trong Variant Selection Drawer, compact hơn (giảm font size/padding) để fit chiều rộng drawer; hành vi active-row highlight giống hệt và vẫn update live theo stepper. Lưu ý: điều này nhắc tới 'Variant Selection Drawer' như một UI đang tồn tại, trong khi ở §Storefront nêu rằng rendering thực tế trên test-vl-1 là inline, không có drawer — xem DCONF-001, chưa được hoà giải."
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
  "detail": "Sau khi Save và refresh toàn bộ trang Settings, mọi field (trigger/tier/gift/subscription/display/appearance/combination/scheduling/advanced) có reload lại đúng khớp dữ liệu đã lưu không? KB hiện chỉ xác nhận success toast xuất hiện ngay sau Save, chưa có xác nhận riêng cho bước reload."
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
  "detail": "Khi ≥2 offer type (bao gồm Quantity Break) cùng qualify trên 1 cart, biến nào quyết định offer nào thắng (discount rank/order trong Shopify admin? thứ tự Function evaluate? thứ tự add-to-cart?)? Đã xác nhận chắc là đúng 1 offer thắng (không chia/không cả hai), nhưng kết quả bị flip giữa 2 lần test live trên cùng 1 cặp offer — cần PO/Dev xác định rule trước khi viết test case regression xác định cho mọi tình huống overlap."
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
  "detail": "DCONF-001: Automatic discount của Quantity Break có áp dụng khi app block/theme embed bị tắt hay không? Banner UI (KB-060) nói 'có vẫn hoạt động', nhưng fix QVD-167 sau 1 incident thật (77 đơn live, KB-062) cho thấy discount Function SKIP khi app block/theme-embed tắt (KB-061). Cần PO/Dev xác nhận: banner đang là copy cũ chưa update sau fix, hay 'app block' và 'theme embed' là 2 khái niệm Shopify khác nhau mà fix chỉ cover 1 trong 2, hay đây là 1 gap thật cần fix thêm."
}
```

## OQ-discount-offers-010 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-discount-offers-010",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "quantity-break",
  "check_ids": [
    "quantity-break:CHK-065"
  ],
  "summary": "[Cần xác nhận] Portal preview pricing khớp storefront live rendering — chỉ 1 sample, chưa đủ để tổng quát hoá",
  "detail": "Portal tier-settings preview pricing có LUÔN khớp chính xác với giá render thực tế trên storefront cho mọi offer/sản phẩm, hay ví dụ khớp đã quan sát (offer 'Offer 15') chỉ là 1 trường hợp đơn lẻ? Cần thêm ≥1 sample độc lập khác (sản phẩm/offer khác) để nâng cấp thành rule tổng quát CONFIRMED_EXPECTED."
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
  "detail": "True default của field Position (Volume discount for subscription) là 'Above volume tiers' hay 'Below volume tiers'? Ticket gốc và ví dụ live quan sát mâu thuẫn nhau; cần 1 lần test trên offer hoàn toàn mới (chưa qua tay merchant) để xác định default ngoài-hộp."
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
  "detail": "Group 'Content' trong Display settings có tồn tại/được ship cho Quantity Break hay không? 3 ví dụ live kiểm tra đều không thấy group này. Cần PO/Dev xác nhận group này có áp dụng cho offer type này hay chỉ tồn tại ở ticket."
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
  "detail": "Display settings có hành vi accordion (collapsed-by-default, click để mở) như spec mô tả, hay luôn hiển thị (always-visible section) như quan sát qua accessibility-tree gợi ý? Cần 1 lần click-test trực tiếp trên Portal thật để xác nhận."
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
  "detail": "Khi bật checkbox cha của Variant display, 2 field con ('Allow customer to choose variant for single-item offer', 'Variant swatch settings') có thực sự xuất hiện như ticket mô tả hay không? Chưa có ví dụ live nào bật thử checkbox cha này."
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
  "detail": "Checkbox 'Enable countdown timer' có hành vi/validation bổ sung nào liên quan QVD-147 ngoài việc hiện/ẩn 1 countdown timer đơn giản không? Ticket chưa được phân tích sâu; cần PO/Dev xác nhận phạm vi đầy đủ trước khi viết test case regression chi tiết."
}
```

## OQ-discount-offers-016 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-discount-offers-016",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "quantity-break",
  "check_ids": [
    "quantity-break:CHK-071"
  ],
  "summary": "[Cần xác nhận] UI hiển thị khi 1 tier có nhiều gift PRODUCT KHÁC NHAU",
  "detail": "Khi 1 tier có nhiều gift PRODUCT KHÁC NHAU (không cùng loại) được gắn cùng lúc, badge đếm gift và dòng giá hiển thị trên storefront có dạng gì? Tài liệu nguồn chỉ quan sát trường hợp nhiều gift cùng loại; cần 1 lần test live để xác định UI thật."
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
  "detail": "Checkbox 'Allow customers to choose different variants for each item' (Display settings của Quantity Break) có thực sự nối với/chia sẻ configuration của feature Variant Swatches riêng hay không, và nếu có, UI 'Variant swatch settings' hình dạng gì? Hiện Preview chỉ hiện mock data chung, chưa rõ liên kết thật."
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
  "detail": "Khi merchant bật toggle cho widget hiện variant selector riêng, selector đó có thực sự đồng bộ động 2 chiều với variant selector gốc của theme, hay là 2 selector độc lập có thể lệch nhau? Tài liệu tự gắn cờ chưa chắc cho phần đồng bộ này."
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
  "detail": "Quantity pooling across different products (đã confirm cho trigger 'All products', KB-032) có áp dụng nhất quán cho trigger 'Collection' và 'Specific products' không? Cơ chế pooling là core mechanic của Multibuy; nếu khác nhau giữa trigger type thì coverage hiện tại (chỉ test All products) không đủ."
}
```

## OQ-discount-offers-020 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-discount-offers-020",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "multibuy-mix-match-combo",
  "check_ids": [
    "multibuy-mix-match-combo:CHK-028"
  ],
  "summary": "NEEDS_CONFIRMATION — Customer product selection behavior: radio Popup (default) vs Redirect",
  "detail": "Customer product selection behavior có đúng là radio 2 option (Open selection popup [default] Redirect to a specific page/URL) như ticket QVD-106 mô tả không? Cần QA re-confirm live trước khi dùng làm oracle, vì tài liệu này đã phát hiện ≥3 case khác nơi ticket không khớp hành vi live."
}
```

## OQ-discount-offers-021 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-discount-offers-021",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "multibuy-mix-match-combo",
  "check_ids": [
    "multibuy-mix-match-combo:CHK-029"
  ],
  "summary": "NEEDS_CONFIRMATION — Popup mode detail (variant picker slide-up, overlay, no-variant instant add)",
  "detail": "Popup mode detail (variant picker slide-up từ đáy card + overlay semi-transparent cho product có variant; instant add-to-cart + icon đổi state cho product không variant) theo ticket QVD-121 còn khớp hành vi live hiện tại không?"
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
  "detail": "True out-of-the-box default của Multibuy discount badge border radius là 6px (live-observed, KB-081) hay 10px (ticket QVD-132, KB-082)? Hai giá trị khác nhau trong cùng 1 tài liệu, chưa resolve — không dùng được làm expected default cho test case badge appearance."
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
  "detail": "True out-of-the-box default của Multibuy discount badge text là \"MULTIBUY\" (live example, KB-083) hay \"Multi buy\" (ticket, KB-084), hoặc liệu giá trị live đã bị merchant chỉnh? Không dùng được làm expected default cho test case badge text cho tới khi xác nhận."
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
  "detail": "Discount combination section (checkbox combine Order/Product/Shipping discount, theo ticket QVD-108) có đúng cả 3 default off như tài liệu mô tả không? Cần QA re-confirm live."
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
  "detail": "Offer scheduling base rule (start date required, default = creation time, không thể là ngày quá khứ, dùng store timezone; end date optional sau toggle 'Enable end date', default off = chạy vô thời hạn) theo ticket QVD-109 còn khớp hành vi live không?"
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
  "detail": "Internal name có đúng auto-default theo pattern \"Offer #N\" và chỉ merchant thấy (không hiển thị customer) như ticket QVD-103 mô tả không? Cần QA re-confirm live."
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
  "detail": "Offer title default template có đúng là {{quantity_tier}} for {{total_price}} (double braces, theo ticket QVD-103) hay dùng single-brace notation như đã confirm cho Tier Title/Badge (KB-020/021)? Notation đã bị phát hiện sai ở phần Tier settings — rủi ro drift tương tự ở đây chưa loại trừ."
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
  "detail": "Discount method default có đúng là automatic discount, và hành vi khi chạm giới hạn 25/muốn dùng discount code (hướng dẫn liên hệ support, không self-serve) theo ticket QVD-103 còn khớp hành vi live không?"
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
  "detail": "Compare-at-Price logic có thực sự hỗ trợ 1 \"silent\" mode (discount tự áp dụng, widget UI ẩn qua custom CSS) như tài liệu mô tả (feasible, chưa verify) không? Nếu có, giới hạn 25-automatic-discount của Shopify có cần cảnh báo riêng cho merchant khi dùng mode này?"
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
  "detail": "Biến nào quyết định offer nào thắng khi trigger của Multibuy overlap với Quantity Break (2-way)? Kết quả đã bị 'flip' giữa 2 lần test live trên cùng 1 cặp offer, không biến nào được xác định. Cần PO/Dev confirm trước khi viết được regression test case xác định cho trigger-overlap."
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
  "detail": "Khi Wholesale Pricing's own tier có discount nonzero và đồng thời qualify cho tier của Quantity Break/Multibuy, offer nào thắng trong 3-way overlap? Test 3-way hiện có (qty=3) không phải test priority sạch; chưa có dữ liệu trả lời priority thật khi 2 discount active cùng lúc."
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
  "detail": "Khi checkbox \"Allow to apply multiplier discounts per order\" (Maximum discount uses) bị UNCHECK, hành vi chính xác là gì? Setting này chỉ áp dụng cho Fixed-price mode hay cũng ảnh hưởng Percentage mode cùng với toggle riêng của QVD-178?"
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
  "detail": "Khi nhiều unit cùng share giá 'cheapest' trong remainder calculation của Fixed total price tier (pooled quantity có remainder), quy tắc tie-break chọn unit nào bị để lại full price là gì — cart order, product ID, hay yếu tố khác?"
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
  "detail": "Discount-combination checkboxes (Order/Product/Shipping, QVD-108) có phải là 1 UI component chung dùng lại across cả 3 offer type (Quantity Break/Multibuy/Wholesale), hay mỗi offer type có bản copy riêng? Ảnh hưởng tới phạm vi regression."
}
```

## OQ-discount-offers-036 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-discount-offers-036",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "multibuy-mix-match-combo",
  "check_ids": [
    "multibuy-mix-match-combo:CHK-068"
  ],
  "summary": "NEEDS_CONFIRMATION — Hành vi/placement thật của \"Enable countdown timer\" trên storefront",
  "detail": "\"Enable countdown timer\" checkbox (Offer scheduling) có hành vi/placement chính xác là gì trên storefront, và quan hệ của nó với QVD-147 \"Countdown timer to offer\" ra sao?"
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
  "detail": "Wholesale Pricing Offer storefront: 'Variant Selection Drawer' (slide-in panel, theo spec QVD-143 và theo mô tả Table layout) có thực sự tồn tại, hay inline-rendering-on-PDP (đã quan sát live trên test-vl-1) là hành vi chuẩn/cuối? Nếu drawer tồn tại, nó xuất hiện trong điều kiện nào (theme khác, device khác, config khác) mà test-vl-1 chưa cover?"
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
  "detail": "Khi merchant để trống Max của tier cuối (hint 'leave Max empty for unlimited'), việc này chỉ thay đổi display label của tier đó, hay cũng thay đổi discount math thật áp dụng cho quantity vượt ngưỡng? Hint text hiện tại có thể gây hiểu lầm — cần xác nhận hành vi thật trước khi viết oracle cho boundary case này."
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
  "detail": "Khi offer Wholesale chỉ cấu hình trên product có đúng 1 variant type (không có type thứ hai để làm 'type đầu'), rule 'variant type cuối cùng nhận quantity stepper, type khác render single-select' áp dụng ra sao? Logic badge-counter (gắn theo value hiện tại của type đầu) có còn ý nghĩa khi không có type đầu riêng biệt, hay suy biến thành dạng khác?"
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
  "detail": "Việc chuyển đổi Layout (card <-> table) trong Portal có thực sự áp dụng live trên storefront mà không cần reload trang, như ticket AC claim? Claim này chưa được independently verify — cần 1 lần test trực tiếp (hoặc xác nhận PO/Dev) trước khi dùng làm oracle cho check STATE_DATA này."
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
  "detail": "Tài liệu nguồn chỉ xác nhận rằng một GAP do lỗi continuity vẫn tồn tại sau reload (KB-WPO-023, khung KNOWN_DEFECT) — không có statement riêng nào xác nhận rằng một chỉnh sửa tier HỢP LỆ (không tạo gap) cũng persist đúng sau reload. Đây có phải một gap documentation đơn giản (hành vi hiển nhiên, không cần ghi) hay cần 1 test riêng để xác nhận?"
}
```

## OQ-discount-offers-043 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-discount-offers-043",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "wholesale-pricing-offer",
  "check_ids": [
    "wholesale-pricing-offer:CHK-026"
  ],
  "summary": "[NEEDS_CONFIRMATION] Offer nào thắng khi Wholesale overlap Quantity Break/Multibuy — biến quyết định CHƯA xác định",
  "detail": "Khi Wholesale Pricing Offer overlap trigger với Quantity Break và/hoặc Multibuy trên cùng 1 cart VÀ cả hai offer đều có discount active khác 0% (không phải trường hợp qty=3 đã test, nơi Wholesale Tier 1 là 0%), biến nào quyết định offer nào thắng? Kết quả đã quan sát bị flip giữa 2 lần test live trên cùng cặp offer — cần PO/Dev xác nhận rule priority (discount rank trong Shopify Admin, thứ tự function evaluate, thứ tự add-to-cart, hay yếu tố khác) trước khi viết được oracle regression xác định cho trigger-overlap."
}
```

## OQ-discount-offers-044 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-discount-offers-044",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "wholesale-pricing-offer",
  "check_ids": [
    "wholesale-pricing-offer:CHK-030"
  ],
  "summary": "[NEEDS_CONFIRMATION] Campaign scheduling thực sự gate offer availability cho Wholesale (chưa re-verify riêng)",
  "detail": "Campaign scheduling (start/end date) của Wholesale Pricing Offer có thực sự gate việc hiển thị/áp dụng offer trên storefront đúng như Quantity Break/Multibuy, hay đây chỉ là một suy đoán từ sự tương tự UI chưa được live-test riêng cho Wholesale? Cần 1 lần test riêng hoặc xác nhận PO/Dev trước khi dùng CHK-011 (UI fields) làm proxy cho enforcement hành vi thật."
}
```

## OQ-discount-offers-045 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-discount-offers-045",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": null,
  "summary": "Khi 2-3 offer type (Quantity Break / Multibuy – Mix & Match Combo / Wholesale Pricing Offer) cùng qualify trên 1 cart (trigger overlap), đúng 1 discount thắng -- xác nhận không bao giờ cả hai, không bao giờ chia -- nhưng biến quyết định offer nào thắng chưa được xác định. Kết quả live-test bị flip giữa 2 lần test trên cùng 1 cặp offer (store test-vl-1, 2026-09-03); test 3-way (2026-09-09) không đủ sạch để trả lời vì Wholesale Tier 1 = 0% ở mức quantity test đó, nên không có 2 discount active cùng lúc thật. Cần PO/Dev xác nhận rule độ ưu tiên (discount rank/order trong Shopify admin? function evaluate sau? thứ tự add-to-cart?) trước khi viết được test case regression xác định cho trigger-overlap."
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
  "summary": "Card \"Appstle℠ Subscriptions App\" dưới info banner của Volume discount for subscription (Quantity Break) được tài liệu nguồn tự diễn giải (hedged, chưa xác nhận) thành \"app Quantity Break không tự có hạ tầng subscription riêng mà phụ thuộc vào 1 app subscription riêng\" — cách diễn đạt chung của app có thể tương thích app subscription khác ngoài Appstle. Cần PO/Dev xác nhận app Quantity Break có phụ thuộc cứng vào một app subscription ngoài hay không, và nếu có thì giới hạn ở app nào (KB-074, INFERRED/LOW, tách riêng khỏi KB-043 vì mang nội dung hedged mà KB-043 không có)."
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

