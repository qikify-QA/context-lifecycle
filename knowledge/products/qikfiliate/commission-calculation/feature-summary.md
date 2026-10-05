# Commission Calculation — engine tính hoa hồng cho 1 dòng payout
**Published context version:** 1

**Product:** qikfiliate · **Mode:** DOC_BOOTSTRAP · **Environment:** documented · **Published:** 2026-10-05

## Features

- **commission-decision-flow** — gate: CONDITIONAL_PASS
- **first-month-commission** — gate: CONDITIONAL_PASS
- **recurring-commission** — gate: CONDITIONAL_PASS
- **refund-and-downgrade-adjustment** — gate: CONDITIONAL_PASS
- **usage-charge-commission** — gate: CONDITIONAL_PASS

## Trạng thái open questions

- CONFLICT (chưa ngã ngũ, 2 phía song song): 2
- OPEN_ISSUE (known defect, quan sát hiện tại): 4
- NEEDS_CONFIRMATION (thiếu oracle đủ mạnh, chờ PO/Dev hoặc test_case PASS): 51
- Tổng: 57 — chi tiết đầy đủ trong `open-questions.md` của object này.

**Lưu ý về oracle_strength**: do toàn bộ KB của bootstrap đầu tiên này chỉ có nguồn `dev_doc` (chưa có `test_case`/`po_dev_confirm`/`spec_doc` nào), rất nhiều check regression phải giữ ở mức `BASELINE`/`NONE` thay vì `STRONG` theo đúng luật C5 của contract — đây là kết quả ĐÚNG và dự kiến của lần bootstrap đầu, không phải thiếu sót. `oracle_strength` sẽ nâng dần lên `STRONG` khi có `test_case` PASS tương ứng.

## Known defects đã ghi nhận (giữ nguyên hành vi hiện tại, KHÔNG dùng làm oracle đúng)

- `KB-012` (commission-decision-flow): [KNOWN_DEFECT] Thiếu ProgramCommission cho (Program, Level) sau khi thêm Level mới -> import lỗi, dễ bị ops bỏ sót
- `KB-012` (first-month-commission): [KNOWN_DEFECT / regression watch] Kỳ vọng sai thường gặp: "mọi charge trong 30 ngày đầu đều first-month"
- `KB-010` (usage-charge-commission): [KNOWN_DEFECT] Ví dụ usage thực tế chênh $0.06 chưa giải thích được
- `KB-012` (usage-charge-commission): [KNOWN_DEFECT] Admin panel không có cách xem nhanh dòng bị cap

## Nguồn & giới hạn

Toàn bộ knowledge của object này sinh từ bootstrap DOC_BOOTSTRAP đầu tiên (0 quan sát runtime — không có credential/portal/API access khi bootstrap). Tài liệu nguồn do dev viết trực tiếp từ source code `koin-partners` (Laravel 6), version v1, generated 2026-08-20. Claim nào chỉ đúng cho brand Koin mang `scope.brand: "koin"` trong `kb.json` — Qikfiliate phục vụ nhiều brand trên cùng codebase.
