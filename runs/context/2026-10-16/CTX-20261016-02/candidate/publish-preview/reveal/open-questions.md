# Open Questions — reveal

Tổng: 64 mục (CONFLICT 4 · OPEN_ISSUE 32 · NEEDS_CONFIRMATION 28). Version 1 sinh từ bootstrap DOC_BOOTSTRAP (bộ Product KB v1 do dev viết từ source code, 2026-10-16); version 2 thêm mục từ REFRESH trên staging 2026-10-16 (quan sát OBSERVED_CURRENT). Mỗi mục là một khối json; `kb_ids` dạng `<feature_key>#KB-xxx` (hoặc `_object-level.<object>#KB-xxx` cho tầng object), `check_ids` dạng `<feature_key>:CHK-xxx`.

## OQ-reveal-001 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-reveal-001",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": null,
  "summary": "Bộ tài liệu nguồn không chỉ định role mặc định cho object này (bootstrap-request để role null): các KB item mang scope.role theo vai trò tài liệu nêu cho từng hành vi, hoặc \"unspecified\" khi tài liệu không nêu. Cần PO/Dev xác nhận ma trận role → quyền thực tế trên production (merchant owner/staff, khách, admin Mysbox theo từng role) trước khi dùng các check PERMISSION làm oracle."
}
```

## OQ-reveal-002 — CONFLICT

```json
{
  "oq_id": "OQ-reveal-002",
  "type": "CONFLICT",
  "feature_id": "auto-unbox",
  "summary": "Cần dev xác nhận ngưỡng thật khiến một đơn có resell window dài không bao giờ được auto-unbox, và mốc tính hạn resell. Mâu thuẫn nằm trong cùng một tài liệu: điều kiện quét ngụ ý ngưỡng 7 ngày cộng độ trễ auto-unbox, còn câu suy luận (tự ghi chưa chạy thử, mang tính lỗi đã biết) ghi 7 ngày trừ độ trễ.",
  "side_a": "Tài liệu \"Auto-unbox\" §Điều kiện để một đơn bị auto-unbox: một điều kiện quét là giờ auto-unbox nằm trong 7 ngày gần nhất",
  "side_b": "Cùng tài liệu, cùng mục: câu suy luận (chưa chạy thử) rằng resell window dài hơn \"7 ngày trừ độ trễ auto-unbox\" thì đơn không tự mở được — về số học, điều kiện quét ngụ ý ngưỡng 7 ngày cộng độ trễ",
  "conflict_group": "CONF-reveal-02",
  "kb_ids": [
    "auto-unbox#KB-028",
    "auto-unbox#KB-034"
  ],
  "check_ids": [
    "auto-unbox:CHK-014"
  ]
}
```

## OQ-reveal-003 — CONFLICT

```json
{
  "oq_id": "OQ-reveal-003",
  "type": "CONFLICT",
  "feature_id": "auto-unbox",
  "summary": "Cần dev xác nhận giờ auto-unbox được tính từ lúc tạo đơn hay lúc đơn paid (khác nhau với đơn tạo trước rồi mới thanh toán). Hai tài liệu nêu hai mốc khác nhau.",
  "side_a": "Tài liệu \"Auto-unbox\" §Cấu hình của merchant và \"Mua box và random quà\" §Bước 2: độ trễ tính từ lúc tạo đơn (giờ auto-unbox = giờ tạo đơn + \"Auto-unbox after\")",
  "side_b": "Tài liệu \"General Settings\" §Bảng setting: giờ mở = giờ đơn paid + số giờ \"Auto-unbox after\"",
  "conflict_group": "CONF-reveal-03",
  "kb_ids": [
    "auto-unbox#KB-004",
    "auto-unbox#KB-050"
  ],
  "check_ids": [
    "auto-unbox:CHK-003"
  ],
  "staging_observation": "Ghi chú quan sát staging cho OQ-reveal-003 / CONF-reveal-03: Auto-unbox tắt suốt run: mọi đơn có unboxing_at null — khớp mệnh đề chung 'chỉ có khi store bật auto-unbox'; không có mẫu để phân biệt mốc tạo đơn (KB-004) và mốc paid (KB-050).",
  "staging_observation_kb_ids": [
    "auto-unbox#KB-066",
    "auto-unbox#KB-004",
    "auto-unbox#KB-050"
  ],
  "status_note": "Quan sát staging chỉ là OBSERVED_CURRENT; conflict vẫn mở, chưa resolve."
}
```

## OQ-reveal-004 — CONFLICT

```json
{
  "oq_id": "OQ-reveal-004",
  "type": "CONFLICT",
  "feature_id": "auto-unbox",
  "summary": "Điều kiện \"cửa sổ resell đã hết\" có bắt buộc cho mọi đường kích hoạt thêm quà hay chỉ cho đường khách tự mở và job sync. Phía còn lại của mâu thuẫn (bảng \"Ai kích hoạt\": mở qua Flow hoặc auto-unbox thì thêm ngay, không xét window) thuộc shard của feature khác; orchestrator cần nối cùng conflict group.",
  "side_a": "Tài liệu \"Quà được thêm vào đơn Shopify\" §Khi nào quà được thêm, khối điều kiện: cần đủ cả ba điều kiện, trong đó có cửa sổ resell đã hết (hoặc box không bật buyback).",
  "side_b": "Cùng tài liệu, cùng mục, bảng \"Ai kích hoạt\": merchant mở qua Flow hoặc auto-unbox thì quà vào đơn ngay lập tức, không xét window.",
  "conflict_group": "CONF-reveal-01",
  "kb_ids": [
    "auto-unbox#KB-049"
  ],
  "check_ids": [
    "auto-unbox:CHK-015"
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

## OQ-reveal-005 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-reveal-005",
  "type": "OPEN_ISSUE",
  "feature_id": "auto-unbox",
  "summary": "Playbook support nêu khi khách thêm box vào đơn đã Completed, đơn quay lại Queued nhưng box mới không có giờ unbox (nên không được auto-unbox). Cần dev xác nhận đây là lỗi đã biết, mức độ và hướng xử lý; item này không dùng làm oracle.",
  "kb_ids": [
    "auto-unbox#KB-064"
  ],
  "check_ids": [
    "auto-unbox:CHK-020"
  ]
}
```

## OQ-reveal-006 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-reveal-006",
  "type": "OPEN_ISSUE",
  "feature_id": "auto-unbox",
  "summary": "Khoảng giá trị hợp lệ của Auto-unbox after và Trigger before (min/max, số nguyên, cho phép 0 hay để trống) và thông báo lỗi khi nhập sai? — Không có boundary để test validation form.",
  "kb_ids": [
    "auto-unbox#KB-003",
    "auto-unbox#KB-012",
    "auto-unbox#KB-015"
  ]
}
```

## OQ-reveal-007 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-reveal-007",
  "type": "OPEN_ISSUE",
  "feature_id": "auto-unbox",
  "summary": "Trigger \"Order unboxing soon\" có còn bắn nếu khách đã tự mở hết box trước giờ trigger, hoặc nếu chỉ bật trigger mà tắt auto-unbox? Payload/field của trigger là gì? — Quyết định có email nhắc thừa và biến merchant dùng được trong Flow.",
  "kb_ids": [
    "auto-unbox#KB-014",
    "auto-unbox#KB-022"
  ]
}
```

## OQ-reveal-008 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-reveal-008",
  "type": "OPEN_ISSUE",
  "feature_id": "auto-unbox",
  "summary": "Tắt Enable auto-unbox sau khi đơn đã được ghi giờ auto-unbox thì đơn đó còn bị auto-unbox không? — Nguồn chỉ nói giờ ghi một lần lúc tạo đơn, không nói tác động của việc tắt về sau.",
  "kb_ids": [
    "auto-unbox#KB-017",
    "auto-unbox#KB-051"
  ]
}
```

## OQ-reveal-009 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-reveal-009",
  "type": "OPEN_ISSUE",
  "feature_id": "auto-unbox",
  "summary": "Box physical trong đơn hỗn hợp physical + digital được xử lý thế nào khi auto-unbox? — Điều kiện chỉ nói 'còn ít nhất 1 box digital chưa mở'.",
  "kb_ids": [
    "auto-unbox#KB-029"
  ]
}
```

## OQ-reveal-010 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-reveal-010",
  "type": "OPEN_ISSUE",
  "feature_id": "auto-unbox",
  "summary": "'Resell đang chạy dở' cụ thể là trạng thái resell nào? — Không kiểm được điều kiện quét nếu không biết trạng thái nào chặn.",
  "kb_ids": [
    "auto-unbox#KB-027"
  ]
}
```

## OQ-reveal-011 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-reveal-011",
  "type": "OPEN_ISSUE",
  "feature_id": "auto-unbox",
  "summary": "Hạn resell được tính từ mốc nào (tạo đơn, paid, lúc box được random)? — Cần để xác định ngưỡng 7 ngày và lần quét đầu tiên đủ điều kiện; timeline chỉ có trong ví dụ.",
  "kb_ids": [
    "auto-unbox#KB-030",
    "auto-unbox#KB-043",
    "auto-unbox#KB-044",
    "auto-unbox#KB-045",
    "auto-unbox#KB-046"
  ]
}
```

## OQ-reveal-012 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-reveal-012",
  "type": "OPEN_ISSUE",
  "feature_id": "auto-unbox",
  "summary": "Đếm ngược \"Auto-open in\" và banner nhắc hiển thị trên trang nào của storefront, có dịch được không, banner hiện từ lúc nào? — Không xác định được màn hình cần kiểm.",
  "kb_ids": [
    "auto-unbox#KB-038",
    "auto-unbox#KB-039"
  ]
}
```

## OQ-reveal-013 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-reveal-013",
  "type": "OPEN_ISSUE",
  "feature_id": "auto-unbox",
  "summary": "Auto-unbox có chạy khi shop tắt app, hết capacity hoặc plan bị đóng băng không? — Trạng thái shop có thể chặn job nền.",
  "kb_ids": [
    "auto-unbox#KB-001"
  ]
}
```

## OQ-reveal-014 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-reveal-014",
  "type": "OPEN_ISSUE",
  "feature_id": "auto-unbox",
  "summary": "Job quét lỗi (vd thêm quà vào đơn Shopify thất bại) thì đơn ở trạng thái nào, có retry không? — Không có hành vi lỗi để test.",
  "kb_ids": [
    "auto-unbox#KB-035",
    "auto-unbox#KB-036"
  ]
}
```

## OQ-reveal-015 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-reveal-015",
  "type": "OPEN_ISSUE",
  "feature_id": "customer-portal-access-magic-link",
  "summary": "Tài liệu dev nêu việc kiểm chữ ký app proxy của Shopify không kiểm thời điểm gửi request (không có kiểm tra độ mới), tức request đã ký hợp lệ có thể bị gửi lại. Cần dev xác nhận đây là hạn chế đã biết hay thiết kế chủ đích, và có kế hoạch bổ sung kiểm tra độ mới không; item này không dùng làm expected result.",
  "kb_ids": [
    "customer-portal-access-magic-link#KB-010"
  ],
  "check_ids": [
    "customer-portal-access-magic-link:CHK-016"
  ]
}
```

## OQ-reveal-016 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-reveal-016",
  "type": "OPEN_ISSUE",
  "feature_id": "customer-portal-access-magic-link",
  "summary": "Request app proxy có chữ ký sai bị từ chối với mã phản hồi / trang nào? — Tài liệu chỉ nói 'từ chối', không có oracle cụ thể.",
  "kb_ids": [
    "customer-portal-access-magic-link#KB-009"
  ]
}
```

## OQ-reveal-017 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-reveal-017",
  "type": "OPEN_ISSUE",
  "feature_id": "customer-portal-access-magic-link",
  "summary": "Với từng nguyên nhân (chưa đăng nhập + link thiếu danh tính, shop ở trạng thái OFF, đơn của khách khác, cache cũ, trình duyệt đăng nhập tài khoản khác), trang khách trả 404, trang trắng, đẩy sang đăng nhập hay thông báo 'magic link is not correct'? — Expected result từng case truy cập không xác định được.",
  "kb_ids": [
    "customer-portal-access-magic-link#KB-024",
    "customer-portal-access-magic-link#KB-027",
    "customer-portal-access-magic-link#KB-028"
  ]
}
```

## OQ-reveal-018 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-reveal-018",
  "type": "OPEN_ISSUE",
  "feature_id": "customer-portal-access-magic-link",
  "summary": "Trang cảm ơn / order status có tự làm mới token magic link đã hết hạn không? — Tài liệu support tự ghi chưa xác nhận; quyết định expected result khi khách mở link hết hạn từ trang cảm ơn.",
  "kb_ids": [
    "customer-portal-access-magic-link#KB-006",
    "customer-portal-access-magic-link#KB-018"
  ]
}
```

## OQ-reveal-019 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-reveal-019",
  "type": "OPEN_ISSUE",
  "feature_id": "customer-portal-access-magic-link",
  "summary": "Tên tham số / định dạng mã khách trong magic link và cách khách guest nhận được magic link (email, trang cảm ơn)? — Cần để dựng kịch bản truy cập guest.",
  "kb_ids": [
    "customer-portal-access-magic-link#KB-001",
    "customer-portal-access-magic-link#KB-011"
  ]
}
```

## OQ-reveal-020 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-reveal-020",
  "type": "OPEN_ISSUE",
  "feature_id": "customer-portal-access-magic-link",
  "summary": "Method HTTP, endpoint con, status code và shape request/response của API Mysbox gọi qua app proxy? — Lớp API chưa có route+method để kiểm.",
  "kb_ids": [
    "customer-portal-access-magic-link#KB-007",
    "customer-portal-access-magic-link#KB-012"
  ]
}
```

## OQ-reveal-021 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-reveal-021",
  "type": "OPEN_ISSUE",
  "feature_id": "reveal-journey",
  "summary": "Playbook support nêu cơ chế chặn mở trùng chỉ nằm ở trình duyệt của khách (không có ở server), và khi khách tải lại trang lúc server đã lộ box thì lần tải lại có thể bắt đầu lộ box kế tiếp. Cần dev xác nhận đây là lỗi đã biết, mức độ, và hành vi đúng mong đợi khi khách tải lại giữa chừng; các item này không dùng làm oracle.",
  "kb_ids": [
    "reveal-journey#KB-080",
    "reveal-journey#KB-081"
  ],
  "check_ids": [
    "reveal-journey:CHK-047",
    "reveal-journey:CHK-048"
  ]
}
```

## OQ-reveal-022 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-reveal-022",
  "type": "OPEN_ISSUE",
  "feature_id": "reveal-journey",
  "summary": "Sau khi hết 30 giây hỏi app, khối unbox có tiếp tục hỏi lại hay khách phải tải lại trang? — Quyết định kịch bản đơn đồng bộ trễ hơn 30 giây.",
  "kb_ids": [
    "reveal-journey#KB-033"
  ]
}
```

## OQ-reveal-023 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-reveal-023",
  "type": "OPEN_ISSUE",
  "feature_id": "reveal-journey",
  "summary": "Route/method của lời gọi mở box và mã lỗi trả về khi thất bại? — Cần cho kiểm API và idempotency của thao tác mở.",
  "kb_ids": [
    "reveal-journey#KB-042",
    "reveal-journey#KB-077"
  ]
}
```

## OQ-reveal-024 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-reveal-024",
  "type": "OPEN_ISSUE",
  "feature_id": "reveal-journey",
  "summary": "Khi nào màn kết quả hiện \"Next unbox\" và khi nào hiện \"Open more\"? \"Open more\" xử lý thế nào khi box hết hàng? — Tài liệu không nêu điều kiện hiển thị và nhánh lỗi kiểm tồn kho.",
  "kb_ids": [
    "reveal-journey#KB-060",
    "reveal-journey#KB-061"
  ]
}
```

## OQ-reveal-025 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-reveal-025",
  "type": "OPEN_ISSUE",
  "feature_id": "reveal-journey",
  "summary": "Âm thanh tùy chọn của Carousel do merchant cấu hình hay khách bật/tắt? — Xác định role/surface của setting.",
  "kb_ids": [
    "reveal-journey#KB-050"
  ]
}
```

## OQ-reveal-026 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-reveal-026",
  "type": "OPEN_ISSUE",
  "feature_id": "reveal-journey",
  "summary": "Danh sách gói được coi là 'gói trả phí (không phải early-bird)' cho Gacha machine, và Free/Early-bird thấy gì khi cờ cho phép bị tắt? — Boundary của điều kiện plan.",
  "kb_ids": [
    "reveal-journey#KB-008",
    "reveal-journey#KB-055"
  ]
}
```

## OQ-reveal-027 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-reveal-027",
  "type": "OPEN_ISSUE",
  "feature_id": "reveal-journey",
  "summary": "Ai bật hide_watermark (staff, theo gói?) và ở đâu? — Quyết định test watermark theo role/plan.",
  "kb_ids": [
    "reveal-journey#KB-076"
  ]
}
```

## OQ-reveal-028 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-reveal-028",
  "type": "OPEN_ISSUE",
  "feature_id": "reveal-journey",
  "summary": "Nội dung nguyên văn thông báo 'chưa paid' trên khối unbox ở mọi điểm vào có thống nhất không? — Tester cần chuỗi chính xác; một nguồn chỉ nói 'báo chưa paid'.",
  "kb_ids": [
    "reveal-journey#KB-012"
  ]
}
```

## OQ-reveal-029 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-reveal-029",
  "type": "OPEN_ISSUE",
  "feature_id": "reveal-journey",
  "summary": "Giá trị cụ thể (enum) của trạng thái mở / resell / đồng bộ quà của Order? — Cần enum để kiểm chuyển trạng thái ở lớp data.",
  "kb_ids": [
    "_object-level#KB-003"
  ]
}
```

## OQ-reveal-030 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-reveal-030",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "auto-unbox",
  "summary": "Thời điểm bắn chính xác của trigger \"Order unboxing soon\" chưa được xác nhận: tài liệu nêu job kiểm tra mỗi giờ ở phút 30 và trigger có thể trễ tối đa 1 giờ, nhưng tự ghi thời điểm bắn chính xác chưa xác nhận. Cần dev xác nhận trước khi dùng làm boundary test.",
  "kb_ids": [
    "auto-unbox#KB-025",
    "auto-unbox#KB-054"
  ],
  "check_ids": [
    "auto-unbox:CHK-017"
  ]
}
```

## OQ-reveal-031 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-reveal-031",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "auto-unbox",
  "summary": "Tài liệu nêu auto-unbox mở box mà không chờ hết cửa sổ resell khi đồng bộ quà vào đơn, và tự ghi chưa xác nhận khách còn resell được hay không sau thời điểm đó. Cần dev xác nhận hành vi resell sau khi auto-unbox đồng bộ quà.",
  "kb_ids": [
    "auto-unbox#KB-056"
  ]
}
```

## OQ-reveal-032 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-reveal-032",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "auto-unbox",
  "summary": "Lịch job auto-unbox (00:00, 08:00, 16:00) và job nhắc (phút 30 mỗi giờ) theo giờ máy chủ, cấu hình mặc định UTC; tài liệu không xác nhận múi giờ và nơi chạy scheduler ở production. Cần xác nhận múi giờ thực tế trước khi dùng các mốc giờ làm expected result.",
  "kb_ids": [
    "auto-unbox#KB-019",
    "auto-unbox#KB-020"
  ]
}
```

## OQ-reveal-033 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-reveal-033",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "auto-unbox",
  "summary": "Các check P1 (tiền / billing / bốc thăm / refund / store credit / permission / xoá dữ liệu) của feature này có oracle STRONG nhưng chỉ dựa trên tài liệu dev (dev_doc). Theo luật oracle, chúng giữ NEEDS_CONFIRMATION cho tới khi có test_case PASS (hoặc PO/Dev xác nhận trực tiếp) cho đúng hành vi. Danh sách check ở check_ids.",
  "check_ids": [
    "auto-unbox:CHK-010",
    "auto-unbox:CHK-011",
    "auto-unbox:CHK-012",
    "auto-unbox:CHK-013"
  ]
}
```

## OQ-reveal-034 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-reveal-034",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "auto-unbox",
  "summary": "Khoảng giá trị hợp lệ của \"Auto-unbox after\" và \"Trigger before\" là gì (min, max, số nguyên, có cho 0 hay để trống), và form báo lỗi gì khi nhập sai? Khi \"Trigger before\" lớn hơn hoặc bằng \"Auto-unbox after\" thì trigger nhắc có bắn không?",
  "check_ids": [
    "auto-unbox:CHK-018"
  ]
}
```

## OQ-reveal-035 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-reveal-035",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "auto-unbox",
  "summary": "Nếu merchant tắt \"Enable auto-unbox\" sau khi đơn đã được ghi giờ auto-unbox, đơn đó còn bị auto-unbox ở lần quét sau giờ hẹn không?",
  "check_ids": [
    "auto-unbox:CHK-019"
  ]
}
```

## OQ-reveal-036 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-reveal-036",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "customer-portal-access-magic-link",
  "summary": "Các check P1 (tiền / billing / bốc thăm / refund / store credit / permission / xoá dữ liệu) của feature này có oracle STRONG nhưng chỉ dựa trên tài liệu dev (dev_doc). Theo luật oracle, chúng giữ NEEDS_CONFIRMATION cho tới khi có test_case PASS (hoặc PO/Dev xác nhận trực tiếp) cho đúng hành vi. Danh sách check ở check_ids.",
  "check_ids": [
    "customer-portal-access-magic-link:CHK-001",
    "customer-portal-access-magic-link:CHK-002",
    "customer-portal-access-magic-link:CHK-004",
    "customer-portal-access-magic-link:CHK-005",
    "customer-portal-access-magic-link:CHK-006",
    "customer-portal-access-magic-link:CHK-008",
    "customer-portal-access-magic-link:CHK-009",
    "customer-portal-access-magic-link:CHK-010",
    "customer-portal-access-magic-link:CHK-011",
    "customer-portal-access-magic-link:CHK-012",
    "customer-portal-access-magic-link:CHK-013"
  ]
}
```

## OQ-reveal-037 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-reveal-037",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "customer-portal-access-magic-link",
  "summary": "Hạn 1 năm của token magic link được tính từ lúc nào (cấp token, tạo đơn hay lần dùng gần nhất)? Token có được gia hạn hoặc cấp lại không, và trang cảm ơn / order status có tự làm mới token đã hết hạn không?",
  "kb_ids": [
    "customer-portal-access-magic-link#KB-020",
    "customer-portal-access-magic-link#KB-021"
  ],
  "check_ids": [
    "customer-portal-access-magic-link:CHK-007",
    "customer-portal-access-magic-link:CHK-017"
  ]
}
```

## OQ-reveal-038 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-reveal-038",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "reveal-journey",
  "summary": "Tài liệu chỉ nêu giá trị xấp xỉ cho hiệu ứng reveal: Carousel quay khoảng 12 giây, Drawing tự hoàn tất khi nét vẽ đạt khoảng 65%. Cần xác nhận giá trị chính xác (và dung sai) trước khi dùng làm boundary test.",
  "kb_ids": [
    "reveal-journey#KB-047",
    "reveal-journey#KB-052"
  ],
  "check_ids": [
    "reveal-journey:CHK-034",
    "reveal-journey:CHK-035"
  ]
}
```

## OQ-reveal-039 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-reveal-039",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "reveal-journey",
  "summary": "Ngưỡng chính thức để khối unbox trên trang cảm ơn ngừng chờ và hiện thông báo \"Please come back later after 30 minutes...\" là bao nhiêu giây? Sau ngưỡng đó khối có tiếp tục hỏi app hay khách phải tải lại trang? Trạng thái \"Please wait..\" có phải dấu hiệu đơn chưa được bốc thăm không?",
  "kb_ids": [
    "reveal-journey#KB-015",
    "reveal-journey#KB-016"
  ],
  "check_ids": [
    "reveal-journey:CHK-004"
  ]
}
```

## OQ-reveal-040 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-reveal-040",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "reveal-journey",
  "summary": "\"Thiếu dữ liệu trên biến thể box\" (khiến khối Unbox không hiện ở trang cảm ơn) gồm cụ thể những dữ liệu nào, và tester tạo trạng thái đó bằng cách nào?",
  "kb_ids": [
    "reveal-journey#KB-086"
  ],
  "check_ids": [
    "reveal-journey:CHK-010"
  ]
}
```

## OQ-reveal-041 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-reveal-041",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "reveal-journey",
  "summary": "Màn kết quả hiện \"Next unbox\" trong điều kiện nào và hiện \"Open more\" trong điều kiện nào? Khi bấm \"Open more\" mà box đã hết hàng thì khách thấy gì?",
  "check_ids": [
    "reveal-journey:CHK-023"
  ]
}
```

## OQ-reveal-042 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-reveal-042",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "reveal-journey",
  "summary": "Các check P1 (tiền / billing / bốc thăm / refund / store credit / permission / xoá dữ liệu) của feature này có oracle STRONG nhưng chỉ dựa trên tài liệu dev (dev_doc). Theo luật oracle, chúng giữ NEEDS_CONFIRMATION cho tới khi có test_case PASS (hoặc PO/Dev xác nhận trực tiếp) cho đúng hành vi. Danh sách check ở check_ids.",
  "check_ids": [
    "reveal-journey:CHK-037",
    "reveal-journey:CHK-038",
    "reveal-journey:CHK-039",
    "reveal-journey:CHK-040",
    "reveal-journey:CHK-041",
    "reveal-journey:CHK-042",
    "reveal-journey:CHK-046"
  ]
}
```

## OQ-reveal-043 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-reveal-043",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "reveal-journey",
  "summary": "Khi bấm Unbox không mở được (hết box để mở, shop đang OFF, link hết hạn, shop vượt capacity), khách thấy thông báo nguyên văn nào cho từng trường hợp? \"No more items to open\" có phải thông điệp chính thức khi đã mở hết box không?",
  "kb_ids": [
    "reveal-journey#KB-065"
  ],
  "check_ids": [
    "reveal-journey:CHK-044"
  ]
}
```

## OQ-reveal-044 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-reveal-044",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "reveal-journey",
  "summary": "Nút \"Unbox\" ở Manage orders mở toàn bộ box chưa mở của đơn hay từng box, và nút hiện trong điều kiện nào? Câu \"merchant có thể mở box thay khách\" có phạm vi gì ngoài nút \"Open all boxes\"?",
  "kb_ids": [
    "reveal-journey#KB-010"
  ],
  "check_ids": [
    "reveal-journey:CHK-051"
  ]
}
```

## OQ-reveal-045 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-reveal-045",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "reveal-journey",
  "summary": "Bộ đếm \"N / M unboxed\" hiển thị thế nào khi đơn có box đã resold? Box physical có xuất hiện trong danh sách / chi tiết đơn của khách và có được tính vào bộ đếm không?",
  "kb_ids": [
    "reveal-journey#KB-070",
    "reveal-journey#KB-071"
  ],
  "check_ids": [
    "reveal-journey:CHK-055"
  ]
}
```

## OQ-reveal-046 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-reveal-046",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "customer-portal-access-magic-link",
  "summary": "?parameters= của magic link quan sát là base64 JSON đọc được (chứa customer_id, token, order_id…), không thấy ký/mã hoá. KB-011 nói 'được mã hoá' — tài liệu muốn nói encoding hay mã hoá thật? Nếu là mã hoá thật thì staging đang lệch.",
  "kb_ids": [
    "customer-portal-access-magic-link#KB-031",
    "customer-portal-access-magic-link#KB-011",
    "customer-portal-access-magic-link#KB-012"
  ],
  "check_ids": [
    "customer-portal-access-magic-link:CHK-018"
  ]
}
```

## OQ-reveal-047 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-reveal-047",
  "type": "OPEN_ISSUE",
  "feature_id": "customer-portal-access-magic-link",
  "summary": "Một magic link (của một đơn) mở được mọi đơn của customer guest, và token giống nhau cho mọi đơn của customer đó (guest dùng chung email). Cần PO/dev xác nhận phạm vi theo customer là chủ ý (base không nói phạm vi một đơn hay mọi đơn).",
  "kb_ids": [
    "customer-portal-access-magic-link#KB-032"
  ],
  "tags": [
    "security-observation"
  ]
}
```

## OQ-reveal-048 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-reveal-048",
  "type": "OPEN_ISSUE",
  "feature_id": "customer-portal-access-magic-link",
  "summary": "GET staging-api /api/orders/{id}/customer?shop= trả customer_id + token magic link mà capture không thấy header auth nào. Cần dev/owner xác nhận cơ chế bảo vệ của endpoint này (kiểm origin/referer, rate limit…) và đây có phải hành vi chủ ý.",
  "kb_ids": [
    "customer-portal-access-magic-link#KB-034"
  ],
  "tags": [
    "security-observation"
  ],
  "check_ids": [
    "customer-portal-access-magic-link:CHK-019",
    "reveal-journey:CHK-061"
  ]
}
```

## OQ-reveal-049 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-reveal-049",
  "type": "OPEN_ISSUE",
  "feature_id": "customer-portal-access-magic-link",
  "summary": "404 của staging-api trả body exception Laravel kèm class, đường dẫn file server và stack trace. Cần xác nhận debug mode trên staging là chủ ý và production không lộ tương tự (run không kiểm production).",
  "kb_ids": [
    "customer-portal-access-magic-link#KB-035"
  ],
  "tags": [
    "security-observation"
  ],
  "check_ids": [
    "customer-portal-access-magic-link:CHK-020"
  ]
}
```

## OQ-reveal-050 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-reveal-050",
  "type": "OPEN_ISSUE",
  "feature_id": "reveal-journey",
  "summary": "Xác nhận host backend thứ hai: khối Mysbox trên trang cảm ơn / order status page gọi thẳng https://staging-api.mysbox.io (khác expected_api_base https://staging-embedded.mysbox.io của config). Đây là backend hợp lệ của staging hay cấu hình lệch? Tới khi operator xác nhận, các item tag host_not_in_expected_api_base giữ LOW và không làm cơ sở cho item khác.",
  "kb_ids": [
    "reveal-journey#KB-088",
    "reveal-journey#KB-106",
    "customer-portal-access-magic-link#KB-034",
    "customer-portal-access-magic-link#KB-035"
  ],
  "tags": [
    "host_not_in_expected_api_base"
  ]
}
```

## OQ-reveal-051 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-reveal-051",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "reveal-journey",
  "summary": "Trang reveal animation Drawing không có nút 'Skip' (và không có nút 'Unbox' trên trang reveal). KB-046 nói khách bấm 'Skip' để rút ngắn hiệu ứng — 'Skip' chỉ có ở một số animation (vd Carousel) hay đây là lệch hành vi? Check reveal-journey CHK-033 cần ghi rõ animation áp dụng.",
  "kb_ids": [
    "reveal-journey#KB-090",
    "reveal-journey#KB-040",
    "reveal-journey#KB-051",
    "reveal-journey#KB-057",
    "reveal-journey#KB-060",
    "reveal-journey#KB-062",
    "reveal-journey#KB-046",
    "reveal-journey#KB-052",
    "reveal-journey#KB-058",
    "reveal-journey#KB-059",
    "reveal-journey#KB-061"
  ],
  "check_ids": []
}
```

## OQ-reveal-052 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-reveal-052",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "reveal-journey",
  "summary": "KB-077 ('block ở trang cảm ơn / trạng thái đơn gọi API Mysbox để mở box'): trên staging block chỉ đọc customer/boxes, còn lệnh mở do trang reveal/winner gọi ở tab mới. Câu trong tài liệu nghĩa là block tự gọi lệnh mở, hay chỉ gọi API phục vụ việc mở? Check CHK-042 đang dùng KB-077 làm oracle.",
  "kb_ids": [
    "reveal-journey#KB-092",
    "reveal-journey#KB-077",
    "reveal-journey#KB-009"
  ]
}
```

## OQ-reveal-053 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-reveal-053",
  "type": "OPEN_ISSUE",
  "feature_id": "reveal-journey",
  "summary": "GET staging-api /api/orders/{id}/boxes?shop= trả kết quả bốc thăm + dữ liệu variant/tồn kho mà capture không thấy header auth. Cần xác nhận cơ chế bảo vệ.",
  "kb_ids": [
    "reveal-journey#KB-106"
  ],
  "tags": [
    "security-observation"
  ]
}
```

## OQ-reveal-054 — CONFLICT

```json
{
  "oq_id": "OQ-reveal-054",
  "type": "CONFLICT",
  "feature_id": "reveal-journey",
  "summary": "Màn kết quả của Multi-unbox (trang winner) không hiện tỉ lệ chance dù 'Hide winner chance' không bật (Unbox lẻ cùng box có hiện Chance). Màn kết quả của mọi đường mở có hiện chance không, hay Multi-unbox cố ý ẩn?",
  "side_a": "Base KB-058: Theo tài liệu Mysbox Product KB v1 \"Hành trình reveal (mở box)\" §Màn hình reveal, màn hình kết quả hiển thị tỉ lệ (\"chance\") của quà, trừ khi merchant bật \"Hide winner chance\".",
  "side_b": "Quan sát staging KB-096: Khi bấm \"Multi-unbox\" của đơn #1007 (1/2 đã mở) trên \"Your orders\" ở guest buyer/staging/box 1023 Single animation drawing, quan sát thấy app gọi POST /apps/mysbox/api/orders/{id}/unopened-boxes/open (endpoint khác Unbox đơn lẻ, không có box_version_id/quantity), đơn thành 2/2, và trang winner hiện ngay \"🎉 Congratulations! Your lucky item is revealed 🎉\" với cả 2 quà của đơn (gồm quà đã mở trước), không có animation và không có dòng \"Chance\"; nút \"Open more\", \"Share unboxing\", \"Back\".",
  "conflict_group": "CONF-reveal-04",
  "kb_ids": [
    "reveal-journey#KB-058",
    "reveal-journey#KB-096"
  ],
  "check_ids": [
    "reveal-journey:CHK-025"
  ]
}
```

## OQ-reveal-055 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-reveal-055",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": null,
  "summary": "Item mới quan sát trên staging (OBSERVED_CURRENT) chạm tiền/permission/token, được gắn cờ rủi ro khi diff: cần owner (PO) xác nhận hành vi quan sát là ý định sản phẩm trước khi dùng làm kỳ vọng. Item vẫn publish dạng OBSERVED_CURRENT; không phải xác nhận hành vi production.",
  "owner_role": "PO",
  "kb_ids": [
    "customer-portal-access-magic-link#KB-029",
    "customer-portal-access-magic-link#KB-031",
    "customer-portal-access-magic-link#KB-032",
    "customer-portal-access-magic-link#KB-034",
    "reveal-journey#KB-106"
  ]
}
```

## OQ-reveal-056 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-reveal-056",
  "type": "OPEN_ISSUE",
  "feature_id": "auto-unbox",
  "summary": "Giá trị setting auto-unbox (và các setting General Settings khác) được đọc từ đâu khi GET /api/users/config trả {\"data\": null}? — Không có nguồn API để viết check đọc/ghi setting (KB-067).",
  "kb_ids": [
    "auto-unbox#KB-067"
  ]
}
```

## OQ-reveal-057 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-reveal-057",
  "type": "OPEN_ISSUE",
  "feature_id": "reveal-journey",
  "summary": "Kết quả quà có chủ ý được trả về (và nằm trong DOM) ngay khi trang reveal load, trước khi khách tương tác? — Ảnh hưởng expected cho trải nghiệm reveal và check 'kết quả chỉ lộ sau hiệu ứng' (KB-091).",
  "kb_ids": [
    "reveal-journey#KB-091"
  ]
}
```

## OQ-reveal-058 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-reveal-058",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "auto-unbox",
  "summary": "Trên staging, pane Auto-Unbox khi checkbox tắt chỉ hiện checkbox, không có ô \"Auto-unbox after\" / \"Enable auto-unbox trigger\" / \"Trigger before\" như tài liệu mô tả. Các ô này chỉ hiện khi bật checkbox (và giá trị mặc định 2 / 1 có giữ không), hay tài liệu đã cũ?",
  "kb_ids": [
    "auto-unbox#KB-065"
  ],
  "check_ids": [
    "auto-unbox:CHK-022"
  ]
}
```

## OQ-reveal-059 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-reveal-059",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "customer-portal-access-magic-link",
  "summary": "Check customer-portal-access-magic-link:CHK-021 \"Trang \"Your orders\" của khách gọi GET /apps/mysbox/api/orders với header customer-id/customer-token và chip lọc\" có oracle BASELINE (chỉ dựa trên quan sát staging OBSERVED_CURRENT — lệch là cần điều tra, chưa phải bug). Cần PO/Dev xác nhận hành vi mong đợi.",
  "kb_ids": [
    "customer-portal-access-magic-link#KB-033",
    "customer-portal-access-magic-link#KB-030"
  ],
  "check_ids": [
    "customer-portal-access-magic-link:CHK-021"
  ]
}
```

## OQ-reveal-060 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-reveal-060",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "reveal-journey",
  "summary": "Staging thấy lệnh mở box do trang reveal (tab mới) gọi ngay khi load và response đã chứa sẵn món trúng; khối trang cảm ơn không tự gọi lệnh mở. Đây có đúng thiết kế không, và tài liệu \"block gọi API Mysbox để mở box\" ý là block gọi trực tiếp hay trang reveal gọi? Route/mã lỗi chính thức của lệnh mở là gì?",
  "kb_ids": [
    "reveal-journey#KB-091"
  ],
  "check_ids": [
    "reveal-journey:CHK-056"
  ]
}
```

## OQ-reveal-061 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-reveal-061",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "reveal-journey",
  "summary": "Endpoint Multi-unbox trả order_linked_id kiểu số trong khi endpoint mở lẻ trả kiểu chuỗi, và trang winner không có animation. Đây có phải hành vi chủ ý không?",
  "kb_ids": [
    "reveal-journey#KB-101"
  ],
  "check_ids": [
    "reveal-journey:CHK-057"
  ]
}
```

## OQ-reveal-062 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-reveal-062",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "reveal-journey",
  "summary": "Check reveal-journey:CHK-058 \"Trang khách đọc đơn qua GET /apps/mysbox/api/orders/{shopify_order_id}\" có oracle BASELINE (chỉ dựa trên quan sát staging OBSERVED_CURRENT — lệch là cần điều tra, chưa phải bug). Cần PO/Dev xác nhận hành vi mong đợi.",
  "kb_ids": [
    "reveal-journey#KB-102"
  ],
  "check_ids": [
    "reveal-journey:CHK-058"
  ]
}
```

## OQ-reveal-063 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-reveal-063",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "reveal-journey",
  "summary": "Check reveal-journey:CHK-059 \"Trang reveal tải box version, thông tin variant quà và cờ resellable qua app proxy\" có oracle BASELINE (chỉ dựa trên quan sát staging OBSERVED_CURRENT — lệch là cần điều tra, chưa phải bug). Cần PO/Dev xác nhận hành vi mong đợi.",
  "kb_ids": [
    "reveal-journey#KB-103",
    "reveal-journey#KB-104",
    "reveal-journey#KB-105"
  ],
  "check_ids": [
    "reveal-journey:CHK-059"
  ]
}
```

## OQ-reveal-064 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-reveal-064",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "reveal-journey",
  "summary": "Khi mọi box của đơn đã mở, khối Mysbox trên order status page vẫn giữ tiêu đề \"Unbox your mystery box now!\" (chỉ nút đổi thành \"View details\"). Tiêu đề có nên đổi khi đã mở hết không?",
  "kb_ids": [
    "reveal-journey#KB-097"
  ],
  "check_ids": [
    "reveal-journey:CHK-060"
  ]
}
```
