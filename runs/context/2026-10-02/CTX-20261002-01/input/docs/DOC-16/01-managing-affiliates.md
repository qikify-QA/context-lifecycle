# Managing Affiliates (màn hình User)

> Quản lý hồ sơ affiliate/partner. Đây là màn hình admin gặp nhiều nhất trong công việc hàng ngày — mọi affiliate mới đăng ký đều cần được xử lý ở đây trước khi họ hoạt động đầy đủ.

## Bảng field

| Field | Vị trí | Ý nghĩa |
|---|---|---|
| `status` | Danh sách (sửa nhanh được), Form | `Pending` / `Approved` / `Disapproved` — trên **danh sách**, cột này là 1 dropdown sửa trực tiếp (inline), không cần mở form |
| `email_verified_at` | Danh sách, Chi tiết | Mốc thời gian affiliate đã bấm link xác thực email — nếu trống, nút "Approve" sẽ từ chối |
| `disapproved_reason` | Chi tiết, Form | Lý do từ chối, hiển thị lại trong email gửi affiliate |
| `level` | Danh sách, Chi tiết, Form | Bậc hiện tại (số, mặc định `1` khi tạo form tay — nhưng bình thường được hệ thống tự tính, xem [../02-commission/00-overview.md](../02-commission/00-overview.md)) |
| `is_vip` | Danh sách (icon), Form (switch) | Ghim `level` thủ công, bỏ qua công thức tính theo số shop trả phí |
| `balance` | Danh sách, Chi tiết, Form (sửa tay được) | Số dư hoa hồng chưa rút — **sửa trực tiếp ở đây sẽ ảnh hưởng ngay tới số tiền affiliate có thể yêu cầu thanh toán**, nên chỉ sửa tay khi thật sự cần điều chỉnh (vd đối soát sai lệch) |
| `all_time_commission` | Chi tiết (chỉ tính, không sửa) | Tổng hoa hồng cả đời = `balance` + tổng các invoice đã `completed`/`pending`/`approved` |
| `payment_method_id`, `payment_info`, `payment_details` | Chi tiết, Form | Thông tin nhận thanh toán — xem [04-invoices-and-payment-methods.md](04-invoices-and-payment-methods.md) |
| `survey` | Chi tiết (đọc), Form (bảng sửa được, không thêm/xoá dòng) | Nội dung khảo sát 4 câu lúc đăng ký (xem [../04-affiliate-dashboard/00-overview.md](../04-affiliate-dashboard/00-overview.md)) |

## Journey 1 — Duyệt 1 affiliate mới đăng ký

**Bối cảnh**: một người vừa điền form đăng ký trên dashboard affiliate. Theo thiết kế hiện tại, **việc bấm link xác thực email đã tự động chuyển `status` sang `Approved`** (xem [../04-affiliate-dashboard/00-overview.md](../04-affiliate-dashboard/00-overview.md), mục "Xác thực email & duyệt tài khoản") — nghĩa là trong đa số trường hợp bình thường, admin **không cần làm gì thêm**, affiliate đã có thể đăng nhập ngay sau khi verify email.

Vậy nút "Approve" thủ công trên danh sách User dùng để làm gì? Các trường hợp thực tế nó phát huy tác dụng:

1. **Affiliate đã verify email nhưng bằng cách nào đó vẫn ở `status = Pending`** (ví dụ dữ liệu cũ import từ hệ thống trước, hoặc một luồng edge-case nào đó không đi qua `VerificationController`) — admin vào danh sách, lọc `status = Pending`, kiểm tra cột `email_verified_at` đã có giá trị chưa:
   - Nếu **có** giá trị → bấm "Approve" trên dòng đó → `status` chuyển `Approved` ngay, không cần mở form.
   - Nếu **chưa có** giá trị (`email_verified_at` trống) → bấm "Approve" sẽ bị chặn, hệ thống báo lỗi toast **"User has not verified email"** — admin không tự ý duyệt qua bước xác thực email được, kể cả khi có lý do chính đáng (vd affiliate báo không nhận được email). Trong tình huống này, hướng xử lý hợp lý là nhờ affiliate bấm "Resend verification email" ở dashboard, hoặc admin có thể set tay `email_verified_at` qua form Edit rồi mới Approve — **cách nào là quy trình chuẩn thì cần xác nhận lại với PO/Ops, code không quy định**.
2. **Re-approve sau khi đã Disapprove** (xem Journey 2 bên dưới) — đây có lẽ là use-case chính của nút Approve thủ công trong vận hành thực tế: 1 affiliate từng bị từ chối, sau đó admin xem lại và quyết định duyệt, dùng đúng nút này để đổi `status` từ `Disapproved` sang `Approved`.

> *Suy luận business rationale (chưa xác nhận với PO):* có khả năng bước duyệt thủ công tồn tại như một "van an toàn" bổ sung — hệ thống ban đầu có thể được thiết kế với ý định admin duyệt tay 100% affiliate mới (giống nhiều chương trình affiliate khác cần xét duyệt hồ sơ), nhưng sau đó thêm cơ chế tự-động-duyệt-khi-verify-email để giảm ma sát cho affiliate hợp lệ, mà không xoá hẳn nút duyệt tay — vẫn giữ lại để xử lý các trường hợp ngoại lệ/dữ liệu cũ như trên. Nên xác nhận lại với PO xem quy trình chuẩn hiện tại có còn cần bước duyệt tay cho affiliate mới hay không, hay chỉ dùng cho re-approve.

## Journey 2 — Từ chối (Disapprove) 1 affiliate

Không có nút "Disapprove" nhanh trên danh sách như "Approve" — phải vào **Edit** (mở form) của affiliate đó:

1. Mở form Edit → đổi `status` sang `Disapproved`.
2. Nhập `disapproved_reason` (textarea) — đây là lý do sẽ hiển thị **nguyên văn trong email** gửi cho affiliate.
3. Lưu.
4. Hệ thống tự động gửi email "Affiliate Membership Disapproved" cho affiliate, kèm lý do vừa nhập. Affiliate vẫn có thể đăng nhập vào dashboard (tài khoản không bị khoá cứng ở tầng auth), nhưng các chức năng phụ thuộc `hasApproved()` (ví dụ yêu cầu thanh toán) sẽ bị chặn cho tới khi được duyệt lại.

## Journey 3 — Điều chỉnh thông tin affiliate (edit tay)

Ví dụ thực tế: affiliate liên hệ Ops báo sai thông tin ngân hàng, hoặc cần Ops set `is_vip = true` cho 1 đối tác chiến lược (bỏ qua công thức tính bậc theo số shop).

1. Tìm affiliate qua ô tìm kiếm (theo tên/email/ref).
2. Mở Edit.
3. Sửa field cần thiết — ví dụ bật `is_vip`, chọn `level` mong muốn (khi `is_vip = true`, `level` này sẽ được dùng trực tiếp thay vì tính theo `min_paid_customers`, xem [../02-commission/00-overview.md](../02-commission/00-overview.md)).
4. Lưu — thay đổi có hiệu lực **ngay từ lần import CSV Payout tiếp theo** (không hồi tố các Conversion cũ đã tính rồi).

## Field `survey` — chỉ đọc/sửa, không tạo thêm câu hỏi

Bảng `survey` trong form Edit chỉ cho phép sửa nội dung câu trả lời đã có sẵn (ví dụ sửa lỗi chính tả affiliate tự nhập), **không thêm được dòng mới hay xoá dòng** — vì cấu trúc 4 câu hỏi cố định trong code frontend đăng ký ([../04-affiliate-dashboard/00-overview.md](../04-affiliate-dashboard/00-overview.md)), không phải dữ liệu động.
