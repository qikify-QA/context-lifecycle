# CBS-088 CLAIM-11 (Proposal CBS-088, submitted 2026-11-07)

- **Statement:** clip-path trỏ tới id không tồn tại thì shape hiện đầy đủ, không bị clip, còn clip-path khai qua CSS style vẫn clip đúng.
- **Object / feature:** artwork/MỚI: svg-to-image-rendering — Thuộc: rasterize SVG sang ảnh ở thumbnail và design file theo Design format (PNG_*, EPS, AI, PDF), gồm áp clip-path, ảnh nhúng, nền theo format; Không thuộc: field cấu hình layer vector và upload SVG (layer-config-vector), render Word Cloud (layer-config-puzzles), render group (group-layer-order-design-render) (liên quan: asset-category)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff, api và portal (thumbnail)
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb, kết quả AI do máy chạy), 2026-10-07
- **Locator:** QA-3395 TC-28 (TC-TIB-4746, passed), phần (a) và (c), staging, không ghi số build. Phần (b) không thuộc claim: thông báo "no viewBox" khi upload XML hỏng chỉ là quan sát UX, không dùng làm expected. (CCR cũ: CBS-030 CLAIM-12)
- **Căn cứ expected:** KHÔNG CÓ
- **Trích nguyên văn:**
  ```
  TC-28 | ✅ AI — (a) `url(#khong-ton-tai)`: shape không bị clip (ô xanh đầy); (b) XML malformed: bị từ chối gọn, không 500, nhưng message là "This SVG has no viewBox attribute…" thay vì "Invalid SVG"; (c) clip-path qua CSS `style` → ngôi sao đúng | thumbnail [đã bỏ id] = ô xanh đầy; [đã bỏ id] = sao xanh
  ```
