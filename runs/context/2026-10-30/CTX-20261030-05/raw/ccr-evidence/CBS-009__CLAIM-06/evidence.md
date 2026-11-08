# CBS-009__CLAIM-06

Trích từ Proposal CBS-009 (đóng băng 2026-10-30, file CCR-2026-10-22-assign-video-to-variant.md, sourceTask TIB-221).

## Phần 1a

| `CLAIM-06` | `TIB-5428 / C20 — view Mockup assignments (Group by Mockup và Group by Variant): video là một dòng/thumbnail riêng, không gộp vào dòng mockup` | `portal` | `test_case` — PASS TC-TIB-6422 2026-10-22 staging [AI] — build: staging @ 2026-10-22 (sau lần giao QA cuối 2026-10-15) | `campaign/create-campaign-by-product-base` | `ADD` |

## Phần 1b

| `CLAIM-06` | `campaign` | `create-campaign-by-product-base` | `owner/staff (seller, portal)` | `portal` | `không có` |

## Phần 5.1

### CLAIM-06

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** `TC-TIB-6422`
- **Link:** `không có — Testlane task TIB-221 (QA hub, project TIB), case không có URL công khai`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-22`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `test-executor [AI] (agent chạy thay QA chienct, Testlane task TIB-221)`
- **Trích nguyên văn:**
  ```
  Với M1 → Red và V1 → Red: Group by Mockup có dòng riêng cho M1 ("Red - S", 1 variant) và dòng riêng cho V1 (thumbnail hqdefault.jpg, "Red - S", 1 variant), không gộp. Group by Variant: Red - S "2 mockups" liệt kê 2 thumbnail riêng — M1 và V1. API: case chỉ đọc (dữ liệu assignment được set bằng mutation AssignMockupVariantIds => 200).
  ```
- **File đính kèm cho claim này:** `không có`

## Testlane (list_test_cases TIB-221, read-only 2026-10-30; status hiện tại không dùng làm căn cứ — Testlane không lưu ngày chạy từng case, ngày/lượt lấy từ CCR)

### TC-TIB-6422 — View Mockup assignments — video là một dòng riêng, không gộp vào dòng mockup
- status_now: passed · bugId: None · Requirement/Rule: C20
- expectedResult:
```
Kết quả mong đợi: Video V1 xuất hiện như một dòng riêng, tách khỏi dòng mockup M1, ở cả hai chế độ group.
Cách kiểm tra:
Group by Mockup: có dòng riêng cho M1 và dòng riêng cho V1, không bị gộp chung một dòng.
Group by Variant: dưới Red liệt kê 2 dòng — M1 và V1.
```
- actualResult:
```
Với M1 → Red và V1 → Red: Group by Mockup có dòng riêng cho M1 ("Red - S", 1 variant) và dòng riêng cho V1 (thumbnail hqdefault.jpg, "Red - S", 1 variant), không gộp. Group by Variant: Red - S "2 mockups" liệt kê 2 thumbnail riêng — M1 và V1. API: case chỉ đọc (dữ liệu assignment được set bằng mutation AssignMockupVariantIds => 200).
Instance: https://staging-admin.teeinblue.com/admin/instances/520
Campaign: #3122
[ảnh][ảnh]
```
