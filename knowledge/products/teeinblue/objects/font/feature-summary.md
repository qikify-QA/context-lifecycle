# Object: Font (product: teeinblue) — Feature Profile Summary

- **Published context version:** 1 (bootstrap, `CTX-20260910-05`, observed 2026-09-10 / published 2026-09-11, env: staging)
- **Mode:** ZERO_DOC_BOOTSTRAP — toàn bộ profile là OBSERVED_CURRENT (0 CONFIRMED_EXPECTED, không có nguồn thẩm quyền spec/PO/ticket)
- **Actor test trong toàn bộ run:** duy nhất role `owner` (Linh explorer, sub=273), store `linh-explorer.myshopify.com`
- **4/4 feature đã có profile** (FEAT-01 → FEAT-04, không nhảy số). Không có feature nào bị chặn hoàn toàn, nhưng **2 conflict UNRESOLVED** và **5 stale_candidates** so với KB cũ (`knowledge/portal-fonts.md`, observe khác store/role/ngày) hội tụ nhiều nhất ở FEAT-02/FEAT-03.
- **18 KB candidate nguồn:** 1 HIGH (list/search query, 7 sample), 5 MEDIUM, 12 LOW (đa số single-sample write operation) — theo `kb.json` observations.

---

## FEAT-01 — Xem, tìm kiếm, phân trang và cấu hình danh sách font
**Goal:** Owner xem toàn bộ custom font của store, tìm nhanh theo tên, và cấu hình xử lý ký tự không được font hỗ trợ, chuẩn bị font cho artwork.
**Entry points:** `/fonts` (portal, menu Assets > Upload Fonts)

**Capabilities:**
1. Header/toolbar `/fonts`: breadcrumb, heading, nút Upload fonts, search box, preview-size slider, nút Font Settings, banner cảnh báo ký tự không hỗ trợ
2. List/search/phân trang qua GraphQL query `getData` (custom_fonts_connection) — search chỉ lọc field `name` (`_ilike`), **không** lọc `original_name`
3. Cấu hình Unsupported Character Settings (Font Settings popover): 3 radio, mặc định "Block rendering"; chọn "Fallback to a custom font" hiện field Fallback Font (client-side, chưa Save)
4. Footer: select "Show entries" + pagination link `‹ ›`; select **không bind** giá trị ở lần load đầu dù query gửi limit=6 (quirk tái xác nhận đúng so với KB cũ, không phải stale)

**Coverage:** portal (≤5 font, 1 trang) ✅ · api (query getData, limit mặc định + tự chọn) ✅ · data (custom_fonts_connection shape) ✅ · code ❌ · multi-page (hasNextPage=true) ❌ · Font Settings đã Save (persisted) ❌ · non-owner/second account ❌ · storefront n/a
**Confidence:** MEDIUM (riêng capability list/search đạt HIGH, observed_count=7 — capability chắc nhất toàn object)
**Risks/Unknowns:**
- Store hiện tại chưa từng vượt 1 trang — hành vi multi-page (cursor/after, giữ state search/limit khi chuyển trang) hoàn toàn chưa quan sát
- Nút "Save" trong Font Settings popover chưa từng được bấm — method/path/payload UNKNOWN
- Preview-size slider có gọi API không — chưa thao tác thật
- STALE-003: ID/path fixture của KB cũ (font id 901/888, `users/64/...`) đã lỗi thời cho store hiện tại (id 915-920, `users/266/...`)
- STALE-004: KB cũ ghi Fallback Font mặc định sẵn "Bailenson" — store hiện tại là "No font selected", đây là data riêng của store cũ chứ không phải default chung

**Gate:** CONDITIONAL_PASS (không dùng làm oracle tuyệt đối; multi-page và Font Settings Save chưa có coverage)

---

## FEAT-02 — Upload font mới lên store (.otf/.ttf)
**Goal:** Owner thêm 1 font mới (.otf/.ttf) vào thư viện Custom Fonts để dùng cho artwork sau này.
**Entry points:** Nút "Upload fonts" trên header `/fonts`

**Capabilities:**
1. Mở luồng upload: bấm "Upload fonts" mở **modal** "Browse fonts to upload" (banner nhắc convert TTF qua transfonter.org, nút Choose File) → mới mở OS file picker (`input#new-font accept=".otf,.ttf" multiple`)
2. Tạo font qua REST `POST /api/custom-fonts` (multipart) → 201, trả sẵn id/name/original_name/master/url/transform_status, không thấy dấu hiệu cần polling convert
3. Chặn định dạng sai ở phía client trước khi gửi: chọn file `.png` (bypass accept filter) → 0 network request, chỉ hiện icon cảnh báo, không có text giải thích

**Coverage:** portal (modal + file hợp lệ) ✅ · api (create 201, 2 sample) ✅ · data (row mới, transform_status=1) ✅ · portal (file sai định dạng .png) ✅ · code ❌ · api (server thật nhận file sai định dạng) ❌ · portal (multiple file, quá dung lượng, file corrupt) ❌ · non-owner ❌
**Confidence:** MEDIUM (không capability nào đạt HIGH, mọi write op chỉ observed_count 1-2)
**Risks/Unknowns:**
- Hành vi server thật với file sai định dạng hoàn toàn UNKNOWN — client luôn chặn trước khi gửi request trong mọi sample
- Upload trùng tên file/tên hiển thị ("Hey Magnolia") lần 2 được server chấp nhận (201), tạo row độc lập, **không có** cảnh báo uniqueness nào — chỉ 1 sample, rule_confidence LOW
- `transform_status` luôn =1 ở 2 lần tạo quan sát, ý nghĩa enum đầy đủ (0/2/...) chưa xác định
- **CONFLICT-001** (UNRESOLVED): KB cũ nói toàn bộ `/fonts` đi Hasura GraphQL; run này quan sát create=REST, download=REST, delete=REST, chỉ list/rename đi GraphQL
- **CONFLICT-002** (UNRESOLVED): KB cũ nói nút Upload mở thẳng OS file picker không modal; run này quan sát có modal trước — có thể do khác store/version, chưa phân biệt được
- SEC-002: claim CDN công khai không cần auth cho file mới upload — chưa re-verify trong run này (unmapped_evidence, không phải KB id)

**Gate:** CONDITIONAL_PASS (2 conflict PHẢI giữ UNRESOLVED; validations duplicate-name/invalid-format đều LOW, không khái quát hoá)

---

## FEAT-03 — Quản lý font đã upload: đổi tên, tải xuống, xoá
**Goal:** Owner chỉnh tên hiển thị font đã có, tải file font về máy, hoặc xoá font không dùng nữa, ngay từ `/fonts`.
**Entry points:** Icon action trên từng font card ở `/fonts` (tên clickable để rename, icon Download, icon Delete)

**Capabilities:**
1. Cấu trúc card cho phép rename/download/delete — xác nhận qua cả 3 thao tác thật trên cùng 1 card (bằng chứng chéo mạnh nhất của feature)
2. Rename inline qua GraphQL mutation `update_custom_fonts` — client tự sinh `updated_at`, response chỉ trả `id`, **không có toast xác nhận**
3. Download qua REST `GET /api/custom-fonts/{id}/download` → 200, content-disposition đặt tên UUID khác cả tên hiển thị lẫn tên file client lưu về
4. Xoá qua dialog xác nhận custom (không phải `window.confirm`) + REST `DELETE /api/custom-fonts/{id}` → 204, refetch list không còn row

**Coverage:** portal (rename/download/delete trên cùng card) ✅ · api (mỗi thao tác 1 sample) ✅ · data (row updated/removed qua refetch, không có DB evidence trực tiếp) ✅ · code ❌ · api (xoá font đang dùng thật trong artwork/font category — forbidden trong run) ❌ · api (rename edge case: rỗng/trùng tên) ❌ · non-owner ❌
**Confidence:** LOW (mọi capability ghi chỉ 1 sample)
**Risks/Unknowns:**
- Xoá 1 font **đang thực sự được dùng** trong artwork/font category chưa từng test (ngoài mutation policy) — dialog cảnh báo có thật sự ngăn được hay chỉ cảnh báo suông chưa rõ
- **SEC-001:** rename gọi thẳng Hasura mutation table-level `update_custom_fonts` với `_set` do client tự xây, qua JWT portal thường, không có negative sample kiểm tra phạm vi field được phép sửa — rủi ro authorization field-level chưa xác nhận hay loại trừ (priority P2)
- Client sinh tên file tải về ("Hey Magnolia.ttf") theo cơ chế nào — khác cả UUID server lẫn tên hiển thị hiện tại, chưa xác định
- STALE-001: liên quan CONFLICT-001 — KB cũ tuyên bố toàn bộ `/fonts` đi GraphQL, nhưng download/delete run này là REST
- STALE-005: KB cũ có path CDN cụ thể (`users/64/...`) đã lỗi thời; claim "CDN công khai không cần auth" (SEC-002) tự nó cũng chưa được re-verify trong run này

**Gate:** CONDITIONAL_PASS (CONFLICT-001 giữ UNRESOLVED; SEC-001/SEC-002 là risk/unknown chưa xác nhận, không dùng làm security assertion cứng)

---

## FEAT-04 — Dùng custom font trong artwork editor
**Goal:** Owner áp dụng 1 font đã upload cho text layer trong artwork đang thiết kế, không cần bước trung gian.
**Entry points:** Artwork editor > chọn text layer > Font type = Custom Fonts

**Capabilities:**
1. Font picker "Your Custom Fonts" dùng chung GraphQL query `getData` với `/fonts` — hiển thị đủ font hiện có kể cả font vừa upload trong cùng run
2. Áp dụng font đã chọn trực tiếp cho text layer — không cần qua bước Font Category riêng

**Coverage:** portal (text layer Paragraph, chọn font vừa upload) ✅ · api (query getData tái sử dụng) ✅ · code ❌ · portal (layer type khác ngoài Paragraph) ❌ · storefront (sản phẩm áp dụng font hiển thị phía khách hàng — storefront.enabled=false trong run) ❌ · non-owner ❌
**Confidence:** LOW — coverage mỏng nhất object (chỉ 1 ACT, 1 sample)
**Risks/Unknowns:**
- Chỉ test trên layer type "Paragraph" — layer/element type khác chưa test
- Font picker trong editor có search/phân trang riêng khi danh sách dài không — chỉ quan sát với 4 font
- Ảnh hưởng lên storefront khách hàng khi xem sản phẩm áp dụng font — hoàn toàn ngoài phạm vi run (`storefront.enabled=false`)

**Gate:** CONDITIONAL_PASS (chỉ 1 KB item riêng + 1 KB dùng chung làm nguồn — cần mở rộng sample trước khi dùng cho automation diện rộng)

---

## Gaps ở cấp Object (áp dụng cho MỌI feature trên)

| Gap | Ghi chú |
|---|---|
| **Data layer (DB) thật** | Dù coverage_matrix đánh dấu `data` = covered ở cả 3 feature ghi (FEAT-01/02/03), thực chất chỉ là response API/GraphQL hoặc refetch list — **không có bằng chứng DB trực tiếp** (không có `ent_ids`/db evidence, db-explorer không chạy trong run này) |
| **Code-level facts** | code-config-explorer không chạy — `code` = NOT_OBSERVED cho toàn bộ 4 feature |
| **CONFLICT-001 (data source REST vs GraphQL)** | UNRESOLVED, xuyên suốt FEAT-02 (create) và FEAT-03 (download/delete) — KB cũ (`knowledge/portal-fonts.md`) tuyên bố toàn bộ GraphQL, run này thấy REST cho create/download/delete, chỉ list/rename đi GraphQL. Cần dev/PO xác nhận hoặc chạy lại cùng 1 store |
| **CONFLICT-002 (modal vs no-modal upload)** | UNRESOLVED, riêng FEAT-02 — có thể do khác store/version, chưa có evidence phân biệt |
| **5 stale_candidates (STALE-001..005)** | Bắt buộc dùng làm input rework `knowledge/portal-fonts.md` (không tự sửa file đó ở bước này); gồm data-source claim, modal claim, ID/path fixture cũ, giá trị Fallback Font mặc định cũ |
| **SEC-001 / SEC-002** | SEC-001 (rename `_set` tuỳ ý, field-level authorization chưa test, priority P2) và SEC-002 (CDN public path, `unmapped_evidence` — không phải KB id, chưa re-verify) là risk/unknown, **không phải finding đã xác nhận** |
| **RBAC / non-owner / cross-tenant** | Chưa test trên **bất kỳ** feature nào của object Font — mọi capability chỉ quan sát qua 1 tài khoản owner (sub=273); second account (TIB_USER_A/TIB_USER_B) không có trong `.env` hiện tại |
| **Multi-page pagination (FEAT-01)** | Store luôn ≤1 trang (≤5 font) — hành vi `hasNextPage=true` (cursor/after, giữ state khi chuyển trang) hoàn toàn chưa quan sát |
| **Font Settings "Save" (FEAT-01)** | Nút Save chưa từng được bấm trong run (ảnh hưởng toàn store, ngoài mutation policy an toàn) — method/path/payload UNKNOWN |
| **Storefront-facing (FEAT-04)** | `storefront.enabled=false` trong bootstrap-request — hoàn toàn chưa test ảnh hưởng font lên trải nghiệm khách hàng |
| **Checklist confidence nguồn** | 18 KB candidate: chỉ 1 HIGH, 5 MEDIUM, 12 LOW (đa số single-sample write operation) — theo contract "một sample → luôn LOW", không dùng làm hard assertion |

**Review độc lập:** context-quality-reviewer → verdict `APPROVED_WITH_CONDITIONS`. Companion doc `knowledge/portal-fonts.md` cần merge lại theo khuyến nghị `MERGE_WITH_STORE_CAVEATS` (gộp quan sát run cũ 2026-09-09 store `linh-tib-staging` + run này 2026-09-10 store `linh-explorer`, giữ rõ caveat khác store).
