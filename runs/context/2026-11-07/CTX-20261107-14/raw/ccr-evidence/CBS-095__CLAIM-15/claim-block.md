### CLAIM-15

- **Statement:** Field đi theo model hiện tại của account: GPT trên model không có resolution → field ẩn, giá trị đã lưu bị bỏ qua (size cố định như trước); Gemini pro ↔ 31 dùng chung 1 field, giá trị đã lưu giữ nguyên và được dùng; 0.5K lưu dưới 31 → generate 2K khi account ở pro (dropdown lúc đó không chọn gì)
- **Object / feature:** artwork/layer-config-image (liên quan: sdk)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff (cấu hình) + buyer (kết quả generate); portal · storefront
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chinhdt), 2026-10-27
- **Locator:** Jira TIB-5561 comment 55697 mục Q1. Bổ trợ TC-05, TC-06 PASS 2026-10-27; TC-06 thấy dropdown không chọn gì (không hiện Default, không hiện 2K) (CCR cũ: CBS-024 CLAIM-02)
- **Trích nguyên văn:**
  ```
  Câu hỏi: "When the account switches its Gen AI model (e.g. Gemini pro → nano_banana_31, or GPT to gpt-image-1.5 which has no resolution), what does the layer show and use …?"
  - **Q1:** ok Q1. The field follows the current model. GPT on a model without resolution: the field is hidden and the value is ignored (fixed sizes as before). Gemini pro ↔ 31 share the same field, so the saved value stays and is used. A 0.5K value saved on 31 falls back to 2K on pro.
  ```
