### CLAIM-09

- **Statement:** Known issue chưa file và chưa ai xác nhận: Contour cut Border size = 0 trong Artwork editor vẽ viền dày như size 10 thay vì không có viền.
- **Object / feature:** artwork/MỚI: layer-photo-border — Thuộc: tuỳ chọn Border trên toolbar layer (Enable photo border, Type Contour cut / Custom shape, Border color, Border size, Add a thin line, Display border on) và kết quả vẽ viền ở các bề mặt; Không thuộc: preset shape-cut của Print Effects (layer-print-effects), multi-select và rule ẩn của Photo Border (editor-layer-workspace KB-427..429)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff, portal (Artwork editor)
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA (phuongbb, kết quả AI do máy chạy, không ai xác nhận), 2026-10-19
- **Locator:** QA-3414 TC-03 ❌ "[Boundary] Border size 0 and large sizes" trong result_QA-3414_B1_2026-10-19.md; bug draft BUG-01 chưa submit, chưa chạy lại. "Expected: no border" là suy luận của QA từ min = 0, không phải lời dev/PO. Hành vi lỗi quan sát được, không dùng làm oracle. Chưa kiểm storefront và Order Design ở size 0. (CCR cũ: CBS-027 CLAIM-09)
- **Trích nguyên văn:**
  ```
  TC-03 | ❌ AI — size 0 renders a thick border (same as size 10) instead of no border. Sizes 4 / 10 correct: ring 4 px / 6 px, `farFromShapePx 0` | size 0 → `borderOutsideShapePx 3783`, `maxRingPx 6` (= size 10); input accepts 0 (`min="0"`); evidence/bug_TC-03_editor_size0_renders_thick_border.png | Q2: min is 0 → expected no border. Production comparison for 4/10 not done (no prod artwork). Size 100 not run
  
  **Border size 0 renders as a thick border in the Artwork editor.** Repro: artwork [đã bỏ id] → select "Choose dog" → Border → Contour cut → set Border size `0`. Expected: no border (min = 0 per dev Q2). Actual: the canvas shows a thick border identical to size 10 (looks like 0 falls back to the default size 10).
  ```
