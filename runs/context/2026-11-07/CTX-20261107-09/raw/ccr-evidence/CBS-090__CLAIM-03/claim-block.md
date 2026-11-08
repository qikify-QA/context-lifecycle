# CBS-090 CLAIM-03

Nguồn: Proposal CBS-090 (get_proposal 2026-11-07), khối A.

- **Statement:** Một lượt chạy dùng ảnh gốc full-resolution hiện tại của layer (không phải preview, không phải bản HD), áp mọi effect tuần tự theo thứ tự danh sách; trong lúc chạy nút disabled và có progress bar % (ước lượng, dừng ở 95% tới khi xong) giữa header và effect đầu tiên; all or nothing
- **Object / feature:** artwork/MỚI: run-image-effects — Thuộc: nút Run effects của Photo layer trong artwork editor (điều kiện hiển thị, một lượt chạy, kết quả, undo, lỗi, timeout, giới hạn, quyền, kiểm API key trước khi chạy); Không thuộc: cấu hình danh sách effect (layer-config-image), popover biến (run-effects-fill-in-variables), effect chạy trên storefront (sdk)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff; portal · api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `dev_doc`
- **Người xác nhận, ngày nguồn:** Dev (giangnth), 2026-10-08
- **Locator:** "Change & test cases" v1 (tự sinh từ branch diff), Jira TIB-5470 comment giangnth, mục Run effects button. Bổ trợ TC-06, TC-11 PASS 2026-10-15; TC-84 PASS 2026-10-28. Con số 95% là giá trị lúc ship do dev nêu. _flows/layers-image-photo.md dòng 109 đang nói ngược (xem notes) (CCR cũ: CBS-029 CLAIM-04)
- **Trích nguyên văn:**
  ```
  - A run applies every effect in the list, in order, to the layer's **original full-resolution image** (not the preview, and not the HD render).
  - While it runs, a progress bar with a percentage is shown under the heading (an estimate; it stops at 95% until the run ends) and the button is disabled.
  ...
  - All or nothing: if any effect fails (provider error, invalid API key), the image is kept and an error toast "Could not run effects" shows the provider's message for 10 seconds.
  ```
