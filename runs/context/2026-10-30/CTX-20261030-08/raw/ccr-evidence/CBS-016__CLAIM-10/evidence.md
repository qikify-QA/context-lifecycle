# CBS-016__CLAIM-10 — evidence (đóng băng từ Proposal CBS-016, 2026-10-31)

**Strength:** S3

**Đánh giá:** S3 test_case: id + PASS + ngày chạy 2026-10-22 + build staging sau lần TIB-5606 giao QA cuối; đối chiếu Testlane TIB-230 (read-only 2026-10-31): actualResult khớp quote CCR 5.1 và đáp ứng phần expectedResult được nạp; status không dùng làm căn cứ. Test chạy trước khi PR #4044 merge (15:44) và production chưa kiểm → shipped UNKNOWN, cần OQ chạy lại sau merge/production. Mọi PASS trên font thay thế (Dancing Script/Roboto/Heebo), staging không có Carattere. Nâng item S1 KB-155 (CBS-008) — cùng phát biểu, nguồn mạnh hơn.

## Dòng CCR (Phần 1a / 1b)

| `CLAIM-10` | TIB-5606 — rainbow + RTL (cờ "Right to Left text"), căn phải: đủ ký tự, hướng phải sang trái, màu từng chữ cùng thứ tự SDK preview (lệch ≤1px) | api (Order Design PNG) · storefront (SDK preview) | `test_case` — PASS TC-TIB-6650 2026-10-22 staging [AI] — build: staging @ 2026-10-22 14:20 — sau lần TIB-5606 giao QA cuối (2026-10-21 18:03); build hash: không rõ (QA không có quyền repo) | artwork / text-color-sequence-render | `UNKNOWN` |
| `CLAIM-10` | `artwork` | `text-color-sequence-render` | merchant/staff · buyer | api · storefront | KB-146..KB-156 (chưa map từng id) |

## CCR 5.1 (nguyên văn)

### CLAIM-10

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** TC-TIB-6650
- **Link:** https://staging-portal.teeinblue.com/campaigns/3140/edit
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-22
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor [AI] (agent QA)
- **Trích nguyên văn:**
  ```
  "Rainbow + RTL (font Heebo, cờ "Right to Left text" bật), text "שלום עולם": đủ 9 ký tự, hướng phải sang trái, màu từng
  chữ cùng thứ tự với SDK preview (4 màu), căn phải đúng. Order Design PNG ink 519–903, SDK preview 520–902 (lệch ≤1px)."
  ```
- **File đính kèm cho claim này:** không có
