# CBS-013__CLAIM-01

Trích từ Proposal CBS-013 (đóng băng 2026-10-30, file CCR-2026-10-28-campaign-payload-v2-cache.md, sourceTask TIB-257).

## Phần 1a

| `CLAIM-01` | TIB-5203 — response GET /api/merchant/campaigns/{id}.json?shop=… của campaign và platform product có thêm resource_type ("campaign" / "platform_product"), vẫn giữ config, has_subscription, is_development, is_plus, sku_enabled, shop_name | api | `test_case` — PASS TC-TIB-7507 2026-10-28 staging [AI] — build: staging @ 2026-10-28 10:30 UTC — sau lần TIB-5203 giao QA cuối (2026-10-27) và sau commit 8731f3a; Jira Done 2026-10-29, 2 PR merged 2026-10-29 (sau ngày chạy); không có Fix Version; build hash: không rõ (QA không có quyền repo) | sdk/storefront-buyer-facing (endpoint bootstrap, KB-013); checklist sdk/checklists/storefront-buyer-facing.json | ADD |

## Phần 1b

| `CLAIM-01` | `sdk` | `storefront-buyer-facing` | guest buyer (storefront SDK đọc) | api | KB-013 (liên quan, không thay thế) |

## Phần 5.1

### CLAIM-01

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** `Testlane TIB-257 · TC-TIB-7507 (bổ sung: TC-TIB-7394, TC-TIB-7395 lượt đầu)`
- **Link:** `https://qa-hub.ownego.com/test-cases?task=TIB-257`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-28`
- **Người viết / người xác nhận:** `test-executor [AI] (QA agent), task của chienct (QA)`
- **Trích nguyên văn:**
  ```
  TC-TIB-7507 actualResult: "Chạy 2026-10-28 ~10:30 UTC trên staging [AI], gọi thẳng API (curl) với tham số v
  chưa từng dùng → CF-Cache-Status: MISS ở cả 4 response. … Field SDK cần vẫn đủ ở cả 4: resource_type, config,
  has_subscription, is_development, is_plus, sku_enabled, shop_name, global_options (top-level)."
  TC-TIB-7395 actualResult (lượt đầu): "GET /api/merchant/campaigns/9452881084657.json?shop=nprice1.myshopify.com
  … => 200: resource_type="platform_product", id=602, … đủ 6 field merchant: config, has_subscription=true,
  is_development=true, is_plus=false, sku_enabled=true, shop_name="Nprice1"."
  ```
- **File đính kèm cho claim này:** `không có`

## Testlane (list_test_cases TIB-257, read-only 2026-10-30; status hiện tại không dùng làm căn cứ — Testlane không lưu ngày chạy từng case, ngày/lượt lấy từ CCR)

Case: TC-TIB-7394 (passed), TC-TIB-7395 (passed), TC-TIB-7507 (passed)
