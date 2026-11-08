### CLAIM-02

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** Jira TIB-5536 comment #55888 và #55962; TC-TIB-7521 (task TIB-265)
- **Link:** https://ownego.atlassian.net/browse/TIB-5536?focusedCommentId=55888
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-28 (#55888); 2026-10-29 (#55962)
- **Người viết / người xác nhận:** huyenntk (dev)
- **Trích nguyên văn:**
  - Jira TIB-5536 comment #55888, huyenntk (dev), 2026-10-28:
    ```
    The 300 cap is not new. The portal has had it since 2025: manual upload, SVG upload and the zip bulk upload. Admins can raise it per merchant. The Open API applies the same check, only when adding a clipart.
    ```
  - Jira TIB-5536 comment #55962, huyenntk (dev), 2026-10-29:
    ```
    POST /cliparts: 422 on category_id with the portal's message: "The category allows up to 5 items". It's checked before the file is read, so the upload_id isn't used up and nothing counts toward the daily limit. on_duplicate: replace still works on a full category because it adds nothing.
    ```
  - Jira TIB-5536 comment #55962, huyenntk (dev), 2026-10-29:
    ```
    Zip bulk upload: it always creates new categories from the zip's folders (optionally under parent_category_id); it can't upload into an existing category. The cap applies to each new category, so it can be tested with one folder holding more files than the cap. The upload is accepted, the extra files are skipped, each with a line in logs like Failed - <path> - The category allows up to 5 items, and the bulk upload ends as done.
    ```
  - Testlane TC-TIB-7521, actualResult:
    ```
    POST /cliparts {upload_id 99ac31ee-… (đã PUT lúc 05:25), category_id 6639} → 422 {"message":"The category allows up to 4 items"
    ```
  - rules/tib-product-behaviors.md dòng 48:
    ```
    - **Cap 300 clipart/category** từ 2025 (manual, SVG, zip bulk, Open API), admin nâng được theo merchant qua Admin → Users → Config JSON `"clipart_max_per_category": N`. Chạm cap: `POST /cliparts` 422 "The category allows up to N items". Zip bulk tạo category mới từ folder, file thừa bị skip với log `Failed - <path> - …`. Hỏi cap thực tế của account test trước khi viết case limit. (Dev huyenntk 2026-10-28/29, TIB-5536)
    ```
- **File đính kèm cho claim này:** không có

