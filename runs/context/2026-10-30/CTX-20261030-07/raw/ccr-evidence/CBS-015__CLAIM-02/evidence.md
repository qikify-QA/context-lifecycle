# CBS-015__CLAIM-02 — evidence (đóng băng từ Proposal CBS-015, 2026-10-30)

**Strength:** S3

**Đánh giá:** S3 test_case: id + PASS + ngày chạy 2026-10-29 + build staging sau mốc TIB-5633 giao QA cuối (2026-10-29 10:08 +07; case import 11:45 +07); đối chiếu Testlane TIB-268 (read-only 2026-10-30): actualResult khớp nguyên văn CCR 5.1 và đáp ứng phần expectedResult được nạp; status không dùng làm căn cứ. CONFIRMED chỉ phủ phần định tính expectedResult khẳng định; ngưỡng thời gian 1–2 phút (từ đáp án Slack RA tóm tắt, CCR 4.2(1)) và mọi số đo giây tách S1. TC-7615 expectedResult: output group giống hệt ungroup (vị trí, kích thước, pixel, không viền trong suốt giữa layer liền kề) — actual 0 pixel khác, max channel diff 0. Một cặp fixture (#6064/#6065).

## Dòng CCR (Phần 1a / 1b)

| `CLAIM-02` | TIB-5633 — Design PNG của group giống hệt bản ungroup cùng layer (0 pixel khác trên 12000x6000, cùng 2.510.071 byte) | api (file design PNG) | `test_case` — PASS TC-TIB-7615 2026-10-29 staging [AI] — build: staging @ 2026-10-29 13:35–14:34 +07 — sau lần TIB-5633 giao QA cuối (2026-10-29 10:08 +07); build hash: không rõ (QA không có quyền repo) | artwork / MỚI: group-layer-order-design-render | `ADD` |
| `CLAIM-02` | artwork | MỚI: group-layer-order-design-render | merchant | api | không có |

## CCR 5.1 (nguyên văn)

- **Loại nguồn** (đúng 1): test_case
- **Locator:** TC-TIB-7615
- **Link:** https://staging-portal.teeinblue.com/orders/4837 · https://staging-portal.teeinblue.com/orders/4838
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-29
- **Người viết / người xác nhận:** test-executor [AI] (QA agent)
- **Trích nguyên văn:**
  ```
  TC-TIB-7615: "So sánh pixel 2 design PNG (12000x6000, 72.000.000 px, đọc bằng canvas ImageData): artwork #6064 (group) vs #6065 (ungroup) cho kết quả 0 pixel khác biệt (max channel diff = 0), cùng kích thước file 2.510.071 byte. Thời gian generate: group ~50s, ungroup ~39s."
  ```
- **File đính kèm cho claim này:** không có
