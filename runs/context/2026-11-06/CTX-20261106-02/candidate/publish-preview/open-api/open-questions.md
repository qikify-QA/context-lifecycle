# Open Questions — Open API

Mọi mục dưới đây chưa có nguồn thẩm quyền trả lời. Không dùng mục nào làm expected result.

## Tóm tắt

| Loại | Số lượng |
|---|---|
| CONFLICT | 1 |
| NEEDS_CONFIRMATION | 38 |
| OPEN_ISSUE | 8 |
| **Tổng** | **47** |

## OQ-open-api-001 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-open-api-001","type":"NEEDS_CONFIRMATION","feature_id":"open-api-asset-upload","summary":"Host oe-cdn.sgp1.digitaloceanspaces.com của upload_url và bước PUT file có phải host hợp lệ của môi trường staging không? Host chưa được xác nhận nên KB-033, KB-034 giữ INFERRED/LOW, không làm oracle; response đúng của bước PUT cũng chưa có nguồn xác nhận. CHK-028, CHK-029, CHK-031, CHK-032, CHK-033 cần layer image tạo qua bước PUT này nên giữ NEEDS_CONFIRMATION tới khi có câu trả lời."}
```

## OQ-open-api-002 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-open-api-002","type":"NEEDS_CONFIRMATION","feature_id":"open-api-asset-upload","summary":"Host cdn.ownego.com của thumbnail_url có phải host hợp lệ của môi trường staging không? Host chưa được xác nhận nên KB-027 giữ INFERRED/LOW, không làm oracle."}
```

## OQ-open-api-003 — CONFLICT

```json
{"oq_id":"OQ-open-api-003","type":"CONFLICT","feature_id":"open-api-asset-upload","summary":"Open API có spec hay không, và khác biệt giữa artwork KB-057 với quan sát của object này đến từ thay đổi hệ thống hay từ điều kiện thử? KB-057 không ghi header Accept đã gửi và liệt kê tên biến khác. Chưa chọn bên; KB-007 giữ UNRESOLVED trong CONF-open-api-001.","side_a":"artwork KB-057 (artwork-save-persist): 9 đường dẫn OpenAPI/swagger/docs trên TIB_OPENAPI_BASE trả 404 dạng HTML; không có token Open API nào trong .env.","side_b":"open-api KB-007, KB-001: 6 đường dẫn spec, không gửi token, với Accept có application/json, trả 404 application/json; token trong TIB_FULL_ACCESS_TOKEN được chấp nhận trên các route đọc dưới /openapi/v1."}
```

## OQ-open-api-004 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-open-api-004","type":"NEEDS_CONFIRMATION","feature_id":"open-api-asset-upload","summary":"DELETE layer image như KB-042 có phải hành vi đúng không, có xoá hẳn không, và sau DELETE file ảnh trên CDN cùng object tạm dưới temporary-files/ của luồng upload còn hay mất? Chưa biết đường xoá object tạm qua Open API, kể cả object không thành asset mới."}
```

## OQ-open-api-005 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-open-api-005","type":"NEEDS_CONFIRMATION","feature_id":"open-api-asset-upload","summary":"Clipart còn status processing gần hai tháng sau khi tạo như KB-024 có bị kẹt không, và thời gian xử lý bình thường của clipart là bao lâu? Một sample."}
```

## OQ-open-api-006 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-open-api-006","type":"NEEDS_CONFIRMATION","feature_id":"open-api-asset-upload","summary":"Các field exception, file, line, trace trong body 404 và 405 như KB-009 có được phép trên staging không, và production có tắt không? Staging có các field này cả với request không gửi token; chưa có quan sát trên production."}
```

## OQ-open-api-007 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-open-api-007","type":"NEEDS_CONFIRMATION","feature_id":"open-api-asset-upload","summary":"Chính sách quota của Open API là gì: ngưỡng từng môi trường, cửa sổ đếm, phạm vi đếm, quota theo ngày, hành vi khi vượt, và header quota có mặt theo loại response như KB-011 có phải hành vi đúng không? Header chỉ cho thấy limit và remaining trên staging; chưa thấy x-ratelimit-reset, retry-after hay 429."}
```

## OQ-open-api-008 — OPEN_ISSUE

```json
{"oq_id":"OQ-open-api-008","type":"OPEN_ISSUE","feature_id":"open-api-asset-upload","summary":"Xác định account và store của một token Open API bằng cách nào, và GET /api/user bằng session cookie cho kết quả gì? GET /api/user với token Open API trả 401 (KB-005), các đường dẫn định danh đã thử đều 404 (KB-006), và response không có field store."}
```

## OQ-open-api-009 — OPEN_ISSUE

```json
{"oq_id":"OQ-open-api-009","type":"OPEN_ISSUE","feature_id":"open-api-asset-upload","summary":"upload_headers có trường hợp nào trả header khác ngoài khoá Host không? Mới thấy khoá Host trong 2 sample."}
```

## OQ-open-api-010 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-open-api-010","type":"NEEDS_CONFIRMATION","feature_id":"open-api-asset-upload","summary":"Khi account có layer image category thì item có field gì, search hoặc name riêng lẻ trên route này hoạt động thế nào, và dạng phân trang như KB-020 có phải hành vi đúng không? Quan sát hiện có chỉ ở account không có category."}
```

## OQ-open-api-011 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-open-api-011","type":"NEEDS_CONFIRMATION","feature_id":"open-api-asset-upload","summary":"Token Open API có những ability nào ngoài các route đã gọi, token thiếu ability nhận kết quả gì, và việc tạo hoặc thu hồi token ảnh hưởng ra sao? Chưa thử, không suy phạm vi quyền từ các route đã gọi."}
```

## OQ-open-api-012 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-open-api-012","type":"NEEDS_CONFIRMATION","feature_id":"open-api-asset-upload","summary":"Token không hợp lệ, token của tenant khác và id của tenant khác trên route đọc hoặc xoá phải nhận kết quả gì? Chưa có quan sát nào về cô lập tenant."}
```

## OQ-open-api-013 — OPEN_ISSUE

```json
{"oq_id":"OQ-open-api-013","type":"OPEN_ISSUE","feature_id":"open-api-asset-upload","summary":"Các nhóm route orders, campaigns, customizations, webhooks của Open API gồm những route nào và hành vi thế nào? Chưa tìm được spec nên chưa có danh sách route đầy đủ, chưa có quan sát. Route đã biết từ `_flows/storefront-sdk.md`: `GET /openapi/v1/customizations/{uuid}`, chưa gọi."}
```

## OQ-open-api-014 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-open-api-014","type":"NEEDS_CONFIRMATION","feature_id":"open-api-asset-upload","summary":"Tham số list chưa thử hoạt động thế nào: name và phân trang trên cliparts, tham số page khi có search, giá trị tối đa của per_page và kết quả khi vượt?"}
```

## OQ-open-api-015 — OPEN_ISSUE

```json
{"oq_id":"OQ-open-api-015","type":"OPEN_ISSUE","feature_id":"open-api-asset-upload","summary":"GET item theo id của clipart-categories, layer-image-categories và cliparts hoạt động thế nào? Chỉ có quan sát ở dạng list."}
```

## OQ-open-api-016 — OPEN_ISSUE

```json
{"oq_id":"OQ-open-api-016","type":"OPEN_ISSUE","feature_id":"open-api-asset-upload","summary":"Method khác trên /openapi/v1/layer-images/{id}, route ghi của category và clipart, và upload clipart hoạt động thế nào? Chưa có quan sát."}
```

## OQ-open-api-017 — OPEN_ISSUE

```json
{"oq_id":"OQ-open-api-017","type":"OPEN_ISSUE","feature_id":"open-api-asset-upload","summary":"Xoá layer image đang được dùng thì xảy ra gì? DELETE chỉ mới quan sát trên asset do chính token tạo."}
```

## OQ-open-api-018 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-open-api-018","type":"NEEDS_CONFIRMATION","feature_id":"open-api-asset-upload","summary":"Layer image chuyển sang ready như KB-038 có phải hành vi đúng không, thời gian xử lý thực tế là bao lâu, và item kẹt ở processing biểu hiện thế nào? Chỉ có một lần upload tạo mới."}
```

## OQ-open-api-019 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-open-api-019","type":"NEEDS_CONFIRMATION","feature_id":"open-api-asset-upload","summary":"Giới hạn input của upload là gì: validation đầy đủ của filename và filesize, filesize lệch file thật, kích thước tối đa, định dạng khác; message như KB-030 có phải hành vi đúng không? Mới có một file PNG 96 byte và trường hợp thân rỗng."}
```

## OQ-open-api-020 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-open-api-020","type":"NEEDS_CONFIRMATION","feature_id":"open-api-asset-upload","summary":"POST /openapi/v1/layer-images nhận những nhánh input nào, các nhánh file, url và category_id hoạt động thế nào, và message như KB-035 có phải hành vi đúng không? Nhánh upload_id là nhánh duy nhất đã quan sát."}
```

## OQ-open-api-021 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-open-api-021","type":"NEEDS_CONFIRMATION","feature_id":"open-api-asset-upload","summary":"on_duplicate có những giá trị nào, tiêu chí xác định trùng là gì, on_duplicate khi không trùng tên hoạt động thế nào, và kết quả như KB-039, KB-040 có phải hành vi đúng không?"}
```

## OQ-open-api-022 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-open-api-022","type":"NEEDS_CONFIRMATION","feature_id":"open-api-asset-upload","summary":"Vòng đời upload_id ra sao: sau expires_at nhận kết quả gì, upload_id đã dùng với on_duplicate=skip có dùng lại được không, và dùng lại upload_id đã finalize nhận 422 như KB-041 có phải hành vi đúng không? Message ở KB-041 đến từ upload_id đã finalize trước expires_at, không phải upload_id hết hạn."}
```

## OQ-open-api-023 — OPEN_ISSUE

```json
{"oq_id":"OQ-open-api-023","type":"OPEN_ISSUE","feature_id":"open-api-asset-upload","summary":"Quan sát finalize ở KB-037 chưa chứng minh trước đó account không có asset cùng name: list trước upload dùng tên có đuôi .png trong khi name lưu bỏ đuôi."}
```

## OQ-open-api-024 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-open-api-024","type":"NEEDS_CONFIRMATION","feature_id":"open-api-asset-upload","summary":"Token trong TIB_FULL_ACCESS_TOKEN đọc được 4 route như KB-001 có phải hành vi đúng không, và ability đầy đủ của token là gì?"}
```

## OQ-open-api-025 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-open-api-025","type":"NEEDS_CONFIRMATION","feature_id":"open-api-asset-upload","summary":"Có token mà không gửi Accept vẫn nhận 200 JSON như KB-002 có phải hành vi đúng không?"}
```

## OQ-open-api-026 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-open-api-026","type":"NEEDS_CONFIRMATION","feature_id":"open-api-asset-upload","summary":"Không gửi token với Accept JSON nhận 401 như KB-003 có phải hành vi đúng không, và có áp cho mọi route dưới /openapi/v1 không?"}
```

## OQ-open-api-027 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-open-api-027","type":"NEEDS_CONFIRMATION","feature_id":"open-api-asset-upload","summary":"Không gửi token và không gửi Accept nhận 302 tới /api/login như KB-004 có phải hành vi đúng của API không?"}
```

## OQ-open-api-028 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-open-api-028","type":"NEEDS_CONFIRMATION","feature_id":"open-api-asset-upload","summary":"GET /api/user với token Open API nhận 401 như KB-005 có phải hành vi đúng không?"}
```

## OQ-open-api-029 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-open-api-029","type":"NEEDS_CONFIRMATION","feature_id":"open-api-asset-upload","summary":"Dạng 404 của route không tồn tại như KB-008 có phải hành vi đúng không, và Open API có route chính thức nào để xác định account không (KB-006)?"}
```

## OQ-open-api-030 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-open-api-030","type":"NEEDS_CONFIRMATION","feature_id":"open-api-asset-upload","summary":"GET /openapi/v1/uploads nhận 405 như KB-029 có phải hành vi đúng không?"}
```

## OQ-open-api-031 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-open-api-031","type":"NEEDS_CONFIRMATION","feature_id":"open-api-asset-upload","summary":"Dạng phân trang cursor như KB-013 có phải contract đúng của hai route này không?"}
```

## OQ-open-api-032 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-open-api-032","type":"NEEDS_CONFIRMATION","feature_id":"open-api-asset-upload","summary":"Khi có search, response đổi sang dạng page (KB-014) có phải contract đúng không, và tham số query trong links thay vì search (KB-015) có phải hành vi đúng không?"}
```

## OQ-open-api-033 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-open-api-033","type":"NEEDS_CONFIRMATION","feature_id":"open-api-asset-upload","summary":"Giá trị mặc định của per_page ở các route list là gì, và 25 như KB-016 có phải giá trị đúng không?"}
```

## OQ-open-api-034 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-open-api-034","type":"NEEDS_CONFIRMATION","feature_id":"open-api-asset-upload","summary":"Luật so khớp của search và name trên layer-images là gì, và kết quả như KB-017 có phải hành vi đúng không?"}
```

## OQ-open-api-035 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-open-api-035","type":"NEEDS_CONFIRMATION","feature_id":"open-api-asset-upload","summary":"Luật so khớp của search và name trên clipart-categories là gì, và kết quả như KB-018 có phải hành vi đúng không?"}
```

## OQ-open-api-036 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-open-api-036","type":"NEEDS_CONFIRMATION","feature_id":"open-api-asset-upload","summary":"search và name loại trừ nhau như KB-019 có phải rule đúng của 3 route này không?"}
```

## OQ-open-api-037 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-open-api-037","type":"NEEDS_CONFIRMATION","feature_id":"open-api-asset-upload","summary":"cliparts không nhận search như KB-022 có phải hành vi đúng không, và route này tra cứu bằng tham số nào?"}
```

## OQ-open-api-038 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-open-api-038","type":"NEEDS_CONFIRMATION","feature_id":"open-api-asset-upload","summary":"Shape item của cliparts như KB-021 có phải contract đúng không?"}
```

## OQ-open-api-039 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-open-api-039","type":"NEEDS_CONFIRMATION","feature_id":"open-api-asset-upload","summary":"Shape item của clipart-categories như KB-028 có phải contract đúng không, và type có những giá trị nào?"}
```

## OQ-open-api-040 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-open-api-040","type":"NEEDS_CONFIRMATION","feature_id":"open-api-asset-upload","summary":"Shape của layer image như KB-025 và url tương đối như KB-026 có phải contract đúng không, và status có những giá trị nào?"}
```

## OQ-open-api-041 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-open-api-041","type":"NEEDS_CONFIRMATION","feature_id":"open-api-asset-upload","summary":"Cursor đọc được và không có khoá chữ ký như KB-023 có được chấp nhận không?"}
```

## OQ-open-api-042 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-open-api-042","type":"NEEDS_CONFIRMATION","feature_id":"open-api-asset-upload","summary":"Contract của POST /openapi/v1/uploads như KB-031 và thời hạn upload khoảng 5 phút như KB-032 có phải hành vi đúng không?"}
```

## OQ-open-api-043 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-open-api-043","type":"NEEDS_CONFIRMATION","feature_id":"open-api-asset-upload","summary":"POST /openapi/v1/uploads có rule gì về filename đã dùng, ngoài kết quả 201 ở lần thứ hai như KB-031?"}
```

## OQ-open-api-044 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-open-api-044","type":"NEEDS_CONFIRMATION","feature_id":"open-api-asset-upload","summary":"Finalize trước khi PUT nhận 422 như KB-036 có phải hành vi đúng không?"}
```

## OQ-open-api-045 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-open-api-045","type":"NEEDS_CONFIRMATION","feature_id":"open-api-asset-upload","summary":"Finalize sau khi PUT như KB-037 có phải hành vi đúng không, và host của bước PUT có hợp lệ không?"}
```

## OQ-open-api-046 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-open-api-046","type":"NEEDS_CONFIRMATION","feature_id":"open-api-asset-upload","summary":"Server phải xử lý cursor đã sửa thế nào? KB-023 ghi chưa thử sửa cursor."}
```

## OQ-open-api-047 — OPEN_ISSUE

```json
{"oq_id":"OQ-open-api-047","type":"OPEN_ISSUE","feature_id":"open-api-asset-upload","summary":"Hỏi Dev: có job tự dọn object tạm dưới temporary-files/ của luồng upload không, và chu kỳ dọn là bao lâu? upload_url trỏ vào temporary-files/ (KB-033); chưa có quan sát về việc object tạm được dọn sau upload."}
```
