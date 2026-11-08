# CBS-009__CLAIM-08

Trích từ Proposal CBS-009 (đóng băng 2026-10-30, file CCR-2026-10-22-assign-video-to-variant.md, sourceTask TIB-221).

## Phần 1a

| `CLAIM-08` | `TIB-5428 / C6, C23 — setting ON: gallery SDK chỉ hiện media (mockup + video) đã gán cho variant đang chọn; media không gán hoặc gán variant khác bị ẩn; đổi variant liên tục lọc lại đúng (storefront chỉ đổi sau Update/Sync campaign)` | `storefront (SDK gallery) · api (GET /api/merchant/campaigns/<id>.json, PUT /api/instances/520/config)` | `test_case` — PASS TC-TIB-6424 2026-10-22 staging [AI]; PASS TC-TIB-6425 2026-10-22 staging [AI]; PASS TC-TIB-6426 2026-10-22 staging [AI]; PASS TC-TIB-6447 2026-10-22 staging [AI] — build: staging @ 2026-10-22 (sau lần giao QA cuối 2026-10-15) | `sdk/storefront-buyer-facing; sdk/product-page-settings-config` | `ADD` |

## Phần 1b

| `CLAIM-08` | `sdk` | `storefront-buyer-facing` | `buyer (guest, storefront)` | `storefront` | `không có` |

## Phần 5.1

### CLAIM-08

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** `TC-TIB-6424, TC-TIB-6425, TC-TIB-6426, TC-TIB-6447`
- **Link:** `không có — Testlane task TIB-221 (QA hub, project TIB), case không có URL công khai`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-22`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `test-executor [AI] (agent chạy thay QA chienct, Testlane task TIB-221)`
- **Trích nguyên văn:**
  ```
  [TC-TIB-6424]
  Setting ON (đã Save, request /api/instances/520/config có show_assigned_variant_images_only=true), assignment M1 → Red, V1 → Red, sync campaign (POST /api/campaigns/3122/sync => 200). Storefront chọn Red: gallery có đúng 2 slide — mockup M1 (qa-mockup_MK-5469-2) và video V1 (YouTube dQw4w9WgXcQ); bấm play thì iframe youtube.com/embed/dQw4w9WgXcQ?autoplay=1 được nạp và phát. API: GET /api/merchant/campaigns/15252195639537.json => 200, campaign_mockups[0] id 12499 variant_ids=[93496], [3] id 12502 type=video variant_ids=[93496] — khớp assignment.
  [TC-TIB-6425]
  Setting ON; assignment M1→Red, M2→Blue, M3 không gán, V1→Red, V2 không gán; đã sync (POST /api/campaigns/3122/sync => 200). Chọn Red: gallery đúng 2 slide = M1 (MK-5469-2) + V1 (YouTube); không có M2, M3, V2 (track chỉ chứa 2 slide, đã duyệt hết bằng nút next). API: GET /api/merchant/campaigns/15252195639537.json => 200, variant_ids: M1 [93496], M2 [93498], M3 [], V1 [93496], V2 [] — khớp.
  [TC-TIB-6426]
  Cùng assignment/sync như case chọn Red, setting ON. Chọn Blue: gallery đúng 1 slide = M2 (MK-5469-1, tee đen), không có nút prev/next, không có M1, V1, M3, V2. API: GET /api/merchant/campaigns/15252195639537.json => 200, M2 (id 12500) variant_ids=[93498]; M3/V2 variant_ids=[] — khớp.
  [TC-TIB-6447]
  Setting ON; assignment M1→Red, M2→Blue, M3 không gán, V1→Red, V2→Green; đã sync (POST /api/campaigns/3122/sync => 200; lưu ý storefront JSON chỉ cập nhật sau sync). Chọn Red → 2 slide {M1, V1}; Blue → 1 slide {M2}; Green → 1 slide {V2 Vimeo 76979871}; chọn lại Red → {M1, V1} giống lần đầu. M3 không xuất hiện lần nào, không sót item của variant trước. API: GET /api/merchant/campaigns/15252195639537.json => 200, variant_ids: 12499 [93496], 12500 [93498], 12501 [], 12502 [93496], 12503 [93502] — khớp.
  ```
- **File đính kèm cho claim này:** `không có`

## Testlane (list_test_cases TIB-221, read-only 2026-10-30; status hiện tại không dùng làm căn cứ — Testlane không lưu ngày chạy từng case, ngày/lượt lấy từ CCR)

### TC-TIB-6424 — Setting ON — gallery hiển thị video đã gán cho variant đang chọn
- status_now: passed · bugId: None · Requirement/Rule: C6, R2
- expectedResult:
```
Kết quả mong đợi: Gallery hiển thị video V1 (play được) cùng mockup M1 khi đang chọn variant Red.
Cách kiểm tra:
Storefront → gallery SDK: có item video V1, bấm play chạy được.
Gallery có đúng 2 item: M1 và V1.
```
- actualResult:
```
Setting ON (đã Save, request /api/instances/520/config có show_assigned_variant_images_only=true), assignment M1 → Red, V1 → Red, sync campaign (POST /api/campaigns/3122/sync => 200). Storefront chọn Red: gallery có đúng 2 slide — mockup M1 (qa-mockup_MK-5469-2) và video V1 (YouTube dQw4w9WgXcQ); bấm play thì iframe youtube.com/embed/dQw4w9WgXcQ?autoplay=1 được nạp và phát. API: GET /api/merchant/campaigns/15252195639537.json => 200, campaign_mockups[0] id 12499 variant_ids=[93496], [3] id 12502 type=video variant_ids=[93496] — khớp assignment.
Instance: https://staging-admin.teeinblue.com/admin/instances/520
Campaign: #3122
Storefront: cp-5428-video-assign-tib-221
[ảnh]
```

### TC-TIB-6425 — Setting ON — chỉ hiện media đã gán cho variant đang chọn (chọn Red → M1 + V1)
- status_now: passed · bugId: None · Requirement/Rule: C23, R17
- expectedResult:
```
Kết quả mong đợi: Gallery hiện đúng 2 item — M1 và V1. M2 (gán Blue), M3 (không gán) và V2 (không gán) đều bị ẩn.
Cách kiểm tra:
Storefront → gallery SDK: đúng 2 item, là M1 và V1.
Gallery không chứa M2, M3, V2 — kể cả khi scroll/next hết list.
```
- actualResult:
```
Setting ON; assignment M1→Red, M2→Blue, M3 không gán, V1→Red, V2 không gán; đã sync (POST /api/campaigns/3122/sync => 200). Chọn Red: gallery đúng 2 slide = M1 (MK-5469-2) + V1 (YouTube); không có M2, M3, V2 (track chỉ chứa 2 slide, đã duyệt hết bằng nút next). API: GET /api/merchant/campaigns/15252195639537.json => 200, variant_ids: M1 [93496], M2 [93498], M3 [], V1 [93496], V2 [] — khớp.
Instance: https://staging-admin.teeinblue.com/admin/instances/520
Campaign: #3122
Storefront: cp-5428-video-assign-tib-221
[ảnh]
```

### TC-TIB-6426 — Setting ON — chọn Blue chỉ hiện M2; media không gán (M3, V2) không bao giờ xuất hiện
- status_now: passed · bugId: None · Requirement/Rule: C23, R17
- expectedResult:
```
Kết quả mong đợi: Gallery hiện đúng 1 item — M2. M1 (gán Red), V1 (gán Red), M3 và V2 (không gán) đều bị ẩn.
Cách kiểm tra:
Storefront → gallery SDK: đúng 1 item là M2.
Gallery không chứa M1, V1, M3, V2.
```
- actualResult:
```
Cùng assignment/sync như case chọn Red, setting ON. Chọn Blue: gallery đúng 1 slide = M2 (MK-5469-1, tee đen), không có nút prev/next, không có M1, V1, M3, V2. API: GET /api/merchant/campaigns/15252195639537.json => 200, M2 (id 12500) variant_ids=[93498]; M3/V2 variant_ids=[] — khớp.
Instance: https://staging-admin.teeinblue.com/admin/instances/520
Campaign: #3122
Storefront: cp-5428-video-assign-tib-221
[ảnh]
```

### TC-TIB-6447 — Setting ON — đổi variant liên tục Red → Blue → Green, gallery lọc lại đúng theo từng variant
- status_now: passed · bugId: None · Requirement/Rule: C23, R17
- expectedResult:
```
Kết quả mong đợi: Gallery lọc lại đúng mỗi lần đổi variant — Red: {M1, V1}; Blue: {M2}; Green: {V2}; quay lại Red: {M1, V1}. Không bị sót item của variant trước, không bị dồn media, M3 không bao giờ xuất hiện.
Cách kiểm tra:
Storefront → gallery SDK ở Red: đúng 2 item M1, V1.
Gallery ở Blue: đúng 1 item M2.
Gallery ở Green: đúng 1 item V2.
Gallery khi chọn lại Red: đúng 2 item M1, V1 (giống lần đầu).
```
- actualResult:
```
Setting ON; assignment M1→Red, M2→Blue, M3 không gán, V1→Red, V2→Green; đã sync (POST /api/campaigns/3122/sync => 200; lưu ý storefront JSON chỉ cập nhật sau sync). Chọn Red → 2 slide {M1, V1}; Blue → 1 slide {M2}; Green → 1 slide {V2 Vimeo 76979871}; chọn lại Red → {M1, V1} giống lần đầu. M3 không xuất hiện lần nào, không sót item của variant trước. API: GET /api/merchant/campaigns/15252195639537.json => 200, variant_ids: 12499 [93496], 12500 [93498], 12501 [], 12502 [93496], 12503 [93502] — khớp.
Instance: https://staging-admin.teeinblue.com/admin/instances/520
Campaign: #3122
Storefront: cp-5428-video-assign-tib-221
[ảnh][ảnh][ảnh]
```

## Trích nguyên văn 5.1 (bỏ thụt lề 2 khoảng của code fence; = ref.quote của plan)

[TC-TIB-6424]
Setting ON (đã Save, request /api/instances/520/config có show_assigned_variant_images_only=true), assignment M1 → Red, V1 → Red, sync campaign (POST /api/campaigns/3122/sync => 200). Storefront chọn Red: gallery có đúng 2 slide — mockup M1 (qa-mockup_MK-5469-2) và video V1 (YouTube dQw4w9WgXcQ); bấm play thì iframe youtube.com/embed/dQw4w9WgXcQ?autoplay=1 được nạp và phát. API: GET /api/merchant/campaigns/15252195639537.json => 200, campaign_mockups[0] id 12499 variant_ids=[93496], [3] id 12502 type=video variant_ids=[93496] — khớp assignment.
[TC-TIB-6425]
Setting ON; assignment M1→Red, M2→Blue, M3 không gán, V1→Red, V2 không gán; đã sync (POST /api/campaigns/3122/sync => 200). Chọn Red: gallery đúng 2 slide = M1 (MK-5469-2) + V1 (YouTube); không có M2, M3, V2 (track chỉ chứa 2 slide, đã duyệt hết bằng nút next). API: GET /api/merchant/campaigns/15252195639537.json => 200, variant_ids: M1 [93496], M2 [93498], M3 [], V1 [93496], V2 [] — khớp.
[TC-TIB-6426]
Cùng assignment/sync như case chọn Red, setting ON. Chọn Blue: gallery đúng 1 slide = M2 (MK-5469-1, tee đen), không có nút prev/next, không có M1, V1, M3, V2. API: GET /api/merchant/campaigns/15252195639537.json => 200, M2 (id 12500) variant_ids=[93498]; M3/V2 variant_ids=[] — khớp.
[TC-TIB-6447]
Setting ON; assignment M1→Red, M2→Blue, M3 không gán, V1→Red, V2→Green; đã sync (POST /api/campaigns/3122/sync => 200; lưu ý storefront JSON chỉ cập nhật sau sync). Chọn Red → 2 slide {M1, V1}; Blue → 1 slide {M2}; Green → 1 slide {V2 Vimeo 76979871}; chọn lại Red → {M1, V1} giống lần đầu. M3 không xuất hiện lần nào, không sót item của variant trước. API: GET /api/merchant/campaigns/15252195639537.json => 200, variant_ids: 12499 [93496], 12500 [93498], 12501 [], 12502 [93496], 12503 [93502] — khớp.
