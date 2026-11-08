# CBS-011__CLAIM-12

Trích từ Proposal CBS-011 (đóng băng 2026-10-30, file CCR-2026-10-28-conditional-setting-hide-action.md).

## Phần 1a

| `CLAIM-12` | TIB-5558 — preview, mockup và print file của order áp Hide giống storefront (item khớp Hide không có layer, item không khớp in đủ) | db/render (order design PNG, mockup, customization preview) · portal (order detail) | `test_case` — PASS TC-TIB-7340 2026-10-28 staging [AI] — build: staging @ 2026-10-28 retest sau SDK app-v2.js 03:01:11 GMT — sau lần TIB-5558 giao QA cuối (2026-10-13); build hash: không rõ (QA không có quyền repo) | order (chưa có feature render print file trong canon) | `ADD` |

## Phần 1b

| `CLAIM-12` | `order` | MỚI: order-design-conditional-render | store owner / staff (xem order) | db | không có |

## Phần 5.1

### CLAIM-12

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** `TC-TIB-7340 (retest), order #1120`
- **Link:** `https://staging-portal.teeinblue.com/orders/4811`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-28`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `test-executor agent [AI]`
- **Trích nguyên văn:**
  ```
  "Order áp điều kiện Hide đúng chiều và khớp storefront; print file và preview không còn trống —
  BUG-430 không tái hiện trên lượt này. … Item #7628 (Pet 1 Type = Cat, khớp Hide): customization chỉ
  có layer-600000 = Cat; print file … 0 pixel đục = không có layer; preview … chỉ có áo + khung PRINT
  AREA, không có chữ. Item #7627 (Pet 1 Type = Dog, QUOTE DOG = "GOOD DOG"): … print file … có 9.834
  pixel đục, hiện chữ "GOOD DOG"; preview … hiện "GOOD DOG" trên mockup … Khớp cái buyer thấy trên
  storefront (Cat → ẩn, Dog → hiện)."
  ```
- **File đính kèm cho claim này:** `ảnh bằng chứng gắn trong actualResult của TC-TIB-7340 trên Testlane`

## Testlane actualResult (list_test_cases TIB-231, read-only 2026-10-30; status hiện tại không dùng làm căn cứ)

TC-TIB-7340 — actualResult: Order áp điều kiện Hide đúng chiều và khớp storefront; print file và preview không còn trống — BUG-430 không tái hiện trên lượt này.
Đặt 1 đơn qua Bogus gateway, 2 line item CP-HIDE-1: #1120 (Confirmation #M550UJ78H) → orders/4811.
Item #7628 (Pet 1 Type = Cat, khớp Hide): customization chỉ có layer-600000 = Cat; print file designs/12883719-1d5b-4ac1-805e-48f1f5d62c11/…-14291.png (1400x1400) 0 pixel đục = không có layer; preview customizations/12883719-….jpg chỉ có áo + khung PRINT AREA, không có chữ.
Item #7627 (Pet 1 Type = Dog, QUOTE DOG = "GOOD DOG"): customization có layer-600001 = "GOOD DOG" (View customization hiển thị QUOTE DOG = GOOD DOG); print file designs/48b955c4-feff-4f86-b40e-d10581355198/…-14291.png có 9.834 pixel đục, hiện chữ "GOOD DOG"; preview customizations/48b955c4-….jpg hiện "GOOD DOG" trên mockup (chữ nằm sát mép trên khung PRINT AREA theo vị trí layer của fixture).
Khớp cái buyer thấy trên storefront (Cat → ẩn, Dog → hiện).
Instance: 520. Campaign CP-HIDE-1 #3252, Artwork #5868.
