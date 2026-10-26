# Open Questions — Translation

Mỗi mục dưới đây là 1 entry độc lập với `oq_id` ổn định (không đổi số khi resolve mục khác). Nguồn: 1 conflict thật từ kb bootstrap (`kb_version 1`, `CTX-20260921-02`), các checklist item `NEEDS_CONFIRMATION` trên cả 3 checklist, và các gap object-wide chưa được checklist nào bao phủ.

| Loại | Số lượng |
|---|---|
| CONFLICT | 1 |
| NEEDS_CONFIRMATION | 24 |
| OPEN_ISSUE | 8 |
| **Tổng** | **33** |

## OQ-translation-001 — CONFLICT

```json
{"oq_id": "OQ-translation-001", "type": "CONFLICT", "feature_id": "dynamic-translations", "summary": "Dynamic Translations (nội dung do merchant tự nhập, vd. tên Product base) có propagate/hiển thị lên storefront hay không. UNRESOLVED — cần nguồn thẩm quyền (PO/Dev xác nhận, spec, hoặc mã nguồn backend) để xác định by-design vs defect, cộng với retest trên 1 campaign có Option Title tự do thật sự trước khi kết luận diện rộng cho toàn bộ Dynamic Translations (chỉ sub-scope 'Product base name' đã được test, xem KB-016 trong features/dynamic-translations/kb.json).", "side_a": "Business context ban đầu do user cung cấp lúc bootstrap (giả thuyết đầu vào, KHÔNG phải nguồn xác nhận thẩm quyền, confidence LOW): 'Cả 2 loại translation (Product Page Content và Dynamic Translations) đều hiển thị ra storefront.'", "side_b": "Quan sát trực tiếp (confidence LOW, single-sample): khi buyer GUEST ở locale=vi xem trang sản phẩm campaign 2595 (đã có sẵn Dynamic Translation record id=69 lưu 'Vertical Framed Poster' -> 'Áp phích khung dọc QA-TEST-CTX20260921-02'), chuỗi 'Vertical Framed Poster' vẫn hiển thị nguyên tiếng Anh cả ở DOM (component <variant-selects> gốc theme Dawn) lẫn ở response GET /api/merchant/campaigns/{productId}.json (byte-giống-hệt giữa locale en và vi). Bản dịch tiếng Việt không xuất hiện ở bất kỳ đâu trên trang. Chỉ 1/3 sub-scope đã công bố (Product base name) được test — campaign 2595 không có field Option Title tự do, nên 'Option Title' và 'Variants name' hoàn toàn chưa kiểm chứng, KHÔNG được suy diễn từ kết quả này."}
```

## OQ-translation-002 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-translation-002", "type": "NEEDS_CONFIRMATION", "feature_id": "product-page-content-translation", "summary": "GET endpoint (nếu có) tải lại override Product Page Content hiện có khi mở /product-page-content lần đầu chưa được xác định — chỉ có evidence UI (field hiển thị đúng sau reload ở 1 lần chạy), chưa có contract API để assert độc lập. Cần code-config-explorer hoặc api-explorer xác nhận (checklist ref: CHK-006)."}
```

## OQ-translation-003 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-translation-003", "type": "NEEDS_CONFIRMATION", "feature_id": "product-page-content-translation", "summary": "Cơ chế server-side (app embed / theme extension / backend route) resolve locale buyer và inject override Product Page Content vào HTML document ban đầu cho /vi/products/... chưa được xác định, không map được tới bất kỳ API operation nào — cần để phân biệt bug locale-resolution vs cache/propagation-delay khi có defect report 'translation không hiện' (checklist ref: CHK-009)."}
```

## OQ-translation-004 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-translation-004", "type": "NEEDS_CONFIRMATION", "feature_id": "product-page-content-translation", "summary": "Permission boundary của PUT /api/instances/{instanceId}/config-translations đối với cross-tenant/forbidden-token chưa được test — chưa rõ backend validate instance_id ownership theo session hay tin path param (checklist ref: CHK-011)."}
```

## OQ-translation-005 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-translation-005", "type": "NEEDS_CONFIRMATION", "feature_id": "product-page-content-translation", "summary": "Hiển thị override Product Page Content trên mobile viewport chưa được kiểm chứng — run bootstrap chỉ test trên desktop viewport (checklist ref: CHK-013)."}
```

## OQ-translation-006 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-translation-006", "type": "NEEDS_CONFIRMATION", "feature_id": "dynamic-translations", "summary": "Info banner của Dynamic Translations công bố phạm vi hẹp hơn business-context ban đầu, KHÔNG đề cập 'layer placeholder', 'artwork custom name', hay 'campaign custom name/label'. Đây chỉ là NOT_OBSERVED trên UI hiện tại, không phải xác nhận các scope đó bị loại trừ — cần PO/Dev xác nhận scope chính thức. Một nguồn domain-knowledge cung cấp sau đó (KB-021, PROPOSED, chưa verify) gợi ý phạm vi rộng hơn banner UI — xem OQ-translation-022 (checklist ref: CHK-002)."}
```

## OQ-translation-007 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-translation-007", "type": "NEEDS_CONFIRMATION", "feature_id": "dynamic-translations", "summary": "Hành vi bảng manual entry Dynamic Translations khi có nhiều dòng (>1 entry cùng locale) chưa được test — thứ tự lưu, xử lý trùng chuỗi Default chưa rõ (checklist ref: CHK-005)."}
```

## OQ-translation-008 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-translation-008", "type": "NEEDS_CONFIRMATION", "feature_id": "dynamic-translations", "summary": "Response schema đầy đủ của GET /api/translations, và độ ổn định của vai trò 'load existing entries' qua nhiều lần save/reload, chỉ mới được corroborate 1 lần (tình cờ trong bước cleanup) — chưa đủ để làm oracle API-level ổn định (checklist ref: CHK-006)."}
```

## OQ-translation-009 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-translation-009", "type": "NEEDS_CONFIRMATION", "feature_id": "dynamic-translations", "summary": "Hành vi submit file thực tế cho Import của Dynamic Translations (format được chấp nhận, cách match entity nguồn, xử lý collision với entry đã tồn tại) hoàn toàn chưa được kiểm chứng — run bootstrap chỉ mở rồi huỷ file-chooser, không submit file nào (checklist ref: CHK-007b)."}
```

## OQ-translation-010 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-translation-010", "type": "NEEDS_CONFIRMATION", "feature_id": "dynamic-translations", "summary": "Dynamic Translations sub-scope 'Option Title trong personalization form' có propagate ra storefront hay không, độc lập với kết quả OQ-translation-001 (sub-scope 'Product base name') — chưa có campaign nào có Option Title tự do được test (checklist ref: CHK-009)."}
```

## OQ-translation-011 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-translation-011", "type": "NEEDS_CONFIRMATION", "feature_id": "dynamic-translations", "summary": "Dynamic Translations sub-scope 'Variants name' có propagate ra storefront hay không, độc lập với OQ-translation-001 — chưa có evidence nào trong run bootstrap (checklist ref: CHK-010)."}
```

## OQ-translation-012 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-translation-012", "type": "NEEDS_CONFIRMATION", "feature_id": "dynamic-translations", "summary": "Permission boundary của POST /api/translations/bulk và GET /api/translations đối với cross-tenant/forbidden-token chưa được test (checklist ref: CHK-011)."}
```

## OQ-translation-013 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-translation-013", "type": "NEEDS_CONFIRMATION", "feature_id": "language-locale-switcher", "summary": "Hành vi combobox portal / switcher storefront khi store có >2 locale published chưa được kiểm chứng — store dùng trong run bootstrap chỉ có 2 locale (en/vi) (checklist ref: CHK-006)."}
```

## OQ-translation-014 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-translation-014", "type": "NEEDS_CONFIRMATION", "feature_id": "language-locale-switcher", "summary": "Tương tác thực tế (tap/click) với storefront language switcher ở mobile viewport chưa từng được thực hiện — run bootstrap chỉ inventory DOM element, không thao tác (checklist ref: CHK-007)."}
```

## OQ-translation-015 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-translation-015", "type": "NEEDS_CONFIRMATION", "feature_id": "language-locale-switcher", "summary": "GET /api/instances/{instanceId}/shop-locales là live pass-through trực tiếp từ Shopify Admin API hay bản cache riêng của teeinblue — chưa xác nhận. Nếu là cache, portal combobox có thể hiển thị danh sách locale cũ không khớp với những gì buyer thực sự chọn được trên storefront (checklist ref: CHK-008)."}
```

## OQ-translation-016 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-translation-016", "type": "NEEDS_CONFIRMATION", "feature_id": "language-locale-switcher", "summary": "Permission boundary của GET /api/instances/{instanceId}/shop-locales đối với cross-tenant/forbidden-token chưa được test (checklist ref: CHK-009)."}
```

## OQ-translation-017 — OPEN_ISSUE

```json
{"oq_id": "OQ-translation-017", "type": "OPEN_ISSUE", "feature_id": null, "summary": "Response schema đầy đủ của GET /api/merchant/campaigns/{productId}.json chưa được capture — chỉ 2/~61KB field (form_header_title, product title) được xác nhận nội dung qua so sánh locale en/vi. Ảnh hưởng cả product-page-content-translation và dynamic-translations vì cả 2 đều dùng endpoint này làm negative evidence cho câu hỏi propagation."}
```

## OQ-translation-018 — OPEN_ISSUE

```json
{"oq_id": "OQ-translation-018", "type": "OPEN_ISSUE", "feature_id": null, "summary": "Nút 'Auto translate' và 'Export' trên cả 2 trang Translation (/product-page-content và /artwork-translations) chưa từng được test — tác dụng, chi phí, và hành vi phụ hoàn toàn chưa rõ."}
```

## OQ-translation-019 — OPEN_ISSUE

```json
{"oq_id": "OQ-translation-019", "type": "OPEN_ISSUE", "feature_id": null, "summary": "Không có test error-path (4xx/5xx) nào được thực hiện cho bất kỳ operation nào trong 6 API operation đã map của object Translation (GET shop-locales, PUT config-translations, POST translations/bulk, GET translations, POST localization, GET campaigns/{productId}.json)."}
```

## OQ-translation-020 — OPEN_ISSUE

```json
{"oq_id": "OQ-translation-020", "type": "OPEN_ISSUE", "feature_id": null, "summary": "Store thứ 2 (linh-explorer-2.myshopify.com) chưa từng được test cho bất kỳ feature nào của object Translation — toàn bộ run bootstrap chỉ dùng 1 store (linh-explorer.myshopify.com)."}
```

## OQ-translation-021 — OPEN_ISSUE

```json
{"oq_id": "OQ-translation-021", "type": "OPEN_ISSUE", "feature_id": null, "summary": "DB layer hoàn toàn không được khảo sát cho object Translation trong run bootstrap (db_observation bị tắt) — mọi kết luận về 'lưu trữ'/'persisted' trong KB hiện tại chỉ dựa trên API request/response, không phải DB schema thật đã xác nhận."}
```

## OQ-translation-022 — OPEN_ISSUE

```json
{"oq_id": "OQ-translation-022", "type": "OPEN_ISSUE", "feature_id": "dynamic-translations", "summary": "Domain-knowledge do user cung cấp sau khi context đã publish lần đầu (chưa verify bằng thao tác thật — xem KB-020/KB-021 trong features/dynamic-translations/kb.json): (1) entry point import thật sự cho Dynamic Translations có thể là nút 'Import to Translations' trên các trang LIST của Artwork/Product Base/Campaign, khác với nút 'Import' đã test trực tiếp trên /artwork-translations; (2) phạm vi field dịch được theo entity nguồn có thể rộng hơn banner UI hiện tại (bao gồm layer placeholder, artwork custom name, campaign custom name/label). Cần 1 lần khảo sát bổ sung (đúng nút import + entity có field thật) — có thể giúp giải quyết luôn OQ-translation-001."}
```

## OQ-translation-023 — OPEN_ISSUE

```json
{"oq_id": "OQ-translation-023", "type": "OPEN_ISSUE", "feature_id": "dynamic-translations", "summary": "Các hành vi Dynamic Translations nạp từ CCR CBS-001 (KB-022..KB-029) mới được verify trên staging cho TIB-5352 (Jira status QA Review, 3 PR còn OPEN, chỉ deploy staging); chưa release production. Cần re-verify (hoặc xác nhận) sau khi TIB-5352 lên production; trong lúc đó không dùng các item này để đánh giá hành vi production.", "kb_ids": ["KB-022", "KB-023", "KB-024", "KB-025", "KB-026", "KB-027", "KB-028", "KB-029"]}
```

## OQ-translation-024 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-translation-024", "type": "NEEDS_CONFIRMATION", "feature_id": "dynamic-translations", "summary": "Ngưỡng 1000 key để chuyển dictionary từ nhúng HTML sang API translations/<locale>.json (KB-022) là giá trị quan sát trên staging; Dev nói ngưỡng chỉnh được qua biến môi trường. Cần Dev xác nhận tên biến và giá trị trên production trước khi dùng 1000 làm boundary cho test production.", "kb_ids": ["KB-022"]}
```

## OQ-translation-025 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-translation-025", "type": "NEEDS_CONFIRMATION", "feature_id": "dynamic-translations", "summary": "Nhánh locale có 0 key đã dịch (Dev mô tả: hiện chữ gốc) chưa được verify — test case TC-TIB-004 blocked vì thiếu data. Cần test PASS hoặc xác nhận Dev/PO cho nhánh này (KB-022 cố ý không bao gồm).", "kb_ids": ["KB-022"]}
```

## OQ-translation-026 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-translation-026", "type": "NEEDS_CONFIRMATION", "feature_id": "dynamic-translations", "summary": "Độ trễ để HTML storefront nhận translation_version mới sau khi Save (KB-024: 30–45s ở một lần đo, ~30–70s theo tổng hợp vài mẫu) chưa có ngưỡng/SLA được xác nhận. Cần Dev/PO nêu khoảng trễ chấp nhận được (nếu có) để checklist có oracle.", "kb_ids": ["KB-024"]}
```

## OQ-translation-027 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-translation-027", "type": "NEEDS_CONFIRMATION", "feature_id": "dynamic-translations", "summary": "Endpoint public translations/<locale>.json trả 200 + full dictionary khi tham số v thiếu/rỗng/sai/rác, với cache-control 'immutable, max-age=31536000, private' khi có v và 'max-age=900, private' khi không có v (KB-025). Chỉ là quan sát; cần Dev/PO xác nhận đây có phải hành vi mong muốn không (đặc biệt cache immutable 1 năm với v sai/rác).", "kb_ids": ["KB-025"]}
```

## OQ-translation-028 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-translation-028", "type": "NEEDS_CONFIRMATION", "feature_id": "dynamic-translations", "summary": "Locale không tồn tại/chưa publish (xx-YY, pt-BR, zh-CN) trả 200 + dictionary ngôn ngữ chính (KB-026). CCR 4.2 nói KHÔNG coi đây là hành vi đúng. Cần Dev/PO xác nhận hành vi mong muốn (fallback primary hay 404).", "kb_ids": ["KB-026"]}
```

## OQ-translation-029 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-translation-029", "type": "NEEDS_CONFIRMATION", "feature_id": "dynamic-translations", "summary": "translations/zh-TW.json và zh-tw.json đều trả 200 với cùng dictionary (KB-027). Cần xác nhận so khớp mã locale không phân biệt hoa/thường là thiết kế (liên quan known issue Dev nêu về hoa/thường khi ghi metafield, chưa verify).", "kb_ids": ["KB-027"]}
```

## OQ-translation-030 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-translation-030", "type": "NEEDS_CONFIRMATION", "feature_id": "dynamic-translations", "summary": "Phản hồi của translations/<locale>.json với locale dị dạng ('..%2f..%2fx' 404, '<script>' 403 Cloudflare, 300 ký tự 404, %00 400, không stack trace — KB-028) chỉ là quan sát; cần Dev xác nhận đây là hành vi mong muốn trước khi dùng làm expected.", "kb_ids": ["KB-028"]}
```

## OQ-translation-031 — OPEN_ISSUE

```json
{"oq_id": "OQ-translation-031", "type": "OPEN_ISSUE", "feature_id": "dynamic-translations", "summary": "CCR CBS-001: các hành vi Dev mô tả trong comment Jira TIB-5352 nhưng chưa verify — API trả đúng dictionary cho locale có mã vùng viết hoa (trước 404); xoá locale lẻ/bulk save → bản dịch trên Shopify cập nhật lại; đổi ngôn ngữ chính → storefront đồng bộ lại; embed ngoài Shopify vẫn gọi API, không có version; known issue không sửa: so khớp hoa/thường mã ngôn ngữ khi ghi metafield, shop inactive/thiếu quyền không tự sync lại. Các test case liên quan (TC-TIB-013/018/019/020/022) blocked. Cần nguồn: test case PASS trên build có thay đổi, hoặc xác nhận Dev/PO trích nguyên văn được chấp nhận."}
```

## OQ-translation-032 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-translation-032", "type": "NEEDS_CONFIRMATION", "feature_id": "dynamic-translations", "summary": "Endpoint public translations/<locale>.json chỉ nhận diện shop qua tham số shop=<domain>: một shop có đọc được dictionary của shop khác không, và đây có phải ranh giới dữ liệu mong muốn? Test case cross-shop bị blocked (P1, permission).", "kb_ids": ["KB-025"]}
```

## OQ-translation-033 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-translation-033", "type": "NEEDS_CONFIRMATION", "feature_id": "dynamic-translations", "summary": "PO xác nhận Save ở một locale không làm thay đổi bản dịch của các locale khác (KB-023) là hành vi mong muốn. Kết hợp với việc Save thay toàn bộ tập bản dịch (KB-012), nếu sai sẽ mất bản dịch — check P1 CHK-016 dùng KB-023 làm oracle duy nhất.", "kb_ids": ["KB-023", "KB-012"]}
```
