# Object: Asset Category (product: teeinblue) — Feature Summary

Trạng thái hiện tại của object `asset-category`: 6 loại category asset (Clipart, Vector, Color, Additional Option, Map Style, Font Category) + luồng thêm item vào category + luồng bulk-upload zip.

- **Environment:** staging. **Role đã test:** duy nhất `owner` ("Linh explorer" — định danh `sub=273` trong nội dung cũ; hạ tầng hiện dùng Sanctum cookie+XSRF, verify bằng `GET /api/user` → id=266). 1 organization/store duy nhất.
- **4 feature có profile + checklist:** `asset-category-route-entity-clarification`, `asset-category-crud`, `asset-category-item-management`, `asset-category-bulk-upload`. Feature đầu tiên KHÔNG phải tính năng user-facing (xem ghi chú riêng).
- **KB:** 41 item. 5 item dùng chung toàn object nằm ở `kb.json`; phần còn lại nằm trong `features/<feature-key>/kb.json`.
- **Knowledge kind:** phần lớn `OBSERVED_CURRENT`; 6 item `CONFIRMED_EXPECTED` (KB-020, KB-022, KB-023, KB-026, KB-027, KB-033 — đều có PO xác nhận trực tiếp nội dung, ghi rõ trong statement); 1 item `INFERRED` (KB-019); 2 item `PROPOSED` là phía kỳ vọng của 2 conflict chưa ngã ngũ (KB-038, KB-040).
- **Conflict chưa ngã ngũ:** 2 nhóm — `CFL-001` (khung diễn giải naming convention field `type`) và `CFL-002` (kỳ vọng `vector_category` vs giá trị thật `vector`). Xem `open-questions.md` (OQ-asset-category-006/007).
- **Open question:** 29 mục trong `open-questions.md` (16 NEEDS_CONFIRMATION, 2 CONFLICT, 11 OPEN_ISSUE).

---

## KB dùng chung toàn object (`kb.json`)

| KB | Nội dung | Kind / Confidence |
|---|---|---|
| KB-018 | Presigned storage URL (PUT thẳng tới DigitalOcean Spaces bằng URL có chữ ký, không dùng JWT app) — dùng chung bởi upload item và bulk-upload | OBSERVED_CURRENT / MEDIUM |
| KB-028 | TTL presigned URL: 300s (item đơn lẻ) vs 600s (bulk zip); `X-Amz-SignedHeaders=host` nên scope ký chỉ ràng buộc Host | OBSERVED_CURRENT / MEDIUM |
| KB-035 | Rate-limit `user_rate_limiter:clipart` trên `POST /api/cliparts/svg` — limit=4000 | OBSERVED_CURRENT / MEDIUM |
| KB-036 | Rate-limit `user_rate_limiter:clipart_category` trên `POST /api/clipart-categories` — limit=1000 | OBSERVED_CURRENT / MEDIUM |
| KB-037 | `POST /api/users/{user_id}/temporary-files/upload-url` không có rate-limit middleware riêng (mẫu nhỏ 3 request) | OBSERVED_CURRENT / MEDIUM |

---

## FEAT-01 — `asset-category-route-entity-clarification` (Route/Entity Clarification)

**Không phải 1 tính năng user-facing** — đây là finding làm rõ ranh giới giữa 2 route/entity dễ nhầm tên, tách thành profile riêng để downstream (checklist/test) không test nhầm đối tượng.

> **Global Option đã tách thành object KB riêng:** `knowledge/products/teeinblue/objects/global-option/` (7 nhóm / 30 leaf layer type, CRUD instance thật, business rule share-value). Object `asset-category` chỉ giữ phần phân biệt route; KHÔNG còn là nơi cập nhật thông tin Global Option.

**Goal:** Phân biệt `/additional-options` (1 trong 6 loại AssetCategory, thuộc phạm vi CRUD của FEAT-02) với `/global-options` (Global Option **instance** — cấu hình layer tái sử dụng qua nhiều artwork).
**Entry points:** `/additional-options` · `/global-options` (cả 2 dưới sidebar "Assets", 8 mục con).

**Capabilities:**
- Xem danh sách category dạng Additional Option (dùng chung REST `/api/clipart-categories` như 5 route category khác)
- Xem danh sách Global Option instance (tải qua GraphQL `POST /v1/graphql`, có filter category/Search/Type)
- Mở modal "Select a layer type" khi tạo Global Option mới (29 layer type / 7 nhóm; "Additional Option" chỉ là 1 lựa chọn trong nhóm Form Elements)
- Điều hướng sidebar Assets (8 mục con)

**Coverage:** portal (phân biệt 2 route, cấu trúc sidebar) ✅ · api (list Global Option instance qua GraphQL) ✅ · CRUD Global Option instance thật ❌ · cross-role ❌
**Confidence:** LOW (KB-001, KB-002 mỗi item 1 sample, chỉ ở mức UI/route)
**Last updated:** 2026-09-10
**Risks / Unknowns:** OQ-asset-category-004 (CRUD Global Option instance chưa từng thực hiện) · OQ-asset-category-005 (quan hệ field "Category" của instance vs category-object) · OQ-asset-category-002 (cross-role)

---

## FEAT-02 — `asset-category-crud` (Quản lý category tài sản)

**Goal:** Tạo, sửa, nhân bản, xoá 1 category dùng để nhóm item asset (Clipart/Vector/Color/Additional Option/Map Style/Font) trước khi thêm item con.
**Entry points:** `/cliparts` · `/vectors` · `/color-categories` · `/additional-options` · `/map-styles` · `/font-categories`

**Capabilities:**
1. Tạo category mới — `POST /api/clipart-categories` dùng chung cho 6 loại, phân biệt bằng field `type`; mỗi loại 1 chuỗi riêng, KHÔNG theo quy tắc hậu tố `_category` thống nhất (KB-003). Endpoint chịu rate-limit `user_rate_limiter:clipart_category`, limit=1000 (KB-036).
2. Field form "New category"/"Edit category" khác nhau theo loại — **chỉ Clipart** được xác nhận (KB-008).
3. Giá trị mặc định `display_type`: `image` cho Clipart/Vector, `radio` cho Additional Option/Map Style/Font (KB-009).
4. Sửa category — `PUT /api/clipart-categories/{id}`, 200; `type` không có trong body PUT nên không đổi được qua PUT (KB-004, KB-030).
5. Nhân bản category — `POST /api/clipart-categories/{id}/clone`, 201, tên `<gốc> copy`, deep-copy item con; Clone giữ nguyên `type` của bản gốc (KB-005, KB-006, KB-030, KB-039).
6. Xoá category — `DELETE /api/clipart-categories/{id}`, 204; không bị chặn và không cascade lỗi kể cả khi category có item con thật (KB-007, KB-024, KB-030).
7. Validate Name: rỗng → 422 `The name field is required.`; TRÙNG tên category đã tồn tại → 201, không chặn (KB-029).
8. Action buttons trên sidebar tree category detail — **UNVERIFIED** (KB-010).

**Coverage theo loại category (layer api):**

| Loại | Create | Edit | Clone | Delete |
|---|---|---|---|---|
| Clipart | ✅ | ✅ | ✅ | ✅ (kể cả có item con thật) |
| Vector | ✅ | ❌ | ✅ | ❌ |
| Color | ❌ (chỉ DOM, thiếu network capture) | ❌ (chỉ DOM) | ✅ | ✅ |
| Additional Option | ✅ | ✅ | ✅ | ✅ |
| Map Style | ✅ | ✅ | ✅ | ✅ |
| Font Category | ✅ | ✅ | ✅ | ✅ (kể cả có item con thật) |

Portal layer: form field mapping ✅ chỉ Clipart, ❌ 5 loại còn lại · sidebar tree action buttons ❌ (UNVERIFIED) · cross-role CRUD ❌
**Confidence:** MEDIUM
**Last updated:** 2026-09-26 (nội dung CRUD/naming-convention/validate Name: 2026-09-15; rate-limit endpoint tạo category: 2026-09-26)
**Risks / Unknowns:** OQ-asset-category-006 (CONFLICT naming convention `type`, severity MEDIUM) · OQ-asset-category-007 (CONFLICT kỳ vọng `vector_category`) · OQ-asset-category-008 (range Preview/Thumbnail size) · OQ-asset-category-009 (sidebar tree UNVERIFIED) · OQ-asset-category-010 (cho phép tên trùng) · OQ-asset-category-011 (window/remaining của rate-limit) · OQ-asset-category-012 (form field 5 loại còn lại) · OQ-asset-category-013 (soft-delete chỉ INFERRED)

---

## FEAT-03 — `asset-category-item-management` (Thêm item vào category)

**Goal:** Thêm 1 item cụ thể (màu / lựa chọn / kiểu bản đồ / ảnh clipart / vector / font) vào category đã tồn tại, qua 3 cơ chế: nhập nhanh tại chỗ (Color/Additional Option/Map Style), upload file thật qua dropzone (Clipart/Vector), hoặc chọn từ danh sách có sẵn rồi copy (Font).
**Entry points:** `/color-categories?id=` · `/additional-options?id=` · `/map-styles?id=` · `/font-categories?id=` · `/cliparts?id=` · `/vectors?id=`

**Capabilities:**
1. Quick-add item qua nút "Add new" (Color/Additional Option/Map Style) — nút disabled khi input liền kề rỗng (client-side thuần, không gửi request nào khi gõ), enable khi đã điền rồi bấm mới gọi GraphQL mutation `insert_cliparts` tới `/v1/graphql` (KB-011, KB-023 — 9/9 sample nhất quán, PO xác nhận là thiết kế chứ không phải bug).
2. Thêm Font có sẵn vào Font category — modal "Select a font" → `POST /api/cliparts/font` (201); server COPY file font gốc sang storage riêng của category rồi tạo 1 record 'clipart' đại diện (KB-031). Nút "Add new" ở Font không gate theo input tại chỗ (KB-012, confidence LOW).
3. Ghi log hoạt động staff (`POST /api/staff-activity-logs/clipart`) ngay sau khi thêm item — không xuất hiện ở mọi sample (KB-013).
4. Upload clipart item thật (PNG) qua dropzone — luồng 3 bước: presigned URL → PUT storage → `POST /api/cliparts/by-temporary-file` (KB-014). Ảnh vượt 64 megapixel chỉ hiện warning, KHÔNG bị chặn (KB-033).
5. Upload vector item thật (SVG) qua dropzone — 1 bước `POST /api/cliparts/svg` multipart (KB-015); route chịu rate-limit `user_rate_limiter:clipart`, limit=4000 (KB-035).
6. Negative đã quan sát: Vector nhận `.png` → 500 kèm stack trace + UI `[object Object]` (KB-032, known defect); Clipart nhận `.txt` → vẫn cấp presigned URL 201, bước sau chưa capture (KB-034).

**Coverage:** quick-add Color/Additional Option/Map Style ✅ (9/9 sample) · Font full flow ✅ (1 sample) · Clipart upload PNG ✅ · Vector upload SVG ✅ (chỉ 1 sample cũ, chưa có sample thành công gần đây) · negative sai định dạng ✅ (2 sample, 1 là defect) · rate-limit ⚠️ PARTIAL (chỉ giá trị limit) · cross-tenant insert ❌ · insert thất bại (staff log) ❌
**Confidence:** MEDIUM
**Last updated:** 2026-09-26 (nội dung Add-new/Font/upload/negative: 2026-09-15; rate-limit 2 route upload: 2026-09-26)
**Risks / Unknowns:**
- Security: `insert_cliparts` là Hasura GraphQL table-level mutation gọi thẳng từ client bằng session portal thường, tự build `variables.objects` — chưa có sample cross-tenant (OQ-asset-category-017, severity MEDIUM)
- Security: presigned storage URL tách rời JWT app, scope ký chỉ ràng buộc Host, chưa có negative test TTL (OQ-asset-category-018, severity MEDIUM)
- Defect chờ triage: 500 lộ stack trace + UI `[object Object]` khi sai định dạng Vector (OQ-asset-category-020)
- OQ-asset-category-014 (cơ chế Add new của Font chưa re-verify độc lập) · OQ-asset-category-015 (staff log khi insert lỗi) · OQ-asset-category-016 (Clipart `.txt` bước sau) · OQ-asset-category-019 (Map Style cần field cấu hình nào) · OQ-asset-category-021 (chưa có sample `.svg` thành công) · OQ-asset-category-022 (staff log thiếu ở 2/3 category mới) · OQ-asset-category-023 (chưa re-test 3 category gốc 6008/6009/6010)

---

## FEAT-04 — `asset-category-bulk-upload` (Bulk-upload zip clipart)

**Goal:** Nạp nhiều clipart cùng lúc bằng 1 file zip; hệ thống tự tạo 1 category mới theo tên top-level folder và enqueue từng item bên trong.
**Entry points:** `/cliparts/bulk-upload`

**Capabilities:**
1. Upload zip và theo dõi job — luồng 5 bước: GET list job → `POST .../start` (presigned URL, TTL 600s) → PUT binary → `POST .../complete` → GET poll status (KB-016, KB-028).
2. Tự tạo category theo tên folder trong zip, log dạng "N/5 Success enqueue" (KB-016).
3. Giới hạn theo plan — banner tĩnh phía client cho plan Blue: "Limit max 2GB per zip and can only process max 10 files at a time." (KB-022, PO xác nhận giới hạn tuỳ plan).
4. Negative/error path: file không phải zip (`.txt`) → 422 `The selected mimetype is invalid.`, không tạo job (KB-025); zip hợp lệ nhưng không chứa ảnh → job kết thúc `Error`, `clipart_category_id=null`, không tạo category rỗng (KB-026).
5. Status job: Uploading / Extracting / delayed / Done / Error — chỉ Extracting và Error có network evidence trực tiếp (KB-027).

**Coverage:** upload zip hợp lệ end-to-end ✅ (1 sample) · file sai mimetype ✅ · zip không chứa ảnh ✅ · presigned URL cho luồng zip ✅ · vượt giới hạn dung lượng/số file ❌ · cấu trúc folder khác/tên trùng ❌ · cross-role/cross-tenant ❌
**Confidence:** LOW→MEDIUM (mỗi nhánh 1 sample)
**Last updated:** 2026-09-15
**Risks / Unknowns:** OQ-asset-category-024 (test biên tại ngưỡng) · OQ-asset-category-025 (cấu trúc folder khác/tên trùng) · OQ-asset-category-026 (negative test presigned TTL 600s, severity MEDIUM) · OQ-asset-category-027 (server có enforce 2GB/10 file hay không; plan khác chưa verify) · OQ-asset-category-028 (3/5 status chưa network-verified) · OQ-asset-category-029 (định dạng sai khác ngoài `.txt`)

---

## Gaps ở cấp object (áp dụng cho MỌI feature trên)

| Gap | Ghi chú | OQ |
|---|---|---|
| **Data layer (DB)** | Không có verification ở tầng DB cho object này — mọi state delta chỉ dựa trên response API/GraphQL/DOM | OQ-asset-category-001 |
| **Cross-role / cross-tenant** | Thiếu hoàn toàn trên cả 4 feature (chỉ 1 account khả dụng); dimension PERMISSION bị exclude ở cả 4 checklist. Đáng chú ý nhất ở FEAT-03 vì `insert_cliparts` gọi thẳng Hasura từ client | OQ-asset-category-002, OQ-asset-category-017 |
| **Rate-limit window** | Chỉ verify giá trị limit qua header; window reset 24h và việc dùng chung counter giữa 6 loại category chưa verify runtime | OQ-asset-category-003, OQ-asset-category-011, OQ-asset-category-021 |
| **Confirmation status** | Chỉ 6/41 KB item có nguồn thẩm quyền (PO xác nhận nội dung). Các item `OBSERVED_CURRENT` còn lại KHÔNG được đối xử như business rule đã confirm — nhiều PO-answer chỉ là uỷ quyền THỰC THI test, không phải xác nhận hành vi đúng | — |
| **2 conflict chưa ngã ngũ** | `CFL-001` (khung diễn giải naming convention field `type`), `CFL-002` (kỳ vọng `vector_category` vs giá trị thật `vector`) — giữ cả 2 phía, không tự chọn | OQ-asset-category-006, OQ-asset-category-007 |
| **KB bị hạ phạm vi** | KB-008 (form field: chỉ còn đúng cho Clipart), KB-010 (sidebar tree action buttons: UNVERIFIED), KB-012 (cơ chế Add new của Font: chưa re-verify độc lập) — KHÔNG ngang hàng với các KB đã network/DOM-verified đầy đủ, không dùng làm oracle | OQ-asset-category-009, OQ-asset-category-012, OQ-asset-category-014 |
| **Global Option instance** | Ngoài phạm vi object này theo quyết định 2026-09-14 — đọc object `global-option` | OQ-asset-category-004, OQ-asset-category-005 |
