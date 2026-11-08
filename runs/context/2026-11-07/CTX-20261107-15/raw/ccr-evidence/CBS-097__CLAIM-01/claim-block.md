### CLAIM-01

- **Statement:** Hai tab cùng sửa một layer: lần save sau thắng cho cả layer (thay đổi của tab kia mất, không cảnh báo, không 500)
- **Object / feature:** artwork/artwork-save-persist
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff; portal
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA (phuongbb) quan sát, 2026-10-27; không có Dev, PO xác nhận
- **Locator:** QA-3435 TC-34 2026-10-27; TC chỉ "record", expected cho phép cả last save wins lẫn values merged, không assert hành vi đúng. Liên quan artwork KB-052 (PUT ghi đè toàn bộ artwork). Chỉ là quan sát QA (CCR cũ: CBS-024 CLAIM-22)
- **Trích nguyên văn:**
  ```
  TC-34 | ✅ AI — concurrent edits: last save wins for the whole layer | tab A gem 1K → 2K saved; tab B (stale) provider flux 1200×800 saved → final JSON {flux, gpt 3840, gem 1K, flux 1200×800}; tab A's change lost, no warning, no 500 | Record (expected portal behaviour)
  ```
