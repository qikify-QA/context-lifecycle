# Context Change Request: artwork-design-format — field Artwork design format quyết định format file order design

- **Product:** `teeinblue`
- **Object:** `artwork`
- **Ticket:** `TIB-4726 (QA-3416)`
- **Các khối có trong file:** `A`

## Mức độ gấp

`MEDIUM` — CONTRADICTS KB-053 và mọi TC giả định có nút Export/Download design riêng; Proposal gốc không chọn mức gấp, mức này do người soạn lại đề xuất.

# Khối A — Hành vi

### CLAIM-01

- **Statement:** Format file order design (AI/EPS/PDF/SVG/PNG/JPEG…) do field 'Artwork design format' trong dialog 'Artwork details' (pencil cạnh tên artwork) quyết định — multi-select nhiều format (PNG_RGB, PNG_SRGB, PNG_ADOBE_RGB, JPEG, JPEG_CMYK, JPEG_CMYK_COATED_FOGRA39, SVG, EPS, AI, PDF…) rồi Save; KHÔNG có nút Export/Download design riêng trên artwork editor
- **Object / feature:** artwork/artwork-save-persist
- **Quan hệ với canon:** `CONTRADICTS KB-053`
- **Scope:** seller (owner/staff); portal · api
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA Yến (sửa trực tiếp) — không phải PO/Dev, 2026-10-29
- **Locator:** apps/tib/knowledge/product_facts.md dòng 529 (FACT-179); apps/tib/outputs/QA-3416/results/result_QA-3416_B2-TC29_2026-10-23.md (TC-29) | https://ownego.atlassian.net/browse/TIB-4726 · https://ownego.atlassian.net/browse/QA-3416 | Ghi chú: Chưa xác minh end-to-end: TC-29 tick tạm hoãn (AI), chưa có order thật để đối chiếu file sinh ra; đây là lời QA sửa lại giả định cũ. (CCR cũ: CBS-042 CLAIM-09)
- **OQ:** CONFLICT — Format file order design do field Artwork design format quyết định và không có nút Export/Download riêng, đúng không (chưa có order thật để đối chiếu, nguồn là QA tự sửa)? — Người trả lời: Dev. Side A: KB-053 và các TC giả định có nút Export/Download design riêng / Side B: FACT-179 của QA, chỉ field Artwork design format trong dialog Artwork details quyết định format.
- **Trích nguyên văn:**
  ```
  product_facts.md dòng 529: - [FACT-179] **Format file order design (AI/EPS/PDF/SVG/PNG/JPEG…) do field "Artwork design format" trong dialog "Artwork details" quyết định, KHÔNG phải nút Export/Download riêng trên artwork editor.** Mở "Artwork details" (pencil cạnh tên artwork) → multi-select format (PNG_RGB, PNG_SRGB, PNG_ADOBE_RGB, JPEG, JPEG_CMYK, JPEG_CMYK_COATED_FOGRA39, SVG, EPS, AI, PDF…) → chọn thêm AI/EPS/PDF/SVG → Save. Khi có order thật, file order design sinh ra đúng (các) format đã chọn ở đây — không có control "Export/Download design" độc lập trên artwork editor như model trước giả định (QA-3416 TC-29, ảnh minh hoạ `apps/tib/outputs/QA-3416/evidence/web_20261029T043213_image.png`).
  QA-3416 TC-29 (result_QA-3416_B2-TC29_2026-10-23): ⏸️ AI — cần dev/QA chỉ nơi export file thật (AI/EPS/PDF/SVG) cho artwork chưa gắn order — Precondition đã dựng xong và PERSIST đúng qua GraphQL: `rectangle-1` (layer-<id>, artwork #<id>) `shadow_enabled:true, shadow_offset_x:5, shadow_offset_y:5, shadow_blur:10`; `ellipse-1` (layer-<id>) bbox 235.29×205.88 (không đối xứng, đạt). UI panel "Enable shadow" của rectangle-1 tự hiện đúng cảnh báo `(Shadow does NOT work with AI, EPS, or PDF format)` — khớp 1:1 với lesson cũ trích trong expected của TC này.
  ```
