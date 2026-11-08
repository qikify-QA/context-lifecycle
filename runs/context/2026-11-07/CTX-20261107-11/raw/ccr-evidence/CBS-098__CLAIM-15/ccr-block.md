### CLAIM-15

- **Statement:** Sync chỉ ghi vào template đang chọn nên template chưa ghé không có ảnh hay position, và layer là populate target (TIB-5302) bị sync bỏ qua, theo luật populate.
- **Object / feature:** sdk/MỚI: template-switch-photo-sync — Thuộc: sync ảnh và position của photo layer có reposition khi template đang chọn đổi (giữ, reset, warning tỉ lệ, round-trip, Multiple Uploads, đổi Size/option); Không thuộc: setting bật sync (sdk/product-page-settings-config), sync giá trị text, photo layer dùng Global Option. (liên quan: artwork)
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer, storefront
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chinhdt), 2026-10-21
- **Locator:** Jira TIB-5566 comment 55235 mục Q7 (phần lựa chọn (c)). TC-18 chưa chạy, chưa có quan sát. Có thể chạm artwork/populate-values, chưa rõ. (CCR cũ: CBS-026 CLAIM-15)
- **Trích nguyên văn:**
  ```
  (c) does not apply: the sync only writes into the currently selected template, so a template the buyer never visited holds no photo or position, and a populate target (TIB-5302) is skipped by the sync and follows the populate rules instead.
  ```
