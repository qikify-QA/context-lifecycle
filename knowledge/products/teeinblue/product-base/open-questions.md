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
