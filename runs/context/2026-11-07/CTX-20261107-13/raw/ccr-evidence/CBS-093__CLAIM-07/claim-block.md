### CLAIM-07

- **Statement:** Thiết lập Border lưu và đọc lại đúng sau Save & Close và reload, và API lưu ở field photo_border gồm size, type, color, display, line, enabled, với display mockup_order ứng với "Mockup Preview & Order Design".
- **Object / feature:** artwork/MỚI: layer-photo-border — Thuộc: tuỳ chọn Border trên toolbar layer (Enable photo border, Type Contour cut / Custom shape, Border color, Border size, Add a thin line, Display border on) và kết quả vẽ viền ở các bề mặt; Không thuộc: preset shape-cut của Print Effects (layer-print-effects), multi-select và rule ẩn của Photo Border (editor-layer-workspace KB-427..429)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff, portal và api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb, kết quả AI do máy chạy), 2026-10-19
- **Locator:** QA-3414 TC-04 "[Data] Border settings at size 1 are saved and reloaded", result_QA-3414_B1_2026-10-19.md, staging, không ghi số build portal; bản fix đã deploy staging theo QA xác nhận 2026-10-19, đọc lại qua UI và MCP get-artwork. Liên quan: artwork-save-persist. (CCR cũ: CBS-027 CLAIM-07)
- **Căn cứ expected:** KHÔNG CÓ
- **Trích nguyên văn:**
  ```
  TC-04 | ✅ AI — after Save & Close and reload the Border popup shows Enable ON, Contour cut, `#4E2626`, size `1`, thin line OFF, *Mockup Preview & Order Design*; API `photo_border` = `{size:1, type:contour_cut, color:#4E2626, display:mockup_order, line:false, enabled:true}` | toast "Your artwork has been updated"; MCP get-artwork
  ```
