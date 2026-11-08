### CLAIM-02

- **Statement:** Position lưu dạng giá trị 0–1 tương đối theo box layer nên khi layer đích cùng tỉ lệ nhưng khác kích thước pixel, position scale đều theo layer đích và ảnh không méo.
- **Object / feature:** sdk/MỚI: template-switch-photo-sync — Thuộc: sync ảnh và position của photo layer có reposition khi template đang chọn đổi (giữ, reset, warning tỉ lệ, round-trip, Multiple Uploads, đổi Size/option); Không thuộc: setting bật sync (sdk/product-page-settings-config), sync giá trị text, photo layer dùng Global Option.
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer, storefront
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chinhdt), 2026-10-21
- **Locator:** Jira TIB-5566 comment 55235 mục Q2. Bổ trợ: TC-02 ✅ 2026-10-21 staging (pixel ×2, không warning). Liên quan: sdk KB-015. (CCR cũ: CBS-026 CLAIM-02)
- **Trích nguyên văn:**
  ```
  Câu hỏi QA (comment 55234): "When the two layers have the same ratio but different pixel sizes (e.g. 1000x1000 to 2000x2000), are position and zoom scaled by one uniform factor? Is the reposition stored as relative values (0-1) or in pixels?"
  Q2: the position is stored as relative 0–1 values of the layer box, so it scales uniformly with the destination layer. Within the 5% tolerance the photo may stretch by up to 5%.
  ```
