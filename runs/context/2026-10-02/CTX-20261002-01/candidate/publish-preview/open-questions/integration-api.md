# Open Questions — integration-api Tổng: 35 mục (NEEDS_CONFIRMATION/CONFLICT/OPEN_ISSUE). Sinh từ bootstrap DOC_BOOTSTRAP đầu tiên cho qikfiliate. ## OQ-integration-api-001 — OPEN_ISSUE ```json
{ "oq_id": "OQ-integration-api-001", "type": "OPEN_ISSUE", "feature_id": "api-key-authentication", "kb_id": "KB-007", "summary": "KNOWN DEFECT (KB-007, feature api-key-authentication): KNOWN_DEFECT — không thu hồi quyền riêng theo app. Theo tài liệu `integration api - overview and auth` §`Đặc điểm quan trọng cần biết khi đánh giá rủi ro`, hệ thống hiện không thể thu hồi quyền của riêng 1 client app mà không đổi key dùng chung; đổi key ảnh hưởng tất cả app khác đang dùng key đó."
}
``` ## OQ-integration-api-002 — OPEN_ISSUE ```json
{ "oq_id": "OQ-integration-api-002", "type": "OPEN_ISSUE", "feature_id": "api-key-authentication", "kb_id": "KB-008", "summary": "KNOWN DEFECT (KB-008, feature api-key-authentication): KNOWN_DEFECT — không phân biệt được app nào gọi request nào. Theo tài liệu `integration api - overview and auth` §`Đặc điểm quan trọng cần biết khi đánh giá rủi ro`, hệ thống hiện không phân biệt được app nào gọi request nào; log request (nếu có) chỉ biết là '1 ai đó có key hợp lệ'."
}
``` ## OQ-integration-api-003 — OPEN_ISSUE ```json
{ "oq_id": "OQ-integration-api-003", "type": "OPEN_ISSUE", "feature_id": "api-key-authentication", "kb_id": "KB-009", "summary": "KNOWN DEFECT (KB-009, feature api-key-authentication): KNOWN_DEFECT — không có rate limit riêng cho nhóm endpoint tích hợp. Theo tài liệu `integration api - overview and auth` §`Đặc điểm quan trọng cần biết khi đánh giá rủi ro`, hệ thống hiện không có rate limit riêng cho nhóm 5 endpoint tích hợp và không có cơ chế chặn spam/brute-force request vào nhóm endpoint đó."
}
``` ## OQ-integration-api-004 — OPEN_ISSUE ```json
{ "oq_id": "OQ-integration-api-004", "type": "OPEN_ISSUE", "feature_id": "api-key-authentication", "kb_id": "KB-010", "summary": "KNOWN DEFECT (KB-010, feature api-key-authentication): KNOWN_DEFECT — không có chữ ký request (HMAC), key lộ là gọi được cả DELETE. Theo tài liệu `integration api - overview and auth` §`Đặc điểm quan trọng cần biết khi đánh giá rủi ro`, hệ thống hiện không có chữ ký request (HMAC); bất kỳ ai có được key (dù chỉ 1 lần, ví dụ lộ qua log hoặc source code app client bị decompile) đều gọi được toàn bộ 5 endpoint, bao gồm cả `DELETE /api/customers` (xoá dữ liệu)."
}
``` ## OQ-integration-api-005 — OPEN_ISSUE ```json
{ "oq_id": "OQ-integration-api-005", "type": "OPEN_ISSUE", "feature_id": "customer-event-reporting-api", "kb_id": "KB-007", "summary": "KNOWN DEFECT (KB-007, feature customer-event-reporting-api): KNOWN_DEFECT — name sai không bị chặn, lưu nguyên văn, không cảnh báo. Theo tài liệu `integration api - customer lifecycle api` §`Rủi ro 1 — \"name\" trong customer-events không bị chặn giá trị sai`, request `POST /api/customer-events` hiện chỉ validate `required` cho `name`, không có luật `in:...`. Hệ quả: gửi một giá trị `name` gõ sai (ví dụ \"subcribed\") vẫn trả 200/201 thành công, giá trị sai được lưu nguyên văn vào DB, và không có cảnh báo nào cho client app biết họ vừa gửi sai."
}
``` ## OQ-integration-api-006 — OPEN_ISSUE ```json
{ "oq_id": "OQ-integration-api-006", "type": "OPEN_ISSUE", "feature_id": "customer-provisioning-api", "kb_id": "KB-009", "summary": "KNOWN DEFECT (KB-009, feature customer-provisioning-api): KNOWN_DEFECT — POST /api/customers không validate program_slug tồn tại. Theo tài liệu `integration api - customer lifecycle api` §`Bước 2 (Ngày 10) — Khách thực sự cài app`, tầng request của `POST /api/customers` hiện không có luật validate `exists:programs,slug` cho `program_slug` gửi lên."
}
``` ## OQ-integration-api-007 — OPEN_ISSUE ```json
{ "oq_id": "OQ-integration-api-007", "type": "OPEN_ISSUE", "feature_id": "customer-provisioning-api", "kb_id": "KB-010", "summary": "KNOWN DEFECT (KB-010, feature customer-provisioning-api): KNOWN_DEFECT (nghi vấn) — program_slug không tồn tại có thể gây lỗi 500. Theo tài liệu `integration api - customer lifecycle api` §`Rủi ro 2 — program_slug không tồn tại có thể gây lỗi 500 thay vì 422`, với giọng dè dặt 'có khả năng', gửi một `program_slug` không tồn tại có thể gây lỗi runtime (500) ngay khi cố lấy `$program->id`, thay vì trả lỗi rõ ràng 422."
}
``` ## OQ-integration-api-008 — OPEN_ISSUE ```json
{ "oq_id": "OQ-integration-api-008", "type": "OPEN_ISSUE", "feature_id": "customer-provisioning-api", "kb_id": "KB-011", "summary": "KNOWN DEFECT (KB-011, feature customer-provisioning-api): KNOWN_DEFECT (nghi vấn, chưa xác minh) — endpoint khác dùng program_slug có thể cùng lỗi. Theo tài liệu `integration api - customer lifecycle api` §`Rủi ro 2 — program_slug không tồn tại có thể gây lỗi 500 thay vì 422`, với giọng dè dặt 'có thể', ngoài `POST /api/customers`, một số endpoint khác dùng `program_slug` cũng cần được thử với giá trị không tồn tại để xác nhận response code thực tế — tức chưa xác minh endpoint nào khác bị ảnh hưởng."
}
``` ## OQ-integration-api-009 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-integration-api-009", "type": "NEEDS_CONFIRMATION", "feature_id": "api-key-authentication", "check_ids": [ "CHK-003" ], "summary": "Xác nhận HTTP status/response body khi thiếu header X-API-Key. HTTP status/response body cụ thể khi request thiếu header X-API-Key là gì? Đây là test case âm cơ bản nhất của cả nhóm 5 endpoint tích hợp nên cần một contract rõ ràng trước khi checklist có thể khẳng định expected result."
}
``` ## OQ-integration-api-010 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-integration-api-010", "type": "NEEDS_CONFIRMATION", "feature_id": "api-key-authentication", "check_ids": [ "CHK-005" ], "summary": "Xác nhận HTTP status/response body khi header X-API-Key sai giá trị. HTTP status/response body cụ thể khi header X-API-Key sai giá trị là gì? Cùng gap với CHK-003 (not_documented #1, `qikfiliate/integration api - overview and auth`) nhưng precondition khác (có header, giá trị sai vs hoàn toàn thiếu header)."
}
``` ## OQ-integration-api-011 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-integration-api-011", "type": "NEEDS_CONFIRMATION", "feature_id": "api-key-authentication", "check_ids": [ "CHK-012" ], "summary": "Xác nhận hành vi khi APP_API_KEY được rotate. Ai cấp và quy trình rotate APP_API_KEY ra sao (ai giữ, đổi thế nào, báo client app thế nào, key cũ bị vô hiệu ngay hay có grace period)? Không có quy trình này thì không dựng được test case cho ca rotate."
}
``` ## OQ-integration-api-012 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-integration-api-012", "type": "NEEDS_CONFIRMATION", "feature_id": "api-key-authentication", "check_ids": [ "CHK-013" ], "summary": "Xác nhận nhóm endpoint tích hợp có log/audit request hay không, lưu ở đâu. Nhóm 5 endpoint tích hợp có log/audit request không, và nếu có thì lưu ở đâu? Không có câu trả lời này thì không thể dựng bước verify-qua-log cho các check liên quan (ví dụ CHK-009)."
}
``` ## OQ-integration-api-013 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-integration-api-013", "type": "NEEDS_CONFIRMATION", "feature_id": "api-key-authentication", "check_ids": [ "CHK-014" ], "summary": "Xác nhận '1 secret dùng chung cho mọi client app' là ràng buộc business chủ đích hay chỉ ví dụ minh hoạ. Thiết kế '1 secret dùng chung cho mọi client app' (KB-006) có phải ràng buộc business chủ đích ở quy mô hiện tại (1 client app), hay là rủi ro cần redesign trước khi có client app thứ 2? Ảnh hưởng tới việc CHK-008/CHK-009 (không revoke/không phân biệt app) được coi là rủi ro chấp nhận được hay defect cần fix."
}
``` ## OQ-integration-api-014 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-integration-api-014", "type": "NEEDS_CONFIRMATION", "feature_id": "customer-event-reporting-api", "check_ids": [ "CHK-003" ], "summary": "Xác nhận hành vi khi Customer không tồn tại theo (program_slug, related_id) gửi lên. POST /api/customer-events trả về gì khi (program_slug, related_id) không khớp Customer nào tồn tại?"
}
``` ## OQ-integration-api-015 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-integration-api-015", "type": "NEEDS_CONFIRMATION", "feature_id": "customer-event-reporting-api", "check_ids": [ "CHK-004" ], "summary": "Xác nhận POST /api/customer-events có cho phép name rỗng không. POST /api/customer-events có cho phép name là chuỗi rỗng không (khác với thiếu field name hoàn toàn)? Tài liệu đặt câu hỏi này cho QA nhưng không trả lời."
}
``` ## OQ-integration-api-016 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-integration-api-016", "type": "NEEDS_CONFIRMATION", "feature_id": "customer-event-reporting-api", "check_ids": [ "CHK-005" ], "summary": "Xác nhận có chặn gửi trùng lặp cùng 1 sự kiện 2 lần không. POST /api/customer-events có chặn gửi trùng lặp cùng 1 sự kiện (cùng name, cùng Customer) 2 lần không, hay tạo 2 bản ghi CustomerEvent riêng biệt?"
}
``` ## OQ-integration-api-017 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-integration-api-017", "type": "NEEDS_CONFIRMATION", "feature_id": "customer-event-reporting-api", "check_ids": [ "CHK-007" ], "summary": "Xác nhận chính thức: enum 6 giá trị (model CustomerEvent) KHÔNG được enforce ở tầng request. Xác nhận chính thức: 6 giá trị liệt kê ở bảng endpoint `qikfiliate/integration api - overview and auth` (KB-003) có đúng là KHÔNG được validate ở tầng request của POST /api/customer-events (như KB-007 mô tả), chỉ là tập giá trị model mong đợi? Tránh checklist/test case sau này dựng sai expected result theo `qikfiliate/integration api - overview and auth` một cách độc lập."
}
``` ## OQ-integration-api-018 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-integration-api-018", "type": "NEEDS_CONFIRMATION", "feature_id": "customer-event-reporting-api", "check_ids": [ "CHK-008" ], "summary": "Xác nhận có BẮT BUỘC gọi POST /api/customer-events(reinstalled) sau khi restore qua PUT /api/trashed-customers không. Client app có BẮT BUỘC gọi POST /api/customer-events(reinstalled) sau khi restore qua PUT /api/trashed-customers, hay đây chỉ là bước tuỳ chọn? Quyết định liệu trạng thái hiển thị 'reinstalled' có dùng được làm oracle test hay không."
}
``` ## OQ-integration-api-019 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-integration-api-019", "type": "NEEDS_CONFIRMATION", "feature_id": "customer-provisioning-api", "check_ids": [ "CHK-004" ], "summary": "Xác nhận HTTP status/response body khi tracking_id không tìm thấy (đã dùng/không hợp lệ). HTTP status/response body cụ thể khi POST /api/customers với tracking_id không hợp lệ/đã dùng là gì?"
}
``` ## OQ-integration-api-020 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-integration-api-020", "type": "NEEDS_CONFIRMATION", "feature_id": "customer-provisioning-api", "check_ids": [ "CHK-005" ], "summary": "Xác nhận hành vi khi POST /api/customers với related_id đã tồn tại (cùng Program). Gọi POST /api/customers với related_id đã tồn tại (cùng Program) thì xảy ra gì — lỗi trùng, ghi đè, hay tạo bản ghi thứ 2? Tình huống thực tế dễ xảy ra khi client app gọi sai endpoint lúc shop cài lại."
}
``` ## OQ-integration-api-021 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-integration-api-021", "type": "NEEDS_CONFIRMATION", "feature_id": "customer-provisioning-api", "check_ids": [ "CHK-011" ], "summary": "Xác nhận hành vi khi DELETE /api/customers gọi lần 2 trên Customer đã soft-delete. Gọi DELETE /api/customers lần 2 trên 1 Customer đã soft-delete trả về gì — vẫn 204 (idempotent), hay lỗi not-found?"
}
``` ## OQ-integration-api-022 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-integration-api-022", "type": "NEEDS_CONFIRMATION", "feature_id": "customer-provisioning-api", "check_ids": [ "CHK-014" ], "summary": "Xác nhận HTTP status/response body khi PUT /api/trashed-customers không tìm thấy bản ghi soft-delete. PUT /api/trashed-customers trả về status/body gì khi không tìm thấy bản ghi đã soft-delete khớp related_id+program_slug?"
}
``` ## OQ-integration-api-023 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-integration-api-023", "type": "NEEDS_CONFIRMATION", "feature_id": "customer-provisioning-api", "check_ids": [ "CHK-015" ], "summary": "Xác nhận HTTP status/response body khi PUT /api/trashed-customers restore thành công. PUT /api/trashed-customers trả về status/body gì khi restore thành công? Là endpoint duy nhất khôi phục dữ liệu nên cần contract response rõ ràng để verify."
}
``` ## OQ-integration-api-024 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-integration-api-024", "type": "NEEDS_CONFIRMATION", "feature_id": "customer-provisioning-api", "check_ids": [ "CHK-016" ], "summary": "Xác nhận client app có BẮT BUỘC gọi cả DELETE /api/customers và POST /api/customer-events(uninstalled) khi uninstall. Client app có BẮT BUỘC gọi cả DELETE /api/customers và POST /api/customer-events(uninstalled) khi uninstall, hay 1 trong 2 đã đủ để hệ thống nhận biết đúng shop đã gỡ cài? Ảnh hưởng thiết kế test case cho luồng uninstall."
}
``` ## OQ-integration-api-025 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-integration-api-025", "type": "NEEDS_CONFIRMATION", "feature_id": "customer-provisioning-api", "check_ids": [ "CHK-017" ], "summary": "Xác nhận composite key (related_id + program_slug) có cách ly đúng Customer giữa các Program khác nhau cho DELETE/PUT. related_id + program_slug có phải composite key duy nhất xác định Customer cho DELETE /api/customers và PUT /api/trashed-customers không? Hiện chỉ có payload mẫu (EXAMPLE_ONLY), không có đặc tả chính thức — cần xác nhận trước khi dùng làm oracle cho test cách ly dữ liệu giữa các Program."
}
```

## OQ-integration-api-026 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-integration-api-026",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "api-key-authentication",
  "check_ids": [
    "api-key-authentication:CHK-001"
  ],
  "summary": "Header X-API-Key hợp lệ cho request đi qua middleware auth.api_key. Oracle STRONG cua check 'CHK-001' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao). Theo luat C5, dev_doc khong duoc la oracle STRONG duy nhat cho check priority P1 (mat du lieu/tien/permission). Ha xuong BASELINE cho toi khi co test_case PASS xac nhan hanh vi, hoac PO/Dev xac nhan truc tiep (po_dev_confirm)."
}
```

## OQ-integration-api-027 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-integration-api-027",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": [
    "api-key-authentication",
    "customer-event-reporting-api"
  ],
  "check_ids": [
    "api-key-authentication:CHK-002",
    "customer-event-reporting-api:CHK-002"
  ],
  "summary": "Request thiếu header X-API-Key bị chặn, không xử lý nghiệp vụ. Oracle STRONG cua check 'CHK-002' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao). Theo luat C5, dev_doc khong duoc la oracle STRONG duy nhat cho check priority P1 (mat du lieu/tien/permission). Ha xuong BASELINE cho toi khi co test_case PASS xac nhan hanh vi, hoac PO/Dev xac nhan truc tiep (po_dev_confirm)."
}
```

## OQ-integration-api-028 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-integration-api-028",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "api-key-authentication",
  "check_ids": [
    "api-key-authentication:CHK-004"
  ],
  "summary": "Request với header X-API-Key sai giá trị bị chặn, không xử lý nghiệp vụ. Oracle STRONG cua check 'CHK-004' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao). Theo luat C5, dev_doc khong duoc la oracle STRONG duy nhat cho check priority P1 (mat du lieu/tien/permission). Ha xuong BASELINE cho toi khi co test_case PASS xac nhan hanh vi, hoac PO/Dev xac nhan truc tiep (po_dev_confirm)."
}
```

## OQ-integration-api-029 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-integration-api-029",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "api-key-authentication",
  "check_ids": [
    "api-key-authentication:CHK-007"
  ],
  "summary": "Middleware auth.api_key áp dụng nhất quán cho toàn bộ 4 route của nhóm tích hợp. Oracle STRONG cua check 'CHK-007' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao). Theo luat C5, dev_doc khong duoc la oracle STRONG duy nhat cho check priority P1 (mat du lieu/tien/permission). Ha xuong BASELINE cho toi khi co test_case PASS xac nhan hanh vi, hoac PO/Dev xac nhan truc tiep (po_dev_confirm)."
}
```

## OQ-integration-api-030 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-integration-api-030",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": [
    "api-key-authentication",
    "customer-event-reporting-api"
  ],
  "check_ids": [
    "api-key-authentication:CHK-008",
    "customer-event-reporting-api:CHK-006"
  ],
  "summary": "[RỦI RO ĐÃ BIẾT] Không thể thu hồi quyền của riêng 1 client app mà không đổi key dùng chung. KB item KB-007 mang status=KNOWN_DEFECT da bi go khoi oracle.kb_ids (khong duoc dung lam oracle theo luat C5 'known_defect khong phai expected result'). Check 'CHK-008' hien khong con oracle hop le nao. Can PO/Dev xac nhan: hanh vi mo ta trong expected_result la known defect can tiep tuc theo doi (regression-watch, khong oracle) hay can mot kb_id CONFIRMED_EXPECTED khac thay the lam oracle."
}
```

## OQ-integration-api-031 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-integration-api-031",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "api-key-authentication",
  "check_ids": [
    "api-key-authentication:CHK-009"
  ],
  "summary": "[RỦI RO ĐÃ BIẾT] Không phân biệt được app nào gọi request nào. KB item KB-008 mang status=KNOWN_DEFECT da bi go khoi oracle.kb_ids (khong duoc dung lam oracle theo luat C5 'known_defect khong phai expected result'). Check 'CHK-009' hien khong con oracle hop le nao. Can PO/Dev xac nhan: hanh vi mo ta trong expected_result la known defect can tiep tuc theo doi (regression-watch, khong oracle) hay can mot kb_id CONFIRMED_EXPECTED khac thay the lam oracle."
}
```

## OQ-integration-api-032 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-integration-api-032",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": [
    "api-key-authentication",
    "customer-provisioning-api"
  ],
  "check_ids": [
    "api-key-authentication:CHK-010",
    "customer-provisioning-api:CHK-006"
  ],
  "summary": "[RỦI RO ĐÃ BIẾT] Không có rate limit riêng cho nhóm 5 endpoint tích hợp. KB item KB-009 mang status=KNOWN_DEFECT da bi go khoi oracle.kb_ids (khong duoc dung lam oracle theo luat C5 'known_defect khong phai expected result'). Check 'CHK-010' hien khong con oracle hop le nao. Can PO/Dev xac nhan: hanh vi mo ta trong expected_result la known defect can tiep tuc theo doi (regression-watch, khong oracle) hay can mot kb_id CONFIRMED_EXPECTED khac thay the lam oracle."
}
```

## OQ-integration-api-033 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-integration-api-033",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": [
    "api-key-authentication",
    "customer-provisioning-api"
  ],
  "check_ids": [
    "api-key-authentication:CHK-011",
    "customer-provisioning-api:CHK-007"
  ],
  "summary": "[RỦI RO ĐÃ BIẾT] Key lộ 1 lần cho phép gọi toàn bộ 5 endpoint bao gồm DELETE (xoá dữ liệu), không có HMAC. KB item KB-010 mang status=KNOWN_DEFECT da bi go khoi oracle.kb_ids (khong duoc dung lam oracle theo luat C5 'known_defect khong phai expected result'). Check 'CHK-011' hien khong con oracle hop le nao. Can PO/Dev xac nhan: hanh vi mo ta trong expected_result la known defect can tiep tuc theo doi (regression-watch, khong oracle) hay can mot kb_id CONFIRMED_EXPECTED khac thay the lam oracle."
}
```

## OQ-integration-api-034 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-integration-api-034",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "customer-event-reporting-api",
  "check_ids": [
    "customer-event-reporting-api:CHK-010"
  ],
  "summary": "Customer được match đúng theo CẶP (program_slug, related_id) — không ghi nhận event vào Customer sai Program. Oracle STRONG cua check 'CHK-010' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao). Theo luat C5, dev_doc khong duoc la oracle STRONG duy nhat cho check priority P1 (mat du lieu/tien/permission). Ha xuong BASELINE cho toi khi co test_case PASS xac nhan hanh vi, hoac PO/Dev xac nhan truc tiep (po_dev_confirm)."
}
```

## OQ-integration-api-035 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-integration-api-035",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "customer-provisioning-api",
  "check_ids": [
    "customer-provisioning-api:CHK-008"
  ],
  "summary": "[RỦI RO ĐÃ BIẾT, chưa xác minh] Các endpoint khác dùng program_slug có thể gặp lỗi tương tự. KB item KB-011 mang status=KNOWN_DEFECT da bi go khoi oracle.kb_ids (khong duoc dung lam oracle theo luat C5 'known_defect khong phai expected result'). Check 'CHK-008' hien khong con oracle hop le nao. Can PO/Dev xac nhan: hanh vi mo ta trong expected_result la known defect can tiep tuc theo doi (regression-watch, khong oracle) hay can mot kb_id CONFIRMED_EXPECTED khac thay the lam oracle."
}
```
