# Object: Asset Category (product: teeinblue) — Feature Profile Summary

- **Workflow / context run:** `CTX-20260910-06` (kb_version 1), env: staging — trải qua 4 round rework (round 1-2 REJECTED do act_id collision Clipart/Vector; round 3 REJECTED do 2 finding mới F-004/F-005; round 4 mới `APPROVED_WITH_CONDITIONS`)
- **Mode:** product-kb-from-observation (tương đương ZERO_DOC_BOOTSTRAP) — toàn bộ profile là OBSERVED_CURRENT/INFERRED, **chưa có CONFIRMED_EXPECTED nào** (confirmation_source=null cho mọi KB item)
- **Actor test trong toàn bộ run:** duy nhất role `owner` (Linh explorer, sub=273), 1 organization/store, 0/16 operation có sample lỗi (4xx/5xx)
- **4/4 feature có profile**, nhưng 1 trong 4 (FEAT-01) **không phải feature user-facing thông thường** — xem ghi chú riêng bên dưới.

---

## FEAT-01 — Route/Entity Clarification (Additional Options vs Global Options)
**Đây KHÔNG phải 1 tính năng user-facing độc lập** — đây là 1 finding làm rõ ranh giới giữa 2 route/entity dễ bị nhầm lẫn trong tên gọi, được tách thành "feature profile" riêng để tránh downstream (checklist/test) test nhầm đối tượng.

**Goal:** Phân biệt đúng `/additional-options` (1 trong 6 loại AssetCategory — category chứa nhiều lựa chọn, thuộc phạm vi CRUD của FEAT-02) với `/global-options` (Global Option **instance** — cấu hình layer tái sử dụng qua nhiều artwork, hoàn toàn khác khái niệm "category" asset).
**Entry points:** `/additional-options` · `/global-options` (cả 2 dưới sidebar "Assets", 8 mục con)

**Capabilities:**
- Xem danh sách category dạng Additional Option (dùng chung REST `/api/clipart-categories` như 5 route category khác)
- Xem danh sách Global Option instance (tải qua GraphQL, có filter category/Search/Type, 9 row có sẵn)
- Mở modal "Select a layer type" khi tạo Global Option mới (29 layer type / 7 nhóm; "Additional Option" chỉ là 1 lựa chọn trong nhóm Form Elements)
- Điều hướng sidebar Assets (8 mục con)

**Coverage:** portal (phân biệt 2 route, cấu trúc sidebar) ✅ · api (list Global Option instance qua GraphQL) ✅ · CRUD Global Option instance thật ❌ (chỉ mở/đóng modal, chưa tạo instance nào) · cross-role ❌
**Confidence:** LOW (KB-001, KB-002 đều observed_count=1)
**Risks/Unknowns:**
- Quan hệ chính xác giữa field "Category" (mặc định Uncategorized) của Global Option instance và category-object ở `/additional-options` — chỉ phân biệt ở mức UI, chưa verify qua API schema/DB
- CRUD thật của Global Option instance (29 layer type) — hoàn toàn chưa quan sát
- Cross-role có thấy 2 route giống nhau không — chưa test

**Gate:** CONDITIONAL_PASS (không nâng KB-001/KB-002 lên CONFIRMED_EXPECTED; không dùng quan hệ "Category" field làm oracle)

---

## FEAT-02 — Quản lý Category tài sản (CRUD)
**Goal:** Tạo, sửa, nhân bản, xoá 1 category dùng để nhóm item asset (Clipart/Vector/Color/Additional Option/Map Style/Font) trước khi thêm item con.
**Entry points:** `/cliparts` · `/vectors` · `/color-categories` · `/additional-options` · `/map-styles` · `/font-categories`

**Capabilities:**
1. Tạo category mới — `POST /api/clipart-categories` dùng chung 1 endpoint cho 6 loại, phân biệt bằng field `type` (mỗi loại 1 chuỗi riêng, KHÔNG theo quy tắc hậu tố `_category` thống nhất)
2. Field form "New category" khác nhau theo loại — **chỉ Clipart** được re-verify (Name, Thumbnail optional, Parent Category, Preview/Thumbnail size, Custom class, Display options)
3. Giá trị mặc định `display_type` khi không đổi Display option (`image` cho Clipart/Vector, `radio` cho Additional Option/Map Style/Font)
4. Sửa category (PUT, đổi tên)
5. Nhân bản category (clone) — đặt tên `<gốc> copy`, deep-copy item con
6. Xoá category (DELETE, trả 204) — cả 2 sample đều là xoá category **clone** (không phải gốc)
7. Action buttons trên sidebar tree category detail — **UNVERIFIED** (evidence gốc khi đọc lại hoá ra là ảnh form edit, không phải sidebar tree)

**Coverage theo loại category (layer api):**

| Loại | Create | Edit | Clone | Delete |
|---|---|---|---|---|
| Clipart | ✅ | ✅ | ✅ | ✅ |
| Vector | ✅ | ❌ | ✅ | ❌ |
| Color | ❌ (chỉ DOM, thiếu network capture) | ❌ (chỉ DOM) | ✅ | ✅ |
| Additional Option | ✅ | ❌ | ❌ | ❌ |
| Map Style | ✅ | ❌ | ❌ | ❌ |
| Font Category | ✅ | ✅ | ❌ | ❌ |

Portal layer: form field mapping ✅ chỉ Clipart, ❌ 5 loại còn lại · sidebar tree action buttons ❌ (UNVERIFIED) · cross-role CRUD ❌

**Confidence:** MEDIUM
**Risks/Unknowns:**
- **CONF-001** (MIS-001): response tạo/clone Clipart trả `type='clipart'` (mất hậu tố `_category`) trong khi request gửi `clipart_category`; finding gốc đã bị api-explorer RETRACT (evidence không hợp lệ) nhưng vẫn giữ **UNRESOLVED** theo policy — không tự đóng
- STALE-003: KB cũ không cảnh báo response có thể trả `type` khác request — cần thêm sample trước khi sửa KB
- Validation message khi Name rỗng/trùng — 0/16 operation có sample lỗi
- Xoá category có item con/sub-category con thật (không phải clone rỗng) — chưa test
- KB-019 (soft-delete item con qua filter `deleted_at`) — chỉ là INFERRED, chưa test hành động xoá item trực tiếp
- Edit/Clone/Delete cho Additional Option, Map Style, Font Category — phần lớn chưa có sample

**Gate:** CONDITIONAL_PASS (không nâng KB-003..010, KB-019 lên CONFIRMED_EXPECTED; CONF-001 do context-quality-reviewer quyết định, không tự đóng; KB-008/KB-010 KHÔNG được dùng làm oracle cho 5 loại còn lại / hành vi sidebar tree)

---

## FEAT-03 — Thêm item vào Category tài sản
**Goal:** Thêm 1 item cụ thể (màu/lựa chọn/kiểu bản đồ/ảnh clipart/vector/font) vào category đã tồn tại, qua 2 cơ chế: nhập nhanh tại chỗ (Color/Additional Option/Map Style) hoặc upload file thật qua dropzone (Clipart/Vector); Font dùng cơ chế khác (chọn từ danh sách có sẵn).
**Entry points:** `/color-categories?id=` · `/additional-options?id=` · `/map-styles?id=` · `/font-categories?id=` · `/cliparts?id=` · `/vectors?id=`

**Capabilities:**
1. Thêm item nhanh qua nút "Add new" (Color/Additional Option/Map Style) — nút disabled khi input liền kề rỗng, enable khi điền giá trị; gọi GraphQL mutation `insert_cliparts` trực tiếp tới `/v1/graphql`. Verified nhất quán ở **6/6 sample** (3 category cũ + 3 category mới tạo trong run)
2. Thêm Font qua chọn từ danh sách có sẵn — **CHƯA re-verify** trong run này (evidence gốc bị loại trừ, không có act thay thế; nguồn duy nhất là KB cũ từ lần explore trước)
3. Ghi log hoạt động staff (`POST /api/staff-activity-logs/clipart`) ngay sau khi thêm item — xác nhận ở 4/6 sample; 2/3 category mới (Color, Additional Option) **không có entry log này trong network evidence** — gap thật, chưa rõ nguyên nhân
4. Upload clipart item thật (PNG) qua dropzone — luồng 3 bước (presigned URL → PUT storage → complete)
5. Upload vector item thật (SVG) qua dropzone — 1 bước multipart

**Coverage:** Color/Additional Option/Map Style quick-add ✅ (6/6, cả 2 nhóm category cũ+mới) · Security surface `insert_cliparts` (GraphQL table-level mutation) ✅ chỉ positive path · Font full flow ❌ (chưa re-verify) · Clipart upload (PNG) ✅ · Vector upload (SVG) ✅ · error/negative path (input/file không hợp lệ) ❌ · cross-tenant insert (category không thuộc store) ❌
**Confidence:** MEDIUM
**Risks/Unknowns:**
- **CONF-003 / STALE-001 (HIGH, chưa đóng):** open-issue "nút Add new disabled vĩnh viễn" từng ghi nhận trên category CŨ 6008/6009/6010 (nghi blocker). Run này test lại thành công 6/6 trên category **khác** (6012-6014 cũ + 6021-6023 mới) — nhưng KHÔNG test lại đúng category gốc phát hiện bug (6008/6009/6010, đang bị forbidden trong run) nên **không loại trừ hoàn toàn** khả năng bug thật vẫn còn trên dữ liệu cũ
- Security: `insert_cliparts` là Hasura GraphQL table-level mutation gọi thẳng từ client bằng JWT portal thường, tự build `variables.objects` — chưa có sample negative/cross-tenant (insert vào category không thuộc store mình)
- Security: presigned storage URL (PUT tới CDN) tách rời JWT app, path chứa `user_id` dạng rõ; thời hạn hiệu lực chữ ký không quan sát được (query string bị redact)
- Luồng upload file sai định dạng/quá dung lượng — 0/16 operation có sample lỗi
- Flow hoàn tất thêm Font thật (endpoint/mutation nào được gọi) — chưa biết

**Gate:** CONDITIONAL_PASS (không nâng KB-011..018 lên CONFIRMED_EXPECTED; CONF-003 giữ UNRESOLVED — cần re-test trực tiếp trên 6008/6009/6010 hoặc quyết định chính thức từ orchestrator trước khi đóng; 2 security risk đưa vào checklist như hạng mục cần theo dõi, không kết luận an toàn hay không)

---

## FEAT-04 — Bulk-upload zip clipart
**Goal:** Nạp nhiều clipart cùng lúc bằng 1 file zip; hệ thống tự tạo 1 category mới theo tên top-level folder và enqueue từng item bên trong.
**Entry points:** `/cliparts/bulk-upload`

**Capabilities:**
1. Upload file zip và theo dõi job — luồng 5 bước (list job → xin presigned URL → PUT binary → complete → poll status)
2. Tự tạo category theo tên folder trong zip — job tạo 1 category mới chứa toàn bộ item, log "N/5 Success enqueue"

**Coverage:** upload zip hợp lệ, end-to-end thành công ✅ · upload zip vượt giới hạn dung lượng/số file (error path) ❌ · job status Error/Processing ❌ · presigned storage URL cho luồng zip ✅
**Confidence:** LOW (observed_count=1, chỉ 1 sample end-to-end)
**Risks/Unknowns:**
- **CONF-002 / STALE-002:** giới hạn dung lượng/số file mâu thuẫn — KB cũ ghi "512MB/zip, tối đa 2 file", banner UI hiện tại (run này) ghi "2GB/zip, tối đa 10 file". Cả 2 đều là TEXT UI/KB, chưa verify qua API error response — UNRESOLVED
- Security: PUT binary gửi thẳng tới CDN bằng presigned URL (đã redact) thay vì JWT app; path chứa user_id đọc được dạng rõ
- Trạng thái job "Error"/"Processing" qua API — chưa quan sát (chỉ có 1 sample "Done" ngay lần GET đầu)
- Hành vi khi zip có cấu trúc folder khác (nhiều folder con, tên trùng category cũ) — chỉ test 1 zip 1 folder

**Gate:** CONDITIONAL_PASS (không nâng KB-016/018 lên CONFIRMED_EXPECTED; CONF-002 giữ UNRESOLVED — không tự chọn giá trị giới hạn đúng; 1 sample duy nhất không dùng làm oracle cho error path/cấu trúc zip khác)

---

## Gaps ở cấp Object (áp dụng cho MỌI feature trên)

| Gap | Ghi chú |
|---|---|
| **Data layer (DB)** | Không có db-explorer riêng cho object này trong run — mọi state_delta chỉ dựa trên response API/GraphQL/DOM, chưa xác nhận qua DB thật |
| **Confirmation status** | 0 KB item nào có `confirmation_source` — toàn bộ 19 KB (KB-001..KB-019) là OBSERVED_CURRENT hoặc INFERRED, **không được đối xử như business rule đã confirm** |
| **Error/negative path** | 0/16 operation trong toàn run có sample lỗi (4xx/5xx) — validation server-side (tên rỗng/trùng, file sai định dạng, vượt giới hạn zip) hoàn toàn chưa biết |
| **3 conflict chưa đóng** | CONF-001 (type suffix mismatch Clipart, RETRACTED evidence nhưng vẫn UNRESOLVED), CONF-002 (giới hạn dung lượng/số file bulk-upload), CONF-003/STALE-001 (bug "Add new disabled" trên category cũ 6008/6009/6010, **HIGH severity, chưa đóng vì chưa test lại đúng category gốc phát hiện bug**) — không cái nào được tự ý resolve bởi feature-profile-builder |
| **Cross-role / cross-tenant** | Thiếu hoàn toàn trên cả 4 feature (thiếu credential user thứ 2 trong run) — đặc biệt đáng chú ý ở FEAT-03 vì `insert_cliparts` là Hasura mutation gọi thẳng từ client, chưa có sample kiểm tra chặn insert vào category không thuộc store |
| **KB-008/KB-010/KB-012 bị hạ phạm vi ở round 3** | Form field 5/6 loại category (KB-008), sidebar tree action buttons (KB-010, hoá ra evidence là ảnh khác), Font "Add new" control-group behavior (KB-012) — cả 3 đều bị đánh dấu unverified/UNVERIFIED sau khi đọc lại evidence gốc không hợp lệ, KHÔNG ngang hàng với các KB đã network/DOM-verified đầy đủ |
| **Lịch sử rework đáng chú ý** | Run trải qua 4 round review: round 1-2 REJECTED do act_id collision giữa Clipart/Vector lan sang 13 KB item + 3 profile + 3 checklist (F-001/F-002/F-003); round 3 REJECTED tiếp vì phát hiện 3 act có evidence thật nhưng bị bỏ sót 3 round liền (F-004) và CONF-003 tự mâu thuẫn với KB-011 (F-005). Đây là dấu hiệu QA nên đọc kỹ số liệu observed_count/act_id trước khi tin, không giả định "coverage đã claim = coverage thật" |
| **Global Option instance (FEAT-01 phạm vi mở rộng)** | Nằm ngoài phạm vi chính thức của AssetCategory — chỉ mở/đóng modal chọn layer type, chưa tạo instance thật nào |

**Review độc lập:** context-quality-reviewer → verdict `APPROVED_WITH_CONDITIONS` (round 4/4, `publish_allowed=true`). 2 điều kiện publish còn treo: (1) CONF-003/STALE-001 vẫn UNRESOLVED, cần quyết định chính sách có cho re-test trực tiếp category 6008/6009/6010 hay không; (2) gap log hoạt động staff thiếu ở 2/3 category mới (KB-013) được mang forward như giới hạn coverage đã biết, không phải defect cần fix trước publish.
