### CLAIM-13

- **Statement:** Gen AI effect giữa Photo và Clipart: chỉ layer clipart của Artwork 1.0 có Gen AI effect, còn ở Artwork 2.0 (mọi artwork hiện tại) chỉ Photo layer có, và layer Clipart Category không có mục Gen AI effect là đúng.
- **Object / feature:** artwork/layer-config-image
- **Quan hệ với canon:** `ADD`
- **Scope:** owner, staff; portal, storefront
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chinhdt), 2026-10-30
- **Locator:** Jira TIB-5573, comment chinhdt 2026-10-30, trả lời comment 56103 của QA (mục 2); comment id của câu trả lời không lấy được. Câu của dev so Photo với Clipart: không suy rộng thành Multiple Uploads hay Text to Image không có effect (KB-018 vẫn có "Image effects after generating"). Câu "Photo and Clipart layers" ngày 2026-10-26 đã bị dev sửa, không giữ. Gen AI effect trên clipart Artwork 1.0 chưa thử. Khớp KB-017, KB-087; có thể chạm artwork/clipart-category-storefront-behavior. (CCR cũ: CBS-023 CLAIM-11)
- **Trích nguyên văn:**
  ```
  2. Clipart: only the Artwork 1.0 clipart layer has the Gen AI effect. Artworks now all use Artwork 2.0,
  where only the Photo layer has it. So it's Photo only, and Clipart Category having no Gen AI effect
  section is expected.
  Bổ trợ — QA quan sát 2026-10-30 (TC-05 / TC-17, nay ⏭️): "CL-1 panel sections: Populate values / Personalization Settings / Conditional / Extra. No effects repeater." Storefront: "0 `image-filter-effects` / `derive` requests in 12 s" khi chọn clipart. Comment cũ hơn bị thay thế (dev 2026-10-26): "**Photo and Clipart layers:** with the Gemini model set to Nano Banana 2.1 …".
  ```
