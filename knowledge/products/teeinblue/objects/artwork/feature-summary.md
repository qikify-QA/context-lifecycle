# Object: Artwork (product: teeinblue) — Feature Profile Summary

- **Published context version:** 2 (`CTX-20260912-01`, 2026-09-12, mode: INCREMENTAL_UPDATE/RESTRUCTURING, env: staging) — dựng lại từ CÙNG evidence gốc của 3 run bootstrap `CTX-20260910-01/02/03`, KHÔNG explore mới
- **Vì sao có v2:** v1 (`CTX-20260911-01`, còn giữ ở `_archive/`) dedupe 24/35 layer type vào 1 feature chung `layer-common-config` — không đủ granularity để sửa 1 layer type mà không đụng 34 type khác. v2 tách thành 7 feature `layer-config-*` theo nhóm sidebar (TEXT/IMAGE/VECTOR/MAPS & ASTRONOMY/PUZZLES/OTHERS/FORM ELEMENTS) + giữ `layer-common-config` chỉ mô tả mechanism/boundary dùng chung
- **Mode:** toàn bộ 18 feature là OBSERVED_CURRENT — **0 CONFIRMED_EXPECTED**, kể cả sau restructuring
- **Actor test trong toàn bộ run:** duy nhất role `owner` (Linh explorer), 1 organization, plan "Blue (Test)"
- **18/18 feature có profile** (82 KB candidate, v1: 49) — không có feature nào bị nhảy số hay thiếu như Campaign
- **7 conflict CONF-001..CONF-007** từ v1 giữ nguyên **UNRESOLVED** sau restructuring, rải trên nhiều feature bên dưới — không tự hoà giải
- Phần lớn field/behavior **per-layer-type** (7 feature `layer-config-*`, 29/35 layer type) chỉ có `observed_count=1` (1 DOM dump duy nhất `CTX-20260910-01`) → confidence LOW dù profile ghi MEDIUM ở cấp feature; field JSON key gắn qua bundle-registry (code) là **INFERRED**, chưa cross-check API/DB

---

## FEAT-01 — Artwork List Management
**Goal:** Store owner/staff xem và thao tác nhanh trên artwork đã tạo (preview, sửa chi tiết, nhân bản, gửi dịch, archive, xoá) từ `/artworks`.
**Entry points:** `/artworks`

**Capabilities:**
- Row quick actions: preview (search) / edit details / duplicate / menu (4 nút cố định)
- Overflow menu đúng 3 mục: Import to Translation / Mark as archive / Delete artwork

**Coverage:** portal ✅ · api ❌ · data ❌ · storefront ❌
**Confidence:** LOW (observed_count=1 cho toàn bộ control)
**Risks/Unknowns:**
- Delete artwork: chưa rõ soft hay hard delete, có phục hồi được không — rủi ro mất dữ liệu nếu test trên account thật
- "Import to Translation" / "Mark as archive": chưa quan sát kết quả sau click
- Luồng tạo mới/import artwork: 0 evidence trong toàn bộ 49 KB item gốc
- Publish/sync artwork vào campaign: 0 evidence
- Role khác owner / cross-tenant: chưa test

**Gate:** CONDITIONAL_PASS (đủ phát hiện regression trên 4 action + 3 menu item đã quan sát; KHÔNG đủ oracle cho effect sau Import to Translation/Mark as archive; không mở rộng sang tạo mới/import/publish)

---

## FEAT-02 — Artwork Template Management
**Goal:** Tạo/nhân bản/sửa/ẩn/convert các phiên bản template (biến thể layout) trong cùng 1 artwork, qua Template bar.
**Entry points:** artwork editor > Template bar (panel trái)

**Capabilities:**
1. Điều hướng + danh sách template hiện có
2. Cấu hình hiển thị (Template Settings: Dropdown List/Radio Button + toggle "Show selected template on cart/checkout")
3. Thêm/import template (Add new / Import from artwork)
4. Ẩn template — disabled khi artwork chỉ còn 1 template
5. Sửa template (Name/Thumbnail/Extra charge for this template)
6. Nhân bản ngay, không xác nhận, tên "<gốc> copy"
7. Convert to Global Template — menu overflow chỉ có đúng 1 mục này (không Delete/Change position)

**Coverage:** portal ✅ · api ❌ · data ❌ · storefront ❌
**Confidence:** MEDIUM
**Risks/Unknowns:**
- Kết quả sau khi "Convert to Global Template" hoàn tất — chưa quan sát
- "Import from artwork" lấy nguồn từ đâu, có liên hệ list /artworks (FEAT-01) không — chưa rõ
- Field "Extra charge for this template" chưa đối chiếu được với PUT body thật (KB-053 chỉ ghi nhận addons:[]/charge_enabled)
- Storefront khi có nhiều template (dropdown/radio hiển thị), role khác owner/cross-tenant — chưa test

**Gate:** CONDITIONAL_PASS (đủ cho control đã liệt kê; thiếu oracle cho state ≥2 template và kết quả Convert to Global Template; không suy diễn field API cho "Extra charge")

---

## FEAT-03 — Editor Layer Workspace
**Goal:** Thêm layer mới vào artwork và thao tác chọn/toolbar dùng chung trong canvas, độc lập với cấu hình chi tiết từng layer type.
**Entry points:** nút "+ Layer" · canvas — click chọn layer

**Capabilities:**
1. Popup "Select a layer type": 29 item / 7 nhóm (TEXT/IMAGE/VECTOR/MAPS & ASTRONOMY/PUZZLES/OTHERS/FORM ELEMENTS); 6 item có submenu → tổng 35 layer type khả dụng
2. Canvas toolbar đổi theo nhóm layer: text có Transform/Align/Print Effects + font/size; image/vector không font; form-elements chỉ Align
3. Layer action bar cố định khi chọn ≥1 layer: Deselect/N selected/Group/Ungroup/Copy to clipboard/Duplicate/Duplicate & Link options/Delete — không có menu overflow "..."
4. Vector library rỗng ("Empty data") chặn thêm layer nhóm VECTOR cho tới khi có ≥1 asset
5. Asset picker: 10 layer type mở picker ngay khi add; nút xác nhận đổi label theo số lượng đã tick; item đầu tick sẵn

**Coverage:** portal ✅ · api ❌ · data ❌ · storefront ❌
**Confidence:** MEDIUM
**Risks/Unknowns:**
- Group/Ungroup end-to-end chưa test — Ungroup luôn disabled vì chưa từng có group nào được tạo
- 29 item popup / 35 layer type có cố định qua các plan khác "Blue (Test)" không — chưa rõ
- Ngoài nhóm VECTOR, các picker khác (image/clipart) có rơi vào trạng thái rỗng tương tự không — chỉ test riêng Vector
- Storefront rendering layer vừa thêm, role khác owner/cross-tenant — chưa test

**Gate:** CONDITIONAL_PASS (đủ cho regression discovery trên control workspace; Group/Ungroup happy-path chưa có oracle vì chưa quan sát effect thật)

---

## FEAT-04 — Layer Common Config (mechanism/boundary dùng chung, cross-cutting)
**Goal:** Mô tả RANH GIỚI/mechanism dùng chung cho mọi/hầu hết 35 layer type (icon button trên layer row, accordion nào TỒN TẠI theo type, field boundary Custom class/Group name) — KHÔNG mô tả nội dung field cụ thể (xem FEAT-12..FEAT-18).
**Entry points:** config panel của 1 layer đã tồn tại

**Capabilities (baseline N/35):**
1. Icon buttons layer row: 5 icon chuẩn (eye/unlock/pen/copy/trash) ở 34/35 type — trừ Toggle Switch (FEAT-18, có thêm icon thứ 6)
2. Accordion PERSONALIZATION SETTINGS: có ở 35/35 (universal, mechanism only — nội dung field khác nhau theo type)
3. Accordion CONDITIONAL SETTING: có ở 33/35 — thiếu ở 2 Dynamic Clipart by Text (FEAT-13)
4. Accordion EXTRA: có ở 34/35 — thiếu Song Search (FEAT-17)
5. Accordion POPULATE VALUES: chỉ 22/35 — 13 ngoại lệ rải nhiều feature khác
6. Field "Custom class": có ở 33/35 — thiếu Static Image (FEAT-13), Static Vector (FEAT-14)
7. Field "Group name": có ở 34/35 — đồng nhất tập có EXTRA, thiếu Song Search

**Coverage:** portal ✅ · api ✅ (layer JSON 7-field common envelope, tham chiếu FEAT-07) · code (bundle-registry, INFERRED) ✅ · data ❌ · storefront ❌
**Confidence:** MEDIUM (nhưng mọi per-type claim con là LOW, observed_count=1)
**Risks/Unknowns:**
- ⚠️ **CONF-006 (UNRESOLVED):** bundle-registry (code, INFERRED) liệt kê 29 data-type có `custom_class`, trong khi DOM quan sát trực tiếp cho 33/35 type — 2 nguồn khác loại KHÔNG khớp phạm vi, không coi bên nào là đầy đủ/chính thức
- Restructuring v1→v2 thu hẹp scope feature này — checklist/test case cũ trỏ per-type detail (nội dung accordion cụ thể) của bản v1 PHẢI cập nhật sang FEAT-12..FEAT-18 tương ứng
- 9 layer type không có trong bundle-registry list nhưng có Custom class trên DOM — chưa đối chiếu chéo trực tiếp
- Storefront rendering, role khác owner/cross-tenant — chưa test cho nhóm field/mechanism này

**Gate:** CONDITIONAL_PASS (mọi capability per-layer-type trong nhóm này observed_count=1 → LOW, không suy required/optional/enum; field JSON key qua bundle-registry INFERRED, không coi là contract chính thức)

---

## FEAT-05 — Layer Duplicate & Link Copy
**Goal:** Nhân bản 1 layer, tuỳ chọn giữ đồng bộ cấu hình (design/personalization) với layer gốc qua "Duplicate & Link options".
**Entry points:** layer action bar, đã chọn 1 layer

**Capabilities:**
- Nút luôn hiện diện, tên giống nhau mọi layer type; kết quả khác theo type: **20/35 type** → bản LINKED (config panel rút gọn còn 2 accordion LINKED LAYER + EXTRA, message "Design and personalization are synced from it. Source layer: <name>"); **15/35 type** → PLAIN_COPY độc lập, giữ nguyên bộ accordion đầy đủ (Custom Shape, Spiral Text, Multiple Uploads, Text to Image AI, cả 2 Dynamic Clipart by Text, Star Maps, Song Search, QR Code, 6 type nhóm FORM ELEMENTS)

**Coverage:** portal ✅ · api ❌ · data ❌ · storefront ❌
**Confidence:** MEDIUM
**Risks/Unknowns:**
- ⚠️ **CONF-003:** brief/coordinator giả định phân biệt bản linked bằng **icon chain** trên layer row — quan sát thực tế KHÔNG có icon này. Dấu hiệu đúng duy nhất là accordion LINKED LAYER; nếu checklist dùng icon chain làm oracle sẽ luôn FAIL sai
- Sau save, bản LINKED đồng bộ config từ layer gốc thế nào (field nào realtime, field nào không) — chưa test sửa layer gốc rồi xem bản linked
- Vì sao đúng 15/35 type rơi vào PLAIN_COPY — theo nhóm layer hay implementation riêng lẻ, chưa rõ quy luật
- Shape JSON của layer linked trong PUT request (field source_layer_id?) — chưa đối chiếu với KB-053/KB-055
- Storefront rendering layer linked — 0 evidence

**Gate:** CONDITIONAL_PASS (CONF-003 phải giữ nguyên; checklist KHÔNG được dùng icon chain làm oracle phân biệt linked/plain)

---

## FEAT-06 — Layer Print Effects
**Goal:** Áp hiệu ứng in ấn (cắt hình theo layout preset hoặc tuỳ chỉnh) lên layer đã chọn, phục vụ file production guide cho nhà in.
**Entry points:** canvas toolbar > nút Print Effects

**Capabilities:**
- Popover shape-cut layout: 5 preset (1x2/1x3/1x4/2x1/2x3) + Customize (rows/columns tuỳ chỉnh); nút Apply layout disabled khi 0 shape cut được chọn

**Coverage:** portal ✅ (4 layer type + trang Extras › 3rd-party Services) · api ❌ · data ❌ · storefront ❌
**Confidence:** LOW
**Risks/Unknowns:**
- ⚠️ **CONF-004:** brief giả định Print Effects có thêm **emboss** phụ thuộc dịch vụ 3rd-party, nhưng quan sát thực tế trên 4 layer type + trang 3rd-party Services KHÔNG tìm thấy — KHÔNG kết luận emboss không tồn tại (có thể gate theo plan/layer type khác chưa thử/3rd-party service chưa bật)
- "Order Design" (nơi effect thực sự hiển thị làm production guide) — chưa khám phá
- Print Effects lưu vào field nào trong PUT body (layer object) — chưa đối chiếu KB-053/KB-055
- Hành vi runtime storefront/production file — 0 evidence

**Gate:** CONDITIONAL_PASS (CONF-004 phải giữ nguyên; checklist KHÔNG được khẳng định "không có emboss" như fact đã xác nhận, chỉ ghi "chưa tìm thấy trên account/plan đã test")

---

## FEAT-07 — Artwork Save & Persist
**Goal:** Lưu toàn bộ thay đổi (layer/template) của artwork từ editor xuống server đáng tin cậy, đọc lại đúng dữ liệu đã lưu ở lần mở editor tiếp theo.
**Entry points:** artwork editor — nút "Save & Close" / "Save"

**Capabilities:**
1. Editor thuần client-side tới khi Save: add/edit/delete/duplicate layer, mở accordion KHÔNG sinh API call nào
2. Trình tự Save cố định: `POST /api/artworks/{id}/validate-default-value` (luôn 204, 10/10 sample) → `PUT /api/artworks/{id}` (200, chỉ gửi nếu không bị chặn)
3. PUT full-replace: ghi đè toàn bộ artwork 1 lần gọi (không phải patch từng layer); response echo chính xác field ở sample có full-body capture
4. Client-side field validation trước Save: 8/35 layer type mặc định bị chặn với message theo field/type; 2 type (Text to Image AI, Multiple Uploads) validate 2 tầng tuần tự
5. Đọc lại dữ liệu: REST `GET /api/artworks/{id}` KHÔNG được hỗ trợ (405) — toàn bộ layer/template data chỉ đọc qua Hasura GraphQL (`artworks.templates` jsonb)

**Coverage:** portal ✅ · api ✅ (validate-default-value, PUT, GET 405, GraphQL) · data ✅ (qua GraphQL, KHÔNG phải db-explorer trực tiếp) · storefront ❌
**Confidence:** MEDIUM
**Risks/Unknowns:**
- ⚠️ **CONF-005:** chưa xác nhận OpenAPI spec có tồn tại thật trên staging hay chỉ chưa tìm đúng path (9 path thử đều 404)
- ⚠️ **CONF-007:** chưa rõ readback dùng 1 GraphQL query riêng hay chỉ đọc lại từ chính response PUT rồi gán nhãn "GraphQL" theo thói quen mô tả field jsonb
- Rate-limit header có tên expose trên response PUT nhưng chưa từng quan sát giá trị/threshold thật — KHÔNG dùng làm oracle
- validate-default-value trả lỗi 4xx/5xx thì UI xử lý ra sao — chưa có sample lỗi thật từ server (2 lần "thất bại" quan sát được đều do client chặn trước)
- `artwork_category_id`/`global_option_ids` gửi trong request nhưng KHÔNG có trong response top-level — bị loại khỏi serialize hay lưu nơi khác?
- required/optional/enum chính thức cho phần lớn field request/response PUT — observed_count=1, LOW
- Role khác owner/cross-tenant, storefront rendering từ templates jsonb, DB Postgres schema thật — chưa kiểm tra trực tiếp (db-explorer không chạy)

**Gate:** CONDITIONAL_PASS (core sequence validate→PUT confidence HIGH đủ làm baseline regression oracle; phần lớn field-level detail vẫn LOW; CONF-005/CONF-007 phải giữ nguyên cả 2 phía; không suy diễn hành vi server khi validate-default-value lỗi)

---

## FEAT-08 — Conditional Setting Config
**Goal:** Cấu hình điều kiện show/hide 1 layer dựa trên giá trị của layer khác trong cùng artwork, qua accordion CONDITIONAL SETTING.
**Entry points:** accordion CONDITIONAL SETTING trong config panel layer

**Capabilities:**
1. `match_type`: chỉ 2 radio — all (mặc định)/any; "No conditions" là trạng thái hiển thị khi chưa có condition, KHÔNG phải radio thứ 3
2. Nguồn condition: chỉ 8/35 layer type (toggle, additional-option, addon-charge, json-list, font, vector-category, clipart-category, group-clipart-categories) có thể làm nguồn
3. Dropdown nguồn tự loại trừ: chính layer đang cấu hình (chặn self-loop) + nguồn đã dùng ở condition trước đó trên cùng layer đích
4. Control giá trị theo loại nguồn: toggle dùng select nhị phân On/Off; 7 nguồn còn lại dùng "is any of:" (multi-value); clipart-category/vector-category auto-check item đầu grid

**Coverage:** portal ✅ · api ❌ · data ❌ · storefront ❌
**Confidence:** MEDIUM
**Risks/Unknowns:**
- ⚠️ **CONF-001:** network_ref của 1 action hỗ trợ KB-066 ("chọn nguồn Toggle, giá trị On") trỏ nhầm vào file mô tả action khác (không chứa PUT nào) — không tự sửa, giữ nguyên nghi vấn khi dùng KB-066 làm oracle cho action cụ thể này
- Giới hạn số condition tối đa/layer — mới thử tới 8 (hết đúng số nguồn khả dụng), không phải giới hạn hệ thống thật
- Nested logic (AND trong OR) — hiện KHÔNG có UI, chưa xác nhận backend có hỗ trợ không
- Toán tử khác ngoài "is any of"/on-off (is-none-of, contains, so sánh số/ngày) — chỉ quan sát đúng 2 dạng control
- 2 layer type Dynamic Clipart by Text không có accordion này — có đường API bypass UI để set condition không?
- Storefront render show/hide theo giá trị buyer chọn, role khác owner/cross-tenant — chưa test

**Gate:** CONDITIONAL_PASS (CONF-001 phải giữ nguyên khi dùng KB-066 làm oracle; KHÔNG khẳng định 8 nguồn/toán tử quan sát được là toàn bộ tập hệ thống hỗ trợ)

---

## FEAT-09 — Condition Cycle Validation
**Goal:** Ngăn không cho lưu 1 artwork mà đồ thị điều kiện hiển thị giữa các layer tạo thành vòng lặp phụ thuộc.
**Entry points:** accordion CONDITIONAL SETTING (chọn nguồn) · nút Save & Close/Save

**Capabilities:**
1. UI KHÔNG chặn lúc chọn nguồn tạo vòng — không ẩn, không disable, không toast ngay lúc chọn (nhất quán ở vòng 2 bước và 3 bước)
2. Chặn Save khi có vòng (client-side): modal không đóng, validate-default-value vẫn chạy và trả 204, nhưng PUT **KHÔNG BAO GIỜ** được gửi (0/2 lần thử) — DB không bị chạm
3. Vòng không persist khi Cancel — mở lại artwork, layer vẫn "No conditions" (chỉ tồn tại in-memory trong modal)
4. Self-loop A→A không tạo được qua UI (dropdown luôn loại trừ chính layer đang cấu hình)

**Coverage:** portal ✅ · api ✅ (validate-default-value 204; PUT không bao giờ gửi theo evidence hiện có) · data ❌ · storefront ❌
**Confidence:** MEDIUM
**Risks/Unknowns (P1):**
- 🔴 **BLK-API-002 (CRITICAL):** TOÀN BỘ evidence của cả 3 run — PUT chưa BAO GIỜ được gửi với payload chứa đồ thị vòng (client luôn chặn trước). validate-default-value vẫn 204 ngay cả ở 2 lần bị chặn → đây KHÔNG phải endpoint kiểm vòng. **KHÔNG CÓ evidence nào xác nhận hay bác bỏ việc server tự chặn vòng độc lập với client** — rủi ro data-integrity tiềm ẩn nếu client bị bypass
- Thuật toán chọn "layer gốc" hiển thị đầu message lỗi — 2/2 sample đều ra cùng 1 layer chỉ vì đặc thù test data, chưa tách biệt coincidence vs quy luật thật
- Chuỗi trong message là đường đi traversal dẫn tới vòng, KHÔNG phải chu trình tối giản — chưa xác nhận cách chọn khi có nhiều đường
- Self-loop qua API trực tiếp (bypass UI) — chưa thử
- Storefront khi 1 artwork (giả sử) có vòng lọt qua validation — 0 evidence, và bản thân trường hợp này chưa xác nhận có thể xảy ra

**Gate:** CONDITIONAL_PASS — BLK-API-002 PHẢI ở nguyên trong unknown_areas/risks; feature này CHỈ được mô tả ở tầng UI/client cho tới khi có direct-API test được orchestrator duyệt tường minh; KHÔNG mở rộng phạm vi thành "server-side protection đã xác nhận"

---

## FEAT-10 — Layer Condition Value Binding
**Goal:** Hệ thống lưu trữ đúng cấu trúc dữ liệu khi 1 layer có điều kiện hiển thị phụ thuộc layer khác, phục vụ đọc lại/render chính xác.
**Entry points:** layer đã có condition, đã Save — đọc qua PUT response hoặc GraphQL readback

**Capabilities:**
1. Key `dependency` presence-based: CHỈ tồn tại (absent, không phải null) khi layer có condition; shape `{match_type, show_by_default, dependencies:[{element, value}]}`
2. `dependencies[].value`: ≥5 shape khác nhau theo type nguồn — boolean scalar (toggle); array<DB id số> (additional-option/group-clipart-categories); array<internal layer id string> (addon-charge); array<display name> (json-list); array<file path> (font/vector-category/clipart-category)
3. `dependencies[].element`: luôn dạng "layer-<6 chữ số>" trong mọi sample (10 sample) — không có key toán tử riêng, match semantics suy ngầm từ layer type nguồn

**Coverage:** portal ❌ · api ✅ (PUT request/response body) · data ✅ (qua GraphQL, `artworks.templates` jsonb) · storefront ❌
**Confidence:** MEDIUM
**Risks/Unknowns:**
- ⚠️ **CONF-002:** trạng thái data layer addon-charge/json-list khác nhau giữa 2 run trên CÙNG artwork 4087 — nhiều khả năng do state đổi giữa 2 run chứ không phải mâu thuẫn hành vi sản phẩm, nhưng KHÔNG tự kết luận
- 5 shape value chỉ observed_count=1 (đúng 1 lần save 8-condition) — KHÔNG coi là enum/required chính thức
- toggle=false (Off) chưa từng được lưu qua Save — chưa biết serialize boolean false hay string
- Shape multi-value (≥2 giá trị) cho 6/8 type nguồn dạng array còn lại — chưa test
- `element` có luôn là layer id trong MỌI trường hợp hay chỉ đúng với 8 type đã test — INFERRED, chưa CONFIRMED
- DB Postgres thật, storefront rendering theo giá trị buyer thật — chưa kiểm tra trực tiếp / 0 evidence

**Gate:** CONDITIONAL_PASS (CONF-002 phải giữ nguyên cả 2 phía; KB-068/036/037 LOW/INFERRED KHÔNG được nâng thành required/enum/CONFIRMED chính thức)

---

## FEAT-11 — Populate Values
**Goal:** Cấu hình 1 layer tự động lấy/đồng bộ giá trị (nội dung/font/màu/nền/hình) từ 1 layer khác trong cùng artwork.
**Entry points:** accordion POPULATE VALUES trong config panel layer

**Capabilities:**
1. Populate Font khoá theo Google Font: toggle disabled kèm cảnh báo khi layer Font đang chọn Google Font, mở khoá khi đổi Custom Fonts (nhưng toolbar vẫn "Empty fonts!!!" tới khi chọn font cụ thể)
2. `retrieval_*` presence-based theo kênh: `retrieval_value_enabled/retrieval_layer/retrieval_value` chỉ có khi Populate Content bật; `retrieval_styles.<channel>` (font/color/background/shape) là object `{layer, enabled}` riêng mỗi kênh; field "Values:" trên UI KHÔNG được lưu trong JSON
3. Biến thể dynamic-by-text/clipart-frame: lưu `retrieval_layer`+`retrieval_value` (trùng tên key) nhưng set từ PERSONALIZATION SETTINGS, không phải panel POPULATE VALUES
4. Modal Browse values: 13 nhóm nguồn cố định; nguồn dạng text có 11 template biến đổi giá trị ({{value}}, {{value.Xchar}}, {{value.capitalonly}}...)
5. Word Cloud: panel Populate rút gọn chỉ 2 toggle Content/Shape (không Font/Color/Background); Shape chỉ nhận clipart-category/group-clipart-categories
6. "Populate to other layers" (chiều ngược): trên Font, 9 target đều disabled cho tới khi target đổi Custom Font; trên Color, 12 target KHÔNG bị khoá theo cơ chế này

**Coverage:** portal ✅ · api ✅ (PUT `layer.retrieval_*`) · data ✅ (`font_categories` query) · storefront ❌
**Confidence:** LOW (**coverage mỏng nhất trong toàn object** — observed_count=1-2 cho cả 7 KB item)
**Risks/Unknowns:**
- Toàn bộ 7 item chỉ observed_count=1-2 — chưa có lặp lại độc lập cho từng cơ chế
- 13 nhóm nguồn Browse values có đầy đủ tương ứng 1-1 với mọi layer/output type không, hay còn nhóm khác chưa liệt kê — chỉ 1 sample
- 11 template biến đổi giá trị ({{value.formula(...)}}, {{value.context...}}) — cú pháp thật hỗ trợ biểu thức/range gì, chưa test case cụ thể
- Font category bị soft-delete — có API/UI khôi phục hay vĩnh viễn?
- "Populate to other layers" cho Background/Shape — chỉ test Font/Color, 2 channel còn lại chưa test
- Storefront hiển thị giá trị đã populate thật (không phải placeholder), role khác owner/cross-tenant — chưa test

**Gate:** CONDITIONAL_PASS (đủ phát hiện regression trên luồng đã thử Font/Color/Word Cloud/dynamic-by-text; KHÔNG đủ để coi là bao phủ toàn bộ 22/35 layer type có accordion này; KHÔNG suy diễn cú pháp formula/context template thành spec chính thức)

---

## FEAT-12 — Layer Config: nhóm TEXT (6 layer type)
**Goal:** Cấu hình field/behavior riêng từng layer type nhóm TEXT: Single-line Text, Curve Text, Paragraph›Normal, Paragraph›Custom Shape, Warp Text, Spiral Text.
**Entry points:** config panel của layer type nhóm TEXT

**Capabilities (per-type deviation):**
- Single-line Text, Curve Text: baseline, không nằm trong bất kỳ danh sách ngoại lệ nào — nhưng CHƯA có DOM dump riêng xác nhận field cụ thể
- Warp Text: thiếu field "Right to Left text" (có ở 3 type khác trong nhóm)
- Spiral Text: field riêng "Inner radius"/"Text direction" — không type nào khác trong 35 type có
- Paragraph Normal: field riêng "Remove line breaks" + "Vertical offset in order design"
- Paragraph Custom Shape: field riêng "Select a shape"; có Vertical offset (giống Paragraph) nhưng KHÔNG có Remove line breaks

**Coverage:** portal ✅ · code (bundle-registry, INFERRED) ✅ · api ❌ · data ❌ · storefront ❌
**Confidence:** MEDIUM (per-type item LOW, observed_count=1)
**Risks/Unknowns:**
- Key JSON thật của "Remove line breaks" (Paragraph) chưa xác nhận trong bundle-registry
- Single-line Text/Curve Text chưa có DOM dump riêng — chỉ biết không bị liệt là ngoại lệ
- Storefront rendering (SDK), role khác owner/cross-tenant — 0 evidence cho cả nhóm này

**Gate:** CONDITIONAL_PASS (mọi per-type item observed_count=1 → LOW, không suy required/optional/enum; field JSON qua bundle-registry INFERRED, chưa coi là contract chính thức)

---

## FEAT-13 — Layer Config: nhóm IMAGE (8 layer type)
**Goal:** Cấu hình field/behavior riêng nhóm IMAGE: Static Image, Clipart Category, Clipart Category Group, Photo Upload Single/Multiple, Text to Image (AI), Dynamic Clipart by Text Manual/Auto Placement.
**Entry points:** config panel layer type nhóm IMAGE

**Capabilities:**
- Static Image: 1/2 type toàn hệ thống KHÔNG có Custom class; chưa có dump riêng khác
- Clipart Category (1 / Group): baseline, chưa ghi nhận deviation riêng
- Photo Upload Single: field riêng Upload editor (3 lựa chọn)/Direct upload style/Set minimum size/Image effects
- Photo Upload Multiple: KHÔNG có POPULATE VALUES; field GenAI service* bắt buộc (validate 2 tầng), Maximum photos (default 3); KHÔNG có "Mark as required"
- Text to Image (AI): KHÔNG có POPULATE VALUES lẫn DESIGN SETTINGS; KHÔNG có "No personalization"; field GenAI service nhãn khác Multiple Uploads dù cùng mục đích (2 key JSON khác nhau theo bundle-registry)
- Dynamic Clipart Manual Placement: chỉ 2 accordion (Personalization+Extra); "Value to populate*" mặc định RỖNG (tự điền)
- Dynamic Clipart Auto Placement: 3 accordion (+ Design Settings); "Value to populate*" TỰ PREFILL "{{value}}" — khác hẳn Manual dù cùng label field

**Coverage:** portal ✅ · code (bundle-registry, INFERRED) ✅ · api ❌ · data ❌ · storefront ❌
**Confidence:** MEDIUM (per-type LOW, observed_count=1)
**Risks/Unknowns:**
- `text_to_image_provider` vs `multi_image_provider`: 2 field cùng mục đích, key JSON khác nhau (INFERRED) — chưa xác nhận qua PUT body thật
- Manual vs Auto Placement dùng chung label UI "Value to populate*" nhưng default hành vi khác hẳn (rỗng vs prefill) — dễ viết sai test case nếu không phân biệt rõ
- Storefront/role khác owner-cross-tenant — chưa test

**Gate:** CONDITIONAL_PASS (per-type observed_count=1 → LOW; field JSON qua bundle-registry INFERRED, chưa coi là contract chính thức)

---

## FEAT-14 — Layer Config: nhóm VECTOR (3 layer type)
**Goal:** Cấu hình field/behavior riêng nhóm VECTOR: Static Vector, Vector Category, Vector Upload.
**Entry points:** config panel layer type nhóm VECTOR

**Capabilities:**
- Static Vector: 1/2 type toàn hệ thống KHÔNG có Custom class; chưa có dump riêng khác
- Vector Category: field riêng "Select one vector category*"; key JSON dùng chung `clipart` với clipart-category/font/color (không có key riêng)
- Vector Upload: field "Upload editor" chỉ có đúng 1 lựa chọn "Direct upload, no editor" — khác Photo Upload (cùng label field nhưng 3 lựa chọn)

**Coverage:** portal ✅ · code (bundle-registry, INFERRED) ✅ · api ❌ · data ❌ · storefront ❌
**Confidence:** MEDIUM (per-type LOW, observed_count=1)
**Risks/Unknowns:**
- Liên quan CONF-006 (Static Vector là ngoại lệ Custom class thứ 2 — xem FEAT-04)
- Key JSON `clipart` dùng chung cho 4 loại nguồn khác nhau — dễ nhầm khi viết assertion DB/API theo tên field UI
- Static Vector chưa có dump riêng xác nhận DESIGN SETTINGS ngoài việc thiếu Custom class
- Storefront/role khác owner-cross-tenant — chưa test

**Gate:** CONDITIONAL_PASS (per-type observed_count=1 → LOW; field JSON qua bundle-registry INFERRED)

---

## FEAT-15 — Layer Config: nhóm MAPS & ASTRONOMY (4 layer type)
**Goal:** Cấu hình field/behavior riêng nhóm MAPS & ASTRONOMY: Street Maps, Route Maps, Star Maps, Moon Phase.
**Entry points:** config panel layer type nhóm MAPS & ASTRONOMY

**Capabilities:**
- Street Maps: field location/zoom/map-style/marker riêng; map không render nếu thiếu Mapbox access token — chưa verify trực tiếp
- Route Maps: field GPX upload/elevation profile riêng (`elevation_profile_*` chỉ thuộc type này)
- Star Maps: **1/4 type trong nhóm KHÔNG có POPULATE VALUES**; field constellation/Milky Way/Grid lines riêng
- Moon Phase: field date/moon-type (Round/Heart/Transparent)/moon color; **DUY NHẤT trong nhóm có "Mark this option as required"**

**Coverage:** portal ✅ · code (bundle-registry, INFERRED) ✅ · api ❌ · data ❌ · storefront ❌
**Confidence:** MEDIUM (per-type LOW, observed_count=1)
**Risks/Unknowns:**
- Star Maps thiếu POPULATE VALUES — dễ viết sai test case populate nếu áp dụng chung cho cả nhóm
- Moon Phase là type duy nhất có "Mark as required" — không tổng quát hoá cho 3 type còn lại
- Mapbox token dependency của Street Maps — bản thân evidence gốc tự ghi "chưa verify trực tiếp"
- `maps_seacher_enabled` (Moon Phase, chính tả "seacher" lạ trong code) — typo thật của product hay lỗi ghi chép evidence, chưa rõ
- Storefront/role khác owner-cross-tenant — chưa test

**Gate:** CONDITIONAL_PASS (per-type observed_count=1 → LOW; field JSON qua bundle-registry INFERRED)

---

## FEAT-16 — Layer Config: nhóm PUZZLES (4 layer type)
**Goal:** Cấu hình field/behavior riêng nhóm PUZZLES: Scrabble›Cross Word, Scrabble›Single-line, Word Search, Word Cloud.
**Entry points:** config panel layer type nhóm PUZZLES

**Capabilities:**
- Scrabble Cross Word: field Input style/Max words + "Vertical offset (% of cell)" riêng trong EXTRA
- Scrabble Single-line: field riêng Cell direction/Cell alignment (duy nhất trong 35 type); KHÔNG có Input style nhưng có "Only numbers"
- Word Search: field grid (Regenerate layout/Min col-row); ⚠️ DOM cho thấy chuỗi "Custom class:" xuất hiện **HAI LẦN** trong cùng panel — CHƯA XÁC NHẬN 2 field riêng biệt hay lỗi duplicate render
- Word Cloud: field shape riêng (Enable custom shape/Shape source); accordion POPULATE VALUES chỉ có 2 channel Content+Shape — channel "Populate Shape" độc quyền, không type nào khác trong 22 type có POPULATE VALUES sở hữu

**Coverage:** portal ✅ · code (bundle-registry, INFERRED) ✅ · api ❌ · data ❌ · storefront ❌
**Confidence:** MEDIUM (per-type LOW, observed_count=1)
**Risks/Unknowns:**
- Input style/Max words dùng chung giữa Cross Word và Word Search (theo bundle-registry) nhưng KHÔNG có ở Single-line — dễ tổng quát hoá sai nếu coi cả 3 type Scrabble/Word Search giống nhau
- Word Search "Custom class:" xuất hiện 2 lần trong DOM — chưa xác nhận là bug hay 2 field thật, cần verify trước khi viết test case cho field này
- Storefront/role khác owner-cross-tenant — chưa test

**Gate:** CONDITIONAL_PASS (per-type observed_count=1 → LOW; field JSON qua bundle-registry INFERRED)

---

## FEAT-17 — Layer Config: nhóm OTHERS (4 layer type)
**Goal:** Cấu hình field/behavior riêng nhóm OTHERS: Song Search, Calendar, QR Code, Clock.
**Entry points:** config panel layer type nhóm OTHERS

**Capabilities:**
- Song Search: layer tối giản nhất — chỉ 2 accordion (Personalization + Conditional Setting), **DUY NHẤT trong 35 type KHÔNG có EXTRA**; canvas toolbar rỗng; field riêng "Load song lyrics"
- Calendar: DESIGN SETTINGS phong phú nhất nhóm (ngôn ngữ, first day of week, weekday display, marker SVG...)
- QR Code: DESIGN SETTINGS chỉ 1 field "Default URL/text*" giới hạn **4296 ký tự** — giới hạn ký tự cụ thể duy nhất quan sát ở cấp DESIGN SETTINGS trong toàn bộ 35 type; chưa thử nhập vượt giới hạn
- Clock: field Marker layout (Full numbers/at 3-6-9-12) / Numeral style (Arabic/Roman)

**Coverage:** portal ✅ · code (bundle-registry, INFERRED) ✅ · api ❌ · data ❌ · storefront ❌
**Confidence:** MEDIUM (per-type LOW, observed_count=1)
**Risks/Unknowns:**
- Giới hạn 4296 ký tự của QR Code chỉ là hint text UI — hành vi thật khi vượt (chặn/cắt/lỗi) chưa thử
- Song Search có canvas toolbar rỗng nhưng vẫn có Personalization+Conditional (khác layer "ảo" nhóm FORM ELEMENTS hoàn toàn không render) — thiết kế cố ý hay giới hạn kỹ thuật, chưa rõ
- Storefront/role khác owner-cross-tenant — chưa test

**Gate:** CONDITIONAL_PASS (per-type observed_count=1 → LOW; field JSON qua bundle-registry INFERRED)

---

## FEAT-18 — Layer Config: nhóm FORM ELEMENTS (6 layer type "ảo")
**Goal:** Cấu hình field/behavior riêng nhóm FORM ELEMENTS — 6 layer type KHÔNG render layer thật trên canvas, chỉ xuất hiện trên personalization form: Toggle Switch, Additional Option, Addon Charge, JSON List, Font, Color.
**Entry points:** config panel layer type nhóm FORM ELEMENTS

**Capabilities:**
- Cả 6 type: accordion EXTRA rút gọn chỉ có "Group name" (không có "Display this layer on"); không render layer thật trên canvas
- Toggle Switch: 6 icon trên layer row (thêm la-toggle-on — duy nhất trong 35 type); field riêng Toggle label/Pre-enable toggle; KHÔNG có "No personalization"
- Additional Option: layer "ảo" đúng nghĩa; field riêng category picker + Default value
- Addon Charge: field riêng Option values (repeater)/Display options as (4 kiểu: Inline Radio/Radio/Dropdown/Thumbnail)/Enable multiple selection
- JSON List: layer "ảo"; field riêng JSON File URL/Option display template/Cart display template
- Font: layer "ảo", dùng làm nguồn Populate Font cho layer khác (field "Populate to other layers" — chiều ngược); key JSON dùng chung `clipart`
- Color: tương tự Font nhưng ⚠️ **KHÔNG xuất hiện được làm nguồn Conditional Setting** dù có đủ Option Title (khác Font — CÓ xuất hiện được)

**Coverage:** portal ✅ · code (bundle-registry, INFERRED) ✅ · api ❌ · data ❌ · storefront ❌
**Confidence:** MEDIUM (per-type LOW, observed_count=1)
**Risks/Unknowns:**
- Color không thể làm nguồn Conditional Setting dù có Option Title, khác Font — dễ viết sai test case nếu coi 2 type "nguồn atomic option" này tương đương nhau; nguyên nhân (cố ý hay giới hạn kỹ thuật) chưa rõ
- Storefront/role khác owner-cross-tenant — chưa test

**Gate:** CONDITIONAL_PASS (per-type observed_count=1 → LOW; field JSON qua bundle-registry INFERRED)

---

## Gaps ở cấp Object (áp dụng cho MỌI feature trên)

| Gap | Ghi chú |
|---|---|
| **Data layer (DB) trực tiếp** | NOT_OBSERVED — mọi "data" evidence (FEAT-07, FEAT-10, FEAT-11) chỉ qua Hasura GraphQL hoặc chính response PUT, chưa qua db-explorer/Postgres thật |
| **Code-level facts (bundle-registry)** | Toàn bộ field JSON key suy ra từ 7 feature `layer-config-*` + `layer-common-config` đều **INFERRED** (code, chưa cross-check trực tiếp bằng API/DB cho từng field) — KHÔNG coi là contract chính thức khi viết assertion |
| **Storefront buyer-facing** | **0 evidence cho TOÀN BỘ 18 feature** — chưa test rendering artwork ở storefront (SDK) cho bất kỳ layer type/condition/populate/print-effect/template nào. Ngoài phạm vi 3 run bootstrap (thuộc storefront-explorer) |
| **RBAC / cross-tenant** | Chưa test trên bất kỳ endpoint/feature Artwork nào — chỉ 1 role (`owner`, Linh explorer) / 1 organization trong toàn bộ 3 run nguồn |
| **BLK-API-002 (P1/CRITICAL)** | FEAT-09: server có tự chặn đồ thị condition tạo vòng ở tầng PUT hay hoàn toàn phụ thuộc client — hoàn toàn UNKNOWN, PUT với payload chứa vòng chưa từng được gửi trong cả 3 run |
| **7 conflict CONF-001..CONF-007 (UNRESOLVED)** | CONF-001 network_ref sai (FEAT-08) · CONF-002 state addon-charge/json-list khác giữa 2 run (FEAT-10) · CONF-003 icon chain không tồn tại cho bản linked (FEAT-05) · CONF-004 emboss chưa tìm thấy, không kết luận không tồn tại (FEAT-06) · CONF-005 OpenAPI spec có tồn tại trên staging không (FEAT-07) · CONF-006 số layer type có Custom class: DOM 33/35 vs bundle-registry 29 (FEAT-04/13/14) · CONF-007 nguồn readback GraphQL riêng hay đọc lại từ PUT response (FEAT-07) |
| **Restructuring v1→v2** | v2 (2026-09-12) tách `layer-common-config` (v1) thành 7 feature `layer-config-*` để tăng granularity per-layer-type; 82 KB item (v1: 49), 41 item giữ nguyên nội dung (renumber), 29 item hoàn toàn mới per-type. **0 CONFIRMED_EXPECTED nào được nâng cấp** trong lần restructuring — vẫn toàn bộ OBSERVED_CURRENT |
| **Checklist confidence** | Tuyệt đại đa số field/behavior per-layer-type (29/35 type, 7 feature `layer-config-*`) chỉ `observed_count=1` — baseline quan sát 1 lần, chưa phải business rule đã confirm; KHÔNG suy required/optional/enum chính thức cho tới khi có thêm sample độc lập |

**Review độc lập:** context-quality-reviewer → verdict `APPROVED_WITH_CONDITIONS` (2 finding MINOR trong `checklists/layer-config-image.json` đã được qa-checklist-builder sửa trước publish; 1 finding MINOR khác — bootstrap-request.json thiếu top-level environment/role — không block, để lại cho lần bootstrap sau).
