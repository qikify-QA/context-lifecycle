# Open Questions — invoice-payout Tổng: 32 mục (NEEDS_CONFIRMATION/CONFLICT/OPEN_ISSUE). Sinh từ bootstrap DOC_BOOTSTRAP đầu tiên cho qikfiliate. ## OQ-invoice-payout-001 — OPEN_ISSUE ```json
{ "oq_id": "OQ-invoice-payout-001", "type": "OPEN_ISSUE", "feature_id": "admin-invoice-processing", "kb_id": "KB-015", "summary": "KNOWN DEFECT (KB-015, feature admin-invoice-processing): KNOWN DEFECT C2: doi status sang completed khong goi API thanh toan nao va khong co chan thao tac nham. Theo tai lieu `known issues edge cases` Section: C2, doi status 1 invoice tu pending thang sang completed KHONG he goi bat ky API PayPal/ngan hang nao - he thong chi ghi nhan admin 'khai bao' da thanh toan va CHAP NHAN BINH THUONG viec doi status cho 1 invoice ma chua thuc su chuyen tien. Affiliate van nhan duoc email 'thanh toan hoan tat' du chua nhan tien thuc. KHONG co gi o tang code chan thao tac nham (quen chuyen tien ma doi status, hoac chuyen tien roi quen doi status). Day la hanh vi hien tai cua he thong (rui ro nam hoan toan o quy trinh con nguoi) - giu OBSERVED_CURRENT, KHONG duoc nang len CONFIRMED_EXPECTED."
}
``` ## OQ-invoice-payout-002 — OPEN_ISSUE ```json
{ "oq_id": "OQ-invoice-payout-002", "type": "OPEN_ISSUE", "feature_id": "payout-request-cancellation", "kb_id": "KB-003", "summary": "KNOWN DEFECT (KB-003, feature payout-request-cancellation): KNOWN DEFECT C1: Huy tu approved KHONG hoan balance - mat tien thuc. Theo tai lieu `admin - invoices and payment methods` Section: Journey - Huy 1 yeu cau thanh toan, `invoicing payment - payout request journey` Section: C2 - Huy khi da o approved, va `known issues edge cases` Section: C1 (3 tai lieu doc lap dong thuan), khi mot Invoice DA o trang thai approved (Ops da duyet nhung chua chi tien thuc) bi doi sang cancel, balance cua affiliate KHONG duoc hoan lai tu dong - co che hoan balance chi ap dung cho dung nhanh chuyen tu pending -> cancel. He qua: affiliate vua khong nhan duoc tien vua khong lay lai duoc balance, tru khi Ops tu tay cong lai balance thu cong qua man hinh/form User. Day la hanh vi SAI dang ton tai (known defect), KHONG phai expected result - giu nguyen OBSERVED_CURRENT, khong duoc nang len CONFIRMED_EXPECTED"
}
``` ## OQ-invoice-payout-003 — CONFLICT ```json
{ "oq_id": "OQ-invoice-payout-003", "type": "CONFLICT", "feature_id": "payout-request-eligibility", "summary": "[OQ-invoice-payout-003] Tieu chi dem 'so shop' trong dieu kien bo sung thu nhat cua canCreateByUser: shop co BAT KY Conversion hay chi shop 'tra phi' (subscription).", "side_a": "`qikfiliate/invoicing payment - payout request journey` §Dieu kien tao Invoice - cong thuc goc (corroborate `qikfiliate/dashboard - payment and payout request`): dem shop co BAT KY Conversion (ke ca usage/refund).", "side_b": "`qikfiliate/invoicing payment - payout request journey` §Vi du A (khong du dieu kien) / Vi du B (du dieu kien): vi du so lieu cho thay dem shop \"tra phi\" (subscription)."
}
``` ## OQ-invoice-payout-004 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-invoice-payout-004", "type": "NEEDS_CONFIRMATION", "feature_id": "admin-invoice-processing", "check_ids": [ "CHK-013" ], "summary": "[CAN XAC NHAN] Co co che maker-checker (2 nguoi duyet) cho buoc approved/completed hay 1 admin tu lam het tu dau den cuoi. He thong co enforce maker-checker (2 nguoi duyet) cho buoc chuyen sang approved/completed hay 1 admin co the tu lam toan bo quy trinh?"
}
``` ## OQ-invoice-payout-005 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-invoice-payout-005", "type": "NEEDS_CONFIRMATION", "feature_id": "admin-invoice-processing", "check_ids": [ "CHK-014" ], "summary": "[CAN XAC NHAN] Co audit trail ghi lai ai doi status Invoice sang completed va luc nao khong. He thong co log/audit trail ghi lai viec admin doi status Invoice sang completed (ai doi, luc nao) khong?"
}
``` ## OQ-invoice-payout-006 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-invoice-payout-006", "type": "NEEDS_CONFIRMATION", "feature_id": "admin-invoice-processing", "check_ids": [ "CHK-015" ], "summary": "[CAN XAC NHAN] Admin co sua tay duoc cac o snapshot (payment_method_name/fee/payment_info) truoc khi luu khong. Sau khi cac o snapshot (payment_method_name/fee/payment_info) duoc AJAX dien san khi chuyen sang completed, admin co sua tay duoc khong, va neu sua thi gia tri nao duoc luu?"
}
``` ## OQ-invoice-payout-007 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-invoice-payout-007", "type": "NEEDS_CONFIRMATION", "feature_id": "admin-invoice-processing", "check_ids": [ "CHK-016" ], "summary": "[CAN XAC NHAN] fee tren Invoice duoc tinh/luu the nao khi transfer_fee cua Payment Method de trong (Absorbed). fee cua invoice duoc tinh/luu the nao khi transfer_fee cua Payment Method de trong (Absorbed) - co phai $0, null, hay mot gia tri khac?"
}
``` ## OQ-invoice-payout-008 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-invoice-payout-008", "type": "NEEDS_CONFIRMATION", "feature_id": "balance-accrual", "check_ids": [ "CHK-006" ], "summary": "[CAN XAC NHAN] Bonus 'premium offer' cong vao balance cho affiliate moi, va bi tru lai neu bonus bi thu hoi. Co che bonus 'premium offer' cong/tru balance cho affiliate moi (KB-002) co phai hanh vi thuc da duoc xac nhan hay chi la mo ta hedged chua chac chan trong tai lieu dev?"
}
``` ## OQ-invoice-payout-009 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-invoice-payout-009", "type": "NEEDS_CONFIRMATION", "feature_id": "balance-accrual", "check_ids": [ "CHK-007" ], "summary": "[CAN XAC NHAN] Balance co duoc phep am khong khi clawback lon hon so du hien co. Balance co duoc phep am khong khi mot Conversion clawback/refund co |amount| lon hon so du hien co cua affiliate?"
}
``` ## OQ-invoice-payout-010 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-invoice-payout-010", "type": "NEEDS_CONFIRMATION", "feature_id": "balance-accrual", "check_ids": [ "CHK-008" ], "summary": "[CAN XAC NHAN] Co ledger/log doi soat tung lan balance tang/giam khong. He thong co luu lai log/ledger cho tung lan balance tang/giam (de doi soat) hay chi co 1 gia tri User.balance hien tai duy nhat?"
}
``` ## OQ-invoice-payout-011 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-invoice-payout-011", "type": "NEEDS_CONFIRMATION", "feature_id": "payout-request-cancellation", "check_ids": [ "CHK-007" ], "summary": "[CAN XAC NHAN] Huy Invoice tu trang thai completed - co cho phep khong, balance xu ly the nao. Huy 1 Invoice tu trang thai completed co duoc phep khong, va neu duoc, balance/tien da chi duoc xu ly the nao?"
}
``` ## OQ-invoice-payout-012 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-invoice-payout-012", "type": "NEEDS_CONFIRMATION", "feature_id": "payout-request-cancellation", "check_ids": [ "CHK-008" ], "summary": "[CAN XAC NHAN] Affiliate co tu huy duoc Invoice khi da approved (qua goi API truc tiep) hay chi Ops lam duoc. Affiliate co the tu huy 1 Invoice da approved bang cach goi truc tiep PUT /invoices/{id} (bo qua UI da an nut huy) hay bi middleware backend chan giong nhu hanh dong tao Invoice?"
}
``` ## OQ-invoice-payout-013 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-invoice-payout-013", "type": "NEEDS_CONFIRMATION", "feature_id": "payout-request-cancellation", "check_ids": [ "CHK-009" ], "summary": "[CAN XAC NHAN] Ma tran chuyen trang thai hop le day du cua Invoice - cac chuyen trang thai khac co bi chan khong. Ma tran chuyen trang thai hop le day du cua Invoice la gi (pending->?, approved->?, completed->?, cancel->?), va code co chan cac chuyen trang thai khong hop le khong?"
}
``` ## OQ-invoice-payout-014 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-invoice-payout-014", "type": "NEEDS_CONFIRMATION", "feature_id": "payout-request-cancellation", "check_ids": [ "CHK-010" ], "summary": "[CAN XAC NHAN] Thong bao/email khi Invoice chuyen sang approved hoac khi bi cancel tu approved. Affiliate co nhan duoc thong bao/email nao khi Invoice chuyen sang approved, hoac khi bi huy tu approved (tinh huong lien quan known defect C1) khong?"
}
``` ## OQ-invoice-payout-015 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-invoice-payout-015", "type": "NEEDS_CONFIRMATION", "feature_id": "payout-request-eligibility", "check_ids": [ "CHK-010" ], "summary": "[CAN XAC NHAN] Request khong dang nhap (unauthenticated) toi POST /invoices bi chan truoc khi middleware eligibility chay. Request POST /invoices hoan toan khong dang nhap bi chan the nao (ma loi/response body cu the), va co phai 1 middleware auth rieng chay truoc check_can_create_invoice khong?"
}
``` ## OQ-invoice-payout-016 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-invoice-payout-016", "type": "NEEDS_CONFIRMATION", "feature_id": "payout-request-eligibility", "check_ids": [ "CHK-011" ], "summary": "[CAN XAC NHAN] Ma loi/response body khi middleware check_can_create_invoice chan request hop le ve auth nhung khong du dieu kien nghiep vu. POST /api/invoices tra ve status/body cu the gi khi bi middleware check_can_create_invoice chan?"
}
``` ## OQ-invoice-payout-017 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-invoice-payout-017", "type": "NEEDS_CONFIRMATION", "feature_id": "payout-request-submission", "check_ids": [ "CHK-005" ], "summary": "[CAN XAC NHAN] Rut mot phan co rang buoc toi thieu/toi da nao ngoai '> phi va <= balance' khong. Ngoai dieu kien amount > phi va amount <= balance, rut mot phan co rang buoc toi thieu/toi da nao khac khong (vd buoc tron so, gioi han so lan/ngay)?"
}
``` ## OQ-invoice-payout-018 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-invoice-payout-018", "type": "NEEDS_CONFIRMATION", "feature_id": "payout-request-submission", "check_ids": [ "CHK-011" ], "summary": "[CAN XAC NHAN] He thong co chan affiliate tao nhieu Invoice pending song song khong. He thong co chan affiliate tao nhieu Invoice o trang thai pending cung luc khong, hay chi dua vao viec balance bi tru ngay de 'gian tiep' han che so luong?"
}
```

## OQ-invoice-payout-019 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-invoice-payout-019",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "admin-invoice-processing",
  "check_ids": [
    "admin-invoice-processing:CHK-007"
  ],
  "summary": "Invoice.status chi nhan dung 1 trong 4 gia tri enum. Oracle STRONG cua check 'CHK-007' hien trace toi kb_id (KB-009) co confirmation_source.derivation=code_artifact (suy ra tu doc code/schema, khong phai phat bieu nghiep vu tuong minh)."
}
```

## OQ-invoice-payout-020 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-invoice-payout-020",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "admin-invoice-processing",
  "check_ids": [
    "admin-invoice-processing:CHK-008"
  ],
  "summary": "Invoice.fee nullable, fallback ve PaymentMethod.transfer_fee neu trong. Oracle STRONG cua check 'CHK-008' hien trace toi kb_id (KB-010) co confirmation_source.derivation=code_artifact (suy ra tu doc code/schema, khong phai phat bieu nghiep vu tuong minh)."
}
```

## OQ-invoice-payout-021 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-invoice-payout-021",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "admin-invoice-processing",
  "check_ids": [
    "admin-invoice-processing:CHK-009"
  ],
  "summary": "So tien thuc nhan = amount - actual_fee. Oracle cua check 'CHK-009' trace toi kb_id KB-011, nhung KB-011 da bi ha xuong knowledge_kind=INFERRED, confidence=LOW, confirmation_source=null (vi du so lieu minh hoa $120-$2=$118 chi la vi du, khong duoc dung lam nguon xac nhan; phan con lai cua tai lieu chi mo ta code hien tai, khong phai phat bieu nghiep vu tuong minh, nen khong du dieu kien CONFIRMED_EXPECTED). oracle_strength hien la NONE. De nghi PO/Dev xac nhan cong thuc 'so tien thuc nhan = amount - actual_fee' co phai la quy tac nghiep vu chu dich hay chi la suy dien tu code chua kiem chung."
}
```

## OQ-invoice-payout-022 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-invoice-payout-022",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": [
    "balance-accrual",
    "payout-request-cancellation",
    "payout-request-submission"
  ],
  "check_ids": [
    "balance-accrual:CHK-001",
    "payout-request-cancellation:CHK-001",
    "payout-request-submission:CHK-001"
  ],
  "summary": "Conversion duong lam balance tang dung bang Conversion.amount. Oracle STRONG cua check 'CHK-001' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao)."
}
```

## OQ-invoice-payout-023 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-invoice-payout-023",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": [
    "balance-accrual",
    "payout-request-cancellation",
    "payout-request-eligibility",
    "payout-request-submission"
  ],
  "check_ids": [
    "balance-accrual:CHK-002",
    "payout-request-cancellation:CHK-002",
    "payout-request-eligibility:CHK-002",
    "payout-request-submission:CHK-002"
  ],
  "summary": "Conversion am (clawback/refund) lam balance giam dung gia tri tuyet doi. Oracle STRONG cua check 'CHK-002' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao)."
}
```

## OQ-invoice-payout-024 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-invoice-payout-024",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "payout-request-cancellation",
  "check_ids": [
    "payout-request-cancellation:CHK-003"
  ],
  "summary": "[KNOWN DEFECT C1 - khong phai expected result] Huy Invoice tu approved KHONG hoan balance tu dong - mat tien thuc. KB item KB-003 mang status=KNOWN_DEFECT da bi go khoi oracle.kb_ids (khong duoc dung lam oracle theo luat C5 'known_defect khong phai expected result'). Check 'CHK-003' hien khong con oracle hop le nao."
}
```

## OQ-invoice-payout-025 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-invoice-payout-025",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "payout-request-cancellation",
  "check_ids": [
    "payout-request-cancellation:CHK-006"
  ],
  "summary": "cancellation_reason luu dung ly do huy khi status=cancel. Oracle STRONG cua check 'CHK-006' hien trace toi kb_id (KB-006) co confirmation_source.derivation=code_artifact (suy ra tu doc code/schema, khong phai phat bieu nghiep vu tuong minh)."
}
```

## OQ-invoice-payout-026 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-invoice-payout-026",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": [
    "payout-request-eligibility",
    "payout-request-submission"
  ],
  "check_ids": [
    "payout-request-eligibility:CHK-003",
    "payout-request-submission:CHK-003"
  ],
  "summary": "balance = transfer_fee (bang nhau) -> KHONG thoa dieu kien chung (strict >, khong phai >=). Oracle STRONG cua check 'CHK-003' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao)."
}
```

## OQ-invoice-payout-027 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-invoice-payout-027",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "payout-request-eligibility",
  "check_ids": [
    "payout-request-eligibility:CHK-005"
  ],
  "summary": "Affiliate khong VIP, balance < $50 -> canCreateByUser=false du so shop co thoa man ca 2 cach dem. Oracle STRONG cua check 'CHK-005' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao)."
}
```

## OQ-invoice-payout-028 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-invoice-payout-028",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "payout-request-eligibility",
  "check_ids": [
    "payout-request-eligibility:CHK-006"
  ],
  "summary": "Affiliate khong VIP, balance = $50 dung bang nguong -> thoa dieu kien bo sung #2 (inclusive). Oracle STRONG cua check 'CHK-006' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao)."
}
```

## OQ-invoice-payout-029 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-invoice-payout-029",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "payout-request-eligibility",
  "check_ids": [
    "payout-request-eligibility:CHK-008"
  ],
  "summary": "Khong the lach dieu kien bang goi thang POST /invoices - middleware check_can_create_invoice van chan. Oracle STRONG cua check 'CHK-008' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao)."
}
```

## OQ-invoice-payout-030 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-invoice-payout-030",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "payout-request-submission",
  "check_ids": [
    "payout-request-submission:CHK-004"
  ],
  "summary": "Amount tuy nhap > balance hien tai -> bi reject, khong tao Invoice. Oracle STRONG cua check 'CHK-004' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao)."
}
```

## OQ-invoice-payout-031 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-invoice-payout-031",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "payout-request-submission",
  "check_ids": [
    "payout-request-submission:CHK-010"
  ],
  "summary": "payment_method_name/payment_info tren Invoice la snapshot tai thoi diem tao, khong doi theo thay doi sau cua User. Oracle STRONG cua check 'CHK-010' hien trace toi kb_id (KB-010) co confirmation_source.derivation=code_artifact (suy ra tu doc code/schema, khong phai phat bieu nghiep vu tuong minh)."
}
```

## OQ-invoice-payout-032 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-invoice-payout-032",
  "type": "NEEDS_CONFIRMATION",
  "check_ids": [
    "admin-invoice-processing:CHK-004"
  ],
  "summary": "payment_method_name/payment_info rỗng trên Invoice tự động fallback về thông tin HIỆN TẠI của User. Oracle dựa trên KB-005, derivation=code_artifact — theo phanh derivation không đủ làm oracle STRONG. Cần xác nhận từ nguồn mạnh hơn."
}
```
