### CLAIM-02

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** rules/tib-product-behaviors.md dòng 25; TC-TIB-5719, TC-TIB-5725, TC-TIB-5760 (task TIB-198)
- **Link:** https://qa-hub.ownego.com/test-cases/TC-TIB-5719
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-14
- **Người viết / người xác nhận:** QA
- **Trích nguyên văn:**
  - rules/tib-product-behaviors.md dòng 25:
    ```
    - **Text / paragraph rỗng → design trống.** Default text chỉ ở storefront preview. Đúng cả với paragraph vừa là buyer field vừa được populate. Chỉ nhập khoảng trắng → preview và design đều trống. Nguồn populate bị xoá → value "" đè lên chỗ buyer sửa → preview về default text. Kiểm size ở trạng thái rỗng qua `font_size` trong payload line item. (người dùng 2026-10-14, TIB-5538)
    ```
  - Testlane TC-TIB-5719, actualResult:
    ```
    Design blank, byte-identical to never-touched design; no enlarged text. Confirmed by user: empty paragraph → not rendered in design → correct.
    ```
  - Testlane TC-TIB-5760, actualResult:
    ```
    Confirmed by user: after clearing, preview shows default text and an empty paragraph is not rendered in the design → correct.
    ```
- **File đính kèm cho claim này:** không có

