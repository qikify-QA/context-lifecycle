# CBS-009__CLAIM-11

Trích từ Proposal CBS-009 (đóng băng 2026-10-30, file CCR-2026-10-22-assign-video-to-variant.md, sourceTask TIB-221).

## Phần 1a

| `CLAIM-11` | `TIB-5428 / C18 — setting ON, variant không gán gì (0 mockup + 0 video): gallery hiện toàn bộ mockup + video của campaign` | `storefront (SDK gallery)` | `test_case` — PASS TC-TIB-6429 2026-10-22 staging [AI] — build: staging @ 2026-10-22 (sau lần giao QA cuối 2026-10-15) | `sdk/storefront-buyer-facing` | `ADD` |

## Phần 1b

| `CLAIM-11` | `sdk` | `storefront-buyer-facing` | `buyer (guest, storefront)` | `storefront` | `không có` |

## Phần 5.1

### CLAIM-11

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** `TC-TIB-6429`
- **Link:** `không có — Testlane task TIB-221 (QA hub, project TIB), case không có URL công khai`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-22`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `test-executor [AI] (agent chạy thay QA chienct, Testlane task TIB-221)`
- **Trích nguyên văn:**
  ```
  Setting ON; Green 0 assignment (M1→Red, M2→Blue, V1→Red; M3, V2 không gán), đã sync. Chọn Green: gallery có đúng 5 slide: M1 (MK-5469-2), M2 (MK-5469-1), M3, V1 (YouTube), V2 (Vimeo 76979871) — fallback hiển thị toàn bộ media. API: GET /api/merchant/campaigns/15252195639537.json => 200, không có mockup nào có 93502 trong variant_ids — khớp.
  ```
- **File đính kèm cho claim này:** `không có`

## Testlane (list_test_cases TIB-221, read-only 2026-10-30; status hiện tại không dùng làm căn cứ — Testlane không lưu ngày chạy từng case, ngày/lượt lấy từ CCR)

### TC-TIB-6429 — Setting ON — variant không gán gì (0 mockup + 0 video) → gallery hiện tất cả mockup + video
- status_now: passed · bugId: None · Requirement/Rule: C18, R15
- expectedResult:
```
Kết quả mong đợi: Gallery hiện toàn bộ media của campaign — 3 mockup M1/M2/M3 và 2 video V1/V2 (5 item).
Cách kiểm tra:
Storefront → gallery SDK: đúng 5 item, gồm cả M1, M2, M3, V1, V2.
```
- actualResult:
```
Setting ON; Green 0 assignment (M1→Red, M2→Blue, V1→Red; M3, V2 không gán), đã sync. Chọn Green: gallery có đúng 5 slide: M1 (MK-5469-2), M2 (MK-5469-1), M3, V1 (YouTube), V2 (Vimeo 76979871) — fallback hiển thị toàn bộ media. API: GET /api/merchant/campaigns/15252195639537.json => 200, không có mockup nào có 93502 trong variant_ids — khớp.
Instance: https://staging-admin.teeinblue.com/admin/instances/520
Campaign: #3122
Storefront: cp-5428-video-assign-tib-221
[ảnh]
```
