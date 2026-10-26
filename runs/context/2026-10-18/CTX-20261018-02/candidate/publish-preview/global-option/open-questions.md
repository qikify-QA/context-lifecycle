# Open Questions — Global Option

_Tổng hợp từ `kb.json` (conflicts, tagged qua `conflict_group`), `features/*/kb.json` và `checklists/*.json` (checks `status: NEEDS_CONFIRMATION`), object `global-option`. File này KHÔNG tự resolve bất kỳ mục nào — mọi resolution vẫn phải qua đúng authority (orchestrator + reviewer, hoặc PO/Dev cho câu hỏi nghiệp vụ)._

| Loại | Số lượng |
|---|---|
| CONFLICT | 5 |
| NEEDS_CONFIRMATION | 23 |
| OPEN_ISSUE | 9 |
| **Tổng** | **37** |

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

## OQ-global-option-022 — CONFLICT

```json
{"oq_id": "OQ-global-option-022", "type": "CONFLICT", "feature_id": "global-option-instance-management", "summary": "Đường edit-save của Global Option sau TIB-5467: Save còn gửi mutation 'updateGlobalOption' do client tự dựng (ghi thẳng DB) hay đã đi qua API có validation phía server? Cần PO/Dev quyết phía nào đúng, kèm tên operation/payload mới, để các check edit-save có oracle lại. Chính sách teeinblue không cho tự supersede nên cả hai phía đang UNRESOLVED.", "kb_ids": ["KB-006", "KB-034"], "conflict_group": "CONF-CBS-004-01", "side_a": "KB-006 (base, quan sát 2026-09-15): Save trên trang Edit gửi mutation Hasura 'updateGlobalOption' (update_global_options_by_pk) do client dựng tới POST /api/graphql.", "side_b": "KB-034 (CBS-004, test case PASS 2026-10-08, chỉ GO Single-line Text): edit-save đi qua API validation; Name rỗng bị chặn với 'Error — Global Option Name is required'."}
```

## OQ-global-option-023 — OPEN_ISSUE

```json
{"oq_id": "OQ-global-option-023", "type": "OPEN_ISSUE", "feature_id": "global-option-instance-management", "summary": "KB-023 (security surface: mutation 'updateGlobalOption' do client dựng) và các check edit-save dựa trên KB-006 (CHK-01-007, CHK-01-011, CHK-01-014 — đã hạ về NEEDS_CONFIRMATION) có thể đã lỗi thời sau TIB-5467. Cần tên operation/payload GraphQL mới của edit-save; khi CONF-CBS-004-01 được quyết, cập nhật KB-023 và khôi phục oracle cho các check này (hoặc tách nhánh edit thành check riêng).", "kb_ids": ["KB-023", "KB-006", "KB-034"]}
```

## OQ-global-option-024 — OPEN_ISSUE

```json
{"oq_id": "OQ-global-option-024", "type": "OPEN_ISSUE", "feature_id": "global-option-instance-management", "summary": "Edit-save qua API validation có áp dụng cho các loại Global Option khác Single-line Text (clipart, color, upload photo, maps, json list...) không, và hành vi khi save hợp lệ / Name rỗng ở từng loại là gì? Test case CBS-004 chỉ verify Single-line Text.", "kb_ids": ["KB-034"]}
```

## OQ-global-option-025 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-global-option-025", "type": "NEEDS_CONFIRMATION", "feature_id": "global-option-instance-management", "summary": "Sau Save trên màn tạo, các loại Global Option khác Additional Option có quay về danh sách /global-options không? Chỉ có mô tả của dev; test case chỉ chạy Additional Option (mở trang Edit, KB-033).", "kb_ids": ["KB-033"]}
```

## OQ-global-option-026 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-global-option-026", "type": "NEEDS_CONFIRMATION", "feature_id": "artwork-personalization-global-option-link", "summary": "'Option Title' của GO Additional Option có nên bắt buộc không? Khi để trống, customization data của order không có dòng '<Option Title>: <item>' và không báo lỗi (1 quan sát, KB-036) — by-design hay cần validation? Có rủi ro mất thông tin lựa chọn của buyer trên order.", "kb_ids": ["KB-036", "KB-035"]}
```

## OQ-global-option-027 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-global-option-027", "type": "NEEDS_CONFIRMATION", "feature_id": "artwork-personalization-global-option-link", "summary": "Dòng nhãn '<Option Title>: <item>' có xuất hiện trên API order/customization public và trên dữ liệu fulfillment không, theo format nào? Test case không ghi rõ đã kiểm surface nào (màn Customization info trên portal hay API order/customization public) — chỉ nói 'customization data của order'.", "kb_ids": ["KB-035"]}
```

## OQ-global-option-028 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-global-option-028", "type": "NEEDS_CONFIRMATION", "feature_id": "artwork-personalization-global-option-link", "summary": "Việc Quick-fill 'Source option' loại trừ cả layer GO Additional Option nguồn category có phải cố ý không (dev chỉ nói về nguồn inline)?", "kb_ids": ["KB-039"]}
```

## OQ-global-option-029 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-global-option-029", "type": "NEEDS_CONFIRMATION", "feature_id": "artwork-personalization-global-option-link", "summary": "Conditional Setting nhắm layer gắn GO Additional Option nguồn category có lấy danh sách 'is any of' từ item của category và hiện/ẩn layer điều kiện giống nguồn inline không? KB-037/KB-038 chỉ phủ nguồn inline.", "kb_ids": ["KB-037", "KB-038"]}
```

## OQ-global-option-030 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-global-option-030", "type": "NEEDS_CONFIRMATION", "feature_id": "artwork-personalization-global-option-link", "summary": "Các luồng Additional Option trong artwork/order (dòng nhãn order, Conditional Setting trên storefront) có hành xử giống trên store Shopify Plus không? CBS-004 chưa thử trên Shopify Plus.", "kb_ids": ["KB-035", "KB-038"]}
```

## OQ-global-option-031 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-global-option-031", "type": "NEEDS_CONFIRMATION", "feature_id": "global-option-additional-option-items", "summary": "Các luồng item của GO Additional Option (đổi nguồn, bulk action, thứ tự item, storefront) có hành xử giống trên store Shopify Plus không? CBS-004 chưa thử trên Shopify Plus.", "kb_ids": ["KB-040", "KB-041", "KB-042", "KB-043"]}
```

## OQ-global-option-032 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-global-option-032", "type": "NEEDS_CONFIRMATION", "feature_id": "global-option-additional-option-items", "summary": "Khi huỷ dialog 'Change additional option source?', nguồn item có giữ nguyên và Default value có được giữ không? KB-040 chỉ mô tả nhánh xác nhận.", "kb_ids": ["KB-040"]}
```

## OQ-global-option-033 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-global-option-033", "type": "NEEDS_CONFIRMATION", "feature_id": "global-option-additional-option-items", "summary": "Upload thumbnail cho một item inline lẻ hoạt động thế nào (chỉ gán cho item đó, persist sau save/reload)? Bulk 'Upload thumbnails' xử lý file không trùng tên item nào, và khi nhiều item trùng tên thì file được gán cho item nào? Test case chỉ phủ bulk upload khớp tên.", "kb_ids": ["KB-041"]}
```

## OQ-global-option-034 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-global-option-034", "type": "NEEDS_CONFIRMATION", "feature_id": "global-option-additional-option-items", "summary": "Storefront có cập nhật thứ tự item GO Additional Option mà không cần Update campaign không? KB-043 chỉ quan sát sau Update campaign.", "kb_ids": ["KB-043"]}
```

## OQ-global-option-035 — OPEN_ISSUE

```json
{"oq_id": "OQ-global-option-035", "type": "OPEN_ISSUE", "feature_id": "global-option-additional-option-items", "summary": "Sau khi đổi nguồn item của một GO Additional Option đang được dùng, customization/order đã có hiển thị gì, và Conditional Setting đang nhắm item cũ còn hoạt động không? Hiện chỉ có text cảnh báo của dialog (KB-040); rủi ro P1 với dữ liệu order cũ.", "kb_ids": ["KB-040"]}
```

## OQ-global-option-036 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-global-option-036", "type": "NEEDS_CONFIRMATION", "feature_id": "global-option-additional-option-items", "summary": "GO Additional Option nguồn category tạo trước deploy TIB-5467 có giữ nguyên hành vi (nguồn, category, Default value, item trên storefront) không? Test case cho trường hợp này bị skip.", "kb_ids": ["KB-040"]}
```

## OQ-global-option-037 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-global-option-037", "type": "NEEDS_CONFIRMATION", "feature_id": "global-option-additional-option-items", "summary": "PO xác nhận hai hành vi có thể gây mất dữ liệu là đúng ý định: đổi nguồn item xoá Default value và làm customization/order cũ không còn khớp (KB-040); Bulk 'Delete items' xoá item đã tick mà không khôi phục được (KB-041). Cả hai đã có test case PASS nhưng thuộc nhóm cần người quyết.", "kb_ids": ["KB-040", "KB-041"]}
```
