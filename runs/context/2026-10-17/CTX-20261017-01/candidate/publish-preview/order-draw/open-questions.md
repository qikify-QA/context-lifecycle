# Open Questions — order-draw

Tổng: 79 mục (CONFLICT 6 · OPEN_ISSUE 33 · NEEDS_CONFIRMATION 40). Version 1 sinh từ bootstrap DOC_BOOTSTRAP (bộ Product KB v1 do dev viết từ source code, 2026-10-16); version 2 thêm mục từ REFRESH trên staging 2026-10-16 (quan sát OBSERVED_CURRENT); REFRESH trên staging 2026-10-17 thêm mục mới, ghi `staging_observation` (OBSERVED_CURRENT, không resolve NEEDS_CONFIRMATION/CONFLICT) và gỡ OPEN_ISSUE đã được quan sát trả lời (xem CHANGELOG). Mỗi mục là một khối json; `kb_ids` dạng `<feature_key>#KB-xxx` (hoặc `_object-level.<object>#KB-xxx` cho tầng object), `check_ids` dạng `<feature_key>:CHK-xxx`.

## OQ-order-draw-001 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-order-draw-001",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": null,
  "summary": "Bộ tài liệu nguồn không chỉ định role mặc định cho object này (bootstrap-request để role null): các KB item mang scope.role theo vai trò tài liệu nêu cho từng hành vi, hoặc \"unspecified\" khi tài liệu không nêu. Cần PO/Dev xác nhận ma trận role → quyền thực tế trên production (merchant owner/staff, khách, admin Mysbox theo từng role) trước khi dùng các check PERMISSION làm oracle."
}
```

## OQ-order-draw-002 — CONFLICT

```json
{
  "oq_id": "OQ-order-draw-002",
  "type": "CONFLICT",
  "feature_id": "physical-sealed-box-fulfilment",
  "summary": "Các công tắc hậu xử lý box physical (trừ tồn kho, tag đơn, note đơn) là cài đặt merchant đổi được trong portal hay setting ẩn chỉ nhân viên Mysbox đổi trong back-office.",
  "side_a": "Tài liệu \"Box physical (sealed) và digital (instant)\" §Hậu xử lý: merchant thấy gì trong Shopify: các hành động hậu xử lý được cài đặt ở portal \"General settings > Order prize information\".",
  "side_b": "Tài liệu \"General Settings\" §Setting ẩn (không có trên màn hình; nhân viên Mysbox đổi trong back-office): physical_inventory_enabled, physical_tag_enabled, physical_note_enabled nằm trong bảng setting ẩn; trên màn hình \"Order prize information\" chỉ có khoá metafield.",
  "conflict_group": "CONF-order-draw-03",
  "kb_ids": [
    "physical-sealed-box-fulfilment#KB-019",
    "physical-sealed-box-fulfilment#KB-020"
  ],
  "check_ids": [
    "physical-sealed-box-fulfilment:CHK-024"
  ],
  "staging_observation": "Ghi chú quan sát staging cho OQ-order-draw-002 / CONF-order-draw-03: Pane 'Order prize information' (2 lần) chỉ có 'Metafield format' + ví dụ, không có công tắc trừ kho/tag/note — khớp phía KB-020 (các công tắc là setting ẩn, không trên màn hình) ở phần 'không có trên màn hình'; việc chúng có tồn tại ở back-office không quan sát được. | 2026-10-17: Form Create box (Single, Sealed) và mọi pane General Settings không có công tắc trừ kho / tag / note cho box physical; pane Sealed box chỉ có \"Metafield format\". Phần back-office vẫn không quan sát được.",
  "staging_observation_kb_ids": [
    "physical-sealed-box-fulfilment#KB-065",
    "physical-sealed-box-fulfilment#KB-019",
    "physical-sealed-box-fulfilment#KB-020",
    "physical-sealed-box-fulfilment#KB-067",
    "physical-sealed-box-fulfilment#KB-068"
  ],
  "status_note": "Quan sát staging chỉ là OBSERVED_CURRENT; conflict vẫn mở, chưa resolve."
}
```

## OQ-order-draw-003 — CONFLICT

```json
{
  "oq_id": "OQ-order-draw-003",
  "type": "CONFLICT",
  "feature_id": "prizes-added-to-order",
  "summary": "Khách có luôn nhận email thông báo sửa đơn của Shopify mỗi lần quà được thêm vào đơn hay không.",
  "side_a": "Tài liệu \"Quà được thêm vào đơn Shopify\" §Câu hỏi thường gặp: một email thông báo sửa đơn mỗi lần quà được thêm; tài liệu \"General Settings\" §Setting ẩn: khi orderUpdateEmailDisabled tắt, khách vẫn nhận email Shopify khi đơn bị sửa.",
  "side_b": "Tài liệu \"Quà được thêm vào đơn Shopify\" §App làm gì với đơn: có cấu hình ẩn để tắt email này (General Settings xác nhận cờ orderUpdateEmailDisabled chặn email), và — chưa xác nhận — việc email đến khách còn phụ thuộc cài đặt thông báo của store.",
  "conflict_group": "CONF-order-draw-01",
  "kb_ids": [
    "prizes-added-to-order#KB-027",
    "prizes-added-to-order#KB-028",
    "prizes-added-to-order#KB-029",
    "prizes-added-to-order#KB-030"
  ],
  "check_ids": [
    "prizes-added-to-order:CHK-027"
  ],
  "staging_observation": "Ghi chú quan sát staging cho OQ-order-draw-003 / CONF-order-draw-01: 3 đơn: mỗi đơn đúng 1 'edited this order' + 1 'sent an order edited email' cùng mốc (kể cả đơn 2 box) — khớp phía KB-027 về số lần gửi. Việc email tới hộp thư, cờ orderUpdateEmailDisabled và cài đặt thông báo store (KB-028/029/030) không quan sát được. | 2026-10-17: Timeline #1009, #1010 mỗi đơn đúng 1 \"sent an order edited email\" kèm lần sửa đơn.",
  "staging_observation_kb_ids": [
    "prizes-added-to-order#KB-078",
    "prizes-added-to-order#KB-027",
    "prizes-added-to-order#KB-028",
    "prizes-added-to-order#KB-029",
    "prizes-added-to-order#KB-030",
    "prizes-added-to-order#KB-081"
  ],
  "status_note": "Quan sát staging chỉ là OBSERVED_CURRENT; conflict vẫn mở, chưa resolve."
}
```

## OQ-order-draw-004 — CONFLICT

```json
{
  "oq_id": "OQ-order-draw-004",
  "type": "CONFLICT",
  "feature_id": "prizes-added-to-order",
  "summary": "Điều kiện \"cửa sổ resell đã hết\" có bắt buộc cho mọi đường kích hoạt thêm quà hay chỉ cho đường khách tự mở và job sync. Phía còn lại của mâu thuẫn (bảng \"Ai kích hoạt\": mở qua Flow hoặc auto-unbox thì thêm ngay, không xét window) thuộc shard của feature khác; orchestrator cần nối cùng conflict group.",
  "side_a": "Tài liệu \"Quà được thêm vào đơn Shopify\" §Khi nào quà được thêm, khối điều kiện: cần đủ cả ba điều kiện, trong đó có cửa sổ resell đã hết (hoặc box không bật buyback).",
  "side_b": "Cùng tài liệu, cùng mục, bảng \"Ai kích hoạt\": merchant mở qua Flow hoặc auto-unbox thì quà vào đơn ngay lập tức, không xét window.",
  "conflict_group": "CONF-reveal-01",
  "kb_ids": [
    "auto-unbox#KB-049",
    "prizes-added-to-order#KB-017"
  ],
  "staging_observation": "Ghi chú quan sát staging cho OQ-order-draw-004 / CONF-reveal-01: Nhánh box không bật buyback, khách tự mở: quà vào đơn ~5–7s sau box cuối, mở một phần không thêm quà — khớp điều kiện '(hoặc box không bật buyback)' của KB-017. Nhánh auto-unbox/Flow (KB-049) và nhánh box có buyback không quan sát (auto-unbox tắt, buyback khoá trên Free).",
  "staging_observation_kb_ids": [
    "prizes-added-to-order#KB-077",
    "prizes-added-to-order#KB-017",
    "auto-unbox#KB-049"
  ],
  "status_note": "Quan sát staging chỉ là OBSERVED_CURRENT; conflict vẫn mở, chưa resolve."
}
```

## OQ-order-draw-005 — CONFLICT

```json
{
  "oq_id": "OQ-order-draw-005",
  "type": "CONFLICT",
  "feature_id": "prizes-added-to-order",
  "summary": "Khi merchant mở box thủ công (\"Open all boxes\" trong portal, \"Unbox all boxes\" ở trang đơn Shopify admin), quà được thêm vào đơn ngay (và chấm dứt resell) hay vẫn chờ cửa sổ resell như khi khách mở.",
  "side_a": "Tài liệu \"Orders và Reveal — tổng quan\" §Sơ đồ tổng quát: merchant mở / Flow mở / auto-unbox thì thêm ngay, bỏ qua resell window; support playbook \"Playbook 1: đơn hàng, bốc thăm và mở box\": merchant bấm \"Open all boxes\" thì quà vào ngay, và quà vào trước khi hết window khi merchant/auto-unbox mở hết.",
  "side_b": "Tài liệu \"Hành trình reveal (mở box)\" §Các cách mở box: \"Open all boxes\" trong portal hoặc \"Unbox all boxes\" ở Shopify admin hành xử như khách (chờ resell window); tài liệu \"Quà được thêm vào đơn Shopify\" §Ví dụ: \"Unbox all boxes\" vẫn chờ window nên quà vào đơn ở lượt job sau khi window hết.",
  "conflict_group": "CONF-order-draw-02",
  "kb_ids": [
    "prizes-added-to-order#KB-015",
    "prizes-added-to-order#KB-016"
  ],
  "check_ids": [
    "prizes-added-to-order:CHK-010"
  ],
  "staging_observation": "Ghi chú quan sát staging cho OQ-order-draw-005 / CONF-order-draw-02: 2026-10-17: Merchant Unbox → quà vào đơn ngay, nhưng box no-buyback nên không phân biệt hai phía.",
  "staging_observation_kb_ids": [
    "prizes-added-to-order#KB-081",
    "reveal-journey#KB-118"
  ],
  "status_note": "Quan sát staging chỉ là OBSERVED_CURRENT; conflict vẫn mở, chưa resolve."
}
```

## OQ-order-draw-006 — CONFLICT

```json
{
  "oq_id": "OQ-order-draw-006",
  "type": "CONFLICT",
  "feature_id": "purchase-and-prize-draw",
  "summary": "Mâu thuẫn trong cùng một tài liệu (\"Domain entities\") về số món mỗi Bundle box nhận: \"1 món mỗi set\" hay \"1 kết quả cộng thêm một món cho mỗi set\". Có thể chỉ khác cách diễn đạt; cần đối chiếu tài liệu loại box (Bundle box) hoặc dev xác nhận: Bundle box có N set thì mỗi box ra N món, hay 1 kết quả chính cộng thêm 1 món cho mỗi set.",
  "side_a": "Tài liệu \"Domain entities\" §Các đối tượng: với Bundle box, mỗi box ra 1 món mỗi set.",
  "side_b": "Tài liệu \"Domain entities\" §Quan hệ giữa các đối tượng: mỗi box trong opening request có 1 kết quả; Bundle box có thêm một món cho mỗi set.",
  "conflict_group": "CONF-order-draw-04",
  "kb_ids": [
    "purchase-and-prize-draw#KB-020",
    "purchase-and-prize-draw#KB-021"
  ],
  "check_ids": [
    "purchase-and-prize-draw:CHK-020"
  ],
  "staging_observation": "Ghi chú quan sát staging cho OQ-order-draw-006 / CONF-order-draw-04: 1 box Bundle 2 set (#1008) → 1 winning_bundle chứa 2 winning_items, mỗi set 1 món, không có kết quả cộng thêm — khớp cách diễn đạt KB-020; không thấy món bổ sung như cách đọc KB-021. Một mẫu. | 2026-10-17: Bundle 3 set, đơn 2 box: winning_bundles có 2 phần tử, mỗi phần tử 3 winning_items (1 món/set, không có món thêm). Mở bằng nút Unbox của merchant thay vì trang khách.",
  "staging_observation_kb_ids": [
    "purchase-and-prize-draw#KB-063",
    "purchase-and-prize-draw#KB-020",
    "purchase-and-prize-draw#KB-021",
    "purchase-and-prize-draw#KB-070"
  ],
  "status_note": "Quan sát staging chỉ là OBSERVED_CURRENT; conflict vẫn mở, chưa resolve."
}
```

## OQ-order-draw-007 — CONFLICT

```json
{
  "oq_id": "OQ-order-draw-007",
  "type": "CONFLICT",
  "feature_id": "purchase-and-prize-draw",
  "summary": "Hai tài liệu nói khác nhau về việc đơn preview (tag `mysbox-preview-order`) có trừ tồn kho/pool quà không. Cần dev xác nhận hành vi trên production và trạng thái của thay đổi \"preview không tiêu thụ kho\" (đã lên production chưa).",
  "side_a": "Tài liệu \"Mua box và random quà\" §Đơn preview / test: đơn test có tag `mysbox-preview-order` chạy đủ luồng random nhưng không trừ tồn kho quà (không nêu giới hạn môi trường).",
  "side_b": "Tài liệu \"Playbook 1: đơn hàng, bốc thăm và mở box\" §Đơn test / preview cư xử lạ: đơn preview không tiêu thụ kho/pool chỉ có trên nhánh build-staging; trên production đơn preview có tiêu thụ kho.",
  "conflict_group": "CONF-order-draw-05",
  "kb_ids": [
    "purchase-and-prize-draw#KB-053",
    "purchase-and-prize-draw#KB-054",
    "purchase-and-prize-draw#KB-055"
  ],
  "check_ids": [
    "purchase-and-prize-draw:CHK-018",
    "purchase-and-prize-draw:CHK-019"
  ]
}
```

## OQ-order-draw-008 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-order-draw-008",
  "type": "OPEN_ISSUE",
  "feature_id": "physical-sealed-box-fulfilment",
  "summary": "Hạn chế đã biết: app chỉ trừ tồn kho ở location đầu tiên có fulfillment order, nên store nhiều kho có thể bị trừ kho sai chỗ. Chưa rõ có kế hoạch sửa hay cách cấu hình location ưu tiên.",
  "kb_ids": [
    "physical-sealed-box-fulfilment#KB-025"
  ],
  "check_ids": [
    "physical-sealed-box-fulfilment:CHK-025"
  ]
}
```

## OQ-order-draw-009 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-order-draw-009",
  "type": "OPEN_ISSUE",
  "feature_id": "physical-sealed-box-fulfilment",
  "summary": "Hạn chế đã biết: đơn box vật lý cũ tạo trước khi có bước prize ids thì thiếu metafield prize ids (khối \"Mysbox prizes\" không có dữ liệu) cho đến khi được backfill.",
  "kb_ids": [
    "physical-sealed-box-fulfilment#KB-053"
  ],
  "check_ids": [
    "physical-sealed-box-fulfilment:CHK-026"
  ]
}
```

## OQ-order-draw-010 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-order-draw-010",
  "type": "OPEN_ISSUE",
  "feature_id": "physical-sealed-box-fulfilment",
  "summary": "Khi mẫu tag sinh chuỗi dài hơn 40 ký tự thì app cắt bớt, bỏ tag hay báo lỗi? — Boundary đã nêu nhưng hành vi khi vượt chưa rõ.",
  "kb_ids": [
    "physical-sealed-box-fulfilment#KB-034",
    "physical-sealed-box-fulfilment#KB-035"
  ]
}
```

## OQ-order-draw-011 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-order-draw-011",
  "type": "OPEN_ISSUE",
  "feature_id": "physical-sealed-box-fulfilment",
  "summary": "Dạng map của `mysbox_prizes` dùng khoá/giá trị nào; khi đơn trúng trùng variant thì note và `mysbox_prizes` gộp theo variant hay mỗi box một phần tử? — Chỉ dạng danh sách có cột mặc định được nêu; ví dụ chỉ có quà khác SKU số lượng 1.",
  "kb_ids": [
    "physical-sealed-box-fulfilment#KB-044",
    "physical-sealed-box-fulfilment#KB-045"
  ],
  "staging_observation": "Ghi chú quan sát staging cho OQ-order-draw-011: 2026-10-17: Đơn 2 box sealed cùng prize: \"Mysbox prizes\" = [{ \"sku\": \"123\", \"quantity\": 2 }] và \"Mysbox prize ids\" = { \"<variant>\": 2 } — gộp thành 1 phần tử; đơn không có note, tag hay dòng quà.",
  "staging_observation_kb_ids": [
    "physical-sealed-box-fulfilment#KB-069",
    "physical-sealed-box-fulfilment#KB-070"
  ],
  "status_note": "Quan sát staging chỉ là OBSERVED_CURRENT; mục vẫn mở (câu hỏi chưa được trả lời đủ, hoặc cần nguồn thẩm quyền)."
}
```

## OQ-order-draw-012 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-order-draw-012",
  "type": "OPEN_ISSUE",
  "feature_id": "physical-sealed-box-fulfilment",
  "summary": "Khi merchant tắt Metafield quà của đơn, khối \"Mysbox prizes\" còn hiển thị từ `mysbox_prize_ids` không? — Hai metafield độc lập; tổ hợp bật/tắt không được mô tả.",
  "kb_ids": [
    "physical-sealed-box-fulfilment#KB-042",
    "physical-sealed-box-fulfilment#KB-052"
  ]
}
```

## OQ-order-draw-013 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-order-draw-013",
  "type": "OPEN_ISSUE",
  "feature_id": "physical-sealed-box-fulfilment",
  "summary": "Đơn có box physical bị huỷ/hoàn tiền thì tồn kho đã trừ có được cộng lại và tag/note/metafield có bị gỡ không? — Hậu xử lý có side effect lên tồn kho Shopify; tài liệu không nói về đảo ngược.",
  "kb_ids": [
    "physical-sealed-box-fulfilment#KB-021"
  ]
}
```

## OQ-order-draw-014 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-order-draw-014",
  "type": "OPEN_ISSUE",
  "feature_id": "physical-sealed-box-fulfilment",
  "summary": "Hành động hậu xử lý failed có được retry tự động không, có giới hạn số lần retry không; tập trạng thái huy hiệu hậu xử lý đầy đủ là gì? — Tài liệu chỉ nêu support retry thủ công và các trạng thái rải rác.",
  "kb_ids": [
    "physical-sealed-box-fulfilment#KB-054",
    "physical-sealed-box-fulfilment#KB-055"
  ]
}
```

## OQ-order-draw-015 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-order-draw-015",
  "type": "OPEN_ISSUE",
  "feature_id": "physical-sealed-box-fulfilment",
  "summary": "Box physical có tính usage/phí, có tham gia auto-unbox hay Shopify Flow trigger như box digital không; đơn trộn physical + digital được auto-unbox thế nào? — Bảng so sánh không có dòng billing/usage và Flow trigger cho box physical.",
  "kb_ids": [
    "physical-sealed-box-fulfilment#KB-014"
  ]
}
```

## OQ-order-draw-017 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-order-draw-017",
  "type": "OPEN_ISSUE",
  "feature_id": "prizes-added-to-order",
  "summary": "Hạn chế đã biết: nếu scheduler tắt quá 1 ngày, đơn chờ thêm quà sau cửa sổ resell bị job bỏ sót (job chỉ xét đơn có cửa sổ hết trong 24 giờ qua). Chưa rõ đơn có tự phục hồi không hay luôn cần xử lý tay.",
  "kb_ids": [
    "prizes-added-to-order#KB-060"
  ],
  "check_ids": [
    "prizes-added-to-order:CHK-023"
  ]
}
```

## OQ-order-draw-018 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-order-draw-018",
  "type": "OPEN_ISSUE",
  "feature_id": "prizes-added-to-order",
  "summary": "Hạn chế đã biết: một thông báo bulk của Shopify bị mất làm chiếm chỗ bulk job tới 24 giờ (mỗi shop tối đa 5 bulk job), khiến đơn nhiều loại quà bị kẹt.",
  "kb_ids": [
    "prizes-added-to-order#KB-049"
  ],
  "check_ids": [
    "prizes-added-to-order:CHK-022"
  ]
}
```

## OQ-order-draw-019 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-order-draw-019",
  "type": "OPEN_ISSUE",
  "feature_id": "prizes-added-to-order",
  "summary": "Retry thêm quà và retry xử lý đơn có idempotent khi bấm lặp không; retry đưa quà vào đơn khi cửa sổ resell còn mở thì khách còn bán lại được không, dòng quà có bị gỡ khi bán lại? — Retry có thể nhân quà là rủi ro P1; nút retry không tự kiểm cửa sổ resell.",
  "kb_ids": [
    "prizes-added-to-order#KB-056",
    "prizes-added-to-order#KB-057"
  ]
}
```

## OQ-order-draw-020 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-order-draw-020",
  "type": "OPEN_ISSUE",
  "feature_id": "prizes-added-to-order",
  "summary": "Role/quyền nào trong admin nội bộ được chạy retry thêm quà? — Cần cho kiểm thử phân quyền; tài liệu chỉ nói \"Support\".",
  "kb_ids": [
    "prizes-added-to-order#KB-055"
  ]
}
```

## OQ-order-draw-021 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-order-draw-021",
  "type": "OPEN_ISSUE",
  "feature_id": "prizes-added-to-order",
  "summary": "Bulk operation hai pha lỗi ở pha áp giảm giá thì xử lý thế nào; quy tắc \"không làm dở một nửa\" có áp không; job dài/bulk mất bao lâu và status dòng box khi bulk lỗi giữa chừng? — Rủi ro dòng quà giá gốc chưa giảm 100% nằm trên đơn; không có ngưỡng thời gian để kiểm retry đơn lớn.",
  "kb_ids": [
    "prizes-added-to-order#KB-045",
    "prizes-added-to-order#KB-054"
  ]
}
```

## OQ-order-draw-023 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-order-draw-023",
  "type": "OPEN_ISSUE",
  "feature_id": "prizes-added-to-order",
  "summary": "Mutation/endpoint Shopify cụ thể cho order edit, áp discount và bulk operation là gì? — Không lập được api_operations; không đối chiếu được lỗi Shopify cụ thể dẫn tới FAILED."
}
```

## OQ-order-draw-024 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-order-draw-024",
  "type": "OPEN_ISSUE",
  "feature_id": "prizes-added-to-order",
  "summary": "Đơn nhiều box: khi Flow/auto-unbox/merchant mở một box, quà của box đó hay của cả đơn được thêm ngay? — Quy tắc \"mọi box digital đã mở\" và \"thêm ngay, bỏ qua cửa sổ\" tương tác ở đơn mở một phần.",
  "kb_ids": [
    "prizes-added-to-order#KB-002",
    "prizes-added-to-order#KB-013"
  ]
}
```

## OQ-order-draw-025 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-order-draw-025",
  "type": "OPEN_ISSUE",
  "feature_id": "prizes-added-to-order",
  "summary": "Độ dài và mốc bắt đầu của cửa sổ resell; khoá do resell đang chạy kéo dài bao lâu và đơn được xét lại khi nào sau khi mở khoá? — Quyết định thời điểm quà vào đơn; điều kiện khoá không có tiêu chí kết thúc để test.",
  "kb_ids": [
    "prizes-added-to-order#KB-003"
  ],
  "staging_observation": "Ghi chú quan sát staging cho OQ-order-draw-025: 2026-10-17: \"Buyback limit time\": \"Duration for customers to resell from order is created\", 24 \"hours\", spinbutton disabled với \"Upgrade subscription plan to use this feature. It is not available on Free and Early-bird plan.\"",
  "staging_observation_kb_ids": [
    "prizes-added-to-order#KB-083"
  ],
  "status_note": "Quan sát staging chỉ là OBSERVED_CURRENT; mục vẫn mở (câu hỏi chưa được trả lời đủ, hoặc cần nguồn thẩm quyền)."
}
```

## OQ-order-draw-026 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-order-draw-026",
  "type": "OPEN_ISSUE",
  "feature_id": "prizes-added-to-order",
  "summary": "\"Đơn dài hơn giới hạn 7 ngày của auto-unbox\" nghĩa cụ thể là gì (tuổi đơn hay số giờ cấu hình)? — Không suy được điều kiện biên cho nguyên nhân trễ này."
}
```

## OQ-order-draw-027 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-order-draw-027",
  "type": "OPEN_ISSUE",
  "feature_id": "prizes-added-to-order",
  "summary": "Setting ẩn skip order line item sync và loại trừ đơn test nằm ở đâu, ai bật được, giá trị mặc định là gì? — Tài liệu nêu hệ quả khi bật nhưng không nêu mặc định.",
  "kb_ids": [
    "prizes-added-to-order#KB-061"
  ]
}
```

## OQ-order-draw-028 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-order-draw-028",
  "type": "OPEN_ISSUE",
  "feature_id": "purchase-and-prize-draw",
  "summary": "Lỗi đã biết: đơn của khách mua kiểu guest (không gắn customer) báo \"Customer is required\" khi xử lý và không tạo box, dù khách đã trả tiền. Cần xác nhận mức độ nghiêm trọng, hướng khắc phục, và cách xử lý lại đơn đã thất bại (tự động hay thủ công, trạng thái nội bộ của đơn).",
  "kb_ids": [
    "purchase-and-prize-draw#KB-040",
    "purchase-and-prize-draw#KB-041",
    "purchase-and-prize-draw#KB-042"
  ],
  "check_ids": [
    "purchase-and-prize-draw:CHK-027"
  ]
}
```

## OQ-order-draw-029 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-order-draw-029",
  "type": "OPEN_ISSUE",
  "feature_id": "purchase-and-prize-draw",
  "summary": "Đơn preview có tính vào capacity và phí usage không (cả trên staging và production)? Cài đặt loại đơn test khỏi tính phí nằm ở đâu, có tắt được không? — Ảnh hưởng đếm capacity, billing và dữ liệu thử nghiệm.",
  "kb_ids": [
    "purchase-and-prize-draw#KB-013",
    "purchase-and-prize-draw#KB-051",
    "purchase-and-prize-draw#KB-052"
  ],
  "staging_observation": "Ghi chú quan sát staging cho OQ-order-draw-029: 2026-10-17: Sau 3 đơn test Bogus (không dùng Preview) \"Box sales limit\" vẫn \"0 / 10\", box_sold_in_cycle 0, box_capacity_used 0, exclude_test_order true; General Settings không có toggle \"Exclude test order\".",
  "staging_observation_kb_ids": [
    "purchase-and-prize-draw#KB-071"
  ],
  "status_note": "Quan sát staging chỉ là OBSERVED_CURRENT; mục vẫn mở (câu hỏi chưa được trả lời đủ, hoặc cần nguồn thẩm quyền)."
}
```

## OQ-order-draw-030 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-order-draw-030",
  "type": "OPEN_ISSUE",
  "feature_id": "purchase-and-prize-draw",
  "summary": "Khi merchant sửa đơn giảm số box, opening request, bundle và quà đã bốc của phần bị giảm được giữ, huỷ hay hoàn kho? — Tài liệu chỉ nói \"không làm gì\"; thiếu expected cho tồn kho và quà đã chốt.",
  "kb_ids": [
    "purchase-and-prize-draw#KB-050"
  ]
}
```

## OQ-order-draw-031 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-order-draw-031",
  "type": "OPEN_ISSUE",
  "feature_id": "purchase-and-prize-draw",
  "summary": "Bán box đã hết hàng (sinh box rỗng) là thiết kế chủ đích hay hạn chế; khách có được hoàn tiền hay xử lý gì cho box rỗng? — Tài liệu mô tả trung tính; cần biết có coi là known defect hay hành vi đúng.",
  "kb_ids": [
    "purchase-and-prize-draw#KB-046",
    "purchase-and-prize-draw#KB-047"
  ]
}
```

## OQ-order-draw-032 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-order-draw-032",
  "type": "OPEN_ISSUE",
  "feature_id": "purchase-and-prize-draw",
  "summary": "Box Tier \"dừng khi hết\" cấu hình thế nào và khác gì box Tier không dừng? — Cần để dựng tình huống đơn nhận ít quà hơn số box.",
  "kb_ids": [
    "purchase-and-prize-draw#KB-044"
  ],
  "staging_observation": "Ghi chú quan sát staging cho OQ-order-draw-032: 2026-10-17: Form \"Random by group(s)\" chỉ có \"Group name\", \"Chance %\", Browse item, xoá nhóm, \"Add tier\", bộ đếm \"n/100\"; không có tuỳ chọn hay helper nào về \"dừng khi hết\".",
  "staging_observation_kb_ids": [
    "box-type-and-prize-setup#KB-067"
  ],
  "status_note": "Quan sát staging chỉ là OBSERVED_CURRENT; mục vẫn mở (câu hỏi chưa được trả lời đủ, hoặc cần nguồn thẩm quyền)."
}
```

## OQ-order-draw-033 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-order-draw-033",
  "type": "OPEN_ISSUE",
  "feature_id": "purchase-and-prize-draw",
  "summary": "Tồn kho box giảm tại thời điểm nào (lúc paid, lúc bốc hay lúc mở) và giảm bao nhiêu mỗi đơn? — Kiểm tồn kho sau mua cần mốc thời gian và lượng giảm.",
  "staging_observation": "Ghi chú quan sát staging cho OQ-order-draw-033: 2026-10-17: Variant box: Available giảm, Committed tăng theo đơn paid (B1 3/2/5, B2 2/1/3, B3 3/1/4); prize tracked của box sealed bị trừ ngay lúc bốc; prize digital untracked nên không đo được giảm kho Shopify; không có mốc riêng giữa paid và mở.",
  "staging_observation_kb_ids": [
    "purchase-and-prize-draw#KB-072",
    "physical-sealed-box-fulfilment#KB-071",
    "inventory-and-sold-out#KB-090"
  ],
  "status_note": "Quan sát staging chỉ là OBSERVED_CURRENT; mục vẫn mở (câu hỏi chưa được trả lời đủ, hoặc cần nguồn thẩm quyền)."
}
```

## OQ-order-draw-034 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-order-draw-034",
  "type": "OPEN_ISSUE",
  "feature_id": "purchase-and-prize-draw",
  "summary": "Topic, route, method và payload chính xác của webhook đơn paid là gì? — Tài liệu chỉ gọi tên mô tả; không lập được api_operation hay check contract.",
  "kb_ids": [
    "purchase-and-prize-draw#KB-009"
  ]
}
```

## OQ-order-draw-035 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-order-draw-035",
  "type": "OPEN_ISSUE",
  "feature_id": "purchase-and-prize-draw",
  "summary": "Thời gian chờ khoá đơn khi xử lý đơn paid là bao nhiêu theo quy định? — Con số chỉ xuất hiện dạng ví dụ trong tài liệu; không dùng được làm boundary."
}
```

## OQ-order-draw-036 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-order-draw-036",
  "type": "OPEN_ISSUE",
  "feature_id": "purchase-and-prize-draw",
  "summary": "Merchant nào (chủ shop hay nhân viên) được xem mục Orders trong portal; các trạng thái mở / resell / đồng bộ quà của Order có enum cụ thể nào? — Role không nêu ở mức run và tài liệu không phân quyền xem Orders; tester cần enum để kiểm chuyển trạng thái.",
  "kb_ids": [
    "_object-level#KB-002",
    "_object-level#KB-021"
  ],
  "staging_observation": "Ghi chú quan sát staging cho OQ-order-draw-036: 2026-10-17: Danh sách GET /api/orders?…&status=all|unopened|opened và chi tiết GET /api/orders/{id} có các field liệt kê; không có field trạng thái/resell/sync riêng; tab \"Unopened\" gồm đơn mở một phần. Phần role xem Orders vẫn cần PO.",
  "staging_observation_kb_ids": [
    "_object-level.order-draw#KB-030",
    "_object-level.order-draw#KB-031",
    "_object-level.order-draw#KB-032"
  ],
  "status_note": "Quan sát staging chỉ là OBSERVED_CURRENT; mục vẫn mở (câu hỏi chưa được trả lời đủ, hoặc cần nguồn thẩm quyền)."
}
```

## OQ-order-draw-037 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-order-draw-037",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": null,
  "summary": "Bootstrap chạy với role null: các KB item mức object order-draw mang scope.role theo role tài liệu nêu, hoặc \"unspecified\" khi tài liệu không nêu. Cần xác nhận role thực hiện/quan sát cho các item \"unspecified\" (vd ai thấy mục Orders, ai đọc cột dữ liệu đơn)."
}
```

## OQ-order-draw-038 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-order-draw-038",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": null,
  "summary": "Tài liệu Overview và Mua box và random quà đều viết QUEUED \"có thể\" kéo dài suốt thời gian mở box và cửa sổ resell. Cần xác nhận đây là hành vi chắc chắn (đơn mở hết vẫn QUEUED đến khi cửa sổ resell hết) hay chỉ trong một số trường hợp.",
  "kb_ids": [
    "_object-level#KB-011"
  ],
  "staging_observation": "Ghi chú quan sát staging cho OQ-order-draw-038: 2026-10-17: Tiến độ chỉ thấy qua total_opened (#1010 1/3 → 3/3; #1009 0 → 3); không có field QUEUED/COMPLETED ở API merchant hay app proxy; unboxing_at, resell_expires_at null. Nhánh resell không quan sát (Free).",
  "staging_observation_kb_ids": [
    "_object-level.order-draw#KB-032",
    "reveal-journey#KB-117"
  ],
  "status_note": "Quan sát staging chỉ là OBSERVED_CURRENT; vẫn cần PO/Dev xác nhận, chưa resolve."
}
```

## OQ-order-draw-039 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-order-draw-039",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "physical-sealed-box-fulfilment",
  "summary": "Các phát biểu có rào đón về box physical (box physical là nguyên nhân không có nút Unbox, mẫu tag/note \"hiện\" chỉ đổi bằng cấu hình, retry \"có thể\" ghi đè note đã sửa tay) cần xác nhận trước khi dùng làm oracle.",
  "kb_ids": [
    "physical-sealed-box-fulfilment#KB-008",
    "physical-sealed-box-fulfilment#KB-041",
    "physical-sealed-box-fulfilment#KB-056"
  ],
  "staging_observation": "Ghi chú quan sát staging cho OQ-order-draw-039: 2026-10-17: Box sealed không có nút Unbox ở đâu: trang cảm ơn đơn hỗn hợp chỉ có Unbox cho box digital, đơn toàn sealed không render khối Mysbox; trang khách #1011 \"0 / 0 unboxed\".",
  "staging_observation_kb_ids": [
    "physical-sealed-box-fulfilment#KB-073",
    "physical-sealed-box-fulfilment#KB-074"
  ],
  "status_note": "Quan sát staging chỉ là OBSERVED_CURRENT; vẫn cần PO/Dev xác nhận, chưa resolve."
}
```

## OQ-order-draw-040 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-order-draw-040",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "physical-sealed-box-fulfilment",
  "summary": "Các check P1 (tiền / billing / bốc thăm / refund / store credit / permission / xoá dữ liệu) của feature này có oracle STRONG nhưng chỉ dựa trên tài liệu dev (dev_doc). Theo luật oracle, chúng giữ NEEDS_CONFIRMATION cho tới khi có test_case PASS (hoặc PO/Dev xác nhận trực tiếp) cho đúng hành vi. Danh sách check ở check_ids.",
  "check_ids": [
    "physical-sealed-box-fulfilment:CHK-001",
    "physical-sealed-box-fulfilment:CHK-011"
  ],
  "staging_observation": "Ghi chú quan sát staging cho OQ-order-draw-040: 2026-10-17: Đơn box sealed: GET /api/orders/{id} có winning_bundles ngay sau paid, total_opened = total_items, Manage orders \"2/2 boxes opened\" và \"Unbox\" disabled. Retry (CHK-011) không quan sát.",
  "staging_observation_kb_ids": [
    "physical-sealed-box-fulfilment#KB-072"
  ],
  "status_note": "Quan sát staging chỉ là OBSERVED_CURRENT; vẫn cần PO/Dev xác nhận, chưa resolve."
}
```

## OQ-order-draw-041 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-order-draw-041",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "physical-sealed-box-fulfilment",
  "summary": "Khi tag hoặc note của đơn box vật lý đã được sửa tay trong Shopify, retry hậu xử lý có ghi đè note (hoặc tag) đã sửa không?",
  "check_ids": [
    "physical-sealed-box-fulfilment:CHK-012"
  ]
}
```

## OQ-order-draw-042 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-order-draw-042",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "physical-sealed-box-fulfilment",
  "summary": "Khi mẫu tag/note chứa placeholder không được hỗ trợ như {{title}}, kết quả thực tế là gì: giữ nguyên chuỗi {{title}}, thay bằng rỗng, hay hành động tag/note báo lỗi?",
  "kb_ids": [
    "physical-sealed-box-fulfilment#KB-039",
    "physical-sealed-box-fulfilment#KB-040"
  ],
  "check_ids": [
    "physical-sealed-box-fulfilment:CHK-018"
  ]
}
```

## OQ-order-draw-043 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-order-draw-043",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "prizes-added-to-order",
  "summary": "Múi giờ thực tế của job thêm quà 00:00/08:00/16:00 ở production: một tài liệu ghi \"UTC mặc định\", tài liệu khác ghi \"giờ máy chủ\". Cần xác nhận múi giờ và nơi cấu hình trước khi dùng mốc giờ làm expected result.",
  "kb_ids": [
    "prizes-added-to-order#KB-007"
  ]
}
```

## OQ-order-draw-044 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-order-draw-044",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "prizes-added-to-order",
  "summary": "Cấu hình tắt email thông báo sửa đơn có chỗ nào trong portal để merchant sửa không, hay chỉ nhân viên Mysbox đổi trong back-office; tác giả tài liệu ghi là chưa thấy và chưa kiểm chứng.",
  "kb_ids": [
    "prizes-added-to-order#KB-031"
  ],
  "staging_observation": "Ghi chú quan sát staging cho OQ-order-draw-044: 2026-10-17: Không có toggle tắt email sửa đơn ở mọi pane General Settings và form box.",
  "staging_observation_kb_ids": [
    "prizes-added-to-order#KB-082"
  ],
  "status_note": "Quan sát staging chỉ là OBSERVED_CURRENT; vẫn cần PO/Dev xác nhận, chưa resolve."
}
```

## OQ-order-draw-045 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-order-draw-045",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "prizes-added-to-order",
  "summary": "Shopify có tính lại phí ship hoặc thuế khi app thêm dòng quà giá 0 vào đơn không; tài liệu ghi là chưa xác nhận.",
  "kb_ids": [
    "prizes-added-to-order#KB-040"
  ],
  "staging_observation": "Ghi chú quan sát staging cho OQ-order-draw-045: 2026-10-17: Subtotal/thuế/total trước và sau khi quà vào đơn không đổi (#1010 ₫420,000 / ₫0 / ₫42,000 / ₫462,000; #1009 ₫300,000 / ₫0 / ₫30,000 / ₫330,000); ship Free ở mọi đơn nên chưa kiểm tác động lên phí ship.",
  "staging_observation_kb_ids": [
    "prizes-added-to-order#KB-080",
    "purchase-and-prize-draw#KB-073"
  ],
  "status_note": "Quan sát staging chỉ là OBSERVED_CURRENT; vẫn cần PO/Dev xác nhận, chưa resolve."
}
```

## OQ-order-draw-046 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-order-draw-046",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "prizes-added-to-order",
  "summary": "Hành vi thêm quà trên đơn đã huỷ, đã đóng hoặc đã hoàn tiền hết: tài liệu \"Quà được thêm vào đơn Shopify\" ghi \"chưa xác nhận (dự kiến thất bại)\", trong khi support playbook khẳng định Shopify từ chối sửa đơn và đơn chuyển Failed. Cần dev xác nhận.",
  "kb_ids": [
    "prizes-added-to-order#KB-053"
  ]
}
```

## OQ-order-draw-047 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-order-draw-047",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "prizes-added-to-order",
  "summary": "Các phát biểu có rào đón về bước thêm quà vào đơn (độ trễ \"có thể\" tới 8 giờ, merchant nhận quà để đóng gói, đơn đã fulfill \"có thể\" cần fulfill lần hai, lô \"khoảng chục món\" của job dài, cờ ẩn admin \"có thể\" bỏ qua bước sửa đơn cho vài merchant) cần xác nhận trước khi dùng làm oracle.",
  "kb_ids": [
    "prizes-added-to-order#KB-010",
    "prizes-added-to-order#KB-022",
    "prizes-added-to-order#KB-039",
    "prizes-added-to-order#KB-044",
    "prizes-added-to-order#KB-062"
  ]
}
```

## OQ-order-draw-048 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-order-draw-048",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "prizes-added-to-order",
  "summary": "Các check P1 (tiền / billing / bốc thăm / refund / store credit / permission / xoá dữ liệu) của feature này có oracle STRONG nhưng chỉ dựa trên tài liệu dev (dev_doc). Theo luật oracle, chúng giữ NEEDS_CONFIRMATION cho tới khi có test_case PASS (hoặc PO/Dev xác nhận trực tiếp) cho đúng hành vi. Danh sách check ở check_ids.",
  "check_ids": [
    "prizes-added-to-order:CHK-001",
    "prizes-added-to-order:CHK-002",
    "prizes-added-to-order:CHK-003",
    "prizes-added-to-order:CHK-004",
    "prizes-added-to-order:CHK-005",
    "prizes-added-to-order:CHK-007",
    "prizes-added-to-order:CHK-008",
    "prizes-added-to-order:CHK-009",
    "prizes-added-to-order:CHK-011",
    "prizes-added-to-order:CHK-012",
    "prizes-added-to-order:CHK-013",
    "prizes-added-to-order:CHK-014",
    "prizes-added-to-order:CHK-015",
    "prizes-added-to-order:CHK-016",
    "prizes-added-to-order:CHK-017",
    "prizes-added-to-order:CHK-018"
  ],
  "staging_observation": "Ghi chú quan sát staging cho OQ-order-draw-048: 2026-10-17: Dòng quà \"Sale price ₫0\" / \"Original price\", \"MYSBOX: -100%\", Unfulfilled; tổng đơn không đổi; #1009 (Unbox lẻ + Multi-unbox) có đúng 1 sự kiện sửa đơn sau box cuối; box sealed không thành dòng quà. Nhánh buyback/job/Flow không quan sát.",
  "staging_observation_kb_ids": [
    "prizes-added-to-order#KB-079",
    "prizes-added-to-order#KB-081"
  ],
  "status_note": "Quan sát staging chỉ là OBSERVED_CURRENT; vẫn cần PO/Dev xác nhận, chưa resolve."
}
```

## OQ-order-draw-049 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-order-draw-049",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "prizes-added-to-order",
  "summary": "Khi app thêm dòng quà giá 0 vào đơn, Shopify có tính lại phí ship hoặc thuế của đơn không?",
  "check_ids": [
    "prizes-added-to-order:CHK-028"
  ],
  "staging_observation": "Ghi chú quan sát staging cho OQ-order-draw-049: 2026-10-17: Thuế và tổng không đổi sau khi thêm dòng quà ₫0; shipping ₫0 nên không so được phí ship.",
  "staging_observation_kb_ids": [
    "prizes-added-to-order#KB-080"
  ],
  "status_note": "Quan sát staging chỉ là OBSERVED_CURRENT; vẫn cần PO/Dev xác nhận, chưa resolve."
}
```

## OQ-order-draw-050 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-order-draw-050",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "purchase-and-prize-draw",
  "summary": "Hành vi \"đơn preview không tiêu thụ kho/pool quà\" chỉ có trên nhánh build-staging, chưa lên production. Cần xác nhận khi nào thay đổi này lên production, và cho tới lúc đó hành vi production của đơn preview (tiêu thụ kho, tính capacity, tính phí usage) là gì.",
  "kb_ids": [
    "purchase-and-prize-draw#KB-055"
  ]
}
```

## OQ-order-draw-051 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-order-draw-051",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "purchase-and-prize-draw",
  "summary": "Tài liệu liệt kê các nguyên nhân có thể khiến khách đã trả tiền mà không thấy nút Unbox (draw chưa chạy, đơn chưa paid, box physical, variant chưa Publish lúc mua, đơn guest không có customer) bằng cách diễn đạt rào đón. Cần xác nhận đây là danh sách đầy đủ và từng nguyên nhân có đúng dẫn tới không có nút Unbox.",
  "kb_ids": [
    "purchase-and-prize-draw#KB-039",
    "purchase-and-prize-draw#KB-041"
  ],
  "staging_observation": "Ghi chú quan sát staging cho OQ-order-draw-051: 2026-10-17: Nguyên nhân \"box physical\" tái hiện: không có nút Unbox ở trang cảm ơn/trang khách; đơn toàn sealed vẫn có trong Manage orders (\"2/2 boxes opened\") và trong \"Your orders\" (0/0). Trường hợp mua box đã Deactivate không thử.",
  "staging_observation_kb_ids": [
    "physical-sealed-box-fulfilment#KB-073",
    "physical-sealed-box-fulfilment#KB-074",
    "physical-sealed-box-fulfilment#KB-072"
  ],
  "status_note": "Quan sát staging chỉ là OBSERVED_CURRENT; vẫn cần PO/Dev xác nhận, chưa resolve."
}
```

## OQ-order-draw-052 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-order-draw-052",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "purchase-and-prize-draw",
  "summary": "Thời gian bốc thăm sau khi đơn paid chỉ được nêu là \"vài giây\", qua hàng đợi nền. Cần xác nhận ngưỡng chính thức, và hành vi khi bước random chậm quá ngưỡng hoặc lỗi giữa chừng (retry, trạng thái đơn, thông báo \"quay lại sau 30 phút\" cho khách).",
  "kb_ids": [
    "purchase-and-prize-draw#KB-006",
    "purchase-and-prize-draw#KB-007"
  ],
  "staging_observation": "Ghi chú quan sát staging cho OQ-order-draw-052: 2026-10-17: \"Please wait while we fetch your box data\" → \"Unbox your mystery box now!\" trong ≤ ~9.4s (#1009) và ≤ ~7s (#1010), kéo theo /customer 404 rồi 200; chưa bao giờ quá 30s nên không thấy text khi quá hạn.",
  "staging_observation_kb_ids": [
    "reveal-journey#KB-107",
    "reveal-journey#KB-108"
  ],
  "status_note": "Quan sát staging chỉ là OBSERVED_CURRENT; vẫn cần PO/Dev xác nhận, chưa resolve."
}
```

## OQ-order-draw-053 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-order-draw-053",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "purchase-and-prize-draw",
  "summary": "Ngoại lệ \"đơn thanh toán ngay trước khi merchant deactivate box mà job bốc thăm chưa chạy thì bị bỏ qua\" chỉ được nêu qua ví dụ minh hoạ. Cần xác nhận đây là hành vi thực tế, và đơn bị bỏ qua có được xử lý lại (vd Retry Handle Order sau khi publish lại) hay không.",
  "kb_ids": [
    "purchase-and-prize-draw#KB-028"
  ]
}
```

## OQ-order-draw-054 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-order-draw-054",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "purchase-and-prize-draw",
  "summary": "Các check P1 (tiền / billing / bốc thăm / refund / store credit / permission / xoá dữ liệu) của feature này có oracle STRONG nhưng chỉ dựa trên tài liệu dev (dev_doc). Theo luật oracle, chúng giữ NEEDS_CONFIRMATION cho tới khi có test_case PASS (hoặc PO/Dev xác nhận trực tiếp) cho đúng hành vi. Danh sách check ở check_ids.",
  "check_ids": [
    "purchase-and-prize-draw:CHK-001",
    "purchase-and-prize-draw:CHK-002",
    "purchase-and-prize-draw:CHK-003",
    "purchase-and-prize-draw:CHK-004",
    "purchase-and-prize-draw:CHK-005",
    "purchase-and-prize-draw:CHK-006",
    "purchase-and-prize-draw:CHK-007",
    "purchase-and-prize-draw:CHK-009",
    "purchase-and-prize-draw:CHK-010",
    "purchase-and-prize-draw:CHK-011",
    "purchase-and-prize-draw:CHK-012",
    "purchase-and-prize-draw:CHK-013",
    "purchase-and-prize-draw:CHK-014",
    "purchase-and-prize-draw:CHK-015",
    "purchase-and-prize-draw:CHK-016",
    "purchase-and-prize-draw:CHK-017",
    "purchase-and-prize-draw:CHK-026"
  ],
  "staging_observation": "Ghi chú quan sát staging cho OQ-order-draw-054: 2026-10-17: Trước khi mở, box digital có winning_bundles [] ở cả API merchant và app proxy (box sealed có ngay), nên không chứng minh được kết quả có từ lúc paid; tồn kho quà giảm theo item trúng. Sửa box rồi đối chiếu đơn cũ không làm.",
  "staging_observation_kb_ids": [
    "purchase-and-prize-draw#KB-069",
    "inventory-and-sold-out#KB-090"
  ],
  "status_note": "Quan sát staging chỉ là OBSERVED_CURRENT; vẫn cần PO/Dev xác nhận, chưa resolve."
}
```

## OQ-order-draw-055 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-order-draw-055",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "purchase-and-prize-draw",
  "summary": "Đơn đã thanh toán khi box còn Active nhưng merchant deactivate box trước khi bước bốc thăm chạy thì bị bỏ qua hay vẫn được bốc theo phiên bản lúc mua? Nếu bị bỏ qua, đơn đó được xử lý lại bằng cách nào?",
  "check_ids": [
    "purchase-and-prize-draw:CHK-008"
  ]
}
```

## OQ-order-draw-056 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-order-draw-056",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": null,
  "summary": "Item mới quan sát trên staging (OBSERVED_CURRENT) chạm tiền/permission/token, được gắn cờ rủi ro khi diff: cần owner (PO) xác nhận hành vi quan sát là ý định sản phẩm trước khi dùng làm kỳ vọng. Item vẫn publish dạng OBSERVED_CURRENT; không phải xác nhận hành vi production.",
  "owner_role": "PO",
  "kb_ids": [
    "prizes-added-to-order#KB-076",
    "purchase-and-prize-draw#KB-066"
  ]
}
```

## OQ-order-draw-057 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-order-draw-057",
  "type": "OPEN_ISSUE",
  "feature_id": "physical-sealed-box-fulfilment",
  "summary": "Giá trị \"Metafield format\" lưu ở đâu khi GET /api/users/config trả {\"data\":null}; \"Variant SKU\" là mặc định hay giá trị đã chọn của shop? — Không tách được mặc định với giá trị hiện tại (KB-065 vs KB-047); không viết được check API cho setting.",
  "kb_ids": [
    "physical-sealed-box-fulfilment#KB-065",
    "physical-sealed-box-fulfilment#KB-047"
  ],
  "staging_observation": "Ghi chú quan sát staging cho OQ-order-draw-057: 2026-10-17: Pane Order setting đọc qua GET /api/users/config 200 {\"data\": null}, hiển thị \"Variant SKU\"; đổi Metafield format + Save không làm (không thử thao tác ghi settings sau khi bị chặn).",
  "staging_observation_kb_ids": [
    "auto-unbox#KB-068",
    "physical-sealed-box-fulfilment#KB-068"
  ],
  "status_note": "Quan sát staging chỉ là OBSERVED_CURRENT; mục vẫn mở (câu hỏi chưa được trả lời đủ, hoặc cần nguồn thẩm quyền)."
}
```

## OQ-order-draw-058 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-order-draw-058",
  "type": "OPEN_ISSUE",
  "feature_id": "purchase-and-prize-draw",
  "summary": "Bảng Manage orders chờ getOrderStatus tới ~20–25s mới render là thiết kế hay lỗi hiệu năng; có ngưỡng chấp nhận không? — Không có expected cho thời gian hiển thị danh sách đơn (KB-025); ảnh hưởng check UI và timeout automation.",
  "kb_ids": [
    "_object-level.order-draw#KB-025"
  ],
  "check_ids": [
    "purchase-and-prize-draw:CHK-032"
  ]
}
```

## OQ-order-draw-059 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-order-draw-059",
  "type": "OPEN_ISSUE",
  "feature_id": "purchase-and-prize-draw",
  "summary": "Cột Date của Manage orders hiển thị theo giờ máy người xem (+7h so với UTC) hay theo timezone của shop? — Quan sát thấy lệch +7h so với created_at UTC (KB-024); cần expected để viết check ngày giờ.",
  "kb_ids": [
    "_object-level.order-draw#KB-024"
  ],
  "staging_observation": "Ghi chú quan sát staging cho OQ-order-draw-059: 2026-10-17: Shop iana_timezone \"America/New_York\"; cột Date = created_at UTC + 7h (giờ máy +0700), vd 16:35:36Z → \"10/16/2026 23:35:36\". Chưa emulate timezone khác.",
  "staging_observation_kb_ids": [
    "_object-level.order-draw#KB-033"
  ],
  "status_note": "Quan sát staging chỉ là OBSERVED_CURRENT; mục vẫn mở (câu hỏi chưa được trả lời đủ, hoặc cần nguồn thẩm quyền)."
}
```

## OQ-order-draw-060 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-order-draw-060",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "physical-sealed-box-fulfilment",
  "summary": "Check physical-sealed-box-fulfilment:CHK-027 \"General Settings › Sealed box › Order setting: pane Order prize information chỉ có Metafield format\" có oracle BASELINE (chỉ dựa trên quan sát staging OBSERVED_CURRENT — lệch là cần điều tra, chưa phải bug). Cần PO/Dev xác nhận hành vi mong đợi.",
  "kb_ids": [
    "physical-sealed-box-fulfilment#KB-065"
  ],
  "check_ids": [
    "physical-sealed-box-fulfilment:CHK-027"
  ]
}
```

## OQ-order-draw-061 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-order-draw-061",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "prizes-added-to-order",
  "summary": "Check prizes-added-to-order:CHK-029 \"Trang đơn của khách hiện dòng quà với giảm giá MYSBOX và TOTAL SAVINGS sau khi quà vào đơn\" có oracle BASELINE (chỉ dựa trên quan sát staging OBSERVED_CURRENT — lệch là cần điều tra, chưa phải bug). Cần PO/Dev xác nhận hành vi mong đợi.",
  "kb_ids": [
    "prizes-added-to-order#KB-076"
  ],
  "check_ids": [
    "prizes-added-to-order:CHK-029"
  ]
}
```

## OQ-order-draw-062 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-order-draw-062",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "purchase-and-prize-draw",
  "summary": "Staging thấy đơn test Bogus không tính vào Box sales limit (exclude_test_order true) nhưng vẫn bốc thật và trừ tồn kho quà. Đây có phải hành vi mong đợi trên mọi gói không, cờ exclude_test_order được bật ở đâu, và đơn test có ghi usage/phí không?",
  "kb_ids": [
    "purchase-and-prize-draw#KB-066",
    "purchase-and-prize-draw#KB-065"
  ],
  "check_ids": [
    "purchase-and-prize-draw:CHK-028"
  ],
  "staging_observation": "Ghi chú quan sát staging cho OQ-order-draw-062: 2026-10-17: 3 đơn test Bogus mới: không tính vào Box sales limit (0/10) nhưng vẫn bốc thật, trừ inventory.bundles và trừ tồn kho Shopify của prize tracked (box sealed).",
  "staging_observation_kb_ids": [
    "purchase-and-prize-draw#KB-071",
    "inventory-and-sold-out#KB-090",
    "physical-sealed-box-fulfilment#KB-071"
  ],
  "status_note": "Quan sát staging chỉ là OBSERVED_CURRENT; vẫn cần PO/Dev xác nhận, chưa resolve."
}
```

## OQ-order-draw-063 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-order-draw-063",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "purchase-and-prize-draw",
  "summary": "Check purchase-and-prize-draw:CHK-029 \"Manage orders: tab All / Unopened / Opened gọi GET /api/orders với status tương ứng\" có oracle BASELINE (chỉ dựa trên quan sát staging OBSERVED_CURRENT — lệch là cần điều tra, chưa phải bug). Cần PO/Dev xác nhận hành vi mong đợi.",
  "kb_ids": [
    "_object-level.order-draw#KB-028",
    "_object-level.order-draw#KB-024"
  ],
  "check_ids": [
    "purchase-and-prize-draw:CHK-029"
  ]
}
```

## OQ-order-draw-064 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-order-draw-064",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "purchase-and-prize-draw",
  "summary": "Search ở Manage orders chỉ tìm theo tên đơn hay cả email/tên khách? Escape xoá luôn ô search khi đóng popover sort có phải hành vi chủ ý không?",
  "kb_ids": [
    "_object-level.order-draw#KB-026"
  ],
  "check_ids": [
    "purchase-and-prize-draw:CHK-030"
  ],
  "staging_observation": "Ghi chú quan sát staging cho OQ-order-draw-064: 2026-10-17: Tìm \"QA Test\" và email buyer → \"No Orders found\" (GET /api/orders?q=… 200); tìm \"1007\" → #1007.",
  "staging_observation_kb_ids": [
    "_object-level.order-draw#KB-034"
  ],
  "status_note": "Quan sát staging chỉ là OBSERVED_CURRENT; vẫn cần PO/Dev xác nhận, chưa resolve."
}
```

## OQ-order-draw-065 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-order-draw-065",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "purchase-and-prize-draw",
  "summary": "Check purchase-and-prize-draw:CHK-031 \"Chi tiết đơn: GET /api/orders/{shopify_order_id} trả boxes[] với opening request, box_version_id và winning_bundles\" có oracle BASELINE (chỉ dựa trên quan sát staging OBSERVED_CURRENT — lệch là cần điều tra, chưa phải bug). Cần PO/Dev xác nhận hành vi mong đợi.",
  "kb_ids": [
    "_object-level.order-draw#KB-029"
  ],
  "check_ids": [
    "purchase-and-prize-draw:CHK-031"
  ]
}
```

## OQ-order-draw-066 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-order-draw-066",
  "type": "OPEN_ISSUE",
  "feature_id": "physical-sealed-box-fulfilment",
  "summary": "Đơn chỉ có box sealed vẫn hiện trong \"Your orders\" của khách dạng \"0 / 0 unboxed\" và trang \"View details\" chỉ render \"Unbox your mystery boxes 0 / 0 unboxed\" (không header đơn), gọi box-versions/by-ids?ids= rỗng nhận 422 và log lỗi console. Đây là hành vi chủ ý (hiện đơn rỗng) hay lỗi hiển thị? Run không có thẩm quyền phán là lỗi; item không đặt status.",
  "kb_ids": [
    "physical-sealed-box-fulfilment#KB-074",
    "physical-sealed-box-fulfilment#KB-073",
    "physical-sealed-box-fulfilment#KB-005"
  ],
  "related_oq_ids": [
    "OQ-reveal-045"
  ],
  "tags": [
    "staging-observed"
  ]
}
```

## OQ-order-draw-067 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-order-draw-067",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "physical-sealed-box-fulfilment",
  "summary": "Đơn chỉ có box sealed vẫn hiện ở \"Your orders\" của khách với \"0 / 0 unboxed\" và trang chi tiết gần như rỗng kèm lỗi 422 (box-versions/by-ids với ids rỗng). Đơn chỉ có box sealed có nên xuất hiện ở trang khách không, và nếu có thì phải hiển thị gì?",
  "kb_ids": [
    "physical-sealed-box-fulfilment#KB-074"
  ],
  "check_ids": [
    "physical-sealed-box-fulfilment:CHK-028"
  ],
  "tags": [
    "staging-observed"
  ]
}
```

## OQ-order-draw-068 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-order-draw-068",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "physical-sealed-box-fulfilment",
  "summary": "Staging: box Sealed vẫn lưu settings.animation (\"carousel\") dù form ẩn Animation Settings, và Buy back function bị ẩn. Giá trị animation lưu kèm box sealed có được dùng ở đâu không, và box sealed có bao giờ được bật buyback không?",
  "kb_ids": [
    "physical-sealed-box-fulfilment#KB-067",
    "physical-sealed-box-fulfilment#KB-066"
  ],
  "check_ids": [
    "physical-sealed-box-fulfilment:CHK-029"
  ],
  "tags": [
    "staging-observed"
  ]
}
```

## OQ-order-draw-069 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-order-draw-069",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "physical-sealed-box-fulfilment",
  "summary": "Staging: box sealed được tính vào \"boxes opened\" ngay sau paid ở phía merchant (khớp tài liệu tự đánh dấu đã mở). Có cần phân biệt box sealed với box digital đã mở trong cột Mystery box status không?",
  "kb_ids": [
    "physical-sealed-box-fulfilment#KB-072"
  ],
  "check_ids": [
    "physical-sealed-box-fulfilment:CHK-030"
  ],
  "tags": [
    "staging-observed"
  ]
}
```

## OQ-order-draw-070 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-order-draw-070",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "physical-sealed-box-fulfilment",
  "summary": "Staging: metafield quà của đơn box sealed gộp các box trúng cùng variant thành một phần tử với quantity cộng dồn. Đây có phải định dạng mong đợi cho kho (thay vì một phần tử mỗi box) không?",
  "kb_ids": [
    "physical-sealed-box-fulfilment#KB-069"
  ],
  "check_ids": [
    "physical-sealed-box-fulfilment:CHK-031"
  ],
  "tags": [
    "staging-observed"
  ]
}
```

## OQ-order-draw-071 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-order-draw-071",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "prizes-added-to-order",
  "summary": "Staging: cửa sổ resell (\"Buyback limit time\") mặc định 24 giờ và được mô tả là tính \"from order is created\". Cửa sổ resell — mốc mà quà chờ trước khi vào đơn — bắt đầu từ lúc tạo đơn hay lúc khách mở box, và giá trị cho phép trên gói trả phí là bao nhiêu?",
  "kb_ids": [
    "prizes-added-to-order#KB-083"
  ],
  "check_ids": [
    "prizes-added-to-order:CHK-030"
  ],
  "tags": [
    "staging-observed"
  ]
}
```

## OQ-order-draw-072 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-order-draw-072",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "prizes-added-to-order",
  "summary": "Staging: app sửa đơn một lần (một email \"order edited\") cho cả đơn sau box cuối, kể cả khi mở bằng nhiều cách; đơn chỉ có box sealed không bị sửa. Đây có phải hành vi mong đợi trên mọi đường mở (Flow, auto-unbox, job sync sau cửa sổ resell) không?",
  "kb_ids": [
    "prizes-added-to-order#KB-081"
  ],
  "check_ids": [
    "prizes-added-to-order:CHK-031"
  ],
  "tags": [
    "staging-observed"
  ]
}
```

## OQ-order-draw-073 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-order-draw-073",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "purchase-and-prize-draw",
  "summary": "Staging: chi tiết đơn của merchant không hiện quà của box digital chưa mở nhưng hiện ngay quà của box Sealed, và gộp các box Sealed trúng cùng món thành một dòng. Merchant có nên thấy quà đã chốt của box digital trước khi khách mở không, và cách gộp dòng này có chủ ý không?",
  "kb_ids": [
    "purchase-and-prize-draw#KB-068"
  ],
  "check_ids": [
    "purchase-and-prize-draw:CHK-033"
  ],
  "tags": [
    "staging-observed"
  ]
}
```

## OQ-order-draw-074 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-order-draw-074",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "purchase-and-prize-draw",
  "summary": "Staging: đơn mua box chuyển tồn kho variant box từ Available sang Committed (On hand chưa đổi vì chưa fulfil). Đây là hành vi chuẩn của Shopify (Mysbox không tác động tồn kho variant box) phải không, và khi quà được thêm vào đơn / đơn fulfil thì tồn kho variant box thay đổi thế nào?",
  "kb_ids": [
    "purchase-and-prize-draw#KB-072"
  ],
  "check_ids": [
    "purchase-and-prize-draw:CHK-034"
  ],
  "tags": [
    "staging-observed"
  ]
}
```

## OQ-order-draw-075 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-order-draw-075",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "purchase-and-prize-draw",
  "summary": "Staging: box vào giỏ không mang line property/attribute nào của Mysbox và requires_shipping true kể cả với box digital. Đây có phải thiết kế không (Mysbox nhận diện box chỉ qua variant đã link), và box digital có nên requires_shipping không?",
  "kb_ids": [
    "purchase-and-prize-draw#KB-073"
  ],
  "check_ids": [
    "purchase-and-prize-draw:CHK-035"
  ],
  "tags": [
    "staging-observed"
  ]
}
```

## OQ-order-draw-076 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-order-draw-076",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "purchase-and-prize-draw",
  "summary": "Cột Date ở Manage orders hiển thị theo giờ máy người xem (staging: +0700) thay vì timezone của shop (America/New_York). Hành vi mong đợi là theo timezone nào?",
  "kb_ids": [
    "_object-level.order-draw#KB-033"
  ],
  "check_ids": [
    "purchase-and-prize-draw:CHK-036"
  ],
  "tags": [
    "staging-observed"
  ]
}
```

## OQ-order-draw-077 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-order-draw-077",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "purchase-and-prize-draw",
  "summary": "Staging: kết quả của box digital chưa mở không trả qua API merchant lẫn app proxy (winning_bundles []). Đây có phải cơ chế chủ ý để khách không đọc trước được quà không, và còn endpoint nào (staging-api, admin) lộ kết quả trước khi mở không?",
  "kb_ids": [
    "purchase-and-prize-draw#KB-069"
  ],
  "check_ids": [
    "purchase-and-prize-draw:CHK-037"
  ],
  "tags": [
    "staging-observed"
  ]
}
```

## OQ-order-draw-078 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-order-draw-078",
  "type": "OPEN_ISSUE",
  "feature_id": "physical-sealed-box-fulfilment",
  "summary": "Đơn chỉ có box sealed hiện trong \"Your orders\" của khách dạng \"0 / 0 unboxed\" và trang \"View details\" lỗi 422 (box-versions/by-ids ids rỗng) — đây là hành vi chủ ý hay lỗi hiển thị? — Khách thấy đơn rỗng/lỗi; cần owner xác nhận trước khi viết check (regression watch hay expected). Không tự escalate — hỏi operator.",
  "kb_ids": [
    "physical-sealed-box-fulfilment#KB-074",
    "physical-sealed-box-fulfilment#KB-073",
    "physical-sealed-box-fulfilment#KB-005"
  ],
  "tags": [
    "staging-observed"
  ]
}
```

## OQ-order-draw-079 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-order-draw-079",
  "type": "OPEN_ISSUE",
  "feature_id": "purchase-and-prize-draw",
  "summary": "Kết quả bốc của box digital có thực sự được chốt ngay lúc paid không, khi cả API merchant lẫn app proxy trả winning_bundles [] cho box digital chưa mở (trong khi box sealed cùng đơn có ngay)? — KB-001 (CE) nói chốt lúc paid nhưng không surface nào quan sát được kết quả trước khi mở (KB-069); cần Dev xác nhận API có ẩn kết quả chủ ý không để viết check 'không đổi quà khi reload/mở lại'.",
  "kb_ids": [
    "purchase-and-prize-draw#KB-069",
    "purchase-and-prize-draw#KB-001"
  ],
  "tags": [
    "staging-observed"
  ]
}
```

## OQ-order-draw-080 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-order-draw-080",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "prizes-added-to-order",
  "summary": "Quan sát staging mới chạm vùng rủi ro cao (quyền truy cập / tiền / billing): Dòng quà MYSBOX -100%: vị trí chuỗi MYSBOX trên admin và trang khách; Tổng đơn không đổi sau khi thêm dòng quà (ship Free nên chưa kiểm ship). Item là OBSERVED_CURRENT; cần PO xác nhận đây là hành vi dự kiến trước khi dùng làm expected result.",
  "kb_ids": [
    "prizes-added-to-order#KB-079",
    "prizes-added-to-order#KB-080"
  ],
  "tags": [
    "staging-observed",
    "risk-flag"
  ]
}
```

## OQ-order-draw-081 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-order-draw-081",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "purchase-and-prize-draw",
  "summary": "Quan sát staging mới chạm vùng rủi ro cao (quyền truy cập / tiền / billing): Box sales limit không đổi sau 3 đơn test Bogus; không có toggle Exclude test order; Giỏ và checkout box: line thường, không có dữ liệu Mysbox; tổng trước khi quà vào đơn. Item là OBSERVED_CURRENT; cần PO xác nhận đây là hành vi dự kiến trước khi dùng làm expected result.",
  "kb_ids": [
    "purchase-and-prize-draw#KB-071",
    "purchase-and-prize-draw#KB-073"
  ],
  "tags": [
    "staging-observed",
    "risk-flag"
  ]
}
```
