### CLAIM-16

- **Statement:** Validate Flux width/height: không có max riêng từng field (chỉ diện tích ≤ 4,000,000; 15625 = 4,000,000 / 256); < 256 hoặc chỉ điền 1 field → portal chặn khi Save bằng lỗi field, không gửi request; qua API/MCP chỉ 1 field → được nhận nhưng bỏ qua (size theo tỉ lệ layer)
- **Object / feature:** artwork/layer-config-image
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff (portal) + client API/MCP; portal · api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chinhdt), 2026-10-27
- **Locator:** Jira TIB-5561 comment 55697 mục Q2. Bổ trợ TC-13, TC-14 PASS 2026-10-27. Phần API/MCP chỉ 1 field bị bỏ qua chưa kiểm (CCR cũ: CBS-024 CLAIM-07)
- **Trích nguyên văn:**
  ```
  Câu hỏi: "For Flux width/height on Multiple uploads / Text-to-image: is the max per field 15625 …, is a value under 256 blocked in the input or rejected on save, and what happens (message) when only one of width / height is filled?"
  - **Q2:** Same as Single upload. There is no per-field max, only width × height ≤ 4,000,000 (15625 = 4,000,000 / 256). Under 256, or only one field filled, is blocked on Save by the portal as a field error, and no request is sent. Via API/MCP a single field is accepted but ignored, and the size comes from the layer ratio.
  ```
