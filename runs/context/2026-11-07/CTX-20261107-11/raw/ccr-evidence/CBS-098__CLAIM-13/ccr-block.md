### CLAIM-13

- **Statement:** Ảnh không sync giữa các field type khác nhau (Upload Photo reposition, Photo Cropper, Multiple Uploads); TIB-5566 không đổi hành vi này.
- **Object / feature:** sdk/MỚI: template-switch-photo-sync — Thuộc: sync ảnh và position của photo layer có reposition khi template đang chọn đổi (giữ, reset, warning tỉ lệ, round-trip, Multiple Uploads, đổi Size/option); Không thuộc: setting bật sync (sdk/product-page-settings-config), sync giá trị text, photo layer dùng Global Option. (liên quan: artwork)
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer, storefront
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chinhdt), 2026-10-21
- **Locator:** Jira TIB-5566 comment 55235 mục Q8. TC-21, 22, 23, 34 chưa chạy, chỉ có lời dev, chưa có quan sát. Liên quan: artwork KB-017. (CCR cũ: CBS-026 CLAIM-13)
- **Trích nguyên văn:**
  ```
  Câu hỏi QA (comment 55234): "Mixed-type pairs with the same ratio: Upload Photo (reposition) -> Photo Cropper, Photo Cropper -> Upload Photo (reposition), Upload Photo <-> Multiple Uploads. Is the position kept or reset?"
  Q8: neither — the photo does not sync between different field types at all (Upload Photo reposition / Photo Cropper / Multiple Uploads), unchanged by this issue.
  ```
