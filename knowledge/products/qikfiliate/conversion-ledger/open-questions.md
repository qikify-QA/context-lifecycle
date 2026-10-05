# Open Questions — conversion-ledger Tổng: 22 mục (NEEDS_CONFIRMATION/CONFLICT/OPEN_ISSUE). Sinh từ bootstrap DOC_BOOTSTRAP đầu tiên cho qikfiliate. ## OQ-conversion-ledger-001 — OPEN_ISSUE ```json
{ "oq_id": "OQ-conversion-ledger-001", "type": "OPEN_ISSUE", "feature_id": "admin-conversion-review", "kb_id": "KB-007", "summary": "KNOWN DEFECT (KB-007, feature admin-conversion-review): KNOWN DEFECT — is_capped không hiển thị ở admin. Theo tài liệu `qikfiliate/admin - customers and conversions` §`Conversion — dòng hoa hồng` và tài liệu known-issues-edge-cases §E2, cột `is_capped` (đánh dấu 1 dòng `usage` có bị cắt bởi cap lifetime hay không) KHÔNG hiển thị trên màn hình Conversion của admin — chỉ hiển thị phía dashboard affiliate. Admin không có cách nhìn nhanh để biết 1 dòng usage có bị cap hay không."
}
``` ## OQ-conversion-ledger-002 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-conversion-ledger-002", "type": "NEEDS_CONFIRMATION", "feature_id": "admin-conversion-review", "check_ids": [ "CHK-007" ], "summary": "Role khác admin không truy cập được màn hình Conversion admin. Role không phải admin (hoặc chưa đăng nhập) truy cập trực tiếp route admin Conversion screen thì hệ thống phản hồi thế nào (redirect/403/404)? Tài liệu chỉ nêu precondition role=admin cho luồng chính, không phát biểu tường minh cơ chế chặn."
}
``` ## OQ-conversion-ledger-003 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-conversion-ledger-003", "type": "NEEDS_CONFIRMATION", "feature_id": "admin-conversion-review", "check_ids": [ "CHK-010" ], "summary": "Sửa/xoá tay 1 dòng Conversion có cập nhật lại balance affiliate và có audit trail không. Sửa/xoá tay 1 dòng Conversion có cập nhật lại balance của affiliate không, và có audit trail không? Impact tiền nghiêm trọng nếu đoán sai — cần PO/Dev xác nhận trước khi viết oracle hoặc automation assert."
}
``` ## OQ-conversion-ledger-004 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-conversion-ledger-004", "type": "NEEDS_CONFIRMATION", "feature_id": "admin-conversion-review", "check_ids": [ "CHK-011" ], "summary": "Banner kết quả import CSV Payout có báo số dòng bị bỏ qua/lỗi hay chỉ báo số Conversion đã tạo. Banner kết quả import CSV Payout có báo số dòng bị bỏ qua/lỗi không, hay chỉ báo số Conversion đã tạo? Ảnh hưởng khả năng phát hiện dòng CSV bị skip âm thầm khi admin đối soát Conversion mới sinh — cần đối chiếu với object payout-import (ngoài quyền ghi run này)."
}
``` ## OQ-conversion-ledger-005 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-conversion-ledger-005", "type": "NEEDS_CONFIRMATION", "feature_id": "affiliate-conversion-view", "check_ids": [ "CHK-006" ], "summary": "Phân trang/giới hạn số dòng và công thức sắp xếp trên Conversions page. Conversions page của affiliate dashboard có phân trang/giới hạn số dòng không, và công thức của 4 tiêu chí sắp xếp là gì? Cần PO/Dev xác nhận trước khi viết oracle cho test phân trang/sắp xếp."
}
``` ## OQ-conversion-ledger-006 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-conversion-ledger-006", "type": "NEEDS_CONFIRMATION", "feature_id": "affiliate-conversion-view", "check_ids": [ "CHK-010" ], "summary": "Công thức tính percentage hiển thị cho dòng bị cap. percentage hiển thị trên dòng Conversion bị cap có đúng là % hiệu lực thực tế tính ngược từ amount/partner_share hay là field khác? Tài liệu nguồn tự đánh dấu đây là suy luận, chưa xác nhận PO — cần PO/Dev confirm công thức chính xác trước khi dùng làm oracle."
}
``` ## OQ-conversion-ledger-007 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-conversion-ledger-007", "type": "NEEDS_CONFIRMATION", "feature_id": "custom-conversion-entry", "check_ids": [ "CHK-021" ], "summary": "Phân quyền chi tiết trong admin được phép tạo Custom Conversion. Phân quyền cụ thể nào trong admin được phép tạo Custom Conversion? Tài liệu chỉ biết chung là 'admin', chưa phân quyền cụ thể — cần PO/Dev xác nhận trước khi viết negative test phân quyền."
}
``` ## OQ-conversion-ledger-008 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-conversion-ledger-008", "type": "NEEDS_CONFIRMATION", "feature_id": "custom-conversion-entry", "check_ids": [ "CHK-022" ], "summary": "Custom Conversion đã tạo có sửa/xoá được không, và balance có tính lại. Custom Conversion đã tạo có sửa/xoá được không, và nếu được thì balance có tính lại? Impact tiền — cần PO/Dev xác nhận trước khi viết oracle."
}
``` ## OQ-conversion-ledger-009 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-conversion-ledger-009", "type": "NEEDS_CONFIRMATION", "feature_id": "custom-conversion-entry", "check_ids": [ "CHK-023" ], "summary": "Ràng buộc độ dài trên reason và phạm vi/thứ tự trên date_from/date_to/payout_date. Có ràng buộc nào trên reason (độ dài) và trên date_from/date_to/payout_date (thứ tự, phạm vi) không? Không biết biên dữ liệu thì không viết được test boundary chính xác."
}
```

## OQ-conversion-ledger-010 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-conversion-ledger-010",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": [
    "admin-conversion-review",
    "affiliate-conversion-view"
  ],
  "check_ids": [
    "admin-conversion-review:CHK-005",
    "affiliate-conversion-view:CHK-005"
  ],
  "summary": "Admin sửa tay 1 dòng Conversion (vd sửa amount nhập nhầm). Oracle STRONG cua check 'CHK-005' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao). Theo luat C5, dev_doc khong duoc la oracle STRONG duy nhat cho check priority P1 (mat du lieu/tien/permission). Ha xuong BASELINE cho toi khi co test_case PASS xac nhan hanh vi, hoac PO/Dev xac nhan truc tiep (po_dev_confirm)."
}
```

## OQ-conversion-ledger-011 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-conversion-ledger-011",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "admin-conversion-review",
  "check_ids": [
    "admin-conversion-review:CHK-006"
  ],
  "summary": "Admin xoá tay 1 dòng Conversion. Oracle STRONG cua check 'CHK-006' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao). Theo luat C5, dev_doc khong duoc la oracle STRONG duy nhat cho check priority P1 (mat du lieu/tien/permission). Ha xuong BASELINE cho toi khi co test_case PASS xac nhan hanh vi, hoac PO/Dev xac nhan truc tiep (po_dev_confirm)."
}
```

## OQ-conversion-ledger-012 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-conversion-ledger-012",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "admin-conversion-review",
  "check_ids": [
    "admin-conversion-review:CHK-008"
  ],
  "summary": "REGRESSION-watch (known defect): is_capped không hiển thị trên admin Conversion screen. KB item KB-007 mang status=KNOWN_DEFECT da bi go khoi oracle.kb_ids (khong duoc dung lam oracle theo luat C5 'known_defect khong phai expected result'). Check 'CHK-008' hien khong con oracle hop le nao. Can PO/Dev xac nhan: hanh vi mo ta trong expected_result la known defect can tiep tuc theo doi (regression-watch, khong oracle) hay can mot kb_id CONFIRMED_EXPECTED khac thay the lam oracle."
}
```

## OQ-conversion-ledger-013 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-conversion-ledger-013",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "affiliate-conversion-view",
  "check_ids": [
    "affiliate-conversion-view:CHK-002"
  ],
  "summary": "Dòng usage bị cap về đúng $0 không hiển thị trên Conversions page. Oracle nay cung trace toi kb_id (_object-level:KB-002, _object-level:KB-003) co confirmation_source.derivation=code_artifact (suy ra tu doc code/schema, khong phai phat bieu nghiep vu tuong minh - prose). Theo luat 'phanh derivation' cua C5, STRONG chi hop le khi MOI oracle kb_id deu CONFIRMED_EXPECTED va derivation=prose. Ha xuong BASELINE cho toi khi co test_case PASS hoac PO/Dev xac nhan truc tiep (po_dev_confirm) ve hanh vi nay."
}
```

## OQ-conversion-ledger-014 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-conversion-ledger-014",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "affiliate-conversion-view",
  "check_ids": [
    "affiliate-conversion-view:CHK-004"
  ],
  "summary": "Affiliate không có control tạo/sửa Conversion trên dashboard. Oracle STRONG cua check 'CHK-004' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao). Theo luat C5, dev_doc khong duoc la oracle STRONG duy nhat cho check priority P1 (mat du lieu/tien/permission). Ha xuong BASELINE cho toi khi co test_case PASS xac nhan hanh vi, hoac PO/Dev xac nhan truc tiep (po_dev_confirm)."
}
```

## OQ-conversion-ledger-015 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-conversion-ledger-015",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "custom-conversion-entry",
  "check_ids": [
    "custom-conversion-entry:CHK-002"
  ],
  "summary": "Field affiliate trên form không thể đổi sang affiliate khác. Oracle STRONG cua check 'CHK-002' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao). Theo luat C5, dev_doc khong duoc la oracle STRONG duy nhat cho check priority P1 (mat du lieu/tien/permission). Ha xuong BASELINE cho toi khi co test_case PASS xac nhan hanh vi, hoac PO/Dev xac nhan truc tiep (po_dev_confirm)."
}
```

## OQ-conversion-ledger-016 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-conversion-ledger-016",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "custom-conversion-entry",
  "check_ids": [
    "custom-conversion-entry:CHK-003"
  ],
  "summary": "Dropdown Customer chỉ liệt kê shop thuộc chính affiliate đang khoá. Oracle STRONG cua check 'CHK-003' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao). Theo luat C5, dev_doc khong duoc la oracle STRONG duy nhat cho check priority P1 (mat du lieu/tien/permission). Ha xuong BASELINE cho toi khi co test_case PASS xac nhan hanh vi, hoac PO/Dev xac nhan truc tiep (po_dev_confirm)."
}
```

## OQ-conversion-ledger-017 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-conversion-ledger-017",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "custom-conversion-entry",
  "check_ids": [
    "custom-conversion-entry:CHK-013"
  ],
  "summary": "Server-side chặn khi Customer không khớp affiliate đang khoá (ownership mismatch). Oracle STRONG cua check 'CHK-013' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao). Theo luat C5, dev_doc khong duoc la oracle STRONG duy nhat cho check priority P1 (mat du lieu/tien/permission). Ha xuong BASELINE cho toi khi co test_case PASS xac nhan hanh vi, hoac PO/Dev xac nhan truc tiep (po_dev_confirm)."
}
```

## OQ-conversion-ledger-018 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-conversion-ledger-018",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "custom-conversion-entry",
  "check_ids": [
    "custom-conversion-entry:CHK-015"
  ],
  "summary": "Custom Conversion KHÔNG tính vào total_paid_customers để lên bậc Level, dù amount dương lớn. Oracle STRONG cua check 'CHK-015' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao). Theo luat C5, dev_doc khong duoc la oracle STRONG duy nhat cho check priority P1 (mat du lieu/tien/permission). Ha xuong BASELINE cho toi khi co test_case PASS xac nhan hanh vi, hoac PO/Dev xac nhan truc tiep (po_dev_confirm)."
}
```

## OQ-conversion-ledger-019 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-conversion-ledger-019",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "custom-conversion-entry",
  "check_ids": [
    "custom-conversion-entry:CHK-016"
  ],
  "summary": "scope subscription (dùng cho level/bonus/first-month) bỏ qua hoàn toàn Conversion type=custom. Oracle STRONG cua check 'CHK-016' hien trace toi kb_id (KB-016) co confirmation_source.derivation=code_artifact (suy ra tu doc code/schema, khong phai phat bieu nghiep vu tuong minh). Theo luat 'phanh derivation' cua C5, STRONG chi hop le khi MOI oracle kb_id deu CONFIRMED_EXPECTED va derivation=prose. Ha xuong BASELINE cho toi khi PO/Dev xac nhan hanh vi nay dung la chu y thiet ke, khong phai tac dung phu cua viec doc code."
}
```

## OQ-conversion-ledger-020 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-conversion-ledger-020",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "custom-conversion-entry",
  "check_ids": [
    "custom-conversion-entry:CHK-018"
  ],
  "summary": "Custom Conversion amount dương CÓ cộng vào balance affiliate qua ConversionObserver. Oracle STRONG cua check 'CHK-018' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao). Theo luat C5, dev_doc khong duoc la oracle STRONG duy nhat cho check priority P1 (mat du lieu/tien/permission). Ha xuong BASELINE cho toi khi co test_case PASS xac nhan hanh vi, hoac PO/Dev xac nhan truc tiep (po_dev_confirm)."
}
```

## OQ-conversion-ledger-021 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-conversion-ledger-021",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "custom-conversion-entry",
  "check_ids": [
    "custom-conversion-entry:CHK-019"
  ],
  "summary": "Custom Conversion amount âm trừ đúng balance, không có cơ chế nào chặn. Oracle STRONG cua check 'CHK-019' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao). Theo luat C5, dev_doc khong duoc la oracle STRONG duy nhat cho check priority P1 (mat du lieu/tien/permission). Ha xuong BASELINE cho toi khi co test_case PASS xac nhan hanh vi, hoac PO/Dev xac nhan truc tiep (po_dev_confirm)."
}
```

## OQ-conversion-ledger-022 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-conversion-ledger-022",
  "type": "NEEDS_CONFIRMATION",
  "check_ids": [
    "affiliate-conversion-view:CHK-008"
  ],
  "summary": "Badge 'cap reached' (is_capped=true) ẩn hoàn toàn khi amount cap về đúng $0. Oracle dựa trên KB-002, derivation=code_artifact — theo phanh derivation không đủ làm oracle STRONG. Cần xác nhận từ nguồn mạnh hơn."
}
```
