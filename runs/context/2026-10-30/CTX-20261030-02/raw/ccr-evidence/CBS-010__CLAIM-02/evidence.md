# CBS-010__CLAIM-02

Strength: S3

## Dòng Phần 1a

| `CLAIM-02` | TIB-5496 — bấm (+) "Add to campaigns" trên một dòng đang chọn mở modal "Campaigns that use this product" chế độ nhiều variant: banner "Adding N variants to selected campaigns will also mark them as available" (N in đậm), cột Variant status dạng "K/N available" (C2, C3) | portal — modal Campaigns that use this product | `test_case` — PASS TC-TIB-5028 2026-10-09 staging [AI]; PASS TC-TIB-5029 2026-10-09 staging [AI] — build: staging @ 2026-10-09 giờ không rõ — sau lần TIB-5496 giao QA cuối (2026-10-06); không có Fix Version; build hash: không rõ (QA không có quyền repo) | product-base — đề xuất MỚI: variant-add-to-campaigns; cùng tên modal với KB-092 (mở từ icon rocket, banner khác) — hai lối vào khác nhau, không mâu thuẫn; vị trí hint của BUG-262 (Q11) có thể đổi banner khi fix | ADD |

## Block 5.1 (nguyên văn CCR)

### CLAIM-02

- **Loại nguồn** (đúng 1): test_case
- **Locator:** TC-TIB-5028 · TC-TIB-5029 (actualResult)
- **Link:** không có URL công khai — Testlane project proj-7082bc68-6228-4718-b22d-c8e6f95437ab, task TIB-169
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-09
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor (agent) [AI], QA chienct điều phối lượt chạy
- **Trích nguyên văn:**
  ```
  TC-TIB-5028: Chọn V1, V2, V3 rồi bấm (+) ở dòng V2: modal "Campaigns that use this product" mở, banner "Adding 3 variants to selected campaigns will also mark them as available" (số 3), cột Variant status dạng K/3 (CP-K 2/3 available).
  TC-TIB-5029: Chọn V1–V4, bấm (+) ở V1: title "Campaigns that use this product"; banner "Adding 4 variants to selected campaigns will also mark them as available" (số 4 in đậm, font-weight 700); CP-0 hiển thị 0/4 available, CP-K 2/4 available.
  ```
- **File đính kèm cho claim này:** screenshot đính trong actualResult của 2 case trên Testlane


## Đánh giá

S3 test_case: TC-TIB-5028, TC-TIB-5029 PASS, chạy 2026-10-09 trên staging [AI], build staging sau lần giao QA cuối của TIB-5496 (2026-10-06); đối chiếu Testlane TIB-169 (read-only 2026-10-30): status passed và actualResult khớp nguyên văn CCR 5.1, không ghi Fail/Blocked, kiểm đúng hành vi claim. 4.1 'KHÔNG AI (PO/business)' không loại test_case (§12.3a, chủ repo chốt 2026-10-11). Chữ banner có thể đổi nếu BUG-262 được fix bằng cách đổi banner (RA Q11 treo) — ghi unknowns, không phải lý do hạ bậc vì test case PASS đúng hành vi.
