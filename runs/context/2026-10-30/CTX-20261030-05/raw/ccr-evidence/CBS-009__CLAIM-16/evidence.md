# CBS-009__CLAIM-16

Trích từ Proposal CBS-009 (đóng băng 2026-10-30, file CCR-2026-10-22-assign-video-to-variant.md, sourceTask TIB-221).

## Phần 1a

| `CLAIM-16` | `TIB-5428 / C13 — variant gán video + mockup, video đứng đầu thứ tự assignment → Shopify variant image = mockup gán đầu tiên, video bị bỏ qua` | `api (sync Shopify) · storefront` | `test_case` — PASS TC-TIB-6434 2026-10-22 staging [AI] — build: staging @ 2026-10-22 (sau lần giao QA cuối 2026-10-15) | `campaign (sync Shopify); local mockup.md → TIB-4283` | `ADD` |

## Phần 1b

| `CLAIM-16` | `campaign` | `MỚI: campaign-shopify-media-sync` | `owner/staff (seller) — hiệu ứng trên Shopify product` | `api, storefront` | `không có` |

## Phần 5.1

### CLAIM-16

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** `TC-TIB-6434`
- **Link:** `không có — Testlane task TIB-221 (QA hub, project TIB), case không có URL công khai`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-22`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `test-executor [AI] (agent chạy thay QA chienct, Testlane task TIB-221)`
- **Trích nguyên văn:**
  ```
  Làm trên clone #3142 vì campaign gốc #3122 publish lỗi (xem ghi chú). List media: video đứng đầu rồi M1, M2; Red → video + M1 + M2 (Group by Variant: Red "3 mockups", thứ tự video → M1 → M2, không bị hệ thống tự sắp lại). Update (POST /api/campaigns/3142/sync => 200). Shopify (/products/cp-5428-video-assign-tib-221-copy.json): variant Red / S image_id = 95889 = ảnh đầu tiên của product = M1 (6ad9a4d9…); video nằm trong product media (ExternalVideo Vimeo 22439234), không phải variant image. Variant image = mockup gán đầu tiên, video bị bỏ qua dù đứng trước M1.
  Ghi chú: trên #3122, fixture V2 (https://vimeo.com/76979871) làm mỗi lần sync kết thúc với "Error when publishing … Can not upload images to shopify" và không có variant image nào được gán; khi dùng URL Vimeo khác (22439234) trên clone thì publish thành công. Nghi URL Vimeo fixture bị Shopify từ chối, không phải lỗi của tính năng. Shopify admin không dùng được (không đi OAuth) nên đọc qua storefront .json.
  ```
- **File đính kèm cho claim này:** `không có`

## Testlane (list_test_cases TIB-221, read-only 2026-10-30; status hiện tại không dùng làm căn cứ — Testlane không lưu ngày chạy từng case, ngày/lượt lấy từ CCR)

### TC-TIB-6434 — Variant gán cả video và mockup, video đứng đầu thứ tự assignment → variant image là mockup gán đầu tiên
- status_now: passed · bugId: None · Requirement/Rule: C13, R10
- expectedResult:
```
Kết quả mong đợi: Shopify variant image của Red = mockup M1 (mockup gán đầu tiên); video V1 bị bỏ qua dù đứng trước M1 trong thứ tự assignment.
Cách kiểm tra:
Shopify admin → variant Red: ảnh variant là M1.
Network → request sync campaign: variant image id của Red trỏ tới media M1, không trỏ tới V1.
Campaign editor → Mockup assignments của Red: thứ tự vẫn là V1, M1, M2 (không bị hệ thống tự sắp lại).
```
- actualResult:
```
Làm trên clone #3142 vì campaign gốc #3122 publish lỗi (xem ghi chú). List media: video đứng đầu rồi M1, M2; Red → video + M1 + M2 (Group by Variant: Red "3 mockups", thứ tự video → M1 → M2, không bị hệ thống tự sắp lại). Update (POST /api/campaigns/3142/sync => 200). Shopify (/products/cp-5428-video-assign-tib-221-copy.json): variant Red / S image_id = 95889 = ảnh đầu tiên của product = M1 (6ad9a4d9…); video nằm trong product media (ExternalVideo Vimeo 22439234), không phải variant image. Variant image = mockup gán đầu tiên, video bị bỏ qua dù đứng trước M1.
Ghi chú: trên #3122, fixture V2 (https://vimeo.com/76979871) làm mỗi lần sync kết thúc với "Error when publishing … Can not upload images to shopify" và không có variant image nào được gán; khi dùng URL Vimeo khác (22439234) trên clone thì publish thành công. Nghi URL Vimeo fixture bị Shopify từ chối, không phải lỗi của tính năng. Shopify admin không dùng được (không đi OAuth) nên đọc qua storefront .json.
Instance: https://staging-admin.teeinblue.com/admin/instances/520
Campaign: #3142
Storefront: cp-5428-video-assign-tib-221-copy
[ảnh]
```
