# CBS-090 CLAIM-12

Nguồn: Proposal CBS-090 (get_proposal 2026-11-07), khối A.

- **Statement:** Một store bắt đầu tối đa 5 lượt chạy/phút (owner + mọi staff dùng chung; 5 là default, đổi được trong server config); lượt thứ 6 → toast "Too many requests! – Please retry after N second(s)". Mỗi lượt tính vào giới hạn upload layer image (default 1000 ảnh/ngày/store); hết giới hạn → toast "Too many requests! – Reach the limit 1000 records in 1 day. Wait until {date time} to try again or contact support to increase."; cả hai trường hợp không chạy, ảnh giữ nguyên
- **Object / feature:** artwork/MỚI: run-image-effects — Thuộc: nút Run effects của Photo layer trong artwork editor (điều kiện hiển thị, một lượt chạy, kết quả, undo, lỗi, timeout, giới hạn, quyền, kiểm API key trước khi chạy); Không thuộc: cấu hình danh sách effect (layer-config-image), popover biến (run-effects-fill-in-variables), effect chạy trên storefront (sdk) (liên quan: image-library)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner + staff (dùng chung quota store); portal · api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (giangnth), 2026-10-14
- **Locator:** Jira TIB-5470 comment giangnth 2026-10-14 dòng Q10; số 5 lượt/phút từ dev doc 2026-10-08. Bổ trợ TC-21 PASS 2026-10-15, TC-23 PASS 2026-10-21. Toast 1000/ngày chưa ép được. Con số không phải hằng số sản phẩm (đổi được trong server config). Liên quan image-library KB-012 (quota theo ngày đang là suy đoán) và CHK-041, OQ-image-library-023; rate limit này khác sdk KB-051 (rate limit buyer) (CCR cũ: CBS-029 CLAIM-13)
- **Trích nguyên văn:**
  ```
  - **Q10:** A 6th run within a minute shows the error toast "Too many requests! – Please retry after N second(s)" (N = seconds left in that minute). When the upload limit is used up (default 1000 images per day per store), the toast is "Too many requests! – Reach the limit 1000 records in 1 day. Wait until {date time} to try again or contact support to increase." In both cases no run starts and the image is unchanged.
  Dev doc 2026-10-08:
  - A store can start at most **5 runs per minute**, shared by the owner and all staff. 5 is the default and can be changed in the server config. Each run also counts toward the layer image upload limit.
  ```
