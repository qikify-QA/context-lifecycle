# CBS-016__CLAIM-11 — evidence (đóng băng từ Proposal CBS-016, 2026-10-31)

**Strength:** S3

**Đánh giá:** S3 test_case: id + PASS + ngày chạy 2026-10-22 + build staging sau lần TIB-5606 giao QA cuối; đối chiếu Testlane TIB-230 (read-only 2026-10-31): actualResult khớp quote CCR 5.1 và đáp ứng phần expectedResult được nạp; status không dùng làm căn cứ. Test chạy trước khi PR #4044 merge (15:44) và production chưa kiểm → shipped UNKNOWN, cần OQ chạy lại sau merge/production. Mọi PASS trên font thay thế (Dancing Script/Roboto/Heebo), staging không có Carattere. Nâng item S1 KB-156 (CBS-008) — cùng phát biểu, nguồn mạnh hơn. Precondition/title của case là căn phải nhưng chạy căn giữa; expectedResult không khẳng định kiểu căn → S3 chỉ cho căn giữa.

## Dòng CCR (Phần 1a / 1b)

| `CLAIM-11` | TIB-5606 — Curve Text + rainbow (layer luôn căn giữa): Locate Artwork + Order Design đủ ký tự, đúng màu, khớp SDK preview (lệch ≤1px). KHÔNG claim fix cho curve căn phải | portal (Locate artwork) · api (Order Design PNG) | `test_case` — PASS TC-TIB-6651 2026-10-22 staging [AI] — build: staging @ 2026-10-22 14:20 — sau lần TIB-5606 giao QA cuối (2026-10-21 18:03); build hash: không rõ (QA không có quyền repo) | artwork / text-color-sequence-render | `UNKNOWN` |
| `CLAIM-11` | `artwork` | `text-color-sequence-render` | merchant/staff | portal · api | KB-146..KB-156 (chưa map từng id) |

## CCR 5.1 (nguyên văn)

### CLAIM-11

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** TC-TIB-6651
- **Link:** https://staging-portal.teeinblue.com/campaigns/3141/edit
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-22
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor [AI] (agent QA)
- **Trích nguyên văn:**
  ```
  "Lưu ý lệch case: layer Curve Text không có tuỳ chọn căn lề (luôn căn giữa), nên chạy với căn giữa, không dựng được
  căn phải. Kết quả: text uốn cong đủ 9 ký tự, đúng 3 màu, vị trí khớp SDK preview. Locate Artwork ink 564–836, Order
  Design PNG 564–835, SDK preview 565–836 (lệch ≤1px). SDK dùng textPath. Case này không chứng minh được fix cho curve
  căn phải; chưa biết bug có xảy ra với curve trước fix (Q6)."
  ```
- **File đính kèm cho claim này:** không có
