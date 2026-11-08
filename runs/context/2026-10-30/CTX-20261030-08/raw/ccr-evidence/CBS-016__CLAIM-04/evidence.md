# CBS-016__CLAIM-04 — evidence (đóng băng từ Proposal CBS-016, 2026-10-31)

**Strength:** S3

**Đánh giá:** S3 test_case: id + PASS + ngày chạy 2026-10-22 + build staging sau lần TIB-5606 giao QA cuối; đối chiếu Testlane TIB-230 (read-only 2026-10-31): actualResult khớp quote CCR 5.1 và đáp ứng phần expectedResult được nạp; status không dùng làm căn cứ. Test chạy trước khi PR #4044 merge (15:44) và production chưa kiểm → shipped UNKNOWN, cần OQ chạy lại sau merge/production. Mọi PASS trên font thay thế (Dancing Script/Roboto/Heebo), staging không có Carattere. Nâng item S1 KB-148 (CBS-008) — cùng phát biểu, nguồn mạnh hơn.

## Dòng CCR (Phần 1a / 1b)

| `CLAIM-04` | TIB-5606 — text rainbow rộng đúng bằng cùng text đó ở 1 màu (Order Design PNG chênh 0px, Locate Artwork mép phải trùng) | api (Order Design PNG) · portal (Locate artwork) | `test_case` — PASS TC-TIB-6642 2026-10-22 staging [AI] — build: staging @ 2026-10-22 14:20 — sau lần TIB-5606 giao QA cuối (2026-10-21 18:03); build hash: không rõ (QA không có quyền repo) | artwork / text-color-sequence-render | `UNKNOWN` |
| `CLAIM-04` | `artwork` | `text-color-sequence-render` | merchant/staff | api · portal | KB-146..KB-156 (chưa map từng id) |

## CCR 5.1 (nguyên văn)

### CLAIM-04

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** TC-TIB-6642
- **Link:** https://staging-portal.teeinblue.com/orders/4762
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-22
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor [AI] (agent QA)
- **Trích nguyên văn:**
  ```
  "Cùng order #1105, 2 line item text "Elizabeth": Order Design PNG rainbow (SCRIPT) ink 624–912, w=288; text 1 màu
  (SOLID) ink 624–912, w=288; chênh 0px (ngưỡng ≤2px), chỉ khác màu chữ. Locate Artwork: SCRIPT 623–913, SOLID 623–913,
  mép phải trùng nhau."
  ```
- **File đính kèm cho claim này:** không có
