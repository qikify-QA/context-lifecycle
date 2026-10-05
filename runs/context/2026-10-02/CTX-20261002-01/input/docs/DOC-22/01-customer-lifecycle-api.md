# Customer Lifecycle API — Timeline chi tiết

> Đi qua **toàn bộ vòng đời 1 shop thật**, từ lúc click link giới thiệu đến lúc gỡ cài rồi cài lại, với payload request/response cụ thể cho từng bước. Nhân vật ví dụ: affiliate **John** (`ref = "john-affiliate"`), app **"B2B Manager"** (`Program.slug = "b2b-manager"`), shop **"My Cool Shop"** (`related_id = "shop_123.myshopify.com"`).

## Bước 1 (Ngày 1) — Khách click link giới thiệu của John

Client app (app cài trên Shopify) bắt được lượt click từ link giới thiệu, gọi ngay:

```http
POST /api/tracking-id
X-API-Key: <secret>
Content-Type: application/json

{
  "ref": "john-affiliate",
  "source_url": "https://blog.example.com/review-b2b-manager"
}
```

Hệ thống tìm `User` có `ref = "john-affiliate"` (nếu không tồn tại → lỗi, không tạo được gì). Tạo 1 `TrackingInformation` mới, response:

```json
{ "data": "a1b2c3d4-e5f6-7890-abcd-ef1234567890" }
```

`tracking_id` này **hết hạn sau 45 ngày kể từ Ngày 1** — tức là hạn chót Ngày 46. Client app phải lưu lại giá trị này (thường trong session/cookie phía Shopify) để dùng ở bước 2.

## Bước 2 (Ngày 10) — Khách thực sự cài app

```http
POST /api/customers
X-API-Key: <secret>
Content-Type: application/json

{
  "tracking_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "related_id": "shop_123.myshopify.com",
  "name": "My Cool Shop",
  "email": "owner@my-cool-shop.example.com",
  "program_slug": "b2b-manager"
}
```

Ngày 10 vẫn nằm trong hạn 45 ngày (hạn chót Ngày 46) → hợp lệ. Hệ thống:
1. Tìm `TrackingInformation` theo `tracking_id`.
2. Tìm `Program` theo `program_slug`.
3. Gộp `user_id`/`source_url` từ `TrackingInformation` với `name`/`email`/`related_id` từ request → tạo `Customer`.
4. **Xoá `TrackingInformation`** — token dùng đúng 1 lần, gọi lại `POST /api/customers` với cùng `tracking_id` lần 2 sẽ thất bại (không tìm thấy).

Response (dạng `CustomerResource`):

```json
{
  "data": {
    "id": 301,
    "program": { "id": 7, "name": "B2B Manager", "slug": "b2b-manager" },
    "source_url": "https://blog.example.com/review-b2b-manager",
    "name": "My Cool Shop",
    "email": "owner@my-cool-shop.example.com",
    "user": { "id": 42, "ref": "john-affiliate" },
    "created_at": "2026-08-10T03:00:00.000000Z"
  }
}
```

⚠️ Lưu ý: nếu `program_slug` gửi lên **không khớp `Program` nào tồn tại**, hệ thống hiện không có validate `exists:programs,slug` ở tầng request — ví dụ gửi `"program_slug": "khong-ton-tai"` có khả năng gây lỗi runtime (500) ngay khi cố lấy `$program->id`, thay vì trả lỗi rõ ràng 422 "program_slug không hợp lệ". **QA nên có test case riêng cho tình huống này.**

## Bước 3 (Ngày 10, ngay sau bước 2) — Báo sự kiện "đã cài đặt"

```http
POST /api/customer-events
X-API-Key: <secret>
Content-Type: application/json

{
  "customer_related_id": "shop_123.myshopify.com",
  "program_slug": "b2b-manager",
  "name": "installed"
}
```

Hệ thống tìm `Customer` theo `(program_slug, related_id)` rồi tạo `CustomerEvent`. Đây là sự kiện quyết định "trạng thái mới nhất" hiển thị cho shop này ở cả admin panel lẫn dashboard affiliate (`Customer.latestEvent`).

## Bước 4 (Ngày 15) — Shop nâng cấp lên gói trả phí

```http
POST /api/customer-events
{ "customer_related_id": "shop_123.myshopify.com", "program_slug": "b2b-manager", "name": "subscribed" }
```

Sự kiện này **không mang theo số tiền** — chỉ đổi trạng thái hiển thị thành "subscribed". Số tiền hoa hồng cho lần subscribe này sẽ đến sau, qua file CSV Payout admin upload (xem [03-payout-import/00-overview-and-upload-journey.md](../03-payout-import/00-overview-and-upload-journey.md)), độc lập hoàn toàn với request này.

## Bước 5 (Ngày 90) — Shop gỡ cài app

Hai lệnh gọi riêng biệt, thường đi cùng nhau:

```http
POST /api/customer-events
{ "customer_related_id": "shop_123.myshopify.com", "program_slug": "b2b-manager", "name": "uninstalled" }
```

```http
DELETE /api/customers
{ "related_id": "shop_123.myshopify.com", "program_slug": "b2b-manager" }
```

`DELETE` thực hiện **soft-delete** (`deleted_at` được set, không xoá vật lý) — response `204 No Content`, không có body. Lịch sử `Conversion`/`CustomerEvent` của shop này **vẫn còn nguyên**, vẫn tính vào các cap lifetime (usage-charge cap, xem [02-commission/00-overview.md](../02-commission/00-overview.md)) dù shop đã "biến mất" khỏi danh sách active.

## Bước 6 (Ngày 120) — Shop cài lại

```http
PUT /api/trashed-customers
X-API-Key: <secret>
Content-Type: application/json

{
  "related_id": "shop_123.myshopify.com",
  "program_slug": "b2b-manager",
  "deleted_at": null
}
```

Gửi `deleted_at` rỗng/`null`/`false` → hệ thống gọi `restore()`, huỷ soft-delete, shop trở lại active với **đúng lịch sử cũ** (không tạo `Customer` mới). Có thể gọi tiếp `POST /api/customer-events` với `"name": "reinstalled"` để cập nhật trạng thái hiển thị.

## Sơ đồ tóm tắt timeline

```
Ngày 1   POST /api/tracking-id         → tracking_id (hạn tới ngày 46)
Ngày 10  POST /api/customers           → tạo Customer#301, xoá tracking_id
Ngày 10  POST /api/customer-events     → name = "installed"
Ngày 15  POST /api/customer-events     → name = "subscribed"
Ngày 90  POST /api/customer-events     → name = "uninstalled"
Ngày 90  DELETE /api/customers         → soft-delete Customer#301
Ngày 120 PUT /api/trashed-customers    → restore Customer#301
Ngày 120 POST /api/customer-events     → name = "reinstalled" (tuỳ chọn)
```

## Hai rủi ro cần QA test riêng

### Rủi ro 1 — `name` trong customer-events không bị chặn giá trị sai

Model `CustomerEvent` định nghĩa đúng 6 giá trị hợp lệ: `installed`, `uninstalled`, `reinstalled`, `subscribed`, `upgraded`, `canceled` (chữ thường). Nhưng request `POST /api/customer-events` **chỉ validate `required`, không có `in:...`**. Ví dụ:

```http
POST /api/customer-events
{ "customer_related_id": "shop_123.myshopify.com", "program_slug": "b2b-manager", "name": "subcribed" }
```

(gõ thiếu 1 chữ "s" — đúng ra phải là `"subscribed"`) → hệ thống **vẫn trả 200/201 thành công**, lưu nguyên văn `"subcribed"` vào DB. Hậu quả: trạng thái hiển thị trên admin panel lẫn dashboard affiliate sẽ hiện chuỗi lạ `"subcribed"` thay vì nhãn "Subscribed" đã định nghĩa sẵn — không có cảnh báo nào cho client app biết họ vừa gửi sai. **QA nên test gửi 1 giá trị `name` bất kỳ (kể cả rỗng nếu field cho phép, hoặc chuỗi ngẫu nhiên) và xác nhận hành vi thực tế.**

### Rủi ro 2 — `program_slug` không tồn tại có thể gây lỗi 500 thay vì 422

Đã nêu ở Bước 2 — cả `POST /api/customers` lẫn có thể một số endpoint khác dùng `program_slug` đều nên được test với giá trị không tồn tại để xác nhận response code thực tế (mong đợi 422/400 rõ ràng, không phải 500 "Internal Server Error" khiến client app khó xử lý retry/log lỗi đúng cách).
