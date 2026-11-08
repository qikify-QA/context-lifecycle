### CLAIM-14

- **Statement:** Sync chạy mỗi khi template đang chọn đổi, kể cả khi đổi Size hoặc option map sang template hay artwork khác, với cùng logic giữ hoặc reset.
- **Object / feature:** sdk/MỚI: template-switch-photo-sync — Thuộc: sync ảnh và position của photo layer có reposition khi template đang chọn đổi (giữ, reset, warning tỉ lệ, round-trip, Multiple Uploads, đổi Size/option); Không thuộc: setting bật sync (sdk/product-page-settings-config), sync giá trị text, photo layer dùng Global Option.
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer, storefront
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chinhdt), 2026-10-21
- **Locator:** Jira TIB-5566 comment 55235 mục Q6. Dev xác nhận bằng đọc code và yêu cầu test; TC-14, TC-15 chưa chạy, chưa có quan sát. (CCR cũ: CBS-026 CLAIM-14)
- **Trích nguyên văn:**
  ```
  Câu hỏi QA (comment 55234): "Does a Size / option change that maps to another template follow the same keep / reset logic as a direct template switch?"
  Q6: A — same sync path. The sync runs whenever the selected template changes, whether the buyer picks it directly or a Size/option change maps to another template or artwork. Confirmed by reading the code, please cover it in testing.
  ```
