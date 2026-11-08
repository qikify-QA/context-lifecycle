# CBS-088 CLAIM-09 (Proposal CBS-088, submitted 2026-11-07)

- **Statement:** Layer QR Code render nguyên vẹn và quét ra đúng chuỗi ở cả design PNG (resvg) lẫn PDF (Inkscape) của cùng đơn.
- **Object / feature:** artwork/layer-config-others
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff (design file), api (order design)
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb, kết quả AI do máy chạy), 2026-10-07
- **Locator:** QA-3395 TC-06 (TC-TIB-4724, passed), staging, không ghi số build; cùng lượt TC-01/02/04 cho thấy resvg đã live. (CCR cũ: CBS-030 CLAIM-10)
- **Căn cứ expected:** KHÔNG CÓ
- **Trích nguyên văn:**
  ```
  TC-06 | ✅ AI — QR render nguyên vẹn, decode đúng chuỗi ở cả PNG (resvg) và PDF (Inkscape) cùng order | OpenCV decode PNG 37×52 = `'cnn.com'`; PDF 60×80 = `'cnn.com'`
  ```
