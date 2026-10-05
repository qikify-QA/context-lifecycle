# Tracking Links — cách 1 shop được gắn đúng affiliate

> Xem tổng quan vị trí của mục này trong toàn bộ dashboard ở [00-overview.md](00-overview.md). Đây là cơ chế **quyết định affiliate nào được ghi công** khi 1 shop cài app qua link giới thiệu — nếu sai ở bước này, affiliate mất hoa hồng mà không có cách nào khiếu nại lại được (không có quy trình gán tay).

## Tổng quan cơ chế

```
Affiliate lấy link           Khách click link            Khách thật sự cài app
(trang Links, "Get Link")    (trên landing page/blog...)  (trên Shopify App Store)
        │                            │                             │
        ▼                            ▼                             ▼
  ref_url riêng theo          Client app gọi                Client app gọi
  (affiliate, Program)        POST /api/tracking-id         POST /api/customers
                               → tạo TrackingInformation      kèm tracking_id
                               (tracking_id = UUID,            → tạo Customer,
                                hết hạn sau 45 ngày)            gắn user_id đúng affiliate
                                                                → XOÁ TrackingInformation
```

Lưu ý quan trọng: **2 lệnh gọi `POST /api/tracking-id` và `POST /api/customers` đều do client app (phía Shopify app, ví dụ mysbox) gọi vào Qikfiliate — không phải do affiliate hay trình duyệt của khách hàng gọi trực tiếp.** Affiliate chỉ tạo ra cái link ban đầu; toàn bộ phần tracking phía sau là giao tiếp server-to-server giữa client app và Qikfiliate.

## Timeline ví dụ cụ thể

### Trường hợp A — Cài app trong hạn (THÀNH CÔNG)

| Ngày | Sự kiện |
|---|---|
| Ngày 1 | Khách click link giới thiệu của affiliate X → client app gọi `POST /api/tracking-id` (`ref=X`, `source_url=...`) → hệ thống tạo `TrackingInformation`, `tracking_id = "abc-123"`, `expires_at = Ngày 1 + 45 = Ngày 46` |
| Ngày 40 | Khách quay lại, thực sự cài app trên Shopify App Store, tạo tài khoản trên client app → client app gọi `POST /api/customers` kèm `tracking_id = "abc-123"` |
| Ngày 40 (tiếp) | Hệ thống kiểm tra: `Ngày 40 <= Ngày 46` → **hợp lệ** → tạo `Customer` mới, gắn `user_id` = affiliate X, xoá `TrackingInformation` | 

Kết quả: shop này thuộc về affiliate X, mọi hoa hồng phát sinh sau này từ shop này đều tính cho X.

### Trường hợp B — Cài app quá hạn (THẤT BẠI, mất ghi công)

| Ngày | Sự kiện |
|---|---|
| Ngày 1 | Giống trường hợp A — `tracking_id = "xyz-789"`, hết hạn Ngày 46 |
| Ngày 50 | Khách mới thực sự cài app → client app gọi `POST /api/customers` kèm `tracking_id = "xyz-789"` |
| Ngày 50 (tiếp) | Hệ thống kiểm tra: `Ngày 50 > Ngày 46` → **400 Bad Request "Invalid tracking_id"** → **KHÔNG tạo `Customer`** |

Kết quả: shop này **không được gắn với affiliate nào cả** qua cơ chế tracking link — nếu client app vẫn tự tạo `Customer` bằng đường khác (không qua API này) thì sẽ không có `user_id` hợp lệ, hoặc hoàn toàn không có bản ghi `Customer` nào trong Qikfiliate cho shop đó, tuỳ cách client app xử lý lỗi 400 này ở phía họ. **QA nên xác nhận với đội mysbox/client app: khi gặp lỗi 400 này, họ có fallback gì không, hay chấp nhận mất ghi công hoàn toàn.**

### Trường hợp C — Click nhiều lần, cài app dùng lượt click cuối

Nếu khách click lại link giới thiệu nhiều lần trước khi cài app, mỗi lần click tạo **1 `TrackingInformation` riêng** (không ghi đè cái cũ, không huỷ cái cũ). Client app cần tự quyết định giữ `tracking_id` nào (thường là mới nhất) để gửi kèm lúc cài app — hành vi này nằm ở phía client app, Qikfiliate không có cơ chế "chỉ giữ 1 tracking active" cho mỗi affiliate.

## Vì sao hạn 45 ngày?

*Business rationale: chưa xác nhận chính thức với PO.* Có thể liên hệ tới thời gian dùng thử miễn phí phổ biến của các app Shopify (thường 7-30 ngày) cộng thêm biên độ cho khách cân nhắc trước khi thực sự cài đặt — nhưng đây là suy đoán, cần PO xác nhận lại nếu muốn thay đổi con số này, vì nó ảnh hưởng trực tiếp tới việc affiliate có bị mất ghi công oan hay không.

## Field liên quan (tham chiếu nhanh)

| Field (`TrackingInformation`) | Ý nghĩa |
|---|---|
| `tracking_id` | UUID, định danh duy nhất, dùng 1 lần |
| `user_id` | Affiliate sở hữu (tra từ `ref` lúc tạo) |
| `source_url` | URL nơi đặt link — dùng cho mục đích thống kê nguồn traffic, không ảnh hưởng logic gán ghi công |
| `expires_at` | `created_at + 45 ngày`, cố định, không có cách gia hạn thủ công qua UI |

Xem thêm định nghĩa model đầy đủ ở [../01-domain-entities.md](../01-domain-entities.md) và chi tiết API request/response ở [../06-integration-api/00-overview-and-auth.md](../06-integration-api/00-overview-and-auth.md).
