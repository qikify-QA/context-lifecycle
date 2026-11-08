# CBS-090 CLAIM-14

Nguồn: Proposal CBS-090 (get_proposal 2026-11-07), khối A.

- **Statement:** Trước khi chạy, mọi dịch vụ bên thứ ba trong chuỗi effect phải có API key ở Extras → Extra services; thiếu → không chạy, warning "Missing API key for {services}. Enter your API key in Extra services.". Dịch vụ được kiểm: Remove background (chưa chọn remover, hoặc chọn remove.bg / removal.ai / cutout.pro mà không có key; remover Teeinblue không cần key), Cutout.pro, ImagenHub, OpenAI, Flux, Gemini, "Gen AI Effect" (Default settings mà chưa chọn default provider). Effect Teeinblue không cần key. Server kiểm lại lúc bắt đầu: key bị xoá giữa chừng → lượt chạy lỗi cùng message, ảnh giữ nguyên
- **Object / feature:** artwork/MỚI: run-image-effects — Thuộc: nút Run effects của Photo layer trong artwork editor (điều kiện hiển thị, một lượt chạy, kết quả, undo, lỗi, timeout, giới hạn, quyền, kiểm API key trước khi chạy); Không thuộc: cấu hình danh sách effect (layer-config-image), popover biến (run-effects-fill-in-variables), effect chạy trên storefront (sdk)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff; portal · api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `dev_doc`
- **Người xác nhận, ngày nguồn:** Dev (giangnth), 2026-10-08
- **Locator:** "Change & test cases" v1 (tự sinh từ branch diff), Jira TIB-5470 comment giangnth, mục Missing API key check before a run. Không có kết quả chạy có ngày (TC-25…30 chỉ có status passed trên Testlane). Face Cutout, Photo Enhancer có cần key không: chưa ai trả lời (PENDING-12), không đề xuất (CCR cũ: CBS-029 CLAIM-15)
- **Trích nguyên văn:**
  ```
  - If a service has no API key in Extras → Extra services, the run does not start and a warning toast says "Missing API key for **{services}**. Enter your API key in Extra services."
  - Services checked: Remove background (when no remover is chosen, or remove.bg / removal.ai / cutout.pro is chosen without its key; the Teeinblue removers need no key), Cutout.pro, ImagenHub, OpenAI, Flux, Gemini, and "Gen AI Effect" when a Gen AI effect uses Default settings and no default provider is chosen. Teeinblue effects need no key.
  - The server checks again when the run starts. If a key was removed meanwhile (e.g. in another tab), the run fails with "Missing API key for {service}. Enter your API key in Extra services." and the image is kept.
  ```
