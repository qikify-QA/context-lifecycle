# CBS-009__CLAIM-25

Trích từ Proposal CBS-009 (đóng băng 2026-10-30, file CCR-2026-10-22-assign-video-to-variant.md, sourceTask TIB-221).

## Phần 1a

| `CLAIM-25` | `TIB-5428 / C16, C22 — campaign/PB đã có video trước deploy được migrate sang format mapping mới, assignment để trống; Q12 (store đang bật setting mất video sau deploy?) treo` | `db (migration) · storefront` | `KHÔNG CÓ NGUỒN` — TC-TIB-6445, TC-TIB-6446 not-run (skipped) — chưa có campaign tạo trước deploy; Q12 Blocker chưa trả lời | `campaign; sdk/product-page-settings-config; sdk/storefront-buyer-facing` | `ADD` |

## Phần 1b

| `CLAIM-25` | `campaign` | `MỚI: video-variant-migration` | `owner/staff (seller) và buyer (storefront)` | `db, storefront` | `không có` |

## Phần 5.1

### CLAIM-25

- **Loại nguồn** (đúng 1): `KHÔNG CÓ NGUỒN`
- **Locator:** `TC-TIB-6445, TC-TIB-6446; Slack #req-chienct Q10, Q12`
- **Link:** `không có — Testlane task TIB-221 (QA hub, project TIB), case không có URL công khai`
- **Ngày của nguồn (YYYY-MM-DD):** `không rõ`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `test-executor [AI] (agent chạy thay QA chienct, Testlane task TIB-221)`
- **Trích nguyên văn:**
  ```
  [TC-TIB-6445]
  Chưa chạy: chưa có campaign tạo trước deploy TIB-5428 dùng được làm CP-OLD-5428 (ứng viên chỉ đọc: platform product #512 trên Nprice2 đang kẹt màn upgrade, PB #2799) — đang chờ user quyết.
  [TC-TIB-6446]
  Chưa chạy: chưa có campaign tạo trước deploy TIB-5428 dùng được làm CP-OLD-5428 (ứng viên chỉ đọc: platform product #512 trên Nprice2 đang kẹt màn upgrade, PB #2799) — đang chờ user quyết.
  [Slack #req-chienct 2026-10-21, theo RA] Q10: "Migration nhé" · Q12 (một phần): "(b) chỉ chuyển format mapping và để trống assignment"
  ```
- **File đính kèm cho claim này:** `không có`

*(lặp lại block trên cho CLAIM-02, CLAIM-03…)*

## Testlane (list_test_cases TIB-221, read-only 2026-10-30; status hiện tại không dùng làm căn cứ — Testlane không lưu ngày chạy từng case, ngày/lượt lấy từ CCR)

### TC-TIB-6445 — Migration — campaign có sẵn video trước deploy chuyển sang format mapping mới, assignment để trống
- status_now: skipped · bugId: None · Requirement/Rule: C16, C22, R16
- expectedResult:
```
Kết quả mong đợi: Video V5 vẫn còn trong campaign và hiện được trong picker; assignment video sau migration là trống — không variant nào được tự gán V5; assignment mockup cũ của Red/Blue/Green không bị mất; merchant không phải tạo lại video.
Cách kiểm tra:
Mockup assignments (Group by Variant): Red/Blue/Green vẫn có mockup cũ, không có dòng V5 ở variant nào.
Group by Mockup: có dòng V5 nhưng danh sách variant của nó trống.
Modal Assign mockups: V5 hiển thị trong grid và chọn được.
```
- actualResult:
```
Chưa chạy: chưa có campaign tạo trước deploy TIB-5428 dùng được làm CP-OLD-5428 (ứng viên chỉ đọc: platform product #512 trên Nprice2 đang kẹt màn upgrade, PB #2799) — đang chờ user quyết.
```

### TC-TIB-6446 — Sau migration, store TẮT setting — storefront không đổi, gallery vẫn hiện video cũ
- status_now: skipped · bugId: None · Requirement/Rule: C22, R16, R8
- expectedResult:
```
Kết quả mong đợi: Setting OFF nên không lọc gì — mọi variant đều thấy toàn bộ mockup cũ và video V5; storefront không thay đổi so với trước migration.
Cách kiểm tra:
Storefront → gallery SDK ở variant Red: có đủ mockup của campaign và có V5.
Gallery ở Blue và Green: giống Red, đều có V5.
```
- actualResult:
```
Chưa chạy: chưa có campaign tạo trước deploy TIB-5428 dùng được làm CP-OLD-5428 (ứng viên chỉ đọc: platform product #512 trên Nprice2 đang kẹt màn upgrade, PB #2799) — đang chờ user quyết.
```
