# CBS-009__CLAIM-15

Trích từ Proposal CBS-009 (đóng băng 2026-10-30, file CCR-2026-10-22-assign-video-to-variant.md, sourceTask TIB-221).

## Phần 1a

| `CLAIM-15` | `TIB-5428 / C7 — variant chỉ gán video (0 mockup) → Shopify variant image để trống` | `api (sync/publish Shopify) · storefront (/products/<handle>.json)` | `KHÔNG CÓ NGUỒN` — TC-TIB-6433 actualResult ghi Fail 2026-10-22, BUG-362 (variant chỉ-video vẫn nhận mockup đầu tiên làm variant image); status passed không ngày | `campaign (sync Shopify); local mockup.md → TIB-4283` | `ADD` |

## Phần 1b

| `CLAIM-15` | `campaign` | `MỚI: campaign-shopify-media-sync` | `owner/staff (seller) — hiệu ứng trên Shopify product` | `api, storefront` | `không có` |

## Phần 5.1

### CLAIM-15

- **Loại nguồn** (đúng 1): `KHÔNG CÓ NGUỒN`
- **Locator:** `TC-TIB-6433 + BUG-362`
- **Link:** `không có — Testlane task TIB-221 (QA hub, project TIB), case không có URL công khai`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-22`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `test-executor [AI] (agent chạy thay QA chienct, Testlane task TIB-221)`
- **Trích nguyên văn:**
  ```
  Fail — variant chỉ gán video (0 mockup) vẫn có Shopify variant image là mockup đầu tiên, không để trống.
  Actual: campaign clone #3146 publish mới lên Nprice1 (POST /api/campaigns/3146/publish => 200): Green → chỉ video (Group by Variant: Green "1 mockup"), Red → M1 + M2. Shopify (đọc qua /products/cp-5428-video-assign-tib-221-copy-copy.json): variant Green / S image_id = 96721 = ảnh đầu tiên của product (M1), giống Red. Tái hiện thêm trên #3142 (sync lại sau khi đổi Green sang chỉ-video): Green vẫn image_id = ảnh M1.
  Expected: Shopify variant image của Green để trống (không có ảnh, không phải video).
  Đúng: ảnh variant không phải video; media product có external video (VID 22439234) và gallery SDK chọn Green hiện đúng 1 slide video.
  [Jira TIB-5428 description, mục SDK] When a variant has assigned videos but no assigned mockups: Shopify variant image remains empty. SDK gallery displays the assigned videos for the selected variant.
  ```
- **File đính kèm cho claim này:** `không có`

## Testlane (list_test_cases TIB-221, read-only 2026-10-30; status hiện tại không dùng làm căn cứ — Testlane không lưu ngày chạy từng case, ngày/lượt lấy từ CCR)

### TC-TIB-6433 — Variant chỉ gán video → Shopify variant image để trống, gallery SDK vẫn hiện video
- status_now: passed · bugId: None · Requirement/Rule: C7, R3, R4
- expectedResult:
```
Kết quả mong đợi: Shopify variant image của Green để trống (không có ảnh, và tuyệt đối không phải video); gallery SDK trên storefront vẫn hiển thị video V1 đã gán.
Cách kiểm tra:
Shopify admin → variant Green: ô ảnh variant trống, không gán ảnh/video nào.
Network → request sync campaign: payload variant Green không chứa id media của video làm variant image.
Storefront → gallery SDK ở variant Green: có item video V1.
```
- actualResult:
```
Fail — variant chỉ gán video (0 mockup) vẫn có Shopify variant image là mockup đầu tiên, không để trống.
Actual: campaign clone #3146 publish mới lên Nprice1 (POST /api/campaigns/3146/publish => 200): Green → chỉ video (Group by Variant: Green "1 mockup"), Red → M1 + M2. Shopify (đọc qua /products/cp-5428-video-assign-tib-221-copy-copy.json): variant Green / S image_id = 96721 = ảnh đầu tiên của product (M1), giống Red. Tái hiện thêm trên #3142 (sync lại sau khi đổi Green sang chỉ-video): Green vẫn image_id = ảnh M1.
Expected: Shopify variant image của Green để trống (không có ảnh, không phải video).
Đúng: ảnh variant không phải video; media product có external video (VID 22439234) và gallery SDK chọn Green hiện đúng 1 slide video.
Đã tạo bug kèm screenshot. Ghi chú: Shopify admin không dùng được (không đi OAuth), đọc bằng storefront .json và Storefront API.
Instance: https://staging-admin.teeinblue.com/admin/instances/520
Campaign: #3146 "CP-5428 Video assign (TIB-221) copy copy" (clone của #3122 qua #3142)
Storefront: cp-5428-video-assign-tib-221-copy-copy
[ảnh][ảnh]
```
