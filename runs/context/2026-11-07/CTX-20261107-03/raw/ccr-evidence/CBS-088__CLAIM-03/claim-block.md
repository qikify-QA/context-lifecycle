# CBS-088 CLAIM-03 (Proposal CBS-088, submitted 2026-11-07)

- **Statement:** SVG có ảnh raster nhúng qua <image href="data:…"> không tiền tố xlink: vẫn hiện ảnh nhúng ở thumbnail và design PNG.
- **Object / feature:** artwork/MỚI: svg-to-image-rendering — Thuộc: rasterize SVG sang ảnh ở thumbnail và design file theo Design format (PNG_*, EPS, AI, PDF), gồm áp clip-path, ảnh nhúng, nền theo format; Không thuộc: field cấu hình layer vector và upload SVG (layer-config-vector), render Word Cloud (layer-config-puzzles), render group (group-layer-order-design-render) (liên quan: asset-category)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff, api và portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `dev_doc`
- **Người xác nhận, ngày nguồn:** Dev (chauptm), 2026-09-23
- **Locator:** Jira TIB-5350, comment chauptm 2026-09-23 "Context / logic changes" (PR teeinblue-api #3836, v1, "Auto-generated from the branch diff"), Fix bullet ThumbnailMaker::makeFromSvg(), Possible test cases bullet 4. Bổ trợ: QA-3395 TC-08 ✅ AI 2026-10-07 staging. (CCR cũ: CBS-030 CLAIM-04)
- **Trích nguyên văn:**
  ```
  Removed the now-unneeded `normalizeEmbeddedRasterImages()` MSVG-specific workaround (resvg reads `href` correctly natively).
  ...
  - [ ] SVG with an embedded raster image via `<image href="data:...">` (bare `href`, no `xlink:` prefix) → still resolves and rasterizes the embedded image correctly.
  ```
