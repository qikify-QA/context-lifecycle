Jira TIB-5500 comment #56108, tuanva (dev), tạo 2026-10-30 15:00 +07, không sửa. Mở đầu: "em đã sửa và deploy lại staging (portal commit 13bfedf33)". Chép nguyên văn các dòng liên quan (đã bỏ thẻ HTML):
- DPI ngoài 72–300 không báo lỗi: FE giờ chặn đúng khoảng 72–300 ở cả sửa inline lẫn form New printarea, message "DPI must be a whole number from 72 to 300", không gửi mutation. Nếu mutation lỗi vì lý do khác cũng hiện thông báo lỗi, không còn im lặng.
- Activity log "null": DPI trống giờ ghi là 300, ví dụ Changed dpi from "300" to "150"; xoá trống ghi "150" → "300".
- Khoảng 72–300: đúng chủ đích, BE validate và DB constraint cùng khoảng này.
- Provider trả DPI ngoài khoảng (vd 600): lúc lấy danh sách print area từ provider, BE tự đổi về 300 trước khi trả cho popup Import, nên import không lỗi và print area được DPI 300.
- Ngưỡng 9000 px (Printify, Picanova/merchOne): chỉ cần width hoặc height > 9000 (lớn hơn hẳn, không tính bằng 9000) thì cả hai cạnh giảm một nửa và DPI = 150. Kích thước gốc của 2 product chị hỏi thì em chưa tra được (cũng cần token provider).
- PDF 150 DPI to gấp đôi (336 pt → 672 pt): đúng hành vi mong muốn. Giữ nguyên số pixel mà hạ DPI một nửa thì khổ in thật gấp đôi (đã ghi ở Known limitations). Với Printify import thì pixel cũng giảm một nửa nên khổ in giữ nguyên.
- Activity log do browser ghi qua GraphQL: đây là cách portal đang ghi mọi activity của product từ trước (width/height, thêm/xoá print area), ticket này không đổi. Nếu cần chuyển sang server ghi thì nên tách ticket riêng.

Jira TIB-5500 comment #56080, linhpt (QA), tạo 2026-10-30 11:39 +07, sửa 12:07. Chép nguyên văn các dòng liên quan:
- DB chặn bằng constraint printareas_dpi_check (72–300), nhưng UI không báo lỗi gì, popup cứ mở.
- QA chưa có kích thước gốc từ provider (không có token Printify, API merchOne trả 403).
