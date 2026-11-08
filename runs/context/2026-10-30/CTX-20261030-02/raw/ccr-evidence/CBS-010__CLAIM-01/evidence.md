# CBS-010__CLAIM-01

Strength: S3

## Dòng Phần 1a

| `CLAIM-01` | TIB-5496 — bảng Variants của Product Base editor: Ctrl-click chọn/bỏ chọn từng dòng rời rạc, Shift-click chọn một dải dòng liên tiếp; nút Delete selected nhận đúng vùng chọn (C1, C10) | portal — Product Base editor, bảng Variants | `test_case` — PASS TC-TIB-5025 2026-10-09 staging [AI]; PASS TC-TIB-5026 2026-10-09 staging [AI]; PASS TC-TIB-5027 2026-10-09 staging [AI] — build: staging @ 2026-10-09 giờ không rõ — sau lần TIB-5496 giao QA cuối (2026-10-06); không có Fix Version; build hash: không rõ (QA không có quyền repo) | product-base/variant-catalog — KB-079 (Delete selected, chọn qua click số thứ tự dòng) là hành vi lân cận, không mâu thuẫn; Cmd-click macOS chưa chạy | ADD |

## Block 5.1 (nguyên văn CCR)

### CLAIM-01

- **Loại nguồn** (đúng 1): test_case
- **Locator:** TC-TIB-5025 · TC-TIB-5026 · TC-TIB-5027 (actualResult)
- **Link:** không có URL công khai — Testlane project proj-7082bc68-6228-4718-b22d-c8e6f95437ab, task TIB-169
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-09
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor (agent) [AI], QA chienct điều phối lượt chạy
- **Trích nguyên văn:**
  ```
  TC-TIB-5025: Click V1 rồi Ctrl-click V2, V3: 3 dòng V1, V2, V3 có class "select" (highlight), V4–V7 không chọn; nút Delete selected chuyển sang enabled; bảng không reload, vùng chọn giữ nguyên.
  TC-TIB-5026: Click V1, Ctrl-click V3 và V5: đúng 3 dòng V1, V3, V5 có class "select", V2/V4/V6 không chọn. Ctrl-click V3 lần nữa: V3 bỏ chọn, còn V1 và V5.
  TC-TIB-5027: Click V2 rồi Shift-click V5: dải V2, V3, V4, V5 (4 dòng) có class "select"; V1, V6, V7 không chọn.
  ```
- **File đính kèm cho claim này:** screenshot đính trong actualResult của 3 case trên Testlane


## Đánh giá

S3 test_case: TC-TIB-5025, TC-TIB-5026, TC-TIB-5027 PASS, chạy 2026-10-09 trên staging [AI], build staging sau lần giao QA cuối của TIB-5496 (2026-10-06); đối chiếu Testlane TIB-169 (read-only 2026-10-30): status passed và actualResult khớp nguyên văn CCR 5.1, không ghi Fail/Blocked, kiểm đúng hành vi claim. 4.1 'KHÔNG AI (PO/business)' không loại test_case (§12.3a, chủ repo chốt 2026-10-11). Phạm vi hẹp theo actualResult: 5025 chỉ ghi Delete selected chuyển enabled, không chứng minh Delete selected xoá đúng vùng chọn → không nạp vế "Delete selected nhận đúng vùng chọn". Cmd-click macOS không chạy → unknowns.
