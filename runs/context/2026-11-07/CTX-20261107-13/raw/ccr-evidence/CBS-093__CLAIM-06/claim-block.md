### CLAIM-06

- **Statement:** Các loại layer dùng chung hàm vẽ viền đã fix gồm Clipart Category, Dynamic clipart (dynamic_by_text), Clipart group, Linked clipart, Static image và Photo Upload (ảnh buyer upload, Contour cut), và border kiểu Custom shape theo mask cũng dùng chung hàm này.
- **Object / feature:** artwork/MỚI: layer-photo-border — Thuộc: tuỳ chọn Border trên toolbar layer (Enable photo border, Type Contour cut / Custom shape, Border color, Border size, Add a thin line, Display border on) và kết quả vẽ viền ở các bề mặt; Không thuộc: preset shape-cut của Print Effects (layer-print-effects), multi-select và rule ẩn của Photo Border (editor-layer-workspace KB-427..429) (liên quan: sdk)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff (cấu hình) và buyer (Photo Upload), portal và storefront
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chauptm), 2026-10-19
- **Locator:** Jira TIB-5592 comment 55072, mục 3 (Q3). QA chỉ kiểm Clipart Category; loại khác và Custom shape (TC-16..22) chưa chạy, không assert như đã verified. Liên quan: layer-config-image KB-017, layer-duplicate-link-copy KB-045, layer-print-effects KB-425 (custom_shape vẽ từ mask), editor-layer-workspace KB-429 (Photo Border bị ẩn khi selection có layer Linked). (CCR cũ: CBS-027 CLAIM-06)
- **Trích nguyên văn:**
  ```
  Hỏi (Q3): "Does the fix also cover Photo Upload, Static image, Clipart group and Dynamic clipart layers with Contour cut, or only Clipart Category?"
  Đáp: 3. Các loại layer được fix
    1. Clipart Category, Dynamic clipart (dynamic_by_text), Clipart group, Linked clipart, Static image.
    2. Photo Upload (ảnh buyer tự upload, Contour cut).
    3. Border kiểu custom shape theo mask cũng dùng chung hàm này
  ```
