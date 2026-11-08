### CLAIM-01

- **Loại nguồn:** `test_case`
- **Locator:** TC-TIB-4355, TC-TIB-4357, TC-TIB-4358 (task TIB-154, project TIB trên Testlane)
- **Link:** nội bộ Testlane (task id `TIB-154`) — không có public URL kèm sẵn trong phiên này
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-07 (ngày PASS, trùng đúng ngày Jira `resolutiondate`)
- **Người viết / người xác nhận:** QA (agent, phiên làm việc này) — tự thực thi + tự ghi kết quả, chưa có second-reviewer
- **Trích nguyên văn** (actualResult của TC-TIB-4355):
  ```
  Verified via real onCustomizationCreated capture on open-platform product
  (linh-open-platform.myshopify.com, "Girl & Dog" template, artwork 2179,
  customization d9a13ceb-7d77-44c1-9c15-c538e4c02b6f). design_url =
  https://cdn.ownego.com/teeinblue-staging/designs/d9a13ceb-.../d9a13ceb-...-2179.png,
  design_urls[0] = identical value. Confirmed equal. Confirmed also from source
  (open-platform SDK bundle, addToCart()): design_url: n[0], design_urls: n —
  same array reference, not independently computed.
  ```
  (actualResult của TC-TIB-4358):
  ```
  Single-artwork product (open-platform, artwork 2179) submitted. Captured
  callback payload: design_url present, design_urls = array with exactly 1
  element, equal to design_url. Matches expected pre-fix-compatible shape.
  ```
- **File đính kèm cho claim này:** không có (ảnh/network capture nằm trong session scratchpad, không đính kèm CCR này — theo đúng "trích nguyên văn mới là thứ sống sót", nội dung quan trọng đã chép nguyên văn ở trên)

