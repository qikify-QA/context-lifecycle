# Resell, hoàn tiền và store credit — tổng quan

> Nhóm này giải thích phần "tiền quay lại" của Mysbox: khách bán lại (resell/buyback) quà hoặc cả box để lấy store credit, cách app tính số tiền hoàn, cách khách mua box bằng store credit Koin (ticket), và chuyện gì xảy ra khi đơn bị huỷ/refund bên Shopify. Nằm sau bước mở box ([../03-orders-and-reveal/00-overview.md](../03-orders-and-reveal/00-overview.md)) và trước bước thêm quà vào đơn ([../03-orders-and-reveal/04-prizes-added-to-order.md](../03-orders-and-reveal/04-prizes-added-to-order.md)). Ghi chú: hành vi resell, refund, store credit giống nhau trên production và staging.

## Nhóm này làm gì, ai dùng

- **Merchant** (ví dụ Shop An) bật "Buy back function" cho từng box, chọn cách tính và % giá trị, đặt thời hạn resell chung cho cả shop.
- **Khách** (ví dụ Bình) mở box xong, trong thời hạn resell có thể bán lại quà để nhận store credit trong tài khoản Shopify.
- **Khách có Koin credit** đổi credit thành ticket để mua box với giá 0 đồng ở checkout.
- **Support** (ví dụ Chi) trả lời "sao hoàn ít/nhiều hơn khách trả", "bấm hai lần có bị hoàn đôi không".

## Sơ đồ tổng quát

```
Mua box ──► Draw ──► Khách mở box ──► [Cửa sổ resell: mặc định 24h]
   │                                        │
   │ (có thể trả bằng                       ├─ Khách bấm "Resell" ──► app tính tiền ──► Shopify refund
   │  ticket từ Koin)                       │     (BOX: cả box | ITEMS: từng quà)       (store credit)
   │                                        │
   │                                        └─ Hết hạn / đơn COMPLETED ──► quà được thêm vào đơn
   ▼
Koin balance ──trừ──► ticket ──► checkout giảm 100% ──► đơn 0 đồng

Merchant huỷ / refund đơn trong Shopify ──► app KHÔNG phản ứng (chỉ chặn resell)
```

## Mục lục

| File | Nội dung |
|---|---|
| [01-resell-box-mode.md](01-resell-box-mode.md) | Cấu hình resell của merchant, điều kiện, trải nghiệm khách, chế độ BOX (bán cả box) |
| [02-resell-items-mode.md](02-resell-items-mode.md) | Chế độ ITEMS: bán từng quà, bán nhiều lần, giá hiện tại |
| [03-refund-amount-examples.md](03-refund-amount-examples.md) | Công thức tính tiền hoàn, cách chia tiền, 6 ví dụ số |
| [04-store-credit-and-tickets.md](04-store-credit-and-tickets.md) | Mua box bằng Koin credit, ticket, số dư, ví dụ |
| [05-cancellations-and-refunds.md](05-cancellations-and-refunds.md) | Huỷ đơn / refund từ Shopify thì app xử lý ra sao |

## Từ vựng

| Từ | Nghĩa |
|---|---|
| Resell / buyback | Khách bán lại quà (hoặc box) cho shop, nhận store credit |
| Resell window | Khoảng thời gian được resell, tính từ lúc draw (mặc định 24 giờ) |
| BOX mode / ITEMS mode | Bán cả box một lần / bán từng quà |
| Shopify store credit | Credit nằm trong tài khoản khách của Shopify, chỉ dùng ở shop đó |
| Koin credit | Credit của app Koin, hệ thống KHÁC với Shopify store credit |
| Ticket | "Vé" mua box trả bằng Koin; mỗi ticket cho một box giảm 100% |

Hai loại credit không tự quy đổi cho nhau: mua box tốn Koin, resell trả Shopify store credit.
