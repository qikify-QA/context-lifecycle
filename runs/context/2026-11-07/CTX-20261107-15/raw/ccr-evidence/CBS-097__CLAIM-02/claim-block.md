### CLAIM-02

- **Statement:** Known issue (server-side, không do Bulk edit): `PUT /api/artworks/{id}` nhận thay đổi trên layer `locked: true` (200, giá trị được lưu).
- **Object / feature:** artwork/artwork-save-persist
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner / staff (request lưu tự dựng); api
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA (phuongbb), 2026-10-30, không ai xác nhận
- **Locator:** QA-3419 — TC-37 ❌ trong `result_QA-3419_retest3-regression_2026-10-30.md` (cùng kết quả 2026-10-23, `result_QA-3419_security_2026-10-23.md`); bug draft BUG-07 (không file) | Link: https://qa-hub.ownego.com/test-cases?task=TIB-059 | Ngày, build: 2026-10-30 (lần quan sát cuối, build `assets/index.BMgdZMSW.js`, API `staging-api.teeinblue.com`) | KNOWN ISSUE, KHÔNG dùng làm expected (Phần 4.2). Chưa file bug riêng (BUG-07 chỉ là draft). Liên quan, không bị thay: KB-052, KB-055 (CCR cũ: CBS-025 CLAIM-25)
- **Trích nguyên văn:**
  ```
  TC-37 | ❌ AI — retest BUG-07: server still accepts a change to a locked layer | Captured the editor's own `PUT https://staging-api.teeinblue.com/api/artworks/[id]` (Save & Close), changed only L1 (layer-[id], locked true) form_label "L1" → "HACK37", sent once → **200**; GraphQL read-back L1 form_label "HACK37", locked true (03:58:58 UTC) | Same as 2026-10-23. Restored L1 "L1" (MCP). Server-side issue, not bulk edit (TC expected)
  ```
