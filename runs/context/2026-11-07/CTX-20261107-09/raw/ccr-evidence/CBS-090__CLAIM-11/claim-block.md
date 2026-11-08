# CBS-090 CLAIM-11

Nguồn: Proposal CBS-090 (get_proposal 2026-11-07), khối A.

- **Statement:** Double-click Run effects (kể cả nút Run effects trong popover biến) → chỉ một lượt chạy
- **Object / feature:** artwork/MỚI: run-image-effects — Thuộc: nút Run effects của Photo layer trong artwork editor (điều kiện hiển thị, một lượt chạy, kết quả, undo, lỗi, timeout, giới hạn, quyền, kiểm API key trước khi chạy); Không thuộc: cấu hình danh sách effect (layer-config-image), popover biến (run-effects-fill-in-variables), effect chạy trên storefront (sdk)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff; portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `dev_doc`
- **Người xác nhận, ngày nguồn:** Dev (giangnth), 2026-10-08
- **Locator:** "Change & test cases" v1 (tự sinh từ branch diff), Jira TIB-5470 comment giangnth, mục Possible test cases › Run in progress across navigation. Bổ trợ TC-79 PASS 2026-10-28 (click của người dùng; dispatchEvent tổng hợp sinh 2 POST, không phải đường người dùng) (CCR cũ: CBS-029 CLAIM-12)
- **Trích nguyên văn:**
  ```
  Double-click Run effects on a chain whose prompt uses an option layer variable → only one run starts.
  ```
