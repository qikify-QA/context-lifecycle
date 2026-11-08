### CLAIM-09

- **Statement:** Với layer "No personalization" không có ảnh mặc định và không có retrieval value, job order design fail (RenderableObjectValidationException, sub layer url null); hành vi lỗi này có từ trước và TIB-5521 không đổi.
- **Object / feature:** artwork/MỚI: no-personalization-photo-render — Thuộc: render phía server và thời điểm render lại của photo layer "No personalization" (mockup, ảnh product đẩy lên store, job order design); Không thuộc: cấu hình layer và fit rule (layer-config-image), linked copy (layer-duplicate-link-copy), runtime SDK trên storefront (sdk) (liên quan: order)
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer đặt đơn, store owner xử lý đơn; api (order design job)
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chauptm), 2026-10-26
- **Locator:** Jira TIB-5521 comment 55639 mục RQ6. Bổ trợ: TC-30 ✅ 2026-10-26 staging, render_failed "The url field is required." (chữ khác tên exception dev nêu). Không dùng làm expected: ứng viên bug cho ticket riêng, chưa ai nói đây là đúng. (CCR cũ: CBS-019 CLAIM-09)
- **Trích nguyên văn:**
  ```
  Câu hỏi (QA): "Layer No personalization không có default image và không có retrieval value thì preview/design vẽ gì?"
  
  Design API: hiện KHÔNG generate được — sub layer url null bị RenderableObjectValidationException, job fail. Hành vi này có từ trước TIB-5521, ticket không thay đổi flow này
  ```
