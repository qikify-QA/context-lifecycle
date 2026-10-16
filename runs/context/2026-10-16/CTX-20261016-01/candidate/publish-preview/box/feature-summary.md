# Box (mystery box = 1 variant Shopify): loại box Single/Bundle/Group-Tier, phần thưởng + xác suất, tạo/publish/xoá, version bất biến, tồn kho/pool, picking mode, pool refill
**Published context version:** 1

**Product:** mysbox · **Object:** `box` · **Mode:** DOC_BOOTSTRAP · **Environment:** documented · **Published:** 2026-10-16

## Features

- **box-type-and-prize-setup** (P1) — Chọn loại box và khai phần thưởng, xác suất, tier: 53 KB item, 24 check (11 cần xác nhận); gate KB/profile/checklist: PASS/CONDITIONAL_PASS/PASS
- **box-create-and-publish** (P2) — Tạo box, Draft/Active, publish, unpublish, xoá: 80 KB item, 41 check (8 cần xác nhận); gate KB/profile/checklist: PASS/CONDITIONAL_PASS/PASS
- **box-versioning** (P1) — Box version bất biến — đơn giữ cấu hình lúc mua: 43 KB item, 17 check (9 cần xác nhận); gate KB/profile/checklist: PASS/CONDITIONAL_PASS/PASS
- **inventory-and-sold-out** (P1) — Tồn kho tracked/untracked, pool, sold-out và hiển thị tồn kho: 80 KB item, 38 check (22 cần xác nhận); gate KB/profile/checklist: PASS/CONDITIONAL_PASS/CONDITIONAL_PASS
- **picking-modes** (P1) — Picking mode — cách bốc item (simple, unique in order, unique across pools, group draw/pool/shared/independent): 50 KB item, 24 check (19 cần xác nhận); gate KB/profile/checklist: PASS/CONDITIONAL_PASS/CONDITIONAL_PASS
- **pool-refill** (P1) — Pool refill — trả món đã resell về pool (AUTO/MANUAL): 52 KB item, 21 check (17 cần xác nhận); gate KB/profile/checklist: PASS/CONDITIONAL_PASS/CONDITIONAL_PASS

## Tóm tắt knowledge

- KB item: 376 (CONFIRMED_EXPECTED 300 · INFERRED 68 · OBSERVED_CURRENT 8), trong đó 18 item mức object (`kb.json`).
- Known defect (OBSERVED_CURRENT + status KNOWN_DEFECT, chỉ dùng làm regression watch): 8.
- Item chỉ có trên nhánh build-staging (tag `staging-only`, INFERRED, không dùng làm hành vi production): 21.
- Checklist: 165 check, 132 có oracle STRONG.

## Trạng thái open questions

- CONFLICT (hai phía song song, chưa ngã ngũ): 6
- OPEN_ISSUE (known defect, vùng tài liệu chưa nói tới): 50
- NEEDS_CONFIRMATION (thiếu oracle đủ mạnh, chờ PO/Dev hoặc test_case PASS): 34
- Tổng: 90 — chi tiết trong `open-questions.md` của object này.

**Lưu ý về oracle:** toàn bộ KB của lần bootstrap này chỉ có nguồn `dev_doc` (tài liệu dev sinh từ source code). Theo luật C5, check P1 (tiền, billing, bốc thăm, refund, store credit, permission, xoá dữ liệu) có oracle STRONG nhưng chỉ dựa trên dev_doc vẫn giữ NEEDS_CONFIRMATION tới khi có `test_case` PASS — đây là kết quả đúng của bootstrap đầu, không phải thiếu sót.

## Nguồn & giới hạn

Toàn bộ knowledge của object này sinh từ bootstrap DOC_BOOTSTRAP đầu tiên (0 quan sát runtime: không có credential/portal/API access). Nguồn: bộ "Mysbox Product KB" v1 do dev viết từ source Mysbox (nhánh production và build-staging), ngày 2026-10-16, không kèm commit — nên `authored_on` của mọi item là 2026-10-16; KB này supersede được bởi CCR mới hơn. Nội dung gắn thẻ "chỉ có trên staging" trong tài liệu được giữ với tag `staging-only` và không được coi là hành vi production. Giá trị seed/minh hoạ (vd hạn mức gói Free 10 box/kỳ, giá gói ví dụ) không phải số production.
