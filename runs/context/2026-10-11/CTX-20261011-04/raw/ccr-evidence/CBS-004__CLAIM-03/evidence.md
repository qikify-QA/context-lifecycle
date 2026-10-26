<!-- CBS-004 CLAIM-03: verbatim block from CCR Phần 5.1 (redacted per §6). -->

### CLAIM-03

- **Loại nguồn:** `test_case` (+ `po_dev_confirm`)
- **Locator:** TC-TIB-4513, TC-TIB-4514, TC-TIB-4515 (Testlane, task TIB-157) — tất cả PASS. Comment Jira #53123.
- **Link:** https://ownego.atlassian.net/browse/TIB-5467 (comment #53123)
- **Ngày của nguồn:** test case `2026-10-08`; comment dev `2026-10-02`.
- **Người viết / người xác nhận:** dev `[REDACTED]` (tự gọi đây là rủi ro lớn nhất); QA (session hiện tại).
- **Trích nguyên văn:**
  ```
  (Jira comment, [REDACTED]) "⚠️ Biggest risk (dev's words): edit-save of ALL Global Option types
  (not just Additional Option) now goes through API validation instead of a direct DB write —
  same data should still save, but invalid name/data/category is now rejected instead of
  silently corrupting."

  (TC-TIB-4515 actualResult) "Save was blocked: a red error toast appeared reading "Error —
  Global Option Name is required". ... Checked Network tab: a POST to
  https://staging-api.teeinblue.com/api/graphql fired at save time (200 response,
  GraphQL-style error-in-body pattern)."
  ```
- **File đính kèm cho claim này:** không có.
