# CBS-009__CLAIM-13

Trích từ Proposal CBS-009 (đóng băng 2026-10-30, file CCR-2026-10-22-assign-video-to-variant.md, sourceTask TIB-221).

## Phần 1a

| `CLAIM-13` | `TIB-5428 / C8 (phần thứ tự) — gallery xếp theo thứ tự list media của campaign; video nằm giữa list giữ đúng vị trí (Always load first = OFF)` | `storefront (SDK gallery) · portal (list media)` | `test_case` — PASS TC-TIB-6431 2026-10-22 staging [AI] — build: staging @ 2026-10-22 (sau lần giao QA cuối 2026-10-15) | `sdk/storefront-buyer-facing` | `ADD` |

## Phần 1b

| `CLAIM-13` | `sdk` | `storefront-buyer-facing` | `buyer (guest, storefront)` | `storefront` | `không có` |

## Phần 5.1

### CLAIM-13

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** `TC-TIB-6431`
- **Link:** `không có — Testlane task TIB-221 (QA hub, project TIB), case không có URL công khai`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-22`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `test-executor [AI] (agent chạy thay QA chienct, Testlane task TIB-221)`
- **Trích nguyên văn:**
  ```
  Setting ON; kéo V1 lên giữa list media (thứ tự campaign M1 → V1 → M2 → M3 → V2), Red → M1 + V1 + M2, V1 "Always load first" = OFF; sync (POST /api/campaigns/3122/sync => 200). Storefront chọn Red: gallery 3 slide theo đúng thứ tự M1 (active) → V1 (YouTube) → M2, video không bị đẩy xuống cuối hay lên đầu. Portal list media cũng là M1, V1, M2, M3, V2. API: GET /api/merchant/campaigns/15252195639537.json => 200, campaign_mockups theo position: 12499 p0 [93496], 12502 (video) p1 [93496], 12500 p2 [93496], 12501 p3 [], 12503 p4 [] — khớp thứ tự.
  ```
- **File đính kèm cho claim này:** `không có`

## Testlane (list_test_cases TIB-221, read-only 2026-10-30; status hiện tại không dùng làm căn cứ — Testlane không lưu ngày chạy từng case, ngày/lượt lấy từ CCR)

### TC-TIB-6431 — Thứ tự item trong gallery theo thứ tự list media của campaign (video nằm giữa list)
- status_now: passed · bugId: None · Requirement/Rule: C8, R6
- expectedResult:
```
Kết quả mong đợi: Gallery xếp đúng thứ tự M1 → V1 → M2, khớp thứ tự list media của campaign; video không bị đẩy xuống cuối hay kéo lên đầu.
Cách kiểm tra:
Storefront → gallery SDK: thứ tự item từ trái sang / từ trên xuống là M1, V1, M2.
Campaign editor → list media: thứ tự cũng là M1, V1, M2 (đối chiếu hai bên trùng nhau).
```
- actualResult:
```
Setting ON; kéo V1 lên giữa list media (thứ tự campaign M1 → V1 → M2 → M3 → V2), Red → M1 + V1 + M2, V1 "Always load first" = OFF; sync (POST /api/campaigns/3122/sync => 200). Storefront chọn Red: gallery 3 slide theo đúng thứ tự M1 (active) → V1 (YouTube) → M2, video không bị đẩy xuống cuối hay lên đầu. Portal list media cũng là M1, V1, M2, M3, V2. API: GET /api/merchant/campaigns/15252195639537.json => 200, campaign_mockups theo position: 12499 p0 [93496], 12502 (video) p1 [93496], 12500 p2 [93496], 12501 p3 [], 12503 p4 [] — khớp thứ tự.
Instance: https://staging-admin.teeinblue.com/admin/instances/520
Campaign: #3122
Storefront: cp-5428-video-assign-tib-221
[ảnh]
```
