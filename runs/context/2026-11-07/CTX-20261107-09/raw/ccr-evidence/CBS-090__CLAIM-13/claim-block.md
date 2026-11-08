# CBS-090 CLAIM-13

Nguồn: Proposal CBS-090 (get_proposal 2026-11-07), khối A.

- **Statement:** Quyền cần để chạy là Manage Artwork (Artworks → Manage trong staff role); staff không có quyền thì không mở được artwork editor (không bao giờ thấy nút), server cũng từ chối lượt chạy
- **Object / feature:** artwork/MỚI: run-image-effects — Thuộc: nút Run effects của Photo layer trong artwork editor (điều kiện hiển thị, một lượt chạy, kết quả, undo, lỗi, timeout, giới hạn, quyền, kiểm API key trước khi chạy); Không thuộc: cấu hình danh sách effect (layer-config-image), popover biến (run-effects-fill-in-variables), effect chạy trên storefront (sdk)
- **Quan hệ với canon:** `ADD`
- **Scope:** staff (có / không có Manage Artwork); portal · api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (giangnth), 2026-10-14
- **Locator:** Jira TIB-5470 comment giangnth 2026-10-14 dòng Q4. Bổ trợ TC-22 PASS 2026-10-15 (CCR cũ: CBS-029 CLAIM-14)
- **Trích nguyên văn:**
  ```
  - **Q4:** Correction: there is no separate "create layer images" permission. The permission needed is **Manage Artwork** (Artworks → Manage in the staff role). Staff without it cannot open the artwork editor, so they never see the Run effects button (closest to A). The server also rejects a run from staff without this permission.
  ```
