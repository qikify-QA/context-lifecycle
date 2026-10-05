# Open Questions — payment-method Tổng: 18 mục (NEEDS_CONFIRMATION/CONFLICT/OPEN_ISSUE). Sinh từ bootstrap DOC_BOOTSTRAP đầu tiên cho qikfiliate. ## OQ-payment-method-001 — OPEN_ISSUE ```json
{ "oq_id": "OQ-payment-method-001", "type": "OPEN_ISSUE", "feature_id": "affiliate-payment-info-setup", "kb_id": "KB-007", "summary": "KNOWN DEFECT (KB-007, feature affiliate-payment-info-setup): KNOWN DEFECT: frontend hardcode payment_method_id=1(PayPal)/2(Payoneer). Theo tai lieu `dashboard - payment and payout request` Section: Luu y rui ro - hardcode PayPal/Payoneer tren frontend, `admin - invoices and payment methods` Section: Journey - Them 1 phuong thuc thanh toan moi, va `known issues edge cases` Section: F1 (3 tai lieu doc lap dong thuan), component PayoutBlock.vue hien hardcode cung: payment_method_id === 1 duoc coi la PayPal (ap dieu kien hien thi 'can balance > $50 moi rut duoc'), id === 2 duoc coi la Payoneer (hien thi 'khong gioi han toi thieu') - hardcode theo ID, KHONG doc field nao tu PaymentMethod de suy ra dieu kien nay. Day la hanh vi SAI dang ton tai (known defect ve UI hien thi), KHONG phai expected result - giu OBSERVED_CURRENT, KHONG duoc nang len CONFIRMED_EXPECTED."
}
``` ## OQ-payment-method-002 — OPEN_ISSUE ```json
{ "oq_id": "OQ-payment-method-002", "type": "OPEN_ISSUE", "feature_id": "affiliate-payment-info-setup", "kb_id": "KB-008", "summary": "KNOWN DEFECT (KB-008, feature affiliate-payment-info-setup): KNOWN DEFECT: xoa/tao lai record PayPal/Payoneer doi ID -> dieu kien hien thi sai lech. Theo tai lieu `dashboard - payment and payout request` Section: Luu y rui ro, va `known issues edge cases` Section: F1, neu admin xoa roi tao lai record PayPal (hoac Payoneer) trong bang payment_methods, ban ghi moi se nhan ID khac (vi du #15, vi auto-increment khong tai su dung ID cu) - khi do dong chu dieu kien hardcode tren UI KHONG CON KHOP voi ID thuc; dieu kien hien thi 'can balance > $50' tren UI cho affiliate se KHONG AP DUNG DUNG (frontend khong con nhan dien duoc #15 la PayPal). Day la he qua truc tiep cua known defect KB-007 - giu OBSERVED_CURRENT, KHONG duoc nang len CONFIRMED_EXPECTED."
}
``` ## OQ-payment-method-003 — OPEN_ISSUE ```json
{ "oq_id": "OQ-payment-method-003", "type": "OPEN_ISSUE", "feature_id": "affiliate-payment-info-setup", "kb_id": "KB-010", "summary": "KNOWN DEFECT (KB-010, feature affiliate-payment-info-setup): KNOWN DEFECT: affiliate co the thay thong bao dieu kien rut tien sai lech tren UI. Theo tai lieu `known issues edge cases` Section: F1, do loi hardcode ID (KB-007/KB-008), affiliate co the thay thong bao dieu kien rut tien SAI LECH tren UI (hien thi sai nguong can dat) du backend van chan/cho phep dung. Tai lieu tu neu muc do nghiem trong: gay nham lan trai nghiem nhung KHONG gay sai so tien thuc te. Claim nay hedged (tu danh dau chua chac chan ve pham vi anh huong) - giu OBSERVED_CURRENT, KHONG duoc nang len CONFIRMED_EXPECTED."
}
``` ## OQ-payment-method-004 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-payment-method-004", "type": "NEEDS_CONFIRMATION", "feature_id": "affiliate-payment-info-setup", "check_ids": [ "CHK-010" ], "summary": "[CAN XAC NHAN] Field Katakana co thuc su duoc validate/bat buoc hay chi chuan bi san, chua dung. Field 'ten chu tai khoan dang Katakana' co phai nhu cau thuc te dang duoc su dung (bat buoc validate) hay chi duoc chuan bi san trong form ma chua co logic nghiep vu nao dung den?"
}
``` ## OQ-payment-method-005 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-payment-method-005", "type": "NEEDS_CONFIRMATION", "feature_id": "affiliate-payment-info-setup", "check_ids": [ "CHK-011" ], "summary": "[CAN XAC NHAN] Hau qua voi payment info da luu cua affiliate neu admin doi visible=false, doi country, hoac xoa method dang duoc affiliate su dung. Dieu gi xay ra voi payment info da luu cua affiliate (payment_method_id, hasPaymentInfo, canCreateByUser) neu admin dat visible=false, doi country, hoac xoa han PaymentMethod ma affiliate do dang su dung?"
}
``` ## OQ-payment-method-006 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-payment-method-006", "type": "NEEDS_CONFIRMATION", "feature_id": "affiliate-payment-info-setup", "check_ids": [ "CHK-012" ], "summary": "[CAN XAC NHAN] Admin khong the sua payment info cua affiliate thay ho qua chinh feature nay. Admin co kha nang sua payment_method_id/payment_info/payment_details cua affiliate thong qua bat ky giao dien nao khong, hay day hoan toan la hanh dong tu-phuc-vu cua affiliate?"
}
``` ## OQ-payment-method-007 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-payment-method-007", "type": "NEEDS_CONFIRMATION", "feature_id": "payment-method-catalog", "check_ids": [ "CHK-011" ], "summary": "[CAN XAC NHAN] Co canh bao/guard nao khi admin xoa 1 record PayPal/Payoneer hien huu khong. Khi admin xoa 1 record PaymentMethod ten PayPal/Payoneer, he thong co hien canh bao/guard nao ve he qua known defect hardcode ID (affiliate-payment-info-setup KB-007/008) truoc khi admin xac nhan xoa khong?"
}
``` ## OQ-payment-method-008 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-payment-method-008", "type": "NEEDS_CONFIRMATION", "feature_id": "payment-method-catalog", "check_ids": [ "CHK-012" ], "summary": "[CAN XAC NHAN] Affiliate khong co quyen CRUD tren danh muc Payment Method. Request CRUD tren danh muc Payment Method (tao/sua/xoa) thuc hien boi 1 tai khoan affiliate (khong phai admin) bi chan the nao (ma loi/response cu the)?"
}
```

## OQ-payment-method-009 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-payment-method-009",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "affiliate-payment-info-setup",
  "check_ids": [
    "affiliate-payment-info-setup:CHK-001"
  ],
  "summary": "Chon payment method khong can bank details -> hien 1 o nhap payment_info don gian. Oracle STRONG cua check 'CHK-001' hien trace toi kb_id (KB-005) co confirmation_source.derivation=code_artifact (suy ra tu doc code/schema, khong phai phat bieu nghiep vu tuong minh)."
}
```

## OQ-payment-method-010 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-payment-method-010",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "affiliate-payment-info-setup",
  "check_ids": [
    "affiliate-payment-info-setup:CHK-003"
  ],
  "summary": "Luu thong tin thanh toan -> payment_method_id va payment_info/payment_details duoc luu dung tren User. Oracle STRONG cua check 'CHK-003' hien trace toi kb_id (KB-001) co confirmation_source.derivation=code_artifact (suy ra tu doc code/schema, khong phai phat bieu nghiep vu tuong minh)."
}
```

## OQ-payment-method-011 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-payment-method-011",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "affiliate-payment-info-setup",
  "check_ids": [
    "affiliate-payment-info-setup:CHK-007"
  ],
  "summary": "[KNOWN DEFECT - khong phai expected result] PayoutBlock.vue hardcode payment_method_id=1(PayPal)/2(Payoneer) de ap dieu kien hien thi rut tien. KB item KB-007 mang status=KNOWN_DEFECT da bi go khoi oracle.kb_ids (khong duoc dung lam oracle theo luat C5 'known_defect khong phai expected result'). Check 'CHK-007' hien khong con oracle hop le nao."
}
```

## OQ-payment-method-012 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-payment-method-012",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "affiliate-payment-info-setup",
  "check_ids": [
    "affiliate-payment-info-setup:CHK-008"
  ],
  "summary": "[KNOWN DEFECT - khong phai expected result] Xoa/tao lai record PayPal hoac Payoneer doi ID -> dieu kien hardcode khong con khop. KB item KB-008 mang status=KNOWN_DEFECT da bi go khoi oracle.kb_ids (khong duoc dung lam oracle theo luat C5 'known_defect khong phai expected result'). Check 'CHK-008' hien khong con oracle hop le nao."
}
```

## OQ-payment-method-013 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-payment-method-013",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "payment-method-catalog",
  "check_ids": [
    "payment-method-catalog:CHK-005"
  ],
  "summary": "Mo 1 method cho nhieu quoc gia yeu cau tao nhieu dong rieng - affiliate moi quoc gia thay dung dong tuong ung. Oracle STRONG cua check 'CHK-005' hien trace toi kb_id (KB-006) co confirmation_source.derivation=code_artifact (suy ra tu doc code/schema, khong phai phat bieu nghiep vu tuong minh)."
}
```

## OQ-payment-method-014 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-payment-method-014",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "payment-method-catalog",
  "check_ids": [
    "payment-method-catalog:CHK-006"
  ],
  "summary": "availableFor(User) loc dung theo visible=true VA (country null HOAC trung user.country, ISO alpha-2). Oracle STRONG cua check 'CHK-006' hien trace toi kb_id (KB-006, KB-007) co confirmation_source.derivation=code_artifact (suy ra tu doc code/schema, khong phai phat bieu nghiep vu tuong minh)."
}
```

## OQ-payment-method-015 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-payment-method-015",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "payment-method-catalog",
  "check_ids": [
    "payment-method-catalog:CHK-008"
  ],
  "summary": "transfer_fee la fallback mac dinh cho Invoice.fee khi invoice khong tu set. Oracle STRONG cua check 'CHK-008' hien trace toi kb_id (KB-008) co confirmation_source.derivation=code_artifact (suy ra tu doc code/schema, khong phai phat bieu nghiep vu tuong minh)."
}
```

## OQ-payment-method-016 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-payment-method-016",
  "type": "NEEDS_CONFIRMATION",
  "check_ids": [
    "affiliate-payment-info-setup:CHK-002"
  ],
  "summary": "Chọn payment method cần bank details → hiện 7 field ngân hàng có cấu trúc. Oracle dựa trên KB-003 (shard affiliate-payment-info-setup), derivation=code_artifact — theo phanh derivation không đủ làm oracle STRONG. Cần xác nhận từ nguồn mạnh hơn."
}
```

## OQ-payment-method-017 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-payment-method-017",
  "type": "NEEDS_CONFIRMATION",
  "check_ids": [
    "payment-method-catalog:CHK-002"
  ],
  "summary": "Bật/tắt visible qua switch AJAX-inline — không cần mở form chi tiết. Oracle dựa trên KB-003 (shard payment-method-catalog), derivation=code_artifact — theo phanh derivation không đủ làm oracle STRONG. Cần xác nhận từ nguồn mạnh hơn."
}
```

## OQ-payment-method-018 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-payment-method-018",
  "type": "NEEDS_CONFIRMATION",
  "check_ids": [
    "payment-method-catalog:CHK-003",
    "payment-method-catalog:CHK-004"
  ],
  "summary": "Field country chỉ nhận đúng 1 quốc gia (không nhận cả khu vực/nhiều giá trị); để trống country → method hiển thị cho affiliate của MỌI quốc gia. Oracle của cả 2 check dựa trên KB-004, derivation=code_artifact — theo phanh derivation không đủ làm oracle STRONG. Cần xác nhận từ nguồn mạnh hơn."
}
```
