# CBS-009__CLAIM-22

Trích từ Proposal CBS-009 (đóng băng 2026-10-30, file CCR-2026-10-22-assign-video-to-variant.md, sourceTask TIB-221).

## Phần 1a

| `CLAIM-22` | `Phát hiện khi test (BUG-360, bug, KHÔNG phải hành vi đúng) — sửa URL video: request PUT gửi lại thumbnail_url của video cũ nên thumbnail không đổi` | `portal · api` | `KHÔNG CÓ NGUỒN` — chỉ quan sát kèm trong TC-TIB-6440 (2026-10-22); BUG-360 trạng thái không rõ | `campaign/create-campaign-by-product-base` | `ADD` |

## Phần 1b

| `CLAIM-22` | `campaign` | `create-campaign-by-product-base` | `owner/staff (seller, portal)` | `portal, api` | `không có` |

## Phần 5.1

### CLAIM-22

- **Loại nguồn** (đúng 1): `KHÔNG CÓ NGUỒN`
- **Locator:** `BUG-360 (ghi trong TC-TIB-6440)`
- **Link:** `không có — Testlane task TIB-221 (QA hub, project TIB), case không có URL công khai`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-22`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `test-executor [AI] (agent chạy thay QA chienct, Testlane task TIB-221)`
- **Trích nguyên văn:**
  ```
  [TC-TIB-6440] Phát hiện kèm (không ảnh hưởng kết luận case): request PUT gửi thumbnail_url của video cũ nên thumbnail vẫn là ảnh video cũ — đã tạo bug Low, xem BUG trong task (report_bug theo task TIB-221).
  ```
- **File đính kèm cho claim này:** `không có`

## Testlane (list_test_cases TIB-221, read-only 2026-10-30; status hiện tại không dùng làm căn cứ — Testlane không lưu ngày chạy từng case, ngày/lượt lấy từ CCR)

### TC-TIB-6440 — Sửa URL video — assignment giữ nguyên, variant trỏ sang link mới
- status_now: passed · bugId: None · Requirement/Rule: C15, R12
- expectedResult:
```
Kết quả mong đợi: Assignment của V1 không thay đổi (vẫn Red + Blue); nội dung video đổi sang URL mới.
Cách kiểm tra:
Mockup assignments (Group by Variant): Red và Blue vẫn có V1.
Network → request lưu video: chỉ field URL đổi sang link mới, id video không đổi và không có lệnh xoá mapping.
Storefront → gallery SDK ở variant Red: item video phát đúng nội dung của URL mới.
```
- actualResult:
```
Làm trên campaign clone #3142 (đã publish lên Nprice1, setting ON). V1 → Red + Blue; sửa URL V1 sang https://www.youtube.com/watch?v=jNQXAC9IVRw. API: PUT /api/campaign-products/4674/campaign-mockups/12549/video => 204, id video 12549 không đổi, không có lệnh xoá mapping. Mockup assignments sau reload: Red "3 mockups" (V1, M1, M2), Blue "2 mockups" (V1, V2) — V1 vẫn Red + Blue. Sau Update (POST /api/campaigns/3142/sync => 200), storefront chọn Red: slide video alt "YouTube Video - jNQXAC9IVRw", bấm play nạp iframe youtube.com/embed/jNQXAC9IVRw?autoplay=1 — phát đúng nội dung URL mới. Phát hiện kèm (không ảnh hưởng kết luận case): request PUT gửi thumbnail_url của video cũ nên thumbnail vẫn là ảnh video cũ — đã tạo bug Low, xem BUG trong task (report_bug theo task TIB-221).
Instance: https://staging-admin.teeinblue.com/admin/instances/520
Campaign: #3142
Storefront: cp-5428-video-assign-tib-221-copy
[ảnh][ảnh]
```
