# CBS-088 CLAIM-13 (Proposal CBS-088, submitted 2026-11-07)

- **Statement:** Tên file SVG upload được làm sạch (test.png.svg thành test.png, ../../evil.svg thành evil), file lưu với key ngẫu nhiên nên không path traversal, và tên dài hơn 255 ký tự bị chặn bằng validate.
- **Object / feature:** artwork/layer-config-vector
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff (upload SVG), api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb, kết quả AI do máy chạy), 2026-10-07
- **Locator:** QA-3395 TC-22 (TC-TIB-4740, passed), staging, không ghi số build. Hành vi upload có sẵn, không phải do TIB-5350 thay đổi. Phần hiển thị trên UI chưa xem. Liên quan: layer-config-vector KB-128. (CCR cũ: CBS-030 CLAIM-14)
- **Căn cứ expected:** KHÔNG CÓ
- **Trích nguyên văn:**
  ```
  TC-22 | ✅ AI — tên file giả mạo được làm sạch, key lưu ngẫu nhiên, không path traversal; tên > 255 ký tự bị validate chặn | `test.png.svg` → name `test.png`, url `…/image-layers/[đã bỏ id].svg`; `../../evil.svg` → name `evil`, url `…/[đã bỏ id].svg`; 300 ký tự → "The filenames.2 field must not be greater than 255 characters." | phần hiển thị trên UI chưa xem (REPL không login được)
  ```
