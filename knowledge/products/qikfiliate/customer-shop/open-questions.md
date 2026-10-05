# Open Questions — customer-shop Tổng: 10 mục (NEEDS_CONFIRMATION/CONFLICT/OPEN_ISSUE). Sinh từ bootstrap DOC_BOOTSTRAP đầu tiên cho qikfiliate. ## OQ-customer-shop-001 — OPEN_ISSUE ```json
{ "oq_id": "OQ-customer-shop-001", "type": "OPEN_ISSUE", "feature_id": "customer-lifecycle-state", "kb_id": "KB-012", "summary": "KNOWN DEFECT (KB-012, feature customer-lifecycle-state): KNOWN DEFECT — giá trị name sai hiển thị nguyên văn. Theo tài liệu `integration api - customer lifecycle api` §Rủi ro 1, hậu quả của việc request `POST /api/customer-events` không chặn giá trị `name` sai (xem feature liên quan ở object integration-api) là trạng thái hiển thị trên CẢ admin panel LẪN dashboard affiliate hiện chuỗi lạ (ví dụ \"subcribed\") thay vì nhãn đã định nghĩa sẵn (ví dụ \"Subscribed\")."
}
``` ## OQ-customer-shop-002 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-customer-shop-002", "type": "NEEDS_CONFIRMATION", "feature_id": "customer-lifecycle-state", "check_ids": [ "CHK-010" ], "summary": "Nhãn màu cho 2 trạng thái còn lại (upgraded, canceled) chưa được tài liệu hoá đầy đủ. Nhãn màu của 2 trạng thái còn lại (upgraded, canceled) là gì? Tài liệu chỉ nêu 4/6 rồi bỏ lửng — không đủ để viết test case UI đầy đủ cho toàn bộ 6 trạng thái màu."
}
``` ## OQ-customer-shop-003 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-customer-shop-003", "type": "NEEDS_CONFIRMATION", "feature_id": "customer-shop-registry", "check_ids": [ "CHK-006" ], "summary": "Customer đã soft-delete có còn hiển thị trên admin list mặc định hay bị ẩn (withTrashed scope). Màn hình Customer list mặc định trên admin có còn hiển thị shop đã soft-delete (gỡ app) không, hay chỉ hiển thị shop active? Cần PO/Dev xác nhận trước khi viết oracle cho test state soft-deleted ở tầng UI."
}
``` ## OQ-customer-shop-004 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-customer-shop-004", "type": "NEEDS_CONFIRMATION", "feature_id": "customer-shop-registry", "check_ids": [ "CHK-009" ], "summary": "Admin có hành động xoá/khôi phục Customer trực tiếp từ UI, hay soft-delete chỉ xảy ra tự động. Admin có hành động xoá/khôi phục Customer trực tiếp từ UI không, hay soft-delete chỉ xảy ra tự động khi shop gỡ app? Nếu admin có quyền xoá tay, cần test case khác với trigger tự động."
}
``` ## OQ-customer-shop-005 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-customer-shop-005", "type": "NEEDS_CONFIRMATION", "feature_id": "customer-shop-registry", "check_ids": [ "CHK-010" ], "summary": "Soft-delete 1 Customer có ảnh hưởng gì tới Conversion đã có hoặc tới cap lifetime usage tính tại thời điểm xoá (phía admin-triggered, nếu tồn tại). Xoá (soft-delete) 1 Customer từ admin (nếu tồn tại action này) có ảnh hưởng gì khác so với trigger tự động (client app uninstall) tới Conversion đã có và tới cap lifetime usage của affiliate? Chưa được tài liệu nhóm admin trả lời trực tiếp."
}
```

## OQ-customer-shop-006 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-customer-shop-006",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": [
    "customer-lifecycle-state",
    "customer-shop-registry"
  ],
  "check_ids": [
    "customer-lifecycle-state:CHK-001",
    "customer-shop-registry:CHK-001"
  ],
  "summary": "CustomerEvent.name chỉ nhận 1 trong đúng 6 giá trị enum hợp lệ. Oracle STRONG cua check 'CHK-001' hien trace toi kb_id (KB-002) co confirmation_source.derivation=code_artifact (suy ra tu doc code/schema, khong phai phat bieu nghiep vu tuong minh). Theo luat 'phanh derivation' cua C5, STRONG chi hop le khi MOI oracle kb_id deu CONFIRMED_EXPECTED va derivation=prose. Ha xuong BASELINE cho toi khi PO/Dev xac nhan hanh vi nay dung la chu y thiet ke, khong phai tac dung phu cua viec doc code."
}
```

## OQ-customer-shop-007 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-customer-shop-007",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "customer-lifecycle-state",
  "check_ids": [
    "customer-lifecycle-state:CHK-002"
  ],
  "summary": "CustomerEvent vẫn xem được dù Customer liên quan đã soft-delete. Oracle STRONG cua check 'CHK-002' hien trace toi kb_id (KB-003) co confirmation_source.derivation=code_artifact (suy ra tu doc code/schema, khong phai phat bieu nghiep vu tuong minh). Theo luat 'phanh derivation' cua C5, STRONG chi hop le khi MOI oracle kb_id deu CONFIRMED_EXPECTED va derivation=prose. Ha xuong BASELINE cho toi khi PO/Dev xac nhan hanh vi nay dung la chu y thiet ke, khong phai tac dung phu cua viec doc code."
}
```

## OQ-customer-shop-008 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-customer-shop-008",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "customer-lifecycle-state",
  "check_ids": [
    "customer-lifecycle-state:CHK-003"
  ],
  "summary": "Trạng thái hiển thị (cả admin panel và dashboard affiliate) phản ánh đúng CustomerEvent mới nhất (latestEvent). Oracle STRONG cua check 'CHK-003' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao). Theo luat C5, dev_doc khong duoc la oracle STRONG duy nhat cho check priority P1 (mat du lieu/tien/permission). Ha xuong BASELINE cho toi khi co test_case PASS xac nhan hanh vi, hoac PO/Dev xac nhan truc tiep (po_dev_confirm)."
}
```

## OQ-customer-shop-009 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-customer-shop-009",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "customer-lifecycle-state",
  "check_ids": [
    "customer-lifecycle-state:CHK-011"
  ],
  "summary": "REGRESSION-watch (known defect): POST /api/customer-events với name sai chính tả không bị chặn, hiển thị chuỗi lạ thay vì nhãn đã định nghĩa. KB item KB-012 mang status=KNOWN_DEFECT da bi go khoi oracle.kb_ids (khong duoc dung lam oracle theo luat C5 'known_defect khong phai expected result'). Check 'CHK-011' hien khong con oracle hop le nao. Can PO/Dev xac nhan: hanh vi mo ta trong expected_result la known defect can tiep tuc theo doi (regression-watch, khong oracle) hay can mot kb_id CONFIRMED_EXPECTED khac thay the lam oracle."
}
```

## OQ-customer-shop-010 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-customer-shop-010",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": [
    "customer-lifecycle-state",
    "customer-shop-registry"
  ],
  "check_ids": [
    "customer-lifecycle-state:CHK-012",
    "customer-shop-registry:CHK-007"
  ],
  "summary": "Customer uninstalled (soft-deleted) vẫn tính vào cap lifetime usage-charge — nhất quán với object-level invariant. Oracle STRONG cua check 'CHK-012' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao). Theo luat C5, dev_doc khong duoc la oracle STRONG duy nhat cho check priority P1. Oracle nay cung trace toi kb_id (_object-level:KB-001) co confirmation_source.derivation=code_artifact (suy ra tu doc code/schema, khong phai phat bieu nghiep vu tuong minh - prose). Theo luat 'phanh derivation' cua C5, STRONG chi hop le khi MOI oracle kb_id deu CONFIRMED_EXPECTED va derivation=prose. Ha xuong BASELINE cho toi khi co test_case PASS hoac PO/Dev xac nhan truc tiep (po_dev_confirm) ve hanh vi nay."
}
```
