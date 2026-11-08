### CLAIM-06

- **Statement:** Hành vi hiện tại có từ trước, không phải expected: trên staging (TIB-5416 tạm revert) Global Option photo layer dùng chung một position cho mọi template và giữ nguyên khi đổi template, trên layer khác tỉ lệ có thể trông bị giãn, là bug cũ do TIB-5416 sửa.
- **Object / feature:** global-option/artwork-personalization-global-option-link (liên quan: sdk)
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer, storefront
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chinhdt), 2026-10-21
- **Locator:** Jira TIB-5566 comment 55235 mục Q9; dev summary 2026-10-21 (staging note). TC-24 chưa chạy. Có thể đã khác khi TIB-5416 lên; không suy ra gì cho production. Liên quan, không thay: global-option KB-029, CHK-02-004. (CCR cũ: CBS-026 CLAIM-17)
- **Trích nguyên văn:**
  ```
  Câu hỏi QA (comment 55234): "On staging (TIB-5416 reverted), do Global Option photo layers still reset to the default position on every template switch, as in TIB-5220?"
  Q9: B — on staging (TIB-5416 reverted) Global Option photo layers share one position across templates, and it stays as-is on a template switch; on a layer of another ratio it may look stretched, which is the existing bug TIB-5416 fixes.
  Dev summary (chinhdt, 2026-10-21 — ngữ cảnh):
  - Global Option photo layers are not covered by this change. Per-layer positions for Global Options are handled in TIB-5416.

  **Staging note**: TIB-5416 has been temporarily reverted on staging (SDK `build-staging`) so this issue can be tested on its own.
  ```
