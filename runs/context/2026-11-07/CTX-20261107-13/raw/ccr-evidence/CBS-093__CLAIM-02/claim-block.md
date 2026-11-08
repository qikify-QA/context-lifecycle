### CLAIM-02

- **Statement:** Contour cut ở Border size 1, 2, 3 chỉ vẽ màu viền thành vòng ngoài hình, không ám lên pixel clipart hay vùng trong suốt trong bounding box, và trong editor ảnh viền nằm dưới ảnh clipart.
- **Object / feature:** artwork/MỚI: layer-photo-border — Thuộc: tuỳ chọn Border trên toolbar layer (Enable photo border, Type Contour cut / Custom shape, Border color, Border size, Add a thin line, Display border on) và kết quả vẽ viền ở các bề mặt; Không thuộc: preset shape-cut của Print Effects (layer-print-effects), multi-select và rule ẩn của Photo Border (editor-layer-workspace KB-427..429)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff, portal (Artwork editor)
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb, kết quả AI do máy chạy), 2026-10-19
- **Locator:** QA-3414 TC-02 "[Regression] Artwork editor: no color tint at Border size 1, 2, 3", result_QA-3414_B1_2026-10-19.md, staging, không ghi số build portal; bản fix đã deploy staging theo QA xác nhận 2026-10-19. Bổ trợ: chauptm comment 55072 (Q5) "đã fix cho cả case 2-3". Ở zoom 50% size 2 và 3 cho cùng một vòng, chưa phân biệt được độ dày. Số đo pixel không phải giá trị chuẩn. (CCR cũ: CBS-027 CLAIM-02)
- **Căn cứ expected:** Jira TIB-5592 description (Expectation), 2026-10-19; Jira TIB-5592 comment 55072 (Q5), 2026-10-19
- **Trích nguyên văn:**
  ```
  TC-02 | ✅ AI — no tint at sizes 1, 2, 3: the border image sits under the clipart and is drawn only around the shape; border pixels outside the shape = RGB (78,38,38) ≈ `#4E2626` (pure border color); no border pixels far from the shape | sizes 2 and 3: `borderOutsideShapePx 772`, `farFromShapePx 0`, `maxRingPx 3` | Sizes 2 and 3 render the same ring at 50% zoom (both ≈ 1 screen px)
  ```
