### CLAIM-08

- **Statement:** Layer "No personalization" không có ảnh mặc định và không có retrieval value thì SDK preview không vẽ gì (có từ trước).
- **Object / feature:** artwork/layer-config-image (liên quan: sdk)
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (storefront) + store owner/staff (Campaign Editor); storefront (SDK preview), portal (Campaign Editor)
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chauptm), 2026-10-26
- **Locator:** Jira TIB-5521 comment 55639 mục RQ6. Bổ trợ: TC-30 ✅ 2026-10-26 staging. Hành vi hiện tại có từ trước, không dùng làm expected. (CCR cũ: CBS-019 CLAIM-08)
- **Trích nguyên văn:**
  ```
  Câu hỏi (QA): "Layer No personalization không có default image và không có retrieval value thì preview/design vẽ gì?"
  
  RQ6: Preview SDK: không render gì (A).
  ```
