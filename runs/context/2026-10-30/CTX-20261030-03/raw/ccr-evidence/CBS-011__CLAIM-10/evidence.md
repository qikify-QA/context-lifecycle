# CBS-011__CLAIM-10

Trích từ Proposal CBS-011 (đóng băng 2026-10-30, file CCR-2026-10-28-conditional-setting-hide-action.md).

## Phần 1a

| `CLAIM-10` | TIB-5558 — Toggle layer và Additional Option làm nguồn điều kiện cho Hide, đúng chiều, payload chỉ gửi layer đang hiện | storefront · api (POST customization) | `test_case` — PASS TC-TIB-7336, TC-TIB-7337 2026-10-28 staging [AI] — build: staging @ 2026-10-28 retest sau SDK app-v2.js 03:01:11 GMT — sau lần TIB-5558 giao QA cuối (2026-10-13); build hash: không rõ (QA không có quyền repo) | sdk / storefront-buyer-facing; artwork / conditional-setting-config KB-064 (toggle, additional-option là nguồn — khớp) | `ADD` |

## Phần 1b

| `CLAIM-10` | `sdk` | `storefront-buyer-facing` | guest buyer | storefront | `KB-064` (artwork) |

## Phần 5.1

### CLAIM-10

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** `TC-TIB-7336, TC-TIB-7337 (retest)`
- **Link:** `https://nprice1.myshopify.com/products/tib-5558-cp-hide-toggle · https://nprice1.myshopify.com/products/tib-5558-cp-hide-addopt`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-28`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `test-executor agent [AI]`
- **Trích nguyên văn:**
  ```
  TC-TIB-7336: "CP-HIDE-TOGGLE: bật toggle "Add name" (layer-620039 checked, khớp điều kiện Hide) →
  field và layer "QUOTE DOG" (layer-620040) ẩn; tắt toggle → hiện lại. Form và preview khớp nhau. …
  layer chỉ được gửi khi đang hiện."
  TC-TIB-7337: "CP-HIDE-ADDOPT: Gift wrap = Yes (khớp) → field và layer "QUOTE DOG" (layer-620043) ẩn;
  Gift wrap = No → hiện."
  ```
- **File đính kèm cho claim này:** `ảnh bằng chứng gắn trong actualResult của 2 case trên Testlane`

## Testlane actualResult (list_test_cases TIB-231, read-only 2026-10-30; status hiện tại không dùng làm căn cứ)

TC-TIB-7336 — actualResult: CP-HIDE-TOGGLE: bật toggle "Add name" (layer-620039 checked, khớp điều kiện Hide) → field và layer "QUOTE DOG" (layer-620040) ẩn; tắt toggle → hiện lại. Form và preview khớp nhau. API khi Add to cart (toggle tắt, nhập "NAME"): POST /api/merchant/shopify/customization payload {"5896":"template-620041","layer-620039":false,"layer-620040":"NAME","artwork-5896":17482,...} — layer chỉ được gửi khi đang hiện. Link: CP-HIDE-TOGGLE.
TC-TIB-7337 — actualResult: CP-HIDE-ADDOPT: Gift wrap = Yes (khớp) → field và layer "QUOTE DOG" (layer-620043) ẩn; Gift wrap = No → hiện. API khi Add to cart (No, nhập "GIFT"): POST /api/merchant/shopify/customization payload {"5897":"template-620044","layer-620042":46705,"layer-620043":"GIFT","artwork-5897":17483,...} — đúng giá trị Gift wrap và layer đang hiện. Link: CP-HIDE-ADDOPT.
