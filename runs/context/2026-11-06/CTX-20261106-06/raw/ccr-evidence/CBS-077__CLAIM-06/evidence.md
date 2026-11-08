# CLAIM-06: block 5.1 nguyên văn của CCR

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** Jira TIB-5500; skill-rules-audit.md #72, #74, #77 (rule `printarea-dpi-export`)
- **Link:** https://ownego.atlassian.net/browse/TIB-5500
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-23, 2026-10-30
- **Người viết / người xác nhận:** QA
- **Trích nguyên văn:**
  - skill-rules-audit.md #72, rule `printarea-dpi-export`, nguồn ghi: dev summary 2026-10-23, TIB-5500:
    ```
    Provider gọi là DPI, pipeline render gọi là PPI, cùng một thứ.
    ```
  - skill-rules-audit.md #74, rule `printarea-dpi-export`, nguồn ghi: dev summary 2026-10-23, TIB-5500:
    ```
    Print area cũ: `dpi` = null, hiển thị "300" mờ, export 300. Không migrate.
    ```
  - Jira TIB-5500 comment #55437, tuanva, 2026-10-23, khớp một phần:
    ```
    Thêm cột dpi (cho phép trống) vào bảng printareas. Print area đã có từ trước giữ trống và vẫn export 300 DPI như cũ.
    ```
  - skill-rules-audit.md #77, rule `printarea-dpi-export`, nguồn ghi: dev tuanva, TIB-5500 comment 2026-10-30:
    ```
    DPI hợp lệ **72–300** (FE + BE + DB constraint `printareas_dpi_check`). Message FE: "DPI must be a whole number from 72 to 300".
    ```
  - Jira TIB-5500 comment #56108, tuanva, 2026-10-30, khớp một phần:
    ```
    DPI ngoài 72–300 không báo lỗi: FE giờ chặn đúng khoảng 72–300 ở cả sửa inline lẫn form New printarea, message "DPI must be a whole number from 72 to 300", không gửi mutation.
    ```
- **File đính kèm cho claim này:** không có

