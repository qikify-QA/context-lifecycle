# Resell (BOX / ITEMS), số tiền hoàn, store credit Koin + ticket + cart Function, huỷ/refund đơn từ Shopify
**Published context version:** 1

**Product:** mysbox · **Object:** `resell-refund-credit` · **Mode:** DOC_BOOTSTRAP · **Environment:** documented · **Published:** 2026-10-16

## Features

- **resell-setup-and-eligibility** (P1) — Cấu hình buyback và điều kiện để khách resell: 77 KB item, 32 check (23 cần xác nhận); gate KB/profile/checklist: PASS/CONDITIONAL_PASS/CONDITIONAL_PASS
- **resell-box-mode** (P1) — Resell chế độ BOX — bán lại cả box: 37 KB item, 20 check (16 cần xác nhận); gate KB/profile/checklist: PASS/CONDITIONAL_PASS/CONDITIONAL_PASS
- **resell-items-mode** (P1) — Resell chế độ ITEMS — bán lại từng món: 26 KB item, 15 check (13 cần xác nhận); gate KB/profile/checklist: PASS/CONDITIONAL_PASS/CONDITIONAL_PASS
- **refund-amount-calculation** (P1) — Công thức số tiền hoàn và chia thẻ / store credit: 74 KB item, 23 check (21 cần xác nhận); gate KB/profile/checklist: PASS/CONDITIONAL_PASS/CONDITIONAL_PASS
- **buy-box-with-store-credit** (P1) — Mua box bằng store credit Koin qua ticket và cart Function: 68 KB item, 30 check (26 cần xác nhận); gate KB/profile/checklist: PASS/CONDITIONAL_PASS/CONDITIONAL_PASS
- **order-cancellation-and-refund-sync** (P1) — Huỷ đơn và refund từ Shopify: 22 KB item, 13 check (10 cần xác nhận); gate KB/profile/checklist: PASS/CONDITIONAL_PASS/CONDITIONAL_PASS

## Tóm tắt knowledge

- KB item: 319 (CONFIRMED_EXPECTED 239 · INFERRED 67 · OBSERVED_CURRENT 13), trong đó 15 item mức object (`kb.json`).
- Known defect (OBSERVED_CURRENT + status KNOWN_DEFECT, chỉ dùng làm regression watch): 13.
- Item chỉ có trên nhánh build-staging (tag `staging-only`, INFERRED, không dùng làm hành vi production): 0.
- Checklist: 133 check, 98 có oracle STRONG.

## Trạng thái open questions

- CONFLICT (hai phía song song, chưa ngã ngũ): 4
- OPEN_ISSUE (known defect, vùng tài liệu chưa nói tới): 57
- NEEDS_CONFIRMATION (thiếu oracle đủ mạnh, chờ PO/Dev hoặc test_case PASS): 34
- Tổng: 95 — chi tiết trong `open-questions.md` của object này.

**Lưu ý về oracle:** toàn bộ KB của lần bootstrap này chỉ có nguồn `dev_doc` (tài liệu dev sinh từ source code). Theo luật C5, check P1 (tiền, billing, bốc thăm, refund, store credit, permission, xoá dữ liệu) có oracle STRONG nhưng chỉ dựa trên dev_doc vẫn giữ NEEDS_CONFIRMATION tới khi có `test_case` PASS — đây là kết quả đúng của bootstrap đầu, không phải thiếu sót.

## Nguồn & giới hạn

Toàn bộ knowledge của object này sinh từ bootstrap DOC_BOOTSTRAP đầu tiên (0 quan sát runtime: không có credential/portal/API access). Nguồn: bộ "Mysbox Product KB" v1 do dev viết từ source Mysbox (nhánh production và build-staging), ngày 2026-10-16, không kèm commit — nên `authored_on` của mọi item là 2026-10-16; KB này supersede được bởi CCR mới hơn. Nội dung gắn thẻ "chỉ có trên staging" trong tài liệu được giữ với tag `staging-only` và không được coi là hành vi production. Giá trị seed/minh hoạ (vd hạn mức gói Free 10 box/kỳ, giá gói ví dụ) không phải số production.
