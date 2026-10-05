# Open Questions — commission-calculation Tổng: 57 mục (NEEDS_CONFIRMATION/CONFLICT/OPEN_ISSUE). Sinh từ bootstrap DOC_BOOTSTRAP đầu tiên cho qikfiliate. ## OQ-commission-calculation-001 — OPEN_ISSUE ```json
{ "oq_id": "OQ-commission-calculation-001", "type": "OPEN_ISSUE", "feature_id": "commission-decision-flow", "kb_id": "KB-012", "summary": "KNOWN DEFECT (KB-012, feature commission-decision-flow): [KNOWN_DEFECT] Thiếu ProgramCommission cho (Program, Level) sau khi thêm Level mới -> import lỗi, dễ bị ops bỏ sót. Theo tài liệu \"qikfiliate known issues edge cases\" §\"B2. Thiếu ProgramCommission cho 1 (Program, Level) cụ thể → không có fallback\", khi thiếu ProgramCommission cho một (Program, Level), import sẽ lỗi tại dòng đó vì $program_commission là null và không có fallback. Tài liệu tự xếp đây vào known-issues/edge-case (rủi ro vận hành: dễ bị ops quên cấu hình sau khi mở Level mới), không phải phát biểu một hành vi mong đợi — giữ OBSERVED_CURRENT, không nâng thành oracle."
}
``` ## OQ-commission-calculation-002 — OPEN_ISSUE ```json
{ "oq_id": "OQ-commission-calculation-002", "type": "OPEN_ISSUE", "feature_id": "first-month-commission", "kb_id": "KB-012", "summary": "KNOWN DEFECT (KB-012, feature first-month-commission): [KNOWN_DEFECT / regression watch] Kỳ vọng sai thường gặp: \"mọi charge trong 30 ngày đầu đều first-month\". Theo tài liệu \"qikfiliate known issues edge cases\" §\"B3. isFirstMonth chỉ áp dụng đúng 2 trường hợp — dễ viết sai test/kỳ vọng sai\", một kỳ vọng sai thường gặp là \"mọi charge trong 30 ngày đầu đều được tính first-month\" — SAI. Cụ thể: một charge dương ở tháng thứ 2 vẫn nằm trong 30 ngày kể từ charge đầu (do Shopify gửi dữ liệu trễ/lệch thứ tự) vẫn KHÔNG được first-month. Tài liệu tự xếp đây vào known-issues (rủi ro: QA/dev dễ viết sai test hoặc kỳ vọng sai) — giữ OBSERVED_CURRENT, dùng làm regression watch, không phải để tự nó làm oracle (quy tắc thật đã nằm ở KB-006)."
}
``` ## OQ-commission-calculation-003 — OPEN_ISSUE ```json
{ "oq_id": "OQ-commission-calculation-003", "type": "OPEN_ISSUE", "feature_id": "usage-charge-commission", "kb_id": "KB-010", "summary": "KNOWN DEFECT (KB-010, feature usage-charge-commission): [KNOWN_DEFECT] Ví dụ usage thực tế chênh $0.06 chưa giải thích được. Theo tài liệu \"qikfiliate/payout - charge type reference\" §\"Ví dụ số thực tế — Usage charge\", với ví dụ usage dữ liệu thật, công thức Partner Share = Partner Sale − Shopify Fee − Processing Fee − Regulatory Operating Fee cho ra $1.70 trong khi số thật là $1.64 — chênh khoảng $0.06, khả năng do làm tròn hoặc 1 khoản phí phụ không hiện rõ trong ví dụ gốc. Tài liệu tự khai chưa giải thích được hoàn toàn trên đúng 1 mẫu — giữ OBSERVED_CURRENT, không dùng làm oracle."
}
``` ## OQ-commission-calculation-004 — OPEN_ISSUE ```json
{ "oq_id": "OQ-commission-calculation-004", "type": "OPEN_ISSUE", "feature_id": "usage-charge-commission", "kb_id": "KB-012", "summary": "KNOWN DEFECT (KB-012, feature usage-charge-commission): [KNOWN_DEFECT] Admin panel không có cách xem nhanh dòng bị cap. Theo tài liệu \"qikfiliate/commission - usage\" §\"Điểm QA cần nhớ khi viết test case\", admin panel hiện KHÔNG có cách xem nhanh dòng nào bị cap. Giữ OBSERVED_CURRENT, không phải hành vi mong đợi."
}
``` ## OQ-commission-calculation-005 — CONFLICT ```json
{ "oq_id": "OQ-commission-calculation-005", "type": "CONFLICT", "feature_id": [ "commission-decision-flow", "first-month-commission" ], "summary": "[OQ-commission-calculation-005] maximum_amount (cap per-row) co ap dung cho nhanh first-month (khong yearly) hay khong.", "side_a": "`qikfiliate/commission - overview` §Bang so sanh nhanh: maximum_amount ap dung chung cho ca recurring VA first-month.", "side_b": "`qikfiliate/commision - recurring & first month` §Cong thuc first-month: KHONG ap maximum_amount cho first-month binh thuong (chi nhanh first-month+yearly dung maximum_amount x 11)."
}
``` ## OQ-commission-calculation-006 — CONFLICT ```json
{ "oq_id": "OQ-commission-calculation-006", "type": "CONFLICT", "feature_id": [ "commission-decision-flow", "recurring-commission" ], "summary": "[OQ-commission-calculation-006] Dong charge_type chua \"one-time\" thuoc nhanh nao.", "side_a": "`qikfiliate/commission - overview` §So do luong quyet dinh: dong chua \"one-time\" BI BO QUA, khong tao Conversion.", "side_b": "`qikfiliate/commision - recurring & first month` §preamble: nhanh recurring/first-month ap dung cho MOI dong payout khong chua \"usage\" (bao ham ca one-time, theo nghia den)."
}
``` ## OQ-commission-calculation-007 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-commission-calculation-007", "type": "NEEDS_CONFIRMATION", "feature_id": [ "refund-and-downgrade-adjustment", "usage-charge-commission" ], "summary": "Lien quan OQ-payout-import-021 (object payout-import, conflict OQ-payout-import-021 ve vai tro charge_id trong dedup refund/downgrade): neu charge_id KHONG duoc dung lam khoa chinh dedup cho dong nay, co che dedup/doi chieu charge_id ma refund-and-downgrade-adjustment va usage-charge-commission gia dinh cung phai xem lai. Cho ket qua cua OQ goc truoc khi khoa oracle cho cac check lien quan o 2 feature nay."
}
``` ## OQ-commission-calculation-008 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-commission-calculation-008", "type": "NEEDS_CONFIRMATION", "feature_id": "commission-decision-flow", "check_ids": [ "CHK-CDF-007" ], "summary": "[NEEDS_CONFIRMATION] Biểu hiện vận hành khi 1 dòng bị lỗi do thiếu ProgramCommission: dừng cả file, bỏ qua riêng dòng, hay báo lỗi UI nào. Khi 1 dòng trong file payout thiếu cấu hình ProgramCommission, hệ thống dừng toàn bộ import file đó, chỉ bỏ qua riêng dòng lỗi, hay có cơ chế khác? Thông báo lỗi (nếu có) hiển thị ở đâu trên admin portal? Cần PO/dev xác nhận để viết expected result cho test case import."
}
``` ## OQ-commission-calculation-009 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-commission-calculation-009", "type": "NEEDS_CONFIRMATION", "feature_id": "commission-decision-flow", "check_ids": [ "CHK-CDF-012" ], "summary": "[NEEDS_CONFIRMATION] charge_type chứa đồng thời nhiều từ khoá (vd cả \"one-time\" và \"usage\") — thứ tự ưu tiên chưa rõ. Khi 1 charge_type chứa đồng thời nhiều từ khoá phân loại (vd cả \"one-time\" và \"usage\"), nhánh nào được ưu tiên? Sơ đồ quyết định trong tài liệu trình bày tuần tự nhưng không xác nhận đó là thứ tự ưu tiên loại trừ bắt buộc. Cũng cần danh sách giá trị charge_type thật từ Shopify để biết tình huống này có xảy ra trong thực tế hay không."
}
``` ## OQ-commission-calculation-010 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-commission-calculation-010", "type": "NEEDS_CONFIRMATION", "feature_id": "first-month-commission", "check_ids": [ "CHK-FMC-010" ], "summary": "[NEEDS_CONFIRMATION] Timezone dùng để so mốc 30 ngày không được nêu. Mốc 30 ngày của isFirstMonth được so sánh theo timezone nào (app timezone, UTC, hay timezone dữ liệu gốc từ Shopify)? Ảnh hưởng trực tiếp kết quả ở đúng biên 30 ngày."
}
``` ## OQ-commission-calculation-011 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-commission-calculation-011", "type": "NEEDS_CONFIRMATION", "feature_id": "first-month-commission", "check_ids": [ "CHK-FMC-012" ], "summary": "[NEEDS_CONFIRMATION] Tổ hợp first-month + yearly + refund: có áp maximum_amount × 11 cho số âm hay không. Công thức cho tổ hợp first-month + yearly + refund/downgrade (âm) là gì? Có áp maximum_amount × 11 cho số âm theo kiểu cap 2 chiều (xem feature refund-and-downgrade-adjustment) hay không? Đây là tổ hợp tiền lớn nhất hiện chưa có công thức."
}
``` ## OQ-commission-calculation-012 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-commission-calculation-012", "type": "NEEDS_CONFIRMATION", "feature_id": "first-month-commission", "check_ids": [ "CHK-FMC-013" ], "summary": "[NEEDS_CONFIRMATION] Giá trị mặc định skip_first_month khi tạo Customer mới, và tác dụng hồi tố với Conversion đã tạo trước. Giá trị mặc định của Customer.skip_first_month khi tạo mới là gì (true/false)? Bật/tắt skip_first_month có tác dụng hồi tố với Conversion đã tạo trước đó hay chỉ áp cho conversion phát sinh sau thời điểm toggle?"
}
``` ## OQ-commission-calculation-013 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-commission-calculation-013", "type": "NEEDS_CONFIRMATION", "feature_id": "recurring-commission", "check_ids": [ "CHK-RC-010" ], "summary": "[NEEDS_CONFIRMATION] Công thức tính ngược percentage lưu trên Conversion cho charge yearly chưa trích được từ tài liệu. Công thức tính ngược percentage lưu trên Conversion cho charge yearly bị cap là gì? `qikfiliate/commision - recurring & first month` có nhắc tới mục \"percentage lưu trên Conversion\" nhưng nội dung mục đó không có trong bộ tài liệu được giao — cần dev cung cấp lại hoặc trích đúng section."
}
``` ## OQ-commission-calculation-014 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-commission-calculation-014", "type": "NEEDS_CONFIRMATION", "feature_id": "recurring-commission", "check_ids": [ "CHK-RC-011" ], "summary": "[NEEDS_CONFIRMATION] Giá trị mặc định của percentage/maximum_amount khi ProgramCommission mới tạo, chưa cấu hình. Giá trị mặc định của ProgramCommission.percentage và .maximum_amount khi bản ghi mới tạo chưa cấu hình là gì (null, 0, hay bắt buộc nhập)? Ảnh hưởng trực tiếp expected result khi test ProgramCommission mới tạo."
}
``` ## OQ-commission-calculation-015 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-commission-calculation-015", "type": "NEEDS_CONFIRMATION", "feature_id": "refund-and-downgrade-adjustment", "check_ids": [ "CHK-RDA-009", "CHK-UCC-016" ], "summary": "[NEEDS_CONFIRMATION] Literal charge_type thật của Shopify cho refund usage-charge chưa quan sát — ranh giới với usage-charge-commission. Literal charge_type thật mà Shopify dùng cho refund của 1 usage charge là gì — có chứa \"usage\" hay không? Nếu KHÔNG, refund đó rơi vào nhánh recurring/first-month (feature này) với rate/cap khác hẳn rate/cap usage gốc — sai hướng nào cũng là trả sai tiền."
}
``` ## OQ-commission-calculation-016 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-commission-calculation-016", "type": "NEEDS_CONFIRMATION", "feature_id": "usage-charge-commission", "check_ids": [ "CHK-UCC-012" ], "summary": "[NEEDS_CONFIRMATION] Hành vi import khi handle_usage_charge=true nhưng usage_percentage/usage_maximum_amount rỗng ở mức dữ liệu. Khi handle_usage_charge=true nhưng usage_percentage/usage_maximum_amount null/rỗng ở mức dữ liệu (bỏ qua validate form), hệ thống xử lý dòng usage-charge thế nào?"
}
``` ## OQ-commission-calculation-017 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-commission-calculation-017", "type": "NEEDS_CONFIRMATION", "feature_id": "usage-charge-commission", "check_ids": [ "CHK-UCC-013" ], "summary": "[NEEDS_CONFIRMATION] usage_maximum_amount âm/null — ý nghĩa khác 0 (\"không giới hạn\") thế nào. usage_maximum_amount có cho phép giá trị null hoặc âm không? Nếu có, cap xử lý các giá trị đó thế nào, và null khác gì so với 0 (\"không giới hạn\")?"
}
``` ## OQ-commission-calculation-018 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-commission-calculation-018", "type": "NEEDS_CONFIRMATION", "feature_id": "usage-charge-commission", "check_ids": [ "CHK-UCC-014" ], "summary": "[NEEDS_CONFIRMATION] already_earned có tính Conversion usage tạo tay/ngoài luồng import CSV hay không. already_earned (tổng amount mọi Conversion usage trước đó) có tính cả Conversion được tạo bằng thao tác tay/ngoài luồng import CSV hay không? Ảnh hưởng trực tiếp tới việc dựng test data cho cap."
}
``` ## OQ-commission-calculation-019 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-commission-calculation-019", "type": "NEEDS_CONFIRMATION", "feature_id": "usage-charge-commission", "check_ids": [ "CHK-UCC-015" ], "summary": "[NEEDS_CONFIRMATION] Thứ tự xử lý các dòng trong 1 file payout ảnh hưởng dòng nào bị cap — chưa có bảo đảm thứ tự. Hệ thống có đảm bảo xử lý các dòng usage-charge theo đúng thứ tự thời gian charge thật (không phải thứ tự xuất hiện trong file) trước khi áp cap hay không? Nếu không, kết quả cap có thể khác kỳ vọng khi file bị sắp xếp sai thứ tự."
}
```

## OQ-commission-calculation-020 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-commission-calculation-020",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "commission-decision-flow",
  "check_ids": [
    "commission-decision-flow:CHK-CDF-001"
  ],
  "summary": "charge_type được xét bằng so khớp chuỗi con, không phân biệt hoa/thường, để quyết định nhánh usage. Oracle STRONG cua check 'CHK-CDF-001' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao). Theo luat C5, dev_doc khong duoc la oracle STRONG duy nhat cho check priority P1 (mat du lieu/tien/permission). Ha xuong BASELINE cho toi khi co test_case PASS xac nhan hanh vi, hoac PO/Dev xac nhan truc tiep (po_dev_confirm)."
}
```

## OQ-commission-calculation-021 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-commission-calculation-021",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "commission-decision-flow",
  "check_ids": [
    "commission-decision-flow:CHK-CDF-002"
  ],
  "summary": "Quy tắc so khớp chuỗi áp dụng y hệt cho dòng refund của usage charge. Oracle STRONG cua check 'CHK-CDF-002' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao). Theo luat C5, dev_doc khong duoc la oracle STRONG duy nhat cho check priority P1 (mat du lieu/tien/permission). Ha xuong BASELINE cho toi khi co test_case PASS xac nhan hanh vi, hoac PO/Dev xac nhan truc tiep (po_dev_confirm)."
}
```

## OQ-commission-calculation-022 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-commission-calculation-022",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "commission-decision-flow",
  "check_ids": [
    "commission-decision-flow:CHK-CDF-004"
  ],
  "summary": "charge_type không chứa \"usage\" và không chứa \"one-time\" (subscription/refund/downgrade bình thường) đi nhánh recurring/first-month. Oracle STRONG cua check 'CHK-CDF-004' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao). Theo luat C5, dev_doc khong duoc la oracle STRONG duy nhat cho check priority P1 (mat du lieu/tien/permission). Ha xuong BASELINE cho toi khi co test_case PASS xac nhan hanh vi, hoac PO/Dev xac nhan truc tiep (po_dev_confirm)."
}
```

## OQ-commission-calculation-023 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-commission-calculation-023",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "commission-decision-flow",
  "check_ids": [
    "commission-decision-flow:CHK-CDF-005"
  ],
  "summary": "Rate hoa hồng được tra từ ProgramCommission theo (Program, Level); Level tính TRƯỚC bước tra rate và trước bước xét charge_type. Oracle STRONG cua check 'CHK-CDF-005' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao). Theo luat C5, dev_doc khong duoc la oracle STRONG duy nhat cho check priority P1 (mat du lieu/tien/permission). Ha xuong BASELINE cho toi khi co test_case PASS xac nhan hanh vi, hoac PO/Dev xac nhan truc tiep (po_dev_confirm)."
}
```

## OQ-commission-calculation-024 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-commission-calculation-024",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "commission-decision-flow",
  "check_ids": [
    "commission-decision-flow:CHK-CDF-006"
  ],
  "summary": "Thiếu cấu hình ProgramCommission cho (Program, Level) đang xét -> dòng đó là lỗi, không có fallback. Oracle STRONG cua check 'CHK-CDF-006' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao). Theo luat C5, dev_doc khong duoc la oracle STRONG duy nhat cho check priority P1 (mat du lieu/tien/permission). Ha xuong BASELINE cho toi khi co test_case PASS xac nhan hanh vi, hoac PO/Dev xac nhan truc tiep (po_dev_confirm)."
}
```

## OQ-commission-calculation-025 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-commission-calculation-025",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": [
    "commission-decision-flow",
    "first-month-commission",
    "usage-charge-commission"
  ],
  "check_ids": [
    "commission-decision-flow:CHK-CDF-008",
    "first-month-commission:CHK-FMC-011",
    "usage-charge-commission:CHK-UCC-010"
  ],
  "summary": "[REGRESSION WATCH — KNOWN_DEFECT] Thiếu ProgramCommission cho (Program, Level) MỚI tạo dễ bị ops bỏ sót khi mở Level mới. KB item KB-012 mang status=KNOWN_DEFECT da bi go khoi oracle.kb_ids (khong duoc dung lam oracle theo luat C5 'known_defect khong phai expected result'). Check 'CHK-CDF-008' hien khong con oracle hop le nao. Can PO/Dev xac nhan: hanh vi mo ta trong expected_result la known defect can tiep tuc theo doi (regression-watch, khong oracle) hay can mot kb_id CONFIRMED_EXPECTED khac thay the lam oracle."
}
```

## OQ-commission-calculation-026 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-commission-calculation-026",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "commission-decision-flow",
  "check_ids": [
    "commission-decision-flow:CHK-CDF-009"
  ],
  "summary": "Cap per-row không giữ state giữa các dòng; cap lifetime (usage) cộng dồn và tồn tại xuyên nhiều kỳ, không tự reset. Oracle STRONG cua check 'CHK-CDF-009' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao). Theo luat C5, dev_doc khong duoc la oracle STRONG duy nhat cho check priority P1 (mat du lieu/tien/permission). Ha xuong BASELINE cho toi khi co test_case PASS xac nhan hanh vi, hoac PO/Dev xac nhan truc tiep (po_dev_confirm)."
}
```

## OQ-commission-calculation-027 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-commission-calculation-027",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "commission-decision-flow",
  "check_ids": [
    "commission-decision-flow:CHK-CDF-013"
  ],
  "summary": "Nhánh được decision-flow gán phải khớp đúng feature con xử lý tiếp theo (usage / recurring / first-month). Oracle STRONG cua check 'CHK-CDF-013' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao). Theo luat C5, dev_doc khong duoc la oracle STRONG duy nhat cho check priority P1 (mat du lieu/tien/permission). Ha xuong BASELINE cho toi khi co test_case PASS xac nhan hanh vi, hoac PO/Dev xac nhan truc tiep (po_dev_confirm)."
}
```

## OQ-commission-calculation-028 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-commission-calculation-028",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "first-month-commission",
  "check_ids": [
    "first-month-commission:CHK-FMC-001"
  ],
  "summary": "rate first-month = ProgramCommission.first_month_percentage / 100. Oracle STRONG cua check 'CHK-FMC-001' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao). Theo luat C5, dev_doc khong duoc la oracle STRONG duy nhat cho check priority P1 (mat du lieu/tien/permission). Ha xuong BASELINE cho toi khi co test_case PASS xac nhan hanh vi, hoac PO/Dev xac nhan truc tiep (po_dev_confirm)."
}
```

## OQ-commission-calculation-029 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-commission-calculation-029",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "first-month-commission",
  "check_ids": [
    "first-month-commission:CHK-FMC-002"
  ],
  "summary": "First-month không yearly: amount = partner_share × rate (phần công thức, không bao gồm tranh chấp cap). Oracle STRONG cua check 'CHK-FMC-002' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao). Theo luat C5, dev_doc khong duoc la oracle STRONG duy nhat cho check priority P1 (mat du lieu/tien/permission). Ha xuong BASELINE cho toi khi co test_case PASS xac nhan hanh vi, hoac PO/Dev xac nhan truc tiep (po_dev_confirm)."
}
```

## OQ-commission-calculation-030 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-commission-calculation-030",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "first-month-commission",
  "check_ids": [
    "first-month-commission:CHK-FMC-004"
  ],
  "summary": "First-month + yearly: công thức tách biệt — tháng 1 theo first_month_percentage, 11 tháng còn lại theo percentage + cap theo tỉ lệ 11 tháng. Oracle STRONG cua check 'CHK-FMC-004' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao). Theo luat C5, dev_doc khong duoc la oracle STRONG duy nhat cho check priority P1 (mat du lieu/tien/permission). Ha xuong BASELINE cho toi khi co test_case PASS xac nhan hanh vi, hoac PO/Dev xac nhan truc tiep (po_dev_confirm)."
}
```

## OQ-commission-calculation-031 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-commission-calculation-031",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "first-month-commission",
  "check_ids": [
    "first-month-commission:CHK-FMC-006"
  ],
  "summary": "isFirstMonth: đúng 2 tình huống true — conversion đầu tiên tuyệt đối, hoặc dòng âm đầu tiên trong 30 ngày; mọi dòng dương thứ 2+ luôn false. Oracle STRONG cua check 'CHK-FMC-006' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao). Theo luat C5, dev_doc khong duoc la oracle STRONG duy nhat cho check priority P1 (mat du lieu/tien/permission). Ha xuong BASELINE cho toi khi co test_case PASS xac nhan hanh vi, hoac PO/Dev xac nhan truc tiep (po_dev_confirm)."
}
```

## OQ-commission-calculation-032 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-commission-calculation-032",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "first-month-commission",
  "check_ids": [
    "first-month-commission:CHK-FMC-008"
  ],
  "summary": "isFirstMonth: customer đã từng có dòng âm trước đây -> mọi dòng âm sau đó luôn false, dù có trong 30 ngày hay không. Oracle STRONG cua check 'CHK-FMC-008' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao). Theo luat C5, dev_doc khong duoc la oracle STRONG duy nhat cho check priority P1 (mat du lieu/tien/permission). Ha xuong BASELINE cho toi khi co test_case PASS xac nhan hanh vi, hoac PO/Dev xac nhan truc tiep (po_dev_confirm)."
}
```

## OQ-commission-calculation-033 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-commission-calculation-033",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "first-month-commission",
  "check_ids": [
    "first-month-commission:CHK-FMC-009"
  ],
  "summary": "Mốc 30 ngày so theo ngày lịch (date-cast cắt giờ về 00:00:00), không phải giờ chính xác. Moc 30 ngay cho isFirstMonth duoc tinh theo ngay lich (date-cast, cat gio) hay theo chinh xac timestamp (gio:phut:giay)? confirmation_source cua oracle (KB-010) la derivation=code_artifact (doc tu code), chua co xac nhan PO/Dev hay test_case PASS ve cach tinh moc 30 ngay nay."
}
```

## OQ-commission-calculation-034 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-commission-calculation-034",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "first-month-commission",
  "check_ids": [
    "first-month-commission:CHK-FMC-014"
  ],
  "summary": "Admin bật skip_first_month trên form Customer tắt hẳn toàn bộ cơ chế first-month cho shop đó. Oracle STRONG cua check 'CHK-FMC-014' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao). Theo luat C5, dev_doc khong duoc la oracle STRONG duy nhat cho check priority P1 (mat du lieu/tien/permission). Ha xuong BASELINE cho toi khi co test_case PASS xac nhan hanh vi, hoac PO/Dev xac nhan truc tiep (po_dev_confirm)."
}
```

## OQ-commission-calculation-035 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-commission-calculation-035",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "first-month-commission",
  "check_ids": [
    "first-month-commission:CHK-FMC-016"
  ],
  "summary": "Nhánh first-month loại trừ lẫn nhau với nhánh recurring trên cùng input, theo đúng kết quả isFirstMonth. Oracle STRONG cua check 'CHK-FMC-016' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao). Theo luat C5, dev_doc khong duoc la oracle STRONG duy nhat cho check priority P1 (mat du lieu/tien/permission). Ha xuong BASELINE cho toi khi co test_case PASS xac nhan hanh vi, hoac PO/Dev xac nhan truc tiep (po_dev_confirm)."
}
```

## OQ-commission-calculation-036 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-commission-calculation-036",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "recurring-commission",
  "check_ids": [
    "recurring-commission:CHK-RC-001"
  ],
  "summary": "rate recurring = ProgramCommission.percentage / 100. Oracle STRONG cua check 'CHK-RC-001' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao). Theo luat C5, dev_doc khong duoc la oracle STRONG duy nhat cho check priority P1 (mat du lieu/tien/permission). Ha xuong BASELINE cho toi khi co test_case PASS xac nhan hanh vi, hoac PO/Dev xac nhan truc tiep (po_dev_confirm)."
}
```

## OQ-commission-calculation-037 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-commission-calculation-037",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "recurring-commission",
  "check_ids": [
    "recurring-commission:CHK-RC-002"
  ],
  "summary": "amount_raw = partner_share × rate. Oracle STRONG cua check 'CHK-RC-002' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao). Theo luat C5, dev_doc khong duoc la oracle STRONG duy nhat cho check priority P1 (mat du lieu/tien/permission). Ha xuong BASELINE cho toi khi co test_case PASS xac nhan hanh vi, hoac PO/Dev xac nhan truc tiep (po_dev_confirm)."
}
```

## OQ-commission-calculation-038 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-commission-calculation-038",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "recurring-commission",
  "check_ids": [
    "recurring-commission:CHK-RC-003"
  ],
  "summary": "max = maximum_amount × 12 nếu charge_type chứa \"yearly\", ngược lại max = maximum_amount. Oracle STRONG cua check 'CHK-RC-003' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao). Theo luat C5, dev_doc khong duoc la oracle STRONG duy nhat cho check priority P1 (mat du lieu/tien/permission). Ha xuong BASELINE cho toi khi co test_case PASS xac nhan hanh vi, hoac PO/Dev xac nhan truc tiep (po_dev_confirm)."
}
```

## OQ-commission-calculation-039 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-commission-calculation-039",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "recurring-commission",
  "check_ids": [
    "recurring-commission:CHK-RC-004"
  ],
  "summary": "amount = clamp(amount_raw, max) — chặn trên bằng min(giá_trị, |max|) khi max != 0. Oracle STRONG cua check 'CHK-RC-004' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao). Theo luat C5, dev_doc khong duoc la oracle STRONG duy nhat cho check priority P1 (mat du lieu/tien/permission). Ha xuong BASELINE cho toi khi co test_case PASS xac nhan hanh vi, hoac PO/Dev xac nhan truc tiep (po_dev_confirm)."
}
```

## OQ-commission-calculation-040 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-commission-calculation-040",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "recurring-commission",
  "check_ids": [
    "recurring-commission:CHK-RC-005"
  ],
  "summary": "clamp: max == 0 nghĩa là không giới hạn, trả nguyên amount_raw bất kể lớn thế nào. Oracle STRONG cua check 'CHK-RC-005' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao). Theo luat C5, dev_doc khong duoc la oracle STRONG duy nhat cho check priority P1 (mat du lieu/tien/permission). Ha xuong BASELINE cho toi khi co test_case PASS xac nhan hanh vi, hoac PO/Dev xac nhan truc tiep (po_dev_confirm)."
}
```

## OQ-commission-calculation-041 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-commission-calculation-041",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "recurring-commission",
  "check_ids": [
    "recurring-commission:CHK-RC-012"
  ],
  "summary": "Công thức recurring CHỈ áp dụng khi Customer::isFirstMonth = false cho dòng đang xét. Oracle STRONG cua check 'CHK-RC-012' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao). Theo luat C5, dev_doc khong duoc la oracle STRONG duy nhat cho check priority P1 (mat du lieu/tien/permission). Ha xuong BASELINE cho toi khi co test_case PASS xac nhan hanh vi, hoac PO/Dev xac nhan truc tiep (po_dev_confirm)."
}
```

## OQ-commission-calculation-042 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-commission-calculation-042",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "refund-and-downgrade-adjustment",
  "check_ids": [
    "refund-and-downgrade-adjustment:CHK-RDA-001"
  ],
  "summary": "Cap per-row áp dụng 2 chiều cho recurring/first-month: số âm bị chặn dưới ở -|max|, đối xứng với cap dương. Oracle STRONG cua check 'CHK-RDA-001' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao). Theo luat C5, dev_doc khong duoc la oracle STRONG duy nhat cho check priority P1 (mat du lieu/tien/permission). Ha xuong BASELINE cho toi khi co test_case PASS xac nhan hanh vi, hoac PO/Dev xac nhan truc tiep (po_dev_confirm)."
}
```

## OQ-commission-calculation-043 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-commission-calculation-043",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "refund-and-downgrade-adjustment",
  "check_ids": [
    "refund-and-downgrade-adjustment:CHK-RDA-003"
  ],
  "summary": "Usage-charge: dòng refund/downgrade (raw_amount<=0) cộng thẳng vào already_earned, KHÔNG dùng cap 2 chiều per-row. Oracle STRONG cua check 'CHK-RDA-003' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao). Theo luat C5, dev_doc khong duoc la oracle STRONG duy nhat cho check priority P1 (mat du lieu/tien/permission). Ha xuong BASELINE cho toi khi co test_case PASS xac nhan hanh vi, hoac PO/Dev xac nhan truc tiep (po_dev_confirm)."
}
```

## OQ-commission-calculation-044 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-commission-calculation-044",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "refund-and-downgrade-adjustment",
  "check_ids": [
    "refund-and-downgrade-adjustment:CHK-RDA-005"
  ],
  "summary": "\"App refund\" và \"App downgrade\" (không chứa usage/one-time) đi nhánh Recurring dạng clawback. Oracle STRONG cua check 'CHK-RDA-005' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao). Theo luat C5, dev_doc khong duoc la oracle STRONG duy nhat cho check priority P1 (mat du lieu/tien/permission). Ha xuong BASELINE cho toi khi co test_case PASS xac nhan hanh vi, hoac PO/Dev xac nhan truc tiep (po_dev_confirm)."
}
```

## OQ-commission-calculation-045 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-commission-calculation-045",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "refund-and-downgrade-adjustment",
  "check_ids": [
    "refund-and-downgrade-adjustment:CHK-RDA-006"
  ],
  "summary": "Dòng refund KHÔNG mang charge_id của charge gốc — hệ thống xử lý độc lập, dùng rate/formula HIỆN TẠI của Customer. Oracle STRONG cua check 'CHK-RDA-006' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao). Theo luat C5, dev_doc khong duoc la oracle STRONG duy nhat cho check priority P1 (mat du lieu/tien/permission). Ha xuong BASELINE cho toi khi co test_case PASS xac nhan hanh vi, hoac PO/Dev xac nhan truc tiep (po_dev_confirm)."
}
```

## OQ-commission-calculation-046 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-commission-calculation-046",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "refund-and-downgrade-adjustment",
  "check_ids": [
    "refund-and-downgrade-adjustment:CHK-RDA-007"
  ],
  "summary": "Dòng downgrade/refund ĐẦU TIÊN của shop, trong 30 ngày kể từ charge đầu -> vẫn is_first_month=true. Oracle STRONG cua check 'CHK-RDA-007' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao). Theo luat C5, dev_doc khong duoc la oracle STRONG duy nhat cho check priority P1 (mat du lieu/tien/permission). Ha xuong BASELINE cho toi khi co test_case PASS xac nhan hanh vi, hoac PO/Dev xac nhan truc tiep (po_dev_confirm)."
}
```

## OQ-commission-calculation-047 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-commission-calculation-047",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "refund-and-downgrade-adjustment",
  "check_ids": [
    "refund-and-downgrade-adjustment:CHK-RDA-008"
  ],
  "summary": "Dòng downgrade/refund THỨ 2 của shop luôn is_first_month=false, dù có trong 30 ngày hay không. Oracle STRONG cua check 'CHK-RDA-008' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao). Theo luat C5, dev_doc khong duoc la oracle STRONG duy nhat cho check priority P1 (mat du lieu/tien/permission). Ha xuong BASELINE cho toi khi co test_case PASS xac nhan hanh vi, hoac PO/Dev xac nhan truc tiep (po_dev_confirm)."
}
```

## OQ-commission-calculation-048 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-commission-calculation-048",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "usage-charge-commission",
  "check_ids": [
    "usage-charge-commission:CHK-UCC-001"
  ],
  "summary": "Công thức usage áp dụng cho MỌI charge_type chứa \"usage\", không có khái niệm first-month. Oracle STRONG cua check 'CHK-UCC-001' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao). Theo luat C5, dev_doc khong duoc la oracle STRONG duy nhat cho check priority P1 (mat du lieu/tien/permission). Ha xuong BASELINE cho toi khi co test_case PASS xac nhan hanh vi, hoac PO/Dev xac nhan truc tiep (po_dev_confirm)."
}
```

## OQ-commission-calculation-049 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-commission-calculation-049",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "usage-charge-commission",
  "check_ids": [
    "usage-charge-commission:CHK-UCC-002"
  ],
  "summary": "Công thức usage: raw_amount, capped_amount, amount round(.,6), is_capped, percentage, type. Oracle STRONG cua check 'CHK-UCC-002' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao). Theo luat C5, dev_doc khong duoc la oracle STRONG duy nhat cho check priority P1 (mat du lieu/tien/permission). Ha xuong BASELINE cho toi khi co test_case PASS xac nhan hanh vi, hoac PO/Dev xac nhan truc tiep (po_dev_confirm)."
}
```

## OQ-commission-calculation-050 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-commission-calculation-050",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "usage-charge-commission",
  "check_ids": [
    "usage-charge-commission:CHK-UCC-003"
  ],
  "summary": "cap: raw_amount <= 0 (refund/hoàn usage-charge) -> trả nguyên, KHÔNG cap, KHÔNG trừ vào hạn mức. Oracle STRONG cua check 'CHK-UCC-003' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao). Theo luat C5, dev_doc khong duoc la oracle STRONG duy nhat cho check priority P1 (mat du lieu/tien/permission). Ha xuong BASELINE cho toi khi co test_case PASS xac nhan hanh vi, hoac PO/Dev xac nhan truc tiep (po_dev_confirm)."
}
```

## OQ-commission-calculation-051 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-commission-calculation-051",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "usage-charge-commission",
  "check_ids": [
    "usage-charge-commission:CHK-UCC-004"
  ],
  "summary": "cap: usage_maximum_amount == 0 -> không giới hạn, trả nguyên raw_amount. Oracle STRONG cua check 'CHK-UCC-004' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao). Theo luat C5, dev_doc khong duoc la oracle STRONG duy nhat cho check priority P1 (mat du lieu/tien/permission). Ha xuong BASELINE cho toi khi co test_case PASS xac nhan hanh vi, hoac PO/Dev xac nhan truc tiep (po_dev_confirm)."
}
```

## OQ-commission-calculation-052 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-commission-calculation-052",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "usage-charge-commission",
  "check_ids": [
    "usage-charge-commission:CHK-UCC-005"
  ],
  "summary": "cap: already_earned/remaining tính đúng công thức, dòng vượt remaining bị cắt còn đúng phần room còn lại. Oracle STRONG cua check 'CHK-UCC-005' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao). Theo luat C5, dev_doc khong duoc la oracle STRONG duy nhat cho check priority P1 (mat du lieu/tien/permission). Ha xuong BASELINE cho toi khi co test_case PASS xac nhan hanh vi, hoac PO/Dev xac nhan truc tiep (po_dev_confirm)."
}
```

## OQ-commission-calculation-053 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-commission-calculation-053",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "usage-charge-commission",
  "check_ids": [
    "usage-charge-commission:CHK-UCC-006"
  ],
  "summary": "Cap lifetime tính theo (affiliate, Program), KHÔNG theo shop riêng lẻ — nhiều shop của 1 affiliate dùng chung hạn mức. Oracle STRONG cua check 'CHK-UCC-006' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao). Theo luat C5, dev_doc khong duoc la oracle STRONG duy nhat cho check priority P1 (mat du lieu/tien/permission). Ha xuong BASELINE cho toi khi co test_case PASS xac nhan hanh vi, hoac PO/Dev xac nhan truc tiep (po_dev_confirm)."
}
```

## OQ-commission-calculation-054 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-commission-calculation-054",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "usage-charge-commission",
  "check_ids": [
    "usage-charge-commission:CHK-UCC-007"
  ],
  "summary": "Cap lifetime KHÔNG reset theo tháng/kỳ payout — persist qua nhiều kỳ import. Oracle STRONG cua check 'CHK-UCC-007' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao). Theo luat C5, dev_doc khong duoc la oracle STRONG duy nhat cho check priority P1 (mat du lieu/tien/permission). Ha xuong BASELINE cho toi khi co test_case PASS xac nhan hanh vi, hoac PO/Dev xac nhan truc tiep (po_dev_confirm)."
}
```

## OQ-commission-calculation-055 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-commission-calculation-055",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "usage-charge-commission",
  "check_ids": [
    "usage-charge-commission:CHK-UCC-008"
  ],
  "summary": "Soft-delete 1 Customer (shop gỡ cài app) KHÔNG làm giảm already_earned. Oracle STRONG cua check 'CHK-UCC-008' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao). Theo luat C5, dev_doc khong duoc la oracle STRONG duy nhat cho check priority P1 (mat du lieu/tien/permission). Ha xuong BASELINE cho toi khi co test_case PASS xac nhan hanh vi, hoac PO/Dev xac nhan truc tiep (po_dev_confirm)."
}
```

## OQ-commission-calculation-056 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-commission-calculation-056",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "usage-charge-commission",
  "check_ids": [
    "usage-charge-commission:CHK-UCC-009"
  ],
  "summary": "Dòng bị cap về $0 bị ẩn khỏi affiliate dashboard (scope withoutCappedToZero) nhưng vẫn tồn tại trong DB. Dong usage-charge bi cap ve $0 co thuc su bi an khoi dashboard nhung van ton tai trong DB dung theo chu y thiet ke cua withoutCappedToZero, hay day la mot phat hien tu doc code chua duoc xac nhan? confirmation_source cua oracle (KB-005 + KB-006) la derivation=code_artifact (doc tu code), chua co xac nhan PO/Dev hay test_case PASS."
}
```

## OQ-commission-calculation-057 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-commission-calculation-057",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "usage-charge-commission",
  "check_ids": [
    "usage-charge-commission:CHK-UCC-011"
  ],
  "summary": "[REGRESSION WATCH — KNOWN_DEFECT] Mẫu dữ liệu thật usage-charge có chênh $0.06 chưa giải thích được so với công thức Partner Share. KB item KB-010 mang status=KNOWN_DEFECT da bi go khoi oracle.kb_ids (khong duoc dung lam oracle theo luat C5 'known_defect khong phai expected result'). Check 'CHK-UCC-011' hien khong con oracle hop le nao. Can PO/Dev xac nhan: hanh vi mo ta trong expected_result la known defect can tiep tuc theo doi (regression-watch, khong oracle) hay can mot kb_id CONFIRMED_EXPECTED khac thay the lam oracle."
}
```
