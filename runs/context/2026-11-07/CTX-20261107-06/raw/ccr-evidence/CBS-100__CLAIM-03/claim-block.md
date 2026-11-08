### CLAIM-03

- **Statement:** Portal không có loại global option Multiple Uploads (không tạo, sửa được trên portal); MCP tạo được một MU GO nhưng portal mở nó như form text
- **Object / feature:** global-option/global-option-instance-management
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff (portal) + client MCP; portal · api
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA (phuongbb) quan sát, 2026-10-27; không có Dev, PO xác nhận
- **Locator:** QA-3435 ghi chú TC-08 (bước MU GO = N/A, không phải PASS). Phần portal không có MU GO khớp global-option KB-001 ("Multiple Uploads[Unavailable]"); phần MCP tạo được và portal mở như form text chưa có trong canon. Dev summary không nhắc MU GO. Chỉ là quan sát QA (CCR cũ: CBS-024 CLAIM-20)
- **Trích nguyên văn:**
  ```
  MU GO: N/A — portal has no Multiple Uploads GO type; an MCP-created MU GO (<id>) opened as a text form → deleted. Obs: MCP lets you create a MU GO the portal cannot edit
  Đối chiếu: dev summary (2026-10-26) chỉ nói "The same setting is added to the **Text-to-image** layer and its global option" — không nhắc MU GO. Canon `global-option` KB-001: "Multiple Uploads[Unavailable]".
  ```
