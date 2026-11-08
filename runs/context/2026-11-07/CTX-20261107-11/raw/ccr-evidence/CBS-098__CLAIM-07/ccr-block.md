### CLAIM-07

- **Statement:** Template đã ghé (đã hiện ảnh này, với position mang sang hoặc mặc định, dù buyer có chỉnh hay không) giữ position của nó và không bị thay bằng chỉnh sửa mới hơn ở template khác khi quay lại.
- **Object / feature:** sdk/MỚI: template-switch-photo-sync — Thuộc: sync ảnh và position của photo layer có reposition khi template đang chọn đổi (giữ, reset, warning tỉ lệ, round-trip, Multiple Uploads, đổi Size/option); Không thuộc: setting bật sync (sdk/product-page-settings-config), sync giá trị text, photo layer dùng Global Option.
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer, storefront
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chinhdt), 2026-10-21
- **Locator:** Jira TIB-5566 comment 55235 mục Q7. Bổ trợ: TC-10 ✅, TC-11 ✅ 2026-10-21 staging; dev summary 2026-10-21 mục Known limitations. (CCR cũ: CBS-026 CLAIM-07)
- **Trích nguyên văn:**
  ```
  Câu hỏi QA (comment 55234): "When does layer B count as 'already holding this same photo with a position of its own'? … Example: adjust in A (left) -> switch to B -> back to A, adjust (right) -> switch to B: does B show left or right?"
  Q7: B — a visit counts: once B has shown this photo (carried or default position), it keeps that position; in the example B shows left.
  ```
