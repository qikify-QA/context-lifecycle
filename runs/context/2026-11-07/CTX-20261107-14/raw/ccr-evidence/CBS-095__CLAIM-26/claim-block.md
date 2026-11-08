### CLAIM-26

- **Statement:** Cảnh báo thiếu key trong danh sách effect (đã có từ trước) mở rộng: ngoài Remove background (remover bên thứ ba thiếu key), Cutout.pro, ImagenHub, nay còn OpenAI / Flux / Gemini thiếu key, "Gen AI Effect" khi Default settings chưa có default provider, và Remove background khi chưa chọn remover nào; chữ không đổi; áp cho danh sách effect của layer Photo, Multiple uploads, Text to image và global option Photo, Text to image
- **Object / feature:** artwork/layer-config-image (liên quan: global-option)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff; portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `dev_doc`
- **Người xác nhận, ngày nguồn:** Dev (giangnth), 2026-10-08
- **Locator:** "Change & test cases" v1 (tự sinh từ branch diff), Jira TIB-5470 comment giangnth, mục Missing-key warning in the Image effects list. Không có kết quả chạy có ngày (TC-32 chỉ có status passed trên Testlane). Liên quan artwork KB-017, KB-018, không thay (CCR cũ: CBS-029 CLAIM-18)
- **Trích nguyên văn:**
  ```
  - Before: covered Remove background (only when a third-party remover was chosen without its key), Cutout.pro and ImagenHub.
  - Now: also covers OpenAI, Flux and Gemini Gen AI effects without a key, "Gen AI Effect" when Default settings has no default provider, and Remove background when no remover is chosen at all. The message text is unchanged.
  - Where to see it: the effects list of the Photo, Multiple uploads and Text to image layer editors, and of the Photo and Text to image global option editors.
  Select Remove background with no remover chosen → warning names "Remove background" (new); with a Teeinblue remover → no warning.
  ```
