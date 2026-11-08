# CBS-073__CLAIM-01

Trích nguyên trạng từ Proposal CBS-073 (Phần 5.1), không biên tập.

### CLAIM-01

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** rules/tib-product-behaviors.md dòng 31; TC-TIB-6199 (task TIB-217)
- **Link:** https://qa-hub.ownego.com/test-cases/TC-TIB-6199
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-21
- **Người viết / người xác nhận:** QA
- **Trích nguyên văn:**
  - rules/tib-product-behaviors.md dòng 31:
    ```
    - **Sửa global option trên Portal → storefront chỉ nhận sau khi sync campaign.** (người dùng 2026-10-21, TIB-5591)
    ```
  - Testlane TC-TIB-6199, expectedResult:
    ```
    campaign sync is required for storefront to pick up a global option edit (confirmed by user 2026-10-21).
    ```
  - Testlane TC-TIB-6199, actualResult:
    ```
    Campaign 3069: storefront kept old data (≥26 min) until campaign sync (05:35 UTC); after sync shows "Show pet name?" / "Yes please".
    ```
- **File đính kèm cho claim này:** không có
