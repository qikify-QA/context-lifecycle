# CBS-009__CLAIM-12

Trích từ Proposal CBS-009 (đóng băng 2026-10-30, file CCR-2026-10-22-assign-video-to-variant.md, sourceTask TIB-221).

## Phần 1a

| `CLAIM-12` | `TIB-5428 / C10 — setting OFF: gallery hiện toàn bộ mockup + video với mọi variant, assignment còn lưu nhưng không lọc` | `storefront (SDK gallery) · api (PUT /api/instances/520/config)` | `test_case` — PASS TC-TIB-6430 2026-10-22 staging [AI] — build: staging @ 2026-10-22 (sau lần giao QA cuối 2026-10-15) | `sdk/storefront-buyer-facing; sdk/product-page-settings-config` | `ADD` |

## Phần 1b

| `CLAIM-12` | `sdk` | `storefront-buyer-facing` | `buyer (guest, storefront)` | `storefront` | `không có` |

## Phần 5.1

### CLAIM-12

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** `TC-TIB-6430`
- **Link:** `không có — Testlane task TIB-221 (QA hub, project TIB), case không có URL công khai`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-22`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `test-executor [AI] (agent chạy thay QA chienct, Testlane task TIB-221)`
- **Trích nguyên văn:**
  ```
  Setting TẮT (PUT /api/instances/520/config với show_assigned_variant_images_only=false), assignment giữ M1→Red, M2→Blue, V1→Red. Storefront chọn lần lượt Red, Blue, Green: cả 3 lần gallery đều có 5 slide (M1, M2, M3, V1 YouTube dQw4w9WgXcQ, V2 Vimeo 76979871), giống hệt nhau. API: GET /api/merchant/campaigns/15252195639537.json => 200, config.show_assigned_variant_images_only=false; assignment variant_ids vẫn còn nhưng không có tác dụng lọc.
  ```
- **File đính kèm cho claim này:** `không có`

## Testlane (list_test_cases TIB-221, read-only 2026-10-30; status hiện tại không dùng làm căn cứ — Testlane không lưu ngày chạy từng case, ngày/lượt lấy từ CCR)

### TC-TIB-6430 — Setting OFF — gallery hiện toàn bộ mockup + video, bỏ qua assignment video
- status_now: passed · bugId: None · Requirement/Rule: C10, R8
- expectedResult:
```
Kết quả mong đợi: Với mọi variant, gallery hiện toàn bộ 5 media (M1, M2, M3, V1, V2); video hiện như một mockup bình thường, assignment video không có tác dụng lọc.
Cách kiểm tra:
Storefront → gallery SDK ở variant Red: 5 item.
Gallery ở variant Blue: 5 item, giống Red.
Gallery ở variant Green: 5 item, giống Red.
```
- actualResult:
```
Setting TẮT (PUT /api/instances/520/config với show_assigned_variant_images_only=false), assignment giữ M1→Red, M2→Blue, V1→Red. Storefront chọn lần lượt Red, Blue, Green: cả 3 lần gallery đều có 5 slide (M1, M2, M3, V1 YouTube dQw4w9WgXcQ, V2 Vimeo 76979871), giống hệt nhau. API: GET /api/merchant/campaigns/15252195639537.json => 200, config.show_assigned_variant_images_only=false; assignment variant_ids vẫn còn nhưng không có tác dụng lọc.
Instance: https://staging-admin.teeinblue.com/admin/instances/520
Campaign: #3122
Storefront: cp-5428-video-assign-tib-221
[ảnh][ảnh]
```
