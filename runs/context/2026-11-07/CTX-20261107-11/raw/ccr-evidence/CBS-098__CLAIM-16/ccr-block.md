### CLAIM-16

- **Statement:** Position đã giữ được lưu trong customization data gửi lúc Add to cart, nên cart preview, Edit design từ cart và order design dùng đúng position đó.
- **Object / feature:** sdk/MỚI: template-switch-photo-sync — Thuộc: sync ảnh và position của photo layer có reposition khi template đang chọn đổi (giữ, reset, warning tỉ lệ, round-trip, Multiple Uploads, đổi Size/option); Không thuộc: setting bật sync (sdk/product-page-settings-config), sync giá trị text, photo layer dùng Global Option. (liên quan: order)
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer đặt đơn, store owner xem order design; storefront, api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chinhdt) đồng ý đề xuất do QA phuongbb viết, 2026-10-21
- **Locator:** Jira TIB-5566 comment 55235 ("ok Q5" là đồng ý đề xuất của QA trong comment 55234). Bổ trợ: thumbnail cart baseline ở TC-30 lượt 2026-10-21. Edit design từ cart và order design mới chưa kiểm (TC-16 phần Edit, TC-17 chưa chạy). Liên quan: sdk KB-022, order KB-369. (CCR cũ: CBS-026 CLAIM-16)
- **Trích nguyên văn:**
  ```
  ok Q5
  Câu hỏi + đề xuất được đồng ý (phuongbb, comment 55234, 2026-10-21):
  **Q5.** Do the cart preview, 'Edit design' from the cart and the order design / final print file use the kept position? — chọn: A) Yes · B) No — QA đề xuất: Yes - the kept position is saved in the customization data sent with Add to cart
  ```
