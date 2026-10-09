# Open Questions — translate-offers

Tổng: 11 mục (NEEDS_CONFIRMATION/CONFLICT/OPEN_ISSUE). Sinh từ bootstrap DOC_BOOTSTRAP đầu tiên cho qik-volume.

- NEEDS_CONFIRMATION: 11
- CONFLICT: 0
- OPEN_ISSUE: 0

## OQ-translate-offers-001 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-translate-offers-001",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "translate-offers",
  "check_ids": [
    "translate-offers:CHK-022"
  ],
  "summary": "[HEDGED — chưa xác nhận] SDK detect đúng active language và load/hiển thị bản dịch tương ứng",
  "detail": "SDK storefront có thực sự detect đúng active language và load/hiển thị bản dịch tương ứng cho Default content + offer content như QVD-55 mô tả không? Chưa verify được trực tiếp trong session test nguồn (bị block bởi hạn chế route preview bypass) — cần retest bằng phương pháp/quyền truy cập khác (ví dụ password-protected preview thật) trước khi dùng làm oracle cho regression."
}
```

## OQ-translate-offers-002 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-translate-offers-002",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "translate-offers",
  "check_ids": [
    "translate-offers:CHK-023"
  ],
  "summary": "[HEDGED — chưa xác nhận] SDK fallback về default language khi thiếu bản dịch cho active language",
  "detail": "Khi active language của shopper không có bản dịch cho 1 field/offer cụ thể, SDK có fallback hiển thị nội dung default (English) hay để trống/lỗi? Chưa verify được trực tiếp trong session test nguồn — cần retest riêng."
}
```

## OQ-translate-offers-003 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-translate-offers-003",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "translate-offers",
  "check_ids": [
    "translate-offers:CHK-024"
  ],
  "summary": "[HEDGED — chưa xác nhận] Variant hết hàng hiện lỗi inline đã dịch, chặn proceed",
  "detail": "Khi shopper chọn một variant đang out of stock, hệ thống có hiển thị error inline ngay (đã dịch theo active language) và chặn proceed cho tier đó như ticket QVD-55 mô tả không? Claim này hedged, chưa live-tested trong tài liệu nguồn — cần xác nhận bằng quan sát thật."
}
```

## OQ-translate-offers-004 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-translate-offers-004",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "translate-offers",
  "check_ids": [
    "translate-offers:CHK-025"
  ],
  "summary": "[HEDGED — chưa xác nhận] Tier quantity không đủ hàng làm disable Add to cart kèm lỗi đã dịch",
  "detail": "Khi tier quantity không fully available trong kho, nút Add to cart có bị disable kèm error message đã dịch phía trên nút như ticket QVD-55 mô tả không? Claim này hedged, chưa live-tested — cần xác nhận bằng quan sát thật."
}
```

## OQ-translate-offers-005 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-translate-offers-005",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "translate-offers",
  "check_ids": [
    "translate-offers:CHK-026"
  ],
  "summary": "[GAP] Lưu modal dịch offer khi để trống một số field — hành vi validation chưa xác nhận",
  "detail": "Khi merchant lưu modal dịch offer với một hoặc nhiều field để trống, hệ thống có chặn save bằng validation, hay cho save và field đó fallback về nội dung gốc/hiển thị trống trên storefront? Không có claim nào trong tài liệu nguồn (\"Translate Offers\") trả lời câu hỏi này."
}
```

## OQ-translate-offers-006 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-translate-offers-006",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "translate-offers",
  "check_ids": [
    "translate-offers:CHK-028"
  ],
  "summary": "[GAP] Bản dịch của 1 offer sau khi offer đó bị xoá — cleanup hay orphaned?",
  "detail": "Khi một offer có bản dịch đã tồn tại bị xoá, bản dịch của nó được cleanup (xoá theo) hay trở thành dữ liệu orphaned? Không có claim nào trong \"Translate Offers\" trả lời câu hỏi này; ảnh hưởng tới tính toàn vẹn dữ liệu."
}
```

## OQ-translate-offers-007 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-translate-offers-007",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "translate-offers",
  "check_ids": [
    "translate-offers:CHK-029"
  ],
  "summary": "[GAP] Thêm ngôn ngữ MỚI — Default content có carry-over/pre-fill hay luôn trống hoàn toàn?",
  "detail": "Khi merchant thêm một ngôn ngữ MỚI (chưa từng có bản dịch) ở Shopify Settings → Languages, cột bản dịch của Default content cho ngôn ngữ đó bắt đầu hoàn toàn trống, hay có carry-over/pre-fill từ nội dung gốc/ngôn ngữ khác? Chưa được test trong tài liệu nguồn vì store mẫu đã có sẵn 2 ngôn ngữ từ trước."
}
```

## OQ-translate-offers-008 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-translate-offers-008",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "translate-offers",
  "check_ids": [
    "translate-offers:CHK-030"
  ],
  "summary": "[GAP] Sửa nội dung gốc của offer sau khi bản dịch đã tồn tại — bản dịch giữ nguyên (có thể stale) hay bị invalidate?",
  "detail": "Khi merchant sửa nội dung gốc của một offer SAU khi bản dịch đã tồn tại cho offer đó, bản dịch hiện có giữ nguyên (có thể lệch/stale so với gốc mới), có được flag cảnh báo, hay bị invalidate/xoá? Không có claim nào trong \"Translate Offers\" trả lời câu hỏi này; ảnh hưởng tới độ tin cậy nội dung hiển thị cho shopper."
}
```

## OQ-translate-offers-009 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-translate-offers-009",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "translate-offers",
  "check_ids": [
    "translate-offers:CHK-031"
  ],
  "summary": "[GAP] Offer tạo bởi AI Offer Creation có tự động nhận translation entry hay phải tạo thủ công",
  "detail": "Offer được tạo bởi AI Offer Creation có tự động xuất hiện trong tab Offer(s) của trang Translations với translation entry sẵn sàng để dịch, giống như offer tạo tay, hay có khác biệt nào (thiếu, delay, cần bước kích hoạt riêng)? Không có claim nào trong \"Translate Offers\" trả lời câu hỏi này."
}
```

## OQ-translate-offers-010 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-translate-offers-010",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "translate-offers",
  "check_ids": [
    "translate-offers:CHK-032"
  ],
  "summary": "[GAP, HEDGED] Label 'item'/error message stock-related có global hay khác nhau theo từng offer type",
  "detail": "Label 'item'/'items' và 2 error message liên quan stock (out-of-stock, tier quantity không đủ) có global/giống nhau trên mọi offer type, hay mỗi offer type (Quantity Break/Multibuy/Wholesale) có copy riêng? Ảnh hưởng tới việc checklist có cần test riêng theo từng offer type hay coi là 1 behavior chung; cả claim gốc về 2 message này cũng hedged/chưa live-tested (xem CHK-024, CHK-025)."
}
```

## OQ-translate-offers-011 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-translate-offers-011",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": null,
  "summary": "Doc set nguồn cho object translate-offers trải cả merchant (Portal Translations page) và buyer (storefront widget content) surface, không có 1 role duy nhất khai báo ở mức doc-set/object (bootstrap context.role=null, theo thiết kế). Cần xác nhận đây có phải invariant đúng hay chỉ là gap của bộ tài liệu nguồn."
}
```

