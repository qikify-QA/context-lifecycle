### CLAIM-01

- **Statement:** Layer clipart bật Border kiểu Contour cut với Border size = 1 có viền đi theo outline phần đục của clipart, không thành khung vuông theo bounding box của layer.
- **Object / feature:** artwork/MỚI: layer-photo-border — Thuộc: tuỳ chọn Border trên toolbar layer (Enable photo border, Type Contour cut / Custom shape, Border color, Border size, Add a thin line, Display border on) và kết quả vẽ viền ở các bề mặt; Không thuộc: preset shape-cut của Print Effects (layer-print-effects), multi-select và rule ẩn của Photo Border (editor-layer-workspace KB-427..429)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff, portal (Artwork editor)
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb, kết quả AI do máy chạy), 2026-10-19
- **Locator:** QA-3414 (QA Hub task TIB-218) TC-01 "[Regression] Artwork editor: Contour cut at Border size 1 follows the clipart outline (reported case)", result_QA-3414_B1_2026-10-19.md, staging, không ghi số build portal; bản fix đã deploy staging theo QA xác nhận 2026-10-19. Chỉ kiểm Artwork editor trên 1 layer Clipart Category. Đo ở zoom 50% (TC viết 100%). Liên quan: layer-config-image (FEAT-13). (CCR cũ: CBS-027 CLAIM-01)
- **Căn cứ expected:** Jira TIB-5592 description (Expectation), 2026-10-19, mô tả lỗi tạo từ Slack, không phải sign-off
- **Trích nguyên văn:**
  ```
  TC-01 | ✅ AI — size 1: no square frame; border never extends past the shape (`farFromShapePx 0`, `borderOutsideShapePx 0`); at 50% zoom the 1-unit border is thinner than 1 screen px and shows only along the soft clipart edge | pixel measure; evidence/pass_TC-01_editor_size1_no_square.png | Reported case fixed in the editor
  Expected của TC (03-testcases.md): "No square frame: the transparent-area point inside the bounding box equals the outside background (±3). Border present: a 1–2 px darker band touches the flower outline"
  Ngữ cảnh (description TIB-5592 — mô tả lỗi, không phải nguồn của claim):
  **Expectation:** The `Contour cut` border should follow the clipart shape at every `Border size`, including `1`, as it did before, without the color blending at small sizes.
  ```
