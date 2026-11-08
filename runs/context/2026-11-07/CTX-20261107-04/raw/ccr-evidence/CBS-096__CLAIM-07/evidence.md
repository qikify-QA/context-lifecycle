# CBS-096 CLAIM-07 — block nguyên văn từ Proposal

### CLAIM-07

- **Statement:** Order design dùng ảnh đã generate, fit vào box layer: T2I GPT Default (master 1536×1024) phủ đúng box; MU GPT 2K (master 2048×1360) phủ hết chiều rộng, contain (~1 px dải), không crop; item ở trạng thái Ready, không lỗi
- **Object / feature:** order/place-personalized-order-storefront (liên quan: sdk)
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer đặt đơn / store owner xử lý đơn; api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb), kết quả [AI], 2026-10-27
- **Locator:** QA-3435 TC-29 PASS 2026-10-27, staging, build không ghi lại. bbox, kích thước master là số đo một lượt chạy, không phải giá trị chuẩn (CCR cũ: CBS-024 CLAIM-18)
- **Căn cứ expected:** KHÔNG CÓ
- **Trích nguyên văn:**
  ```
  TC-29 | ✅ AI — order design uses the generated image, fitted to the layer box | #<id>: T2I gpt Default → master 1536×1024, design bbox (83,83)-(827,579) = box (82.7,82.7)-(827,578.9); MU-G gpt 2K → master 2048×1360 (ratio 1.506), bbox (83,84)-(827,578): full width, height 494 vs 496 (contain, ~1 px band), no crop; both Ready, `error_message null`
  ```
