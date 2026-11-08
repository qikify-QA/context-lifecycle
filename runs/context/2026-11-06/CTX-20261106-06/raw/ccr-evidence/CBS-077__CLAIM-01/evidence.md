# CLAIM-01: block 5.1 nguyên văn của CCR

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** rules/tib-product-behaviors.md dòng 63; TC-TIB-5443 (task TIB-180)
- **Link:** https://qa-hub.ownego.com/test-cases/TC-TIB-5443
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-13
- **Người viết / người xác nhận:** QA
- **Trích nguyên văn:**
  - rules/tib-product-behaviors.md dòng 63:
    ```
    - **merchOne = Picanova** (đổi tên); hiện tên nào ở đâu: `.claude/flows/orders-fulfillment.md`. (người dùng 2026-10-13, TIB-5548)
    ```
  - Testlane TC-TIB-5443, actualResult:
    ```
    Picanova trên staging đã đổi tên hiển thị thành merchOne (route /fulfillments/picanova, fulfillment id 6).
    ```
  - Jira TIB-5500 comment #56108, tuanva (dev), 2026-10-30:
    ```
    Ngưỡng 9000 px (Printify, Picanova/merchOne): chỉ cần width hoặc height > 9000 (lớn hơn hẳn, không tính bằng 9000) thì cả hai cạnh giảm một nửa và DPI = 150.
    ```
- **File đính kèm cho claim này:** không có

