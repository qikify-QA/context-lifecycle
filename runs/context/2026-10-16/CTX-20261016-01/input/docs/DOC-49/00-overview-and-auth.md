# Tích hợp: tổng quan và cách xác thực request

> Mysbox là một backend duy nhất phục vụ nhiều "khách hàng" rất khác nhau: trang admin nhúng trong Shopify, trang đơn hàng của khách, các block ở checkout, Shopify Flow, và chính Shopify (webhook). Mỗi loại chứng minh "tôi là ai" theo một cách riêng. File này giải thích bằng lời, không cần biết code. Tiếp theo: [01-webhooks.md](01-webhooks.md), [02-storefront-data-flow.md](02-storefront-data-flow.md).

## Bức tranh chung

```
 Merchant (admin Shopify) ──► portal nhúng ───────┐
 Khách (storefront) ──► trang /apps/mysbox ───────┤
 Block checkout / tài khoản khách / admin ────────┤──► Mysbox API
 Shopify Flow ────────────────────────────────────┤
 Shopify (webhook), AWS EventBridge ──────────────┘
 Nhân viên Ownego ──► admin panel (/admin, đăng nhập Slack)
```

## 5 cách một request được xác thực

### 1. Admin nhúng của merchant (embedded admin)

Merchant mở app trong Shopify admin. Trình duyệt của họ nhận từ Shopify một "thẻ phiên" ngắn hạn (session token, ký bằng bí mật của app). Mỗi lần portal gọi API, nó kèm thẻ này; Mysbox kiểm chữ ký, xem thẻ thuộc shop nào, và chỉ cho đi tiếp nếu shop đó đã cài app và đang có quyền truy cập hợp lệ. Nếu thẻ hết hạn, trang tự quay về Shopify để lấy thẻ mới.

Lần cài đầu: Shopify gửi merchant qua màn hình cấp quyền (OAuth). Mysbox đổi mã lấy **offline token** (chìa khoá để app thay mặt shop gọi Shopify khi merchant không online). Token này có hạn và có refresh token; app tự làm mới trước khi hết hạn (job hằng ngày quét token sắp hết). Nếu không làm mới được, shop bị đánh cờ "cần cấp quyền lại" và merchant nhận email, xem [../07-automation-growth/04-banners-and-emails.md](../07-automation-growth/04-banners-and-emails.md). Đổi danh sách quyền (scope) của app sẽ buộc **mọi** shop đi lại màn hình cấp quyền.

Gỡ app: phiên bị xoá, token bị xoá, gói về Free (gói trả phí vẫn còn hạn đến hết kỳ đã trả), bản ghi shop được đánh dấu xoá nhưng dữ liệu giữ lại. Xem [../06-merchant-app/04-shop-status-and-lifecycle.md](../06-merchant-app/04-shop-status-and-lifecycle.md).

### 2. Trang của khách qua app proxy (customer portal)

Khách mở `https://{shop}/apps/mysbox/...`. Shopify nhận request, **tự ký** nó bằng bí mật của app rồi chuyển cho Mysbox (đây là "app proxy"). Mysbox kiểm chữ ký của Shopify: chữ ký sai thì từ chối. Sau đó nhận ra khách theo một trong hai cách:

```
Khách ĐANG đăng nhập tài khoản shop
   → Shopify tự đính kèm mã khách trong phần được ký → tin được.
Khách KHÁCH (guest) mở bằng link
   → dùng "magic link" (mục 3).
Không khách nào → chuyển về trang /account của shop.
```

Ghi chú: chữ ký không kiểm tra thời điểm gửi (không có kiểm tra "request này còn mới không").

### 3. Magic link của khách guest

Là link chứa mã khách và một mã bí mật (token), mã hoá trong tham số `?parameters=...`. Token sống **1 năm**. Trang web lấy hai giá trị này gắn vào mọi lần gọi API. Mysbox khớp mã khách + token với cơ sở dữ liệu và kiểm hạn. Token sai: hiện "magic link is not correct"; hết hạn: trang "authentication token expired" (khách đã đăng nhập thì được bỏ qua kiểm hạn). Link copy mất phần `?parameters=` thì guest bị đưa về `/account`. Block ở trang cảm ơn lấy token qua một lời gọi "đưa tôi mã khách của đơn này" rồi mở trang reveal bằng link đó.

### 4. Shopify Flow

Flow gọi action của Mysbox bằng một request có "con dấu" HMAC: Flow tính dấu từ nội dung gửi + bí mật chung của app; Mysbox tính lại, khớp thì nhận, không thì trả lỗi 400. Tối đa 60 lần/phút/shop. Chi tiết: [../07-automation-growth/01-shopify-flow.md](../07-automation-growth/01-shopify-flow.md).

### 5. Webhook của Shopify và EventBridge

- **Webhook HTTP**: Shopify gửi kèm con dấu HMAC trên nội dung; Mysbox kiểm bằng bí mật app, sai thì từ chối 401 (Shopify sẽ thử lại).
- **EventBridge (AWS)**: theo cấu hình app trên nhánh master của SDK, production (khác staging, dùng webhook HTTP trực tiếp), Shopify đẩy webhook vào một nguồn sự kiện AWS và AWS chuyển tiếp cho Mysbox. Ở đường này con dấu HMAC *không* kiểm; thay vào đó AWS gửi kèm một khoá bí mật trong header `X-Api-Key`, Mysbox đòi khoá khớp (nếu khoá chưa cấu hình thì từ chối tất cả). Chi tiết: [01-webhooks.md](01-webhooks.md).

## Các cửa khác

| Ai | Cách vào | Ghi chú |
|---|---|---|
| Block ở checkout / trang cảm ơn / tài khoản khách / admin Shopify (extension) | Chỉ gửi kèm tên shop (và mã khách), **không có chữ ký** | Mysbox xác nhận đơn tồn tại thật ở Shopify trước khi trả dữ liệu |
| Nhân viên Ownego | Admin panel, đăng nhập "Sign in with Slack", phải khớp một tài khoản admin; chỉ mở được trên đúng host admin; phân quyền bằng Shield | Màn hình xem [../08-admin-panel/01-login-and-roles.md](../08-admin-panel/01-login-and-roles.md) |
| Hook review App Store | Không xác thực | Xem [../07-automation-growth/05-affiliate-and-partner-sync.md](../07-automation-growth/05-affiliate-and-partner-sync.md) |

## Ví dụ có số

Khách **Bình** của Shop An đã đăng nhập, mở trang đơn #1001: Shopify ký request, đính mã khách của Bình → thấy đơn của mình. Bạn của Bình (guest) nhận link magic có token còn hạn 11 tháng → xem được đơn mà link chỉ tới. Nếu token đã 13 tháng tuổi → trang "authentication token expired". Admin **Chi** vào admin panel bằng Slack; nếu email Slack không khớp admin nào thì không vào được.
