### CLAIM-03

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** Jira TIB-5536 comment #55888
- **Link:** https://ownego.atlassian.net/browse/TIB-5536?focusedCommentId=55888
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-28
- **Người viết / người xác nhận:** huyenntk (dev)
- **Trích nguyên văn:**
  - Jira TIB-5536 comment #55888, huyenntk (dev), 2026-10-28:
    ```
    Daily limits are the same as the portal: 1,000 layer images, 4,000 cliparts and 1,000 clipart categories per 24 h from the first upload. The counters are shared with the portal. There's no reset. To test 429, lower the merchant's "… max attempts" in the admin panel (e.g. to 2), then put it back.
    ```
  - rules/tib-product-behaviors.md dòng 49:
    ```
    - **Daily limit upload asset** ("… max attempts", dùng chung portal + Open API) đếm số lượt upload đã tạo trong cửa sổ trượt 24h UTC, **kể cả ảnh đã xoá**. Mốc "Wait until" = lượt cũ nhất + 24h. (người dùng 2026-10-29, TIB-5536)
    ```
- **File đính kèm cho claim này:** không có

