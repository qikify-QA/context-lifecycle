# CBS-010__CLAIM-05

Strength: S3

## Dòng Phần 1a

| `CLAIM-05` | TIB-5496 — ma trận K/N trong modal: campaign 0/N và K/N (K<N) tick được; campaign N/N toàn Available bị disable; "+ Add" disable tới khi tick ít nhất 1 campaign và disable lại khi bỏ hết tick (R1, R2, R4) | portal — modal Campaigns that use this product | `test_case` — PASS TC-TIB-5032 2026-10-09 staging [AI]; PASS TC-TIB-5033 2026-10-09 staging [AI]; PASS TC-TIB-5034 2026-10-09 staging [AI]; PASS TC-TIB-5038 2026-10-09 staging [AI] — build: staging @ 2026-10-09 giờ không rõ — sau lần TIB-5496 giao QA cuối (2026-10-06); không có Fix Version; build hash: không rõ (QA không có quyền repo) | product-base — MỚI: variant-add-to-campaigns | ADD |

## Block 5.1 (nguyên văn CCR)

### CLAIM-05

- **Loại nguồn** (đúng 1): test_case
- **Locator:** TC-TIB-5032 · TC-TIB-5033 · TC-TIB-5034 · TC-TIB-5038 (actualResult)
- **Link:** không có URL công khai — Testlane project proj-7082bc68-6228-4718-b22d-c8e6f95437ab, task TIB-169
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-09
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor (agent) [AI], QA chienct điều phối lượt chạy
- **Trích nguyên văn:**
  ```
  TC-TIB-5032: CP-0 hiển thị 0/4 available, checkbox không bị disable, tick được; sau khi tick nút + Add chuyển từ disabled sang enabled.
  TC-TIB-5033: CP-K hiển thị 2/4 available, checkbox enabled, tick được và nút + Add enabled.
  TC-TIB-5034: CP-FULL hiển thị 4/4 available, checkbox disabled, không tick được (kể cả khi thử check).
  TC-TIB-5038: Chưa tick: + Add disabled; tick CP-0: enabled; bỏ tick CP-0: disabled trở lại.
  ```
- **File đính kèm cho claim này:** screenshot đính trong actualResult của 4 case trên Testlane


## Đánh giá

S3 test_case: TC-TIB-5032, TC-TIB-5033, TC-TIB-5034, TC-TIB-5038 PASS, chạy 2026-10-09 trên staging [AI], build staging sau lần giao QA cuối của TIB-5496 (2026-10-06); đối chiếu Testlane TIB-169 (read-only 2026-10-30): status passed và actualResult khớp nguyên văn CCR 5.1, không ghi Fail/Blocked, kiểm đúng hành vi claim. 4.1 'KHÔNG AI (PO/business)' không loại test_case (§12.3a, chủ repo chốt 2026-10-11). 
