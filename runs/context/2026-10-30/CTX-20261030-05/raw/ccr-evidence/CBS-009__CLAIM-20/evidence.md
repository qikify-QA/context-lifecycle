# CBS-009__CLAIM-20

Trích từ Proposal CBS-009 (đóng băng 2026-10-30, file CCR-2026-10-22-assign-video-to-variant.md, sourceTask TIB-221).

## Phần 1a

| `CLAIM-20` | `Phát hiện khi test (BUG-361, bug, KHÔNG phải hành vi đúng) — tạo campaign / bulk create từ PB có video: video sang campaign mới mất URL và thumbnail (preview_url/thumbnail = null), storefront hiện slide trống; duplicate campaign không bị` | `portal (thumbnail vỡ trong picker) · storefront (slide trống) · api` | `KHÔNG CÓ NGUỒN` — chỉ quan sát kèm trong TC-TIB-6436/6439 (2026-10-22), không có case riêng; BUG-361 trạng thái không rõ | `product-base/product-base-campaign-link` | `ADD` |

## Phần 1b

| `CLAIM-20` | `product-base` | `product-base-campaign-link` | `owner/staff (seller, portal)` | `portal, storefront, api` | `không có` |

## Phần 5.1

### CLAIM-20

- **Loại nguồn** (đúng 1): `KHÔNG CÓ NGUỒN`
- **Locator:** `BUG-361 (ghi trong TC-TIB-6436, TC-TIB-6439)`
- **Link:** `không có — Testlane task TIB-221 (QA hub, project TIB), case không có URL công khai`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-22`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `test-executor [AI] (agent chạy thay QA chienct, Testlane task TIB-221)`
- **Trích nguyên văn:**
  ```
  [TC-TIB-6436] Lưu ý: 2 video trong campaign mới mất URL/thumbnail (preview_url, thumbnail = null, thumbnail vỡ) — đã tạo BUG-361 (High) theo task TIB-221.
  [TC-TIB-6439] Lưu ý: video trong campaign bulk create mất URL/thumbnail (merchant JSON của #3145: mockup 12566/12567 type "image", url/preview_url/thumbnail null; storefront chỉ hiện slide trống) — thuộc BUG-361 (High).
  ```
- **File đính kèm cho claim này:** `không có`

## Testlane (list_test_cases TIB-221, read-only 2026-10-30; status hiện tại không dùng làm căn cứ — Testlane không lưu ngày chạy từng case, ngày/lượt lấy từ CCR)

### TC-TIB-6436 — Import mockup từ Product Base sang campaign — assignment video được giữ
- status_now: passed · bugId: None · Requirement/Rule: C14, R11
- expectedResult:
```
Kết quả mong đợi: Campaign kế thừa đúng assignment video từ PB — Red có V1, Blue có V2; không phải gán lại tay.
Cách kiểm tra:
Campaign → Mockup assignments (Group by Variant): Red → V1; Blue → V2.
Network → response khi import/tạo campaign: dữ liệu assignment trả về chứa mapping V1-Red và V2-Blue.
Reload trang → assignment vẫn còn.
```
- actualResult:
```
PB #3415: gán V1 → Red, V2 → Blue, Save (POST /api/graphql AssignMockupVariantIds => 200: mockup 8169 variant_ids=[93496] Red; mockup 8170 variant_ids=[93498] Blue). Tạo campaign mới #3143 by Product Base và thêm PB #3415 (POST /api/campaign-mockups/generate => 204, /campaign-products/4675/campaign-mockups/sync => 204). Mockup assignments của #3143: Group by Variant — Red "1 mockup", Blue "1 mockup", Green "Not assigned yet"; Group by Mockup — dòng video thứ 4 → Red - S, dòng video thứ 5 → Blue - S; GraphQL AssignMockupsModal trả variant_ids [93496] và [93498] cho 2 video. Reload vẫn còn. Assignment được kế thừa đúng, không phải gán lại.
Lưu ý: 2 video trong campaign mới mất URL/thumbnail (preview_url, thumbnail = null, thumbnail vỡ) — đã tạo BUG-361 (High) theo task TIB-221.
Instance: https://staging-admin.teeinblue.com/admin/instances/520
Product base: #3415
Campaign: #3143 "CP-5428 PB inherit (TIB-221)"
[ảnh][ảnh]
```

### TC-TIB-6439 — Bulk create campaign từ Product Base đã gán video — assignment video được giữ
- status_now: passed · bugId: None · Requirement/Rule: C14, R11
- expectedResult:
```
Kết quả mong đợi: Cả 2 campaign được bulk create đều kế thừa assignment video từ PB — Red → V1; Blue → V2.
Cách kiểm tra:
Campaign 1 → Mockup assignments: Red → V1; Blue → V2.
Campaign 2 → Mockup assignments: Red → V1; Blue → V2.
Network → response bulk create: dữ liệu assignment video có trong từng campaign mới.
```
- actualResult:
```
PB #3415 đã gán V1 → Red, V2 → Blue (xem TC-6436). Bulk creator (nprice1, artwork #5257, PB #3415): tạo 2 campaign "CP-5428 BULK-A (TIB-221)" #3144 và "CP-5428 BULK-B (TIB-221)" #3145. API: POST /api/artworks/5257/campaigns => 201 và POST /api/campaigns/3144/publish => 200; POST /api/artworks/5257/campaigns => 201 và POST /api/campaigns/3145/publish => 200. Mockup assignments của cả 2 campaign, Group by Variant: Red "1 mockup" (video), Blue "1 mockup" (video), Green "Not assigned yet" — cả hai kế thừa Red → V1, Blue → V2.
Lưu ý: video trong campaign bulk create mất URL/thumbnail (merchant JSON của #3145: mockup 12566/12567 type "image", url/preview_url/thumbnail null; storefront chỉ hiện slide trống) — thuộc BUG-361 (High).
Instance: https://staging-admin.teeinblue.com/admin/instances/520
Campaign: #3144, #3145
[ảnh][ảnh]
```
