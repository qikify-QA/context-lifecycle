# Context Change Request: artwork-global-template — xoá Global Template, sửa ở local template, phạm vi trong một artwork — rev2 (đối chiếu nguồn 2026-11-12)

- **Product:** `teeinblue`
- **Object:** `artwork`
- **Ticket:** `không rõ (item không gắn ticket)`
- **Các khối có trong file:** `A`

## Mức độ gấp

`LOW` — trả lời một phần OQ-artwork-024; không checklist đang publish nào bị chạy sai. Proposal gốc không chọn mức gấp, mức này do người soạn lại đề xuất.

> Ghi chú rev2: giữ nội dung Proposal CBS-111 (blocked). Đã tra spec-hub (log_id 235, 240; feature `artwork-editor` version 3): không có rule nào nói về xoá Global Template hay control khoá/mở ở local template; chỉ có mô tả dữ liệu feature cho CLAIM-03 (không có rule id nên không đủ S3). Không có task Testlane hay ticket Jira được nêu. Claim gốc từ QA nên xếp rule QA có chủ (S2) theo quyết định operator 2026-11-12, trừ CLAIM-01 là P1 (mất dữ liệu) vẫn cần S3. Tên cá nhân được thay bằng vai trò.

# Khối A — Hành vi

### CLAIM-01

- **Statement:** Global Template — Xoá Global Template mà layer đã sync thì layer vẫn ở lại, thành layer local bình thường (đúng thiết kế, vì không được làm mất design seller đã có)
- **Object / feature:** artwork/artwork-template-management
- **Quan hệ với canon:** `ADD`
- **Scope:** seller (owner/staff); portal
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN` (rule P1 mất dữ liệu: không dùng S2, cần S3)
- **Người xác nhận, ngày nguồn:** QA (user đính chính, persona nhóm F) — không phải PO/Dev, không rõ ngày
- **Locator:** apps/tib/knowledge/product_facts.md dòng 43 (FACT-008) | Ghi chú: Item không ghi ngày/ticket, chỉ biết đã có trong knowledge QA trước 2026-09-11. Có thể thuộc feature artwork-template-management hoặc layer-duplicate-link-copy; agent xử lý CCR quyết. (CCR cũ: CBS-042 CLAIM-10). Tra 2026-11-12: spec-hub không có rule về xoá Global Template; feature `artwork-editor` chỉ mô tả "One template can be marked global" (xem CLAIM-03).
- **OQ:** NEEDS_CONFIRMATION — Xoá Global Template thì layer đã sync ở lại thành layer local bình thường, có đúng thiết kế không (không có ticket/ngày, chỉ là lời QA)? — Người trả lời: Dev.
- **OQ:** Câu hỏi cho Dev/PO (để lên S3): Khi seller xoá (hoặc bỏ đánh dấu global) Global Template của một artwork, các layer đã sync sang local template có được giữ lại thành layer local độc lập, với nguyên vị trí, kích thước và giá trị đang có không, hay bị xoá khỏi local template? Nếu được, xin trả lời kèm ticket hoặc link spec.
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
- **Loại nguồn:** `QA_RULE`
- **Người xác nhận, ngày nguồn:** QA (user đính chính, persona nhóm F) — không phải PO/Dev, không rõ ngày (có trước 2026-09-11)
- **Locator:** apps/tib/knowledge/product_facts.md dòng 45 (FACT-010) | Ghi chú: Item không ghi ngày/ticket; xem ghi chú claim Global Template đầu tiên trong file. (CCR cũ: CBS-042 CLAIM-11). spec-hub (log_id 240): không có rule; rule gần nhất `artwork-editor-copy-paste` (green) chỉ nói "Layers that are copies of the global template cannot be copied."
- **Rule QA có chủ:** FACT-010 · owner_role QA · recorded_on: không ghi ngày trong CCR (chỉ biết trước 2026-09-11) · locator Proposal CBS-111 CLAIM-02. Lưu ý: thiếu ngày ghi nhận cụ thể thì reviewer có thể vẫn xếp S0; cần operator điền ngày nếu có.
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
- **Loại nguồn:** `QA_RULE`
- **Người xác nhận, ngày nguồn:** QA (user đính chính, persona nhóm F) — không phải PO/Dev, không rõ ngày (có trước 2026-09-11)
- **Locator:** apps/tib/knowledge/product_facts.md dòng 51 (FACT-016) | Ghi chú: Item không ghi ngày/ticket; xem ghi chú claim Global Template đầu tiên trong file. (CCR cũ: CBS-042 CLAIM-12). Bổ trợ (không phải rule, không đủ S3): spec-hub project `teeinblue`, feature `artwork-editor` version 3, mục `data` "Templates" (đọc 2026-11-12) — khớp nội dung claim nhưng không có rule id/`sure`.
- **Rule QA có chủ:** FACT-016 · owner_role QA · recorded_on: không ghi ngày trong CCR (chỉ biết trước 2026-09-11) · locator Proposal CBS-111 CLAIM-03. Lưu ý như CLAIM-02 về ngày.
- **OQ:** NEEDS_CONFIRMATION — Global Template chỉ global trong một artwork và không dùng chung giữa các artwork, có đúng không (không ticket/ngày, chỉ là lời QA)? — Người trả lời: Dev. (OQ-artwork-024 phủ một phần.)
- **Trích nguyên văn:**
  ```
  product_facts.md dòng 51: - [FACT-016] **Global Template chỉ global TRONG MỘT ARTWORK** (đồng bộ giữa các template của artwork đó), không dùng chung giữa các artwork.
  spec-hub feature artwork-editor (v3), data "Templates": "An artwork has one or more templates (for example front and back, or design variations). One template can be marked global: its layers are repeated in every other template and stay in sync."
  ```
