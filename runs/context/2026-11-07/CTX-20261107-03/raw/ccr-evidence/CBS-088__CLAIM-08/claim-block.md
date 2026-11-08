# CBS-088 CLAIM-08 (Proposal CBS-088, submitted 2026-11-07)

- **Statement:** Word Cloud không bị ảnh hưởng ở các trường hợp còn lại: shape SVG đơn giản không clip và shape PNG đều lấp chữ trong shape, tắt custom shape thì chữ lấp đầy ô vuông.
- **Object / feature:** artwork/layer-config-puzzles
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer và store owner/staff, api (render design)
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb, kết quả AI do máy chạy), 2026-10-07
- **Locator:** QA-3395 TC-30 (TC-TIB-4771), TC-31 (TC-TIB-4772), passed, staging, không ghi số build. Không có ảnh trước fix để so pixel, "không đổi" chỉ kiểm theo logic shape. Liên quan: layer-config-puzzles KB-031. (CCR cũ: CBS-030 CLAIM-09)
- **Căn cứ expected:** KHÔNG CÓ
- **Trích nguyên văn:**
  ```
  TC-30 | ✅ AI — shape SVG đơn giản (sao, không clip) → chữ lấp trong sao | artwork [đã bỏ id] WC2 | không có pixel baseline trước fix — kiểm theo logic shape
  TC-31 | ✅ AI — (a) shape PNG sao → chữ lấp trong sao; (b) tắt shape → chữ lấp đầy ô vuông | artwork [đã bỏ id] WC3 / WC4
  ```
