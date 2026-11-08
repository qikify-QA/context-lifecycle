# CBS-088 CLAIM-12 (Proposal CBS-088, submitted 2026-11-07)

- **Statement:** Upload SVG làm layer image hoặc clipart thì bản lưu bị bỏ DOCTYPE, ENTITY (XXE không resolve, không lộ nội dung file hệ thống) và thẻ <script>, và upload không trả 500.
- **Object / feature:** artwork/layer-config-vector (liên quan: asset-category)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff (upload SVG), api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb, kết quả AI do máy chạy), 2026-10-07
- **Locator:** QA-3395 TC-17 (TC-TIB-4735), TC-21 (TC-TIB-4739), passed, staging, không ghi số build. Hành vi upload có sẵn, kiểm cùng lượt, không phải do TIB-5350 thay đổi. SSRF, DoS, file cực lớn (TC-18/19/20) chưa kiểm. Liên quan: layer-config-vector KB-128 (POST /api/layer-images/svg), asset-category-item-management KB-015 (POST /api/cliparts/svg). (CCR cũ: CBS-030 CLAIM-13)
- **Căn cứ expected:** KHÔNG CÓ
- **Trích nguyên văn:**
  ```
  TC-17 | ✅ AI — XXE không resolve: DOCTYPE + entity bị sanitize bỏ, `<text>` rỗng; thumbnail trắng, không có nội dung `/etc/passwd` | stored SVG layer-image [đã bỏ id] / clipart [đã bỏ id]: không có `DOCTYPE`/`ENTITY`/`root:` (grep = 0) | upload không 500
  TC-21 | ✅ AI — `<script>` bị bỏ khi sanitize, thumbnail chỉ còn ô tím | stored SVG [đã bỏ id]/[đã bỏ id]: `grep -c script` = 0; thumbnail tím `#8e24aa`
  ```
