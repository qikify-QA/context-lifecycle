# Object: Product Base (product: teeinblue) — Feature Profile Summary

- **Phạm vi đã kiểm thử:** role `owner` (Linh explorer, sub=273), 1 organization, store `linh-explorer.myshopify.com`, environment staging. Chưa có evidence cho role khác (không có tài khoản thứ 2 để test permission/cross-tenant).
- **8/8 feature có profile:** product-base-browse, product-base-create, product-base-identity, printarea-definition, variant-catalog, mockup-attachment, product-base-lifecycle, product-base-campaign-link. Confidence tổng thể object: MEDIUM. `product-base-campaign-link` là feature yếu nhất (confidence LOW, gần như không có bằng chứng cho đường ghi dữ liệu).
- Lịch sử thay đổi chi tiết: xem `CHANGELOG.md`. Câu hỏi/mâu thuẫn còn mở: xem `open-questions.md`.

---

## Duyệt & Tìm kiếm Danh sách Product Base (`product-base-browse`)
**Goal:** Tìm và xem danh sách product base hiện có (tab Active/Archived, filter, search, list/grid) để quản lý, tạo mới, hoặc thao tác lên từng product base.
**Entry points:** `/products` · `/products?tab=archived` · `/products` (modal Import product) · `/products/new` (qua "+ Add Manual")

**Capabilities:**
1. Bảng 8 cột cố định (Mockup/Title-Internal/Internal tags/Fulfillment/Imported/Used/Created at/Action), không cột nào sort được; toggle sang grid view (client-side)
2. Tab Active/Archived đổi điều kiện GraphQL `status _neq/_eq '1'`
3. Search chung chỉ lọc `title:{_ilike}`; 2 filter chip riêng "Internal name"/"Internal tags" lọc đúng field riêng của chúng, độc lập với Search chung — đã xác nhận qua test thật (KB-065)
4. 4 filter chip: Fulfillment (radio 1-chọn, Clear), Internal name, Internal tags, Usage (Used/Unused, Clear)
5. Phân trang cursor (`products_connection`), chỉ nút ‹ › không số trang; URL đồng bộ state (`?tab=&limit=&title=&cursor=&gridstate=`) — rời trang edit rồi bấm Back của trình duyệt khôi phục đúng tab/filter/trang trước đó qua cơ chế URL-sync này (xác nhận qua browser back-navigation thật, KB-066). Phạm vi xác nhận CHỈ cho `/products`.
6. Row-level actions: icon rocket "Update campaign" (có điều kiện), pencil Edit, copy Duplicate, menu "..." (nội dung khác nhau giữa tab Active/Archived)
7. 2 empty-state phân biệt: "Empty data" (rỗng thật) vs "No data matched" (search/filter không khớp)
8. Entry point tạo mới ("+ Add Manual") / import (modal 15 provider, phân trang offset)

**Coverage:** portal (list/tab-archived/grid/search-no-match/import-modal/back-restore) ✅ · api (tab-active/tab-archived/search query/filter chip riêng) ✅ · pagination >20 bản ghi ❌ (xem `open-questions.md` OQ-006) · cursor-staleness ❌ (OQ-007) · non-owner ❌
**Confidence:** MEDIUM
**Risks:**
- Danh sách fulfillment provider không nhất quán giữa 3 nơi hiển thị (filter: 16, modal Import: 15, form New: 32) — rủi ro chọn nhầm provider
- Tên trang không nhất quán (sidebar "Product Base" / breadcrumb "Products" / heading "Product Bases")
- Cursor pagination khi >20 bản ghi hoàn toàn chưa kiểm được (store test chỉ có 3 bản ghi) — xem OQ-006
- Rủi ro cursor trong URL bị stale khi tạo product base mới rồi quay lại bằng URL cũ — chưa tái hiện bằng evidence thật, xem OQ-007
- Import product từ catalog nhà in (bên thứ ba) — ngoài phạm vi đã khảo sát

---

## Tạo mới Product Base thủ công (`product-base-create`)
**Goal:** Tạo mới 1 product base qua form `/products/new`, với validation tối thiểu, để có bản ghi sẵn sàng cấu hình printarea/variant/mockup tiếp theo.
**Entry points:** `/products/new` (qua "+ Add Manual")

**Capabilities:**
1. Form 6 field (Product title, Internal name, Internal tags, Fulfillment provider, Fulfillment catalog ID, Description) — không field nào có dấu hiệu bắt buộc trong DOM; chỉ Product title thực sự bắt buộc ở tầng server
2. Product title pre-fill giá trị thật "Example MUG" (không phải placeholder)
3. Chọn Fulfillment provider qua multiselect — không có nút X để bỏ chọn về "Others"
4. Submit → `POST /api/products`; server tự set nhiều field mặc định (status=0, had_back=false, color/size_display_type='radio', label=title nếu bỏ trống Internal name)
5. Title chỉ gồm khoảng trắng bị coi như không có title — chặn hoàn toàn ở client, không gửi request, không tạo được sản phẩm
6. Redirect `/products/{id}/edit` kèm wizard onboarding "Step 1/3"; trạng thái wizard ghi qua `PUT /api/user/guide-config`
7. Khối "Advanced options" luôn disabled trên form New; nội dung Advanced options được nạp từ dữ liệu import sản phẩm từ nhà in về, phục vụ fulfillment theo yêu cầu riêng của từng nhà in (business decision, app TeeInBlue không phụ trách phần này) — biến UI thực sự quyết định enable/disable vẫn chưa tách được (fulfillment_id/is_imported/catalog ID/đang được campaign dùng)

**Coverage:** portal (empty-baseline/title-empty/title-whitespace/full-form) ✅ · api (422 title rỗng, 201 full payload, HTML/XSS injection) ✅ · advanced-options-enable-condition ❌ · title boundary rất dài ❌ · non-owner ❌
**Confidence:** MEDIUM
**Risks:**
- 422 khi title rỗng chỉ hiện toast, không có inline field error/highlight — dễ bị bỏ sót khi kiểm UI/accessibility
- Multiselect Fulfillment provider không thể bỏ chọn nhầm từ form New
- Biến UI quyết định enable "Advanced options" chưa rõ — rủi ro viết test case sai giả định (nội dung/mục đích của Advanced options thì đã rõ, chỉ còn thiếu biến enable)
- Title/Label chấp nhận HTML thô, escape không nhất quán giữa 2 vị trí hiển thị trên list — cần security review, xem OQ-009
- Giá trị biên Product title rất dài chưa thử — rủi ro lưu sai/overflow

---

## Sửa Thông tin Cơ bản (`product-base-identity`)
**Goal:** Xem và cập nhật thông tin cơ bản (title/label/tags/fulfillment/description/thumbnail) của 1 product base đã tồn tại.
**Entry points:** `/products/{id}/edit`

**Capabilities:**
1. Thumbnail (optional, chỉ ở trang edit, không có ở form New) — chấp nhận ảnh 50x50 đến 2000x2000px (bao gồm 2 đầu); ảnh ngoài khoảng này bị chặn hoàn toàn ở client (2500x2500, không toast) hoặc trả 422 (dưới 50x50); ảnh hợp lệ được server resize thực tế về đúng 250x250px webp qua CDN
2. Nút Save disabled cho tới khi có thay đổi
3. Lưu Basic information — `PUT /api/products/{id}` gửi lại FULL 8 field (full-replace, không phải patch); rule Product title bắt buộc áp dụng giống hệt luồng tạo mới
4. Không có cơ chế bảo vệ nào (optimistic locking/version check) khi 2 phiên cùng sửa đồng thời — đây là quyết định sản phẩm đã được xác nhận (rủi ro last-write-wins được chấp nhận, không phải gap cần fix)

**Coverage:** portal (save-disabled/save-enabled/thumbnail-boundary) ✅ · api (put full-replace, title-required-on-edit, thumbnail 40/50/500/2000/2500px) ✅ · concurrent-edit-2-sessions ❌ (chấp nhận rủi ro, xem risk) · non-owner ❌
**Confidence:** MEDIUM-HIGH
**Risks:**
- Full-replace PUT tạo khả năng mất dữ liệu nếu 2 tab/2 user sửa đồng thời (last-write-wins) — rủi ro đã được xác nhận là chấp nhận được, không cần fix

---

## Định nghĩa & Quản lý Printarea (`printarea-definition`)
**Goal:** Tạo/sửa/xoá các vùng in (printarea) trên 1 product base, để xác định nơi thiết kế/artwork sẽ được đặt khi in sản phẩm.
**Entry points:** `/products/{id}/edit` (section Printareas)

**Capabilities:**
1. Tạo printarea mới (form có sẵn trong DOM, mặc định Fulfilled key='Front', Width/Height=1400)
2. Tooltip giải thích 3 cột: TIB, Fulfilled key, Display name
3. Inline editor + xoá (nút X) + re-order (drag) cho từng ô; role owner có thể sửa Width/Height qua UI, gửi thẳng mutation Hasura generic
4. Cho phép trùng Fulfilled key giữa 2 printarea — không lỗi, không cảnh báo
5. Xoá printarea — `DELETE /api/printareas/{id}` chạy ngay, không dialog xác nhận, không undo. Sau khi xoá, UI gỡ ngay printarea khỏi danh sách và cell "Custom Printareas" liên quan; ở tầng dữ liệu, field flat `variant.printarea_id` luôn là null (kiến trúc không dùng field này), còn liên kết cũ thực sự được giữ lại dưới dạng 1 orphan row trong bảng `variant_printareas` — đã xác nhận vị trí dữ liệu này (KB-096); việc orphan row có tồn tại vĩnh viễn hay không thì chưa xác minh, xem OQ-011
6. Dialog cảnh báo mỗi lần bấm sửa — nội dung là i18n key chưa dịch
7. Đường ghi dữ liệu bất đối xứng: tạo/sửa qua Hasura GraphQL client-side `_set`; xoá qua REST DELETE — khác hoàn toàn với product base (REST cho tất cả)
8. Modal "Logs" của product base ghi các sự kiện Printarea (added/removed/name changed/size changed) — đây là 1 trong 2 hệ thống Activity Log của portal, tách biệt với staff activity log toàn cục ở `/activity-logs` (xem thêm ở `product-base-campaign-link`); độ tin cậy của việc ghi log này không ổn định giữa các lần thử, xem OQ-002/OQ-008

**Coverage:** portal (create-default/duplicate-key/invalid-width-text/delete/width-height-edit) ✅ · api (insert/update-invalid-type/delete-204/orphan-row-location) ✅ · width/height boundary (0/âm/lớn/thập phân) — không cần validate theo quyết định sản phẩm ✅ · Hasura `_set` scope negative/cross-tenant test ❌ (OQ-005) · non-owner ❌
**Confidence:** MEDIUM
**Risks (cụm rủi ro lớn nhất object):**
- **HIGH:** nhập "abc" vào Width → HTTP 200 kèm lỗi Postgres thô trong body ("invalid input syntax for type integer"), UI không báo gì — lộ engine DB và kiểu cột cho user
- **MEDIUM:** audit log printarea ghi nhận "lạc quan" trước/độc lập kết quả mutation thật — thao tác lỗi (Width='abc') không xuất hiện trong Logs, audit log không đáng tin
- **P1 (chưa xác minh):** client ghi thẳng Hasura mutation với `_set` tuỳ ý từ trình duyệt, dùng JWT user thường; phạm vi cột/hàng thực sự được phép sửa (field ẩn, cross-tenant) chưa được verify — xem OQ-005
- **MEDIUM:** xoá không dialog xác nhận/không undo — dễ mất dữ liệu do thao tác nhầm
- **MEDIUM:** cho phép 2 printarea trùng Fulfilled key song song — rủi ro nhà in nhận sai file nếu Fulfilled key dùng để map file
- **MEDIUM:** phạm vi ghi Logs chỉ giới hạn ở Printarea event — audit trail cho các thay đổi khác của product base (variant, basic info, mockup) không đầy đủ, và ngay cả với Printarea cũng có nghi vấn không nhất quán (OQ-002)
- **LOW:** dialog cảnh báo hiện i18n key chưa dịch

---

## Quản lý Variant Catalog (`variant-catalog`)
**Goal:** Quản lý catalog variant (SKU, màu/size, giá, tồn kho) của 1 product base: thêm nhanh variant, cấu hình hiển thị màu/size, gán printarea riêng theo variant, export/import.
**Entry points:** `/products/{id}/edit` (section Variants)

**Capabilities:**
1. Quick-add variant — client chặn submit nếu thiếu field (không gửi request); chỉ báo viền đỏ, không có text message
2. Chặn SKU trùng trong CÙNG 1 product base — pre-check qua `getVariant` trước khi thêm, toast cụ thể khi trùng; phạm vi unique SKU CHỈ trong 1 product base, KHÔNG unique toàn store — đã xác nhận bằng test tạo cùng SKU trên 2 product base khác nhau (cả 2 đều thành công)
3. Modal Display settings — cấu hình `color_display_type`/`size_display_type` + Edit label
4. Toggle "Custom variant's printarea" — thêm cột vào bảng, lưu ngay qua `update_products`, không cần Save riêng. Sau khi bật toggle này, click vào ô "Custom Printareas" của 1 variant mở popup chọn Printarea riêng cho variant đó — đường UI này tồn tại và hoạt động đúng nếu bật đúng toggle trước khi click (một quan sát cũ ghi nhận "không tìm được cách gán" là do thiếu bước bật toggle trước; lý do khác biệt giữa 2 lần quan sát chưa được xác minh dứt điểm, xem OQ-013)
5. Download template / Export variant — dùng chung 1 bộ cột (SKU/Color/Size/Weight/Base Cost/Price/Compare price/Available), thiếu ID và printarea

**Coverage:** portal (empty-all-fields/duplicate-sku/partial-empty/display-settings-view/custom-printarea-toggle-on/custom-printarea-assign) ✅ · api (insert_variants, staff-activity-logs-404, duplicate-sku-cross-product, import excel) ✅ · import csv/xlsx hợp lệ ❌ (OQ-010, trả lỗi server) · delete-selected bulk ❌ · non-owner ❌
**Confidence:** MEDIUM
**Risks:**
- **HIGH:** import 1 file Excel HỢP LỆ (đúng template) trả HTTP 500, chặn hoàn toàn chức năng import hàng loạt — xem OQ-010
- **MEDIUM:** `POST /api/staff-activity-logs/variant` trả 404 ở mọi lần thêm — variant vẫn tạo thành công nhưng Logs không có entry nào cho variant, audit trail thiếu
- **MEDIUM:** Export/Template thiếu cột ID và printarea — vòng export-sửa-import sẽ mất liên kết, rủi ro tạo trùng/lệch dữ liệu khi thao tác hàng loạt
- **LOW:** xử lý giá trị rỗng không nhất quán trong cùng payload (Weight='' vs Compare price=null)
- **LOW:** Modal Display settings hiện toàn bộ radio disabled/không checked dù record đã có giá trị — có thể là bug UI
- Export/Import Excel của grid, "Delete selected" hàng loạt — chưa được khảo sát

---

## Upload & Gán Mockup cho Product Base (`mockup-attachment`)
**Goal:** Upload ảnh mockup mới hoặc chọn từ media library, và gán cho product base/variant để preview sản phẩm.
**Entry points:** `/products/{id}/edit` (section Mockup)

**Capabilities:**
1. Upload mockup mới — luồng 4 bước tách rời: (1) lấy presigned upload URL, (2) PUT thẳng lên CDN (không qua backend teeinblue), (3) đăng ký mockup-layer, (4) gán vào product; không có giới hạn kích thước file ở bước lấy presigned URL (đã xác nhận với file 15MB)
2. Media library modal — chọn ảnh có sẵn, phân trang offset (khác cursor pagination của `/products` chính)
3. Trạng thái "Rendering" sau khi gán — xử lý bất đồng bộ phía server; KHÔNG có cơ chế polling tự động, user phải tự bấm icon Refresh để lấy trạng thái mới nhất
4. Modal "Assign mockups" — 2 cột Select variants/Select mockups + Select all; Save thật chạy mutation GraphQL thật (`update_mockups_many`), gán thành công cho dù product không bật toggle "Custom variant's printarea" — việc gán mockup cho variant hoàn toàn độc lập với Custom Printareas
5. Mockup card có 3 action thật: Edit (mở Mockup Editor full-screen), Duplicate (tạo bản ghi mockup mới), More (dropdown: Add to campaigns / Sync to campaigns / Remove from all campaigns / Delete mockup) — không có nút "Move" riêng biệt, chỉ có drag-handle để kéo-thả đổi vị trí
6. Upload file sai định dạng (vd .txt đổi tên .png) không bị chặn ở client — xem risk SEC-004
7. "Sync to campaigns" trên 1 mockup card có thể bị chặn ở client dù product đang liên kết campaign thật — xem risk MISMATCH-003

**Coverage:** portal (upload-new-file/media-library-view/render-pending/refresh-manual/assign-mockups-save/card-actions) ✅ · api (upload-url-presigned/no-size-limit, mockup-layer-register-assign, assign-mockups-mutation) ✅ · render-complete tự động (không tồn tại, đã xác nhận) ✅ · ngưỡng resize chính xác ❌ (OQ-001) · non-owner ❌
**Confidence:** MEDIUM-HIGH
**Risks:**
- **[SEC-004] MEDIUM:** upload file sai định dạng không bị chặn, kẹt "Rendering" vĩnh viễn không báo lỗi rõ cho user — xem OQ-003
- **CONFLICT chưa giải quyết:** ngưỡng pixel thực sự kích hoạt resize mockup — xem OQ-001, KHÔNG dùng bất kỳ con số cụ thể nào làm oracle
- **MEDIUM:** TTL, scope (bucket/prefix) của presigned upload URL hoàn toàn chưa quan sát được (response bị redact theo policy bảo mật) — không đánh giá được rủi ro rò rỉ/tái sử dụng URL
- **LOW:** bước lấy upload URL dùng `{userId}` = `users.id`, KHÔNG phải `staffs.id` — khác biệt định danh duy nhất trong toàn bộ khảo sát, rủi ro nhầm lẫn nếu có logic phân quyền dựa trên path param
- **[MISMATCH-003] MEDIUM:** "Sync to campaigns" báo mockup không dùng trong campaign nào dù product đã liên kết campaign — xem OQ-004
- Cơ chế thông báo hoàn tất render qua webhook (nếu có, khác refresh thủ công) chưa rõ

---

## Vòng đời Product Base — Archive / Duplicate / Delete (`product-base-lifecycle`)
**Goal:** Quản lý vòng đời của 1 product base: archive/unarchive, nhân bản (duplicate), hoặc xoá hẳn khi không còn dùng.
**Entry points:** `/products` (row menu "...")

**Capabilities:**
1. Archive — `POST /api/products/{id}/archive`, status 0→1, không dialog xác nhận
2. Unarchive — `POST /api/products/{id}/unarchive`, status quay lại giá trị ban đầu; archive rồi unarchive không ảnh hưởng liên kết campaign (`campaign_products`/`need_sync` không đổi) — lần đầu có bằng chứng thật cho endpoint này
3. Duplicate (clone) — deep-copy printarea/variant/mockup/display settings sang bản ghi mới (title += " copy", label/internal_tags giữ nguyên, SKU giữ nguyên); response của `/clone` trả về chính record NGUỒN, không phải bản sao — consumer nào gọi API clone trực tiếp sẽ không lấy được id bản sao từ response
4. Delete — có dialog xác nhận + gọi `deletion-check` trước; DELETE thật qua REST trả 204. Khi product đang được 1 campaign dùng, `deletion-check` trả `policy='blocked'`; đã xác nhận bằng chứng server-side thật (gọi DELETE trực tiếp bypass UI) rằng server THỰC SỰ từ chối (403 Forbidden), không chỉ là gợi ý ẩn nút ở UI
5. DELETE chấp nhận trên Product Base đang ACTIVE (chưa từng archive) — hành vi giống hệt product đã archive, không bắt buộc phải archive trước khi xoá
6. Field `token` trong response `deletion-check` luôn null ở mọi mẫu quan sát — đã xác nhận hiện không ảnh hưởng chức năng, ghi nhận như open issue không cần điều tra thêm ở thời điểm này

**Coverage:** portal (archive-active/duplicate/delete-allowed/delete-blocked-dialog) ✅ · api (post-archive/post-clone/post-unarchive/delete-204/deletion-check-allowed-blocked/delete-bypass-ui-403) ✅ · non-owner ❌
**Confidence:** MEDIUM-HIGH
**Risks:**
- **MEDIUM:** response `/clone` trả về chính record NGUỒN thay vì bản sao — dễ gây lỗi logic cho bất kỳ integration nào gọi API clone trực tiếp ngoài portal
- **MEDIUM:** mức xác nhận trước hành động phá huỷ/nhân bản không nhất quán (archive/duplicate không hỏi, chỉ delete mới hỏi)
- **LOW:** response archive trả full record lộ thêm field chưa thấy ở response khác (variants_position, print_provider_id)

---

## Liên kết Product Base với Campaign & Đồng bộ (`product-base-campaign-link`)
**Goal:** Liên kết 1 product base vào campaign và đồng bộ thay đổi (printarea/variant/mockup) sang campaign đang dùng nó, qua nút "Update campaign".
**Entry points:** `/products/{id}/edit` (khi imported + có provider + đang được campaign dùng) · `/campaigns/{id}/edit` (khối "Available Products") · `/campaigns/new` (không có bước chọn product base) · modal "Select your product"

**Capabilities:**
1. Control "Update campaign" (icon rocket) — chỉ hiện trên product base đang được campaign dùng, nguồn dữ liệu là `campaign_products/need_sync` (chỉ đọc). Bấm vào mở modal "Campaigns that use this product": liệt kê campaign đang dùng product (ID/NAME/UPDATED/STATUS/LOGS, có checkbox), cộng 1 nút "Update" riêng ở góc trên. Hành vi chính là LIỆT KÊ để người dùng tự mở campaign — mục đích KHÔNG phải tự động đẩy thay đổi product base vào campaign, mà là "cập nhật campaign ngoài SDK". Hành vi thật khi bấm nút "Update" (push-update hay chỉ điều hướng) chưa có bằng chứng — xem OQ-012
2. Khối "Available Products" trên campaign editor — liệt kê, drag re-order, nút "Add more product". Thêm Product Base vào campaign có sẵn qua modal "Select your product": click vào 1 card là áp dụng ngay (mutation chạy ngay khi click, không cần nút Save riêng); `campaign_products` là một mảng, có thể chứa nhiều product base
3. Modal "Select your product" — filter Search/Internal name/Internal tags hoạt động đúng, độc lập, giống cơ chế filter chip trên `/products` chính; KHÔNG lọc bỏ product base "chưa sẵn sàng" (thiếu fulfillment/mockup/printarea/variant) — cả 2 loại đều chọn được
4. Cảnh báo mềm khi sửa product base đang được campaign dùng — banner "UPDATE CAMPAIGNS AFTER ANY CHANGES" + dialog i18n chưa dịch, KHÔNG chặn việc sửa ở UI
5. Không có liên kết trực tiếp product base ↔ artwork — artwork chỉ xuất hiện trong ngữ cảnh campaign editor
6. Portal có 2 hệ thống Activity Log tách biệt: staff activity log toàn cục ở `/activity-logs`, và log riêng theo từng object (vd link "Logs" trên trang edit của product base, scope theo các loại Printarea event) — đã xác nhận hệ thống log riêng theo object có tồn tại và có thể ghi nhận được. Tuy nhiên trong 1 lần kiểm thử, cả 3 loại cập nhật thật (Internal tags/Printarea/Variant) đều cho Activity Log rỗng hoàn toàn, và độ tin cậy của việc ghi log Printarea cụ thể không nhất quán giữa các lần thử — xem OQ-002/OQ-008

**Coverage:** portal (button-visible/available-products-view/select-product-modal-view/add-product-click) ✅ · api (campaign_products-need_sync đọc, insert_campaign_products, activity-log-per-update-type) ✅ · update-campaign push-button click-execute ❌ (OQ-012) · non-owner ❌
**Confidence:** LOW-MEDIUM (yếu nhất trong 8 feature — hầu như không có bằng chứng cho hành động "Update campaign" thật sự đẩy thay đổi đi đâu)
**Risks:**
- **HIGH:** toàn bộ hành vi ghi thực tế khi bấm nút "Update" trong modal Update campaign chưa có bằng chứng nào — xem OQ-012
- **MEDIUM:** modal "Select your product" không lọc bỏ product base chưa sẵn sàng — rủi ro gán nhầm sản phẩm chưa hoàn thiện vào campaign, phát hiện lỗi khi publish
- **MEDIUM:** cảnh báo đồng bộ chỉ ở mức mềm, không có cơ chế bắt buộc — rủi ro user quên đồng bộ, campaign live hiển thị sai printarea/variant
- **MEDIUM:** độ tin cậy của Activity Log object-level không ổn định — xem OQ-002/OQ-008
