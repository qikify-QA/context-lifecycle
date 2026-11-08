### CLAIM-04

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** Jira TIB-5282; skill-rules-audit.md #5, #6 (rule `campaign-artwork-mockup-reflection`)
- **Link:** https://ownego.atlassian.net/browse/TIB-5282?focusedCommentId=54805
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-16
- **Người viết / người xác nhận:** huyenntk (dev)
- **Trích nguyên văn:**
  - Jira TIB-5282 comment #54805, huyenntk (dev), 2026-10-16 (dòng #5):
    ```
    Important clarification: adding an artwork to a campaign does not automatically place it onto every mockup. A mockup only shows an artwork once someone has used "Add Artwork" inside that specific mockup's editor at least once — that's a separate, manual, per-mockup step, unrelated to this fix.
    ```
  - Jira TIB-5282 comment #54805, huyenntk (dev), 2026-10-16 (dòng #6):
    ```
    This fix is about what happens after that: once a mockup already has an artwork placed on it, replacing or removing the campaign's artwork should now correctly update/clear it, instead of leaving it stale.
    ```
- **File đính kèm cho claim này:** không có

