# Integration API — Overview & Authentication

> API mà **app khác** (client app, ví dụ mysbox qua SDK `laravel-qikfiliate`) gọi vào Qikfiliate để đồng bộ shop/sự kiện. Đây là kênh **server-to-server** — không có màn hình UI nào cho nhóm endpoint này, và nó hoàn toàn khác với API JWT của dashboard affiliate (xem [04-affiliate-dashboard/00-overview.md](../04-affiliate-dashboard/00-overview.md)).

## Vì sao có nhóm API riêng này

Toàn hệ thống Qikfiliate không tự biết 1 shop tồn tại, không tự biết shop đó install/subscribe/huỷ khi nào — mọi thông tin đó phải do **app đang được quảng bá** (ví dụ mysbox) chủ động báo về. Nhóm API này chính là "cửa vào" duy nhất cho luồng dữ liệu đó. Ngược lại, số tiền hoa hồng KHÔNG đi qua nhóm API này — số tiền đến từ file CSV Payout do Shopify xuất ra, admin tải lên thủ công (xem [03-payout-import/00-overview-and-upload-journey.md](../03-payout-import/00-overview-and-upload-journey.md)). Hai luồng dữ liệu này độc lập nhau: 1 luồng nói "shop nào đang ở trạng thái gì" (API), 1 luồng nói "shop nào tạo ra bao nhiêu tiền" (CSV).

## Cơ chế xác thực

Mọi request trong nhóm này (middleware `auth.api_key`) phải mang header:

```
X-API-Key: <giá trị bí mật>
```

Giá trị này được so khớp (string so sánh trực tiếp, không hash, không chữ ký) với `config('app.api_key')`, đọc từ biến môi trường `APP_API_KEY` trên server. Xác nhận từ `config/app.php:165`.

### Đặc điểm quan trọng cần biết khi đánh giá rủi ro

| Đặc điểm | Ý nghĩa thực tế |
|---|---|
| **1 secret dùng chung cho MỌI client app** | Không có API key riêng cho mysbox khác với 1 client app khác trong tương lai. Không thể thu hồi quyền của riêng 1 app mà không đổi key dùng chung (ảnh hưởng tất cả app khác đang dùng key đó). |
| **Không phân biệt được app nào gọi request nào** | Log request (nếu có) không thể trả lời câu hỏi "request này đến từ mysbox hay app X" — chỉ biết là "1 ai đó có key hợp lệ". |
| **Không có rate limit riêng cho nhóm này** | Không có cơ chế chặn spam/brute-force request vào 5 endpoint bên dưới (khác với các endpoint public như `/login`, `/email/resend` vốn có throttle 6 lần/phút). |
| **Không có chữ ký request (HMAC...)** | Ai có được key (dù chỉ đọc được 1 lần, ví dụ lộ qua log, qua source code app client bị decompile...) đều gọi được toàn bộ 5 endpoint, bao gồm cả xoá dữ liệu (`DELETE /api/customers`). |

**Business rationale (chưa xác nhận, cần hỏi PO/kỹ thuật):** với quy mô hiện tại (chỉ 1 client app xác nhận là mysbox), thiết kế 1 key dùng chung có thể là lựa chọn đơn giản hoá có chủ đích, không phải thiếu sót. Nhưng nếu trong tương lai có thêm nhiều client app khác nhau dùng chung 1 backend Qikfiliate, đây là điểm cần thiết kế lại (API key riêng theo từng app) trước khi mở rộng.

## Danh sách endpoint (chi tiết từng endpoint + ví dụ timeline, xem [01-customer-lifecycle-api.md](01-customer-lifecycle-api.md))

| Method | Path | Việc làm |
|---|---|---|
| `POST` | `/api/tracking-id` | Sinh 1 `tracking_id` cho 1 lượt click từ link giới thiệu |
| `POST` | `/api/customers` | Tạo `Customer` (shop) mới, gắn với affiliate đã giới thiệu qua `tracking_id` |
| `DELETE` | `/api/customers` | Soft-delete 1 `Customer` (shop gỡ cài app) |
| `PUT` | `/api/trashed-customers` | Khôi phục 1 `Customer` đã soft-delete (shop cài lại) |
| `POST` | `/api/customer-events` | Ghi 1 sự kiện vòng đời shop (installed/uninstalled/reinstalled/subscribed/upgraded/canceled) |

## Không có tài liệu API chính thức nào khác

Không tìm thấy Postman collection hay file OpenAPI/Swagger nào trong repo. Nguồn tham khảo request/response duy nhất hiện tại là đọc trực tiếp các `Request`/`Resource` class trong `app/Http/`, hoặc bộ tài liệu này.
