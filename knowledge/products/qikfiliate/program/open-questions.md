# Open Questions — program Tổng: 16 mục (NEEDS_CONFIRMATION/CONFLICT/OPEN_ISSUE). Sinh từ bootstrap DOC_BOOTSTRAP đầu tiên cho qikfiliate. ## OQ-program-001 — OPEN_ISSUE ```json
{ "oq_id": "OQ-program-001", "type": "OPEN_ISSUE", "feature_id": "program-launch", "kb_id": "KB-PL-004", "summary": "KNOWN DEFECT (KB-PL-004, feature program-launch): KNOWN DEFECT — gõ sai Program.slug làm mất hoa hồng âm thầm. Theo tài liệu `qikfiliate/admin - programs and commissions` §`Journey — Launching 1 Program mới`, nếu `Program.slug` bị gõ sai khi tạo Program, mọi dòng CSV Payout của app đó không khớp được `Customer` nào (do bước khớp dựa vào `Program.slug` = `app_slug` trong CSV), và toàn bộ hoa hồng của app đó bị bỏ qua ÂM THẦM — không log, không cảnh báo. Tài liệu tự mô tả đây là lỗi khó phát hiện nhất trong toàn hệ thống. Đây là cảnh báo/regression watch, KHÔNG phải hành vi mong đợi."
}
``` ## OQ-program-002 — OPEN_ISSUE ```json
{ "oq_id": "OQ-program-002", "type": "OPEN_ISSUE", "feature_id": "program-launch", "kb_id": "KB-PL-006", "summary": "KNOWN DEFECT (KB-PL-006, feature program-launch): KNOWN DEFECT — quick-switch trên danh sách bỏ qua validate form đầy đủ. Theo tài liệu known-issues-edge-cases §E1, bấm trực tiếp switch `visible` trên danh sách Program gửi 1 request PUT chỉ đúng cột đó và KHÔNG đi qua toàn bộ validate của form sửa đầy đủ. Đây là cùng lớp rủi ro cơ chế Grid-switch được tài liệu cảnh báo (xem KB-UCE tương ứng cho ProgramCommission.handle_usage_charge) — ở Program.visible chưa ghi nhận hệ quả nghiệp vụ cụ thể nào vì visible không có field phụ thuộc required_if, nhưng cơ chế bypass validate là có thật."
}
``` ## OQ-program-003 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-program-003", "type": "NEEDS_CONFIRMATION", "feature_id": "program-catalog-for-affiliates", "check_ids": [ "CHK-010" ], "summary": "NEEDS_CONFIRMATION: ảnh hưởng của việc ẩn/xoá Program lên link giới thiệu đã phát ra trước đó. Khi admin tắt visible hoặc xoá 1 Program đang có Conversion/Customer, điều gì xảy ra với: (a) link giới thiệu (ref_slug/ref_url) đã phát ra trước đó cho affiliate, (b) Customer/Conversion đã gắn với Program đó, (c) lần import payout kế tiếp cho app đó?"
}
``` ## OQ-program-004 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-program-004", "type": "NEEDS_CONFIRMATION", "feature_id": "program-launch", "check_ids": [ "CHK-004" ], "summary": "Tạo Program thiếu field bắt buộc (name/slug) bị chặn. Khi tạo Program mới, field nào là bắt buộc (required) trên form, và thông báo lỗi validate cụ thể là gì khi thiếu?"
}
``` ## OQ-program-005 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-program-005", "type": "NEEDS_CONFIRMATION", "feature_id": "program-launch", "check_ids": [ "CHK-011" ], "summary": "NEEDS_CONFIRMATION: Program.slug unique constraint và chuẩn hoá so khớp (hoa/thường, khoảng trắng). Program.slug có unique constraint trong DB không? Khi khớp app_slug trong CSV Payout, hệ thống có chuẩn hoá (lowercase/trim) trước khi so sánh không, hay so khớp tuyệt đối từng ký tự kể cả hoa/thường và khoảng trắng?"
}
``` ## OQ-program-006 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-program-006", "type": "NEEDS_CONFIRMATION", "feature_id": "program-launch", "check_ids": [ "CHK-012" ], "summary": "NEEDS_CONFIRMATION: ảnh hưởng của tắt visible/xoá Program lên Conversion/Customer/link giới thiệu đã tồn tại. Khi tắt visible hoặc xoá 1 Program đang có Conversion/Customer: Conversion cũ có bị ảnh hưởng không? Link giới thiệu (ref_slug/ref_url) đã phát ra trước đó còn hoạt động không? Lần import payout kế tiếp cho app đó xử lý ra sao?"
}
```

## OQ-program-007 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-program-007",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "program-catalog-for-affiliates",
  "check_ids": [
    "program-catalog-for-affiliates:CHK-004"
  ],
  "summary": "Lấy link giới thiệu dùng thẳng ref_url khi đã có sẵn trong DB. Oracle STRONG cua check 'CHK-004' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao)."
}
```

## OQ-program-008 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-program-008",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "program-catalog-for-affiliates",
  "check_ids": [
    "program-catalog-for-affiliates:CHK-005"
  ],
  "summary": "Lấy link giới thiệu fallback ghép config(app.affiliate_url) + ref_slug khi ref_url trống. Oracle STRONG cua check 'CHK-005' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao)."
}
```

## OQ-program-009 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-program-009",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": [
    "program-catalog-for-affiliates",
    "program-launch"
  ],
  "check_ids": [
    "program-catalog-for-affiliates:CHK-008",
    "program-launch:CHK-008"
  ],
  "summary": "Affiliate không có hành động sửa Program từ trang Links. Oracle STRONG cua check 'CHK-008' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao)."
}
```

## OQ-program-010 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-program-010",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "program-launch",
  "check_ids": [
    "program-launch:CHK-002"
  ],
  "summary": "Program.slug khi tạo mới khớp chính xác từng ký tự với App Slug Shopify sẽ gửi trong CSV Payout. Oracle STRONG cua check 'CHK-002' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao)."
}
```

## OQ-program-011 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-program-011",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "program-launch",
  "check_ids": [
    "program-launch:CHK-003"
  ],
  "summary": "Regression-watch: Program.slug gõ sai làm toàn bộ hoa hồng của app bị bỏ qua âm thầm khi import. KB item KB-PL-004 mang status=KNOWN_DEFECT da bi go khoi oracle.kb_ids (khong duoc dung lam oracle theo luat C5 'known_defect khong phai expected result'). Check 'CHK-003' hien khong con oracle hop le nao."
}
```

## OQ-program-012 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-program-012",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "program-launch",
  "check_ids": [
    "program-launch:CHK-006"
  ],
  "summary": "Regression-watch: quick-switch visible bỏ qua toàn bộ validate của form sửa đầy đủ. KB item KB-PL-006 mang status=KNOWN_DEFECT da bi go khoi oracle.kb_ids (khong duoc dung lam oracle theo luat C5 'known_defect khong phai expected result'). Check 'CHK-006' hien khong con oracle hop le nao."
}
```

## OQ-program-013 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-program-013",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "program-launch",
  "check_ids": [
    "program-launch:CHK-007"
  ],
  "summary": "Tạo ProgramCommission cho mọi Level ngay sau khi launch Program. Oracle STRONG cua check 'CHK-007' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao)."
}
```

## OQ-program-014 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-program-014",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "program-launch",
  "check_ids": [
    "program-launch:CHK-009"
  ],
  "summary": "Chỉ role admin được tạo/sửa Program và ProgramCommission. Oracle STRONG cua check 'CHK-009' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao)."
}
```

## OQ-program-015 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-program-015",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "program-launch",
  "check_ids": [
    "program-launch:CHK-013"
  ],
  "summary": "Program.slug được job import CSV Payout dùng làm khoá join duy nhất với app_slug. Oracle STRONG cua check 'CHK-013' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao)."
}
```

## OQ-program-016 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-program-016",
  "type": "NEEDS_CONFIRMATION",
  "check_ids": [
    "program-catalog-for-affiliates:CHK-001",
    "program-catalog-for-affiliates:CHK-006",
    "program-catalog-for-affiliates:CHK-007"
  ],
  "summary": "Catalog trang Links chỉ liệt kê Program có visible=true; Program visible=false không xuất hiện và không lấy được link qua UI catalog; Program biến mất khỏi catalog ngay khi visible bị tắt (không cache theo session cũ). Oracle của cả 3 check dựa trên KB-PCA-003, derivation=code_artifact — theo phanh derivation không đủ làm oracle STRONG. Cần xác nhận từ nguồn mạnh hơn."
}
```
