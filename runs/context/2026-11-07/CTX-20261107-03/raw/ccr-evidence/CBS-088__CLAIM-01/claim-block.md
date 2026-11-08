# CBS-088 CLAIM-01 (Proposal CBS-088, submitted 2026-11-07)

- **Statement:** Design file định dạng PNG (PNG_RGB, PNG_RGBA, PNG_ADOBE_RGB, PNG_SRGB) của artwork có layer SVG dùng clip-path lồng nhiều cấp vẽ đúng hình đã mask.
- **Object / feature:** artwork/MỚI: svg-to-image-rendering — Thuộc: rasterize SVG sang ảnh ở thumbnail và design file theo Design format (PNG_*, EPS, AI, PDF), gồm áp clip-path, ảnh nhúng, nền theo format; Không thuộc: field cấu hình layer vector và upload SVG (layer-config-vector), render Word Cloud (layer-config-puzzles), render group (group-layer-order-design-render) (liên quan: order)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff (design file đơn hàng), api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `dev_doc`
- **Người xác nhận, ngày nguồn:** Dev (chauptm), 2026-09-23
- **Locator:** Jira TIB-5350, comment chauptm 2026-09-23 "Context / logic changes" (PR teeinblue-api #3836, v1, "Auto-generated from the branch diff"), mục root cause, Fix bullet DesignConverter::convertFromSVG(), Possible test cases bullet 2. Bổ trợ: QA-3395 TC-04 ✅ AI 2026-10-07 staging, chỉ PNG_RGB. Đối chiếu artwork/layer-config-vector KB-418: fixture đó chỉ có static-vector và báo "Line item cannot generate design" ở PNG_RGB. (CCR cũ: CBS-030 CLAIM-02)
- **Trích nguyên văn:**
  ```
  - `DesignConverter::convertFromSVG()` / `VectorRenderer` (final artwork render) — used Inkscape 1.2.2, which also fails on this pattern.
  ...
  - `DesignConverter::convertFromSVG()` — PNG branch (`PNG_RGB`/`PNG_RGBA`/`PNG_ADOBE_RGB`/`PNG_SRGB`) now shells out to resvg instead of Inkscape, preserving the same opaque-white-vs-transparent background behavior per format.
  ...
  - [ ] Place the same SVG as a vector layer on an artwork and render it (mockup/production) → final PNG shows the correctly masked shape.
  ```
