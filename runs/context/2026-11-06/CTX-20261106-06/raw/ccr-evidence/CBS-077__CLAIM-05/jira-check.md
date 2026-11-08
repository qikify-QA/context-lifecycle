Jira TIB-5500 comment #55437, tuanva (dev), tạo 2026-10-23 09:39 +07, không sửa. Đọc bằng listJiraIssueComments ngày 2026-11-06, chép nguyên văn các dòng liên quan (đã bỏ thẻ HTML):
- Thêm cột dpi (cho phép trống) vào bảng printareas. Print area đã có từ trước giữ trống và vẫn export 300 DPI như cũ.
- File design export (PNG/JPG/PDF và thumbnail) ghi resolution theo DPI của print area, trống thì dùng 300. Kích thước pixel của design không đổi, chỉ đổi DPI ghi trong file.
- Import product base từ provider và nút "Import from <provider>": mỗi print area được gán DPI. Provider không cho DPI thì mặc định 300.
- Printify và Picanova: print area lớn hơn 9000 px vốn đã tự giảm một nửa kích thước, nay DPI cũng được set 150 cho khớp.
- Product Base > Edit > bảng Printareas có thêm cột DPI (có tooltip). Print area cũ hiển thị "300" màu mờ.
- Print area đã có trước khi deploy để trống DPI và hiển thị 300 mặc định. Không tự đổi DPI cho print area đã import trước đó, seller phải tự sửa nếu cần.
- DPI chỉ đổi resolution ghi trong file export, không đổi kích thước pixel của print area. Muốn file đúng kích thước in thật thì width/height cũng phải khớp DPI đó.
- Provider chỉ cho width/height như Printbelle không có DPI trong API nên import vẫn mặc định 300, seller phải tự sửa theo file TIFF gốc.

Jira TIB-5500 comment #56108, tuanva (dev), tạo 2026-10-30 15:00 +07, không sửa. Mở đầu: "em đã sửa và deploy lại staging (portal commit 13bfedf33)". Chép nguyên văn các dòng liên quan (đã bỏ thẻ HTML):
- DPI ngoài 72–300 không báo lỗi: FE giờ chặn đúng khoảng 72–300 ở cả sửa inline lẫn form New printarea, message "DPI must be a whole number from 72 to 300", không gửi mutation. Nếu mutation lỗi vì lý do khác cũng hiện thông báo lỗi, không còn im lặng.
- Activity log "null": DPI trống giờ ghi là 300, ví dụ Changed dpi from "300" to "150"; xoá trống ghi "150" → "300".
- Khoảng 72–300: đúng chủ đích, BE validate và DB constraint cùng khoảng này.
- Provider trả DPI ngoài khoảng (vd 600): lúc lấy danh sách print area từ provider, BE tự đổi về 300 trước khi trả cho popup Import, nên import không lỗi và print area được DPI 300.
- Ngưỡng 9000 px (Printify, Picanova/merchOne): chỉ cần width hoặc height > 9000 (lớn hơn hẳn, không tính bằng 9000) thì cả hai cạnh giảm một nửa và DPI = 150. Kích thước gốc của 2 product chị hỏi thì em chưa tra được (cũng cần token provider).
- PDF 150 DPI to gấp đôi (336 pt → 672 pt): đúng hành vi mong muốn. Giữ nguyên số pixel mà hạ DPI một nửa thì khổ in thật gấp đôi (đã ghi ở Known limitations). Với Printify import thì pixel cũng giảm một nửa nên khổ in giữ nguyên.
- Activity log do browser ghi qua GraphQL: đây là cách portal đang ghi mọi activity của product từ trước (width/height, thêm/xoá print area), ticket này không đổi. Nếu cần chuyển sang server ghi thì nên tách ticket riêng.
