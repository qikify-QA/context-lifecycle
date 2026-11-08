# CLAIM-02: block 5.1 nguyên văn của CCR

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** rules/tib-product-behaviors.md dòng 64; TC-TIB-5441, TC-TIB-5445 (task TIB-180)
- **Link:** https://qa-hub.ownego.com/test-cases/TC-TIB-5445
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-13
- **Người viết / người xác nhận:** QA
- **Trích nguyên văn:**
  - rules/tib-product-behaviors.md dòng 64:
    ```
    - **Catalog key provider có 2 nhánh:** provider chưa nhập key dùng key teeinblue (`.env` server); merchant đã nhập key thì dùng key merchant. Test lỗi catalog phải tách 2 nhánh; message lỗi có thể khác nhau. (người dùng 2026-10-13, TIB-5548)
    ```
  - Jira TIB-5548 comment #53876, tinhpt (dev), tạo 2026-10-08, sửa 2026-10-13:
    ```
    These are the providers where the merchant enters their own key in Extras → Fulfillments.
    ```
  - Jira TIB-5548 comment #53876, tinhpt (dev), tạo 2026-10-08, sửa 2026-10-13:
    ```
    The merchant can't trigger these from the UI, because these providers use teeinblue's own key.
    ```
  - Testlane TC-TIB-5445, actualResult:
    ```
    Nhánh key teeinblue: DEV đổi key Shirtee/Printbelle sai trong .env staging. Chạy trên account onboarding
    ```
- **File đính kèm cho claim này:** không có

