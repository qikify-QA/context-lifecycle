# CBS-009__CLAIM-09

Trích từ Proposal CBS-009 (đóng băng 2026-10-30, file CCR-2026-10-22-assign-video-to-variant.md, sourceTask TIB-221).

## Phần 1a

| `CLAIM-09` | `TIB-5428 / C17 — setting ON, variant chỉ gán video (0 mockup): gallery đúng bằng tập video đã gán, không fallback hiện tất cả mockup` | `storefront (SDK gallery)` | `test_case` — PASS TC-TIB-6427 2026-10-22 staging [AI] — build: staging @ 2026-10-22 (sau lần giao QA cuối 2026-10-15) | `sdk/storefront-buyer-facing` | `ADD` |

## Phần 1b

| `CLAIM-09` | `sdk` | `storefront-buyer-facing` | `buyer (guest, storefront)` | `storefront` | `không có` |

## Phần 5.1

### CLAIM-09

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** `TC-TIB-6427`
- **Link:** `không có — Testlane task TIB-221 (QA hub, project TIB), case không có URL công khai`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-22`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `test-executor [AI] (agent chạy thay QA chienct, Testlane task TIB-221)`
- **Trích nguyên văn:**
  ```
  Setting ON; Green → V1 + V2 (0 mockup), M1→Red, M2→Blue, M3 không gán; đã sync (POST /api/campaigns/3122/sync => 200). Chọn Green: gallery đúng 2 slide = V1 (YouTube dQw4w9WgXcQ) + V2 (Vimeo 76979871), không có M1/M2/M3, không áp fallback "hiện tất cả mockup". API: GET /api/merchant/campaigns/15252195639537.json => 200, variant_ids: 12502 (V1) [93496,93502], 12503 (V2) [93502], 3 mockup không chứa 93502 — khớp.
  ```
- **File đính kèm cho claim này:** `không có`

## Testlane (list_test_cases TIB-221, read-only 2026-10-30; status hiện tại không dùng làm căn cứ — Testlane không lưu ngày chạy từng case, ngày/lượt lấy từ CCR)

### TC-TIB-6427 — Setting ON — variant chỉ gán video (0 mockup) → gallery đúng bằng tập video đã gán
- status_now: passed · bugId: None · Requirement/Rule: C17, R14
- expectedResult:
```
Kết quả mong đợi: Gallery hiện đúng 2 item là V1 và V2, không kéo thêm bất kỳ mockup nào (không áp fallback "variant không có mockup gán thì hiện tất cả mockup").
Cách kiểm tra:
Storefront → gallery SDK: đúng 2 item, cả hai là video V1 và V2.
Gallery không chứa M1, M2, M3.
```
- actualResult:
```
Setting ON; Green → V1 + V2 (0 mockup), M1→Red, M2→Blue, M3 không gán; đã sync (POST /api/campaigns/3122/sync => 200). Chọn Green: gallery đúng 2 slide = V1 (YouTube dQw4w9WgXcQ) + V2 (Vimeo 76979871), không có M1/M2/M3, không áp fallback "hiện tất cả mockup". API: GET /api/merchant/campaigns/15252195639537.json => 200, variant_ids: 12502 (V1) [93496,93502], 12503 (V2) [93502], 3 mockup không chứa 93502 — khớp.
Instance: https://staging-admin.teeinblue.com/admin/instances/520
Campaign: #3122
Storefront: cp-5428-video-assign-tib-221
[ảnh]
```
