# CBS-090 CLAIM-24

Nguồn: Proposal CBS-090 (get_proposal 2026-11-07), khối A.

- **Statement:** Giá trị nhập lưu riêng từng layer; còn sau mỗi lượt chạy và sau khi mở lại artwork (không reload trang); xoá khi reload trang (popover quay về default, hoặc trống + hint); không chia sẻ sang browser, tab hoặc staff khác; không ghi vào default của option trong artwork
- **Object / feature:** artwork/MỚI: run-effects-fill-in-variables — Thuộc: popover "Fill in variables" khi bấm Run effects (field theo biến, điền sẵn, giá trị lưu, biến không khớp); Không thuộc: chèn biến vào prompt khi cấu hình (layer-config-image), thay biến trên storefront (sdk/genai-personalization-runtime)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff; portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** PO (huyen.chu), 2026-10-28
- **Locator:** Jira TIB-5470 comment 55851 dòng Q2 A, chọn phiên bản dev mô tả cùng ngày. Bổ trợ TC-69, 70, 71, 72 PASS 2026-10-28 build index.OMERs7BG.js. "Không chia sẻ sang browser, tab, staff" chưa kiểm trực tiếp (CCR cũ: CBS-029 CLAIM-28)
- **Trích nguyên văn:**
  ```
  Q2 A. Clear on page reload.
  Phiên bản dev mà PO chọn (giangnth, 2026-10-28):
  - Dev's version: per layer, kept after running and after reopening the artwork, but **cleared on a page reload**, and not shared with another browser, tab or staff member. Keeping them past a reload would mean saving them in the artwork data (they would then only stick after Save) or in a new server store.
  - A) Clear on page reload (dev suggestion) · B) Keep after reload too
  Spec (2026-10-26): "Save the last-entered values separately for each layer. Values stay after each run." · "e.g. typing `Anna` for `{{Name}}` on layer 1 prefills `Anna` next time on layer 1 only; layer 2 starts from the option's default."
  ```
