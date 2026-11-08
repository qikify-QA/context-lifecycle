### CLAIM-05

- **Statement:** Border size có min = 0, step = 1 và không có max.
- **Object / feature:** artwork/MỚI: layer-photo-border — Thuộc: tuỳ chọn Border trên toolbar layer (Enable photo border, Type Contour cut / Custom shape, Border color, Border size, Add a thin line, Display border on) và kết quả vẽ viền ở các bề mặt; Không thuộc: preset shape-cut của Print Effects (layer-print-effects), multi-select và rule ẩn của Photo Border (editor-layer-workspace KB-427..429)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff, portal (Border popup)
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chauptm), 2026-10-19
- **Locator:** Jira TIB-5592 comment 55072, mục 2 (Q2). Bổ trợ: TC-03 2026-10-19 staging ghi input min="0"; không có max và step chưa kiểm (TC-23 chưa chạy). Dev chỉ nêu giới hạn input, chưa ai nói size 0 phải vẽ gì (xem CLAIM-09). (CCR cũ: CBS-027 CLAIM-05)
- **Trích nguyên văn:**
  ```
  Hỏi (Q2): "What is the allowed Border size range (min, max, decimals)?"
  Đáp: 2. Giới hạn Border size: min = 0, step = 1, không có max
  ```
