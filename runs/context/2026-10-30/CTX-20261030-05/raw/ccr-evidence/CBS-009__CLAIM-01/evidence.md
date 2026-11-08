# CBS-009__CLAIM-01

Trích từ Proposal CBS-009 (đóng băng 2026-10-30, file CCR-2026-10-22-assign-video-to-variant.md, sourceTask TIB-221).

## Phần 1a

| `CLAIM-01` | `TIB-5428 — Campaign by Product Base editor: modal Assign mockups hiện video (thumbnail + icon play) cùng grid với mockup, theo thứ tự list media; chọn được video để gán` | `portal (modal Assign mockups của campaign editor)` | `test_case` — PASS TC-TIB-6414 2026-10-22 staging [AI] — build: staging @ 2026-10-22 (sau lần giao QA cuối 2026-10-15) | `campaign/create-campaign-by-product-base (KB nút Assign mockups ở STEP2)` | `ADD` |

## Phần 1b

| `CLAIM-01` | `campaign` | `create-campaign-by-product-base` | `owner/staff (seller, portal)` | `portal` | `không có` |

## Phần 5.1

### CLAIM-01

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** `TC-TIB-6414`
- **Link:** `không có — Testlane task TIB-221 (QA hub, project TIB), case không có URL công khai`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-22`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `test-executor [AI] (agent chạy thay QA chienct, Testlane task TIB-221)`
- **Trích nguyên văn:**
  ```
  Modal "Assign mockups" của campaign #3122 hiển thị 5 item (M1/M2/M3 + 2 video V1, V2 cùng grid, theo thứ tự list media); click V1 thì ô được tick (checked=[F,F,F,T,F]), không lỗi. API: case chỉ đọc, chưa Save.
  ```
- **File đính kèm cho claim này:** `không có`

## Testlane (list_test_cases TIB-221, read-only 2026-10-30; status hiện tại không dùng làm căn cứ — Testlane không lưu ngày chạy từng case, ngày/lượt lấy từ CCR)

### TC-TIB-6414 — Campaign by Product Base editor — picker hiển thị video cạnh mockup
- status_now: passed · bugId: None · Requirement/Rule: C1, C2
- expectedResult:
```
Kết quả mong đợi: Modal hiển thị cả mockup M1/M2/M3 và video V1/V2 của campaign; video chọn được để gán.
Cách kiểm tra:
Modal Assign mockups → có V1, V2 nằm cùng grid với mockup.
Click V1 → chọn được, không báo lỗi.
```
- actualResult:
```
Modal "Assign mockups" của campaign #3122 hiển thị 5 item (M1/M2/M3 + 2 video V1, V2 cùng grid, theo thứ tự list media); click V1 thì ô được tick (checked=[F,F,F,T,F]), không lỗi. API: case chỉ đọc, chưa Save.
Instance: https://staging-admin.teeinblue.com/admin/instances/520
Campaign: #3122 "CP-5428 Video assign (TIB-221)"
[ảnh]
```
