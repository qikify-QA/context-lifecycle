# CBS-010__CLAIM-17

Strength: S0

## Dòng Phần 1a

| `CLAIM-17` | TIB-5496 — RA/PO (Q9): mockup của variant mới thêm được gán theo rule kế thừa từ Product Base (TIB-3216) (R10, phần mockup) | portal — campaign mockup variant assignment | `KHÔNG CÓ NGUỒN` — TC-TIB-5050 PASS 2026-10-09 nhưng gán mockup của campaign giống hệt trước và sau Add (có từ lúc attach) nên không chứng minh rule kế thừa áp cho variant mới | product-base/mockup-attachment — chưa rõ, cần agent tự đánh giá | ADD |

## Block 5.1 (nguyên văn CCR)

### CLAIM-17

- **Loại nguồn** (đúng 1): KHÔNG CÓ NGUỒN
- **Locator:** TC-TIB-5050 (actualResult) · RA analysis_TIB-5496.md R10
- **Link:** không có URL công khai — Testlane project proj-7082bc68-6228-4718-b22d-c8e6f95437ab, task TIB-169
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-09
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor [AI]
- **Trích nguyên văn:**
  ```
  TC-TIB-5050: Sau Add V1–V4 vào CP-0, mockup 1 của campaign product (mockup 8097) có variant assignment gồm V1, V2, V3, V4 (+V5, V6); mockup 2 không gán variant nào. V2, V3, V4 đều được gán mockup, khớp mockup 1 ở Product Base (PB gán Black S, Black M, White S, White M, Gray L). Lưu ý: danh sách gán của campaign mockup giống hệt trước và sau Add (đã có từ lúc attach), và lệch nhẹ với PB (có V5, V6, thiếu V7 filler) — không ảnh hưởng V2–V4.
  ```
- **File đính kèm cho claim này:** screenshot đính trong actualResult trên Testlane


## Đánh giá

S0: TC-TIB-5050 PASS nhưng actualResult tự ghi gán mockup của campaign giống hệt trước và sau Add (có từ lúc attach) → artifact không chứng minh rule kế thừa áp cho variant mới; còn lại chỉ là lời kể RA. Không nạp.
