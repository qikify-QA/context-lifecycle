### CLAIM-06

- **Statement:** Trong ngưỡng 5%, ảnh được giữ position có thể bị giãn tới 5%.
- **Object / feature:** sdk/MỚI: template-switch-photo-sync — Thuộc: sync ảnh và position của photo layer có reposition khi template đang chọn đổi (giữ, reset, warning tỉ lệ, round-trip, Multiple Uploads, đổi Size/option); Không thuộc: setting bật sync (sdk/product-page-settings-config), sync giá trị text, photo layer dùng Global Option.
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer, storefront
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chinhdt), 2026-10-21
- **Locator:** Jira TIB-5566 comment 55235 mục Q2 (câu thứ hai). Bổ trợ: TC-09 ✅ 2026-10-21 staging, méo đo được 4.67%, không skew hay xoay, không crop thêm (số đo chỉ là bằng chứng một lượt). (CCR cũ: CBS-026 CLAIM-06)
- **Trích nguyên văn:**
  ```
  Within the 5% tolerance the photo may stretch by up to 5%.
  ```
