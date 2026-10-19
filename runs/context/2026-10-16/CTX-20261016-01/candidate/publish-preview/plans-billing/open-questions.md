# Open Questions — plans-billing

Tổng: 131 mục (CONFLICT 14 · OPEN_ISSUE 68 · NEEDS_CONFIRMATION 49). Sinh từ bootstrap DOC_BOOTSTRAP đầu tiên của Mysbox (nguồn: bộ Product KB v1 do dev viết từ source code, 2026-10-16). Mỗi mục là một khối json; `kb_ids` dạng `<feature_key>#KB-xxx` (hoặc `_object-level#KB-xxx` cho tầng object), `check_ids` dạng `<feature_key>:CHK-xxx`.

## OQ-plans-billing-001 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-plans-billing-001",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": null,
  "summary": "Bộ tài liệu nguồn không chỉ định role mặc định cho object này (bootstrap-request để role null): các KB item mang scope.role theo vai trò tài liệu nêu cho từng hành vi, hoặc \"unspecified\" khi tài liệu không nêu. Cần PO/Dev xác nhận ma trận role → quyền thực tế trên production (merchant owner/staff, khách, admin Mysbox theo từng role) trước khi dùng các check PERMISSION làm oracle."
}
```

## OQ-plans-billing-002 — CONFLICT

```json
{
  "oq_id": "OQ-plans-billing-002",
  "type": "CONFLICT",
  "feature_id": null,
  "summary": "Trong admin panel, nhánh Plans / Charges có phải read-only không: nhãn \"(tiền, read-only)\" trong sơ đồ áp cho Plans, Charges hay cả hai, khi cùng tài liệu nói đội billing/partnership tạo Plan? (Phía còn lại thuộc shard quản trị danh mục plan của cùng object.)",
  "side_a": "Tài liệu \"Admin panel — tổng quan và bản đồ màn hình\" §Sơ đồ tổng quát ghi nhánh Plans / Charges là \"(tiền, read-only)\".",
  "side_b": "Cùng tài liệu \"Admin panel — tổng quan và bản đồ màn hình\" §Ai dùng và dùng để làm gì nêu đội Billing / partnership tạo Plan (cùng Discount, Promote code, gửi link thanh toán).",
  "conflict_group": "CONF-plans-billing-02",
  "kb_ids": [
    "_object-level#KB-020",
    "plan-catalog-administration#KB-011"
  ],
  "check_ids": [
    "plan-catalog-administration:CHK-013"
  ]
}
```

## OQ-plans-billing-003 — CONFLICT

```json
{
  "oq_id": "OQ-plans-billing-003",
  "type": "CONFLICT",
  "feature_id": "billing-discount-codes",
  "summary": "Merchant nhập mã billing discount ở đâu: portal có hộp nhập mã (trang Pricing, hành động \"Apply discount\") hay mã chỉ áp được qua tham số `code` của yêu cầu lấy đường dẫn duyệt subscription? Ngoài mâu thuẫn giữa các tài liệu, tài liệu billing discount còn tự mâu thuẫn trong cùng một đoạn (nói merchant nhập mã khi chọn plan nhưng tự khai chưa tìm thấy ô nhập mã).",
  "side_a": "Tài liệu \"Plans, Charges, Discounts, Promote codes\" §3. Discounts (giảm giá subscription) và \"Playbook 4: billing, plan, capacity, mã giảm giá\" §Mã giảm giá (discount code) bị từ chối nêu merchant nhập mã trong hộp nhập mã ở portal / trang Pricing; \"Merchant app — tổng quan\" §Màn hình trong menu trái liệt kê hành động \"Apply discount\" trên Pricing.",
  "side_b": "Tài liệu \"Billing discount (mã giảm giá và thêm ngày trial)\" §Cách admin \"gắn\" mã cho shop tự khai chưa xác nhận: không tìm thấy ô nhập mã billing trong portal, chỉ thấy tham số `code` ở server.",
  "conflict_group": "CONF-plans-billing-04",
  "kb_ids": [
    "billing-discount-codes#KB-048",
    "billing-discount-codes#KB-049",
    "billing-discount-codes#KB-050",
    "billing-discount-codes#KB-051"
  ],
  "check_ids": [
    "billing-discount-codes:CHK-021"
  ]
}
```

## OQ-plans-billing-004 — CONFLICT

```json
{
  "oq_id": "OQ-plans-billing-004",
  "type": "CONFLICT",
  "feature_id": "billing-discount-codes",
  "summary": "Thông điệp lỗi khi dùng billing discount: mỗi điều kiện từ chối có thông điệp riêng (\"Out of discount code\" chỉ cho hết lượt, \"not active\", \"not been applied yet\" / \"expired\", \"has been used\"), hay \"Out of discount code\" được hiển thị cho nhiều điều kiện khác nhau?",
  "side_a": "Tài liệu \"Playbook 4: billing, plan, capacity, mã giảm giá\" §Mã giảm giá (discount code) bị từ chối gán mỗi thông điệp với một nguyên nhân: \"Out of discount code\" là hết lượt; \"not active\" là công tắc Active tắt; \"not been applied yet\" / \"expired\" là ngoài khoảng start/end; \"has been used\" là cặp (shop, plan) đã dùng.",
  "side_b": "Tài liệu \"Billing discount (mã giảm giá và thêm ngày trial)\" §Câu hỏi thường gặp hướng dẫn khi gặp \"Out of discount code\" thì kiểm tra Total amount, Active, ngày hiệu lực, plan trong danh sách và shop đã dùng chưa, tức gắn thông điệp này với nhiều điều kiện.",
  "conflict_group": "CONF-plans-billing-05",
  "kb_ids": [
    "billing-discount-codes#KB-052",
    "billing-discount-codes#KB-053",
    "billing-discount-codes#KB-054",
    "billing-discount-codes#KB-055",
    "billing-discount-codes#KB-056"
  ],
  "check_ids": [
    "billing-discount-codes:CHK-020"
  ]
}
```

## OQ-plans-billing-005 — CONFLICT

```json
{
  "oq_id": "OQ-plans-billing-005",
  "type": "CONFLICT",
  "feature_id": "capacity-limit-enforcement",
  "summary": "Huỷ gói có tự làm toàn bộ box biến mất khỏi store không, hay box chỉ bị unpublish khi shop huỷ plan trong lúc đang vượt capacity của plan Free (và thời điểm là ngay khi huỷ hay sau khi kỳ đã trả kết thúc)?",
  "side_a": "Tài liệu \"Tạo box và vòng đời Draft / Active\" §Câu hỏi thường gặp nêu toàn bộ box biến mất khi gói Free hết quota hoặc gói bị huỷ, không kèm điều kiện vượt capacity.",
  "side_b": "Tài liệu \"Playbook 3: storefront, widget, theme và trang khách\" §Box tự unpublish nêu nguyên nhân là plan bị huỷ khi shop đang vượt capacity Free.",
  "conflict_group": "CONF-plans-billing-06",
  "kb_ids": [
    "capacity-limit-enforcement#KB-004",
    "capacity-limit-enforcement#KB-005"
  ],
  "check_ids": [
    "capacity-limit-enforcement:CHK-014"
  ]
}
```

## OQ-plans-billing-006 — CONFLICT

```json
{
  "oq_id": "OQ-plans-billing-006",
  "type": "CONFLICT",
  "feature_id": "daily-usage-charge-and-charge-status",
  "summary": "Tài liệu mâu thuẫn về số loại Charge: hai tài liệu nói Charge có hai loại (Recurring, Usage), playbook billing liệt kê thêm loại One-time. Cần xác nhận danh sách loại Charge và khi nào phát sinh One-time.",
  "side_a": "Tài liệu \"Domain entities\" §Quan hệ giữa các đối tượng và \"Chu kỳ billing, job tạo phí và trạng thái Charge\" §Trạng thái Charge: Charge có hai loại, Recurring (subscription) và Usage (phí box vượt).",
  "side_b": "Tài liệu \"Playbook 4: billing, plan, capacity, mã giảm giá\" §\"Tôi bị tính phí hai lần\": tab Charges của shop có các loại Recurring, Usage và One-time.",
  "conflict_group": "CONF-plans-billing-09",
  "kb_ids": [
    "daily-usage-charge-and-charge-status#KB-006",
    "daily-usage-charge-and-charge-status#KB-074"
  ],
  "check_ids": [
    "daily-usage-charge-and-charge-status:CHK-018"
  ]
}
```

## OQ-plans-billing-007 — CONFLICT

```json
{
  "oq_id": "OQ-plans-billing-007",
  "type": "CONFLICT",
  "feature_id": "plan-capacity-and-cycle",
  "summary": "Tài liệu mâu thuẫn về việc box bán trong thời gian trial có trừ quota (capacity) hay không. Cần dev/PO xác nhận hành vi đúng; không dùng phía nào làm oracle cho tới khi xác nhận.",
  "side_a": "Tài liệu \"Plan và capacity (quota)\" §Cái gì tính là 1 box đã dùng và §Trial: đơn trong trial không dùng quota, không trừ quota (chỉ tăng \"sold in cycle\").",
  "side_b": "Tài liệu \"Playbook 4: billing, plan, capacity, mã giảm giá\" §Nhầm lẫn về trial: trong trial box bán ra vẫn được tính vào capacity (dù không có phí usage). Tài liệu \"Trạng thái shop và vòng đời\" §2 chỉ nói \"box bán vẫn đếm\", không rõ đếm vào quota hay vào sold in cycle.",
  "conflict_group": "CONF-plans-billing-07",
  "kb_ids": [
    "plan-capacity-and-cycle#KB-040",
    "plan-capacity-and-cycle#KB-073",
    "plan-capacity-and-cycle#KB-080"
  ],
  "check_ids": [
    "plan-capacity-and-cycle:CHK-021"
  ]
}
```

## OQ-plans-billing-008 — CONFLICT

```json
{
  "oq_id": "OQ-plans-billing-008",
  "type": "CONFLICT",
  "feature_id": "plan-capacity-and-cycle",
  "summary": "Trong ví dụ hoá đơn theo số lượng của tài liệu \"Cách tính phí box vượt (usage pricing)\", chỉ số \"Total sold in cycle\" = 145 không khớp tổng các đơn được liệt kê (135) và tổng phí đã gửi (tương đương 35 box vượt). Cần tác giả tài liệu xác nhận số đúng; không dùng 145 làm oracle.",
  "side_a": "Tài liệu \"Cách tính phí box vượt (usage pricing)\" §Hoá đơn 1 — theo số lượng: \"Total sold in cycle\" hiển thị 145.",
  "side_b": "Cùng tài liệu, cùng mục: các đơn liệt kê 95 + 4 + 6 + 3 + 27 = 135 box và tổng phí gửi đi $1.25 + $7.50 = $8.75 (tương đương 35 box vượt × $0.25). Các claim phía này thuộc feature usage-fee-pricing.",
  "conflict_group": "CONF-plans-billing-03",
  "kb_ids": [
    "plan-capacity-and-cycle#KB-050",
    "usage-fee-pricing#KB-045",
    "usage-fee-pricing#KB-048",
    "usage-fee-pricing#KB-049"
  ]
}
```

## OQ-plans-billing-009 — CONFLICT

```json
{
  "oq_id": "OQ-plans-billing-009",
  "type": "CONFLICT",
  "feature_id": "plan-capacity-and-cycle",
  "summary": "Hai kịch bản ví dụ của tài liệu \"Nâng, hạ, huỷ plan và trang xem trước thay đổi\" dùng hai giá trị quota khác nhau cho cùng plan minh hoạ \"Growth\" ($29). Cả hai là số minh hoạ, không phải số production; cần catalog plan thật nếu muốn làm test data.",
  "side_a": "Tài liệu \"Nâng, hạ, huỷ plan và trang xem trước thay đổi\" §Nâng plan (quota lớn hơn): plan \"Growth\" $29, quota 100, trial 7 ngày, $0.25/box.",
  "side_b": "Cùng tài liệu §Hạ plan (quota nhỏ hơn): plan \"Growth\" $29, quota 50.",
  "conflict_group": "CONF-plans-billing-08",
  "kb_ids": [
    "plan-capacity-and-cycle#KB-052",
    "plan-capacity-and-cycle#KB-057"
  ]
}
```

## OQ-plans-billing-010 — CONFLICT

```json
{
  "oq_id": "OQ-plans-billing-010",
  "type": "CONFLICT",
  "feature_id": "plan-capacity-and-cycle",
  "summary": "Khi cờ \"Exclude Test Order\" ở trạng thái mặc định (bật), đơn test của Shopify có trừ capacity/quota của shop hay không? Hai phía tài liệu nói trái nhau; không dùng phía nào làm oracle cho tới khi dev/PO xác nhận.",
  "side_a": "Tài liệu \"Plan và capacity (quota)\" §Cái gì tính là 1 box đã dùng và tài liệu \"Overview\" §Key vocabulary: mặc định đơn test của Shopify không tính vào quota/hạn mức (cài đặt \"Exclude Test Order\" bật mặc định). Tài liệu \"Dashboard và analytics\" §Test order cũng nói đơn test chỉ trừ hạn mức khi cờ tắt. Cùng mục đó: preview order được xử lý như đơn test, không tính vào quota khi \"Exclude Test Order\" bật (KB-033).",
  "side_b": "Tài liệu \"Playbook 1: đơn hàng, bốc thăm và mở box\" §Đơn test / preview cư xử lạ: đơn test vẫn bốc thật, tiêu thụ tồn kho và tính vào capacity; điều kiện \"nếu shop bật Exclude test order\" chỉ gắn với việc không tính phí usage, không gắn với capacity.",
  "conflict_group": "CONF-plans-billing-20",
  "kb_ids": [
    "capacity-limit-enforcement#KB-029",
    "plan-capacity-and-cycle#KB-007",
    "plan-capacity-and-cycle#KB-033"
  ],
  "check_ids": [
    "plan-capacity-and-cycle:CHK-008"
  ]
}
```

## OQ-plans-billing-011 — CONFLICT

```json
{
  "oq_id": "OQ-plans-billing-011",
  "type": "CONFLICT",
  "feature_id": "plan-upgrade-downgrade-cancel",
  "summary": "Mâu thuẫn trong cùng tài liệu: khi nâng từ Free trong thời gian ân hạn mà used vượt quota plan mới, có thực sự phát sinh phí vượt hay khối \"Over capacity fee\" chỉ là số hiển thị tính trong trình duyệt và không bị thu. Cần dev/PO xác nhận.",
  "side_a": "Tài liệu \"Nâng, hạ, huỷ plan và trang xem trước thay đổi\" §Nâng plan (quota lớn hơn): shop Free còn trong ân hạn đã dùng hơn quota plan mới thì hộp thoại nâng hiện thêm khối \"Over capacity fee\".",
  "side_b": "Cùng tài liệu §Hạ plan (quota nhỏ hơn), bảng quy tắc: Free sang Paid giữ used, không tính lại gì.",
  "conflict_group": "CONF-plans-billing-10",
  "kb_ids": [
    "plan-upgrade-downgrade-cancel#KB-045",
    "plan-upgrade-downgrade-cancel#KB-063"
  ],
  "check_ids": [
    "plan-upgrade-downgrade-cancel:CHK-017"
  ]
}
```

## OQ-plans-billing-012 — CONFLICT

```json
{
  "oq_id": "OQ-plans-billing-012",
  "type": "CONFLICT",
  "feature_id": "plan-upgrade-downgrade-cancel",
  "summary": "Mâu thuẫn về ngưỡng gỡ publish box trong thời gian ân hạn sau khi huỷ gói trả phí: theo quota Paid còn hiệu lực đến hết kỳ, theo quota Free (gỡ ngay nếu đã vượt), hay gỡ toàn bộ box ngay khi huỷ. Cần dev/PO xác nhận.",
  "side_a": "Tài liệu \"Nâng, hạ, huỷ plan và trang xem trước thay đổi\" §Huỷ plan (chọn Free) và \"Playbook 4: billing, plan, capacity, mã giảm giá\": sau khi huỷ, shop vẫn dùng quota và điều khoản của plan Paid đến hết kỳ đã trả.",
  "side_b": "Cùng tài liệu §Huỷ plan (chọn Free): nếu đã vượt quota Free thì box bị gỡ publish ngay; tài liệu \"Tạo box và vòng đời Draft / Active\" §Bước 5: huỷ gói trả phí cũng làm tất cả box bị tự unpublish.",
  "conflict_group": "CONF-plans-billing-11",
  "kb_ids": [
    "plan-upgrade-downgrade-cancel#KB-084",
    "plan-upgrade-downgrade-cancel#KB-085",
    "plan-upgrade-downgrade-cancel#KB-086"
  ],
  "check_ids": [
    "plan-upgrade-downgrade-cancel:CHK-024"
  ]
}
```

## OQ-plans-billing-013 — CONFLICT

```json
{
  "oq_id": "OQ-plans-billing-013",
  "type": "CONFLICT",
  "feature_id": "plan-upgrade-downgrade-cancel",
  "summary": "Mâu thuẫn về gói hiệu lực của shop ngay sau khi gỡ app: về Free ngay, hay vẫn giữ quyền lợi / bị tính usage của gói trả phí trong thời gian ân hạn đến hết kỳ đã trả. Một số tài liệu nêu cả hai ý trong cùng một câu (gói về Free, gói trả phí vẫn còn hạn đến hết kỳ) nên có thể là hai khái niệm khác nhau (nhãn gói và subscription), nhưng tài liệu không nói rõ. Cần dev/PO xác nhận: hạn mức box, tính năng trả phí và phí usage áp theo gói nào trong thời gian ân hạn; và nếu cài lại trong thời gian ân hạn thì hạn mức nào áp dụng (tài liệu tự khai là chưa xác nhận). Ngày hết hạn của charge (cuối kỳ 30 ngày đã trả) không bị tranh chấp.",
  "side_a": "Tài liệu \"Trạng thái shop và vòng đời\" §3. Gỡ app (uninstall), cùng \"Domain entities\", \"Tích hợp: tổng quan và cách xác thực request\", \"Webhook mà app nhận\" và \"Playbook 5: tài khoản, kết nối, gỡ/cài app và tích hợp\": khi gỡ app, gói của shop về Free.",
  "side_b": "Tài liệu \"Trạng thái shop và vòng đời\" (bảng hạn mức: shop đã huỷ gói trả phí còn tính năng trả phí đến hết kỳ đã trả; §Câu hỏi thường gặp: shop đã gỡ app vẫn có thể bị tính usage vì subscription còn ân hạn), cùng \"Tích hợp: tổng quan và cách xác thực request\" và \"Playbook 5: tài khoản, kết nối, gỡ/cài app và tích hợp\": gói trả phí vẫn còn hạn đến hết kỳ đã trả.",
  "conflict_group": "CONF-plans-billing-01",
  "kb_ids": [
    "plan-upgrade-downgrade-cancel#KB-091"
  ],
  "check_ids": [
    "plan-upgrade-downgrade-cancel:CHK-025"
  ]
}
```

## OQ-plans-billing-014 — CONFLICT

```json
{
  "oq_id": "OQ-plans-billing-014",
  "type": "CONFLICT",
  "feature_id": "promote-codes",
  "summary": "Hai tài liệu nói khác nhau về cách lưu Code của promote code: tự chuyển thành chữ HOA khi lưu, hay giữ nguyên như admin gõ. Hệ quả: merchant phải nhập chữ HOA hay nhập đúng như admin đã gõ. Cần dev/PO xác nhận.",
  "side_a": "Tài liệu \"Promote code (mã cộng thêm quota)\" §Ai tạo: Code được tự viết HOA khi lưu, tra cứu khớp tuyệt đối nên merchant phải nhập đúng chữ HOA.",
  "side_b": "Tài liệu \"Plans, Charges, Discounts, Promote codes\" §4. Promote codes (tặng capacity): code phân biệt hoa/thường và được lưu đúng như admin gõ.",
  "conflict_group": "CONF-plans-billing-12",
  "kb_ids": [
    "promote-codes#KB-007",
    "promote-codes#KB-008",
    "promote-codes#KB-009"
  ],
  "check_ids": [
    "promote-codes:CHK-006"
  ]
}
```

## OQ-plans-billing-015 — CONFLICT

```json
{
  "oq_id": "OQ-plans-billing-015",
  "type": "CONFLICT",
  "feature_id": "usage-fee-pricing",
  "summary": "Đổi plan sau khi đã bán box có làm tính lại phí usage không? Tài liệu support nói không tính lại usage cũ, trong khi tài liệu nâng/hạ plan và tài liệu cách tính phí mô tả việc tính lại phí cho phần box dư khi hạ plan (dựa trên mức phí \"nếu không có quota\" ghi lúc bán). Cần PO/dev xác nhận phạm vi của câu \"không tính lại\" (chỉ nâng plan, hay mọi lần đổi plan).",
  "side_a": "Tài liệu \"Playbook 4: billing, plan, capacity, mã giảm giá\" §Số phí usage nhìn sai: mức giá cố định lúc bán box, đổi plan sau không tính lại usage cũ.",
  "side_b": "Tài liệu \"Nâng, hạ, huỷ plan và trang xem trước thay đổi\" §Hạ plan (quota nhỏ hơn): hạ plan khi used ≥ quota mới thì phần dư được tính lại phí theo mức đã ghi lúc bán và gửi ngay; tài liệu \"Cách tính phí box vượt (usage pricing)\" §Mỗi đơn tạo ra gì: phí \"nếu không có quota\" dùng để tính lại khi hạ plan.",
  "conflict_group": "CONF-plans-billing-13",
  "kb_ids": [
    "plan-upgrade-downgrade-cancel#KB-060",
    "plan-upgrade-downgrade-cancel#KB-068",
    "usage-fee-pricing#KB-009"
  ],
  "check_ids": [
    "plan-upgrade-downgrade-cancel:CHK-021",
    "usage-fee-pricing:CHK-010"
  ]
}
```

## OQ-plans-billing-016 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-plans-billing-016",
  "type": "OPEN_ISSUE",
  "feature_id": "billing-discount-codes",
  "summary": "Promote code và billing discount có áp đồng thời cho cùng một shop/plan được không? — Quy tắc kết hợp không được nêu.",
  "kb_ids": [
    "billing-discount-codes#KB-002",
    "promote-codes#KB-002"
  ]
}
```

## OQ-plans-billing-017 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-plans-billing-017",
  "type": "OPEN_ISSUE",
  "feature_id": "billing-discount-codes",
  "summary": "Route/method của yêu cầu lấy đường dẫn duyệt và mã HTTP của phản hồi \"forbidden\"? — Cần cho API-level test và assert phản hồi lỗi.",
  "kb_ids": [
    "billing-discount-codes#KB-028",
    "billing-discount-codes#KB-031"
  ]
}
```

## OQ-plans-billing-018 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-plans-billing-018",
  "type": "OPEN_ISSUE",
  "feature_id": "billing-discount-codes",
  "summary": "Khi merchant nhập mã trên plan có discount mang sẵn, discount của plan bị thay thế hay cộng dồn? — Tài liệu chỉ nói discount của plan dùng khi không nhập mã.",
  "kb_ids": [
    "billing-discount-codes#KB-026"
  ]
}
```

## OQ-plans-billing-019 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-plans-billing-019",
  "type": "OPEN_ISSUE",
  "feature_id": "billing-discount-codes",
  "summary": "Giới hạn hợp lệ của Value (percentage > 100, amount lớn hơn giá plan, âm), Extra trial days, Intervals âm? — Boundary test form admin và tính giá.",
  "kb_ids": [
    "billing-discount-codes#KB-017",
    "billing-discount-codes#KB-018",
    "billing-discount-codes#KB-020"
  ]
}
```

## OQ-plans-billing-020 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-plans-billing-020",
  "type": "OPEN_ISSUE",
  "feature_id": "billing-discount-codes",
  "summary": "Total used tăng chính xác lúc nào ('kích hoạt xong' = merchant duyệt trên Shopify?) và có giảm khi merchant huỷ/không duyệt/subscription bị huỷ không? — Ảnh hưởng đếm lượt và điều kiện 'shop đã dùng mã này trên plan này'.",
  "kb_ids": [
    "billing-discount-codes#KB-038",
    "billing-discount-codes#KB-040"
  ]
}
```

## OQ-plans-billing-021 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-plans-billing-021",
  "type": "OPEN_ISSUE",
  "feature_id": "billing-discount-codes",
  "summary": "Mã nhập chữ thường có được chấp nhận không (mã luôn lưu chữ HOA)? — Case merchant nhập mã chữ thường.",
  "kb_ids": [
    "billing-discount-codes#KB-008"
  ]
}
```

## OQ-plans-billing-022 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-plans-billing-022",
  "type": "OPEN_ISSUE",
  "feature_id": "billing-discount-codes",
  "summary": "Cơ chế tự áp mã affiliate (giá trị prefix, cờ môi trường, thứ tự ưu tiên giữa dạng mã có REF và dạng ngắn) hoạt động thế nào? — Case tự áp mã affiliate; không có KB item nào mô tả."
}
```

## OQ-plans-billing-023 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-plans-billing-023",
  "type": "OPEN_ISSUE",
  "feature_id": "billing-discount-codes",
  "summary": "Quyền trên màn Discounts tách riêng xem/tạo/sửa/xoá hay một quyền cho cả nhóm? — Quyết định số tổ hợp permission cần kiểm.",
  "kb_ids": [
    "billing-discount-codes#KB-058"
  ]
}
```

## OQ-plans-billing-024 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-plans-billing-024",
  "type": "OPEN_ISSUE",
  "feature_id": "capacity-limit-enforcement",
  "summary": "Một đơn Free mua nhiều box làm used vượt quota (ví dụ còn 1 nhưng mua 3) có được bán và tạo lượt mở cho phần vượt không? — Tài liệu chỉ nêu điều kiện lớn-hơn-hoặc-bằng, không nêu số phận box vượt trong đơn Free.",
  "kb_ids": [
    "capacity-limit-enforcement#KB-002",
    "capacity-limit-enforcement#KB-003"
  ]
}
```

## OQ-plans-billing-025 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-plans-billing-025",
  "type": "OPEN_ISSUE",
  "feature_id": "capacity-limit-enforcement",
  "summary": "Hai \"plan đặc biệt vĩnh viễn\" được miễn điều kiện ẩn widget là plan nào? — Cần để kiểm điều kiện ẩn widget / khối Unbox theo plan.",
  "kb_ids": [
    "capacity-limit-enforcement#KB-009"
  ]
}
```

## OQ-plans-billing-026 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-plans-billing-026",
  "type": "OPEN_ISSUE",
  "feature_id": "capacity-limit-enforcement",
  "summary": "Widget dùng metafield trạng thái shop thế nào (ẩn widget, ẩn nút, hiện thông báo), và hạn chế cờ capacity cũ còn tồn tại có mức nghiêm trọng / trạng thái sửa ra sao? — Tài liệu tự khai chưa xác nhận; không kiểm được hành vi widget theo trạng thái shop.",
  "kb_ids": [
    "capacity-limit-enforcement#KB-007",
    "capacity-limit-enforcement#KB-008"
  ]
}
```

## OQ-plans-billing-027 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-plans-billing-027",
  "type": "OPEN_ISSUE",
  "feature_id": "capacity-limit-enforcement",
  "summary": "Câu chữ, subject của email capacity mẫu Free / Paid; gửi một lần mỗi chu kỳ hay mỗi lần đơn mới vượt; \"vượt vạch\" của mẫu Paid là lúc chạm đúng quota hay box đầu tiên vượt; tên template theo môi trường? — Không có oracle cho nội dung, số lượng và thời điểm email.",
  "kb_ids": [
    "capacity-limit-enforcement#KB-013",
    "capacity-limit-enforcement#KB-016",
    "capacity-limit-enforcement#KB-020",
    "capacity-limit-enforcement#KB-022"
  ]
}
```

## OQ-plans-billing-028 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-plans-billing-028",
  "type": "OPEN_ISSUE",
  "feature_id": "capacity-limit-enforcement",
  "summary": "Merchant (hoặc admin) publish lại box khi shop Free vẫn vượt capacity thì bị chặn với thông báo nào, hay box bị unpublish lại? — Tài liệu chỉ nói box bị gỡ tự động, không nêu hành vi khi cố publish lại.",
  "kb_ids": [
    "capacity-limit-enforcement#KB-018"
  ]
}
```

## OQ-plans-billing-029 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-plans-billing-029",
  "type": "OPEN_ISSUE",
  "feature_id": "capacity-limit-enforcement",
  "summary": "Khách bấm Unbox khi shop vượt capacity thấy lỗi gì? — Không có text lỗi để làm oracle.",
  "kb_ids": [
    "capacity-limit-enforcement#KB-010"
  ]
}
```

## OQ-plans-billing-030 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-plans-billing-030",
  "type": "OPEN_ISSUE",
  "feature_id": "capacity-limit-enforcement",
  "summary": "Shop trả phí có thấy cảnh báo hạn mức và nút Upgrade không; admin nâng capacity used trên plan trả phí có gây unpublish hay phát sinh phí không? — Tài liệu chỉ nêu hệ quả trên plan Free.",
  "kb_ids": [
    "capacity-limit-enforcement#KB-011",
    "capacity-limit-enforcement#KB-021"
  ]
}
```

## OQ-plans-billing-031 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-plans-billing-031",
  "type": "OPEN_ISSUE",
  "feature_id": "capacity-limit-enforcement",
  "summary": "Khi cài lại app, box được khôi phục \"thường đã unpublish\" — trường hợp nào box không bị unpublish, và dữ liệu nào được khôi phục? — Không viết được expected state sau reinstall.",
  "kb_ids": [
    "capacity-limit-enforcement#KB-019",
    "capacity-limit-enforcement#KB-038"
  ]
}
```

## OQ-plans-billing-032 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-plans-billing-032",
  "type": "OPEN_ISSUE",
  "feature_id": "capacity-limit-enforcement",
  "summary": "Hạn mức Free trên production là bao nhiêu và chữ thông báo có đổi theo hạn mức đó không? — Ví dụ dùng số seed 10; boundary chạm trần chưa có oracle.",
  "kb_ids": [
    "capacity-limit-enforcement#KB-030",
    "capacity-limit-enforcement#KB-040",
    "capacity-limit-enforcement#KB-044"
  ]
}
```

## OQ-plans-billing-033 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-plans-billing-033",
  "type": "OPEN_ISSUE",
  "feature_id": "daily-usage-charge-and-charge-status",
  "summary": "Hạn chế đã biết: Usage charge bị kẹt ở trạng thái Pending nếu process chết trước khi Shopify trả lời; tài liệu không nêu cơ chế timeout hay khôi phục.",
  "kb_ids": [
    "daily-usage-charge-and-charge-status#KB-037"
  ],
  "check_ids": [
    "daily-usage-charge-and-charge-status:CHK-017"
  ]
}
```

## OQ-plans-billing-034 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-plans-billing-034",
  "type": "OPEN_ISSUE",
  "feature_id": "daily-usage-charge-and-charge-status",
  "summary": "Hạn chế đã biết: khi Shopify từ chối usage record, các dòng phí đã ở trạng thái \"completed\" nên job đêm sau không nhặt lại, không có lệnh retry hay cảnh báo — Mysbox mất khoản phí đó.",
  "kb_ids": [
    "daily-usage-charge-and-charge-status#KB-049",
    "daily-usage-charge-and-charge-status#KB-050"
  ],
  "check_ids": [
    "daily-usage-charge-and-charge-status:CHK-014"
  ]
}
```

## OQ-plans-billing-035 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-plans-billing-035",
  "type": "OPEN_ISSUE",
  "feature_id": "daily-usage-charge-and-charge-status",
  "summary": "Hạn chế đã biết: Mysbox không nhận webhook thay đổi subscription, nên khi merchant huỷ trong Shopify admin hoặc Shopify tự huỷ vì không trả tiền, Mysbox vẫn hiện subscription Active/plan Paid cho tới lần đổi plan hoặc gỡ app kế tiếp.",
  "kb_ids": [
    "daily-usage-charge-and-charge-status#KB-045",
    "daily-usage-charge-and-charge-status#KB-062",
    "daily-usage-charge-and-charge-status#KB-065"
  ],
  "check_ids": [
    "daily-usage-charge-and-charge-status:CHK-015"
  ]
}
```

## OQ-plans-billing-036 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-plans-billing-036",
  "type": "OPEN_ISSUE",
  "feature_id": "daily-usage-charge-and-charge-status",
  "summary": "Hạn chế đã biết: Mysbox không kiểm tra capped amount trước khi gửi khoản usage sang Shopify, nên khoản vượt cap bị Shopify từ chối.",
  "kb_ids": [
    "daily-usage-charge-and-charge-status#KB-083"
  ],
  "check_ids": [
    "daily-usage-charge-and-charge-status:CHK-016"
  ]
}
```

## OQ-plans-billing-037 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-plans-billing-037",
  "type": "OPEN_ISSUE",
  "feature_id": "daily-usage-charge-and-charge-status",
  "summary": "\"1 tháng gần nhất\" là tháng lịch hay 30 ngày, tính từ thời điểm chạy job, có bao gồm biên không; dòng phí chưa gửi cũ hơn 1 tháng bị bỏ vĩnh viễn, đổi trạng thái hay hiện ở đâu? — Boundary cho dòng phí sát mốc và rủi ro mất phí âm thầm khi job lỡ nhiều ngày.",
  "kb_ids": [
    "daily-usage-charge-and-charge-status#KB-024"
  ]
}
```

## OQ-plans-billing-038 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-plans-billing-038",
  "type": "OPEN_ISSUE",
  "feature_id": "daily-usage-charge-and-charge-status",
  "summary": "Ngưỡng $0.005 tính theo tiền tệ nào và số tiền usage được làm tròn ra sao? — Ngưỡng đánh dấu Accepted không gọi Shopify là boundary cần test chính xác.",
  "kb_ids": [
    "daily-usage-charge-and-charge-status#KB-013",
    "daily-usage-charge-and-charge-status#KB-014",
    "daily-usage-charge-and-charge-status#KB-040"
  ]
}
```

## OQ-plans-billing-039 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-plans-billing-039",
  "type": "OPEN_ISSUE",
  "feature_id": "daily-usage-charge-and-charge-status",
  "summary": "Danh sách đầy đủ trạng thái của Recurring charge (ngoài Active / Pending / Declined / Cancelled), ví dụ khi Shopify đóng băng shop? — Cần enum đầy đủ để kiểm hiển thị và logic kích hoạt.",
  "kb_ids": [
    "daily-usage-charge-and-charge-status#KB-038",
    "daily-usage-charge-and-charge-status#KB-043"
  ]
}
```

## OQ-plans-billing-040 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-plans-billing-040",
  "type": "OPEN_ISSUE",
  "feature_id": "daily-usage-charge-and-charge-status",
  "summary": "Shop ở gói Free có sinh Charge không, và Recurring charge có tồn tại với gói giá 0 không? — Không có quy tắc tổng quát; ảnh hưởng dữ liệu kỳ vọng trên màn Charges.",
  "kb_ids": [
    "daily-usage-charge-and-charge-status#KB-005",
    "daily-usage-charge-and-charge-status#KB-021"
  ]
}
```

## OQ-plans-billing-041 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-plans-billing-041",
  "type": "OPEN_ISSUE",
  "feature_id": "daily-usage-charge-and-charge-status",
  "summary": "Màn Payment > Charges có những bộ lọc và màn chi tiết nào (ví dụ lọc theo Declined/Failed)? — Chỉ có cột và tab; bộ lọc chỉ được ngụ ý trong ví dụ.",
  "kb_ids": [
    "daily-usage-charge-and-charge-status#KB-054",
    "daily-usage-charge-and-charge-status#KB-070"
  ]
}
```

## OQ-plans-billing-042 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-plans-billing-042",
  "type": "OPEN_ISSUE",
  "feature_id": "plan-capacity-and-cycle",
  "summary": "Khi trial kết thúc giữa chu kỳ, box bán sau trial trừ quota từ 0 hay tính cả phần đã bán lúc trial? — Ranh giới chuyển trial sang trả phí chưa được nêu.",
  "kb_ids": [
    "plan-capacity-and-cycle#KB-039",
    "plan-capacity-and-cycle#KB-041"
  ]
}
```

## OQ-plans-billing-043 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-plans-billing-043",
  "type": "OPEN_ISSUE",
  "feature_id": "plan-capacity-and-cycle",
  "summary": "Mốc chu kỳ 30 ngày tính theo múi giờ nào, giờ nào trong ngày, có bao gồm ngày cuối không? — Cần để kiểm thời điểm used đọc về 0 quanh ranh giới chu kỳ.",
  "kb_ids": [
    "plan-capacity-and-cycle#KB-016",
    "plan-capacity-and-cycle#KB-019"
  ]
}
```

## OQ-plans-billing-044 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-plans-billing-044",
  "type": "OPEN_ISSUE",
  "feature_id": "plan-capacity-and-cycle",
  "summary": "Ngưỡng 80% được làm tròn thế nào khi quota không chia hết và so sánh là lớn-hơn-hoặc-bằng hay lớn-hơn; màu thanh tiến độ ở từng mốc? — Boundary test cho cảnh báo \"You almost reach the box limit\".",
  "kb_ids": [
    "plan-capacity-and-cycle#KB-021"
  ]
}
```

## OQ-plans-billing-045 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-plans-billing-045",
  "type": "OPEN_ISSUE",
  "feature_id": "plan-capacity-and-cycle",
  "summary": "Đơn nhiều variant box trừ hạn mức theo thứ tự nào (thứ tự dòng, giá, thời điểm tạo)? — Quyết định dòng nào bị tính phí vượt khi đơn chạm trần giữa chừng.",
  "kb_ids": [
    "plan-capacity-and-cycle#KB-009"
  ]
}
```

## OQ-plans-billing-046 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-plans-billing-046",
  "type": "OPEN_ISSUE",
  "feature_id": "plan-capacity-and-cycle",
  "summary": "Cài đặt \"Exclude Test Order\" nằm ở màn nào, merchant có thấy không, và tiêu chí nhận biết đơn test là gì? — Không rõ surface và dữ liệu để kiểm việc loại trừ.",
  "kb_ids": [
    "plan-capacity-and-cycle#KB-030",
    "plan-capacity-and-cycle#KB-031"
  ]
}
```

## OQ-plans-billing-047 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-plans-billing-047",
  "type": "OPEN_ISSUE",
  "feature_id": "plan-capacity-and-cycle",
  "summary": "Early-bird: điều kiện để shop là Founding member, \"giữ nguyên\" nghĩa là gì, 50 box tính theo chu kỳ hay tổng? — Không xác định được phạm vi và boundary của gói.",
  "kb_ids": [
    "plan-capacity-and-cycle#KB-061",
    "plan-capacity-and-cycle#KB-074"
  ]
}
```

## OQ-plans-billing-048 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-plans-billing-048",
  "type": "OPEN_ISSUE",
  "feature_id": "plan-capacity-and-cycle",
  "summary": "Badge \"7 - days free trial\" là số cố định hay lấy từ số ngày trial của plan? — Kiểm hiển thị badge với plan có số ngày trial khác 7.",
  "kb_ids": [
    "plan-capacity-and-cycle#KB-043"
  ]
}
```

## OQ-plans-billing-049 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-plans-billing-049",
  "type": "OPEN_ISSUE",
  "feature_id": "plan-catalog-administration",
  "summary": "Hạn chế đã biết: nếu thiếu plan mặc định (On install) thì việc cài mới app bị hỏng; tài liệu không nêu panel có chặn lưu khi 0 hoặc nhiều hơn một plan bật On install hay không.",
  "kb_ids": [
    "plan-catalog-administration#KB-033"
  ],
  "check_ids": [
    "plan-catalog-administration:CHK-011"
  ]
}
```

## OQ-plans-billing-050 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-plans-billing-050",
  "type": "OPEN_ISSUE",
  "feature_id": "plan-catalog-administration",
  "summary": "Hạn chế đã biết: plan trả phí bỏ trống điều khoản usage khiến đơn mới của shop lỗi ngay lúc nhập và đơn không được tạo; tài liệu không nêu form admin có chặn cấu hình này không.",
  "kb_ids": [
    "plan-catalog-administration#KB-035"
  ],
  "check_ids": [
    "plan-catalog-administration:CHK-012"
  ]
}
```

## OQ-plans-billing-051 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-plans-billing-051",
  "type": "OPEN_ISSUE",
  "feature_id": "plan-catalog-administration",
  "summary": "Giới hạn hợp lệ của price, trial days, Box Selling Capacity, % phí, phí tối thiểu? — Boundary test form admin.",
  "kb_ids": [
    "plan-catalog-administration#KB-026",
    "plan-catalog-administration#KB-028",
    "plan-catalog-administration#KB-029"
  ]
}
```

## OQ-plans-billing-052 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-plans-billing-052",
  "type": "OPEN_ISSUE",
  "feature_id": "plan-catalog-administration",
  "summary": "Quyền trên màn Plans tách riêng xem/tạo/sửa hay một quyền cho cả nhóm? — Quyết định số tổ hợp permission cần kiểm.",
  "kb_ids": [
    "plan-catalog-administration#KB-013"
  ]
}
```

## OQ-plans-billing-053 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-plans-billing-053",
  "type": "OPEN_ISSUE",
  "feature_id": "plan-upgrade-downgrade-cancel",
  "summary": "Hạn chế đã biết: các hộp thoại nâng/hạ plan trên màn Pricing tự tính phí theo $0.25/box trong trình duyệt (không dùng endpoint xem trước), nên số tiền hiển thị lệch phí thật với plan có phí khác $0.25 hoặc khi dòng phí không chia đều. Cần dev/PO xác nhận hành vi đúng (hiển thị phí của plan đích) và trạng thái sửa; không dùng số trong hộp thoại làm expected result.",
  "kb_ids": [
    "plan-upgrade-downgrade-cancel#KB-046",
    "plan-upgrade-downgrade-cancel#KB-101",
    "plan-upgrade-downgrade-cancel#KB-102",
    "plan-upgrade-downgrade-cancel#KB-103"
  ],
  "check_ids": [
    "plan-upgrade-downgrade-cancel:CHK-029"
  ]
}
```

## OQ-plans-billing-054 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-plans-billing-054",
  "type": "OPEN_ISSUE",
  "feature_id": "plan-upgrade-downgrade-cancel",
  "summary": "Hạn chế đã biết: Mysbox không nhận thông báo khi subscription đổi trạng thái bên Shopify, nên huỷ, đóng băng hoặc lỗi thanh toán trong Shopify admin chưa phản ánh trong Mysbox (vẫn hiện Active) cho tới khi một luồng của Mysbox chạm tới shop. Cần xác nhận những luồng nào cập nhật lại trạng thái và trạng thái sửa của hạn chế này.",
  "kb_ids": [
    "plan-upgrade-downgrade-cancel#KB-111",
    "plan-upgrade-downgrade-cancel#KB-112",
    "plan-upgrade-downgrade-cancel#KB-113"
  ],
  "check_ids": [
    "plan-upgrade-downgrade-cancel:CHK-030"
  ]
}
```

## OQ-plans-billing-055 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-plans-billing-055",
  "type": "OPEN_ISSUE",
  "feature_id": "plan-upgrade-downgrade-cancel",
  "summary": "Hết kỳ đã trả, shop bị áp capacity Free và có thể vượt capacity — capacity Free ở production là bao nhiêu và chính xác khi nào toàn bộ box bị gỡ? — Phát biểu chưa được xác nhận; số trong ví dụ không dùng làm oracle.",
  "kb_ids": [
    "plan-upgrade-downgrade-cancel#KB-089"
  ]
}
```

## OQ-plans-billing-056 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-plans-billing-056",
  "type": "OPEN_ISSUE",
  "feature_id": "plan-upgrade-downgrade-cancel",
  "summary": "Khi chọn lại plan trả phí sau khi huỷ/cài lại, trial có bắt đầu lại không hay chỉ còn số ngày trial chưa dùng (feature này chỉ có ví dụ)? — Expected trial khi đăng ký lại; ví dụ không phải oracle.",
  "kb_ids": [
    "billing-discount-codes#KB-043",
    "plan-upgrade-downgrade-cancel#KB-093",
    "plan-upgrade-downgrade-cancel#KB-094"
  ]
}
```

## OQ-plans-billing-057 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-plans-billing-057",
  "type": "OPEN_ISSUE",
  "feature_id": "plan-upgrade-downgrade-cancel",
  "summary": "Shopify xử lý phần chưa dùng của subscription cũ thế nào khi hạ plan? — Quyết định hoá đơn kế tiếp sau khi hạ; tài liệu tự khai chưa xác nhận.",
  "kb_ids": [
    "plan-upgrade-downgrade-cancel#KB-056",
    "plan-upgrade-downgrade-cancel#KB-057"
  ]
}
```

## OQ-plans-billing-058 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-plans-billing-058",
  "type": "OPEN_ISSUE",
  "feature_id": "plan-upgrade-downgrade-cancel",
  "summary": "Phí usage tạo trong thời gian ân hạn có bị tính nếu merchant đăng ký lại trong vòng một tháng? — Rủi ro thu dư/thu thiếu khi huỷ rồi đăng ký lại; tài liệu chỉ có suy luận.",
  "kb_ids": [
    "plan-upgrade-downgrade-cancel#KB-088",
    "plan-upgrade-downgrade-cancel#KB-105"
  ]
}
```

## OQ-plans-billing-059 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-plans-billing-059",
  "type": "OPEN_ISSUE",
  "feature_id": "plan-upgrade-downgrade-cancel",
  "summary": "Điều gì xảy ra khi merchant từ chối (decline) hoặc đóng trang duyệt của Shopify — plan/charge có bị đổi dở dang không? — Nhánh negative phổ biến, tài liệu không nêu.",
  "kb_ids": [
    "plan-upgrade-downgrade-cancel#KB-019",
    "plan-upgrade-downgrade-cancel#KB-107"
  ]
}
```

## OQ-plans-billing-060 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-plans-billing-060",
  "type": "OPEN_ISSUE",
  "feature_id": "plan-upgrade-downgrade-cancel",
  "summary": "Khi link có chữ ký quá hạn 7 ngày hoặc bị dùng lại thì hệ thống phản hồi thế nào (thông báo lỗi)? — Boundary của link xác nhận.",
  "kb_ids": [
    "plan-upgrade-downgrade-cancel#KB-031"
  ]
}
```

## OQ-plans-billing-061 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-plans-billing-061",
  "type": "OPEN_ISSUE",
  "feature_id": "plan-upgrade-downgrade-cancel",
  "summary": "Đổi sang plan cùng quota (đi vào nhánh hộp thoại hạ) có tính lại phí không? — Quy tắc 'còn lại = hạ' gộp ca bằng quota; bảng quota không có dòng cho ca bằng.",
  "kb_ids": [
    "plan-upgrade-downgrade-cancel#KB-026",
    "plan-upgrade-downgrade-cancel#KB-059"
  ]
}
```

## OQ-plans-billing-062 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-plans-billing-062",
  "type": "OPEN_ISSUE",
  "feature_id": "plan-upgrade-downgrade-cancel",
  "summary": "Nâng plan có làm đổi/reset chu kỳ billing không (chỉ có ví dụ hạ plan nói chu kỳ không đổi)? — Ảnh hưởng used và thời điểm hoá đơn sau nâng.",
  "kb_ids": [
    "plan-upgrade-downgrade-cancel#KB-047",
    "plan-upgrade-downgrade-cancel#KB-074"
  ]
}
```

## OQ-plans-billing-063 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-plans-billing-063",
  "type": "OPEN_ISSUE",
  "feature_id": "plan-upgrade-downgrade-cancel",
  "summary": "Ngoài loại store, tiêu chí 'đủ điều kiện chọn plan' gồm những gì và thông báo lỗi cho từng tiêu chí? — Chỉ có thông báo \"Plan is not supported\" cho lọc loại store.",
  "kb_ids": [
    "plan-upgrade-downgrade-cancel#KB-016"
  ]
}
```

## OQ-plans-billing-064 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-plans-billing-064",
  "type": "OPEN_ISSUE",
  "feature_id": "plan-upgrade-downgrade-cancel",
  "summary": "Hạ plan hoặc huỷ trong lúc đang trial thì phí tính lại và khoản usage cuối được xử lý thế nào? — Tương tác giữa trial và recalculation không được nêu.",
  "kb_ids": [
    "plan-upgrade-downgrade-cancel#KB-035",
    "plan-upgrade-downgrade-cancel#KB-069",
    "plan-upgrade-downgrade-cancel#KB-079"
  ]
}
```

## OQ-plans-billing-065 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-plans-billing-065",
  "type": "OPEN_ISSUE",
  "feature_id": "plan-upgrade-downgrade-cancel",
  "summary": "Sau khi chọn \"Upgrade now\" ở hộp thoại rời Early-bird thì luồng tiếp theo là gì; Early-bird 'giữ nguyên' nghĩa là gì và hạn mức của gói tính theo kỳ hay tổng? — Nhánh UI riêng cho shop Early-bird; phạm vi và boundary của gói chưa rõ.",
  "kb_ids": [
    "plan-upgrade-downgrade-cancel#KB-021",
    "plan-upgrade-downgrade-cancel#KB-023"
  ]
}
```

## OQ-plans-billing-066 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-plans-billing-066",
  "type": "OPEN_ISSUE",
  "feature_id": "plan-upgrade-downgrade-cancel",
  "summary": "Khi dev store thành store thật, subscription bị huỷ tự động hay cần thao tác thủ công, và 'plan mặc định' là plan nào? — Không xác định được trigger và trạng thái cuối để viết case.",
  "kb_ids": [
    "plan-upgrade-downgrade-cancel#KB-108",
    "plan-upgrade-downgrade-cancel#KB-110"
  ]
}
```

## OQ-plans-billing-067 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-plans-billing-067",
  "type": "OPEN_ISSUE",
  "feature_id": "plan-upgrade-downgrade-cancel",
  "summary": "Khi nâng plan (không phải hạ), box đang vượt có được tính lại phí không? — Tài liệu chỉ nêu recalculation khi hạ.",
  "kb_ids": [
    "plan-upgrade-downgrade-cancel#KB-061"
  ]
}
```

## OQ-plans-billing-068 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-plans-billing-068",
  "type": "OPEN_ISSUE",
  "feature_id": "plan-upgrade-downgrade-cancel",
  "summary": "Badge \"7 - days free trial\" là số cố định hay lấy từ số ngày trial của plan? — Kiểm hiển thị badge với plan có số ngày trial khác 7.",
  "kb_ids": [
    "plan-upgrade-downgrade-cancel#KB-006"
  ]
}
```

## OQ-plans-billing-069 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-plans-billing-069",
  "type": "OPEN_ISSUE",
  "feature_id": "plan-upgrade-downgrade-cancel",
  "summary": "Link thanh toán do admin/support gửi dẫn tới đâu và dùng trong trường hợp nào? — Tài liệu chỉ nêu admin gửi được link, không mô tả luồng.",
  "kb_ids": [
    "_object-level#KB-007",
    "plan-upgrade-downgrade-cancel#KB-043"
  ]
}
```

## OQ-plans-billing-070 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-plans-billing-070",
  "type": "OPEN_ISSUE",
  "feature_id": "promote-codes",
  "summary": "Redemption Pending có được tính là 'đã đổi mã này' hoặc 'đang có mã Active khác' không? — Biên khi đổi mã thứ hai lúc đang có redemption Pending.",
  "kb_ids": [
    "promote-codes#KB-050",
    "promote-codes#KB-051",
    "promote-codes#KB-055"
  ]
}
```

## OQ-plans-billing-071 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-plans-billing-071",
  "type": "OPEN_ISSUE",
  "feature_id": "promote-codes",
  "summary": "Redemption Pending có hết hạn không, và khi First upgrade chuyển Active thì số chu kỳ được đếm từ thời điểm nào? — Biên thời gian của mã First upgrade có Valid Cycles hữu hạn.",
  "kb_ids": [
    "promote-codes#KB-036",
    "promote-codes#KB-059"
  ]
}
```

## OQ-plans-billing-072 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-plans-billing-072",
  "type": "OPEN_ISSUE",
  "feature_id": "promote-codes",
  "summary": "Khi mã bị tắt hoặc xoá, quota thêm có còn được cộng ở chu kỳ mới trước lần đổi plan kế tiếp không? — Hết hạn 'lười' có thể để shop giữ quota thêm; cần expected rõ.",
  "kb_ids": [
    "promote-codes#KB-057",
    "promote-codes#KB-061",
    "promote-codes#KB-063",
    "promote-codes#KB-064"
  ]
}
```

## OQ-plans-billing-073 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-plans-billing-073",
  "type": "OPEN_ISSUE",
  "feature_id": "promote-codes",
  "summary": "Validation của Code (độ dài, ký tự cho phép) và hành vi khi tạo trùng mã? — Thiếu biên nhập liệu cho form admin.",
  "kb_ids": [
    "promote-codes#KB-006"
  ]
}
```

## OQ-plans-billing-074 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-plans-billing-074",
  "type": "OPEN_ISSUE",
  "feature_id": "promote-codes",
  "summary": "Ràng buộc biên của Valid Cycles và Max Uses ngoài -1 (có cho 0 hay số âm khác không)? — Chỉ Free Boxes Per Cycle có biên '>= 1'.",
  "kb_ids": [
    "promote-codes#KB-014",
    "promote-codes#KB-019"
  ]
}
```

## OQ-plans-billing-075 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-plans-billing-075",
  "type": "OPEN_ISSUE",
  "feature_id": "promote-codes",
  "summary": "Starts At / Ends At áp theo múi giờ nào? — Biên cửa sổ đổi mã.",
  "kb_ids": [
    "promote-codes#KB-024"
  ]
}
```

## OQ-plans-billing-076 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-plans-billing-076",
  "type": "OPEN_ISSUE",
  "feature_id": "promote-codes",
  "summary": "Công tắc Active của promote code 'có hiệu lực ngay' có áp cả khi chưa bấm Save không (như billing discount)? — Tài liệu chỉ ghi 'có hiệu lực ngay' cho promote code.",
  "kb_ids": [
    "billing-discount-codes#KB-011",
    "promote-codes#KB-026"
  ]
}
```

## OQ-plans-billing-077 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-plans-billing-077",
  "type": "OPEN_ISSUE",
  "feature_id": "promote-codes",
  "summary": "Quyền trên màn Promote codes tách riêng xem/tạo/sửa/xoá hay một quyền cho cả nhóm? — Quyết định số tổ hợp permission cần kiểm.",
  "kb_ids": [
    "promote-codes#KB-005"
  ]
}
```

## OQ-plans-billing-078 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-plans-billing-078",
  "type": "OPEN_ISSUE",
  "feature_id": "usage-fee-pricing",
  "summary": "Phí value-tiered (giá trị × phần trăm / 100) được làm tròn thế nào (cent, nửa cent)? — Oracle chính xác cho từng đơn vị và tổng usage.",
  "kb_ids": [
    "usage-fee-pricing#KB-028"
  ]
}
```

## OQ-plans-billing-079 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-plans-billing-079",
  "type": "OPEN_ISSUE",
  "feature_id": "usage-fee-pricing",
  "summary": "Shop dùng tiền tệ khác USD thì doanh thu dòng hàng quy đổi sang USD thế nào, theo tỉ giá lúc nào; giảm giá mức đơn được chia cho từng đơn vị ra sao? — Quyết định đơn vị nằm trên hay dưới ngưỡng.",
  "kb_ids": [
    "usage-fee-pricing#KB-025"
  ]
}
```

## OQ-plans-billing-080 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-plans-billing-080",
  "type": "OPEN_ISSUE",
  "feature_id": "usage-fee-pricing",
  "summary": "Plan có đồng thời phí mỗi box và bộ tham số value-tiered thì dùng cách tính nào (trường/flag chọn cách tính)? — Tài liệu nói cách tính do plan quyết định nhưng không nêu cơ chế chọn.",
  "kb_ids": [
    "usage-fee-pricing#KB-005",
    "usage-fee-pricing#KB-024"
  ]
}
```

## OQ-plans-billing-081 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-plans-billing-081",
  "type": "OPEN_ISSUE",
  "feature_id": "usage-fee-pricing",
  "summary": "Tiêu chí \"đơn test bị loại\" là gì; đơn preview (tag mysbox-preview-order) có bị tính phí usage không, kể cả trên staging; giá trị mặc định của \"Exclude test order\"? — Cần biết điều kiện để dựng data test cho dòng miễn phí.",
  "kb_ids": [
    "usage-fee-pricing#KB-036",
    "usage-fee-pricing#KB-037",
    "usage-fee-pricing#KB-038"
  ]
}
```

## OQ-plans-billing-082 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-plans-billing-082",
  "type": "OPEN_ISSUE",
  "feature_id": "usage-fee-pricing",
  "summary": "Điều kiện gán cờ \"miễn phí\" cho dòng Usage ngoài trial / plan Free (trong hạn mức, promote code) là gì? — Field được nêu nhưng quy tắc gán chưa đầy đủ.",
  "kb_ids": [
    "usage-fee-pricing#KB-012",
    "usage-fee-pricing#KB-014"
  ]
}
```

## OQ-plans-billing-083 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-plans-billing-083",
  "type": "OPEN_ISSUE",
  "feature_id": "usage-fee-pricing",
  "summary": "Giá trị Capped Amount của từng plan và nơi cấu hình; plan năm (không gửi Capped Amount) thu phí usage thế nào? — Cần để dựng ca chạm cap và hiểu usage của plan năm.",
  "kb_ids": [
    "usage-fee-pricing#KB-034",
    "usage-fee-pricing#KB-035"
  ]
}
```

## OQ-plans-billing-084 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-plans-billing-084",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "billing-discount-codes",
  "summary": "Bản ghi billing discount id 1 trên production có đúng là mã extend trial dựng sẵn (+7 ngày, cho mọi shop trừ development store) không; số 7 ngày có cấu hình được không; nếu id 1 là mã khác thì thao tác extend trial hành xử thế nào? Các giá trị hiện có chỉ là của bản ghi seed (seeder không tự chạy).",
  "kb_ids": [
    "billing-discount-codes#KB-044",
    "billing-discount-codes#KB-045",
    "billing-discount-codes#KB-046"
  ]
}
```

## OQ-plans-billing-085 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-plans-billing-085",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "billing-discount-codes",
  "summary": "Tài liệu plan và capacity nêu billing discount \"có thể\" cộng thêm ngày trial mà không nêu điều kiện; cần xác nhận Extra trial days áp thế nào, kể cả với plan không có trial.",
  "kb_ids": [
    "billing-discount-codes#KB-021"
  ]
}
```

## OQ-plans-billing-086 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-plans-billing-086",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "billing-discount-codes",
  "summary": "Các check P1 (tiền / billing / bốc thăm / refund / store credit / permission / xoá dữ liệu) của feature này có oracle STRONG nhưng chỉ dựa trên tài liệu dev (dev_doc). Theo luật oracle, chúng giữ NEEDS_CONFIRMATION cho tới khi có test_case PASS (hoặc PO/Dev xác nhận trực tiếp) cho đúng hành vi. Danh sách check ở check_ids.",
  "check_ids": [
    "billing-discount-codes:CHK-002",
    "billing-discount-codes:CHK-007",
    "billing-discount-codes:CHK-008",
    "billing-discount-codes:CHK-009",
    "billing-discount-codes:CHK-010",
    "billing-discount-codes:CHK-011",
    "billing-discount-codes:CHK-012",
    "billing-discount-codes:CHK-014",
    "billing-discount-codes:CHK-015",
    "billing-discount-codes:CHK-016",
    "billing-discount-codes:CHK-017",
    "billing-discount-codes:CHK-018",
    "billing-discount-codes:CHK-022",
    "billing-discount-codes:CHK-023",
    "billing-discount-codes:CHK-024"
  ]
}
```

## OQ-plans-billing-087 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-plans-billing-087",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "billing-discount-codes",
  "summary": "Khi trường Plans của billing discount để trống, form admin có chặn lưu không, hay mã được lưu nhưng không dùng được cho plan nào?",
  "kb_ids": [
    "billing-discount-codes#KB-009",
    "billing-discount-codes#KB-010",
    "billing-discount-codes#KB-037"
  ],
  "check_ids": [
    "billing-discount-codes:CHK-004"
  ]
}
```

## OQ-plans-billing-088 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-plans-billing-088",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "billing-discount-codes",
  "summary": "Bản ghi billing discount id = 1 trên production có đúng là mã extend trial dựng sẵn (cộng 7 ngày, cho mọi shop trừ development store) không; số ngày có cấu hình được không và mã này có bị giới hạn lượt/plan như mã thường?",
  "check_ids": [
    "billing-discount-codes:CHK-013"
  ]
}
```

## OQ-plans-billing-089 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-plans-billing-089",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "billing-discount-codes",
  "summary": "Total used của billing discount tăng chính xác vào lúc nào, và có giảm lại khi merchant không duyệt, từ chối trên Shopify hoặc huỷ subscription sau đó không? Cặp shop–plan đó có còn bị coi là 'đã dùng mã' không?",
  "check_ids": [
    "billing-discount-codes:CHK-019"
  ]
}
```

## OQ-plans-billing-090 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-plans-billing-090",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "billing-discount-codes",
  "summary": "Khi merchant nhập billing discount trên plan đã mang sẵn discount, discount của plan bị thay thế hay cộng dồn? Promote code và billing discount có áp đồng thời cho cùng một shop/plan được không?",
  "check_ids": [
    "billing-discount-codes:CHK-025"
  ]
}
```

## OQ-plans-billing-091 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-plans-billing-091",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "billing-discount-codes",
  "summary": "Giới hạn hợp lệ của Value (percentage trên 100, số âm, amount lớn hơn giá plan), Intervals âm và Extra trial days âm của billing discount là gì, form có chặn không?",
  "check_ids": [
    "billing-discount-codes:CHK-026"
  ]
}
```

## OQ-plans-billing-092 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-plans-billing-092",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "billing-discount-codes",
  "summary": "Billing discount luôn lưu chữ HOA; mã merchant nhập chữ thường có được chuyển HOA rồi chấp nhận không, hay bị từ chối?",
  "check_ids": [
    "billing-discount-codes:CHK-027"
  ]
}
```

## OQ-plans-billing-093 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-plans-billing-093",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "billing-discount-codes",
  "summary": "Quyền trên màn Discounts được tách riêng xem / tạo / sửa / xoá hay là một quyền cho cả nhóm, và tài khoản chỉ có quyền xem có gạt được công tắc Active (vốn có hiệu lực ngay) không?",
  "check_ids": [
    "billing-discount-codes:CHK-028"
  ]
}
```

## OQ-plans-billing-094 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-plans-billing-094",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "capacity-limit-enforcement",
  "summary": "Tài liệu support playbook nói vượt capacity \"thường\" là gốc khiến cả shop sai nhiều thứ cùng lúc; cần xác nhận cụ thể những hành vi nào bị ảnh hưởng khi shop vượt capacity (box không hiện, đơn không xử lý, dữ liệu cũ).",
  "kb_ids": [
    "capacity-limit-enforcement#KB-028"
  ]
}
```

## OQ-plans-billing-095 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-plans-billing-095",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "capacity-limit-enforcement",
  "summary": "Các check P1 (tiền / billing / bốc thăm / refund / store credit / permission / xoá dữ liệu) của feature này có oracle STRONG nhưng chỉ dựa trên tài liệu dev (dev_doc). Theo luật oracle, chúng giữ NEEDS_CONFIRMATION cho tới khi có test_case PASS (hoặc PO/Dev xác nhận trực tiếp) cho đúng hành vi. Danh sách check ở check_ids.",
  "check_ids": [
    "capacity-limit-enforcement:CHK-001",
    "capacity-limit-enforcement:CHK-002",
    "capacity-limit-enforcement:CHK-005",
    "capacity-limit-enforcement:CHK-006",
    "capacity-limit-enforcement:CHK-007",
    "capacity-limit-enforcement:CHK-009",
    "capacity-limit-enforcement:CHK-012"
  ]
}
```

## OQ-plans-billing-096 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-plans-billing-096",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "capacity-limit-enforcement",
  "summary": "Khi shop Free chỉ còn 1 box trong hạn mức mà một đơn mua 3 box, đơn có được bán và tạo lượt mở cho cả 3 box không, used dừng ở giá trị nào, và các box có bị gỡ ngay sau đơn đó không?",
  "check_ids": [
    "capacity-limit-enforcement:CHK-003"
  ]
}
```

## OQ-plans-billing-097 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-plans-billing-097",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "capacity-limit-enforcement",
  "summary": "Khi shop Free vẫn vượt capacity, merchant (hoặc admin) bấm publish lại một box thì bị chặn với thông báo nào, hay box được publish rồi bị gỡ lại?",
  "check_ids": [
    "capacity-limit-enforcement:CHK-011"
  ]
}
```

## OQ-plans-billing-098 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-plans-billing-098",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "daily-usage-charge-and-charge-status",
  "summary": "Job tạo phí usage chạy lúc nửa đêm theo giờ server; múi giờ thật của server ở production chưa được xác nhận, nên chưa xác định được đơn paid sát nửa đêm rơi vào lần chạy nào.",
  "kb_ids": [
    "daily-usage-charge-and-charge-status#KB-020"
  ],
  "check_ids": [
    "daily-usage-charge-and-charge-status:CHK-005"
  ]
}
```

## OQ-plans-billing-099 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-plans-billing-099",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "daily-usage-charge-and-charge-status",
  "summary": "Với shop bị Shopify đóng băng: shop có thực sự không phát sinh phí usage, và nếu còn phí chưa gửi thì Shopify trả phản hồi gì (tài liệu chỉ suy đoán charge thành Failed, không retry)?",
  "kb_ids": [
    "daily-usage-charge-and-charge-status#KB-059",
    "daily-usage-charge-and-charge-status#KB-060"
  ]
}
```

## OQ-plans-billing-100 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-plans-billing-100",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "daily-usage-charge-and-charge-status",
  "summary": "Các dòng phí usage chưa gửi tạo trong thời gian ân hạn sau khi huỷ plan có được job tính phí nhặt khi merchant đăng ký lại không? Tài liệu chỉ có suy luận.",
  "kb_ids": [
    "daily-usage-charge-and-charge-status#KB-068"
  ]
}
```

## OQ-plans-billing-101 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-plans-billing-101",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "daily-usage-charge-and-charge-status",
  "summary": "Tài liệu nói usage bị tính trùng từ phía Mysbox \"gần như không xảy ra\" — cần xác nhận có trường hợp nào (vd chạy tay lệnh tạo phí song song với job) gây tính trùng không.",
  "kb_ids": [
    "daily-usage-charge-and-charge-status#KB-079"
  ]
}
```

## OQ-plans-billing-102 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-plans-billing-102",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "daily-usage-charge-and-charge-status",
  "summary": "Các check P1 (tiền / billing / bốc thăm / refund / store credit / permission / xoá dữ liệu) của feature này có oracle STRONG nhưng chỉ dựa trên tài liệu dev (dev_doc). Theo luật oracle, chúng giữ NEEDS_CONFIRMATION cho tới khi có test_case PASS (hoặc PO/Dev xác nhận trực tiếp) cho đúng hành vi. Danh sách check ở check_ids.",
  "check_ids": [
    "daily-usage-charge-and-charge-status:CHK-001",
    "daily-usage-charge-and-charge-status:CHK-002",
    "daily-usage-charge-and-charge-status:CHK-003",
    "daily-usage-charge-and-charge-status:CHK-004",
    "daily-usage-charge-and-charge-status:CHK-006",
    "daily-usage-charge-and-charge-status:CHK-007",
    "daily-usage-charge-and-charge-status:CHK-008",
    "daily-usage-charge-and-charge-status:CHK-009",
    "daily-usage-charge-and-charge-status:CHK-010"
  ]
}
```

## OQ-plans-billing-103 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-plans-billing-103",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "plan-capacity-and-cycle",
  "summary": "Số box miễn phí mỗi chu kỳ thật của plan Free trên production (bộ tài liệu chỉ ghi 10 là giá trị seed, hạn mức thật lấy từ gói mặc định trong DB) và quota thật của các plan trả phí là bao nhiêu? Các con số 10/100 trong tài liệu không dùng làm oracle.",
  "kb_ids": [
    "plan-capacity-and-cycle#KB-003",
    "plan-capacity-and-cycle#KB-008",
    "plan-capacity-and-cycle#KB-046",
    "plan-capacity-and-cycle#KB-047",
    "plan-capacity-and-cycle#KB-064"
  ]
}
```

## OQ-plans-billing-104 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-plans-billing-104",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "plan-capacity-and-cycle",
  "summary": "Cần xác nhận các phát biểu có rào đón về bộ đếm quota: Used/Box Capacity Used có thể vượt nhẹ quota đúng bằng đơn gây vượt; \"tháng\" quota thường lệch ngày hoá đơn Shopify; sau khi gỡ và cài lại, số đếm có thể đang ở giữa chu kỳ với giá trị cũ.",
  "kb_ids": [
    "plan-capacity-and-cycle#KB-025",
    "plan-capacity-and-cycle#KB-051",
    "plan-capacity-and-cycle#KB-059"
  ]
}
```

## OQ-plans-billing-105 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-plans-billing-105",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "plan-capacity-and-cycle",
  "summary": "Các check P1 (tiền / billing / bốc thăm / refund / store credit / permission / xoá dữ liệu) của feature này có oracle STRONG nhưng chỉ dựa trên tài liệu dev (dev_doc). Theo luật oracle, chúng giữ NEEDS_CONFIRMATION cho tới khi có test_case PASS (hoặc PO/Dev xác nhận trực tiếp) cho đúng hành vi. Danh sách check ở check_ids.",
  "check_ids": [
    "plan-capacity-and-cycle:CHK-001",
    "plan-capacity-and-cycle:CHK-002",
    "plan-capacity-and-cycle:CHK-003",
    "plan-capacity-and-cycle:CHK-004",
    "plan-capacity-and-cycle:CHK-005",
    "plan-capacity-and-cycle:CHK-006",
    "plan-capacity-and-cycle:CHK-007",
    "plan-capacity-and-cycle:CHK-013",
    "plan-capacity-and-cycle:CHK-014",
    "plan-capacity-and-cycle:CHK-015",
    "plan-capacity-and-cycle:CHK-016",
    "plan-capacity-and-cycle:CHK-019",
    "plan-capacity-and-cycle:CHK-020",
    "plan-capacity-and-cycle:CHK-023"
  ]
}
```

## OQ-plans-billing-106 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-plans-billing-106",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "plan-catalog-administration",
  "summary": "Giá thật của các gói (vd \"Growth\") nằm trong DB và chưa được xác nhận; số $29/tháng trong tài liệu chỉ là giả định minh hoạ. Cần catalog plan thật trên production.",
  "kb_ids": [
    "plan-catalog-administration#KB-002",
    "plan-catalog-administration#KB-003"
  ]
}
```

## OQ-plans-billing-107 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-plans-billing-107",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "plan-catalog-administration",
  "summary": "Các check P1 (tiền / billing / bốc thăm / refund / store credit / permission / xoá dữ liệu) của feature này có oracle STRONG nhưng chỉ dựa trên tài liệu dev (dev_doc). Theo luật oracle, chúng giữ NEEDS_CONFIRMATION cho tới khi có test_case PASS (hoặc PO/Dev xác nhận trực tiếp) cho đúng hành vi. Danh sách check ở check_ids.",
  "check_ids": [
    "plan-catalog-administration:CHK-002",
    "plan-catalog-administration:CHK-007",
    "plan-catalog-administration:CHK-008",
    "plan-catalog-administration:CHK-009",
    "plan-catalog-administration:CHK-014"
  ]
}
```

## OQ-plans-billing-108 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-plans-billing-108",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "plan-catalog-administration",
  "summary": "Plan Paid không có ngưỡng lẫn phí mỗi box (hoặc phí bằng 0) được tài liệu coi là cấu hình sai; form admin có chặn lưu cấu hình này không, và thông báo là gì?",
  "check_ids": [
    "plan-catalog-administration:CHK-005"
  ]
}
```

## OQ-plans-billing-109 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-plans-billing-109",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "plan-catalog-administration",
  "summary": "Phải có đúng một plan bật On install; admin panel có chặn lưu khi kết quả là 0 hoặc từ 2 plan bật On install không, và nếu không chặn thì hệ thống chọn plan mặc định thế nào?",
  "check_ids": [
    "plan-catalog-administration:CHK-010"
  ]
}
```

## OQ-plans-billing-110 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-plans-billing-110",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "plan-catalog-administration",
  "summary": "Giới hạn hợp lệ của price, trial days, Box Selling Capacity, % phí và phí tối thiểu trong form plan là gì, và form có chặn giá trị ngoài giới hạn không?",
  "check_ids": [
    "plan-catalog-administration:CHK-015"
  ]
}
```

## OQ-plans-billing-111 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-plans-billing-111",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "plan-upgrade-downgrade-cancel",
  "summary": "Việc làm mới dữ liệu storefront đúng lúc hết hạn sau khi huỷ plan chỉ có trên nhánh build-staging, chưa lên production. Cần dev/PO xác nhận khi nào hành vi này lên production, và trên production hiện tại storefront đổi plan hiển thị vào lúc nào sau khi huỷ.",
  "kb_ids": [
    "plan-upgrade-downgrade-cancel#KB-087"
  ]
}
```

## OQ-plans-billing-112 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-plans-billing-112",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "plan-upgrade-downgrade-cancel",
  "summary": "Badge trial \"7 - days free trial\" trên thẻ plan là chữ cố định hay lấy theo số ngày trial của plan? Plan không có trial thì có hiện badge không?",
  "check_ids": [
    "plan-upgrade-downgrade-cancel:CHK-003"
  ]
}
```

## OQ-plans-billing-113 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-plans-billing-113",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "plan-upgrade-downgrade-cancel",
  "summary": "Các check P1 (tiền / billing / bốc thăm / refund / store credit / permission / xoá dữ liệu) của feature này có oracle STRONG nhưng chỉ dựa trên tài liệu dev (dev_doc). Theo luật oracle, chúng giữ NEEDS_CONFIRMATION cho tới khi có test_case PASS (hoặc PO/Dev xác nhận trực tiếp) cho đúng hành vi. Danh sách check ở check_ids.",
  "check_ids": [
    "plan-upgrade-downgrade-cancel:CHK-009",
    "plan-upgrade-downgrade-cancel:CHK-010",
    "plan-upgrade-downgrade-cancel:CHK-011",
    "plan-upgrade-downgrade-cancel:CHK-014",
    "plan-upgrade-downgrade-cancel:CHK-015",
    "plan-upgrade-downgrade-cancel:CHK-016",
    "plan-upgrade-downgrade-cancel:CHK-019",
    "plan-upgrade-downgrade-cancel:CHK-020",
    "plan-upgrade-downgrade-cancel:CHK-022",
    "plan-upgrade-downgrade-cancel:CHK-023",
    "plan-upgrade-downgrade-cancel:CHK-031",
    "plan-upgrade-downgrade-cancel:CHK-032",
    "plan-upgrade-downgrade-cancel:CHK-033",
    "plan-upgrade-downgrade-cancel:CHK-035",
    "plan-upgrade-downgrade-cancel:CHK-036"
  ]
}
```

## OQ-plans-billing-114 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-plans-billing-114",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "plan-upgrade-downgrade-cancel",
  "summary": "Khi merchant từ chối hoặc đóng trang duyệt subscription của Shopify, plan của shop có giữ nguyên không, có dòng charge nào bị đổi dở dang không, và dòng Recurring hiển thị trạng thái gì?",
  "check_ids": [
    "plan-upgrade-downgrade-cancel:CHK-012"
  ]
}
```

## OQ-plans-billing-115 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-plans-billing-115",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "plan-upgrade-downgrade-cancel",
  "summary": "Link có chữ ký quay về Mysbox có hiệu lực 7 ngày; khi mở sau 7 ngày hoặc mở lại lần hai thì hệ thống phản hồi thế nào (thông báo gì) và có tạo thêm charge không?",
  "check_ids": [
    "plan-upgrade-downgrade-cancel:CHK-013"
  ]
}
```

## OQ-plans-billing-116 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-plans-billing-116",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "plan-upgrade-downgrade-cancel",
  "summary": "Hành vi làm mới dữ liệu storefront đúng lúc hết hạn sau huỷ hiện chỉ có trên build-staging: trên staging đó có phải hành vi mong muốn không, khi nào lên production, và trên production hiện tại storefront đổi hiển thị plan vào lúc nào?",
  "check_ids": [
    "plan-upgrade-downgrade-cancel:CHK-026"
  ]
}
```

## OQ-plans-billing-117 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-plans-billing-117",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "plan-upgrade-downgrade-cancel",
  "summary": "Route, method, tham số request, kiểu dữ liệu và status/lỗi của endpoint xem trước thay đổi plan là gì? Thiếu thông tin này check không chạy lại được.",
  "kb_ids": [
    "plan-upgrade-downgrade-cancel#KB-095",
    "plan-upgrade-downgrade-cancel#KB-096",
    "plan-upgrade-downgrade-cancel#KB-097",
    "plan-upgrade-downgrade-cancel#KB-098"
  ],
  "check_ids": [
    "plan-upgrade-downgrade-cancel:CHK-027"
  ]
}
```

## OQ-plans-billing-118 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-plans-billing-118",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "plan-upgrade-downgrade-cancel",
  "summary": "Khi hạ plan hoặc huỷ trong lúc đang trial, khoản tính lại phí và khoản usage cuối có được gửi lên Shopify không, và charge kết thúc ra sao?",
  "check_ids": [
    "plan-upgrade-downgrade-cancel:CHK-028"
  ]
}
```

## OQ-plans-billing-119 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-plans-billing-119",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "promote-codes",
  "summary": "Tài liệu không tìm thấy màn hình nào trong portal để merchant tự nhập promote code và tự ghi chú chưa xác nhận rằng việc đổi mã do support làm hoặc qua giao diện ngoài các repo đã đọc. Cần dev/PO xác nhận kênh/UI thực tế dùng để đổi promote code (quyết định surface và role cho test end-to-end).",
  "kb_ids": [
    "promote-codes#KB-075",
    "promote-codes#KB-076"
  ]
}
```

## OQ-plans-billing-120 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-plans-billing-120",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "promote-codes",
  "summary": "Các check P1 (tiền / billing / bốc thăm / refund / store credit / permission / xoá dữ liệu) của feature này có oracle STRONG nhưng chỉ dựa trên tài liệu dev (dev_doc). Theo luật oracle, chúng giữ NEEDS_CONFIRMATION cho tới khi có test_case PASS (hoặc PO/Dev xác nhận trực tiếp) cho đúng hành vi. Danh sách check ở check_ids.",
  "check_ids": [
    "promote-codes:CHK-007",
    "promote-codes:CHK-009",
    "promote-codes:CHK-010",
    "promote-codes:CHK-011",
    "promote-codes:CHK-012",
    "promote-codes:CHK-013",
    "promote-codes:CHK-014",
    "promote-codes:CHK-015",
    "promote-codes:CHK-016",
    "promote-codes:CHK-017",
    "promote-codes:CHK-018",
    "promote-codes:CHK-021",
    "promote-codes:CHK-022",
    "promote-codes:CHK-023",
    "promote-codes:CHK-024",
    "promote-codes:CHK-027"
  ]
}
```

## OQ-plans-billing-121 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-plans-billing-121",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "promote-codes",
  "summary": "Route, method, payload và mã HTTP của lời gọi tra cứu và đổi promote code là gì (\"forbidden\" là status 403 hay một field trong body)? Thiếu thông tin này check không chạy lại được.",
  "kb_ids": [
    "promote-codes#KB-039",
    "promote-codes#KB-040"
  ],
  "check_ids": [
    "promote-codes:CHK-008"
  ]
}
```

## OQ-plans-billing-122 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-plans-billing-122",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "promote-codes",
  "summary": "Cần test case PASS xác nhận khi mã vi phạm nhiều điều kiện, thông điệp trả về là của bước kiểm tra sớm nhất trong thứ tự 7 bước cố định?",
  "kb_ids": [
    "promote-codes#KB-041",
    "promote-codes#KB-042",
    "promote-codes#KB-043"
  ],
  "check_ids": [
    "promote-codes:CHK-019"
  ]
}
```

## OQ-plans-billing-123 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-plans-billing-123",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "promote-codes",
  "summary": "Redemption ở trạng thái Pending có được tính là shop đã đổi mã đó (bị từ chối \"already redeemed\") hoặc là đang có mã Active khác (bị từ chối \"already has an active promote code\") không?",
  "check_ids": [
    "promote-codes:CHK-020"
  ]
}
```

## OQ-plans-billing-124 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-plans-billing-124",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "promote-codes",
  "summary": "Merchant đổi promote code qua kênh nào: tự nhập trong portal, hay support đổi giúp qua một giao diện khác? Ai là người thực hiện đổi mã và thông điệp từ chối hiển thị cho merchant ở đâu?",
  "check_ids": [
    "promote-codes:CHK-026"
  ]
}
```

## OQ-plans-billing-125 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-plans-billing-125",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "promote-codes",
  "summary": "Quyền trên màn Promote codes được tách riêng xem / xem chi tiết / tạo / sửa / xoá hay là một quyền cho cả nhóm, và tài khoản thiếu quyền thấy gì khi mở màn này?",
  "check_ids": [
    "promote-codes:CHK-028"
  ]
}
```

## OQ-plans-billing-126 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-plans-billing-126",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "promote-codes",
  "summary": "Khi admin sửa số box tặng hoặc số chu kỳ của một promote code đã có lượt đổi đang Active, thay đổi có áp lại cho các lượt đổi hiện có không?",
  "check_ids": [
    "promote-codes:CHK-029"
  ]
}
```

## OQ-plans-billing-127 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-plans-billing-127",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "usage-fee-pricing",
  "summary": "Phí mỗi box vượt ở production (count-based) là bao nhiêu? Tài liệu chỉ dùng $0.25/box làm giá trị giả định/minh hoạ và tự khai chưa xác nhận; không dùng làm oracle cho đến khi có bảng plan production.",
  "kb_ids": [
    "usage-fee-pricing#KB-040",
    "usage-fee-pricing#KB-042",
    "usage-fee-pricing#KB-044"
  ]
}
```

## OQ-plans-billing-128 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-plans-billing-128",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "usage-fee-pricing",
  "summary": "Xác nhận một đơn nhiều variant box có thể vừa có box miễn phí vừa có box bị tính phí (tài liệu diễn đạt dè dặt) và thứ tự trừ quota giữa các dòng (theo thứ tự line item, giá hay thời điểm).",
  "kb_ids": [
    "usage-fee-pricing#KB-016"
  ]
}
```

## OQ-plans-billing-129 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-plans-billing-129",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "usage-fee-pricing",
  "summary": "Các check P1 (tiền / billing / bốc thăm / refund / store credit / permission / xoá dữ liệu) của feature này có oracle STRONG nhưng chỉ dựa trên tài liệu dev (dev_doc). Theo luật oracle, chúng giữ NEEDS_CONFIRMATION cho tới khi có test_case PASS (hoặc PO/Dev xác nhận trực tiếp) cho đúng hành vi. Danh sách check ở check_ids.",
  "check_ids": [
    "usage-fee-pricing:CHK-001",
    "usage-fee-pricing:CHK-002",
    "usage-fee-pricing:CHK-003",
    "usage-fee-pricing:CHK-004",
    "usage-fee-pricing:CHK-005",
    "usage-fee-pricing:CHK-006",
    "usage-fee-pricing:CHK-007",
    "usage-fee-pricing:CHK-008",
    "usage-fee-pricing:CHK-009",
    "usage-fee-pricing:CHK-011",
    "usage-fee-pricing:CHK-012",
    "usage-fee-pricing:CHK-013"
  ]
}
```

## OQ-plans-billing-130 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-plans-billing-130",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "usage-fee-pricing",
  "summary": "Shop dùng tiền tệ khác USD thì doanh thu dòng hàng được quy đổi sang USD theo tỉ giá nào, lấy lúc nào; và phí value-tiered (giá trị × phần trăm / 100) được làm tròn thế nào (tới cent, nửa cent, lên hay xuống)?",
  "check_ids": [
    "usage-fee-pricing:CHK-014"
  ]
}
```

## OQ-plans-billing-131 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-plans-billing-131",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "usage-fee-pricing",
  "summary": "Khi một plan có cả phí mỗi box và bộ tham số value-tiered, hệ thống chọn cách tính nào và dựa trên trường hay cờ nào của plan?",
  "check_ids": [
    "usage-fee-pricing:CHK-015"
  ]
}
```
