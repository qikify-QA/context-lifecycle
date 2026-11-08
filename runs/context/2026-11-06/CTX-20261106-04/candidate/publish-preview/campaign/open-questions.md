# Open Questions — Campaign

Mỗi mục có 1 `oq_id` ổn định và đúng 1 `type` (`NEEDS_CONFIRMATION` | `CONFLICT` | `OPEN_ISSUE`).
`feature_id` `_object-level` = gap cross-cutting, áp dụng cho mọi feature của object.

## OQ-campaign-001 — OPEN_ISSUE

```json
{"oq_id": "OQ-campaign-001", "type": "OPEN_ISSUE", "feature_id": "_object-level", "summary": "Data layer (DB) hoàn toàn NOT_OBSERVED cho cả 6 feature của object Campaign: mọi state transition/state delta trong KB và profile chỉ dựa trên response REST/GraphQL, chưa từng được xác nhận bằng truy vấn DB thật (không có read-only DB access). Hệ quả: không biết record thực sự được ghi/xoá thế nào ở tầng persistence, và không có oracle cho bất kỳ check nào ở layer 'db'."}
```

## OQ-campaign-002 — OPEN_ISSUE

```json
{"oq_id": "OQ-campaign-002", "type": "OPEN_ISSUE", "feature_id": "_object-level", "summary": "Ý nghĩa chính xác của các enum số nguyên trên Campaign chưa có nguồn xác nhận: campaign.status=0, campaign_instances.status=5, campaign_activities.activities[].type=3 — chỉ quan sát được raw value. Ngoài ra status=1 cho campaigns/platform_products được SUY ĐOÁN là 'archived' dựa vào việc UI có tab 'Archived' (INFERRED, chưa xác nhận qua schema/enum documentation). Không được dùng các giá trị này làm oracle cho tới khi có schema/spec."}
```

## OQ-campaign-003 — OPEN_ISSUE

```json
{"oq_id": "OQ-campaign-003", "type": "OPEN_ISSUE", "feature_id": "_object-level", "summary": "Code/config layer chưa được khám phá cho object Campaign: không có source code app trong repo này nên không có fact nào ở mức implementation (route definition, feature flag, permission map, event/webhook). Mọi kết luận về capability đều là behaviour quan sát từ ngoài."}
```

## OQ-campaign-004 — OPEN_ISSUE

```json
{"oq_id": "OQ-campaign-004", "type": "OPEN_ISSUE", "feature_id": "_object-level", "summary": "Object Campaign KHÔNG có coverage buyer-facing/storefront của riêng nó: surface storefront (personalization, preview, pricing, add-to-cart, cart handoff) được theo dõi ở object độc lập 'sdk' (knowledge/products/teeinblue/objects/sdk/), không phải ở đây. Riêng chuỗi propagation 'publish campaign ở portal -> sản phẩm xuất hiện/cập nhật trên storefront' vẫn NOT_OBSERVED trong cùng một phiên: publish và quan sát storefront xảy ra ở 2 phiên khác nhau, nên độ trễ và điều kiện propagation chưa có evidence."}
```

## OQ-campaign-005 — OPEN_ISSUE

```json
{"oq_id": "OQ-campaign-005", "type": "OPEN_ISSUE", "feature_id": "_object-level", "summary": "Sequence FEAT-ID của object Campaign bị nhảy số: có FEAT-00..FEAT-04 và FEAT-06, KHÔNG có FEAT-05, và không có ghi chép nào giải thích FEAT-05 là gì hay vì sao bị bỏ. Cần xác nhận đây là số bỏ trống có chủ đích hay có một feature đã bị mất khi chuẩn hoá."}
```

## OQ-campaign-006 — OPEN_ISSUE

```json
{"oq_id": "OQ-campaign-006", "type": "OPEN_ISSUE", "feature_id": "_object-level", "summary": "Handle/URL Shopify thật của sản phẩm tương ứng campaign đã publish (campaign 2595, by-product-base) và của platform-product 531 (by-shopify) chưa được xác minh: portal evidence bị cắt ngắn và URL chỉ được suy ra bằng cách slugify tên. Chưa xác nhận được quy tắc sinh handle khi publish, nên không thể dùng URL để kiểm tra kết quả publish một cách tin cậy."}
```

## OQ-campaign-007 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-campaign-007", "type": "NEEDS_CONFIRMATION", "feature_id": "campaign-navigation", "summary": "Hành vi refresh token khi tab ở background/inactive — Token có tự refresh khi tab ở background/inactive không? Nếu không, có thể gây session-timeout giữa chừng workflow đa tab hoặc automation chạy dài.", "related_checks": ["CHK-003"]}
```

## OQ-campaign-008 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-campaign-008", "type": "NEEDS_CONFIRMATION", "feature_id": "campaign-navigation", "summary": "Sidebar/menu Campaigns có hiển thị khác nhau theo role khác owner hoặc theo feature-flag không — Role khác owner có thấy đúng 2 submenu như owner, thấy ít hơn, hay không thấy mục Campaigns nào? Chỉ 1 role được test trong run này.", "related_checks": ["CHK-004"]}
```

## OQ-campaign-009 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-campaign-009", "type": "NEEDS_CONFIRMATION", "feature_id": "campaign-navigation", "summary": "Điều hướng tới /campaigns hoặc /platform-products khi session hết hạn/token invalid — Ứng dụng có redirect về login, hiện lỗi rõ ràng, hay có hành vi không xác định khi session hết hạn giữa lúc thao tác? Chưa từng quan sát trong run này.", "related_checks": ["CHK-005"]}
```

## OQ-campaign-010 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-campaign-010", "type": "NEEDS_CONFIRMATION", "feature_id": "create-campaign-by-product-base", "summary": "UI có thực sự hiển thị lỗi (toast/inline) cho user khi validation title rỗng thất bại hay không — 422 từ API đã xác nhận, nhưng UI có hiển thị cho user biết Save thất bại hay im lặng? Nếu im lặng, đây là rủi ro silent-failure/UX nghiêm trọng.", "related_checks": ["CHK-009"]}
```

## OQ-campaign-011 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-campaign-011", "type": "NEEDS_CONFIRMATION", "feature_id": "create-campaign-by-product-base", "summary": "Giới hạn min/max length, ký tự đặc biệt, và uniqueness của Campaign title — Chỉ case rỗng được test; chưa biết rule đầy đủ cho length/ký tự đặc biệt/uniqueness của Campaign title.", "related_checks": ["CHK-010"]}
```

## OQ-campaign-012 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-campaign-012", "type": "NEEDS_CONFIRMATION", "feature_id": "create-campaign-by-product-base", "summary": "Hành vi Save Listing info với dữ liệu thật (Type/Vendor/Tags/Thumbnail) thay vì chỉ Cancel — Chỉ nhánh Cancel được test; hành vi Save với data thật (persist đúng field, validate ra sao) chưa quan sát.", "related_checks": ["CHK-011"]}
```

## OQ-campaign-013 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-campaign-013", "type": "NEEDS_CONFIRMATION", "feature_id": "create-campaign-by-product-base", "summary": "Role khác owner thao tác create/select/assign/edit-listing-info/publish trên flow này — Toàn bộ baseline permission chỉ dựa trên role owner; role hạn chế hơn có bị chặn đúng ở từng bước không — chưa test (xem FEAT-06).", "related_checks": ["CHK-012"]}
```

## OQ-campaign-014 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-campaign-014", "type": "NEEDS_CONFIRMATION", "feature_id": "create-campaign-by-product-base", "summary": "Enforcement cross-tenant ở tầng API cho publish endpoint (instance_id ngoài phạm vi caller) — READ surface (Multi-store launch) đã xác nhận trả dữ liệu toàn Organization; enforcement thực tế ở tầng mutation/publish cho instance_id ngoài phạm vi CHƯA được kiểm tra — rủi ro tenant-isolation.", "related_checks": ["CHK-013"]}
```

## OQ-campaign-015 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-campaign-015", "type": "NEEDS_CONFIRMATION", "feature_id": "create-campaign-by-product-base", "summary": "Trạng thái campaign có được giữ đúng sau khi hard reload (F5) trang edit — Run này không thực hiện test reload tường minh; state_transitions chỉ được xác nhận trong 1 phiên liên tục, chưa qua reload.", "related_checks": ["CHK-014"]}
```

## OQ-campaign-016 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-campaign-016", "type": "NEEDS_CONFIRMATION", "feature_id": "create-campaign-by-product-base", "summary": "Hành vi khi publish thất bại/partial (mockup xử lý bất đồng bộ lỗi) — Run này chỉ quan sát publish thành công; case publish thất bại/partial hoàn toàn chưa quan sát — chưa có oracle cho retry/rollback UX.", "related_checks": ["CHK-016"]}
```

## OQ-campaign-017 — OPEN_ISSUE

```json
{"oq_id": "OQ-campaign-017", "type": "OPEN_ISSUE", "feature_id": "create-campaign-by-product-base", "summary": "Multi-store launch: chưa rõ hệ thống có hỗ trợ publish đồng thời nhiều store trong 1 lần gọi hay bắt buộc gọi riêng từng store. Chỉ quan sát đúng 1 lần publish 1 store (request body luôn chỉ chứa 1 instance_id), chưa test nhánh batch — ảnh hưởng cách thiết kế test case publish nhiều store và kỳ vọng về hiệu năng."}
```

## OQ-campaign-018 — OPEN_ISSUE

```json
{"oq_id": "OQ-campaign-018", "type": "OPEN_ISSUE", "feature_id": "create-campaign-by-product-base", "summary": "Trạng thái header/top-bar của trang edit campaign by-product-base NGAY SAU khi publish và đóng dialog Multi-store launch chưa được xác minh trực tiếp: mô tả hiện có là suy đoán theo pattern của flow by-shopify, không có screenshot re-verify. Không được dùng làm oracle cho check post-publish UI."}
```

## OQ-campaign-019 — OPEN_ISSUE

```json
{"oq_id": "OQ-campaign-019", "type": "OPEN_ISSUE", "feature_id": "create-campaign-by-product-base", "summary": "DOM quirk ở STEP1: nút '+' thêm product base có một node ẩn/trùng lặp (getBoundingClientRect trả 0) mang cùng class-signature với node thật đang hiển thị. Đây là rủi ro cho locator của automation (dễ click vào node ẩn), KHÔNG kết luận là bug UI với người dùng thật. Cần xác nhận node ẩn này là gì (leftover template/portal render) trước khi viết selector bền cho STEP1."}
```

## OQ-campaign-020 — OPEN_ISSUE

```json
{"oq_id": "OQ-campaign-020", "type": "OPEN_ISSUE", "feature_id": "create-campaign-by-product-base", "summary": "Chức năng Preview / 'Generate test design' (xem trước sản phẩm ở góc nhìn buyer TRƯỚC khi publish) hoàn toàn chưa được khám phá: không có action nào được thực thi và không có endpoint nào được capture. Chưa biết nó tạo dữ liệu gì, có side effect gì, hay có cần dọn dẹp sau khi dùng."}
```

## OQ-campaign-021 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-campaign-021", "type": "NEEDS_CONFIRMATION", "feature_id": "create-campaign-by-shopify", "summary": "Validation 'No mockup' có tổng quát hoá đúng cho sản phẩm nhiều variant Shopify thật không — 'No mockup' chỉ có 1 sample (observed_count=1, LOW) trên store demo 1-variant; hành vi với sản phẩm nhiều variant thật hoàn toàn chưa kiểm chứng.", "related_checks": ["CHK-011"]}
```

## OQ-campaign-022 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-campaign-022", "type": "NEEDS_CONFIRMATION", "feature_id": "create-campaign-by-shopify", "summary": "Hành vi toggle 'Connect artworks with Shopify variants' khi bật (mặc định OFF, chưa test) — Toggle mặc định OFF và chưa từng được bật trong run này; ảnh hưởng thực tế lên UI/data mapping hoàn toàn chưa rõ.", "related_checks": ["CHK-012"]}
```

## OQ-campaign-023 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-campaign-023", "type": "NEEDS_CONFIRMATION", "feature_id": "create-campaign-by-shopify", "summary": "Role khác owner thao tác create/select/assign/upload/publish/unpublish trên flow này — Toàn bộ baseline permission chỉ dựa trên role owner; chưa test role hạn chế hơn (xem FEAT-06).", "related_checks": ["CHK-013"]}
```

## OQ-campaign-024 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-campaign-024", "type": "NEEDS_CONFIRMATION", "feature_id": "create-campaign-by-shopify", "summary": "Cross-tenant access tới platform-product endpoints — Chưa test bất kỳ cross-tenant case nào cho flow by-Shopify.", "related_checks": ["CHK-014"]}
```

## OQ-campaign-025 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-campaign-025", "type": "NEEDS_CONFIRMATION", "feature_id": "create-campaign-by-shopify", "summary": "Platform-product có action 'Delete' tương đương campaign hay chỉ có 'Unpublish' (archival-only) — Chỉ Unpublish (KB-024) được quan sát; chưa xác nhận đây là thiết kế archival-only cố ý hay chỉ chưa được khám phá trong run này (xem FEAT-04).", "related_checks": ["CHK-016"]}
```

## OQ-campaign-026 — OPEN_ISSUE

```json
{"oq_id": "OQ-campaign-026", "type": "OPEN_ISSUE", "feature_id": "create-campaign-by-shopify", "summary": "Chưa xác minh được 1 mockup mặc định có áp dụng đúng cho MỌI Shopify variant khi sản phẩm có nhiều variant thật, và việc assign mockup theo TỪNG variant có bắt buộc hay không: store test chỉ có sản phẩm demo 1 variant ('Default Title'). Liên quan CHK-011 nhưng là câu hỏi riêng về cơ chế áp mockup, không chỉ về validation 'No mockup'."}
```

## OQ-campaign-027 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-campaign-027", "type": "NEEDS_CONFIRMATION", "feature_id": "campaign-list-browse", "summary": "Chức năng thực tế của 'See campaign info' và 'View campaign logs' — 2 mục này chưa từng được thực thi trong run — chỉ biết UI tồn tại, chưa biết nội dung/hành vi thực tế.", "related_checks": ["CHK-006"]}
```

## OQ-campaign-028 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-campaign-028", "type": "NEEDS_CONFIRMATION", "feature_id": "campaign-list-browse", "summary": "Chức năng 'Duplicate campaign' (clone product/artwork/listing info, ảnh hưởng publish state ra sao) — Chưa từng thực thi; nếu bug có thể tạo dữ liệu trùng/hỏng không mong muốn — cần verify trước khi coi là an toàn.", "related_checks": ["CHK-007"]}
```

## OQ-campaign-029 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-campaign-029", "type": "NEEDS_CONFIRMATION", "feature_id": "campaign-list-browse", "summary": "Chức năng 'Mark as archive' và quan hệ với filter tab 'Archived' — Chưa từng thực thi; ảnh hưởng tới trạng thái publish/list hiện chưa rõ.", "related_checks": ["CHK-008"]}
```

## OQ-campaign-030 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-campaign-030", "type": "NEEDS_CONFIRMATION", "feature_id": "campaign-list-browse", "summary": "Chức năng 'Import to Translation' hoàn toàn chưa khám phá — Mục action hoàn toàn chưa được thực thi, mục đích/kết quả chưa rõ.", "related_checks": ["CHK-009"]}
```

## OQ-campaign-031 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-campaign-031", "type": "NEEDS_CONFIRMATION", "feature_id": "campaign-list-browse", "summary": "'Bulk creator' (/campaigns/bulk-editor) hoạt động thế nào — Entry point tồn tại trên list page nhưng ngoài phạm vi run, hoàn toàn chưa khám phá.", "related_checks": ["CHK-010"]}
```

## OQ-campaign-032 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-campaign-032", "type": "NEEDS_CONFIRMATION", "feature_id": "campaign-list-browse", "summary": "'Bulk Fulfill' hoạt động thế nào — Entry point tồn tại nhưng hoàn toàn chưa khám phá trong run này.", "related_checks": ["CHK-011"]}
```

## OQ-campaign-033 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-campaign-033", "type": "NEEDS_CONFIRMATION", "feature_id": "campaign-list-browse", "summary": "Filter/search (Search, Published on store, Internal Tags, Type, Vendor, Tags, Store) có lọc đúng kết quả với giá trị thật không — Chỉ quan sát UI filter tồn tại, chưa nhập giá trị thử nghiệm nào — đây là capability browse cốt lõi nhưng chưa có test chức năng.", "related_checks": ["CHK-012"]}
```

## OQ-campaign-034 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-campaign-034", "type": "NEEDS_CONFIRMATION", "feature_id": "campaign-list-browse", "summary": "Liên kết giữa mở menu '...' và 2 GraphQL query (instances, instances_aggregate) chỉ là co-occurrence, KHÔNG phải causation đã xác nhận — Chỉ quan sát proximity theo thời gian (có thể do prefetch icon rocket); KHÔNG dùng 'mở menu => 2 query chạy' làm wait-condition/oracle cho automation cho tới khi xác nhận causation.", "related_checks": ["CHK-013"]}
```

## OQ-campaign-035 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-campaign-035", "type": "NEEDS_CONFIRMATION", "feature_id": "campaign-list-browse", "summary": "Role khác owner có xem được cả 2 list đầy đủ như owner không — Chỉ role owner được test; chưa rõ role hạn chế hơn thấy list đầy đủ, list rút gọn, hay bị chặn hoàn toàn (xem FEAT-06).", "related_checks": ["CHK-014"]}
```

## OQ-campaign-036 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-campaign-036", "type": "NEEDS_CONFIRMATION", "feature_id": "campaign-list-browse", "summary": "Hành vi list khi hard reload hoặc pagination vượt quá offset=0 mặc định — Chỉ offset=0 mặc định được quan sát; pagination/reload behavior ngoài phạm vi đó chưa test.", "related_checks": ["CHK-015"]}
```

## OQ-campaign-037 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-campaign-037", "type": "NEEDS_CONFIRMATION", "feature_id": "campaign-delete", "summary": "Hiệu ứng khi TICK checkbox 'Remove artworks & product bases' trước khi xoá (remove_linked_resources=1) — Nhánh checkbox tick hoàn toàn chưa test — RỦI RO MẤT DỮ LIỆU nếu artwork/product base dùng chung bị xoá theo, ảnh hưởng campaign khác.", "related_checks": ["CHK-004"]}
```

## OQ-campaign-038 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-campaign-038", "type": "NEEDS_CONFIRMATION", "feature_id": "campaign-delete", "summary": "Xoá 1 campaign ĐÃ PUBLISH (có Shopify product thật liên kết) — Toàn bộ evidence xoá chỉ dựa trên campaign throwaway CHƯA từng publish; hành vi xoá campaign đã có Shopify product thật hoàn toàn chưa quan sát — ảnh hưởng buyer-facing thật nếu sai.", "related_checks": ["CHK-005"]}
```

## OQ-campaign-039 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-campaign-039", "type": "NEEDS_CONFIRMATION", "feature_id": "campaign-delete", "summary": "Xoá là hard-delete hay soft-delete ở tầng DB — DB layer bị skip trong run này; chỉ biết API trả 204 và record biến mất khỏi GraphQL list, KHÔNG xác nhận cơ chế xoá thật ở DB.", "related_checks": ["CHK-006"]}
```

## OQ-campaign-040 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-campaign-040", "type": "NEEDS_CONFIRMATION", "feature_id": "campaign-delete", "summary": "Platform-product (by-Shopify) có action Delete tương đương campaign, hay chỉ có Unpublish (archival-only) — FEAT-02 chỉ quan sát Unpublish (KB-024), không thấy Delete nào — chưa rõ đây là thiết kế archival-only cố ý hay chỉ chưa khám phá.", "related_checks": ["CHK-007"]}
```

## OQ-campaign-041 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-campaign-041", "type": "NEEDS_CONFIRMATION", "feature_id": "campaign-delete", "summary": "Role khác owner thực hiện Delete campaign — Chỉ role owner được test cho action xoá; chưa rõ role hạn chế hơn có bị chặn đúng không (xem FEAT-06).", "related_checks": ["CHK-008"]}
```

## OQ-campaign-042 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-campaign-042", "type": "NEEDS_CONFIRMATION", "feature_id": "campaign-delete", "summary": "Xoá 1 campaign đã publish có giải phóng khoá 'Used' của Shopify product tương ứng ở picker FEAT-02 không — Phụ thuộc CHK-005 (xoá campaign đã publish) vốn cũng chưa test; hiệu ứng lan sang trạng thái khoá ở FEAT-02 hoàn toàn chưa quan sát.", "related_checks": ["CHK-009"]}
```

## OQ-campaign-043 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-campaign-043", "type": "NEEDS_CONFIRMATION", "feature_id": "campaign-security-permissions", "summary": "Publish mutation (POST /publish {instance_id}) có tự chặn instance_id ngoài phạm vi caller ở tầng server hay không — READ surface đã xác nhận org-wide; enforcement thực tế ở tầng MUTATION cho instance_id ngoài phạm vi hoàn toàn chưa kiểm tra — nếu server không tự chặn, đây là lỗ hổng tenant-isolation nghiêm trọng.", "related_checks": ["CHK-004"]}
```

## OQ-campaign-044 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-campaign-044", "type": "NEEDS_CONFIRMATION", "feature_id": "campaign-security-permissions", "summary": "Role hạn chế hơn owner (không có manage-campaigns) bị chặn đúng ở Campaign mutation endpoints — Chưa từng test bất kỳ role nào khác owner; đây là rủi ro RBAC/regression cốt lõi chưa có evidence.", "related_checks": ["CHK-005"]}
```

## OQ-campaign-045 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-campaign-045", "type": "NEEDS_CONFIRMATION", "feature_id": "campaign-security-permissions", "summary": "User thuộc organization khác truy cập/thao tác dữ liệu Campaign của organization hiện tại — Chưa có evidence nào cho cross-tenant case trong run bootstrap này — coverage gap bảo mật lớn nhất của object Campaign.", "related_checks": ["CHK-006"]}
```

## OQ-campaign-046 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-campaign-046", "type": "NEEDS_CONFIRMATION", "feature_id": "campaign-security-permissions", "summary": "TIB_FORBIDDEN_TOKEN / TIB_INVALID_TOKEN bị từ chối đúng ở mọi Campaign endpoint — Case negative-auth cơ bản chưa được test lần nào trong run này.", "related_checks": ["CHK-007"]}
```

## OQ-campaign-047 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-campaign-047", "type": "NEEDS_CONFIRMATION", "feature_id": "campaign-security-permissions", "summary": "GraphQL mutation (insert_campaign_products, update_campaign_instances, v.v.) có tuân theo authorization boundary per-store/per-org như REST publish endpoint — READ surface GraphQL đã xác nhận org-wide (KB-030); nếu mutation cũng không chặn đúng phạm vi, đây là lỗ hổng nghiêm trọng chưa kiểm chứng.", "related_checks": ["CHK-008"]}
```

## OQ-campaign-048 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-campaign-048", "type": "NEEDS_CONFIRMATION", "feature_id": "campaign-security-permissions", "summary": "GraphQL schema đầy đủ (toàn bộ type/permission liên quan Campaign) chưa được introspect — Run này không introspect GraphQL schema; phạm vi type/permission đầy đủ cho Campaign chưa được xác nhận.", "related_checks": ["CHK-009"]}
```

## OQ-campaign-049 — OPEN_ISSUE

```json
{"oq_id": "OQ-campaign-049", "type": "OPEN_ISSUE", "feature_id": "create-campaign-by-product-base", "summary": "Preview trên mockup của Campaign Editor theo effective visibility của Group (TC-TIB-6072) có giữ nguyên trên build staging sau khi toàn bộ 6 PR của TIB-5584 merge, và trên production khi TIB-5584 release không?", "kb_ids": ["KB-184"]}
```

## OQ-campaign-050 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-campaign-050", "type": "NEEDS_CONFIRMATION", "feature_id": "create-campaign-by-product-base", "summary": "Khi đổi trạng thái ẩn/hiện của Group trên cùng một artwork đã gán vào campaign, preview trên mockup của Campaign Editor có cập nhật theo không (cần Save/sync campaign hay tự cập nhật)?", "kb_ids": ["KB-184"]}
```

## OQ-campaign-051 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-campaign-051","type":"NEEDS_CONFIRMATION","feature_id":"create-campaign-by-product-base","summary":"Grid của modal Assign mockups có luôn xếp item theo thứ tự list media của campaign (kể cả khi video nằm giữa list) không? Mới chỉ thấy trong actualResult của một lượt test.","kb_ids":["KB-301"]}
```

## OQ-campaign-052 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-campaign-052","type":"NEEDS_CONFIRMATION","feature_id":"create-campaign-by-product-base","summary":"Dev xác nhận request lưu assignment video ↔ variant (tên mutation, shape payload) trên bản đã merge có giữ như lượt test 2026-10-22 không. Mới chỉ thấy trong actualResult.","kb_ids":["KB-303"]}
```

## OQ-campaign-053 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-campaign-053","type":"NEEDS_CONFIRMATION","feature_id":"create-campaign-by-product-base","summary":"PO xác nhận: Duplicate campaign / Duplicate mockup ảnh có chủ ý giữ assignment mockup ảnh ↔ variant không? Quan sát nằm ngoài oracle của test case.","kb_ids":["KB-307"]}
```

## OQ-campaign-054 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-campaign-054","type":"NEEDS_CONFIRMATION","feature_id":"create-campaign-by-product-base","summary":"Sau khi fix BUG-360, sửa URL video trên bản đã merge có giữ id video và assignment, và storefront có phát URL mới không? Hiện chỉ là quan sát vì cùng request có BUG-360.","kb_ids":["KB-308"]}
```

## OQ-campaign-055 — OPEN_ISSUE

```json
{"oq_id":"OQ-campaign-055","type":"OPEN_ISSUE","feature_id":"create-campaign-by-product-base","summary":"Lỗi đã biết BUG-360: sửa URL video vẫn gửi lại thumbnail cũ nên thumbnail không đổi. Đã fix/retest chưa, trên bản nào, và thumbnail mong đợi sau khi sửa URL là gì? KB-309 không làm oracle.","kb_ids":["KB-309"]}
```

## OQ-campaign-056 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-campaign-056","type":"NEEDS_CONFIRMATION","feature_id":"create-campaign-by-product-base","summary":"Dev xác nhận request xoá video và xoá variant trên bản đã merge có như quan sát không; xoá variant khỏi campaign có cách nào khác ngoài đặt Unavailable? Mới chỉ thấy trong actualResult.","kb_ids":["KB-311"]}
```

## OQ-campaign-057 — OPEN_ISSUE

```json
{"oq_id":"OQ-campaign-057","type":"OPEN_ISSUE","feature_id":"create-campaign-by-product-base","summary":"Các hành vi gán video cho variant đã xác nhận (KB-300, KB-302, KB-304, KB-305, KB-306, KB-310) chỉ có lượt test PASS trên staging 2026-10-22, trước khi 4 PR của TIB-5428 merge (2026-10-27); production chưa kiểm. Cần chạy lại trên bản đã merge / production.","kb_ids":["KB-300","KB-302","KB-304","KB-305","KB-306","KB-310"]}
```

## OQ-campaign-058 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-campaign-058","type":"NEEDS_CONFIRMATION","feature_id":"create-campaign-by-product-base","summary":"PO xác nhận ý định (rủi ro mất dữ liệu): một lần Save sau không được xoá các assignment video ↔ variant đã có (KB-302, nguồn duy nhất là một test case PASS trước khi merge).","kb_ids":["KB-302"]}
```

## OQ-campaign-059 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-campaign-059","type":"NEEDS_CONFIRMATION","feature_id":"create-campaign-by-product-base","summary":"PO xác nhận ý định (rủi ro xoá dữ liệu): xoá video hoặc variant chỉ gỡ assignment của chính nó và không đụng các assignment khác (KB-310, nguồn duy nhất là một test case PASS trước khi merge).","kb_ids":["KB-310"]}
```

## OQ-campaign-060 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-campaign-060","type":"NEEDS_CONFIRMATION","feature_id":"create-campaign-by-shopify","summary":"PO xác nhận: picker của campaign by Shopify products hiển thị video bằng thumbnail của chính video (như campaign by Product Base)? Mới chỉ thấy trong actualResult.","kb_ids":["KB-313"]}
```

## OQ-campaign-061 — OPEN_ISSUE

```json
{"oq_id":"OQ-campaign-061","type":"OPEN_ISSUE","feature_id":"create-campaign-by-shopify","summary":"Chọn video trong modal Assign mockups của platform product (KB-312) chỉ có một lượt PASS trên staging 2026-10-22, trước khi 4 PR của TIB-5428 merge (2026-10-27), trên một platform product. Cần chạy lại trên bản đã merge / production.","kb_ids":["KB-312"]}
```

## OQ-campaign-062 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-campaign-062","type":"NEEDS_CONFIRMATION","feature_id":"create-campaign-by-shopify","summary":"Save assignment video ↔ variant cho platform product (campaign by Shopify products) — lưu, reload, sync lên Shopify — chưa từng được quan sát; cần nguồn xác nhận hoặc lượt test.","kb_ids":["KB-312"]}
```

## OQ-campaign-063 — OPEN_ISSUE

```json
{"oq_id":"OQ-campaign-063","type":"OPEN_ISSUE","feature_id":"campaign-shopify-media-sync","summary":"Rule Shopify variant image = mockup được gán đầu tiên khi variant có cả video và mockup (KB-314) chỉ có một lượt PASS trên staging 2026-10-22, trước khi 4 PR của TIB-5428 merge (2026-10-27), đọc qua storefront .json. Cần chạy lại trên bản đã merge / production, kiểm cả request sync và Shopify admin.","kb_ids":["KB-314"]}
```

## OQ-campaign-064 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-campaign-064","type":"NEEDS_CONFIRMATION","feature_id":"campaign-shopify-media-sync","summary":"Video từ URL hợp lệ có luôn vào Shopify product media, không variant Shopify nào được gán video, và mapping video ↔ variant chỉ giữ phía Teeinblue không? Test case chưa PASS trọn oracle; cần chạy lại với video hợp lệ trên bản đã merge.","kb_ids":["KB-315"]}
```

## OQ-campaign-065 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-campaign-065","type":"NEEDS_CONFIRMATION","feature_id":"campaign-shopify-media-sync","summary":"Dev xác nhận: lỗi 'Can not upload images to shopify' khi publish/sync campaign có một URL Vimeo có tồn tại trước tính năng gán video không, do URL hay do tính năng; app có nên báo rõ video nào hỏng?","kb_ids":["KB-316"]}
```

## OQ-campaign-066 — OPEN_ISSUE

```json
{"oq_id":"OQ-campaign-066","type":"OPEN_ISSUE","feature_id":"campaign-shopify-media-sync","summary":"Lỗi đã biết BUG-362: variant chỉ gán video vẫn nhận ảnh đầu tiên làm Shopify variant image. Đã fix/retest chưa, trên bản nào? KB-317 không làm oracle.","kb_ids":["KB-317"]}
```

## OQ-campaign-067 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-campaign-067","type":"NEEDS_CONFIRMATION","feature_id":"campaign-shopify-media-sync","summary":"PO xác nhận ý định: variant chỉ gán video (không có mockup) thì Shopify variant image để trống? Mô tả ticket chưa đủ làm nguồn xác nhận; sau khi fix BUG-362 cần chạy lại case tương ứng.","kb_ids":["KB-317"]}
```

## OQ-campaign-068 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-campaign-068","type":"NEEDS_CONFIRMATION","feature_id":"create-campaign-by-product-base","summary":"Dev xác nhận phần network của các hành vi KB-306/KB-310 trên bản đã merge: response duplicate video và response clone campaign có chứa mapping video ↔ variant không; request load lại assignment sau khi xoá video/variant có còn mapping của video/variant đã xoá không. Lượt test 2026-10-22 chỉ kiểm qua view Mockup assignments, chưa thấy các bước network này.","kb_ids":["KB-306","KB-310"]}
```

## OQ-campaign-069 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-campaign-069","type":"NEEDS_CONFIRMATION","feature_id":"create-campaign-by-product-base","summary":"Re-publish campaign qua Update trong Multi-store launch (POST /api/campaigns/{id}/sync) mới quan sát 1 lượt (TC-TIB-7408) trên build trước redeploy, không thấy toast. PO xác nhận hành vi đúng (có toast thành công không; metafield version có phải đổi và khớp tham số v SDK dùng không); chạy lại sau merge. KB-308 (storefront phát URL video mới sau Update, quan sát 2026-10-22 trước khi có cache) có thể đã cũ — re-verify sau merge.","kb_ids":["KB-370","KB-308"]}
```

## OQ-campaign-070 — OPEN_ISSUE

```json
{"oq_id":"OQ-campaign-070","type":"OPEN_ISSUE","feature_id":"create-campaign-by-product-base","summary":"Metafield version đổi sau re-publish qua Update (KB-370) có liên hệ gì với tham số v trong URL SDK mà storefront dùng để tải payload campaign không — tức là sau Update storefront có nhận nội dung mới không? KB-370 chỉ ghi metafield version đổi và form tải đủ, chưa kiểm nội dung mới; phía sdk có quan sát URL ?v=1 vẫn trả bản cũ sau Update/Sync. Không suy ra 'Update làm storefront cập nhật' khi chưa có xác nhận.","kb_ids":["KB-370"]}
```

## OQ-campaign-071 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-campaign-071", "type": "NEEDS_CONFIRMATION", "feature_id": "create-campaign-by-product-base", "summary": "Xác nhận khác biệt môi trường của Generate test design (KB-450): trên dev store control này có đúng là bị disable không, Production hành xử thế nào, và đặt order test rồi lấy design của order có phải cách thay thế đúng không. Nguồn hiện chỉ là ghi chú QA, chưa có người xác nhận rõ ràng. Liên quan OQ-campaign-020 (chức năng Generate test design chưa được khám phá).", "kb_ids": ["KB-450"], "related_checks": ["CHK-039"]}
```

## OQ-campaign-072 — OPEN_ISSUE

```json
{"oq_id": "OQ-campaign-072", "type": "OPEN_ISSUE", "feature_id": "campaign-artwork-mockup-reflection", "summary": "Hành vi khi replace hoặc remove artwork của campaign by platform products và Boundless: ticket đã trả lời tới đâu và phần còn lại là gì. Trạng thái ship chưa rõ: theo Jira, TIB-5282 đang Re-open, PR chưa merge, xếp sprint tương lai (dữ liệu PR có thể cũ). Description ticket viết lại 2026-11-04 (vai trò người viết chưa xác định) có 11 acceptance criteria cho action Replace artwork mới, chưa qua QA nên chưa dùng làm expected. Hai nguồn không khớp ở phần replace. Dev, comment #54805, 2026-10-16: sau fix, replace thì mockup hiện artwork mới mà không cần đặt lại, remove hẳn thì mockup không còn artwork. Description 2026-11-04: remove artwork cũng gỡ layer khỏi mockup, đó là hành vi đúng, merchant phải mở từng mockup đặt lại; hướng giải quyết là action Replace artwork. Comment dev còn nói Boundless một artwork mỗi campaign, trong khi description và AC nói chung cho cả ba loại campaign, có trường hợp campaign nhiều artwork; vế này không nạp. Phần 11 AC chưa trả lời: người có thẩm quyền xác nhận AC là hành vi đích chưa, fix của dev có bị action Replace thay thế không, và Boundless có giới hạn một artwork mỗi campaign không. KB chưa có item và không check nào có expected về các hành vi này.", "kb_ids": ["KB-451"]}
```

## OQ-campaign-073 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-campaign-073", "type": "NEEDS_CONFIRMATION", "feature_id": "campaign-artwork-mockup-reflection", "summary": "Vế Add Artwork theo từng mockup (KB-451) có áp cho campaign Shopify và Etsy không. Nguồn dev chỉ nói Boundless, nên chưa có oracle cho hai loại này. Nếu có áp thì cần đọc lại KB-019.", "kb_ids": ["KB-451"]}
```

## OQ-campaign-074 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-campaign-074", "type": "NEEDS_CONFIRMATION", "feature_id": "campaign-artwork-mockup-reflection", "summary": "Mockup mang sẵn layer artwork nhờ Duplicate hoặc Import có phải ngoại lệ của chữ \"chỉ\" trong KB-451 không. Flow Boundless ghi Duplicate giữ layer artwork; KB-451 chưa phát biểu về trường hợp này.", "kb_ids": ["KB-451"], "related_checks": ["CHK-001"]}
```

## OQ-campaign-075 — OPEN_ISSUE

```json
{"oq_id": "OQ-campaign-075", "type": "OPEN_ISSUE", "feature_id": "campaign-artwork-mockup-reflection", "summary": "KB chưa có điểm vào của feature: đường tạo campaign Boundless và mở editor của mockup. Flow Boundless và flow mockup editor có mô tả thao tác, nhưng chưa nạp vào KB nên profile chưa dùng làm entry point.", "kb_ids": ["KB-451"]}
```

## OQ-campaign-076 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-campaign-076", "type": "NEEDS_CONFIRMATION", "feature_id": "campaign-publication-history", "summary": "Việc chưa cắt độ dài và chưa lọc nội dung message của exception trong Publication History (KB-452) là chủ đích hay tạm thời. Nếu tạm thời thì giới hạn độ dài và quy tắc lọc dự kiến là gì. Dev mô tả trạng thái hiện tại bằng chữ \"chưa\", nên vế này chưa dùng làm expected.", "kb_ids": ["KB-452"], "related_checks": ["CHK-004"]}
```

## OQ-campaign-077 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-campaign-077", "type": "NEEDS_CONFIRMATION", "feature_id": "campaign-publication-history", "summary": "Dòng \"<thời gian> Published to Shopify\" của lượt thành công có phải message không. KB-452 ghi thành công không có message, flow publish sync ghi có dòng đó. CHK-001 ghi nguyên văn dòng này và chưa kết luận.", "kb_ids": ["KB-452"], "related_checks": ["CHK-001"]}
```

## OQ-campaign-078 — OPEN_ISSUE

```json
{"oq_id": "OQ-campaign-078", "type": "OPEN_ISSUE", "feature_id": "campaign-publication-history", "summary": "Cách tạo một lượt publish lỗi của Campaign by Shopify trên staging. Chưa có cách nên CHK-002, CHK-003 chưa chạy được. Điểm vào Logs > Publication History có ở flow publish sync nhưng chưa nạp vào KB.", "kb_ids": ["KB-452"], "related_checks": ["CHK-002", "CHK-003", "CHK-004"]}
```

## OQ-campaign-079 — OPEN_ISSUE

```json
{"oq_id": "OQ-campaign-079", "type": "OPEN_ISSUE", "feature_id": "campaign-publication-history", "summary": "Publication History của Campaign by Product Base có theo cùng quy tắc message như KB-452 không. KB-452 chỉ phát biểu cho Campaign by Shopify. Phần Boundless và Open platform product có trong comment dev TIB-5337 #55809 mục 9 nhưng chưa nạp vào KB.", "kb_ids": ["KB-452"]}
```

## OQ-campaign-080 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-campaign-080", "type": "NEEDS_CONFIRMATION", "feature_id": "campaign-artwork-mockup-reflection", "summary": "Cần người có quyền đọc Jira đối chiếu comment #54805 của TIB-5282, gồm câu về Add Artwork và câu 'Scope: Boundless campaigns only'. Chưa có người đối chiếu nên KB-451 đang là PROPOSED/LOW, không làm oracle; CHK-001, CHK-002 chưa có expected. Đối chiếu xong mới xét nâng KB-451.", "kb_ids": ["KB-451"], "related_checks": ["CHK-001", "CHK-002"]}
```

## OQ-campaign-081 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-campaign-081", "type": "NEEDS_CONFIRMATION", "feature_id": "campaign-publication-history", "summary": "Cần người có quyền đọc Jira đối chiếu comment #55809 của TIB-5337, gồm mục '4. Message' và mục '9. Phạm vi' (chỉ Campaign by Shopify). Chưa có người đối chiếu nên KB-452 đang là PROPOSED/LOW, không làm oracle; CHK-001, CHK-002, CHK-003 chưa có expected. Đối chiếu xong mới xét nâng KB-452.", "kb_ids": ["KB-452"], "related_checks": ["CHK-001", "CHK-002", "CHK-003"]}
```

## OQ-campaign-082 — OPEN_ISSUE

```json
{"oq_id": "OQ-campaign-082", "type": "OPEN_ISSUE", "feature_id": "campaign-publication-history", "summary": "Lượt publish Campaign by Shopify qua MCP trên staging có dòng ở Edit Activities nhưng không có row trong Publication History, theo comment Jira TIB-5337 #55858 của QA và #55862 của dev, 2026-10-28; dev ghi để ticket sau. Nguồn là comment Jira, chưa xác minh trên hệ thống. Cần biết ticket nào xử lý luồng này. Tới lúc đó check của feature chỉ xét lượt publish từ portal, không báo bug vì thiếu row của lượt qua MCP.", "kb_ids": ["KB-452"]}
```
