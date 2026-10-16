# Đăng nhập Slack, role và quyền

> File này trả lời: nhân viên vào admin panel bằng cách nào, cấp quyền cho người mới ra sao, và mỗi quyền cho phép làm gì. Nằm trong nhóm [admin panel](00-overview.md); các màn hình cụ thể ở các file 02–06.

## Đăng nhập: chỉ có Slack, không có mật khẩu

**Bước 1 — Mở panel.** Nhân viên vào `https://<admin host>/admin`. Host sai thì thấy "404". Chưa đăng nhập thì được chuyển tới trang login chỉ có một nút **"Sign in with Slack"**.

**Bước 2 — Đồng ý trên Slack.** Slack hiện màn đồng ý. Sau đó Mysbox tìm một **admin user** có email trùng email Slack (hoặc đã gắn sẵn với tài khoản Slack này).

```
Tìm thấy admin user ──► đăng nhập, vào /admin
   (lần đầu: gắn Slack id, chép @username, tên, avatar; tên được làm mới mỗi lần)
Không thấy ──► quay lại trang login: "Your Slack account is not authorized."
Lỗi khác ──► "Unable to sign in with Slack. Please try again."
```

Các luật cần nhớ:

| Luật | Hệ quả |
|---|---|
| Đăng nhập **không bao giờ tạo** admin user | Người mới không tự đăng ký được; phải có dòng sẵn |
| Email của dòng phải trùng email Slack | Lệch email = "not authorized" |
| Tài khoản Slack đã gắn với một dòng thì luôn thắng so với khớp email | Không thể chiếm dòng của người khác bằng cách đổi email Slack |
| Giới hạn 20 lần thử/phút | Hiếm khi chạm |
| Cột mật khẩu có nhưng ngẫu nhiên, không dùng | Đừng bảo ai "reset password" |

*chưa xác nhận: môi trường nào bật giới hạn theo Slack workspace (nếu bật, người ngoài workspace không vào được).*

## Cấp quyền cho người mới

**Bước 1.** Vào **Admin Users → Create**. Điền email = email Slack của họ (tên có thể bỏ trống, sẽ lấy từ Slack).
**Bước 2.** Gán một hoặc nhiều **role** (và quyền lẻ nếu cần) ngay trong form.
**Bước 3.** Báo họ đăng nhập bằng Slack. Nếu menu trống, role chưa có quyền nào.
**Bước 4 (khi có màn hình mới sau release).** Quyền cho màn mới **không tự sinh**: engineer phải chạy bước "generate permissions", rồi admin mới tick quyền đó cho role ở màn **Roles**.

Xóa dòng admin user = thu hồi quyền vào panel của người đó (có cả bulk delete).

## Role hoạt động thế nào

- Role = một gói quyền có tên; một người có thể giữ nhiều role cộng quyền lẻ.
- **Nút, cột, section, màn hình** đều chỉ hiện khi có quyền. Support "không thấy nút Retry" gần như luôn là thiếu một quyền.
- Role tên `super_admin` **không tự có quyền gì**; vẫn phải tick đủ quyền như role khác. Đặc quyền duy nhất: mở **Horizon** (xem [07](07-scheduled-jobs-and-ops.md)).
- Danh sách role thật và quyền của từng role nằm **trong database production, không nằm trong code** — xem màn **Roles** để biết hiện trạng. *chưa xác nhận: cấu hình role trên production.*

## Danh mục quyền theo màn hình

| Màn hình | Quyền cho phép | Nhạy cảm? |
|---|---|---|
| **Shops** | xem danh sách/chi tiết, sửa; xem/sửa từng nhóm thông tin (ids, customizations, domain, email, plan Shopify, địa chỉ, i18n, capacity, security, token...) | Sửa capacity/security/plan/customizations đổi hành vi thật của merchant |
| Shops — đặc biệt | `export`, `advanced_filter` (mọi filter), `use_paginated_has_overview` (phân trang đầy đủ; thiếu thì chỉ thấy 10 shop), xem charges, tạo payment link, refresh access token, retry handle order, xem token, cập nhật capacity | Token là bí mật; link thanh toán và refresh token tác động lên Shopify |
| **Boxes** | xem danh sách/chi tiết, versions, recent pulls, publish/unpublish, resync recent pulls, hide recent pull, sửa, xóa | Xóa/sửa phá hủy |
| **Orders** | xem danh sách/chi tiết, tab Boxes, retry sync, retry physical post-processing | Retry ghi vào đơn Shopify của merchant |
| **Plans** | xem/tạo/sửa | Đổi cái merchant có thể mua |
| **Charges** | chỉ xem (không ai tạo/sửa được) | |
| **Discounts**, **Promote codes** | xem/tạo/sửa/xóa | Đổi giá / tặng capacity |
| **Notifications** `[chỉ có trên staging]` | xem/tạo/sửa/xóa banner | Hiện cho mọi merchant trong nhóm đích |
| **Admin Users**, **Roles** | CRUD | Quyết định ai vào được |
| **Activity** | xem audit log | |
| Trang/widget | Analytic, Upload Image, Embedded Version, Customer Portal Resource, 2 widget tổng quan | Embedded Version / Customer Portal Resource ảnh hưởng mọi merchant |
| **Horizon** | chỉ `super_admin` | Có thể retry/xóa job |

Gợi ý gom role (chỉ để đối chiếu với màn Roles thật, không đọc từ production): Support agent (xem Shops/Orders/Boxes), Support lead (+ các Retry, sync capacity, publish), Billing (Plans, Discounts, Promote codes, payment link), Marketing (Notifications, Upload Image), Engineer (tất cả + token + Horizon).

## Ví dụ: Chi thêm đồng nghiệp

Admin **Chi** có quyền Admin Users. Bạn mới **Dũng** (support agent) có email Slack `dung@mysbox.example`. Chi tạo dòng admin user cùng email đó, gán role "Support agent". Dũng đăng nhập Slack, vào được panel nhưng **không thấy nút "Retry Handle Order"** vì role chưa có quyền đó. Chi vào **Roles**, tick quyền retry, Dũng tải lại trang và nút xuất hiện. Một tuần sau Mysbox ra màn Notifications mới; Chi không thấy nó trong menu cho tới khi engineer generate permissions và Chi tick cho role Marketing.

## Câu hỏi thường gặp

- **"Your Slack account is not authorized"?** Chưa có dòng admin user, email lệch, hoặc dòng đã gắn Slack khác.
- **Đăng nhập được nhưng menu trống?** Role chưa có quyền; vào Roles.
- **Danh sách Shops chỉ có 10 dòng, không phân trang?** Thiếu quyền `use_paginated_has_overview`.
- **Ai xem được hàng đợi job?** Chỉ role `super_admin`.
