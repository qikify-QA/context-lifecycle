# CBS-011__CLAIM-11

Trích từ Proposal CBS-011 (đóng băng 2026-10-30, file CCR-2026-10-28-conditional-setting-hide-action.md).

## Phần 1a

| `CLAIM-11` | TIB-5558 — layer đang bị Hide có Required không chặn Add to cart; giá trị đã nhập trước khi layer bị Hide không vào payload customization, localStorage, line-item properties, order, print file | storefront (Add to cart, localStorage teeinblue-customizations) · api (/cart.js, POST customization) | `test_case` — PASS TC-TIB-7338, TC-TIB-7339 2026-10-28 staging [AI] — build: staging @ 2026-10-28 retest sau SDK app-v2.js 03:01:11 GMT — sau lần TIB-5558 giao QA cuối (2026-10-13); build hash: không rõ (QA không có quyền repo) | order / place-personalized-order-storefront; sdk / storefront-buyer-facing KB-007 (required cha-con), KB-009 (line-item props — khớp) | `ADD` |

## Phần 1b

| `CLAIM-11` | `order` | `place-personalized-order-storefront` | guest buyer | storefront | `KB-007`, `KB-009` (sdk) |

## Phần 5.1

### CLAIM-11

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** `TC-TIB-7338, TC-TIB-7339 (retest)`
- **Link:** `https://nprice1.myshopify.com/products/tib-5558-cp-hide-req · https://staging-portal.teeinblue.com/orders/4811`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-28`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `test-executor agent [AI]`
- **Trích nguyên văn:**
  ```
  TC-TIB-7338: "CP-HIDE-REQ: Pet 1 Type = Cat → field "QUOTE DOG*" (Required, layer-620027) ẩn; bấm
  Add to cart để trống → thành công, không có lỗi required; /cart.js tăng từ 6 lên 7 item"
  TC-TIB-7339: "Giá trị "GOOD DOG" nhập khi layer đang hiện (Dog) rồi bị Hide (đổi sang Cat) không đi
  vào line-item properties, order và print file. … Line-item properties trong /cart.js: chỉ
  _customization_id, _customization_image, _tib_fulfilled_sku, _tib_design_link_1, không có dòng cho
  "QUOTE DOG". … Print file item này (…-14291.png, 1400x1400) đo được 0 pixel không trong suốt —
  không có layer."
  ```
- **File đính kèm cho claim này:** `ảnh bằng chứng gắn trong actualResult của 2 case trên Testlane`

## Testlane actualResult (list_test_cases TIB-231, read-only 2026-10-30; status hiện tại không dùng làm căn cứ)

TC-TIB-7338 — actualResult: CP-HIDE-REQ: Pet 1 Type = Cat → field "QUOTE DOG*" (Required, layer-620027) ẩn; bấm Add to cart để trống → thành công, không có lỗi required; /cart.js tăng từ 6 lên 7 item, có item của product 15271345520881 (CP-HIDE-REQ).
API: POST /api/merchant/shopify/customization → 201, payload {"5893":"template-620028","layer-620026":46703,"artwork-5893":17479,...} — không có key layer "QUOTE DOG".
localStorage teeinblue-customizations entry 15271345520881 = {"5893":"template-620028","layer-620026":46703,"platform_linked_id":"67355240136945"} — chỉ có Pet 1 Type = Cat.
Link: CP-HIDE-REQ.
TC-TIB-7339 — actualResult: Giá trị "GOOD DOG" nhập khi layer đang hiện (Dog) rồi bị Hide (đổi sang Cat) không đi vào line-item properties, order và print file.
Sau ATC, localStorage teeinblue-customizations entry 15271340703985 = {"5868":"template-600002","layer-600000":46703,"platform_linked_id":"67355131248881"} — không có "GOOD DOG". Payload POST /api/merchant/shopify/customization chỉ có layer-600000: 46703.
Line-item properties trong /cart.js: chỉ _customization_id, _customization_image, _tib_fulfilled_sku, _tib_design_link_1, không có dòng cho "QUOTE DOG".
Order Shopify #1120 (Confirmation #M550UJ78H) → portal orders/4811, item #7628 (customization 12883719-1d5b-4ac1-805e-48f1f5d62c11): View customization chỉ có Pet 1 Type = Cat, không có QUOTE DOG.
Print file item này (12883719-…-14291.png, 1400x1400) đo được 0 pixel không trong suốt — không có layer. Đúng mong đợi.
Instance: 520. Campaign CP-HIDE-1 #3252.
