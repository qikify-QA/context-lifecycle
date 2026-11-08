# CBS-016__CLAIM-01 — evidence (đóng băng từ Proposal CBS-016, 2026-10-31)

**Strength:** S3

**Đánh giá:** S3 test_case: id + PASS + ngày chạy 2026-10-22 + build staging sau lần TIB-5606 giao QA cuối; đối chiếu Testlane TIB-230 (read-only 2026-10-31): actualResult khớp quote CCR 5.1 và đáp ứng phần expectedResult được nạp; status không dùng làm căn cứ. Test chạy trước khi PR #4044 merge (15:44) và production chưa kiểm → shipped UNKNOWN, cần OQ chạy lại sau merge/production. Mọi PASS trên font thay thế (Dancing Script/Roboto/Heebo), staging không có Carattere. Nâng item S1 KB-146 (CBS-008) — cùng phát biểu, nguồn mạnh hơn.

## Dòng CCR (Phần 1a / 1b)

| `CLAIM-01` | TIB-5606 — rainbow Single-line, font script, stroke 1 lớp, căn phải: Locate Artwork và Order Design PNG hiện đủ ký tự, chữ nối liền, mép phải trong printarea, khớp SDK preview (lệch ≤1px) | portal (Campaign editor → Locate artwork) · api (PNG renderer Order Design) | `test_case` — PASS TC-TIB-6638 2026-10-22 staging [AI]; PASS TC-TIB-6639 2026-10-22 staging [AI] — build: staging @ 2026-10-22 14:20 — sau lần TIB-5606 giao QA cuối (2026-10-21 18:03); Jira Passed 2026-10-22 15:40, Done 2026-10-22 16:26; build hash: không rõ (QA không có quyền repo) | artwork / text-color-sequence-render (KB-146..KB-156, chưa map được từng id) | `UNKNOWN` |
| `CLAIM-01` | `artwork` | `text-color-sequence-render` | merchant/staff (Locate artwork, Order Design) | portal · api | KB-146..KB-156 (canon v7, bản clone chưa có — chưa map từng id) |

## CCR 5.1 (nguyên văn)

### CLAIM-01

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** TC-TIB-6638 · TC-TIB-6639 (Testlane task TIB-230)
- **Link:** https://staging-portal.teeinblue.com/orders/4762 (order #1105) · https://staging-portal.teeinblue.com/campaigns/3129/edit
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-22
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor [AI] (agent QA), lượt chạy của QA chienct
- **Trích nguyên văn:**
  ```
  TC-TIB-6638: "Locate Artwork hiển thị đủ 9 ký tự "Elizabeth", màu đỏ/xanh/vàng lặp lại, chữ nối liền; mép phải chữ "h"
  ở x=913/1400 nên nằm trong printarea. Đo ink bbox: Locate 623–913, Order Design PNG 624–912, SDK preview 624–913
  (lệch ≤1px). Pass trên Dancing Script, chưa kiểm được trên Carattere (staging không có font)."
  TC-TIB-6639: "Order #1105 (Bogus gateway, 14 line item): Order Design PNG của CP-5606-SCRIPT đủ 9 ký tự "Elizabeth",
  đúng màu từng chữ, stroke đen đầy đủ, căn phải, không tràn mép. Ink bbox PNG 624–912 (w=288) so với SDK preview
  624–913 (w=289). Pass trên Dancing Script, chưa kiểm được trên Carattere."
  ```
- **File đính kèm cho claim này:** không có (ảnh nằm trong actualResult Testlane)
