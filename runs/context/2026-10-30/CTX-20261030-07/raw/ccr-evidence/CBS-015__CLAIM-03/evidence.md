# CBS-015__CLAIM-03 — evidence (đóng băng từ Proposal CBS-015, 2026-10-30)

**Strength:** S3

**Đánh giá:** S3 test_case: id + PASS + ngày chạy 2026-10-29 + build staging sau mốc TIB-5633 giao QA cuối (2026-10-29 10:08 +07; case import 11:45 +07); đối chiếu Testlane TIB-268 (read-only 2026-10-30): actualResult khớp nguyên văn CCR 5.1 và đáp ứng phần expectedResult được nạp; status không dùng làm căn cứ. CONFIRMED chỉ phủ phần định tính expectedResult khẳng định; ngưỡng thời gian 1–2 phút (từ đáp án Slack RA tóm tắt, CCR 4.2(1)) và mọi số đo giây tách S1. TC-7617 + TC-7618 expectedResult: phần shadow tràn / layer xoay hiển thị đầy đủ, không bị cắt (canvas grow). Fixture chỉ 4 layer (không phải ~250 như precondition) và shadow offset ±120 blur 60 (khác 10/10 blur 15 của test data) → CONFIRMED chỉ cho group nhỏ; grow-path với ~250 layer chưa kiểm.

## Dòng CCR (Phần 1a / 1b)

| `CLAIM-03` | TIB-5633 — Layer con có shadow hoặc xoay tràn box trong group: design vẫn hiện đủ shadow / layer xoay, đúng hướng và vị trí tương đối; phần vượt printarea bị clip theo printarea (fixture 4 layer, ~57s) | api (design PNG) | `test_case` — PASS TC-TIB-7617, TC-TIB-7618, TC-TIB-7620 2026-10-29 staging [AI] — build: staging @ 2026-10-29 13:35–14:34 +07 — sau lần TIB-5633 giao QA cuối (2026-10-29 10:08 +07); build hash: không rõ (QA không có quyền repo) | artwork / MỚI: group-layer-order-design-render; chưa rõ có ảnh hưởng checklist layer-common-config (shadow/rotation) không, cần agent tự đánh giá | `ADD` |
| `CLAIM-03` | artwork | MỚI: group-layer-order-design-render | merchant | api | không có |

## CCR 5.1 (nguyên văn)

- **Loại nguồn** (đúng 1): test_case
- **Locator:** TC-TIB-7617, TC-TIB-7618, TC-TIB-7620
- **Link:** https://staging-portal.teeinblue.com/orders/4839 · https://staging-portal.teeinblue.com/artworks?id=6066
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-29
- **Người viết / người xác nhận:** test-executor [AI] (QA agent)
- **Trích nguyên văn:**
  ```
  TC-TIB-7617: "Lưu ý: artwork #6066 chỉ có 4 layer trong group (không phải 250) nên phần thời gian chỉ mang tính tham khảo. Generate ~57s (02:37:50 -> 02:38:47), đạt ngưỡng. Design 12000x6000: shadow (offset ±120, blur 60) của các layer sát mép hiển thị mềm, không bị cắt cứng trong vùng in; phần shadow vượt ra ngoài vùng in bị clip theo printarea (đúng kỳ vọng vì output cố định theo printarea)."
  TC-TIB-7618: "Lưu ý: artwork #6066 chỉ có 4 layer (không phải 250). Generate ~57s, đạt ngưỡng. Layer xoay 30°/-20° hiển thị đầy đủ, không mất góc/cạnh trong vùng in."
  TC-TIB-7620: "Trên design output, shadow nằm đúng hướng/vị trí so với layer gốc (layer trên: shadow lệch lên-trái; layer phải: shadow lệch phải-dưới), không dịch bất thường. Chưa có bản trước fix để đối chiếu pixel, kiểm tra bằng mắt theo offset khai báo."
  ```
- **File đính kèm cho claim này:** ảnh trong actualResult của TC-TIB-7617 trên Testlane
