### CLAIM-01

- **Statement:** Photo layer "No personalization" được coi là populated khi retrieval_value bật và customization_data có ảnh, bất kể nguồn (output photo, {{input}}, {{input.N}}); transformer API không phân biệt nguồn.
- **Object / feature:** artwork/layer-config-image (liên quan: sdk)
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (storefront) + store owner/staff (cấu hình layer); api, storefront (SDK preview)
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chauptm), 2026-10-26
- **Locator:** Jira TIB-5521 comment 55637 mục Q4. Bổ trợ: QA-3402 TC-06/07 (nguồn photo), TC-09 (Photo Reposition), TC-10 (Multiple Uploads {{input.1}}), TC-11 (output effect) ✅ 2026-10-26 staging; nguồn {{input}} trần chưa kiểm. (CCR cũ: CBS-019 CLAIM-01)
- **Trích nguyên văn:**
  ```
  Câu hỏi (QA): "Which populate sources make a layer 'populated' (contain): a photo source, and also Multiple Uploads {{input.N}}?"
  
  Q4 – Đồng ý. Layer được coi là populated khi retrieval_value bật và có ảnh trong customization_data, nguồn nào cũng tính: output của photo, {{input}} hay {{input.N}}. Transformer không phân biệt nguồn.
  ```
