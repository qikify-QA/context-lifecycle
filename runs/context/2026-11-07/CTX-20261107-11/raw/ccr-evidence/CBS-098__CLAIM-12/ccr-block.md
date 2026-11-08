### CLAIM-12

- **Statement:** Việc giữ position áp cho "Upload Photo" có Photo reposition và "Multiple Uploads" có reposition; layer Multiple Uploads reposition giữ một ảnh ghép với một position, không theo slot, nên số slot không ảnh hưởng.
- **Object / feature:** sdk/MỚI: template-switch-photo-sync — Thuộc: sync ảnh và position của photo layer có reposition khi template đang chọn đổi (giữ, reset, warning tỉ lệ, round-trip, Multiple Uploads, đổi Size/option); Không thuộc: setting bật sync (sdk/product-page-settings-config), sync giá trị text, photo layer dùng Global Option. (liên quan: artwork)
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer, storefront
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chinhdt), 2026-10-21
- **Locator:** Jira TIB-5566 comment 55235 mục Q3; phạm vi từ dev summary 2026-10-21. TC-19, TC-20 chưa chạy, chỉ có lời dev, chưa có quan sát. Liên quan: artwork KB-017. (CCR cũ: CBS-026 CLAIM-12)
- **Trích nguyên văn:**
  ```
  Câu hỏi QA (comment 55234): "Multiple Uploads: is the position kept per photo slot by index (slot 1 to slot 1)? What happens when template B's layer has fewer or more slots than A's?"
  Q3: a Multiple Uploads reposition layer holds one combined image with one position — there are no per-slot positions, so slot count does not matter.
  Phạm vi (Dev summary, chinhdt, comment 2026-10-21 — ngữ cảnh):
  - Applies to "Upload Photo" layers with Photo reposition and to "Multiple Uploads" layers with reposition. Crop and direct-upload layers are unchanged.
  ```
