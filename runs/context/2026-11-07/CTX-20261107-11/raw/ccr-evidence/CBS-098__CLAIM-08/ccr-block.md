### CLAIM-08

- **Statement:** Nếu buyer upload ảnh khác ở template A sau khi đã ghé template B cùng tỉ lệ, B nhận ảnh mới cùng position của A vì luật giữ position riêng chỉ áp cho cùng một ảnh.
- **Object / feature:** sdk/MỚI: template-switch-photo-sync — Thuộc: sync ảnh và position của photo layer có reposition khi template đang chọn đổi (giữ, reset, warning tỉ lệ, round-trip, Multiple Uploads, đổi Size/option); Không thuộc: setting bật sync (sdk/product-page-settings-config), sync giá trị text, photo layer dùng Global Option.
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer, storefront
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chinhdt) đồng ý đề xuất do QA phuongbb viết, 2026-10-21
- **Locator:** Jira TIB-5566 comment 55235 ("ok Q4" là đồng ý đề xuất của QA trong comment 55234). Bổ trợ: TC-13 ✅ 2026-10-21 staging. (CCR cũ: CBS-026 CLAIM-08)
- **Trích nguyên văn:**
  ```
  ok Q4
  Câu hỏi + đề xuất được đồng ý (phuongbb, comment 55234, 2026-10-21):
  **Q4.** If the buyer uploads a new (different) photo in A after B already holds a position for the old photo, does B take A's position (same ratio) or the default position? — chọn: A) B takes A's position · B) B uses the default position — QA đề xuất: B takes A's position, because the 'same photo keeps its own position' rule no longer applies
  ```
