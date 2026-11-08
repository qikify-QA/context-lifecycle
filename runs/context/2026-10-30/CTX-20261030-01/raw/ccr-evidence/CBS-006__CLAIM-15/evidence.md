# CBS-006 CLAIM-15 — evidence (đóng băng từ Proposal CBS-006, 2026-10-30)

## Phần 1a
| `CLAIM-15` | TIB-5584 (SDK) — layer bị ẩn hiệu dụng do Group cha ẩn không có form field trên storefront; field required nằm trong Group ẩn không chặn Add to cart — CHƯA thấy đúng trên staging | storefront — form cá nhân hoá SDK + Add to cart | `KHÔNG CÓ NGUỒN` — TC-TIB-6063 actualResult rỗng; TC-TIB-6064 actualResult Fail 2026-10-16 (required trong Group ẩn vẫn chặn Add to cart), BUG-321..324; Testlane ghi passed nhưng không có lần chạy lại có ngày | sdk / storefront-buyer-facing (form field + validation required) — sdk checklist CHK-026 (required grouped_clipart) cùng vùng validation | `ADD` |

## Phần 1b
| `CLAIM-15` | `sdk` | `storefront-buyer-facing` | buyer (guest) trên storefront | storefront | không có |

## 5.1

- **Loại nguồn** (đúng 1): `KHÔNG CÓ NGUỒN`
- **Locator:** TC-TIB-6063, TC-TIB-6064; BUG-321..324 (bugId đã bị gỡ khỏi case trên Testlane)
- **Link:** https://staging-portal.teeinblue.com/artworks?id=5057
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-16 (ngày chạy Fail; không có ngày chạy lại)
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor (agent, [AI]) — lượt chạy của QA chienct, task Testlane TIB-211
- **Trích nguyên văn:**
  ```
  TC-TIB-6063 — actualResult: (rỗng)
  TC-TIB-6064 (chạy 2026-10-16, staging, [AI]) — actualResult: Fail - Field required FT2 nằm trong Group ẩn vẫn chặn Add to cart. Actual: nhập FT3 = "HELLO", bấm Add to cart thì hiện "FT2 * This field is required!" và "Error: Some fields are required or invalid data"; giỏ hàng trống (cart.js items = 0); không có request POST /api/merchant/shopify/customization hay PUT cart-token. Expected: Add to cart thành công, không có lỗi required cho FT2, payload chỉ chứa FT3. Đã tạo bug kèm screenshot.
  Dev QA plan bước 12 (comment #54766, 2026-10-16): "With Dog hidden, the personalization form has **no** field for Dog name or for any other layer inside Dog." / "Add to cart works, so a required field inside a hidden group doesn't block it."
  ```
- **File đính kèm cho claim này:** không có
