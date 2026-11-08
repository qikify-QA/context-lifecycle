### CLAIM-04

- **Statement:** Sau fix TIB-5521 không có gì tự render lại: ảnh trên store đổi ở lần sync tới, order design đổi khi Re-generate, artwork thumbnail đổi khi save artwork, riêng SDK preview (Campaign Editor, storefront) đổi ngay khi SDK deploy.
- **Object / feature:** artwork/MỚI: no-personalization-photo-render — Thuộc: render phía server và thời điểm render lại của photo layer "No personalization" (mockup, ảnh product đẩy lên store, job order design); Không thuộc: cấu hình layer và fit rule (layer-config-image), linked copy (layer-duplicate-link-copy), runtime SDK trên storefront (sdk) (liên quan: order, campaign, sdk)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff; api, storefront, portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chauptm), 2026-10-26
- **Locator:** Jira TIB-5521 comment 55637 mục Q2. QA chưa kiểm chiều "trước sync/Re-generate/save thì KHÔNG đổi", chỉ thấy chiều ngược (TC-21, TC-22); không có đơn trước fix có layer ảnh mặc định trên staging. (CCR cũ: CBS-019 CLAIM-04)
- **Trích nguyên văn:**
  ```
  Câu hỏi (QA): "Are existing product images on stores and existing order designs re-rendered automatically, or only on the next sync / Re-generate design?"
  
  Q2 – Đồng ý, cần nói thêm. Không có gì tự render lại. Ảnh trên store chỉ đổi ở lần sync tới, order design chỉ đổi khi Re-generate, thumbnail chỉ đổi khi save artwork. Riêng preview của SDK (Campaign Editor, storefront) thay đổi ngay khi SDK được deploy.
  ```
