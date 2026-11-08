# CBS-010__CLAIM-13

Strength: S1

## Dòng Phần 1a

| `CLAIM-13` | TIB-5496 — RA/PO (Q4): sau Add thành công, vùng chọn variant ở grid tự clear — lúc chạy vùng chọn KHÔNG được clear (C11) | portal — Product Base editor, bảng Variants | `KHÔNG CÓ NGUỒN` — case TC-TIB-5045 Fail 2026-10-09, BUG-264 chưa có retest có ngày; Testlane status passed và bug đã bị gỡ khỏi case (bugId rỗng) nhưng actualResult vẫn Fail | product-base — MỚI: variant-add-to-campaigns (ảnh hưởng state vùng chọn của variant-catalog) | ADD |

## Block 5.1 (nguyên văn CCR)

### CLAIM-13

- **Loại nguồn** (đúng 1): KHÔNG CÓ NGUỒN
- **Locator:** TC-TIB-5045 (actualResult, Fail) · BUG-264
- **Link:** không có URL công khai — Testlane project proj-7082bc68-6228-4718-b22d-c8e6f95437ab, task TIB-169
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-09
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor [AI]
- **Trích nguyên văn:**
  ```
  TC-TIB-5045: Fail — Vùng chọn variant không được clear sau Add thành công. Actual: Add V1–V4 vào CP-0 thành công (CP-0 4/4 available), đóng modal: V1, V2, V3, V4 vẫn đang chọn, nút Delete selected vẫn enabled. Expected: không còn dòng nào đang chọn, Delete selected trở lại trạng thái không có vùng chọn. Đã tạo bug BUG-264 kèm screenshot.
  ```
- **File đính kèm cho claim này:** screenshot đính trong actualResult TC-TIB-5045; BUG-264 trên Testlane


## Đánh giá

S1: actualResult TC-TIB-5045 Fail kèm screenshot. Testlane status passed và bugId đã bị gỡ nhưng actualResult vẫn Fail, không có ngày retest → không dùng.
