### CLAIM-19

- **Statement:** Đổi provider: giá trị ẩn của provider khác được giữ và bỏ qua (SDK chỉ gửi field của provider hiện tại), đổi lại thì giá trị cũ hiện lại; Flux size ẩn (kể cả > 4 MP) không chặn save
- **Object / feature:** artwork/layer-config-image (liên quan: sdk)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff (cấu hình) + buyer (request generate); portal · storefront
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chinhdt), 2026-10-27
- **Locator:** Jira TIB-5561 comment 55697 mục Q10. Bổ trợ TC-10, TC-18 PASS 2026-10-27 (CCR cũ: CBS-024 CLAIM-12)
- **Trích nguyên văn:**
  ```
  Câu hỏi: "After switching provider GPT ↔ Gemini (or model pro → 31), is the hidden resolution of the other provider cleared, or kept and ignored at generation?"
  - **Q10:** Kept and ignored. The portal keeps hidden values, and the SDK sends only the current provider's field, so switching back brings the old value back. Hidden Flux sizes don't block saving. Pro → 31 is the same field, so the value is used (see Q1/Q6).
  ```
