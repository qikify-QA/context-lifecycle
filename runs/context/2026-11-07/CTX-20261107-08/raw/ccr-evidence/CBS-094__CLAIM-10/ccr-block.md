### CLAIM-10

- **Statement:** Thay đổi hành vi cho layer có sẵn: layer Text to Image giữ resolution Gemini chọn khi account ở nano_banana_pro, nay account ở nano_banana_31 → resolution đó được dùng (trước: bị bỏ qua), hiện trong dropdown. PO chưa xác nhận chấp nhận / T2I còn beta-only
- **Object / feature:** sdk/genai-personalization-runtime (liên quan: artwork)
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (layer T2I có sẵn); storefront
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chinhdt), 2026-10-27; PO (trangdh) chưa trả lời phần chấp nhận và "T2I beta-only"
- **Locator:** Jira TIB-5561 comment 55697 mục Q6. Bổ trợ TC-28 PASS 2026-10-27. Dev mô tả hành vi; chấp nhận cho release và "Text to Image chỉ cho beta" là câu của PO, chưa có trả lời, không coi là PO sign-off (CCR cũ: CBS-024 CLAIM-16)
- **Trích nguyên văn:**
  ```
  Câu hỏi: "Existing Text-to-image layers with a Gemini resolution saved under nano_banana_pro will now use it on nano_banana_31 (before: ignored) — accepted change for live merchants?"
  - **Q6:** Only affects layers that saved a resolution on pro and then switched to 31. The value is visible in the dropdown. **PO to confirm** it is accepted, and that Text-to-image is beta-only.
  Ngữ cảnh (Dev summary, chinhdt, comment 2026-10-26, Known limitation):
  - A Text-to-image layer that still holds a Gemini resolution chosen while the account was on nano_banana_pro will now use that resolution when the account is on nano_banana_31. Before this change it was ignored.
  ```

