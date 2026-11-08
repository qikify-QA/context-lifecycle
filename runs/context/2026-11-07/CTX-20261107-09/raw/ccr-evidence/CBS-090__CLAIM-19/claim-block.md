# CBS-090 CLAIM-19

Nguồn: Proposal CBS-090 (get_proposal 2026-11-07), khối A.

- **Statement:** Field điền sẵn theo thứ tự: (1) giá trị nhập lần trước cho biến này trên layer này, (2) default của option, (3) không có thì trống kèm hint; `Run effects` trong popover disabled tới khi mọi field có giá trị; bấm → đóng popover và chạy, mỗi lần xuất hiện của biến được thay bằng giá trị đã nhập
- **Object / feature:** artwork/MỚI: run-effects-fill-in-variables — Thuộc: popover "Fill in variables" khi bấm Run effects (field theo biến, điền sẵn, giá trị lưu, biến không khớp); Không thuộc: chèn biến vào prompt khi cấu hình (layer-config-image), thay biến trên storefront (sdk/genai-personalization-runtime)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff; portal · api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `spec_doc`
- **Người xác nhận, ngày nguồn:** PO (huyen.chu), 2026-10-26
- **Locator:** description TIB-5470, mục Update: Prompt variables › Fields, Run. Bổ trợ TC-60, 62, 64 PASS 2026-10-28 build index.OMERs7BG.js; TC-77 PASS 2026-10-28. Chữ hint thực tế đã đổi, xem CLAIM-25 (CCR cũ: CBS-029 CLAIM-23)
- **Trích nguyên văn:**
  ```
  - Prefill with the last entered value, then the option's default. If neither exists, show `No default value. Enter one to run.`
  ...
  **Run**
  
  - `Run effects` in the popover stays disabled until every field has a value.
  - Clicking `Run effects` closes the popover and runs the effects.
  ```
