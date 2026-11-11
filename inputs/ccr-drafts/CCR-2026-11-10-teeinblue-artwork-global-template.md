# Context Change Request: artwork-global-template — xoá Global Template, sửa ở local template, phạm vi trong một artwork

- **Product:** `teeinblue`
- **Object:** `artwork`
- **Ticket:** `không rõ (item không gắn ticket)`
- **Các khối có trong file:** `A`

## Mức độ gấp

`LOW` — trả lời một phần OQ-artwork-024; không checklist đang publish nào bị chạy sai. Proposal gốc không chọn mức gấp, mức này do người soạn lại đề xuất.

# Khối A — Hành vi

### CLAIM-01

- **Statement:** Global Template — Xoá Global Template mà layer đã sync thì layer vẫn ở lại, thành layer local bình thường (đúng thiết kế, vì không được làm mất design seller đã có)
- **Object / feature:** artwork/artwork-template-management
- **Quan hệ với canon:** `ADD`
- **Scope:** seller (owner/staff); portal
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA Yến (user đính chính, persona nhóm F) — không phải PO/Dev, không rõ
- **Locator:** apps/tib/knowledge/product_facts.md dòng 43 (FACT-008) | Ghi chú: Item không ghi ngày/ticket, chỉ biết đã có trong knowledge QA trước 2026-09-11. Có thể thuộc feature artwork-template-management hoặc layer-duplicate-link-copy; agent xử lý CCR quyết. (CCR cũ: CBS-042 CLAIM-10)
- **OQ:** NEEDS_CONFIRMATION — Xoá Global Template thì layer đã sync ở lại thành layer local bình thường, có đúng thiết kế không (không có ticket/ngày, chỉ là lời QA)? — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  product_facts.md dòng 43: - [FACT-008] **Xoá Global Template mà layer đã sync vẫn ở lại (thành layer local bình thường) — ĐÚNG**, vì không được làm mất design seller đã có.
  ```

### CLAIM-02

- **Statement:** Global Template — Ở local template vẫn SỬA ĐƯỢC: màu chữ, font size min/max, drop shadow, background, Transform, Align; chỉ font family bị khoá, và các panel settings không mở được
- **Object / feature:** artwork/artwork-template-management
- **Quan hệ với canon:** `ADD`
- **Scope:** seller (owner/staff); portal
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA Yến (user đính chính, persona nhóm F) — không phải PO/Dev, không rõ
- **Locator:** apps/tib/knowledge/product_facts.md dòng 45 (FACT-010) | Ghi chú: Item không ghi ngày/ticket; xem ghi chú claim Global Template đầu tiên trong file. (CCR cũ: CBS-042 CLAIM-11)
- **OQ:** NEEDS_CONFIRMATION — Ở local template chỉ font family bị khoá, còn màu chữ, font size min/max, drop shadow, background, Transform, Align sửa được, có đúng và còn hiện hành không (không ticket/ngày, chỉ là lời QA)? — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  product_facts.md dòng 45: - [FACT-010] **Ở local template vẫn SỬA ĐƯỢC:** màu chữ, font size min/max, drop shadow, background, Transform, Align. Chỉ **font family** bị khoá, và các panel settings không mở được.
  ```

### CLAIM-03

- **Statement:** Global Template — Global Template chỉ global TRONG MỘT ARTWORK (đồng bộ giữa các template của artwork đó), không dùng chung giữa các artwork
- **Object / feature:** artwork/artwork-template-management
- **Quan hệ với canon:** `ADD`
- **Scope:** seller (owner/staff); portal
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA Yến (user đính chính, persona nhóm F) — không phải PO/Dev, không rõ
- **Locator:** apps/tib/knowledge/product_facts.md dòng 51 (FACT-016) | Ghi chú: Item không ghi ngày/ticket; xem ghi chú claim Global Template đầu tiên trong file. (CCR cũ: CBS-042 CLAIM-12)
- **OQ:** NEEDS_CONFIRMATION — Global Template chỉ global trong một artwork và không dùng chung giữa các artwork, có đúng không (không ticket/ngày, chỉ là lời QA)? — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  product_facts.md dòng 51: - [FACT-016] **Global Template chỉ global TRONG MỘT ARTWORK** (đồng bộ giữa các template của artwork đó), không dùng chung giữa các artwork.
  ```
