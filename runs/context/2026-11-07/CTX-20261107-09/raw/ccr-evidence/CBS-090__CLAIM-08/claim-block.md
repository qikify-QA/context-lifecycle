# CBS-090 CLAIM-08

Nguồn: Proposal CBS-090 (get_proposal 2026-11-07), khối A.

- **Statement:** Đóng layer editor / chọn layer khác / rời và mở lại artwork khi đang chạy: mở lại layer thấy progress bar, nút vẫn khoá tới khi xong; layer khác không bị ảnh hưởng. Reload trang khi đang chạy: bar mất, layer không bị thay, ảnh đã xử lý vẫn vào library khi xong. Layer chỉ được thay nếu đúng artwork đó đang mở lúc lượt chạy kết thúc; mở lại sau không áp kết quả
- **Object / feature:** artwork/MỚI: run-image-effects — Thuộc: nút Run effects của Photo layer trong artwork editor (điều kiện hiển thị, một lượt chạy, kết quả, undo, lỗi, timeout, giới hạn, quyền, kiểm API key trước khi chạy); Không thuộc: cấu hình danh sách effect (layer-config-image), popover biến (run-effects-fill-in-variables), effect chạy trên storefront (sdk)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff; portal · api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (giangnth), 2026-10-14
- **Locator:** Jira TIB-5470 comment giangnth 2026-10-14 dòng Q11; phần đóng/reload theo dev doc 2026-10-08 cùng tác giả. Không có kết quả chạy có ngày (TC-14, 15, 16 chỉ có status passed trên Testlane, không tính) (CCR cũ: CBS-029 CLAIM-09)
- **Trích nguyên văn:**
  ```
  - The layer is replaced only if the same artwork is open in the editor at the moment the run finishes. Reopening the artwork later does not apply the result; the result is only in the library.
  Ngữ cảnh — dev doc 2026-10-08 (cùng tác giả):
  - Closing the layer editor, selecting another layer, or reopening the artwork does not lose the run: reopening that layer shows the bar again and keeps the button locked until the run ends. Other layers are not affected.
  Reload the page during a run → the progress bar is gone and the layer is not replaced; the processed image still appears in the image library when the run ends.
  ```
