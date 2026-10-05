# Open Questions — commission-rate-card Tổng: 27 mục (NEEDS_CONFIRMATION/CONFLICT/OPEN_ISSUE). Sinh từ bootstrap DOC_BOOTSTRAP đầu tiên cho qikfiliate. ## OQ-commission-rate-card-001 — OPEN_ISSUE ```json
{ "oq_id": "OQ-commission-rate-card-001", "type": "OPEN_ISSUE", "feature_id": "rate-card-configuration", "kb_id": "KB-RCC-005", "summary": "KNOWN DEFECT (KB-RCC-005, feature rate-card-configuration): KNOWN DEFECT — thêm Level mới dễ bỏ quên tạo ProgramCommission cho Program hiện có. Theo tài liệu known-issues-edge-cases §B2, khi thêm 1 Level mới vào hệ thống (ví dụ mở Level 4 cho affiliate VIP), admin PHẢI NHỚ tạo `ProgramCommission` cho MỌI Program hiện có ở Level mới đó; nếu quên, dòng payout của affiliate ở Level mới cho Program bị thiếu sẽ lỗi khi import (cùng cơ chế thiếu cấu hình như khi launch Program mới). Đây là một trách nhiệm thủ công dễ bị bỏ sót, không có cảnh báo chủ động từ hệ thống."
}
``` ## OQ-commission-rate-card-002 — OPEN_ISSUE ```json
{ "oq_id": "OQ-commission-rate-card-002", "type": "OPEN_ISSUE", "feature_id": "rate-card-configuration", "kb_id": "KB-RCC-007", "summary": "KNOWN DEFECT (KB-RCC-007, feature rate-card-configuration): KNOWN DEFECT — màn Program Commission hiển thị số âm sai format so với Conversion/Invoice. Theo tài liệu known-issues-edge-cases §E3, màn Program Commission hiển thị giá trị tiền âm dạng `$-4.31` (nối chuỗi thô), khác định dạng với các màn Conversion/Invoice (hiển thị đúng chuẩn `-$4.31`). Không sai dữ liệu, chỉ sai format hiển thị, dễ gây nhầm khi đọc nhanh."
}
``` ## OQ-commission-rate-card-003 — OPEN_ISSUE ```json
{ "oq_id": "OQ-commission-rate-card-003", "type": "OPEN_ISSUE", "feature_id": "usage-commission-enablement", "kb_id": "KB-UCE-008", "summary": "KNOWN DEFECT (KB-UCE-008, feature usage-commission-enablement): KNOWN DEFECT — rủi ro cơ chế Grid-switch bỏ qua required_if (lớp rủi ro chung, lý do UI dùng icon chỉ-xem). Theo tài liệu `qikfiliate/admin - programs and commissions` §`Bẫy dễ mắc` và tài liệu `qikfiliate/commission - usage` §`User journey — admin bật usage-commission cho 1 Program`: nếu field `handle_usage_charge` được để dạng switch bấm nhanh (inline) trên danh sách — như cơ chế `Grid\\Column::switch` của laravel-admin — nó sẽ bỏ qua toàn bộ validate `required_if` của form, có thể tạo ra trạng thái 'bật usage charge nhưng không có rate' mà không ai biết cho tới khi có dòng usage charge thật bị tính sai hoặc tính $0. Đây chính là lý do KB-UCE-007 (icon chỉ-xem) tồn tại như một biện pháp phòng ngừa chủ đích; rủi ro này là đặc tính đã biết của cơ chế Grid-switch, không phải phát biểu rằng màn hình hiện tại đang hỏng cho fie"
}
``` ## OQ-commission-rate-card-004 — OPEN_ISSUE ```json
{ "oq_id": "OQ-commission-rate-card-004", "type": "OPEN_ISSUE", "feature_id": "usage-commission-enablement", "kb_id": "KB-UCE-012", "summary": "KNOWN DEFECT (KB-UCE-012, feature usage-commission-enablement): KNOWN DEFECT — skip do cấu hình không phân biệt được với skip do lỗi khác, banner không báo gì. Theo tài liệu known-issues-edge-cases §A4, khi một dòng usage bị skip do `handle_usage_charge = false`, banner kết quả import KHÔNG báo lỗi gì (im lặng — 'bị skip do cấu hình' chứ không phải 'bị skip do lỗi'). Kết quả cuối (không có Conversion) giống với các nguyên nhân skip khác (A1: thiếu app_slug, A2: Partner Share rỗng), nên rất dễ nhầm lẫn nguyên nhân khi debug."
}
``` ## OQ-commission-rate-card-005 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-commission-rate-card-005", "type": "NEEDS_CONFIRMATION", "feature_id": "rate-card-configuration", "check_ids": [ "CHK-008" ], "summary": "NEEDS_CONFIRMATION: maximum_amount để trống nghĩa là không cap hay cap=0. Khi maximum_amount (hoặc usage_maximum_amount) để TRỐNG, hệ thống hiểu là KHÔNG CAP (unlimited) hay CAP = 0 (chặn hoàn toàn hoa hồng)?"
}
``` ## OQ-commission-rate-card-006 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-commission-rate-card-006", "type": "NEEDS_CONFIRMATION", "feature_id": "rate-card-configuration", "check_ids": [ "CHK-009" ], "summary": "NEEDS_CONFIRMATION: có validate chặn maximum_amount âm không. ProgramCommission.maximum_amount/usage_maximum_amount có validate chặn giá trị âm khi tạo/sửa không? Nếu giá trị âm xuất hiện trong dữ liệu thực tế (như kịch bản E3, -4.31), đó là input hợp lệ hay hệ quả của 1 lỗi khác (ví dụ tính sai ở bước refund/downgrade)?"
}
``` ## OQ-commission-rate-card-007 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-commission-rate-card-007", "type": "NEEDS_CONFIRMATION", "feature_id": "rate-card-configuration", "check_ids": [ "CHK-014" ], "summary": "NEEDS_CONFIRMATION: log/audit và bước duyệt khi sửa rate card. Khi admin sửa rate card (percentage/maximum_amount/first_month_percentage), hệ thống có ghi log/audit (ai sửa, lúc nào, giá trị cũ -> mới) không? Có cần bước duyệt (approval) nào trước khi thay đổi có hiệu lực không?"
}
``` ## OQ-commission-rate-card-008 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-commission-rate-card-008", "type": "NEEDS_CONFIRMATION", "feature_id": "rate-card-configuration", "check_ids": [ "CHK-015" ], "summary": "NEEDS_CONFIRMATION: quy trình áp hồi tố rate card mới cho Conversion cũ. Khi cần áp dụng hồi tố rate card mới cho Conversion đã tồn tại, quy trình/lệnh thực tế là gì? Ai thực hiện, qua công cụ nào?"
}
``` ## OQ-commission-rate-card-009 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-commission-rate-card-009", "type": "NEEDS_CONFIRMATION", "feature_id": "usage-commission-enablement", "check_ids": [ "CHK-007" ], "summary": "NEEDS_CONFIRMATION: cap lifetime vs cap theo kỳ — ý định thiết kế chưa chốt với PO. usage_maximum_amount là cap CẢ ĐỜI (lifetime, không reset) theo đúng ý định thiết kế của PO, hay PO thực ra hiểu/muốn đây là cap THEO KỲ (per-period, ví dụ reset mỗi tháng)?"
}
``` ## OQ-commission-rate-card-010 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-commission-rate-card-010", "type": "NEEDS_CONFIRMATION", "feature_id": "usage-commission-enablement", "check_ids": [ "CHK-013" ], "summary": "NEEDS_CONFIRMATION: re-import/khắc phục các dòng usage bị skip âm thầm, rủi ro nhân đôi Conversion. Có cơ chế nào trong admin để re-import hoặc sửa riêng các dòng usage đã bị skip âm thầm (do handle_usage_charge=false hoặc do lỗi khác) không? Nếu admin import lại TOÀN BỘ file CSV sau khi đã sửa cấu hình, các dòng ĐÃ được tính hoa hồng ở lần import trước có bị tính Conversion trùng lần 2 không?"
}
```

## OQ-commission-rate-card-011 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-commission-rate-card-011",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": [
    "rate-card-configuration",
    "usage-commission-enablement"
  ],
  "check_ids": [
    "rate-card-configuration:CHK-001",
    "usage-commission-enablement:CHK-001"
  ],
  "summary": "percentage cấu hình % hoa hồng recurring bình thường. Oracle STRONG cua check 'CHK-001' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao)."
}
```

## OQ-commission-rate-card-012 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-commission-rate-card-012",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "rate-card-configuration",
  "check_ids": [
    "rate-card-configuration:CHK-002"
  ],
  "summary": "maximum_amount cap đúng trên TỪNG DÒNG conversion (per-row), không cộng dồn nhiều dòng. Oracle STRONG cua check 'CHK-002' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao)."
}
```

## OQ-commission-rate-card-013 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-commission-rate-card-013",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": [
    "rate-card-configuration",
    "usage-commission-enablement"
  ],
  "check_ids": [
    "rate-card-configuration:CHK-003",
    "usage-commission-enablement:CHK-003"
  ],
  "summary": "first_month_percentage chỉ áp dụng cho tháng đầu tiên của 1 customer. Oracle STRONG cua check 'CHK-003' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao)."
}
```

## OQ-commission-rate-card-014 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-commission-rate-card-014",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "rate-card-configuration",
  "check_ids": [
    "rate-card-configuration:CHK-004"
  ],
  "summary": "name của dòng ProgramCommission có thể để trống (nullable). Oracle STRONG cua check 'CHK-004' hien trace toi kb_id (KB-RCC-003) co confirmation_source.derivation=code_artifact (suy ra tu doc code/schema, khong phai phat bieu nghiep vu tuong minh)."
}
```

## OQ-commission-rate-card-015 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-commission-rate-card-015",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": [
    "rate-card-configuration",
    "usage-commission-enablement"
  ],
  "check_ids": [
    "rate-card-configuration:CHK-005",
    "usage-commission-enablement:CHK-005"
  ],
  "summary": "Không có validate ép first_month_percentage phải cao hơn percentage. Oracle STRONG cua check 'CHK-005' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao)."
}
```

## OQ-commission-rate-card-016 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-commission-rate-card-016",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": [
    "rate-card-configuration",
    "usage-commission-enablement"
  ],
  "check_ids": [
    "rate-card-configuration:CHK-006",
    "usage-commission-enablement:CHK-006"
  ],
  "summary": "Sửa rate card chỉ áp dụng cho dòng import SAU thời điểm lưu (forward-only). Oracle STRONG cua check 'CHK-006' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao)."
}
```

## OQ-commission-rate-card-017 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-commission-rate-card-017",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "rate-card-configuration",
  "check_ids": [
    "rate-card-configuration:CHK-007"
  ],
  "summary": "Admin panel không có tính năng 'recalculate' tự động cho Conversion cũ sau khi sửa rate card. Oracle STRONG cua check 'CHK-007' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao)."
}
```

## OQ-commission-rate-card-018 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-commission-rate-card-018",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "rate-card-configuration",
  "check_ids": [
    "rate-card-configuration:CHK-010"
  ],
  "summary": "Regression-watch: thêm Level mới dễ bỏ quên tạo ProgramCommission cho Program hiện có. KB item KB-RCC-005 mang status=KNOWN_DEFECT da bi go khoi oracle.kb_ids (khong duoc dung lam oracle theo luat C5 'known_defect khong phai expected result'). Check 'CHK-010' hien khong con oracle hop le nao."
}
```

## OQ-commission-rate-card-019 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-commission-rate-card-019",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "rate-card-configuration",
  "check_ids": [
    "rate-card-configuration:CHK-011"
  ],
  "summary": "Regression-watch: màn Program Commission hiển thị số âm sai format so với Conversion/Invoice. KB item KB-RCC-007 mang status=KNOWN_DEFECT da bi go khoi oracle.kb_ids (khong duoc dung lam oracle theo luat C5 'known_defect khong phai expected result'). Check 'CHK-011' hien khong con oracle hop le nao."
}
```

## OQ-commission-rate-card-020 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-commission-rate-card-020",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "rate-card-configuration",
  "check_ids": [
    "rate-card-configuration:CHK-013"
  ],
  "summary": "Chỉ role admin được cấu hình rate card (ProgramCommission). Oracle STRONG cua check 'CHK-013' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao)."
}
```

## OQ-commission-rate-card-021 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-commission-rate-card-021",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "usage-commission-enablement",
  "check_ids": [
    "usage-commission-enablement:CHK-004"
  ],
  "summary": "usage_percentage chỉ có ý nghĩa khi handle_usage_charge=true. Oracle STRONG cua check 'CHK-004' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao)."
}
```

## OQ-commission-rate-card-022 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-commission-rate-card-022",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "usage-commission-enablement",
  "check_ids": [
    "usage-commission-enablement:CHK-009"
  ],
  "summary": "Regression-watch: cơ chế Grid-switch (nếu bị bật lại inline) sẽ bỏ qua required_if và có thể tạo trạng thái thiếu rate. KB item KB-UCE-008 mang status=KNOWN_DEFECT da bi go khoi oracle.kb_ids (khong duoc dung lam oracle theo luat C5 'known_defect khong phai expected result'). Check 'CHK-009' hien khong con oracle hop le nao."
}
```

## OQ-commission-rate-card-023 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-commission-rate-card-023",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "usage-commission-enablement",
  "check_ids": [
    "usage-commission-enablement:CHK-010"
  ],
  "summary": "Sau khi bật handle_usage_charge và điền đủ rate/cap, lần import kế tiếp tính hoa hồng cho dòng usage thay vì bỏ qua. Oracle STRONG cua check 'CHK-010' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao)."
}
```

## OQ-commission-rate-card-024 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-commission-rate-card-024",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "usage-commission-enablement",
  "check_ids": [
    "usage-commission-enablement:CHK-011"
  ],
  "summary": "Chỉ role admin được bật/tắt và cấu hình usage-commission. Oracle STRONG cua check 'CHK-011' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao)."
}
```

## OQ-commission-rate-card-025 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-commission-rate-card-025",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "usage-commission-enablement",
  "check_ids": [
    "usage-commission-enablement:CHK-012"
  ],
  "summary": "Regression-watch: banner import không phân biệt skip do cấu hình (handle_usage_charge=false) với skip do lỗi khác. KB item KB-UCE-012 mang status=KNOWN_DEFECT da bi go khoi oracle.kb_ids (khong duoc dung lam oracle theo luat C5 'known_defect khong phai expected result'). Check 'CHK-012' hien khong con oracle hop le nao."
}
```

## OQ-commission-rate-card-026 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-commission-rate-card-026",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "usage-commission-enablement",
  "check_ids": [
    "usage-commission-enablement:CHK-014"
  ],
  "summary": "ProgramCommission (handle_usage_charge/usage_percentage/usage_maximum_amount) được job import CSV Payout tiêu thụ đúng khi tính Conversion usage-charge. Oracle STRONG cua check 'CHK-014' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao)."
}
```

## OQ-commission-rate-card-027 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-commission-rate-card-027",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "rate-card-configuration",
  "check_ids": [
    "rate-card-configuration:CHK-012"
  ],
  "summary": "Không thể tạo 2 dòng ProgramCommission cho cùng 1 cặp (Program, Level). Oracle STRONG của check 'CHK-012' hiện chỉ dựa trên KB item nguồn dev_doc (toàn bộ KB của run này không có spec_doc/po_dev_confirm/test_case nào). Hệ thống có thực sự chặn/từ chối việc tạo dòng ProgramCommission thứ 2 cho cùng 1 cặp (Program, Level) không (ví dụ qua unique constraint trên program_id+level_id), hay chỉ là suy luận từ đọc code/schema chưa được test case xác nhận?"
}
```
