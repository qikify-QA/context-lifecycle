# CBS-015__CLAIM-08 — evidence (đóng băng từ Proposal CBS-015, 2026-10-30)

**Strength:** S3

**Đánh giá:** S3 test_case: id + PASS + ngày chạy 2026-10-29 + build staging sau mốc TIB-5633 giao QA cuối (2026-10-29 10:08 +07; case import 11:45 +07); đối chiếu Testlane TIB-268 (read-only 2026-10-30): actualResult khớp nguyên văn CCR 5.1 và đáp ứng phần expectedResult được nạp; status không dùng làm căn cứ. CONFIRMED chỉ phủ phần định tính expectedResult khẳng định; ngưỡng thời gian 1–2 phút (từ đáp án Slack RA tóm tắt, CCR 4.2(1)) và mọi số đo giây tách S1. TC-7625 expectedResult: layer con ẩn/hiện đúng trong group sau fix renderer. Fixture: 20 layer con tắt cờ visible của chính nó trong group đang hiện (không phải Group cha ẩn, không phải điều kiện) → CONFIRMED chỉ cho trường hợp đó. Không trùng CBS-006 (KB-182: Group ẩn, PNG/PDF, TC-TIB-6068/6069) — khác hành vi và khác nguồn; dedup tự so plan CTX-20261030-01 (order/sdk/artwork) không thấy claim cùng nội dung.

## Dòng CCR (Phần 1a / 1b)

| `CLAIM-08` | TIB-5633 — Cascade visibility trong group không đổi sau fix: 20 layer con tắt mắt thì vắng đúng 20 ô, 0 pixel dư; generate ~45s | api (design PNG) | `test_case` — PASS TC-TIB-7625 2026-10-29 staging [AI] — build: staging @ 2026-10-29 13:35–14:34 +07 — sau lần TIB-5633 giao QA cuối (2026-10-29 10:08 +07); build hash: không rõ (QA không có quyền repo) | artwork / MỚI: group-layer-order-design-render; context local artwork.md → Group cascade visibility (TIB-5584) | `ADD` |
| `CLAIM-08` | artwork | MỚI: group-layer-order-design-render | merchant | api | không có |

## CCR 5.1 (nguyên văn)

- **Loại nguồn** (đúng 1): test_case
- **Locator:** TC-TIB-7625
- **Link:** https://staging-portal.teeinblue.com/orders/4843 · https://staging-portal.teeinblue.com/artworks?id=6070
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-29
- **Người viết / người xác nhận:** test-executor [AI] (QA agent)
- **Trích nguyên văn:**
  ```
  TC-TIB-7625: "Order #1131 (orders/4843), item #7665: generate ~45 giây (03:26:16 -> 03:27:01, Ready 03:27:05), dưới ngưỡng. So với PNG #1125 (250 ô): đúng 20 ô vắng mặt = 20 ô đầu của hàng trên cùng (x 93-9502, 20 cột pitch 480, y 102-499), mỗi ô mất 100.294 px (tổng 2.005.880 px); 0 pixel dư ngoài các ô đó, 230 ô còn lại hiển thị (còn lại chỉ khác viền antialias như ở case lồng nhóm)."
  ```
- **File đính kèm cho claim này:** ảnh trong actualResult của TC-TIB-7625 trên Testlane
