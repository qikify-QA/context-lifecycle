### CLAIM-04

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** rules/env-capabilities.md dòng 57
- **Link:** không có
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-23
- **Người viết / người xác nhận:** QA
- **Trích nguyên văn:**
  - rules/env-capabilities.md dòng 57:
    ```
    | **`photo_endpoint=snap`** | Case/vế | Portal không có setting; chỉ Dev/admin set được. Trên staging snap = photo-api cùng URL → chỉ verify HTML/preconnect | 2026-10-23 TIB-5551 |
    ```
  - Jira TIB-5551 comment #53934, tinhpt (dev), 2026-10-09:
    ```
    The photo-api.teeinblue.com preconnect (or snap-api when the store's photo endpoint is snap) still has crossorigin.
    ```
- **File đính kèm cho claim này:** không có

