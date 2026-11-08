# Block CLAIM-04 của Proposal CBS-076

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** Jira TIB-5608 comment #56400; TC-TIB-8314 (task TIB-290)
- **Link:** https://ownego.atlassian.net/browse/TIB-5608?focusedCommentId=56400
- **Ngày của nguồn (YYYY-MM-DD):** 2026-11-04
- **Người viết / người xác nhận:** huytv (dev); QA chấp nhận 2026-11-05
- **Trích nguyên văn:**
  - Jira TIB-5608 comment #56400, huytv (dev), 2026-11-04:
    ```
    The lookup is the whole lowercased string (dd.mm.yyyy), the text buyers see today; a single-letter entry in the dictionary never matches.
    ```
  - Testlane TC-TIB-8314, actualResult:
    ```
    Dictionary vi (thêm qua trang Dynamic Translations, Save 200): DD.MM.YYYY → A, dd.MM.yyyy → B; chưa có dd.mm.yyyy.
    ```
  - Testlane TC-TIB-8314, actualResult:
    ```
    Không entry nào áp dụng.
    ```
  - rules/tib-product-behaviors.md dòng 41:
    ```
    - Key dịch placeholder date picker: chỉ key format viết thường có tác dụng (`dd.mm.yyyy`); `DD.MM.YYYY`, `dd.MM.yyyy` không áp. (người dùng 2026-11-05, TIB-5608)
    ```
- **File đính kèm cho claim này:** không có

