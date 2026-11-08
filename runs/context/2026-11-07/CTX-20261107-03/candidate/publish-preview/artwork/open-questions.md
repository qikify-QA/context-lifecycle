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

## OQ-artwork-100 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-100", "type": "NEEDS_CONFIRMATION", "feature_id": "text-multi-stroke", "summary": "Stack stroke của Paragraph (tối đa 3 lớp, width là độ dày riêng từng vòng, xếp từ mép chữ ra ngoài theo thứ tự row, xoá/đổi thứ tự giữ dữ liệu) có phải hành vi đúng theo PO/business, và có giữ nguyên trên build TIB-5580 khi ship không? Mới là quan sát một lượt chạy test staging trước khi ship; checklist không có oracle xác nhận cho các check cốt lõi của feature.", "kb_ids": ["KB-129", "KB-130", "KB-131"]}
```

## OQ-artwork-101 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-101", "type": "NEEDS_CONFIRMATION", "feature_id": "text-multi-stroke", "summary": "Gửi thẳng PUT /api/artworks/{id} cho Paragraph với stroke_layers có entry thứ 4, hoặc width không phải số, thì server từ chối, cắt bớt hay lưu nguyên? Giới hạn 3 lớp chỉ thấy ở UI (nút 'Add stroke' disable); không có oracle cho validate phía server của artwork.", "kb_ids": ["KB-129"]}
```

## OQ-artwork-102 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-102", "type": "NEEDS_CONFIRMATION", "feature_id": "text-multi-stroke", "summary": "Paragraph mới tạo khi stroke còn tắt có lưu sẵn entry stroke_layers không, và mặc định (tắt; bật lên 1 row #FF0000 / 1px; stroke_color/stroke_width bằng lớp trong cùng) có phải hành vi đúng? Dữ liệu lưu khi stroke tắt chưa quan sát; check dữ liệu mặc định của paragraph mới không có oracle.", "kb_ids": ["KB-132"]}
```

## OQ-artwork-103 — OPEN_ISSUE

```json
{"oq_id": "OQ-artwork-103", "type": "OPEN_ISSUE", "feature_id": "text-multi-stroke", "summary": "Preview storefront (SDK) hiển thị Paragraph nhiều lớp stroke thế nào (thứ tự vành, round, autoscale, layer linked) khi SDK staging có code TIB-5580? SDK staging chưa có code TIB-5580 nên mọi phần storefront của các test case bị Blocked; buyer thấy preview storefront trước khi đặt hàng.", "kb_ids": ["KB-133", "KB-138", "KB-139"]}
```

## OQ-artwork-104 — OPEN_ISSUE

```json
{"oq_id": "OQ-artwork-104", "type": "OPEN_ISSUE", "feature_id": "text-multi-stroke", "summary": "Bản SVG (vectorize) của order design có đúng thứ tự vành, góc round, không vẽ vành khi stroke tắt, không cắt vành khi autoscale — cho Paragraph và Text 1 dòng? Không có đường tải SVG order design trên portal staging; SVG là một đầu ra in nhưng hoàn toàn chưa được kiểm.", "kb_ids": ["KB-133", "KB-134", "KB-135", "KB-139", "KB-143"]}
```

## OQ-artwork-105 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-105", "type": "NEEDS_CONFIRMATION", "feature_id": "text-multi-stroke", "summary": "PNG order design khớp preview Artwork Editor (fill trên mọi vành, góc round, autoscale không cắt vành) có phải hành vi đúng, và mức chênh lệch bề dày vành nào là chấp nhận được khi đo pixel? Kết luận render đều dựa trên so sánh bằng mắt, chưa có xác nhận PO/business; check render không có ngưỡng đo khách quan.", "kb_ids": ["KB-130", "KB-133", "KB-134", "KB-139"]}
```

## OQ-artwork-106 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-106", "type": "NEEDS_CONFIRMATION", "feature_id": "text-multi-stroke", "summary": "Tắt stroke giữ nguyên stroke_layers (stroke_enabled=false) và bật lại khôi phục các lớp cũ có phải hành vi đúng? Quyết định check 'tắt rồi bật lại' kỳ vọng khôi phục hay reset; chưa có xác nhận.", "kb_ids": ["KB-135"]}
```

## OQ-artwork-107 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-107", "type": "NEEDS_CONFIRMATION", "feature_id": "text-multi-stroke", "summary": "Convert Paragraph nhiều lớp sang Spiral Text và các loại layer khác ngoài Curve/Warp Text cho kết quả gì, và việc gộp về lớp trong cùng (bỏ lớp ngoài) có phải hành vi đúng? Mới quan sát Curve và Warp; người dùng mất lớp ngoài khi convert, cần biết đó là thiết kế hay lỗi. Cần PO xác nhận việc bỏ các lớp stroke ngoài khi convert sang Curve/Warp là chủ đích (dữ liệu stroke ngoài bị mất khỏi bản lưu).", "kb_ids": ["KB-136", "KB-137"]}
```

## OQ-artwork-108 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-108", "type": "NEEDS_CONFIRMATION", "feature_id": "text-multi-stroke", "summary": "Vành của Paragraph linked scale chính xác theo tỉ lệ kích thước (đo được) không, và PNG order design của layer linked có đúng như preview editor không? Tỉ lệ mới đánh giá bằng mắt trên preview editor; PNG của layer linked chưa kiểm.", "kb_ids": ["KB-138"]}
```

## OQ-artwork-109 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-109", "type": "NEEDS_CONFIRMATION", "feature_id": "text-multi-stroke", "summary": "Việc Custom Shape text và Paragraph trên Artwork 1.0 chỉ có 1 stroke (không có stack) là quyết định sản phẩm đã duyệt chưa, và Paragraph Artwork 1.0 sau khi đổi width lưu payload thế nào? Phạm vi loại trừ mới là quan sát hiện tại; payload Paragraph Artwork 1.0 chưa kiểm được vì fixture không Save được.", "kb_ids": ["KB-140", "KB-141", "KB-142"]}
```

## OQ-artwork-110 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-110", "type": "NEEDS_CONFIRMATION", "feature_id": "text-multi-stroke", "summary": "Multi-stroke của Text 1 dòng (TIB-5417) có giữ nguyên trong editor, API và PNG trên build TIB-5580 khi ship không? Regression mới kiểm trên build staging chưa ship; cần kiểm lại sau khi ship.", "kb_ids": ["KB-143"]}
```

## OQ-artwork-111 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-111", "type": "NEEDS_CONFIRMATION", "feature_id": "text-multi-stroke", "summary": "Server phải từ chối/loại bỏ stroke_layers sai do buyer gửi kèm personalization (4 entry, width không phải số), hay chấp nhận nhưng bỏ qua khi render là đủ? API hiện trả 201 và echo phần chèn (BUG-357); chưa ai phân xử nên check của luồng này không có expected result. Cần PO xác nhận ý định (item mới chạm ranh giới ghi dữ liệu của buyer chưa đăng nhập, BUG-357).", "kb_ids": ["KB-144"]}
```

## OQ-artwork-112 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-112", "type": "NEEDS_CONFIRMATION", "feature_id": "text-multi-stroke", "summary": "Server có thực sự lưu stroke_layers do buyer chèn vào customization, hay chỉ echo trong response? Việc lưu chỉ suy từ response echo; nếu được lưu, phần chèn có thể ảnh hưởng đầu ra khác (storefront, SVG) chưa kiểm.", "kb_ids": ["KB-144"]}
```

## OQ-artwork-113 — OPEN_ISSUE

```json
{"oq_id": "OQ-artwork-113", "type": "OPEN_ISSUE", "feature_id": "text-multi-stroke", "summary": "Ai đã đổi status Testlane của task TIB-220 sau lượt chạy, và status hay actualResult mới là kết quả đúng của các test case lệch ('passed' trong khi actualResult ghi Blocked; TC-TIB-6338 'skipped' trong khi actualResult ghi Fail)? Các test case này không dùng được làm nguồn xác nhận cho tới khi status và actualResult khớp.", "kb_ids": ["KB-133", "KB-138", "KB-139", "KB-142", "KB-144"]}
```

## OQ-artwork-114 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-114", "type": "NEEDS_CONFIRMATION", "feature_id": "artwork-save-persist", "summary": "Vì sao PUT /api/artworks/5187 trả 500 'Server Error' kể cả khi Save không đổi gì trên bản copy Artwork 1.0 chưa có version đã lưu — lỗi dữ liệu của bản copy, lỗi sản phẩm với artwork Artwork 1.0 chưa có version, hay liên quan TIB-5580? Quyết định đây là bug sản phẩm cần check hồi quy hay chỉ là fixture hỏng; cần log server để phân biệt.", "kb_ids": ["KB-145"]}
```

## OQ-artwork-115 — OPEN_ISSUE

```json
{"oq_id": "OQ-artwork-115", "type": "OPEN_ISSUE", "feature_id": "artwork-save-persist", "summary": "Các artwork Artwork 1.0 khác (không phải bản copy #5187, kể cả artwork gốc #2164 hoặc artwork 1.0 đã có version lưu) có Save được không? Cần một artwork Artwork 1.0 Save được làm fixture để chạy lại check Paragraph Artwork 1.0; hiện chưa biết phạm vi của lỗi 500.", "kb_ids": ["KB-145"]}
```

## OQ-artwork-116 — OPEN_ISSUE

```json
{"oq_id": "OQ-artwork-116", "type": "OPEN_ISSUE", "feature_id": "artwork-save-persist", "summary": "Khi PUT /api/artworks/{id} trả 500, Artwork Editor hiển thị gì cho người dùng (toast/thông báo lỗi, giữ thay đổi chưa lưu hay không)? KB-145 chỉ ghi artwork không Save được, không ghi phản hồi UI; check negative cho lỗi server khi Save chưa có oracle.", "kb_ids": ["KB-145"]}
```

## OQ-artwork-117 — OPEN_ISSUE

```json
{"oq_id": "OQ-artwork-117", "type": "OPEN_ISSUE", "feature_id": "text-multi-stroke", "summary": "Global template: stroke_layers của Paragraph có là field local (không bị merge từ global template) và spiral/shape text vẫn 1 stroke không? Chưa kiểm được: fixture global template dựng qua API không mở được trong Artwork Editor trên staging (chưa rõ lỗi fixture hay lỗi sản phẩm).", "kb_ids": []}
```

## OQ-artwork-118 — OPEN_ISSUE

```json
{"oq_id": "OQ-artwork-118", "type": "OPEN_ISSUE", "feature_id": "text-multi-stroke", "summary": "Shadow của Paragraph: theo mô tả dev của TIB-5580 (PR api #4016), shadow áp 1 lần cho cả khối ở vectorize và PNG, và preview/PNG/SVG không được lệch; thay đổi này có thể làm sai ghi nhận cũ về shadow paragraph của TIB-5472. Trong lượt test staging 2026-10-21→22, editor và PNG order design cho thấy một khối shadow cho cả paragraph và PNG khớp editor (2 order Bogus); SVG và preview storefront SDK chưa kiểm. Phần editor + PNG đã quan sát nay là KB-251 (OBSERVED_CURRENT/LOW, CBS-017); quy tắc cho cả 3 renderer chưa có nguồn xác nhận. Cần chạy lại khi SDK staging có code và tải được SVG, hoặc nguồn PO/dev xác nhận.", "kb_ids": ["KB-251"]}
```

## OQ-artwork-119 — OPEN_ISSUE

```json
{"oq_id": "OQ-artwork-119", "type": "OPEN_ISSUE", "feature_id": "text-multi-stroke", "summary": "Fill opacity < 1 với Paragraph nhiều lớp stroke: quy tắc 'bleed trong 1 dòng là known issue, vùng stroke 2 dòng chồng nhau đậm gấp đôi là lỗi' chỉ là đáp án của QA, chưa kiểm (SVG không tải được, SDK chưa có code). Ngoài ra ở một order PNG trên staging, vành stroke trắng trông mỏng hơn hẳn so với preview editor (ước lượng bằng mắt, chưa rõ nguyên nhân) — KB-133 chỉ áp cho các stack đã so khớp, chưa áp cho trường hợp này.", "kb_ids": ["KB-133"]}
```

## OQ-artwork-120 — OPEN_ISSUE

```json
{"oq_id": "OQ-artwork-120", "type": "OPEN_ISSUE", "feature_id": "text-multi-stroke", "summary": "Import PSD có paragraph nhiều lớp stroke: chưa có test case, chưa có kiến thức về cách stroke_layers được tạo khi import.", "kb_ids": []}
```

## OQ-artwork-121 — OPEN_ISSUE

```json
{"oq_id": "OQ-artwork-121", "type": "OPEN_ISSUE", "feature_id": "text-multi-stroke", "summary": "Chọn nhiều layer cùng lúc (Text + Paragraph) rồi chỉnh stroke: ngoài phạm vi kiểm của TIB-5580 theo trao đổi nội bộ QA, chưa có kiến thức; chưa có xác nhận PO đây là ngoài phạm vi sản phẩm.", "kb_ids": []}
```

## OQ-artwork-122 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-122", "type": "NEEDS_CONFIRMATION", "feature_id": "text-color-sequence-render", "summary": "Hành vi đúng (PO/business) của render text rainbow trên Locate Artwork và Order Design PNG — căn phải/giữa/trái, độ rộng bằng text 1 màu, autoscale tên dài, letter spacing, kerning — có đúng như đang quan sát (khớp preview SDK) không? Hiện chỉ là quan sát một lượt chạy trên staging, chưa ai xác nhận; checklist không có oracle cho các nhánh này.", "kb_ids": ["KB-146", "KB-147", "KB-148", "KB-149", "KB-151", "KB-152"]}
```

## OQ-artwork-123 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-123", "type": "NEEDS_CONFIRMATION", "feature_id": "text-color-sequence-render", "summary": "Text font thường (Roboto) và text 1 màu trên Order Design PNG có thật khớp preview SDK không, khi đo lại có số đo và fixture? Chỉ có tóm tắt kết quả, không có actualResult chi tiết; muốn làm baseline cho nhánh không rainbow cần chạy lại có số đo.", "kb_ids": ["KB-150"]}
```

## OQ-artwork-124 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-124", "type": "NEEDS_CONFIRMATION", "feature_id": "text-color-sequence-render", "summary": "Stroke 1 lớp liền mạch ở chỗ nối chữ và text RTL giữ màu từng chữ theo thứ tự preview SDK có phải hành vi đúng không? Quan sát một lượt trên staging (stroke đánh giá bằng mắt, RTL chỉ font Heebo), chưa có PO/business xác nhận.", "kb_ids": ["KB-153", "KB-155"]}
```

## OQ-artwork-125 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-125", "type": "NEEDS_CONFIRMATION", "feature_id": "text-color-sequence-render", "summary": "Với text rainbow mang multi-stroke, Order Design PNG đúng ra phải thế nào — stroke liền mạch ở chỗ nối chữ như preview SDK? PNG hiện có sợi màu chữ đè lên stroke (BUG-363); không có expected được xác nhận thì không viết được check pass/fail cho nhánh này.", "kb_ids": ["KB-154"]}
```

## OQ-artwork-126 — OPEN_ISSUE

```json
{"oq_id": "OQ-artwork-126", "type": "OPEN_ISSUE", "feature_id": "text-color-sequence-render", "summary": "BUG-363 (sợi màu chữ đè stroke ở chỗ nối, rainbow + multi-stroke) có từ trước bản fix TIB-5606 hay do bản fix gây ra? Một nguồn ngoài (TC-TIB-4045, verified 2026-10-01) ghi rainbow + multi-stroke render đúng 3 vành, màu từng chữ giữ nguyên — khác build/font với lượt chạy 2026-10-22. Nếu bản fix gây ra, đây là regression của multi-stroke.", "kb_ids": ["KB-154"]}
```

## OQ-artwork-127 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-127", "type": "NEEDS_CONFIRMATION", "feature_id": "text-color-sequence-render", "summary": "Curve Text rainbow ở căn phải render thế nào, Curve Text trước bản fix có lỗi không, và bản fix có áp dụng cho Curve Text không? Chỉ chạy được căn giữa vì Curve Text không có tuỳ chọn căn lề (FEAT-12, KB-157); phạm vi bản fix cho Curve Text chưa được PO xác nhận.", "kb_ids": ["KB-156"]}
```

## OQ-artwork-128 — OPEN_ISSUE

```json
{"oq_id": "OQ-artwork-128", "type": "OPEN_ISSUE", "feature_id": "text-color-sequence-render", "summary": "Text rainbow dùng font Carattere (font của case báo lỗi gốc) render thế nào trên Locate Artwork và Order Design PNG? Staging không có font này; mọi quan sát dùng font thay thế, nên case gốc chưa được tái hiện hay kiểm sau bản fix.", "kb_ids": ["KB-146", "KB-154"]}
```

## OQ-artwork-129 — OPEN_ISSUE

```json
{"oq_id": "OQ-artwork-129", "type": "OPEN_ISSUE", "feature_id": "text-color-sequence-render", "summary": "Hành vi render text rainbow trên production sau khi TIB-5606 ship có giống quan sát trên staging không? TIB-5606 chưa ship; mọi item chỉ đúng cho build staging 2026-10-22 (build hash không rõ).", "kb_ids": ["KB-146", "KB-154", "KB-156"]}
```

## OQ-artwork-130 — OPEN_ISSUE

```json
{"oq_id": "OQ-artwork-130", "type": "OPEN_ISSUE", "feature_id": "text-color-sequence-render", "summary": "Trước bản fix, text rainbow căn trái, text font thường và text 1 màu render thế nào — kết quả hiện tại có 'không đổi so với trước' không? Staging đã có bản fix khi chạy, không có baseline trước deploy; không phân biệt được hành vi mới và hành vi cũ.", "kb_ids": ["KB-147", "KB-150"]}
```

## OQ-artwork-131 — OPEN_ISSUE

```json
{"oq_id": "OQ-artwork-131", "type": "OPEN_ISSUE", "feature_id": "text-color-sequence-render", "summary": "Design đã render trước khi deploy bản fix, khi Re-generate design cho order cũ, có đổi (cỡ chữ, vị trí) so với bản đã in không? Merchant regenerate order cũ có thể nhận ảnh khác bản đã in; trường hợp này chưa kiểm được vì không có order cũ.", "kb_ids": ["KB-149"]}
```

## OQ-artwork-132 — OPEN_ISSUE

```json
{"oq_id": "OQ-artwork-132", "type": "OPEN_ISSUE", "feature_id": "text-color-sequence-render", "summary": "Nhánh font fallback của PNG renderer (ký tự không có trong font, emoji) với text rainbow hoạt động thế nào? Nhánh này chưa có quan sát nào tới được renderer; nếu fallback vẫn đo theo cách cũ, lỗi tràn/mất chữ có thể còn ở nhánh này. Lượt test staging 2026-10-22 không tới được nhánh này: ô nhập storefront bỏ emoji ngay lúc gõ (khớp ghi nhận emoji bị chặn mặc định), nên cần ký tự fallback lọt qua ô nhập (vd bật cho phép emoji) để kiểm.", "kb_ids": []}
```

## OQ-artwork-133 — OPEN_ISSUE

```json
{"oq_id": "OQ-artwork-133", "type": "OPEN_ISSUE", "feature_id": "text-color-sequence-render", "summary": "SVG/vector export (vectorize) của text rainbow có cùng hành vi căn lề và độ rộng như Order Design PNG không? Chưa tải được file vector nào để kiểm; không biết renderer SVG có cùng lỗi gốc hay đã được sửa.", "kb_ids": []}
```

## OQ-artwork-134 — OPEN_ISSUE

```json
{"oq_id": "OQ-artwork-134", "type": "OPEN_ISSUE", "feature_id": "text-color-sequence-render", "summary": "Ngoài Locate Artwork và Order Design PNG, những ảnh nào khác (thumbnail, mockup render phía server, ảnh product) có render text rainbow và có bị lỗi gốc ảnh hưởng không? Phạm vi ảnh bị ảnh hưởng chưa được xác nhận bằng quan sát hay nguồn thẩm quyền; checklist có thể bỏ sót surface.", "kb_ids": []}
```

## OQ-artwork-135 — OPEN_ISSUE

```json
{"oq_id": "OQ-artwork-135", "type": "OPEN_ISSUE", "feature_id": "text-color-sequence-render", "summary": "Warp Text dùng Color Sequence và sequence màu do buyer chọn (Populate Color) render thế nào trên ảnh in? Hai tổ hợp này chưa được kiểm; chưa biết bản fix có bao phủ không.", "kb_ids": []}
```

## OQ-artwork-136 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-136", "type": "NEEDS_CONFIRMATION", "feature_id": "layer-config-text", "summary": "Layer Curve Text không có tuỳ chọn căn lề text (lưu align center) là thiết kế có chủ đích hay là tính năng còn thiếu? Quyết định checklist coi việc thiếu căn lề là đúng hay là gap; ảnh hưởng phạm vi kiểm render Curve Text rainbow (hiện chỉ kiểm được căn giữa).", "kb_ids": ["KB-157"]}
```

## OQ-artwork-137 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-137", "type": "NEEDS_CONFIRMATION", "feature_id": "layer-config-text", "summary": "Nút 'Align' trên canvas toolbar khi chọn layer curve-text (KB-042 của editor-layer-workspace) là căn vị trí layer trên canvas hay căn lề text? Nếu 'Align' là căn lề text, KB-157 ('không có tuỳ chọn căn lề') có thể sai và Curve Text căn phải dựng được; nếu là căn vị trí layer, hai item không mâu thuẫn.", "kb_ids": ["KB-157"]}
```

## OQ-artwork-138 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-138", "type": "NEEDS_CONFIRMATION", "feature_id": "group-layer-effective-visibility", "summary": "Group ẩn: mục Mask/nút Edit mask biến mất khỏi quick toolbar (quan sát TC-TIB-6060, 2026-10-16) trong khi expectedResult của case và R16 trong file RA/đáp án Slack Q6d (không ghi người trả lời) ghi 'disable'. Cần PO chốt: ẩn hay disable. Ghi chú QA local cũ (2026-09-30: Group ẩn vẫn có Edit mask) đã lỗi thời và không thuộc KB base.", "kb_ids": ["KB-167"]}
```

## OQ-artwork-139 — OPEN_ISSUE

```json
{"oq_id": "OQ-artwork-139", "type": "OPEN_ISSUE", "feature_id": "group-layer-effective-visibility", "summary": "Render phía server (print file / render-design-preview) cho layer hoặc Group thiếu key visible chưa được đối chiếu — bước 3 của TC-TIB-6055 không chạy (không có tool server-side trong phiên). KB-166 chỉ phủ canvas editor + Live preview portal.", "kb_ids": ["KB-166"]}
```

## OQ-artwork-140 — OPEN_ISSUE

```json
{"oq_id": "OQ-artwork-140", "type": "OPEN_ISSUE", "feature_id": "group-layer-effective-visibility", "summary": "Q11 (treo): fixture 'Group ẩn + con visible:true' dùng cho phần lớn test case được dựng qua MCP/API, chưa được PO/dev xác nhận là dữ liệu hợp lệ; repair command artwork:show-hidden-groups-with-visible-children đã chạy nên dữ liệu thật có thể không còn trạng thái này.", "kb_ids": ["KB-158", "KB-159", "KB-162", "KB-163", "KB-168"]}
```

## OQ-artwork-141 — OPEN_ISSUE

```json
{"oq_id": "OQ-artwork-141", "type": "OPEN_ISSUE", "feature_id": "group-layer-effective-visibility", "summary": "Q10(b) (treo): Artwork 1.0 có hỗ trợ Group không — chưa thử; các item về effective visibility của run này chỉ phủ Artwork 2.0.", "kb_ids": ["KB-158"]}
```

## OQ-artwork-142 — OPEN_ISSUE

```json
{"oq_id": "OQ-artwork-142", "type": "OPEN_ISSUE", "feature_id": "group-layer-effective-visibility", "summary": "Các mục 'Not for QA' trong QA plan của dev (#54766) chưa có test và không được nạp: dependency trên Group bị bỏ qua; layer trỏ tới Group không tồn tại render ở top level; MCP form preview khớp storefront form; command repair artwork:show-hidden-groups-with-visible-children.", "kb_ids": ["KB-158", "KB-168"]}
```

## OQ-artwork-143 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-143", "type": "NEEDS_CONFIRMATION", "feature_id": "group-layer-effective-visibility", "summary": "Ẩn hết mọi con thì Group vẫn ON và canvas không vẽ gì — hành vi có đúng như QA plan dev khi chạy TC-TIB-6159/6160 không?", "kb_ids": ["KB-161"]}
```

## OQ-artwork-144 — OPEN_ISSUE

```json
{"oq_id": "OQ-artwork-144", "type": "OPEN_ISSUE", "feature_id": "group-layer-effective-visibility", "summary": "TIB-5584 đã deploy production ở bản release nào, và hành vi có giữ nguyên trên build sau khi 3 PR còn mở lúc 16:14 16/10 được merge không?", "kb_ids": ["KB-158", "KB-159", "KB-162", "KB-168"]}
```

## OQ-artwork-145 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-145", "type": "NEEDS_CONFIRMATION", "feature_id": "editor-layer-workspace", "summary": "Group ẩn: quick toolbar vẫn hiển thị mục Align với 6 nút không disable, bấm không tác dụng (TC-TIB-6058/6059, staging 2026-10-16). QA plan dev (#54766 mục A bước 6) ghi 'quick toolbar offers no transform or align' và expectedResult TC-TIB-6059 ghi 'Align không khả dụng'. Quan sát cùng lượt: quick toolbar của Group ẩn không thấy Print Effects và Mask (KB-170). Cần PO chốt khi Group ẩn thì Align và Print Effects nên ẩn, disable hay hiển thị (Mask hỏi riêng ở OQ-artwork-138). Không phải conflict với KB base (KB-042 không nói về Group ẩn).", "kb_ids": ["KB-170"]}
```

## OQ-artwork-146 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-146", "type": "NEEDS_CONFIRMATION", "feature_id": "editor-layer-workspace", "summary": "Khi Group đang ẩn, chọn một layer con trong layer panel có hiện box transform không, và các hành vi chọn/kéo theo QA plan dev có đúng khi chạy TC-TIB-6161/6162 không?", "kb_ids": ["KB-171", "KB-172"]}
```

## OQ-artwork-147 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-147", "type": "NEEDS_CONFIRMATION", "feature_id": "layer-common-config", "summary": "layer_display chỉ đặt ở Group (con null, dữ liệu tạo qua JSON/API) thì storefront không áp cascade — đây là hành vi đúng (dữ liệu ngoài đường editor không được hỗ trợ) hay lỗi?", "kb_ids": ["KB-175"]}
```

## OQ-artwork-148 — OPEN_ISSUE

```json
{"oq_id": "OQ-artwork-148", "type": "OPEN_ISSUE", "feature_id": "layer-common-config", "summary": "Print file (order design) của Group đặt display 'Design only' có chứa nội dung con như kỳ vọng không?", "kb_ids": ["KB-174"]}
```

## OQ-artwork-149 — OPEN_ISSUE

```json
{"oq_id": "OQ-artwork-149", "type": "OPEN_ISSUE", "feature_id": "artwork-template-management", "summary": "Q9 (treo): linked template đã có cờ visible cụ thể (true/false) rồi global template đổi — linked đổi theo hay giữ riêng? KB-176/177 chỉ phủ null-kế thừa và bật lại ở linked; không suy ra trường hợp này.", "kb_ids": ["KB-176", "KB-177"]}
```

## OQ-artwork-150 — OPEN_ISSUE

```json
{"oq_id": "OQ-artwork-150", "type": "OPEN_ISSUE", "feature_id": "psd-import", "summary": "Artwork import từ PSD có folder ẩn: storefront (form/preview) và print file chưa được kiểm (TC-TIB-6078 chỉ kiểm layer panel, canvas và response API). Liên quan OQ-artwork-120 (import PSD với paragraph nhiều lớp stroke).", "kb_ids": ["KB-178"]}
```

## OQ-artwork-151 — OPEN_ISSUE

```json
{"oq_id": "OQ-artwork-151", "type": "OPEN_ISSUE", "feature_id": "psd-import", "summary": "Các phần khác của luồng PSD import (Multiple template, folder lồng nhiều cấp, mapping loại layer, file lỗi) hoạt động thế nào?", "kb_ids": ["KB-178"]}
```

## OQ-artwork-152 — CONFLICT

```json
{"oq_id": "OQ-artwork-152", "type": "CONFLICT", "feature_id": "layer-condition-value-binding", "summary": "Shape dependency của layer có điều kiện sau tính năng Hide đang mâu thuẫn: KB-067 (base) mô tả {match_type, show_by_default, dependencies}, còn KB-227 (test case PASS 2026-10-28 trên staging, trước khi các PR merge) cho thấy bản lưu mới có thêm key action ('hide'/'show') và bản ghi cũ không có action được hiểu là Show. PO chọn: (a) thay KB-067 bằng KB-227, (b) giữ cả hai như hai thời điểm dữ liệu (KB-067 thu phạm vi thành 'bản ghi trước tính năng Hide'), hay (c) giữ base? Cho tới khi chốt, mọi check oracle tầng API/data dựa vào shape dependency không có expected.", "kb_ids": ["KB-067", "KB-227"], "side_a": "KB-067 (base, quan sát 2026-09-10): layer có condition có dependency = {match_type: 'all'|'any', show_by_default: boolean, dependencies: [{element, value},...]}.", "side_b": "KB-227 (test case PASS 2026-10-28, staging lượt đầu): PUT gửi dependency có key action 'hide'/'show' cùng match_type, show_by_default, dependencies; bản ghi cũ không có key action được hiểu là Show, không bị migrate."}
```

## OQ-artwork-153 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-153", "type": "NEEDS_CONFIRMATION", "feature_id": "conditional-setting-config", "summary": "Trên build đã merge, chọn Hide có đổi tooltip match type thành 'hide when all / any options are selected' và toggle 'Hide this layer on first load' có nhãn/tooltip riêng không; chuyển lại Show có khôi phục nhãn cũ không? Nguồn duy nhất là tài liệu dev viết trước khi code còn đổi, chưa test case nào kiểm.", "kb_ids": ["KB-223"]}
```

## OQ-artwork-154 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-154", "type": "NEEDS_CONFIRMATION", "feature_id": "conditional-setting-config", "summary": "Bulk apply Conditional setting trên build đã merge có dropdown Show/Hide và áp đúng action cho mọi layer được chọn (kể cả khi các layer đang mang action khác nhau) không? Chỉ có nguồn tài liệu dev, chưa test case nào.", "kb_ids": ["KB-225"]}
```

## OQ-artwork-155 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-155", "type": "NEEDS_CONFIRMATION", "feature_id": "conditional-setting-config", "summary": "Conditional Setting (Show/Hide) có được hỗ trợ ở cấp Group không? Ghi nhận tay của QA trái expected của test case và BUG-436 còn gắn; nếu có hỗ trợ thì UI đặt ở đâu, nếu không thì điều kiện chỉ đặt cho từng layer con.", "kb_ids": ["KB-226"]}
```

## OQ-artwork-156 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-156", "type": "NEEDS_CONFIRMATION", "feature_id": "layer-duplicate-link-copy", "summary": "Trên build đã merge, import artwork, copy/paste layer (trong artwork và sang artwork 2.0 khác) và global template replica có giữ action Hide không; import từ file export định dạng v1 xử lý action thế nào? Chỉ có nguồn tài liệu dev, chưa test case nào chạy.", "kb_ids": ["KB-230"]}
```

## OQ-artwork-157 — OPEN_ISSUE

```json
{"oq_id": "OQ-artwork-157", "type": "OPEN_ISSUE", "feature_id": "layer-duplicate-link-copy", "summary": "'Duplicate & Link options' trên layer có action Hide: bản LINKED/PLAIN_COPY có mang action và điều kiện của layer gốc không? Chưa có evidence cho chính thao tác này với layer Hide.", "kb_ids": ["KB-230"]}
```

## OQ-artwork-158 — OPEN_ISSUE

```json
{"oq_id": "OQ-artwork-158", "type": "OPEN_ISSUE", "feature_id": "layer-condition-value-binding", "summary": "Khi action = 'hide', key show_by_default (giữ tên cũ) mang nghĩa 'Hide this layer on first load' — đây là thiết kế chủ đích của data model hay chỉ là cách hiển thị của editor/SDK? API có chấp nhận giá trị action nào khác ngoài 'hide'/'show' không?", "kb_ids": ["KB-227"]}
```

## OQ-artwork-159 — OPEN_ISSUE

```json
{"oq_id": "OQ-artwork-159", "type": "OPEN_ISSUE", "feature_id": "condition-cycle-validation", "summary": "Dòng 'Conditions haven't been finished' đi kèm thông báo vòng điều kiện ở test Hide/Show là do fixture (điều kiện chưa hoàn tất) hay luôn xuất hiện khi có vòng? Quyết định phần nào của thông báo được dùng làm expected nguyên văn.", "kb_ids": ["KB-228"]}
```

## OQ-artwork-160 — OPEN_ISSUE

```json
{"oq_id": "OQ-artwork-160", "type": "OPEN_ISSUE", "feature_id": "artwork-list-management", "summary": "Khi duplicate artwork có điều kiện, element trong dependencies của bản copy có được map sang layer id của chính bản copy (không trỏ về layer của artwork gốc) không? Test case duplicate không ghi tường minh việc map element.", "kb_ids": ["KB-229"]}
```

## OQ-artwork-161 — OPEN_ISSUE

```json
{"oq_id": "OQ-artwork-161", "type": "OPEN_ISSUE", "feature_id": "conditional-setting-config", "summary": "Các hành vi Show/Hide ở portal (dropdown action, một action mỗi layer, Artwork 1.0 và Convert to 2.0, vòng điều kiện giữa layer Hide, Duplicate artwork giữ action — KB-221, KB-222, KB-224, KB-228, KB-229) có giữ nguyên trên build staging sau khi 6 PR của TIB-5558 merge (2026-10-29) và trên production khi TIB-5558 release không? Kèm theo: layer của artwork 1.0 sau Convert to 2.0 và layer cũ không có key action có ẩn/hiện đúng chiều Show trên storefront chạy SDK đã có code Hide không — lượt test duy nhất cho phần storefront này chạy trên SDK bản 2026-10-14 chưa có code Hide nên chưa xác minh.", "kb_ids": ["KB-221", "KB-222", "KB-224", "KB-228", "KB-229"]}
```

## OQ-artwork-162 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-162", "type": "NEEDS_CONFIRMATION", "feature_id": "text-multi-stroke", "summary": "PO quyết: các test case Testlane PASS trên staging (2026-10-21/22, trước khi 7 PR TIB-5580 merge) khẳng định cùng hành vi với 11 item quan sát KB-129, KB-130, KB-131, KB-132, KB-134, KB-135, KB-136, KB-137, KB-140, KB-141, KB-143 (stack tối đa 3 lớp, width từng vòng, xoá/đổi thứ tự, paragraph mới 1 row, góc round, tắt stroke giữ stroke_layers, convert sang Text/Curve/Warp, stroke legacy, Custom Shape 1 stroke, regression Text 1 dòng). teeinblue không bật supersede nên các item vẫn là OBSERVED_CURRENT/LOW và các check liên quan chưa có expected xác nhận. PO chọn: (a) nâng các hành vi này thành expected, (b) giữ là quan sát, hay (c) giữ cả hai như hai thời điểm? Cặp convert sang Curve/Warp làm mất các lớp ngoài (KB-137) có ảnh hưởng cao.", "kb_ids": ["KB-129", "KB-130", "KB-131", "KB-132", "KB-134", "KB-135", "KB-136", "KB-137", "KB-140", "KB-141", "KB-143"]}
```

## OQ-artwork-163 — OPEN_ISSUE

```json
{"oq_id": "OQ-artwork-163", "type": "OPEN_ISSUE", "feature_id": "text-multi-stroke", "summary": "Chạy lại sau merge/production: mọi lượt test multi-stroke của Paragraph (TIB-5580) chạy trên staging 2026-10-21/22, trước khi 7 PR merge (2026-10-22); SDK staging lúc đó chưa có PR sdk #2124. Ticket đã Done 2026-10-22 nhưng việc ship production chưa xác nhận. Cần chạy lại trên build đã merge (staging) và production cho editor, dữ liệu lưu, PNG order design, SVG vectorize và preview storefront rồi gửi CCR mới.", "kb_ids": ["KB-129", "KB-130", "KB-131", "KB-132", "KB-133", "KB-134", "KB-135", "KB-136", "KB-137", "KB-138", "KB-139", "KB-140", "KB-141", "KB-142", "KB-143", "KB-144", "KB-251"]}
```

## OQ-artwork-164 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-artwork-164", "type": "NEEDS_CONFIRMATION", "feature_id": "text-multi-stroke", "summary": "Shadow của Paragraph có nhiều lớp stroke: PNG order design (API) vẽ 1 khối shadow cho cả paragraph, không lặp theo dòng, khớp preview Artwork Editor — có phải hành vi đúng không, và có giữ nguyên ở preview storefront và SVG vectorize khi SDK staging có code TIB-5580 và tải được SVG? Mới là quan sát bằng mắt trên 2 order (#1091, #1096) trong lượt test staging trước khi TIB-5580 merge, hai test case Blocked; check shadow paragraph (CHK-027) chưa có oracle xác nhận. Cần nguồn S3 (test case PASS đủ 3 renderer trên build có code, hoặc PO/dev xác nhận nguyên văn). Liên quan OQ-artwork-118.", "kb_ids": ["KB-251"]}
```

## OQ-artwork-165 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-artwork-165","type":"NEEDS_CONFIRMATION","feature_id":"group-layer-order-design-render","summary":"PO: ngưỡng thời gian chấp nhận cho generate order design của artwork có Group nhiều layer (~250) là bao nhiêu? Số đo hiện có (khoảng 33–68 giây) chỉ đo 1 lần mỗi fixture qua mốc thời gian Item Activity logs, không có baseline trước fix; ngưỡng 1–2 phút chưa được PO xác nhận. Không dùng số đo này làm SLA hay điều kiện pass/fail cho tới khi PO trả lời. Ngoài ra: order item hiển thị Ready/'Ready to fulfill' sau khi order design generate xong (chỉ thấy ở actualResult của TC-TIB-7614/7616, expectedResult không khẳng định) — có phải hành vi mong đợi không?","kb_ids":["KB-381"]}
```

## OQ-artwork-166 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-artwork-166","type":"NEEDS_CONFIRMATION","feature_id":"group-layer-order-design-render","summary":"Dev/PO: phần shadow của layer con vượt ra ngoài printarea bị cắt theo printarea trên order design — có phải hành vi mong đợi không? Chỉ thấy ở actualResult của TC-TIB-7617; expectedResult của case không khẳng định điều này.","kb_ids":["KB-384"]}
```

## OQ-artwork-167 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-artwork-167","type":"NEEDS_CONFIRMATION","feature_id":"group-layer-order-design-render","summary":"Hướng/vị trí shadow của layer con trong Group trên order design sau fix chưa được đối chiếu với bản trước fix (TC-TIB-7620 kiểm bằng mắt, offset của fixture khác test data). PO xác nhận hướng/vị trí shadow hiện thấy trên order design có phải ý định cho merchant và nhà in không; dev/QA đối chiếu toạ độ/pixel với bản trước fix.","kb_ids":["KB-385"]}
```

## OQ-artwork-168 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-artwork-168","type":"NEEDS_CONFIRMATION","feature_id":"group-layer-order-design-render","summary":"Dev/PO: text căn giữa khai báo cỡ 601 chỉ render cao khoảng 22px trên order design (có vẻ co theo box) — đúng hay lỗi? Text có thực sự tràn box của Group không; đường canvas mở rộng cho text tràn box chưa được chứng minh (TC-TIB-7619).","kb_ids":["KB-386"]}
```

## OQ-artwork-169 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-artwork-169","type":"NEEDS_CONFIRMATION","feature_id":"group-layer-order-design-render","summary":"Dev: ngưỡng route-large 150 Mpx đo trên canvas artwork hay trên printarea? Route-large (hàng đợi final-render-large) chưa được kích hoạt trong lượt chạy (printarea 72 Mpx) — cần fixture có printarea đủ lớn để kiểm.","kb_ids":["KB-390"]}
```

## OQ-artwork-170 — OPEN_ISSUE

```json
{"oq_id":"OQ-artwork-170","type":"OPEN_ISSUE","feature_id":"group-layer-order-design-render","summary":"Chạy lại sau merge và trên production: lượt chạy test 2026-10-29 trên staging (build hash không rõ) diễn ra trước khi PR thứ hai của TIB-5633 cập nhật lần cuối 2026-10-30; ngày deploy production chưa rõ. Cần chạy lại bộ TIB-268 trên build đã merge và xác nhận trên production trước khi coi các item CONFIRMED của feature này là ổn định.","kb_ids":["KB-380","KB-381","KB-382","KB-383","KB-384","KB-385","KB-386","KB-387","KB-388","KB-389","KB-390"]}
```

## OQ-artwork-171 — OPEN_ISSUE

```json
{"oq_id":"OQ-artwork-171","type":"OPEN_ISSUE","feature_id":"group-layer-order-design-render","summary":"Phạm vi render order design của Group nhiều layer chưa được kiểm: mask hình tròn/custom shape; order design PDF của Group có mask; Group khoảng 250 layer có layer tràn box (đường canvas mở rộng); layer chia ở 2 cấp Group (100 + 150); Group cha bị ẩn hoặc visibility theo điều kiện trong Group nhiều layer. Chưa có expected cho các nhánh này.","kb_ids":["KB-383","KB-386","KB-387","KB-388","KB-389"]}
```

## OQ-artwork-172 — OPEN_ISSUE

```json
{"oq_id":"OQ-artwork-172","type":"OPEN_ISSUE","feature_id":"group-layer-order-design-render","summary":"Blend mode của layer con, layer gắn tag Context trong Group, và Artwork 1.0 chưa có quan sát nào cho render order design của Group nhiều layer (case liên quan bị bỏ qua, nguồn chưa đủ thẩm quyền). Hành vi mong đợi là gì và ai xác nhận?","kb_ids":[]}
```

## OQ-artwork-173 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-artwork-173","type":"NEEDS_CONFIRMATION","feature_id":"group-layer-order-design-render","summary":"PO xác nhận đây là hành vi đúng cho merchant và nhà in: order design của artwork có Group khoảng 250 layer generate hoàn tất (design Completed, không auto-stop/timeout, không kẹt Generating); print file của Group giống pixel bản không group; shadow/layer xoay tràn box hiện đủ trong vùng in; Group có mask chỉ hiện phần trong mask; Group lồng nhau không lệch layer; layer con tắt visible không xuất hiện. Các item này đến từ test case PASS trên staging, chưa có PO/business xác nhận ý định.","kb_ids":["KB-380","KB-382","KB-383","KB-387","KB-388","KB-389"]}
```

## OQ-artwork-174 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-artwork-174","type":"NEEDS_CONFIRMATION","feature_id":"layer-print-effects","summary":"Dev/PO: photo_border contour cut trên print file của Group có đi qua cùng đường xử lý với preset shape-cut của Print Effects (KB-044) không, và đường cắt đang thấy có phải ý định không? Group shape-cut khoảng 250 layer chưa được kiểm — fixture chỉ là Group 3 layer photo_border contour cut.","kb_ids":["KB-391","KB-044"]}
```

## OQ-artwork-175 — OPEN_ISSUE

```json
{"oq_id":"OQ-artwork-175","type":"OPEN_ISSUE","feature_id":"layer-print-effects","summary":"Emboss áp cho Group nhiều layer chưa từng được chạy (case bị bỏ qua, nguồn chưa đủ thẩm quyền). Print file emboss của Group nên ra sao? Không suy ra gì về việc emboss có hay không trên account/plan hiện tại.","kb_ids":[]}
```

## OQ-artwork-176 — OPEN_ISSUE

```json
{"oq_id":"OQ-artwork-176","type":"OPEN_ISSUE","feature_id":"layer-print-effects","summary":"Chạy lại sau merge và trên production cho print file photo_border contour cut của Group (lượt chạy 2026-10-29 trước khi PR thứ hai của TIB-5633 cập nhật lần cuối; ngày deploy production chưa rõ).","kb_ids":["KB-391"]}
```

## OQ-artwork-177 — CONFLICT

```json
{"oq_id":"OQ-artwork-177","type":"CONFLICT","feature_id":"text-color-sequence-render","conflict_group":"CONF-CBS-016-01","summary":"Text rainbow 32 ký tự bật autoscale, căn phải (staging, lượt chạy 2026-10-22): kết luận của kết quả test và số đo của chính lượt đó không khớp nhau về độ rộng Order Design PNG so với preview SDK. Độ rộng PNG sau autoscale so với preview SDK được kỳ vọng thế nào, dung sai chấp nhận là bao nhiêu? Hai item KB-149 và KB-404 đang UNRESOLVED, không bên nào là oracle. Quyết định này đi cùng quyết định của PO cho cặp KB-149 trong OQ-artwork-182.","side_a":{"kb_id":"KB-149","value":"Kết luận của kết quả test: Order Design PNG sau autoscale chênh 2px, không nhỏ hơn preview SDK."},"side_b":{"kb_id":"KB-404","value":"Số đo của cùng lượt chạy: PNG 495–910 (w=415), preview SDK 493–910 (w=417) — PNG hẹp hơn SDK 2px."},"kb_ids":["KB-149","KB-404"]}
```

## OQ-artwork-178 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-artwork-178","type":"NEEDS_CONFIRMATION","feature_id":"text-color-sequence-render","summary":"Số đo một lượt chạy: rainbow font Roboto căn phải PNG 560–905 so với preview SDK 558–904 (lệch 1–2px); text 1 màu font script PNG 624–912 so với SDK 624–913. Lệch 1–2px này có nằm trong dung sai chấp nhận và có lặp lại trên build sau merge / production không?","kb_ids":["KB-406"]}
```

## OQ-artwork-179 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-artwork-179","type":"NEEDS_CONFIRMATION","feature_id":"text-color-sequence-render","summary":"Theo mô tả dev (comment #55257, PR #4044), đoạn text dùng font fallback giữ cách đặt vị trí cũ của PNG renderer. Trên build đã merge, text rainbow có ký tự rơi vào font fallback render ra sao (đủ ký tự? khớp preview SDK?), và đây có phải hành vi mong muốn không?","kb_ids":["KB-412"]}
```

## OQ-artwork-180 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-artwork-180","type":"NEEDS_CONFIRMATION","feature_id":"text-color-sequence-render","summary":"Theo mô tả dev, preview / order design render trước khi deploy bản sửa TIB-5606 không tự cập nhật và phải regenerate. Đã kiểm trên staging/production chưa, và regenerate cho kết quả đúng (đủ ký tự, vị trí khớp preview SDK) không?","kb_ids":["KB-413"]}
```

## OQ-artwork-181 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-artwork-181","type":"NEEDS_CONFIRMATION","feature_id":"text-color-sequence-render","summary":"Theo mô tả dev, chỉ PNG renderer đổi; SVG renderer teeinblue-vectorize không bị ảnh hưởng và cho cùng hình glyph như text 1 màu. QA chưa tải được file vector trên staging — SVG của text rainbow căn phải có thật đủ ký tự, khớp preview SDK không?","kb_ids":["KB-414"]}
```

## OQ-artwork-182 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-artwork-182","type":"NEEDS_CONFIRMATION","feature_id":"text-color-sequence-render","summary":"PO quyết: các test case Testlane TIB-230 PASS trên staging (chạy 2026-10-22, trước khi PR teeinblue-api #4044 merge) khẳng định cùng hành vi với 10 item quan sát KB-146, KB-147, KB-148, KB-149, KB-150, KB-151, KB-152, KB-153, KB-155, KB-156 (rainbow căn phải/giữa/trái, độ rộng bằng text 1 màu, autoscale tên dài, Roboto và text 1 màu, letter spacing, kerning, stroke 1 lớp, RTL, Curve căn giữa). teeinblue không bật supersede nên các item vẫn là OBSERVED_CURRENT/LOW và các check liên quan chưa có expected xác nhận. PO chọn: (a) nâng các hành vi này thành expected, (b) giữ là quan sát, hay (c) giữ cả hai như hai thời điểm? Riêng KB-149: test case không xác nhận vế độ rộng autoscale so với preview SDK, nên quyết định cho KB-149 phải đi cùng OQ-artwork-177.","kb_ids":["KB-146","KB-147","KB-148","KB-149","KB-150","KB-151","KB-152","KB-153","KB-155","KB-156"]}
```

## OQ-artwork-183 — OPEN_ISSUE

```json
{"oq_id":"OQ-artwork-183","type":"OPEN_ISSUE","feature_id":"text-color-sequence-render","summary":"Chạy lại sau merge/production: lượt chạy Testlane TIB-230 (staging 2026-10-22 14:20) diễn ra trước khi PR teeinblue-api #4044 merge (2026-10-22 15:44), chỉ trên font thay thế (Dancing Script/Roboto/Heebo); ngày ship production chưa xác nhận. Cần chạy lại trên build đã merge (staging) và production cho Locate Artwork và Order Design PNG (có số đo), rồi gửi CCR mới.","kb_ids":["KB-146","KB-147","KB-148","KB-149","KB-150","KB-151","KB-152","KB-153","KB-155","KB-156","KB-154","KB-404","KB-406","KB-412","KB-413","KB-414"]}
```

## OQ-artwork-184 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-artwork-184","type":"NEEDS_CONFIRMATION","feature_id":"layer-config-image","summary":"Role áp dụng của KB-420..KB-429 là gì (owner, staff hay buyer), cho từng item? scope.role đang là \"unspecified\" vì CCR ghi không rõ, checklist chưa biết chạy các item này với role nào. Câu hỏi chung cho ba feature: layer-config-image (KB-420..KB-424, CHK-054..CHK-059), layer-print-effects (KB-425, CHK-011, CHK-012), editor-layer-workspace (KB-426..KB-429, CHK-019..CHK-023).","kb_ids":["KB-420","KB-421","KB-422","KB-423","KB-424","KB-425","KB-426","KB-427","KB-428","KB-429"]}
```

## OQ-artwork-185 — OPEN_ISSUE

```json
{"oq_id":"OQ-artwork-185","type":"OPEN_ISSUE","feature_id":"layer-config-image","summary":"KB-415..KB-429 chưa biết build và ngày deploy production. TIB-5212, TIB-5465, TIB-5516 là Done trên Jira, Done không chứng minh đã lên production; bản đối chiếu không ghi status của TIB-5512, TIB-5534, TIB-5538, TIB-5539. Trong lúc đó các item chỉ dùng cho staging. Áp cho bảy feature có item mới của CBS-079, không riêng layer-config-image.","kb_ids":["KB-415","KB-416","KB-417","KB-418","KB-419","KB-420","KB-421","KB-422","KB-423","KB-424","KB-425","KB-426","KB-427","KB-428","KB-429"]}
```

## OQ-artwork-186 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-artwork-186","type":"NEEDS_CONFIRMATION","feature_id":"layer-config-others","summary":"Calendar giữ default typography Heebo/regular có phải giá trị đúng không? TC-TIB-4853 và actual của TC-TIB-4858 ghi Heebo, expected của TC-TIB-4858 ghi Heebo chuyển Roboto. Cần PO hoặc Dev xác nhận nguyên văn, có ngày; hoặc test case PASS có build.","kb_ids":["KB-415"]}
```

## OQ-artwork-187 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-artwork-187","type":"NEEDS_CONFIRMATION","feature_id":"layer-config-text","summary":"PO xác nhận: ba nhánh của KB-416 có phải hành vi đúng không — paragraph rỗng không render trong design, chỉ khoảng trắng thì preview và design trống, xoá field nguồn populate thì preview về default text? Theo CCR, mô tả TIB-5538 ghi \"should fall back to its default text\", khác kết quả. Rủi ro cao vì ảnh hưởng nội dung design của buyer.","kb_ids":["KB-416"]}
```

## OQ-artwork-188 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-artwork-188","type":"NEEDS_CONFIRMATION","feature_id":"layer-config-vector","summary":"Upload .svg qua Static Vector tạo layer static-vector và còn sau reload có phải hành vi đúng không? Mới có một lượt chạy (TC-TIB-5705, 2026-10-14), record không ghi build.","kb_ids":["KB-417"]}
```

## OQ-artwork-189 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-artwork-189","type":"NEEDS_CONFIRMATION","feature_id":"layer-config-vector","summary":"PO xác nhận: các kết quả Design format của KB-418 có đúng không (chỉ static-vector + SVG ra file .svg; PNG_RGB báo \"Line item cannot generate design\"; lưu SVG khi còn raster layer trả HTTP 400), và SVG có phải format đúng duy nhất cho artwork chỉ có static-vector không?","kb_ids":["KB-418"]}
```

## OQ-artwork-190 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-artwork-190","type":"NEEDS_CONFIRMATION","feature_id":"layer-config-maps-astronomy","summary":"Strava trong Route Maps (strava-upload) có thật sự không chạy được trên môi trường test không, lý do là gì, và production hoạt động thế nào? Nguồn của KB-419 chỉ là ghi chú ngôi thứ ba.","kb_ids":["KB-419"]}
```

## OQ-artwork-191 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-artwork-191","type":"NEEDS_CONFIRMATION","feature_id":"layer-config-image","summary":"Per-field warning và nút \"+ variable\" có nhận title của layer Global Option không? Comment dev #55232 của TIB-5465 nói cùng rule match; ghi chú QA audit #40 nói không nhận và lỗi có cả trên production. KB-424 chỉ phát biểu về warning \"Some ImagenHub variables have no matching layer\".","kb_ids":["KB-424"]}
```

## OQ-artwork-192 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-artwork-192","type":"NEEDS_CONFIRMATION","feature_id":"layer-config-image","summary":"Route POST /layer-images/create-master-large/batch, env MASTER_LARGE_BATCH_LIMIT (mặc định 10) và status 422 khi quá limit có đúng trên build hiện tại không? Nguồn là comment #54785 của TIB-5212 tự sinh từ branch diff, chưa kiểm trên hệ thống; comment #55717 không phát biểu lại các điểm này. Cần Dev xác nhận nguyên văn, có ngày; hoặc test case PASS có build.","kb_ids":["KB-422"]}
```

## OQ-artwork-193 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-artwork-193","type":"NEEDS_CONFIRMATION","feature_id":"editor-layer-workspace","summary":"PO xác nhận ý định của KB-427: khi multi-select có giá trị Photo Border khác nhau, bật toggle Border thay các giá trị riêng của mọi layer đang chọn, và đổi một thuộc tính cũng bật border cho cả selection. Liên quan CHK-020.","kb_ids":["KB-427"]}
```

## OQ-artwork-194 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-artwork-194","type":"NEEDS_CONFIRMATION","feature_id":"editor-layer-workspace","summary":"Rule \"chọn một group: ẩn Photo Border, Shadow và HD vẫn hiện\" của KB-429 có áp cho Group đang ẩn không? KB-429 không nêu trạng thái group; KB-170 quan sát Group ẩn chỉ còn mục Align, expected của trường hợp đó chưa chốt. CHK-022 chỉ kiểm Group hiện, chưa check nào assert Group ẩn.","kb_ids":["KB-429","KB-170"]}
```

## OQ-artwork-195 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-artwork-195","type":"NEEDS_CONFIRMATION","feature_id":"layer-print-effects","summary":"Sau khi bỏ file pre-render của border custom_shape, order design (print file) lấy border từ đâu, và border size có đúng không? Comment #53942 chỉ nói SDK vẽ trên canvas; scope.surface của KB-425 ghi \"render\" chung, CHK-011, CHK-012 không kiểm print file. Nếu print file đổi đường xử lý thì KB-425 phải lên impact HIGH.","kb_ids":["KB-425"]}
```

## OQ-artwork-196 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-artwork-196","type":"NEEDS_CONFIRMATION","feature_id":"svg-to-image-rendering","summary":"KB-570: design PNG của artwork có layer SVG clip-path lồng nhiều cấp vẽ đúng hình đã mask ở cả 4 format PNG_*, theo dev doc auto-generated; quan sát mới có ở PNG_RGB. Đây có phải hành vi đúng ở cả PNG_RGBA, PNG_ADOBE_RGB, PNG_SRGB không? Cần PO xác nhận (ảnh hưởng file in). Liên quan CHK-001, CHK-002.","kb_ids":["KB-570"]}
```

## OQ-artwork-197 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-artwork-197","type":"NEEDS_CONFIRMATION","feature_id":"svg-to-image-rendering","summary":"KB-571: chỉ nhánh PNG đổi sang resvg, EPS/AI/PDF vẫn qua Inkscape, theo dev doc auto-generated; EPS và AI chưa có quan sát. Có xác nhận được export EPS/AI/PDF vẫn hoạt động như trước không? Cần PO xác nhận (ảnh hưởng file in). Liên quan CHK-003.","kb_ids":["KB-571"]}
```

## OQ-artwork-198 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-artwork-198","type":"NEEDS_CONFIRMATION","feature_id":"svg-to-image-rendering","summary":"KB-572: SVG có <image href=\"data:…\"> (href trần) vẫn hiện ảnh nhúng ở thumbnail và design PNG, theo dev doc auto-generated. Đây có phải hành vi đúng không? Cần PO xác nhận (ảnh hưởng file in). Liên quan CHK-004.","kb_ids":["KB-572"]}
```

## OQ-artwork-199 — CONFLICT

```json
{"oq_id":"OQ-artwork-199","type":"CONFLICT","feature_id":"svg-to-image-rendering","summary":"Nền design file PNG_RGB, PNG_ADOBE_RGB, PNG_SRGB khi render SVG: tài liệu dev và số đo staging nói ngược nhau. Nền đúng của từng format PNG_* là gì? Chờ PO/Dev trả lời câu hỏi PENDING-09 của bộ test QA-3395; số đo phía side_b cũng cần lặp lại trên build ghi rõ. Hai item UNRESOLVED, không làm oracle; CHK-008 chỉ ghi nhận, không kết luận.","side_a":"Dev doc auto-generated của PR teeinblue-api #3836 (2026-09-23, KB-573): PNG_RGB, PNG_ADOBE_RGB, PNG_SRGB nền trắng đục, giữ như mặc định Inkscape cũ; PNG_RGBA nền trong suốt.","side_b":"Lượt đo QA trên staging 2026-10-07 (KB-574, mỗi format một order, không ghi build): PNG_RGB, PNG_ADOBE_RGB, PNG_SRGB là PNG RGBA nền trong suốt (pixel góc alpha 0), giống một order PNG_RGB trước fix.","kb_ids":["KB-573","KB-574"]}
```

## OQ-artwork-200 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-artwork-200","type":"NEEDS_CONFIRMATION","feature_id":"svg-to-image-rendering","summary":"KB-573: theo dev doc auto-generated, PNG_RGBA có nền trong suốt; PNG_RGBA chưa được thử (TC-09 tạm dừng). Đây có phải hành vi đúng không? (Phần PNG_RGB/ADOBE_RGB/SRGB xem OQ-artwork-199.) Cần PO xác nhận (ảnh hưởng file in).","kb_ids":["KB-573"]}
```

## OQ-artwork-201 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-artwork-201","type":"NEEDS_CONFIRMATION","feature_id":"svg-to-image-rendering","summary":"KB-575: design PNG_ADOBE_RGB nhúng ICC \"Adobe RGB (1998)\" và PNG_SRGB nhúng ICC \"sRGB IEC61966-2.1\", một mẫu mỗi format ngày 2026-10-07. Đây có phải hành vi đúng không? Cần PO xác nhận (ảnh hưởng file in). Liên quan CHK-007.","kb_ids":["KB-575"]}
```

## OQ-artwork-202 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-artwork-202","type":"NEEDS_CONFIRMATION","feature_id":"svg-to-image-rendering","summary":"KB-576: clip-path trỏ id không tồn tại thì shape không bị clip, clip-path khai qua CSS style vẫn clip đúng ở thumbnail, quan sát một lượt 2026-10-07. Đây có phải hành vi đúng không? Liên quan CHK-005, CHK-006.","kb_ids":["KB-576"]}
```

## OQ-artwork-203 — OPEN_ISSUE

```json
{"oq_id":"OQ-artwork-203","type":"OPEN_ISSUE","feature_id":"svg-to-image-rendering","summary":"Design file và thumbnail của SVG được sinh lúc nào, do sự kiện gì (tạo order, upload, regenerate thủ công)? KB-570..576 không mô tả trigger, nên check của feature này chưa có bước dựng đầu ra rõ ràng.","kb_ids":[]}
```

## OQ-artwork-204 — OPEN_ISSUE

```json
{"oq_id":"OQ-artwork-204","type":"OPEN_ISSUE","feature_id":"svg-to-image-rendering","summary":"Chạy lại trên build ghi rõ và production: mọi lượt chạy làm nguồn cho KB-570..584 (staging 2026-10-07/08, AI chạy) không ghi build, CCR ghi SHIPPED nhưng chưa có bằng chứng production; role khác merchant-owner và cross-tenant chưa quan sát. Cần lượt chạy có build (hoặc nguồn PO/Dev nguyên văn) rồi gửi CCR mới để nâng các item này.","kb_ids":["KB-570","KB-571","KB-572","KB-573","KB-574","KB-575","KB-576","KB-577","KB-578","KB-579","KB-580","KB-581","KB-582","KB-583","KB-584"]}
```

## OQ-artwork-205 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-artwork-205","type":"NEEDS_CONFIRMATION","feature_id":"layer-config-puzzles","summary":"KB-577: Word Cloud với shape SVG clip-path lồng nhiều cấp chỉ đặt chữ trong vùng đã mask, quan sát một lượt 2026-10-07; chưa so preview storefront/editor với final render. Đây có phải hành vi đúng không? Cần PO xác nhận (ảnh hưởng file in). Liên quan CHK-006.","kb_ids":["KB-577"]}
```

## OQ-artwork-206 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-artwork-206","type":"NEEDS_CONFIRMATION","feature_id":"layer-config-puzzles","summary":"KB-578: Word Cloud bật \"Use shape's color\" trên shape SVG clip-path chỉ lấy màu từ vùng nhìn thấy, quan sát một lượt 2026-10-07. Đây có phải hành vi đúng không? Cần PO xác nhận (ảnh hưởng file in). Liên quan CHK-007.","kb_ids":["KB-578"]}
```

## OQ-artwork-207 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-artwork-207","type":"NEEDS_CONFIRMATION","feature_id":"layer-config-puzzles","summary":"KB-579: Word Cloud với shape SVG đơn giản, shape PNG lấp chữ trong shape, tắt custom shape thì lấp đầy ô vuông, quan sát một lượt 2026-10-07 không có baseline trước fix. Đây có phải hành vi đúng không? Liên quan CHK-008.","kb_ids":["KB-579"]}
```

## OQ-artwork-208 — OPEN_ISSUE

```json
{"oq_id":"OQ-artwork-208","type":"OPEN_ISSUE","feature_id":"layer-config-puzzles","summary":"Preview Word Cloud trên storefront và artwork editor với shape SVG clip-path lồng nhiều cấp có khớp final render (design PNG) không? Lượt test tương ứng đang tạm dừng; KB-577, KB-578 chỉ nói về final render.","kb_ids":["KB-577","KB-578"]}
```

## OQ-artwork-209 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-artwork-209","type":"NEEDS_CONFIRMATION","feature_id":"layer-config-others","summary":"KB-580: layer QR Code render nguyên vẹn và decode đúng chuỗi ở cả design PNG và PDF của cùng đơn, quan sát một lượt 2026-10-07. Đây có phải hành vi đúng không? Cần PO xác nhận (ảnh hưởng file in). Liên quan CHK-007.","kb_ids":["KB-580"]}
```

## OQ-artwork-210 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-artwork-210","type":"NEEDS_CONFIRMATION","feature_id":"layer-config-vector","summary":"KB-581: SVG layer image upload 05/2025 re-render design PNG bình thường, mẫu 3 file ngày 2026-10-07. Đây có phải hành vi đúng không, kể cả SVG cũ có <text> sống? Cần PO xác nhận (ảnh hưởng file in). Liên quan CHK-012.","kb_ids":["KB-581"]}
```

## OQ-artwork-211 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-artwork-211","type":"NEEDS_CONFIRMATION","feature_id":"layer-config-vector","summary":"KB-582: upload SVG làm layer image thì bản lưu bỏ DOCTYPE, ENTITY, <script> và không trả 500, quan sát một lượt 2026-10-07; SSRF, DoS, file cực lớn chưa kiểm. Đây có phải hành vi đúng không? Cần PO xác nhận (bảo mật). Liên quan CHK-013.","kb_ids":["KB-582"]}
```

## OQ-artwork-212 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-artwork-212","type":"NEEDS_CONFIRMATION","feature_id":"layer-config-vector","summary":"KB-583: tên file SVG upload được làm sạch, key lưu ngẫu nhiên, tên > 255 ký tự bị validate chặn, quan sát một lượt 2026-10-07 qua API. Đây có phải hành vi đúng không, và UI hiển thị tên ra sao? Cần PO xác nhận (bảo mật). Liên quan CHK-014, CHK-015.","kb_ids":["KB-583"]}
```

## OQ-artwork-213 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-artwork-213","type":"NEEDS_CONFIRMATION","feature_id":"layer-config-vector","summary":"KB-584: file SVG nguồn trên CDN giữ nguyên tập id, không prefix svg- sau recolor và đặt order, 2 file mẫu ngày 2026-10-08. Đây có phải hành vi đúng không? Liên quan CHK-016.","kb_ids":["KB-584"]}
```

## OQ-artwork-214 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-artwork-214","type":"NEEDS_CONFIRMATION","feature_id":"layer-config-vector","summary":"KB-418 (lượt chạy 2026-10-14) ghi artwork chỉ có layer static-vector, Design format PNG_RGB thì order báo \"Line item cannot generate design\"; KB-570 và KB-581 (lượt chạy 2026-10-07) thấy design PNG của artwork có layer SVG render bình thường. Nguồn không nói artwork của hai lượt khác nhau ở điểm nào (có layer raster hay không). Đây là hai fixture khác nhau hay một hành vi chưa ổn định? Liên quan OQ-artwork-189, CHK-010.","kb_ids":["KB-418","KB-570","KB-581"]}
```
