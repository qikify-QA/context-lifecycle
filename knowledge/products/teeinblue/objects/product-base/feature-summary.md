# Object: Product Base (product: teeinblue) — Feature Profile Summary

- **Published context version:** 1 (`CTX-20260910-04`, published 2026-09-11, env: staging)
- **Mode:** ZERO_DOC_BOOTSTRAP — toàn bộ profile là OBSERVED_CURRENT (chưa có CONFIRMED_EXPECTED nào từ spec/PO/dev)
- **Actor test trong toàn bộ run:** duy nhất role `owner` (Linh explorer, sub=273), 1 organization, store `linh-explorer.myshopify.com`
- **8/8 feature đã có profile** (FEAT-01..FEAT-08, không nhảy số). Confidence tổng thể object: MEDIUM, status PARTIAL. FEAT-08 là profile yếu nhất (confidence LOW, 0 ACT cho đường ghi).
- **Lưu ý provenance:** đây là lần publish HỢP LỆ đầu tiên của object này — một lần publish TRƯỚC ĐÓ vào cùng đường dẫn là TRÁI PHÉP (chuỗi review/verdict giả mạo) và đã bị cách ly làm bằng chứng điều tra, KHÔNG dùng làm nguồn cho bản này.

---

## FEAT-01 — Duyệt & Tìm kiếm Danh sách Product Base
**Goal:** Tìm và xem danh sách product base hiện có (tab Active/Archived, filter, search, list/grid) để quản lý, tạo mới, hoặc thao tác lên từng product base.
**Entry points:** `/products` · `/products?tab=archived` · `/products` (modal Import product) · `/products/new` (qua "+ Add Manual")

**Capabilities:**
1. Bảng 8 cột cố định (Mockup/Title-Internal/Internal tags/Fulfillment/Imported/Used/Created at/Action), không cột nào sort được; toggle sang grid view (client-side)
2. Tab Active/Archived đổi điều kiện GraphQL `status _neq/_eq '1'`
3. Search chung chỉ lọc `title:{_ilike}` — không lọc Internal name/tags
4. 4 filter chip: Fulfillment (radio 1-chọn, Clear), Internal name, Internal tags, Usage (Used/Unused, Clear)
5. Phân trang cursor (`products_connection`), chỉ nút ‹ › không số trang
6. Row-level actions: icon rocket "Update campaign" (có điều kiện), pencil Edit, copy Duplicate, menu "..." (nội dung khác nhau giữa tab Active/Archived)
7. 2 empty-state phân biệt: "Empty data" (rỗng thật) vs "No data matched" (search/filter không khớp)
8. Entry point tạo mới ("+ Add Manual") / import (modal 15 provider, phân trang offset)

**Coverage:** portal (list/tab-archived/grid/search-no-match/import-modal) ✅ · api (tab-active/tab-archived/search query) ✅ · pagination >20 bản ghi ❌ · filter riêng Internal name/tags ❌ · non-owner ❌
**Confidence:** MEDIUM
**Risks/Unknowns:**
- CONF-001 (URL-sync/cursor pagination) chỉ mới PARTIALLY RESOLVED qua domain knowledge người dùng, **chưa qua orchestrator+reviewer formal review** — rủi ro cursor stale nếu tạo product base mới trong lúc đang ở trang edit rồi quay lại bằng URL cũ, chưa tái hiện được bằng evidence
- Danh sách fulfillment provider không nhất quán giữa 3 nơi hiển thị (filter: 16, modal Import: 15, form New: 32) — rủi ro chọn nhầm provider
- Tên trang không nhất quán (sidebar "Product Base" / breadcrumb "Products" / heading "Product Bases")
- Filter riêng "Find Internal name"/"Find Internal tags" chưa test action nào — chưa biết có lọc đúng field không
- Cursor pagination khi >20 bản ghi hoàn toàn chưa kiểm (store demo chỉ có 3 bản ghi)
- Import product từ catalog nhà in (bên thứ 3) — ngoài scope run này

**Gate:** CONDITIONAL_PASS (không được coi resolution CONF-001/CONF-002 là CONFIRMED_EXPECTED; giữ nguyên unknown_areas, không lấp bằng giả định)

---

## FEAT-02 — Tạo mới Product Base (thủ công)
**Goal:** Tạo mới 1 product base qua form `/products/new`, với validation tối thiểu, để có bản ghi sẵn sàng cấu hình printarea/variant/mockup tiếp theo.
**Entry points:** `/products/new` (qua "+ Add Manual" từ FEAT-01)

**Capabilities:**
1. Form 6 field (Product title, Internal name, Internal tags, Fulfillment provider, Fulfillment catalog ID, Description) — không field nào có dấu hiệu bắt buộc trong DOM
2. Product title pre-fill giá trị thật "Example MUG" (không phải placeholder)
3. Chọn Fulfillment provider qua multiselect — không có nút X để bỏ chọn về "Others"
4. Submit → `POST /api/products`; server tự set nhiều field mặc định (status=0, had_back=false, color/size_display_type='radio', label=title nếu bỏ trống Internal name)
5. Redirect `/products/{id}/edit` kèm wizard onboarding "Step 1/3"; trạng thái wizard ghi qua `PUT /api/user/guide-config`
6. Khối "Advanced options" luôn disabled trên form New — điều kiện enable thực sự chưa xác định

**Coverage:** portal (empty-baseline/title-empty/full-form) ✅ · api (422 title rỗng, 201 full payload) ✅ · advanced-options-enable-condition ❌ · title boundary values ❌ · non-owner ❌
**Confidence:** MEDIUM
**Risks/Unknowns:**
- 422 khi title rỗng chỉ hiện toast, không có inline field error/highlight — dễ bị bỏ sót khi kiểm UI/accessibility
- Multiselect Fulfillment provider không thể bỏ chọn nhầm từ form New
- Biến quyết định enable "Advanced options" chưa rõ (fulfillment_id/is_imported/catalog ID/đang được campaign dùng) — rủi ro viết test case sai giả định
- Field nào khác ngoài title thực sự required ở server — chưa test
- Giá trị biên Product title (whitespace-only, rất dài, ký tự đặc biệt/HTML) — chưa thử, rủi ro lưu sai/XSS/overflow

**Gate:** CONDITIONAL_PASS (không tổng quát hoá "chỉ Product title required")

---

## FEAT-03 — Sửa Thông tin Cơ bản (Basic Information)
**Goal:** Xem và cập nhật thông tin cơ bản (title/label/tags/fulfillment/description/thumbnail) của 1 product base đã tồn tại.
**Entry points:** `/products/{id}/edit`

**Capabilities:**
1. Thumbnail (optional, chỉ ở trang edit, không có ở form New) — 2 tooltip lồng nhau (không tương thích SDK v2; giới hạn 250x250px)
2. Nút Save disabled cho tới khi có thay đổi
3. Lưu Basic information — `PUT /api/products/{id}` gửi lại FULL 8 field (full-replace, không phải patch)

**Coverage:** portal (save-disabled/save-enabled) ✅ · api (put full-replace) ✅ · thumbnail-upload-execute ❌ · concurrent-edit-2-sessions ❌ · non-owner ❌
**Confidence:** MEDIUM
**Risks/Unknowns:**
- Full-replace PUT tạo rủi ro race-condition/mất dữ liệu nếu 2 tab/2 user sửa đồng thời (last-write-wins) — không thấy optimistic locking/version check nào trong evidence
- Giới hạn kích thước/định dạng thật của Thumbnail chưa test (mới thấy tooltip 250x250px)

**Gate:** CONDITIONAL_PASS (rủi ro full-replace/concurrency phải giữ nguyên severity, không hạ thành minor)

---

## FEAT-04 — Định nghĩa & Quản lý Printarea
**Goal:** Tạo/sửa/xoá các vùng in (printarea) trên 1 product base, để xác định nơi thiết kế/artwork sẽ được đặt khi in sản phẩm.
**Entry points:** `/products/{id}/edit` (section Printareas)

**Capabilities:**
1. Tạo printarea mới (form có sẵn trong DOM, mặc định Fulfilled key='Front', Width/Height=1400)
2. Tooltip giải thích 3 cột: TIB, Fulfilled key, Display name
3. Inline editor + xoá (nút X) + re-order (drag) cho từng ô
4. Cho phép trùng Fulfilled key giữa 2 printarea — không lỗi, không cảnh báo
5. Xoá printarea — `DELETE /api/printareas/{id}` chạy ngay, không dialog xác nhận, không undo
6. Dialog cảnh báo mỗi lần bấm sửa — nội dung là i18n key chưa dịch
7. Đường ghi dữ liệu bất đối xứng: tạo/sửa qua Hasura GraphQL client-side `_set`; xoá qua REST DELETE — khác hoàn toàn với product base (REST cho tất cả)
8. Modal "Logs" của product base chỉ ghi 4 loại sự kiện, tất cả thuộc về printarea — mọi thao tác khác (thêm variant, sửa Basic info, upload mockup...) không có dấu vết

**Coverage:** portal (create-default/duplicate-key/invalid-width-text/delete) ✅ · api (insert/update-invalid-type/delete-204) ✅ · width/height boundary (0/âm/lớn/thập phân) ❌ · variant tham chiếu printarea đã xoá ❌ · Hasura `_set` scope negative test ❌ · non-owner ❌
**Confidence:** MEDIUM
**Risks/Unknowns (cụm rủi ro lớn nhất object):**
- **HIGH:** nhập "abc" vào Width → HTTP 200 kèm lỗi Postgres thô trong body ("invalid input syntax for type integer"), UI không báo gì — lộ engine DB và kiểu cột cho user
- **MEDIUM:** audit log printarea ghi 201 "lạc quan" trước/độc lập kết quả mutation thật — thao tác lỗi (Width='abc') không xuất hiện trong Logs, audit log không đáng tin
- **MEDIUM:** client ghi thẳng Hasura mutation với `_set` tùy ý từ trình duyệt; phạm vi cột/hàng được phép sửa chưa được verify bằng negative/cross-tenant test
- **MEDIUM:** xoá không dialog xác nhận/không undo — dễ mất dữ liệu do thao tác nhầm
- **MEDIUM:** cho phép 2 printarea trùng Fulfilled key song song — rủi ro nhà in nhận sai file nếu Fulfilled key dùng để map file
- **MEDIUM:** Logs chỉ ghi phạm vi quá hẹp (chỉ printarea) — audit trail toàn bộ product base không đầy đủ/không đáng tin cậy
- **LOW:** dialog cảnh báo hiện i18n key chưa dịch

**Gate:** CONDITIONAL_PASS — risk bảo mật/silent-failure (Width='abc', audit log lạc quan, Hasura `_set` scope) PHẢI mang nguyên severity sang checklist, không được giảm nhẹ

---

## FEAT-05 — Quản lý Variant Catalog
**Goal:** Quản lý catalog variant (SKU, màu/size, giá, tồn kho) của 1 product base: thêm nhanh variant, cấu hình hiển thị màu/size, gán printarea riêng theo variant, export/import.
**Entry points:** `/products/{id}/edit` (section Variants)

**Capabilities:**
1. Quick-add variant — client chặn submit nếu thiếu field (không gửi request); chỉ báo viền đỏ, không có text message
2. Chặn SKU trùng trong cùng product base — pre-check qua `getVariant` trước khi thêm, toast cụ thể khi trùng
3. Modal Display settings — cấu hình `color_display_type`/`size_display_type` + Edit label
4. Toggle "Custom variant's printarea" — thêm cột vào bảng, lưu ngay qua `update_products`, không cần Save riêng
5. Download template / Export variant — dùng chung 1 bộ cột (SKU/Color/Size/Weight/Base Cost/Price/Compare price/Available), thiếu ID và printarea

**Coverage:** portal (empty-all-fields/duplicate-sku/partial-empty/display-settings-view/custom-printarea-toggle-on) ✅ · api (insert_variants, staff-activity-logs-404) ✅ · import csv/xlsx ❌ · delete-selected bulk ❌ · custom-printarea assign UI ❌ · duplicate-SKU server-side enforcement ❌ · non-owner ❌
**Confidence:** MEDIUM
**Risks/Unknowns:**
- **MEDIUM:** `POST /api/staff-activity-logs/variant` trả 404 ở mọi lần thêm (2/2) — variant vẫn tạo thành công nhưng Logs không có entry nào cho variant, audit trail thiếu
- **MEDIUM:** cột "Custom Printareas" luôn hiện "No printareas" dù đã bật toggle và product base có sẵn printarea — chưa tìm được đường UI để gán thực sự (có thể là tính năng chưa hoàn thiện hoặc bug)
- **MEDIUM:** Export/Template thiếu cột ID và printarea — vòng export-sửa-import sẽ mất liên kết, rủi ro tạo trùng/lệch dữ liệu khi thao tác hàng loạt
- **LOW:** xử lý giá trị rỗng không nhất quán trong cùng payload (Weight='' vs Compare price=null)
- **LOW:** Modal Display settings hiện toàn bộ radio disabled/không checked dù record đã có giá trị — có thể là bug UI
- **LOW (INFERRED, chưa xác nhận):** phạm vi unique SKU (product_id, fulfillment_linked_id) chỉ suy từ pre-check client + hành vi clone — CHƯA xác nhận constraint DB thật, không được coi là business rule
- Import variant từ csv/xlsx, Export/Import Excel của grid, "Delete selected" hàng loạt — hoàn toàn chưa chạy trong run này

**Gate:** CONDITIONAL_PASS (KB-041 INFERRED không được dùng làm oracle; audit-log risk (404) giữ nguyên severity)

---

## FEAT-06 — Upload & Gán Mockup cho Product Base
**Goal:** Upload ảnh mockup mới hoặc chọn từ media library, và gán cho product base/variant để preview sản phẩm.
**Entry points:** `/products/{id}/edit` (section Mockup)

**Capabilities:**
1. Upload mockup mới — luồng 4 bước tách rời: (1) lấy presigned upload URL, (2) PUT thẳng lên CDN (không qua backend teeinblue), (3) đăng ký mockup-layer, (4) gán vào product
2. Media library modal — chọn ảnh có sẵn, phân trang offset (khác cursor pagination của `/products` chính)
3. Trạng thái "Rendering" sau khi gán — xử lý bất đồng bộ phía server, run này không chờ tới khi render xong (0 polling quan sát được)
4. Modal "Assign mockups" — 2 cột Select variants/Select mockups + Select all; run này chỉ mở rồi Cancel, chưa thực thi gán

**Coverage:** portal (upload-new-file/media-library-view/render-pending) ✅ · api (upload-url-presigned, mockup-layer-register-assign) ✅ · render-complete/polling ❌ · assign-mockups-save-execute ❌ · mockup card actions (Edit/Duplicate/Move/More) ❌ · non-owner ❌
**Confidence:** MEDIUM
**Risks/Unknowns:**
- **MEDIUM:** TTL, scope (bucket/prefix) và giới hạn kích thước file của presigned upload URL hoàn toàn chưa quan sát được — response bị redact hoàn toàn theo policy, không đánh giá được rủi ro rò rỉ/tái sử dụng URL
- **LOW:** bước lấy upload URL dùng `{userId}` = `users.id`, KHÔNG phải `staffs.id` (sub) — route duy nhất khác biệt này trong toàn bộ capture, rủi ro nhầm lẫn định danh nếu có logic phân quyền dựa trên path param
- Cơ chế thông báo hoàn tất render (polling/webhook/tự reload) chưa rõ
- Assign mockups cho variant thực sự hoạt động ra sao (Save, không chỉ Cancel) — chưa thực thi
- Card mockup có action Edit/Duplicate/Move/More — chưa thực thi hành động nào

**Gate:** CONDITIONAL_PASS (không được suy diễn TTL/scope/giới hạn file của presigned URL — giữ nguyên trong unknown_areas)

---

## FEAT-07 — Vòng đời Product Base (Archive / Duplicate / Delete)
**Goal:** Quản lý vòng đời của 1 product base: archive/unarchive, nhân bản (duplicate), hoặc xoá hẳn khi không còn dùng.
**Entry points:** `/products` (row menu "...")

**Capabilities:**
1. Archive — `POST /api/products/{id}/archive`, status 0→1, không dialog xác nhận
2. Unarchive — control tồn tại trong menu "..." ở tab Archived, nhưng CHƯA được bấm/thực thi trong run này
3. Duplicate (clone) — deep-copy printarea/variant/mockup/display settings sang bản ghi mới (title += " copy", label/internal_tags giữ nguyên, SKU giữ nguyên)
4. Delete — có dialog xác nhận + gọi `deletion-check` trước; DELETE thật qua REST trả 204

**Coverage:** portal (archive-active/duplicate/delete-allowed) ✅ · api (post-archive/post-clone/delete-204/deletion-check-allowed-branch) ✅ · deletion-check-blocked UI response ❌ · unarchive-execute ❌ · delete trên product đang active (chưa archive) ❌ · delete-when-blocked server enforcement ❌ · non-owner ❌
**Confidence:** MEDIUM
**Risks/Unknowns:**
- **HIGH:** chưa xác nhận DELETE có thực sự bị chặn phía server khi `deletion-check.policy='blocked'` (IN_CAMPAIGNS) hay chỉ là gợi ý UI — chưa test vì nằm trong forbidden_actions
- **MEDIUM:** response `/clone` trả về chính record NGUỒN (không phải bản sao) — bất kỳ consumer nào gọi API clone trực tiếp (ngoài portal) sẽ không lấy được id vừa tạo từ response, dễ gây lỗi logic ở integration khác
- **MEDIUM:** mức xác nhận trước hành động phá huỷ/nhân bản không nhất quán (archive/duplicate không hỏi, chỉ delete mới hỏi)
- **LOW:** field `token` trong response deletion-check luôn null ở mọi sample — mục đích chưa rõ, có thể là cơ chế bảo vệ chưa kích hoạt
- **LOW:** response archive trả full record lộ thêm field chưa thấy ở response khác (variants_position, print_provider_id)
- Unarchive thực sự hoạt động ra sao (API nào, chuyển state nào) — 0 evidence
- DELETE trên product base đang ACTIVE (chưa archive) có được chấp nhận hay bắt buộc phải archive trước — chưa rõ

**Gate:** CONDITIONAL_PASS — risk HIGH "DELETE server-side enforcement khi blocked" phải mang nguyên sang checklist ưu tiên cao; Unarchive KHÔNG được coi là đã verify (chỉ observation UI tĩnh)

---

## FEAT-08 — Liên kết Product Base với Campaign & Đồng bộ (Update campaign)
**Goal:** Liên kết 1 product base vào campaign và đồng bộ thay đổi (printarea/variant/mockup) sang campaign đang dùng nó, qua nút "Update campaign".
**Entry points:** `/products/{id}/edit` (khi imported + có provider + đang được campaign dùng) · `/campaigns/{id}/edit` (khối "Available Products") · `/campaigns/new` (không có bước chọn product base) · modal "Select your product"

**Capabilities:**
1. Control "Update campaign" (icon rocket) — chỉ hiện trên product base đang được campaign dùng, nguồn dữ liệu là `campaign_products/need_sync` (chỉ đọc); **CHƯA được bấm/thực thi**
2. Khối "Available Products" trên campaign editor — liệt kê, drag re-order, nút "Add more product"; **CHƯA thực thi** thêm/xoá product base nào
3. Modal "Select your product" — filter Search/Internal name/Internal tags; KHÔNG lọc bỏ product base "chưa sẵn sàng" (thiếu fulfillment/mockup/printarea/variant); **CHƯA bấm Save/chọn thật**
4. Cảnh báo mềm khi sửa product base đang được campaign dùng — chỉ có banner "UPDATE CAMPAIGNS AFTER ANY CHANGES" + dialog i18n chưa dịch, KHÔNG chặn việc sửa ở UI
5. Không có liên kết trực tiếp product base ↔ artwork — artwork chỉ xuất hiện trong ngữ cảnh campaign editor

**Coverage:** portal (button-visible/available-products-view/select-product-modal-view) ✅ · api (campaign_products-need_sync **chỉ đọc**) ✅ · update-campaign write path ❌ · add-product-to-campaign write path ❌ · update-campaign click-execute ❌ · non-owner ❌
**Confidence:** LOW (yếu nhất trong 8 profile — 0 ACT cho toàn bộ đường ghi)
**Risks/Unknowns:**
- **HIGH (coverage-blocking):** toàn bộ đường GHI của quan hệ product base↔campaign (bấm "Update campaign", thêm product base vào campaign) nằm trong forbidden_actions/bị permission-layer chặn trong run này (gần ranh giới publish_live) → 0 API/DB evidence. Mọi capability của feature này chỉ dựa trên quan sát UI tĩnh — **đây KHÔNG phải lỗi phân quyền của owner**, mà là giới hạn phạm vi/mutation-policy của run, cần phân biệt rõ
- **HIGH (unverified-core-flow):** hành vi thật khi bấm "Update campaign" (đồng bộ field nào sang campaign_instances) hoàn toàn chưa biết
- **MEDIUM:** modal "Select your product" không lọc bỏ product base chưa sẵn sàng — rủi ro gán nhầm sản phẩm chưa hoàn thiện vào campaign, phát hiện lỗi khi publish
- **MEDIUM:** cảnh báo đồng bộ chỉ ở mức mềm, không có cơ chế bắt buộc — rủi ro user quên đồng bộ, campaign live hiển thị sai printarea/variant

**Gate:** CONDITIONAL_PASS kèm blocking_issue — profile chỉ dùng được để khám phá UI surface/risk tiềm ẩn, **KHÔNG dùng được làm oracle** cho hành vi ghi thực tế; qa-checklist-builder chỉ được tạo test case dạng "to-be-explored"/risk-flagged cho nút Update campaign, không được tạo expected-result

---

## Gaps ở cấp Object (áp dụng cho MỌI feature trên)

| Gap | Ghi chú |
|---|---|
| **Data layer (DB) / Code-level facts** | Không có `db_ref`/code source nào trong `source_refs` của KB object — Data layer và code-level facts NOT_OBSERVED cho toàn bộ 8 feature, tương tự object Campaign |
| **FEAT-08 write-path** | 0 ACT toàn bộ đường ghi (Update campaign, thêm product vào campaign) — bị chặn bởi mutation-policy/forbidden_actions gần ranh giới publish_live; cần run tiếp theo (INCREMENTAL_UPDATE/RECONCILE) với phạm vi phù hợp trước khi coi context đầy đủ cho vùng này |
| **deletion-check policy='blocked' (FEAT-07)** | Chưa xác nhận DELETE có thực sự bị chặn server-side hay chỉ là gợi ý UI — risk HIGH, ưu tiên cao cho lần refresh kế tiếp |
| **RBAC / permission theo role khác** | `.env` chỉ còn `TIB_STAGING_*`, không còn `TIB_USER_A_*/TIB_USER_B_*` → không có evidence 401/403/cross-tenant cho **bất kỳ** endpoint product-base nào |
| **CONF-001 (URL-sync /products, /campaigns, /orders)** | PARTIALLY RESOLVED qua domain knowledge người dùng (2026-09-10), **chưa qua orchestrator + reviewer formal review** — chỉ có evidence thật cho `/products`; `/campaigns` và `/orders` vẫn CHƯA XÁC MINH, không được coi là confirmed khi publish |
| **CONF-002 (JWT iss claim đổi theo login vs refresh)** | RESOLVED theo domain knowledge người dùng, cũng chưa qua formal review — bản chất là cơ chế session/auth toàn portal, không riêng của product base |
| **stale_candidates (1)** | `knowledge/portal-pages.md` mục Pagination chỉ đúng một phần (chỉ đúng khi chuyển trang trong cùng list, chưa phản ánh cơ chế URL-restore khi rời/quay lại trang) — cần chủ sở hữu cập nhật riêng, qa-knowledge-normalizer không tự sửa |
| **unmapped_evidence (5)** | Gồm: giả thuyết staff-activity-log qua Hasura event trigger (chưa verify); filter riêng "Find Internal name/tags" (chưa test); rủi ro cursor-staleness (chưa tái hiện); 4 request GraphQL body không đọc được (chưa map ACT-ID); endpoint `GET /catalogs` của modal Import (chỉ OBS, không có ACT) — **không được nâng thành fact** ở feature-profile/checklist tiếp theo |
| **Giá trị biên chưa test** | Width/Height printarea (0/âm/lớn/thập phân), Product title (whitespace/dài/ký tự đặc biệt/HTML), required field ngoài title/quick-add variant — chỉ mới test 1 kiểu input sai (chữ), chưa test biên số |
| **KB-041 INFERRED (unique SKU scope)** | Suy từ pre-check client + hành vi clone, CHƯA xác nhận constraint DB thật — không được biến thành business rule/oracle |
| **Coverage_gaps tổng (14 mục trong kb.json)** | Bao trùm tất cả nội dung "chưa thực thi" liệt kê ở từng feature trên (Import variant, Assign mockups save, Custom Printarea assign UI, pagination >20 bản ghi, Advanced options condition, v.v.) |
| **Publish provenance** | Lần publish hợp lệ đầu tiên (2026-09-11); một lần publish trái phép trước đó vào cùng path đã bị cách ly làm bằng chứng điều tra (không dùng làm nguồn) — nội dung bản publish hiện tại build hoàn toàn từ `candidate/*.json` đã qua 3 lượt review độc lập |

**Review độc lập:** object gate `CONDITIONAL_PASS` (kb.json), ratify text lấy nguyên văn từ `review/verdict.json` round 3; 5 điều kiện publish đều xoay quanh việc không nâng domain-knowledge/INFERRED/CONF chưa formal-review thành fact.
