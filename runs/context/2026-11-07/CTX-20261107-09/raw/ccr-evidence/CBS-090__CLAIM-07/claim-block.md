# CBS-090 CLAIM-07

Nguồn: Proposal CBS-090 (get_proposal 2026-11-07), khối A.

- **Statement:** Mỗi lượt chạy lấy ảnh hiện tại của layer tại thời điểm chạy (chạy lại = chạy lên ảnh đã xử lý; muốn chạy từ ảnh trước thì Undo trước); đổi/thêm/xoá/sắp xếp effect không tự cập nhật ảnh
- **Object / feature:** artwork/MỚI: run-image-effects — Thuộc: nút Run effects của Photo layer trong artwork editor (điều kiện hiển thị, một lượt chạy, kết quả, undo, lỗi, timeout, giới hạn, quyền, kiểm API key trước khi chạy); Không thuộc: cấu hình danh sách effect (layer-config-image), popover biến (run-effects-fill-in-variables), effect chạy trên storefront (sdk)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff; portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `spec_doc`
- **Người xác nhận, ngày nguồn:** PO (huyen.chu), 2026-09-22
- **Locator:** description TIB-5470, mục Re-running effects và Effect configuration changes; 2026-09-22 là ngày tạo description, Jira không có ngày riêng từng mục, hai mục đã có khi QA fetch 2026-10-14. Bổ trợ TC-13 PASS 2026-10-15 (CCR cũ: CBS-029 CLAIM-08)
- **Trích nguyên văn:**
  ```
  ###### Re-running effects
  
  - Every run uses the layer's current image **at the time of execution** as its input.
  - To run the effects again from the previous image, merchants must **Undo** the previous run first.
  
  ###### Effect configuration changes
  
  Changing, adding, removing, or reordering effects does not update the current image automatically. The image may remain out of sync until **Run effects** is run again.
  ```
