### CLAIM-08

- **Statement:** Undo và Redo đổi Border size đúng cả giá trị lẫn hình vẽ, và Duplicate layer tạo bản copy giữ nguyên thiết lập Border, cả hai layer vẽ viền theo outline.
- **Object / feature:** artwork/MỚI: layer-photo-border — Thuộc: tuỳ chọn Border trên toolbar layer (Enable photo border, Type Contour cut / Custom shape, Border color, Border size, Add a thin line, Display border on) và kết quả vẽ viền ở các bề mặt; Không thuộc: preset shape-cut của Print Effects (layer-print-effects), multi-select và rule ẩn của Photo Border (editor-layer-workspace KB-427..429)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff, portal (Artwork editor)
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb, kết quả AI do máy chạy), 2026-10-19
- **Locator:** QA-3414 TC-27 "[State] Undo / redo and duplicate layer at size 1", result_QA-3414_B1_2026-10-19.md, staging, không ghi số build portal; bản fix đã deploy staging theo QA xác nhận 2026-10-19. Bản Duplicate không được lưu (Cancel), chưa kiểm Border của bản copy sau khi save. Liên quan, không bị thay: editor-layer-workspace KB-428, CHK-021 (undo step khi multi-select). (CCR cũ: CBS-027 CLAIM-08)
- **Căn cứ expected:** KHÔNG CÓ
- **Trích nguyên văn:**
  ```
  TC-27 | ✅ AI — size 3 → 1, Undo → size 3 render (ring 3 px), Redo → size 1 render; Duplicate layer → copy "Choose dog copy" has the same border, both layers `farFromShapePx 0` | pixel measure per layer | Duplicate discarded (Cancel, not saved)
  ```
