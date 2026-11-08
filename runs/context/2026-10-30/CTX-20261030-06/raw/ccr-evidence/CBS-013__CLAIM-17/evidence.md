# CBS-013__CLAIM-17

Trích từ Proposal CBS-013 (đóng băng 2026-10-30, file CCR-2026-10-28-campaign-payload-v2-cache.md, sourceTask TIB-257).

## Phần 1a

| `CLAIM-17` | Metafield campaign data trên Shopify không còn merchant setting (config, has_subscription, shop_name…) | api (metafield Shopify) | `KHÔNG CÓ NGUỒN` — chỉ có mô tả dev (comment 55763), QA chưa đọc metafield | campaign (publish); sdk/storefront-buyer-facing | ADD |

## Phần 1b

| `CLAIM-17` | `campaign` | MỚI: shopify-campaign-metafield | owner / staff (publish) | api | không có |

## Phần 5.1

### CLAIM-17

- **Loại nguồn** (đúng 1): `KHÔNG CÓ NGUỒN`
- **Locator:** `Jira TIB-5203 comment 55763 (Rule under test; Not for QA)`
- **Link:** `https://ownego.atlassian.net/browse/TIB-5203`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-27`
- **Người viết / người xác nhận:** `tinhpt (dev)`
- **Trích nguyên văn:**
  ```
  "no merchant setting leaks into the product's Shopify metafield." "The Shopify metafield job sends the campaign data without any
  merchant setting fields (`config`, `has_subscription`, `shop_name`, ...): `UpdateCampaignDataMetafieldTest`."
  ```
- **File đính kèm cho claim này:** `không có`

## Testlane (list_test_cases TIB-257, read-only 2026-10-30; status hiện tại không dùng làm căn cứ — Testlane không lưu ngày chạy từng case, ngày/lượt lấy từ CCR)

Không có test case nào gắn với claim này (chỉ nguồn Jira).
