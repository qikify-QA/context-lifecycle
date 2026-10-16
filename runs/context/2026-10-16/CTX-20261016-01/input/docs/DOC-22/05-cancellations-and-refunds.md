# Huỷ đơn và refund từ Shopify

> File này trả lời: khi merchant huỷ hoặc refund đơn có box ngay trong Shopify, Mysbox phản ứng thế nào. Ngắn gọn: app không phản ứng. Khác với "refund do khách resell" (xem [03-refund-amount-examples.md](03-refund-amount-examples.md)). Tổng quan nhóm: [00-overview.md](00-overview.md); webhook mà app lắng nghe: [../09-integrations/01-webhooks.md](../09-integrations/01-webhooks.md).

## App lắng nghe gì

Chỉ ba sự kiện Shopify: đơn đã thanh toán (`orders/paid`), gỡ app (`app/uninstalled`), shop cập nhật (`shop/update`). **Không** có sự kiện huỷ đơn hay refund.

## Chuyện gì xảy ra khi merchant huỷ / refund đơn trong Shopify

Ví dụ: Bình mua 2 box, Shop An (admin) huỷ đơn hoặc refund tiền mặt toàn bộ.

```
Mysbox không biết. Hậu quả:
  - Dữ liệu draw và các box giữ nguyên.
  - Bình vẫn mở box được trên trang storefront.
  - Resell bị chặn: "Order has been cancelled." / "Order is closed." / "Order is not refundable."
  - Usage đã ghi để tính phí gói không bị trừ.
  - Khi đến lúc thêm quà vào đơn, thao tác trên đơn bị huỷ nhiều khả năng lỗi
    (*chưa xác nhận*) và đơn có thể ở trạng thái FAILED, support phải xử lý.
  - Feed "recent pulls" không xoá mục đã công bố.
```

Với đơn trả bằng ticket, Koin không được hoàn và ticket đã bị trừ khi đơn thanh toán không được cộng lại. *Muốn trả lại phải xử lý tay ở Koin.*

## Làm sao gỡ box khỏi đơn đã hoàn tất

Merchant có Flow action "Remove order boxes": chỉ dùng cho box **digital**, đơn phải ở trạng thái COMPLETED; thao tác đặt số lượng dòng box về 0, không restock, không gửi thông báo ([../07-automation-growth/01-shopify-flow.md](../07-automation-growth/01-shopify-flow.md)).

## Refund tay sau khi khách đã resell

Nếu Bình đã resell (nhận store credit) và sau đó merchant refund tiền mặt cho đơn đó, **cả hai khoản hoàn cùng tồn tại**. Shopify cho phép hoàn vượt và app không đối soát. Thông tin để merchant tự kiểm: ghi chú "Buyback Refund | ..." trên đơn.


## Doanh thu dashboard

Doanh thu "Total sales from mystery boxes" ghi lúc thanh toán và không bị trừ khi huỷ/refund hay khi khách resell ([../06-merchant-app/02-dashboard-and-analytics.md](../06-merchant-app/02-dashboard-and-analytics.md)).

## Việc support nên làm (Chi)

1. Hỏi merchant đã huỷ hay refund đơn nào, kiểm tra Shopify.
2. Nếu khách vẫn cần mở box: giải thích app không chặn mở; nếu merchant không muốn, dùng Flow "Remove order boxes" hoặc xử lý tay ([../10-support-playbook/02-resell-refund-credit.md](../10-support-playbook/02-resell-refund-credit.md)).
3. Đừng hoàn tay "cho khách vui" mà không báo merchant: app không ghi nhận khoản đó.

## Câu hỏi thường gặp

- **Khách huỷ đơn mà vẫn mở được box?** Đúng, app không phản ứng với huỷ đơn.
- **Đơn bị refund có còn resell được không?** Không, tuỳ trạng thái Shopify (huỷ, đóng, không refundable thì bị chặn).
- **Gỡ app thì sao?** Xem [../06-merchant-app/04-shop-status-and-lifecycle.md](../06-merchant-app/04-shop-status-and-lifecycle.md).
