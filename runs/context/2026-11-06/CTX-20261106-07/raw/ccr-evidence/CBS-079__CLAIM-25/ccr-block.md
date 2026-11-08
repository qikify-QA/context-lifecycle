### CLAIM-04

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** rules/tib-product-behaviors.md dòng 27; TC-TIB-5705, TC-TIB-5710 (task TIB-197)
- **Link:** https://qa-hub.ownego.com/test-cases/TC-TIB-5705
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-14
- **Người viết / người xác nhận:** QA
- **Trích nguyên văn:**
  - rules/tib-product-behaviors.md dòng 27:
    ```
    - **Upload .svg trong artwork editor tạo vector layer**; image picker ẩn SVG là chủ đích. Artwork có SVG phải đổi Design format, để mặc định thì order lỗi "Line item cannot generate design". Design format PDF cho layer Photo, order ra PDF có ảnh nhúng, không cần đổi format. Lỗi khi save SVG có raster: `.claude/flows/artwork-editor.md`. (người dùng 2026-10-14, TIB-5512)
    ```
  - Testlane TC-TIB-5705, expectedResult:
    ```
    SVG is added as a Vector layer (not an image layer), renders in editor, persists after reload; no NotSupportedException.
    ```
  - Testlane TC-TIB-5705, expectedResult (note):
    ```
    Note: SVG → vector layer confirmed by user (2026-10-14). SVG hidden from the image layer picker is therefore by design.
    ```
  - Testlane TC-TIB-5710, actualResult:
    ```
    Earlier SVG orders with the default PNG_RGB format (#ins58-2939/#ins58-2943) → "Line item cannot generate design".
    ```
- **File đính kèm cho claim này:** không có

