### CLAIM-04

- **Statement:** Server render (file Order Design, mockup render) do teeinblue-api vẽ bằng ImageMagick là code riêng, không dùng công thức bị lỗi và fix không đụng tới, nên đơn đã có không bị sai.
- **Object / feature:** artwork/MỚI: layer-photo-border — Thuộc: tuỳ chọn Border trên toolbar layer (Enable photo border, Type Contour cut / Custom shape, Border color, Border size, Add a thin line, Display border on) và kết quả vẽ viền ở các bề mặt; Không thuộc: preset shape-cut của Print Effects (layer-print-effects), multi-select và rule ẩn của Photo Border (editor-layer-workspace KB-427..429) (liên quan: order)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff xử lý đơn (Order Design file), api (server render)
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chauptm), 2026-10-19
- **Locator:** Jira TIB-5592 comment 55072, mục 1.2 (Q1) và mục 4 (Q4). QA chưa kiểm Order Design file và mockup render (TC-11..15 chưa chạy). Liên quan, không mâu thuẫn: layer-print-effects KB-391 (quan sát contour cut trên order design của group), KB-425 (custom_shape bỏ file pre-render). ImageMagick, teeinblue-api là chi tiết code, không phải oracle. (CCR cũ: CBS-027 CLAIM-04)
- **Trích nguyên văn:**
  ```
  Hỏi (Q1): "Which surfaces did the fix change: Artwork editor canvas, storefront SDK live preview, server render (Order Design file / mockups), or all?"
  Đáp: 2. Server render (file Order Design, mockup render): do teeinblue-api vẽ bằng ImageMagick, là code riêng. Fix không đụng vào và code đó không dùng công thức bị lỗi
  Hỏi (Q4): "Orders already rendered with the square frame: regenerated automatically, or does the seller/support need to regenerate the design?"
  Đáp: 4. Order không sai
  ```
