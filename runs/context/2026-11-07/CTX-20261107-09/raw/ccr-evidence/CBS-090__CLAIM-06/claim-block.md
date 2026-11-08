# CBS-090 CLAIM-06

Nguồn: Proposal CBS-090 (get_proposal 2026-11-07), khối A.

- **Statement:** Undo một lượt chạy trả layer về đúng như trước: ảnh trước đó, và HD bật lại nếu trước đó đang bật; ảnh mà lượt chạy đã thêm vào library vẫn còn
- **Object / feature:** artwork/MỚI: run-image-effects — Thuộc: nút Run effects của Photo layer trong artwork editor (điều kiện hiển thị, một lượt chạy, kết quả, undo, lỗi, timeout, giới hạn, quyền, kiểm API key trước khi chạy); Không thuộc: cấu hình danh sách effect (layer-config-image), popover biến (run-effects-fill-in-variables), effect chạy trên storefront (sdk)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff; portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (giangnth), 2026-10-14
- **Locator:** Jira TIB-5470 comment giangnth 2026-10-14 dòng Q8. Bổ trợ TC-06 PASS 2026-10-15 (CCR cũ: CBS-029 CLAIM-07)
- **Trích nguyên văn:**
  ```
  - **Q8:** Undo restores the layer exactly as it was before the run: the previous image, and HD turned back on if it was on before. The image the run added to the library stays.
  ```
