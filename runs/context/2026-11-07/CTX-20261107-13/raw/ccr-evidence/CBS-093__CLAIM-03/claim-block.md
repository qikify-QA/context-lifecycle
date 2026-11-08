### CLAIM-03

- **Statement:** Viền Contour cut ở storefront live preview (mockup), cart Edit design, Portal View/Edit customization và Artwork editor dùng chung một code phía client, là chỗ bị lỗi và đã được fix, và lỗi sinh ra từ TIB-5516.
- **Object / feature:** artwork/MỚI: layer-photo-border — Thuộc: tuỳ chọn Border trên toolbar layer (Enable photo border, Type Contour cut / Custom shape, Border color, Border size, Add a thin line, Display border on) và kết quả vẽ viền ở các bề mặt; Không thuộc: preset shape-cut của Print Effects (layer-print-effects), multi-select và rule ẩn của Photo Border (editor-layer-workspace KB-427..429) (liên quan: sdk, order)
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (storefront preview, cart Edit design) và store owner/staff (Artwork editor, Portal View/Edit customization), portal và storefront
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chauptm), 2026-10-19
- **Locator:** Jira TIB-5592 comment 55072, mục 1.1 (Q1) và mục 5 (Q5). QA chỉ kiểm Artwork editor; storefront (TC-07, 08), cart Edit design (TC-09), Portal View/Edit customization (TC-12, 13) chưa chạy, không assert như đã verified. "Lỗi từ TIB-5516" là nguyên nhân lịch sử, không phải hành vi để test. (CCR cũ: CBS-027 CLAIM-03)
- **Trích nguyên văn:**
  ```
  Hỏi (Q1): "Which surfaces did the fix change: Artwork editor canvas, storefront SDK live preview, server render (Order Design file / mockups), or all?"
  Đáp: 1. 1. Các chỗ dùng code này nên có lỗi và được fix: storefront live preview (mockup), cart Edit design, Portal View/Edit customization và Artwork editor
  Hỏi (Q5): "What caused the regression (which change / PR), and is the color tint at sizes 2–3 part of the same regression or older behaviour?"
  Đáp: 5. Lỗi từ issue: https://ownego.atlassian.net/browse/TIB-5516  đã fix cho cả case 2-3
  ```
