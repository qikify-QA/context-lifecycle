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
