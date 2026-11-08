# CBS-013__CLAIM-04

Trích từ Proposal CBS-013 (đóng băng 2026-10-30, file CCR-2026-10-28-campaign-payload-v2-cache.md, sourceTask TIB-257).

## Phần 1a

| `CLAIM-04` | SDK lấy platform product qua GET /api/merchant/campaigns/{shopify product id}.json?shop=…, không phải /api/merchant/platform-products/{uuid}.json như QA plan dev ghi | api · storefront | `KHÔNG CÓ NGUỒN` — chỉ là network capture của agent (TC-TIB-7391, TC-TIB-7395, 2026-10-28), lệch với comment dev 55763, chưa ai xác nhận | sdk/storefront-buyer-facing (KB-013 nói endpoint campaigns/{platformProductId}.json cho campaign) | ADD |

## Phần 1b

| `CLAIM-04` | `sdk` | `storefront-buyer-facing` | guest buyer | api | KB-013 (liên quan, không thay thế) |

## Phần 5.1

### CLAIM-04

- **Loại nguồn** (đúng 1): `KHÔNG CÓ NGUỒN`
- **Locator:** `Testlane TIB-257 · TC-TIB-7391, TC-TIB-7395; Jira TIB-5203 comment 55763 bước 4`
- **Link:** `https://qa-hub.ownego.com/test-cases?task=TIB-257`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-28`
- **Người viết / người xác nhận:** `test-executor [AI]`
- **Trích nguyên văn:**
  ```
  TC-TIB-7391 actualResult: "API: SDK gọi GET /api/merchant/campaigns/9452881084657.json?shop=… (theo Shopify product
  id, KHÔNG phải platform-products/<uuid>.json như case ghi) => 200, resource_type="platform_product"."
  Comment 55763: "find the campaign request (`/api/merchant/campaigns/<id>.json?shop=...` or
  `/api/merchant/platform-products/<uuid>.json?shop=...`)"
  ```
- **File đính kèm cho claim này:** `teeinblue/TIB automation/qa-output/api-observations_TIB-257.json`

## Testlane (list_test_cases TIB-257, read-only 2026-10-30; status hiện tại không dùng làm căn cứ — Testlane không lưu ngày chạy từng case, ngày/lượt lấy từ CCR)

Case: TC-TIB-7391 (passed), TC-TIB-7395 (passed)
