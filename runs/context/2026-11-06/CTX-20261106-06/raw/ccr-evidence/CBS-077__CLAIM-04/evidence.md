# CLAIM-04: block 5.1 nguyên văn của CCR

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** Jira TIB-5522; skill-rules-audit.md #50, #51 (rule `mockup-import-null-layer-url`)
- **Link:** https://ownego.atlassian.net/browse/TIB-5522
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-15
- **Người viết / người xác nhận:** QA
- **Trích nguyên văn:**
  - skill-rules-audit.md #50, rule `mockup-import-null-layer-url`, nguồn ghi: người dùng chốt 2026-10-15; TIB-5522:
    ```
    Import from Campaigns sang campaign **khác product base** thì campaign mockup đích không cần giữ `mockup_id` (null là chấp nhận được, người dùng chốt 2026-10-15).
    ```
  - skill-rules-audit.md #51, rule `mockup-import-null-layer-url`, nguồn ghi: người dùng chốt 2026-10-15; TIB-5522:
    ```
    **Publish dựa vào preview đã render**, không render lại nếu đã có preview. Người dùng chốt (TIB-5522, 2026-10-15): còn preview (kể cả preview cũ copy qua clone) → publish thành công là bình thường; chưa có preview → publish bị chặn (instance Error, log nêu layer) là đúng. Test publish với layer hỏng phải dùng campaign mockup **chưa từng có preview** (vd add product mới); set null qua DB sau khi đã generate thì publish vẫn dùng ảnh cũ. Save trong Mockup Editor mà không sửa gì không generate lại.
    ```
- **File đính kèm cho claim này:** không có

