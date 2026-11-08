# CBS-090 CLAIM-09

Nguồn: Proposal CBS-090 (get_proposal 2026-11-07), khối A.

- **Statement:** Chưa xong ~6 phút sau khi bắt đầu xử lý, hoặc chưa bắt đầu sau 5 phút vì hàng đợi bận → toast "Timed out waiting for the effects to finish." (thời gian chờ hàng đợi không tính vào 6 phút). Job không bị huỷ: timeout hàng đợi → vẫn chạy sau, thành công thì ảnh vào library nhưng layer không bị thay; timeout xử lý → server đã dừng, không có ảnh mới
- **Object / feature:** artwork/MỚI: run-image-effects — Thuộc: nút Run effects của Photo layer trong artwork editor (điều kiện hiển thị, một lượt chạy, kết quả, undo, lỗi, timeout, giới hạn, quyền, kiểm API key trước khi chạy); Không thuộc: cấu hình danh sách effect (layer-config-image), popover biến (run-effects-fill-in-variables), effect chạy trên storefront (sdk)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff; portal · api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (giangnth), 2026-10-14
- **Locator:** Jira TIB-5470 comment giangnth 2026-10-14 dòng Q11; chữ toast theo dev doc 2026-10-08. QA không tái hiện được timeout thật: chỉ mô phỏng queue timeout bằng cách giả response poll (TC-19 tạm dừng 2026-10-21, không phải verdict); processing timeout chưa thử. 6 phút và 5 phút là giá trị lúc ship do dev nêu (CCR cũ: CBS-029 CLAIM-10)
- **Trích nguyên văn:**
  ```
  - **Q11:** The run is not cancelled; the editor just stops waiting.
    - If it timed out while waiting in the queue (5 min), it still runs later. If it succeeds, the new image appears in the library, but the layer is not replaced.
    - If it timed out while processing (about 6 min), the server has already stopped it, so no new image is added.
  Chữ toast — dev doc 2026-10-08:
  - If the run has not finished about 6 minutes after it starts processing, or has not started within 5 minutes because the queue is busy, the toast says "Timed out waiting for the effects to finish." Time spent waiting in the queue does not count toward the 6 minutes.
  ```
