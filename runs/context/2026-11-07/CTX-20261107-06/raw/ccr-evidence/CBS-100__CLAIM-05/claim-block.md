### CLAIM-05

- **Statement:** Save (edit) global option ngày 2026-10-27 gửi request PUT (server trả 422 với lỗi validate `data.effects.0.flux_output_width`); `GET /api/global-options/{id}` tồn tại (GO của mình 200, GO account khác 403 "This action is unauthorized.", id không có 404)
- **Object / feature:** global-option/global-option-instance-management
- **Quan hệ với canon:** `CONTRADICTS KB-006, KB-034`
- **Scope:** store owner/staff; api
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA (phuongbb) quan sát, 2026-10-27; không có Dev, PO xác nhận
- **Locator:** Network ghi trong QA-3435 TC-16, TC-17 (PASS, nhưng TC không kiểm đường request) và TC-32 (tạm dừng). URL của PUT không ghi lại; chưa biết GraphQL có còn đi kèm không; có thể khác do build hoặc loại sửa (đổi title, đổi data effect). Canon hiện: KB-006 và KB-034 đang UNRESOLVED trong CONF-CBS-004-01 (OQ-global-option-022), cả hai ghi POST /api/graphql; CHK-01-007, CHK-01-014 đã hạ NEEDS_CONFIRMATION. Không đủ để sửa check khi chưa re-explore, không chọn phía (CCR cũ: CBS-024 CLAIM-23)
- **Trích nguyên văn:**
  ```
  TC-16 | … Flux 2000×2001 → PUT 422, toasts "Failed to save global option." + "Something went wrong! Flux dimension … 4 Megapixel)"; 2000×2000 → 200
  TC-17 | … GO <id>: 1200×800 → 3000×2000 → 422 same message (`data.effects.0.flux_output_width`); 2000×2000 → 200
  TC-32 | ⏸️ AI — GET blocked (403); PUT to another account's GO not sent | `GET /api/global-options/{<id>}` → 403 "This action is unauthorized.", no data; missing <id> → 404; own <id> → 200
  Phía canon (giữ nguyên, không thay): `global-option` KB-006 (2026-09-15): "action Save KHÔNG gọi REST PUT /api/global-options/{id} mà gọi 1 GraphQL mutation do client tự dựng tên 'updateGlobalOption' … tới POST /api/graphql, trả 200."
  ```
