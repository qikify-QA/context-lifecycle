# Block CLAIM-03 của Proposal CBS-076

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** TC-TIB-8308 (task TIB-290), Re-run 2026-11-05; Jira TIB-5608 comment #56471
- **Link:** https://qa-hub.ownego.com/test-cases/TC-TIB-8308
- **Ngày của nguồn (YYYY-MM-DD):** 2026-11-05
- **Người viết / người xác nhận:** QA
- **Trích nguyên văn:**
  - Testlane TC-TIB-8308, expectedResult:
    ```
    Offers the option's format (dd.mm.yyyy), same as a normal date layer, once even if a normal date layer has the same format.
    ```
  - Testlane TC-TIB-8308, actualResult:
    ```
    GO 1155 (dd/MM/yyyy) và layer thường cùng format: dd/mm/yyyy xuất hiện 1 lần.
    ```
  - Jira TIB-5608 comment #56471, huytv (dev), 2026-11-05:
    ```
    BUG-497: Import to Translation on an artwork now offers the date picker key (for example dd.mm.yyyy) for a date layer that comes from a Global Option, the same as for a normal date layer.
    ```
  - rules/tib-product-behaviors.md dòng 40:
    ```
    - **Import to Translation với date layer:** layer Global Option phải gợi ý key format như layer thường. (người dùng 2026-11-04, TIB-5608)
    ```
- **File đính kèm cho claim này:** không có

