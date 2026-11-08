# CBS-090 CLAIM-15

Nguồn: Proposal CBS-090 (get_proposal 2026-11-07), khối A.

- **Statement:** Thiếu nhiều key: `{services}` liệt kê mỗi dịch vụ một lần, cách nhau dấu phẩy, thứ tự cố định Remove background, Cutout.pro, ImagenHub, Gen AI Effect, OpenAI, Flux, Gemini
- **Object / feature:** artwork/MỚI: run-image-effects — Thuộc: nút Run effects của Photo layer trong artwork editor (điều kiện hiển thị, một lượt chạy, kết quả, undo, lỗi, timeout, giới hạn, quyền, kiểm API key trước khi chạy); Không thuộc: cấu hình danh sách effect (layer-config-image), popover biến (run-effects-fill-in-variables), effect chạy trên storefront (sdk)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff; portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (giangnth), 2026-10-14
- **Locator:** Jira TIB-5470 comment giangnth 2026-10-14 dòng Q9 (CCR cũ: CBS-029 CLAIM-16)
- **Trích nguyên văn:**
  ```
  - **Q9:** Services are separated by commas, each listed once, always in this order: Remove background, Cutout.pro, ImagenHub, Gen AI Effect, OpenAI, Flux, Gemini. Example: "Missing API key for **Cutout.pro, OpenAI**. Enter your API key in Extra services."
  ```
