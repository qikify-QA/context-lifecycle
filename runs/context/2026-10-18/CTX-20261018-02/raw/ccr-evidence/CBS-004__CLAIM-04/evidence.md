<!-- CBS-004 CLAIM-04: verbatim block from CCR Phần 5.1 (redacted per §6). -->

### CLAIM-04

- **Loại nguồn:** `test_case` (+ `po_dev_confirm` cho phần chung)
- **Locator:** TC-TIB-4516 (Testlane, task TIB-157) — PASS (re-verify). Comment Jira #53123.
- **Link:** https://ownego.atlassian.net/browse/TIB-5467 (comment #53123)
- **Ngày của nguồn:** comment dev `2026-10-02`. Test case chạy lần đầu `2026-10-08` trên order `#4481` — **FAILED** lúc đó vì GO 986/987 có field "Option Title" (`form_label`) bị để trống (gap dữ liệu test, không phải bug). QA điền lại "Option Title" (GO 986 = "Color", GO 987 = "Size") và đặt đơn mới; re-verify **PASS** ngày `2026-10-11`.
- **Người viết / người xác nhận:** dev `[REDACTED]` (comment, phần chung); QA (session hiện tại, cả 2 lần chạy + fix data).
- **Trích nguyên văn:**
  ```
  (Jira comment, [REDACTED]) "Customization info (dữ liệu fulfillment, API đơn/customization
  public): trước đây thiếu hẳn dòng của GO Additional option. Giờ có dòng "Nhãn: tên item
  đã chọn", cho cả GO inline lẫn GO trỏ category."

  (TC-TIB-4516 actualResult, sau fix) "Re-verified after root-cause fix. Original failure
  (order #4481) was caused by a test-data gap, not a product bug: both GO 986 (inline) and
  GO 987 (category-sourced) had an empty Option Title field (HTML input name form_label) in
  their Settings — this is the field that drives the "Label: <item>" line. Filled in Option
  Title (GO 986 = "Color", GO 987 = "Size") and saved. User placed a new test order on
  campaign 2730 afterward and confirmed the label now appears correctly (e.g. "Color: <item>"
  / "Size: <item>") in the order's customization data."
  ```
- **File đính kèm cho claim này:** không có ảnh — xác nhận bằng text qua Testlane actualResult + xác nhận trực tiếp bằng lời của người dùng trong phiên làm việc ("tôi đã đặt đơn mới, label đã đúng").
