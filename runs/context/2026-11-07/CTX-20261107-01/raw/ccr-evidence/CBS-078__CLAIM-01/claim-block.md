### CLAIM-01

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** rules/tib-product-behaviors.md dòng 47; TC-TIB-5697, TC-TIB-5696 (task TIB-196)
- **Link:** https://qa-hub.ownego.com/test-cases/TC-TIB-5697
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-14
- **Người viết / người xác nhận:** QA
- **Trích nguyên văn:**
  - rules/tib-product-behaviors.md dòng 47:
    ```
    - **Dropzone upload** (clipart, layer image, mockup library): viết expected theo text, không theo icon (icon bị CSS ẩn). Text cụ thể: `.claude/flows/assets-library.md`. (người dùng 2026-10-14, TIB-5544)
    ```
  - Testlane TC-TIB-5697, actualResult:
    ```
    "Green check" wording: previews end in "Your file is uploaded, we are generating file preview…" (no icon by design of current CSS). User confirmed 2026-10-14: UI + API verification sufficient → passed.
    ```
  - Testlane TC-TIB-5696, actualResult:
    ```
    "Red error mark" wording: icon hidden by CSS; error is shown as red text. User confirmed 2026-10-14: error message shown on UI + API behavior is sufficient → passed.
    ```
- **File đính kèm cho claim này:** không có

