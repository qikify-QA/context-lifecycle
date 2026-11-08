# CLAIM-05: block 5.1 nguyên văn của CCR

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** Jira TIB-5500; skill-rules-audit.md #73, #75, #76, #78, #79, #80, #81, #82, #83 (rule `printarea-dpi-export`)
- **Link:** https://ownego.atlassian.net/browse/TIB-5500?focusedCommentId=55437
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-23, 2026-10-30
- **Người viết / người xác nhận:** tuanva (dev)
- **Trích nguyên văn:**
  - Jira TIB-5500 comment #55437, tuanva (dev), 2026-10-23 (dòng #73):
    ```
    DPI chỉ đổi resolution ghi trong file export, không đổi kích thước pixel của print area. Muốn file đúng kích thước in thật thì width/height cũng phải khớp DPI đó.
    ```
  - Jira TIB-5500 comment #55437, tuanva (dev), 2026-10-23 (dòng #75):
    ```
    Printify và Picanova: print area lớn hơn 9000 px vốn đã tự giảm một nửa kích thước, nay DPI cũng được set 150 cho khớp.
    ```
  - Jira TIB-5500 comment #55437, tuanva (dev), 2026-10-23 (dòng #76):
    ```
    Provider chỉ cho width/height như Printbelle không có DPI trong API nên import vẫn mặc định 300, seller phải tự sửa theo file TIFF gốc.
    ```
  - Jira TIB-5500 comment #56108, tuanva (dev), 2026-10-30 (dòng #78):
    ```
    Provider trả DPI ngoài khoảng (vd 600): lúc lấy danh sách print area từ provider, BE tự đổi về 300 trước khi trả cho popup Import, nên import không lỗi và print area được DPI 300.
    ```
  - Jira TIB-5500 comment #56108, tuanva (dev), 2026-10-30 (dòng #79):
    ```
    Ngưỡng 9000 px (Printify, Picanova/merchOne): chỉ cần width hoặc height > 9000 (lớn hơn hẳn, không tính bằng 9000) thì cả hai cạnh giảm một nửa và DPI = 150.
    ```
  - Jira TIB-5500 comment #56108, tuanva (dev), 2026-10-30 (dòng #80):
    ```
    PDF 150 DPI to gấp đôi (336 pt → 672 pt): đúng hành vi mong muốn. Giữ nguyên số pixel mà hạ DPI một nửa thì khổ in thật gấp đôi (đã ghi ở Known limitations).
    ```
  - Jira TIB-5500 comment #56108, tuanva (dev), 2026-10-30 (dòng #81):
    ```
    Activity log "null": DPI trống giờ ghi là 300, ví dụ Changed dpi from "300" to "150"; xoá trống ghi "150" → "300".
    ```
  - Jira TIB-5500 comment #56108, tuanva (dev), 2026-10-30 (dòng #82):
    ```
    Activity log do browser ghi qua GraphQL: đây là cách portal đang ghi mọi activity của product từ trước (width/height, thêm/xoá print area), ticket này không đổi. Nếu cần chuyển sang server ghi thì nên tách ticket riêng.
    ```
  - Jira TIB-5500 comment #56108, tuanva (dev), 2026-10-30 (dòng #83):
    ```
    Bug 2 (Products detail không có print area): query của trang detail không lấy printareas từ năm 2022, nên bảng luôn trống kể cả trước ticket này. Đã thêm vào query, bảng hiện đủ dòng kèm cột DPI (trống thì hiện 300).
    ```
- **File đính kèm cho claim này:** không có

