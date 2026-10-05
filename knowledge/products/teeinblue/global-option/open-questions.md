# Open Questions — Global Option

_Tổng hợp từ `kb.json` (conflicts, tagged qua `conflict_group`), `features/*/kb.json` và `checklists/*.json` (checks `status: NEEDS_CONFIRMATION`), object `global-option`. File này KHÔNG tự resolve bất kỳ mục nào — mọi resolution vẫn phải qua đúng authority (orchestrator + reviewer, hoặc PO/Dev cho câu hỏi nghiệp vụ)._

| Loại | Số lượng |
|---|---|
| CONFLICT | 4 |
| NEEDS_CONFIRMATION | 11 |
| OPEN_ISSUE | 6 |
| **Tổng** | **21** |

## OQ-global-option-001 — CONFLICT

```json
{"oq_id": "OQ-global-option-001", "type": "CONFLICT", "feature_id": "artwork-personalization-global-option-link", "summary": "Khi thêm layer type=text-to-image vào 1 artwork, panel Personalization Settings hiển thị 2 hay 3 radio option — có 'No personalization' hay không? Mâu thuẫn cross-object giữa object 'global-option' (run này) và object 'artwork' (đã publish, KB-019).", "side_a": "Object 'artwork' KB-019 (đã publish, quan sát 2026-09-10): text-to-image Personalization Settings chỉ liệt kê 'Create a new option' / 'Use an existing global option' — KHÔNG có 'No personalization'.", "side_b": "Object 'global-option', KB-017 (quan sát trực tiếp, 1 sample, LOW confidence): khi thêm layer type=text-to-image trên artwork mới tạo, Personalization Settings hiển thị 3 radio: 'No personalization', 'Create a new option' (mặc định), 'Use an existing global option'."}
```

## OQ-global-option-002 — CONFLICT

```json
{"oq_id": "OQ-global-option-002", "type": "CONFLICT", "feature_id": "global-option-instance-management", "summary": "Giá trị mặc định thật của field 'Category' trên Global Option instance là gì — tên category 'Uncategorized' có thật tồn tại, hay null-với-display-fallback là đúng hành vi hiện tại?", "side_a": "Bootstrap-request briefing (business input, không phải evidence): field 'Category' trên Global Option instance mặc định là category tên 'Uncategorized'.", "side_b": "Object 'global-option', KB-010/KB-011/KB-012 (7/7 sample tạo mới, MEDIUM-HIGH confidence): không có response tạo/sửa/clone nào trả về global_option_category_id khác null; form tạo hiển thị Category picker 'No category', 0 record chọn được; 'Uncategorized' trên list page chỉ là display-fallback text khi global_option_category_id=null, không tương ứng với category id/name thật nào."}
```

## OQ-global-option-003 — CONFLICT

```json
{"oq_id": "OQ-global-option-003", "type": "CONFLICT", "feature_id": "artwork-personalization-global-option-link", "summary": "Campaign 'status' field nội bộ (status=0) và UI 'Status' label ('Published on current store') có đo cùng 1 thứ không? Có ảnh hưởng trực tiếp tới việc campaign.status=0 có được dùng làm điều kiện chặn storefront reachability hay không.", "side_a": "Object 'global-option', KB-021 (nhiều lần phát biểu trong run, MEDIUM confidence): campaign #2605 là draft/unpublished dựa trên campaign.status=0; Launch chưa từng được bấm.", "side_b": "Object 'global-option', KB-027 (LOW confidence, ROUND 2): trang /campaigns list hiển thị Status = 'Published on current store' cho campaign #2605 (và 2 campaign khác); storefront product page độc lập được tìm thấy live/reachable/buyable xuyên suốt round 1-3 dù status=0 không đổi — mâu thuẫn trực tiếp với diễn giải status=0='unpublished'."}
```

## OQ-global-option-004 — CONFLICT

```json
{"oq_id": "OQ-global-option-004", "type": "CONFLICT", "feature_id": "artwork-personalization-global-option-link", "summary": "Tên/cơ chế localStorage lưu dữ liệu customization của Global Option có phụ thuộc vào 'type' của Global Option hay không — round 1 (type=text-to-image) và round 2/3 (type=text) cho 2 cơ chế khác nhau, chỉ 2/~29 type đã test.", "side_a": "Round 1, Global Option 862 (type=text-to-image): không tồn tại 'teeinblue-global-options' hay 'teeinblue-customizations'; key duy nhất là 'teeinblue-text-to-image-gen-state', khoá theo '<shopify_platform_product_id>:<layer_id>'.", "side_b": "Object 'global-option', KB-030 (ROUND 2/3, Global Option 860, type=text, MEDIUM confidence): cả 2 key 'teeinblue-global-options' (khoá theo global_option_id) và 'teeinblue-customizations' (key literal 'global-option-<id>') THỰC SỰ tồn tại, quan sát độc lập 2 lần. Giả thuyết hợp lý là cơ chế type-dependent (2 hệ thống coexist), nhưng theo chỉ đạo product-owner/orchestrator, KHÔNG được coi là đã giải quyết."}
```

## OQ-global-option-005 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-global-option-005", "type": "NEEDS_CONFIRMATION", "feature_id": "artwork-personalization-global-option-link", "summary": "Nội dung thực tế (pixel-level) của 2 file thiết kế ('_tib_design_link_1' front, '_tib_design_link_2' back) có chứa đúng giá trị buyer đã nhập cho CẢ HAI printarea hay không? Cần quyền truy cập backend/print-fulfillment (api-explorer/db-explorer credential) — cả 2 URL đều trả HTTP 403 AccessDenied (S3 'oe-cdn') ở 12/12 lần thử. Đây là điều kiện bắt buộc trước khi coi business rule KB-029 (share-value theo Global Option id) là 'visual confirmed' thay vì chỉ 'structural confirmed'."}
```

## OQ-global-option-006 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-global-option-006", "type": "NEEDS_CONFIRMATION", "feature_id": "artwork-personalization-global-option-link", "summary": "Business rule KB-029 (share-value theo Global Option id) có bao gồm live cross-field sync ngay lập tức (2 field storefront sống đồng thời, không cần reload) hay chỉ đảm bảo giá trị được backend lưu/dùng chung khi submit? Run này chỉ quan sát được same-field rehydration-on-reload, chưa từng có 2 field khác nhau sống đồng thời để test trực tiếp. Cần PO xác nhận phạm vi chính xác của rule."}
```

## OQ-global-option-007 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-global-option-007", "type": "NEEDS_CONFIRMATION", "feature_id": "artwork-personalization-global-option-link", "summary": "Preview/mockup (product-page mockup frame, in-portal PREVIEW modal, cart-page line-item thumbnail) LUÔN hiển thị khung trắng trống xuyên suốt cả 3 round, kể cả sau khi generate ảnh AI thành công và add-to-cart thành công — đây có phải limitation có chủ đích của cấu hình campaign hiện tại, hay 1 gap/defect độc lập cần fix? Độc lập với đúng/sai của business rule share-value (KB-029)."}
```

## OQ-global-option-008 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-global-option-008", "type": "NEEDS_CONFIRMATION", "feature_id": "artwork-personalization-global-option-link", "summary": "Quan hệ giữa data.required của chính Global Option instance (quan sát false, KB-019) và layer.required của artwork layer trỏ tới nó (quan sát true, KB-020) là gì — kế thừa, override độc lập, hay hoàn toàn không liên quan? Ảnh hưởng trực tiếp validate required-field ở storefront checkout — cần dev xác nhận trước khi viết test case required-validation."}
```

## OQ-global-option-009 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-global-option-009", "type": "NEEDS_CONFIRMATION", "feature_id": "artwork-personalization-global-option-link", "summary": "Business rule share-value (KB-029), dedupe-by-id (KB-028), và cơ chế localStorage (KB-030) có hành xử giống hệt cho buyer đã đăng nhập / cross-tenant, hay portal role khác owner, hay khác? Toàn bộ round 2/3 storefront chỉ test role guest, 1 tenant — cần round test riêng trước khi coi các rule này áp dụng phổ quát mọi role."}
```

## OQ-global-option-010 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-global-option-010", "type": "NEEDS_CONFIRMATION", "feature_id": "artwork-personalization-global-option-link", "summary": "Nếu 1 Global Option đang Used>0 (đã có layer/artwork/campaign tham chiếu) bị SỬA data hoặc bị XOÁ, layer/artwork/campaign đang tham chiếu có tự động phản ánh thay đổi (live reference), giữ nguyên snapshot cũ (deep copy), hay gặp lỗi/orphan reference? Hoàn toàn chưa test — rủi ro regression lớn, cần dev xác nhận cơ chế trước khi viết test case."}
```

## OQ-global-option-011 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-global-option-011", "type": "NEEDS_CONFIRMATION", "feature_id": "global-option-instance-management", "summary": "Endpoint/payload/mục đích thật của action 'Update campaign' (icon rocket, chỉ render khi Used>0) là gì? Hành động này chưa từng được gọi trong run này (loại trừ chủ động do blast radius không giới hạn lên campaign/artwork đang dùng option có sẵn). Đây có nên là 1 capability/feature riêng hay thuộc phạm vi feature quản lý instance? Cần PO/Dev xác nhận trước khi viết test case cho hành động này."}
```

## OQ-global-option-012 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-global-option-012", "type": "NEEDS_CONFIRMATION", "feature_id": "global-option-instance-management", "summary": "Field Category RIÊNG của type 'Additional Option' có thực sự là FK trực tiếp tới bảng /additional-options (object asset-category), hay chỉ là trùng dải id ngẫu nhiên (tương quan quan sát: data.additional_option=6009)? Hiện giữ INFERRED, chưa có xác nhận schema/DB — cần db-explorer xác nhận trước khi coi đây là 1 rule."}
```

## OQ-global-option-013 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-global-option-013", "type": "NEEDS_CONFIRMATION", "feature_id": "global-option-instance-management", "summary": "Field Category RIÊNG của type 'Vector Category' (tái dùng component picker clipart, lưu dưới key 'clipart', data.clipart=6007) có thực sự liên quan tới bảng /vectors hay chỉ tái dùng UI component của clipart mà không có quan hệ dữ liệu thật? Hiện giữ INFERRED — cần db-explorer xác nhận schema."}
```

## OQ-global-option-014 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-global-option-014", "type": "NEEDS_CONFIRMATION", "feature_id": "global-option-instance-management", "summary": "Backend có validate header client-supplied 'x-acting-user-id' đối chiếu session/tenant thật không, hay tin tưởng hoàn toàn giá trị client gửi? Quan sát thấy header này được gửi trên 100% request (REST + GraphQL) nhưng chưa test forge/cross-tenant. Cần PO/Dev xác nhận cách server implement trước khi viết oracle cho test case cross-tenant/forge."}
```

## OQ-global-option-015 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-global-option-015", "type": "NEEDS_CONFIRMATION", "feature_id": "global-option-instance-management", "summary": "Server có enforce tenant-scoping ở tầng Hasura permission/row-level-security cho GraphQL query 'getData' (list Global Option, client tự set where/order_by/offset/limit), hay hoàn toàn dựa vào 'where' client tự dựng? Chưa test cross-tenant read-attempt — cần security review trước khi coi đây là an toàn."}
```

## OQ-global-option-016 — OPEN_ISSUE

```json
{"oq_id": "OQ-global-option-016", "type": "OPEN_ISSUE", "feature_id": "artwork-personalization-global-option-link", "summary": "Picker 'Use an existing global option' chỉ được test lọc-theo-type với 1 layer type (text-to-image) trong toàn bộ 30 leaf type. Chưa biết hành vi lọc có giống hệt cho 29 leaf type còn lại, hay picker mở trên 1 layer type khác sẽ lọc-hiện/lọc-ẩn khác đi."}
```

## OQ-global-option-017 — OPEN_ISSUE

```json
{"oq_id": "OQ-global-option-017", "type": "OPEN_ISSUE", "feature_id": "global-option-instance-management", "summary": "Route Maps / Star Maps / Moon Phase (3/4 leaf type nhóm Maps & Astronomy) có lưu type='maps' giống Street Maps (leaf duy nhất nhóm này đã tạo thực tế) hay type string riêng cho từng leaf? Chưa tạo, hoàn toàn unknown."}
```

## OQ-global-option-018 — OPEN_ISSUE

```json
{"oq_id": "OQ-global-option-018", "type": "OPEN_ISSUE", "feature_id": "global-option-instance-management", "summary": "Form Text to Image (AI): bấm Save trước khi chọn 'GenAI service*' (do đó field Prompt bắt buộc chưa hiện ra) tạo ra silent no-op — không network call, không lỗi hiển thị. Có nên có thông báo lỗi rõ ràng ở đây không, và nếu có thì message chuẩn là gì? Chỉ 1 sample, chưa có oracle cho negative case này."}
```

## OQ-global-option-019 — OPEN_ISSUE

```json
{"oq_id": "OQ-global-option-019", "type": "OPEN_ISSUE", "feature_id": "artwork-personalization-global-option-link", "summary": "Ý nghĩa của field 'artwork-4172': '' (chuỗi rỗng) bên trong request body POST /api/merchant/shopify/customization là gì — khả năng chỉ là current_version_id=null của artwork 4172 bị stringify, nhưng chưa xác nhận với api-explorer/db-explorer. Ghi nhận nguyên trạng, chưa điều tra."}
```

## OQ-global-option-020 — OPEN_ISSUE

```json
{"oq_id": "OQ-global-option-020", "type": "OPEN_ISSUE", "feature_id": "global-option-instance-management", "summary": "23/30 leaf layer type của Global Option hoàn toàn chưa được tạo/test (chỉ 7/30 đã tạo); và trong số 7 đã tạo, 6/7 fixture (mọi type trừ Text) chưa test Edit/Clone/Delete riêng — cơ chế CRUD generic hiện chỉ là GIẢ ĐỊNH type-agnostic dựa trên endpoint chung, chưa xác minh trực tiếp theo từng type."}
```

## OQ-global-option-021 — OPEN_ISSUE

```json
{"oq_id": "OQ-global-option-021", "type": "OPEN_ISSUE", "feature_id": "global-option-instance-management", "summary": "Nhóm 'Dynamic Clipart by Text' (2 leaf con: Manual Placement, Auto Placement) hiện 'Unavailable'/disabled, hoàn toàn không tạo được ở trạng thái hiện tại. Lý do (feature flag / plan tier / rollout) chưa được điều tra."}
```
