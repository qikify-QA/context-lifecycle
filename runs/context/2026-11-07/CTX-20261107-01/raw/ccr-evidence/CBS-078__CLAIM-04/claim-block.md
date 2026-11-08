### CLAIM-04

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** rules/tib-product-behaviors.md dòng 49; TC-TIB-7522 (task TIB-265)
- **Link:** https://qa-hub.ownego.com/test-cases/TC-TIB-7522
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-29
- **Người viết / người xác nhận:** QA
- **Trích nguyên văn:**
  - rules/tib-product-behaviors.md dòng 49:
    ```
    - **Daily limit upload asset** ("… max attempts", dùng chung portal + Open API) đếm số lượt upload đã tạo trong cửa sổ trượt 24h UTC, **kể cả ảnh đã xoá**. Mốc "Wait until" = lượt cũ nhất + 24h. (người dùng 2026-10-29, TIB-5536)
    ```
  - Testlane TC-TIB-7522, actualResult:
    ```
    Quy tắc đếm (người dùng xác nhận): daily limit tính theo số lượt upload trong cửa sổ trượt 24h, không theo số ảnh còn tồn tại; ảnh đã xoá (11300) vẫn được tính.
    ```
- **File đính kèm cho claim này:** không có

