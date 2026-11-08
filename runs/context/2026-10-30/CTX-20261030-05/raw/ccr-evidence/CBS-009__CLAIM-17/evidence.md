# CBS-009__CLAIM-17

Trích từ Proposal CBS-009 (đóng băng 2026-10-30, file CCR-2026-10-22-assign-video-to-variant.md, sourceTask TIB-221).

## Phần 1a

| `CLAIM-17` | `TIB-5428 / C5 — sync campaign: video từ URL vẫn vào Shopify product media như cũ, không variant Shopify nào gán video; mapping variant-video chỉ lưu phía Teeinblue` | `api (POST /api/campaigns/<id>/sync) · storefront (Storefront API product media)` | `KHÔNG CÓ NGUỒN` — TC-TIB-6435 đạt với YouTube dQw4w9WgXcQ và Vimeo 22439234, nhưng Vimeo 76979871 không vào Shopify media và sync #3122 báo lỗi chung; chưa rõ lỗi cũ hay mới | `campaign (sync Shopify)` | `ADD` |

## Phần 1b

| `CLAIM-17` | `campaign` | `MỚI: campaign-shopify-media-sync` | `owner/staff (seller) — hiệu ứng trên Shopify product` | `api, storefront` | `không có` |

## Phần 5.1

### CLAIM-17

- **Loại nguồn** (đúng 1): `KHÔNG CÓ NGUỒN`
- **Locator:** `TC-TIB-6435`
- **Link:** `không có — Testlane task TIB-221 (QA hub, project TIB), case không có URL công khai`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-22`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `test-executor [AI] (agent chạy thay QA chienct, Testlane task TIB-221)`
- **Trích nguyên văn:**
  ```
  Sync campaign lên Nprice1 (POST /api/campaigns/3122/sync => 200, /3142/sync => 200). Storefront API (Shopify product media): #3122 có ExternalVideo YOUTUBE dQw4w9WgXcQ (V1) + 3 ảnh; clone #3142 có ExternalVideo VIMEO 22439234 + 3 ảnh — video từ URL vẫn vào product media như flow hiện tại. Variant Shopify chỉ có image_id (ảnh), không variant nào gán video (video không bao giờ là variant image). Mapping variant↔video vẫn còn đủ ở Mockup assignments sau sync và merchant JSON (campaign_mockups.variant_ids, vd video 12502 variant_ids=[93496]), request sync chỉ gửi config (instance_id + các cờ description/images/variants…), không mang mapping.
  Ghi chú: V2 fixture (https://vimeo.com/76979871) không vào được Shopify media và làm publish #3122 kết thúc với "Can not upload images to shopify" (URL khác https://vimeo.com/22439234 sync bình thường) — nghi URL fixture bị Shopify từ chối, ngoài phạm vi feature; app báo lỗi chung chung, không nêu rõ video nào hỏng.
  ```
- **File đính kèm cho claim này:** `không có`

## Testlane (list_test_cases TIB-221, read-only 2026-10-30; status hiện tại không dùng làm căn cứ — Testlane không lưu ngày chạy từng case, ngày/lượt lấy từ CCR)

### TC-TIB-6435 — Sync campaign lên Shopify — video từ URL vẫn vào product media, mapping variant-video lưu riêng phía Teeinblue
- status_now: passed · bugId: None · Requirement/Rule: C5, R5
- expectedResult:
```
Kết quả mong đợi: Video V1 và V2 vẫn được sync vào Shopify product media như flow hiện tại; không có variant nào ở Shopify được gán video — mapping variant↔video chỉ tồn tại phía Teeinblue cho SDK dùng.
Cách kiểm tra:
Shopify admin → product Media: có V1 và V2.
Shopify admin → từng variant Red/Blue/Green: không có variant nào gán video.
Network → request sync campaign: phần media gửi lên Shopify không mang mapping variant-video; mapping vẫn còn đủ ở view Mockup assignments sau khi sync.
```
- actualResult:
```
Sync campaign lên Nprice1 (POST /api/campaigns/3122/sync => 200, /3142/sync => 200). Storefront API (Shopify product media): #3122 có ExternalVideo YOUTUBE dQw4w9WgXcQ (V1) + 3 ảnh; clone #3142 có ExternalVideo VIMEO 22439234 + 3 ảnh — video từ URL vẫn vào product media như flow hiện tại. Variant Shopify chỉ có image_id (ảnh), không variant nào gán video (video không bao giờ là variant image). Mapping variant↔video vẫn còn đủ ở Mockup assignments sau sync và merchant JSON (campaign_mockups.variant_ids, vd video 12502 variant_ids=[93496]), request sync chỉ gửi config (instance_id + các cờ description/images/variants…), không mang mapping.
Ghi chú: V2 fixture (https://vimeo.com/76979871) không vào được Shopify media và làm publish #3122 kết thúc với "Can not upload images to shopify" (URL khác https://vimeo.com/22439234 sync bình thường) — nghi URL fixture bị Shopify từ chối, ngoài phạm vi feature; app báo lỗi chung chung, không nêu rõ video nào hỏng.
Instance: https://staging-admin.teeinblue.com/admin/instances/520
Campaign: #3122, #3142
[ảnh]
```
