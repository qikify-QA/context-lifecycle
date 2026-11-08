# CBS-088 CLAIM-04 (Proposal CBS-088, submitted 2026-11-07)

- **Statement:** Theo tài liệu dev, nền design file là trong suốt với PNG_RGBA và trắng đục với PNG_RGB, PNG_ADOBE_RGB, PNG_SRGB, giữ như mặc định Inkscape cũ.
- **Object / feature:** artwork/MỚI: svg-to-image-rendering — Thuộc: rasterize SVG sang ảnh ở thumbnail và design file theo Design format (PNG_*, EPS, AI, PDF), gồm áp clip-path, ảnh nhúng, nền theo format; Không thuộc: field cấu hình layer vector và upload SVG (layer-config-vector), render Word Cloud (layer-config-puzzles), render group (group-layer-order-design-render) (liên quan: order)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff (design file gửi nhà in), api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `dev_doc`
- **Người xác nhận, ngày nguồn:** Dev (chauptm), 2026-09-23
- **Locator:** Jira TIB-5350, comment chauptm 2026-09-23 "Context / logic changes" (PR teeinblue-api #3836, v1, "Auto-generated from the branch diff"), Fix bullet DesignConverter::convertFromSVG(), Possible test cases bullet 5 và 6. Mâu thuẫn nội bộ với CLAIM-06: QA đo staging 2026-10-07 thấy ngược lại, không tái hiện được nền trắng đục. Giữ cả hai phía, không dùng làm expected tới khi PO/Dev trả lời PENDING-09. PNG_RGBA chưa thử được (TC-09 ⏸️). (CCR cũ: CBS-030 CLAIM-05)
- **Trích nguyên văn:**
  ```
  - [ ] `PNG_RGBA` conversion (vector layer render) → background stays transparent.
  - [ ] `PNG_RGB` / `PNG_ADOBE_RGB` / `PNG_SRGB` conversion → background is opaque white (matches prior Inkscape default behavior).
  ```
