# CBS-074__CLAIM-01

Trích nguyên trạng từ Proposal CBS-074 (Phần 5.1), không biên tập.

### CLAIM-01

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** rules/tib-product-behaviors.md dòng 33; TC-TIB-965, TC-TIB-978, TC-TIB-981; TC-TIB-982; skill-rules-audit.md #144 và mục 3a
- **Link:** https://qa-hub.ownego.com/test-cases/TC-TIB-978
- **Ngày của nguồn (YYYY-MM-DD):** 2026-11-05 (QA chốt vế product base); 2026-10-29 (dòng file local)
- **Người viết / người xác nhận:** QA
- **Trích nguyên văn:**
  - rules/tib-product-behaviors.md dòng 33:
    ```
    - **Edit customization** chỉ ở Thank You page + Order status page, chỉ cho campaign Shopify product (không có cho product base, không có ở /cart). (người dùng 2026-10-29, TIB-5510)
    ```
  - Testlane TC-TIB-978, actualResult:
    ```
    The design is editable, as required for campaign by Shopify.
    ```
  - skill-rules-audit.md mục 3a, QA chốt 2026-11-05:
    ```
    Người dùng chốt 2026-11-05: với product base, link có hiện, click thì báo không hỗ trợ edit (khớp #144 và TC-TIB-982)
    ```
  - Testlane TC-TIB-982, expectedResult:
    ```
    Link is shown (by design), redirects to the customize page, which displays Your design does not support edit for now, contact shop owner
    ```
  - skill-rules-audit.md #144:
    ```
    Với campaign **by Product base**: link **vẫn hiển thị** (đúng thiết kế), click → sang trang customize → / hiện message `Your design does not support edit for now, contact shop owner`.
    ```
- **File đính kèm cho claim này:** không có

