# Open Questions — Artwork

## OQ-artwork-001 — CONFLICT

```json
{"oq_id": "OQ-artwork-001", "type": "CONFLICT", "feature_id": "conditional-setting-config", "summary": "Evidence linking a toggle-source condition action to its network capture is unreliable, casting doubt on the API-level oracle for that specific observation (KB-066 area).", "side_a": "The recorded action ('choose Toggle as condition source, set value On') was linked to a specific network capture file as its evidence.", "side_b": "The actual content of that linked network capture file describes a completely different action (browsing 8 source options on a curve-text layer, then Cancel) and contains no PUT request at all — so the linkage was wrong or the two actions shared one capture window."}
```

## OQ-artwork-002 — CONFLICT

```json
{"oq_id": "OQ-artwork-002", "type": "CONFLICT", "feature_id": "layer-condition-value-binding", "summary": "Two observation passes on the same test artwork (4087) recorded different data state for addon-charge/json-list layers — most likely the fixture changed between passes, not a real product behavior conflict, but not confirmed.", "side_a": "First observation pass: layer addon-charge had no option values configured yet; layer json-list had no JSON URL configured yet.", "side_b": "Second observation pass (same artwork, later): addon-charge already had 2 options configured; json-list already had a source URL configured."}
```

## OQ-artwork-003 — CONFLICT

```json
{"oq_id": "OQ-artwork-003", "type": "CONFLICT", "feature_id": "layer-duplicate-link-copy", "summary": "An earlier assumption that linked-layer copies are marked with a chain icon on the layer row was checked directly and found false.", "side_a": "Assumption going into the run: a layer duplicated via 'Duplicate & Link options' shows a chain icon before its name on the layer row.", "side_b": "Direct observation across 35 layer types: the layer row icon set is always the same 5 fixed icons regardless of linked state; the only real signal that a layer is a linked copy is the config panel collapsing to just the LINKED LAYER + EXTRA accordions."}
```

## OQ-artwork-004 — CONFLICT

```json
{"oq_id": "OQ-artwork-004", "type": "CONFLICT", "feature_id": "layer-print-effects", "summary": "An assumption that Print Effects includes an emboss capability (gated by a 3rd-party service) could not be confirmed on the tested account/plan; absence was not proven either.", "side_a": "Assumption going into the run: Print Effects (formerly 'Shape Cut') now also includes an emboss effect that depends on a 3rd-party service.", "side_b": "Direct observation on 4 layer types plus the Extras > 3rd-party Services page: the Print Effects popover only ever shows shape-cut layout options; no mention of 'emboss' or '3rd-party' found anywhere on those surfaces."}
```

## OQ-artwork-005 — CONFLICT

```json
{"oq_id": "OQ-artwork-005", "type": "CONFLICT", "feature_id": "artwork-save-persist", "summary": "Whether a published OpenAPI spec for the Artwork API actually exists on staging is unconfirmed; 9 candidate paths all returned 404.", "side_a": "Project configuration assumes an OpenAPI spec is published at a known base path on staging.", "side_b": "All 9 standard candidate paths tried (the configured base path plus common variants like /docs, /swagger.json) returned an HTML 404 page, not a JSON spec."}
```

## OQ-artwork-006 — CONFLICT

```json
{"oq_id": "OQ-artwork-006", "type": "CONFLICT", "feature_id": "layer-common-config", "summary": "Two different-quality sources disagree on how many of the 35 layer types have a 'custom_class' field: code-derived list says 29, direct UI observation says 33.", "side_a": "Code-derived (bundle-registry, INFERRED): exactly 29 specific data-types carry a custom_class field.", "side_b": "Direct DOM observation across all 35 layer type config panels: the 'Custom class:' field renders on 33/35 types (absent only on Static Image and Static Vector)."}
```

## OQ-artwork-007 — CONFLICT

```json
{"oq_id": "OQ-artwork-007", "type": "CONFLICT", "feature_id": "artwork-save-persist", "summary": "Unclear whether artwork re-read after save goes through a dedicated GraphQL query, or is simply the client re-using the PUT response body labeled as 'GraphQL' by convention.", "side_a": "Portal observation notes label the read-back surface for several observations as 'GraphQL artworks.templates', implying a separate read query runs after save.", "side_b": "The two network captures available for those exact same observations contain only the validate-default-value POST and the PUT — no GraphQL request at all; the PUT response body alone already contains the full dependency/retrieval_* shape being described."}
```

## OQ-artwork-008 — CONFLICT

```json
{"oq_id": "OQ-artwork-008", "type": "CONFLICT", "feature_id": "layer-config-image", "summary": "Whether the layer-level 'Custom class' field exists on the Clipart Category (single) sub-type is disputed: the canonical 33/35 boundary says yes, a later deep-dive found no trace of it.", "side_a": "Canonical boundary knowledge (KB-011): 'Custom class' is present on 33/35 layer types, with only Static Image and Static Vector as named exceptions — implying Clipart Category (single) has it.", "side_b": "A later deep-dive on Clipart Category (single), scrolling the full Bulk Edit dialog (Design/Personalization/Extra) and checking the layer's API response directly, found no 'Custom class' field and no custom_class key anywhere."}
```

## OQ-artwork-009 — CONFLICT

```json
{"oq_id": "OQ-artwork-009", "type": "CONFLICT", "feature_id": "clipart-category-storefront-behavior", "summary": "Three-way disagreement on what actually drives the final rendered image for a Clipart Category layer: portal canvas, storefront pre-check, and the final compositing output each point to a different (or no) source.", "side_a": "In the portal editor, layer.url (set when picking an image via the 'Upload an image' tab at add-layer time) drives what renders on the canvas, both immediately and after Save & Close + reopen.", "side_b": "On the storefront personalization form, layer.default_value (set via the category default-value picker) is what gets pre-checked in the buyer-facing radiogroup on first load — layer.url is not even a selectable option there.", "side_c": "Neither layer.url, nor layer.default_value, nor the buyer's own explicit selection ever appears in the final compositing output (Preview modal or cart customization image) — see KB-112 (CRITICAL)."}
```

## OQ-artwork-010 — CONFLICT

```json
{"oq_id": "OQ-artwork-010", "type": "CONFLICT", "feature_id": "clipart-category-storefront-behavior", "summary": "Two API surfaces disagree on the clipart category list for the same user/session: REST returns an empty list, GraphQL returns 10 rows.", "side_a": "GET /api/layer-image-categories?type=clipart returns 200 with an empty array.", "side_b": "A GraphQL query for clipart_categories, run for the same user in the same time window, returns 200 with 10 rows."}
```

## OQ-artwork-011 — CONFLICT

```json
{"oq_id": "OQ-artwork-011", "type": "CONFLICT", "feature_id": "layer-config-image", "summary": "Text to Image (AI) personalization option count is disputed: canonical KB-019 says 2 choices (no 'No personalization'), a later re-observation (CCR CBS-003) found 3, corroborated by an independent observation on a different object (global-option).", "side_a": "Canon KB-019 (observed 2026-09-10): only 2 personalization choices exist for Text to Image (AI) — 'Create a new option' / 'Use an existing global option'. No 'No personalization' option.", "side_b": "Re-observation on 2026-09-25 (artwork 4416, layer 'hair'): all three choices are present — 'No personalization', 'Create a new option' (default), 'Use an existing global option'.", "side_c": "Corroborating, cross-object: an independent observation 10 days earlier on object global-option (CFL-01, artwork 4167) also saw all three choices; its escalation to the artwork object owner was never actioned before KB-019 was republished unchanged. No build/version/deploy-date is available to tell whether behavior genuinely changed or KB-019 was wrong from the start. KNOWN RISK: canonical checklist item CHK-007 for layer-config-image currently asserts '2 choices' with automation_suitability SUITABLE — any automation relying on it as an oracle should be audited."}
```

## OQ-artwork-012 — CONFLICT

```json
{"oq_id": "OQ-artwork-012", "type": "CONFLICT", "feature_id": "layer-config-vector", "summary": "x-ratelimit-remaining behavior for POST /api/layer-images/svg is inconsistent between two single-sample observations at different status codes; not enough evidence to state a rule.", "side_a": "Direct API test: 3 consecutive calls missing the required 'file' field (422 each time) — x-ratelimit-remaining stayed at 1000 (unchanged) across all 3 calls, while x-ratelimit-limit correctly showed 1000 each time.", "side_b": "UI-driven upload: 1 successful call (201) — x-ratelimit-remaining showed 999 (limit minus 1) on that request. Possibly the counter only increments on requests that pass validation, but with only 1 sample per side at different status codes, this is not confirmed as a rule."}
```

## OQ-artwork-013 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-013", "type": "NEEDS_CONFIRMATION", "feature_id": "artwork-list-management", "summary": "Chưa có evidence trực tiếp quan sát hành vi Cancel trên dialog này (chỉ có evidence cho việc dialog xuất hiện, không có evidence cho luồng Cancel). Đây là suy luận hợp lý theo UX convention, KHÔNG phải xác nhận — cần chạy thử để lấy oracle thật trước khi coi là expected chính thức."}
```

## OQ-artwork-014 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-014", "type": "NEEDS_CONFIRMATION", "feature_id": "artwork-list-management", "summary": "unknown_areas của feature profile: kết quả thực sự của 'Mark as archive' sau khi click chưa từng được quan sát trong KB gốc — cần chạy 1 lần và ghi lại trước/sau trạng thái để có oracle."}
```

## OQ-artwork-015 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-015", "type": "NEEDS_CONFIRMATION", "feature_id": "artwork-list-management", "summary": "unknown_areas của feature profile: chưa quan sát luồng dịch thuật artwork hoạt động thế nào — cần khám phá riêng."}
```

## OQ-artwork-016 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-016", "type": "NEEDS_CONFIRMATION", "feature_id": "artwork-list-management", "summary": "Chưa xác nhận đây là soft hay hard delete — ảnh hưởng trực tiếp policy mutation an toàn khi test. Cần dev/PO xác nhận trước khi chạy case này trên bất kỳ artwork nào ngoài artwork test chuyên dụng."}
```

## OQ-artwork-017 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-017", "type": "NEEDS_CONFIRMATION", "feature_id": "artwork-list-management", "summary": "coverage_gaps #3 của KB gốc: cả 3 run chỉgi test đúng 1 role (owner) trên 1 tenant. Hoàn toàn chưa có evidence permission/cross-tenant cho feature này."}
```

## OQ-artwork-018 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-018", "type": "NEEDS_CONFIRMATION", "feature_id": "artwork-save-persist", "summary": "coverage_gaps #5 của KB gốc: 2 lần 'thất bại' quan sát được trong 3 run đều do client chặn trước khi gửi request (circular dependency), KHÔNG phải server reject thật. Chưa có sample lỗi server thật nào — cần dev/PO cho biết điều kiện nào khiến endpoint này trả lỗi để dựng test case."}
```

## OQ-artwork-019 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-019", "type": "NEEDS_CONFIRMATION", "feature_id": "artwork-save-persist", "summary": "KB-021 flag đây là unknown — chưa rõ 2 field này bị loại khỏi serialization đọc lại hay lưu ở chỗ khác."}
```

## OQ-artwork-020 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-020", "type": "NEEDS_CONFIRMATION", "feature_id": "artwork-save-persist", "summary": "CONF-007 UNRESOLVED: 1 phía nói có GraphQL riêng (dựa trên nhãn surface=GraphQL trong evidence capture), phía kia nói 2 network capture cho đúng các ACT-ID liên quan chỉ có validate-default-value + PUT, KHÔNG có POST /v1/graphql nào. Cần capture network đầy đủ (không lọc bớt) ở bước mở lại editor để phân xử."}
```

## OQ-artwork-021 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-021", "type": "NEEDS_CONFIRMATION", "feature_id": "artwork-save-persist", "summary": "CONF-005 UNRESOLVED:.env/brief giả định có OpenAPI spec, nhưng 9 path thử đều 404 dạng HTML. Cho tới khi xác nhận, KHÔNG coi bảng field trong KB-020/021/022 là contract chính thức — mọi check field-shape ở checklist này chỉ ở mức BASELINE (quan sát), không phải STRONG (spec-confirmed)."}
```

## OQ-artwork-022 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-022", "type": "NEEDS_CONFIRMATION", "feature_id": "artwork-save-persist", "summary": "coverage_gaps #3 của KB gốc: chỉ 1 role 1 tenant được test trong cả 3 run nguồn. Hoàn toàn chưa có evidence permission cho toàn bộ luồng save/persist."}
```

## OQ-artwork-023 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-023", "type": "NEEDS_CONFIRMATION", "feature_id": "artwork-template-management", "summary": "Chưa từng quan sát artwork có ≥2 template trong evidence nguồn (artwork test chỉ có 1 template) — hành vi nút này ở trạng thái enable hoàn toàn chưa biết."}
```

## OQ-artwork-024 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-024", "type": "NEEDS_CONFIRMATION", "feature_id": "artwork-template-management", "summary": "unknown_areas: kết quả sau khi 'Convert to Global Template' hoàn tất chưa từng được quan sát — không biết global template có scope/state khác gì template thường."}
```

## OQ-artwork-025 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-025", "type": "NEEDS_CONFIRMATION", "feature_id": "artwork-template-management", "summary": "Chưa đối chiếu được UI field 'Extra charge for this template' với field API thực tế (KB-020 chỉ ghi nhận addons:[] và charge_enabled ở mức observed_count=1, chưa gắn với action cụ thể bật field này)."}
```

## OQ-artwork-026 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-026", "type": "NEEDS_CONFIRMATION", "feature_id": "artwork-template-management", "summary": "profile_relationships đánh dấu quan hệ này là INFERRED, chưa xác nhận — 'Import from artwork' có thể liên quan tới danh sách /artworks nhưng chưa có evidence trực tiếp."}
```

## OQ-artwork-027 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-027", "type": "NEEDS_CONFIRMATION", "feature_id": "clipart-category-storefront-behavior", "summary": "<select> chỉ có 1 option placeholder disabled 'Choose a design', 0 item selectable, dù category có 2 item xác nhận tồn tại server-side (no1, no2). correlation_note PLAUSIBLE (không CONFIRMED) cùng root cause với CONF-API-CTX20260921-03-01 (xem CHK-020, layer api) và KB-013 (layer-config-image.json CHK-026, layer portal) — 3 bề mặt riêng biệt, KHÔNG gộp thành 1 statement. Cần db-explorer/api-explorer follow-up trước khi báo bug chính thức."}
```

## OQ-artwork-028 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-028", "type": "NEEDS_CONFIRMATION", "feature_id": "clipart-category-storefront-behavior", "summary": "Server thêm key 'artwork-4339': 11533 (numeric) vào response mà client localStorage KHÔNG hề có tại thời điểm ghi trước đó — mục đích field này CHƯA xác định. Có thể là ID nội bộ quan trọng cho fulfillment/print — cần dev xác nhận trước khi coi absence trong client write là bình thường/vô hại."}
```

## OQ-artwork-029 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-029", "type": "NEEDS_CONFIRMATION", "feature_id": "clipart-category-storefront-behavior", "summary": "Giả thuyết CHƯA XÁC NHẬN: '_large' có thể bị giới hạn (capped) bởi độ phân giải gốc file upload gốc, không upscale vượt quá — độ phân giải gốc no1.png/no2.png KHÔNG được verify độc lập trong run (INFERRED). Nếu giả thuyết sai, nghĩa là Preview size setting (500px) đang KHÔNG hoạt động đúng bất kể ảnh gốc, cần điều tra thêm như 1 defect riêng."}
```

## OQ-artwork-030 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-030", "type": "NEEDS_CONFIRMATION", "feature_id": "clipart-category-storefront-behavior", "summary": "Đây là defect sản phẩm đã xác nhận (canvas/preview/cart PHẢI composite clipart đã chọn — nếu đúng, hiện tại đang FAIL nghiêm trọng) hay là artifact của test fixture (artwork:4339 layer sai z-order/position/opacity trên canvas 1600x1600, không phản ánh sản phẩm thật)? Cần: (1) PO/Dev xác nhận business rule mong đợi cho compositing; (2) re-test trên artwork/campaign MỚI (fixture cũ đã ARCHIVED/DELETED) để loại trừ nguyên nhân do fixture; (3) cross-check api-explorer/db-explorer. correlation_note: PLAUSIBLE (KHÔNG CONFIRMED) cùng root cause dữ liệu category/artwork test với CONF-API-CTX20260921-03-01 (CHK-003/CHK-020) và anomaly group default-value (layer-config-image.json CHK-026) do cùng category/artwork test — KHÔNG coi là đã xác nhận cùng nguyên nhân."}
```

## OQ-artwork-031 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-031", "type": "NEEDS_CONFIRMATION", "feature_id": "clipart-category-storefront-behavior", "summary": "3-way conflict CONF-CTX20260921-03-02 — SUB-SCOPE WIDGET (khác sub-scope compositing ở CHK-017): quan sát cho thấy layer.default_value ('no2') là giá trị PRE-CHECK trên storefront personalization RADIOGROUP lúc load đầu tiên; 'cat1' (url-pick) THẬM CHÍ KHÔNG PHẢI 1 option chọn được vì không phải item của category. Đây có đúng là business rule dự kiến (default_value luôn là nguồn pre-check hợp lệ duy nhất cho storefront, url chỉ dùng nội bộ portal) hay là 1 gap khác cần điều tra? Cần PO/Dev xác nhận. KHÔNG gộp kết luận với CHK-017 (sub-scope compositing) hay layer-config-image.json CHK-024/025 (sub-scope portal canvas) — 3 sub-scope riêng biệt của cùng 1 conflict."}
```

## OQ-artwork-032 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-032", "type": "NEEDS_CONFIRMATION", "feature_id": "clipart-category-storefront-behavior", "summary": "Chưa có evidence nào cho role/market/viewport khác — check này tồn tại để đóng coverage gap đã biết (PERMISSION/device dimension), KHÔNG dựa trên observation cụ thể nào. Cần storefront-explorer chạy thêm trước khi có thể chuyển sang READY."}
```

## OQ-artwork-033 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-033", "type": "NEEDS_CONFIRMATION", "feature_id": "clipart-category-storefront-behavior", "summary": "GET /api/layer-image-categories?type=clipart trả 200, body [] (rỗng); POST /api/graphql clipart_categories(where: {type: clipart, deleted_at: null, parent id: null}, limit: 25) trả 200, 10 rows, CÙNG user/session, CÙNG khoảng thời gian. Root cause CHƯA chẩn đoán (filter khác nhau trên endpoint REST vs GraphQL, hay data/cache issue riêng ở staging). Cần db-explorer/api-explorer follow-up trước khi coi là defect xác nhận. Hệ quả buyer-facing trực tiếp là <select> group-type storefront rỗng 0 item selectable (CHK-003). Correlation PLAUSIBLE (không CONFIRMED) với KB-013 (layer-config-image.json CHK-026, portal)."}
```

## OQ-artwork-034 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-034", "type": "NEEDS_CONFIRMATION", "feature_id": "clipart-category-storefront-behavior", "summary": "Conflict CONF-CTX20260921-03-01 không có nhánh buyer-facing/storefront — liệt kê ở đây CHỈ để tracking đầy đủ 3 conflict của run trong checklist của feature này, KHÔNG lặp lại narrative. Xem layer-config-image.json (FEAT-13, owner chính) CHK-028 cho nội dung đầy đủ."}
```

## OQ-artwork-035 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-035", "type": "NEEDS_CONFIRMATION", "feature_id": "clipart-category-storefront-behavior", "summary": "'Show option to select default value' OFF có ẩn/hiện gì khác trên personalization form storefront so với ON hay không — chỉ test ở trạng thái ON trong run này. Chưa đủ để viết checklist cho cấu hình OFF, có thể bỏ sót 1 nhánh hành vi hoàn toàn khác trên storefront. Check này tồn tại để đóng coverage gap, KHÔNG dựa trên observation cụ thể."}
```

## OQ-artwork-036 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-036", "type": "NEEDS_CONFIRMATION", "feature_id": "condition-cycle-validation", "summary": "BLK-API-002 (unknown nghiêm trọng nhất KB gốc): TOÀN BỘ evidence 3 run — PUT chưa BAO GIỜ được gửi với payload vòng vì client luôn chặn trước. validate-default-value vẫn 204 ngay cả 2 lần bị chặn — KHÔNG phải endpoint kiểm vòng. KHÔNG có evidence nào xác nhận hay bác bỏ việc server tự chặn vòng độc lập. Case này CẦN orchestrator duyệt trước khi chạy (direct-API mutation, ngoài SAFE_REVERSIBLE_ONLY mặc định nếu tạo dữ liệu vòng thật trong DB)."}
```

## OQ-artwork-037 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-037", "type": "NEEDS_CONFIRMATION", "feature_id": "condition-cycle-validation", "summary": "KB-041: self-loop chưa từng thử qua API trực tiếp (ngoài phạm vi portal-explorer/api-runtime-trace)."}
```

## OQ-artwork-038 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-038", "type": "NEEDS_CONFIRMATION", "feature_id": "condition-cycle-validation", "summary": "2/2 sample gốc đều ra 'Word Search' chỉ vì trùng hợp cấu trúc test data (layer duy nhất phụ thuộc cả 8 nguồn) — chưa tách biệt coincidence vs quy luật thật (vd theo thứ tự template/layer)."}
```

## OQ-artwork-039 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-039", "type": "NEEDS_CONFIRMATION", "feature_id": "condition-cycle-validation", "summary": "coverage_gaps #1 của KB gốc: 0 evidence storefront cho toàn bộ object Artwork. Đặc biệt quan trọng ở đây vì đây là edge case bảo vệ tính toàn vẹn dữ liệu — nếu server không chặn (CHK-008), hành vi render cần được biết trước khi coi tính năng này an toàn."}
```

## OQ-artwork-040 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-040", "type": "NEEDS_CONFIRMATION", "feature_id": "conditional-setting-config", "summary": "CONF-001: network_ref của action nguồn (ACT-02-01-001) trong evidence gốc trỏ nhầm vào 1 file mô tả action khác (không chứa PUT nào). Check này VẪN dùng được vì oracle chính là quan sát UI (screenshot), nhưng nếu cần verify thêm ở tầng API cho đúng action này, kết quả API-side hiện KHÔNG đáng tin cho tới khi CONF-001 được làm rõ."}
```

## OQ-artwork-041 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-041", "type": "NEEDS_CONFIRMATION", "feature_id": "conditional-setting-config", "summary": "Test tối đa đã thử là 8 condition (hết đúng số nguồn khả dụng trong artwork test), KHÔNG phải giới hạn thật của hệ thống — cần nhiều nguồn hơn 8 để xác định ngưỡng thật."}
```

## OQ-artwork-042 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-042", "type": "NEEDS_CONFIRMATION", "feature_id": "conditional-setting-config", "summary": "Không có UI cho lồng nhóm AND trong OR trong toàn bộ evidence hiện có — chưa xác nhận đây là giới hạn thiết kế cố ý hay chưa khám phá hết."}
```

## OQ-artwork-043 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-043", "type": "NEEDS_CONFIRMATION", "feature_id": "conditional-setting-config", "summary": "KB-033 chỉ observed_count=1 — chỉ quan sát đúng 2 dạng control, KHÔNG nên coi đây là toàn bộ tập toán tử hệ thống hỗ trợ."}
```

## OQ-artwork-044 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-044", "type": "NEEDS_CONFIRMATION", "feature_id": "conditional-setting-config", "summary": "Chưa có evidence nào cho việc server có validate 'layer type nào được phép có dependency' độc lập với UI hay không."}
```

## OQ-artwork-045 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-045", "type": "NEEDS_CONFIRMATION", "feature_id": "editor-layer-workspace", "summary": "Ungroup luôn disabled trong mọi sample nguồn vì chưa từng có group nào được tạo — chưa test được cặp Group/Ungroup end-to-end dù đây là action chính trên action bar."}
```

## OQ-artwork-046 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-046", "type": "NEEDS_CONFIRMATION", "feature_id": "editor-layer-workspace", "summary": "Chỉ test 1 account/1 plan (Blue Test) trong cả 3 run — chưa biết danh sách layer type có phụ thuộc plan/feature-flag không."}
```

## OQ-artwork-047 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-047", "type": "NEEDS_CONFIRMATION", "feature_id": "editor-layer-workspace", "summary": "KB-015 chỉ test riêng thư viện Vector — chưa rõ đây là hành vi chung cho mọi picker cần asset hay đặc thù riêng Vector."}
```

## OQ-artwork-048 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-048", "type": "NEEDS_CONFIRMATION", "feature_id": "layer-common-config", "summary": "CONF-006 UNRESOLVED: 2 nguồn evidence khác loại (code-derived INFERRED 29 type vs UI observed 33 type) không khớp phạm vi — cần đối chiếu chéo trực tiếp từng type trong 9 type chênh lệch để xác định nguồn nào đúng, hoặc cả 2 đều đúng theo nghĩa khác nhau."}
```

## OQ-artwork-049 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-049", "type": "NEEDS_CONFIRMATION", "feature_id": "layer-condition-value-binding", "summary": "KB-037 (nguồn duy nhất cho pattern này) có knowledge_kind INFERRED, KHÔNG phải OBSERVED_CURRENT hay CONFIRMED_EXPECTED — theo contract chỉ 2 loại đó mới là oracle hợp lệ. Pattern 'element luôn là layer id' được suy ra từ 10 sample (không có UI nào tạo element khác layer id) nhưng CHƯA được xác nhận là quy tắc hệ thống chính thức — không dùng làm assertion cứng cho tới khi có xác nhận."}
```

## OQ-artwork-050 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-050", "type": "NEEDS_CONFIRMATION", "feature_id": "layer-condition-value-binding", "summary": "Mọi sample có toggle làm nguồn condition trong 3 run nguồn đều chọn On (true) — KHÔNG nên giả định symmetry với true khi chưa xác nhận; ảnh hưởng trực tiếp tới test data cho negative case."}
```

## OQ-artwork-051 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-051", "type": "NEEDS_CONFIRMATION", "feature_id": "layer-condition-value-binding", "summary": "Multi-value chỉ xác nhận THẬT ở nguồn clipart-category (layer paragraph pre-existing, 2 giá trị webp path, KB-036). 6/8 type nguồn dạng array còn lại chỉ test với đúng 1 giá trị/condition — shape khi chọn ≥2 giá trị hoàn toàn chưa xác nhận cho 6 type này."}
```

## OQ-artwork-052 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-052", "type": "NEEDS_CONFIRMATION", "feature_id": "layer-condition-value-binding", "summary": "CONF-002 UNRESOLVED: R2 ghi nhận addon-charge CHƯA có option, json-list CHƯA có URL; R3 (cùng artwork 4087) ghi nhận CẢ HAI đã có dữ liệu. Nhiều khả năng do state đổi giữa 2 run (ai đó cấu hình thêm giữa 2 lần chạy) chứ không phải mâu thuẫn hành vi sản phẩm, nhưng KHÔNG tự kết luận theo contract §8 — PHẢI kiểm tra trạng thái thật của test data trước khi dùng làm precondition cho case khác."}
```

## OQ-artwork-053 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-053", "type": "NEEDS_CONFIRMATION", "feature_id": "layer-config-form-elements", "summary": "Quan sát 1 lần (capture Conditional Setting, KB-041): Color có Option Title đầy đủ nhưng KHÔNG xuất hiện làm nguồn condition, khác Font. Chưa xác nhận đây là thiết kế cố ý hay giới hạn kỹ thuật — cần dev/PO xác nhận trước khi coi là expected behavior."}
```

## OQ-artwork-054 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-054", "type": "NEEDS_CONFIRMATION", "feature_id": "layer-config-image", "summary": "bundle-registry (INFERRED) gợi ý 2 field cùng mục đích nhưng key khác nhau (text_to_image_provider/multi_image_provider) — chưa cross-check qua PUT body thật của chính 2 type này."}
```

## OQ-artwork-055 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-055", "type": "NEEDS_CONFIRMATION", "feature_id": "layer-config-image", "summary": "'Select a group of clipart categories' có hỗ trợ multi-category thật hay chỉ 1 category có nested children (Parent Category field)? Ảnh hưởng trực tiếp thiết kế test data & assertion cho group type — nếu chỉ 1-category-nested thì tên field 'group' gây hiểu nhầm."}
```

## OQ-artwork-056 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-056", "type": "NEEDS_CONFIRMATION", "feature_id": "layer-config-image", "summary": "3-way conflict CONF-CTX20260921-03-02: url drive canvas portal (nhánh a, CHK-024) / default_value drive form widget storefront (nhánh b, xem FEAT-19 CHK-018) / KHÔNG bên nào drive compositing cuối cùng (nhánh c, CRITICAL KB-030, xem FEAT-19 CHK-017). Ở PHẠM VI PORTAL: layer.default_value có ý nghĩa/tác dụng nào trên canvas editor hay hoàn toàn vô dụng ở đây (chỉ có tác dụng phía storefront)? Cần PO/Dev xác nhận trước khi viết assertion chính thức. KHÔNG gộp kết luận với 2 nhánh còn lại — xem full narrative ở FEAT-19 (owner chính của conflict)."}
```

## OQ-artwork-057 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-057", "type": "NEEDS_CONFIRMATION", "feature_id": "layer-config-image", "summary": "Combobox hiện 'List is empty.' dù category có 2 item xác nhận tồn tại server-side VÀ đã render đúng ở picker default-value của layer single-type CÙNG PHIÊN. correlation_note: PLAUSIBLE (KHÔNG CONFIRMED) cùng root cause với CONF-API-CTX20260921-03-01 (REST[]/GraphQL10-rows) — đây là 1 UI surface RIÊNG BIỆT, KHÔNG gộp thành 1 statement cho tới khi db-explorer/api-explorer xác nhận. Cần điều tra: request nào backing combobox này, filter gì khác so với picker default-value single-type."}
```

## OQ-artwork-058 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-058", "type": "NEEDS_CONFIRMATION", "feature_id": "layer-config-image", "summary": "GET REST trả [] (0 rows) trong khi GraphQL trả 10 rows cùng user/session cùng khoảng thời gian — root cause CHƯA chẩn đoán (filter khác nhau hay cache/data issue riêng staging). Cần db-explorer/api-explorer follow-up trước khi coi là defect xác nhận. Correlation PLAUSIBLE (không CONFIRMED) với KB-013 (CHK-026, portal) và KB-021 (FEAT-19, storefront) — 3 bề mặt riêng biệt, KHÔNG gộp thành 1 statement."}
```

## OQ-artwork-059 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-059", "type": "NEEDS_CONFIRMATION", "feature_id": "layer-config-image", "summary": "canonical v2 (published, MEDIUM confidence) khẳng định field 'Custom class:' là baseline PERSONALIZATION SETTINGS cho clipart-category (single). Evidence v3 (, LOW confidence, đã scroll hết Bulk Edit + kiểm tra API response cho cả layer 'cat1' single lẫn 'body' group) KHÔNG tìm thấy field này ở bất kỳ đâu. KHÔNG kết luận field đã bị xoá (regression thật) hay CHƯA từng tồn tại đúng như baseline claim (v2 sai) — cần PO/Dev xác nhận hoặc phát hiện panel single-layer settings riêng (khác Bulk Edit) trước khi kết luận. Xem thêm CHK-002 (v2 cũ, giữ nguyên, KHÔNG tự sửa)."}
```

## OQ-artwork-060 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-060", "type": "NEEDS_CONFIRMATION", "feature_id": "layer-config-image", "summary": "Field API 'show_clipart_name' chỉ quan sát giá trị null, CHƯA test bật/tắt toggle tương ứng — chỉ trùng tên, chưa xác nhận đây có đúng backing field cho UI toggle 'Show option name on hover' hay không. Nếu sai, có thể có 1 field UI khác chưa được map."}
```

## OQ-artwork-061 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-061", "type": "NEEDS_CONFIRMATION", "feature_id": "layer-config-image", "summary": "CHK-032 chỉ quan sát 1 sample (layer ĐÃ cấu hình làm destination) — chưa xác nhận thứ tự accordion 'Populate Values đầu tiên' có cố định cho MỌI layer photo (kể cả chưa cấu hình gì) hay chỉ xuất hiện khi Populate Values đã được cấu hình/bật trước đó. Ảnh hưởng cách viết test case assert thứ tự UI accordion — nếu chỉ đúng khi đã bật Populate Values, test case cần setup đúng precondition."}
```

## OQ-artwork-062 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-062", "type": "NEEDS_CONFIRMATION", "feature_id": "layer-config-image", "summary": "Chỉ quan sát trạng thái mặc định OFF của toggle 'Use Template Default Size' — chưa test tác dụng khi bật ON (ảnh hưởng size ảnh generate? disable field khác?). Không thể viết assertion chính thức tới khi có evidence."}
```

## OQ-artwork-063 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-063", "type": "NEEDS_CONFIRMATION", "feature_id": "layer-config-image", "summary": "Rule 'prompt required' (CHK-037, CHK-046) chỉ xác nhận với provider Gemini cho cả Multiple Uploads lẫn Text to Image — OpenAI/Flux/ImagenHub có cùng rule không? Rủi ro viết test case negative (prompt trống) chỉ đúng cho 1 provider rồi tổng quát sai cho provider khác."}
```

## OQ-artwork-064 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-064", "type": "NEEDS_CONFIRMATION", "feature_id": "layer-config-image", "summary": "CHK-040 chỉ test Maximum photos=3 (thấy token indexed {{input.1..3}}) — chưa test Maximum photos=1, không rõ token có đổi thành dạng trần '{{input}}' hay vẫn giữ '{{input.1}}'. Ảnh hưởng thiết kế test case populate content khi Multiple Uploads chỉ cho phép 1 ảnh."}
```

## OQ-artwork-065 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-065", "type": "NEEDS_CONFIRMATION", "feature_id": "layer-config-image", "summary": "1 lần thử ở UI cấu hình portal (chọn Flux) KHÔNG thấy cảnh báo unsupported-provider — nhưng cảnh báo có thể chỉ hiện lúc generate thật (chưa thử). Nếu cảnh báo chỉ hiện lúc generate, test case cấu hình UI hiện tại sẽ không phát hiện được vấn đề thật. Liên quan FEAT-09-genai-personalization-runtime (object sdk) cho phần generate thật."}
```

## OQ-artwork-066 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-066", "type": "NEEDS_CONFIRMATION", "feature_id": "layer-config-image", "summary": "CHK-044 chỉ quan sát trạng thái RỖNG (message hướng dẫn) khi CHƯA có layer Text/Additional Option khác — chưa quan sát behavior thật của picker khi CÓ option để chọn. Ảnh hưởng test case cho luồng variable binding trong prompt."}
```

## OQ-artwork-067 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-067", "type": "NEEDS_CONFIRMATION", "feature_id": "layer-config-image", "summary": "Trong 1 lần kiểm tra, Source option dropdown của Populate Content KHÔNG offer layer Text to Image (AI) làm nguồn (chỉ offer Multiple Uploads cùng session) — 1 SAMPLE PHỦ ĐỊNH, CHƯA đủ để kết luận Text-to-Image không bao giờ được offer làm nguồn populate. Cần re-test sau khi save artwork hoặc với artwork khác trước khi viết assertion chính thức (dù là assertion phủ định)."}
```

## OQ-artwork-068 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-068", "type": "NEEDS_CONFIRMATION", "feature_id": "layer-config-image", "summary": "KHÔNG tìm thấy Beta badge/text nào gắn với Text to Image (AI) ở CẢ portal config UI LẪN storefront Live Preview widget panel — nhưng 2 bề mặt này đều staff-authenticated proxy (KHÔNG phải guest thật), mỗi bề mặt chỉ 1 lần thử. KHÔNG kết luận 'không có Beta badge' cho storefront PDP/theme Shopify thật tới khi có evidence guest thật."}
```

## OQ-artwork-069 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-069", "type": "NEEDS_CONFIRMATION", "feature_id": "layer-config-image", "summary": "CONF-CBS003-01 (UNRESOLVED, CCR CBS-003): canon KB-019 (kb_version 3.0, đã publish) ghi 2 lựa chọn; quan sát (2026-09-25, artwork 4416, layer 'hair') ghi 3 lựa chọn (thêm 'No personalization'). KHÔNG có build/version/deploy-date nguồn để phân biệt 'hành vi đã đổi thật' vs 'KB-019 từng ghi sai lúc verify trước' (CCR CBS-003 Phần 3 để trống 'không rõ'). Cần authority (orchestrator/context-quality-reviewer, hoặc PO/Dev qua CCR) quyết định theo §8 của contract. KHÔNG được dùng làm oracle chính thức cho tới khi resolve — KHÔNG viết test case assert cứng '2 lựa chọn' hay '3 lựa chọn'."}
```

## OQ-artwork-070 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-070", "type": "NEEDS_CONFIRMATION", "feature_id": "layer-config-image", "summary": "TIB-5188 (thứ tự resize/crop và minimum-resolution validation của pipeline GenAI khi generate ảnh từ Multiple Uploads) HOÀN TOÀN CHƯA TEST — 'Set minimum size' để OFF trên fixture duy nhất của mọi run tính tới nay, bật toggle bị đánh giá ngoài ngân sách run. KHÔNG suy diễn thành 'không có vấn đề' hay pass/fail mặc định — coverage gap thật, cần run tiếp theo với ngân sách riêng."}
```

## OQ-artwork-071 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-071", "type": "NEEDS_CONFIRMATION", "feature_id": "layer-config-image", "summary": "Trong lần thử duy nhất, CẢ HAI route (chính và fallback) đều fail cùng lý do (ảnh bị client re-encode xuống dưới ngưỡng 10000 byte trước khi tới cả 2 route). Route fallback multipart THẬT SỰ TỒN TẠI và được tự động thử khi route chính lỗi (xác nhận), nhưng chưa có lần route fallback THÀNH CÔNG để so sánh downstream GenAI generate là sync hay async. KHÔNG suy diễn kết quả so sánh — cần fixture/ảnh input phù hợp hơn ở run tiếp theo."}
```

## OQ-artwork-072 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-072", "type": "NEEDS_CONFIRMATION", "feature_id": "layer-config-image", "summary": "'Duplicate & Share' (TIB-5326) KHÔNG tìm thấy ở CẢ portal editor lẫn storefront Live Preview cho layer Text to Image (AI)/Multiple Uploads — 2 agent độc lập cùng không tìm thấy, KHÔNG kết luận feature không tồn tại (có thể bị gate bởi điều kiện chưa trigger: nhiều biến thể generated, cart/order thật, plan cụ thể). Cần hỏi dev/PO trước khi viết test case chính thức."}
```

## OQ-artwork-073 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-073", "type": "NEEDS_CONFIRMATION", "feature_id": "layer-config-maps-astronomy", "summary": "Statement gốc (KB-024) tự ghi 'chưa verify trực tiếp trong evidence này' — map không render nếu thiếu Mapbox token là suy luận hợp lý, chưa phải quan sát thật."}
```

## OQ-artwork-074 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-074", "type": "NEEDS_CONFIRMATION", "feature_id": "layer-config-maps-astronomy", "summary": "Chưa xác nhận 'seacher' là typo THẬT của product code hay lỗi ghi chép evidence — nếu viết test/assertion theo tên field JSON, phải dùng đúng chuỗi thật trong code, không tự sửa chính tả."}
```

## OQ-artwork-075 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-075", "type": "NEEDS_CONFIRMATION", "feature_id": "layer-config-others", "summary": "Giới hạn 4296 ký tự (KB-034) là hint text UI quan sát 1 lần — CHƯA từng thử nhập vượt giới hạn để xác nhận hành vi thật, không tổng quát hoá thành validation rule chính thức."}
```

## OQ-artwork-076 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-076", "type": "NEEDS_CONFIRMATION", "feature_id": "layer-config-puzzles", "summary": "DOM dump gốc (KB-030) cho thấy 'Custom class:' xuất hiện 2 lần trong cùng panel — CHƯA XÁC NHẬN đây là 2 field JSON riêng hay lỗi render trùng của portal. Cần portal-explorer verify lại trực tiếp."}
```

## OQ-artwork-077 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-077", "type": "NEEDS_CONFIRMATION", "feature_id": "layer-config-text", "summary": "Hint 'enter number from 20' chỉ quan sát 1 lần (observed_count=1, KB-014) — chưa từng thử nhập giá trị <20 để biết đây là hard validation hay chỉ gợi ý UI."}
```

## OQ-artwork-078 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-078", "type": "NEEDS_CONFIRMATION", "feature_id": "layer-config-text", "summary": "bundle-registry hiện tại KHÔNG liệt kê field này gắn với layer type cụ thể nào — không thể viết assertion API/DB cho field này tới khi xác nhận được key."}
```

## OQ-artwork-079 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-079", "type": "NEEDS_CONFIRMATION", "feature_id": "layer-config-vector", "summary": "Static Vector chưa có per-type DOM dump riêng nào khác ngoài ngoại lệ Custom class — nếu type này có field riêng trong tương lai, cần tạo KB item per-type mới, không sửa KB-011."}
```

## OQ-artwork-080 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-080", "type": "NEEDS_CONFIRMATION", "feature_id": "layer-config-vector", "summary": "CONF-CBS004-001 (UNRESOLVED): 1 nguồn (api-explorer) quan sát 3 lần gọi liên tiếp 422 → remaining giữ nguyên = 1000 (không giảm); 1 nguồn khác (portal-explorer) quan sát 1 lần gọi 201 → remaining giảm 1 (999). Mỗi phía chỉ 1 sample, mỗi phía ở 1 status code khác nhau — KHÔNG đủ để khẳng định remaining chỉ giảm khi request THÀNH CÔNG hay theo quy tắc khác. KHÔNG tự resolve (đúng contract §8), KHÔNG dùng làm oracle behavior 'remaining' cho tới khi có thêm sample ở cả 2 status code. Cần orchestrator/reviewer quyết định hướng verify tiếp theo (vd chạy thêm N sample mỗi phía)."}
```

## OQ-artwork-081 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-081", "type": "NEEDS_CONFIRMATION", "feature_id": "layer-duplicate-link-copy", "summary": "Đây là hành vi cốt lõi được message UI khẳng định ('Design and personalization are synced from it') nhưng CHƯA được test end-to-end trong 3 run nguồn — chỉ xác nhận trạng thái NGAY SAU KHI tạo, chưa test sync thực sự qua 1 vòng sửa-lại-gốc."}
```

## OQ-artwork-082 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-082", "type": "NEEDS_CONFIRMATION", "feature_id": "layer-duplicate-link-copy", "summary": "Chưa rõ quy luật vì sao đúng 15/35 type rơi vào PLAIN_COPY — theo nhóm layer (form-elements/AI/upload) hay theo implementation riêng lẻ từng type — không dự đoán được cho layer type mới."}
```

## OQ-artwork-083 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-083", "type": "NEEDS_CONFIRMATION", "feature_id": "layer-duplicate-link-copy", "summary": "KB-020/KB-022 chỉ có full body cho 1 sample không chứa layer linked — chưa có oracle ở tầng API cho trạng thái linked, chỉ có oracle UI (accordion LINKED LAYER)."}
```

## OQ-artwork-084 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-084", "type": "NEEDS_CONFIRMATION", "feature_id": "layer-print-effects", "summary": "CONF-004 UNRESOLVED: brief giả định Print Effects đã có emboss phụ thuộc dịch vụ 3rd-party; quan sát thực tế trên 4/35 layer type + trang 3rd-party Services (plan Blue Test) không tìm thấy chuỗi 'emboss'/'3rd-party' ở đâu. KHÔNG kết luận emboss không tồn tại — có thể gate theo plan, layer type khác chưa thử, hoặc cấu hình 3rd-party service chưa bật. Cần dev/PO xác nhận."}
```

## OQ-artwork-085 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-085", "type": "NEEDS_CONFIRMATION", "feature_id": "layer-print-effects", "summary": "Chưa đối chiếu Print Effects với KB-020/KB-022 — chỉ có oracle UI (popover), chưa có oracle ở tầng API cho tính năng này."}
```

## OQ-artwork-086 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-086", "type": "NEEDS_CONFIRMATION", "feature_id": "layer-print-effects", "summary": "'Order Design' hoàn toàn chưa được khám phá trong 3 run nguồn — chỉ biết qua nội dung footnote, chưa xác nhận luồng production guide thật sự hoạt động ra sao."}
```

## OQ-artwork-087 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-087", "type": "NEEDS_CONFIRMATION", "feature_id": "populate-values", "summary": "Chỉ 1 sample quan sát (observed_count=1) — chưa xác nhận 13 nhóm này có tương ứng 1-1 đầy đủ với mọi layer/output type hay còn nhóm khác chưa liệt kê."}
```

## OQ-artwork-088 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-088", "type": "NEEDS_CONFIRMATION", "feature_id": "populate-values", "summary": "11 template biến đổi giá trị được liệt kê tên nhưng cú pháp thật sự hỗ trợ biểu thức/range gì của formula/context chưa từng được test với input cụ thể."}
```

## OQ-artwork-089 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-089", "type": "NEEDS_CONFIRMATION", "feature_id": "populate-values", "summary": "Chỉ test 2 channel Font và Color — chưa rõ cơ chế khoá theo Google Font có áp dụng cho Background/Shape hay là đặc thù riêng của Font."}
```

## OQ-artwork-090 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-090", "type": "NEEDS_CONFIRMATION", "feature_id": "populate-values", "summary": "0 evidence storefront cho Font/Color/Word Cloud/dynamic-by-text — đây là feature có mức độ 'chưa test nơi giá trị thực sự được dùng' cao nhất trong toàn bộ checklist (dù nay đã có 1 luồng khác — Multiple Uploads→Photo — có evidence storefront MỘT PHẦN, xem CHK-022)."}
```

## OQ-artwork-091 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-091", "type": "NEEDS_CONFIRMATION", "feature_id": "populate-values", "summary": "CHK-019 chỉ test Maximum photos=3 (thấy token indexed {{input.1..3}}) — chưa test Maximum photos=1, không rõ token có đổi thành dạng trần '{{input}}' hay vẫn giữ '{{input.1}}'. Ảnh hưởng thiết kế test case populate content khi Multiple Uploads chỉ cho phép 1 ảnh."}
```

## OQ-artwork-092 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-092", "type": "NEEDS_CONFIRMATION", "feature_id": "populate-values", "summary": "Trong session cấu hình artwork 4416, Source option dropdown của Populate Content trên layer đích 'body' CHỈ liệt kê layer Multiple Uploads ('top'); layer Text to Image (AI) ('hair') KHÔNG xuất hiện. Quan sát 1 lần duy nhất trong 1 cấu hình cụ thể — KHÔNG kết luận Text-to-Image không bao giờ được offer làm nguồn populate; cần re-test ở cấu hình/thời điểm khác trước khi viết assertion chính thức (dù là assertion phủ định)."}
```

## OQ-artwork-093 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-093", "type": "NEEDS_CONFIRMATION", "feature_id": "populate-values", "summary": "KB-008 (CHK-022) CHỈ xác nhận nửa 'giá trị gốc lan truyền ngay, không chờ Generate của layer nguồn'. Nửa còn lại (layer đích tự động trigger effect chain riêng của nó lên giá trị được populate, mô tả liên quan TIB-5302) KHÔNG xác nhận được trong run này vì layer 'body' của fixture không có effect nào cấu hình. KHÔNG suy diễn cơ chế effect tự trigger là đúng dù có TIB-5302 làm nguồn gợi ý (Jira KHÔNG phải authority theo §12.4 rule 2 của contract). Nếu sai giả định, test case cho layer đích CÓ effect cấu hình sẵn sẽ thiếu coverage quan trọng."}
```

## OQ-artwork-094 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-094", "type": "NEEDS_CONFIRMATION", "feature_id": "populate-values", "summary": "Phần storefront của KB-008 (CHK-022) quan sát qua Live Preview widget với vai trò staff-authenticated PROXY cho buyer (account Linh explorer), KHÔNG PHẢI guest session thật. KHÔNG dùng làm bằng chứng hành vi buyer thật 100% (vd cross-tenant, rate-limit, hoặc UI khác biệt trên theme Shopify thật chưa loại trừ) tới khi có evidence guest thật."}
```

## OQ-artwork-095 — OPEN_ISSUE

```json
{"oq_id": "OQ-artwork-095", "type": "OPEN_ISSUE", "feature_id": "artwork-save-persist", "summary": "3 of 4 successful PUT saves observed across the source runs only captured method/status (no full request+response body) — most field-level PUT behavior beyond the one fully-captured sample is unverified."}
```

## OQ-artwork-096 — OPEN_ISSUE

```json
{"oq_id": "OQ-artwork-096", "type": "OPEN_ISSUE", "feature_id": "object-wide", "summary": "No direct database (Postgres) access has been used for any Artwork observation to date — every 'data' claim in this object is inferred from Hasura GraphQL responses or PUT response echoes, never verified against the actual DB schema/rows."}
```

## OQ-artwork-097 — OPEN_ISSUE

```json
{"oq_id": "OQ-artwork-097", "type": "OPEN_ISSUE", "feature_id": "object-wide", "summary": "Every JSON field key attributed to a layer type via bundle-registry (code) across all layer-config-* features is INFERRED, not cross-checked directly against a live API/DB field for that specific type — treat as non-authoritative until confirmed."}
```

## OQ-artwork-098 — OPEN_ISSUE

```json
{"oq_id": "OQ-artwork-098", "type": "OPEN_ISSUE", "feature_id": "object-wide", "summary": "Storefront (buyer-facing) rendering has zero evidence for the large majority of layer types/features in this object (only Clipart Category and parts of Multiple Uploads/Text to Image/Photo Upload have any storefront evidence) — most storefront behavior for Artwork is completely unexplored."}
```

## OQ-artwork-099 — OPEN_ISSUE

```json
{"oq_id": "OQ-artwork-099", "type": "OPEN_ISSUE", "feature_id": "object-wide", "summary": "Every run to date tested exactly one role (store owner/staff, account 'Linh explorer') on one tenant/organization — no permission or cross-tenant behavior has been verified for any Artwork feature."}
```
