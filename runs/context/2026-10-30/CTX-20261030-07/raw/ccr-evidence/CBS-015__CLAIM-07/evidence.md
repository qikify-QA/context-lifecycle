# CBS-015__CLAIM-07 — evidence (đóng băng từ Proposal CBS-015, 2026-10-30)

**Strength:** S3

**Đánh giá:** S3 test_case: id + PASS + ngày chạy 2026-10-29 + build staging sau mốc TIB-5633 giao QA cuối (2026-10-29 10:08 +07; case import 11:45 +07); đối chiếu Testlane TIB-268 (read-only 2026-10-30): actualResult khớp nguyên văn CCR 5.1 và đáp ứng phần expectedResult được nạp; status không dùng làm căn cứ. CONFIRMED chỉ phủ phần định tính expectedResult khẳng định; ngưỡng thời gian 1–2 phút (từ đáp án Slack RA tóm tắt, CCR 4.2(1)) và mọi số đo giây tách S1. TC-7623 expectedResult: group lồng nhau render đúng vị trí tương đối, không lỗi layout. Fixture Parent > 'Pattern 250' > 250 layer (không phải 100+150 chia 2 cấp như test data) → CONFIRMED chỉ cho cấu trúc 1 group con chứa toàn bộ layer.

## Dòng CCR (Phần 1a / 1b)

| `CLAIM-07` | TIB-5633 — Group lồng nhau (cha > con > 250 layer): generate ~47s, không layer nào dịch chỗ so với group phẳng (chỉ khác viền antialias do fixture) | api (design PNG) | `test_case` — PASS TC-TIB-7623 2026-10-29 staging [AI] — build: staging @ 2026-10-29 13:35–14:34 +07 — sau lần TIB-5633 giao QA cuối (2026-10-29 10:08 +07); build hash: không rõ (QA không có quyền repo) | artwork / MỚI: group-layer-order-design-render | `ADD` |
| `CLAIM-07` | artwork | MỚI: group-layer-order-design-render | merchant | api | không có |

## CCR 5.1 (nguyên văn)

- **Loại nguồn** (đúng 1): test_case
- **Locator:** TC-TIB-7623
- **Link:** https://staging-portal.teeinblue.com/orders/4842 · https://staging-portal.teeinblue.com/artworks?id=6069
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-29
- **Người viết / người xác nhận:** test-executor [AI] (QA agent)
- **Trích nguyên văn:**
  ```
  TC-TIB-7623: "Order #1130 (orders/4842), item #7664: generate ~47 giây (03:25:30 -> 03:26:17, Ready 03:26:19), dưới ngưỡng. Cấu trúc fixture: Parent > "Pattern 250" > 250 layer (tổng 250 con, không phải 100+150 như case). So với design group phẳng #1125 (artwork #6064): số pixel hiển thị bằng nhau (25.073.500), không có layer nào dịch chỗ; chỉ khác ~541.250 pixel (~2.165 pixel/ô) ở rìa antialias của từng ô (max chênh kênh 128), phân bố đều và cũng xuất hiện ở fixture group phẳng #6070 nên là chênh lệch do fixture dựng khác bản gốc, không phải lỗi lồng nhóm."
  ```
- **File đính kèm cho claim này:** ảnh trong actualResult của TC-TIB-7623 trên Testlane
