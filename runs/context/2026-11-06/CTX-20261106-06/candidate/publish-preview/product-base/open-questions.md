# Open Questions — Product Base

## OQ-product-base-001 — CONFLICT

```json
{"oq_id": "OQ-product-base-001", "type": "CONFLICT", "feature_id": "mockup-attachment", "summary": "Ngưỡng pixel thực sự kích hoạt resize mockup (960, 1000, hay giá trị khác) chưa xác định — 2 lần đo trực tiếp độc lập đều mâu thuẫn với lời PO.", "side_a": "PO xác nhận (2026-09-14): ngưỡng resize là 1000px — ảnh nhỏ hơn 1000px sẽ không bị resize.", "side_b": "Đo trực tiếp 2 lần độc lập: ảnh 999px KHÔNG bị resize (loại trừ ngưỡng 960px); sau đó upload riêng lẻ (không đồng thời, loại trừ nhiễu do giới hạn concurrency ~3 file) cả ảnh 999px VÀ 1001px đều KHÔNG bị resize, xác nhận qua cả API và đo pixel thật trên CDN — mâu thuẫn trực tiếp với con số 1000px của PO. Ngưỡng thật (nếu có) vẫn chưa xác định; cần test ở pixel > 1001px (vd 1500/2000/3000px) hoặc PO/dev xác nhận resize không đơn giản dựa trên width/height (có thể là DPI, dung lượng file, tỷ lệ cạnh)."}
```

## OQ-product-base-002 — CONFLICT

```json
{"oq_id": "OQ-product-base-002", "type": "CONFLICT", "feature_id": "product-base-campaign-link", "summary": "Độ tin cậy của việc ghi Activity Log object-level (product_activities) cho hành động 'tạo Printarea mới' không nhất quán giữa 2 lần kiểm thử cho cùng 1 loại hành động.", "side_a": "Lần kiểm thử 1: tạo 1 printarea mới thật, đọc lại product_activities nhiều lần sau đó (từ vài giây đến vài chục giây) — TẤT CẢ đều trả về RỖNG. Không quan sát được request nào ghi log cho hành động này.", "side_b": "Lần kiểm thử khác (cùng loại hành động: tạo 1 printarea mới thật): product_activities lúc đầu cũng rỗng, nhưng ngay sau đó xuất hiện request ghi log và đọc lại cho kết quả CÓ 1 entry.", "notes": "Nguyên nhân sự không nhất quán CHƯA XÁC ĐỊNH (có thể do UI-path khác nhau, feature-flag, hoặc thời điểm). KHÔNG được giả định log 'luôn' hay 'không bao giờ' xuất hiện sau khi tạo printarea. Cần lặp lại tạo thêm 2-3 printarea trên CÙNG 1 phiên/product để xác định đây là hành vi flaky/có điều kiện hay lỗi tạm thời."}
```

## OQ-product-base-003 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-product-base-003", "type": "NEEDS_CONFIRMATION", "feature_id": "mockup-attachment", "summary": "Upload file sai định dạng làm mockup (vd .txt đổi tên .png) không bị chặn ở client; kết quả kẹt ở trạng thái 'Rendering' vĩnh viễn, không báo lỗi rõ cho user. Backend nhận và tạo bản ghi (width=0, height=0, url rỗng) nhưng render thất bại âm thầm. Cần PO/Dev xác nhân: (1) đây có phải bug cần fix (thiếu validate định dạng ở client/server) hay chấp nhận được; (2) nếu chấp nhận được, có cần thêm thông báo lỗi rõ ràng cho user hay không."}
```

## OQ-product-base-004 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-product-base-004", "type": "NEEDS_CONFIRMATION", "feature_id": "mockup-attachment", "summary": "'Sync to campaigns' trên 1 mockup card bị chặn hoàn toàn ở CLIENT ('Mockup is not used in any campaign.') dù chính Product Base đang liên kết THẬT với 1 campaign (need_sync=true) — không có request nào được gửi để kiểm tra hay thực hiện sync. Cần PO/Dev xác nhận điều kiện đúng để 1 mockup được coi là 'used in a campaign', và đây là by-design hay bug."}
```

## OQ-product-base-005 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-product-base-005", "type": "NEEDS_CONFIRMATION", "feature_id": "printarea-definition", "summary": "Rủi ro bảo mật P1 chưa xác minh: client gửi thẳng table-level mutation Hasura (insert_printareas/update_printareas) với `_set` tuỳ ý từ trình duyệt, dùng JWT user thường — đã xác nhận đường này hoạt động thành công cho giá trị hợp lệ, nhưng phạm vi cột/hàng THỰC SỰ được phép sửa (field ẩn, printarea không thuộc quyền sở hữu, hay cross-tenant) chưa được kiểm bằng bất kỳ negative test hay cross-tenant test nào (thiếu tài khoản thứ 2 để test). Ưu tiên P1, cần account thứ 2 (khác store) để kiểm tra."}
```

## OQ-product-base-006 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-product-base-006", "type": "NEEDS_CONFIRMATION", "feature_id": "product-base-browse", "summary": "Hành vi cursor pagination của /products khi store có >20 bản ghi hoàn toàn chưa kiểm được (nút ‹ › chuyển trang ra sao, cursor có được giữ đúng khi quay lại không) — store hiện tại chỉ có 3 bản ghi nên cả 2 nút đều disabled. Cần seed dữ liệu (>20 bản ghi) hoặc PO/Dev xác nhận cơ chế mong đợi."}
```

## OQ-product-base-007 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-product-base-007", "type": "NEEDS_CONFIRMATION", "feature_id": "product-base-browse", "summary": "Rủi ro cursor trong URL bị stale nếu 1 Product Base mới được tạo trong lúc user đang ở trang edit rồi quay lại /products bằng URL cũ — được domain-expert nêu ra như rủi ro có thật nhưng chưa tái hiện được bằng evidence thực nghiệm (store chỉ có 3 bản ghi, chưa từng có >1 trang). Cần 1 lần kiểm tra riêng với dữ liệu seed (>20 bản ghi)."}
```

## OQ-product-base-008 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-product-base-008", "type": "NEEDS_CONFIRMATION", "feature_id": "product-base-campaign-link", "summary": "Activity Log (product_activities) RỖNG HOÀN TOÀN qua cả 3 loại cập nhật thật (Internal tags/Printarea/Variant) trong cùng 1 phiên kiểm thử — trái với kỳ vọng ban đầu của PO rằng ít nhất một vài loại thao tác có thể được ghi log. Phạm vi test vẫn hẹp (1 product, 1 chuỗi hành động; chưa test Mockup-only). KHÔNG được tự kết luận 'hệ thống log hoàn toàn không hoạt động' hay 'hoạt động bình thường, đây chỉ là ngoại lệ' — xem thêm OQ-product-base-002 về tính không nhất quán của log này giữa các lần thử."}
```

## OQ-product-base-009 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-product-base-009", "type": "NEEDS_CONFIRMATION", "feature_id": "product-base-create", "summary": "Title/Label chấp nhận HTML thô (server không sanitize); cách hiển thị escape KHÔNG NHẤT QUÁN giữa 2 vị trí trên cùng 1 dòng của danh sách Product Base — dòng link tiêu đề escape đúng, dòng label bên dưới KHÔNG escape (chữ in đậm hiển thị thật, thẻ <img> được chèn thật vào DOM dù onerror không thực thi trong mẫu đã thử). Payload chứa <script> bị chặn ở tầng mạng (WAF/CORS), không phải app validation. Cần security reviewer xác nhận mức độ nghiêm trọng thực sự (có khai thác được XSS qua vector khác không) và đây là bug cần fix ưu tiên cao hay chấp nhận được."}
```

## OQ-product-base-010 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-product-base-010", "type": "NEEDS_CONFIRMATION", "feature_id": "variant-catalog", "summary": "Import 1 file Excel HỢP LỆ (tải từ chính 'Download template', điền đúng cấu trúc) qua modal Import variant trả về HTTP 500 — lặp lại 2/2 lần với 2 cách tạo file khác nhau, loại trừ nguyên nhân định dạng phía client. Ảnh hưởng trực tiếp chức năng cốt lõi (import variant hàng loạt hoàn toàn không dùng được). Cần dev xác nhận đây là bug cần fix hay hành vi tạm thời (vd do môi trường staging thiếu cấu hình)."}
```

## OQ-product-base-011 — OPEN_ISSUE

```json
{"oq_id": "OQ-product-base-011", "type": "OPEN_ISSUE", "feature_id": "printarea-definition", "summary": "Sau khi xoá 1 printarea đang được variant tham chiếu, liên kết cũ được giữ lại dưới dạng orphan row trong bảng variant_printareas (đã xác nhận vị trí dữ liệu này với PO). Orphan row này có tồn tại VĨNH VIỄN qua thời gian dài hay bị dọn dẹp bởi một cleanup job nào đó chưa được xác minh — mới chỉ quan sát trong phạm vi 1 phiên kiểm thử ngắn ở cả 2 lần thử. Câu hỏi 'đây là bug cần fix hay hành vi chấp nhận được' cũng vẫn còn mở."}
```

## OQ-product-base-012 — OPEN_ISSUE

```json
{"oq_id": "OQ-product-base-012", "type": "OPEN_ISSUE", "feature_id": "product-base-campaign-link", "summary": "Toàn bộ đường GHI của quan hệ Product Base ↔ Campaign (bấm nút 'Update campaign' để đồng bộ, thêm Product Base vào 1 campaign có sẵn qua nút riêng trên trang campaign) không có bất kỳ bằng chứng API/DB nào — nằm trong phạm vi mutation bị hạn chế của lần khảo sát. Toàn bộ capability của khu vực này hiện chỉ dựa trên quan sát UI tĩnh (control tồn tại, entry point, nội dung modal), KHÔNG dùng được làm oracle cho hành vi ghi thực tế. Cần một lượt khảo sát riêng với phạm vi mutation phù hợp trước khi coi context này là đầy đủ."}
```

## OQ-product-base-013 — OPEN_ISSUE

```json
{"oq_id": "OQ-product-base-013", "type": "OPEN_ISSUE", "feature_id": "variant-catalog", "summary": "Cột 'Custom Printareas' từng bị ghi nhận (finding cũ, nay đánh dấu stale) là luôn hiện 'No printareas' không tìm được cách gán từ UI; finding mới hơn cho thấy đường UI hoạt động đúng nếu bật đúng toggle 'Custom variant's printarea' TRƯỚC khi thử. Lý do khác biệt giữa 2 lần quan sát này (thiếu tiền điều kiện ở lần thử cũ, hay hành vi hệ thống thực sự thay đổi) CHƯA được xác minh dứt điểm — finding cũ được giữ lại song song, không xoá, chỉ đánh dấu stale."}
```

## OQ-product-base-014 — OPEN_ISSUE

```json
{"oq_id": "OQ-product-base-014", "type": "OPEN_ISSUE", "feature_id": "mockup-attachment", "summary": "Mockup Editor có hỗ trợ Group không (cần PO)? Quan sát 2026-10-16: layer phẳng, ẩn layer Group 'MKG' không làm layer khác ngừng render (TC-TIB-6073 Fail, BUG-325; Testlane ghi passed). R19 (cascade trong Mockup Editor, đáp án Slack Q10a không rõ người trả lời) không nạp làm expected. Chưa kiểm Save + render lại mockup; Q12: mockup đã render ở Campaign/storefront có tự cập nhật sau khi ẩn Group không.", "kb_ids": ["KB-185"]}
```

## OQ-product-base-015 — OPEN_ISSUE

```json
{"oq_id": "OQ-product-base-015", "type": "OPEN_ISSUE", "feature_id": "mockup-attachment", "summary": "Sau khi ẩn layer Group trong Mockup Editor rồi Save, mockup được render lại thế nào (có hay không có nội dung của Group và các layer con)?", "kb_ids": ["KB-185"]}
```

## OQ-product-base-016 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-product-base-016", "type": "NEEDS_CONFIRMATION", "feature_id": "mockup-attachment", "summary": "Mockup đã render và đang hiển thị ở Campaign/storefront có tự cập nhật sau khi ẩn Group trong Mockup Editor không, hay cần sync/render lại thủ công?", "kb_ids": ["KB-185"]}
```

## OQ-product-base-017 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-product-base-017","type":"NEEDS_CONFIRMATION","feature_id":"variant-add-to-campaigns","summary":"Khi vùng chọn ở bảng Variants lẫn variant Unavailable, modal Add to campaigns chỉ nhận variant Available và N chỉ đếm Available (quan sát TC-TIB-5030, staging 2026-10-09; dev gọi là giới hạn đã biết). PO/business xác nhận đây là hành vi đúng?","kb_ids":["KB-189"]}
```

## OQ-product-base-018 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-product-base-018","type":"NEEDS_CONFIRMATION","feature_id":"variant-add-to-campaigns","summary":"Khi TOÀN BỘ vùng chọn là variant Unavailable thì nút (+) / modal Add to campaigns hành xử thế nào (RA Q1)? Chưa có test case nào phủ ca này.","kb_ids":["KB-188"]}
```

## OQ-product-base-019 — OPEN_ISSUE

```json
{"oq_id":"OQ-product-base-019","type":"OPEN_ISSUE","feature_id":"variant-add-to-campaigns","summary":"Known defect BUG-262: modal không có hint về variant Unavailable bị bỏ qua (TC-TIB-5030 Fail 2026-10-09; Testlane ghi passed nhưng không có lần chạy lại có ngày). Đã sửa chưa, trên build nào, nội dung/vị trí hint cuối cùng là gì, banner \"Adding N variants...\" có đổi không (RA Q11)?","kb_ids":["KB-190","KB-187"]}
```

## OQ-product-base-020 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-product-base-020","type":"NEEDS_CONFIRMATION","feature_id":"variant-add-to-campaigns","summary":"Select-all và Add trong modal chỉ áp dụng cho 25 campaign của trang đang xem (quan sát TC-TIB-5037, staging 2026-10-09; dev gọi là giới hạn đã biết, không phải thiết kế chốt). PO có giữ phạm vi theo trang không?","kb_ids":["KB-193"]}
```

## OQ-product-base-021 — OPEN_ISSUE

```json
{"oq_id":"OQ-product-base-021","type":"OPEN_ISSUE","feature_id":"variant-add-to-campaigns","summary":"Known defect BUG-263: select-all không có label phạm vi, và ở trang 2 checkbox header vẫn hiện đã tick dù campaign không được tick (TC-TIB-5037 Fail 2026-10-09). Đã sửa chưa, trên build nào, label cuối cùng là gì?","kb_ids":["KB-194"]}
```

## OQ-product-base-022 — OPEN_ISSUE

```json
{"oq_id":"OQ-product-base-022","type":"OPEN_ISSUE","feature_id":"variant-add-to-campaigns","summary":"Known defect BUG-261: câu hỏi trong confirmation \"Add variants to campaigns\" không nêu số campaign và không nói về variant inactive (TC-TIB-5039 Fail 2026-10-09). Đã sửa chưa, câu cuối cùng được chốt là gì, ai chốt?","kb_ids":["KB-196"]}
```

## OQ-product-base-023 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-product-base-023","type":"NEEDS_CONFIRMATION","feature_id":"variant-add-to-campaigns","summary":"Sau Add thành công modal vẫn mở, campaign được bỏ tick, cột K/N cập nhật, campaign N/N bị disable (quan sát phụ TC-TIB-5052). RA Q6 còn treo: modal nên đóng hay giữ mở sau khi thành công?","kb_ids":["KB-198"]}
```

## OQ-product-base-024 — OPEN_ISSUE

```json
{"oq_id":"OQ-product-base-024","type":"OPEN_ISSUE","feature_id":"variant-add-to-campaigns","summary":"Known defect BUG-264: sau Add thành công, vùng chọn ở bảng Variants không được clear và Delete selected vẫn enabled (TC-TIB-5045 Fail 2026-10-09; Testlane ghi passed và đã gỡ BUG-264 khỏi case nhưng không có lần chạy lại có ngày). Vì Delete selected xoá ngay không xác nhận (KB-079), vùng chọn còn sót có thể dẫn tới xoá nhầm. Đã sửa chưa, ai gỡ bug, hành vi mong đợi là clear hay giữ vùng chọn? Cần owner (PO) xác nhận ý định: sau Add thành công, vùng chọn phải được clear hay giữ lại?","kb_ids":["KB-199"]}
```

## OQ-product-base-025 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-product-base-025","type":"NEEDS_CONFIRMATION","feature_id":"variant-add-to-campaigns","summary":"Bulk Add gửi một mutation insert chung cho mọi campaign được tick (quan sát TC-TIB-5046). Dev xác nhận đây là thiết kế? Nhánh lỗi một phần (một số campaign ghi được, số khác lỗi — RA R9) có tồn tại không, nếu có thì dữ liệu/UI phải ra sao? Chưa có test case phủ nhánh này.","kb_ids":["KB-200"]}
```

## OQ-product-base-026 — OPEN_ISSUE

```json
{"oq_id":"OQ-product-base-026","type":"OPEN_ISSUE","feature_id":"variant-add-to-campaigns","summary":"Known defect BUG-265: khi mutation insert lỗi, UI vẫn hiện toast \"Success – Variants are added to selected campaigns\" và bỏ tick mọi campaign trong khi dữ liệu không được ghi (TC-TIB-5046 Fail 2026-10-09) — rủi ro mất dữ liệu âm thầm. Đã sửa chưa, trên build nào, UI phải báo lỗi thế nào? Cần owner (PO) xác nhận ý định: khi insert lỗi, UI phải báo lỗi và giữ tick campaign như thế nào?","kb_ids":["KB-201"]}
```

## OQ-product-base-027 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-product-base-027","type":"NEEDS_CONFIRMATION","feature_id":"variant-add-to-campaigns","summary":"Cột K/N có đếm cả variant đã có trong campaign nhưng đang tắt (inactive) không, và Add có bật lại variant đang tắt không (RA R7/R8)? Hiện chưa có artifact chứng minh (case liên quan không có actualResult / bị Blocked), context không có expected cho ca campaign có variant inactive.","kb_ids":["KB-191","KB-197"]}
```

## OQ-product-base-028 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-product-base-028","type":"NEEDS_CONFIRMATION","feature_id":"variant-add-to-campaigns","summary":"Role/plan nào được dùng bulk Add to campaigns từ bảng Variants? Mới chỉ quan sát với merchant-owner; chưa có oracle cho phân quyền.","kb_ids":[]}
```

## OQ-product-base-029 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-product-base-029","type":"NEEDS_CONFIRMATION","feature_id":"variant-catalog","summary":"Cmd-click trên macOS có chọn thêm/bỏ chọn từng dòng trong bảng Variants giống Ctrl-click trên Windows không? Mới chỉ kiểm Ctrl/Shift-click trên Windows.","kb_ids":["KB-186"]}
```

## OQ-product-base-030 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-product-base-030","type":"NEEDS_CONFIRMATION","feature_id":"variant-catalog","summary":"Delete selected trên vùng chọn nhiều dòng (Ctrl/Shift-click) có xoá đúng và chỉ các dòng trong vùng chọn không, có dialog xác nhận không? Mới chỉ thấy nút chuyển enabled; xoá 1 dòng thì xoá ngay không xác nhận (KB-079).","kb_ids":["KB-186","KB-079"]}
```

## OQ-product-base-031 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-product-base-031","type":"NEEDS_CONFIRMATION","feature_id":"product-base-campaign-link","summary":"Sau khi bấm \"Update required\" trên campaign, variant vừa bulk Add có hiển thị (chọn được, đúng giá, available) trên trang product của storefront không? Mới chỉ xác nhận ở mức dữ liệu sync; storefront của store kiểm thử bị khoá mật khẩu.","kb_ids":["KB-203"]}
```

## OQ-product-base-032 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-product-base-032","type":"NEEDS_CONFIRMATION","feature_id":"mockup-attachment","summary":"BUG-376 (gắn với case modal Assign mockups của Product Base) nói về gì, có chạm hành vi hiển thị/chọn video không? Cần chạy lại case trên bản đã merge.","kb_ids":["KB-328"]}
```

## OQ-product-base-033 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-product-base-033","type":"NEEDS_CONFIRMATION","feature_id":"mockup-attachment","summary":"Save assignment video ↔ variant trong modal Assign mockups của Product Base (điều kiện Save khi chỉ chọn video, request lưu, reload) chưa từng được quan sát.","kb_ids":["KB-328"]}
```

## OQ-product-base-034 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-product-base-034","type":"NEEDS_CONFIRMATION","feature_id":"product-base-campaign-link","summary":"Sau khi fix BUG-361, campaign tạo từ Product Base (thêm PB / bulk create) có mang assignment video ↔ variant của Product Base trên bản đã merge / production không? Hiện chỉ là quan sát vì cùng flow có BUG-361.","kb_ids":["KB-329"]}
```

## OQ-product-base-035 — OPEN_ISSUE

```json
{"oq_id":"OQ-product-base-035","type":"OPEN_ISSUE","feature_id":"product-base-campaign-link","summary":"Lỗi đã biết BUG-361 (High): video sang campaign tạo / bulk create từ Product Base mất URL/thumbnail, storefront hiện slide trống. Đã fix/retest chưa, trên bản nào? KB-330 không làm oracle.","kb_ids":["KB-330"]}
```

## OQ-product-base-036 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-product-base-036","type":"NEEDS_CONFIRMATION","feature_id":"product-base-campaign-link","summary":"PO xác nhận ý định (rủi ro mất dữ liệu): video được chép sang campaign tạo từ Product Base phải giữ URL, thumbnail và hiển thị được trên storefront — đây là hành vi đúng mà BUG-361 đang vi phạm?","kb_ids":["KB-330"]}
```

## OQ-product-base-037 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-product-base-037","type":"NEEDS_CONFIRMATION","feature_id":"product-base-browse","summary":"merchOne và Picanova có phải một provider không, và tên merchOne có phải đổi tên chủ đích không? KB-500 là ghi nhận của QA ở một lượt staging. CHK-01-017 có thể không tìm thấy tên Picanova trên UI. Cần: PO hoặc dev xác nhận nguyên văn kèm ngày, hoặc test case PASS có ghi build. Trả lời xong thì sửa flow orders-fulfillment dòng 15 nếu cần qua khối C. Route /fulfillments/picanova thấy ở màn hình nào cũng chưa rõ (CHK-01-020).","kb_ids":["KB-500"],"check_ids":["CHK-01-020","CHK-01-017"]}
```

## OQ-product-base-038 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-product-base-038","type":"NEEDS_CONFIRMATION","feature_id":"product-base-browse","summary":"Rule \"chưa nhập key dùng key teeinblue, đã nhập dùng key merchant\" có đúng không, áp cho provider nào? Ghi chú chia theo trạng thái, dev chia theo provider. Nhánh account đã nhập key hiện không có check. Cần: Dev hoặc PO chốt cách chia và danh sách provider, gồm việc Picanova/merchOne thuộc nhóm merchant nhập key trong khi TC-TIB-7792 ghi key .env của merchOne trả 403.","kb_ids":["KB-503","KB-501","KB-502"],"check_ids":["CHK-01-021","CHK-01-017","CHK-01-018"],"side_a":"Ghi chú QA \"tib-product-behaviors\" dòng 64 (2026-10-13): chia theo trạng thái đã nhập key.","side_b":"Dev, Jira TIB-5548 comment #53876 (sửa 2026-10-13): chia theo nhóm provider."}
```

## OQ-product-base-039 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-product-base-039","type":"NEEDS_CONFIRMATION","feature_id":"product-base-browse","summary":"Key CustomCat do ai giữ? Dòng 3.3 nằm dưới mục dev ghi dùng key teeinblue, toast bảo kiểm key ở Extras/Fulfillments, TC-TIB-5449 ghi chưa rõ. Cần: PO hoặc dev xác nhận chủ key CustomCat.","kb_ids":["KB-514"],"check_ids":["CHK-01-019"],"side_a":"Dev, comment #53876: mục 3 dùng key teeinblue, dòng 3.3 là CustomCat.","side_b":"Toast [CustomCat] Access denied, check the API key in Extras/Fulfillments (403); TC-TIB-5449: key owner chưa rõ."}
```

## OQ-product-base-040 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-product-base-040","type":"NEEDS_CONFIRMATION","feature_id":"printarea-definition","summary":"Vế \"giảm 1/2 size\" có thật sự không test được trên staging không, production thế nào? TC-TIB-7788 ghi không có token Printify cho QA và dev, trong khi KB-502 ghi Printify dùng key teeinblue. Key .env của Printify, merchOne trên staging có thể làm catalog lỗi vì môi trường khi chạy CHK-01-018. Cần: Người có thẩm quyền xác nhận khác biệt môi trường và phía production, hoặc cấp cách lấy size gốc; dev xác nhận trạng thái key .env của Printify, merchOne.","kb_ids":["KB-504","KB-502"],"check_ids":["CHK-04-026","CHK-04-025","CHK-01-018"]}
```

## OQ-product-base-041 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-product-base-041","type":"NEEDS_CONFIRMATION","feature_id":"printarea-definition","summary":"\"Activity log do browser ghi qua GraphQL\" ở #56108 có phải log theo Product Base (product_activities) không, và REST /api/staff-activity-logs/printarea có còn được gọi cho log staff không? Base KB-097 cho thấy hai log tách biệt, nên KB-035 và KB-511 cùng đúng được; lời dev không gọi tên log. Cần: Dev xác nhận nguyên văn kèm ngày. Nếu câu trả lời phủ định KB-035 hoặc KB-097 thì mở CCR mới.","kb_ids":["KB-511","KB-035","KB-097"],"check_ids":["CHK-04-028","CHK-04-011"]}
```

## OQ-product-base-042 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-product-base-042","type":"NEEDS_CONFIRMATION","feature_id":"printarea-definition","summary":"Bản ghi Changed dpi có hiện ở modal Logs của Product Base không? Filter Status có thêm giá trị mới không, hay bản ghi nằm ở /activity-logs? Cần: Dev xác nhận, hoặc operator yêu cầu explore. Trước khi có trả lời, CHK-04-010 và CHK-08-012 có thể báo FAIL sai.","kb_ids":["KB-510","KB-036","KB-097"],"check_ids":["CHK-04-010","CHK-04-027","CHK-08-012","CHK-08-013"]}
```

## OQ-product-base-043 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-product-base-043","type":"NEEDS_CONFIRMATION","feature_id":"printarea-definition","summary":"Câu \"Nếu mutation lỗi vì lý do khác cũng hiện thông báo lỗi, không còn im lặng\" ở #56108 chỉ áp cho ô DPI hay cho mọi ô printarea, gồm Width? KB-034 ghi UI im lặng khi nhập Width=abc. Cần: Dev xác nhận phạm vi, hoặc chạy lại CHK-04-005 trên build sau commit 13bfedf33 khi operator yêu cầu.","kb_ids":["KB-034"],"check_ids":["CHK-04-005","CHK-04-011"]}
```

## OQ-product-base-044 — OPEN_ISSUE

```json
{"oq_id":"OQ-product-base-044","type":"OPEN_ISSUE","feature_id":"printarea-definition","summary":"Phần UI của DPI chưa có quan sát: giá trị mặc định ở form New printarea, nội dung tooltip cột DPI, DPI có trong inline editor cùng kiểu confirm/Cancel không. Duplicate product base deep-copy printareas nhưng chưa nguồn nào nói dpi có được copy không. Cần: Operator yêu cầu explore hoặc CCR sau bổ sung. KB-029, KB-030, KB-032 giữ nguyên tới lúc đó.","kb_ids":["KB-029","KB-030","KB-032","KB-512","KB-513"],"check_ids":["CHK-04-001","CHK-04-002","CHK-04-003","CHK-04-017","CHK-04-018"]}
```

## OQ-product-base-045 — OPEN_ISSUE

```json
{"oq_id":"OQ-product-base-045","type":"OPEN_ISSUE","feature_id":"printarea-definition","summary":"\"BE validate\" khoảng DPI 72–300 ở tầng nào ngoài DB constraint, khi print area sửa qua Hasura từ client? Dạng response khi mutation đi thẳng chưa có oracle. Cần: Dev xác nhận tầng validate và dạng lỗi. Liên quan OQ-product-base-005.","kb_ids":["KB-513","KB-031","KB-047"],"check_ids":["CHK-04-019"]}
```

## OQ-product-base-046 — OPEN_ISSUE

```json
{"oq_id":"OQ-product-base-046","type":"OPEN_ISSUE","feature_id":"printarea-definition","summary":"Ngưỡng 9000 px chạy ở bước nào, và trên staging xác định sản phẩm có cạnh gốc > 9000 bằng cách nào? #56108 chỉ nhắc Printify import ở dòng PDF; #55437 có nhắc import nhưng câu đó không vào KB. Cần: Dev xác nhận bước chạy và cách chọn dữ liệu. Thiếu nó CHK-04-025 không chạy lại được.","kb_ids":["KB-506","KB-509"],"check_ids":["CHK-04-025"]}
```

## OQ-product-base-047 — OPEN_ISSUE

```json
{"oq_id":"OQ-product-base-047","type":"OPEN_ISSUE","feature_id":"printarea-definition","summary":"Thay đổi của TIB-5500 và TIB-5548 đã lên production chưa, từ ngày nào? #56108 chỉ nói deploy staging (portal commit 13bfedf33); mọi claim shipped UNKNOWN, không record Testlane nào ghi build; mốc \"print area có từ trước\" của KB-512 chưa xác định ở production. Cần: Dev xác nhận ngày deploy production. Tới lúc đó KB-500..KB-514 và check mới chỉ áp cho staging.","kb_ids":["KB-500","KB-501","KB-502","KB-503","KB-504","KB-505","KB-506","KB-507","KB-508","KB-509","KB-510","KB-511","KB-512","KB-513","KB-514"],"check_ids":["CHK-01-017","CHK-01-018","CHK-04-022"]}
```

## OQ-product-base-048 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-product-base-048","type":"NEEDS_CONFIRMATION","feature_id":"printarea-definition","summary":"PO xác nhận ý định của các hành vi chạm khổ in của đơn fulfillment: file export ghi DPI của print area (KB-505), ngưỡng 9000 px giảm cạnh và DPI 150 (KB-506), DPI ngoài khoảng về 300 (KB-508), hạ DPI giữ pixel thì khổ in gấp đôi (KB-509). Hiện chỉ có lời dev. Cần: PO trả lời. Item vẫn publish; trả lời ngược thì xử lý như CCR mới.","kb_ids":["KB-505","KB-506","KB-508","KB-509"],"check_ids":["CHK-04-020","CHK-04-021","CHK-04-024","CHK-04-025"]}
```

## OQ-product-base-049 — OPEN_ISSUE

```json
{"oq_id":"OQ-product-base-049","type":"OPEN_ISSUE","feature_id":"printarea-definition","summary":"Staging chưa có fixture đã biết: sản phẩm provider trả DPI ngoài khoảng (CHK-04-024), order có item dùng print area (CHK-04-020, 021, 022), print area có trước đợt deploy DPI (CHK-04-022). Cần: Dựng fixture trên store explorer, hoặc dev chỉ sản phẩm phù hợp.","kb_ids":["KB-508","KB-505","KB-509","KB-512"],"check_ids":["CHK-04-024","CHK-04-020","CHK-04-021","CHK-04-022"]}
```

## OQ-product-base-050 — OPEN_ISSUE

```json
{"oq_id":"OQ-product-base-050","type":"OPEN_ISSUE","feature_id":"printarea-definition","summary":"Message ghi \"whole number\" nhưng KB-513 không phát biểu về số thập phân, nên chưa check nào assert. DPI thập phân bị xử lý thế nào? Cần: Dev xác nhận.","kb_ids":["KB-513"],"check_ids":["CHK-04-017","CHK-04-018"]}
```
