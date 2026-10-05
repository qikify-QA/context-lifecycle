# Open Questions — referral-attribution Tổng: 13 mục (NEEDS_CONFIRMATION/CONFLICT/OPEN_ISSUE). Sinh từ bootstrap DOC_BOOTSTRAP đầu tiên cho qikfiliate. ## OQ-referral-attribution-001 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-referral-attribution-001", "type": "NEEDS_CONFIRMATION", "feature_id": "click-to-install-attribution", "check_ids": [ "CHK-007" ], "summary": "Response contract chính xác (status/body) khi tracking_id không tồn tại hoặc đã quá hạn. Response body/status chính xác khi tracking_id không tồn tại hoặc đã quá hạn là gì (tổng quát, không chỉ ví dụ minh hoạ)? Cần PO/Dev xác nhận trước khi dùng làm assert chính thức trong automation."
}
``` ## OQ-referral-attribution-002 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-referral-attribution-002", "type": "NEEDS_CONFIRMATION", "feature_id": "click-to-install-attribution", "check_ids": [ "CHK-009" ], "summary": "Hành vi khi có nhiều TrackingInformation hợp lệ (chưa dùng, còn hạn) đồng thời của cùng affiliate — client app dùng cái nào. Khi có nhiều TrackingInformation hợp lệ đồng thời của cùng affiliate, có ràng buộc/ưu tiên nào từ phía server không, hay hoàn toàn phụ thuộc client app chọn? KB-010 (hedged) không đủ làm oracle."
}
``` ## OQ-referral-attribution-003 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-referral-attribution-003", "type": "NEEDS_CONFIRMATION", "feature_id": "click-to-install-attribution", "check_ids": [ "CHK-010" ], "summary": "Customer.user_id/program_id được gán đúng theo affiliate/Program đã dẫn tới lượt click (tổng quát, không chỉ ví dụ). Cần PO/Dev xác nhận phát biểu tổng quát (không chỉ ví dụ minh hoạ) rằng Customer.user_id/program_id luôn khớp đúng affiliate/Program đã dẫn tới lượt click, trong mọi trường hợp — đây là hành vi lõi của toàn bộ cơ chế attribution nên cần oracle chắc chắn hơn EXAMPLE_ONLY."
}
``` ## OQ-referral-attribution-004 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-referral-attribution-004", "type": "NEEDS_CONFIRMATION", "feature_id": "click-to-install-attribution", "check_ids": [ "CHK-013" ], "summary": "Dọn dẹp các TrackingInformation hết hạn chưa dùng — có job/cron hay tồn tại vô thời hạn. Có job/cron dọn các bản ghi TrackingInformation đã hết hạn không, hay tồn tại vô thời hạn trong DB? Ảnh hưởng test data cleanup và giả định performance."
}
``` ## OQ-referral-attribution-005 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-referral-attribution-005", "type": "NEEDS_CONFIRMATION", "feature_id": "click-to-install-attribution", "check_ids": [ "CHK-014" ], "summary": "Hành vi ghi công khi shop đã gắn affiliate A rồi click link của affiliate B. Một shop đã gắn cho affiliate A thì click link của affiliate B sau đó có đổi ghi công không? Cần PO/Dev xác nhận quy tắc last-click/first-click — ảnh hưởng trực tiếp tới commission."
}
``` ## OQ-referral-attribution-006 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-referral-attribution-006", "type": "NEEDS_CONFIRMATION", "feature_id": "tracking-information-log", "check_ids": [ "CHK-007" ], "summary": "Khả năng lọc/tìm theo tracking_id hoặc theo affiliate, và cấu hình default TTL 45 ngày. Màn hình Tracking Information có lọc/tìm được theo tracking_id hoặc theo affiliate không, và expires_at 45 ngày có cấu hình được ở đâu không? Cần PO/Dev xác nhận trước khi viết test search/filter hoặc thay đổi default TTL."
}
``` ## OQ-referral-attribution-007 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-referral-attribution-007", "type": "NEEDS_CONFIRMATION", "feature_id": "tracking-link-generation", "check_ids": [ "CHK-006" ], "summary": "Cấu trúc ref_url (domain, query param) và cách affiliate lấy link ngoài nút 'Get Link'. ref_url được cấu tạo thế nào (domain, query param) và affiliate lấy nó ở đâu ngoài nút 'Get Link'? KB-001 chỉ INFERRED (IMPLIED_BY_CODE_ARTIFACT đơn lẻ) — cần PO/Dev xác nhận công thức chính xác và nguồn lấy link khác (nếu có) trước khi dùng làm oracle cho test data bước click."
}
```

## OQ-referral-attribution-008 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-referral-attribution-008",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "click-to-install-attribution",
  "check_ids": [
    "click-to-install-attribution:CHK-001"
  ],
  "summary": "Client app gọi POST /api/tracking-id khi bắt được lượt click, tạo 1 TrackingInformation mới. Oracle STRONG cua check 'CHK-001' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao). Theo luat C5, dev_doc khong duoc la oracle STRONG duy nhat cho check priority P1 (mat du lieu/tien/permission). Ha xuong BASELINE cho toi khi co test_case PASS xac nhan hanh vi, hoac PO/Dev xac nhan truc tiep (po_dev_confirm)."
}
```

## OQ-referral-attribution-009 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-referral-attribution-009",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "click-to-install-attribution",
  "check_ids": [
    "click-to-install-attribution:CHK-005"
  ],
  "summary": "Cài app trong hạn 45 ngày: POST /api/customers với tracking_id hợp lệ, chưa dùng tạo Customer thành công. Oracle STRONG cua check 'CHK-005' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao). Theo luat C5, dev_doc khong duoc la oracle STRONG duy nhat cho check priority P1 (mat du lieu/tien/permission). Ha xuong BASELINE cho toi khi co test_case PASS xac nhan hanh vi, hoac PO/Dev xac nhan truc tiep (po_dev_confirm)."
}
```

## OQ-referral-attribution-010 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-referral-attribution-010",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "click-to-install-attribution",
  "check_ids": [
    "click-to-install-attribution:CHK-006"
  ],
  "summary": "tracking_id dùng lại lần thứ 2 (đã dùng) thất bại. Oracle STRONG cua check 'CHK-006' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao). Theo luat C5, dev_doc khong duoc la oracle STRONG duy nhat cho check priority P1 (mat du lieu/tien/permission). Ha xuong BASELINE cho toi khi co test_case PASS xac nhan hanh vi, hoac PO/Dev xac nhan truc tiep (po_dev_confirm)."
}
```

## OQ-referral-attribution-011 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-referral-attribution-011",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "click-to-install-attribution",
  "check_ids": [
    "click-to-install-attribution:CHK-012"
  ],
  "summary": "Không có quy trình gán ghi công thủ công khi attribution sai hoặc thất bại. Oracle STRONG cua check 'CHK-012' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao). Theo luat C5, dev_doc khong duoc la oracle STRONG duy nhat cho check priority P1 (mat du lieu/tien/permission). Ha xuong BASELINE cho toi khi co test_case PASS xac nhan hanh vi, hoac PO/Dev xac nhan truc tiep (po_dev_confirm)."
}
```

## OQ-referral-attribution-012 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-referral-attribution-012",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "tracking-link-generation",
  "check_ids": [
    "tracking-link-generation:CHK-002"
  ],
  "summary": "TrackingInformation ghi nhận đúng user_id = affiliate sở hữu, tra từ ref lúc tạo bản ghi. Oracle STRONG cua check 'CHK-002' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao). Theo luat C5, dev_doc khong duoc la oracle STRONG duy nhat cho check priority P1 (mat du lieu/tien/permission). Ha xuong BASELINE cho toi khi co test_case PASS xac nhan hanh vi, hoac PO/Dev xac nhan truc tiep (po_dev_confirm)."
}
```

## OQ-referral-attribution-013 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-referral-attribution-013",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "tracking-link-generation",
  "check_ids": [
    "tracking-link-generation:CHK-004"
  ],
  "summary": "tracking_id của mỗi TrackingInformation là duy nhất (unique), không trùng giữa các bản ghi. Oracle STRONG cua check 'CHK-004' hien trace toi kb_id (KB-003) co confirmation_source.derivation=code_artifact (suy ra tu doc code/schema, khong phai phat bieu nghiep vu tuong minh). Theo luat 'phanh derivation' cua C5, STRONG chi hop le khi MOI oracle kb_id deu CONFIRMED_EXPECTED va derivation=prose. Ha xuong BASELINE cho toi khi PO/Dev xac nhan hanh vi nay dung la chu y thiet ke, khong phai tac dung phu cua viec doc code."
}
```
