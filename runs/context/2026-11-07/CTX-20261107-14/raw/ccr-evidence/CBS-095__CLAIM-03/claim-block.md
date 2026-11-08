### CLAIM-03

- **Statement:** Mockup và ảnh product đẩy lên store dùng cùng NoPersonalizationPhotoTransformer nên theo cùng fit rule của photo layer "No personalization".
- **Object / feature:** artwork/MỚI: no-personalization-photo-render — Thuộc: render phía server và thời điểm render lại của photo layer "No personalization" (mockup, ảnh product đẩy lên store, job order design); Không thuộc: cấu hình layer và fit rule (layer-config-image), linked copy (layer-duplicate-link-copy), runtime SDK trên storefront (sdk) (liên quan: product-base, campaign)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff (sync campaign); api, storefront (ảnh product trên store)
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chauptm), 2026-10-26
- **Locator:** Jira TIB-5521 comment 55637 mục Q1. Bổ trợ: TC-21 ✅ 2026-10-26 staging (ảnh product trên Shopify sau sync); mockup render riêng ở Mockups list chưa kiểm. Tên class là chi tiết code tại 2026-10-26, không phải oracle. (CCR cũ: CBS-019 CLAIM-03)
- **Trích nguyên văn:**
  ```
  Câu hỏi (QA): "Do mockup generation and product images pushed to stores use the new fit rule?"
  
  Q1 – Đồng ý. Mockup (Mockups/PrintareaTransformer) và ảnh product đẩy lên store (PlatformProductTransformer, CampaignMockupLayerProjector) đều đi qua ArtworkTransformer → NewLayerArtworkTransformer → NoPersonalizationPhotoTransformer.
  ```
