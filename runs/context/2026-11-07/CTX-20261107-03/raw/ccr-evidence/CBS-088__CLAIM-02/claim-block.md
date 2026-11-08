# CBS-088 CLAIM-02 (Proposal CBS-088, submitted 2026-11-07)

- **Statement:** Chỉ nhánh PNG đổi sang resvg, còn export EPS, AI và PDF vẫn đi qua Inkscape.
- **Object / feature:** artwork/MỚI: svg-to-image-rendering — Thuộc: rasterize SVG sang ảnh ở thumbnail và design file theo Design format (PNG_*, EPS, AI, PDF), gồm áp clip-path, ảnh nhúng, nền theo format; Không thuộc: field cấu hình layer vector và upload SVG (layer-config-vector), render Word Cloud (layer-config-puzzles), render group (group-layer-order-design-render)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff, api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `dev_doc`
- **Người xác nhận, ngày nguồn:** Dev (chauptm), 2026-09-23
- **Locator:** Jira TIB-5350, comment chauptm 2026-09-23 "Context / logic changes" (PR teeinblue-api #3836, v1, "Auto-generated from the branch diff"), Fix bullet "Inkscape is kept", Possible test cases bullet 7. Bổ trợ: QA-3395 TC-15 ✅ AI 2026-10-07 staging, chỉ PDF, kiểm cấu trúc bằng PyMuPDF. EPS và AI chưa kiểm, chỉ dựa dev doc. (CCR cũ: CBS-030 CLAIM-03)
- **Trích nguyên văn:**
  ```
  - Inkscape is **kept** for the non-PNG export formats (`svgToEPS`/`svgToAI`/`svgToPDF`) — resvg doesn't produce those.
  ...
  - [ ] SVG export to EPS / AI / PDF (unaffected paths) → still works via Inkscape, no regression.
  ```
