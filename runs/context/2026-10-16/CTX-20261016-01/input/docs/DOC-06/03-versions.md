# Box version — bản chụp cấu hình

> Mỗi lần merchant lưu thay đổi cấu hình, Mysbox có thể tạo một **version** mới: bản chụp bất biến của box. Đơn hàng luôn nhớ version lúc được bốc thăm, nên sửa box sau này không làm đổi kết quả của khách cũ. File này nói thay đổi nào tạo version, ai dùng version nào, và ví dụ số. Về nhóm: [00-overview](00-overview.md); tiền resell dựa trên version xem [nhóm 04](../04-resell-refund-credit/00-overview.md).

## Box và version khác nhau thế nào

| | Box | Version |
|---|---|---|
| Là gì | Cấu hình "sống" của merchant | Bản chụp bất biến |
| Sửa được không | Chỉ khi Draft | Không bao giờ |
| Dùng ở đâu | Màn hình merchant | Mọi logic bốc thăm, mở hộp, resell, đồng bộ đơn |
| Collection | Giữ nguyên là "collection" | Đã bung thành danh sách variant cụ thể |

Quy tắc vàng của hệ thống: logic mở hộp / resell luôn nhìn **version**, không nhìn box.

## Bước 1 — Tạo version đầu tiên

Ngay khi box được tạo, version đầu tiên được sinh ra; box trỏ tới "version hiện tại" (`current_version_id`). Việc này cũng kích hoạt dựng tồn kho lần đầu.

## Bước 2 — Thay đổi nào tạo version mới

Một version mới sinh ra khi lưu và **một trong các thứ sau đổi**: variant được link, loại box, category (số/vật lý), danh sách item (và số lượng/chance), **mọi cài đặt** (animation, buyback %, store credit, kiểu hiển thị...), hoặc cờ tracked.

| Thay đổi | Tạo version? | Dựng lại tồn kho? |
|---|---|---|
| Sửa item / số lượng / chance | Có | Có |
| Đổi variant được link, loại box, tracked | Có | Có |
| Đổi picking mode, tier mode, deactivate/draft on empty, refill (bật/tắt, mode) | Có | Có |
| Đổi animation, buyback %, store credit, hiển thị chance/tồn kho | Có | Không |
| Đổi category (số ↔ vật lý) | Có | Không |
| Publish / unpublish, trạng thái đồng bộ | **Không** | Không |

Đổi chỉ "cài đặt" (không đụng item) thì version mới **dùng lại danh sách item đã bung sẵn** của version cũ, không cần hỏi lại Shopify.

## Bước 3 — Ai dùng version nào

```
Khách thanh toán ► server bốc thăm ► đơn gắn với version đang hiệu lực LÚC ĐÓ
Sau này merchant sửa box ► version mới
        ├─ Đơn cũ: vẫn mở theo version cũ (item, animation, điều khoản buyback)
        └─ Đơn mới: dùng version mới nhất
```

Vì sửa chỉ làm được khi box Draft, merchant phải "pause sales" trước. Có một khoảng hẹp: đơn vừa thanh toán ngay trước lúc pause.

## Ví dụ số

Shop An bật buyback "By store credit", value 80% trên "Original item price" (version 7). Bình mua và thấy một Figure giá 20 USD; Bình trúng nó.

1. An vào box, deactivate, hạ value xuống 50%, Save, Activate → **version 8**.
2. Bình (mua dưới version 7) resell Figure: nhận 80% × 20 = **16 USD** store credit (điều khoản version 7).
3. Dũng (khách khác) mua sau khi version 8 hiệu lực, resell cùng Figure: 50% × 20 = **10 USD**.

Cách tính tiền đầy đủ: [nhóm 04](../04-resell-refund-credit/03-refund-amount-examples.md).

## Xoá box thì version ra sao

Version **không bị xoá cùng box** (không có ràng buộc xoá dây chuyền). Nhờ đó đơn đã bốc thăm của box đã xoá vẫn hiển thị prize và reveal được.

## Version và pool refill

Với Group pool có refill, trạng thái hàng đợi gắn với hàng đợi chứ không phải version `[chỉ có trên staging]`; trên production việc khớp refill dựa trên version nên sửa box sau khi khách mua có thể làm mất lượt trả item.md).

## Câu hỏi thường gặp

- **Merchant sửa tỉ lệ có làm đổi kết quả đơn đã bán không?** Không: kết quả đã bốc xong khi thanh toán.
- **Khách đang mở dở, merchant đổi animation?** Khách đã mua vẫn dùng animation của version lúc mua.
- **Publish có tạo version?** Không.
