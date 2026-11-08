# CBS-090 CLAIM-04

Nguồn: Proposal CBS-090 (get_proposal 2026-11-07), khối A.

- **Statement:** Chạy thành công: layer hiện ảnh đã xử lý, việc thay ảnh là một bước undo, kết quả lưu thành ảnh mới trong image library, ảnh trước đó trong library giữ nguyên
- **Object / feature:** artwork/MỚI: run-image-effects — Thuộc: nút Run effects của Photo layer trong artwork editor (điều kiện hiển thị, một lượt chạy, kết quả, undo, lỗi, timeout, giới hạn, quyền, kiểm API key trước khi chạy); Không thuộc: cấu hình danh sách effect (layer-config-image), popover biến (run-effects-fill-in-variables), effect chạy trên storefront (sdk) (liên quan: image-library)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff; portal · api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `dev_doc`
- **Người xác nhận, ngày nguồn:** Dev (giangnth), 2026-10-08
- **Locator:** "Change & test cases" v1 (tự sinh từ branch diff), Jira TIB-5470 comment giangnth, mục Run effects button › On success. Bổ trợ TC-07 PASS 2026-10-15; TC-64 PASS 2026-10-28 (CCR cũ: CBS-029 CLAIM-05)
- **Trích nguyên văn:**
  ```
  - On success:
    - The layer shows the processed image. The replacement is one undo step.
    - The result is saved as a **new image in the image library**; the previous image stays in the library unchanged.
  ```
