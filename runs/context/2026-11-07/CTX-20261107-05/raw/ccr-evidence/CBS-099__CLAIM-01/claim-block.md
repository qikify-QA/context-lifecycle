### CLAIM-01

- **Statement:** Thumbnail của clipart hoặc layer image SVG có clip-path, kể cả clip-path lồng qua nhiều <clipPath>, hiện đúng hình đã mask, không hiện outer bounding shape.
- **Object / feature:** asset-category/asset-category-item-management (liên quan: artwork)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff, api và portal (listing clipart, thư viện)
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `dev_doc`
- **Người xác nhận, ngày nguồn:** Dev (chauptm), 2026-09-23
- **Locator:** Jira TIB-5350, comment chauptm 2026-09-23 "Context / logic changes" (PR teeinblue-api #3836, v1, "Auto-generated from the branch diff"), mục root cause, Fix, Possible test cases bullet 1. Bổ trợ: QA-3395 TC-01, TC-02 ✅ AI 2026-10-07 staging. Liên quan, không bị thay: asset-category-item-management KB-015. (CCR cũ: CBS-030 CLAIM-01)
- **Trích nguyên văn:**
  ```
  - `ThumbnailMaker::makeFromSvg()` (clipart/layer-image thumbnails) — used ImageMagick's built-in MSVG coder, which is not spec-compliant for this case.
  ...
  - `ThumbnailMaker::makeFromSvg()` — rasterizes through resvg first, then hands the PNG to the existing Imagick resize/trim/extent pipeline.
  ...
  - [ ] Upload an SVG clipart/layer-image with a `clip-path` chained through multiple `<clipPath>` elements → thumbnail shows the correctly masked shape, not the outer bounding shape.
  ```

