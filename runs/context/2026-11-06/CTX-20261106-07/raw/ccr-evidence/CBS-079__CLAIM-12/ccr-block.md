### CLAIM-12

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** Jira TIB-5516; skill-rules-audit.md #68, #69 (rule `photo-border-prerender-client-render`)
- **Link:** https://ownego.atlassian.net/browse/TIB-5516?focusedCommentId=53942
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-09
- **Người viết / người xác nhận:** chauptm (dev)
- **Trích nguyên văn:**
  - Jira TIB-5516 comment #53942, chauptm (dev), 2026-10-09 (dòng #68):
    ```
    The pre-rendered file from the A1/A2 variant (photo-borders/{artwork_id}/{layer}-{hash}.png, generated through POST photo-border-masks) is removed. The SDK now draws the custom_shape border from the mask on a canvas, with no request to the server. This is option A4 in the description.
    ```
  - Jira TIB-5516 comment #53942, chauptm (dev), 2026-10-09 (dòng #69):
    ```
    Why the file was dropped: the API rendered it without the layer's ratio, so it always used the default 0.1 and ignored the border size.
    ```
- **File đính kèm cho claim này:** không có

