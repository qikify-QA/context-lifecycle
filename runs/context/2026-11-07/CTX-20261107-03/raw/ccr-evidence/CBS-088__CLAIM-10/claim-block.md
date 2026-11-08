# CBS-088 CLAIM-10 (Proposal CBS-088, submitted 2026-11-07)

- **Statement:** SVG layer image cũ, upload từ 05/2025 trước khi có resvg, render lại design PNG bình thường, không lỗi và không trống.
- **Object / feature:** artwork/layer-config-vector
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff, api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb, kết quả AI do máy chạy), 2026-10-07
- **Locator:** QA-3395 TC-16 (TC-TIB-4734, passed, TC dạng quan sát), staging, không ghi số build. Mẫu nhỏ (3 file); file thứ 3 không có <text> sống nên không chạm known issue mất chữ. Liên quan: layer-config-vector KB-128. (CCR cũ: CBS-030 CLAIM-11)
- **Căn cứ expected:** KHÔNG CÓ
- **Trích nguyên văn:**
  ```
  TC-16 | ✅ AI — 3 SVG cũ (05/2025, chưa từng qua resvg) re-render PNG OK, không lỗi/trống | artwork [đã bỏ id] PNG: tim cam ([đã bỏ id]), xe ([đã bỏ id], 5 clipPath), "Girls Weekend LAS VEGAS 2022" ([đã bỏ id], chữ đã outline, 0 `<text>`) | quan sát theo PENDING-06
  ```
