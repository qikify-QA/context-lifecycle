# CBS-013__CLAIM-10

Trích từ Proposal CBS-013 (đóng băng 2026-10-30, file CCR-2026-10-28-campaign-payload-v2-cache.md, sourceTask TIB-257).

## Phần 1a

| `CLAIM-10` | Campaign: ATC + checkout có giá trị GO → cart, order, design đúng | storefront · portal | `KHÔNG CÓ NGUỒN` — PASS TC-TIB-7405 2026-10-28 ~06:00 UTC [AI] trước redeploy (payload đổi sau đó), chưa chạy lại | order/place-personalized-order-storefront | ADD |

## Phần 1b

| `CLAIM-10` | `order` | `place-personalized-order-storefront` | guest buyer | storefront | không có |

## Phần 5.1

### CLAIM-10

- **Loại nguồn** (đúng 1): `KHÔNG CÓ NGUỒN`
- **Locator:** `Testlane TIB-257 · TC-TIB-7405; order #1121 (portal orders/4812)`
- **Link:** `https://qa-hub.ownego.com/test-cases?task=TIB-257`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-28`
- **Người viết / người xác nhận:** `test-executor [AI]`
- **Trích nguyên văn:**
  ```
  TC-TIB-7405: "Campaign CP-CACHE: nhập "ORDER5203", GO-A "Blue", Add to cart rồi checkout Bogus … → order Shopify #1121 = portal
  orders/4812, thuộc campaign #3270 "TIB5203 CP-CACHE" (item 7629). … "View customization" trong order: Name=ORDER5203, Color A1
  (global-option-1125)=Blue. File design (…-14184.png) render "ORDER5203" + clipart, không phải "NAME""
  ```
- **File đính kèm cho claim này:** `không có`

## Testlane (list_test_cases TIB-257, read-only 2026-10-30; status hiện tại không dùng làm căn cứ — Testlane không lưu ngày chạy từng case, ngày/lượt lấy từ CCR)

Case: TC-TIB-7405 (passed)
