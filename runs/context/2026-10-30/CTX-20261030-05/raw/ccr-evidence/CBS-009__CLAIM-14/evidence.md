# CBS-009__CLAIM-14

Trích từ Proposal CBS-009 (đóng băng 2026-10-30, file CCR-2026-10-22-assign-video-to-variant.md, sourceTask TIB-221).

## Phần 1a

| `CLAIM-14` | `TIB-5428 / C8 (phần Always load first) — video bật Always load first và gán variant đang chọn: đứng đầu gallery và là item focus` | `storefront (SDK gallery) · portal (Always load first)` | `KHÔNG CÓ NGUỒN` — TC-TIB-6432 chạy 2026-10-22 FAIL (BUG-359: chỉ đổi focus, vẫn ở vị trí 2); actualResult hiện chỉ còn 1 ảnh, status passed không ngày; Q14 treo | `sdk/storefront-buyer-facing` | `ADD` |

## Phần 1b

| `CLAIM-14` | `sdk` | `storefront-buyer-facing` | `buyer (guest, storefront)` | `storefront` | `không có` |

## Phần 5.1

### CLAIM-14

- **Loại nguồn** (đúng 1): `KHÔNG CÓ NGUỒN`
- **Locator:** `TC-TIB-6432 + BUG-359`
- **Link:** `không có — Testlane task TIB-221 (QA hub, project TIB), case không có URL công khai`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-22`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `test-executor [AI] (agent chạy thay QA chienct, Testlane task TIB-221)`
- **Trích nguyên văn:**
  ```
  [actualResult hiện tại trên Testlane] (chỉ có 1 ảnh, không có chữ)
  [Kết quả lượt 2026-10-22, CCR đã submit CBS-009] TC-TIB-6432 FAIL — BUG-359: video bật Always load first là item focus nhưng vẫn ở vị trí thứ 2 (M1 → V1 → M2)
  [Slack #req-chienct 2026-10-21, đáp án Q2 theo RA] Thứ tự theo list campaign; video `Always load first` đứng đầu + là item focus
  ```
- **File đính kèm cho claim này:** `không có`

## Testlane (list_test_cases TIB-221, read-only 2026-10-30; status hiện tại không dùng làm căn cứ — Testlane không lưu ngày chạy từng case, ngày/lượt lấy từ CCR)

### TC-TIB-6432 — Video bật Always load first và có gán variant đang chọn → đứng đầu gallery và là item focus
- status_now: passed · bugId: None · Requirement/Rule: C8, R6
- expectedResult:
```
Kết quả mong đợi: V1 đứng đầu gallery (trước M1) và là item đang focus khi trang load; các item còn lại giữ thứ tự list media M1 → M2.
Cách kiểm tra:
Storefront → gallery SDK: item đầu tiên là V1, sau đó M1, M2.
Khu vực hiển thị chính (item focus) đang là video V1 chứ không phải mockup.
```
- actualResult:
```
[ảnh]
```
