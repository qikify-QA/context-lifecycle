<!-- CBS-004 CLAIM-06: verbatim block from CCR Phần 5.1 (redacted per §6). -->

### CLAIM-06

- **Loại nguồn:** `test_case` (+ `po_dev_confirm`)
- **Locator:** TC-TIB-4519 (Testlane, task TIB-157) — PASS. Comment Jira #53123.
- **Link:** https://ownego.atlassian.net/browse/TIB-5467 (comment #53123)
- **Ngày của nguồn:** test case `2026-10-08`; comment dev `2026-10-02`.
- **Người viết / người xác nhận:** dev `[REDACTED]`; QA (session hiện tại).
- **Trích nguyên văn:**
  ```
  (TC-TIB-4519 actualResult) "Order changed live to [Apple, Blue, Green, XSS-item, Zebra].
  Saved, then reloaded the Edit page from a fresh navigation — order persisted exactly...
  The field's item label order was ["", "Apple", "Blue - en", "Green - en", "Zebra"] —
  matches the Sort A→Z order from the portal exactly."
  ```
  (Lưu ý: giá trị "Blue - en"/"Green - en" ở đây là tác dụng phụ của bug locale — xem CLAIM-04
  ở CCR mâu thuẫn — không liên quan tới việc thứ tự có đúng hay không, chỉ trích để không bịa
  lại nguyên văn.)
- **File đính kèm cho claim này:** không có.
