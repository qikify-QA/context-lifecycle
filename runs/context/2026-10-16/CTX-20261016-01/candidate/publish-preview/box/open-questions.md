# Open Questions — box

Tổng: 90 mục (CONFLICT 6 · OPEN_ISSUE 50 · NEEDS_CONFIRMATION 34). Sinh từ bootstrap DOC_BOOTSTRAP đầu tiên của Mysbox (nguồn: bộ Product KB v1 do dev viết từ source code, 2026-10-16). Mỗi mục là một khối json; `kb_ids` dạng `<feature_key>#KB-xxx` (hoặc `_object-level#KB-xxx` cho tầng object), `check_ids` dạng `<feature_key>:CHK-xxx`.

## OQ-box-001 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-box-001",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": null,
  "summary": "Bộ tài liệu nguồn không chỉ định role mặc định cho object này (bootstrap-request để role null): các KB item mang scope.role theo vai trò tài liệu nêu cho từng hành vi, hoặc \"unspecified\" khi tài liệu không nêu. Cần PO/Dev xác nhận ma trận role → quyền thực tế trên production (merchant owner/staff, khách, admin Mysbox theo từng role) trước khi dùng các check PERMISSION làm oracle."
}
```

## OQ-box-002 — CONFLICT

```json
{
  "oq_id": "OQ-box-002",
  "type": "CONFLICT",
  "feature_id": "box-versioning",
  "summary": "Box version được tạo ở mọi lần lưu box, hay chỉ khi lưu mà có ít nhất một thay đổi cấu hình (variant link, loại box, category, item, cài đặt, cờ tracked)? Hai tài liệu phát biểu khác nhau; một mục khác chỉ nói \"có thể\" tạo version. Cần xác nhận hành vi khi lưu box mà không đổi gì.",
  "side_a": "Tài liệu \"Overview\" (§Key vocabulary) và \"Domain entities\" (§Các đối tượng): một box version được tạo mỗi lần lưu box.",
  "side_b": "Tài liệu \"Box version — bản chụp cấu hình\" (§Bước 2 — Thay đổi nào tạo version mới): version mới sinh ra khi lưu và ít nhất một trong danh sách thuộc tính cấu hình thay đổi.",
  "conflict_group": "CONF-box-01",
  "kb_ids": [
    "box-versioning#KB-001",
    "box-versioning#KB-002",
    "box-versioning#KB-003"
  ],
  "check_ids": [
    "box-versioning:CHK-006"
  ]
}
```

## OQ-box-003 — CONFLICT

```json
{
  "oq_id": "OQ-box-003",
  "type": "CONFLICT",
  "feature_id": "box-versioning",
  "summary": "Đơn hàng được gắn với box version tại thời điểm mua (thanh toán) hay tại thời điểm bốc thăm? Nếu bốc thăm có thể bị trễ/xếp hàng so với lúc thanh toán thì hai mốc cho ra version khác nhau khi merchant sửa box ở giữa; tài liệu cũng nêu một khoảng hẹp với đơn thanh toán ngay trước lúc pause sales.",
  "side_a": "Tài liệu \"Overview\" (§Key vocabulary), \"Domain entities\" (§Các đối tượng) và \"Trang Box (Publish, Versions, Inventory, Recent pulls)\" (§3. Hệ quả cần nhớ): đơn nhớ box version tại thời điểm mua.",
  "side_b": "Tài liệu \"Box version — bản chụp cấu hình\" (§phần mở đầu, §Bước 3 — Ai dùng version nào) và \"Nhóm 02 — Boxes (hộp bí ẩn)\" (§Từ vựng nhóm): đơn nhớ version lúc được bốc thăm, gắn với version đang hiệu lực đúng lúc server bốc thăm.",
  "conflict_group": "CONF-box-02",
  "kb_ids": [
    "box-versioning#KB-004",
    "box-versioning#KB-005",
    "box-versioning#KB-034"
  ],
  "check_ids": [
    "box-versioning:CHK-012"
  ]
}
```

## OQ-box-004 — CONFLICT

```json
{
  "oq_id": "OQ-box-004",
  "type": "CONFLICT",
  "feature_id": "pool-refill",
  "summary": "Mâu thuẫn nội bộ trong tài liệu pool refill: bảng \"Item nào được trả\" nói các chỉnh sửa box (box vẫn ở pool) giữa lúc mua và lúc resell vẫn trả item về pool, trong khi mục khác biệt production/staging nói trên production mọi chỉnh sửa sinh version mới đều làm lượt trả bị bỏ qua âm thầm (một known defect). Cần dev xác nhận bảng chỉ đúng cho staging (khớp queue token) hay không, và trên production các chỉnh sửa đó có sinh version mới và làm mất lượt trả không.",
  "side_a": "Tài liệu \"Pool refill — trả item đã resell về pool\" §Item nào được trả, item nào không: đổi cài đặt hiển thị/animation, đổi chế độ nhóm, thêm/bớt item khác, đổi deactivate/draft (box vẫn ở pool), hoặc item bị bỏ rồi thêm lại trước khi resell — item vẫn được trả lại (bảng không ghi môi trường).",
  "side_b": "Cùng tài liệu §Khác biệt production / staging (đồng thuận với Playbook 2 §Món đã bán lại không về pool , \"Box version — bản chụp cấu hình\" §Version và pool refill và \"Job chạy định kỳ và lệnh vận hành\" §3. Lệnh artisan — cần engineer): trên production chỉ cần box được sửa (sinh version mới) giữa lúc khách mua và lúc resell là lượt trả item bị bỏ qua âm thầm.",
  "conflict_group": "CONF-box-03",
  "kb_ids": [
    "pool-refill#KB-038",
    "pool-refill#KB-039",
    "pool-refill#KB-040",
    "pool-refill#KB-041",
    "pool-refill#KB-042",
    "pool-refill#KB-043",
    "pool-refill#KB-044"
  ],
  "check_ids": [
    "pool-refill:CHK-017"
  ]
}
```

## OQ-box-005 — CONFLICT

```json
{
  "oq_id": "OQ-box-005",
  "type": "CONFLICT",
  "feature_id": "pool-refill",
  "summary": "Hai tài liệu nêu khác nhau về điều kiện dừng-khi-cạn để pool refill áp dụng: một bên bắt buộc chọn \"Automatically deactivate box\", bên kia chấp nhận tick \"Draft product when empty\" hoặc \"Deactivate box when empty\". Cần dev xác nhận box chỉ bật draft-when-empty (không deactivate) có được refill không.",
  "side_a": "Tài liệu \"Pool refill — trả item đã resell về pool\" §Khi nào refill áp dụng: refill cần đủ ba điều kiện cùng lúc, trong đó box phải chọn \"Automatically deactivate box\".",
  "side_b": "Tài liệu \"Playbook 2: resell, số tiền hoàn, pool refill, store credit\" §Món đã bán lại không về pool (refill): box Tier picking mode Pool phải được tick \"Draft product when empty\" HOẶC \"Deactivate box when empty\".",
  "conflict_group": "CONF-box-04",
  "kb_ids": [
    "pool-refill#KB-011",
    "pool-refill#KB-012",
    "pool-refill#KB-013"
  ],
  "check_ids": [
    "pool-refill:CHK-016"
  ]
}
```

## OQ-box-006 — CONFLICT

```json
{
  "oq_id": "OQ-box-006",
  "type": "CONFLICT",
  "feature_id": "pool-refill",
  "summary": "Hai tài liệu nêu khác nhau về bên áp dụng bộ đệm refill kiểu MANUAL: một bên nói merchant áp dụng, bên kia nói người vận hành gọi API (không có màn hình portal). Cần dev xác nhận merchant có cách nào tự áp dụng bộ đệm không, hay chỉ Mysbox team/support qua API.",
  "side_a": "Tài liệu \"Playbook 2: resell, số tiền hoàn, pool refill, store credit\" §Món đã bán lại không về pool (refill): ở chế độ Manual, món bán lại nằm trong bộ đệm chờ merchant áp dụng (box vẫn hết hàng cho đến khi merchant áp dụng).",
  "side_b": "Tài liệu \"Pool refill — trả item đã resell về pool\" §AUTO và MANUAL: ở kiểu MANUAL người vận hành gọi API áp dụng bộ đệm (chọn được từng item/số lượng); kiểu MANUAL không có màn hình portal, đặt bởi API/Mysbox team.",
  "conflict_group": "CONF-box-05",
  "kb_ids": [
    "pool-refill#KB-021",
    "pool-refill#KB-022"
  ],
  "check_ids": [
    "pool-refill:CHK-009"
  ]
}
```

## OQ-box-007 — CONFLICT

```json
{
  "oq_id": "OQ-box-007",
  "type": "CONFLICT",
  "feature_id": "pool-refill",
  "summary": "Có bao nhiêu lệnh vận hành chỉ có trên nhánh build-staging? Mâu thuẫn nội bộ trong tài liệu job nền: câu hỏi thường gặp nói \"hai lệnh\", bảng lệnh chỉ gắn thẻ chỉ-có-trên-staging cho một lệnh (backfill token hàng đợi của pool refill). Cần dev xác nhận lệnh thứ hai, hoặc \"hai lệnh\" có tính lượt --dry-run và lượt chạy thật của cùng một lệnh hay không.",
  "side_a": "Tài liệu \"Job chạy định kỳ và lệnh vận hành\" §Câu hỏi thường gặp: hai lệnh chỉ có trên staging và dòng lịch kiểm tra nguồn đơn.",
  "side_b": "Tài liệu \"Job chạy định kỳ và lệnh vận hành\" §3. Lệnh artisan: chỉ dòng lệnh backfill token hàng đợi của pool refill mang thẻ chỉ có trên staging.",
  "conflict_group": "CONF-admin-panel-01",
  "kb_ids": [
    "pool-refill#KB-050"
  ]
}
```

## OQ-box-008 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-box-008",
  "type": "OPEN_ISSUE",
  "feature_id": "box-create-and-publish",
  "summary": "Hạn chế đã biết: lỗi tạm thời của Shopify khi lưu box có thể hiện thành thông báo \"thiếu tài nguyên ở Shopify\" dù tài nguyên không thiếu (tài liệu diễn đạt là \"có thể\"). Cần xác nhận hành vi đúng và cách merchant/support phân biệt.",
  "kb_ids": [
    "box-create-and-publish#KB-044"
  ],
  "check_ids": [
    "box-create-and-publish:CHK-024"
  ]
}
```

## OQ-box-009 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-box-009",
  "type": "OPEN_ISSUE",
  "feature_id": "box-create-and-publish",
  "summary": "Hạn chế đã biết: khi merchant nhập thêm hàng hoặc sửa product/collection ở Shopify, bản sao dữ liệu trong Mysbox không tự cập nhật cho tới khi deactivate, lưu lại (hoặc Sync data với box Group) và activate. Cần xác nhận đây là hành vi chủ ý hay lỗi cần theo dõi.",
  "kb_ids": [
    "box-create-and-publish#KB-054",
    "box-create-and-publish#KB-055"
  ],
  "check_ids": [
    "box-create-and-publish:CHK-025"
  ]
}
```

## OQ-box-010 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-box-010",
  "type": "OPEN_ISSUE",
  "feature_id": "box-create-and-publish",
  "summary": "Khi Save box Group gặp \"Sync failed. Please contact support for assistance.\" thì box ở trạng thái nào và có retry được không? — Quyết định expected result của luồng lưu box Group khi sync lỗi.",
  "kb_ids": [
    "box-create-and-publish#KB-045",
    "box-create-and-publish#KB-048"
  ]
}
```

## OQ-box-011 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-box-011",
  "type": "OPEN_ISSUE",
  "feature_id": "box-create-and-publish",
  "summary": "Metafield nào (namespace/key) được ghi lên variant khi publish, và deactivate/unpublish có xoá metafield không hay chỉ xoá khi delete? — Kiểm side effect trên Shopify và hành vi widget khi box về Draft.",
  "kb_ids": [
    "box-create-and-publish#KB-009",
    "box-create-and-publish#KB-052",
    "box-create-and-publish#KB-061"
  ]
}
```

## OQ-box-012 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-box-012",
  "type": "OPEN_ISSUE",
  "feature_id": "box-create-and-publish",
  "summary": "Toàn văn thông báo lỗi bắt đầu bằng \"The random set is empty...\" là gì? — Tài liệu cắt bớt; không kiểm được text lỗi đầy đủ.",
  "kb_ids": [
    "box-create-and-publish#KB-030"
  ]
}
```

## OQ-box-013 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-box-013",
  "type": "OPEN_ISSUE",
  "feature_id": "box-create-and-publish",
  "summary": "\"Duplicate box\" dùng được với mọi loại box và box Active không; box duplicate có giữ liên kết variant (vốn chỉ thuộc một box) không? — Luật một variant thuộc một box có thể làm box duplicate lỗi khi Save.",
  "kb_ids": [
    "box-create-and-publish#KB-016",
    "box-create-and-publish#KB-021",
    "box-create-and-publish#KB-036"
  ]
}
```

## OQ-box-014 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-box-014",
  "type": "OPEN_ISSUE",
  "feature_id": "box-create-and-publish",
  "summary": "Đơn test tạo từ \"Preview\" có bốc thăm thật và có tính vào quota/usage không? — Ảnh hưởng đếm capacity và dữ liệu thử nghiệm.",
  "kb_ids": [
    "box-create-and-publish#KB-024"
  ]
}
```

## OQ-box-015 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-box-015",
  "type": "OPEN_ISSUE",
  "feature_id": "box-create-and-publish",
  "summary": "\"Pause sales\", \"deactivate\" và \"unpublish\" có phải cùng một thao tác/nút UI đưa box về Draft không? — Precondition sửa box được nêu bằng nhiều thuật ngữ khác nhau; cần đúng nút UI để viết bước test.",
  "kb_ids": [
    "box-create-and-publish#KB-058",
    "box-create-and-publish#KB-060",
    "box-create-and-publish#KB-067",
    "box-create-and-publish#KB-068"
  ]
}
```

## OQ-box-016 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-box-016",
  "type": "OPEN_ISSUE",
  "feature_id": "box-create-and-publish",
  "summary": "Có điều kiện nào (ngoài trạng thái Draft) chặn xoá box khi box đã có đơn không? — Tài liệu tự khai chưa xác nhận; không viết được expected result cho xoá box có đơn.",
  "kb_ids": [
    "box-create-and-publish#KB-059",
    "box-create-and-publish#KB-066"
  ]
}
```

## OQ-box-017 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-box-017",
  "type": "OPEN_ISSUE",
  "feature_id": "box-create-and-publish",
  "summary": "Khi Shopify lỗi và publish bị huỷ, người dùng thấy thông báo gì và sync status có đổi không? — Nhánh lỗi metafield không có thông điệp cụ thể.",
  "kb_ids": [
    "box-create-and-publish#KB-064",
    "box-create-and-publish#KB-072"
  ]
}
```

## OQ-box-018 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-box-018",
  "type": "OPEN_ISSUE",
  "feature_id": "box-create-and-publish",
  "summary": "Route sửa box đã publish là route nào, và 'not found' là HTTP 404 hay thông báo UI? — Cần cho check API; tài liệu không nêu route.",
  "kb_ids": [
    "box-create-and-publish#KB-080"
  ]
}
```

## OQ-box-019 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-box-019",
  "type": "OPEN_ISSUE",
  "feature_id": "box-create-and-publish",
  "summary": "'bundles' của box (điều kiện để widget hiện) cụ thể là gì? — Không kiểm được điều kiện hiển thị widget nếu không biết đối tượng.",
  "kb_ids": [
    "box-create-and-publish#KB-076"
  ]
}
```

## OQ-box-020 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-box-020",
  "type": "OPEN_ISSUE",
  "feature_id": "box-create-and-publish",
  "summary": "Hai thông báo \"Box sync is not complete.\" và \"Box must finish syncing before it can be published.\" (và \"Cannot publish: inventory pools are exhausted.\") hiện ở portal hay admin panel, và trong tình huống nào mỗi cái? — Hai text khác nhau cho cùng điều kiện sync chưa xong; check cần biết surface và text mong đợi.",
  "kb_ids": [
    "box-create-and-publish#KB-062",
    "box-create-and-publish#KB-063",
    "box-create-and-publish#KB-078"
  ]
}
```

## OQ-box-021 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-box-021",
  "type": "OPEN_ISSUE",
  "feature_id": "box-create-and-publish",
  "summary": "Hệ thống tự unpublish box trong điều kiện nào? — KB chỉ nêu hệ quả (ngày publish trống), không nêu trigger; cần để test vòng đời và widget.",
  "kb_ids": [
    "box-create-and-publish#KB-073"
  ]
}
```

## OQ-box-022 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-box-022",
  "type": "OPEN_ISSUE",
  "feature_id": "box-type-and-prize-setup",
  "summary": "Đội Mysbox bật tuỳ chọn Group cho shop ở đâu (admin panel, cờ shop) và bởi vai trò nào? — Cần để chuẩn bị dữ liệu test và viết check permission cho trường hợp shop chưa được bật.",
  "kb_ids": [
    "box-type-and-prize-setup#KB-007"
  ]
}
```

## OQ-box-023 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-box-023",
  "type": "OPEN_ISSUE",
  "feature_id": "box-type-and-prize-setup",
  "summary": "Giới hạn Bundle 2-20 set được chặn ở portal, ở server, hay cả hai? — Quyết định test qua UI hay qua API.",
  "kb_ids": [
    "box-type-and-prize-setup#KB-016"
  ]
}
```

## OQ-box-024 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-box-024",
  "type": "OPEN_ISSUE",
  "feature_id": "box-type-and-prize-setup",
  "summary": "Box Group chế độ pool khi một nhóm hết item thì xảy ra gì? — Tài liệu loại box chỉ chuyển hướng sang phần tồn kho/pool; feature này không có khẳng định.",
  "kb_ids": [
    "box-type-and-prize-setup#KB-021",
    "box-type-and-prize-setup#KB-023"
  ]
}
```

## OQ-box-025 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-box-025",
  "type": "OPEN_ISSUE",
  "feature_id": "box-type-and-prize-setup",
  "summary": "Đổi qua lại giữa Single và Bundle, hoặc giữa draw và pool, có reset danh sách item không? — Tài liệu chỉ nêu trường hợp đổi single item sang group.",
  "kb_ids": [
    "box-type-and-prize-setup#KB-031"
  ]
}
```

## OQ-box-026 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-box-026",
  "type": "OPEN_ISSUE",
  "feature_id": "box-type-and-prize-setup",
  "summary": "Box Single có hiển thị khái niệm \"prize set\" trên UI không (một chỗ nói Single có 1 set, chỗ khác nói prize set chỉ có ở Bundle)? — Ảnh hưởng cách viết bước test và nhãn mong đợi trên form Single.",
  "kb_ids": [
    "box-type-and-prize-setup#KB-004",
    "box-type-and-prize-setup#KB-008"
  ]
}
```

## OQ-box-027 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-box-027",
  "type": "OPEN_ISSUE",
  "feature_id": "box-versioning",
  "summary": "Hạn chế đã biết: đơn vừa thanh toán ngay trước lúc merchant pause sales để sửa box rơi vào một khoảng hẹp; tài liệu không nêu đơn đó gắn với version nào và hệ quả (sai item, sai điều khoản buyback hay lỗi). Cần xác nhận mức độ và hướng xử lý.",
  "kb_ids": [
    "box-versioning#KB-034"
  ],
  "check_ids": [
    "box-versioning:CHK-013"
  ]
}
```

## OQ-box-028 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-box-028",
  "type": "OPEN_ISSUE",
  "feature_id": "box-versioning",
  "summary": "Merchant có xem được lịch sử version, số version hoặc rollback trên UI không? — Xác định có kiểm version trực tiếp từ portal được không hay chỉ gián tiếp qua hành vi đơn.",
  "kb_ids": [
    "box-versioning#KB-021"
  ]
}
```

## OQ-box-029 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-box-029",
  "type": "OPEN_ISSUE",
  "feature_id": "box-versioning",
  "summary": "Khi collection trên Shopify đổi variant sau khi version đã bung, version mới chỉ đổi cài đặt có cập nhật danh sách variant không? — Version mới dùng lại danh sách đã bung và không hỏi lại Shopify; có thể lệch với collection hiện tại.",
  "kb_ids": [
    "box-versioning#KB-022",
    "box-versioning#KB-030",
    "box-versioning#KB-031"
  ]
}
```

## OQ-box-030 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-box-030",
  "type": "OPEN_ISSUE",
  "feature_id": "box-versioning",
  "summary": "'Trạng thái đồng bộ' (thay đổi không tạo version) cụ thể là trạng thái gì? — Cần biết thao tác nào thuộc nhóm không tạo version để test.",
  "kb_ids": [
    "box-versioning#KB-029"
  ]
}
```

## OQ-box-031 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-box-031",
  "type": "OPEN_ISSUE",
  "feature_id": "box-versioning",
  "summary": "Việc dựng lại tồn kho khi tạo version ảnh hưởng thế nào tới pool/tồn kho đã trừ của đơn đang mở dở? — Side effect trên inventory khi sửa box còn đơn chưa mở; KB không có item nào trả lời."
}
```

## OQ-box-032 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-box-032",
  "type": "OPEN_ISSUE",
  "feature_id": "box-versioning",
  "summary": "Edit (sửa JSON settings/bundles) ở admin panel có tạo box version mới không, và JSON không hợp lệ bị chặn thế nào? — Configure Tier Settings được nêu rõ là tạo version, còn Edit chỉ nói ảnh hưởng đơn mua sau.",
  "kb_ids": [
    "box-versioning#KB-041",
    "box-versioning#KB-042"
  ]
}
```

## OQ-box-033 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-box-033",
  "type": "OPEN_ISSUE",
  "feature_id": "inventory-and-sold-out",
  "summary": "Tài liệu mô tả một hạn chế đã biết: nếu shop cho phép \"continue selling when out of stock\", đơn bán vượt tồn kho có thể nhận ít prize hơn số hộp đã mua (hộp thừa không có gì để reveal). Cần dev xác nhận đây là lỗi hay thiết kế chủ đích, mức độ ảnh hưởng và trạng thái sửa; item này không dùng làm expected result.",
  "kb_ids": [
    "inventory-and-sold-out#KB-038"
  ],
  "check_ids": [
    "inventory-and-sold-out:CHK-035"
  ]
}
```

## OQ-box-034 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-box-034",
  "type": "OPEN_ISSUE",
  "feature_id": "inventory-and-sold-out",
  "summary": "Tài liệu mô tả một hạn chế đã biết: đơn nhiều hộp mà một nhóm cạn giữa chừng có thể có hộp \"rỗng\". Cần dev xác nhận đây là lỗi hay thiết kế chủ đích, mức độ ảnh hưởng và trạng thái sửa; item này không dùng làm expected result.",
  "kb_ids": [
    "inventory-and-sold-out#KB-049"
  ],
  "check_ids": [
    "inventory-and-sold-out:CHK-036"
  ]
}
```

## OQ-box-035 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-box-035",
  "type": "OPEN_ISSUE",
  "feature_id": "inventory-and-sold-out",
  "summary": "Tài liệu mô tả một hạn chế đã biết: đồng bộ và bốc thăm không dùng chung khoá, nên sync giữa lúc đang bán có thể chạy đua nhẹ với bốc thăm; mức độ ảnh hưởng thực tế được tài liệu tự khai là chưa xác nhận. Cần dev xác nhận đây là lỗi hay thiết kế chủ đích, mức độ ảnh hưởng và trạng thái sửa; item này không dùng làm expected result.",
  "kb_ids": [
    "inventory-and-sold-out#KB-059"
  ],
  "check_ids": [
    "inventory-and-sold-out:CHK-037"
  ]
}
```

## OQ-box-036 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-box-036",
  "type": "OPEN_ISSUE",
  "feature_id": "inventory-and-sold-out",
  "summary": "Tài liệu mô tả một hạn chế đã biết: triệu chứng đã biết là box Tier có thể rút không ra quà vì mất inventory. Cần dev xác nhận đây là lỗi hay thiết kế chủ đích, mức độ ảnh hưởng và trạng thái sửa; item này không dùng làm expected result.",
  "kb_ids": [
    "inventory-and-sold-out#KB-073"
  ],
  "check_ids": [
    "inventory-and-sold-out:CHK-038"
  ]
}
```

## OQ-box-037 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-box-037",
  "type": "OPEN_ISSUE",
  "feature_id": "inventory-and-sold-out",
  "summary": "Khi box tracked/pool hết tồn kho, điều kiện nào dẫn tới sold-out, tự deactivate, hay refill? — Sơ đồ chỉ liệt kê ba kết cục, không có điều kiện cho từng kết cục — không viết được expected result tổng quát.",
  "kb_ids": [
    "inventory-and-sold-out#KB-006"
  ]
}
```

## OQ-box-038 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-box-038",
  "type": "OPEN_ISSUE",
  "feature_id": "inventory-and-sold-out",
  "summary": "Tồn kho box giảm tại thời điểm nào (đơn paid, lúc bốc, hay lúc reveal) và giảm bao nhiêu mỗi đơn? — Kiểm tồn kho sau mua cần mốc thời gian và lượng giảm.",
  "kb_ids": [
    "inventory-and-sold-out#KB-001"
  ]
}
```

## OQ-box-039 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-box-039",
  "type": "OPEN_ISSUE",
  "feature_id": "inventory-and-sold-out",
  "summary": "Dựng lại tồn kho khi tạo version mới ảnh hưởng thế nào tới pool/tồn kho đã trừ của đơn chưa mở? — Side effect trên inventory khi sửa box đang có đơn chưa mở.",
  "kb_ids": [
    "inventory-and-sold-out#KB-024",
    "inventory-and-sold-out#KB-026"
  ]
}
```

## OQ-box-040 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-box-040",
  "type": "OPEN_ISSUE",
  "feature_id": "inventory-and-sold-out",
  "summary": "Giới hạn số lần ghi Shopify mỗi giây mỗi shop và độ trễ tối đa của hiển thị tồn kho trên widget là bao nhiêu, cơ chế cập nhật thế nào? — 'vài giây' không đủ làm boundary để kiểm độ trễ.",
  "kb_ids": [
    "inventory-and-sold-out#KB-070"
  ]
}
```

## OQ-box-041 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-box-041",
  "type": "OPEN_ISSUE",
  "feature_id": "inventory-and-sold-out",
  "summary": "Công thức chia lại chance cho các nhóm còn lại khi chọn \"Continuously randomize items in the remaining groups\" với hơn hai nhóm? — Tài liệu chỉ có ví dụ hai nhóm; không đủ làm oracle cho trường hợp tổng quát.",
  "kb_ids": [
    "inventory-and-sold-out#KB-045",
    "inventory-and-sold-out#KB-048"
  ]
}
```

## OQ-box-042 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-box-042",
  "type": "OPEN_ISSUE",
  "feature_id": "inventory-and-sold-out",
  "summary": "Toàn văn thông báo lỗi \"Box tracking settings do not match...\" là gì? — Tài liệu cắt bằng '...'; không kiểm khớp nguyên văn được.",
  "kb_ids": [
    "inventory-and-sold-out#KB-033"
  ]
}
```

## OQ-box-043 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-box-043",
  "type": "OPEN_ISSUE",
  "feature_id": "inventory-and-sold-out",
  "summary": "Box Bundle tracked có dùng được \"Show remaining stock\" hoặc availability không? — Tài liệu chỉ nêu Single tracked, Group pool và Bundle untracked; thiếu expected cho Bundle tracked.",
  "kb_ids": [
    "inventory-and-sold-out#KB-065",
    "inventory-and-sold-out#KB-069"
  ]
}
```

## OQ-box-044 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-box-044",
  "type": "OPEN_ISSUE",
  "feature_id": "inventory-and-sold-out",
  "summary": "\"Draft product when empty\" và \"Deactivate box when empty\" trong Configure Tier Settings chỉ áp dụng cho Picking Mode BasePool hay cả Draw? — Phạm vi không rõ, ảnh hưởng ma trận test Configure Tier Settings.",
  "kb_ids": [
    "inventory-and-sold-out#KB-019"
  ]
}
```

## OQ-box-045 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-box-045",
  "type": "OPEN_ISSUE",
  "feature_id": "inventory-and-sold-out",
  "summary": "Toast \"Cannot publish: inventory pools are exhausted.\" (và toast yêu cầu sync xong mới publish) hiện ở portal hay admin panel? — Surface của check publish chưa rõ.",
  "kb_ids": [
    "inventory-and-sold-out#KB-053"
  ]
}
```

## OQ-box-046 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-box-046",
  "type": "OPEN_ISSUE",
  "feature_id": "inventory-and-sold-out",
  "summary": "Khi sync lại pool theo collection, con trỏ bốc được dời tới đâu và món bị gỡ khỏi collection được xử lý thế nào? — Cần để kiểm hành vi giữ item đã bốc và xáo phần còn lại.",
  "kb_ids": [
    "inventory-and-sold-out#KB-057",
    "inventory-and-sold-out#KB-058"
  ]
}
```

## OQ-box-047 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-box-047",
  "type": "OPEN_ISSUE",
  "feature_id": "picking-modes",
  "summary": "Ở mode mặc định, một hộp Bundle có nhận được cùng một item từ các set khác nhau không? — Tài liệu nêu khả năng này ở dạng chưa xác nhận; ảnh hưởng expected của Bundle có item trùng giữa các set.",
  "kb_ids": [
    "picking-modes#KB-023"
  ]
}
```

## OQ-box-048 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-box-048",
  "type": "OPEN_ISSUE",
  "feature_id": "picking-modes",
  "summary": "Với Bundle nhiều set, \"Unique in an order\" tính unique theo từng set hay trên toàn hộp/toàn đơn? — Ví dụ chỉ dùng một set; Bundle nhiều set không được minh hoạ.",
  "kb_ids": [
    "picking-modes#KB-026"
  ]
}
```

## OQ-box-049 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-box-049",
  "type": "OPEN_ISSUE",
  "feature_id": "picking-modes",
  "summary": "\"Unique in an order\" có áp dụng khi một đơn chứa nhiều hộp thuộc các variant/box khác nhau không? — Tài liệu chỉ nói có ý nghĩa với nhiều hộp cùng variant; hành vi đơn trộn không được nêu.",
  "kb_ids": [
    "picking-modes#KB-028"
  ]
}
```

## OQ-box-050 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-box-050",
  "type": "OPEN_ISSUE",
  "feature_id": "picking-modes",
  "summary": "Nhãn bảng \"Refill / Redistribute / Deactivate\" ánh xạ chính xác thế nào với ba lựa chọn UI (đặc biệt Redistribute ↔ \"Continuously randomize items in the remaining groups\")? — Tài liệu không nói thẳng ánh xạ; suy theo thứ tự hàng là phỏng đoán.",
  "kb_ids": [
    "picking-modes#KB-037",
    "picking-modes#KB-040"
  ]
}
```

## OQ-box-051 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-box-051",
  "type": "OPEN_ISSUE",
  "feature_id": "picking-modes",
  "summary": "Đổi picking mode trên box đã publish/đã bán áp dụng cho đơn cũ hay chỉ version mới; mode có nằm trong box version không? — Ảnh hưởng tính bất biến của bốc thăm (prize-draw là topic không được supersede).",
  "kb_ids": [
    "picking-modes#KB-016"
  ]
}
```

## OQ-box-052 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-box-052",
  "type": "OPEN_ISSUE",
  "feature_id": "picking-modes",
  "summary": "Đổi qua lại giữa Single và Bundle, hoặc giữa draw và pool, có reset danh sách item không? — Tài liệu chỉ nêu trường hợp đổi single item → group.",
  "kb_ids": [
    "picking-modes#KB-034",
    "picking-modes#KB-036"
  ]
}
```

## OQ-box-053 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-box-053",
  "type": "OPEN_ISSUE",
  "feature_id": "pool-refill",
  "summary": "Tài liệu mô tả một hạn chế đã biết: box được lưu trước khi có tuỳ chọn refill có thể hiển thị \"Automatically refill\" trên giao diện trong khi server coi refill là tắt cho tới khi form được lưu lại (giao diện và server lệch nhau). Cần dev xác nhận đây là lỗi hay thiết kế chủ đích, mức độ ảnh hưởng và trạng thái sửa; item này không dùng làm expected result.",
  "kb_ids": [
    "pool-refill#KB-017"
  ],
  "check_ids": [
    "pool-refill:CHK-020"
  ]
}
```

## OQ-box-054 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-box-054",
  "type": "OPEN_ISSUE",
  "feature_id": "pool-refill",
  "summary": "Support bật kiểu MANUAL ở đâu (admin panel hay cách khác), và đổi AUTO ↔ MANUAL ảnh hưởng thế nào tới bộ đệm đang chờ? — Chuyển cấu hình có thể làm mất hoặc tự áp dụng item đang chờ; check permission cần biết surface.",
  "kb_ids": [
    "pool-refill#KB-007",
    "pool-refill#KB-020"
  ]
}
```

## OQ-box-055 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-box-055",
  "type": "OPEN_ISSUE",
  "feature_id": "pool-refill",
  "summary": "Nhãn đầy đủ của lựa chọn \"Not refill...\" là gì? — Tài liệu cắt bằng '...'; không có oracle cho nhãn UI nguyên văn.",
  "kb_ids": [
    "pool-refill#KB-008"
  ]
}
```

## OQ-box-056 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-box-056",
  "type": "OPEN_ISSUE",
  "feature_id": "pool-refill",
  "summary": "Sau refill, box đã deactivate có tự Activate lại không hay merchant phải bấm Activate? — Tài liệu chỉ nói 'có thể được Activate lại'; ví dụ cho thấy merchant Activate.",
  "kb_ids": [
    "pool-refill#KB-031"
  ]
}
```

## OQ-box-057 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-box-057",
  "type": "OPEN_ISSUE",
  "feature_id": "pool-refill",
  "summary": "Job AUTO áp dụng bộ đệm chạy với độ trễ bao lâu, retry/thất bại thì sao? — 'ngay' không định lượng; ảnh hưởng thời điểm kiểm tra pool sau resell.",
  "kb_ids": [
    "pool-refill#KB-019"
  ]
}
```

## OQ-box-058 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-box-058",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "box-create-and-publish",
  "summary": "Thời gian chờ tối đa của màn hình \"Syncing inventory...\" khi lưu box Group được tài liệu nêu xấp xỉ (\"khoảng 60 giây\"); cần xác nhận giá trị chính xác và hành vi khi quá thời gian.",
  "kb_ids": [
    "box-create-and-publish#KB-049"
  ],
  "check_ids": [
    "box-create-and-publish:CHK-039"
  ]
}
```

## OQ-box-059 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-box-059",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "box-create-and-publish",
  "summary": "Bộ tài liệu không nêu role nào (chủ shop hay nhân viên shop) được tạo, publish, unpublish và xoá box; các item liên quan chỉ ghi role merchant chung. Cần xác nhận ma trận quyền.",
  "kb_ids": [
    "box-create-and-publish#KB-001",
    "box-create-and-publish#KB-003",
    "box-create-and-publish#KB-006",
    "box-create-and-publish#KB-057"
  ]
}
```

## OQ-box-060 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-box-060",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "box-create-and-publish",
  "summary": "Các check P1 (tiền / billing / bốc thăm / refund / store credit / permission / xoá dữ liệu) của feature này có oracle STRONG nhưng chỉ dựa trên tài liệu dev (dev_doc). Theo luật oracle, chúng giữ NEEDS_CONFIRMATION cho tới khi có test_case PASS (hoặc PO/Dev xác nhận trực tiếp) cho đúng hành vi. Danh sách check ở check_ids.",
  "check_ids": [
    "box-create-and-publish:CHK-030",
    "box-create-and-publish:CHK-031",
    "box-create-and-publish:CHK-037"
  ]
}
```

## OQ-box-061 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-box-061",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "box-create-and-publish",
  "summary": "Vai trò nào trong shop (chủ shop hay nhân viên shop) được tạo, publish, unpublish và xoá box trong app merchant?",
  "check_ids": [
    "box-create-and-publish:CHK-040"
  ]
}
```

## OQ-box-062 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-box-062",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "box-create-and-publish",
  "summary": "Box ở trạng thái Draft có đúng là khi ngày publish (published_at) để trống không, và deactivate box có xoá ngày publish không?",
  "kb_ids": [
    "box-create-and-publish#KB-056"
  ],
  "check_ids": [
    "box-create-and-publish:CHK-041"
  ]
}
```

## OQ-box-063 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-box-063",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "box-type-and-prize-setup",
  "summary": "Với box Group chế độ pool, tài liệu chỉ khuyến nghị bật \"Track quantity\" ở Shopify; cần xác nhận đây có phải điều kiện bắt buộc (portal chặn) hay chỉ khuyến nghị, và hành vi khi tắt.",
  "kb_ids": [
    "box-type-and-prize-setup#KB-022"
  ],
  "check_ids": [
    "box-type-and-prize-setup:CHK-016"
  ]
}
```

## OQ-box-064 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-box-064",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "box-type-and-prize-setup",
  "summary": "Tài liệu tự ghi chú chưa xác nhận rằng server không đặt trần cho số item mỗi set và số nhóm của box Group; cần xác nhận giới hạn thật (portal và server).",
  "kb_ids": [
    "box-type-and-prize-setup#KB-032",
    "box-type-and-prize-setup#KB-033"
  ],
  "check_ids": [
    "box-type-and-prize-setup:CHK-022"
  ]
}
```

## OQ-box-065 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-box-065",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "box-type-and-prize-setup",
  "summary": "Các check P1 (tiền / billing / bốc thăm / refund / store credit / permission / xoá dữ liệu) của feature này có oracle STRONG nhưng chỉ dựa trên tài liệu dev (dev_doc). Theo luật oracle, chúng giữ NEEDS_CONFIRMATION cho tới khi có test_case PASS (hoặc PO/Dev xác nhận trực tiếp) cho đúng hành vi. Danh sách check ở check_ids.",
  "check_ids": [
    "box-type-and-prize-setup:CHK-003",
    "box-type-and-prize-setup:CHK-010",
    "box-type-and-prize-setup:CHK-013",
    "box-type-and-prize-setup:CHK-014",
    "box-type-and-prize-setup:CHK-015",
    "box-type-and-prize-setup:CHK-018",
    "box-type-and-prize-setup:CHK-021"
  ]
}
```

## OQ-box-066 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-box-066",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "box-type-and-prize-setup",
  "summary": "Các nhóm mặc định của box Group có tên và chance được điền sẵn không (bộ Common 50% / Rare 30% / Epic 15% / Legendary 5% là preset thật hay chỉ là số minh hoạ), tên nhóm cố định hay merchant tự đặt, và merchant sửa/xoá được không?",
  "kb_ids": [
    "box-type-and-prize-setup#KB-029"
  ],
  "check_ids": [
    "box-type-and-prize-setup:CHK-023"
  ]
}
```

## OQ-box-067 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-box-067",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "box-type-and-prize-setup",
  "summary": "Ở box Single tracked, chance hiển thị của mỗi item có đúng bằng số lượng item chia tổng số lượng không, và được làm tròn theo quy tắc nào (vd 5/9)?",
  "kb_ids": [
    "box-type-and-prize-setup#KB-026"
  ],
  "check_ids": [
    "box-type-and-prize-setup:CHK-024"
  ]
}
```

## OQ-box-068 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-box-068",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "box-versioning",
  "summary": "Các check P1 (tiền / billing / bốc thăm / refund / store credit / permission / xoá dữ liệu) của feature này có oracle STRONG nhưng chỉ dựa trên tài liệu dev (dev_doc). Theo luật oracle, chúng giữ NEEDS_CONFIRMATION cho tới khi có test_case PASS (hoặc PO/Dev xác nhận trực tiếp) cho đúng hành vi. Danh sách check ở check_ids.",
  "check_ids": [
    "box-versioning:CHK-007",
    "box-versioning:CHK-008",
    "box-versioning:CHK-010",
    "box-versioning:CHK-011",
    "box-versioning:CHK-015",
    "box-versioning:CHK-017"
  ]
}
```

## OQ-box-069 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-box-069",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "inventory-and-sold-out",
  "summary": "Tài liệu tồn kho nêu một mẹo chuyển box pool → draw → pool để tạo hàng đợi mới cho box đã cạn nhưng tự khai chưa xác nhận đây có phải quy trình support chính thức. Cần dev/support xác nhận mẹo này có được dùng chính thức không và hàng đợi sau khi chuyển hoạt động thế nào.",
  "kb_ids": [
    "inventory-and-sold-out#KB-054"
  ]
}
```

## OQ-box-070 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-box-070",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "inventory-and-sold-out",
  "summary": "Không thấy ô chỉnh cờ show_item_availability trong portal; tài liệu tự khai chưa xác nhận ai bật cờ (có thể là Mysbox team). Cần dev xác nhận ai bật cờ này và bật ở đâu.",
  "kb_ids": [
    "inventory-and-sold-out#KB-068"
  ]
}
```

## OQ-box-071 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-box-071",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "inventory-and-sold-out",
  "summary": "Các check P1 (tiền / billing / bốc thăm / refund / store credit / permission / xoá dữ liệu) của feature này có oracle STRONG nhưng chỉ dựa trên tài liệu dev (dev_doc). Theo luật oracle, chúng giữ NEEDS_CONFIRMATION cho tới khi có test_case PASS (hoặc PO/Dev xác nhận trực tiếp) cho đúng hành vi. Danh sách check ở check_ids.",
  "check_ids": [
    "inventory-and-sold-out:CHK-001",
    "inventory-and-sold-out:CHK-002",
    "inventory-and-sold-out:CHK-003",
    "inventory-and-sold-out:CHK-004",
    "inventory-and-sold-out:CHK-005",
    "inventory-and-sold-out:CHK-006",
    "inventory-and-sold-out:CHK-007",
    "inventory-and-sold-out:CHK-010",
    "inventory-and-sold-out:CHK-011",
    "inventory-and-sold-out:CHK-012",
    "inventory-and-sold-out:CHK-013",
    "inventory-and-sold-out:CHK-015",
    "inventory-and-sold-out:CHK-022",
    "inventory-and-sold-out:CHK-023",
    "inventory-and-sold-out:CHK-030",
    "inventory-and-sold-out:CHK-033"
  ]
}
```

## OQ-box-072 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-box-072",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "inventory-and-sold-out",
  "summary": "Mẹo chuyển box Group đã cạn từ pool sang draw rồi về pool để tạo hàng đợi mới có phải quy trình support chính thức không? Sau khi chuyển, hàng đợi các nhóm có đầy đủ lại item không và box có Activate được không?",
  "check_ids": [
    "inventory-and-sold-out:CHK-018"
  ]
}
```

## OQ-box-073 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-box-073",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "inventory-and-sold-out",
  "summary": "Ai bật cờ show_item_availability cho box và bật ở đâu (portal không có ô chỉnh)? Cần biết để dựng được precondition kiểm nhãn \"Pulled\" và \"N of M pulled\".",
  "kb_ids": [
    "inventory-and-sold-out#KB-066",
    "inventory-and-sold-out#KB-067"
  ],
  "check_ids": [
    "inventory-and-sold-out:CHK-028"
  ]
}
```

## OQ-box-074 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-box-074",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "picking-modes",
  "summary": "Picking mode \"Unique across pools\" (box Bundle có cùng item ở nhiều set) chỉ có trên nhánh build-staging, chưa lên production; mọi mô tả hành vi của mode này chưa dùng được làm expected result production. Cần dev xác nhận khi nào mode lên production, cách đặt mode cho box (API/Mysbox team) và hành vi production lúc đó.",
  "kb_ids": [
    "picking-modes#KB-001",
    "picking-modes#KB-002",
    "picking-modes#KB-003",
    "picking-modes#KB-004",
    "picking-modes#KB-005",
    "picking-modes#KB-006",
    "picking-modes#KB-007",
    "picking-modes#KB-008",
    "picking-modes#KB-009",
    "picking-modes#KB-010",
    "picking-modes#KB-011",
    "picking-modes#KB-012",
    "picking-modes#KB-013",
    "picking-modes#KB-014",
    "picking-modes#KB-015"
  ]
}
```

## OQ-box-075 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-box-075",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "picking-modes",
  "summary": "Tài liệu tự khai chưa xác nhận bên nào đặt pick_count khác 1 (portal không có ô chỉnh). Cần dev xác nhận ai/qua đâu đặt pick_count và hành vi khi pick_count > 1.",
  "kb_ids": [
    "picking-modes#KB-046"
  ]
}
```

## OQ-box-076 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-box-076",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "picking-modes",
  "summary": "Các check P1 (tiền / billing / bốc thăm / refund / store credit / permission / xoá dữ liệu) của feature này có oracle STRONG nhưng chỉ dựa trên tài liệu dev (dev_doc). Theo luật oracle, chúng giữ NEEDS_CONFIRMATION cho tới khi có test_case PASS (hoặc PO/Dev xác nhận trực tiếp) cho đúng hành vi. Danh sách check ở check_ids.",
  "check_ids": [
    "picking-modes:CHK-002",
    "picking-modes:CHK-003",
    "picking-modes:CHK-004",
    "picking-modes:CHK-005",
    "picking-modes:CHK-006",
    "picking-modes:CHK-007",
    "picking-modes:CHK-010",
    "picking-modes:CHK-011",
    "picking-modes:CHK-013"
  ]
}
```

## OQ-box-077 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-box-077",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "picking-modes",
  "summary": "\"Unique in an order\" có áp dụng khi một đơn chứa nhiều hộp thuộc các variant/box khác nhau không, hay chỉ trong phạm vi các hộp cùng variant?",
  "check_ids": [
    "picking-modes:CHK-009"
  ]
}
```

## OQ-box-078 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-box-078",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "picking-modes",
  "summary": "Ai và qua kênh nào đặt pick_count khác 1? Khi pick_count lớn hơn 1, các item trong một lần tung có được trùng nhau không, tương tác với draw/pool thế nào, và nếu nhóm còn ít item hơn pick_count thì sao?",
  "check_ids": [
    "picking-modes:CHK-015"
  ]
}
```

## OQ-box-079 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-box-079",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "picking-modes",
  "summary": "Picking Mode Draw/BasePool và Tier Mode Shared/Independent ở admin panel ánh xạ chính xác thế nào với các lựa chọn của merchant trong portal (draw/pool và ba lựa chọn khi nhóm cạn, kể cả nhãn Refill / Redistribute / Deactivate)? Khi hai surface lệch nhau thì surface nào là nguồn sự thật?",
  "check_ids": [
    "picking-modes:CHK-017"
  ]
}
```

## OQ-box-080 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-box-080",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "picking-modes",
  "summary": "Đổi picking mode trên box đã publish/đã bán có ảnh hưởng tới các đơn đã có quà hay chỉ áp dụng cho đơn mới? Picking mode có nằm trong bản chụp version của box không?",
  "check_ids": [
    "picking-modes:CHK-018"
  ]
}
```

## OQ-box-081 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-box-081",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "picking-modes",
  "summary": "Ở mode Mặc định, một hộp Bundle có thể nhận cùng một item từ các set khác nhau không (ví dụ A ở set 1 và A ở set 2)?",
  "check_ids": [
    "picking-modes:CHK-019"
  ]
}
```

## OQ-box-082 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-box-082",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "picking-modes",
  "summary": "Khi nào picking mode \"Unique across pools\" lên production? Trên production, với box Bundle có cùng item ở nhiều set, mode này có đảm bảo một hộp không chứa cùng item hai lần (với cấu hình ví dụ thì cả 3 hộp đều là một A và một B) không?",
  "check_ids": [
    "picking-modes:CHK-020"
  ]
}
```

## OQ-box-083 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-box-083",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "picking-modes",
  "summary": "Với \"Unique across pools\", số hộp chứa một item có luôn bằng floor hoặc ceil của tổng số đơn vị item đó chia cho số hộp còn lại không (với cấu hình ví dụ: C ở cả 3 hộp, A ở 2 hộp, B ở 1 hộp), và hành vi này có giữ nguyên khi lên production không?",
  "check_ids": [
    "picking-modes:CHK-021"
  ]
}
```

## OQ-box-084 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-box-084",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "picking-modes",
  "summary": "Khi \"Unique across pools\" để một hộp rỗng vì mọi phương án đều không chia được: khách thấy gì, đơn và yêu cầu mở hộp xử lý ra sao, tồn kho và phí sử dụng có bị tính không? Cấu hình nào tái hiện được tình huống này?",
  "check_ids": [
    "picking-modes:CHK-022"
  ]
}
```

## OQ-box-085 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-box-085",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "picking-modes",
  "summary": "Với \"Unique across pools\" và item untracked, ứng viên có được xếp hạng theo số lần đã ra trong lượt rồi mới ngẫu nhiên theo chance không, \"lượt\" được đặt lại khi nào, và khi hết cách tránh trùng thì ứng viên tốt nhất được chọn theo tiêu chí gì?",
  "check_ids": [
    "picking-modes:CHK-023"
  ]
}
```

## OQ-box-086 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-box-086",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "picking-modes",
  "summary": "Kênh đặt \"Unique across pools\" cho một box là gì (route, method, field, vai trò được gọi)? Có đúng merchant không có màn hình bật mode này trong portal và box mới mặc định không dùng mode này không, kể cả khi lên production?",
  "check_ids": [
    "picking-modes:CHK-024"
  ]
}
```

## OQ-box-087 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-box-087",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "pool-refill",
  "summary": "Cơ chế khớp refill theo queue token (refill gắn với hàng đợi, không gắn version) và bản sửa cho lượt refill bị mất chỉ có trên nhánh build-staging, chưa lên production. Cần dev xác nhận khi nào thay đổi này lên production và hành vi refill trên production sau khi lên (box đổi version giữa lúc mua và resell có còn mất lượt trả không).",
  "kb_ids": [
    "pool-refill#KB-046",
    "pool-refill#KB-047",
    "pool-refill#KB-048",
    "pool-refill#KB-049"
  ]
}
```

## OQ-box-088 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-box-088",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "pool-refill",
  "summary": "Các check P1 (tiền / billing / bốc thăm / refund / store credit / permission / xoá dữ liệu) của feature này có oracle STRONG nhưng chỉ dựa trên tài liệu dev (dev_doc). Theo luật oracle, chúng giữ NEEDS_CONFIRMATION cho tới khi có test_case PASS (hoặc PO/Dev xác nhận trực tiếp) cho đúng hành vi. Danh sách check ở check_ids.",
  "check_ids": [
    "pool-refill:CHK-003",
    "pool-refill:CHK-004",
    "pool-refill:CHK-005",
    "pool-refill:CHK-007",
    "pool-refill:CHK-008",
    "pool-refill:CHK-010",
    "pool-refill:CHK-011",
    "pool-refill:CHK-012",
    "pool-refill:CHK-013",
    "pool-refill:CHK-014",
    "pool-refill:CHK-015"
  ]
}
```

## OQ-box-089 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-box-089",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "pool-refill",
  "summary": "Sau khi refill trả item về nhóm đã cạn, box đang bị deactivate có tự Activate lại không hay merchant phải bấm Activate? Khi Activate, kiểm tra pool cạn có cho qua và khách kế tiếp có thể trúng item vừa được trả không?",
  "check_ids": [
    "pool-refill:CHK-006"
  ]
}
```

## OQ-box-090 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-box-090",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "pool-refill",
  "summary": "Cơ chế khớp refill theo hàng đợi (mỗi hàng đợi pool có mã nhận dạng, item được trả nếu mã khớp hàng đợi hiện tại) và bản sửa cho lượt refill bị mất hiện chỉ có trên build-staging. Khi nào thay đổi này lên production, và trên production sau khi lên, box đổi version giữa lúc mua và resell có còn làm mất lượt trả không?",
  "check_ids": [
    "pool-refill:CHK-021"
  ]
}
```
