# CBS-090 CLAIM-10

Nguồn: Proposal CBS-090 (get_proposal 2026-11-07), khối A.

- **Statement:** Một effect bất kỳ lỗi (lỗi provider, key sai) → giữ ảnh, toast lỗi "Could not run effects" kèm message của provider trong 10 giây; layer bị xoá hoặc không còn trong template hiện tại lúc lượt chạy xong → warning "The layer is no longer in the current template, so its image was not replaced."
- **Object / feature:** artwork/MỚI: run-image-effects — Thuộc: nút Run effects của Photo layer trong artwork editor (điều kiện hiển thị, một lượt chạy, kết quả, undo, lỗi, timeout, giới hạn, quyền, kiểm API key trước khi chạy); Không thuộc: cấu hình danh sách effect (layer-config-image), popover biến (run-effects-fill-in-variables), effect chạy trên storefront (sdk)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff; portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `dev_doc`
- **Người xác nhận, ngày nguồn:** Dev (giangnth), 2026-10-08
- **Locator:** "Change & test cases" v1 (tự sinh từ branch diff), Jira TIB-5470 comment giangnth, mục Run effects button. Bổ trợ TC-20 PASS 2026-10-21 cho warning layer mất; TC-17, 18 chỉ có status passed trên Testlane (CCR cũ: CBS-029 CLAIM-11)
- **Trích nguyên văn:**
  ```
  - All or nothing: if any effect fails (provider error, invalid API key), the image is kept and an error toast "Could not run effects" shows the provider's message for 10 seconds.
  ...
  - If the layer was deleted, or is no longer in the current template, when the run finishes: warning "The layer is no longer in the current template, so its image was not replaced."
  ```
