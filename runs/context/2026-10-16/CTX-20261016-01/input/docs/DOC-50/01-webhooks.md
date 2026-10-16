# Webhook mà app nhận

> Webhook là thông báo Shopify tự gửi cho Mysbox khi có việc xảy ra ở shop (đơn được thanh toán, shop đổi thông tin, gỡ app...). File này liệt kê topic nào, app làm gì, và hỏng thì sao. Cách xác thực xem [00-overview-and-auth.md](00-overview-and-auth.md). Luồng đơn sau khi nhận xem [../03-orders-and-reveal/01-purchase-and-draw.md](../03-orders-and-reveal/01-purchase-and-draw.md).

## Hai đường vào

```
Staging:     Shopify ──HTTP──► Mysbox   /webhook            (kiểm con dấu HMAC)
Production:  Shopify ──► AWS EventBridge ──► Mysbox /webhook/event-bridge
                                         (kiểm khoá X-Api-Key, không kiểm HMAC)
```
Cả hai đường sau đó đi qua cùng một "bộ nhận" nội bộ: kiểm hợp lệ, chuẩn hoá tên topic, gắn mã sự kiện (event id) vào nội dung rồi giao cho bộ xử lý của topic. Thiếu header bắt buộc hoặc body rỗng thì bị từ chối.

## Topic nào, làm gì

Đăng ký trong cấu hình app: `app/uninstalled`, `shop/update`, `orders/paid`, `bulk_operations/finish`, cộng ba topic bắt buộc về dữ liệu cá nhân (compliance).

| Topic | App làm gì | Chống xử lý trùng |
|---|---|---|
| `orders/paid` | Việc quan trọng nhất: tạo yêu cầu mở box cho từng box variant trong đơn, rút thăm quà, ghi nhận mức sử dụng (xem [../03-orders-and-reveal/01-purchase-and-draw.md](../03-orders-and-reveal/01-purchase-and-draw.md)) | Có: mỗi (đơn + event id) chỉ xếp hàng một lần; thêm một khoá theo đơn để hai đường (webhook thật và action Flow cho kênh bán khác) không xử lý đồng thời cùng đơn |
| `app/uninstalled` | Chạy ngay trong request: xoá phiên và token, gói về Free, đánh dấu shop đã gỡ, hủy lịch kiểm nguồn đơn, dọn dữ liệu liên quan. Dữ liệu box/đơn được giữ lại | Không |
| `shop/update` | Cập nhật tên, email, id shop, cờ Shopify Plus / development store (gọi Shopify để lấy cờ; lỗi thì bỏ qua) | Thử lại tối đa 3 lần |
| `bulk_operations/finish` | Khi một tác vụ hàng loạt của Shopify xong, app xử lý kết quả (ví dụ danh sách line item/giảm giá) | Có, theo (mã tác vụ + event id) |
| `customers/data_request`, `customers/redact`, `shop/redact` | **Chỉ ghi một dòng log debug**; không xuất, không xoá dữ liệu nào | Không |


## Nếu hỏng thì sao

| Tình huống | Hệ quả |
|---|---|
| Con dấu HMAC / khoá EventBridge sai | Từ chối 401. Shopify coi là thất bại và gửi lại theo lịch của Shopify |
| Topic không có bộ xử lý | Lỗi 500 |
| Bộ xử lý ném lỗi khi xếp việc | Lỗi bị nuốt, Shopify vẫn nhận 204 "thành công" và **không gửi lại** |
| Việc đã xếp hàng nhưng job thất bại (ví dụ `orders/paid` không lấy được khoá đơn trong 15 giây) | Job nằm ở danh sách failed của Horizon (bảng điều khiển hàng đợi), **không tự thử lại**; nhân viên phải chạy lại tay |
| Mất thông báo `app/uninstalled` | Shop vẫn "đã cài" nhưng token chết: cờ cấp quyền lại bật, job thất bại dần |
| Giao trùng cùng một webhook | Không tạo hai lần nhờ cơ chế chống trùng ở trên |

Vì lỗi bị nuốt nên "Shopify nói đã gửi mà app không phản ứng" thường chỉ thấy ở Horizon hoặc log. Merchant báo "đơn đã thanh toán mà không thấy box" → nhờ engineering xem job `orders/paid` của đơn đó.

**Lưu ý đăng ký**: không có topic cho thay đổi subscription (`app_subscriptions/update`). Trạng thái gói chỉ cập nhật qua luồng do chính app khởi tạo, nên subscription bị huỷ/đóng băng bên Shopify có thể lệch với Mysbox. Xem [../05-plans-billing/04-upgrade-downgrade-cancel.md](../05-plans-billing/04-upgrade-downgrade-cancel.md).

## Ví dụ có số

Khách **Bình** trả 40 USD cho 2 box "Neon Box" của Shop An lúc 10:00:00. Shopify gửi `orders/paid` kèm event id 77. App xếp job với khoá "đơn1001_77" và khoá đơn 1001. Shopify (hoặc EventBridge) giao trùng lần hai lúc 10:00:05: job thứ hai bị chặn nhờ khoá trùng, Bình không bị rút thăm hai lần. Giả sử job gặp lỗi: Shopify đã nhận 204 từ trước nên không gửi lại; đơn nằm ở "failed jobs" cho tới khi nhân viên **Chi** nhờ engineering chạy lại.

## Câu hỏi thường gặp

- **Đơn thanh toán rồi mà không có box?** Xem failed jobs `orders/paid` và bước hỗ trợ ở [../10-support-playbook/01-orders-and-reveal.md](../10-support-playbook/01-orders-and-reveal.md).
- **Webhook có chạy cho đơn test?** Có nhận; việc có xử lý như đơn thật hay không xem [../03-orders-and-reveal/01-purchase-and-draw.md](../03-orders-and-reveal/01-purchase-and-draw.md). *Chưa xác nhận chi tiết trong file này.*
- **Topic `bulk_operations/finish` có thật sự đăng ký không?** Có trong cấu hình app của staging và production (file cấu hình SDK); không tạo từ code backend.
