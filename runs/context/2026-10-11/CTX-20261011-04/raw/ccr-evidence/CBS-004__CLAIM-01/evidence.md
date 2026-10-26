<!-- CBS-004 CLAIM-01: verbatim block from CCR Phần 5.1 (redacted per §6). -->

### CLAIM-01

- **Loại nguồn:** `test_case` (+ `po_dev_confirm` làm backing)
- **Locator:** TC-TIB-4493 (Testlane, task TIB-157) — PASS. Comment Jira #53123.
- **Link:** https://ownego.atlassian.net/browse/TIB-5467 (comment #53123)
- **Ngày của nguồn:** test case chạy `2026-10-08` (ngày task TIB-157 set done trên Testlane — Testlane API không trả timestamp riêng theo từng test case, dùng ngày done của task làm mốc); comment dev `2026-10-02`.
- **Người viết / người xác nhận:** dev `[REDACTED]` (comment); QA (session hiện tại, qua Playwright trên staging) chạy test case.
- **Trích nguyên văn:**
  ```
  (Jira comment, [REDACTED], 2026-10-02) "Tạo GO Additional option mới: mặc định là Create new.
  Màn tạo chỉ có khối item + kiểu hiển thị + nút Save. Save xong thì mở thẳng trang edit
  của GO vừa tạo. Các loại GO khác vẫn quay về danh sách như cũ."

  (TC-TIB-4493 actualResult) "Saved → redirected straight to /global-options/986/edit
  (Edit page), matching expected "other GO types return to the list instead"."
  ```
- **File đính kèm cho claim này:** không có.
