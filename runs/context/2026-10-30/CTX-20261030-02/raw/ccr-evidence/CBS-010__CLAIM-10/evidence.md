# CBS-010__CLAIM-10

Strength: S3

## Dòng Phần 1a

| `CLAIM-10` | TIB-5496 — xác nhận Add: chỉ insert variant campaign còn thiếu, variant thêm vào ở trạng thái Available, không thêm variant Unavailable, không nhân đôi variant đã có, double-click xác nhận chỉ gửi 1 mutation, chạy được 4 variant × 25 campaign trong vài giây (R5, R6) | portal — campaign editor danh sách variant · api — POST /api/graphql | `test_case` — PASS TC-TIB-5041 2026-10-09 staging [AI]; PASS TC-TIB-5042 2026-10-09 staging [AI]; PASS TC-TIB-5043 2026-10-09 staging [AI]; PASS TC-TIB-5052 2026-10-09 staging [AI] — build: staging @ 2026-10-09 giờ không rõ — sau lần TIB-5496 giao QA cuối (2026-10-06); không có Fix Version; build hash: không rõ (QA không có quyền repo) | product-base — MỚI: variant-add-to-campaigns | ADD |

## Block 5.1 (nguyên văn CCR)

### CLAIM-10

- **Loại nguồn** (đúng 1): test_case
- **Locator:** TC-TIB-5041 · TC-TIB-5042 · TC-TIB-5043 · TC-TIB-5052 (actualResult)
- **Link:** không có URL công khai — Testlane project proj-7082bc68-6228-4718-b22d-c8e6f95437ab, task TIB-169
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-09
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor (agent) [AI], QA chienct điều phối lượt chạy
- **Trích nguyên văn:**
  ```
  TC-TIB-5041: Add V1–V4 vào CP-0 (#2795): CP-0 có V1, V2, V3, V4 (92741–92744), cả 4 available, kèm V7 filler có sẵn; V5, V6 không được thêm. Modal hiển thị CP-0 4/4 available.
  TC-TIB-5042: Add V1–V4 vào CP-K (#2793, trước đó V1, V2): mutation chỉ insert V3 (92743) và V4 (92744); CP-K sau Add có đúng 4 variant 92741, 92742, 92743, 92744, đều available, V1/V2 không nhân đôi; modal hiển thị CP-K 4/4 available.
  TC-TIB-5043: Double-click nút xác nhận Add (CP-0 trước đó 0/4): chỉ 1 mutation insert được gửi; CP-0 có đúng V1–V4 (92741–92744) mỗi variant 1 dòng cùng V7 filler, không trùng, không lỗi hệ thống.
  TC-TIB-5052: Chọn V1–V4 trên PB-MANY #3385, select-all 25 campaign trang 1, Add và xác nhận: hoàn tất trong vài giây, không timeout/lỗi; 25 campaign chuyển thành 4/4 available (checkbox disabled, tick được clear, modal vẫn mở). Kiểm tra qua API 3 campaign #2796, #2810, #2820: mỗi campaign có đúng V7, V1, V2, V3, V4 (không trùng); 5 campaign trang 2 không bị tác động.
  ```
- **File đính kèm cho claim này:** screenshot đính trong actualResult của 4 case trên Testlane


## Đánh giá

S3 test_case: TC-TIB-5041, TC-TIB-5042, TC-TIB-5043, TC-TIB-5052 PASS, chạy 2026-10-09 trên staging [AI], build staging sau lần giao QA cuối của TIB-5496 (2026-10-06); đối chiếu Testlane TIB-169 (read-only 2026-10-30): status passed và actualResult khớp nguyên văn CCR 5.1, không ghi Fail/Blocked, kiểm đúng hành vi claim. 4.1 'KHÔNG AI (PO/business)' không loại test_case (§12.3a, chủ repo chốt 2026-10-11). Trạng thái modal sau thành công (5052: modal mở, tick clear) là quan sát phụ, thuộc CLAIM-12 (S1).
