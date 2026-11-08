Tách từ CLAIM-03 (positional). Block gốc:

### CLAIM-03

- **Statement:** Khi layer đích khác tỉ lệ (lệch quá 5%), ảnh reset về placement mặc định theo Fit mode của layer đích (Cover hoặc Contain) và hiện warning "Your photo doesn't match this design's aspect ratio, so it may not fit perfectly. Re-adjust or upload another photo if needed."; giữ position thì không warning, reset thì có warning.
- **Object / feature:** sdk/MỚI: template-switch-photo-sync — Thuộc: sync ảnh và position của photo layer có reposition khi template đang chọn đổi (giữ, reset, warning tỉ lệ, round-trip, Multiple Uploads, đổi Size/option); Không thuộc: setting bật sync (sdk/product-page-settings-config), sync giá trị text, photo layer dùng Global Option.
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer, storefront
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb, kết quả [AI] do máy chạy trên Chrome của QA), 2026-10-21
- **Locator:** QA-3415 TC-03, TC-04, TC-07 trong result_QA-3415_B1-S1-clean_2026-10-21.md; staging SDK app-v1.js Last-Modified 2026-10-21 05:56:15 GMT, Chrome sạch. Chữ đầy đủ của warning lấy từ result_QA-3415_B1-S1_2026-10-21.md, file mà CCR cũ xếp là lượt SDK cache cũ không hợp lệ; lượt sạch chỉ ghi chữ cắt ngắn. (CCR cũ: CBS-026 CLAIM-03)
- **Căn cứ expected:** Jira TIB-5566 dev summary (chinhdt, comment 2026-10-21): "Destination layer has a different aspect ratio: the photo still resets to its default position (fill/fit per the layer's fit mode), and the ratio warning message still shows."
- **Trích nguyên văn:**
  ```
  TC-03 | ✅ AI — T3 (2:1 Cover) reset default + warning | T3 `{x:0,y:-0.0625,w:1,h:1.125}` (tràn đều trên/dưới 0.0625), preview 650×365.63 `translate(0 -20.3125)`; warning "Your photo doesn't match this design's aspect ratio, so it m…"
  TC-04 | ✅ AI — T3c (2:1 Contain) reset default Contain + warning | portrait T1 `{x:-0.225,y:-0.4333,w:1.05,h:1.8667}` → T3c `{x:0.3594,y:0,w:0.2813,h:1}`, preview 182.85×325 `translate(233.61 0)` (cả ảnh trong layer, căn giữa); warning hiện
  TC-07 | ✅ AI — 5.1% (T6 1000×1051): reset default + warning | T6 `{x:-0.4342,y:0,w:1.8684,h:1}` (default), preview 607.23×341.57 `translate(-141.115 0)`; warning hiện
  Chữ đầy đủ của warning (ghi trong `result_QA-3415_B1-S1_2026-10-21.md`, phần selector): "Your photo doesn't match this design's aspect ratio, so it may not fit perfectly. Re-adjust or upload another photo if needed."
  Ngữ cảnh (Dev summary, chinhdt, comment 2026-10-21):
  - **Destination layer has a different aspect ratio**: the photo still resets to its default position (fill/fit per the layer's fit mode), and the ratio warning message still shows. The 5% threshold is the same one the warning uses, so a kept position never shows the warning and a reset one always does.
  ```
