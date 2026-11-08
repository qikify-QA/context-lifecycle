# CBS-010__CLAIM-06

Strength: S3

## Dòng Phần 1a

| `CLAIM-06` | TIB-5496 — select-all trong modal tick mọi campaign tick được, bỏ qua campaign đang disable (N/N) (R3) | portal — modal Campaigns that use this product | `test_case` — PASS TC-TIB-5036 2026-10-09 staging [AI] — build: staging @ 2026-10-09 giờ không rõ — sau lần TIB-5496 giao QA cuối (2026-10-06); không có Fix Version; build hash: không rõ (QA không có quyền repo) | product-base — MỚI: variant-add-to-campaigns | ADD |

## Block 5.1 (nguyên văn CCR)

### CLAIM-06

- **Loại nguồn** (đúng 1): test_case
- **Locator:** TC-TIB-5036 (actualResult)
- **Link:** không có URL công khai — Testlane project proj-7082bc68-6228-4718-b22d-c8e6f95437ab, task TIB-169
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-09
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor (agent) [AI], QA chienct điều phối lượt chạy
- **Trích nguyên văn:**
  ```
  TC-TIB-5036: Bấm select-all: CP-K, CP-OFF, CP-0 được tick; CP-FULL (4/4, disabled) không tick; nút + Add enabled.
  ```
- **File đính kèm cho claim này:** screenshot đính trong actualResult trên Testlane


## Đánh giá

S3 test_case: TC-TIB-5036 PASS, chạy 2026-10-09 trên staging [AI], build staging sau lần giao QA cuối của TIB-5496 (2026-10-06); đối chiếu Testlane TIB-169 (read-only 2026-10-30): status passed và actualResult khớp nguyên văn CCR 5.1, không ghi Fail/Blocked, kiểm đúng hành vi claim. 4.1 'KHÔNG AI (PO/business)' không loại test_case (§12.3a, chủ repo chốt 2026-10-11). Phạm vi trang (25/trang) thuộc CLAIM-07 (S1), không nạp ở đây.
