### CLAIM-21

- **Statement:** Known limitation: sau khi chọn 1 resolution, option "Default" bị disable, không chọn lại được; GPT/Gemini muốn quay lại output cũ chỉ còn cách tạo lại layer; Flux xoá cả 2 field → về output cũ (size theo tỉ lệ layer). PO chưa xác nhận chấp nhận cho release
- **Object / feature:** artwork/layer-config-image
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff; portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chinhdt), 2026-10-27; PO (trangdh) chưa trả lời phần chấp nhận release
- **Locator:** Jira TIB-5561 comment 55697 mục Q5. Bổ trợ TC-12 PASS 2026-10-27. Known limitation, KHÔNG dùng làm expected; chấp nhận cho release là câu của PO, chưa có trả lời, không coi là PO sign-off (CCR cũ: CBS-024 CLAIM-14)
- **Trích nguyên văn:**
  ```
  Câu hỏi: "Since "Default" cannot be re-selected after picking a value, how does a merchant get back to the pre-change output …? Is that acceptable for release?"
  - **Q5:** ok Q5. For GPT/Gemini, the only way back is to re-create the layer. For Flux, clearing both fields restores the old output. **PO to confirm release.**
  Ngữ cảnh (Dev summary, chinhdt, comment 2026-10-26, Known limitation):
  - After a resolution is picked, "Default" cannot be selected again from the dropdown. This is existing dropdown behaviour and is accepted for now.
  ```
