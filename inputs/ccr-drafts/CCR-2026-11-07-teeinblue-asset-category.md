# Context Change Request: asset-category — gộp từ 2 Proposal khuôn cũ

- **Product:** `teeinblue`
- **Object:** `asset-category`
- **Ticket:** `TIB-5350, QA-3395, TIB-5412`
- **Các khối có trong file:** `A`

## Mức độ gấp

`MEDIUM` — mức cao nhất trong các Proposal gốc (MEDIUM); lý do gốc theo từng Proposal:

- CBS-030: MEDIUM — Canon thiếu coverage cho render SVG và design format, nhưng không có checklist đang publish nào kiểm hành vi này nên không có gì đang chạy sai (QA phuongbb xác nhận 2026-11-01).
- CBS-032: MEDIUM — Canon thiếu coverage cho so khớp tên của Dynamic Clipart by Text; không có checklist đang publish nào kiểm hành vi này nên không có gì chạy sai ngay (QA phuongbb, 2026-11-01).

# Khối A — Hành vi

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

### CLAIM-02

- **Statement:** Fix TIB-5412 chỉ ở client (teeinblue-sdk); tên clipart lúc lưu ở teeinblue-api không được chuẩn hoá, việc này để ngoài PR như follow-up tuỳ chọn.
- **Object / feature:** asset-category/asset-category-item-management (liên quan: artwork)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff (lưu tên clipart); api, db
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** Dev (chauptm) viết, không ai xác nhận, 2026-09-23
- **Locator:** Jira TIB-5412 comment 51755 mục Notes, gạch đầu dòng 1. QA hỏi có cần ticket follow-up không (Q2), không có trả lời. Liên quan, không bị thay: KB-015. Render server-side (RQ12) chưa có trả lời, không đề xuất gì. (CCR cũ: CBS-032 CLAIM-04)
- **Trích nguyên văn:**
  ```
  - This fix is scoped to `teeinblue-sdk` only (client-side matching). Normalizing the clipart `name` on save in `teeinblue-api` (`ClipartController.php`) was identified as the deeper root-cause fix but scoped out as an optional backend follow-up — not included in this PR.
  ```
