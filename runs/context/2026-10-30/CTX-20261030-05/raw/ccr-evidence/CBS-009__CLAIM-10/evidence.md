# CBS-009__CLAIM-10

Trích từ Proposal CBS-009 (đóng băng 2026-10-30, file CCR-2026-10-22-assign-video-to-variant.md, sourceTask TIB-221).

## Phần 1a

| `CLAIM-10` | `TIB-5428 / C24 — setting ON, variant chỉ gán video: gallery và popup Preview chỉ có video, không render ảnh preview cá nhân hoá (không lấy mockup không gán làm nguồn preview)` | `storefront (SDK gallery, popup Preview)` | `test_case` — PASS TC-TIB-6428 2026-10-22 staging [AI] — build: staging @ 2026-10-22 (sau lần giao QA cuối 2026-10-15) | `sdk/storefront-buyer-facing; form cá nhân hoá / order design của variant này chưa có luật (Q15)` | `ADD` |

## Phần 1b

| `CLAIM-10` | `sdk` | `storefront-buyer-facing` | `buyer (guest, storefront)` | `storefront` | `không có` |

## Phần 5.1

### CLAIM-10

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** `TC-TIB-6428`
- **Link:** `không có — Testlane task TIB-221 (QA hub, project TIB), case không có URL công khai`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-22`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `test-executor [AI] (agent chạy thay QA chienct, Testlane task TIB-221)`
- **Trích nguyên văn:**
  ```
  Setting ON; Green → chỉ V1 (0 mockup), M1 (có printarea) → Blue, M2 → Blue; đã sync (POST /api/campaigns/3122/sync => 200). Chọn Green, nhập "HELLO" vào ô "Your name": gallery đúng 1 slide = V1 (YouTube), không có mockup nào của campaign. Bấm Preview: popup chỉ hiện video V1, không có ảnh preview cá nhân hoá (không có tee-printarea--image nào được render, không lấy M1/M2/M3 làm nguồn preview). API: GET /api/merchant/campaigns/15252195639537.json => 200, 12502 (V1) variant_ids=[93502], M1/M2 [93498], M3/V2 [] — khớp.
  ```
- **File đính kèm cho claim này:** `không có`

## Testlane (list_test_cases TIB-221, read-only 2026-10-30; status hiện tại không dùng làm căn cứ — Testlane không lưu ngày chạy từng case, ngày/lượt lấy từ CCR)

### TC-TIB-6428 — Setting ON — variant chỉ gán video không hiện ảnh preview cá nhân hoá
- status_now: passed · bugId: None · Requirement/Rule: C24, R18
- expectedResult:
```
Kết quả mong đợi: Gallery chỉ có đúng item video V1; không hiển thị ảnh preview cá nhân hoá, và không lấy mockup không-gán của campaign (M1/M2/M3) làm nguồn preview.
Cách kiểm tra:
Storefront → gallery SDK: đúng 1 item là V1.
Storefront → khu vực preview: không có ảnh preview cá nhân hoá nào được render.
Gallery không chứa mockup nào của campaign.
```
- actualResult:
```
Setting ON; Green → chỉ V1 (0 mockup), M1 (có printarea) → Blue, M2 → Blue; đã sync (POST /api/campaigns/3122/sync => 200). Chọn Green, nhập "HELLO" vào ô "Your name": gallery đúng 1 slide = V1 (YouTube), không có mockup nào của campaign. Bấm Preview: popup chỉ hiện video V1, không có ảnh preview cá nhân hoá (không có tee-printarea--image nào được render, không lấy M1/M2/M3 làm nguồn preview). API: GET /api/merchant/campaigns/15252195639537.json => 200, 12502 (V1) variant_ids=[93502], M1/M2 [93498], M3/V2 [] — khớp.
Instance: https://staging-admin.teeinblue.com/admin/instances/520
Artwork: #5257 "AW-5428b Video assign (TIB-221)"
Campaign: #3122
Storefront: cp-5428-video-assign-tib-221
[ảnh][ảnh]
```
