# CBS-009__CLAIM-03

Trích từ Proposal CBS-009 (đóng băng 2026-10-30, file CCR-2026-10-22-assign-video-to-variant.md, sourceTask TIB-221).

## Phần 1a

| `CLAIM-03` | `TIB-5428 — Product Base editor: modal Assign mockups hiện video V1/V2 cạnh 3 mockup và chọn được` | `portal (modal Assign mockups của PB editor)` | `KHÔNG CÓ NGUỒN` — TC-TIB-6413 actualResult ghi đạt (2026-10-22) nhưng case đang gắn BUG-376 — nội dung/ngày bug chưa đọc được qua MCP, chưa biết bug có chạm hành vi này không | `product-base/mockup-attachment — KB-052 (modal có cột Select variants/Select mockups), CHK-06-009` | `ADD` |

## Phần 1b

| `CLAIM-03` | `product-base` | `mockup-attachment` | `owner/staff (seller, portal)` | `portal` | `không có (liên quan KB-052, KB-085)` |

## Phần 5.1

### CLAIM-03

- **Loại nguồn** (đúng 1): `KHÔNG CÓ NGUỒN`
- **Locator:** `TC-TIB-6413 + BUG-376`
- **Link:** `không có — Testlane task TIB-221 (QA hub, project TIB), case không có URL công khai`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-22`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `test-executor [AI] (agent chạy thay QA chienct, Testlane task TIB-221); BUG-376: không rõ`
- **Trích nguyên văn:**
  ```
  Modal "Assign mockups" của PB #3415 hiển thị đủ 5 item (3 mockup "Front (1400x1400)" + 2 video có thumbnail/icon play); click video V1 (YouTube) thì ô được tick và highlight, không báo lỗi. API: case chỉ đọc, chưa bấm Save.
  [bugId trên Testlane: BUG-376 — nội dung không đọc được]
  ```
- **File đính kèm cho claim này:** `không có`

## Testlane (list_test_cases TIB-221, read-only 2026-10-30; status hiện tại không dùng làm căn cứ — Testlane không lưu ngày chạy từng case, ngày/lượt lấy từ CCR)

### TC-TIB-6413 — PB editor — picker Assign mockups hiển thị video cạnh mockup
- status_now: passed · bugId: BUG-376 · Requirement/Rule: C1, C2
- expectedResult:
```
Kết quả mong đợi: Grid trong modal hiển thị đủ 5 media — 3 mockup M1/M2/M3 và 2 video V1/V2; video nằm cạnh mockup và chọn được bình thường.
Cách kiểm tra:
Modal Assign mockups → đếm đúng 5 item, có V1 và V2.
Click V1 → item vào trạng thái đã chọn (highlight/checkbox), không báo lỗi.
```
- actualResult:
```
Modal "Assign mockups" của PB #3415 hiển thị đủ 5 item (3 mockup "Front (1400x1400)" + 2 video có thumbnail/icon play); click video V1 (YouTube) thì ô được tick và highlight, không báo lỗi. API: case chỉ đọc, chưa bấm Save.
Instance: https://staging-admin.teeinblue.com/admin/instances/520
Product base: #3415 "T-shirt 5428 (TIB-221)"
[ảnh]
```
