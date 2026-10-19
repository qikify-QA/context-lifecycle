# Open Questions — resell-refund-credit

Tổng: 95 mục (CONFLICT 4 · OPEN_ISSUE 57 · NEEDS_CONFIRMATION 34). Sinh từ bootstrap DOC_BOOTSTRAP đầu tiên của Mysbox (nguồn: bộ Product KB v1 do dev viết từ source code, 2026-10-16). Mỗi mục là một khối json; `kb_ids` dạng `<feature_key>#KB-xxx` (hoặc `_object-level#KB-xxx` cho tầng object), `check_ids` dạng `<feature_key>:CHK-xxx`.

## OQ-resell-refund-credit-001 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-resell-refund-credit-001",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": null,
  "summary": "Bộ tài liệu nguồn không chỉ định role mặc định cho object này (bootstrap-request để role null): các KB item mang scope.role theo vai trò tài liệu nêu cho từng hành vi, hoặc \"unspecified\" khi tài liệu không nêu. Cần PO/Dev xác nhận ma trận role → quyền thực tế trên production (merchant owner/staff, khách, admin Mysbox theo từng role) trước khi dùng các check PERMISSION làm oracle."
}
```

## OQ-resell-refund-credit-002 — CONFLICT

```json
{
  "oq_id": "OQ-resell-refund-credit-002",
  "type": "CONFLICT",
  "feature_id": "refund-amount-calculation",
  "summary": "Trong cùng tài liệu về cách tính số tiền hoàn, ví dụ 5 (tiếp nối đơn thanh toán hỗn hợp của ví dụ 4: box niêm yết 100 USD, Value 90) dùng X = 50, trong khi ví dụ 4 tính X = 90 cho cùng đơn theo công thức chế độ BOX. Cần dev xác nhận ví dụ 5 cố ý dùng X = 50 làm giả định minh hoạ hay là lỗi số. Công thức tổng quát không bị ảnh hưởng.",
  "side_a": "Tài liệu \"Cách tính số tiền hoàn — công thức và ví dụ\" §Ví dụ 4 — Thanh toán hỗn hợp thẻ + store credit: Value 90, X = 90.",
  "side_b": "Tài liệu \"Cách tính số tiền hoàn — công thức và ví dụ\" §Ví dụ 5 — Đã có hoàn tiền trước đó: cùng đơn, đơn còn giữ 40, khách bán box với X = 50.",
  "conflict_group": "CONF-resell-refund-credit-01",
  "kb_ids": [
    "refund-amount-calculation#KB-058",
    "refund-amount-calculation#KB-062"
  ]
}
```

## OQ-resell-refund-credit-003 — CONFLICT

```json
{
  "oq_id": "OQ-resell-refund-credit-003",
  "type": "CONFLICT",
  "feature_id": "resell-setup-and-eligibility",
  "summary": "Mở box là điều kiện tiên quyết để resell hay là điểm kết thúc resell. Tài liệu resell chế độ BOX và Playbook 2 đều tự mâu thuẫn trong cùng tài liệu: một phía nói box phải đã mở mới resell được, và box đã qua giờ auto-unbox được coi như đã mở; phía kia nói đơn chuyển COMPLETED (merchant mở hộ, auto-unbox, Flow) hoặc mở box (tay hay tự động) thì cửa sổ resell đóng ngay. Cần dev/PO xác nhận \"mở\" ở mỗi câu là hành động nào (khách reveal, merchant mở hộ, job auto-unbox chuyển COMPLETED), box đã qua giờ auto-unbox nhưng job chưa chạy có resell được không, và sau khi auto-unbox chạy thì resell còn hay mất.",
  "side_a": "Tài liệu \"Resell — cấu hình và chế độ BOX\" §Bước 2 — Điều kiện để khách resell được, \"Playbook 2: resell, số tiền hoàn, pool refill, store credit\" §Nút resell mất / \"nothing to resell\" và §Khách báo lỗi khi resell, \"Resell, hoàn tiền và store credit — tổng quan\" §Nhóm này làm gì, ai dùng: box phải đã mở (hoặc đã qua giờ auto-unbox, coi như đã mở) thì khách mới resell được; box chưa mở báo \"Cannot resell a box that has not been opened.\"",
  "side_b": "Cùng tài liệu \"Resell — cấu hình và chế độ BOX\" §Bước 2 và \"Playbook 2\" §Nút resell mất, cùng \"Overview\" §Key vocabulary: đơn chuyển COMPLETED (merchant mở hộ, auto-unbox, Flow) thì cửa sổ resell đóng ngay / bị xoá; mở box (tay hay tự động) kết thúc resell.",
  "conflict_group": "CONF-resell-refund-credit-02",
  "kb_ids": [
    "resell-setup-and-eligibility#KB-063",
    "resell-setup-and-eligibility#KB-064",
    "resell-setup-and-eligibility#KB-065",
    "resell-setup-and-eligibility#KB-066",
    "resell-setup-and-eligibility#KB-067"
  ],
  "check_ids": [
    "resell-setup-and-eligibility:CHK-022",
    "resell-setup-and-eligibility:CHK-023"
  ]
}
```

## OQ-resell-refund-credit-004 — CONFLICT

```json
{
  "oq_id": "OQ-resell-refund-credit-004",
  "type": "CONFLICT",
  "feature_id": "resell-setup-and-eligibility",
  "summary": "Merchant bấm \"Open all boxes\" có chấm dứt resell của đơn hay không. Tài liệu hành trình reveal nói chỉ Shopify Flow hoặc auto-unbox mới chấm dứt resell và sau \"Open all boxes\" khách vẫn resell được nếu window chưa hết; Playbook 1 nói \"Open all boxes\" chấm dứt resell của đơn (tài liệu Overview và tài liệu resell chế độ BOX cũng coi unbox do merchant / merchant mở hộ là kết thúc resell — xem nhóm mâu thuẫn về mở box). Cần dev/PO xác nhận hành vi thật của \"Open all boxes\" với cửa sổ resell.",
  "side_a": "Tài liệu \"Hành trình reveal (mở box)\" §Các cách mở box và §Câu hỏi thường gặp: chỉ Flow hoặc auto-unbox chấm dứt cơ hội resell; sau \"Open all boxes\" khách vẫn resell được nếu resell window chưa hết vì cách mở này vẫn chờ window.",
  "side_b": "Tài liệu \"Playbook 1: đơn hàng, bốc thăm và mở box\" §Khách mở hết rồi mà quà không có trong đơn Shopify: merchant bấm \"Open all boxes\" chấm dứt resell của đơn.",
  "conflict_group": "CONF-resell-refund-credit-03",
  "kb_ids": [
    "resell-setup-and-eligibility#KB-068",
    "resell-setup-and-eligibility#KB-069",
    "resell-setup-and-eligibility#KB-070"
  ],
  "check_ids": [
    "resell-setup-and-eligibility:CHK-024"
  ]
}
```

## OQ-resell-refund-credit-005 — CONFLICT

```json
{
  "oq_id": "OQ-resell-refund-credit-005",
  "type": "CONFLICT",
  "feature_id": "resell-setup-and-eligibility",
  "summary": "Mốc bắt đầu cửa sổ resell mâu thuẫn ngay trong cùng tài liệu: nhãn UI nói tính từ lúc đơn được tạo, phần mô tả nói tính từ lúc đơn paid. Cần xác nhận mốc thực tế (nếu đơn chỉ được tạo trong app khi nhận webhook paid thì hai mốc trùng nhau). Phía mô tả 'tính từ lúc đơn paid' thuộc shard feature thiết lập resell. Các tài liệu resell khác nói cửa sổ tính từ lúc draw (random quà), mà draw xảy ra khi app nhận webhook đơn paid; cần dev xác nhận mốc bắt đầu thực tế (lúc tạo đơn, lúc paid hay lúc draw) và các mốc này có trùng nhau không.",
  "side_a": "Tài liệu \"General Settings\" §Bảng setting: nhãn \"Duration for customers to resell from order is created\" (hours).",
  "side_b": "Tài liệu \"General Settings\" §Bảng setting: Buyback limit time là độ dài cửa sổ resell, tính từ lúc đơn paid.",
  "conflict_group": "CONF-merchant-app-01",
  "kb_ids": [
    "resell-setup-and-eligibility#KB-008"
  ],
  "check_ids": [
    "resell-setup-and-eligibility:CHK-021"
  ]
}
```

## OQ-resell-refund-credit-006 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-resell-refund-credit-006",
  "type": "OPEN_ISSUE",
  "feature_id": null,
  "summary": "Hạn chế đã biết: resell có thể bị kẹt (đơn có `resell processing at` cũ hơn 1 ngày). Cần biết cơ chế gỡ cờ, đơn có bị chặn retry không, và đây là lỗi cần sửa hay hành vi chấp nhận.",
  "kb_ids": [
    "_object-level#KB-013"
  ]
}
```

## OQ-resell-refund-credit-007 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-resell-refund-credit-007",
  "type": "OPEN_ISSUE",
  "feature_id": "buy-box-with-store-credit",
  "summary": "Hạn chế đã biết: tạo automatic discount (khi lưu cấu hình Koin) không báo lỗi nếu thất bại, dẫn tới khách dùng ticket vẫn bị tính tiền.",
  "kb_ids": [
    "buy-box-with-store-credit#KB-027"
  ],
  "check_ids": [
    "buy-box-with-store-credit:CHK-027"
  ]
}
```

## OQ-resell-refund-credit-008 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-resell-refund-credit-008",
  "type": "OPEN_ISSUE",
  "feature_id": "buy-box-with-store-credit",
  "summary": "Hạn chế nghi ngờ (chưa xác nhận): đơn kết hợp dòng dùng ticket với dòng dùng mã giảm giá thường có thể bị trừ ticket nhầm cho cả hai dòng.",
  "kb_ids": [
    "buy-box-with-store-credit#KB-066"
  ],
  "check_ids": [
    "buy-box-with-store-credit:CHK-028"
  ]
}
```

## OQ-resell-refund-credit-009 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-resell-refund-credit-009",
  "type": "OPEN_ISSUE",
  "feature_id": "buy-box-with-store-credit",
  "summary": "Hạn chế đã biết: theme hiển thị số dư store credit lấy lúc tải trang, khách phải reload mới thấy số dư mới.",
  "kb_ids": [
    "buy-box-with-store-credit#KB-067"
  ],
  "check_ids": [
    "buy-box-with-store-credit:CHK-029"
  ]
}
```

## OQ-resell-refund-credit-010 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-resell-refund-credit-010",
  "type": "OPEN_ISSUE",
  "feature_id": "buy-box-with-store-credit",
  "summary": "Hạn chế đã biết: Koin đã bị trừ nhưng ghi vé thất bại và không có cơ chế bù trừ; cần biết hướng xử lý cho khách.",
  "kb_ids": [
    "buy-box-with-store-credit#KB-068"
  ],
  "check_ids": [
    "buy-box-with-store-credit:CHK-030"
  ]
}
```

## OQ-resell-refund-credit-011 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-resell-refund-credit-011",
  "type": "OPEN_ISSUE",
  "feature_id": "buy-box-with-store-credit",
  "summary": "Block \"Buy box by store credit\" chặn Add to cart / Buy now trong điều kiện nào (luôn luôn, chỉ khi tích \"Pay with store credit\", hay khi số dư không đủ)? — Expected result cho luồng mua thường vs mua bằng store credit.",
  "kb_ids": [
    "buy-box-with-store-credit#KB-015"
  ]
}
```

## OQ-resell-refund-credit-012 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-resell-refund-credit-012",
  "type": "OPEN_ISSUE",
  "feature_id": "buy-box-with-store-credit",
  "summary": "Giá báo theo quốc gia được quy đổi sang đơn vị Koin thế nào (tỉ lệ đổi, tiền tệ)? — Kiểm số Koin bị trừ cho khách ngoài thị trường chính.",
  "kb_ids": [
    "buy-box-with-store-credit#KB-035",
    "buy-box-with-store-credit#KB-043"
  ]
}
```

## OQ-resell-refund-credit-013 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-resell-refund-credit-013",
  "type": "OPEN_ISSUE",
  "feature_id": "buy-box-with-store-credit",
  "summary": "Số ticket được cộng có luôn bằng số lượng chọn không? — Quy tắc cộng ticket chỉ thể hiện qua ví dụ.",
  "kb_ids": [
    "buy-box-with-store-credit#KB-045",
    "buy-box-with-store-credit#KB-062"
  ]
}
```

## OQ-resell-refund-credit-014 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-resell-refund-credit-014",
  "type": "OPEN_ISSUE",
  "feature_id": "buy-box-with-store-credit",
  "summary": "Nguyên nhân nào trả lỗi Koin nguyên văn, nguyên nhân nào trả \"Failed to debit store credit\", và mã HTTP của từng trường hợp (ngoài 400 cho box không phải box store credit)? — Expected message/mã lỗi của case lỗi trừ credit.",
  "kb_ids": [
    "buy-box-with-store-credit#KB-039",
    "buy-box-with-store-credit#KB-041",
    "buy-box-with-store-credit#KB-048"
  ]
}
```

## OQ-resell-refund-credit-015 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-resell-refund-credit-015",
  "type": "OPEN_ISSUE",
  "feature_id": "buy-box-with-store-credit",
  "summary": "Hành vi/thông báo khi vượt 20 lần mua mỗi phút, hoặc số lượng ngoài khoảng 1–50? — Boundary test cho rate limit và số lượng.",
  "kb_ids": [
    "buy-box-with-store-credit#KB-036",
    "buy-box-with-store-credit#KB-049"
  ]
}
```

## OQ-resell-refund-credit-016 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-resell-refund-credit-016",
  "type": "OPEN_ISSUE",
  "feature_id": "buy-box-with-store-credit",
  "summary": "Ticket có hết hạn không; ticket còn lại xử lý thế nào khi box bị unpublish/xoá hoặc khi merchant đổi/bỏ Koin? — Vòng đời ticket ngoài luồng mua chuẩn.",
  "kb_ids": [
    "buy-box-with-store-credit#KB-057",
    "buy-box-with-store-credit#KB-058"
  ]
}
```

## OQ-resell-refund-credit-017 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-resell-refund-credit-017",
  "type": "OPEN_ISSUE",
  "feature_id": "buy-box-with-store-credit",
  "summary": "\"Only allow store credit purchases\" dọn giỏ vào thời điểm nào và khách có thấy thông báo gì không? — Expected result của case giỏ hỗn hợp khi bật tuỳ chọn này.",
  "kb_ids": [
    "buy-box-with-store-credit#KB-014"
  ]
}
```

## OQ-resell-refund-credit-018 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-resell-refund-credit-018",
  "type": "OPEN_ISSUE",
  "feature_id": "buy-box-with-store-credit",
  "summary": "Koin private API Key có được kiểm tra hợp lệ khi lưu không, lưu key sai thì thông báo gì; bỏ chọn Koin thì automatic discount đã tạo có bị gỡ không; mặc định phía server của \"Store credit app\" khi chưa lưu là gì? — Case cấu hình lỗi và trường hợp ngược của side effect tạo discount.",
  "kb_ids": [
    "buy-box-with-store-credit#KB-016",
    "buy-box-with-store-credit#KB-026"
  ]
}
```

## OQ-resell-refund-credit-019 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-resell-refund-credit-019",
  "type": "OPEN_ISSUE",
  "feature_id": "buy-box-with-store-credit",
  "summary": "`mysbox.customer_variants` và `customer_variants` có phải cùng một metafield khách không? — Kiểm dữ liệu ticket cần đúng tên metafield.",
  "kb_ids": [
    "buy-box-with-store-credit#KB-008",
    "buy-box-with-store-credit#KB-009"
  ]
}
```

## OQ-resell-refund-credit-020 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-resell-refund-credit-020",
  "type": "OPEN_ISSUE",
  "feature_id": "buy-box-with-store-credit",
  "summary": "Route/endpoint và method mà widget gọi app khi mua bằng store credit (request/response, mã lỗi)? — Không có route thì không viết được case mức API cho báo giá/trừ Koin/cộng ticket.",
  "kb_ids": [
    "buy-box-with-store-credit#KB-034"
  ]
}
```

## OQ-resell-refund-credit-021 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-resell-refund-credit-021",
  "type": "OPEN_ISSUE",
  "feature_id": "buy-box-with-store-credit",
  "summary": "\"Shop chạm trần hạn mức\" cụ thể là trần nào và nút Koin hiển thị/hành xử ra sao khi chạm? — Điều kiện tiên quyết của nút Koin trỏ sang feature hạn mức mà không nêu hệ quả.",
  "kb_ids": [
    "buy-box-with-store-credit#KB-018"
  ]
}
```

## OQ-resell-refund-credit-022 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-resell-refund-credit-022",
  "type": "OPEN_ISSUE",
  "feature_id": "order-cancellation-and-refund-sync",
  "summary": "Hạn chế đã biết (chưa xác nhận): khi đến lúc thêm quà vào đơn đã bị merchant huỷ trong Shopify, thao tác nhiều khả năng lỗi và đơn có thể ở trạng thái FAILED, support phải xử lý.",
  "kb_ids": [
    "order-cancellation-and-refund-sync#KB-015"
  ],
  "check_ids": [
    "order-cancellation-and-refund-sync:CHK-012"
  ]
}
```

## OQ-resell-refund-credit-023 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-resell-refund-credit-023",
  "type": "OPEN_ISSUE",
  "feature_id": "order-cancellation-and-refund-sync",
  "summary": "Hạn chế đã biết: app không đối soát refund tiền mặt merchant làm tay với store credit đã hoàn khi khách resell, nên cả hai khoản cùng tồn tại (hoàn vượt). Cần PO xác nhận đây là hành vi chấp nhận hay lỗi cần sửa.",
  "kb_ids": [
    "order-cancellation-and-refund-sync#KB-020"
  ],
  "check_ids": [
    "order-cancellation-and-refund-sync:CHK-013"
  ]
}
```

## OQ-resell-refund-credit-024 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-resell-refund-credit-024",
  "type": "OPEN_ISSUE",
  "feature_id": "order-cancellation-and-refund-sync",
  "summary": "Thông báo chặn resell nào ứng với trạng thái Shopify nào (huỷ / đóng / không refundable), và hiển thị ở đâu trên storefront (thông báo hay trạng thái nút)? — Expected message của từng case resell sau huỷ/refund; KB chỉ liệt kê 3 thông báo và 3 trạng thái, không nêu ánh xạ.",
  "kb_ids": [
    "order-cancellation-and-refund-sync#KB-005",
    "order-cancellation-and-refund-sync#KB-006",
    "order-cancellation-and-refund-sync#KB-007"
  ]
}
```

## OQ-resell-refund-credit-025 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-resell-refund-credit-025",
  "type": "OPEN_ISSUE",
  "feature_id": "order-cancellation-and-refund-sync",
  "summary": "Auto-unbox, email/magic link và việc thêm quà vào đơn có còn chạy cho đơn đã bị huỷ không? — Xác định hành vi các job nền với đơn huỷ.",
  "kb_ids": [
    "order-cancellation-and-refund-sync#KB-001",
    "order-cancellation-and-refund-sync#KB-013"
  ]
}
```

## OQ-resell-refund-credit-026 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-resell-refund-credit-026",
  "type": "OPEN_ISSUE",
  "feature_id": "order-cancellation-and-refund-sync",
  "summary": "App không lắng nghe sự kiện huỷ/refund thì biết trạng thái huỷ/đóng/không refundable của đơn bằng cách nào và vào lúc nào khi chặn resell? — Quyết định thời điểm resell bắt đầu bị chặn sau khi merchant huỷ/refund (case timing).",
  "kb_ids": [
    "order-cancellation-and-refund-sync#KB-002",
    "order-cancellation-and-refund-sync#KB-003"
  ]
}
```

## OQ-resell-refund-credit-027 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-resell-refund-credit-027",
  "type": "OPEN_ISSUE",
  "feature_id": "order-cancellation-and-refund-sync",
  "summary": "Nội dung đầy đủ của ghi chú \"Buyback Refund | ..\" mà merchant dùng để tự kiểm trước khi refund tay? — Feature refund-amount-calculation mô tả dạng ghi chú; cần xác nhận cùng một định dạng để merchant đối chiếu.",
  "kb_ids": [
    "order-cancellation-and-refund-sync#KB-021",
    "refund-amount-calculation#KB-014"
  ]
}
```

## OQ-resell-refund-credit-028 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-resell-refund-credit-028",
  "type": "OPEN_ISSUE",
  "feature_id": "order-cancellation-and-refund-sync",
  "summary": "Merchant/support gỡ box khỏi đơn đã hoàn tất như thế nào (scope của feature có nêu nhưng KB chưa có nội dung)? — Một phần user goal dự kiến của feature chưa có KB để làm oracle."
}
```

## OQ-resell-refund-credit-029 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-resell-refund-credit-029",
  "type": "OPEN_ISSUE",
  "feature_id": "order-cancellation-and-refund-sync",
  "summary": "Vai trò admin-staff có thao tác gì trong luồng huỷ/refund (scope của feature liệt kê vai trò này nhưng KB không gán)? — Thiếu actor thì checklist không phủ được quyền của admin-staff cho feature này."
}
```

## OQ-resell-refund-credit-030 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-resell-refund-credit-030",
  "type": "OPEN_ISSUE",
  "feature_id": "refund-amount-calculation",
  "summary": "Làm tròn 4 chữ số thập phân áp vào X hay từng khoản (a)/(b)/(c); phần lẻ khi chia xử lý thế nào? — Ảnh hưởng đối soát (a)+(b)+(c) = X ở đồng tiền nhiều chữ số lẻ.",
  "kb_ids": [
    "refund-amount-calculation#KB-009",
    "refund-amount-calculation#KB-025"
  ]
}
```

## OQ-resell-refund-credit-031 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-resell-refund-credit-031",
  "type": "OPEN_ISSUE",
  "feature_id": "refund-amount-calculation",
  "summary": "Nguồn tỷ giá, thời điểm lấy tỷ giá, và quy đổi có áp cho chế độ BOX (giá niêm yết dòng box) hay chỉ cho từng quà ở ITEMS? — Số tiền hoàn đơn đa tiền tệ phụ thuộc trực tiếp; cần để dựng case đa tiền tệ.",
  "kb_ids": [
    "refund-amount-calculation#KB-041",
    "refund-amount-calculation#KB-042"
  ]
}
```

## OQ-resell-refund-credit-032 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-resell-refund-credit-032",
  "type": "OPEN_ISSUE",
  "feature_id": "refund-amount-calculation",
  "summary": "Giới hạn 15.000 USD là của Shopify hay của app; khi vượt thì toàn bộ refund bị chặn hay hoàn một phần, và trạng thái resell sau lỗi là gì? — Biên P1 về tiền; cần hệ quả để viết expected result.",
  "kb_ids": [
    "refund-amount-calculation#KB-029",
    "refund-amount-calculation#KB-030"
  ]
}
```

## OQ-resell-refund-credit-033 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-resell-refund-credit-033",
  "type": "OPEN_ISSUE",
  "feature_id": "refund-amount-calculation",
  "summary": "Thứ tự hoàn trong khoản (a) khi đơn có nhiều giao dịch store credit? — KB chỉ mô tả (a) như một khoản duy nhất.",
  "kb_ids": [
    "refund-amount-calculation#KB-018"
  ]
}
```

## OQ-resell-refund-credit-034 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-resell-refund-credit-034",
  "type": "OPEN_ISSUE",
  "feature_id": "refund-amount-calculation",
  "summary": "Phương thức \"original payment\": hành vi khi thẻ đã bị hoàn một phần trước đó và khi phần chuyển thành store credit vượt số đơn còn giữ? — Chỉ có một ví dụ minh hoạ, không đủ để suy biên.",
  "kb_ids": [
    "refund-amount-calculation#KB-033",
    "refund-amount-calculation#KB-070"
  ]
}
```

## OQ-resell-refund-credit-035 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-resell-refund-credit-035",
  "type": "OPEN_ISSUE",
  "feature_id": "refund-amount-calculation",
  "summary": "Hoàn vượt số khách đã trả là thiết kế được PO chấp nhận không; merchant có cách đặt trần tổng tiền hoàn không? — Rủi ro tài chính cho merchant.",
  "kb_ids": [
    "refund-amount-calculation#KB-026",
    "refund-amount-calculation#KB-043"
  ]
}
```

## OQ-resell-refund-credit-036 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-resell-refund-credit-036",
  "type": "OPEN_ISSUE",
  "feature_id": "refund-amount-calculation",
  "summary": "Resell box đã mua bằng Koin credit có bao giờ hoàn về Koin không (KB chỉ thể hiện qua ví dụ là về store credit Shopify hoặc thẻ, Koin không trả lại)? — Quy tắc nơi nhận tiền hoàn cho box mua bằng Koin hiện chỉ có ví dụ.",
  "kb_ids": [
    "refund-amount-calculation#KB-057",
    "refund-amount-calculation#KB-074"
  ]
}
```

## OQ-resell-refund-credit-037 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-resell-refund-credit-037",
  "type": "OPEN_ISSUE",
  "feature_id": "resell-box-mode",
  "summary": "Hạn chế đã biết về resell treo: Shopify hoàn tiền trước rồi Mysbox mới lưu kết quả; nếu bước lưu thất bại hoặc worker sập thì khách đã được hoàn nhưng box chưa ở trạng thái đã bán, khoá kẹt trả 409, và nếu khách bán lại thì có thể bị hoàn hai lần; admin không có action để đánh dấu đã bán/gỡ khoá. Cần xác nhận mức độ nghiêm trọng và kế hoạch sửa.",
  "kb_ids": [
    "resell-box-mode#KB-023",
    "resell-box-mode#KB-028",
    "resell-box-mode#KB-031"
  ],
  "check_ids": [
    "resell-box-mode:CHK-018",
    "resell-box-mode:CHK-019",
    "resell-box-mode:CHK-020"
  ]
}
```

## OQ-resell-refund-credit-038 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-resell-refund-credit-038",
  "type": "OPEN_ISSUE",
  "feature_id": "resell-box-mode",
  "summary": "Khi khách bấm Resell hai lần liên tiếp, có trường hợp nào cả hai lần đều được hoàn không (tài liệu chỉ nói 'thường' chỉ một lần được hoàn)? — Rủi ro hoàn tiền trùng; cần điều kiện ngoại lệ để viết expected result.",
  "kb_ids": [
    "resell-box-mode#KB-021"
  ]
}
```

## OQ-resell-refund-credit-039 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-resell-refund-credit-039",
  "type": "OPEN_ISSUE",
  "feature_id": "resell-box-mode",
  "summary": "Popup resell ở chế độ BOX hiển thị ô chọn số lượng theo quà hay theo box? — Popup mô tả theo từng quà trong khi chế độ BOX bắt buộc bán cả box một lần.",
  "kb_ids": [
    "resell-box-mode#KB-001",
    "resell-box-mode#KB-012"
  ]
}
```

## OQ-resell-refund-credit-040 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-resell-refund-credit-040",
  "type": "OPEN_ISSUE",
  "feature_id": "resell-box-mode",
  "summary": "Số tiền chế độ BOX dựa trên giá niêm yết hay giá khách đã trả sau giảm giá; làm tròn và tiền tệ áp dụng khi giá × Value% ra số lẻ; quy đổi tiền tệ có áp cho chế độ BOX không? — Oracle số tiền hoàn chế độ BOX.",
  "kb_ids": [
    "resell-box-mode#KB-002"
  ]
}
```

## OQ-resell-refund-credit-041 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-resell-refund-credit-041",
  "type": "OPEN_ISSUE",
  "feature_id": "resell-box-mode",
  "summary": "Khoá 409 sau lần bấm trùng giữ trong bao lâu (tài liệu nêu cửa sổ 2 giây, khoá tự gỡ sau một ngày và hướng dẫn 'đợi một phút')? — Thời gian chờ để resell lại được sau 409 là boundary cần test.",
  "kb_ids": [
    "resell-box-mode#KB-017",
    "resell-box-mode#KB-026"
  ]
}
```

## OQ-resell-refund-credit-042 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-resell-refund-credit-042",
  "type": "OPEN_ISSUE",
  "feature_id": "resell-box-mode",
  "summary": "Bảng/cột lưu 'resell processing at', marker `resold` và hạn resell? — Cần để kiểm dữ liệu trước/sau resell.",
  "kb_ids": [
    "resell-box-mode#KB-024",
    "resell-box-mode#KB-032"
  ]
}
```

## OQ-resell-refund-credit-043 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-resell-refund-credit-043",
  "type": "OPEN_ISSUE",
  "feature_id": "resell-box-mode",
  "summary": "Bộ đếm box trên trang đơn hiển thị thế nào khi có box đã Resold? — Định dạng chỉ có trong ví dụ, không được suy ra."
}
```

## OQ-resell-refund-credit-044 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-resell-refund-credit-044",
  "type": "OPEN_ISSUE",
  "feature_id": "resell-items-mode",
  "summary": "Hạn chế đã biết: đơn rất cũ thiếu dữ liệu quốc gia/giá theo quốc gia nên resell chế độ ITEMS báo lỗi cho đến khi engineer chạy lệnh backfill; support không tự xử lý được. Cần xác nhận phạm vi đơn bị ảnh hưởng và kế hoạch xử lý.",
  "kb_ids": [
    "resell-items-mode#KB-019"
  ],
  "check_ids": [
    "resell-items-mode:CHK-015"
  ]
}
```

## OQ-resell-refund-credit-045 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-resell-refund-credit-045",
  "type": "OPEN_ISSUE",
  "feature_id": "resell-items-mode",
  "summary": "Nguồn tỷ giá và thời điểm lấy tỷ giá khi app tự quy đổi đồng tiền? — Ảnh hưởng trực tiếp Resale price ở đơn đa tiền tệ.",
  "kb_ids": [
    "resell-items-mode#KB-018"
  ]
}
```

## OQ-resell-refund-credit-046 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-resell-refund-credit-046",
  "type": "OPEN_ISSUE",
  "feature_id": "resell-items-mode",
  "summary": "Hành vi khi không nước nào trong thứ tự (giao hàng, thanh toán, ngôn ngữ) có giá cho quà — có rơi vào \"No price found for variant ...\" không? — Biên của thuật toán lấy giá.",
  "kb_ids": [
    "resell-items-mode#KB-014",
    "resell-items-mode#KB-016"
  ]
}
```

## OQ-resell-refund-credit-047 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-resell-refund-credit-047",
  "type": "OPEN_ISSUE",
  "feature_id": "resell-items-mode",
  "summary": "UI chọn số lượng bản sao khi quà có nhiều bản sao? — Liên quan biên \"Not enough items ...\".",
  "kb_ids": [
    "resell-items-mode#KB-002",
    "resell-items-mode#KB-015"
  ]
}
```

## OQ-resell-refund-credit-048 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-resell-refund-credit-048",
  "type": "OPEN_ISSUE",
  "feature_id": "resell-items-mode",
  "summary": "Hành vi khi cửa sổ resell hết giữa hai lần bán (đang mở popup, yêu cầu gửi sát giờ hết)? — Các phát biểu bán nhiều lần đều có điều kiện 'còn trong cửa sổ'; tester cần biên thời gian.",
  "kb_ids": [
    "resell-items-mode#KB-003"
  ]
}
```

## OQ-resell-refund-credit-049 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-resell-refund-credit-049",
  "type": "OPEN_ISSUE",
  "feature_id": "resell-items-mode",
  "summary": "Quà đã bán ở chế độ ITEMS có được trả về pool (pool refill) không? — Ảnh hưởng tồn kho/pool sau resell từng món."
}
```

## OQ-resell-refund-credit-050 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-resell-refund-credit-050",
  "type": "OPEN_ISSUE",
  "feature_id": "resell-items-mode",
  "summary": "Màn hình nơi khách bấm Resell ở chế độ ITEMS (trang đơn, màn reveal, truy cập qua magic link) và quyền truy cập tương ứng? — Xác định surface và role cho checklist; tài liệu ITEMS không nêu."
}
```

## OQ-resell-refund-credit-051 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-resell-refund-credit-051",
  "type": "OPEN_ISSUE",
  "feature_id": "resell-setup-and-eligibility",
  "summary": "Hạn chế đã biết: giới hạn theo gói (buyback chỉ cho gói trả phí) chỉ chặn ở giao diện portal; server không kiểm tra gói khi lưu cấu hình buyback và khi khách resell. Cần xác nhận mức độ và kế hoạch sửa; check theo gói không được dùng các item này làm oracle.",
  "kb_ids": [
    "resell-setup-and-eligibility#KB-042",
    "resell-setup-and-eligibility#KB-043"
  ],
  "check_ids": [
    "resell-setup-and-eligibility:CHK-030",
    "resell-setup-and-eligibility:CHK-031"
  ]
}
```

## OQ-resell-refund-credit-052 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-resell-refund-credit-052",
  "type": "OPEN_ISSUE",
  "feature_id": "resell-setup-and-eligibility",
  "summary": "Những nguyên nhân nào làm đơn chuyển Completed (ngoài merchant/auto-unbox mở hết box)? — Tài liệu chỉ nói 'thường', không khẳng định danh sách đầy đủ.",
  "kb_ids": [
    "resell-setup-and-eligibility#KB-071"
  ]
}
```

## OQ-resell-refund-credit-053 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-resell-refund-credit-053",
  "type": "OPEN_ISSUE",
  "feature_id": "resell-setup-and-eligibility",
  "summary": "\"Buyback method\" hiện chỉ chọn được buyback từng quà — trạng thái này có cố định không, và khi nào lựa chọn 'entire bundle' mở? — Phát biểu ở dạng trạng thái hiện tại, không khẳng định.",
  "kb_ids": [
    "resell-setup-and-eligibility#KB-025"
  ]
}
```

## OQ-resell-refund-credit-054 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-resell-refund-credit-054",
  "type": "OPEN_ISSUE",
  "feature_id": "resell-setup-and-eligibility",
  "summary": "Giá trị tối đa của \"Buyback limit time\", có nhận số thập phân không, và thông báo lỗi khi nhỏ hơn 1? — Boundary test của form; tài liệu chỉ nêu mặc định 24 và tối thiểu 1.",
  "kb_ids": [
    "resell-setup-and-eligibility#KB-006",
    "resell-setup-and-eligibility#KB-010"
  ]
}
```

## OQ-resell-refund-credit-055 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-resell-refund-credit-055",
  "type": "OPEN_ISSUE",
  "feature_id": "resell-setup-and-eligibility",
  "summary": "Giá trị tối đa của \"Trading price\" > \"Value\" (có cho > 100% không, có số lẻ không)? — Boundary test của Value; tài liệu chỉ nêu tối thiểu 1 và mặc định 80.",
  "kb_ids": [
    "resell-setup-and-eligibility#KB-030",
    "resell-setup-and-eligibility#KB-031"
  ]
}
```

## OQ-resell-refund-credit-056 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-resell-refund-credit-056",
  "type": "OPEN_ISSUE",
  "feature_id": "resell-setup-and-eligibility",
  "summary": "Gói nào được tính là 'gói trả phí' cho cấu hình buyback và Buyback limit time? — Permission theo gói; tài liệu chỉ loại trừ Free/Early-bird.",
  "kb_ids": [
    "resell-setup-and-eligibility#KB-011",
    "resell-setup-and-eligibility#KB-019"
  ]
}
```

## OQ-resell-refund-credit-057 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-resell-refund-credit-057",
  "type": "OPEN_ISSUE",
  "feature_id": "resell-setup-and-eligibility",
  "summary": "Thông báo lỗi cụ thể cho từng điều kiện resell không thoả (box vật lý, buyback tắt, số lượng Shopify không đủ, vượt trần 15.000 USD)? — Tester cần expected message cho từng nhánh điều kiện.",
  "kb_ids": [
    "resell-setup-and-eligibility#KB-055",
    "resell-setup-and-eligibility#KB-056"
  ]
}
```

## OQ-resell-refund-credit-058 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-resell-refund-credit-058",
  "type": "OPEN_ISSUE",
  "feature_id": "resell-setup-and-eligibility",
  "summary": "Trần 15.000 USD là của Shopify hay của app; khi vượt thì resell bị chặn toàn bộ hay hoàn một phần, và trạng thái resell sau lỗi? — Biên P1 về tiền; cần hệ quả để viết expected result.",
  "kb_ids": [
    "resell-setup-and-eligibility#KB-054"
  ]
}
```

## OQ-resell-refund-credit-059 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-resell-refund-credit-059",
  "type": "OPEN_ISSUE",
  "feature_id": "resell-setup-and-eligibility",
  "summary": "Nếu khách mở box sau khi cửa sổ resell (tính từ draw) đã hết thì có resell được không? Sau khi hết cửa sổ, quà được thêm vào đơn lúc nào (job, độ trễ)? — Mốc draw và điều kiện 'mở box' tương tác; cần mốc thời gian để kiểm bước sync.",
  "kb_ids": [
    "resell-setup-and-eligibility#KB-007"
  ]
}
```

## OQ-resell-refund-credit-060 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-resell-refund-credit-060",
  "type": "OPEN_ISSUE",
  "feature_id": "resell-setup-and-eligibility",
  "summary": "Retry Sync đưa quà vào đơn trong lúc cửa sổ resell còn mở thì khách còn bán lại được không, dòng quà có bị gỡ khi bán lại? — Tài liệu tự khai chưa xác nhận; nút Retry Sync không tự kiểm cửa sổ resell nên có rủi ro sai lệch đơn."
}
```

## OQ-resell-refund-credit-061 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-resell-refund-credit-061",
  "type": "OPEN_ISSUE",
  "feature_id": "resell-setup-and-eligibility",
  "summary": "Box bundle với \"Original item price\" có hành vi resell nào khác chế độ ITEMS thường không? — Tài liệu cấu hình chỉ nói bundle không chọn được \"Box price\".",
  "kb_ids": [
    "resell-setup-and-eligibility#KB-035"
  ]
}
```

## OQ-resell-refund-credit-062 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-resell-refund-credit-062",
  "type": "OPEN_ISSUE",
  "feature_id": "resell-setup-and-eligibility",
  "summary": "Nguyên tắc 'thay đổi chỉ áp cho đơn mới' có áp cho các cài đặt khác của General settings hay chỉ cho lịch resell/auto-unbox? — Quyết định expected result khi đổi setting với đơn đang mở.",
  "kb_ids": [
    "resell-setup-and-eligibility#KB-013"
  ]
}
```

## OQ-resell-refund-credit-063 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-resell-refund-credit-063",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": null,
  "summary": "Tài liệu chỉ nói resell \"có thể\" kẹt khi `resell processing at` cũ hơn 1 ngày; cần dev xác nhận ngưỡng 1 ngày và điều kiện xảy ra.",
  "kb_ids": [
    "_object-level#KB-013"
  ]
}
```

## OQ-resell-refund-credit-064 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-resell-refund-credit-064",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "buy-box-with-store-credit",
  "summary": "Các phát biểu chưa chắc chắn về mua box bằng store credit cần dev xác nhận: (1) ticket có bị trừ nhầm ở đơn kết hợp mã giảm giá thường không; (2) khi số dư thấp hơn giá, widget ẩn hay khoá nút và cấu hình nào quyết định.",
  "kb_ids": [
    "buy-box-with-store-credit#KB-023",
    "buy-box-with-store-credit#KB-066"
  ]
}
```

## OQ-resell-refund-credit-065 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-resell-refund-credit-065",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "buy-box-with-store-credit",
  "summary": "Các check P1 (tiền / billing / bốc thăm / refund / store credit / permission / xoá dữ liệu) của feature này có oracle STRONG nhưng chỉ dựa trên tài liệu dev (dev_doc). Theo luật oracle, chúng giữ NEEDS_CONFIRMATION cho tới khi có test_case PASS (hoặc PO/Dev xác nhận trực tiếp) cho đúng hành vi. Danh sách check ở check_ids.",
  "check_ids": [
    "buy-box-with-store-credit:CHK-001",
    "buy-box-with-store-credit:CHK-003",
    "buy-box-with-store-credit:CHK-004",
    "buy-box-with-store-credit:CHK-005",
    "buy-box-with-store-credit:CHK-006",
    "buy-box-with-store-credit:CHK-007",
    "buy-box-with-store-credit:CHK-008",
    "buy-box-with-store-credit:CHK-009",
    "buy-box-with-store-credit:CHK-010",
    "buy-box-with-store-credit:CHK-011",
    "buy-box-with-store-credit:CHK-012",
    "buy-box-with-store-credit:CHK-013",
    "buy-box-with-store-credit:CHK-014",
    "buy-box-with-store-credit:CHK-015",
    "buy-box-with-store-credit:CHK-020",
    "buy-box-with-store-credit:CHK-021",
    "buy-box-with-store-credit:CHK-024",
    "buy-box-with-store-credit:CHK-025"
  ]
}
```

## OQ-resell-refund-credit-066 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-resell-refund-credit-066",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "buy-box-with-store-credit",
  "summary": "\"Shop chạm trần hạn mức\" là trần nào của gói, và khi chạm thì nút mua bằng store credit bị ẩn, bị khoá hay bấm được mà không trừ Koin? Tài liệu chỉ nói nút \"không có tác dụng\".",
  "check_ids": [
    "buy-box-with-store-credit:CHK-018"
  ]
}
```

## OQ-resell-refund-credit-067 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-resell-refund-credit-067",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "buy-box-with-store-credit",
  "summary": "Khi số dư thấp hơn giá box, widget khoá hay ẩn nút mua bằng store credit; cấu hình nào của merchant quyết định (tên, vị trí, giá trị mặc định)? Một nguồn nói khoá hoặc ẩn tuỳ cấu hình, nguồn khác chỉ nói \"có thể ẩn\".",
  "check_ids": [
    "buy-box-with-store-credit:CHK-019"
  ]
}
```

## OQ-resell-refund-credit-068 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-resell-refund-credit-068",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "buy-box-with-store-credit",
  "summary": "Loại discount nào (automatic hay mã, cấu hình kết hợp nào) xung đột với \"Store credit discount\" và khiến box vẫn bị tính tiền? Tài liệu chỉ nêu đây là một nguyên nhân có thể.",
  "check_ids": [
    "buy-box-with-store-credit:CHK-022"
  ]
}
```

## OQ-resell-refund-credit-069 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-resell-refund-credit-069",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "buy-box-with-store-credit",
  "summary": "Giá box báo theo quốc gia của khách được quy đổi sang đơn vị Koin thế nào (tỷ lệ, tiền tệ) để tính số Koin bị trừ?",
  "check_ids": [
    "buy-box-with-store-credit:CHK-026"
  ]
}
```

## OQ-resell-refund-credit-070 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-resell-refund-credit-070",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "order-cancellation-and-refund-sync",
  "summary": "Các phát biểu tự ghi chưa xác nhận về đơn bị huỷ/refund: (1) thêm quà vào đơn đã huỷ có lỗi không và đơn có chuyển FAILED không; (2) đơn bị refund có luôn bị chặn resell hay tuỳ trạng thái Shopify (refund một phần thì sao).",
  "kb_ids": [
    "order-cancellation-and-refund-sync#KB-008",
    "order-cancellation-and-refund-sync#KB-015",
    "order-cancellation-and-refund-sync#KB-016"
  ]
}
```

## OQ-resell-refund-credit-071 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-resell-refund-credit-071",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "order-cancellation-and-refund-sync",
  "summary": "Các check P1 (tiền / billing / bốc thăm / refund / store credit / permission / xoá dữ liệu) của feature này có oracle STRONG nhưng chỉ dựa trên tài liệu dev (dev_doc). Theo luật oracle, chúng giữ NEEDS_CONFIRMATION cho tới khi có test_case PASS (hoặc PO/Dev xác nhận trực tiếp) cho đúng hành vi. Danh sách check ở check_ids.",
  "check_ids": [
    "order-cancellation-and-refund-sync:CHK-001",
    "order-cancellation-and-refund-sync:CHK-002",
    "order-cancellation-and-refund-sync:CHK-003",
    "order-cancellation-and-refund-sync:CHK-005",
    "order-cancellation-and-refund-sync:CHK-006",
    "order-cancellation-and-refund-sync:CHK-009",
    "order-cancellation-and-refund-sync:CHK-011"
  ]
}
```

## OQ-resell-refund-credit-072 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-resell-refund-credit-072",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "order-cancellation-and-refund-sync",
  "summary": "Đơn bị merchant refund một phần (một dòng hoặc một phần tiền) có còn resell được không, hay tuỳ trạng thái Shopify của đơn? Tài liệu tự ghi chưa chắc chắn, trong khi phần công thức hoàn lại mô tả resell trên đơn đã có hoàn tiền trước đó.",
  "check_ids": [
    "order-cancellation-and-refund-sync:CHK-004"
  ]
}
```

## OQ-resell-refund-credit-073 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-resell-refund-credit-073",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "refund-amount-calculation",
  "summary": "Tài liệu playbook nói resell \"có thể\" hoàn về store credit gốc của Shopify; cần xác nhận khi nào tiền resell hoàn về khoản store credit gốc của đơn.",
  "kb_ids": [
    "refund-amount-calculation#KB-004"
  ]
}
```

## OQ-resell-refund-credit-074 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-resell-refund-credit-074",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "refund-amount-calculation",
  "summary": "Tài liệu mua box nói tiền hoàn khi resell tính theo giá niêm yết của box mà không phân biệt chế độ, trong khi tài liệu cách tính nói chế độ ITEMS tính theo giá hiện tại của từng quà. Cần xác nhận phát biểu \"giá niêm yết\" chỉ áp cho chế độ BOX.",
  "kb_ids": [
    "refund-amount-calculation#KB-005",
    "refund-amount-calculation#KB-008"
  ]
}
```

## OQ-resell-refund-credit-075 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-resell-refund-credit-075",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "refund-amount-calculation",
  "summary": "Tài liệu cách tính ghi phương thức \"original payment\" có ở backend nhưng portal không cho merchant chọn, trong khi playbook coi cách hoàn \"store credit\"/\"original payment\" là cấu hình box và nói đổi cách hoàn chỉ áp cho đơn tương lai. Cần xác nhận merchant hiện có chọn được \"original payment\" không.",
  "kb_ids": [
    "refund-amount-calculation#KB-032",
    "refund-amount-calculation#KB-034",
    "refund-amount-calculation#KB-039"
  ]
}
```

## OQ-resell-refund-credit-076 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-resell-refund-credit-076",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "refund-amount-calculation",
  "summary": "Playbook nói store credit Shopify sau resell mang ghi chú refund \"Store Credit (account)\", trong khi tài liệu cách tính chia tiền resell thành khoản gắn với đơn (b) và khoản vào tài khoản (c). Cần xác nhận nhãn ghi chú cho từng khoản.",
  "kb_ids": [
    "refund-amount-calculation#KB-019",
    "refund-amount-calculation#KB-040"
  ]
}
```

## OQ-resell-refund-credit-077 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-resell-refund-credit-077",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "refund-amount-calculation",
  "summary": "Các check P1 (tiền / billing / bốc thăm / refund / store credit / permission / xoá dữ liệu) của feature này có oracle STRONG nhưng chỉ dựa trên tài liệu dev (dev_doc). Theo luật oracle, chúng giữ NEEDS_CONFIRMATION cho tới khi có test_case PASS (hoặc PO/Dev xác nhận trực tiếp) cho đúng hành vi. Danh sách check ở check_ids.",
  "check_ids": [
    "refund-amount-calculation:CHK-001",
    "refund-amount-calculation:CHK-002",
    "refund-amount-calculation:CHK-003",
    "refund-amount-calculation:CHK-004",
    "refund-amount-calculation:CHK-005",
    "refund-amount-calculation:CHK-006",
    "refund-amount-calculation:CHK-007",
    "refund-amount-calculation:CHK-009",
    "refund-amount-calculation:CHK-010",
    "refund-amount-calculation:CHK-011",
    "refund-amount-calculation:CHK-012",
    "refund-amount-calculation:CHK-013",
    "refund-amount-calculation:CHK-014",
    "refund-amount-calculation:CHK-015",
    "refund-amount-calculation:CHK-016",
    "refund-amount-calculation:CHK-017",
    "refund-amount-calculation:CHK-021",
    "refund-amount-calculation:CHK-022"
  ]
}
```

## OQ-resell-refund-credit-078 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-resell-refund-credit-078",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "refund-amount-calculation",
  "summary": "Khi khách resell box đã mua bằng Koin, tiền hoàn có bao giờ trả về Koin không, hay luôn vào Shopify store credit (hoặc thẻ) và số dư Koin giữ nguyên? Hiện điều này chỉ thể hiện qua ví dụ minh hoạ.",
  "check_ids": [
    "refund-amount-calculation:CHK-008"
  ]
}
```

## OQ-resell-refund-credit-079 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-resell-refund-credit-079",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "refund-amount-calculation",
  "summary": "Merchant hiện có chọn được \"original payment\" từ portal không? Một nguồn nói backend hỗ trợ nhưng portal không cho chọn, nguồn khác coi đây là cấu hình box đổi được.",
  "check_ids": [
    "refund-amount-calculation:CHK-018"
  ]
}
```

## OQ-resell-refund-credit-080 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-resell-refund-credit-080",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "refund-amount-calculation",
  "summary": "Trong ghi chú refund, khoản gắn với đơn (b) và khoản cộng thẳng vào tài khoản (c) mang nhãn \"Store Credit (order)\" và \"Store Credit (account)\" thế nào? Một đoạn tài liệu nói tiền resell vào store credit được ghi \"Store Credit (account)\" mà không phân biệt khoản.",
  "check_ids": [
    "refund-amount-calculation:CHK-020"
  ]
}
```

## OQ-resell-refund-credit-081 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-resell-refund-credit-081",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "resell-box-mode",
  "summary": "Các check P1 (tiền / billing / bốc thăm / refund / store credit / permission / xoá dữ liệu) của feature này có oracle STRONG nhưng chỉ dựa trên tài liệu dev (dev_doc). Theo luật oracle, chúng giữ NEEDS_CONFIRMATION cho tới khi có test_case PASS (hoặc PO/Dev xác nhận trực tiếp) cho đúng hành vi. Danh sách check ở check_ids.",
  "check_ids": [
    "resell-box-mode:CHK-001",
    "resell-box-mode:CHK-002",
    "resell-box-mode:CHK-005",
    "resell-box-mode:CHK-006",
    "resell-box-mode:CHK-007",
    "resell-box-mode:CHK-008",
    "resell-box-mode:CHK-010",
    "resell-box-mode:CHK-012",
    "resell-box-mode:CHK-013",
    "resell-box-mode:CHK-014",
    "resell-box-mode:CHK-015"
  ]
}
```

## OQ-resell-refund-credit-082 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-resell-refund-credit-082",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "resell-box-mode",
  "summary": "Khoá 409 sau lần bấm trùng được giữ bao lâu: chỉ trong cửa sổ 2 giây, một phút như hướng dẫn cho khách, hay tới khi khoá tự gỡ sau một ngày?",
  "check_ids": [
    "resell-box-mode:CHK-011"
  ]
}
```

## OQ-resell-refund-credit-083 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-resell-refund-credit-083",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "resell-box-mode",
  "summary": "Ở chế độ BOX, số tiền resell dựa trên giá niêm yết hay giá khách đã trả sau giảm giá; khi giá nhân Value% ra số lẻ thì làm tròn thế nào; và đơn khác tiền tệ được quy đổi ra sao?",
  "check_ids": [
    "resell-box-mode:CHK-017"
  ]
}
```

## OQ-resell-refund-credit-084 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-resell-refund-credit-084",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "resell-items-mode",
  "summary": "Các check P1 (tiền / billing / bốc thăm / refund / store credit / permission / xoá dữ liệu) của feature này có oracle STRONG nhưng chỉ dựa trên tài liệu dev (dev_doc). Theo luật oracle, chúng giữ NEEDS_CONFIRMATION cho tới khi có test_case PASS (hoặc PO/Dev xác nhận trực tiếp) cho đúng hành vi. Danh sách check ở check_ids.",
  "check_ids": [
    "resell-items-mode:CHK-001",
    "resell-items-mode:CHK-002",
    "resell-items-mode:CHK-003",
    "resell-items-mode:CHK-005",
    "resell-items-mode:CHK-008",
    "resell-items-mode:CHK-009",
    "resell-items-mode:CHK-010",
    "resell-items-mode:CHK-011"
  ]
}
```

## OQ-resell-refund-credit-085 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-resell-refund-credit-085",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "resell-items-mode",
  "summary": "Ở chế độ ITEMS có trần tổng tiền hoàn so với số khách đã trả cho đơn không, hay tổng hoàn được phép vượt khi merchant tăng giá giữa các lần bán?",
  "kb_ids": [
    "resell-items-mode#KB-026"
  ],
  "check_ids": [
    "resell-items-mode:CHK-004"
  ]
}
```

## OQ-resell-refund-credit-086 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-resell-refund-credit-086",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "resell-items-mode",
  "summary": "Resale price ở chế độ ITEMS được làm tròn theo quy tắc nào (làm tròn lên, xuống hay gần nhất, tới mấy chữ số), và số tiền refund có khớp đúng số hiển thị không?",
  "kb_ids": [
    "resell-items-mode#KB-020"
  ],
  "check_ids": [
    "resell-items-mode:CHK-012"
  ]
}
```

## OQ-resell-refund-credit-087 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-resell-refund-credit-087",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "resell-items-mode",
  "summary": "Ở chế độ ITEMS, nếu cửa sổ resell hết khi khách đang mở popup hoặc gửi yêu cầu sát giờ hết thì yêu cầu được xử lý thế nào, và quà đó có vừa được hoàn vừa vào đơn không?",
  "check_ids": [
    "resell-items-mode:CHK-013"
  ]
}
```

## OQ-resell-refund-credit-088 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-resell-refund-credit-088",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "resell-items-mode",
  "summary": "Quà khách đã bán lại ở chế độ ITEMS có được trả về pool của box (pool refill) không, và nếu có thì vào lúc nào?",
  "check_ids": [
    "resell-items-mode:CHK-014"
  ]
}
```

## OQ-resell-refund-credit-089 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-resell-refund-credit-089",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "resell-setup-and-eligibility",
  "summary": "Tài liệu General Settings tự ghi \"chưa xác nhận\" việc khách còn resell được hay không sau khi auto-unbox đã mở box mà cửa sổ resell chưa hết. Cần dev/PO xác nhận; liên quan trực tiếp nhóm mâu thuẫn về mở box và resell.",
  "kb_ids": [
    "resell-setup-and-eligibility#KB-073"
  ]
}
```

## OQ-resell-refund-credit-090 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-resell-refund-credit-090",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "resell-setup-and-eligibility",
  "summary": "Các check P1 (tiền / billing / bốc thăm / refund / store credit / permission / xoá dữ liệu) của feature này có oracle STRONG nhưng chỉ dựa trên tài liệu dev (dev_doc). Theo luật oracle, chúng giữ NEEDS_CONFIRMATION cho tới khi có test_case PASS (hoặc PO/Dev xác nhận trực tiếp) cho đúng hành vi. Danh sách check ở check_ids.",
  "check_ids": [
    "resell-setup-and-eligibility:CHK-007",
    "resell-setup-and-eligibility:CHK-008",
    "resell-setup-and-eligibility:CHK-009",
    "resell-setup-and-eligibility:CHK-010",
    "resell-setup-and-eligibility:CHK-011",
    "resell-setup-and-eligibility:CHK-012",
    "resell-setup-and-eligibility:CHK-015",
    "resell-setup-and-eligibility:CHK-017",
    "resell-setup-and-eligibility:CHK-019",
    "resell-setup-and-eligibility:CHK-020",
    "resell-setup-and-eligibility:CHK-025",
    "resell-setup-and-eligibility:CHK-026"
  ]
}
```

## OQ-resell-refund-credit-091 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-resell-refund-credit-091",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "resell-setup-and-eligibility",
  "summary": "\"Buyback limit time\" có giá trị tối đa không, có nhận số thập phân không, và khi nhập nhỏ hơn 1 thì form báo lỗi gì?",
  "check_ids": [
    "resell-setup-and-eligibility:CHK-014"
  ]
}
```

## OQ-resell-refund-credit-092 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-resell-refund-credit-092",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "resell-setup-and-eligibility",
  "summary": "Ô Value (%) của buyback có giới hạn tối đa không (có cho phép lớn hơn 100% không) và có nhận số lẻ không?",
  "check_ids": [
    "resell-setup-and-eligibility:CHK-016"
  ]
}
```

## OQ-resell-refund-credit-093 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-resell-refund-credit-093",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "resell-setup-and-eligibility",
  "summary": "Phương thức hoàn \"original payment\" còn xuất hiện ở box dữ liệu cũ không; nếu có, resell của box đó hoàn về thẻ như thế nào, kể cả khi thẻ đã bị hoàn một phần trước đó?",
  "kb_ids": [
    "resell-setup-and-eligibility#KB-039",
    "resell-setup-and-eligibility#KB-040"
  ],
  "check_ids": [
    "resell-setup-and-eligibility:CHK-028"
  ]
}
```

## OQ-resell-refund-credit-094 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-resell-refund-credit-094",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "resell-setup-and-eligibility",
  "summary": "Nếu Retry Sync đưa quà vào đơn trong lúc cửa sổ resell còn mở thì khách còn bán lại được không, và dòng quà có bị gỡ khỏi đơn khi khách bán lại không?",
  "check_ids": [
    "resell-setup-and-eligibility:CHK-029"
  ]
}
```

## OQ-resell-refund-credit-095 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-resell-refund-credit-095",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "resell-setup-and-eligibility",
  "summary": "Nếu khách mở box sau khi cửa sổ resell đã hết thì có resell được không, và sau khi cửa sổ hết quà được thêm vào đơn Shopify vào lúc nào (job nào, độ trễ bao lâu)?",
  "check_ids": [
    "resell-setup-and-eligibility:CHK-032"
  ]
}
```
