# CBS-016__CLAIM-05 — evidence (đóng băng từ Proposal CBS-016, 2026-10-31)

**Strength:** S3

**Đánh giá:** S3 test_case: id + PASS + ngày chạy 2026-10-22 + build staging sau lần TIB-5606 giao QA cuối; đối chiếu Testlane TIB-230 (read-only 2026-10-31): actualResult khớp quote CCR 5.1 và đáp ứng phần expectedResult được nạp; status không dùng làm căn cứ. Test chạy trước khi PR #4044 merge (15:44) và production chưa kiểm → shipped UNKNOWN, cần OQ chạy lại sau merge/production. Mọi PASS trên font thay thế (Dancing Script/Roboto/Heebo), staging không có Carattere. Nâng item S1 KB-149 (CBS-008) — cùng phát biểu, nguồn mạnh hơn. Thu hẹp: actualResult tự mâu thuẫn ở vế 'không nhỏ hơn SDK' (PNG 495–910 w=415 HẸP hơn SDK 493–910 w=417 2px; chiều cao đo bằng 2 ngưỡng khác nhau) → vế 'cỡ chữ/độ rộng bằng SDK, không nhỏ hơn' KHÔNG S3.

## Dòng CCR (Phần 1a / 1b)

| `CLAIM-05` | TIB-5606 — rainbow tên dài (32 ký tự) kích hoạt autoscale: co vừa printarea, đủ ký tự, độ rộng không nhỏ hơn SDK preview (chênh 2px) | api (Order Design PNG) · storefront (SDK preview) | `test_case` — PASS TC-TIB-6643 2026-10-22 staging [AI] — build: staging @ 2026-10-22 14:20 — sau lần TIB-5606 giao QA cuối (2026-10-21 18:03); build hash: không rõ (QA không có quyền repo) | artwork / text-color-sequence-render | `UNKNOWN` |
| `CLAIM-05` | `artwork` | `text-color-sequence-render` | merchant/staff · buyer (SDK preview đối chiếu) | api · storefront | KB-146..KB-156 (chưa map từng id) |

## CCR 5.1 (nguyên văn)

### CLAIM-05

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** TC-TIB-6643
- **Link:** https://staging-portal.teeinblue.com/orders/4762
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-22
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor [AI] (agent QA)
- **Trích nguyên văn:**
  ```
  "Text 32 ký tự "Elizabeth Alexandra Mary Windsor" autoscale co lại vừa printarea, đủ 32 ký tự, căn phải. Order Design
  PNG ink 495–910 (w=415), SDK preview 493–910 (w=417): chênh 2px, không nhỏ hơn SDK."
  ```
- **File đính kèm cho claim này:** không có
