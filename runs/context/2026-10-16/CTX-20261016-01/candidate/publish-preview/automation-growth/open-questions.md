# Open Questions — automation-growth

Tổng: 99 mục (CONFLICT 12 · OPEN_ISSUE 34 · NEEDS_CONFIRMATION 53). Sinh từ bootstrap DOC_BOOTSTRAP đầu tiên của Mysbox (nguồn: bộ Product KB v1 do dev viết từ source code, 2026-10-16). Mỗi mục là một khối json; `kb_ids` dạng `<feature_key>#KB-xxx` (hoặc `_object-level#KB-xxx` cho tầng object), `check_ids` dạng `<feature_key>:CHK-xxx`.

## OQ-automation-growth-001 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-automation-growth-001",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": null,
  "summary": "Bộ tài liệu nguồn không chỉ định role mặc định cho object này (bootstrap-request để role null): các KB item mang scope.role theo vai trò tài liệu nêu cho từng hành vi, hoặc \"unspecified\" khi tài liệu không nêu. Cần PO/Dev xác nhận ma trận role → quyền thực tế trên production (merchant owner/staff, khách, admin Mysbox theo từng role) trước khi dùng các check PERMISSION làm oracle."
}
```

## OQ-automation-growth-002 — CONFLICT

```json
{
  "oq_id": "OQ-automation-growth-002",
  "type": "CONFLICT",
  "feature_id": "affiliate-referral-tracking",
  "summary": "Mâu thuẫn về sự kiện vòng đời shop gửi sang dịch vụ affiliate khi merchant gỡ hoặc cài lại app. Mâu thuẫn nằm ngay trong cùng một tài liệu. Cần dev xác nhận: khi gỡ/cài lại app, Mysbox có xoá/khôi phục Customer ở dịch vụ affiliate (bằng thao tác riêng hay bằng event) hay không làm gì.",
  "side_a": "Tài liệu \"Affiliate / referral tracking và sync Partner events\" §Journey từng bước: bản ghi shop ở dịch vụ affiliate bị xoá khi gỡ app và khôi phục khi cài lại; tài liệu \"Banner thông báo trong admin và mọi email/thông báo của app\" §Mọi sự kiện → kênh → người nhận → điều kiện cũng nêu sự kiện sang dịch vụ affiliate khi gỡ/cài lại app.",
  "side_b": "Tài liệu \"Affiliate / referral tracking và sync Partner events\" §Trường hợp biên: các event installed, trial, uninstalled, reinstalled có trong thư viện nhưng Mysbox chỉ gửi subscribed / unsubscribed.",
  "conflict_group": "CONF-automation-growth-01",
  "kb_ids": [
    "affiliate-referral-tracking#KB-006",
    "affiliate-referral-tracking#KB-021",
    "affiliate-referral-tracking#KB-022",
    "affiliate-referral-tracking#KB-027"
  ],
  "check_ids": [
    "affiliate-referral-tracking:CHK-011"
  ]
}
```

## OQ-automation-growth-003 — CONFLICT

```json
{
  "oq_id": "OQ-automation-growth-003",
  "type": "CONFLICT",
  "feature_id": "dashboard-notification-banners",
  "summary": "Hai tài liệu ghi khác nhau nhãn của lựa chọn gói Shopify khớp tên gói grow/shopify trong bộ lọc đối tượng banner. Cần dev/PO xác nhận nhãn hiển thị thật để tester chọn đúng đối tượng.",
  "side_a": "Tài liệu \"Banner thông báo trong admin và mọi email/thông báo của app\" §Ai thấy banner: lựa chọn \"Shopify\" khớp tên gói grow và shopify.",
  "side_b": "Tài liệu \"Banner, widget dashboard, Analytic, export, các màn nhỏ khác\" §Notifications (banner dashboard): bộ lọc gói Shopify có các giá trị Basic, Grow, Advanced, Plus, Trial.",
  "conflict_group": "CONF-automation-growth-02",
  "kb_ids": [
    "dashboard-notification-banners#KB-049",
    "dashboard-notification-banners#KB-050"
  ],
  "check_ids": [
    "dashboard-notification-banners:CHK-010"
  ]
}
```

## OQ-automation-growth-004 — CONFLICT

```json
{
  "oq_id": "OQ-automation-growth-004",
  "type": "CONFLICT",
  "feature_id": "recent-pulls-feed",
  "summary": "Lượt reveal xảy ra khi \"Show recent pulls\" đang tắt có được Resync đưa lên feed sau khi bật công tắc không, trên production. Mâu thuẫn trong cùng tài liệu Recent pulls; cần dev xác nhận câu hỏi thường gặp áp cho môi trường nào.",
  "side_a": "Mysbox Product KB v1 \"Recent pulls (feed \"vừa trúng\" ở trang sản phẩm)\" §Bước 1 — Một lượt reveal xảy ra (trước thay đổi trên build-staging, chỉ ghi lịch sử khi feed bật) và Mysbox Product KB v1 \"Playbook 3: storefront, widget, theme và trang khách\" §Feed recent pulls thiếu / sai / hiện đơn test (trên production feed tắt thì không ghi gì)",
  "side_b": "Mysbox Product KB v1 \"Recent pulls (feed \"vừa trúng\" ở trang sản phẩm)\" §Câu hỏi thường gặp (sau khi bật công tắc, lượt cũ chỉ lên feed sau khi bấm Resync — hàm ý lượt cũ có trong lịch sử)",
  "conflict_group": "CONF-automation-growth-03",
  "kb_ids": [
    "recent-pulls-feed#KB-021",
    "recent-pulls-feed#KB-061"
  ],
  "check_ids": [
    "recent-pulls-feed:CHK-014"
  ]
}
```

## OQ-automation-growth-005 — CONFLICT

```json
{
  "oq_id": "OQ-automation-growth-005",
  "type": "CONFLICT",
  "feature_id": "recent-pulls-feed",
  "summary": "Entry feed công khai có trường box_count hay không: danh sách trường \"chỉ chứa\" không có box_count, trong khi ví dụ có số ghi một entry (box_count 2). Mâu thuẫn trong cùng tài liệu Recent pulls; không ảnh hưởng tính ẩn danh nhưng cần dev xác nhận danh sách trường đầy đủ.",
  "side_a": "Mysbox Product KB v1 \"Recent pulls (feed \"vừa trúng\" ở trang sản phẩm)\" §Ẩn danh (feed chỉ chứa mã entry, thời điểm mở, variant id + pool/tier id)",
  "side_b": "Mysbox Product KB v1 \"Recent pulls (feed \"vừa trúng\" ở trang sản phẩm)\" §Ví dụ có số (một entry có box_count 2)",
  "conflict_group": "CONF-automation-growth-04",
  "kb_ids": [
    "recent-pulls-feed#KB-033",
    "recent-pulls-feed#KB-034"
  ],
  "check_ids": [
    "recent-pulls-feed:CHK-019"
  ]
}
```

## OQ-automation-growth-006 — CONFLICT

```json
{
  "oq_id": "OQ-automation-growth-006",
  "type": "CONFLICT",
  "feature_id": "recent-pulls-feed",
  "summary": "Setting \"visible from\" của Recent pulls có trên màn hình Style settings của merchant app không, và ai đổi được nó. Tài liệu Recent pulls nói không có màn hình (tài liệu General Settings xếp nó vào nhóm setting ẩn do nhân viên Mysbox đổi trong back-office), còn playbook hỗ trợ liệt kê nó trong cài đặt portal Style settings → Recent pulls cùng với \"publish test orders\" (vốn chỉ có trên build-staging).",
  "side_a": "Mysbox Product KB v1 \"Recent pulls (feed \"vừa trúng\" ở trang sản phẩm)\" §Setting (Style Settings → \"Recent pulls\") (recent_pulls_visible_from không có màn hình)",
  "side_b": "Mysbox Product KB v1 \"Playbook 3: storefront, widget, theme và trang khách\" §Feed recent pulls thiếu / sai / hiện đơn test (portal Style settings → Recent pulls: công tắc, \"visible from\", \"publish test orders\")",
  "conflict_group": "CONF-automation-growth-05",
  "kb_ids": [
    "recent-pulls-feed#KB-055",
    "recent-pulls-feed#KB-056"
  ],
  "check_ids": [
    "recent-pulls-feed:CHK-016"
  ]
}
```

## OQ-automation-growth-007 — CONFLICT

```json
{
  "oq_id": "OQ-automation-growth-007",
  "type": "CONFLICT",
  "feature_id": "share-unboxing",
  "summary": "Cần dev xác nhận đơn khác tiền tệ báo cáo có được đếm vào số đơn của link chia sẻ hay chỉ không được tính doanh thu, và đơn test có xuất hiện trong số đơn không. Mâu thuẫn nằm trong cùng một tài liệu (mục luồng ghi nhận và mục câu hỏi thường gặp).",
  "side_a": "Tài liệu \"Share unboxing\" §Đơn đến từ link giới thiệu và độ trễ: doanh thu chỉ tính khi cùng tiền tệ báo cáo (không quy đổi) — ngụ ý đơn vẫn được ghi",
  "side_b": "Cùng tài liệu §Câu hỏi thường gặp: liệt kê \"khác tiền tệ\" (và \"đơn test\") như lý do đơn từ link chưa được ghi",
  "conflict_group": "CONF-automation-growth-07",
  "kb_ids": [
    "share-unboxing#KB-113",
    "share-unboxing#KB-126"
  ],
  "check_ids": [
    "share-unboxing:CHK-017"
  ]
}
```

## OQ-automation-growth-008 — CONFLICT

```json
{
  "oq_id": "OQ-automation-growth-008",
  "type": "CONFLICT",
  "feature_id": "share-unboxing",
  "summary": "Cần xác nhận merchant có tự tắt được tính năng share unboxing trên màn hình Style settings hay công tắc chỉ nằm ở cấu hình nội bộ của nhân viên Mysbox.",
  "side_a": "Tài liệu \"Share unboxing\" §Setting của merchant và \"General Settings\" §Setting ẩn: công tắc share_unboxing_enabled không có màn hình, chỉ nhân viên Mysbox đổi qua cấu hình nội bộ",
  "side_b": "Playbook 5 (tài khoản, kết nối, gỡ/cài app và tích hợp) §Ảnh share bị thiếu / link share lỗi: merchant tắt share ở Style settings -> Share",
  "conflict_group": "CONF-automation-growth-08",
  "kb_ids": [
    "share-unboxing#KB-011",
    "share-unboxing#KB-136"
  ],
  "check_ids": [
    "share-unboxing:CHK-014"
  ]
}
```

## OQ-automation-growth-009 — CONFLICT

```json
{
  "oq_id": "OQ-automation-growth-009",
  "type": "CONFLICT",
  "feature_id": "share-unboxing",
  "summary": "Cần xác nhận khi công tắc share của shop tắt thì nút Share ở storefront bị ẩn, hay nút vẫn hiện và tạo link báo lỗi \"forbidden\" kèm toast.",
  "side_a": "Playbook 5 §Ảnh share bị thiếu / link share lỗi: công tắc share của shop tắt thì khách không thấy nút Share",
  "side_b": "Tài liệu \"Share unboxing\" §Setting của merchant: khi công tắc tắt, gọi tạo link báo \"forbidden\" và hiện toast lỗi; tự ghi chưa xác nhận nút có bị ẩn",
  "conflict_group": "CONF-automation-growth-09",
  "kb_ids": [
    "share-unboxing#KB-073",
    "share-unboxing#KB-135"
  ],
  "check_ids": [
    "share-unboxing:CHK-013"
  ]
}
```

## OQ-automation-growth-010 — CONFLICT

```json
{
  "oq_id": "OQ-automation-growth-010",
  "type": "CONFLICT",
  "feature_id": "shopify-flow-actions",
  "summary": "Cần dev xác nhận khoá của bộ giới hạn 60 lần gọi action Flow mỗi phút (theo shop hay toàn cục) và hành vi khi vượt giới hạn trước khi dùng làm boundary test. Mâu thuẫn nằm ngay trong cùng một tài liệu (câu sau tự khai chưa xác nhận).",
  "side_a": "Tài liệu \"Shopify Flow: trigger, action và công thức mẫu\" §Bước 3 (cùng \"Tích hợp: tổng quan và cách xác thực request\", \"Banner thông báo trong admin và mọi email/thông báo của app\", Playbook 5): giới hạn 60 lần gọi/phút/shop",
  "side_b": "Cùng tài liệu \"Shopify Flow: trigger, action và công thức mẫu\" §Bước 3, câu kế tiếp tự khai chưa xác nhận Flow có gửi mã shop cho bộ giới hạn; nếu không, mọi shop dùng chung một xô",
  "conflict_group": "CONF-automation-growth-06",
  "kb_ids": [
    "shopify-flow-actions#KB-031",
    "shopify-flow-actions#KB-032"
  ],
  "check_ids": [
    "shopify-flow-actions:CHK-016"
  ]
}
```

## OQ-automation-growth-011 — CONFLICT

```json
{
  "oq_id": "OQ-automation-growth-011",
  "type": "CONFLICT",
  "feature_id": "system-emails-and-notifications",
  "summary": "Email hết dung lượng có được gửi cho shop đã vượt hạn mức từ trước khi shop cài lại app hoặc bị chuyển về Free/hạ gói hay không. Cùng tài liệu banner và email nói hai điều khác nhau; cũng cần rõ hạ gói giữa hai gói trả phí có gửi email không.",
  "side_a": "Tài liệu \"Banner thông báo trong admin và mọi email/thông báo của app\" — bảng email gửi merchant và bảng mọi sự kiện: email được gửi cả khi shop bị chuyển về Free/hạ gói hoặc cài lại app trong lúc đã vượt hạn mức (tài liệu \"Nâng, hạ, huỷ plan và trang xem trước thay đổi\" có ví dụ huỷ rồi cài lại cũng gửi email).",
  "side_b": "Tài liệu \"Banner thông báo trong admin và mọi email/thông báo của app\" — mục câu hỏi thường gặp: email dung lượng chỉ gửi đúng lúc vượt, nên merchant đã vượt hạn mức từ trước không nhận email.",
  "conflict_group": "CONF-automation-growth-10",
  "kb_ids": [
    "system-emails-and-notifications#KB-022",
    "system-emails-and-notifications#KB-023",
    "system-emails-and-notifications#KB-024",
    "system-emails-and-notifications#KB-025",
    "system-emails-and-notifications#KB-026"
  ],
  "check_ids": [
    "system-emails-and-notifications:CHK-017"
  ]
}
```

## OQ-automation-growth-012 — CONFLICT

```json
{
  "oq_id": "OQ-automation-growth-012",
  "type": "CONFLICT",
  "feature_id": "system-emails-and-notifications",
  "summary": "Nội dung email hết dung lượng hiện chạy trên production gồm những gì: có link trang giá/link quản lý đơn và tên shop hay vẫn là bản cũ (tên chủ shop, quota, phí usage, không link).",
  "side_a": "Tài liệu \"Banner thông báo trong admin và mọi email/thông báo của app\" — bảng email gửi merchant: email gói Free chứa tên shop, giới hạn box, ngày kết thúc dung lượng, link trang giá; email gói trả phí chứa tên shop, giới hạn, ngày, phí tối thiểu, link quản lý đơn — không gắn thẻ chỉ có trên staging.",
  "side_b": "Tài liệu \"Plan và capacity (quota)\" mục Chạm giới hạn và \"Playbook 4: billing, plan, capacity, mã giảm giá\" mục email capacity reached: nội dung mới có link chỉ có trên nhánh build-staging; production vẫn gửi bản cũ (tên chủ shop, quota, phí usage, không link).",
  "conflict_group": "CONF-automation-growth-11",
  "kb_ids": [
    "system-emails-and-notifications#KB-027",
    "system-emails-and-notifications#KB-028",
    "system-emails-and-notifications#KB-029"
  ],
  "check_ids": [
    "system-emails-and-notifications:CHK-018"
  ]
}
```

## OQ-automation-growth-013 — CONFLICT

```json
{
  "oq_id": "OQ-automation-growth-013",
  "type": "CONFLICT",
  "feature_id": "system-emails-and-notifications",
  "summary": "Lưu form Edit shop ở admin panel có đồng bộ shop sang Brevo/CRM khi chỉ đổi trường không nằm trong danh sách theo dõi hay không.",
  "side_a": "Tài liệu \"Màn Shops (danh sách, chi tiết, sửa, action)\" — form Edit: lưu bất kỳ trường nào cũng đồng bộ shop sang công cụ email/CRM.",
  "side_b": "Tài liệu \"Banner thông báo trong admin và mọi email/thông báo của app\" — bảng mọi sự kiện: cập nhật contact Brevo do hồ sơ shop đổi chỉ xảy ra khi một trường được theo dõi thay đổi.",
  "conflict_group": "CONF-automation-growth-12",
  "kb_ids": [
    "system-emails-and-notifications#KB-046",
    "system-emails-and-notifications#KB-047"
  ],
  "check_ids": [
    "system-emails-and-notifications:CHK-016"
  ]
}
```

## OQ-automation-growth-014 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-automation-growth-014",
  "type": "OPEN_ISSUE",
  "feature_id": "affiliate-referral-tracking",
  "summary": "Giới hạn đã biết: merchant cài app nhưng mở portal lần đầu quá 30 phút sau khi cài (ví dụ bỏ giữa chừng) thì không gắn được affiliate cho shop đó. Cần PO quyết định đây là hành vi chấp nhận hay lỗi cần sửa; trong lúc chờ, chỉ dùng làm regression watch, không làm oracle.",
  "kb_ids": [
    "affiliate-referral-tracking#KB-026"
  ],
  "check_ids": [
    "affiliate-referral-tracking:CHK-005"
  ]
}
```

## OQ-automation-growth-015 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-automation-growth-015",
  "type": "OPEN_ISSUE",
  "feature_id": "affiliate-referral-tracking",
  "summary": "Mốc 30 phút tính từ thời điểm nào (tạo shop hay cài app), và đúng 30 phút thì được chấp nhận hay từ chối? — Boundary test của luật 'Instance is too old'.",
  "kb_ids": [
    "affiliate-referral-tracking#KB-016"
  ]
}
```

## OQ-automation-growth-016 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-automation-growth-016",
  "type": "OPEN_ISSUE",
  "feature_id": "affiliate-referral-tracking",
  "summary": "HTTP status, field kỹ thuật và cơ chế xác thực của POST api/affiliate/tracking-id và POST api/affiliate/customers là gì? — Không kiểm được contract API và negative auth.",
  "kb_ids": [
    "affiliate-referral-tracking#KB-012",
    "affiliate-referral-tracking#KB-015"
  ]
}
```

## OQ-automation-growth-017 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-automation-growth-017",
  "type": "OPEN_ISSUE",
  "feature_id": "affiliate-referral-tracking",
  "summary": "Khi dịch vụ affiliate lỗi lúc cấp tracking id hoặc đăng ký Customer thì Mysbox xử lý thế nào (retry, thông báo, lưu trạng thái)? — Referral có thể mất im lặng.",
  "kb_ids": [
    "affiliate-referral-tracking#KB-013",
    "affiliate-referral-tracking#KB-018"
  ]
}
```

## OQ-automation-growth-018 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-automation-growth-018",
  "type": "OPEN_ISSUE",
  "feature_id": "affiliate-referral-tracking",
  "summary": "Thời hạn sống của cookie koin_trkcd là bao lâu? — Ảnh hưởng việc ghi nhận referral khi merchant cài app muộn sau khi bấm link.",
  "kb_ids": [
    "affiliate-referral-tracking#KB-014",
    "affiliate-referral-tracking#KB-041"
  ]
}
```

## OQ-automation-growth-019 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-automation-growth-019",
  "type": "OPEN_ISSUE",
  "feature_id": "affiliate-referral-tracking",
  "summary": "Giá trị PREFIX, tên cờ môi trường pricing affiliate, mã giảm giá đặc biệt cụ thể và thứ tự ưu tiên giữa mã dạng có REF và dạng ngắn khi cả hai tồn tại là gì? — Cần để dựng case tự áp mã affiliate.",
  "kb_ids": [
    "affiliate-referral-tracking#KB-001",
    "affiliate-referral-tracking#KB-002"
  ]
}
```

## OQ-automation-growth-020 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-automation-growth-020",
  "type": "OPEN_ISSUE",
  "feature_id": "dashboard-notification-banners",
  "summary": "Màn Upload Image chỉ phục vụ banner hay dùng chung cho mục đích khác của admin panel? — Quyết định giữ capability này trong feature banner hay tách feature riêng.",
  "kb_ids": [
    "dashboard-notification-banners#KB-070"
  ]
}
```

## OQ-automation-growth-021 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-automation-growth-021",
  "type": "OPEN_ISSUE",
  "feature_id": "partner-events-bigquery-sync",
  "summary": "Lỗi đã biết: sync Partner events sang BigQuery chỉ nối thêm và BigQuery không khử trùng, nên chạy lại một ngày đã sync (kể cả bằng lệnh backfill) làm nhân đôi dòng. Cần dev/PO xác nhận hướng xử lý (khử trùng, idempotency) và quy trình an toàn khi nạp bù; trong lúc chờ, chỉ dùng làm regression watch.",
  "kb_ids": [
    "partner-events-bigquery-sync#KB-016"
  ],
  "check_ids": [
    "partner-events-bigquery-sync:CHK-009"
  ]
}
```

## OQ-automation-growth-022 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-automation-growth-022",
  "type": "OPEN_ISSUE",
  "feature_id": "partner-events-bigquery-sync",
  "summary": "Khi không tìm thấy bản ghi shop của Mysbox, các cột gói / quốc gia / email trong BigQuery được ghi giá trị gì? — Kỳ vọng dữ liệu cho shop không còn bản ghi.",
  "kb_ids": [
    "partner-events-bigquery-sync#KB-009"
  ]
}
```

## OQ-automation-growth-023 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-automation-growth-023",
  "type": "OPEN_ISSUE",
  "feature_id": "partner-events-bigquery-sync",
  "summary": "Endpoint cụ thể của Shopify Partner API được gọi là gì, và khi một trang lỗi giữa chừng thì dữ liệu một phần có được ghi không? — Job chỉ thử một lần; cần biết trạng thái dữ liệu sau lỗi giữa chừng.",
  "kb_ids": [
    "partner-events-bigquery-sync#KB-002",
    "partner-events-bigquery-sync#KB-010",
    "partner-events-bigquery-sync#KB-018"
  ]
}
```

## OQ-automation-growth-024 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-automation-growth-024",
  "type": "OPEN_ISSUE",
  "feature_id": "partner-events-bigquery-sync",
  "summary": "'Chạy lệnh sync' của nhân viên admin (nêu ở mức nhóm tính năng) có phải là lệnh sync Partner events sang BigQuery không? — Nếu đúng, có thêm actor admin-staff và entry point ở admin panel cho feature này.",
  "kb_ids": [
    "_object-level#KB-001"
  ]
}
```

## OQ-automation-growth-025 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-automation-growth-025",
  "type": "OPEN_ISSUE",
  "feature_id": "recent-pulls-feed",
  "summary": "Hạn chế đã biết: resell, hoàn tiền và huỷ đơn không được phản ánh vào feed Recent pulls (món đã bán lại vẫn hiện). Theo dõi như regression watch; cần PO xác nhận vẫn là hạn chế được chấp nhận và có kế hoạch sửa hay không.",
  "kb_ids": [
    "recent-pulls-feed#KB-079"
  ],
  "check_ids": [
    "recent-pulls-feed:CHK-028"
  ]
}
```

## OQ-automation-growth-026 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-automation-growth-026",
  "type": "OPEN_ISSUE",
  "feature_id": "recent-pulls-feed",
  "summary": "Hạn chế lưu trữ đã biết của feed: entry lớn hơn 128 KB không ghi được, và khoá metafield của các trang feed cũ không được dọn. Chưa rõ entry quá lớn bị bỏ hẳn, thử lại hay có báo lỗi/log.",
  "kb_ids": [
    "recent-pulls-feed#KB-080",
    "recent-pulls-feed#KB-081"
  ],
  "check_ids": [
    "recent-pulls-feed:CHK-029",
    "recent-pulls-feed:CHK-030"
  ]
}
```

## OQ-automation-growth-027 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-automation-growth-027",
  "type": "OPEN_ISSUE",
  "feature_id": "recent-pulls-feed",
  "summary": "Merchant có tự chạy Resync được không, hay chỉ nhân viên nội bộ trong admin panel? (tài liệu viết \"bấm Resync\" ở phía merchant nhưng thao tác nằm ở admin panel) — Role mơ hồ; quyết định ai thực hiện bước áp cấu hình mới cho feed đã publish.",
  "kb_ids": [
    "recent-pulls-feed#KB-038",
    "recent-pulls-feed#KB-060",
    "recent-pulls-feed#KB-074"
  ]
}
```

## OQ-automation-growth-028 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-automation-growth-028",
  "type": "OPEN_ISSUE",
  "feature_id": "recent-pulls-feed",
  "summary": "Feed hiển thị mọi món trúng hay chỉ món hiếm? — Ví dụ ngụ ý món hiếm nhưng không có quy tắc lọc; không suy ra từ ví dụ.",
  "kb_ids": [
    "recent-pulls-feed#KB-005",
    "recent-pulls-feed#KB-009"
  ]
}
```

## OQ-automation-growth-029 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-automation-growth-029",
  "type": "OPEN_ISSUE",
  "feature_id": "recent-pulls-feed",
  "summary": "Quyền hide_recent_pull/resync_recent_pulls gán cho role admin nào, và trang admin hiển thị gì khi thiếu quyền? — Không có oracle permission negative cho tab Recent pulls.",
  "kb_ids": [
    "recent-pulls-feed#KB-065",
    "recent-pulls-feed#KB-066",
    "recent-pulls-feed#KB-067"
  ]
}
```

## OQ-automation-growth-030 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-automation-growth-030",
  "type": "OPEN_ISSUE",
  "feature_id": "recent-pulls-feed",
  "summary": "Resync và Hide from recent pulls báo hoàn tất hoặc thất bại cho nhân viên thế nào (ngoài nhãn \"Retry hiding\")? Unpublish/Delete box có hộp xác nhận không? — Các thao tác chạy nền; không có tín hiệu hoàn tất để kiểm.",
  "kb_ids": [
    "recent-pulls-feed#KB-073",
    "recent-pulls-feed#KB-076",
    "recent-pulls-feed#KB-077"
  ]
}
```

## OQ-automation-growth-031 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-automation-growth-031",
  "type": "OPEN_ISSUE",
  "feature_id": "recent-pulls-feed",
  "summary": "Mỗi sự kiện đầu vào của nhóm (mở box, resell xong, hết hàng, auto-unbox sắp tới) đi vào tính năng nào giữa Shopify Flow, Share unboxing và Recent pulls? — Sơ đồ tổng quan vẽ chung một danh sách sự kiện cho ba tính năng; tester không biết sự kiện nào kích hoạt feed.",
  "kb_ids": [
    "_object-level#KB-002"
  ]
}
```

## OQ-automation-growth-032 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-automation-growth-032",
  "type": "OPEN_ISSUE",
  "feature_id": "share-unboxing",
  "summary": "Trên bản staging đã kiểm, storefront không gọi endpoint ghi sự kiện mở popup và hành động chia sẻ nên \"Popup opens\" và \"Share actions\" có thể luôn bằng 0. Tài liệu tự ghi mới tìm trong code, chưa chạy end-to-end; cần xác nhận lỗi có thật không.",
  "kb_ids": [
    "share-unboxing#KB-097"
  ],
  "check_ids": [
    "share-unboxing:CHK-020"
  ]
}
```

## OQ-automation-growth-033 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-automation-growth-033",
  "type": "OPEN_ISSUE",
  "feature_id": "share-unboxing",
  "summary": "Token của link chia sẻ là công khai nên bất kỳ ai cũng có thể gắn ref=sl_<token> vào link mua để đơn được ghi cho link chia sẻ. Tài liệu coi là chỉ ảnh hưởng thống kê; cần xác nhận đây là giới hạn được chấp nhận hay lỗi cần sửa.",
  "kb_ids": [
    "share-unboxing#KB-114"
  ],
  "check_ids": [
    "share-unboxing:CHK-021"
  ]
}
```

## OQ-automation-growth-034 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-automation-growth-034",
  "type": "OPEN_ISSUE",
  "feature_id": "share-unboxing",
  "summary": "Chưa có màn hình nào cho merchant hay admin nội bộ xem kết quả share unboxing; số liệu chỉ nằm sau endpoint tóm tắt chưa được trang nào gọi. Cần xác nhận kế hoạch hiển thị.",
  "kb_ids": [
    "share-unboxing#KB-115"
  ],
  "check_ids": [
    "share-unboxing:CHK-022"
  ]
}
```

## OQ-automation-growth-035 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-automation-growth-035",
  "type": "OPEN_ISSUE",
  "feature_id": "share-unboxing",
  "summary": "Hệ thống không lên lịch bù kiểm tra nguồn đơn cho các đơn thanh toán trước khi shop tạo link chia sẻ đầu tiên. Cần xác nhận đây là hành vi chủ đích hay lỗi.",
  "kb_ids": [
    "share-unboxing#KB-146"
  ],
  "check_ids": [
    "share-unboxing:CHK-023"
  ]
}
```

## OQ-automation-growth-036 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-automation-growth-036",
  "type": "OPEN_ISSUE",
  "feature_id": "share-unboxing",
  "summary": "Số liệu analytics chia sẻ bị mất do job lỗi không được tính lại. Cần xác nhận có cơ chế tính lại hay đây là giới hạn đã biết.",
  "kb_ids": [
    "share-unboxing#KB-148"
  ],
  "check_ids": [
    "share-unboxing:CHK-024"
  ]
}
```

## OQ-automation-growth-037 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-automation-growth-037",
  "type": "OPEN_ISSUE",
  "feature_id": "shopify-flow-actions",
  "summary": "Route, method, header chữ ký và mã phản hồi của các action (thành công, chữ ký sai, đơn không tìm thấy) là gì? — Không có contract cụ thể để kiểm request bị từ chối hay thông báo lỗi trả về Flow.",
  "kb_ids": [
    "shopify-flow-actions#KB-016",
    "shopify-flow-actions#KB-017",
    "shopify-flow-actions#KB-022"
  ]
}
```

## OQ-automation-growth-038 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-automation-growth-038",
  "type": "OPEN_ISSUE",
  "feature_id": "shopify-flow-actions",
  "summary": "\"Remove order boxes\" phản hồi thế nào khi đơn chỉ có box physical hoặc khi dùng cho dòng box physical? — Negative case cho điều kiện chỉ áp cho dòng box digital.",
  "kb_ids": [
    "shopify-flow-actions#KB-008",
    "shopify-flow-actions#KB-009"
  ]
}
```

## OQ-automation-growth-039 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-automation-growth-039",
  "type": "OPEN_ISSUE",
  "feature_id": "shopify-flow-triggers",
  "summary": "Tài liệu mô tả như lỗi đã biết: trigger Shopify Flow gửi bằng job nền không retry nên khi Shopify từ chối hoặc hàng đợi lỗi thì sự kiện mất, và không có công cụ admin nào để phát lại trigger. Cần biết đây là hành vi được chấp nhận hay lỗi có kế hoạch sửa, và QA nên kiểm thế nào.",
  "kb_ids": [
    "shopify-flow-triggers#KB-015",
    "shopify-flow-triggers#KB-016"
  ],
  "check_ids": [
    "shopify-flow-triggers:CHK-028",
    "shopify-flow-triggers:CHK-029"
  ]
}
```

## OQ-automation-growth-040 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-automation-growth-040",
  "type": "OPEN_ISSUE",
  "feature_id": "shopify-flow-triggers",
  "summary": "Khoảng hợp lệ và validation của \"Auto-unbox after\" và \"Trigger before\" (min/max, số nguyên, cho phép 0, để trống)? — Không có boundary để viết test validation cho hai ô cấu hình nhắc.",
  "kb_ids": [
    "shopify-flow-triggers#KB-031",
    "shopify-flow-triggers#KB-032"
  ]
}
```

## OQ-automation-growth-041 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-automation-growth-041",
  "type": "OPEN_ISSUE",
  "feature_id": "shopify-flow-triggers",
  "summary": "\"Resell completed\" bắn một lần cho mỗi lượt resell hay mỗi item, và Amount/Currency là tiền theo tiền tệ shop hay tiền khách thanh toán? — Workflow lọc theo Amount cần ngữ nghĩa tiền tệ đúng.",
  "kb_ids": [
    "shopify-flow-triggers#KB-046",
    "shopify-flow-triggers#KB-049"
  ]
}
```

## OQ-automation-growth-042 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-automation-growth-042",
  "type": "OPEN_ISSUE",
  "feature_id": "shopify-flow-triggers",
  "summary": "Tắt công tắc trigger khi đã có trigger nằm trong hàng đợi thì trigger đó còn được gửi không? — Tài liệu chỉ nói bật xong không phát lại sự kiện cũ; chiều ngược lại chưa có oracle.",
  "kb_ids": [
    "shopify-flow-triggers#KB-006",
    "shopify-flow-triggers#KB-012"
  ]
}
```

## OQ-automation-growth-043 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-automation-growth-043",
  "type": "OPEN_ISSUE",
  "feature_id": "shopify-flow-triggers",
  "summary": "Scheduler trên production chạy ở đâu và theo múi giờ nào; phút :30 của bộ quét tính theo giờ server hay giờ shop? — Thời điểm bắn Order unboxing soon và mọi expected result về giờ job phụ thuộc múi giờ; tài liệu tự khai chưa xác nhận.",
  "kb_ids": [
    "_product-level#KB-PL-028",
    "shopify-flow-triggers#KB-036",
    "shopify-flow-triggers#KB-037"
  ]
}
```

## OQ-automation-growth-044 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-automation-growth-044",
  "type": "OPEN_ISSUE",
  "feature_id": "system-emails-and-notifications",
  "summary": "'Vượt vạch' của email mẫu trả phí là lúc số box đã dùng chạm đúng quota hay lúc box đầu tiên vượt; email gửi một lần mỗi chu kỳ hay mỗi lần vượt? — Kiểm số lượng và thời điểm email gói trả phí.",
  "kb_ids": [
    "system-emails-and-notifications#KB-016",
    "system-emails-and-notifications#KB-017"
  ]
}
```

## OQ-automation-growth-045 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-automation-growth-045",
  "type": "OPEN_ISSUE",
  "feature_id": "system-emails-and-notifications",
  "summary": "'Kèm hệ quả: box bị unpublish khỏi storefront' là nội dung email báo trước hay hành vi hệ thống xảy ra cùng lúc gửi email? — Ảnh hưởng expected state của box sau khi chạm hạn mức.",
  "kb_ids": [
    "system-emails-and-notifications#KB-021"
  ]
}
```

## OQ-automation-growth-046 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-automation-growth-046",
  "type": "OPEN_ISSUE",
  "feature_id": "system-emails-and-notifications",
  "summary": "Khi Mailgun gửi lỗi thì có retry hoặc ghi nhận ở đâu không? — Chỉ có luật bỏ qua im lặng khi thiếu template/email; lỗi gửi chưa được mô tả.",
  "kb_ids": [
    "system-emails-and-notifications#KB-001",
    "system-emails-and-notifications#KB-003"
  ]
}
```

## OQ-automation-growth-047 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-automation-growth-047",
  "type": "OPEN_ISSUE",
  "feature_id": "system-emails-and-notifications",
  "summary": "Tên template email (capacity reached, reconnect) theo từng môi trường là gì? — Không kiểm được việc gửi email ở từng môi trường nếu không biết template nào đang cấu hình.",
  "kb_ids": [
    "system-emails-and-notifications#KB-002"
  ]
}
```

## OQ-automation-growth-048 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-automation-growth-048",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": null,
  "summary": "Tài liệu Shopify Flow chỉ tự khai là không tìm thấy giới hạn theo gói Mysbox cho tích hợp Shopify Flow, không khẳng định là không có. Cần dev/PO xác nhận gói Mysbox (Free hoặc gói trả phí) có giới hạn quyền dùng trigger/action Shopify Flow hay không.",
  "kb_ids": [
    "_object-level#KB-004",
    "_object-level#KB-005"
  ]
}
```

## OQ-automation-growth-049 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-automation-growth-049",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": null,
  "summary": "Yêu cầu bootstrap không nêu role; các item của nhóm tự động hoá và tăng trưởng không có role được tài liệu nêu rõ mang scope.role unspecified. Cần PO xác nhận role áp dụng (merchant, admin/nhân viên nội bộ hay hệ thống) cho các phát biểu mức nhóm, ví dụ việc phần còn lại của nhóm đã chạy trên production.",
  "kb_ids": [
    "_object-level#KB-003"
  ]
}
```

## OQ-automation-growth-050 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-automation-growth-050",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "affiliate-referral-tracking",
  "summary": "Tài liệu tự khai chưa xác nhận từ phía Mysbox rằng tiền hoa hồng 30% do nền tảng affiliate tính (kể cả con số minh hoạ 14,7 USD/tháng cho gói giả định 49 USD). Cần PO/dev xác nhận nơi tính hoa hồng, cơ sở phí, thời hạn hưởng và cách xử lý refund/discount.",
  "kb_ids": [
    "affiliate-referral-tracking#KB-008",
    "affiliate-referral-tracking#KB-025",
    "affiliate-referral-tracking#KB-031"
  ],
  "check_ids": [
    "affiliate-referral-tracking:CHK-016"
  ]
}
```

## OQ-automation-growth-051 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-automation-growth-051",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "affiliate-referral-tracking",
  "summary": "Các check P1 (tiền / billing / bốc thăm / refund / store credit / permission / xoá dữ liệu) của feature này có oracle STRONG nhưng chỉ dựa trên tài liệu dev (dev_doc). Theo luật oracle, chúng giữ NEEDS_CONFIRMATION cho tới khi có test_case PASS (hoặc PO/Dev xác nhận trực tiếp) cho đúng hành vi. Danh sách check ở check_ids.",
  "check_ids": [
    "affiliate-referral-tracking:CHK-007",
    "affiliate-referral-tracking:CHK-012",
    "affiliate-referral-tracking:CHK-013"
  ]
}
```

## OQ-automation-growth-052 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-automation-growth-052",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "affiliate-referral-tracking",
  "summary": "Việc job 'unsubscribe' chạy cho mọi shop (kể cả shop không phải affiliate) khi hạ từ gói test sang gói thật có phải chủ đích không, và job đó gửi gì sang dịch vụ affiliate cho shop không phải affiliate?",
  "kb_ids": [
    "affiliate-referral-tracking#KB-028"
  ],
  "check_ids": [
    "affiliate-referral-tracking:CHK-010"
  ]
}
```

## OQ-automation-growth-053 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-automation-growth-053",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "dashboard-notification-banners",
  "summary": "Toàn bộ banner thông báo (thẻ trên Dashboard merchant và màn Notifications ở admin panel) chỉ có trên nhánh build-staging, chưa lên production. Cần PO xác nhận khi nào lên production và hành vi production có giữ nguyên các luật đã mô tả (luật nhập form, điều kiện hiển thị, banner mới nhất thắng, độ trễ sau khi lưu) hay không. Tài liệu cũng chưa nêu trên production đội marketing đăng banner bằng màn nào.",
  "kb_ids": [
    "dashboard-notification-banners#KB-001",
    "dashboard-notification-banners#KB-002",
    "dashboard-notification-banners#KB-003",
    "dashboard-notification-banners#KB-004",
    "dashboard-notification-banners#KB-005",
    "dashboard-notification-banners#KB-006",
    "dashboard-notification-banners#KB-007",
    "dashboard-notification-banners#KB-008",
    "dashboard-notification-banners#KB-009",
    "dashboard-notification-banners#KB-010",
    "dashboard-notification-banners#KB-011",
    "dashboard-notification-banners#KB-012",
    "dashboard-notification-banners#KB-013",
    "dashboard-notification-banners#KB-014",
    "dashboard-notification-banners#KB-015",
    "dashboard-notification-banners#KB-016",
    "dashboard-notification-banners#KB-017",
    "dashboard-notification-banners#KB-018",
    "dashboard-notification-banners#KB-019",
    "dashboard-notification-banners#KB-020",
    "dashboard-notification-banners#KB-021",
    "dashboard-notification-banners#KB-022",
    "dashboard-notification-banners#KB-023",
    "dashboard-notification-banners#KB-024",
    "dashboard-notification-banners#KB-025",
    "dashboard-notification-banners#KB-026",
    "dashboard-notification-banners#KB-027",
    "dashboard-notification-banners#KB-028",
    "dashboard-notification-banners#KB-029",
    "dashboard-notification-banners#KB-030",
    "dashboard-notification-banners#KB-031",
    "dashboard-notification-banners#KB-032",
    "dashboard-notification-banners#KB-033",
    "dashboard-notification-banners#KB-034",
    "dashboard-notification-banners#KB-035",
    "dashboard-notification-banners#KB-036",
    "dashboard-notification-banners#KB-037",
    "dashboard-notification-banners#KB-038",
    "dashboard-notification-banners#KB-039",
    "dashboard-notification-banners#KB-040",
    "dashboard-notification-banners#KB-041",
    "dashboard-notification-banners#KB-042",
    "dashboard-notification-banners#KB-043",
    "dashboard-notification-banners#KB-044",
    "dashboard-notification-banners#KB-045",
    "dashboard-notification-banners#KB-046",
    "dashboard-notification-banners#KB-047",
    "dashboard-notification-banners#KB-048",
    "dashboard-notification-banners#KB-049",
    "dashboard-notification-banners#KB-050",
    "dashboard-notification-banners#KB-051",
    "dashboard-notification-banners#KB-052",
    "dashboard-notification-banners#KB-053",
    "dashboard-notification-banners#KB-054",
    "dashboard-notification-banners#KB-055",
    "dashboard-notification-banners#KB-056",
    "dashboard-notification-banners#KB-057",
    "dashboard-notification-banners#KB-058",
    "dashboard-notification-banners#KB-059",
    "dashboard-notification-banners#KB-060",
    "dashboard-notification-banners#KB-061",
    "dashboard-notification-banners#KB-062",
    "dashboard-notification-banners#KB-063",
    "dashboard-notification-banners#KB-064",
    "dashboard-notification-banners#KB-065",
    "dashboard-notification-banners#KB-066",
    "dashboard-notification-banners#KB-067",
    "dashboard-notification-banners#KB-068",
    "dashboard-notification-banners#KB-069"
  ],
  "check_ids": [
    "dashboard-notification-banners:CHK-001",
    "dashboard-notification-banners:CHK-002",
    "dashboard-notification-banners:CHK-003",
    "dashboard-notification-banners:CHK-004",
    "dashboard-notification-banners:CHK-005",
    "dashboard-notification-banners:CHK-006",
    "dashboard-notification-banners:CHK-007",
    "dashboard-notification-banners:CHK-008",
    "dashboard-notification-banners:CHK-009",
    "dashboard-notification-banners:CHK-011",
    "dashboard-notification-banners:CHK-012",
    "dashboard-notification-banners:CHK-013",
    "dashboard-notification-banners:CHK-014",
    "dashboard-notification-banners:CHK-015",
    "dashboard-notification-banners:CHK-016",
    "dashboard-notification-banners:CHK-017",
    "dashboard-notification-banners:CHK-018",
    "dashboard-notification-banners:CHK-019",
    "dashboard-notification-banners:CHK-022"
  ]
}
```

## OQ-automation-growth-054 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-automation-growth-054",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "recent-pulls-feed",
  "summary": "Một phần Recent pulls chỉ có trên nhánh build-staging, chưa lên production: ghi lịch sử mọi lượt reveal digital cho mọi shop (kể cả khi feed tắt) và tuỳ chọn \"publish test orders\". Cần xác nhận khi nào lên production, và cho tới lúc đó hành vi production là gì (lịch sử chỉ ghi khi feed bật; đơn test luôn bị loại khỏi feed).",
  "kb_ids": [
    "recent-pulls-feed#KB-021",
    "recent-pulls-feed#KB-022",
    "recent-pulls-feed#KB-056",
    "recent-pulls-feed#KB-058",
    "recent-pulls-feed#KB-059"
  ]
}
```

## OQ-automation-growth-055 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-automation-growth-055",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "recent-pulls-feed",
  "summary": "Các giới hạn của feed chỉ được nêu ở dạng xấp xỉ: dung lượng mỗi trang khoảng 100 KB, tổng lượt mở trọn đời xấp xỉ số trang × 100, publish khoảng 6 lần/phút mỗi box. Cần giá trị chính xác nếu dùng làm boundary test.",
  "kb_ids": [
    "recent-pulls-feed#KB-028",
    "recent-pulls-feed#KB-029",
    "recent-pulls-feed#KB-031"
  ]
}
```

## OQ-automation-growth-056 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-automation-growth-056",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "recent-pulls-feed",
  "summary": "Thuật ngữ \"box số\" trong điều kiện hiển thị block \"Mysbox recent pulls\" có đúng là box digital (instant) không, và block hiển thị gì khi đặt trên trang của box physical.",
  "kb_ids": [
    "recent-pulls-feed#KB-017",
    "recent-pulls-feed#KB-040"
  ]
}
```

## OQ-automation-growth-057 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-automation-growth-057",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "recent-pulls-feed",
  "summary": "Các check P1 (tiền / billing / bốc thăm / refund / store credit / permission / xoá dữ liệu) của feature này có oracle STRONG nhưng chỉ dựa trên tài liệu dev (dev_doc). Theo luật oracle, chúng giữ NEEDS_CONFIRMATION cho tới khi có test_case PASS (hoặc PO/Dev xác nhận trực tiếp) cho đúng hành vi. Danh sách check ở check_ids.",
  "check_ids": [
    "recent-pulls-feed:CHK-006",
    "recent-pulls-feed:CHK-023",
    "recent-pulls-feed:CHK-025"
  ]
}
```

## OQ-automation-growth-058 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-automation-growth-058",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "recent-pulls-feed",
  "summary": "Trên nhánh staging, Mysbox ghi lịch sử mọi lượt reveal digital bất kể feed bật hay tắt, và có tuỳ chọn \"publish test orders\" (mặc định tắt) để đưa đơn test vào feed. Khi nào hai thay đổi này lên production, và hành vi có giữ như mô tả không?",
  "check_ids": [
    "recent-pulls-feed:CHK-018"
  ]
}
```

## OQ-automation-growth-059 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-automation-growth-059",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "recent-pulls-feed",
  "summary": "Lượt mở box do auto-unbox, do action Shopify Flow hoặc do admin mở hộ có được ghi lịch sử Recent pulls và đưa lên feed như lượt khách tự mở không? Feed hiển thị mọi món trúng hay chỉ món hiếm?",
  "check_ids": [
    "recent-pulls-feed:CHK-027"
  ]
}
```

## OQ-automation-growth-060 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-automation-growth-060",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "share-unboxing",
  "summary": "Toàn bộ tính năng share unboxing (link chia sẻ, ảnh preview, theo dõi click và ghi nguồn đơn) chỉ có trên nhánh build-staging. Cần xác nhận khi nào lên production và hành vi production có giữ nguyên như tài liệu mô tả không; trước đó các item này không dùng làm expected result.",
  "kb_ids": [
    "share-unboxing#KB-001",
    "share-unboxing#KB-002",
    "share-unboxing#KB-003",
    "share-unboxing#KB-004",
    "share-unboxing#KB-005",
    "share-unboxing#KB-006",
    "share-unboxing#KB-007",
    "share-unboxing#KB-008",
    "share-unboxing#KB-009",
    "share-unboxing#KB-010",
    "share-unboxing#KB-011",
    "share-unboxing#KB-012",
    "share-unboxing#KB-013",
    "share-unboxing#KB-014",
    "share-unboxing#KB-015",
    "share-unboxing#KB-016",
    "share-unboxing#KB-017",
    "share-unboxing#KB-018",
    "share-unboxing#KB-019",
    "share-unboxing#KB-020",
    "share-unboxing#KB-021",
    "share-unboxing#KB-022",
    "share-unboxing#KB-023",
    "share-unboxing#KB-024",
    "share-unboxing#KB-025",
    "share-unboxing#KB-026",
    "share-unboxing#KB-027",
    "share-unboxing#KB-028",
    "share-unboxing#KB-029",
    "share-unboxing#KB-030",
    "share-unboxing#KB-031",
    "share-unboxing#KB-032",
    "share-unboxing#KB-033",
    "share-unboxing#KB-034",
    "share-unboxing#KB-035",
    "share-unboxing#KB-036",
    "share-unboxing#KB-037",
    "share-unboxing#KB-038",
    "share-unboxing#KB-039",
    "share-unboxing#KB-040",
    "share-unboxing#KB-041",
    "share-unboxing#KB-042",
    "share-unboxing#KB-043",
    "share-unboxing#KB-044",
    "share-unboxing#KB-045",
    "share-unboxing#KB-046",
    "share-unboxing#KB-047",
    "share-unboxing#KB-048",
    "share-unboxing#KB-049",
    "share-unboxing#KB-050",
    "share-unboxing#KB-051",
    "share-unboxing#KB-052",
    "share-unboxing#KB-053",
    "share-unboxing#KB-054",
    "share-unboxing#KB-055",
    "share-unboxing#KB-056",
    "share-unboxing#KB-057",
    "share-unboxing#KB-058",
    "share-unboxing#KB-059",
    "share-unboxing#KB-060",
    "share-unboxing#KB-061",
    "share-unboxing#KB-062",
    "share-unboxing#KB-063",
    "share-unboxing#KB-064",
    "share-unboxing#KB-065",
    "share-unboxing#KB-066",
    "share-unboxing#KB-067",
    "share-unboxing#KB-068",
    "share-unboxing#KB-069",
    "share-unboxing#KB-070",
    "share-unboxing#KB-071",
    "share-unboxing#KB-072",
    "share-unboxing#KB-073",
    "share-unboxing#KB-074",
    "share-unboxing#KB-075",
    "share-unboxing#KB-076",
    "share-unboxing#KB-077",
    "share-unboxing#KB-078",
    "share-unboxing#KB-079",
    "share-unboxing#KB-080",
    "share-unboxing#KB-081",
    "share-unboxing#KB-082",
    "share-unboxing#KB-083",
    "share-unboxing#KB-084",
    "share-unboxing#KB-085",
    "share-unboxing#KB-086",
    "share-unboxing#KB-087",
    "share-unboxing#KB-088",
    "share-unboxing#KB-089",
    "share-unboxing#KB-090",
    "share-unboxing#KB-091",
    "share-unboxing#KB-092",
    "share-unboxing#KB-093",
    "share-unboxing#KB-094",
    "share-unboxing#KB-095",
    "share-unboxing#KB-096",
    "share-unboxing#KB-097",
    "share-unboxing#KB-098",
    "share-unboxing#KB-099",
    "share-unboxing#KB-100",
    "share-unboxing#KB-101",
    "share-unboxing#KB-102",
    "share-unboxing#KB-103",
    "share-unboxing#KB-104",
    "share-unboxing#KB-105",
    "share-unboxing#KB-106",
    "share-unboxing#KB-107",
    "share-unboxing#KB-108",
    "share-unboxing#KB-109",
    "share-unboxing#KB-110",
    "share-unboxing#KB-111",
    "share-unboxing#KB-112",
    "share-unboxing#KB-113",
    "share-unboxing#KB-114",
    "share-unboxing#KB-115",
    "share-unboxing#KB-116",
    "share-unboxing#KB-117",
    "share-unboxing#KB-118",
    "share-unboxing#KB-119",
    "share-unboxing#KB-120",
    "share-unboxing#KB-121",
    "share-unboxing#KB-122",
    "share-unboxing#KB-123",
    "share-unboxing#KB-124",
    "share-unboxing#KB-125",
    "share-unboxing#KB-126",
    "share-unboxing#KB-127",
    "share-unboxing#KB-128",
    "share-unboxing#KB-129",
    "share-unboxing#KB-130",
    "share-unboxing#KB-131",
    "share-unboxing#KB-132",
    "share-unboxing#KB-133",
    "share-unboxing#KB-134",
    "share-unboxing#KB-135",
    "share-unboxing#KB-136",
    "share-unboxing#KB-137",
    "share-unboxing#KB-138",
    "share-unboxing#KB-139",
    "share-unboxing#KB-140",
    "share-unboxing#KB-141",
    "share-unboxing#KB-142",
    "share-unboxing#KB-143",
    "share-unboxing#KB-144",
    "share-unboxing#KB-145",
    "share-unboxing#KB-146",
    "share-unboxing#KB-147",
    "share-unboxing#KB-148"
  ]
}
```

## OQ-automation-growth-061 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-automation-growth-061",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "share-unboxing",
  "summary": "Một số mô tả share unboxing được tài liệu tự ghi là chưa xác nhận: nút \"Share unboxing\" có hiện khi khách mở lại đơn cũ từ danh sách không, và trên bản staging chỉ link visits cùng số đơn là đo được thật. Cần dev xác nhận trước khi dùng làm expected result.",
  "kb_ids": [
    "share-unboxing#KB-019",
    "share-unboxing#KB-098"
  ]
}
```

## OQ-automation-growth-062 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-automation-growth-062",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "share-unboxing",
  "summary": "Share unboxing hiện chỉ có trên nhánh staging: khi nào lên production, và trên production luồng \"mở box digital → bấm Share unboxing → có ảnh preview và link công khai\" có giữ đúng như tài liệu mô tả không?",
  "check_ids": [
    "share-unboxing:CHK-001"
  ]
}
```

## OQ-automation-growth-063 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-automation-growth-063",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "share-unboxing",
  "summary": "Ảnh preview chia sẻ có phải luôn 1200 x 630, gồm tiêu đề chúc mừng, tối đa 5 món với món hiếm nhất ở giữa, gộp món trùng, nhãn \"Best pull\" khi mở nhiều box, logo shop, watermark, nút \"Open your own box\" và ẩn chance khi merchant ẩn không? Quy tắc chọn 5 món khi có nhiều hơn 5 là gì?",
  "check_ids": [
    "share-unboxing:CHK-002"
  ]
}
```

## OQ-automation-growth-064 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-automation-growth-064",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "share-unboxing",
  "summary": "Mỗi lượt mở box có đúng một link chia sẻ, và ảnh cùng chữ preview có giữ nguyên như lần tạo đầu kể cả khi merchant đổi giao diện hoặc nội dung sau đó không?",
  "check_ids": [
    "share-unboxing:CHK-003"
  ]
}
```

## OQ-automation-growth-065 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-automation-growth-065",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "share-unboxing",
  "summary": "Hành vi các nút trong popup chia sẻ (tên file mysbox-unboxing.png hoặc .jpg khi phải nén dưới 2 MB, nội dung Message mặc định, Copy, Facebook/X/Whatsapp, Instagram mở khay chia sẻ hoặc lưu ảnh và copy tin nhắn khi máy không hỗ trợ) có đúng là hành vi mong muốn khi lên production không?",
  "check_ids": [
    "share-unboxing:CHK-004"
  ]
}
```

## OQ-automation-growth-066 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-automation-growth-066",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "share-unboxing",
  "summary": "Khi không tạo được link chia sẻ, popup có vẫn hiện ảnh, hiện toast \"Couldn't prepare your share. Please try again.\" và nút \"Try again\" tạo lại được link không?",
  "check_ids": [
    "share-unboxing:CHK-005"
  ]
}
```

## OQ-automation-growth-067 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-automation-growth-067",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "share-unboxing",
  "summary": "Nút \"Share unboxing\" có đúng chỉ hiện cho khách đã đăng nhập, với box digital, trên trình duyệt vừa thực hiện lượt mở đó không? Khi khách mở lại đơn cũ từ danh sách đơn thì có nút không, và đơn có cả box physical lẫn digital thì ảnh có gồm món của box physical không?",
  "check_ids": [
    "share-unboxing:CHK-006"
  ]
}
```

## OQ-automation-growth-068 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-automation-growth-068",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "share-unboxing",
  "summary": "Khi khách gửi yêu cầu tạo link chia sẻ cho lượt mở không thuộc mình, hệ thống có trả đúng cùng phản hồi \"Not found\" như với lượt mở không tồn tại (để chống dò) không? Status code và route của endpoint tạo link là gì?",
  "check_ids": [
    "share-unboxing:CHK-007"
  ]
}
```

## OQ-automation-growth-069 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-automation-growth-069",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "share-unboxing",
  "summary": "Trang link chia sẻ có đúng hiện thẻ preview với tiêu đề chỉ dùng tên riêng của khách (\"I\" khi không có tên) và mô tả \"Try your luck at {store name}\", rồi chuyển về trang sản phẩm của box (khi chỉ một loại box có trang online store) hoặc trang chủ shop, luôn trên domain shop, kèm ref=sl_{token}, tham số kênh c và utm cắt tối đa 100 ký tự không?",
  "check_ids": [
    "share-unboxing:CHK-008"
  ]
}
```

## OQ-automation-growth-070 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-automation-growth-070",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "share-unboxing",
  "summary": "Trang link chia sẻ phản hồi thế nào (status code, nội dung, có chuyển về shop không) khi token không tồn tại hoặc sai định dạng?",
  "check_ids": [
    "share-unboxing:CHK-009"
  ]
}
```

## OQ-automation-growth-071 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-automation-growth-071",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "share-unboxing",
  "summary": "Giới hạn mỗi khách tối đa 10 yêu cầu tạo link chia sẻ mỗi phút và 60 mỗi giờ tính theo cửa sổ trượt hay cố định, và khi vượt thì khách thấy thông báo gì (\"Too many requests\")?",
  "check_ids": [
    "share-unboxing:CHK-010"
  ]
}
```

## OQ-automation-growth-072 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-automation-growth-072",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "share-unboxing",
  "summary": "Hạn mức ảnh share hằng ngày (mặc định 300) tính theo shop hay theo shop và box, theo 24 giờ trượt hay reset theo mốc giờ; chỉ link tạo ảnh mới mới tốn hạn mức phải không; khi vượt thì mọi khách của shop nhận \"Daily limit reached\" và log cảnh báo tối đa một lần mỗi shop mỗi ngày phải không? Khi mở nhiều box cùng lúc thì tốn bao nhiêu ảnh?",
  "check_ids": [
    "share-unboxing:CHK-011"
  ]
}
```

## OQ-automation-growth-073 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-automation-growth-073",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "share-unboxing",
  "summary": "Khi ảnh share sai kích thước 1200 x 630, sai định dạng hoặc lớn hơn 2 MB, hay tiêu đề/mô tả preview vượt 150/300 ký tự, hệ thống cắt, từ chối hay báo lỗi — thông điệp và status code cụ thể là gì? Ảnh lưu có luôn được nén JPEG và xoá metadata không?",
  "check_ids": [
    "share-unboxing:CHK-012"
  ]
}
```

## OQ-automation-growth-074 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-automation-growth-074",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "share-unboxing",
  "summary": "Giá trị mặc định của phần tuỳ chỉnh share (bốn nút kênh đều hiện, màu popup và nút \"Save image\" theo theme, màu CTA trong ảnh là gì) và danh sách đầy đủ 11 đoạn chữ của share unboxing (mặc định tiếng Anh) là gì?",
  "check_ids": [
    "share-unboxing:CHK-015"
  ]
}
```

## OQ-automation-growth-075 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-automation-growth-075",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "share-unboxing",
  "summary": "Quy tắc ghi nguồn đơn từ link chia sẻ (đến hạn khoảng 20 phút sau thanh toán, job mỗi 30 phút đọc customer journey, ghi theo lượt ghé cuối có ref trước khi mua, thử lại tối đa 60 phút rồi chốt \"no source\", đơn test lưu nhưng ẩn) có đúng không, khoảng trễ có được cam kết không, và merchant/admin xem nguồn đơn ở đâu?",
  "check_ids": [
    "share-unboxing:CHK-016"
  ]
}
```

## OQ-automation-growth-076 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-automation-growth-076",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "share-unboxing",
  "summary": "Các sự kiện theo dõi chia sẻ (View kể cả bot nhưng không hiện trong tóm tắt, Click qua beacon theo kênh, Popup open, Share action) có không lưu dữ liệu khách, IP hay order id, và giới hạn tần suất áp theo link cho loại sự kiện nào? Endpoint tóm tắt số liệu có những field, tham số, quyền truy cập nào và xử lý thế nào khi khoảng ngày vượt 180 ngày?",
  "check_ids": [
    "share-unboxing:CHK-018"
  ]
}
```

## OQ-automation-growth-077 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-automation-growth-077",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "share-unboxing",
  "summary": "Khi gỡ app, lịch kiểm tra nguồn đơn có bị xoá và dữ liệu chia sẻ có được giữ không? Cài lại app thì lịch có được tạo lại và link cũ còn dùng được không; dữ liệu chia sẻ có bị xoá theo yêu cầu GDPR không?",
  "check_ids": [
    "share-unboxing:CHK-019"
  ]
}
```

## OQ-automation-growth-078 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-automation-growth-078",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "shopify-flow-actions",
  "summary": "Tên action Shopify Flow không thống nhất giữa các tài liệu: \"Open all mystery boxes in an order\" (tài liệu Hành trình reveal, Quà được thêm vào đơn Shopify) so với \"Open order boxes\" (tài liệu Shopify Flow, Playbook 5); \"Handle paid order from external sales channel with mystery boxes\" (tài liệu Mua box và random quà) so với \"Handle external sales channel order paid\". Cần xác nhận tên hiển thị chính xác trong Shopify Flow.",
  "kb_ids": [
    "shopify-flow-actions#KB-002",
    "shopify-flow-actions#KB-003",
    "shopify-flow-actions#KB-005",
    "shopify-flow-actions#KB-006",
    "shopify-flow-actions#KB-019",
    "shopify-flow-actions#KB-024"
  ]
}
```

## OQ-automation-growth-079 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-automation-growth-079",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "shopify-flow-actions",
  "summary": "Khoảng chờ ít nhất 10 giây sau khi đơn thanh toán trước khi gọi \"Open order boxes\" là khuyến nghị (theo tài liệu Shopify Flow) hay điều kiện bắt buộc (theo cách diễn đạt của Playbook 5)? Cần xác nhận trước khi viết check theo thời gian chờ.",
  "kb_ids": [
    "shopify-flow-actions#KB-020",
    "shopify-flow-actions#KB-037"
  ]
}
```

## OQ-automation-growth-080 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-automation-growth-080",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "shopify-flow-actions",
  "summary": "Tên hiển thị chính xác của các action Mysbox trong Shopify Flow là gì: \"Open order boxes\" hay \"Open all mystery boxes in an order\"; \"Handle external sales channel order paid\" hay \"Handle paid order from external sales channel with mystery boxes\"?",
  "kb_ids": [
    "shopify-flow-actions#KB-013",
    "shopify-flow-actions#KB-014",
    "shopify-flow-actions#KB-015"
  ],
  "check_ids": [
    "shopify-flow-actions:CHK-001"
  ]
}
```

## OQ-automation-growth-081 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-automation-growth-081",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "shopify-flow-actions",
  "summary": "Các check P1 (tiền / billing / bốc thăm / refund / store credit / permission / xoá dữ liệu) của feature này có oracle STRONG nhưng chỉ dựa trên tài liệu dev (dev_doc). Theo luật oracle, chúng giữ NEEDS_CONFIRMATION cho tới khi có test_case PASS (hoặc PO/Dev xác nhận trực tiếp) cho đúng hành vi. Danh sách check ở check_ids.",
  "check_ids": [
    "shopify-flow-actions:CHK-002",
    "shopify-flow-actions:CHK-008",
    "shopify-flow-actions:CHK-011",
    "shopify-flow-actions:CHK-012",
    "shopify-flow-actions:CHK-014"
  ]
}
```

## OQ-automation-growth-082 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-automation-growth-082",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "shopify-flow-actions",
  "summary": "Khoảng chờ ít nhất 10 giây sau khi đơn thanh toán trước khi gọi action mở box là khuyến nghị hay điều kiện bắt buộc? Một tài liệu ghi là khuyến nghị, playbook hỗ trợ lại hướng dẫn như yêu cầu.",
  "check_ids": [
    "shopify-flow-actions:CHK-005"
  ]
}
```

## OQ-automation-growth-083 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-automation-growth-083",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "shopify-flow-actions",
  "summary": "Khi merchant mở box qua action Shopify Flow và quà được thêm vào đơn ngay, khách có mất quyền resell món đó không? Tài liệu chỉ nêu điều này trong ví dụ.",
  "check_ids": [
    "shopify-flow-actions:CHK-006"
  ]
}
```

## OQ-automation-growth-084 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-automation-growth-084",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "shopify-flow-actions",
  "summary": "Với đơn nhiều box đã mở một phần, khi gọi action mở box qua Flow thì quà của box nào được thêm vào đơn ngay: chỉ các box vừa mở hay cả box khách đã mở trước đó; và winningItems gồm những quà nào?",
  "check_ids": [
    "shopify-flow-actions:CHK-007"
  ]
}
```

## OQ-automation-growth-085 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-automation-growth-085",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "shopify-flow-actions",
  "summary": "\"Remove order boxes\" phản hồi thế nào với đơn chỉ có box physical, và với đơn hỗn hợp thì dòng box physical có được giữ nguyên không?",
  "check_ids": [
    "shopify-flow-actions:CHK-010"
  ]
}
```

## OQ-automation-growth-086 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-automation-growth-086",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "shopify-flow-actions",
  "summary": "Gọi \"Handle external sales channel order paid\" nhiều lần cho cùng một đơn thì Mysbox bỏ qua lần sau hay xử lý lại (bốc thăm lại, nhân quà, trừ tồn kho thêm)?",
  "check_ids": [
    "shopify-flow-actions:CHK-013"
  ]
}
```

## OQ-automation-growth-087 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-automation-growth-087",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "shopify-flow-triggers",
  "summary": "Tài liệu chỉ có ví dụ số (48 - 6 = 42 giờ sau đơn) cho giờ thông báo của trigger \"Order unboxing soon\", không có công thức tổng quát; chưa rõ hành vi khi \"Trigger before\" lớn hơn hoặc bằng thời gian auto-unbox, phút :30 của bộ quét theo múi giờ nào, và câu \"đổi setting không ảnh hưởng đơn đã tạo\" áp cho những setting nào (có gồm công tắc Flow không).",
  "kb_ids": [
    "shopify-flow-triggers#KB-033",
    "shopify-flow-triggers#KB-042",
    "shopify-flow-triggers#KB-063",
    "shopify-flow-triggers#KB-064",
    "shopify-flow-triggers#KB-065"
  ]
}
```

## OQ-automation-growth-088 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-automation-growth-088",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "shopify-flow-triggers",
  "summary": "Giờ thông báo của trigger \"Order unboxing soon\" được tính theo công thức nào (tài liệu chỉ có ví dụ số)? Khi \"Trigger before\" lớn hơn hoặc bằng thời gian auto-unbox thì hệ thống chặn lưu, bỏ qua không nhắc hay nhắc ngay? Khoảng giá trị hợp lệ của \"Auto-unbox after\" và \"Trigger before\" là gì (tối thiểu, tối đa, có cho 0 hay để trống)?",
  "check_ids": [
    "shopify-flow-triggers:CHK-016"
  ]
}
```

## OQ-automation-growth-089 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-automation-growth-089",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "shopify-flow-triggers",
  "summary": "Câu \"đổi setting không ảnh hưởng đơn đã tạo\" áp cho những setting nào: chỉ \"Trigger before\" và thời gian auto-unbox, hay cả việc tắt \"Enable auto-unbox trigger\"/Auto-unbox và công tắc trigger Shopify Flow sau khi đơn đã tạo?",
  "kb_ids": [
    "shopify-flow-triggers#KB-041",
    "shopify-flow-triggers#KB-042"
  ],
  "check_ids": [
    "shopify-flow-triggers:CHK-017"
  ]
}
```

## OQ-automation-growth-090 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-automation-growth-090",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "shopify-flow-triggers",
  "summary": "Khi khách resell nhiều item trong một lượt, \"Resell completed\" bắn một lần cho cả lượt hay một lần cho mỗi item? Amount và Currency tính theo tiền tệ của shop hay tiền tệ khách đã thanh toán?",
  "check_ids": [
    "shopify-flow-triggers:CHK-020"
  ]
}
```

## OQ-automation-growth-091 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-automation-growth-091",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "shopify-flow-triggers",
  "summary": "Các check P1 (tiền / billing / bốc thăm / refund / store credit / permission / xoá dữ liệu) của feature này có oracle STRONG nhưng chỉ dựa trên tài liệu dev (dev_doc). Theo luật oracle, chúng giữ NEEDS_CONFIRMATION cho tới khi có test_case PASS (hoặc PO/Dev xác nhận trực tiếp) cho đúng hành vi. Danh sách check ở check_ids.",
  "check_ids": [
    "shopify-flow-triggers:CHK-025"
  ]
}
```

## OQ-automation-growth-092 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-automation-growth-092",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "shopify-flow-triggers",
  "summary": "Gói Mysbox (Free hoặc gói trả phí) có giới hạn quyền dùng trigger Shopify Flow không? Tài liệu chỉ nói không tìm thấy giới hạn, chưa khẳng định là không có.",
  "check_ids": [
    "shopify-flow-triggers:CHK-026"
  ]
}
```

## OQ-automation-growth-093 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-automation-growth-093",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "shopify-flow-triggers",
  "summary": "Nếu merchant tắt công tắc trigger Shopify Flow khi một trigger đã vào hàng đợi nhưng chưa gửi tới Flow, trigger đó còn được gửi hay bị bỏ?",
  "check_ids": [
    "shopify-flow-triggers:CHK-027"
  ]
}
```

## OQ-automation-growth-094 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-automation-growth-094",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "system-emails-and-notifications",
  "summary": "Nội dung mới của email hết dung lượng (link tới Pricing/Orders, domain, phí tối thiểu và phần trăm phí value-tiered) chỉ có trên nhánh build-staging. Khi nào lên production, và hành vi production hiện tại là gì?",
  "kb_ids": [
    "system-emails-and-notifications#KB-030",
    "system-emails-and-notifications#KB-031",
    "system-emails-and-notifications#KB-032",
    "system-emails-and-notifications#KB-033"
  ],
  "check_ids": [
    "system-emails-and-notifications:CHK-019"
  ]
}
```

## OQ-automation-growth-095 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-automation-growth-095",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "system-emails-and-notifications",
  "summary": "Tài liệu tự khai câu chữ chính xác của template email hết dung lượng (Free và trả phí, bản production và bản mới) chưa được xác nhận; subject, người gửi và ngôn ngữ email cũng chưa được nêu.",
  "kb_ids": [
    "system-emails-and-notifications#KB-029",
    "system-emails-and-notifications#KB-030",
    "system-emails-and-notifications#KB-031",
    "system-emails-and-notifications#KB-033"
  ]
}
```

## OQ-automation-growth-096 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-automation-growth-096",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "system-emails-and-notifications",
  "summary": "Tác giả chỉ nói không tìm thấy trong code các email chào mừng, hết trial, gỡ app và biên nhận resell. Cần xác nhận app thật sự không gửi các email này.",
  "kb_ids": [
    "system-emails-and-notifications#KB-010",
    "system-emails-and-notifications#KB-011",
    "system-emails-and-notifications#KB-012",
    "system-emails-and-notifications#KB-013"
  ],
  "check_ids": [
    "system-emails-and-notifications:CHK-026"
  ]
}
```

## OQ-automation-growth-097 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-automation-growth-097",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "system-emails-and-notifications",
  "summary": "Phạm vi \"một lần\" của email cấp quyền lại chưa rõ: một tài liệu nói gửi khi cờ cần cấp quyền lại lần đầu được bật, tài liệu khác nói một lần cho mỗi giai đoạn token chết. Nếu cờ bị xoá rồi đặt lại thì email có gửi lại không, và \"gói mở\" gồm những gói nào?",
  "kb_ids": [
    "system-emails-and-notifications#KB-036",
    "system-emails-and-notifications#KB-039",
    "system-emails-and-notifications#KB-040"
  ]
}
```

## OQ-automation-growth-098 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-automation-growth-098",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "system-emails-and-notifications",
  "summary": "Công tắc cấu hình nội bộ để tắt thông báo 'order updated' của Shopify khi quà được thêm vào đơn tên là gì, đặt ở đâu và ai được bật?",
  "kb_ids": [
    "system-emails-and-notifications#KB-008"
  ],
  "check_ids": [
    "system-emails-and-notifications:CHK-011"
  ]
}
```

## OQ-automation-growth-099 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-automation-growth-099",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "system-emails-and-notifications",
  "summary": "Các check P1 (tiền / billing / bốc thăm / refund / store credit / permission / xoá dữ liệu) của feature này có oracle STRONG nhưng chỉ dựa trên tài liệu dev (dev_doc). Theo luật oracle, chúng giữ NEEDS_CONFIRMATION cho tới khi có test_case PASS (hoặc PO/Dev xác nhận trực tiếp) cho đúng hành vi. Danh sách check ở check_ids.",
  "check_ids": [
    "system-emails-and-notifications:CHK-024"
  ]
}
```
