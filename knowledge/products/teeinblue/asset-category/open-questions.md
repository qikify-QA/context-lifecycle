# Open Questions — Asset Category

## OQ-asset-category-001 — OPEN_ISSUE

```json
{"oq_id": "OQ-asset-category-001", "type": "OPEN_ISSUE", "feature_id": "_object-level", "summary": "Không có tầng dữ liệu (DB) nào được verify cho object asset-category: mọi state delta (category được tạo/sửa/clone/xoá, item con được thêm) chỉ dựa trên response API/GraphQL và DOM, chưa từng đối chứng với DB thật. Vì vậy không kết luận được cấu trúc bảng, ràng buộc unique, hay hành vi cascade/soft-delete ở tầng persistence."}
```

## OQ-asset-category-002 — OPEN_ISSUE

```json
{"oq_id": "OQ-asset-category-002", "type": "OPEN_ISSUE", "feature_id": "_object-level", "summary": "Cross-role và cross-tenant thiếu hoàn toàn trên cả 4 feature: môi trường test chỉ còn 1 account khả dụng (owner 'Linh explorer'), không có account store thứ 2 để kiểm tra quyền xem/thao tác category và item của store khác. Dimension PERMISSION vì vậy bị exclude ở cả 4 checklist. Riêng trường hợp cross-tenant của insert_cliparts (xem OQ-asset-category-017) còn bị chặn thêm bởi permission classifier của công cụ thực thi."}
```

## OQ-asset-category-003 — OPEN_ISSUE

```json
{"oq_id": "OQ-asset-category-003", "type": "OPEN_ISSUE", "feature_id": "_object-level", "summary": "Rate-limit của các route asset-category chỉ được verify ở mức GIÁ TRỊ limit đọc từ header (user_rate_limiter:clipart = 4000, user_rate_limiter:clipart_category = 1000 — KB-035/KB-036). Chưa verify runtime window reset 24h, và chưa biết 6 loại category (clipart/vector/color/additional_option/map/font) có dùng CHUNG counter clipart_category hay mỗi loại một counter riêng."}
```

## OQ-asset-category-004 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-asset-category-004", "type": "NEEDS_CONFIRMATION", "feature_id": "asset-category-route-entity-clarification", "summary": "CRUD thật của Global Option instance (chọn 1 trong 29 layer type, tạo/sửa/xoá) chưa từng được thực hiện trong phạm vi object này — chỉ mở rồi đóng modal 'Select a layer type'. Cần PO xác nhận đây có còn là phạm vi ưu tiên của object AssetCategory hay đã thuộc hoàn toàn object global-option, trước khi build test case đầy đủ. Liên quan: CHK-007 (asset-category-route-entity-clarification)."}
```

## OQ-asset-category-005 — OPEN_ISSUE

```json
{"oq_id": "OQ-asset-category-005", "type": "OPEN_ISSUE", "feature_id": "asset-category-route-entity-clarification", "summary": "Quan hệ chính xác giữa field 'Category' (mặc định 'Uncategorized') của một Global Option instance và category-object ở /additional-options chưa rõ: chỉ phân biệt được ở mức UI, chưa verify qua API schema hay DB xem field đó có liên kết id tới category-object hay chỉ là text độc lập. Theo quyết định phạm vi ngày 2026-09-14, phần Global Option được theo dõi ở object global-option — câu hỏi này chuyển phạm vi theo dõi, KHÔNG được coi là đã trả lời. Liên quan: CHK-006 (OUT_OF_SCOPE_DECISION)."}
```

## OQ-asset-category-006 — CONFLICT

```json
{"oq_id": "OQ-asset-category-006", "type": "CONFLICT", "feature_id": "asset-category-crud", "summary": "Khung diễn giải nào đúng cho hiện tượng field `type` của category thiếu hậu tố '_category': bug riêng của Clipart phát lộ qua Clone, hay vấn đề naming-convention không nhất quán trên 4/6 loại category ngay từ lúc create? PO đã xác nhận PHẦN HẸP (giá trị 'clipart' ổn định qua create+clone, KB-020) nhưng chưa quyết khung diễn giải rộng, và chưa quyết đây là defect cần fix (đổi enum cho nhất quán) hay thiết kế cố ý. Giữ cả 2 phía, KHÔNG tự chọn. Liên quan: KB-038/KB-039 (conflict_group CFL-001), CHK-011 (asset-category-crud).", "side_a": "Field `type` của category Clipart đáng lẽ phải là 'clipart_category' (tương tự color_category/font_category); việc thiếu hậu tố là 1 lỗi/regression CHỈ xảy ra ở loại Clipart và phát lộ qua thao tác Clone (khung diễn giải gốc của câu hỏi đặt cho PO, PO trả lời 'B đúng' cho quan sát cụ thể).", "side_b": "Evidence API-level (14 sample CREATE + 4 sample CLONE) cho thấy `type` LUÔN giữ nguyên giá trị mà CREATE trả về khi đi qua Clone ở cả 4 loại đã sample; sự khác biệt có/không hậu tố là thuộc tính của TỪNG type ngay từ lúc CREATE: clipart/vector/additional_option/map KHÔNG hậu tố (4/6 loại), color_category/font_category CÓ hậu tố (2/6 loại). Đây là naming-convention không nhất quán trên nhiều loại, không phải hành vi riêng của Clone hay riêng của Clipart."}
```

## OQ-asset-category-007 — CONFLICT

```json
{"oq_id": "OQ-asset-category-007", "type": "CONFLICT", "feature_id": "asset-category-crud", "summary": "Giá trị `type` mong đợi khi tạo category Vector: kỳ vọng literal trong yêu cầu test ghi 'vector_category', còn evidence network qua 2 lần quan sát độc lập cho 'vector'. Chưa rõ kỳ vọng literal là khẳng định giá trị mong đợi thật hay chỉ là cách diễn đạt tắt — cần authority (PO/Dev) quyết. Cùng nhóm root cause với OQ-asset-category-006. Liên quan: KB-040/KB-041 (conflict_group CFL-002), CHK-013 (asset-category-crud).", "side_a": "Yêu cầu test ghi kỳ vọng: 'tạo 1 category Vector, xác nhận type=\"vector_category\" đúng trong request/response network' — ngụ ý giá trị mong đợi CÓ hậu tố '_category'.", "side_b": "Evidence network thực tế: cả request và response của POST /api/clipart-categories khi tạo category Vector đều mang type='vector', KHÔNG có hậu tố '_category' (quan sát 2026-09-10 và 2026-09-14, xem KB-003/KB-021)."}
```

## OQ-asset-category-008 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-asset-category-008", "type": "NEEDS_CONFIRMATION", "feature_id": "asset-category-crud", "summary": "Chưa biết server/client validate như thế nào khi nhập Preview size / Thumbnail size ngoài range cho phép (100-1600px): reject, clamp, hay chấp nhận. Không có sample lỗi nào cho luồng này. Cần PO/Dev xác nhận rule hoặc chạy thêm sample lỗi trước khi coi đây là test case chính thức. Liên quan: CHK-008 (asset-category-crud)."}
```

## OQ-asset-category-009 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-asset-category-009", "type": "NEEDS_CONFIRMATION", "feature_id": "asset-category-crud", "summary": "Claim về action buttons trên sidebar tree category detail (Delete / Duplicate / 'Add new sub-category' / 'Sub-category options') KHÔNG có evidence hợp lệ: ảnh evidence gốc khi đọc lại hiển thị form edit category chứ không phải sidebar tree, nên KB-010 đang ở trạng thái UNVERIFIED. Cần chụp lại cụ thể sidebar tree trên category detail (Clipart/Color và các loại còn lại) trước khi coi đây là expected behavior. Liên quan: CHK-014 (asset-category-crud), KB-010."}
```

## OQ-asset-category-010 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-asset-category-010", "type": "NEEDS_CONFIRMATION", "feature_id": "asset-category-crud", "summary": "Server CHO PHÉP tạo category tên trùng với category đã tồn tại (trả 201, không validate duplicate name — KB-029). Đây là hành vi mong đợi (data-integrity by design) hay defect cần thêm validate unique name? 1 sample duy nhất, chỉ test trên loại Clipart; đây là finding ngoài phạm vi câu hỏi gốc (chỉ hỏi validation khi Name rỗng) nên PO chưa trả lời. Cần PO/Dev xác nhận trước khi đóng. Liên quan: CHK-016 (asset-category-crud), KB-029."}
```

## OQ-asset-category-011 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-asset-category-011", "type": "NEEDS_CONFIRMATION", "feature_id": "asset-category-crud", "summary": "Rate-limit của POST /api/clipart-categories chỉ có 3 sample 422 liên tiếp (x-ratelimit-limit=1000 không đổi; remaining cũng không đổi — có thể do request lỗi validation dừng trước middleware, hoặc do behavior riêng của remaining, KHÔNG kết luận). Chưa có sample 201 để đối chứng behavior remaining khi thành công, chưa verify runtime reset sau 24h, chưa test riêng từng loại category. Cần thêm sample ở cả 2 trạng thái (422/201) và ở nhiều loại category trước khi viết assertion boundary. Liên quan: CHK-018 (asset-category-crud), KB-036."}
```

## OQ-asset-category-012 — OPEN_ISSUE

```json
{"oq_id": "OQ-asset-category-012", "type": "OPEN_ISSUE", "feature_id": "asset-category-crud", "summary": "Field trên form 'New category'/'Edit category' chỉ còn xác nhận được cho loại Clipart (KB-008). Form của Vector / Color / Additional Option / Map Style / Font Category (range Preview 100-1600px, Thumbnail 100/300/500px, số Display option riêng) chưa được quan sát lại — KHÔNG dùng KB-008 làm oracle cho 5 loại đó."}
```

## OQ-asset-category-013 — OPEN_ISSUE

```json
{"oq_id": "OQ-asset-category-013", "type": "OPEN_ISSUE", "feature_id": "asset-category-crud", "summary": "KB-019 (clipart item hỗ trợ soft-delete) chỉ là INFERRED từ shape filter GraphQL `where: {deleted_at: {_is_null: true}}`; chưa từng test hành động xoá 1 item con để biết item bị xoá mềm hay xoá hẳn."}
```

## OQ-asset-category-014 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-asset-category-014", "type": "NEEDS_CONFIRMATION", "feature_id": "asset-category-item-management", "summary": "Cơ chế 'Add new' của Font category (nút enabled sẵn, mở modal chọn font có sẵn — khác Color/Additional Option/Map Style) chưa được re-verify độc lập: evidence gốc của KB-012 bị loại trừ vì thiếu ảnh before+after và không có evidence thay thế. KB-031 (click thật, modal 'Select a font' mở, POST /api/cliparts/font được gọi) corroborate mạnh nhưng không test lại đúng object_state gốc. Cần thao tác lại nút 'Add new' trên 1 category Font hiện có (6019/6027) để xác nhận độc lập trước khi coi đây là expected behavior. Liên quan: CHK-003 (asset-category-item-management), KB-012."}
```

## OQ-asset-category-015 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-asset-category-015", "type": "NEEDS_CONFIRMATION", "feature_id": "asset-category-item-management", "summary": "Chưa biết POST /api/staff-activity-logs/clipart có được gọi hay không khi mutation insert_cliparts THẤT BẠI — không có sample insert lỗi nào. Cần PO/Dev xác nhận hoặc chạy thêm sample lỗi. Liên quan: CHK-006 (asset-category-item-management), KB-013."}
```

## OQ-asset-category-016 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-asset-category-016", "type": "NEEDS_CONFIRMATION", "feature_id": "asset-category-item-management", "summary": "Khi upload file .txt vào dropzone Clipart, server vẫn cấp presigned URL (201) dù mimetype sai (KB-034); bước sau (PUT lên storage + POST /api/cliparts/by-temporary-file) chưa được capture trong 2 đợt quan sát liên tiếp nên chưa biết 1 clipart item 'giả' (non-image) có thực sự được tạo hay bị chặn ở bước cuối. Cần chạy lại với capture đầy đủ hơn (chờ lâu hơn, check lại tree item list) hoặc PO/Dev xác nhận server có validate ở bước cuối. Liên quan: CHK-009 (asset-category-item-management), KB-034."}
```

## OQ-asset-category-017 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-asset-category-017", "type": "NEEDS_CONFIRMATION", "feature_id": "asset-category-item-management", "summary": "Chưa biết server có chặn mutation insert_cliparts khi client gửi clipart_category_id KHÔNG thuộc store của mình hay không. KB-017 ghi nhận client gọi thẳng GraphQL table-level mutation tới /v1/graphql, tự build variables.objects, không qua REST backend riêng — đây là bề mặt bảo mật severity MEDIUM. Test cross-tenant đầy đủ cần account store thứ 2 (hiện chỉ còn 1 account) và đang BLOCKED thêm bởi permission classifier của công cụ thực thi khi prompt nhắc tới account/store B; đây là giới hạn hạ tầng thực thi, KHÔNG phải blocker của hệ thống đang test. KHÔNG kết luận có/không lỗ hổng cross-tenant. Liên quan: CHK-010 (asset-category-item-management), KB-017."}
```

## OQ-asset-category-018 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-asset-category-018", "type": "NEEDS_CONFIRMATION", "feature_id": "asset-category-item-management", "summary": "Presigned storage URL cho luồng upload item đơn lẻ đã biết TTL=300s và scope ký chỉ ràng buộc Host (KB-028), nhưng chưa có negative test (dùng URL sau khi hết TTL, hoặc từ context/user khác) để xác nhận enforcement thực sự đúng. Giữ NEEDS_CONFIRMATION mức nhẹ, không phải blocker. Dùng chung dữ liệu với OQ-asset-category-026 (bulk zip, TTL=600s). Liên quan: CHK-011 (asset-category-item-management), KB-018/KB-028."}
```

## OQ-asset-category-019 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-asset-category-019", "type": "NEEDS_CONFIRMATION", "feature_id": "asset-category-item-management", "summary": "Map Style item: mutation insert_cliparts chỉ quan sát thấy gửi name + position (KB-011); chưa rõ có field cấu hình bắt buộc nào khác (mapbox style URL/JSON) cần thiết để map style hoạt động thật trong sản phẩm. Cần PO/Dev xác nhận trước khi coi 'chỉ cần name' là đủ. Liên quan: CHK-012 (asset-category-item-management), KB-011."}
```

## OQ-asset-category-020 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-asset-category-020", "type": "NEEDS_CONFIRMATION", "feature_id": "asset-category-item-management", "summary": "Vector nhận file .png (sai định dạng) trả 500 kèm full stack trace + đường dẫn file nội bộ server (information disclosure), đồng thời UI hiển thị lỗi dưới dạng '[object Object]' (KB-032). Đây là known-issue/defect đang chờ dev triage, severity đề xuất LOW-MEDIUM, quan sát trên staging và chưa biết có xảy ra ở production (debug mode có thể đã tắt). KHÔNG coi '500 + stack trace' là expected behavior đã chốt: khi dev fix, check này phải re-baseline (kỳ vọng 4xx có message rõ ràng, không lộ stack trace, UI hiển thị message đọc được). 1 sample duy nhất. Liên quan: CHK-014 (asset-category-item-management), KB-032."}
```

## OQ-asset-category-021 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-asset-category-021", "type": "NEEDS_CONFIRMATION", "feature_id": "asset-category-item-management", "summary": "Toàn bộ evidence hiện có cho POST /api/cliparts/svg CHƯA từng có sample upload .svg THÀNH CÔNG (201) — chỉ có sample lỗi (422 thiếu field 'file', và 500 do upload nhầm .png). Vì vậy không đối chứng được behavior x-ratelimit-remaining khi request thành công, cũng không verify được runtime reset window 24h của resource user_rate_limiter:clipart. Cần ít nhất 1 sample upload .svg hợp lệ thành công trước khi viết assertion boundary đầy đủ. Liên quan: CHK-017 (asset-category-item-management), KB-035/KB-015."}
```

## OQ-asset-category-022 — OPEN_ISSUE

```json
{"oq_id": "OQ-asset-category-022", "type": "OPEN_ISSUE", "feature_id": "asset-category-item-management", "summary": "POST /api/staff-activity-logs/clipart chỉ xuất hiện ở một phần sample Add-new-item: 3/3 category cũ có entry, nhưng với category mới thì chỉ 1/3 (Map Style) có — Color và Additional Option không có, và đúng tỉ lệ 1/3 này tái xuất hiện ở một đợt quan sát độc lập khác. Khả năng cao là capture-timing-gap chứ không phải hành vi khác nhau theo loại category, nhưng chưa đủ cơ sở kết luận dứt điểm. Liên quan: KB-013."}
```

## OQ-asset-category-023 — OPEN_ISSUE

```json
{"oq_id": "OQ-asset-category-023", "type": "OPEN_ISSUE", "feature_id": "asset-category-item-management", "summary": "Open-issue cũ 'nút Add new disabled vĩnh viễn' từng ghi nhận trên 3 category gốc 6008/6009/6010 đã được xác nhận KHÔNG phải bug ở mức cơ chế chung (KB-023, PO xác nhận 2026-09-14, cộng dồn 9/9 sample nhất quán trên 3 nhóm category độc lập). Tuy vậy chưa re-test TRỰC TIẾP trên đúng 3 category gốc đó, nên câu hỏi hẹp 'liệu 3 category gốc có vấn đề DATA riêng' về lý thuyết vẫn mở (độ ưu tiên đã giảm nhiều). Cần authority (PO/Dev) quyết định coi vấn đề đã đủ trả lời hay cần thêm 1 đợt test trực tiếp trên category gốc. Liên quan: KB-011/KB-023."}
```

## OQ-asset-category-024 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-asset-category-024", "type": "NEEDS_CONFIRMATION", "feature_id": "asset-category-bulk-upload", "summary": "Check upload zip đúng tại giá trị biên (ngưỡng tối đa) chưa viết được test case cụ thể: phụ thuộc việc xác định giới hạn thật được enforce. Banner UI cho plan Blue ghi 2GB/10 file (KB-022) nhưng đó là banner tĩnh phía client; cần PO/Dev xác nhận giá trị chính thức theo plan hoặc test biên thật. Liên quan: CHK-005 (asset-category-bulk-upload), KB-022."}
```

## OQ-asset-category-025 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-asset-category-025", "type": "NEEDS_CONFIRMATION", "feature_id": "asset-category-bulk-upload", "summary": "Chỉ test 1 zip có đúng 1 top-level folder duy nhất ('valid-images 2'), không có folder con lồng nhau và không trùng tên category đã tồn tại. Hành vi với cấu trúc folder phức tạp hơn (nested) hoặc tên top-level folder trùng category đã có (tạo mới, merge, hay lỗi?) hoàn toàn chưa biết. Cần chạy thêm sample hoặc PO/Dev xác nhận business rule. Liên quan: CHK-009 (asset-category-bulk-upload), KB-016."}
```

## OQ-asset-category-026 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-asset-category-026", "type": "NEEDS_CONFIRMATION", "feature_id": "asset-category-bulk-upload", "summary": "Presigned storage URL cho bước PUT của luồng bulk-upload zip đã biết TTL=600s và scope ký chỉ ràng buộc Host (KB-028), nhưng chưa có negative test (dùng URL sau khi hết TTL 600s, hoặc từ context/user khác) để xác nhận enforcement thực sự đúng. Giữ NEEDS_CONFIRMATION mức nhẹ, không phải blocker. Dùng chung dữ liệu với OQ-asset-category-018 (item đơn lẻ, TTL=300s). Liên quan: CHK-010 (asset-category-bulk-upload), KB-018/KB-028."}
```

## OQ-asset-category-027 — OPEN_ISSUE

```json
{"oq_id": "OQ-asset-category-027", "type": "OPEN_ISSUE", "feature_id": "asset-category-bulk-upload", "summary": "Giới hạn bulk-upload zip đã xác định được GIÁ TRỊ cho plan Blue (2GB/10 file, KB-022, PO xác nhận là tuỳ plan), nhưng CHƯA biết server có thực sự ENFORCE con số đó hay không: không có sample vượt ngưỡng (>2GB hoặc >10 file) trong bất kỳ đợt quan sát nào — chỉ có banner tĩnh, 1 zip nhỏ hợp lệ và 1 file sai mimetype. Giới hạn của các plan khác ngoài Blue cũng chưa verify. Ghi chú KB cũ (512MB/2 file) không bị xoá vì có thể đúng cho 1 plan khác."}
```

## OQ-asset-category-028 — OPEN_ISSUE

```json
{"oq_id": "OQ-asset-category-028", "type": "OPEN_ISSUE", "feature_id": "asset-category-bulk-upload", "summary": "Trong 5 status job bulk-upload (Uploading / Extracting / delayed / Done / Error) chỉ 2/5 có network evidence trực tiếp: Extracting và Error (KB-026/KB-027). 3/5 status còn lại (Uploading, delayed, Done) chỉ dựa vào PO-answer và quan sát UI của job cũ — assertion dựa trên 3 status này phải gắn nhãn độ tin cậy thấp hơn, đặc biệt Done (job thành công trả Done ngay ở lần GET đầu, không có sample trạng thái trung gian)."}
```

## OQ-asset-category-029 — OPEN_ISSUE

```json
{"oq_id": "OQ-asset-category-029", "type": "OPEN_ISSUE", "feature_id": "asset-category-bulk-upload", "summary": "Chỉ test 1 định dạng sai (.txt) cho input 'Upload zip' và nhận 422 'The selected mimetype is invalid.' (KB-025). Chưa rõ các định dạng sai khác (.rar, .7z, .tar.gz) có nhận cùng status/message hay có case đặc biệt (ví dụ client-side accept nhưng server reject theo cách khác)."}
```
