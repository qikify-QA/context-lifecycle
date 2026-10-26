<!-- CBS-004 CLAIM-02: verbatim block from CCR Phần 5.1 (redacted per §6). -->

### CLAIM-02

- **Loại nguồn:** `test_case` (+ `po_dev_confirm`)
- **Locator:** TC-TIB-4494, TC-TIB-4508, TC-TIB-4509 (Testlane, task TIB-157) — tất cả PASS. Comment Jira #53123.
- **Link:** https://ownego.atlassian.net/browse/TIB-5467 (comment #53123)
- **Ngày của nguồn:** test case `2026-10-08`; comment dev `2026-10-02`.
- **Người viết / người xác nhận:** dev `[REDACTED]`; QA (session hiện tại).
- **Trích nguyên văn:**
  ```
  (Jira comment, [REDACTED]) "Sửa GO: được đổi nguồn. Nếu GO đã lưu, đổi nguồn sẽ hiện hộp thoại
  cảnh báo trước. Khi đổi, default value bị xoá, còn item của nguồn cũ vẫn được giữ, đổi
  ngược lại thì hiện lại đúng như cũ."

  (TC-TIB-4508 actualResult) "A confirm dialog appeared: "Change additional option source?
  Customizations and orders already made with this global option point to the items of the
  current source. After switching, they will no longer match the new items. Items of the
  current source are kept, so you can switch back later." ... Result: Default value field
  was cleared ... Switched back to "Select from category" ... the category selection was
  restored exactly as it was."
  ```
- **File đính kèm cho claim này:** không có.
