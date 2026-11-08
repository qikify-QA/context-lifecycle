# CBS-016__CLAIM-06 — evidence (đóng băng từ Proposal CBS-016, 2026-10-31)

**Strength:** S3

**Đánh giá:** S3 test_case: id + PASS + ngày chạy 2026-10-22 + build staging sau lần TIB-5606 giao QA cuối; đối chiếu Testlane TIB-230 (read-only 2026-10-31): actualResult khớp quote CCR 5.1 và đáp ứng phần expectedResult được nạp; status không dùng làm căn cứ. Test chạy trước khi PR #4044 merge (15:44) và production chưa kiểm → shipped UNKNOWN, cần OQ chạy lại sau merge/production. Mọi PASS trên font thay thế (Dancing Script/Roboto/Heebo), staging không có Carattere. Nâng item S1 KB-150 (CBS-008) — cùng phát biểu, nguồn mạnh hơn.

## Dòng CCR (Phần 1a / 1b)

| `CLAIM-06` | TIB-5606 — rainbow font thường (Roboto) và text 1 màu font script, căn phải: đủ ký tự, khớp SDK preview (lệch ≤2px). KHÔNG claim "không đổi so với trước fix" (không có baseline) | api (Order Design PNG) · portal (Locate artwork) | `test_case` — PASS TC-TIB-6644 2026-10-22 staging [AI]; PASS TC-TIB-6645 2026-10-22 staging [AI] — build: staging @ 2026-10-22 14:20 — sau lần TIB-5606 giao QA cuối (2026-10-21 18:03); build hash: không rõ (QA không có quyền repo) | artwork / text-color-sequence-render | `UNKNOWN` |
| `CLAIM-06` | `artwork` | `text-color-sequence-render` | merchant/staff | api · portal | KB-146..KB-156 (chưa map từng id) |

## CCR 5.1 (nguyên văn)

### CLAIM-06

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** TC-TIB-6644 · TC-TIB-6645
- **Link:** https://staging-portal.teeinblue.com/campaigns/3134/edit · https://staging-portal.teeinblue.com/campaigns/3133/edit
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-22
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor [AI] (agent QA)
- **Trích nguyên văn:**
  ```
  TC-TIB-6644: "Font Roboto + rainbow căn phải: đủ 9 ký tự, 3 màu. Order Design PNG ink 560–905, SDK preview 558–904,
  Locate Artwork 558–904 (lệch ≤2px). Không có baseline trước fix để so."
  TC-TIB-6645: "Text 1 màu (đỏ), font script, căn phải: đủ 9 ký tự, Order Design PNG ink 624–912, SDK preview 624–913
  (lệch ≤1px), cùng cỡ chữ. Không có baseline trước deploy để so, chỉ đối chiếu SDK."
  ```
- **File đính kèm cho claim này:** không có
