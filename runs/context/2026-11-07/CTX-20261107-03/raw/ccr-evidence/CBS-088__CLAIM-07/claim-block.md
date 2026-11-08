# CBS-088 CLAIM-07 (Proposal CBS-088, submitted 2026-11-07)

- **Statement:** Word Cloud bật color source = shape ("Use shape's color") trên shape SVG có clip-path chỉ lấy màu chữ từ vùng shape nhìn thấy, không lấy từ vùng bị clip bỏ.
- **Object / feature:** artwork/layer-config-puzzles
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer và store owner/staff, api (render design)
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb, kết quả AI do máy chạy), 2026-10-07
- **Locator:** QA-3395 TC-29 (TC-TIB-4770, passed), staging, không ghi số build. Liên quan: layer-config-puzzles KB-031. (CCR cũ: CBS-030 CLAIM-08)
- **Căn cứ expected:** Jira TIB-5350, comment chauptm 2026-10-07 (PR #3836, commit ffef0097f; dev không ghi auto-generated)
- **Trích nguyên văn:**
  ```
  TC-29 | ✅ AI — Word Cloud color source = Shape trên SVG chained clip: chữ chỉ mang màu đỏ/xanh dương trong vùng sao đã mask, không chữ nào ngoài sao | artwork [đã bỏ id] PNG preview [đã bỏ id]: WC1 chỉ có chữ đỏ + xanh dương trong vùng sao
  Ngữ cảnh (dev, comment 2026-10-07):
  - [ ] Word Cloud with color source = Shape on that SVG → word colors are sampled from the visible shape, with no colors from the clipped-away area.
  ```
