# Signup & Verification Journey

> Xem tổng quan vị trí của mục này trong toàn bộ dashboard ở [00-overview.md](00-overview.md).

## Bước 1 — Điền form đăng ký

Affiliate vào trang `/#/signup`, điền 1 form duy nhất (gộp cả thông tin cá nhân lẫn khảo sát), submit qua `POST /register`.

### Field bắt buộc

| Field | Ràng buộc | Ví dụ hợp lệ | Ví dụ KHÔNG hợp lệ |
|---|---|---|---|
| `name` | Bắt buộc | `Nguyen Van A` | (để trống) |
| `email` | Bắt buộc, unique | `a@example.com` | email đã tồn tại trong hệ thống |
| `password` | Bắt buộc, tối thiểu 6 ký tự | `abc123` | `abc12` (5 ký tự) |
| `ref` | Bắt buộc, **unique**, là slug link giới thiệu riêng của affiliate | `nguyen-shop-tips` | xem bảng bên dưới |

### Quy tắc riêng cho `ref` — dễ bị QA bỏ sót nhất

`ref` bị regex chặn nếu **chứa** bất kỳ từ nào trong danh sách `koin|free|discount|vip|premium|exclusive|upgrade`, hoặc **bắt đầu bằng** `app` — mục đích tránh affiliate tạo slug link gây hiểu nhầm là ưu đãi/chương trình chính thức của Koin (ví dụ `koin-vip-deal` trông giống link khuyến mãi chính hãng).

| `ref` đăng ký | Kết quả | Vì sao |
|---|---|---|
| `nguyen-shop-tips` | ✅ Chấp nhận | Không chứa từ khoá cấm |
| `koin-free-app` | ❌ Từ chối | Chứa cả `koin` và `free` |
| `my-vip-discount` | ❌ Từ chối | Chứa `vip` và `discount` |
| `appstore-guru` | ❌ Từ chối | Bắt đầu bằng `app` |
| `theappguru` | ✅ Chấp nhận | Chứa `app` nhưng KHÔNG bắt đầu bằng `app` (chỉ chặn tiền tố, không chặn substring ở giữa) |

**QA nên test cả 2 dạng regex riêng biệt** (contains vs. starts-with) vì đây là 2 rule khác cơ chế, dễ chỉ test 1 trong 2.

### Field tuỳ chọn

`company`, `companyWebsite`, `job` (radio: Merchant / Freelancer / Services Agency / App or Theme Provider), `country`.

### Khảo sát 4 câu — riêng cho brand Koin

Lưu dạng JSON vào `User.survey`, không bắt buộc để submit thành công (không có validate `required` trên các câu này):

1. **Mô tả kinh nghiệm với nền tảng Shopify** (free text) — *Business rationale: chưa xác nhận với PO, nhưng khả năng cao dùng để đội Partnership đánh giá chất lượng affiliate ứng tuyển (affiliate có kinh nghiệm Shopify thường giới thiệu đúng đối tượng khách hàng hơn).*
2. **Dự định phân phối link giới thiệu ở đâu** (multi-select: dự án dịch vụ trực tiếp, website/blog, email newsletter, kênh mạng xã hội, sự kiện, truyền miệng) — *Rationale: khả năng dùng để dự đoán kênh nào affiliate sẽ mang traffic về, phục vụ phân tích sau này. Chưa xác nhận chính thức.*
3. **Biết đến chương trình Koin Affiliate qua đâu** (multi-select: kênh Koin/gặp trực tiếp, email newsletter, khách hàng, bạn bè, khác) — *Rationale: đo hiệu quả kênh marketing tuyển affiliate của Koin. Chưa xác nhận chính thức.*
4. **Góp ý thêm** (free text, tuỳ chọn).

> Lịch sử: form này từng dùng chung cho nhiều brand (Qikify, Teeinblue) trước khi repo được tách riêng chỉ phục vụ Koin — code frontend vẫn còn lưu vết bộ câu hỏi cũ của các brand kia (không còn hiển thị), chỉ bộ câu hỏi Koin ở trên là đang hoạt động.

## Bước 2 — Nhận email xác thực

Ngay sau khi đăng ký thành công, hệ thống gửi email chứa link xác thực (link có chữ ký số, giới hạn gửi lại tối đa 6 lần/phút nếu affiliate bấm "Gửi lại email"). Tài khoản ở trạng thái `status = pending` cho tới khi xác thực.

## Bước 3 — Click link xác thực → TỰ ĐỘNG được duyệt

Đây là điểm dễ hiểu sai nhất trong luồng đăng ký: **click link xác thực email KHÔNG chỉ xác nhận email, mà còn tự động chuyển `status` sang `approved` ngay lập tức, trong cùng 1 request** — hiện tại **không có bước admin duyệt tay riêng biệt** nào chắn giữa "verify email" và "được phép hoạt động".

```
Đăng ký (status = pending)
        │
        ▼  click link xác thực (trong email)
email_verified_at = now()
status = approved            ← xảy ra cùng lúc, không phải 2 bước tách rời
        │
        ▼
Có thể đăng nhập thành công
```

*Business rationale: chưa xác nhận với PO tại sao chọn auto-approve thay vì có bước duyệt tay — có thể do muốn giảm ma sát cho affiliate mới (thời gian chờ), đánh đổi lấy việc admin phải chủ động **disapprove sau đó** nếu phát hiện affiliate không phù hợp, thay vì chặn trước.*

Admin panel vẫn giữ nút "Approve" thủ công (dùng cho trường hợp cần approve lại sau khi đã disapprove, xem Bước 5) và nút "Disapprove" (kèm lý do).

## Bước 4 — Đăng nhập (`POST /login`, JWT)

Điều kiện đăng nhập thành công: đúng email/password **VÀ** `email_verified_at` đã có giá trị **VÀ** `status = approved`.

### Kịch bản 1 — Đăng nhập khi chưa xác thực email

| Input | Kết quả |
|---|---|
| Email/password đúng, chưa click link xác thực | `403 Forbidden`, thông báo "Your email address is not verified." |

### Kịch bản 2 — Đăng nhập khi tài khoản bị disapprove (sau khi đã từng approved)

| Tình huống | Kết quả |
|---|---|
| Affiliate đã verify email (→ tự động approved), sau đó admin vào tay đổi `status = disapproved` kèm lý do | Lần đăng nhập tiếp theo: `403 Forbidden`, thông báo "Your account has not approved." — dù email/password đúng và đã từng đăng nhập được trước đó |

Affiliate nhận email thông báo bị từ chối kèm `disapproved_reason` ngay khi admin thao tác — không cần đợi tới lúc họ thử đăng nhập lại mới biết.

### Kịch bản 3 — Admin approve lại sau khi disapprove

Admin bấm lại nút "Approve" trên tài khoản đã `disapproved` → `status = approved` → affiliate đăng nhập lại được bình thường (không cần verify email lại vì `email_verified_at` không bị xoá khi disapprove).

## Bước 5 — Thưởng "premium offer" cho affiliate mới (nếu có cấu hình)

Sau khi được approved, nếu affiliate đạt đủ điều kiện trong khoảng thời gian quy định (cấu hình theo `config('admin.affiliate_reward.koin')`, gồm `time` = số ngày kể từ lúc approved, `paid_user` = số shop trả phí tối thiểu, `bonus` = số tiền thưởng), họ được cộng thêm 1 khoản bonus vào `balance` và nhận email thông báo. Đây là logic riêng biệt với việc tính hoa hồng theo từng Conversion — xem `User.hasPremiumOffer()` ở [../01-domain-entities.md](../01-domain-entities.md). Banner "thử thách nhận thưởng" trên trang Dashboard chính là lời nhắc cho điều kiện này.
