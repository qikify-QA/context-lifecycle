# CBS-016__CLAIM-08 — evidence (đóng băng từ Proposal CBS-016, 2026-10-31)

**Strength:** S3

**Đánh giá:** S3 test_case: id + PASS + ngày chạy 2026-10-22 + build staging sau lần TIB-5606 giao QA cuối; đối chiếu Testlane TIB-230 (read-only 2026-10-31): actualResult khớp quote CCR 5.1 và đáp ứng phần expectedResult được nạp; status không dùng làm căn cứ. Test chạy trước khi PR #4044 merge (15:44) và production chưa kiểm → shipped UNKNOWN, cần OQ chạy lại sau merge/production. Mọi PASS trên font thay thế (Dancing Script/Roboto/Heebo), staging không có Carattere. Nâng item S1 KB-153 (CBS-008) — cùng phát biểu, nguồn mạnh hơn. Đánh giá bằng mắt của agent (phóng 500%).

## Dòng CCR (Phần 1a / 1b)

| `CLAIM-08` | TIB-5606 — rainbow + stroke 1 lớp, font script: stroke bám theo từng chữ, liền mạch, không hở/chồng ở chỗ đổi màu (Order Design PNG) | api (Order Design PNG) | `test_case` — PASS TC-TIB-6648 2026-10-22 staging [AI] — build: staging @ 2026-10-22 14:20 — sau lần TIB-5606 giao QA cuối (2026-10-21 18:03); build hash: không rõ (QA không có quyền repo) | artwork / text-color-sequence-render; text-multi-stroke | `UNKNOWN` |
| `CLAIM-08` | `artwork` | `text-color-sequence-render` | merchant/staff | api | KB-146..KB-156 (chưa map từng id) |

## CCR 5.1 (nguyên văn)

### CLAIM-08

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** TC-TIB-6648
- **Link:** https://staging-portal.teeinblue.com/orders/4762
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-22
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor [AI] (agent QA)
- **Trích nguyên văn:**
  ```
  "Dùng lại order #1105 của CP-5606-SCRIPT. Phóng 500% vùng nối giữa các chữ (E-l-i-z-a-b): stroke đen bám theo từng
  chữ, liền mạch, không hở và không chồng ở chỗ đổi màu; giống SDK preview. Pass trên Dancing Script, chưa kiểm được
  trên Carattere."
  ```
- **File đính kèm cho claim này:** không có
