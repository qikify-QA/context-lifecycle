### CLAIM-08

- **Statement:** Thứ tự field của tab Re-order được lưu ở templates[].positions, còn templates[].layers không đổi thứ tự khi reorder.
- **Object / feature:** artwork/artwork-save-persist
- **Quan hệ với canon:** `UNKNOWN`
- **Scope:** store owner/staff, api, db
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA (phiên automation có AI hỗ trợ), chưa ai xác nhận, 2026-09-28
- **Locator:** Ghi chú của QA khi duyệt spec TC-03 (qna.json → backfill.why.TC-03, 2026-09-28), không assert riêng. KB-053 mô tả positions là "mảng layer id theo thứ tự render"; nếu positions thật ra là thứ tự form thì KB-053 cần làm rõ. Giữ cả hai phía, không đề xuất thay KB-053. Quan sát, không dùng làm expected. (CCR cũ: CBS-033 CLAIM-05)
- **Trích nguyên văn:**
  ```
  … rồi đọc lại thứ tự thật từ GraphQL positions (không phải templates.layers, cái đó không đổi khi reorder).
  Canon phía bên kia (KB-053): "positions (mảng layer id theo thứ tự render)".
  ```
