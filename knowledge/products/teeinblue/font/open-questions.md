# Open Questions — Font

_Regenerated từ nguồn thật (kb.json conflicts, checklist items NEEDS_CONFIRMATION, coverage_gaps) — không phải bản compile cũ (bản cũ bị lỗi, mất nội dung conflicts). Mọi resolution vẫn phải qua đúng authority (orchestrator + reviewer, hoặc PO/Dev cho câu hỏi nghiệp vụ). File này KHÔNG tự resolve bất kỳ mục nào._

## Tóm tắt

| Loại | Số lượng |
|---|---|
| CONFLICT | 2 |
| NEEDS_CONFIRMATION | 16 |
| OPEN_ISSUE | 3 |
| **Tổng** | **21** |

## OQ-font-001 — CONFLICT

```json
{"oq_id": "OQ-font-001", "type": "CONFLICT", "feature_id": "upload-custom-font", "summary": "Data source của thao tác Font: hoàn toàn Hasura GraphQL (documented, KB cũ) vs REST cho create/download/delete (observed). Áp dụng cho create (upload-custom-font), download và delete (manage-uploaded-font).", "side_a": "'/fonts' không đi qua REST mà qua Hasura GraphQL — List (query getData, /v1beta1/relay) và Detail (query get/fonts_by_pk, /v1/graphql) đều là GraphQL. Nguồn: KB legacy "portal-fonts", mục 'Data source' — quan sát 2026-09-09, staging, role user-a (id 255), store linh-tib-staging.myshopify.com. File này TỰ NHẬN 'Upload thật... chưa kiểm tra' và 'Delete... chưa test - read-only', tức claim 'hoàn toàn GraphQL' chưa từng được đối chiếu với hành vi write thật.", "side_b": "List/search/pagination (query getData) và rename (mutation update_custom_fonts) đi qua Hasura GraphQL — khớp KB cũ. Nhưng create (POST /api/custom-fonts, KB-011), download (GET /api/custom-fonts/{id}/download, KB-015), và delete (DELETE /api/custom-fonts/{id}, KB-016) là REST, không phải GraphQL. Nguồn: quan sát 2026-09-10, staging, role owner (sub=273), store linh-explorer.myshopify.com."}
```

## OQ-font-002 — CONFLICT

```json
{"oq_id": "OQ-font-002", "type": "CONFLICT", "feature_id": "upload-custom-font", "summary": "Nút 'Upload fonts' mở modal (observed) vs mở thẳng OS file picker không modal (documented, KB cũ).", "side_a": "Nút Upload fonts mở thẳng file picker OS, không có modal. Input accept='.otf,.ttf', multiple. Nguồn: KB legacy "portal-fonts", mục 'Behavior đã xác nhận' — cùng nguồn/store/ngày với OQ-font-001 (2026-09-09, store linh-tib-staging.myshopify.com, role user-a id 255).", "side_b": "Bấm 'Upload fonts' mở MỘT MODAL trước ('Browse fonts to upload:', banner nhắc convert TTF qua transfonter.org, nút 'Choose File'); bấm 'Choose File' mới mở OS file picker. Nguồn: quan sát 2026-09-10, staging, role owner (sub=273), store linh-explorer.myshopify.com (KB-005). Khả năng cao là khác biệt do khác store/version, nhưng chưa có evidence để kết luận chắc chắn — cần chạy lại trên cùng 1 store để xác minh, hoặc hỏi dev về khả năng feature-flag theo store."}
```

## OQ-font-003 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-font-003", "type": "NEEDS_CONFIRMATION", "feature_id": "manage-uploaded-font", "summary": "[SEC-001, risk P2] Mutation update_custom_fonts có Hasura permission rule giới hạn cột được phép _set không? Có thể gửi field như user_id qua _set từ client hay không? KB-018 chỉ mô tả 1 request bình thường (name+updated_at), KHÔNG phải negative test — chưa từng có sample nào thử gửi field khác. Cần dev xác nhận cấu hình Hasura permission cho bảng custom_fonts, hoặc thử 1 request thủ công có giám sát trên môi trường staging."}
```

## OQ-font-004 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-font-004", "type": "NEEDS_CONFIRMATION", "feature_id": "manage-uploaded-font", "summary": "Rename thành chuỗi rỗng có bị chặn ở client/server không? Rename trùng tên với font khác có được chấp nhận (tương tự pattern upload trùng tên, KB-012) không? Chỉ có 1 sample rename sang tên hoàn toàn mới quan sát được tới nay."}
```

## OQ-font-005 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-font-005", "type": "NEEDS_CONFIRMATION", "feature_id": "manage-uploaded-font", "summary": "Server có chặn xoá font đang được dùng trong artwork/font category (409/400) hay cho xoá vô điều kiện rồi để artwork lỗi font? Hành động này nằm ngoài phạm vi mutation an toàn (rủi ro phá hỏng dữ liệu artwork thật) nên chưa từng được quan sát. Dialog cảnh báo hiện tại (KB-007) chỉ nhắc nhở bằng text, chưa rõ có ngăn được thao tác thật hay không. Cần PO xác nhận hành vi mong muốn VÀ môi trường test có fixture artwork/font riêng, không phải store production/thật."}
```

## OQ-font-006 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-font-006", "type": "NEEDS_CONFIRMATION", "feature_id": "manage-uploaded-font", "summary": "[SEC-002] File font trên CDN có công khai truy cập được không cần auth không? 0 request nào tới CDN được quan sát trong toàn bộ evidence capture tới nay; claim cũ 'CDN công khai không cần auth' (kế thừa từ KB legacy "portal-fonts", chưa phải KB item chính thức của object này) chưa được re-verify. Nếu công khai, ai biết path (vd qua response API) đều tải được file — cần đánh giá security exposure."}
```

## OQ-font-007 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-font-007", "type": "NEEDS_CONFIRMATION", "feature_id": "upload-custom-font", "summary": "Việc chấp nhận upload trùng tên không cảnh báo (KB-012) là hành vi CÓ CHỦ ĐÍCH (cho phép nhiều font trùng tên hiển thị, phân biệt bằng id) hay là THIẾU validation? Cần PO/Dev xác nhận trước khi coi đây là expected behavior hay defect cần fix."}
```

## OQ-font-008 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-font-008", "type": "NEEDS_CONFIRMATION", "feature_id": "upload-custom-font", "summary": "Server endpoint POST /api/custom-fonts có tự validate định dạng file không, hay hoàn toàn tin tưởng client-side check? Client luôn chặn trước khi gửi trong mọi sample UI đã thử — chưa từng có request thật chạm server với file sai định dạng."}
```

## OQ-font-009 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-font-009", "type": "NEEDS_CONFIRMATION", "feature_id": "upload-custom-font", "summary": "Chọn nhiều file cùng lúc qua input 'multiple' có tạo nhiều request POST riêng lẻ không? Có giới hạn số lượng file/lần không? Chưa từng thử dù input có attribute 'multiple'."}
```

## OQ-font-010 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-font-010", "type": "NEEDS_CONFIRMATION", "feature_id": "upload-custom-font", "summary": "Có giới hạn dung lượng file upload không? Server xử lý thế nào với file .ttf/.otf bị corrupt — có phản ánh qua transform_status không, hay tạo record 'hỏng' vĩnh viễn trong list?"}
```

## OQ-font-011 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-font-011", "type": "NEEDS_CONFIRMATION", "feature_id": "use-custom-font-in-artwork-editor", "summary": "Chọn 1 custom font trong picker rồi Save artwork có áp dụng đúng font cho text layer trong canvas, và có persist qua reload không? Đây là hành động CỐT LÕI NHẤT của toàn bộ object Font (áp dụng font cho thiết kế thật) nhưng CHƯA TỪNG được thực hiện thật — chỉ mở picker để quan sát cấu trúc (KB-008), không Select/Save. Đây là gap ưu tiên cao nhất của cả object, không riêng feature này."}
```

## OQ-font-012 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-font-012", "type": "NEEDS_CONFIRMATION", "feature_id": "use-custom-font-in-artwork-editor", "summary": "Picker hiển thị gì khi store chưa có custom font nào — empty state message, hay ẩn hoàn toàn tuỳ chọn 'Custom Fonts' trong Font type? Chưa từng quan sát vì mọi lần quan sát tới nay đều có ≥3 font sẵn có trên store."}
```

## OQ-font-013 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-font-013", "type": "NEEDS_CONFIRMATION", "feature_id": "use-custom-font-in-artwork-editor", "summary": "Picker trong editor có search/phân trang riêng khi danh sách dài không, hay hiển thị toàn bộ không giới hạn (khác với /fonts vốn có phân trang)? Chỉ quan sát với 4 font, chưa từng test danh sách dài."}
```

## OQ-font-014 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-font-014", "type": "NEEDS_CONFIRMATION", "feature_id": "use-custom-font-in-artwork-editor", "summary": "Luồng chọn Custom Fonts có giống nhau trên mọi layer type hay chỉ áp dụng được cho một số loại nhất định (vd chỉ text-based layer)? Chỉ test trên đúng 1 layer type 'Paragraph'."}
```

## OQ-font-015 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-font-015", "type": "NEEDS_CONFIRMATION", "feature_id": "use-custom-font-in-artwork-editor", "summary": "Custom font có render đúng trên storefront khách hàng không (font-face loading, hành vi fallback khi lỗi)? Hoàn toàn ngoài phạm vi quan sát tới nay (storefront chưa được bật để test) — cần bật storefront để test ở lần chạy sau, và phụ thuộc vào việc OQ-font-011 (Select+Save) được xác nhận hoạt động trước."}
```

## OQ-font-016 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-font-016", "type": "NEEDS_CONFIRMATION", "feature_id": "view-and-configure-font-list", "summary": "Nút Save trong Font Settings gọi API gì (method/path/payload) và cấu hình có persist qua reload không? Hành động này ảnh hưởng TOÀN STORE nên chưa từng được bấm (ngoài phạm vi mutation an toàn cho phép). Cần PO/Dev xác nhận trước, hoặc 1 lần chạy có approval mutation ảnh hưởng toàn store."}
```

## OQ-font-017 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-font-017", "type": "NEEDS_CONFIRMATION", "feature_id": "view-and-configure-font-list", "summary": "Cần fixture store có > page-size font để quan sát hành vi phân trang thật (cursor 'after', giữ state search/limit khi chuyển trang, URL đổi hay không) — store quan sát tới nay luôn ≤5 font, hasNextPage luôn false, tham số cursor 'after' chưa từng xuất hiện. Claim cũ (khác store) 'URL không đổi khi sang trang → F5 sẽ refresh về trang 1' còn đúng trên kiến trúc hiện tại không?"}
```

## OQ-font-018 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-font-018", "type": "NEEDS_CONFIRMATION", "feature_id": "view-and-configure-font-list", "summary": "Pattern 'chọn thủ công -> bind đúng -> query dùng limit đó' đã xác nhận cho giá trị '50' (KB-009, 1 sample). Các giá trị khác của Show entries (20/100/250/500) chưa từng được thử — theo nguyên tắc 'một sample không suy diễn thành enum/boundary rule' nên không được giả định các giá trị khác hoạt động giống hệt."}
```

## OQ-font-019 — OPEN_ISSUE

```json
{"oq_id": "OQ-font-019", "type": "OPEN_ISSUE", "feature_id": null, "summary": "Cross-role/permission testing hoàn toàn chưa thực hiện trên bất kỳ feature nào của object Font — mọi capability chỉ quan sát qua 1 tài khoản owner (sub=273); không có second account khả dụng để test rename/download/delete/create cross-role hoặc cross-tenant. Cả 4 checklist của object này đều loại trừ dimension PERMISSION vì lý do này."}
```

## OQ-font-020 — OPEN_ISSUE

```json
{"oq_id": "OQ-font-020", "type": "OPEN_ISSUE", "feature_id": "view-and-configure-font-list", "summary": "Route /fonts/:id — KB cũ (KB legacy "portal-fonts") ghi nhận đây là 'dead route' (lỗi ApolloError field 'url' not found in type 'fonts'). Chưa được test lại trên store hiện tại — không thể xác nhận hay phủ định claim này ở thời điểm hiện tại."}
```

## OQ-font-021 — OPEN_ISSUE

```json
{"oq_id": "OQ-font-021", "type": "OPEN_ISSUE", "feature_id": null, "summary": "0/5 write operation của object Font (create, rename, download, delete, Font Settings Save) có sample lỗi 4xx/5xx nào được quan sát — không thể kết luận hệ thống 'không có validation lỗi', chỉ là CHƯA CÓ sample lỗi ở bất kỳ thao tác ghi nào. Đây là gap mang tính hệ thống, không riêng 1 checklist item."}
```
