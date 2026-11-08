Tách từ CLAIM-04 (positional). Block gốc:

### CLAIM-04

- **Statement:** Hai layer được coi là cùng tỉ lệ khi abs(sourceRatio − destRatio) / destRatio ≤ 0.05, layer đích là base, đúng 5% tính là cùng tỉ lệ, dùng chung hàm với warning tỉ lệ.
- **Object / feature:** sdk/MỚI: template-switch-photo-sync — Thuộc: sync ảnh và position của photo layer có reposition khi template đang chọn đổi (giữ, reset, warning tỉ lệ, round-trip, Multiple Uploads, đổi Size/option); Không thuộc: setting bật sync (sdk/product-page-settings-config), sync giá trị text, photo layer dùng Global Option.
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer, storefront
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chinhdt), 2026-10-21
- **Locator:** Jira TIB-5566 comment 55235 mục Q1. Bổ trợ: TC-05 ✅, TC-08 ✅ 2026-10-21. QA chạy staging 2026-10-21 thấy ngược lại ở đúng 5% (TC-06 ❌, xem CLAIM-05), chưa có dev/PO phản hồi; giữ cả hai phía. (CCR cũ: CBS-026 CLAIM-04)
- **Trích nguyên văn:**
  ```
  Câu hỏi QA (comment 55234): "How is the 5% computed: abs(ratioA - ratioB) / ratioB <= 0.05 (destination layer as base) or source as base? Is a difference of exactly 5% treated as the same ratio (keep, no warning)?"
  Q1: ok — abs(sourceRatio - destRatio) / destRatio <= 0.05, destination layer as base, same function as the ratio warning; exactly 5% counts as the same ratio (keep, no warning).
  ```
