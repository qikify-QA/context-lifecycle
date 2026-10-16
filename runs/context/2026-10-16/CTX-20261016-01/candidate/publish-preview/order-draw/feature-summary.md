# Order và bốc thăm: webhook orders/paid → order + opening request, chốt quà (winning), trạng thái đơn, đưa quà vào đơn Shopify, box physical vs digital
**Published context version:** 1

**Product:** mysbox · **Object:** `order-draw` · **Mode:** DOC_BOOTSTRAP · **Environment:** documented · **Published:** 2026-10-16

## Features

- **purchase-and-prize-draw** (P1) — Mua box và bốc thăm quà khi đơn paid: 59 KB item, 27 check (22 cần xác nhận); gate KB/profile/checklist: PASS/CONDITIONAL_PASS/CONDITIONAL_PASS
- **prizes-added-to-order** (P1) — Quà được thêm vào đơn Shopify (dòng $0): 75 KB item, 28 check (21 cần xác nhận); gate KB/profile/checklist: PASS/CONDITIONAL_PASS/CONDITIONAL_PASS
- **physical-sealed-box-fulfilment** (P2) — Box physical (Sealed box): quà giấu kín, metafield/tag/note, trừ kho: 64 KB item, 26 check (7 cần xác nhận); gate KB/profile/checklist: PASS/CONDITIONAL_PASS/CONDITIONAL_PASS

## Tóm tắt knowledge

- KB item: 221 (CONFIRMED_EXPECTED 161 · INFERRED 55 · OBSERVED_CURRENT 5), trong đó 23 item mức object (`kb.json`).
- Known defect (OBSERVED_CURRENT + status KNOWN_DEFECT, chỉ dùng làm regression watch): 5.
- Item chỉ có trên nhánh build-staging (tag `staging-only`, INFERRED, không dùng làm hành vi production): 1.
- Checklist: 81 check, 67 có oracle STRONG.

## Trạng thái open questions

- CONFLICT (hai phía song song, chưa ngã ngũ): 6
- OPEN_ISSUE (known defect, vùng tài liệu chưa nói tới): 29
- NEEDS_CONFIRMATION (thiếu oracle đủ mạnh, chờ PO/Dev hoặc test_case PASS): 20
- Tổng: 55 — chi tiết trong `open-questions.md` của object này.

**Lưu ý về oracle:** toàn bộ KB của lần bootstrap này chỉ có nguồn `dev_doc` (tài liệu dev sinh từ source code). Theo luật C5, check P1 (tiền, billing, bốc thăm, refund, store credit, permission, xoá dữ liệu) có oracle STRONG nhưng chỉ dựa trên dev_doc vẫn giữ NEEDS_CONFIRMATION tới khi có `test_case` PASS — đây là kết quả đúng của bootstrap đầu, không phải thiếu sót.

## Nguồn & giới hạn

Toàn bộ knowledge của object này sinh từ bootstrap DOC_BOOTSTRAP đầu tiên (0 quan sát runtime: không có credential/portal/API access). Nguồn: bộ "Mysbox Product KB" v1 do dev viết từ source Mysbox (nhánh production và build-staging), ngày 2026-10-16, không kèm commit — nên `authored_on` của mọi item là 2026-10-16; KB này supersede được bởi CCR mới hơn. Nội dung gắn thẻ "chỉ có trên staging" trong tài liệu được giữ với tag `staging-only` và không được coi là hành vi production. Giá trị seed/minh hoạ (vd hạn mức gói Free 10 box/kỳ, giá gói ví dụ) không phải số production.
