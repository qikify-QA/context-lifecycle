# CBS-088 CLAIM-05 (Proposal CBS-088, submitted 2026-11-07)

- **Statement:** Đo trên staging, design file PNG_RGB, PNG_ADOBE_RGB, PNG_SRGB là PNG RGBA nền trong suốt (alpha 0), giống nhau trước và sau fix; PNG_ADOBE_RGB nhúng ICC "Adobe RGB (1998)", PNG_SRGB nhúng ICC "sRGB IEC61966-2.1".
- **Object / feature:** artwork/MỚI: svg-to-image-rendering — Thuộc: rasterize SVG sang ảnh ở thumbnail và design file theo Design format (PNG_*, EPS, AI, PDF), gồm áp clip-path, ảnh nhúng, nền theo format; Không thuộc: field cấu hình layer vector và upload SVG (layer-config-vector), render Word Cloud (layer-config-puzzles), render group (group-layer-order-design-render) (liên quan: order)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff (design file gửi nhà in), api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA (phuongbb, số đo AI do máy chạy, không ai xác nhận là đúng), 2026-10-07
- **Locator:** QA-3395 TC-10, TC-11, TC-12 (để ⏸️ chờ PENDING-09, không PASS), result_QA-3395_all_2026-10-07.md. Mâu thuẫn nội bộ với CLAIM-05. Chỉ là số đo của một lượt chạy, không phải hành vi đúng hay giá trị chuẩn, không dùng làm expected. (CCR cũ: CBS-030 CLAIM-06)
- **Trích nguyên văn:**
  ```
  TC-10 | ⏸️ AI — PENDING-09: PNG_RGB sau fix ra RGBA nền TRONG SUỐT (không phải trắng đục như TC giả định), GIỐNG hệt PNG_RGB trước fix (order 15–17/09, artwork [đã bỏ id] format `rgb`: cũng RGBA nền trong suốt) → không phải hồi quy; expected của TC sai so với hành vi thật | order [đã bỏ id] PNG: pixel (2,2)=(255,255,255,0); alpha0=13 009 177/17 731 584 px. Pre-fix order [đã bỏ id] (artwork [đã bỏ id], rgb): RGBA, 1 152 805 px trong suốt
  TC-11 | ⏸️ AI — PENDING-09: PNG_ADOBE_RGB có `iCCP` Adobe RGB (1998) ✔, nền trong suốt (alpha 0) như TC-10 | order [đã bỏ id] 60×80 PNG 5760×7680 RGBA, iCCP desc "Adobe RGB (1998)", pixel (2,2)=(255,255,255,0)
  TC-12 | ⏸️ AI — PENDING-09: PNG_SRGB có ICC sRGB IEC61966-2.1 ✔, nền trong suốt như TC-10 | order [đã bỏ id] 37×52 PNG RGBA, iCCP "sRGB IEC61966-2.1", pixel (2,2)=(255,255,255,0)
  ```
