# Open Questions — affiliate-level Tổng: 24 mục (NEEDS_CONFIRMATION/CONFLICT/OPEN_ISSUE). Sinh từ bootstrap DOC_BOOTSTRAP đầu tiên cho qikfiliate. ## OQ-affiliate-level-001 — OPEN_ISSUE ```json
{ "oq_id": "OQ-affiliate-level-001", "type": "OPEN_ISSUE", "feature_id": "vip-level-override", "kb_id": "KB-007", "summary": "KNOWN DEFECT (KB-007, feature vip-level-override): [KNOWN_DEFECT] is_vip=true mà không đặt level -> tra Level ra null. Tài liệu `qikfiliate/commission - level` §`User journey — admin cấu hình VIP` (mục ⚠️ Lưu ý khi test) nêu rằng nếu admin bật `is_vip` nhưng không đặt `level` (để trống hoặc giá trị không khớp `level_index` nào tồn tại) thì truy vấn tra Level trả về null. Đây là hành vi SAI đang tồn tại (known defect), KHÔNG phải expected result — giữ nguyên trạng để làm regression watch."
}
``` ## OQ-affiliate-level-002 — OPEN_ISSUE ```json
{ "oq_id": "OQ-affiliate-level-002", "type": "OPEN_ISSUE", "feature_id": "vip-level-override", "kb_id": "KB-008", "summary": "KNOWN DEFECT (KB-008, feature vip-level-override): [KNOWN_DEFECT] Level null -> lỗi tra ProgramCommission ở bước sau. Tài liệu `qikfiliate/commission - level` §`User journey — admin cấu hình VIP` (mục ⚠️ Lưu ý khi test) nêu rằng khi level của affiliate VIP là null thì bước tra ProgramCommission tiếp theo sẽ lỗi vì không tìm được rate, và đây là kịch bản QA nên test riêng (regression watch, không phải expected result)."
}
``` ## OQ-affiliate-level-003 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-affiliate-level-003", "type": "NEEDS_CONFIRMATION", "feature_id": "level-definition-management", "check_ids": [ "CHK-DEFLEVEL-007" ], "summary": "[NEEDS_CONFIRMATION] Sửa min_paid_customers hoặc xoá 1 Level đang được affiliate dùng — hệ quả là gì?. Sửa min_paid_customers hoặc xoá 1 Level đang được affiliate dùng thì ảnh hưởng gì (level affiliate có tự đổi, Conversion cũ có bị ảnh hưởng, rate card của Level đó đi đâu)? Cần PO/Dev xác nhận."
}
``` ## OQ-affiliate-level-004 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-affiliate-level-004", "type": "NEEDS_CONFIRMATION", "feature_id": "level-definition-management", "check_ids": [ "CHK-DEFLEVEL-008" ], "summary": "[NEEDS_CONFIRMATION] Lệnh CLI `user-level:update` có HẠ bậc hay ghi đè affiliate đang is_vip=true không?. Lệnh CLI `user-level:update` (chạy để nâng bậc affiliate hiện tại ngay sau khi thêm Level mới) có HẠ bậc hay ghi đè affiliate đang is_vip=true không? Cần nối với shard admin-console/data-maintenance-commands qua knowledge-diff-analyzer/orchestrator, hoặc hỏi PO/Dev trực tiếp."
}
``` ## OQ-affiliate-level-005 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-affiliate-level-005", "type": "NEEDS_CONFIRMATION", "feature_id": "level-progression", "check_ids": [ "CHK-LEVEL-011" ], "summary": "[NEEDS_CONFIRMATION] Cấu hình Level THẬT (số bậc, ngưỡng min_paid_customers) đang chạy cho brand koin. Cấu hình Level THẬT đang chạy cho brand koin (bao nhiêu bậc, ngưỡng min_paid_customers cụ thể) là gì? Cần tra trực tiếp hoặc PO/Dev xác nhận trước khi viết test case có số liệu cụ thể (ngoài CHK-LEVEL-003/004 đã viết tham số hoá)."
}
``` ## OQ-affiliate-level-006 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-affiliate-level-006", "type": "NEEDS_CONFIRMATION", "feature_id": "level-progression", "check_ids": [ "CHK-LEVEL-012" ], "summary": "[NEEDS_CONFIRMATION] Tie-break khi 2 Level cấu hình TRÙNG min_paid_customers. Khi 2 Level được cấu hình TRÙNG min_paid_customers, Level nào được chọn (theo level_index, id, hay thứ tự tạo)? Cần PO/Dev xác nhận — đây là lỗi cấu hình dễ xảy ra ở màn hình Level."
}
``` ## OQ-affiliate-level-007 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-affiliate-level-007", "type": "NEEDS_CONFIRMATION", "feature_id": "level-progression", "check_ids": [ "CHK-LEVEL-013" ], "summary": "[NEEDS_CONFIRMATION] Hệ quả của level=0 ở bước tính hoa hồng tiếp theo. Khi level=0 (không Level nào thoả điều kiện), bước tra ProgramCommission tiếp theo xử lý thế nào — có Level với level_index=0 nhận dòng đó, hay dòng import bị lỗi tương tự case VIP thiếu level? Cần PO/Dev xác nhận."
}
``` ## OQ-affiliate-level-008 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-affiliate-level-008", "type": "NEEDS_CONFIRMATION", "feature_id": "level-progression", "check_ids": [ "CHK-LEVEL-014" ], "summary": "[NEEDS_CONFIRMATION] Ngoài form tay lúc tạo và is_vip=true, có đường ghi đè level nào khác bỏ qua công thức tự tính không?. Ngoài việc tạo affiliate bằng form tay (level mặc định=1) và is_vip=true (ghim level), có đường nào khác (API, lệnh CLI, màn hình khác) có thể ghi đè field level của affiliate không VIP không? Cần PO/Dev xác nhận để đảm bảo công thức tự tính không bị bỏ qua ngoài ý muốn."
}
``` ## OQ-affiliate-level-009 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-affiliate-level-009", "type": "NEEDS_CONFIRMATION", "feature_id": "vip-level-override", "check_ids": [ "CHK-VIP-008" ], "summary": "[NEEDS_CONFIRMATION] Có validate required_if chặn admin bật is_vip mà bỏ trống level trên form User không?. Form User có validate required_if chặn admin bật is_vip=ON mà bỏ trống level không? Đây là ranh giới giữa 'lỗi cấu hình người dùng' và 'thiếu validate' — quyết định KB-007 có nên fix ở tầng form hay không. Cần PO/Dev xác nhận."
}
``` ## OQ-affiliate-level-010 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-affiliate-level-010", "type": "NEEDS_CONFIRMATION", "feature_id": "vip-level-override", "check_ids": [ "CHK-VIP-009" ], "summary": "[NEEDS_CONFIRMATION] Hệ thống có kiểm giá trị level admin nhập tay phải tồn tại trong bảng Level không?. Khi admin set tay level cho affiliate VIP, hệ thống có kiểm giá trị đó phải tồn tại trong bảng Level không? Thiếu rate card cho 1 cặp (Program, Level) gây lỗi import — cần PO/Dev xác nhận."
}
```

## OQ-affiliate-level-011 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-affiliate-level-011",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "level-definition-management",
  "check_ids": [
    "level-definition-management:CHK-DEFLEVEL-004"
  ],
  "summary": "level_index là số thứ tự bậc, không phải danh sách giá trị đóng — nhận giá trị ngoài dãy ví dụ 0-3. Oracle STRONG cua check 'CHK-DEFLEVEL-004' hien trace toi kb_id (KB-002) co confirmation_source.derivation=code_artifact (suy ra tu doc code/schema, khong phai phat bieu nghiep vu tuong minh). Theo luat 'phanh derivation' cua C5, STRONG chi hop le khi MOI oracle kb_id deu CONFIRMED_EXPECTED va derivation=prose. Ha xuong BASELINE cho toi khi PO/Dev xac nhan hanh vi nay dung la chu y thiet ke, khong phai tac dung phu cua viec doc code."
}
```

## OQ-affiliate-level-012 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-affiliate-level-012",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "level-definition-management",
  "check_ids": [
    "level-definition-management:CHK-DEFLEVEL-005"
  ],
  "summary": "Sau khi thêm Level mới, admin tạo được rate card (Program Commission) cho MỌI Program đang hoạt động ở Level đó. Oracle STRONG cua check 'CHK-DEFLEVEL-005' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao). Theo luat C5, dev_doc khong duoc la oracle STRONG duy nhat cho check priority P1 (mat du lieu/tien/permission). Ha xuong BASELINE cho toi khi co test_case PASS xac nhan hanh vi, hoac PO/Dev xac nhan truc tiep (po_dev_confirm)."
}
```

## OQ-affiliate-level-013 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-affiliate-level-013",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "level-definition-management",
  "check_ids": [
    "level-definition-management:CHK-DEFLEVEL-006"
  ],
  "summary": "Bỏ sót rate card cho 1 Program ở Level mới gây lỗi import khi affiliate lên được Level đó có shop thuộc Program bị bỏ sót. Oracle STRONG cua check 'CHK-DEFLEVEL-006' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao). Theo luat C5, dev_doc khong duoc la oracle STRONG duy nhat cho check priority P1 (mat du lieu/tien/permission). Ha xuong BASELINE cho toi khi co test_case PASS xac nhan hanh vi, hoac PO/Dev xac nhan truc tiep (po_dev_confirm)."
}
```

## OQ-affiliate-level-014 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-affiliate-level-014",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "level-progression",
  "check_ids": [
    "level-progression:CHK-LEVEL-001"
  ],
  "summary": "Level của affiliate quyết định rate hoa hồng (ProgramCommission) áp dụng khi tính Conversion. Oracle STRONG cua check 'CHK-LEVEL-001' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao). Theo luat C5, dev_doc khong duoc la oracle STRONG duy nhat cho check priority P1 (mat du lieu/tien/permission). Ha xuong BASELINE cho toi khi co test_case PASS xac nhan hanh vi, hoac PO/Dev xac nhan truc tiep (po_dev_confirm)."
}
```

## OQ-affiliate-level-015 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-affiliate-level-015",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "level-progression",
  "check_ids": [
    "level-progression:CHK-LEVEL-002"
  ],
  "summary": "total_paid_customers chỉ tính Customer có Conversion loại first/recurring, loại trừ usage và custom. Oracle STRONG cua check 'CHK-LEVEL-002' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao). Theo luat C5, dev_doc khong duoc la oracle STRONG duy nhat cho check priority P1 (mat du lieu/tien/permission). Ha xuong BASELINE cho toi khi co test_case PASS xac nhan hanh vi, hoac PO/Dev xac nhan truc tiep (po_dev_confirm)."
}
```

## OQ-affiliate-level-016 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-affiliate-level-016",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "level-progression",
  "check_ids": [
    "level-progression:CHK-LEVEL-003"
  ],
  "summary": "Level được chọn là Level có min_paid_customers cao nhất thoả điều kiện (với affiliate không VIP). Oracle STRONG cua check 'CHK-LEVEL-003' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao). Theo luat C5, dev_doc khong duoc la oracle STRONG duy nhat cho check priority P1 (mat du lieu/tien/permission). Ha xuong BASELINE cho toi khi co test_case PASS xac nhan hanh vi, hoac PO/Dev xac nhan truc tiep (po_dev_confirm)."
}
```

## OQ-affiliate-level-017 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-affiliate-level-017",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "level-progression",
  "check_ids": [
    "level-progression:CHK-LEVEL-006"
  ],
  "summary": "Dòng payout đã xử lý TRƯỚC khi affiliate lên bậc giữ nguyên rate của Level cũ (không hồi tố). Oracle STRONG cua check 'CHK-LEVEL-006' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao). Theo luat C5, dev_doc khong duoc la oracle STRONG duy nhat cho check priority P1 (mat du lieu/tien/permission). Ha xuong BASELINE cho toi khi co test_case PASS xac nhan hanh vi, hoac PO/Dev xac nhan truc tiep (po_dev_confirm)."
}
```

## OQ-affiliate-level-018 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-affiliate-level-018",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "level-progression",
  "check_ids": [
    "level-progression:CHK-LEVEL-007"
  ],
  "summary": "Dòng payout xử lý SAU khi lên bậc (kể cả cùng file) dùng rate của Level mới. Oracle STRONG cua check 'CHK-LEVEL-007' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao). Theo luat C5, dev_doc khong duoc la oracle STRONG duy nhat cho check priority P1 (mat du lieu/tien/permission). Ha xuong BASELINE cho toi khi co test_case PASS xac nhan hanh vi, hoac PO/Dev xac nhan truc tiep (po_dev_confirm)."
}
```

## OQ-affiliate-level-019 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-affiliate-level-019",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "level-progression",
  "check_ids": [
    "level-progression:CHK-LEVEL-009"
  ],
  "summary": "User.level đồng bộ đúng với Level.level_index sau khi tính lại. Oracle STRONG cua check 'CHK-LEVEL-009' hien trace toi kb_id (KB-020) co confirmation_source.derivation=code_artifact (suy ra tu doc code/schema, khong phai phat bieu nghiep vu tuong minh). Theo luat 'phanh derivation' cua C5, STRONG chi hop le khi MOI oracle kb_id deu CONFIRMED_EXPECTED va derivation=prose. Ha xuong BASELINE cho toi khi PO/Dev xac nhan hanh vi nay dung la chu y thiet ke, khong phai tac dung phu cua viec doc code."
}
```

## OQ-affiliate-level-020 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-affiliate-level-020",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "vip-level-override",
  "check_ids": [
    "vip-level-override:CHK-VIP-001"
  ],
  "summary": "is_vip=true bỏ qua hoàn toàn công thức total_paid_customers, dùng thẳng Level có level_index=User.level. Oracle STRONG cua check 'CHK-VIP-001' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao). Theo luat C5, dev_doc khong duoc la oracle STRONG duy nhat cho check priority P1 (mat du lieu/tien/permission). Ha xuong BASELINE cho toi khi co test_case PASS xac nhan hanh vi, hoac PO/Dev xac nhan truc tiep (po_dev_confirm)."
}
```

## OQ-affiliate-level-021 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-affiliate-level-021",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "vip-level-override",
  "check_ids": [
    "vip-level-override:CHK-VIP-005"
  ],
  "summary": "Từ lần import payout tiếp theo, mọi dòng của affiliate VIP dùng ProgramCommission ứng với Level đã ghim. Oracle STRONG cua check 'CHK-VIP-005' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao). Theo luat C5, dev_doc khong duoc la oracle STRONG duy nhat cho check priority P1 (mat du lieu/tien/permission). Ha xuong BASELINE cho toi khi co test_case PASS xac nhan hanh vi, hoac PO/Dev xac nhan truc tiep (po_dev_confirm)."
}
```

## OQ-affiliate-level-022 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-affiliate-level-022",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "vip-level-override",
  "check_ids": [
    "vip-level-override:CHK-VIP-006"
  ],
  "summary": "[KNOWN_DEFECT KB-007] is_vip=true nhưng level để trống hoặc không khớp level_index nào tồn tại. KB item KB-007 mang status=KNOWN_DEFECT da bi go khoi oracle.kb_ids (khong duoc dung lam oracle theo luat C5 'known_defect khong phai expected result'). Check 'CHK-VIP-006' hien khong con oracle hop le nao. Can PO/Dev xac nhan: hanh vi mo ta trong expected_result la known defect can tiep tuc theo doi (regression-watch, khong oracle) hay can mot kb_id CONFIRMED_EXPECTED khac thay the lam oracle."
}
```

## OQ-affiliate-level-023 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-affiliate-level-023",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "vip-level-override",
  "check_ids": [
    "vip-level-override:CHK-VIP-007"
  ],
  "summary": "[KNOWN_DEFECT KB-008] Level null ở affiliate VIP làm lỗi bước tra ProgramCommission tiếp theo. KB item KB-008 mang status=KNOWN_DEFECT da bi go khoi oracle.kb_ids (khong duoc dung lam oracle theo luat C5 'known_defect khong phai expected result'). Check 'CHK-VIP-007' hien khong con oracle hop le nao. Can PO/Dev xac nhan: hanh vi mo ta trong expected_result la known defect can tiep tuc theo doi (regression-watch, khong oracle) hay can mot kb_id CONFIRMED_EXPECTED khac thay the lam oracle."
}
```

## OQ-affiliate-level-024 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-affiliate-level-024",
  "type": "NEEDS_CONFIRMATION",
  "check_ids": [
    "vip-level-override:CHK-VIP-010"
  ],
  "summary": "Tắt is_vip (true→false) khôi phục lại tính Level theo công thức total_paid_customers từ lần import tiếp theo. Oracle dựa trên KB-001, derivation=code_artifact — theo phanh derivation không đủ làm oracle STRONG. Cần xác nhận từ nguồn mạnh hơn."
}
```
