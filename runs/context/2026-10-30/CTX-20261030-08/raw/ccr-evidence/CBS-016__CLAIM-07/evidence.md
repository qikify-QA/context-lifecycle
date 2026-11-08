# CBS-016__CLAIM-07 — evidence (đóng băng từ Proposal CBS-016, 2026-10-31)

**Strength:** S3

**Đánh giá:** S3 test_case: id + PASS + ngày chạy 2026-10-22 + build staging sau lần TIB-5606 giao QA cuối; đối chiếu Testlane TIB-230 (read-only 2026-10-31): actualResult khớp quote CCR 5.1 và đáp ứng phần expectedResult được nạp; status không dùng làm căn cứ. Test chạy trước khi PR #4044 merge (15:44) và production chưa kiểm → shipped UNKNOWN, cần OQ chạy lại sau merge/production. Mọi PASS trên font thay thế (Dancing Script/Roboto/Heebo), staging không có Carattere. Nâng item S1 KB-151, KB-152 (CBS-008) — cùng phát biểu, nguồn mạnh hơn.

## Dòng CCR (Phần 1a / 1b)

| `CLAIM-07` | TIB-5606 — phép đo theo run tính letter spacing (cả 3 kiểu căn) và kerning (cặp AV, Wa, To): khớp SDK preview, căn phải không mất ký tự cuối | api (Order Design PNG) · portal (Locate artwork) | `test_case` — PASS TC-TIB-6646 2026-10-22 staging [AI]; PASS TC-TIB-6647 2026-10-22 staging [AI] — build: staging @ 2026-10-22 14:20 — sau lần TIB-5606 giao QA cuối (2026-10-21 18:03); build hash: không rõ (QA không có quyền repo) | artwork / text-color-sequence-render | `UNKNOWN` |
| `CLAIM-07` | `artwork` | `text-color-sequence-render` | merchant/staff | api · portal | KB-146..KB-156 (chưa map từng id) |

## CCR 5.1 (nguyên văn)

### CLAIM-07

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** TC-TIB-6646 · TC-TIB-6647
- **Link:** https://staging-portal.teeinblue.com/orders/4762
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-22
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor [AI] (agent QA)
- **Trích nguyên văn:**
  ```
  TC-TIB-6646: "Letter spacing ≠ 0, cả 3 kiểu căn, cùng order #1105 (3 line item). Đủ 9 ký tự, căn phải không mất "h".
  Ink PNG / SDK / Locate: Phải 620–912 / 620–913 / 620–913; Giữa 554–846 / 554–847 / 554–847; Trái 488–780 / 488–780 /
  488–781. Độ rộng ≈292–293px, lớn hơn bản không spacing (288px) nên spacing đã được áp dụng ở cả SDK và PNG"
  TC-TIB-6647: "Font Roboto rainbow căn phải, text "AVATAR Wave To": đủ 14 ký tự (4 màu lặp), các cặp AV, Wa, To sát
  nhau đúng như SDK preview (có kerning). Order Design PNG ink 494–906, SDK preview 493–906 (lệch ≤1px)."
  ```
- **File đính kèm cho claim này:** không có
